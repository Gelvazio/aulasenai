## Etapa 410-f3c66658 — #281: Mostrar aos alunos as atividades bloqueadas

**Tarefa:** #281 · **Pedido em:** 2026-10-18 19:34 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** "mostre as atividades aos alunos,mesmo bloqueadas"
**Objetivo:** o aluno (e o visitante) vê no card do índice **todas** as atividades da aula, inclusive
as bloqueadas, em vez de elas sumirem da lista; a atividade bloqueada aparece marcada com 🔒, fica
apagada e **não abre** (o link continua sem `href` e o RLS do banco não muda).

### Escopo

- **Entra:** no índice de atividades, o aluno passa a ver as atividades que não pode ler, marcadas e
  desativadas; o card de aula não some mais quando todas as atividades dele estão bloqueadas.
- **Não entra:** liberar o acesso às atividades bloqueadas (o link continua sem `href` e o RLS
  continua devolvendo só as liberadas), o ON/OFF e o visual do professor, e o banco.
- **Pronto quando:** o aluno vê todas as atividades do card; as bloqueadas com 🔒, apagadas e sem
  abrir; o card nunca some por causa do bloqueio das atividades; sem erro de JS.
- **Segurança (invariante):** é só visual — nenhum `href` é devolvido e o RLS/JWT não mudam.
- ⚠️ Sem navegador: a conferência final na tela é do usuário.

### #281.1 — Mostrar as atividades bloqueadas ao aluno em vez de esconder

**Próximo passo:** — (entregue em 2026-10-18 19:36).

- **Nível:** MEDIO — tela: 1 JS + 1 CSS e a regra em `docs/`; sem banco e sem mexer em RLS/JWT.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
- **Executor:** DeepSeek Harness (deepseek-flash) (local · main)
- **Descrição:** (1) `assets/js/indice-atividades-bloqueio.js`: `ocultarLinkAluno` vira
  "marcar como bloqueada" — continua guardando o `href` em `data-href-bloqueado`, tira o `href` e o
  `tabindex`, mas põe a classe nova `atividade--bloqueada-para-aluno` (não some mais); o card não
  ganha mais a classe que o esconde quando todas as atividades estão bloqueadas; comentários do
  topo e das funções atualizados; (2) `assets/css/indice-atividades-bloquear.css`: sai a regra que
  esconde (`.atividade--oculta-para-aluno` e `.aula--atividades-ocultas-para-aluno`) e entra o visual
  da atividade bloqueada do aluno (apagada, `cursor: not-allowed` e 🔒 antes do nome);
  (3) `docs/regras/atividades.md`: a regra do ON/OFF por atividade passa a dizer que o aluno vê a
  atividade bloqueada com 🔒 e que ela não abre.
- **Critérios de aceitação:** o aluno vê todas as atividades do card; as bloqueadas com 🔒, apagadas
  e sem abrir (sem `href`); o card não some quando todas as atividades estão bloqueadas; o professor
  não muda; `node --check` no JS.
- **Entrega:** `assets/js/indice-atividades-bloqueio.js` — `ocultarLinkAluno` virou
  `marcarLinkBloqueadoAluno` (guarda `data-href-bloqueado`, tira `href`/`tabindex`, põe
  `aria-disabled`, `title` "Atividade bloqueada pelo professor" e a classe
  `atividade--bloqueada-para-aluno`); `ocultarAtividadesBloqueadasAluno` virou
  `marcarAtividadesBloqueadasAluno` e não mexe mais no card (saiu `CLASSE_CARD_OCULTO_ALUNO_ATIVIDADES`);
  a constante `CLASSE_LINK_OCULTO_ALUNO` virou `CLASSE_LINK_BLOQUEADO_ALUNO` e entrou
  `TEXTO_ATIVIDADE_BLOQUEADA_ALUNO`; comentários do topo, do evento `cards-aula-montados` e de
  `aplicarBloqueioAluno` atualizados. `assets/css/indice-atividades-bloquear.css` — saíram as duas
  regras de `display: none` (atividade e card) e entraram o visual da atividade bloqueada do aluno
  (`opacity: 0.55`, `cursor: not-allowed`, 🔒 via `::before` e hover sem escurecer).
  `docs/regras/atividades.md` — a regra do ON/OFF por atividade diz que o aluno vê todas as
  atividades, as bloqueadas com 🔒 e sem abrir, e que o card não some por isso.
- **Verificação:** `node --check assets/js/indice-atividades-bloqueio.js` OK; busca em
  `assets/js/*.js` e `assets/css/*.css` sem nenhuma ocorrência de
  `atividade--oculta-para-aluno`, `aula--atividades-ocultas-para-aluno`, `ocultarLinkAluno` e
  `ocultarAtividadesBloqueadasAluno`; `data-href-bloqueado` continua guardado (o
  `indice-aula-data.js` usa o endereço para achar a aula do card); `atividadesBloqueiamCard()`
  continua usado pelo fluxo do professor; `git diff --check` limpo nos arquivos da tarefa; sem banco
  e sem navegador (conferir na tela é do usuário).
- **Anotação:** quando o aluno não consegue ler **nenhuma** atividade (`ativas` vazio), o código
  segue saindo cedo (`if (!ativas.size) return;`) — é a proteção para pastas não gerenciadas pelo
  banco e ficou como estava; nesse caso as atividades continuam vindo do HTML, como antes.
