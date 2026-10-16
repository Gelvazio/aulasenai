## Etapa 273-bf74c55c — Revisar os filtros do Progresso da Turma

**Tarefa:** #146-bf74c55c-7cc1-48c5-810a · **Pedido em:** 2026-10-14 18:50 · **Executor:** Claude Code (local · main)
**Pedido:** "REVISE ESTES FILTROS, NEM TODOS ESTAO FUNCIONANDO" (print: Questões respondidas
"Todas · 35 de 35 alunos", Tarefa Entregue? ligado, Mostrar quem faltou desligado, RECUPERAÇÃO
ligado)
**Objetivo:** cada filtro fazer o que o nome diz, e a contagem mostrar quantos alunos estão na tela.
**Próximo passo:** 146.2 — usuário testar os filtros de novo.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 146.1 | Revisão do código dos filtros e correções: (a) "Tarefa Entregue?" ligado mostrava todos → agora **só quem entregou** (desligado: só quem não entregou); (b) a contagem "N de T alunos" só contava o "Questões respondidas" → agora "Mostrando N de T alunos" embaixo dos filtros conta a lista com **todos** os filtros; "Mostrar quem faltou", "RECUPERAÇÃO" e "Aluno" conferidos sem defeito | ✅ Concluído | 2026-10-14 18:52 | `node --check` nos 3 JS; linhas ≤ 100; leitura da cadeia de filtros (`filtrosDaLista`) |
| 146.3 | "ao marcar recuperacao, lista que nao pegou recuperacao" → RECUPERAÇÃO invertido: **ligado = quem pegou recuperação (nota final < 7)**, desligado = nota final ≥ 7 (`filtro-recuperacao-progresso.js`, regra em `docs/regras/atividades.md`) | ✅ Concluído | 2026-10-14 18:55 | `node --check`; linhas ≤ 100 |
| 146.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
