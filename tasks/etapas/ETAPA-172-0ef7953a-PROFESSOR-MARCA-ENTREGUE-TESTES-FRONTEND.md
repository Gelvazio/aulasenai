## Etapa 172-0ef7953a — Professor marca a atividade do aluno como entregue (Testes de Front-End)

**Tarefa:** #45-0ef7953a-721d-49d0 · **Pedido em:** 2026-10-14 10:09 · **Executor:** Claude Code (local · main)
**Pedido:** "Nas Atividades, deve ser possivel o professor marcar 1 atividade como entregue, em
http://127.0.0.1:5500/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html,
crie tasks pra que isso seja feito em todas as materias,mas agora faça apenas na materia listada
acima"
**Objetivo:** o professor consegue marcar como entregue a atividade de um aluno que não clicou em
"Entregar", nas atividades objetivas e práticas. Agora só nas páginas de Testes de Front-End; as
demais matérias de todos os cursos de `MATERIAIS/` (menos `AGENDA_COLABORADOR`, que não é curso)
ficam nas tarefas #46 a #79 (etapas 173 a 206), uma por matéria.
**Próximo passo:** 172.1 — aguardar a aprovação do plano abaixo.

### Respostas do usuário (2026-10-14)

1. Botão "📨 Marcar como entregue" na tabela "Respostas dos alunos", na tentativa atual: **sim**.
2. Marca mesmo abaixo do mínimo (em branco = errada): **sim**.
3. Vale para quem nunca abriu (nota 0): **sim**.
4. Professor pode desfazer: **sim**.
5. Mostrar "Entregue pelo professor" (coluna nova): **sim**.
6. Liga por `data-marcar-entregue="sim"` no `<body>`: **sim** — "o botão deve existir em todas as
   páginas de atividades" (aqui: as 10 de Testes de Front-End).
7. Vale também para as práticas: **sim**.

### Escopo

- **Entra (banco):** coluna `entrega_atividade.entregue_por uuid` (nula = o aluno entregou);
  função `professor_marcar_entregue(p_aluno, p_atividade)` (`security definer`: só professor,
  só aluno que `professor_pode_ver_aluno`, grava a tentativa atual do aluno sem exigir o mínimo
  nem o horário, recusa se já entregue); função `professor_desmarcar_entregue(p_aluno,
  p_atividade)` (apaga só a entrega da tentativa atual feita pelo professor, e só se não houver
  tentativa nova liberada depois); `resumo_tentativas_atividade` passa a trazer também o aluno
  entregue sem nenhuma resposta (0 acertos) e o `entregue_por`. Política de INSERT da tabela
  **não muda** (o aluno continua igual). Seed em `database/` + `SEEDS-APLICADOS.md`.
- **Entra (tela):** módulo novo `assets/js/marcar-entregue-professor.js` (+ CSS) com o botão
  "📨 Marcar como entregue" / "↩️ Desfazer entrega" e a confirmação em popup.
  - Objetivas: tabela "Respostas dos alunos" (`respostas-atividade-professor.js`, só a chamada
    ao módulo — o arquivo tem 968 linhas): na linha "Aguardando a entrega" e na linha do aluno
    que não respondeu nada; status "📨 Entregue pelo professor".
  - Práticas (discursivas): painel "Progresso da turma" (`progresso-turma-global.js`), na
    situação do aluno não entregue; o painel passa a listar também os alunos das turmas da UC
    que não começaram (para o caso 3), só quando a página tiver o atributo.
  - Só aparece com `data-marcar-entregue="sim"` no `<body>` das 10 páginas de
    `TESTES-DE-FRONTEND/ATIVIDADES/` (5 objetivas e 5 práticas).
- **Entra (docs):** `docs/database.md` (+ `relatorio_verificacao_database.html`),
  `docs/regras/atividades.md`, `docs/HISTORICO-REGRAS.md` se mudar regra.
- **Não entra:** as demais matérias (#46 a #79); mudar a entrega feita pelo aluno.

### Riscos

- A função nova abre escrita do professor em `entrega_atividade`. Plano B: todas as checagens
  dentro da função (`eh_professor` + `professor_pode_ver_aluno`) e a política da tabela intacta.
- Mudar o retorno de `resumo_tentativas_atividade` exige `drop function` + `create`. Plano B:
  seed idempotente aplicado em transação; conferir a tela das objetivas logo depois.
- Desfazer uma entrega cuja nota já foi lançada (discursiva, "Finalizar Atividade"). Plano B: a
  função de desfazer recusa se já houver nota lançada naquela tentativa.
- Validação só por leitura, `node --check` e consultas ao banco (sem navegador): o teste na tela
  fica no aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 172.1 | Respostas do usuário e aprovação do plano | 👀 Aguardando o usuário | — | Respostas 1–7 acima (2026-10-14); falta o "sim" do plano |
| 172.2 | Seed do banco: coluna `entregue_por`, `professor_marcar_entregue`, `professor_desmarcar_entregue`, `resumo_tentativas_atividade` | ⬜ Pendente | — | Seed aplicado + consultas (`pg_proc`, colunas, políticas) |
| 172.3 | Módulo `marcar-entregue-professor.js` + CSS | ⬜ Pendente | — | `node --check` + leitura |
| 172.4 | Ligar o módulo na tabela "Respostas dos alunos" (objetivas) | ⬜ Pendente | — | `node --check`; arquivo < 1000 linhas |
| 172.5 | Ligar o módulo no "Progresso da turma" (práticas), com os alunos que não começaram | ⬜ Pendente | — | `node --check` + leitura |
| 172.6 | `data-marcar-entregue="sim"` nas 10 páginas de Testes de Front-End | ⬜ Pendente | — | Busca no código: 10 páginas |
| 172.7 | Documentação (`database.md`, relatório HTML, `regras/atividades.md`) | ⬜ Pendente | — | Leitura |
| 172.8 | Aceite do usuário (testar como professor: marcar, desfazer, aluno que nunca abriu, prática) | ⬜ Pendente | — | — |
