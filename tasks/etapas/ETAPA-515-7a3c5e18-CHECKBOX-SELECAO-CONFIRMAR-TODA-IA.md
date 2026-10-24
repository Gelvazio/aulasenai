## Etapa 515-7a3c5e18 — Checkbox por aluno + "selecionar todos" para o botão CONFIRMAR TODA CORREÇÃO DE IA

**Tarefa:** #366-7a3c5e18 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "deve ter 1 checkbox ao lado, e opcao selecionar todos, pra este botao"
**Objetivo:** o professor marca quais alunos entram no "CONFIRMAR TODA CORREÇÃO DE IA" (checkbox ao lado do nome de cada aluno, com opção "selecionar todos").

### #366.1 — Checkbox por aluno e "selecionar todos" no Progresso da turma

**Próximo passo:** implementar a coluna de checkbox e usar só os selecionados no botão em massa.

- **Nível:** MEDIO — JS com lógica, 2 arquivos (Jev, confiança 0,89)
- **Modelo:** só Sonnet
- **Entrega:** chave ON/OFF (não checkbox) ao lado do nome de cada aluno e "Selecionar todos" (também ON/OFF) ao lado do botão "CONFIRMAR TODA CORREÇÃO DE IA"; o botão roda o "Confirmar Todas" só nos alunos ligados e visíveis; seleção guardada em Set e mantida nos redesenhos. Arquivos: `assets/js/progresso-turma-global.js`, `assets/js/confirmar-toda-correcao-ia-progresso.js`, `assets/css/progresso-turma-global.css`, `docs/regras/atividades.md`, `.claude/rules/atividades-banco.md`. Feito por agentes (implementação + 2 revisões); aplicadas as correções reais da revisão (botão nulo, redesenho inicial, lista vazia).
- **Verificação:** `node --check` ok. `progresso-turma-global.js` já passava de 1000 linhas antes (pendência de dividir o arquivo). Conferir na tela: o usuário.
