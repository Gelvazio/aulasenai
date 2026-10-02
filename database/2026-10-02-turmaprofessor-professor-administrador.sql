-- Tabela turmaprofessor (vínculo professor × turma) e perfil Professor Administrador.
-- Plano: docs/tabela-turmaprofessor-professor-administrador.md
-- Idempotente e sem apagar dados. Rodar no Supabase → SQL Editor (roda como service_role).
--
-- REGRA: o ÚNICO Professor Administrador é gelvazio.camargo@senai.local. Só ele cadastra,
-- altera e remove o acesso de professores às turmas.

-- 1) Professor Administrador ----------------------------------------------------------------
-- Dupla trava: e-mail fixo aqui + app_metadata (perfil PROFESSOR e administrador = true), que só
-- a service_role altera. Lê auth.users (dados atuais, sem depender do token renovado).
create or replace function public.eh_professor_administrador()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1 from auth.users u
    where u.id = auth.uid()
      and lower(u.email) = 'gelvazio.camargo@senai.local'
      and u.raw_app_meta_data ->> 'perfil' = 'PROFESSOR'
      and coalesce((u.raw_app_meta_data ->> 'administrador')::boolean, false)
  );
$$;

revoke all on function public.eh_professor_administrador() from public, anon;
grant execute on function public.eh_professor_administrador() to authenticated;

update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"administrador": true}'::jsonb
 where lower(email) = 'gelvazio.camargo@senai.local';

-- Ninguém mais fica marcado como administrador.
update auth.users
   set raw_app_meta_data = raw_app_meta_data - 'administrador'
 where lower(email) <> 'gelvazio.camargo@senai.local'
   and raw_app_meta_data ? 'administrador';

-- 2) Tabela turmaprofessor ------------------------------------------------------------------
create table if not exists public.turmaprofessor (
  id bigint generated always as identity primary key,
  turma_codigo text not null references public.turma (codigo) on delete cascade,
  professor_id uuid not null references auth.users (id) on delete cascade,
  criado_em timestamptz not null default now(),
  criado_por uuid default auth.uid() references auth.users (id) on delete set null,
  constraint turmaprofessor_turma_professor_uk unique (turma_codigo, professor_id)
);

create index if not exists turmaprofessor_professor_idx on public.turmaprofessor (professor_id);

comment on table public.turmaprofessor is
  'Vínculo professor × turma. Só o Professor Administrador (gelvazio.camargo@senai.local) grava.';

-- Só usuário com perfil PROFESSOR pode ser vinculado.
create or replace function public.turmaprofessor_exige_professor()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not exists (
    select 1 from auth.users u
    where u.id = new.professor_id and u.raw_app_meta_data ->> 'perfil' = 'PROFESSOR'
  ) then
    raise exception 'Usuário % não tem perfil PROFESSOR', new.professor_id;
  end if;
  return new;
end;
$$;

revoke all on function public.turmaprofessor_exige_professor() from public, anon, authenticated;

drop trigger if exists turmaprofessor_exige_professor_trg on public.turmaprofessor;
create trigger turmaprofessor_exige_professor_trg
  before insert or update of professor_id on public.turmaprofessor
  for each row execute function public.turmaprofessor_exige_professor();

-- 3) RLS -------------------------------------------------------------------------------------
alter table public.turmaprofessor enable row level security;

revoke all on public.turmaprofessor from anon;
grant select, insert, update, delete on public.turmaprofessor to authenticated;
-- TRUNCATE ignora o RLS: tirar dos papéis da API (vinha dos privilégios padrão do Supabase).
revoke truncate, references, trigger on public.turmaprofessor from authenticated, anon;

drop policy if exists turmaprofessor_select on public.turmaprofessor;
create policy turmaprofessor_select on public.turmaprofessor
  for select to authenticated
  using (public.eh_professor_administrador() or professor_id = auth.uid());

drop policy if exists turmaprofessor_insert_admin on public.turmaprofessor;
create policy turmaprofessor_insert_admin on public.turmaprofessor
  for insert to authenticated
  with check (public.eh_professor_administrador());

drop policy if exists turmaprofessor_update_admin on public.turmaprofessor;
create policy turmaprofessor_update_admin on public.turmaprofessor
  for update to authenticated
  using (public.eh_professor_administrador())
  with check (public.eh_professor_administrador());

drop policy if exists turmaprofessor_delete_admin on public.turmaprofessor;
create policy turmaprofessor_delete_admin on public.turmaprofessor
  for delete to authenticated
  using (public.eh_professor_administrador());

-- 4) Apoio para políticas futuras: o professor logado tem acesso à turma? ------------------
create or replace function public.professor_tem_turma(p_turma_codigo text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.eh_professor_administrador()
      or exists (
        select 1 from public.turmaprofessor tp
        where tp.turma_codigo = p_turma_codigo and tp.professor_id = auth.uid()
      );
$$;

revoke all on function public.professor_tem_turma(text) from public, anon;
grant execute on function public.professor_tem_turma(text) to authenticated;
