## Etapa 248-e1eae7f7 — Layout da linha da atividade no card (link, ON/OFF e ✏️)

**Tarefa:** #121-e1eae7f7-ce64-4c4b · **Pedido em:** 2026-10-14 13:15 · **Executor:** Claude Code (local · main)
**Pedido:** "MELHORE O LAYOUT,FICOU BOTAO POR CIMA DO OUTRO" (print do card de sexta, perfil professor)
**Objetivo:** cada atividade do card ocupa uma linha só: link → ON/OFF → ✏️, sem botão caindo na linha de baixo nem trocando de lugar.
**Próximo passo:** 121.2 — aceite do usuário.

Causa: o ✏️ (#120) e o ON/OFF entram depois do link em ordem variável (depende de qual script carrega antes), e a largura do link só reservava espaço para o ON/OFF.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 121.1 | `atividades-crud-modal.js`: ✏️ sempre depois do ON/OFF (`posicionarBotaoEditar`); `atividades-crud-modal.css`: ✏️ redondo de 36 px e link encolhendo para caber ON/OFF + ✏️ na mesma linha | ✅ Concluído | 2026-10-14 13:15 | `node --check` ok; leitura do CSS: regra com `:has(+ .interruptor-atividade + .crud-editar-atividade)` é mais específica que a do ON/OFF e vem depois |
| 121.2 | Aceite do usuário (ver o card logado como professor) | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
