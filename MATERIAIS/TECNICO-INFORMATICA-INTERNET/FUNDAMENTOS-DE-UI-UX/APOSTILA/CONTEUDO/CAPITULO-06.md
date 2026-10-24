# Capítulo 06 — User Interface: definição e tipos de interface

- **Aula:** 06
- **Capacidade:** C3, S4

## Teoria

### O que é User Interface

Computadores processam apenas zeros e uns em altíssima velocidade; pessoas pensam em ideias,
imagens, palavras e sentimentos. A **User Interface (UI)** é a camada mediadora que traduz
intenções humanas em operações lógicas do sistema — e nunca funciona numa direção só:

- **Entrada (input):** o que você envia por clique, tecla, fala ou gesto;
- **Saída (output):** o que a tela exibe, emite em áudio ou vibra como retorno.

Essa tradução em via de mão dupla forma o **ciclo de interação**: o usuário define uma intenção,
envia um comando pela modalidade da interface, o sistema processa e a interface devolve um
feedback visível ou sonoro.

### Como a tecnologia evoluiu em interfaces

| Época | Modalidade |
|---|---|
| Anos 1960–70 | CLI — linhas de comando em telas escuras com teclado |
| Anos 1980 | GUI — janelas, ícones, mouse e menus gráficos |
| Anos 2000–10 | NUI — telas multi-toque e gestos |
| Dias atuais | VUI e híbridas — voz e inteligência integradas |

### Interface de linha de comando (CLI)

A **Command Line Interface** opera por comandos de texto digitados no teclado, sem botões, barras
ou ícones: no prompt (`$` ou `>`), o operador digita o comando com parâmetros e pressiona Enter.
Toda instrução depende da memória exata da sintaxe.

- **Vantagens:** consome pouca memória, opera com extrema velocidade e permite automatizar
  tarefas repetitivas em scripts;
- **Limitações:** curva de aprendizado íngreme — quem esquece o comando não recebe sugestões
  visuais;
- **Onde ainda reina:** servidores web via SSH, desenvolvimento (compilar, testar, versionar com
  Git) e roteadores de rede de grande porte.

### Interface gráfica (GUI)

A **Graphical User Interface** introduziu representações visuais diretas: em vez de memorizar
comandos, a pessoa reconhece pastas, botões, janelas e lixeiras, manipuladas pelo cursor. É o
conceito **WIMP**: Windows (janelas), Icons (ícones), Menus e Pointer (ponteiro).

| Pilar | Função |
|---|---|
| Ícones e símbolos | Substituem texto por símbolos universais (engrenagem, sino, lixeira) |
| Menus e navegação | Agrupam ações possíveis — escolher sem memorizar |
| Janelas e painéis | Isolam tarefas e conteúdos, permitindo multitarefa organizada |
| Ponteiro e clique | Manipulação direta: apontar para o que deseja e clicar |

**Força da GUI:** reconhecer é mais fácil que lembrar — as opções já estão diante dos olhos.
**Risco:** excesso de botões sem hierarquia gera sobrecarga visual e confusão.

### Interface de voz (VUI)

A **Voice User Interface** permite controlar dispositivos pela fala, usando processamento de
linguagem natural (PLN) para interpretar o que foi dito. O ciclo tem quatro etapas:

1. **Captura da fala** — o microfone capta as ondas sonoras e filtra ruídos;
2. **Conversão áudio-texto** — o algoritmo transforma o som em texto;
3. **Interpretação semântica** — o sistema descobre a intenção e os parâmetros do pedido;
4. **Resposta sintetizada** — executa a ação e devolve retorno em áudio ou tela.

**Desafios:** sotaques e ruído ambiente causam erros de interpretação, e falar senhas ou
mensagens íntimas em público torna a voz inadequada em certos contextos.

### Interface natural (NUI)

A **Natural User Interface** elimina o intermediário mecânico (teclado, mouse) e responde a
comandos diretos do corpo — "natural" porque aproveita gestos e reflexos que já usamos no mundo
físico:

- **Multi-toque direto:** telas capacitivas registram vários dedos para girar, pinçar e arrastar;
- **Gestos no espaço:** câmeras e sensores de profundidade rastreiam os braços sem toque;
- **Biometria:** reconhecimento facial ou digital como comando de desbloqueio;
- **Rastreamento ocular:** sensores identificam para onde a pupila olha.

### Comparando as modalidades na mesma tarefa

Tocar uma música: na CLI você digita `play --song "nome"` (exige teclado e o nome exato); na GUI
abre o app e clica no play (exige tela e atenção visual); na VUI diz "tocar minha playlist"
(livre para mãos e olhos, ideal no trânsito).

| Modalidade | Melhor para | Ponto fraco |
|---|---|---|
| CLI (texto) | Servidores, scripts, usuários técnicos | Inacessível ao público leigo |
| GUI (gráfica) | Catálogos, edição de texto, tarefas visuais | Ocupa a visão e exige as mãos |
| VUI (voz) | Cozinhar, dirigir, acessibilidade motora | Baixa privacidade, vulnerável a ruído |
| NUI (natural) | Celulares, quiosques, gestos intuitivos | Cansaço em gestos longos, menor precisão fina |

O esforço de aprendizado cresce na ordem: NUI (gestos já praticados) → VUI (conversacional) →
GUI (lógica de botões e pastas) → CLI (estudo formal de sintaxe).

⚠️ **A melhor interface é a adequada ao contexto da pessoa, não a mais tecnológica:** forçar voz
para editar planilha de números exausta e gera erros; menus de toque complexos para quem dirige
desviam o olhar da pista.

### Acessibilidade digital: interfaces para todos

- **Leitores de tela:** traduzem elementos gráficos em áudio para pessoas cegas;
- **Legendas e transcrições:** alternativa visual a avisos sonoros para pessoas surdas;
- **Áreas de toque amplas:** botões grandes e espaçados para quem tem tremores ou dificuldades
  motoras.

O futuro é das **interfaces multimodais**: o sistema inteligente combina canais — olhar para um
item (rastreamento ocular) e confirmar a compra por voz, ou digitar no teclado e arrastar fotos
com o dedo.

### Estudo de caso (SA 1): agendamento para idosos

Usuários idosos não conseguiam marcar consulta pelo celular. Diagnóstico: botões de calendário
pequenos demais para os dedos (falha na NUI) e mensagens de erro em códigos de terminal (falha de
linguagem). Solução: botões ampliados, calendário visual nítido e confirmação por voz.

## Resumo

- UI é a camada que traduz intenções humanas em operações da máquina, em ciclo de entrada e
  saída.
- Quatro modalidades: CLI (texto e sintaxe), GUI (janelas, ícones, menus, ponteiro — WIMP), VUI
  (fala processada por PLN) e NUI (toque direto, gestos, biometria, olhar).
- Reconhecer é mais fácil que lembrar — força da GUI; a CLI vence em velocidade, memória e
  automação para técnicos.
- Voz liberta mãos e olhos, mas falha com ruído e falta privacidade; a NUI exige menos
  aprendizado, mas menos precisão fina.
- A escolha certa depende do contexto: segurança, privacidade, iluminação e ruído decidem a
  modalidade — e o futuro é multimodal.
- Acessibilidade (leitor de tela, legendas, áreas amplas) garante autonomia para todos.

## Glossário

- **Interface do usuário (UI):** parte do sistema com que a pessoa interage.
- **Comando:** instrução explícita dada ao computador para executar uma ação definida.
- **Interação:** ciclo contínuo de ação do usuário e resposta perceptível da máquina.
- **Modalidade:** meio físico ou sensorial usado na comunicação (texto, visão, voz ou toque).
- **CLI (Command Line Interface):** interação por comandos de texto digitados no teclado.
- **GUI (Graphical User Interface):** interação por janelas, ícones, menus e ponteiro.
- **VUI (Voice User Interface):** interação por fala, interpretada por linguagem natural.
- **NUI (Natural User Interface):** interação por toque direto, gestos e sensores do corpo.
- **WIMP:** pilares da GUI — Windows, Icons, Menus e Pointer.
