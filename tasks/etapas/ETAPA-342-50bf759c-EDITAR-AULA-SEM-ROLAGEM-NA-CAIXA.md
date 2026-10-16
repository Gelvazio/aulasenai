## Etapa 342-50bf759c — "Editar aula" sem barra de rolagem na caixa

**Tarefa:** #215-50bf759c-296e-4d85-b6c8-e847615e12e2 · **Pedido em:** 2026-10-16 19:56 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "card ficou com barra de rolagem de altura,ajuste"
**Objetivo:** a caixa do modal "✏️ Editar aula" (e a do "🔗 Gerenciar atividades") deixa de ter
barra de rolagem vertical: o limite de 90% da altura com rolagem interna (`.crud-caixa`) passa,
nesses modais, para o fundo; em tela larga, os campos em 3 colunas deixam o modal mais baixo.
Entendido como a caixa do modal (os cards do índice não têm limite de altura no CSS).

### #215.1 — Ajustar o CSS dos modais da aula

**Próximo passo:** — (entregue).

- **Nível:** LEVE — CSS sem lógica, 1 arquivo.
- **Entrega (2026-10-16 19:56, Opus 5.5, s14):** `assets/css/indice-aula-data.css`: nos fundos `aula-data-fundo` e
  `aula-vinculo-fundo` a caixa fica sem `max-height` nem rolagem interna e o fundo rola; em tela
  com mais de 900 px, caixa de até 980 px e campos em 3 colunas (informação e textos longos na
  linha inteira); seletores com 2 classes para vencer o `.crud-form` de atividades-crud-modal.css.
  Os outros modais (CADASTRAR ATIVIDADES) não mudam.
- **Verificação:** leitura do CSS (especificidade e ordem); sem navegador: o teste na tela é o aceite.

### #215.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário abre o "✏️ Editar aula" e confere que a caixa não tem mais barra de rolagem.

- **Nível:** LEVE — conferência do usuário.