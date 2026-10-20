## Etapa 440-8d3b6f20 — #311: Botão "Confirmar Respostas" verde, destacado e maior

**Tarefa:** #311 · **Pedido em:** 2026-10-20 16:05 · **Criada por:** Claude Code (Opus 5.5) (local · main · s31)
**Pedido:** "no botao *Confirmar Respostas*, deixe ele verde e destacado e maior mais alto".
**Objetivo:** o botão do modal de equipes (#310.2) chama atenção: verde, maior e mais alto.

### #311.1 — CSS do `.equipes-btn--confirmar`

**Próximo passo:** — (concluída em 2026-10-20 16:10; executor-leve, conferida pelo líder s31)

- **Nível:** LEVE — só CSS, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** token `--equipes-verde` (e hover mais escuro) no `:root`; botão com fundo verde,
  texto branco em negrito, padding maior (altura ~40px), fonte maior, sombra leve, hover/foco;
  `[hidden]` continua escondendo.
- **Entrega:** `assets/css/equipes-modal.css` (tokens `--equipes-verde`/`--equipes-verde-escuro`;
  `.equipes-btn.equipes-btn--confirmar` verde, branco, negrito 15px, min-height 42px, sombra; hover,
  foco e disabled) · **Verificação:** leitura do diff; `[hidden]` continua escondendo (a regra nova
  não define `display`). **Conferir na tela.**
