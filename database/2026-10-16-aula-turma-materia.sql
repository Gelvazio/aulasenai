-- ════════════════════════════════════════════════════════════════════════════════════════════
-- aula_turma ligada também à matéria (2026-10-16, tarefa #206.2)
-- Etapa: tasks/etapas/ETAPA-333-e75bddc3-VOLTAR-AULA-TURMA-COM-COMBO-DA-TURMA.md
--
-- Situação conferida no banco em 2026-10-16 15:30: a #193 (remover a aula_turma) NUNCA foi
-- aplicada. A tabela existe, com 38 linhas (2 turmas, 0 bloqueadas), as colunas aula_id,
-- turma_codigo, data_aula (aceita vazio) e bloqueio, o gatilho do bloqueio e as 4 políticas de RLS.
-- Por isso este script NÃO recria a tabela: só acrescenta o que falta ao pedido do usuário
-- ("chave da aula, chave da matéria, chave da turma, data da aula e bloqueio da aula"):
--
-- • aula_turma.materia_id → materia.id (a chave da matéria), preenchida a partir da aula.
-- • Gatilho BEFORE INSERT/UPDATE: materia_id é sempre a matéria da aula (ninguém grava uma matéria
--   que não bate com a aula; o front só precisa mandar aula_id e turma_codigo).
-- • Índice por (turma_codigo, materia_id) para o índice da matéria na turma do combo.
-- Não apaga dados; idempotente. Rodar na #206.3.
-- ════════════════════════════════════════════════════════════════════════════════════════════

alter table public.aula_turma add column if not exists materia_id bigint;

-- Preenche as linhas que já existem com a matéria da aula.
update public.aula_turma at
   set materia_id = a.materia_id
  from public.aulas a
 where a.id = at.aula_id
   and at.materia_id is distinct from a.materia_id;

alter table public.aula_turma alter column materia_id set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
     where conrelid = 'public.aula_turma'::regclass and conname = 'aula_turma_materia_id_fkey'
  ) then
    alter table public.aula_turma
      add constraint aula_turma_materia_id_fkey
      foreign key (materia_id) references public.materia (id) on delete cascade;
  end if;
end
$$;

create index if not exists aula_turma_turma_materia_idx
  on public.aula_turma (turma_codigo, materia_id);

-- A matéria da linha é sempre a da aula (a aula manda).
create or replace function public.aula_turma_materia_da_aula()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  select a.materia_id into new.materia_id from public.aulas a where a.id = new.aula_id;
  return new;
end
$$;

revoke execute on function public.aula_turma_materia_da_aula() from public, anon, authenticated;

drop trigger if exists aula_turma_materia_da_aula_trg on public.aula_turma;
create trigger aula_turma_materia_da_aula_trg
  before insert or update of aula_id, materia_id on public.aula_turma
  for each row
  execute function public.aula_turma_materia_da_aula();

-- Conferência: 38 linhas (ou mais), nenhuma sem matéria, nenhuma com matéria diferente da aula.
select count(*) as linhas,
       count(*) filter (where at.materia_id is null) as sem_materia,
       count(*) filter (where at.materia_id <> a.materia_id) as materia_diferente_da_aula
  from public.aula_turma at
  join public.aulas a on a.id = at.aula_id;
