## Etapa 466-310c16b7 — Vercel sem deploy quando só o quadro muda

**Tarefa:** #337-310c16b7-99d9-4ebc-8daf-0f1a4e485414 · **Pedido em:** 2026-10-21 19:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s35)
**Pedido:** "tem como nao mandar pra vercel estas mudancas do quadro de tarefas?" … "faça"
**Objetivo:** push que só muda `tasks/` não gera deploy na Vercel, para o Deployment Storage
(12,07 GB de 10 GB no plano gratuito) parar de crescer com os commits de reserva e de quadro.

### #337.1 — `ignoreCommand` no `vercel.json`

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — configuração com comando git (lógica de comparação), 1 arquivo
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** acrescentar ao `vercel.json` a chave `ignoreCommand` =
  `git diff --quiet ${VERCEL_GIT_PREVIOUS_SHA:-HEAD^} HEAD -- . ':(exclude)tasks/'`
  (código 0 = só `tasks/` mudou → deploy cancelado; 1 ou erro → deploy normal). Compara com o
  último deploy que deu certo, para um push com vários commits não perder código. `.claude/` não
  entra na exclusão (o `.claude/rules/index.html` é aberto pelo menu Regras do site).
- **Critérios de aceitação:** `vercel.json` válido (JSON); `headers` sem mudança.
- **Executor:** Claude Code (Sonnet · executor-medio) (local · main · s35), líder Opus 5.5
- **Entrega:** —
- **Verificação:** —
