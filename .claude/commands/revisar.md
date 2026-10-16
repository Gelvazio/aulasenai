---
description: Revisa o diff atual contra as regras do projeto (SOLID, limites, RLS/JWT, gabarito)
argument-hint: "[arquivo ou commit, opcional]"
---

Revise as mudanças de **$ARGUMENTS** (vazio = `git diff` + `git diff --cached` da tarefa atual).

Use o subagente `revisor-codigo` e, se o diff mexer em login, Supabase, RLS, chaves ou gabarito,
também o `auditor-seguranca`. Conferir contra:

1. `.claude/rules/codigo-solid.md` e `.claude/rules/codigo-limites-nomes.md` (arquivo ≤ 1000
   linhas, função ≤ 45, linha ≤ 100, JSDoc, constantes nomeadas, nomes em português).
2. `.claude/rules/security-banco.md` (JWT do usuário, nada de service_role no site, gabarito fora
   da página e do `localStorage`).
3. A orientação em `docs/` de cada arquivo alterado (`.claude/rules/docs-antes-de-editar.md`).

Resposta: tabela `Arquivo:linha | Regra | Problema | Correção`, só com problemas reais. Sem
problemas → "Revisão sem achados". Não alterar arquivos.
