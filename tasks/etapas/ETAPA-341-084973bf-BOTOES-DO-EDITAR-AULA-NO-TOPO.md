## Etapa 341-084973bf — Botões do "Editar aula" no topo do modal

**Tarefa:** #214-084973bf-2bb6-4fcc-957d-4a2eb5b28023 · **Pedido em:** 2026-10-16 19:52 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "os botoes,devem ficar na parte de cima, salvar,fechar,excluir aula,gerenciar
atividades,nova atividade nesta aula"
**Objetivo:** no modal "✏️ Editar aula", uma barra no topo com os 5 botões, nesta ordem: Salvar,
Fechar, Excluir aula (só administrador), Gerenciar atividades, Nova atividade nesta aula.

### #214.1 — Barra de botões no topo do "Editar aula"

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código de tela com lógica (1 a 2 arquivos).
- **Entrega (2026-10-16 19:53, Opus 5.5, s14):** `assets/js/indice-aula-modal.js`: nova `montarBarraModalAula`
  (barra logo abaixo do título: Salvar, ✕ Fechar, 🗑️ Excluir aula, 🔗 Gerenciar atividades, ➕ Nova
  atividade nesta aula); Salvar envia o formulário pelo atributo `form`; a mensagem do modal fica
  logo abaixo da barra; os botões saíram do fim do formulário e do cabeçalho da lista.
  `assets/css/indice-aula-data.css`: classe `aula-modal-barra` (as do cabeçalho antigo saíram).
- **Verificação:** `node --check`; linhas novas até 100 caracteres; as classes antigas não são
  usadas em mais nenhum arquivo. Sem navegador: o teste na tela é o aceite.

### #214.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário abre o "✏️ Editar aula" e confere a barra no topo.

- **Nível:** LEVE — conferência do usuário.