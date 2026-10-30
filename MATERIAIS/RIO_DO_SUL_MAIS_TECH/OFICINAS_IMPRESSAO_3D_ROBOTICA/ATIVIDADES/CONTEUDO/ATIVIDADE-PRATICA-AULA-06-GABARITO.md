# Padrão de Resposta — Atividade Prática da Aula 06 (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo fora do Git (`*gabarito*`). Não publicar. O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado.

**Regra geral de correção de cada tópico:** nota cheia = atende a todos os critérios com as palavras do aluno; metade = atende parcialmente; zero = em branco, errado, fora do tema ou copiado. Erros de português só tiram nota quando atrapalham a compreensão.

---

### ITEM 01-a
**Resposta esperada:** Placa de microcontrolador: controlador. Sensor ultrassônico: sensor. Motor com driver: atuador. LED: atuador. Bateria: fonte de energia. Chassi impresso em 3D: estrutura.
**Critérios:** Nota cheia: as seis peças corretas. Metade: quatro ou cinco certas. Zero: três ou menos.

### ITEM 01-b
**Resposta esperada:** O controlador é o "cérebro" do robô: lê os sinais dos sensores e executa o programa, decidindo o que os atuadores devem fazer.
**Critérios:** Nota cheia: cita a leitura dos sensores e a execução do programa/decisão sobre os atuadores. Metade: cita só "cérebro" ou só um dos dois. Zero: função errada ou em branco.

### ITEM 01-c
**Resposta esperada:** A fonte de energia (baterias) alimenta os componentes do robô; a estrutura (chassi, que pode ser impresso em 3D) sustenta e organiza os componentes.
**Critérios:** Nota cheia: explica as duas funções. Metade: explica uma. Zero: nenhuma ou trocadas.

### ITEM 02-a
**Resposta esperada:** (1) ultrassônico; (2) toque (botão); (3) luz (LDR); (4) infravermelho / de linha.
**Critérios:** Nota cheia: as quatro corretas. Metade: duas ou três. Zero: uma ou nenhuma.

### ITEM 02-b
**Resposta esperada:** O sensor ultrassônico mede a distância pelo tempo de ida e volta do som: emite o som, ele bate no objeto e volta; quanto maior o tempo, maior a distância.
**Critérios:** Nota cheia: cita o som e o tempo de ida e volta. Metade: cita só um dos dois. Zero: explicação errada.

### ITEM 02-c
**Resposta esperada:** O sensor entrega um sinal ao controlador, que pode ser ligado/desligado (por exemplo, botão pressionado ou não) ou um valor (por exemplo, a distância ou a luminosidade).
**Critérios:** Nota cheia: diz que entrega um sinal e dá dois exemplos coerentes. Metade: diz o sinal com um exemplo, ou dois exemplos sem dizer que é sinal. Zero: sem relação.

### ITEM 03-a
**Resposta esperada:** O sensor mede a distância até a pessoa; o controlador compara o valor com a regra do programa; o atuador (motor) responde parando.
**Critérios:** Nota cheia: as três etapas na função certa. Metade: duas certas. Zero: uma ou nenhuma.

### ITEM 03-b
**Resposta esperada:** Se a distância for menor que 1 metro (100 cm), então parar o motor.
**Critérios:** Nota cheia: condição com a distância e a ação de parar o motor. Metade: só a condição ou só a ação. Zero: regra sem relação com a situação.

### ITEM 03-c
**Resposta esperada:** Porque o ambiente muda o tempo todo; repetindo o ciclo muitas vezes por segundo o robô percebe a pessoa a tempo e responde rapidamente.
**Critérios:** Nota cheia: cita a mudança do ambiente/ou a necessidade de resposta rápida. Metade: só diz que "repete" sem explicar. Zero: sem relação.

### ITEM 04-a
**Resposta esperada:** Rodas: motor DC. Garra: servomotor.
**Critérios:** Nota cheia: os dois corretos. Metade: um correto. Zero: ambos errados.

### ITEM 04-b
**Resposta esperada:** O motor DC gira continuamente; o servomotor gira até um ângulo definido e para nele.
**Critérios:** Nota cheia: explica o giro contínuo e o giro até ângulo definido. Metade: explica só um. Zero: troca as definições.

### ITEM 04-c
**Resposta esperada:** A velocidade do motor DC depende da tensão e do sinal enviado; o servomotor costuma girar de 0° a 180°.
**Critérios:** Nota cheia: cita tensão e/ou sinal enviado e a faixa de 0° a 180°. Metade: acerta só um. Zero: nenhum.

### ITEM 05-a
**Resposta esperada:** Porque o motor exige mais corrente do que a placa controladora consegue fornecer; ligado direto, o motor não funciona direito e pode prejudicar a placa.
**Critérios:** Nota cheia: cita que o motor exige mais corrente que a placa fornece. Metade: diz que "não funciona" sem a causa. Zero: sem relação.

### ITEM 05-b
**Resposta esperada:** O driver (ponte H) fica entre a placa e o motor: recebe o comando da placa e entrega ao motor a corrente necessária.
**Critérios:** Nota cheia: diz onde fica e que fornece corrente/aciona o motor conforme o comando. Metade: diz só um aspecto. Zero: errado.

### ITEM 05-c
**Resposta esperada:** Usar uma fonte própria para o motor.
**Critérios:** Nota cheia: fonte própria (alimentação separada). Zero: outra resposta.

### ITEM 06-a
**Resposta esperada:** Exemplos: não ligar a bateria com fios soltos; conferir a polaridade; ligar a bateria só depois de a montagem estar conferida.
**Critérios:** Nota cheia: dois cuidados coerentes com a aula. Metade: um. Zero: nenhum coerente.

### ITEM 06-b
**Resposta esperada:** Desligar a bateria antes de alterar a montagem.
**Critérios:** Nota cheia: desligar antes de mexer. Metade: diz "ter cuidado" sem desligar. Zero: orienta mexer ligado.

### ITEM 06-c
**Resposta esperada:** Porque o positivo e o negativo precisam estar nos terminais certos; ligação invertida pode danificar componentes e comprometer o funcionamento.
**Critérios:** Nota cheia: cita ligar nos terminais certos e o risco/erro de funcionamento. Metade: cita só um. Zero: sem relação.

### ITEM 07-a
**Resposta esperada:** Exemplos: se o sensor está ligado à placa conforme o esquema; se o motor e o driver estão ligados corretamente; se a bateria/fonte está ligada e com polaridade certa; se os cabos estão firmes.
**Critérios:** Nota cheia: três pontos coerentes. Metade: dois. Zero: um ou nenhum.

### ITEM 07-b
**Resposta esperada:** Verificar se o programa de teste foi carregado e se a regra compara a distância do sensor e manda o motor parar quando o obstáculo é detectado.
**Critérios:** Nota cheia: cita o programa carregado e a regra de parar na detecção. Metade: cita só um. Zero: sem relação.

### ITEM 07-c
**Resposta esperada:** Aproximar a mão ou o objeto do sensor, observar se o motor para e registrar o que mudou.
**Critérios:** Nota cheia: descreve o teste com aproximação e o registro do que mudou. Metade: só o teste ou só o registro. Zero: sem relação.

### ITEM 08-a
**Resposta esperada:** Identificar cada componente do kit e sua função; ligar o sensor e o motor à placa seguindo o esquema do professor; carregar o programa de teste; observar a resposta do motor.
**Critérios:** Nota cheia: pelo menos três passos na ordem certa. Metade: dois. Zero: um ou nenhum.

### ITEM 08-b
**Resposta esperada:** O motor liga ou para ao detectar a mão (conforme o programa de teste).
**Critérios:** Nota cheia: indica que o motor muda de estado (liga ou para) quando o sensor detecta. Metade: resposta vaga. Zero: diz que nada muda ou errado.

### ITEM 08-c
**Resposta esperada:** O que mudou na resposta do motor ao aproximar a mão ou o objeto (e ao afastar).
**Critérios:** Nota cheia: registra a resposta do motor em função da aproximação. Metade: registro vago. Zero: sem relação.

### ITEM 09-a
**Resposta esperada:** Sensor de luz (LDR) e sensor de toque (botão).
**Critérios:** Nota cheia: os dois. Metade: um. Zero: nenhum.

### ITEM 09-b
**Resposta esperada:** Atuadores: a luz (LED) e o motor da garra; o motor mais adequado para a garra é o servomotor, que gira até um ângulo definido.
**Critérios:** Nota cheia: luz, motor da garra e servomotor com justificativa. Metade: dois desses. Zero: um ou nenhum.

### ITEM 09-c
**Resposta esperada:** O controlador lê os sinais dos sensores, compara com as regras do programa (escuro: acender a luz; botão pressionado: fechar a garra) e comanda os atuadores.
**Critérios:** Nota cheia: leitura dos sensores, regra e comando dos atuadores. Metade: dois desses. Zero: um ou nenhum.

### ITEM 10-a
**Resposta esperada:** Exemplo: o sensor envia o sinal à placa controladora; a placa, pelo programa, envia o comando ao driver; o driver aciona o motor com a energia da bateria.
**Critérios:** Nota cheia: sensor, controlador, driver e motor na ordem, com a fonte de energia. Metade: ordem correta mas faltando componente, ou ordem trocada. Zero: sem relação com a montagem.

### ITEM 10-b
**Resposta esperada:** Texto pessoal coerente que usa sensor, controlador e atuador e diz o que o motor fez ao aproximar a mão ou o objeto.
**Critérios:** Nota cheia: as três palavras no papel certo e a resposta observada. Metade: falta uma palavra ou a resposta observada. Zero: sem relação.

### ITEM 10-c
**Resposta esperada:** O controlador compara o valor do sinal do sensor com uma regra do programa e, conforme o resultado, comanda o atuador.
**Critérios:** Nota cheia: cita a comparação com a regra e o comando ao atuador. Metade: cita só um. Zero: sem relação.
