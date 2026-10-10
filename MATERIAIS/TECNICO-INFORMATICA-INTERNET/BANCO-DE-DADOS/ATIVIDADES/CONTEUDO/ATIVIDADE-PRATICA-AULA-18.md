# Atividade: Atividade Prática — Aula 18 — 10 Questões Discursivas

- **Aula:** AP-18
- **Rótulo da aula:** Atividade Prática — Aula 18
- **Tema:** Triggers (Disparadores)
- **Ícone:** ⚡
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-18.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 18 (CONTEUDO/AULA-18-TRIGGERS-DISPARADORES.md): conceito de trigger e diferença para o procedimento, evento, momento e nível, função de trigger e CREATE TRIGGER, NEW, OLD e TG_OP, trigger de histórico com WHEN, trigger de validação com RAISE EXCEPTION, efeito do retorno, trigger × restrição × procedimento, listar, desligar e remover, e erros comuns.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-18-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 18

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para automatizar regras do negócio da escola de cursos livres com triggers em PL/pgSQL no banco escola_db (tabelas curso, turma, aluno, matricula e parcela das aulas 12 a 17).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o trecho pedido; **(2)** o código aplicado à situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: código que funciona no PostgreSQL e faz o que a regra pede, e justificativa com as palavras-chave do conteúdo. Códigos equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 18 | Questões |
|---|---|
| Conceito de trigger; trigger × procedimento | 01 |
| Evento, momento e nível | 02 |
| Função de trigger, CREATE TRIGGER, NEW, OLD e TG_OP | 03 |
| Trigger de histórico (tabela, função e trigger) | 04, 05 |
| WHEN e IS DISTINCT FROM | 05 |
| Trigger de validação com RAISE EXCEPTION | 06 |
| Efeito do retorno (RETURN NEW, OLD e NULL) e ajuste da linha | 07 |
| Trigger × restrição × procedimento | 08 |
| Listar, desligar e remover | 09 |
| Erros comuns | 10 |

---

## ITEM 01 — Trigger ou Procedimento

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, ouve do coordenador: "já temos o procedimento matricular da aula passada; para que serve um trigger?".

**Comando:**
Explique o papel do trigger.

**Tópicos:**
- a) Diga o que é um trigger. (0,2)
- b) Explique a diferença entre um trigger e um procedimento quanto a quem executa cada um. (0,4)
- c) Explique por que o trigger protege a regra mesmo quando alguém altera a tabela direto pelo pgAdmin. (0,4)

---

## ITEM 02 — Evento, Momento e Nível

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa explicar à equipe as três escolhas de um trigger antes de criar o primeiro da escola.

**Comando:**
Descreva as escolhas de um trigger.

**Tópicos:**
- a) Cite os três eventos que podem disparar um trigger de linha. (0,2)
- b) Explique a diferença entre BEFORE e AFTER, com um uso de cada. (0,4)
- c) Um UPDATE muda 30 parcelas: diga quantas vezes disparam um trigger FOR EACH ROW e um FOR EACH STATEMENT e explique. (0,4)

---

## ITEM 03 — As Duas Peças

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, revisa o primeiro trigger de um colega, que escreveu tudo num único comando, sem função.

**Comando:**
Explique como o trigger é montado no PostgreSQL.

**Tópicos:**
- a) Diga quais são as duas peças de um trigger no PostgreSQL. (0,2)
- b) Escreva o cabeçalho da função de trigger (nome, tipo de retorno e linguagem) e a linha do CREATE TRIGGER que a executa. (0,4)
- c) Explique o que guardam NEW, OLD e TG_OP e em quais eventos NEW e OLD existem. (0,4)

---

## ITEM 04 — Tabela de Histórico

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe a reclamação de um aluno cuja nota final "caiu" de 8,0 para 6,0 sem ninguém saber quem mudou. A secretaria quer guardar toda alteração de nota.

**Comando:**
Prepare a estrutura do histórico.

**Tópicos:**
- a) Escreva o comando que acrescenta a coluna nota_final (de 0 a 10, com duas casas) à tabela matricula. (0,2)
- b) Escreva o CREATE TABLE historico_nota com matrícula, nota anterior, nota nova, usuário e data e hora preenchidos automaticamente. (0,4)
- c) Explique por que as colunas de usuário e de data usam DEFAULT current_user e now(). (0,4)

---

## ITEM 05 — Trigger de Histórico

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, com a tabela historico_nota pronta, precisa gravar uma linha a cada mudança real da nota final.

**Comando:**
Crie a função e o trigger de histórico.

**Tópicos:**
- a) Diga qual momento (BEFORE ou AFTER) usar e por quê. (0,2)
- b) Escreva a função registrar_historico_nota que insere a matrícula, a nota antiga e a nova. (0,4)
- c) Escreva o CREATE TRIGGER com UPDATE OF nota_final e um WHEN que só grava quando a nota mudou, e explique o uso de IS DISTINCT FROM. (0,4)

---

## ITEM 06 — Parcela Paga Não Muda

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, ouve da secretaria: "depois de paga, a parcela não pode ter o valor nem o vencimento alterados".

**Comando:**
Crie o trigger de validação.

**Tópicos:**
- a) Diga qual momento e qual evento o trigger deve usar. (0,2)
- b) Escreva a função que barra a mudança de valor ou de vencimento de parcela já paga, com RAISE EXCEPTION. (0,4)
- c) Escreva o CREATE TRIGGER e explique o que acontece com o UPDATE quando a função chega ao RAISE EXCEPTION. (0,4)

---

## ITEM 07 — O Que a Função Devolve

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe dois pedidos: o e-mail do aluno deve ser gravado sempre em minúsculas, e um colega não entende por que o UPDATE dele diz "UPDATE 0" depois que criou um trigger BEFORE.

**Comando:**
Explique o efeito do retorno num trigger BEFORE ... FOR EACH ROW.

**Tópicos:**
- a) Diga o que acontece quando a função devolve NEW. (0,2)
- b) Escreva a função e o trigger BEFORE INSERT OR UPDATE em aluno que gravam o e-mail em minúsculas. (0,4)
- c) Explique o "UPDATE 0" do colega e diga o que a função deve devolver num trigger de DELETE para a exclusão seguir. (0,4)

---

## ITEM 08 — Onde a Regra Mora

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe três regras: (1) o valor da parcela é maior que zero; (2) toda mudança de situação da matrícula fica registrada; (3) matricular o aluno só se a turma tiver vaga.

**Comando:**
Escolha a ferramenta de cada regra.

**Tópicos:**
- a) Diga qual ferramenta usar na regra 1 e por quê. (0,2)
- b) Diga qual ferramenta usar nas regras 2 e 3 e justifique cada uma. (0,4)
- c) Explique o risco de usar trigger demais no banco e o que fazer para diminuí-lo. (0,4)

---

## ITEM 09 — Manutenção dos Triggers

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa corrigir parcelas cadastradas com valor errado numa importação e depois remover um trigger antigo de teste.

**Comando:**
Mostre como cuidar dos triggers.

**Tópicos:**
- a) Diga como ver os triggers da tabela parcela no psql. (0,2)
- b) Escreva os comandos que desligam e religam o trigger trg_proteger_parcela_paga e explique o cuidado ao usá-los. (0,4)
- c) Escreva o comando que remove o trigger trg_historico_nota e explique o que acontece com a função dele. (0,4)

---

## ITEM 10 — Erros Comuns

- **Aula:** 18 · Triggers
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, revisa três trechos de um estagiário: (1) uma função de trigger criada com RETURNS void; (2) um trigger AFTER UPDATE em matricula cuja função faz UPDATE matricula SET nota_final = round(NEW.nota_final, 1); (3) um trigger de histórico sem WHEN e sem UPDATE OF.

**Comando:**
Aponte e corrija os erros.

**Tópicos:**
- a) Explique o erro do trecho 1 e corrija. (0,2)
- b) Explique o problema do trecho 2 e corrija. (0,4)
- c) Explique o problema do trecho 3 e corrija. (0,4)
