# 📚 Regras do projeto — Usuários, turmas e páginas do professor

> Parte das regras do projeto aulasenai. **Vale como se estivesse no `CLAUDE.md`** (índice e regras de sempre no [`CLAUDE.md`](../../CLAUDE.md)). Ao alterar este arquivo, atualizar a **Versão das regras** e o histórico no `CLAUDE.md`.

---

## 🔑 REGRA CRÍTICA — CONTAS, SENHAS E PERFIL (SUPABASE AUTH)

Registrada em 2026-09-28.

- ✅ **Login:** página `login.html` (raiz) + `js/login.js` com `signInWithPassword`. O aluno digita
  `nome.sobrenome` e o script completa `@senai.local`. `?voltar=` só aceita páginas do próprio site.
- ✅ **Contas só pelo professor:** `scripts/criar-usuarios-supabase-auth.js` (lê o
  `LISTA-PRESENCA.js`; simula por padrão, grava com `--executar`; conta do professor com
  `--professor=gelvazio.camargo@senai.local` e `$env:PROFESSOR_SENHA`). Sem cadastro pela página:
  no painel do Supabase, "Allow new users to sign up" e "Confirm email" ficam desligados.
- ✅ **Senha inicial:** 6 caracteres (mínimo do Supabase), com maiúscula + minúscula + número em
  ordem variada e **sem caracteres ambíguos** (`0/O/o`, `1/l/I`, `5/S`, `2/Z`). Nunca repetir senhas
  no chat.
- ✅ **Perfil (ALUNO/PROFESSOR) e turma vêm do `app_metadata`** (só a `service_role` altera); o
  RLS usa `eh_professor()`. ❌ Nunca usar `user_metadata` para permissão (o aluno consegue alterar).
- ❌ **A chave `service_role` nunca vai para páginas, repositório ou chat**: só em variável de
  ambiente, na máquina do professor. Chave colada no chat é considerada exposta → trocar.
- ✅ **Tabela `usuario` ligada ao Auth pela chave primária** (2026-09-30): `usuario.id` (uuid) =
  `auth.users.id` (PK e FK); toda conta do Auth tem a sua linha. Coluna **`senha_informada`**
  (+ `senha_informada_em`): a coluna **"Aluno anotou?"** de `scripts/criarUsuariosBancoDados.html`
  grava lá que a senha foi informada ao aluno (popup de confirmação) e carrega o valor ao abrir a
  página. SQL: `database/2026-09-30-usuario-liga-auth-users.sql`; backup do que existia:
  `usuario_legado_20260930`. Cada tabela de turma tem **dois filtros combinados**: "Filtrar"
  (coluna Cadastrado) e **"Aluno anotou?"** (Todos / Anotou / Não anotou); ao trocar a lista de uma
  linha, o filtro é reaplicado. Só o professor logado, em `127.0.0.1`/`localhost`, grava.
- ✅ **RLS restritivo na `usuario`** (2026-09-30, `database/2026-09-30-usuario-rls-restritivo.sql`):
  RLS ligado; `anon` sem acesso; usuário logado lê só a própria linha (professor lê todas) e só as
  colunas não sensíveis (nunca `senha_hash` nem os campos de código legado); ninguém grava pela API
  pública (a página local do professor grava com a `service_role`).

## 🗑️ REGRA — EXCLUIR AULA (SÓ PROFESSOR ADMINISTRADOR, EXCLUSÃO LÓGICA)

Registrada em 2026-10-06 a pedido do usuário. Plano: `docs/excluir-aula-professor-administrador.md`;
SQL: `database/2026-10-06-aulas-excluido.sql` (✅ aplicado no Supabase em 2026-10-06).

- ✅ No modal **"✏️ Editar aula"** dos índices de atividades (`assets/js/indice-aula-data.js`), o
  botão **🗑️ Excluir aula** aparece **só para o Professor Administrador** (RPC
  `eh_professor_administrador()`), com confirmação pelo popup.
- ✅ **Exclusão lógica:** grava `aulas.excluido = 1` pela função `excluir_aula(p_aula)` (security
  definer, só administrador). ❌ Nunca apagar a linha da aula nem as atividades/respostas dela.
- ✅ O card de aula com `excluido = 1` fica **escondido para todos** (professor, aluno e visitante)
  e a aula sai da lista do **CADASTRAR ATIVIDADES** (`excluido=eq.0`).
- ✅ O trigger `aulas_excluido_so_administrador_trg` recusa mudança em `excluido` feita pela API
  por quem não é administrador (a política de update de `aulas` aceita qualquer professor).
- ✅ Restaurar: voltar `excluido = 0` pelo SQL Editor (ainda sem tela). Código novo que liste
  aulas deve filtrar `excluido = 0`.
- ✅ **Card com 100% dos dados da tabela `aulas`** (2026-10-06, pedido do usuário; plano
  `docs/card-dados-100-tabela-aulas.md`): o rótulo do card é `aulas.rotulo_card` (vazio =
  "AULA NN" pelo `numero`), o nome é `aulas.nome_card` (vazio = `aulas.titulo`) e a data é
  `aulas.data_planejada`. O texto escrito no HTML do índice só é usado para **achar** a aula quando
  a atividade não pôde ser lida (ex.: bloqueada para o aluno), pelo rótulo; card sem aula no banco
  fica como está no HTML. Código: `assets/js/indice-aula-repositorio.js` (dados),
  `assets/js/indice-aula-data.js` (cards) e `assets/js/indice-aula-modal.js` (modal), carregados
  pelo `atividades-crud-modal.js`. Colunas `rotulo_card` (até 60) e `nome_card` (até 200):
  `database/2026-10-06-aulas-nome-card.sql` (✅ aplicado).
- ✅ **"✏️ Editar aula" = modal CRUD completo da aula** (todo professor): edita todos os campos da
  `aulas` (número, título, rótulo, nome, data, duração, sequência, descrição, conteúdo JSON,
  ativa, visível aos alunos; id, matéria e curso só leitura) e **lista as atividades da aula**,
  cada uma com **✏️ Editar** (abre o CADASTRAR ATIVIDADES com a atividade,
  `abrirEdicaoAtividadeCrud`) e **🗑️ Excluir** (popup de confirmação; apaga a atividade e, em
  cascata, gabarito, respostas e entregas), mais **➕ Nova atividade nesta aula**. O
  **🗑️ Excluir aula** continua só do Professor Administrador (exclusão lógica). Campo novo da
  `aulas` no modal = acrescentar em `CAMPOS_MODAL_AULA`.
- ✅ **Rótulo padrão "AULA NN"** (2026-10-06, pedido do usuário): toda aula deve ter o rótulo no
  formato `AULA NN`. Aula com outro rótulo (avaliação, prova, trabalho, "ATIVIDADES"...) é
  **listada ao usuário, que decide** a mudança — não trocar sem pedido.

### 🔗 REGRA CRÍTICA — CADA CARD LIGADO A APENAS 1 AULA

Registrada em 2026-10-06 a pedido do usuário. SQL: `database/2026-10-06-um-card-uma-aula-aula-40.sql`
e `database/2026-10-06-separar-aulas-por-card.sql` (✅ aplicados; backup do vínculo antigo em
`atividade_aula_backup_20261006`).

- ✅ **Cada card do índice de atividades (`article.aula`) fica ligado a uma única aula** (linha de
  `aulas`), e **uma aula nunca é dividida entre dois ou mais cards**. A aula do card é a da
  atividade do link principal; rótulo, nome, data e exclusão gravados na aula valem para o card.
- ✅ As várias atividades **do mesmo card** (ex.: objetiva + prática da mesma aula) ficam na mesma
  aula; atividade em **card próprio** (avaliação, prova, trabalho) tem **aula própria**.
- ✅ Atividade nova em card novo: criar a aula dela antes — nunca reaproveitar a aula de outro card.
- ✅ **Gerador de índices** (`assets/gerador-indices/gerar_indices.py`): páginas da mesma pasta com o
  mesmo `AULA-NN` no nome (2 ou mais) viram **um card só**, rótulo "AULA NN", um botão por página
  (discursivas por último). Ex.: Reforço de Linguagens (objetivas + discursivas da aula).
- ✅ Corrigido em 2026-10-06: 12 aulas novas (ITIC 69 a 75, Análise de Dados 76 a 79, Automação
  80) para os cards que dividiam aula; atividade 13 foi para a aula 23 (card AULA 03 da ITIC);
  aula 40 ficou só com a Prova Prática (atividade 82); 33 → aula 67, 35 → aula 68.

## 📌 REGRA — PENDÊNCIAS DE AULAS (MENU PENDÊNCIAS, SÓ PROFESSOR ADMINISTRADOR)

Registrada em 2026-10-06 a pedido do usuário. Plano: `docs/pendencias-aulas-professor-administrador.md`;
SQL: `database/2026-10-06-pendencias.sql` (✅ aplicado no Supabase em 2026-10-06).

- ✅ **Tabela `pendencias`:** `id` (identity), `nome` (1–300), `responsavel` (1–120),
  `datainicio` (date, padrão hoje), `status` (`PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`; padrão
  `PENDENTE`) e `excluido` (`0`/`1`, padrão `0`). Nomes das colunas mantidos como o usuário pediu.
- ✅ **Só o Professor Administrador** (`eh_professor_administrador()`) lê, cria e altera: RLS
  ligado com políticas de `select`/`insert`/`update`; `anon` sem acesso. ❌ **Sem `DELETE`:**
  excluir é **lógico** (`excluido = 1`) e pode ser desfeito (restaurar = `0`); nunca criar
  política de delete nem apagar linhas.
- ✅ **Menu PENDÊNCIAS** no header (`js/header-usuario.js`, `MENU_ADMINISTRADOR_HEADER`), exibido
  só quando o RPC `eh_professor_administrador()` devolve verdadeiro, ao lado de TURMAS. Esconder o
  menu é só visual: a segurança é o RLS.
- ✅ **Página `MATERIAIS/AGENDA_COLABORADOR/pendencias.html`** — CRUD completo:
  - **criar** (nome, responsável, data de início = hoje, status = PENDENTE);
  - **listar** todas as colunas, da data de início mais recente para a mais antiga, com contagem
    "Mostrando X de Y";
  - **editar** (✏️ carrega o formulário; "Salvar alterações" / "Cancelar edição");
  - **trocar o status** na própria linha (grava na hora, com aviso);
  - **excluir** (🗑️, popup de confirmação → `excluido = 1`) e **restaurar** (♻️ nas excluídas).
- ✅ **Filtros por todos os campos, combinados:** ID (exato), nome (contém), responsável (contém),
  data de início (de / até), status (Todos ou um status) e excluído (Não excluídas — padrão —,
  Excluídas ou Todas); botão **Limpar filtros**. Filtro feito na página sobre a lista lida do banco.
- ✅ **Código:** `assets/js/pendencias-repositorio.js` (dados) + `assets/js/pendencias-pagina.js`
  (tela) + `assets/css/pendencias.css` (reaproveita `criar-usuarios-comando.css` e
  `turmas-professor.css`). Avisos só pelo popup; nada em localStorage.
- ⚠️ A página fica na pasta `AGENDA_COLABORADOR`, que **não é curso** e tem regras próprias
  (`MATERIAIS/AGENDA_COLABORADOR/CLAUDE.md`): não rodar o gerador de índices nela e não misturar
  esta tabela com o dashboard da agenda do Google Calendar sem pedido do usuário.
- ⛔ **Acesso às pendências SÓ pelo menu PENDÊNCIAS do Professor Administrador logado**
  (2026-10-06, pedido do usuário): nenhum índice, card, link ou menu de atividades aponta para
  `AGENDA_COLABORADOR/` ou para `pendencias.html`. O gerador de índices **ignora**
  `AGENDA_COLABORADOR` (`PASTAS_IGNORADAS` em `assets/gerador-indices/gerar_indices.py`) — não
  gera `index.html` dentro dela nem card dela no índice raiz. Índice gerado ali por engano deve ser
  removido.

## 🎓 REGRA — ÍNDICE DE CURSOS: SÓ OS CURSOS DO USUÁRIO LOGADO

Registrada em 2026-10-03. Plano: `docs/indice-cursos-do-usuario-logado.md`;
SQL: `database/2026-10-03-turma-curso-e-cursos-do-usuario.sql` (aplicado no banco).

- ✅ O `index.html` da raiz lista os cursos pela função **`cursos_do_usuario()`**: administrador vê
  todos; professor vê os cursos das turmas dele (`turmaprofessor`); aluno vê os cursos das turmas
  dele (`turmaaluno`).
- ✅ **Sem login, não lista nada:** só a mensagem centralizada "Entre no sistema para acessar seus
  cursos!". Código: `assets/js/indice-cursos.js` + `assets/css/indice-cursos.css`.
- ✅ O curso vem de **`turma.curso_id`**: toda turma nova precisa ter o curso preenchido.
- ❌ A tabela `cursoprofessor` não existe e não será criada (substituída por este vínculo).

## 🎒 REGRA — `turmaaluno` (aluno × turma) E MENU ALUNOS

Registrada em 2026-10-02. Plano: `docs/tabela-turmaaluno-menu-alunos.md`;
SQL: `database/2026-10-02-turmaaluno.sql` (aplicado no banco).

- ✅ Tabela **`turmaaluno`** (`turma_codigo` → `turma`, `aluno_id` → `auth.users`, único por turma +
  aluno), no mesmo modelo da `turmaprofessor`. Trigger `turmaaluno_exige_aluno` recusa quem não tem
  perfil ALUNO.
- ✅ **RLS:** o professor grava (vincular, editar, excluir) e lê **só nas turmas vinculadas a ele**
  (`professor_tem_turma`, desde 2026-10-03; o administrador em todas); o aluno lê só os próprios
  vínculos; `anon` sem acesso; TRUNCATE revogado.
- ✅ **Tela:** menu **ALUNOS** no header (só Professor Administrador desde 2026-10-07) abre `alunos.html` (raiz): CRUD com filtro
  por turma e busca por nome; alunos = `usuario.perfil = 'ALUNO'`. Código:
  `assets/js/turmas-aluno-repositorio.js` + `assets/js/turmas-aluno-pagina.js` +
  `assets/css/turmas-aluno.css` (reaproveita `turmas-professor.css`).
- ✅ **FONTE ÚNICA DA TURMA DO ALUNO = `turmaaluno`** (unificada em 2026-10-02; plano
  `docs/unificar-turma-do-aluno-turmaaluno.md`, SQL `database/2026-10-02-turma-do-aluno-turmaaluno.sql`):
  - horário de resposta (`horario_da_turma_do_aluno` / `dentro_do_horario_da_turma`, usados no RLS)
    e líder (`definir_lider_turma`) leem a `turmaaluno`; aluno em várias turmas responde no horário
    de **qualquer** uma;
  - `aluno.turma_codigo` e `app_metadata.turma_codigo` são **cópias automáticas** da turma
    principal (vínculo mais recente), mantidas pelo trigger `turmaaluno_sincronizar_principal_trg`.
    ❌ **Nunca gravar nelas à mão**: para mudar a turma, gravar na `turmaaluno` (`alunos.html`);
  - a criação de contas (`criar-usuarios-api.js`, `criar-usuarios-supabase-auth.js`) grava o
    vínculo na `turmaaluno` e não envia `turma_codigo` para a tabela `aluno`;
  - código novo que precise da turma do aluno lê a `turmaaluno` (ou a cópia `aluno.turma_codigo`,
    só para leitura).

## 👥 REGRA — EQUIPES POR TURMA + MATÉRIA (MENU 👥 EQUIPES NAS ATIVIDADES)

Registrada em 2026-10-05 a pedido do usuário. Plano: `docs/equipes-sala-de-aula.md`;
SQL: `database/2026-10-05-equipes-turma-materia.sql` (✅ aplicado no Supabase em 2026-10-05).

- ✅ **Global:** as equipes valem para qualquer matéria e turma. Equipe = **turma + matéria +
  nome** (tabela `equipe`); integrante = aluno da turma (`turmaaluno`) com papel, tarefas e
  líder (tabela `equipe_membro`). **1 equipe por aluno** em cada turma + matéria; **1 líder** por
  equipe. Os nomes das equipes são cadastrados pelo professor.
- ✅ **Tela:** item `{ rotulo: '👥 Equipes', acao: 'equipes', papeis: [...] }` no
  `MENU-ATIVIDADES.js` da matéria → modal com a turma selecionada (1 turma = já vem
  selecionada) e CRUD completo de equipes e integrantes; `papeis` são só sugestões do campo.
  A matéria vem da própria pasta (`atividade.pagina` → `aulas` → `materia`).
- ✅ **Quem pode:** professor só nas turmas vinculadas a ele (`professor_tem_turma`; o
  administrador em todas). O aluno só **vê** a própria equipe (função `minhas_equipes`). Nada em
  localStorage; avisos pelo popup.
- ✅ **Código:** `assets/js/menu-acao-equipes.js` (carrega as dependências e abre),
  `assets/js/equipes-modal.js` (tela), `assets/js/equipes-repositorio.js` (dados) +
  `assets/css/equipes-modal.css`. O `js/menu.js` aceita itens de **ação**: `{ rotulo, acao }`
  carrega `assets/js/menu-acao-<acao>.js`, que registra `window.ACOES_MENU_ATIVIDADES[acao]`.
- ✅ **Matérias com o menu:** Introdução à TIC (2026-10-05) e Análise de Dados Aplicada à Gestão
  (2026-10-08, para cadastrar as duplas da prova prática; a prova continua individual por login). Outras matérias recebem o item no
  `MENU-ATIVIDADES.js` quando o usuário pedir (regra das matérias semelhantes).

## 🎯 REGRA — PÁGINA VISÍVEL SÓ PARA ALGUMAS TURMAS

Registrada em 2026-10-05 a pedido do usuário.

- ✅ Página com `<body class="restrito-turma" data-turmas-permitidas="135081">` + o script
  genérico `assets/js/restricao-turma.js` (+ `assets/css/restricao-turma.css`) só mostra o
  conteúdo (`<main>` e `<footer>`) para o **aluno logado que tem vínculo, na `turmaaluno`, com
  uma das turmas da lista** (a turma é descoberta pelo login, nunca digitada). Professor sempre
  vê, com o aviso das turmas liberadas; sem login, pede para entrar.
- ⚠️ É restrição de **exibição** (a página é estática e publicada): nunca colocar nela gabarito,
  dados pessoais ou outro conteúdo sensível.
- 📌 Primeira página: `INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html`
  (versão simplificada do trabalho em equipe), só para a turma **135081 — AI AOPL 2026/2 V1 · Tarde**.

## 👤 REGRA — E-MAIL DE LOGIN DO ALUNO: `nome.sobrenome@senai.local`

✅ **Todo aluno tem como login (Supabase Auth) o e-mail `nome.sobrenome@senai.local`.**
Registrada em 2026-09-28.

- ✅ `nome` = primeiro nome; `sobrenome` = **último** sobrenome. Ex.: Andrei Soares Fernandes →
  `andrei.fernandes@senai.local`.
- ✅ Minúsculas, sem acentos, cedilha, espaços, apóstrofos ou hífens (Fabián → `fabian`).
- ✅ O domínio `senai.local` é interno (não recebe e-mail): a confirmação de e-mail do Supabase
  Auth fica desligada.
- ✅ Se dois alunos gerarem o mesmo e-mail, usar o segundo nome no lugar do primeiro
  (ex.: `gabriel.henrique.schneider` → `henrique.schneider`) e avisar o usuário.
- ✅ Lista das turmas com os e-mails: `ATIVIDADES/LISTA-PRESENCA.js` de cada matéria.
  ⚠️ Dados pessoais de menores (LGPD): arquivo no `.gitignore`, nunca publicar.
