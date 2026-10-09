-- Cadastra a matéria "Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho"
-- (curso Rio do Sul Mais Tech, id 6) e as 9 aulas dela (MATERIAIS/RIO_DO_SUL_MAIS_TECH/
-- INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/AULAS/STATUS-AULAS.md). Pedido do usuário em 2026-10-09,
-- para os seeds das atividades práticas das aulas 01 e 02 poderem ser aplicados.
-- Idempotente: não duplica a matéria, o vínculo nem as aulas. Não apaga nada.
with c as (select id from public.curso where nome_completo = 'Rio do Sul Mais Tech' limit 1),
nova as (insert into public.materia (descricao, ativo, curso_id, ensalado)
  select 'Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho', 1, c.id, false from c
  where not exists (select 1 from public.materia m where m.descricao = 'Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho' and m.curso_id = c.id)
  returning id),
m as (select id from nova union all select m.id from public.materia m, c
  where m.descricao = 'Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho' and m.curso_id = c.id limit 1),
cm as (insert into public.cursomateria (cursoid, materiaid) select c.id, m.id from c, m on conflict do nothing returning 1),
au as (insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, data_planejada, ativo, visivel_alunos, nome_card, rotulo_card)
  select v.numero, v.titulo, m.id, c.id, v.minutos, current_date, true, true, v.titulo, 'AULA ' || lpad(v.numero::text, 2, '0')
  from m, c, (values
    (1, 'Fundamentos da Comunicação no Mundo do Trabalho', 240),
    (2, 'Comunicação Interpessoal e Trabalho em Equipe', 240),
    (3, 'Falar em Público e Apresentações', 240),
    (4, 'Reuniões e Atendimento ao Cliente', 240),
    (5, 'Redação Técnica: Clareza, Estrutura e Norma-Padrão', 240),
    (6, 'Textos do Trabalho: Relatório, Ata, Comunicado e Procedimento', 240),
    (7, 'E-mail, Redes Corporativas e Segurança Digital', 240),
    (8, 'Projeto Integrador: Comunicação em Equipe + Avaliação Prática', 240),
    (9, 'Avaliação Objetiva e Encerramento', 60)) v(numero, titulo, minutos)
  where not exists (select 1 from public.aulas a where a.materia_id = m.id and a.numero = v.numero)
  returning id)
select (select id from m) materia, (select count(*) from cm) vinculo_novo, (select count(*) from au) aulas_novas;
