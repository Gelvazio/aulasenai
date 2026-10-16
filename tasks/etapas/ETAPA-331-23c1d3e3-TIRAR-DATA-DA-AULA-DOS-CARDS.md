## Etapa 331-23c1d3e3 — Tirar "Data da aula" de todos os cards de atividades

**Tarefa:** #204-23c1d3e3-d3bf-4014-ab26-2f656f6f3081 · **Pedido em:** 2026-10-16 15:06 · **Criada por:** Claude Code (Opus 5.5) (local · main · s10)
**Pedido:** "Data da aula:,APAGUE DE TODOS OS CARDS DE ATIVIDADES"
**Objetivo:** os cards dos índices de atividades (`ATIVIDADES/index.html` de todas as matérias)
deixam de mostrar a linha "📅 Data da aula: …".

### #204.1 — Tirar a linha "Data da aula" dos cards

**Próximo passo:** ler `assets/js/indice-aula-data.js` e tirar a linha da data do card.

- **Nível:** MEDIO — JS com lógica, 1 a 3 arquivos
- **Descrição:** a linha é criada por `assets/js/indice-aula-data.js`, que vale para todos os
  índices; tirar só a exibição (a data continua no banco e no modal "Editar aula").
- **Critérios de aceitação:** nenhum card de atividade mostra "Data da aula".

### #204.2 — Aceite do usuário

**Próximo passo:** aguardando o #204.1.

- **Nível:** LEVE — confirmação do usuário
