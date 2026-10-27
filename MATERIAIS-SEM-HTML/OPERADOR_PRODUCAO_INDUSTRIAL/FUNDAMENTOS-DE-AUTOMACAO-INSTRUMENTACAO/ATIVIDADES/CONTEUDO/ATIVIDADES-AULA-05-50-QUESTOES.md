# Atividade: CLP: Linguagens de Programação — 50 Questões

- **Aula:** 05
- **Tema:** CLP: Linguagens de Programação
- **Ícone:** 📜
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Ler programas simples em Ladder e Blocos de Função, relacionando contatos e bobinas às funções lógicas.
- **Conteúdo-base:** `../AULAS/AULA-05.md`
- **Slides:** `—`
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-05-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (arquivo fora do Git).

---

## ITEM 01 — Norma das linguagens

- **Capacidade:** C1

**Comando:**  
Qual norma internacional define as linguagens de programação de CLP?

**Alternativas:**
- A) ISO 9001.
- B) NR 12.
- C) IEC 61131-3.
- D) NBR 9050.

**Gabarito:** C

---

## ITEM 02 — Linguagem mais usada em máquinas

- **Capacidade:** C1

**Comando:**  
Qual linguagem de CLP é a mais usada em máquinas e lembra um diagrama elétrico?

**Alternativas:**
- A) HTML.
- B) Texto Estruturado (ST).
- C) Lista de Instruções (IL).
- D) Ladder (LD).

**Gabarito:** D

---

## ITEM 03 — Linguagem com blocos

- **Capacidade:** C1

**Comando:**  
Qual linguagem usa blocos gráficos como AND, OR e temporizadores ligados por linhas?

**Alternativas:**
- A) Ladder.
- B) Lista de Instruções.
- C) Texto Estruturado.
- D) Blocos de Função (FBD).

**Gabarito:** D

---

## ITEM 04 — Linguagem textual

- **Capacidade:** C1

**Comando:**  
Qual linguagem de CLP é textual e parecida com uma linguagem de programação de computador?

**Alternativas:**
- A) Ladder.
- B) Diagrama elétrico unifilar.
- C) Blocos de Função.
- D) Texto Estruturado (ST).

**Gabarito:** D

---

## ITEM 05 — Linguagem sequencial

- **Capacidade:** C1

**Comando:**  
Qual linguagem organiza o programa em etapas e transições, para máquinas de sequência?

**Alternativas:**
- A) Ladder.
- B) SFC (Grafcet).
- C) Texto Estruturado.
- D) Lista de Instruções.

**Gabarito:** B

---

## ITEM 06 — Foco do operador

- **Capacidade:** C1

**Comando:**  
Nesta UC, qual é o foco em relação às linguagens de CLP?

**Alternativas:**
- A) Ler e entender programas simples em Ladder e Blocos de Função.
- B) Desenvolver o sistema operacional do CLP.
- C) Criar redes industriais.
- D) Programar sistemas complexos em todas as linguagens.

**Gabarito:** A

---

## ITEM 07 — Contato normalmente aberto

- **Capacidade:** C1

**Comando:**  
No Ladder, o contato normalmente aberto (NA) "deixa passar" quando:

**Alternativas:**
- A) A saída está desligada.
- B) O sinal da entrada correspondente vale 1.
- C) O CLP está em STOP.
- D) O sinal da entrada vale 0.

**Gabarito:** B

---

## ITEM 08 — Contato normalmente fechado

- **Capacidade:** C1

**Comando:**  
No Ladder, o contato normalmente fechado (NF) "deixa passar" quando:

**Alternativas:**
- A) A bobina está ligada.
- B) O sinal correspondente vale 0.
- C) Sempre, independentemente do sinal.
- D) O sinal correspondente vale 1.

**Gabarito:** B

---

## ITEM 09 — Bobina

- **Capacidade:** C1

**Comando:**  
No Ladder, o que representa a bobina ─( )─?

**Alternativas:**
- A) Um comentário do programador.
- B) Um sensor analógico.
- C) Uma saída (ou variável) que liga quando há caminho até ela.
- D) Um botão de emergência.

**Gabarito:** C

---

## ITEM 10 — Rede (rung)

- **Capacidade:** C1

**Comando:**  
Como se chama cada linha de um programa Ladder?

**Alternativas:**
- A) Malha.
- B) Rede (rung).
- C) Bobina.
- D) Byte.

**Gabarito:** B

---

## ITEM 11 — Ordem de leitura do Ladder

- **Capacidade:** C1

**Comando:**  
Em que ordem o CLP executa as redes de um programa Ladder?

**Alternativas:**
- A) Aleatoriamente.
- B) De baixo para cima.
- C) Só a primeira rede.
- D) De cima para baixo, uma rede de cada vez.

**Gabarito:** D

---

## ITEM 12 — Contatos em série

- **Capacidade:** C1

**Comando:**  
Dois contatos NA ligados em série no Ladder equivalem a qual função lógica?

**Alternativas:**
- A) NOR.
- B) AND.
- C) OR.
- D) EX-OR.

**Gabarito:** B

---

## ITEM 13 — Contatos em paralelo

- **Capacidade:** C1

**Comando:**  
Dois contatos NA ligados em paralelo no Ladder equivalem a qual função lógica?

**Alternativas:**
- A) OR.
- B) NÃO EX-OR.
- C) AND.
- D) NAND.

**Gabarito:** A

---

## ITEM 14 — Contato NF como inversão

- **Capacidade:** C1

**Comando:**  
Um contato NF no Ladder equivale a qual operação lógica?

**Alternativas:**
- A) Inversão (negação) do sinal.
- B) Temporização.
- C) Contagem de pulsos.
- D) Soma de dois sinais.

**Gabarito:** A

---

## ITEM 15 — Leitura de rede em série

- **Capacidade:** C1

**Contexto:**  
Rede: ─┤ I0.0 ├─┤ I0.1 ├─( Q0.0 )─ (dois contatos NA em série).

**Comando:**  
Quando Q0.0 liga?

**Alternativas:**
- A) Nunca.
- B) Quando I0.0 ou I0.1 vale 1.
- C) Quando os dois valem 0.
- D) Quando I0.0 e I0.1 valem 1 ao mesmo tempo.

**Gabarito:** D

---

## ITEM 16 — Leitura de rede em paralelo

- **Capacidade:** C1

**Contexto:**  
Rede: dois contatos NA, I0.2 e I0.3, em paralelo, ligados à bobina Q0.1.

**Comando:**  
Quando Q0.1 liga?

**Alternativas:**
- A) Quando I0.2 ou I0.3 (ou ambos) valem 1.
- B) Somente quando os dois valem 0.
- C) Quando os dois são diferentes, apenas.
- D) Somente quando os dois valem 1.

**Gabarito:** A

---

## ITEM 17 — Rede com contato NF

- **Capacidade:** C1

**Contexto:**  
Rede: ─┤/ I0.4 ├─( Q0.2 )─ (contato NF de I0.4).

**Comando:**  
Quando Q0.2 está ligada?

**Alternativas:**
- A) Quando I0.4 vale 1.
- B) Nunca.
- C) Sempre.
- D) Quando I0.4 vale 0.

**Gabarito:** D

---

## ITEM 18 — Prensa em Ladder

- **Capacidade:** C1

**Contexto:**  
Rede: ─┤ B1 ├─┤ B2 ├─┤ PORTA ├─( DESCER )─, com três contatos NA em série.

**Comando:**  
Qual expressão lógica equivale a essa rede?

**Alternativas:**
- A) DESCER = B1 + B2 + PORTA.
- B) DESCER = B1 · B2 · PORTA.
- C) DESCER = B1 ⊕ B2.
- D) DESCER = B1 + B2 · PORTA.

**Gabarito:** B

---

## ITEM 19 — Prever a saída 1

- **Capacidade:** C1

**Contexto:**  
Rede: I0.0 e I0.1 em série, ligados à bobina Q0.0. Estado: I0.0 = 1 e I0.1 = 0.

**Comando:**  
Qual é o estado de Q0.0?

**Alternativas:**
- A) 1 (ligada).
- B) 0 (desligada).
- C) Indefinido.
- D) Pisca.

**Gabarito:** B

---

## ITEM 20 — Prever a saída 2

- **Capacidade:** C1

**Contexto:**  
Rede: I0.2 e I0.3 em paralelo, ligados à bobina Q0.1. Estado: I0.2 = 0 e I0.3 = 1.

**Comando:**  
Qual é o estado de Q0.1?

**Alternativas:**
- A) 1 (ligada).
- B) 0 (desligada).
- C) Pisca.
- D) Depende do STOP.

**Gabarito:** A

---

## ITEM 21 — Prever a saída 3

- **Capacidade:** C1

**Contexto:**  
Rede: contato NA de I0.0 em série com contato NF de I0.5, ligados a Q0.3. Estado: I0.0 = 1 e I0.5 = 1.

**Comando:**  
Qual é o estado de Q0.3?

**Alternativas:**
- A) 1, porque I0.0 está ligado.
- B) Indefinido.
- C) 0, porque o contato NF de I0.5 está aberto.
- D) 1, porque os dois estão ligados.

**Gabarito:** C

---

## ITEM 22 — Prever a saída 4

- **Capacidade:** C1

**Contexto:**  
Rede: contato NA de I0.0 em série com contato NF de I0.5, ligados a Q0.3. Estado: I0.0 = 1 e I0.5 = 0.

**Comando:**  
Qual é o estado de Q0.3?

**Alternativas:**
- A) Indefinido.
- B) Pisca.
- C) 1 (ligada).
- D) 0 (desligada).

**Gabarito:** C

---

## ITEM 23 — Lâmpada de máquina em operação

- **Capacidade:** C1

**Contexto:**  
A lâmpada "máquina em operação" (Q0.5) deve acender quando o motor (Q0.0) estiver ligado.

**Comando:**  
Como fica a rede?

**Alternativas:**
- A) Contato NF de Q0.0 ligado à bobina Q0.5.
- B) Bobina Q0.0 ligada à bobina Q0.5.
- C) Contato NA de Q0.0 ligado à bobina Q0.5.
- D) Contato NF de Q0.5 ligado à bobina Q0.0.

**Gabarito:** C

---

## ITEM 24 — Alarme em paralelo

- **Capacidade:** C1

**Contexto:**  
O alarme sonoro deve ligar se o sensor de nível alto OU o termostato atuar.

**Comando:**  
Como ficam os contatos na rede do alarme?

**Alternativas:**
- A) Em série.
- B) Sem contatos, só a bobina.
- C) Um NF e um NA em série.
- D) Em paralelo.

**Gabarito:** D

---

## ITEM 25 — Emergência ligada como NF

- **Capacidade:** C1

**Comando:**  
Por que o botão de emergência é ligado fisicamente como contato NF?

**Alternativas:**
- A) Porque, se o fio romper, o sinal cai e a máquina para (lógica segura).
- B) Porque o CLP não lê contatos NA.
- C) Porque o contato NF é mais barato.
- D) Para a máquina partir sozinha.

**Gabarito:** A

---

## ITEM 26 — Ladder e diagrama elétrico

- **Capacidade:** C1

**Comando:**  
Por que o Ladder é fácil de entender para quem conhece comandos elétricos?

**Alternativas:**
- A) Porque usa contatos e bobinas, como os diagramas de comando com relés.
- B) Porque só tem números.
- C) Porque é escrito em inglês.
- D) Porque não usa símbolos.

**Gabarito:** A

---

## ITEM 27 — Blocos de Função equivalentes

- **Capacidade:** C1

**Contexto:**  
Em FBD, as entradas B1, B2 e P entram em um bloco AND cuja saída é Q0.0.

**Comando:**  
Qual rede Ladder é equivalente?

**Alternativas:**
- A) B1, B2 e P em paralelo, ligados a Q0.0.
- B) B1, B2 e P como contatos NA em série, ligados a Q0.0.
- C) Apenas B1 ligado a Q0.0.
- D) B1 e B2 em paralelo e P em NF.

**Gabarito:** B

---

## ITEM 28 — Bloco OR em FBD

- **Capacidade:** C1

**Comando:**  
Em Blocos de Função, um bloco OR com duas entradas tem saída 1 quando:

**Alternativas:**
- A) As duas entradas valem 1.
- B) As duas entradas valem 0.
- C) Pelo menos uma entrada vale 1.
- D) As entradas são iguais.

**Gabarito:** C

---

## ITEM 29 — Software de programação

- **Capacidade:** C1

**Comando:**  
O que se faz no software de programação/simulador do CLP nesta aula?

**Alternativas:**
- A) Editar fotos.
- B) Calcular a folha de pagamento.
- C) Apagar o programa das máquinas da fábrica.
- D) Abrir programas prontos, colocá-los em RUN e observar o caminho da "energia".

**Gabarito:** D

---

## ITEM 30 — Caminho da energia

- **Capacidade:** C1

**Comando:**  
No simulador, o que significa uma rede "energizada" (destacada em cor)?

**Alternativas:**
- A) Que a máquina está desligada.
- B) Que a rede tem erro.
- C) Que o CLP está em STOP.
- D) Que existe caminho fechado até a bobina, que está ligada.

**Gabarito:** D

---

## ITEM 31 — Comentários no programa

- **Capacidade:** C1

**Comando:**  
Por que é importante comentar as redes do programa?

**Alternativas:**
- A) Para esconder o funcionamento.
- B) Para deixar o programa mais lento.
- C) Para que outras pessoas entendam rapidamente o que cada rede faz.
- D) Porque o CLP só executa redes comentadas.

**Gabarito:** C

---

## ITEM 32 — Comentário adequado

- **Capacidade:** C1

**Contexto:**  
Rede: contato NA do sensor de caixa (I0.1) em série com o contato NF de "esteira cheia" (I0.2), ligados ao motor da esteira (Q0.0).

**Comando:**  
Qual comentário descreve melhor a rede?

**Alternativas:**
- A) "Liga a esteira quando a esteira está cheia."
- B) "Desliga a esteira sempre."
- C) "Rede de teste, ignorar."
- D) "Liga a esteira quando há caixa e a esteira não está cheia."

**Gabarito:** D

---

## ITEM 33 — Endereço no contato

- **Capacidade:** C1

**Comando:**  
O que indica o endereço escrito acima de um contato no Ladder (por exemplo, I0.1)?

**Alternativas:**
- A) A tensão do contato.
- B) O tempo de varredura.
- C) Qual entrada (ou variável) controla aquele contato.
- D) O número da rede.

**Gabarito:** C

---

## ITEM 34 — Mesmo endereço em vários contatos

- **Capacidade:** C1

**Comando:**  
Um mesmo endereço de entrada pode aparecer em vários contatos do programa?

**Alternativas:**
- A) Sim; ele pode ser usado quantas vezes for necessário.
- B) Só em CLPs modulares.
- C) Não, cada entrada só pode ser usada uma vez.
- D) Só se for contato NF.

**Gabarito:** A

---

## ITEM 35 — Bobina duplicada

- **Capacidade:** C1

**Comando:**  
Por que se deve evitar usar a mesma bobina de saída em duas redes diferentes?

**Alternativas:**
- A) Porque a última rede executada sobrescreve a anterior, causando comportamento confuso.
- B) Porque é proibido pelo fabricante do sensor.
- C) Porque o CLP queima.
- D) Porque a saída fica mais forte.

**Gabarito:** A

---

## ITEM 36 — Esteira de paletes — rede 1

- **Capacidade:** C1

**Contexto:**  
Programa da esteira de paletes da Logimóveis, rede 1: contato NA "palete presente" em série com contato NF "fim da esteira", ligados à bobina "motor".

**Comando:**  
O que a rede faz?

**Alternativas:**
- A) Liga o motor quando não há palete.
- B) Liga o motor quando há palete e ele ainda não chegou ao fim da esteira.
- C) Desliga o motor quando há palete.
- D) Liga o motor quando o palete chega ao fim.

**Gabarito:** B

---

## ITEM 37 — Esteira de paletes — rede 2

- **Capacidade:** C1

**Contexto:**  
Rede 2: contato NA "fim da esteira" ligado à bobina "lâmpada de retirada".

**Comando:**  
O que a rede faz?

**Alternativas:**
- A) Desliga o motor.
- B) Conta os paletes.
- C) Acende a lâmpada quando o palete chega ao fim da esteira.
- D) Acende a lâmpada quando a esteira está vazia.

**Gabarito:** C

---

## ITEM 38 — Esteira de paletes — rede 3

- **Capacidade:** C1

**Contexto:**  
Rede 3: contatos NA "emergência 1" e "emergência 2" em paralelo, ligados à bobina "alarme".

**Comando:**  
Qual é a expressão lógica do alarme?

**Alternativas:**
- A) ALARME = EMERG1 + EMERG2.
- B) ALARME = EMERG1 · EMERG2.
- C) ALARME = (EMERG1 + EMERG2) invertido.
- D) ALARME = EMERG1 ⊕ EMERG2.

**Gabarito:** A

---

## ITEM 39 — Esteira de paletes — rede 4

- **Capacidade:** C1

**Contexto:**  
Rede 4: contato NF "alarme" ligado à bobina "liberação da linha".

**Comando:**  
Quando a linha fica liberada?

**Alternativas:**
- A) Quando o alarme está ligado.
- B) Quando o alarme está desligado.
- C) Sempre.
- D) Nunca.

**Gabarito:** B

---

## ITEM 40 — Teste no CLP real

- **Capacidade:** C1

**Comando:**  
Quando um programa pode ser testado no CLP real da bancada?

**Alternativas:**
- A) Nunca, só no papel.
- B) A qualquer momento, por qualquer aprendiz.
- C) Somente com a bancada liberada pelo docente.
- D) Somente com a porta do painel aberta e energizada.

**Gabarito:** C

---

## ITEM 41 — Programa de máquina em produção

- **Capacidade:** C1

**Comando:**  
O operador percebe uma "melhoria" possível no programa de uma máquina em produção. O que deve fazer?

**Alternativas:**
- A) Alterar o programa no intervalo.
- B) Registrar a sugestão e encaminhar ao líder; nunca alterar o programa por conta própria.
- C) Pedir a senha a um colega e alterar.
- D) Alterar e testar com a máquina produzindo.

**Gabarito:** B

---

## ITEM 42 — Ladder × FBD

- **Capacidade:** C1

**Comando:**  
Qual afirmação compara corretamente Ladder e Blocos de Função?

**Alternativas:**
- A) O Ladder só funciona com sinais analógicos.
- B) Os dois são gráficos e podem representar a mesma lógica.
- C) O FBD não representa funções lógicas.
- D) O Ladder é textual e o FBD é gráfico.

**Gabarito:** B

---

## ITEM 43 — Lista de Instruções

- **Capacidade:** C1

**Comando:**  
A Lista de Instruções (IL) é uma linguagem:

**Alternativas:**
- A) Textual, parecida com assembly, encontrada em sistemas mais antigos.
- B) De etapas e transições.
- C) De blocos coloridos para crianças.
- D) Gráfica, com contatos e bobinas.

**Gabarito:** A

---

## ITEM 44 — Contato de saída no programa

- **Capacidade:** C1

**Comando:**  
O que significa usar um contato da própria saída Q0.0 em uma rede?

**Alternativas:**
- A) Usar o estado da saída Q0.0 como condição dentro do programa.
- B) Medir a corrente do motor.
- C) Ligar um sensor na saída.
- D) Apagar a saída Q0.0.

**Gabarito:** A

---

## ITEM 45 — Rede sem condição

- **Capacidade:** C1

**Contexto:**  
Uma rede tem apenas a bobina Q0.7, ligada diretamente à linha da esquerda, sem nenhum contato.

**Comando:**  
Como fica Q0.7 com o CLP em RUN?

**Alternativas:**
- A) Sempre ligada.
- B) Pisca a cada ciclo.
- C) Liga só com o botão de partida.
- D) Sempre desligada.

**Gabarito:** A

---

## ITEM 46 — Mistura série e paralelo

- **Capacidade:** C1

**Contexto:**  
Rede: (I0.0 em paralelo com I0.1) em série com I0.2, ligados à bobina Q0.0.

**Comando:**  
Qual expressão representa a rede?

**Alternativas:**
- A) Q0.0 = I0.0 + I0.1 + I0.2.
- B) Q0.0 = I0.0 · I0.1 · I0.2.
- C) Q0.0 = I0.0 · I0.1 + I0.2.
- D) Q0.0 = (I0.0 + I0.1) · I0.2.

**Gabarito:** D

---

## ITEM 47 — Prever a saída da rede mista

- **Capacidade:** C1

**Contexto:**  
Rede: (I0.0 em paralelo com I0.1) em série com I0.2, ligados a Q0.0. Estado: I0.0 = 0, I0.1 = 1, I0.2 = 1.

**Comando:**  
Qual é o estado de Q0.0?

**Alternativas:**
- A) 1 (ligada).
- B) Indefinido.
- C) Pisca.
- D) 0 (desligada).

**Gabarito:** A

---

## ITEM 48 — Outra previsão da rede mista

- **Capacidade:** C1

**Contexto:**  
Mesma rede: (I0.0 em paralelo com I0.1) em série com I0.2. Estado: I0.0 = 1, I0.1 = 1, I0.2 = 0.

**Comando:**  
Qual é o estado de Q0.0?

**Alternativas:**
- A) 0 (desligada).
- B) Pisca.
- C) 1 (ligada).
- D) Indefinido.

**Gabarito:** A

---

## ITEM 49 — Converter frase em Ladder

- **Capacidade:** C1

**Contexto:**  
Frase: "A bomba liga se o botão de partida estiver pressionado e o nível do tanque não estiver alto."

**Comando:**  
Como fica a rede?

**Alternativas:**
- A) Contatos do botão e do nível alto em paralelo.
- B) Contato NF do botão em série com contato NA do nível alto.
- C) Contato NA do botão em série com contato NF do nível alto, ligados à bobina da bomba.
- D) Somente a bobina da bomba, sem contatos.

**Gabarito:** C

---

## ITEM 50 — Por que ler o programa

- **Capacidade:** C1

**Comando:**  
Por que o operador precisa saber ler um programa Ladder simples?

**Alternativas:**
- A) Para reescrever o programa da fábrica.
- B) Porque a IHM não funciona sem isso.
- C) Para substituir o programador.
- D) Para entender por que a máquina não parte e explicar a falha à manutenção.

**Gabarito:** D

---
