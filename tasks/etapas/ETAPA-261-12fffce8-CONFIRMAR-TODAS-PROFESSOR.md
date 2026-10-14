## Etapa 261-12fffce8 — Botão "Confirmar Todas" do professor no Progresso da Turma

**Tarefa:** #134-12fffce8-af5a-48c9 · **Pedido em:** 2026-10-14 14:57 · **Executor:** Claude Code (local · main)
**Pedido:** "adicione no lado do nome 1 botão de nome Confirmar Todas, para o professor confirmar todas as questões do aluno"
**Respostas:** sem nota da IA → alerta "QUESTOES SEM NOTA!GERE A CORRECAO DE IA DE NOVO!" e não grava; suspeita de cópia pendente → pular; lugar: Progresso da Turma, ao lado do nome.
**Objetivo:** confirmar de uma vez a nota da IA como nota do professor em todas as questões de um aluno que já entregou (discursivas).
**Próximo passo:** 261.3 — aceite do usuário.

Decisões (Claude, 2026-10-14 14:57): o botão só funciona para quem **entregou** (a nota do professor fica travada); para não travar alunos com questão em branco no alerta, a IA passa a dar 0 às questões em branco **depois da entrega** (rotina #130).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 261.1 | `assets/js/confirmar-todas-professor.js` (lê tópicos, correção e suspeitas; bloqueia sem nota; pula suspeitas; confirma no popup; grava num upsert só de `nota_professor`); `progresso-turma-global.js` com botões extras do nome por tipo; estilo em `progresso-turma-global.css`; regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 14:57 | `node --check` nos 2 JS; leitura: upsert só com a chave + `nota_professor` (mesmo caminho dos botões Certa/Meia/Errada, RLS de professor) |
| 261.2 | Rotina `correcao-ia-atividade-81`: questão em branco depois da entrega recebe `nota_ia = 0` | ✅ Concluído | 2026-10-14 14:57 | `update_scheduled_task` confirmou o prompt |
| 261.3 | Aceite do usuário (testar o botão logado como professor) | 👀 Aguardando o usuário | — | — |
