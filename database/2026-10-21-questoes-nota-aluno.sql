-- "Quantidade Questão Considerar" por aluno (tarefa #319, Etapa 448-5601f0dd): quantas questões
-- contam para a NOTA do aluno. Vazio = usa o mínimo para entregar (minimo_questoes_para_entregar),
-- como antes. O mínimo para entregar não muda.
-- Idempotente; não apaga dados.
--
-- Nota = soma × (total ÷ quantidade), máximo 10 — a mesma conta de antes, com a quantidade no
-- lugar do mínimo quando ela existe.

-- 1) Quantidade por aluno (o professor muda no Progresso da turma)
create table if not exists public.questoes_nota_aluno (
  atividade_id bigint not null references public.atividade(id) on delete cascade,
  aluno_id uuid not null references auth.users(id) on delete cascade,
  quantidade smallint not null check (quantidade >= 1),
  definido_por uuid default auth.uid(),
  definido_em timestamptz not null default now(),
  primary key (atividade_id, aluno_id)
);

comment on table public.questoes_nota_aluno is
  'Quantidade de questões consideradas na nota, por aluno (vazio = mínimo para entregar).';

alter table public.questoes_nota_aluno enable row level security;

drop policy if exists questoes_nota_aluno_select on public.questoes_nota_aluno;
create policy questoes_nota_aluno_select on public.questoes_nota_aluno
  for select to authenticated
  using (aluno_id = (select auth.uid()) or public.professor_pode_ver_aluno(aluno_id));

drop policy if exists questoes_nota_aluno_insert on public.questoes_nota_aluno;
create policy questoes_nota_aluno_insert on public.questoes_nota_aluno
  for insert to authenticated
  with check ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

drop policy if exists questoes_nota_aluno_update on public.questoes_nota_aluno;
create policy questoes_nota_aluno_update on public.questoes_nota_aluno
  for update to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id))
  with check ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

drop policy if exists questoes_nota_aluno_delete on public.questoes_nota_aluno;
create policy questoes_nota_aluno_delete on public.questoes_nota_aluno
  for delete to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

revoke all on public.questoes_nota_aluno from anon;
grant select, insert, update, delete on public.questoes_nota_aluno to authenticated;

-- 2) Quantidade de questões da nota: a do aluno (até o total), senão o mínimo para entregar
create or replace function public.questoes_para_nota(p_atividade bigint, p_aluno uuid)
 returns integer
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select coalesce(
    (select least(public.total_questoes_atividade(p_atividade), q.quantidade::integer)
       from public.questoes_nota_aluno q
      where q.atividade_id = p_atividade and q.aluno_id = p_aluno),
    public.minimo_questoes_para_entregar(p_atividade, p_aluno));
$function$;

revoke all on function public.questoes_para_nota(bigint, uuid) from anon, public;
grant execute on function public.questoes_para_nota(bigint, uuid) to authenticated, service_role;

-- 3) Média Final: a nota passa a dividir pela quantidade da nota
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
