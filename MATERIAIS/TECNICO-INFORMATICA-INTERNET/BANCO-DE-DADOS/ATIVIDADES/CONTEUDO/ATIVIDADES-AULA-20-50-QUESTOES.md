# Atividade: Projeto Integrador: Banco Documentado para o Back-end — 50 Questões

- **Aula:** 20
- **Tema:** Projeto Integrador: Banco Documentado para o Back-end
- **Ícone:** 📦
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer as demandas do cliente e aplicar a modelagem, a normalização, a DDL, a DML e as boas práticas de segurança na entrega final do banco: peças da documentação técnica (escopo, DER, dicionário de dados, cronograma, fluxograma, scripts, matriz de acesso e README), scripts numerados na ordem de execução, recriação do zero, rastreabilidade dos requisitos, conferência final, backup com restauração, o que o back-end recebe, revisão cruzada e justificativa técnica das escolhas.
- **Conteúdo-base:** ../CONTEUDO/AULA-20-PROJETO-INTEGRADOR-BANCO-DOCUMENTADO-PARA-O-BACK-END.md
- **Slides:** ../AULAS/AULA-20-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-20-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Banco Pronto

- **Capacidade:** C1

**Comando:**  
Segundo a aula, quando um banco está realmente pronto?

**Alternativas:**
- A) Quando todas as tabelas têm pelo menos uma linha.
- B) Quando o grupo consegue abrir o banco no próprio computador.
- C) Quando o professor aprova o DER.
- D) Quando outra pessoa consegue entender, recriar e usar o banco sem perguntar ao grupo que o fez.

**Gabarito:** D

---

## ITEM 02 — Documentação Técnica

- **Capacidade:** C1

**Comando:**  
O que é a documentação técnica do banco?

**Alternativas:**
- A) O conjunto de peças (escopo, DER, dicionário, scripts, matriz de acesso, cronograma, fluxograma e guia) que permite entender, recriar e usar o banco.
- B) O manual do PostgreSQL baixado da internet.
- C) A lista de senhas dos usuários do banco.
- D) Apenas o arquivo de backup do banco.

**Gabarito:** A

---

## ITEM 03 — Documento de Escopo

- **Capacidade:** C1

**Comando:**  
Qual peça da documentação traz objetivo, partes interessadas, o que entra e o que não entra, requisitos de dados, entregas, premissas e riscos?

**Alternativas:**
- A) O dicionário de dados.
- B) O relatório de testes.
- C) O fluxograma.
- D) O documento de escopo.

**Gabarito:** D

---

## ITEM 04 — Referência da Entrega

- **Capacidade:** C1

**Comando:**  
Contra qual documento a entrega final é conferida?

**Alternativas:**
- A) O manual de instalação do PostgreSQL.
- B) O escopo do projeto, com os requisitos de dados.
- C) O arquivo postgresql.conf.
- D) A lista de alunos da turma.

**Gabarito:** B

---

## ITEM 05 — Requisito sem Tabela

- **Capacidade:** C1

**Comando:**  
Um requisito do escopo não aparece em nenhuma tabela, restrição ou rotina do banco. Como isso é tratado?

**Alternativas:**
- A) É um excesso que deve ser apagado do escopo sem registro.
- B) É resolvido trocando a senha do postgres.
- C) Não tem importância se o banco funciona.
- D) É uma pendência da entrega.

**Gabarito:** D

---

## ITEM 06 — Tabela sem Requisito

- **Capacidade:** C1

**Comando:**  
O grupo criou uma tabela que não atende nenhum requisito do escopo. O que isso indica?

**Alternativas:**
- A) Um excesso ou uma mudança de escopo sem registro.
- B) Uma boa prática de prevenção.
- C) Um erro de instalação do SGBD.
- D) Uma entidade fraca obrigatória.

**Gabarito:** A

---

## ITEM 07 — Dicionário de Dados

- **Capacidade:** C3

**Comando:**  
O que o dicionário de dados traz para cada coluna?

**Alternativas:**
- A) O número de linhas da tabela.
- B) Nome padronizado, tipo, formato, obrigatoriedade, domínio e descrição.
- C) A senha de quem criou a coluna.
- D) Só o nome da tabela.

**Gabarito:** B

---

## ITEM 08 — Dicionário Desatualizado

- **Capacidade:** C3

**Comando:**  
A coluna foi renomeada no SQL, mas não no dicionário de dados. Qual é o problema?

**Alternativas:**
- A) A documentação deixa de bater com o banco e confunde quem vai usar.
- B) O banco para de funcionar.
- C) A chave primária é apagada.
- D) Nenhum, o dicionário é opcional.

**Gabarito:** A

---

## ITEM 09 — DER na Entrega

- **Capacidade:** C2

**Comando:**  
Qual DER entra na documentação técnica final?

**Alternativas:**
- A) Nenhum: o DER só serve no começo do projeto.
- B) Um DER de outro sistema parecido.
- C) O primeiro rascunho, antes da normalização.
- D) O modelo final, normalizado, com entidades, atributos, relacionamentos e cardinalidades.

**Gabarito:** D

---

## ITEM 10 — Cronograma Fechado

- **Capacidade:** C1

**Comando:**  
Na entrega final, como o cronograma (6.2) é apresentado?

**Alternativas:**
- A) Com o planejado e o realizado, os atrasos e os motivos.
- B) Só com as datas planejadas no início.
- C) Apenas com a data da apresentação.
- D) Sem responsáveis, para não expor ninguém.

**Gabarito:** A

---

## ITEM 11 — Fluxograma

- **Capacidade:** C1

**Comando:**  
O que o fluxograma (6.3) da matrícula mostra na documentação?

**Alternativas:**
- A) O tamanho dos arquivos do banco.
- B) As colunas de cada tabela com o tipo de dado.
- C) A lista de permissões de cada login.
- D) Os passos e as decisões do processo e onde o banco é consultado ou gravado.

**Gabarito:** D

---

## ITEM 12 — Símbolo do Banco

- **Capacidade:** C1

**Comando:**  
No fluxograma, qual símbolo indica a consulta ou a gravação no banco de dados?

**Alternativas:**
- A) Cilindro.
- B) Seta.
- C) Losango.
- D) Oval.

**Gabarito:** A

---

## ITEM 13 — Guia de Instalação

- **Capacidade:** C1

**Comando:**  
O que o guia de instalação (README) do banco deve explicar?

**Alternativas:**
- A) Como recriar o banco do zero, como conectar e como testar.
- B) As senhas reais de todos os logins.
- C) O código-fonte do PostgreSQL.
- D) A história da empresa cliente.

**Gabarito:** A

---

## ITEM 14 — Por que Numerar

- **Capacidade:** C7

**Comando:**  
Por que os scripts SQL da entrega são numerados?

**Alternativas:**
- A) Para deixar os arquivos em ordem alfabética apenas por estética.
- B) Porque a ordem de execução importa: a tabela de referência precisa existir antes da chave estrangeira e do GRANT.
- C) Porque o PostgreSQL só aceita arquivos com número.
- D) Para esconder o conteúdo dos scripts.

**Gabarito:** B

---

## ITEM 15 — Ordem dos Scripts

- **Capacidade:** C7

**Comando:**  
Qual sequência de scripts está na ordem certa?

**Alternativas:**
- A) Segurança → tabelas → banco e usuário → dados iniciais.
- B) Procedimentos → banco e usuário → segurança → tabelas.
- C) Dados iniciais → tabelas → chaves → banco e usuário.
- D) Banco e usuário → tabelas → chaves e restrições → dados iniciais → consultas → procedimentos e triggers → segurança.

**Gabarito:** D

---

## ITEM 16 — Script de Segurança

- **Capacidade:** C14

**Comando:**  
O que fica no script 07-seguranca.sql?

**Alternativas:**
- A) As consultas do relatório.
- B) REVOKE de PUBLIC, grupos, logins, GRANT da matriz, visão e auditoria.
- C) Os INSERT dos dados de teste.
- D) Os CREATE TABLE das tabelas principais.

**Gabarito:** B

---

## ITEM 17 — Script de Estrutura

- **Capacidade:** C7

**Comando:**  
Em qual script ficam os CREATE TABLE com os tipos padronizados?

**Alternativas:**
- A) 05-consultas.sql.
- B) 04-dados-iniciais.sql.
- C) 02-tabelas.sql.
- D) 07-seguranca.sql.

**Gabarito:** C

---

## ITEM 18 — Idempotente

- **Capacidade:** C7

**Comando:**  
O que significa um script idempotente?

**Alternativas:**
- A) Roda sem precisar de conexão com o banco.
- B) Pode rodar de novo sem quebrar, usando, por exemplo, IF NOT EXISTS e CREATE OR REPLACE.
- C) Só pode ser executado uma única vez na vida do banco.
- D) Apaga o banco antes de cada execução.

**Gabarito:** B

---

## ITEM 19 — CREATE OR REPLACE

- **Capacidade:** C8

**Comando:**  
Qual comando deixa o script das rotinas rodar de novo sem erro de "já existe"?

**Alternativas:**
- A) ALTER TABLE ADD FUNCTION.
- B) CREATE OR REPLACE FUNCTION.
- C) CREATE FUNCTION ONLY ONCE.
- D) INSERT INTO FUNCTION.

**Gabarito:** B

---

## ITEM 20 — Transação nos Scripts

- **Capacidade:** C8

**Comando:**  
Para que usar BEGIN e COMMIT nos scripts de estrutura e de dados?

**Alternativas:**
- A) Para que, se um comando falhar, nada fique pela metade.
- B) Para criar o backup automaticamente.
- C) Para acelerar a conexão com o servidor.
- D) Para dar permissão aos outros usuários.

**Gabarito:** A

---

## ITEM 21 — Senha no Script

- **Capacidade:** C14

**Comando:**  
Como a senha dos logins aparece nos scripts versionados no Git?

**Alternativas:**
- A) Com a senha real, para facilitar a instalação.
- B) Em comentário, com a senha do postgres.
- C) Só como exemplo ('troque-esta-senha'); a senha real é definida no servidor.
- D) No README publicado.

**Gabarito:** C

---

## ITEM 22 — Recriar do Zero

- **Capacidade:** C7

**Comando:**  
Por que recriar o banco do zero num banco limpo antes da entrega?

**Alternativas:**
- A) Porque o banco do próprio computador pode estar "remendado" e esconder erros que só aparecem na recriação.
- B) Porque o PostgreSQL exige reinstalação a cada entrega.
- C) Para apagar os dados do cliente.
- D) Porque o banco limpo é mais rápido para sempre.

**Gabarito:** A

---

## ITEM 23 — ON_ERROR_STOP

- **Capacidade:** C7

**Comando:**  
O que faz a opção -v ON_ERROR_STOP=1 no psql?

**Alternativas:**
- A) Desliga as mensagens de erro.
- B) Ignora os erros e continua até o fim.
- C) Faz o psql parar no primeiro erro, em vez de seguir e esconder o problema.
- D) Reinicia o servidor quando há erro.

**Gabarito:** C

---

## ITEM 24 — Executar Arquivo

- **Capacidade:** C7

**Comando:**  
Dentro do psql, qual comando executa o arquivo 02-tabelas.sql?

**Alternativas:**
- A) \dt 02-tabelas.sql
- B) \i 02-tabelas.sql
- C) \du 02-tabelas.sql
- D) \c 02-tabelas.sql

**Gabarito:** B

---

## ITEM 25 — Rastreabilidade

- **Capacidade:** C1

**Comando:**  
O que é a matriz de rastreabilidade?

**Alternativas:**
- A) O registro da auditoria de acesso.
- B) Uma tabela que liga cada requisito do escopo à tabela, restrição ou rotina que o atende e ao script.
- C) A lista das conexões ativas no servidor.
- D) O gráfico de Gantt do cronograma.

**Gabarito:** B

---

## ITEM 26 — Limite de Vagas

- **Capacidade:** C8

**Comando:**  
Na rastreabilidade, onde está a regra "turma com no máximo 25 alunos"?

**Alternativas:**
- A) Num CHECK da coluna id_turma.
- B) Na permissão do grupo da secretaria.
- C) No arquivo pg_hba.conf.
- D) No procedimento matricular, que conta as matrículas e barra a 26ª.

**Gabarito:** D

---

## ITEM 27 — Parcela Paga

- **Capacidade:** C8

**Comando:**  
Qual peça do banco atende o requisito "parcela paga não pode mudar de valor"?

**Alternativas:**
- A) O GRANT do grupo de consulta.
- B) A chave primária do curso.
- C) A visão vw_matriculas_por_turma.
- D) O trigger de validação.

**Gabarito:** D

---

## ITEM 28 — CPF Único

- **Capacidade:** C7

**Comando:**  
Qual restrição atende o requisito "CPF do aluno não se repete"?

**Alternativas:**
- A) UNIQUE (cpf) na tabela aluno.
- B) FOREIGN KEY (cpf) REFERENCES curso.
- C) DEFAULT now() no cpf.
- D) CHECK (cpf > 0).

**Gabarito:** A

---

## ITEM 29 — Financeiro sem CPF

- **Capacidade:** C14

**Comando:**  
Na rastreabilidade, como o requisito "financeiro não vê CPF" é atendido?

**Alternativas:**
- A) GRANT SELECT (id_aluno, nome) ON aluno ao grupo do financeiro.
- B) Apagando a coluna cpf.
- C) GRANT ALL ON aluno ao financeiro.
- D) Pedindo ao financeiro que não olhe o CPF.

**Gabarito:** A

---

## ITEM 30 — Conferir Tabelas

- **Capacidade:** C7

**Comando:**  
Na conferência final, qual comando do psql lista as tabelas do banco?

**Alternativas:**
- A) \du
- B) \l+
- C) \dp
- D) \dt

**Gabarito:** D

---

## ITEM 31 — Conferir Colunas

- **Capacidade:** C7

**Comando:**  
Qual comando mostra as colunas, os tipos e as restrições da tabela matricula?

**Alternativas:**
- A) \i matricula
- B) \du matricula
- C) \dt matricula
- D) \d matricula

**Gabarito:** D

---

## ITEM 32 — Teste de Restrição

- **Capacidade:** C7

**Comando:**  
Na conferência final, como testar se a chave estrangeira funciona?

**Alternativas:**
- A) Tentar gravar um dado inválido (id inexistente) e verificar o erro esperado.
- B) Desligar a chave estrangeira e gravar qualquer valor.
- C) Apagar a tabela de referência.
- D) Contar quantas linhas a tabela tem.

**Gabarito:** A

---

## ITEM 33 — Erro Esperado

- **Capacidade:** C8

**Comando:**  
No teste do procedimento matricular numa turma cheia, o banco devolve erro. Isso significa:

**Alternativas:**
- A) Que é preciso aumentar o limite para 100 alunos.
- B) Que a regra funciona: é o resultado esperado e vai para o relatório de testes.
- C) Que a turma deve ser apagada.
- D) Que o procedimento está quebrado e deve ser removido.

**Gabarito:** B

---

## ITEM 34 — Relatório de Testes

- **Capacidade:** C1

**Comando:**  
O que cada linha do relatório de testes registra?

**Alternativas:**
- A) O nome de quem faltou à aula.
- B) O que foi testado, o resultado esperado e o resultado obtido.
- C) A lista de comandos do psql.
- D) A senha usada em cada teste.

**Gabarito:** B

---

## ITEM 35 — Contagem de Dados

- **Capacidade:** C8

**Comando:**  
Qual comando confere se os dados iniciais dos cursos foram carregados?

**Alternativas:**
- A) SELECT count(*) FROM curso;
- B) GRANT SELECT ON curso;
- C) \du curso
- D) SELECT * FROM pg_hba;

**Gabarito:** A

---

## ITEM 36 — Backup da Entrega

- **Capacidade:** C14

**Comando:**  
Qual comando gera o backup do banco no formato custom?

**Alternativas:**
- A) createdb escola_db_entrega
- B) psql -f escola_db_entrega.dump
- C) pg_restore -d escola_db escola_db_entrega.dump
- D) pg_dump -U postgres -Fc -d escola_db -f escola_db_entrega.dump

**Gabarito:** D

---

## ITEM 37 — Teste de Restauração

- **Capacidade:** C14

**Comando:**  
Como provar que o backup da entrega funciona?

**Alternativas:**
- A) Enviar o arquivo por e-mail ao cliente.
- B) Ver se o arquivo tem tamanho maior que zero.
- C) Restaurar com pg_restore em outro banco e conferir os dados.
- D) Guardar o arquivo no mesmo disco do servidor.

**Gabarito:** C

---

## ITEM 38 — Arquivo de Backup

- **Capacidade:** C14

**Comando:**  
Onde o arquivo de backup da entrega, com dados pessoais, deve ficar?

**Alternativas:**
- A) No repositório Git público do projeto.
- B) No site do sistema, para download.
- C) Na área de trabalho de todos os funcionários.
- D) Num lugar com acesso restrito, nunca no Git.

**Gabarito:** D

---

## ITEM 39 — Login do Back-end

- **Capacidade:** C14

**Comando:**  
Com qual login o back-end se conecta ao banco?

**Alternativas:**
- A) Um login compartilhado por toda a equipe.
- B) O login da coordenação.
- C) app_escola, com só os comandos de que o sistema precisa.
- D) postgres, para não ter erro de permissão.

**Gabarito:** C

---

## ITEM 40 — String de Conexão

- **Capacidade:** C14

**Comando:**  
Onde fica a string de conexão (DATABASE_URL) usada pelo back-end?

**Alternativas:**
- A) No README publicado com a senha real.
- B) Numa variável de ambiente.
- C) No JavaScript do site.
- D) Num comentário do script 02-tabelas.sql.

**Gabarito:** B

---

## ITEM 41 — Contrato do Banco

- **Capacidade:** C8

**Comando:**  
O que é o "contrato" do banco entregue ao back-end?

**Alternativas:**
- A) A licença do PostgreSQL.
- B) O arquivo postgresql.conf.
- C) A lista de tabelas, colunas, visões e procedimentos que ele pode usar, com as mensagens de erro.
- D) O contrato de trabalho da equipe.

**Gabarito:** C

---

## ITEM 42 — Chamar a Rotina

- **Capacidade:** C8

**Comando:**  
Como o back-end deve chamar a matrícula, segundo o contrato do banco?

**Alternativas:**
- A) INSERT INTO matricular VALUES (...);
- B) GRANT matricular TO app_escola;
- C) CALL matricular(id_aluno, id_turma);
- D) SELECT * FROM matricular;

**Gabarito:** C

---

## ITEM 43 — Regras no Banco

- **Capacidade:** C8

**Comando:**  
O banco já garante chaves, CHECK e triggers. O que o back-end deve fazer com isso?

**Alternativas:**
- A) Desligar as regras do banco para ficar mais rápido.
- B) Repetir todas as regras e apagar as do banco.
- C) Tratar o erro que o banco devolve e mostrar uma mensagem clara ao usuário.
- D) Ignorar os erros do banco.

**Gabarito:** C

---

## ITEM 44 — Revisor

- **Capacidade:** C2

**Comando:**  
Na revisão cruzada, qual atitude é esperada do revisor?

**Alternativas:**
- A) Não ler a documentação e só olhar o DER.
- B) Perguntar em vez de acusar, apontar onde está o problema e sugerir.
- C) Dizer apenas que está tudo errado.
- D) Reescrever o trabalho do outro grupo sem avisar.

**Gabarito:** B

---

## ITEM 45 — Autor da Entrega

- **Capacidade:** C2

**Comando:**  
Ao receber uma sugestão na revisão cruzada, o que o grupo autor deve fazer?

**Alternativas:**
- A) Pedir ao professor que ignore a revisão.
- B) Recusar qualquer sugestão para não atrasar.
- C) Escutar, conferir nos requisitos e aceitar a sugestão ou justificar a escolha.
- D) Aceitar tudo sem conferir com o escopo.

**Gabarito:** C

---

## ITEM 46 — Registro da Revisão

- **Capacidade:** C2

**Comando:**  
Como cada sugestão da revisão cruzada é registrada?

**Alternativas:**
- A) Com a nota que o revisor daria.
- B) Sugestão, decisão, motivo e quem ajusta.
- C) Não se registra, basta conversar.
- D) Só o nome do revisor.

**Gabarito:** B

---

## ITEM 47 — Justificativa Técnica

- **Capacidade:** C1

**Comando:**  
Qual é uma justificativa técnica válida para "a matrícula é cancelada, não apagada"?

**Alternativas:**
- A) Porque o professor pediu assim.
- B) Porque sim.
- C) Guarda o histórico e as parcelas, protegendo a integridade; ninguém recebe DELETE.
- D) Porque apagar dá mais trabalho para digitar.

**Gabarito:** C

---

## ITEM 48 — Chave Composta

- **Capacidade:** C1

**Comando:**  
Por que a tabela parcela tem a chave (id_matricula, numero)?

**Alternativas:**
- A) Porque o PostgreSQL não aceita chave simples.
- B) Para permitir parcelas repetidas na mesma matrícula.
- C) Porque a parcela é entidade fraca: só existe dentro da matrícula.
- D) Porque toda tabela precisa de duas colunas na chave.

**Gabarito:** C

---

## ITEM 49 — Limite no Procedimento

- **Capacidade:** C1

**Comando:**  
Por que o limite de 25 alunos fica no procedimento e não num CHECK?

**Alternativas:**
- A) Porque o CHECK apaga as matrículas excedentes.
- B) Porque CHECK não existe no PostgreSQL.
- C) Porque a regra precisa contar as matrículas da turma, o que um CHECK não faz.
- D) Porque o procedimento é mais bonito.

**Gabarito:** C

---

## ITEM 50 — Lições Aprendidas

- **Capacidade:** C2

**Comando:**  
Para que servem as lições aprendidas na documentação final?

**Alternativas:**
- A) Registrar o que funcionou e o que o grupo faria diferente, para ajudar a próxima equipe.
- B) Substituir o cronograma.
- C) Listar os erros de cada colega para a nota.
- D) Guardar as senhas usadas no projeto.

**Gabarito:** A
