-- Liberação de atividade fora do horário da turma, por aluno (2026-10-01).
-- Executar no Supabase → SQL Editor. Idempotente; nada é apagado.
--
-- atividade.atividade_liberada_fora_horario: lista JSON de ids de alunos (auth.users.id), padrão [].
-- Se o id do aluno logado estiver na lista, ele grava alternativas e entrega a atividade mesmo fora
-- do horário da turma (turma.hora_inicio / hora_fim).
-- EXCEÇÃO: avaliações (página cujo nome começa com AVALIACAO-, ex.: AVALIACAO-OBJETIVA-01,
-- AVALIACAO-OBJETIVA-02 e a futura AVALIACAO-PRATICA) seguem SEMPRE o horário da turma.

alter table public.atividade
  add column if not exists atividade_liberada_fora_horario jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'atividade_liberada_fora_horario_ck') then
    alter table public.atividade add constraint atividade_liberada_fora_horario_ck
      check (jsonb_typeof(atividade_liberada_fora_horario) = 'array');
  end if;
end $$;

-- A atividade é uma avaliação? (nome da página começa com AVALIACAO-)
create or replace function public.atividade_eh_avaliacao(p_atividade bigint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((select a.pagina ~* '(^|/)AVALIACAO-[^/]*$'
                   from public.atividade a where a.id = p_atividade), false);
$$;

-- O aluno logado pode gravar/entregar nesta atividade agora? Dentro do horário da turma, ou fora
-- dele se estiver na lista de liberados da atividade (nunca em avaliação).
create or replace function public.pode_responder_no_horario(p_atividade bigint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select public.dentro_do_horario_da_turma()
      or (not public.atividade_eh_avaliacao(p_atividade)
          and exists (select 1 from public.atividade a
                      where a.id = p_atividade
                        and a.atividade_liberada_fora_horario ? (auth.uid())::text));
$$;

-- Professor inclui (p_liberar = true) ou retira (false) um aluno da lista de uma atividade.
create or replace function public.liberar_fora_horario(
  p_atividade bigint, p_aluno uuid, p_liberar boolean)
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode liberar atividade fora do horário.';
  end if;
  if p_liberar and public.atividade_eh_avaliacao(p_atividade) then
    raise exception 'Avaliações seguem sempre o horário da turma: não podem ser liberadas.';
  end if;

  update public.atividade
     set atividade_liberada_fora_horario = case
           when p_liberar then (select coalesce(jsonb_agg(distinct v), '[]'::jsonb)
                                from jsonb_array_elements_text(
                                  atividade_liberada_fora_horario || to_jsonb(p_aluno::text)) v)
           else atividade_liberada_fora_horario - p_aluno::text
         end
   where id = p_atividade;
  if not found then
    raise exception 'Atividade não encontrada.';
  end if;
end;
$$;

revoke all on function public.atividade_eh_avaliacao(bigint) from public, anon;
revoke all on function public.pode_responder_no_horario(bigint) from public, anon;
revoke all on function public.liberar_fora_horario(bigint, uuid, boolean) from public, anon;
grant execute on function public.atividade_eh_avaliacao(bigint) to authenticated;
grant execute on function public.pode_responder_no_horario(bigint) to authenticated;
grant execute on function public.liberar_fora_horario(bigint, uuid, boolean) to authenticated;

-- ── Políticas: trocam dentro_do_horario_da_turma() por pode_responder_no_horario(atividade_id) ──
drop policy if exists resposta_insert on public.resposta_atividade;
create policy resposta_insert on public.resposta_atividade
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and public.pode_responder_no_horario(atividade_id)
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
    and public.pode_responder_no_horario(atividade_id)
  );

drop policy if exists entrega_insert on public.entrega_atividade;
create policy entrega_insert on public.entrega_atividade
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and public.atividade_completa(atividade_id, tentativa)
    and public.pode_responder_no_horario(atividade_id)
  );
