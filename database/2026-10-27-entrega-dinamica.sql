-- Atividade Dinâmica no PC (#410, etapa 557): entrega do aluno feita na cena three.js.
-- Idempotente, sem apagar dados. Não guarda gabarito: só o que o próprio aluno montou.
-- Regra: docs/regras/atividade-dinamica.md

create table if not exists public.entrega_dinamica (
  aluno_id      uuid    not null references auth.users (id) on delete cascade,
  atividade_id  bigint  not null references public.atividade (id) on delete cascade,
  estado        jsonb   not null default '{}'::jsonb
                check (char_length(estado::text) <= 300000),
  entregue      boolean not null default false,
  entregue_em   timestamptz,
  atualizado_em timestamptz not null default now(),
  primary key (aluno_id, atividade_id)
);

alter table public.entrega_dinamica enable row level security;

drop policy if exists entrega_dinamica_select on public.entrega_dinamica;
create policy entrega_dinamica_select on public.entrega_dinamica
  for select to authenticated
  using (aluno_id = auth.uid() or public.professor_pode_ver_aluno(aluno_id));

drop policy if exists entrega_dinamica_insert on public.entrega_dinamica;
create policy entrega_dinamica_insert on public.entrega_dinamica
  for insert to authenticated
  with check (aluno_id = auth.uid());

-- Depois de entregue, o aluno não altera mais (a linha antiga precisa estar com entregue = false)
drop policy if exists entrega_dinamica_update on public.entrega_dinamica;
create policy entrega_dinamica_update on public.entrega_dinamica
  for update to authenticated
  using (aluno_id = auth.uid() and entregue = false)
  with check (aluno_id = auth.uid());

revoke all on public.entrega_dinamica from public, anon, authenticated;
grant select, insert, update on public.entrega_dinamica to authenticated;

create or replace function public.entrega_dinamica_auditar()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  new.atualizado_em := now();
  if new.entregue and new.entregue_em is null then
    new.entregue_em := now();
  end if;
  return new;
end;
$$;

drop trigger if exists entrega_dinamica_auditar_trg on public.entrega_dinamica;
create trigger entrega_dinamica_auditar_trg
  before insert or update on public.entrega_dinamica
  for each row execute function public.entrega_dinamica_auditar();
