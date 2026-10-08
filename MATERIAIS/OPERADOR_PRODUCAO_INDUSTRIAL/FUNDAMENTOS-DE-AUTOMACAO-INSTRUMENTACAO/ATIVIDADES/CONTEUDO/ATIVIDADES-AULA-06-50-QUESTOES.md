# Atividade: CLP: Estruturas de Programação — 50 Questões

- **Aula:** 06
- **Tema:** CLP: Estruturas de Programação
- **Ícone:** ⏱️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Interpretar selo, temporizador, contador e intertravamento em programas de partida e parada de máquinas.
- **Conteúdo-base:** `../AULAS/AULA-06.md`
- **Slides:** `—`
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-06-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (arquivo fora do Git).

---

## ITEM 01 — O que é o selo

- **Capacidade:** C1

**Comando:**  
No programa de partida e parada de um motor, o que é o "selo" (retenção)?

**Alternativas:**
- A) Uma etiqueta colada no painel.
- B) Um botão que precisa ficar pressionado o tempo todo.
- C) Um contato da própria saída em paralelo com o botão LIGA, que mantém a saída ligada após soltar o botão.
- D) Um sensor que desliga o motor.

**Gabarito:** C

---

## ITEM 02 — Botão de pulso

- **Capacidade:** C1

**Comando:**  
Por que o botão LIGA precisa de selo no programa?

**Alternativas:**
- A) Porque o botão só funciona em STOP.
- B) Porque o selo aumenta a velocidade do motor.
- C) Porque é um botão de pulso: ao soltar, o sinal volta para 0.
- D) Porque o botão LIGA é um sensor analógico.

**Gabarito:** C

---

## ITEM 03 — Posição do contato de selo

- **Capacidade:** C1

**Comando:**  
Onde fica o contato de selo na rede de partida?

**Alternativas:**
- A) Em outra rede, sem ligação com a partida.
- B) Depois da bobina.
- C) Em série com o botão DESLIGA.
- D) Em paralelo com o botão LIGA.

**Gabarito:** D

---

## ITEM 04 — Botão DESLIGA na rede

- **Capacidade:** C1

**Comando:**  
Como o botão DESLIGA aparece na rede de partida com selo?

**Alternativas:**
- A) Em série, de forma que, ao ser acionado, interrompe o caminho até a bobina.
- B) Ele não aparece na rede.
- C) Em paralelo com o botão LIGA.
- D) Em paralelo com a bobina.

**Gabarito:** A

---

## ITEM 05 — Prioridade da parada

- **Capacidade:** C1

**Comando:**  
Na rede com selo, se LIGA e DESLIGA forem pressionados ao mesmo tempo, o que acontece?

**Alternativas:**
- A) O motor liga: a partida tem prioridade.
- B) O motor pisca.
- C) O motor fica desligado: a parada tem prioridade.
- D) O CLP entra em STOP.

**Gabarito:** C

---

## ITEM 06 — Emergência na rede

- **Capacidade:** C1

**Comando:**  
Como o botão de emergência deve aparecer na rede de partida do motor?

**Alternativas:**
- A) Fora do programa, sem nenhuma ligação com a máquina.
- B) Em série com o DESLIGA, ligado fisicamente como NF.
- C) Em paralelo com o selo.
- D) Em paralelo com o LIGA.

**Gabarito:** B

---

## ITEM 07 — Falta de energia e selo

- **Capacidade:** C1

**Comando:**  
Após uma falta de energia, uma máquina com partida por selo:

**Alternativas:**
- A) Não volta a ligar sozinha; é preciso pressionar LIGA novamente.
- B) Liga sozinha assim que a energia volta.
- C) Apaga o programa.
- D) Liga e desliga sem parar.

**Gabarito:** A

---

## ITEM 08 — Perigo da chave de manter

- **Capacidade:** C1

**Contexto:**  
Na Embalagens Sul, a esteira usa uma chave de manter (que fica na posição ligada) em vez de botão com selo. Depois de destravar a emergência, a esteira voltou a andar sozinha.

**Comando:**  
Por que isso é perigoso?

**Alternativas:**
- A) Porque a esteira fica mais lenta.
- B) Porque gasta mais energia.
- C) Porque a máquina pode partir inesperadamente com alguém na área de risco.
- D) Não é perigoso.

**Gabarito:** C

---

## ITEM 09 — Correção da esteira

- **Capacidade:** C1

**Contexto:**  
A Embalagens Sul precisa corrigir a partida da esteira que volta sozinha após a emergência.

**Comando:**  
Qual é a correção adequada?

**Alternativas:**
- A) Trocar a chave de manter por outra igual.
- B) Retirar o botão de emergência.
- C) Usar botão LIGA de pulso com selo e emergência em série na rede.
- D) Colocar a emergência em paralelo com o LIGA.

**Gabarito:** C

---

## ITEM 10 — Temporizador TON

- **Capacidade:** C1

**Comando:**  
Como funciona o temporizador com atraso na ligação (TON)?

**Alternativas:**
- A) Conta o tempo enquanto a entrada está ligada e liga sua saída quando atinge o tempo programado.
- B) Liga a saída antes de a entrada ligar.
- C) Desliga a saída imediatamente quando a entrada liga.
- D) Conta peças em vez de tempo.

**Gabarito:** A

---

## ITEM 11 — Preset do temporizador

- **Capacidade:** C1

**Comando:**  
O que é o "preset" (PT) de um temporizador?

**Alternativas:**
- A) O tempo programado que deve ser atingido.
- B) O endereço da saída.
- C) O tempo já decorrido.
- D) A tensão da entrada.

**Gabarito:** A

---

## ITEM 12 — Tempo decorrido

- **Capacidade:** C1

**Comando:**  
O valor que mostra quanto tempo já passou no temporizador é chamado de:

**Alternativas:**
- A) Preset.
- B) Tempo atual (ET/valor acumulado).
- C) Bobina.
- D) Selo.

**Gabarito:** B

---

## ITEM 13 — Entrada do TON desligada antes do tempo

- **Capacidade:** C1

**Contexto:**  
Um TON de 5 s começa a contar, mas a entrada desliga em 3 s.

**Comando:**  
O que acontece?

**Alternativas:**
- A) O CLP entra em falha.
- B) O temporizador continua até 5 s.
- C) O temporizador zera e a saída não liga.
- D) A saída liga mesmo assim.

**Gabarito:** C

---

## ITEM 14 — Aviso sonoro antes da partida

- **Capacidade:** C1

**Contexto:**  
A esteira deve tocar uma sirene durante 5 s antes de o motor partir.

**Comando:**  
Que recurso do programa é usado?

**Alternativas:**
- A) Uma entrada analógica.
- B) Um temporizador TON de 5 s.
- C) Um contato NF da sirene.
- D) Um contador de 5 peças.

**Gabarito:** B

---

## ITEM 15 — Contador crescente

- **Capacidade:** C1

**Comando:**  
Como funciona o contador crescente (CTU)?

**Alternativas:**
- A) Soma 1 a cada pulso na entrada e liga sua saída ao atingir o valor programado.
- B) Liga a saída a cada pulso.
- C) Diminui 1 a cada pulso.
- D) Conta o tempo em segundos.

**Gabarito:** A

---

## ITEM 16 — Reset do contador

- **Capacidade:** C1

**Comando:**  
Para que serve a entrada de reset do contador?

**Alternativas:**
- A) Para zerar a contagem.
- B) Para mudar o preset.
- C) Para aumentar a contagem.
- D) Para ligar a saída.

**Gabarito:** A

---

## ITEM 17 — Encaixotadora

- **Capacidade:** C1

**Contexto:**  
Na encaixotadora, a caixa deve ser fechada a cada 12 garrafas que passam pelo sensor.

**Comando:**  
Que recurso do programa é usado?

**Alternativas:**
- A) Um contato NF de 12 entradas.
- B) Um temporizador de 12 s.
- C) Um contador com preset 12.
- D) Uma entrada analógica de 12 mA.

**Gabarito:** C

---

## ITEM 18 — Contador após a caixa fechada

- **Capacidade:** C1

**Contexto:**  
Na encaixotadora, depois que a caixa com 12 garrafas é fechada, a contagem deve recomeçar.

**Comando:**  
O que o programa deve fazer?

**Alternativas:**
- A) Acionar o reset do contador.
- B) Desligar o CLP.
- C) Apagar a rede do contador.
- D) Mudar o preset para 24.

**Gabarito:** A

---

## ITEM 19 — Contagem atual

- **Capacidade:** C1

**Contexto:**  
O contador de garrafas tem preset 12 e já registrou 9 pulsos.

**Comando:**  
Quantas garrafas faltam para a saída do contador ligar?

**Alternativas:**
- A) 21.
- B) 9.
- C) 12.
- D) 3.

**Gabarito:** D

---

## ITEM 20 — O que é intertravamento

- **Capacidade:** C1

**Comando:**  
O que é um intertravamento no programa do CLP?

**Alternativas:**
- A) Uma rede que liga todas as saídas.
- B) Um comentário no programa.
- C) Uma condição que impede uma ação insegura ou fora de sequência.
- D) Um tipo de sensor de temperatura.

**Gabarito:** C

---

## ITEM 21 — Avanço e retorno

- **Capacidade:** C1

**Contexto:**  
Um cilindro tem motor de avanço (Q0.0) e motor de retorno (Q0.1). Os dois nunca podem ligar juntos.

**Comando:**  
Como se faz o intertravamento no programa?

**Alternativas:**
- A) Colocando as duas bobinas na mesma rede.
- B) Colocando o contato NF de Q0.1 na rede de Q0.0 e o contato NF de Q0.0 na rede de Q0.1.
- C) Ligando os dois motores em paralelo.
- D) Retirando o botão de retorno.

**Gabarito:** B

---

## ITEM 22 — Esteira com proteção

- **Capacidade:** C1

**Contexto:**  
A esteira só pode partir com a porta de proteção fechada (sensor P = 1).

**Comando:**  
Como o sensor da porta aparece na rede de partida?

**Alternativas:**
- A) Como contato NF do sensor P, em paralelo com o selo.
- B) Não aparece.
- C) Como bobina.
- D) Como contato NA do sensor P, em série com a partida.

**Gabarito:** D

---

## ITEM 23 — Bomba e nível mínimo

- **Capacidade:** C1

**Contexto:**  
A bomba de transferência só pode ligar se houver nível mínimo no tanque de origem.

**Comando:**  
Esse é um exemplo de:

**Alternativas:**
- A) Intertravamento.
- B) Comentário de rede.
- C) Contador.
- D) Temporizador.

**Gabarito:** A

---

## ITEM 24 — Ponte rolante

- **Capacidade:** C1

**Contexto:**  
A ponte rolante tem os comandos SUBIR e DESCER.

**Comando:**  
Qual intertravamento é obrigatório?

**Alternativas:**
- A) Nenhum intertravamento é necessário.
- B) SUBIR e DESCER nunca podem ser acionados ao mesmo tempo.
- C) DESCER só funciona com o CLP em STOP.
- D) SUBIR deve ligar sempre que DESCER ligar.

**Gabarito:** B

---

## ITEM 25 — Encaixotadora com temporizador

- **Capacidade:** C1

**Contexto:**  
Após contar 12 garrafas, a encaixotadora aciona a dobra da aba por 2 s.

**Comando:**  
Quais recursos do programa aparecem juntos nesse exemplo?

**Alternativas:**
- A) Apenas o selo.
- B) Duas entradas analógicas.
- C) Apenas um contato NF.
- D) Contador (12 garrafas) e temporizador (2 s).

**Gabarito:** D

---

## ITEM 26 — Parada de emergência no teste

- **Capacidade:** C1

**Comando:**  
Antes de testar a partida e parada da esteira na bancada, o que deve ser feito?

**Alternativas:**
- A) Retirar o botão de emergência.
- B) Ligar a esteira com a mão na correia.
- C) Colocar o CLP em STOP e deixar assim.
- D) Testar o botão de emergência com o docente.

**Gabarito:** D

---

## ITEM 27 — Jumper em segurança

- **Capacidade:** C1

**Contexto:**  
Um colega sugere fazer uma "ponte" (jumper) no sensor da porta de proteção para a esteira funcionar com a porta aberta.

**Comando:**  
Qual é a atitude correta?

**Alternativas:**
- A) Pedir para outro aprendiz fazer.
- B) Fazer a ponte só durante o teste.
- C) Não aceitar: contornar dispositivos de segurança é proibido; comunicar ao líder.
- D) Fazer a ponte e anotar no relatório.

**Gabarito:** C

---

## ITEM 28 — Selo sem DESLIGA

- **Capacidade:** C1

**Contexto:**  
Um programa tem LIGA com selo, mas nenhum contato de DESLIGA ou emergência na rede.

**Comando:**  
Qual é o problema?

**Alternativas:**
- A) A saída nunca liga.
- B) A saída liga e desliga sozinha.
- C) Não há problema.
- D) Depois de ligada, a saída não pode ser desligada pelo programa.

**Gabarito:** D

---

## ITEM 29 — Leitura de rede com selo

- **Capacidade:** C1

**Contexto:**  
Rede: (LIGA em paralelo com o contato de Q0.0) em série com DESLIGA (NF) e EMERGÊNCIA (NF), ligados a Q0.0. O motor está ligado e ninguém pressiona nada.

**Comando:**  
O que mantém o motor ligado?

**Alternativas:**
- A) O botão DESLIGA.
- B) O botão LIGA.
- C) A emergência.
- D) O contato de selo Q0.0.

**Gabarito:** D

---

## ITEM 30 — Desligar o motor com selo

- **Capacidade:** C1

**Contexto:**  
Na mesma rede, o operador pressiona DESLIGA.

**Comando:**  
O que acontece?

**Alternativas:**
- A) O motor dá partida de novo.
- B) O motor continua ligado pelo selo.
- C) Nada acontece.
- D) O caminho é interrompido, Q0.0 desliga e o selo se desfaz.

**Gabarito:** D

---

## ITEM 31 — Contador e IHM

- **Capacidade:** C1

**Comando:**  
Por que é útil mostrar o valor do contador de peças na IHM?

**Alternativas:**
- A) Para o CLP contar mais rápido.
- B) Para desligar o contador.
- C) Para substituir o sensor de peças.
- D) Para o operador acompanhar a produção e conferir o apontamento.

**Gabarito:** D

---

## ITEM 32 — Temporizador de mistura

- **Capacidade:** C1

**Contexto:**  
O misturador deve funcionar 10 minutos após a partida e depois desligar sozinho.

**Comando:**  
Como o temporizador participa da lógica?

**Alternativas:**
- A) O temporizador substitui o botão de emergência.
- B) O temporizador conta 10 peças.
- C) O temporizador liga o motor após 10 min parado.
- D) Quando o TON de 10 min termina, sua saída (contato NF) desliga o motor do misturador.

**Gabarito:** D

---

## ITEM 33 — Temporizador com atraso no desligamento

- **Capacidade:** C1

**Comando:**  
Qual tipo de temporizador mantém a saída ligada por um tempo depois que a entrada desliga?

**Alternativas:**
- A) TON (atraso na ligação).
- B) TOF (atraso no desligamento).
- C) CTU (contador crescente).
- D) Contato NF.

**Gabarito:** B

---

## ITEM 34 — Ventilador após a parada

- **Capacidade:** C1

**Contexto:**  
Após desligar a estufa, o ventilador deve continuar funcionando por 3 minutos para resfriar.

**Comando:**  
Qual temporizador é adequado?

**Alternativas:**
- A) TON de 3 minutos.
- B) Nenhum, é só usar o selo.
- C) TOF de 3 minutos.
- D) Contador de 3 peças.

**Gabarito:** C

---

## ITEM 35 — Sequência de partida

- **Capacidade:** C1

**Contexto:**  
Em uma linha, a esteira 2 só pode ligar depois que a esteira 1 estiver ligada.

**Comando:**  
Como fazer esse intertravamento de sequência?

**Alternativas:**
- A) Não é possível fazer no CLP.
- B) Colocar o contato NF da esteira 1 na rede da esteira 2.
- C) Ligar as duas esteiras na mesma bobina.
- D) Colocar o contato da saída da esteira 1 em série na rede da esteira 2.

**Gabarito:** D

---

## ITEM 36 — Parada em sequência

- **Capacidade:** C1

**Contexto:**  
Na mesma linha, se a esteira 1 parar, a esteira 2 deve parar também.

**Comando:**  
Por que o contato da esteira 1 em série na rede da esteira 2 atende a essa regra?

**Alternativas:**
- A) Porque o contato NF fecha.
- B) Porque o CLP entra em STOP.
- C) Porque o temporizador desliga a esteira 2.
- D) Porque, quando a esteira 1 desliga, o contato abre e interrompe a rede da esteira 2.

**Gabarito:** D

---

## ITEM 37 — Diagnóstico de intertravamento

- **Capacidade:** C1

**Contexto:**  
O operador pressiona LIGA, mas a bomba não liga. Na IHM, o nível do tanque de origem está abaixo do mínimo.

**Comando:**  
Qual é a explicação provável?

**Alternativas:**
- A) O intertravamento de nível mínimo está impedindo a partida, como previsto.
- B) O CLP queimou.
- C) O temporizador terminou.
- D) O botão LIGA está com defeito, com certeza.

**Gabarito:** A

---

## ITEM 38 — Teste do programa da esteira

- **Capacidade:** C1

**Comando:**  
Qual é o critério crítico no teste prático do programa da esteira?

**Alternativas:**
- A) A parada (DESLIGA e emergência) ter prioridade e funcionar sempre.
- B) A sirene tocar bem alto.
- C) O programa ter muitas redes.
- D) A esteira ligar o mais rápido possível.

**Gabarito:** A

---

## ITEM 39 — Contador e falta de energia

- **Capacidade:** C1

**Comando:**  
Por que alguns contadores de produção usam memória retentiva?

**Alternativas:**
- A) Para contar mais rápido.
- B) Para não perder a contagem quando falta energia.
- C) Para zerar sozinhos.
- D) Para dispensar o sensor.

**Gabarito:** B

---

## ITEM 40 — Temporizador e segurança

- **Capacidade:** C1

**Contexto:**  
Uma porta de proteção só pode ser destravada 10 s depois que o motor desligar, para as partes móveis pararem.

**Comando:**  
Que recursos atendem a essa regra?

**Alternativas:**
- A) O selo do motor.
- B) Um contato NA do motor em paralelo com a trava.
- C) Um contador de 10 peças.
- D) Um temporizador contando a partir do desligamento do motor, liberando a trava ao fim do tempo.

**Gabarito:** D

---

## ITEM 41 — Interpretação de tempo

- **Capacidade:** C1

**Comando:**  
Um TON com preset de 2,5 s liga sua saída quando:

**Alternativas:**
- A) A entrada liga 2,5 vezes.
- B) O CLP é ligado.
- C) Passam 2,5 minutos com a entrada desligada.
- D) A entrada permanece ligada por 2,5 s.

**Gabarito:** D

---

## ITEM 42 — Contador decrescente

- **Capacidade:** C1

**Comando:**  
O contador decrescente (CTD) é usado quando se quer:

**Alternativas:**
- A) Contar o tempo em segundos.
- B) Partir de um valor e descontar 1 a cada pulso (ex.: peças restantes no lote).
- C) Somar 1 a cada pulso.
- D) Inverter um sinal.

**Gabarito:** B

---

## ITEM 43 — Saídas que nunca ligam juntas

- **Capacidade:** C1

**Comando:**  
Além do intertravamento no programa, por que muitas vezes também se faz intertravamento elétrico (por contatos dos contatores)?

**Alternativas:**
- A) Para aumentar o consumo de energia.
- B) Para garantir a segurança mesmo se houver falha no programa ou na saída do CLP.
- C) Para deixar o painel mais bonito.
- D) Porque o CLP não aceita intertravamento.

**Gabarito:** B

---

## ITEM 44 — Seleção manual e automático

- **Capacidade:** C1

**Contexto:**  
Uma máquina tem chave de seleção MANUAL/AUTOMÁTICO. No modo automático, os botões de comando manual não podem atuar.

**Comando:**  
Isso é um exemplo de:

**Alternativas:**
- A) Comentário de rede.
- B) Entrada analógica.
- C) Intertravamento entre modos de operação.
- D) Contador de peças.

**Gabarito:** C

---

## ITEM 45 — Teste com simulador

- **Capacidade:** C1

**Comando:**  
Por que é útil testar o programa no simulador antes da bancada?

**Alternativas:**
- A) Porque o CLP real não executa programas.
- B) Para não precisar de docente.
- C) Para conferir a lógica sem risco para pessoas e equipamentos.
- D) Porque o simulador substitui a segurança da bancada.

**Gabarito:** C

---

## ITEM 46 — Registro do teste

- **Capacidade:** C1

**Comando:**  
Ao testar o programa da esteira, o que o aprendiz deve registrar?

**Alternativas:**
- A) O nome do fabricante do CLP.
- B) Cada ação feita (LIGA, DESLIGA, emergência) e o comportamento observado.
- C) Nada, basta ver a esteira andar.
- D) Apenas o horário de início.

**Gabarito:** B

---

## ITEM 47 — Aviso de partida e selo

- **Capacidade:** C1

**Contexto:**  
A esteira tem aviso sonoro de 5 s antes da partida. O operador pressiona LIGA (pulso).

**Comando:**  
Qual combinação de recursos faz a sequência funcionar?

**Alternativas:**
- A) Apenas o botão LIGA mantido pressionado por 5 s.
- B) Apenas um contador de 5 pulsos.
- C) Um contato NF do motor em série com a sirene.
- D) Selo para memorizar o pedido de partida e TON de 5 s para liberar o motor após o aviso.

**Gabarito:** D

---

## ITEM 48 — Conferir antes de culpar o CLP

- **Capacidade:** C1

**Contexto:**  
A esteira não parte. O operador vê que a porta de proteção está aberta.

**Comando:**  
Qual é a conclusão mais adequada?

**Alternativas:**
- A) É preciso fazer uma ponte no sensor.
- B) O intertravamento da porta está funcionando; fechar a porta e tentar novamente.
- C) É preciso reprogramar o CLP.
- D) O CLP está com defeito.

**Gabarito:** B

---

## ITEM 49 — Contador de lote completo

- **Capacidade:** C1

**Contexto:**  
O lote da linha de envase é de 500 garrafas. O contador está programado com preset 500 e liga a lâmpada "lote completo".

**Comando:**  
Quando a lâmpada acende?

**Alternativas:**
- A) Quando faltam 500 garrafas.
- B) A cada garrafa que passa.
- C) Quando a contagem atinge 500 garrafas.
- D) Após 500 segundos.

**Gabarito:** C

---

## ITEM 50 — Estruturas e segurança do operador

- **Capacidade:** C1

**Comando:**  
Por que o operador deve entender selo, temporizador, contador e intertravamento?

**Alternativas:**
- A) Para retirar os intertravamentos que atrasam a produção.
- B) Para alterar o programa durante a produção.
- C) Para operar com segurança, entender o comportamento da máquina e relatar falhas com precisão.
- D) Para dispensar o botão de emergência.

**Gabarito:** C

---
