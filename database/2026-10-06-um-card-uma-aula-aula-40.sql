-- 2026-10-06 — Regra "cada card ligado a apenas 1 aula": a aula 40 (Análise de Dados, matéria 27)
-- estava ligada a 3 cards do índice (AULA 07, AVALIACAO OBJETIVA 02 e PROVA PRÁTICA 06/10), e
-- editar o nome/rótulo de um card mudava os outros. A aula 40 fica só com o card da atividade 82
-- (Prova Prática); as atividades 33 e 35 ganham aulas próprias. Idempotente, sem apagar dados.

insert into public.aulas (numero, titulo, materia_id, curso_id)
select 7, 'Dashboards Interativos e Integração de Dados', 27, 7
where not exists (select 1 from public.aulas where materia_id = 27 and numero = 7);

insert into public.aulas (numero, titulo, materia_id, curso_id)
select 8, 'Avaliação Objetiva 02 — Aulas 05 a 07', 27, 7
where not exists (select 1 from public.aulas where materia_id = 27 and numero = 8);

update public.atividade set aula_id = (select id from public.aulas where materia_id = 27 and numero = 7)
where id = 33 and aula_id = 40;

update public.atividade set aula_id = (select id from public.aulas where materia_id = 27 and numero = 8)
where id = 35 and aula_id = 40;

-- O rótulo "AVALIACAO OBJETIVA 02" foi gravado na aula 40 pelo card da atividade 35; no card da
-- Prova Prática (82) ele volta ao rótulo do HTML. O nome do card digitado fica com a aula 40.
update public.aulas set rotulo_card = null where id = 40 and rotulo_card = 'AVALIACAO OBJETIVA 02';
