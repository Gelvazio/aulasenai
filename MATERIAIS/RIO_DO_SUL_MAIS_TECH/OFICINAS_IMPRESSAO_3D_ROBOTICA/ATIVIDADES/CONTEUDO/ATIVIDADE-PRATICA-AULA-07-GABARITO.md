# Padrão de Resposta — Atividade Prática — Aula 07 — Programação de Robôs Simples (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Programação de Robôs Simples.
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** a aplicação certa na situação **e** a justificativa,
   quando o tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do
   tema, conceito trocado ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** valores de tempo, distância e ângulo diferentes dos do padrão,
   desde que a lógica do programa esteja certa; sinônimos (repetir = laço = loop; condição = decisão;
   depurar = testar e corrigir; atuador = motor; controlador = placa); ordem diferente das partes
   da resposta; blocos escritos com outras palavras (andar = avançar = mover para frente).
5. **Erros de português não descontam** se a ideia estiver clara.

---

### ITEM 01-a
**Resposta esperada:** O Blockly é uma linguagem de programação visual: cada comando é um bloco que se encaixa em outro, sem precisar digitar código em texto.
**Critérios:** Nota cheia: diz que é uma linguagem de blocos e que é visual por usar blocos encaixáveis. Metade: só uma dessas ideias. Zero: conceito errado ou em branco.

### ITEM 01-b
**Resposta esperada:** Os blocos se encaixam um no outro e o programa é lido e executado de cima para baixo, na ordem em que estão encaixados (sequência); alguns blocos, como repetição e condição, guardam outros blocos dentro deles.
**Critérios:** Nota cheia: fala do encaixe e da execução de cima para baixo (ou da ordem). Metade: só um dos dois. Zero: sem relação.

### ITEM 01-c
**Resposta esperada:** Exemplos: é mais fácil de entender e montar; não exige decorar a escrita dos comandos; evita erros de digitação e de sintaxe; dá para ver a lógica do programa; permite testar blocos aos poucos.
**Critérios:** Nota cheia: duas vantagens coerentes. Metade: uma. Zero: nenhuma coerente.

### ITEM 02-a
**Resposta esperada:** De cima para baixo, um bloco depois do outro, na ordem em que estão encaixados.
**Critérios:** Nota cheia: diz de cima para baixo (ou na ordem de encaixe). Metade: diz só "em ordem" sem indicar o sentido. Zero: errado ou em branco.

### ITEM 02-b
**Resposta esperada:** O robô primeiro gira 90° à direita, depois anda 2 s, anda mais 1 s e para. Isso não é o que se queria porque o giro veio antes de o robô andar o primeiro trecho: a ordem dos blocos mudou o trajeto.
**Critérios:** Nota cheia: descreve a execução na ordem recebida (gira primeiro) e relaciona a ordem ao trajeto errado. Metade: só descreve a execução ou só diz que a ordem está errada. Zero: sem relação.

### ITEM 02-c
**Resposta esperada:** 1) andar 2 s; 2) girar 90° à direita; 3) andar 1 s; 4) parar.
**Critérios:** Nota cheia: os quatro blocos na ordem certa. Metade: os quatro blocos com uma troca de posição. Zero: ordem muito diferente ou em branco.

### ITEM 03-a
**Resposta esperada:** O bloco de repetição executa os blocos que estão dentro dele o número de vezes indicado. Evita copiar o mesmo grupo de blocos várias vezes.
**Critérios:** Nota cheia: explica que repete os blocos de dentro e que evita copiar blocos. Metade: só um. Zero: errado ou em branco.

### ITEM 03-b
**Resposta esperada:** Repetir 4 vezes: andar (um lado) e girar 90°. Os dois blocos, andar e girar, ficam dentro da repetição.
**Critérios:** Nota cheia: repetir 4 vezes com andar e girar 90° dentro. Metade: acerta os blocos de dentro mas erra o número de repetições (ou o inverso). Zero: não usa repetição ou em branco.

### ITEM 03-c
**Resposta esperada:** Com a repetição, o tamanho do lado fica em um único bloco "andar"; basta mudar esse valor uma vez, em vez de alterar quatro blocos copiados, o que reduz erros e economiza tempo.
**Critérios:** Nota cheia: diz que se altera o valor em um só lugar e que isso evita erro ou poupa trabalho. Metade: só uma dessas ideias. Zero: sem relação.

### ITEM 04-a
**Resposta esperada:** A condição faz o robô decidir o que fazer a partir de uma situação (como a leitura de um sensor): se algo é verdadeiro, executa uma ação; senão, executa outra.
**Critérios:** Nota cheia: diz que serve para decidir a ação conforme uma situação ou sensor. Metade: fala só de "se ... então" sem explicar a decisão. Zero: errado ou em branco.

### ITEM 04-b
**Resposta esperada:** Se distância (do sensor) menor que um valor (por exemplo, 15 cm), então parar; senão, andar para frente.
**Critérios:** Nota cheia: condição com o teste do sensor, ação de parar no "então" e andar no "senão". Metade: estrutura certa com as ações trocadas ou sem o valor da distância. Zero: sem condição ou em branco.

### ITEM 04-c
**Resposta esperada:** Sequência: os blocos executam um após o outro, sempre do mesmo jeito (por exemplo, andar, girar, andar). Condição: o robô escolhe entre caminhos conforme o sensor (por exemplo, parar se houver obstáculo).
**Critérios:** Nota cheia: diferencia as duas e dá uma situação para cada. Metade: diferencia sem dar situações, ou dá a situação de só uma. Zero: trocadas ou em branco.

### ITEM 05-a
**Resposta esperada:** Trajetória é o caminho que o robô percorre; ele é formado por pontos que o robô visita em ordem.
**Critérios:** Nota cheia: define trajetória como caminho e pontos visitados em ordem. Metade: só uma das ideias. Zero: errado ou em branco.

### ITEM 05-b
**Resposta esperada:** Para cada trecho é preciso definir a distância (por tempo ou por voltas de roda) e a direção (o ângulo do giro). Ex.: trecho longo, andar 2 s; curva, girar 90° à direita; trecho curto, andar 1 s.
**Critérios:** Nota cheia: cita distância e direção (ângulo) para os trechos. Metade: cita só um dos dois. Zero: sem relação.

### ITEM 05-c
**Resposta esperada:** Exemplo: andar 2 s; girar 90° à direita; andar 1 s; parar.
**Critérios:** Nota cheia: trecho longo, giro de 90° à direita, trecho curto e parar, em ordem, com valores. Metade: falta um bloco ou os valores. Zero: ordem sem lógica ou em branco.

### ITEM 06-a
**Resposta esperada:** Dois giros, de 90° cada, os dois para a direita.
**Critérios:** Nota cheia: dois giros de 90°. Metade: acerta a quantidade ou o ângulo, mas não os dois. Zero: errado ou em branco.

### ITEM 06-b
**Resposta esperada:** Exemplo: andar 2 s; girar 90° à direita; andar 1 s; girar 90° à direita; andar 2 s; parar.
**Critérios:** Nota cheia: andar, dois giros de 90° à direita separados por um trecho, andar de volta e parar. Metade: falta um bloco ou o trecho do meio. Zero: não forma um U ou em branco.

### ITEM 06-c
**Resposta esperada:** A distância pode ser medida pelo tempo que o robô anda (segundos) ou pelas voltas da roda; define-se o valor, testa-se e ajusta-se até o trecho ficar do tamanho marcado no chão.
**Critérios:** Nota cheia: cita tempo ou voltas de roda e o teste com ajuste. Metade: cita só tempo ou voltas de roda. Zero: sem relação.

### ITEM 07-a
**Resposta esperada:** É a diferença entre o percurso planejado e o real que vai aumentando a cada trecho ou teste, porque pequenos desvios do robô se somam.
**Critérios:** Nota cheia: diz que é uma diferença ou desvio que se acumula. Metade: só fala que o robô erra, sem a ideia de acúmulo. Zero: errado ou em branco.

### ITEM 07-b
**Resposta esperada:** Exemplos: patinação das rodas; bateria fraca (menos velocidade); piso diferente; roda desalinhada.
**Critérios:** Nota cheia: duas causas coerentes. Metade: uma. Zero: nenhuma coerente.

### ITEM 07-c
**Resposta esperada:** Porque o robô real não repete exatamente o planejado; só testando se vê o desvio e só ajustando os valores (tempos e ângulos) o trajeto fica correto.
**Critérios:** Nota cheia: diz que o robô real desvia e que o teste e o ajuste corrigem. Metade: só uma dessas ideias. Zero: sem relação.

### ITEM 08-a
**Resposta esperada:** Repetir sempre: se distância < 15 cm então parar e girar 90°, senão andar para frente.
**Critérios:** Nota cheia: repetição, condição com a distância e as duas ações. Metade: falta a repetição ou o "senão". Zero: sem condição ou em branco.

### ITEM 08-b
**Resposta esperada:** Com distância menor que 15 cm, o robô para e gira 90° para sair da frente do obstáculo; com distância maior, ele segue andando para frente.
**Critérios:** Nota cheia: descreve as duas situações. Metade: descreve só uma. Zero: errado ou em branco.

### ITEM 08-c
**Resposta esperada:** O sensor mede a distância, o controlador lê a medida e decide pela condição, e o atuador (motor) executa a ação de parar, girar ou andar. Sem um deles, o robô não percebe, decide ou se move.
**Critérios:** Nota cheia: dá o papel de sensor, controlador e atuador no programa. Metade: dá o papel de dois deles. Zero: um ou nenhum.

### ITEM 09-a
**Resposta esperada:** Depurar é encontrar e corrigir o que faz o programa se comportar diferente do esperado, testando e ajustando.
**Critérios:** Nota cheia: encontrar e corrigir o comportamento errado. Metade: só uma dessas ideias. Zero: errado ou em branco.

### ITEM 09-b
**Resposta esperada:** 1) executar e observar onde o comportamento foge do esperado; 2) testar um bloco de cada vez (ou um trecho curto); 3) alterar um valor por vez e testar de novo; 4) anotar o que funcionou.
**Critérios:** Nota cheia: pelo menos três dos quatro passos em ordem coerente. Metade: dois passos. Zero: um ou nenhum.

### ITEM 09-c
**Resposta esperada:** Alterando um valor por vez, a equipe sabe qual mudança causou o efeito, e anotar o que funcionou permite repetir a solução no projeto. Mudar tudo de uma vez esconde a causa do problema.
**Critérios:** Nota cheia: explica que um valor por vez mostra a causa e que a anotação permite repetir. Metade: só uma dessas ideias. Zero: sem relação.

### ITEM 10-a
**Resposta esperada:** O sensor sente o obstáculo, o controlador decide e o atuador (motor) movimenta o robô.
**Critérios:** Nota cheia: as três partes certas. Metade: duas. Zero: uma ou nenhuma.

### ITEM 10-b
**Resposta esperada:** Repetir sempre: se o sensor detectar obstáculo à frente, então parar (e esperar ou desviar); senão, seguir a rota programada (andar, girar nos pontos do trajeto) até o ponto final e parar.
**Critérios:** Nota cheia: rota em sequência e condição de obstáculo com a ação de parar ou desviar. Metade: só a rota ou só a condição. Zero: sem lógica ou em branco.

### ITEM 10-c
**Resposta esperada:** Exemplos: o programa em blocos (captura ou foto); o robô cumprindo o trajeto; os ajustes feitos (valores que mudaram e por quê); resultado dos testes.
**Critérios:** Nota cheia: três informações coerentes com a entrega da aula. Metade: duas. Zero: uma ou nenhuma.
