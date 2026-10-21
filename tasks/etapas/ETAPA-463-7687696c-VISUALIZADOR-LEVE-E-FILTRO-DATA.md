## Etapa 463-7687696c — Visualizador de tarefas mais leve e com filtro por data

**Tarefa:** #334-7687696c-c42c-4f2a-919e-e381c59a1089 · **Pedido em:** 2026-10-21 18:51 · **Criada por:** Claude Code (Opus 5.5) (local · main · s34)
**Pedido:** "ESTE ARQUIVO ESTA MUITO PESADO, COMO MELHORAR ELE?" → "CORRIJA ENTAO" (passo 1: cada
etapa uma vez só) e "CRIE FILTRO POR DATA TAMBEM E FILTRE DE INICIO APENAS DOS ULTIMOS 3 DIAS"
**Objetivo:** o `.claude/rules/index.html` (≈ 97 MB) fica leve, porque o texto de cada etapa entra
uma vez só (hoje se repete em cada linha que aponta para ela), e a aba TASKS ganha filtro por data,
que abre mostrando só os últimos 3 dias.

### #334.1 — Cada etapa uma vez só no visualizador

**Próximo passo:** executor-medio altera o leitor e a aba TASKS e regenera.

- **Nível:** MEDIO — código com lógica em 2 arquivos (Python + JS), sem banco
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `scripts/regras/visualizador/leitor_tarefas.py` passa a devolver um dicionário
  `etapas` (`arquivo → {texto, proximo}`) lido uma vez por arquivo, e cada tarefa/frente guarda só
  a lista dos nomes de arquivo; `scripts/regras/visualizador/aba-tasks.js` busca o texto nesse
  dicionário.
- **Critérios de aceitação:** `index.html` regenerado com menos de 10 MB; mesmas tarefas, frentes
  e aguardando (contagens do gerador iguais); `node --check` e `py_compile` ok.

### #334.2 — Filtro por data na aba TASKS (abre nos últimos 3 dias)

**Próximo passo:** depois da #334.1, executor-medio cria o filtro.

- **Nível:** MEDIO — tela com lógica (JS) + campo de data no leitor, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** data de cada tarefa = `**Pedido em:**` da etapa ligada (o leitor extrai
  `AAAA-MM-DD`). Na aba TASKS, filtro de data (De / Até) junto dos chips de situação; ao abrir, De =
  hoje − 3 dias e Até = hoje; botão para limpar e ver tudo. Tarefa sem data só aparece com o filtro
  limpo.
- **Critérios de aceitação:** abre só com tarefas pedidas nos últimos 3 dias; mudar as datas
  refiltra; limpar mostra todas; `node --check` ok; conferir na tela (usuário).

### #334.3 — Visual futurista no visualizador

**Próximo passo:** depois da #334.2, executor-medio aplica o visual.

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
