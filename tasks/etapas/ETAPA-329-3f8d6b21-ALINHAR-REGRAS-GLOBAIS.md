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

**Próximo passo:** nenhum — concluída.

- **Nível:** LEVE — textos em até 3 `.md` · **Modelo:** só Claude Code Haiku 5.5
- **Critérios de Aceitação:** nenhum arquivo do projeto ainda diz "graphify só quando o usuário pedir".
- **Entrega:** commit `feat(#202.1)` · **Verificação:** busca em `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `pi.md` e `.claude/rules/`: nenhum "só quando o usuário pedir"; `graphify.md` e a linha do `INDEX.md` seguem a regra global C11. Feita por Claude Code (Sonnet 5.5) (local · main), com IA_SEM_TRAVA=1 a pedido do usuário ("SIM"), 2026-10-16.

### 202.2 — Exceção do navegador (C5)

**Próximo passo:** nenhum — concluída.

- **Nível:** LEVE — 1 `.md` · **Modelo:** só Claude Code Haiku 5.5
- **Critérios de Aceitação:** texto igual em substância a `rules-ai/regras/testes-validacao.md`.
- **Entrega:** commit `feat(#202.2)` · **Verificação:** leitura: `testes-validacao.md` traz a exceção do navegador só com liberação explícita do usuário, igual a `rules-ai/regras/testes-validacao.md`. Feita por Claude Code (Sonnet 5.5) (local · main · s11), com IA_SEM_TRAVA=1 a pedido do usuário ("SIM"), 2026-10-16.

### 202.3 — Ordem criar → publicar → assumir (C9)

**Próximo passo:** nenhum — concluída.

- **Nível:** LEVE — 1 `.md` · **Modelo:** só Claude Code Haiku 5.5
- **Critérios de Aceitação:** a seção "Ordem de todo pedido" igual à do global.
- **Entrega:** commit `feat(#202.3)` · **Verificação:** leitura: a seção "1. Abrir: criar → publicar → assumir → trabalhar" de `ciclo-da-task.md` ficou igual à do global (`rules-ai/regras/ciclo-da-task.md`). Feita por Claude Code (Sonnet 5.5) (local · main · s11), com IA_SEM_TRAVA=1 a pedido do usuário ("SIM"), 2026-10-16.

### 202.4 — ✅ movidas para `tasks/task_complete.md` (C4)

**Próximo passo:** nenhum — concluída.

- **Nível:** PESADO — mudança em massa no quadro e nos geradores, mais de 3 arquivos ligados · **Modelo:** só Claude Code Opus 5.5 ou superior, ou Fable
- **Critérios de Aceitação:** `STATUS.md` só com tarefas abertas; o visualizador ainda lista tudo;
  ninguém perde reserva nem histórico durante a mudança (avisar as outras frentes por `RECADOS.md`).
- **Entrega:** commit `feat(#202.4)` · **Verificação:** plano aprovado pelo usuário ("SIM"); `task_complete.md` criado com as 43 linhas ✅ (nenhuma perdida: o leitor do visualizador lê os dois arquivos e continua com 266 tarefas e as mesmas contagens por situação); `STATUS.md` ficou só com abertas; visualizador regenerado; `quadro.md`, `ciclo-da-task.md`, `/entregar` e `auditor-quadro` ajustados; recado às frentes em `RECADOS.md`. Feita por Claude Code (Sonnet 5.5) (local · main · s11), com IA_SEM_TRAVA=1 a pedido do usuário ("SIM"), 2026-10-16.

### 202.5 — Aceite do usuário

**Próximo passo:** nenhum — concluída.

- **Nível:** — (usuário) · **Aceite:** Gelvazio, 2026-10-16: "Aceito o alinhamento (ALINHAR.6 e #202.5)."
- **Entrega:** commit `docs(board)` do aceite · **Verificação:** #202.1 a #202.4 ✅ no `task_complete.md`.
