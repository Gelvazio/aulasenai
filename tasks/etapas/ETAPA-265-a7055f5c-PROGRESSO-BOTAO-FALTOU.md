## Etapa 265-a7055f5c — Progresso da Turma: ON/OFF "Faltou" por aluno e ON/OFF para listar quem faltou

**Tarefa:** #138-a7055f5c-d630-4712-997b · **Pedido em:** 2026-10-14 15:46 · **Executor:** Claude Code (local · main)
**Pedido:** "ADICIONE 1 BOTAO EM CIMA DO TIPO ON/OFF PRA LISTAR OU NAO ALUNO QUE FALTOU E AO LADO DE CADA ALUNO ADICIONE UM BOTAO DO TIPO ON/OFF DE NOME FALTOU?"
**Objetivo:** o professor marcar no Progresso da Turma quem faltou e poder esconder ou mostrar esses alunos na lista.
**Levantamento (2026-10-14 15:47):** o banco não tem tabela nem coluna de falta/presença — o "faltou" precisa de tabela nova (tarefa grande: plano + aprovação).
**Respostas (2026-10-14 15:59):** "Faltou" vale **por dia de aula** (a falta na data aparece em todas as atividades daquele dia); o ON/OFF de cima abre em **OFF (esconde quem faltou)**; quem faltou **entra nas contas** (resumo, Gráficos e Cálculo Nota seguem com a turma toda).
**Levantamento:** data do dia = `atividade.data_atividade` (atividade 81 = 2026-10-09); 49 de 147 atividades estão sem essa data (decidir no plano: usar `aulas.data_planejada`). RLS no padrão da `minimo_questoes_aluno` (`eh_professor()` + `professor_pode_ver_aluno(aluno_id)`).
**Pausada (2026-10-14 15:59, pedido do usuário):** "REGISTRE A TAREFA APENAS AGORA E DEPOIS PEGUE ELA" — reserva liberada.
**Próximo passo:** 265.2 — escrever o plano na etapa (tabela nova de falta por aluno e data, RLS, ON/OFF no Progresso) e pedir aprovação.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 265.1 | Levantar no banco onde gravar "faltou" + detalhes com o usuário | ✅ Concluído | 2026-10-14 15:59 | Consulta ao banco (sem tabela de falta) + respostas acima |
| 265.2 | Plano (mexe no banco = tarefa grande) + aprovação | ⬜ Pendente | — | — |
| 265.3 | Aceite do usuário | ⬜ Pendente | — | — |
