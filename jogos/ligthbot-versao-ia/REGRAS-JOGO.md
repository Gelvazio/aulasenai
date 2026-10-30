Aqui está a especificação formal e rigorosa do sistema Lightbot, estruturada como um manual técnico de regras de negócio e de transição de estados. Esta estrutura foi desenhada especificamente para que você possa copiar, colar e alimentar o prompt de qualquer outra Inteligência Artificial (como geradores de código, solucionadores baseados em LLMs ou planejadores automáticos).

🤖 ESPECIFICAÇÃO DE REGRAS DO SISTEMA LIGHTBOT (Para IA)


1. Definição do Ambiente (Mundo Célula-Grade 3D)

O mundo é representado por um sistema de coordenadas cartesianas discretas tridimensionais (X, Y, Z), composto por duas matrizes principais de tamanho M × N:
• Matriz de Alturas (H): Onde cada célula \(H[y][x]\) contém um número inteiro ≥ 0 representando a altura (quantidade de blocos empilhados) naquela coordenada. Se \(H[y][x] = 0\), a célula é considerada um abismo intransitável.
• Matriz de Objetivos (O): Onde cada célula \(O[y][x]\) contém um valor booleano (True ou False), indicando se aquela coordenada possui uma lâmpada azul (objetivo de ativação).

Estado do Ambiente (\(S_{env}\))

O estado mutável do ambiente é mapeado por uma matriz booleana dinâmica de iluminação (L), onde:
• \(L[y][x]\) indica se a lâmpada na posição (x, y) está Acesa (True) ou Apagada (False).
• Estado Inicial: Para todo (x,y), se \(O[y][x] = \text{True}\), então \(L[y][x] = \text{False}\).

2. Definição do Agente (Robô)

O estado do agente (\(S_{agent}\)) é definido por uma tupla de 3 variáveis de estado discreto:
\(S_{agent}=\langle x,y,f\rangle \)
Onde:
• \(x \in [0, M-1]\) (Coordenada Horizontal)
• \(y \in [0, N-1]\) (Coordenada Vertical)
• \(f \in \{0, 1, 2, 3\}\) (Orientação/Frente do Robô):
	• 0: Norte (Δ x = 0, Δ y = -1)
	• 1: Leste (Δ x = 1, Δ y = 0)
	• 2: Sul (Δ x = 0, Δ y = 1)
	• 3: Oeste (Δ x = -1, Δ y = 0)

3. Função de Transição de Estados (Regras de Movimento e Ação)

Dada a posição atual do robô \(S_{agent} = \langle x, y, f \rangle\), define-se a coordenada imediatamente à frente como \(front = \langle x', y' \rangle\), calculada usando as variações \((\Delta x, \Delta y)\) da orientação f.
As alturas das respectivas posições são dadas por:
• \(Z_{current} = H[y][x]\)
• \(Z_{front} = H[y'][x']\) (Se fora dos limites da matriz, \(Z_{front} = 0\)).
O conjunto de ações primitivas \(A = \{\text{WALK}, \text{JUMP}, \text{LEFT}, \text{RIGHT}, \text{LIGHT}\}\) altera o estado conforme as seguintes guardas condicionais:

🚶 WALK (Avançar Linha Reta)

• Se \(Z_{front} > 0\) E \(Z_{front} == Z_{current}\):
	• x ← x'
	• y ← y'
• Caso contrário (Se houver degrau para cima, para baixo ou abismo):
	• O estado permanece inalterado (Ação falha/Robô bate).

🦘 JUMP (Pular)

• Se \(Z_{front} > 0\) E (\(Z_{front} == Z_{current} + 1\) OU \(Z_{front} < Z_{current}\)):
	• x ← x'
	• y ← y'
• Caso contrário (Se o bloco da frente for da mesma altura, alto demais ou abismo):
	• O estado permanece inalterado (Ação falha).

↩️ LEFT (Rotacionar Anti-horário)

• \(f \leftarrow (f + 3) \pmod 4\)

↪️ RIGHT (Rotacionar Horário)

• \(f \leftarrow (f + 1) \pmod 4\)

💡 LIGHT (Alternar Lâmpada)

• Se \(O[y][x] == \text{True}\):
	• \(L[y][x] \leftarrow \neg L[y][x]\) (Inverte o estado booleano da lâmpada).
• Caso contrário:
	• O estado permanece inalterado (Ação sem efeito).

4. Arquitetura de Memória e Fluxo de Execução

O interpretador do jogo processa os comandos de forma puramente estática e imperativa. Não existem sensores de tempo de execução (o robô não sabe se há uma parede ou lâmpada à frente antes de tentar executar a ação).
A memória do programa é dividida em registradores de tamanho fixo (Arrays de Strings):
1. MAIN: Array de tamanho fixo \(K_{main}\) (Ex: máximo de 8 ou 12 instruções).
2. PROC1: Sub-rotina de tamanho fixo \(K_{p1}\).
3. PROC2: Sub-rotina de tamanho fixo \(K_{p2}\).

Tokenização Extra de Fluxo

Além das ações primitivas do robô, os arrays podem conter tokens de controle:
• P1: Interrompe a execução atual, empilha o ponteiro de instrução atual, e desvia o fluxo para a primeira instrução de PROC1. Ao terminar PROC1, o fluxo retorna para a instrução subsequente à chamada.
• P2: Desvia o fluxo para a primeira instrução de PROC2, com o mesmo comportamento de retorno empilhado.

Regra de Recursão de Cauda (Loops)

Se o último token (ou qualquer token) dentro de PROC1 for o próprio comando P1, o sistema realiza uma chamada recursiva. Como o Lightbot original não gerencia estouro de pilha (Stack Overflow), a recursão funciona como um Loop Infinito que só é interrompido por dois fatores:
1. Interrupção manual do usuário.
2. Garantia de parada externa (Critério de Vitória satisfeito).

5. Critérios de Avaliação (Condição de Vitória e Fitness)


Condição de Vitória (Fim de Jogo com Sucesso)

O programa atinge o estado de vitória se, e somente se, após a execução completa de todas as instruções da fila (ou interrupção por limite de passos):
\(\forall x,y\text{\ onde\ }O[y][x]==\text{True}\implies L[y][x]==\text{True}\)
(Todas as lâmpadas configuradas no mapa devem estar obrigatoriamente acesas).

Restrições para Algoritmos de Otimização (Métricas de Custo)

Se a IA for usada para gerar soluções válidas, a modelagem deve penalizar:
• Tamanho do Código: Total de slots preenchidos em len(MAIN) + len(PROC1) + len(PROC2) não pode exceder os limites estáticos definidos pelo nível.
• Loop Estático: Evitar travamento do agente em loops infinitos que não alteram o estado do mapa (ex: ficar pulando contra a parede infinitamente em recursão).

6. Convenções de Coordenadas

• M = número de colunas (eixo x); N = número de linhas (eixo y).
• Indexação: H[y][x] (primeiro índice é a linha y, depois a coluna x). O mesmo vale para O e L.
• Origem (0, 0) no canto superior esquerdo; y cresce para baixo; x cresce para a direita.
• Orientação do robô (f) e variações de posição:

| f | Nome | Rótulo na tela | Δx | Δy |
|---|------|----------------|----|----|
| 0 | Norte | N | 0 | -1 |
| 1 | Leste | L | +1 | 0 |
| 2 | Sul | S | 0 | +1 |
| 3 | Oeste | O | -1 | 0 |

• Observação: o rótulo "O" (Oeste) não é a matriz de objetivos O; a matriz é sempre citada
  como "O[y][x]".
• RIGHT gira +1 (horário); LEFT gira -1 (anti-horário), sempre módulo 4.

7. Ações Primitivas: Tabela-Resumo

| Ação | Condição (guarda) | Efeito se válida | O que acontece se falhar |
|------|-------------------|------------------|--------------------------|
| WALK | Z_front > 0 E Z_front == Z_current | Move 1 célula à frente | Robô fica parado (bate) |
| JUMP | Z_front > 0 E (Z_front == Z_current + 1 OU Z_front < Z_current) | Move 1 célula à frente | Robô fica parado |
| LEFT | Sempre válida | f ← (f + 3) mod 4 | Não falha |
| RIGHT | Sempre válida | f ← (f + 1) mod 4 | Não falha |
| LIGHT | O[y][x] == True | Inverte L[y][x] | Sem efeito (lâmpada inexistente) |

Regras que valem para todas as ações:

• Ação inválida NÃO interrompe o programa. Ela consome 1 passo e a execução segue com a
  próxima instrução.
• Toda ação primitiva consome 1 passo, válida ou inválida (ver seção 8).
• Z_front fora do mapa é 0: WALK e JUMP para fora do mapa sempre falham.

Queda no JUMP (decisão do projeto: queda de qualquer altura permitida):

• JUMP pode descer para uma célula de altura menor que a atual, de qualquer diferença
  (Z_front < Z_current), desde que Z_front > 0.
• JUMP para degrau 2 ou mais acima (Z_front ≥ Z_current + 2) falha.
• WALK nunca desce nem sobe: qualquer diferença de altura faz o WALK falhar.
• Altura do robô: o robô não tem altura própria; ele "fica" sobre H[y][x] da célula onde está.

8. Modelo de Execução

8.1 Contador de passos

• Cada ação primitiva executada (WALK, JUMP, LEFT, RIGHT, LIGHT), válida ou inválida, = 1 passo.
• Chamadas P1 e P2 e os retornos das sub-rotinas NÃO contam passo.
• Slot vazio é ignorado e NÃO conta passo.

8.2 Pilha de chamadas

• Ao executar P1, o interpretador empilha o endereço da instrução seguinte à chamada (quem
  chamou e em que posição) e desvia para o primeiro slot de PROC1.
• Ao chegar ao fim de PROC1, desempilha o endereço e retoma a instrução seguinte à chamada.
• P2 segue a mesma regra, com PROC2.
• Pilha vazia e fim do MAIN = fim natural do programa (ver 8.3).

8.3 Fim natural do MAIN

• O programa termina naturalmente quando o ponteiro passa do último slot do MAIN e a pilha está
  vazia.
• Slots vazios no fim do MAIN são ignorados; slots vazios no meio são pulados.

8.4 Limite de passos (parada de segurança)

• Cada execução tem um limite máximo de passos, passosMaximos (valor sugerido: 1000). É uma
  constante configurável (ex.: PASSOS_MAXIMOS_PADRAO no código), e pode ser sobrescrita por nível.
• Correção da ambiguidade "recursão infinita": uma recursão de cauda NÃO trava o programa por si
  só. Ela é um loop que só para por uma das quatro causas de parada (8.5).
• O limite de passos é o que impede o navegador de travar. Sem ele, um PROC que só contém P1
  (sem nenhuma ação) rodaria para sempre, porque P1 não consome passo.
• Decisão do projeto (salvaguarda): chamadas P1/P2 consecutivas, sem nenhuma ação primitiva entre
  elas, também são contadas e param quando chegam ao mesmo limite passosMaximos.

8.5 Causas de parada

| Causa | Quando ocorre | Status exibido |
|-------|---------------|----------------|
| Vitória | Todas as lâmpadas acesas (seção 9) | Vitória |
| Fim do programa | Fim natural do MAIN com pilha vazia | Fim (sem vitória) |
| Parada manual | Usuário clica em Parar | Parado pelo usuário |
| Limite de passos | Contador atinge passosMaximos | Limite de passos atingido |

9. Momento da Verificação de Vitória

• A vitória é verificada APÓS CADA ação primitiva (inclusive as que falharam, pois não mudam L).
• Ao acender a última lâmpada, a execução para na hora: as instruções restantes não são
  executadas e o passo que acendeu conta normalmente.
• Diferença para o texto da seção 5: a versão anterior dizia "após a execução completa de todas
  as instruções". Essa versão fica substituída por esta.
  Decisão do projeto: verificação após cada ação, com parada imediata na vitória.
• Apagar uma lâmpada (LIGHT em lâmpada acesa) desfaz a vitória: ela só vale no momento em que
  todas estão acesas.

10. Limites por Nível

• Cada nível define o tamanho máximo de MAIN, PROC1 e PROC2 (em slots).
• Contagem de comandos usados = número de slots preenchidos em MAIN + PROC1 + PROC2 (P1 e P2
  também contam como slot).
• Os limites são por área: estourar PROC1 não é compensado por sobra em MAIN.
• Comandos liberados: só os tokens listados em comandosLiberados aparecem na paleta do nível.

Valores sugeridos (decisão do projeto; ajustar por nível):

| Nível | MAIN | PROC1 | PROC2 | Comandos liberados |
|-------|------|-------|-------|--------------------|
| 1 | 5 | 0 | 0 | WALK, JUMP, LEFT, RIGHT, LIGHT |
| 2 | 8 | 4 | 0 | + P1 |
| 3 | 8 | 4 | 4 | + P2 |

• Área sem limite (0 slots) fica oculta ou bloqueada na tela.
• Regra de conferência: comandos usados ≤ limite de cada área.

11. Formato de Dados de Nível (JSON)

Campos obrigatórios:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| nome | texto | Nome do nível |
| alturas | matriz N × M de inteiros ≥ 0 | H[y][x]; 0 = abismo |
| objetivos | lista de [x, y] | Posições das lâmpadas (O = True); mínimo 1 |
| inicio | {x, y, orientacao} | Posição e f (0 a 3) do robô; H[y][x] deve ser > 0 |
| limites | {main, proc1, proc2} | Slots de cada área |
| comandosLiberados | lista de textos | WALK, JUMP, LEFT, RIGHT, LIGHT, P1, P2 |
| passosMaximos | inteiro | Padrão 1000 se omitido |

Exemplo de nível pequeno (3 × 3):

```json
{
  "nome": "Nível 1 - Primeiro caminho",
  "alturas": [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ],
  "objetivos": [[2, 0]],
  "inicio": { "x": 0, "y": 2, "orientacao": 1 },
  "limites": { "main": 6, "proc1": 0, "proc2": 0 },
  "comandosLiberados": ["WALK", "JUMP", "LEFT", "RIGHT", "LIGHT"],
  "passosMaximos": 1000
}
```

Solução de referência (fica fora do JSON exibido ao aluno, pois é gabarito):

```
MAIN: WALK, WALK, LEFT, WALK, WALK, LIGHT   (6 slots; cabe em limites.main = 6)
```

12. Exemplos de Execução

12.1 Programa curto (nível 3 × 3 da seção 11, com limites.main = 6)

Estado inicial: x=0, y=2, f=1 (Leste); lâmpada em (2,0) apagada.

| Passo | Instrução | Posição (x,y) | f | Resultado | Lâmpada (2,0) | Vitória? |
|-------|-----------|---------------|---|-----------|---------------|----------|
| 0 | (início) | (0,2) | 1 | - | apagada | não |
| 1 | WALK | (1,2) | 1 | válida | apagada | não |
| 2 | WALK | (2,2) | 1 | válida | apagada | não |
| 3 | LEFT | (2,2) | 0 | válida | apagada | não |
| 4 | WALK | (2,1) | 0 | válida | apagada | não |
| 5 | WALK | (2,0) | 0 | válida | apagada | não |
| 6 | LIGHT | (2,0) | 0 | válida | ACESA | SIM: para |

Total: 6 passos, 6 comandos usados.

12.2 Loop por recursão de cauda com P1

Programa:
• MAIN: P1
• PROC1: WALK, P1

Estado inicial: x=0, y=0, f=1 (Leste); mapa de 3 colunas com alturas 1 e sem lâmpadas.

| Passo | Ação | Posição | Resultado | Observação |
|-------|------|---------|-----------|------------|
| - | P1 (MAIN) | (0,0) | - | Empilha retorno; não conta passo |
| 1 | WALK (PROC1) | (1,0) | válida | Conta passo |
| - | P1 (fim de PROC1) | (1,0) | - | Recursão; não conta passo |
| 2 | WALK | (2,0) | válida | Conta passo |
| - | P1 | (2,0) | - | Recursão; não conta passo |
| 3 | WALK | (2,0) | falha | Fora do mapa; consome passo |
| ... | WALK (falha repetida) | (2,0) | falha | Cada falha consome 1 passo |
| 1000 | WALK | (2,0) | falha | Limite atingido: parada |

Resultado: o loop para por Limite de passos (sem vitória, pois não há lâmpadas e o robô não agiu
para acender nada). Sem o limite, a aba travaria.

13. Casos de Borda

| Caso | Comportamento |
|------|---------------|
| Sair do mapa | WALK e JUMP falham (Z_front = 0). Consome passo. |
| Altura 0 na frente | É abismo: WALK e JUMP falham. |
| Robô começa em altura 0 | Nível inválido: o validador deve recusar (inicio exige H > 0). |
| LIGHT fora de lâmpada | Sem efeito. Consome passo. |
| Lâmpada acesa de novo com LIGHT | Alterna: apaga. Pode desfazer a vitória. |
| Mapa sem objetivo | Vitória trivial (∀ sobre conjunto vazio). Recomenda-se que todo nível tenha ao menos 1 objetivo; o validador deve recusar nível sem objetivo. |
| Slot P1 com PROC1 vazio | Chamada válida que não executa nada; a pilha volta ao MAIN. Sem passo. |
| P1 sem nenhuma ação em PROC1 | Coberto pela salvaguarda de 8.4 (para no limite). |

14. Mapeamento para a Interface

• Paleta: botões com WALK, JUMP, LEFT, RIGHT, LIGHT, P1 e P2; só os de comandosLiberados aparecem.
• Áreas: MAIN, PROC1 e PROC2 (esta última só se o nível tiver slots). Cada área mostra seus slots
  e o limite (ex.: 4/5).
• Botões de controle:
  • Executar: roda até uma das quatro causas de parada (seção 8.5).
  • Passo: executa uma ação primitiva e para.
  • Parar: interrompe a execução (parada manual).
  • Reiniciar: volta ao início do nível (posição, f, lâmpadas apagadas, contadores zerados).
  • Velocidade: intervalo entre passos da execução contínua.
• Ao vencer, a tela mostra: "Vitória", o total de passos e comandos usados × limite do nível
  (ex.: 6 de 8 comandos).

15. Glossário

| Termo | Significado |
|-------|-------------|
| Passo | Uma ação primitiva executada (válida ou não). |
| Slot | Posição de um array de MAIN, PROC1 ou PROC2. |
| Token de controle | P1 ou P2: chama uma sub-rotina; não é ação do robô. |
| Pilha de chamadas | Registro dos retornos pendentes das chamadas P1/P2. |
| Recursão de cauda | P1 (ou P2) como último comando da própria sub-rotina. |
| Lâmpada | Objetivo (O = True), acesa ou apagada (L). |
| Altura | Valor em H[y][x]; 0 é abismo. |
| Z_front / Z_current | Altura da célula à frente / da célula do robô. |
| Orientação (f) | Direção do robô, de 0 a 3 (N, L, S, O). |
| Limite de passos | passosMaximos: parada de segurança. |
