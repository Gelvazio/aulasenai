-- Card "Notas e média" do índice de atividades (#371, etapa 520). Idempotente, sem apagar dados.
-- 1) media_atividade_config: por turma e atividade, se entra na média e o peso (professor grava).
--    Sem linha = entra na média com peso 1.
-- 2) notas_aluno_para_professor(p_aluno, p_paginas): mesma conta de notas_media_final, para o
--    aluno escolhido; só professor da turma dele; nunca devolve gabarito.

create table if not exists public.media_atividade_config (
  atividade_id   bigint not null references public.atividade (id) on delete cascade,
  turma_codigo   text   not null,
  na_media       boolean not null default true,
  peso           numeric(6,2) not null default 1 check (peso >= 0),
  atualizado_por uuid default auth.uid(),
  atualizado_em  timestamptz not null default now(),
  primary key (atividade_id, turma_codigo)
);

alter table public.media_atividade_config enable row level security;

drop policy if exists media_config_select on public.media_atividade_config;
create policy media_config_select on public.media_atividade_config
  for select to authenticated
  using (
    (public.eh_professor() and public.professor_tem_turma(turma_codigo))
    or turma_codigo = (select al.turma_codigo from public.aluno al where al.id = auth.uid())
  );

drop policy if exists media_config_insert on public.media_atividade_config;
create policy media_config_insert on public.media_atividade_config
  for insert to authenticated
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

drop policy if exists media_config_update on public.media_atividade_config;
create policy media_config_update on public.media_atividade_config
  for update to authenticated
  using (public.eh_professor() and public.professor_tem_turma(turma_codigo))
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

revoke all on public.media_atividade_config from public, anon, authenticated;
grant select, insert, update on public.media_atividade_config to authenticated;

create or replace function public.media_atividade_config_auditar()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  new.atualizado_por := auth.uid();
  new.atualizado_em := now();
  return new;
end;
$$;

drop trigger if exists media_atividade_config_auditar_trg on public.media_atividade_config;
create trigger media_atividade_config_auditar_trg
  before insert or update on public.media_atividade_config
  for each row execute function public.media_atividade_config_auditar();

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
  todas as (
    select * from notas_objetivas
    union all
    select * from notas_discursivas
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

revoke all on function public.notas_aluno_para_professor(uuid, text[]) from public, anon;
grant execute on function public.notas_aluno_para_professor(uuid, text[]) to authenticated;
