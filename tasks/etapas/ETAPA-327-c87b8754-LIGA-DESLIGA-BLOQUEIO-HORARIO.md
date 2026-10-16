## Etapa 327-c87b8754 — Professor liga/desliga o bloqueio de horário da entrega de atividade

**Tarefa:** #200-c87b8754-5ef1-46a8-8987-1e689eba9a6a · **Pedido em:** 2026-10-16 11:20 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "CRIE 1 TAREFA QUE O PROFESSOR LIGA E DESLIGA , PRA BLOQUEAR HORA DE ENTREGA DE
ATIVIDADE, SE LIGADO, N DEIXA FAZER ATIVIDADE FORA DA HORA,SE DESLIGADO,NAO BLOQUEIA NADA"
**Objetivo:** um botão **ON/OFF** do professor para o bloqueio de horário: **ligado**, o aluno
só faz e entrega a atividade dentro do horário da turma (como hoje); **desligado**, o horário
não bloqueia nada.

### Escopo

- **Entra:** coluna nova `turma.bloquear_horario` (boolean, padrão `true` = como hoje); função
  `definir_bloqueio_horario_turma(codigo, ligado)` só do professor da turma; a função
  `horario_da_turma_do_aluno()` passa a tratar turma com o bloqueio **desligado** como "dentro
  do horário" — assim o RLS (`pode_responder_no_horario`) e os avisos das páginas (objetivas e
  discursivas) seguem sozinhos, sem mexer em cada página; botão **ON/OFF "Bloquear horário"**
  ao lado do horário da turma, na tela do professor que já define o horário
  (`assets/js/respostas-atividade-professor.js` + `assets/js/turma-horario.js`); `docs/database.md`
  e `docs/relatorio_verificacao_database.html`.
- **Não entra:** mudar o horário em si, a liberação por aluno (`atividade_liberada_fora_horario`)
  e o bloqueio de aula/atividade (`atividade.bloqueio`).
- **Critério de pronto:** ligado, aluno fora do horário não grava nem entrega (o banco recusa);
  desligado, grava e entrega a qualquer hora; só o professor da turma muda; aceite do usuário.

### Riscos

- Desligar vale também para as **avaliações** (hoje sempre seguem o horário). Plano B: se o
  usuário quiser, as avaliações continuam presas ao horário mesmo desligado.
- Erro no SQL trava a gravação dos alunos. Plano B: SQL idempotente, conferido por consulta
  antes e depois; o padrão `true` mantém tudo como está até o professor desligar.

### Decisões

- 2026-10-16 11:20 — Tarefa criada **sem reserva**: a frente `local · main · s6` já está com a
  #199.1 (1 subtarefa por frente).

### #200.1 — Plano na etapa e aprovação do usuário

**Próximo passo:** 👀 aguardando o "sim" do usuário ao plano (ON/OFF **por turma**, ao lado do
horário, valendo também para as avaliações).

- **Nível:** PESADO — banco (coluna/função), RLS e permissão só do professor.
- **O que já existe (levantamento de 2026-10-16 11:20):** horário por turma (`turma.horario`)
  e as funções `dentro_do_horario_da_turma()`, `pode_responder_no_horario(id)` e
  `liberar_fora_horario(...)` (`docs/database.md`), usadas pelas objetivas e pelas
  discursivas (`explicarHorarioDiscursiva` em `assets/js/respostas-discursivas-banco.js`). A
  liberação por aluno (`atividade.atividade_liberada_fora_horario`) continua.
- **Critérios de aceitação:** plano aprovado pelo usuário (registrado em Decisões).

### #200.2 — Executar o ON/OFF (banco + telas)

**Próximo passo:** depois da #200.1, dividir em subtarefas (SQL, tela do professor, páginas).

- **Nível:** PESADO — SQL, RLS e funções do banco (só Claude Code local).
- **Critérios de aceitação:** só o professor liga/desliga (garantido por RLS/função); ligado,
  o aluno fora do horário não grava nem entrega; desligado, grava e entrega a qualquer hora.

### #200.3 — Aceite do usuário

**Próximo passo:** 👀 depois da #200.2, o usuário confere ligado e desligado.
