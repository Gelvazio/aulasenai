## Etapa 277-c2383409 — Progresso da Turma: ON/OFF "Falta Corrigir?"

**Tarefa:** #150-c2383409-7f6a-4050-9938 · **Pedido em:** 2026-10-14 19:16 · **Executor:** Claude Code (local · main)
**Pedido:** "crie 1 botao, de nome Falta Corrigir?, tipo on/off, e por default ligado, pra listar
so o que falta corrigir ao selecionar aluno"
**Objetivo:** ao selecionar um aluno, o professor ver por padrão só o que falta corrigir; desligando
"Falta Corrigir?", vê tudo.
**Próximo passo:** 150.3 — usuário escolher um aluno na discursiva e conferir o "Falta Corrigir?".

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 150.1 | Local e regra decididos sem perguntar (pedido claro, mesmo padrão do #148): ao lado de "Respostas dos alunos" da discursiva; "falta corrigir" = questão com algum tópico sem nota do professor | ✅ Concluído | 2026-10-14 19:24 | `mostrar-certas-discursiva.js` lido |
| 150.2 | ON/OFF "Falta Corrigir?" (ligado ao abrir): só as questões não corrigidas do aluno escolhido; "Mostrar Certas" vale só com ele desligado. `mostrar-certas-discursiva.js` + CSS + `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 19:24 | `node --check` ok; revisão do código (sem navegador) |
| 150.3 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
