# Atividade: CLP: Arquitetura e Especificação de Hardware — 50 Questões

- **Aula:** 04
- **Tema:** CLP: Arquitetura e Especificação de Hardware
- **Ícone:** 🧩
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Identificar os blocos da arquitetura do CLP, especificar o hardware e usar o endereçamento de entradas e saídas.
- **Conteúdo-base:** `../AULAS/AULA-04.md`
- **Slides:** `—`
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-04-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (arquivo fora do Git).

---

## ITEM 01 — Blocos da arquitetura

- **Capacidade:** C1

**Comando:**  
Quais são os principais blocos da arquitetura de um CLP?

**Alternativas:**
- A) Motor, bomba, válvula e tanque.
- B) Fonte, CPU, memória, cartões de entrada e saída e comunicação.
- C) Teclado, mouse e impressora.
- D) Sensor, cabo e lâmpada.

**Gabarito:** B

---

## ITEM 02 — Função da CPU

- **Capacidade:** C1

**Comando:**  
Qual é a função da CPU do CLP?

**Alternativas:**
- A) Receber sinais dos botões diretamente da fábrica.
- B) Executar o programa e tomar as decisões de comando.
- C) Ligar diretamente os motores de potência.
- D) Converter a tensão da rede.

**Gabarito:** B

---

## ITEM 03 — Função da fonte

- **Capacidade:** C1

**Comando:**  
Qual bloco converte a tensão da rede (por exemplo, 220 Vca) em 24 Vcc para o CLP?

**Alternativas:**
- A) O módulo de comunicação.
- B) A CPU.
- C) O cartão de saídas.
- D) A fonte de alimentação.

**Gabarito:** D

---

## ITEM 04 — Cartão de entradas digitais

- **Capacidade:** C1

**Comando:**  
O que se liga no cartão de entradas digitais?

**Alternativas:**
- A) Motores trifásicos.
- B) Transmissores 4–20 mA.
- C) A rede elétrica de 220 V.
- D) Botões, fins de curso e sensores de liga/desliga.

**Gabarito:** D

---

## ITEM 05 — Cartão de saídas digitais

- **Capacidade:** C1

**Comando:**  
O que o cartão de saídas digitais comanda?

**Alternativas:**
- A) Contatores, válvulas solenoides e sinaleiros.
- B) Botões de emergência.
- C) Transmissores de temperatura.
- D) Sensores indutivos.

**Gabarito:** A

---

## ITEM 06 — Entrada analógica na arquitetura

- **Capacidade:** C1

**Comando:**  
Um transmissor de pressão de 4–20 mA deve ser ligado em qual tipo de cartão?

**Alternativas:**
- A) Saída digital.
- B) Fonte de alimentação.
- C) Entrada analógica.
- D) Entrada digital.

**Gabarito:** C

---

## ITEM 07 — Saída analógica na arquitetura

- **Capacidade:** C1

**Comando:**  
Para enviar ao inversor a referência de velocidade de 0–10 V, usa-se:

**Alternativas:**
- A) Uma entrada digital.
- B) Uma saída analógica.
- C) Uma entrada analógica.
- D) A fonte do CLP.

**Gabarito:** B

---

## ITEM 08 — Módulo de comunicação

- **Capacidade:** C1

**Comando:**  
Qual bloco conecta o CLP à IHM, ao supervisório e ao computador de programação?

**Alternativas:**
- A) A fonte de alimentação.
- B) O borne de terra.
- C) O módulo (ou porta) de comunicação.
- D) O cartão de saídas a relé.

**Gabarito:** C

---

## ITEM 09 — Função da memória

- **Capacidade:** C1

**Comando:**  
O que fica na memória do CLP?

**Alternativas:**
- A) Os desenhos mecânicos da máquina.
- B) O programa e os dados de operação (contadores, temporizadores e variáveis).
- C) Os sensores de reposição.
- D) A energia de reserva da fábrica.

**Gabarito:** B

---

## ITEM 10 — CLP compacto

- **Capacidade:** C1

**Comando:**  
O que caracteriza um CLP compacto?

**Alternativas:**
- A) Uso exclusivo em salas de controle.
- B) Fonte, CPU e E/S reunidos em uma só peça, com quantidade limitada de pontos.
- C) Módulos montados em trilho que podem ser ampliados à vontade.
- D) Ausência de entradas e saídas.

**Gabarito:** B

---

## ITEM 11 — CLP modular

- **Capacidade:** C1

**Comando:**  
O que caracteriza um CLP modular?

**Alternativas:**
- A) Uma única peça sem possibilidade de expansão.
- B) Módulos separados (fonte, CPU, cartões) montados em trilho ou rack, permitindo expansão.
- C) Uso apenas em residências.
- D) Funcionamento sem CPU.

**Gabarito:** B

---

## ITEM 12 — Expansão de pontos

- **Capacidade:** C1

**Contexto:**  
A linha de envase da Sucos Vale Verde vai receber mais 8 sensores, e todas as entradas do CLP já estão ocupadas.

**Comando:**  
Em um CLP modular, qual é a solução?

**Alternativas:**
- A) Ligar os sensores nas saídas.
- B) Acrescentar um cartão de entradas digitais.
- C) Ligar dois sensores na mesma entrada.
- D) Trocar os sensores por lâmpadas.

**Gabarito:** B

---

## ITEM 13 — Escolha entre compacto e modular

- **Capacidade:** C1

**Comando:**  
Para uma linha grande, com muitos sensores e possibilidade de crescer, qual CLP é mais indicado?

**Alternativas:**
- A) Compacto sem expansão.
- B) Um relé temporizador.
- C) Modular.
- D) Uma calculadora programável.

**Gabarito:** C

---

## ITEM 14 — Saída a relé

- **Capacidade:** C1

**Comando:**  
Uma saída a relé é indicada para:

**Alternativas:**
- A) Acionar a bobina de um contator, com contato mecânico robusto.
- B) Alimentar o CLP.
- C) Gerar milhares de pulsos por segundo.
- D) Ler um transmissor analógico.

**Gabarito:** A

---

## ITEM 15 — Saída a transistor

- **Capacidade:** C1

**Comando:**  
Uma saída a transistor é indicada para:

**Alternativas:**
- A) Sinais rápidos e frequentes, em corrente contínua.
- B) Receber botões de emergência.
- C) Comutar cargas de alta potência diretamente.
- D) Medir temperatura.

**Gabarito:** A

---

## ITEM 16 — Especificação de hardware

- **Capacidade:** C1

**Comando:**  
Ao especificar um CLP, quais itens devem ser conferidos?

**Alternativas:**
- A) Apenas o preço.
- B) Tensão da fonte, número e tipo de E/S, tipo de saída, sinais analógicos e portas de comunicação.
- C) Somente a marca preferida do operador.
- D) Apenas a cor do gabinete.

**Gabarito:** B

---

## ITEM 17 — Endereço de entrada

- **Capacidade:** C1

**Comando:**  
O que é o endereço de uma entrada do CLP (por exemplo, I0.3)?

**Alternativas:**
- A) O horário em que a entrada foi ligada.
- B) O número de série do CLP.
- C) A identificação daquele ponto de entrada, usada no programa e na fiação.
- D) A tensão da entrada.

**Gabarito:** C

---

## ITEM 18 — Leitura do endereço I0.3

- **Capacidade:** C1

**Comando:**  
No padrão I0.3, o que indicam a letra I e o número após o ponto?

**Alternativas:**
- A) I indica entrada (input) e 3 é o bit (ponto) dentro do byte 0.
- B) I indica corrente e 3 é a quantidade de cartões.
- C) I indica saída e 3 é a tensão.
- D) I indica intervalo e 3 é o tempo em segundos.

**Gabarito:** A

---

## ITEM 19 — Endereço de saída

- **Capacidade:** C1

**Comando:**  
No padrão I/Q, qual endereço indica uma saída?

**Alternativas:**
- A) I0.0.
- B) T0.
- C) Q0.0.
- D) M0.0.

**Gabarito:** C

---

## ITEM 20 — Byte de entradas

- **Capacidade:** C1

**Comando:**  
Os endereços I0.0 a I0.7 formam:

**Alternativas:**
- A) Um byte com 8 entradas.
- B) Uma palavra com 16 saídas.
- C) Um único bit.
- D) Um nibble com 4 entradas.

**Gabarito:** A

---

## ITEM 21 — Endereçamento e numeração

- **Capacidade:** C1

**Comando:**  
Por que o endereçamento de E/S tem relação com o sistema binário?

**Alternativas:**
- A) Não há relação.
- B) Porque cada ponto é um bit, e os bits são agrupados em bytes.
- C) Porque os endereços só usam números pares.
- D) Porque os endereços são escritos em decimal com vírgula.

**Gabarito:** B

---

## ITEM 22 — Comunicação com a manutenção

- **Capacidade:** C1

**Contexto:**  
O sensor da porta da prensa está ligado na entrada I0.3. O LED dessa entrada não acende quando a porta fecha.

**Comando:**  
Qual é a forma mais precisa de informar a manutenção?

**Alternativas:**
- A) "A entrada I0.3 (sensor da porta) não acende quando a porta fecha."
- B) "Tem algo errado no painel."
- C) "O CLP inteiro queimou."
- D) "A prensa não funciona."

**Gabarito:** A

---

## ITEM 23 — Etiqueta do CLP

- **Capacidade:** C1

**Comando:**  
Que informações costumam estar na etiqueta do CLP?

**Alternativas:**
- A) Fabricante, modelo, tensão de alimentação e número de série.
- B) Os valores de produção do dia.
- C) O nome do operador do turno.
- D) O programa completo da máquina.

**Gabarito:** A

---

## ITEM 24 — Catálogo do fabricante

- **Capacidade:** C1

**Comando:**  
Para que serve o catálogo do fabricante na especificação?

**Alternativas:**
- A) Para registrar a produção diária.
- B) Para trocar a senha da IHM.
- C) Para calcular a folha de pagamento.
- D) Para consultar características, ligações e limites de cada modelo e módulo.

**Gabarito:** D

---

## ITEM 25 — Bornes

- **Capacidade:** C1

**Comando:**  
O que são os bornes do CLP?

**Alternativas:**
- A) As telas da IHM.
- B) As linhas do programa.
- C) Os LEDs de diagnóstico.
- D) Os terminais onde os fios de entradas, saídas e alimentação são conectados.

**Gabarito:** D

---

## ITEM 26 — Trilho DIN

- **Capacidade:** C1

**Comando:**  
Onde normalmente o CLP e seus módulos são fixados dentro do painel?

**Alternativas:**
- A) Direto no chão.
- B) Sobre a máquina, ao ar livre.
- C) Em trilho DIN.
- D) Na porta do painel, sem fixação.

**Gabarito:** C

---

## ITEM 27 — Tensão das entradas

- **Capacidade:** C1

**Contexto:**  
A ficha do CLP indica "entradas 24 Vcc". Um técnico pensa em ligar um sinal de 220 Vca diretamente em uma entrada.

**Comando:**  
O que pode acontecer?

**Alternativas:**
- A) O CLP aumenta a velocidade.
- B) Nada, qualquer tensão serve.
- C) O cartão de entradas pode ser danificado, porque a tensão é incompatível.
- D) A entrada passa a ler temperatura.

**Gabarito:** C

---

## ITEM 28 — Corrente máxima da saída

- **Capacidade:** C1

**Contexto:**  
A ficha indica que a saída a transistor suporta 0,5 A. Um colega quer ligar diretamente um motor de 10 A nessa saída.

**Comando:**  
Qual é a forma correta?

**Alternativas:**
- A) Usar a saída para acionar um contator ou relé, que então liga o motor.
- B) Ligar o motor em uma entrada.
- C) Ligar dois motores na mesma saída.
- D) Ligar o motor diretamente, pois o CLP aguenta.

**Gabarito:** A

---

## ITEM 29 — CPU e varredura

- **Capacidade:** C1

**Comando:**  
Qual bloco do CLP realiza o ciclo de varredura?

**Alternativas:**
- A) A fonte.
- B) O cartão de saídas.
- C) A CPU.
- D) O borne de aterramento.

**Gabarito:** C

---

## ITEM 30 — Bateria ou memória retentiva

- **Capacidade:** C1

**Comando:**  
Por que alguns CLPs têm bateria ou memória retentiva?

**Alternativas:**
- A) Para aquecer o painel.
- B) Para não perder dados importantes, como contadores, quando falta energia.
- C) Para substituir a fonte de alimentação.
- D) Para ligar os motores na falta de energia.

**Gabarito:** B

---

## ITEM 31 — Módulo de E/S remota

- **Capacidade:** C1

**Comando:**  
O que é uma E/S remota?

**Alternativas:**
- A) Uma IHM portátil.
- B) Um módulo de entradas e saídas instalado longe do CLP, ligado a ele por rede.
- C) Um botão sem fio do operador.
- D) Um sensor sem alimentação.

**Gabarito:** B

---

## ITEM 32 — Ficha técnica da bancada

- **Capacidade:** C1

**Comando:**  
Na ficha técnica do CLP da bancada, qual informação é um critério crítico?

**Alternativas:**
- A) O tamanho da porta do painel.
- B) A cor dos LEDs.
- C) O nome do laboratório.
- D) A tensão de alimentação e o tipo de saída corretos.

**Gabarito:** D

---

## ITEM 33 — Segurança na identificação de módulos

- **Capacidade:** C1

**Comando:**  
Como deve estar a bancada durante a identificação dos módulos do CLP?

**Alternativas:**
- A) Energizada, para ver os LEDs.
- B) Sem o docente, para ganhar tempo.
- C) Com os módulos soltos para facilitar.
- D) Desenergizada e bloqueada pelo docente.

**Gabarito:** D

---

## ITEM 34 — Retirada de módulos

- **Capacidade:** C1

**Comando:**  
O aprendiz pode retirar módulos do CLP durante a prática?

**Alternativas:**
- A) Não; a prática é de identificação, sem retirar módulos nem bornes.
- B) Sim, desde que a bancada esteja energizada.
- C) Sim, sempre que quiser.
- D) Sim, se o colega concordar.

**Gabarito:** A

---

## ITEM 35 — Classificação de dispositivos

- **Capacidade:** C1

**Comando:**  
Qual alternativa classifica corretamente os dispositivos?

**Alternativas:**
- A) Fim de curso: entrada digital. Contator: saída digital. Transmissor 4–20 mA: entrada analógica.
- B) Todos são entradas digitais.
- C) Todos são saídas analógicas.
- D) Fim de curso: saída digital. Contator: entrada digital. Transmissor: saída analógica.

**Gabarito:** A

---

## ITEM 36 — Sinaleiro de máquina ligada

- **Capacidade:** C1

**Comando:**  
A lâmpada "máquina ligada" do painel é ligada em:

**Alternativas:**
- A) Uma entrada digital.
- B) Uma saída digital.
- C) Uma entrada analógica.
- D) A fonte do CLP.

**Gabarito:** B

---

## ITEM 37 — Sensor de temperatura analógico

- **Capacidade:** C1

**Comando:**  
Um transmissor de temperatura que envia 4–20 mA ao CLP usa:

**Alternativas:**
- A) Uma saída analógica.
- B) Uma entrada digital.
- C) Uma saída digital.
- D) Uma entrada analógica.

**Gabarito:** D

---

## ITEM 38 — IHM na arquitetura

- **Capacidade:** C1

**Comando:**  
Onde a IHM se conecta na arquitetura do CLP?

**Alternativas:**
- A) Diretamente aos sensores.
- B) À porta de comunicação do CLP.
- C) Ao cartão de saídas a relé.
- D) À fonte de 220 V.

**Gabarito:** B

---

## ITEM 39 — Número de pontos necessários

- **Capacidade:** C1

**Contexto:**  
Uma máquina tem 10 sensores e botões e 6 atuadores (contatores e válvulas), todos digitais.

**Comando:**  
Quantos pontos de entrada e de saída digitais o CLP precisa ter, no mínimo?

**Alternativas:**
- A) 6 entradas e 10 saídas.
- B) 8 entradas e 8 saídas.
- C) 10 entradas e 6 saídas.
- D) 16 entradas e 0 saídas.

**Gabarito:** C

---

## ITEM 40 — Reserva de pontos

- **Capacidade:** C1

**Comando:**  
Por que é recomendável especificar um CLP com alguns pontos de reserva?

**Alternativas:**
- A) Para deixar o CLP mais pesado.
- B) Para permitir pequenas ampliações e substituir um ponto danificado.
- C) Porque o CLP só funciona com pontos sobrando.
- D) Para aumentar a tensão das entradas.

**Gabarito:** B

---

## ITEM 41 — LED de alimentação

- **Capacidade:** C1

**Comando:**  
O que indica o LED de alimentação (POWER) aceso no CLP?

**Alternativas:**
- A) Que a máquina está em produção.
- B) Que o CLP está recebendo alimentação.
- C) Que o programa tem erro.
- D) Que todas as entradas estão ligadas.

**Gabarito:** B

---

## ITEM 42 — LED de falha

- **Capacidade:** C1

**Comando:**  
O que o operador deve fazer ao ver o LED de falha (ERROR/FAULT) aceso no CLP?

**Alternativas:**
- A) Desligar e religar o CLP várias vezes.
- B) Informar o líder e a manutenção, sem tentar reprogramar.
- C) Apagar o programa.
- D) Ignorar, porque é normal.

**Gabarito:** B

---

## ITEM 43 — Fiação identificada

- **Capacidade:** C1

**Comando:**  
Por que os fios das E/S devem ter identificação com o endereço correspondente?

**Alternativas:**
- A) Para aumentar a corrente.
- B) Porque o CLP lê a etiqueta do fio.
- C) Para facilitar o diagnóstico e a manutenção.
- D) Para deixar o painel colorido.

**Gabarito:** C

---

## ITEM 44 — Rack modular

- **Capacidade:** C1

**Comando:**  
No CLP modular, como a CPU se comunica com os cartões de E/S?

**Alternativas:**
- A) Pela tubulação de ar comprimido.
- B) Pelo barramento do trilho ou rack onde os módulos são montados.
- C) Por Wi-Fi do celular do operador.
- D) Pelos botões do painel.

**Gabarito:** B

---

## ITEM 45 — Saída de sinalização sonora

- **Capacidade:** C1

**Comando:**  
Uma sirene de alarme da linha é ligada em:

**Alternativas:**
- A) Uma saída digital.
- B) Uma entrada digital.
- C) Uma entrada analógica.
- D) A porta de comunicação.

**Gabarito:** A

---

## ITEM 46 — Diferença entre entrada e saída

- **Capacidade:** C1

**Comando:**  
Qual é a diferença entre entrada e saída do CLP?

**Alternativas:**
- A) A entrada leva informação do campo ao CLP; a saída leva o comando do CLP ao campo.
- B) A entrada liga os motores; a saída lê os sensores.
- C) A entrada é sempre analógica e a saída sempre digital.
- D) São a mesma coisa.

**Gabarito:** A

---

## ITEM 47 — Comunicação Ethernet

- **Capacidade:** C1

**Comando:**  
Hoje é comum o CLP se comunicar com o supervisório por meio de:

**Alternativas:**
- A) Cabo de energia de 220 V.
- B) Tubulação pneumática.
- C) Rede Ethernet industrial.
- D) Papel impresso.

**Gabarito:** C

---

## ITEM 48 — Ficha técnica: tipo de saída

- **Capacidade:** C1

**Contexto:**  
Na bancada, a etiqueta do cartão de saídas mostra o símbolo de contato de relé.

**Comando:**  
Como o aprendiz deve preencher a ficha técnica?

**Alternativas:**
- A) Saídas digitais do tipo relé.
- B) Entradas digitais.
- C) Saídas a transistor.
- D) Saídas analógicas de 4–20 mA.

**Gabarito:** A

---

## ITEM 49 — Ordem do fluxo de sinais

- **Capacidade:** C1

**Comando:**  
Qual é a ordem correta do caminho do sinal em uma máquina automatizada?

**Alternativas:**
- A) Sensor → cartão de entrada → CPU → cartão de saída → atuador.
- B) Atuador → CPU → sensor → fonte.
- C) Fonte → motor → sensor → IHM.
- D) CPU → sensor → atuador → cartão de entrada.

**Gabarito:** A

---

## ITEM 50 — Por que conhecer a arquitetura

- **Capacidade:** C1

**Comando:**  
Por que o operador de produção deve conhecer a arquitetura do CLP?

**Alternativas:**
- A) Para substituir o eletricista.
- B) Para entender os sinais, localizar falhas e se comunicar bem com a manutenção.
- C) Para trocar a CPU sozinho.
- D) Para alterar o programa.

**Gabarito:** B

---
