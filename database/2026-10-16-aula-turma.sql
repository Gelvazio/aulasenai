-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Datas das aulas por turma (2026-10-16, tarefa #185)
-- Etapa: tasks/etapas/ETAPA-312-5df765a9-DATAS-DAS-AULAS-POR-TURMA-ITIC.md
--
-- • aula_turma: uma data por aula e por turma (cada turma tem dias de aula diferentes).
-- • RLS: logado lê; só professor grava (eh_professor()).
-- • Seed: datas iniciais vindas das atividades de ITIC; o professor edita depois.
-- Idempotente e sem apagar dados.
-- ════════════════════════════════════════════════════════════════════════════════════════════

create table if not exists public.aula_turma (
  id           bigint generated always as identity primary key,
  aula_id      bigint not null references public.aulas (id) on delete cascade,
  turma_codigo text   not null references public.turma (codigo) on update cascade on delete cascade,
  data_aula    date   not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint aula_turma_aula_turma_unico unique (aula_id, turma_codigo)
);

create index if not exists aula_turma_turma_data_idx on public.aula_turma (turma_codigo, data_aula);

alter table public.aula_turma enable row level security;

drop policy if exists aula_turma_select on public.aula_turma;
create policy aula_turma_select on public.aula_turma
  for select to authenticated using (true);

drop policy if exists aula_turma_insert_professor on public.aula_turma;
create policy aula_turma_insert_professor on public.aula_turma
  for insert to authenticated with check ((select public.eh_professor()));

drop policy if exists aula_turma_update_professor on public.aula_turma;
create policy aula_turma_update_professor on public.aula_turma
  for update to authenticated
  using ((select public.eh_professor())) with check ((select public.eh_professor()));

drop policy if exists aula_turma_delete_professor on public.aula_turma;
create policy aula_turma_delete_professor on public.aula_turma
  for delete to authenticated using ((select public.eh_professor()));

revoke all on public.aula_turma from anon;
grant select, insert, update, delete on public.aula_turma to authenticated;

-- Seed: todas as aulas de ITIC (materia 25) × todas as turmas de ITIC (curso 5, UC de Introdução
-- a TIC). Data inicial = menor data_atividade das atividades da aula; sem ela, aulas.data_planejada.
-- Aula sem nenhuma data fica de fora (data_aula é obrigatória): o professor cadastra pela tela.
insert into public.aula_turma (aula_id, turma_codigo, data_aula)
select a.id, t.codigo,
       coalesce(
         (select min(at.data_atividade) from public.atividade at where at.aula_id = a.id),
         a.data_planejada
       )
from public.aulas a
cross join public.turma t
where a.materia_id = 25
  and a.excluido = 0
  and t.curso_id = 5
  and t.uc ilike 'Introdu%Tecnologia da Informa%'
  and coalesce(
        (select min(at.data_atividade) from public.atividade at where at.aula_id = a.id),
        a.data_planejada
      ) is not null
on conflict (aula_id, turma_codigo) do nothing;
