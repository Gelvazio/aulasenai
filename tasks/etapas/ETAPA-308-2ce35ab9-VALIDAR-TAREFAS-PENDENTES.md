## Etapa 308-2ce35ab9 — Validar todas as tarefas pendentes do quadro

**Tarefa:** #181-2ce35ab9-f9b4-4e04-a831-fc611a9ccff7 · **Pedido em:** 2026-10-15 17:08 · **Executor:** — (livre; criada por Claude Code (Opus 5.5) (local · main · s3))
**Pedido:** "tem como vc criar uma task, que valida todas as tasks pendentes? coloque ela com
status urgente" — "e no projeto aulas senai"
**Ajuste do pedido (2026-10-15):** "esta task 181, deve validar as tarefas que tem aceite
pendente, mas que ja foram feitas, ou seja, ela deve verificar se o que foi pedido na task, foi
efetivamente feito"
**Objetivo:** para cada tarefa com **aceite pendente** (👀 Aguardando aceite/aceites/liberação),
conferir se o que foi **pedido** está **efetivamente feito** no projeto, para o usuário dar os
aceites sabendo o que está pronto e o que faltou.
**Próximo passo:** 181.1 — quem assumir lista as tarefas 👀 com o pedido de cada uma e pede a
aprovação do usuário para o critério de conferência (tarefa grande: muitas tarefas).

### Escopo

- **Entra:** todas as linhas de "📌 Tarefas" com 👀 de aceite (hoje cerca de 76). Para cada uma:
  ler o **Pedido** (palavras do usuário) e os itens da etapa; conferir **no código, nos arquivos
  e nos commits** se cada parte do pedido foi feita (não basta o item estar ✅ na etapa);
  anotar na etapa da tarefa o resultado com a prova: **✅ Feito** (pronta para o aceite),
  **⚠️ Parcial** (o que falta) ou **❌ Não feito**.
- **Parcial ou não feito:** anotar o que falta na etapa da tarefa e avisar no relatório; a
  correção vira tarefa nova (não é feita dentro da #181).
- **Não entra:** dar o aceite no lugar do usuário (👀 continua 👀 até ele confirmar); validar as
  tarefas ⬜ Pendentes ou 🔄 Em execução; mexer em reserva de outra frente; mudar prioridade;
  aplicar algo no banco (conferir o banco só por consulta, pelo Claude Code local).
- **Sem navegador:** o que só dá para ver na tela entra como "conferir na tela" no relatório.

### Riscos

| Risco | Plano B |
|---|---|
| Muitas tarefas para uma sessão só | Dividir por faixa de números (ex.: #27–#100, #101–#140, #141–#180), um item por faixa |
| Conflito com outras frentes editando o quadro | Sincronizar antes de cada faixa; um commit pequeno por faixa |
| Dar como feito algo que não está | Só marcar ✅ Feito com a prova (arquivo e linha, commit ou consulta) anotada |

### Decisões

| Data | Decisão | Quem |
|---|---|---|
| 2026-10-15 | Prioridade 🔴 Máxima ("status urgente") | Gelvazio |
| 2026-10-15 | Foco: só as tarefas com aceite pendente; conferir se o pedido foi feito | Gelvazio |

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 181.1 | Listar as tarefas 👀 com o pedido de cada uma, dividir em faixas e pedir aprovação do critério | ⬜ Pendente | — | — |
| 181.2 | Conferir a 1ª faixa: pedido × código/commits, resultado anotado em cada etapa | ⬜ Pendente | — | — |
| 181.3 | Conferir a 2ª faixa | ⬜ Pendente | — | — |
| 181.4 | Conferir a 3ª faixa | ⬜ Pendente | — | — |
| 181.5 | Relatório: prontas para o aceite, parciais (o que falta) e não feitas | ⬜ Pendente | — | — |
| 181.6 | Aceite do usuário | ⬜ Pendente | — | — |
