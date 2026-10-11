## Etapa 143-d30a9c4d — Atividades só no banco, layout global e pasta da matéria sem HTML (pedida em 2026-10-11 06:01)

Tarefa #25-b3e29764-940b-4a82. Pedido: "As perguntas das atividades prática e objetiva devem ficar apenas no banco
de dados, anote esta regra no claude.md"; "Atividade prática e objetiva deve usar layout global e
não ficar criando do zero em cada aula"; "Nas pastas de aulas deve ter apenas conteúdos, e nada de
HTML, deve vir tudo do global, anote esta regra no claude.md".
Frente: nuvem · ccr-be208aef-c6h8oe.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 143.1 | Regra no `CLAUDE.md` (seção nova, item em "valem sempre", versão 2026-10-11 06:01:03 e histórico) + aviso de transição em `docs/regras/materias.md`, `docs/regras/atividades.md` e `docs/REGRAS-ATIVIDADE-PRATICA.md`; tarefa #25-b3e29764-940b-4a82 no `TASKS.md` | ✅ Concluído | 2026-10-11 06:01 | Leitura; visualizador conferido com `node` (versão e índice) |
| 143.1b | Fila com `ordem` e `task_dependente` (SQL aplicado; `pegar_proxima_task` só pega com as dependentes concluídas; teste em transação desfeita) + página (`Ordem`, `Depende de`, ✅ Concluir) + script (`consulta` com datas de Brasília) + regra; #25 dividida em 22 sub-tasks (ids 19 a 40) com `tasks/fila/TASK-0019.md` a `TASK-0040.md` | ✅ Concluído | 2026-10-11 06:07 | md5 do JSON copiado = md5 do banco (`aa91c70d…`); 22 de 22 sincronizadas; `node --check` ok |
| 143.2 | Aceite do usuário da regra | ⬜ Pendente | — | — |
| 143.3 | Plano da migração em `docs/` e aprovação (sub-tasks 25.01 a 25.03) | ⬜ Pendente | — | Na fila `tasks` |
| 143.4 | Migração, uma matéria por vez (sub-tasks 25.04 a 25.22) | ⬜ Pendente | — | Na fila `tasks` |
