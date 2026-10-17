## Etapa 346-8c368c8c — Remover o "Excluir aula" do "Editar aula"

**Tarefa:** #219-8c368c8c-c8ae-4311-8009-ca46f2c8b2ec · **Pedido em:** 2026-10-16 20:04 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "botao excluir,deve ser removido ao editar aula"
**Objetivo:** tirar o botão "🗑️ Excluir aula" (só do Professor Administrador) da barra do
"✏️ Editar aula", com o código que só servia a ele. Entendido como o botão da aula; os
"🗑️ Excluir" de cada atividade da lista continuam.

### #219.1 — Remover o botão e o código dele

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código com lógica em até 4 arquivos ligados (só remoção, sem banco).
- **Entrega (2026-10-16 20:06, Opus 5.5, s14):** `indice-aula-modal.js` sem o botão, sem `aoExcluirAulaModal` e sem a
  mensagem dele; `indice-aula-data.js` sem `ehAdministrador` (servia só ao botão);
  `indice-aula-repositorio.js` sem `excluirAulaCard` e `verificarAdministradorCard`;
  `indice-aula-data.css` sem o estilo do botão. Continua: o card de aula com `aulas.excluido = 1`
  some do índice; a função `excluir_aula` do banco não mudou.
- **Verificação:** `node --check` nos 3 scripts; nenhum nome removido é usado em `assets/js`, `js`
  ou `assets/css`. Sem navegador: o teste na tela é o aceite.

### #219.2 — Aceite do usuário

**Próximo passo:** — (aceite do usuário em 2026-10-16 21:08: "Aceito tudo").

- **Nível:** LEVE — conferência do usuário.