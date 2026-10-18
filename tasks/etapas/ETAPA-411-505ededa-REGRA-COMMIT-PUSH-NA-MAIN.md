## Etapa 411-505ededa — #282: Regra explícita do commit + push na `main` ao finalizar tarefa

**Tarefa:** #282 · **Pedido em:** 2026-10-18 19:39 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "faça commit e push direto na main, sempre ao finalizar 1 tarefa,anote isso nas regras
globais do projeto"
**Objetivo:** deixar explícito, nas regras globais do projeto (`AGENTS.md` e
`.claude/rules/git-quick.md`), que **toda** tarefa termina com **1 commit + push direto na `main`**,
na hora da entrega, sem esperar pedido nem autorização — a mesma regra já existia em resumo
(`AGENTS.md`, regra 4); o pedido é para gravar isso de forma explícita e no histórico das regras.

### Escopo

- **Entra:** `AGENTS.md` (regra 4), `.claude/rules/git-quick.md` e a linha nova no
  `docs/HISTORICO-REGRAS.md`; visualizador regenerado.
- **Não entra:** mudar o fluxo de git em si (continua proibido `--force`, `git add .`, `git merge` e
  branch paralela) e as regras globais do `rules-ai` (fonte de fora do projeto).
- **Pronto quando:** as duas regras do projeto dizem, em palavras claras, que o fim de **qualquer**
  tarefa é commit + push na `main`, e o histórico tem a linha da mudança.

### #282.1 — Anotar a regra em `AGENTS.md` e no `git-quick.md`

**Próximo passo:** editar os 3 arquivos de regra e regenerar o visualizador.

- **Nível:** LEVE — só `.md` de regras e o histórico; sem código.
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash — nunca outro
- **Descrição:** (1) `AGENTS.md`, regra 4: acrescentar o item explícito — ao finalizar **qualquer**
  tarefa, de qualquer IA, fazer **commit e push direto na `main`** na hora da entrega, sem esperar
  pedido, sem pedir autorização e sem deixar para depois; (2) `.claude/rules/git-quick.md`: bullet
  novo reforçando a mesma regra e o "1 commit + push, sem exceção" na tabela "Quando commitar";
  (3) `docs/HISTORICO-REGRAS.md`: linha nova no topo da tabela.
- **Critérios de aceitação:** `AGENTS.md` e `git-quick.md` dizem a regra de forma explícita (não só
  resumida); histórico com a linha; nada mais do projeto muda.
- **Verificação:** leitura dos 3 arquivos; `grep` pela frase nova nos dois arquivos de regra;
  visualizador regenerado sem erro.
- **Entrega:** — · **Anotação:** —
