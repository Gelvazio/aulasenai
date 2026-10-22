## Etapa 472-3b8e5d21 — Tabela "Notas dos alunos" ignora a quantidade de questões para a nota

**Tarefa:** #343-3b8e5d21-6c4a-4f17-8d92-5a1e7b3c9f04 · **Pedido em:** 2026-10-22 07:25 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "no quadro de notas dos alunos, nao esta pegando a nota mais alta do aluno, exemplo em
ATIVIDADES-AULA-01-50-QUESTOES.html, aluno Marcos Jose Avila Prieto, aparece com 4, mas em cima ele tem nota 10"
**Objetivo:** a tabela "Notas dos alunos" mostrar a mesma nota (melhor tentativa) do relatório de cima.

### #343.1 — Passar `questoesNota` ao calcular a nota na tabela

**Próximo passo:** nenhum (entregue).

- **Nível:** MEDIO — 1 arquivo JS com lógica
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `listarNotasDaTurma` (tabela-notas-professor.js) chamava `calcularNota` só com
  acertos/total, dividindo pelo total (50); o relatório de cima (`calcularNotaFinalAluno`) divide
  pelas questões para a nota (`questoesNota`). Resultado: 4 na tabela contra 10 em cima.
- **Entrega:** `assets/js/tabela-notas-professor.js` passa `questoesNota: linha.questoesNota`.
- **Verificação:** `node --check` ok; leitura confirma que as linhas já chegam com `questoesNota`
  (`acrescentarQuestoesNota`, respostas-atividade-professor.js:973). Conferir na tela: aluno Marcos
  deve mostrar 10.
