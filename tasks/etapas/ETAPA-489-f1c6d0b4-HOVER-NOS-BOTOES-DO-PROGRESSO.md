## Etapa 489-f1c6d0b4 — HOVER-BOTOES-PROGRESSO: Efeito de mouse hover nos botões do aluno

**Tarefa:** HOVER-BOTOES-PROGRESSO · **Pedido em:** 2026-10-24 13:50 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s489)
**Pedido:** "adicione efeito de mouse hover nos botões" (botões da célula do aluno no Progresso da turma)
**Objetivo:** os botões da célula do aluno (Quantidade Mínima, Confirmar Todas, Confirmar Entrega, Faltou?, Confirmar da quantidade) mudam de aparência ao passar o mouse.

### HOVER-BOTOES-PROGRESSO.1 — Acrescentar `:hover` nos CSS dos botões da célula do aluno

**Próximo passo:** acrescentar `:hover:not(:disabled)` (cor/borda/fundo mais fortes, transição curta, cursor pointer) nos 3 CSS: `progresso-turma-global.css`, `falta-aluno-progresso.css` e `questoes-nota-aluno-progresso.css`.

- **Nível:** MEDIO — classificado (jev (confiança 0.89))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Descrição:** só CSS; sem JS, HTML nem banco; botão desativado não reage ao hover.
- **Critérios de Aceitação:** hover visível em todos os botões listados; sem `!important`; linhas ≤ 100 caracteres.
- **Entrega:** — · **Verificação:** —
