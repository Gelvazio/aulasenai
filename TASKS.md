# 📋 TAREFAS — SENAI Aulas

**Quadro da tarefa atual + histórico de todos os pedidos do usuário.** Regra
"REGISTRO DE TODO PEDIDO NO `TASKS.md`" do `CLAUDE.md` (2026-10-07).

- 🕒 **Data e hora sempre com segundos:** `AAAA-MM-DD HH:MM:SS`, horário de Brasília.
- 🔄 **Ao receber um pedido:** a entrada nasce em "TAREFA ATUAL" (pedido, início, passos).
- ✅ **Ao concluir:** conclusão, duração, commit e plano; a entrada vai para o histórico (mais
  recente primeiro). O `TASKS.md` entra no mesmo commit da tarefa.
- 📌 Histórico de 2026-10-01 a 2026-10-07 reconstruído dos commits (horário do commit =
  conclusão; o início não foi registrado). Daqui em diante, início e conclusão são anotados.

---

## 🔄 TAREFA ATUAL

_Nenhuma tarefa em andamento._

<!-- Modelo de entrada:
### TAAAAMMDD-NN — <título curto>
- **Pedido:** "<palavras do usuário>"
- **Início:** AAAA-MM-DD HH:MM:SS · **Status:** 🔄 Em andamento
- **Plano:** docs/<tarefa>.md (se houver)
- **Passos:**
  - [ ] passo 1
  - [x] passo 2 — ✅ AAAA-MM-DD HH:MM:SS
- **Conclusão:** AAAA-MM-DD HH:MM:SS · **Duração:** HH:MM:SS · **Commit:** `abc1234`
-->

---

## 📜 HISTÓRICO DE TAREFAS (mais recente primeiro)

Uma linha por tarefa (= 1 commit, regra "COMMIT POR TAREFA"); dentro do dia, da mais antiga para
a mais nova. Total registrado: 316 tarefas.

### 2026-10-07 — 24 tarefa(s)

| ID | Concluída em | Tarefa (commit) | Commit | Plano |
|---|---|---|---|---|
| T20261007-01 | 2026-10-07 08:17:54 | feat(itic): trabalho em equipe com modelo equivalente por papel e lista do manual em 3 partes (modelo e responsável por etapa) | `a33dc0a` | — |
| T20261007-02 | 2026-10-07 08:20:22 | feat(itic): lista do manual com título original e 1 etapa por modelo (Etapa 1 a 7) | `4d14a3b` | — |
| T20261007-03 | 2026-10-07 10:25:59 | ok | `c79719f` | `docs/vinculo-curso-turma-e-alunos-da-turma.md` |
| T20261007-04 | 2026-10-07 12:43:29 | feat(itic): modelo da Introdução (analista) no trabalho em equipe do manual | `c4ff4a7` | — |
| T20261007-05 | 2026-10-07 13:07:21 | feat(usuarios): aba Professores em criarUsuariosBancoDados com os professores de todas as listas | `192e8d8` | — |
| T20261007-06 | 2026-10-07 13:09:06 | fix(usuarios): aba Professores sempre visível e perfil sem diferenciar maiúsculas | `a768704` | — |
| T20261007-07 | 2026-10-07 13:09:42 | feat(usuarios): aba Professores lê todas as pessoas do LISTA-PRESENCA-PROFESSOR.js | `2c8c51f` | — |
| T20261007-08 | 2026-10-07 13:50:24 | docs(status): professora Cintia Simone Grimm na lista de professores (lista fora do Git) | `712fe92` | — |
| T20261007-09 | 2026-10-07 13:55:30 | feat(header): menus USUARIOS/RELATORIOS/ALUNOS/CORREÇÃO só para o Professor Administrador | `322ef3c` | — |
| T20261007-10 | 2026-10-07 14:02:35 | feat(apostilas): HTML gerado a partir do Markdown completo da apostila | `26c5772` | — |
| T20261007-11 | 2026-10-07 14:48:54 | chore(itic): pasta RESOLUCAO fora do Git/Vercel e registro da resolução do Grupo 04 | `5fba83d` | — |
| T20261007-12 | 2026-10-07 15:32:30 | docs(status): resolução do Grupo 04 com os nomes reais das integrantes | `b1d77b6` | — |
| T20261007-13 | 2026-10-07 15:34:21 | docs(status): papéis das integrantes do Grupo 04 na resolução | `38e307f` | — |
| T20261007-14 | 2026-10-07 16:11:04 | fix(atividades): ler respostas, entrega e tentativa só do usuário logado | `7c950ce` | — |
| T20261007-15 | 2026-10-07 16:19:17 | feat(itic): atividade individual de sexta com 50 questões da apostila (cap. 01 a 07) | `40f9207` | — |
| T20261007-16 | 2026-10-07 16:24:49 | feat(discursivas): combo Aluno do professor para carregar as respostas de cada aluno | `1013b98` | — |
| T20261007-17 | 2026-10-07 16:43:52 | feat(itic): sexta com 1 objetiva de 100 e discursiva de 40, respostas na apostila | `aee4240` | — |
| T20261007-18 | 2026-10-07 16:52:46 | feat(itic): aviso de atividade individual só com a apostila na discursiva de sexta | `cebd540` | — |
| T20261007-19 | 2026-10-07 17:00:57 | feat(itic): discursiva de sexta reduzida para 30 questões (cabe em 4 h) | `609ead0` | — |
| T20261007-20 | 2026-10-07 17:01:48 | fix(indice): título do índice de cursos volta a ser "Cursos" | `1608f63` | — |
| T20261007-21 | 2026-10-07 17:03:24 | docs(status): turma 135081 responde até 17h15 | `94230bd` | — |
| T20261007-22 | 2026-10-07 19:48:22 | docs(apostila): registro da apostila de ITIC concluída (TASKS, plano e status da regra) | `d07267e` | — |
| T20261007-23 | 2026-10-07 19:51:35 | Registrar a regra do `TASKS.md` (todo pedido anotado, data e hora com segundos) e preencher o histórico de outubro (início 2026-10-07 19:50:36) | este commit (`docs(tarefas): ...`) | — |
| T20261007-24 | 2026-10-07 20:03:42 | Resolver os conflitos do `CLAUDE.md` com as decisões do usuário (Word não global; push/PR só com pedido explícito; Reforço de Linguagens) + gerador da apostila pela soma das horas (início 2026-10-07 20:01:51) | este commit (`docs(regras): resolve conflitos ...`) | — |

### 2026-10-06 — 67 tarefa(s)

| ID | Concluída em | Tarefa (commit) | Commit | Plano |
|---|---|---|---|---|
| T20261006-01 | 2026-10-06 07:54:48 | feat(indice): data da aula nos cards e botão Editar aula (professor grava aulas.data_planejada) | `32a10b6` | — |
| T20261006-02 | 2026-10-06 08:16:53 | docs(status): aluna Bianca Pamela na lista da turma QA LBTSN 2026/1 M2 | `44f4421` | — |
| T20261006-03 | 2026-10-06 08:49:02 | feat(alunos): filtro para listar só os alunos da turma selecionada no formulário | `c9a1807` | — |
| T20261006-04 | 2026-10-06 08:51:46 | feat(login): botão de olho para mostrar/ocultar a senha digitada | `257e2f1` | — |
| T20261006-05 | 2026-10-06 08:55:32 | fix(indice): data da aula visível também para alunos (aula pelo número do card se a atividade não vier) | `6b7c199` | — |
| T20261006-06 | 2026-10-06 08:55:55 | fix(login): ícone do olho riscado com a senha oculta e aberto ao mostrar | `6951f47` | — |
| T20261006-07 | 2026-10-06 08:59:31 | feat(atividades): listar as questões que faltam quando a atividade não está completa | `ead5ef2` | — |
| T20261006-08 | 2026-10-06 09:21:54 | docs(regras): Reforço de Linguagens com 25 questões por atividade (20 objetivas + 5 discursivas) | `8530835` | — |
| T20261006-09 | 2026-10-06 09:30:51 | feat(reforco-linguagens): atividade da Aula 01 com 20 objetivas + 5 discursivas | `933f02f` | — |
| T20261006-10 | 2026-10-06 09:33:18 | docs(status): seeds da Aula 01 de Reforço de Linguagens aplicados no Supabase | `5fa6bea` | — |
| T20261006-11 | 2026-10-06 09:47:43 | fix(indices): Reforço de Linguagens com atividades no índice do curso Rio do Sul Mais Tech | `53b46ad` | — |
| T20261006-12 | 2026-10-06 09:49:57 | feat(pendencias): tabela pendencias, página com CRUD e filtros e menu do Professor Administrador | `108c9a4` | `docs/pendencias-aulas-professor-administrador.md` |
| T20261006-13 | 2026-10-06 10:13:37 | docs(reforco-linguagens): slides das 10 aulas convertidos em Markdown (AULAS-CHALKIE-AI/CONTEUDO) | `9e16238` | — |
| T20261006-14 | 2026-10-06 10:18:00 | docs(reforco-linguagens): plano das 10 aulas e regra da fonte das atividades (AULAS-CHALKIE-AI/CONTEUDO) | `4f6455b` | `docs/reforco-linguagens-10-aulas-e-atividades.md` |
| T20261006-15 | 2026-10-06 10:21:14 | feat(atividades): link dos slides da aula nas instruções das atividades; slides de Reforço de Linguagens publicados | `fe2c077` | — |
| T20261006-16 | 2026-10-06 10:23:01 | feat(reforco-linguagens): 10 aulas (uma por slide, 63 h) na regra, ementa e materia.json; aulas antigas em AULAS/LEGADO-16-AULAS | `b036308` | — |
| T20261006-17 | 2026-10-06 10:28:28 | feat(reforco-linguagens): aulas 01 e 02 em CONTEUDO e atividades da Aula 02 (20 objetivas + 5 discursivas) | `3a1ca9b` | — |
| T20261006-18 | 2026-10-06 10:31:06 | feat(reforco-linguagens): Aula 03 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `57e2a51` | — |
| T20261006-19 | 2026-10-06 10:33:30 | feat(reforco-linguagens): Aula 04 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `f7e5981` | — |
| T20261006-20 | 2026-10-06 10:35:37 | feat(reforco-linguagens): Aula 05 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `8c313f1` | — |
| T20261006-21 | 2026-10-06 10:37:47 | feat(reforco-linguagens): Aula 06 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `ba05464` | — |
| T20261006-22 | 2026-10-06 10:39:55 | feat(reforco-linguagens): Aula 07 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `117cef6` | — |
| T20261006-23 | 2026-10-06 10:42:01 | feat(reforco-linguagens): Aula 08 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `be318fb` | — |
| T20261006-24 | 2026-10-06 10:44:09 | feat(itic): atividade individual de 40 questões objetivas (comunicação técnica, sexta à tarde) | `38ce2ff` | — |
| T20261006-25 | 2026-10-06 10:44:13 | feat(reforco-linguagens): Aula 09 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `3c0d922` | — |
| T20261006-26 | 2026-10-06 10:46:29 | feat(reforco-linguagens): Aula 10 em CONTEUDO e atividades (20 objetivas + 5 discursivas) | `9e8d526` | — |
| T20261006-27 | 2026-10-06 10:46:44 | docs(reforco-linguagens): resultado do plano das 10 aulas e atividades; aguarda aceite | `c91d8d8` | — |
| T20261006-28 | 2026-10-06 10:47:18 | chore(itic): seed da atividade individual de sexta aplicado no Supabase (id 80) | `c80e7f5` | — |
| T20261006-29 | 2026-10-06 10:48:26 | chore(itic): atividade individual de sexta bloqueada para a turma da manhã (135080) | `c73a2a9` | — |
| T20261006-30 | 2026-10-06 10:53:26 | fix(indices): AGENDA_COLABORADOR fora do gerador de índices; pendências só pelo menu do Professor Administrador | `ab7ac90` | — |
| T20261006-31 | 2026-10-06 10:57:48 | feat(itic): card da atividade individual de sexta no índice de atividades; plano do quadro de respostas | `330c540` | `docs/quadro-respostas-atividade.md` |
| T20261006-32 | 2026-10-06 11:11:03 | feat(itic): atividade individual de sexta com 20 questões discursivas, card no índice e liberação só para a tarde | `cf6b532` | — |
| T20261006-33 | 2026-10-06 11:12:39 | fix(indice): curso de Gestão de Materiais no índice de cursos; gerador não sobrescreve mais o index.html da raiz | `ee92de1` | — |
| T20261006-34 | 2026-10-06 14:05:24 | docs(status): aceite do curso de Gestão de Materiais no índice | `be1ffa9` | — |
| T20261006-35 | 2026-10-06 14:20:52 | feat(analise-dados): Prova Prática 06-10-2026 (Aulas 01 a 05) com 10 discursivas, card no índice e padrão para correção por IA | `7355ddd` | `docs/prova-pratica-06-10-2026-analise-dados.md` |
| T20261006-36 | 2026-10-06 14:29:27 | feat(aulas): excluir aula (exclusão lógica) no modal Editar aula, só Professor Administrador | `79fd968` | `docs/excluir-aula-professor-administrador.md` |
| T20261006-37 | 2026-10-06 14:32:23 | feat(analise-dados): média final com Aulas 01-03 = 10-LIVRE para todos e Aulas 04-07 pela nota do banco | `59a10c6` | — |
| T20261006-38 | 2026-10-06 14:44:27 | feat(atividades): tabela Notas dos alunos (só professor, ordem alfabética) com exportar PDF na Avaliação Objetiva 01 de Análise de Dados | `05521e1` | — |
| T20261006-39 | 2026-10-06 14:46:17 | fix(seguranca): remove do Git a página de gabarito da prova objetiva UC1 TIC (não publicar gabarito para alunos) | `3ba2927` | — |
| T20261006-40 | 2026-10-06 14:47:00 | feat(atividades): remove os botões Exportar em Word e Exportar em Word (respostas) | `87a4ecc` | — |
| T20261006-41 | 2026-10-06 14:47:18 | chore(seguranca): mantém o gabarito da prova UC1 TIC no Git e o exclui da publicação na Vercel (.vercelignore) | `5e4894f` | — |
| T20261006-42 | 2026-10-06 14:47:30 | docs(regras): registra o .vercelignore para gabaritos versionados | `cc2a88f` | — |
| T20261006-43 | 2026-10-06 14:48:01 | feat(discursivas): tela de correção (IA só sugere, nota do professor vale) e média final do aluno pela função notas_media_final | `ed770cc` | `docs/media-final-notas-do-aluno.md` |
| T20261006-44 | 2026-10-06 14:48:03 | feat(atividades): remove o botão Exportar em Word (gabarito) | `84b3061` | — |
| T20261006-45 | 2026-10-06 14:48:49 | fix(indice): card de atividade bloqueada fica inteiro inacessível para aluno (todos os links desativados) | `1f3b819` | — |
| T20261006-46 | 2026-10-06 14:49:40 | fix(indice): links do card bloqueado desativados também para o professor | `21c36e7` | — |
| T20261006-47 | 2026-10-06 15:01:49 | feat(gabarito): professor libera o gabarito por atividade e turma só com todos entregues; aluno vê aviso e o pedido fica em tentativaacessogabarito; sem recuperação após liberar | `c3bd625` | `docs/liberacao-respostas-por-turma.md` |
| T20261006-48 | 2026-10-06 15:03:53 | docs(regras): liberação do gabarito vale para todas as atividades de todas as matérias e cursos | `957f440` | — |
| T20261006-49 | 2026-10-06 15:14:31 | feat(gabarito): regra da liberação também nas discursivas (padrão de resposta só após o professor liberar com todos entregues) | `918f42d` | — |
| T20261006-50 | 2026-10-06 15:19:01 | feat(indice): mostra o ID da atividade (somente leitura) ao editar no CADASTRAR ATIVIDADES | `6464698` | — |
| T20261006-51 | 2026-10-06 15:20:51 | feat(indice): ID da atividade no card (professor) e nome da atividade editável no CADASTRAR ATIVIDADES | `4724f55` | — |
| T20261006-52 | 2026-10-06 15:25:14 | feat(atividades): remove o botão Banco Moodle (AVA SENAI) de todas as atividades | `6f782ce` | — |
| T20261006-53 | 2026-10-06 15:26:45 | feat(atividades): remove o botão Exportar PDF com gabarito das páginas e do gerador | `8e7ee19` | — |
| T20261006-54 | 2026-10-06 15:28:03 | docs(analise-dados): análise comparativa das provas práticas id 37 e id 82 | `0bd2756` | — |
| T20261006-55 | 2026-10-06 15:47:19 | docs(analise-dados): prova prática unificada em Markdown (20 discursivas, 100% das aulas) e batimento | `4cf280f` | `docs/prova-pratica-adag-unificada-id82.md` |
| T20261006-56 | 2026-10-06 15:47:53 | feat(atividades): tabela Notas dos alunos com Exportar PDF em todas as atividades de todas as matérias | `36a4c08` | — |
| T20261006-57 | 2026-10-06 15:57:30 | feat(banco): log de todas as alternativas clicadas (log_resposta_atividade) com gatilho e carga inicial | `5725cda` | `docs/log-resposta-atividade.md` |
| T20261006-58 | 2026-10-06 15:58:12 | fix(banco): log de alternativas grava só registros novos (sem carga das respostas antigas) | `b9c2cfb` | — |
| T20261006-59 | 2026-10-06 16:25:46 | feat(analise-dados): prova prática id 82 unificada (20 discursivas, Aulas 01 a 07) no banco e na média final; prova id 37 excluída | `aabf5a7` | — |
| T20261006-60 | 2026-10-06 16:27:15 | feat(indice): link LOG nos cards das atividades com o log das alternativas por aluno (professor) | `e468031` | — |
| T20261006-61 | 2026-10-06 16:30:31 | fix(indice): link LOG bloqueado junto com a atividade bloqueada | `034f096` | — |
| T20261006-62 | 2026-10-06 16:31:41 | feat(indice): modal Editar aula também troca o nome do card (aulas.nome_card) | `5675a7a` | — |
| T20261006-63 | 2026-10-06 16:33:24 | feat(discursivas): botão Exportar PDF no padrão SENAI em todas as atividades e avaliações discursivas | `8568e5e` | — |
| T20261006-64 | 2026-10-06 16:37:41 | feat(indice): modal Editar aula também troca o rótulo do card (aulas.rotulo_card) | `336667f` | — |
| T20261006-65 | 2026-10-06 16:48:25 | fix(indice): cada card ligado a apenas 1 aula (aula 40 só com a atividade 82) e aviso de aula compartilhada no Editar aula | `ace3ba0` | — |
| T20261006-66 | 2026-10-06 17:00:26 | feat(indice): card com 100% dos dados da tabela aulas, modal CRUD da aula com atividades (editar/excluir/nova), 1 card = 1 aula (aulas separadas) e gerador agrupando páginas da mesma aula | `0bdf6c5` | `docs/card-dados-100-tabela-aulas.md` |
| T20261006-67 | 2026-10-06 17:01:35 | docs: lista dos rótulos AULA NN das aulas para o usuário ajustar | `77f7363` | `docs/rotulos-aulas-ajustar.md` |

### 2026-10-05 — 62 tarefa(s)

| ID | Concluída em | Tarefa (commit) | Commit | Plano |
|---|---|---|---|---|
| T20261005-01 | 2026-10-05 07:28:06 | feat(itic): trabalho em equipe agrupando as aulas 01 a 07 (manual de comunicação técnica) | `479b5c9` | — |
| T20261005-02 | 2026-10-05 07:29:56 | docs(itic): plano da atividade em equipe Comunicação e Produção Textual e plano de equipes por turma | `a4ea929` | `docs/equipes-sala-de-aula.md` |
| T20261005-03 | 2026-10-05 07:32:45 | feat(itic): seção Brainstorming com papéis e ficha da equipe no trabalho em equipe | `70215ae` | — |
| T20261005-04 | 2026-10-05 07:37:25 | feat(itic): card do trabalho em equipe após a Aula 07 no índice de atividades | `70f3262` | — |
| T20261005-05 | 2026-10-05 07:39:51 | feat(equipes): CRUD de equipes por turma + matéria no menu 👥 Equipes das atividades (ITIC) | `15b809f` | — |
| T20261005-06 | 2026-10-05 07:52:14 | feat(itic): página brainstorming.html (como funciona, participantes, regras e etapas) no trabalho em equipe | `6a33f23` | — |
| T20261005-07 | 2026-10-05 07:53:04 | docs(itic): conteúdo do brainstorming em Markdown | `12dbaab` | — |
| T20261005-08 | 2026-10-05 07:54:15 | docs(itic): brainstorming.md no padrão Chalkie AI (14.167 caracteres) | `c132f25` | — |
| T20261005-09 | 2026-10-05 07:59:42 | docs(itic): renomeia brainstorming.md para brainstorming-chalkie-ai.md | `c51c91e` | — |
| T20261005-10 | 2026-10-05 08:00:50 | feat(agenda): projeto de automação do WhatsApp (AGENDA_COLABORADOR/AUTOMATIZACAO-WHATSAPP) | `184a124` | — |
| T20261005-11 | 2026-10-05 08:02:31 | feat(itic): detalha a missão da equipe e o conteúdo do relatório técnico no trabalho em equipe | `d2d1ec9` | — |
| T20261005-12 | 2026-10-05 08:06:20 | feat(itic): pasta na nuvem é tarefa do líder e demais atividades decididas em equipe | `e6a6fe9` | — |
| T20261005-13 | 2026-10-05 09:00:05 | feat(itic): link Slide Brainstorming (nova aba) no trabalho em equipe | `dd445df` | — |
| T20261005-14 | 2026-10-05 09:00:17 | docs(status): SQL das equipes bloqueado sem conector do Supabase | `629f8df` | — |
| T20261005-15 | 2026-10-05 09:02:05 | fix(itic): link Slide Brainstorming movido para o card do trabalho em equipe no índice | `5ebe673` | — |
| T20261005-16 | 2026-10-05 10:04:46 | docs(status): autorização dos responsáveis para uso do celular no trabalho em equipe da ITIC | `4125852` | — |
| T20261005-17 | 2026-10-05 10:04:58 | feat(itic): versão resumida (2 páginas) do trabalho em equipe | `3ff821f` | — |
| T20261005-18 | 2026-10-05 11:09:28 | docs(status): termo do celular com seção de recolhimento e um termo por aluno | `35b3e56` | — |
| T20261005-19 | 2026-10-05 11:12:09 | docs(status): termo do celular vira pedido à instituição de acolhimento, com turma preenchida | `99e18b6` | — |
| T20261005-20 | 2026-10-05 11:13:00 | docs(status): pedido do celular com mais 3 alunos da turma da tarde | `959810e` | — |
| T20261005-21 | 2026-10-05 11:16:22 | docs(status): pedido do celular em documento único com a lista de alunos no início | `e951be3` | — |
| T20261005-22 | 2026-10-05 12:20:07 | feat: botão Exportar em Word ao lado de cada exportar PDF (regra global) | `34112c1` | — |
| T20261005-23 | 2026-10-05 13:08:49 | docs(itic): ATIVIDADE-COMUNICACAO-SIMPLES.md explica as versões completa e simples do trabalho em equipe | `5ffbcd3` | — |
| T20261005-24 | 2026-10-05 13:14:04 | docs(itic): plano da atividade em equipe sincronizado com a página do aluno | `f2fba1c` | — |
| T20261005-25 | 2026-10-05 13:17:15 | feat(itic): trabalho em equipe v2 simplificado, visível só para a turma 135081 (restrição por turma via turmaaluno) | `5ea0c5e` | — |
| T20261005-26 | 2026-10-05 13:23:04 | feat(alunos): filtro Turma OK e confirmação do vínculo dos alunos sem turma | `ac3255d` | `docs/sugestao-alunos-por-turma-confirmar.md` |
| T20261005-27 | 2026-10-05 13:27:34 | feat(itic): card do trabalho em equipe v2 no índice de atividades | `392cd6d` | — |
| T20261005-28 | 2026-10-05 13:29:52 | feat(itic): SQL cadastra os trabalhos em equipe v1 e v2 na atividade (interruptor Bloquear) | `16e8e9a` | — |
| T20261005-29 | 2026-10-05 13:36:02 | feat(atividades): bloqueio por turma pela turma favorita (atividade.bloqueio) | `dfe5219` | `docs/bloqueio-atividade-por-turma-favorita.md` |
| T20261005-30 | 2026-10-05 13:36:11 | chore(status): SQL dos trabalhos em equipe da ITIC aplicado no Supabase | `9b2c8ae` | — |
| T20261005-31 | 2026-10-05 13:36:42 | chore(status): trabalho em equipe v1 bloqueado, só a v2 liberada | `9932218` | — |
| T20261005-32 | 2026-10-05 13:37:28 | fix(itic): card do trabalho em equipe v1 volta a ter o interruptor Bloquear | `91430f7` | — |
| T20261005-33 | 2026-10-05 13:37:30 | feat(relatorio): média e totais por turma consideram o bloqueio por turma | `4fad94d` | — |
| T20261005-34 | 2026-10-05 13:37:36 | feat(itic): título do card do trabalho em equipe com v1 | `6872f44` | — |
| T20261005-35 | 2026-10-05 13:38:05 | docs(claude): regra do bloqueio de atividade por turma (turma favorita) | `cbce92d` | — |
| T20261005-36 | 2026-10-05 13:44:11 | feat(itic): v2 do trabalho em equipe com história de estoque e separação e missão em passos | `f845719` | — |
| T20261005-37 | 2026-10-05 13:51:39 | feat(itic): v2 — descrição da empresa em itens | `2d82477` | — |
| T20261005-38 | 2026-10-05 13:52:48 | feat(itic): v2 — problema e prejuízo do dia em itens | `450e74f` | — |
| T20261005-39 | 2026-10-05 13:53:33 | feat(itic): v2 — remove o bloco da Ficha da equipe | `61815bf` | — |
| T20261005-40 | 2026-10-05 13:54:05 | feat(itic): v2 — remove a seção 6 (Entrega e nota) | `91419f2` | — |
| T20261005-41 | 2026-10-05 13:57:06 | feat(itic): v2 — remove a linha da nota do resumo | `0e08f3d` | — |
| T20261005-42 | 2026-10-05 13:59:31 | feat(itic): v2 — cada um dos 5 textos detalhado em tópicos (para que serve, o que escrever, como escrever) | `f5373d9` | — |
| T20261005-43 | 2026-10-05 14:00:41 | feat(itic): v2 — remove as menções à ficha da equipe (papéis ficam na ata) | `10ba813` | — |
| T20261005-44 | 2026-10-05 14:02:33 | feat(equipes): SQL das equipes aplicado no Supabase (equipe, equipe_membro, RLS, minhas_equipes) | `11b9495` | — |
| T20261005-45 | 2026-10-05 14:04:28 | feat(css): layout de celular das atividades (margens, fonte 16px, toque de 44px, tabelas roláveis, sem zoom nos campos) | `8241e93` | — |
| T20261005-46 | 2026-10-05 14:05:37 | feat(css): layout de celular do índice de atividades | `fb6fafa` | — |
| T20261005-47 | 2026-10-05 14:07:09 | feat(apostila): modo leitura no celular depois da paginação A4 (impressão inalterada) | `4cb0821` | — |
| T20261005-48 | 2026-10-05 14:07:52 | feat(itic): v2 — papel responsável ao lado do título de cada texto | `65d68c7` | — |
| T20261005-49 | 2026-10-05 14:09:47 | feat(itic): v2 — papel de Analista para equipe de 6 e texto da Introdução do manual | `f07787b` | — |
| T20261005-50 | 2026-10-05 14:10:49 | feat(itic): papel de Analista (equipe de 6) na versão original do trabalho em equipe | `037b4ae` | — |
| T20261005-51 | 2026-10-05 15:56:50 | feat(itic): seção Integrantes da equipe (nome e papel de cada aluno) na introdução do manual — v1 e v2 | `b29b214` | — |
| T20261005-52 | 2026-10-05 15:59:03 | feat(itic): botão Exportar Para PDF (igual à tela) + Exportar em Word no trabalho em equipe v1 e v2 | `8178640` | — |
| T20261005-53 | 2026-10-05 16:01:26 | feat(itic): remove o botão de Word do trabalho em equipe v1 e v2 (data-word=nao) | `f2bd955` | — |
| T20261005-54 | 2026-10-05 16:09:42 | feat(itic): v2 — entrega no AVA (Atividade-Comunicação-Equipes-05-10-2026) e valor de Prova Prática (30 de 100) | `10aa0f5` | — |
| T20261005-55 | 2026-10-05 16:10:11 | feat(itic): v2 — cada aluno entrega no AVA e é avaliado pela sua entrega | `464b3ec` | — |
| T20261005-56 | 2026-10-05 16:19:27 | feat(itic): cabeçalho do PDF com matéria, curso, professor, turma e data no trabalho em equipe v1 e v2 | `1a09e34` | — |
| T20261005-57 | 2026-10-05 16:20:20 | feat(itic): turma do cabeçalho do PDF vem da turma favorita do banco | `874a8e1` | — |
| T20261005-58 | 2026-10-05 16:32:07 | fix(css): PDF da página sem página em branco (cartões grandes podem quebrar entre páginas) | `3d53836` | — |
| T20261005-59 | 2026-10-05 16:40:30 | fix(css): PDF da página sem o endereço, a data e a paginação do navegador (margem 0 em cima e embaixo) | `2b8b43c` | — |
| T20261005-60 | 2026-10-05 16:41:02 | feat(itic): capacidades no início do trabalho em equipe (logo após o cabeçalho) — v1 e v2 | `7346875` | — |
| T20261005-61 | 2026-10-05 16:41:12 | feat(itic): capacidades logo após o cabeçalho, antes da barra de exportação — v1 e v2 | `c837f66` | — |
| T20261005-62 | 2026-10-05 16:42:43 | feat(css): PDF da página sem a faixa do título (cabeçalho SENAI seguido das capacidades) | `ffdb32b` | — |

### 2026-10-03 — 70 tarefa(s)

| ID | Concluída em | Tarefa (commit) | Commit | Plano |
|---|---|---|---|---|
| T20261003-01 | 2026-10-03 12:18:14 | docs: registra estado dos vinculos de cursos | `1d4c130` | `docs/registro-vinculos-cursos-professor-2026-10-03.md` |
| T20261003-02 | 2026-10-03 12:19:48 | feat: reduz PROVA-OBJETIVA-PROF-RAFAEL para 20 questões | `316878e` | — |
| T20261003-03 | 2026-10-03 12:23:31 | feat: botão Gabarito na prova do Prof. Rafael exporta só o gabarito | `3663f84` | — |
| T20261003-04 | 2026-10-03 12:28:48 | feat: cada professor só vê e altera alunos, respostas, entregas, liberações e vínculos das turmas dele (professor_pode_ver_aluno + professor_tem_turma no RLS e nas funções); gelvazio vinculado às 3 turmas sem professor | `5763a95` | `docs/restringir-professor-as-turmas-vinculadas.md` |
| T20261003-05 | 2026-10-03 12:29:33 | feat: lista de turma antes dos botões de exportar em todas as atividades e avaliações | `250272b` | — |
| T20261003-06 | 2026-10-03 12:29:50 | docs: regra global da turma na exportação de atividades e avaliações | `8c90693` | — |
| T20261003-07 | 2026-10-03 12:32:00 | docs: registra admin@email.com como PROFESSOR e remoção de 12 contas antigas de teste (backup em contas_teste_legado_20261003) | `e1c6b4f` | — |
| T20261003-08 | 2026-10-03 12:32:24 | feat: ATIVIDADES-INFORMATICA-BASICA usa a regra global de turma na exportação | `eb1b2bc` | — |
| T20261003-09 | 2026-10-03 12:33:29 | refactor: ATIVIDADES-INFORMATICA-BASICA usa o atividade.css padrão | `1e341bc` | — |
| T20261003-10 | 2026-10-03 12:34:53 | feat: card da atividade Informática Básica (23/09) no índice de Introdução à TIC | `7c1ca32` | — |
| T20261003-11 | 2026-10-03 12:35:00 | feat: botão Atividade Prática no card de Informática Básica | `95993d4` | — |
| T20261003-12 | 2026-10-03 12:41:18 | fix: constante PERFIL_PROFESSOR_PDF duplicada entre atividade.js e avaliacao-pdf-professor.js (SyntaxError ao exportar gabarito); renomeada para PERFIL_DOCENTE_LOGADO_PDF no atividade.js | `2a293b2` | — |
| T20261003-13 | 2026-10-03 12:42:24 | chore: remove a pasta ATIVIDADES-AULA-23-09-2026 de Introdução à TIC | `aaab866` | — |
| T20261003-14 | 2026-10-03 12:46:40 | feat: atividade do ciclo do feedback (28/09) vai para ATIVIDADES/ como 25-QUESTOES | `bfc9eb2` | — |
| T20261003-15 | 2026-10-03 12:54:25 | chore: remove a pasta ATIVIDADES-AULA-28-09-2026 de Introdução à TIC | `4c2023a` | — |
| T20261003-16 | 2026-10-03 13:01:42 | feat: índice de cursos mostra só os cursos do usuário logado (turma.curso_id + cursos_do_usuario); sem login, só a mensagem para entrar | `7717ea0` | `docs/indice-cursos-do-usuario-logado.md` |
| T20261003-17 | 2026-10-03 13:03:58 | feat: login em base local já vem com gelvazio.camargo@senai.local e foco no campo senha | `2cc37b3` | — |
| T20261003-18 | 2026-10-03 13:07:20 | chore: descrição dos cursos 5, 6 e 7 (a partir das ementas dos cursos), aplicada no banco | `9ea71db` | — |
| T20261003-19 | 2026-10-03 13:15:50 | feat: dashboard do que comprar no Paraguai conforme o dinheiro guardado, com cards de faixa de gasto (4-5, 5-7, 7-10 e 10 mil) | `c8d672a` | — |
| T20261003-20 | 2026-10-03 13:16:14 | feat: página comparativa para escolha de celular Android (R$ 1.500 a 3.000) | `9f1a9b2` | — |
| T20261003-21 | 2026-10-03 13:17:22 | feat: atividades de 50 questões das aulas 07 a 14 de Fundamentos de Automação/Instrumentação (C2–C4, folha de respostas no banco, atividades 50–57 aplicadas no Supabase), STATUS-AULAS.md da matéria e regra de gerar uma aula por vez no CLAUDE.md | `375c88a` | `docs/atividades-aulas-07-14-automacao-instrumentacao.md` |
| T20261003-22 | 2026-10-03 13:22:11 | feat: menu Regras no header (só Professor Administrador) abre modal com o CLAUDE.md renderizado, índice e filtro | `049b7de` | — |
| T20261003-23 | 2026-10-03 13:22:38 | docs: conferência das aulas de todas as matérias — STATUS-AULAS.md (arquivos + banco) em 10 matérias e relatório consolidado | `0867d0a` | `docs/conferencia-status-aulas-materias-2026-10-03.md` |
| T20261003-24 | 2026-10-03 13:26:30 | fix: dashboard de compras no Paraguai volta como compras-paraguai.html (o index.html passou a ser a escolha de celular) | `8a59934` | — |
| T20261003-25 | 2026-10-03 13:27:45 | style: bordas mais nítidas e foco destacado nos campos de "Seu dinheiro" | `05db95d` | — |
| T20261003-26 | 2026-10-03 13:27:54 | fix: campos de "Seu dinheiro" não são mais cortados (min-width 0 e colunas responsivas) | `423ee05` | — |
| T20261003-27 | 2026-10-03 13:29:18 | feat: catálogo de compras no Paraguai ordena por qualquer coluna (clique no cabeçalho alterna ▲/▼) | `e671ef7` | — |
| T20261003-28 | 2026-10-03 13:32:19 | feat: seção 7 e-DBV no dashboard do Paraguai (cota, limites, passo a passo, aduana/multas e simulador do DARF com a lista) | `5517460` | — |
| T20261003-29 | 2026-10-03 13:42:51 | docs: regra de 1 atividade objetiva de 50 questões por aula no CLAUDE.md, STATUS-ATIVIDADES.md em todas as pastas de atividades e plano da geração das 89 pendentes | `860aeb5` | `docs/gerar-atividades-50-questoes-todas-materias.md` |
| T20261003-30 | 2026-10-03 13:45:39 | docs: decisões do usuário na regra das atividades por aula (Automação aula 15 com 20 questões, seed ao finalizar cada matéria, fila liberada só para Testes de Frontend) | `c1f543c` | — |
| T20261003-31 | 2026-10-03 14:22:43 | fix: modal de Regras centralizado na tela (posição fixa e margin auto, imune ao reset de margens) | `588ce48` | — |
| T20261003-32 | 2026-10-03 15:37:48 | feat: gerador de apostilas (piloto ITIC, capítulo 01) e materia.json como arquivo único de dados da matéria | `9608117` | `docs/arquivo-unico-materia-json.md`, `docs/gerador-apostilas.md` |
| T20261003-33 | 2026-10-03 15:39:28 | feat: gerador do banco de questões do AVA SENAI em Moodle XML (piloto Introdução à TIC: 13 atividades, 600 questões, arquivos fora do Git) | `1519ddf` | `docs/banco-questoes-ava-senai-moodle-xml.md` |
| T20261003-34 | 2026-10-03 15:47:05 | docs: REGRAS APOSTILAS completas (formato das fontes, conteúdo detalhado do Markdown completo, introdução e busca dos vídeos) | `a2380f6` | — |
| T20261003-35 | 2026-10-03 15:48:12 | docs: pré-requisito das apostilas — Markdown completo deve bater 100% com a ementa da matéria antes de gerar o restante | `36eb0a6` | — |
| T20261003-36 | 2026-10-03 16:01:29 | feat: conferência obrigatória Markdown × ementa da matéria (100% para gerar a apostila) | `25c8c48` | — |
| T20261003-37 | 2026-10-03 16:02:28 | feat: botão "Banco Moodle (AVA SENAI)" nas atividades objetivas (só professor; gabarito lido do banco; XML idêntico ao gerador local) | `f83af07` | `docs/botao-exportar-banco-moodle-atividade.md` |
| T20261003-38 | 2026-10-03 16:20:21 | feat(apostila ITIC): capítulo 02 — Hardware, Periféricos e Sistemas Operacionais | `6919907` | — |
| T20261003-39 | 2026-10-03 16:20:59 | feat(apostila ITIC): capítulo 03 — Navegação na Web e Pesquisa Acadêmica | `c5abef5` | — |
| T20261003-40 | 2026-10-03 16:22:58 | feat(apostila ITIC): capítulo 04 — Comunicação Digital e Colaboração em Nuvem | `31572b0` | — |
| T20261003-41 | 2026-10-03 16:24:47 | feat(apostila ITIC): capítulo 05 — Segurança da Informação e Proteção de Dados | `8845c55` | — |
| T20261003-42 | 2026-10-03 16:26:28 | feat(apostila ITIC): capítulo 06 — Editor de Textos: Formatação e Estruturação | `6ed60df` | — |
| T20261003-43 | 2026-10-03 16:28:21 | feat(apostila ITIC): capítulo 07 — Textos Técnicos e Redação Empresarial | `ffcd0f7` | — |
| T20261003-44 | 2026-10-03 16:30:06 | feat(apostila ITIC): capítulo 08 — Editor de Planilhas: Organização e Fórmulas | `0b55ea4` | — |
| T20261003-45 | 2026-10-03 17:23:30 | feat: versão com data e hora no CLAUDE.md (linha + histórico), regra de atualizar o visualizador de regras junto e modal Regras mostrando a versão e recarregando a cada abertura | `824f2b5` | — |
| T20261003-46 | 2026-10-03 18:14:37 | refactor(testes-de-frontend): padroniza a pasta da matéria (TESTES-DE-FRONTEND) | `d75c993` | `docs/padronizar-pasta-testes-de-front-end.md` |
| T20261003-47 | 2026-10-03 18:14:41 | feat: permissão por matéria (STATUS-PERMISSAO-MATERIA) no STATUS-EMENTAS-CURSOS.md; no Técnico em Informática para Internet só TESTES-DE-FRONTEND fica em VERIFICAR; regra no CLAUDE.md (versão 2026-10-03 18:14) | `086d11b` | — |
| T20261003-48 | 2026-10-03 18:22:21 | docs(testes-de-frontend): JEV-AI/CLAUDE.md — como funciona o Jev (TypeSafe System One) e como implementá-lo no projeto | `a0da2e7` | — |
| T20261003-49 | 2026-10-03 18:22:44 | docs(testes-de-frontend): JEV-AI/documentacao.md — resumo da introdução da documentação TypeSafe | `cb7c641` | — |
| T20261003-50 | 2026-10-03 18:31:14 | docs(TII): atualiza ANALISE-GERACAO-AULAS.md com a situação real das 19 UCs e cria STATUS.md | `255bb50` | — |
| T20261003-51 | 2026-10-03 18:54:53 | feat(apostila ITIC): capítulo 09 — Planilhas: Análise Visual e Gráficos | `397e037` | — |
| T20261003-52 | 2026-10-03 18:56:57 | feat(apostila ITIC): capítulo 10 — Editor de Apresentações e TIC + Avaliação (apostila completa, 10 capítulos) | `cd26402` | — |
| T20261003-53 | 2026-10-03 19:05:28 | feat(apostilas): conferidor aceita os formatos de ementa das matérias e reprova seção não reconhecida; base da apostila de Testes de Frontend (materia.json, introdução, Markdown completo, conferência 185/185) | `a857c18` | — |
| T20261003-54 | 2026-10-03 19:08:24 | feat(apostila Testes de Frontend): capítulo 01 — Fundamentos de Testes de Software; blocos de código na apostila | `0365620` | — |
| T20261003-55 | 2026-10-03 19:10:38 | feat(apostila Testes de Frontend): capítulo 02 — Planejamento, Verificação, Validação e Casos de Teste | `e416ae0` | — |
| T20261003-56 | 2026-10-03 19:12:31 | feat(apostila Testes de Frontend): capítulo 03 — Testes Unitários no Front-End com Vitest | `ffee705` | — |
| T20261003-57 | 2026-10-03 19:14:44 | feat(apostila Testes de Frontend): capítulo 04 — Testes de Integração com DOM (Testing Library) | `5d6da80` | — |
| T20261003-58 | 2026-10-03 19:19:09 | feat(apostila Testes de Frontend): capítulo 05 — Integração Avançada e Mock de APIs | `0a289ab` | — |
| T20261003-59 | 2026-10-03 19:21:06 | feat(apostila Testes de Frontend): capítulo 06 — Testes End-to-End com Cypress e Playwright | `8b014d3` | — |
| T20261003-60 | 2026-10-03 19:23:15 | feat(apostila Testes de Frontend): capítulo 07 — Métricas e Cobertura de Testes | `ce467a5` | — |
| T20261003-61 | 2026-10-03 19:25:36 | feat(apostila Testes de Frontend): capítulo 08 — TDD e Debugging Moderno no Front-End | `018d31a` | — |
| T20261003-62 | 2026-10-03 19:28:14 | feat(apostila Testes de Frontend): capítulo 09 — Qualidade, Performance, Acessibilidade e CI/CD | `5813f7d` | — |
| T20261003-63 | 2026-10-03 19:30:34 | feat(apostila Testes de Frontend): capítulo 10 — Projeto Integrador: Suíte de Testes + avaliação | `080c60b` | — |
| T20261003-64 | 2026-10-03 19:31:23 | feat(Testes de Frontend): link da apostila na página da matéria; status final da etapa 2 | `918f348` | — |
| T20261003-65 | 2026-10-03 20:48:34 | docs(regras): conteúdo só pelos Markdowns (EMENTA-CHALKIE-AI.md primeiro), nunca extrair dados de PDF | `c2fdfe4` | — |
| T20261003-66 | 2026-10-03 20:56:06 | docs(regras): matéria modelo Introdução à TIC e aulas extraídas da ementa em CONTEUDO/ | `f9c876c` | — |
| T20261003-67 | 2026-10-03 21:04:11 | ok | `fefde8f` | `docs/botao-banco-moodle-completo-indice.md` |
| T20261003-68 | 2026-10-03 22:33:32 | docs: add project instructions for agents | `87a3ba1` | — |
| T20261003-69 | 2026-10-03 22:36:23 | docs: reference WhatsApp project instructions | `c1b8699` | — |
| T20261003-70 | 2026-10-03 22:39:39 | docs: clarify agenda project instructions | `c85ee14` | — |

### 2026-10-02 — 37 tarefa(s)

| ID | Concluída em | Tarefa (commit) | Commit | Plano |
|---|---|---|---|---|
| T20261002-01 | 2026-10-02 07:38:14 | feat: capacidades da ementa nas avaliações — quadro CAPACIDADES no início e CAPACIDADE em cada questão (gerador de avaliações objetivas e de provas discursivas), 6 avaliações de Introdução à TIC e Análise de Dados regeneradas | `c0d5158` | `docs/capacidade-por-questao-avaliacoes.md` |
| T20261002-02 | 2026-10-02 07:57:21 | feat: PDF das avaliações com o quadro CAPACIDADES no início e a CAPACIDADE em cada questão | `7739327` | — |
| T20261002-03 | 2026-10-02 08:19:06 | feat: capacidade de cada questão como caixa CAPACIDADE (igual ao CONTEXTO) nas atividades e avaliações de Introdução à TIC e Análise de Dados, classificada questão a questão pela ementa | `183d499` | — |
| T20261002-04 | 2026-10-02 08:21:44 | fix: PDF das atividades e avaliações com os subtítulos CAPACIDADE, CONTEXTO e COMANDO em negrito | `17cb39c` | — |
| T20261002-05 | 2026-10-02 08:24:36 | fix: PDF com CAPACIDADE, CONTEXTO e COMANDO em negrito na mesma linha do texto | `031f778` | — |
| T20261002-06 | 2026-10-02 08:28:05 | feat: capacidades da ementa do curso (C1 a C7) nas 5 atividades de Fundamentos da Tecnologia e Programação, classificadas questão a questão | `de4b18b` | — |
| T20261002-07 | 2026-10-02 08:35:47 | docs: EMENTA-CHALKIE-AI de Fundamentos da Tecnologia e Programação com as capacidades C1–C7 da ementa do curso (14.928 caracteres); STATUS-EMENTAS atualizados | `fc53ff3` | — |
| T20261002-08 | 2026-10-02 10:49:58 | docs: EMENTA-PRINCIPAL de Operador de Produção Industrial (860h) estruturada para IA, com 18 UCs, códigos de capacidades, divergências e orientações detalhadas de uso | `6849ce4` | — |
| T20261002-09 | 2026-10-02 10:57:43 | docs: Operador de Produção Industrial em VERIFICAR, carga horária oficial = soma das UCs (860h) e pasta FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO | `586e211` | — |
| T20261002-10 | 2026-10-02 11:06:31 | feat: estrutura da matéria Fundamentos de Automação/Instrumentação (Operador de Produção Industrial): EMENTA-CHALKIE-AI 60h C1–C4 (14.834 caracteres), plano de 15 aulas, cobertura da ementa, atividades.json, índices e status | `74359e6` | `docs/materia-fundamentos-automacao-instrumentacao.md` |
| T20261002-11 | 2026-10-02 12:49:30 | docs: regra da pasta AULAS gerada conforme o PLANO-AULAS da matéria sempre que gerar dados | `05a64cc` | — |
| T20261002-12 | 2026-10-02 13:07:36 | feat: dashboard Faculdade Nômade mostra os cursos de cada área (799, extraídos do PDF), com Tecnologia selecionada por padrão; corrige contagens das categorias | `dbb4644` | — |
| T20261002-13 | 2026-10-02 13:53:11 | feat: atividade prática discursiva da Aula 04 de Introdução à TIC (e-mail à transportadora e pasta compartilhada em nuvem, 10 questões, 10 pontos), com link no card da Aula 04 e no menu | `81db0aa` | — |
| T20261002-14 | 2026-10-02 14:25:32 | fix: card informativo da composição da nota (data-sem-bloqueio) sem a marca "Fez Atividade?" e fora do filtro no índice de atividades | `a173f49` | — |
| T20261002-15 | 2026-10-02 16:01:07 | feat: atividades práticas discursivas das Aulas 01, 02 e 03 de Introdução à TIC (10 questões e 10 pontos cada), com links nos cards das aulas e no menu | `8c46202` | — |
| T20261002-16 | 2026-10-02 16:02:26 | feat: atividade prática discursiva da Aula 05 de Introdução à TIC (segurança da informação, 10 questões, 10 pontos), com link no card da Aula 05 e no menu | `4511b89` | — |
| T20261002-17 | 2026-10-02 19:29:54 | feat: 15 aulas de Fundamentos de Automação/Instrumentação conforme o PLANO-AULAS (60h, C1–C4) | `80e1320` | `docs/aulas-fundamentos-automacao-instrumentacao.md` |
| T20261002-18 | 2026-10-02 19:33:10 | feat: card da turma AI OPIR 2026/1 V1 (AI TAIO, Tarde) com os professores rafael.silva e joao.freitas na página de criação de usuários | `a098adb` | — |
| T20261002-19 | 2026-10-02 19:39:07 | feat: tabela turmaprofessor (vínculo professor × turma) e Professor Administrador exclusivo de gelvazio.camargo@senai.local (RLS, trigger e funções aplicados no Supabase); regra no CLAUDE.md e docs do banco atualizadas | `c4e4150` | `docs/tabela-turmaprofessor-professor-administrador.md` |
| T20261002-20 | 2026-10-02 19:39:47 | feat: menu do professor (USUARIOS, RELATORIOS) dentro da barra header-usuario, em todas as páginas | `0454c24` | — |
| T20261002-21 | 2026-10-02 19:42:06 | fix: índice de atividades sem barra de rolagem desnecessária (altura mínima no html, pois o header-usuario fica fora do body) | `e6834f4` | — |
| T20261002-22 | 2026-10-02 19:44:49 | feat: atividades de 50 questões das aulas 01 a 06 de Fundamentos de Automação/Instrumentação (C1, folha de respostas no banco) e link 📚 Atividades no card da matéria | `744eb8a` | `docs/atividades-aulas-01-06-automacao-instrumentacao.md` |
| T20261002-23 | 2026-10-02 19:47:16 | feat: cadastro no Supabase das atividades 01 a 06 de Fundamentos de Automação/Instrumentação (grupo no gerar-seed-atividades.py) | `a9ad67d` | — |
| T20261002-24 | 2026-10-02 19:49:54 | chore: pastas CONTEUDO-PROF-* (material de outros professores) fora do Git | `939437d` | — |
| T20261002-25 | 2026-10-02 19:54:41 | feat: PROVA-OBJETIVA-PROF-RAFAEL.html (30 questões C1–C4 com contexto, comando e capacidade, exportável em PDF) e fontes PROVA-OBJETIVA-*.md fora do Git | `a3a7b68` | — |
| T20261002-26 | 2026-10-02 19:58:07 | chore: pastas LISTA-ALUNOS/ (nomes e CPF de alunos) fora do Git | `72d3218` | — |
| T20261002-27 | 2026-10-02 20:02:37 | feat: criarUsuariosBancoDados.html lê a lista da turma 122552 (Automação/Instrumentação, Taió tarde) | `9af2c0d` | — |
| T20261002-28 | 2026-10-02 20:05:55 | fix: PDF das atividades e avaliações usa o docente logado (perfil PROFESSOR) no cabeçalho, com o data-docente da página só como reserva | `566a27c` | — |
| T20261002-29 | 2026-10-02 20:11:11 | feat: menu TURMAS (só Professor Administrador) e turmas.html com CRUD da turmaprofessor (vincular, editar e excluir professor × turma) | `17701df` | `docs/menu-turmas-crud-turmaprofessor.md` |
| T20261002-30 | 2026-10-02 20:17:14 | feat: tabela turmaaluno (RLS: professor grava, aluno lê os próprios; 106 vínculos copiados) e menu ALUNOS com alunos.html (CRUD aluno × turma) | `5d7fd59` | `docs/tabela-turmaaluno-menu-alunos.md` |
| T20261002-31 | 2026-10-02 20:24:04 | feat: turma do aluno unificada na turmaaluno (horário e líder leem a turmaaluno; aluno.turma_codigo e app_metadata viram cópias automáticas; criação de contas grava o vínculo) | `a09eea4` | `docs/unificar-turma-do-aluno-turmaaluno.md` |
| T20261002-32 | 2026-10-02 20:26:25 | feat: criarUsuariosBancoDados.html mostra a senha das contas de perfil PROFESSOR só ao Professor Administrador (RPC eh_professor_administrador); demais professores seguem sem ver | `b67e28f` | — |
| T20261002-33 | 2026-10-02 20:27:34 | fix: exclui a turma duplicada 'AI OPIR 2026/1 V1' (backup em turma_legado_20261002); a turma real é 122552 | `61e57ab` | — |
| T20261002-34 | 2026-10-02 20:39:11 | fix: restringe turmas ao professor vinculado | `21ddadf` | — |
| T20261002-35 | 2026-10-02 20:49:31 | feat: carrega cursos do banco no índice | `33a3ca9` | — |
| T20261002-36 | 2026-10-02 21:01:41 | docs: especifica vinculos entre cursos e professores | `abcee07` | `docs/cursoprofessor-design.md` |
| T20261002-37 | 2026-10-02 21:08:52 | docs: planeja vinculos de cursos por professor | `ccb9d3b` | `docs/superpowers/plans/2026-10-02-cursoprofessor.md` |

### 2026-10-01 — 56 tarefa(s)

| ID | Concluída em | Tarefa (commit) | Commit | Plano |
|---|---|---|---|---|
| T20261001-01 | 2026-10-01 07:09:18 | fix: seed de atividades acha as fontes .md em ATIVIDADES/CONTEUDO/ (o endereço da página no banco continua o mesmo) | `96d1a34` | — |
| T20261001-02 | 2026-10-01 09:22:58 | feat: relatório de atividades ganha quadro de filtros ON/OFF por atividade da matéria (nenhuma ligada = todas) | `5948857` | — |
| T20261001-03 | 2026-10-01 09:50:07 | feat: Introdução à TIC ganha AVALIACAO-MEDIA-FINAL.html (100 pontos: 10 atividades x3, 2 objetivas x20, prova prática 30) | `de3d392` | — |
| T20261001-04 | 2026-10-01 09:54:23 | feat: índice de Introdução à TIC ganha card com link para AVALIACAO-MEDIA-FINAL.html (card informativo isento do bloqueio via data-sem-bloqueio) | `c8876a6` | — |
| T20261001-05 | 2026-10-01 09:57:19 | feat: card Avaliação — Média Final no início do índice de atividades de Introdução à TIC | `2941d1e` | — |
| T20261001-06 | 2026-10-01 10:06:02 | feat(banco): atividade.atividade_liberada_fora_horario (lista de alunos liberados fora do horário da turma; avaliações AVALIACAO-* nunca liberadas) + RLS e documentação | `84677b1` | `docs/atividade-liberada-fora-horario.md` |
| T20261001-07 | 2026-10-01 10:07:59 | feat: botão Ligar todas no quadro Atividades da matéria do relatório de atividades | `532462d` | — |
| T20261001-08 | 2026-10-01 10:09:03 | feat: botão Desligar todas no quadro Atividades da matéria do relatório de atividades | `1103aab` | — |
| T20261001-09 | 2026-10-01 10:10:04 | feat: Ligar/Desligar todas vira um interruptor ON/OFF no quadro Atividades da matéria (nome muda conforme o estado) | `3e19484` | — |
| T20261001-10 | 2026-10-01 10:10:23 | fix: interruptor ON/OFF não encolhe quando o texto quebra linha (bolinha ficava fora) | `fca9880` | — |
| T20261001-11 | 2026-10-01 10:11:58 | fix: quadro Atividades da matéria filtra de fato ao ligar/desligar todas (começa tudo ligado; desligada = fora do relatório) | `2b92756` | — |
| T20261001-12 | 2026-10-01 10:16:18 | feat: AVALIACAO-MEDIA-FINAL.html mostra a nota e os pontos do aluno logado em cada atividade (melhor tentativa entregue, via nota_da_tentativa), subtotais, total e situação | `5f67417` | — |
| T20261001-13 | 2026-10-01 10:27:20 | chore: plano e SQL (ainda não aplicado) do líder da turma na média final + fonte da Avaliação Prática de Introdução à TIC | `49717ac` | `docs/media-final-professor-seleciona-aluno.md` |
| T20261001-14 | 2026-10-01 10:44:10 | feat: média final com combos Turma/Aluno para o professor (padrão: turma favorita e líder da sala, senão 1º da chamada) + coluna turma.lider_aluno_id aplicada | `fcdcb35` | — |
| T20261001-15 | 2026-10-01 10:44:21 | docs: remove nomes de alunos do plano da média final (LGPD) | `2d28a9a` | — |
| T20261001-16 | 2026-10-01 10:48:43 | fix: atividades voltam a carregar para o aluno (embed turma ambíguo após turma.lider_aluno_id; usa turma!aluno_turma_codigo_fkey) | `a0763dc` | — |
| T20261001-17 | 2026-10-01 10:50:14 | feat: Avaliação Prática discursiva de Introdução à TIC (30 questões, 61 tópicos, 30 pontos) com respostas escritas gravadas no banco para correção com IA | `db8a2ae` | `docs/avaliacao-pratica-discursiva-itic.md` |
| T20261001-18 | 2026-10-01 10:52:05 | fix: avaliação discursiva usa o embed turma!aluno_turma_codigo_fkey; média final mostra a nota (0 a 10) dos subtotais que têm campo de nota | `cc64e6c` | — |
| T20261001-19 | 2026-10-01 10:59:45 | docs: SQL das respostas discursivas e seed da Avaliação Prática de Introdução à TIC aplicados no Supabase e conferidos | `4c8e950` | — |
| T20261001-20 | 2026-10-01 13:44:33 | feat: Avaliação Objetiva 01 de Análise de Dados passa de 32 para 60 questões (28 novas das aulas 01 a 04, 150 minutos) com gabarito atualizado no banco | `a92ef16` | — |
| T20261001-21 | 2026-10-01 14:31:24 | fix: índice de atividades de Fundamentos da Tecnologia em ordem de data, sem link para o .md com gabarito e com rótulo Slides (PowerPoint); gerador ordena pela data do nome | `4558da1` | — |
| T20261001-22 | 2026-10-01 14:31:55 | feat: Avaliação Objetiva 02 de Análise de Dados passa de 24 para 60 questões (36 novas das aulas 05 a 07, 150 minutos) com gabarito atualizado no banco; regra NUNCA FAZER PUSH no CLAUDE.md | `cab5d2e` | `docs/expandir-avaliacao-objetiva-02-analise-dados-60-itens.md` |
| T20261001-23 | 2026-10-01 14:38:52 | fix: gerador de atividades lê as fontes .md de ATIVIDADES/CONTEUDO/, grava as páginas na pasta ATIVIDADES, não apaga o índice quando não acha fontes e mantém as tags do CRUD do professor no index.html | `a30007a` | — |
| T20261001-24 | 2026-10-01 14:53:37 | chore: remove a versão simplificada EMENTA.md: STATUS-EMENTAS deixa de verificá-la, CLAUDE.md e TASKS.md atualizados (tarefa #3 cancelada), referências nas aulas, ementas e scripts corrigidas e script especializar-ementas-chalkie.py (dependia do EMENTA.md) removido | `48f753d` | — |
| T20261001-25 | 2026-10-01 14:56:59 | feat: STATUS-EMENTAS.md mostra a carga horária da ementa da matéria e confere com a ementa do curso | `7a7d72c` | — |
| T20261001-26 | 2026-10-01 15:00:50 | fix: sequência de aulas específica em 5 ementas do Rio do Sul Mais Tech (1 aula de 4h por aula: 9 aulas = 36h; Linguagens 16 aulas = 64h), no lugar do modelo genérico de 10h; status regenerados | `9c24c3e` | `docs/corrigir-sequencia-aulas-ementas-rio-do-sul.md` |
| T20261001-27 | 2026-10-01 15:09:17 | fix: seção III (Conteúdos Programáticos) preenchida nas ementas de Competências Socioemocionais e de Impressão 3D e Robótica a partir da ementa do curso; seção VII resumida e FAQ corrigido (presencial, nota 7,0 e 75% de frequência) | `bd6d976` | `docs/preencher-secao-iii-ementas-rio-do-sul.md` |
| T20261001-28 | 2026-10-01 15:14:12 | fix: nota mínima 7,0 (aprovação, recuperação e metas) nas ementas do Rio do Sul Mais Tech, de Introdução à TIC e de Testes de Front-end; QUALIFICACAO-PROFISSIONAL não alterada (só o professor) | `75e09f2` | — |
| T20261001-29 | 2026-10-01 15:23:44 | fix: nota mínima 7 nas ementas de Qualificação Profissional (Digital Skills e Lean Manufacturing), a pedido do professor | `1715bd8` | — |
| T20261001-30 | 2026-10-01 15:31:17 | feat: gerador da AVALIACAO-MEDIA-FINAL.html por matéria (assets/gerador-avaliacao-media-final) | `fe43598` | `docs/gerador-avaliacao-media-final.md` |
| T20261001-31 | 2026-10-01 15:34:56 | feat: média final do professor abre o combo Aluno em "Selecione o Aluno" com a tabela vazia; aluno continua vendo as próprias notas | `2078ecd` | — |
| T20261001-32 | 2026-10-01 15:48:19 | fix: média final de Análise de Dados Aplicada à Gestão com atividades em sala 40%, objetivas 30% (15 cada) e prova prática = 2 atividades de Excel 30% (15 cada) | `47b8da0` | — |
| T20261001-33 | 2026-10-01 15:49:05 | fix: média final de Análise de Dados: prova prática (2 atividades de Excel) 20% (10 cada) e objetivas 40% (20 cada); atividades em sala seguem 40% | `0dd7acd` | — |
| T20261001-34 | 2026-10-01 15:50:42 | fix: média final de Análise de Dados: atividades em sala 35% (5 cada), objetivas 35% (17,5 cada) e prova prática (2 atividades de Excel) 30% (15 cada) | `143db7b` | — |
| T20261001-35 | 2026-10-01 15:52:31 | fix: média final de Análise de Dados: atividades em sala 35% (5 cada), objetivas 40% (20 cada) e prova prática (2 atividades de Excel) 25% (12,5 cada) | `17751f2` | — |
| T20261001-36 | 2026-10-01 16:06:07 | fix: média final de Análise de Dados só com as atividades em sala das Aulas 04 e 05 (17,5 pontos cada, 35 no total) | `c7440b8` | — |
| T20261001-37 | 2026-10-01 16:09:21 | feat: média final de Análise de Dados com as atividades das Aulas 01 a 05 (7 pontos cada), Aulas 01-03 com nota 10 fixa para todos (nota_fixa no gerador e data-nota-fixa no JS) | `7d04eba` | — |
| T20261001-38 | 2026-10-01 16:10:19 | fix: média final mostra a nota fixa 10 (e os pontos) das Aulas 01 a 03 já na página, também sem login | `da3fe90` | — |
| T20261001-39 | 2026-10-01 16:12:28 | fix: média final de Análise de Dados com nota 10 fixa nas Aulas 01 a 04, mantida ao trocar turma/aluno no modo professor | `d2c8808` | — |
| T20261001-40 | 2026-10-01 16:13:21 | fix: média final de Análise de Dados com nota 10 fixa só nas Aulas 01 a 03 (Aula 04 volta a usar a nota do banco) | `2c38835` | — |
| T20261001-41 | 2026-10-01 16:15:06 | feat: média final de Análise de Dados com as 7 atividades (5 pontos cada) e nota 10 fixa nas Aulas 01-03, 06 e 07 só para a turma 133933 (nota_fixa_turmas no gerador e no JS) | `6b0ab6c` | — |
| T20261001-42 | 2026-10-01 16:22:18 | feat: PROVA-PRATICA.md de Análise de Dados (10 questões discursivas, 3 tópicos cada, aulas 01 a 06) no formato do gerador-avaliacao-discursiva | `7c93213` | — |
| T20261001-43 | 2026-10-01 16:29:12 | feat: página PROVA-PRATICA.html de Análise de Dados gerada (10 questões discursivas, 30 tópicos), com link no índice e no menu; seed gerado em database/ (fora do Git) | `afdf13a` | — |
| T20261001-44 | 2026-10-01 16:32:45 | fix: média final de Análise de Dados: atividades 40, Avaliação Objetiva 01 30 e Prova Prática discursiva 30; Objetiva 02 e práticas de Excel saem da composição | `e8595f0` | — |
| T20261001-45 | 2026-10-01 16:34:06 | fix: média final de Análise de Dados mostra a linha Prova Prática (30 pontos, 30%) além do subtotal | `340c67f` | — |
| T20261001-46 | 2026-10-01 16:34:45 | fix: média final de Análise de Dados sem as linhas de subtotal da prova objetiva e da prova prática (opção sem_subtotal no gerador) | `81d6279` | — |
| T20261001-47 | 2026-10-01 16:37:30 | fix: composição da média final de Análise de Dados chama a prova de "Avaliação Objetiva" (sem o 01) | `ae3e5f4` | — |
| T20261001-48 | 2026-10-01 16:37:38 | fix: composição da média final de Análise de Dados chama a prova prática de "Avaliação Prática" | `52c077f` | — |
| T20261001-49 | 2026-10-01 16:42:18 | fix: prova prática de Análise de Dados só das aulas 01 a 05 (questão 10 sobre formatos, datas, congelar painéis e filtros no lugar da tabela dinâmica), turma 133933; textos da média final, índice e menu ajustados | `10d4d8b` | — |
| T20261001-50 | 2026-10-01 16:43:28 | feat: relatório de atividades considera nota 10 fixa nas atividades das Aulas 01, 02, 03, 06 e 07 de Análise de Dados para todos os alunos da turma 133933 (Salete) | `5777e93` | — |
| T20261001-51 | 2026-10-01 16:53:53 | feat: nota fixa por turma em assets/js/notas-fixas-turma.js, usada pelo relatório de atividades e agora também pelo painel do professor (nota 10 fixa da turma 133933 nas Aulas 01-03, 06 e 07 de Análise de Dados) | `ca6e255` | — |
| T20261001-52 | 2026-10-01 16:55:59 | fix: botão "Carregar Respostas" das atividades passa a se chamar "Respostas" | `72058c7` | — |
| T20261001-53 | 2026-10-01 16:56:39 | fix: botão "Liberar Recuperação" das atividades passa a se chamar "Recuperação" (e "Nova tentativa" fora das avaliações) | `6608409` | — |
| T20261001-54 | 2026-10-01 16:57:22 | fix: botão "Visualizar Notas" das atividades passa a se chamar "Notas" | `2cefafa` | — |
| T20261001-55 | 2026-10-01 16:58:23 | fix: botões Notas, Recuperação e Respostas do relatório do professor com a mesma altura | `ee2b06c` | — |
| T20261001-56 | 2026-10-01 16:59:14 | fix: ações do aluno (Notas/Ocultar Notas, Recuperação, Respostas) ficam sempre em uma linha | `f6bbbbb` | — |

---

## 🗂️ QUADRO ANTERIOR (formato antigo, até 2026-10-07)

### ✅ TAREFA CONCLUÍDA

#### #1: Expandir Template + Aplicar em 24 Disciplinas

**Status:** ✅ CONCLUÍDO  
**Data de Início:** 2026-09-21  
**Data de Conclusão:** 2026-09-21  
**Tempo Total:** < 1 hora

**Resumo:**
- ✅ Expandir TEMPLATE-EMENTA-CHALKIE-AI.md (10.392 → 13.927 chars)
- ✅ Adicionar seções: Marcos de Competência (IV.B), Estratégias Avançadas (VI), FAQ (XVII), Glossário (XVIII)
- ✅ Aplicar template em 23 disciplinas (exceto 1 já dentro padrão)
- ✅ Personalizar cada ementa com contexto específico (nome, área, carga, exemplos)
- ✅ Expandir/ajustar cada para 14.800–14.950 chars (100% dentro padrão)
- ✅ Auditoria: 23/23 ✅ OK
- ✅ Commit: ea9fdb6

**Arquivos Modificados:**
- TEMPLATE-EMENTA-CHALKIE-AI.md (base)
- 23 disciplinas em MATERIAIS/*/DOCUMENTACAO/EMENTA-CHALKIE-AI.md
- 2 scripts auxiliares: aplicar-template-ementa.py, ajustar-tamanho-final.py

---

### ✅ TAREFAS CONCLUÍDAS

#### #11: Apostila de Introdução à TIC (ITIC) ✅
**Data:** 2026-10-03 a 2026-10-07 | **Commit:** `26c5772` (PR Gelvazio/aulasenai#2, merge na `main` em 2026-10-07) | **Status:** ✅ produção concluída · 👀 aguardando validação do professor

- ✅ 10 capítulos (`APOSTILA/CONTEUDO/CAPITULO-01..10.md`), Markdown completo e conferência com a ementa 278/278 (100%)
- ✅ HTML gerado a partir do Markdown completo (`gerar_apostila.py`) e PDF de 84 páginas A4 (fora do Git)
- ⏳ Professor: validar os 10 capítulos e conferir os vídeos (`APOSTILA/STATUS-APOSTILA.md`)
- 📄 Histórico completo: `docs/gerador-apostilas.md` (seção "Registro — 2026-10-07")

---

#### #1: Expandir Template + Aplicar em 24 Disciplinas ✅
**Data:** 2026-09-21 | **Commit:** ea9fdb6 | **Status:** 23/23 ✅

---

#### #0: Reorganização Completa de Todas as Disciplinas

**Status:** ✅ CONCLUÍDO  
**Data de Conclusão:** 2026-09-21  

**Resumo:**
- Reorganizou pasta de Comunicação Oral e Escrita (7 passos)
- Mesclou conteúdo de turmas nas pastas principais
- Criou EMENTA-CHALKIE-AI.md detalhada (1 disciplina)
- Atualizou CLAUDE.md com regra de tamanho
- Criou index.html portal visual
- Criou script de análise (analise-materias.py)
- Aplicou padrão em 20 disciplinas
- Criou EMENTA-CHALKIE-AI.md em 19 disciplinas (template base)
- 7 commits realizados com ~150 arquivos alterados

---

### 🔄 PRÓXIMA TAREFA

#### #2: Organizar Apostilas em Formato Markdown (.md)

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟠 Alta  
**Data de Início Estimada:** 2026-09-22

Garantir que todas as apostilas estão em formato **Markdown (.md) apenas** — sem PDF/DOCX no momento. Consolidar arquivos redundantes e manter estrutura limpa.

---

#### #3: Preencher EMENTA.md Simples em 8 Disciplinas

**Status:** ⛔ CANCELADA (2026-10-01)  
**Prioridade:** —

Cancelada a pedido do usuário: a versão simplificada `EMENTA.md` deixou de existir; a ementa de
cada matéria é só o `EMENTA-CHALKIE-AI.md`.

---

#### #4: Preencher PLANO-AULAS.md em 8 Disciplinas

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟠 Alta

Criar cronograma semanal/aula para cada disciplina.

---

#### #5: Organizar Atividades em ATIVIDADES/

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟡 Média

Estruturar exercícios práticos por tópico/módulo em cada disciplina.

---

#### #6: Preencher AVALIACOES/

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟡 Média

Adicionar provas, testes e trabalhos avaliativos em cada disciplina.

---

#### #7: Executar Análise Final

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟢 Baixa

Rodar `python analise-materias.py` para validar completude e gerar relatório final.

---

#### #8: EMENTA-PRINCIPAL de Assistente Técnico em Tecnologia da Informação (860h)

**Status:** ✅ CONCLUÍDO (2026-09-25)  
**Prioridade:** 🟠 Alta  
**Adicionada em:** 2026-09-25

Ler `MATERIAIS/Assistente-Tecnico-Tecnologia-Informacao-860horas/Assistente Técnico em Tecnologia da Informação - 860h - Prática Profissional.docx`
e criar `MATERIAIS/Assistente-Tecnico-Tecnologia-Informacao-860horas/EMENTA-PRINCIPAL-Assistente-Tecnico-Tecnologia-Informacao-860horas.md`,
detalhado para uso em IA, no mesmo formato das ementas principais de Logística e de
Assistente-Processos (14 seções, UCs do Anexo II transcritas por script, divergências e campos
pendentes registrados).

- ✅ Executada com confirmação do usuário (curso em `IGNORAR`, marcação mantida).
- ✅ Plano: `docs/ementa-principal-assistente-tecnico-ti.md`. 16 de 18 UCs detalhadas; 2 UCs do
  Específico sem detalhamento no original, registradas na seção 10.1.

---

#### #9: EMENTA-PRINCIPAL de Programador de Sistemas da Informação (860h)

**Status:** ✅ CONCLUÍDO (2026-09-25)  
**Prioridade:** 🟠 Alta  
**Adicionada em:** 2026-09-25

Ler `MATERIAIS/PROGRAMADOR-DE-SISTEMAS-860-HORAS/Programador de Sistemas da Informação_860h.docx`
e criar `MATERIAIS/PROGRAMADOR-DE-SISTEMAS-860-HORAS/EMENTA-PRINCIPAL-PROGRAMADOR-DE-SISTEMAS-860-HORAS.md`,
detalhado para uso em IA, no mesmo formato das ementas principais já criadas (14 seções, UCs do
Anexo II transcritas por script, divergências e campos pendentes registrados).

- ✅ Executada com confirmação do usuário (curso em `IGNORAR`, marcação mantida).
- ✅ Plano: `docs/ementa-principal-programador-sistemas.md`. 14 de 14 UCs detalhadas.

---

#### #10: EMENTA-PRINCIPAL detalhada dos demais cursos

**Status:** ✅ CONCLUÍDO (2026-09-25)  
**Prioridade:** 🟠 Alta  
**Adicionada em:** 2026-09-25

Refazer o `EMENTA-PRINCIPAL-<CURSO>.md` de cada curso restante a partir do documento oficial do
curso, detalhado para uso em IA, no mesmo formato das tarefas #8 e #9 (14 seções, UCs transcritas
do documento, divergências e campos pendentes registrados). Os arquivos atuais serão substituídos.

| # | Curso | Documento-fonte | Permissão |
|---|-------|-----------------|-----------|
| 10.1 | AUTOMACAO-INDUSTRIAL-1200-HORAS | `CT Automação Industrial 1200 SENAI SED.pdf` | IGNORAR |
| 10.2 | BACKEND-560-HORAS | `BackEnd - 570h.docx` | IGNORAR |
| 10.3 | GESTAO_E_CONTROLE_MATERIAIS | `GestaoControleMateriais_456h.docx` | VERIFICAR |
| 10.4 | INFORMATICA | `Curso-Tecnico-Informatica-1200h.txt` | IGNORAR |
| 10.5 | INTERNET-DAS-COISAS | `CT Internet das coisas 1300 SENAI SED.pdf` | IGNORAR |
| 10.6 | MECATRONICA | `CT-Mecatronica_1348h.txt` | IGNORAR |
| 10.7 | OPERADOR-PRODUCAO-INDUSTRIAL | `Operador de Produção Industrial_ 860h - Pratica Profissional.docx` | IGNORAR |
| 10.8 | REDES-DE-COMPUTADORES | `EMENTA-PRINCIPAL-Redesde-Computadores.txt` | IGNORAR |
| 10.9 | RIO_DO_SUL_MAIS_TECH | Sem documento na pasta (ementa atual veio da ficha `FICHA PRODUTO MAISTECH ATUALIZADA.docx`) | VERIFICAR |
| 10.10 | TECNICO-DESENVOLVIMENTO-SISTEMAS | `CT Desenvolvimento de Sistemas 1200 SENAI SED.pdf` | IGNORAR |
| 10.11 | TECNICO-INFORMATICA-INTERNET | `CT-Informatica-Internet-1000-SENAI-SED-2026.pdf` | IGNORAR |

- ⛔ Fora da tarefa: `QUALIFICACAO-PROFISSIONAL/` (exceção do `CLAUDE.md`: não tem ementa de
  curso) e `MATERIAS-GERAIS/`.
- ⚠️ Cursos em `IGNORAR`: confirmar com o usuário antes de executar cada um.
- ⚠️ Executar um curso por vez: criar o plano em `docs/`, conferir o documento-fonte (PDF e TXT
  podem ter estrutura diferente dos .docx) e pedir aprovação antes de gerar o arquivo.
- ✅ RIO_DO_SUL_MAIS_TECH: conferido com `FICHA PRODUTO RIO DO SUL MAIS TECH ATUALIZADA.docx`.
- ✅ Executada com autorização do usuário para todos os cursos, inclusive os em `IGNORAR` (marcação mantida).
- ✅ Plano e resultado: `docs/tarefa-10-ementas-principais-demais-cursos.md`.

---

### 📊 ESTATÍSTICAS

| Métrica | Valor |
|---------|-------|
| Total de tarefas planejadas | 11 |
| Concluídas | 6 |
| Em progresso | 0 |
| Planejadas | 4 |
| Canceladas | 1 |
| Taxa de conclusão | 55% |

---

### 🔗 REFERÊNCIAS

- **Auditoria:** `AUDITORIA-TAMANHO-EMENTA.json`
- **Template Base:** `TEMPLATE-EMENTA-CHALKIE-AI.md` (13.927 chars)
- **Padrão de Tamanho:** 14.800–14.950 caracteres
- **Disciplinas:** 25 total (25/25 ✅ dentro padrão)

---

**Última atualização:** 2026-09-25 (Tarefa #10 concluída)  
**Próxima revisão:** Ao iniciar Tarefa #2
