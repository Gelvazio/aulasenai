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
- **Em aberto (👀 usuário):** para o aluno, entregue com nota abaixo da mínima conta como
  pendente (como no professor) ou entregue já basta para ficar verde?

### #325.1 — Levantamento e plano: cores dos cards para o aluno

**Próximo passo:** 👀 esperar a resposta do usuário sobre a nota abaixo da mínima; gravar em
Decisões e entregar a #325.1 (levantamento e plano já escritos acima).

- **Nível:** PESADO — o que o aluno vê e os dados dele (RLS, entregas por aluno), na dúvida sobe
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** levantamento (arquivos, regra das cores, dados usados) e plano
  das próximas subtarefas nesta etapa; o aluno vê só a situação **dele**, nunca a de outros.
- **Entrega:** — · **Verificação:** —

### #325.2 — Mostrar as cores de situação nos cards para o aluno

**Próximo passo:** esperar a #325.1.

- **Nível:** MEDIO — JS de tela, até 3 arquivos (reclassificar na #325.1 se precisar de banco)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** aluno logado vê alerta nas atividades pendentes e verde nas
  entregues, só com os dados dele; `node --check` ok; conferir na tela (usuário).
- **Entrega:** — · **Verificação:** —

### #325.3 — Documentação das cores dos cards para o aluno

**Próximo passo:** esperar a #325.2.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Entrega:** — · **Verificação:** —
