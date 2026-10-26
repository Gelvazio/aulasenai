-- Card "Notas e média" do índice de atividades (#383, etapa 532). Idempotente, sem apagar dados.
-- card_notas_visivel: por matéria e turma, se o card aparece para os ALUNOS da turma. O professor
-- liga/desliga no botão ON/OFF ao lado do título do card. Sem linha = escondido (padrão OFF).

create table if not exists public.card_notas_visivel (
  materia_id     bigint not null references public.materia (id) on delete cascade,
  turma_codigo   text   not null,
  visivel        boolean not null default false,
  atualizado_por uuid default auth.uid(),
  atualizado_em  timestamptz not null default now(),
  primary key (materia_id, turma_codigo)
);

alter table public.card_notas_visivel enable row level security;

drop policy if exists card_notas_visivel_select on public.card_notas_visivel;
create policy card_notas_visivel_select on public.card_notas_visivel
  for select to authenticated
  using (
    (public.eh_professor() and public.professor_tem_turma(turma_codigo))
    or turma_codigo = (select al.turma_codigo from public.aluno al where al.id = auth.uid())
  );

drop policy if exists card_notas_visivel_insert on public.card_notas_visivel;
create policy card_notas_visivel_insert on public.card_notas_visivel
  for insert to authenticated
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

drop policy if exists card_notas_visivel_update on public.card_notas_visivel;
create policy card_notas_visivel_update on public.card_notas_visivel
  for update to authenticated
  using (public.eh_professor() and public.professor_tem_turma(turma_codigo))
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

revoke all on public.card_notas_visivel from public, anon, authenticated;
grant select, insert, update on public.card_notas_visivel to authenticated;

create or replace function public.card_notas_visivel_auditar()
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

drop trigger if exists card_notas_visivel_auditar_trg on public.card_notas_visivel;
create trigger card_notas_visivel_auditar_trg
  before insert or update on public.card_notas_visivel
  for each row execute function public.card_notas_visivel_auditar();
