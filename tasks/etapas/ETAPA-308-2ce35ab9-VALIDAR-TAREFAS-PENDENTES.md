## Etapa 308-2ce35ab9 — Validar todas as tarefas pendentes do quadro

**Tarefa:** #181-2ce35ab9-f9b4-4e04-a831-fc611a9ccff7 · **Pedido em:** 2026-10-15 17:08 · **Executor:** — (livre; criada por Claude Code (Opus 5.5) (local · main · s3))
**Pedido:** "tem como vc criar uma task, que valida todas as tasks pendentes? coloque ela com
status urgente" — "e no projeto aulas senai"
**Objetivo:** deixar o `tasks/STATUS.md` fiel ao que foi feito: cada tarefa aberta (⬜, 🔄, 👀)
conferida contra a etapa, os arquivos e os commits, para ninguém refazer o que já está pronto nem
pular o que falta.
**Próximo passo:** 181.1 — quem assumir escreve o plano abaixo em detalhe e pede a aprovação do
usuário (tarefa grande: mexe no quadro em massa).

### Escopo

- **Entra:** todas as linhas de "📌 Tarefas" que não estão ✅ nem ⛔ (hoje cerca de 166). Para
  cada uma: a etapa existe e o link funciona; o status da linha bate com os itens da etapa; os
  commits citados existem; o que a etapa diz entregue está mesmo no código; reservas (🔄) paradas
  ou de frentes encerradas; dependências que já estão ✅; linhas da frente (🧭) desatualizadas.
- **Corrigir no quadro:** status e próximo passo que estiverem errados (com a evidência na
  etapa). Reserva de outra frente **não** se mexe: vai para a lista de decisões do usuário.
- **Não entra:** executar as tarefas pendentes; dar aceite no lugar do usuário (👀 continua 👀);
  mudar prioridade; mexer no banco.

### Riscos

| Risco | Plano B |
|---|---|
| Muitas linhas para uma sessão só | Dividir por faixa de números (ex.: #1–#60, #61–#120, #121–#181), um item por faixa |
| Conflito com outras frentes editando o `STATUS.md` | Sincronizar antes de cada faixa; cada correção num commit pequeno |
| Concluir por engano algo que não está pronto | Só mudar o status com evidência (commit ou arquivo) anotada na etapa da tarefa |

### Decisões

| Data | Decisão | Quem |
|---|---|---|
| 2026-10-15 | Prioridade 🔴 Máxima ("status urgente") | Gelvazio |

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 181.1 | Detalhar o plano (critérios e faixas) e pedir aprovação ao usuário | ⬜ Pendente | — | — |
| 181.2 | Validar as tarefas ⬜ Pendentes | ⬜ Pendente | — | — |
| 181.3 | Validar as tarefas 🔄 Em execução (reservas paradas, frentes encerradas) | ⬜ Pendente | — | — |
| 181.4 | Validar as tarefas 👀 Aguardando (aceite e liberação): conferir se a entrega existe | ⬜ Pendente | — | — |
| 181.5 | Relatório final: o que foi corrigido e a lista do que depende do usuário | ⬜ Pendente | — | — |
| 181.6 | Aceite do usuário | ⬜ Pendente | — | — |
