## Etapa 252-afc692ef — Fechar o modal de atividade depois de salvar

**Tarefa:** #125-afc692ef-b3ac-4454 · **Pedido em:** 2026-10-14 13:21 · **Executor:** Claude Code (local · main)
**Pedido:** "APOS CLICAR EM SALVAR A ATIVIDADE,DEVE FECHAR O MODAL DE ATIVIDADE"
**Objetivo:** ao salvar no modal de atividade (✏️ ou CADASTRAR ATIVIDADES), o modal fecha, aparece o aviso "✅ Atividade salva." e o nome das atividades nos cards é atualizado (#124).
**Próximo passo:** 125.2 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 125.1 | `atividades-crud-modal.js`: `aoSalvarCrud` fecha o modal e chama `avisarAtividadeSalvaCrud` (popup + nomes); `indice-aula-data.js`: `atualizarNomesDasAtividadesDoIndice` | ✅ Concluído | 2026-10-14 13:21 | `node --check` nos 2 arquivos; erro ao salvar continua mostrando a mensagem dentro do modal (aberto) |
| 125.2 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
