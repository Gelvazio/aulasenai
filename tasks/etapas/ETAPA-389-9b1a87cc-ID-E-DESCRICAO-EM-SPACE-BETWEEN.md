## Etapa 389-9b1a87cc — ID à esquerda e descrição à direita no botão da atividade

**Tarefa:** #262-9b1a87cc-64e6-4980-b09a-7703c0a0b791 · **Pedido em:** 2026-10-17 18:22 · **Criada por:** Claude Code (Opus 5.5) (local · main · s20)
**Pedido:** "o texto de id e descricao da atividade deve ser space-between, o id na esquerda e a
descricao, a direita"
**Objetivo:** no botão da atividade do card do índice, a etiqueta "ID NN" fica colada à esquerda
e o nome/descrição da atividade à direita (`justify-content: space-between`).

### #262.1 — Botão da atividade com ID à esquerda e descrição à direita

**Próximo passo:** executor-medio ajusta o CSS (e, se preciso, o elemento do texto).

- **Nível:** MEDIO — tela (CSS e, se preciso, o JS que monta o botão), 1 a 2 arquivos.
- **Modelo:** só Sonnet — nunca outro
- **Arquivos:** `assets/css/atividades-crud-modal.css` (`.crud-id-atividade`, linha 137) e, se
  for preciso envolver o texto do botão, `assets/js/atividades-crud-modal.js` (`mostrarIdNoCard`).
- **Critérios de aceitação:** em todo `a.btn.principal` com etiqueta de ID, ID à esquerda e texto
  à direita (`display: flex; justify-content: space-between`), sem quebrar os botões sem
  etiqueta (aluno) nem o ON/OFF/✏️ ao lado; `node --check` se mexer no JS.
