-- #389: perguntas em JSON + ativação pelo banco (piloto: atividades 168 e 190, Aula 01 UI/UX).
-- O catálogo guarda TODAS as perguntas (com a resposta certa, protegida por RLS) e a coluna `ativo`.
-- `gabarito` e `topico_discursivo` viram VIEWS só com os itens ativos: todo código e função que já
-- lê essas tabelas continua igual, mas só enxerga o que o professor liberou.
-- Idempotente na medida do possível; backups das linhas: *_backup_20261026_*.

do $$
begin
  if to_regclass('public.gabarito_catalogo') is null then
    alter table public.gabarito rename to gabarito_catalogo;
    alter table public.topico_discursivo rename to topico_discursivo_catalogo;
  end if;
end $$;

alter table public.gabarito_catalogo add column if not exists ativo boolean not null default true;
alter table public.topico_discursivo_catalogo add column if not exists ativo boolean not null default true;
alter table public.topico_discursivo_catalogo add column if not exists pontos_base numeric;

create or replace view public.gabarito with (security_invoker = true) as
  select atividade_id, item, titulo, letra from public.gabarito_catalogo where ativo;
create or replace view public.topico_discursivo with (security_invoker = true) as
  select atividade_id, item, topico, enunciado, pontos, resposta_esperada, criterios
  from public.topico_discursivo_catalogo where ativo;

revoke all on public.gabarito, public.topico_discursivo from anon, public;
grant select, insert, update, delete on public.gabarito, public.topico_discursivo to authenticated;
grant all on public.gabarito, public.topico_discursivo to service_role;

-- Volta as perguntas que a #387 apagou (ficam inativas) e guarda o peso original dos tópicos.
insert into public.gabarito_catalogo (atividade_id, item, titulo, letra, ativo)
select b.atividade_id, b.item, b.titulo, b.letra, false
from public.gabarito_backup_20261026_190 b
where not exists (select 1 from public.gabarito_catalogo g
                  where g.atividade_id = b.atividade_id and g.item = b.item);

insert into public.topico_discursivo_catalogo
  (atividade_id, item, topico, enunciado, pontos, resposta_esperada, criterios, ativo, pontos_base)
select b.atividade_id, b.item, b.topico, b.enunciado, b.pontos, b.resposta_esperada, b.criterios,
       false, b.pontos
from public.topico_discursivo_backup_20261026_168 b
where not exists (select 1 from public.topico_discursivo_catalogo t
                  where t.atividade_id = b.atividade_id and t.item = b.item
                    and t.topico = b.topico);

update public.topico_discursivo_catalogo t set pontos_base = b.pontos
from public.topico_discursivo_backup_20261026_168 b
where t.atividade_id = b.atividade_id and t.item = b.item and t.topico = b.topico
  and t.pontos_base is null;

-- Itens liberados ao aluno (sem a resposta certa).
create or replace function public.itens_ativos(p_atividade_id integer)
returns table (item integer, topico integer, pontos numeric)
language sql stable security definer set search_path = public as $$
  select g.item::integer, 0, null::numeric from public.gabarito_catalogo g
   where g.atividade_id = p_atividade_id and g.ativo and auth.uid() is not null
  union all
  select t.item::integer, t.topico::integer, t.pontos from public.topico_discursivo_catalogo t
   where t.atividade_id = p_atividade_id and t.ativo and auth.uid() is not null
  order by 1, 2;
$$;

-- Professor libera: os `p_quantidade` primeiros itens (e, nas práticas, só os tópicos de
-- `p_topicos`, ou todos se nulo). Os pontos dos tópicos ativos somam 1 por item.
create or replace function public.liberar_itens(
  p_atividade_id integer, p_quantidade integer, p_topicos integer[] default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.eh_professor() then raise exception 'Só o professor libera itens'; end if;
  if p_quantidade is null or p_quantidade < 1 then raise exception 'Quantidade inválida'; end if;

  update public.gabarito_catalogo set ativo = (item <= p_quantidade)
   where atividade_id = p_atividade_id;
  update public.topico_discursivo_catalogo
     set ativo = (item <= p_quantidade and (p_topicos is null or topico = any (p_topicos)))
   where atividade_id = p_atividade_id;
  update public.topico_discursivo_catalogo t
     set pontos = t.pontos_base / s.soma
    from (select item, sum(pontos_base) soma from public.topico_discursivo_catalogo
           where atividade_id = p_atividade_id and ativo group by item) s
   where t.atividade_id = p_atividade_id and t.ativo and t.item = s.item and s.soma > 0;
  update public.atividade set total_itens = p_quantidade, updated_at = now()
   where id = p_atividade_id;
end $$;

revoke all on function public.itens_ativos(integer), public.liberar_itens(integer, integer, integer[])
  from public, anon;
grant execute on function public.itens_ativos(integer) to authenticated;
grant execute on function public.liberar_itens(integer, integer, integer[]) to authenticated;
