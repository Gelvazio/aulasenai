---
description: Refatora um arquivo para os limites e nomes do projeto, sem mudar o comportamento
argument-hint: "<arquivo>"
---

Refatore **$ARGUMENTS** para cumprir `.claude/rules/codigo-limites-nomes.md` e
`.claude/rules/codigo-solid.md`, **sem mudar o comportamento**:

1. Ler a orientação do arquivo (`docs-antes-de-editar.md`) e o arquivo inteiro.
2. Listar o que está fora da regra (arquivo > 1000 linhas, função > 45, linha > 100, falta de
   JSDoc, número/string mágica, aninhamento > 2, nomes fora do padrão).
3. Corrigir **no escopo da TASK** (arquivo com várias partes ou mudança grande → plano na etapa
   e aprovação, `tasks/ciclo-da-task.md`).
4. Validar com `/validar` (sem navegador, sem testes).

⛔ Não renomear colunas, tabelas ou funções usadas por outras páginas sem conferir quem usa
(`grep`).
