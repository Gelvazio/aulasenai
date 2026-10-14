## Etapa 262-e70b4e44 — Filtro por quantidade de questões respondidas no Progresso da Turma

**Tarefa:** #135-e70b4e44-5906-4396 · **Pedido em:** 2026-10-14 15:35 · **Executor:** Claude Code (local · main)
**Pedido:** "AQUI, .../INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA-DISCURSIVA.html, NO Progresso da turma, CRIE UM FILTRO PRA LISTAR ALUNOS POR QUANTIDADE DE QUESTAO RESPONDIDA, DO TIPO COMBOBOX, COM OPCAO TODAS, E OPCOES, 5 OU MENOS, 10 OU MENOS E MAIS DE 5, A5 OU MENOS E MAIS DE 10, 20 OU MENOS E >= 15"
**Objetivo:** o professor filtrar a lista de alunos do Progresso da Turma pela quantidade de questões respondidas.
**Respostas (2026-10-14 15:37):** faixas "Todas / ≤5 / 6–10 / 11–15 / 16–20"; filtro em **todas as atividades** (módulo global).
**Próximo passo:** 262.3 — aceite do usuário (abrir uma atividade logado como professor e trocar a faixa).

Decisão (Claude, 2026-10-14 15:40): "questão respondida" = questão **completa** (todas as partes respondidas), o mesmo número da coluna Situação; numa discursiva ou objetiva (1 parte por questão) é a questão com resposta. O resumo da turma continua com todos os alunos; ao lado do combobox aparece "N de T alunos".

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 262.1 | Detalhes com o usuário (faixas do combobox; só esta página ou todas as atividades) | ✅ Concluído | 2026-10-14 15:37 | Respostas registradas acima |
| 262.2 | Combobox de filtro no Progresso da Turma (`assets/js/filtro-respondidas-progresso.js` + `progresso-turma-global.js` + CSS + regra em `docs/regras/atividades.md`) | ✅ Concluído | 2026-10-14 15:40 | `node --check` nos 2 JS; leitura: filtro só na lista (`desenharListaDeAlunosGlobal`), resumo inalterado, falha ao carregar o módulo não derruba o painel |
| 262.3 | Aceite do usuário (testar logado como professor) | 👀 Aguardando o usuário | — | — |
