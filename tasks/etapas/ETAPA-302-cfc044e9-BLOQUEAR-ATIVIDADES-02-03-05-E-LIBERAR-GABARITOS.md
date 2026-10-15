## Etapa 302-cfc044e9 — Bloquear o preenchimento das atividades 02, 03 e 05 e liberar o botão "Liberar gabaritos"

**Tarefa:** #175-cfc044e9-2127-46f1-ad59-9c4733419417 · **Pedido em:** 2026-10-15 14:12 · **Executor:** Claude Code (local · main)
**Pedido:** "TEM ALUNO QUE N FEZ A ATIVIDADE, BLOQUEIE O PREENCHIMENTO DE TODOS DA ATIVIDADE ID= 02,03 E 05 E LIBERE O BOTAO DE NOME *LIBERAR GABARITOS*" (imagem do botão "🔓 Liberar gabaritos (turma 135081)", apagado).
**Objetivo:** encerrar o preenchimento das atividades de id 2, 3 e 5 para todos os alunos (inclusive quem não fez) e deixar o professor usar o botão "Liberar gabaritos" mesmo com alunos sem entrega.
**Próximo passo:** 175.3 — entender o bloqueio do preenchimento e a regra do botão.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 175.1 | Criar a TASK e a etapa no quadro (commit + push) | ✅ Concluído | 2026-10-15 14:12 | commit "criar #175" no remoto |
| 175.2 | Reservar a tarefa para a frente local · main (commit + push) | ✅ Concluído | 2026-10-15 14:13 | "Em uso por" preenchido no remoto |
| 175.3 | Entender como o preenchimento é bloqueado e quando o botão "Liberar gabaritos" fica ativo | 🔄 Em progresso | — | leitura do código e consulta ao banco |
| 175.4 | Plano na etapa + aprovação do usuário (mexe em banco) | ⬜ Pendente | — | "sim" do usuário registrado |
| 175.5 | Executar o plano aprovado | ⬜ Pendente | — | — |
| 175.6 | Encerrar: quadro, visualizador, 1 commit + push na `main` | ⬜ Pendente | — | `git push` sem erro |
| 175.7 | Aceite do usuário | ⬜ Pendente | — | — |
