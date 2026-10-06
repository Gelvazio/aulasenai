# STATUS — Aulas SENAI

**Objetivo:** registrar, item por item, cada tarefa do projeto para que qualquer pessoa ou IA
retome o trabalho de onde parou.
**Partes interessadas:** Professor Gelvazio (decide, aprova e usa) · alunos (usam os materiais)
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · [Tarefas](TASKS.md)
**Próximo passo:** Etapa 24, item 24.6 — aceite do usuário (liberar a discursiva no índice e testar). Depois: Etapa 23, item 23.3 — aceite do usuário. Depois: Etapa 22, item 22.4 — aceite do usuário. Depois: Etapa 21, item 21.3 — aceite do usuário. Depois: Etapa 20, item 20.2 — professor criar a conta na página local. Depois: Etapa 19, item 19.4 — aceite do usuário. Depois: Etapa 18, item 18.2 — aprovação do plano `docs/vinculo-curso-turma-e-alunos-da-turma.md`. Pendentes anteriores: 6.9 e 4.5.

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## Escopo
- **Entra:** todas as tarefas pedidas pelo usuário neste repositório, a partir de 2026-10-03.
- **Não entra:** histórico anterior (está no Git, em `TASKS.md` e em `docs/`).
- **Critério de pronto:** item verificado, commit local feito e aceite do usuário.
- **Premissas e restrições:** regras do `CLAUDE.md` (sem navegador, sem push, um commit por tarefa).

## Etapa 1 — Atualizar `ANALISE-GERACAO-AULAS.md` do Técnico em Informática para Internet (pedida em 2026-10-03)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 1.1 | Levantar situação real das 20 pastas (ementa, `materia.json`, aulas, atividades, permissão) | ✅ Concluído | 2026-10-03 18:30 | Listagem das pastas + `STATUS-EMENTAS-CURSOS.md` |
| 1.2 | Reescrever `MATERIAIS/TECNICO-INFORMATICA-INTERNET/ANALISE-GERACAO-AULAS.md` conforme a ementa do curso | ✅ Concluído | 2026-10-03 18:30 | CH por UC conferida com a seção 5 da ementa (soma 1000 h) |
| 1.3 | Commit local | ✅ Concluído | 2026-10-03 18:31 | `git commit` |
| 1.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 2 — Apostila da ITIC (capítulos 02 a 10) e apostila de Testes de Frontend (pedida em 2026-10-03)

Plano: [docs/gerador-apostilas.md](docs/gerador-apostilas.md) · Regras: `CLAUDE.md` → REGRAS APOSTILAS ·
Status por capítulo: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/APOSTILA/STATUS-APOSTILA.md`
e `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/APOSTILA/STATUS-APOSTILA.md`.
Cada capítulo: fonte `CAPITULO-NN.md` → `--markdown` (conferência 100%) → HTML → status → commit.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 2.1 | ITIC — capítulo 02 (Hardware, Periféricos e SO) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `6919907` |
| 2.2 | ITIC — capítulo 03 (Navegação na Web e Pesquisa) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `c5abef5` |
| 2.3 | ITIC — capítulo 04 (Comunicação Digital e Nuvem) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `31572b0` |
| 2.4 | ITIC — capítulo 05 (Segurança da Informação) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `8845c55` |
| 2.5 | ITIC — capítulo 06 (Editor de Textos) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `6ed60df` |
| 2.6 | ITIC — capítulo 07 (Textos Técnicos) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `ffcd0f7` |
| 2.7 | ITIC — capítulo 08 (Planilhas: Organização e Fórmulas) | ✅ Concluído | 2026-10-03 | Conferência 201/201 · commit `0b55ea4` |
| 2.8 | ITIC — capítulo 09 (Planilhas: Análise Visual e Gráficos) | ✅ Concluído | 2026-10-03 18:54 | Conferência 201/201 · sem avisos · HTML gerado |
| 2.9 | ITIC — capítulo 10 (Editor de Apresentações e TIC + Avaliação) | ✅ Concluído | 2026-10-03 18:56 | Conferência 201/201 · sem avisos · 10/10 capítulos no plano |
| 2.10 | Testes de Frontend — ler a ementa da matéria e a UC na ementa do curso; `materia.json` completo e literal | ✅ Concluído | 2026-10-03 19:05 | UC na ementa do curso = ementa da matéria; acessibilidade (resumo) e recuperação ajustadas |
| 2.11 | Testes de Frontend — `INTRODUCAO.md`, Markdown completo e conferência 100% | ✅ Concluído | 2026-10-03 19:05 | Conferência 185/185 (100%) · conferidor generalizado; ITIC continua 278/278 |
| 2.12 | Testes de Frontend — capítulos 01 a 10 (um por vez, com commit e status a cada um) | ✅ Concluído | 2026-10-03 19:30 | Capítulos 01 a 10 gravados (commit por capítulo); conferência 185/185 mantida |
| 2.13 | Testes de Frontend — item "Apostila" no menu, status final | ✅ Concluído | 2026-10-03 19:31 | Link "📘 Apostila" na página da matéria (sem MENU-ATIVIDADES.js na pasta); STATUS-APOSTILA com os 10 capítulos 👀 |
| 2.14 | Aceite do usuário (as duas apostilas) | ⬜ Pendente | — | — |

## Etapa 3 — Regra "conteúdo só pelos Markdowns, nunca de PDF" no `CLAUDE.md` (pedida em 2026-10-03 20:47)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 3.1 | Acrescentar a regra (seção própria + item em "regras que valem sempre"), versão 2026-10-03 20:47 e linha no histórico | ✅ Concluído | 2026-10-03 20:49 | `node`: versão lida pelo regex do visualizador; nova seção `##` entra no índice (h2) |
| 3.2 | Tirar "slides" da fonte da atividade prática de Excel (só Markdown + ementa) | ✅ Concluído | 2026-10-03 20:49 | Leitura do trecho alterado |
| 3.3 | Commit local | ✅ Concluído | 2026-10-03 20:50 | `git commit` só com `CLAUDE.md` e `STATUS.md` |
| 3.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 4 — Regras "matéria modelo: Introdução à TIC" e "aulas extraídas da ementa em `CONTEUDO/`" (pedidas em 2026-10-03 20:52 e 20:55)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 4.1 | Registrar a regra "MATÉRIA MODELO: INTRODUÇÃO À TIC" (tabela das peças da ITIC) | ✅ Concluído | 2026-10-03 20:57 | Estrutura conferida na pasta da ITIC (listagem e `git ls-files`) |
| 4.2 | Registrar a regra "AULAS EXTRAÍDAS DA EMENTA EM `CONTEUDO/`" (1 aula/4 h, arredondar para cima, `AULA-NN-DESCRICAO-CURTA.md`, ordem aulas → atividades → apostila) | ✅ Concluído | 2026-10-03 20:57 | Leitura da seção; `node`: versão 20:55 e 3 seções novas no índice do visualizador |
| 4.3 | Apontar as fontes das 50 questões e da apostila para `CONTEUDO/`; nota de conflito na regra da pasta `AULAS/` | ✅ Concluído | 2026-10-03 20:57 | Leitura dos trechos alterados |
| 4.4 | Commit local | ✅ Concluído | 2026-10-03 20:58 | `git commit` só com `CLAUDE.md` e `STATUS.md` |
| 4.5 | Tirar as dúvidas da regra com o usuário e ajustar o texto conforme as respostas | 🔄 Em progresso | — | — |
| 4.6 | Aceite do usuário | ⬜ Pendente | — | — |

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

## Etapa 10 — Detalhar a "Missão da equipe" do trabalho em equipe da ITIC (pedida em 2026-10-05)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 10.1 | "Como a equipe executa a missão" (7 passos) e tabela com tudo o que o relatório técnico deve ter, em ordem (15 partes) | ✅ Concluído | 2026-10-05 | Leitura |
| 10.2 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 10.3 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 11 — Pasta na nuvem é tarefa do líder; demais atividades decididas em equipe (pedida em 2026-10-05)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 11.1 | Ajustar "Como a equipe executa a missão", papel do líder e roteiro | ✅ Concluído | 2026-10-05 | Leitura |
| 11.2 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 11.3 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 12 — Link "Slide Brainstorming" no trabalho em equipe da ITIC (pedida em 2026-10-05)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 12.1 | Link para `Brainstorming-Em-Equipe.pdf` (nova aba) na seção Brainstorming + estilo `.link-slide` | ✅ Concluído | 2026-10-05 | Arquivo PDF existe na pasta; leitura |
| 12.2 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 12.3 | Correção do usuário: o link vai no **card** do índice (depois de "Trabalho em Equipe"), não na página — link movido e estilo `.link-slide` removido | ✅ Concluído | 2026-10-05 | Leitura |
| 12.4 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 12.5 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 13 — Autorização dos responsáveis para uso do celular na aula (ITIC, trabalho em equipe) (pedida em 2026-10-05)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 13.1 | Gerar `ATIVIDADES/ATIVIDADE-GRANDE/AUTORIZACAO-USO-CELULAR-RESPONSAVEIS.docx` (Word, fora do Git pela regra `*.docx`) | ✅ Concluído | 2026-10-05 10:05 | Aberto no Word (somente leitura): 1 página A4 |
| 13.2 | Commit local (só o `STATUS.md`; o `.docx` é ignorado pelo Git) | ✅ Concluído | 2026-10-05 10:06 | `git commit` |
| 13.3 | Aceite do usuário | ⬜ Pendente | — | — |
| 13.4 | Nova seção pedida: celular usado só nas aulas e recolhido assim que o aluno retornar da escola | ✅ Concluído | 2026-10-05 10:20 | Aberto no Word |
| 13.5 | Um termo por aluno, com o nome preenchido (Muriel Machado, Carol Machado, Ariane do Nascimento, Ana Gabrieli Alves) | ✅ Concluído | 2026-10-05 10:20 | Aberto no Word: 4 páginas, 1 por aluno |
| 13.6 | Commit local (só o `STATUS.md`) | ✅ Concluído | 2026-10-05 10:21 | `git commit` |
| 13.7 | Documento vira pedido de liberação e entrega do celular à instituição de acolhimento; turma 135080 (AI AOPL 2026/2 M1) preenchida; campo do celular (marca, modelo, cor); recolhimento pelo responsável da instituição; assinaturas da instituição, professor e aluno | ✅ Concluído | 2026-10-05 10:40 | Aberto no Word: 4 páginas, 1 por aluno |
| 13.8 | Acrescentar Adriel Toresani Steffens, Josiel de Nascimento e Ederson de Souza Fausto (turma 135081 — AI AOPL 2026/2 V1, tarde) | ✅ Concluído | 2026-10-05 10:50 | Aberto no Word: 7 páginas, 1 por aluno |
| 13.9 | Documento único: lista dos 7 alunos no início (nº, nome, turma, celular, liberado Sim/Não) e depois o pedido uma vez só; gravado como `PEDIDO-CELULAR-INSTITUICAO-ACOLHIMENTO.docx` (o arquivo antigo estava aberto no Word) | ✅ Concluído | 2026-10-05 11:05 | Aberto no Word: 1 página A4 |

## Etapa 13 — Versão resumida do trabalho em equipe da ITIC (pedida em 2026-10-05)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 13.1 | `ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-SIMPLES.html` (resumo em até 2 páginas A4) + estilos `.pagina-simples` | ✅ Concluído | 2026-10-05 | Leitura; sem link no card nem no menu, a pedido do usuário |
| 13.2 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 13.3 | Aceite do usuário (confere se cabe em 2 páginas na impressão) | ⬜ Pendente | — | — |

## Etapa 14 — Botão "Exportar em Word" ao lado de cada exportar PDF (regra global) (pedida em 2026-10-05)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 14.1 | `assets/js/documento-word.js` (documento .doc MHTML, A4, rodapé com páginas, imagens embutidas) | ✅ Concluído | 2026-10-05 12:19 | `node --check` |
| 14.2 | `assets/js/exportar-word.js`: Word com o layout do PDF ao lado de `btnExportarPDF`, `btnExportarPDFGabarito` e `btnExportarGabarito` (42 páginas que usam o `atividade.js`); `avaliacao-pdf-professor.js` aceita o formato PDF/Word | ✅ Concluído | 2026-10-05 12:19 | `node --check`; sem nomes globais repetidos |
| 14.3 | `assets/js/exportar-word-pratica.js`: Word ao lado de cada "Imprimir / PDF" das práticas de Excel (capa + todas as questões, telas em PNG); `atividade-pratica-excel.js` reaproveita `montarImpressaoCompleta()` | ✅ Concluído | 2026-10-05 12:19 | `node --check` |
| 14.4 | Regra global "EXPORTAR EM WORD" no `CLAUDE.md` (versão 2026-10-05 12:19) + lista de `assets/` | ✅ Concluído | 2026-10-05 12:19 | Visualizador de regras lê a mesma linha de versão |
| 14.5 | Commit local | ✅ Concluído | 2026-10-05 12:19 | `git commit` |
| 14.6 | Aceite do usuário (testar no navegador: botão ao lado do PDF e abrir o .doc no Word) | ⬜ Pendente | — | Sem navegador nesta sessão (regra do usuário) |

## Etapa 15 — Sugestão de alunos por turma com botão "Confirmar" na `alunos.html` (pedida em 2026-10-05; plano `docs/sugestao-alunos-por-turma-confirmar.md`, aprovado em 2026-10-05; escopo ampliado com o filtro **Turma OK**)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 15.0 | Plano em `docs/` e aprovação do usuário | ✅ Concluído | 2026-10-05 13:22 | Resposta "PODE EXECUTAR" |
| 15.1 | Conferir funções e trigger usados (`eh_professor`, `professor_tem_turma`, `turmaaluno_exige_aluno`) | ✅ Concluído | 2026-10-05 13:22 | Leitura do SQL (`professor_tem_turma`, políticas da `turmaaluno`) |
| 15.2 | SQL `database/2026-10-05-sugestoes-turmaaluno.sql` (função `sugestoes_turmaaluno()`) | ✅ Concluído | 2026-10-05 13:22 | Leitura |
| 15.3 | `listarSugestoes()` no `turmas-aluno-repositorio.js` | ✅ Concluído | 2026-10-05 13:22 | `node --check` |
| 15.4 | Módulo `assets/js/turmas-aluno-sugestoes.js` (alunos sem turma + ✅ Confirmar) | ✅ Concluído | 2026-10-05 13:22 | `node --check` (linhas da tabela com Turma OK = Não) |
| 15.5 | Integração na `alunos.html`, `turmas-aluno-pagina.js` e CSS + filtro/coluna **Turma OK** (Sim/Não) | ✅ Concluído | 2026-10-05 13:22 | `node --check` + leitura; filtro e coluna Turma OK |
| 15.6 | `docs/database.md` + `relatorio_verificacao_database.html` | ✅ Concluído | 2026-10-05 13:22 | Leitura |
| 15.7 | Commit local | ✅ Concluído | 2026-10-05 13:22 | `git diff --cached --name-only` |
| 15.8 | Aplicar SQL no Supabase (só com pedido) e aceite do usuário | 🔄 Em progresso | — | SQL aplicado em 2026-10-05 13:36 pelo conector (0 alunos sem turma hoje); falta o aceite |

## Etapa 16 — Card do trabalho em equipe v2 no índice de atividades da ITIC (pedida em 2026-10-05)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 16.1 | Novo card "TRABALHO EM EQUIPE v2" em `INTRODUCAO-TIC/ATIVIDADES/index.html`, apontando para `ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html` | ✅ Concluído | 2026-10-05 | Leitura do HTML (link relativo existente) |
| 16.2 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 16.3 | Professor cadastrar a página v2 (e a v1) pelo CADASTRAR ATIVIDADES para aparecer o interruptor Bloquear | ⬜ Pendente | — | — |
| 16.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 16 — Card do trabalho em equipe v2 com bloqueio/liberação no índice da ITIC (pedida em 2026-10-05)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 16.1 | Novo card "TRABALHO EM EQUIPE v2" em `INTRODUCAO-TIC/ATIVIDADES/index.html` (link para `ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html`) | ✅ Concluído | 2026-10-05 | Leitura do HTML |
| 16.2 | SQL `database/2026-10-05-trabalho-equipe-itic-atividade.sql` cadastrando v1 e v2 na `atividade` (aula 07, ativo) para aparecer o interruptor Bloquear | ✅ Concluído | 2026-10-05 | Mesmo modelo dos seeds das práticas (`on conflict (pagina)`) |
| 16.3 | Commit local | ✅ Concluído | 2026-10-05 | `git commit` |
| 16.4 | Aplicar o SQL no Supabase (conector, a pedido do usuário) | ✅ Concluído | 2026-10-05 | Consulta: atividade ids 58 (v1) e 59 (v2), aula_id 27, ativo = true |
| 16.5 | Bloquear a v1 e deixar só a v2 liberada (pedido do usuário) | ✅ Concluído | 2026-10-05 | Consulta: id 58 (v1) ativo = false; id 59 (v2) ativo = true |
| 16.6 | Tirar `data-sem-bloqueio` do card da v1 (o atributo escondia o interruptor Bloquear) | ✅ Concluído | 2026-10-05 | Leitura do HTML: card v1 sem o atributo; página id 58 no banco |
| 16.7 | Nome "v1" no título do card do trabalho em equipe original | ✅ Concluído | 2026-10-05 | Leitura do HTML |
| 16.8 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 16 — Bloqueio de atividade por turma (turma favorita) (pedida em 2026-10-05; plano `docs/bloqueio-atividade-por-turma-favorita.md`, aprovado: "SIM, PODE EXECUTAR")
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 16.1 | SQL `database/2026-10-05-bloqueio-atividade-por-turma.sql` (coluna `atividade.bloqueio`, política, `definir_bloqueio_turma`) | ✅ Concluído | 2026-10-05 13:36 | Leitura + banco real conferido antes |
| 16.2 | Interruptor da turma favorita em `assets/js/indice-atividades-bloqueio.js` + evento em `indice-turma-favorita.js` | ✅ Concluído | 2026-10-05 13:36 | `node --check` |
| 16.3 | `docs/database.md` + `relatorio_verificacao_database.html` | ✅ Concluído | 2026-10-05 13:36 | Leitura |
| 16.4 | Regra no `CLAUDE.md` | ✅ Concluído | 2026-10-05 13:38 | Pedido do usuário; versão 2026-10-05 13:37; visualizador lê a mesma linha de versão |
| 16.5 | Aplicar o SQL no Supabase (pedido do usuário) | ✅ Concluído | 2026-10-05 13:36 | Conector Supabase; coluna, política e permissões conferidas |
| 16.6 | Commit local | ✅ Concluído | 2026-10-05 13:36 | `git diff --cached --name-only` |
| 16.7 | Aceite do usuário (bloquear/liberar uma atividade para a favorita e conferir com um aluno de outra turma) | ⬜ Pendente | — | Sem navegador nesta sessão |

## Etapa 17 — Relatórios com o bloqueio por turma (pedida em 2026-10-05; tarefa pequena)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 17.1 | `relatorio-atividades-dados.js`: lê `bloqueio`; média, total e conferência só com atividades liberadas para a turma | ✅ Concluído | 2026-10-05 13:37 | `node --check` |
| 17.2 | `relatorio-atividades-pagina.js`: contagem e conferência pela turma da aba | ✅ Concluído | 2026-10-05 13:37 | `node --check` |
| 17.3 | Commit local | ✅ Concluído | 2026-10-05 13:37 | `git diff --cached --name-only` |
| 17.4 | Aceite do usuário (bloquear uma atividade para uma turma e ver a média só dela mudar) | ⬜ Pendente | — | Sem navegador nesta sessão |

## Etapa 18 — Vínculo curso × turma e alunos da turma na `turmas.html` (pedida em 2026-10-06; plano `docs/vinculo-curso-turma-e-alunos-da-turma.md`, aguardando aprovação)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 18.1 | Conferir o banco real (turma.curso_id, RLS, grants) | ✅ Concluído | 2026-10-06 | Consultas de leitura no Supabase |
| 18.2 | Plano em `docs/` e aprovação do usuário | 🔄 Em progresso | — | — |
| 18.3 | SQL `definir_curso_turma` (aplicar só com pedido) | ⬜ Pendente | — | — |
| 18.4 | Repositório + tela (seção Curso × Turma e alunos da turma) | ⬜ Pendente | — | — |
| 18.5 | `database.md`, relatório, `CLAUDE.md`, commit | ⬜ Pendente | — | — |
| 18.6 | Teste e aceite do usuário | ⬜ Pendente | — | — |

## Etapa 19 — Editar o card da aula com a data da aula (pedida em 2026-10-06; tarefa pequena, sem mudança no banco)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 19.1 | Conferir no banco onde gravar a data (`aulas.data_planejada`, RLS: só professor altera) | ✅ Concluído | 2026-10-06 | Consulta de leitura no Supabase |
| 19.2 | Criar `assets/js/indice-aula-data.js` + `assets/css/indice-aula-data.css` (data no card + botão ✏️ Editar aula, só professor) e carregar pelo `atividades-crud-modal.js` | ✅ Concluído | 2026-10-06 | `node --check` OK; navegador não aberto (regra) |
| 19.3 | Commit local | ✅ Concluído | 2026-10-06 | `git commit` |
| 19.4 | Aceite do usuário (testar no navegador) | ⬜ Pendente | — | — |

## Etapa 20 — Aluna Bianca Pamela na turma QA LBTSN 2026/1 M2 (CEPLAS Manhã) (pedida em 2026-10-06; tarefa pequena)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 20.1 | Acrescentar a aluna (nº 12, `bianca.pamela@senai.local`, senha inicial gerada) em `scripts/LISTA-PRESENCA-CEPLAS-MANHA.js` (fora do Git, LGPD) | ✅ Concluído | 2026-10-06 | `node --check` OK; e-mail sem repetição nas listas |
| 20.2 | Criar a conta no Supabase Auth pela página `scripts/criarUsuariosBancoDados.html` | ⬜ Pendente | — | Feito pelo professor na página local |
| 20.3 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 21 — Filtro "Só alunos da turma selecionada acima" na `alunos.html` (pedida em 2026-10-06; tarefa pequena)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 21.1 | Caixa de marcar na tabela "Alunos por turma" que filtra pela turma escolhida no formulário (`alunos.html`, `assets/js/turmas-aluno-pagina.js`, `assets/css/turmas-aluno.css`) | ✅ Concluído | 2026-10-06 | `node --check` OK; navegador não aberto (regra) |
| 21.2 | Commit local | ✅ Concluído | 2026-10-06 | `git commit` |
| 21.3 | Aceite do usuário (testar no navegador) | ⬜ Pendente | — | — |

## Etapa 22 — Botão de olho para mostrar a senha no `login.html` (pedida em 2026-10-06; tarefa pequena)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 22.1 | Botão 👁 dentro do campo senha que mostra/oculta a senha digitada (`login.html`, `assets/css/login.css`, `js/login.js`, `docs/ORIENTACAO_JS_LOGIN.md`) | ✅ Concluído | 2026-10-06 | `node --check` OK; navegador não aberto (regra) |
| 22.2 | Commit local | ✅ Concluído | 2026-10-06 | `git commit` |
| 22.3 | Ícone muda conforme o estado: olho riscado com a senha oculta, olho aberto com a senha visível (SVG no `login.html`, troca pelo CSS via `aria-pressed`) | ✅ Concluído | 2026-10-06 | Leitura do código; navegador não aberto (regra) |
| 22.4 | Aceite do usuário (testar no navegador) | ⬜ Pendente | — | — |

## Etapa 22 — Data da aula também para os alunos no índice de atividades (pedida em 2026-10-06; tarefa pequena)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 22.1 | Conferir no banco a leitura como aluno (RLS de `atividade` e `aulas`) | ✅ Concluído | 2026-10-06 | Consulta simulando aluno da turma QA LBTSN: 5 aulas com data |
| 22.2 | `assets/js/indice-aula-data.js`: falha na checagem de professor não esconde mais as datas; card sem atividade legível busca a aula pelo número ("AULA NN") na mesma matéria | ✅ Concluído | 2026-10-06 | `node --check` OK; navegador não aberto (regra) |
| 22.3 | Commit local | ✅ Concluído | 2026-10-06 | `git commit` |
| 22.4 | Aceite do usuário (testar logado como aluno) | ⬜ Pendente | — | — |

## Etapa 23 — Mostrar as questões que faltam quando a atividade não está completa (pedida em 2026-10-06; tarefa pequena)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 23.1 | Recusa da entrega pelo banco passa a listar as questões sem alternativa gravada (1..`total_itens` × `resposta_atividade` da tentativa) em vez da mensagem genérica; aviso da página com a lista em linha própria (`assets/js/respostas-atividade-banco.js`, `assets/js/respostas-atividade.js`) | ✅ Concluído | 2026-10-06 | `node --check` OK; navegador não aberto (regra) |
| 23.2 | Commit local | ✅ Concluído | 2026-10-06 | `git commit` |
| 23.3 | Aceite do usuário (testar no navegador) | ⬜ Pendente | — | — |

## Etapa 24 — Reforço de Linguagens: regra de 25 questões e atividade da Aula 01 (pedida em 2026-10-06; tarefa média)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 24.1 | Regra exclusiva no `CLAUDE.md`: 25 questões por atividade (20 objetivas + 5 discursivas com Contexto, Comando e campo para digitar; correção com IA + análise do professor) | ✅ Concluído | 2026-10-06 09:21 | Versão e histórico atualizados; visualizador lê o mesmo formato |
| 24.2 | Decisão do formato: duas páginas por aula, sem mudar o banco | ✅ Concluído | 2026-10-06 | Resposta do usuário |
| 24.3 | `materia.json` da matéria (capacidades C1–C6 da UC 7 na ementa do curso) | ✅ Concluído | 2026-10-06 | Gerador leu sem erro |
| 24.4 | Aula 01: `ATIVIDADES-AULA-01-20-QUESTOES.html` (gabarito 5 de cada letra) + `ATIVIDADE-DISCURSIVA-AULA-01.html` (5 campos) + padrão de resposta; índice da matéria; seed do grupo no `scripts/gerar-seed-atividades.py` | ✅ Concluído | 2026-10-06 | 20 itens e 5 `textarea`; nenhum gabarito nos HTML |
| 24.5 | Aplicar os seeds no Supabase (objetivas primeiro, depois discursivas) | ✅ Concluído | 2026-10-06 | Consulta: atividade 60 (20 no gabarito, ativa) e 61 (5 tópicos, bloqueada), matéria no curso 6 |
| 24.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Riscos
| Risco | Chance | Impacto | Plano B | Situação |
|-------|--------|---------|---------|----------|

## Bloqueios
| Data | Item | Motivo | O que destrava | Resolvido em |
|------|------|--------|----------------|--------------|
| 2026-10-05 | 16.4 (regra no `CLAUDE.md`) | Edições do `CLAUDE.md` recusadas pelo usuário | Usuário dizer se a regra entra | 2026-10-05 13:38 |
| 2026-10-05 | 6.8 (SQL das equipes) | Nenhum conector do Supabase nesta sessão (só Claude Docs, visualize, MCP Finder) | Conectar o Supabase na sessão ou o professor rodar o SQL no SQL Editor | 2026-10-05 (conector conectado; SQL aplicado) |
| 2026-10-03 | Etapa 5 (Testes de Frontend) | Usuário pediu confirmação da regra de aulas em `CONTEUDO/` antes de continuar | Respostas do item 4.5 | — |

## Registro de decisões
| Data | Decisão | Quem | Por quê |
|------|---------|------|---------|
| 2026-10-06 | Reforço de Linguagens: 25 questões por atividade em duas páginas (20 objetivas + 5 discursivas), sem mudar o banco | Usuário | Regra exclusiva da matéria; banco aceita só um tipo por atividade |
| 2026-10-06 | Capacidades do `materia.json` de Reforço de Linguagens = 6 da UC 7 na ementa do curso (a ementa da matéria lista 7, diferentes) | Claude (regra "a ementa do curso vence") | Divergência avisada ao usuário |
| 2026-10-05 | Bloqueio por turma em `atividade.bloqueio` (JSON de códigos de turma); o interruptor vale só para a turma favorita; `ativo = false` continua bloqueando todas e, ao liberar uma inativa para a favorita, as outras turmas entram na lista | Usuário (pedido) + Claude (forma) | "As outras turmas não devem ser afetadas"; sem vínculo = liberado |
| 2026-10-05 | SQLs de sugestões (`turmaaluno`) e bloqueio por turma aplicados pelo conector do Supabase | Usuário | Pedido "aplique no Supabase usando MCP do Supabase" |
| 2026-10-05 | Alunos sem turma entram na própria tabela "Alunos por turma" com a coluna/filtro **Turma OK** (Sim/Não) e o botão ✅ Confirmar; turma sugerida vem do `user_metadata` (só sugestão) | Usuário (pedido) + Claude (forma) | Pedido durante a execução da Etapa 15; uma tabela só evita duplicar listas |
| 2026-10-05 | Equipes por turma + matéria, CRUD no modal do menu 👥 Equipes das atividades; nomes das equipes cadastrados pelo professor | Usuário | Pedido em 2026-10-05 (escopo revisto do plano inicial) |
| 2026-10-03 | Criar este `STATUS.md` na raiz | Claude (regra global) | Regra "STATUS.md em toda tarefa" |
| 2026-10-03 | Apostila de Testes de Frontend: cobertura mínima de **70%** (e não 80%, como dizem os slides das aulas 9 e 10) | Claude (regra "a ementa vence") | A ementa da matéria (SA 2 e avaliação prática) fixa 70%; slides divergentes seguem a ementa |
| 2026-10-03 | Testes de Frontend não tem `MENU-ATIVIDADES.js`: o link "📘 Apostila" foi posto nos botões da página da matéria (`index.html`) | Claude | Equivalente ao item de menu da ITIC, sem criar estrutura nova |
| 2026-10-03 | Vídeos em inglês nos capítulos 04 a 09 de Testes de Frontend, marcados "(em inglês)" no título | Claude | Não há vídeos em português de até 15 min para Testing Library, MSW, cobertura no Vitest, axe-core e Core Web Vitals |
| 2026-10-03 20:47 | Conferir e gerar conteúdo só pelos Markdowns (em primeiro lugar o `EMENTA-CHALKIE-AI.md`); nunca extrair dados de PDF | Usuário | Pedido durante a geração das aulas de Testes de Frontend; registrado no `CLAUDE.md` |
| 2026-10-03 20:52 | Introdução à TIC é a matéria modelo: toda peça de outra matéria segue a estrutura dela | Usuário | "Tudo está funcionando nela"; registrado no `CLAUDE.md` |
| 2026-10-03 20:55 | Aulas extraídas do `EMENTA-CHALKIE-AI.md` para `<MATERIA>/CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` (1 aula a cada 4 h, arredondando para cima); atividades e, no final, apostila lidas dessas aulas | Usuário | Registrado no `CLAUDE.md`; dúvidas de detalhe em aberto (item 4.5) |

## Pendências (ficou para depois)
| Item | Motivo | Quando retomar |
|------|--------|----------------|
| Botão "Exportar em Word" na apostila (`assets/js/apostila.js`) e nas páginas antigas com PDF próprio (`REFORCO_MATEMATICA.../AULAS/`) | Fora das atividades com `atividade.js`/`atividade-pratica-excel.js` | Quando forem mexidas ou a pedido do usuário |
| Destino da pasta `Testes de Sistemas-EXISTENTES` (não é UC do curso) | Decisão do usuário | Quando o usuário decidir |
| Renomear `BANCO_DE_DADOS` e `TESTES-DE-FRONTEND` para o padrão | Só a pedido do usuário | Quando o usuário pedir |
| Professor conferir o conteúdo dos vídeos das duas apostilas (coluna "Vídeos conferidos pelo professor") | Só o professor valida o conteúdo | Na validação das apostilas |

## Lições aprendidas
| Data | O que aconteceu | Lição / nova regra |
|------|-----------------|--------------------|
| 2026-10-03 | A análise de 2026-09-08 dizia ITIC presencial e Banco de Dados "completo" | Conferir sempre a ementa do curso e as pastas reais antes de afirmar situação |
| 2026-10-03 | Abri os slides em PDF da aula 01 para montar a aula | PDF nunca é fonte: conteúdo e conferência só pelos `.md` (ementa primeiro) — regra no `CLAUDE.md` |
