## Etapa 463-7687696c — Visualizador de tarefas mais leve e com filtro por data

**Tarefa:** #334-7687696c-c42c-4f2a-919e-e381c59a1089 · **Pedido em:** 2026-10-21 18:51 · **Criada por:** Claude Code (Opus 5.5) (local · main · s34)
**Pedido:** "ESTE ARQUIVO ESTA MUITO PESADO, COMO MELHORAR ELE?" → "CORRIJA ENTAO" (passo 1: cada
etapa uma vez só) e "CRIE FILTRO POR DATA TAMBEM E FILTRE DE INICIO APENAS DOS ULTIMOS 3 DIAS"
**Objetivo:** o `.claude/rules/index.html` (≈ 97 MB) fica leve, porque o texto de cada etapa entra
uma vez só (hoje se repete em cada linha que aponta para ela), e a aba TASKS ganha filtro por data,
que abre mostrando só os últimos 3 dias.

### #334.1 — Cada etapa uma vez só no visualizador

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — código com lógica em 2 arquivos (Python + JS), sem banco
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `scripts/regras/visualizador/leitor_tarefas.py` passa a devolver um dicionário
  `etapas` (`arquivo → {texto, proximo}`) lido uma vez por arquivo, e cada tarefa/frente guarda só
  a lista dos nomes de arquivo; `scripts/regras/visualizador/aba-tasks.js` busca o texto nesse
  dicionário.
- **Critérios de aceitação:** `index.html` regenerado com menos de 10 MB; mesmas tarefas, frentes
  e aguardando (contagens do gerador iguais); `node --check` e `py_compile` ok.
- **Executor:** Claude Code (Sonnet · executor-medio) (local · main · s34), líder Opus 5.5
- **Entrega:** `leitor_tarefas.py` (nova `ler_etapa` com cache; `ler_tarefas` devolve `etapas`
  {arquivo → texto, proximo}; tarefa/frente guardam só os nomes) e `aba-tasks.js` (busca em
  `DADOS.tasks.etapas`) — 2026-10-21 19:07
- **Verificação:** `index.html` de 96,6 MB → 3,2 MB; contagens iguais (111 seções, 1838 tarefas,
  59 frentes, 62 aguardando); `py_compile` e `node --check` ok; diff conferido pelo líder.
  Conferir na tela (usuário) o modal da tarefa com o texto da etapa.

### #334.2 — Filtro por data na aba TASKS (abre nos últimos 3 dias)

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — tela com lógica (JS) + campo de data no leitor, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** data de cada tarefa = `**Pedido em:**` da etapa ligada (o leitor extrai
  `AAAA-MM-DD`). Na aba TASKS, filtro de data (De / Até) junto dos chips de situação; ao abrir, De =
  hoje − 3 dias e Até = hoje; botão para limpar e ver tudo. Tarefa sem data só aparece com o filtro
  limpo.
- **Critérios de aceitação:** abre só com tarefas pedidas nos últimos 3 dias; mudar as datas
  refiltra; limpar mostra todas; `node --check` ok; conferir na tela (usuário).
- **Executor:** Claude Code (Sonnet · executor-medio) (local · main · s34), líder Opus 5.5
- **Entrega:** `leitor_tarefas.py` (`PADRAO_DATA_PEDIDO`, `data` em cada etapa e tarefa) e
  `aba-tasks.js` (De/Até + "Ver tudo", `DIAS_FILTRO_INICIAL = 3`, classes `filtro-datas*`;
  estilo no `estilo.css` pela #334.3) — 2026-10-21 19:15
- **Verificação:** `py_compile` e `node --check` ok; gerador sem erro, contagens iguais; 1818 de
  1838 tarefas com data, 655 nos últimos 3 dias. Conferir na tela (usuário).

### #334.3 — Visual futurista no visualizador

**Próximo passo:** — (concluída)

- **Decisão (2026-10-21 19:05, usuário "chame varios agentes"):** sem dependência da #334.2 — arquivos
  diferentes (`estilo.css`, `modelo.html`); roda em paralelo; o líder regenera o HTML no fim.

- **Pedido:** "E ADICIONE VISUAL FUTURISTA COM:" + `C:\fontes\rules-ai\prompts\VISUAL-FUTURISTA.md`
- **Nível:** MEDIO — CSS da página toda (tokens, animações, acessibilidade), até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** aplicar em `scripts/regras/visualizador/estilo.css` (e `modelo.html` só para as
  fontes Orbitron e Share Tech Mono) a tabela "Como aplicar em código" do prompt: fundo escuro
  `#05030d` com gradientes violeta/magenta, neon ciano/magenta/violeta em tokens `:root`, cartões
  semitransparentes com `backdrop-filter` e borda neon, grade fina fixa, barra de varredura.
- **Critérios de aceitação:** regras de acessibilidade do prompt (`prefers-reduced-motion`,
  contraste, `:focus-visible` magenta, 1 coluna até 720 px); cores só por tokens; regenerado;
  conferir na tela (usuário).
- **Executor:** Claude Code (Sonnet · executor-medio, agente 2) (local · main · s34), líder Opus 5.5
- **Entrega:** `estilo.css` reescrito (tokens neon, vidro com `backdrop-filter`, grade, varredura,
  Orbitron/Share Tech Mono, estilo do filtro de datas) e `modelo.html` (links do Google Fonts) —
  2026-10-21 19:18
- **Verificação:** sem `!important`; nenhuma linha > 100; `prefers-reduced-motion`,
  `:focus-visible` magenta e 1 coluna até 720 px presentes; classes antigas mantidas (grep nos
  JS). Conferir na tela (usuário); sem internet as fontes caem no fallback.
