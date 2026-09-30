-- ─────────────────────────────────────────────────────────────────────────────────────
-- Ajustes pedidos pelo professor em 2026-09-30 (sem apagar nada)
--  1. O limite de tentativas vem do BANCO (atividade.max_tentativas, padrão 3), não de constante.
--  2. Sem acesso do anon às funções de tentativas/nota (só usuário logado).
--  3. Professor NÃO assinala nem entrega: só alunos (RLS).
-- Idempotente. Executar no Supabase → SQL Editor (depois de 2026-09-30-tentativas-atividade.sql).
-- ─────────────────────────────────────────────────────────────────────────────────────

-- 1. limite de tentativas por atividade (padrão 3)
alter table public.atividade
  add column if not exists max_tentativas smallint not null default 3;
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'atividade_max_tentativas_check') then
    alter table public.atividade
      add constraint atividade_max_tentativas_check check (max_tentativas between 1 and 10);
  end if;
end $$;

-- o teto deixa de ser fixo em 3: quem limita é atividade.max_tentativas
alter table public.resposta_atividade drop constraint if exists resposta_atividade_tentativa_check;
alter table public.resposta_atividade
  add constraint resposta_atividade_tentativa_check check (tentativa >= 1);
alter table public.entrega_atividade drop constraint if exists entrega_atividade_tentativa_check;
alter table public.entrega_atividade
  add constraint entrega_atividade_tentativa_check check (tentativa >= 1);
alter table public.liberacao_atividade drop constraint if exists liberacao_atividade_tentativa_check;
alter table public.liberacao_atividade
  add constraint liberacao_atividade_tentativa_check check (tentativa >= 2);

create or replace function public.liberar_nova_tentativa(p_aluno uuid, p_atividade bigint)
returns smallint
language plpgsql security definer
set search_path = public
as $$
declare
  v_atual  smallint;
  v_nova   smallint;
  v_maximo smallint;
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode liberar uma nova tentativa.';
  end if;

  select a.max_tentativas into v_maximo from public.atividade a where a.id = p_atividade;
  if v_maximo is null then
    raise exception 'Atividade não encontrada.';
  end if;

  select coalesce(max(l.tentativa), 1) into v_atual
  from public.liberacao_atividade l
  where l.aluno_id = p_aluno and l.atividade_id = p_atividade;

  if not exists (select 1 from public.entrega_atividade e
                 where e.aluno_id = p_aluno and e.atividade_id = p_atividade
                   and e.tentativa = v_atual) then
    raise exception 'O aluno ainda não entregou a tentativa %.', v_atual;
  end if;
  if v_atual >= v_maximo then
    raise exception 'O aluno já usou as % tentativas.', v_maximo;
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

-- 2. anon não executa nada disto (usuário logado continua executando o que as políticas usam)
revoke execute on function public.tentativa_atual(bigint) from public, anon;
revoke execute on function public.atividade_entregue(bigint) from public, anon;
revoke execute on function public.atividade_entregue(bigint, smallint) from public, anon;
revoke execute on function public.atividade_completa(bigint) from public, anon;
revoke execute on function public.atividade_completa(bigint, smallint) from public, anon;
revoke execute on function public.item_valido(bigint, smallint) from public, anon;
revoke execute on function public.liberar_nova_tentativa(uuid, bigint) from public, anon;
revoke execute on function public.nota_da_tentativa(bigint, smallint) from public, anon;
revoke execute on function public.resumo_tentativas_atividade(bigint) from public, anon;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
grant execute on function public.liberar_nova_tentativa(uuid, bigint) to authenticated;

-- 3. professor não assinala nem entrega (só alunos)
drop policy if exists resposta_insert on public.resposta_atividade;
create policy resposta_insert on public.resposta_atividade
  for insert to authenticated
  with check (
    aluno_id = auth.uid()
    and not public.eh_professor()
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  );

drop policy if exists resposta_update on public.resposta_atividade;
create policy resposta_update on public.resposta_atividade
  for update to authenticated
  using (
    aluno_id = auth.uid()
    and not public.eh_professor()
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  )
  with check (
    aluno_id = auth.uid()
    and not public.eh_professor()
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  );

drop policy if exists entrega_insert on public.entrega_atividade;
create policy entrega_insert on public.entrega_atividade
  for insert to authenticated
  with check (
    aluno_id = auth.uid()
    and not public.eh_professor()
    and tentativa = public.tentativa_atual(atividade_id)
    and public.atividade_completa(atividade_id, tentativa)
  );
