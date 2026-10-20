## Etapa 437-b7d2e914 — #308: Reativar as aulas 5 e 6 de Análise de Dados (ids 41 e 42)

**Tarefa:** #308 · **Pedido em:** 2026-10-20 14:05 · **Criada por:** Claude Code (Opus 5.5) (local · main · s31)
**Pedido:** "nao estou conseguindo gravar a aula 5 na materia" (erro "Não foi possível gravar…" no
➕ Nova aula da matéria ANALISE_DADOS_APLICADA_GESTAO) → "Reativar a aula 41 e 42".
**Objetivo:** as aulas 41 (nº 5) e 42 (nº 6) da matéria 27 estavam com `excluido = 1`; a regra
`UNIQUE (materia_id, numero)` impedia criar outra aula 5/6. Reativá-las (`excluido = 0`) para que
voltem a aparecer e possam ser editadas.

### Decisões

| O quê | Quando | Quem | Por quê |
|---|---|---|---|
| Reativar 41 e 42 (só `excluido = 0`, sem mudar título nem número) | 2026-10-20 14:05 | Usuário (pedido explícito no chat) | Mudança pontual em produção autorizada pelo próprio pedido |

### #308.1 — UPDATE `aulas.excluido = 0` nos ids 41 e 42

**Próximo passo:** —

- **Nível:** PESADO — banco de produção
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** `update aulas set excluido = 0 where id in (41, 42) and materia_id = 27`.
- **Critérios de aceitação:** consulta mostra 41 e 42 com `excluido = 0`.
- **Entrega:** ver commit de fechamento · **Verificação:** pendente
