> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 115 — Trigger: bloquear a aula bloqueia todas as atividades dela (tarefa de banco, pedido em 2026-10-09 01:09)

Plano: [docs/trigger-bloqueio-aula-bloqueia-atividades.md](docs/trigger-bloqueio-aula-bloqueia-atividades.md) — decisão D1 do usuário: desbloquear a aula não mexe nas atividades.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 115.1 | SQL `database/2026-10-09-trigger-bloqueio-aula-atividades.sql` e aplicação pelo MCP (trigger `aulas_bloqueio_propaga_atividades_trg` + função security definer) | ✅ Concluído | 2026-10-09 01:07 | `pg_trigger` com a definição; `authenticated` sem execução da função |
| 115.2 | Teste no banco em bloco desfeito (aula 93): bloquear → atividade 96 false; desbloquear → nada muda; estado final igual ao anterior | ✅ Concluído | 2026-10-09 01:08 | Consulta antes/depois |
| 115.3 | Tela: botão da aula avisa o script das atividades (`aula-bloqueio-alterado`) para reler os ON/OFF | ✅ Concluído | 2026-10-09 01:09 | `node --check` |
| 115.4 | `docs/database.md` + `relatorio_verificacao_database.html`, `docs/regras/atividades.md`, `CLAUDE.md` (versão 2026-10-09 01:09:35) e histórico | ✅ Concluído | 2026-10-09 01:09 | Leitura |
| 115.6 | Pedido do usuário: aula bloqueada sem nenhum acesso, nem para o professor; só o botão de desbloquear clica (`travarCardAulaProfessor`, CSS `pointer-events`, ON/OFF das atividades nascem travados) + regra no `CLAUDE.md` (versão 2026-10-09 01:10:16) e em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-09 01:10 | `node --check` nos 2 JS; leitura do CSS (sem navegador) |
| 115.5 | Aceite do usuário (bloquear uma aula no índice e ver as atividades OFF) | ⬜ Pendente | — | — |
