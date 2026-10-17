## Etapa 156-2221f1f9 — Análise contínua das matérias

**Tarefa:** #19-91cbac65-87ca-45a0 · **Pedido em:** 2026-10-09 13:20:11 · **Executor:** —
**Pedido:** Análise contínua das matérias (o que falta e o que está OK). ⛔ **Tarefa PERMANENTE: nunca fica CONCLUÍDA** enquanto `tasks/ANALISE-MATERIAS-RELATORIO.json` tiver alguma matéria com `"completa": false` ou alguma pendência.
**Objetivo:** Saber sempre o que falta e o que está OK em cada matéria.
**Próximo passo:** 19.1 — rodadas da análise — última: 2026-10-16 21:39: 7 cursos, 33 matérias, 4 completas, 29 incompletas

> Etapa criada em 2026-10-13 na migração do quadro para fonte única (antes: bloco #19 do `TASKS.md`; texto do pedido sem alteração).

**Rotina:** `C:\Python314\python.exe scripts/analise-materias.py` (só lê as matérias; grava `tasks/ANALISE-MATERIAS-RELATORIO.json`). Rodar no início de cada sessão e ao concluir tarefa que mexa em `MATERIAIS/`, com o JSON no commit da tarefa; atualizar o item 19.1 com os números e a hora da rodada. Resolver pendências **só quando o usuário pedir**, uma matéria por vez (cada uma vira tarefa própria); respeitar `IGNORAR`/`VERIFICAR` das ementas e cursos.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 19.1 | Rodadas da análise — última: 2026-10-16 21:39: 7 cursos, 33 matérias, 4 completas, 29 incompletas | 🔄 Em progresso | — | JSON do relatório |
| 19.2 | Encerrar só com `incompletas = 0`, nenhuma pendência e aceite do usuário | ⬜ Pendente | — | — |
