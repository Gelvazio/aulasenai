## Etapa 281-c4f12058 — "Confirmar Correção" (professor): usar a sugestão da IA só nas certas

**Tarefa:** #154-c4f12058-0728-46e2-93d8 · **Pedido em:** 2026-10-14 19:28 · **Executor:** Claude Code (local · main)
**Pedido:** "qd o professor clica aqui (Finalizar Atividade), se ele n corrigiu a questao, pega a sugestao de IA e apenas para as certas, as demais o professor e obrigado a corrigir sempre" + "nome para o professor, deve ser *Confirmar Correção*, so para professor, pra aluno mantenha!"
**Objetivo:** o botão do professor passa a se chamar "Confirmar Correção" (o do aluno não muda). Ao clicar, questão sem correção do professor e que a IA marcou como certa vale com a nota da IA; as demais (meia certa, errada, sem nota da IA) continuam exigindo a correção do professor.
**Próximo passo:** 281.1 — ler `finalizar-atividade-professor.js` e a trigger `correcao_discursiva_validar` (nota confirmada é definitiva) e decidir como lançar a nota.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 281.1 | Analisar o fluxo e o efeito no banco (pode virar tarefa grande se exigir mudança no banco) | 🔄 Em progresso | — | — |
| 281.2 | Renomear o botão do professor para "Confirmar Correção" (aluno mantém o nome) | ⬜ Pendente | — | — |
| 281.3 | Implementar a regra da IA só nas certas | ⬜ Pendente | — | — |
| 281.4 | Aceite do usuário | ⬜ Pendente | — | — |
