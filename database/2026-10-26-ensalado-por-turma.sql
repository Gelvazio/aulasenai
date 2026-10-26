-- Ensalado por turma (#386, etapa 534). Idempotente, sem apagar dados.
-- turma_materia_ensalado: a matéria está ENSALADA na turma quando existe a linha (matéria × turma).
-- (turma_materia, #211, continua sendo só o vínculo que limita o combo Turma do índice.)
-- O professor da turma liga/desliga no botão ON/OFF da faixa de matérias, depois de escolher a
-- turma. materia.ensalado (global) fica como legado e deixa de ser lida pela faixa.

create table if not exists public.turma_materia_ensalado (
  materia_id   bigint not null references public.materia (id) on delete cascade,
  turma_codigo text   not null references public.turma (codigo)
                        on update cascade on delete cascade,
  criado_por   uuid default auth.uid(),
  criado_em    timestamptz not null default now(),
  primary key (materia_id, turma_codigo)
);

alter table public.turma_materia_ensalado enable row level security;

drop policy if exists turma_materia_ensalado_select on public.turma_materia_ensalado;
create policy turma_materia_ensalado_select on public.turma_materia_ensalado
  for select to authenticated
  using (
    (public.eh_professor() and public.professor_tem_turma(turma_codigo))
    or turma_codigo = (select al.turma_codigo from public.aluno al where al.id = auth.uid())
  );

drop policy if exists turma_materia_ensalado_insert on public.turma_materia_ensalado;
create policy turma_materia_ensalado_insert on public.turma_materia_ensalado
  for insert to authenticated
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

drop policy if exists turma_materia_ensalado_delete on public.turma_materia_ensalado;
create policy turma_materia_ensalado_delete on public.turma_materia_ensalado
  for delete to authenticated
  using (public.eh_professor() and public.professor_tem_turma(turma_codigo));

revoke all on public.turma_materia_ensalado from public, anon, authenticated;
grant select, insert, delete on public.turma_materia_ensalado to authenticated;

-- Migração: cada matéria hoje ensalada vira ensalada em todas as turmas do curso dela
insert into public.turma_materia_ensalado (materia_id, turma_codigo)
select m.id, t.codigo
from public.materia m
join public.turma t on t.curso_id = m.curso_id
where m.ensalado is true
on conflict do nothing;
