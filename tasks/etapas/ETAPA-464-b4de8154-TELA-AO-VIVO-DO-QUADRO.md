## Etapa 464-b4de8154 — Tela AO VIVO do quadro de tarefas

**Tarefa:** #335-b4de8154-2af7-4357-a5bc-3319de3387e3 · **Pedido em:** 2026-10-21 18:57 · **Criada por:** Claude Code (Opus 5.5) (local · main · s34)
**Pedido:** "crie mais um menu aqui de nome *AO VIVO*, que deve abrir uma nova tela de nome
live.html, que se atualiza com as tarefas ao vivo" (print do menu REGRAS / TASKS do visualizador)
**Objetivo:** botão AO VIVO no visualizador abre `.claude/rules/live.html`, que lê o quadro
publicado no GitHub e se atualiza sozinho.

### Decisões

- 2026-10-21 18:57, líder Opus 5.5: fonte "ao vivo" = `tasks/STATUS.md` e `tasks/task_complete.md`
  públicos em `raw.githubusercontent.com/Gelvazio/aulasenai/main/` (o repositório é público, como
  no `gerenciador-de-ia`); arquivo local não pode ser lido por `file://`. Atualiza a cada 60 s (o
  GitHub guarda cópia por até ~5 min). `live.html` é gerado pelo mesmo gerador, com o mesmo
  `estilo.css` (visual futurista).

### #335.1 — Página live.html que se atualiza sozinha

**Próximo passo:** executor-medio cria `live-modelo.html` + `live.js` e o gerador grava `live.html`.

- **Nível:** MEDIO — tela com lógica (JS) + gerador, 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `scripts/regras/visualizador/live-modelo.html` e `live.js` (novos);
  `gerar_visualizador_regras.py` grava também `.claude/rules/live.html` com o CSS embutido.
  A página busca os dois Markdown a cada 60 s, lê as tabelas "🧭 Frentes" e "📌 Tarefas" e mostra:
  frentes ativas, subtarefas 🔄 (com "Em uso por"), 👀 e ⛔, últimas concluídas do
  `task_complete.md`, hora da última leitura e aviso de erro de rede; destaca o que mudou desde a
  leitura anterior.
- **Critérios de aceitação:** `live.html` gerado; `node --check` e `py_compile` ok; contagens
  conferidas contra o `STATUS.md`; conferir na tela (usuário).

### #335.2 — Botão AO VIVO no menu do visualizador

**Próximo passo:** — (concluída)

- **Nível:** LEVE — um link no HTML + estilo, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Descrição:** em `scripts/regras/visualizador/modelo.html`, ao lado de REGRAS e TASKS, link
  `<a class="abas__botao abas__botao--ao-vivo" href="live.html" target="_blank" rel="noopener">AO VIVO</a>`;
  em `estilo.css`, o modificador `.abas__botao--ao-vivo` (ponto pulsando magenta antes do texto,
  desligado em `prefers-reduced-motion`).
- **Critérios de aceitação:** link no menu; só tokens; linhas ≤ 100; conferir na tela (usuário).
- **Executor:** Claude Code (Haiku · executor-leve) (local · main · s34), líder Opus 5.5
- **Entrega:** link AO VIVO no `modelo.html` e `.abas__botao--ao-vivo` (+ `::before` pulsando,
  `@keyframes pulsar-ao-vivo`, desligado em reduced-motion) no `estilo.css` — 2026-10-21 19:02
- **Verificação:** grep do link e das regras; nenhuma linha > 100; só tokens existentes; diff
  conferido pelo líder. Conferir na tela (usuário).
