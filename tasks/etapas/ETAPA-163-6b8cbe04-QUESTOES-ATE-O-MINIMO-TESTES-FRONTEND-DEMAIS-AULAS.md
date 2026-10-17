## Etapa 163-6b8cbe04 — Questões até o mínimo: Testes de Front-End — demais aulas (Técnico em Informática para Internet)

**Tarefa:** #36-6b8cbe04-258d-4a30 · **Pedido em:** 2026-10-14 09:45 · **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-04d42f6c-y5d6iz), desde 2026-10-16 21:49
**Pedido:** "DEIXA AS DEMAIS MATERIAS EM TASKS PRA OUTRAS IA FAZER" (criada pela #34, etapa
161-7aee2d7e)
**Objetivo:** depois do Cálculo Nota, a tela e o "Exportar PDF (atividade completa)" das
atividades objetivas desta matéria mostram só as questões 1 até o mínimo, como na #33
(etapa 160-d7ade403).
**Próximo passo:** 36.3 — 👀 aceite do usuário: abrir uma objetiva de Testes de Front-End como professor, aplicar o mínimo no Cálculo Nota e conferir a tela e o "Exportar PDF (atividade completa)"; depois como aluno.
**Modelo (#36):** só Opus 5.5+ ou Fable — nunca outro (#247)

> 🚫 **Sem slides (2026-10-16, #244.9, pedido do usuário):** a IA **não gera slides** de aula
> (nem PDF nem PPTX) nesta tarefa — o professor gera em outro momento. Vale para todas as aulas
> (`.claude/rules/materias-global.md`).

### Páginas (4, carregam `respostas-atividade-banco.js` em 2026-10-14)

- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-03-50-QUESTOES.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-04-50-QUESTOES.html`
- `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-05-50-QUESTOES.html`

Conferir a lista de novo ao começar (página nova ou removida desde então).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 36.1 | Pôr `data-questoes-ate-minimo="sim"` no `<body>` de cada página da lista | ✅ Concluído | 2026-10-16 21:51 | Lista conferida de novo: além das 4, as aulas 06 a 10 (criadas na #22) — 9 páginas; busca: o atributo aparece 1 vez em cada uma das 10 objetivas (a 02 já tinha). `pipeline.py` põe o atributo nas próximas |
| 36.2 | Conferir que cada página usa `.aula-card.questao` em ordem (ITEM 01, 02...) e o botão `#btnExportarPDF`; fora do padrão → ajustar ou ⛔ com motivo | ✅ Concluído | 2026-10-16 21:51 | Script de leitura: 50 `.aula-card.questao` com ITEM 01 a 50 em ordem e 1 `#btnExportarPDF` em cada página; `respostas-atividade-banco.js` em todas |
| 36.3 | Aceite do usuário (testar como professor e aluno) | 👀 Aguardando o usuário | — | — |

### Conferência #181.4 (2026-10-16 23:31, Claude Code (Opus 5.5) s17, só leitura)

**Resultado: ✅ Feito no código** — `data-questoes-ate-minimo="sim"` presente em 10 páginas de `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND` (`grep -rl`). Falta só conferir na tela (item 36.3).
