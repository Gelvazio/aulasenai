## Etapa 303-5d996631 — Botão "🔑 Exportar Gabarito" só para o professor

**Tarefa:** #176-5d996631-9f67-481f-b988-c36c9f88350d · **Pedido em:** 2026-10-15 15:28 · **Executor:** Claude Code (local · main)
**Pedido:** "este botao 🔑 Exportar Gabarito, so deve aparecer para o professor" (depois da conferência de que o aluno exportava o gabarito do professor nas atividades liberadas da turma 135081).
**Objetivo:** o botão "🔑 Exportar Gabarito" aparece e funciona só para o perfil PROFESSOR, em todas as atividades (o botão é global); o aluno não exporta mais o gabarito por ele.
**Próximo passo:** 176.7 — aceite do usuário (entrar como aluno e conferir que o botão não aparece; como professor, que aparece e exporta).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 176.1 | Criar a TASK e a etapa no quadro (commit + push) | ✅ Concluído | 2026-10-15 15:28 | commit "criar #176" no remoto |
| 176.2 | Reservar a tarefa para a frente local · main (commit + push) | ✅ Concluído | 2026-10-15 15:29 | "Em uso por" preenchido no remoto |
| 176.3 | Ver onde o botão é criado e mostrado (JS e páginas com o botão fixo) | ✅ Concluído | 2026-10-15 15:32 | `atividade.js` cria o botão (escondido) em toda página com `data-login="sim"`; 14 páginas já têm o botão fixo, todas com `hidden`; quem mostrava para qualquer logado era `mostrarBotaoGabaritoSeLogado` em `avaliacao-pdf-professor.js` |
| 176.4 | Mostrar e liberar o botão só para o professor | ✅ Concluído | 2026-10-15 15:32 | `avaliacao-pdf-professor.js`: `mostrarBotaoGabaritoSeProfessor` e `exportarGabaritoProfessor` (recusa quem não é professor); saíram as partes só do aluno (`solicitarGabaritoAluno`, aviso de aguardar); `atividade.js` e `exportar-word.js` com o nome novo; `node --check` ok nos 3; nenhum resto dos nomes antigos (grep). Fora do escopo: o `title` do botão fixo das 14 páginas ainda cita o aluno (só o professor vê o botão) |
| 176.5 | Atualizar a regra em `docs/regras/atividades.md` e o histórico | ✅ Concluído | 2026-10-15 15:32 | `docs/regras/atividades.md`, `docs/liberacao-respostas-por-turma.md` e `docs/HISTORICO-REGRAS.md` (leitura) |
| 176.6 | Encerrar: quadro, visualizador, 1 commit + push na `main` | ✅ Concluído | 2026-10-15 15:32 | `git push` sem erro |
| 176.7 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
