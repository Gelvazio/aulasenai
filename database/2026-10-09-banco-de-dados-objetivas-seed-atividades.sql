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

  -- Aula 4: Configuração do SGBD e Infraestrutura do Sistema
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Configuração do SGBD e Infraestrutura do Sistema' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (4, 'Configuração do SGBD e Infraestrutura do Sistema', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Configuração do SGBD e Infraestrutura do Sistema', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Configuração do SGBD e Infraestrutura do Sistema (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-04-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Arquivo postgresql.conf', 'B'),
      (v_atividade, 2, 'Arquivo pg_hba.conf', 'A'),
      (v_atividade, 3, 'Localizar a Configuração', 'A'),
      (v_atividade, 4, 'Localizar o pg_hba.conf', 'D'),
      (v_atividade, 5, 'listen_addresses', 'D'),
      (v_atividade, 6, 'listen_addresses = ''localhost''', 'C'),
      (v_atividade, 7, 'Parâmetro port', 'A'),
      (v_atividade, 8, 'max_connections', 'D'),
      (v_atividade, 9, 'shared_buffers', 'B'),
      (v_atividade, 10, 'timezone', 'C'),
      (v_atividade, 11, 'log_connections', 'C'),
      (v_atividade, 12, 'ALTER SYSTEM', 'D'),
      (v_atividade, 13, 'pg_reload_conf', 'C'),
      (v_atividade, 14, 'Parâmetro que Exige Restart', 'C'),
      (v_atividade, 15, 'Reload ou Restart', 'B'),
      (v_atividade, 16, 'Quando Fazer Restart', 'B'),
      (v_atividade, 17, 'Linha do pg_hba.conf', 'C'),
      (v_atividade, 18, 'Método scram-sha-256', 'C'),
      (v_atividade, 19, 'Método trust', 'A'),
      (v_atividade, 20, 'Ordem das Linhas', 'D'),
      (v_atividade, 21, 'Depois de Alterar o pg_hba.conf', 'A'),
      (v_atividade, 22, 'Erro no pg_hba.conf', 'B'),
      (v_atividade, 23, 'Criar o Banco', 'C'),
      (v_atividade, 24, 'Criar o Usuário da Aplicação', 'B'),
      (v_atividade, 25, 'GRANT CONNECT', 'B'),
      (v_atividade, 26, 'Por Que um Usuário Próprio', 'A'),
      (v_atividade, 27, 'Testar o Usuário Novo', 'C'),
      (v_atividade, 28, 'String de Conexão', 'A'),
      (v_atividade, 29, 'Partes da String', 'A'),
      (v_atividade, 30, 'Variável de Ambiente', 'D'),
      (v_atividade, 31, 'Arquivo .env', 'D'),
      (v_atividade, 32, 'Caminho da Requisição', 'A'),
      (v_atividade, 33, 'Banco em Rede Interna', 'B'),
      (v_atividade, 34, 'Firewall do Banco', 'B'),
      (v_atividade, 35, 'Muitos Acessos', 'C'),
      (v_atividade, 36, 'Pool de Conexões', 'D'),
      (v_atividade, 37, 'Disponibilidade', 'A'),
      (v_atividade, 38, 'Desempenho e Infraestrutura', 'A'),
      (v_atividade, 39, 'Datas Erradas', 'A'),
      (v_atividade, 40, 'Correlação Característica e Infraestrutura', 'A'),
      (v_atividade, 41, 'Escola: Endereços', 'D'),
      (v_atividade, 42, 'Escola: listen_addresses', 'D'),
      (v_atividade, 43, 'Dados de Configuração', 'B'),
      (v_atividade, 44, 'Pasta da Configuração no Linux', 'B'),
      (v_atividade, 45, 'Ficha de Configuração', 'C'),
      (v_atividade, 46, 'Permissões nas Tabelas', 'D'),
      (v_atividade, 47, 'Erro Típico de Infraestrutura', 'B'),
      (v_atividade, 48, 'Parâmetro de Memória', 'C'),
      (v_atividade, 49, 'Mudança Sem Derrubar', 'B'),
      (v_atividade, 50, 'Monte a Arquitetura', 'D');

  -- Aula 5: Demandas do Cliente e Escopo do Projeto
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Demandas do Cliente e Escopo do Projeto' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (5, 'Demandas do Cliente e Escopo do Projeto', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Demandas do Cliente e Escopo do Projeto', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Demandas do Cliente e Escopo do Projeto (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-05-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Demanda e Necessidade', 'A'),
      (v_atividade, 2, 'Para Quem o Banco É Modelado', 'D'),
      (v_atividade, 3, 'Entrevista', 'A'),
      (v_atividade, 4, 'Questionário', 'B'),
      (v_atividade, 5, 'Observação', 'D'),
      (v_atividade, 6, 'Análise de Documentos', 'B'),
      (v_atividade, 7, 'Pergunta Aberta', 'A'),
      (v_atividade, 8, 'Pergunta sobre Regras', 'A'),
      (v_atividade, 9, 'Pergunta sobre Acesso', 'D'),
      (v_atividade, 10, 'Requisito de Dados', 'B'),
      (v_atividade, 11, 'Dados a Guardar', 'C'),
      (v_atividade, 12, 'Consultas e Relatórios', 'A'),
      (v_atividade, 13, 'Regra de Negócio', 'D'),
      (v_atividade, 14, 'Requisito de Acesso', 'D'),
      (v_atividade, 15, 'Volume e Histórico', 'C'),
      (v_atividade, 16, 'Qualidade dos Dados', 'B'),
      (v_atividade, 17, 'Requisito Verificável', 'A'),
      (v_atividade, 18, 'Substantivos do Pedido', 'C'),
      (v_atividade, 19, 'Características do Pedido', 'C'),
      (v_atividade, 20, 'CPF Não se Repete', 'A'),
      (v_atividade, 21, 'Matrícula com Aluno e Turma', 'A'),
      (v_atividade, 22, 'Valor Maior que Zero', 'C'),
      (v_atividade, 23, 'Limite de Alunos', 'C'),
      (v_atividade, 24, 'Registrar Quem Alterou', 'B'),
      (v_atividade, 25, 'Objetivo do Escopo', 'C'),
      (v_atividade, 26, 'Partes Interessadas', 'B'),
      (v_atividade, 27, 'Entra no Escopo', 'D'),
      (v_atividade, 28, 'Não Entra no Escopo', 'B'),
      (v_atividade, 29, 'Entregas e Prazos', 'A'),
      (v_atividade, 30, 'Premissas e Riscos', 'B'),
      (v_atividade, 31, 'Risco do Projeto', 'C'),
      (v_atividade, 32, 'Mudança de Escopo', 'D'),
      (v_atividade, 33, 'Projeto sem Controle', 'A'),
      (v_atividade, 34, 'Requisito Esquecido', 'A'),
      (v_atividade, 35, 'Gestão do Tempo na SA 1', 'C'),
      (v_atividade, 36, 'Escola: Necessidade Real', 'D'),
      (v_atividade, 37, 'Escola: Fora do Escopo', 'B'),
      (v_atividade, 38, 'Aluno Menor de Idade', 'B'),
      (v_atividade, 39, 'Dados Pessoais', 'D'),
      (v_atividade, 40, 'Dinâmica: Pedido Novo', 'C'),
      (v_atividade, 41, 'Dinâmica: Irmãos com CPF', 'D'),
      (v_atividade, 42, 'Inadimplentes', 'A'),
      (v_atividade, 43, 'Justificar Decisões', 'D'),
      (v_atividade, 44, 'Registro da Entrevista', 'C'),
      (v_atividade, 45, 'Quem Executa', 'D'),
      (v_atividade, 46, 'Escopo Mínimo', 'B'),
      (v_atividade, 47, 'Requisito ou Solução', 'B'),
      (v_atividade, 48, 'Histórico de 5 Anos', 'A'),
      (v_atividade, 49, 'Entrega da SA 1', 'B'),
      (v_atividade, 50, 'Do Escopo ao Modelo', 'C');

  -- Aula 6: Entidades Fortes, Fracas e Associativas
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Entidades Fortes, Fracas e Associativas' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (6, 'Entidades Fortes, Fracas e Associativas', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Entidades Fortes, Fracas e Associativas', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Entidades Fortes, Fracas e Associativas (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-06-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Que É o MER', 'C'),
      (v_atividade, 2, 'MER e Nível Conceitual', 'A'),
      (v_atividade, 3, 'MER Antes das Tabelas', 'D'),
      (v_atividade, 4, 'Definição de Entidade', 'B'),
      (v_atividade, 5, 'Ocorrência', 'A'),
      (v_atividade, 6, 'Entidade Abstrata', 'D'),
      (v_atividade, 7, 'Nome da Entidade', 'D'),
      (v_atividade, 8, 'Entidade ou Atributo 1', 'A'),
      (v_atividade, 9, 'Entidade ou Atributo 2', 'D'),
      (v_atividade, 10, 'Pergunta Entidade ou Atributo', 'A'),
      (v_atividade, 11, 'Entidade Forte', 'C'),
      (v_atividade, 12, 'Exemplo de Forte', 'D'),
      (v_atividade, 13, 'Entidade Fraca', 'D'),
      (v_atividade, 14, 'Entidade Dona', 'A'),
      (v_atividade, 15, 'Identificação da Fraca', 'A'),
      (v_atividade, 16, 'Exclusão da Dona', 'A'),
      (v_atividade, 17, 'Notação da Fraca', 'C'),
      (v_atividade, 18, 'Dependente', 'A'),
      (v_atividade, 19, 'Parcela', 'C'),
      (v_atividade, 20, 'Entidade Associativa', 'B'),
      (v_atividade, 21, 'Matrícula Associativa', 'D'),
      (v_atividade, 22, 'Dados da Associativa', 'C'),
      (v_atividade, 23, 'Item do Pedido', 'C'),
      (v_atividade, 24, 'Notação da Associativa', 'B'),
      (v_atividade, 25, 'Passo 1', 'C'),
      (v_atividade, 26, 'Passo 2', 'D'),
      (v_atividade, 27, 'Sinônimos', 'A'),
      (v_atividade, 28, 'Fora do Escopo', 'B'),
      (v_atividade, 29, 'Justificativa', 'A'),
      (v_atividade, 30, 'Turma', 'D'),
      (v_atividade, 31, 'Responsável', 'D'),
      (v_atividade, 32, 'Turno', 'C'),
      (v_atividade, 33, 'Professor', 'D'),
      (v_atividade, 34, 'Endereço na Escola', 'A'),
      (v_atividade, 35, 'Endereço nas Entregas', 'C'),
      (v_atividade, 36, 'Nota Fiscal', 'B'),
      (v_atividade, 37, 'CPF', 'D'),
      (v_atividade, 38, 'Item 2 do Pedido', 'C'),
      (v_atividade, 39, 'Associativa e Relacionamento', 'B'),
      (v_atividade, 40, 'Diferença Fraca e Associativa', 'B'),
      (v_atividade, 41, 'Dinâmica: Pilha de Atributos', 'B'),
      (v_atividade, 42, 'Dinâmica: Dependente', 'A'),
      (v_atividade, 43, 'Dinâmica: Matrícula', 'B'),
      (v_atividade, 44, 'Entrega da SA 1', 'B'),
      (v_atividade, 45, 'Próximo Passo', 'B'),
      (v_atividade, 46, 'Entidade Sem Ocorrências', 'C'),
      (v_atividade, 47, 'Paciente e Consulta', 'B'),
      (v_atividade, 48, 'Produto', 'C'),
      (v_atividade, 49, 'Ordem da Modelagem', 'A'),
      (v_atividade, 50, 'Identificador Próprio', 'B');

  -- Aula 7: Atributos
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Atributos' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (7, 'Atributos', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Atributos', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Atributos (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-07-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de Atributo', 'D'),
      (v_atividade, 2, 'Valor do Atributo', 'A'),
      (v_atividade, 3, 'Notação do Atributo', 'B'),
      (v_atividade, 4, 'Atributo Simples', 'D'),
      (v_atividade, 5, 'Exemplo de Simples', 'C'),
      (v_atividade, 6, 'Atributo Composto', 'C'),
      (v_atividade, 7, 'Exemplo de Composto', 'B'),
      (v_atividade, 8, 'Quando Dividir o Composto', 'C'),
      (v_atividade, 9, 'Composto Vira Colunas', 'B'),
      (v_atividade, 10, 'Atributo Descritivo', 'A'),
      (v_atividade, 11, 'Exemplo de Descritivo', 'C'),
      (v_atividade, 12, 'Atributo Nominativo', 'A'),
      (v_atividade, 13, 'Exemplo de Nominativo', 'C'),
      (v_atividade, 14, 'Atributo Referencial', 'D'),
      (v_atividade, 15, 'Exemplo de Referencial', 'A'),
      (v_atividade, 16, 'Referencial e Chave Estrangeira', 'D'),
      (v_atividade, 17, 'Nominativo e Identificador', 'A'),
      (v_atividade, 18, 'Referencial Mostra Relacionamento', 'D'),
      (v_atividade, 19, 'Definição de Identificador', 'A'),
      (v_atividade, 20, 'Regras do Identificador', 'A'),
      (v_atividade, 21, 'Identificador da Fraca', 'A'),
      (v_atividade, 22, 'Código Próprio', 'B'),
      (v_atividade, 23, 'CPF de Criança', 'C'),
      (v_atividade, 24, 'Nome como Identificador', 'D'),
      (v_atividade, 25, 'Idade ou Data de Nascimento', 'B'),
      (v_atividade, 26, 'Vários Telefones num Campo', 'D'),
      (v_atividade, 27, 'Referencial sem Entidade', 'A'),
      (v_atividade, 28, 'Dicionário de Atributos', 'C'),
      (v_atividade, 29, 'Coluna Obrigatório', 'B'),
      (v_atividade, 30, 'Tipo do Atributo', 'B'),
      (v_atividade, 31, 'Tamanho do Texto', 'B'),
      (v_atividade, 32, 'Exemplo no Dicionário', 'D'),
      (v_atividade, 33, 'Escola: Nome', 'A'),
      (v_atividade, 34, 'Escola: CPF', 'A'),
      (v_atividade, 35, 'Escola: Endereço', 'C'),
      (v_atividade, 36, 'Escola: Curso na Ficha', 'C'),
      (v_atividade, 37, 'Escola: Data da Matrícula', 'C'),
      (v_atividade, 38, 'Escola: Turno', 'B'),
      (v_atividade, 39, 'Nome Descritivo ou Nominativo', 'D'),
      (v_atividade, 40, 'Preço do Produto', 'D'),
      (v_atividade, 41, 'Código do Cliente no Pedido', 'B'),
      (v_atividade, 42, 'Telefone com DDD', 'D'),
      (v_atividade, 43, 'Situação da Matrícula', 'B'),
      (v_atividade, 44, 'Dinâmica: Campo Idade', 'C'),
      (v_atividade, 45, 'Dinâmica: Identificador', 'A'),
      (v_atividade, 46, 'Entrega da SA 1', 'C'),
      (v_atividade, 47, 'Próxima Etapa', 'B'),
      (v_atividade, 48, 'Tipos no PostgreSQL', 'B'),
      (v_atividade, 49, 'Atributo de Associativa', 'D'),
      (v_atividade, 50, 'Classificação em Duas Dimensões', 'A');

  -- Aula 8: Relacionamentos 1:1, 1:N e N:N
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Relacionamentos 1:1, 1:N e N:N' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (8, 'Relacionamentos 1:1, 1:N e N:N', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Relacionamentos 1:1, 1:N e N:N', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Relacionamentos 1:1, 1:N e N:N (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-08-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de Relacionamento', 'A'),
      (v_atividade, 2, 'Nome do Relacionamento', 'D'),
      (v_atividade, 3, 'Notação do Relacionamento', 'D'),
      (v_atividade, 4, 'Duas Perguntas', 'B'),
      (v_atividade, 5, 'Leitura num Sentido Só', 'D'),
      (v_atividade, 6, 'Um para Um', 'C'),
      (v_atividade, 7, 'Exemplo de 1:1', 'B'),
      (v_atividade, 8, 'Implementação do 1:1', 'A'),
      (v_atividade, 9, 'Um para Muitos', 'A'),
      (v_atividade, 10, 'Exemplo de 1:N', 'B'),
      (v_atividade, 11, 'Chave Estrangeira no 1:N', 'C'),
      (v_atividade, 12, 'Cliente e Pedido', 'A'),
      (v_atividade, 13, 'Muitos para Muitos', 'C'),
      (v_atividade, 14, 'Exemplo de N:N', 'A'),
      (v_atividade, 15, 'Implementação do N:N', 'A'),
      (v_atividade, 16, 'Associativa do Pedido', 'D'),
      (v_atividade, 17, 'Associativa da Escola', 'D'),
      (v_atividade, 18, 'N:N sem Associativa', 'D'),
      (v_atividade, 19, 'FK no Lado 1', 'B'),
      (v_atividade, 20, 'Cardinalidade Mínima', 'B'),
      (v_atividade, 21, 'Participação Opcional', 'C'),
      (v_atividade, 22, 'Participação Obrigatória', 'A'),
      (v_atividade, 23, 'Leitura da Notação', 'B'),
      (v_atividade, 24, 'Pé de Galinha', 'A'),
      (v_atividade, 25, 'Círculo no Pé de Galinha', 'B'),
      (v_atividade, 26, 'Traço no Pé de Galinha', 'D'),
      (v_atividade, 27, 'Autorrelacionamento', 'D'),
      (v_atividade, 28, 'Exemplo de Autorrelacionamento', 'D'),
      (v_atividade, 29, 'Implementação do Autorrelacionamento', 'B'),
      (v_atividade, 30, 'Pré-requisito', 'B'),
      (v_atividade, 31, 'Cupom e Pedido', 'B'),
      (v_atividade, 32, 'Aluno e Armário', 'D'),
      (v_atividade, 33, 'Médico e Paciente', 'A'),
      (v_atividade, 34, 'Matrícula e Parcela', 'C'),
      (v_atividade, 35, 'Responsável e Aluno', 'B'),
      (v_atividade, 36, 'Professor e Turma', 'B'),
      (v_atividade, 37, 'Curso e Turma na Escola', 'C'),
      (v_atividade, 38, 'Obrigatória sem Perguntar', 'A'),
      (v_atividade, 39, 'FK e Referencial', 'A'),
      (v_atividade, 40, 'Dados da Ligação', 'B'),
      (v_atividade, 41, 'Dinâmica: Duas Perguntas em Voz Alta', 'C'),
      (v_atividade, 42, 'Dinâmica: Divergência', 'A'),
      (v_atividade, 43, 'Entrega da SA 1', 'A'),
      (v_atividade, 44, 'Próximo Passo', 'C'),
      (v_atividade, 45, 'Turma e Sala', 'C'),
      (v_atividade, 46, 'Produto e Categoria', 'C'),
      (v_atividade, 47, 'Autor e Livro', 'C'),
      (v_atividade, 48, 'Cardinalidade Máxima e Mínima', 'D'),
      (v_atividade, 49, 'Ligação com a Aula 6', 'C'),
      (v_atividade, 50, 'Verbo nos Dois Sentidos', 'D');

  -- Aula 10: Normalização de Dados (1FN, 2FN e 3FN)
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Normalização de Dados (1FN, 2FN e 3FN)' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (10, 'Normalização de Dados (1FN, 2FN e 3FN)', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Normalização de Dados (1FN, 2FN e 3FN)', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Normalização de Dados (1FN, 2FN e 3FN) (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-10-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Objetivo da Normalização', 'B'),
      (v_atividade, 2, 'Benefício da Normalização', 'D'),
      (v_atividade, 3, 'Anomalia de Inserção', 'A'),
      (v_atividade, 4, 'Anomalia de Atualização', 'D'),
      (v_atividade, 5, 'Anomalia de Exclusão', 'B'),
      (v_atividade, 6, 'Dependência Funcional', 'B'),
      (v_atividade, 7, 'Exemplo de Dependência', 'C'),
      (v_atividade, 8, 'Curso e Carga', 'A'),
      (v_atividade, 9, 'Definição de 1FN', 'C'),
      (v_atividade, 10, 'Valor Atômico', 'C'),
      (v_atividade, 11, 'Telefones na Mesma Célula', 'C'),
      (v_atividade, 12, 'Grupos Repetidos', 'D'),
      (v_atividade, 13, 'Solução para a 1FN', 'A'),
      (v_atividade, 14, 'Definição de 2FN', 'D'),
      (v_atividade, 15, 'Dependência Parcial', 'C'),
      (v_atividade, 16, '2FN e Chave Simples', 'C'),
      (v_atividade, 17, 'Nome do Aluno na Matrícula', 'A'),
      (v_atividade, 18, 'Turno na Matrícula', 'B'),
      (v_atividade, 19, 'Data da Matrícula', 'A'),
      (v_atividade, 20, 'Definição de 3FN', 'C'),
      (v_atividade, 21, 'Dependência Transitiva', 'A'),
      (v_atividade, 22, 'Carga do Curso na Turma', 'A'),
      (v_atividade, 23, 'Correção da 3FN', 'D'),
      (v_atividade, 24, 'Regra de Bolso', 'D'),
      (v_atividade, 25, 'Ordem das Formas Normais', 'D'),
      (v_atividade, 26, 'Resultado da Escola', 'A'),
      (v_atividade, 27, 'Normalização e DER', 'B'),
      (v_atividade, 28, 'Mudança da Carga', 'B'),
      (v_atividade, 29, 'Pedido com Dados do Cliente', 'C'),
      (v_atividade, 30, 'Correção do Pedido', 'B'),
      (v_atividade, 31, 'Item do Pedido', 'B'),
      (v_atividade, 32, 'Preço no Item', 'D'),
      (v_atividade, 33, 'Desnormalização', 'D'),
      (v_atividade, 34, 'Justificar a Separação', 'A'),
      (v_atividade, 35, 'Biblioteca', 'C'),
      (v_atividade, 36, 'Clínica', 'A'),
      (v_atividade, 37, 'Endereço em Várias Partes', 'C'),
      (v_atividade, 38, 'Tabela sem Chave', 'B'),
      (v_atividade, 39, 'Redundância e Normalização', 'C'),
      (v_atividade, 40, 'Anomalia e Consequência', 'A'),
      (v_atividade, 41, 'Dinâmica: Primeiro Passo', 'B'),
      (v_atividade, 42, 'Dinâmica: Justificativa', 'D'),
      (v_atividade, 43, 'Entrega da SA 1', 'B'),
      (v_atividade, 44, 'Chave da Associativa', 'D'),
      (v_atividade, 45, 'FK Depois da 3FN', 'A'),
      (v_atividade, 46, 'Dados Contraditórios', 'A'),
      (v_atividade, 47, 'Curso Novo Sem Aluno', 'B'),
      (v_atividade, 48, 'Apagar Matrícula', 'B'),
      (v_atividade, 49, '3FN e Turma', 'C'),
      (v_atividade, 50, 'Normalização e Requisitos', 'D');

  -- Aula 11: Padronização de Dados, Cronograma e Fluxograma
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Padronização de Dados, Cronograma e Fluxograma' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (11, 'Padronização de Dados, Cronograma e Fluxograma', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Padronização de Dados, Cronograma e Fluxograma', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Padronização de Dados, Cronograma e Fluxograma (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-11-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Por Que Padronizar', 'B'),
      (v_atividade, 2, 'Nome de Tabela', 'A'),
      (v_atividade, 3, 'Nome de Coluna', 'B'),
      (v_atividade, 4, 'Singular', 'B'),
      (v_atividade, 5, 'Chave Primária', 'A'),
      (v_atividade, 6, 'Chave Estrangeira', 'A'),
      (v_atividade, 7, 'Palavra Reservada', 'C'),
      (v_atividade, 8, 'Espaços e Acentos', 'C'),
      (v_atividade, 9, 'Coluna Verdadeiro ou Falso', 'C'),
      (v_atividade, 10, 'Formato de Data', 'D'),
      (v_atividade, 11, 'Data e a Tela', 'C'),
      (v_atividade, 12, 'Data com Hora', 'D'),
      (v_atividade, 13, 'CPF Como Texto', 'A'),
      (v_atividade, 14, 'Telefone e CEP', 'A'),
      (v_atividade, 15, 'Valores em Dinheiro', 'C'),
      (v_atividade, 16, 'E-mail em Minúsculas', 'D'),
      (v_atividade, 17, 'Nomes Sem Abreviação', 'D'),
      (v_atividade, 18, 'Domínio', 'B'),
      (v_atividade, 19, 'Domínio da Situação', 'D'),
      (v_atividade, 20, 'Garantir o Domínio', 'A'),
      (v_atividade, 21, 'Sem Domínio', 'A'),
      (v_atividade, 22, 'Dicionário de Dados Final', 'C'),
      (v_atividade, 23, 'Dicionário e SQL', 'C'),
      (v_atividade, 24, 'O Que É Cronograma', 'A'),
      (v_atividade, 25, 'Dependência no Cronograma', 'B'),
      (v_atividade, 26, 'Marco', 'A'),
      (v_atividade, 27, 'Folga', 'D'),
      (v_atividade, 28, 'Scripts Depois do Modelo', 'B'),
      (v_atividade, 29, 'Acompanhamento', 'B'),
      (v_atividade, 30, 'Gantt', 'A'),
      (v_atividade, 31, 'O Que É Fluxograma', 'A'),
      (v_atividade, 32, 'Oval', 'C'),
      (v_atividade, 33, 'Retângulo', 'A'),
      (v_atividade, 34, 'Losango', 'D'),
      (v_atividade, 35, 'Paralelogramo', 'D'),
      (v_atividade, 36, 'Cilindro', 'B'),
      (v_atividade, 37, 'Setas', 'B'),
      (v_atividade, 38, 'Decisão da Vaga', 'C'),
      (v_atividade, 39, 'Gravação no Fluxo', 'B'),
      (v_atividade, 40, 'Decisão Esquecida', 'C'),
      (v_atividade, 41, 'Fluxograma e Requisitos', 'C'),
      (v_atividade, 42, 'Escola: Turno Padronizado', 'D'),
      (v_atividade, 43, 'Escola: Valor', 'D'),
      (v_atividade, 44, 'Escola: CPF', 'B'),
      (v_atividade, 45, 'Dinâmica: Cilindro', 'D'),
      (v_atividade, 46, 'Dinâmica: Ferramenta', 'C'),
      (v_atividade, 47, 'Entrega da SA 1', 'B'),
      (v_atividade, 48, 'Corrigir Nome', 'A'),
      (v_atividade, 49, 'Responsável no Cronograma', 'B'),
      (v_atividade, 50, 'Padrão e Back-End', 'D');

  -- Aula 12: DDL: Tabelas e Campos
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'DDL: Tabelas e Campos' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (12, 'DDL: Tabelas e Campos', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('DDL: Tabelas e Campos', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — DDL: Tabelas e Campos (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-12-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Que É SQL', 'B'),
      (v_atividade, 2, 'O Que É DDL', 'C'),
      (v_atividade, 3, 'Comandos DDL', 'C'),
      (v_atividade, 4, 'Comandos DML', 'A'),
      (v_atividade, 5, 'Tipo para Inteiros', 'A'),
      (v_atividade, 6, 'Tipo para Dinheiro', 'B'),
      (v_atividade, 7, 'numeric(10,2)', 'B'),
      (v_atividade, 8, 'varchar(n)', 'C'),
      (v_atividade, 9, 'text', 'D'),
      (v_atividade, 10, 'char(2)', 'A'),
      (v_atividade, 11, 'boolean', 'A'),
      (v_atividade, 12, 'date', 'D'),
      (v_atividade, 13, 'timestamptz', 'A'),
      (v_atividade, 14, 'CPF no CREATE TABLE', 'A'),
      (v_atividade, 15, 'CREATE TABLE', 'A'),
      (v_atividade, 16, 'Identificador Automático', 'B'),
      (v_atividade, 17, 'NOT NULL', 'A'),
      (v_atividade, 18, 'DEFAULT', 'C'),
      (v_atividade, 19, 'DEFAULT now()', 'A'),
      (v_atividade, 20, 'Comando \dt', 'D'),
      (v_atividade, 21, 'Comando \d aluno', 'B'),
      (v_atividade, 22, 'ADD COLUMN', 'B'),
      (v_atividade, 23, 'RENAME COLUMN', 'C'),
      (v_atividade, 24, 'ALTER TYPE', 'B'),
      (v_atividade, 25, 'SET NOT NULL', 'C'),
      (v_atividade, 26, 'Falha do SET NOT NULL', 'D'),
      (v_atividade, 27, 'DROP COLUMN', 'A'),
      (v_atividade, 28, 'RENAME TO', 'A'),
      (v_atividade, 29, 'DROP TABLE', 'C'),
      (v_atividade, 30, 'IF EXISTS', 'C'),
      (v_atividade, 31, 'Cuidado com DROP', 'D'),
      (v_atividade, 32, 'Erro Already Exists', 'B'),
      (v_atividade, 33, 'Script DDL', 'C'),
      (v_atividade, 34, 'Executar Script', 'C'),
      (v_atividade, 35, 'Versionar o Script', 'B'),
      (v_atividade, 36, 'Dinheiro como Float', 'B'),
      (v_atividade, 37, 'CPF como Integer', 'B'),
      (v_atividade, 38, 'Ordem no Script', 'D'),
      (v_atividade, 39, 'Dicionário e Tipo', 'C'),
      (v_atividade, 40, 'Coluna Opcional', 'D'),
      (v_atividade, 41, 'Tabelas da Escola', 'B'),
      (v_atividade, 42, 'Tabela no pgAdmin', 'D'),
      (v_atividade, 43, 'current_date', 'D'),
      (v_atividade, 44, 'Dinâmica: Tradutor', 'A'),
      (v_atividade, 45, 'Dinâmica: Observação', 'D'),
      (v_atividade, 46, 'Entrega da SA 2', 'B'),
      (v_atividade, 47, 'SA 2', 'C'),
      (v_atividade, 48, 'Próxima Aula', 'D'),
      (v_atividade, 49, 'Nome Padronizado no SQL', 'D'),
      (v_atividade, 50, 'Estrutura e Dados', 'A');

  -- Aula 13: DDL: Relações, Chaves e Restrições
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'DDL: Relações, Chaves e Restrições' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (13, 'DDL: Relações, Chaves e Restrições', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('DDL: Relações, Chaves e Restrições', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — DDL: Relações, Chaves e Restrições (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-13-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Chave Primária', 'A'),
      (v_atividade, 2, 'Chave Primária Composta', 'D'),
      (v_atividade, 3, 'PK da Parcela', 'B'),
      (v_atividade, 4, 'Chave Estrangeira', 'D'),
      (v_atividade, 5, 'REFERENCES', 'B'),
      (v_atividade, 6, 'Integridade Referencial', 'A'),
      (v_atividade, 7, 'Erro de Chave Estrangeira', 'D'),
      (v_atividade, 8, 'Associativa com Duas FKs', 'A'),
      (v_atividade, 9, 'UNIQUE na Matrícula', 'A'),
      (v_atividade, 10, 'ON DELETE Padrão', 'C'),
      (v_atividade, 11, 'RESTRICT', 'C'),
      (v_atividade, 12, 'CASCADE', 'B'),
      (v_atividade, 13, 'SET NULL', 'B'),
      (v_atividade, 14, 'CASCADE na Parcela', 'D'),
      (v_atividade, 15, 'Curso com Turmas', 'B'),
      (v_atividade, 16, 'Supervisor que Saiu', 'B'),
      (v_atividade, 17, 'Risco do CASCADE', 'B'),
      (v_atividade, 18, 'UNIQUE', 'C'),
      (v_atividade, 19, 'UNIQUE e Vazio', 'B'),
      (v_atividade, 20, 'CHECK', 'A'),
      (v_atividade, 21, 'CHECK do Valor', 'A'),
      (v_atividade, 22, 'CHECK do Turno', 'D'),
      (v_atividade, 23, 'Erro de CHECK', 'B'),
      (v_atividade, 24, 'Erro de UNIQUE', 'C'),
      (v_atividade, 25, 'Erro de NOT NULL', 'D'),
      (v_atividade, 26, 'ADD CONSTRAINT UNIQUE', 'D'),
      (v_atividade, 27, 'ADD FOREIGN KEY', 'A'),
      (v_atividade, 28, 'DROP CONSTRAINT', 'C'),
      (v_atividade, 29, 'Nomear Restrições', 'C'),
      (v_atividade, 30, 'Regra: CPF', 'C'),
      (v_atividade, 31, 'Regra: Limite de Alunos', 'A'),
      (v_atividade, 32, 'FK Obrigatória', 'B'),
      (v_atividade, 33, 'FK Opcional', 'C'),
      (v_atividade, 34, 'Ordem de Criação', 'A'),
      (v_atividade, 35, 'Ordem de Exclusão', 'C'),
      (v_atividade, 36, 'Código Único da Turma', 'B'),
      (v_atividade, 37, 'Escola: Apagar Curso', 'D'),
      (v_atividade, 38, 'Escola: Apagar Matrícula', 'D'),
      (v_atividade, 39, 'Dinâmica: Tentativa Proibida', 'C'),
      (v_atividade, 40, 'Dinâmica: Tentativa que Passa', 'B'),
      (v_atividade, 41, 'Entrega da SA 2', 'A'),
      (v_atividade, 42, 'Restrição no Banco', 'C'),
      (v_atividade, 43, 'PK e Identidade', 'A'),
      (v_atividade, 44, 'FK e Índice', 'A'),
      (v_atividade, 45, 'Chave Estrangeira e DER', 'D'),
      (v_atividade, 46, 'CHECK com Datas', 'D'),
      (v_atividade, 47, 'Mensagem Clara', 'A'),
      (v_atividade, 48, 'Restrição Esquecida', 'C'),
      (v_atividade, 49, 'Conferir com o DER', 'B'),
      (v_atividade, 50, 'Próxima Aula', 'D');

  -- Aula 15: DML: Consultas com Filtros e Ordenação
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'DML: Consultas com Filtros e Ordenação' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (15, 'DML: Consultas com Filtros e Ordenação', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('DML: Consultas com Filtros e Ordenação', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — DML: Consultas com Filtros e Ordenação (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADES-AULA-15-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'SELECT e FROM', 'A'),
      (v_atividade, 2, 'SELECT Asterisco', 'B'),
      (v_atividade, 3, 'Listar Colunas', 'C'),
      (v_atividade, 4, 'Ordem das Cláusulas', 'A'),
      (v_atividade, 5, 'Apelido AS', 'A'),
      (v_atividade, 6, 'Expressão Não Altera', 'C'),
      (v_atividade, 7, 'Igual a Texto', 'C'),
      (v_atividade, 8, 'Diferente', 'B'),
      (v_atividade, 9, 'Maior ou Igual', 'C'),
      (v_atividade, 10, 'BETWEEN', 'D'),
      (v_atividade, 11, 'BETWEEN com Datas', 'D'),
      (v_atividade, 12, 'IN', 'B'),
      (v_atividade, 13, 'IN e OR', 'C'),
      (v_atividade, 14, 'LIKE com Porcentagem', 'C'),
      (v_atividade, 15, 'LIKE no Meio', 'B'),
      (v_atividade, 16, 'Sublinhado no LIKE', 'A'),
      (v_atividade, 17, 'ILIKE', 'D'),
      (v_atividade, 18, 'IS NULL', 'B'),
      (v_atividade, 19, 'Por Que Não = NULL', 'B'),
      (v_atividade, 20, 'IS NOT NULL', 'B'),
      (v_atividade, 21, 'AND', 'D'),
      (v_atividade, 22, 'OR', 'C'),
      (v_atividade, 23, 'NOT', 'D'),
      (v_atividade, 24, 'Parênteses', 'C'),
      (v_atividade, 25, 'Erro sem Parênteses', 'B'),
      (v_atividade, 26, 'ORDER BY', 'A'),
      (v_atividade, 27, 'DESC', 'C'),
      (v_atividade, 28, 'Desempate', 'A'),
      (v_atividade, 29, 'LIMIT', 'C'),
      (v_atividade, 30, 'Os 5 Mais Caros', 'C'),
      (v_atividade, 31, 'OFFSET', 'D'),
      (v_atividade, 32, 'DISTINCT', 'C'),
      (v_atividade, 33, 'upper', 'D'),
      (v_atividade, 34, 'length', 'A'),
      (v_atividade, 35, 'current_date', 'B'),
      (v_atividade, 36, 'age e extract', 'B'),
      (v_atividade, 37, 'Aniversariantes', 'A'),
      (v_atividade, 38, 'coalesce', 'B'),
      (v_atividade, 39, 'Texto sem Aspas', 'B'),
      (v_atividade, 40, 'LIKE sem Porcentagem', 'A'),
      (v_atividade, 41, 'Escola: Trancadas ou Canceladas', 'A'),
      (v_atividade, 42, 'Escola: Sem E-mail', 'B'),
      (v_atividade, 43, 'Faixa de Preço', 'D'),
      (v_atividade, 44, 'Turmas da Noite do Curso 2', 'D'),
      (v_atividade, 45, 'Nome com Silva sem Distinguir', 'D'),
      (v_atividade, 46, 'Dinâmica: Conferência', 'D'),
      (v_atividade, 47, 'Entrega da SA 2', 'A'),
      (v_atividade, 48, 'Consulta Não Altera', 'A'),
      (v_atividade, 49, 'Número de Linhas', 'D'),
      (v_atividade, 50, 'Próxima Aula', 'A');
end $$;
