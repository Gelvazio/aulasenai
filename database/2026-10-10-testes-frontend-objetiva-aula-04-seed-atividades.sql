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

  -- Aula 4: Testes de Integração com DOM usando Testing Library
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Testes de Integração com DOM usando Testing Library' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (4, 'Testes de Integração com DOM usando Testing Library', v_materia, v_curso, '2026-10-22')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Testes de Integração com DOM usando Testing Library', 'PENDENTE', v_aula, '2026-10-22',
      'Atividade — Testes de Integração com DOM usando Testing Library (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-04-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Que o Teste de Integração Verifica', 'B'),
      (v_atividade, 2, 'Lugar na Pirâmide', 'A'),
      (v_atividade, 3, 'Velocidade Comparada', 'A'),
      (v_atividade, 4, 'O Que É o JSDOM', 'D'),
      (v_atividade, 5, 'Por Que o JSDOM É Rápido', 'D'),
      (v_atividade, 6, 'Comando de Instalação', 'C'),
      (v_atividade, 7, 'Opção -D', 'A'),
      (v_atividade, 8, 'Ambiente do Vitest', 'D'),
      (v_atividade, 9, 'Arquivo de Setup', 'B'),
      (v_atividade, 10, 'Conteúdo do Setup', 'C'),
      (v_atividade, 11, 'Projeto React', 'C'),
      (v_atividade, 12, 'Comportamento × Implementação', 'D'),
      (v_atividade, 13, 'Teste que Quebra com CSS', 'C'),
      (v_atividade, 14, 'Caixa Preta', 'C'),
      (v_atividade, 15, 'Interação como o Usuário', 'B'),
      (v_atividade, 16, 'Primeira Query', 'B'),
      (v_atividade, 17, 'Última Query', 'C'),
      (v_atividade, 18, 'Campo com Rótulo', 'C'),
      (v_atividade, 19, 'Botão Cadastrar', 'A'),
      (v_atividade, 20, 'Papel de um Título', 'D'),
      (v_atividade, 21, 'Papel de um Campo de Texto', 'A'),
      (v_atividade, 22, 'Ordem das Queries', 'B'),
      (v_atividade, 23, 'Bônus da Query por Papel', 'C'),
      (v_atividade, 24, 'getBy', 'B'),
      (v_atividade, 25, 'queryBy', 'B'),
      (v_atividade, 26, 'findBy', 'A'),
      (v_atividade, 27, 'Mensagem que Não Deve Aparecer', 'C'),
      (v_atividade, 28, 'findBy com await', 'A'),
      (v_atividade, 29, 'userEvent.setup', 'A'),
      (v_atividade, 30, 'await nas Ações', 'D'),
      (v_atividade, 31, 'Digitação', 'D'),
      (v_atividade, 32, 'beforeEach', 'A'),
      (v_atividade, 33, 'Vários Elementos Encontrados', 'B'),
      (v_atividade, 34, 'Testes Independentes', 'B'),
      (v_atividade, 35, 'Simulando o Callback', 'C'),
      (v_atividade, 36, 'Conferir a Chamada', 'D'),
      (v_atividade, 37, 'toBeInTheDocument', 'A'),
      (v_atividade, 38, 'toBeVisible', 'A'),
      (v_atividade, 39, 'toBeDisabled', 'A'),
      (v_atividade, 40, 'toHaveTextContent', 'A'),
      (v_atividade, 41, 'toHaveValue', 'D'),
      (v_atividade, 42, 'toHaveAttribute', 'D'),
      (v_atividade, 43, 'Pré-condição no AAA', 'B'),
      (v_atividade, 44, 'Passos no AAA', 'B'),
      (v_atividade, 45, 'Resultado Esperado no AAA', 'C'),
      (v_atividade, 46, 'Teste de Funcionalidade', 'D'),
      (v_atividade, 47, 'Defeito do Cadastro', 'B'),
      (v_atividade, 48, 'Teste que Comprova o Defeito', 'C'),
      (v_atividade, 49, 'Teste Após a Correção', 'B'),
      (v_atividade, 50, 'Query sem Olhar o Código', 'D');
end $$;
