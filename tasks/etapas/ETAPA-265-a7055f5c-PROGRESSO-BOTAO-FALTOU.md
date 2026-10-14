## Etapa 265-a7055f5c — Progresso da Turma: ON/OFF "Faltou" por aluno e ON/OFF para listar quem faltou

**Tarefa:** #138-a7055f5c-d630-4712-997b · **Pedido em:** 2026-10-14 15:46 · **Executor:** Claude Code (local · main)
**Pedido:** "ADICIONE 1 BOTAO EM CIMA DO TIPO ON/OFF PRA LISTAR OU NAO ALUNO QUE FALTOU E AO LADO DE CADA ALUNO ADICIONE UM BOTAO DO TIPO ON/OFF DE NOME FALTOU?"
**Objetivo:** o professor marcar no Progresso da Turma quem faltou e poder esconder ou mostrar esses alunos na lista.
**Levantamento (2026-10-14 15:47):** o banco não tem tabela nem coluna de falta/presença — o "faltou" precisa de tabela nova (tarefa grande: plano + aprovação).
**Respostas (2026-10-14 15:59):** "Faltou" vale **por dia de aula** (a falta na data aparece em todas as atividades daquele dia); o ON/OFF de cima abre em **OFF (esconde quem faltou)**; quem faltou **entra nas contas** (resumo, Gráficos e Cálculo Nota seguem com a turma toda).
**Levantamento:** data do dia = `atividade.data_atividade` (atividade 81 = 2026-10-09); 49 de 147 atividades estão sem essa data (decidir no plano: usar `aulas.data_planejada`). RLS no padrão da `minimo_questoes_aluno` (`eh_professor()` + `professor_pode_ver_aluno(aluno_id)`).
**Pausada (2026-10-14 15:59, pedido do usuário):** "REGISTRE A TAREFA APENAS AGORA E DEPOIS PEGUE ELA" — reserva liberada.
**Retomada (2026-10-14 16:04):** reservada de novo pela frente local · main ("faça a tarefa 138").
**Próximo passo:** 265.6 — usuário abrir o Progresso da Turma de uma atividade como professor, marcar "Faltou?" e ligar/desligar "Mostrar quem faltou".

### Escopo

- **Entra:** tabela nova `falta_aluno` (aluno + dia) com RLS; no Progresso da Turma (objetiva,
  prática e discursiva): ON/OFF **"Faltou?"** ao lado do nome de cada aluno e ON/OFF
  **"Mostrar quem faltou"** em cima (abre em OFF = esconde quem faltou); regra em
  `docs/regras/atividades.md` e `docs/database.md` (+ relatório HTML).
- **Não entra:** lista de presença (`lista-presenca.js`), notas e contas (resumo, Gráficos e
  Cálculo Nota seguem com a turma toda), página do aluno.

### Plano

1. **Banco** (`database/2026-10-14-falta-aluno.sql`, idempotente, pelo ciclo de seeds):
   `falta_aluno (aluno_id uuid → aluno.id on delete cascade, data date, marcada_em timestamptz
   default now(), marcada_por uuid default auth.uid(), primary key (aluno_id, data))`; RLS igual à
   `minimo_questoes_aluno`: ler = o próprio aluno ou `professor_pode_ver_aluno(aluno_id)`;
   gravar/apagar = `eh_professor()` e `professor_pode_ver_aluno(aluno_id)`.
2. **Dia da atividade:** `atividade.data_atividade`; sem ela, `aulas.data_planejada` da aula
   (hoje: 98 com data, 47 só com a da aula, 2 sem nenhuma → nessas 2 os botões ficam desligados
   com o aviso "atividade sem data").
3. **Front:** módulo novo `assets/js/falta-aluno-progresso.js` (ler as faltas do dia, ON/OFF do
   aluno grava/apaga a linha, ON/OFF de cima filtra a lista) + CSS; `progresso-turma-global.js`
   só liga o módulo (como o filtro "Questões respondidas"); falha no módulo não derruba o painel.

### Riscos

- Atividade com data errada → a falta cai no dia errado. Plano B: corrigir a data da atividade
  (a falta segue o dia, não a atividade).
- Leitura a cada 5 s fica um pouco maior (1 consulta a mais, só as faltas do dia).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 265.1 | Levantar no banco onde gravar "faltou" + detalhes com o usuário | ✅ Concluído | 2026-10-14 15:59 | Consulta ao banco (sem tabela de falta) + respostas acima |
| 265.2 | Plano (mexe no banco = tarefa grande) + aprovação | ✅ Concluído | 2026-10-14 16:20 | Usuário aprovou no chat ("sim") |
| 265.3 | SQL `falta_aluno` + RLS aplicado e conferido | ✅ Concluído | 2026-10-14 16:35 | Aplicado pelo conector; policies select/insert/delete + RLS ligado, `anon` sem acesso; teste em transação desfeita: professor da turma grava e lê 1 falta, aluno não grava (0) |
| 265.4 | Módulo `falta-aluno-progresso.js` + CSS + ligação no `progresso-turma-global.js` | ✅ Concluído | 2026-10-14 16:35 | `node --check` nos 2 JS; linhas ≤ 100; falha no módulo não derruba o painel |
| 265.5 | Regras e `docs/database.md` atualizados | ✅ Concluído | 2026-10-14 16:35 | `docs/regras/atividades.md`, `docs/database.md` e relatório HTML |
| 265.6 | Aceite do usuário (testar no navegador como professor) | 👀 Aguardando o usuário | — | — |
