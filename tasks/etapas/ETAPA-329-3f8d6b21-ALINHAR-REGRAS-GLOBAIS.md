## Etapa 329-3f8d6b21 — Alinhar as regras do aulasenai às regras globais (`rules-ai`)

**Tarefa:** #202-3f8d6b21 · **Pedido em:** 2026-10-16 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "C11 - rodar o graphify no início de toda conversa E ANALISAR O RELATÓRIO; C12 - SIM"
(alinhar as regras de cada projeto às decisões C1 a C11 de `C:\fontes\rules-ai\CONFLITOS.md`)
**Objetivo:** as regras do aulasenai deixam de contradizer o global onde o usuário já decidiu.

### Decisões

- **2026-10-16 — Gelvazio:** valem as decisões C1 a C11 do `rules-ai`. No aulasenai mudam: graphify
  (C11: roda **uma vez no início de cada conversa** e **analisa** o `GRAPH_REPORT.md`; hoje diz
  "só quando o usuário pedir"), navegador (C5: exceção quando o usuário liberar para uma
  subtarefa), ordem criar → publicar → assumir (C9) e ✅ movidas para `tasks/task_complete.md` (C4).
- **Já iguais ao global e não mudam:** frase final `TAREFA FINALIZADA E SINCRONIZADA!` (C1),
  nível "até o máximo do modelo" (C2), tabela "🧭 Frentes" (C3).
- **2026-10-16 — Claude Code (Sonnet 5.5):** tarefas só **abertas** aqui; a execução fica para a
  sessão do nível certo (cada subtarefa diz qual). Referência do global:
  `C:\fontes\rules-ai\regras\` (`graphify.md`, `ciclo-da-task.md`, `testes-validacao.md`,
  `quadro-de-tarefas.md`).

### 202.1 — `graphify.md` segue o global (C11)

**Próximo passo:** reescrever `.claude/rules/graphify.md` (hoje "só quando o usuário pedir") para:
rodar o graphify uma vez no início de cada conversa e analisar o `GRAPH_REPORT.md`; ajustar
`INDEX.md` e a linha de graphify do `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`pi.md` se existir.

- **Nível:** LEVE — textos em até 3 `.md` · **Modelo:** só Claude Code Haiku 5.5
- **Critérios de Aceitação:** nenhum arquivo do projeto ainda diz "graphify só quando o usuário pedir".
- **Entrega:** — · **Verificação:** —

### 202.2 — Exceção do navegador (C5)

**Próximo passo:** em `.claude/rules/testes-validacao.md`, acrescentar: exceção só quando o usuário
liberar **explicitamente** para uma subtarefa, registrada na seção dela.

- **Nível:** LEVE — 1 `.md` · **Modelo:** só Claude Code Haiku 5.5
- **Critérios de Aceitação:** texto igual em substância a `rules-ai/regras/testes-validacao.md`.
- **Entrega:** — · **Verificação:** —

### 202.3 — Ordem criar → publicar → assumir (C9)

**Próximo passo:** em `.claude/rules/tasks/ciclo-da-task.md`, trocar a ordem de abertura pela de
`rules-ai/regras/ciclo-da-task.md` ("Pedir confirmação só se for necessário").

- **Nível:** LEVE — 1 `.md` · **Modelo:** só Claude Code Haiku 5.5
- **Critérios de Aceitação:** a seção "Ordem de todo pedido" igual à do global.
- **Entrega:** — · **Verificação:** —

### 202.4 — ✅ movidas para `tasks/task_complete.md` (C4)

**Próximo passo:** escrever o plano nesta etapa (tarefa grande: mudança em massa em um quadro de 700
linhas, com 9 frentes ativas), mostrar ao usuário e esperar o "sim"; só então criar o
`task_complete.md`, mover as linhas ✅ do `STATUS.md`, ajustar `quadro.md`, `ciclo-da-task.md`,
`/entregar` e o gerador do visualizador (`scripts/regras/`) que lê o `STATUS.md`.

- **Nível:** PESADO — mudança em massa no quadro e nos geradores, mais de 3 arquivos ligados · **Modelo:** só Claude Code Opus 5.5 ou superior, ou Fable
- **Critérios de Aceitação:** `STATUS.md` só com tarefas abertas; o visualizador ainda lista tudo;
  ninguém perde reserva nem histórico durante a mudança (avisar as outras frentes por `RECADOS.md`).
- **Entrega:** — · **Verificação:** —

### 202.5 — Aceite do usuário

**Próximo passo:** o usuário confere as regras do aulasenai contra o global.

- **Nível:** — (👀 usuário)
