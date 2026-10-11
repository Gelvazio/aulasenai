# Atividade: DML: Inserção, Atualização e Exclusão — 50 Questões

- **Aula:** 14
- **Tema:** DML: Inserção, Atualização e Exclusão
- **Ícone:** ✏️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar linguagem de manipulação de dados: INSERT com lista de colunas, várias linhas, DEFAULT e RETURNING, ordem de inserção pelas chaves estrangeiras, UPDATE com SET e WHERE, DELETE com WHERE, exclusão lógica, perigo do WHERE esquecido, conferência com SELECT, transações (BEGIN, COMMIT, ROLLBACK), TRUNCATE e carga de dados de teste fictícios.
- **Conteúdo-base:** ../CONTEUDO/AULA-14-DML-INSERCAO-ATUALIZACAO-E-EXCLUSAO.md
- **Slides:** ../AULAS/AULA-14-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-14-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — INSERT

- **Capacidade:** C8

**Comando:**  
Qual comando insere uma nova linha numa tabela?

**Alternativas:**
- A) CREATE TABLE.
- B) DELETE.
- C) UPDATE.
- D) INSERT INTO.

**Gabarito:** D

---

## ITEM 02 — INSERT com Colunas

- **Capacidade:** C8

**Comando:**  
Qual comando insere um curso informando as colunas?

**Alternativas:**
- A) INSERT curso = 'Excel Básico';
- B) INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES ('Excel Básico', 40, 180.00);
- C) CREATE curso ('Excel Básico', 40, 180.00);
- D) UPDATE curso VALUES ('Excel Básico');

**Gabarito:** B

---

## ITEM 03 — Por Que Listar as Colunas

- **Capacidade:** C8

**Comando:**  
Por que listar as colunas no INSERT?

**Alternativas:**
- A) Porque o banco não aceita INSERT sem colunas em nenhum caso.
- B) Para apagar as colunas não listadas.
- C) Para inserir mais rápido no disco.
- D) Para o comando continuar certo mesmo se a tabela ganhar colunas novas, e para deixar claro qual valor vai em qual coluna.

**Gabarito:** D

---

## ITEM 04 — Várias Linhas

- **Capacidade:** C8

**Comando:**  
Como inserir dois cursos num único comando?

**Alternativas:**
- A) Com INSERT INTO curso (...) VALUES (...), (...); com os grupos separados por vírgula.
- B) Não é possível.
- C) Com dois CREATE TABLE.
- D) Com UPDATE curso SET dois cursos.

**Gabarito:** A

---

## ITEM 05 — Id Gerado

- **Capacidade:** C8

**Comando:**  
Por que não é preciso informar o id_curso no INSERT?

**Alternativas:**
- A) Porque o id é texto.
- B) Porque a coluna usa identidade e o banco gera o número sozinho.
- C) Porque o id é apagado depois.
- D) Porque o id é sempre zero.

**Gabarito:** B

---

## ITEM 06 — RETURNING

- **Capacidade:** C8

**Comando:**  
O que faz RETURNING id_aluno no fim de um INSERT?

**Alternativas:**
- A) Apaga o aluno inserido.
- B) Devolve o id gerado para a linha inserida.
- C) Lista todos os alunos.
- D) Desfaz a inserção.

**Gabarito:** B

---

## ITEM 07 — Colunas com DEFAULT

- **Capacidade:** C8

**Comando:**  
No INSERT de uma matrícula, por que data_matricula pode ser omitida?

**Alternativas:**
- A) Porque a coluna tem DEFAULT current_date e recebe a data de hoje.
- B) Porque datas nunca são gravadas.
- C) Porque matrícula não tem data.
- D) Porque o banco apaga datas.

**Gabarito:** A

---

## ITEM 08 — Aspas

- **Capacidade:** C8

**Comando:**  
Como os textos e as datas são escritos no INSERT?

**Alternativas:**
- A) Entre colchetes.
- B) Entre aspas duplas obrigatórias.
- C) Sem aspas.
- D) Entre aspas simples, como 'Ana Souza' e '2008-03-21'.

**Gabarito:** D

---

## ITEM 09 — Decimal com Ponto

- **Capacidade:** C8

**Comando:**  
Como escrever o valor cento e oitenta reais no INSERT?

**Alternativas:**
- A) 180,00
- B) 180.00
- C) cento e oitenta
- D) 'R$ 180'

**Gabarito:** B

---

## ITEM 10 — Ordem de Inserção

- **Capacidade:** C8

**Comando:**  
Qual é a ordem correta para inserir os dados da escola?

**Alternativas:**
- A) curso, turma, aluno, matricula e parcela.
- B) matricula antes de aluno.
- C) parcela, matricula, turma e curso.
- D) A ordem não importa.

**Gabarito:** A

---

## ITEM 11 — Turma sem Curso

- **Capacidade:** C8

**Comando:**  
O que acontece ao inserir uma turma com id_curso de um curso que não existe?

**Alternativas:**
- A) O banco apaga outra turma.
- B) A turma é gravada sem curso.
- C) Erro de chave estrangeira; a turma não é gravada.
- D) O curso é criado automaticamente.

**Gabarito:** C

---

## ITEM 12 — UPDATE

- **Capacidade:** C8

**Comando:**  
O que faz o comando UPDATE?

**Alternativas:**
- A) Apaga a tabela.
- B) Cria colunas.
- C) Altera valores de linhas existentes.
- D) Insere novas linhas.

**Gabarito:** C

---

## ITEM 13 — SET e WHERE

- **Capacidade:** C8

**Comando:**  
No comando UPDATE curso SET valor_mensal = 195.00 WHERE id_curso = 1;, o que faz o WHERE?

**Alternativas:**
- A) Altera todos os cursos.
- B) Cria o curso 1.
- C) Limita a alteração ao curso de id 1.
- D) Apaga o curso 1.

**Gabarito:** C

---

## ITEM 14 — Trancar Matrícula

- **Capacidade:** C8

**Comando:**  
Qual comando tranca a matrícula do aluno 5 na turma 2?

**Alternativas:**
- A) UPDATE matricula SET situacao = 'trancada' WHERE id_aluno = 5 AND id_turma = 2;
- B) UPDATE matricula SET situacao = 'trancada';
- C) INSERT INTO matricula VALUES ('trancada');
- D) DELETE FROM matricula WHERE situacao = 'trancada';

**Gabarito:** A

---

## ITEM 15 — Reajuste

- **Capacidade:** C8

**Comando:**  
Qual comando dá reajuste de 10% em todos os cursos ativos?

**Alternativas:**
- A) UPDATE curso SET valor_mensal = valor_mensal * 1.10 WHERE ativo = true;
- B) UPDATE curso SET valor_mensal = 10;
- C) INSERT INTO curso valor_mensal * 1.10;
- D) DELETE FROM curso WHERE ativo = true;

**Gabarito:** A

---

## ITEM 16 — DELETE

- **Capacidade:** C8

**Comando:**  
O que faz DELETE FROM matricula WHERE id_matricula = 12;?

**Alternativas:**
- A) Apaga a tabela matrícula.
- B) Apaga a matrícula de id 12.
- C) Apaga todas as matrículas.
- D) Cria a matrícula 12.

**Gabarito:** B

---

## ITEM 17 — DELETE e RESTRICT

- **Capacidade:** C8

**Comando:**  
O que acontece ao tentar apagar um curso que tem turmas, com a chave em RESTRICT?

**Alternativas:**
- A) O banco recusa a exclusão.
- B) As turmas ficam sem curso.
- C) O banco apaga só o nome do curso.
- D) O curso e as turmas são apagados.

**Gabarito:** A

---

## ITEM 18 — DELETE e CASCADE

- **Capacidade:** C8

**Comando:**  
Ao apagar uma matrícula, o que acontece com as parcelas, que têm ON DELETE CASCADE?

**Alternativas:**
- A) São copiadas para outra matrícula.
- B) Ficam sem matrícula.
- C) Impedem a exclusão.
- D) São apagadas junto.

**Gabarito:** D

---

## ITEM 19 — Exclusão Lógica

- **Capacidade:** C8

**Comando:**  
O que é exclusão lógica?

**Alternativas:**
- A) Fazer backup do registro.
- B) Apagar a linha definitivamente.
- C) Marcar o registro como inativo, por exemplo com UPDATE ... SET ativo = false, sem apagar a linha.
- D) Apagar a tabela inteira.

**Gabarito:** C

---

## ITEM 20 — Vantagem da Exclusão Lógica

- **Capacidade:** C8

**Comando:**  
Qual é a vantagem da exclusão lógica?

**Alternativas:**
- A) Ocupar menos espaço sempre.
- B) Apagar mais rápido.
- C) Manter o histórico, sem perder os dados.
- D) Dispensar o WHERE.

**Gabarito:** C

---

## ITEM 21 — UPDATE sem WHERE

- **Capacidade:** C8

**Comando:**  
O que faz UPDATE curso SET valor_mensal = 0; sem WHERE?

**Alternativas:**
- A) Dá erro sempre.
- B) Zera o valor de todos os cursos.
- C) Não altera nada.
- D) Zera só o primeiro curso.

**Gabarito:** B

---

## ITEM 22 — DELETE sem WHERE

- **Capacidade:** C8

**Comando:**  
O que faz DELETE FROM aluno; sem WHERE, se as restrições permitirem?

**Alternativas:**
- A) Apaga a tabela e a estrutura.
- B) Apaga só o último aluno.
- C) Apaga todos os alunos.
- D) Não faz nada.

**Gabarito:** C

---

## ITEM 23 — SELECT Antes

- **Capacidade:** C8

**Comando:**  
Por que escrever primeiro um SELECT com o mesmo WHERE do UPDATE ou DELETE?

**Alternativas:**
- A) Porque o UPDATE só funciona depois de um SELECT.
- B) Para conferir quais linhas serão afetadas antes de alterar ou apagar.
- C) Para deixar o comando mais rápido.
- D) Para criar uma cópia da tabela.

**Gabarito:** B

---

## ITEM 24 — BEGIN

- **Capacidade:** C8

**Comando:**  
O que faz o comando BEGIN?

**Alternativas:**
- A) Apaga a tabela.
- B) Confirma a transação.
- C) Desfaz a transação.
- D) Inicia uma transação.

**Gabarito:** D

---

## ITEM 25 — COMMIT

- **Capacidade:** C8

**Comando:**  
O que faz o COMMIT depois de um UPDATE dentro da transação?

**Alternativas:**
- A) Desfaz as alterações.
- B) Apaga as linhas.
- C) Confirma as alterações.
- D) Inicia uma nova tabela.

**Gabarito:** C

---

## ITEM 26 — ROLLBACK

- **Capacidade:** C8

**Comando:**  
O que faz o ROLLBACK?

**Alternativas:**
- A) Reinicia o servidor.
- B) Confirma as alterações.
- C) Apaga o banco.
- D) Desfaz as alterações feitas desde o BEGIN.

**Gabarito:** D

---

## ITEM 27 — Linhas Afetadas

- **Capacidade:** C8

**Comando:**  
Depois de um UPDATE, o psql mostra "UPDATE 6". O que isso indica?

**Alternativas:**
- A) Que o comando falhou 6 vezes.
- B) Que há 6 transações abertas.
- C) Que 6 linhas foram alteradas.
- D) Que a tabela tem 6 colunas.

**Gabarito:** C

---

## ITEM 28 — Desconfiar do Número

- **Capacidade:** C8

**Comando:**  
Esperava-se alterar 5 cursos, mas o psql mostra "UPDATE 6" dentro de uma transação. O que fazer?

**Alternativas:**
- A) Desligar o servidor.
- B) Apagar a tabela de cursos.
- C) Executar ROLLBACK, conferir o WHERE e refazer o comando.
- D) Executar COMMIT mesmo assim.

**Gabarito:** C

---

## ITEM 29 — TRUNCATE

- **Capacidade:** C8

**Comando:**  
O que faz TRUNCATE TABLE tabela_teste;?

**Alternativas:**
- A) Altera o tipo das colunas.
- B) Apaga só a primeira linha.
- C) Cria a tabela de teste.
- D) Esvazia a tabela inteira de uma vez.

**Gabarito:** D

---

## ITEM 30 — Uso do TRUNCATE

- **Capacidade:** C8

**Comando:**  
Quando usar TRUNCATE?

**Alternativas:**
- A) Em bancos de teste, para esvaziar tabelas; nunca em produção sem backup.
- B) Sempre em produção, para limpar o banco.
- C) Para inserir dados.
- D) Para alterar um único valor.

**Gabarito:** A

---

## ITEM 31 — Dados de Teste

- **Capacidade:** C8

**Comando:**  
Que tipo de dado deve ser usado na carga de teste do sistema?

**Alternativas:**
- A) CPFs reais de colegas.
- B) Dados copiados de outra empresa.
- C) Telefones reais de clientes.
- D) Dados fictícios, nunca dados reais de pessoas.

**Gabarito:** D

---

## ITEM 32 — Script de Carga

- **Capacidade:** C8

**Comando:**  
Para que serve o script 02-dados-teste.sql?

**Alternativas:**
- A) Configurar o servidor.
- B) Carregar dados fictícios para testar as consultas das próximas aulas.
- C) Criar as tabelas do banco.
- D) Fazer backup da produção.

**Gabarito:** B

---

## ITEM 33 — Alterar E-mail

- **Capacidade:** C8

**Comando:**  
Qual comando corrige o e-mail da aluna de id 7?

**Alternativas:**
- A) UPDATE aluno SET email = 'novo@exemplo.com';
- B) UPDATE aluno SET email = 'novo@exemplo.com' WHERE id_aluno = 7;
- C) INSERT INTO aluno email = 'novo@exemplo.com';
- D) DELETE FROM aluno WHERE email = 'novo@exemplo.com';

**Gabarito:** B

---

## ITEM 34 — Apagar Turma de Teste

- **Capacidade:** C8

**Comando:**  
Qual comando apaga a turma de teste com código T99?

**Alternativas:**
- A) DROP TABLE turma;
- B) DELETE FROM turma;
- C) UPDATE turma SET codigo = NULL;
- D) DELETE FROM turma WHERE codigo = 'T99';

**Gabarito:** D

---

## ITEM 35 — Várias Condições

- **Capacidade:** C8

**Comando:**  
No WHERE, para que serve o AND em WHERE id_aluno = 5 AND id_turma = 2?

**Alternativas:**
- A) Exige que as duas condições sejam verdadeiras.
- B) Aceita qualquer uma das condições.
- C) Ignora a segunda condição.
- D) Apaga as duas linhas.

**Gabarito:** A

---

## ITEM 36 — Inserir Parcela

- **Capacidade:** C8

**Comando:**  
Antes de inserir a parcela de uma matrícula, o que precisa existir?

**Alternativas:**
- A) Nada.
- B) Uma tabela de backup.
- C) Somente o professor.
- D) A matrícula a que a parcela pertence.

**Gabarito:** D

---

## ITEM 37 — INSERT Violando CHECK

- **Capacidade:** C8

**Comando:**  
O que acontece ao inserir uma parcela com valor -10, se existe CHECK (valor > 0)?

**Alternativas:**
- A) A matrícula é apagada.
- B) O banco recusa com erro de check constraint.
- C) A parcela é gravada com valor -10.
- D) O valor vira 10 automaticamente.

**Gabarito:** B

---

## ITEM 38 — INSERT Violando UNIQUE

- **Capacidade:** C8

**Comando:**  
O que acontece ao inserir um aluno com um CPF já cadastrado, se há UNIQUE no CPF?

**Alternativas:**
- A) O aluno antigo é apagado.
- B) O CPF é alterado automaticamente.
- C) O banco recusa com erro de chave duplicada.
- D) Os dois ficam gravados.

**Gabarito:** C

---

## ITEM 39 — Escola: Erro do Reajuste

- **Capacidade:** C8

**Comando:**  
No exemplo da escola, por que o reajuste afetou um curso a mais?

**Alternativas:**
- A) Porque o integrante esqueceu o WHERE ativo = true e reajustou também um curso desativado.
- B) Porque o COMMIT foi feito duas vezes.
- C) Porque o valor era texto.
- D) Porque o banco duplicou os cursos.

**Gabarito:** A

---

## ITEM 40 — Escola: O Que Salvou

- **Capacidade:** C8

**Comando:**  
No exemplo, o que permitiu corrigir o erro do reajuste sem prejuízo?

**Alternativas:**
- A) Estar dentro de uma transação e executar ROLLBACK.
- B) Fazer outro reajuste negativo sem conferir.
- C) Apagar a tabela curso.
- D) Desligar o computador.

**Gabarito:** A

---

## ITEM 41 — Dinâmica: Primeiro Passo

- **Capacidade:** C8

**Comando:**  
Na dinâmica "Rede de segurança", qual é o primeiro passo da dupla?

**Alternativas:**
- A) Escrever o SELECT do alvo.
- B) Fazer o COMMIT.
- C) Executar o DELETE direto.
- D) Apagar a tabela.

**Gabarito:** A

---

## ITEM 42 — Dinâmica: Decisão

- **Capacidade:** C8

**Comando:**  
Na dinâmica, depois de executar o comando dentro da transação, o que a dupla faz?

**Alternativas:**
- A) Fecha o psql sem decidir.
- B) Confere o número de linhas e decide entre COMMIT e ROLLBACK.
- C) Executa TRUNCATE.
- D) Apaga o banco.

**Gabarito:** B

---

## ITEM 43 — Entrega da SA 2

- **Capacidade:** C8

**Comando:**  
O que é entregue nesta aula, na SA 2?

**Alternativas:**
- A) O documento de escopo.
- B) O DER desenhado.
- C) O pg_hba.conf.
- D) O script de carga de dados fictícios e 5 UPDATE e 3 DELETE com SELECT de conferência e transação.

**Gabarito:** D

---

## ITEM 44 — DML e DDL

- **Capacidade:** C8

**Comando:**  
INSERT, UPDATE e DELETE pertencem a qual parte do SQL?

**Alternativas:**
- A) DML, linguagem de manipulação de dados.
- B) DCL, controle de acesso.
- C) DDL, linguagem de definição de dados.
- D) Nenhuma.

**Gabarito:** A

---

## ITEM 45 — UPDATE com Cálculo

- **Capacidade:** C8

**Comando:**  
Qual comando aumenta em 5 unidades o estoque do produto 3?

**Alternativas:**
- A) INSERT INTO produto estoque + 5;
- B) UPDATE produto SET estoque = estoque + 5 WHERE id_produto = 3;
- C) DELETE FROM produto WHERE estoque = 5;
- D) UPDATE produto SET estoque = 5;

**Gabarito:** B

---

## ITEM 46 — Atualizar Várias Colunas

- **Capacidade:** C8

**Comando:**  
Como alterar o turno e a sala da turma 4 num só comando?

**Alternativas:**
- A) Com dois DELETE.
- B) Não é possível.
- C) UPDATE turma SET turno = 'noite' AND sala = 'B2';
- D) UPDATE turma SET turno = 'noite', sala = 'B2' WHERE id_turma = 4;

**Gabarito:** D

---

## ITEM 47 — Inserção Inválida por NULL

- **Capacidade:** C8

**Comando:**  
Ao inserir um aluno sem nome, numa coluna NOT NULL, o que acontece?

**Alternativas:**
- A) O aluno é gravado sem problemas.
- B) O banco cria um nome aleatório.
- C) O banco recusa com erro de not-null constraint.
- D) O nome fica em branco.

**Gabarito:** C

---

## ITEM 48 — Uso do RETURNING pelo Back-End

- **Capacidade:** C8

**Comando:**  
Por que o RETURNING é útil para o back-end?

**Alternativas:**
- A) Porque ele dispensa o WHERE.
- B) Porque ele recebe o id gerado logo após o INSERT e pode usá-lo, por exemplo, para criar a matrícula.
- C) Porque ele apaga dados antigos.
- D) Porque ele cria a tabela.

**Gabarito:** B

---

## ITEM 49 — Desfazer Depois do COMMIT

- **Capacidade:** C8

**Comando:**  
Depois do COMMIT, o ROLLBACK desfaz a alteração?

**Alternativas:**
- A) Não; depois de confirmada, a alteração só pode ser corrigida com outro comando ou com backup.
- B) Sim, se a tabela for pequena.
- C) Sim, mas só no dia seguinte.
- D) Sim, sempre.

**Gabarito:** A

---

## ITEM 50 — Próxima Aula

- **Capacidade:** C8

**Comando:**  
O que será estudado na aula 15?

**Alternativas:**
- A) Fluxograma.
- B) Normalização.
- C) Consultas com SELECT, filtros e ordenação.
- D) Instalação do PostgreSQL.

**Gabarito:** C
