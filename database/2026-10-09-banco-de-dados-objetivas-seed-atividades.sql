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

  select id into v_materia from public.materia where descricao = 'BANCO DE DADOS' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('BANCO DE DADOS', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Banco de Dados e SGBD: Conceitos e Usos
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Banco de Dados e SGBD: Conceitos e Usos' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (1, 'Banco de Dados e SGBD: Conceitos e Usos', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Banco de Dados e SGBD: Conceitos e Usos', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Banco de Dados e SGBD: Conceitos e Usos (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Que É um Dado', 'A'),
      (v_atividade, 2, 'Dado × Informação', 'C'),
      (v_atividade, 3, 'Definição de Banco de Dados', 'C'),
      (v_atividade, 4, 'Definição de SGBD', 'D'),
      (v_atividade, 5, 'Quem Acessa o Arquivo do Banco', 'D'),
      (v_atividade, 6, 'Funcionalidade de Armazenamento', 'C'),
      (v_atividade, 7, 'Funcionalidade de Integridade', 'D'),
      (v_atividade, 8, 'Controle de Acesso', 'A'),
      (v_atividade, 9, 'Concorrência', 'B'),
      (v_atividade, 10, 'Recuperação de Falhas', 'C'),
      (v_atividade, 11, 'Consulta', 'C'),
      (v_atividade, 12, 'Planilha com Vários Usuários', 'D'),
      (v_atividade, 13, 'Planilha com Muitos Registros', 'A'),
      (v_atividade, 14, 'Regra de E-mail Único', 'D'),
      (v_atividade, 15, 'Redundância', 'A'),
      (v_atividade, 16, 'Inconsistência', 'B'),
      (v_atividade, 17, 'Papel do Front-End', 'D'),
      (v_atividade, 18, 'Papel do Back-End', 'B'),
      (v_atividade, 19, 'Papel do SGBD na Arquitetura', 'A'),
      (v_atividade, 20, 'Banco Aberto ao Navegador', 'A'),
      (v_atividade, 21, 'Linguagem de Conversa com o Banco', 'C'),
      (v_atividade, 22, 'Banco Relacional', 'A'),
      (v_atividade, 23, 'Banco Não Relacional', 'B'),
      (v_atividade, 24, 'Exemplo de SGBD Relacional', 'D'),
      (v_atividade, 25, 'Exemplo de SGBD Não Relacional', 'D'),
      (v_atividade, 26, 'SQLite', 'B'),
      (v_atividade, 27, 'SGBD da UC', 'D'),
      (v_atividade, 28, 'Motivos do PostgreSQL', 'D'),
      (v_atividade, 29, 'Tabela', 'A'),
      (v_atividade, 30, 'Coluna', 'B'),
      (v_atividade, 31, 'Linha', 'C'),
      (v_atividade, 32, 'Identificador da Linha', 'B'),
      (v_atividade, 33, 'Leitura de uma Consulta', 'A'),
      (v_atividade, 34, 'Cláusula FROM', 'B'),
      (v_atividade, 35, 'Cláusula WHERE', 'B'),
      (v_atividade, 36, 'Exemplo de Sistema com Banco', 'A'),
      (v_atividade, 37, 'Dados de uma Loja Virtual', 'D'),
      (v_atividade, 38, 'Finalizar Compra', 'B'),
      (v_atividade, 39, 'Pedido e Pagamento Juntos', 'C'),
      (v_atividade, 40, 'Banco Bem Modelado', 'C'),
      (v_atividade, 41, 'Sistema da Escola', 'B'),
      (v_atividade, 42, 'App de Entregas', 'B'),
      (v_atividade, 43, 'Usuário do Banco para a Aplicação', 'A'),
      (v_atividade, 44, 'Dado Pessoal', 'A'),
      (v_atividade, 45, 'Gestão do Tempo na UC', 'C'),
      (v_atividade, 46, 'Plano de Estudos', 'C'),
      (v_atividade, 47, 'Ordem das Etapas da UC', 'B'),
      (v_atividade, 48, 'Detetive dos Dados', 'A'),
      (v_atividade, 49, 'Informação para Decisão', 'C'),
      (v_atividade, 50, 'Relacional ou Não Relacional', 'D');

  -- Aula 2: Gerenciadores: Características, Requisitos e Níveis
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Gerenciadores: Características, Requisitos e Níveis' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (2, 'Gerenciadores: Características, Requisitos e Níveis', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Gerenciadores: Características, Requisitos e Níveis', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Gerenciadores: Características, Requisitos e Níveis (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-02-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Característica Modelo de Dados', 'B'),
      (v_atividade, 2, 'Licença Livre', 'B'),
      (v_atividade, 3, 'Licença Comercial', 'C'),
      (v_atividade, 4, 'O Que É Transação', 'A'),
      (v_atividade, 5, 'Atomicidade', 'B'),
      (v_atividade, 6, 'Consistência', 'D'),
      (v_atividade, 7, 'Isolamento', 'A'),
      (v_atividade, 8, 'Durabilidade', 'B'),
      (v_atividade, 9, 'COMMIT', 'B'),
      (v_atividade, 10, 'ROLLBACK', 'B'),
      (v_atividade, 11, 'Pedido sem Pagamento', 'A'),
      (v_atividade, 12, 'Estoque Negativo', 'D'),
      (v_atividade, 13, 'Escalabilidade Vertical', 'A'),
      (v_atividade, 14, 'Escalabilidade Horizontal', 'D'),
      (v_atividade, 15, 'Desempenho', 'C'),
      (v_atividade, 16, 'Segurança do Gerenciador', 'C'),
      (v_atividade, 17, 'Ferramentas e Comunidade', 'C'),
      (v_atividade, 18, 'SQLite', 'B'),
      (v_atividade, 19, 'MongoDB', 'A'),
      (v_atividade, 20, 'MySQL e MariaDB', 'D'),
      (v_atividade, 21, 'SQL Server', 'D'),
      (v_atividade, 22, 'PostgreSQL e JSON', 'D'),
      (v_atividade, 23, 'Requisito de Sistema Operacional', 'C'),
      (v_atividade, 24, 'Requisito de Disco', 'A'),
      (v_atividade, 25, 'Porta do PostgreSQL', 'B'),
      (v_atividade, 26, 'Porta do MySQL', 'C'),
      (v_atividade, 27, 'Porta do SQL Server', 'D'),
      (v_atividade, 28, 'Requisito de Rede', 'C'),
      (v_atividade, 29, 'Requisito de Pessoas', 'D'),
      (v_atividade, 30, 'Requisito de Disponibilidade', 'B'),
      (v_atividade, 31, 'Níveis de Gerenciamento', 'C'),
      (v_atividade, 32, 'Nível Externo', 'C'),
      (v_atividade, 33, 'Nível Conceitual', 'A'),
      (v_atividade, 34, 'Nível Físico', 'B'),
      (v_atividade, 35, 'Classificando o Nível 1', 'A'),
      (v_atividade, 36, 'Classificando o Nível 2', 'D'),
      (v_atividade, 37, 'Classificando o Nível 3', 'A'),
      (v_atividade, 38, 'Independência Lógica', 'B'),
      (v_atividade, 39, 'Independência Física', 'A'),
      (v_atividade, 40, 'Papel do Usuário Final', 'C'),
      (v_atividade, 41, 'Papel do Desenvolvedor', 'D'),
      (v_atividade, 42, 'Papel do DBA', 'B'),
      (v_atividade, 43, 'Primeiro Passo da Escolha', 'A'),
      (v_atividade, 44, 'Critério de Escolha', 'A'),
      (v_atividade, 45, 'Justificativa Registrada', 'B'),
      (v_atividade, 46, 'Loja Ponto Web', 'C'),
      (v_atividade, 47, 'App de Anotações', 'D'),
      (v_atividade, 48, 'Leilão dos Gerenciadores', 'D'),
      (v_atividade, 49, 'Requisito ou Característica', 'C'),
      (v_atividade, 50, 'Visão para Cada Setor', 'A');
end $$;
