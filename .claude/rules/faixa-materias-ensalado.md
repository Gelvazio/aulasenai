# 🎚️ Faixa de matérias: SOMENTE ENSALADO / VER TODAS MATÉRIAS

Registrada em 2026-10-08 23:42:02. Vale para qualquer faixa **"Matérias — <CURSO>"** de índice de
curso.

## Filtro

- Ao lado do título da faixa, dois botões: **SOMENTE ENSALADO** (só matérias com
  `ensalado = true`) e **VER TODAS MATÉRIAS** (lista completa).
- A faixa **sempre abre em SOMENTE ENSALADO**; se nenhuma matéria estiver ensalada, mostra todas.
- O botão do filtro em uso fica com **fundo verde piscando levemente**.
- No índice do curso, a grade de matérias de baixo segue o mesmo filtro.

## ON/OFF por matéria

- Cada matéria da faixa tem um botão **ON/OFF** ao lado do nome para marcar/desmarcar `ensalado`.
- A mudança grava no banco: coluna **`materia.ensalado`** (boolean). Não criar coluna nova
  (ver `docs/database.md`).
- O ON/OFF aparece e grava **só para o perfil PROFESSOR** (garantido por RLS); o aluno vê apenas o
  filtro.
