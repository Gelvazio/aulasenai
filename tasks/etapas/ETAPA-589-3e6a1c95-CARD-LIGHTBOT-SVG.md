## Etapa 589-3e6a1c95 — #442: Card Light Bot (versão SVG) na página de jogos

**Tarefa:** #442-3e6a1c95 · **Pedido em:** 2026-10-29 21:49 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "e mais 1 card com link pra `C:\fontes\aulasenai\jogos\ligthbot-versao-svg`" (nome da pasta como o usuário escreveu, com "ligthbot").
**Objetivo:** `jogos/index.html` ganha o 3º card, no mesmo visual futurista, apontando para a pasta `ligthbot-versao-svg/`.

### #442.1 — Adicionar o 3º card em jogos/index.html
**Próximo passo:** copiar o formato dos cards existentes e acrescentar o card "LIGHT BOT · VERSÃO SVG" com `href="ligthbot-versao-svg/"` (mesma aba).
- **Nível:** LEVE — Jev (confiança 0,92) · **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash · **Effort:** low
- **Critérios:** classes iguais às dos outros cards; sem `style=` nem `<script>` inline; grade continua boa (3 cards); `jogos.css` só muda se a grade precisar.
- **Verificação:** `grep -c 'class="cartao-jogo"' jogos/index.html` = 3.
- **Entrega #442.1:** 3º card em `jogos/index.html` (executor-leve, Haiku 5.5); grade de `jogos.css` passou a `auto-fit`. **Verificação:** 3 cards no HTML, sem inline; pasta `ligthbot-versao-svg/` existe mas está vazia (o link só abre o jogo quando houver `index.html` nela). Tela não conferida.
