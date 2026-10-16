## Etapa 320-c3289a94 — Remover a tabela `aula_turma`

**Tarefa:** #193-c3289a94-14ea-4442-8df7-7410bc01d242 · **Pedido em:** 2026-10-16 10:01 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "REMOVA A TABELA AULA_TURMA,AINDA N FUNCIONOU"
**Objetivo:** tirar a tabela `aula_turma` (datas e bloqueio da aula por turma, #185 a #188) do
banco e do código, porque o botão de bloqueio de atividade ainda não funciona (#192).

### #193.1 — Plano na etapa e aprovação do usuário

**Próximo passo:** levantar tudo o que usa `aula_turma` (banco e código) e escrever o plano.

- **Nível:** PESADO — banco (apagar tabela com dados), várias partes do código.
