## Etapa 323-bf204d96 — Botão "Exportar Meu Gabarito" na discursiva id 152

**Tarefa:** #196-bf204d96-d111-4ab3-9d77-68ff53e6cdf8 · **Pedido em:** 2026-10-16 10:42 · **Criada por:** Claude Code (Opus 5.5) (local · main · s6)
**Pedido:** "na atividade discursiva id=152, deve ter 1 botao de nome *Exportar Meu Gabarito*,apos o
aluno finalizar,deve permitir ele exportar o gabarito, crie 1 tarefa pra fazer isso, e mais 1
tarefa pra fazer pra outras atividades,alem desta,assuma a primeira tarefa,e deixe a outra pra
outras ias"
**Objetivo:** na "Atividade de Sala 16/10 — Discursivas" (id 152, ITIC), depois que o aluno
finaliza (entrega), aparece o botão **Exportar Meu Gabarito**, que exporta o gabarito dele, como
já existe nas objetivas de ITIC (#84, #180). As outras discursivas ficam na #197.

### #196.1 — Botão "Exportar Meu Gabarito" na discursiva 152

**Próximo passo:** — (entregue).

- **Nível:** PESADO — gabarito (o que o aluno pode ver), código da discursiva.
- **Critérios de aceitação:** botão **Exportar Meu Gabarito** só aparece para o aluno que já
  finalizou a atividade 152; exporta o gabarito dele; nada de resposta certa no HTML do site
  (`security-banco.md`).
- **O que já existia:** o botão é global (#82): `<body data-exportar-meu-gabarito="sim">`,
  desativado ("Disponível depois de entregar a atividade.") até a entrega, PDF só com as
  respostas do próprio aluno e a nota, sem resposta certa nem padrão de resposta.
- **Problema achado:** depois da entrega a página não carrega mais as respostas do aluno
  (regra das práticas, #160), então o PDF sairia com todas as questões "(em branco)" — também
  nas discursivas que já tinham o botão (ex.: id 81).
- **Entrega:** página `ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA.html` com o botão ligado,
  gerada de novo pela fonte (campo novo `- **Exportar Meu Gabarito:** sim`); gerador
  `gerar_avaliacao_discursiva.py` com o campo (mapa `ATRIBUTOS_BODY`); `minhas-respostas-
  discursiva.js` lê as respostas gravadas no banco na hora do clique (`lerGravadas` do
  repositório, passado por `avaliacao-discursiva.js`); a tela continua sem mostrá-las.
  Regra em `docs/regras/atividades.md` e linha em `docs/HISTORICO-REGRAS.md`.
- **Verificação:** `node --check` nos 2 JS e `py_compile` do gerador; página gerada de novo
  mudou só a linha do `<body>` e o seed da 152 ficou igual (sem diff); RLS de
  `resposta_discursiva` deixa o aluno ler as próprias linhas (`aluno_id = auth.uid()`), o que
  o PDF usa; o botão só aparece para o aluno (não para o professor). Sem navegador (regra do
  projeto): o clique só o usuário confirma (#196.2).

### #196.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário, logado como aluno que já entregou a atividade 152, clica em
"📄 Exportar Meu Gabarito" e confere se o PDF traz as respostas dele (e, com um aluno que não
entregou, se o botão fica desativado). Depois da #196.3: conferir com a aluna Amanda (Ctrl+F5)
que o painel IDENTIFICAÇÃO sai de "Carregando..." e o botão aparece.

- **Nível:** LEVE — conferência do usuário.

### #196.3 — Botão ainda não aparece na discursiva 152

**Próximo passo:** — (entregue; o usuário confere no aceite #196.2).

- **Nível:** PESADO — gabarito (o que o aluno pode ver), código da discursiva.
- **Pedido (2026-10-16 14:08):** "https://aulasenai.vercel.app/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA.html, ainda n aparece o botao *Exportar Meu Gabarito*"
- **Executor:** Claude Code (Opus 5.5) (local · main · s8) até 2026-10-16 14:23 — liberada a pedido do usuário ("edite esta tarefa aqui com o que vc ja sabe e libera pra outra IA pegar")
- **Diagnóstico (2026-10-16 14:20):** página publicada com `data-exportar-meu-gabarito="sim"`;
  `avaliacao-discursiva.js`, `minhas-respostas-discursiva.js`, `botao-minhas-respostas.js` e o
  CSS publicados iguais aos do repositório (só fim de linha muda), sem cache (`max-age=0`);
  atividade 152 no banco com a mesma `pagina` e ativa; sem nome repetido entre os scripts. O
  botão é montado no painel IDENTIFICAÇÃO para **todo aluno logado** (desativado até entregar)
  e **não aparece para o professor nem para quem não está logado** (regra da #82).
- **Caso real (2026-10-16 14:23):** aluna **Amanda Zarqueta de Oliveira** (id
  `8ca11317-b6af-4167-b65a-2b0737e1bccb`, turma 135080), atividade 152.
- **Banco (conferido com o login dela, RLS simulado):** lê a atividade 152 (turma 135080 fora de
  `bloqueio`), 1 entrega (tentativa 1, 2026-10-16 10:38 de Brasília), 20 respostas na tentativa
  1, sem liberação de 2ª tentativa, gabarito não liberado. → O botão deveria aparecer **ativo**.
- **Console do Chrome dela (rodado pelo usuário):** `data-exportar-meu-gabarito="sim"`, sem
  `.meu-gabarito`, `iniciarMeuGabaritoDiscursiva` e `montarBotaoMeuGabarito` não carregados;
  `estadoDiscursivo` existe mas `dados` = `null`; `main` visível; painel IDENTIFICAÇÃO parado em
  "Carregando..."; `bloqueioDeAulaLigado()` = false; `getSession()` responde em 3 ms com a
  sessão dela.
- **Cada passo do `carregarDiscursiva` rodado à mão no console funciona:** atividade 406 ms,
  identificação 187 ms, tentativa 80 ms (=1), entrega 92 ms, horário 78 ms (""), mínimo 63 ms
  (20), gabaritoLiberado 51 ms (false); `criarRepositorioDiscursivo().carregar()` completo em
  302 ms com `disponivel/logado` true e `ehProfessor` false.
- **Conclusão até aqui:** o código do botão está certo; o que falha é a **inicialização na
  abertura** (`iniciarAvaliacaoDiscursiva`, `assets/js/avaliacao-discursiva.js`): ela não chega a
  gravar `estadoDiscursivo.dados` (o `catch` gravaria `{disponivel:false}`, então ela **ficou
  parada** no `await repositorio.carregar()` ou nem rodou). Sem erro de sintaxe (`node --check`)
  e sem nome repetido entre os scripts estáticos da página.
- **Suspeita (não confirmada):** disputa da sessão do Supabase na abertura — o
  `js/header-usuario.js` (no `<head>`) carrega o supabase-js e o `js/supabase.js` por conta
  própria (linhas ~113-115) e chama `getSession()`; a página carrega os dois de novo no fim do
  `<body>` (2ª carga do `js/supabase.js` redeclara `SUPABASE`/`clienteSupabase` e falha; 2ª
  carga do CDN troca `window.supabase`). O `getSession()` do auth-js pode ficar esperando o
  lock do token na abertura (refresh em andamento ou dois clientes `GoTrueClient` na mesma
  chave). Conferir também `js/login.js` (linhas ~203 e ~281).
- **Ferramentas:** nesta sessão o Claude in Chrome não carregou e o navegador embutido é
  bloqueado pelo gancho do projeto (`testes-validacao.md`); o usuário autorizou investigar pelo
  Chrome dele.
- **Executor:** Claude Code (Opus 5.5) (local · main · s9) desde 2026-10-16 14:25.
- **Revisão da suspeita (s9):** não há carga dupla do Supabase na abertura — o
  `js/header-usuario.js` só roda no `DOMContentLoaded`, quando o supabase-js e o `js/supabase.js`
  do fim do `<body>` já existem, então ele reaproveita o mesmo cliente. O CDN `supabase-js@2`
  (2.118.0) não usa mais `navigator.locks` por padrão (coordenação sem trava).
- **Correção:** a carga da abertura (`carregar` do repositório, `assets/js/respostas-discursivas-
  banco.js`) passou a ter **limite de 8 s** e é **repetida até 3 vezes** se travar ou falhar
  (`carregarDiscursivaComLimite` + `esperarComLimiteDiscursiva`). São só leituras; a abertura
  repetida é ignorada pelo banco (`resolution=ignore-duplicates`). A carga feita de novo à mão
  terminava em ~0,3 s, então a nova tentativa destrava o painel e o botão aparece; o console
  mostra "Carga da avaliação repetida (N): …" quando isso acontece.
- **Entrega:** commit desta subtarefa (`fix(discursiva): …`).
- **Verificação:** `node --check assets/js/respostas-discursivas-banco.js` sem erro; leitura do
  fluxo `iniciarAvaliacaoDiscursiva` → `carregar` → `montarPainel` → `abrirMeuGabaritoDiscursiva`.
  Sem navegador (regra do projeto): o usuário confere com a Amanda no aceite (#196.2).
