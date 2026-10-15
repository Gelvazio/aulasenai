## Etapa 285-6b8ba470 — ON/OFF "Mostrar Certas" também para o aluno

**Tarefa:** #158-6b8ba470-d669-42f3-999b · **Pedido em:** 2026-10-14 20:07 · **Executor:** Claude Code (local · main)
**Pedido:** "libere este filtro (Mostrar Certas) para os alunos tambem" (com imagem do filtro no painel do professor)
**Objetivo:** na prova corrigida do aluno, o ON/OFF "Mostrar Certas" esconde (desligado) ou mostra (ligado) as perguntas em que ele acertou tudo; a escolha fica no localStorage.
**Próximo passo:** 158.2 — aluno (ou o usuário no perfil de aluno) ligar/desligar "Mostrar Certas" na prova corrigida.

### Decisões

- 2026-10-14 20:07 — mesmo comportamento do professor: **desligado ao abrir** (esconde as certas, o aluno vê só o que errou ou acertou pela metade); ligado mostra todas. Certa = todos os tópicos com a nota do professor cheia (o aluno só vê nota confirmada); pergunta ainda sem nota nunca some.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 158.1 | ON/OFF "Mostrar Certas" no quadro da nota do aluno (`mostrar-certas-aluno-discursiva.js`), ligado em `resultado-aluno-discursiva.js` e carregado por `avaliacao-discursiva.js`; regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 20:08 | `node --check` nos 3 JS; revisão do código (sem navegador) |
| 158.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
