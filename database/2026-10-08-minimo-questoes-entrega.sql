-- Quantidade mínima de questões para entregar a avaliação discursiva + nota proporcional ao mínimo
-- (máximo 10). Plano: docs/quantidade-minima-questoes-discursiva.md (aprovado em 2026-10-08).
-- Idempotente; não apaga dados. Objetivas: sem mudança (o ramo delas em atividade_completa e em
-- notas_media_final fica igual).
--
-- Decisões: D1 questão respondida = todos os tópicos com texto; D2 padrão = total de questões;
-- D3 mínimo por aluno vale para todas as tentativas; D4 só professor altera (alunos das turmas
-- dele), aluno só lê o próprio; D5 mínimo de 1 ao total; D7 nota = soma × (total ÷ mínimo);
-- D8 nota máxima 10.

-- 1) Mínimo padrão da atividade (vazio = todas as questões)
alter table public.atividade
  add column if not exists minimo_questoes_entrega smallint;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'atividade_minimo_questoes_positivo') then
    alter table public.atividade add constraint atividade_minimo_questoes_positivo
      check (minimo_questoes_entrega is null or minimo_questoes_entrega >= 1);
  end if;
end $$;

comment on column public.atividade.minimo_questoes_entrega is
  'Mínimo de questões completas para entregar a discursiva (vazio = total de questões).';

-- 2) Mínimo por aluno (o professor muda no Progresso da turma)
create table if not exists public.minimo_questoes_aluno (
  atividade_id bigint not null references public.atividade(id) on delete cascade,
  aluno_id uuid not null references auth.users(id) on delete cascade,
  minimo smallint not null check (minimo >= 1),
  definido_por uuid default auth.uid(),
  definido_em timestamptz not null default now(),
  primary key (atividade_id, aluno_id)
);

comment on table public.minimo_questoes_aluno is
  'Mínimo de questões para entregar a discursiva, por aluno (vale para todas as tentativas).';

alter table public.minimo_questoes_aluno enable row level security;

drop policy if exists minimo_questoes_aluno_select on public.minimo_questoes_aluno;
create policy minimo_questoes_aluno_select on public.minimo_questoes_aluno
  for select to authenticated
  using (aluno_id = (select auth.uid()) or public.professor_pode_ver_aluno(aluno_id));

drop policy if exists minimo_questoes_aluno_insert on public.minimo_questoes_aluno;
create policy minimo_questoes_aluno_insert on public.minimo_questoes_aluno
  for insert to authenticated
  with check ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

drop policy if exists minimo_questoes_aluno_update on public.minimo_questoes_aluno;
create policy minimo_questoes_aluno_update on public.minimo_questoes_aluno
  for update to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id))
  with check ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

drop policy if exists minimo_questoes_aluno_delete on public.minimo_questoes_aluno;
create policy minimo_questoes_aluno_delete on public.minimo_questoes_aluno
  for delete to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

revoke all on public.minimo_questoes_aluno from anon;
grant select, insert, update, delete on public.minimo_questoes_aluno to authenticated;

-- 3) Total de questões da discursiva
create or replace function public.total_questoes_discursiva(p_atividade bigint)
 returns integer
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select count(distinct t.item)::integer
  from public.topico_discursivo t where t.atividade_id = p_atividade;
$function$;

-- 4) Mínimo efetivo do aluno: o do aluno, senão o da atividade, senão o total (nunca acima do total)
create or replace function public.minimo_questoes_para_entregar(p_atividade bigint, p_aluno uuid)
 returns integer
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select least(
    public.total_questoes_discursiva(p_atividade),
    coalesce(
      (select m.minimo::integer from public.minimo_questoes_aluno m
        where m.atividade_id = p_atividade and m.aluno_id = p_aluno),
      (select a.minimo_questoes_entrega::integer from public.atividade a where a.id = p_atividade),
      public.total_questoes_discursiva(p_atividade)));
$function$;

-- 5) Questões completas (todos os tópicos com texto) de um aluno numa tentativa
create or replace function public.questoes_completas_discursiva(
  p_atividade bigint, p_aluno uuid, p_tentativa smallint)
 returns integer
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select count(*)::integer from (
    select t.item
    from public.topico_discursivo t
    left join public.resposta_discursiva r
      on r.atividade_id = t.atividade_id and r.item = t.item and r.topico = t.topico
     and r.aluno_id = p_aluno and r.tentativa = p_tentativa
    where t.atividade_id = p_atividade
    group by t.item
    having bool_and(r.texto is not null and trim(r.texto) <> '')
  ) completas;
$function$;

-- 6) Entrega: discursiva exige o mínimo de questões completas (objetivas iguais a antes)
create or replace function public.atividade_completa(p_atividade bigint, p_tentativa smallint)
 returns boolean
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select case
    when exists (select 1 from public.topico_discursivo t where t.atividade_id = p_atividade)
    then public.questoes_completas_discursiva(p_atividade, auth.uid(), p_tentativa)
       >= public.minimo_questoes_para_entregar(p_atividade, auth.uid())
    else (select count(*) from public.resposta_atividade r
          where r.aluno_id = auth.uid() and r.atividade_id = p_atividade
            and r.tentativa = p_tentativa)
       = (select a.total_itens from public.atividade a where a.id = p_atividade)
  end;
$function$;

-- 7) Média final: discursiva vale sobre o mínimo do aluno (D7) e no máximo 10 (D8).
--    Só tópicos respondidos entram; todos eles precisam da nota do professor.
--    Com mínimo = total e prova toda respondida, o valor é o mesmo de antes.
create or replace function public.notas_media_final(p_paginas text[])
 returns table(pagina text, nota numeric, situacao text)
 language sql
 stable security definer
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
           (count(*) filter (where r.letra = g.letra))::numeric / nullif(count(*), 0) * 10 as nota
    from entregas en
    join public.gabarito g on g.atividade_id = en.atividade_id
    left join public.resposta_atividade r
      on r.atividade_id = g.atividade_id and r.item = g.item
     and r.aluno_id = auth.uid() and r.tentativa = en.tentativa
    where en.objetiva
    group by en.pagina, en.tentativa
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

-- Definição anterior de notas_discursivas (até 2026-10-08), para consulta:
--   case when count(c.nota_professor) = count(*)
--        then sum(c.nota_professor) / nullif(sum(t.pontos), 0) * 10 end
--   (todos os tópicos da prova precisavam da nota do professor; sem mínimo).
