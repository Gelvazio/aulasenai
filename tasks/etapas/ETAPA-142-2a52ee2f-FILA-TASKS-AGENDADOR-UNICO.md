## Etapa 142-2a52ee2f — Fila `tasks` no banco + 1 agendador que lê a fila (tarefa grande, pedida em 2026-10-11 05:42)

Tarefa #24-9fb25086-5b51-44cb. Plano: [docs/fila-tasks-agendador-unico.md](../../docs/fila-tasks-agendador-unico.md).
Decisões do usuário (2026-10-11 05:44): a fila `tasks` substitui a #23; fila vazia = não faz nada;
cadastro pela página `tasks.html` (só o Professor Administrador).
Frente: nuvem · ccr-be208aef-c6h8oe.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 142.1 | Plano (tabela, funções, página, fluxo da rotina) | ✅ Concluído | 2026-10-11 05:46 | `docs/fila-tasks-agendador-unico.md`; banco conferido: `tasks` não existe |
| 142.1b | Regra nova no plano: toda task existe na tabela `tasks` e no GitHub (sincronização pelo `scripts/tasks/sincronizar_tasks.py`) | ✅ Concluído | 2026-10-11 05:47 | Seção "Regra: toda task na tabela e no GitHub" do plano |
| 142.2 | Aprovação do plano pelo usuário | ⬜ Pendente | — | — |
| 142.3 | Passos 2 a 11 do plano | ⬜ Pendente | — | — |
| 142.4 | Aplicar o SQL no Supabase (`database/2026-10-11-tasks-fila-agendador.sql`) | ⬜ Pendente | — | — |
| 142.5 | Teste do usuário e aceite | ⬜ Pendente | — | — |
