-- 2026-10-03 — Curso da turma e cursos do usuário logado (índice da página inicial).
-- Plano: docs/indice-cursos-do-usuario-logado.md
-- Idempotente e sem apagar dados.

-- 1) Curso a que cada turma pertence.
alter table public.turma
  add column if not exists curso_id bigint references public.curso (id) on delete set null;

create index if not exists turma_curso_id_idx on public.turma (curso_id);

-- 2) Ligação das turmas existentes (só preenche quem ainda está sem curso).
update public.turma as t
   set curso_id = v.curso_id
  from (values
    ('122552', 2::bigint),
    ('133933', 7::bigint),
    ('135080', 5::bigint),
    ('135081', 5::bigint),
    ('QA LBTSN 2026/1 M2', 6::bigint)
  ) as v (codigo, curso_id)
 where t.codigo = v.codigo
   and t.curso_id is null;

-- 3) Cursos visíveis ao usuário logado:
--    administrador = todos; professor = cursos das turmas dele (turmaprofessor);
--    aluno = cursos das turmas dele (turmaaluno); sem login = nada.
create or replace function public.cursos_do_usuario()
returns table (id bigint, nome_completo text, descricao text)
language sql
stable
security definer
set search_path = public
as $$
  select c.id, c.nome_completo, c.descricao
    from public.curso as c
   where auth.uid() is not null
     and (
       public.eh_professor_administrador()
       or exists (
         select 1
           from public.turma as t
           join public.turmaprofessor as tp on tp.turma_codigo = t.codigo
          where t.curso_id = c.id
            and tp.professor_id = auth.uid()
       )
       or exists (
         select 1
           from public.turma as t
           join public.turmaaluno as ta on ta.turma_codigo = t.codigo
          where t.curso_id = c.id
            and ta.aluno_id = auth.uid()
       )
     )
   order by c.nome_completo;
$$;

revoke all on function public.cursos_do_usuario() from public, anon;
grant execute on function public.cursos_do_usuario() to authenticated;
