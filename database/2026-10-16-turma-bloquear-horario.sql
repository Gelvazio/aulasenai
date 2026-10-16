-- #200 (etapa 327-c87b8754): ON/OFF do professor para o bloqueio de horário, por turma.
-- turma.bloquear_horario = true (padrão, como antes): o aluno só grava e entrega dentro do
-- horário da turma. false: o horário não bloqueia nada (vale também para as avaliações).
-- O RLS (pode_responder_no_horario → dentro_do_horario_da_turma → horario_da_turma_do_aluno)
-- e os avisos das páginas seguem sozinhos, porque a turma desligada conta como "dentro".
-- Idempotente.

alter table public.turma
    add column if not exists bloquear_horario boolean not null default true;

comment on column public.turma.bloquear_horario is
    'ON/OFF do professor: true = aluno só grava/entrega no horário da turma; false = sem bloqueio';

create or replace function public.horario_da_turma_do_aluno()
 returns table(hora_inicio time without time zone, hora_fim time without time zone,
               dentro boolean)
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select h.hora_inicio, h.hora_fim, h.dentro
  from (
    select t.hora_inicio, t.hora_fim, ta.criado_em,
           (not t.bloquear_horario
            or t.hora_inicio is null
            or (now() at time zone 'America/Sao_Paulo')::time between t.hora_inicio and t.hora_fim)
             as dentro
    from public.turmaaluno ta
    join public.turma t on t.codigo = ta.turma_codigo
    where ta.aluno_id = auth.uid()
  ) h
  order by h.dentro desc, h.criado_em desc;
$function$;

create or replace function public.definir_bloqueio_horario_turma(p_codigo text, p_ligado boolean)
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode ligar ou desligar o bloqueio de horário.';
  end if;
  if not public.professor_tem_turma(p_codigo) then
    raise exception 'Esta turma não está vinculada a você.';
  end if;
  if p_ligado is null then
    raise exception 'Informe se o bloqueio de horário fica ligado ou desligado.';
  end if;

  update public.turma set bloquear_horario = p_ligado where codigo = p_codigo;
  if not found then
    raise exception 'Turma não encontrada.';
  end if;
end;
$function$;

revoke all on function public.definir_bloqueio_horario_turma(text, boolean) from public, anon;
grant execute on function public.definir_bloqueio_horario_turma(text, boolean) to authenticated;
