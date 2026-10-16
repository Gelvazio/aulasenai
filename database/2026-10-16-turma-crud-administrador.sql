-- #201 (etapa 328-d0739bde) — CRUD da tabela turma na tela turmas.html (só Professor Administrador)
-- Idempotente. A leitura continua pela política turma_select (todo usuário logado).
-- Excluir só turma vazia: turmaaluno e equipe apagariam em cascata (aluno.turma_codigo já impede).

-- Segurança: anon não usa a turma; TRUNCATE ignora o RLS.
revoke all on public.turma from anon;
revoke truncate on public.turma from authenticated;

-- Turma sem alunos (turmaaluno/aluno) e sem equipes; security definer para não depender do RLS
-- das outras tabelas.
create or replace function public.turma_esta_vazia(p_codigo text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select not exists (select 1 from public.turmaaluno ta where ta.turma_codigo = p_codigo)
     and not exists (select 1 from public.aluno a where a.turma_codigo = p_codigo)
     and not exists (select 1 from public.equipe e where e.turma_codigo = p_codigo);
$$;

revoke all on function public.turma_esta_vazia(text) from public, anon;
grant execute on function public.turma_esta_vazia(text) to authenticated;

drop policy if exists turma_insert_admin on public.turma;
create policy turma_insert_admin on public.turma for insert to authenticated
  with check (public.eh_professor_administrador());

drop policy if exists turma_update_admin on public.turma;
create policy turma_update_admin on public.turma for update to authenticated
  using (public.eh_professor_administrador())
  with check (public.eh_professor_administrador());

drop policy if exists turma_delete_admin on public.turma;
create policy turma_delete_admin on public.turma for delete to authenticated
  using (public.eh_professor_administrador() and public.turma_esta_vazia(codigo));
