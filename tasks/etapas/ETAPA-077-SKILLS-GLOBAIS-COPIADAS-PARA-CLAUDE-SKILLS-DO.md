> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 77 — Skills globais copiadas para `.claude/skills/` do projeto (tarefa pequena, 2026-10-08)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 77.1 | Copiar as 4 skills do usuário (`EXERCICIOS`, `documentacao-padrao`, `graphify`, `padrao-slides-senai`) de `~/.agents/skills/` (versão mais nova) para `.claude/skills/`; a pasta `synced/` (skills do claude.ai, 8,7 MB, geridas pelo app) não foi copiada | ✅ Concluído | 2026-10-08 08:15 | `diff -rq` igual nas 4 |
| 77.2 | `~/.claude/skills/documentacao-padrao` estava desatualizada (sem a exceção do item 76.1): sincronizada com a de `~/.agents/skills` | ✅ Concluído | 2026-10-08 08:15 | `diff` igual |
| 77.3 | Regras globais (`~/.claude/CLAUDE.md` e `CLAUDE-DOCS-BEFORE-EVERY-TASK.md`) no projeto: decisão do usuário — escolha: "Cópia de referência, sem carregar" (`.claude/regras-globais/` + regra no CLAUDE.md) | ✅ Concluído | 2026-10-08 08:16 | `diff` das cópias com os originais |
| 77.4 | Regra no CLAUDE.md: sessão na nuvem lê e aplica `.claude/regras-globais/` (pedido do usuário) | ✅ Concluído | 2026-10-08 08:18 | `grep` mostra a regra na seção de globais e na inicialização |
| 77.5 | Aceite do usuário | 👀 Aguardando validação | — | — |
