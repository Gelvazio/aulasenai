> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 107 — Tela TURMAS como consulta (CRUD) com modais (pedido em 2026-10-09 00:06:32)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 107.1 | `turmas.html` vira consulta das turmas: botão **➕ Vincular Professor** à esquerda de cada turma, professores vinculados em etiquetas (✏️/🗑️), busca; modal da turma (só professores que ainda não estão nela) e modal de edição do vínculo (`turmas-professor-pagina.js` reescrito, `turmas-professor-modais.js` novo, CSS) — sem mudança no banco | ✅ Concluído | 2026-10-09 00:06:32 | `node --check` nos 2 JS; leitura do código (sem navegador) |
| 107.2 | Modal com os **dados da tabela `turma`** (CRUD: cadastrar, editar e excluir turma) — precisa de políticas novas no banco (hoje a `turma` só tem leitura no RLS): plano `docs/crud-turmas-administrador.md` aguardando aprovação | ⬜ Pendente | — | — |
| 107.3 | Aceite do usuário | ⬜ Pendente | — | — |
