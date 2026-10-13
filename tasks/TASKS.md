# 📋 TAREFAS — SENAI Aulas

**Somente tarefas PENDENTES** (planejadas ou em progresso).
**O status oficial de cada tarefa fica no [STATUS.md](STATUS.md)** (seção "📌 Tarefas do `TASKS.md`"); aqui fica só a descrição longa. Em conflito, o `STATUS.md` vence.
Ao concluir ou cancelar uma tarefa, **remover o bloco dela deste arquivo** (na mesma tarefa, no
mesmo commit); o registro do que foi feito fica no `STATUS.md`.

---

## ⏳ TAREFAS PENDENTES

### #2: Organizar Apostilas em Formato Markdown (.md)

**Status:** 🔄 PLANO AGUARDANDO APROVAÇÃO (2026-10-08)  
**Prioridade:** 🟠 Alta  
**Data de Início Estimada:** 2026-09-22

Garantir que todas as apostilas estão em formato **Markdown (.md) apenas** — sem PDF/DOCX no momento. Consolidar arquivos redundantes e manter estrutura limpa.

- ✅ Levantamento e plano: `docs/tarefa-02-apostilas-em-markdown.md` (nenhuma apostila em
  PDF/DOCX no Git; 4 matérias já no padrão; 5 itens fora do padrão para decidir).
- [ ] Aprovação do usuário (itens A–E e pergunta sobre Comunicação Oral e Escrita).
- [ ] Executar os passos do plano.
- [ ] Na máquina local: conferir PDF/DOCX de apostila fora do Git.

---

### #4: Preencher PLANO-AULAS.md em 8 Disciplinas

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟠 Alta

Criar cronograma semanal/aula para cada disciplina.

---

### #5: Organizar Atividades em ATIVIDADES/

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟡 Média

Estruturar exercícios práticos por tópico/módulo em cada disciplina.

---

### #6: Preencher AVALIACOES/

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟡 Média

Adicionar provas, testes e trabalhos avaliativos em cada disciplina.

---

### #7: Executar Análise Final

**Status:** ⏳ PLANEJADO  
**Prioridade:** 🟢 Baixa

Rodar `python analise-materias.py` para validar completude e gerar relatório final.

---

### #11: Conferir localmente a duração dos vídeos da apostila de Reforço de Linguagens

**Status:** ⏳ PENDENTE (fazer no ambiente **local**, onde o YouTube funciona)  
**Prioridade:** 🟠 Alta  
**Adicionada em:** 2026-10-08

A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/APOSTILA/` tem **29 vídeos** (2 a 3
por capítulo) com a duração `a conferir`: na nuvem o YouTube estava bloqueado e a duração não pôde
ser lida. Cada seção "Vídeos" tem a anotação "⏳ CONFERIR LOCALMENTE (TASKS.md #11)".

- [ ] Para cada vídeo de `APOSTILA/CONTEUDO/CAPITULO-01.md` a `CAPITULO-10.md`, ler a duração
  pelos metadados (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), sem navegador.
- [ ] Até 15:00 → trocar `a conferir` por `mm:ss` (e completar o canal, se faltar); acima de
  15:00 ou vídeo indisponível → apagar a linha (e, se o capítulo ficar sem vídeo, buscar outro).
- [ ] Remover a anotação "⏳ CONFERIR LOCALMENTE" dos capítulos e do Markdown completo.
- [ ] Aumentar `versao_apostila` no `materia.json` (1.0 → 1.1), rodar
  `gerar_apostila.py <pasta> --markdown --forcar` e depois o HTML (conferência 100%).
- [ ] Atualizar `APOSTILA/STATUS-APOSTILA.md` (coluna Vídeos) e o `STATUS.md` (item 67.4).
- [ ] Commit (no local, o push é do usuário).

---

### #12: Conferir localmente a duração dos vídeos da apostila de Fundamentos da Tecnologia

**Status:** ⏳ PENDENTE (fazer na máquina local, com acesso ao YouTube)  
**Prioridade:** 🟡 Média  
**Adicionada em:** 2026-10-08

A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/APOSTILA/`
foi gerada **sem vídeos** (cada capítulo tem só a anotação "⏳ Vídeos pendentes"): o ambiente de nuvem bloqueia `www.youtube.com` e a duração não pôde ser
conferida nos metadados (regra "REGRAS APOSTILAS": nada de duração inventada; máximo 15:00).

- [ ] Para cada capítulo (01 a 09), escolher de 1 a 4 vídeos em português, de canais educacionais.
- [ ] Conferir **localmente** título, canal e duração (`curl` na página do vídeo: `lengthSeconds`,
      `ownerChannelName`), descartando os de mais de 15:00.
- [ ] Em `APOSTILA/CONTEUDO/CAPITULO-NN.md`, trocar a linha "⏳ Vídeos pendentes" da seção
      `## Vídeos` pelos vídeos no formato `- [título exato](url) — mm:ss — canal`.
- [ ] Aumentar `versao_apostila` no `materia.json`, rodar `gerar_apostila.py <pasta da matéria>
      --markdown --forcar` e depois o HTML (conferência 100%).
- [ ] Atualizar a coluna "Vídeos" do `APOSTILA/STATUS-APOSTILA.md`.
- 📌 Candidatos já levantados para o capítulo 01 (duração a conferir): SNABaP2iORg (História e
  evolução dos computadores), yMGm7cPCh6o (Evolução dos Computadores — Linha do Tempo),
  fYJl-7jRzuw (Manual do Mundo — Por onde vem a internet?), XHFfXJglFhY (Entenda... Cidadania Digital).

---

### #14: Conferir localmente a duração dos vídeos da apostila de Exploração de Carreiras

**Status:** ⏳ PENDENTE (fazer na máquina local, com acesso ao YouTube)  
**Prioridade:** 🟡 Média  
**Adicionada em:** 2026-10-08 _(registrada na branch de origem como #11)_

A apostila `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/APOSTILA/` (9 capítulos) tem **28 vídeos com a duração `a conferir`**: a sessão em
nuvem não acessa o YouTube e o usuário pediu para seguir e conferir depois, localmente.

- [ ] Conferir cada vídeo da lista `MATERIAIS/RIO_DO_SUL_MAIS_TECH/EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/APOSTILA/RASCUNHOS/VIDEOS-A-CONFERIR.md` pelos metadados
      (`curl` na página do vídeo: `lengthSeconds`, `ownerChannelName`), sem navegador.
- [ ] Nos `APOSTILA/CONTEUDO/CAPITULO-NN.md`, trocar `a conferir` pela duração (`mm:ss`) e
      acrescentar ` — <canal>` no fim da linha.
- [ ] Apagar os vídeos com mais de 15:00 ou fora do tema (cada capítulo precisa de ao menos 1).
- [ ] Aumentar `versao_apostila` no `materia.json` (1.0 → 1.1), rodar `gerar_apostila.py <pasta>
      --markdown --forcar` e depois o HTML (conferência 100%).
- [ ] Atualizar `APOSTILA/STATUS-APOSTILA.md`.

---

### #16: Bloqueio da AULA (card inteiro) × bloqueio da ATIVIDADE em todos os índices — pedida em 2026-10-09 01:00

**Status:** ⏳ PENDENTE — fazer em **outra sessão** (decisão do usuário, 2026-10-09 01:02)
**Andamento:** ✅ ligada em **Testes de Front-End** (2026-10-09, Etapa 114 do `STATUS.md`). Para as
demais matérias, só acrescentar a pasta em `PASTAS_COM_BLOQUEIO_AULA`
(`assets/js/indice-bloqueio-aula-config.js`), uma por vez, quando o usuário pedir.
**Prioridade:** 🟠 Alta
**Regra:** `CLAUDE.md`, seção "⏳ REGRA PENDENTE — BLOQUEIO DA AULA × BLOQUEIO DA ATIVIDADE".
**STATUS:** `STATUS.md`, Etapa 113, item 113.6. Vale para **todas as atividades de todas as matérias**.

O que fazer (tarefa pequena: só JS/CSS, sem mudar o banco — a coluna `aulas.ativo` já existe e o
RLS da `aulas` já deixa o professor alterá-la):

- [ ] **O ON/OFF de cada atividade NUNCA bloqueia o card inteiro** (os alunos sempre veem a aula,
  os slides e as outras atividades): em `assets/js/indice-atividades-bloqueio.js`, tirar o
  bloqueio do card quando todas as atividades estão OFF (aluno: só 🔒 no link de cada atividade
  bloqueada; professor: sem escurecer o card) — remover `bloquearCardAtividade`,
  `desativarLinkBloqueado` e a classe `bloqueada-professor` desse script.
- [ ] **Botão de bloqueio da AULA**, embaixo no card, **logo antes de "✏️ Editar aula"** (só
  professor): ON/OFF "Aula liberada / Aula bloqueada", gravando em **`aulas.ativo`** (false =
  bloqueada) com `gravarAulaCard` (`assets/js/indice-aula-repositorio.js`). **Só este botão bloqueia
  o card inteiro:** aluno vê o card escurecido com cadeado, links desativados e "Aula Bloqueada!"
  ao clicar (classe `bloqueada`, CSS já existe em `indice-atividades.css`); professor vê o card
  escurecido, mas os links continuam abrindo.
- [ ] Código sugerido: módulo novo `assets/js/indice-aula-bloqueio.js` (`aplicarBloqueioAulaNoCard`,
  `criarBotaoBloqueioAula`), chamado por `assets/js/indice-aula-data.js` em `desenharCardAula` e
  antes de `adicionarBotaoEditarAula`; carregar o módulo em `carregarDataAulasIndice`
  (`assets/js/atividades-crud-modal.js`) antes do `indice-aula-data.js`. ⚠️ Usar nomes de
  constantes exclusivos (constante global repetida derruba o script inteiro — lição da Etapa 113).
  O "Ativa" do modal "Editar aula" é a mesma coluna: ao gravar no modal, atualizar o botão.
- [ ] Estilo em `assets/css/indice-atividades-bloquear.css` (mesmo visual do ON/OFF das atividades,
  com o texto ao lado).
- [ ] Atualizar `docs/regras/atividades.md`, tirar o "PENDENTE" da seção do `CLAUDE.md` (nova
  versão + histórico), commit e aceite do usuário (professor e aluno).

### #17: Fechar a revisão das regras do CLAUDE.md (sessão de 2026-10-07/08) — registrada em 2026-10-09 01:14:48

**Status:** ⏳ PENDENTE — continuar em **nova sessão** (pedido do usuário, 2026-10-09 01:14:48)
**Prioridade:** 🟡 Média
**STATUS:** `STATUS.md`, Etapas 70, 72 e 73 (itens 70.5, 72.8 e 73.14). Plano da divisão:
`docs/reorganizar-claude-md-estrutura.md`. Tudo já está aplicado e commitado (último commit da
sessão: `56abe5b`); falta só conferir e aceitar.

O que falta:

- [ ] **Aceite do usuário — divisão do `CLAUDE.md` (70.5):** conferir o núcleo do `CLAUDE.md`, os
  arquivos de `docs/regras/`, o `docs/HISTORICO-REGRAS.md` e o menu **Regras** no site (o modal
  carrega o `CLAUDE.md` + `docs/regras/` + histórico; não foi testado no navegador).
- [ ] **Aceite do usuário — 7 contradições corrigidas (72.8):** frase final sem tabela; menu
  ALUNOS só do administrador; regra do Word removida; "PDF com gabarito" fora da regra da Turma;
  Reforço de Linguagens fora do exemplo das 50 questões; ementa na raiz da matéria; `git add .`
  trocado no `CLAUDE.md` global.
- [ ] **Aceite do usuário — revisão final de 12 itens (73.14):** pastas que não são curso numa
  lista só; plano em `docs/` só em tarefa grande (projeto e global); global sem `git status` como
  exemplo; título "Regras do projeto Aulas SENAI"; menu Regras e aviso de segredo; autenticação
  com `login.html`/`header-usuario.js`; grafo sem data fixa; inicialização pelo `STATUS.md`;
  comando da ementa com `-Raw`; STATUS-EMENTAS com caminho genérico; registro do `cursoprofessor`
  removido.
- [ ] **Conferir o commit `85a8531 ok` antes do push (decisão do usuário):** ele versionou
  arquivos de gabarito (ex.: `GABARITO-AVALIACAO-OBJETIVA.md`,
  `PROVA_OBJETIVA_UC1_TIC_COM_GABARITO.gs`, `GABARITO_CORRECAO_PROVA_SIMPLES_UC1_TIC.md`), a pasta
  `RESOLUCAO/` e um `.gitignore copy`, e mexeu na `.gitignore` — contra a regra "O QUE NUNCA É
  PUBLICADO". Decidir se tira do Git (`git rm --cached` + padrão no `.gitignore`) ou se mantém.
- [ ] **Ementa fora do tamanho (avisar/decidir):** `RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/EMENTA-CHALKIE-AI.md`
  tem 15.657 caracteres (regra: 14.800 a 14.950). Ajustar só a pedido (respeitar
  `STATUS-PERMISSAO-EMENTA`).
- [ ] **Opcional, só se pedido:** generalizar `RIO_DO_SUL_MAIS_TECH/scripts/criar-status-ementas.py`
  para todos os cursos (hoje só percorre Rio do Sul; a regra manda atualizar os outros à mão) —
  é código: tarefa com plano próprio.
### #18: Progresso da turma GLOBAL em todas as atividades — pedida em 2026-10-09 10:22:23

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`" e Etapa 121 (fonte única).
**Plano:** [docs/progresso-global-atividades.md](docs/progresso-global-atividades.md) (aprovado em 2026-10-09 10:31).
**Prioridade:** 🟠 Alta

Pedido do usuário: criar um gerador de progresso global, igual ao da Prova Prática ADAG (id 82),
para todas as matérias; anotar a regra no `CLAUDE.md`; começar pela objetiva da aula 01 de
Testes de Front-End (`ATIVIDADES-AULA-01-50-QUESTOES.html`) e depois todas as atividades devem
exibir o progresso logo ao abrir a página.

- [ ] Módulo global (substitui o painel das discursivas; tudo vem do global: gráficos, Cálculo
  Nota e mínimo de questões).
- [ ] Objetivas: acertos e nota pelo banco (sem expor o gabarito); mínimo de questões e Cálculo
  Nota também nas objetivas (SQL novo, aplicado só com pedido do usuário).
- [ ] Escopo: objetivas e discursivas que gravam no banco.
- [ ] Regra no `CLAUDE.md` e em `docs/regras/atividades.md`; aceite do usuário.

---

### #19-91cbac65-87ca-45a0: Análise contínua das matérias (o que falta e o que está OK) — pedida em 2026-10-09 13:20:11

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`". ⛔ **Tarefa PERMANENTE: nunca fica
CONCLUÍDA** enquanto `tasks/ANALISE-MATERIAS-RELATORIO.json` tiver alguma matéria com
`"completa": false` ou alguma pendência (regra no `CLAUDE.md`, seção "ANÁLISE CONTÍNUA DAS MATÉRIAS").
**Prioridade:** 🟠 Alta
**Rotina:** `C:\Python314\python.exe scripts/analise-materias.py` (só lê as matérias; grava
`tasks/ANALISE-MATERIAS-RELATORIO.json`).

O que fazer, sempre:

- [ ] Rodar a rotina no início de cada sessão e ao concluir qualquer tarefa que mexa numa matéria
  (`MATERIAIS/`), e incluir o JSON atualizado no commit da tarefa.
- [ ] Atualizar a linha desta tarefa no `STATUS.md` com os números do relatório (cursos, matérias,
  completas, incompletas) e a data e hora da última rodada.
- [ ] Resolver as pendências **só quando o usuário pedir**, uma matéria por vez (cada uma vira
  etapa própria no `STATUS.md`); respeitar `IGNORAR`/`VERIFICAR` das ementas e cursos.
- [ ] Só remover esta tarefa do `TASKS.md` quando o relatório mostrar `incompletas = 0` e nenhuma
  pendência, com o aceite do usuário.

---

### #20-2ac1a8ec-911b-466f: Banco de Dados (Técnico em Informática para Internet) 100% no padrão da ITIC — pedida em 2026-10-09 13:26:40

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`" e Etapa 125 (fonte única).
**Prioridade:** 🟠 Alta · **Tarefa grande:** plano em `docs/` e aprovação antes de executar.
**Matéria:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/` (renomeada em 2026-10-09) (modelo: Introdução à TIC).
**Etapa 1 (esta):** tudo **menos a apostila** (pedido do usuário). A apostila fica para uma etapa 2.

Situação em 2026-10-09 (`tasks/ANALISE-MATERIAS-RELATORIO.json`): ementa OK (14.802 caracteres) e
`ATIVIDADES/index.html` existe; faltam `materia.json`, aulas em `CONTEUDO/`, `AULAS/STATUS-AULAS.md`,
fontes em `ATIVIDADES/CONTEUDO/`, `ATIVIDADES/STATUS-ATIVIDADES.md` e as objetivas de 50 questões.
⚠️ A matéria está em **`IGNORAR`** no `STATUS-PERMISSAO-MATERIA` — passar para `VERIFICAR` é o
primeiro passo (pedido do usuário).

- [x] Plano `docs/banco-de-dados-materia-100.md` com as decisões: permissão `VERIFICAR`; nome da
  pasta (hoje `BANCO_DE_DADOS`, fora do padrão — renomear só se o usuário quiser); destino das pastas
  e arquivos antigos (`DOCUMENTACAO/`, `SLIDES/`, `AVALIACOES/`, `exemplo-biblioteca/`, PDF e
  `.docx`); quantidade de aulas (1 a cada 4 h da ementa). Aprovação do usuário.
- [x] `materia.json` copiado da ementa (capacidades e conhecimentos, sem conteúdo de outra UC).
- [ ] Aulas em `CONTEUDO/AULA-NN-DESCRICAO-CURTA.md` (uma por vez) e `AULAS/STATUS-AULAS.md`.
- [ ] Atividades por aula: objetiva de 50 questões e prática no padrão da id 82
  (`docs/REGRAS-ATIVIDADE-PRATICA.md`), fontes em `ATIVIDADES/CONTEUDO/`, sem empresa fictícia;
  `ATIVIDADES/STATUS-ATIVIDADES.md` e `ATIVIDADES/index.html` regerado; seeds no banco só com pedido.
- [ ] Avaliações e média final pela regra global de matérias (`docs/regras/materias.md`, seção 6).
- [ ] Rodar `scripts/analise-materias.py`: Banco de Dados sem pendências, exceto as da apostila.
- [ ] Aceite do usuário.

---

### #21-eeefc710-3e74-4928: Colaboração entre sessões e licenças pelo STATUS.md — pedida em 2026-10-09 15:22:41

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`" e Etapa 135-eeefc710 (fonte única).
**Prioridade:** 🟠 Alta · **Tarefa grande:** plano [docs/colaboracao-entre-sessoes.md](../docs/colaboracao-entre-sessoes.md).

Pedido: "execute todas as suas sugestões" — as 7 sugestões para sessões de contas diferentes do
Claude (que só se falam pelo repositório) colaborarem sem se atrapalhar:

- [x] (4) `tasks/RECADOS.md`: recados entre sessões, só se acrescentam linhas.
- [x] (7) Uma etapa por arquivo em `tasks/etapas/`; o `STATUS.md` vira o índice.
- [x] (3) "🧭 Frentes de trabalho": próximo passo por ambiente + branch.
- [x] (2) Coluna "Em uso por" no "📌 Tarefas": reserva da tarefa.
- [x] (1, 5, 6) Regras no `CLAUDE.md`: etapa nova com UUID; trazer a `main` no início e no fim;
  arquivo gerado em conflito = regerar com o script.
- [ ] Aceite do usuário (ele vai juntar o PR na `main`).

---

### #22-f79be83e-0418-43e8: Testes de Front-End — objetivas e práticas das aulas 04 a 10 — pedida em 2026-10-09 23:04:01

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`" e Etapa 137-13665a7e (fonte única).
**Matéria:** `MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/` · **Plano:** `docs/testes-frontend-aulas-04-a-10.md`.

- [ ] Aulas 04 a 10: objetiva de 50 questões + prática 10 × 3 (padrão id 82), uma por vez.
- [ ] Seeds aplicados e conferidos pelo md5 (`database/SEEDS-APLICADOS.md`).
- [ ] Ementa em 14.800–14.950 caracteres.
- [ ] Análise das matérias sem pendências em Testes de Front-End.
- [ ] Aceite do usuário.

---

### #24-9fb25086-5b51-44cb: Fila `tasks` no banco + 1 agendador — pedida em 2026-10-11 05:42:00

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`" e Etapa 142-2a52ee2f (fonte única).
**Prioridade:** 🟠 Alta · **Tarefa grande:** plano [docs/fila-tasks-agendador-unico.md](../docs/fila-tasks-agendador-unico.md).

Pedido: "1 agendador que apenas controle 1 tabela de nome tasks, que a IA vai ler e decidir se
executa algo ou não". Decisões: substitui a #23; fila vazia = não faz nada; cadastro pela página
`tasks.html` (só o Professor Administrador).

- [x] Tabela `tasks` + `pegar_proxima_task` / `finalizar_task` (RLS, só administrador).
- [x] Página `tasks.html` + menu TASKS.
- [x] Regra das tarefas agendadas e prompt da rotina para a fila.
- [x] Tarefas do `TASKS.md` na tabela e `tasks/fila/` (script `scripts/tasks/sincronizar_tasks.py`).
- [ ] Teste do usuário na página e aceite; depois liberar o GitHub (item 140.6) e ligar a rotina.
- [x] #23 cancelada (2026-10-11 05:58).

---

### #25-b3e29764-940b-4a82: Atividades só no banco, layout global e pasta da matéria sem HTML — pedida em 2026-10-11 06:01:03

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`" e Etapa 143-d30a9c4d (fonte única).
**Prioridade:** 🟠 Alta · **Tarefa grande:** plano em `docs/` e aprovação antes de executar.
**Regra:** `CLAUDE.md`, "🗃️ REGRA — ATIVIDADES SÓ NO BANCO, LAYOUT GLOBAL E PASTA SÓ COM CONTEÚDO".

Pedido: questões da objetiva e da prática só no banco; objetiva e prática com layout global (sem
página criada do zero por aula); pastas das matérias/aulas só com conteúdo, sem HTML (tudo do global).

**Dividida em 22 sub-tasks** (2026-10-11 06:07, pedido do usuário) na tabela `tasks` (ids 19 a 40, arquivos
`tasks/fila/TASK-0019.md` a `TASK-0040.md`), em cadeia: cada uma só começa com a anterior
concluída; as etapas 👤 (25.03 aprovação do plano, 25.11 aceite do piloto, 25.22 aceite final) são
do usuário, na página `tasks.html`.

- [ ] 25.01 Levantamento · 25.02 Plano · 25.03 👤 Aprovação
- [ ] 25.04 Banco das objetivas · 25.05 Script de carga · 25.06 Banco da prática
- [ ] 25.07 Página global objetiva · 25.08 Página global prática · 25.09 Índice global
- [ ] 25.10 Piloto Testes de Front-End · 25.11 👤 Aceite do piloto
- [ ] 25.12 a 25.18 Migrar Banco de Dados, ITIC, ADAG, Automação, Fundamentos da Tecnologia,
  Comunicação Oral e Escrita, Reforço de Linguagens (uma por vez)
- [ ] 25.19 Avaliações e média final · 25.20 Apostila · 25.21 Remover HTML, regras e scripts
- [ ] 25.22 👤 Aceite final

---

### #26-55a91111-02ce-4cb1: Regras no banco (regra_documento e regra_secao) — pedida em 2026-10-11 06:21:48

**Status:** ver `STATUS.md`, seção "📌 Tarefas do `TASKS.md`" e Etapa 144-aff33423 (fonte única).
**Prioridade:** 🟠 Alta · **Plano:** [docs/regras-no-banco.md](../docs/regras-no-banco.md).

Pedido: "Faça os 2, inclusive o regra por seção" — cópia das regras do repositório (`CLAUDE.md` e
arquivos de regras) no Supabase, inteiras (`regra_documento`) e por seção (`regra_secao`),
conferidas pelo md5 com `scripts/regras/sincronizar_regras.py`.

- [x] Tabelas, script, regra no `CLAUDE.md` e passo na rotina.
- [ ] Primeira cópia e `conferir` sem diferenças.
- [ ] Aceite do usuário.

---

**Última atualização:** 2026-10-11 06:28 (tarefa #26 adicionada)
