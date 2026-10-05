-- Equipes de sala de aula por TURMA + MATÉRIA (CRUD global, usado em todas as matérias).
-- Plano: docs/equipes-sala-de-aula.md
-- Idempotente e sem apagar dados. Rodar no Supabase → SQL Editor (roda como service_role).
--
-- Gravação: professor só nas turmas vinculadas a ele (professor_tem_turma; o administrador em
-- todas). Leitura: o mesmo professor; o aluno lê só a própria equipe (função minhas_equipes).
-- anon sem acesso. Membro = aluno vinculado à turma na turmaaluno; 1 equipe por aluno em cada
-- turma + matéria; no máximo 1 líder por equipe.

-- 1) Tabelas ---------------------------------------------------------------------------------
create table if not exists public.equipe (
  id bigint generated always as identity primary key,
  turma_codigo text not null references public.turma (codigo) on delete cascade,
  materia_id bigint not null references public.materia (id) on delete cascade,
  nome text not null check (length(trim(nome)) between 1 and 80),
  descricao text check (descricao is null or length(descricao) <= 500),
  criado_em timestamptz not null default now(),
  criado_por uuid default auth.uid() references auth.users (id) on delete set null,
  constraint equipe_turma_materia_nome_uk unique (turma_codigo, materia_id, nome)
);

create index if not exists equipe_turma_materia_idx on public.equipe (turma_codigo, materia_id);

comment on table public.equipe is
  'Equipe de alunos de uma turma em uma matéria. Professor da turma grava; aluno lê a própria.';

create table if not exists public.equipe_membro (
  id bigint generated always as identity primary key,
  equipe_id bigint not null references public.equipe (id) on delete cascade,
  aluno_id uuid not null references auth.users (id) on delete cascade,
  -- Cópias da equipe (preenchidas pelo trigger), para a regra "1 equipe por aluno" e o RLS.
  turma_codigo text not null,
  materia_id bigint not null,
  papel text check (papel is null or length(papel) <= 60),
  tarefas text check (tarefas is null or length(tarefas) <= 500),
  lider boolean not null default false,
  criado_em timestamptz not null default now(),
  constraint equipe_membro_aluno_turma_materia_uk unique (turma_codigo, materia_id, aluno_id)
);

create index if not exists equipe_membro_equipe_idx on public.equipe_membro (equipe_id);
create index if not exists equipe_membro_aluno_idx on public.equipe_membro (aluno_id);
create unique index if not exists equipe_membro_um_lider_uk
  on public.equipe_membro (equipe_id) where lider;

comment on table public.equipe_membro is
  'Aluno × equipe (papel, tarefas e líder). Um aluno fica em uma só equipe por turma + matéria.';

-- 2) Trigger: copia turma/matéria da equipe e exige aluno vinculado à turma -------------------
create or replace function public.equipe_membro_preparar()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  select e.turma_codigo, e.materia_id into new.turma_codigo, new.materia_id
  from public.equipe e where e.id = new.equipe_id;

  if new.turma_codigo is null then
    raise exception 'Equipe % não encontrada', new.equipe_id;
  end if;

  if not exists (
    select 1 from public.turmaaluno ta
    where ta.turma_codigo = new.turma_codigo and ta.aluno_id = new.aluno_id
  ) then
    raise exception 'O aluno não está vinculado à turma %', new.turma_codigo;
  end if;

  return new;
end;
$$;

revoke all on function public.equipe_membro_preparar() from public, anon, authenticated;

drop trigger if exists equipe_membro_preparar_trg on public.equipe_membro;
create trigger equipe_membro_preparar_trg
  before insert or update of equipe_id, aluno_id on public.equipe_membro
  for each row execute function public.equipe_membro_preparar();

-- Trocar a turma/matéria de uma equipe que já tem membros quebraria o vínculo: recusar.
create or replace function public.equipe_bloquear_troca_turma()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if (new.turma_codigo, new.materia_id) is distinct from (old.turma_codigo, old.materia_id)
     and exists (select 1 from public.equipe_membro m where m.equipe_id = old.id) then
    raise exception 'Retire os membros antes de trocar a turma ou a matéria da equipe';
  end if;
  return new;
end;
$$;

drop trigger if exists equipe_bloquear_troca_turma_trg on public.equipe;
create trigger equipe_bloquear_troca_turma_trg
  before update of turma_codigo, materia_id on public.equipe
  for each row execute function public.equipe_bloquear_troca_turma();

-- 3) RLS -------------------------------------------------------------------------------------
alter table public.equipe enable row level security;
alter table public.equipe_membro enable row level security;

revoke all on public.equipe, public.equipe_membro from anon;
grant select, insert, update, delete on public.equipe, public.equipe_membro to authenticated;
-- TRUNCATE ignora o RLS: tirar dos papéis da API.
revoke truncate, references, trigger on public.equipe, public.equipe_membro
  from authenticated, anon;

drop policy if exists equipe_select_professor on public.equipe;
create policy equipe_select_professor on public.equipe
  for select to authenticated
  using (public.professor_tem_turma(turma_codigo));

drop policy if exists equipe_insert_professor on public.equipe;
create policy equipe_insert_professor on public.equipe
  for insert to authenticated
  with check (public.professor_tem_turma(turma_codigo));

drop policy if exists equipe_update_professor on public.equipe;
create policy equipe_update_professor on public.equipe
  for update to authenticated
  using (public.professor_tem_turma(turma_codigo))
  with check (public.professor_tem_turma(turma_codigo));

drop policy if exists equipe_delete_professor on public.equipe;
create policy equipe_delete_professor on public.equipe
  for delete to authenticated
  using (public.professor_tem_turma(turma_codigo));

drop policy if exists equipe_membro_select_professor on public.equipe_membro;
create policy equipe_membro_select_professor on public.equipe_membro
  for select to authenticated
  using (public.professor_tem_turma(turma_codigo));

drop policy if exists equipe_membro_insert_professor on public.equipe_membro;
create policy equipe_membro_insert_professor on public.equipe_membro
  for insert to authenticated
  with check (public.professor_tem_turma(turma_codigo));

drop policy if exists equipe_membro_update_professor on public.equipe_membro;
create policy equipe_membro_update_professor on public.equipe_membro
  for update to authenticated
  using (public.professor_tem_turma(turma_codigo))
  with check (public.professor_tem_turma(turma_codigo));

drop policy if exists equipe_membro_delete_professor on public.equipe_membro;
create policy equipe_membro_delete_professor on public.equipe_membro
  for delete to authenticated
  using (public.professor_tem_turma(turma_codigo));

-- 4) Aluno: lê só a(s) própria(s) equipe(s) da matéria, com os nomes dos colegas --------------
-- (a tabela usuario só deixa o aluno ler a própria linha; por isso a função security definer).
create or replace function public.minhas_equipes(p_materia_id bigint)
returns table (
  equipe_id bigint,
  equipe_nome text,
  equipe_descricao text,
  turma_codigo text,
  aluno_nome text,
  papel text,
  tarefas text,
  lider boolean,
  eu boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select e.id, e.nome, e.descricao, e.turma_codigo,
         coalesce(u.nome_completo, 'Aluno'), m.papel, m.tarefas, m.lider,
         m.aluno_id = auth.uid()
  from public.equipe e
  join public.equipe_membro m on m.equipe_id = e.id
  left join public.usuario u on u.id = m.aluno_id
  where e.materia_id = p_materia_id
    and exists (
      select 1 from public.equipe_membro eu
      where eu.equipe_id = e.id and eu.aluno_id = auth.uid()
    )
  order by e.nome, m.lider desc, u.nome_completo;
$$;

revoke all on function public.minhas_equipes(bigint) from public, anon;
grant execute on function public.minhas_equipes(bigint) to authenticated;
