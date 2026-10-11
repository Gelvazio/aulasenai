## Etapa 142-2a52ee2f — Fila `tasks` no banco + 1 agendador que lê a fila (tarefa grande, pedida em 2026-10-11 05:42)

Tarefa #24-9fb25086-5b51-44cb. Plano: [docs/fila-tasks-agendador-unico.md](../../docs/fila-tasks-agendador-unico.md).
Decisões do usuário (2026-10-11 05:44): a fila `tasks` substitui a #23; fila vazia = não faz nada;
cadastro pela página `tasks.html` (só o Professor Administrador).
Frente: nuvem · ccr-be208aef-c6h8oe.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 142.1 | Plano (tabela, funções, página, fluxo da rotina) | ✅ Concluído | 2026-10-11 05:46 | `docs/fila-tasks-agendador-unico.md`; banco conferido: `tasks` não existe |
| 142.1b | Regra nova no plano: toda task existe na tabela `tasks` e no GitHub (sincronização pelo `scripts/tasks/sincronizar_tasks.py`) | ✅ Concluído | 2026-10-11 05:47 | Seção "Regra: toda task na tabela e no GitHub" do plano |
| 142.2 | Aprovação do plano pelo usuário | ✅ Concluído | 2026-10-11 05:48 | "Aprovado, crie tudo" |
| 142.3 | Passos 2 a 11 do plano | ✅ Concluído | 2026-10-11 06:00 | SQL aplicado e conferido; `sincronizar_tasks.py` (16 tarefas importadas com md5 igual ao do Git + #24 no fim); `tasks.html` + 3 JS + CSS com `node --check` ok, sem `onclick`/`<style>`/`alert`, `tags_header.py` sem mudanças; menu TASKS; `database.md` + relatório HTML; regra reescrita, `CLAUDE.md` 2026-10-11 05:57:00 (visualizador conferido com `node`); prompt da rotina atualizado (`update_trigger`, segue desligada); #22 e #23 canceladas |
| 142.4 | Aplicar o SQL no Supabase (`database/2026-10-11-tasks-fila-agendador.sql`) | ✅ Concluído | 2026-10-11 05:55 | Aplicado em 5 partes pelo conector (o bloco único voltou "cancelled"); conferido: 26 colunas, RLS, 3 políticas do administrador, 4 checks, sem DELETE/anon, funções sem EXECUTE para anon/authenticated; teste em transação desfeita: 2ª chamada de `pegar_proxima_task` vazia com a 1ª travada, linha OFF não pega, trava vencida retomada, `erro` volta a `pendente` |
| 142.4b | Todas as regras da fila (agendador, tabela, funções, ordem e dependências, sub-tasks, sincronização, passo a passo, página e log) no próprio `CLAUDE.md` (seção "⏰ TAREFAS AGENDADAS E FILA `tasks`", versão 2026-10-11 06:09:22), pedido "armazene todas estas regras no claude.md" | ✅ Concluído | 2026-10-11 06:09 | Leitura; visualizador conferido com `node` (versão e 12 arquivos) |
| 142.5 | Teste do usuário em `tasks.html` e aceite; depois liberar o GitHub (140.6) e ligar a rotina | ⬜ Pendente | — | — |
