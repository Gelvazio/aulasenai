## Etapa 253-a11022b6 — nome_card e rotulo_card da aula 82 (card "ATIVIDADE SEXTA FEIRA")

**Tarefa:** #126-a11022b6-78f3-4896 · **Pedido em:** 2026-10-14 13:41 · **Executor:** Claude Code (local · main)
**Pedido:** "PODE ALTERAR O NOME_CARD DA AULA 82" (autorização explícita para a mudança no banco de produção)
**Objetivo:** o card de sexta no índice de atividades da ITIC (#117) mostra o título "ATIVIDADE SEXTA FEIRA", que vem de `aulas.nome_card` da aula ligada à atividade 85.
**Próximo passo:** 253.3 — aceite do usuário.
**Pedido (2):** "ALTERE TAMBÉM O ROTULO_CARD DA AULA 82" (2026-10-14 13:42)

Valores antigos (para desfazer): `nome_card = 'Revisão da Apostila — Capítulos 01 a 07'` e `rotulo_card = 'ATIVIDADE INDIVIDUAL · APOSTILA · CAPÍTULOS 01 A 07'`. Só essas colunas mudaram (`titulo` e `data_planejada` iguais).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 253.1 | `update aulas set nome_card = 'ATIVIDADE SEXTA FEIRA' where id = 82` (conector do Supabase) | ✅ Concluído | 2026-10-14 13:41 | `returning`: id 82, nome_card = ATIVIDADE SEXTA FEIRA |
| 253.2 | `update aulas set rotulo_card = 'ATIVIDADES INDIVIDUAIS · AULAS 01 A 07 · 09/10/2026' where id = 82` (o texto do HTML do card, #117) | ✅ Concluído | 2026-10-14 13:42 | `returning`: id 82 com o novo rotulo_card |
| 253.3 | Aceite do usuário (recarregar o índice da ITIC) | 👀 Aguardando o usuário | — | — |
