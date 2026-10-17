## Etapa 388-a9a852ed — Cards das aulas na ordem de `aulas.numero`

**Tarefa:** #261-a9a852ed-fa9d-4f34-9f50-2ba06e49bd89 · **Pedido em:** 2026-10-17 18:20 · **Criada por:** Claude Code (Opus 5.5) (local · main · s20)
**Pedido:** "os cards na tela devem aparecer na tela na ordem da tabela aulas com a coluna
*numero*, em ordem crescente"
**Objetivo:** no índice de atividades da matéria, os cards das aulas aparecem ordenados por
`aulas.numero` crescente (vindo do banco), não pela ordem escrita no HTML.

### #261.1 — Ordenar os cards por `aulas.numero` no índice

**Próximo passo:** líder lê como os cards são montados e passa ao executor-medio.

- **Nível:** MEDIO — JS de tela, 1 a 3 arquivos, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** depois de identificar a aula de cada card, os cards ficam em ordem
  crescente de `aulas.numero`; cards sem aula ficam no fim, na ordem do HTML; `node --check`
  passa; sem navegador.
