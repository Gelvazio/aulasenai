-- 2026-10-09 — Vincular turma a curso pela página cursos.html (menu CURSO).
-- Plano: docs/menu-curso-crud-cursos-turmas.md (Etapa 118 do STATUS.md).
--
-- A tabela turma só tem política de SELECT (nenhum UPDATE pela API). Esta função grava
-- turma.curso_id e só aceita o Professor Administrador (eh_professor_administrador()).
-- p_curso_id = null desvincula a turma do curso. Idempotente; não apaga dados.

create or replace function public.definir_curso_turma(p_turma_codigo text, p_curso_id bigint)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if not public.eh_professor_administrador() then
    raise exception 'Somente o Professor Administrador pode vincular turmas a cursos.'
      using errcode = '42501';
  end if;

  if not exists (select 1 from public.turma where codigo = p_turma_codigo) then
    raise exception 'Turma % não encontrada.', p_turma_codigo using errcode = 'P0002';
  end if;

  if p_curso_id is not null
     and not exists (select 1 from public.curso where id = p_curso_id) then
    raise exception 'Curso % não encontrado.', p_curso_id using errcode = 'P0002';
  end if;

  update public.turma
     set curso_id = p_curso_id
   where codigo = p_turma_codigo;
end;
$$;

revoke all on function public.definir_curso_turma(text, bigint) from public, anon;
grant execute on function public.definir_curso_turma(text, bigint) to authenticated;
