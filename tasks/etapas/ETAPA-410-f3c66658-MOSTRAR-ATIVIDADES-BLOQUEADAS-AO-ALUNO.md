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

**Próximo passo:** trocar o "ocultar" por "marcar como bloqueada" no JS e no CSS e atualizar a regra.

- **Nível:** MEDIO — tela: 1 JS + 1 CSS e a regra em `docs/`; sem banco e sem mexer em RLS/JWT.
- **Modelo:** MEDIO · só Sonnet/Pro/DeepSeek/deepseek-flash thinking — nunca outro
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
- **Verificação:** `node --check`; busca pela classe antiga no repositório; leitura do CSS e da
  regra atualizados; conferir que o `data-href-bloqueado` continua guardado (o `indice-aula-data.js`
  usa o endereço para achar a aula do card); sem banco e sem navegador.
- **Entrega:** — · **Anotação:** —
