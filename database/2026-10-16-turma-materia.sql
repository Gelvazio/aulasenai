-- ════════════════════════════════════════════════════════════════════════════════════════════
-- turma_materia: vínculo turma × matéria (2026-10-16, tarefa #211.2)
-- Etapa: tasks/etapas/ETAPA-338-3c6cc913-TURMAS-POR-MATERIA.md
--
-- O Professor Administrador vincula as turmas a cada matéria em turmas.html (botão 📚 Matérias).
-- O combo "Turma:" do ATIVIDADES/index.html da matéria lista só as turmas vinculadas a ela
-- (matéria sem vínculo continua listando todas — decisão D1 da etapa).
-- RLS no padrão da turmaprofessor: todo usuário logado lê; só o administrador grava e apaga.
-- Idempotente; não apaga dados.
-- ════════════════════════════════════════════════════════════════════════════════════════════

create table if not exists public.turma_materia (
  id bigint generated always as identity primary key,
  turma_codigo text not null references public.turma (codigo) on update cascade on delete cascade,
  materia_id bigint not null references public.materia (id) on delete cascade,
  criado_em timestamptz not null default now(),
  criado_por uuid default auth.uid() references auth.users (id) on delete set null,
  constraint turma_materia_unica unique (turma_codigo, materia_id)
);

create index if not exists turma_materia_materia_idx on public.turma_materia (materia_id);

alter table public.turma_materia enable row level security;

revoke all on public.turma_materia from anon;
revoke truncate on public.turma_materia from authenticated;
grant select, insert, delete on public.turma_materia to authenticated;

drop policy if exists turma_materia_select on public.turma_materia;
create policy turma_materia_select on public.turma_materia
  for select to authenticated
  using (true);

drop policy if exists turma_materia_insert_admin on public.turma_materia;
create policy turma_materia_insert_admin on public.turma_materia
  for insert to authenticated
  with check (public.eh_professor_administrador());

drop policy if exists turma_materia_delete_admin on public.turma_materia;
create policy turma_materia_delete_admin on public.turma_materia
  for delete to authenticated
  using (public.eh_professor_administrador());

-- Vínculo inicial pedido pelo usuário: Introdução à TIC (materia.id 25) nas turmas AOPL M1 e V1.
insert into public.turma_materia (turma_codigo, materia_id)
select v.turma_codigo, 25
  from (values ('135080'), ('135081')) as v (turma_codigo)
 where exists (select 1 from public.turma t where t.codigo = v.turma_codigo)
   and exists (select 1 from public.materia m where m.id = 25)
on conflict (turma_codigo, materia_id) do nothing;
