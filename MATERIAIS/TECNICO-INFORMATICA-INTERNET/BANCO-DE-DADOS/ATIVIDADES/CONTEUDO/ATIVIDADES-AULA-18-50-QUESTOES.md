# Atividade: Triggers (Disparadores) — 50 Questões

- **Aula:** 18
- **Tema:** Triggers (Disparadores)
- **Ícone:** ⚡
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar linguagem de manipulação de dados em triggers: conceito e diferença para o procedimento, evento, momento (BEFORE e AFTER) e nível (FOR EACH ROW e FOR EACH STATEMENT), função de trigger (RETURNS trigger) e CREATE TRIGGER, NEW, OLD, TG_OP e TG_TABLE_NAME, trigger de histórico com WHEN e IS DISTINCT FROM, trigger de validação com RAISE EXCEPTION, efeito do retorno, trigger × restrição × procedimento, listar, desligar e remover, e erros comuns.
- **Conteúdo-base:** ../CONTEUDO/AULA-18-TRIGGERS-DISPARADORES.md
- **Slides:** ../AULAS/AULA-18-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-18-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O que É

- **Capacidade:** C8

**Comando:**
O que é um trigger (disparador) no banco de dados?

**Alternativas:**
- A) Uma rotina que o banco executa sozinho quando acontece um evento numa tabela.
- B) Uma cópia de segurança automática da tabela.
- C) Um índice que acelera as consultas.
- D) Um usuário especial do PostgreSQL.

**Gabarito:** A

---

## ITEM 02 — Quem Executa

- **Capacidade:** C8

**Comando:**
Quem executa um trigger?

**Alternativas:**
- A) O navegador do usuário.
- B) O próprio banco, quando o evento acontece.
- C) O aluno, clicando num botão do pgAdmin.
- D) O back-end, com o comando CALL.

**Gabarito:** B

---

## ITEM 03 — Trigger × Procedimento

- **Capacidade:** C8

**Comando:**
Qual é a principal diferença entre um trigger e um procedimento da aula 17?

**Alternativas:**
- A) O trigger é chamado com SELECT e o procedimento com CALL.
- B) O procedimento é chamado pelo sistema (CALL); o trigger dispara sozinho com o evento na tabela.
- C) O trigger só funciona no MySQL.
- D) O procedimento não pode ter parâmetros.

**Gabarito:** B

---

## ITEM 04 — Vale para Todos

- **Capacidade:** C8

**Comando:**
Por que o trigger protege a regra mesmo quando alguém altera a tabela direto pelo pgAdmin?

**Alternativas:**
- A) Porque o trigger bloqueia o pgAdmin.
- B) Porque o pgAdmin chama os procedimentos sozinho.
- C) Porque dispara para qualquer comando na tabela, venha de onde vier.
- D) Porque o pgAdmin não consegue alterar tabelas.

**Gabarito:** C

---

## ITEM 05 — Eventos

- **Capacidade:** C8

**Comando:**
Quais comandos podem ser o evento de um trigger de linha numa tabela?

**Alternativas:**
- A) INSERT, UPDATE e DELETE.
- B) Somente SELECT.
- C) SELECT, CREATE e DROP.
- D) GRANT e REVOKE.

**Gabarito:** A

---

## ITEM 06 — UPDATE OF

- **Capacidade:** C8

**Comando:**
O que significa AFTER UPDATE OF nota_final ON matricula?

**Alternativas:**
- A) O trigger dispara depois de um UPDATE que mexe na coluna nota_final.
- B) O trigger dispara em qualquer UPDATE do banco.
- C) O trigger apaga a coluna nota_final.
- D) O trigger dispara antes de cada SELECT na nota_final.

**Gabarito:** A

---

## ITEM 07 — Momento BEFORE

- **Capacidade:** C8

**Comando:**
O que um trigger BEFORE pode fazer que um AFTER não pode?

**Alternativas:**
- A) Ler a linha nova.
- B) Mudar ou barrar a linha antes de ela ser gravada.
- C) Gravar em outra tabela.
- D) Usar RAISE NOTICE.

**Gabarito:** B

---

## ITEM 08 — Momento AFTER

- **Capacidade:** C8

**Comando:**
Para gravar o histórico de uma alteração já feita, qual momento é o mais indicado?

**Alternativas:**
- A) Nenhum: histórico só é feito no back-end.
- B) BEFORE, porque a linha ainda não existe.
- C) INSTEAD OF, porque substitui a tabela.
- D) AFTER, porque a linha já foi gravada.

**Gabarito:** D

---

## ITEM 09 — FOR EACH ROW

- **Capacidade:** C8

**Comando:**
Um UPDATE muda 30 linhas. Quantas vezes dispara um trigger FOR EACH ROW?

**Alternativas:**
- A) Uma vez só.
- B) Duas vezes, antes e depois.
- C) Nenhuma vez.
- D) 30 vezes, uma por linha afetada.

**Gabarito:** D

---

## ITEM 10 — FOR EACH STATEMENT

- **Capacidade:** C8

**Comando:**
O mesmo UPDATE de 30 linhas dispara quantas vezes um trigger FOR EACH STATEMENT?

**Alternativas:**
- A) Nenhuma vez, pois só dispara em INSERT.
- B) Uma vez, por comando.
- C) 60 vezes.
- D) 30 vezes.

**Gabarito:** B

---

## ITEM 11 — Duas Peças

- **Capacidade:** C8

**Comando:**
No PostgreSQL, quais são as duas peças de um trigger?

**Alternativas:**
- A) Uma tabela e uma visão.
- B) Uma função de trigger e o comando CREATE TRIGGER que a liga à tabela.
- C) Um procedimento e um CALL.
- D) Um índice e uma chave estrangeira.

**Gabarito:** B

---

## ITEM 12 — Tipo de Retorno

- **Capacidade:** C8

**Comando:**
Qual tipo de retorno a função de trigger deve declarar?

**Alternativas:**
- A) RETURNS void.
- B) RETURNS integer.
- C) RETURNS table.
- D) RETURNS trigger.

**Gabarito:** D

---

## ITEM 13 — Parâmetros

- **Capacidade:** C8

**Comando:**
Quantos parâmetros declarados uma função de trigger pode ter?

**Alternativas:**
- A) Dois, NEW e OLD.
- B) Nenhum: ela não recebe parâmetros declarados.
- C) Quantos o programador quiser.
- D) Exatamente um, a linha nova.

**Gabarito:** B

---

## ITEM 14 — Ligar a Função

- **Capacidade:** C8

**Comando:**
Qual trecho liga a função ao trigger no CREATE TRIGGER?

**Alternativas:**
- A) RETURN registrar_historico_nota;
- B) CALL registrar_historico_nota();
- C) SELECT registrar_historico_nota();
- D) EXECUTE FUNCTION registrar_historico_nota();

**Gabarito:** D

---

## ITEM 15 — Variável NEW

- **Capacidade:** C8

**Comando:**
O que guarda a variável NEW dentro da função de trigger?

**Alternativas:**
- A) O nome da tabela.
- B) O usuário que está logado.
- C) A linha antiga, como estava.
- D) A linha nova, como vai ficar.

**Gabarito:** D

---

## ITEM 16 — Variável OLD

- **Capacidade:** C8

**Comando:**
O que guarda a variável OLD dentro da função de trigger?

**Alternativas:**
- A) A linha nova.
- B) O total de linhas da tabela.
- C) A linha antiga, como estava antes do comando.
- D) A data de criação da tabela.

**Gabarito:** C

---

## ITEM 17 — NEW no DELETE

- **Capacidade:** C8

**Comando:**
Num trigger de DELETE, o que vale NEW?

**Alternativas:**
- A) Vem vazio (NULL), porque não existe linha nova.
- B) O mesmo que TG_OP.
- C) A linha que foi apagada.
- D) A próxima linha da tabela.

**Gabarito:** A

---

## ITEM 18 — OLD no INSERT

- **Capacidade:** C8

**Comando:**
Num trigger de INSERT, o que vale OLD?

**Alternativas:**
- A) O valor DEFAULT da coluna.
- B) A linha inserida.
- C) A última linha da tabela.
- D) Vem vazio (NULL), porque não existia linha antes.

**Gabarito:** D

---

## ITEM 19 — TG_OP

- **Capacidade:** C8

**Comando:**
O que a variável TG_OP informa?

**Alternativas:**
- A) A operação que disparou: 'INSERT', 'UPDATE' ou 'DELETE'.
- B) O usuário do banco.
- C) A hora do disparo.
- D) O número de linhas afetadas.

**Gabarito:** A

---

## ITEM 20 — TG_TABLE_NAME

- **Capacidade:** C8

**Comando:**
O que a variável TG_TABLE_NAME guarda?

**Alternativas:**
- A) O nome da tabela que disparou o trigger.
- B) O nome do banco.
- C) O nome da coluna alterada.
- D) O nome da função.

**Gabarito:** A

---

## ITEM 21 — Tabela de Histórico

- **Capacidade:** C8

**Comando:**
Na tabela historico_nota, por que as colunas alterado_por e alterado_em usam DEFAULT current_user e now()?

**Alternativas:**
- A) Para apagar o histórico antigo.
- B) Para trocar o usuário do banco.
- C) Para impedir alterações na nota.
- D) Para gravar automaticamente quem alterou e quando.

**Gabarito:** D

---

## ITEM 22 — Valores Gravados

- **Capacidade:** C8

**Comando:**
No histórico de nota, de onde vêm nota_anterior e nota_nova?

**Alternativas:**
- A) De NEW.nota_final e de NEW.nota_final de novo.
- B) De TG_OP e TG_TABLE_NAME.
- C) De OLD.nota_final e NEW.nota_final.
- D) Do back-end, que manda os dois valores.

**Gabarito:** C

---

## ITEM 23 — Retorno no AFTER

- **Capacidade:** C8

**Comando:**
O que acontece com o valor devolvido pela função num trigger AFTER ... FOR EACH ROW?

**Alternativas:**
- A) Apaga a linha gravada.
- B) É gravado na tabela de histórico.
- C) É ignorado, mas a função ainda precisa devolver algo (ex.: RETURN NEW).
- D) Substitui a linha gravada.

**Gabarito:** C

---

## ITEM 24 — Cláusula WHEN

- **Capacidade:** C8

**Comando:**
Para que serve WHEN (OLD.nota_final IS DISTINCT FROM NEW.nota_final)?

**Alternativas:**
- A) Para gravar o histórico só quando a nota realmente mudou.
- B) Para barrar qualquer alteração de nota.
- C) Para gravar o histórico só quando a nota é nula.
- D) Para disparar o trigger em todo SELECT.

**Gabarito:** A

---

## ITEM 25 — IS DISTINCT FROM

- **Capacidade:** C8

**Comando:**
Por que usar IS DISTINCT FROM em vez de <> para comparar a nota antiga com a nova?

**Alternativas:**
- A) Porque <> só compara textos.
- B) Porque <> não existe no PostgreSQL.
- C) Porque IS DISTINCT FROM é mais curto.
- D) Porque trata corretamente o NULL: de NULL para 8,5 conta como mudança.

**Gabarito:** D

---

## ITEM 26 — Mesmo Valor

- **Capacidade:** C8

**Comando:**
Com o trigger de histórico usando WHEN, um UPDATE que grava a mesma nota 8,5 que já estava salva faz o quê?

**Alternativas:**
- A) Grava duas linhas no histórico.
- B) Dá erro e desfaz o UPDATE.
- C) Apaga o histórico anterior.
- D) Não grava linha no histórico.

**Gabarito:** D

---

## ITEM 27 — Base da Auditoria

- **Capacidade:** C8

**Comando:**
Registrar quem mudou o quê e quando prepara qual assunto da aula 19?

**Alternativas:**
- A) A instalação do SGBD.
- B) A auditoria dos dados.
- C) O diagrama entidade-relacionamento.
- D) A normalização.

**Gabarito:** B

---

## ITEM 28 — Validação BEFORE

- **Capacidade:** C8

**Comando:**
Para barrar a alteração do valor de uma parcela já paga, qual trigger usar?

**Alternativas:**
- A) Um trigger sem função.
- B) BEFORE SELECT ... FOR EACH ROW.
- C) AFTER INSERT ... FOR EACH STATEMENT.
- D) BEFORE UPDATE ... FOR EACH ROW, com RAISE EXCEPTION.

**Gabarito:** D

---

## ITEM 29 — RAISE EXCEPTION

- **Capacidade:** C8

**Comando:**
No trigger de validação, o que acontece quando a função chega a um RAISE EXCEPTION?

**Alternativas:**
- A) O comando inteiro para e é desfeito, com a mensagem de erro.
- B) O trigger é apagado.
- C) A linha é gravada e aparece um aviso.
- D) Só a próxima linha é barrada.

**Gabarito:** A

---

## ITEM 30 — RETURN NEW no BEFORE

- **Capacidade:** C8

**Comando:**
Num trigger BEFORE UPDATE, o que faz RETURN NEW?

**Alternativas:**
- A) Grava a linha antiga.
- B) Deixa a alteração seguir com a linha nova (que pode ter sido ajustada).
- C) Apaga a linha.
- D) Cancela a alteração.

**Gabarito:** B

---

## ITEM 31 — RETURN NULL no BEFORE

- **Capacidade:** C8

**Comando:**
Num trigger BEFORE ... FOR EACH ROW, o que acontece se a função devolver NULL?

**Alternativas:**
- A) A linha é gravada com todos os campos nulos.
- B) A linha é pulada em silêncio: nada é gravado e não aparece erro.
- C) Aparece um erro de chave estrangeira.
- D) O banco reinicia.

**Gabarito:** B

---

## ITEM 32 — RETURN OLD no DELETE

- **Capacidade:** C8

**Comando:**
Num trigger BEFORE DELETE, o que se devolve para a exclusão seguir?

**Alternativas:**
- A) RETURN OLD.
- B) RETURN NEW.
- C) RETURN TG_OP.
- D) RETURN NULL.

**Gabarito:** A

---

## ITEM 33 — Ajustar a Linha

- **Capacidade:** C8

**Comando:**
Qual trecho, num trigger BEFORE INSERT em aluno, grava o e-mail sempre em minúsculas?

**Alternativas:**
- A) OLD.email := lower(OLD.email); RETURN OLD;
- B) UPDATE aluno SET email = lower(email);
- C) NEW.email := lower(NEW.email); RETURN NEW;
- D) RETURN NULL;

**Gabarito:** C

---

## ITEM 34 — Evento Duplo

- **Capacidade:** C8

**Comando:**
O que significa BEFORE UPDATE OR DELETE ON parcela?

**Alternativas:**
- A) Apaga as parcelas atualizadas.
- B) Dispara só quando os dois comandos vêm juntos.
- C) O mesmo trigger dispara antes de UPDATE e antes de DELETE na tabela parcela.
- D) Dispara depois de qualquer comando no banco.

**Gabarito:** C

---

## ITEM 35 — Restrição Primeiro

- **Capacidade:** C8

**Comando:**
A regra "valor da parcela maior que zero" olha só a própria linha. Qual é a primeira escolha?

**Alternativas:**
- A) Uma tabela de histórico.
- B) Um procedimento chamado pelo back-end.
- C) Uma restrição CHECK (valor > 0).
- D) Um trigger AFTER DELETE.

**Gabarito:** C

---

## ITEM 36 — Quando é Trigger

- **Capacidade:** C8

**Comando:**
Em qual situação o trigger é a melhor escolha?

**Alternativas:**
- A) Quando é a cor do botão na tela.
- B) Quando é a ação de matricular pedida pelo sistema.
- C) Quando a regra só olha um campo da linha, como valor > 0.
- D) Quando a regra compara antes e depois (OLD × NEW) ou grava em outra tabela.

**Gabarito:** D

---

## ITEM 37 — Quando é Procedimento

- **Capacidade:** C8

**Comando:**
Para a ação "matricular aluno só se houver vaga", pedida pelo sistema, o que se usa?

**Alternativas:**
- A) Um índice.
- B) Uma restrição UNIQUE.
- C) Um procedimento chamado com CALL.
- D) Um trigger AFTER DELETE.

**Gabarito:** C

---

## ITEM 38 — Banco Mágico

- **Capacidade:** C8

**Comando:**
Por que trigger demais pode atrapalhar a equipe?

**Alternativas:**
- A) Porque triggers apagam as tabelas.
- B) Porque quem lê o comando não vê o que mais acontece; por isso cada trigger deve ser documentado.
- C) Porque o PostgreSQL aceita só um trigger.
- D) Porque triggers impedem consultas.

**Gabarito:** B

---

## ITEM 39 — Listar no psql

- **Capacidade:** C8

**Comando:**
Como ver os triggers da tabela matricula no psql?

**Alternativas:**
- A) \dt triggers
- B) \d matricula (eles aparecem no fim).
- C) \l matricula
- D) SELECT * FROM matricula;

**Gabarito:** B

---

## ITEM 40 — Desligar

- **Capacidade:** C8

**Comando:**
Qual comando desliga um trigger sem apagá-lo?

**Alternativas:**
- A) ALTER TABLE parcela DISABLE TRIGGER trg_proteger_parcela_paga;
- B) STOP TRIGGER trg_proteger_parcela_paga;
- C) DROP TABLE parcela;
- D) DELETE TRIGGER trg_proteger_parcela_paga;

**Gabarito:** A

---

## ITEM 41 — Remover

- **Capacidade:** C8

**Comando:**
Qual comando remove o trigger de histórico?

**Alternativas:**
- A) DELETE FROM trg_historico_nota;
- B) DROP TRIGGER trg_historico_nota;
- C) DROP TRIGGER trg_historico_nota ON matricula;
- D) DROP TABLE trg_historico_nota;

**Gabarito:** C

---

## ITEM 42 — Função Continua

- **Capacidade:** C8

**Comando:**
Depois de DROP TRIGGER trg_historico_nota ON matricula, o que acontece com a função registrar_historico_nota?

**Alternativas:**
- A) É apagada junto, sempre.
- B) Passa a disparar em todas as tabelas.
- C) Continua existindo; é removida com DROP FUNCTION.
- D) Vira um procedimento.

**Gabarito:** C

---

## ITEM 43 — CREATE OR REPLACE TRIGGER

- **Capacidade:** C8

**Comando:**
O que faz CREATE OR REPLACE TRIGGER (PostgreSQL 14 ou mais novo)?

**Alternativas:**
- A) Desliga o trigger.
- B) Apaga todas as funções.
- C) Cria uma cópia da tabela.
- D) Troca a definição do trigger sem precisar apagá-lo antes.

**Gabarito:** D

---

## ITEM 44 — Erro: RETURNS void

- **Capacidade:** C8

**Comando:**
Um colega criou a função de trigger com RETURNS void. O que acontece?

**Alternativas:**
- A) O trigger dispara duas vezes.
- B) Dá erro ao criar o trigger: a função deve ser RETURNS trigger.
- C) Funciona normalmente.
- D) A tabela é apagada.

**Gabarito:** B

---

## ITEM 45 — Erro: sem RETURN NEW

- **Capacidade:** C8

**Comando:**
Um trigger BEFORE UPDATE devolve NULL por engano. O que o colega vê?

**Alternativas:**
- A) O UPDATE diz "UPDATE 0" e a linha não muda, sem mensagem de erro.
- B) A tabela fica vazia.
- C) Um erro de sintaxe.
- D) A linha muda normalmente.

**Gabarito:** A

---

## ITEM 46 — Erro: Laço

- **Capacidade:** C8

**Comando:**
Um trigger AFTER UPDATE em matricula faz UPDATE matricula dentro da função. O que pode acontecer?

**Alternativas:**
- A) Ele dispara de novo, em laço, até dar erro de profundidade.
- B) Nada: triggers nunca disparam outros.
- C) O banco grava só a primeira vez e para sozinho sem erro.
- D) A tabela é duplicada.

**Gabarito:** A

---

## ITEM 47 — Corrigir o Laço

- **Capacidade:** C8

**Comando:**
Como mudar um campo da própria linha sem provocar laço?

**Alternativas:**
- A) Usar um trigger AFTER com outro UPDATE.
- B) Usar FOR EACH STATEMENT com DELETE.
- C) Usar um trigger BEFORE e alterar NEW antes de gravar.
- D) Usar DROP TABLE.

**Gabarito:** C

---

## ITEM 48 — Erro: Sem WHEN

- **Capacidade:** C8

**Comando:**
O trigger de histórico foi criado sem WHEN e sem UPDATE OF. Qual é o problema?

**Alternativas:**
- A) Impede qualquer UPDATE em matricula.
- B) Apaga as notas.
- C) Grava linha no histórico mesmo quando a nota não mudou.
- D) Não grava nada nunca.

**Gabarito:** C

---

## ITEM 49 — Caso da Escola

- **Capacidade:** C8

**Comando:**
A nota de um aluno "caiu" de 8,0 para 6,0 e ninguém sabe quem mudou. O que resolve daqui em diante?

**Alternativas:**
- A) Um índice na coluna nota_final.
- B) Tabela historico_nota com trigger que grava nota antiga, nova, usuário e data.
- C) Pedir que os professores anotem num caderno.
- D) Apagar a coluna nota_final.

**Gabarito:** B

---

## ITEM 50 — Testes da SA 2

- **Capacidade:** C8

**Comando:**
Na entrega da SA 2, quais testes o script 06-triggers.sql deve trazer?

**Alternativas:**
- A) Alteração que grava histórico, alteração sem mudança (não grava) e tentativa barrada na parcela paga.
- B) Só a criação das tabelas, sem testes.
- C) Apenas um SELECT * de cada tabela.
- D) A exclusão de todos os triggers.

**Gabarito:** A
