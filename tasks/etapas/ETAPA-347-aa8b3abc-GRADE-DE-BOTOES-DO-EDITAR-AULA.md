## Etapa 347-aa8b3abc — Grade de botões do "Editar aula" (mesmo tamanho, centralizada)

**Tarefa:** #220-aa8b3abc-1b58-4105-ae40-2198a8584d10 · **Pedido em:** 2026-10-16 20:08 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "gerenciar atividade e nova atividade aula,devem ter a mesma largura e altura de salvar e
cancelar, que devem diminuir uns 30 % a largura, e alinhar juntos centralizados,como 1 tabela"
**Objetivo:** Gerenciar atividades, Nova atividade nesta aula, Salvar e Cancelar com a mesma largura
e altura (cerca de 30% mais estreitos que o Salvar/Cancelar da #217), numa grade 2 × 2 centralizada;
o ✕ Fechar vermelho fica sozinho à direita, em cima.

### #220.1 — Grade 2 × 2 dos botões

**Próximo passo:** — (entregue).

- **Nível:** LEVE — ordem dos botões e CSS, sem lógica nova.
- **Entrega (2026-10-16 20:09, Opus 5.5, s14):** `indice-aula-modal.js`: a barra do topo ficou só com o ✕ Fechar
  (à direita); nova `montarGradeBotoesModalAula` com Gerenciar atividades e Nova atividade nesta
  aula em cima e Salvar e Cancelar embaixo (a `montarLinhaSalvarModalAula` saiu);
  `indice-aula-data.css`: grade de 2 colunas de até 320 px (antes cada botão ocupava cerca de
  464 px, metade da linha: ~30% menor), centralizada, 52 px de altura, 24 px entre as linhas.
- **Verificação:** `node --check`; as classes e a função antigas não são usadas em `assets` nem
  em `MATERIAIS`. Sem navegador: o teste na tela é o aceite.

### #220.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário abre o "✏️ Editar aula" e confere a grade de botões.

- **Nível:** LEVE — conferência do usuário.