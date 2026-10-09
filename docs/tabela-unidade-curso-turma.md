# Unidade em um só lugar — tabela `unidade` ligada a `curso` e `turma`

**Criado em:** 2026-10-09 13:20 · **Aprovado em:** 2026-10-09 13:23 · **Concluído em:** 2026-10-09 13:29 · **Tempo decorrido:** 9 min
**Status:** 👀 Fase 1 implementada — aguardando o aceite do usuário (passo 6)
**STATUS.md:** Etapa 119

## Objetivo

A unidade (nome e endereço) passa a vir **sempre da tabela `unidade`**, e não mais de textos
soltos em cada tabela (`curso.unidade`, `turma.local`), para não haver nomes diferentes da mesma
unidade.

## Situação encontrada no banco (2026-10-09)

| Onde | Situação |
|---|---|
| Tabela `unidade` | **Já existe**: `id`, `descricao`, `cidade`, `bairro`, `endereco`; RLS ligado (leitura pública, gravação só PROFESSOR); 1 linha de teste ("SENAI Rio do Sul 1", "Rua Principal, 100") e nenhuma tabela ligada a ela |
| `curso.unidade` | Texto livre: "SENAI Rio do Sul" (4 cursos), vazio (3) |
| `turma.local` | Texto livre, 6 valores: AI SALETE, AI CEPLAS (2), CEPLAS, ROBERTO MACHADO, APRENDIZAGEM INDUSTRIAL TAIÓ TARDE, SN.RDS-LAB INFORMATICA 01 - SENAI/SC - Rio do Sul |
| Código que lê `turma.local` | 11 arquivos (criar usuários, relatórios, equipes, lista de presença, exportação PDF, `unidade.js`...) |

## Proposta

1. **Reaproveitar a tabela `unidade`** (não criar outra): renomear `descricao` → **`nome`**; manter
   `endereco` (e `cidade`/`bairro`, opcionais).
2. Novas colunas **`curso.unidade_id`** e **`turma.unidade_id`** → `unidade.id` (on delete restrict:
   unidade em uso não pode ser apagada).
3. **Migração dos dados:** criar uma linha em `unidade` para cada local diferente das turmas e para
   "SENAI Rio do Sul"; preencher os `unidade_id`. Antes, backup das três tabelas
   (`*_backup_20261009`, RLS ligado, sem políticas). Os textos antigos ficam (sem apagar) até a fase 2.
4. **Menu CURSO:** o campo "Unidade" vira lista de seleção (da tabela `unidade`); botão
   **🏢 Unidades** na página com CRUD das unidades (nome e endereço) em modal.
5. **Fase 2 (depois, uma tela por vez, com pedido do usuário):** trocar os 11 arquivos que leem
   `turma.local` para ler a unidade pela ligação; só então apagar `curso.unidade` e `turma.local`.

## Decisões do usuário

| Data | Decisão |
|---|---|
| 2026-10-09 13:22 | "AI CEPLAS" e "CEPLAS" são a **mesma unidade** (uma linha só em `unidade`) |
| 2026-10-09 13:23 | "SN.RDS-LAB INFORMATICA 01 - SENAI/SC - Rio do Sul" = "SENAI Rio do Sul"; demais locais = uma unidade cada; a linha de teste vira "SENAI Rio do Sul"; plano aprovado |

## Arquivos previstos (fase 1)

| Arquivo | Ação |
|---|---|
| `database/2026-10-09-unidade-curso-turma.sql` | Backup, renomear coluna, colunas novas, FKs, migração dos dados |
| `assets/js/cursos-repositorio.js`, `cursos-modais.js`, `cursos-pagina.js`, `cursos.html`, `assets/css/cursos.css` | Lista de unidades no curso; modal 🏢 Unidades (CRUD) |
| `assets/js/unidades-modal.js` (novo) | CRUD das unidades no modal |
| `docs/database.md` + relatório HTML; `CLAUDE.md` + histórico | Documentação e regra "unidade só na tabela `unidade`" |

## Passos

| Nº | Ação | Verificação | Status |
|---|---|---|---|
| 1 | SQL idempotente (backup + estrutura + migração) | Leitura | ✅ |
| 2 | Aplicar pelo conector do Supabase | Consultas: toda turma/curso com `unidade_id`; backups com as linhas | ✅ |
| 3 | Tela de cursos com unidade da tabela + modal 🏢 Unidades | `node --check` | ✅ |
| 4 | Documentação e regras | Leitura | ✅ |
| 5 | Commit + graphify | `git diff --cached --name-only` | ✅ |
| 6 | Aceite do usuário | Teste no navegador pelo usuário | ⬜ |

## Riscos

| Risco | Plano B |
|---|---|
| Renomear `descricao` quebrar código | Só `js/unidade.js` (órfão, nenhuma página carrega) usa; ajustar junto |
| Telas antigas pararem de mostrar o local | Textos antigos ficam até a fase 2 |
| Página de criar usuários criar turma sem `unidade_id` | Fase 2 (ou trigger que preenche pelo `local`) |

## Resultado

- Banco: backups criados (1/7/7 linhas); 5 unidades; todas as 7 turmas e os cursos 1–4 com
  `unidade_id` (cursos 5, 6 e 7 já estavam sem unidade: escolher na tela).
- Tela: unidade do curso em lista (tabela `unidade`); modal 🏢 Unidades com incluir, editar e
  excluir (bloqueia unidade em uso); turmas descritas pela unidade da tabela.
- `js/unidade.js` (órfão) ajustado para a coluna `nome`.
- **Pendências (fase 2):** os 11 arquivos que leem `turma.local`; a página de criar usuários ainda
  cria turma sem `unidade_id`; depois apagar `curso.unidade` e `turma.local`.
