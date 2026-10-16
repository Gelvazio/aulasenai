## Etapa 274-7cd5eb0b — Progresso da Turma: ON/OFF "Prova Corrigida"

**Tarefa:** #147-7cd5eb0b-0a1a-48d8-9125 · **Pedido em:** 2026-10-14 18:57 · **Executor:** Claude Code (local · main)
**Pedido:** "Adicione mais 1 filtro, de nome Prova Corrigida, do tipo on/off, se professor
corrigiu, ao marcar, liste, senao nao liste, por padrao, abra como nao corrigidas, deve gravar no
localstorage tab, salve a tarefa primeiro e depois assuma"
**Objetivo:** no Progresso da Turma, um ON/OFF "Prova Corrigida": ligado lista só as provas que o
professor já corrigiu; desligado (padrão) lista só as não corrigidas; a escolha fica no
localStorage.
**Complemento (pedido do usuário):** "so vala pra prova discursiva, as provas objetivas, assim que entregue, ja deve ser considerada corrigida automaticamente" → objetiva: entregue = corrigida; discursiva: entregue e com nota do professor em todas as questões respondidas.
**Próximo passo:** 147.2 — usuário testar o ON/OFF "Prova Corrigida".

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 147.1 | ON/OFF "Prova Corrigida" (padrão: não corrigidas; lembrado no localStorage) depois do "RECUPERAÇÃO": `filtro-corrigida-progresso.js` + campo `provaCorrigida` em `progresso-turma-fontes.js` (lê `nota_professor` de `correcao_discursiva`) + regra em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-14 18:59 | `node --check` nos 3 JS; linhas ≤ 100; funções ≤ 45 linhas |
| 147.2 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
