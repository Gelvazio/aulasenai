## Etapa 342-50bf759c — "Editar aula" sem barra de rolagem na caixa

**Tarefa:** #215-50bf759c-296e-4d85-b6c8-e847615e12e2 · **Pedido em:** 2026-10-16 19:56 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "card ficou com barra de rolagem de altura,ajuste"
**Objetivo:** a caixa do modal "✏️ Editar aula" (e a do "🔗 Gerenciar atividades") deixa de ter
barra de rolagem vertical: o limite de 90% da altura com rolagem interna (`.crud-caixa`) passa,
nesses modais, para o fundo; em tela larga, os campos em 3 colunas deixam o modal mais baixo.
Entendido como a caixa do modal (os cards do índice não têm limite de altura no CSS).

### #215.1 — Ajustar o CSS dos modais da aula

**Próximo passo:** ajustar `assets/css/indice-aula-data.css`.

- **Nível:** LEVE — CSS sem lógica, 1 arquivo.

### #215.2 — Aceite do usuário

**Próximo passo:** depende da #215.1.

- **Nível:** LEVE — conferência do usuário.