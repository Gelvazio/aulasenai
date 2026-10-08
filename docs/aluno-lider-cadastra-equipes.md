# Aluno líder (`usuario.lider` = 1 ou 0) cadastra e altera equipes

**Objetivo:** criar a coluna `lider` (1 = líder, 0 = não) na tabela `usuario`; o aluno com `lider = 1`
passa a ver o menu **👥 EQUIPES** e pode cadastrar e alterar as equipes da(s) própria(s) turma(s).

**Tech Stack:** Supabase (PostgreSQL + RLS), JavaScript (header, modal e repositório de equipes), HTML.

**Pedido do usuário:** 2026-10-08 23:52 — "crie mais 1 coluna na tabela de usuarios de nome lider=1
ou 0, se for líder, deve liberar o menu de nome equipe pra ele cadastrar ou alterar equipes, salve
esta regra no claude do projeto".

**Criado em:** 2026-10-08 23:52:37
**Concluído em:** —
**Tempo decorrido:** —

---

## Banco real conferido (2026-10-08 23:52)

- `usuario`: `id`, `nome_completo`, `email`, `login_usuario`, `perfil`, `senha_informada`,
  `senha_informada_em` — **não** tem `lider`. RLS de SELECT: a própria linha ou
  `professor_pode_ver_aluno(id)`; o aluno **não** lê o nome dos colegas.
- `equipe` / `equipe_membro`: todas as políticas (SELECT/INSERT/UPDATE/DELETE) são só
  `professor_tem_turma(turma_codigo)`.
- Já existe outro conceito: `turma.lider_aluno_id` + `definir_lider_turma` (**líder da turma**,
  usado na média final). O novo `usuario.lider` é **separado** e só vale para as equipes.

## Decisões propostas (confirmar na aprovação)

| # | Decisão | Proposta |
|---|---------|----------|
| D1 | Quem marca o líder | O **professor da turma do aluno** (e o administrador), pela coluna nova **Líder (1/0)** na tela **ALUNOS** (`alunos.html`), gravando por uma função segura do banco. |
| D2 | O que o líder pode | Nas turmas em que **ele está** (`turmaaluno`), em qualquer matéria: **cadastrar e alterar equipes** e **adicionar, alterar e remover integrantes**. **Não exclui equipe** (só o professor). |
| D3 | Quem vê o menu 👥 EQUIPES | **Professor** e **aluno líder**. O aluno comum deixa de ver o menu (hoje ele vê a própria equipe por ali). |

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | SQL versionado (coluna, funções, políticas) | ⬜ Pendente | 2026-10-08 23:52 | — | — |
| 2 | Aplicar pelo conector do Supabase e conferir | ⬜ Pendente | 2026-10-08 23:52 | — | — |
| 3 | `docs/database.md` + relatório HTML | ⬜ Pendente | 2026-10-08 23:52 | — | — |
| 4 | Tela ALUNOS: coluna Líder (1/0) | ⬜ Pendente | 2026-10-08 23:52 | — | — |
| 5 | Header: menu 👥 EQUIPES só para professor e aluno líder | ⬜ Pendente | 2026-10-08 23:52 | — | — |
| 6 | Modal/repositório de equipes no modo líder | ⬜ Pendente | 2026-10-08 23:52 | — | — |
| 7 | Regra no `CLAUDE.md` do projeto (versão + histórico) | ⬜ Pendente | 2026-10-08 23:52 | — | — |
| 8 | `STATUS.md` + commit | ⬜ Pendente | 2026-10-08 23:52 | — | — |

---

### Passo 1: SQL versionado

**Status:** ⬜ Pendente

**Arquivo:** Criar `database/2026-10-08-usuario-lider-equipes.sql` (idempotente, sem apagar dados)

```sql
-- 1) Coluna lider (1 = líder, 0 = não) na tabela usuario.
alter table public.usuario add column if not exists lider smallint not null default 0;
alter table public.usuario drop constraint if exists usuario_lider_check;
alter table public.usuario add constraint usuario_lider_check check (lider in (0, 1));

-- 2) O usuário logado é aluno líder e está na turma?
create or replace function public.aluno_lider_da_turma(p_turma_codigo text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.usuario u
    join public.turmaaluno ta on ta.aluno_id = u.id
    where u.id = auth.uid() and u.lider = 1 and ta.turma_codigo = p_turma_codigo);
$$;
revoke all on function public.aluno_lider_da_turma(text) from public, anon;
grant execute on function public.aluno_lider_da_turma(text) to authenticated;

-- 3) Professor da turma (ou administrador) marca/desmarca o líder.
create or replace function public.definir_lider_usuario(p_usuario uuid, p_lider smallint)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_lider not in (0, 1) then raise exception 'lider deve ser 0 ou 1'; end if;
  if not public.professor_pode_ver_aluno(p_usuario) then
    raise exception 'Sem permissão para este aluno';
  end if;
  update public.usuario set lider = p_lider where id = p_usuario;
end $$;
revoke all on function public.definir_lider_usuario(uuid, smallint) from public, anon;
grant execute on function public.definir_lider_usuario(uuid, smallint) to authenticated;

-- 4) Alunos da turma (id e nome) para o líder montar as equipes (só a turma dele).
create or replace function public.alunos_da_turma_lider(p_turma_codigo text)
returns table (id uuid, nome text) language sql stable security definer
set search_path = public as $$
  select u.id, u.nome_completo::text from public.turmaaluno ta
  join public.usuario u on u.id = ta.aluno_id
  where ta.turma_codigo = p_turma_codigo and public.aluno_lider_da_turma(p_turma_codigo);
$$;
revoke all on function public.alunos_da_turma_lider(text) from public, anon;
grant execute on function public.alunos_da_turma_lider(text) to authenticated;

-- 5) Políticas do líder (as do professor continuam iguais). Líder não exclui equipe.
drop policy if exists equipe_select_lider on public.equipe;
create policy equipe_select_lider on public.equipe for select to authenticated
  using (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_insert_lider on public.equipe;
create policy equipe_insert_lider on public.equipe for insert to authenticated
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_update_lider on public.equipe;
create policy equipe_update_lider on public.equipe for update to authenticated
  using (public.aluno_lider_da_turma(turma_codigo))
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_select_lider on public.equipe_membro;
create policy equipe_membro_select_lider on public.equipe_membro for select to authenticated
  using (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_insert_lider on public.equipe_membro;
create policy equipe_membro_insert_lider on public.equipe_membro for insert to authenticated
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_update_lider on public.equipe_membro;
create policy equipe_membro_update_lider on public.equipe_membro for update to authenticated
  using (public.aluno_lider_da_turma(turma_codigo))
  with check (public.aluno_lider_da_turma(turma_codigo));
drop policy if exists equipe_membro_delete_lider on public.equipe_membro;
create policy equipe_membro_delete_lider on public.equipe_membro for delete to authenticated
  using (public.aluno_lider_da_turma(turma_codigo));
```

⚠️ O aluno **não** consegue mudar o próprio `lider`: a tabela `usuario` não tem política de UPDATE
para ele; só a função `definir_lider_usuario` (professor da turma) grava.

**Verificação:** leitura do arquivo; `grep -c "create policy" database/2026-10-08-usuario-lider-equipes.sql` = 7.

---

### Passo 2: Aplicar e conferir

**Status:** ⬜ Pendente

**Ação:** aplicar pelo conector (projeto `hxlvonriearllcmfqeri`); a mudança só **acrescenta** (sem
backup necessário: nenhum dado é apagado ou reorganizado).

**Verificação (consultas de leitura):** coluna `lider` com `default 0` e todos os usuários com 0;
`pg_policies` com as 7 políticas `*_lider`; as 3 funções existem e `anon` não executa.

---

### Passo 3: Documentação do banco

**Status:** ⬜ Pendente

**Arquivos:** `docs/database.md` e `docs/relatorio_verificacao_database.html` (juntos) — coluna
`usuario.lider`, funções e políticas novas.

**Verificação:** `grep -n "lider" docs/database.md docs/relatorio_verificacao_database.html`.

---

### Passo 4: Tela ALUNOS — coluna Líder (1/0)

**Status:** ⬜ Pendente

**Arquivos:** `assets/js/turmas-aluno-repositorio.js` (ler `lider` do `usuario` e gravar pelo RPC
`definir_lider_usuario`), `assets/js/turmas-aluno-pagina.js` (coluna com seleção 1/0 e popup de
confirmação/erro), `assets/css/` da página se precisar.

**Verificação:** `node --check` nos dois JS; leitura do código.

---

### Passo 5: Header — menu 👥 EQUIPES

**Status:** ⬜ Pendente

**Arquivo:** `js/header-usuario.js` — o botão aparece em página de matéria só se o perfil for
PROFESSOR **ou** a linha do próprio usuário em `usuario` tiver `lider = 1`.

**Verificação:** `node --check js/header-usuario.js`; leitura do código.

---

### Passo 6: Modal e repositório no modo líder

**Status:** ⬜ Pendente

**Arquivos:** `assets/js/equipes-repositorio.js` (`ehLider`, turmas do aluno pela `turmaaluno`,
alunos pelo RPC `alunos_da_turma_lider`), `assets/js/equipes-modal.js` (líder entra no mesmo modo
de gestão do professor, sem o 🗑️ de excluir equipe), `assets/js/equipes-tabela.js`.

**Verificação:** `node --check` nos três JS; leitura do código.

---

### Passo 7: Regra no `CLAUDE.md` do projeto

**Status:** ⬜ Pendente

**Arquivos:** `docs/regras/usuarios-turmas-paginas-professor.md` (seção Equipes), `CLAUDE.md`
(versão das regras + resumo do histórico) e `docs/HISTORICO-REGRAS.md`.

**Verificação:** `grep -n "lider" docs/regras/usuarios-turmas-paginas-professor.md`.

---

### Passo 8: `STATUS.md` + commit

**Status:** ⬜ Pendente

**Ação:** etapa nova no `STATUS.md`; `git add` só dos arquivos da tarefa; commit local (sem push).

## Riscos

| Risco | Plano B |
|-------|---------|
| Líder ver dados de outra turma | Toda política/função exige `aluno_lider_da_turma(turma)` (vínculo na `turmaaluno`) |
| Aluno se promover a líder | Sem política de UPDATE em `usuario` para aluno; só a função do professor grava |
| Aluno comum perde a visão da própria equipe pelo menu | Decisão D3 — se não quiser, manter o menu para todos e só o modo de gestão para o líder |
