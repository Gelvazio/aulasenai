## Etapa 388-a9a852ed — Cards das aulas na ordem de `aulas.numero`

**Tarefa:** #261-a9a852ed-fa9d-4f34-9f50-2ba06e49bd89 · **Pedido em:** 2026-10-17 18:20 · **Criada por:** Claude Code (Opus 5.5) (local · main · s20)
**Pedido:** "os cards na tela devem aparecer na tela na ordem da tabela aulas com a coluna
*numero*, em ordem crescente"
**Objetivo:** no índice de atividades da matéria, os cards das aulas aparecem ordenados por
`aulas.numero` crescente (vindo do banco), não pela ordem escrita no HTML.

### #261.1 — Ordenar os cards por `aulas.numero` no índice

**Próximo passo:** — (entregue em 2026-10-17 18:31; conferir na tela).

- **Entrega (Sonnet · executor-medio; líder Opus 5.5, s20):** `assets/js/indice-aula-data.js`:
  `ordenarCardsPeloNumeroDaAula(itens)` e `numeroParaOrdenarCard`, chamadas em
  `desenharCardsDoIndice` depois dos cards só do banco; por contêiner, ordem crescente de
  `aulas.numero`, estável; cards sem aula no fim. Os cards são movidos (não recriados) e a lista
  `estadoCardsAula.cards` não muda de ordem (o card dono da aula continua o mesmo).
- **Verificação (líder):** diff lido; `node --check` passou; troca por marcadores de comentário
  confere com a permutação ordenada. Sem navegador.

- **Nível:** MEDIO — JS de tela, 1 a 3 arquivos, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** depois de identificar a aula de cada card, os cards ficam em ordem
  crescente de `aulas.numero`; cards sem aula ficam no fim, na ordem do HTML; `node --check`
  passa; sem navegador.
