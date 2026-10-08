# 📚 CLAUDE.md — Regras do projeto Aulas SENAI

**Versão das regras:** 2026-10-08 08:10

## 🕒 HISTÓRICO DE VERSÕES DAS REGRAS

Resumo — as 5 mudanças mais recentes. **Histórico completo:** [docs/HISTORICO-REGRAS.md](docs/HISTORICO-REGRAS.md).

| Versão (data e hora) | O que mudou |
|---|---|
| 2026-10-08 08:10 | Inicialização: ler `SESSOES-CLAUDE/STATUS-SESSOES.md` (e o log das sessões `PENDENTE`) **sempre antes de iniciar uma nova tarefa**, junto com o `STATUS.md`; sessões `CONCLUÍDO` passam pela limpeza antes |
| 2026-10-08 08:09 | Sessão só fica `CONCLUÍDO` quando a tarefa inteira foi finalizada: antes, validar **cada** pedido do usuário da sessão (feito, conferido e aceito), com a tabela "✅ Validação dos pedidos" no log; faltando qualquer item, continua `PENDENTE` |
| 2026-10-08 08:06 | `SESSOES-CLAUDE/STATUS-SESSOES.md` (status de todas as sessões, lido no início de cada sessão) e regra da sessão `CONCLUÍDO`: ler o que foi feito, atualizar o `CLAUDE.md` se preciso, conferir as pendências e remover os dados da sessão |
| 2026-10-08 08:04 | Registro da sessão: motivo registrado — o usuário alterna entre 2 licenças do Claude Code e perde o contexto ao trocar; o log precisa bastar sozinho para a outra licença continuar |
| 2026-10-08 08:02 | Registro da sessão em `SESSOES-CLAUDE/`: grava só o **mínimo necessário para continuar** em outra sessão (estado, decisões, arquivos, commits, pendências e próximo passo exato), **não** uma cópia completa da conversa |

---

## 🔄 REGRA CRÍTICA — VISUALIZADOR DE REGRAS ATUALIZADO JUNTO COM O CLAUDE.md

⚠️ **Sempre que este `CLAUDE.md` for atualizado, o visualizador de regras (menu Regras do header)
também deve ser verificado e atualizado junto, para o usuário ver sempre as regras mais atuais.**
Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Cada versão tem data e hora:** a cada alteração deste arquivo, atualizar a linha
  `**Versão das regras:** AAAA-MM-DD HH:MM` (topo) e acrescentar **no início** do
  "HISTÓRICO DE VERSÕES DAS REGRAS" uma linha com a mesma data e hora e o que mudou — nos **dois**
  lugares: no histórico completo (`docs/HISTORICO-REGRAS.md`) e no resumo do topo deste arquivo,
  que mantém só as **5 mais recentes** (apagar a 6ª do resumo; o completo nunca perde linhas).
- ✅ **Verificar o visualizador a cada atualização:** `assets/js/regras-modal.js` (+
  `assets/css/regras-modal.css`, acionado por `js/header-usuario.js`) deve continuar lendo este
  arquivo **e os arquivos de `docs/regras/` citados no índice** (desde 2026-10-07), mostrar a versão (data e hora) no topo do modal e montar o índice com todas as seções
  `##`. Se a mudança no `CLAUDE.md` quebrar algo do visualizador (formato da linha de versão,
  títulos, tabelas), corrigir o visualizador **na mesma tarefa**.
- ✅ O visualizador busca o `CLAUDE.md` sem cache **toda vez que o modal é aberto** (nada de
  cópia antiga em memória).
- ✅ O commit da tarefa inclui o `CLAUDE.md` e, quando alterados, os arquivos do visualizador.

---

## 🚫 REGRAS DO USUÁRIO QUE VALEM SEMPRE (2026-09-30)

- ⛔ **Nunca abrir navegador** (preview, Browser pane, computer-use, Playwright...) nem iniciar
  servidor de desenvolvimento para validar. Validar por leitura do código, `node`, banco e terminal;
  se só o navegador confirmar, pedir ao usuário que teste.
- ✅ **Final de tarefa:** responder `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?` (sem tabela
  nem resumo) e, logo abaixo, perguntar **"Deseja atualizar o log da sessão atual?"** (ver a
  regra "REGISTRO DA SESSÃO EM `SESSOES-CLAUDE/`", 2026-10-08).
- ✅ **Tarefas pequenas** (ajuste pontual, sem banco/segurança/estrutura nova) **não precisam** de
  plano em `docs/` nem de aprovação prévia; tarefas grandes continuam precisando.
- ✅ **Um commit por tarefa** (push conforme o ambiente: local = não; nuvem = sim, numa branch própria + novo PR para a `main`).
- ✅ **Aulas: uma por vez, completa** (2026-10-03): gerar e gravar uma aula (e todo o seu material)
  antes de passar à próxima, controlando em `<MATERIA>/AULAS/STATUS-AULAS.md` (ver a regra
  "GERAR E GRAVAR UMA AULA POR VEZ").
- ✅ **Exceção — Reforço de Linguagens** (2026-10-06): cada atividade tem 25 questões (20 objetivas + 5
  discursivas) e a matéria tem 10 aulas (uma por slide); ver a regra exclusiva da matéria.
- ✅ **1 atividade objetiva de 50 questões por aula** (2026-10-03), controlada em
  `<MATERIA>/ATIVIDADES/STATUS-ATIVIDADES.md` (ver a regra "1 ATIVIDADE OBJETIVA DE 50 QUESTÕES").
- ⛔ **Push depende do ambiente** (2026-10-07): **local** (máquina do usuário) = **nunca fazer
  push**, mesmo que ele peça — avisar que o commit está pronto para ele enviar; **nuvem** (Claude
  Code na web/remoto) = **sempre fazer push numa branch própria e abrir um NOVO pull request
  para a `main`**, nunca push direto na `main` (2026-10-08; ver a regra "PUSH: NUNCA NO AMBIENTE
  LOCAL, SEMPRE NA NUVEM").
- ⛔ **Conteúdo só pelos Markdowns, nunca de PDF** (2026-10-03): para conferir ou gerar conteúdo,
  ler os `.md` da matéria — em primeiro lugar o `EMENTA-CHALKIE-AI.md` (ver a regra "CONTEÚDO SÓ
  PELOS MARKDOWNS").
- ✅ **Matéria modelo = Introdução à TIC** (2026-10-03): toda peça de outra matéria segue a
  estrutura que funciona em `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/` (ver a
  regra "MATÉRIA MODELO").
- ✅ **Aulas extraídas da ementa em `CONTEUDO/`** (2026-10-03): 1 aula a cada 4 h da ementa
  (arredondando para cima), arquivo `AULA-NN-DESCRICAO-CURTA.md`; atividades e, no final, a
  apostila são feitas a partir dessas aulas (ver a regra "AULAS EXTRAÍDAS DA EMENTA").

---

## 🗂️ ÍNDICE DAS REGRAS DETALHADAS (`docs/regras/`) — LEITURA OBRIGATÓRIA ANTES DE MEXER

⚠️ **As regras detalhadas do projeto ficam em `docs/regras/` e valem como se estivessem neste
`CLAUDE.md`.** Registrada em 2026-10-07 a pedido do usuário (divisão "núcleo + `docs/regras/`").
Aqui ficam as regras de sempre, as de segurança e este índice.

- ✅ **Antes de mexer** em algo da coluna "Ler antes de…", **ler o arquivo inteiro** da linha.
- ✅ Regra nova: escrever no arquivo do assunto (ou criar um novo em `docs/regras/` e acrescentar
  aqui); regra que vale sempre ou de segurança fica neste `CLAUDE.md`.
- ✅ Alterou um arquivo de `docs/regras/`: atualizar a **Versão das regras** e o histórico deste
  `CLAUDE.md` e incluir o arquivo no commit.
- ✅ O menu **Regras** (visualizador) mostra este arquivo e todos os arquivos da tabela abaixo.

| Arquivo | Ler antes de… | Regras dentro |
|---|---|---|
| [docs/regras/ementas-e-cursos.md](docs/regras/ementas-e-cursos.md) | criar ou alterar ementas, pastas de curso/matéria, aulas em `CONTEUDO/`, STATUS-EMENTAS e dashboards | aulas extraídas da ementa; `EMENTA-CHALKIE-AI.md`; STATUS-EMENTAS; STATUS-PERMISSAO-EMENTA/MATERIA; `EMENTA-PRINCIPAL-<CURSO>.md`; pasta = UC; matérias semelhantes; `dashboard.html` |
| [docs/regras/atividades.md](docs/regras/atividades.md) | mexer em atividades, avaliações, discursivas, respostas no banco, gabarito, exportação PDF, índices de atividades, Excel, banco do AVA ou Reforço de Linguagens | alternativas no banco (tentativas, horário, log, discursivas, correção); turma na exportação; gabarito; índices e bloqueio por turma; Excel; uma aula por vez; 50 questões; Reforço de Linguagens; banco do AVA |
| [docs/regras/apostilas.md](docs/regras/apostilas.md) | gerar ou alterar apostilas (capítulos, Markdown completo, HTML, `materia.json`) | identificação; conferência 100% com a ementa; gerador; Markdown completo; `materia.json`; formato e ordem; páginas A4 |
| [docs/regras/usuarios-turmas-paginas-professor.md](docs/regras/usuarios-turmas-paginas-professor.md) | mexer em contas/senhas, turmas, alunos, equipes, aulas (excluir/editar card), pendências ou índice de cursos | contas e senhas; excluir aula e card = 1 aula; pendências; índice de cursos; `turmaaluno`; equipes; página por turma; e-mail do aluno |
| [docs/regras/assets-e-geradores.md](docs/regras/assets-e-geradores.md) | criar ou alterar CSS, JS, menus, header ou geradores (`assets/`), e avisos ao usuário | CSS e JS genéricos em `assets/`; menu; header; geradores; popup no lugar de `alert()` |
| [docs/regras/paginas-legadas.md](docs/regras/paginas-legadas.md) | mexer nas páginas antigas (`dashboard.html`, `uc.html`, `questionarios.html`, `validacao.html`) ou na apostila de Reforço de Matemática | descrição das páginas antigas; fluxo de navegação; exercícios da apostila de Reforço de Matemática |

### ⛔ Proibições das regras detalhadas (resumo — o detalhe está nos arquivos acima)

- ⛔ Gabarito nunca em página de aluno, PDF ou consulta do aluno, salvo a liberação do professor
  por turma depois que todos entregaram (`atividades.md`).
- ⛔ Alternativas e respostas só no banco: nada de localStorage; sem banco, a marcação fica
  bloqueada (`atividades.md`).
- ⛔ Nunca escrever conteúdo de outra UC numa matéria nem propagar para matérias semelhantes sem
  pedido; curso/matéria em `IGNORAR` não é processado (`ementas-e-cursos.md`).
- ⛔ Em `QUALIFICACAO-PROFISSIONAL/` a ementa é só do professor: a IA só lê (`ementas-e-cursos.md`).
- ⛔ Sem `<style>`/`<script>` embutidos nem `onclick` nos HTML; nada de `alert()`/`confirm()` em
  código novo (`assets-e-geradores.md`).
- ⛔ Apostila não gera capítulo novo nem HTML sem a conferência 100% com a ementa; sem gabarito na
  apostila (`apostilas.md`).
- ⛔ Nunca usar `user_metadata` para permissão; senhas e chave `service_role` nunca no chat nem no
  repositório (`usuarios-turmas-paginas-professor.md`).
- ⛔ Exclusões de aula e pendência são lógicas (`excluido = 1`): nunca apagar a linha
  (`usuarios-turmas-paginas-professor.md`).

---

## 📄 REGRA CRÍTICA — CONTEÚDO SÓ PELOS MARKDOWNS (NUNCA EXTRAIR DADOS DE PDF)

⚠️ **Para conferir o conteúdo de uma matéria, ler SEMPRE os arquivos Markdown — em primeiro lugar
o `EMENTA-CHALKIE-AI.md` da matéria. Nunca extrair dados de PDF.** Registrada em 2026-10-03 a
pedido do usuário. Vale para todas as matérias e para todo material (aulas, atividades,
avaliações, apostilas, planos, slides e conferências).

- ✅ **Fonte para conferir e para gerar:** o `EMENTA-CHALKIE-AI.md` da matéria (que segue a UC da
  `EMENTA-PRINCIPAL-<CURSO>.md`, também em Markdown — a ementa do curso vence) e o `materia.json`
  copiado dela.
- ✅ **Apoio (sempre abaixo da ementa, que vence):** os demais `.md` da matéria — `CONTEUDO/AULA-NN-*.md`,
  `DOCUMENTACAO/*.md`, `APOSTILA/CONTEUDO/*.md`, `ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.md` etc.
- ⛔ **Nunca extrair dados de PDF** (`AULA-NN-SLIDES.pdf`, `PLANO-ENSINO.pdf`, ementas ou apostilas
  em PDF): não abrir, não ler e não usar PDF como fonte de conteúdo nem de conferência.
- ✅ O PDF continua só como **material de apresentação** (links nas aulas e nos índices).
- ✅ Se alguma informação necessária só existir em PDF, **avisar o usuário** em vez de extrair.
- ✅ Converter um documento de origem em Markdown continua acontecendo **só quando o usuário pede**
  (ex.: criar ou refazer a `EMENTA-PRINCIPAL-<CURSO>.md`).

---

## 🏅 REGRA CRÍTICA — MATÉRIA MODELO: INTRODUÇÃO À TIC

⚠️ **Usar SEMPRE como exemplo padrão a matéria
`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/` — nela tudo está funcionando.**
Registrada em 2026-10-03 a pedido do usuário.

- ✅ Antes de criar ou completar qualquer peça de outra matéria, **abrir a peça equivalente da
  ITIC** e seguir a mesma estrutura de pastas, nomes de arquivo, campos, geradores e fluxo:

| Peça | Onde fica na ITIC (modelo) |
|---|---|
| Dados e ementa da matéria | `materia.json`, `EMENTA-CHALKIE-AI.md` |
| Aulas em Markdown | `CONTEUDO/` (regra "AULAS EXTRAÍDAS DA EMENTA EM `CONTEUDO/`") |
| Slides (só apresentação, nunca fonte) | `AULAS/` |
| Atividade objetiva de cada aula | `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-50-QUESTOES.md` → `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` |
| Atividade prática de cada aula | `ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-NN.md` (+ `-GABARITO.md`, fora do Git) → `ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.html` |
| Avaliações e média final | `ATIVIDADES/AVALIACAO-OBJETIVA-NN.html`, `AVALIACAO-PRATICA.html`, `AVALIACAO-MEDIA-FINAL.html` (+ `media-final.json`) |
| Menu e índice das atividades | `ATIVIDADES/MENU-ATIVIDADES.js`, `ATIVIDADES/index.html` |
| Controles | `AULAS/STATUS-AULAS.md`, `ATIVIDADES/STATUS-ATIVIDADES.md`, `APOSTILA/STATUS-APOSTILA.md` |
| Apostila | `APOSTILA/` (`CONTEUDO/INTRODUCAO.md`, `CONTEUDO/CAPITULO-NN.md`, Markdown completo e HTML) |
| Banco de questões do AVA | `ATIVIDADES/BANCO-AVA/` (fora do Git) |

- ✅ A ITIC é modelo de **estrutura e funcionamento**; o conteúdo de cada matéria vem da ementa
  **dela** (nunca copiar conteúdo da ITIC para outra UC).
- ✅ Se uma regra deste arquivo e a ITIC divergirem, **avisar o usuário**; a ITIC só é alterada a
  pedido dele (ela é a referência).

---

## 🚨 INICIALIZAÇÃO DE CADA CHAT E DE CADA TAREFA — LER O `STATUS.md` E O `STATUS-SESSOES.md`

⚠️ **DE SUMA IMPORTÂNCIA — SEM EXCEÇÃO.** Alterada em 2026-10-07 (antes mandava ler o `TASKS.md`).

**ANTES DE RESPONDER QUALQUER COISA**, você DEVE:

1. ✅ **LER `C:\fontes\aulasenai\STATUS.md`** — primeiro o **"Próximo passo"** e a tabela
   **"⏳ Aguardando o usuário"**
2. ✅ **LER `C:\fontes\aulasenai\SESSOES-CLAUDE\STATUS-SESSOES.md`** (2026-10-08, pedido do
   usuário) — **sempre antes de iniciar uma nova tarefa**, não só no início do chat: para cada
   sessão `PENDENTE`, ler o log dela (próximo passo, decisões e pendências) para não repetir nem
   contradizer o que outra licença/sessão já fez; sessão `CONCLUÍDO` passa antes pela limpeza da
   regra "REGISTRO DA SESSÃO EM `SESSOES-CLAUDE/`"
3. ✅ **Verificar** se há item `🔄 Em progresso` ou `⬜ Pendente` de tarefa aprovada e conferir o que
   já foi feito nos arquivos/commits
4. ✅ **Prosseguir de onde parou** (sem refazer itens `✅` nem pular itens)
5. ✅ **Só então responder** ao usuário (ou iniciar a tarefa)

**Por quê?** O `STATUS.md` é a fonte única do estado do trabalho (regra global "`STATUS.md` EM TODA
TAREFA"). Sem ler, você pode executar tarefas fora de ordem ou duplicadas.

- ℹ️ O `TASKS.md` guarda **só tarefas pendentes** (as concluídas e canceladas ficam em
  `TASKS_COMPLETE.md`, desde 2026-10-08; ao concluir ou cancelar, mover o bloco no mesmo commit).
  Consultar o `TASKS.md` quando o `STATUS.md` ou uma regra citar uma tarefa dele (ex.: vídeos
  `a conferir` das apostilas); o `TASKS_COMPLETE.md` só quando precisar do histórico.

---

## 🗒️ REGRA CRÍTICA — REGISTRO DA SESSÃO EM `SESSOES-CLAUDE/` (POR DATA E HORA, STATUS PENDENTE)

Registrada em 2026-10-08 a pedido do usuário. Vale para **toda sessão** (local ou nuvem), junto com
o `STATUS.md`.

**Por quê:** o usuário usa **2 licenças do Claude Code ao mesmo tempo** e, ao trocar de uma para a
outra, o contexto da conversa se perde. O log da sessão tem de **bastar sozinho** para a outra
licença (ou outra IA) continuar exatamente de onde parou, sem precisar da conversa anterior.

- ✅ **Grava-se o MÍNIMO NECESSÁRIO PARA CONTINUAR em outra sessão** (2026-10-08, pedido do
  usuário) — **não** é uma cópia completa da conversa. Só dados detalhados que permitam retomar:
  o que está pronto, decisões do usuário (e por quê), arquivos e caminhos envolvidos, commits,
  bloqueios, pendências e o **próximo passo exato**. Nada de transcrever perguntas, respostas,
  análises já concluídas ou textos que já estão nos arquivos (citar o caminho em vez de copiar).
- ✅ Arquivo próprio em `SESSOES-CLAUDE/SESSAO-AAAA-MM-DD-HHMM-ASSUNTO-CURTO.md` (data e hora do
  início da sessão; assunto em MAIÚSCULAS, sem acentos, com hífen).
- ✅ **Separado por data e hora:** uma seção curta `## AAAA-MM-DD HH:MM — <pedido> · <status>` por
  pedido do usuário que ainda importa para continuar, com o resultado, as decisões e os commits.
- ✅ **Cabeçalho do arquivo:** `**Status:** PENDENTE`, ambiente, modelo, branch, links para o plano
  (`docs/`), o `STATUS.md` (etapa) e o entregável.
- ✅ **Status = `PENDENTE`** enquanto houver qualquer item pendente ou sem aceite do usuário.
- ⛔ **`CONCLUÍDO` só existe quando a tarefa COMPLETA já foi finalizada** (2026-10-08, pedido do
  usuário). Antes de marcar, **validar SEMPRE tudo o que foi pedido**: listar no log a tabela
  **"✅ Validação dos pedidos"** (`Pedido do usuário | Feito? | Como foi conferido | Aceite`), com
  **todos** os pedidos da sessão, e conferir cada um nos arquivos, nos commits e no `STATUS.md`
  (não pela memória). Se faltar qualquer pedido, etapa do plano, commit ou aceite do usuário, o
  status continua **`PENDENTE`** — nunca marcar `CONCLUÍDO` por tarefa parcial. No fim do arquivo, a tabela **"⏳ Pendências"**
  (o que falta e quem faz) — é por ela que a próxima sessão (ou outra IA) retoma.
- ✅ **Índice:** acrescentar no topo de `SESSOES-CLAUDE/SESSAO-CLAUDE.md` uma seção curta da sessão
  (ambiente, modelo, commits, pedido, status e link para o arquivo da sessão).
- ✅ Atualizar o arquivo da sessão a cada pedido concluído e **antes de parar**; o commit dele entra
  no commit da tarefa (ou num commit próprio, se a sessão não mudou outros arquivos).
- ✅ **Pergunta ao final de cada tarefa (2026-10-08, pedido do usuário):** depois de
  `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?`, perguntar **"Deseja atualizar o log da sessão
  atual?"**. Se o usuário responder **SIM**:
  1. gravar em `SESSOES-CLAUDE/` o mínimo necessário para continuar (arquivo da sessão, com data
     e hora de cada pedido e **tudo o que falta fazer**, e a linha no índice `SESSAO-CLAUDE.md`),
     seguindo esta regra;
  2. definir o status: **`CONCLUÍDO`** só se a validação de **todos** os pedidos estiver completa
     (tabela "✅ Validação dos pedidos" toda conferida e "⏳ Pendências" vazia); senão **`PENDENTE`**;
  3. fazer o commit do log (regra "COMMIT POR TAREFA");
  4. **ao final, limpar o contexto com `/clear`**: o `/clear` é um comando do Claude Code que só o
     usuário digita (o Claude não consegue executá-lo) — então a última mensagem é
     `Log da sessão gravado. Digite /clear para limpar o contexto da sessão atual.`
  Se responder **NÃO**, não gravar e seguir normalmente.
- ✅ **Status das sessões (2026-10-08, pedido do usuário):** `SESSOES-CLAUDE/STATUS-SESSOES.md`
  tem uma linha por sessão (início, ambiente, assunto, arquivo, status, atualizada em, próximo
  passo). Atualizar a linha sempre que o log da sessão for gravado. **Ler este arquivo no início de
  cada sessão**, junto com o `STATUS.md`.
- ✅ **Sessão com status `CONCLUÍDO` → aproveitar e remover** (2026-10-08, pedido do usuário). Logo
  depois de marcar uma sessão como `CONCLUÍDO` (ou ao encontrar uma assim no início da sessão):
  1. **ler** o arquivo da sessão (o que foi feito, decisões e lições);
  2. **atualizar o `CLAUDE.md`** (ou o arquivo de `docs/regras/` do assunto) **se necessário**: só
     decisões e lições que valem para o futuro e ainda não estão nas regras — com nova versão e
     linha no histórico (regra do visualizador);
  3. conferir que nada pendente se perde (o que sobrar vai para o `STATUS.md` ou o `TASKS.md`);
  4. **remover os dados que não serão mais usados:** apagar o arquivo da sessão e a seção dela no
     índice `SESSAO-CLAUDE.md` (o Git guarda o histórico);
  5. no `STATUS-SESSOES.md`, trocar o status para `🗑️ REMOVIDA` com a data e o que foi aproveitado
     (ex.: "regra X no CLAUDE.md" ou "nada a aproveitar");
  6. fazer o commit (regra "COMMIT POR TAREFA").
- ⛔ A pasta é versionada e publicada: **nunca** gravar senhas, chaves, gabaritos, respostas certas
  nem dados pessoais de alunos.
- ✅ Exemplo: `SESSOES-CLAUDE/SESSAO-2026-10-07-2110-COMUNICACAO-RIO-DO-SUL.md`.

---

## 🚨 REGRA CRÍTICA — SEMPRE CONSULTAR `docs/` ANTES DE MODIFICAR

⚠️ **DE SUMA IMPORTÂNCIA — OBRIGATÓRIO EM CADA INTERAÇÃO**

**ANTES de modificar QUALQUER arquivo neste projeto**, você DEVE:

1. ✅ **Verificar se existe documentação** em `docs/ORIENTACAO_*.md`
2. ✅ **LER COMPLETAMENTE** a orientação correspondente
3. ✅ **APLICAR TODAS AS REGRAS** documentadas
4. ✅ **CONSULTAR `database.md`** se envolver schema/banco de dados
5. ✅ **Só então modificar** o arquivo

### 📁 Documentação Disponível

#### Em `docs/`
| Documento | Usa quando | Prioridade |
|-----------|-----------|-----------|
| **ORIENTACAO_JS_LOGIN.md** | Editar autenticação | 🔴 **CRÍTICA** |
| **ORIENTACAO_JS_SUPABASE.md** | Editar queries Supabase | 🔴 **CRÍTICA** |
| **ORIENTACAO_USUARIO.md** | Editar auth.users vinculação | 🔴 **CRÍTICA** |
| **ORIENTACAO_JS_AULAS.md** | Editar `js/aulas.js` | 🟠 Padrão |
| **ORIENTACAO_JS_CURSO.md** | Editar `js/curso.js` | 🟠 Padrão |
| **ORIENTACAO_JS_MATERIA.md** | Editar `js/materia.js` | 🟠 Padrão |
| **ORIENTACAO_JS_UNIDADE.md** | Editar `js/unidade.js` | 🟠 Padrão |
| **database.md** | Consultar schema | 🟡 Referência |
| **relatorio_verificacao_database.html** | Ver schema visualmente | 🟡 Referência |

#### Em `bugs/`
| Documento | Usa quando | Prioridade |
|-----------|-----------|-----------|
| **bug-*.md** | Corrigir um bug identificado | 🟣 Resolução |

### ✅ Checklist Antes de Qualquer Modificação

```
☐ Identifiquei o arquivo a modificar (ex: aulas.js)
☐ Procurei a documentação correspondente (ex: ORIENTACAO_JS_AULAS.md)
☐ A documentação existe? Sim → Leia COMPLETAMENTE
☐ Entendi todas as regras e restrições da documentação
☐ Estou pronto para modificar CORRETAMENTE
```

---

## 📖 Documentação de Orientação JavaScript

⚠️ **Orientações de cada arquivo JavaScript**

Para cada arquivo em `js/*.js`, existe uma **orientação correspondente** em `docs/`:

```
js/
├── curso.js              → docs/ORIENTACAO_JS_CURSO.md
├── aulas.js              → docs/ORIENTACAO_JS_AULAS.md
├── materia.js            → docs/ORIENTACAO_JS_MATERIA.md
├── login.js              → docs/ORIENTACAO_USUARIO.md ⚠️ LEIA ANTES!
├── supabase.js           → docs/ORIENTACAO_JS_SUPABASE.md
└── unidade.js            → docs/ORIENTACAO_JS_UNIDADE.md
```

**Regra:** Toda orientação referente a um arquivo `xxx.js` estará no arquivo `ORIENTACAO_JS_XXX.md` correspondente na pasta `docs/`.

✅ **Consulte a orientação antes de modificar qualquer arquivo JavaScript**

---

## 🔐 REGRA CRÍTICA — AUTENTICAÇÃO COM SUPABASE AUTH

⚠️ **ANTES de modificar `login.html`, `js/login.js`, `js/header-usuario.js` ou `js/supabase.js`, LEIA:**

📄 **Arquivo obrigatório:** `docs/ORIENTACAO_USUARIO.md`

**O que está documentado:**
- ✅ Fluxo de autenticação com Supabase Auth (não manual)
- ✅ Vínculo entre `auth.users` (Supabase) e tabela `usuario`
- ✅ Estrutura de dados (campos corretos/incorretos)
- ✅ Erros comuns e soluções
- ✅ RLS policies necessárias

**Checklist antes de editar autenticação:**
- [ ] Li `docs/ORIENTACAO_USUARIO.md` completamente
- [ ] Entendo o vínculo entre `auth.users` e `usuario`
- [ ] Não estou adicionando campos como `ativo`, `criado_em`, `senha_hash`
- [ ] Estou usando `supabase.auth.signInWithPassword()` ou `signUp()`
- [ ] Estou usando `data.user.id` ao vincular com tabela `usuario`

---

## 🔒 REGRA CRÍTICA — SEGURANÇA: RLS + JWT Token

⚠️ **TODA requisição ao Supabase DEVE:**
1. ✅ Usar JWT do usuário autenticado (NÃO chave de serviço)
2. ✅ Passar via header `Authorization: Bearer <token>`
3. ✅ A tabela correspondente DEVE ter RLS habilitado
4. ✅ RLS policies DEVEM validar `auth.uid()`

**Implementação obrigatória em `js/supabase.js`:**

```javascript
async function sbH() {
  const headers = {
    apikey: SUPABASE.KEY,
    "Content-Type": "application/json",
  };

  // 🔑 CRÍTICO: Usar JWT do usuário autenticado
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.access_token) {
    headers.Authorization = "Bearer " + session.data.session.access_token;
  } else {
    headers.Authorization = "Bearer " + SUPABASE.KEY; // fallback
  }

  return headers;
}
```

**Exemplo RLS Policy:**
```sql
ALTER TABLE "usuario" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_veem_seus_dados"
ON "usuario"
FOR SELECT
TO authenticated
USING (id = auth.uid());
```

**Checklist de Segurança:**
- [ ] `js/supabase.js` usa JWT token do usuário?
- [ ] TODAS as tabelas com dados sensíveis têm RLS?
- [ ] RLS policies validam `auth.uid()`?
- [ ] Um aluno/professor não pode acessar dados de outro?

📄 **Referência completa:** `docs/ORIENTACAO_USUARIO.md`

---

## 🔄 REGRA CRÍTICA — ATUALIZAR RELATORIO AO MEXER EM DATABASE.MD

⚠️ **Sempre que modificar `docs/database.md`, DEVE atualizar:**
- 📄 `docs/relatorio_verificacao_database.html` (arquivo visual)

**Ordem de atualização (OBRIGATÓRIA):**
1. ✅ Modificar `database.md` (fonte primária)
2. ✅ Atualizar `relatorio_verificacao_database.html` com as mudanças
3. ✅ Commitar ambos os arquivos juntos

**Por quê?** O HTML é um derivado de database.md. Sem sincronização, eles se desincronizam e a documentação fica inútil.

**Checklist ao mexer em database.md:**
- [ ] Editei `database.md` (mudanças nos campos/tabelas)
- [ ] Atualizei `relatorio_verificacao_database.html` (tabelas, campos refletem o banco)
- [ ] Ambos os arquivos foram commitados com mensagem descritiva

---

## 🚀 LEIA PRIMEIRO — Grafo de Conhecimento do Projeto

⚠️ **ANTES DE QUALQUER COISA, leia o relatório do grafo de conhecimento para entender a arquitetura completa:**

📄 **Arquivo:** `graphify-out/GRAPH_REPORT.md`  
📍 **Localização:** `C:\fontes\aulasenai\graphify-out\GRAPH_REPORT.md`  
🔄 **Atualização:** a cada sessão (`graphify update .`); a data e os números (nós, arestas,
comunidades) ficam no topo do próprio `GRAPH_REPORT.md` — não copiar para cá (ficam velhos).

Este relatório contém:
- ✅ Visão geral da estrutura do projeto (nós e arestas)
- ✅ Comunidades de código (clusters)
- ✅ Dependências entre arquivos
- ✅ Padrões de arquitetura
- ✅ Hot spots (arquivos críticos)
- ✅ Mapa completo de navegação

**Por quê?** O GRAPH_REPORT fornece uma análise automática de toda a codebase, enquanto este CLAUDE.md e `docs/regras/` trazem as regras do projeto. Juntos, oferecem visão 360° do projeto.

---

## ⚠️ ESTRUTURA DE PASTAS — IMPORTANTE

**Pasta `MATERIAIS/`:**
- 🚨 **NÃO é um CURSO** — é um repositório de recursos educacionais gerais
- Contém estrutura de múltiplos cursos (ex: `RIO_DO_SUL_MAIS_TECH/`)
- Cada subpasta em `MATERIAIS/` é um curso específico com suas matérias
- Documentação, ementas, apostilas e recursos são organizados **por curso**

**Regra de ouro:**
- ✅ **TODA pasta em `MATERIAIS/` = 1 CURSO COMPLETO, exceto as pastas da lista abaixo**
- ✅ Cada curso é independente e tem suas próprias matérias, ementas, apostilas

**Pastas que NÃO são curso (ignorar em análises, scripts e geradores):**
- ❌ `MATERIAIS/MATERIAS-GERAIS/` — repositório genérico
- ❌ `MATERIAIS/AGENDA_COLABORADOR/` — tem regras próprias (`MATERIAIS/AGENDA_COLABORADOR/CLAUDE.md`)
  e não segue as regras das demais pastas (o gerador de índices já a ignora)
- ✅ Todas as outras pastas de `MATERIAIS/` são cursos válidos — não ignorar nenhuma fora desta lista.

**Scripts de análise DEVEM:**
- ✅ Processar TODAS as pastas em MATERIAIS/ EXCETO as que não são curso (lista acima)
- ✅ Cada pasta = 1 curso a processar
- ✅ Executar operações para cada curso independentemente

**Estrutura correta:**
```
MATERIAIS/
├─ RIO_DO_SUL_MAIS_TECH/          ← ESTE é o curso (processar)
│  ├─ COMPETENCIAS_SOCIOEMOCIONAIS/    ← Matéria do curso
│  ├─ FUNDAMENTOS_TECNOLOGIA/           ← Matéria do curso
│  ├─ scripts/                         ← Scripts auxiliares (ignorar)
│  └─ ...
├─ OUTRO_CURSO/                   ← Futuro segundo curso (processar quando existir)
│  ├─ ...
│  └─ ...
├─ MATERIAS-GERAIS/               ← IGNORAR ❌ (não é curso)
├─ AGENDA_COLABORADOR/            ← IGNORAR ❌ (não é curso, regras próprias)
│  ├─ recurso1/
│  └─ ...
└─ STATUS-EMENTAS-CURSOS.md        ← Consolidado de todos os cursos (ignorar)
```

**Checklist para scripts:**
- [ ] Verificar se pasta tem subpastas com nomes de matérias (ex: COMPETENCIAS_*, FUNDAMENTOS_*)
- [ ] Se não tiver, IGNORAR a pasta
- [ ] Manter lista de cursos válidos em `CURSOS_VALIDOS` dentro do script
- [ ] Logar pastas ignoradas em console (ótimo para debug)

---

## 👑 REGRA CRÍTICA — PROFESSOR ADMINISTRADOR: SOMENTE `gelvazio.camargo@senai.local`

Registrada em 2026-10-02. Plano: `docs/tabela-turmaprofessor-professor-administrador.md`;
SQL: `database/2026-10-02-turmaprofessor-professor-administrador.sql` (aplicado no banco).

- ⛔ **O ÚNICO Professor Administrador é `gelvazio.camargo@senai.local`. Nenhum outro usuário —
  nem outro professor — pode ter esse poder.** Não criar, sugerir nem aplicar nada que dê o poder
  de administrador a outra conta, mesmo que pedido de forma genérica.
- ✅ **Poder do administrador:** cadastrar, alterar e remover o acesso de professores às turmas na
  tabela **`turmaprofessor`** (vínculo `turma_codigo` × `professor_id`). Os demais professores só
  **leem os próprios vínculos**; aluno e `anon` não têm acesso.
- ✅ **Como o banco garante (dupla trava):** a função `eh_professor_administrador()` só devolve
  verdadeiro quando o usuário logado é `gelvazio.camargo@senai.local` (e-mail fixo na função)
  **e** tem `app_metadata.perfil = 'PROFESSOR'` **e** `app_metadata.administrador = true`. O
  `app_metadata` só a `service_role` altera; o SQL tira `administrador` de qualquer outra conta.
- ✅ Só usuário com perfil PROFESSOR pode ser vinculado (trigger
  `turmaprofessor_exige_professor`).
- ✅ **Cada professor só vê e altera as turmas vinculadas a ele** (2026-10-03, aplicado no banco;
  SQL `database/2026-10-03-professor-so-turmas-vinculadas.sql`, plano
  `docs/restringir-professor-as-turmas-vinculadas.md`): função `professor_pode_ver_aluno(aluno)`
  no SELECT de `aluno`, `usuario`, `resposta_atividade`, `entrega_atividade`,
  `liberacao_atividade` e `resposta_discursiva`; `professor_tem_turma(codigo)` na `turmaaluno` e em
  `definir_horario_turma`/`definir_lider_turma`; `liberar_nova_tentativa`, `liberar_fora_horario` e
  `resumo_tentativas_atividade` recusam/filtram aluno de outra turma. O administrador vê tudo.
  Aluno (perfil ALUNO) ainda sem turma fica visível a todo professor, para poder ser vinculado.
  ⚠️ Professor sem vínculo em `turmaprofessor` não vê nenhum aluno: vincular em `turmas.html`.
  ❌ Nunca voltar a usar só `eh_professor()` para ler dados de alunos.
- ✅ **Tela do administrador (2026-10-02):** menu **TURMAS** no header (`js/header-usuario.js`),
  exibido só quando o RPC `eh_professor_administrador()` devolve verdadeiro, abre `turmas.html`
  (raiz): CRUD da `turmaprofessor` — vincular, editar (trocar turma/professor) e excluir (popup),
  com filtro por turma; professores = `usuario.perfil = 'PROFESSOR'`. Código:
  `assets/js/turmas-professor-repositorio.js` (dados) + `assets/js/turmas-professor-pagina.js`
  (tela) + `assets/css/turmas-professor.css`. Plano: `docs/menu-turmas-crud-turmaprofessor.md`.
- ✅ **Menus do header só do administrador (2026-10-07, pedido do usuário):** USUARIOS,
  RELATORIOS, ALUNOS, CORREÇÃO, TURMAS, PENDÊNCIAS e Regras aparecem **só** para o Professor
  Administrador (`MENU_ADMINISTRADOR_HEADER` em `js/header-usuario.js`, RPC
  `eh_professor_administrador()`); os demais professores não veem nenhum desses menus. Esconder
  é só visual: o acesso aos dados continua pelo RLS.
- ✅ **Menu Regras (2026-10-03):** botão **Regras** no header, só para o Professor Administrador
  (mesmo RPC `eh_professor_administrador()`), abre um modal com este `CLAUDE.md` + os arquivos de
  `docs/regras/` e o `docs/HISTORICO-REGRAS.md` renderizados (Markdown → HTML com marked +
  DOMPurify), índice das seções e filtro. Código: `assets/js/regras-modal.js` (carregado sob
  demanda) + `assets/css/regras-modal.css`.
  ⚠️ Esconder o botão é só visual: o `CLAUDE.md`, `docs/regras/` e o histórico são versionados e
  publicados; nunca colocar segredo neles.
- ❌ Nunca usar `user_metadata` nem e-mail digitado na página para decidir quem é administrador;
  nunca afrouxar as políticas da `turmaprofessor` (gravação só com `eh_professor_administrador()`)
  nem devolver TRUNCATE aos papéis da API.

## 🙈 REGRA CRÍTICA — O QUE NUNCA É PUBLICADO (GIT / VERCEL)

Registrada em 2026-09-28. O repositório vai para o GitHub e a Vercel publica **todo** o conteúdo
versionado (inclusive `database/`).

- ❌ **Gabarito:** nem em páginas de aluno, nem em arquivos versionados. O seed
  `database/*-seed-atividades.sql` fica no `.gitignore` (é gerado na máquina e rodado no SQL
  Editor). Cópias antigas de atividades com gabarito embutido não entram no commit.
- ❌ **Dados pessoais de alunos (LGPD):** `LISTA-PRESENCA.js` no `.gitignore`; listas `.docx`
  continuam fora (regra `*.docx`). A página `LISTA-PRESENCA.html` não contém dados (lê o `.js`
  local).
- ❌ `__pycache__/` e arquivos gerados pelo Python.
- ✅ **Publicados por exceção no `.gitignore`:** slides `*.pdf` e `*.pptx` das pastas
  `MATERIAIS/**/ATIVIDADES/` (os índices apontam para eles). `*.pdf`/`*.pptx` são binários no
  `.gitattributes`.
- ✅ Antes de cada commit, conferir `git diff --cached --name-only` contra esta lista.
- ✅ **Gabarito no Git, fora do site** (2026-10-06, pedido do usuário): o `.vercelignore` exclui da
  publicação na Vercel todo arquivo com "gabarito" no nome. Assim
  `GERADOR-AULAS/.../GABARITO_PROVA_OBJETIVA_UC1_TIC.html` fica versionado, mas os alunos não o
  acessam pelo site. ⚠️ Se o repositório do GitHub for público, o arquivo continua visível lá.
- ✅ **`*.md` e `*.py` são versionados** (liberados em 2026-09-30), **exceto**: `*gabarito*` (qualquer
  arquivo), `*QUESTOES.md` (as fontes das atividades têm a linha `**Gabarito:**` com a resposta
  certa) e `docs/atividade-raciocinio-logico.md`. Novo `.md` com resposta certa, senha, e-mail real
  de aluno ou chave secreta **não entra**: acrescentar o padrão ao `.gitignore` **antes** do
  commit. Conferir `git diff --cached --name-only` sempre.

## 🗄️ REGRA — BANCO REAL ANTES DE ALTERAR O SCHEMA

Registrada em 2026-09-28.

- ✅ Antes de escrever SQL, **conferir o banco real** (tabelas/colunas) — o `database.md` pode
  estar desatualizado. Ex.: `atividade` já existia (quiz antigo) e foi **ampliada**, não recriada.
- ✅ SQL sempre **idempotente** (`if not exists`, `drop policy if exists`) e **sem apagar dados**.
- ✅ Hierarquia do conteúdo: `curso ← materia.curso_id ← aulas.materia_id ← atividade.aula_id`.
  Matéria semelhante em outro curso é **outra linha** de `materia` (não reaproveitar a de outro curso).
- ✅ O SQL fica versionado em `database/` e o usuário pode rodá-lo no Supabase → SQL Editor.
  **Quando o usuário pedir "aplique o SQL pelo Supabase"**, aplicar pelo conector do Supabase
  (projeto `AULAS SENAI`, ref `hxlvonriearllcmfqeri`), sempre **depois de conferir o banco real** e,
  se a mudança apagar ou reorganizar dados, **copiar antes** para uma tabela de backup
  (ex.: `usuario_legado_20260930`, com RLS ligado e sem políticas). Depois de aplicar, **conferir o
  resultado** com consultas de leitura. Sem pedido do usuário, não alterar o banco.
- ✅ **Estrutura dos cursos só o professor escreve** (2026-09-30,
  `database/2026-09-30-estrutura-curso-so-professor-escreve.sql`): `aulas`, `materia`, `curso`,
  `cursomateria` e `unidade` aceitam insert/update/delete só de usuário logado com perfil PROFESSOR;
  o `anon` só lê. Os antigos `js/curso.js`, `materia.js`, `aulas.js` e `unidade.js` não são
  carregados por nenhuma página (órfãos).
- ✅ **Tabela nova ou alterada = RLS ligado** e políticas explícitas; nunca deixar `anon` com
  acesso de escrita. Dados sensíveis (`senha_hash`, gabarito) não ficam legíveis pela API pública.

## ⛔ REGRA — PUSH: NUNCA NO AMBIENTE LOCAL, SEMPRE NA NUVEM (BRANCH PRÓPRIA + NOVO PR)

Registrada em 2026-10-01 a pedido do usuário ("NUNCA FAZER PUSH"); **alterada em 2026-10-07**, a
pedido do usuário, para valer **conforme o ambiente**; **alterada em 2026-10-08**, a pedido do
usuário: na nuvem, **sempre um novo pull request**, para evitar sobrescrever algo na `main`.

### 💻 Ambiente local (máquina do usuário, ex.: `C:\fontes\aulasenai`)

⛔ **O Claude NUNCA faz `git push`.** O push é feito **somente pelo usuário, na máquina dele**.

- ✅ O Claude faz só o **commit local** de cada tarefa.
- ❌ Não executar `git push` em nenhuma situação, nem quando o usuário pedir "faça push" ou
  "commit e push": responder que o commit está pronto e que o push fica com ele.
- ❌ Sem `git pull`/merge com o remoto, push forçado, push de tags ou mudança de remotos.

### ☁️ Ambiente de nuvem (Claude Code na web / sessão remota, contêiner temporário)

✅ **O Claude SEMPRE faz o push numa branch própria e abre um NOVO pull request para a `main`.**
No contêiner da nuvem o commit se perde quando a sessão acaba, por isso o push é obrigatório; o
pull request garante que **nada na `main` é sobrescrito** sem o usuário revisar e fazer o merge.

✅ **Push sempre permitido e automático na nuvem** (2026-10-08 11:10, pedido do usuário): ao final
de **toda** tarefa que mudar arquivos, o Claude faz commit + push + PR **sem esperar pedido nem
confirmação** do usuário — não perguntar "posso fazer push?". Tarefa que não muda nenhum arquivo
(só consulta ou resposta) não gera commit nem push vazio.

- ✅ Ao concluir cada tarefa: commit (regra "COMMIT POR TAREFA"), **`git push -u origin <branch>`**
  (a branch de trabalho da sessão, nunca a `main`) e **abrir um novo pull request** da branch para
  a `main`, com título e descrição do que mudou.
- ⛔ **Nunca push direto na `main`** (`git push origin HEAD:main` está proibido) e o Claude
  **não faz o merge** do pull request: quem revisa e junta na `main` é o usuário.
- ✅ **Sempre um PR novo:** se o PR da branch já foi juntado (merged) ou fechado, a tarefa seguinte
  recomeça a branch a partir da `main` atualizada e abre **outro** PR — nunca reaproveitar PR
  juntado. Enquanto o PR da branch ainda estiver aberto, os commits novos da mesma sessão entram
  nele (o GitHub não aceita dois PRs abertos da mesma branch).
- ✅ Antes do push, `git fetch origin main`; se a `main` andou, trazer as mudanças dela para a
  branch (merge) e conferir de novo antes de enviar.
- ❌ **Nunca push forçado** (`--force`), nunca reescrever histórico já publicado, nunca push de tags
  nem mudança de remotos.
- ✅ Antes do push, conferir `git diff --cached --name-only` contra a regra "O QUE NUNCA É
  PUBLICADO" (a `main` é publicada pela Vercel depois do merge).

## 💾 REGRA — COMMIT POR TAREFA (SEMPRE)

Registrada em 2026-09-30; **substitui** a antiga regra "commit local após 20 chats". Vale junto com a
regra global de mesmo nome.

- ✅ **Um commit ao concluir cada tarefa** (cada pedido do usuário atendido), com mensagem
  descritiva e o `Co-Authored-By` do Claude. Tarefa nova = commit novo; nada de acumular tarefas nem
  de esperar um número de conversas.
- ✅ Commitar **depois** de concluir e conferir (não commitar tarefa incompleta ou quebrada) e
  **só os arquivos da tarefa** (`git add` dos caminhos; nunca `git add .` que arraste `__pycache__`,
  gabaritos, listas de alunos ou outros itens da regra "O QUE NUNCA É PUBLICADO").
- ✅ Antes do commit, conferir `git diff --cached --name-only` contra a regra "O QUE NUNCA É
  PUBLICADO".
- ✅ No ambiente **local** o commit fica só local (o push é do usuário); na **nuvem**, o Claude faz
  o push numa branch própria e abre um novo pull request para a `main` (ver "PUSH: NUNCA NO
  AMBIENTE LOCAL, SEMPRE NA NUVEM").
- ✅ Usuário pediu commit explícito → fazer na hora.
- ✅ Arquivos ignorados pelo Git (gabaritos, fontes de questões, listas de alunos) não entram no
  commit; não usar `-f` para forçá-los. Desde 2026-09-30 os `*.md` e `*.py` **são versionados**
  (inclusive este `CLAUDE.md`, os planos em `docs/` e os geradores em `assets/`).

---

## 📝 Outras Regras

✅ Tudo conforme `C:\Users\gelva\.claude\CLAUDE.md` (global)  
✅ **Fonte única de regras:** este `CLAUDE.md` + os arquivos de `docs/regras/` listados no "ÍNDICE DAS REGRAS DETALHADAS" (desde 2026-10-07). O `AGENTS.md` (Codex e outros agentes) contém apenas a instrução de ler e seguir este arquivo — o conteúdo que existia nele foi mesclado aqui em 2026-09-23. Novas regras são escritas **somente aqui ou em `docs/regras/`**.  
✅ Grafo: `graphify update .` após cada sessão  
✅ Documentação: `docs/<tarefa>.md` antes de implementar nas **tarefas grandes** (as pequenas dispensam o plano — ver "REGRAS DO USUÁRIO QUE VALEM SEMPRE"); `STATUS.md` em todas  

---

**Versão:** ver "Versão das regras" e o histórico no topo deste arquivo  
**Status:** ✅ Ativo

