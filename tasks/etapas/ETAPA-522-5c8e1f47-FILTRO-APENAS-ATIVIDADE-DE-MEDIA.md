## Etapa 522-5c8e1f47 — Filtro "Apenas atividade de média" no card de notas

**Tarefa:** #373-5c8e1f47 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "ADICIONE FILTRO EM CIMA DE NOME *APENAS ATIVIDADE DE MEDIA* DO TIPO ON/OFF, SE MARCADO, LISTA AS ATIVIDADES QUE CONTAM NA MEDIA, SE DESMARCADO, LISTA TODAS, DEVE SALVAR VALOR EM LOCAL STORAGE TB, E A CADA ATIVIDADE MUDADA VALOR, JA DEVE RECARREGAR A TELA"
**Objetivo:** chave ON/OFF acima da tabela do card "Notas e média"; ON lista só as atividades que entram na média, OFF lista todas; valor guardado no localStorage; mudar o ON/OFF de uma atividade já refaz a lista.

### #373.1 — Filtro ON/OFF com localStorage em `card-notas-media.js` e CSS

**Próximo passo:** implementar.

- **Nível:** MEDIO — JS com lógica, 1 arquivo + CSS (Jev, confiança 0,97)
- **Modelo:** só Sonnet
- **Verificação:** `node --check`; conferir na tela: o usuário.

### Escopo ampliado (pedido do usuário, mesma sessão)
"VALE DE FORMA GLOBAL PRA TODAS AS MATERIAS": o card inteiro (e o filtro) passa a valer em todo índice de atividades.

- **Entrega:** `assets/js/card-notas-media.js` (chave ON/OFF "Apenas atividade de média" acima da tabela; ON lista só as atividades que contam na média, OFF lista todas; valor no `localStorage` em `card-notas-media:apenas-atividade-de-media`; mudar ON/OFF ou peso de uma atividade refaz a tabela e a média na hora), `assets/css/card-notas-media.css`, e `assets/js/atividades-crud-modal.js` (nova `carregarCardNotasMediaIndice`, que carrega CSS e os 3 scripts em todos os 37 índices de matéria que já usam o módulo e em futuros). As tags estáticas da #371 no `index.html` de Introdução à TIC e no `gerar_indices.py` foram removidas para não carregar duas vezes.
- **Verificação:** `node --check` ok; os 37 `ATIVIDADES/index.html` incluem `atividades-crud-modal.js`. Conferir na tela: o usuário (aluno e professor, em mais de uma matéria).
