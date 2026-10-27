# Atividade: Atividade Prática — Aula 02 — 10 Questões Discursivas

- **Aula:** AP-02
- **Rótulo da aula:** Atividade Prática — Aula 02
- **Tema:** Funções Lógicas
- **Ícone:** 🔀
- **Duração:** 90–120 minutos
- **Formato:** Discursiva prática (analisar situações da fábrica e responder por escrito em cada tópico)
- **Total de questões:** 10
- **Pontuação:** 1 ponto por questão, dividido entre os tópicos (total: 10 pontos)
- **Capacidade avaliada:** Aplicar as funções AND, NAND, OR, NOR, EX-OR e NÃO EX-OR na análise e na escrita das condições de comando e de segurança de máquinas industriais.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois (com apoio de IA e revisão do professor).
- **Folha de respostas:** sim
- **Aula no banco:** 2

**Empresa fictícia de todas as questões:** Metalúrgica Alfa — estamparia de peças metálicas com prensas, esteiras e cabines de pintura. Você é o(a) operador(a) de produção do setor de estamparia.

**Produto da aula:** ao longo das questões você monta o "caderno de lógica do setor", com as tabelas-verdade e expressões das condições das máquinas.

**Como responder:** Cada questão tem um ou mais **tópicos**. Escreva a resposta de **cada tópico no seu campo**, com frases completas e com as suas palavras. Quando o comando pedir um cálculo, mostre a conta. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

---

## ITEM 01 — Prensa com comando bimanual

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
A prensa só pode descer quando o operador pressiona os dois botões, B1 e B2, ao mesmo tempo.

**Comando:**
Analise a lógica do comando.

**Tópicos:**
- a) Monte a tabela-verdade completa (B1, B2 e a saída DESCER). (0,6)
- b) Diga qual função lógica é essa e por que ela protege o operador. (0,4)

---

## ITEM 02 — O acidente que quase aconteceu

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
A prensa desceu com apenas B1 pressionado. A manutenção descobriu que os botões tinham sido ligados em paralelo.

**Comando:**
Explique o que aconteceu.

**Tópicos:**
- a) Qual função lógica estava aplicada por engano? Monte sua tabela-verdade. (0,6)
- b) Por que o operador não deve "aceitar" essa situação para ganhar tempo? (0,4)

---

## ITEM 03 — Porta de proteção

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
Além dos dois botões, a prensa só pode descer com a porta de proteção fechada (P = 1).

**Comando:**
Escreva a nova condição.

**Tópicos:**
- a) Escreva a expressão lógica da saída DESCER. (0,5)
- b) Calcule DESCER para B1 = 1, B2 = 1 e P = 0 e explique o resultado. (0,5)

---

## ITEM 04 — Emergências da esteira

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
A esteira de peças tem três botões de emergência (E1, E2 e E3) ao longo da linha. Qualquer um deve gerar o sinal PARAR.

**Comando:**
Analise o sinal de parada.

**Tópicos:**
- a) Qual função lógica gera PARAR? Escreva a expressão. (0,5)
- b) Quantas combinações tem a tabela-verdade com 3 entradas e em quantas PARAR vale 0? (0,5)

---

## ITEM 05 — Lâmpada de linha liberada

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
A lâmpada verde "linha liberada" deve acender somente quando nenhum alarme (A1 = temperatura, A2 = pressão) estiver ativo.

**Comando:**
Defina a lógica da lâmpada.

**Tópicos:**
- a) Qual função lógica atende? Monte a tabela-verdade. (0,6)
- b) Explique a relação entre essa função e a OR. (0,4)

---

## ITEM 06 — Sensores redundantes da cabine

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
A cabine de pintura tem dois sensores de exaustão (S1 e S2) que medem a mesma condição. Se eles discordarem, um deles pode estar com defeito.

**Comando:**
Monte a lógica de conferência.

**Tópicos:**
- a) Qual função dá 1 quando os sensores concordam? E qual dá 1 quando discordam? (0,6)
- b) Para S1 = 1 e S2 = 0, qual é a saída de cada função e o que o operador deve fazer? (0,4)

---

## ITEM 07 — Falta de condição de partida

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
A esteira tem duas condições de partida: C1 = proteção fechada e C2 = sem peça presa. O sinal FALTA_CONDIÇÃO deve avisar quando pelo menos uma não estiver pronta.

**Comando:**
Analise o sinal.

**Tópicos:**
- a) Qual função lógica descreve FALTA_CONDIÇÃO? Justifique pela tabela. (0,6)
- b) Qual é a relação entre NAND e AND? (0,4)

---

## ITEM 08 — Interruptores do corredor

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
O corredor do almoxarifado tem uma lâmpada comandada por dois interruptores (um em cada ponta). Mudar qualquer interruptor troca o estado da lâmpada.

**Comando:**
Explique a lógica.

**Tópicos:**
- a) Qual função lógica é essa? Monte a tabela-verdade. (0,6)
- b) Por que não poderia ser uma OR? (0,4)

---

## ITEM 09 — Expressão mista

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
A bomba da cabine liga quando (botão de partida P = 1 E nível ok N = 1) OU quando a chave de teste T = 1.

**Comando:**
Analise a expressão.

**Tópicos:**
- a) Escreva a expressão lógica da bomba. (0,4)
- b) Calcule BOMBA para P = 0, N = 1, T = 1 e para P = 1, N = 0, T = 0. (0,6)

---

## ITEM 10 — Caderno de lógica do setor

- **Aula:** 02 · Funções Lógicas
- **Capacidade:** C1

**Contexto:**
Para fechar o caderno de lógica, você deve escolher a função certa para novas situações.

**Comando:**
Classifique e justifique.

**Tópicos:**
- a) Indique a função lógica: (1) a estufa só abre com temperatura baixa e ventilador desligado; (2) a sirene toca com temperatura alta ou pressão alta. (0,6)
- b) Explique em uma frase a diferença prática entre AND e OR. (0,4)

---
