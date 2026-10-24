## Etapa 488-e5b73a19 — BOTOES-PROGRESSO-GRANDES: Botões do nome do aluno maiores, um por linha

**Tarefa:** BOTOES-PROGRESSO-GRANDES · **Pedido em:** 2026-10-24 13:30 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s488)
**Pedido:** "deixe estes botões maiores, 1 por linha" (imagem: célula do aluno no Progresso da turma com Confirmar Todas, Confirmar Entrega, Faltou? e Quantidade Questão Considerar + Confirmar)
**Objetivo:** no quadro de progresso, os botões da célula do nome do aluno ficam maiores (mais fáceis de clicar) e cada um ocupa uma linha.

### BOTOES-PROGRESSO-GRANDES.1 — Ajustar o CSS dos botões da célula do aluno

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** só CSS; sem JS, HTML nem banco.
- **Critérios de Aceitação:** botões da célula (Confirmar Todas, Confirmar Entrega, Faltou?, Quantidade Questão Considerar com Confirmar) um por linha, maiores; sem `!important` novo; mobile continua sem rolagem horizontal.
- **Entrega:** `assets/css/progresso-turma-global.css`, `assets/css/falta-aluno-progresso.css`, `assets/css/questoes-nota-aluno-progresso.css` (3 executores-medio em paralelo, um CSS cada) no commit desta entrega · **Verificação:** chaves balanceadas nos 3 CSS; sem `!important` novo; sem JS/HTML/banco alterado; conferir na tela (sem navegador): botões maiores, um por linha, bolinha do Faltou? ligada
