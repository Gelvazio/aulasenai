-- ─────────────────────────────────────────────────────────────────────────────────────
-- Até 3 tentativas por atividade, liberadas pelo professor
-- Plano: docs/regra-3-tentativas-atividade.md  —  2026-09-30
--
-- Idempotente e sem apagar dados: as respostas/entregas que já existem viram tentativa 1.
-- Executar no Supabase → SQL Editor (depois de 2026-09-28-atividades-gabarito.sql).
--
-- Regra: a tentativa 1 é livre; depois de entregar, só o professor libera a próxima
-- (função liberar_nova_tentativa). Máximo de 3 tentativas (função maximo_tentativas).
-- A nova tentativa já abre com as respostas da anterior copiadas (o aluno só corrige).
-- ─────────────────────────────────────────────────────────────────────────────────────

-- ── 1. Limite de tentativas (único lugar no banco) ────────────────────────────────────
create or replace function public.maximo_tentativas()
returns smallint
language sql immutable
as $$ select 3::smallint; $$;

-- ── 2. Coluna tentativa nas respostas e nas entregas (dados atuais = tentativa 1) ─────
alter table public.resposta_atividade
  add column if not exists tentativa smallint not null default 1;
alter table public.entrega_atividade
  add column if not exists tentativa smallint not null default 1;

do $$
begin
  if not exists (select 1 from pg_constraint
                 where conname = 'resposta_atividade_tentativa_check') then
    alter table public.resposta_atividade
      add constraint resposta_atividade_tentativa_check check (tentativa between 1 and 3);
  end if;
  if not exists (select 1 from pg_constraint
                 where conname = 'entrega_atividade_tentativa_check') then
    alter table public.entrega_atividade
      add constraint entrega_atividade_tentativa_check check (tentativa between 1 and 3);
  end if;

  -- a chave primária passa a incluir a tentativa (só se ainda não incluir)
  if not exists (select 1 from pg_constraint c
                 join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
                 where c.conname = 'resposta_atividade_pkey' and a.attname = 'tentativa') then
    alter table public.resposta_atividade drop constraint resposta_atividade_pkey;
    alter table public.resposta_atividade
      add constraint resposta_atividade_pkey
      primary key (aluno_id, atividade_id, tentativa, item);
  end if;
  if not exists (select 1 from pg_constraint c
                 join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
                 where c.conname = 'entrega_atividade_pkey' and a.attname = 'tentativa') then
    alter table public.entrega_atividade drop constraint entrega_atividade_pkey;
    alter table public.entrega_atividade
      add constraint entrega_atividade_pkey primary key (aluno_id, atividade_id, tentativa);
  end if;
end $$;

-- ── 3. Liberações feitas pelo professor (tentativas 2 e 3) ────────────────────────────
create table if not exists public.liberacao_atividade (
  aluno_id      uuid not null references auth.users (id) on delete cascade,
  atividade_id  bigint not null references public.atividade (id) on delete cascade,
  tentativa     smallint not null check (tentativa between 2 and 3),
  liberada_em   timestamptz not null default now(),
  liberada_por  uuid default auth.uid(),
  primary key (aluno_id, atividade_id, tentativa)
);
create index if not exists liberacao_atividade_atividade_idx
  on public.liberacao_atividade (atividade_id);

-- ── 4. Funções auxiliares (security definer: não dependem das políticas de quem chama) ─
-- Tentativa em andamento do aluno logado: a maior liberada (mínimo 1).
create or replace function public.tentativa_atual(p_atividade bigint)
returns smallint
language sql stable security definer
set search_path = public
as $$
  select coalesce(max(l.tentativa), 1)::smallint
  from public.liberacao_atividade l
  where l.aluno_id = auth.uid() and l.atividade_id = p_atividade;
$$;

create or replace function public.atividade_entregue(p_atividade bigint, p_tentativa smallint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.entrega_atividade e
    where e.aluno_id = auth.uid() and e.atividade_id = p_atividade
      and e.tentativa = p_tentativa
  );
$$;

create or replace function public.atividade_completa(p_atividade bigint, p_tentativa smallint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select (select count(*) from public.resposta_atividade r
          where r.aluno_id = auth.uid() and r.atividade_id = p_atividade
            and r.tentativa = p_tentativa)
       = (select a.total_itens from public.atividade a where a.id = p_atividade);
$$;

-- ── 5. Liberar nova tentativa (só o professor) ────────────────────────────────────────
-- Exige: professor logado; a tentativa em andamento do aluno já foi entregue; limite de 3.
-- Cria a liberação e copia as respostas da tentativa anterior para a nova.
create or replace function public.liberar_nova_tentativa(p_aluno uuid, p_atividade bigint)
returns smallint
language plpgsql security definer
set search_path = public
as $$
declare
  v_atual smallint;
  v_nova  smallint;
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode liberar uma nova tentativa.';
  end if;

  select coalesce(max(l.tentativa), 1) into v_atual
  from public.liberacao_atividade l
  where l.aluno_id = p_aluno and l.atividade_id = p_atividade;

  if not exists (select 1 from public.entrega_atividade e
                 where e.aluno_id = p_aluno and e.atividade_id = p_atividade
                   and e.tentativa = v_atual) then
    raise exception 'O aluno ainda não entregou a tentativa %.', v_atual;
  end if;
  if v_atual >= public.maximo_tentativas() then
    raise exception 'O aluno já usou as % tentativas.', public.maximo_tentativas();
  end if;

  v_nova := v_atual + 1;
  insert into public.liberacao_atividade (aluno_id, atividade_id, tentativa)
  values (p_aluno, p_atividade, v_nova);

  insert into public.resposta_atividade (aluno_id, atividade_id, tentativa, item, letra)
  select r.aluno_id, r.atividade_id, v_nova, r.item, r.letra
  from public.resposta_atividade r
  where r.aluno_id = p_aluno and r.atividade_id = p_atividade and r.tentativa = v_atual;

  return v_nova;
end;
$$;

revoke all on function public.tentativa_atual(bigint) from public;
revoke all on function public.atividade_entregue(bigint, smallint) from public;
revoke all on function public.atividade_completa(bigint, smallint) from public;
revoke all on function public.liberar_nova_tentativa(uuid, bigint) from public;
grant execute on function public.maximo_tentativas() to authenticated;
grant execute on function public.tentativa_atual(bigint) to authenticated;
grant execute on function public.atividade_entregue(bigint, smallint) to authenticated;
grant execute on function public.atividade_completa(bigint, smallint) to authenticated;
grant execute on function public.liberar_nova_tentativa(uuid, bigint) to authenticated;

-- ── 6. Políticas (RLS) ────────────────────────────────────────────────────────────────
alter table public.liberacao_atividade enable row level security;

-- aluno vê as próprias liberações; professor vê todas; ninguém grava direto (só pela função)
drop policy if exists liberacao_select on public.liberacao_atividade;
create policy liberacao_select on public.liberacao_atividade
  for select to authenticated using (aluno_id = auth.uid() or public.eh_professor());

-- resposta: só na tentativa em andamento e enquanto ela não foi entregue
drop policy if exists resposta_insert on public.resposta_atividade;
create policy resposta_insert on public.resposta_atividade
  for insert to authenticated
  with check (
    aluno_id = auth.uid()
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  );

drop policy if exists resposta_update on public.resposta_atividade;
create policy resposta_update on public.resposta_atividade
  for update to authenticated
  using (
    aluno_id = auth.uid()
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  )
  with check (
    aluno_id = auth.uid()
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  );

-- entrega: uma por tentativa, só da tentativa em andamento e com todos os itens respondidos
drop policy if exists entrega_insert on public.entrega_atividade;
create policy entrega_insert on public.entrega_atividade
  for insert to authenticated
  with check (
    aluno_id = auth.uid()
    and tentativa = public.tentativa_atual(atividade_id)
    and public.atividade_completa(atividade_id, tentativa)
  );

grant select on public.liberacao_atividade to authenticated;
