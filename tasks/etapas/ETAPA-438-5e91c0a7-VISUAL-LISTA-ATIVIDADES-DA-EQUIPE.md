## Etapa 438-5e91c0a7 — #309: Melhorar a visualização da lista de atividades da equipe

**Tarefa:** #309 · **Pedido em:** 2026-10-20 15:06 · **Criada por:** Claude Code (Opus 5.5) (local · main · s31)
**Pedido:** (print da lista "📎 Atividades" da EQUIPE 01 com as caixas de seleção corridas em linha)
"melhore a visualizacao disso".
**Objetivo:** a lista de atividades que abre no "📎 Atividades (n)" de cada equipe (#307.4) fica
legível: em grade, com as ligadas destacadas.

### #309.1 — Lista de atividades da equipe em grade, com as ligadas em destaque

**Próximo passo:** executor-medio aplica no `equipes-atividades.js` e no `equipes-modal.css`.

- **Nível:** MEDIO — tela (JS + CSS), até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** título da área ("Atividades desta equipe — marque as que ela faz junto"); itens em
  grade responsiva (colunas de largura igual), cada um como cartão com borda, caixa e nome; ligada
  com fundo e borda de destaque (tokens do CSS) e as ligadas primeiro; recuo alinhado aos
  integrantes; sem estilo inline.
- **Critérios de aceitação:** `node --check` ok; só CSS por classes/tokens; marcar/desmarcar segue
  gravando como antes.
- **Entrega:** — · **Verificação:** —
