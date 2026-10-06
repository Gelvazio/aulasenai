-- Exclusão lógica de aula (aulas.excluido) — só o Professor Administrador.
-- Plano: docs/excluir-aula-professor-administrador.md. Idempotente e sem apagar dados.
-- excluido = 0 (padrão): aula listada · excluido = 1: aula excluída (card escondido nos índices).

alter table public.aulas
  add column if not exists excluido smallint not null default 0;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'aulas_excluido_valores') then
    alter table public.aulas
      add constraint aulas_excluido_valores check (excluido in (0, 1));
  end if;
end $$;

-- Pela API (papéis authenticated/anon), só o Professor Administrador muda "excluido".
-- A política de update de aulas aceita qualquer professor, por isso a trava fica no trigger.
-- Papéis do servidor (SQL Editor, service_role, funções security definer) passam direto.
create or replace function public.aulas_excluido_so_administrador()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;
  if tg_op = 'INSERT' and new.excluido = 0 then
    return new;
  end if;
  if tg_op = 'UPDATE' and new.excluido is not distinct from old.excluido then
    return new;
  end if;
  if not public.eh_professor_administrador() then
    raise exception 'Somente o Professor Administrador pode excluir aulas.'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists aulas_excluido_so_administrador_trg on public.aulas;
create trigger aulas_excluido_so_administrador_trg
  before insert or update on public.aulas
  for each row execute function public.aulas_excluido_so_administrador();

-- Marca a aula como excluída (excluido = 1). Só o Professor Administrador.
create or replace function public.excluir_aula(p_aula bigint)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.eh_professor_administrador() then
    raise exception 'Somente o Professor Administrador pode excluir aulas.'
      using errcode = '42501';
  end if;
  update public.aulas set excluido = 1, updated_at = now() where id = p_aula;
  return found;
end;
$$;

revoke all on function public.excluir_aula(bigint) from public, anon;
grant execute on function public.excluir_aula(bigint) to authenticated;
