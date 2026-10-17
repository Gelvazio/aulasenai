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

  -- Aula 7: Métricas e Cobertura de Testes
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Métricas e Cobertura de Testes' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (7, 'Métricas e Cobertura de Testes', v_materia, v_curso, '2026-11-05')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Métricas e Cobertura de Testes', 'PENDENTE', v_aula, '2026-11-05',
      'Atividade — Métricas e Cobertura de Testes (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-07-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Monitorar os Testes', 'D'),
      (v_atividade, 2, 'Controlar os Testes', 'A'),
      (v_atividade, 3, 'Base das Decisões', 'B'),
      (v_atividade, 4, 'Casos Executados', 'D'),
      (v_atividade, 5, 'Taxa de Aprovação', 'C'),
      (v_atividade, 6, 'Defeitos Críticos', 'C'),
      (v_atividade, 7, 'Tempo de Execução', 'B'),
      (v_atividade, 8, 'Testes Instáveis no Painel', 'C'),
      (v_atividade, 9, 'Instalando a Cobertura', 'B'),
      (v_atividade, 10, 'Script de Cobertura', 'A'),
      (v_atividade, 11, 'Provedor da Cobertura', 'C'),
      (v_atividade, 12, 'Relatórios da Cobertura', 'A'),
      (v_atividade, 13, 'Arquivos Medidos', 'C'),
      (v_atividade, 14, 'Statements', 'D'),
      (v_atividade, 15, 'Branches', 'A'),
      (v_atividade, 16, 'Functions', 'D'),
      (v_atividade, 17, 'Lines', 'A'),
      (v_atividade, 18, 'Métrica Mais Exigente', 'D'),
      (v_atividade, 19, '100% de Linhas e 50% de Branches', 'A'),
      (v_atividade, 20, 'Linha em Vermelho', 'A'),
      (v_atividade, 21, 'Marcador I', 'A'),
      (v_atividade, 22, 'Marcador E', 'B'),
      (v_atividade, 23, 'Pontos Cegos do Cupom', 'C'),
      (v_atividade, 24, 'Prioridade pelo Risco', 'D'),
      (v_atividade, 25, 'Papel do Math.max', 'B'),
      (v_atividade, 26, 'Teste do Total Negativo', 'D'),
      (v_atividade, 27, 'Testando o Erro', 'A'),
      (v_atividade, 28, 'Cupom Vencido', 'C'),
      (v_atividade, 29, 'Data Fixa', 'B'),
      (v_atividade, 30, 'Constantes com Nome', 'B'),
      (v_atividade, 31, 'Avaliação dos Resultados', 'B'),
      (v_atividade, 32, 'Critério de Saída', 'D'),
      (v_atividade, 33, 'Relatório de Testes', 'A'),
      (v_atividade, 34, 'Número Geral que Engana', 'A'),
      (v_atividade, 35, 'Meta por Módulo', 'C'),
      (v_atividade, 36, 'O Que a Cobertura Mede', 'C'),
      (v_atividade, 37, 'Teste sem expect', 'C'),
      (v_atividade, 38, 'Requisito Esquecido', 'B'),
      (v_atividade, 39, 'Cruzando com a Rastreabilidade', 'D'),
      (v_atividade, 40, 'Defeito no Valor-Limite', 'D'),
      (v_atividade, 41, 'Lição da Dinâmica', 'B'),
      (v_atividade, 42, 'Suíte Manutenível', 'D'),
      (v_atividade, 43, 'Nome do Teste', 'B'),
      (v_atividade, 44, 'Um Comportamento por Teste', 'C'),
      (v_atividade, 45, 'Teste pelo Comportamento', 'A'),
      (v_atividade, 46, 'Testes Independentes', 'C'),
      (v_atividade, 47, 'Metas Mínimas', 'B'),
      (v_atividade, 48, 'Configurando as Metas', 'B'),
      (v_atividade, 49, 'Abaixo da Meta', 'D'),
      (v_atividade, 50, 'Metas no Pipeline', 'A');
end $$;
