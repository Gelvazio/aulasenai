## Etapa 400-312b7090 — #273: Atividade desvinculada continua no card da aula

**Tarefa:** #273 · **Pedido em:** 2026-10-17 22:13 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** “botao remover vinculo da atividade nao esta funcionando, ele deve remover o vinculo da atividade com a aula, mas apos remover, a atividade continua la, exemplo da aula id=82 a atividade id=81, removi a atividade 81 da aula id=82, e continua listada la”
**Objetivo:** a atividade desvinculada (`atividade.aula_id` vazio) sai do card da aula, na hora e depois de recarregar, porque o card só lista atividades pelo `aula_id` do banco (regra 15).

### #273.1 — Diagnosticar e corrigir a atividade desvinculada que continua no card
**Próximo passo:** consultar no banco a atividade 81 (`aula_id`, `pagina`) e a aula 82; rastrear no `indice-aula-grade-banco.js` por que o link continua no card e corrigir.
- **Nível:** PESADO — consulta ao banco para o diagnóstico e mudança na montagem da grade de cards (#272).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** o botão "−" grava `aula_id = null`, mas o link da atividade continua no card da aula 82. Corrigir para que o link de página de atividade só fique no card da aula a que ela está ligada no banco.
- **Critérios de Aceitação:** depois do "−", a atividade some do card na hora e não volta ao recarregar; links que não são de atividade (conteúdo, slides) continuam; nenhum dado ou schema do banco é alterado.
- **Entrega:** — · **Verificação:** —
