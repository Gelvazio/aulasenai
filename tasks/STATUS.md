# STATUS — Aulas SENAI

**Objetivo:** registrar, item por item, cada tarefa do projeto para que qualquer pessoa ou IA
retome o trabalho de onde parou.
**Partes interessadas:** Professor Gelvazio (decide, aprova e usa) · alunos (usam os materiais)
**Links:** [Regras](../CLAUDE.md) · [Planos](../docs/) · [Tarefas](TASKS.md) · [Recados entre sessões](RECADOS.md) · [Etapas](etapas/)
**Próximo passo:** cada frente de trabalho tem o seu — ver a tabela **"🧭 Frentes de trabalho"** logo abaixo (atualizar a linha da sua frente ao parar).

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## 🧭 Frentes de trabalho (próximo passo de cada sessão/licença)

Uma linha por frente = **ambiente + branch** (regra "CONVERSA ENTRE SESSÕES E LICENÇAS" do `CLAUDE.md`).
Cada sessão atualiza **só a linha dela** ao começar e ao parar; frente encerrada (PR juntado e nada
pendente) muda para `⏹️ Encerrada`.

| Frente (ambiente · branch) | Tarefa/etapa | Próximo passo | Situação | Atualizado em |
|---|---|---|---|---|
| nuvem · claude/festive-maxwell-25jnhl | #21 (Etapa 135-eeefc710); #20 assumida em 2026-10-10 16:27 pela frente verificar-status-pastas, a pedido do usuário. Antes: #20 (Etapa 125) e #21 (Etapa 135-eeefc710) | Aula 19 de Banco de Dados pronta (conteúdo, objetiva, prática); seeds: objetiva id 141 CONCLUÍDO, prática id 142 com 29 de 30 tópicos (falta o 6c, que precisa da confirmação do usuário no conector). Próximo: tópico 6c da aula 19 (com a confirmação do usuário) e depois a aula 20 (conteúdo + objetiva + prática), plano [docs/banco-de-dados-materia-100.md](../docs/banco-de-dados-materia-100.md) | 🔄 Ativa | 2026-10-09 21:27 |
| nuvem · claude/verificar-status-pastas-c6s5yz | Etapas 137-b214e26b e 138-77338471; #20 (Etapa 125) | Aula 20 de Banco de Dados pronta e no banco (objetiva id 145, prática id 146). Regra global de matérias criada (Etapa 139). Próximo: item 125.5 — avaliações objetivas, prática e média final pela regra global (seção 6); o tópico 6c da aula 19 espera o usuário rodar no SQL Editor | 🔄 Ativa | 2026-10-10 22:13 |
| nuvem · ccr-00f69e8a-6qcla9 | #26 (Etapa 144-aff33423); Etapa 140-8554d88e | #26: item 144.5 — primeira cópia das regras no banco e `conferir`; depois aceite (144.6) | 🔄 Ativa | 2026-10-11 06:28 |
| nuvem · ccr-be208aef-c6h8oe | #24 (Etapa 142-2a52ee2f) | Fila `tasks` pronta (tabela, funções, `tasks.html`, regra, prompt da rotina, 17 tarefas do `TASKS.md` na tabela). Próximo: item 142.5 — teste e aceite do usuário; a rotina continua desligada até liberar o GitHub (140.6) | 👀 Aguardando o usuário | 2026-10-11 06:00 |
| nuvem · claude/ola-zlzh8z | #22-f79be83e-0418-43e8 (Etapa 137-13665a7e) | Item 137.2 — aula 05 de Testes de Front-End (objetiva + prática + seeds); aulas 04 a 04 ✅. ⛔ Não mexer em Banco de Dados nesta sessão | 🔄 Ativa | 2026-10-10 16:21 |
| local · main | — | Ao iniciar: ler este arquivo e o `RECADOS.md` e preencher esta linha | ⬜ Sem registro | — |

## 📌 Tarefas do `TASKS.md` (o status oficial fica aqui)

A descrição longa de cada tarefa está no [TASKS.md](TASKS.md); o status vale **só** nesta tabela. **Em uso por** = frente que reservou a tarefa (ninguém mais mexe nela até ser liberada com `—`).

| Tarefa | Descrição curta | Status | Próximo passo | Em uso por |
|--------|-----------------|--------|---------------|------------|
| #2 | Apostilas só em Markdown (.md) | 🔄 Plano aguardando aprovação | Usuário aprova os itens A–E de `docs/tarefa-02-apostilas-em-markdown.md` | — |
| #4 | Preencher `PLANO-AULAS.md` em 8 disciplinas | ⬜ Planejada | Aguardando liberação do usuário | — |
| #5 | Organizar atividades em `ATIVIDADES/` | ⬜ Planejada | Aguardando liberação do usuário | — |
| #6 | Preencher `AVALIACOES/` | ⬜ Planejada | Aguardando liberação do usuário | — |
| #7 | Executar análise final | ⬜ Planejada | Aguardando liberação do usuário | — |
| #11 | Conferir a duração dos vídeos da apostila de Reforço de Linguagens | ⬜ Pendente (local) | Fazer na máquina local, com YouTube | — |
| #12 | Conferir a duração dos vídeos da apostila de Fundamentos da Tecnologia | ⬜ Pendente (local) | Fazer na máquina local, com YouTube | — |
| #14 | Conferir a duração dos vídeos da apostila de Exploração de Carreiras | ⬜ Pendente (local) | Fazer na máquina local, com YouTube | — |
| #15 | Apostila de ITIC versão 2 (até 40 páginas, sem vídeos e exercícios) — agora a apostila única (V1 removida) | 👀 Aguardando validação | Aceite do usuário (Etapas 79, 81 e 83) | — |
| #16 | Bloqueio da AULA (card inteiro, `aulas.ativo`) × ON/OFF da atividade (nunca bloqueia o card) em todos os índices | 🔄 Ligada em Testes de Front-End (Etapa 114) | Demais matérias: acrescentar a pasta em `assets/js/indice-bloqueio-aula-config.js`, uma por vez, quando o usuário pedir | — |
| #17 | Fechar a revisão das regras do `CLAUDE.md` (aceites 70.5, 72.8, 73.14; commit `85a8531` com gabarito; ementa fora do tamanho) | ⬜ Pendente — nova sessão | Usuário confere e dá os aceites; decide sobre os gabaritos do commit `85a8531` antes do push | — |
| #18 | Progresso da turma global em todas as atividades (objetivas e discursivas com banco) | 👀 Aguardando validação (Etapa 121) | Item 121.11 (teste e aceite do usuário) | — |
| #19-91cbac65-87ca-45a0 | Análise contínua das matérias (`scripts/analise-materias.py` → `tasks/ANALISE-MATERIAS-RELATORIO.json`) — ⛔ permanente: nunca CONCLUÍDA enquanto houver matéria incompleta ou pendência | 🔄 Em andamento — última rodada 2026-10-10 22:13: 6 cursos, 34 matérias, 2 completas, 32 incompletas | Rodar a rotina no início de cada sessão e ao concluir tarefa em matéria; resolver pendências só a pedido do usuário | — |
| #20-2ac1a8ec-911b-466f | Banco de Dados (Técnico em Informática para Internet) 100% no padrão da ITIC — etapa 1 sem a apostila | 🔄 Em execução (Etapa 125) | Aulas 01 a 20 prontas (125.3 e 125.4 ✅); próximo: item 125.5 — avaliações e média final no modelo da ITIC | nuvem · claude/verificar-status-pastas-c6s5yz (desde 2026-10-10 16:27; pedido do usuário "finalize banco de dados", assumida da frente festive-maxwell) |
| #21-eeefc710-3e74-4928 | Colaboração entre sessões/licenças: etapa com UUID, reserva da tarefa, frentes de trabalho, `RECADOS.md`, merge da `main`, arquivos gerados, uma etapa por arquivo | 👀 Aguardando validação (Etapa 135-eeefc710) | Item 135.6 — aceite do usuário (ele junta o PR na `main`) | nuvem · claude/festive-maxwell-25jnhl (desde 2026-10-09 15:22) |
| #22-f79be83e-0418-43e8 | Testes de Front-End: objetivas e práticas das aulas 04 a 10 (+ ajuste da ementa) | 🔄 Em execução (Etapa 137-13665a7e) | Item 137.2 — aula 05 | nuvem · claude/ola-zlzh8z (desde 2026-10-09 23:04) |
| #22-816fd3fd-ffe8-41e7 | Outras contas e IAs criam as tarefas agendadas 2 a 6 | ⛔ Cancelada em 2026-10-11 06:00 — com o agendador único da #24 não há rotinas 2 a 6 (outras contas/IAs só pegam tasks pela `pegar_proxima_task`) | — | — |
| #23-79fc30a3-c4c9-4a40 | Agendamentos: CRUD em `agendamentos.html` e espelho dos controles no banco | ⛔ Cancelada em 2026-10-11 05:58 — substituída pela #24 (decisão do usuário, 05:44) | — | — |
| #24-9fb25086-5b51-44cb | Fila `tasks` no banco + 1 agendador que lê a fila e decide; página `tasks.html` (substitui a #23) | 👀 Aguardando validação (Etapa 142-2a52ee2f) | Item 142.5 — teste do usuário em `tasks.html` e aceite; depois liberar o GitHub (140.6) e ligar a rotina | — |
| #25-b3e29764-940b-4a82 | Questões da objetiva e da prática só no banco, layout global, pasta da matéria sem HTML (migração) | ⬜ Pendente — dividida em 22 sub-tasks na tabela `tasks` (ids 19 a 40, em cadeia; Etapa 143-d30a9c4d) | 25.01 (TASK-0019) — levantamento; a rotina pega quando for ligada | — |
| #26-55a91111-02ce-4cb1 | Regras no banco: `regra_documento` e `regra_secao` (cópia do repositório) | 🔄 Em execução (Etapa 144-aff33423) | Item 144.5 — primeira cópia e `conferir`; depois aceite | nuvem · ccr-00f69e8a-6qcla9 (desde 2026-10-11 06:21) |

## ⏳ Aguardando o usuário (aceites, aprovações e ações dele)

Da mais recente para a mais antiga. Ao concluir uma linha, marcar o item na etapa e **remover a linha daqui**.

| Etapa | Item | O que falta | Tipo |
|-------|------|-------------|------|
| 125 | 125.8 | rodar no Supabase → SQL Editor o insert do tópico 6c da prática da aula 19 de Banco de Dados (atividade id 142): o conector da nuvem cancela o comando porque o texto cita `DELETE FROM parcela;` (o pedido de aprovação não chega ao usuário) | Ação |
| 144-aff33423 | 144.6 | conferir as regras no banco (`regra_documento`, `regra_secao`) e a regra "🗄️ REGRAS NO BANCO" do `CLAUDE.md` | Aceite |
| 140-8554d88e | 140.6 e 140.7 | liberar o acesso do GitHub ao `Gelvazio/aulasenai` para as tarefas agendadas e conferir a regra `docs/regras/tarefas-agendadas.md` — na fila como TASK-0042 e TASK-0043 (`tasks.html`, marcar ✅ Concluir) | Ação e aceite |
| 139-b5ab1a00 | 139.4 | conferir a regra global de matérias (`docs/regras/materias.md`) e a troca no `CLAUDE.md` | Aceite |
| 138-77338471 | 138.6 | conferir o `STATUS_MATERIA.md` das matérias, a ordem em `tasks/ORDEM-MATERIAS.md` e a regra nova do `CLAUDE.md` | Aceite |
| 137-b214e26b | 137.5 | conferir os status corrigidos de Fundamentos da Tecnologia (9 aulas), Reforço de Matemática (16) e Análise de Dados (8) | Aceite |
| 136-f0a07de9 | 136.5 | aceite do registro `database/SEEDS-APLICADOS.md` e da regra dos seeds | Aceite |
| 137-13665a7e | Testes de Front-End: objetivas e práticas das aulas 04 a 10 (pedido em 2026-10-09 23:04:01; plano [docs/testes-frontend-aulas-04-a-10.md](../docs/testes-frontend-aulas-04-a-10.md)) | [ETAPA-137-13665a7e-TESTES-DE-FRONT-END-AULAS-04-A-10.md](etapas/ETAPA-137-13665a7e-TESTES-DE-FRONT-END-AULAS-04-A-10.md) |
| 124 | 124.4 | testar o modal "➕ Nova Pendência" e a coluna Descrição em `pendencias.html` | Aceite |
| 121 | 121.11 | testar o Progresso da turma global na objetiva da aula 01 de Testes de Front-End (professor vê ao abrir; aluno não vê) e numa discursiva | Aceite |
| 103 | 103.6 | conferir as 10 práticas de Testes de Front-End, agora em `ATIVIDADES/CONTEUDO/` e sem empresa fictícia | Aceite |
| 102 | 102.15 | revisar as 10 aulas de Testes de Front-End em `CONTEUDO/` e o `DOCUMENTACAO/PLANO-AULAS.md` | Aceite |
| 97 | 97.4 | testar a quantidade mínima de questões (botão no Progresso da turma, entrega com o mínimo e nota proporcional) | Aceite |
| 96 | 96.4 | botão Gráficos e progresso global nas discursivas | Aceite |
| 95 | 95.4 | botões Certa / Meia certa / Errada do professor e nota travada (prova id 82) | Aceite |
| 94 | 94.3 | aluno que entregou a Prova Prática ADAG (id 82) não vê as próprias respostas | Aceite |
| 92 | 92.5 | rodar a correção parcial da IA e ver a "Nota parcial IA" no Progresso da turma (prova id 82) | Aceite |
| 91 | 91.2 | coluna "Nota IA" no progresso da turma da Prova Prática ADAG (id 82) | Aceite |
| 90 | 90.2 | orientação da correção por IA da Prova Prática ADAG (`CORRECAO-PROVA-ADAG.md`) | Aceite |
| 89 | 89.5 | testar o progresso da turma (logado como professor) na Prova Prática ADAG (id 82) | Aceite |
| 88 | 88.8 | testar na Prova Prática ADAG (id 82): bloqueio de colar, campo do tamanho da resposta, botão Gravar e entrega só com tudo preenchido | Aceite |
| 82 e 83 | 82.5 e 83.7 | aceite da remoção da V1 (apostila única 2.1), da discursiva id 81 (já aplicada no banco) e das 13 questões novas da objetiva id 85 | Aceite |
| 79 e 81 | 79.8 e 81.5 | validar a apostila ITIC V2 versão 2.1 (28 páginas, sem vídeos e exercícios; S2, S3, normas declaradas e referências complementares) e a paginação/faixa do PDF | Aceite |
| 71 | 71.3 (C) | revisar as 9 aulas de Comunicação Oral e Escrita (Rio do Sul) em `CONTEUDO/` | Aceite |
| 73 | 73.14 | Revisão final das regras (12 itens) aplicada — ver tarefa #17 do `TASKS.md` | Aceite |
| 72 | 72.8 | 7 contradições do CLAUDE.md corrigidas (uma por commit) | Aceite |
| 70 | 70.5 | CLAUDE.md dividido em núcleo + `docs/regras/`, histórico em `docs/HISTORICO-REGRAS.md` e esta tabela; depois, as correções das contradições do CLAUDE.md, uma de cada vez | Aceite |
| 67 | 67.4 | conferir a duração dos 29 vídeos da apostila de Reforço de Linguagens | Aceite |
| 64 | 64.6 | apostila de Reforço de Linguagens | Aceite |
| 66 | 66.2 | menu da matéria | Aceite |
| 63 | 63.2 | link do curso no índice | Aceite |
| 62 | 62.2 | apostila de Testes de Frontend | Aceite |
| 61 | 61.4 | autor, versão, data e hora na apostila da ITIC | Aceite |
| 56 | 56.4 | atividades de sexta: objetiva de 100 e discursiva de 40 | Aceite |
| 51 | 51.3 | importar o .doc no Google Docs | Aceite |
| 50 | 50.3 | header de professor comum sem os menus | Aceite |
| 49 | 49.2 | criar a conta da professora Cintia em `criarUsuariosBancoDados.html` | Ação do usuário/professor |
| 48 | 48.7 | o usuário preenche `docs/rotulos-aulas-ajustar.md` (rótulos "AULA NN") e pede para aplicar; depois 48.8 — aceite | Ação do usuário/professor |
| 44 | 44.4 | liberar e testar a Prova Prática 06-10-2026 | Aceite |
| 38 | 38.3 | gabarito nas discursivas | Aceite |
| 37 | 37.4 | testar Liberar gabaritos como professor e Exportar Gabarito como aluno | Aceite |
| 35 | 35.2 | testar a tabela de notas logado como professor | Aceite |
| 29 | 29.5 | discursivas de sexta | Aceite |
| 28 | 28.2 | aprovação do plano do quadro de respostas | Aprovação |
| 27 | 27.7 | atividade individual da ITIC, sexta à tarde | Aceite |
| 26 | — | Reforço de Linguagens, 10 aulas — continuar do primeiro item não ✅ (quando o usuário liberar) | Continuar (IA) |
| 25 | 25.4 | testar a página de pendências | Aceite |
| 24 | 24.6 | liberar a discursiva no índice e testar | Aceite |
| 23 | 23.3 | conferir e aceitar a etapa | Aceite |
| 22 | 22.4 | conferir e aceitar a etapa | Aceite |
| 21 | 21.3 | conferir e aceitar a etapa | Aceite |
| 20 | 20.2 | professor criar a conta na página local | Ação do usuário/professor |
| 19 | 19.4 | conferir e aceitar a etapa | Aceite |
| 18 | 18.2 | aprovação do plano `docs/vinculo-curso-turma-e-alunos-da-turma.md` | Aprovação |
| — | 6.9 e 4.5 | itens anteriores pendentes (ver as etapas) | Ação do usuário/professor |

## Escopo
- **Entra:** todas as tarefas pedidas pelo usuário neste repositório, a partir de 2026-10-03.
- **Não entra:** histórico anterior (está no Git, em `TASKS.md` e em `docs/`).
- **Critério de pronto:** item verificado, commit local feito e aceite do usuário.
- **Premissas e restrições:** regras do `CLAUDE.md` (sem navegador, push só na nuvem — direto na `main` —, um commit por tarefa).

## 🗂️ Etapas (uma por arquivo em `tasks/etapas/`)

Desde 2026-10-09 cada etapa fica no seu arquivo (regra "CONVERSA ENTRE SESSÕES E LICENÇAS" do `CLAUDE.md`). Etapa nova = arquivo novo `ETAPA-NNN-uuid8-ASSUNTO.md` + linha nesta tabela.

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
| 138-77338471 | `STATUS_MATERIA.md` em cada matéria e ordem das matérias (`tasks/ORDEM-MATERIAS.md`) | [ETAPA-138-77338471-STATUS-MATERIA-E-ORDEM-DAS-MATERIAS.md](etapas/ETAPA-138-77338471-STATUS-MATERIA-E-ORDEM-DAS-MATERIAS.md) |
| 139-b5ab1a00 | Regra global de matérias (`docs/regras/materias.md`) no lugar da "matéria modelo ITIC" | [ETAPA-139-b5ab1a00-REGRA-GLOBAL-DE-MATERIAS.md](etapas/ETAPA-139-b5ab1a00-REGRA-GLOBAL-DE-MATERIAS.md) |
| 140-8554d88e | Tarefas agendadas seguindo as regras do projeto (`docs/regras/tarefas-agendadas.md`) | [ETAPA-140-8554d88e-TAREFAS-AGENDADAS-NAS-REGRAS.md](etapas/ETAPA-140-8554d88e-TAREFAS-AGENDADAS-NAS-REGRAS.md) |
| 141-a7e81c26 | Agendamentos: CRUD e espelho dos controles no banco (#23) | [ETAPA-141-a7e81c26-AGENDAMENTOS-CRUD-E-BANCO.md](etapas/ETAPA-141-a7e81c26-AGENDAMENTOS-CRUD-E-BANCO.md) |
| 142-2a52ee2f | Fila `tasks` no banco + 1 agendador (#24) | [ETAPA-142-2a52ee2f-FILA-TASKS-AGENDADOR-UNICO.md](etapas/ETAPA-142-2a52ee2f-FILA-TASKS-AGENDADOR-UNICO.md) |
| 143-d30a9c4d | Atividades só no banco, layout global e pasta sem HTML (#25) | [ETAPA-143-d30a9c4d-ATIVIDADES-SO-NO-BANCO-LAYOUT-GLOBAL.md](etapas/ETAPA-143-d30a9c4d-ATIVIDADES-SO-NO-BANCO-LAYOUT-GLOBAL.md) |
| 144-aff33423 | Regras no banco: `regra_documento` e `regra_secao` (#26) | [ETAPA-144-aff33423-REGRAS-NO-BANCO.md](etapas/ETAPA-144-aff33423-REGRAS-NO-BANCO.md) |

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
| 2026-10-08 20:15 | No Git Bash local, `TZ=America/Sao_Paulo date` mostrou a hora em UTC (3 h a mais) | Na máquina local, pegar a hora com `Get-Date -Format "yyyy-MM-dd HH:mm:ss"` (PowerShell), como manda o CLAUDE.md |
| 2026-10-03 | A análise de 2026-09-08 dizia ITIC presencial e Banco de Dados "completo" | Conferir sempre a ementa do curso e as pastas reais antes de afirmar situação |
| 2026-10-03 | Abri os slides em PDF da aula 01 para montar a aula | PDF nunca é fonte: conteúdo e conferência só pelos `.md` (ementa primeiro) — regra no `CLAUDE.md` |

