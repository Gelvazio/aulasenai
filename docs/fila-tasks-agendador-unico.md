# Fila `tasks` no banco + 1 agendador que lê a fila e decide

**Tarefa:** #24-9fb25086-5b51-44cb · **Etapa:** 142-2a52ee2f
**Criado em:** 2026-10-11 05:44:00 · **Concluído em:** 2026-10-11 06:00 (falta o aceite) · **Tempo decorrido:** 16 min
**Pedido (2026-10-11 05:42):** "Quero criar 1 agendador que apenas controle 1 tabela de nome tasks,
que a IA vai ler e decidir se executa algo ou não".
**Decisões do usuário (2026-10-11 05:44):** (1) a fila `tasks` **substitui a tarefa #23**
(`agendamentos.html`, `agendamento`, `trava_aula`); (2) **fila vazia = não faz nada** (só o log);
(3) cadastro por uma **página de CRUD** (`tasks.html`, só o Professor Administrador).
**Regra nova do usuário (2026-10-11 05:45):** "toda task.md deve existir na tabela e no GitHub" —
ver a seção "Regra: toda task na tabela e no GitHub".

## Objetivo

Uma única rotina agendada que, a cada hora, pega **1 tarefa** da tabela `tasks` do Supabase, decide
se pode executá-la dentro das regras do `CLAUDE.md` e grava o resultado na própria linha; o
professor controla tudo cadastrando, ligando e desligando linhas na página `tasks.html`.

## Escopo

- **Entra:** tabela `tasks` com RLS; funções `pegar_proxima_task` e `finalizar_task`; página
  `tasks.html` (CRUD, ON/OFF, resultado) e menu **TASKS** do administrador; nova regra das tarefas
  agendadas (fila no lugar da escolha automática de aula); prompt novo da rotina "Tarefa Aulas
  Senai" (continua desligada até o usuário liberar o GitHub — item 140.6); cancelamento da #23.
- **Não entra:** a página criar/pausar a rotina real do claude.ai (o navegador não tem acesso a essa
  API); escolha automática de aula com a fila vazia; mais de 1 rotina; gabarito, senha ou dado de
  aluno na fila.
- **Critério de pronto:** SQL aplicado e conferido por consultas (inclusive 2 chamadas seguidas de
  `pegar_proxima_task` não pegam a mesma linha); JS conferido com `node --check`; regra e prompt
  atualizados; teste do usuário logado como administrador e aceite.
- **Premissas e restrições:** regras do `CLAUDE.md` (RLS, SQL idempotente em `database/`, sem
  `<style>`/`<script>` embutidos, sem `onclick`, popup no lugar de `alert()`, guarda de sessão no
  `<head>`, até 1000 linhas por arquivo e 45 por função, nomes em português). Uma rotina roda no
  máximo 1 vez por hora.

## Tabela `tasks`

| Coluna | Tipo | Observação |
|---|---|---|
| `id` | bigint identity | chave |
| `codigo` | text unique not null | id da tarefa, igual no Git: `#NN-uuid` (as do `TASKS.md`) ou `TASK-NNNN` (criadas na página) |
| `origem` | text | `repositorio` (veio do `TASKS.md`) ou `pagina` |
| `arquivo_md` | text | caminho do `.md` no Git (`tasks/TASKS.md#…` ou `tasks/fila/TASK-NNNN.md`) |
| `md5_md` | text | md5 do bloco/arquivo no Git na última sincronização |
| `sincronizado_em` | timestamptz | última vez que tabela e Git foram conferidos iguais |
| `titulo` | text not null | resumo curto |
| `instrucao` | text not null | o que a IA deve fazer (texto livre) |
| `prioridade` | smallint default 3 | 1 = mais alta … 5 = mais baixa |
| `executar` | boolean default true | ON/OFF: OFF nunca é pego |
| `executar_apos` | timestamptz null | não é pego antes desta data e hora |
| `status` | text default `pendente` | `pendente`, `em_execucao`, `concluida`, `recusada`, `erro`, `cancelada` (check) |
| `tentativas` / `max_tentativas` | smallint 0 / 3 | `erro` volta a `pendente` até o máximo |
| `trava_frente`, `trava_em`, `expira_em` | text, timestamptz | quem pegou; expira em 90 min |
| `resultado` | text | o que foi feito, ou por que recusou |
| `pr_url`, `commit_sha` | text | entrega no Git |
| `log_id` | uuid null | linha do `agendamento_tarefa_logs` |
| `excluido` | boolean default false | exclusão lógica |
| `criado_em`, `atualizado_em`, `criado_por`, `atualizado_por` | | trigger + `auth.uid()` |

- **`pegar_proxima_task(frente text)`** (`security definer`, `search_path` fixo): volta a
  `pendente` as `em_execucao` vencidas (`expira_em < now()`), escolhe 1 linha com `executar`,
  `status = 'pendente'`, `not excluido` e `executar_apos` nulo ou passado, ordenada por
  `prioridade, criado_em`, com `for update skip locked`; marca `em_execucao`, trava e soma
  `tentativas`; devolve a linha (ou nada).
- **`finalizar_task(id, status, resultado, pr_url, commit_sha)`**: só aceita linha `em_execucao`;
  grava o status final (`erro` com tentativas sobrando volta a `pendente`).
- **RLS:** ligado; `select`/`insert`/`update` só com `eh_professor_administrador()`; sem `delete`
  para a API; `revoke execute` das funções de `anon` e `authenticated` (só o conector da rotina
  chama).
- **Log:** `agendamento_tarefa_logs` continua; status novos `sem_tarefa` e `recusada` (a coluna
  não tem check).

## Regra: toda task na tabela e no GitHub

- ⛔ **Nenhuma task existe só num lado.** Toda tarefa do `tasks/TASKS.md` tem a linha dela na
  tabela `tasks` (mesmo `codigo`) e toda linha da tabela tem o `.md` dela no GitHub.
- ✅ **Tarefa do `TASKS.md` → tabela:** entra com `origem = 'repositorio'`, o `codigo` do título
  (`#24-9fb25086-5b51-44cb`) e **`executar = false`** (a rotina só a executa se o professor ligar
  o ON/OFF na página). Carga inicial: as 18 tarefas pendentes de hoje.
- ✅ **Linha criada na página → GitHub:** ganha o arquivo `tasks/fila/TASK-NNNN.md` (título,
  instrução, prioridade, status, resultado, PR), gerado pelo script, e entra no Git por commit +
  PR juntado.
- ✅ **Script único:** `scripts/tasks/sincronizar_tasks.py` (sem chave do banco no repositório):
  `importar` lê o `TASKS.md` e gera o SQL idempotente das linhas que faltam; `exportar` lê o JSON da
  tabela (consulta pelo conector) e escreve/atualiza os `.md` de `tasks/fila/`; `conferir` compara
  os dois lados pelo md5 e lista o que falta em cada um. O SQL e o JSON são aplicados/lidos pelo
  conector do Supabase.
- ✅ **Quando sincronizar:** em **toda execução da rotina** (antes de pegar a task; a sincronização
  é a única coisa que roda com a fila vazia, e só gera commit se houver diferença), ao criar ou
  concluir tarefa numa sessão do Claude e ao mudar o status de uma task.
- ✅ **Em conflito, quem vence:** texto da tarefa (descrição longa) = **GitHub**; status, ON/OFF,
  prioridade e resultado da execução = **tabela**. Status oficial do projeto continua no
  `tasks/STATUS.md` (fonte única), atualizado junto.
- ✅ A rotina e o `scripts/analise-materias.py` não mudam por isso; o `CLAUDE.md` ganha esta regra
  no passo 8.

## Fluxo da rotina (1 por hora)

1. Inicialização do `CLAUDE.md` (trazer a `main`, `STATUS.md`, `RECADOS.md`, seeds).
2. **Sincronizar** tabela × GitHub (`scripts/tasks/sincronizar_tasks.py conferir`; faltando algo,
   importar/exportar, commit + PR + merge).
3. `select * from pegar_proxima_task('<frente>')` pelo conector.
4. **Nada veio:** não altera mais nada; grava o log `sem_tarefa` e encerra.
5. **Veio uma tarefa:** a IA lê a `instrucao` e decide:
   - **Executa** se cabe nas regras (sem push na `main`, sem segredo, sem afrouxar RLS, sem gabarito
     publicado…): branch própria, commit + push + PR + merge, `finalizar_task(... 'concluida' ...)`.
   - **Recusa** se fere uma regra, é ambígua ou precisa de decisão do usuário:
     `finalizar_task(... 'recusada', '<motivo>')`, sem mexer no repositório.
   - **Erro** técnico: `finalizar_task(... 'erro', '<mensagem>')` (tenta de novo na próxima hora
     até `max_tentativas`).
6. Grava o `.md` da task (`exportar`) e o log da execução (com `log_id` na linha da task).

## Página `tasks.html`

- Raiz, no padrão de `cursos.html`; `js/header-usuario.js` no início do `<head>`; bloqueio se não
  for administrador; menu **TASKS** em `MENU_ADMINISTRADOR_HEADER`.
- Lista com filtro por status: id, título, prioridade, ON/OFF, executar após, status, tentativas,
  resultado, link do PR, atualizado em.
- ➕ Nova, ✏️ Editar (modal), ON/OFF, 🚫 Cancelar e 🗑️ Excluir lógico (popup de confirmação),
  🔁 Reabrir (volta `recusada`/`erro`/`cancelada` para `pendente`). Linha `em_execucao` não é
  editada.
- Arquivos: `assets/js/tasks-repositorio.js` (dados), `assets/js/tasks-pagina.js` (lista),
  `assets/js/tasks-modais.js` (formulário), `assets/css/tasks.css`.

## Passos

| # | Ação | Caminho | Verificação | Status |
|---|---|---|---|---|
| 1 | Conferir o banco real (`tasks` não existe; `eh_professor_administrador`; log) | Supabase | consultas de leitura | ✅ 2026-10-11 05:43 |
| 2 | SQL idempotente: tabela, check, índices, trigger, funções, RLS | `database/2026-10-11-tasks-fila-agendador.sql` | leitura do SQL | ✅ 2026-10-11 06:00 |
| 3 | Aplicar pelo conector e conferir (2 chamadas de `pegar_proxima_task` com 1 linha de teste: a 2ª volta vazia; `finalizar_task`; linha de teste marcada `excluido`) | Supabase | `information_schema`, `pg_policies` | ✅ 2026-10-11 06:00 |
| 3.1 | Script `importar`/`exportar`/`conferir` + carga das 18 tarefas do `TASKS.md` (OFF) + `tasks/fila/` | `scripts/tasks/sincronizar_tasks.py`, `tasks/fila/` | `python3 … conferir` sem diferenças | ✅ 2026-10-11 06:00 |
| 4 | `docs/database.md` + `docs/relatorio_verificacao_database.html` | `docs/` | leitura | ✅ 2026-10-11 06:00 |
| 5 | Repositório JS | `assets/js/tasks-repositorio.js` | `node --check` | ✅ 2026-10-11 06:00 |
| 6 | Página, modais e CSS | `tasks.html`, `assets/js/tasks-*.js`, `assets/css/tasks.css` | `node --check`, `tags_header.py` idempotente, sem `onclick`/`<style>` | ✅ 2026-10-11 06:00 |
| 7 | Menu TASKS | `js/header-usuario.js` | `node --check` | ✅ 2026-10-11 06:00 |
| 8 | Regra `docs/regras/tarefas-agendadas.md` reescrita para a fila + `CLAUDE.md` (seção, versão, histórico) + visualizador conferido | `docs/regras/`, `CLAUDE.md`, `docs/HISTORICO-REGRAS.md` | leitura; `node` no padrão do `regras-modal.js` | ✅ 2026-10-11 06:00 |
| 9 | Prompt novo da rotina "Tarefa Aulas Senai" (continua desligada) | rotina `trig_01TWTtS63BUBzE46KMQ3t3PW` | `get_trigger` | ✅ 2026-10-11 06:00 |
| 10 | #23 cancelada (STATUS, TASKS, etapa 141, plano marcado como substituído) | `tasks/`, `docs/` | leitura | ✅ 2026-10-11 06:00 |
| 11 | Status, commit, push, PR e merge | `tasks/` | PR juntado | ✅ 2026-10-11 06:00 |
| 12 | Teste do usuário (cadastrar 1 task) e aceite; depois ligar a rotina (com o GitHub liberado, item 140.6) | — | — | ⬜ |

## Riscos

| Risco | Plano B |
|---|---|
| Instrução perigosa ou contra as regras cadastrada na fila | A IA recusa (`recusada` com o motivo); a página é só do administrador (RLS) |
| Execução cai no meio e a linha fica `em_execucao` | `expira_em` de 90 min: a próxima chamada devolve a linha para `pendente` |
| Tarefa grande demais para 1 execução | A IA entrega a parte que fechar (PR juntado), grava `recusada` com o que falta e o professor divide em tasks menores |
| Tabela e GitHub divergem (edição na página sem rotina rodando) | `conferir` em toda execução e coluna `sincronizado_em` na página ("⚠️ não sincronizado") |
| Rotina sem acesso ao GitHub | Log `erro`; item 140.6 continua com o usuário |

## Resultado

- Tabela `tasks` e funções `pegar_proxima_task` / `finalizar_task` aplicadas (o bloco único voltou
  "cancelled" no conector; aplicado em 5 partes). Teste numa transação desfeita: 2ª chamada vazia
  com a 1ª travada, linha OFF não pega, trava vencida retomada, `erro` volta a `pendente`.
- 17 tarefas do `TASKS.md` na tabela, desligadas, com o md5 calculado pelo banco igual ao do Git.
- `tasks.html` (menu TASKS), regra `docs/regras/tarefas-agendadas.md` reescrita, `CLAUDE.md`
  2026-10-11 05:57:00, prompt da rotina atualizado (continua desligada).
- #22 (rotinas 2 a 6) e #23 (`agendamentos.html`) canceladas.
- **Pendente:** teste e aceite do usuário (142.5); liberar o GitHub para a rotina (140.6) e ligá-la.
