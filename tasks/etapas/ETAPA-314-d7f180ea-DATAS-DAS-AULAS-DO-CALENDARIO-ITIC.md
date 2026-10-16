## Etapa 314-d7f180ea — Datas das aulas das 2 turmas pelo CALENDARIO AULAS ITIC.txt

**Tarefa:** #187-d7f180ea-6a88-4ea9-93fd-9377380ba12f · **Pedido em:** 2026-10-16 08:05 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s5)
**Pedido:** "leia CALENDARIO AULAS ITIC.txt, e use pra colocar as datas de aulas nas 2 turmas"
**Objetivo:** gravar em `aula_turma` as datas do calendário (turma 135081 tarde e 135080 manhã),
no lugar das datas provisórias vindas das atividades (#185).

### #187.1 — Gravar as datas do calendário em `aula_turma` (PESADO)

**Próximo passo:** aplicar o SQL (upsert pelo título da aula) e conferir.

- **Nível:** PESADO — escrita de dados no banco de produção (pedido expresso do usuário).
- **Descrição:** `CALENDARIO AULAS ITIC.txt`: "ITIC CEPLAS TARDE" = turma 135081; "ITIC CEPLAS
  MANHA" = turma 135080. As aulas do calendário são casadas com as do banco pelo **título** (a
  numeração difere). Só `data_aula` muda; `bloqueio` não é tocado; aulas fora do calendário
  (avaliações, atividades) ficam como estão.
- **Critérios de aceitação:** 10 datas por turma iguais ao calendário.
