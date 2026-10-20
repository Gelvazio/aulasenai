-- Cadastra a matéria "Noções de Eletricidade e Circuitos Básicos" (curso Rio do Sul Mais Tech,
-- id 6) e as 9 aulas dela (MATERIAIS/RIO_DO_SUL_MAIS_TECH/NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/
-- AULAS/STATUS-AULAS.md; 36 h = 9 aulas de 4 h). Tarefa #302.0, pedido do professor em 2026-10-20,
-- para o seed do jogo "Liga ou Desliga?" (aula 01) poder ser aplicado.
-- Idempotente: não duplica a matéria, o vínculo nem as aulas. Não apaga nada.
with c as (select id from public.curso where nome_completo = 'Rio do Sul Mais Tech' limit 1),
nova as (insert into public.materia (descricao, ativo, curso_id, ensalado)
  select 'Noções de Eletricidade e Circuitos Básicos', 1, c.id, false from c
  where not exists (select 1 from public.materia m where m.descricao = 'Noções de Eletricidade e Circuitos Básicos' and m.curso_id = c.id)
  returning id),
m as (select id from nova union all select m.id from public.materia m, c
  where m.descricao = 'Noções de Eletricidade e Circuitos Básicos' and m.curso_id = c.id limit 1),
cm as (insert into public.cursomateria (cursoid, materiaid) select c.id, m.id from c, m on conflict do nothing returning 1),
au as (insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, data_planejada, ativo, visivel_alunos, nome_card)
  select v.numero, v.titulo, m.id, c.id, v.minutos, current_date, true, true, v.titulo
  from m, c, (values
    (1, 'Segurança em Eletricidade e Grandezas Elétricas Básicas', 240),
    (2, 'Instrumentos de Medição Elétrica', 240),
    (3, 'Componentes de Circuitos Elétricos', 240),
    (4, 'Instalações Elétricas Residenciais', 240),
    (5, 'Circuitos em Série', 240),
    (6, 'Circuitos em Paralelo', 240),
    (7, 'Montagem Prática de Circuitos', 240),
    (8, 'Diagnóstico e Manutenção', 240),
    (9, 'Avaliação Prática', 240)) v(numero, titulo, minutos)
  where not exists (select 1 from public.aulas a where a.materia_id = m.id and a.numero = v.numero)
  returning id)
select (select id from m) materia, (select count(*) from cm) vinculo_novo, (select count(*) from au) aulas_novas;
