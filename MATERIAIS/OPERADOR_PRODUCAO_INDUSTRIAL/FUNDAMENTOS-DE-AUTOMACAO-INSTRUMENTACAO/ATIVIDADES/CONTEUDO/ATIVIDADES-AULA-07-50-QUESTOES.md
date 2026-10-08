# Atividade: Sistemas de Supervisão: Local e Remoto e seus Componentes — 50 Questões

- **Aula:** 07
- **Tema:** Sistemas de Supervisão: Local e Remoto e seus Componentes
- **Ícone:** 🖥️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Diferenciar supervisão local e remota e identificar os componentes de um sistema de supervisão (campo, CLP, rede, estação SCADA, IHM e histórico).
- **Conteúdo-base:** `../AULAS/AULA-07.md`
- **Slides:** `—`
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-07-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (arquivo fora do Git).

---

## ITEM 01 — O que é supervisionar um processo

- **Capacidade:** C2

**Comando:**  
Na automação industrial, o que significa supervisionar um processo?

**Alternativas:**
- A) Consertar as máquinas quando quebram.
- B) Escrever o programa Ladder da máquina.
- C) Ver, registrar e comandar o processo a partir dos dados que vêm do CLP.
- D) Trocar os sensores defeituosos.

**Gabarito:** C

---

## ITEM 02 — De onde vêm os dados da supervisão

- **Capacidade:** C2

**Comando:**  
De onde o sistema de supervisão recebe os valores que mostra nas telas?

**Alternativas:**
- A) Do setor de compras.
- B) Das anotações em papel feitas pelos operadores.
- C) Da internet pública.
- D) Do CLP, que lê os instrumentos de campo.

**Gabarito:** D

---

## ITEM 03 — Ganho da supervisão

- **Capacidade:** C2

**Comando:**  
Qual destes é um benefício direto de um sistema de supervisão?

**Alternativas:**
- A) Ter visão geral da linha e receber alarmes rapidamente.
- B) Eliminar a necessidade de manutenção.
- C) Aumentar a quantidade de papel no turno.
- D) Dispensar o uso de EPI.

**Gabarito:** A

---

## ITEM 04 — Anotações em papel

- **Capacidade:** C2

**Contexto:**  
No Laticínio Serra Azul, os operadores andam pela fábrica anotando temperaturas dos tanques em papel a cada hora.

**Comando:**  
Que problema a supervisão resolveria nessa situação?

**Alternativas:**
- A) O leite deixaria de precisar de pasteurização.
- B) As temperaturas seriam vistas em tempo real e guardadas no histórico, sem deslocamento e com alarme se saírem da faixa.
- C) Os tanques ficariam menores.
- D) Não haveria mais necessidade de operadores.

**Gabarito:** B

---

## ITEM 05 — Base da pirâmide

- **Capacidade:** C2

**Comando:**  
Na pirâmide simplificada da automação, qual nível fica na base?

**Alternativas:**
- A) Campo (sensores e atuadores).
- B) Supervisão (SCADA).
- C) Gestão (ERP).
- D) Controle (CLP).

**Gabarito:** A

---

## ITEM 06 — Nível do CLP

- **Capacidade:** C2

**Comando:**  
Em qual nível da pirâmide da automação está o CLP?

**Alternativas:**
- A) Gestão.
- B) Controle.
- C) Campo.
- D) Supervisão.

**Gabarito:** B

---

## ITEM 07 — Nível do SCADA

- **Capacidade:** C2

**Comando:**  
As telas, os alarmes e os históricos do processo pertencem a qual nível da pirâmide?

**Alternativas:**
- A) Campo.
- B) Supervisão.
- C) Gestão.
- D) Controle.

**Gabarito:** B

---

## ITEM 08 — Topo da pirâmide

- **Capacidade:** C2

**Comando:**  
O que fica no topo da pirâmide da automação?

**Alternativas:**
- A) Os motores e as válvulas.
- B) Os cartões de entrada do CLP.
- C) A gestão (ERP), com planejamento e indicadores da empresa.
- D) A IHM do painel da máquina.

**Gabarito:** C

---

## ITEM 09 — Sentido dos dados

- **Capacidade:** C2

**Comando:**  
Qual sequência mostra corretamente o caminho de uma medição até a tela da sala de controle?

**Alternativas:**
- A) Rede → sensor → ERP → CLP.
- B) CLP → sensor → tela → rede.
- C) Tela → CLP → sensor → rede.
- D) Sensor → CLP → rede → estação SCADA → tela.

**Gabarito:** D

---

## ITEM 10 — Supervisão local

- **Capacidade:** C2

**Comando:**  
O que caracteriza a supervisão local?

**Alternativas:**
- A) Não mostra nenhum valor do processo.
- B) É feita só pelo celular do gerente.
- C) É feita na própria máquina, normalmente por uma IHM no painel.
- D) Abrange todas as fábricas da empresa.

**Gabarito:** C

---

## ITEM 11 — Supervisão remota

- **Capacidade:** C2

**Comando:**  
O que caracteriza a supervisão remota?

**Alternativas:**
- A) É feita a distância, pela rede, em sala de controle, outro setor ou outro prédio.
- B) Só funciona com a máquina desligada.
- C) Usa apenas lâmpadas de sinalização.
- D) Exige que o operador fique encostado na máquina.

**Gabarito:** A

---

## ITEM 12 — Abrangência

- **Capacidade:** C2

**Comando:**  
Comparando as duas, qual afirmação está correta?

**Alternativas:**
- A) As duas sempre cobrem apenas um sensor.
- B) A local cobre a fábrica inteira e a remota cobre uma máquina.
- C) A remota dispensa o CLP.
- D) A local normalmente cobre uma máquina; a remota pode cobrir a linha inteira ou a fábrica.

**Gabarito:** D

---

## ITEM 13 — Tela da envasadora

- **Capacidade:** C2

**Contexto:**  
Na envasadora de uma fábrica de sucos, o operador ajusta a velocidade e vê as falhas numa tela touch presa ao painel da máquina.

**Comando:**  
Que tipo de supervisão é essa?

**Alternativas:**
- A) Não é supervisão.
- B) Local.
- C) De gestão (ERP).
- D) Remota.

**Gabarito:** B

---

## ITEM 14 — Sala de controle do laticínio

- **Capacidade:** C2

**Contexto:**  
No laticínio, um operador acompanha as três linhas de produção ao mesmo tempo em monitores instalados na sala de controle, longe das máquinas.

**Comando:**  
Que tipo de supervisão é essa?

**Alternativas:**
- A) De campo.
- B) Remota.
- C) Manual em papel.
- D) Local.

**Gabarito:** B

---

## ITEM 15 — Efluentes a distância

- **Capacidade:** C2

**Contexto:**  
A estação de tratamento de efluentes fica a 500 m do prédio principal e é acompanhada pelo computador da sala de controle.

**Comando:**  
Como se classifica esse acompanhamento?

**Alternativas:**
- A) Supervisão remota.
- B) Instrumento de campo.
- C) Programação do CLP.
- D) Supervisão local.

**Gabarito:** A

---

## ITEM 16 — Líder consultando a produção

- **Capacidade:** C2

**Contexto:**  
Antes da reunião de passagem de turno, o líder consulta no supervisório quantas garrafas a linha 2 produziu.

**Comando:**  
Qual função da supervisão ele está usando?

**Alternativas:**
- A) Troca de sensor.
- B) Consulta de histórico/produção da linha pela supervisão remota.
- C) Calibração do termopar.
- D) Programação Ladder.

**Gabarito:** B

---

## ITEM 17 — Instrumentos de campo

- **Capacidade:** C2

**Comando:**  
Qual é o papel dos instrumentos de campo no sistema de supervisão?

**Alternativas:**
- A) Rodar o software SCADA.
- B) Definir as senhas dos usuários.
- C) Medir e atuar no processo (transmissores, válvulas, motores).
- D) Guardar os relatórios mensais.

**Gabarito:** C

---

## ITEM 18 — Papel do CLP

- **Capacidade:** C2

**Comando:**  
Qual é o papel do CLP dentro do sistema de supervisão?

**Alternativas:**
- A) Apenas desenhar as telas.
- B) Executar a lógica da máquina e guardar os valores que a supervisão lê.
- C) Imprimir os relatórios.
- D) Substituir a rede de comunicação.

**Gabarito:** B

---

## ITEM 19 — Rede de comunicação

- **Capacidade:** C2

**Comando:**  
Para que serve a rede de comunicação no sistema de supervisão?

**Alternativas:**
- A) Para alimentar os motores com energia.
- B) Para medir a temperatura do tanque.
- C) Para substituir os sensores.
- D) Para levar os dados entre CLPs, estações e telas (cabos, Ethernet industrial).

**Gabarito:** D

---

## ITEM 20 — Estação de supervisão

- **Capacidade:** C2

**Comando:**  
O que roda na estação (ou servidor) de supervisão?

**Alternativas:**
- A) O programa interno do sensor.
- B) O software SCADA.
- C) O inversor de frequência.
- D) A fonte de alimentação do CLP.

**Gabarito:** B

---

## ITEM 21 — Banco de dados

- **Capacidade:** C2

**Comando:**  
Qual componente guarda valores e alarmes para relatórios futuros?

**Alternativas:**
- A) O banco de dados/histórico.
- B) O botão de emergência.
- C) A boia de nível.
- D) O contator do motor.

**Gabarito:** A

---

## ITEM 22 — IHM e telas

- **Capacidade:** C2

**Comando:**  
Qual componente mostra o processo ao operador?

**Alternativas:**
- A) O transmissor de pressão.
- B) O disjuntor.
- C) O cabo de rede.
- D) A IHM/telas.

**Gabarito:** D

---

## ITEM 23 — Componente que falta

- **Capacidade:** C2

**Contexto:**  
Uma dupla desenhou: sensores → CLP → estação SCADA → telas, mas o professor disse que faltava um componente entre o CLP e a estação.

**Comando:**  
Qual componente estava faltando?

**Alternativas:**
- A) O manômetro.
- B) O ERP.
- C) A receita do produto.
- D) A rede de comunicação.

**Gabarito:** D

---

## ITEM 24 — Seis componentes

- **Capacidade:** C2

**Comando:**  
Qual lista contém apenas componentes de um sistema de supervisão?

**Alternativas:**
- A) Instrumentos de campo, CLP, rede, estação SCADA, IHM/telas e banco de dados.
- B) Planilha de férias, crachá e uniforme.
- C) Leite, garrafa, tampa e rótulo.
- D) Martelo, chave de fenda, EPI e alicate.

**Gabarito:** A

---

## ITEM 25 — Valor congelado na tela

- **Capacidade:** C2

**Contexto:**  
A temperatura do tanque TQ-01 aparece parada em 72 °C há 20 minutos na sala de controle, mas o termômetro local mostra 78 °C.

**Comando:**  
Qual é uma causa provável a ser comunicada?

**Alternativas:**
- A) O SCADA está funcionando perfeitamente.
- B) O termômetro local sempre está errado.
- C) Falha de comunicação (rede) entre o CLP e a supervisão.
- D) O leite parou de esquentar de verdade.

**Gabarito:** C

---

## ITEM 26 — Queda de rede

- **Capacidade:** C2

**Comando:**  
Qual é um cuidado importante ao depender da supervisão remota?

**Alternativas:**
- A) Compartilhar a senha com todos.
- B) Ter procedimento para queda de rede, conferindo os valores localmente.
- C) Retirar as IHMs das máquinas.
- D) Desligar os alarmes para não incomodar.

**Gabarito:** B

---

## ITEM 27 — Acesso indevido

- **Capacidade:** C2

**Comando:**  
Por que o acesso ao supervisório precisa ser controlado?

**Alternativas:**
- A) Para aumentar a velocidade da rede.
- B) Para evitar que pessoas não autorizadas comandem o processo ou alterem dados.
- C) Para deixar a tela mais bonita.
- D) Para reduzir o consumo de energia.

**Gabarito:** B

---

## ITEM 28 — Senha pessoal

- **Capacidade:** C2

**Contexto:**  
Um colega esqueceu a senha do supervisório e pede a sua emprestada para "só olhar uma tela".

**Comando:**  
Qual é a atitude correta?

**Alternativas:**
- A) Emprestar, pois é só para olhar.
- B) Trocar de senha com ele.
- C) Não emprestar: senha é pessoal; orientar a pedir acesso ao responsável.
- D) Escrever a senha num papel colado no monitor.

**Gabarito:** C

---

## ITEM 29 — Partida remota com risco

- **Capacidade:** C2

**Contexto:**  
Pelo supervisório, é possível dar partida na esteira da linha 3. Há um mecânico trabalhando perto dela.

**Comando:**  
O que a segurança exige nesse caso?

**Alternativas:**
- A) Aumentar a velocidade para terminar logo.
- B) Dar a partida logo, pois o comando é remoto.
- C) Desligar o alarme da esteira.
- D) Confirmação local e procedimento antes de comandos que colocam pessoas em risco.

**Gabarito:** D

---

## ITEM 30 — Supervisão não substitui segurança

- **Capacidade:** C2

**Comando:**  
Qual afirmação sobre supervisão e segurança está correta?

**Alternativas:**
- A) Com supervisão remota, o botão de emergência pode ser retirado.
- B) A supervisão torna o EPI desnecessário.
- C) A supervisão dispensa o bloqueio de energia na manutenção.
- D) A supervisão ajuda, mas não substitui os dispositivos e procedimentos de segurança.

**Gabarito:** D

---

## ITEM 31 — Menos deslocamento

- **Capacidade:** C2

**Comando:**  
Por que a supervisão aumenta a segurança do operador?

**Alternativas:**
- A) Porque os sensores ficam mais baratos.
- B) Porque o operador passa a trabalhar sem atenção.
- C) Porque reduz deslocamentos até áreas de risco para apenas ler valores.
- D) Porque as máquinas passam a não ter partes móveis.

**Gabarito:** C

---

## ITEM 32 — Histórico para análise

- **Capacidade:** C2

**Contexto:**  
O controle de qualidade quer saber como variou a temperatura da pasteurização no lote de ontem.

**Comando:**  
Qual componente fornece essa informação?

**Alternativas:**
- A) O contator do motor.
- B) O botão de pulso do painel.
- C) A boia do tanque.
- D) O banco de dados/histórico da supervisão.

**Gabarito:** D

---

## ITEM 33 — Transmissor no campo

- **Capacidade:** C2

**Contexto:**  
Um transmissor envia a pressão da linha de vapor para o CLP.

**Comando:**  
Em qual nível da pirâmide está o transmissor?

**Alternativas:**
- A) Controle.
- B) Campo.
- C) Supervisão.
- D) Gestão.

**Gabarito:** B

---

## ITEM 34 — ERP e indicadores

- **Capacidade:** C2

**Contexto:**  
A diretoria acompanha a produção mensal e os custos por lote num sistema que integra vendas, compras e estoque.

**Comando:**  
Esse sistema pertence a qual nível da pirâmide?

**Alternativas:**
- A) Controle.
- B) Supervisão local.
- C) Campo.
- D) Gestão (ERP).

**Gabarito:** D

---

## ITEM 35 — Do programa à tela

- **Capacidade:** C2

**Comando:**  
Na aula anterior o CLP já controlava a esteira. O que a supervisão acrescenta?

**Alternativas:**
- A) Substitui o programa Ladder.
- B) Permite ver, registrar e comandar o processo em telas, com alarmes e histórico.
- C) Faz o motor girar mais rápido.
- D) Elimina as entradas do CLP.

**Gabarito:** B

---

## ITEM 36 — Classificar situação 1

- **Capacidade:** C2

**Contexto:**  
Um técnico acessa, pelo computador do escritório da manutenção, a tela da caldeira para ver a pressão.

**Comando:**  
Essa situação é supervisão local ou remota?

**Alternativas:**
- A) É programação de CLP.
- B) Local, pois o técnico está na fábrica.
- C) Remota, pois o acesso é pela rede, longe do equipamento.
- D) Não é supervisão.

**Gabarito:** C

---

## ITEM 37 — Classificar situação 2

- **Capacidade:** C2

**Contexto:**  
O operador da rotuladora aperta "Reset falha" na tela touch ao lado da máquina.

**Comando:**  
Essa situação é supervisão local ou remota?

**Alternativas:**
- A) Local.
- B) Gestão.
- C) Campo.
- D) Remota.

**Gabarito:** A

---

## ITEM 38 — Diagrama do laticínio

- **Capacidade:** C2

**Contexto:**  
No estudo de caso do Laticínio Serra Azul, há 3 tanques, uma pasteurizadora e uma envasadora.

**Comando:**  
Qual arquitetura de supervisão atende ao caso?

**Alternativas:**
- A) Apenas uma lâmpada na porta da fábrica.
- B) Cada operador com uma prancheta.
- C) Sensores dos tanques e máquinas → CLP → rede → estação SCADA na sala de controle → telas e histórico.
- D) Um ERP ligado diretamente aos sensores, sem CLP.

**Gabarito:** C

---

## ITEM 39 — O que fica no local

- **Capacidade:** C2

**Contexto:**  
No mesmo laticínio, a envasadora precisa de ajustes de formato e reset de falhas feitos junto à máquina.

**Comando:**  
O que deve ficar na supervisão local?

**Alternativas:**
- A) A IHM da envasadora para ajustes, partida e reset junto à máquina.
- B) A visão das três linhas ao mesmo tempo.
- C) Os relatórios mensais da diretoria.
- D) O cadastro de fornecedores.

**Gabarito:** A

---

## ITEM 40 — O que vai para a sala

- **Capacidade:** C2

**Comando:**  
No laticínio, o que faz mais sentido levar para a sala de controle?

**Alternativas:**
- A) A visão geral das temperaturas dos tanques, alarmes e histórico de toda a fábrica.
- B) O botão de emergência da envasadora.
- C) O ajuste físico das guias da esteira.
- D) A troca manual das garrafas.

**Gabarito:** A

---

## ITEM 41 — Alarme rápido

- **Capacidade:** C2

**Contexto:**  
A temperatura da pasteurizadora caiu abaixo da faixa às 14h05.

**Comando:**  
Com supervisão, o que acontece de diferente em relação ao papel?

**Alternativas:**
- A) A máquina se conserta sozinha.
- B) O alarme só aparece no fim do mês.
- C) O operador recebe alarme na hora e pode agir antes de produzir leite fora da especificação.
- D) Nada; ele só descobre na próxima anotação.

**Gabarito:** C

---

## ITEM 42 — Ethernet industrial

- **Capacidade:** C2

**Comando:**  
Qual é um exemplo de meio usado na rede de comunicação da supervisão?

**Alternativas:**
- A) Cabo Ethernet industrial.
- B) Mangueira de ar comprimido.
- C) Correia da esteira.
- D) Tubulação de vapor.

**Gabarito:** A

---

## ITEM 43 — CLP guarda valores

- **Capacidade:** C2

**Contexto:**  
A tela da sala mostra "Contador de garrafas = 12.480".

**Comando:**  
Onde esse valor está guardado e é calculado?

**Alternativas:**
- A) No cabo de rede.
- B) No monitor da sala.
- C) No sensor de nível.
- D) Na memória do CLP, que conta os pulsos do sensor.

**Gabarito:** D

---

## ITEM 44 — Tela apagada

- **Capacidade:** C2

**Contexto:**  
O monitor da sala de controle desligou, mas a linha continua produzindo normalmente.

**Comando:**  
Por que a linha continua funcionando?

**Alternativas:**
- A) Porque o ERP assumiu a máquina.
- B) Porque o monitor controla tudo e ainda não percebeu.
- C) Porque o sensor passou a programar o motor.
- D) Porque quem executa a lógica da máquina é o CLP; a tela só mostra e comanda.

**Gabarito:** D

---

## ITEM 45 — Celular como supervisão

- **Capacidade:** C2

**Contexto:**  
O gerente de produção recebe no celular um aviso de "parada da linha 1".

**Comando:**  
Isso é exemplo de quê?

**Alternativas:**
- A) Instrumento de campo.
- B) Supervisão local na máquina.
- C) Supervisão remota, com dados levados pela rede.
- D) Programação do CLP.

**Gabarito:** C

---

## ITEM 46 — Componente para relatório

- **Capacidade:** C2

**Contexto:**  
O líder precisa de um relatório com as paradas da semana.

**Comando:**  
Sem qual componente esse relatório não existiria?

**Alternativas:**
- A) Banco de dados/histórico.
- B) Botão LIGA.
- C) Válvula manual.
- D) Lâmpada piloto.

**Gabarito:** A

---

## ITEM 47 — Cuidado com mudanças pela tela

- **Capacidade:** C2

**Comando:**  
Qual é a atitude correta do aprendiz diante dos comandos disponíveis no supervisório?

**Alternativas:**
- A) Testar todos os botões para aprender.
- B) Só comandar com autorização e conforme o procedimento.
- C) Alterar parâmetros quando a produção estiver lenta.
- D) Desabilitar alarmes que parecerem desnecessários.

**Gabarito:** B

---

## ITEM 48 — Palavra-chave da aula

- **Capacidade:** C2

**Comando:**  
Qual frase resume a diferença entre supervisão local e remota?

**Alternativas:**
- A) Local acontece na máquina; remota acontece a distância, pela rede, com visão mais ampla.
- B) Local é sem tela; remota é sem CLP.
- C) Local é de gestão; remota é de campo.
- D) As duas são iguais.

**Gabarito:** A

---

## ITEM 49 — Ganhos e cuidados

- **Capacidade:** C2

**Comando:**  
Qual alternativa traz um ganho e um cuidado corretos da supervisão do laticínio?

**Alternativas:**
- A) Ganho: histórico das temperaturas; cuidado: proteger o acesso com senha pessoal.
- B) Ganho: máquinas sem manutenção; cuidado: nenhum.
- C) Ganho: menos EPI; cuidado: desligar alarmes.
- D) Ganho: dispensa o CLP; cuidado: usar papel.

**Gabarito:** A

---

## ITEM 50 — Importância para o operador

- **Capacidade:** C2

**Comando:**  
Por que o operador de produção precisa entender o sistema de supervisão?

**Alternativas:**
- A) Para alterar a lógica do CLP sozinho.
- B) Para programar o ERP da empresa.
- C) Para acompanhar o processo, reagir a alarmes e relatar problemas com informação precisa.
- D) Para dispensar a manutenção.

**Gabarito:** C

---
