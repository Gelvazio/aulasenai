# Menu Curso — CRUD de cursos com vínculo de turmas (`cursos.html`)

**Criado em:** 2026-10-09 12:47 · **Aprovado em:** 2026-10-09 12:50 · **Concluído em:** 2026-10-09 13:01 · **Tempo decorrido:** 14 min
**Status:** 👀 Implementado — aguardando o aceite do usuário (passo 9)
**STATUS.md:** Etapa 118

## Objetivo

Permitir que o Professor Administrador cadastre, altere e desative cursos e **vincule turmas a um
curso** sem usar programação, para que os alunos da turma vejam o curso ao entrar (a função
`cursos_do_usuario` depende de `turma.curso_id`).

## Escopo

- **Entra:** menu **Curso** no header (só administrador, como TURMAS); página `cursos.html` com
  lista, busca, incluir, editar e desativar/ativar curso; ação **Turmas** por curso, com modal das
  turmas para vincular/desvincular; função no banco para gravar `turma.curso_id`.
- **Não entra:** criar turmas, mexer em `turmaaluno`/`turmaprofessor`, matérias do curso.
- **Critério de pronto:** o administrador vincula a turma 124519 ao curso 4 pela tela e os alunos
  dela passam a ver o curso.

## Situação encontrada no banco (2026-10-09)

| Tabela | Situação |
|---|---|
| `curso` | RLS: leitura pública; insert/update/delete só `eh_professor()` |
| `turma` | RLS: só SELECT (nenhuma política de UPDATE) — não dá para gravar `curso_id` pela API |
| FKs para `curso` | ⚠️ `aulas` e `cursomateria` com **ON DELETE CASCADE**; `materia` sem cascata; `turma` SET NULL |

⚠️ **Apagar um curso apagaria todas as aulas dele.** Por isso a exclusão será **lógica**
(`curso.ativo = 0`, botão "Desativar"/"Ativar"), nunca `DELETE`.

## Arquivos previstos

| Arquivo | Ação |
|---|---|
| `database/2026-10-09-vincular-turma-curso.sql` | Novo: função `definir_curso_turma(p_turma_codigo text, p_curso_id bigint)` SECURITY DEFINER, só `eh_professor_administrador()` (p_curso_id null = desvincular); `revoke` de `anon` |
| `js/header-usuario.js` | Item `{ rotulo: "CURSO", rota: "../cursos.html" }` em `MENU_ADMINISTRADOR_HEADER` |
| `cursos.html` (raiz) | Nova página (guarda de sessão no início do `<head>`, sem `<style>`/`<script>` embutidos) |
| `assets/js/cursos-repositorio.js` | Acesso a dados: listar/incluir/alterar/ativar cursos; listar turmas; RPC `definir_curso_turma` |
| `assets/js/cursos-modais.js` | Modal do curso (incluir/editar) e modal **Turmas** |
| `assets/js/cursos-pagina.js` | Tela: bloqueio para não administrador, tabela, busca, eventos |
| `assets/css/cursos.css` | Estilos da página (tokens `:root`, reaproveitando o visual de `turmas-professor.css`) |
| `docs/database.md` + `docs/relatorio_verificacao_database.html` | Registrar a função nova |
| `CLAUDE.md` + `docs/HISTORICO-REGRAS.md` | Menu Curso na lista dos menus do administrador (nova versão das regras) |

## Passos

| Nº | Ação | Arquivos | Verificação | Status |
|---|---|---|---|---|
| 1 | Escrever o SQL idempotente da função `definir_curso_turma` | `database/2026-10-09-vincular-turma-curso.sql` | Leitura | ✅ |
| 2 | Aplicar o SQL pelo conector do Supabase e conferir | banco | `pg_get_functiondef`; permissões (`anon` sem execute) | ✅ |
| 3 | Repositório de dados | `assets/js/cursos-repositorio.js` | `node --check` | ✅ |
| 4 | Modais (curso e turmas) | `assets/js/cursos-modais.js` | `node --check` | ✅ |
| 5 | Página e CSS | `cursos.html`, `assets/js/cursos-pagina.js`, `assets/css/cursos.css` | `node --check`; leitura | ✅ |
| 6 | Menu Curso no header | `js/header-usuario.js` | `node --check` | ✅ |
| 7 | Documentação do banco e regras | `docs/database.md`, relatório HTML, `CLAUDE.md`, histórico | Leitura | ✅ |
| 8 | Commit + graphify | — | `git diff --cached --name-only` | ✅ |
| 9 | Aceite do usuário (testar no navegador: vincular a 124519 ao curso 4) | — | Usuário | ⬜ |

## Tela (resumo)

- Tabela: **Nome**, **Unidade**, **Descrição**, **Ativo**, **Turmas vinculadas**, ações
  **✏️ Editar**, **🏫 Turmas**, **Desativar/Ativar**; botão **➕ Novo curso** e busca.
- Modal **Turmas**: lista das turmas já vinculadas ao curso (botão Desvincular) e das turmas
  **sem curso** (botão Vincular). Turma ligada a outro curso aparece com o nome dele e pode ser
  movida (confirmação no popup).
- Avisos pelo popup (`assets/js/popup.js`), sem `alert()`.

## Riscos

| Risco | Plano B |
|---|---|
| Exclusão de curso apagar aulas (cascata) | Só exclusão lógica (`ativo = 0`) |
| Outro professor gravar vínculo | Função recusa quem não é `eh_professor_administrador()`; página escondida é só visual |
| Mover turma de curso por engano | Confirmação no popup antes de mover |

## Resultado

- Função `definir_curso_turma` aplicada (migração `vincular_turma_curso`); conferido: `anon` sem
  execute, `authenticated` com execute, `security definer`.
- `cursos.html` + `assets/js/cursos-repositorio.js`, `cursos-modais.js`, `cursos-pagina.js` e
  `assets/css/cursos.css`; menu CURSO em `js/header-usuario.js` (`node --check` sem erro).
- Documentação: `docs/database.md`, relatório HTML, `CLAUDE.md` (versão 2026-10-09 12:59:06) e
  `docs/HISTORICO-REGRAS.md`.
- **Pendência (fora do escopo):** `cursos_do_usuario()` ainda mostra curso desativado aos alunos
  das turmas dele; esconder só se o usuário pedir.
