## Etapa 382-694327e6 — "Id Aula:" no topo do card da aula

**Tarefa:** #255-694327e6-4448-4f4b-8257-ec70e69f8660 · **Pedido em:** 2026-10-17 11:57 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "no card, da aula, bem em cima ,antes do nome Aula NN, adicione 1 label de nome Id
Aula:  que deve mostrar o id da aula no banco de dados"
**Objetivo:** cada card de aula do índice mostra, acima do rótulo "AULA NN", a etiqueta
"Id Aula: <aulas.id>".

### #255.1 — Etiqueta "Id Aula:" no card

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código de tela em JS e CSS, 2 a 3 arquivos, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** em `assets/js/indice-aula-data.js`, ao desenhar o card com aula do banco,
  criar (uma vez só por card) um elemento `.aula-id-card` com o texto `Id Aula: <id>` logo antes
  do `.num`; card sem aula no banco não ganha a etiqueta. CSS em
  `assets/css/indice-aula-data.css` com tokens em `:root`. Igual ao "ID NN" das atividades, só o
  professor vê.
- **Critérios de aceitação:** etiqueta acima do "AULA NN" em todos os cards com aula (também os
  do "📚 Gerenciar Aulas"); não duplica ao redesenhar; `node --check` passa.
- **Entrega (2026-10-17 11:59, Sonnet · executor-medio; líder Opus 5.5, s14):** `indice-aula-data.js`: nova
  `renderizarIdDaAulaNoCard`, chamada em `desenharCardAula` (cria um `div.aula-id-card` antes do
  `.num`, uma vez por card, só professor e só card com aula); `indice-aula-data.css`: estilo com
  tokens `--aula-id-card-cor` e `--aula-id-card-fonte`; `docs/regras/atividades.md`.
- **Verificação (líder):** diff só nos 3 arquivos da lista; `node --check` passou; linhas novas
  ≤ 100 caracteres. Sem navegador: conferir na tela.
