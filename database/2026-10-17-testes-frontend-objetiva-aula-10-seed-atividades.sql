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

  -- Aula 10: Projeto Prático Integrador Suíte de Testes
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Projeto Prático Integrador Suíte de Testes' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (10, 'Projeto Prático Integrador Suíte de Testes', v_materia, v_curso, '2026-11-13')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Projeto Prático Integrador Suíte de Testes', 'PENDENTE', v_aula, '2026-11-13',
      'Atividade — Projeto Prático Integrador Suíte de Testes (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-10-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Ordem do Processo', 'B'),
      (v_atividade, 2, 'Planejamento no Projeto', 'D'),
      (v_atividade, 3, 'Desenho dos Testes', 'A'),
      (v_atividade, 4, 'Execução no Projeto', 'D'),
      (v_atividade, 5, 'Monitoração no Projeto', 'B'),
      (v_atividade, 6, 'Avaliação no Projeto', 'B'),
      (v_atividade, 7, 'Prioridade na Black Friday', 'C'),
      (v_atividade, 8, 'Segundo Alvo', 'A'),
      (v_atividade, 9, 'Fora do Escopo na Loja', 'C'),
      (v_atividade, 10, 'Caso de Borda', 'C'),
      (v_atividade, 11, 'Ferramenta dos Unitários', 'C'),
      (v_atividade, 12, 'Ferramentas da Integração', 'D'),
      (v_atividade, 13, 'Ferramentas do E2E', 'A'),
      (v_atividade, 14, 'Exemplo de Unitário', 'D'),
      (v_atividade, 15, 'Exemplo de Integração', 'C'),
      (v_atividade, 16, 'Pirâmide na Suíte', 'C'),
      (v_atividade, 17, 'Suíte Organizada', 'A'),
      (v_atividade, 18, 'Pasta dos Unitários', 'B'),
      (v_atividade, 19, 'Pasta da Integração', 'A'),
      (v_atividade, 20, 'Pasta e2e', 'C'),
      (v_atividade, 21, 'Configuração da Cobertura', 'A'),
      (v_atividade, 22, 'Script test', 'A'),
      (v_atividade, 23, 'Script test:run', 'D'),
      (v_atividade, 24, 'Script test:coverage', 'D'),
      (v_atividade, 25, 'Script test:e2e', 'D'),
      (v_atividade, 26, 'Script no Pipeline', 'A'),
      (v_atividade, 27, 'Cobertura Mínima', 'B'),
      (v_atividade, 28, 'Meta Excelente de Cobertura', 'B'),
      (v_atividade, 29, 'Mínimo de Unitários', 'C'),
      (v_atividade, 30, 'Integração Excelente', 'B'),
      (v_atividade, 31, 'Fluxos E2E Mínimos', 'B'),
      (v_atividade, 32, 'E2E Estáveis', 'D'),
      (v_atividade, 33, 'Pipeline Excelente', 'D'),
      (v_atividade, 34, 'Seções do TESTING.md', 'A'),
      (v_atividade, 35, 'Como Rodar', 'C'),
      (v_atividade, 36, 'Estratégia', 'A'),
      (v_atividade, 37, 'Resultado', 'C'),
      (v_atividade, 38, 'Como Contribuir', 'B'),
      (v_atividade, 39, 'Fora do Escopo', 'C'),
      (v_atividade, 40, 'Operadora de Cartão', 'A'),
      (v_atividade, 41, 'Fora do Escopo × Esquecer', 'B'),
      (v_atividade, 42, 'Evidência para a Black Friday', 'D'),
      (v_atividade, 43, 'Cartão de Revisão', 'B'),
      (v_atividade, 44, 'Risco no Code Review', 'D'),
      (v_atividade, 45, 'Respondendo ao Code Review', 'A'),
      (v_atividade, 46, 'Sugestão Não Aplicada', 'A'),
      (v_atividade, 47, 'Pesos da Avaliação', 'B'),
      (v_atividade, 48, 'Cálculo da Nota Final', 'B'),
      (v_atividade, 49, 'Aprovação na UC', 'C'),
      (v_atividade, 50, 'Parecer por Capacidade', 'D');
end $$;
