---
name: toda-tarefa-e-task
description: "Toda tarefa pedida à IA vira uma TASK e a IA deve pedir detalhes ao solicitante antes de executar"
metadata:
  type: feedback
---

Toda tarefa pedida à IA **vira uma TASK** (etapa em `tasks/etapas/` + linha em `tasks/STATUS.md` +
bloco em `tasks/TASKS.md`) e a IA **pede detalhes ao solicitante** antes de executar.

**Why:** pedido do usuário em 2026-10-13, para a IA não assumir detalhes críticos em silêncio.

**How to apply:** abrir a TASK, perguntar numa única mensagem objetivo, escopo, arquivos/matéria e
critério de pronto (sem perguntar o que já está no pedido) e só então executar. Regra completa em
`.claude/rules/toda-tarefa-e-task.md`; ver também [[regras-de-trabalho]] e [[essentials-aulasenai]].
