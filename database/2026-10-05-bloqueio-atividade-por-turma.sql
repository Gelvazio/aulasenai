-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Bloqueio de atividade por turma (2026-10-05)
-- Plano: docs/bloqueio-atividade-por-turma-favorita.md
--
-- atividade.bloqueio = lista JSON com os códigos das turmas em que a atividade está bloqueada.
-- Turma fora da lista = liberada (sem vínculo = liberado sempre). O professor bloqueia/libera
-- pela turma favorita no índice das atividades (função definir_bloqueio_turma); as outras turmas
-- não são afetadas. atividade.ativo = false continua bloqueando para todos.
-- Idempotente e sem apagar dados.
-- ════════════════════════════════════════════════════════════════════════════════════════════

-- 1) Coluna -----------------------------------------------------------------------------------
alter table public.atividade
  add column if not exists bloqueio jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'atividade_bloqueio_ck') then
    alter table public.atividade add constraint atividade_bloqueio_ck
      check (jsonb_typeof(bloqueio) = 'array');
  end if;
end $$;

comment on column public.atividade.bloqueio is
  'Códigos das turmas em que a atividade está bloqueada (JSON). Fora da lista = liberada. '
  'Gravado só por definir_bloqueio_turma().';

-- 2) Conferência por turma --------------------------------------------------------------------
-- Liberada para: professor, visitante sem login, aluno sem turma, ou aluno com ALGUMA turma
-- (turmaaluno) fora da lista de bloqueio.
create or replace function public.atividade_liberada_para_usuario(p_bloqueio jsonb)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_array_length(p_bloqueio), 0) = 0
      or auth.uid() is null
      or public.eh_professor()
      or not exists (select 1 from public.turmaaluno ta where ta.aluno_id = auth.uid())
      or exists (select 1 from public.turmaaluno ta
                 where ta.aluno_id = auth.uid() and not (p_bloqueio ? ta.turma_codigo));
$$;

revoke all on function public.atividade_liberada_para_usuario(jsonb) from public;
grant execute on function public.atividade_liberada_para_usuario(jsonb) to anon, authenticated;

-- 3) Leitura: o aluno não vê a atividade bloqueada para as turmas dele --------------------------
drop policy if exists atividade_select on public.atividade;
create policy atividade_select on public.atividade
  for select to anon, authenticated
  using ((ativo and public.atividade_liberada_para_usuario(bloqueio)) or public.eh_professor());

-- 4) Gravação de respostas: mesma conferência (definições anteriores + turma) ------------------
create or replace function public.item_valido(p_atividade bigint, p_item smallint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.atividade a
    where a.id = p_atividade and a.ativo and p_item <= a.total_itens
      and public.atividade_liberada_para_usuario(a.bloqueio)
  );
$$;

create or replace function public.topico_valido(p_atividade bigint, p_item smallint,
                                                p_topico smallint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.topico_discursivo t
    join public.atividade a on a.id = t.atividade_id
    where t.atividade_id = p_atividade and t.item = p_item and t.topico = p_topico and a.ativo
      and public.atividade_liberada_para_usuario(a.bloqueio)
  );
$$;

-- 5) Bloquear/liberar para UMA turma (só professor da turma; administrador em todas) ----------
-- Liberar uma atividade com ativo = false: ativo vira true e TODAS as outras turmas entram na
-- lista, para continuarem bloqueadas. Devolve se a atividade ficou bloqueada para a turma.
create or replace function public.definir_bloqueio_turma(p_atividade bigint, p_turma text,
                                                         p_bloquear boolean)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_ativo boolean;
  v_bloqueio jsonb;
begin
  if not public.eh_professor() or not public.professor_tem_turma(p_turma) then
    raise exception 'Sem permissão para bloquear atividades da turma %.', p_turma;
  end if;
  if not exists (select 1 from public.turma where codigo = p_turma) then
    raise exception 'Turma % não encontrada.', p_turma;
  end if;

  select ativo, bloqueio into v_ativo, v_bloqueio
  from public.atividade where id = p_atividade for update;
  if not found then
    raise exception 'Atividade % não encontrada.', p_atividade;
  end if;

  if p_bloquear then
    if v_ativo and not (v_bloqueio ? p_turma) then
      v_bloqueio := v_bloqueio || to_jsonb(p_turma);
    end if;
  elsif not v_ativo then
    select coalesce(jsonb_agg(t.codigo order by t.codigo), '[]'::jsonb) into v_bloqueio
    from public.turma t where t.codigo <> p_turma;
    v_ativo := true;
  else
    v_bloqueio := v_bloqueio - p_turma;
  end if;

  update public.atividade set ativo = v_ativo, bloqueio = v_bloqueio where id = p_atividade;
  return not v_ativo or v_bloqueio ? p_turma;
end;
$$;

revoke all on function public.definir_bloqueio_turma(bigint, text, boolean) from public, anon;
grant execute on function public.definir_bloqueio_turma(bigint, text, boolean) to authenticated;
