## Etapa 271-dfbe3f7b — Atividade 81: notas da IA não aparecem

**Tarefa:** #144-dfbe3f7b-e926-45cc-93d9 · **Pedido em:** 2026-10-14 16:49 · **Executor:** Claude Code (local · main)
**Pedido:** "atividade id=81, n esta mostrando as notas de IA"
**Objetivo:** as notas da IA voltarem a aparecer na atividade 81 (discursiva de Introdução às TIC).
**Próximo passo:** 271.3 — usuário conferir as notas da IA no Progresso da atividade 81 depois da rodada.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 271.1 | Diagnóstico (banco + código) | ✅ Concluído | 2026-10-14 16:50 | Banco: 489 notas da IA, a última às 15:44; 108 respostas posteriores (16 alunos) sem nota. A tarefa agendada `correcao-ia-atividade-81` (#130) tinha sumido da lista do app ("No scheduled tasks found"), embora o arquivo `SKILL.md` continuasse na pasta |
| 271.2 | Tarefa agendada recriada com o mesmo prompt (`*/30 * * * *`, modo Auto) e uma rodada disparada na hora para as 108 pendentes | ✅ Concluído | 2026-10-14 16:50 | `create_scheduled_task` confirmou (próxima em ~21 min); `run_scheduled_task` abriu a sessão `local_96d01fe2` |
| 271.3 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
