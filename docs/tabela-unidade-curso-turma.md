# Unidade em um só lugar — tabela `unidade` ligada a `curso` e `turma`

**Criado em:** 2026-10-09 13:20 · **Aprovado em:** 2026-10-09 13:23 · **Concluído em:** 2026-10-09 13:29 · **Tempo decorrido:** 9 min
**Status:** 👀 Fases 1 e 2 implementadas (fase 2 concluída em 2026-10-09 13:35) — aguardando o aceite do usuário
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

## Fase 2 (pedida em 2026-10-09 13:33 — "faça a 2ª parte também")

| Nº | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 7 | `assets/js/unidade.js`: unidade da turma só pela ligação (`unidade:unidade_id(nome)`), sem a tabela fixa `UNIDADES_POR_TURMA` | `assets/js/unidade.js` | `node --check` | ✅ |
| 8 | Consultas de turma trocam `local` por `unidade:unidade_id(nome)` | avaliacao-media-final-professor, equipes-repositorio, indice-turma-favorita, liberacao-respostas-discursiva, relatorio-atividades-dados/pagina, respostas-atividade-professor, turma-exportacao, turmas-aluno-*, turmas-professor-repositorio, cursos-* | `node --check`; `grep` sem `turma.local` | ✅ |
| 9 | Criar usuários grava `unidade_id` (campo `unidadeId` da turma nas listas locais) e não grava mais `local` | `assets/js/criar-usuarios-api.js`; listas `scripts/LISTA-PRESENCA*.js` (fora do Git) | `node --check` | ✅ |
| 10 | Apagar `turma.local` e `curso.unidade` (backups de 2026-10-09 já guardam os textos) | `database/2026-10-09-unidade-fase2-apagar-textos.sql` | Consulta das colunas | ✅ |
| 11 | Documentação, commit e graphify | `docs/database.md`, relatório, `CLAUDE.md` | Leitura | ✅ |

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
- **Fase 2 (2026-10-09 13:35):** `assets/js/unidade.js` sem a tabela fixa `UNIDADES_POR_TURMA`;
  13 arquivos JS consultam `unidade:unidade_id(nome)`; criar usuários grava `unidade_id` (listas
  locais com `unidadeId`); colunas `turma.local` e `curso.unidade` apagadas.
- Pendência: a página de criar usuários ainda mostra, nas abas, o "local" escrito no arquivo da
  lista de presença (dado do arquivo, não do banco).
