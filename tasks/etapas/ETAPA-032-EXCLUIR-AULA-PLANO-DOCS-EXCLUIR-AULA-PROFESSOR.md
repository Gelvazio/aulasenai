> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 32 — Excluir aula (exclusão lógica, só Professor Administrador) — plano: [docs/excluir-aula-professor-administrador.md](docs/excluir-aula-professor-administrador.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 32.1 | Plano em `docs/` e aprovação do usuário | ✅ Concluído | 2026-10-06 | Aprovado com aplicação do SQL |
| 32.2 | SQL: coluna `aulas.excluido`, função `excluir_aula`, trigger | ✅ Concluído | 2026-10-06 | Idempotente, sem apagar dados |
| 32.3 | Aplicar no Supabase | ✅ Concluído | 2026-10-06 | 46 aulas com excluido = 0; trigger ativo; anon sem execução |
| 32.4 | Botão no modal, cards escondidos, filtro no CRUD | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador fica com o usuário |
| 32.5 | database.md, relatório HTML e CLAUDE.md | ✅ Concluído | 2026-10-06 | Versão 2026-10-06 14:29 |
| 32.6 | Aceite do usuário | ⬜ Pendente | — | — |
