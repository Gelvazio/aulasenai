-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Bloqueio da aula por turma (2026-10-16, tarefa #186)
-- Etapa: tasks/etapas/ETAPA-313-937e5036-BLOQUEIO-DA-AULA-POR-TURMA.md
--
-- • aula_turma.bloqueio (boolean, padrão false): true = a aula está bloqueada para essa turma.
-- • aula_turma.data_aula passa a aceitar vazio (uma aula pode ser bloqueada sem ter data).
-- • Ao bloquear a aula na turma, o gatilho põe o código da turma em atividade.bloqueio das
--   atividades ativas da aula — a regra e o RLS de database/2026-10-05-bloqueio-atividade-por-turma.sql
--   (atividade_liberada_para_usuario) passam a valer sem mudança. Como no bloqueio global da aula,
--   desbloquear NÃO mexe nas atividades (o professor libera cada uma). Idempotente.
-- ════════════════════════════════════════════════════════════════════════════════════════════

alter table public.aula_turma add column if not exists bloqueio boolean not null default false;
alter table public.aula_turma alter column data_aula drop not null;

create or replace function public.aula_turma_bloqueio_propaga_atividades()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.bloqueio and (tg_op = 'INSERT' or old.bloqueio is distinct from new.bloqueio) then
    update public.atividade
       set bloqueio = bloqueio || to_jsonb(new.turma_codigo)
     where aula_id = new.aula_id and ativo and not (bloqueio ? new.turma_codigo);
  end if;
  return new;
end
$$;

revoke execute on function public.aula_turma_bloqueio_propaga_atividades()
  from public, anon, authenticated;

drop trigger if exists aula_turma_bloqueio_propaga_atividades_trg on public.aula_turma;
create trigger aula_turma_bloqueio_propaga_atividades_trg
  after insert or update of bloqueio on public.aula_turma
  for each row
  execute function public.aula_turma_bloqueio_propaga_atividades();
