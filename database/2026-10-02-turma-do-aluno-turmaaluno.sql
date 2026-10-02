-- Unifica a turma do aluno na turmaaluno (fonte única).
-- Plano: docs/unificar-turma-do-aluno-turmaaluno.md
-- Idempotente e sem apagar dados. Rodar no Supabase → SQL Editor (roda como service_role).
--
-- aluno.turma_codigo e auth.users.app_metadata.turma_codigo passam a ser CÓPIAS automáticas da
-- turma principal (vínculo mais recente na turmaaluno); não gravar nelas à mão.

-- 1) Horário: lê a turmaaluno; uma linha por turma, primeiro as que estão no horário ----------
create or replace function public.horario_da_turma_do_aluno()
returns table (hora_inicio time without time zone, hora_fim time without time zone, dentro boolean)
language sql
stable
security definer
set search_path = public
as $$
  select h.hora_inicio, h.hora_fim, h.dentro
  from (
    select t.hora_inicio, t.hora_fim, ta.criado_em,
           (t.hora_inicio is null
            or (now() at time zone 'America/Sao_Paulo')::time between t.hora_inicio and t.hora_fim)
             as dentro
    from public.turmaaluno ta
    join public.turma t on t.codigo = ta.turma_codigo
    where ta.aluno_id = auth.uid()
  ) h
  order by h.dentro desc, h.criado_em desc;
$$;

-- 2) Dentro do horário de ALGUMA turma do aluno (sem turma continua liberado, como antes) ----
create or replace function public.dentro_do_horario_da_turma()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select bool_or(h.dentro) from public.horario_da_turma_do_aluno() h), true);
$$;

-- 3) Líder da turma: o aluno precisa estar vinculado à turma na turmaaluno -----------------
create or replace function public.definir_lider_turma(p_codigo text, p_aluno uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode definir o líder da turma.';
  end if;
  if p_aluno is not null and not exists (
      select 1 from public.turmaaluno ta
      where ta.aluno_id = p_aluno and ta.turma_codigo = p_codigo) then
    raise exception 'O aluno informado não é desta turma.';
  end if;

  update public.turma set lider_aluno_id = p_aluno where codigo = p_codigo;
  if not found then
    raise exception 'Turma não encontrada.';
  end if;
end;
$$;

-- 4) Cópias automáticas da turma principal --------------------------------------------------
create or replace function public.sincronizar_turma_principal_aluno(p_aluno uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_turma text;
begin
  select ta.turma_codigo into v_turma
  from public.turmaaluno ta
  where ta.aluno_id = p_aluno
  order by ta.criado_em desc, ta.id desc
  limit 1;

  update public.aluno set turma_codigo = v_turma
  where id = p_aluno and turma_codigo is distinct from v_turma;

  update auth.users
     set raw_app_meta_data = case
           when v_turma is null then coalesce(raw_app_meta_data, '{}'::jsonb) - 'turma_codigo'
           else coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('turma_codigo', v_turma)
         end
   where id = p_aluno
     and raw_app_meta_data ->> 'turma_codigo' is distinct from v_turma;
end;
$$;

revoke all on function public.sincronizar_turma_principal_aluno(uuid) from public, anon, authenticated;

create or replace function public.turmaaluno_sincronizar_principal()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op in ('INSERT', 'UPDATE') then
    perform public.sincronizar_turma_principal_aluno(new.aluno_id);
  end if;
  if tg_op in ('UPDATE', 'DELETE') and (tg_op = 'DELETE' or old.aluno_id <> new.aluno_id) then
    perform public.sincronizar_turma_principal_aluno(old.aluno_id);
  end if;
  return null;
end;
$$;

revoke all on function public.turmaaluno_sincronizar_principal() from public, anon, authenticated;

drop trigger if exists turmaaluno_sincronizar_principal_trg on public.turmaaluno;
create trigger turmaaluno_sincronizar_principal_trg
  after insert or update or delete on public.turmaaluno
  for each row execute function public.turmaaluno_sincronizar_principal();

-- 5) Vínculos que faltam: alunos com aluno.turma_codigo e sem linha na turmaaluno -----------
-- (ex.: contas criadas pela página de usuários antes da unificação).
insert into public.turmaaluno (turma_codigo, aluno_id, criado_por)
select a.turma_codigo, a.id, null
from public.aluno a
join auth.users u on u.id = a.id and u.raw_app_meta_data ->> 'perfil' = 'ALUNO'
join public.turma t on t.codigo = a.turma_codigo
where not exists (select 1 from public.turmaaluno ta where ta.aluno_id = a.id)
on conflict (turma_codigo, aluno_id) do nothing;

comment on column public.aluno.turma_codigo is
  'Cópia automática da turma principal (vínculo mais recente na turmaaluno). Não gravar à mão.';
