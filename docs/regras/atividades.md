# 📚 Regras do projeto — Atividades, avaliações, respostas e gabarito

> Parte das regras do projeto aulasenai (índice e regras de sempre no [`AGENTS.md`](../../AGENTS.md) e em `.claude/rules/`). Ao alterar este arquivo, registrar a mudança em [`docs/HISTORICO-REGRAS.md`](../HISTORICO-REGRAS.md).

---

> ⚠️ **Regra nova (2026-10-11 06:01:03, `CLAUDE.md` "🗃️ REGRA — ATIVIDADES SÓ NO BANCO, LAYOUT GLOBAL E PASTA
> SÓ COM CONTEÚDO"):** questões da objetiva e da prática só no banco, layout global e nenhum HTML na
> pasta da matéria. O que está descrito aqui sobre páginas e fontes por aula é o jeito **atual**,
> que vale só até a migração da tarefa #25-b3e29764-940b-4a82; não criar página nova por aula sem o plano dela.

## 💾 REGRA CRÍTICA — ALTERNATIVAS SEMPRE SALVAS NO BANCO DE DADOS

⚠️ **Toda alternativa marcada pelo aluno em uma atividade DEVE ser salva no banco de dados
(Supabase, tabela `resposta_atividade`).** Registrada em 2026-09-28.

- ✅ Ler a atividade é livre; o **login** (Supabase Auth) é exigido **só para marcar** alternativas.
- ✅ Toda página de atividade com questões usa `- **Folha de respostas:** sim` no `.md` (o gerador
  inclui supabase-js, `js/supabase.js`, `js/login.js`, `assets/js/respostas-atividade-banco.js`,
  põe `data-login="sim"` e não embute o gabarito) e a atividade precisa estar cadastrada nas
  tabelas `atividade` + `gabarito`: acrescentar em `ATIVIDADES` de
  `scripts/gerar-seed-atividades.py`, gerar `database/*-seed-atividades.sql` e aplicar no Supabase
  quando o usuário pedir (regra "🌱 SEEDS DO BANCO" do `CLAUDE.md`).
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
**Botão escondido (2026-10-09, pedido do usuário):** o "🧾 LOG" não aparece mais em nenhum
índice (`LOG_ALTERNATIVAS_LIGADO = false` em `assets/js/atividades-crud-modal.js`); o log continua
sendo gravado no banco.

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

**Professor marca como entregue (2026-10-14, tarefa #45):** nas páginas com
`<body data-marcar-entregue="sim">` (objetivas e práticas), o professor tem
**"📨 Marcar como entregue"** na tentativa atual do aluno que não entregou e
**"↩️ Desfazer entrega"** na entrega que ele mesmo marcou (os dois com popup de confirmação).
- Não exige o mínimo de questões nem o horário: em branco conta como errada; quem nunca abriu
  fica com nota 0. Depois de marcada, o aluno não responde mais aquela tentativa.
- Desfazer só vale para entrega feita pelo professor, sem tentativa nova liberada e sem nota
  lançada (discursiva). A situação mostra **"📨 Entregue pelo professor"**.
- Onde aparece: "Respostas dos alunos" (objetivas, inclusive alunos sem resposta) e
  "Progresso da turma" (objetivas e práticas), que ganha a lista **"Alunos sem nenhuma resposta"**.
- Código: `assets/js/marcar-entregue-professor.js`, `assets/js/alunos-sem-inicio-entrega.js`;
  banco: `database/2026-10-14-professor-marca-entregue.sql` (`docs/database.md`).
- Ligado em Testes de Front-End; as demais matérias recebem o atributo nas tarefas #46 a #79.

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
  Padrão de resposta e critérios para a IA em `<NOME>-GABARITO.md` (no Git, fora do site).
- ✅ Gerador: `C:\Python314\python.exe assets\gerador-avaliacao-discursiva\gerar_avaliacao_discursiva.py
  <pasta ATIVIDADES> [<NOME>.md]` → página `<NOME>.html` (um campo por tópico) e seed
  `database/<data>-<nome>-seed-atividades.sql` (no Git, fora do site; a avaliação nasce bloqueada).
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
- ✅ **Progresso da turma para o professor (2026-10-08, pedido do usuário; GLOBAL em objetivas e
  discursivas desde 2026-10-09):** no **topo da atividade** (logo abaixo do cabeçalho), só para
  o professor, **aberto junto com a página** e **atualizado a cada 5 segundos**: uma linha por
  aluno com uma célula por questão (cinza = sem resposta, amarela = em andamento, verde =
  completa), barra do aluno, "N/20 questões · mín. M" ou "✅ Entregue", e no alto o resumo e a
  barra geral da turma. **Sem campo na fonte** (o antigo `Progresso para o professor` não é mais
  necessário). Código único: `assets/js/progresso-turma-global.js` (tela) +
  `assets/js/progresso-turma-fontes.js` (dados: objetiva × discursiva, no mesmo formato) +
  `assets/css/progresso-turma-global.css`, carregado pelo `avaliacao-discursiva.js`
  (discursivas) e pelo `respostas-atividade.js` (objetivas) só para o professor; o RLS limita
  às turmas dele; a leitura é paginada de 1000 em 1000 linhas. Plano:
  `docs/progresso-global-atividades.md`.
  - **Todos os alunos sempre (2026-10-14, #137):** a lista tem **todos os alunos das turmas do
    curso da atividade** (curso da aula, ou da matéria), também quem não respondeu nada (linha com
    0 questões). Vale em toda atividade com Progresso, as de hoje e as futuras. Código:
    `assets/js/alunos-da-turma-progresso.js`.
  - **Combo "Turma" (2026-10-14, #139):** ao lado do título "Progresso da turma", com as turmas
    do curso da atividade e "Todas as turmas"; abre na **turma favorita** (`turma.favorito`, com
    ⭐) quando ela é do curso. A lista (e o resumo, Gráficos e Cálculo Nota) fica **só com os
    alunos da turma escolhida**.
  - **Filtro "Questões respondidas" (2026-10-14, #135):** combobox acima do resumo, em toda
    atividade: **Todas**, **5 ou menos**, **6 a 10**, **11 a 15** e **16 a 20** questões completas
    (o número da coluna Situação); embaixo dos filtros, "Mostrando N de T alunos" conta a lista
    com todos os filtros (#146). Só filtra a lista na tela (o
    resumo continua com a turma toda). Código: `assets/js/filtro-respondidas-progresso.js`.
  - **Aluno: "📊 Meu progresso" (2026-10-14, #141):** na objetiva e na discursiva, o aluno logado
    vê no topo **só a própria linha** (célula por questão nas cores do painel, barra e "N de T
    questões respondidas"). **Nunca** mostra colegas, notas (nem acertos), suspeita de cópia,
    faltas, quantidade mínima, Gráficos, Cálculo Nota nem "Entregue". Só lê as respostas dele
    (RLS); banco sem mudança. Código: `assets/js/progresso-do-aluno.js`.
  - **ON/OFF "Tarefa Entregue?" (2026-10-14, #140):** acima do resumo, em toda atividade. Abre
    **desligado = só quem não entregou**; ligado = **só quem entregou** (revisão #146). Só filtra a lista na
    tela. Código: `assets/js/filtro-entregue-progresso.js` (chave ON/OFF comum
    `.progresso-turma__interruptor` em `progresso-turma-global.css`).
  - **Combo "Aluno" (2026-10-14, #143):** ao lado do combo "Turma", com "Todos os alunos" e os
    alunos da lista; escolhido um aluno, a lista mostra só a linha dele (resumo, Gráficos e
    Cálculo Nota seguem com a turma inteira). A escolha fica no localStorage (`progresso-turma:
    aluno`); aluno guardado fora da turma escolhida vale como "Todos os alunos". Código:
    `assets/js/filtro-aluno-progresso.js`.
  - **ON/OFF "RECUPERAÇÃO" (2026-10-14, #145):** depois do "Mostrar quem faltou". Vale só a
    **nota final**: **ligado** mostra quem pegou recuperação (nota final **menor que 7**);
    desligado (padrão), **7 ou mais** (invertido em 2026-10-14, #146). Aluno sem nota final continua na lista. Lembrado no localStorage
    (`progresso-turma:recuperacao`). Código: `assets/js/filtro-recuperacao-progresso.js`.
  - **ON/OFF "Prova Corrigida" (2026-10-14, #147):** depois do "RECUPERAÇÃO". Desligado
    (padrão) lista só as provas **não corrigidas**; ligado, só as **corrigidas**. Objetiva:
    **entregue = corrigida** (correção automática). Discursiva: entregue e com a **nota do
    professor** em todas as questões respondidas. Lembrado no localStorage
    (`progresso-turma:prova-corrigida`). Código: `assets/js/filtro-corrigida-progresso.js` e
    `provaCorrigida` em `progresso-turma-fontes.js`.
  - **Discursiva — ON/OFF "Mostrar Certas" (2026-10-14, #148):** ao lado de "🧑‍🎓 Respostas
    dos alunos". Desligado (padrão): ao escolher um aluno, a prova mostra só as questões **meia
    certa ou errada**; ligado, também as **certas** (todos os tópicos com nota cheia do
    **professor ou da IA** — qualquer das duas vale; corrigido na #152). Questão sem nota nunca
    some. Código:
    `assets/js/mostrar-certas-discursiva.js` + CSS.
  - **Discursiva — ON/OFF "Falta Corrigir?" (2026-10-14, #150):** ao lado de "Mostrar Certas".
    **Ligado (padrão)**: ao escolher um aluno, a prova mostra só as questões que o professor ainda
    **não corrigiu** (algum tópico sem nota do professor) ; desligado,
    mostra também as já corrigidas. Os dois filtros valem **juntos** (um não anula o outro). Só
    muda a tela. Mesmo arquivo do "Mostrar Certas".
  - **Filtros lembrados (2026-10-14, #142):** "Questões respondidas", "Tarefa Entregue?" e
    "Mostrar quem faltou" guardam a escolha no **localStorage** do navegador (chaves
    `progresso-turma:*`, só preferência de tela) e voltam ao abrir a página; sem escolha
    guardada, o padrão (Todas · desligado · desligado).
  - **Faltas (2026-10-14, #138):** ON/OFF **"Faltou?"** ao lado do nome de cada aluno grava a
    falta do aluno **no dia** da atividade (`falta_aluno`; vale para todas as atividades do dia);
    ON/OFF **"Mostrar quem faltou"** acima do resumo abre em **OFF** (esconde quem faltou). Dia =
    `atividade.data_atividade`, senão `aulas.data_planejada`; sem nenhuma, os botões ficam
    desligados. Quem faltou **entra nas contas** (resumo, Gráficos, Cálculo Nota). Código:
    `assets/js/falta-aluno-progresso.js` + CSS.
  - **Objetiva (2026-10-09):** colunas **"Nota parcial (acertos)"** (nota sobre o mínimo até
    agora, % de acerto nas questões respondidas e "(N/50)") e **"Nota final"** (só com a entrega),
    pelos acertos da função `resumo_tentativas_atividade` (o gabarito não sai do banco). As
    colunas abaixo, da IA, valem para as discursivas.
  - **Correção parcial pela IA** (2026-10-08): a IA corrige as alternativas já respondidas **antes
    da entrega** (cada alternativa uma vez) e **recorrige só após a entrega final** o que o aluno
    mudou depois da nota parcial (`correcao_discursiva.nota_ia_em`, SQL
    `database/2026-10-08-correcao-discursiva-nota-ia-em.sql`, aplicado). Colunas do painel:
    **"Nota parcial IA"** (soma do que a IA já corrigiu, com o **% de acerto** nas alternativas
    corrigidas — nota ÷ pontos delas — e "(N/60)") e **"Nota IA (a
    confirmar)"** (só com a entrega feita e os 60 tópicos corrigidos). Nada disso vale sem a
    confirmação do professor em CORREÇÃO. Orientação da IA: `CORRECAO-PROVA-ADAG.md`.
  - **Ícone da nota da IA em "Respostas dos alunos"** (2026-10-08): ao escolher o aluno no combo,
    cada alternativa mostra ✅ Certa / 🟡 Meia certa / ❌ Errada com "IA nota/pontos" (ou ⏳ sem
    correção) e o comentário da IA ao passar o mouse; `assets/js/nota-ia-respostas-discursiva.js`
    (+ CSS), ligado pelo callback opcional `aoMostrarAluno` do `respostas-aluno-professor.js`.
    **Vale para todas as avaliações discursivas** (regra no `CLAUDE.md`, 2026-10-08).
  - **Prova escondida para o professor (2026-10-08, pedido do usuário):** por padrão a prova
    inteira (instruções, questões, entrega, link "← Índice" e menu da matéria) fica escondida para o
    professor; só o painel e o
    Progresso da turma aparecem. A prova, com as respostas do aluno, aparece ao escolher um aluno
    no combo e some ao limpar a escolha (classe `discursiva--respostas-ocultas` no `<body>`,
    `avaliacao-discursiva.js` + CSS). Desde 2026-10-14 o painel do professor tem também o botão
    **👁️ Mostrar questões / 🙈 Esconder questões**, que mostra a prova sem escolher aluno (#119).
  - **✅ Confirmar Todas (2026-10-14, #134):** botão ao lado do nome do aluno no Progresso da
    turma (só depois da entrega): grava a nota da IA como nota do professor (travada) em todas as
    questões dele; pula as com suspeita de cópia pendente; se faltar nota da IA em alguma, mostra
    **"QUESTÕES SEM NOTA! GERE A CORREÇÃO DE IA DE NOVO!"** e não grava nada. Para isso, depois
    da entrega a IA dá 0 às questões em branco. Código: `assets/js/confirmar-todas-professor.js`.
  - **Suspeita de Cópia (2026-10-14, #129):** a IA compara as respostas dos alunos da mesma turma
    e grava as suspeitas (`docs/regras/suspeita-copia-discursiva.md`); só o professor vê a coluna
    **Suspeita de Cópia** no Progresso da turma (mouse: nome e resposta do outro aluno) e, ao
    escolher o aluno, a questão vermelha piscando com **✅ Não é cópia / ❌ É cópia** (É cópia zera
    a nota da questão). Código: `assets/js/suspeita-copia-discursiva.js` + `assets/css/suspeita-copia.css`.
    Só conta com **90% ou mais** e mostra o % (#131). Botão **🛡️ Não é cópia** no aluno (#133):
    tira o aluno da comparação **naquela atividade** (as suspeitas dele e as que apontam para ele
    viram "não é cópia"); **↩️ Voltar a comparar** desfaz.
  - **Botões do professor (2026-10-08):** ao escolher o aluno, cada alternativa ganha, antes do
    "💾 Gravar", os botões ✅ Certa (pontos) / 🟡 Meia certa (metade) / ❌ Errada (0), que gravam a
    `nota_professor` (upsert só dessa coluna; `nota_ia` e comentário ficam). Código
    `assets/js/confirmar-nota-professor-discursiva.js` + CSS, pelo `aoMostrarAluno`.
  - **Botão "✅ Finalizar Atividade" (2026-10-08):** embaixo da prova, depois de escolher o
    aluno (só professor). Confere que o aluno entregou e que todas as alternativas respondidas
    têm `nota_professor`; então lança a nota (soma ÷ pontos × 10 × total ÷ mínimo, máximo 10)
    e mostra a contagem de certas, meias certas, erradas e em branco. A nota entra na média
    final pela `notas_media_final`. `assets/js/finalizar-atividade-professor.js` + CSS.
  - ⛔ **Nota confirmada é definitiva:** pede confirmação antes de gravar; depois os botões travam
    e o trigger `correcao_discursiva_validar` recusa qualquer mudança da `nota_professor` já
    gravada, **nem o professor altera** (SQL
    `database/2026-10-08-correcao-discursiva-nota-professor-travada.sql`, aplicado).
  - **Global (2026-10-08 nas discursivas; 2026-10-09 também nas objetivas):** o painel aparece
    para o professor em **todas** as atividades com banco, sem campo na fonte.
  - **Botão "📈 Gráficos"** ao lado do título: modal com 5 gráficos dos dados de agora — barras
    (% respondido por aluno), pizza (situação da turma), barras (alunos que completaram cada
    questão), rosca (discursiva: correção da IA — certas, meias certas, erradas; objetiva:
    acertos e erros) e barras horizontais (nota parcial por aluno). `assets/js/graficos-progresso-turma.js` + CSS, Chart.js 4.4.1
    carregado sob demanda; fecha com ✕, Esc ou clique fora.
  - **1º uso:** Prova Prática ADAG (id 82).
  - ✅ **Feito em 2026-10-09:** o progresso aparece em **todas as atividades** com banco
    (discursivas e objetivas), pelo módulo global; ⛔ não voltar ao antigo
    `progresso-turma-discursiva.js` nem criar painel por matéria ou por página.
- ✅ **Ocultar as respostas depois da entrega (2026-10-08, pedido do usuário):** campo opcional
  `- **Ocultar respostas após entrega:** sim` → `data-ocultar-respostas-entregue="sim"`. O aluno que
  já entregou **não vê** as próprias respostas: a página **nem as lê do banco**
  (`carregarDiscursiva` em `assets/js/respostas-discursivas-banco.js`), os campos ficam vazios, a
  barra do aluno some e o painel avisa. Logo após entregar, a tela também é limpa. O professor
  continua vendo tudo; nada é apagado do banco. 1º uso: Prova Prática ADAG (id 82).
- ✅ **Quantidade mínima de questões para entregar (2026-10-08, pedido do usuário):** toda
  discursiva tem um mínimo de **questões completas** (todas as alternativas com texto); padrão =
  todas (`atividade.minimo_questoes_entrega` vazio). O professor muda **por aluno** no Progresso
  da turma (botão "🎯 Quantidade Mínima de Questões: N/20" sob o nome → janela com o número, de
  1 ao total, ou "Voltar ao padrão"; tabela `minimo_questoes_aluno`, vale para todas as
  tentativas). "Finalizar e entregar" confere o mínimo na página e no banco
  (`atividade_completa`). **Também nas objetivas (2026-10-09, pedido do usuário):** a objetiva
  entrega com o mínimo de **questões respondidas** (as em branco contam como não acertadas) e a
  nota é acertos ÷ mínimo × 10, máximo 10, na página (`respostas-atividade.js`), no relatório do
  professor (`respostas-atividade-professor.js`), na média final (`notas_media_final`) e na regra
  "nota ≥ 7" das tentativas (`liberar_nova_tentativa`). SQL
  `database/2026-10-09-minimo-questoes-objetivas.sql` (aplicado em 2026-10-09; sem mínimo
  definido, o mínimo é o total). **Nota proporcional ao mínimo:** cada questão vale 10 ÷ mínimo e a
  **nota máxima é 10** (`notas_media_final`, Nota parcial IA e Nota IA no painel). Código:
  `assets/js/minimo-questoes-discursiva.js` + CSS. Plano:
  `docs/quantidade-minima-questoes-discursiva.md`. SQL:
  `database/2026-10-08-minimo-questoes-entrega.sql` (aplicado).
  - **Botão "🧮 Cálculo Nota"** (ao lado de "📈 Gráficos", 2026-10-08): calcula quantas questões
    completas **85% da turma** (alunos que começaram) já atingiram e sugere esse número; o modal
    mostra o resumo e a tabela dos alunos, e o botão **"Quantidade Mínima de Questões"** grava o
    mínimo informado **só para quem ainda está com o total** (quem tem mínimo próprio não muda).
    A nota continua seguindo o mínimo de cada aluno. `assets/js/calculo-nota-progresso.js` + CSS.
  - **Tela e PDF só até o mínimo (2026-10-14, #33):** na objetiva com
    `data-questoes-ate-minimo="sim"` no `<body>`, a página mostra só as questões **1 até o
    mínimo** e o "Exportar PDF (atividade completa)" leva só essas (total e gabarito também).
    Aluno: o mínimo dele; professor: muda na hora ao aplicar no Cálculo Nota e, ao abrir, usa o
    mínimo mais usado da atividade. `assets/js/questoes-ate-minimo.js` (+ `atividade.js` e
    `.questao--fora-do-minimo` em `atividade.css`). Ligado em Testes de Front-End, Aula 02; as
    demais matérias entram pela #34 (etapa 161-7aee2d7e).
- ✅ **Prova corrigida para o aluno (2026-10-08, pedido do usuário):** aluno que entregou e com o
  gabarito liberado para a turma (`aluno_pode_ver_gabarito`, sem registrar pedido; execução
  liberada para `authenticated` em `database/2026-10-08-aluno-pode-ver-gabarito-execute.sql`,
  aplicado) vê a prova com as respostas dele (o "Ocultar respostas após entrega" deixa de
  valer), o quadro **"🎓 Sua nota"** (`notas_media_final`), o selo de cada alternativa pela
  nota do professor (✅ Certa / 🟡 Meia certa / ❌ Errada / ⏳ aguardando) com a **observação da
  IA** num balão grande, e o padrão de resposta (mesma caixa do "Ver Gabarito"). O aluno só lê
  as próprias correções confirmadas (RLS da `correcao_discursiva`).
  `assets/js/resultado-aluno-discursiva.js` + CSS.
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
- ✅ **Correção da objetiva para o aluno (2026-10-14, #82, todas as objetivas):** com a
  objetiva entregue e o gabarito liberado para a turma, cada questão mostra a alternativa do
  aluno com ✅ (acertou) ou ❌ (errou) e, nas erradas, a alternativa certa; o cartão
  "RESULTADO — Sua nota" continua no topo. A página confere antes com `aluno_pode_ver_gabarito`
  (não grava pedido) e só então chama `solicitar_gabarito`. Código:
  `assets/js/correcao-objetiva-aluno.js` (carregado por `respostas-atividade.js`) + CSS em
  `assets/css/respostas-atividade.css`.
- ✅ **"📄 Exportar Meu Gabarito" (2026-10-14, #82):** em toda atividade (objetiva, prática,
  discursiva e avaliação) com `<body data-exportar-meu-gabarito="sim">`, o **aluno** tem o
  botão, desativado ("Disponível depois de entregar") até a **última tentativa liberada** estar
  entregue. Gera um PDF para postar no Ambiente Virtual com cabeçalho (estudante, turma, UC,
  atividade, docente, tentativa, data e hora da entrega), a **nota** (objetiva: acertos sobre o
  mínimo; prática/discursiva: `notas_media_final` ou "aguardando a correção") e **só as
  respostas do aluno** daquela tentativa. ⛔ Nunca leva a resposta certa nem o padrão de
  resposta. Código: `assets/js/botao-minhas-respostas.js` (botão) e
  `pdf-minhas-respostas.js` (PDF), adaptadores `minhas-respostas-objetiva.js` (carregado por
  `respostas-atividade.js`) e `minhas-respostas-discursiva.js` (carregado por
  `avaliacao-discursiva.js`); CSS `assets/css/minhas-respostas.css`. Sem mudança no banco.
  Ligado em Testes de Front-End; as demais matérias entram pelas tarefas #83 a #116.

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
- ✅ **ID NA FRENTE DE CADA ATIVIDADE** (2026-10-09, pedido do usuário, todos os índices, só
  professor): etiqueta "ID 07" no começo do botão da atividade (menor que 10 com zero à esquerda;
  10 em diante normal); a antiga caixa "🆔 ID · nome" do card foi removida
  (`assets/js/atividades-crud-modal.js`).
- ✅ **BOTÃO ON/OFF AO LADO DE CADA ATIVIDADE — REGRA GLOBAL** (2026-10-09, pedido do usuário;
  substitui o antigo interruptor "Bloquear/Desbloquear" por card de 2026-09-30): no índice de
  atividades de **todas** as matérias, o professor tem **um botão ON/OFF logo depois de cada
  atividade** cadastrada no banco (ON verde = liberada; OFF vermelho = bloqueada para a turma
  favorita; a dica do botão mostra a turma). Um card com várias atividades (ex.: objetiva +
  prática da mesma aula) tem um botão por atividade, e cada uma é bloqueada sozinha. O card só
  fica escurecido quando **todas** as atividades dele estão OFF. O aluno vê a atividade bloqueada
  com 🔒 no nome e "Atividade Bloqueada!" ao clicar; o card inteiro só trava quando todas
  estão bloqueadas. Código único: `assets/js/indice-atividades-bloqueio.js` +
  `assets/css/indice-atividades-bloquear.css` (carregados pelo `atividades-crud-modal.js` em
  todos os índices; não repetir por matéria nem por página). **Largura (2026-10-09):** os botões de
  atividade do card têm a mesma largura e o ON/OFF fica sempre ao lado (texto do botão menor e
  quebrando a linha para caber, também no celular).
- ✅ **BLOQUEIO DE ATIVIDADE POR TURMA — REGRA GLOBAL** (2026-10-05, índices de **todas** as
  matérias; plano `docs/bloqueio-atividade-por-turma-favorita.md`; SQL
  `database/2026-10-05-bloqueio-atividade-por-turma.sql`, aplicado no banco):
  - o botão **ON/OFF de cada atividade** vale **só para a turma favorita** (`turma.favorito`).
    **As outras turmas não são afetadas.** Sem turma favorita marcada, avisa (popup) e não
    grava; trocar a favorita na barra do índice remonta os botões;
  - coluna **`atividade.bloqueio`** (JSON com os **códigos das turmas** bloqueadas, padrão `[]`):
    turma fora da lista = **liberada** (sem vínculo = liberado sempre);
  - gravação **só** pela função `definir_bloqueio_turma(atividade, turma, bloquear)` (professor
    da turma, via `professor_tem_turma`; administrador em todas). ❌ Não gravar `bloqueio` à mão
    nem voltar a usar o interruptor para mudar `atividade.ativo`;
  - `atividade.ativo = false` (CRUD "CADASTRAR ATIVIDADES") continua bloqueando **todas** as
    turmas; liberar para a favorita uma atividade inativa faz `ativo = true` e põe as outras
    turmas em `bloqueio` (elas continuam bloqueadas);
  - **aula bloqueada não dá nenhum acesso, nem ao professor** (2026-10-09): no card, só o botão de
    desbloquear responde; o resto fica travado até ele desbloquear;
  - **bloquear a aula (`aulas.ativo = false`) bloqueia todas as atividades dela** (trigger
    `aulas_bloqueio_propaga_atividades_trg`, 2026-10-09: grava `atividade.ativo = false`);
    desbloquear a aula não mexe nas atividades;
  - **slides da aula bloqueada fechados para o aluno** (2026-10-14, tarefa #31; matérias de
    `assets/js/indice-bloqueio-aula-config.js`): no índice, os links dos cards ficam travados
    (classe `indice--conferindo-aula`) até o `indice-aula-data.js` conferir o bloqueio; na página
    da atividade (objetiva e prática), `assets/js/atividade-bloqueio-aula.js` esconde o conteúdo
    e tira os links dos slides (PDF) quando o aluno não consegue ler a atividade (RLS). O PDF
    aberto pelo endereço direto continua acessível (arquivo estático do site);
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
- ✅ **Seeds:** aplicar, registrar e conferir conforme a regra "🌱 SEEDS DO BANCO" do `CLAUDE.md` (registro em
  `database/SEEDS-APLICADOS.md`).
- ⚠️ Respeita `STATUS-PERMISSAO-EMENTA`, matérias semelhantes e a exceção de
  `QUALIFICACAO-PROFISSIONAL/`.

## 📝 REGRA CRÍTICA — 1 ATIVIDADE OBJETIVA DE 50 QUESTÕES POR AULA + `ATIVIDADES/STATUS-ATIVIDADES.md`

⚠️ **Toda aula de toda matéria deve ter 1 atividade objetiva de 50 questões** (múltipla escolha
A–D), e **cada pasta `ATIVIDADES/` de matéria tem o arquivo `STATUS-ATIVIDADES.md`** com o controle
dessas atividades. Registrada em 2026-10-03 a pedido do usuário.

- ✅ **Atividade objetiva da aula** = `ATIVIDADES/ATIVIDADES-AULA-NN-50-QUESTOES.html` (nomes antigos
  já publicados, como `ATIVIDADES-N-TEMA-50-QUESTOES.html` ou com data, continuam valendo), com
  **exatamente 50 questões**, fonte em `ATIVIDADES/CONTEUDO/*-50-QUESTOES.md` (no Git e fora do site, tem
  gabarito), gerada por `assets/gerador-atividades/gerar_atividades.py`, com folha de respostas no
  banco (`- **Folha de respostas:** sim`) e cadastro em `atividade` + `gabarito` (seed).
- ❌ Página com menos de 50 questões **não conta** como a atividade objetiva da aula (fica ⚠️ no
  status até ser completada); práticas, avaliações e atividades de Excel são **adicionais**.
- ✅ **`STATUS-ATIVIDADES.md`**: uma linha por aula (aula, tema, página, nº de questões, fonte,
  banco, status) e a lista das demais atividades da pasta. Atualizar **sempre** que uma atividade
  for criada, alterada, cadastrada no banco ou liberada/bloqueada; criar o arquivo se não existir.
- ✅ Gerar as que faltam seguindo a regra "UMA AULA POR VEZ, COMPLETA" (fonte → HTML → conferência
  de 50 itens e gabarito ausente → índice → seed), atualizando o `STATUS-ATIVIDADES.md` e o
  `AULAS/STATUS-AULAS.md` a cada aula. Gerar em massa continua exigindo plano (na etapa) e aprovação;
  aplicar o seed no Supabase só com pedido do usuário (regra "🌱 SEEDS DO BANCO" do `CLAUDE.md`).
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
  2026-10-03): o usuário autorizou **aplicar o seed no Supabase ao finalizar cada matéria** —
  vale **só** para as matérias desse plano de 2026-10-03. Fora dele (ex.: Banco de Dados, tarefa
  #20), aplicar só com pedido (regra "🌱 SEEDS DO BANCO" do `CLAUDE.md`).
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
  resposta e dos critérios no `-GABARITO.md`, no Git e fora do site) **e análise do professor**, que
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
    `ATIVIDADES/CONTEUDO/ATIVIDADES-AULA-NN-20-QUESTOES.md` (no Git e fora do site, tem gabarito), gerada por
    `assets/gerador-atividades/gerar_atividades.py --so=` e cadastrada pelo
    `scripts/gerar-seed-atividades.py` (grupo da matéria);
  - **discursivas:** `ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-NN.html`, fonte
    `ATIVIDADES/CONTEUDO/ATIVIDADE-DISCURSIVA-AULA-NN.md` (cada item com Contexto, Comando e um
    tópico `- a) ... (1,0)`) + `-GABARITO.md` (padrão de resposta e critérios para a IA, no Git e
    fora do site), gerada por `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py`
    (nasce bloqueada; o professor libera no índice).
- ✅ O seed das objetivas roda **antes** do das discursivas (ele cria a aula no banco). O
  `STATUS-ATIVIDADES.md` da matéria controla as duas páginas (20 + 5) de cada aula.
- ❌ Não aplicar esta regra a outras matérias, nem às matérias semelhantes, sem pedido do usuário.
