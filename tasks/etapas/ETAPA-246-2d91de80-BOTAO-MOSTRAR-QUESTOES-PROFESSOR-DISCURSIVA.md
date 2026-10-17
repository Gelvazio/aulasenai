## Etapa 246-2d91de80 — Botão "Mostrar questões" do professor nas discursivas

**Tarefa:** #119-2d91de80-ccc7-4c9d · **Pedido em:** 2026-10-14 13:05 · **Executor:** Claude Code (local · main)
**Pedido:** "ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA-DISCURSIVA.html, NO LOGIN DE PROFESSOR N TEM BOTAO PRA MOSTRAR AS QUESTOES"
**Objetivo:** o professor pode ver a prova (instruções e questões) sem escolher um aluno no combo; vale para todas as discursivas (código global).
**Próximo passo:** 119.3 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 119.1 | `assets/js/avaliacao-discursiva.js`: botão "👁️ Mostrar questões / 🙈 Esconder questões" no painel do professor (alterna a classe `discursiva--respostas-ocultas`; o rótulo acompanha também a escolha de aluno no combo); aviso do painel atualizado | ✅ Concluído | 2026-10-14 13:05 | `node --check` ok; leitura do código: a classe é ligada antes do `montarPainel`, então o botão nasce "Mostrar questões" |
| 119.2 | `docs/regras/atividades.md` atualizado | ✅ Concluído | 2026-10-14 13:05 | Leitura |
| 119.3 | Aceite do usuário (testar logado como professor) | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
