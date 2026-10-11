# Atividade: DDL: Tabelas e Campos — 50 Questões

- **Aula:** 12
- **Tema:** DDL: Tabelas e Campos
- **Ícone:** 🏗️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar linguagem de definição de dados: SQL, DDL e DML, tipos de dados do PostgreSQL (integer, bigint, numeric, varchar, text, char, boolean, date, timestamptz), CREATE TABLE com NOT NULL, DEFAULT e identificador automático, conferência com \dt e \d, ALTER TABLE, DROP TABLE e script DDL versionado.
- **Conteúdo-base:** ../CONTEUDO/AULA-12-DDL-TABELAS-E-CAMPOS.md
- **Slides:** ../AULAS/AULA-12-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-12-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que É SQL

- **Capacidade:** C7

**Comando:**  
O que é SQL?

**Alternativas:**
- A) Um sistema operacional.
- B) A linguagem padrão usada para definir e manipular dados em bancos relacionais.
- C) Um editor de planilhas.
- D) Um banco de dados não relacional.

**Gabarito:** B

---

## ITEM 02 — O Que É DDL

- **Capacidade:** C7

**Comando:**  
O que faz a DDL (linguagem de definição de dados)?

**Alternativas:**
- A) Consulta os dados das tabelas.
- B) Apaga linhas de clientes.
- C) Cria e altera a estrutura do banco, como tabelas e colunas.
- D) Faz backup do servidor.

**Gabarito:** C

---

## ITEM 03 — Comandos DDL

- **Capacidade:** C7

**Comando:**  
Quais são comandos da DDL?

**Alternativas:**
- A) BEGIN e COMMIT.
- B) GRANT e REVOKE apenas.
- C) CREATE, ALTER e DROP.
- D) SELECT, INSERT e UPDATE.

**Gabarito:** C

---

## ITEM 04 — Comandos DML

- **Capacidade:** C7

**Comando:**  
Quais são comandos da DML?

**Alternativas:**
- A) INSERT, UPDATE, DELETE e SELECT.
- B) SHOW e SET.
- C) CREATE, ALTER e DROP.
- D) \l e \q.

**Gabarito:** A

---

## ITEM 05 — Tipo para Inteiros

- **Capacidade:** C7

**Comando:**  
Qual tipo do PostgreSQL guarda números inteiros, como a quantidade em estoque?

**Alternativas:**
- A) integer.
- B) varchar.
- C) boolean.
- D) date.

**Gabarito:** A

---

## ITEM 06 — Tipo para Dinheiro

- **Capacidade:** C7

**Comando:**  
Qual tipo é indicado para o valor da mensalidade?

**Alternativas:**
- A) integer.
- B) numeric(10,2).
- C) text.
- D) boolean.

**Gabarito:** B

---

## ITEM 07 — numeric(10,2)

- **Capacidade:** C7

**Comando:**  
O que significa numeric(10,2)?

**Alternativas:**
- A) Texto com 10 letras e 2 espaços.
- B) Número decimal com até 10 dígitos, sendo 2 depois da vírgula.
- C) Data com 10 dias e 2 meses.
- D) Inteiro entre 10 e 2.

**Gabarito:** B

---

## ITEM 08 — varchar(n)

- **Capacidade:** C7

**Comando:**  
O que é varchar(100)?

**Alternativas:**
- A) Data com 100 dias.
- B) Verdadeiro ou falso repetido 100 vezes.
- C) Texto com limite de 100 caracteres.
- D) Número com 100 casas decimais.

**Gabarito:** C

---

## ITEM 09 — text

- **Capacidade:** C7

**Comando:**  
Quando usar o tipo text?

**Alternativas:**
- A) Para verdadeiro ou falso.
- B) Para datas.
- C) Para guardar valores em dinheiro.
- D) Para textos sem limite definido, como observações.

**Gabarito:** D

---

## ITEM 10 — char(2)

- **Capacidade:** C7

**Comando:**  
Qual atributo combina com o tipo char(2)?

**Alternativas:**
- A) A sigla do estado (UF), sempre com 2 letras.
- B) O nome completo do aluno.
- C) A data de nascimento.
- D) O valor da mensalidade.

**Gabarito:** A

---

## ITEM 11 — boolean

- **Capacidade:** C7

**Comando:**  
Qual coluna combina com o tipo boolean?

**Alternativas:**
- A) ativo, que indica verdadeiro ou falso.
- B) valor_mensal.
- C) data_nascimento.
- D) nome.

**Gabarito:** A

---

## ITEM 12 — date

- **Capacidade:** C7

**Comando:**  
Qual tipo guarda a data de nascimento?

**Alternativas:**
- A) boolean.
- B) numeric(10,2).
- C) integer.
- D) date.

**Gabarito:** D

---

## ITEM 13 — timestamptz

- **Capacidade:** C7

**Comando:**  
Qual tipo guarda a data e a hora de criação de um registro com fuso horário?

**Alternativas:**
- A) timestamptz.
- B) char(2).
- C) boolean.
- D) integer.

**Gabarito:** A

---

## ITEM 14 — CPF no CREATE TABLE

- **Capacidade:** C7

**Comando:**  
Segundo o dicionário de dados da UC, qual tipo é adequado para o CPF?

**Alternativas:**
- A) varchar(11), só com dígitos.
- B) boolean.
- C) numeric(11,2).
- D) integer.

**Gabarito:** A

---

## ITEM 15 — CREATE TABLE

- **Capacidade:** C7

**Comando:**  
O que faz o comando CREATE TABLE curso (...);?

**Alternativas:**
- A) Cria a tabela curso com as colunas definidas entre parênteses.
- B) Insere um curso novo na tabela.
- C) Apaga a tabela curso.
- D) Consulta os cursos.

**Gabarito:** A

---

## ITEM 16 — Identificador Automático

- **Capacidade:** C7

**Comando:**  
O que faz GENERATED ALWAYS AS IDENTITY numa coluna id?

**Alternativas:**
- A) Transforma o id em texto.
- B) O banco gera automaticamente o número do identificador, como 1, 2, 3.
- C) Apaga o id depois de inserir.
- D) Obriga o usuário a digitar o id.

**Gabarito:** B

---

## ITEM 17 — NOT NULL

- **Capacidade:** C7

**Comando:**  
O que significa NOT NULL numa coluna?

**Alternativas:**
- A) Que o campo é obrigatório e não pode ficar vazio.
- B) Que o campo é texto.
- C) Que o campo é opcional.
- D) Que o campo só aceita zero.

**Gabarito:** A

---

## ITEM 18 — DEFAULT

- **Capacidade:** C7

**Comando:**  
O que faz DEFAULT true na coluna ativo?

**Alternativas:**
- A) Transforma a coluna em chave primária.
- B) Impede que a coluna receba true.
- C) Usa true quando nenhum valor for informado na inserção.
- D) Apaga a coluna.

**Gabarito:** C

---

## ITEM 19 — DEFAULT now()

- **Capacidade:** C7

**Comando:**  
O que faz criado_em timestamptz DEFAULT now()?

**Alternativas:**
- A) Grava automaticamente a data e a hora do momento da inserção.
- B) Grava o nome do usuário.
- C) Grava sempre a mesma data fixa.
- D) Impede inserções.

**Gabarito:** A

---

## ITEM 20 — Comando \dt

- **Capacidade:** C7

**Comando:**  
No psql, o que faz o comando \dt?

**Alternativas:**
- A) Mostra a versão do servidor.
- B) Apaga as tabelas.
- C) Sai do psql.
- D) Lista as tabelas do banco.

**Gabarito:** D

---

## ITEM 21 — Comando \d aluno

- **Capacidade:** C7

**Comando:**  
No psql, o que mostra \d aluno?

**Alternativas:**
- A) Todos os dados dos alunos.
- B) As colunas, os tipos e as restrições da tabela aluno.
- C) O backup da tabela.
- D) A senha do usuário aluno.

**Gabarito:** B

---

## ITEM 22 — ADD COLUMN

- **Capacidade:** C7

**Comando:**  
Qual comando acrescenta a coluna email à tabela aluno?

**Alternativas:**
- A) UPDATE aluno ADD email;
- B) ALTER TABLE aluno ADD COLUMN email varchar(120);
- C) INSERT INTO aluno COLUMN email;
- D) CREATE COLUMN email IN aluno;

**Gabarito:** B

---

## ITEM 23 — RENAME COLUMN

- **Capacidade:** C7

**Comando:**  
Qual comando renomeia a coluna telefone para celular?

**Alternativas:**
- A) UPDATE aluno SET telefone = celular;
- B) RENAME aluno.telefone celular;
- C) ALTER TABLE aluno RENAME COLUMN telefone TO celular;
- D) DROP COLUMN telefone celular;

**Gabarito:** C

---

## ITEM 24 — ALTER TYPE

- **Capacidade:** C7

**Comando:**  
Qual comando muda o tipo da coluna email para varchar(150)?

**Alternativas:**
- A) DROP email varchar(150);
- B) ALTER TABLE aluno ALTER COLUMN email TYPE varchar(150);
- C) CREATE TYPE email varchar(150);
- D) UPDATE aluno SET email TYPE varchar(150);

**Gabarito:** B

---

## ITEM 25 — SET NOT NULL

- **Capacidade:** C7

**Comando:**  
Qual comando torna a coluna email obrigatória?

**Alternativas:**
- A) ALTER TABLE aluno DROP NOT NULL;
- B) INSERT NOT NULL INTO aluno;
- C) ALTER TABLE aluno ALTER COLUMN email SET NOT NULL;
- D) UPDATE aluno SET email NOT NULL;

**Gabarito:** C

---

## ITEM 26 — Falha do SET NOT NULL

- **Capacidade:** C7

**Comando:**  
Por que o comando SET NOT NULL pode falhar numa tabela que já tem dados?

**Alternativas:**
- A) Porque o banco está em UTF8.
- B) Porque a tabela tem chave primária.
- C) Porque o nome da coluna é curto.
- D) Porque já existem linhas com o campo vazio.

**Gabarito:** D

---

## ITEM 27 — DROP COLUMN

- **Capacidade:** C7

**Comando:**  
Qual comando apaga a coluna data_cadastro da tabela aluno?

**Alternativas:**
- A) ALTER TABLE aluno DROP COLUMN data_cadastro;
- B) DELETE data_cadastro FROM aluno;
- C) DROP TABLE data_cadastro;
- D) UPDATE aluno DROP data_cadastro;

**Gabarito:** A

---

## ITEM 28 — RENAME TO

- **Capacidade:** C7

**Comando:**  
Qual comando renomeia a tabela aluno para estudante?

**Alternativas:**
- A) ALTER TABLE aluno RENAME TO estudante;
- B) CREATE TABLE estudante FROM aluno;
- C) RENAME DATABASE aluno estudante;
- D) UPDATE aluno SET nome = estudante;

**Gabarito:** A

---

## ITEM 29 — DROP TABLE

- **Capacidade:** C7

**Comando:**  
O que faz DROP TABLE tabela_teste;?

**Alternativas:**
- A) Esvazia uma coluna.
- B) Apaga só os dados, mantendo a tabela.
- C) Apaga a tabela e todos os seus dados.
- D) Faz backup da tabela.

**Gabarito:** C

---

## ITEM 30 — IF EXISTS

- **Capacidade:** C7

**Comando:**  
Para que serve IF EXISTS em DROP TABLE IF EXISTS tabela_teste;?

**Alternativas:**
- A) Apaga todas as tabelas do banco.
- B) Cria a tabela se ela não existir.
- C) Evita erro quando a tabela não existe.
- D) Faz backup antes de apagar.

**Gabarito:** C

---

## ITEM 31 — Cuidado com DROP

- **Capacidade:** C7

**Comando:**  
Qual cuidado tomar antes de um DROP TABLE no banco de produção?

**Alternativas:**
- A) Nenhum, o DROP pode ser desfeito sempre.
- B) Trocar a senha do postgres.
- C) Desligar o servidor.
- D) Fazer backup e confirmar que a tabela realmente deve ser apagada.

**Gabarito:** D

---

## ITEM 32 — Erro Already Exists

- **Capacidade:** C7

**Comando:**  
O psql mostra "relation curso already exists" ao rodar o script. O que isso significa?

**Alternativas:**
- A) Que a senha está errada.
- B) Que a tabela curso já existe no banco.
- C) Que o servidor está parado.
- D) Que a tabela curso foi apagada.

**Gabarito:** B

---

## ITEM 33 — Script DDL

- **Capacidade:** C7

**Comando:**  
O que é um script DDL?

**Alternativas:**
- A) Um arquivo de configuração do servidor.
- B) Um backup automático.
- C) Um arquivo .sql com os comandos de criação da estrutura, em ordem e com comentários.
- D) Uma planilha de dados.

**Gabarito:** C

---

## ITEM 34 — Executar Script

- **Capacidade:** C7

**Comando:**  
Qual comando executa o arquivo 01-ddl-escola.sql no banco escola_db?

**Alternativas:**
- A) psql --apagar 01-ddl-escola.sql
- B) SELECT * FROM 01-ddl-escola.sql;
- C) psql -U postgres -d escola_db -f 01-ddl-escola.sql
- D) systemctl start 01-ddl-escola.sql

**Gabarito:** C

---

## ITEM 35 — Versionar o Script

- **Capacidade:** C7

**Comando:**  
Por que versionar o script DDL no Git?

**Alternativas:**
- A) Porque o PostgreSQL exige o Git.
- B) Para guardar o histórico das mudanças e permitir recriar o banco igual em qualquer máquina.
- C) Para guardar as senhas.
- D) Para esconder o script da equipe.

**Gabarito:** B

---

## ITEM 36 — Dinheiro como Float

- **Capacidade:** C7

**Comando:**  
Por que não usar tipos de ponto flutuante para valores em dinheiro?

**Alternativas:**
- A) Porque o float ocupa zero bytes.
- B) Porque podem gerar erros de arredondamento; o numeric é exato.
- C) Porque o float é texto.
- D) Porque o float não aceita números.

**Gabarito:** B

---

## ITEM 37 — CPF como Integer

- **Capacidade:** C7

**Comando:**  
Qual é o problema de guardar o CPF como integer?

**Alternativas:**
- A) O CPF fica com letras.
- B) Os zeros à esquerda se perdem, e CPF não é usado em contas.
- C) O integer não aceita números.
- D) Nenhum problema.

**Gabarito:** B

---

## ITEM 38 — Ordem no Script

- **Capacidade:** C7

**Comando:**  
Num script, por que criar a tabela curso antes da tabela turma?

**Alternativas:**
- A) A ordem nunca importa.
- B) Porque a ordem alfabética é obrigatória.
- C) Porque curso tem menos colunas.
- D) Porque turma vai referenciar curso, e a tabela referenciada precisa existir antes.

**Gabarito:** D

---

## ITEM 39 — Dicionário e Tipo

- **Capacidade:** C7

**Comando:**  
De onde vêm os tipos usados no CREATE TABLE da escola?

**Alternativas:**
- A) Do instalador do PostgreSQL.
- B) Do arquivo pg_hba.conf.
- C) Do dicionário de dados final, montado na aula 11.
- D) Da escolha aleatória do programador.

**Gabarito:** C

---

## ITEM 40 — Coluna Opcional

- **Capacidade:** C7

**Comando:**  
Na tabela aluno do exemplo, a coluna cpf foi criada sem NOT NULL. Por quê?

**Alternativas:**
- A) Porque CPF nunca é usado.
- B) Porque NOT NULL só vale para datas.
- C) Por esquecimento proposital.
- D) Porque algumas crianças podem não ter CPF, então o campo é opcional.

**Gabarito:** D

---

## ITEM 41 — Tabelas da Escola

- **Capacidade:** C7

**Comando:**  
Quais tabelas fazem parte do script DDL da escola?

**Alternativas:**
- A) clientes, produtos e pedidos.
- B) curso, turma, aluno, responsavel, professor, matricula, parcela e aula_turma.
- C) apenas aluno.
- D) usuarios e senhas.

**Gabarito:** B

---

## ITEM 42 — Tabela no pgAdmin

- **Capacidade:** C7

**Comando:**  
No pgAdmin, onde se veem as colunas da tabela aluno?

**Alternativas:**
- A) No menu Ajuda.
- B) No Painel de Controle do Windows.
- C) Em Servidores, Senhas.
- D) Em Schemas, public, Tables, aluno, Columns.

**Gabarito:** D

---

## ITEM 43 — current_date

- **Capacidade:** C7

**Comando:**  
O que faz DEFAULT current_date na coluna data_cadastro?

**Alternativas:**
- A) Apaga a data.
- B) Preenche com a data de nascimento.
- C) Gera um número aleatório.
- D) Preenche com a data de hoje quando nenhum valor é informado.

**Gabarito:** D

---

## ITEM 44 — Dinâmica: Tradutor

- **Capacidade:** C7

**Comando:**  
Na dinâmica "Tradutor do dicionário", a linha "valor_mensal — decimal, 2 casas, obrigatório" vira:

**Alternativas:**
- A) valor_mensal numeric(10,2) NOT NULL
- B) valor_mensal text DEFAULT true
- C) valor_mensal integer
- D) valor_mensal boolean NOT NULL

**Gabarito:** A

---

## ITEM 45 — Dinâmica: Observação

- **Capacidade:** C7

**Comando:**  
Na dinâmica, a linha "observacao — texto longo, opcional" vira:

**Alternativas:**
- A) observacao char(2) NOT NULL
- B) observacao boolean
- C) observacao integer NOT NULL
- D) observacao text

**Gabarito:** D

---

## ITEM 46 — Entrega da SA 2

- **Capacidade:** C7

**Comando:**  
O que é entregue nesta aula, na SA 2?

**Alternativas:**
- A) O DER desenhado à mão.
- B) O script 01-ddl-escola.sql com o CREATE TABLE de todas as tabelas, executado, com print do \d de duas tabelas.
- C) O pg_hba.conf.
- D) O documento de escopo.

**Gabarito:** B

---

## ITEM 47 — SA 2

- **Capacidade:** C7

**Comando:**  
Qual é o objetivo da SA 2, iniciada nesta aula?

**Alternativas:**
- A) Levantar as demandas do cliente.
- B) Desenhar os slides da UC.
- C) Deixar o banco do sistema de matrículas pronto para o back-end no PostgreSQL.
- D) Instalar o sistema operacional.

**Gabarito:** C

---

## ITEM 48 — Próxima Aula

- **Capacidade:** C7

**Comando:**  
O que será aprofundado na aula 13?

**Alternativas:**
- A) Instalação do PostgreSQL.
- B) Fluxogramas.
- C) Levantamento de requisitos.
- D) Relações: chaves primárias, chaves estrangeiras e restrições.

**Gabarito:** D

---

## ITEM 49 — Nome Padronizado no SQL

- **Capacidade:** C7

**Comando:**  
No CREATE TABLE, os nomes de tabelas e colunas devem seguir:

**Alternativas:**
- A) Qualquer nome, sem padrão.
- B) Nomes com espaços e acentos.
- C) Nomes em maiúsculas com hífen.
- D) O padrão da UC: minúsculas, singular, sem acento e com sublinhado.

**Gabarito:** D

---

## ITEM 50 — Estrutura e Dados

- **Capacidade:** C7

**Comando:**  
Qual afirmação é correta sobre o ALTER TABLE?

**Alternativas:**
- A) Ele altera a estrutura da tabela, não os valores das linhas.
- B) Ele apaga o banco inteiro.
- C) Ele altera somente os valores das linhas.
- D) Ele consulta os dados.

**Gabarito:** A
