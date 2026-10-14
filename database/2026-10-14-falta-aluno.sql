-- Falta do aluno por dia de aula (tarefa #138, Etapa 265-a7055f5c, 2026-10-14).
-- O professor marca "Faltou?" no Progresso da Turma; a falta vale para o DIA (todas as atividades
-- daquele dia). Só esconde o aluno da lista do professor: notas e contas não mudam.
-- Dia da atividade: atividade.data_atividade, senão aulas.data_planejada (no front).
-- Idempotente; não apaga nem altera dados existentes.

create table if not exists public.falta_aluno (
  aluno_id    uuid        not null references auth.users(id) on delete cascade,
  data        date        not null,
  marcada_por uuid        default auth.uid(),
  marcada_em  timestamptz not null default now(),
  primary key (aluno_id, data)
);

comment on table public.falta_aluno is
  'Falta do aluno por dia de aula, marcada pelo professor no Progresso da Turma.';

alter table public.falta_aluno enable row level security;

drop policy if exists falta_aluno_select on public.falta_aluno;
create policy falta_aluno_select on public.falta_aluno
  for select to authenticated
  using (aluno_id = (select auth.uid()) or public.professor_pode_ver_aluno(aluno_id));

drop policy if exists falta_aluno_insert on public.falta_aluno;
create policy falta_aluno_insert on public.falta_aluno
  for insert to authenticated
  with check ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

drop policy if exists falta_aluno_delete on public.falta_aluno;
create policy falta_aluno_delete on public.falta_aluno
  for delete to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

revoke all on public.falta_aluno from anon;
grant select, insert, delete on public.falta_aluno to authenticated;
