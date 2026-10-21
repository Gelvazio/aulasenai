## Etapa 454-b1b3200c — Cores de alerta e verde dos cards também para o aluno

**Tarefa:** #325-b1b3200c-21ab-4b2c-84c6-b8d8db0da7e5 · **Pedido em:** 2026-10-21 12:57 · **Criada por:** Claude Code (Opus 5.5) (nuvem · elegant-planck-ul8ac1)
**Pedido:** "ANALISE OS CARDS, AS CORES, DE ALERTA, VERDE, DEVEM APARECER PARA OS ALUNOS
TAMBEM,PRA ELES SABER O QUE ESTA PENDENTE" → "CRIE ESTA TAREFA, PUBLIQUE NO QUADRO DE TAREFAS
E ASSUMA"
**Objetivo:** o aluno vê nos cards das aulas as mesmas cores de situação (alerta = pendente,
verde = feito) que o professor vê, para saber o que falta entregar.

### Situação de hoje (levantada em 2026-10-21)

- **Card inteiro (vermelho piscando / verde fixo) — só professor** (#293):
  `assets/js/indice-atividades-pendentes.js` + `assets/css/indice-atividades-pendentes.css`,
  carregados por `carregarAlertaPendentes` em `assets/js/atividades-crud-modal.js` só no caminho
  do professor. Dados da RPC `atividades_pendentes_turma` (contagem da turma inteira; aluno
  recebe 0 linhas). Regra em `docs/regras/atividades.md` ("Alerta de atividade pendente").
- **Botões de cada atividade — já para o aluno** (#283): `assets/js/indice-atividades-feitas.js`
  pinta o botão de verde claro (entregue), amarelo (começou e não entregou) ou vermelho fraco
  piscando (não fez), com as próprias respostas/entregas lidas por RLS. O **card** do aluno não
  ganha cor.

### Plano (proposto)

- O card do **aluno** usa as mesmas classes do professor (`card-atividade-pendente` /
  `card-atividade-concluida`), calculadas **só com os dados dele** já lidos no
  `indice-atividades-feitas.js`: vermelho piscando se alguma atividade do card não foi
  entregue; verde fixo se todas foram entregues. Sem banco (o RLS já devolve só o que é dele).
- Arquivos (#325.2): `indice-atividades-feitas.js` e `atividades-crud-modal.js` (carregar o
  CSS das cores também para o aluno); `indice-atividades-pendentes.js` não muda (continua do
  professor).
- Nota abaixo da mínima **não** conta para o aluno: entregou = verde (decisão de 13:03).

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 13:03 | Para o aluno, basta ter entregado para a atividade contar como feita (card verde); nota abaixo da mínima não deixa o card vermelho | Usuário ("BASTA TER ENTREGADO PARA FICAR VERDE") |

### #325.1 — Levantamento e plano: cores dos cards para o aluno

**Próximo passo:** — (concluída)

- **Nível:** PESADO — o que o aluno vê e os dados dele (RLS, entregas por aluno), na dúvida sobe
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** levantamento (arquivos, regra das cores, dados usados) e plano
  das próximas subtarefas nesta etapa; o aluno vê só a situação **dele**, nunca a de outros.
- **Entrega:** levantamento, plano e decisão nesta etapa (commits `f1b002f` e o da entrega) · **Verificação:** arquivos lidos (`indice-atividades-pendentes.js`, `indice-atividades-feitas.js`, `atividades-crud-modal.js`, RPC `atividades_pendentes_turma`); plano sem banco

### #325.2 — Mostrar as cores de situação nos cards para o aluno

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — JS de tela, até 3 arquivos (reclassificar na #325.1 se precisar de banco)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** aluno logado vê alerta nas atividades pendentes e verde nas
  entregues, só com os dados dele; `node --check` ok; conferir na tela (usuário).
- **Executor:** Claude Code (Sonnet · executor-medio) (nuvem · elegant-planck-ul8ac1), líder Opus 5.5
- **Entrega:** `assets/js/indice-atividades-feitas.js` (`pintarCardSituacaoFeitas`: card do aluno
  verde se entregou todas as atividades cadastradas do card, vermelho piscando se falta alguma,
  sem cor se não há; aviso para leitor de tela) e `assets/js/atividades-crud-modal.js` (carrega
  `css/indice-atividades-pendentes.css` também para o aluno, sem o script do professor) — 2026-10-21 13:56
- **Verificação:** `node --check` ok nos 2 arquivos; diff conferido pelo líder (só os 2 arquivos;
  código novo só no caminho do ALUNO; atividades bloqueadas não entram porque o RLS não as
  devolve). Conferir na tela (usuário): card verde/vermelho para o aluno e professor igual.

### #325.3 — Documentação das cores dos cards para o aluno

**Próximo passo:** — (concluída)

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Executor:** Claude Code (Haiku · executor-leve) (nuvem · elegant-planck-ul8ac1), líder Opus 5.5
- **Entrega:** `docs/regras/atividades.md`, seção "Alerta de atividade pendente nos cards —
  professor e aluno": bloco "Para o aluno (#325)" com as cores, a regra (entregou = verde) e os
  arquivos — 2026-10-21 13:57
- **Verificação:** diff conferido pelo líder (só a seção do alerta; texto bate com o código da
  #325.2).
