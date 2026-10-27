# Atividade: Prova Objetiva — Prof. Rafael — 20 Questões

- **Aula:** PR-01
- **Rótulo da aula:** Prova Objetiva — Prof. Rafael
- **Tema:** Conversão de bases, sistemas supervisórios (SCADA/IHM) e variáveis de controle
- **Ícone:** 📝
- **Duração:** 60–90 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 20
- **Pontuação:** 1 ponto por questão correta (total: 20 pontos)
- **Capacidade avaliada:** Aplicar os conteúdos das aulas do Prof. Rafael: conversão de bases numéricas, sistemas supervisórios (SCADA e IHM) e variáveis de controle (pressão, vazão, temperatura e nível), relacionando-os à programação de CLP, à supervisão e à instrumentação.
- **Conteúdo-base:** `../CONTEUDO-PROF-RAFAEL/` (slides do Prof. Rafael, uso local)
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** gabarito

> Fonte única: o HTML `PROVA-OBJETIVA-PROF-RAFAEL.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py --so`. A linha **Gabarito** NÃO é publicada (arquivo no .gitignore).

---

## ITEM 01 — O que é uma base numérica

- **Capacidade:** C1

**Contexto:**  
Na abertura da aula de lógica digital, o professor escreve no quadro: "Decimal (10), Binário (2), Octal (8) e Hexadecimal (16)".

**Comando:**  
O que significa a "base" de cada sistema?

**Alternativas:**
- A) O primeiro algarismo à esquerda do número.
- B) A quantidade de casas depois da vírgula.
- C) A quantidade de símbolos (algarismos) que o sistema usa para representar os números.
- D) O maior número que o sistema consegue escrever.

**Gabarito:** C

---

## ITEM 02 — Decimal para binário

- **Capacidade:** C1

**Contexto:**  
O contador de um CLP registrou 25 peças e o técnico pede para conferir o valor em binário pelo método das divisões sucessivas por 2.

**Comando:**  
Qual é o valor de 25 em binário?

**Alternativas:**
- A) 10011.
- B) 10101.
- C) 11001.
- D) 11010.

**Gabarito:** C

---

## ITEM 03 — Decimal para octal

- **Capacidade:** C1

**Contexto:**  
O professor resolve no quadro: 83 ÷ 8 = 10 resto 3; 10 ÷ 8 = 1 resto 2; 1 ÷ 8 = 0 resto 1.

**Comando:**  
Qual é o valor de 83 em octal?

**Alternativas:**
- A) 321.
- B) 123.
- C) 1023.
- D) 83.

**Gabarito:** B

---

## ITEM 04 — Decimal para hexadecimal

- **Capacidade:** C1

**Contexto:**  
O maior valor de um byte do CLP é 255. Fazendo 255 ÷ 16 = 15 resto 15 e 15 ÷ 16 = 0 resto 15.

**Comando:**  
Como 255 fica em hexadecimal?

**Alternativas:**
- A) FF.
- B) F5.
- C) EE.
- D) 1515.

**Gabarito:** A

---

## ITEM 05 — Binário para decimal

- **Capacidade:** C1

**Contexto:**  
Um cartão de entradas mostra o valor 1101 e a tabela de pesos 8, 4, 2 e 1.

**Comando:**  
Qual é o valor decimal de 1101?

**Alternativas:**
- A) 13.
- B) 11.
- C) 1101.
- D) 7.

**Gabarito:** A

---

## ITEM 06 — Hexadecimal para decimal

- **Capacidade:** C1

**Contexto:**  
Um código de falha da IHM aparece como 2A (hexadecimal). Lembre que A vale 10.

**Comando:**  
Qual é o valor decimal do código?

**Alternativas:**
- A) 210.
- B) 42.
- C) 32.
- D) 12.

**Gabarito:** B

---

## ITEM 07 — Binário para octal e hexadecimal

- **Capacidade:** C1

**Contexto:**  
O técnico quer escrever números binários longos de forma curta, agrupando os bits.

**Comando:**  
Qual regra está correta?

**Alternativas:**
- A) Para os dois, agrupam-se 2 bits.
- B) Não é possível converter binário direto para octal ou hexadecimal.
- C) Para octal, agrupam-se 4 bits; para hexadecimal, 3 bits.
- D) Para octal, agrupam-se 3 bits; para hexadecimal, 4 bits, a partir da direita.

**Gabarito:** D

---

## ITEM 08 — O que é um sistema supervisório

- **Capacidade:** C2

**Contexto:**  
Na sala de controle, a tela mostra pressão de 4,2 bar, vazão de 38 m³/h e nível de 72%, com botões de alarmes, tendências e comandos.

**Comando:**  
Qual definição descreve melhor esse sistema supervisório?

**Alternativas:**
- A) Uma camada que transforma dados do processo em informação operacional para o operador.
- B) O motor que movimenta a bomba.
- C) O sensor que mede a pressão da linha.
- D) O cabo que alimenta o CLP.

**Gabarito:** A

---

## ITEM 09 — Significado de SCADA

- **Capacidade:** C2

**Contexto:**  
Em uma visita técnica, o guia diz que a fábrica usa um "sistema SCADA".

**Comando:**  
O que significa SCADA?

**Alternativas:**
- A) Sistema de Cálculo de Água e Dosagem.
- B) Sistema Central de Automação de Dispositivos Analógicos.
- C) Controle de Supervisão e Aquisição de Dados.
- D) Sensor de Controle Automático de Alarmes.

**Gabarito:** C

---

## ITEM 10 — IHM e CLP

- **Capacidade:** C2

**Contexto:**  
Um colega diz que "a IHM da máquina é que faz a lógica de controle".

**Comando:**  
Qual afirmação corrige o colega?

**Alternativas:**
- A) O CLP só mostra telas, e a IHM controla a máquina.
- B) A IHM apresenta e permite interagir; quem executa a lógica de controle é o CLP.
- C) A IHM substitui os sensores.
- D) A IHM e o CLP são o mesmo equipamento.

**Gabarito:** B

---

## ITEM 11 — IHM × SCADA

- **Capacidade:** C2

**Contexto:**  
A envasadora tem uma tela touch no painel; a sala de controle acompanha todas as linhas da fábrica com várias telas.

**Comando:**  
Como classificar essas duas soluções?

**Alternativas:**
- A) A tela do painel é SCADA e a sala de controle é IHM.
- B) As duas são IHM, porque têm tela.
- C) As duas são SCADA, porque mostram valores.
- D) A tela do painel é IHM (visão local); a sala de controle usa SCADA (visão centralizada).

**Gabarito:** D

---

## ITEM 12 — Arquitetura de supervisão

- **Capacidade:** C2

**Contexto:**  
O professor desenha o fluxo da informação em um sistema de supervisão.

**Comando:**  
Qual é a sequência correta?

**Alternativas:**
- A) IHM → sensores → rede → atuadores → CLP.
- B) Sensores/atuadores → CLP/RTU → rede industrial → servidor SCADA → IHM/cliente.
- C) Operador → termopar → servidor → bomba.
- D) Servidor SCADA → sensores → operador → CLP.

**Gabarito:** B

---

## ITEM 13 — Boas práticas de alarme

- **Capacidade:** C2

**Contexto:**  
A lista de alarmes da sala de controle mostra dezenas de mensagens repetidas que ninguém reconhece.

**Comando:**  
Qual boa prática ajuda a resolver o problema?

**Alternativas:**
- A) Apagar o histórico a cada turno.
- B) Aumentar o volume da sirene.
- C) Desligar todos os alarmes.
- D) Priorizar a criticidade, usar mensagens claras e evitar alarmes repetitivos.

**Gabarito:** D

---

## ITEM 14 — Falha de comunicação com o SCADA

- **Capacidade:** C2

**Contexto:**  
Durante o turno, a comunicação entre o CLP do tanque e o SCADA cai.

**Comando:**  
Segundo a arquitetura estudada, o que deve acontecer?

**Alternativas:**
- A) O controle local continua no CLP; a supervisão perde a visibilidade até a comunicação voltar.
- B) O SCADA passa a controlar a válvula sozinho.
- C) Os sensores deixam de medir.
- D) O tanque para imediatamente, porque o CLP depende do SCADA para controlar.

**Gabarito:** A

---

## ITEM 15 — Instrumentos de pressão

- **Capacidade:** C3

**Contexto:**  
Na linha de ar comprimido há três instrumentos: um faz leitura local, outro abre/fecha um contato num limite e outro envia 4–20 mA ao CLP.

**Comando:**  
Quais são esses instrumentos, nessa ordem?

**Alternativas:**
- A) Manômetro, pressostato e transmissor.
- B) Pressostato, manômetro e termopar.
- C) Termopar, PT100 e radar.
- D) Transmissor, rotâmetro e boia.

**Gabarito:** A

---

## ITEM 16 — Medidores de vazão

- **Capacidade:** C3

**Contexto:**  
A fábrica precisa medir a vazão mássica de xarope na dosagem e a vazão de água em uma tubulação de fluido condutivo.

**Comando:**  
Quais medidores são indicados, respectivamente?

**Alternativas:**
- A) Boia e termopar.
- B) Coriolis e eletromagnético.
- C) Eletromagnético e Coriolis.
- D) Manômetro e PT100.

**Gabarito:** B

---

## ITEM 17 — Sensores de temperatura

- **Capacidade:** C3

**Contexto:**  
O forno de tratamento térmico trabalha em altas temperaturas; o tanque de processo exige medição resistiva precisa.

**Comando:**  
Quais sensores são mais indicados, respectivamente?

**Alternativas:**
- A) Rotâmetro e boia.
- B) PT100 e termopar.
- C) Termopar e PT100.
- D) Pressostato e radar.

**Gabarito:** C

---

## ITEM 18 — Setpoint e variável de processo

- **Capacidade:** C3

**Contexto:**  
A estufa deve trabalhar a 80 °C, mas a medição atual é 75 °C.

**Comando:**  
Qual é o SP, a PV e o erro?

**Alternativas:**
- A) SP = 155 °C, PV = 75 °C e erro = 80 °C.
- B) SP = 80 °C, PV = 75 °C e erro = 5 °C.
- C) SP = 80 °C, PV = 80 °C e erro = 0 °C.
- D) SP = 75 °C, PV = 80 °C e erro = −5 °C.

**Gabarito:** B

---

## ITEM 19 — Interpretação do 4–20 mA

- **Capacidade:** C3

**Contexto:**  
Um transmissor de pressão de 0–10 bar envia 14 mA ao CLP.

**Comando:**  
Qual é a pressão medida? (Use: (mA − 4) ÷ 16 × faixa.)

**Alternativas:**
- A) 8,75 bar.
- B) 5 bar.
- C) 7 bar.
- D) 6,25 bar.

**Gabarito:** D

---

## ITEM 20 — Controle de nível do tanque

- **Capacidade:** C4

**Contexto:**  
Um tanque tem transmissor de nível 0–100% (4–20 mA). O CLP recebe 16,8 mA e o setpoint é 80%. A válvula de entrada é o atuador.

**Comando:**  
Qual alternativa está correta?

**Alternativas:**
- A) O nível é 16,8%; a variável controlada é a válvula.
- B) O nível é 68%; o tanque está acima do setpoint.
- C) O nível é 100%; o tanque vai transbordar.
- D) O nível é 80% (PV = SP); a variável controlada é o nível e a manipulada é a abertura da válvula.

**Gabarito:** D

---
