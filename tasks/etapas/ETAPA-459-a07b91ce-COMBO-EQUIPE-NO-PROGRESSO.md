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

### #330.1 — Levantamento e plano: equipes da aula e quadro de progresso

**Próximo passo:** achar o quadro de progresso da página, como as equipes da aula/atividade e o
líder são lidos (`assets/js/equipes-*.js`, RLS) e escrever o plano nesta etapa.

- **Nível:** PESADO — dados das equipes de vários alunos e RLS; na dúvida sobe
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** levantamento (arquivos, dados das equipes e do líder) e plano da
  #330.2 nesta etapa; banco, se precisar, vira subtarefa do Claude Code local.
- **Entrega:** — · **Verificação:** —

### #330.2 — Combo "Equipe" acima do quadro de progresso

**Próximo passo:** esperar a #330.1.

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
