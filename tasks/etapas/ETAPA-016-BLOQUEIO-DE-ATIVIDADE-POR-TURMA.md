> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 16 — Bloqueio de atividade por turma (turma favorita) (pedida em 2026-10-05; plano `docs/bloqueio-atividade-por-turma-favorita.md`, aprovado: "SIM, PODE EXECUTAR")
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 16.1 | SQL `database/2026-10-05-bloqueio-atividade-por-turma.sql` (coluna `atividade.bloqueio`, política, `definir_bloqueio_turma`) | ✅ Concluído | 2026-10-05 13:36 | Leitura + banco real conferido antes |
| 16.2 | Interruptor da turma favorita em `assets/js/indice-atividades-bloqueio.js` + evento em `indice-turma-favorita.js` | ✅ Concluído | 2026-10-05 13:36 | `node --check` |
| 16.3 | `docs/database.md` + `relatorio_verificacao_database.html` | ✅ Concluído | 2026-10-05 13:36 | Leitura |
| 16.4 | Regra no `CLAUDE.md` | ✅ Concluído | 2026-10-05 13:38 | Pedido do usuário; versão 2026-10-05 13:37; visualizador lê a mesma linha de versão |
| 16.5 | Aplicar o SQL no Supabase (pedido do usuário) | ✅ Concluído | 2026-10-05 13:36 | Conector Supabase; coluna, política e permissões conferidas |
| 16.6 | Commit local | ✅ Concluído | 2026-10-05 13:36 | `git diff --cached --name-only` |
| 16.7 | Aceite do usuário (bloquear/liberar uma atividade para a favorita e conferir com um aluno de outra turma) | ⬜ Pendente | — | Sem navegador nesta sessão |
