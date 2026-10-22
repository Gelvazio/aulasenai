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
| 2026-10-22 07:45 | Marca por turma (`turmaaluno`), não por usuário; #342.4 sobe para PESADO (16 arquivos) | Claude Code (Opus 5.5) (s36) | `alunos.html` lista vínculos; regra de níveis |
| 2026-10-22 07:46 | **Plano aprovado** ("Sim, aprovo o plano da #342. Execute.") | Usuário (registrado por Claude Code (Opus 5.5) (s36)) | aprovação de tarefa grande |

### Plano (#342.1, 2026-10-22, Claude Code (Opus 5.5) (local · main · s36))

**Respostas às perguntas do Escopo (propostas, valem com o "sim"):**

| Pergunta | Resposta proposta |
|---|---|
| O botão alterna? | Sim: **Desistente** marca; no aluno já marcado o botão vira **Reativar**. Os dois pedem confirmação. |
| O desistente continua em `alunos.html`? | Sim, com o selo **DESISTENTE** e a linha esmaecida, para poder reativar. É a única tela onde ele aparece. |
| Entra no relatório de notas e na média final? | Não: some de todas as listas (progresso, pendências, correção, respostas, relatório, média final, equipes, votação, sorteio). As respostas antigas ficam no banco; ao reativar, ele volta a aparecer com tudo. |
| O login é bloqueado? | Não: o aluno pode estar em outra turma. A desistência vale **por turma** (vínculo). |

**Desenho (fonte única = vínculo aluno × turma):**

- `alunos.html` lista **vínculos** (`turmaaluno`), não usuários. Por isso a marca fica em
  `turmaaluno`: `desistente boolean not null default false`, `desistente_em timestamptz`,
  `desistente_por uuid`.
- As telas antigas leem a tabela `aluno` (turma principal, copiada da `turmaaluno` pelo trigger
  `sincronizar_turma_principal_aluno`). O mesmo trigger passa a gravar `aluno.desistente` = o
  aluno não tem **nenhum** vínculo ativo. A turma principal passa a ser escolhida entre os vínculos
  ativos. Assim as telas que leem `aluno` só precisam de `desistente=eq.false`.
- Gravação só por função `definir_desistente(p_vinculo bigint, p_desistente boolean)`
  (`security definer`, só professor da turma pela `professor_tem_turma`, ou administrador). O
  aluno não altera a coluna (RLS da `turmaaluno` já só deixa professor gravar; conferir).
- Funções do banco que listam alunos da turma passam a ignorar vínculo desistente:
  `alunos_da_turma_lider`, `alunos_sem_entrega_turma`, `atividades_pendentes_turma`,
  `sugestoes_turmaaluno`, `equipe_membro_preparar` (recusa desistente em equipe nova),
  `votacoes_abertas_aluno`, `votar_equipe`, `aluno_lider_da_turma`, `definir_lider_turma`,
  `definir_lider_usuario` (não pode ser líder). Conferir cada uma no SQL antes de mudar.
- Script `database/2026-10-22-turmaaluno-desistente.sql`, idempotente, sem apagar nada.

**Telas (JS) que listam alunos e ganham o filtro** (levantadas por `grep`; #342.4 confere de novo):
`alunos-da-turma-progresso`, `filtro-aluno-progresso`, `progresso-turma-fontes`,
`alunos-sem-inicio-entrega`, `avaliacao-media-final(-professor)`, `correcao-discursiva-repositorio`,
`finalizar-atividade-professor`, `painel-professor`, `relatorio-atividades-dados`,
`respostas-aluno-professor`, `respostas-atividade-banco`, `respostas-atividade-professor`,
`respostas-discursivas-banco`, `suspeita-copia-discursiva`, `indice-log-alternativas`,
`aula-turma-repositorio` (todos em `assets/js/`); equipes: `equipes-repositorio`.

**Verificação:** consultas de conferência no banco (marcar e desmarcar um vínculo de teste e ver as
funções); `node --check` em todo JS alterado; `grep` mostra o filtro em todas as listas. A tela
(botão, selo) o usuário confere no navegador.

### #342.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** — (concluída)

- **Nível:** PESADO — plano de tarefa com banco e segurança
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** fechar o desenho (coluna, política RLS, comportamento do botão, lista de telas) na
  própria etapa e registrar a aprovação nas Decisões.
- **Critérios de aceitação:** perguntas do Escopo respondidas; "sim" do usuário registrado.
- **Entrega:** seção Plano desta etapa (commits `afae46e0`, `ddc255a5`) · **Verificação:** usuário aprovou em 2026-10-22 07:46

### #342.2 — Banco: coluna de desistente em `turmaaluno`, função e filtros

**Próximo passo:** — (concluída)

- **Nível:** PESADO — SQL e RLS
- **Modelo:** só Opus 5.5+ ou Fable (Claude Code local, banco) — nunca outro
- **Effort:** high
- **Descrição:** `database/2026-10-22-turmaaluno-desistente.sql` como no Plano (colunas, trigger
  de sincronização, `definir_desistente`, funções de lista); `docs/database.md` e o relatório HTML.
- **Critérios de aceitação:** aluno não consegue marcar a si mesmo; consulta de conferência ok.
- **Entrega:** `database/2026-10-22-turmaaluno-desistente.sql` aplicado (migração
  `turmaaluno_desistente`, 2026-10-22); `docs/database.md` e `docs/relatorio_verificacao_database.html`
  com a seção "aluno desistente por turma".
- **Verificação:** consulta: 4 colunas, `definir_desistente` e o gatilho existem; 11 funções com
  `turmaaluno` + `desistente`; teste num bloco desfeito (`raise`): marcar o único vínculo de um aluno
  → `aluno.desistente = true`, carimbo gravado; reativar → `false`. `definir_desistente` só para
  `authenticated` e recusa quem não é professor da turma (`eh_professor` + `professor_tem_turma`).

### #342.3 — Botão "Desistente" em `alunos.html`

**Próximo passo:** executor-medio: botão em `assets/js/turmas-aluno-pagina.js` e chamada `definir_desistente` em `turmas-aluno-repositorio.js`.

- **Nível:** MEDIO — tela, 1 a 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** botão entre **Editar** e **Excluir**, com confirmação, gravando a marca com o JWT
  do professor; selo visual no aluno desistente.
- **Critérios de aceitação:** ordem dos botões Editar · Desistente · Excluir; grava e recarrega.

### #342.4 — Desistente fora das listas de atividades e progresso

**Próximo passo:** aguardar #342.2.

- **Nível:** PESADO — mais de 3 arquivos ligados (cerca de 16 telas)
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
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
