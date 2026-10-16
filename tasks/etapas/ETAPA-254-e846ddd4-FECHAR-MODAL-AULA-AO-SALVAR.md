## Etapa 254-e846ddd4 — Fechar o modal "Editar aula" depois de salvar

**Tarefa:** #127-e846ddd4-84ea-4362 · **Pedido em:** 2026-10-14 13:45 · **Executor:** Claude Code (local · main)
**Pedido:** "ao salvar modal de edicao de aula,deveb fechar o modal sozinho"
**Objetivo:** ao salvar no modal "✏️ Editar aula" dos índices de atividades, o modal fecha sozinho e aparece o aviso "✅ Aula gravada." (os cards já são redesenhados pelo `aoGravar`).
**Próximo passo:** 127.2 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 127.1 | `assets/js/indice-aula-modal.js`: `aoSalvarModalAula` chama `fecharModalAula` e mostra o popup de sucesso | ✅ Concluído | 2026-10-14 13:45 | `node --check` ok; erro de gravação continua mostrando a mensagem no modal aberto |
| 127.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
