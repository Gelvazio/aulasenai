## Etapa 343-f3fd9792 — "Fechar" vermelho e à direita no "Editar aula"

**Tarefa:** #216-f3fd9792-556c-48bc-9853-f3129d18157f · **Pedido em:** 2026-10-16 19:59 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "no card de edicao de aula, o botao fechar deve ter fundo vermelhor e ficar na direita"
**Objetivo:** na barra do topo do "✏️ Editar aula" (#214), o "✕ Fechar" vai para o fim, encostado à
direita, com fundo vermelho.

### #216.1 — Fechar vermelho à direita

**Próximo passo:** — (entregue).

- **Nível:** LEVE — ordem de botão e CSS, sem lógica.
- **Entrega (2026-10-16 19:59, Opus 5.5, s14):** `indice-aula-modal.js`: barra = Salvar, Excluir aula, Gerenciar
  atividades, Nova atividade nesta aula e, por último, ✕ Fechar (classe `aula-modal-fechar`);
  `indice-aula-data.css`: Fechar com `margin-left: auto` (à direita) e fundo vermelho (tokens
  `--aula-fechar-fundo` e `--aula-fechar-texto`).
- **Verificação:** `node --check`; leitura do CSS. Sem navegador: o teste na tela é o aceite.

### #216.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário abre o "✏️ Editar aula" e confere o Fechar vermelho à direita.

- **Nível:** LEVE — conferência do usuário.