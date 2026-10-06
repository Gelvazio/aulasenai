-- Pendências de aulas do Professor Administrador (tela MATERIAIS/AGENDA_COLABORADOR/pendencias.html).
-- Plano: docs/pendencias-aulas-professor-administrador.md. Idempotente e sem apagar dados.
-- Só o Professor Administrador (eh_professor_administrador()) lê e grava; excluir = excluido = 1.

create table if not exists public.pendencias (
  id bigint generated always as identity primary key,
  nome text not null check (char_length(btrim(nome)) between 1 and 300),
  responsavel text not null check (char_length(btrim(responsavel)) between 1 and 120),
  datainicio date not null default current_date,
  status text not null default 'PENDENTE'
    check (status in ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA')),
  excluido smallint not null default 0 check (excluido in (0, 1))
);

comment on table public.pendencias is
  'Pendências de aulas do Professor Administrador; exclusão lógica (excluido = 1).';

alter table public.pendencias enable row level security;
revoke all on public.pendencias from anon;
revoke truncate, delete on public.pendencias from authenticated;
grant select, insert, update on public.pendencias to authenticated;

drop policy if exists pendencias_select_administrador on public.pendencias;
create policy pendencias_select_administrador on public.pendencias
  for select to authenticated
  using ((select public.eh_professor_administrador()));

drop policy if exists pendencias_insert_administrador on public.pendencias;
create policy pendencias_insert_administrador on public.pendencias
  for insert to authenticated
  with check ((select public.eh_professor_administrador()));

drop policy if exists pendencias_update_administrador on public.pendencias;
create policy pendencias_update_administrador on public.pendencias
  for update to authenticated
  using ((select public.eh_professor_administrador()))
  with check ((select public.eh_professor_administrador()));
