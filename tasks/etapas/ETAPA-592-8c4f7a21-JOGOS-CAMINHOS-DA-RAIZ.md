## Etapa 592-8c4f7a21 — #445: Página jogos sem CSS na nuvem (caminhos da raiz)

**Tarefa:** #445-8c4f7a21 · **Pedido em:** 2026-10-29 21:54 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "esta sem css na nuvem" (print de `jogos/index.html` sem estilo).
**Objetivo:** `jogos/index.html` com visual em qualquer forma de acesso na Vercel.

**Causa (conferida com curl):** `https://aulasenai.vercel.app/jogos` (sem a barra final) devolve 200 com o HTML, sem redirecionar; aí `href="jogos.css"` resolve para `/jogos.css` (404). Com `/jogos/` o CSS carrega (`/jogos/jogos.css` = 200, `text/css`). Os links dos cards também quebrariam.

### #445.1 — Usar caminhos a partir da raiz em jogos/index.html
**Próximo passo:** trocar `jogos.css`, `ligthbot-versao-svg/`, `ligthbot-versao-ia/` e o link do Scratch por caminhos que começam em `/` (`/jogos/jogos.css`, `/jogos/ligthbot-versao-svg/`, `/jogos/ligthbot-versao-ia/`, `/MATERIAIS/.../projetos-scratch/index.html`).
- **Nível:** MEDIO — causa de publicação na Vercel · **Modelo:** só Sonnet · **Effort:** medium
- **Verificação:** depois do deploy, `curl` em `/jogos` e `/jogos/` acha `/jogos/jogos.css` com 200; sem `style=` nem `<script>` inline.
