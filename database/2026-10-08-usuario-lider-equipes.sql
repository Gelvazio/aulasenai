-- Aluno líder (usuario.lider = 1) cadastra e altera equipes da própria turma.
-- Plano: docs/aluno-lider-cadastra-equipes.md (aprovado pelo usuário em 2026-10-08).
-- Idempotente e sem apagar dados. O líder não exclui equipe; o aluno não altera o próprio lider.

-- 1) Coluna lider (1 = líder, 0 = não) na tabela usuario.
alter table public.usuario add column if not exists lider smallint not null default 0;
alter table public.usuario drop constraint if exists usuario_lider_check;
alter table public.usuario add constraint usuario_lider_check check (lider in (0, 1));

-- 2) O usuário logado é aluno líder e está na turma?
create or replace function public.aluno_lider_da_turma(p_turma_codigo text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.usuario u
    join public.turmaaluno ta on ta.aluno_id = u.id
    where u.id = auth.uid() and u.lider = 1 and ta.turma_codigo = p_turma_codigo);
$$;
revoke all on function public.aluno_lider_da_turma(text) from public, anon;
grant execute on function public.aluno_lider_da_turma(text) to authenticated;

-- 3) Professor da turma (ou administrador) marca/desmarca o líder.
create or replace function public.definir_lider_usuario(p_usuario uuid, p_lider smallint)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_lider not in (0, 1) then raise exception 'lider deve ser 0 ou 1'; end if;
  if not public.professor_pode_ver_aluno(p_usuario) then
    raise exception 'Sem permissão para este aluno';
  end if;
  update public.usuario set lider = p_lider where id = p_usuario;
end $$;
revoke all on function public.definir_lider_usuario(uuid, smallint) from public, anon;
grant execute on function public.definir_lider_usuario(uuid, smallint) to authenticated;

-- 4) Alunos da turma (id e nome) para o líder montar as equipes (só a turma dele).
create or replace function public.alunos_da_turma_lider(p_turma_codigo text)
returns table (id uuid, nome text) language sql stable security definer
set search_path = public as $$
  select u.id, u.nome_completo::text from public.turmaaluno ta
  join public.usuario u on u.id = ta.aluno_id
  where ta.turma_codigo = p_turma_codigo and public.aluno_lider_da_turma(p_turma_codigo);
$$;
revoke all on function public.alunos_da_turma_lider(text) from public, anon;
grant execute on function public.alunos_da_turma_lider(text) to authenticated;

-- 5) Políticas do líder (as do professor continuam iguais). Líder não exclui equipe.
drop policy if exists equipe_select_lider on public.equipe;
create policy equipe_select_lider on public.equipe for select to authenticated
  using (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_insert_lider on public.equipe;
create policy equipe_insert_lider on public.equipe for insert to authenticated
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_update_lider on public.equipe;
create policy equipe_update_lider on public.equipe for update to authenticated
  using (public.aluno_lider_da_turma(turma_codigo))
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_select_lider on public.equipe_membro;
create policy equipe_membro_select_lider on public.equipe_membro for select to authenticated
  using (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_insert_lider on public.equipe_membro;
create policy equipe_membro_insert_lider on public.equipe_membro for insert to authenticated
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_update_lider on public.equipe_membro;
create policy equipe_membro_update_lider on public.equipe_membro for update to authenticated
  using (public.aluno_lider_da_turma(turma_codigo))
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_delete_lider on public.equipe_membro;
create policy equipe_membro_delete_lider on public.equipe_membro for delete to authenticated
  using (public.aluno_lider_da_turma(turma_codigo));
