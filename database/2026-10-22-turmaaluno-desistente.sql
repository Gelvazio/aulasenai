-- ============================================================================
-- #342.2 — Aluno desistente (por turma) some das listas
-- Etapa: tasks/etapas/ETAPA-471-7c1a4d93-ALUNO-DESISTENTE.md
--
-- Fonte única: turmaaluno.desistente (o vínculo aluno × turma de alunos.html).
-- Cópia automática: aluno.desistente = o aluno não tem nenhum vínculo ativo (as telas
-- antigas leem a tabela aluno). Gravação: definir_desistente(), só professor da turma.
-- Funções que listam alunos da turma passam a ignorar o vínculo desistente.
-- Idempotente; não apaga nada.
-- ============================================================================

-- 1. Colunas -----------------------------------------------------------------
alter table public.turmaaluno add column if not exists desistente boolean not null default false;
alter table public.turmaaluno add column if not exists desistente_em timestamptz;
alter table public.turmaaluno add column if not exists desistente_por uuid
  references auth.users(id) on delete set null;
alter table public.aluno add column if not exists desistente boolean not null default false;

comment on column public.turmaaluno.desistente is
  'Aluno desistiu desta turma (#342): some das listas; histórico fica no banco.';
comment on column public.aluno.desistente is
  'Cópia automática: aluno sem nenhum vínculo ativo na turmaaluno (#342).';

-- 2. Carimbo de quem e quando marcou -----------------------------------------
create or replace function public.turmaaluno_carimbar_desistente()
returns trigger
language plpgsql
set search_path to 'public'
as $function$
begin
  if new.desistente is distinct from old.desistente then
    new.desistente_em := case when new.desistente then now() end;
    new.desistente_por := case when new.desistente then auth.uid() end;
  end if;
  return new;
end;
$function$;

drop trigger if exists turmaaluno_carimbar_desistente_trg on public.turmaaluno;
create trigger turmaaluno_carimbar_desistente_trg
  before update of desistente on public.turmaaluno
  for each row execute function public.turmaaluno_carimbar_desistente();

-- 3. Turma principal entre os vínculos ativos + cópia em aluno.desistente -----
create or replace function public.sincronizar_turma_principal_aluno(p_aluno uuid)
returns void
language plpgsql
security definer
set search_path to 'public', 'auth'
as $function$
declare
  v_turma text;
  v_desistente boolean;
begin
  -- Vínculo ativo primeiro; sem ativo, o mais recente (o aluno fica marcado desistente).
  select ta.turma_codigo, ta.desistente into v_turma, v_desistente
  from public.turmaaluno ta
  where ta.aluno_id = p_aluno
  order by ta.desistente, ta.criado_em desc, ta.id desc
  limit 1;

  v_desistente := coalesce(v_desistente, false);

  update public.aluno set turma_codigo = v_turma, desistente = v_desistente
  where id = p_aluno
    and (turma_codigo is distinct from v_turma or desistente is distinct from v_desistente);

  update auth.users
     set raw_app_meta_data = case
           when v_turma is null then coalesce(raw_app_meta_data, '{}'::jsonb) - 'turma_codigo'
           else coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('turma_codigo', v_turma)
         end
   where id = p_aluno
     and raw_app_meta_data ->> 'turma_codigo' is distinct from v_turma;
end;
$function$;

-- 4. Gravação pela tela -------------------------------------------------------
create or replace function public.definir_desistente(p_vinculo bigint, p_desistente boolean)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_turma text;
begin
  if p_desistente is null then
    raise exception 'Informe se o aluno é desistente.' using errcode = '22023';
  end if;
  if not public.eh_professor() then
    raise exception 'Somente o professor marca aluno desistente.' using errcode = '42501';
  end if;
  select ta.turma_codigo into v_turma from public.turmaaluno ta where ta.id = p_vinculo;
  if v_turma is null then
    raise exception 'Vínculo não encontrado.' using errcode = '22023';
  end if;
  if not public.professor_tem_turma(v_turma) then
    raise exception 'Esta turma não está vinculada a você.' using errcode = '42501';
  end if;
  update public.turmaaluno set desistente = p_desistente where id = p_vinculo;
end;
$function$;

revoke all on function public.definir_desistente(bigint, boolean) from public, anon;
grant execute on function public.definir_desistente(bigint, boolean) to authenticated;

-- 5. Listas que ignoram o vínculo desistente ----------------------------------
create or replace function public.alunos_da_turma_lider(p_turma_codigo text)
returns table(id uuid, nome text)
language sql
stable security definer
set search_path to 'public'
as $function$
  select u.id, u.nome_completo::text from public.turmaaluno ta
  join public.usuario u on u.id = ta.aluno_id
  where ta.turma_codigo = p_turma_codigo and not ta.desistente
    and public.aluno_lider_da_turma(p_turma_codigo);
$function$;

create or replace function public.aluno_lider_da_turma(p_turma_codigo text)
returns boolean
language sql
stable security definer
set search_path to 'public'
as $function$
  select exists (
    select 1 from public.usuario u
    join public.turmaaluno ta on ta.aluno_id = u.id
    where u.id = auth.uid() and u.lider = 1 and ta.turma_codigo = p_turma_codigo
      and not ta.desistente);
$function$;

create or replace function public.alunos_sem_entrega_turma(p_atividade bigint, p_turma text)
returns integer
language sql
stable security definer
set search_path to 'public'
as $function$
  select count(*)::integer
  from public.turmaaluno ta
  where ta.turma_codigo = p_turma and not ta.desistente
    and public.eh_professor() and public.professor_tem_turma(p_turma)
    and coalesce((select max(e.tentativa) from public.entrega_atividade e
                   where e.aluno_id = ta.aluno_id and e.atividade_id = p_atividade), 0)
        < coalesce((select max(l.tentativa) from public.liberacao_atividade l
                   where l.aluno_id = ta.aluno_id and l.atividade_id = p_atividade), 1);
$function$;

create or replace function public.atividades_pendentes_turma(p_turma text, p_nota_minima numeric default 7)
returns table(turma_codigo text, aula_id bigint, atividade_id bigint, tem_questao boolean,
              bloqueada boolean, pendentes integer, nao_fizeram integer, nota_baixa integer)
language sql
stable security definer
set search_path to 'public'
as $function$
  with
  permissao as (
    -- Turma sem aluno ativo não tem o que concluir: 0 linhas, para nenhum card ficar verde
    -- (#293.33; desistente não conta, #342).
    select public.eh_professor() and public.professor_tem_turma(p_turma)
           and exists (select 1 from public.turmaaluno ta
                       where ta.turma_codigo = p_turma and not ta.desistente)
             as pode
  ),
  parametros as (
    select case when p_nota_minima > 0 and p_nota_minima <= 10
                then p_nota_minima else 7 end as nota_minima
  ),
  atividades as (
    select a.id, a.aula_id,
           coalesce(a.data_atividade, au.data_planejada) as dia,
           exists (select 1 from public.gabarito g where g.atividade_id = a.id) as objetiva,
           exists (select 1 from public.topico_discursivo t where t.atividade_id = a.id)
             as discursiva,
           (not a.ativo
            or coalesce(a.bloqueio ? p_turma, false)
            or not coalesce(au.ativo, true)
            or coalesce(au.excluido, 0) = 1
            or exists (select 1 from public.aula_turma x
                       where x.aula_id = a.aula_id and x.turma_codigo = p_turma and x.bloqueio))
             as bloqueada
    from public.atividade a
    join public.aulas au on au.id = a.aula_id
    where (select pode from permissao)
  ),
  pares as (
    select at.id, at.objetiva, ta.aluno_id,
           public.tentativa_atual_do_aluno(ta.aluno_id, at.id) as tentativa,
           coalesce((select max(e.tentativa) from public.entrega_atividade e
                     where e.aluno_id = ta.aluno_id and e.atividade_id = at.id), 0) as entregue_ate,
           exists (select 1 from public.falta_aluno f
                   where f.aluno_id = ta.aluno_id and f.data = at.dia) as faltou
    from atividades at
    join public.turmaaluno ta on ta.turma_codigo = p_turma and not ta.desistente
    where not at.bloqueada and (at.objetiva or at.discursiva)
  ),
  entregues as (
    select p.*, public.minimo_questoes_para_entregar(p.id, p.aluno_id) as minimo
    from pares p
    where not p.faltou and p.entregue_ate >= p.tentativa
  ),
  notas_objetivas as (
    select en.id, en.aluno_id,
           least(10, (select count(*) from public.resposta_atividade r
                      join public.gabarito g
                        on g.atividade_id = r.atividade_id and g.item = r.item
                       and g.letra = r.letra
                      where r.aluno_id = en.aluno_id and r.atividade_id = en.id
                        and r.tentativa = en.tentativa)::numeric
                     / nullif(en.minimo, 0) * 10) as nota,
           false as aguardando
    from entregues en
    where en.objetiva
  ),
  notas_discursivas as (
    select en.id, en.aluno_id,
           case when d.respondidos = 0 then 0
                when d.corrigidos = d.respondidos
                then least(10, d.soma_professor / nullif(d.soma_pontos, 0) * 10
                               * d.itens / nullif(en.minimo, 0))
           end as nota,
           (d.respondidos > 0 and d.corrigidos < d.respondidos) as aguardando
    from entregues en
    cross join lateral (
      select count(r.item) as respondidos,
             count(c.nota_professor) filter (where r.item is not null) as corrigidos,
             coalesce(sum(c.nota_professor) filter (where r.item is not null), 0)
               as soma_professor,
             sum(t.pontos) as soma_pontos,
             count(distinct t.item)::numeric as itens
      from public.topico_discursivo t
      left join public.resposta_discursiva r
        on r.atividade_id = t.atividade_id and r.item = t.item and r.topico = t.topico
       and r.aluno_id = en.aluno_id and r.tentativa = en.tentativa and trim(r.texto) <> ''
      left join public.correcao_discursiva c
        on c.atividade_id = t.atividade_id and c.item = t.item and c.topico = t.topico
       and c.aluno_id = en.aluno_id and c.tentativa = en.tentativa
      where t.atividade_id = en.id
    ) d
    where not en.objetiva
  ),
  notas as (
    select * from notas_objetivas
    union all
    select * from notas_discursivas
  ),
  contagens as (
    select p.id,
           count(*) filter (where not p.faltou and p.entregue_ate < p.tentativa)::integer
             as nao_fizeram,
           count(*) filter (where not n.aguardando
                              and round(coalesce(n.nota, 0), 2)
                                  < (select nota_minima from parametros))::integer
             as nota_baixa
    from pares p
    left join notas n on n.id = p.id and n.aluno_id = p.aluno_id
    group by p.id
  )
  select p_turma, at.aula_id, at.id,
         (at.objetiva or at.discursiva),
         at.bloqueada,
         coalesce(c.nao_fizeram + c.nota_baixa, 0),
         coalesce(c.nao_fizeram, 0),
         coalesce(c.nota_baixa, 0)
  from atividades at
  left join contagens c on c.id = at.id
  order by at.aula_id, at.id;
$function$;

create or replace function public.definir_lider_turma(p_codigo text, p_aluno uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode definir o líder da turma.';
  end if;
  if not public.professor_tem_turma(p_codigo) then
    raise exception 'Esta turma não está vinculada a você.';
  end if;
  if p_aluno is not null and not exists (
      select 1 from public.turmaaluno ta
      where ta.aluno_id = p_aluno and ta.turma_codigo = p_codigo and not ta.desistente) then
    raise exception 'O aluno informado não é desta turma (ou é desistente).';
  end if;

  update public.turma set lider_aluno_id = p_aluno where codigo = p_codigo;
  if not found then
    raise exception 'Turma não encontrada.';
  end if;
end;
$function$;

create or replace function public.definir_lider_usuario(p_usuario uuid, p_lider smallint)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_conflito record;
begin
  if p_lider not in (0, 1) then raise exception 'lider deve ser 0 ou 1'; end if;
  if not public.professor_pode_ver_aluno(p_usuario) then
    raise exception 'Sem permissão para este aluno';
  end if;
  if p_lider = 1 then
    if not exists (select 1 from public.turmaaluno ta
                   where ta.aluno_id = p_usuario and not ta.desistente) then
      raise exception 'Aluno desistente não pode ser líder.';
    end if;
    select u.nome_completo, ta_outro.turma_codigo into v_conflito
    from public.turmaaluno ta_aluno
    join public.turmaaluno ta_outro on ta_outro.turma_codigo = ta_aluno.turma_codigo
    join public.usuario u on u.id = ta_outro.aluno_id
    where ta_aluno.aluno_id = p_usuario and ta_outro.aluno_id <> p_usuario and u.lider = 1
    limit 1;
    if found then
      raise exception 'A turma % já tem líder: %. Desligue o líder atual antes (1 líder por turma).',
        v_conflito.turma_codigo, v_conflito.nome_completo;
    end if;
  end if;
  update public.usuario set lider = p_lider where id = p_usuario;
end $function$;

create or replace function public.equipe_membro_preparar()
returns trigger
language plpgsql
security definer
set search_path to 'public', 'auth'
as $function$
begin
  select e.turma_codigo, e.materia_id into new.turma_codigo, new.materia_id
  from public.equipe e where e.id = new.equipe_id;

  if new.turma_codigo is null then
    raise exception 'Equipe % não encontrada', new.equipe_id;
  end if;

  if not exists (
    select 1 from public.turmaaluno ta
    where ta.turma_codigo = new.turma_codigo and ta.aluno_id = new.aluno_id
      and not ta.desistente
  ) then
    raise exception 'O aluno não está vinculado à turma % (ou é desistente)', new.turma_codigo;
  end if;

  return new;
end;
$function$;

create or replace function public.votacoes_abertas_aluno(p_atividade bigint)
returns table(votacao_id bigint, equipe_id bigint, equipe_nome text, ja_votei boolean)
language sql
stable security definer
set search_path to 'public'
as $function$
    SELECT v.id, e.id, e.nome,
           EXISTS (SELECT 1 FROM public.voto_equipe vo
                   WHERE vo.votacao_id = v.id AND vo.aluno_id = auth.uid())
    FROM public.votacao_equipe v
    JOIN public.equipe e ON e.id = v.equipe_id
    WHERE v.atividade_id = p_atividade AND v.aberta
      AND EXISTS (SELECT 1 FROM public.turmaaluno ta
                  WHERE ta.turma_codigo = e.turma_codigo AND ta.aluno_id = auth.uid()
                    AND NOT ta.desistente)
      AND NOT public.aluno_da_equipe(e.id)
    ORDER BY e.nome;
$function$;

create or replace function public.votar_equipe(p_votacao bigint, p_nota integer)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
DECLARE
    v_equipe BIGINT;
    v_turma  TEXT;
BEGIN
    IF p_nota IS NULL OR p_nota < 1 OR p_nota > 10 THEN
        RAISE EXCEPTION 'A nota vai de 1 a 10.' USING ERRCODE = '22023';
    END IF;
    SELECT v.equipe_id, e.turma_codigo INTO v_equipe, v_turma
    FROM public.votacao_equipe v JOIN public.equipe e ON e.id = v.equipe_id
    WHERE v.id = p_votacao AND v.aberta;
    IF v_equipe IS NULL THEN
        RAISE EXCEPTION 'A votação desta equipe está fechada.' USING ERRCODE = '22023';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM public.turmaaluno
                   WHERE turma_codigo = v_turma AND aluno_id = auth.uid()
                     AND NOT desistente) THEN
        RAISE EXCEPTION 'Só alunos da turma votam.' USING ERRCODE = '42501';
    END IF;
    IF public.aluno_da_equipe(v_equipe) THEN
        RAISE EXCEPTION 'Você não vota na própria equipe.' USING ERRCODE = '42501';
    END IF;
    INSERT INTO public.voto_equipe (votacao_id, aluno_id, nota)
    VALUES (p_votacao, auth.uid(), p_nota);
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Você já votou nesta equipe.' USING ERRCODE = '23505';
END;
$function$;
