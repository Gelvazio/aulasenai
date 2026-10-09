> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 114 — Testes de Front-End: links dos slides nos cards e PDFs das aulas versionados (tarefa pequena, pedido em 2026-10-09 00:45)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 114.1 | Botão **📕 Slides (PDF)** nos cards das aulas 01 a 03 de `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/index.html`, apontando para `../AULAS/AULA-NN-SLIDES.pdf` (editado direto para não perder a faixa SOMENTE ENSALADO) | ✅ Concluído | 2026-10-09 00:58 | `git diff` com os 3 links |
| 114.2 | `assets/gerador-indices/gerar_indices.py`: card de aula ganha o botão de slides quando existe `<MATÉRIA>/AULAS/AULA-NN-SLIDES.pdf` (vale para todas as matérias ao regenerar) | ✅ Concluído | 2026-10-09 00:58 | `py_compile` + geração em memória mostrou o botão |
| 114.3 | Os 10 PDFs `TESTES-DE-FRONTEND/AULAS/AULA-NN-SLIDES.pdf` versionados (exceção no `.gitignore`) | ✅ Concluído | 2026-10-09 00:58 | `git check-ignore` mostra a exceção |
| 114.4 | Aceite do usuário | ⬜ Pendente | — | — |
