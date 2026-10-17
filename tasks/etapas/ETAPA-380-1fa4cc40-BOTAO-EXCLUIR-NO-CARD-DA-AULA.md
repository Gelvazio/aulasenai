## Etapa 380-1fa4cc40 — Botão "Excluir" no card da aula (só sem atividade vinculada)

**Tarefa:** #253-1fa4cc40-d32b-405e-b1d0-7c223148e086 · **Pedido em:** 2026-10-17 11:45 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "em cada card de aula,adicione um botao de nome *Excluir*,que deve excluir a aula no
banco de dados ,mas antes deve fazer 1 verificacao se tem atividade vinculada nela,se tiver,obrigue
a remover ou excluir a atividade vinculada primeiro"
**Objetivo:** cada card de aula do índice ganha "🗑️ Excluir", que exclui a aula no banco só quando
nenhuma atividade está vinculada a ela (`atividade.aula_id`); com atividade vinculada, a exclusão é
recusada e o professor é levado ao "✏️ Editar aula" para desvincular ou excluir as atividades.

### #253.1 — Botão Excluir no card com a verificação das atividades vinculadas

**Próximo passo:** fazer o botão (arquivo novo `assets/js/indice-aula-excluir-card.js`).

- **Nível:** PESADO — exclui dados da tabela `aulas` no banco (função `excluir_aula`, só Professor
  Administrador).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** usar a exclusão de aula que já existe no banco (`excluir_aula`, exclusão lógica
  `aulas.excluido = 1`, a mesma do "📚 Gerenciar Aulas", #250), sem mudar o banco. Antes de
  excluir, ler as atividades da aula; se houver alguma, mostrar a lista e não excluir.
- **Critérios de aceitação:** botão em todo card com aula no banco (só professor); com atividade
  vinculada, não exclui e abre o "Editar aula"; sem atividade, pede confirmação, exclui e o card
  some.
