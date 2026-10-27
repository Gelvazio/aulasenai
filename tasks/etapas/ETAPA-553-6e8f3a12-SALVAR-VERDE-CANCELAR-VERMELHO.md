# ETAPA 553 — "Editar aula": Salvar verde à esquerda, Cancelar vermelho à direita

- **TASK:** #406 (pedida em 2026-10-27) · **Criada por:** Claude Code (Sonnet 5.5) (local · main)

## Pedido

"mude a posicao dos botoes e troque as cores, SALVA NA ESQUERDA E FUNDO VERDE E CANCELAR NA DIREITA EM FUNDO VERMELHO" (modal Editar aula).

### #406.1 — Cores dos botões Salvar e Cancelar do modal

**Próximo passo:** em `assets/css/indice-aula-data.css`, Salvar da grade verde e Cancelar vermelho (a ordem Salvar à esquerda, Cancelar à direita já existe em `indice-aula-modal.js`).

- **Nível:** LEVE — só cores em CSS, 1 arquivo
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** `.aula-modal-cancelar` vermelho (`#c53030`); Salvar (`.crud-btn--principal` dentro de `.aula-modal-grade`) verde (`#2f855a`); só nesta grade.
- **Entrega:** `indice-aula-data.css`: `--aula-cancelar-fundo` #c53030, `--aula-salvar-fundo` #2f855a e regra do Salvar na grade (executor-leve, Haiku). A ordem Salvar à esquerda e Cancelar à direita já existia. · **Verificação:** diff conferido pelo líder; conferir na tela (sem navegador).
