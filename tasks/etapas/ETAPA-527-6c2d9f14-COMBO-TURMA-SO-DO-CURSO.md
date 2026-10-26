# ETAPA 527 — Combo Turma do card Notas e média só com as turmas do curso

- **TASK:** #378 (pedida em 2026-10-26)
- **Nível:** `MEDIO` (só Sonnet)

## Pedido

"Neste combo de turma, deve vir apenas as turmas do curso."

## Itens

| Item | Descrição | Status |
|---|---|---|
| 378.1 | `card-notas-media-repositorio.js`: `listarTurmasCard(materiaId)` filtra `turma.curso_id` = `materia.curso_id` (sem curso conhecido, lista todas); `card-notas-media.js` carrega a matéria antes das turmas | ✅ 2026-10-26 |

**Verificação:** `node --check` nos 2 arquivos; consulta de leitura: matéria 27 tem `curso_id` 7 com 1 turma de 8 no total.
