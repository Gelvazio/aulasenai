## Etapa 496-a7e3b5c9 — REMOVER-QTD-CONSIDERAR: Remover "Quantidade Questão Considerar" duplicada do quadro de progresso

**Tarefa:** REMOVER-QTD-CONSIDERAR · **Pedido em:** 2026-10-24 18:10 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · s496)
**Pedido:** "REMOVA ISSO, JA EXISTE NO BOTAO EM CIMA, ESTA DUPLICANDO" (imagem: campo "Quantidade Questão Considerar" com o valor 30 e o botão "Confirmar" na célula do aluno)
**Objetivo:** tirar da célula do aluno o campo e o botão "Quantidade Questão Considerar / Confirmar", já cobertos pelo botão de cima (quantidade mínima).

### REMOVER-QTD-CONSIDERAR.1 — Remover o bloco duplicado do quadro de progresso

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — classificado (jev (confiança 0.98))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** o bloco some de todos os quadros (implementação única); sem deixar código morto.
- **Critérios de Aceitação:** campo e botão não aparecem; `node --check` passa; regra e docs sem citar o bloco removido.
- **Entrega:** `assets/js/progresso-turma-global.js` (sem o campo, o carregamento e a guarda de digitação; fica só a espera por popup aberto), `assets/js/questoes-nota-aluno-progresso.js` e `assets/css/questoes-nota-aluno-progresso.css` apagados, `.claude/rules/atividades-banco.md`, `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` no commit desta entrega · **Verificação:** `node --check` ok; sem referência restante ao campo nos JS/HTML; **atenção:** a tabela `questoes_nota_aluno` tem 3 linhas e a nota continua usando esses valores (leitura mantida), sem como editá-los na tela; conferir na tela (sem navegador)
