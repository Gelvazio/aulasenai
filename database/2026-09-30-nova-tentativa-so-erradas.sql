-- Nova tentativa só com as questões erradas (2026-09-30).
-- Executar no Supabase → SQL Editor. Nada é apagado.
--
-- Ao liberar uma nova tentativa, só as respostas CERTAS da tentativa anterior são copiadas
-- (marcadas como herdada = true): a página as esconde do aluno, mas elas continuam gravadas e
-- valendo na nova tentativa. As questões erradas ou sem resposta ficam em branco.
-- Tentativas já abertas antes desta regra não mudam.
alter table public.resposta_atividade
  add column if not exists herdada boolean not null default false;

create or replace function public.liberar_nova_tentativa(p_aluno uuid, p_atividade bigint)
returns smallint
language plpgsql security definer
set search_path = public
as $$
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

  -- maior nota (0 a 10) entre as tentativas entregues
  select max(t.acertos::numeric / nullif(t.total, 0) * 10) into v_nota_final
  from (
    select e.tentativa,
           (select count(*) from public.gabarito g
             join public.resposta_atividade r
               on r.atividade_id = g.atividade_id and r.item = g.item
              and r.aluno_id = p_aluno and r.tentativa = e.tentativa
              and r.letra = g.letra
            where g.atividade_id = p_atividade) as acertos,
           (select count(*) from public.gabarito g2
             where g2.atividade_id = p_atividade) as total
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

  -- só as respostas certas passam para a nova tentativa (herdadas: escondidas na página)
  insert into public.resposta_atividade (aluno_id, atividade_id, tentativa, item, letra, herdada)
  select r.aluno_id, r.atividade_id, v_nova, r.item, r.letra, true
  from public.resposta_atividade r
  join public.gabarito g on g.atividade_id = r.atividade_id and g.item = r.item
  where r.aluno_id = p_aluno and r.atividade_id = p_atividade and r.tentativa = v_atual
    and r.letra = g.letra;

  return v_nova;
end;
$$;

revoke all on function public.liberar_nova_tentativa(uuid, bigint) from public, anon;
grant execute on function public.liberar_nova_tentativa(uuid, bigint) to authenticated;
