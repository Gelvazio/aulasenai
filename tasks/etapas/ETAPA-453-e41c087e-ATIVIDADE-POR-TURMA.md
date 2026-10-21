## Etapa 453-e41c087e — Atividade ligada às turmas; excluir só na turma atual

**Tarefa:** #324-e41c087e-cd62-4347-8a4f-26e1b7254a7f · **Pedido em:** 2026-10-21 12:49 · **Criada por:** Claude Code (Opus 5.5) (nuvem · clever-edison-o722i5)
**Pedido:** "crie 1 tarefa para: faça a exclusão da atividade valer só pra turma atual, e ficar
ligada nas turmas e nao somente na aula, ao carregar a atividade no card, ja esta sendo pego
apenas as atividades da turma atual selecionada?" → "deve ter esta ligacao aqui: aula, x
atividade x materia x turma ?"
**Objetivo:** a atividade passa a ser ligada a aula × matéria × turma; excluir no card apaga só
na turma do combo, e o card mostra só as atividades da turma escolhida.

### Situação de hoje (levantada em 2026-10-21)

- `atividade` liga só à aula (`atividade.aula_id → aulas.id`; a matéria vem de
  `aulas.materia_id`). Não existe tabela atividade × turma.
- Excluir (`excluirAtividadeDaAulaCard`, `assets/js/indice-aula-repositorio.js`, e
  `excluirAtividadeCrud`, `assets/js/atividades-crud-repositorio.js`) faz `DELETE` na linha da
  atividade: some de **todas** as turmas, com gabarito, respostas e entregas em cascata.
- O card **não filtra pela turma**: `listarAtividadesDaAulaCard` (modal da aula, por `aula_id`)
  e `buscarAtividadesDasAulasCard` (botões do card, `aula_id` + `ativo`). A única separação por
  turma é o `atividade.bloqueio` (lista de turmas) no RLS
  (`atividade_liberada_para_usuario`), que esconde do **aluno**; o professor vê todas.
- Padrão parecido já existe para a aula: `aula_turma` (`aula_id`, `materia_id` copiada da aula
  por gatilho, `turma_codigo`, `data_aula`, `bloqueio`) — `docs/database.md`.

### Escopo (a confirmar no plano — #324.1)

- **Entra (proposta):** tabela nova de vínculo **aula × atividade × matéria × turma** (ex.:
  `aula_atividade_turma`: `aula_id`, `atividade_id`, `materia_id`, `turma_codigo`; única em
  atividade + turma; `materia_id` copiada da aula por gatilho, como na `aula_turma`), com RLS;
  carga inicial das atividades existentes; excluir no card = só na turma do combo; card e modal
  listam só as atividades da turma do combo; cadastro de atividade grava o vínculo.
- **Decidir com o usuário no plano:** substituir ou manter o `atividade.bloqueio`; ao excluir
  na turma, apagar ou manter as respostas e entregas dos alunos daquela turma; quando a
  atividade sai de todas as turmas, apagar de vez ou não; atividade nova entra em todas as
  turmas da matéria (`turma_materia`) ou só na do combo; o que o aluno vê (só as da turma dele).
- **Não entra:** mudar a hierarquia `curso → materia → aulas → atividade`; notas já lançadas.

### Riscos

- Banco de produção (tabela nova, RLS, carga) → tarefa grande: plano + aprovação; SQL
  idempotente.
- Atividade sumir para uma turma por carga incompleta → carga inicial liga toda atividade às
  turmas da matéria (`turma_materia`) e confere a contagem antes de mudar a tela.
- Exclusão apagar respostas de outra turma → a função de excluir filtra pela turma.

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 12:49 | O vínculo é aula × atividade × matéria × turma (tabela própria) | Usuário |

### #324.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** ler `docs/database.md` (`aula_turma`, `atividade.bloqueio`), fechar as
decisões em aberto e mostrar o plano ao usuário.

- **Nível:** PESADO — banco, RLS e arquitetura do vínculo
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** plano nesta etapa (escopo, decisões, SQL previsto, arquivos,
  verificação) e "sim" do usuário registrado em Decisões.
- **Entrega:** — · **Verificação:** —

### #324.2 — Banco: tabela do vínculo, RLS, carga inicial e "excluir na turma"

**Próximo passo:** esperar a #324.1.

- **Nível:** PESADO — SQL, RLS e carga em produção
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro (banco só local)
- **Critérios de aceitação:** SQL idempotente em `database/`, aplicado e registrado; RLS
  (professor da turma grava; aluno só lê as da turma dele); carga conferida por contagem.
- **Entrega:** — · **Verificação:** —

### #324.3 — Card e modal da aula: só as atividades da turma do combo; excluir só nela

**Próximo passo:** esperar a #324.2.

- **Nível:** MEDIO — JS de tela, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `indice-aula-repositorio.js`, `indice-aula-modal.js`,
  `indice-aula-atividades-vinculadas.js`.
- **Critérios de aceitação:** card e modal listam pela turma do combo; 🗑️ apaga só o vínculo
  da turma (mensagem de confirmação diz a turma); `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #324.4 — Cadastro de atividades: excluir na turma e gravar o vínculo ao criar

**Próximo passo:** esperar a #324.2.

- **Nível:** MEDIO — JS de tela, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `atividades-crud-repositorio.js` e `atividades-crud-modal.js`.
- **Critérios de aceitação:** atividade nova ganha o vínculo conforme a decisão da #324.1;
  excluir apaga só na turma; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #324.5 — Documentação do vínculo atividade × turma

**Próximo passo:** esperar a #324.3 e a #324.4.

- **Nível:** LEVE — só `.md`/relatório
- **Modelo:** só Haiku — nunca outro
- **Descrição:** `docs/database.md` (+ `docs/relatorio_verificacao_database.html`),
  `docs/regras/atividades.md`.
- **Entrega:** — · **Verificação:** —
