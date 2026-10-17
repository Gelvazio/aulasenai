## Etapa 391-55efd2a9 — Botão "−" ao lado do ✏️: desvincular a atividade da aula

**Tarefa:** #264-55efd2a9-4c0a-4a5c-b9ad-5448279599ad · **Pedido em:** 2026-10-17 18:24 · **Criada por:** Claude Code (Opus 5.5) (local · main · s20)
**Pedido:** "ao lado do botão de Editar Atividade, coloque um ícone de - (Menos), que ao clicar
deve abrir 1 modal de confirmação pra excluir ele da aula, e neste caso deve apenas remover o
vínculo com a aula atual aula.id"
**Objetivo:** no card do índice, ao lado do ✏️ de cada atividade, um botão "−" que, depois de
confirmar, grava `atividade.aula_id = null` (a atividade não é apagada) e redesenha os cards.

### #264.1 — Botão "−" que desvincula a atividade da aula do card

**Próximo passo:** espera a #262.1 (mesmos arquivos); depois, executor-medio.

- **Nível:** MEDIO — JS/CSS de tela, 2 arquivos; o update usa a função já existente (RLS de
  professor já valida).
- **Modelo:** só Sonnet — nunca outro
- **Arquivos:** `assets/js/atividades-crud-modal.js` (junto do `criarBotaoEditarAtividade`) e
  `assets/css/atividades-crud-modal.css`.
- **Reaproveitar:** `window.confirmarPopup` (`js/popup.js:124`, como em
  `indice-aula-modal-vinculo.js:181`), `definirAulaDaAtividadeCard(id, null)`
  (`indice-aula-repositorio.js:138`) e `atualizarAtividadesVinculadasDoIndice`
  (`indice-aula-data.js:434`) para redesenhar.
- **Mensagem do modal (pedido do usuário, 2026-10-17 18:25):** exatamente
  **"Confirma remoção do vinculo da Atividade?"**.
- **Critérios de aceitação:** "−" só para professor, logo depois do ✏️; modal de confirmação com
  a mensagem acima; só zera o `aula_id` (nunca apaga); mensagem de erro se não gravar; card
  redesenhado; `node --check`.
