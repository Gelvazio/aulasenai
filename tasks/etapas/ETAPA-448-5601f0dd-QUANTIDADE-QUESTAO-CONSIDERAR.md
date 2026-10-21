## Etapa 448-5601f0dd — Campo "Quantidade Questão Considerar" por aluno (nota)

**Tarefa:** #319-5601f0dd-d00a-42de-af88-ff8d648479e1 · **Pedido em:** 2026-10-21 10:14 · **Criada por:** Claude Code (Opus 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "aqui abaixo do campo *Faltou*, adicione um campo de nome *Quantidade Questão Considerar*, este campo deve ser o campo que valida a quantidade de questão do aluno pra dar a nota, se nao houver nada, pega a quantidade do outro campo como faz hoje, senão pega deste campo, permitindo mudar a quantidade de questão por alunos" (com print da lista de alunos: "Quantidade Mínima de Questões: 30/30", "Confirmar Todas", "Faltou?")
**Objetivo:** o professor define, por aluno, quantas questões contam para a nota; vazio = usa a "Quantidade Mínima de Questões" como hoje.

### #319.1 — Levantar o funcionamento atual e escrever o plano (para aprovação)

**Próximo passo:** ler a tela da lista de alunos, a conta da nota e onde fica o mínimo por aluno.

- **Nível:** PESADO — banco (coluna/função da nota), regra de nota e mais de 3 arquivos ligados
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** plano com escopo, arquivos, banco, riscos e verificação.
- **Critérios de aceitação:** plano escrito nesta etapa e mostrado ao usuário.
- **Entrega:** — · **Verificação:** —
