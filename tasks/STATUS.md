# STATUS — Aulas SENAI

**Objetivo:** registrar, item por item, cada tarefa do projeto para que qualquer pessoa ou IA
retome o trabalho de onde parou.
**Partes interessadas:** Professor Gelvazio (decide, aprova e usa) · alunos (usam os materiais)
**Links:** [Regras](../AGENTS.md) · [Modelo do quadro](../.claude/rules/tasks/quadro.md) · [Etapas](etapas/) · [Recados entre sessões](RECADOS.md)

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado · 👀 Aguardando o usuário

> **Cada informação em um lugar só** (`.claude/rules/tasks/quadro.md`): pedido, itens e **próximo
> passo** de cada tarefa ficam só na etapa dela (coluna Etapa); aqui fica o índice. O que o usuário
> precisa fazer = itens 👀 das etapas (aba TASKS do visualizador `.claude/rules/index.html`).

## 🧭 Frentes de trabalho

Uma linha por frente (ambiente · branch). Cada sessão atualiza **só a linha dela** ao começar e ao
parar; frente sem pendência → `⏹️ Encerrada`. O próximo passo de cada frente é o da etapa dela.

| Frente | Tarefa (etapa) | Situação | Atualizado em |
|---|---|---|---|
| nuvem · claude/festive-maxwell-25jnhl | #21 ([135-eeefc710](etapas/ETAPA-135-eeefc710-COLABORACAO-ENTRE-SESSOES.md)); a #20 passou para a frente verificar-status-pastas em 2026-10-10 16:27 | 🔄 Ativa | 2026-10-09 21:27 |
| nuvem · claude/verificar-status-pastas-c6s5yz | #20 ([125](etapas/ETAPA-125-BANCO-DE-DADOS-100-NO-PADRAO-DA.md)); etapas 137-b214e26b e 138-77338471 aguardam aceite | 🔄 Ativa | 2026-10-10 22:13 |
| nuvem · ccr-00f69e8a-6qcla9 | #26 ([144-aff33423](etapas/ETAPA-144-aff33423-REGRAS-NO-BANCO.md)); etapa 140-8554d88e aguarda o usuário | 🔄 Ativa | 2026-10-11 06:28 |
| nuvem · ccr-be208aef-c6h8oe | #24 ([142-2a52ee2f](etapas/ETAPA-142-2a52ee2f-FILA-TASKS-AGENDADOR-UNICO.md)) — cancelada em 2026-10-13 (fila do banco desativada, decisão D1 da #29) | 👀 Aguardando o usuário | 2026-10-11 06:00 |
| nuvem · claude/ola-zlzh8z | #22-f79be83e ([137-13665a7e](etapas/ETAPA-137-13665a7e-TESTES-DE-FRONT-END-AULAS-04-A-10.md)); ⛔ não mexer em Banco de Dados | 🔄 Ativa | 2026-10-10 16:21 |
| local · main | #32 ([159-a45aa9a6](etapas/ETAPA-159-a45aa9a6-DESAFIO-01-CASOS-DE-TESTE-LOGIN.md)) em execução; #31 plano aguardando aprovação; #27, #28, #29 e #30 aguardam aceite | 🔄 Ativa | 2026-10-14 08:32 |

## 📌 Tarefas

Status, prioridade e reserva oficiais (só aqui). **Em uso por** = frente que reservou a tarefa
(ninguém mais mexe nela até voltar a `—`). Prioridade e dependências são definidas pelo usuário.

| Tarefa | Título | Prioridade | Depende de | Status | Em uso por | Etapa |
|---|---|---|---|---|---|---|
| #2 | Apostilas só em Markdown (.md) | 🟠 Alta | — | 👀 Plano aguardando aprovação | — | [149-b8f5e662](etapas/ETAPA-149-b8f5e662-APOSTILAS-SO-EM-MARKDOWN-MD.md) |
| #4 | Preencher `PLANO-AULAS.md` em 8 disciplinas | 🟠 Alta | — | 👀 Aguardando liberação | — | [150-2ecf082a](etapas/ETAPA-150-2ecf082a-PREENCHER-PLANO-AULAS-MD-EM-8-DISCIPLINAS.md) |
| #5 | Organizar atividades em `ATIVIDADES/` | 🟡 Média | — | 👀 Aguardando liberação | — | [151-132192cf](etapas/ETAPA-151-132192cf-ORGANIZAR-ATIVIDADES-EM-ATIVIDADES.md) |
| #6 | Preencher `AVALIACOES/` | 🟡 Média | — | 👀 Aguardando liberação | — | [152-5b8be7d5](etapas/ETAPA-152-5b8be7d5-PREENCHER-AVALIACOES.md) |
| #7 | Executar análise final | 🟢 Baixa | — | 👀 Aguardando liberação | — | [153-d69eef66](etapas/ETAPA-153-d69eef66-EXECUTAR-ANALISE-FINAL.md) |
| #11 | Duração dos vídeos da apostila de Reforço de Linguagens (local) | 🟠 Alta | — | ⬜ Pendente (local) | — | [67](etapas/ETAPA-067-VIDEOS-NA-APOSTILA-DE-REFORCO-DE-LINGUAGENS.md) |
| #12 | Duração dos vídeos da apostila de Fundamentos da Tecnologia (local) | 🟡 Média | — | ⬜ Pendente (local) | — | [154-58b81f3e](etapas/ETAPA-154-58b81f3e-DURACAO-DOS-VIDEOS-DA-APOSTILA-DE-FUNDAMENTOS-DA.md) |
| #14 | Duração dos vídeos da apostila de Exploração de Carreiras (local) | 🟡 Média | — | ⬜ Pendente (local) | — | [155-e3d89d81](etapas/ETAPA-155-e3d89d81-DURACAO-DOS-VIDEOS-DA-APOSTILA-DE-EXPLORACAO-DE.md) |
| #15 | Apostila de ITIC versão 2 (até 40 páginas) — apostila única (V1 removida) | — | — | ✅ Concluído (aceite "15-ok") | — | [79](etapas/ETAPA-079-APOSTILA-DA-ITIC-VERSAO-2.md) |
| #16 | Bloqueio da AULA (`aulas.ativo`) × ON/OFF da atividade em todos os índices | 🟠 Alta | — | 🔄 Em andamento (matéria a matéria) | — | [114](etapas/ETAPA-114-TESTES-DE-FRONT-END-BLOQUEIO-DA-AULA.md) |
| #17 | Fechar a revisão das regras do `CLAUDE.md` (aceites 70.5, 72.8, 73.14 e decisões) | 🟡 Média | — | 👀 Aguardando aceites | — | [73](etapas/ETAPA-073-REVISAO-FINAL-DAS-REGRAS-PROBLEMAS-NOVOS-DESATUALIZADOS.md) · [70](etapas/ETAPA-070-REORGANIZAR-O-CLAUDE-MD-ESTRUTURA-E-MANUTENCAO.md) · [72](etapas/ETAPA-072-CORRIGIR-AS-CONTRADICOES-DO-CLAUDE-MD-UMA.md) |
| #18 | Progresso da turma global em todas as atividades | 🟠 Alta | — | ✅ Concluído (aceite "18-ok") | — | [121](etapas/ETAPA-121-PROGRESSO-DA-TURMA-GLOBAL-EM-TODAS-AS.md) |
| #19-91cbac65-87ca-45a0 | Análise contínua das matérias — ⛔ permanente | 🟠 Alta | — | 🔄 Permanente | — | [156-2221f1f9](etapas/ETAPA-156-2221f1f9-ANALISE-CONTINUA-DAS-MATERIAS.md) |
| #20-2ac1a8ec-911b-466f | Banco de Dados (Técnico em Informática para Internet) 100% no padrão da ITIC — etapa 1 sem a apostila | 🟠 Alta | — | 🔄 Em execução | nuvem · claude/verificar-status-pastas-c6s5yz (desde 2026-10-10 16:27; pedido do usuário "finalize banco de dados") | [125](etapas/ETAPA-125-BANCO-DE-DADOS-100-NO-PADRAO-DA.md) |
| #21-eeefc710-3e74-4928 | Colaboração entre sessões/licenças (etapa com UUID, reserva, frentes, `RECADOS.md`) | 🟠 Alta | — | 👀 Aguardando aceite | nuvem · claude/festive-maxwell-25jnhl (desde 2026-10-09 15:22) | [135-eeefc710](etapas/ETAPA-135-eeefc710-COLABORACAO-ENTRE-SESSOES.md) |
| #22-f79be83e-0418-43e8 | Testes de Front-End: objetivas e práticas das aulas 04 a 10 | — | — | 🔄 Em execução | nuvem · claude/ola-zlzh8z (desde 2026-10-09 23:04) | [137-13665a7e](etapas/ETAPA-137-13665a7e-TESTES-DE-FRONT-END-AULAS-04-A-10.md) |
| #22-816fd3fd-ffe8-41e7 | Outras contas e IAs criam as tarefas agendadas 2 a 6 | — | — | ⛔ Cancelada em 2026-10-11 06:00 | — | — |
| #23-79fc30a3-c4c9-4a40 | Agendamentos: CRUD em `agendamentos.html` e espelho no banco | — | — | ⛔ Cancelada em 2026-10-11 05:58 (substituída pela #24) | — | [141-a7e81c26](etapas/ETAPA-141-a7e81c26-AGENDAMENTOS-CRUD-E-BANCO.md) |
| #24-9fb25086-5b51-44cb | Fila `tasks` no banco + 1 agendador; página `tasks.html` | 🟠 Alta | — | ⛔ Cancelada em 2026-10-13 (fila desativada, D1 da #29) | — | [142-2a52ee2f](etapas/ETAPA-142-2a52ee2f-FILA-TASKS-AGENDADOR-UNICO.md) |
| #25-b3e29764-940b-4a82 | Questões da objetiva e da prática só no banco, layout global, pasta da matéria sem HTML (migração) | 🟠 Alta | — | ⬜ Pendente | — | [143-d30a9c4d](etapas/ETAPA-143-d30a9c4d-ATIVIDADES-SO-NO-BANCO-LAYOUT-GLOBAL.md) |
| #26-55a91111-02ce-4cb1 | Regras no banco: `regra_documento` e `regra_secao` (cópia do repositório) | 🟠 Alta | — | 🔄 Em execução | nuvem · ccr-00f69e8a-6qcla9 (desde 2026-10-11 06:21) | [144-aff33423](etapas/ETAPA-144-aff33423-REGRAS-NO-BANCO.md) |
| #27-042b2fe8-a9f7-4726 | Reestruturar `.claude/rules/` (sem duplicação, ≤ 5 KB) | 🟡 Média | — | 👀 Aguardando aceite | — | [146-042b2fe8](etapas/ETAPA-146-042b2fe8-REESTRUTURAR-CLAUDE-RULES.md) |
| #28-9201b27b-7630-41cb | Visualizador `.claude/rules/index.html`: regras em cards + aba TASKS | 🟡 Média | — | 👀 Aguardando aceite | — | [147-9201b27b](etapas/ETAPA-147-9201b27b-VISUALIZADOR-REGRAS-E-TASKS.md) |
| #29-6ee02521-4f6a-4944 | Revisão das regras + quadro com fonte única nos arquivos (regras de tarefas em `.claude/rules/tasks/`) | 🟡 Média | — | 👀 Aguardando aceite | — | [148-6932a263](etapas/ETAPA-148-6932a263-REGRAS-E-QUADRO-FONTE-UNICA.md) |
| #30-376bafe4-a3b7-4809 | Correção das provas discursivas pela IA (todas com respostas) | 🟠 Alta | — | 👀 Aguardando aceite | — | [157-376bafe4](etapas/ETAPA-157-376bafe4-CORRECAO-PROVAS-DISCURSIVAS.md) |
| #31-fe84910c-d9e1-49dd | Aula bloqueada: aluno não abre os slides (Testes de Front-End) | 🟠 Alta | — | 👀 Aguardando aceite | — | [158-fe84910c](etapas/ETAPA-158-fe84910c-SLIDES-DE-AULA-BLOQUEADA.md) |
| #32-a45aa9a6-f4ec-4787 | Desafio 1 de Testes de Front-End: 3 casos de teste do Login (página SENAI + banco) | 🟠 Alta | — | 🔄 Em execução | local · main (desde 2026-10-14 08:32; pedido direto do usuário) | [159-a45aa9a6](etapas/ETAPA-159-a45aa9a6-DESAFIO-01-CASOS-DE-TESTE-LOGIN.md) |

## Escopo
- **Entra:** todas as tarefas pedidas pelo usuário neste repositório, a partir de 2026-10-03.
- **Não entra:** histórico anterior (está no Git e em `docs/`).
- **Critério de pronto:** item verificado, commit + push feitos e aceite do usuário.
- **Premissas e restrições:** regras do `AGENTS.md` (sem navegador, tudo na `main`, um commit + push por tarefa).

## 🗂️ Etapas (uma por arquivo em `tasks/etapas/`)

Desde 2026-10-09 cada etapa fica no seu arquivo (`.claude/rules/tasks/quadro.md`). Etapa nova = arquivo novo `ETAPA-NNN-uuid8-ASSUNTO.md` + linha nesta tabela.

| Etapa | Assunto | Arquivo |
|---|---|---|
| 1 | Atualizar `ANALISE-GERACAO-AULAS.md` do Técnico em Informática para Internet (pedida em 2026-10-03) | [ETAPA-001-ATUALIZAR-ANALISE-GERACAO-AULAS-MD-DO-TECNICO.md](etapas/ETAPA-001-ATUALIZAR-ANALISE-GERACAO-AULAS-MD-DO-TECNICO.md) |
| 2 | Apostila da ITIC (capítulos 02 a 10) e apostila de Testes de Frontend (pedida em 2026-10-03) | [ETAPA-002-APOSTILA-DA-ITIC-E-APOSTILA-DE-TESTES.md](etapas/ETAPA-002-APOSTILA-DA-ITIC-E-APOSTILA-DE-TESTES.md) |
| 3 | Regra "conteúdo só pelos Markdowns, nunca de PDF" no `CLAUDE.md` (pedida em 2026-10-03 20:47) | [ETAPA-003-REGRA-CONTEUDO-SO-PELOS-MARKDOWNS-NUNCA-DE.md](etapas/ETAPA-003-REGRA-CONTEUDO-SO-PELOS-MARKDOWNS-NUNCA-DE.md) |
| 4 | Regras "matéria modelo: Introdução à TIC" e "aulas extraídas da ementa em `CONTEUDO/`" (pedidas em 2026-10-03 20:52 e 20:55) | [ETAPA-004-REGRAS-MATERIA-MODELO-INTRODUCAO-A-TIC-E.md](etapas/ETAPA-004-REGRAS-MATERIA-MODELO-INTRODUCAO-A-TIC-E.md) |
| 6 | Equipes por turma + matéria: menu 👥 Equipes com CRUD nas atividades (pedida em 2026-10-05) | [ETAPA-006-EQUIPES-POR-TURMA-MATERIA-MENU-EQUIPES-COM.md](etapas/ETAPA-006-EQUIPES-POR-TURMA-MATERIA-MENU-EQUIPES-COM.md) |
| 10 | Detalhar a "Missão da equipe" do trabalho em equipe da ITIC (pedida em 2026-10-05) | [ETAPA-010-DETALHAR-A-MISSAO-DA-EQUIPE-DO-TRABALHO.md](etapas/ETAPA-010-DETALHAR-A-MISSAO-DA-EQUIPE-DO-TRABALHO.md) |
| 11 | Pasta na nuvem é tarefa do líder; demais atividades decididas em equipe (pedida em 2026-10-05) | [ETAPA-011-PASTA-NA-NUVEM-E-TAREFA-DO-LIDER.md](etapas/ETAPA-011-PASTA-NA-NUVEM-E-TAREFA-DO-LIDER.md) |
| 12 | Link "Slide Brainstorming" no trabalho em equipe da ITIC (pedida em 2026-10-05) | [ETAPA-012-LINK-SLIDE-BRAINSTORMING-NO-TRABALHO-EM-EQUIPE.md](etapas/ETAPA-012-LINK-SLIDE-BRAINSTORMING-NO-TRABALHO-EM-EQUIPE.md) |
| 13 | Autorização dos responsáveis para uso do celular na aula (ITIC, trabalho em equipe) (pedida em 2026-10-05) | [ETAPA-013-AUTORIZACAO-DOS-RESPONSAVEIS-PARA-USO-DO-CELULAR.md](etapas/ETAPA-013-AUTORIZACAO-DOS-RESPONSAVEIS-PARA-USO-DO-CELULAR.md) |
| 13 | Versão resumida do trabalho em equipe da ITIC (pedida em 2026-10-05) | [ETAPA-013-VERSAO-RESUMIDA-DO-TRABALHO-EM-EQUIPE-DA.md](etapas/ETAPA-013-VERSAO-RESUMIDA-DO-TRABALHO-EM-EQUIPE-DA.md) |
| 14 | Botão "Exportar em Word" ao lado de cada exportar PDF (regra global) (pedida em 2026-10-05) | [ETAPA-014-BOTAO-EXPORTAR-EM-WORD-AO-LADO-DE.md](etapas/ETAPA-014-BOTAO-EXPORTAR-EM-WORD-AO-LADO-DE.md) |
| 15 | Sugestão de alunos por turma com botão "Confirmar" na `alunos.html` (pedida em 2026-10-05; plano `docs/sugestao-alunos-por-turma-confirmar.md`, aprovado em 2026-10-05; escopo ampliado com o filtro **Turma OK**) | [ETAPA-015-SUGESTAO-DE-ALUNOS-POR-TURMA-COM-BOTAO.md](etapas/ETAPA-015-SUGESTAO-DE-ALUNOS-POR-TURMA-COM-BOTAO.md) |
| 16 | Card do trabalho em equipe v2 no índice de atividades da ITIC (pedida em 2026-10-05) | [ETAPA-016-CARD-DO-TRABALHO-EM-EQUIPE-V2-NO.md](etapas/ETAPA-016-CARD-DO-TRABALHO-EM-EQUIPE-V2-NO.md) |
| 16 | Card do trabalho em equipe v2 com bloqueio/liberação no índice da ITIC (pedida em 2026-10-05) | [ETAPA-016-CARD-DO-TRABALHO-EM-EQUIPE-V2-COM.md](etapas/ETAPA-016-CARD-DO-TRABALHO-EM-EQUIPE-V2-COM.md) |
| 16 | Bloqueio de atividade por turma (turma favorita) (pedida em 2026-10-05; plano `docs/bloqueio-atividade-por-turma-favorita.md`, aprovado: "SIM, PODE EXECUTAR") | [ETAPA-016-BLOQUEIO-DE-ATIVIDADE-POR-TURMA.md](etapas/ETAPA-016-BLOQUEIO-DE-ATIVIDADE-POR-TURMA.md) |
| 17 | Relatórios com o bloqueio por turma (pedida em 2026-10-05; tarefa pequena) | [ETAPA-017-RELATORIOS-COM-O-BLOQUEIO-POR-TURMA.md](etapas/ETAPA-017-RELATORIOS-COM-O-BLOQUEIO-POR-TURMA.md) |
| 18 | Vínculo curso × turma e alunos da turma na `turmas.html` (pedida em 2026-10-06; plano `docs/vinculo-curso-turma-e-alunos-da-turma.md`, aguardando aprovação) | [ETAPA-018-VINCULO-CURSO-TURMA-E-ALUNOS-DA-TURMA.md](etapas/ETAPA-018-VINCULO-CURSO-TURMA-E-ALUNOS-DA-TURMA.md) |
| 19 | Editar o card da aula com a data da aula (pedida em 2026-10-06; tarefa pequena, sem mudança no banco) | [ETAPA-019-EDITAR-O-CARD-DA-AULA-COM-A.md](etapas/ETAPA-019-EDITAR-O-CARD-DA-AULA-COM-A.md) |
| 20 | Aluna Bianca Pamela na turma QA LBTSN 2026/1 M2 (CEPLAS Manhã) (pedida em 2026-10-06; tarefa pequena) | [ETAPA-020-ALUNA-BIANCA-PAMELA-NA-TURMA-QA-LBTSN.md](etapas/ETAPA-020-ALUNA-BIANCA-PAMELA-NA-TURMA-QA-LBTSN.md) |
| 21 | Filtro "Só alunos da turma selecionada acima" na `alunos.html` (pedida em 2026-10-06; tarefa pequena) | [ETAPA-021-FILTRO-SO-ALUNOS-DA-TURMA-SELECIONADA-ACIMA.md](etapas/ETAPA-021-FILTRO-SO-ALUNOS-DA-TURMA-SELECIONADA-ACIMA.md) |
| 22 | Botão de olho para mostrar a senha no `login.html` (pedida em 2026-10-06; tarefa pequena) | [ETAPA-022-BOTAO-DE-OLHO-PARA-MOSTRAR-A-SENHA.md](etapas/ETAPA-022-BOTAO-DE-OLHO-PARA-MOSTRAR-A-SENHA.md) |
| 22 | Data da aula também para os alunos no índice de atividades (pedida em 2026-10-06; tarefa pequena) | [ETAPA-022-DATA-DA-AULA-TAMBEM-PARA-OS-ALUNOS.md](etapas/ETAPA-022-DATA-DA-AULA-TAMBEM-PARA-OS-ALUNOS.md) |
| 23 | Mostrar as questões que faltam quando a atividade não está completa (pedida em 2026-10-06; tarefa pequena) | [ETAPA-023-MOSTRAR-AS-QUESTOES-QUE-FALTAM-QUANDO-A.md](etapas/ETAPA-023-MOSTRAR-AS-QUESTOES-QUE-FALTAM-QUANDO-A.md) |
| 24 | Reforço de Linguagens: regra de 25 questões e atividade da Aula 01 (pedida em 2026-10-06; tarefa média) | [ETAPA-024-REFORCO-DE-LINGUAGENS-REGRA-DE-25-QUESTOES.md](etapas/ETAPA-024-REFORCO-DE-LINGUAGENS-REGRA-DE-25-QUESTOES.md) |
| 25 | Pendências de aulas (tabela `pendencias` + `AGENDA_COLABORADOR/pendencias.html` + menu do administrador) (pedida em 2026-10-06; plano `docs/pendencias-aulas-professor-administrador.md`) | [ETAPA-025-PENDENCIAS-DE-AULAS.md](etapas/ETAPA-025-PENDENCIAS-DE-AULAS.md) |
| 26 | Reforço de Linguagens: 10 aulas (uma por slide) e atividades das aulas 02 a 10 (aprovada em 2026-10-06; plano `docs/reforco-linguagens-10-aulas-e-atividades.md`) | [ETAPA-026-REFORCO-DE-LINGUAGENS-10-AULAS-E-ATIVIDADES.md](etapas/ETAPA-026-REFORCO-DE-LINGUAGENS-10-AULAS-E-ATIVIDADES.md) |
| 27 | Pendências só pelo menu do Professor Administrador (pedida em 2026-10-06; tarefa pequena) | [ETAPA-027-PENDENCIAS-SO-PELO-MENU-DO-PROFESSOR-ADMINISTRADOR.md](etapas/ETAPA-027-PENDENCIAS-SO-PELO-MENU-DO-PROFESSOR-ADMINISTRADOR.md) |
| 27 | ITIC: atividade individual de sexta à tarde (40 objetivas) (pedida em 2026-10-06; tarefa pequena) | [ETAPA-027-ITIC-ATIVIDADE-INDIVIDUAL-DE-SEXTA-A-TARDE.md](etapas/ETAPA-027-ITIC-ATIVIDADE-INDIVIDUAL-DE-SEXTA-A-TARDE.md) |
| 28 | Quadro de respostas no início da atividade e na exportação (pedida em 2026-10-06; plano `docs/quadro-respostas-atividade.md`) | [ETAPA-028-QUADRO-DE-RESPOSTAS-NO-INICIO-DA-ATIVIDADE.md](etapas/ETAPA-028-QUADRO-DE-RESPOSTAS-NO-INICIO-DA-ATIVIDADE.md) |
| 29 | ITIC: atividade individual de sexta — 20 discursivas (pedida em 2026-10-06; tarefa pequena) | [ETAPA-029-ITIC-ATIVIDADE-INDIVIDUAL-DE-SEXTA-20-DISCURSIVAS.md](etapas/ETAPA-029-ITIC-ATIVIDADE-INDIVIDUAL-DE-SEXTA-20-DISCURSIVAS.md) |
| 30 | Curso de Gestão de Materiais no índice de cursos (tarefa pequena, 2026-10-06) | [ETAPA-030-CURSO-DE-GESTAO-DE-MATERIAIS-NO-INDICE.md](etapas/ETAPA-030-CURSO-DE-GESTAO-DE-MATERIAIS-NO-INDICE.md) |
| 31 | Prova Prática 06-10-2026 de Análise de Dados (Aulas 01 a 05) — plano: [docs/prova-pratica-06-10-2026-analise-dados.md](docs/prova-pratica-06-10-2026-analise-dados.md) | [ETAPA-031-PROVA-PRATICA-06-10-2026-DE-ANALISE.md](etapas/ETAPA-031-PROVA-PRATICA-06-10-2026-DE-ANALISE.md) |
| 32 | Excluir aula (exclusão lógica, só Professor Administrador) — plano: [docs/excluir-aula-professor-administrador.md](docs/excluir-aula-professor-administrador.md) | [ETAPA-032-EXCLUIR-AULA-PLANO-DOCS-EXCLUIR-AULA-PROFESSOR.md](etapas/ETAPA-032-EXCLUIR-AULA-PLANO-DOCS-EXCLUIR-AULA-PROFESSOR.md) |
| 33 | Média final de Análise de Dados: Aulas 01–03 = 10-LIVRE; Aulas 04–07 pelo banco (tarefa pequena, 2026-10-06) | [ETAPA-033-MEDIA-FINAL-DE-ANALISE-DE-DADOS-AULAS.md](etapas/ETAPA-033-MEDIA-FINAL-DE-ANALISE-DE-DADOS-AULAS.md) |
| 34 | Média final: aluno vê as próprias notas (Aulas 04–07, Objetiva, Prova Prática) — plano: [docs/media-final-notas-do-aluno.md](docs/media-final-notas-do-aluno.md) | [ETAPA-034-MEDIA-FINAL-ALUNO-VE-AS-PROPRIAS-NOTAS.md](etapas/ETAPA-034-MEDIA-FINAL-ALUNO-VE-AS-PROPRIAS-NOTAS.md) |
| 35 | Tabela "Notas dos alunos" (só professor) com exportar PDF na Avaliação Objetiva 01 de Análise de Dados (tarefa pequena, 2026-10-06) | [ETAPA-035-TABELA-NOTAS-DOS-ALUNOS-COM-EXPORTAR-PDF.md](etapas/ETAPA-035-TABELA-NOTAS-DOS-ALUNOS-COM-EXPORTAR-PDF.md) |
| 36 | Gabarito fora do alcance dos alunos, botões de Word e card bloqueado (tarefas pequenas, 2026-10-06) | [ETAPA-036-GABARITO-FORA-DO-ALCANCE-DOS-ALUNOS-BOTOES.md](etapas/ETAPA-036-GABARITO-FORA-DO-ALCANCE-DOS-ALUNOS-BOTOES.md) |
| 36 | Tabela "Notas dos alunos" (nome e nota, Exportar PDF) em todas as atividades (tarefa pequena, 2026-10-06) | [ETAPA-036-TABELA-NOTAS-DOS-ALUNOS-EM-TODAS-AS.md](etapas/ETAPA-036-TABELA-NOTAS-DOS-ALUNOS-EM-TODAS-AS.md) |
| 37 | Liberar gabaritos por atividade e turma (botão do professor) — plano: [docs/liberacao-respostas-por-turma.md](docs/liberacao-respostas-por-turma.md) | [ETAPA-037-LIBERAR-GABARITOS-POR-ATIVIDADE-E-TURMA-PLANO.md](etapas/ETAPA-037-LIBERAR-GABARITOS-POR-ATIVIDADE-E-TURMA-PLANO.md) |
| 38 | Regra do gabarito também nas discursivas (pedida em 2026-10-06; extensão do plano [docs/liberacao-respostas-por-turma.md](docs/liberacao-respostas-por-turma.md)) | [ETAPA-038-REGRA-DO-GABARITO-TAMBEM-NAS-DISCURSIVAS.md](etapas/ETAPA-038-REGRA-DO-GABARITO-TAMBEM-NAS-DISCURSIVAS.md) |
| 39 | ID da atividade bloqueado no "Editar" do CADASTRAR ATIVIDADES (tarefa pequena, 2026-10-06) | [ETAPA-039-ID-DA-ATIVIDADE-BLOQUEADO-NO-EDITAR-DO.md](etapas/ETAPA-039-ID-DA-ATIVIDADE-BLOQUEADO-NO-EDITAR-DO.md) |
| 40 | ID da atividade no card do índice e nome da atividade editável (tarefa pequena, 2026-10-06) | [ETAPA-040-ID-DA-ATIVIDADE-NO-CARD-DO-INDICE.md](etapas/ETAPA-040-ID-DA-ATIVIDADE-NO-CARD-DO-INDICE.md) |
| 41 | Remover o botão "Banco Moodle (AVA SENAI)" de todas as atividades (tarefa pequena, 2026-10-06) | [ETAPA-041-REMOVER-O-BOTAO-BANCO-MOODLE-DE-TODAS.md](etapas/ETAPA-041-REMOVER-O-BOTAO-BANCO-MOODLE-DE-TODAS.md) |
| 42 | Remover o botão "Exportar PDF com gabarito" (tarefa pequena, 2026-10-06) | [ETAPA-042-REMOVER-O-BOTAO-EXPORTAR-PDF-COM-GABARITO.md](etapas/ETAPA-042-REMOVER-O-BOTAO-EXPORTAR-PDF-COM-GABARITO.md) |
| 43 | Análise das Provas Práticas id 37 × id 82 de Análise de Dados (tarefa pequena, 2026-10-06) | [ETAPA-043-ANALISE-DAS-PROVAS-PRATICAS-ID-37-ID.md](etapas/ETAPA-043-ANALISE-DAS-PROVAS-PRATICAS-ID-37-ID.md) |
| 44 | Prova Prática ADAG unificada (id 82, 20 discursivas, 100% das aulas) e exclusão da id 37 — plano: [docs/prova-pratica-adag-unificada-id82.md](docs/prova-pratica-adag-unificada-id82.md) | [ETAPA-044-PROVA-PRATICA-ADAG-UNIFICADA-E-EXCLUSAO-DA.md](etapas/ETAPA-044-PROVA-PRATICA-ADAG-UNIFICADA-E-EXCLUSAO-DA.md) |
| 45 | Log de gravação das alternativas em qualquer atividade (pedida em 2026-10-06) — plano: [docs/log-resposta-atividade.md](docs/log-resposta-atividade.md) | [ETAPA-045-LOG-DE-GRAVACAO-DAS-ALTERNATIVAS-EM-QUALQUER.md](etapas/ETAPA-045-LOG-DE-GRAVACAO-DAS-ALTERNATIVAS-EM-QUALQUER.md) |
| 46 | Link "🧾 LOG" nos cards das atividades com o log das alternativas por aluno (tarefa pequena, 2026-10-06) | [ETAPA-046-LINK-LOG-NOS-CARDS-DAS-ATIVIDADES-COM.md](etapas/ETAPA-046-LINK-LOG-NOS-CARDS-DAS-ATIVIDADES-COM.md) |
| 47 | Trocar o rótulo e o nome do card no modal "✏️ Editar aula", além da data (tarefa pequena, 2026-10-06) | [ETAPA-047-TROCAR-O-ROTULO-E-O-NOME-DO.md](etapas/ETAPA-047-TROCAR-O-ROTULO-E-O-NOME-DO.md) |
| 47 | Exportar PDF no padrão SENAI nas discursivas (tarefa pequena, 2026-10-06) | [ETAPA-047-EXPORTAR-PDF-NO-PADRAO-SENAI-NAS-DISCURSIVAS.md](etapas/ETAPA-047-EXPORTAR-PDF-NO-PADRAO-SENAI-NAS-DISCURSIVAS.md) |
| 48 | Card com 100% dos dados da tabela aulas + modal CRUD da aula (2026-10-06) — plano: [docs/card-dados-100-tabela-aulas.md](docs/card-dados-100-tabela-aulas.md) | [ETAPA-048-CARD-COM-100-DOS-DADOS-DA-TABELA.md](etapas/ETAPA-048-CARD-COM-100-DOS-DADOS-DA-TABELA.md) |
| 49 | Professora Cintia Simone Grimm no LISTA-PRESENCA-PROFESSOR.js (tarefa pequena, 2026-10-07) | [ETAPA-049-PROFESSORA-CINTIA-SIMONE-GRIMM-NO-LISTA-PRESENCA.md](etapas/ETAPA-049-PROFESSORA-CINTIA-SIMONE-GRIMM-NO-LISTA-PRESENCA.md) |
| 49 | Professora Cintia Simone Grimm no LISTA-PRESENCA-PROFESSOR.js (tarefa pequena, 2026-10-07) | [ETAPA-049-PROFESSORA-CINTIA-SIMONE-GRIMM-NO-LISTA-PRESENCA-B.md](etapas/ETAPA-049-PROFESSORA-CINTIA-SIMONE-GRIMM-NO-LISTA-PRESENCA-B.md) |
| 50 | Menus USUARIOS/RELATORIOS/ALUNOS/CORREÇÃO só para o Professor Administrador (tarefa pequena, 2026-10-07) | [ETAPA-050-MENUS-USUARIOS-RELATORIOS-ALUNOS-CORRECAO-SO-PARA.md](etapas/ETAPA-050-MENUS-USUARIOS-RELATORIOS-ALUNOS-CORRECAO-SO-PARA.md) |
| 51 | Resolução modelo do Trabalho em Equipe v2 (Grupo 04) em .doc para Google Docs (tarefa pequena, 2026-10-07) | [ETAPA-051-RESOLUCAO-MODELO-DO-TRABALHO-EM-EQUIPE-V2.md](etapas/ETAPA-051-RESOLUCAO-MODELO-DO-TRABALHO-EM-EQUIPE-V2.md) |
| 52 | ITIC: nova atividade de sexta — 50 objetivas a partir da apostila (capítulos 01 a 07) (tarefa pequena, 2026-10-07) | [ETAPA-052-ITIC-NOVA-ATIVIDADE-DE-SEXTA-50-OBJETIVAS.md](etapas/ETAPA-052-ITIC-NOVA-ATIVIDADE-DE-SEXTA-50-OBJETIVAS.md) |
| 53 | Bug: professor via respostas dos alunos nos campos da atividade (tarefa pequena — correção de bug, 2026-10-07) | [ETAPA-053-BUG-PROFESSOR-VIA-RESPOSTAS-DOS-ALUNOS-NOS.md](etapas/ETAPA-053-BUG-PROFESSOR-VIA-RESPOSTAS-DOS-ALUNOS-NOS.md) |
| 54 | Combo "Aluno" do professor nas discursivas (tarefa pequena, 2026-10-07) | [ETAPA-054-COMBO-ALUNO-DO-PROFESSOR-NAS-DISCURSIVAS.md](etapas/ETAPA-054-COMBO-ALUNO-DO-PROFESSOR-NAS-DISCURSIVAS.md) |
| 55 | ITIC sexta: alternativas reescritas para a correta não ser sempre a mais longa (tarefa pequena, 2026-10-07) | [ETAPA-055-ITIC-SEXTA-ALTERNATIVAS-REESCRITAS-PARA-A-CORRETA.md](etapas/ETAPA-055-ITIC-SEXTA-ALTERNATIVAS-REESCRITAS-PARA-A-CORRETA.md) |
| 55 | Combo "Aluno" do professor também nas objetivas (tarefa pequena, 2026-10-07) | [ETAPA-055-COMBO-ALUNO-DO-PROFESSOR-TAMBEM-NAS-OBJETIVAS.md](etapas/ETAPA-055-COMBO-ALUNO-DO-PROFESSOR-TAMBEM-NAS-OBJETIVAS.md) |
| 56 | ITIC sexta: atividade objetiva única de 100 questões (Aulas 01 a 07) — plano: [docs/itic-sexta-atividade-unica-100-questoes.md](docs/itic-sexta-atividade-unica-100-questoes.md) | [ETAPA-056-ITIC-SEXTA-ATIVIDADE-OBJETIVA-UNICA-DE-100.md](etapas/ETAPA-056-ITIC-SEXTA-ATIVIDADE-OBJETIVA-UNICA-DE-100.md) |
| 57 | Aviso "sem computador/celular, só a apostila" na discursiva de sexta (tarefa pequena, 2026-10-07) | [ETAPA-057-AVISO-SEM-COMPUTADOR-CELULAR-SO-A-APOSTILA.md](etapas/ETAPA-057-AVISO-SEM-COMPUTADOR-CELULAR-SO-A-APOSTILA.md) |
| 58 | Discursiva de sexta reduzida para 30 questões (cabe em 4 h) (tarefa pequena, 2026-10-07) | [ETAPA-058-DISCURSIVA-DE-SEXTA-REDUZIDA-PARA-30-QUESTOES.md](etapas/ETAPA-058-DISCURSIVA-DE-SEXTA-REDUZIDA-PARA-30-QUESTOES.md) |
| 59 | Turma 135081 responde até 17h15 (tarefa pequena, 2026-10-07) | [ETAPA-059-TURMA-135081-RESPONDE-ATE-17H15.md](etapas/ETAPA-059-TURMA-135081-RESPONDE-ATE-17H15.md) |
| 60 | Atividades de sexta liberadas para a manhã (tarefa pequena, 2026-10-07) | [ETAPA-060-ATIVIDADES-DE-SEXTA-LIBERADAS-PARA-A-MANHA.md](etapas/ETAPA-060-ATIVIDADES-DE-SEXTA-LIBERADAS-PARA-A-MANHA.md) |
| 61 | Data, hora, autor e versão nas apostilas (regra global; começa pela ITIC) (tarefa pequena, 2026-10-07) | [ETAPA-061-DATA-HORA-AUTOR-E-VERSAO-NAS-APOSTILAS.md](etapas/ETAPA-061-DATA-HORA-AUTOR-E-VERSAO-NAS-APOSTILAS.md) |
| 62 | Autor, versão, data e hora na apostila de Testes de Frontend (tarefa pequena, 2026-10-07) | [ETAPA-062-AUTOR-VERSAO-DATA-E-HORA-NA-APOSTILA.md](etapas/ETAPA-062-AUTOR-VERSAO-DATA-E-HORA-NA-APOSTILA.md) |
| 63 | Link do curso "Técnico em Desenvolvimento de Sistemas" no índice de cursos (tarefa pequena, 2026-10-07) | [ETAPA-063-LINK-DO-CURSO-TECNICO-EM-DESENVOLVIMENTO-DE.md](etapas/ETAPA-063-LINK-DO-CURSO-TECNICO-EM-DESENVOLVIMENTO-DE.md) |
| 64 | Apostila de Reforço de Linguagens (pedida em 2026-10-07) | [ETAPA-064-APOSTILA-DE-REFORCO-DE-LINGUAGENS.md](etapas/ETAPA-064-APOSTILA-DE-REFORCO-DE-LINGUAGENS.md) |
| 65 | Regra do push por ambiente (tarefa pequena, 2026-10-07) | [ETAPA-065-REGRA-DO-PUSH-POR-AMBIENTE.md](etapas/ETAPA-065-REGRA-DO-PUSH-POR-AMBIENTE.md) |
| 66 | Apostila no menu de atividades de Reforço de Linguagens (tarefa pequena, 2026-10-07) | [ETAPA-066-APOSTILA-NO-MENU-DE-ATIVIDADES-DE-REFORCO.md](etapas/ETAPA-066-APOSTILA-NO-MENU-DE-ATIVIDADES-DE-REFORCO.md) |
| 67 | Vídeos na apostila de Reforço de Linguagens + identificação (tarefa pequena, 2026-10-07) | [ETAPA-067-VIDEOS-NA-APOSTILA-DE-REFORCO-DE-LINGUAGENS.md](etapas/ETAPA-067-VIDEOS-NA-APOSTILA-DE-REFORCO-DE-LINGUAGENS.md) |
| 68 | Autor e versão em todas as apostilas + regra no CLAUDE.md (tarefa pequena, 2026-10-07) | [ETAPA-068-AUTOR-E-VERSAO-EM-TODAS-AS-APOSTILAS.md](etapas/ETAPA-068-AUTOR-E-VERSAO-EM-TODAS-AS-APOSTILAS.md) |
| 69 | Bloquear de novo 81 e 85 até sexta; conferir capa de Reforço (tarefa pequena, 2026-10-07) | [ETAPA-069-BLOQUEAR-DE-NOVO-81-E-85-ATE.md](etapas/ETAPA-069-BLOQUEAR-DE-NOVO-81-E-85-ATE.md) |
| 70 | Reorganizar o CLAUDE.md: estrutura e manutenção (pedida em 2026-10-07) | [ETAPA-070-REORGANIZAR-O-CLAUDE-MD-ESTRUTURA-E-MANUTENCAO.md](etapas/ETAPA-070-REORGANIZAR-O-CLAUDE-MD-ESTRUTURA-E-MANUTENCAO.md) |
| 71 | Recriar Comunicação Oral e Escrita (Rio do Sul) no padrão da ITIC (pedida em 2026-10-07) | [ETAPA-071-RECRIAR-COMUNICACAO-ORAL-E-ESCRITA-NO-PADRAO.md](etapas/ETAPA-071-RECRIAR-COMUNICACAO-ORAL-E-ESCRITA-NO-PADRAO.md) |
| 72 | Corrigir as contradições do CLAUDE.md, uma de cada vez (pedida em 2026-10-07) | [ETAPA-072-CORRIGIR-AS-CONTRADICOES-DO-CLAUDE-MD-UMA.md](etapas/ETAPA-072-CORRIGIR-AS-CONTRADICOES-DO-CLAUDE-MD-UMA.md) |
| 73 | Revisão final das regras: problemas novos + desatualizados (pedida em 2026-10-07) | [ETAPA-073-REVISAO-FINAL-DAS-REGRAS-PROBLEMAS-NOVOS-DESATUALIZADOS.md](etapas/ETAPA-073-REVISAO-FINAL-DAS-REGRAS-PROBLEMAS-NOVOS-DESATUALIZADOS.md) |
| 74 | Dashboard do Jev (JEV-AI de Testes de Frontend) (tarefa pequena, 2026-10-07) | [ETAPA-074-DASHBOARD-DO-JEV.md](etapas/ETAPA-074-DASHBOARD-DO-JEV.md) |
| 75 | Atividades práticas das Aulas 06 a 10 da ITIC (pedida em 2026-10-07) | [ETAPA-075-ATIVIDADES-PRATICAS-DAS-AULAS-06-A-10.md](etapas/ETAPA-075-ATIVIDADES-PRATICAS-DAS-AULAS-06-A-10.md) |
| 75 | Capacidades nas 2 últimas pendências (tarefa pequena, 2026-10-07) | [ETAPA-075-CAPACIDADES-NAS-2-ULTIMAS-PENDENCIAS.md](etapas/ETAPA-075-CAPACIDADES-NAS-2-ULTIMAS-PENDENCIAS.md) |
| 76 | Conflitos entre as regras de TASKS.md, documentação e sessões (pedida em 2026-10-08) | [ETAPA-076-CONFLITOS-ENTRE-AS-REGRAS-DE-TASKS-MD.md](etapas/ETAPA-076-CONFLITOS-ENTRE-AS-REGRAS-DE-TASKS-MD.md) |
| 77 | Skills globais copiadas para `.claude/skills/` do projeto (tarefa pequena, 2026-10-08) | [ETAPA-077-SKILLS-GLOBAIS-COPIADAS-PARA-CLAUDE-SKILLS-DO.md](etapas/ETAPA-077-SKILLS-GLOBAIS-COPIADAS-PARA-CLAUDE-SKILLS-DO.md) |
| 78 | Regras do CLAUDE.md global trazidas para o projeto (pedida em 2026-10-08) | [ETAPA-078-REGRAS-DO-CLAUDE-MD-GLOBAL-TRAZIDAS-PARA.md](etapas/ETAPA-078-REGRAS-DO-CLAUDE-MD-GLOBAL-TRAZIDAS-PARA.md) |
| 79 | Apostila da ITIC versão 2 (até 40 páginas) (pedida em 2026-10-08 08:36:51) | [ETAPA-079-APOSTILA-DA-ITIC-VERSAO-2.md](etapas/ETAPA-079-APOSTILA-DA-ITIC-VERSAO-2.md) |
| 80 | Remover o arquivo `.gitignore copy` (tarefa pequena, 2026-10-08 12:00:28) | [ETAPA-080-REMOVER-O-ARQUIVO-GITIGNORE-COPY.md](etapas/ETAPA-080-REMOVER-O-ARQUIVO-GITIGNORE-COPY.md) |
| 81 | Apostila ITIC V2: correções da conferência com a ementa (tarefa pequena, 2026-10-08 09:03:16) | [ETAPA-081-APOSTILA-ITIC-V2-CORRECOES-DA-CONFERENCIA-COM.md](etapas/ETAPA-081-APOSTILA-ITIC-V2-CORRECOES-DA-CONFERENCIA-COM.md) |
| 82 | Discursiva de sexta (id 81) ajustada à apostila V2 (tarefa pequena, 2026-10-08 09:33:18) | [ETAPA-082-DISCURSIVA-DE-SEXTA-AJUSTADA-A-APOSTILA-V2.md](etapas/ETAPA-082-DISCURSIVA-DE-SEXTA-AJUSTADA-A-APOSTILA-V2.md) |
| 83 | Remover a apostila V1 da ITIC (tarefa grande, pedida em 2026-10-08 09:36) | [ETAPA-083-REMOVER-A-APOSTILA-V1-DA-ITIC.md](etapas/ETAPA-083-REMOVER-A-APOSTILA-V1-DA-ITIC.md) |
| 84 | Botão "Exportar Usuários em PDF" na página de usuários (tarefa pequena, 2026-10-08 13:17:15) | [ETAPA-084-BOTAO-EXPORTAR-USUARIOS-EM-PDF-NA-PAGINA.md](etapas/ETAPA-084-BOTAO-EXPORTAR-USUARIOS-EM-PDF-NA-PAGINA.md) |
| 84 | Discursiva de sexta (id 81) com 20 questões e PDF de até 2 folhas (tarefa pequena, 2026-10-08 10:41:37) | [ETAPA-084-DISCURSIVA-DE-SEXTA-COM-20-QUESTOES-E.md](etapas/ETAPA-084-DISCURSIVA-DE-SEXTA-COM-20-QUESTOES-E.md) |
| 85 | Discursiva de sexta (id 81): 0,5 ponto por questão (tarefa pequena, 2026-10-08 10:59:06) | [ETAPA-085-DISCURSIVA-DE-SEXTA-0-5-PONTO-POR.md](etapas/ETAPA-085-DISCURSIVA-DE-SEXTA-0-5-PONTO-POR.md) |
| 85 | Regra: atividades sem empresa fictícia, "Você como aluno consultor" (tarefa pequena, 2026-10-08 14:19:41) | [ETAPA-085-REGRA-ATIVIDADES-SEM-EMPRESA-FICTICIA-VOCE-COMO.md](etapas/ETAPA-085-REGRA-ATIVIDADES-SEM-EMPRESA-FICTICIA-VOCE-COMO.md) |
| 86 | Professora Grazi Ferreira na lista de professores (tarefa pequena, 2026-10-08) | [ETAPA-086-PROFESSORA-GRAZI-FERREIRA-NA-LISTA-DE-PROFESSORES.md](etapas/ETAPA-086-PROFESSORA-GRAZI-FERREIRA-NA-LISTA-DE-PROFESSORES.md) |
| 86 | PDF "Orientação à professora" da atividade de sexta (tarefa pequena, 2026-10-08 11:33:33) | [ETAPA-086-PDF-ORIENTACAO-A-PROFESSORA-DA-ATIVIDADE-DE.md](etapas/ETAPA-086-PDF-ORIENTACAO-A-PROFESSORA-DA-ATIVIDADE-DE.md) |
| 87 | Nova turma Roberto Machado (QA LBTSN 2026/1 V1, código 124403) e usuários dos alunos (tarefa pequena, 2026-10-08) | [ETAPA-087-NOVA-TURMA-ROBERTO-MACHADO-E-USUARIOS-DOS.md](etapas/ETAPA-087-NOVA-TURMA-ROBERTO-MACHADO-E-USUARIOS-DOS.md) |
| 88 | Bloquear colar na Prova Prática ADAG (id 82) e regra para as outras discursivas (tarefa pequena, 2026-10-08 13:46:24) | [ETAPA-088-BLOQUEAR-COLAR-NA-PROVA-PRATICA-ADAG-E.md](etapas/ETAPA-088-BLOQUEAR-COLAR-NA-PROVA-PRATICA-ADAG-E.md) |
| 88 | Menu 👥 Equipes em Análise de Dados Aplicada à Gestão (duplas da prova) (tarefa pequena, 2026-10-08 17:11:10) | [ETAPA-088-MENU-EQUIPES-EM-ANALISE-DE-DADOS-APLICADA.md](etapas/ETAPA-088-MENU-EQUIPES-EM-ANALISE-DE-DADOS-APLICADA.md) |
| 89 | Banco: nome de equipe único na turma + matéria sem diferenciar maiúsculas (pedido em 2026-10-08 17:17:38) | [ETAPA-089-BANCO-NOME-DE-EQUIPE-UNICO-NA-TURMA.md](etapas/ETAPA-089-BANCO-NOME-DE-EQUIPE-UNICO-NA-TURMA.md) |
| 89 | Progresso da turma para o professor e nome da prova 08-10-2026 (Prova Prática ADAG id 82, tarefa pequena, 2026-10-08 14:34:44) | [ETAPA-089-PROGRESSO-DA-TURMA-PARA-O-PROFESSOR-E.md](etapas/ETAPA-089-PROGRESSO-DA-TURMA-PARA-O-PROFESSOR-E.md) |
| 90 | Botão +Integrante no card de cada equipe (tarefa pequena, 2026-10-08 17:18:19) | [ETAPA-090-BOTAO-INTEGRANTE-NO-CARD-DE-CADA-EQUIPE.md](etapas/ETAPA-090-BOTAO-INTEGRANTE-NO-CARD-DE-CADA-EQUIPE.md) |
| 90 | Orientação para a IA corrigir a Prova Prática ADAG (id 82) (tarefa pequena, 2026-10-08 14:48:26) | [ETAPA-090-ORIENTACAO-PARA-A-IA-CORRIGIR-A-PROVA.md](etapas/ETAPA-090-ORIENTACAO-PARA-A-IA-CORRIGIR-A-PROVA.md) |
| 91 | Menu das atividades só com 👥 Equipes em todas as matérias (pedido em 2026-10-08 17:20:14) | [ETAPA-091-MENU-DAS-ATIVIDADES-SO-COM-EQUIPES-EM.md](etapas/ETAPA-091-MENU-DAS-ATIVIDADES-SO-COM-EQUIPES-EM.md) |
| 91 | Coluna "Nota IA" no progresso da turma (Prova Prática ADAG id 82, tarefa pequena, 2026-10-08 14:52:04) | [ETAPA-091-COLUNA-NOTA-IA-NO-PROGRESSO-DA-TURMA.md](etapas/ETAPA-091-COLUNA-NOTA-IA-NO-PROGRESSO-DA-TURMA.md) |
| 92 | Botão 👥 EQUIPES global no header (pedido em 2026-10-08 17:22:44) | [ETAPA-092-BOTAO-EQUIPES-GLOBAL-NO-HEADER.md](etapas/ETAPA-092-BOTAO-EQUIPES-GLOBAL-NO-HEADER.md) |
| 92 | Correção parcial pela IA e coluna "Nota parcial IA" (Prova Prática ADAG id 82, 2026-10-08 15:07:27) | [ETAPA-092-CORRECAO-PARCIAL-PELA-IA-E-COLUNA-NOTA.md](etapas/ETAPA-092-CORRECAO-PARCIAL-PELA-IA-E-COLUNA-NOTA.md) |
| 93 | +Integrante ao lado direito do nome da equipe (tarefa pequena, 2026-10-08 17:23:35) | [ETAPA-093-INTEGRANTE-AO-LADO-DIREITO-DO-NOME-DA.md](etapas/ETAPA-093-INTEGRANTE-AO-LADO-DIREITO-DO-NOME-DA.md) |
| 93 | Regra: nota parcial da IA em todas as avaliações discursivas (tarefa pequena, 2026-10-08 15:54:25) | [ETAPA-093-REGRA-NOTA-PARCIAL-DA-IA-EM-TODAS.md](etapas/ETAPA-093-REGRA-NOTA-PARCIAL-DA-IA-EM-TODAS.md) |
| 94 | Unidade (local + turno) em toda lista de turmas (pedido em 2026-10-08 17:26:54) | [ETAPA-094-UNIDADE-EM-TODA-LISTA-DE-TURMAS.md](etapas/ETAPA-094-UNIDADE-EM-TODA-LISTA-DE-TURMAS.md) |
| 94 | Prova Prática ADAG (id 82): aluno que entregou não vê as respostas (tarefa pequena, 2026-10-08 15:59:36) | [ETAPA-094-PROVA-PRATICA-ADAG-ALUNO-QUE-ENTREGOU-NAO.md](etapas/ETAPA-094-PROVA-PRATICA-ADAG-ALUNO-QUE-ENTREGOU-NAO.md) |
| 95 | Modal de equipes em tabela + alunos sem equipe no início (tarefa pequena, 2026-10-08 17:39:22) | [ETAPA-095-MODAL-DE-EQUIPES-EM-TABELA-ALUNOS-SEM.md](etapas/ETAPA-095-MODAL-DE-EQUIPES-EM-TABELA-ALUNOS-SEM.md) |
| 95 | Botões do professor Certa / Meia certa / Errada e nota confirmada travada (tarefa pequena, 2026-10-08 16:10:08) | [ETAPA-095-BOTOES-DO-PROFESSOR-CERTA-MEIA-CERTA-ERRADA.md](etapas/ETAPA-095-BOTOES-DO-PROFESSOR-CERTA-MEIA-CERTA-ERRADA.md) |
| 96 | Botão Gráficos no Progresso da turma e progresso global nas discursivas (tarefa pequena, 2026-10-08 16:20:56) | [ETAPA-096-BOTAO-GRAFICOS-NO-PROGRESSO-DA-TURMA-E.md](etapas/ETAPA-096-BOTAO-GRAFICOS-NO-PROGRESSO-DA-TURMA-E.md) |
| 97 | Quantidade mínima de questões para entregar a discursiva (tarefa grande; plano: [docs/quantidade-minima-questoes-discursiva.md](docs/quantidade-minima-questoes-discursiva.md); pedido em 2026-10-08 16:30:59) | [ETAPA-097-QUANTIDADE-MINIMA-DE-QUESTOES-PARA-ENTREGAR-A.md](etapas/ETAPA-097-QUANTIDADE-MINIMA-DE-QUESTOES-PARA-ENTREGAR-A.md) |
| 98 | Balão grande com o porquê da nota da IA (tarefa pequena, 2026-10-08 16:50:05) | [ETAPA-098-BALAO-GRANDE-COM-O-PORQUE-DA-NOTA.md](etapas/ETAPA-098-BALAO-GRANDE-COM-O-PORQUE-DA-NOTA.md) |
| 99 | Botão Cálculo Nota no Progresso da turma (tarefa pequena, 2026-10-08 16:57:30) | [ETAPA-099-BOTAO-CALCULO-NOTA-NO-PROGRESSO-DA-TURMA.md](etapas/ETAPA-099-BOTAO-CALCULO-NOTA-NO-PROGRESSO-DA-TURMA.md) |
| 100 | Excluir as respostas de uma aluna na atividade id 82 (tarefa pequena, pedido em 2026-10-08 22:55:39) | [ETAPA-100-EXCLUIR-AS-RESPOSTAS-DE-UMA-ALUNA-NA.md](etapas/ETAPA-100-EXCLUIR-AS-RESPOSTAS-DE-UMA-ALUNA-NA.md) |
| 100 | Respostas escondidas para o professor até escolher um aluno (tarefa pequena, 2026-10-08 20:16:56) | [ETAPA-100-RESPOSTAS-ESCONDIDAS-PARA-O-PROFESSOR-ATE-ESCOLHER.md](etapas/ETAPA-100-RESPOSTAS-ESCONDIDAS-PARA-O-PROFESSOR-ATE-ESCOLHER.md) |
| 101 | Registro da sessão 4 e CLAUDE.md da pasta `SESSOES-CLAUDE/` (tarefa pequena, pedido em 2026-10-08 19:56) | [ETAPA-101-REGISTRO-DA-SESSAO-4-E-CLAUDE-MD.md](etapas/ETAPA-101-REGISTRO-DA-SESSAO-4-E-CLAUDE-MD.md) |
| 101 | Botão Finalizar Atividade do professor (tarefa pequena, 2026-10-08 20:21:56) | [ETAPA-101-BOTAO-FINALIZAR-ATIVIDADE-DO-PROFESSOR.md](etapas/ETAPA-101-BOTAO-FINALIZAR-ATIVIDADE-DO-PROFESSOR.md) |
| 102 | Aulas de Testes de Front-End em Markdown (`CONTEUDO/`) (pedido e aprovação em 2026-10-08 20:00:46) | [ETAPA-102-AULAS-DE-TESTES-DE-FRONT-END-EM.md](etapas/ETAPA-102-AULAS-DE-TESTES-DE-FRONT-END-EM.md) |
| 102 | Aluno vê a prova corrigida depois da liberação do gabarito (tarefa pequena, 2026-10-08 20:24:44) | [ETAPA-102-ALUNO-VE-A-PROVA-CORRIGIDA-DEPOIS-DA.md](etapas/ETAPA-102-ALUNO-VE-A-PROVA-CORRIGIDA-DEPOIS-DA.md) |
| 103 | Prova Prática ADAG renomeada para PROVA-PRATICA-01.html (tarefa pequena, 2026-10-08 20:26:16) | [ETAPA-103-PROVA-PRATICA-ADAG-RENOMEADA-PARA-PROVA-PRATICA.md](etapas/ETAPA-103-PROVA-PRATICA-ADAG-RENOMEADA-PARA-PROVA-PRATICA.md) |
| 103 | Práticas de Testes de Front-End em `ATIVIDADES/CONTEUDO/` e sem empresa fictícia (pedido em 2026-10-08 20:29:54) | [ETAPA-103-PRATICAS-DE-TESTES-DE-FRONT-END-EM.md](etapas/ETAPA-103-PRATICAS-DE-TESTES-DE-FRONT-END-EM.md) |
| 104 | Menu das atividades desligado em todas as páginas (tarefa pequena, 2026-10-08 20:33:13) | [ETAPA-104-MENU-DAS-ATIVIDADES-DESLIGADO-EM-TODAS-AS.md](etapas/ETAPA-104-MENU-DAS-ATIVIDADES-DESLIGADO-EM-TODAS-AS.md) |
| 105 | Botões SOMENTE ENSALADO e VER TODAS MATÉRIAS na faixa de matérias (pedido em 2026-10-08 23:42:02) | [ETAPA-105-BOTOES-SOMENTE-ENSALADO-E-VER-TODAS-MATERIAS.md](etapas/ETAPA-105-BOTOES-SOMENTE-ENSALADO-E-VER-TODAS-MATERIAS.md) |
| 106 | Aluno líder (`usuario.lider` 1/0) cadastra e altera equipes (tarefa grande, aprovada em 2026-10-08 23:53) | [ETAPA-106-ALUNO-LIDER-CADASTRA-E-ALTERA-EQUIPES.md](etapas/ETAPA-106-ALUNO-LIDER-CADASTRA-E-ALTERA-EQUIPES.md) |
| 107 | Tela TURMAS como consulta (CRUD) com modais (pedido em 2026-10-09 00:06:32) | [ETAPA-107-TELA-TURMAS-COMO-CONSULTA-COM-MODAIS.md](etapas/ETAPA-107-TELA-TURMAS-COMO-CONSULTA-COM-MODAIS.md) |
| 108 | Testes de Front-End: objetivas e práticas das aulas 01 a 03 + `docs/REGRAS-ATIVIDADE-PRATICA.md` (pedido em 2026-10-09 00:13:29) | [ETAPA-108-TESTES-DE-FRONT-END-OBJETIVAS-E-PRATICAS.md](etapas/ETAPA-108-TESTES-DE-FRONT-END-OBJETIVAS-E-PRATICAS.md) |
| 109 | Faixa de matérias de todos os cursos abre em SOMENTE ENSALADO (tarefa pequena, pedido em 2026-10-08 21:15:15) | [ETAPA-109-FAIXA-DE-MATERIAS-DE-TODOS-OS-CURSOS.md](etapas/ETAPA-109-FAIXA-DE-MATERIAS-DE-TODOS-OS-CURSOS.md) |
| 110 | Apresentação do professor Gelvazio Camargo na página inicial sem login (tarefa pequena, pedido em 2026-10-09 00:20:57) | [ETAPA-110-APRESENTACAO-DO-PROFESSOR-GELVAZIO-CAMARGO-NA-PAGINA.md](etapas/ETAPA-110-APRESENTACAO-DO-PROFESSOR-GELVAZIO-CAMARGO-NA-PAGINA.md) |
| 111 | Sessão obrigatória em todas as páginas HTML (pedido em 2026-10-09 00:23; aprovada em 2026-10-09 00:28) | [ETAPA-111-SESSAO-OBRIGATORIA-EM-TODAS-AS-PAGINAS-HTML.md](etapas/ETAPA-111-SESSAO-OBRIGATORIA-EM-TODAS-AS-PAGINAS-HTML.md) |
| 112 | Estilo dos destaques na apresentação do professor (tarefa pequena, pedido em 2026-10-09 00:48) | [ETAPA-112-ESTILO-DOS-DESTAQUES-NA-APRESENTACAO-DO-PROFESSOR.md](etapas/ETAPA-112-ESTILO-DOS-DESTAQUES-NA-APRESENTACAO-DO-PROFESSOR.md) |
| 113 | Botão ON/OFF ao lado de cada atividade em todos os índices (tarefa pequena, pedido em 2026-10-09 00:51) | [ETAPA-113-BOTAO-ON-OFF-AO-LADO-DE-CADA.md](etapas/ETAPA-113-BOTAO-ON-OFF-AO-LADO-DE-CADA.md) |
| 114 | Testes de Front-End: links dos slides nos cards e PDFs das aulas versionados (tarefa pequena, pedido em 2026-10-09 00:45) | [ETAPA-114-TESTES-DE-FRONT-END-LINKS-DOS-SLIDES.md](etapas/ETAPA-114-TESTES-DE-FRONT-END-LINKS-DOS-SLIDES.md) |
| 114 | Testes de Front-End: bloqueio da aula e das atividades; LOG escondido; slides em nova aba (tarefa pequena, pedido em 2026-10-09 01:04) | [ETAPA-114-TESTES-DE-FRONT-END-BLOQUEIO-DA-AULA.md](etapas/ETAPA-114-TESTES-DE-FRONT-END-BLOQUEIO-DA-AULA.md) |
| 115 | Trigger: bloquear a aula bloqueia todas as atividades dela (tarefa de banco, pedido em 2026-10-09 01:09) | [ETAPA-115-TRIGGER-BLOQUEAR-A-AULA-BLOQUEIA-TODAS-AS.md](etapas/ETAPA-115-TRIGGER-BLOQUEAR-A-AULA-BLOQUEIA-TODAS-AS.md) |
| 116 | ID na frente de cada atividade nos índices (tarefa pequena, pedido em 2026-10-09 01:11) | [ETAPA-116-ID-NA-FRENTE-DE-CADA-ATIVIDADE-NOS.md](etapas/ETAPA-116-ID-NA-FRENTE-DE-CADA-ATIVIDADE-NOS.md) |
| 117 | Lista de alunos do Técnico em Informática (SENAI) Manhã em Testes de Front-End (tarefa pequena, pedido em 2026-10-09 12:35:18) | [ETAPA-117-LISTA-DE-ALUNOS-DO-TECNICO-EM-INFORMATICA.md](etapas/ETAPA-117-LISTA-DE-ALUNOS-DO-TECNICO-EM-INFORMATICA.md) |
| 118 | Menu Curso: CRUD de cursos e vínculo de turmas em `cursos.html` (tarefa grande, pedido em 2026-10-09 12:45; aprovada em 2026-10-09 12:50; plano [docs/menu-curso-crud-cursos-turmas.md](docs/menu-curso-crud-cursos-turmas.md)) | [ETAPA-118-MENU-CURSO-CRUD-DE-CURSOS-E-VINCULO.md](etapas/ETAPA-118-MENU-CURSO-CRUD-DE-CURSOS-E-VINCULO.md) |
| 119 | Unidade em um só lugar: tabela `unidade` ligada a `curso` e `turma` (tarefa grande, pedido em 2026-10-09 13:18; aprovada em 2026-10-09 13:23; plano [docs/tabela-unidade-curso-turma.md](docs/tabela-unidade-curso-turma.md)) | [ETAPA-119-UNIDADE-EM-UM-SO-LUGAR-TABELA-UNIDADE.md](etapas/ETAPA-119-UNIDADE-EM-UM-SO-LUGAR-TABELA-UNIDADE.md) |
| 120 | Curso desativado some do índice; unidade do banco nas abas de criar usuários (pedido em 2026-10-09 13:50) | [ETAPA-120-CURSO-DESATIVADO-SOME-DO-INDICE-UNIDADE-DO.md](etapas/ETAPA-120-CURSO-DESATIVADO-SOME-DO-INDICE-UNIDADE-DO.md) |
| 121 | Progresso da turma GLOBAL em todas as atividades (tarefa grande, pedido em 2026-10-09 10:22:23; aprovada em 2026-10-09 10:31; plano [docs/progresso-global-atividades.md](docs/progresso-global-atividades.md)) | [ETAPA-121-PROGRESSO-DA-TURMA-GLOBAL-EM-TODAS-AS.md](etapas/ETAPA-121-PROGRESSO-DA-TURMA-GLOBAL-EM-TODAS-AS.md) |
| 122 | Seção "Pull Requests" no `CLAUDE.md` (só na nuvem) (tarefa pequena, pedido em 2026-10-09 11:03:21) | [ETAPA-122-SECAO-PULL-REQUESTS-NO-CLAUDE-MD.md](etapas/ETAPA-122-SECAO-PULL-REQUESTS-NO-CLAUDE-MD.md) |
| 123 | Conflitos do merge do PR #11 e `CLAUDE.md` apontando para `tasks/` (tarefa pequena, pedido em 2026-10-09 12:20) | [ETAPA-123-CONFLITOS-DO-MERGE-DO-PR-11-E.md](etapas/ETAPA-123-CONFLITOS-DO-MERGE-DO-PR-11-E.md) |
| 124 | Pendências: coluna "Descrição" (tarefa grande — banco, pedido em 2026-10-09 12:51:22; plano [docs/pendencias-coluna-descricao.md](../docs/pendencias-coluna-descricao.md)) | [ETAPA-124-PENDENCIAS-COLUNA-DESCRICAO.md](etapas/ETAPA-124-PENDENCIAS-COLUNA-DESCRICAO.md) |
| 125 | Banco de Dados 100% no padrão da ITIC, etapa 1 sem a apostila (tarefa grande #20-2ac1a8ec-911b-466f, pedida em 2026-10-09 13:26:40) | [ETAPA-125-BANCO-DE-DADOS-100-NO-PADRAO-DA.md](etapas/ETAPA-125-BANCO-DE-DADOS-100-NO-PADRAO-DA.md) |
| 126 | Regra: prática de uma aula = 10 × 3; prova id 82 só como referência dos recursos (tarefa pequena, pedido em 2026-10-09 14:04:30) | [ETAPA-126-REGRA-PRATICA-DE-UMA-AULA-10-3.md](etapas/ETAPA-126-REGRA-PRATICA-DE-UMA-AULA-10-3.md) |
| 127 | Gabarito no Git e fora da Vercel; prova prática segue a regra nova (tarefa pequena, pedido em 2026-10-09 14:09) | [ETAPA-127-GABARITO-NO-GIT-E-FORA-DA-VERCEL.md](etapas/ETAPA-127-GABARITO-NO-GIT-E-FORA-DA-VERCEL.md) |
| 128 | Regra: na nuvem, cada arquivo criado = commit + push na hora (tarefa pequena, pedido em 2026-10-09 14:58:46) | [ETAPA-128-REGRA-NA-NUVEM-CADA-ARQUIVO-CRIADO-COMMIT.md](etapas/ETAPA-128-REGRA-NA-NUVEM-CADA-ARQUIVO-CRIADO-COMMIT.md) |
| 129 | Regra: na nuvem, sem a pergunta do log da sessão (tarefa pequena, pedido em 2026-10-09 15:00:25) | [ETAPA-129-REGRA-NA-NUVEM-SEM-A-PERGUNTA-DO.md](etapas/ETAPA-129-REGRA-NA-NUVEM-SEM-A-PERGUNTA-DO.md) |
| 130 | Remover o registro da sessão em `SESSOES-CLAUDE/` (tarefa pequena, pedido em 2026-10-09 15:03:21) | [ETAPA-130-REMOVER-O-REGISTRO-DA-SESSAO-EM-SESSOES.md](etapas/ETAPA-130-REMOVER-O-REGISTRO-DA-SESSAO-EM-SESSOES.md) |
| 131 | Revisão do PR #14 (CodeRabbit): resumo do STATUS-EMENTAS e BANCO-AVA (tarefa pequena, 2026-10-09 15:08:10) | [ETAPA-131-REVISAO-DO-PR-14-RESUMO-DO-STATUS.md](etapas/ETAPA-131-REVISAO-DO-PR-14-RESUMO-DO-STATUS.md) |
| 132 | `.gitignore` mínimo e `.vercelignore` (tarefa pequena, pedido em 2026-10-09 17:20) | [ETAPA-132-GITIGNORE-MINIMO-E-VERCELIGNORE.md](etapas/ETAPA-132-GITIGNORE-MINIMO-E-VERCELIGNORE.md) |
| 133 | Lista de presença em um arquivo único `scripts/LISTAPRESENCA.js` (tarefa grande, pedido em 2026-10-09 17:45; plano [docs/lista-presenca-arquivo-unico.md](../docs/lista-presenca-arquivo-unico.md)) | [ETAPA-133-LISTA-DE-PRESENCA-EM-UM-ARQUIVO-UNICO.md](etapas/ETAPA-133-LISTA-DE-PRESENCA-EM-UM-ARQUIVO-UNICO.md) |
| 134 | Regra do `graphify update .` removida (tarefa pequena, pedido em 2026-10-09 18:05) | [ETAPA-134-REGRA-DO-GRAPHIFY-UPDATE-REMOVIDA.md](etapas/ETAPA-134-REGRA-DO-GRAPHIFY-UPDATE-REMOVIDA.md) |
| 135-eeefc710 | Colaboração entre sessões e licenças pelo `STATUS.md` | [ETAPA-135-eeefc710-COLABORACAO-ENTRE-SESSOES.md](etapas/ETAPA-135-eeefc710-COLABORACAO-ENTRE-SESSOES.md) |
| 136-f0a07de9 | Registro dos seeds aplicados e item próprio em cada tarefa | [ETAPA-136-f0a07de9-REGISTRO-DOS-SEEDS-APLICADOS.md](etapas/ETAPA-136-f0a07de9-REGISTRO-DOS-SEEDS-APLICADOS.md) |
| 137-b214e26b | Status das aulas conferidos pela carga horária da ementa (FTP, Reforço de Matemática, Análise de Dados) | [ETAPA-137-b214e26b-STATUS-DAS-AULAS-PELA-CARGA-HORARIA.md](etapas/ETAPA-137-b214e26b-STATUS-DAS-AULAS-PELA-CARGA-HORARIA.md) |
| 137-13665a7e | Testes de Front-End: objetivas e práticas das aulas 04 a 10 (pedido em 2026-10-09 23:04:01; plano [docs/testes-frontend-aulas-04-a-10.md](../docs/testes-frontend-aulas-04-a-10.md)) | [ETAPA-137-13665a7e-TESTES-DE-FRONT-END-AULAS-04-A-10.md](etapas/ETAPA-137-13665a7e-TESTES-DE-FRONT-END-AULAS-04-A-10.md) |
| 138-77338471 | `STATUS_MATERIA.md` em cada matéria e ordem das matérias (`tasks/ORDEM-MATERIAS.md`) | [ETAPA-138-77338471-STATUS-MATERIA-E-ORDEM-DAS-MATERIAS.md](etapas/ETAPA-138-77338471-STATUS-MATERIA-E-ORDEM-DAS-MATERIAS.md) |
| 139-b5ab1a00 | Regra global de matérias (`docs/regras/materias.md`) no lugar da "matéria modelo ITIC" | [ETAPA-139-b5ab1a00-REGRA-GLOBAL-DE-MATERIAS.md](etapas/ETAPA-139-b5ab1a00-REGRA-GLOBAL-DE-MATERIAS.md) |
| 140-8554d88e | Tarefas agendadas seguindo as regras do projeto (`docs/regras/tarefas-agendadas.md`) | [ETAPA-140-8554d88e-TAREFAS-AGENDADAS-NAS-REGRAS.md](etapas/ETAPA-140-8554d88e-TAREFAS-AGENDADAS-NAS-REGRAS.md) |
| 141-a7e81c26 | Agendamentos: CRUD e espelho dos controles no banco (#23) | [ETAPA-141-a7e81c26-AGENDAMENTOS-CRUD-E-BANCO.md](etapas/ETAPA-141-a7e81c26-AGENDAMENTOS-CRUD-E-BANCO.md) |
| 142-2a52ee2f | Fila `tasks` no banco + 1 agendador (#24) | [ETAPA-142-2a52ee2f-FILA-TASKS-AGENDADOR-UNICO.md](etapas/ETAPA-142-2a52ee2f-FILA-TASKS-AGENDADOR-UNICO.md) |
| 143-d30a9c4d | Atividades só no banco, layout global e pasta sem HTML (#25) | [ETAPA-143-d30a9c4d-ATIVIDADES-SO-NO-BANCO-LAYOUT-GLOBAL.md](etapas/ETAPA-143-d30a9c4d-ATIVIDADES-SO-NO-BANCO-LAYOUT-GLOBAL.md) |
| 144-aff33423 | Regras no banco: `regra_documento` e `regra_secao` (#26) | [ETAPA-144-aff33423-REGRAS-NO-BANCO.md](etapas/ETAPA-144-aff33423-REGRAS-NO-BANCO.md) |
| 145-ae3cea8d | Resolver o conflito de tasks/STATUS.md e preservar os caminhos corrigidos (commit d88a095) | [ETAPA-145-ae3cea8d-MERGE-STATUS-LOCAL.md](etapas/ETAPA-145-ae3cea8d-MERGE-STATUS-LOCAL.md) |
| 146-042b2fe8 | Reestruturar `.claude/rules/` (sem duplicação, ≤ 5 KB por arquivo) | [ETAPA-146-042b2fe8-REESTRUTURAR-CLAUDE-RULES.md](etapas/ETAPA-146-042b2fe8-REESTRUTURAR-CLAUDE-RULES.md) |
| 147-9201b27b | Visualizador de regras e tarefas em `.claude/rules/index.html` | [ETAPA-147-9201b27b-VISUALIZADOR-REGRAS-E-TASKS.md](etapas/ETAPA-147-9201b27b-VISUALIZADOR-REGRAS-E-TASKS.md) |
| 148-6932a263 | Revisão das regras e quadro de tarefas com fonte única nos arquivos (#29) | [ETAPA-148-6932a263-REGRAS-E-QUADRO-FONTE-UNICA.md](etapas/ETAPA-148-6932a263-REGRAS-E-QUADRO-FONTE-UNICA.md) |
| 149-b8f5e662 | Apostilas só em Markdown (.md) (#2; criada na migração do quadro) | [ETAPA-149-b8f5e662-APOSTILAS-SO-EM-MARKDOWN-MD.md](etapas/ETAPA-149-b8f5e662-APOSTILAS-SO-EM-MARKDOWN-MD.md) |
| 150-2ecf082a | Preencher PLANO-AULAS.md em 8 disciplinas (#4; criada na migração do quadro) | [ETAPA-150-2ecf082a-PREENCHER-PLANO-AULAS-MD-EM-8-DISCIPLINAS.md](etapas/ETAPA-150-2ecf082a-PREENCHER-PLANO-AULAS-MD-EM-8-DISCIPLINAS.md) |
| 151-132192cf | Organizar atividades em ATIVIDADES/ (#5; criada na migração do quadro) | [ETAPA-151-132192cf-ORGANIZAR-ATIVIDADES-EM-ATIVIDADES.md](etapas/ETAPA-151-132192cf-ORGANIZAR-ATIVIDADES-EM-ATIVIDADES.md) |
| 152-5b8be7d5 | Preencher AVALIACOES/ (#6; criada na migração do quadro) | [ETAPA-152-5b8be7d5-PREENCHER-AVALIACOES.md](etapas/ETAPA-152-5b8be7d5-PREENCHER-AVALIACOES.md) |
| 153-d69eef66 | Executar análise final (#7; criada na migração do quadro) | [ETAPA-153-d69eef66-EXECUTAR-ANALISE-FINAL.md](etapas/ETAPA-153-d69eef66-EXECUTAR-ANALISE-FINAL.md) |
| 154-58b81f3e | Duração dos vídeos da apostila de Fundamentos da Tecnologia (local) (#12; criada na migração do quadro) | [ETAPA-154-58b81f3e-DURACAO-DOS-VIDEOS-DA-APOSTILA-DE-FUNDAMENTOS-DA.md](etapas/ETAPA-154-58b81f3e-DURACAO-DOS-VIDEOS-DA-APOSTILA-DE-FUNDAMENTOS-DA.md) |
| 155-e3d89d81 | Duração dos vídeos da apostila de Exploração de Carreiras (local) (#14; criada na migração do quadro) | [ETAPA-155-e3d89d81-DURACAO-DOS-VIDEOS-DA-APOSTILA-DE-EXPLORACAO-DE.md](etapas/ETAPA-155-e3d89d81-DURACAO-DOS-VIDEOS-DA-APOSTILA-DE-EXPLORACAO-DE.md) |
| 156-2221f1f9 | Análise contínua das matérias (#19; criada na migração do quadro) | [ETAPA-156-2221f1f9-ANALISE-CONTINUA-DAS-MATERIAS.md](etapas/ETAPA-156-2221f1f9-ANALISE-CONTINUA-DAS-MATERIAS.md) |
| 157-376bafe4 | Correção das provas discursivas pela IA (#30, pedida em 2026-10-14) | [ETAPA-157-376bafe4-CORRECAO-PROVAS-DISCURSIVAS.md](etapas/ETAPA-157-376bafe4-CORRECAO-PROVAS-DISCURSIVAS.md) |
| 158-fe84910c | Aula bloqueada: aluno não abre os slides (#31, pedida em 2026-10-14) | [ETAPA-158-fe84910c-SLIDES-DE-AULA-BLOQUEADA.md](etapas/ETAPA-158-fe84910c-SLIDES-DE-AULA-BLOQUEADA.md) |
| 159-a45aa9a6 | Desafio 1: 3 casos de teste do Login (#32, pedida em 2026-10-14) | [ETAPA-159-a45aa9a6-DESAFIO-01-CASOS-DE-TESTE-LOGIN.md](etapas/ETAPA-159-a45aa9a6-DESAFIO-01-CASOS-DE-TESTE-LOGIN.md) |

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
| 2026-10-13 10:11 | Quadro com fonte única nos arquivos (sem `TASKS.md`; fila do banco deixa de ser fonte); plano de tarefa grande fica na própria etapa (sem `docs/`); regras de tarefas reutilizáveis em `.claude/rules/tasks/` | Usuário | Mesma informação anotada em 3 ou 4 lugares |
| 2026-10-09 21:30 | Toda matéria tem os 4 status (`STATUS-EMENTAS.md`, `AULAS/STATUS-AULAS.md`, `ATIVIDADES/STATUS-ATIVIDADES.md`, `APOSTILA/STATUS-APOSTILA.md`); criados só com a estrutura (tudo ⬜) nas que faltavam — 34 matérias completas (commits até `bfd7fb2`) | Usuário | Primeiro passo de toda matéria é ter o status de todas as aulas |
| 2026-10-09 20:59 | Antes de começar ou continuar qualquer tarefa, concluir todos os seeds de `database/SEEDS-APLICADOS.md` (regra "🌱 REGRA — SEEDS DO BANCO" do `CLAUDE.md`); os que dependem de decisão vão para "⏳ Aguardando o usuário" | Usuário | Banco sempre em dia com os arquivos antes do trabalho seguir |
| 2026-10-09 14:09 | Gabarito (fontes, padrões de resposta, seeds) vai para o Git e fica fora da Vercel (`.vercelignore`); prova prática de várias aulas segue a regra nova (20 × 3) mesmo divergindo da ITIC | Usuário | Não perder fontes na nuvem e não publicar respostas no site |
| 2026-10-09 13:58 | Fontes das atividades de Banco de Dados (`*QUESTOES.md`, `-GABARITO.md`) entram no Git e ficam fora do site (`*QUESTOES.md` no `.vercelignore`); seeds em `database/` não entram no commit | Usuário | Na nuvem, o que não entra no commit se perde ao fim da sessão |
| 2026-10-09 13:40 | Banco de Dados: 80 h / 20 aulas, pasta `BANCO-DE-DADOS`, PostgreSQL, apagar os arquivos antigos | Usuário | Plano da tarefa #20 |
| 2026-10-08 20:00 | Aulas de Testes de Front-End sem empresa fictícia ("você como aluno consultor"), mesmo com a regra 4 da Seção IX da ementa da matéria pedindo empresas fictícias | Claude, pela regra global de 2026-10-08 | A regra global é mais nova; a divergência fica avisada ao usuário |
| 2026-10-08 | Comunicação Oral e Escrita (Rio do Sul): atividade de 50 questões só nas aulas 01 a 07; aula 08 = Avaliação Prática e aula 09 = Avaliação Objetiva (30 questões). Fontes com gabarito não entram em commit até o usuário ajustar o `.gitignore` | Usuário | Aulas 08 e 09 são de avaliação; o usuário cuida do `.gitignore` |
| 2026-10-07 | Comunicação Oral e Escrita (Rio do Sul): 9 aulas (8 × 4h + 1 × 1h), só C1–C4 oficiais, empresa fictícia Vale Tech, avaliação prática 6,0 (aula 8) + objetiva 4,0 (aula 9) | Usuário | Aceite B.4 do plano, perguntas uma por vez |
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
| #31: o PDF dos slides aberto pelo endereço direto continua acessível ao aluno | Arquivo estático do site; fechar exige servir os PDFs pelo Supabase Storage privado (tarefa grande, todas as matérias) | Quando o usuário pedir |
| #29: prompt da rotina "Tarefa Aulas Senai" no claude.ai ainda fala da fila `tasks` do banco | A rotina está desligada e o prompt fica fora do repositório | Antes de ligar a rotina (item 140.6) |
| #29: rotina de nuvem × "banco só pelo Claude Code local" (log em `agendamento_tarefa_logs` e cópia das regras da #26) | Decisão do usuário (`docs/regras/tarefas-agendadas.md` §3) | Antes de ligar a rotina |
| #29: a #26 (regras no banco) é uma cópia das regras — decidir se continua com a fonte única nos arquivos | Tarefa reservada por outra frente | Quando o usuário decidir |
| #29: duas etapas com o número 114 (BLOQUEIO e LINKS) | Histórico; o quadro agora usa o link do arquivo | Só se o usuário pedir |
| #29: horários 12:26/12:27 de 2026-10-13 nas tarefas #15 e #18 parecem UTC (3 h a mais) | Escritos por outra frente | Só se o usuário pedir |
| #29: skill `proxima-task` com `evals` e `test_output.md` no formato antigo | Não mexer em testes sem pedido | Só se o usuário pedir |
| #29: cópia `~/.agents/skills/documentacao-padrao` sem a exceção do quadro | Fora do repositório; só é usada em projeto sem quadro | Se o usuário quiser |
| Progresso da turma para o professor em **todas** as atividades (discursivas: ligar o campo; objetivas: módulo equivalente em `respostas-atividade.js`) | Começou só pela prova ADAG id 82 (pedido do usuário) | Quando o usuário pedir |
| Nome "08-10-2026" da prova id 82 está **só no HTML**: regerar a página pelo `.md` volta para "06-10-2026" | Usuário pediu a correção apenas no HTML | Antes de regerar, trocar o `Rótulo da aula` no `.md` (se o usuário quiser) |
| Ligar `Bloquear colar: sim` nas outras avaliações discursivas (e, opcional, registrar no banco as tentativas de colar) | Usuário sem tempo em 2026-10-08; começou só pela prova ADAG id 82 | Quando o usuário pedir (regra em `docs/regras/atividades.md`) |
| Botão "Exportar em Word" na apostila (`assets/js/apostila.js`) e nas páginas antigas com PDF próprio (`REFORCO_MATEMATICA.../AULAS/`) | Fora das atividades com `atividade.js`/`atividade-pratica-excel.js` | Quando forem mexidas ou a pedido do usuário |
| Destino da pasta `Testes de Sistemas-EXISTENTES` (não é UC do curso) | Decisão do usuário | Quando o usuário decidir |
| Renomear `BANCO_DE_DADOS` e `TESTES-DE-FRONTEND` para o padrão | Só a pedido do usuário | Quando o usuário pedir |
| Professor conferir o conteúdo dos vídeos das duas apostilas (coluna "Vídeos conferidos pelo professor") | Só o professor valida o conteúdo | Na validação das apostilas |

## Lições aprendidas
| Data | O que aconteceu | Lição / nova regra |
|------|-----------------|--------------------|
| 2026-10-13 10:40 | `git add -A --pathspec-from-file` parou num arquivo já removido com `git rm`, e o commit da #29 saiu só com as exclusões (corrigido com um 2º commit, sem force) | Conferir o `git diff --cached --name-only` **antes** do commit e parar se o `git add` der erro (como manda o `git-quick.md`) |
| 2026-10-08 20:15 | No Git Bash local, `TZ=America/Sao_Paulo date` mostrou a hora em UTC (3 h a mais) | Na máquina local, pegar a hora com `Get-Date -Format "yyyy-MM-dd HH:mm:ss"` (PowerShell), como manda o CLAUDE.md |
| 2026-10-03 | A análise de 2026-09-08 dizia ITIC presencial e Banco de Dados "completo" | Conferir sempre a ementa do curso e as pastas reais antes de afirmar situação |
| 2026-10-03 | Abri os slides em PDF da aula 01 para montar a aula | PDF nunca é fonte: conteúdo e conferência só pelos `.md` (ementa primeiro) — regra no `CLAUDE.md` |

