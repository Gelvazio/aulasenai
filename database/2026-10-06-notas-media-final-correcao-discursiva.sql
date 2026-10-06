-- Correção das avaliações discursivas e notas da média final do aluno.
-- Plano: docs/media-final-notas-do-aluno.md. Idempotente e sem apagar dados.
-- 1) correcao_discursiva: nota de cada tópico (sugestão da IA + nota do professor, que vale).
-- 2) notas_media_final(p_paginas): melhor nota do ALUNO LOGADO em cada página (objetiva ou
--    discursiva corrigida), sem depender do bloqueio da atividade e sem devolver gabarito.

create table if not exists public.correcao_discursiva (
  aluno_id       uuid      not null references auth.users (id) on delete cascade,
  atividade_id   bigint    not null references public.atividade (id) on delete cascade,
  tentativa      smallint  not null,
  item           integer   not null,
  topico         integer   not null,
  nota_ia        numeric(5, 2),
  nota_professor numeric(5, 2),
  comentario     text,
  corrigido_por  uuid,
  corrigido_em   timestamptz,
  primary key (aluno_id, atividade_id, tentativa, item, topico),
  constraint correcao_discursiva_notas_positivas
    check (coalesce(nota_ia, 0) >= 0 and coalesce(nota_professor, 0) >= 0)
);

alter table public.correcao_discursiva enable row level security;
revoke all on public.correcao_discursiva from anon;
revoke truncate on public.correcao_discursiva from authenticated;
grant select, insert, update on public.correcao_discursiva to authenticated;

-- Nota nunca acima dos pontos do tópico; quem confirma a nota do professor fica registrado.
create or replace function public.correcao_discursiva_validar()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pontos numeric;
begin
  select t.pontos into v_pontos from public.topico_discursivo t
    where t.atividade_id = new.atividade_id and t.item = new.item and t.topico = new.topico;
  if v_pontos is null then
    raise exception 'Tópico % do item % não existe nesta atividade.', new.topico, new.item;
  end if;
  if coalesce(new.nota_ia, 0) > v_pontos or coalesce(new.nota_professor, 0) > v_pontos then
    raise exception 'A nota não pode passar de % ponto(s) neste tópico.', v_pontos;
  end if;
  if tg_op = 'INSERT' or new.nota_professor is distinct from old.nota_professor then
    new.corrigido_por := auth.uid();
    new.corrigido_em := now();
  end if;
  return new;
end;
$$;

drop trigger if exists correcao_discursiva_validar_trg on public.correcao_discursiva;
create trigger correcao_discursiva_validar_trg
  before insert or update on public.correcao_discursiva
  for each row execute function public.correcao_discursiva_validar();

-- Professor: lê e grava só alunos das turmas dele (administrador: todos).
-- Aluno: lê só as próprias notas já confirmadas pelo professor.
drop policy if exists correcao_discursiva_select on public.correcao_discursiva;
create policy correcao_discursiva_select on public.correcao_discursiva
  for select to authenticated
  using ((aluno_id = (select auth.uid()) and nota_professor is not null)
         or ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id)));

drop policy if exists correcao_discursiva_insert on public.correcao_discursiva;
create policy correcao_discursiva_insert on public.correcao_discursiva
  for insert to authenticated
  with check ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

drop policy if exists correcao_discursiva_update on public.correcao_discursiva;
create policy correcao_discursiva_update on public.correcao_discursiva
  for update to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id))
  with check ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

-- Melhor nota (0 a 10) do aluno logado em cada página. situacao:
--   'NOTA' (nota calculada) ou 'AGUARDANDO_CORRECAO' (discursiva entregue, ainda sem todas as
--   notas do professor). Páginas sem entrega não aparecem.
create or replace function public.notas_media_final(p_paginas text[])
returns table (pagina text, nota numeric, situacao text)
language sql
stable
security definer
set search_path = public
as $$
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
           case when count(c.nota_professor) = count(*)
                then sum(c.nota_professor) / nullif(sum(t.pontos), 0) * 10 end as nota
    from entregas en
    join public.topico_discursivo t on t.atividade_id = en.atividade_id
    left join public.correcao_discursiva c
      on c.atividade_id = t.atividade_id and c.item = t.item and c.topico = t.topico
     and c.aluno_id = auth.uid() and c.tentativa = en.tentativa
    where not en.objetiva
    group by en.pagina, en.tentativa
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
$$;

revoke all on function public.notas_media_final(text[]) from public, anon;
grant execute on function public.notas_media_final(text[]) to authenticated;
