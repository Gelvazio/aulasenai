## Etapa 385-2b180952 — Coluna `aulas.numero_aula` (número que vai no card)

**Tarefa:** #258-2b180952-b7fe-4134-b6cc-cf43763de6ca · **Pedido em:** 2026-10-17 12:11 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "adicione mais 1 coluna de nome numero_aula, que deve ser o numero da aula que vai no
card"
**Objetivo:** a tabela `aulas` ganha a coluna `numero_aula`, e o card mostra esse número.

### Situação no banco (consulta de 2026-10-17 12:11)

- Colunas de `aulas`: id, numero, titulo, descricao, materia_id, curso_id, duracao_minutos,
  data_planejada, sequencia, ativo, visivel_alunos, conteudo, created_at, updated_at, excluido,
  nome_card, rotulo_card.
- Hoje o card mostra `rotulo_card` (77 das 103 aulas têm) ou, sem ele, "AULA " + `numero`.
  `numero` é único por matéria (`UNIQUE (materia_id, numero)`) e não tem nulos.

### Escopo (proposta — aguarda o usuário)

- **Entra:** `alter table aulas add column if not exists numero_aula integer`, preenchida com o
  `numero` atual; campo "Número da aula (card)" no "✏️ Editar aula" e no "📚 Gerenciar Aulas";
  o card mostra "AULA " + `numero_aula` (com 2 dígitos); `docs/database.md`.
- **Dúvidas para o usuário:** (1) `numero_aula` é uma coluna nova ao lado de `numero` (que
  continua sendo a ordem/único por matéria)? (2) O `rotulo_card` continua tendo prioridade no
  card, ou o card passa a usar sempre `numero_aula`?

### Riscos

- Dois números para a mesma aula podem ficar diferentes; plano B: `numero_aula` nasce igual ao
  `numero` e só muda quando o professor editar.

### Decisões

- (aguardando as respostas e o "sim" do usuário)

### #258.1 — Plano e aprovação

**Próximo passo:** esperar as respostas às dúvidas e o "sim" do usuário.

- **Nível:** PESADO — coluna nova no banco.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
