> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 119 — Unidade em um só lugar: tabela `unidade` ligada a `curso` e `turma` (tarefa grande, pedido em 2026-10-09 13:18; aprovada em 2026-10-09 13:23; plano [docs/tabela-unidade-curso-turma.md](docs/tabela-unidade-curso-turma.md))

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 119.0 | Plano criado; decisões (CEPLAS = AI CEPLAS; SN.RDS-LAB = SENAI Rio do Sul; demais uma cada; linha de teste reaproveitada) e aprovação do usuário | ✅ Concluído | 2026-10-09 13:23 | Respostas no chat |
| 119.1 | SQL `database/2026-10-09-unidade-curso-turma.sql` (backup, `descricao`→`nome`, `unidade_id` em curso e turma, migração) | ✅ Concluído | 2026-10-09 13:24 | Leitura; nenhuma função/view usa a coluna antiga |
| 119.2 | SQL aplicado pelo conector do Supabase | ✅ Concluído | 2026-10-09 13:24 | 5 unidades; 7/7 turmas e cursos 1–4 com `unidade_id`; backups 1/7/7 |
| 119.3 | Tela de cursos: unidade em lista + modal 🏢 Unidades (`assets/js/unidades-modal.js`); `js/unidade.js` órfão ajustado para `nome` | ✅ Concluído | 2026-10-09 13:27 | `node --check` |
| 119.4 | `docs/database.md`, relatório HTML, `CLAUDE.md` (versão 2026-10-09 13:27:14) e histórico | ✅ Concluído | 2026-10-09 13:29 | Leitura |
| 119.5 | Commit | ✅ Concluído | 2026-10-09 13:30 | `git diff --cached --name-only` |
| 119.9 | Unidade 5 renomeada para "AI TAIÓ TARDE" (era "APRENDIZAGEM INDUSTRIAL TAIÓ TARDE"), pedido em 2026-10-09 13:38 — update direto na tabela `unidade` | ✅ Concluído | 2026-10-09 13:39 | Consulta da tabela `unidade` |
| 119.10 | Lista `scripts/LISTA-PRESENCA-AUTOMACAO-TAIO-TARDE.js` (fora do Git): turma AI OPIR 2026/1 V1 (122552), UC Fundamentos de Automação/Instrumentação, com `unidadeId: 5` (AI TAIÓ TARDE) e local "AI TAIÓ TARDE" — pedido em 2026-10-09 13:42 | ✅ Concluído | 2026-10-09 13:43 | `node --check`; `git check-ignore` |
| 119.6 | Aceite do usuário (testar 🏢 Unidades e a unidade dos cursos 5, 6 e 7) | ⬜ Pendente | — | Usuário |
| 119.7 | Fase 2 pedida pelo usuário — ver 119.8 | ✅ Concluído | 2026-10-09 13:35 | — |
| 119.8 | Fase 2 (pedido em 2026-10-09 13:30): `unidade.js` pela ligação; 13 JS com `unidade:unidade_id(nome)`; criar usuários grava `unidade_id`; colunas `turma.local` e `curso.unidade` apagadas (`database/2026-10-09-unidade-fase2-apagar-textos.sql`); docs e `CLAUDE.md` (versão 2026-10-09 13:33:10) | ✅ Concluído | 2026-10-09 13:35 | `node --check` em todos os JS; consulta das colunas; backups com 7 locais e 4 unidades |
