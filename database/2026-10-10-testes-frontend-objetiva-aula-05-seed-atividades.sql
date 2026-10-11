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

  -- Aula 5: Integração Avançada e Mock de APIs
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Integração Avançada e Mock de APIs' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (5, 'Integração Avançada e Mock de APIs', v_materia, v_curso, '2026-10-29')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Integração Avançada e Mock de APIs', 'PENDENTE', v_aula, '2026-10-29',
      'Atividade — Integração Avançada e Mock de APIs (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-05-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Por Que Simular a API', 'A'),
      (v_atividade, 2, 'Teste Instável', 'D'),
      (v_atividade, 3, 'Controle da Resposta', 'A'),
      (v_atividade, 4, 'Provocar Erro 500', 'B'),
      (v_atividade, 5, 'vi.fn por Parâmetro', 'D'),
      (v_atividade, 6, 'vi.spyOn no fetch', 'B'),
      (v_atividade, 7, 'O Que É o MSW', 'A'),
      (v_atividade, 8, 'MSW e o Código da Tela', 'A'),
      (v_atividade, 9, 'Instalação do MSW', 'D'),
      (v_atividade, 10, 'Import do Handler', 'B'),
      (v_atividade, 11, 'Handler de POST', 'C'),
      (v_atividade, 12, 'Ler o Corpo da Requisição', 'A'),
      (v_atividade, 13, 'Resposta 401', 'D'),
      (v_atividade, 14, 'setupServer', 'D'),
      (v_atividade, 15, 'Servidor em Módulo Próprio', 'C'),
      (v_atividade, 16, 'URL Completa', 'B'),
      (v_atividade, 17, 'servidor.listen', 'A'),
      (v_atividade, 18, 'onUnhandledRequest', 'C'),
      (v_atividade, 19, 'resetHandlers', 'C'),
      (v_atividade, 20, 'servidor.close', 'A'),
      (v_atividade, 21, 'Limpar o localStorage', 'A'),
      (v_atividade, 22, 'Login Aceito', 'C'),
      (v_atividade, 23, 'Conferir o Token', 'C'),
      (v_atividade, 24, 'Senha Errada', 'B'),
      (v_atividade, 25, 'Por Que findByText no Login', 'C'),
      (v_atividade, 26, 'Função Auxiliar', 'B'),
      (v_atividade, 27, 'Confiabilidade', 'D'),
      (v_atividade, 28, 'servidor.use', 'B'),
      (v_atividade, 29, 'Simular Erro 500', 'A'),
      (v_atividade, 30, 'Comportamento no Erro 500', 'B'),
      (v_atividade, 31, 'Comportamento no 404', 'C'),
      (v_atividade, 32, 'Comportamento na Rede Lenta', 'D'),
      (v_atividade, 33, 'Simular Demora', 'A'),
      (v_atividade, 34, 'Corpo Vazio no 500', 'A'),
      (v_atividade, 35, 'Objetivo do Teste de Confiabilidade', 'C'),
      (v_atividade, 36, 'Espera com Tempo Fixo', 'D'),
      (v_atividade, 37, 'Espera Confiável', 'B'),
      (v_atividade, 38, 'waitFor', 'B'),
      (v_atividade, 39, 'Aviso que Some', 'D'),
      (v_atividade, 40, 'Limite de Espera', 'C'),
      (v_atividade, 41, 'localStorage entre Testes', 'D'),
      (v_atividade, 42, 'Ler o Carrinho', 'A'),
      (v_atividade, 43, 'Quantidade de Itens', 'D'),
      (v_atividade, 44, 'Isolamento', 'C'),
      (v_atividade, 45, 'Executar os Testes', 'D'),
      (v_atividade, 46, 'Comando de Execução', 'B'),
      (v_atividade, 47, 'Leitura do Resumo', 'B'),
      (v_atividade, 48, 'Leitura da Falha', 'A'),
      (v_atividade, 49, 'Rodar 3 Vezes', 'B'),
      (v_atividade, 50, 'Mock Esconde Defeito', 'C');
end $$;
