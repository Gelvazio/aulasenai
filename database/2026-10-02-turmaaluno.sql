-- Tabela turmaaluno (vínculo aluno × turma), no mesmo modelo da turmaprofessor.
-- Plano: docs/tabela-turmaaluno-menu-alunos.md
-- Idempotente e sem apagar dados. Rodar no Supabase → SQL Editor (roda como service_role).
--
-- Gravação: todo professor (eh_professor()). Leitura: professor vê tudo; aluno vê só os
-- próprios vínculos; anon sem acesso. Só usuário com perfil ALUNO pode ser vinculado.

-- 1) Tabela ----------------------------------------------------------------------------------
create table if not exists public.turmaaluno (
  id bigint generated always as identity primary key,
  turma_codigo text not null references public.turma (codigo) on delete cascade,
  aluno_id uuid not null references auth.users (id) on delete cascade,
  criado_em timestamptz not null default now(),
  criado_por uuid default auth.uid() references auth.users (id) on delete set null,
  constraint turmaaluno_turma_aluno_uk unique (turma_codigo, aluno_id)
);

create index if not exists turmaaluno_aluno_idx on public.turmaaluno (aluno_id);

comment on table public.turmaaluno is
  'Vínculo aluno × turma. Professores gravam; o aluno lê só os próprios vínculos.';

-- 2) Só usuário com perfil ALUNO pode ser vinculado --------------------------------------
create or replace function public.turmaaluno_exige_aluno()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not exists (
    select 1 from auth.users u
    where u.id = new.aluno_id and u.raw_app_meta_data ->> 'perfil' = 'ALUNO'
  ) then
    raise exception 'Usuário % não tem perfil ALUNO', new.aluno_id;
  end if;
  return new;
end;
$$;

revoke all on function public.turmaaluno_exige_aluno() from public, anon, authenticated;

drop trigger if exists turmaaluno_exige_aluno_trg on public.turmaaluno;
create trigger turmaaluno_exige_aluno_trg
  before insert or update of aluno_id on public.turmaaluno
  for each row execute function public.turmaaluno_exige_aluno();

-- 3) RLS -------------------------------------------------------------------------------------
alter table public.turmaaluno enable row level security;

revoke all on public.turmaaluno from anon;
grant select, insert, update, delete on public.turmaaluno to authenticated;
-- TRUNCATE ignora o RLS: tirar dos papéis da API (vem dos privilégios padrão do Supabase).
revoke truncate, references, trigger on public.turmaaluno from authenticated, anon;

drop policy if exists turmaaluno_select on public.turmaaluno;
create policy turmaaluno_select on public.turmaaluno
  for select to authenticated
  using (public.eh_professor() or aluno_id = auth.uid());

drop policy if exists turmaaluno_insert_professor on public.turmaaluno;
create policy turmaaluno_insert_professor on public.turmaaluno
  for insert to authenticated
  with check (public.eh_professor());

drop policy if exists turmaaluno_update_professor on public.turmaaluno;
create policy turmaaluno_update_professor on public.turmaaluno
  for update to authenticated
  using (public.eh_professor())
  with check (public.eh_professor());

drop policy if exists turmaaluno_delete_professor on public.turmaaluno;
create policy turmaaluno_delete_professor on public.turmaaluno
  for delete to authenticated
  using (public.eh_professor());

-- 4) Carga inicial: vínculos que já existem em public.aluno.turma_codigo --------------------
insert into public.turmaaluno (turma_codigo, aluno_id, criado_por)
select a.turma_codigo, a.id, null
from public.aluno a
join auth.users u on u.id = a.id and u.raw_app_meta_data ->> 'perfil' = 'ALUNO'
join public.turma t on t.codigo = a.turma_codigo
on conflict (turma_codigo, aluno_id) do nothing;
