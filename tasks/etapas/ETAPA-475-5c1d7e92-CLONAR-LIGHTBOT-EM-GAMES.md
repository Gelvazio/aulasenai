## Etapa 475-5c1d7e92 — Clonar o LightBot em `games/`

**Tarefa:** #346-5c1d7e92 · **Pedido em:** 2026-10-22 · **Criada por:** Claude Code (Sonnet 5.5) (nuvem · epic-knuth-mn9fkr)
**Pedido:** "COMO CLONAR ESTE REPO https://github.com/lilgallon/LightBot/tree/master DENTRO DE
AULASENAI/GAMES?" → "FAÇA ISSO AQUI"
**Objetivo:** ter o jogo LightBot (C++/SFML, GPL-3.0) dentro de `games/LightBot` no projeto.

### Escopo

- **Entra:** clonar `lilgallon/LightBot` em `games/LightBot` e tirar a pasta `.git` dele (para o
  projeto versionar os arquivos); manter `LICENSE` e o crédito ao autor; pôr `games/` no
  `.vercelignore` (o jogo é C++, não roda no site).
- **Não entra:** compilar, alterar o código do jogo, criar página do jogo no site.

### Riscos

- Na nuvem, a sessão só enxerga `gelvazio/aulasenai`: antes de clonar, anexar o repositório com
  `add_repo` (`lilgallon/LightBot`, somente leitura).

### #346.1 — Clonar o repositório e ajustar `.vercelignore`

**Próximo passo:** anexar `lilgallon/LightBot` à sessão, clonar em `games/LightBot`, apagar
`games/LightBot/.git`, acrescentar `games/` ao `.vercelignore`, commit + push.

- **Nível:** LEVE — sem lógica: copiar arquivos e uma linha de configuração.
- **Modelo:** só Haiku — nunca outro
- **Descrição:** clonar, remover `.git` interno, conferir que `LICENSE` ficou, ignorar `games/`
  no site. · **Critérios de aceitação:** `games/LightBot` existe com os arquivos e a `LICENSE`,
  sem `.git`; `.vercelignore` lista `games/`.
- **Entrega:** — · **Verificação:** —
