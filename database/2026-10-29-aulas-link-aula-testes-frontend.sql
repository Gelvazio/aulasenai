-- Preenche `aulas.link_aula` das 10 aulas de TESTES DE FRONTEND (tarefa #428.2, 2026-10-29).
-- Link do PDF no GitHub, por decisão do usuário. Mexe SÓ nestas 10 linhas (ids de `aulas`,
-- matéria TESTES DE FRONTEND, aulas 1 a 10); idempotente (regravar dá o mesmo resultado).
-- Antes: database/2026-10-29-aulas-link-aula.sql (coluna `link_aula` e backup).

update public.aulas as a
set link_aula = 'https://github.com/Gelvazio/aulasenai/blob/main/MATERIAIS/'
  || 'TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/AULA-'
  || lpad(v.numero::text, 2, '0') || '-SLIDES.pdf'
from (values (93, 1), (94, 2), (95, 3), (124, 4), (126, 5),
             (127, 6), (128, 7), (129, 8), (130, 9), (131, 10)) as v(id, numero)
where a.id = v.id and a.numero = v.numero;
