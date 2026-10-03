-- 2026-10-03 — Descrição dos cursos que estavam sem descrição (índice da página inicial).
-- Texto resumido da Competência Geral / Objetivo Geral do EMENTA-PRINCIPAL-<CURSO>.md.
-- Idempotente: só preenche quem ainda está sem descrição.

update public.curso as c
   set descricao = v.descricao,
       updated_at = now()
  from (values
    (5::bigint, 'Execução dos processos logísticos de materiais e produtos, seguindo procedimentos internos, normas e legislação'),
    (6::bigint, 'Formação introdutória em Tecnologia da Informação e automação para funções técnicas e operacionais'),
    (7::bigint, 'Rotinas de gestão de materiais e administrativas de apoio à produção, logística e demais áreas da empresa')
  ) as v (id, descricao)
 where c.id = v.id
   and (c.descricao is null or btrim(c.descricao) = '');
