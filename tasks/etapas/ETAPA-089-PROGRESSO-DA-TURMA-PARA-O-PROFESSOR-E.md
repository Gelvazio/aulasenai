> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 89 — Progresso da turma para o professor e nome da prova 08-10-2026 (Prova Prática ADAG id 82, tarefa pequena, 2026-10-08 14:34:44)

Pedido do usuário: barra de progresso por aluno e por questão, só para o professor, no topo da atividade, atualizada a cada 5 s — só nesta prova por enquanto, com a regra anotada no `CLAUDE.md` para todas as atividades; e corrigir **só no HTML** o nome da prova para 08-10-2026.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 89.1 | `assets/js/progresso-turma-discursiva.js` + `assets/css/progresso-turma-discursiva.css`: linha por aluno, célula por questão (sem resposta / em andamento / completa), barra do aluno e geral, entrega; atualiza a cada 5 s; carregado pelo `avaliacao-discursiva.js` só para o professor | ✅ Concluído | 2026-10-08 14:34:44 | `node --check` |
| 89.2 | Gerador: campo `Progresso para o professor: sim` → `data-progresso-professor`; ligado na prova e página regerada | ✅ Concluído | 2026-10-08 14:34:44 | `py_compile`; `git diff` só com o atributo novo no `<body>` |
| 89.3 | Nome da prova no HTML: "Prova Prática 06-10-2026" → "08-10-2026" (título, h1 e rodapé; nome do arquivo e banco sem mudança) | ✅ Concluído | 2026-10-08 14:34:44 | 3 trocas conferidas com `grep` |
| 89.4 | Regra no `CLAUDE.md` (versão + histórico) e em `docs/regras/atividades.md` | ✅ Concluído | 2026-10-08 14:34:44 | Leitura dos arquivos |
| 89.5 | Aceite do usuário (testar logado como professor: painel no topo, atualização a cada 5 s) | ⬜ Pendente | — | — |
