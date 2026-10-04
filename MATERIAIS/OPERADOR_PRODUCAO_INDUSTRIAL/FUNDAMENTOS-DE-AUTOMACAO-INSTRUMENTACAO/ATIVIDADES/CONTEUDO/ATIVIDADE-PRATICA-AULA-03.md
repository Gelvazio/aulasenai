# Atividade: Atividade Prática — Aula 03 — 10 Questões Discursivas

- **Aula:** AP-03
- **Rótulo da aula:** Atividade Prática — Aula 03
- **Tema:** CLP: Características Técnicas e Princípio de Funcionamento
- **Ícone:** 🖥️
- **Duração:** 90–120 minutos
- **Formato:** Discursiva prática (analisar situações da fábrica e responder por escrito em cada tópico)
- **Total de questões:** 10
- **Pontuação:** 1 ponto por questão, dividido entre os tópicos (total: 10 pontos)
- **Capacidade avaliada:** Reconhecer as características técnicas do CLP, explicar o ciclo de varredura e usar os LEDs e modos de operação para interpretar o funcionamento de máquinas da linha.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois (com apoio de IA e revisão do professor).
- **Folha de respostas:** sim
- **Aula no banco:** 3

**Empresa fictícia de todas as questões:** Cerâmica Rio Claro — fábrica de pisos com forno contínuo, esteiras e prensas, em processo de troca dos painéis de relés por CLPs. Você é o(a) operador(a) de produção da linha do forno.

**Produto da aula:** ao longo das questões você monta o "guia do operador do CLP" da linha do forno.

**Como responder:** Cada questão tem um ou mais **tópicos**. Escreva a resposta de **cada tópico no seu campo**, com frases completas e com as suas palavras. Quando o comando pedir um cálculo, mostre a conta. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

---

## ITEM 01 — Do relé ao CLP

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
O forno da Cerâmica Rio Claro é comandado por um painel com 40 relés. A cada mudança de receita, a manutenção leva dois dias refazendo a fiação.

**Comando:**
Compare as soluções.

**Tópicos:**
- a) Cite dois problemas do painel de relés. (0,5)
- b) Explique como o CLP resolve a mudança de receita. (0,5)

---

## ITEM 02 — Entradas e saídas do forno

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
No forno, o CLP recebe: botão LIGA, termostato e fim de curso da porta; e comanda: resistência e lâmpada "forno ligado".

**Comando:**
Organize os sinais.

**Tópicos:**
- a) Classifique cada dispositivo como entrada ou saída do CLP. (0,6)
- b) Explique a diferença entre entrada e saída do CLP. (0,4)

---

## ITEM 03 — Ciclo de varredura

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
Um colega novo acha que o CLP "olha" os sensores apenas quando alguém aperta um botão.

**Comando:**
Explique o funcionamento real.

**Tópicos:**
- a) Descreva as etapas do ciclo de varredura na ordem correta. (0,6)
- b) Qual é a ordem de grandeza do tempo de varredura e por que isso importa? (0,4)

---

## ITEM 04 — Ficha técnica

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
A ficha técnica do novo CLP diz: alimentação 24 Vcc; 16 ED 24 Vcc; 12 SD a relé 2 A; 2 EA 4–20 mA; porta Ethernet.

**Comando:**
Interprete a ficha.

**Tópicos:**
- a) Explique o que significam "16 ED", "12 SD a relé" e "2 EA 4–20 mA". (0,6)
- b) Para que serve a porta Ethernet? (0,4)

---

## ITEM 05 — RUN e STOP

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
Durante a prática, o docente passa o CLP de RUN para STOP com a esteira funcionando.

**Comando:**
Explique o comportamento.

**Tópicos:**
- a) O que acontece com as saídas e com a esteira? (0,5)
- b) Por que o operador não deve mudar o modo do CLP por conta própria na fábrica? (0,5)

---

## ITEM 06 — Diagnóstico pelos LEDs — caso 1

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
O operador pressiona LIGA. O LED da entrada do botão acende no CLP, mas o LED da saída do contator não acende e a esteira não anda.

**Comando:**
Analise o caso.

**Tópicos:**
- a) O sinal do botão chegou ao CLP? Justifique. (0,4)
- b) Onde provavelmente está a causa e como você informaria a manutenção? (0,6)

---

## ITEM 07 — Diagnóstico pelos LEDs — caso 2

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
Agora o LED da saída da esteira está aceso no CLP, mas o motor está parado.

**Comando:**
Analise o caso.

**Tópicos:**
- a) O CLP mandou ligar a esteira? Onde está a falha provável? (0,6)
- b) Escreva a mensagem para a manutenção. (0,4)

---

## ITEM 08 — Pulso curto

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
Um sensor de peça muito rápida gera um pulso de 1 ms. O CLP tem tempo de varredura de 8 ms e às vezes não conta a peça.

**Comando:**
Explique e proponha.

**Tópicos:**
- a) Por que algumas peças não são contadas? (0,6)
- b) O que o operador deve fazer ao perceber a diferença na contagem? (0,4)

---

## ITEM 09 — Ambiente industrial

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
O gerente pergunta por que não usar um computador de escritório no lugar do CLP no forno.

**Comando:**
Justifique a escolha do CLP.

**Tópicos:**
- a) Cite duas características do CLP adequadas ao chão de fábrica. (0,6)
- b) Cite uma vantagem de diagnóstico do CLP para o operador. (0,4)

---

## ITEM 10 — Guia do operador do CLP

- **Aula:** 03 · CLP: Características Técnicas e Princípio de Funcionamento
- **Capacidade:** C1

**Contexto:**
Para fechar o guia, você deve registrar as regras de segurança do laboratório e da fábrica com o CLP.

**Comando:**
Escreva as regras.

**Tópicos:**
- a) Cite três regras de segurança para práticas com CLP na bancada. (0,6)
- b) Explique quem pode alterar o programa de uma máquina em produção e por quê. (0,4)

---
