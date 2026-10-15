## Etapa 275-97de4323 — Respostas dos alunos (discursiva): ON/OFF "Mostrar Certas"

**Tarefa:** #148-97de4323-6629-4374-b362 · **Pedido em:** 2026-10-14 19:07 · **Executor:** Claude Code (local · main)
**Pedido:** "coloque um filtro ao lado de *Respostas dos aluno*, de nome *Mostrar Certas*, do tipo
on/off, por default desligado, ao clicar nele mostre as certas tambem, alem das erradas, junto aqui
ao selecionar o aluno liste apenas perguntas meia certa ou errada"
**Objetivo:** ao conferir as respostas de um aluno na discursiva, o professor ver por padrão só as
questões meia certa ou errada; ligando "Mostrar Certas", vê também as certas.
**Próximo passo:** 148.2 — usuário escolher um aluno na discursiva e ligar/desligar "Mostrar Certas".

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 148.1 | ON/OFF "Mostrar Certas" ao lado de "Respostas dos alunos" (padrão desligado: só meia certa e errada; certa = nota cheia em todos os tópicos, nota do professor ou, sem ela, da IA; sem nota nunca some): `mostrar-certas-discursiva.js` + CSS, ligado em `avaliacao-discursiva.js`; regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 19:09 | `node --check` nos 2 JS; linhas novas ≤ 100 |
| 148.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
