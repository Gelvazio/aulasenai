# Atividade: Segurança da Informação: Pilares, Acesso e Auditoria — 50 Questões

- **Aula:** 19
- **Tema:** Segurança da Informação: Pilares, Acesso e Auditoria
- **Ícone:** 🔐
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer os pilares e os níveis hierárquicos da segurança da informação e aplicar boas práticas no banco: confidencialidade, integridade e disponibilidade, classificação da informação, menor privilégio, matriz de acesso, papéis de grupo e de login (CREATE ROLE), GRANT e REVOKE (inclusive por coluna), visão (VIEW), conferência das permissões, auditoria com log do servidor e com tabela alimentada por trigger (SECURITY DEFINER, session_user), LGPD, backup testado e erros comuns.
- **Conteúdo-base:** ../CONTEUDO/AULA-19-SEGURANCA-DA-INFORMACAO-PILARES-ACESSO-E-AUDITORIA.md
- **Slides:** ../AULAS/AULA-19-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-19-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Os Três Pilares

- **Capacidade:** C12

**Comando:**  
Quais são os três pilares da segurança da informação?

**Alternativas:**
- A) Tabela, coluna e chave primária.
- B) Velocidade, armazenamento e backup.
- C) Login, senha e firewall.
- D) Confidencialidade, integridade e disponibilidade.

**Gabarito:** D

---

## ITEM 02 — Confidencialidade

- **Capacidade:** C12

**Comando:**  
O pilar da confidencialidade responde a qual pergunta?

**Alternativas:**
- A) O banco responde rápido às consultas?
- B) Só quem pode vê o dado?
- C) O dado está correto e completo?
- D) O dado está lá quando é preciso?

**Gabarito:** B

---

## ITEM 03 — Integridade

- **Capacidade:** C12

**Comando:**  
O pilar da integridade responde a qual pergunta?

**Alternativas:**
- A) Só quem pode vê o dado?
- B) Quantos usuários estão conectados agora?
- C) O dado está lá quando é preciso?
- D) O dado está correto e completo?

**Gabarito:** D

---

## ITEM 04 — Disponibilidade

- **Capacidade:** C12

**Comando:**  
O pilar da disponibilidade responde a qual pergunta?

**Alternativas:**
- A) O dado está correto e completo?
- B) Quem criou a tabela?
- C) O dado está lá quando é preciso?
- D) Só quem pode vê o dado?

**Gabarito:** C

---

## ITEM 05 — Vazamento de CPF

- **Capacidade:** C12

**Comando:**  
Uma planilha com o CPF de todos os alunos circulou num grupo de mensagens. Qual pilar foi atingido?

**Alternativas:**
- A) Normalização.
- B) Integridade.
- C) Disponibilidade.
- D) Confidencialidade.

**Gabarito:** D

---

## ITEM 06 — Nota Alterada

- **Capacidade:** C12

**Comando:**  
Alguém mudou a nota de um aluno sem autorização. Qual pilar foi atingido?

**Alternativas:**
- A) Confidencialidade.
- B) Disponibilidade.
- C) Integridade.
- D) Autenticidade.

**Gabarito:** C

---

## ITEM 07 — Disco Queimado

- **Capacidade:** C12

**Comando:**  
O disco do servidor queimou e o sistema da escola ficou fora do ar o dia todo. Qual pilar foi atingido?

**Alternativas:**
- A) Integridade.
- B) Não repúdio.
- C) Disponibilidade.
- D) Confidencialidade.

**Gabarito:** C

---

## ITEM 08 — Sigla CID

- **Capacidade:** C12

**Comando:**  
O que significa a sigla CID (em inglês, CIA) na segurança da informação?

**Alternativas:**
- A) Chave, Índice e Domínio.
- B) Confidencialidade, Integridade e Disponibilidade.
- C) Cópia, Instalação e Desempenho.
- D) Controle, Inserção e Deleção.

**Gabarito:** B

---

## ITEM 09 — Backup sem Senha

- **Capacidade:** C12

**Comando:**  
Um backup guardado sem senha num pendrive compartilhado ajuda um pilar e fere outro. Quais?

**Alternativas:**
- A) Ajuda a disponibilidade e fere a confidencialidade.
- B) Ajuda a confidencialidade e fere a integridade.
- C) Ajuda a integridade e fere a disponibilidade.
- D) Não tem relação com nenhum pilar.

**Gabarito:** A

---

## ITEM 10 — Proteção da Integridade

- **Capacidade:** C12

**Comando:**  
Qual recurso do banco protege principalmente a integridade dos dados?

**Alternativas:**
- A) Chaves, CHECK, transação e trigger de validação.
- B) A visão com o total de matrículas por turma.
- C) O backup guardado em outro lugar.
- D) A permissão por coluna para esconder o CPF.

**Gabarito:** A

---

## ITEM 11 — Autenticidade e Não Repúdio

- **Capacidade:** C12

**Comando:**  
Alguns autores somam autenticidade e não repúdio aos pilares. Na aula, eles aparecem como:

**Alternativas:**
- A) Normalização e padronização.
- B) Controle de acesso (login e senha) e auditoria (quem fez não pode negar).
- C) Backup e restauração.
- D) Índices e visões.

**Gabarito:** B

---

## ITEM 12 — Informação Pública

- **Capacidade:** C13

**Comando:**  
Na classificação da informação da escola, qual dado é público?

**Alternativas:**
- A) E-mail e telefone do aluno.
- B) Nome dos cursos, carga horária e valor.
- C) CPF e data de nascimento do aluno.
- D) Parcelas e pagamentos.

**Gabarito:** B

---

## ITEM 13 — Informação Confidencial

- **Capacidade:** C13

**Comando:**  
Na classificação da informação da escola, qual dado é confidencial?

**Alternativas:**
- A) CPF, data de nascimento, parcelas e pagamentos.
- B) Nome dos cursos e carga horária.
- C) Quantidade de matrículas por turma.
- D) Turmas abertas no semestre.

**Gabarito:** A

---

## ITEM 14 — Menor Privilégio

- **Capacidade:** C13

**Comando:**  
O que diz o princípio do menor privilégio?

**Alternativas:**
- A) Cada usuário recebe só as permissões necessárias para o seu trabalho.
- B) Todos recebem todas as permissões para não dar erro.
- C) Só o administrador pode ler os dados.
- D) As permissões são dadas pela ordem de chegada dos funcionários.

**Gabarito:** A

---

## ITEM 15 — Senha Vazada

- **Capacidade:** C13

**Comando:**  
Por que o menor privilégio ajuda quando a senha da secretaria vaza?

**Alternativas:**
- A) O login da secretaria passa a ser de administrador.
- B) O estrago fica limitado ao que a secretaria podia fazer.
- C) O vazamento apaga as permissões dela.
- D) O banco troca a senha sozinho.

**Gabarito:** B

---

## ITEM 16 — Usuário postgres

- **Capacidade:** C13

**Comando:**  
Na hierarquia de acesso, como o login postgres (administrador) deve ser usado?

**Alternativas:**
- A) Só pelo DBA, para administrar; nunca pela aplicação nem no dia a dia.
- B) Por todos os funcionários, com a mesma senha.
- C) Só para consultas da coordenação.
- D) Pela aplicação, porque assim nunca dá erro de permissão.

**Gabarito:** A

---

## ITEM 17 — Nível da Aplicação

- **Capacidade:** C13

**Comando:**  
O login app_escola, usado pelo back-end, deve ter:

**Alternativas:**
- A) Permissão de criar outros papéis.
- B) Nenhuma permissão, nem SELECT.
- C) Só os comandos que o back-end usa.
- D) Todas as permissões, inclusive DROP.

**Gabarito:** C

---

## ITEM 18 — Matriz de Acesso

- **Capacidade:** C13

**Comando:**  
O que é a matriz de acesso do sistema?

**Alternativas:**
- A) A lista de senhas dos funcionários.
- B) O arquivo de configuração pg_hba.conf.
- C) Uma tabela que diz quem pode ler, incluir, alterar e excluir cada tabela.
- D) O diagrama entidade-relacionamento do banco.

**Gabarito:** C

---

## ITEM 19 — Letras da Matriz

- **Capacidade:** C13

**Comando:**  
Na matriz de acesso da aula, as letras S, I, U e D significam:

**Alternativas:**
- A) SELECT, INSERT, UPDATE e DELETE.
- B) Senha, Integridade, Uso e Disponibilidade.
- C) Secretaria, Interno, Urgente e Diretoria.
- D) Sistema, Índice, Usuário e Dado.

**Gabarito:** A

---

## ITEM 20 — Ninguém com DELETE

- **Capacidade:** C14

**Comando:**  
Na matriz da escola ninguém recebe DELETE na matrícula. Por quê?

**Alternativas:**
- A) Porque o PostgreSQL não tem o comando DELETE.
- B) Porque DELETE só funciona com o usuário postgres.
- C) Porque a matrícula nunca precisa mudar.
- D) A matrícula é cancelada (situacao = 'cancelada'), não apagada, o que protege a integridade e o histórico.

**Gabarito:** D

---

## ITEM 21 — Papel (Role)

- **Capacidade:** C14

**Comando:**  
No PostgreSQL, o que é um papel (role)?

**Alternativas:**
- A) Uma tabela especial que guarda senhas.
- B) A mesma coisa para usuário e grupo; o que muda é o atributo LOGIN.
- C) Um esquema do banco.
- D) Um tipo de índice.

**Gabarito:** B

---

## ITEM 22 — Papel de Grupo

- **Capacidade:** C14

**Comando:**  
Qual comando cria um papel de grupo, sem login, para a secretaria?

**Alternativas:**
- A) CREATE USER grupo_secretaria SUPERUSER;
- B) CREATE TABLE grupo_secretaria (login text);
- C) CREATE ROLE grupo_secretaria NOLOGIN;
- D) GRANT LOGIN TO grupo_secretaria;

**Gabarito:** C

---

## ITEM 23 — Papel de Login

- **Capacidade:** C14

**Comando:**  
Qual comando cria o login da Ana já dentro do grupo da secretaria?

**Alternativas:**
- A) GRANT ana_secretaria ON DATABASE escola_db;
- B) CREATE ROLE ana_secretaria NOLOGIN IN ROLE grupo_secretaria;
- C) CREATE TABLE ana_secretaria IN grupo_secretaria;
- D) CREATE ROLE ana_secretaria LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_secretaria;

**Gabarito:** D

---

## ITEM 24 — Pôr no Grupo

- **Capacidade:** C14

**Comando:**  
Qual comando põe a Carla, que já tem login, no grupo de consulta?

**Alternativas:**
- A) INSERT INTO grupo_consulta VALUES ('carla_coordenacao');
- B) GRANT carla_coordenacao TO grupo_consulta ON TABLE aluno;
- C) GRANT grupo_consulta TO carla_coordenacao;
- D) ALTER TABLE grupo_consulta ADD carla_coordenacao;

**Gabarito:** C

---

## ITEM 25 — Permissão no Grupo

- **Capacidade:** C14

**Comando:**  
Por que as permissões ficam no grupo e não em cada pessoa?

**Alternativas:**
- A) Porque assim o grupo pode ter senha compartilhada.
- B) Porque o PostgreSQL não deixa dar permissão para um login.
- C) Porque o grupo tem acesso de administrador.
- D) Funcionário novo só precisa do login no grupo e herda as permissões, todas iguais entre colegas.

**Gabarito:** D

---

## ITEM 26 — Login Compartilhado

- **Capacidade:** C14

**Comando:**  
Qual o problema de usar um login único "secretaria" com a senha num post-it?

**Alternativas:**
- A) O banco fica mais lento.
- B) Nenhum, desde que a senha seja forte.
- C) A auditoria mostra "secretaria" e não quem fez; e a senha fica exposta.
- D) O PostgreSQL não aceita logins com nome de função.

**Gabarito:** C

---

## ITEM 27 — Funcionário que Saiu

- **Capacidade:** C14

**Comando:**  
Um funcionário saiu da escola. Qual é a ação adequada no banco?

**Alternativas:**
- A) ALTER ROLE ... NOLOGIN (ou DROP ROLE), sem refazer as permissões do grupo.
- B) Apagar as tabelas que ele usava.
- C) Dar a senha dele ao colega que ficou.
- D) Nada: o login fica ativo para o próximo funcionário.

**Gabarito:** A

---

## ITEM 28 — Login com Validade

- **Capacidade:** C14

**Comando:**  
Qual comando faz o login de um estagiário expirar no fim do ano?

**Alternativas:**
- A) DROP ROLE estagiario UNTIL '2026-12-31';
- B) REVOKE estagiario FROM PUBLIC;
- C) CREATE ROLE estagiario TEMPORARY;
- D) ALTER ROLE estagiario VALID UNTIL '2026-12-31';

**Gabarito:** D

---

## ITEM 29 — REVOKE de PUBLIC

- **Capacidade:** C14

**Comando:**  
Para que serve REVOKE ALL ON DATABASE escola_db FROM PUBLIC no início do script?

**Alternativas:**
- A) Tira o acesso que todo papel recebe por padrão, para que só quem recebeu GRANT entre.
- B) Remove todos os dados públicos das tabelas.
- C) Dá acesso total a todos os usuários.
- D) Apaga o banco escola_db.

**Gabarito:** A

---

## ITEM 30 — GRANT

- **Capacidade:** C14

**Comando:**  
O que faz o comando GRANT?

**Alternativas:**
- A) Tira uma permissão de um papel.
- B) Cria uma tabela nova.
- C) Apaga um usuário.
- D) Dá uma permissão num objeto a um papel.

**Gabarito:** D

---

## ITEM 31 — REVOKE

- **Capacidade:** C14

**Comando:**  
O que faz o comando REVOKE?

**Alternativas:**
- A) Restaura um backup.
- B) Dá uma permissão a um papel.
- C) Cria um papel de grupo.
- D) Tira uma permissão de um papel.

**Gabarito:** D

---

## ITEM 32 — Sintaxe do GRANT

- **Capacidade:** C14

**Comando:**  
Qual comando dá à secretaria leitura, inclusão e alteração em aluno e matricula?

**Alternativas:**
- A) REVOKE SELECT, INSERT, UPDATE ON aluno, matricula FROM grupo_secretaria;
- B) GRANT ALL ON DATABASE escola_db TO grupo_secretaria;
- C) GRANT grupo_secretaria TO aluno, matricula;
- D) GRANT SELECT, INSERT, UPDATE ON aluno, matricula TO grupo_secretaria;

**Gabarito:** D

---

## ITEM 33 — Permissão por Coluna

- **Capacidade:** C14

**Comando:**  
Qual comando deixa o financeiro alterar só a data de pagamento da parcela?

**Alternativas:**
- A) GRANT UPDATE ON parcela TO grupo_financeiro;
- B) GRANT SELECT, UPDATE (data_pagamento) ON parcela TO grupo_financeiro;
- C) GRANT UPDATE ON data_pagamento TO parcela;
- D) GRANT ALL ON parcela TO grupo_financeiro;

**Gabarito:** B

---

## ITEM 34 — Esconder o CPF

- **Capacidade:** C14

**Comando:**  
O financeiro precisa ver só o código e o nome do aluno. Qual comando atende?

**Alternativas:**
- A) GRANT SELECT ON aluno TO grupo_financeiro;
- B) REVOKE SELECT (id_aluno, nome) ON aluno FROM grupo_financeiro;
- C) GRANT SELECT (cpf) ON aluno TO grupo_financeiro;
- D) GRANT SELECT (id_aluno, nome) ON aluno TO grupo_financeiro;

**Gabarito:** D

---

## ITEM 35 — CONNECT e USAGE

- **Capacidade:** C14

**Comando:**  
Além das permissões nas tabelas, o que o grupo precisa para entrar no banco e enxergar o esquema?

**Alternativas:**
- A) Apenas a senha do postgres.
- B) GRANT CONNECT ON DATABASE e GRANT USAGE ON SCHEMA public.
- C) GRANT DROP ON DATABASE e GRANT CREATE ON SCHEMA.
- D) Um índice em cada tabela.

**Gabarito:** B

---

## ITEM 36 — WITH GRANT OPTION

- **Capacidade:** C14

**Comando:**  
Por que evitar o WITH GRANT OPTION?

**Alternativas:**
- A) Porque ele deixa a consulta mais lenta.
- B) Porque ele apaga a permissão depois de um dia.
- C) Deixa o papel repassar a permissão a outros, e o controle sai da mão do DBA.
- D) Porque ele só funciona com SELECT.

**Gabarito:** C

---

## ITEM 37 — Permission Denied

- **Capacidade:** C14

**Comando:**  
No teste com o login do financeiro, SELECT cpf FROM aluno devolve "permission denied". O que isso indica?

**Alternativas:**
- A) Que a tabela aluno foi apagada.
- B) Que a matriz de acesso foi respeitada: é o resultado esperado do teste.
- C) Que o banco está fora do ar.
- D) Que é preciso dar GRANT ALL ao financeiro.

**Gabarito:** B

---

## ITEM 38 — EXECUTE

- **Capacidade:** C14

**Comando:**  
Qual privilégio permite chamar uma função ou procedimento?

**Alternativas:**
- A) EXECUTE.
- B) SELECT.
- C) TRIGGER.
- D) REFERENCES.

**Gabarito:** A

---

## ITEM 39 — Visão (VIEW)

- **Capacidade:** C14

**Comando:**  
Por que dar à coordenação SELECT na visão vw_matriculas_por_turma em vez das tabelas?

**Alternativas:**
- A) Porque a visão dispensa o login.
- B) Ela vê só o total por turma, sem nenhum dado de aluno das tabelas de baixo.
- C) Porque a visão guarda uma cópia de segurança das tabelas.
- D) Porque a visão deixa a coordenação alterar as matrículas.

**Gabarito:** B

---

## ITEM 40 — Conferir os Papéis

- **Capacidade:** C14

**Comando:**  
Qual comando do psql lista os papéis, os atributos e os grupos de cada um?

**Alternativas:**
- A) \l
- B) \dp
- C) \dt
- D) \du

**Gabarito:** D

---

## ITEM 41 — Conferir as Permissões

- **Capacidade:** C14

**Comando:**  
Qual comando do psql mostra as permissões da tabela aluno, inclusive por coluna?

**Alternativas:**
- A) \dp aluno
- B) \d+ escola_db
- C) \du aluno
- D) \dn aluno

**Gabarito:** A

---

## ITEM 42 — Auditoria de Acesso

- **Capacidade:** C12

**Comando:**  
O que é auditoria de acesso?

**Alternativas:**
- A) A lista de cursos oferecidos pela escola.
- B) A cópia diária do banco para outro disco.
- C) O registro de quem fez o quê, quando e em qual dado.
- D) A conferência da normalização das tabelas.

**Gabarito:** C

---

## ITEM 43 — Log do Servidor

- **Capacidade:** C14

**Comando:**  
Qual configuração do postgresql.conf registra os comandos que alteram dados?

**Alternativas:**
- A) max_connections = 100
- B) listen_addresses = '*'
- C) log_statement = 'mod'
- D) log_connections = off

**Gabarito:** C

---

## ITEM 44 — Função de Auditoria

- **Capacidade:** C14

**Comando:**  
Na função registrar_auditoria, o que TG_TABLE_NAME e TG_OP informam?

**Alternativas:**
- A) O login e a senha de quem conectou.
- B) A data e a hora do servidor.
- C) A tabela que disparou o trigger e a operação (INSERT, UPDATE ou DELETE).
- D) O número de linhas da tabela.

**Gabarito:** C

---

## ITEM 45 — Antes e Depois

- **Capacidade:** C14

**Comando:**  
Para que a auditoria grava to_jsonb(OLD) e to_jsonb(NEW)?

**Alternativas:**
- A) Para criptografar a linha.
- B) Para guardar a linha inteira antes e depois da alteração.
- C) Para converter a tabela em visão.
- D) Para apagar a linha antiga.

**Gabarito:** B

---

## ITEM 46 — SECURITY DEFINER

- **Capacidade:** C14

**Comando:**  
Por que a função de auditoria usa SECURITY DEFINER?

**Alternativas:**
- A) Faz a função rodar mais rápido.
- B) Roda com o poder do dono e grava na auditoria, sem que os usuários tenham permissão para apagar o próprio rastro.
- C) Deixa qualquer usuário apagar a auditoria.
- D) Torna a função pública na internet.

**Gabarito:** B

---

## ITEM 47 — session_user

- **Capacidade:** C14

**Comando:**  
Dentro da função SECURITY DEFINER, por que gravar session_user e não current_user?

**Alternativas:**
- A) O current_user vira o dono da função; o session_user continua sendo o login que conectou.
- B) Porque current_user não existe no PostgreSQL.
- C) Porque os dois sempre têm o mesmo valor.
- D) Porque session_user grava a senha do usuário.

**Gabarito:** A

---

## ITEM 48 — LGPD

- **Capacidade:** C14

**Comando:**  
O que a LGPD (Lei nº 13.709/2018) pede em relação aos dados pessoais dos alunos?

**Alternativas:**
- A) Coletar só o necessário, proteger e saber quem acessou.
- B) Publicar o CPF de todos para dar transparência.
- C) Apagar todos os dados ao fim de cada aula.
- D) Guardar os dados sem senha para facilitar o acesso.

**Gabarito:** A

---

## ITEM 49 — Backup Testado

- **Capacidade:** C14

**Comando:**  
Por que o backup com pg_dump precisa de teste de restauração?

**Alternativas:**
- A) Backup que nunca foi restaurado não é garantia de disponibilidade.
- B) Porque o teste deixa o backup sem senha.
- C) Porque o pg_dump apaga o banco original.
- D) Porque o backup só vale no mesmo disco do servidor.

**Gabarito:** A

---

## ITEM 50 — Senha da Aplicação

- **Capacidade:** C14

**Comando:**  
Onde deve ficar a senha do login da aplicação?

**Alternativas:**
- A) Num comentário do script SQL publicado no Git.
- B) Em variáveis de ambiente, nunca no Git nem no JavaScript do site.
- C) No código do site, para facilitar.
- D) Na tabela aluno.

**Gabarito:** B
