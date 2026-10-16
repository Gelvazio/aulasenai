## Etapa 346-8c368c8c — Remover o "Excluir aula" do "Editar aula"

**Tarefa:** #219-8c368c8c-c8ae-4311-8009-ca46f2c8b2ec · **Pedido em:** 2026-10-16 20:04 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "botao excluir,deve ser removido ao editar aula"
**Objetivo:** tirar o botão "🗑️ Excluir aula" (só do Professor Administrador) da barra do
"✏️ Editar aula", com o código que só servia a ele. Entendido como o botão da aula; os
"🗑️ Excluir" de cada atividade da lista continuam.

### #219.1 — Remover o botão e o código dele

**Próximo passo:** ajustar `indice-aula-modal.js`, `indice-aula-data.js`,
`indice-aula-repositorio.js` e `indice-aula-data.css`.

- **Nível:** MEDIO — código com lógica em até 4 arquivos ligados (só remoção, sem banco).

### #219.2 — Aceite do usuário

**Próximo passo:** depende da #219.1.

- **Nível:** LEVE — conferência do usuário.