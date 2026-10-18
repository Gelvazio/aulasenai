## Etapa 400-312b7090 — #273: Atividade desvinculada continua no card da aula

**Tarefa:** #273 · **Pedido em:** 2026-10-17 22:13 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** “botao remover vinculo da atividade nao esta funcionando, ele deve remover o vinculo da atividade com a aula, mas apos remover, a atividade continua la, exemplo da aula id=82 a atividade id=81, removi a atividade 81 da aula id=82, e continua listada la”
**Objetivo:** a atividade desvinculada (`atividade.aula_id` vazio) sai do card da aula, na hora e depois de recarregar, porque o card só lista atividades pelo `aula_id` do banco (regra 15).

### #273.1 — Diagnosticar e corrigir a atividade desvinculada que continua no card
**Próximo passo:** — (entregue).
- **Nível:** PESADO — consulta ao banco para o diagnóstico e mudança na montagem da grade de cards (#272).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** o botão "−" grava `aula_id = null`, mas o link da atividade continua no card da aula 82. Corrigir para que o link de página de atividade só fique no card da aula a que ela está ligada no banco.
- **Critérios de Aceitação:** depois do "−", a atividade some do card na hora e não volta ao recarregar; links que não são de atividade (conteúdo, slides) continuam; nenhum dado ou schema do banco é alterado.
- **Executor:** Claude Code (Opus 5.5) (local · main).
- **Causa:** o "−" funcionou (consulta: atividade 81 com `aula_id = null`; a atividade 85 continua na aula 82). O link da 81 vinha do artigo HTML da aula 82, ligado à aula pela atividade 85, e a montagem da #272 levava para o card todos os links do artigo.
- **Entrega:** `indice-aula-repositorio.js` ganha `buscarVinculosDasPaginasCard` (`aula_id` de cada página de atividade); `indice-aula-grade-banco.js` só põe no card o link de atividade cujo `aula_id` é a aula do card e ganha `retirarAtividadesDeOutraAulaDosCards`, chamada por `atualizarAtividadesVinculadasDoIndice` (`indice-aula-data.js`) depois do "−", do ✏️ Editar e do 🔗 Gerenciar atividades; regra em `docs/regras/atividades.md`.
- **Verificação:** consulta de leitura no banco (atividades 81 e 85, aula 82); leitura do fluxo do "−" (`aoDesvincularAtividadeCrud` → `atualizarVinculadasDoIndiceCrud` → `atualizarAtividadesVinculadasDoIndice`); `node --check` nos 3 JS; `git diff --check` limpo; banco não alterado; sem navegador. Conferir na tela: card da aula 82 sem a atividade 81.
