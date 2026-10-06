# Pendências de aulas — CRUD do Professor Administrador

**Criado em:** 2026-10-06 · **Concluído em:** 2026-10-06 09:50 (aguarda aceite) · **Tempo decorrido:** ~1 h
**Pedido:** criar `MATERIAIS/AGENDA_COLABORADOR/pendencias.html`, a tabela `pendencias`
(id, nome, responsavel, datainicio, status, excluido 0/1) com CRUD e o menu **PENDÊNCIAS** só para
o Professor Administrador ("onde vou cadastrar minhas pendências de aulas").

**Complemento do usuário (2026-10-06):** filtro por **todos os campos**, **opções completas de
CRUD** e tudo anotado no `CLAUDE.md` da raiz.

## Objetivo
Dar ao Professor Administrador uma tela para cadastrar, listar, editar e excluir as pendências de
aulas, gravadas no Supabase com RLS que só ele consegue usar.

## Escopo
- **Entra:** tabela `public.pendencias` + RLS; página `pendencias.html` na pasta
  `AGENDA_COLABORADOR`; JS (dados e tela) e CSS em `assets/`; item **PENDÊNCIAS** no header (só
  administrador); registro no `CLAUDE.md`, `docs/database.md` e `relatorio_verificacao_database.html`.
- **Não entra:** o dashboard do Google Calendar e o `STATUS-AGENDA.md` (regras da pasta); o
  projeto `AUTOMATIZACAO-WHATSAPP`; ligação automática das pendências com a agenda.
- **Critério de pronto:** SQL aplicado e conferido no banco; o menu aparece só para o
  administrador; a página grava, lista, edita e "exclui" (excluido = 1) pela API com o JWT dele;
  outro usuário não lê nem grava nada.

## Tela (CRUD completo + filtros)
- **Criar:** formulário com nome, responsável, data de início (padrão: hoje) e status (padrão:
  PENDENTE).
- **Listar:** tabela com todas as colunas, ordenada por data de início (mais recente primeiro),
  com contagem de resultados.
- **Editar:** botão ✏️ em cada linha carrega o formulário; "Salvar alterações" / "Cancelar edição".
- **Mudar status rápido:** lista de status na própria linha (grava na hora, com aviso).
- **Excluir:** botão 🗑️ com popup de confirmação → `excluido = 1` (a linha sai da lista).
- **Restaurar:** botão ♻️ nas excluídas → `excluido = 0`.
- **Filtros (todos os campos, combinados):** id (exato), nome (contém), responsável (contém),
  data de início (de / até), status (Todos / PENDENTE / EM_ANDAMENTO / CONCLUIDA) e excluído
  (Não excluídas / Excluídas / Todas); botão "Limpar filtros". Filtro feito na própria página
  sobre a lista lida do banco.
- Avisos sempre pelo popup (`assets/js/popup.js`), nunca `alert()`/`confirm()`; nada em
  localStorage.

## Tecnologias
HTML + CSS + JavaScript vanilla, supabase-js v2 (CDN), `js/supabase.js`, `assets/js/popup.js`,
PostgreSQL/RLS (Supabase). Modelo: `turmas.html` + `assets/js/turmas-professor-*.js`.

## Estrutura da tabela (proposta)

| Coluna | Tipo | Regra |
|---|---|---|
| `id` | `bigint generated always as identity` | PK |
| `nome` | `text not null` | 1 a 300 caracteres (descrição da pendência) |
| `responsavel` | `text not null` | 1 a 120 caracteres (texto livre) |
| `datainicio` | `date not null default current_date` | — |
| `status` | `text not null default 'PENDENTE'` | `PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA` (check) |
| `excluido` | `smallint not null default 0` | `0` ou `1` (check); excluir = marcar 1, sem apagar a linha |

- RLS ligado; `anon` sem acesso; `select`/`insert`/`update` só com
  `eh_professor_administrador()`; **sem política de `delete`** (exclusão é lógica);
  `truncate` revogado. SQL idempotente: `database/2026-10-06-pendencias.sql`.

## Arquivos previstos
| Arquivo | Ação |
|---|---|
| `database/2026-10-06-pendencias.sql` | criar |
| `MATERIAIS/AGENDA_COLABORADOR/pendencias.html` | criar (só estrutura; sem `<style>`/`<script>` embutido) |
| `assets/js/pendencias-repositorio.js` | criar (dados: listar, criar, alterar, marcar excluído) |
| `assets/js/pendencias-pagina.js` | criar (tela: formulário, tabela, filtros por status e "mostrar excluídas") |
| `assets/css/pendencias.css` | criar (reaproveita `criar-usuarios-comando.css` e `turmas-professor.css`) |
| `js/header-usuario.js` | alterar: item `PENDÊNCIAS` em `MENU_ADMINISTRADOR_HEADER` |
| `CLAUDE.md` (+ versão e histórico) | alterar: regra da tela de pendências |
| `docs/database.md` + `docs/relatorio_verificacao_database.html` | alterar: nova tabela |
| `STATUS.md` | etapa 25 |

## Riscos e dependências
| Risco | Plano B |
|---|---|
| Esconder o menu é só visual | A segurança fica no RLS (`eh_professor_administrador()`), não no menu |
| Nome `datainicio`/`excluido` foge do padrão snake_case do banco | Mantido como pedido pelo usuário |
| Página fora da raiz (em `MATERIAIS/AGENDA_COLABORADOR/`) | Caminhos relativos `../../assets` e `../../js` |
| O gerador de índices cria `index.html` em `AGENDA_COLABORADOR` | Não rodar o gerador nessa pasta; a pasta é ignorada como curso |

## Passos
| # | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Escrever o SQL idempotente da tabela + RLS | `database/2026-10-06-pendencias.sql` | Leitura do SQL | ✅ Concluído |
| 2 | Aplicar no Supabase e conferir (colunas, RLS, políticas) | banco | Consultas de leitura | ✅ Concluído |
| 3 | Repositório de dados | `assets/js/pendencias-repositorio.js` | `node --check` | ✅ Concluído |
| 4 | Página e tela (CRUD completo, filtros por todos os campos, popups) | `pendencias.html`, `assets/js/pendencias-pagina.js`, `assets/css/pendencias.css` | `node --check` | ✅ Concluído |
| 5 | Item PENDÊNCIAS no header (só administrador) | `js/header-usuario.js` | `node --check` | ✅ Concluído |
| 6 | Documentar no `CLAUDE.md` da raiz (regra completa: tabela, RLS, tela, CRUD, filtros, menu; versão + histórico; conferir o visualizador de regras) + `database.md` + relatório HTML | docs | Leitura | ✅ Concluído |
| 7 | Commit local | — | `git commit` | ✅ Concluído |
| 8 | Aceite do usuário (testar no navegador) | — | — | ⬜ Pendente |

## Resultado final
- Tabela `pendencias` criada e conferida no banco (6 colunas, RLS ligado, 3 políticas só do
  administrador, sem delete, `anon` sem acesso).
- Página, repositório, tela e CSS criados (`node --check` OK; navegador não aberto, regra do usuário).
- Menu PENDÊNCIAS no header do administrador; regra no `CLAUDE.md` (versão 2026-10-06 09:49);
  `database.md` e relatório HTML atualizados (a descrição antiga da tabela não existia no banco).
- Pendência: aceite do usuário testando no navegador.
