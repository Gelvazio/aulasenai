-- Atividade Dinâmica (#381, etapa 530): nota do professor por aluno e atividade. Idempotente,
-- sem apagar dados. A nota (0 a 10) entra na Média Final (notas_media_final) e no card
-- "Notas e média" (notas_aluno_para_professor). Regra: docs/regras/atividade-dinamica.md

create table if not exists public.nota_dinamica (
  aluno_id     uuid    not null references auth.users (id) on delete cascade,
  atividade_id bigint  not null references public.atividade (id) on delete cascade,
  nota         numeric(4,2) not null check (nota >= 0 and nota <= 10),
  criterios    jsonb   not null default '[]'::jsonb,
  formato      text    check (formato in ('INDIVIDUAL', 'DUPLA', 'GRUPO', 'TURMA')),
  grupo        text    check (grupo is null or char_length(grupo) <= 80),
  comentario   text    check (comentario is null or char_length(comentario) <= 1000),
  lancado_por  uuid    default auth.uid(),
  lancado_em   timestamptz not null default now(),
  primary key (aluno_id, atividade_id)
);

alter table public.nota_dinamica enable row level security;

drop policy if exists nota_dinamica_select on public.nota_dinamica;
create policy nota_dinamica_select on public.nota_dinamica
  for select to authenticated
  using (public.professor_pode_ver_aluno(aluno_id) or aluno_id = auth.uid());

drop policy if exists nota_dinamica_insert on public.nota_dinamica;
create policy nota_dinamica_insert on public.nota_dinamica
  for insert to authenticated
  with check (public.professor_pode_ver_aluno(aluno_id));

drop policy if exists nota_dinamica_update on public.nota_dinamica;
create policy nota_dinamica_update on public.nota_dinamica
  for update to authenticated
  using (public.professor_pode_ver_aluno(aluno_id))
  with check (public.professor_pode_ver_aluno(aluno_id));

revoke all on public.nota_dinamica from public, anon, authenticated;
grant select, insert, update on public.nota_dinamica to authenticated;

create or replace function public.nota_dinamica_auditar()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  new.lancado_por := auth.uid();
  new.lancado_em := now();
  return new;
end;
$$;

drop trigger if exists nota_dinamica_auditar_trg on public.nota_dinamica;
create trigger nota_dinamica_auditar_trg
  before insert or update on public.nota_dinamica
  for each row execute function public.nota_dinamica_auditar();

-- Média Final do aluno: acrescenta as notas das dinâmicas (sem mexer nas demais)
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
           least(10,
             (count(*) filter (where r.letra = g.letra))::numeric
             / nullif(public.questoes_para_nota(en.atividade_id, auth.uid()), 0)
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
                    / nullif(public.questoes_para_nota(en.atividade_id, auth.uid()), 0))
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
  notas_dinamicas as (
    select at.pagina, nd.nota
    from atividades at
    join public.nota_dinamica nd
      on nd.atividade_id = at.id and nd.aluno_id = auth.uid()
  ),
  todas as (
    select * from notas_objetivas
    union all
    select * from notas_discursivas
    union all
    select * from notas_dinamicas
  )
  select t.pagina,
         round(max(t.nota), 2),
         case when max(t.nota) is null then 'AGUARDANDO_CORRECAO' else 'NOTA' end
  from todas t
  where auth.uid() is not null
  group by t.pagina;
$function$;

-- Card "Notas e média" (professor): mesma inclusão, para o aluno escolhido
create or replace function public.notas_aluno_para_professor(p_aluno uuid, p_paginas text[])
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
      on e.atividade_id = at.id and e.aluno_id = p_aluno
  ),
  notas_objetivas as (
    select en.pagina,
           least(10,
             (count(*) filter (where r.letra = g.letra))::numeric
             / nullif(public.questoes_para_nota(en.atividade_id, p_aluno), 0)
             * 10) as nota
    from entregas en
    join public.gabarito g on g.atividade_id = en.atividade_id
    left join public.resposta_atividade r
      on r.atividade_id = g.atividade_id and r.item = g.item
     and r.aluno_id = p_aluno and r.tentativa = en.tentativa
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
                    / nullif(public.questoes_para_nota(en.atividade_id, p_aluno), 0))
           end as nota
    from entregas en
    join public.topico_discursivo t on t.atividade_id = en.atividade_id
    left join public.resposta_discursiva r
      on r.atividade_id = t.atividade_id and r.item = t.item and r.topico = t.topico
     and r.aluno_id = p_aluno and r.tentativa = en.tentativa and trim(r.texto) <> ''
    left join public.correcao_discursiva c
      on c.atividade_id = t.atividade_id and c.item = t.item and c.topico = t.topico
     and c.aluno_id = p_aluno and c.tentativa = en.tentativa
    where not en.objetiva
    group by en.pagina, en.tentativa, en.atividade_id
  ),
  notas_dinamicas as (
    select at.pagina, nd.nota
    from atividades at
    join public.nota_dinamica nd
      on nd.atividade_id = at.id and nd.aluno_id = p_aluno
  ),
  todas as (
    select * from notas_objetivas
    union all
    select * from notas_discursivas
    union all
    select * from notas_dinamicas
  )
  select t.pagina,
         round(max(t.nota), 2),
         case when max(t.nota) is null then 'AGUARDANDO_CORRECAO' else 'NOTA' end
  from todas t
  where public.eh_professor()
    and public.professor_tem_turma(
      (select al.turma_codigo from public.aluno al where al.id = p_aluno))
  group by t.pagina;
$function$;

revoke all on function public.notas_media_final(text[]) from public, anon;
grant execute on function public.notas_media_final(text[]) to authenticated;
revoke all on function public.notas_aluno_para_professor(uuid, text[]) from public, anon;
grant execute on function public.notas_aluno_para_professor(uuid, text[]) to authenticated;
