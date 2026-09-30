-- ─────────────────────────────────────────────────────────────────────────────────────
-- Lista do professor na página da atividade: alunos que responderam, com tentativa, nota e
-- data/hora. Pedido do professor em 2026-09-30.
--
-- Idempotente. Executar no Supabase → SQL Editor (depois de 2026-09-30-tentativas-atividade.sql).
-- Só o professor (eh_professor()) consegue chamar; devolve uma linha por aluno e tentativa,
-- com acertos e total calculados aqui (o gabarito não sai do banco).
-- ─────────────────────────────────────────────────────────────────────────────────────
create or replace function public.resumo_tentativas_atividade(p_atividade bigint)
returns table (
  aluno_id        uuid,
  nome            text,
  numero_chamada  integer,
  turma_codigo    text,
  turma_nome      text,
  tentativa       smallint,
  respondidas     integer,
  acertos         integer,
  total           integer,
  entregue_em     timestamptz,
  ultima_gravacao timestamptz
)
language plpgsql stable security definer
set search_path = public
as $$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode ver os resultados dos alunos.';
  end if;

  return query
  with tentativas as (
    select r.aluno_id, r.tentativa,
           count(*)::integer as respondidas,
           (count(*) filter (where r.letra = g.letra))::integer as acertos,
           max(r.atualizado_em) as ultima_gravacao
    from public.resposta_atividade r
    left join public.gabarito g
      on g.atividade_id = r.atividade_id and g.item = r.item
    where r.atividade_id = p_atividade
    group by r.aluno_id, r.tentativa
  )
  select t.aluno_id, a.nome, a.numero_chamada, a.turma_codigo, tu.nome,
         t.tentativa, t.respondidas, t.acertos,
         (select count(*)::integer from public.gabarito g2 where g2.atividade_id = p_atividade),
         e.entregue_em, t.ultima_gravacao
  from tentativas t
  left join public.aluno a on a.id = t.aluno_id
  left join public.turma tu on tu.codigo = a.turma_codigo
  left join public.entrega_atividade e
    on e.aluno_id = t.aluno_id and e.atividade_id = p_atividade and e.tentativa = t.tentativa
  order by a.turma_codigo, a.numero_chamada, a.nome, t.tentativa;
end;
$$;

revoke all on function public.resumo_tentativas_atividade(bigint) from public;
grant execute on function public.resumo_tentativas_atividade(bigint) to authenticated;
