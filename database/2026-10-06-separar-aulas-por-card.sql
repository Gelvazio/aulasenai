-- 2026-10-06 — Regra "cada card ligado a apenas 1 aula" (pedido do usuário) e card com
-- 100% dos dados da tabela aulas. Gerado a partir dos índices de atividades.
-- 1) Atividades do mesmo card que estavam em outra aula vão para a aula do card.
-- 2) Aula dividida entre cards: o 1º card fica com ela; cada outro card ganha aula nova
--    (mesma matéria, curso e data; número = maior da matéria + 1).
-- 3) Copia o rótulo e o nome que cada card mostra hoje para aulas.rotulo_card/nome_card
--    (só onde estão vazios). Idempotente e sem apagar dados.

-- Backup do vínculo atividade → aula antes da reorganização (RLS ligado, sem políticas).
create table if not exists public.atividade_aula_backup_20261006 as
    select id, aula_id from public.atividade;
alter table public.atividade_aula_backup_20261006 enable row level security;

update public.atividade set aula_id = 23 where id = 13 and aula_id = 31;  -- card AULA 03

-- Cada card extra ganha aula nova (atividade, aula antiga, título = nome do card).
do $$
declare r record; v_nova bigint;
begin
  for r in select * from (values
    (19, 25, 'Avaliação Objetiva 01 — Aulas 01 a 05'),
    (58, 27, 'Manual de Comunicação Técnica do CD (v1)'),
    (59, 27, 'Manual de Comunicação Técnica do CD (versão simplificada)'),
    (80, 27, 'Comunicação Técnica no CD'),
    (81, 27, 'Comunicação Técnica no CD — Discursivas'),
    (20, 30, 'Avaliação Objetiva 02 — Aulas 06 a 10'),
    (36, 30, 'Avaliação Prática — Aulas 01 a 10'),
    (28, 37, 'Fundamentos Matemáticos para Gestão'),
    (30, 38, 'Excel Intermediário Formatação e Validação'),
    (34, 38, 'Avaliação das Aulas 01 a 04'),
    (32, 39, 'Excel Avançado Tabelas Dinâmicas e Gráficos'),
    (49, 45, 'PROVA OBJETIVA PROF RAFAEL')
  ) as t(atividade, aula_antiga, titulo) loop
    continue when not exists (select 1 from public.atividade
        where id = r.atividade and aula_id = r.aula_antiga);
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
    select (select max(a2.numero) + 1 from public.aulas a2 where a2.materia_id = a.materia_id),
           r.titulo, a.materia_id, a.curso_id, a.data_planejada
    from public.aulas a where a.id = r.aula_antiga
    returning id into v_nova;
    update public.atividade set aula_id = v_nova where id = r.atividade;
  end loop;
end $$;

-- Rótulo e nome que o card mostra hoje (atividade do link principal, rótulo, nome).
-- Reforço de Linguagens: nome null = o card mostra o título da aula.
update public.aulas a
set rotulo_card = coalesce(a.rotulo_card, t.rotulo),
    nome_card = coalesce(a.nome_card, t.nome)
from (values
    (2, 'AULA 01', 'Comunicação Profissional e Seus Fundamentos'),
    (3, 'AULA 02', 'Hardware, Periféricos e Sistemas Operacionais'),
    (5, 'AULA 03', 'Navegação na Web e Pesquisa Acadêmica'),
    (6, 'AULA 04', 'Comunicação Digital e Colaboração em Nuvem'),
    (7, 'AULA 05', 'Segurança da Informação e Proteção de Dados'),
    (19, 'AVALIAÇÃO 01', 'Avaliação Objetiva 01 — Aulas 01 a 05'),
    (8, 'AULA 06', 'Editor de Textos: Formatação e Estruturação'),
    (9, 'AULA 07', 'Textos Técnicos e Redação Empresarial'),
    (58, 'TRABALHO EM EQUIPE v1 · AULAS 01 A 07', 'Manual de Comunicação Técnica do CD (v1)'),
    (59, 'TRABALHO EM EQUIPE v2 · AULAS 01 A 07', 'Manual de Comunicação Técnica do CD (versão simplificada)'),
    (80, 'ATIVIDADE INDIVIDUAL · AULAS 01 A 07', 'Comunicação Técnica no CD'),
    (81, 'ATIVIDADE INDIVIDUAL · DISCURSIVAS · AULAS 01 A 07', 'Comunicação Técnica no CD — Discursivas'),
    (10, 'AULA 08', 'Editor de Planilhas: Organização e Fórmulas'),
    (11, 'AULA 09', 'Planilhas Eletrônicas: Análise Visual e Gráficos'),
    (12, 'AULA 10', 'Editor de Apresentações e TIC'),
    (20, 'AVALIAÇÃO 02', 'Avaliação Objetiva 02 — Aulas 06 a 10'),
    (36, 'AVALIAÇÃO PRÁTICA', 'Avaliação Prática — Aulas 01 a 10'),
    (27, 'AULA 01', 'Matemática Aplicada à Gestão Parte 1'),
    (28, 'AULA 02', 'Fundamentos Matemáticos para Gestão'),
    (29, 'AULA 03', 'Excel Básico Interface e Fórmulas'),
    (30, 'AULA 04', 'Excel Intermediário Formatação e Validação'),
    (31, 'AULA 05', 'Excel Avançado Funções Complexas e Busca'),
    (34, 'AVALIACAO OBJETIVA 01', 'Avaliação das Aulas 01 a 04'),
    (32, 'AULA 06', 'Excel Avançado Tabelas Dinâmicas e Gráficos'),
    (33, 'AULA 07', 'Dashboards Interativos e Integração de Dados'),
    (35, 'AVALIACAO OBJETIVA 02', 'Avaliação das Aulas 05 a 07'),
    (82, 'PROVA PRÁTICA 06/10', 'Prova Prática 06-10-2026 — Aulas 01 a 07'),
    (25, 'EXCEL 29/09', 'Controle de estoque do almoxarifado'),
    (26, 'EXCEL 01/10', 'Análise de compras com tabelas dinâmicas'),
    (43, 'ATIVIDADES', 'ATIVIDADES AULA 01 50 QUESTOES'),
    (44, 'ATIVIDADES', 'ATIVIDADES AULA 02 50 QUESTOES'),
    (45, 'ATIVIDADES', 'ATIVIDADES AULA 03 50 QUESTOES'),
    (46, 'ATIVIDADES', 'ATIVIDADES AULA 04 50 QUESTOES'),
    (47, 'ATIVIDADES', 'ATIVIDADES AULA 05 50 QUESTOES'),
    (48, 'ATIVIDADES', 'ATIVIDADES AULA 06 50 QUESTOES'),
    (50, 'ATIVIDADES', 'ATIVIDADES AULA 07 50 QUESTOES'),
    (51, 'ATIVIDADES', 'ATIVIDADES AULA 08 50 QUESTOES'),
    (52, 'ATIVIDADES', 'ATIVIDADES AULA 09 50 QUESTOES'),
    (53, 'ATIVIDADES', 'ATIVIDADES AULA 10 50 QUESTOES'),
    (54, 'ATIVIDADES', 'ATIVIDADES AULA 11 50 QUESTOES'),
    (55, 'ATIVIDADES', 'ATIVIDADES AULA 12 50 QUESTOES'),
    (56, 'ATIVIDADES', 'ATIVIDADES AULA 13 50 QUESTOES'),
    (57, 'ATIVIDADES', 'ATIVIDADES AULA 14 50 QUESTOES'),
    (49, 'ATIVIDADES', 'PROVA OBJETIVA PROF RAFAEL'),
    (14, 'AULA 01', 'Introdução à Tecnologia e Dispositivos Digitais'),
    (15, 'AULA 02', 'Cidadania Digital e Segurança Online'),
    (16, 'AULA 03', 'Ferramentas de Produtividade'),
    (17, 'AULA 04', 'Ferramentas de Apresentação e Pesquisa Online'),
    (18, 'AULA 05', 'Introdução aos Algoritmos'),
    (60, 'AULA 01', null),
    (62, 'AULA 02', null),
    (64, 'AULA 03', null),
    (66, 'AULA 04', null),
    (68, 'AULA 05', null),
    (70, 'AULA 06', null),
    (72, 'AULA 07', null),
    (74, 'AULA 08', null),
    (76, 'AULA 09', null),
    (78, 'AULA 10', null)
) as t(atividade, rotulo, nome)
join public.atividade x on x.id = t.atividade
where a.id = x.aula_id;
