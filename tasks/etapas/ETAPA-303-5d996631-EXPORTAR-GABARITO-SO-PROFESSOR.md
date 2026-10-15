## Etapa 303-5d996631 — Botão "🔑 Exportar Gabarito" só para o professor

**Tarefa:** #176-5d996631-9f67-481f-b988-c36c9f88350d · **Pedido em:** 2026-10-15 15:28 · **Executor:** Claude Code (local · main)
**Pedido:** "este botao 🔑 Exportar Gabarito, so deve aparecer para o professor" (depois da conferência de que o aluno exportava o gabarito do professor nas atividades liberadas da turma 135081).
**Objetivo:** o botão "🔑 Exportar Gabarito" aparece e funciona só para o perfil PROFESSOR, em todas as atividades (o botão é global); o aluno não exporta mais o gabarito por ele.
**Próximo passo:** 176.3 — ver onde o botão é criado e mostrado.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 176.1 | Criar a TASK e a etapa no quadro (commit + push) | ✅ Concluído | 2026-10-15 15:28 | commit "criar #176" no remoto |
| 176.2 | Reservar a tarefa para a frente local · main (commit + push) | ✅ Concluído | 2026-10-15 15:29 | "Em uso por" preenchido no remoto |
| 176.3 | Ver onde o botão é criado e mostrado (JS e páginas com o botão fixo) | 🔄 Em progresso | — | leitura do código |
| 176.4 | Mostrar e liberar o botão só para o professor | ⬜ Pendente | — | leitura + `node --check` |
| 176.5 | Atualizar a regra em `docs/regras/atividades.md` e o histórico | ⬜ Pendente | — | leitura |
| 176.6 | Encerrar: quadro, visualizador, 1 commit + push na `main` | ⬜ Pendente | — | `git push` sem erro |
| 176.7 | Aceite do usuário | ⬜ Pendente | — | — |
