-- Tarefa #254.4 (2026-10-17): apaga de verdade as aulas que já estavam com a exclusão lógica
-- (aulas.excluido = 1) e não têm atividade vinculada. aula_turma sai junto (on delete cascade).
-- Consulta de 2026-10-17 (aulas com excluido = 1):
--   70 (matéria 25, aula 13, "Manual de Comunicação Técnica do CD (v1)") — 0 atividades → apaga
--   71 (matéria 25, aula 14, "Manual de Comunicação Técnica do CD (versão simplificada)") — 0 → apaga
--   41 (matéria 27, aula 5) e 42 (matéria 27, aula 6) — 1 atividade cada → ficam (o banco recusa
--   apagar aula com atividade; a atividade precisa ser desvinculada ou excluída antes).

-- 1) Conferir antes:
select a.id, a.materia_id, a.numero, a.titulo,
       (select count(*) from public.atividade t where t.aula_id = a.id) as atividades
from public.aulas a
where a.excluido = 1
order by a.id;

-- 2) Apagar só as sem atividade:
delete from public.aulas a
where a.excluido = 1
  and not exists (select 1 from public.atividade t where t.aula_id = a.id)
returning a.id, a.titulo;
