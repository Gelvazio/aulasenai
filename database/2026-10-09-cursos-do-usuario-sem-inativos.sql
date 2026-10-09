-- 2026-10-09 — cursos_do_usuario() não mostra curso desativado (curso.ativo = 0) a alunos e
-- professores. O Professor Administrador continua vendo todos (para poder reativar em cursos.html).
-- Pedido do usuário em 2026-10-09 (Etapa 120 do STATUS.md). Idempotente.

create or replace function public.cursos_do_usuario()
 returns table(id bigint, nome_completo text, descricao text)
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select c.id, c.nome_completo, c.descricao
    from public.curso as c
   where auth.uid() is not null
     and (
       public.eh_professor_administrador()
       or (
         coalesce(c.ativo, 1) <> 0
         and (
           exists (
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
       )
     )
   order by c.nome_completo;
$function$;
