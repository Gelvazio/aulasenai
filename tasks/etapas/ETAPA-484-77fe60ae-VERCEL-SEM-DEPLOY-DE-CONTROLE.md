## Etapa 484-77fe60ae — VERCEL-SEM-DEPLOY-DE-CONTROLE: `tasks/` e `rules-local/` nunca geram deploy (C46)

**Tarefa:** VERCEL-SEM-DEPLOY-DE-CONTROLE · **Pedido em:** 2026-10-22 07:24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · rules-ai)
**Pedido:** regra global C46 do `rules-ai` (etapa 034-932f56d2, subtarefa `.2` "Aplicar no `aulasenai`"): "rules-local/ TAMBEM DEVE SER REMOVIDO SEMPRE, NUNCA DEVE IR PRO DEPLOY DA NUVEM" e "ESTA TAREFA AQUI, 337 colocou o ignoreCommand no vercel.json, TAMBEM DEVE VALER PRA TODOS OS PROJETOS".
**Objetivo:** push que só muda `tasks/` ou `rules-local/` não gera deploy na Vercel, e `rules-local/` nunca vai ao site (a #337 já cobria só o `tasks/`).

### Escopo

- **Entra:** `vercel.json` (acrescentar `':(exclude)rules-local/'` ao `ignoreCommand`), `.vercelignore` (linha `rules-local/`), esta etapa e o quadro.
- **Não entra:** `.claude/` e demais pastas (o `.claude/rules/index.html` é aberto pelo site); apagar deploys antigos; mudar o plano da Vercel; o resto do `vercel.json` (`headers`).

### Riscos

- `VERCEL_GIT_PREVIOUS_SHA` vazio no 1º deploy: o comando cai em `HEAD^`; se falhar, o deploy segue (falha para o lado seguro).
- O `.vercelignore` pode não valer em deploy por Git: conferir se `/rules-local/VERSAO.md` do site dá 404; se der 200, o `ignoreCommand` continua valendo e o risco vira nova tarefa.

### Decisões

- 2026-10-23: aplicação feita por Claude Code (Sonnet 5.5) (local · main · rules-ai) a pedido do líder da subtarefa `VERCEL-SEM-DEPLOY-DE-CONTROLE.2` do `rules-ai`; o commit, o push e a conferência na Vercel ficam a cargo do Haiku e do líder.

### VERCEL-SEM-DEPLOY-DE-CONTROLE.1 — `ignoreCommand` e `.vercelignore` com `rules-local/`

**Próximo passo:** ✅ arquivos prontos em 2026-10-23; falta commit/push e conferir na Vercel (R4 e R5, feitos pelo líder do `rules-ai`).

- **Nível:** MEDIO — configuração de 2 arquivos, com lógica de comparação
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** o `ignoreCommand` ficou `git diff --quiet ${VERCEL_GIT_PREVIOUS_SHA:-HEAD^} HEAD -- . ':(exclude)tasks/' ':(exclude)rules-local/'` e o `.vercelignore` ganhou `rules-local/`.
- **Critérios de aceitação:** `vercel.json` é JSON válido com os dois `':(exclude)...'`; `rules-local/` no `.vercelignore`; comando padrão dá código 0 em commit só de `tasks/`/`rules-local/` e 1 em commit com outro arquivo.
- **Entrega:** `vercel.json`, `.vercelignore` e esta etapa/quadro no commit desta entrega (a cargo do Haiku) · **Verificação:** `JSON.parse` do `vercel.json` ok; `git diff` só com a linha do `ignoreCommand` e as 2 linhas novas do `.vercelignore`; `git diff --quiet` do comando padrão: código 0 no commit `725e717e` (só `rules-local/`) e código 1 no `94310bde` (código de login). Conferência na Vercel (R4/R5) fica na subtarefa `.2` do `rules-ai`.
- **JEV-AI-SUGGESTION:** NAO
