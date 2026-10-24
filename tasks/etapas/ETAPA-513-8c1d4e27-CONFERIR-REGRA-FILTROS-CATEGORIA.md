## Etapa 513-8c1d4e27 — Conferir e corrigir a regra global dos filtros Certas/Meia/Erradas

**Tarefa:** #364-8c1d4e27 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "ESTA REGRA E GLOBAL, PRA TODAS AS ATIVIDADES ... E CRIE 1 TAREFA PRA CORRIGIR ISSO DEPOIS"
**Objetivo:** garantir que, em todas as atividades discursivas, os filtros Certas / Meia Certas / Erradas valham por alternativa (correção do professor se confirmou; senão a sugestão da IA) e corrigir o que o professor achar errado na tela.

### #364.1 — Conferir na tela e nos demais geradores/atividades e corrigir o que divergir

**Próximo passo:** o usuário testar a #363 na tela e apontar o que ainda diverge; conferir se alguma atividade fora de `mostrar-certas-discursiva.js` tem filtro próprio; corrigir.

- **Nível:** MEDIO — JS com lógica, poucos arquivos (matriz)
- **Modelo:** só Sonnet
- **Descrição:** regra em `docs/regras/atividades.md` (Filtros de categoria). Pontos a conferir: alternativa em branco (hoje nunca escondida); `Falta Corrigir?` junto com a categoria; atualização ao confirmar a nota.
