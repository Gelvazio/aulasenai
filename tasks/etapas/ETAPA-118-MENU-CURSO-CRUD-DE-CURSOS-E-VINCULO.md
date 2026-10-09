> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 118 — Menu Curso: CRUD de cursos e vínculo de turmas em `cursos.html` (tarefa grande, pedido em 2026-10-09 12:45; aprovada em 2026-10-09 12:50; plano [docs/menu-curso-crud-cursos-turmas.md](docs/menu-curso-crud-cursos-turmas.md))

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 118.0 | Plano criado e aprovado pelo usuário | ✅ Concluído | 2026-10-09 12:50 | Aprovação no chat |
| 118.1 | SQL `database/2026-10-09-vincular-turma-curso.sql` (função `definir_curso_turma`, só o administrador) | ✅ Concluído | 2026-10-09 12:52 | Leitura |
| 118.2 | SQL aplicado pelo conector do Supabase | ✅ Concluído | 2026-10-09 12:53 | `anon` sem execute; `authenticated` com execute; security definer |
| 118.3 | `assets/js/cursos-repositorio.js` | ✅ Concluído | 2026-10-09 12:54 | `node --check` |
| 118.4 | `assets/js/cursos-modais.js` (modal do curso e modal 🏫 Turmas) | ✅ Concluído | 2026-10-09 12:57 | `node --check` |
| 118.5 | `cursos.html`, `assets/js/cursos-pagina.js`, `assets/css/cursos.css` (sem exclusão: desativar = `ativo 0`) | ✅ Concluído | 2026-10-09 12:58 | `node --check`; leitura |
| 118.6 | Menu CURSO em `js/header-usuario.js` (só administrador) | ✅ Concluído | 2026-10-09 12:58 | `node --check` |
| 118.7 | `docs/database.md`, relatório HTML, `CLAUDE.md` (versão 2026-10-09 12:59:06) e histórico | ✅ Concluído | 2026-10-09 13:00 | Leitura |
| 118.8 | Commit | ✅ Concluído | 2026-10-09 13:01 | `git diff --cached --name-only` |
| 118.10 | Ajuste pedido em 2026-10-09 13:15: ações (Editar, Turmas, Desativar/Ativar) na última coluna, à direita; página de consulta mais larga (1400px) e busca mais larga (420px) — `cursos.html`, `assets/js/cursos-pagina.js`, `assets/css/cursos.css` | ✅ Concluído | 2026-10-09 13:17 | `node --check`; leitura (sem navegador) |
| 118.11 | Ajuste pedido em 2026-10-09 13:18: botões de ação lado a lado (nunca um embaixo do outro) — `.cu-grupo-acoes` (inline-flex, sem quebra) em `assets/css/cursos.css` + `assets/js/cursos-pagina.js` | ✅ Concluído | 2026-10-09 13:20 | `node --check`; leitura (sem navegador) |
| 118.9 | Aceite do usuário: testar no navegador (menu CURSO → 🏫 Turmas → vincular a 124519 ao curso 4) | ⬜ Pendente | — | Usuário |
