## Etapa 146-042b2fe8 — Reestruturar `.claude/rules/` (pedido em 2026-10-13 12:44)

**Objetivo:** regras sem duplicação nem contradição, todo arquivo ≤ 5 KB.
**Plano:** [docs/reestruturar-claude-rules.md](../../docs/reestruturar-claude-rules.md)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 146.1 | Ler os 22 arquivos e montar o diagnóstico e o plano | ✅ Concluído | 2026-10-13 12:44 | Plano em docs/ |
| 146.2 | Aprovação do plano e das decisões pelo usuário | ✅ Concluído | 2026-10-13 12:50 | Decisões: agents-* adaptar e enxugar em multiplas-ias.md; nuvem = só main; ajustar AGENTS.md e CLAUDE.md |
| 146.3 | Criar os arquivos novos (≤ 5 KB) | ✅ Concluído | 2026-10-13 12:49 | `wc -c`: maior arquivo 3,3 KB; total 101 KB → 35 KB |
| 146.4 | Tratar `agents-*` e corrigir contradições | ✅ Concluído | 2026-10-13 12:49 | 11 `agents-*` → `multiplas-ias.md`; push/nuvem/Co-Authored-By/worktree unificados; infográficos removidos a pedido |
| 146.5 | Refazer INDEX, apontar AGENTS/CLAUDE, apagar substituídos | ✅ Concluído | 2026-10-13 12:49 | grep: nenhuma referência a arquivo apagado |
| 146.6 | Commit + push + quadro | ✅ Concluído | 2026-10-13 12:49 | — |
| 146.8 | Remover a regra de infográficos também do `CLAUDE.md` global (`C:Usersgelva.claudeCLAUDE.md`), a pedido do usuário | ✅ Concluído | 2026-10-13 12:50 | grep "infogr" = 0 no arquivo global; backup em %TEMP% |
| 146.7 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
