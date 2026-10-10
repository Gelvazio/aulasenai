# Atividade: Atividade Prática — Aula 17 — 10 Questões Discursivas

- **Aula:** AP-17
- **Rótulo da aula:** Atividade Prática — Aula 17
- **Tema:** Procedimentos Armazenados
- **Ícone:** ⚙️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-17.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 17 (CONTEUDO/AULA-17-PROCEDIMENTOS-ARMAZENADOS.md): conceito e vantagens dos procedimentos armazenados, função × procedimento, PL/pgSQL (parâmetros, DECLARE, SELECT INTO, IF, RETURN, FOUND), RAISE EXCEPTION e RAISE NOTICE, trava com FOR UPDATE, CREATE OR REPLACE, DROP e erros comuns.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-17-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 17

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para automatizar regras do negócio da escola de cursos livres com funções e procedimentos em PL/pgSQL no banco escola_db (tabelas curso, turma, aluno, matricula e parcela das aulas 12 a 16).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou o trecho pedido; **(2)** o código aplicado à situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: código que funciona no PostgreSQL e faz o que a regra pede, e justificativa com as palavras-chave do conteúdo. Códigos equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 17 | Questões |
|---|---|
| Conceito e vantagens; regra no banco × back-end | 01 |
| Função × procedimento; CALL e SELECT | 02 |
| Estrutura PL/pgSQL, DECLARE, SELECT INTO e RETURN | 03 |
| Procedimento com regra do negócio (vaga) | 04, 05 |
| RAISE EXCEPTION × RAISE NOTICE | 06 |
| FOUND e procedimento que atualiza | 07 |
| CREATE OR REPLACE, \df e DROP | 08 |
| Função de apoio e testes | 09 |
| Erros comuns | 10 |

---

## ITEM 01 — Regra no Banco

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, ouve da diretora: "a regra de até 25 alunos por turma já está na tela do sistema; por que colocar no banco também?".

**Comando:**
Explique o papel do procedimento armazenado.

**Tópicos:**
- a) Diga o que é um procedimento armazenado. (0,2)
- b) Cite duas vantagens de deixar essa regra num procedimento do banco. (0,4)
- c) Dê um exemplo de regra que deve ficar no back-end, e não no banco, e justifique. (0,4)

---

## ITEM 02 — Função ou Procedimento

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa criar duas rotinas: uma que calcula quanto uma matrícula já pagou e outra que registra a matrícula de um aluno numa turma.

**Comando:**
Escolha o tipo de rotina de cada uma.

**Tópicos:**
- a) Explique a diferença entre função e procedimento no PostgreSQL. (0,2)
- b) Indique o tipo de cada rotina e escreva a linha de chamada de cada uma. (0,4)
- c) Explique o que acontece se o colega chamar o procedimento com SELECT. (0,4)

---

## ITEM 03 — Função valor_pago

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe o pedido: "quero saber quanto cada matrícula já pagou, somando só as parcelas com data de pagamento".

**Comando:**
Escreva a função.

**Tópicos:**
- a) Explique para que servem DECLARE e SELECT ... INTO. (0,2)
- b) Escreva a função valor_pago(p_matricula integer) que devolve o total pago. (0,4)
- c) Explique por que usar coalesce na soma e escreva a chamada da função para a matrícula 10. (0,4)

---

## ITEM 04 — Procedimento matricular

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe a regra: "o aluno só é matriculado se a turma tiver menos de 25 matrículas ativas; se não, o sistema mostra a mensagem de turma sem vaga".

**Comando:**
Escreva o procedimento.

**Tópicos:**
- a) Diga por que o procedimento conta só as matrículas ativas. (0,2)
- b) Escreva o procedimento matricular(p_aluno integer, p_turma integer) com a regra de vaga. (0,4)
- c) Explique o que acontece com o INSERT quando a turma está cheia. (0,4)

---

## ITEM 05 — Matrículas ao Mesmo Tempo

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, descobre que, no dia de abertura das matrículas, duas atendentes matricularam ao mesmo tempo o 25º aluno de uma turma e ela ficou com 26.

**Comando:**
Corrija o procedimento.

**Tópicos:**
- a) Explique por que duas chamadas ao mesmo tempo podem passar do limite. (0,2)
- b) Escreva o comando que trava a turma no início do procedimento e o teste de turma inexistente. (0,4)
- c) Explique como a trava resolve o problema das duas atendentes. (0,4)

---

## ITEM 06 — EXCEPTION ou NOTICE

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, revisa o procedimento de um colega: quando a turma está cheia, ele escreveu RAISE NOTICE 'Turma sem vaga'; e a turma continuou recebendo alunos.

**Comando:**
Analise e corrija.

**Tópicos:**
- a) Explique a diferença entre RAISE NOTICE e RAISE EXCEPTION. (0,2)
- b) Escreva a linha correta, com o número da turma e a quantidade de alunos na mensagem. (0,4)
- c) Explique como o back-end fica sabendo que a turma estava cheia. (0,4)

---

## ITEM 07 — Registrar Pagamento

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe a regra: "registrar o pagamento de uma parcela com a data de hoje; parcela inexistente ou já paga deve dar erro".

**Comando:**
Escreva o procedimento.

**Tópicos:**
- a) Explique quando a variável FOUND fica verdadeira. (0,2)
- b) Escreva o procedimento registrar_pagamento(p_matricula integer, p_numero smallint). (0,4)
- c) Explique por que o UPDATE filtra data_pagamento IS NULL e escreva a chamada para a parcela 2 da matrícula 10. (0,4)

---

## ITEM 08 — Alterar e Remover

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa mudar o limite de vagas do procedimento matricular de 25 para 30 e, depois, remover uma função antiga chamada total_alunos(integer).

**Comando:**
Escreva os comandos.

**Tópicos:**
- a) Diga qual comando do psql lista as funções e procedimentos do banco. (0,2)
- b) Explique como trocar o corpo do procedimento sem apagá-lo antes. (0,4)
- c) Escreva o comando que remove total_alunos e explique por que ele informa o tipo do parâmetro. (0,4)

---

## ITEM 09 — Função de Apoio e Testes

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, quer uma função que devolva quantos alunos ativos uma turma tem, para usar no painel da secretaria, e precisa entregar o script da SA 2 com testes.

**Comando:**
Escreva a função e planeje os testes.

**Tópicos:**
- a) Diga o tipo de retorno adequado para a função. (0,2)
- b) Escreva a função alunos_ativos(p_turma integer). (0,4)
- c) Liste as chamadas de teste que o script deve ter para o procedimento matricular e justifique. (0,4)

---

## ITEM 10 — Erros Comuns

- **Aula:** 17 · Procedimentos
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, revisa três trechos de um estagiário: (1) dentro da função, SELECT count(*) FROM matricula WHERE id_turma = p_turma; sem INTO; (2) um procedimento com parâmetro chamado id_turma e o filtro WHERE id_turma = id_turma; (3) CALL valor_pago(10);

**Comando:**
Aponte e corrija os erros.

**Tópicos:**
- a) Explique o erro do trecho 1 e corrija. (0,2)
- b) Explique o problema do trecho 2 e corrija. (0,4)
- c) Explique o erro do trecho 3 e escreva a chamada correta. (0,4)
