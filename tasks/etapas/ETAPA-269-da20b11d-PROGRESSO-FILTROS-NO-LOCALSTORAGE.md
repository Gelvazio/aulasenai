## Etapa 269-da20b11d — Progresso da Turma: filtros lembrados no navegador (localStorage)

**Tarefa:** #142-da20b11d-e7a4-4052-b590 · **Pedido em:** 2026-10-14 16:33 · **Executor:** Claude Code (local · main)
**Pedido:** "estes filtros aqui (Questões respondidas, Tarefa Entregue?, Mostrar quem faltou),
salve no localstorage, assim que abrir a pagina, busca no localstorage, se nao tiver usa o padrao"
**Objetivo:** o professor não precisar escolher os filtros do Progresso toda vez que abre a página.
**Próximo passo:** 142.2 — usuário mudar os filtros, recarregar a página e conferir que voltam como deixou.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 142.1 | Os 3 filtros gravam a escolha no localStorage e, ao abrir, usam a gravada (sem ela, o padrão: Todas · OFF · OFF): leitura/gravação no `progresso-turma-global.js` (chaves `progresso-turma:*`, protegidas por try/catch) injetada nos 3 módulos; regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 16:34 | `node --check` nos 4 JS; linhas ≤ 100; só preferência de tela (sem dado de aluno nem gabarito) |
| 142.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
