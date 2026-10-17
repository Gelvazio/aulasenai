## Etapa 280-85290af1 — ON/OFF "Pendente Correcao" ao lado do combo de aluno

**Tarefa:** #153-85290af1-912c-46c0-8bad · **Pedido em:** 2026-10-14 19:26 · **Executor:** Claude Code (local · main)
**Pedido:** "ADICIONE AO LADO (do combo Aluno: — Selecione o aluno —) 1 BOTAO DE NOME *Pendente Correcao*, tipo on/off, se marcado, lista apenas aluno que ainda nao estao marcados como corrigido pelo professor" (com imagem do combo)
**Objetivo:** com "Pendente Correcao" marcado, o combo de aluno lista só quem o professor ainda não marcou como corrigido.
**Próximo passo:** 153.3 — usuário ligar/desligar "Pendente Correcao" ao lado do combo de aluno.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 153.1 | Combo em `respostas-aluno-professor.js`; "corrigido pelo professor" = mesma regra da Prova Corrigida (discursiva: entregue + nota do professor em todas as questões respondidas; objetiva: entregue) | ✅ Concluído | 2026-10-14 19:40 | código lido |
| 153.2 | ON/OFF "Pendente Correcao" (desligado ao abrir) ao lado do combo: `respostas-aluno-professor.js` + CSS + `corrigidos-discursiva.js` + `avaliacao-discursiva.js` + regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 19:40 | `node --check` nos 3 JS; revisão do código (sem navegador) |
| 153.3 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
