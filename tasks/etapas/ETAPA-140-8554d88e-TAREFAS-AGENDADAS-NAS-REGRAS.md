## Etapa 140-8554d88e — Tarefas agendadas seguindo as regras do projeto (tarefa pequena, pedida em 2026-10-11 05:10)

Pedido: "Primeiro corrija todas as regras conflitantes e depois abra a página pra liberar github"
(rotina "Tarefa Aulas Senai", que mandava push direto na `main`, usava `tasks.md` na raiz, criava
`TAREFA_AGENDADA.md` e mexia no `CLAUDE.md` sem versão).
Frente: nuvem · ccr-00f69e8a-6qcla9.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 140.1 | Regra `docs/regras/tarefas-agendadas.md` (frente/branch da execução, escolha da aula pela ordem das matérias, trava em `RECADOS.md` via PR, produzir, encerrar, log, outras IAs) | ✅ Concluído | 2026-10-11 05:12 | Conferida contra as seções do `CLAUDE.md` (push na nuvem, conversa entre sessões, seeds, status, uma aula por vez) |
| 140.2 | `CLAUDE.md`: seção "⏰ TAREFAS AGENDADAS", linha no índice das regras, versão 2026-10-11 05:12:00 e histórico (resumo + `docs/HISTORICO-REGRAS.md`) | ✅ Concluído | 2026-10-11 05:14 | `node`: o padrão do `regras-modal.js` lista `docs/regras/tarefas-agendadas.md`; linha de versão no formato |
| 140.3 | `database/2026-10-11-agendamento-tarefa-logs.sql` (tabela já existente no banco, conferida: 21 colunas, CHECK com 5 valores, RLS ligado, sem políticas) | ✅ Concluído | 2026-10-11 05:14 | Consulta ao `information_schema` e `pg_constraint` |
| 140.4 | Tarefa #22-816fd3fd-ffe8-41e7 (outras contas/IAs criam as tarefas 2 a 6) no `TASKS.md` e no `STATUS.md` | ✅ Concluído | 2026-10-11 05:15 | Linha no "📌 Tarefas" |
| 140.5 | Prompt da rotina "Tarefa Aulas Senai" reescrito para seguir a regra (sem push na `main`, sem `TAREFA_AGENDADA.md`) | ✅ Concluído | 2026-10-11 05:17 | `update_trigger` + `get_trigger` |
| 140.6 | Liberar o acesso do GitHub ao repositório para as tarefas agendadas | 👀 Aguardando o usuário | — | Ação do usuário: em claude.ai/code → Rotinas → "Tarefa Aulas Senai", vincular o repositório Gelvazio/aulasenai (as execuções de 05:03 e 05:15 falharam: o clone pediu usuário e senha) |
| 140.7 | Aceite do usuário: conferir a regra `docs/regras/tarefas-agendadas.md` (reescrita em 2026-10-13: a rotina lê o quadro dos arquivos) | 👀 Aguardando o usuário | — | — |
