## Etapa 455-a6ce0e06 — Atividade objetiva "PESQUISA INTERNET" (ITIC, 10 questões)

**Tarefa:** #326-a6ce0e06-c9e6-47ea-bb69-18ab96e8b5d0 · **Pedido em:** 2026-10-21 13:17 · **Criada por:** Claude Code (Opus 5.5) (nuvem · elegant-planck-ul8ac1)
**Pedido:** "CRIE PRIMEIRO A ATIVIDADE DE PESQUISA NA INTERNET DE NOME *PESQUISA INTERNET* COM AS
10 QUESTOES SUGERIDAS E JA PUBLIQUE NO BANCO DE DADOS"
**Objetivo:** atividade objetiva de 10 questões (uma por aula da Introdução à TIC, turma ITIC
CEPLAS TARDE 135081) respondidas por pesquisa na internet, além dos slides.

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 13:17 | Questões = as 10 de pesquisa sugeridas na conversa (uma por aula 01 a 10), 4 alternativas, "você como aluno consultor" | Claude Code (pedido do usuário) |
| 2026-10-21 13:17 | Atividade ligada ao card da Aula 10 (Editor de Apresentações e TIC, aula de 21/10), nasce PENDENTE como as demais | Claude Code (padrão; o usuário pode mudar o card) |
| 2026-10-21 13:17 | Banco só pelo Claude Code local (`multiplas-ias.md`): a nuvem gera fonte, página e seed; a aplicação fica na #326.2 | Regra do projeto |

### #326.1 — Fonte, página e seed da atividade

**Próximo passo:** — (entregue).

- **Nível:** PESADO — gabarito e seed de banco
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Descrição:** fonte em `INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/ATIVIDADE-PESQUISA-INTERNET.md`,
  página `ATIVIDADE-PESQUISA-INTERNET.html` pelo gerador, seed em `database/` pelo
  `scripts/gerar-seed-atividades.py`, linha PENDENTE no `database/SEEDS-APLICADOS.md`, recado para a frente local.
- **Critérios de aceitação:** 10 questões, gabarito só na fonte e no seed (fora do site), seed idempotente.
- **Entrega:** fonte `ATIVIDADES/CONTEUDO/ATIVIDADE-PESQUISA-INTERNET-QUESTOES.md` (gabarito
  BDACBCDACB), página `ATIVIDADES/ATIVIDADE-PESQUISA-INTERNET.html` (gerador, com folha de
  respostas, sem gabarito), linha nova em `scripts/gerar-seed-atividades.py` (aula 10,
  2026-10-21), seed `database/2026-10-21-itic-pesquisa-internet-seed-atividades.sql`
  (`nome_atividade` = "PESQUISA INTERNET", 10 gabaritos) registrado PENDENTE; recado para a
  frente local; linha no `STATUS-ATIVIDADES.md`.
- **Verificação:** gerador e seed rodaram sem erro (10 itens); `grep` confirmou que o HTML não
  tem `gabarito-dados` nem "Gabarito:"; `.vercelignore` tira `*QUESTOES.md` e
  `*-seed-atividades.sql` do site; `py_compile` do script do seed. Sem navegador.

### #326.2 — Aplicar o seed no banco

**Próximo passo:** frente local aplica o seed, confere o md5 e registra CONCLUÍDO.

- **Nível:** PESADO — banco
- **Modelo:** só Opus 5.5+ ou Fable, **só Claude Code local** — nunca outro
- **Descrição:** ciclo de seeds (`seeds.md`), autorização permanente.

## Mudança de 2026-10-21 13:22 — vira discursiva em equipe (30 questões, mínimo de 5 linhas)

**Pedido:** "SOMENTE O ALUNO LIDER DEVE RESPONDER NA EQUIPE, E ESTA ETAPA É DO TIPO DISCURSIVA, OS
DEMAIS ALUNOS DEVEM FAZER A PESQUISA E SUGERIR AS RESPOSTAS, AUMENTE PRA NO MINIMO 30 QUESTOES
DISCURSIVAS E TODAS PESQUISAVEIS NA INETERNET E COBRE NELAS *MINIMO DE 5 LINHAS NAS RESPOSTAS*,
NAO DEIXE ENTREGAR SE NAO TIVER ISSO"

Tarefa grande (banco + código + várias partes): plano abaixo, **aprovado** pelo usuário em
2026-10-21 13:24.

### Decisões da mudança

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 13:24 | Plano aprovado ("Sim, aprovo") | Usuário |
| 2026-10-21 13:24 | 5 linhas = **350 caracteres** por resposta (70 por linha, mesma medida do campo do tamanho), iguais no PC e no celular | Usuário |
| 2026-10-21 13:24 | "Só o líder responde" = recurso de equipe que já existe (atividade ligada às equipes; o líder 👑 responde e confirma; sem bloqueio novo para os integrantes) | Usuário |

### Escopo (plano proposto)

- **Entra:** discursiva "PESQUISA INTERNET" com 30 questões (3 por aula, Aulas 01 a 10), todas
  respondíveis por pesquisa na internet, "você como aluno consultor", com padrão de resposta
  para a IA no `-GABARITO.md`; cabeçalho com bloqueio de colar e campo do tamanho da resposta;
  trava nova "Mínimo de linhas por resposta: 5" (sem isso, o botão Entregar recusa e mostra
  quais questões faltam); em equipe pelo recurso que já existe (equipe ligada à atividade,
  o líder 👑 responde e confirma, e a resposta dele vale para os integrantes).
- **Sai:** a versão objetiva de 10 questões (seed nunca aplicado → SUBSTITUÍDO; página e fonte
  apagadas; linha tirada do `scripts/gerar-seed-atividades.py`).
- **Não entra:** mudar as outras discursivas (a trava só liga com o campo novo na fonte).

### Subtarefas planejadas

| Subtarefa | O quê | Nível |
|---|---|---|
| #326.3 | Fontes `ATIVIDADE-PESQUISA-INTERNET.md` + `-GABARITO.md` (30 questões), página e seed pelo gerador de discursivas; tirar a versão objetiva | PESADO (gabarito, seed) |
| #326.4 | Trava do mínimo de linhas: campo novo no gerador + verificação no Entregar (`avaliacao-discursiva.js` ou módulo próprio) + aviso na questão | MEDIO |
| #326.5 | Banco (só local): aplicar o seed e ligar a atividade às equipes da turma 135081 | PESADO |
| #326.6 | Documentação da trava em `docs/regras/atividades.md` | LEVE |

### Riscos

- "Linha" muda com a largura da tela → a contagem precisa de uma definição fixa (pergunta ao
  usuário). Plano B: mínimo de caracteres.
- 30 respostas de 5 linhas em 3 h é muito texto para um só digitador (o líder); a equipe
  pesquisa e dita.

### #326.3 — Discursiva PESQUISA INTERNET: 30 questões, gabarito, página e seed

**Próximo passo:** — (entregue).

- **Nível:** PESADO — gabarito (padrão de resposta) e seed de banco
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Entrega:** fontes `ATIVIDADES/CONTEUDO/ATIVIDADE-PESQUISA-INTERNET.md` (30 questões, 3 por
  aula 01 a 10, todas pesquisáveis, "você como aluno consultor", aviso de equipe com só o líder
  respondendo, campo `Mínimo de caracteres por resposta: 350` para a #326.4) e
  `-GABARITO.md` (resposta esperada com 350+ caracteres e critérios para a IA); página
  `ATIVIDADES/ATIVIDADE-PESQUISA-INTERNET.html` (gerador de discursivas, bloquear colar, campo do
  tamanho, Exportar Meu Gabarito) no lugar da objetiva; seed
  `database/2026-10-21-atividade-pesquisa-internet-seed-atividades.sql` (aula 10 da matéria
  INTRODUCAO TIC, nome "PESQUISA INTERNET", 30 tópicos, nasce bloqueada) PENDENTE; seed objetivo e
  fonte objetiva apagados (SUBSTITUÍDO), linha tirada do `scripts/gerar-seed-atividades.py`.
- **Verificação:** gerador: "30 questões, 30 tópicos, 30 pontos; padrão de resposta: 30 tópicos
  (0 sem padrão)"; `grep` sem resposta esperada no HTML; `git check-ignore` não se aplica (Git),
  `.vercelignore` tira `*gabarito*` e `*-seed-atividades.sql` do site; `py_compile` do script do
  seed. Sem navegador.

### #326.4 — Trava "mínimo de 5 linhas (350 caracteres) por resposta" no Entregar

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código com lógica (JS + gerador), até 3 arquivos
- **Modelo:** só Sonnet — nunca outro (executor-medio, liderado pelo Opus 5.5 desta frente)
- **Descrição:** campo opcional da fonte `- **Mínimo de caracteres por resposta:** N` → o
  gerador de discursivas põe `data-minimo-caracteres="N"` no `<body>` e inclui o módulo novo
  `assets/js/minimo-caracteres-discursiva.js`, que (só com o atributo) mostra em cada campo
  quantos caracteres faltam e **bloqueia o Entregar** (clique interceptado antes do fluxo normal)
  enquanto houver resposta com menos de N caracteres (sem contar espaços nas pontas), com popup
  listando as questões que faltam. Sem banco. `avaliacao-discursiva.js` já tem 1000 linhas: não
  crescer.
- **Critérios de aceitação:** sem o campo na fonte, nada muda nas outras discursivas; com o
  campo, entregar com qualquer resposta curta é recusado; `node --check` e `py_compile` passam;
  página PESQUISA INTERNET regerada com o atributo.
- **Entrega:** gerador (`CAMPO_MINIMO_CARACTERES`, `ler_minimo_caracteres`, atributo no `<body>`
  só com o campo, docstring), template com o script novo, `assets/js/minimo-caracteres-discursiva.js`
  (aviso vivo "Faltam X caracteres" em cada campo, atualizado ao digitar e ao carregar as
  respostas; clique no Entregar interceptado na captura com popup das questões curtas); página
  e seed regerados (`data-minimo-caracteres="350"`). Pelo executor-medio.
- **Verificação:** `node --check` e `py_compile` passam; o líder leu o JS (só liga com o atributo,
  captura no `document` roda antes do botão, evento `discursiva:campos-preenchidos` existe no
  `avaliacao-discursiva.js`, `popup.js` carregado antes no template); sem o campo, o gerador não
  emite o atributo. ⚠️ Conferir na tela: o popup e o aviso (sem navegador nesta sessão).

### #326.6 — Documentação da trava de caracteres mínimos

**Próximo passo:** — (entregue).

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro (executor-leve)
- **Descrição:** item novo em `docs/regras/atividades.md` (junto do "Campo do tamanho da
  resposta") e linha no docstring do gerador não (fica com a #326.4). Feita em paralelo com a
  #326.4 a pedido do usuário ("FAÇA RÁPIDO, DISPARE MAIS AGENTES"), pela especificação da etapa.
- **Entrega:** item "Mínimo de caracteres por resposta" em `docs/regras/atividades.md` (logo
  depois do "Campo do tamanho da resposta"), pelo executor-leve.
- **Verificação:** leitura do trecho pelo líder (linhas ≤ 100, estilo do arquivo); só esse
  arquivo mudou.

### #326.5 — Aplicar o seed e ligar às equipes da 135081

**Próximo passo:** aplicar o seed pelo conector do Supabase, conferir e ligar às equipes.

- **Nível:** PESADO — banco
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Decisão (2026-10-21 13:32, usuário: "APLIQUE O SEED AQUI"):** exceção à regra "banco só pelo
  Claude Code local" (`multiplas-ias.md`): esta frente de nuvem aplica o seed pelo conector do
  Supabase, só nesta subtarefa.
