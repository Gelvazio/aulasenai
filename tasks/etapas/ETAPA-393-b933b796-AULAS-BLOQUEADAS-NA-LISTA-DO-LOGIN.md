## Etapa 393-b933b796 — #266: Ocultar aulas bloqueadas no login do aluno

**Tarefa:** #266 · **Pedido em:** 2026-10-17 20:54 · **Criada por:** Codex (gpt-6) (local · main)
**Pedido:** “no login do aluno, ajuste pra nao mostrar as aulas bloqueadas,nemm listadas devem ser”
**Objetivo:** remover da lista do login do aluno as aulas bloqueadas, sem alterar autenticação ou permissões.

### #266.1 — Filtrar aulas bloqueadas na lista do aluno

**Próximo passo:** — tarefa finalizada.

- **Nível:** MEDIO — lógica de exibição em até três arquivos; não altera autenticação nem permissões.
- **Modelo:** só Codex — nunca outro
- **Descrição:** filtrar as aulas bloqueadas antes de renderizar a lista do aluno. · **Critérios de aceitação:** aulas com bloqueio ativo não aparecem nem são listadas; aulas liberadas continuam aparecendo; nenhuma regra de acesso ou autenticação é alterada.
- **Entrega:** `feat(aluno): ocultar aulas bloqueadas do índice` por Codex (GPT-6 · MEDIO) (local · main).
- **Verificação:** `node --check` passou nos dois JS; `git diff --check` passou nos três arquivos da tarefa; conferido no código que só aluno recebe a classe de ocultação e que o CSS tira o card da exibição.
