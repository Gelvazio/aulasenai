# Atividade: Procedimentos Armazenados — 50 Questões

- **Aula:** 17
- **Tema:** Procedimentos Armazenados
- **Ícone:** ⚙️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar linguagem de manipulação de dados em procedimentos armazenados: conceito e vantagens, função e procedimento no PostgreSQL, CREATE FUNCTION e CREATE PROCEDURE, CALL e SELECT, PL/pgSQL com parâmetros, DECLARE, SELECT INTO, IF, RETURN e FOUND, RAISE EXCEPTION e RAISE NOTICE, trava com FOR UPDATE, CREATE OR REPLACE, DROP e erros comuns.
- **Conteúdo-base:** ../CONTEUDO/AULA-17-PROCEDIMENTOS-ARMAZENADOS.md
- **Slides:** ../AULAS/AULA-17-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-17-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O que É

- **Capacidade:** C8

**Comando:**  
O que é um procedimento armazenado?

**Alternativas:**
- A) Um arquivo de texto salvo no computador do aluno.
- B) Uma cópia de segurança das tabelas.
- C) Uma tabela que guarda os comandos executados.
- D) Um conjunto de comandos SQL guardado no banco, com nome e parâmetros, chamado quando o sistema precisa.

**Gabarito:** D

---

## ITEM 02 — Onde Fica

- **Capacidade:** C8

**Comando:**  
Onde fica guardado um procedimento armazenado?

**Alternativas:**
- A) Somente no código do back-end.
- B) Na pasta de instalação do VS Code.
- C) Dentro do próprio banco de dados.
- D) No navegador do usuário.

**Gabarito:** C

---

## ITEM 03 — Regra num Lugar Só

- **Capacidade:** C8

**Comando:**  
Qual é uma vantagem de colocar a regra "turma tem até 25 alunos" num procedimento do banco?

**Alternativas:**
- A) A regra deixa de precisar de teste.
- B) O banco passa a aceitar qualquer quantidade de alunos.
- C) As tabelas ficam sem chave primária.
- D) Todo sistema que usa o banco segue a mesma regra.

**Gabarito:** D

---

## ITEM 04 — Menos Idas e Voltas

- **Capacidade:** C8

**Comando:**  
Por que um procedimento pode deixar o sistema mais rápido?

**Alternativas:**
- A) Porque ele dispensa o uso de índices e chaves.
- B) Porque ele desliga as restrições do banco.
- C) Porque ele apaga as linhas antigas da tabela.
- D) Porque uma única chamada substitui vários comandos enviados pela rede.

**Gabarito:** D

---

## ITEM 05 — Regra do Banco ou da Tela

- **Capacidade:** C8

**Comando:**  
Qual regra é melhor deixar no back-end, e não num procedimento do banco?

**Alternativas:**
- A) O valor da parcela deve ser maior que zero.
- B) Uma parcela paga não pode ser paga de novo.
- C) A turma tem no máximo 25 alunos ativos.
- D) Mostrar os valores em reais com vírgula na tela.

**Gabarito:** D

---

## ITEM 06 — Chamar uma Função

- **Capacidade:** C8

**Comando:**  
Como se chama a função valor_pago no PostgreSQL?

**Alternativas:**
- A) RUN valor_pago(10);
- B) EXECUTE TABLE valor_pago(10);
- C) CALL valor_pago(10);
- D) SELECT valor_pago(10);

**Gabarito:** D

---

## ITEM 07 — Chamar um Procedimento

- **Capacidade:** C8

**Comando:**  
Como se chama o procedimento matricular no PostgreSQL?

**Alternativas:**
- A) INSERT matricular(3, 2);
- B) CALL matricular(3, 2);
- C) OPEN matricular(3, 2);
- D) SELECT * FROM matricular;

**Gabarito:** B

---

## ITEM 08 — Função Devolve Valor

- **Capacidade:** C8

**Comando:**  
Qual é a principal diferença entre função e procedimento no PostgreSQL?

**Alternativas:**
- A) A função devolve um valor; o procedimento executa uma ação e é chamado com CALL.
- B) Os dois são iguais e chamados do mesmo jeito.
- C) A função não aceita parâmetros.
- D) O procedimento só funciona no pgAdmin.

**Gabarito:** A

---

## ITEM 09 — RETURNS

- **Capacidade:** C8

**Comando:**  
Na criação de uma função, o que indica RETURNS numeric?

**Alternativas:**
- A) O tipo do valor que a função devolve.
- B) O nome da tabela que será alterada.
- C) O usuário que pode chamar a função.
- D) A quantidade de parâmetros da função.

**Gabarito:** A

---

## ITEM 10 — Controle de Transação

- **Capacidade:** C8

**Comando:**  
Qual rotina pode usar COMMIT dentro do corpo, quando chamada fora de um bloco de transação?

**Alternativas:**
- A) O procedimento (CREATE PROCEDURE).
- B) A função (CREATE FUNCTION).
- C) A visão (CREATE VIEW).
- D) O índice (CREATE INDEX).

**Gabarito:** A

---

## ITEM 11 — Linguagem

- **Capacidade:** C8

**Comando:**  
Em LANGUAGE plpgsql, o que é PL/pgSQL?

**Alternativas:**
- A) Um tipo de dado para textos longos.
- B) A linguagem de programação do PostgreSQL para escrever funções e procedimentos.
- C) Um programa para desenhar o DER.
- D) O nome do usuário administrador do banco.

**Gabarito:** B

---

## ITEM 12 — Delimitador

- **Capacidade:** C8

**Comando:**  
Para que servem os $$ no começo e no fim do corpo da rotina?

**Alternativas:**
- A) Para indicar valores em dinheiro.
- B) Para comentar o código.
- C) Para criar uma variável global.
- D) Para delimitar o corpo da função ou do procedimento.

**Gabarito:** D

---

## ITEM 13 — DECLARE

- **Capacidade:** C8

**Comando:**  
Para que serve a seção DECLARE num bloco PL/pgSQL?

**Alternativas:**
- A) Para criar as variáveis locais usadas no bloco.
- B) Para apagar a rotina antiga.
- C) Para criar uma tabela nova no banco.
- D) Para dar permissão aos usuários.

**Gabarito:** A

---

## ITEM 14 — SELECT INTO

- **Capacidade:** C8

**Comando:**  
O que faz SELECT count(*) INTO v_ativos FROM matricula WHERE id_turma = p_turma;?

**Alternativas:**
- A) Mostra o resultado na tela e descarta o valor.
- B) Insere uma matrícula na turma.
- C) Cria uma tabela chamada v_ativos.
- D) Guarda na variável v_ativos o número de matrículas da turma.

**Gabarito:** D

---

## ITEM 15 — Sem INTO

- **Capacidade:** C8

**Comando:**  
O que acontece com um SELECT sem INTO dentro de uma função PL/pgSQL?

**Alternativas:**
- A) Dá erro, porque o resultado da consulta não tem para onde ir.
- B) O PostgreSQL ignora o comando sem avisar.
- C) O resultado é devolvido automaticamente pela função.
- D) O resultado é gravado numa tabela nova.

**Gabarito:** A

---

## ITEM 16 — RETURN

- **Capacidade:** C8

**Comando:**  
O que faz RETURN v_total; dentro de uma função?

**Alternativas:**
- A) Grava v_total na tabela parcela.
- B) Devolve o valor de v_total para quem chamou a função.
- C) Apaga a variável v_total.
- D) Volta para o começo da função.

**Gabarito:** B

---

## ITEM 17 — Parâmetro

- **Capacidade:** C8

**Comando:**  
Em matricular(p_aluno integer, p_turma integer), o que são p_aluno e p_turma?

**Alternativas:**
- A) Tabelas temporárias.
- B) Colunas novas da tabela matricula.
- C) Parâmetros: valores informados na chamada do procedimento.
- D) Nomes de usuários do banco.

**Gabarito:** C

---

## ITEM 18 — Prefixo p_

- **Capacidade:** C8

**Comando:**  
Por que usar o prefixo p_ nos parâmetros, como p_turma?

**Alternativas:**
- A) Para não confundir o parâmetro com a coluna de mesmo nome, como id_turma.
- B) Para deixar o parâmetro opcional.
- C) Para que o parâmetro seja gravado automaticamente na tabela.
- D) Porque o PostgreSQL exige que todo parâmetro comece com p.

**Gabarito:** A

---

## ITEM 19 — Nome Ambíguo

- **Capacidade:** C8

**Comando:**  
Um procedimento tem o parâmetro id_turma e faz WHERE id_turma = id_turma. Qual é o problema?

**Alternativas:**
- A) O nome fica ambíguo entre o parâmetro e a coluna, gerando erro ou resultado errado.
- B) Nenhum problema: é a forma recomendada.
- C) O filtro passa a ficar mais rápido.
- D) O PostgreSQL renomeia a coluna sozinho.

**Gabarito:** A

---

## ITEM 20 — IF

- **Capacidade:** C8

**Comando:**  
O que faz o bloco IF v_ativos >= 25 THEN ... END IF;?

**Alternativas:**
- A) Repete os comandos 25 vezes.
- B) Cria 25 matrículas de uma vez.
- C) Executa os comandos internos só quando a turma já tem 25 ou mais alunos ativos.
- D) Apaga as matrículas acima de 25.

**Gabarito:** C

---

## ITEM 21 — ELSIF

- **Capacidade:** C8

**Comando:**  
Para que serve o ELSIF num bloco IF?

**Alternativas:**
- A) Para repetir o bloco até dar erro.
- B) Para testar outra condição quando a anterior for falsa.
- C) Para encerrar o procedimento.
- D) Para criar uma variável nova.

**Gabarito:** B

---

## ITEM 22 — RAISE EXCEPTION

- **Capacidade:** C8

**Comando:**  
O que faz RAISE EXCEPTION 'Turma % sem vaga', p_turma;?

**Alternativas:**
- A) Interrompe a rotina com uma mensagem de erro e desfaz o que a chamada já tinha feito.
- B) Mostra um aviso e continua a matrícula.
- C) Grava a mensagem na tabela turma.
- D) Cria uma vaga extra na turma.

**Gabarito:** A

---

## ITEM 23 — RAISE NOTICE

- **Capacidade:** C8

**Comando:**  
Qual é a diferença entre RAISE NOTICE e RAISE EXCEPTION?

**Alternativas:**
- A) NOTICE apaga a tabela; EXCEPTION só avisa.
- B) Os dois param a rotina da mesma forma.
- C) NOTICE só mostra uma mensagem e continua; EXCEPTION para e desfaz a operação.
- D) NOTICE só funciona em funções e EXCEPTION só em tabelas.

**Gabarito:** C

---

## ITEM 24 — Marcador %

- **Capacidade:** C8

**Comando:**  
Em RAISE EXCEPTION 'Turma % sem vaga', p_turma;, o que faz o %?

**Alternativas:**
- A) É substituído pelo valor de p_turma na mensagem.
- B) Indica qualquer texto, como no LIKE.
- C) Calcula a porcentagem de vagas.
- D) Comenta o resto da linha.

**Gabarito:** A

---

## ITEM 25 — Nada pela Metade

- **Capacidade:** C8

**Comando:**  
O procedimento insere a matrícula e, depois, chega a um RAISE EXCEPTION. O que acontece com o INSERT?

**Alternativas:**
- A) É gravado em outra tabela.
- B) É desfeito: nada da chamada fica gravado.
- C) Fica gravado pela metade.
- D) Fica gravado, só a mensagem aparece.

**Gabarito:** B

---

## ITEM 26 — FOUND

- **Capacidade:** C8

**Comando:**  
Depois de um UPDATE dentro do PL/pgSQL, quando FOUND fica verdadeiro?

**Alternativas:**
- A) Quando a tabela tem mais de 25 linhas.
- B) Quando o procedimento termina sem erro.
- C) Quando o UPDATE alterou pelo menos uma linha.
- D) Sempre, depois de qualquer comando.

**Gabarito:** C

---

## ITEM 27 — IF NOT FOUND

- **Capacidade:** C8

**Comando:**  
No procedimento registrar_pagamento, para que serve IF NOT FOUND THEN RAISE EXCEPTION ...?

**Alternativas:**
- A) Para apagar a matrícula sem parcelas.
- B) Para criar a parcela que não existe.
- C) Para avisar com erro quando nenhuma parcela foi atualizada (inexistente ou já paga).
- D) Para pagar todas as parcelas da matrícula.

**Gabarito:** C

---

## ITEM 28 — Parcela Já Paga

- **Capacidade:** C8

**Comando:**  
Por que o UPDATE de registrar_pagamento tem AND data_pagamento IS NULL?

**Alternativas:**
- A) Para apagar as parcelas pagas.
- B) Para não registrar de novo o pagamento de uma parcela que já foi paga.
- C) Para pagar só as parcelas vencidas.
- D) Para deixar o campo data_pagamento obrigatório.

**Gabarito:** B

---

## ITEM 29 — FOR UPDATE

- **Capacidade:** C8

**Comando:**  
Para que serve PERFORM 1 FROM turma WHERE id_turma = p_turma FOR UPDATE; no procedimento matricular?

**Alternativas:**
- A) Para liberar todas as vagas da turma.
- B) Para trancar a turma e impedir que duas matrículas ao mesmo tempo passem do limite.
- C) Para atualizar o nome da turma.
- D) Para apagar a turma e criar outra.

**Gabarito:** B

---

## ITEM 30 — Duas Atendentes

- **Capacidade:** C8

**Comando:**  
Duas atendentes chamam matricular na mesma turma, com 24 alunos, ao mesmo tempo. Com o FOR UPDATE, o que acontece?

**Alternativas:**
- A) As duas matrículas entram e a turma fica com 26 alunos.
- B) A segunda chamada espera a primeira terminar e, ao contar, encontra 25 alunos e recebe o erro de sem vaga.
- C) O banco apaga a turma.
- D) As duas chamadas recebem erro.

**Gabarito:** B

---

## ITEM 31 — Turma Inexistente

- **Capacidade:** C8

**Comando:**  
O que o procedimento matricular faz quando p_turma não existe?

**Alternativas:**
- A) Ignora a chamada sem avisar.
- B) Matricula o aluno numa turma qualquer.
- C) Barra a chamada com RAISE EXCEPTION 'Turma % não existe'.
- D) Cria a turma automaticamente.

**Gabarito:** C

---

## ITEM 32 — Restrições Continuam

- **Capacidade:** C8

**Comando:**  
Um procedimento faz INSERT de uma matrícula repetida (mesmo aluno e mesma turma). O que acontece?

**Alternativas:**
- A) A matrícula antiga é apagada.
- B) O procedimento ignora as restrições da tabela.
- C) O UNIQUE (id_aluno, id_turma) continua valendo e o INSERT dá erro.
- D) A matrícula repetida é aceita porque veio de um procedimento.

**Gabarito:** C

---

## ITEM 33 — Contar Ativos

- **Capacidade:** C8

**Comando:**  
Por que o procedimento conta só as matrículas com situacao = 'ativa'?

**Alternativas:**
- A) Porque as outras situações são apagadas.
- B) Porque matrículas trancadas, concluídas ou canceladas não ocupam vaga.
- C) Porque só a situação ativa tem chave primária.
- D) Porque o COUNT não funciona com outras situações.

**Gabarito:** B

---

## ITEM 34 — Limite de 25

- **Capacidade:** C8

**Comando:**  
Qual condição barra a matrícula quando a turma já está cheia (25 alunos)?

**Alternativas:**
- A) IF v_ativos < 25 THEN RAISE EXCEPTION ...
- B) IF v_ativos = 0 THEN RAISE EXCEPTION ...
- C) IF v_ativos >= 25 THEN RAISE EXCEPTION ...
- D) IF v_ativos > 25 THEN RAISE NOTICE ...

**Gabarito:** C

---

## ITEM 35 — Função com coalesce

- **Capacidade:** C8

**Comando:**  
Na função valor_pago, por que usar coalesce(sum(valor), 0)?

**Alternativas:**
- A) Para arredondar o valor pago.
- B) Para devolver 0 em vez de NULL quando a matrícula não tem parcela paga.
- C) Para contar quantas parcelas existem.
- D) Para somar só as parcelas atrasadas.

**Gabarito:** B

---

## ITEM 36 — CREATE OR REPLACE

- **Capacidade:** C8

**Comando:**  
O que faz CREATE OR REPLACE PROCEDURE matricular(...)?

**Alternativas:**
- A) Cria uma cópia com outro nome.
- B) Cria o procedimento ou troca o corpo do que já existe com o mesmo nome e parâmetros.
- C) Apaga todas as matrículas e cria o procedimento.
- D) Só funciona se o procedimento ainda não existir.

**Gabarito:** B

---

## ITEM 37 — DROP PROCEDURE

- **Capacidade:** C8

**Comando:**  
Qual comando remove o procedimento matricular com dois parâmetros inteiros?

**Alternativas:**
- A) DELETE PROCEDURE matricular;
- B) DROP TABLE matricular;
- C) DROP PROCEDURE matricular(integer, integer);
- D) REMOVE matricular(3, 2);

**Gabarito:** C

---

## ITEM 38 — Tipos no DROP

- **Capacidade:** C8

**Comando:**  
Por que o DROP FUNCTION valor_pago(integer); informa o tipo do parâmetro?

**Alternativas:**
- A) Porque pode haver rotinas com o mesmo nome e parâmetros diferentes.
- B) Porque o PostgreSQL não aceita nomes de rotina.
- C) Porque o tipo define quem pode apagar.
- D) Porque o tipo apaga também a coluna.

**Gabarito:** A

---

## ITEM 39 — Listar Rotinas

- **Capacidade:** C8

**Comando:**  
Qual comando do psql lista as funções e procedimentos do banco?

**Alternativas:**
- A) \df
- B) \q
- C) \dt
- D) \l

**Gabarito:** A

---

## ITEM 40 — SELECT em Procedimento

- **Capacidade:** C8

**Comando:**  
O que acontece ao executar SELECT matricular(3, 2); sendo matricular um procedimento?

**Alternativas:**
- A) Mostra a lista de matrículas.
- B) Matricula o aluno normalmente.
- C) Cria uma função com o mesmo nome.
- D) Dá erro: procedimento é chamado com CALL.

**Gabarito:** D

---

## ITEM 41 — CALL em Função

- **Capacidade:** C8

**Comando:**  
O que acontece ao executar CALL valor_pago(10); sendo valor_pago uma função?

**Alternativas:**
- A) Devolve o valor pago normalmente.
- B) Apaga a função.
- C) Paga as parcelas da matrícula 10.
- D) Dá erro: função é chamada dentro de um SELECT.

**Gabarito:** D

---

## ITEM 42 — Ponto e Vírgula

- **Capacidade:** C8

**Comando:**  
Um procedimento dá erro de sintaxe perto do END. Qual é uma causa comum?

**Alternativas:**
- A) O parâmetro tem o prefixo p_.
- B) O banco tem mais de 25 alunos.
- C) Faltou o ; depois de END IF ou faltou o $$ do fim.
- D) A tabela não tem chave primária.

**Gabarito:** C

---

## ITEM 43 — NOTICE no Lugar Errado

- **Capacidade:** C8

**Comando:**  
O colega usou RAISE NOTICE 'Turma sem vaga'; em vez de RAISE EXCEPTION. Qual é o efeito?

**Alternativas:**
- A) O procedimento não compila.
- B) A mensagem aparece, mas a matrícula entra mesmo sem vaga.
- C) A turma é apagada.
- D) A matrícula é barrada do mesmo jeito.

**Gabarito:** B

---

## ITEM 44 — Back-end Chama

- **Capacidade:** C8

**Comando:**  
Depois de criado o procedimento matricular, o que o back-end passa a fazer para matricular um aluno?

**Alternativas:**
- A) Copiar o procedimento para o código do site.
- B) Contar os alunos na tela e inserir direto na tabela.
- C) Desligar a chave estrangeira antes de inserir.
- D) Chamar CALL matricular(id_do_aluno, id_da_turma) e mostrar a mensagem de erro se houver.

**Gabarito:** D

---

## ITEM 45 — Mensagem para o Usuário

- **Capacidade:** C8

**Comando:**  
Como o back-end sabe que a turma estava cheia?

**Alternativas:**
- A) O banco envia um e-mail para a secretaria.
- B) O back-end precisa ler o arquivo de log do sistema.
- C) A matrícula aparece com situação "cheia".
- D) Recebe o erro com a mensagem do RAISE EXCEPTION e pode mostrá-la ao usuário.

**Gabarito:** D

---

## ITEM 46 — Segurança

- **Capacidade:** C8

**Comando:**  
Como um procedimento ajuda na segurança do banco (assunto da aula 19)?

**Alternativas:**
- A) O usuário pode receber permissão só para chamar a rotina, sem mexer direto nas tabelas.
- B) Ele impede qualquer consulta ao banco.
- C) Ele troca a senha do administrador.
- D) Ele criptografa todas as tabelas automaticamente.

**Gabarito:** A

---

## ITEM 47 — Função Útil

- **Capacidade:** C8

**Comando:**  
Qual rotina é mais adequada como função (e não procedimento)?

**Alternativas:**
- A) Trancar a matrícula de um aluno.
- B) Calcular e devolver quanto uma matrícula já pagou.
- C) Matricular um aluno numa turma.
- D) Registrar o pagamento de uma parcela.

**Gabarito:** B

---

## ITEM 48 — Parâmetro smallint

- **Capacidade:** C8

**Comando:**  
O procedimento registrar_pagamento recebe p_numero smallint. Por que a chamada usa 2::smallint?

**Alternativas:**
- A) Para converter o número 2 para o tipo smallint do parâmetro.
- B) Para comentar o número da parcela.
- C) Para indicar que a parcela é a segunda mais cara.
- D) Para pagar duas parcelas de uma vez.

**Gabarito:** A

---

## ITEM 49 — Testar os Erros

- **Capacidade:** C8

**Comando:**  
Na entrega da SA 2, por que o script deve ter chamadas de teste dos casos de erro?

**Alternativas:**
- A) Para apagar as rotinas no fim.
- B) Porque o PostgreSQL exige testes para criar procedimentos.
- C) Para mostrar que a rotina barra os casos inválidos, como turma cheia ou inexistente.
- D) Para encher o banco com dados falsos.

**Gabarito:** C

---

## ITEM 50 — Dois Lugares

- **Capacidade:** C8

**Comando:**  
A tela do sistema já avisa que a turma está cheia. Por que manter o procedimento no banco?

**Alternativas:**
- A) Porque o aviso da tela apaga os dados.
- B) Porque o banco não aceita regras na tela.
- C) Não precisa: a tela sozinha garante a regra.
- D) Porque a tela avisa, mas é o banco que garante a regra para qualquer sistema e para acessos simultâneos.

**Gabarito:** D
