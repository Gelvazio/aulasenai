> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 75 — Capacidades nas 2 últimas pendências (tarefa pequena, 2026-10-07)

Plano: [docs/capacidade-por-questao-avaliacoes.md](docs/capacidade-por-questao-avaliacoes.md). Sem banco, sem mexer em questões ou alternativas.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 75.1 | ITIC `ATIVIDADES-AULA-28-09-2026-25-QUESTOES`: `- **Capacidade:** C1` nas 25 questões (todas sobre feedback/comunicação) e página regenerada | ✅ Concluído | 2026-10-07 22:45 | 25 caixas + quadro no início; diff só com capacidades e o link dos slides que o gerador já põe |
| 75.2 | `gerar_atividade_excel.py`: caixa "🎯 Capacidade" em cada questão e quadro "CAPACIDADES" na capa, lendo o `materia.json` (código inexistente = erro) | ✅ Concluído | 2026-10-07 22:45 | `py_compile` ok |
| 75.3 | `atividade.json` das práticas de Excel 29/09 e 01/10 com `capacidades` por questão (C1; C1 e C2 nas de cálculo: 29/09 Q4, Q5, Q9; 01/10 Q5) e regeneradas | ✅ Concluído | 2026-10-07 22:45 | 16 questões com a caixa, 2 capas com o quadro; a regeneração também corrigiu os caminhos de CSS/JS que estavam com um `../` a mais |
| 75.4 | Commit local | ✅ Concluído | 2026-10-07 22:45 | `git diff --cached --name-only` sem gabaritos nem fontes `*QUESTOES.md` |
| 75.5 | Aceite do usuário (abrir as 3 atividades) | ⬜ Pendente | — | — |
