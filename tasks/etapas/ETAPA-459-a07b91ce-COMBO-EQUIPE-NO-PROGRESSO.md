## Etapa 459-a07b91ce — Combo "Equipe" no quadro de progresso (PESQUISA INTERNET da ITIC)

**Tarefa:** #330-a07b91ce-511c-4647-8347-5ff04aae37f2 · **Pedido em:** 2026-10-21 14:35 · **Criada por:** Claude Code (Opus 5.5) (nuvem · elegant-planck-ul8ac1)
**Pedido:** "QUANDO A ATIVIDADE ESTIVER NUMA EQUIPE, ADICIONE 1 COMBO EM CIMA, PRA SELECIONAR A
EQUIPE, LA NO QUADRO DE PROGRESSO, PRA VER O PROGRESSO, APENAS DO LIDER DA EQUIPE, SE
SELECIONAR EQUIPE=TODAS-DEVE LISTAR AS TAREFAS DE TODOS, PESQUISE AS EQUIPES DA AULA, QUE ESTAO
COM ATIVIDADE RELACIONADA, FAÇA APENAS AQUI AGORA, E DEPOIS FAÇA 1 TAREFA PRA APLICAR ISSO EM
TODOS AS ATIVIDADES QUE HOUVER EQUIPES" — página
`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-PESQUISA-INTERNET.html`
**Objetivo:** no quadro de progresso dessa atividade em equipe, um combo "Equipe" (acima do
quadro) mostra só o progresso do líder da equipe escolhida; "Todas" lista todos, como hoje.

### Situação de hoje (levantada em 2026-10-21 14:37)

- O quadro é o **Progresso da turma GLOBAL** (`assets/js/progresso-turma-global.js`, só professor),
  aberto pela `avaliacao-discursiva.js`. Os combos "Aluno" e "Turma" são módulos à parte
  (`filtro-aluno-progresso.js`, `alunos-da-turma-progresso.js`); cada filtro entra em
  `estadoProgressoGlobal.filtrosDaLista` (`{ filtrar(alunos) }`) e o redesenho é
  `estadoProgressoGlobal.atualizarAgora()`.
- `progresso-turma-global.js` já tem **1000 linhas** (limite): não recebe código novo.
- Equipes: `equipe` (turma + matéria), `equipe_membro` (`aluno_id`, `lider` 1 = líder, 1 por
  equipe) e `equipe_atividade` (`equipe_id`, `atividade_id`, `respondente_id`). RLS: o
  **professor da turma** lê as três (`docs/database.md`). `aluno_id` = id do aluno no quadro.

### Plano (#330.2, sem banco)

- Módulo novo `assets/js/filtro-equipe-progresso.js`, incluído **só** na
  `ATIVIDADE-PESQUISA-INTERNET.html` (a #331 leva para todas). Espera o painel
  `.progresso-turma` existir (só o professor o recebe; sem painel, não faz nada).
- Lê as equipes ligadas à atividade (`equipe_atividade` da atividade → `equipe` → líder em
  `equipe_membro` com `lider = 1`; sem líder marcado, usa o `respondente_id`), com o JWT (sbGet).
- Combo **"Equipe:"** no alto do painel, ao lado dos outros combos: "Todas" (padrão, lista
  todos) + uma opção por equipe ("Equipe X — líder Fulano"), só das equipes da turma do combo
  "Turma" (todas, se "Todas as turmas"). Equipe escolhida → só a linha do líder.
- Entra como filtro em `estadoProgressoGlobal.filtrosDaLista` e redesenha com
  `atualizarAgora()`. Nada é gravado. Sem equipe ligada à atividade → o combo não aparece.
- Arquivos: `assets/js/filtro-equipe-progresso.js` (novo) e a página da atividade (1 `<script>`).

### #330.1 — Levantamento e plano: equipes da aula e quadro de progresso

**Próximo passo:** — (concluída)

- **Nível:** PESADO — dados das equipes de vários alunos e RLS; na dúvida sobe
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** levantamento (arquivos, dados das equipes e do líder) e plano da
  #330.2 nesta etapa; banco, se precisar, vira subtarefa do Claude Code local.
- **Entrega:** levantamento e plano acima · **Verificação:** leitura de `progresso-turma-global.js`, `filtro-aluno-progresso.js`, `alunos-da-turma-progresso.js`, `equipes-repositorio.js` e `docs/database.md` (RLS das equipes); sem banco

### #330.2 — Combo "Equipe" acima do quadro de progresso

**Próximo passo:** criar `filtro-equipe-progresso.js` conforme o plano e incluí-lo na página.

- **Nível:** MEDIO — JS de tela, até 3 arquivos (reclassificar na #330.1 se precisar de banco)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** só nesta atividade; combo com "Todas" + as equipes da aula ligadas
  à atividade; equipe escolhida → quadro só com a linha do líder; "Todas" → todos;
  `node --check` ok; conferir na tela (usuário).
- **Entrega:** — · **Verificação:** —

### #330.3 — Documentação do combo "Equipe" no progresso

**Próximo passo:** esperar a #330.2.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
