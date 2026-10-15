## Etapa 264-b7623c7f — Progresso da Turma lista todos os alunos (também quem não respondeu nada)

**Tarefa:** #137-b7623c7f-52a6-4133-b30d · **Pedido em:** 2026-10-14 15:41 · **Executor:** Claude Code (local · main)
**Pedido:** "NO PROGRESSO DA TURMA, ESTAO LISTADOS TODOS OS ALUNOS DA TURMA ?" (turma AI AOPL 2026/2 V1 · CEPLAS TARDE (135081)) · "TODOS OS ALUNOS DEVEM SEMPRE SER LISTADOS, ATE AQUELES QUE NAO RESPONDERAM NADA"
**Objetivo:** o Progresso da Turma mostrar uma linha para cada aluno da turma, com 0 questões para quem ainda não respondeu.
**Levantamento (2026-10-14 15:44):** o Progresso monta a lista só com quem tem resposta gravada (`progresso-turma-fontes.js`, `resposta_discursiva`); quem não respondeu só aparece na lista à parte "Alunos sem nenhuma resposta", e só em página com `data-marcar-entregue="sim"` (esta não tem). Atividade 81: curso 5, turmas 135081 (V1 tarde, 35 alunos: 30 responderam, 5 sem resposta) e 135080 (M1 manhã, 33 alunos, nenhum respondeu).
**Respostas:** "EM TODOS AS ATIVIDADES QUE JA TEM PROGRESSO DA TURMA, DEVE SEMPRE LISTAR TODOS OS ALUNOS, E NAS FUTURAS TAMBEM" · "Todas as turmas do curso: V1 e M1, 68 alunos."
**Próximo passo:** 137.3 — aceite do usuário.

Decisões (Claude, 2026-10-14 15:44): turmas = as de `turma.curso_id` igual ao curso da aula da atividade (sem ele, o da matéria). Quem não respondeu entra com 0 questões, sem entrega e sem nota; resumo, Gráficos e Cálculo Nota passam a contar a turma toda. Nas páginas com `data-marcar-entregue="sim"` a lista à parte "Alunos sem nenhuma resposta" continua (é onde fica o botão de marcar entregue).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 137.1 | Levantar de onde vem a lista dos alunos da turma (código + banco) | ✅ Concluído | 2026-10-14 15:44 | Consulta ao banco (contagens acima) + leitura do código |
| 137.2 | Progresso da Turma com todos os alunos (`assets/js/alunos-da-turma-progresso.js` + `progresso-turma-global.js` + regra em `docs/regras/atividades.md`) | ✅ Concluído | 2026-10-14 15:44 | `node --check` nos 2 JS; banco: atividade 81 → curso 5 → turmas 135081 e 135080 → 68 alunos; falha na leitura não derruba o painel |
| 137.3 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
