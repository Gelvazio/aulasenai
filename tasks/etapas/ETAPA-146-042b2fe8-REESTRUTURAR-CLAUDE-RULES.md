## Etapa 146-042b2fe8 — Reestruturar `.claude/rules/` (pedido em 2026-10-13 09:44)

**Tarefa:** #27-042b2fe8-a9f7-4726
**Próximo passo:** 27.7 — aceite do usuário.

**Objetivo:** regras sem duplicação nem contradição, todo arquivo ≤ 5 KB.
**Plano:** [docs/reestruturar-claude-rules.md](../../docs/reestruturar-claude-rules.md)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 27.1 | Ler os 22 arquivos e montar o diagnóstico e o plano | ✅ Concluído | 2026-10-13 09:44 | Plano em docs/ |
| 27.2 | Aprovação do plano e das decisões pelo usuário | ✅ Concluído | 2026-10-13 09:50 | Decisões: agents-* adaptar e enxugar em multiplas-ias.md; nuvem = só main; ajustar AGENTS.md e CLAUDE.md |
| 27.3 | Criar os arquivos novos (≤ 5 KB) | ✅ Concluído | 2026-10-13 09:49 | `wc -c`: maior arquivo 3,3 KB; total 101 KB → 35 KB |
| 27.4 | Tratar `agents-*` e corrigir contradições | ✅ Concluído | 2026-10-13 09:49 | 11 `agents-*` → `multiplas-ias.md`; push/nuvem/Co-Authored-By/worktree unificados; infográficos removidos a pedido |
| 27.5 | Refazer INDEX, apontar AGENTS/CLAUDE, apagar substituídos | ✅ Concluído | 2026-10-13 09:49 | grep: nenhuma referência a arquivo apagado |
| 27.6 | Commit + push + quadro | ✅ Concluído | 2026-10-13 09:49 | — |
| 27.8 | Remover a regra de infográficos também do `CLAUDE.md` global (`~/.claude/CLAUDE.md`), a pedido do usuário | ✅ Concluído | 2026-10-13 09:50 | grep "infogr" = 0 no arquivo global; backup em %TEMP% |
| 27.7 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
