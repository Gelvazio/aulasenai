# Cursos por professor Implementation Plan

> **For agentic workers:** Execute this plan task by task only after the user approves it. Do not create or run tests; the project instructions explicitly prohibit tests.

**Goal:** Create the `cursoprofessor` relation, an administrator screen to maintain it, and show each logged professor only the courses assigned to them.

**Architecture:** Store one row per course/professor pair in `public.cursoprofessor`. Enforce profile integrity and administrator-only writes with a database trigger and RLS; use `eh_professor_administrador()` for the administrator path. Add an administrator CRUD page and filter the root course index through the authenticated relation rows.

**Tech Stack:** Static HTML, CSS, JavaScript, Supabase JS v2, PostgreSQL/Supabase Auth and RLS.

**Spec:** `docs/cursoprofessor-design.md`

## Global Constraints

- Never execute or create tests, including automated, unit, integration, end-to-end, visual, browser, or server-based checks.
- Do not use Git worktrees.
- Make one local commit for this implementation; do not push.
- Do not alter the remote database without verifying its real schema first and following the project database rule.
- Keep SQL idempotent and non-destructive; never grant `service_role` to browser code.
- Only `eh_professor_administrador()` decides administrator privileges; do not trust email or `user_metadata` in the browser.
- A professor with no course links sees an empty list; do not fall back to all courses.
- Visitors and students keep the existing complete course catalog, per the approved specification assumption.
- Do not state the remote table exists until its SQL migration has actually been applied.

## Review Focus

- Professor with one or more links: only linked course cards appear.
- Professor with zero links or an RLS/query error: no full-catalog fallback is shown.
- Administrator RPC returns true: every course remains visible and `CURSOS` is available.
- Administrator RPC returns false or errors: no administrator screen or write controls are granted.
- Duplicate pairs, deleted courses, deleted Auth users, and a selected non-professor account are rejected or handled by database constraints/triggers.

---

## Files and responsibilities

| File | Responsibility |
|---|---|
| `database/2026-10-02-cursoprofessor.sql` | Relation, constraints, trigger, grants, RLS policies |
| `cursos-professor.html` | Administrator CRUD page markup and script/style loading |
| `assets/js/cursos-professor-repositorio.js` | Supabase access and CRUD methods |
| `assets/js/cursos-professor-pagina.js` | Admin check, form, filter, table, confirmations, errors |
| `assets/js/header-usuario.js` | Admin-only `CURSOS` menu entry |
| `assets/js/indice-cursos.js` | Current user's course filtering on the home page |
| `docs/database.md` | Schema reference and application status |
| `docs/relatorio_verificacao_database.html` | Matching visual database report |
| `CLAUDE.md` | Project navigation and access-rule notes |

## Task 1: Confirm the live database schema before writing migration SQL

**Files:** None; read-only inspection in the Supabase SQL Editor.

- [ ] Run only these read-only queries in the project database, after opening project `hxlvonriearllcmfqeri`:

```sql
select table_name, column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
  and table_name in ('curso', 'usuario')
order by table_name, ordinal_position;

select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public' and tablename in ('curso', 'turmaprofessor');

select pg_get_functiondef('public.eh_professor_administrador()'::regprocedure);
```

Expected: `curso.id` is `bigint`; professor IDs correspond to `auth.users.id` UUIDs; the admin function exists with its documented fixed-account check; current policies match the documentation. If SQL Editor or a read-only connector is unavailable, stop before writing the migration and ask the user for the query output. Do not infer live state from `docs/database.md` alone.

## Task 2: Add the idempotent relation migration

**Files:** Create `database/2026-10-02-cursoprofessor.sql` only after Task 1 succeeds.

**Interface produced:** `public.cursoprofessor(id bigint, curso_id bigint, professor_id uuid, criado_em timestamptz, criado_por uuid)`.

- [ ] Create the table with `curso_id references public.curso(id) on delete cascade`, `professor_id references auth.users(id) on delete cascade`, `criado_em not null default now()`, and `criado_por default auth.uid() references auth.users(id) on delete set null`.
- [ ] Add `unique (curso_id, professor_id)` and indexes on both foreign keys.
- [ ] Add trigger `cursoprofessor_exige_professor` that checks `auth.users.raw_app_meta_data ->> 'perfil' = 'PROFESSOR'` for `professor_id` and raises a clear error otherwise.
- [ ] Enable RLS; revoke access from `anon`; grant `select, insert, update, delete` to `authenticated`; revoke `truncate, references, trigger` from API roles.
- [ ] Add a select policy allowing `eh_professor_administrador()` or `professor_id = auth.uid()`. Add insert/update/delete policies requiring `eh_professor_administrador()`.
- [ ] Use `create table/index if not exists`, `drop trigger/policy if exists`, and a table comment. Add no sample links or data updates.

**Static inspection (not a test):**

```powershell
rg -n "create table if not exists public\.cursoprofessor|unique|enable row level security|eh_professor_administrador|auth\.uid\(\)" database/2026-10-02-cursoprofessor.sql
```

Expected: migration contains all declared constraints and policies and no destructive statement. Do not apply it from the implementation session unless the user explicitly asks to apply SQL and a supported database connector is available.

## Task 3: Implement the `cursoprofessor` repository

**Files:** Create `assets/js/cursos-professor-repositorio.js`.

**Interface produced:** `criarRepositorioCursosProfessor(cliente)` returns `usuarioLogado()`, `ehAdministrador()`, `listarCursos()`, `listarProfessores()`, `listarVinculos()`, `criarVinculo({ curso_id, professor_id })`, `alterarVinculo(id, vinculo)`, and `excluirVinculo(id)`.

- [ ] Follow `assets/js/turmas-professor-repositorio.js`; prefix globals with `CP_` or unique names to avoid collisions.
- [ ] Use `cliente.auth.getSession()` for the current Auth user and `cliente.rpc('eh_professor_administrador')` for authority checks.
- [ ] Read `curso` ordered by `nome_completo`; read `usuario` with `perfil = 'PROFESSOR'`; read, insert, update and delete rows in `cursoprofessor`.
- [ ] Check each Supabase `{ data, error }` result and throw database errors to the page controller. Use the authenticated browser client only.

**Static inspection (not a test):**

```powershell
rg -n "cursoprofessor|eh_professor_administrador|perfil.*PROFESSOR|async (listar|criar|alterar|excluir)" assets/js/cursos-professor-repositorio.js
```

Expected: all repository methods use the relation name and no service key or browser-trusted admin identity appears.

## Task 4: Build the administrator CRUD page

**Files:** Create `cursos-professor.html` and `assets/js/cursos-professor-pagina.js`; reuse `assets/css/criar-usuarios-comando.css`, `assets/css/header-usuario.css`, `assets/css/turmas-professor.css`, and `assets/js/popup.js` where they fit. Add `assets/css/cursos-professor.css` only for page-specific styles not covered by existing files.

**Interface produced by HTML:** elements `cpBloqueio`, `cpConteudo`, `cpFormulario`, `cpCurso`, `cpProfessor`, `cpSalvar`, `cpCancelar`, `cpFiltroCurso`, `cpResumo`, and `cpLinhas`.

- [ ] Load Supabase JS v2, `js/supabase.js`, `js/header-usuario.js`, `assets/js/popup.js`, repository and page controller in that order, following `turmas.html`.
- [ ] Build a form with course and professor selects plus save and cancel-edit controls. Build a table with course, professor, linked date, edit/delete columns and a course filter.
- [ ] Require an Auth session and `eh_professor_administrador() === true`; otherwise show a blocked message and optional login link without exposing the form.
- [ ] Populate selects from the repository. Use `textContent` and DOM nodes for names/emails; do not interpolate database text into `innerHTML`.
- [ ] Insert or update the selected pair; translate PostgreSQL unique violation `23505` to a duplicate-link message; call `confirmarPopup` before deletion; refresh the table after each successful change.
- [ ] Display an empty-state row and summary count; preserve accessible labels and the responsive table wrapper.

**Static inspection (not a test):**

```powershell
rg -n "cpBloqueio|cpConteudo|cpFormulario|cpCurso|cpProfessor|cpLinhas|confirmarPopup|23505" cursos-professor.html assets/js/cursos-professor-pagina.js
```

Expected: markup selectors match the controller, all writes are guarded by the database RPC, and deletion uses confirmation.

## Task 5: Add the administrator `CURSOS` menu item

**Files:** Modify `js/header-usuario.js`.

- [ ] Add `{ rotulo: 'CURSOS', rota: '../cursos-professor.html' }` to the administrator-only menu constant beside `TURMAS`.
- [ ] Keep `CURSOS` inside `MENU_ADMINISTRADOR_HEADER`; do not add it to the menu shown to every professor.
- [ ] Keep the existing route resolver and RPC visibility guard unchanged.

**Static inspection (not a test):**

```powershell
rg -n "MENU_ADMINISTRADOR_HEADER|CURSOS|cursos-professor\.html|eh_professor_administrador" js/header-usuario.js
```

Expected: `CURSOS` appears in the admin menu array and uses the existing RPC guard.

## Task 6: Filter the root course index by Auth user

**Files:** Modify `assets/js/indice-cursos.js`.

- [ ] Preserve the current all-course query for visitors and profiles other than `PROFESSOR`.
- [ ] For an authenticated professor, call `eh_professor_administrador()` first. If true, query all courses as today.
- [ ] Otherwise query `cursoprofessor.select('curso_id').eq('professor_id', usuario.id)` through the authenticated client. If empty, render zero cards and the empty-state message.
- [ ] If links exist, fetch only course rows whose `id` is in the collected IDs and retain ordering by `nome_completo`.
- [ ] Treat admin-RPC, link-query, or course-query errors as errors; never fall back to the full list for a professor after an error.
- [ ] Preserve route mapping, description rendering, accessible loading state, safe text rendering and existing empty/error messages.

**Static inspection (not a test):**

```powershell
rg -n "getSession|app_metadata|eh_professor_administrador|cursoprofessor|curso_id|Nenhum curso|catch" assets/js/indice-cursos.js
```

Expected: the admin branch requests the unrestricted catalog; the regular-professor branch filters by Auth UUID.

## Task 7: Update schema, report, and project guidance

**Files:** Modify `docs/database.md`, `docs/relatorio_verificacao_database.html`, `CLAUDE.md`, and `docs/cursoprofessor-design.md`.

- [ ] Add columns, foreign keys, unique pair, trigger, grants and RLS to `docs/database.md`; mark remote application pending until applied.
- [ ] Add a matching table summary to `docs/relatorio_verificacao_database.html` because it mirrors the database reference.
- [ ] Add the `CURSOS` admin menu and `cursos-professor.html` to the project map; document professor filtering and zero-link behavior in `CLAUDE.md`.
- [ ] Mark specification and plan approvals complete; record implementation and remote-application states accurately.

**Static inspection (not a test):**

```powershell
rg -n "cursoprofessor|Cursos × Professores|cursos-professor.html|CURSOS" docs/database.md docs/relatorio_verificacao_database.html CLAUDE.md docs/cursoprofessor-design.md
```

Expected: schema table, report and project guidance agree about names, columns, permissions, route and pending remote application.

## Task 8: Review and commit

**Files:** All implementation files above; do not stage unrelated pre-existing untracked files.

- [ ] Review `git diff` for only intended files. Ensure no test files, browser artifacts, generated files, or secrets were added.
- [ ] Do not run tests, open a browser, or start a server.
- [ ] Stage only feature files and create one local commit, e.g. `feat: vincula cursos a professores`.
- [ ] Do not push; the project CLAUDE.md reserves push for the user.
- [ ] If SQL was not applied through an authorized connector, report that the migration is ready for the Supabase SQL Editor and assignments need to be entered in the new admin page after application.

```powershell
git diff -- database/2026-10-02-cursoprofessor.sql cursos-professor.html assets/js/cursos-professor-repositorio.js assets/js/cursos-professor-pagina.js assets/js/indice-cursos.js js/header-usuario.js docs/database.md docs/relatorio_verificacao_database.html CLAUDE.md
git add -- database/2026-10-02-cursoprofessor.sql cursos-professor.html assets/js/cursos-professor-repositorio.js assets/js/cursos-professor-pagina.js assets/js/indice-cursos.js js/header-usuario.js docs/database.md docs/relatorio_verificacao_database.html CLAUDE.md docs/cursoprofessor-design.md
git commit -m "feat: vincula cursos a professores"
```
