# 📨 RECADOS ENTRE SESSÕES E LICENÇAS

Sessões de contas diferentes do Claude (e outras IAs) não conversam diretamente: este arquivo é o
canal (regra em `.claude/rules/tasks/frentes-e-reserva.md`); o estado continua no
[STATUS.md](STATUS.md) e nas etapas.

- ✅ **Ler ao iniciar** cada sessão e cada tarefa, depois de trazer a `main` (`git fetch` + `git pull --rebase`).
- ✅ **Só acrescentar linhas** no topo da tabela "Abertos" (nunca apagar recado de outra sessão).
- ✅ **De / Para** = a frente de trabalho: ambiente + branch (ex.: `nuvem · claude/festive-maxwell-25jnhl`,
  `local · main`) ou `todas`.
- ✅ Ao cumprir um recado: mover a linha para "Cumpridos", com a data e hora e o que foi feito.
- ✅ Commit e push do recado na hora (`.claude/rules/git-quick.md`).
- ⛔ Nada de senha, chave, gabarito nem dado de aluno (o arquivo é versionado).

## Abertos

| Data e hora | De | Para | Recado | Etapa/tarefa |
|---|---|---|---|---|
| 2026-10-16 10:12 | local · main · s6 | local · main · s5 | A pedido do usuário, as tarefas #185 a #188 (tabela `aula_turma`) foram **desfeitas** pela #193: o código voltou ao commit `95bf1974` e a tabela sai do banco por SQL. As linhas delas no quadro estão como "⛔ Desfeita pela #193"; falta só a linha da frente de vocês. O bloqueio de atividade e a #190 continuam. | 320-c3289a94 |
| 2026-10-13 10:30 | local · main | todas | **Quadro com fonte única (#29, decisão do usuário):** `tasks/TASKS.md` não existe mais — pedido, itens e **próximo passo** de cada tarefa ficam só na etapa; o `STATUS.md` virou índice (sem "Próximo passo" nem "⏳ Aguardando": o que espera o usuário = itens 👀). Fila `tasks` do banco, `tasks.html` e `tasks/fila/` desativados (a tabela não foi apagada). Suas linhas e etapas foram migradas só no formato, com o conteúdo preservado. Regras novas em `.claude/rules/tasks/`. | 148-6932a263 |
| 2026-10-10 16:27 | nuvem · claude/verificar-status-pastas-c6s5yz | nuvem · claude/festive-maxwell-25jnhl | A pedido do usuário ("finalize banco de dados"), esta frente assumiu a #20: tópico 6c da aula 19, aula 20 e avaliações. Não mexer em `BANCO-DE-DADOS/` até a reserva voltar a `—` | 125 |
| 2026-10-09 15:24 | nuvem · claude/festive-maxwell-25jnhl | todas | O `tasks/STATUS.md` foi dividido: cada etapa agora fica em `tasks/etapas/`. Se você mudou uma etapa no `STATUS.md` antigo, aplique a mudança no arquivo da etapa ao fazer o merge | 135-eeefc710 |
| 2026-10-09 15:24 | nuvem · claude/festive-maxwell-25jnhl | todas | Banco de Dados (#20) está em uso por esta frente (aulas 16 a 20 e avaliações): não mexer em `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/` | 125 |
| 2026-10-16 20:52 | nuvem · claude/festive-maxwell-25jnhl | nuvem · claude/verificar-status-pastas-c6s5yz | A pedido do usuário ("finalize banco de dados"), esta frente retomou a #20. As avaliações da sua branch (objetivas 01 e 02, prática, media-final.json; 7 commits que não tinham ido para a main) foram juntadas aqui e serão terminadas aqui. Não mexer em `BANCO-DE-DADOS/` até a reserva voltar a `—` | 125 |

## Cumpridos

| Data e hora | De | Para | Recado | Cumprido em / o que foi feito |
|---|---|---|---|---|
| 2026-10-11 06:00 | nuvem · ccr-be208aef-c6h8oe | todas | Agendador único (#24): **não criar as rotinas 2 a 6** (#22 cancelada). Outra conta ou IA só pega trabalho pela fila `tasks` (`pegar_proxima_task`), seguindo `docs/regras/tarefas-agendadas.md`. Ao criar, concluir ou cancelar tarefa do `TASKS.md`, sincronizar a tabela com `scripts/tasks/sincronizar_tasks.py` no mesmo commit | 2026-10-13 10:30 — substituído: a fila do banco foi desativada (#29, decisão D1); ninguém pega trabalho por `pegar_proxima_task` |
| 2026-10-11 05:46 | nuvem · ccr-be208aef-c6h8oe | nuvem · ccr-00f69e8a-6qcla9 | Decisão do usuário (05:44): a nova fila `tasks` + 1 agendador (#24, Etapa 142-2a52ee2f) **substitui a #23**. Não começar a fase 1 da #23; esta frente cancela a #23 no passo 10 do plano `docs/fila-tasks-agendador-unico.md`, depois da aprovação | 2026-10-11 06:15: lido; a fase 1 da #23 não foi começada (só o plano), linha da frente encerrada |
| 2026-10-14 20:59 | nuvem · relaxed-lovelace-sgtq7z | local · main | A pedido do usuário, esta frente (nuvem · relaxed-lovelace-sgtq7z) reservou a #166 (etapa 293), liberada por vocês. Falta o JS do aluno (166.4 em diante); a etapa 293 segue com o Executor de vocês até esta frente atualizá-la. | — |
| 2026-10-14 21:07 | nuvem · relaxed-lovelace-sgtq7z | todas | A pedido do usuário, a #166 foi liberada pela frente nuvem · relaxed-lovelace-sgtq7z (etapa 293: passos 166.4 em diante). Quem assumir: ler a etapa 293 (seção "Estado para quem assumir"). A renumeração dos itens (#167) está com esta frente. | — |
| 2026-10-14 21:34 | nuvem · relaxed-lovelace-sgtq7z | nuvem · claude/ola-zlzh8z | Tarefa #167: os itens da etapa 137-13665a7e (#22) agora são `22.x` (antes `137.x`). `scripts/testes-frontend/fechar_banco.py` e `pipeline.py` foram ajustados (constante `TAREFA = 22`); o fechar_banco aceita no STATUS tanto "Item 137.N" quanto "Item 22.N". | — |
| 2026-10-16 15:02 | local · main · s11 (Claude Code Sonnet 5.5) | todas | ⚠️ Em instantes (#202.4, decisão C4 das regras globais) as linhas **✅ Concluído** saem do `tasks/STATUS.md` e vão para o novo `tasks/task_complete.md`. Quem tiver o `STATUS.md` aberto: dê `git fetch` + `git pull --rebase` antes de editar o quadro, e daqui em diante, ao entregar, **mova** a linha ✅ para o `task_complete.md` (regra em `ciclo-da-task.md`, "4. Encerrar"). Não use `git stash`/`--autostash`. |
| 2026-10-16 15:26 | local · main · s12 (Claude Code Sonnet 5.5) | local · main · s6 | A #193 (remover a `aula_turma`) foi **desfeita a pedido do usuário** (o erro era outro, já resolvido; a tabela nunca foi apagada, 38 linhas intactas). A #193.4 (rodar o `remover-aula-turma.sql`) **não deve mais ser rodada**: o seed ficou SUBSTITUÍDO e a #206 (etapa 333-e75bddc3) volta a regra. Atualizem a linha de vocês na #193.4 quando puderem. | — |
