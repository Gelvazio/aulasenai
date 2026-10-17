## Etapa 380-1fa4cc40 — Botão "Excluir" no card da aula (só sem atividade vinculada)

**Tarefa:** #253-1fa4cc40-d32b-405e-b1d0-7c223148e086 · **Pedido em:** 2026-10-17 11:45 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "em cada card de aula,adicione um botao de nome *Excluir*,que deve excluir a aula no
banco de dados ,mas antes deve fazer 1 verificacao se tem atividade vinculada nela,se tiver,obrigue
a remover ou excluir a atividade vinculada primeiro"
**Objetivo:** cada card de aula do índice ganha "🗑️ Excluir", que exclui a aula no banco só quando
nenhuma atividade está vinculada a ela (`atividade.aula_id`); com atividade vinculada, a exclusão é
recusada e o professor é levado ao "✏️ Editar aula" para desvincular ou excluir as atividades.

### #253.1 — Botão Excluir no card com a verificação das atividades vinculadas

**Próximo passo:** — (entregue).

- **Nível:** PESADO — exclui dados da tabela `aulas` no banco (função `excluir_aula`, só Professor
  Administrador).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** usar a exclusão de aula que já existe no banco (`excluir_aula`, exclusão lógica
  `aulas.excluido = 1`, a mesma do "📚 Gerenciar Aulas", #250), sem mudar o banco. Antes de
  excluir, ler as atividades da aula; se houver alguma, mostrar a lista e não excluir.
- **Critérios de aceitação:** botão em todo card com aula no banco (só professor); com atividade
  vinculada, não exclui e abre o "Editar aula"; sem atividade, pede confirmação, exclui e o card
  some.
- **Entrega (2026-10-17 11:48, Opus 5.5, s14):** `assets/js/indice-aula-excluir-card.js` (novo):
  confere se é Professor Administrador (`eh_professor_administrador`), lê as atividades da aula
  (`listarAtividadesDaAulaCard`); com alguma, mostra a lista e o botão "✏️ Abrir Editar aula" e
  não exclui; falha na leitura também não exclui; sem atividade, confirma e chama
  `excluirAulaGerenciar` (`excluir_aula`), e o card some (`excluido = 1`).
  `indice-aula-data.js`: botão depois do "✏️ Editar aula"; `atividades-crud-modal.js`: carrega o
  arquivo novo depois do `indice-aula-modal.js`; `indice-aula-data.css`: botão vermelho (tokens
  em `:root`); `docs/regras/atividades.md`.
- **Verificação:** `node --check` nos 3 `.js`; linhas novas ≤ 100 caracteres e funções ≤ 45
  linhas; banco sem mudança (usa a `excluir_aula` de `database/2026-10-06-aulas-excluido.sql`).
  Sem navegador: o clique fica para conferir na tela.
