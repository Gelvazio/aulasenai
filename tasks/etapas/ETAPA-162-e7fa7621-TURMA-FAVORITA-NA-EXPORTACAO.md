## Etapa 162-e7fa7621 — Exportar PDF: a lista "Turma" já vem com a turma favorita

**Tarefa:** #35-e7fa7621-26e1-40e0 · **Pedido em:** 2026-10-14 10:15 · **Executor:** Claude Code (local · main)
**Pedido:** "AQUI DEVE VIR SELECIONADA A TURMA FAVORIA" (print da barra "Turma: Selecione a turma…"
ao lado de "Exportar PDF (atividade completa)")
**Objetivo:** o professor com várias turmas não precisa escolher a turma toda vez: vem a favorita.
**Próximo passo:** 35.2 — usuário abrir uma atividade como professor e conferir a turma favorita.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 35.1 | `assets/js/turma-exportacao.js`: lê `turma.favorito` e deixa a favorita escolhida (regra global de todas as atividades e avaliações) | ✅ Concluído | 2026-10-14 10:15 | `node --check` ok; coluna `turma.favorito` em `database/2026-09-30-turma-favorita.sql` |
| 35.2 | Aceite do usuário (testar no navegador) | 👀 Aguardando o usuário | — | — |
