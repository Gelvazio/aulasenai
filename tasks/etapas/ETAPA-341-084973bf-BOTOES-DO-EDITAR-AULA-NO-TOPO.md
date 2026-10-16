## Etapa 341-084973bf — Botões do "Editar aula" no topo do modal

**Tarefa:** #214-084973bf-2bb6-4fcc-957d-4a2eb5b28023 · **Pedido em:** 2026-10-16 19:52 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "os botoes,devem ficar na parte de cima, salvar,fechar,excluir aula,gerenciar
atividades,nova atividade nesta aula"
**Objetivo:** no modal "✏️ Editar aula", uma barra no topo com os 5 botões, nesta ordem: Salvar,
Fechar, Excluir aula (só administrador), Gerenciar atividades, Nova atividade nesta aula.

### #214.1 — Barra de botões no topo do "Editar aula"

**Próximo passo:** mover os botões em `assets/js/indice-aula-modal.js` (Salvar continua enviando o
formulário pelo atributo `form`).

- **Nível:** MEDIO — código de tela com lógica (1 a 2 arquivos).

### #214.2 — Aceite do usuário

**Próximo passo:** depende da #214.1.

- **Nível:** LEVE — conferência do usuário.