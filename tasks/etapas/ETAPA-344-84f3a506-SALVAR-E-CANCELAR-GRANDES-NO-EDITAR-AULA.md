## Etapa 344-84f3a506 — Salvar e Cancelar grandes na linha de baixo do "Editar aula"

**Tarefa:** #217-84f3a506-3927-49d1-919c-5057c9f66eab · **Pedido em:** 2026-10-16 20:00 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "o botao de salvar deve ficar na linha de nbaixo em tamanho maior, e acrescente mais 1 de
nome cancelar em fundo verde, os 2 devem ser mais altos e maiores"
**Objetivo:** no "✏️ Editar aula", tirar o Salvar da barra do topo e pôr, numa 2.ª linha logo abaixo
dela, Salvar (azul) e Cancelar (novo, fundo verde, fecha sem gravar), os dois maiores e mais altos.
Entendido como a linha logo abaixo da barra do topo (#214).

### #217.1 — Linha com Salvar e Cancelar grandes

**Próximo passo:** — (entregue).

- **Nível:** LEVE — botões e CSS; o Cancelar só fecha (mesma ação do Fechar).
- **Entrega (2026-10-16 20:01, Opus 5.5, s14):** `indice-aula-modal.js`: o Salvar saiu da barra; nova
  `montarLinhaSalvarModalAula` (linha logo abaixo da barra com "💾 Salvar", que envia o formulário
  pelo atributo `form`, e "↩ Cancelar", que fecha sem gravar); `indice-aula-data.css`: os dois
  com 52 px de altura, fonte de 17 px e largura dividida na linha; Cancelar verde
  (`--aula-cancelar-fundo`).
- **Verificação:** `node --check`; linhas novas até 100 caracteres. Sem navegador: o teste na
  tela é o aceite.

### #217.2 — Aceite do usuário

**Próximo passo:** — (aceite do usuário em 2026-10-16 21:08: "Aceito tudo").

- **Nível:** LEVE — conferência do usuário.