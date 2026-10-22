## Etapa 471-7c1a4d93 — Aluno desistente some das listas

**Tarefa:** #342-7c1a4d93-5b2e-4f08-9a61-3d8e2c7f1b40 · **Pedido em:** 2026-10-22 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "ADICIONE 1 TAREFA PRA QUE AO MARCAR UM ALUNO COMO DESISTENTE EM
https://aulasenai.vercel.app/alunos.html, ELE NAO SEJA MAIS LISTADO EM ATIVIDADES, EQUIPES, ETC,
ADICIONE O BOTAO AO LADO DE *Editar* e antes de *Excluir*, com o nome *Desistente*"
**Objetivo:** o professor marca o aluno como desistente em `alunos.html` e ele deixa de aparecer
nas listas de atividades, equipes e demais telas, sem apagar o histórico dele.

### Escopo

- **Entra:** botão **Desistente** na linha do aluno em `alunos.html` (entre **Editar** e
  **Excluir**); marca gravada no banco (coluna nova em `usuario`, só o professor altera, com RLS);
  aluno desistente fora das listas de atividades, equipes, progresso da turma, sorteios e jogos.
- **Não entra:** apagar o aluno ou as respostas dele (o histórico fica); mudar nota; login do
  aluno desistente (decidir no plano: bloquear ou não).
- **Perguntas para o plano (#342.1):** o botão alterna (Desistente ↔ Reativar)? O desistente
  continua aparecendo em `alunos.html` (com selo) para poder reativar? Entra no relatório de notas?
  O login dele é bloqueado?

### Riscos

- Mexe em **banco** (coluna + RLS) e em várias telas: tarefa **grande**, plano aprovado antes.
- Esquecer uma lista deixa o desistente aparecendo: #342.5 faz o levantamento por busca no código.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-22 | Tarefa criada e publicada; 👀 aguarda o "sim" ao plano (#342.1) | Claude Code (Sonnet 5.5) | banco + várias telas |

### #342.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** levantar onde alunos são listados (grep em `assets/js` e páginas), responder as
perguntas do Escopo e pedir o "sim" ao usuário.

- **Nível:** PESADO — plano de tarefa com banco e segurança
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** fechar o desenho (coluna, política RLS, comportamento do botão, lista de telas) na
  própria etapa e registrar a aprovação nas Decisões.
- **Critérios de aceitação:** perguntas do Escopo respondidas; "sim" do usuário registrado.

### #342.2 — Banco: coluna de desistente em `usuario` e RLS

**Próximo passo:** aguardar #342.1.

- **Nível:** PESADO — SQL e RLS
- **Modelo:** só Opus 5.5+ ou Fable (Claude Code local, banco) — nunca outro
- **Effort:** high
- **Descrição:** `database/<data>-usuario-desistente.sql` idempotente (coluna `desistente BOOLEAN
  NOT NULL DEFAULT false`, data da marca); só professor altera; atualizar `docs/database.md` e o
  relatório HTML; seeds em dia.
- **Critérios de aceitação:** aluno não consegue marcar a si mesmo; consulta de conferência ok.

### #342.3 — Botão "Desistente" em `alunos.html`

**Próximo passo:** aguardar #342.2. Ler `docs/ORIENTACAO_*` do módulo antes de editar.

- **Nível:** MEDIO — tela, 1 a 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** botão entre **Editar** e **Excluir**, com confirmação, gravando a marca com o JWT
  do professor; selo visual no aluno desistente.
- **Critérios de aceitação:** ordem dos botões Editar · Desistente · Excluir; grava e recarrega.

### #342.4 — Desistente fora das listas de atividades e progresso

**Próximo passo:** aguardar #342.2.

- **Nível:** MEDIO — código com lógica
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** filtrar `desistente = false` nas listas de alunos de atividades, entrega,
  correção, progresso da turma, pendências e combos de aluno.
- **Critérios de aceitação:** `grep` mostra o filtro em todas as listas levantadas na #342.1.

### #342.5 — Desistente fora de equipes, sorteios e jogos

**Próximo passo:** aguardar #342.2.

- **Nível:** MEDIO — código com lógica
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** equipes (modal e tabela), sorteio de perguntas/equipes e jogos em sala não
  listam nem sorteiam desistente; equipe já formada com desistente é sinalizada ao professor.
- **Critérios de aceitação:** nenhum sorteio sorteia desistente; `node --check` ok.

### #342.6 — Documentação

**Próximo passo:** aguardar #342.3 a #342.5.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** orientação em `docs/` das telas alteradas e `docs/database.md` conferido.
- **Critérios de aceitação:** documentos citam a coluna e as telas filtradas.
