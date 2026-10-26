# 🎚️ Faixa de matérias: SOMENTE ENSALADO / VER TODAS MATÉRIAS

Registrada em 2026-10-08 23:42:02. Vale para qualquer faixa **"Matérias — <CURSO>"** de índice de
curso.

## Filtro

- Ao lado do título da faixa, dois botões: **SOMENTE ENSALADO** (só matérias com
  `ensalado = true`) e **VER TODAS MATÉRIAS** (lista completa).
- A faixa **sempre abre em SOMENTE ENSALADO**; se nenhuma matéria estiver ensalada, mostra todas.
- O botão do filtro em uso fica com **fundo verde piscando levemente**.
- No índice do curso, a grade de matérias de baixo segue o mesmo filtro.

## Gerador de índices (2026-10-24, #356)

- ⛔ Todo `index.html` de curso e de matéria **gerado** por `assets/gerador-indices/gerar_indices.py`
  já sai com o filtro: `data-curso-id` na faixa e os scripts `popup.js` e
  `faixa-materias-ensalado.js` no `<head>`. Nunca acrescentar isso à mão (o gerador regrava a página).
- O id do curso fica em `IDS_CURSO_BANCO` (pasta do curso → `curso.id`). **Curso novo = acrescentar
  a pasta e o id ali**; curso fora da tabela fica sem filtro (hoje: QUALIFICACAO-PROFISSIONAL e
  CURSO-PROFESSOR-RAFAEL, sem id registrado no repositório).

## ON/OFF por matéria

- Cada matéria da faixa tem um botão **ON/OFF** ao lado do nome para marcar/desmarcar `ensalado`.
- A mudança grava no banco: coluna **`materia.ensalado`** (boolean). Não criar coluna nova
  (ver `docs/database.md`).
- O ON/OFF aparece e grava **só para o perfil PROFESSOR** (garantido por RLS); o aluno **não vê a faixa** (2026-10-26,
  #385): só o professor; a grade de matérias de baixo continua para todos, no filtro ensalado.
