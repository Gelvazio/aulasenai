## Etapa 308-2ce35ab9 — Validar todas as tarefas pendentes do quadro

**Tarefa:** #181-2ce35ab9-f9b4-4e04-a831-fc611a9ccff7 · **Pedido em:** 2026-10-15 17:08 · **Criada por:** Claude Code (Opus 5.5) (local · main · s3)
**Pedido:** "tem como vc criar uma task, que valida todas as tasks pendentes? coloque ela com
status urgente" — "e no projeto aulas senai"
**Ajuste do pedido (2026-10-15):** "esta task 181, deve validar as tarefas que tem aceite
pendente, mas que ja foram feitas, ou seja, ela deve verificar se o que foi pedido na task, foi
efetivamente feito"
**Objetivo:** para cada tarefa com **aceite pendente** (👀 Aguardando aceite/aceites/liberação),
conferir se o que foi **pedido** está **efetivamente feito** no projeto, para o usuário dar os
aceites sabendo o que está pronto e o que faltou.

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
| Muitas tarefas para uma sessão só | Dividida por tipo em subtarefas com nível (#182): cada IA pega a parte do seu nível |
| Conflito com outras frentes editando o quadro | Sincronizar antes de cada subtarefa; um commit por subtarefa |
| Dar como feito algo que não está | Só marcar ✅ Feito com a prova (arquivo e linha, commit ou consulta) anotada |

### Decisões

| Data | Decisão | Quem |
|---|---|---|
| 2026-10-15 | Prioridade 🔴 Máxima ("status urgente") | Gelvazio |
| 2026-10-15 | Foco: só as tarefas com aceite pendente; conferir se o pedido foi feito | Gelvazio |
| 2026-10-15 | Dividida em subtarefas por tipo, cada uma com nível (piloto da #182) | Gelvazio (aprovou o plano da #182) |

### #181.1 — Listar as tarefas com aceite pendente e separar por tipo

**Próximo passo:** ler as linhas 👀 do `tasks/STATUS.md` e o **Pedido** de cada etapa; montar a
lista nesta seção e pedir ao usuário a aprovação do critério de conferência.

- **Nível:** LEVE — só ler o quadro e as etapas e escrever a lista.
- **Descrição:** para cada tarefa 👀 (aceite, aceites ou liberação): número, título, pedido em
  1 linha e o **tipo**: `documentação/regra`, `tela` (HTML/CSS/JS) ou `banco/segurança`.
- **Critérios de aceitação:** todas as 👀 listadas; tipo de cada uma; dúvida de tipo = o mais
  pesado; aprovação do critério registrada nas Decisões.
- **Entrega:** — · **Verificação:** —

### #181.2 — Conferir as tarefas de documentação e regras

**Próximo passo:** aguardando a #181.1.

- **Nível:** LEVE — só ler `.md` e comparar com o pedido.
- **Descrição:** para cada tarefa do tipo `documentação/regra` da lista: o arquivo tem o que foi
  pedido? Anotar na etapa da tarefa: ✅ Feito, ⚠️ Parcial (o que falta) ou ❌ Não feito, com a prova.
- **Entrega:** — · **Verificação:** —

### #181.3 — Conferir as tarefas de telas (HTML, CSS e JS)

**Próximo passo:** aguardando a #181.1.

- **Nível:** MEDIO — ler e entender código de telas.
- **Descrição:** para cada tarefa do tipo `tela`: o código faz o que o pedido diz? Mesmo resultado
  e prova da #181.2; o que só dá para ver na tela vira "conferir na tela" (sem navegador).
- **Entrega:** — · **Verificação:** —

### #181.4 — Conferir as tarefas de banco e segurança

**Próximo passo:** aguardando a #181.1.

- **Nível:** PESADO — banco, RLS e gabarito; só o Claude Code **local** (acesso ao banco).
- **Descrição:** para cada tarefa do tipo `banco/segurança`: o banco (só consulta) e o código
  batem com o pedido? Mesmo resultado e prova da #181.2. ⛔ Nada de aplicar SQL.
- **Entrega:** — · **Verificação:** —

### #181.5 — Relatório final

**Próximo passo:** aguardando a #181.2, a #181.3 e a #181.4.

- **Nível:** MEDIO — juntar e conferir os resultados das três conferências.
- **Descrição:** nesta seção, três listas: **prontas para o aceite**, **parciais** (o que falta)
  e **não feitas**; o que faltar vira tarefa nova (com nível).
- **Entrega:** — · **Verificação:** —

### #181.6 — Aceite do usuário

**Próximo passo:** 👀 o usuário lê o relatório da #181.5.
