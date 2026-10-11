# Agendamentos: CRUD em `agendamentos.html` e espelho dos controles no banco

**Tarefa:** #23-79fc30a3-c4c9-4a40 · **Etapa:** 141-a7e81c26
**Criado em:** 2026-10-11 05:36:04 · **Concluído em:** — · **Tempo decorrido:** —
**Pedido (2026-10-11 05:30):** "Crie um CRUD completo destas tarefas de nome agendamentos.html, com
validação de usuário e senha, migre o que for utils, status etc., e CLAUDE.md e conteúdos markdown;
sugira novas tabelas para a informação existir local e no banco de dados, de forma redundante".
**Decisões do usuário (2026-10-11 05:35):** (1) página **só do Professor Administrador**;
(2) a **origem dos Markdowns é sempre o repositório**; (3) começar pela **fase 1**.

## Objetivo

Ter uma tela única para cadastrar e acompanhar as tarefas agendadas e levar os controles do
projeto (travas, status, tarefas, recados, seeds e cópia dos Markdowns) para o Supabase, de forma
redundante com o Git, sem duas origens para o mesmo dado.

## Quem é a origem de cada informação (decisão 2)

| Informação | Origem | Cópia |
|---|---|---|
| `CLAUDE.md`, `docs/regras/`, ementas, aulas, fontes `.md` | **Repositório (Git)** | banco (`documento_markdown`), só leitura, com md5 e commit |
| Status gerados por script (`STATUS_MATERIA`, `STATUS-AULAS`, análise) | **arquivos da pasta**, pelos scripts | banco, gravado pelo mesmo script |
| Agendamentos, travas, log das execuções | **banco** | `.md` exportado (fase 2) |
| Tarefas, etapas, frentes, recados | **repositório** até a fase 2; depois do aceite da fase 2, **banco** com `.md` exportado | — |
| Registro dos seeds | `SEEDS-APLICADOS.md` até a fase 3; depois, **banco** com `.md` exportado | — |

## Escopo

- **Entra (fase 1):** tabelas `agendamento` e `trava_aula`, funções `travar_aula`/`liberar_trava_aula`,
  leitura do `agendamento_tarefa_logs` pelo administrador, página `agendamentos.html` com as abas
  **Agendamentos** (CRUD), **Execuções** (log) e **Travas**, menu **AGENDAMENTOS** do administrador,
  regra das tarefas agendadas usando a trava do banco.
- **Entra depois (cada fase com aprovação própria):** fase 2 (tarefas, etapas, frentes, recados +
  exportação para `.md`), fase 3 (seeds e status das aulas), fase 4 (`documento_markdown`,
  importação do Git e mudança das regras de "fonte única" no `CLAUDE.md`).
- **Não entra:** criar, pausar ou disparar a rotina real do claude.ai pela página (o navegador não
  tem acesso a essa API; quem aplica é uma sessão do Claude ou o usuário); senha própria da página;
  gabarito, padrão de resposta ou dado de aluno no banco de controle.
- **Critério de pronto da fase 1:** SQL aplicado e conferido por consultas; páginas e JS conferidos
  com `node --check` e leitura; teste do usuário logado como administrador (sem navegador do
  Claude) e aceite.
- **Premissas e restrições:** regras do `CLAUDE.md` (RLS ligado, SQL idempotente em `database/`,
  sem `<style>`/`<script>` embutidos, sem `onclick`, popup no lugar de `alert()`, guarda de sessão
  no `<head>`, até 1000 linhas por arquivo e 45 por função, nomes em português).

## Fase 1 — tabelas sugeridas

### `agendamento` (cadastro das rotinas; origem = banco)

| Coluna | Tipo | Observação |
|---|---|---|
| `id` | bigint identity | chave |
| `numero` | smallint | 1 a 6 (`check`) |
| `nome` | text | ex.: "Tarefa Aulas Senai" |
| `nome_tarefa_agendamento` | text | ex.: "Update aulas do SENAI (1)" (mesmo valor do log) |
| `tipo_assinatura` | text | mesmo `check` de 5 valores do log |
| `cron_expression` | text | ex.: `CRON_TZ=America/Sao_Paulo 3 1-23 * * *` |
| `prompt` | text | instruções da rotina |
| `prompt_md5` | text | calculado por trigger (mostra se a rotina real está igual) |
| `trigger_id` | text | id da rotina real (`trig_...`), preenchido quando aplicada |
| `ativo` | boolean | ligado/pausado |
| `aplicado_em` | timestamptz | quando o banco foi copiado para a rotina real |
| `excluido` | boolean default false | exclusão lógica |
| `criado_em`, `atualizado_em` | timestamptz | trigger |
| `atualizado_por` | uuid | `auth.uid()` |

Índice único `(tipo_assinatura, numero) where not excluido`. Carga inicial: a tarefa 1 atual
(`trig_01TWTtS63BUBzE46KMQ3t3PW`, pausada).

### `trava_aula` (reserva atômica da aula; origem = banco)

| Coluna | Tipo | Observação |
|---|---|---|
| `id` | bigint identity | chave |
| `materia_pasta` | text | caminho da matéria em `MATERIAIS/` |
| `aula` | smallint | número da aula |
| `frente` | text | ambiente + branch (nunca e-mail) |
| `agendamento_id` | bigint null | FK para `agendamento` |
| `situacao` | text | `aberta`, `concluida`, `liberada`, `expirada` |
| `inicio_em`, `expira_em` | timestamptz | `expira_em` = início + 90 min |
| `fim_em`, `observacao` | | |

Índice único `(materia_pasta, aula) where situacao = 'aberta'` → duas execuções nunca travam a
mesma aula. Função `travar_aula(materia, aula, frente, agendamento)` (marca as vencidas como
`expirada` e insere; devolve o id ou nulo se já travada) e `liberar_trava_aula(id, situacao,
observacao)`.

### `agendamento_tarefa_logs` (já existe)

Só ganha política de **leitura** para o administrador (hoje não tem nenhuma).

### Segurança

RLS ligado nas três; `select`/`insert`/`update` só com `eh_professor_administrador()`; sem
`delete` para a API (exclusão lógica); funções `security definer` com `search_path` fixo e
`revoke execute ... from anon`. O conector do Supabase (usado pelas rotinas) continua gravando.

## Fase 1 — página

- `agendamentos.html` (raiz), no padrão de `cursos.html`: `js/header-usuario.js` no início do
  `<head>` (sem login nada carrega), bloqueio na página se não for administrador.
- Abas:
  1. **Agendamentos** — lista (nº, nome, horário, assinatura, ativo, situação da rotina real:
     "✅ aplicado" se `aplicado_em` ≥ `atualizado_em`, senão "⚠️ pendente de aplicar"),
     filtro, ➕ Novo, ✏️ Editar (modal com todos os campos e o prompt), ON/OFF, 🗑️ Excluir
     (lógico, com popup de confirmação).
  2. **Execuções** — log das execuções (data, tarefa, status, aula, duração, PR/commit, erro),
     filtro por tarefa e status, detalhe com as instruções usadas.
  3. **Travas** — travas abertas e recentes; botão **Liberar** (com popup) para trava abandonada.
- Arquivos: `assets/js/agendamentos-repositorio.js` (dados), `assets/js/agendamentos-pagina.js`
  (abas e lista), `assets/js/agendamentos-modais.js` (formulário), `assets/js/agendamentos-execucoes.js`
  (execuções e travas), `assets/css/agendamentos.css`.
- Menu **AGENDAMENTOS** em `MENU_ADMINISTRADOR_HEADER` (`js/header-usuario.js`).

## Fase 1 — passos

| # | Ação | Caminho | Verificação | Status |
|---|---|---|---|---|
| 1 | Conferir o banco real (tabelas, `eh_professor_administrador`, log) | Supabase | consultas de leitura | ⬜ |
| 2 | SQL idempotente das tabelas, índices, triggers, funções, RLS e carga da tarefa 1 | `database/2026-10-11-agendamentos-travas.sql` | leitura do SQL | ⬜ |
| 3 | Aplicar o SQL pelo conector e conferir | Supabase | `information_schema`, `pg_policies`, teste de `travar_aula` duas vezes na mesma aula (2ª devolve nulo) e liberação | ⬜ |
| 4 | `docs/database.md` + `docs/relatorio_verificacao_database.html` com as tabelas novas | `docs/` | leitura | ⬜ |
| 5 | Repositório JS | `assets/js/agendamentos-repositorio.js` | `node --check` | ⬜ |
| 6 | Página, abas e modais + CSS | `agendamentos.html`, `assets/js/agendamentos-*.js`, `assets/css/agendamentos.css` | `node --check`, `tags_header.py` idempotente, sem `onclick`/`<style>` | ⬜ |
| 7 | Menu AGENDAMENTOS | `js/header-usuario.js` | `node --check` | ⬜ |
| 8 | Regra das tarefas agendadas usando `travar_aula` (sem PR só para travar; a linha em `RECADOS.md` vai junto com o trabalho da aula) + `CLAUDE.md` (versão e histórico) + prompt da rotina | `docs/regras/tarefas-agendadas.md`, `CLAUDE.md`, rotina | leitura; `get_trigger` | ⬜ |
| 9 | Status, commit, push, PR e merge | `tasks/` | PR juntado | ⬜ |
| 10 | Teste do usuário logado como administrador e aceite | — | — | ⬜ |

## Fases seguintes (resumo; cada uma ganha os passos detalhados quando for aprovada)

- **Fase 2:** tabelas `tarefa`, `etapa`, `etapa_item` (tipo aceite/ação → "Aguardando o usuário"
  como consulta), `frente_trabalho`, `recado`; abas na página; `scripts/sincronizacao/exportar_markdown.py`
  gera `tasks/STATUS.md`, `tasks/TASKS.md`, `tasks/etapas/` e `tasks/RECADOS.md` a partir do banco;
  regras do `CLAUDE.md` passam a dizer que o banco é a origem desse estado.
- **Fase 3:** `seed_registro` e `status_aula`, gravados pelos scripts de `scripts/seeds/` e
  `scripts/status-materias/`; `SEEDS-APLICADOS.md` exportado.
- **Fase 4:** `documento_markdown` (caminho, tipo, conteúdo, md5, commit) e `sincronizacao_log`;
  `scripts/sincronizacao/importar_markdown.py` copia do Git para o banco (origem = repositório),
  **fora** os arquivos barrados pelo `.vercelignore` (gabaritos, `RESOLUCAO/`, listas de alunos);
  aba **Documentos** só leitura, com as diferenças de md5.

## Riscos

| Risco | Plano B |
|---|---|
| Banco e rotina real diferentes (a página não altera a rotina) | Coluna `aplicado_em` + aviso "⚠️ pendente de aplicar"; uma sessão do Claude aplica e grava `trigger_id`/`aplicado_em` |
| Sessão local ou outra IA sem conector não consegue travar | A regra mantém a trava pelo `RECADOS.md` como alternativa para quem não tem banco |
| Prompt com dado sensível | O prompt é só do administrador (RLS) e a regra proíbe senha, chave e dado de aluno |
| Duas origens para o mesmo dado | Tabela "Quem é a origem" acima; cada fase só troca a origem depois do aceite |

## Resultado

— (preencher ao concluir a fase 1)
