-- ─────────────────────────────────────────────────────────────────────────────────────
-- Nota da tentativa mostrada ao aluno depois de entregar
-- Pedido do professor em 2026-09-30 (mínimo 7). Plano: docs/regra-3-tentativas-atividade.md
--
-- Idempotente. Executar no Supabase → SQL Editor (depois de 2026-09-30-tentativas-atividade.sql).
-- O gabarito continua SÓ no banco: a função devolve apenas acertos e total da PRÓPRIA tentativa
-- do aluno logado, e só depois que ele entregou essa tentativa (senão devolve total 0).
-- ─────────────────────────────────────────────────────────────────────────────────────
create or replace function public.nota_da_tentativa(p_atividade bigint, p_tentativa smallint)
returns table (acertos integer, total integer)
language sql stable security definer
set search_path = public
as $$
  select
    (count(*) filter (where r.letra = g.letra))::integer,
    count(*)::integer
  from public.gabarito g
  left join public.resposta_atividade r
    on r.atividade_id = g.atividade_id and r.item = g.item
   and r.aluno_id = auth.uid() and r.tentativa = p_tentativa
  where g.atividade_id = p_atividade
    and exists (select 1 from public.entrega_atividade e
                where e.aluno_id = auth.uid() and e.atividade_id = p_atividade
                  and e.tentativa = p_tentativa);
$$;

revoke all on function public.nota_da_tentativa(bigint, smallint) from public;
grant execute on function public.nota_da_tentativa(bigint, smallint) to authenticated;
