-- Card "Notas e média" do índice de atividades (#374, etapa 523). Idempotente, sem apagar dados.
-- media_finalizada: professor confirma a média do aluno na matéria; o aluno confirmado sai do
-- combo Aluno do card (o interruptor "Listar todos" o traz de volta). PK (aluno_id, materia_id).

create table if not exists public.media_finalizada (
  aluno_id         uuid   not null references auth.users (id) on delete cascade,
  materia_id       bigint not null references public.materia (id) on delete cascade,
  turma_codigo     text   not null,
  media_finalizada boolean not null default false,
  atualizado_por   uuid default auth.uid(),
  atualizado_em    timestamptz not null default now(),
  primary key (aluno_id, materia_id)
);

alter table public.media_finalizada enable row level security;

drop policy if exists media_finalizada_select on public.media_finalizada;
create policy media_finalizada_select on public.media_finalizada
  for select to authenticated
  using (
    (public.eh_professor() and public.professor_tem_turma(turma_codigo))
    or aluno_id = auth.uid()
  );

drop policy if exists media_finalizada_insert on public.media_finalizada;
create policy media_finalizada_insert on public.media_finalizada
  for insert to authenticated
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

drop policy if exists media_finalizada_update on public.media_finalizada;
create policy media_finalizada_update on public.media_finalizada
  for update to authenticated
  using (public.eh_professor() and public.professor_tem_turma(turma_codigo))
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

revoke all on public.media_finalizada from public, anon, authenticated;
grant select, insert, update on public.media_finalizada to authenticated;

create or replace function public.media_finalizada_auditar()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  new.atualizado_por := auth.uid();
  new.atualizado_em := now();
  return new;
end;
$$;

drop trigger if exists media_finalizada_auditar_trg on public.media_finalizada;
create trigger media_finalizada_auditar_trg
  before insert or update on public.media_finalizada
  for each row execute function public.media_finalizada_auditar();
