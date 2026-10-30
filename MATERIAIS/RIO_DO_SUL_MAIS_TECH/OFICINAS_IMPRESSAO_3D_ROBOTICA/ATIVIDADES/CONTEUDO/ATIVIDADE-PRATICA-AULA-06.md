# Atividade: Atividade Prática — Aula 06 — 10 Questões Discursivas

- **Aula:** AP-06
- **Rótulo da aula:** Atividade Prática — Aula 06
- **Tema:** Componentes de Robôs
- **Ícone:** 🤖
- **Duração:** 90–120 minutos
- **Formato:** Discursiva prática (identificar componentes, explicar o ciclo sensor–controlador–atuador, escolher motores e diagnosticar ligações, com resposta escrita em cada tópico)
- **Total de questões:** 10
- **Pontuação:** 1 ponto por questão, dividido entre os tópicos (total: 10 pontos)
- **Capacidade avaliada:** Entender os componentes fundamentais de um robô (sensores, atuadores, motores, controladores) e explicar como um sensor ligado a um motor faz o robô responder ao ambiente.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois (com apoio de IA e revisão do professor).
- **Folha de respostas:** sim
- **Aula no banco:** 6

**Seu papel em todas as questões:** Você, como aluno consultor, analisa a situação real de cada questão (kits robóticos, sensores, motores e controladores da aula) e resolve o problema com explicações claras, usando os termos sensor, controlador e atuador.

**Produto da aula:** ao longo das questões você identifica os componentes de um robô, explica o ciclo sensor–controlador–atuador e diagnostica por que um motor não respondeu ao sensor.

**Como responder:** Cada questão tem tópicos. Escreva a resposta de **cada tópico no seu campo**, com frases completas e com as suas palavras. Quando o comando pedir um texto (relatório, esquema descrito), escreva o texto inteiro. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

---

## ITEM 01 — Anatomia de um Robô

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, recebeu uma caixa com as peças de um robô desmontado: uma placa de microcontrolador, um sensor ultrassônico, um motor com driver, uma bateria, um chassi impresso em 3D e uma luz de LED.

**Comando:**
Organize as peças pelos grupos de componentes de um robô.

**Tópicos:**
- a) Classifique cada peça da caixa em um dos grupos: sensor, controlador, atuador, fonte de energia ou estrutura. (0,3)
- b) Explique a função do controlador no robô. (0,3)
- c) Explique o que a fonte de energia e a estrutura (chassi) fazem pelo robô. (0,4)

---

## ITEM 02 — Escolha do Sensor

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, precisa indicar o sensor ideal para quatro necessidades de um robô: (1) medir a distância até uma parede; (2) saber se o robô encostou em um objeto; (3) medir se o ambiente está claro ou escuro; (4) seguir uma linha desenhada no chão, detectando o contraste.

**Comando:**
Escolha e explique os sensores.

**Tópicos:**
- a) Indique o tipo de sensor mais adequado para cada uma das quatro necessidades. (0,3)
- b) Explique como o sensor ultrassônico mede a distância. (0,3)
- c) Explique o que o sensor entrega ao controlador e dê dois exemplos desse sinal. (0,4)

---

## ITEM 03 — Ciclo Sensor–Controlador–Atuador

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, analisa um AGV de logística (veículo autônomo que transporta cargas). Ao perceber uma pessoa a menos de 1 metro, o controlador manda o motor parar.

**Comando:**
Explique como o robô toma essa decisão.

**Tópicos:**
- a) Descreva as três etapas do ciclo (o que o sensor, o controlador e o atuador fazem nessa situação). (0,4)
- b) Escreva a regra do programa que o controlador usa para decidir parar o motor. (0,3)
- c) Explique por que esse ciclo precisa se repetir muitas vezes por segundo. (0,3)

---

## ITEM 04 — Motor DC ou Servomotor

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, precisa escolher o motor para duas partes de um robô: (1) as rodas, que devem girar continuamente; (2) uma garra, que deve abrir até um ângulo exato.

**Comando:**
Escolha e justifique o motor de cada parte.

**Tópicos:**
- a) Indique o motor mais adequado para as rodas e o mais adequado para a garra. (0,3)
- b) Explique a diferença de funcionamento entre o motor DC e o servomotor. (0,4)
- c) Explique de que depende a velocidade do motor DC e qual faixa de ângulo costuma ter o servomotor. (0,3)

---

## ITEM 05 — Por Que Usar o Driver

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Um colega ligou o motor direto no pino da placa controladora, e o motor não girou direito. Você, como aluno consultor, foi chamado para explicar o problema.

**Comando:**
Explique o erro e proponha a correção.

**Tópicos:**
- a) Explique por que o motor não deve ser ligado direto na placa controladora. (0,4)
- b) Diga o que é o driver (ponte H) e o que ele faz entre a placa e o motor. (0,3)
- c) Indique a outra solução, além do driver, que a aula cita para alimentar o motor. (0,3)

---

## ITEM 06 — Segurança na Montagem

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai orientar um grupo que está montando o kit robótico: um aluno quer alterar um fio com a bateria conectada e há fios soltos sobre a bancada.

**Comando:**
Oriente o grupo sobre a segurança.

**Tópicos:**
- a) Aponte dois cuidados de segurança que o grupo deve ter ao ligar a bateria. (0,4)
- b) Explique o que o aluno deve fazer antes de alterar a montagem. (0,3)
- c) Explique por que é importante conferir a polaridade (positivo e negativo) antes de ligar. (0,3)

---

## ITEM 07 — O Motor Não Parou

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, precisa explicar a uma equipe de manutenção por que o motor não parou quando o sensor detectou o obstáculo.

**Comando:**
Faça o diagnóstico do problema.

**Tópicos:**
- a) Liste três pontos da ligação ou dos componentes que você verificaria. (0,4)
- b) Diga o que verificar no programa carregado na placa para o motor parar. (0,3)
- c) Explique como você testaria depois da correção e o que registraria. (0,3)

---

## ITEM 08 — Ligando o Sensor ao Motor

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Na prática da aula, você, como aluno consultor, orienta um grupo a ligar um sensor de distância a um motor usando o kit (placa controladora, sensor, motor com driver, bateria e cabos).

**Comando:**
Descreva a montagem e o teste.

**Tópicos:**
- a) Descreva, em ordem, os passos para montar e testar o conjunto. (0,4)
- b) Diga o que deve acontecer com o motor quando a mão se aproxima do sensor. (0,3)
- c) Explique o que o grupo deve registrar ao aproximar e afastar a mão ou o objeto. (0,3)

---

## ITEM 09 — Escolha de Componentes para um Projeto

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Você, como aluno consultor, vai montar um robô que acende uma luz quando o ambiente ficar escuro e fecha uma garra quando o botão de toque for pressionado.

**Comando:**
Escolha os componentes do projeto.

**Tópicos:**
- a) Indique os dois sensores necessários para o projeto. (0,3)
- b) Indique os atuadores necessários e o motor mais adequado para a garra. (0,4)
- c) Explique o papel do controlador nesse projeto. (0,3)

---

## ITEM 10 — Relatório da Prática

- **Aula:** 06 · Componentes de Robôs
- **Capacidade:** C5

**Contexto:**
Ao final da prática, você, como aluno consultor, precisa entregar o esquema da ligação e o relatório com sensor, controlador, atuador e a resposta observada.

**Comando:**
Redija o esquema e o relatório da sua prática.

**Tópicos:**
- a) Descreva o esquema da ligação em palavras, na ordem em que o sinal percorre os componentes. (0,4)
- b) Escreva o relatório curto com as palavras sensor, controlador e atuador e a resposta observada no teste. (0,3)
- c) Explique o que o controlador faz com o sinal do sensor. (0,3)

---
