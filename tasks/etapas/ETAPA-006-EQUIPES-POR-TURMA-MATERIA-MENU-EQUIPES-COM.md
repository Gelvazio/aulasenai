> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 6 — Equipes por turma + matéria: menu 👥 Equipes com CRUD nas atividades (pedida em 2026-10-05)

Plano: [docs/equipes-sala-de-aula.md](docs/equipes-sala-de-aula.md) · Atividade da ITIC:
`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/ATIVIDADE-COMUNICACAO-E-PRODUCAO-TEXTUAL.md`

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 6.1 | Plano em `docs/equipes-sala-de-aula.md` (escopo revisto: turma + matéria, menu nas atividades) | ✅ Concluído | 2026-10-05 07:40 | Arquivo |
| 6.2 | Plano completo da atividade em equipe com a seção Brainstorming (papéis definidos pelo líder e entregues ao professor) | ✅ Concluído | 2026-10-05 07:30 | Leitura do `.md` |
| 6.3 | SQL `database/2026-10-05-equipes-turma-materia.sql` | ✅ Concluído | 2026-10-05 07:35 | Leitura (idempotente, RLS) |
| 6.4 | Repositório, modal, CSS, ação do menu e `js/menu.js` com itens de ação | ✅ Concluído | 2026-10-05 07:38 | `node --check` + linhas ≤ 100 |
| 6.5 | ITIC: item 👥 Equipes no menu; menu aplicado na página do trabalho em equipe | ✅ Concluído | 2026-10-05 07:38 | `tags_menu.py` + `node --check` |
| 6.6 | `database.md`, relatório HTML e regra no `CLAUDE.md` (versão 2026-10-05 07:39) | ✅ Concluído | 2026-10-05 07:40 | Leitura; visualizador lê a mesma linha de versão |
| 6.7 | Commit local | ✅ Concluído | 2026-10-05 07:41 | `git commit` |
| 6.7a | Página `ATIVIDADE-GRANDE/brainstorming.html` (o que é, participantes, regras, etapas, técnicas, exemplo, uso na atividade, checklist) + item 🧠 Brainstorming no menu | ✅ Concluído | 2026-10-05 | Classes conferidas no CSS; `node --check` do menu |
| 6.7b | Conteúdo do brainstorming em Markdown (`ATIVIDADE-GRANDE/brainstorming.md`), igual à página HTML | ✅ Concluído | 2026-10-05 | Leitura: 8 seções + regra de ouro |
| 6.7c | `brainstorming.md` ampliado para o padrão Chalkie AI (objetivos, capacidades, avaliação, glossário, verificação, instruções e prompts para IA) | ✅ Concluído | 2026-10-05 | 14.167 caracteres (faixa 14.000–15.000) |
| 6.7d | `ATIVIDADE-GRANDE/ATIVIDADE-COMUNICACAO-SIMPLES.md`: explicação detalhada das páginas completa e simples do trabalho em equipe (comparação e pontos de atenção) | ✅ Concluído | 2026-10-05 | Conferido com a leitura dos dois HTML |
| 6.7e | Plano `ATIVIDADE-COMUNICACAO-E-PRODUCAO-TEXTUAL.md` sincronizado com a página do aluno (brainstorming 15 min, líder escolhido pela equipe, ficha + Apêndice A, roteiro de 8 etapas, 15 partes, seções 1–8); corrigido "18 → 19 itens" no `ATIVIDADE-COMUNICACAO-SIMPLES.md` | ✅ Concluído | 2026-10-05 | Comparação seção a seção com o HTML |
| 6.7f | Versão 2 simplificada do trabalho em equipe (`TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html`: 5 textos, 8 regras de formatação com onde clicar, rubrica simples) visível só para a turma 135081 (`assets/js/restricao-turma.js` lendo a `turmaaluno`) + item no menu + regra no `CLAUDE.md` | ✅ Concluído | 2026-10-05 13:17 | `node --check`; teste na tela fica com o professor |
| 6.7g | v2: nova história de logística (Rota Certa — endereço trocado, coletores sem driver, 38 pedidos errados, 70 caixas de diferença, FEFO, phishing), missão em 8 passos e textos 2–5 e rubrica adaptados | ✅ Concluído | 2026-10-05 | Nenhuma menção à história antiga (ERP/backup) na página |
| 6.8 | Aplicar o SQL no Supabase (pedido em 2026-10-05) | ✅ Concluído | 2026-10-05 | Leitura: 2 tabelas com RLS, 8 políticas, 2 triggers, 3 funções; anon sem acesso; matéria ITIC (id 25) identificada pelas atividades; 135080 (33 alunos) e 135081 (35) com vínculo e professor |
| 6.8a | Layout de celular das atividades (todas as matérias): menos margens, letras de 16 px, alternativas com 44 px de toque, botões de largura total, barra do usuário quebrando linha, tabelas roláveis, folha de respostas em 1 coluna, campos sem zoom, modal de equipes em tela cheia — só em `@media` (computador e impressão inalterados) | ✅ Concluído | 2026-10-05 | Chaves balanceadas nos 8 CSS; teste no celular fica com o professor |
| 6.8b | Layout de celular do índice de atividades (todas as matérias): cards em 1 coluna sem margens, botões de 44 px (principal na linha inteira), cadeado menor, barra da turma favorita, filtro "Fez atividade?", interruptor Bloquear e modal CADASTRAR ATIVIDADES — só em `@media` | ✅ Concluído | 2026-10-05 | Chaves balanceadas; teste no celular fica com o professor |
| 6.8c | Layout de celular da apostila (ITIC e Testes de Frontend): páginas montadas em A4 como no PDF e, depois (`body.apostila--paginada`), exibidas em modo leitura — largura da tela, altura livre, letra 16 px, tabelas roláveis, vídeo empilhado, botões largos; impressão inalterada | ✅ Concluído | 2026-10-05 | `node --check` + chaves balanceadas; teste no celular fica com o professor |
| 6.9 | Teste na tela pelo professor e aceite (equipes da turma 135080) | ⬜ Pendente | — | — |
