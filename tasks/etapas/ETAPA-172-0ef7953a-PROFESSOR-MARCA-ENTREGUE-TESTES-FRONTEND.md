## Etapa 172-0ef7953a — Professor marca a atividade do aluno como entregue (Testes de Front-End)

**Tarefa:** #45-0ef7953a-721d-49d0 · **Pedido em:** 2026-10-14 10:09 · **Executor:** Claude Code (local · main)
**Pedido:** "Nas Atividades, deve ser possivel o professor marcar 1 atividade como entregue, em
http://127.0.0.1:5500/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html,
crie tasks pra que isso seja feito em todas as materias,mas agora faça apenas na materia listada
acima"
**Objetivo:** o professor consegue marcar como entregue a atividade de um aluno que não clicou em
"Entregar", nas atividades objetivas e práticas. Agora só nas páginas de Testes de Front-End; as
demais matérias de todos os cursos de `MATERIAIS/` (menos `AGENDA_COLABORADOR`, que não é curso)
ficam nas tarefas #46 a #79 (etapas 173 a 206), uma por matéria.
**Próximo passo:** 172.1 — aguardar as respostas do usuário (perguntas no chat de 2026-10-14
10:09; a 7 já respondida) e depois escrever o plano nesta etapa.

### Escopo (rascunho, a confirmar com o usuário)

- **Entra:** botão do professor na tabela "Respostas dos alunos" (`assets/js/respostas-atividade-professor.js`),
  na linha que hoje mostra "Aguardando a entrega"; função no banco (RPC `security definer`) que
  grava em `entrega_atividade` só se `professor_pode_ver_aluno`; liga só nas páginas com
  `data-marcar-entregue="sim"` no `<body>` (10 páginas de `TESTES-DE-FRONTEND/ATIVIDADES/`: 5
  objetivas `ATIVIDADES-AULA-NN-50-QUESTOES.html` e 5 práticas `ATIVIDADE-PRATICA-AULA-NN.html`,
  que usam `assets/js/avaliacao-discursiva.js`);
  seed + `SEEDS-APLICADOS.md`; `docs/database.md`; `docs/regras/atividades.md`.
- **Não entra:** páginas das demais matérias (tarefas #46 a #79).

### Riscos

- Hoje só o aluno grava em `entrega_atividade`, e só com as questões mínimas respondidas
  (`atividade_completa`). A função nova abre uma porta de escrita para o professor. Plano B:
  checar `professor_pode_ver_aluno` dentro da função e não mexer na política da tabela.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 172.1 | Respostas do usuário e aprovação do plano | 👀 Aguardando o usuário | — | Resposta no chat. 2026-10-14: "SIM, PARA AS PRATICAS TAMBEM" (pergunta 7); "cada pasta e um curso... nao e so 7" → tarefas #46 a #79 |
| 172.2 | Aceite do usuário (testar como professor) | ⬜ Pendente | — | — |
