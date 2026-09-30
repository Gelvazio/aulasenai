-- Horário de funcionamento da turma (2026-09-30).
-- Executar no Supabase → SQL Editor. Nada é apagado.
--
-- turma.hora_inicio / turma.hora_fim: intervalo (horário de Brasília) em que o aluno da turma
-- pode GRAVAR alternativas e ENTREGAR a atividade. Vazio nos dois = sem restrição (padrão).
-- Só o professor configura, pela função definir_horario_turma.
-- O RLS de resposta_atividade (insert/update) e de entrega_atividade (insert) passa a exigir
-- dentro_do_horario_da_turma().
alter table public.turma
  add column if not exists hora_inicio time,
  add column if not exists hora_fim time;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'turma_horario_ck') then
    alter table public.turma add constraint turma_horario_ck check (
      (hora_inicio is null and hora_fim is null)
      or (hora_inicio is not null and hora_fim is not null and hora_inicio < hora_fim));
  end if;
end $$;

-- Horário da turma do aluno logado e se agora (Brasília) está dentro dele.
create or replace function public.horario_da_turma_do_aluno()
returns table (hora_inicio time, hora_fim time, dentro boolean)
language sql stable security definer
set search_path = public
as $$
  select t.hora_inicio, t.hora_fim,
         (t.hora_inicio is null
          or (now() at time zone 'America/Sao_Paulo')::time between t.hora_inicio and t.hora_fim)
  from public.aluno a
  join public.turma t on t.codigo = a.turma_codigo
  where a.id = auth.uid();
$$;

create or replace function public.dentro_do_horario_da_turma()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((select h.dentro from public.horario_da_turma_do_aluno() h), true);
$$;

-- Professor define (ou limpa, com nulos) o horário de uma turma.
create or replace function public.definir_horario_turma(
  p_codigo text, p_inicio time, p_fim time)
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode definir o horário da turma.';
  end if;
  if (p_inicio is null) <> (p_fim is null) then
    raise exception 'Informe o horário de início e o de fim (ou deixe os dois vazios).';
  end if;
  if p_inicio is not null and p_inicio >= p_fim then
    raise exception 'O horário de início deve ser menor que o de fim.';
  end if;

  update public.turma set hora_inicio = p_inicio, hora_fim = p_fim where codigo = p_codigo;
  if not found then
    raise exception 'Turma não encontrada.';
  end if;
end;
$$;

revoke all on function public.horario_da_turma_do_aluno() from public, anon;
revoke all on function public.dentro_do_horario_da_turma() from public, anon;
revoke all on function public.definir_horario_turma(text, time, time) from public, anon;
grant execute on function public.horario_da_turma_do_aluno() to authenticated;
grant execute on function public.dentro_do_horario_da_turma() to authenticated;
grant execute on function public.definir_horario_turma(text, time, time) to authenticated;

-- ── Políticas: gravar alternativa e entregar só dentro do horário da turma ───────────────
drop policy if exists resposta_insert on public.resposta_atividade;
create policy resposta_insert on public.resposta_atividade
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and (select public.dentro_do_horario_da_turma())
  );

drop policy if exists resposta_update on public.resposta_atividade;
create policy resposta_update on public.resposta_atividade
  for update to authenticated
  using (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  )
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and (select public.dentro_do_horario_da_turma())
  );

drop policy if exists entrega_insert on public.entrega_atividade;
create policy entrega_insert on public.entrega_atividade
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and public.atividade_completa(atividade_id, tentativa)
    and (select public.dentro_do_horario_da_turma())
  );
