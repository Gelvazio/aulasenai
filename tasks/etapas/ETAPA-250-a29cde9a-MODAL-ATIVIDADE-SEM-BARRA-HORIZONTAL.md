## Etapa 250-a29cde9a — Modal de atividade sem barra de rolagem horizontal

**Tarefa:** #123-a29cde9a-3791-49e1 · **Pedido em:** 2026-10-14 13:18 · **Executor:** Claude Code (local · main)
**Pedido:** "CORRIJA AS BARRAS" (print do modal "✏️ Editar atividade ID 81" com barra horizontal e campos cortados)
**Objetivo:** o modal de atividades (CADASTRAR ATIVIDADES e ✏️) cabe na largura, sem barra horizontal, e o formulário fica em 2 colunas no computador (menos rolagem vertical; 1 coluna no celular).
**Próximo passo:** 123.2 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 123.1 | `assets/css/atividades-crud-modal.css`: `box-sizing: border-box` no modal, `overflow-x: hidden`, campos com `width: 100%`/`min-width: 0`, formulário em 2 colunas (1 no celular), botões na linha inteira | ✅ Concluído | 2026-10-14 13:18 | Leitura do CSS (sem navegador, regra do projeto) |
| 123.2 | Aceite do usuário (abrir o ✏️ e o CADASTRAR ATIVIDADES) | 👀 Aguardando o usuário | — | — |
