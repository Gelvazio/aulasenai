---
description: Cria a pasta de uma matéria nova com os 5 status (materias-global.md)
argument-hint: "<CURSO>/<MATERIA>"
---

Crie a estrutura da matéria **$ARGUMENTS** em `MATERIAIS/$ARGUMENTS/`, exatamente como em
`.claude/rules/materias-global.md` ("Estrutura de pasta"):

- `EMENTA-CHALKIE-AI.md`, `materia.json` (`.claude/rules/apostilas.md`), `STATUS-EMENTAS.md`,
  `STATUS_MATERIA.md` (com sublinhado)
- `CONTEUDO/`, `AULAS/STATUS-AULAS.md`, `ATIVIDADES/STATUS-ATIVIDADES.md` (sem HTML —
  `atividades-banco.md`), `APOSTILA/STATUS-APOSTILA.md`, `DOCUMENTACAO/`

Antes de criar: a tarefa precisa estar no quadro (`AGENTS.md`, regra 1) e o argumento precisa
ter curso e matéria; faltou → pedir. Copiar o formato dos status de uma matéria existente do mesmo
curso, com tudo ⬜. ⛔ Não inventar conteúdo da ementa nem usar outra matéria como base sem pedir.
Linha no banco (`materia`) é tarefa de banco: só o Claude Code local.
