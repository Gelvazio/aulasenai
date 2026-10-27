# Atividade: Funções Lógicas — 50 Questões

- **Aula:** 02
- **Tema:** Funções Lógicas
- **Ícone:** 🔀
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar as funções AND, NAND, OR, NOR, EX-OR e NÃO EX-OR a comandos e condições de máquinas industriais.
- **Conteúdo-base:** `../AULAS/AULA-02.md`
- **Slides:** `—`
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-02-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (arquivo fora do Git).

---

## ITEM 01 — Estados de uma variável lógica

- **Capacidade:** C1

**Comando:**  
Quantos estados uma variável lógica pode assumir?

**Alternativas:**
- A) Dez, como no sistema decimal.
- B) Infinitos, como uma medição de temperatura.
- C) Três: ligado, desligado e em espera.
- D) Dois: 0 (falso/desligado) e 1 (verdadeiro/ligado).

**Gabarito:** D

---

## ITEM 02 — Regra da função AND

- **Capacidade:** C1

**Comando:**  
Quando a saída de uma função AND (E) vale 1?

**Alternativas:**
- A) Quando as entradas são diferentes.
- B) Quando todas as entradas valem 0.
- C) Quando todas as entradas valem 1.
- D) Quando pelo menos uma entrada vale 1.

**Gabarito:** C

---

## ITEM 03 — Regra da função OR

- **Capacidade:** C1

**Comando:**  
Quando a saída de uma função OR (OU) vale 1?

**Alternativas:**
- A) Somente quando as entradas são iguais.
- B) Somente quando todas as entradas valem 0.
- C) Quando pelo menos uma das entradas vale 1.
- D) Somente quando todas as entradas valem 1.

**Gabarito:** C

---

## ITEM 04 — Regra da função NAND

- **Capacidade:** C1

**Comando:**  
A função NAND (NÃO E) tem saída 1 quando:

**Alternativas:**
- A) Pelo menos uma das entradas vale 0.
- B) Nenhuma entrada está ligada e o CLP está em STOP.
- C) As entradas são iguais.
- D) Todas as entradas valem 1.

**Gabarito:** A

---

## ITEM 05 — Regra da função NOR

- **Capacidade:** C1

**Comando:**  
A função NOR (NÃO OU) tem saída 1 quando:

**Alternativas:**
- A) Todas as entradas valem 1.
- B) Todas as entradas valem 0.
- C) Pelo menos uma entrada vale 1.
- D) As entradas são diferentes.

**Gabarito:** B

---

## ITEM 06 — Regra da função EX-OR

- **Capacidade:** C1

**Comando:**  
A função EX-OR (OU exclusivo) tem saída 1 quando:

**Alternativas:**
- A) Todas as entradas valem 1.
- B) As entradas são diferentes entre si.
- C) Todas as entradas valem 0.
- D) As entradas são iguais.

**Gabarito:** B

---

## ITEM 07 — Regra da função NÃO EX-OR

- **Capacidade:** C1

**Comando:**  
A função NÃO EX-OR (coincidência) tem saída 1 quando:

**Alternativas:**
- A) Apenas a entrada A vale 1.
- B) Apenas a entrada B vale 1.
- C) As entradas são diferentes.
- D) As entradas são iguais entre si.

**Gabarito:** D

---

## ITEM 08 — AND com 1 e 0

- **Capacidade:** C1

**Comando:**  
Em uma porta AND com A = 1 e B = 0, qual é a saída?

**Alternativas:**
- A) 0.
- B) 1.
- C) Indefinida.
- D) 10.

**Gabarito:** A

---

## ITEM 09 — OR com 0 e 1

- **Capacidade:** C1

**Comando:**  
Em uma porta OR com A = 0 e B = 1, qual é a saída?

**Alternativas:**
- A) 01.
- B) 1.
- C) Depende do tempo de varredura.
- D) 0.

**Gabarito:** B

---

## ITEM 10 — NAND com 1 e 1

- **Capacidade:** C1

**Comando:**  
Em uma porta NAND com A = 1 e B = 1, qual é a saída?

**Alternativas:**
- A) 2.
- B) 0.
- C) 1.
- D) 11.

**Gabarito:** B

---

## ITEM 11 — NOR com 0 e 0

- **Capacidade:** C1

**Comando:**  
Em uma porta NOR com A = 0 e B = 0, qual é a saída?

**Alternativas:**
- A) 00.
- B) 1.
- C) Sempre igual à entrada A.
- D) 0.

**Gabarito:** B

---

## ITEM 12 — EX-OR com 1 e 1

- **Capacidade:** C1

**Comando:**  
Em uma porta EX-OR com A = 1 e B = 1, qual é a saída?

**Alternativas:**
- A) 2.
- B) 1.
- C) 11.
- D) 0.

**Gabarito:** D

---

## ITEM 13 — NÃO EX-OR com 0 e 0

- **Capacidade:** C1

**Comando:**  
Em uma porta NÃO EX-OR com A = 0 e B = 0, qual é a saída?

**Alternativas:**
- A) 1.
- B) 00.
- C) Indefinida.
- D) 0.

**Gabarito:** A

---

## ITEM 14 — Tabela-verdade

- **Capacidade:** C1

**Comando:**  
O que é uma tabela-verdade?

**Alternativas:**
- A) A lista de alarmes verdadeiros da IHM.
- B) O manual de instalação do CLP.
- C) Uma tabela com as medidas de temperatura do processo.
- D) Uma tabela com todas as combinações das entradas e a saída correspondente de cada uma.

**Gabarito:** D

---

## ITEM 15 — Linhas da tabela com 2 entradas

- **Capacidade:** C1

**Comando:**  
Quantas combinações (linhas) tem a tabela-verdade de uma função com 2 entradas?

**Alternativas:**
- A) 3.
- B) 8.
- C) 4.
- D) 2.

**Gabarito:** C

---

## ITEM 16 — Linhas da tabela com 3 entradas

- **Capacidade:** C1

**Comando:**  
Quantas combinações tem a tabela-verdade de uma função com 3 entradas?

**Alternativas:**
- A) 9.
- B) 3.
- C) 8.
- D) 6.

**Gabarito:** C

---

## ITEM 17 — Expressão da função AND

- **Capacidade:** C1

**Comando:**  
Qual expressão representa a função AND entre A e B?

**Alternativas:**
- A) S = A − B.
- B) S = A · B.
- C) S = A ⊕ B.
- D) S = A + B.

**Gabarito:** B

---

## ITEM 18 — Expressão da função OR

- **Capacidade:** C1

**Comando:**  
Qual expressão representa a função OR entre A e B?

**Alternativas:**
- A) S = A + B.
- B) S = A ⊕ B.
- C) S = A · B.
- D) S = A ÷ B.

**Gabarito:** A

---

## ITEM 19 — Símbolo do EX-OR

- **Capacidade:** C1

**Comando:**  
Qual símbolo é usado na expressão da função EX-OR?

**Alternativas:**
- A) =.
- B) ⊕.
- C) ·.
- D) +.

**Gabarito:** B

---

## ITEM 20 — Círculo de negação

- **Capacidade:** C1

**Comando:**  
No símbolo gráfico das portas NAND, NOR e NÃO EX-OR, o que indica o pequeno círculo na saída?

**Alternativas:**
- A) Que a porta está desligada.
- B) A inversão (negação) do resultado.
- C) Que a porta tem três entradas.
- D) Que a saída é analógica.

**Gabarito:** B

---

## ITEM 21 — NAND como AND invertido

- **Capacidade:** C1

**Comando:**  
Qual relação existe entre NAND e AND?

**Alternativas:**
- A) A NAND só funciona com três entradas.
- B) A saída da NAND é sempre o inverso da saída da AND.
- C) São iguais.
- D) A NAND é a soma de duas AND.

**Gabarito:** B

---

## ITEM 22 — NOR como OR invertido

- **Capacidade:** C1

**Comando:**  
Qual relação existe entre NOR e OR?

**Alternativas:**
- A) A saída da NOR é sempre o inverso da saída da OR.
- B) A NOR é igual à AND.
- C) A NOR é igual à OR.
- D) Não há relação entre elas.

**Gabarito:** A

---

## ITEM 23 — Comando bimanual

- **Capacidade:** C1

**Contexto:**  
Na Metalúrgica Alfa, a prensa só pode descer se o operador pressionar os dois botões (B1 e B2) ao mesmo tempo, mantendo as mãos fora da área de risco.

**Comando:**  
Qual função lógica descreve esse comando?

**Alternativas:**
- A) NOR.
- B) EX-OR.
- C) OR.
- D) AND.

**Gabarito:** D

---

## ITEM 24 — Erro na prensa

- **Capacidade:** C1

**Contexto:**  
A prensa da Metalúrgica Alfa desceu quando o operador pressionou apenas o botão B1.

**Comando:**  
Qual função lógica estava aplicada por engano?

**Alternativas:**
- A) AND.
- B) OR.
- C) NÃO EX-OR.
- D) NAND.

**Gabarito:** B

---

## ITEM 25 — Expressão com porta de proteção

- **Capacidade:** C1

**Contexto:**  
A descida da prensa exige B1, B2 e a porta de proteção fechada (P = 1).

**Comando:**  
Qual expressão representa a condição correta?

**Alternativas:**
- A) S = B1 ⊕ B2 ⊕ P.
- B) S = B1 + B2 + P.
- C) S = B1 · B2 · P.
- D) S = B1 · B2 + P.

**Gabarito:** C

---

## ITEM 26 — Parada por emergência

- **Capacidade:** C1

**Contexto:**  
Uma esteira tem três botões de emergência ao longo da linha. Basta acionar qualquer um deles para gerar o sinal de parada.

**Comando:**  
Qual função lógica gera o sinal de parada?

**Alternativas:**
- A) AND.
- B) OR.
- C) NAND.
- D) NÃO EX-OR.

**Gabarito:** B

---

## ITEM 27 — Lâmpada de linha liberada

- **Capacidade:** C1

**Contexto:**  
A lâmpada verde "linha liberada" deve acender somente quando nenhum dos alarmes A1 e A2 estiver ativo.

**Comando:**  
Qual função lógica atende a essa condição?

**Alternativas:**
- A) EX-OR.
- B) OR.
- C) NOR.
- D) AND.

**Gabarito:** C

---

## ITEM 28 — Interruptores de corredor

- **Capacidade:** C1

**Contexto:**  
A iluminação do corredor do almoxarifado é comandada por dois interruptores, um em cada ponta. A lâmpada acende quando os interruptores estão em posições diferentes.

**Comando:**  
Qual função lógica representa esse comando?

**Alternativas:**
- A) NOR.
- B) NAND.
- C) AND.
- D) EX-OR.

**Gabarito:** D

---

## ITEM 29 — Sensores redundantes

- **Capacidade:** C1

**Contexto:**  
Dois sensores medem a mesma condição. O sinal "sensores OK" deve valer 1 quando os dois concordam (ambos 0 ou ambos 1).

**Comando:**  
Qual função lógica é usada?

**Alternativas:**
- A) EX-OR.
- B) NÃO EX-OR.
- C) OR.
- D) NAND.

**Gabarito:** B

---

## ITEM 30 — Falta de condição de partida

- **Capacidade:** C1

**Contexto:**  
O sinal "falta condição" deve valer 1 sempre que pelo menos uma das condições de partida (C1 ou C2) não estiver pronta.

**Comando:**  
Qual função lógica descreve esse sinal?

**Alternativas:**
- A) NAND.
- B) OR.
- C) AND.
- D) NÃO EX-OR.

**Gabarito:** A

---

## ITEM 31 — Linha da tabela AND

- **Capacidade:** C1

**Comando:**  
Na tabela-verdade da AND de duas entradas, quantas linhas têm saída 1?

**Alternativas:**
- A) Apenas uma (A = 1 e B = 1).
- B) Três.
- C) Nenhuma.
- D) Duas.

**Gabarito:** A

---

## ITEM 32 — Linha da tabela OR

- **Capacidade:** C1

**Comando:**  
Na tabela-verdade da OR de duas entradas, quantas linhas têm saída 1?

**Alternativas:**
- A) Quatro.
- B) Duas.
- C) Três.
- D) Uma.

**Gabarito:** C

---

## ITEM 33 — Linha da tabela EX-OR

- **Capacidade:** C1

**Comando:**  
Na tabela-verdade da EX-OR de duas entradas, quais combinações dão saída 1?

**Alternativas:**
- A) Apenas A = 1 e B = 1.
- B) A = 0 e B = 0; A = 1 e B = 1.
- C) Apenas A = 0 e B = 0.
- D) A = 0 e B = 1; A = 1 e B = 0.

**Gabarito:** D

---

## ITEM 34 — AND de três entradas

- **Capacidade:** C1

**Comando:**  
Uma AND de três entradas com A = 1, B = 1 e C = 0 tem saída:

**Alternativas:**
- A) Igual a C invertido.
- B) 2.
- C) 1.
- D) 0.

**Gabarito:** D

---

## ITEM 35 — OR de três entradas

- **Capacidade:** C1

**Comando:**  
Uma OR de três entradas com A = 0, B = 0 e C = 1 tem saída:

**Alternativas:**
- A) 0.
- B) 1.
- C) Indefinida.
- D) 3.

**Gabarito:** B

---

## ITEM 36 — Segurança na lógica

- **Capacidade:** C1

**Comando:**  
Por que a lógica do comando bimanual é considerada um intertravamento de segurança?

**Alternativas:**
- A) Porque economiza energia elétrica.
- B) Porque deixa a prensa mais rápida.
- C) Porque impede a descida da prensa enquanto uma das mãos pode estar na área de risco.
- D) Porque permite que o operador use apenas uma mão.

**Gabarito:** C

---

## ITEM 37 — Alteração da lógica de segurança

- **Capacidade:** C1

**Contexto:**  
Um colega sugere ligar os botões B1 e B2 em paralelo (lógica OR) para "ganhar tempo" na produção.

**Comando:**  
Qual é a atitude correta?

**Alternativas:**
- A) Fazer a mudança e avisar depois.
- B) Recusar e comunicar ao líder: a lógica de segurança não pode ser alterada pelo operador.
- C) Usar fita para manter um botão pressionado.
- D) Fazer a mudança só no turno da noite.

**Gabarito:** B

---

## ITEM 38 — Simulador de portas lógicas

- **Capacidade:** C1

**Contexto:**  
No simulador, as chaves representam as entradas A e B e uma lâmpada representa a saída. Com A = 0 e B = 0 a lâmpada fica apagada; com A = 1 e B = 0 ela acende; com A = 1 e B = 1 ela apaga.

**Comando:**  
Qual porta está montada no simulador?

**Alternativas:**
- A) OR.
- B) NÃO EX-OR.
- C) EX-OR.
- D) AND.

**Gabarito:** C

---

## ITEM 39 — Identificar a porta pela tabela

- **Capacidade:** C1

**Contexto:**  
Uma porta tem a tabela: 00 → 1; 01 → 1; 10 → 1; 11 → 0.

**Comando:**  
Qual é a porta?

**Alternativas:**
- A) EX-OR.
- B) NOR.
- C) NAND.
- D) AND.

**Gabarito:** C

---

## ITEM 40 — Identificar outra porta

- **Capacidade:** C1

**Contexto:**  
Uma porta tem a tabela: 00 → 1; 01 → 0; 10 → 0; 11 → 0.

**Comando:**  
Qual é a porta?

**Alternativas:**
- A) NÃO EX-OR.
- B) NOR.
- C) OR.
- D) NAND.

**Gabarito:** B

---

## ITEM 41 — Identificar a coincidência

- **Capacidade:** C1

**Contexto:**  
Uma porta tem a tabela: 00 → 1; 01 → 0; 10 → 0; 11 → 1.

**Comando:**  
Qual é a porta?

**Alternativas:**
- A) NOR.
- B) AND.
- C) EX-OR.
- D) NÃO EX-OR.

**Gabarito:** D

---

## ITEM 42 — Lógica booleana

- **Capacidade:** C1

**Comando:**  
A álgebra usada para descrever as funções lógicas recebe o nome de:

**Alternativas:**
- A) Geometria analítica.
- B) Estatística descritiva.
- C) Álgebra decimal.
- D) Álgebra booleana.

**Gabarito:** D

---

## ITEM 43 — Bomba com duas condições

- **Capacidade:** C1

**Contexto:**  
A bomba de abastecimento só pode ligar se houver nível mínimo no tanque (N = 1) e a válvula de saída estiver aberta (V = 1).

**Comando:**  
Qual expressão comanda a bomba?

**Alternativas:**
- A) S = N + V.
- B) S = N · V.
- C) S = N ⊕ V.
- D) S = (N + V) invertido.

**Gabarito:** B

---

## ITEM 44 — Sirene de alarme

- **Capacidade:** C1

**Contexto:**  
A sirene deve tocar se a temperatura estiver alta (T = 1) ou se a pressão estiver alta (P = 1).

**Comando:**  
Qual expressão comanda a sirene?

**Alternativas:**
- A) S = (T · P) invertido.
- B) S = T · P.
- C) S = T + P.
- D) S = T ⊕ P.

**Gabarito:** C

---

## ITEM 45 — Resultado de uma expressão

- **Capacidade:** C1

**Comando:**  
Na expressão S = A · B + C, qual é a saída para A = 0, B = 1 e C = 1?

**Alternativas:**
- A) 1.
- B) 0.
- C) 2.
- D) Indefinida.

**Gabarito:** A

---

## ITEM 46 — Outra expressão

- **Capacidade:** C1

**Comando:**  
Na expressão S = A · B + C, qual é a saída para A = 1, B = 0 e C = 0?

**Alternativas:**
- A) 1.
- B) Igual a B.
- C) 0.
- D) 10.

**Gabarito:** C

---

## ITEM 47 — Inversão de um sinal

- **Capacidade:** C1

**Comando:**  
Se o sinal A vale 1, quanto vale o sinal A invertido (Ā)?

**Alternativas:**
- A) 2.
- B) 1.
- C) −1.
- D) 0.

**Gabarito:** D

---

## ITEM 48 — Funções lógicas no CLP

- **Capacidade:** C1

**Comando:**  
Qual é a relação entre as funções lógicas e o CLP?

**Alternativas:**
- A) As funções lógicas servem apenas para converter unidades.
- B) O CLP não usa funções lógicas, só medidas de temperatura.
- C) As funções lógicas só existem em calculadoras.
- D) O CLP executa, a cada ciclo, as funções lógicas que formam o programa da máquina.

**Gabarito:** D

---

## ITEM 49 — Escolha da função adequada

- **Capacidade:** C1

**Contexto:**  
Uma estufa só pode ser aberta quando a temperatura estiver baixa (T = 1) e o ventilador estiver desligado (V = 1 quando desligado).

**Comando:**  
Qual função lógica deve liberar a trava da porta?

**Alternativas:**
- A) AND.
- B) OR.
- C) EX-OR.
- D) NOR.

**Gabarito:** A

---

## ITEM 50 — Erro na tabela-verdade

- **Capacidade:** C1

**Contexto:**  
Um aprendiz montou a tabela da OR assim: 00 → 0; 01 → 1; 10 → 1; 11 → 0.

**Comando:**  
O que está errado?

**Alternativas:**
- A) As linhas do meio: na OR, 0 e 1 resultam em 0.
- B) A primeira linha: na OR, 0 e 0 resultam em 1.
- C) Nada: a tabela está correta.
- D) A última linha: na OR, 1 e 1 resultam em 1 (a tabela montada é de EX-OR).

**Gabarito:** D

---
