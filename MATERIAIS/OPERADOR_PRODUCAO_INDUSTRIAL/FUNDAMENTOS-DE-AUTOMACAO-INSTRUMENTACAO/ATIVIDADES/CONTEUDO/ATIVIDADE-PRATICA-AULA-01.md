# Atividade: Atividade Prática — Aula 01 — 10 Questões Discursivas

- **Aula:** AP-01
- **Rótulo da aula:** Atividade Prática — Aula 01
- **Tema:** Sistemas de Numeração e Conversão de Bases
- **Ícone:** 🔢
- **Duração:** 90–120 minutos
- **Formato:** Discursiva prática (analisar situações da fábrica e responder por escrito em cada tópico)
- **Total de questões:** 10
- **Pontuação:** 1 ponto por questão, dividido entre os tópicos (total: 10 pontos)
- **Capacidade avaliada:** Converter números entre decimal, binário e hexadecimal e aplicar as conversões na leitura de entradas, contadores e códigos de falha do CLP.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois (com apoio de IA e revisão do professor).
- **Folha de respostas:** sim
- **Aula no banco:** 1

**Empresa fictícia de todas as questões:** Sucos Vale Verde — indústria de bebidas com linha de envase automatizada (CLP, IHM e sensores). Você é o(a) novo(a) operador(a) de produção da linha de envase.

**Produto da aula:** ao longo das questões você monta a "tabela de consulta rápida" do turno, com as conversões usadas para ler os códigos e estados do CLP.

**Como responder:** Cada questão tem um ou mais **tópicos**. Escreva a resposta de **cada tópico no seu campo**, com frases completas e com as suas palavras. Quando o comando pedir um cálculo, mostre a conta. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

---

## ITEM 01 — Por que o CLP fala em binário

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
No primeiro dia, um colega pergunta por que o CLP mostra os estados das entradas como 0 e 1, se o operador trabalha com números decimais.

**Comando:**
Explique a ideia ao colega.

**Tópicos:**
- a) Explique o que significa a base de um sistema de numeração e compare as bases 10 e 2. (0,5)
- b) Explique por que o CLP usa o binário e o que significam 0 e 1 para uma entrada. (0,5)

---

## ITEM 02 — Valor posicional

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
Na tabela de consulta rápida, você precisa explicar como se "lê" o valor de cada dígito.

**Comando:**
Mostre o valor posicional nos dois sistemas.

**Tópicos:**
- a) Decomponha o decimal 352 pelo valor de cada posição. (0,5)
- b) Decomponha o binário 1011 e encontre o valor decimal. (0,5)

---

## ITEM 03 — Contador de caixas

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
A IHM mostra 37 caixas produzidas. O técnico explica que o CLP guarda esse valor em binário.

**Comando:**
Faça a conversão mostrando o método.

**Tópicos:**
- a) Converta 37 para binário pelo método das divisões sucessivas, mostrando as divisões e os restos. (0,6)
- b) Confira o resultado convertendo o binário de volta para decimal. (0,4)

---

## ITEM 04 — Leitura de cartão de entradas

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
O cartão de 8 entradas da envasadora mostra 0010 0110 (a entrada 0 é o bit mais à direita). As entradas são: 0 = porta fechada, 1 = garrafa presente, 2 = tampa presente, 5 = nível baixo no silo de tampas.

**Comando:**
Interprete o estado do cartão.

**Tópicos:**
- a) Diga quais entradas estão ligadas (em 1). (0,5)
- b) Explique o que está acontecendo na máquina e se há algo a fazer. (0,5)

---

## ITEM 05 — Códigos de falha em hexadecimal

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
A IHM mostra os códigos 0A, 1F e 2C. No manual, em decimal: 10 = porta aberta; 31 = nível baixo de garrafas; 44 = sobretemperatura do motor.

**Comando:**
Identifique as falhas.

**Tópicos:**
- a) Converta os três códigos para decimal, mostrando a conta. (0,6)
- b) Escreva a mensagem que você passaria ao líder de turno. (0,4)

---

## ITEM 06 — Hexadecimal como atalho

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
Um aprendiz pergunta por que os manuais usam hexadecimal se o CLP trabalha em binário.

**Comando:**
Explique e demonstre.

**Tópicos:**
- a) Explique por que o hexadecimal é usado. (0,4)
- b) Converta 1010 1111 para hexadecimal e 3C para binário. (0,6)

---

## ITEM 07 — Erro de conversão

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
Um colega converteu 6 para binário e anotou 011. Com isso, consultou o endereço errado na lista de E/S.

**Comando:**
Analise o erro.

**Tópicos:**
- a) Mostre a conversão correta de 6 para binário. (0,5)
- b) Explique qual foi o erro do colega e como evitá-lo. (0,5)

---

## ITEM 08 — Capacidade de um byte

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
O supervisor quer saber quantas entradas cabem em um byte e qual é o maior valor que um byte pode guardar.

**Comando:**
Responda com base no binário.

**Tópicos:**
- a) Quantos bits tem um byte e quantas entradas digitais ele representa? (0,4)
- b) Calcule o maior valor decimal de um byte e escreva-o em hexadecimal. (0,6)

---

## ITEM 09 — Endereço do inversor

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
O manual do inversor da esteira diz que a velocidade fica no registro 10 (hexadecimal) e a corrente no registro 1E (hexadecimal). A IHM pede o número em decimal.

**Comando:**
Faça as conversões.

**Tópicos:**
- a) Converta 10 (hex) e 1E (hex) para decimal. (0,6)
- b) Explique o risco de digitar "10" sem converter. (0,4)

---

## ITEM 10 — Tabela de consulta rápida

- **Aula:** 01 · Sistemas de Numeração e Conversão de Bases
- **Capacidade:** C1

**Contexto:**
Para fechar o produto da aula, você vai montar a tabela de consulta rápida do turno.

**Comando:**
Complete a tabela e explique seu uso.

**Tópicos:**
- a) Escreva o binário e o hexadecimal dos decimais 9, 12 e 15. (0,6)
- b) Explique como essa tabela ajuda a evitar erros no turno. (0,4)

---
