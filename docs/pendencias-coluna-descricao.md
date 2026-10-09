# Pendências — coluna "Descrição"

**Criado em:** 2026-10-09 12:51:22 · **Concluído em:** 2026-10-09 12:54:31 (aguardando aceite) · **Tempo decorrido:** ~3 min
**Pedido do usuário (2026-10-09 12:51:22):** "adicione mais 1 coluna de nome Descricao, que deve
conter a descricao da pendencia".
**Etapa no STATUS:** [tasks/STATUS.md](../tasks/STATUS.md) — Etapa 124.
**Plano original da tela:** [pendencias-aulas-professor-administrador.md](pendencias-aulas-professor-administrador.md).

## Objetivo
Guardar e mostrar a descrição de cada pendência na tela
`MATERIAIS/AGENDA_COLABORADOR/pendencias.html`.

## Escopo
- **Entra:** coluna `descricao` na tabela `pendencias` (banco), campo no formulário (cadastrar e
  editar), coluna "Descrição" na tabela da tela, filtro "Descrição contém", documentação do banco.
- **Não entra:** mudanças nas políticas de RLS (as atuais já cobrem a nova coluna), outros campos.

## Decisões (aprovadas pelo usuário em 2026-10-09 12:54)
| # | Decisão | Proposta |
|---|---------|----------|
| D1 | Tipo | `text`, **opcional** (as pendências já cadastradas ficam com descrição vazia) |
| D2 | Tamanho | até 2000 caracteres (`check`) |
| D3 | Campo na tela | caixa de texto de várias linhas (`textarea`), largura total, logo abaixo do Nome |
| D4 | Posição na tabela | coluna "Descrição" logo depois de "Nome" |
| D5 | Filtro | novo filtro "Descrição contém" (segue a regra de filtros por todos os campos) |
| D6 | Formulário em modal (pedido 2026-10-09 12:53) | o cartão "Nova pendência" sai da página e passa a abrir num **modal**, pelo novo botão **"➕ Nova Pendência"** no topo da lista |
| D7 | Editar | o botão ✏️ Editar da linha abre o **mesmo modal**, já preenchido ("Editar pendência #N"); Cancelar/✖/Esc fecham sem gravar |

## Banco (conferido em 2026-10-09 12:51)
Colunas reais de `public.pendencias`: `id, nome, responsavel, datainicio, status, excluido` — sem
`descricao`. RLS ligado; políticas de select/insert/update só para `eh_professor_administrador()`.

## Arquivos previstos
- `database/2026-10-09-pendencias-descricao.sql` (novo, idempotente, sem apagar dados)
- `assets/js/pendencias-repositorio.js` (`COLUNAS_PENDENCIAS`)
- `assets/js/pendencias-pagina.js` (formulário, filtro, linha da tabela)
- `MATERIAIS/AGENDA_COLABORADOR/pendencias.html` (campo, filtro, cabeçalho da tabela)
- `assets/css/pendencias.css` (modal, textarea e quebra de texto da coluna)
- `assets/js/pendencias-modal.js` (novo: abrir/fechar o modal do formulário)
- `docs/database.md` + `docs/relatorio_verificacao_database.html` (juntos)
- `tasks/STATUS.md`

## Riscos
| Risco | Plano B |
|---|---|
| Linhas antigas sem descrição | Coluna opcional; a tela mostra vazio |
| Texto longo alargar a tabela | CSS com quebra de linha e largura máxima na coluna |

## Passos
| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | SQL `alter table ... add column if not exists descricao text` + check | `database/2026-10-09-pendencias-descricao.sql` | Leitura do arquivo | ✅ Concluído |
| 2 | Aplicar o SQL pelo conector do Supabase | banco `AULAS SENAI` | Consulta em `information_schema.columns` | ✅ Concluído |
| 3 | Repositório lê a coluna | `assets/js/pendencias-repositorio.js` | `node --check` | ✅ Concluído |
| 4 | Tela: campo, filtro, coluna, botão "Nova Pendência" e formulário em modal | `pendencias.html`, `pendencias-pagina.js`, `pendencias.css` | `node --check` + leitura | ✅ Concluído |
| 5 | Documentação do banco | `docs/database.md`, `docs/relatorio_verificacao_database.html` | Leitura | ✅ Concluído |
| 6 | Commit local + graphify | — | `git log -1` | ✅ Concluído |
| 7 | Aceite do usuário (testar a tela no navegador) | — | Resposta do usuário | ⬜ Pendente |

## Resultado
- Banco: `pendencias.descricao` (text, opcional) + check `pendencias_descricao_tamanho` (≤ 2000),
  aplicado e conferido em `information_schema.columns`/`pg_constraint`.
- Tela: botão "➕ Nova Pendência" abre o formulário num modal (novo `assets/js/pendencias-modal.js`);
  ✏️ Editar abre o mesmo modal preenchido; Cancelar/✖/Esc/clique fora fecham sem gravar.
  Coluna "Descrição" depois de "Nome" e filtro "Descrição contém".
- `node --check` OK nos três JS. Falta só o aceite do usuário (passo 7, teste no navegador).
