> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 48 — Card com 100% dos dados da tabela aulas + modal CRUD da aula (2026-10-06) — plano: [docs/card-dados-100-tabela-aulas.md](docs/card-dados-100-tabela-aulas.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 48.1 | Gerador de índices junta páginas da mesma aula num card (Reforço de Linguagens: 20 → 10 cards) | ✅ Concluído | 2026-10-06 | Índice regerado; demais índices sem mudança |
| 48.2 | Separar aulas compartilhadas (12 aulas novas, atividade 13 → aula 23) + backup `atividade_aula_backup_20261006` | ✅ Concluído | 2026-10-06 | Consulta: nenhuma aula em 2 cards |
| 48.3 | Copiar rótulo e nome atuais dos cards para `aulas.rotulo_card`/`nome_card` | ✅ Concluído | 2026-10-06 | Consulta: 0 aulas com atividade sem rótulo |
| 48.4 | Card lê só da `aulas` (`indice-aula-repositorio.js`, `indice-aula-data.js`) | ✅ Concluído | 2026-10-06 | `node --check` |
| 48.5 | Modal CRUD da aula com lista de atividades (Editar / Excluir / Nova) (`indice-aula-modal.js`, `atividades-crud-modal.js`) | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador com o usuário |
| 48.6 | Regras no `CLAUDE.md` (card 100% `aulas`, modal CRUD, rótulo "AULA NN", 1 card = 1 aula) | ✅ Concluído | 2026-10-06 | Leitura |
| 48.7 | Rótulos fora do padrão "AULA NN" (28 aulas) — decisão do usuário | ⬜ Pendente | — | Lista para o usuário preencher: `docs/rotulos-aulas-ajustar.md` |
| 48.8 | Aceite do usuário | ⬜ Pendente | — | — |
