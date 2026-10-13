## Etapa 147-9201b27b — Visualizador de regras e tarefas em `.claude/rules/index.html` (pedido em 2026-10-13 09:51)

**Objetivo:** página com cards clicáveis (modal) das regras por categoria e aba TASKS com todas as tarefas.
**Plano:** [docs/visualizador-regras-index-html.md](../../docs/visualizador-regras-index-html.md)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 147.1 | Plano e aprovação | ✅ Concluído | 2026-10-13 09:55 | Aprovado: executar com gerador |
| 147.2 | Gerador: regras | ✅ Concluído | 2026-10-13 09:57 | 101 seções; categorias pelo INDEX.md |
| 147.3 | Gerador: tarefas, frentes, aguardando, etapas | ✅ Concluído | 2026-10-13 09:57 | 23 tarefas = linhas da tabela; 6 frentes; 55 aguardando |
| 147.4 | Modelo da página (abas, cards, modal, filtros) | ✅ Concluído | 2026-10-13 09:57 | `node --check` no JS juntado: OK |
| 147.5 | Gerar `index.html` | ✅ Concluído | 2026-10-13 09:57 | Gerado; JSON embutido lido de volta pelo Python |
| 147.6 | Regra nova + `AGENTS.md` + `INDEX.md` | ✅ Concluído | 2026-10-13 09:57 | `visualizador-regras.md` ≤ 5 KB |
| 147.7 | Commit + push + quadro | ✅ Concluído | 2026-10-13 09:57 | — |
| 147.6b | Menu **Regras** do site abre o visualizador em nova aba (pedido do usuário durante a tarefa); `regras-modal.js/.css` sem uso removidos | ✅ Concluído | 2026-10-13 09:57 | `node --check js/header-usuario.js`; grep: nenhuma outra página usa o modal |
| 147.6c | Corrigir horas da Etapa 146/147 (Git Bash dava GMT) e a regra de data no `essentials.md` | ✅ Concluído | 2026-10-13 09:57 | `date` = relógio do Windows (Brasília) |
| 147.8 | Aceite do usuário (abrir a página e conferir) | 👀 Aguardando o usuário | — | — |
