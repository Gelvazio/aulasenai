## Etapa 267-36090101 — Progresso da Turma: ON/OFF "Tarefa Entregue?"

**Tarefa:** #140-36090101-3b17-4392-9057 · **Pedido em:** 2026-10-14 16:13 · **Executor:** Claude Code (local · main)
**Pedido:** "adicione 1 filtro em cima do tipo on/off, de nome Tarefa Entregue?, por padrao, liste
apenas quem nao entregou a tarefa"
**Objetivo:** no Progresso da Turma, um ON/OFF "Tarefa Entregue?" em cima da lista: OFF (padrão)
mostra só quem **não** entregou; ON mostra também quem entregou.
**Próximo passo:** 140.2 — usuário testar o ON/OFF "Tarefa Entregue?" no Progresso da Turma.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 140.1 | ON/OFF "Tarefa Entregue?" (só filtra a lista na tela; resumo, Gráficos e Cálculo Nota com a turma escolhida inteira): `filtro-entregue-progresso.js`, chave ON/OFF comum em `progresso-turma-global.css` (o "Faltou?" passou a usar a mesma), filtros da lista numa só fila; regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 16:15 | `node --check` nos 3 JS; linhas ≤ 100 |
| 140.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
