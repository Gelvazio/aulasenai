# 📚 ORIENTACAO_JS_LIGHTBOT.md

## 1. O que é e onde fica

O **Light Bot** é um jogo de programação em blocos: o aluno monta um programa com comandos
(andar, pular, girar, acender a lâmpada e sub-rotinas P1/P2) para o robô acender todas as
lâmpadas do mapa. As regras completas estão em `jogos\ligthbot-versao-ia\REGRAS-JOGO.md`
(seção 11 = formato dos níveis; seção 8 = modelo de execução).

| Parte | Caminho | Observação |
|-------|---------|------------|
| **Fonte** (código editável) | `jogos\ligthbot-versao-ia\fonte\` | Vite, JavaScript ES modules, CSS puro |
| **Build** (site estático) | `jogos\ligthbot-versao-ia\index.html` e `jogos\ligthbot-versao-ia\assets\` | Gerado pelo `vite build`, **versionado no Git** |

- ⛔ Não editar `index.html` nem `assets\` à mão: são saída do build.
- ✅ A Vercel **não roda build**: o site é servido como está no repositório. Por isso o build
  precisa ser feito localmente e commitado junto com a fonte.

## 2. Como rodar

```bash
cd jogos/ligthbot-versao-ia/fonte
npm install          # primeira vez (gera node_modules/, que fica fora do Git)
npm run dev          # servidor de desenvolvimento do Vite (uso local)
npm run build        # gera o site em jogos/ligthbot-versao-ia/ (vite.config.js: outDir "../")
npm run preview      # confere o build localmente
```

- `vite.config.js`: `base: "./"` (caminhos relativos) e `emptyOutDir: false` (não apaga a pasta
  da saída; o build só regrava `index.html` e `assets\`).
- Validar sem navegador: `node --check` nos `.js` alterados e conferir o `index.html` gerado.

## 3. Estrutura de pastas

| Arquivo | Responsabilidade |
|---------|------------------|
| `fonte/index.html` | Esqueleto da página (regiões: mapa, paleta, áreas, controles, telemetria, seletor, diálogo de vitória) |
| `fonte/package.json` | Scripts `dev`, `build`, `preview`; dependência de desenvolvimento `vite` |
| `fonte/vite.config.js` | Caminho relativo e pasta de saída do build |
| `fonte/src/main.js` | Ponto de entrada: importa estilos, monta o objeto `nucleo` e `vista` e cria o `Jogo` |
| `fonte/src/constantes.js` | Todas as constantes: comandos, orientações, áreas, velocidades, chave do progresso, mensagens |
| `fonte/src/nucleo/` | Regras do jogo, sem DOM (ver seção 4) |
| `fonte/src/interface/` | Desenho e DOM: mapa, robô, paleta, controles, seletor, vitória, fundo (ver seção 5) |
| `fonte/src/aplicacao/jogo.js` | Controlador: fluxo de execução, passos e vitória (ver seção 6) |
| `fonte/src/aplicacao/niveis.js` | Carrega os níveis `nivel-*.json` em ordem numérica (`import.meta.glob`) |
| `fonte/src/niveis/nivel-NN.json` | Dados de cada nível (formato da seção 11 de `REGRAS-JOGO.md`) |
| `fonte/src/niveis/solucoes.md` | Gabarito de referência: **não** é lido pelo código nem vai para a tela |
| `fonte/src/estilos/base.css` | Base da página e tipografia |
| `fonte/src/estilos/componentes.css` | Botões, paleta, slots, seletor, telemetria e tela de vitória |
| `fonte/src/estilos/mapa.css` | Blocos isométricos, lâmpadas, robô e animações |
| `fonte/src/estilos/fundo.css` | Rede de fundo animada |
| `fonte/src/estilos/acessibilidade.css` | Foco visível, leitor de tela e `prefers-reduced-motion` |

## 4. Núcleo (`fonte/src/nucleo/`)

Regras puras, sem DOM. Os tokens e a orientação vêm de `constantes.js`.

### `mundo.js`

| Função | Assinatura | Retorno |
|--------|-----------|---------|
| `chaveDaCelula` | `(x, y)` | Chave `"x,y"` |
| `obterAltura` | `(mundo, x, y)` | Altura da célula; fora do mapa vale 0 (abismo) |
| `criarMundo` | `(nivel)` | Mundo novo com lâmpadas apagadas; lança erro se o nível for inválido |
| `temObjetivo` | `(mundo, x, y)` | `true` se há lâmpada-objetivo na célula |
| `luzAcesa` | `(mundo, x, y)` | `true` se a lâmpada está acesa |
| `alternarLuz` | `(mundo, x, y)` | Inverte a lâmpada; `false` se não há lâmpada |
| `apagarLuzes` | `(mundo)` | Apaga todas (reinício) |

### `robo.js`

| Função | Assinatura | Retorno |
|--------|-----------|---------|
| `criarRobo` | `(inicio)` | `{ x, y, orientacao }` na posição inicial |
| `posicaoDaFrente` | `(robo)` | Coordenada `{ x, y }` da célula à frente |
| `executarAcao` | `(robo, mundo, comando)` | `true` se a ação teve efeito; lança erro para comando desconhecido |

- As guardas de WALK, JUMP, LEFT, RIGHT e LIGHT ficam em funções internas (`andar`, `pular`,
  `girar`, `acender`) ligadas ao mapa `ACOES` (ver seção 7).

### `programa.js`

| Função | Assinatura | Retorno |
|--------|-----------|---------|
| `criarPrograma` | `(limites)` | Programa vazio: `{ main, proc1, proc2 }` com slots `null` |
| `inserirComando` | `(programa, area, comando)` | `false` se a área estiver cheia |
| `removerComando` | `(programa, area, indice)` | Esvazia o slot |
| `limparPrograma` | `(programa)` | Esvazia as três áreas |
| `contarComandosUsados` | `(programa)` | Total de slots preenchidos (P1 e P2 contam) |
| `estaVazio` | `(slot)` | `true` se o slot é `null` |

### `vitoria.js`

| Função | Assinatura | Retorno |
|--------|-----------|---------|
| `todasLuzesAcesas` | `(mundo)` | `true` se há objetivos e todos estão acesos |

### `interpretador.js`

| Item | Assinatura | Papel |
|------|-----------|-------|
| `class Interpretador` | `constructor({ programa, mundo, robo, executarAcao, verificarVitoria, passosMaximos })` | Uma execução: área atual, índice, pilha de chamadas e contadores |
| `proximoPasso()` | `() => { parou, motivo?, comando?, efetiva?, posicao?, passos }` | Avança até a próxima ação primitiva ou até uma causa de parada |
| `obterPassos()` | `() => number` | Passos executados |
| `criarInterpretador` | `(dependencias)` | Cria um `Interpretador` (fábrica usada pelo controlador) |

- Chamadas P1/P2 não contam passo; ação primitiva conta, válida ou não.
- A vitória é checada após cada ação; o motivo de parada vem de `constantes.js`.

## 5. Interface (`fonte/src/interface/`)

Cada módulo exporta funções que recebem o **elemento do DOM** e, quando precisam, um objeto
de opções com callbacks (`aoEscolher`, `aoRemover`, `aoExecutar`…).

| Módulo | Funções exportadas | Papel |
|--------|--------------------|-------|
| `controles.js` | `montarControles(elemento, chamadas)`, `definirEstadoControles(elemento, { executando })`, `atualizarTelemetria(elemento, dados)` | Botões EXECUTAR, PASSO, PARAR, REINICIAR, LIMPAR; velocidade; medidores de passos e comandos |
| `fundo.js` | `montarFundo(elemento)` | Rede de fundo em SVG com semente fixa |
| `mapa.js` | `projetarCelula(x, y, altura)`, `desenharMapa(elemento, mundo)`, `atualizarLuzes(elemento, mundo)` | Mapa isométrico em SVG; lâmpadas acesas e apagadas |
| `paleta.js` | `montarPaleta(elemento, { comandosLiberados, aoEscolher })`, `montarAreas(elemento, contexto)`, `destacarSlot(elemento, area, indice)` | Botões de comando e áreas MAIN, PROC1, PROC2 com slots |
| `robo-visual.js` | `desenharRobo(elemento, robo, mundo)`, `animarAcao(elemento, comando, efetiva)` (async) | Robô em SVG e animação de cada ação |
| `seletor-niveis.js` | `montarSeletor(elemento, { total, atual, concluidos, aoEscolher })`, `carregarProgresso()`, `salvarProgresso(concluidos)` | Botões de nível e progresso no `localStorage` |
| `vitoria-tela.js` | `mostrarVitoria(dialogo, opcoes)` | Diálogo de vitória com resumo e botões PRÓXIMO NÍVEL / JOGAR DE NOVO |

### Contrato de classes CSS (BEM)

- **Bloco** = nome do componente; **elemento** = `bloco__parte`; **modificador** = `bloco--estado`.
- Exemplos: `botao` + `botao--primario`/`botao--perigo`/`botao--velocidade`; `comando` +
  `comando--chamada`; `area-comandos` + `area-comandos--ativa`/`--bloqueada`; `slot` +
  `slot--vazio`/`slot--preenchido`/`slot--atual`; `robo` + `robo--andando`/`--pulando`/
  `--girando`/`--acendendo`/`--falha`; `mapa__lampada` + `mapa__lampada--acesa`;
  `nivel-botao` + `nivel-botao--atual`/`--concluido`; `telemetria__linha`, `medidor`.
- ⛔ Interface não cria classe fora desse padrão e não usa `style=""` nem `onclick` no HTML:
  eventos entram pelo JavaScript.
- Estado visual muda por classe (ex.: `robo--andando`), nunca por estilo inline.

## 6. Controlador (`fonte/src/aplicacao/jogo.js`)

Classe `Jogo`, criada em `main.js` com dependências **injetadas**:

```javascript
new Jogo({ niveis: listarNiveis(), nucleo, vista, elementos: buscarElementos() }).iniciar();
```

- `nucleo`: `criarMundo`, `criarRobo`, `criarPrograma`, `inserirComando`, `removerComando`,
  `limparPrograma`, `contarComandosUsados`, `executarAcao`, `criarInterpretador`, `verificarVitoria`.
- `vista`: todas as funções de `interface/` listadas na seção 5 (e `carregarProgresso`,
  `salvarProgresso`, `mostrarVitoria`).
- `elementos`: referências do DOM por nome (`mapa`, `mensagem`, `paleta`, `areas`, `controles`,
  `telemetria`, `seletor`, `dialogo`), obtidas em `main.js`.

### Fluxo

1. `iniciar()`: carrega o progresso, monta os controles e abre o primeiro nível pendente.
2. `abrirNivel(numero)`: interrompe execução, cria programa vazio, monta paleta e seletor.
3. Editar programa: `escolherComando` e `removerComando`, bloqueados durante a execução.
4. `executar()`: prepara mundo e robô, cria o `Interpretador` e roda `rodar()` em laço com
   intervalo de `intervaloMs` (velocidade LENTA, NORMAL ou RÁPIDA).
5. `darPasso()`: um único `proximoPasso()`, sem laço.
6. `aplicarResultado(resultado)`: destaca o slot, redesenha robô e luzes, anima e atualiza a
   telemetria.
7. `parar()`: interrompe pelo identificador de execução (o laço percebe e sai).
8. `finalizar(motivo)`: mostra a mensagem do motivo; na vitória, `registrarVitoria()` grava o
   progresso e abre a tela de vitória.

- O progresso é só `Set` de níveis concluídos em `localStorage`; falha de gravação mostra
  `MENSAGENS.progressoIndisponivel` e o jogo segue.

## 7. Como acrescentar

### Um nível novo

1. Criar `fonte/src/niveis/nivel-NN.json` (dois dígitos, em sequência: `nivel-11.json`).
2. Seguir a seção 11 de `REGRAS-JOGO.md`: `nome`, `alturas` (N × M, inteiros ≥ 0),
   `objetivos` (mínimo 1, sobre bloco com altura > 0), `inicio` (`x`, `y`, `orientacao` 0 a 3,
   sobre bloco), `limites` (`main`, `proc1`, `proc2`), `comandosLiberados` e `passosMaximos`
   (opcional, padrão 1000).
3. Não colocar a solução no JSON nem na tela: o gabarito fica só em `solucoes.md` (Git).
4. O `listarNiveis()` pega o arquivo sozinho (`import.meta.glob`); não há lista para editar.
5. Rodar `npm run build` e commitar a fonte e a saída juntas.

### Um comando novo

1. Em `fonte/src/constantes.js`: criar a constante do token (ex.: `COMANDO_NOVO = "NOVO"`),
   incluir em `COMANDOS_PRIMITIVOS` (ou `COMANDOS_CHAMADA`, se for sub-rotina), e acrescentar
   rótulo em `ROTULOS_COMANDOS` e símbolo em `SIMBOLOS_COMANDOS`.
2. Em `fonte/src/nucleo/robo.js`: criar a função da ação (com guarda, sem DOM) e registrá-la no
   mapa `ACOES` (`[COMANDO_NOVO]: funcaoNova`). Nenhum `if/else` novo.
3. Se houver classe visual de estado, incluir em `CLASSE_POR_COMANDO` de `robo-visual.js`.
4. Ajustar `REGRAS-JOGO.md` e liberar o token nos níveis que devem usá-lo.

## 8. Regras do projeto aplicadas

- ✅ **SOLID:** núcleo sem DOM; interface em módulos por tela; `Jogo` recebe tudo injetado;
  comandos em mapa de estratégias (`ACOES`), não em cadeia de `if`.
- ✅ **Funções até 45 linhas**, até 3 parâmetros (objeto quando passar disso), com JSDoc.
- ✅ **Nomes em português sem acentos** (`moverPara`, `obterAltura`, `MENSAGENS`). Exceções:
  APIs do navegador e do Vite (`localStorage`, `matchMedia`, `import.meta.glob`).
- ✅ **Constantes em `constantes.js`**: nenhuma string de comando, mensagem ou chave espalhada.
- ✅ **HTML e CSS separados:** sem `style=""`, sem `<script>` inline e sem `onclick`; o HTML só
  carrega o módulo gerado.
- ✅ **`prefers-reduced-motion`:** as animações são desligadas em `acessibilidade.css`, em
  `fundo.css` e `mapa.css`, e `animarAcao` pula a espera quando a preferência está ativa.
- ✅ **Progresso só em `localStorage`**, com `try/catch` em `carregarProgresso` e
  `salvarProgresso`; dado inválido vira progresso vazio.
- ⛔ **Nada de banco:** o jogo não usa Supabase nem chamadas de rede; não há dados de aluno.
- ⛔ **Gabarito fora do alcance do aluno:** `solucoes.md` não é importado pelo código e não vai
  para a tela.
- ⛔ Não editar `index.html` nem `assets\` à mão: são saída do `npm run build`.

## 📝 Histórico de Mudanças

| Data | Mudança | Commit |
|------|---------|--------|
| 2026-10-30 | Criação da orientação do Light Bot (subtarefa #444.23) | — (commit do líder) |
