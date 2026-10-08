# 📚 Regras do projeto — Atividades, avaliações, respostas e gabarito

> Parte das regras do projeto aulasenai. **Vale como se estivesse no `CLAUDE.md`** (índice e regras de sempre no [`CLAUDE.md`](../../CLAUDE.md)). Ao alterar este arquivo, atualizar a **Versão das regras** e o histórico no `CLAUDE.md`.

---

## 💾 REGRA CRÍTICA — ALTERNATIVAS SEMPRE SALVAS NO BANCO DE DADOS

⚠️ **Toda alternativa marcada pelo aluno em uma atividade DEVE ser salva no banco de dados
(Supabase, tabela `resposta_atividade`).** Registrada em 2026-09-28.

- ✅ Ler a atividade é livre; o **login** (Supabase Auth) é exigido **só para marcar** alternativas.
- ✅ Toda página de atividade com questões usa `- **Folha de respostas:** sim` no `.md` (o gerador
  inclui supabase-js, `js/supabase.js`, `js/login.js`, `assets/js/respostas-atividade-banco.js`,
  põe `data-login="sim"` e não embute o gabarito) e a atividade precisa estar cadastrada nas
  tabelas `atividade` + `gabarito`: acrescentar em `ATIVIDADES` de
  `scripts/gerar-seed-atividades.py`, gerar `database/*-seed-atividades.sql` e rodar no Supabase.
- ❌ **Não existe mais localStorage para as alternativas** — somente banco de dados. Se o banco
  estiver indisponível ou a atividade não estiver cadastrada, a marcação fica **bloqueada com
  aviso** — nunca cai para o navegador. O nome do aluno vem do login (não é digitado).
- ✅ "Finalizar" grava a entrega (`entrega_atividade`); depois dela as respostas não mudam (RLS).
- ✅ **"Finalizar" só entrega com TODAS as alternativas gravadas no banco** (2026-09-30): além de
  conferir a tela, espera as gravações em andamento, **relê do banco** as respostas da tentativa e
  usa o banco como verdade; se faltar alguma, bloqueia, destaca as questões e lista quais não
  estão gravadas (popup). O RLS também recusa entrega incompleta.
- ✅ O gabarito fica **só** na tabela `gabarito` (leitura exclusiva do professor); não embutir
  gabarito nas páginas dos alunos.
- ✅ Nota e acertos completos (item a item) aparecem só no painel do professor
  (`painel-professor.html`). **Exceção (2026-09-30):** depois de entregar, o aluno vê no início da
  atividade a **própria nota** (0 a 10) e, se for **≥ 7**, "Você atingiu a pontuação mínima que é
  7!"; se for menor, "Você não atingiu a pontuação mínima que é 7, solicite ao professor liberação
  da atividade para uma nova tentativa!". A conta é feita no banco (função `nota_da_tentativa`,
  `database/2026-09-30-nota-tentativa.sql`): devolve só acertos e total da própria tentativa
  entregue; o gabarito nunca sai do banco.
- 📄 Plano: `docs/respostas-atividades-banco-painel-professor.md`;
  SQL: `database/2026-09-28-atividades-gabarito.sql`.

### 🧾 Log de gravação das alternativas (desde 2026-10-06)

Toda alternativa **marcada, trocada ou apagada** em `resposta_atividade` gera uma linha em
**`log_resposta_atividade`** (letra anterior, letra nova, operação, data e hora), pelo gatilho
`resposta_atividade_log_trg`. **Grava só os registros novos** (desde 2026-10-06; as respostas
antigas não entram no log). Só o professor lê (alunos das turmas dele); ninguém grava pela API.
**Tela (2026-10-06):** no índice de atividades, ao lado do link de cada atividade cadastrada, o
professor tem o link pequeno **"🧾 LOG"**, que abre um modal com a lista de alunos (com a
quantidade de registros de cada um) e mostra o log do aluno escolhido (data e hora, tentativa,
questão, operação, de → para). Código: `assets/js/indice-log-alternativas.js` +
`assets/css/indice-log-alternativas.css`, carregados pelo `atividades-crud-modal.js` (todos os
índices). **Na atividade bloqueada o LOG também fica bloqueado** (sem clique), como os demais links do card. ❌ Não
desligar o gatilho nem apagar o log. SQL: `database/2026-10-06-log-resposta-atividade.sql`;
plano: `docs/log-resposta-atividade.md`.

### 👩‍🏫 Professor dentro da atividade

Registrada em 2026-09-30. Ao abrir uma atividade logado como PROFESSOR, o topo da página mostra
**"Respostas dos alunos nesta atividade"** (`assets/js/respostas-atividade-professor.js`): uma linha
por aluno e tentativa, com turma, situação, acertos, nota, **data e hora** e, na última tentativa
entregue do aluno, o botão **🔓 Liberar nova tentativa** (popup de confirmação). Acima da tabela há **abas por turma** (Todas as turmas + uma por turma, com a
quantidade de alunos) que filtram as linhas e o resumo; a turma escolhida é lembrada ao recarregar. Dados: função
`resumo_tentativas_atividade` (`database/2026-09-30-resumo-tentativas-professor.sql`); só o
professor consegue chamá-la.

**Combo "Aluno" (2026-10-07, pedido do usuário):** logo abaixo da identificação, o professor tem
**"🧑‍🎓 Respostas dos alunos"**: ao escolher um aluno (quem respondeu, com tentativa e entrega),
as alternativas marcadas por ele aparecem destacadas nas questões, **somente leitura**. Sem
escolha, as questões ficam sem marcação (as leituras filtram pelo `aluno_id` do usuário logado).
Código: `assets/js/respostas-aluno-professor.js` (o mesmo das discursivas), carregado pelo
`respostas-atividade.js`.

### 🕒 Horário da turma e liberação fora do horário

Registrada em 2026-10-01. O aluno só grava alternativas e entrega **dentro do horário da turma**
(`turma.hora_inicio`/`hora_fim`, imposto pelo RLS). A coluna **`atividade.atividade_liberada_fora_horario`**
(lista JSON de ids de alunos, padrão `[]`) libera a atividade fora do horário para os alunos da
lista (função `liberar_fora_horario`, só professor). ⛔ **Avaliações (página `AVALIACAO-*`:
objetivas 01/02, prática) nunca são liberadas** — seguem sempre o horário. SQL:
`database/2026-10-01-atividade-liberada-fora-horario.sql`; plano: `docs/atividade-liberada-fora-horario.md`.

### 🔁 Tentativas: até 3 por atividade, liberadas pelo professor

Registrada em 2026-09-30. Plano: `docs/regra-3-tentativas-atividade.md`;
SQL: `database/2026-09-30-tentativas-atividade.sql` (o professor roda no SQL Editor).

- ✅ O aluno responde cada atividade **até 3 vezes** (`MAXIMO_TENTATIVAS` no JS e
  `maximo_tentativas()` no banco). A **tentativa 1 é livre**; depois de entregar, o aluno **não
  refaz sozinho**.
- ✅ Nova tentativa **só o professor libera**: no `painel-professor.html`, escolhe a atividade,
  clica no **nome do aluno** e usa **🔓 Liberar nova tentativa** (RPC `liberar_nova_tentativa`,
  que exige perfil PROFESSOR, tentativa anterior entregue e limite de 3).
- ✅ A nova tentativa **abre em branco só nas questões que o aluno errou**: o banco copia apenas as
  respostas CERTAS (`resposta_atividade.herdada = true`); a página esconde as alternativas dessas
  questões e mostra "✅ Você já acertou esta questão na tentativa anterior" (resposta mantida e
  gravada, vale na nova entrega; `database/2026-09-30-nova-tentativa-so-erradas.sql`);
  as tentativas antigas ficam guardadas e o painel mostra uma aba por tentativa.
- ✅ **A nota vale a melhor tentativa entregue** (painel e CSV).
- ✅ **Nas avaliações (`AVALIACAO-*.html`) a tentativa se chama RECUPERAÇÃO** (2026-09-30): a 1ª
  vez é a "avaliação" e as seguintes são "recuperação 1" e "recuperação 2", com a mesma lógica
  (só reabrem as questões erradas). Quem atinge 7 na avaliação **não** tem recuperação. Textos
  em `assets/js/termos-tentativa.js` (vocabulário único, escolhido pelo nome da página; o
  `painel-professor.html` escolhe pela página de cada atividade).
- ✅ Tabelas: `tentativa` em `resposta_atividade` e `entrega_atividade` (chaves incluem a
  tentativa) e `liberacao_atividade` (só a função grava). O RLS só deixa gravar na tentativa em
  andamento e antes de entregar.
- ✅ **Mensagens de confirmação:** cada resposta gravada mostra o aviso "✅ Resposta gravada:
  questão NN = X" (falha: "❌ Resposta NÃO gravada"); "Finalizar" pede confirmação e, ao gravar,
  avisa a tentativa entregue e o que fazer em seguida.

### ✍️ Avaliações discursivas (resposta escrita, corrigida depois com IA)

Registrada em 2026-10-01. Plano: `docs/avaliacao-pratica-discursiva-itic.md`.

- ✅ Fonte: `ATIVIDADES/CONTEUDO/<NOME>.md` com `## ITEM NN — Título`, `- **Aula:**`, `**Contexto:**`,
  `**Comando:**` e `**Tópicos:**` (`- a) enunciado (0,5)`); os tópicos de cada questão somam 1 ponto.
  Padrão de resposta e critérios para a IA em `<NOME>-GABARITO.md` (fora do Git).
- ✅ Gerador: `C:\Python314\python.exe assets\gerador-avaliacao-discursiva\gerar_avaliacao_discursiva.py
  <pasta ATIVIDADES> [<NOME>.md]` → página `<NOME>.html` (um campo por tópico) e seed
  `database/<data>-<nome>-seed-atividades.sql` (fora do Git; a avaliação nasce bloqueada).
- ✅ **Campos opcionais da fonte (2026-10-08, pedido do usuário):** `- **PDF compacto:** sim`
  (PDF com fonte e espaços menores, sem a linha "Aula" e a caixa de capacidade de cada questão),
  `- **PDF sem respostas:** sim` (PDF sem as caixas de resposta e com a instrução de responder no
  caderno; a página continua com os campos) e `- **Máximo de caracteres:** N` (limite de cada
  resposta; padrão 3000). Primeira: discursiva de sexta da ITIC (id 81), 20 questões, PDF em 3
  páginas.
- ✅ Banco: `resposta_discursiva` (texto por aluno, tentativa, item e tópico) e `topico_discursivo`
  (enunciado, pontos, padrão de resposta; só o professor lê). `atividade_completa()` exige todos
  os tópicos gravados para entregar. SQL: `database/2026-10-01-respostas-discursivas.sql`.
- ✅ Página: `assets/js/respostas-discursivas-banco.js` (dados) + `assets/js/avaliacao-discursiva.js`
  (tela) + `assets/css/avaliacao-discursiva.css`. Gravação automática 1,5 s após parar de digitar,
  sem localStorage; "Finalizar" relê o banco e lista os tópicos faltando. Valem login, horário da
  turma, bloqueio pelo professor e recuperação (a nova tentativa abre em branco).
- ✅ **Exportar PDF no padrão SENAI (2026-10-06, pedido do usuário):** toda página discursiva
  tem a barra com **"📥 Exportar PDF"** (+ lista "Turma" do professor), com o mesmo cabeçalho SENAI
  das objetivas (ATIVIDADE AVALIATIVA, Desempenho, Data, Docente, UC, Turma, Estudante), quadro
  CAPACIDADES, uma tabela por questão (capacidade, contexto, comando, tópicos com pontos e o
  espaço da resposta — a resposta já digitada pelo aluno logado entra no PDF) e "Página X de Y".
  Nunca leva o padrão de resposta. Código: `assets/js/exportar-pdf-discursiva.js`, carregado pelo
  `avaliacao-discursiva.js` (vale para todas as discursivas, sem regerar páginas).
- ✅ **Combo "Aluno" do professor (2026-10-07, pedido do usuário):** no painel da página, o
  professor tem a lista **"🧑‍🎓 Respostas dos alunos"** (quem respondeu, com tentativa e situação
  da entrega); ao escolher um aluno, as respostas dele aparecem nos campos, **somente leitura**
  (nada é gravado). Os campos do professor ficam **vazios até ele escolher** — as leituras da
  página filtram sempre pelo `aluno_id` do usuário logado (o RLS deixa o professor ler os alunos
  das turmas dele). Código único (objetivas e discursivas):
  `assets/js/respostas-aluno-professor.js` (+ `assets/css/respostas-aluno-professor.css`),
  carregado pelo `avaliacao-discursiva.js` e pelo `respostas-atividade.js`.
- ✅ **Correção (2026-10-06)**, plano `docs/media-final-notas-do-aluno.md`, SQL
  `database/2026-10-06-notas-media-final-correcao-discursiva.sql` (aplicado):
  - tabela **`correcao_discursiva`**: nota de cada tópico por aluno e tentativa; `nota_ia` é só
    sugestão e **`nota_professor` é a que vale**; o trigger impede passar dos pontos do tópico.
    RLS: professor só dos alunos das turmas dele; o aluno lê só as próprias notas confirmadas;
  - tela **`correcao-discursiva.html`** (menu **CORREÇÃO** no header, só Professor Administrador desde 2026-10-07):
    avaliação → turma → entrega; resposta do aluno, padrão de resposta e critérios por tópico.
    O botão "📋 Copiar prompt para a IA" monta o texto **sem o nome do aluno**; a resposta da
    IA (`ITEM 01-a: 0,3 | ...`) é colada e lida. ❌ A página **não chama API de IA** (nenhuma
    chave no site). Código: `assets/js/correcao-discursiva-repositorio.js` (dados),
    `correcao-discursiva-ia.js` (prompt e leitura), `correcao-discursiva-pagina.js` (tela) +
    `assets/css/correcao-discursiva.css`;
  - a nota da discursiva só conta quando **todos** os tópicos da tentativa têm nota do professor.
- ✅ **Média final do aluno** (`AVALIACAO-MEDIA-FINAL.html`): as notas vêm da função
  **`notas_media_final(p_paginas)`** (só o aluno logado, sem gabarito). A nota já conquistada
  aparece **mesmo se a atividade for bloqueada depois**. Discursiva entregue e ainda sem correção
  completa mostra **"Aguardando correção"**.
- ✅ **Bloqueio de colar nas discursivas (2026-10-08, pedido do usuário):** o aluno é obrigado a
  **digitar** cada resposta. Campo opcional `- **Bloquear colar:** sim` no cabeçalho da fonte `.md`
  → o gerador põe `data-bloquear-colar="sim"` no `<body>` e o
  `assets/js/bloqueio-colar-discursiva.js` (incluído em toda página gerada, só age com o atributo)
  cancela **colar, arrastar texto para dentro, copiar e recortar** nos campos de resposta e
  mostra um popup. Não é 100% (extensões e ditado por voz passam); prova com pesquisa continua
  permitida — o aluno lê e escreve com as próprias palavras.
  - **1º uso:** Prova Prática ADAG (id 82, `PROVA-PRATICA-ADAG-SALETE.md`).
  - ⏳ **Futuro (pendência no `STATUS.md`):** ligar o campo nas **outras avaliações
    discursivas** (fonte `.md` + regerar a página), uma por vez, quando o usuário pedir. Opcional
    (tarefa grande, mexe no banco): registrar as tentativas de colar para o professor ver.
- ✅ **Campo do tamanho da resposta (2026-10-08, pedido do usuário):** campo opcional
  `- **Campo do tamanho da resposta:** sim` → cada campo nasce com a altura da resposta esperada
  (padrão de resposta × 1,5 de folga ÷ 70 caracteres por linha; mínimo 5, máximo 16 linhas) e
  **cresce enquanto o aluno digita** (`assets/js/campo-tamanho-discursiva.js`). 1º uso: Prova
  Prática ADAG (id 82); nas outras discursivas, ligar junto com o bloqueio de colar.
- ✅ **Botão "💾 Gravar" em cada tópico (2026-10-08, pedido do usuário):** campo opcional
  `- **Botão gravar:** sim` → cada tópico ganha o botão, que grava na hora (`gravarPeloBotao` em
  `assets/js/avaliacao-discursiva.js`). **As duas opções valem juntas:** a gravação automática
  (1,5 s depois de parar de digitar e ao sair do campo) continua. 1º uso: Prova Prática ADAG (id 82).
- ✅ **Entrega só com tudo preenchido (já existia):** ao clicar em "Finalizar e entregar", a página
  confere no banco os tópicos sem texto (só espaços conta como vazio), destaca e lista os que faltam;
  o RLS da `entrega_atividade` também recusa a entrega incompleta.

## 🏫 REGRA CRÍTICA — TURMA NA EXPORTAÇÃO DE ATIVIDADES E AVALIAÇÕES (PROJETO TODO)

Registrada em 2026-10-03. Vale para **todas** as atividades e avaliações de **todas** as matérias.

- ✅ Ao exportar (PDF da atividade/prova completa e **Gabarito** do professor), o campo
  **Turma** do PDF é preenchido com a **turma selecionada** — não fica a linha em branco quando o
  professor tem turma.
- ✅ **Lista (combo) "Turma" antes dos botões de exportar**, no início da `.export-bar`, só para o
  PROFESSOR logado:
  - professor com **1 turma** → ela já vem selecionada;
  - professor com **mais de uma turma** → a lista começa em "Selecione a turma…" e ele **tem de
    escolher**; sem escolha, a exportação para com o popup "Selecione a turma antes de exportar.";
  - turmas visíveis: as dos vínculos dele na `turmaprofessor`; o Professor Administrador
    (`eh_professor_administrador()`) vê todas.
- ✅ Aluno, usuário sem login ou professor sem turma: sem lista; o campo Turma do PDF fica em
  branco para preencher à mão.
- ✅ Código único: `assets/js/turma-exportacao.js` (carregado sozinho pelo `assets/js/atividade.js`,
  que gera os PDFs) + `assets/css/turma-exportacao.css` (incluído pelo próprio módulo). Página
  nova de atividade ou avaliação com exportação **deve usar o `atividade.js`** (não repetir a
  lógica por página).
- ✅ Página com PDF próprio (fora do `atividade.js`) carrega o `turma-exportacao.js` direto e usa
  `await obterTurmaParaExportacao()` (retorno `null` = cancelar a exportação).

## 🔑 REGRA CRÍTICA — GABARITO COM AS RESPOSTAS CERTAS: SÓ O PROFESSOR

Registrada em 2026-09-30. Vale para **todos os alunos**. **Única exceção (2026-10-06, pedido do
usuário):** a liberação pelo professor, por atividade e turma, depois que todos entregaram.

- ✅ O gabarito real (alternativas certas) só o **professor** lê: tabela `gabarito` com RLS de professor;
  nunca embutido nas páginas.
- ✅ Nas avaliações e atividades, no fim da página: **Exportar Gabarito** (professor = gabarito
  real; aluno = ver a liberação abaixo). ⛔ O botão **"📥 Exportar PDF com gabarito"** foi
  **removido** de todas as páginas e do gerador em 2026-10-06 (pedido do usuário); fica só a
  variante "📥 Gabarito" (`data-modo="gabarito"`, só professor) onde já existia.
- ✅ **REGRA GLOBAL: vale para todas as avaliações e atividades de todas as matérias e de todos
  os cursos** (2026-10-06, pedido do usuário; hoje 53 páginas objetivas): toda atividade com
  folha de respostas no banco (`data-login="sim"`) ganha o botão "🔑 Exportar Gabarito" (inserido
  pelo `assets/js/atividade.js`, que carrega o `avaliacao-pdf-professor.js`), e o gabarito só é
  liberado **depois que todos os alunos da turma entregaram**.
- ✅ **Liberar gabaritos (2026-10-06)** — plano `docs/liberacao-respostas-por-turma.md`, SQL
  `database/2026-10-06-liberacao-respostas-turma.sql` (✅ aplicado):
  - no quadro "Respostas dos alunos nesta atividade", o professor tem o botão
    **"🔓 Liberar gabaritos (turma X)"** (turma da aba), que **só funciona quando todos os alunos
    da turma entregaram** (senão fica desativado com "Faltam N aluno(s) entregar"); depois vira
    "🔒 Recolher gabarito". Código: `assets/js/liberacao-respostas-professor.js` (+ css);
  - grava o código da turma em `atividade.gabarito_liberado` (função `liberar_gabarito_turma`);
  - **depois da liberação, nenhuma nova tentativa nem recuperação** para os alunos da turma
    (trigger em `liberacao_atividade`);
  - **aluno** clica em "Exportar Gabarito": se a turma dele foi liberada e ele entregou, recebe o
    gabarito real (função `solicitar_gabarito`); senão vê **"Aguarde professor liberar os
    gabaritos"** e o pedido é gravado na tabela **`tentativaacessogabarito`** (atividade, aluno,
    data e hora; só o professor lê).
- ✅ **Também nas DISCURSIVAS** (2026-10-06, pedido do usuário; 19 páginas): o "gabarito" é o
  padrão de resposta (`topico_discursivo.resposta_esperada`, só do professor). No painel da página
  (`assets/js/liberacao-respostas-discursiva.js`, carregado pelo `avaliacao-discursiva.js`):
  professor escolhe a turma e usa o mesmo **"🔓 Liberar gabaritos (turma X)"** (só com todos
  entregues); aluno clica em **"🔑 Ver Gabarito"** — antes da liberação, "Aguarde professor
  liberar os gabaritos" + registro em `tentativaacessogabarito`; depois, a resposta esperada de
  cada tópico aparece abaixo da resposta dele (função `solicitar_gabarito_discursivo`; SQL
  `database/2026-10-06-liberacao-respostas-discursiva.sql`, ✅ aplicado).
- ❌ Fora dessa liberação, nenhuma tela, PDF ou consulta entrega ao aluno a alternativa certa
  nem o padrão de resposta das discursivas.
  Código: `assets/js/avaliacao-pdf-professor.js`.

## 📑 REGRA CRÍTICA — ÍNDICES DE ATIVIDADES: SÓ HTML, EM ORDEM DE DATA

⚠️ **Todo índice de atividades (`<MATERIA>/ATIVIDADES/index.html`) lista SOMENTE páginas
HTML, em ordem crescente de data.** Vale para todas as matérias de todos os cursos. Registrada em
2026-09-27.

- ✅ Só arquivos `.html` entram no índice. ❌ `.docx`, `.pdf`, `.md` e outros formatos **não**
  aparecem (continuam na pasta, mas fora do índice).
- ✅ Ordem pela data `DD-MM-AAAA` do nome do arquivo, da mais antiga para a mais nova
  (ex.: `ATIVIDADE-EXCEL-29-09-2026.html` antes de `ATIVIDADE-EXCEL-01-10-2026.html`).
- ✅ Páginas sem data no nome vão para o fim, em ordem alfabética.
- ✅ A regra está em `assets/gerador-indices/gerar_indices.py`; depois de criar ou renomear uma
  atividade, rodar o gerador de novo. Não editar os índices gerados à mão.
- ✅ Atividade que hoje existe só em `.docx`/`.pdf` precisa ganhar uma versão HTML para aparecer
  (ex.: Exploração de Carreiras, que está como "Nenhuma atividade").
- ⚠️ Índices sem o marcador `gerador-indices` (feitos à mão, como o de Introdução à TIC) são
  preservados; seguir a mesma regra ao editá-los.
- ✅ **Nome do interruptor de bloqueio** (2026-09-30, vale para os índices de **todas** as
  matérias): no card do professor, o interruptor se chama **"Desbloquear"** quando a atividade
  está bloqueada e **"Bloquear"** quando está liberada; o nome muda na hora ao clicar. Fica no
  script genérico `assets/js/indice-atividades-bloqueio.js` (não repetir por matéria).
- ✅ **BLOQUEIO DE ATIVIDADE POR TURMA — REGRA GLOBAL** (2026-10-05, índices de **todas** as
  matérias; plano `docs/bloqueio-atividade-por-turma-favorita.md`; SQL
  `database/2026-10-05-bloqueio-atividade-por-turma.sql`, aplicado no banco):
  - o interruptor **Bloquear/Desbloquear** do card vale **só para a turma favorita**
    (`turma.favorito`) e mostra a turma: "Bloquear (turma X)" / "Desbloquear (turma X)". **As
    outras turmas não são afetadas.** Sem turma favorita marcada, avisa (popup) e não grava;
    trocar a favorita na barra do índice remonta os interruptores;
  - coluna **`atividade.bloqueio`** (JSON com os **códigos das turmas** bloqueadas, padrão `[]`):
    turma fora da lista = **liberada** (sem vínculo = liberado sempre);
  - gravação **só** pela função `definir_bloqueio_turma(atividade, turma, bloquear)` (professor
    da turma, via `professor_tem_turma`; administrador em todas). ❌ Não gravar `bloqueio` à mão
    nem voltar a usar o interruptor para mudar `atividade.ativo`;
  - `atividade.ativo = false` (CRUD "CADASTRAR ATIVIDADES") continua bloqueando **todas** as
    turmas; liberar para a favorita uma atividade inativa faz `ativo = true` e põe as outras
    turmas em `bloqueio` (elas continuam bloqueadas);
  - aluno: vê a atividade se **alguma** turma dele (`turmaaluno`) estiver liberada; aluno sem
    turma e visitante, liberado. Garantido no banco pela política `atividade_select` e por
    `item_valido`/`topico_valido` (função `atividade_liberada_para_usuario`);
  - relatórios (`relatorioAtividades.html`) contam média e totais só com as atividades
    **liberadas para a turma** da aba. Código novo que liste atividades "ativas" de uma turma
    deve considerar `ativo` **e** `bloqueio`.
- ✅ **Visual da atividade bloqueada — REGRA GLOBAL** (2026-09-30, todas as atividades de todas as
  matérias, para aluno e professor): o card bloqueado fica **bem escurecido** e com um **cadeado
  grande (🔒) na frente do card**. Estilo único em `assets/css/indice-atividades.css`
  (`.aula.bloqueada` e `.aula.bloqueada-professor`, tokens `--bloqueio-*`). **Para o aluno e o
  visitante, o card bloqueado fica inteiro inacessível** (2026-10-06, pedido do usuário): todos
  os links do card (atividade, slides, PDFs...) perdem o `href`, o véu recebe o clique e qualquer
  clique mostra "Atividade Bloqueada!" (`bloquearCardAtividade` em
  `assets/js/indice-atividades-bloqueio.js`). **Para o professor, os links do card bloqueado
  também ficam desativados** (2026-10-06, `definirLinksCardProfessor`: o `href` é guardado em
  `data-href-bloqueado` e volta ao desbloquear); o interruptor e os botões do professor
  continuam clicáveis, por cima do véu (`assets/css/indice-atividades-bloquear.css`). Todo índice de atividades carrega esses arquivos
  (via `atividades-crud-modal.js`); índice novo, feito à mão ou gerado, também deve carregá-los.
- ✅ **Turma favorita no índice — REGRA GLOBAL** (2026-09-30, índice de atividades de **todas**
  as matérias): para o professor logado, abaixo do resumo do `ATIVIDADES/index.html` aparece a
  barra **"Turma: [lista] ☆ Marcar como turma favorita"** (a favorita tem ⭐ na lista). Grava
  `turma.favorito` pela função `definir_turma_favorita` (só uma favorita). Código:
  `assets/js/indice-turma-favorita.js` + `assets/css/indice-turma-favorita.css`, carregados por
  `atividades-crud-modal.js` junto com `assets/js/turma-favorita.js` (não repetir por matéria).

## 📗 REGRA CRÍTICA — PADRÃO DE ATIVIDADE PRÁTICA DE EXCEL

⚠️ **Toda atividade prática de Excel (ou LibreOffice Calc) segue este padrão de detalhamento e
facilidade.** Registrada em 2026-09-27. Modelo: `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/
ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/ATIVIDADE-EXCEL-29-09-2026.md`.
Gerador reutilizável: `assets/gerador-atividade-excel/gerar_atividade_excel.py <pasta da atividade>`
(lê o `atividade.json` e gera capa, questões e imagens SVG).

- ✅ **Plano primeiro:** antes do HTML, criar `ATIVIDADE-EXCEL-<DD-MM-AAAA>.md` com tudo o que será
  feito (questões, passos, imagens, tempos, pontuação, gabarito) e **aguardar aprovação**.
- ✅ **Fonte:** o Markdown das aulas indicadas e o `EMENTA-CHALKIE-AI.md` da matéria (a ementa
  vence; nunca extrair de PDF — regra "CONTEÚDO SÓ PELOS MARKDOWNS"). Contexto profissional do
  curso (ex.: almoxarifado), **sem empresa fictícia**: o aluno atua como
  **"Você como aluno consultor"** (regra global de 2026-10-08).
- ✅ **Tempo realista:** somar o tempo de cada questão + abertura + entrega e caber na duração
  pedida (ex.: 3h a 3h30). Tabela de tempos no plano e na capa.
- ✅ **Arquivos:** uma capa `ATIVIDADE-EXCEL-<data>.html` (contexto, tempos, pontuação, links) e
  **um HTML separado por questão** na pasta `ATIVIDADE-EXCEL-<data>/`.
- ✅ **Passo a passo:** cada questão é dividida em passos numerados; **cada passo tem uma imagem**
  (tela ilustrada do Excel com o local a clicar destacado) **e o detalhamento completo** do que
  fazer (onde clicar, o que digitar, fórmula exata, resultado esperado).
- ✅ **Planilha cumulativa:** as questões constroem um único arquivo, aba por aba, para o aluno
  ver o progresso; dados iniciais em tabela pronta **para copiar e colar** (botão Copiar; o
  aluno não digita a base).
- ✅ **"Verifique":** caixas nos pontos-chave dizendo o que observar (sem revelar valores). Os
  valores esperados ficam só no gabarito do professor, salvo pedido diferente.
- ✅ **Avaliativa e clara:** deixar explícito que é atividade prática avaliativa (pontuação por
  questão, critérios, nota mínima da ementa), sem dificultar o entendimento: linguagem simples,
  um comando por passo, dica para erros comuns e alternativa do LibreOffice Calc quando o menu
  for diferente.
- ✅ **Gabarito do professor** separado, com as fórmulas e os valores esperados.
- ✅ Seguir a regra de `assets/`: sem `<style>`/`<script>` embutidos; CSS e JS em `assets/`.
- ✅ **Dados prontos e nota na formatação** (2026-09-29): questões de **formatação** usam uma
  **base grande (100 linhas ou mais)** que o aluno **não digita**: a página tem a tabela com o
  botão **📋 Copiar** (`tabela_dados` no `atividade.json`) e ele cola em `A1`. **A digitação dos
  dados não vale nota**; os critérios cobram só a formatação (formatos, alinhamento, bordas,
  formatação condicional, congelar painéis, filtros, impressão). A base entra em `planilhas`
  (versão crua para copiar e versão formatada para as imagens).
- ✅ **Questões novas junto do conteúdo das aulas:** ao acrescentar questões, elas **abrangem os
  conteúdos dos arquivos das aulas indicados** (funções, SE, CONT.SE/SOMASE, PROCV/SEERRO,
  formatação condicional, filtros...) e são **simples**, cabendo no tempo pedido (ex.: 4 questões
  em 1h30). Ao acrescentar, **redistribuir tempo e pontos** (o total continua 10) e ajustar
  capa, gabarito, menus e critérios (a soma dos critérios de cada questão = pontos da questão).
- ✅ A **entrega do arquivo** (Salvar Como `.xlsx`) fica na **última questão**.

## 🔂 REGRA CRÍTICA — GERAR E GRAVAR UMA AULA POR VEZ, COMPLETA, COM `AULAS/STATUS-AULAS.md`

⚠️ **Sempre que for gerar aulas (ou o material de uma aula: atividade de 50 questões, prática,
avaliação, slides), gerar e gravar UMA aula por vez, COMPLETA, e só então passar para a próxima.**
Vale para **todas as aulas de todas as matérias**. Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Aula completa** = todas as peças pedidas daquela aula prontas e gravadas no disco antes de
  começar a seguinte: fonte `.md`, página `.html` gerada pelo gerador, conferência (quantidade de
  itens, gabarito ausente do HTML), índice da matéria atualizado e entrada no seed do banco quando
  houver folha de respostas.
- ❌ Não escrever as fontes de várias aulas para gerar tudo no fim; não deixar aula pela metade
  ao passar para a próxima.
- ✅ **Controle de status:** cada matéria tem `<MATERIA>/AULAS/STATUS-AULAS.md`, com uma linha por
  aula e uma coluna por peça (`⬜ Pendente`, `🔄 Em progresso`, `✅ Concluído`,
  `⛔ Não se aplica`). Atualizar o arquivo **ao concluir cada aula** (e marcar 🔄 ao começar).
  Se o arquivo não existir, criá-lo antes de gerar a primeira aula.
- ✅ Ao retomar um trabalho interrompido, ler o `STATUS-AULAS.md` e continuar da primeira aula que
  não está ✅.
- ✅ Aplicar o seed no Supabase continua dependendo de pedido do usuário (registrar no status).
- ⚠️ Respeita `STATUS-PERMISSAO-EMENTA`, matérias semelhantes e a exceção de
  `QUALIFICACAO-PROFISSIONAL/`.

## 📝 REGRA CRÍTICA — 1 ATIVIDADE OBJETIVA DE 50 QUESTÕES POR AULA + `ATIVIDADES/STATUS-ATIVIDADES.md`

⚠️ **Toda aula de toda matéria deve ter 1 atividade objetiva de 50 questões** (múltipla escolha
A–D), e **cada pasta `ATIVIDADES/` de matéria tem o arquivo `STATUS-ATIVIDADES.md`** com o controle
dessas atividades. Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Atividade objetiva da aula** = `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` (nomes antigos
  já publicados, como `ATIVIDADES-N-TEMA-50-QUESTOES.html` ou com data, continuam valendo), com
  **exatamente 50 questões**, fonte em `ATIVIDADES/CONTEUDO/*-50-QUESTOES.md` (fora do Git, tem
  gabarito), gerada por `assets/gerador-atividades/gerar_atividades.py`, com folha de respostas no
  banco (`- **Folha de respostas:** sim`) e cadastro em `atividade` + `gabarito` (seed).
- ❌ Página com menos de 50 questões **não conta** como a atividade objetiva da aula (fica ⚠️ no
  status até ser completada); práticas, avaliações e atividades de Excel são **adicionais**.
- ✅ **`STATUS-ATIVIDADES.md`**: uma linha por aula (aula, tema, página, nº de questões, fonte,
  banco, status) e a lista das demais atividades da pasta. Atualizar **sempre** que uma atividade
  for criada, alterada, cadastrada no banco ou liberada/bloqueada; criar o arquivo se não existir.
- ✅ Gerar as que faltam seguindo a regra "UMA AULA POR VEZ, COMPLETA" (fonte → HTML → conferência
  de 50 itens e gabarito ausente → índice → seed), atualizando o `STATUS-ATIVIDADES.md` e o
  `AULAS/STATUS-AULAS.md` a cada aula. Gerar em massa continua exigindo plano em `docs/` e aprovação;
  aplicar o seed no Supabase só com pedido do usuário.
- ✅ As questões seguem a aula em `<MATERIA>/CONTEUDO/AULA-NN-*.md` (regra "AULAS EXTRAÍDAS DA
  EMENTA EM `CONTEUDO/`") e o `EMENTA-CHALKIE-AI.md` (a ementa vence); gabarito com letras
  equilibradas (12–13 de cada) e posição sorteada.
- ⚠️ Respeita `STATUS-PERMISSAO-EMENTA` e matérias semelhantes. Em `QUALIFICACAO-PROFISSIONAL/` a
  ementa é só do professor: as atividades usam as aulas/ementa como **leitura**, e matéria sem aulas
  definidas fica aguardando o professor.
- ✅ **Aulas de avaliação** (decisão do usuário, 2026-10-03): a **Aula 15 de Fundamentos de
  Automação/Instrumentação** (avaliação integradora) tem atividade objetiva de **20 questões**;
  as demais aulas de avaliação (ex.: Eletricidade aula 09) seguem com **50 questões**; Reforço
  de Linguagens segue a regra exclusiva dela (25 questões).
- ✅ **Banco na geração das pendentes** (plano `docs/gerar-atividades-50-questoes-todas-materias.md`,
  2026-10-03): o usuário autorizou **aplicar o seed no Supabase ao finalizar cada matéria**.
- ⏳ **Fila:** gerar **somente uma matéria por vez, na ordem que o usuário liberar**; as demais
  aguardam. Primeira liberada (2026-10-03): **Testes de Frontend**.

## 🗣️ REGRA EXCLUSIVA — REFORÇO DE LINGUAGENS: 25 QUESTÕES POR ATIVIDADE (20 OBJETIVAS + 5 DISCURSIVAS)

Registrada em 2026-10-06 a pedido do usuário. Vale **somente** para a matéria
`MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/` e para **todas as atividades** dela; as
demais matérias continuam com a regra "1 ATIVIDADE OBJETIVA DE 50 QUESTÕES".

- ✅ **Cada atividade tem exatamente 25 questões:** **20 objetivas** (múltipla escolha A–D, padrão
  ITEM com `- **Capacidade:**`, Contexto quando houver, Comando, Alternativas e Gabarito) e
  **5 discursivas**.
- ✅ **Cada questão discursiva tem Contexto, Comando e um campo para o aluno digitar** a resposta
  (gravada no banco, sem localStorage, como nas avaliações discursivas).
- ✅ **Correção das 5 discursivas em duas etapas:** conferência com **IA** (a partir do padrão de
  resposta e dos critérios no `-GABARITO.md`, fora do Git) **e análise do professor**, que
  confirma ou ajusta a nota sugerida. A nota da discursiva só vale depois da análise do
  professor.
- ✅ **10 aulas, uma por apresentação de `AULAS-CHALKIE-AI/`** (2026-10-06, decisão do usuário;
  plano `docs/reforco-linguagens-10-aulas-e-atividades.md`): **exceção** à regra "1 aula a cada
  4 h" — aulas 01 a 07 com 6 h e 08 a 10 com 7 h (total 63 h, a carga da UC). As aulas ficam em
  `REFORCO_LINGUAGENS/CONTEUDO/AULA-NN-DESCRICAO.md`; as 16 aulas antigas de 4 h foram
  guardadas em `AULAS/LEGADO-16-AULAS/` (não são mais usadas).
- ✅ **Link dos slides em toda atividade:** a fonte tem `- **Slides:** ../AULAS-CHALKIE-AI/<N>-....pdf`
  e os geradores mostram "Slides da aula: 📕 Slides (PDF)" nas instruções da página. Os PDFs de
  `AULAS-CHALKIE-AI/` são publicados (exceção no `.gitignore`).
- ✅ **Fonte do conteúdo das atividades = SEMPRE
  `REFORCO_LINGUAGENS/AULAS-CHALKIE-AI/CONTEUDO/AULA-NN-*.md`** (2026-10-06, pedido do usuário):
  os slides de cada aula convertidos em Markdown (um arquivo por aula, 10 aulas). Objetivas e
  discursivas são escritas lendo esse arquivo da aula (`- **Conteúdo-base:**
  ../AULAS-CHALKIE-AI/CONTEUDO/AULA-NN-....md` na fonte); nunca ler os PDFs da pasta, e as
  aulas antigas de `AULAS/AULA-NN.md` não são mais fonte das atividades.
- ✅ **As duas pastas `CONTEUDO` se completam** (conferido em 2026-10-07): `REFORCO_LINGUAGENS/CONTEUDO/AULA-NN-*.md`
  é o **plano da aula** (módulo, horas, capacidades, indicadores, roteiro, com link para os slides)
  e `AULAS-CHALKIE-AI/CONTEUDO/AULA-NN-*.md` é o **conteúdo dos slides**, de onde saem as questões.
  As 10 aulas já têm as duas páginas de atividades; aula que ficar **sem** atividade ganha as
  páginas desta regra (20 objetivas + 5 discursivas).
- ✅ As objetivas seguem o gabarito equilibrado entre as letras e com posição sorteada; as
  discursivas citam o texto ou a situação da aula (do mesmo arquivo de
  `AULAS-CHALKIE-AI/CONTEUDO/`).
- ✅ **Duas páginas por aula** (decisão do usuário em 2026-10-06, sem mudar o banco):
  - **objetivas:** `ATIVIDADES/ATIVIDADES-AULA-NN-20-QUESTOES.html`, fonte
    `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-20-QUESTOES.md` (fora do Git, tem gabarito), gerada por
    `assets/gerador-atividades/gerar_atividades.py --so=` e cadastrada pelo
    `scripts/gerar-seed-atividades.py` (grupo da matéria);
  - **discursivas:** `ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-NN.html`, fonte
    `ATIVIDADES/CONTEUDO/ATIVIDADE-DISCURSIVA-AULA-NN.md` (cada item com Contexto, Comando e um
    tópico `- a) ... (1,0)`) + `-GABARITO.md` (padrão de resposta e critérios para a IA, fora do
    Git), gerada por `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`
    (nasce bloqueada; o professor libera no índice).
- ✅ O seed das objetivas roda **antes** do das discursivas (ele cria a aula no banco). O
  `STATUS-ATIVIDADES.md` da matéria controla as duas páginas (20 + 5) de cada aula.
- ❌ Não aplicar esta regra a outras matérias, nem às matérias semelhantes, sem pedido do usuário.

## 🏦 REGRA — BANCO DE QUESTÕES DO AVA SENAI (MOODLE XML)

Registrada em 2026-10-03 a pedido do usuário. Plano: `docs/banco-questoes-ava-senai-moodle-xml.md`.
**Status:** ✅ piloto **Introdução à TIC** gerado (13 atividades, 600 questões), aguardando a
importação no AVA pelo professor; as demais matérias só quando o usuário liberar, **uma por vez**.

- ✅ **Gerador único:** `C:\Python314\python.exe assets\gerador-banco-ava\gerar_banco_ava.py
  <pasta ATIVIDADES>` (`--so=ARQ.md` gera uma fonte só). Fonte = as mesmas
  `ATIVIDADES/CONTEUDO/*QUESTOES.md` das páginas (lidas por `ler_questoes()` do gerador de
  atividades); nada é digitado à mão no XML.
- ✅ **Saída em `ATIVIDADES/BANCO-AVA/`:** um `.xml` por atividade (mesmo nome da fonte) e o
  arquivo único `BANCO-AVA-<PASTA-DA-MATERIA>.xml`. Categorias `top/<uc_curta>/<rótulo> — <tema>`
  (iguais nos dois); questão de resposta única, 1 ponto, sem penalidade, ID
  `<PASTA>-<RÓTULO>-QNN`, tags = capacidades + rótulo; alternativas embaralhadas, exceto quando
  alguma cita as outras ("Todas as anteriores").
- ❌ **O XML contém as respostas certas:** `BANCO-AVA/` fica no `.gitignore`; nunca publicar,
  nunca versionar, nunca colocar link em página de aluno.
- ✅ **Importar no AVA:** Banco de questões → Importar → **Moodle XML**, com **"Obter categoria do
  arquivo"** marcado. Importar **ou** os arquivos por atividade **ou** o arquivo único (os dois
  juntos duplicam as questões).
- ✅ Depois de alterar uma fonte de questões, gerar o banco de novo e registrar no
  `STATUS-ATIVIDADES.md` da matéria.
- ⛔ **Sem botão "📥 Banco Moodle (AVA SENAI)" nas atividades** (removido de **todas** as
  atividades em 2026-10-06, a pedido do usuário; antes: plano
  `docs/botao-exportar-banco-moodle-atividade.md`). Os scripts `exportar-banco-moodle.js` e
  `banco-moodle-xml.js` foram apagados e o `atividade.js` não carrega mais nada do Moodle. O banco
  do AVA é gerado **só** pelo `assets/gerador-banco-ava/gerar_banco_ava.py`. Não recolocar sem
  pedido.
