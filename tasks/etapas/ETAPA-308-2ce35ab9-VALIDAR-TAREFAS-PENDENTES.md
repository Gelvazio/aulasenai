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

**Próximo passo:** 👀 usuário aprovar o critério e a lista abaixo; depois a #181.2 e a #181.3 podem começar.

- **Nível:** LEVE — só ler o quadro e as etapas e escrever a lista.
- **Descrição:** para cada tarefa 👀 (aceite, aceites ou liberação): número, título, pedido em
  1 linha e o **tipo**: `documentação/regra`, `tela` (HTML/CSS/JS) ou `banco/segurança`.
- **Critérios de aceitação:** todas as 👀 listadas; tipo de cada uma; dúvida de tipo = o mais
  pesado; aprovação do critério registrada nas Decisões.
- **Entrega:** lista nesta seção · **Verificação:** linhas 👀 contadas com `awk`/`grep` no `STATUS.md` sincronizado com a `main`.

**Lista (2026-10-16 23:05, por Claude Code (Sonnet 5.5) s17):** 15 linhas com 👀 em "📌 Tarefas"
(as demais frentes citadas em "🧭 Frentes" — #212.4, #211.5, #220.2, #219.2 a #213.2, #210.3 —
já não têm linha 👀 no quadro). Critério: dúvida de tipo = o mais pesado.

| Tarefa | Pedido em 1 linha | Tipo | Observação |
|---|---|---|---|
| #2 | Apostilas só em Markdown, sem arquivos redundantes | documentação/regra | 👀 é aprovação do plano (nada feito ainda) |
| #4 | Cronograma semanal/aula (`PLANO-AULAS.md`) em 8 disciplinas | documentação/regra | 👀 é liberação (não iniciada) |
| #5 | Exercícios práticos por tópico em `ATIVIDADES/` | documentação/regra | 👀 é liberação (depende da #25) |
| #6 | Provas e trabalhos em `AVALIACOES/` | documentação/regra | 👀 é liberação (não iniciada) |
| #7 | Rodar `analise-materias.py` e gerar relatório final | documentação/regra | 👀 é liberação (a #19 pode cobrir) |
| #17 | Fechar a revisão das regras do `CLAUDE.md` (aceites 17.22, 17.30, 17.14) | documentação/regra | aceites reais |
| #223 / #223.4 | "Gere a apostila de banco de dados" | documentação/regra | aceite real |
| #190 (etapa 317) | Botões de bloquear atividade com problema | tela | aceite real; linha do quadro está quebrada (linhas 175–176 do `STATUS.md`) |
| #36 | Questões até o mínimo: Testes de Front-End, demais aulas | banco/segurança | 👀 aceite; `PESADO` |
| #193 | Voltar como estava antes da `aula_turma` (código e banco) | banco/segurança | aceite real |
| #199.1 | Botão Exportar Meu Gabarito não aparece na atividade 152 | banco/segurança | mexe com gabarito; `PESADO` |
| #209.7 | Remover do Supabase o storage `slides` | banco/segurança | depende do usuário apagar o bucket |
| #221 / #221.2 | Dois cards da Aula 06 com o mesmo id | banco/segurança | aguarda "sim" para o `UPDATE` |

**Resumo por tipo:** documentação/regra 7 (para a #181.2), tela 1 (para a #181.3), banco/segurança
5 (para a #181.4, só Claude Code local). Aprovação do critério pelo usuário: 👀 pendente.

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
