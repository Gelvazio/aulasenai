-- =============================================================================================
-- Quantidade mínima de questões também nas atividades OBJETIVAS (2026-10-09, pedido do usuário)
-- Plano: docs/progresso-global-atividades.md (decisão D3) · STATUS.md, Etapa 119, item 119.5
-- Regra: docs/regras/atividades.md ("Quantidade mínima de questões para entregar")
--
-- O que muda (as discursivas continuam iguais; o total delas é o mesmo de antes):
--   1. total_questoes_atividade(): total de questões de QUALQUER atividade (discursiva: questões
--      com tópicos; objetiva: atividade.total_itens, senão as linhas do gabarito).
--   2. minimo_questoes_para_entregar(): passa a valer também na objetiva (o do aluno, senão o da
--      atividade, senão todas), limitado ao total.
--   3. atividade_completa(): a objetiva entrega com o MÍNIMO de questões respondidas (antes:
--      todas). Quem não mudou o mínimo continua precisando de todas (o padrão é o total).
--   4. notas_media_final(): nota da objetiva = acertos ÷ mínimo × 10, MÁXIMO 10.
--   5. liberar_nova_tentativa(): a nota usada na regra "nota ≥ 7 tem só 2 tentativas" também
--      fica sobre o mínimo (máximo 10).
-- nota_da_tentativa() não muda: devolve acertos e total; a página faz a conta com o mínimo.
-- Idempotente (create or replace), sem apagar dados. Aplicar SOMENTE com pedido do usuário.
-- =============================================================================================

-- 1. Total de questões de qualquer atividade --------------------------------------------------
create or replace function public.total_questoes_atividade(p_atividade bigint)
returns integer
language sql
stable
security definer
set search_path to 'public'
as $function$
  select case
    when exists (select 1 from public.topico_discursivo t where t.atividade_id = p_atividade)
    then public.total_questoes_discursiva(p_atividade)
    else coalesce(
      (select a.total_itens from public.atividade a where a.id = p_atividade),
      (select count(*)::integer from public.gabarito g where g.atividade_id = p_atividade))
  end;
$function$;

revoke all on function public.total_questoes_atividade(bigint) from public, anon;
grant execute on function public.total_questoes_atividade(bigint) to authenticated;

-- 2. Mínimo para entregar (discursiva e objetiva) ---------------------------------------------
create or replace function public.minimo_questoes_para_entregar(p_atividade bigint, p_aluno uuid)
returns integer
language sql
stable
security definer
set search_path to 'public'
as $function$
  select least(
    public.total_questoes_atividade(p_atividade),
    coalesce(
      (select m.minimo::integer from public.minimo_questoes_aluno m
        where m.atividade_id = p_atividade and m.aluno_id = p_aluno),
      (select a.minimo_questoes_entrega::integer from public.atividade a where a.id = p_atividade),
      public.total_questoes_atividade(p_atividade)));
$function$;

-- 3. Entrega: a objetiva aceita o mínimo de questões respondidas ------------------------------
create or replace function public.atividade_completa(p_atividade bigint, p_tentativa smallint)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select case
    when exists (select 1 from public.topico_discursivo t where t.atividade_id = p_atividade)
    then public.questoes_completas_discursiva(p_atividade, auth.uid(), p_tentativa)
       >= public.minimo_questoes_para_entregar(p_atividade, auth.uid())
    else (select count(*) from public.resposta_atividade r
          where r.aluno_id = auth.uid() and r.atividade_id = p_atividade
            and r.tentativa = p_tentativa)
       >= public.minimo_questoes_para_entregar(p_atividade, auth.uid())
  end;
$function$;

-- 4. Média final: objetiva sobre o mínimo, máximo 10 ------------------------------------------
create or replace function public.notas_media_final(p_paginas text[])
returns table(pagina text, nota numeric, situacao text)
language sql
stable
security definer
set search_path to 'public'
as $function$
  with atividades as (
    select a.id, a.pagina,
           exists (select 1 from public.gabarito g where g.atividade_id = a.id) as objetiva
    from public.atividade a
    where a.pagina = any (p_paginas)
  ),
  entregas as (
    select at.id as atividade_id, at.pagina, at.objetiva, e.tentativa
    from atividades at
    join public.entrega_atividade e
      on e.atividade_id = at.id and e.aluno_id = auth.uid()
  ),
  notas_objetivas as (
    select en.pagina,
           least(10,
             (count(*) filter (where r.letra = g.letra))::numeric
             / nullif(public.minimo_questoes_para_entregar(en.atividade_id, auth.uid()), 0)
             * 10) as nota
    from entregas en
    join public.gabarito g on g.atividade_id = en.atividade_id
    left join public.resposta_atividade r
      on r.atividade_id = g.atividade_id and r.item = g.item
     and r.aluno_id = auth.uid() and r.tentativa = en.tentativa
    where en.objetiva
    group by en.pagina, en.tentativa, en.atividade_id
  ),
  notas_discursivas as (
    select en.pagina,
           case
             when count(r.item) > 0
              and count(c.nota_professor) filter (where r.item is not null) = count(r.item)
             then least(10,
                    sum(c.nota_professor) filter (where r.item is not null)
                    / nullif(sum(t.pontos), 0) * 10
                    * count(distinct t.item)::numeric
                    / nullif(public.minimo_questoes_para_entregar(en.atividade_id, auth.uid()), 0))
           end as nota
    from entregas en
    join public.topico_discursivo t on t.atividade_id = en.atividade_id
    left join public.resposta_discursiva r
      on r.atividade_id = t.atividade_id and r.item = t.item and r.topico = t.topico
     and r.aluno_id = auth.uid() and r.tentativa = en.tentativa and trim(r.texto) <> ''
    left join public.correcao_discursiva c
      on c.atividade_id = t.atividade_id and c.item = t.item and c.topico = t.topico
     and c.aluno_id = auth.uid() and c.tentativa = en.tentativa
    where not en.objetiva
    group by en.pagina, en.tentativa, en.atividade_id
  ),
  todas as (
    select * from notas_objetivas
    union all
    select * from notas_discursivas
  )
  select t.pagina,
         round(max(t.nota), 2),
         case when max(t.nota) is null then 'AGUARDANDO_CORRECAO' else 'NOTA' end
  from todas t
  where auth.uid() is not null
  group by t.pagina;
$function$;

-- 5. Nova tentativa: a nota da regra "≥ 7" também sobre o mínimo, máximo 10 -------------------
create or replace function public.liberar_nova_tentativa(p_aluno uuid, p_atividade bigint)
returns smallint
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_atual      smallint;
  v_nova       smallint;
  v_maximo     smallint;
  v_limite     smallint;
  v_nota_final numeric;
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode liberar uma nova tentativa.';
  end if;
  if not public.professor_pode_ver_aluno(p_aluno) then
    raise exception 'Este aluno não é de uma turma vinculada a você.';
  end if;

  select a.max_tentativas into v_maximo from public.atividade a where a.id = p_atividade;
  if v_maximo is null then
    raise exception 'Atividade não encontrada.';
  end if;

  select coalesce(max(l.tentativa), 1) into v_atual
  from public.liberacao_atividade l
  where l.aluno_id = p_aluno and l.atividade_id = p_atividade;

  if not exists (select 1 from public.entrega_atividade e
                 where e.aluno_id = p_aluno and e.atividade_id = p_atividade
                   and e.tentativa = v_atual) then
    raise exception 'O aluno ainda não entregou a tentativa %.', v_atual;
  end if;

  select max(least(10, t.acertos::numeric / nullif(t.minimo, 0) * 10)) into v_nota_final
  from (
    select e.tentativa,
           (select count(*) from public.gabarito g
             join public.resposta_atividade r
               on r.atividade_id = g.atividade_id and r.item = g.item
              and r.aluno_id = p_aluno and r.tentativa = e.tentativa
              and r.letra = g.letra
            where g.atividade_id = p_atividade) as acertos,
           public.minimo_questoes_para_entregar(p_atividade, p_aluno) as minimo
    from public.entrega_atividade e
    where e.aluno_id = p_aluno and e.atividade_id = p_atividade
  ) t;

  v_limite := case when coalesce(v_nota_final, 0) >= 7
                   then least(2, v_maximo)::smallint else v_maximo end;
  if v_atual >= v_limite then
    raise exception 'O aluno já usou as % tentativas permitidas (nota final %).',
      v_limite, round(coalesce(v_nota_final, 0), 1);
  end if;

  v_nova := v_atual + 1;
  insert into public.liberacao_atividade (aluno_id, atividade_id, tentativa)
  values (p_aluno, p_atividade, v_nova);

  insert into public.resposta_atividade (aluno_id, atividade_id, tentativa, item, letra, herdada)
  select r.aluno_id, r.atividade_id, v_nova, r.item, r.letra, true
  from public.resposta_atividade r
  join public.gabarito g on g.atividade_id = r.atividade_id and g.item = r.item
  where r.aluno_id = p_aluno and r.atividade_id = p_atividade and r.tentativa = v_atual
    and r.letra = g.letra;

  return v_nova;
end;
$function$;
