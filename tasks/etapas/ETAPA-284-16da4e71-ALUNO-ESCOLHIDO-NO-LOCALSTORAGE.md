## Etapa 284-16da4e71 — Aluno escolhido em "Respostas dos alunos" lembrado no localStorage

**Tarefa:** #157-16da4e71-c59e-4b3e-b930 · **Pedido em:** 2026-10-14 19:59 · **Executor:** Claude Code (local · main)
**Pedido:** "o aluno selecionado aqui (combo Aluno: de Respostas dos alunos), tambem deve ficar no local storage, e ser carregado sempre pelo local storage, ou o botao selecione"
**Pedido (2ª mensagem, 2026-10-14 20:00):** "estes filtros, tambem devem ficar no local storage" (Falta Corrigir?, Mostrar Certas e Pendente Correcao)
**Objetivo:** o aluno escolhido no combo volta sozinho ao abrir a página (guardado no navegador, por atividade); sem escolha guardada ou se o aluno não estiver mais na lista, fica "— Selecione o aluno —". Os três filtros (Falta Corrigir?, Mostrar Certas, Pendente Correcao) também ficam guardados no navegador e voltam ao abrir.
**Próximo passo:** 157.2 — usuário escolher um aluno e ligar/desligar os filtros, recarregar a página e conferir.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 157.1 | Aluno escolhido (por atividade) e os filtros Pendente Correcao, Falta Corrigir? e Mostrar Certas guardados no localStorage (`respostas-aluno:*`) e restaurados ao abrir: `respostas-aluno-professor.js` + `mostrar-certas-discursiva.js` + `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 20:01 | `node --check` nos 2 JS; revisão do código (sem navegador) |
| 157.2 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
