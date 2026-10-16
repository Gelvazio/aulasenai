## Etapa 338-3c6cc913 — #211: Vincular turmas às matérias

**Tarefa:** #211-3c6cc913-7d2d-4eac-bbc3-88094817cc2d · **Pedido em:** 2026-10-16 19:15 ·
**Criada por:** Claude Code (Opus 5.5) (local · main · s15)
**Pedido:** "http://127.0.0.1:5501/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html,
aqui, deve ser listado no combo de turma, apenas a turma da materia ITIC, crie em turmas.html, um
menu aqui de nome Materias, e 1 tabela no banco de dados que eu possa vincular a turma a materia,
e desta forma, na materia so deve listar a turma da materia e nao todas" (com print do cabeçalho
de `turmas.html`, marcando o espaço à direita do título para o botão "Matérias").
**Objetivo:** cada matéria mostrar no combo de turma só as turmas vinculadas a ela, com o vínculo
cadastrado pelo professor administrador em `turmas.html`.

### #211.1 — Levantamento e plano (tarefa grande: banco + tela)

**Próximo passo:** levantar `turmas.html`, o combo de turma das páginas de matéria e o schema
(`turma`, `materia`), escrever o plano nesta etapa e pedir aprovação.

- **Nível:** PESADO — banco (tabela nova + RLS) e várias partes ligadas
- **Descrição:** plano da tabela de vínculo, do botão "Matérias" em `turmas.html` e do filtro do
  combo de turma nas páginas de matéria.
- **Critérios de aceitação:** plano escrito nesta etapa e aprovado pelo usuário.
