-- Bloquear a aula (aulas.ativo: true → false) bloqueia todas as atividades dela
-- (atividade.ativo = false, que vale para todas as turmas). Desbloquear a aula NÃO mexe nas
-- atividades: o professor libera cada uma no ON/OFF do índice (decisão do usuário, 2026-10-09).
-- Plano: docs/trigger-bloqueio-aula-bloqueia-atividades.md. Idempotente.

create or replace function public.aulas_bloqueio_propaga_atividades()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Quem dispara já passou pelo RLS da aulas (só professor altera); mexe só nesta aula.
  update public.atividade set ativo = false where aula_id = new.id and ativo;
  return new;
end
$$;

revoke all on function public.aulas_bloqueio_propaga_atividades() from public, anon, authenticated;

drop trigger if exists aulas_bloqueio_propaga_atividades_trg on public.aulas;
create trigger aulas_bloqueio_propaga_atividades_trg
  after update of ativo on public.aulas
  for each row
  when (old.ativo is distinct from new.ativo and new.ativo = false)
  execute function public.aulas_bloqueio_propaga_atividades();
