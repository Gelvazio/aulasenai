# STATUS — Aulas SENAI

**Objetivo:** registrar, item por item, cada tarefa do projeto para que qualquer pessoa ou IA
retome o trabalho de onde parou.
**Partes interessadas:** Professor Gelvazio (decide, aprova e usa) · alunos (usam os materiais)
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · [Tarefas](TASKS.md)
**Próximo passo:** Etapa 70, item 70.2 — perguntar ao usuário sobre mover o histórico de versões para `docs/HISTORICO-REGRAS.md`. Depois: Etapa 67, item 67.4 — aceite do usuário (conferir a duração dos 29 vídeos da apostila de Reforço de Linguagens). Depois: Etapa 64, item 64.6 — aceite do usuário (apostila de Reforço de Linguagens). Depois: Etapa 66, item 66.2 — aceite do usuário (menu da matéria). Depois: Etapa 63, item 63.2 — aceite do usuário (link do curso no índice). Depois: Etapa 62, item 62.2 — aceite do usuário (apostila de Testes de Frontend). Depois: Etapa 61, item 61.4 — aceite do usuário (autor, versão, data e hora na apostila da ITIC). Depois: Etapa 56, item 56.4 — aceite do usuário (atividades de sexta: objetiva de 100 e discursiva de 40). Depois: Etapa 51, item 51.3 — aceite do usuário (importar o .doc no Google Docs). Depois: Etapa 50, item 50.3 — aceite do usuário (header de professor comum sem os menus). Etapa 49, item 49.2 — criar a conta da professora Cintia em `criarUsuariosBancoDados.html`. Depois: Etapa 49, item 49.2 — criar a conta da professora Cintia na aba Professores de `criarUsuariosBancoDados.html`. Depois: Etapa 48, item 48.7 — o usuário preenche `docs/rotulos-aulas-ajustar.md` (rótulos "AULA NN") e pede para aplicar; depois 48.8 — aceite. Depois: Etapa 44, item 44.4 — aceite do usuário (liberar e testar a Prova Prática 06-10-2026). Depois: Etapa 38, item 38.3 — aceite do usuário (gabarito nas discursivas). Depois: Etapa 37, item 37.4 — aceite do usuário (testar Liberar gabaritos como professor e Exportar Gabarito como aluno). Depois: Etapa 35, item 35.2 — aceite do usuário (testar a tabela de notas logado como professor). Depois: Etapa 29, item 29.5 — aceite do usuário (discursivas de sexta). Depois: Etapa 28, item 28.2 — aprovação do plano do quadro de respostas. Depois: Etapa 27, item 27.7 — aceite do usuário (atividade individual da ITIC, sexta à tarde). Depois: Etapa 26 (Reforço de Linguagens, 10 aulas) — continuar do primeiro item não ✅. Depois: Etapa 25, item 25.4 — aceite do usuário (testar a página de pendências). Depois: Etapa 24, item 24.6 — aceite do usuário (liberar a discursiva no índice e testar). Depois: Etapa 23, item 23.3 — aceite do usuário. Depois: Etapa 22, item 22.4 — aceite do usuário. Depois: Etapa 21, item 21.3 — aceite do usuário. Depois: Etapa 20, item 20.2 — professor criar a conta na página local. Depois: Etapa 19, item 19.4 — aceite do usuário. Depois: Etapa 18, item 18.2 — aprovação do plano `docs/vinculo-curso-turma-e-alunos-da-turma.md`. Pendentes anteriores: 6.9 e 4.5.

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## Escopo
- **Entra:** todas as tarefas pedidas pelo usuário neste repositório, a partir de 2026-10-03.
- **Não entra:** histórico anterior (está no Git, em `TASKS.md` e em `docs/`).
- **Critério de pronto:** item verificado, commit local feito e aceite do usuário.
- **Premissas e restrições:** regras do `CLAUDE.md` (sem navegador, push só na nuvem — direto na `main` —, um commit por tarefa).

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

## Etapa 25 — Pendências de aulas (tabela `pendencias` + `AGENDA_COLABORADOR/pendencias.html` + menu do administrador) (pedida em 2026-10-06; plano `docs/pendencias-aulas-professor-administrador.md`)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 25.1 | Plano em `docs/pendencias-aulas-professor-administrador.md` | ✅ Concluído | 2026-10-06 | Arquivo criado |
| 25.2 | Aprovação do plano pelo usuário (com filtros por todos os campos e CRUD completo) | ✅ Concluído | 2026-10-06 | Resposta do usuário |
| 25.3 | Executar os passos 1 a 7 do plano (SQL aplicado no Supabase) | ✅ Concluído | 2026-10-06 09:50 | Consulta: 6 colunas, RLS, 3 políticas, sem anon/delete; `node --check` OK |
| 25.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 26 — Reforço de Linguagens: 10 aulas (uma por slide) e atividades das aulas 02 a 10 (aprovada em 2026-10-06; plano `docs/reforco-linguagens-10-aulas-e-atividades.md`)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 26.1 | Plano e decisões D1–D7 aprovados | ✅ Concluído | 2026-10-06 10:18 | Resposta do usuário |
| 26.2 | Regra no `CLAUDE.md` (10 aulas; fonte das atividades = `AULAS-CHALKIE-AI/CONTEUDO`) | ✅ Concluído | 2026-10-06 10:22 | Seção da matéria + versão 10:22; regras-modal lê o formato |
| 26.3 | Ementa da matéria (seção VI, tamanho) + status das ementas | ✅ Concluído | 2026-10-06 10:22 | Seção VI com 10 aulas; 14.866 caracteres |
| 26.4 | `materia.json` com as 10 aulas | ✅ Concluído | 2026-10-06 10:22 | 10 aulas, soma 63 h |
| 26.5 | Aulas antigas movidas para `AULAS/LEGADO-16-AULAS/` | ✅ Concluído | 2026-10-06 10:22 | 17 arquivos em LEGADO-16-AULAS (git mv) |
| 26.6 | 10 aulas em `REFORCO_LINGUAGENS/CONTEUDO/` com link dos slides | ✅ Concluído | 2026-10-06 10:46 | 10 aulas em CONTEUDO (6 h × 7 + 7 h × 3 = 63 h), cada uma com link do slide e dinâmica |
| 26.7 | `.gitignore` libera os PDFs de `AULAS-CHALKIE-AI/` | ✅ Concluído | 2026-10-06 10:22 | git check-ignore: PDFs liberados |
| 26.8 | `STATUS-AULAS.md` e `STATUS-ATIVIDADES.md` com 10 aulas | ✅ Concluído | 2026-10-06 10:28 | Os dois arquivos reescritos com 10 aulas |
| 26.9 | Aula 01: `Conteúdo-base` aponta para `AULAS-CHALKIE-AI/CONTEUDO` | ✅ Concluído | 2026-10-06 10:22 | Fontes e páginas da Aula 01 com Conteúdo-base e Slides novos |
| 26.10 | Atividades Aula 02 (20 + 5, seed aplicado) | ✅ Concluído | 2026-10-06 10:28 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 62 (20 no gabarito) e 63 (5 tópicos, bloqueada) |
| 26.11 | Atividades Aula 03 | ✅ Concluído | 2026-10-06 10:31 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 64 (20 no gabarito) e 65 (5 tópicos, bloqueada) |
| 26.12 | Atividades Aula 04 | ✅ Concluído | 2026-10-06 10:33 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 66 (20 no gabarito) e 67 (5 tópicos, bloqueada) |
| 26.13 | Atividades Aula 05 | ✅ Concluído | 2026-10-06 10:35 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 68 (20 no gabarito) e 69 (5 tópicos, bloqueada) |
| 26.14 | Atividades Aula 06 | ✅ Concluído | 2026-10-06 10:37 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 70 (20 no gabarito) e 71 (5 tópicos, bloqueada) |
| 26.15 | Atividades Aula 07 | ✅ Concluído | 2026-10-06 10:39 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 72 (20 no gabarito) e 73 (5 tópicos, bloqueada) |
| 26.16 | Atividades Aula 08 | ✅ Concluído | 2026-10-06 10:42 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 74 (20 no gabarito) e 75 (5 tópicos, bloqueada) |
| 26.17 | Atividades Aula 09 | ✅ Concluído | 2026-10-06 10:44 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 76 (20 no gabarito) e 77 (5 tópicos, bloqueada) |
| 26.18 | Atividades Aula 10 | ✅ Concluído | 2026-10-06 10:46 | Aula em CONTEUDO; 20 itens (5 por letra) e 5 discursivas; link dos slides; banco: atividades 78 (20 no gabarito) e 79 (5 tópicos, bloqueada) |
| 26.19 | Índice da matéria | ✅ Concluído | 2026-10-06 10:46 | Índice da matéria e do curso regerados só no Rio do Sul Mais Tech (21 páginas) |
| 26.20 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 27 — Pendências só pelo menu do Professor Administrador (pedida em 2026-10-06; tarefa pequena)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 27.1 | Regra no `CLAUDE.md` (sem índice/link público para `AGENDA_COLABORADOR`) | ✅ Concluído | 2026-10-06 10:53 | Versão das regras 2026-10-06 10:53 |
| 27.2 | Gerador de índices ignora `AGENDA_COLABORADOR` | ✅ Concluído | 2026-10-06 10:53 | `py_compile` OK |
| 27.3 | Remover os 2 índices gerados por engano em `AGENDA_COLABORADOR/` | ✅ Concluído | 2026-10-06 10:53 | `git status` da pasta limpo |
| 27.4 | Aceite do usuário | ⬜ Pendente | — | — |

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

## Etapa 27 — ITIC: atividade individual de sexta à tarde (40 objetivas) (pedida em 2026-10-06; tarefa pequena)

Entregável: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html`
(fonte em `ATIVIDADE-SEXTA-FEIRA/CONTEUDO/`, fora do Git). Conteúdo: trabalho em equipe v2 (`ATIVIDADE-GRANDE/`) e Aulas 01 a 07.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 27.1 | Fonte com 40 questões objetivas (gabarito 10 de cada letra, posição sorteada) | ✅ Concluído | 2026-10-06 | Fonte lida pelo gerador; `.gitignore` (`*QUESTOES.md`) |
| 27.2 | Página HTML pelo gerador (exportar PDF, PDF com gabarito do professor, Word, folha no banco) | ✅ Concluído | 2026-10-06 | 40 itens no HTML; sem gabarito embutido |
| 27.3 | Item no `MENU-ATIVIDADES.js`, `STATUS-ATIVIDADES.md` e seed (`database/2026-10-06-atividade-individual-comunicacao-seed-atividades.sql`, fora do Git) | ✅ Concluído | 2026-10-06 | `node` leu o menu; seed com 40 linhas de gabarito |
| 27.4 | Aplicar o seed no Supabase (sem ele a marcação das respostas fica bloqueada) | ✅ Concluído | 2026-10-06 | Atividade id 80 (aula 27), ativa e liberada para todas as turmas; 40 itens no gabarito (10 de cada letra) |
| 27.5 | Bloquear para a turma da manhã (135080) pela função `definir_bloqueio_turma`, como o Professor Administrador | ✅ Concluído | 2026-10-06 | `atividade.bloqueio` = ["135080"], `ativo` = true |
| 27.6 | Card da atividade no índice de atividades da ITIC (`ATIVIDADES/index.html`, feito à mão) | ✅ Concluído | 2026-10-06 | Card após o trabalho v2; só o link `.html` da atividade (o bloqueio por turma acha o card) |
| 27.7 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 28 — Quadro de respostas no início da atividade e na exportação (pedida em 2026-10-06; plano `docs/quadro-respostas-atividade.md`)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 28.1 | Plano em `docs/quadro-respostas-atividade.md` | ✅ Concluído | 2026-10-06 | — |
| 28.2 | Aprovação do plano pelo usuário | ⬜ Pendente | — | — |
| 28.3 | Execução dos passos 1 a 6 do plano | ⬜ Pendente | — | — |
| 28.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 29 — ITIC: atividade individual de sexta — 20 discursivas (pedida em 2026-10-06; tarefa pequena)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 29.1 | Fonte com 20 discursivas (Contexto, Comando, 1 tópico de 1,0) + padrão de resposta (`-GABARITO.md`, fora do Git), a partir das 40 objetivas | ✅ Concluído | 2026-10-06 | Gerador validou 20 questões, 20 tópicos, 20 pontos, 20 padrões |
| 29.2 | Página `ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA-DISCURSIVA.html` pelo gerador de discursivas | ✅ Concluído | 2026-10-06 | 20 itens; sem padrão de resposta no HTML |
| 29.3 | Card no índice da ITIC e item no `MENU-ATIVIDADES.js` | ✅ Concluído | 2026-10-06 | `node` leu o menu |
| 29.4 | Seed aplicado no Supabase e liberação só para a tarde (135081) pela função `definir_bloqueio_turma` — também na objetiva (id 80) | ✅ Concluído | 2026-10-06 | id 81: 20 tópicos, `bloqueio` = todas as turmas exceto 135081; id 80 igual |
| 29.5 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 30 — Curso de Gestão de Materiais no índice de cursos (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 30.1 | Rota do curso "Assistente em Processos de Gestão e Controle de Materiais" (nome no banco, id 7) para `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/` no `index.html` da raiz | ✅ Concluído | 2026-10-06 | Banco: turma 133933 → curso 7, vinculada ao professor |
| 30.2 | `index.html` da raiz restaurado (o gerador de índices o tinha trocado pela versão estática) e gerador corrigido para nunca sobrescrevê-lo | ✅ Concluído | 2026-10-06 | `py_compile` ok |
| 30.3 | Aceite do usuário | ✅ Concluído | 2026-10-06 | Usuário confirmou que o curso apareceu |

## Etapa 31 — Prova Prática 06-10-2026 de Análise de Dados (Aulas 01 a 05) — plano: [docs/prova-pratica-06-10-2026-analise-dados.md](docs/prova-pratica-06-10-2026-analise-dados.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 31.1 | Plano em `docs/` e aprovação do usuário | ✅ Concluído | 2026-10-06 | Aprovado; seed autorizado; fora da média final |
| 31.2 | Fonte com 10 questões discursivas (2 por aula) | ✅ Concluído | 2026-10-06 | 10 itens, 30 tópicos |
| 31.3 | Padrão de resposta detalhado para correção por IA (fora do Git) | ✅ Concluído | 2026-10-06 | 30 tópicos com resposta e critérios |
| 31.4 | Página HTML e seed pelo gerador | ✅ Concluído | 2026-10-06 | 10 questões, 30 tópicos, 10 pontos; padrão de resposta ausente do HTML |
| 31.5 | Card novo no índice, menu e `STATUS-ATIVIDADES.md` | ✅ Concluído | 2026-10-06 | `node` leu o menu |
| 31.6 | Seed no Supabase (só se autorizado) | ✅ Concluído | 2026-10-06 | Atividade id 82, bloqueada, 30 tópicos com padrão |
| 31.7 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 32 — Excluir aula (exclusão lógica, só Professor Administrador) — plano: [docs/excluir-aula-professor-administrador.md](docs/excluir-aula-professor-administrador.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 32.1 | Plano em `docs/` e aprovação do usuário | ✅ Concluído | 2026-10-06 | Aprovado com aplicação do SQL |
| 32.2 | SQL: coluna `aulas.excluido`, função `excluir_aula`, trigger | ✅ Concluído | 2026-10-06 | Idempotente, sem apagar dados |
| 32.3 | Aplicar no Supabase | ✅ Concluído | 2026-10-06 | 46 aulas com excluido = 0; trigger ativo; anon sem execução |
| 32.4 | Botão no modal, cards escondidos, filtro no CRUD | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador fica com o usuário |
| 32.5 | database.md, relatório HTML e CLAUDE.md | ✅ Concluído | 2026-10-06 | Versão 2026-10-06 14:29 |
| 32.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 33 — Média final de Análise de Dados: Aulas 01–03 = 10-LIVRE; Aulas 04–07 pelo banco (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 33.1 | `media-final.json` (Aulas 01–03 nota fixa 10 para todos com rótulo "10-LIVRE"; 06 e 07 sem nota fixa), gerador e JS da média com o rótulo, `notas-fixas-turma.js` sem 06/07 | ✅ Concluído | 2026-10-06 | Página regenerada: 01–03 = 10-LIVRE, 04–07 = "—" até o banco; `node --check` |
| 33.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 34 — Média final: aluno vê as próprias notas (Aulas 04–07, Objetiva, Prova Prática) — plano: [docs/media-final-notas-do-aluno.md](docs/media-final-notas-do-aluno.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 34.1 | Diagnóstico no banco e plano em `docs/`; aprovação do usuário | ✅ Concluído | 2026-10-06 | Aprovado, com SQL e com a tela de correção |
| 34.2 | SQL: `correcao_discursiva` + função `notas_media_final` | ✅ Concluído | 2026-10-06 | Idempotente |
| 34.3 | Aplicar no Supabase | ✅ Concluído | 2026-10-06 | Função conferida com um aluno real: Aulas 04/05/06 e Objetiva iguais ao cálculo direto; RLS ligado, 3 políticas, `anon` sem execução |
| 34.4 | JS do aluno na média final | ✅ Concluído | 2026-10-06 | `node --check` |
| 34.4b | Tela de correção da Prova Prática (professor) — escopo acrescentado na aprovação | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador fica com o usuário |
| 34.5 | Documentação (database.md, relatório, CLAUDE.md) | ✅ Concluído | 2026-10-06 | Versão das regras atualizada |
| 34.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 35 — Tabela "Notas dos alunos" (só professor) com exportar PDF na Avaliação Objetiva 01 de Análise de Dados (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 35.1 | `assets/js/tabela-notas-professor.js` + `assets/css/tabela-notas-professor.css`: nome e nota (melhor tentativa entregue) em ordem alfabética, da turma da aba do relatório, botão "📥 Exportar PDF (notas)" ao lado do título; ligado por `data-tabela-notas="sim"` (campo `- **Tabela de notas:** sim` no gerador de atividades) | ✅ Concluído | 2026-10-06 | `node --check` e `py_compile`; teste no navegador fica com o usuário |
| 35.2 | Aceite do usuário | ⬜ Pendente | — | — |


## Etapa 36 — Gabarito fora do alcance dos alunos, botões de Word e card bloqueado (tarefas pequenas, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 36.1 | Conferir gabarito nas páginas e no banco; gabarito UC1 TIC no Git, fora do site (`.vercelignore`) | ✅ Concluído | 2026-10-06 | grep nas páginas; RLS de `gabarito` lido no banco; commits `3ba2927`, `5e4894f`, `cc2a88f` |
| 36.2 | Remover os botões "Exportar em Word", "(respostas)" e "(gabarito)" | ✅ Concluído | 2026-10-06 | `node --check`; commits `87a4ecc`, `84b3061` |
| 36.3 | Card bloqueado inteiro inacessível (aluno e professor) | ✅ Concluído | 2026-10-06 | `node --check`; commits `1f3b819`, `21c36e7`; teste no navegador com o usuário |
| 36.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 37 — Liberar gabaritos por atividade e turma (botão do professor) — plano: [docs/liberacao-respostas-por-turma.md](docs/liberacao-respostas-por-turma.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 37.1 | Plano criado e apresentado | ✅ Concluído | 2026-10-06 | Plano em `docs/` |
| 37.2 | Aprovação do plano pelo usuário (recuperação bloqueada após liberar; aplicar SQL autorizado) | ✅ Concluído | 2026-10-06 | Resposta do usuário no chat |
| 37.3 | Executar os passos 1 a 7 do plano (+ aviso "Aguarde professor liberar os gabaritos", tabela `tentativaacessogabarito` e regra também nas atividades) | ✅ Concluído | 2026-10-06 | SQL aplicado e conferido por consultas de leitura; `node --check` nos JS; teste no navegador com o usuário |
| 37.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 38 — Regra do gabarito também nas discursivas (pedida em 2026-10-06; extensão do plano [docs/liberacao-respostas-por-turma.md](docs/liberacao-respostas-por-turma.md))
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 38.1 | SQL `solicitar_gabarito_discursivo` + funções internas, aplicado no Supabase | ✅ Concluído | 2026-10-06 | Permissões conferidas (anon sem execução; internas sem execução pela API) |
| 38.2 | Painel da discursiva: professor libera por turma; aluno "🔑 Ver Gabarito" (aviso + registro antes da liberação) | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador com o usuário |
| 38.3 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 39 — ID da atividade bloqueado no "Editar" do CADASTRAR ATIVIDADES (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 39.1 | Campo "ID da atividade" somente leitura no formulário (`assets/js/atividades-crud-modal.js`), preenchido ao clicar em ✏️ Editar; em branco na atividade nova | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador com o usuário |
| 39.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 40 — ID da atividade no card do índice e nome da atividade editável (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 40.1 | Professor vê "🆔 ID N · nome" em cada card do índice; campo "Nome da atividade" (`atividade.nome_atividade`) editável no CADASTRAR ATIVIDADES; lista do modal mostra ID e nome (`atividades-crud-modal.js`, `atividades-crud-repositorio.js`, `atividades-crud-modal.css`) | ✅ Concluído | 2026-10-06 | `node --check`; coluna `nome_atividade` aceita nulo (conferido no banco); teste no navegador com o usuário |
| 40.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 41 — Remover o botão "Banco Moodle (AVA SENAI)" de todas as atividades (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 41.1 | `atividade.js` deixa de carregar o botão; `exportar-banco-moodle.js` e `banco-moodle-xml.js` apagados; regra no `CLAUDE.md` | ✅ Concluído | 2026-10-06 | `node --check`; grep sem referências restantes nas páginas |
| 41.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 42 — Remover o botão "Exportar PDF com gabarito" (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 42.1 | Botão retirado das 12 páginas e do `gerar_atividades.py` (fica o "Exportar Gabarito" e a variante "📥 Gabarito") | ✅ Concluído | 2026-10-06 | grep: 0 páginas com o botão; `py_compile` e saída do gerador conferida; `node --check` |
| 42.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 43 — Análise das Provas Práticas id 37 × id 82 de Análise de Dados (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 43.1 | `ANALISE-PROVA-PRATICA.md` na pasta ATIVIDADES da matéria: comparação questão a questão, conteúdos exclusivos e observações (sem gabarito) | ✅ Concluído | 2026-10-06 | Perguntas lidas das 2 páginas e ids conferidos no banco |
| 43.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 44 — Prova Prática ADAG unificada (id 82, 20 discursivas, 100% das aulas) e exclusão da id 37 — plano: [docs/prova-pratica-adag-unificada-id82.md](docs/prova-pratica-adag-unificada-id82.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 44.1 | `PROVA-PRATICA-ADAG-SALETE.md` (20 questões, 60 tópicos, 10 pontos), padrão de resposta por tópico (fora do Git) e batimento com as 7 aulas | ✅ Concluído | 2026-10-06 | 20 itens/60 tópicos/10 pontos/60 padrões; batimento slide a slide com 6 lacunas fechadas |
| 44.2 | Aprovação do usuário para gerar a página, aplicar no banco e excluir a id 37 | ✅ Concluído | 2026-10-06 | "SIM, FAÇA ISSO" no chat |
| 44.3 | Passos 2 a 5 do plano (gerador com pontos configuráveis, página e banco da id 82, média final/índice/menu, exclusão da id 37 com backup) | ✅ Concluído | 2026-10-06 | id 82: 20 itens/60 tópicos/10 pontos no banco; id 37 = 0 linhas; backups conferidos; grep sem links para PROVA-PRATICA.html |
| 44.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 36 — Tabela "Notas dos alunos" (nome e nota, Exportar PDF) em todas as atividades (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 36.1 | `respostas-atividade-professor.js`: tabela ligada por padrão em toda atividade com relatório do professor (53 páginas de atividade em `MATERIAIS/`); `data-tabela-notas="nao"` desliga; CLAUDE.md atualizado | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador fica com o usuário |
| 36.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 45 — Log de gravação das alternativas em qualquer atividade (pedida em 2026-10-06) — plano: [docs/log-resposta-atividade.md](docs/log-resposta-atividade.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 45.1 | Tabela `log_resposta_atividade` + gatilho em `resposta_atividade`, aplicados no Supabase; carga inicial retirada (só registros novos, pedido do usuário) | ✅ Concluído | 2026-10-06 | 20 cliques novos registrados (MARCOU); 0 CARGA_INICIAL; RLS ligado; anon sem leitura |
| 45.2 | Documentação (`database.md`, relatório HTML, `CLAUDE.md`) | ✅ Concluído | 2026-10-06 | Leitura |
| 45.3 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 46 — Link "🧾 LOG" nos cards das atividades com o log das alternativas por aluno (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 46.1 | `assets/js/indice-log-alternativas.js` + `assets/css/indice-log-alternativas.css` (carregados pelo `atividades-crud-modal.js`): link pequeno "🧾 LOG" ao lado do link da atividade, só professor; modal com a lista de alunos (com nº de registros) e a tabela do log do aluno escolhido | ✅ Concluído | 2026-10-06 | `node --check`; 33 índices carregam o módulo; teste no navegador com o usuário |
| 46.2 | LOG bloqueado junto com a atividade bloqueada (pedido do usuário) | ✅ Concluído | 2026-10-06 | `node --check`; CSS sem clique no card bloqueado + checagem no clique |
| 46.3 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 47 — Trocar o rótulo e o nome do card no modal "✏️ Editar aula", além da data (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 47.1 | Coluna `aulas.nome_card` (`database/2026-10-06-aulas-nome-card.sql`, aplicada no Supabase a pedido do usuário) | ✅ Concluído | 2026-10-06 | Consulta em `information_schema.columns` |
| 47.2 | `assets/js/indice-aula-data.js`: campo "Nome do card" no modal, grava junto com a data e mostra o nome no `h2` do card (vazio = título do HTML) | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador com o usuário |
| 47.3 | Documentação (`CLAUDE.md`, `database.md`, relatório HTML) | ✅ Concluído | 2026-10-06 | Leitura |
| 47.4 | Campo "Rótulo do card" (o "AULA 01" do topo): coluna `aulas.rotulo_card` (aplicada no Supabase) + modal + documentação | ✅ Concluído | 2026-10-06 | `node --check`; consulta da coluna; teste no navegador com o usuário |
| 47.5 | Bug: cards que dividem a mesma aula mudavam juntos (35 × 82, aula 40). Regra "cada card ligado a apenas 1 aula" no `CLAUDE.md`; aula 40 só com a atividade 82 (33 → aula 67, 35 → aula 68; `database/2026-10-06-um-card-uma-aula-aula-40.sql`); aviso no modal quando a aula é compartilhada | ✅ Concluído | 2026-10-06 | Consulta no banco; `node --check`; levantamento dos cards × aulas de todos os índices |
| 47.6 | Separar as outras aulas compartilhadas | ✅ Concluído | 2026-10-06 | Feito na Etapa 48 |
| 47.7 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 47 — Exportar PDF no padrão SENAI nas discursivas (tarefa pequena, 2026-10-06)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 47.1 | `assets/js/exportar-pdf-discursiva.js` (carregado pelo `avaliacao-discursiva.js`): barra com "📥 Exportar PDF" + lista "Turma"; PDF com cabeçalho SENAI, capacidades, questões, tópicos e espaço de resposta; vale para todas as discursivas (ex.: Prova Prática 06-10-2026) | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador com o usuário |
| 47.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 48 — Card com 100% dos dados da tabela aulas + modal CRUD da aula (2026-10-06) — plano: [docs/card-dados-100-tabela-aulas.md](docs/card-dados-100-tabela-aulas.md)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 48.1 | Gerador de índices junta páginas da mesma aula num card (Reforço de Linguagens: 20 → 10 cards) | ✅ Concluído | 2026-10-06 | Índice regerado; demais índices sem mudança |
| 48.2 | Separar aulas compartilhadas (12 aulas novas, atividade 13 → aula 23) + backup `atividade_aula_backup_20261006` | ✅ Concluído | 2026-10-06 | Consulta: nenhuma aula em 2 cards |
| 48.3 | Copiar rótulo e nome atuais dos cards para `aulas.rotulo_card`/`nome_card` | ✅ Concluído | 2026-10-06 | Consulta: 0 aulas com atividade sem rótulo |
| 48.4 | Card lê só da `aulas` (`indice-aula-repositorio.js`, `indice-aula-data.js`) | ✅ Concluído | 2026-10-06 | `node --check` |
| 48.5 | Modal CRUD da aula com lista de atividades (Editar / Excluir / Nova) (`indice-aula-modal.js`, `atividades-crud-modal.js`) | ✅ Concluído | 2026-10-06 | `node --check`; teste no navegador com o usuário |
| 48.6 | Regras no `CLAUDE.md` (card 100% `aulas`, modal CRUD, rótulo "AULA NN", 1 card = 1 aula) | ✅ Concluído | 2026-10-06 | Leitura |
| 48.7 | Rótulos fora do padrão "AULA NN" (28 aulas) — decisão do usuário | ⬜ Pendente | — | Lista para o usuário preencher: `docs/rotulos-aulas-ajustar.md` |
| 48.8 | Aceite do usuário | ⬜ Pendente | — | — |


## Etapa 49 — Professora Cintia Simone Grimm no LISTA-PRESENCA-PROFESSOR.js (tarefa pequena, 2026-10-07)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 49.1 | Acrescentar `cintia.grimm@senai.local` (perfil PROFESSOR, senha inicial de 6 caracteres sem ambíguos) em `scripts/LISTA-PRESENCA-PROFESSOR.js` (fora do Git) | ✅ Concluído | 2026-10-07 | `node --check`; e-mail sem duplicidade nas listas |
| 49.2 | Professor criar a conta na aba Professores de `scripts/criarUsuariosBancoDados.html` | ⬜ Pendente | — | Coluna "Cadastrado" |

## Etapa 49 — Professora Cintia Simone Grimm no LISTA-PRESENCA-PROFESSOR.js (tarefa pequena, 2026-10-07)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 49.1 | Acrescentar `cintia.grimm@senai.local` (perfil PROFESSOR, senha inicial de 6 caracteres sem ambíguos) em `scripts/LISTA-PRESENCA-PROFESSOR.js` (fora do Git) | ✅ Concluído | 2026-10-07 | `node --check`; e-mail sem duplicidade nas listas |
| 49.2 | Professor criar a conta na aba Professores de `scripts/criarUsuariosBancoDados.html` | ⬜ Pendente | — | Coluna "Cadastrado" |

## Etapa 50 — Menus USUARIOS/RELATORIOS/ALUNOS/CORREÇÃO só para o Professor Administrador (tarefa pequena, 2026-10-07)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 50.1 | Mover os 4 itens para `MENU_ADMINISTRADOR_HEADER` (`js/header-usuario.js`); `<nav>` vazio escondido (`assets/css/header-usuario.css`) | ✅ Concluído | 2026-10-07 | `node --check` |
| 50.2 | Regras no `CLAUDE.md` (versão 2026-10-07 09:00) | ✅ Concluído | 2026-10-07 | Leitura; formato da versão aceito pelo `regras-modal.js` |
| 50.3 | Aceite do usuário (entrar como professor comum e como administrador) | ⬜ Pendente | — | — |

## Etapa 51 — Resolução modelo do Trabalho em Equipe v2 (Grupo 04) em .doc para Google Docs (tarefa pequena, 2026-10-07)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 51.1 | `RESOLUCAO/` no `.gitignore` e no `.vercelignore` (é a resposta modelo, só do professor) | ✅ Concluído | 2026-10-07 14:45 | `git check-ignore` |
| 51.2 | Gerar `ATIVIDADE-GRANDE/RESOLUCAO/RESOLUCAO-ATIVIDADE-GRUPO-04.doc` (Word 97-2003, abre no Google Docs): capa, sumário, introdução, Textos 1 a 5, referência, 8 regras de formatação | ✅ Concluído | 2026-10-07 14:50 | Word (COM): 10 páginas, sumário com 13 títulos; arquivo fora do Git |
| 51.2a | Nomes reais do Grupo 04 (4 integrantes: líder também revisora, introdução pela equipe) no `.doc` | ✅ Concluído | 2026-10-07 15:10 | Word (COM): 10 páginas, nenhum nome fictício restante |
| 51.2b | Papéis do Grupo 04 conforme o usuário (Lousclarita líder e revisora, Stephanie formatadora, Vitória pesquisadora, Yusbelis redatora) em todo o `.doc` | ✅ Concluído | 2026-10-07 15:25 | Word (COM): tabela de integrantes conferida, 10 páginas |
| 51.3 | Aceite do usuário (importar no Google Docs) | ⬜ Pendente | — | — |

## Etapa 52 — ITIC: nova atividade de sexta — 50 objetivas a partir da apostila (capítulos 01 a 07) (tarefa pequena, 2026-10-07)

Entregável: `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07.html`
(fonte `ATIVIDADE-SEXTA-FEIRA/CONTEUDO/ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07-QUESTOES.md`, fora do Git). Conteúdo: `APOSTILA/APOSTILA-INTRODUCAO-TIC.md`, capítulos 01 a 07. Decisões do usuário: nova atividade (as atuais ficam), 50 objetivas, seed aplicado e liberada para todas as turmas.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 52.1 | Ler a apostila (capítulos 01 a 07) | ✅ Concluído | 2026-10-07 | Capítulos 01 a 07 lidos |
| 52.2 | Fonte com 50 objetivas (gabarito 12–13 de cada letra, posição sorteada) | ✅ Concluído | 2026-10-07 | A 13, B 13, C 12, D 12; fora do Git (`*QUESTOES.md`) |
| 52.3 | Página HTML pelo gerador | ✅ Concluído | 2026-10-07 | 50 itens; sem gabarito no HTML |
| 52.4 | Seed (`scripts/gerar-seed-atividades.py`, aula 20; `database/2026-10-07-atividade-individual-apostila-seed-atividades.sql`, fora do Git), menu e card no índice | ✅ Concluído | 2026-10-07 | `node` leu o menu (11 itens); card após a discursiva |
| 52.5 | Aplicar o seed no Supabase e, a pedido do usuário, bloquear até sexta as 3 atividades (80, 81 e a nova) para todas as turmas pela `definir_bloqueio_turma` | ✅ Concluído | 2026-10-07 | id 85: 50 itens no gabarito (A13 B13 C12 D12); 80, 81 e 85 com as 5 turmas em `bloqueio`. Liberar na sexta pelo interruptor do índice |
| 52.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 53 — Bug: professor via respostas dos alunos nos campos da atividade (tarefa pequena — correção de bug, 2026-10-07)

Causa: as leituras de `resposta_discursiva`, `resposta_atividade`, `entrega_atividade` e `liberacao_atividade` filtravam só atividade e tentativa; como o RLS deixa o professor ler os alunos das turmas dele, as respostas dos alunos (ex.: 2 entregas na discursiva id 81) caíam nos campos da página do professor.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 53.1 | Filtrar por `aluno_id` do usuário logado em `assets/js/respostas-discursivas-banco.js` (tentativa, respostas, entrega, conferência) | ✅ Concluído | 2026-10-07 | `node --check` ok |
| 53.2 | Mesmo filtro em `assets/js/respostas-atividade-banco.js` (objetivas) | ✅ Concluído | 2026-10-07 | `node --check` ok; grep sem leituras sem `aluno_id` (o índice "Fez atividade?" só roda para aluno) |
| 53.3 | Aceite do usuário (abrir como professor e ver os campos vazios) | ⬜ Pendente | — | — |

## Etapa 54 — Combo "Aluno" do professor nas discursivas (tarefa pequena, 2026-10-07)

Pedido: na discursiva de sexta, um combo de alunos para o professor carregar as respostas de cada um. Feito de forma genérica: vale para **todas** as discursivas, sem regerar páginas.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 54.1 | `assets/js/respostas-aluno-discursiva.js` + `assets/css/respostas-aluno-discursiva.css`: combo com quem respondeu (nome, tentativa, entregue ou não); ao escolher, carrega as respostas nos campos (somente leitura) | ✅ Concluído | 2026-10-07 | `node --check` ok; consulta com RLS do professor devolveu Juan e Vitor (20 tópicos cada) |
| 54.2 | `assets/js/avaliacao-discursiva.js` carrega o módulo só para o professor | ✅ Concluído | 2026-10-07 | `node --check` ok |
| 54.3 | Aceite do usuário (abrir a discursiva como professor e escolher um aluno) | ⬜ Pendente | — | — |

## Etapa 55 — ITIC sexta: alternativas reescritas para a correta não ser sempre a mais longa (tarefa pequena, 2026-10-07)

Fontes (fora do Git): `ATIVIDADE-SEXTA-FEIRA/CONTEUDO/ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07-QUESTOES.md` (id 85) e `ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA-QUESTOES.md` (id 80). Só o texto das alternativas muda; as letras do gabarito ficam iguais (banco não muda).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 55.1 | Reescrever alternativas da atividade da apostila (50) e os 3 comandos repetidos "Qual é a conduta correta?" | ✅ Concluído | 2026-10-07 | Correta = mais longa: 33 → 11 de 50; sem comando repetido |
| 55.2 | Reescrever alternativas da atividade de Comunicação Técnica (40) | ✅ Concluído | 2026-10-07 | Correta = mais longa: 26 → 9 de 40 |
| 55.3 | Regerar as 2 páginas HTML pelo gerador | ⛔ Bloqueado | — | Substituído pelo pedido de juntar tudo em 100 questões (Etapa 56) |
| 55.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 56 — ITIC sexta: atividade objetiva única de 100 questões (Aulas 01 a 07) — plano: [docs/itic-sexta-atividade-unica-100-questoes.md](docs/itic-sexta-atividade-unica-100-questoes.md)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 56.1 | Plano em `docs/` | ✅ Concluído | 2026-10-07 | Banco consultado: id 80 tem 3 entregas; id 85 sem respostas |
| 56.2 | Aprovação do plano pelo usuário | ✅ Concluído | 2026-10-07 | Aprovado com a ampliação da discursiva id 81 no lugar (manter respostas dos 2 alunos) e reabertura das 2 entregas |
| 56.3 | Execução dos passos 1 a 12 do plano | ✅ Concluído | 2026-10-07 | Objetiva id 85: 100 itens (50 da apostila + 12 das 40 + 38 novas), 25 de cada letra, todas com resposta localizada na apostila; gabarito aplicado (backup `gabarito_backup_20261007`). Discursiva id 81: 40 tópicos (ITEM 04, 09, 13, 14, 18, 19 e 20 ajustados à apostila; 21–40 novos), backup `topico_discursivo_backup_20261007` e `entrega_atividade_backup_20261007`, 2 entregas reabertas, 40 respostas mantidas. Índice e menu só com as 2; id 80 fora do índice |
| 56.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 57 — Aviso "sem computador/celular, só a apostila" na discursiva de sexta (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 57.1 | Campo opcional `- **Aviso:**` no gerador de discursivas (caixa `.aviso-atividade` no início da página, `assets/css/avaliacao-discursiva.css`) e o mesmo aviso no PDF (`assets/js/exportar-pdf-discursiva.js`) | ✅ Concluído | 2026-10-07 | `py_compile` e `node --check` ok |
| 57.2 | Aviso na fonte da discursiva id 81 e página regerada (tópicos sem mudança, banco não alterado) | ✅ Concluído | 2026-10-07 | Aviso na linha 29 do HTML, antes das instruções |
| 57.3 | Aceite do usuário (abrir a página e exportar o PDF) | ⬜ Pendente | — | — |

## Etapa 58 — Discursiva de sexta reduzida para 30 questões (cabe em 4 h) (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 58.1 | Fonte e padrão de resposta: ITEM 01 a 20 iguais; dos novos ficaram 10 (antigos 25, 27, 28, 30, 32, 33, 35, 36, 38, 39 → 21 a 30); duração 195–225 min | ✅ Concluído | 2026-10-07 | Gerador: 30 questões, 30 tópicos, 30 pontos |
| 58.2 | Banco (id 81): backup `topico_discursivo_backup_20261007_40`, 10 tópicos removidos, 10 renumerados, `total_itens` = 30 | ✅ Concluído | 2026-10-07 | 30 tópicos, 30 pontos; as 40 respostas dos 2 alunos (itens 01–20) mantidas; nenhuma resposta nos itens removidos |
| 58.3 | Página regerada, card do índice, menu e `STATUS-ATIVIDADES.md` | ✅ Concluído | 2026-10-07 | `node` lê o menu |
| 58.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 59 — Turma 135081 responde até 17h15 (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 59.1 | `turma.hora_fim` da 135081 (AI AOPL 2026/2 V1 · Tarde) de 17:00 para 17:15, a pedido do usuário; vale para todas as atividades e avaliações da turma. Fora do horário continua bloqueado (nenhum aluno em `atividade_liberada_fora_horario` nas ids 81 e 85) | ✅ Concluído | 2026-10-07 | Consulta: 13:00–17:15 |
| 59.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 60 — Atividades de sexta liberadas para a manhã (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 60.1 | Turma 135080 (AI AOPL 2026/2 M1) retirada de `atividade.bloqueio` nas ids 85 (objetiva de 100) e 81 (discursiva de 30), a pedido do usuário; continuam bloqueadas para 122552, 133933 e QA LBTSN 2026/1 M2. A manhã responde só no horário dela (07:15–11:15) | ✅ Concluído | 2026-10-07 | Consulta: manhã e tarde liberadas nas duas |
| 60.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 55 — Combo "Aluno" do professor também nas objetivas (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 55.1 | Módulo da Etapa 54 tornado genérico: `respostas-aluno-discursiva.js/.css` → `assets/js/respostas-aluno-professor.js` + `assets/css/respostas-aluno-professor.css` (tabela, colunas e conversão vêm de quem chama) | ✅ Concluído | 2026-10-07 | `node --check` ok |
| 55.2 | Discursivas usam o módulo genérico (`avaliacao-discursiva.js`) | ✅ Concluído | 2026-10-07 | `node --check` ok |
| 55.3 | Objetivas: combo abaixo da identificação; ao escolher o aluno, destaca as alternativas dele (`respostas-atividade.js`) | ✅ Concluído | 2026-10-07 | `node --check` ok |
| 55.4 | Aceite do usuário (abrir uma objetiva como professor e escolher um aluno) | ⬜ Pendente | — | — |

## Etapa 61 — Data, hora, autor e versão nas apostilas (regra global; começa pela ITIC) (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 61.1 | Gerador: campos `autor_apostila` e `versao_apostila` obrigatórios no `materia.json`; capa e rodapé do HTML e cabeçalho do Markdown completo com autor, versão, data e hora | ✅ Concluído | 2026-10-07 20:15 | Gerador rodou sem erro; conferência 100% |
| 61.2 | ITIC: `autor_apostila` = Gelvazio Camargo, `versao_apostila` = 1.0; cabeçalho do Markdown completo atualizado; HTML regerado | ✅ Concluído | 2026-10-07 20:15 | HTML: quadro na capa (Gelvazio Camargo · 1.0 · 07/10/2026 às 20:12) e rodapé "Versão 1.0"; linha igual no Markdown. O `APOSTILA-INTRODUCAO-TIC.pdf` antigo não tem os dados (reexportar pelo botão) |
| 61.3 | Regra registrada no `CLAUDE.md` do projeto (REGRAS APOSTILAS, versão 2026-10-07 20:15) e no global | ✅ Concluído | 2026-10-07 20:15 | Leitura das seções; visualizador lê a versão no mesmo formato |
| 61.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 62 — Autor, versão, data e hora na apostila de Testes de Frontend (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 62.1 | `materia.json`: `autor_apostila` = Gelvazio Camargo, `versao_apostila` = 1.0; HTML regerado (capa, rodapé e Markdown). Corrigido no gerador: comentário `# ...` dentro de bloco de código (YAML do cap. 09) era lido como título de capítulo no Markdown completo | ✅ Concluído | 2026-10-07 20:20 | Conferência 100%; 10 capítulos lidos; capa e rodapé com Gelvazio Camargo · 1.0 |
| 62.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 63 — Link do curso "Técnico em Desenvolvimento de Sistemas" no índice de cursos (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 63.1 | A rota apontava para `MATERIAIS/TECNICO-DESENVOLVIMENTO-SISTEMAS/` (pasta movida para `C:\fontes\BACKUP-CURSOS-SENAI`). A pedido do usuário ("novo nome do curso: TECNICO-INFORMATICA-INTERNET"), as duas rotas do curso no `index.html` da raiz passam a abrir `MATERIAIS/TECNICO-INFORMATICA-INTERNET/index.html`. Banco não alterado (curso id 3 sem turmas) | ✅ Concluído | 2026-10-07 20:25 | `node`: JSON de rotas válido; pasta de destino existe |
| 63.2 | Aceite do usuário (abrir o card no índice) | ⬜ Pendente | — | — |

## Etapa 64 — Apostila de Reforço de Linguagens (pedida em 2026-10-07)

Plano: [docs/apostila-reforco-linguagens.md](docs/apostila-reforco-linguagens.md) · Status por capítulo:
`MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/APOSTILA/STATUS-APOSTILA.md`.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 64.1 | Ementa da matéria com as 6 capacidades da UC 7 da ementa do curso (decisão do usuário); `STATUS-EMENTAS.md` e `STATUS-EMENTAS-CURSOS.md` | ✅ Concluído | 2026-10-07 20:20 | 14.929 caracteres (dentro de 14.800–14.950) |
| 64.2 | `materia.json` completo e literal (objetivo, justificativa, conhecimentos, 7 módulos, textos da ementa, avaliação, BNCC, prompts, indicadores) | ✅ Concluído | 2026-10-07 20:20 | Conferência 138/138 (100%) |
| 64.3 | Gerador: carga horária por aula (6 h/7 h), ementa em listas, vídeos pendentes; ITIC e Testes de Frontend sem mudança | ✅ Concluído | 2026-10-07 20:20 | ITIC 278/278 e TF 185/185; Markdown completo das duas idêntico antes e depois |
| 64.4 | Introdução + capítulos 01 a 10 (6 exercícios ITEM e 10 termos cada), Markdown completo e HTML | ✅ Concluído | 2026-10-07 20:20 | Gerador sem avisos de tema/capacidades · commit `da167c7` |
| 64.5 | Push (branch e `main`) | ✅ Concluído | 2026-10-07 20:30 | `main` em `72901c7` |
| 64.6 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 65 — Regra do push por ambiente (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 65.1 | `CLAUDE.md`: local = nunca fazer push; nuvem = sempre push direto na `main`, sem pull request e sem push forçado | ✅ Concluído | 2026-10-07 20:30 | Commit `72901c7` na `main` |
| 65.2 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 66 — Apostila no menu de atividades de Reforço de Linguagens (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 66.1 | `ATIVIDADES/MENU-ATIVIDADES.js` (Índice, 📘 Apostila, atividades por aula 20 + 5) e tags do menu no índice, nas 20 atividades e na apostila | ✅ Concluído | 2026-10-07 20:40 | `node`: 3 itens e 20 subitens; todas as páginas têm `<header>` · commit `bffa74a` |
| 66.2 | Aceite do usuário (abrir o menu numa atividade e clicar em Apostila) | ⬜ Pendente | — | — |

## Etapa 67 — Vídeos na apostila de Reforço de Linguagens + identificação (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 67.1 | 29 vídeos reais (busca na web; 2 a 3 por capítulo) com duração "a conferir" (YouTube bloqueado na nuvem; decisão do usuário) | ✅ Concluído | 2026-10-07 20:50 | HTML com 29 caixas de vídeo e o aviso "duração a conferir pelo professor" |
| 67.2 | Gerador aceita `a conferir` e não junta mais a linha seguinte ao canal de vídeo sem canal | ✅ Concluído | 2026-10-07 20:50 | ITIC e TF continuam lendo os mesmos vídeos |
| 67.3 | Merge da `main` (sem conflitos) e identificação da apostila: Gelvazio Camargo · versão 1.0 · data e hora | ✅ Concluído | 2026-10-07 20:50 | Conferência 100% · `main` em `e5972a9` |
| 67.4 | Aceite do usuário: conferir a duração de cada vídeo (trocar `a conferir` por `mm:ss` até 15 min ou apagar a linha) | ⬜ Pendente | — | — |

## Etapa 68 — Autor e versão em todas as apostilas + regra no CLAUDE.md (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 68.1 | Conferir as apostilas existentes: ITIC e Testes de Frontend já tinham `autor_apostila`/`versao_apostila`; faltava Reforço de Linguagens | ✅ Concluído | 2026-10-07 | grep nos 3 `materia.json` |
| 68.2 | Reforço de Linguagens: autor Gelvazio Camargo, versão 1.0 no `materia.json` e apostila HTML gerada de novo | ✅ Concluído | 2026-10-07 | Markdown com a linha "Autor · Versão · Data e hora"; HTML com o quadro na capa |
| 68.3 | Regra "IDENTIFICAÇÃO DA APOSTILA" (seção REGRAS APOSTILAS do `CLAUDE.md`): obrigatória em todas, preenchida antes da 1ª geração, padrão Gelvazio Camargo / 1.0; versão e histórico do CLAUDE.md | ✅ Concluído | 2026-10-07 | Linha de versão no formato lido pelo `regras-modal.js` |
| 68.4 | Aceite do usuário | ⬜ Pendente | — | — |

## Etapa 69 — Bloquear de novo 81 e 85 até sexta; conferir capa de Reforço (tarefa pequena, 2026-10-07)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 69.1 | Atividades 81 e 85 bloqueadas de novo para as 5 turmas pela `definir_bloqueio_turma` (outra sessão as tinha liberado para 135080 e 135081). Liberar na sexta pelo interruptor do índice | ✅ Concluído | 2026-10-07 | Função devolveu `bloqueada = true` para as 5 turmas nas duas |
| 69.2 | Atividade 80: respostas e entregas mantidas (decisão do usuário) | ✅ Concluído | 2026-10-07 | Nada alterado (3 entregas) |
| 69.3 | Capa da apostila de Reforço de Linguagens com Autor Gelvazio Camargo, Versão 1.0 e Data e hora 07/10/2026 às 20:49 (versão do merge, com os 29 vídeos); rodapé "Versão 1.0" | ✅ Concluído | 2026-10-07 | Lido no HTML gerado (`capa-apostila__identificacao`, `data-rodape`) |

## Etapa 70 — Reorganizar o CLAUDE.md: estrutura e manutenção (pedida em 2026-10-07)

Plano: [docs/reorganizar-claude-md-estrutura.md](docs/reorganizar-claude-md-estrutura.md). Uma alteração por vez, perguntando ao usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 70.1 | Dividir as regras em `docs/regras/` — escolha do usuário: "Núcleo + docs/regras". `CLAUDE.md` 2.748 → 640 linhas; 36 seções movidas para 6 arquivos; índice + proibições no `CLAUDE.md`; `regras-modal.js` carrega os arquivos do índice | ✅ Concluído | 2026-10-07 21:15 | Comparação linha a linha antes × depois: nenhum texto perdido; `node --check`; os 6 links do índice existem |
| 70.2 | Histórico de versões para `docs/HISTORICO-REGRAS.md` | 🔄 Em progresso | — | — |
| 70.3 | "Próximo passo" do `STATUS.md` em tabela de pendências | ⬜ Pendente | — | — |
| 70.4 | Versão das regras + commit | ⬜ Pendente | — | — |
| 70.5 | Aceite do usuário | ⬜ Pendente | — | — |
