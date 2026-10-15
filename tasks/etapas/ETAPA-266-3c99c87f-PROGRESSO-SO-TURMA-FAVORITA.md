## Etapa 266-3c99c87f — Progresso da Turma: listar só os alunos da turma favorita

**Tarefa:** #139-3c99c87f-ffd8-452e-9209 · **Pedido em:** 2026-10-14 16:11 · **Executor:** Claude Code (local · main)
**Pedido:** "mas aqui, (ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA-DISCURSIVA.html
de Introdução às TIC), deve listar apenas os alunos da turma favorita"
**Objetivo:** o Progresso da Turma mostrar só os alunos da turma escolhida num combo "Turma" que abre na turma favorita (`turma.favorito`).
**Escopo ampliado (2026-10-14 16:12, pedido do usuário):** "ao lado de *Progresso da turma*, adicione um combo de turma com a turma favorita selecionada, e use esta turma selecionada pra listar os alunos".
**Próximo passo:** 139.3 — usuário testar o combo "Turma" no Progresso da atividade 81 (Introdução às TIC).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 139.1 | Levantar de onde vem a lista dos alunos (código + banco) | ✅ Concluído | 2026-10-14 16:12 | Banco: atividade 81 → curso 5 → turmas 135081 (favorita, 35 alunos) e 135080 (33); lista vem de `assets/js/alunos-da-turma-progresso.js` |
| 139.2 | Combo "Turma" ao lado do título (abre na favorita; "Todas as turmas"); lista, resumo, Gráficos e Cálculo Nota só da turma escolhida (`alunos-da-turma-progresso.js`, `progresso-turma-global.js`, CSS, `docs/regras/atividades.md`) | ✅ Concluído | 2026-10-14 16:13 | `node --check` nos 2 JS; linhas ≤ 100; falha no combo não derruba o painel |
| 139.3 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
