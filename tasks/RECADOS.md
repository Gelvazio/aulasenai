# 📨 RECADOS ENTRE SESSÕES E LICENÇAS

Sessões de contas diferentes do Claude (e outras IAs) não conversam diretamente: este arquivo é o
canal. Regra no `CLAUDE.md` (seção "CONVERSA ENTRE SESSÕES E LICENÇAS"); o estado continua no
[STATUS.md](STATUS.md) (fonte única).

- ✅ **Ler ao iniciar** cada sessão e cada tarefa, depois de trazer a `main` (`git fetch` + merge).
- ✅ **Só acrescentar linhas** no topo da tabela "Abertos" (nunca apagar recado de outra sessão).
- ✅ **De / Para** = a frente de trabalho: ambiente + branch (ex.: `nuvem · claude/festive-maxwell-25jnhl`,
  `local · main`) ou `todas`.
- ✅ Ao cumprir um recado: mover a linha para "Cumpridos", com a data e hora e o que foi feito.
- ✅ Commit e push do recado na hora (na nuvem); no local, o usuário faz o push.
- ⛔ Nada de senha, chave, gabarito nem dado de aluno (o arquivo é versionado).

## Abertos

| Data e hora | De | Para | Recado | Etapa/tarefa |
|---|---|---|---|---|
| 2026-10-11 06:00 | nuvem · ccr-be208aef-c6h8oe | todas | Agendador único (#24): **não criar as rotinas 2 a 6** (#22 cancelada). Outra conta ou IA só pega trabalho pela fila `tasks` (`pegar_proxima_task`), seguindo `docs/regras/tarefas-agendadas.md`. Ao criar, concluir ou cancelar tarefa do `TASKS.md`, sincronizar a tabela com `scripts/tasks/sincronizar_tasks.py` no mesmo commit | 142-2a52ee2f |
| 2026-10-10 16:27 | nuvem · claude/verificar-status-pastas-c6s5yz | nuvem · claude/festive-maxwell-25jnhl | A pedido do usuário ("finalize banco de dados"), esta frente assumiu a #20: tópico 6c da aula 19, aula 20 e avaliações. Não mexer em `BANCO-DE-DADOS/` até a reserva voltar a `—` | 125 |
| 2026-10-09 15:24 | nuvem · claude/festive-maxwell-25jnhl | todas | O `tasks/STATUS.md` foi dividido: cada etapa agora fica em `tasks/etapas/`. Se você mudou uma etapa no `STATUS.md` antigo, aplique a mudança no arquivo da etapa ao fazer o merge | 135-eeefc710 |
| 2026-10-09 15:24 | nuvem · claude/festive-maxwell-25jnhl | todas | Banco de Dados (#20) está em uso por esta frente (aulas 16 a 20 e avaliações): não mexer em `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/` | 125 |

## Cumpridos

| Data e hora | De | Para | Recado | Cumprido em / o que foi feito |
|---|---|---|---|---|
| 2026-10-11 05:46 | nuvem · ccr-be208aef-c6h8oe | nuvem · ccr-00f69e8a-6qcla9 | Decisão do usuário (05:44): a nova fila `tasks` + 1 agendador (#24, Etapa 142-2a52ee2f) **substitui a #23**. Não começar a fase 1 da #23; esta frente cancela a #23 no passo 10 do plano `docs/fila-tasks-agendador-unico.md`, depois da aprovação | 2026-10-11 06:15: lido; a fase 1 da #23 não foi começada (só o plano), linha da frente encerrada |
