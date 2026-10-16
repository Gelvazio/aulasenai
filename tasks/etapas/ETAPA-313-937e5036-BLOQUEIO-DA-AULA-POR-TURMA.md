## Etapa 313-937e5036 — Bloqueio da aula por turma (coluna `bloqueio` em `aula_turma`)

**Tarefa:** #186-937e5036-ecab-4e20-ba35-202746be7010 · **Pedido em:** 2026-10-16 07:15 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s5)
**Pedido:** "o bloqueio tambem deve ser por turma,reaproveite esta mesma tabela, 1 aula deve ser
bloqueada pela turma,adicione nova coluna de nome bloqueio na tabela aula_turma,pra controlar a aula
bloqueada por turma"
**Objetivo:** bloquear/desbloquear uma aula só para uma turma, guardando isso na coluna `bloqueio`
da tabela `aula_turma` (criada na #185).

### Escopo

- **Entra:** coluna `bloqueio` em `aula_turma`; botão de bloquear/desbloquear a aula por turma
  (junto das datas, #185); a aula bloqueada na turma passa a valer onde o sistema já confere
  `aulas.ativo` (índice, página da atividade, RLS) — a definir ao ler o código.
- **Não entra:** mudar o bloqueio global `aulas.ativo` e o da atividade por turma
  (`atividade.bloqueio`), que continuam como estão.

### Decisões

- 2026-10-16 07:15 — Reaproveitar `aula_turma` (pedido do usuário), sem tabela nova.

### #186.1 — Coluna `bloqueio` em `aula_turma` e regra no banco

**Próximo passo:** ✅ entregue — nada a fazer.

- **Nível:** PESADO — banco (coluna, RLS, funções).
- **Critérios de aceitação:** coluna aplicada; só o professor grava; aula bloqueada na turma não
  libera a atividade para o aluno daquela turma; `docs/database.md` atualizado.
- **Decisão (2026-10-16):** o bloqueio por turma reaproveita o que já existe: um gatilho copia o
  bloqueio da aula para `atividade.bloqueio` (código da turma), então o RLS
  (`atividade_liberada_para_usuario`), os cards e o índice funcionam sem mudança. Liberar a aula
  não mexe nas atividades (igual ao bloqueio global). `data_aula` virou opcional.
- **Entrega:** `database/2026-10-16-aula-turma-bloqueio.sql` aplicado pelo conector;
  `docs/database.md` e `database/SEEDS-APLICADOS.md` atualizados.
- **Verificação:** teste em transação revertida: bloquear a aula 21 na turma 135080 pôs "135080" em
  `bloqueio` das 2 atividades dela; depois do rollback, 0 linhas bloqueadas e 0 atividades alteradas.

### #186.2 — Botão de bloqueio por turma na tela

**Próximo passo:** 👀 o usuário confere na atividade (como professor).

- **Nível:** MEDIO — tela com lógica (JS).
- **Critérios de aceitação:** professor bloqueia/desbloqueia a aula da turma escolhida; `node --check`.
- **Entrega:** botão 🔒/🔓 em cada aula da lista de datas (`assets/js/datas-aulas-turma.js`,
  `assets/css/datas-aulas-turma.css`); grava `aula_turma.bloqueio` (cria a linha se não existir; a
  linha sem data e sem bloqueio é removida). **Verificação:** `node --check`; linhas ≤ 100.

### #186.3 — Aceite do usuário

**Próximo passo:** 👀 o usuário confere.

- **Nível:** LEVE — só conferência do usuário.
