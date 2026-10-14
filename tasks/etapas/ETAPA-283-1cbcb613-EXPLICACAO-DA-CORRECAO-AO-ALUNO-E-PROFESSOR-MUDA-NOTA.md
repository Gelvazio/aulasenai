## Etapa 283-1cbcb613 — Explicação da correção visível ao aluno e professor podendo mudar a opção

**Tarefa:** #156-1cbcb613-1423-4389-a6fa · **Pedido em:** 2026-10-14 19:39 · **Executor:** Claude Code (local · main)
**Pedido:** "se a pergunta for marcada como errada ou meia certa, deixe abaixo dela a explicação de IA do por que disso, visivel ao aluno, permita ao professor tambem poder mudar de opção, apos analise, pode ser que mude de errada pra meia certa, ou de meia certa pra certa" + "mas ao aluno, nao mostre que foi IA que corrigiu"
**Objetivo:** pergunta errada ou meia certa mostra abaixo a explicação do porquê (visível ao aluno, sem dizer que foi a IA); o professor pode trocar a opção depois de analisar (errada → meia certa, meia certa → certa).
**Próximo passo:** 283.1 — pedir detalhes ao usuário e escrever o plano (tarefa grande: mexe em nota, banco/trigger e segurança do aluno).

### Pontos que exigem decisão (tarefa grande: plano + aprovação)

- Hoje a nota do professor é **definitiva** (trigger `correcao_discursiva_validar`): trocar a opção exige mudar o trigger no banco.
- A explicação é o comentário da IA que hoje só o professor vê; mostrá-la ao aluno exige liberar a leitura (RLS) sem expor gabarito.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 283.1 | Pedir detalhes ao usuário e escrever o plano na etapa | 🔄 Em progresso | — | — |
| 283.2 | Aprovação do plano pelo usuário | ⬜ Pendente | — | — |
| 283.3 | Executar o plano aprovado | ⬜ Pendente | — | — |
| 283.4 | Aceite do usuário | ⬜ Pendente | — | — |
