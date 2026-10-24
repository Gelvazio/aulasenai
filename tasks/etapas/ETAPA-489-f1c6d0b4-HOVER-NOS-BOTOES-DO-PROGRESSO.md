## Etapa 489-f1c6d0b4 — HOVER-BOTOES-PROGRESSO: Efeito de mouse hover nos botões do aluno

**Tarefa:** HOVER-BOTOES-PROGRESSO · **Pedido em:** 2026-10-24 13:50 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s489)
**Pedido:** "adicione efeito de mouse hover nos botões" (botões da célula do aluno no Progresso da turma)
**Objetivo:** os botões da célula do aluno (Quantidade Mínima, Confirmar Todas, Confirmar Entrega, Faltou?, Confirmar da quantidade) mudam de aparência ao passar o mouse.

### HOVER-BOTOES-PROGRESSO.1 — Acrescentar `:hover` nos CSS dos botões da célula do aluno

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — classificado (jev (confiança 0.89))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Descrição:** só CSS; sem JS, HTML nem banco; botão desativado não reage ao hover.
- **Decisão (usuário, 2026-10-24 14:00):** os ajustes (maiores, um por linha, hover, Confirmar Entrega) são **globais**: todos os quadros, atividades e matérias. Conferido: há uma só implementação do quadro (`progresso-turma-global.js/css`, carregada por `respostas-atividade.js` e `avaliacao-discursiva.js`), sem sobrescrita por página; regra registrada em `atividades-banco.md`, `docs/regras/atividades.md` e no histórico.
- **Critérios de Aceitação:** hover visível em todos os botões listados; sem `!important`; linhas ≤ 100 caracteres.
- **Entrega:** `assets/css/progresso-turma-global.css`, `assets/css/falta-aluno-progresso.css`, `assets/css/questoes-nota-aluno-progresso.css` (3 executores-medio em paralelo, um CSS cada), `.claude/rules/atividades-banco.md`, `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` no commit desta entrega · **Verificação:** chaves balanceadas nos 3 CSS; sem `!important` novo; borda âmbar do campo alterado preservada no hover; implementação única do quadro (vale para todas as atividades e matérias); conferir na tela (sem navegador)
