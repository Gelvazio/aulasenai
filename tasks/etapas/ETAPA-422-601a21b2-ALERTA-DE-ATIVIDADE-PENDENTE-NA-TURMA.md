## Etapa 422-601a21b2 — #293: Alerta de atividade pendente nos cards (só professor)

**Tarefa:** #293-601a21b2-a51e-4942-ba44-8579b0b5f7d2 · **Pedido em:** 2026-10-19 10:45 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "CRIE 1 TAREFA,PRA MOSTRAR O FUNDO EM VERMELHO CLARO PISCANDO, EM FORMA DE ALERTA APENAS SO PROFESSOR,MOSTRAR O CARD DA ATIVIDADE SE: EXISTIR 1 OU MAIS ALUNO COM ATIVIDADE PENDENTE,OU SEJA ATIVIDADE QUE NAO ESTA BLOQUEADA E O ALUNO NAO FEZ, ATIVIDADE DESBLOQUEADA, E ALUNO N ATINGIU A NOTA MINIMA,FILTRE PELA TURMA SELECIONADA EM CIMA,CRIE O MAXIMO DE SUBTAREFAS POSSIVEIS NESTA ATIVIDADE, E ME RESPONDA TAMBEM SE ESTA SENDO USADO O JEV PRA DEFINIR OS MODELOS DESTA TASK AQUI"
**Objetivo:** no índice de atividades (`ATIVIDADES/index.html`), o professor vê o card da atividade
com **fundo vermelho claro piscando** quando, na **turma escolhida no combo "Turma:" do topo**, pelo
menos 1 aluno tem a atividade **pendente**: (a) atividade **não bloqueada** e o aluno **não fez**; ou
(b) atividade **liberada** e o aluno **entregou com nota abaixo da nota mínima** da matéria.
E, no mesmo índice e na mesma turma, o card da atividade com **todas as atividades concluídas**
(ninguém pendente) mostra **fundo verde claro fixo** (sem piscar), também só para o professor.

### Escopo

- **Entra:** regra de "pendente" (não fez × nota abaixo do mínimo) por atividade e por turma; fonte de
  dados (consulta já existente × view/função nova); filtro pela turma do combo "Turma:"; atualização ao
  trocar de turma e ao remontar os cards; CSS do alerta (vermelho claro piscando, respeitando
  `prefers-reduced-motion`); **estado verde claro** (todas as atividades do card concluídas na turma,
  fundo fixo) com CSS próprio; aplicar **só para o professor**; conferências e documentação.
- **Não entra:** mudar cores/bloqueio/"Fez Atividade?" do aluno; mudar a nota do aluno; criar painel
  novo ou página nova; mandar e-mail/notificação; mexer no gabarito; gerar slides; teste automatizado
  de navegador.
- **Pronto quando:** o professor vê o alerta nos cards certos, na turma certa, e o **fundo verde** nos
  cards sem nenhum pendente; o aluno/visitante nunca vê nenhum dos dois estados; trocar a turma no
  combo atualiza na hora; atividade bloqueada nunca liga o vermelho nem o verde; e o resto do índice
  continua igual.

### Riscos e plano B

| Risco | Chance | Impacto | Plano B |
|-------|--------|---------|---------|
| Consulta por turma ficar pesada (muitos alunos × atividades) | Média | Alto | uma consulta por turma (não por card), cache em memória até trocar a turma |
| Alerta aparecer para o aluno | Baixa | Alto | classe só aplicada quando o papel é professor; conferência #293.23 |
| Piscar incomodar/atrapalhar leitura | Média | Médio | animação suave (≈1 s), `prefers-reduced-motion` → fundo fixo |
| Regra "não fez" divergir do que o aluno/professor já veem | Média | Médio | usar a mesma definição de entrega já usada no progresso (#293.3/#293.4) |
| Card piscando mudar o layout | Baixa | Baixo | só `background`/`box-shadow`, sem `margin`/`padding` |
| Vermelho e verde no mesmo card | Baixa | Médio | estados mutuamente exclusivos: verde só com **zero** pendentes (R12) |

### Decisões

| Data e hora | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-19 10:45 | Prioridade 🟠 Alta; tarefa **PESADO** (consulta ao banco e segurança do papel) com plano na etapa, aguardando o "sim" | DeepSeek Harness (deepseek-flash) | pedido do usuário; níveis e tarefa grande |
| 2026-10-19 10:45 | Nível e modelo de cada subtarefa pela matriz de `.claude/rules/niveis.md` + skill `.agents/skills/classificar-tarefa/SKILL.md`; **JEV não foi chamado** (integração ainda pendente: RL-87FD6C11-JEV.1) | DeepSeek Harness (deepseek-flash) | resposta à pergunta do usuário |
| 2026-10-19 10:45 | Nota mínima: a da matéria (`materia.json` → `avaliacao.nota_minima`; ex.: 7,0) | DeepSeek Harness (deepseek-flash) | fonte única já existente |
| 2026-10-19 10:45 | "Turma selecionada em cima" = combo **"Turma:"** do índice (aula/bloqueio desde #206) | DeepSeek Harness (deepseek-flash) | é o seletor de turma da página |
| 2026-10-19 10:45 | Piscar suave de ≈1 s; com `prefers-reduced-motion: reduce`, sem animação (fundo fixo) | DeepSeek Harness (deepseek-flash) | acessibilidade |
| 2026-10-19 11:08 | **Estado verde claro**: card com **todas as atividades concluídas** pela turma (zero pendentes, nenhuma bloqueada), fundo **fixo** (sem piscar), também **só professor** | Usuário ("fundo claro verde") + DeepSeek Harness | complemento do vermelho; mesma turma do combo |
| 2026-10-19 12:39 | Respostas do usuário: **Q1** = o vermelho pisca no **card inteiro**; **Q2** = aluno **"Faltou?"** NÃO conta como pendente; **Q3** = verde confirmado (card inteiro, todas concluídas, nota ≥ mínima, sem bloqueada, fixo, só professor) | Usuário | destrava a spec; C34 |
| 2026-10-19 12:39 | O gate `node spec/verificar-spec.mjs` **não existe** neste repositório → a spec é conferida por leitura, sem instalar script | DeepSeek Harness (deepseek-flash) | o projeto é sem teste automatizado novo |

### Requisitos (EARS)

| # | Requisito | Verificação |
|---|---|---|
| R1 | QUANDO o professor abre o índice de atividades e escolhe uma turma no combo "Turma:", O SISTEMA DEVE marcar como **pendente** toda atividade em que ≥1 aluno dessa turma esteja na condição (a) ou (b) do Objetivo. | conferir card a card contra a lista de alunos da turma (consulta/leitura) |
| R2 | SE a atividade está bloqueada para a turma escolhida (ou a aula está bloqueada/inativa), ENTÃO O SISTEMA DEVE manter o alerta **desligado** para essa atividade. | conferir com atividade bloqueada ON/OFF (leitura) |
| R3 | SE o aluno **não entregou** a atividade (sem entrega registrada na tentativa atual), ENTÃO a atividade DEVE contar como pendente (condição a). | conferir com aluno sem entrega (leitura/consulta) |
| R4 | SE o aluno **entregou** e a nota dele é **menor** que `avaliacao.nota_minima` da matéria, ENTÃO a atividade DEVE contar como pendente (condição b). | conferir com aluno entregue e nota abaixo da mínima (consulta) |
| R5 | QUANDO o professor troca a turma no combo "Turma:", O SISTEMA DEVE refazer a marcação dos cards sem recarregar a página. | trocar a turma e conferir os cards (leitura) |
| R6 | QUANDO os cards são remontados (evento `cards-aula-montados`), O SISTEMA DEVE aplicar o alerta aos cards novos. | gerenciar/editar aula e voltar ao índice (leitura) |
| R7 | ENQUANTO o usuário logado **não** for professor, os cards de atividade NÃO DEVEM receber a classe do alerta. | login de aluno e de visitante (leitura) |
| R8 | O SISTEMA DEVE usar fundo vermelho claro com animação de ≈1 s, e **sem animação** quando `prefers-reduced-motion: reduce`. | inspeção do CSS e do card (leitura) |
| R9 | SE não houver turma escolhida (ou o professor não tiver turma), ENTÃO o alerta NÃO DEVE aparecer. | perfil sem turma (leitura) |
| R10 | SE a consulta falhar, O SISTEMA DEVE continuar mostrando o índice sem alerta e sem erro na tela. | simular falha de rede (leitura do console) |
| R11 | QUANDO não houver **nenhum** aluno pendente na turma escolhida para as atividades do card, e nenhuma atividade do card estiver bloqueada, O SISTEMA DEVE aplicar **fundo verde claro** ao card. | conferir turma sem pendentes (leitura) |
| R12 | O SISTEMA DEVE manter **vermelho e verde mutuamente exclusivos**: nunca os dois no mesmo card. | conferir card a card (leitura) |
| R13 | ENQUANTO o usuário logado **não** for professor, o **verde** também NÃO DEVE aparecer. | login de aluno e de visitante (leitura) |
| R14 | SE alguma atividade do card estiver **bloqueada** para a turma (ou a aula bloqueada/inativa), ENTÃO o card NÃO DEVE ficar verde. | atividade bloqueada ON/OFF (leitura) |
| R15 | SE o aluno estiver marcado como **"Faltou?"** no dia da atividade, ENTÃO ele NÃO DEVE contar como pendente (nem impedir o verde). | conferir aluno com falta (leitura) |

### Invariantes

| # | Invariante e domínio | Como conferir |
|---|---|---|
| I1 | Aluno e visitante nunca recebem a classe do alerta (domínio: todo usuário que não é professor da turma). | R7 conferido com os dois perfis (#293.23) |
| I2 | Atividade bloqueada nunca liga o alerta (domínio: todas as atividades/turmas). | R2 conferido com ON/OFF (#293.17) |
| I3 | O alerta não altera tamanho/posição do card (domínio: todos os cards). | comparar layout com e sem alerta (#293.24) |
| I4 | O alerta vale só para a turma escolhida; aluno de outra turma não conta (domínio: todas as turmas do professor). | trocar a turma e conferir (#293.22) |
| I5 | Nenhuma resposta/gabarito/nota de aluno é exposta ao aluno pela consulta nova (domínio: papel aluno). | consulta com login de aluno (#293.8/#293.23) |
| I6 | Verde só com **zero** pendentes na turma (domínio: todos os cards/turmas). | R11 conferido (#293.31) |
| I7 | Vermelho e verde nunca juntos; sem turma escolhida, nenhum dos dois (domínio: todos os cards). | R12/R9 conferidos (#293.31) |
| I8 | Aluno e visitante não recebem nem o vermelho nem o verde (domínio: usuário que não é professor). | R13 conferido (#293.32) |

### Perguntas abertas

| # | Pergunta | Quem responde | Situação |
|---|---|---|---|
| Q1 | O fundo piscando cobre **o card inteiro da aula** ou só o **botão/bloco da atividade** dentro do card? | Usuário | ✅ fechada em 2026-10-19 12:39: **card inteiro** |
| Q2 | Aluno marcado como **"Faltou?"** no dia conta como pendente para o alerta (ou fica de fora)? | Usuário | ✅ fechada em 2026-10-19 12:39: **não conta** (R15) |
| Q3 | O verde vale só para o **card inteiro**, só quando **todas** as atividades dele estiverem concluídas (entregues e com nota ≥ mínima) e nenhuma bloqueada — **fixo, sem piscar**, também só professor. Confirma? | Usuário | ✅ fechada em 2026-10-19 12:39: **sim** |

> ✅ Perguntas fechadas em 2026-10-19 12:39. Falta só o **"sim" ao plano** para reservar a primeira
> subtarefa; o gate `spec/verificar-spec.mjs` não existe neste repositório (conferência por leitura).

---

### #293.1 — Fechar as perguntas abertas da spec e conferir a spec pela leitura

**Próximo passo:** — (entregue em 2026-10-19 12:52; a próxima é a #293.2).

- **Nível:** MEDIO — texto técnico e ajuste de requisitos, sem banco.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** conferir que Q1–Q3 estão fechadas (nenhum 👀), que R1–R15/I1–I8 continuam coerentes e que a regra de falta (R15) entrou.
- **Critérios de aceitação:** nenhuma pergunta 👀; requisitos e invariantes sem ⬜; etapa coerente.
- **Verificação:** leitura das seções Requisitos/Invariantes/Perguntas abertas + `git diff` só na etapa.
- **Entrega:** Q1 = card inteiro, Q2 = falta não conta (R15), Q3 = verde confirmado; R1–R15 e I1–I8 conferidos por leitura; o gate `spec/verificar-spec.mjs` não existe no repositório (nada a rodar).

### #293.2 — Levantamento técnico do índice e dos dados que a página já carrega

**Próximo passo:** — (entregue em 2026-10-19 12:56; a próxima é a #293.3, PESADO/banco).

- **Nível:** MEDIO — leitura de código JS com lógica, sem alterar.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** listar os pontos de extensão (evento `cards-aula-montados`, papel do usuário, turma atual) e o que já está disponível no cliente.
- **Critérios de aceitação:** etapa com os arquivos/linhas e o desenho de onde o alerta entra.
- **Verificação:** conferir os caminhos citados no repositório.
- **Entrega:** mapa abaixo (leitura em 2026-10-19 12:56).

**Onde o alerta entra (mapa do levantamento):**

| Ponto | Arquivo (linhas) | Como o alerta usa |
|---|---|---|
| Cards | `assets/js/indice-aula-grade-banco.js` (85–107, 341–358) | `article.aula[data-aula-id]`, com os links `a.btn.principal` dentro de `.acoes` |
| Remontagem da grade | `assets/js/indice-aula-data.js` (51, 389–425) | escutar `cards-aula-montados` e reaplicar (mesmo padrão do "Fez Atividade?") |
| Papel do usuário | `assets/js/atividades-crud-modal.js` (`usuarioEhProfessorCrud`, ~717) e `assets/js/indice-atividades-feitas.js` (37–57) | aplicar a classe só com professor; aluno/visitante nunca |
| Administrador | `assets/js/indice-aula-data.js` (53) | `estadoCardsAula.ehAdministrador` também é professor |
| Turma escolhida | `assets/js/indice-turma-favorita.js` (16, 174–203) | ler `select.barra-turma-favorita__lista` (código da turma) e escutar `turma-indice-alterada` / `turma-favorita-alterada` |
| Bloqueio | `assets/js/indice-atividades-bloqueio.js` (`estaBloqueadaParaTurma` 170, `buscarFavoritaBloqueio` 156, eventos 36/40/43) | mesma decisão de bloqueio do índice (R2/R14) |
| Dados por aluno/atividade (professor) | `assets/js/progresso-turma-fontes.js` (`lerAlunosObjetiva` 184, `lerAlunosDiscursiva` 318, `lerMinimosDosAlunos` 75) + `assets/js/alunos-da-turma-progresso.js` | fonte provável de entrega/nota por aluno (a performance é decidida em #293.5/#293.9) |
| Faltas | `assets/js/falta-aluno-progresso.js` | R15: aluno com falta não conta como pendente |
| Nota mínima | `materia.json` → `avaliacao.nota_minima` (ex.: 7,0) + `assets/js/calculo-nota-progresso.js` | comparar a nota do aluno com a mínima da matéria |
| Carga de módulos | `assets/js/atividades-crud-modal.js` (~737–744) | injetar `indice-atividades-pendentes.js`/`.css` junto do `indice-atividades-feitas.js` |
| Nome proposto | `assets/js/indice-atividades-pendentes.js` + `assets/css/indice-atividades-pendentes.css` | classes `atividade-pendente-card` (vermelho) e `atividade-concluida-card` (verde) no `article.aula` |

### #293.3 — Levantamento no banco: entrega, nota, bloqueio e turma do aluno

**Próximo passo:** com o Supabase, identificar as tabelas/views que dizem (1) aluno entregou a atividade, (2) nota da atividade, (3) bloqueio da atividade por turma, (4) turma do aluno; anotar nomes e colunas.

- **Nível:** PESADO — consulta ao banco e leitura de RLS.
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** mapear `resposta_*`/entrega, `atividade.bloqueio`, `turma`, `turmaprofessor`, `correcao_discursiva`/notas e a função de nota já usada pelo progresso.
- **Critérios de aceitação:** etapa com as fontes e as colunas certas para a regra.
- **Verificação:** consulta de leitura devolve as colunas citadas.
- **Entrega:** —

### #293.4 — Definir na etapa a regra exata de "atividade pendente"

**Próximo passo:** escrever a regra final (a) não fez e (b) nota < mínimo, com os casos de borda (sem nota, recuperação, falta, 3 tentativas).

- **Nível:** MEDIO — texto de regra com lógica, sem banco.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** regra única para todas as matérias, citando as fontes de #293.3.
- **Critérios de aceitação:** cada caso de borda fechado e coerente com R1–R4.
- **Verificação:** leitura da seção e conferência com as fontes.
- **Entrega:** —

### #293.5 — Decidir a agregação por turma: consulta existente × view/função nova

**Próximo passo:** comparar as alternativas (reaproveitar consultas do progresso × criar view `atividades_pendentes_turma` × RPC) e registrar a escolha na etapa com custo e RLS.

- **Nível:** PESADO — decisão de arquitetura/dados.
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** uma linha por atividade com (id, turma, qtd pendentes) e a regra de permissão.
- **Critérios de aceitação:** decisão registrada; se for view nova, o SQL descrito.
- **Verificação:** leitura da Decisão + conferência das fontes.
- **Entrega:** —

### #293.6 — Escrever o SQL (view/função) da agregação, se a decisão for nova

**Próximo passo:** arquivo em `database/` com a view/função, comentários e RLS; sem dados de aluno no arquivo.

- **Nível:** PESADO — SQL em `database/`.
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** devolver `atividade_id`, `turma`, `qtd_pendentes`, `qtd_nao_fizeram`, `qtd_nota_baixa`.
- **Critérios de aceitação:** SQL revisado; `git diff` só com o arquivo novo.
- **Verificação:** leitura do SQL e conferência das colunas.
- **Entrega:** —

### #293.7 — Aplicar o SQL no Supabase e conferir o resultado

**Próximo passo:** rodar o SQL no banco e conferir com uma turma conhecida os pendentes.

- **Nível:** PESADO — banco de produção (só Claude Code local).
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** aplicar e registrar a conferência (ids de atividade × turma × qtd).
- **Critérios de aceitação:** consulta confere com a lista de alunos da turma.
- **Verificação:** consulta de leitura depois de aplicar.
- **Entrega:** —

### #293.8 — RLS/segurança da agregação: aluno não lê

**Próximo passo:** conferir como aluno que a view/função não devolve linha e que nada de outro aluno aparece.

- **Nível:** PESADO — segurança/RLS.
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** política de leitura só para professor da turma; administrador como já é no projeto.
- **Critérios de aceitação:** aluno e visitante sem acesso (I5).
- **Verificação:** consulta com o login do aluno.
- **Entrega:** —

### #293.9 — Conferir o desempenho da agregação na turma maior

**Próximo passo:** medir o tempo/linhas da consulta na turma com mais alunos e registrar; se ruim, propor ajuste (índice/cache).

- **Nível:** PESADO — consulta ao banco.
- **Modelo:** PESADO · só Claude Code local (Opus 5.5+/Fable) — nunca outro
- **Descrição:** uma consulta por turma (não por card), com o resultado registrado na etapa.
- **Critérios de aceitação:** tempo aceitável registrado; sem N+1 por card.
- **Verificação:** medição e anotação.
- **Entrega:** —

### #293.10 — Regra "pendente" no JavaScript

**Próximo passo:** criar o módulo que transforma (entregas, notas, bloqueios) em um conjunto de atividades pendentes por turma, seguindo a regra de #293.4.

- **Nível:** MEDIO — lógica em 1 arquivo JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** arquivo novo (ex.: `assets/js/indice-atividades-pendentes.js`), funções puras e JSDoc.
- **Critérios de aceitação:** regra (a)/(b) coberta; sem consulta por card.
- **Verificação:** leitura + conferência dos casos.
- **Entrega:** —

### #293.11 — Nota mínima da matéria e comparação com a nota do aluno

**Próximo passo:** — (entregue em 2026-10-19 13:03; o uso nos cards entra na #293.10).

- **Nível:** MEDIO — lógica em JS/config.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** usar a mesma nota já exibida ao professor (professor > IA quando houver).
- **Critérios de aceitação:** 7,0 do ITIC conferido como exemplo.
- **Verificação:** leitura/conferência com um aluno conhecido.
- **Entrega:** `assets/js/indice-atividades-pendentes.js` com `carregarNotaMinimaPendentes` (lê `../materia.json` → `avaliacao.nota_minima`), `normalizarNotaMinimaPendentes` (válida entre 0 e 10; inválida → 7,0) e `notaAbaixoDoMinimoPendentes` (sem nota conta como abaixo do mínimo). Conferido: ITIC tem `7.0`; TESTES-DE-FRONTEND não tem o campo numérico (só "nota final ≥ 7,0" no texto) → usa 7,0; falha de leitura → 7,0 sem quebrar a página. A carga no índice e o uso ficam para a #293.10/#293.13.
- **Verificação:** `node --check assets/js/indice-atividades-pendentes.js` OK; leitura dos dois `materia.json` (7.0 e fallback).

### #293.12 — Ler a turma do combo "Turma:" e refiltrar ao trocar

**Próximo passo:** — (entregue em 2026-10-19 13:08; o uso nos cards entra na #293.10/#293.13).

- **Nível:** MEDIO — lógica em JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** usar o mesmo estado da turma favorita/bloqueio já existente.
- **Critérios de aceitação:** troca de turma atualiza os cards.
- **Verificação:** troca manual no combo (R5).
- **Entrega:** `assets/js/indice-atividades-pendentes.js` com `obterTurmaPendentes` (lê `.barra-turma-favorita__lista`, devolve '' sem turma) e `ouvirTrocaDeTurmaPendentes(aoMudar)` (delegação do `change` no combo + eventos `turma-indice-alterada` e `turma-favorita-alterada`; chama uma vez ao ligar). Conferido com `indice-turma-favorita.js` (seletor e evento `turma-indice-alterada`, linha 16) e `indice-atividades-bloqueio.js` (evento `turma-favorita-alterada`).
- **Verificação:** `node --check assets/js/indice-atividades-pendentes.js` OK; leitura dos eventos/seletor nos módulos citados.

### #293.13 — Recalcular ao remontar os cards

**Próximo passo:** escutar `cards-aula-montados` e reaplicar o alerta nos cards recriados.

- **Nível:** MEDIO — lógica em JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** mesma abordagem usada pelo bloqueio/"Fez Atividade?".
- **Critérios de aceitação:** gerenciar/editar aula e voltar aplica o alerta.
- **Verificação:** fluxo manual (R6).
- **Entrega:** —

### #293.14 — CSS do alerta: fundo vermelho claro piscando

**Próximo passo:** criar `assets/css/indice-atividades-pendentes.css` (ou acrescentar no CSS do índice) com a classe e os keyframes.

- **Nível:** MEDIO — CSS com animação.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** vermelho claro legível no tema do projeto; pinta o **card inteiro** da aula (Q1); animação de ≈1 s; sem mover layout.
- **Critérios de aceitação:** classe aplicada pinta o card e pisca (R8).
- **Verificação:** inspeção do CSS e do card.
- **Entrega:** —

### #293.15 — Movimento reduzido: sem piscar

**Próximo passo:** acrescentar `@media (prefers-reduced-motion: reduce)` deixando o fundo fixo.

- **Nível:** MEDIO — CSS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** mesma cor, sem keyframes.
- **Critérios de aceitação:** com a preferência ligada, não pisca (R8).
- **Verificação:** leitura do CSS.
- **Entrega:** —

### #293.16 — Só professor: aplicar a classe apenas ao papel professor

**Próximo passo:** usar o papel do usuário (já lido pelo header) para aplicar o alerta só ao professor da turma.

- **Nível:** PESADO — permissão/papel (segurança).
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro — nunca outro
- **Descrição:** aluno/visitante sem classe e sem consulta (I1).
- **Critérios de aceitação:** conferido com login de aluno.
- **Verificação:** leitura + conferência com aluno.
- **Entrega:** —

### #293.17 — Não alertar atividade bloqueada nem card todo bloqueado

**Próximo passo:** reaproveitar a mesma decisão de bloqueio do índice e garantir alerta desligado quando a atividade está bloqueada para a turma.

- **Nível:** MEDIO — lógica em JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** vale também para aula bloqueada/inativa (R2).
- **Critérios de aceitação:** ON/OFF de bloqueio reflete no alerta.
- **Verificação:** teste manual com bloqueio (R2).
- **Entrega:** —

### #293.18 — Sem turma escolhida: nenhum alerta

**Próximo passo:** tratar ausência de turma (professor sem turma, "Todas as turmas") sem erro e sem alerta.

- **Nível:** MEDIO — lógica em JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** mesma regra para lista vazia.
- **Critérios de aceitação:** perfil sem turma não vê alerta (R9).
- **Verificação:** conferência com perfil sem turma.
- **Entrega:** —

### #293.19 — Falha da consulta: sem alerta e sem erro na tela

**Próximo passo:** tratar rejeição/timeout da consulta e registrar só no console.

- **Nível:** MEDIO — lógica em JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** índice continua funcionando (R10).
- **Critérios de aceitação:** com a consulta falhando, nada de alerta nem de erro visível.
- **Verificação:** simulação de falha.
- **Entrega:** —

### #293.20 — Acessibilidade do alerta

**Próximo passo:** acrescentar ao card um texto/dica (title/aria-label) dizendo que há aluno pendente, sem expor nome de aluno.

- **Nível:** MEDIO — HTML/JS acessibilidade.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** leitor de tela anuncia o alerta; cor não é o único sinal.
- **Critérios de aceitação:** dica presente no card com alerta e ausente sem alerta.
- **Verificação:** leitura do DOM.
- **Entrega:** —

### #293.21 — Conferir os casos de pendência

**Próximo passo:** montar a lista de casos (turma sem pendente; 1 aluno; vários; entregue com nota baixa; atividade bloqueada) e conferir card a card.

- **Nível:** MEDIO — conferência com lógica.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** registrar na etapa a tabela caso × resultado.
- **Critérios de aceitação:** todos os casos conferidos e anotados.
- **Verificação:** leitura da tabela + conferência no índice.
- **Entrega:** —

### #293.22 — Conferir a troca de turma no combo

**Próximo passo:** trocar entre todas as turmas do professor e conferir que os cards mudam só quando devem (I4/R5).

- **Nível:** MEDIO — conferência.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** inclui "Todas as turmas" e turma favorita.
- **Critérios de aceitação:** resultados anotados.
- **Verificação:** conferência manual.
- **Entrega:** —

### #293.23 — Conferir como aluno e visitante: alerta não aparece

**Próximo passo:** com login de aluno (de uma turma com pendentes) e sem login, abrir o índice e conferir que nenhum card recebe a classe.

- **Nível:** PESADO — segurança (I1).
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro — nunca outro
- **Descrição:** conferir também que a consulta não devolve dados de outros alunos.
- **Critérios de aceitação:** nenhuma classe/cor de alerta e nenhum dado de aluno.
- **Verificação:** conferência com os dois perfis.
- **Entrega:** —

### #293.24 — Conferir o visual do alerta

**Próximo passo:** conferir piscar suave, cor, legibilidade e `prefers-reduced-motion`; comparar layout com e sem alerta.

- **Nível:** MEDIO — conferência visual/CSS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** anotar o resultado e ajustar o CSS se preciso.
- **Critérios de aceitação:** sem deslocamento de layout (I3); reduced motion sem animação.
- **Verificação:** leitura mesmo (sem navegador automatizado).
- **Entrega:** —

### #293.25 — Conferir que o aluno não perdeu nada

**Próximo passo:** conferir cores do andamento, cadeado da bloqueada e "Fez Atividade?" do aluno continuam iguais.

- **Nível:** MEDIO — conferência.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** comparar com o comportamento anterior.
- **Critérios de aceitação:** nada do aluno mudou.
- **Verificação:** conferência manual.
- **Entrega:** —

### #293.26 — Documentar em `docs/regras/atividades.md`

**Próximo passo:** acrescentar um item ✅ com o alerta vermelho **e o estado verde**, a regra de pendente, a turma e a nota mínima.

- **Nível:** LEVE — só `.md`.
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash — nunca outro
- **Descrição:** apontar os arquivos de código criados.
- **Critérios de aceitação:** texto coerente com o implementado.
- **Verificação:** leitura do trecho.
- **Entrega:** —

### #293.27 — Fechamento: quadro, visualizador e commit + push

**Próximo passo:** mover as linhas ✅ para `tasks/task_complete.md`, regenerar o visualizador e fazer 1 commit + push na `main`.

- **Nível:** LEVE — quadro/documentação.
- **Modelo:** LEVE · só Haiku/Flash/deepseek-flash — nunca outro
- **Descrição:** conferir que todas as subtarefas fecharam e que a mãe fecha junto.
- **Critérios de aceitação:** quadro sem pendências da #293; commit + push na `main`.
- **Verificação:** `git log -1` e quadro.
- **Entrega:** —

### #293.28 — Regra "todas concluídas" (estado verde)

**Próximo passo:** no módulo de #293.10, calcular por card se **todas** as atividades dele estão concluídas pela turma (zero pendentes) e devolver o estado verde.

- **Nível:** MEDIO — lógica em 1 arquivo JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** reaproveita a regra de pendente de #293.10; verde só com zero pendentes e nenhuma atividade bloqueada (R11/R14).
- **Critérios de aceitação:** nenhum card verde com pendente; card com atividade bloqueada não fica verde.
- **Verificação:** leitura + conferência dos casos (#293.31).
- **Entrega:** —

### #293.29 — CSS do fundo verde claro

**Próximo passo:** acrescentar a classe do verde e a variável de cor verde clara no mesmo CSS de #293.14, com fundo **fixo** (sem animação).

- **Nível:** MEDIO — CSS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** contraste legível; só `background`/`box-shadow`, sem `margin`/`padding`.
- **Critérios de aceitação:** card fica verde claro, sem piscar (R11).
- **Verificação:** inspeção do CSS e do card.
- **Entrega:** —

### #293.30 — Aplicar/remover o verde ao trocar de turma e ao remontar os cards

**Próximo passo:** no mesmo módulo de aplicação (#293.13), alternar **vermelho × verde × nenhum** a cada troca de turma e a cada `cards-aula-montados`.

- **Nível:** MEDIO — lógica em JS.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** remover a classe anterior antes de aplicar a nova (R12).
- **Critérios de aceitação:** troca de turma e remontagem refletem o estado certo; nunca os dois juntos.
- **Verificação:** conferência manual (#293.31).
- **Entrega:** —

### #293.31 — Conferir os casos do verde e do vermelho

**Próximo passo:** conferir e anotar na etapa: turma toda entregue com nota ≥ mínima (verde); 1 pendente (vermelho, sem verde); entregue com nota baixa (vermelho); atividade bloqueada (nenhuma cor); "Todas as turmas" (nenhuma cor).

- **Nível:** MEDIO — conferência com lógica.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Descrição:** tabela caso × resultado.
- **Critérios de aceitação:** I6 e I7 conferidos.
- **Verificação:** conferência manual no índice.
- **Entrega:** —

### #293.32 — Conferir como aluno/visitante: verde não aparece

**Próximo passo:** com login de aluno e sem login, conferir que nenhum card fica verde nem vermelho.

- **Nível:** PESADO — segurança (I8).
- **Modelo:** PESADO · só Opus 5.5+/Fable/DeepSeek/deepseek-v4-pro — nunca outro
- **Descrição:** conferir também que a consulta não devolve dados de outros alunos (R13).
- **Critérios de aceitação:** nenhuma classe/cor de estado e nenhum dado de aluno.
- **Verificação:** conferência com os dois perfis.
- **Entrega:** —
