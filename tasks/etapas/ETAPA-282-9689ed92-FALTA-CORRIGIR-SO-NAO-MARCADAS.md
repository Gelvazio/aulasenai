## Etapa 282-9689ed92 — "Falta Corrigir?" deve listar só as perguntas que o professor ainda não marcou

**Tarefa:** #155-9689ed92-9f83-4c6e-a261 · **Pedido em:** 2026-10-14 19:32 · **Executor:** Claude Code (local · main)
**Pedido:** "este botao (Falta Corrigir?), quando Ativo, so deve listar as perguntas que o professor nao marcou ainda, ou seja, nao corrigiu"
**Objetivo:** com "Falta Corrigir?" ligado, ao escolher um aluno só aparecem as perguntas ainda sem a marcação (Certa / Meia certa / Errada) do professor.
**Próximo passo:** 155.2 — usuário escolher um aluno e conferir o "Falta Corrigir?" ligado.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 155.1 | Corrigir o filtro: pergunta corrigida = todos os tópicos RESPONDIDOS com nota do professor (tópico em branco não conta); a lista atualiza ao o professor marcar | ✅ Concluído | 2026-10-14 20:05 | `node --check` nos 2 JS; revisão do código (sem navegador). Causa: o filtro contava todos os tópicos da pergunta (inclusive em branco) e não se refazia ao marcar |
| 155.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
