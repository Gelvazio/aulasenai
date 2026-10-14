## Etapa 272-f2f0b579 — Progresso da Turma: ON/OFF "RECUPERAÇÃO" (nota menor que 7)

**Tarefa:** #145-f2f0b579-4fd4-4a40-996f · **Pedido em:** 2026-10-14 16:58 · **Executor:** Claude Code (local · main)
**Pedido:** "adicione 1 filtro no progresso da turma após, mostra quem faltou com a situacao,
RECUPERACAO DO TIPO ON/OFF, PRA QUEM TEM NOTA MENOR QUE 7" · "ADICIONE A TAREFA NO QUADRO E
PUBLIQUE"
**Objetivo:** no Progresso da Turma, depois do ON/OFF "Mostrar quem faltou", um ON/OFF
**"RECUPERAÇÃO"** para ver os alunos com nota menor que 7.
**Próximo passo:** 272.2 — criar o ON/OFF "RECUPERAÇÃO".

**Respostas (18:47):** "1-LIGADO - NOTA >=7, DESLIGADO NOTA < 7; 2-SO A NOTA FINAL; 3-SIM" → ligado mostra quem tem nota final ≥ 7; desligado, nota final < 7; só a nota final; abre desligado e fica lembrado no localStorage. Aluno **sem nota final** (não entregou ou IA ainda corrigindo) não é escondido por este filtro (senão, com "Tarefa Entregue?" desligado, a lista ficaria vazia).

### Perguntas feitas

- Ligado = mostra **só** quem tem nota < 7, ou desligado esconde esses alunos?
- Qual nota vale: a **nota final** (só de quem entregou) ou também a **nota parcial** de quem
  ainda não entregou? Quem está sem nota entra ou não?
- Padrão ao abrir: desligado? Lembrar no localStorage como os outros filtros (#142)?

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 272.1 | Detalhes com o usuário | ✅ Concluído | 2026-10-14 18:47 | Respostas acima |
| 272.2 | ON/OFF "RECUPERAÇÃO" depois do "Mostrar quem faltou" | 🔄 Em progresso | — | — |
| 272.3 | Aceite do usuário | ⬜ Pendente | — | — |
