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

  -- Aula 8: TDD e Debugging Moderno no Front-End
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'TDD e Debugging Moderno no Front-End' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (8, 'TDD e Debugging Moderno no Front-End', v_materia, v_curso, '2026-11-06')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('TDD e Debugging Moderno no Front-End', 'PENDENTE', v_aula, '2026-11-06',
      'Atividade — TDD e Debugging Moderno no Front-End (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-08-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Que É TDD', 'A'),
      (v_atividade, 2, 'Ordem do Ciclo', 'D'),
      (v_atividade, 3, 'Fase Vermelha', 'D'),
      (v_atividade, 4, 'Fim da Fase Vermelha', 'B'),
      (v_atividade, 5, 'Fase Verde', 'D'),
      (v_atividade, 6, 'Fase Refatorar', 'C'),
      (v_atividade, 7, 'Fim da Refatoração', 'B'),
      (v_atividade, 8, 'Modo Observação', 'A'),
      (v_atividade, 9, 'Tamanho do Ciclo', 'A'),
      (v_atividade, 10, 'Vantagem do TDD', 'B'),
      (v_atividade, 11, 'Teste como Documentação', 'C'),
      (v_atividade, 12, 'Quando Não Usar TDD', 'A'),
      (v_atividade, 13, 'Conferindo o Layout', 'C'),
      (v_atividade, 14, 'Primeiro Teste do CPF', 'A'),
      (v_atividade, 15, 'Por Que o Primeiro Teste Falha', 'A'),
      (v_atividade, 16, 'Código Mínimo', 'D'),
      (v_atividade, 17, 'O return false Proposital', 'D'),
      (v_atividade, 18, 'Ciclo do Tamanho', 'D'),
      (v_atividade, 19, 'Dígitos Iguais', 'B'),
      (v_atividade, 20, 'Dígito Verificador Correto', 'B'),
      (v_atividade, 21, 'Dígito Verificador Errado', 'C'),
      (v_atividade, 22, 'Limpando a Pontuação', 'A'),
      (v_atividade, 23, 'Padrão de 11 Dígitos', 'B'),
      (v_atividade, 24, 'Teste Que Passa Direto', 'A'),
      (v_atividade, 25, 'Teste Estrutural', 'B'),
      (v_atividade, 26, 'Próximo Teste pela Caixa Branca', 'D'),
      (v_atividade, 27, 'Caminho do Dígito Zero', 'D'),
      (v_atividade, 28, 'Os Dois Caminhos', 'D'),
      (v_atividade, 29, 'Filtro sem Texto', 'B'),
      (v_atividade, 30, 'Query da Lista', 'B'),
      (v_atividade, 31, 'Maiúsculas e Acentos', 'B'),
      (v_atividade, 32, 'Filtros Combinados', 'D'),
      (v_atividade, 33, 'Nada Encontrado', 'A'),
      (v_atividade, 34, 'TDD na Interface', 'C'),
      (v_atividade, 35, 'Lendo a Falha', 'B'),
      (v_atividade, 36, 'Isolando o Teste', 'B'),
      (v_atividade, 37, 'Isolando o Grupo', 'C'),
      (v_atividade, 38, 'Breakpoint no VS Code', 'A'),
      (v_atividade, 39, 'O Que o Breakpoint Mostra', 'A'),
      (v_atividade, 40, 'screen.debug', 'B'),
      (v_atividade, 41, 'Defeito do resto <= 2', 'C'),
      (v_atividade, 42, 'Corrigir e Confirmar', 'A'),
      (v_atividade, 43, 'it.only no Repositório', 'A'),
      (v_atividade, 44, 'console.log de Depuração', 'C'),
      (v_atividade, 45, 'Code Review', 'C'),
      (v_atividade, 46, 'Pergunta do Code Review', 'C'),
      (v_atividade, 47, 'Testes Dependentes', 'C'),
      (v_atividade, 48, 'Comentário Respeitoso', 'D'),
      (v_atividade, 49, 'Recebendo a Sugestão', 'C'),
      (v_atividade, 50, 'Ideias Diferentes', 'D');
end $$;
