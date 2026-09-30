-- Horários da atividade (2026-09-30).
-- Executar no Supabase → SQL Editor. Nada é apagado.
--
-- 1) Entrega: entrega_atividade.entregue_em já guarda a hora do clique em "Finalizar".
-- 2) Alternativas: resposta_atividade.atualizado_em passa a ser atualizado a CADA troca de
--    resposta (gatilho), não só na primeira gravação.
-- 3) Abertura: abertura_atividade guarda a hora em que o aluno abriu cada tentativa
--    (primeira abertura), para calcular o tempo gasto até a entrega.

-- ── 2. Hora de cada alteração de alternativa ─────────────────────────────────────────────
create or replace function public.definir_atualizado_em()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.atualizado_em := now();
  return new;
end;
$$;

drop trigger if exists resposta_atividade_atualizado_em on public.resposta_atividade;
create trigger resposta_atividade_atualizado_em
  before update on public.resposta_atividade
  for each row execute function public.definir_atualizado_em();

-- ── 3. Hora em que o aluno abriu a atividade (por tentativa) ─────────────────────────────
create table if not exists public.abertura_atividade (
  aluno_id      uuid not null references auth.users (id) on delete cascade,
  atividade_id  bigint not null references public.atividade (id) on delete cascade,
  tentativa     smallint not null check (tentativa between 1 and 3),
  aberta_em     timestamptz not null default now(),
  primary key (aluno_id, atividade_id, tentativa)
);
create index if not exists abertura_atividade_atividade_idx
  on public.abertura_atividade (atividade_id);

alter table public.abertura_atividade enable row level security;

drop policy if exists abertura_select on public.abertura_atividade;
create policy abertura_select on public.abertura_atividade
  for select to authenticated
  using (aluno_id = (select auth.uid()) or (select public.eh_professor()));

-- o aluno só registra a abertura da tentativa em andamento, antes de entregá-la
drop policy if exists abertura_insert on public.abertura_atividade;
create policy abertura_insert on public.abertura_atividade
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  );

revoke all on public.abertura_atividade from anon;
grant select, insert on public.abertura_atividade to authenticated;
