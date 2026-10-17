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

- **2026-10-17 12:13 — usuário:** "ah,eu nao sabiam,deixe a coluna numero mesmo,deve ser ela a ser mostrada
  no rotulo do card sempre". **Sem coluna nova e sem mudança no banco:** o rótulo do card passa
  a ser sempre "AULA " + `aulas.numero` (2 dígitos), mesmo quando a aula tem `rotulo_card`
  (26 aulas têm rótulo próprio, ex.: "ATIVIDADES", "AVALIAÇÃO 02", "EXCEL 29/09"). O
  `rotulo_card` continua no banco e no modal e ainda serve para achar a aula de um card pelo
  texto do HTML. Com isso a tarefa deixou de ser grande (só tela).

### #258.1 — Plano e aprovação

**Próximo passo:** — (respondido pelo usuário; a coluna nova não será criada).

- **Nível:** PESADO — coluna nova no banco.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro

### #258.2 — Rótulo do card sempre "AULA " + `numero`

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código de tela em JS, 1 a 2 arquivos, sem banco.
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `assets/js/indice-aula-data.js`, `renderizarTextosNoCard`: escrever no `.num`
  "AULA " + `numero` com 2 dígitos, sem usar o `rotulo_card`. `obterRotuloDaAula` não muda (é
  usada para achar a aula pelo rótulo do HTML e nas mensagens). `docs/regras/atividades.md`.
- **Critérios de aceitação:** todo card com aula mostra "AULA NN" do `numero`; `node --check`.
- **Entrega (2026-10-17 12:14, Sonnet · executor-medio; líder Opus 5.5, s14):** `indice-aula-data.js`: nova
  `obterRotuloNumeroDaAula` (constante `PREFIXO_ROTULO_AULA`), usada no `.num` por
  `renderizarTextosNoCard`; `obterRotuloDaAula` ficou só para achar a aula pelo HTML; cabeçalho
  atualizado; `docs/regras/atividades.md`.
- **Verificação (líder):** diff só nos 2 arquivos da lista; `node --check` passou; linhas novas
  ≤ 100 caracteres. Sem navegador: conferir na tela.
