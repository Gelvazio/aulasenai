> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 47 — Trocar o rótulo e o nome do card no modal "✏️ Editar aula", além da data (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 47.1 | Coluna `aulas.nome_card` (`database/2026-10-06-aulas-nome-card.sql`, aplicada no Supabase a pedido do usuário) | ✅ Concluído | 2026-10-06 | Consulta em `information_schema.columns` |
| 47.2 | `assets/js/indice-aula-data.js`: campo "Nome do card" no modal, grava junto com a data e mostra o nome no `h2` do card (vazio = título do HTML) | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador com o usuário |
| 47.3 | Documentação (`CLAUDE.md`, `database.md`, relatório HTML) | ✅ Concluído | 2026-10-06 | Leitura |
| 47.4 | Campo "Rótulo do card" (o "AULA 01" do topo): coluna `aulas.rotulo_card` (aplicada no Supabase) + modal + documentação | ✅ Concluído | 2026-10-06 | `node --check`; consulta da coluna; teste no navegador com o usuário |
| 47.5 | Bug: cards que dividem a mesma aula mudavam juntos (35 × 82, aula 40). Regra "cada card ligado a apenas 1 aula" no `CLAUDE.md`; aula 40 só com a atividade 82 (33 → aula 67, 35 → aula 68; `database/2026-10-06-um-card-uma-aula-aula-40.sql`); aviso no modal quando a aula é compartilhada | ✅ Concluído | 2026-10-06 | Consulta no banco; `node --check`; levantamento dos cards × aulas de todos os índices |
| 47.6 | Separar as outras aulas compartilhadas | ✅ Concluído | 2026-10-06 | Feito na Etapa 48 |
| 47.7 | Aceite do usuário | ⬜ Pendente | — | — |
