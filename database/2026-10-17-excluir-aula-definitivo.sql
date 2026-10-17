-- Tarefa #254 (2026-10-17): a exclusão da aula passa a apagar a linha (DELETE), no lugar da
-- exclusão lógica (aulas.excluido = 1) de database/2026-10-06-aulas-excluido.sql.
-- Usada pelo "🗑️ Excluir" do card (#253) e pelo do "📚 Gerenciar Aulas" (#250).
-- Regras: só o Professor Administrador; aula com atividade vinculada (atividade.aula_id) é
-- recusada; aula_turma sai junto (on delete cascade). Chaves que apontam para aulas (consulta
-- de 2026-10-17): atividade_aula_id_fkey (sem cascade) e aula_turma_aula_id_fkey (cascade).
-- Idempotente.

create or replace function public.excluir_aula(p_aula bigint)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.eh_professor_administrador() then
    raise exception 'Somente o Professor Administrador pode excluir aulas.'
      using errcode = '42501';
  end if;
  if exists (select 1 from public.atividade where aula_id = p_aula) then
    raise exception 'A aula tem atividade vinculada: remova ou exclua as atividades primeiro.'
      using errcode = '23503';
  end if;
  delete from public.aulas where id = p_aula;
  return found;
end;
$$;

revoke all on function public.excluir_aula(bigint) from public, anon;
grant execute on function public.excluir_aula(bigint) to authenticated;
