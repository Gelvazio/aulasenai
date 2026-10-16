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

**Próximo passo:** ler como `aulas.ativo` é conferido (RLS, trigger, funções) e criar a coluna.

- **Nível:** PESADO — banco (coluna, RLS, funções).
- **Critérios de aceitação:** coluna aplicada; só o professor grava; aula bloqueada na turma não
  libera a atividade para o aluno daquela turma; `docs/database.md` atualizado.

### #186.2 — Botão de bloqueio por turma na tela

**Próximo passo:** depois da #186.1.

- **Nível:** MEDIO — tela com lógica (JS).
- **Critérios de aceitação:** professor bloqueia/desbloqueia a aula da turma escolhida; `node --check`.

### #186.3 — Aceite do usuário

**Próximo passo:** 👀 o usuário confere.

- **Nível:** LEVE — só conferência do usuário.
