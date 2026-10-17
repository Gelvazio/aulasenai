-- Seed gerado por scripts/gerar-seed-atividades.py — não editar à mão.
-- Rodar depois de 2026-09-28-atividades-gabarito.sql. Idempotente.

insert into public.turma (codigo, nome, turno, horario) values
  ('135080', 'AI AOPL 2026/2 M1', 'Manhã', '07:15 às 11:15'),
  ('135081', 'AI AOPL 2026/2 V1', 'Tarde', '13:15 às 17:15')
on conflict (codigo) do update set nome = excluded.nome, turno = excluded.turno, horario = excluded.horario;

do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
  select id into v_curso from public.curso where nome_completo = 'Técnico em Informática para Internet' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Técnico em Informática para Internet') returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = 'TESTES DE FRONTEND' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('TESTES DE FRONTEND', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 9: Qualidade, Performance, Acessibilidade e CI CD
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Qualidade, Performance, Acessibilidade e CI CD' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (9, 'Qualidade, Performance, Acessibilidade e CI CD', v_materia, v_curso, '2026-11-12')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Qualidade, Performance, Acessibilidade e CI CD', 'PENDENTE', v_aula, '2026-11-12',
      'Atividade — Qualidade, Performance, Acessibilidade e CI CD (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-09-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Integração Contínua', 'D'),
      (v_atividade, 2, 'Entrega Contínua', 'C'),
      (v_atividade, 3, 'Vantagem do CI', 'A'),
      (v_atividade, 4, 'Arquivo do Workflow', 'A'),
      (v_atividade, 5, 'Chave on', 'A'),
      (v_atividade, 6, 'Chave jobs', 'C'),
      (v_atividade, 7, 'Chave runs-on', 'C'),
      (v_atividade, 8, 'actions/checkout', 'D'),
      (v_atividade, 9, 'setup-node com cache', 'A'),
      (v_atividade, 10, 'npm ci', 'A'),
      (v_atividade, 11, 'Cobertura no Pipeline', 'A'),
      (v_atividade, 12, 'Indentação do YAML', 'A'),
      (v_atividade, 13, 'needs: testes', 'C'),
      (v_atividade, 14, 'Por Que E2E Depois', 'D'),
      (v_atividade, 15, 'Action do Cypress', 'A'),
      (v_atividade, 16, 'Proteção da Branch', 'D'),
      (v_atividade, 17, 'Exigências da Proteção', 'A'),
      (v_atividade, 18, 'Pull Request Bloqueado', 'B'),
      (v_atividade, 19, 'Garantia da Proteção', 'A'),
      (v_atividade, 20, 'Acessibilidade e Usabilidade', 'C'),
      (v_atividade, 21, 'axe-core', 'C'),
      (v_atividade, 22, 'Instalando o vitest-axe', 'B'),
      (v_atividade, 23, 'Teste com axe', 'B'),
      (v_atividade, 24, 'Chamando o axe', 'D'),
      (v_atividade, 25, 'Campo sem Rótulo', 'D'),
      (v_atividade, 26, 'Imagem sem Texto Alternativo', 'D'),
      (v_atividade, 27, 'Botão Só com Ícone', 'A'),
      (v_atividade, 28, 'Contraste Mínimo', 'C'),
      (v_atividade, 29, 'Limite do axe', 'B'),
      (v_atividade, 30, 'Onde Fica o Lighthouse', 'B'),
      (v_atividade, 31, 'Modo da Auditoria', 'D'),
      (v_atividade, 32, 'LCP', 'C'),
      (v_atividade, 33, 'Valor Bom de LCP', 'C'),
      (v_atividade, 34, 'INP', 'C'),
      (v_atividade, 35, 'Valor Bom de INP', 'A'),
      (v_atividade, 36, 'CLS', 'B'),
      (v_atividade, 37, 'Valor Bom de CLS', 'D'),
      (v_atividade, 38, 'LCP Alto', 'B'),
      (v_atividade, 39, 'Página Que Pula', 'B'),
      (v_atividade, 40, 'Melhorando o INP', 'B'),
      (v_atividade, 41, 'Fora da Tela', 'C'),
      (v_atividade, 42, 'Pull Request como Encontro', 'D'),
      (v_atividade, 43, 'Revisão no Pull Request', 'C'),
      (v_atividade, 44, 'Liberando o Merge', 'D'),
      (v_atividade, 45, 'Defeito no Pull Request', 'B'),
      (v_atividade, 46, 'Badge', 'B'),
      (v_atividade, 47, 'Endereço do Badge', 'A'),
      (v_atividade, 48, 'TESTING.md', 'B'),
      (v_atividade, 49, 'Integrante Novo', 'B'),
      (v_atividade, 50, 'Ordem de Impacto', 'D');
end $$;
