---
name: regras-de-trabalho
description: "Preferências fixas do professor: final de tarefa só com a frase, tarefas pequenas sem plano em docs/, nunca abrir navegador, banco só por pedido"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3af450f8-ab46-4a66-a48a-a0432af6f909
  modified: 2026-09-30T14:29:15.983Z
---

Regras que o professor definiu em 2026-09-30 e que valem sempre:

- **Final de tarefa:** responder só `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?` (sem tabela nem resumo).
  **Why:** o global tinha duas regras contraditórias e ele escolheu a da frase. **How to apply:** só ao
  encerrar tarefa concluída; perguntas e bloqueios continuam com resposta normal.
- **Tarefas pequenas** (ajuste pontual, sem banco/segurança/estrutura nova, até ~3 arquivos) **não
  precisam** de `docs/<tarefa>.md` nem de aprovação; as grandes continuam precisando.
- **Nunca abrir navegador** (preview, Browser pane, computer-use) nem subir servidor para validar;
  validar por código, `node`, banco e terminal. **Why:** decisão explícita do professor.
- **Banco de dados:** só alterar quando ele pedir; apagar linhas/tabelas/colunas em massa foi
  bloqueado pelo classificador de ações do Claude Code — nesses casos, preparar o SQL e deixar o
  professor executar (o que não apaga dados pode ser aplicado pelo conector do Supabase).
- **Commit por tarefa**; push só quando pedir (ver [[commit-por-tarefa]]).
- `*.md` e `*.py` são versionados, mas nunca `*gabarito*`, `*QUESTOES.md` nem dados de alunos.
