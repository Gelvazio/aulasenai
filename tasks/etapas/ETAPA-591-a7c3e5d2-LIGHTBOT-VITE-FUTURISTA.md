## Etapa 591-a7c3e5d2 — #444: Light Bot em Vite com visual futurista

**Tarefa:** #444-a7c3e5d2 · **Pedido em:** 2026-10-29 22:05 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "LEIA https://www.gameflare.com/online-game/light-bot/ E CRIE 1 VERSAO COM VITE, HTML, CSS E JAVASCRIPT, USANDO O VISUAL FUTURISTA" (com `rules-ai/prompts/VISUAL-FUTURISTA.md`).
**Objetivo:** um Light Bot jogável em `jogos/ligthbot-versao-ia/`, feito com Vite + HTML + CSS + JS, no tema futurista (cyberpunk) já usado em `jogos/jogos.css`.

### Escopo
- **Entra:** grade de mapa com blocos e luzes, robô, área de programa com comandos (avançar, girar esquerda/direita, pular, acender), procedimentos (PROC1/PROC2), botões executar/parar/limpar, vários níveis, tela de vitória, contagem de comandos.
- **Não entra:** banco, login, ranking, som, editor de níveis, backend.
- Mecânica baseada no Light Bot clássico. A página do gameflare respondeu **403** à leitura (WebFetch), então as regras vêm do jogo conhecido; se o usuário quiser fidelidade a um detalhe da página (ex.: nº de níveis ou limite de comandos), basta dizer.

### Riscos
- O site é estático e **não roda `vite build` na Vercel**: o build precisa ficar versionado. Plano B: se o build gerar arquivos demais, usar `base: './'` e um único `assets/`.
- Regra do projeto diz "sem `package.json`" na raiz: o `package.json` fica **só** dentro de `ligthbot-versao-ia/fonte/`; `node_modules/` no `.gitignore`.

### Decisões
- **Proposta (aguarda o "sim"):** fonte em `ligthbot-versao-ia/fonte/` (Vite `root`), build com `outDir: '../'` e `emptyOutDir: false`, para o `index.html` gerado ficar em `ligthbot-versao-ia/index.html` e o card `ligthbot-versao-ia/` abrir direto.
- **Aprovação do usuário:** ⬜ pendente (tarefa grande: estrutura nova com várias partes).

### #444.1 — Projeto Vite e estrutura de pastas
**Próximo passo:** aguardar o "sim"; depois criar `fonte/package.json`, `vite.config.js`, `index.html`, `.gitignore`.
- **Nível:** a classificar pelo Jev · **Modelo:** — (a classificar pelo Jev) · **Effort:** —
- **Critérios:** `npm run build` gera `ligthbot-versao-ia/index.html` e `assets/`.
- **Verificação:** `node --check` nos `.js`; `npm run build` sem erro.

### #444.2 — Motor do jogo (níveis, comandos, execução)
**Próximo passo:** depende da #444.1.
- **Nível:** a classificar pelo Jev · **Modelo:** — (a classificar pelo Jev) · **Effort:** —
- **Critérios:** módulos pequenos (níveis, robô, interpretador, interface), funções ≤ 45 linhas, nomes em português.
- **Verificação:** `node --check`; leitura do código.

### #444.3 — Visual futurista (CSS)
**Próximo passo:** depende da #444.2.
- **Nível:** a classificar pelo Jev · **Modelo:** — (a classificar pelo Jev) · **Effort:** —
- **Critérios:** tokens em `:root`, Orbitron/Share Tech Mono, neon ciano/magenta/violeta, `prefers-reduced-motion`, foco visível, 1 coluna até 720 px, sem `style=` nem script inline.
- **Verificação:** leitura do CSS contra `VISUAL-FUTURISTA.md`.

### #444.4 — Conferir e entregar
**Próximo passo:** depende da #444.3.
- **Nível:** a classificar pelo Jev · **Modelo:** — (a classificar pelo Jev) · **Effort:** —
- **Critérios:** pasta limpa (sem `node_modules`), card da página de jogos abre o jogo.
- **Verificação:** `git diff --cached --name-only` sem lixo.
