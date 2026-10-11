# 📚 CLAUDE.md — Regras do projeto Aulas SENAI

**Versão das regras:** 2026-10-11 06:07:25

## 🕒 HISTÓRICO DE VERSÕES DAS REGRAS

Resumo — as 5 mudanças mais recentes. **Histórico completo:** [docs/HISTORICO-REGRAS.md](docs/HISTORICO-REGRAS.md).

| Versão (data e hora) | O que mudou |
|---|---|
| 2026-10-11 06:07:25 | **Ordem e dependências na fila `tasks`:** colunas `ordem` e `task_dependente` (ids das tasks de que ela depende); a `pegar_proxima_task` só pega uma task com **todas as dependentes concluídas** (prioridade → ordem → criação); tarefa grande vira **sub-tasks pequenas em cadeia** (`#NN.MM`), uma por vez; etapas do usuário (`👤`) ficam desligadas e o professor as conclui na `tasks.html` (✅ Concluir); a #25 foi dividida em 22 sub-tasks (TASK-0019 a TASK-0040) — [`docs/regras/tarefas-agendadas.md`](docs/regras/tarefas-agendadas.md) |
| 2026-10-11 06:01:03 | **Atividades só no banco, layout global e pasta da matéria só com conteúdo:** as questões da objetiva e da prática (enunciado, alternativas, gabarito, tópicos e padrão de resposta) ficam **só no banco**; objetiva e prática usam **um layout global** (nada de página criada do zero em cada aula); as pastas das matérias/aulas têm **só conteúdo (Markdown), nenhum HTML** — tudo vem do global; migração das matérias existentes na tarefa #25-b3e29764-940b-4a82 (plano e aprovação) — "🗃️ REGRA — ATIVIDADES SÓ NO BANCO, LAYOUT GLOBAL E PASTA SÓ COM CONTEÚDO" |
| 2026-10-11 05:57:00 | **Agendador único lendo a fila `tasks`:** as tarefas agendadas viram **1 rotina por hora** que pega no máximo 1 task da tabela `tasks` do Supabase (`pegar_proxima_task`), decide se executa (ou recusa com o motivo) e grava o resultado (`finalizar_task`); fila vazia = não faz nada; cadastro na página `tasks.html` (menu TASKS, só o administrador); **toda task existe na tabela e no GitHub** (`tasks/TASKS.md` ou `tasks/fila/TASK-NNNN.md`, script `scripts/tasks/sincronizar_tasks.py`); substitui as 6 rotinas paralelas e a escolha automática de aula (#24; #22 e #23 canceladas) — "⏰ TAREFAS AGENDADAS" e [`docs/regras/tarefas-agendadas.md`](docs/regras/tarefas-agendadas.md) |
| 2026-10-11 05:12:00 | **Tarefas agendadas:** regra nova [`docs/regras/tarefas-agendadas.md`](docs/regras/tarefas-agendadas.md) — as rotinas que geram aulas sozinhas seguem as regras do projeto (branch própria + PR, nunca push direto na `main`; aula escolhida pelo `STATUS-AULAS.md` na ordem do `tasks/ORDEM-MATERIAS.md`; trava em `tasks/RECADOS.md`; log em `agendamento_tarefa_logs`); o `TAREFA_AGENDADA.md` na raiz não é usado — "⏰ TAREFAS AGENDADAS" |
| 2026-10-10 16:40:55 | **Todos os arquivos de status existem sempre, em todas as matérias (inclusive IGNORAR):** `STATUS_MATERIA.md`, `AULAS/STATUS-AULAS.md`, `ATIVIDADES/STATUS-ATIVIDADES.md`, `APOSTILA/STATUS-APOSTILA.md` e `STATUS-EMENTAS.md`; o `gerar_status_materia.py` cria os que faltam antes de gerar — "🔢 REGRA — STATUS_MATERIA E ORDEM DAS MATÉRIAS" |

---

## 🔄 REGRA CRÍTICA — VISUALIZADOR DE REGRAS ATUALIZADO JUNTO COM O CLAUDE.md

⚠️ **Sempre que este `CLAUDE.md` for atualizado, o visualizador de regras (menu Regras do header)
também deve ser verificado e atualizado junto, para o usuário ver sempre as regras mais atuais.**
Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Cada versão tem data e hora:** a cada alteração deste arquivo, atualizar a linha
  `**Versão das regras:** AAAA-MM-DD HH:MM:SS` (topo; **com segundos** desde 2026-10-07,
  horário de Brasília) e acrescentar **no início** do
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
  se só o navegador confirmar, pedir ao usuário que teste. ✅ **Exceção (2026-10-07):** quando o
  usuário pedir um **arquivo** que só o navegador gera (ex.: o PDF da apostila completa), pode-se
  usar o Chromium **sem janela** (headless) para gerá-lo — nunca para validar telas.
- ✅ **Final de tarefa:** responder `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?` (sem tabela
  nem resumo; os avisos que outra regra manda dar — matérias semelhantes, tabela de permissões,
  pendências do usuário, commit/push — vêm **em poucas linhas antes** da frase). Não há mais a
  pergunta sobre o log da sessão: o registro da sessão em `SESSOES-CLAUDE/` foi **removido** em
  2026-10-09 15:03:21 (pedido do usuário); o estado fica só no `STATUS.md`.
- 🧭 **Arquivos de status são MUITO IMPORTANTES** (2026-10-08): `STATUS.md` é a fonte única do
  estado; ver a seção "MUITO IMPORTANTE — ARQUIVOS DE STATUS" logo abaixo.
- ⛔ **Nunca escrever testes automatizados** (regra permanente do global): nada de `*.test.js`,
  `*.spec.js`, `test_*.py` nem passo de teste em plano; a **única exceção** é corrigir um bug.
  Vale mesmo que haja suíte de testes no repositório ou que uma skill (TDD etc.) mande.
- ⛔ **Seeds concluídos antes de qualquer tarefa** (2026-10-09, pedido do usuário): antes de
  começar ou continuar qualquer tarefa, concluir todos os seeds de `database/SEEDS-APLICADOS.md`
  (ver a regra "🌱 REGRA — SEEDS DO BANCO").
- ✅ **Cada aula finalizada = status gravado + commit** (2026-10-09, pedido do usuário): sempre que
  terminar **uma aula** (gerar o material dela ou aplicar e conferir os seeds dela), **gravar o status
  na hora** em todos os arquivos envolvidos (`database/SEEDS-APLICADOS.md`, `STATUS-AULAS.md`,
  `STATUS-ATIVIDADES.md` da matéria e o item da etapa em `tasks/etapas/`) e **fazer o commit** (na
  nuvem, também o push) **antes de passar à próxima aula** — nunca acumular várias aulas.
- ✅ **Toda matéria tem status por aula** (2026-10-09, pedido do usuário): cada matéria tem o
  **`AULAS/STATUS-AULAS.md`** (regra global de matérias) com **uma linha por aula** e as colunas da aula em
  `CONTEUDO/`, slides, atividade objetiva, atividade prática e **Banco** (seeds aplicados e conferidos).
  Matéria nova já nasce com ele e a análise contínua (tarefa #19) aponta as que faltam.
- ✅ **Primeiro, só os status das aulas** (2026-10-09, pedido do usuário): **inicialmente, criar
  apenas o `AULAS/STATUS-AULAS.md` de todas as matérias**, com **todas as aulas** (1 aula a cada
  4 h da carga horária da ementa, arredondando para cima; tema da ementa ou "a definir") e todas as
  colunas em ⬜. Nesse primeiro passo **não** se gera conteúdo, atividade, página nem seed; o
  restante vem depois, **uma aula por vez**, atualizando o status de cada aula. O status de cada aula é
  atualizado na hora (regra "Cada aula finalizada = status gravado + commit").
- ⛔ **Na nuvem, todo commit é seguido de push** (2026-10-09, pedido do usuário): numa sessão de nuvem,
  **logo depois de cada `git commit`**, fazer o `git push -u origin <branch>` da sessão — sem
  esperar outro commit, o fim da tarefa ou a ordem do usuário (detalhe em "Pull Requests"). No
  ambiente local continua proibido o push.
- ✅ **`STATUS_MATERIA.md` e ordem das matérias** (2026-10-10, pedido do usuário): status de cada
  matéria gerado dos arquivos dela; ordem Banco de Dados 1, Testes de Front-End 2, ITIC 3… seguida
  sempre que se lê status de tarefas ou matérias; os 5 arquivos de status existem sempre em todas
  as matérias, inclusive em `IGNORAR` (regra "🔢 REGRA — STATUS_MATERIA E ORDEM DAS MATÉRIAS").
- ⛔ **Questões só no banco, layout global, pasta da matéria só com conteúdo** (2026-10-11, pedido do
  usuário): perguntas da objetiva e da prática **só no banco**; as duas usam **um layout global**;
  nas pastas das matérias e aulas, **só conteúdo** (Markdown), **nenhum HTML** (regra "🗃️ REGRA —
  ATIVIDADES SÓ NO BANCO, LAYOUT GLOBAL E PASTA SÓ COM CONTEÚDO").
- ✅ **Tarefas pequenas** (ajuste pontual, sem banco/segurança/estrutura nova) **não precisam** de
  plano em `docs/` nem de aprovação prévia; tarefas grandes continuam precisando.
- ✅ **Um commit por tarefa** (push conforme o ambiente: local = não; nuvem = sim, numa branch própria + novo PR para a `main`).
- ✅ **Aulas: uma por vez, completa** (2026-10-03): gerar e gravar uma aula (e todo o seu material)
  antes de passar à próxima, controlando em `<MATERIA>/AULAS/STATUS-AULAS.md` (ver a regra
  "GERAR E GRAVAR UMA AULA POR VEZ").
- ✅ **Exceção — Reforço de Linguagens** (2026-10-06): cada atividade tem 25 questões (20 objetivas + 5
  discursivas) e a matéria tem 10 aulas (uma por slide); ver a regra exclusiva da matéria.
- ✅ **Discursivas: aluno obrigado a digitar** (2026-10-08): campo `- **Bloquear colar:** sim` na
  fonte `.md` bloqueia colar/arrastar/copiar/recortar nas respostas. Hoje só na Prova Prática ADAG
  (id 82); **ligar nas outras discursivas depois**, quando o usuário pedir (ver
  `docs/regras/atividades.md`).
- ✅ **Quantidade mínima de questões e nota proporcional nas discursivas** (2026-10-08, pedido
  do usuário) — **também nas objetivas desde 2026-10-09** (entrega com o mínimo de questões
  respondidas e nota = acertos ÷ mínimo × 10, máximo 10; SQL
  `database/2026-10-09-minimo-questoes-objetivas.sql`, aplicado no banco em 2026-10-09):
  - cada avaliação discursiva tem um **mínimo de questões para entregar**; o padrão é o
    **total** de questões, e o professor pode mudar **por aluno** (botão "Quantidade Mínima de
    Questões" ao lado do nome no Progresso da turma);
  - "Finalizar e entregar" só aceita quando o aluno respondeu o mínimo (conferido na página e
    no banco);
  - **a nota vale sobre o mínimo:** cada questão vale **10 ÷ mínimo** (prova de 20 questões com
    mínimo 10 → cada uma vale 1,0; fez as 10 e acertou = **nota 10**);
  - ⛔ **a nota máxima é sempre 10**, mesmo que o aluno responda mais que o mínimo.
  - ✅ Implementado em 2026-10-08 (Etapa 97 do `STATUS.md`; plano
    `docs/quantidade-minima-questoes-discursiva.md`; detalhe em `docs/regras/atividades.md`).
- ✅ **Botão "Finalizar Atividade" do professor nas discursivas** (2026-10-08, pedido do
  usuário): depois de escolher um aluno em "Respostas dos alunos" e corrigir as alternativas
  (✅ Certa / 🟡 Meia certa / ❌ Errada), o professor clica em **"✅ Finalizar Atividade"**
  (embaixo da prova, só perfil PROFESSOR) e a **nota do aluno é lançada automaticamente** com
  base nas alternativas certas, meias certas e erradas: soma das notas confirmadas ÷ pontos da
  prova × 10 × (total de questões ÷ mínimo do aluno), **máximo 10** — a mesma conta da média
  final (`notas_media_final`). Só finaliza com o aluno tendo **entregado** e **todas as
  alternativas respondidas confirmadas**; questões em branco não contam. Código:
  `assets/js/finalizar-atividade-professor.js` + CSS. Detalhe em `docs/regras/atividades.md`.
- ✅ **Aluno vê a prova corrigida depois da liberação do gabarito** (2026-10-08, pedido do
  usuário): quando o aluno logado **já entregou** a avaliação discursiva e o professor **já
  liberou os gabaritos** da turma dele, a página carrega a prova do aluno com: as **respostas**
  dele (mesmo com "Ocultar respostas após entrega"), a **nota** (`notas_media_final`), o
  resultado de cada alternativa corrigida pelo professor (✅ Certa / 🟡 Meia certa / ❌ Errada;
  ⏳ se ainda não corrigida), a **observação da IA** do porquê (balão grande ao passar o mouse ou
  tocar) e o padrão de resposta. Antes da liberação nada disso aparece. Vale para todas as
  avaliações discursivas. Código: `assets/js/resultado-aluno-discursiva.js` + CSS. Detalhe em
  `docs/regras/atividades.md`.
- ⛔ **Nota confirmada pelo professor é definitiva** (2026-10-08, pedido do usuário): depois que o
  professor confirma a nota de uma alternativa (botões ✅ Certa / 🟡 Meia certa / ❌ Errada em
  "Respostas dos alunos" ou a tela CORREÇÃO), ela **não pode mais ser alterada nem apagada —
  nem pelo professor**. O banco garante (trigger `correcao_discursiva_validar` recusa mudar uma
  `nota_professor` já gravada); a tela pede confirmação antes e trava os botões. Nunca criar
  código, SQL ou atalho que permita alterar nota confirmada. Detalhe em
  `docs/regras/atividades.md`.
- ✅ **Nota parcial da IA em todas as avaliações discursivas** (2026-10-08): em "Respostas dos
  alunos", ao escolher o aluno, cada alternativa mostra o ícone ✅ Certa / 🟡 Meia certa / ❌ Errada
  ("IA nota/pontos") ou ⏳ sem correção, com o comentário da IA ao passar o mouse — só prévia; vale
  a nota do professor em CORREÇÃO. Já funciona em toda discursiva do gerador (lê a
  `correcao_discursiva`); toda avaliação discursiva nova ou alterada deve mantê-lo. Detalhe em
  `docs/regras/atividades.md`.
- ✅ **Progresso da turma GLOBAL em todas as atividades** (2026-10-08; global nas objetivas e
  discursivas desde 2026-10-09): no topo da atividade, só para o professor, **aberto junto com a
  página**, por aluno e por questão, atualizado a cada 5 s, com **📈 Gráficos**, **🧮 Cálculo
  Nota** e **🎯 Quantidade Mínima de Questões**. Um só módulo para todas as atividades com banco
  (ver a regra "PROGRESSO DA TURMA GLOBAL" abaixo e `docs/regras/atividades.md`).
- ✅ **1 atividade objetiva de 50 questões por aula** (2026-10-03), controlada em
  `<MATERIA>/ATIVIDADES/STATUS-ATIVIDADES.md` (ver a regra "1 ATIVIDADE OBJETIVA DE 50 QUESTÕES").
- ⛔ **Push depende do ambiente** (2026-10-07): **local** (máquina do usuário) = **nunca fazer
  push**, mesmo que ele peça — avisar que o commit está pronto para ele enviar; **nuvem** (Claude
  Code na web/remoto) = **sempre fazer push numa branch própria e abrir um NOVO pull request
  para a `main`**, que o próprio Claude junta (resolvendo os conflitos de merge; 2026-10-09 22:17), nunca push direto na `main` (2026-10-08; ver a regra "PUSH: NUNCA NO AMBIENTE
  LOCAL, SEMPRE NA NUVEM").
- ⛔ **Conteúdo só pelos Markdowns, nunca de PDF** (2026-10-03): para conferir ou gerar conteúdo,
  ler os `.md` da matéria — em primeiro lugar o `EMENTA-CHALKIE-AI.md` (ver a regra "CONTEÚDO SÓ
  PELOS MARKDOWNS").
- ✅ **Regra global de matérias** (2026-10-10, substitui a "matéria modelo ITIC"): toda matéria
  segue [`docs/regras/materias.md`](docs/regras/materias.md); consultar a regra, não a ITIC (ver
  "🧱 REGRA GLOBAL DE MATÉRIAS").
- ✅ **Aulas extraídas da ementa em `CONTEUDO/`** (2026-10-03): 1 aula a cada 4 h da ementa
  (arredondando para cima), arquivo `AULA-NN-DESCRICAO-CURTA.md`; atividades e, no final, a
  apostila são feitas a partir dessas aulas (ver a regra "AULAS EXTRAÍDAS DA EMENTA").

---

## 🧭 MUITO IMPORTANTE — ARQUIVOS DE STATUS (ONDE FICA O ESTADO DE CADA COISA)

⚠️ **Regra de altíssima prioridade** (2026-10-08, pedido do usuário). O usuário alterna entre
**2 licenças do Claude Code** e outras IAs; o trabalho só continua certo se o status estiver
**gravado nos arquivos**, nunca só na conversa. **O que não está no status não aconteceu.**

### Mapa dos arquivos de status

📁 **Desde 2026-10-09 o `STATUS.md` e o `TASKS.md` ficam na pasta `tasks/`**
(`C:\fontes\aulasenai\tasks\`); onde estas regras dizem só `STATUS.md`/`TASKS.md`, é o arquivo dessa
pasta. O `TASKS_COMPLETE.md` foi apagado em 2026-10-09: tarefa concluída sai do `TASKS.md`.

| Arquivo | Guarda | Quem manda |
|---|---|---|
| `tasks/STATUS.md` | **Índice do estado:** "🧭 Frentes de trabalho" (próximo passo de cada sessão), "📌 Tarefas do `TASKS.md`" (com "Em uso por"), "⏳ Aguardando o usuário", tabela "🗂️ Etapas", decisões, riscos, bloqueios, pendências e lições | 🥇 **Fonte única do estado** (junto com `tasks/etapas/`) — em conflito, **ele vence** |
| `tasks/etapas/ETAPA-NNN[-uuid8]-ASSUNTO.md` | **Uma etapa por arquivo** (itens, status, verificação) — desde 2026-10-09 | Faz parte da fonte única; listado na tabela "🗂️ Etapas" do `STATUS.md` |
| `<MATERIA>/STATUS_MATERIA.md` | Status de todos os arquivos da matéria e a situação dela (gerado por script) | Detalha a matéria; ordem em `tasks/ORDEM-MATERIAS.md` |
| `tasks/RECADOS.md` | Recados entre sessões e licenças (só se acrescentam linhas) | Aviso, não estado: o que virar trabalho vai para o `STATUS.md` |
| `tasks/TASKS.md` | Só a **descrição longa** das tarefas pendentes (concluída ou cancelada = bloco removido) | Aponta para o `STATUS.md` (sem status próprio) |
| `docs/<tarefa>.md` | Plano da tarefa grande com os passos e o status de cada passo | Detalha a etapa do `STATUS.md` |
| `<MATERIA>/AULAS/STATUS-AULAS.md`, `ATIVIDADES/STATUS-ATIVIDADES.md`, `APOSTILA/STATUS-APOSTILA.md` | Peça por peça da matéria (aula, atividade, capítulo) | Detalha a etapa do `STATUS.md` |
| `<MATERIA>/STATUS-EMENTAS.md`, `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | Situação das ementas e permissões `VERIFICAR`/`IGNORAR` | Gerados pelos scripts (regras em `docs/regras/ementas-e-cursos.md`) |

### Regras

1. ✅ **Ler antes de agir:** no início de cada chat **e antes de cada tarefa nova**, ler o
   `STATUS.md` (ver "INICIALIZAÇÃO DE CADA CHAT E DE CADA TAREFA").
2. ✅ **Atualizar na hora:** marcar `🔄` ao começar e `✅` (com data e hora reais do relógio) ao
   terminar **cada item**, em todos os arquivos de status envolvidos — nunca acumular para o fim.
3. ✅ **Legenda única:** `⬜ Pendente` · `🔄 Em progresso` · `👀 Aguardando validação` ·
   `✅ Concluído` · `⛔ Bloqueado/não se aplica` (com o motivo). Só **um** item `🔄` por vez.
4. ⛔ **Fonte única:** nenhum arquivo mantém status próprio divergente do `STATUS.md`; se divergir,
   corrigir o outro arquivo na mesma tarefa.
5. ⛔ **`✅`/`CONCLUÍDO` só com tudo validado:** conferir **cada** pedido do usuário nos arquivos,
   nos commits e no `STATUS.md` (não pela memória). Faltando item, commit ou aceite → continua
   pendente. Nunca marcar concluída uma tarefa parcial.
6. ✅ **"Próximo passo" sempre atual:** fica na linha **da sua frente** em "🧭 Frentes de trabalho"
   do `STATUS.md`; é a primeira coisa lida ao retomar e a última atualizada ao parar; deve dizer o
   item **exato** a fazer.
7. ✅ **Histórico nunca é apagado** (só se acrescentam etapas, cada uma num arquivo de
   `tasks/etapas/`); o que sai das listas de espera é marcado no item da etapa.
8. ✅ **Commit junto:** os arquivos de status alterados entram no commit da tarefa.

### 📋 Gestão de projetos — regras aplicadas ao `STATUS.md` (do global)

Registrada em 2026-10-03 a pedido do usuário. Todo `STATUS.md` segue estas regras e o modelo abaixo.

#### Regras

| # | Fase | Regra | Onde fica no `STATUS.md` |
|---|------|-------|--------------------------|
| 1 | Início | **Objetivo claro** — 1 frase: o que será entregue e por quê | Cabeçalho |
| 2 | Início | **Escopo fechado** — o que entra e o que **não** entra | Seção Escopo |
| 3 | Início | **Critério de pronto** — como saber que o item terminou e foi aceito | Seção Escopo |
| 4 | Início | **Partes interessadas** — quem decide, aprova e usa | Cabeçalho |
| 5 | Início | **Premissas e restrições** — prazo, tecnologia, regras | Seção Escopo |
| 6 | Planejamento | **Dividir em etapas e itens pequenos** (horas, não semanas) | Etapas |
| 7 | Planejamento | **Ordem e dependências** — itens na ordem de execução | Etapas |
| 8 | Planejamento | **Riscos com plano B** — e acompanhados até o fim | Seção Riscos |
| 9 | Planejamento | **Plano aprovado antes de executar** | Registro de decisões |
| 10 | Execução | **Status atualizado na hora** (⬜ 🔄 ✅ ⛔) | Etapas |
| 11 | Execução | **Um item por vez** — terminar antes de começar outro | Etapas (só 1 🔄) |
| 12 | Execução | **Bloqueio informado na hora** com motivo e o que destrava | Seção Bloqueios |
| 13 | Execução | **Mudança de escopo = nova aprovação** | Registro de decisões |
| 14 | Execução | **Entregas pequenas e verificadas** — cada item com verificação | Etapas |
| 15 | Comunicação | **Fonte única da verdade** — links para plano, regras e entregável | Cabeçalho |
| 16 | Comunicação | **Registro de decisões** — o quê, quando, quem, por quê | Seção Decisões |
| 17 | Comunicação | **Linguagem simples** — entendível por quem não é técnico | Todo o arquivo |
| 18 | Continuidade | **Não depende de memória** — qualquer pessoa/IA retoma pelo arquivo | Próximo passo |
| 19 | Continuidade | **Versionamento** — commit por item/tarefa concluída | Coluna/nota de commit |
| 20 | Continuidade | **Histórico nunca é apagado** — só se acrescentam etapas | Etapas |
| 21 | Encerramento | **Aceite formal** de quem pediu | Último item da etapa |
| 22 | Encerramento | **Pendências documentadas** — o que ficou para depois e por quê | Seção Pendências |
| 23 | Encerramento | **Lições aprendidas** — o que funcionou, o que não, o que vira regra | Seção Lições |

⭐ **Regra de ouro:** planejar → aprovar → executar 1 item por vez → registrar na hora → entregar.
**O que não está no `STATUS.md` não aconteceu.**

#### Modelo obrigatório do `STATUS.md`

```markdown
# STATUS — <Nome do projeto>

**Objetivo:** <1 frase: o que e por quê>
**Partes interessadas:** <quem decide / aprova / usa>
**Links:** [Regras](CLAUDE.md) · [Planos](docs/) · <entregável>
**Próximo passo:** <item exato a executar agora — atualizar sempre>

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado

## Escopo
- **Entra:** …
- **Não entra:** …
- **Critério de pronto:** …
- **Premissas e restrições:** …

## Etapa N — <nome> (aprovada em AAAA-MM-DD)
| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| N.1 | … | ⬜ Pendente | — | <como foi conferido> |
| N.x | Aceite do usuário | ⬜ Pendente | — | — |

## Riscos
| Risco | Chance | Impacto | Plano B | Situação |
|-------|--------|---------|---------|----------|

## Bloqueios
| Data | Item | Motivo | O que destrava | Resolvido em |
|------|------|--------|----------------|--------------|

## Registro de decisões
| Data | Decisão | Quem | Por quê |
|------|---------|------|---------|

## Pendências (ficou para depois)
| Item | Motivo | Quando retomar |
|------|--------|----------------|

## Lições aprendidas
| Data | O que aconteceu | Lição / nova regra |
|------|-----------------|--------------------|
```

- ✅ Seções sem conteúdo ficam com a tabela vazia (não apagar o cabeçalho).
- ✅ **"Próximo passo"** é a primeira coisa a ler ao retomar e a última a atualizar ao parar.
- ✅ Projetos com `STATUS.md` antigo: **migrar para o modelo** sem apagar o histórico já registrado.

---

## 🔢 REGRA — STATUS_MATERIA E ORDEM DAS MATÉRIAS

Registrada em 2026-10-10 16:37:58 a pedido do usuário.

- ✅ **Toda matéria tem o `STATUS_MATERIA.md`** na raiz da pasta dela, com o status de **todos os
  arquivos da pasta**: (1) peças gerais da regra global de matérias (ementa, `materia.json`, os 4 status,
  índice e menu das atividades, avaliações, média final e apostila); (2) uma linha por aula do
  `AULAS/STATUS-AULAS.md` (aula em `CONTEUDO/`, objetiva página e fonte, prática página, fonte e
  padrão de resposta, **Banco**); (3) a lista de todos os arquivos (✅ peça do padrão, 📎 outro
  arquivo, ⚠️ vazio).
- ✅ **A situação da matéria sai desses arquivos:** **✅ CONCLUÍDA** (todas as peças ✅), **🔄
  PENDENTE** (parte feita) ou **⬜ NÃO INICIADA** (nenhuma aula com conteúdo ou atividade).
- ✅ **Coluna Banco:** ✅ só quando os seeds da objetiva **e** da prática da aula estão
  **CONCLUÍDO** ou **SUBSTITUÍDO** no `database/SEEDS-APLICADOS.md` (o seed mais novo que cadastra
  a página vence; página sem seed = ⬜).
- ⛔ **Não editar à mão:** gerar com `python3 scripts/status-materias/gerar_status_materia.py` (na
  raiz; módulos `ordem_materias.py`, `pecas_materia.py` e `seeds_materia.py`). Rodar **no início de
  cada sessão** (junto com a análise contínua, tarefa #19) e **ao concluir qualquer tarefa que mexa
  numa matéria**; os arquivos gerados entram no commit da tarefa.
- ⛔ **Todos os arquivos de status existem SEMPRE, em TODAS as matérias** (2026-10-10, pedido do
  usuário) — **inclusive as que estão em `IGNORAR`** nas ementas: `STATUS_MATERIA.md`,
  `AULAS/STATUS-AULAS.md`, `ATIVIDADES/STATUS-ATIVIDADES.md`, `APOSTILA/STATUS-APOSTILA.md` e
  `STATUS-EMENTAS.md`. O `IGNORAR` só tira a matéria de pendências, ajustes e geração de conteúdo;
  **nunca** dispensa os status. O `gerar_status_materia.py` roda antes `criar_status_aulas.py` e
  `criar_status_faltantes.py` (só criam o que falta, nunca sobrescrevem); matéria nova já nasce
  com os 5 arquivos. Ao ler os status, conferir que os 5 existem em todas as matérias; faltando
  algum, rodar o gerador na hora.
- ✅ **Ordem oficial das matérias** em **`tasks/ORDEM-MATERIAS.md`** (gerado pelo mesmo script):
  **1 = Banco de Dados** (Técnico em Informática para Internet), **2 = Testes de Front-End**,
  **3 = Introdução à TIC** e as demais em seguida, curso por curso. A ordem gravada
  não muda; matéria nova entra no fim; mudar a ordem só a pedido do usuário.
- ✅ **Sempre seguir a ordem:** ao ler status de tarefas (`tasks/STATUS.md`, `TASKS.md`, etapas) ou
  de matérias (relatório da análise, `STATUS_MATERIA.md`, status das aulas e atividades), ao
  listar matérias para o usuário e ao escolher a próxima matéria a trabalhar, seguir a ordem do
  `tasks/ORDEM-MATERIAS.md`. O `tasks/ANALISE-MATERIAS-RELATORIO.json` já sai nessa ordem (campo
  `"ordem"`).

---

## 🤝 REGRA CRÍTICA — CONVERSA ENTRE SESSÕES E LICENÇAS (PELO REPOSITÓRIO)

Registrada em 2026-10-09 15:24:44 a pedido do usuário (tarefa #21-eeefc710-3e74-4928; plano
[docs/colaboracao-entre-sessoes.md](docs/colaboracao-entre-sessoes.md)). Sessões de **contas
diferentes** do Claude (e outras IAs) não conversam diretamente: só se falam pelo **Git**. Estas
regras evitam trabalho repetido, tarefa pega em dobro e conflito de merge.

- ✅ **Frente de trabalho = ambiente + branch** (ex.: `nuvem · claude/festive-maxwell-25jnhl`,
  `local · main`). É como cada sessão se identifica no `STATUS.md` e nos recados (nunca e-mail ou
  nome de conta: os arquivos são publicados).
- ✅ **1. Etapa nova com UUID:** toda etapa nova recebe o próximo número **+ o 1º bloco de um UUID
  v4** (ex.: **`Etapa 136-3f9a2c7e`**, itens `136.1`, `136.2`…), igual às tarefas do `TASKS.md`;
  assim duas frentes nunca criam a mesma "Etapa 136". As antigas (até a 135) não mudam.
- ✅ **2. Reserva da tarefa ("Em uso por"):** antes de começar uma tarefa, a frente preenche a coluna
  **"Em uso por"** do "📌 Tarefas" (`<frente> (desde AAAA-MM-DD HH:MM)`) e faz commit + push na
  hora; ao terminar ou parar, volta a `—`. ⛔ Tarefa reservada por outra frente **não é mexida** —
  se precisar, deixar recado e perguntar ao usuário.
- ✅ **3. Próximo passo por frente:** cada frente tem a **sua linha** em "🧭 Frentes de trabalho" e
  atualiza **só a dela** (ao começar e ao parar); nunca sobrescrever a linha de outra frente.
- ✅ **4. Recados em `tasks/RECADOS.md`:** aviso para outra frente (ex.: "não mexer em X", "mudei a
  regra Y") vai como linha nova em "Abertos" (data e hora, De, Para, recado, etapa). **Ler ao
  iniciar** e **a cada merge** (2026-10-09 22:21:17, pedido do usuário: sempre que trazer a `main` para a
  branch ou juntar um PR, ler os recados abertos das outras sessões/IAs para a sua frente ou para
  `todas` e cumprir o que couber antes de seguir); ao cumprir, mover para "Cumpridos". Só
  acrescentar, nunca apagar recado de outra frente.
- ✅ **5. Trazer a `main` no início e no fim:** ao iniciar a sessão e cada tarefa, `git fetch origin
  main` e merge na branch (no local, o usuário faz o pull); de novo **antes de cada push**. PR
  pequeno e juntado logo deixa a outra frente ver o trabalho mais cedo.
- ✅ **6. Arquivo gerado em conflito = regerar:** em conflito de merge em arquivo gerado por script
  (`tasks/ANALISE-MATERIAS-RELATORIO.json`, `MATERIAIS/STATUS-EMENTAS-CURSOS.md`, `STATUS-EMENTAS.md`,
  páginas HTML dos geradores, seeds), **não mesclar à mão**: aceitar um dos lados e **rodar o script
  de novo**.
- ✅ **7. Uma etapa por arquivo:** cada etapa fica em **`tasks/etapas/ETAPA-NNN[-uuid8]-ASSUNTO.md`**
  e ganha uma linha na tabela **"🗂️ Etapas"** do `STATUS.md` no mesmo commit; o `STATUS.md` guarda só
  o índice. Duas frentes em tarefas diferentes deixam de editar o mesmo arquivo. Se o merge trouxer
  mudança de etapa feita no `STATUS.md` antigo (antes de 2026-10-09 15:24), aplicá-la no arquivo da
  etapa.
- ⛔ Nada de senha, chave, gabarito nem dado de aluno no `STATUS.md`, nas etapas ou nos recados.

---

## 🔁 REGRA CRÍTICA — ANÁLISE CONTÍNUA DAS MATÉRIAS (TAREFA PERMANENTE #19-91cbac65-87ca-45a0)

Registrada em 2026-10-09 13:20:11 a pedido do usuário.

- ✅ **Rotina:** `C:\Python314\python.exe scripts/analise-materias.py` — percorre todos os cursos de
  `MATERIAIS/` (menos `MATERIAS-GERAIS` e `AGENDA_COLABORADOR`), confere cada matéria pela regra global
  de matérias (`docs/regras/materias.md`) e grava **o que falta e o que está OK** em
  **`tasks/ANALISE-MATERIAS-RELATORIO.json`**. Só lê as matérias; não altera nada nelas.
- ✅ **Rodar SEMPRE:** no início de cada sessão e ao concluir qualquer tarefa
  que mexa numa matéria; o JSON atualizado entra no commit da tarefa e a linha da tarefa #19 no
  `STATUS.md` recebe os números (cursos, matérias, completas, incompletas) e a data e hora da rodada.
- ⛔ **A tarefa #19 NUNCA fica com status CONCLUÍDO** (nem ✅ no `STATUS.md`, nem removida do
  `TASKS.md`) **enquanto o `ANALISE-MATERIAS-RELATORIO.json` tiver qualquer matéria com
  `"completa": false` ou qualquer pendência.** Só quando o relatório mostrar `incompletas = 0` e
  nenhuma pendência, **e** o usuário der o aceite, ela pode ser concluída.
- ✅ As pendências do relatório são resolvidas **só quando o usuário pedir**, uma matéria por vez
  (cada uma vira etapa própria no `STATUS.md`), respeitando `IGNORAR`/`VERIFICAR` das ementas.
- ⛔ Não mudar o padrão conferido pela rotina sem pedido do usuário; se a regra global de matérias
  mudar, atualizar a rotina na mesma tarefa.

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
| [docs/regras/materias.md](docs/regras/materias.md) | criar, completar ou conferir **qualquer** matéria (substitui a consulta à ITIC) | estrutura da pasta; ementa e `materia.json`; aulas em `CONTEUDO/`; objetiva de 50; prática 10 × 3; avaliações e média final; índice e menu; apostila; 5 status; banco e seeds; ordem de construção; critério de pronto; exceções |
| [docs/regras/ementas-e-cursos.md](docs/regras/ementas-e-cursos.md) | criar ou alterar ementas, pastas de curso/matéria, aulas em `CONTEUDO/`, STATUS-EMENTAS e dashboards | aulas extraídas da ementa; `EMENTA-CHALKIE-AI.md`; STATUS-EMENTAS; STATUS-PERMISSAO-EMENTA/MATERIA; `EMENTA-PRINCIPAL-<CURSO>.md`; pasta = UC; matérias semelhantes; `dashboard.html` |
| [docs/regras/atividades.md](docs/regras/atividades.md) | mexer em atividades, avaliações, discursivas, respostas no banco, gabarito, exportação PDF, índices de atividades, Excel ou Reforço de Linguagens | alternativas no banco (tentativas, horário, log, discursivas, correção); turma na exportação; gabarito; índices e bloqueio por turma; Excel; uma aula por vez; 50 questões; Reforço de Linguagens |
| [docs/regras/apostilas.md](docs/regras/apostilas.md) | gerar ou alterar apostilas (capítulos, Markdown completo, HTML, `materia.json`) | identificação; conferência 100% com a ementa; gerador; Markdown completo; `materia.json`; formato e ordem; páginas A4 |
| [docs/regras/usuarios-turmas-paginas-professor.md](docs/regras/usuarios-turmas-paginas-professor.md) | mexer em contas/senhas, turmas, alunos, equipes, aulas (excluir/editar card), pendências ou índice de cursos | contas e senhas; excluir aula e card = 1 aula; pendências; índice de cursos; `turmaaluno`; equipes; página por turma; e-mail do aluno |
| [docs/regras/assets-e-geradores.md](docs/regras/assets-e-geradores.md) | criar ou alterar CSS, JS, menus, header ou geradores (`assets/`), e avisos ao usuário | CSS e JS genéricos em `assets/`; menu; header; geradores; popup no lugar de `alert()` |
| [docs/regras/paginas-legadas.md](docs/regras/paginas-legadas.md) | mexer nas páginas antigas (`dashboard.html`, `uc.html`, `questionarios.html`, `validacao.html`) ou na apostila de Reforço de Matemática | descrição das páginas antigas; fluxo de navegação; exercícios da apostila de Reforço de Matemática |
| [docs/regras/codigo.md](docs/regras/codigo.md) | criar ou alterar qualquer código (JS, Python, HTML, CSS) | princípios SOLID; até 1000 linhas por arquivo e 45 por função; JSDoc/docstring; return early; constantes; nomes em português sem acento; até 3 parâmetros; até 2 níveis; Prettier/ESLint e Black/Ruff |
| [docs/regras/infograficos.md](docs/regras/infograficos.md) | criar infográficos | cabeçalho, no mínimo 6 seções numeradas e coloridas, fundo escuro, exemplos, regra de ouro no rodapé, cores por tema |
| [docs/regras/tarefas-agendadas.md](docs/regras/tarefas-agendadas.md) | criar, alterar ou executar a **tarefa agendada** ou mexer na fila `tasks` / `tasks.html` | 1 rotina por hora; tabela `tasks` e funções; toda task na tabela e no GitHub (`sincronizar_tasks.py`); passo a passo de cada execução; log em `agendamento_tarefa_logs`; outras contas e IAs |

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

## 🧱 REGRA GLOBAL DE MATÉRIAS — [docs/regras/materias.md](docs/regras/materias.md) (SUBSTITUI A "MATÉRIA MODELO")

Registrada em 2026-10-10 22:19:46 a pedido do usuário ("pegue tudo como a matéria ITIC é feita e torne 1 regra
global de matérias; em vez de consultar o modelo ITIC, consulta a regra global"). Antes (desde
2026-10-03) a regra mandava abrir a ITIC como matéria modelo.

- ✅ **Para criar, completar ou conferir qualquer matéria, consultar a regra global
  [`docs/regras/materias.md`](docs/regras/materias.md)** — não abrir mais a ITIC como modelo. Ela
  traz, numa regra só: estrutura de pastas e nomes de arquivo, ementa e `materia.json`, aulas em
  `CONTEUDO/` (partes da aula), objetiva de 50 questões, prática 10 × 3 (padrão id 82), avaliações e
  média final, índice e menu das atividades, apostila, os 5 arquivos de status, banco e seeds, a
  ordem de construção, o critério de pronto e as exceções.
- ✅ A ITIC (`MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/`) continua como **exemplo
  real** da regra; se ela (ou outra matéria pronta) divergir da regra global, **vale a regra**:
  avisar o usuário e só alterar a matéria pronta a pedido dele.
- ✅ O conteúdo de cada matéria vem da ementa **dela** (nunca copiar conteúdo de outra UC).
- ✅ Mudou o jeito de fazer uma peça de matéria → atualizar `docs/regras/materias.md` **na mesma
  tarefa** (e a rotina `scripts/analise-materias.py` e os scripts de `scripts/status-materias/`,
  que conferem as matérias por esta regra).

---

## 🗃️ REGRA — ATIVIDADES SÓ NO BANCO, LAYOUT GLOBAL E PASTA SÓ COM CONTEÚDO

Registrada em 2026-10-11 06:01:03 a pedido do usuário: "As perguntas das atividades prática e objetiva devem
ficar apenas no banco de dados"; "Atividade prática e objetiva deve usar layout global e não ficar
criando do zero em cada aula"; "Nas pastas de aulas deve ter apenas conteúdos, e nada de HTML, deve
vir tudo do global". Migração das matérias existentes: tarefa **#25-b3e29764-940b-4a82** (Etapa
143-d30a9c4d; plano em `docs/` e aprovação antes de executar).

- ⛔ **Questões só no banco:** as perguntas da **atividade objetiva** (enunciado, alternativas e
  gabarito) e da **atividade prática** (questões, tópicos, pontos e padrão de resposta) ficam
  **apenas no banco de dados** (Supabase). Nenhuma página HTML nem arquivo da pasta da matéria
  guarda o texto das questões; a página busca as questões no banco ao abrir (o gabarito e o padrão
  de resposta continuam nunca chegando ao aluno antes da liberação — regras de `atividades.md`).
- ⛔ **Layout global:** objetiva e prática usam **uma página/layout global** (um para a objetiva,
  um para a prática, com os recursos de sempre: login, gravação no banco, Progresso da turma,
  Gráficos, Cálculo Nota, mínimo de questões, correção, gabarito por turma, PDF), que recebe qual
  atividade abrir (id do banco). ⛔ **Nunca criar página de atividade do zero em cada aula.**
- ⛔ **Pasta da matéria/aula só com conteúdo:** em `MATERIAIS/<CURSO>/<MATERIA>/` ficam **só
  conteúdos** (Markdown: ementa, aulas em `CONTEUDO/`, documentação, `materia.json` e os arquivos de
  status) — **nenhum HTML**. Índice de atividades, páginas de atividade, avaliação, média final e
  apostila em HTML vêm **do global** (páginas e geradores na raiz e em `assets/`), lendo o conteúdo
  da matéria e o banco.
- ✅ **Transição:** até a tarefa #25-b3e29764-940b-4a82 ser aprovada e executada, as páginas e geradores atuais
  continuam funcionando; ⛔ **não gerar página de atividade nova por aula nem questão nova em
  arquivo** sem antes passar pelo plano dessa tarefa (perguntar ao usuário se for preciso). A
  migração é feita **uma matéria por vez**, na ordem do `tasks/ORDEM-MATERIAS.md`, conferindo pelo
  md5 que as questões no banco são as mesmas das páginas antigas antes de apagar qualquer HTML.
- ✅ Quando a migração mudar o jeito de fazer uma peça, atualizar na mesma tarefa
  `docs/regras/materias.md`, `docs/regras/atividades.md`, `docs/REGRAS-ATIVIDADE-PRATICA.md`, a
  rotina `scripts/analise-materias.py` e os scripts de `scripts/status-materias/`.

---

## ⏰ TAREFAS AGENDADAS — [docs/regras/tarefas-agendadas.md](docs/regras/tarefas-agendadas.md)

Registrada em 2026-10-11 05:12:00 a pedido do usuário; **reescrita em 2026-10-11 05:57:00** (tarefa
#24-9fb25086-5b51-44cb): "1 agendador que apenas controle 1 tabela de nome tasks, que a IA vai ler
e decidir se executa algo ou não" e "toda task deve existir na tabela e no GitHub".

- ✅ **Uma rotina só, de hora em hora**, que pega **no máximo 1 task** da tabela **`tasks`** do
  Supabase (`pegar_proxima_task`), **decide** se executa (dentro destas regras) ou recusa com o
  motivo, e grava o resultado (`finalizar_task`). **Fila vazia = não faz nada** (só o log).
- ✅ O professor controla a fila na página **`tasks.html`** (menu **TASKS**, só o Professor
  Administrador): cadastrar, editar, ON/OFF, "executar após", cancelar, reabrir, excluir (lógico).
- ⛔ **Toda task existe na tabela e no GitHub:** tarefa do `tasks/TASKS.md` tem a linha dela na
  tabela (entra desligada) e linha criada na página tem o `tasks/fila/TASK-NNNN.md`; sincronizar
  com `scripts/tasks/sincronizar_tasks.py` em toda execução da rotina e ao criar, concluir ou
  cancelar tarefa do `TASKS.md` (no mesmo commit). Texto da tarefa: vale o GitHub; status e
  ON/OFF: vale a tabela; estado do projeto: continua no `tasks/STATUS.md`.
- ✅ **Ordem e dependências** (2026-10-11 06:07:25): `tasks.ordem` e `tasks.task_dependente` (ids); só começa a
  task com todas as dependentes concluídas. Tarefa grande = sub-tasks pequenas em cadeia
  (`#NN.MM`), uma por vez; etapa do usuário (`👤`) fica desligada e ele conclui na página.
- ⛔ **Nunca push direto na `main`**: branch da sessão + PR juntado pela própria execução.
- ✅ Regras das rotinas só em `docs/regras/` (o `TAREFA_AGENDADA.md` na raiz não é usado); o prompt
  da rotina só aponta para elas. Log de cada execução em `agendamento_tarefa_logs`.

---

## 🚨 INICIALIZAÇÃO DE CADA CHAT E DE CADA TAREFA — LER O `STATUS.md`

⚠️ **DE SUMA IMPORTÂNCIA — SEM EXCEÇÃO.** Alterada em 2026-10-07 (antes mandava ler o `TASKS.md`).

**ANTES DE RESPONDER QUALQUER COISA**, você DEVE:

0. ✅ **Trazer a `main`** (`git fetch origin main` + merge na branch; no local, o usuário faz o pull)
   — regra "CONVERSA ENTRE SESSÕES E LICENÇAS"
1. ✅ **LER `C:\fontes\aulasenai\tasks\STATUS.md`** — primeiro a linha da sua frente em
   **"🧭 Frentes de trabalho"**, a coluna **"Em uso por"** do "📌 Tarefas" e a tabela
   **"⏳ Aguardando o usuário"**; depois o arquivo da etapa em `tasks/etapas/` — e o
   **`tasks/RECADOS.md`** (recados abertos para a sua frente ou para `todas`)
2. ✅ **Verificar** se há item `🔄 Em progresso` ou `⬜ Pendente` de tarefa aprovada e conferir o que
   já foi feito nos arquivos/commits
   - ☁️ **Na nuvem:** ler também `.claude/regras-globais/CLAUDE-GLOBAL.md` e
     `CLAUDE-DOCS-BEFORE-EVERY-TASK.md` (regras globais; ver "REGRAS E SKILLS GLOBAIS NO PROJETO")
2.5. 🌱 **Concluir todos os seeds** (2026-10-09, pedido do usuário): ler o
   `database/SEEDS-APLICADOS.md` e, antes de começar ou continuar qualquer tarefa, deixar todos os
   seeds em **CONCLUÍDO** (regra "🌱 REGRA — SEEDS DO BANCO")
3. ✅ **Prosseguir de onde parou** (sem refazer itens `✅` nem pular itens)
4. ✅ **Só então responder** ao usuário (ou iniciar a tarefa)

**Por quê?** O `STATUS.md` é a fonte única do estado do trabalho (regra global "`STATUS.md` EM TODA
TAREFA"). Sem ler, você pode executar tarefas fora de ordem ou duplicadas.

- ℹ️ O `TASKS.md` guarda **só tarefas pendentes**. **Ao concluir ou cancelar uma tarefa, o bloco
  dela é REMOVIDO do `TASKS.md`** no mesmo commit (2026-10-09, pedido do usuário; o antigo
  `TASKS_COMPLETE.md` foi apagado). O registro do que foi feito fica no `STATUS.md` (linha ✅ em
  "📌 Tarefas do `TASKS.md`" e itens da etapa) e no Git. Consultar o `TASKS.md` quando o
  `STATUS.md` ou uma regra citar uma tarefa dele (ex.: vídeos `a conferir` das apostilas).
- ✅ **Registro de todo pedido com data e hora em segundos** (2026-10-07, vindo da `main`):
  `AAAA-MM-DD HH:MM:SS`, horário de Brasília (na máquina: `Get-Date -Format "yyyy-MM-dd HH:mm:ss"`;
  na nuvem: `TZ=America/Sao_Paulo date "+%Y-%m-%d %H:%M:%S"`). Todo pedido que gere trabalho é
  registrado no `STATUS.md` (fonte única); tarefa grande também ganha a descrição no `TASKS.md`
  e, ao concluir, o bloco é **removido** do `TASKS.md` no mesmo commit da tarefa (conclusão,
  commit e plano ficam registrados no `STATUS.md`). Perguntas sem trabalho não entram. Caminho
  (2026-10-09): **`C:\fontes\aulasenai\tasks\TASKS.md`** (na nuvem, `tasks/TASKS.md` da raiz do
  repositório); o `STATUS.md` fica na mesma pasta `tasks/`.
- ✅ **Id de tarefa nova = número + UUID** (2026-10-09 12:36:43, pedido do usuário, para duas
  licenças/branches não criarem a mesma "#17"): toda tarefa nova do `TASKS.md` recebe o próximo
  número **seguido de um UUID gerado na hora**, ex.: **`#19-3f9a2c7e-8b1d-4e2a`** (número + os 3
  primeiros blocos de um UUID v4; na máquina `[guid]::NewGuid()`, na nuvem
  `python -c "import uuid; print(uuid.uuid4())"`). O id completo é usado igual no título do
  `TASKS.md`, na linha "📌 Tarefas do `TASKS.md`" do `STATUS.md`, nos planos e nos logs. As
  tarefas antigas (até a #18) mantêm o número sozinho.
- ⛔ **FONTE ÚNICA DO ESTADO = `STATUS.md`** (2026-10-08, decisão do usuário). Os outros arquivos
  **apontam** para ele, nunca mantêm status próprio divergente:
  - **`TASKS.md`:** guarda só a **descrição longa** das tarefas pendentes; o **status** de cada uma
    fica numa linha da seção **"📌 Tarefas do `TASKS.md`"** do `STATUS.md` (tarefa nova no
    `TASKS.md` = linha nova lá, no mesmo commit; tarefa concluída = linha marcada ✅ e bloco
    removido do `TASKS.md`).
  - **Em conflito, o `STATUS.md` vence:** corrigir o outro arquivo na mesma tarefa.

---

## 🧩 REGRA — REGRAS E SKILLS GLOBAIS NO PROJETO (`.claude/`)

Registrada em 2026-10-08 a pedido do usuário (ele usa 2 licenças do Claude Code e outras máquinas).

- ✅ **Skills:** as skills do usuário (`EXERCICIOS`, `documentacao-padrao`, `graphify`,
  `padrao-slides-senai`) ficam também em **`.claude/skills/`** do projeto — copiadas de
  `C:\Users\gelva\.agents\skills\` (versão mais nova). A pasta `synced/` (skills do claude.ai,
  geridas pelo app) **não** é copiada.
- ✅ **Regras globais:** cópia de **referência** em **`.claude/regras-globais/`**
  (`CLAUDE-GLOBAL.md` = `~/.claude/CLAUDE.md` e `CLAUDE-DOCS-BEFORE-EVERY-TASK.md`). Essa cópia
  **não é carregada** pelo Claude (evita regras em dobro em toda mensagem); serve de backup
  versionado para outra licença/máquina conferir ou restaurar.
- ✅ **Sessão na NUVEM (2026-10-08, pedido do usuário):** no Claude Code na web/remoto o
  `C:\Users\gelva\.claude\CLAUDE.md` da máquina do usuário **não existe**. Por isso, no início de
  toda sessão em nuvem (junto com o `STATUS.md`), **ler e aplicar** as
  regras globais da cópia do projeto: `.claude/regras-globais/CLAUDE-GLOBAL.md` e
  `.claude/regras-globais/CLAUDE-DOCS-BEFORE-EVERY-TASK.md`, como se fossem o `CLAUDE.md` global.
  A ordem de precedência continua: **`CLAUDE.md` do projeto** (e `docs/regras/`) vence o global.
  As skills do usuário também estão em `.claude/skills/`.
- ✅ **Sincronizar sempre:** ao alterar uma regra global ou uma skill do usuário, atualizar a cópia
  do projeto **na mesma tarefa** (e também `~/.claude/skills/` e `~/.agents/skills/`, que devem
  ficar iguais) e incluir no commit.
- ⛔ Nada de segredo, senha ou dado de aluno nesses arquivos (a pasta é versionada e publicada).

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

## 🕸️ GRAFO (graphify) — SÓ QUANDO O USUÁRIO PEDIR

Alterada em 2026-10-09 18:06:19 a pedido do usuário.

- ⛔ **Não rodar `graphify update .` automaticamente** (nem no início da conversa, nem depois de
  sessões ou commits) e **não ler o `graphify-out/GRAPH_REPORT.md` antes de responder**.
- ✅ O graphify só roda quando o usuário pedir (ex.: `/graphify`); a skill continua em
  `.claude/skills/graphify/`.

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
  RELATORIOS, ALUNOS, CORREÇÃO, TURMAS, CURSO, PENDÊNCIAS e Regras aparecem **só** para o Professor
  Administrador (`MENU_ADMINISTRADOR_HEADER` em `js/header-usuario.js`, RPC
  `eh_professor_administrador()`); os demais professores não veem nenhum desses menus. Esconder
  é só visual: o acesso aos dados continua pelo RLS.
- ✅ **Menu CURSO (2026-10-09, pedido do usuário):** abre `cursos.html` (raiz) — CRUD da tabela
  `curso` (incluir, editar, desativar/ativar; **nunca apagar**: `aulas` e `cursomateria` caem em
  cascata; curso desativado não aparece no índice de alunos e professores — `cursos_do_usuario`) e ação **🏫 Turmas** com modal para vincular/desvincular turmas ao curso pela função
  `definir_curso_turma` (só o administrador grava `turma.curso_id`; sem ele os alunos da turma não
  veem o curso). Código: `assets/js/cursos-repositorio.js` + `cursos-modais.js` + `cursos-pagina.js`
  + `assets/css/cursos.css`. Plano: `docs/menu-curso-crud-cursos-turmas.md`.
- ✅ **Unidade só na tabela `unidade` (2026-10-09, pedido do usuário):** a unidade (nome e
  endereço) de cursos e turmas vem **sempre** da tabela `unidade` (`curso.unidade_id`,
  `turma.unidade_id`; unidade em uso não se apaga). Cadastro no modal **🏢 Unidades** de
  `cursos.html` (`assets/js/unidades-modal.js`). As colunas antigas `curso.unidade` e
  `turma.local` foram **apagadas** (2026-10-09): consulta de turma pede `unidade:unidade_id(nome)`
  e mostra com `montarUnidadeTurma` (`assets/js/unidade.js`); turma nova da página de criar
  usuários precisa do campo `unidadeId` na lista de presença.
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

📄 **O `.gitignore` atual é a referência** (definido pelo usuário em 2026-10-09 17:25:12). Ele
ignora **só** `__pycache__/`, `graphify-output/cache/`, `graphify-out/`, `variaveis.js` (chave
`service_role`) e `.env`. **Todo o resto é versionado** (vai para o GitHub, que é privado).

O que **não pode ir ao site** fica no **`.vercelignore`**:

| Padrão no `.vercelignore` | Por quê |
|---|---|
| `*[Gg][Aa][Bb][Aa][Rr][Ii][Tt][Oo]*`, `RESOLUCAO/`, `*QUESTOES.md`, `PROVA-OBJETIVA-*.md`, `database/*-seed-atividades.sql`, `docs/atividade-raciocinio-logico.md` | Respostas certas (só o professor) |
| `*.pdf`, `*.png`, `*.docx`, `*.pptx`, `*.xlsx`, `*.jpg`, `*.jpeg` | Binários; exceção: `!MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/AULAS/*.pdf` (slides publicados) |
| `LISTAPRESENCA*.js`, `LISTA-PRESENCA*.js`, `LISTA-ALUNOS/` | Dados pessoais de alunos (LGPD); a lista única `scripts/LISTAPRESENCA.js` é versionada (decisão do usuário, 2026-10-09) |

- ⚠️ **Sem o `.gitignore`, o Git não barra mais nada disso:** gabaritos, listas de presença
  (nomes, e-mails, senhas iniciais, CPF), documentos pessoais e binários aparecem como arquivos
  novos. **Nunca `git add .`**: adicionar só os caminhos da tarefa e conferir
  `git diff --cached --name-only` antes de cada commit. Dado pessoal de aluno, senha, CPF ou
  documento pessoal **não entra no commit** sem pedido expresso do usuário.
- ⛔ **O `.vercelignore` só protege o site**, não o GitHub. Arquivo novo com resposta certa ou dado
  pessoal que não case com os padrões acima: acrescentar o padrão ao `.vercelignore` **antes** do
  commit (senão vai ao ar).
- ⛔ **Gabarito nunca em página de aluno** (HTML, JS ou PDF do aluno) — continua valendo.
- ✅ A página `LISTA-PRESENCA.html` não contém dados (lê o `scripts/LISTAPRESENCA.js`, lista única de presença — regra em `docs/regras/usuarios-turmas-paginas-professor.md`).

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
- ✅ **Seeds de atividades:** regra única na seção "🌱 REGRA — SEEDS DO BANCO" logo abaixo.
- ✅ **Estrutura dos cursos só o professor escreve** (2026-09-30,
  `database/2026-09-30-estrutura-curso-so-professor-escreve.sql`): `aulas`, `materia`, `curso`,
  `cursomateria` e `unidade` aceitam insert/update/delete só de usuário logado com perfil PROFESSOR;
  o `anon` só lê. Os antigos `js/curso.js`, `materia.js`, `aulas.js` e `unidade.js` não são
  carregados por nenhuma página (órfãos).
- ✅ **Tabela nova ou alterada = RLS ligado** e políticas explícitas; nunca deixar `anon` com
  acesso de escrita. Dados sensíveis (`senha_hash`, gabarito) não ficam legíveis pela API pública.

## 🌱 REGRA — SEEDS DO BANCO (STATUS EM `database/SEEDS-APLICADOS.md`)

Registrada em 2026-10-09 19:19:18 e consolidada em 2026-10-09 19:38:38 a pedido do usuário: **esta é a única
regra de seeds do projeto** (os outros arquivos só apontam para cá). O registro dos seeds é
**[`database/SEEDS-APLICADOS.md`](database/SEEDS-APLICADOS.md)**: uma linha por arquivo
`database/*-seed-atividades.sql`, com o status, a data e hora da conferência e a observação.

| Status | Quando usar |
|---|---|
| **PENDENTE** | Gerado (ou não encontrado no banco); ainda não rodado no Supabase |
| **APLICADO** | Rodado no Supabase, mas ainda não conferido ou a conferência não bate (ex.: substituído por um seed mais novo, aplicado só em parte) |
| **CONCLUÍDO** | Rodado **e conferido pelo md5**: a atividade de cada página está no banco com o mesmo conteúdo do arquivo |
| **SUBSTITUÍDO** | **Só por decisão do usuário:** o seed foi trocado por outro (já CONCLUÍDO) ou a página dele foi substituída por outra no banco, e o usuário decidiu **não aplicá-lo**; a observação diz por qual foi substituído. Conta como resolvido (não trava tarefa) e não é conferido de novo |

- ✅ **Seed novo entra no registro como PENDENTE** no mesmo commit em que é gerado.
- ✅ **Aplicar só com pedido do usuário** (pelo conector do Supabase ou o próprio usuário no SQL
  Editor), depois de conferir o banco real. Pelo conector, aplicar **em partes pequenas** (um
  comando por atividade, sem `DO` nem `delete`: `insert ... returning` com a contagem), porque os
  blocos grandes com `delete` voltam "cancelado". A autorização de 2026-10-03 ("aplicar o seed ao
  finalizar cada matéria") vale só para as matérias do plano `docs/gerar-atividades-50-questoes-todas-materias.md`.
- ✅ **Conferência pelo md5**, por página e na ordem de item e tópico: objetivas
  `md5(string_agg(item||'|'||titulo||'|'||letra, E'\n' order by item))` da `gabarito`; discursivas
  `md5(string_agg(item||'|'||topico||'|'||enunciado||'|'||resposta_esperada||'|'||criterios, E'\n'
  order by item, topico))` da `topico_discursivo` — comparado com o mesmo texto montado do arquivo.
  Bateu → **CONCLUÍDO** (com a data e hora); não bateu → continua **APLICADO** com o motivo.
- ⛔ **Todos os seeds CONCLUÍDO antes de qualquer tarefa** (2026-10-09 20:59:55, pedido do usuário): antes de
  **começar uma tarefa nova ou continuar uma tarefa** (inclusive ao retomar a sessão), ler o
  registro e **concluir todos os seeds**: aplicar os **PENDENTE** pelo conector (em partes, como
  acima), conferir pelo md5 os **APLICADO** e marcar **CONCLUÍDO** os que baterem, gravando o
  registro e fazendo commit (e push na nuvem) **antes** de seguir para a tarefa. Esta regra é a
  autorização permanente do usuário para aplicar os seeds do registro (não precisa pedir de novo).
  - ✅ Seed que **não pode** ser concluído sem decisão do usuário (matéria ou aula inexistente no
    banco, página substituída por outra, conteúdo do arquivo diferente do banco por ter sido
    trocado por um seed mais novo) fica com o status e o motivo no registro, entra em **"⏳
    Aguardando o usuário"** do `STATUS.md` e é **perguntado** ao usuário; só ele não trava a tarefa.
  - ⛔ Sem conector do Supabase (ou no ambiente local sem acesso ao banco): avisar o usuário quais
    seeds faltam antes de começar a tarefa.
- ⛔ **Usar SEMPRE os scripts do repositório** (2026-10-09, pedido do usuário; passo a passo em
  [`scripts/seeds/README.md`](scripts/seeds/README.md)): `scripts/seeds/dividir_seed.py` (seed →
  um lote por atividade + `esperado.json` + `conferir-md5.sql`), `scripts/seeds/comparar_md5.py`
  (banco × esperado) e `scripts/seeds/registrar_seed.py` (status e resumo no registro). Para os
  status das matérias, `scripts/status-materias/`; para as aulas de Banco de Dados,
  `scripts/banco-de-dados/`. Não montar lote, md5 nem registro à mão; se um script não servir,
  corrigir o script na mesma tarefa.
- ✅ **Uma aula por vez** (pedido do usuário): aplicou os seeds de uma aula (objetiva + prática) →
  conferir pelo md5 → gravar o status (registro, `STATUS-AULAS.md`, `STATUS-ATIVIDADES.md`, item da
  etapa) → commit (e push na nuvem) → só então a próxima aula.
- ✅ **Ao iniciar a análise dos seeds** (2026-10-09 19:35:54): conferir pelo md5 **só os
  seeds APLICADO**. ⛔ **Seed CONCLUÍDO não é verificado de novo**; só volta a ser conferido se o
  arquivo do seed mudar (aí volta a **PENDENTE**).
- ✅ **Toda tarefa que gera seed tem o item "Aplicar os seeds no Supabase"** no arquivo da etapa
  (`tasks/etapas/`), com o mesmo status do registro (`⬜ PENDENTE` → `🔄 APLICADO` → `✅ CONCLUÍDO`);
  a coluna **Banco** do `STATUS-ATIVIDADES.md` (e do `STATUS-AULAS.md`) da matéria acompanha.
- ⛔ O registro não leva gabarito, padrão de resposta, senha nem dado de aluno (só nomes de arquivo,
  contagens, status e md5).

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
pull request deixa registrado o que entrou na `main`; **desde 2026-10-09 22:17 o próprio Claude faz o
merge** (ver o item "Claude faz o merge" abaixo).

✅ **Push sempre permitido e automático na nuvem** (2026-10-08 11:10, pedido do usuário): ao final
de **toda** tarefa que mudar arquivos, o Claude faz commit + push + PR **sem esperar pedido nem
confirmação** do usuário — não perguntar "posso fazer push?". Tarefa que não muda nenhum arquivo
(só consulta ou resposta) não gera commit nem push vazio.

- ✅ Ao concluir cada tarefa: commit (regra "COMMIT POR TAREFA"), **`git push -u origin <branch>`**
  (a branch de trabalho da sessão, nunca a `main`) e **abrir um novo pull request** da branch para
  a `main`, com título e descrição do que mudou.
- ⛔ **Nunca push direto na `main`** (`git push origin HEAD:main` está proibido): a mudança entra
  na `main` sempre pelo pull request.
- ✅ **Claude faz o merge do PR** (2026-10-09 22:17:26, pedido do usuário — antes o merge era só do
  usuário): depois do push e de abrir (ou atualizar) o PR, o próprio Claude **junta o PR na `main`**
  (merge commit), sem esperar o usuário. Antes de juntar: `git fetch origin main`, merge da `main` na
  branch e conferência do `git diff --cached --name-only` contra "O QUE NUNCA É PUBLICADO".
- ✅ **Conflito de merge = o Claude resolve** (2026-10-09 22:17:26, pedido do usuário): se o PR
  tiver conflito com a `main`, o Claude traz a `main` para a branch (`git merge origin/main`, nunca
  rebase nem push forçado), resolve cada conflito mantendo as mudanças dos dois lados (registros e
  tabelas de status: todas as linhas, em ordem; arquivo gerado por script: regerar — regra 6 de
  "CONVERSA ENTRE SESSÕES"), confere que não sobrou marca `<<<<<<<`, faz commit + push e só então
  junta o PR. Só pergunta ao usuário quando os dois lados mudaram a mesma lógica e escolher um
  perderia comportamento. Vale também para PRs de outras sessões/licenças quando o usuário pedir.
- ✅ **PR juntado = branch apagada** (2026-10-09 22:19:14, pedido do usuário): logo depois de juntar um PR
  na `main`, o Claude **exclui a branch dele no GitHub** (`git push origin --delete <branch>`); fica só
  o histórico (os commits na `main` e a página do PR). Branch de PR juntado que ainda existir também
  é apagada. ⛔ Nunca apagar a `main`, branch de PR **aberto** nem branch sem PR que não foi juntada.
  Na tarefa seguinte, a branch da sessão é recriada a partir da `main` atualizada.
- ✅ **A cada merge, ler os recados** (2026-10-09 22:21:17, pedido do usuário): depois de trazer a `main` para a
  branch ou de juntar um PR, ler o `tasks/RECADOS.md` (regra 4 de "CONVERSA ENTRE SESSÕES E
  LICENÇAS") e cumprir os recados abertos para a sua frente ou para `todas`.
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
- ✅ **Cada commit na nuvem = push + PR** (2026-10-09): ver a seção "Pull Requests" logo abaixo.

## 🔀 Pull Requests (SÓ NO AMBIENTE DE NUVEM)

Registrada em 2026-10-09 11:03:21 a pedido do usuário. **Vale só na nuvem** (Claude Code na web /
sessão remota); no ambiente **local** nada muda: só o commit, o push continua com o usuário.

- ✅ **Cada arquivo criado na nuvem = commit + push na hora** (2026-10-09 14:58:46, pedido do usuário): ao
  **criar** qualquer arquivo numa sessão de nuvem (aula, fonte de atividade, página gerada, plano,
  status), fazer **logo em seguida** o `git commit` dele e o `git push -u origin <branch>`, sem
  esperar o fim da tarefa nem juntar vários arquivos — assim nada se perde se a sessão parar ou o
  contêiner for reciclado. Vale também para arquivo parcial (commit marcado como `wip(...)` e o
  `STATUS.md` dizendo o que falta). Rascunhos de trabalho no scratchpad (fora do repositório) não
  entram nesta regra. Continuam valendo "O QUE NUNCA É PUBLICADO" e o `git diff --cached --name-only`.
- ✅ **Todo commit feito na nuvem é enviado na hora:** depois de **cada** `git commit`, fazer
  **`git push -u origin <branch>`** (a branch da sessão, nunca a `main`) — sem esperar o fim da
  tarefa e sem perguntar ao usuário. Nenhum commit fica só no contêiner.
- ✅ **Sem PR, cria um novo:** depois do push, conferir se a branch tem pull request **aberto** para
  a `main`. Se **não tiver** (nunca teve, ou o anterior foi juntado ou fechado), **abrir um novo
  PR** na hora, com título e descrição do que mudou. Se já tiver PR aberto, o push entra nele.
- ✅ PR anterior **juntado ou fechado**: antes do commit novo, recomeçar a branch a partir da `main`
  atualizada (regra "Sempre um PR novo" da seção do push) e abrir **outro** PR.
- ✅ Antes do push: `git fetch origin main` (se a `main` andou, merge nela e conferir de novo) e
  `git diff --cached --name-only` contra a regra "O QUE NUNCA É PUBLICADO".
- ⛔ Nunca push direto na `main` e nunca push forçado.
- ✅ **Depois do push, o Claude junta o PR na `main`** e, se houver conflito de merge, resolve antes
  (ver "Claude faz o merge do PR" e "Conflito de merge = o Claude resolve" na seção do push).
- ✅ Na resposta ao usuário, citar o link do PR criado ou atualizado.

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
- ✅ **Nunca perguntar antes de commitar ou de executar comandos Git** (add, commit, log, diff):
  executar direto. O push continua proibido no ambiente local (regra do push).
- ⛔ **Não rodar `git status` repetido** entre comandos nem depois do commit; conferir só
  `git diff --cached --name-only` antes de commitar.
- ⛔ **Não usar git worktree:** trabalhar direto na `main` (local) ou na branch da sessão (nuvem).
- ✅ Gabaritos, fontes de questões, listas de alunos e documentos pessoais não entram no commit
  sem pedido do usuário (o `.gitignore` não os barra mais: ver "O QUE NUNCA É PUBLICADO"). Desde 2026-09-30 os `*.md` e `*.py` **são versionados**
  (inclusive este `CLAUDE.md`, os planos em `docs/` e os geradores em `assets/`).

---

## 🔘 FAIXA DE MATÉRIAS — SOMENTE ENSALADO, VER TODAS MATÉRIAS E ON/OFF (2026-10-08)

Registrada em 2026-10-08 a pedido do usuário. Vale para **todos os `index.html` das pastas de curso**
(a faixa "Matérias — <CURSO>") e para as páginas `ATIVIDADES/index.html` das matérias que mostram a mesma faixa.

- ✅ Ao lado do título da faixa: botão **SOMENTE ENSALADO** (mostra só as matérias com `ensalado = true`)
  e **VER TODAS MATÉRIAS** (volta à lista completa).
- ✅ **Toda faixa abre em SOMENTE ENSALADO** (2026-10-08, pedido do usuário); sem matéria ensalada
  (ou sem banco) mostra todas.
- ✅ O botão do filtro em uso fica **em fundo verde, piscando levemente**; no índice do curso a
  **grade de matérias de baixo** mostra só as matérias do filtro escolhido (2026-10-08).
- ✅ Ao lado do nome de cada matéria: botão **ON/OFF** para marcar/desmarcar `ensalado` ali mesmo.
- ✅ Usa a coluna `materia.ensalado` (boolean: ENSALADO = 1 ou 0). Não criar coluna nova (ela já existe).
- ✅ O ON/OFF aparece e grava **só para o perfil PROFESSOR** (RLS); o aluno vê só os botões de filtro.
- ✅ Matéria da faixa sem linha no banco (casada pelo nome, sem acento e sem diferença de maiúsculas)
  mostra o ON/OFF desligado e não entra no filtro.
- ✅ Cada faixa informa o curso do banco em `<nav class="faixa-materias" data-curso-id="N">`.
- ✅ Código: `assets/js/faixa-materias-ensalado.js`. Plano: `docs/somente-ensalado-materias.md`.
  Regra global espelhada em `~/.claude/CLAUDE.md`.
- ⛔ Sem `onclick` no HTML e sem `alert()` (usar o popup, `assets/js/popup.js`).

## 🔐 REGRA CRÍTICA — SESSÃO OBRIGATÓRIA EM TODAS AS PÁGINAS (SEM LOGIN, NADA CARREGA)

Registrada em 2026-10-09 00:33:19 a pedido do usuário. Plano:
[docs/validacao-sessao-todas-paginas.md](docs/validacao-sessao-todas-paginas.md).

- ⛔ **Sem usuário logado, NADA da página é carregado nem mostrado.** Todo arquivo `.html` do
  projeto valida a sessão do Supabase Auth **antes** de exibir qualquer conteúdo e, sem sessão
  válida, **redireciona na hora para o `index.html` da raiz** (que mostra a apresentação do
  professor e o botão Entrar).
- ✅ A validação fica no **`js/header-usuario.js`**, que é o **primeiro script do `<head>`** (sem
  `defer`): a página fica oculta, com o modal **"Aguarde, carregando..."** e o GIF
  `assets/img/carregando.gif`, até o Supabase confirmar a sessão; sem sessão, o carregamento é
  interrompido (`window.stop()`) e vai para o `index.html`.
- ✅ **Exceções (só estas duas):** o `index.html` da raiz (página pública de entrada) e o
  `login.html`.
- ✅ **Toda página nova** já nasce com o guarda: os geradores de `assets/` usam
  `assets/gerador-menu/tags_header.py`, que põe a tag no início do `<head>`; página escrita à mão
  ou copiada: rodar `C:\Python314\python.exe assets/gerador-menu/tags_header.py` (sem
  argumentos aplica em todos os `.html`; é idempotente).
- ⚠️ O guarda é feito no navegador (site estático na Vercel): ele impede a página de aparecer e
  de carregar o resto, mas o arquivo `.html` em si ainda pode ser baixado direto pelo endereço.
  Por isso **gabarito e dado sensível continuam proibidos** nos arquivos publicados e o acesso
  aos dados continua garantido pelo **RLS** do banco.
- ⛔ Nunca criar página que mostre conteúdo sem login nem remover o guarda de uma página.

## 📝 REGRA — ATIVIDADE PRÁTICA: PADRÃO DA PROVA PRÁTICA ID 82 (2026-10-09)

Registrada em 2026-10-09 a pedido do usuário. **Regra completa (leitura obrigatória antes de criar ou
alterar qualquer atividade prática):** [docs/REGRAS-ATIVIDADE-PRATICA.md](docs/REGRAS-ATIVIDADE-PRATICA.md).

- ⚠️ **Regra nova (2026-10-11 06:01:03):** questões só no banco, layout global e nenhum HTML na pasta
  da matéria (seção "🗃️ REGRA — ATIVIDADES SÓ NO BANCO…"); o formato por aula abaixo vale até a
  migração da tarefa #25-b3e29764-940b-4a82.
- ✅ Toda **atividade prática de aula** (`ATIVIDADES/ATIVIDADE-PRATICA-AULA-NN.html`) segue a lógica da
  **Prova Prática id 82** (`PROVA-PRATICA-01.html` de Análise de Dados, turma de Salete): discursiva,
  resposta digitada em cada tópico e gravada no banco.
- ✅ Tamanho: **10 questões × 3 tópicos (0,2 + 0,4 + 0,4)**, total 10 pontos; prova de várias aulas,
  20 questões × 3 tópicos.
- ⚠️ **Ao gerar prova ou atividade prática** (2026-10-09 14:04:30, pedido do usuário): o
  `docs/REGRAS-ATIVIDADE-PRATICA.md` define a **prática de uma aula como 10 questões × 3 tópicos**.
  A **prova id 82 é de várias aulas** (20 questões) e deve ser usada **apenas como referência para
  os recursos compartilhados** (Progresso da turma, Gráficos, Cálculo Nota, mínimo por aluno,
  correção pela IA, botões do professor, Finalizar Atividade, gabarito por turma, PDF) — nunca
  como modelo de tamanho, pontuação ou formato das questões da prática de uma aula.
- ✅ Além das perguntas, tem **tudo** o que a id 82 tem: Progresso da turma, 📈 Gráficos, 🧮 Cálculo
  Nota, quantidade mínima por aluno, correção pela IA, botões Certa / Meia certa / Errada, Finalizar
  Atividade, prova corrigida para o aluno, liberação do gabarito por turma e PDF SENAI.
- ✅ Gerada por `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`, com os campos
  `Bloquear colar`, `Campo do tamanho da resposta`, `Botão gravar`, `Progresso para o professor` e
  `Ocultar respostas após entrega` = `sim`; padrão de resposta no `-GABARITO.md` (no Git, fora do site pelo `.vercelignore`).
- ⛔ Sem empresa fictícia ("Você, como aluno consultor..."); sem padrão de resposta na página do aluno.

## 👨‍🏫 DADOS DO PROFESSOR — `docs/PROFESSOR-GELVAZIO-CAMARGO.md` (2026-10-09)

Registrada em 2026-10-09 a pedido do usuário. **Todos os dados do professor Gelvazio Camargo**
(identificação, contato, conta no sistema, apresentação, experiência, formação, certificações,
competências, idiomas, cursos que leciona e onde os dados aparecem) ficam em
[docs/PROFESSOR-GELVAZIO-CAMARGO.md](docs/PROFESSOR-GELVAZIO-CAMARGO.md).

- ✅ Toda peça que mostra dados do professor (apresentação, apostila, slides, PDF, página inicial)
  usa **esse arquivo** como fonte; dado novo ou alterado é gravado lá primeiro.
- ✅ A página inicial (`index.html`) sem login mostra a apresentação do professor
  (`assets/css/apresentacao-professor.css`, exibida por `assets/js/indice-cursos.js`).
- ⛔ O arquivo é publicado: nada de senha, chave, CPF/RG nem dados de alunos.

## 🔛 REGRA GLOBAL — BOTÃO ON/OFF AO LADO DE CADA ATIVIDADE (2026-10-09)

Registrada em 2026-10-09 a pedido do usuário. Vale para **todas as atividades de todas as matérias**
de todos os cursos (todo `ATIVIDADES/index.html`). Detalhe em
[docs/regras/atividades.md](docs/regras/atividades.md) (seção dos índices de atividades).

- ✅ No índice de atividades, o **professor** tem **um botão ON/OFF logo depois de cada atividade**
  cadastrada no banco: **ON (verde) = liberada**, **OFF (vermelho) = bloqueada**. Um card com
  várias atividades tem um botão para cada uma.
- ✅ O bloqueio vale para a **turma favorita** (`definir_bloqueio_turma`); as outras turmas não mudam.
- ✅ **Mesma largura e ON/OFF sempre ao lado** (2026-10-09, pedido do usuário): todos os botões de
  atividade do card têm a mesma largura (um por linha) e o ON/OFF fica **sempre ao lado** do botão,
  também no celular — o texto do botão fica menor (12 px) e quebra a linha para caber
  (`assets/css/indice-atividades.css`, medida `--largura-onoff-atividade`).
- ✅ O aluno vê a atividade bloqueada com 🔒 e "Atividade Bloqueada!" ao clicar; o card inteiro só
  trava quando todas as atividades dele estão bloqueadas.
- ✅ Código único para todos os índices: `assets/js/indice-atividades-bloqueio.js` +
  `assets/css/indice-atividades-bloquear.css` (carregados pelo `atividades-crud-modal.js`).
  ⛔ Não criar botão de bloqueio por matéria nem por página, e não voltar ao interruptor por card.

## ⏳ REGRA — BLOQUEIO DA AULA × BLOQUEIO DA ATIVIDADE (2026-10-09; LIGADA EM TESTES DE FRONT-END, DEMAIS MATÉRIAS PENDENTES)

Registrada em 2026-10-09 a pedido do usuário. **Ainda NÃO implementada** — fica na fila: tarefa
**#16** do [TASKS.md](tasks/TASKS.md) (status no `STATUS.md`, Etapa 113, item 113.6). Vale para **todas as
atividades de todas as matérias** (todo `ATIVIDADES/index.html`).

- ⛔ **O ON/OFF de cada atividade nunca bloqueia o card inteiro:** os alunos sempre veem a aula
  (slides e demais atividades); só a atividade bloqueada fica com 🔒.
- ✅ **Bloqueio da AULA:** botão ON/OFF embaixo no card, **logo antes de "✏️ Editar aula"** (só
  professor), gravando na tabela **`aulas`** (coluna `aulas.ativo`; false = bloqueada). **Só este
  botão bloqueia o card inteiro** para os alunos ("Aula Bloqueada!").
- ✅ **Ligada em Testes de Front-End** (2026-10-09, pedido do usuário): matérias com a regra ligada
  ficam na lista `PASTAS_COM_BLOQUEIO_AULA` de `assets/js/indice-bloqueio-aula-config.js`; o botão
  da aula é `assets/js/indice-aula-bloqueio.js` (chamado pelo `indice-aula-data.js`).
- ⛔ **Aula bloqueada = NENHUM acesso, nem para o professor** (2026-10-09, pedido do usuário): no
  card da aula bloqueada, **só o botão de desbloquear** ("Aula bloqueada") pode ser clicado; links
  das atividades, slides, ON/OFF das atividades, "CADASTRAR ATIVIDADES" e "✏️ Editar aula" ficam
  travados até o professor desbloquear (`travarCardAulaProfessor` em
  `assets/js/indice-aula-bloqueio.js` + CSS `.aula--bloqueada-professor`).
- ✅ **Bloquear a aula bloqueia todas as atividades dela no banco** (2026-10-09, pedido do usuário):
  trigger `aulas_bloqueio_propaga_atividades_trg` — `aulas.ativo` passando a `false` grava
  `atividade.ativo = false` em todas as atividades da aula (vale em qualquer matéria, pois é no
  banco). **Desbloquear a aula não mexe nas atividades:** o professor libera cada uma no ON/OFF.
  SQL `database/2026-10-09-trigger-bloqueio-aula-atividades.sql` (aplicado).
- ⏳ **Demais matérias: pendentes** (tarefa #16 do `TASKS.md`) — ligar uma por vez, só quando o
  usuário pedir, acrescentando a pasta na lista. Nelas continua valendo o comportamento da seção
  "BOTÃO ON/OFF AO LADO DE CADA ATIVIDADE" (card escurecido quando todas as atividades estão OFF).

## 📊 REGRA GLOBAL — PROGRESSO DA TURMA EM TODAS AS ATIVIDADES (2026-10-09)

Registrada em 2026-10-09 a pedido do usuário ("gerador de progresso global, semelhante ao da turma
de ADAG, para todas as matérias"). Plano: [docs/progresso-global-atividades.md](docs/progresso-global-atividades.md).
Detalhe em [docs/regras/atividades.md](docs/regras/atividades.md).

- ✅ **Toda atividade que grava no banco** (objetiva e discursiva), de todas as matérias e
  cursos, mostra ao **professor** o painel **"📊 Progresso da turma" logo ao abrir a página**,
  igual ao da Prova Prática ADAG (id 82): uma linha por aluno, uma célula por questão, barra,
  situação ("✅ Entregue"), 🎯 mínimo por aluno, nota parcial e nota final, ordenação, resumo da
  turma, **📈 Gráficos** e **🧮 Cálculo Nota**, atualizado a cada 5 s. O aluno não vê o painel.
- ✅ **Um só módulo global** (tudo vem dele): `assets/js/progresso-turma-global.js` (tela) +
  `assets/js/progresso-turma-fontes.js` (dados) + `assets/css/progresso-turma-global.css`. Ligado
  pelos motores das páginas — `assets/js/respostas-atividade.js` (objetivas) e
  `assets/js/avaliacao-discursiva.js` (discursivas) —, então **toda página com banco, já
  existente ou nova, ganha o painel sem regerar** e sem campo na fonte `.md`.
- ✅ **Objetiva:** colunas "Nota parcial (acertos)" e "Nota final", com os acertos calculados no
  banco (`resumo_tentativas_atividade`; **o gabarito nunca sai do banco**). **Discursiva:** "Nota
  parcial IA" e "Nota IA (a confirmar)", como antes.
- ✅ **Mínimo de questões também na objetiva:** entrega com o mínimo de questões respondidas e
  nota = acertos ÷ mínimo × 10, **máximo 10** (página, relatório do professor e banco — SQL
  `database/2026-10-09-minimo-questoes-objetivas.sql`, aplicado em 2026-10-09). Sem mínimo
  definido, o mínimo é o total (todas as questões), como antes.
- ✅ O painel lê o banco de 1000 em 1000 linhas (turmas grandes não ficam cortadas) e só lê; o
  RLS limita aos alunos das turmas do professor.
- ⛔ Não criar painel de progresso por matéria nem por página, e não voltar ao antigo
  `progresso-turma-discursiva.js` (removido em 2026-10-09).

## 🆔 REGRA — ID NA FRENTE DE CADA ATIVIDADE NOS ÍNDICES (2026-10-09)

Registrada em 2026-10-09 a pedido do usuário. Vale para os índices de atividades de **todas** as
matérias (só o professor vê os IDs).

- ✅ O **ID da atividade** aparece **na frente do botão dela**, numa etiqueta: **"ID 07"**. IDs
  **menores que 10 levam zero à esquerda** (7 → 07, 4 → 04); de **10 em diante, normal** (99, 100).
- ⛔ **Sem a caixa "🆔 ID 99 · nome da atividade | ID 96 · ..."** embaixo do card (removida).
- ✅ Código: `mostrarIdNoCard` e `formatarIdAtividadeCrud` em `assets/js/atividades-crud-modal.js`
  (+ `.crud-id-atividade` em `assets/css/atividades-crud-modal.css`).

## 🙈 REGRA — BOTÃO 🧾 LOG ESCONDIDO E SLIDES EM NOVA ABA NOS ÍNDICES (2026-10-09)

Registrada em 2026-10-09 a pedido do usuário.

- ✅ O botão **"🧾 LOG"** dos cards fica **escondido em todos os índices** (`LOG_ALTERNATIVAS_LIGADO =
  false` em `assets/js/atividades-crud-modal.js`); o banco continua gravando o
  `log_resposta_atividade`. Só mostrar de novo se o usuário pedir.
- ✅ O botão **"📕 Slides"** (PDF ou PowerPoint) dos cards **abre em nova aba** (`target="_blank"`);
  o gerador de índices já sai assim (`atributos_nova_aba` em `assets/gerador-indices/gerar_indices.py`).

## 📝 Outras Regras

✅ Tudo conforme `C:\Users\gelva\.claude\CLAUDE.md` (global)  
✅ **Fonte única de regras:** este `CLAUDE.md` + os arquivos de `docs/regras/` listados no "ÍNDICE DAS REGRAS DETALHADAS" (desde 2026-10-07). O `AGENTS.md` (Codex e outros agentes) contém apenas a instrução de ler e seguir este arquivo — o conteúdo que existia nele foi mesclado aqui em 2026-09-23. Novas regras são escritas **somente aqui ou em `docs/regras/`**.  
✅ Documentação: `docs/<tarefa>.md` antes de implementar nas **tarefas grandes** (as pequenas dispensam o plano — ver "REGRAS DO USUÁRIO QUE VALEM SEMPRE"); `STATUS.md` em todas  
✅ **Fluxo da documentação padrão (tarefas grandes, skill `documentacao-padrao` em `.claude/skills/`):** se não houver `docs/`, pedir autorização para criar; o plano `docs/<nome-em-kebab-case>.md` traz objetivo, escopo, arquivos, riscos e dependências, **data e hora de criação, de conclusão e o tempo decorrido**, e passos numerados (ação, caminho exato, verificação sem navegador nem teste automatizado) com ⬜/🔄/✅/⛔; mostrar o resumo e pedir aprovação; executar só o aprovado; no fim registrar resultado, pendências e commit.  

---

**Versão:** ver "Versão das regras" e o histórico no topo deste arquivo  
**Status:** ✅ Ativo

