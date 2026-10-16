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
entregou, se o botão fica desativado).

- **Nível:** LEVE — conferência do usuário.

### #196.3 — Botão ainda não aparece na discursiva 152

**Próximo passo:** 👀 o usuário dizer com qual login testou (professor, aluno que entregou ou
aluno que não entregou); professor → decidir se o botão deve aparecer também para ele.

- **Nível:** PESADO — gabarito (o que o aluno pode ver), código da discursiva.
- **Pedido (2026-10-16 14:08):** "https://aulasenai.vercel.app/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SALA-AULA-16-10-2026-DISCURSIVA.html, ainda n aparece o botao *Exportar Meu Gabarito*"
- **Executor:** Claude Code (Opus 5.5) (local · main · s8)
- **Diagnóstico (2026-10-16 14:20):** página publicada com `data-exportar-meu-gabarito="sim"`;
  `avaliacao-discursiva.js`, `minhas-respostas-discursiva.js`, `botao-minhas-respostas.js` e o
  CSS publicados iguais aos do repositório (só fim de linha muda), sem cache (`max-age=0`);
  atividade 152 no banco com a mesma `pagina` e ativa; sem nome repetido entre os scripts. O
  botão é montado no painel IDENTIFICAÇÃO para **todo aluno logado** (desativado até entregar)
  e **não aparece para o professor nem para quem não está logado** (regra da #82).
