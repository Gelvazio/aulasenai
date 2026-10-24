## Etapa 519-1b7c3d52 — "Quantidade Mínima de Questões" deve mostrar as questões que entram na nota

**Tarefa:** #370-1b7c3d52 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "“Quantidade Mínima de Questões: 30/30” DEVIA APARECER ENTÃO 20/30" (aluno Fagner Roberto da Silva, atividade 36: a nota 8,55 vem de `questoes_nota_aluno.quantidade = 20`).
**Objetivo:** o botão do aluno no Progresso da turma mostrar a quantidade realmente usada na nota (20/30), e não só o mínimo padrão (30/30).

### #370.1 — Botão mostra a quantidade que vale na nota

**Próximo passo:** conferir na tela se o Fagner aparece com 20/30.

- **Nível:** MEDIO — JS com lógica, 1 arquivo (Jev, confiança 0,34; matriz)
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/progresso-turma-global.js` — o rótulo do botão usa `aluno.questoesNota` (quantidade que vale na nota: a gravada para o aluno ou, sem ela, o mínimo); a dica explica a diferença.
- **Verificação:** `node --check` ok. Conferir na tela: o usuário.
