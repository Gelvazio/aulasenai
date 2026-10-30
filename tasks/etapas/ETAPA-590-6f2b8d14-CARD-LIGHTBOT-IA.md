## Etapa 590-6f2b8d14 — #443: Card Light Bot (versão IA) na página de jogos

**Tarefa:** #443-6f2b8d14 · **Pedido em:** 2026-10-29 21:51 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** mensagem só com o caminho `C:\fontes\aulasenai\jogos\ligthbot-versao-ia`, entendida como "mais 1 card" no mesmo padrão do card da versão SVG (nome da pasta como o usuário escreveu, com "ligthbot").
**Objetivo:** `jogos/index.html` ganha o 4º card, no mesmo visual futurista, apontando para `ligthbot-versao-ia/`.

### #443.1 — Adicionar o 4º card em jogos/index.html
**Próximo passo:** copiar o formato dos cards existentes e acrescentar o card "LIGHT BOT · VERSÃO IA" com `href="ligthbot-versao-ia/"`.
- **Nível:** LEVE — Jev (mesmo tipo da #442.1) · **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash · **Effort:** low
- **Critérios:** classes iguais às dos outros cards; sem `style=` nem `<script>` inline.
- **Verificação:** `grep -c 'class="cartao-jogo"' jogos/index.html` = 4.
