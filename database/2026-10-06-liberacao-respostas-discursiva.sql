-- Regra do gabarito também nas DISCURSIVAS (plano: docs/liberacao-respostas-por-turma.md).
-- O "gabarito" da discursiva é o padrão de resposta (topico_discursivo.resposta_esperada), que
-- continua lido só pelo professor (RLS sem mudança). A liberação usa a mesma coluna
-- atividade.gabarito_liberado e a mesma função liberar_gabarito_turma (só com todos entregues).
-- • aluno_pode_ver_gabarito(): regra única (turma liberada + atividade entregue), usada pelas duas
--   funções de pedido.
-- • solicitar_gabarito_discursivo(): padrão de resposta para o aluno liberado; senão grava o pedido
--   em tentativaacessogabarito e não devolve nada.
-- Idempotente e sem apagar dados. Depende de database/2026-10-06-liberacao-respostas-turma.sql.

create or replace function public.aluno_pode_ver_gabarito(p_atividade bigint)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select auth.uid() is not null
     and exists (select 1 from public.atividade a
                 join public.turmaaluno ta on a.gabarito_liberado ? ta.turma_codigo
                 where a.id = p_atividade and ta.aluno_id = auth.uid())
     and exists (select 1 from public.entrega_atividade e
                 where e.atividade_id = p_atividade and e.aluno_id = auth.uid());
$$;

-- Grava o pedido negado (só quando a atividade existe).
create or replace function public.registrar_tentativa_acesso_gabarito(p_atividade bigint)
returns void
language sql
volatile
security definer
set search_path to 'public'
as $$
  insert into public.tentativaacessogabarito (atividade_id, aluno_id)
  select a.id, auth.uid() from public.atividade a
  where a.id = p_atividade and auth.uid() is not null;
$$;

create or replace function public.solicitar_gabarito(p_atividade bigint)
returns table (item smallint, titulo text, letra character)
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
begin
  if auth.uid() is null then
    raise exception 'Entre com o seu usuário para pedir o gabarito.';
  end if;
  if not public.aluno_pode_ver_gabarito(p_atividade) then
    perform public.registrar_tentativa_acesso_gabarito(p_atividade);
    return;
  end if;

  return query
    select g.item, g.titulo, g.letra from public.gabarito g
    where g.atividade_id = p_atividade order by g.item;
end;
$$;

create or replace function public.solicitar_gabarito_discursivo(p_atividade bigint)
returns table (item smallint, topico smallint, enunciado text, pontos numeric,
               resposta_esperada text)
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
begin
  if auth.uid() is null then
    raise exception 'Entre com o seu usuário para pedir o gabarito.';
  end if;
  if not public.aluno_pode_ver_gabarito(p_atividade) then
    perform public.registrar_tentativa_acesso_gabarito(p_atividade);
    return;
  end if;

  return query
    select t.item, t.topico, t.enunciado, t.pontos, t.resposta_esperada
    from public.topico_discursivo t
    where t.atividade_id = p_atividade order by t.item, t.topico;
end;
$$;

-- Funções internas: ninguém chama pela API. Pedidos: só usuários logados.
revoke all on function public.aluno_pode_ver_gabarito(bigint) from public, anon, authenticated;
revoke all on function public.registrar_tentativa_acesso_gabarito(bigint)
  from public, anon, authenticated;
revoke all on function public.solicitar_gabarito(bigint) from public, anon;
revoke all on function public.solicitar_gabarito_discursivo(bigint) from public, anon;
grant execute on function public.solicitar_gabarito(bigint) to authenticated;
grant execute on function public.solicitar_gabarito_discursivo(bigint) to authenticated;
