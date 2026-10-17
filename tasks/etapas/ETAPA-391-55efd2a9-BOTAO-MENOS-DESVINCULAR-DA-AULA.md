## Etapa 391-55efd2a9 — Botão "−" ao lado do ✏️: desvincular a atividade da aula

**Tarefa:** #264-55efd2a9-4c0a-4a5c-b9ad-5448279599ad · **Pedido em:** 2026-10-17 18:24 · **Criada por:** Claude Code (Opus 5.5) (local · main · s20)
**Pedido:** "ao lado do botão de Editar Atividade, coloque um ícone de - (Menos), que ao clicar
deve abrir 1 modal de confirmação pra excluir ele da aula, e neste caso deve apenas remover o
vínculo com a aula atual aula.id"
**Objetivo:** no card do índice, ao lado do ✏️ de cada atividade, um botão "−" que, depois de
confirmar, grava `atividade.aula_id = null` (a atividade não é apagada) e redesenha os cards.

### #264.1 — Botão "−" que desvincula a atividade da aula do card

**Próximo passo:** — (entregue em 2026-10-17 18:35; conferir na tela).

- **Entrega (Sonnet · executor-medio; líder Opus 5.5, s20):** `atividades-crud-modal.js`:
  `criarBotaoDesvincularAtividade`, `aoDesvincularAtividadeCrud` (modal "Confirma remoção do
  vinculo da Atividade?"), `gravarDesvinculoCrud` (`definirAulaDaAtividadeCard(id, null)`) e
  `refazerCardsAposDesvinculoCrud`; o "−" entra logo depois do ✏️ só em atividade com
  `aula_id`. CSS: botão redondo do tamanho do ✏️, tokens novos no `:root` e largura do link
  ajustada para link → ON/OFF → ✏️ → −. `indice-aula-atividades-vinculadas.js`: classe nova em
  `SELETOR_CONTROLES_DO_BOTAO_VINCULADAS`.
- **Verificação (líder):** diff lido nos 3 arquivos; `node --check` nos 2 JS; `confirmarPopup`,
  `mostrarPopup` (tipos `erro`/`sucesso`), `garantirPopupCrud` e
  `atualizarVinculadasDoIndiceCrud` existem; linha do cabeçalho com mais de 100 caracteres
  devolvida e corrigida. Sem navegador.
- **Limite (registrado):** botão escrito no HTML do card não some ao desvincular (o banco muda,
  o link do HTML continua); só os 📝 vindos do banco saem do card.

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
