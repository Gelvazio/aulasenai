---
name: commit-por-tarefa
description: "Regra do professor: sempre um commit local ao concluir cada tarefa; NUNCA fazer push (o usuário faz localmente)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3af450f8-ab46-4a66-a48a-a0432af6f909
  modified: 2026-10-01T17:28:29.470Z
---

Sempre fazer **um commit local ao concluir cada tarefa** (cada pedido atendido), em todos os projetos.
**NUNCA fazer `git push`**, nem quando o usuário pedir "faça push": o push é feito só por ele,
localmente.

**Why:** em 2026-09-30 o professor pediu commit por tarefa. Em 2026-10-01 pediu explicitamente
"NUNCA FAZER PUSH, EU FAREI O PUSH LOCALMENTE" e mandou anotar no `CLAUDE.md` da raiz do projeto
(regra "NUNCA FAZER PUSH", que substituiu a de push permitido quando pedido).

**How to apply:** ao terminar e conferir a tarefa, `git add` só dos arquivos dela + `git commit` com
mensagem descritiva e o `Co-Authored-By`. Parar aí: sem `git push`, `pull`, `--force` ou mudança de
remotos; se ele pedir push, avisar que o commit está pronto para ele enviar. Não commitar tarefa
incompleta nem arquivos proibidos (gabaritos, listas de alunos, `__pycache__`); não usar `-f` em
arquivos ignorados (ex.: `*QUESTOES.md`, que no Windows também pega nomes terminados em "questoes.md").
