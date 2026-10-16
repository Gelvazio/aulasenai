-- Professor marca a atividade do aluno como entregue (tarefa #45, etapa 172-0ef7953a).
-- Idempotente. Objetivas e práticas (discursivas) usam a mesma tabela entrega_atividade.
--   - entrega_atividade.entregue_por: nula = o próprio aluno entregou; preenchida = professor.
--   - professor_marcar_entregue: grava a entrega da tentativa atual do aluno sem exigir o mínimo
--     de questões nem o horário da turma (em branco conta como errada; quem nunca abriu fica 0).
--   - professor_desmarcar_entregue: desfaz só a entrega feita pelo professor, na tentativa atual,
--     sem tentativa nova liberada e sem nota lançada pelo professor (discursiva).
--   - resumo_tentativas_atividade: traz também o aluno entregue sem nenhuma resposta e o
--     entregue_por.
-- A política de INSERT da entrega_atividade (a do aluno) não muda.

alter table public.entrega_atividade
  add column if not exists entregue_por uuid references auth.users (id);

comment on column public.entrega_atividade.entregue_por is
  'Professor que marcou a entrega (nula = o próprio aluno entregou).';

create or replace function public.tentativa_atual_do_aluno(p_aluno uuid, p_atividade bigint)
returns smallint
language sql
stable security definer
set search_path to 'public'
as $$
  select coalesce(max(l.tentativa), 1)::smallint
  from public.liberacao_atividade l
  where l.aluno_id = p_aluno and l.atividade_id = p_atividade;
$$;

revoke all on function public.tentativa_atual_do_aluno(uuid, bigint)
  from public, anon, authenticated;

create or replace function public.professor_marcar_entregue(p_aluno uuid, p_atividade bigint)
returns timestamp with time zone
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_tentativa smallint;
  v_entregue  timestamp with time zone;
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode marcar a atividade como entregue.';
  end if;
  if not public.professor_pode_ver_aluno(p_aluno) then
    raise exception 'Este aluno não é de uma turma vinculada a você.';
  end if;
  if not exists (select 1 from public.atividade a where a.id = p_atividade) then
    raise exception 'Atividade não encontrada.';
  end if;

  v_tentativa := public.tentativa_atual_do_aluno(p_aluno, p_atividade);
  if exists (select 1 from public.entrega_atividade e
             where e.aluno_id = p_aluno and e.atividade_id = p_atividade
               and e.tentativa = v_tentativa) then
    raise exception 'A tentativa % deste aluno já foi entregue.', v_tentativa;
  end if;

  insert into public.entrega_atividade (aluno_id, atividade_id, tentativa, entregue_por)
  values (p_aluno, p_atividade, v_tentativa, auth.uid())
  returning entregue_em into v_entregue;
  return v_entregue;
end;
$$;

revoke all on function public.professor_marcar_entregue(uuid, bigint) from public, anon;
grant execute on function public.professor_marcar_entregue(uuid, bigint) to authenticated;

create or replace function public.professor_desmarcar_entregue(p_aluno uuid, p_atividade bigint)
returns smallint
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_tentativa smallint;
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode desfazer a entrega.';
  end if;
  if not public.professor_pode_ver_aluno(p_aluno) then
    raise exception 'Este aluno não é de uma turma vinculada a você.';
  end if;

  v_tentativa := public.tentativa_atual_do_aluno(p_aluno, p_atividade);
  if not exists (select 1 from public.entrega_atividade e
                 where e.aluno_id = p_aluno and e.atividade_id = p_atividade
                   and e.tentativa = v_tentativa) then
    raise exception 'A tentativa % deste aluno não está entregue.', v_tentativa;
  end if;
  if not exists (select 1 from public.entrega_atividade e
                 where e.aluno_id = p_aluno and e.atividade_id = p_atividade
                   and e.tentativa = v_tentativa and e.entregue_por is not null) then
    raise exception 'Esta entrega foi feita pelo próprio aluno e não pode ser desfeita.';
  end if;
  if exists (select 1 from public.correcao_discursiva c
             where c.aluno_id = p_aluno and c.atividade_id = p_atividade
               and c.tentativa = v_tentativa and c.nota_professor is not null) then
    raise exception 'A nota desta tentativa já foi lançada; a entrega não pode ser desfeita.';
  end if;

  delete from public.entrega_atividade e
  where e.aluno_id = p_aluno and e.atividade_id = p_atividade
    and e.tentativa = v_tentativa and e.entregue_por is not null;
  return v_tentativa;
end;
$$;

revoke all on function public.professor_desmarcar_entregue(uuid, bigint) from public, anon;
grant execute on function public.professor_desmarcar_entregue(uuid, bigint) to authenticated;

-- O retorno muda (entregue_por), por isso drop + create.
drop function if exists public.resumo_tentativas_atividade(bigint);

create function public.resumo_tentativas_atividade(p_atividade bigint)
returns table(aluno_id uuid, nome text, numero_chamada integer, turma_codigo text,
              turma_nome text, tentativa smallint, respondidas integer, acertos integer,
              total integer, entregue_em timestamp with time zone,
              ultima_gravacao timestamp with time zone, entregue_por uuid)
language plpgsql
stable security definer
set search_path to 'public'
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
      and public.professor_pode_ver_aluno(r.aluno_id)
    group by r.aluno_id, r.tentativa
  ),
  entregues_sem_resposta as (
    select e.aluno_id, e.tentativa, 0 as respondidas, 0 as acertos,
           null::timestamp with time zone as ultima_gravacao
    from public.entrega_atividade e
    where e.atividade_id = p_atividade
      and public.professor_pode_ver_aluno(e.aluno_id)
      and not exists (select 1 from tentativas t
                      where t.aluno_id = e.aluno_id and t.tentativa = e.tentativa)
  ),
  todas as (
    select * from tentativas
    union all
    select * from entregues_sem_resposta
  )
  select t.aluno_id, a.nome, a.numero_chamada, a.turma_codigo, tu.nome,
         t.tentativa, t.respondidas, t.acertos,
         (select count(*)::integer from public.gabarito g2 where g2.atividade_id = p_atividade),
         e.entregue_em, t.ultima_gravacao, e.entregue_por
  from todas t
  left join public.aluno a on a.id = t.aluno_id
  left join public.turma tu on tu.codigo = a.turma_codigo
  left join public.entrega_atividade e
    on e.aluno_id = t.aluno_id and e.atividade_id = p_atividade and e.tentativa = t.tentativa
  order by a.turma_codigo, a.numero_chamada, a.nome, t.tentativa;
end;
$$;

revoke all on function public.resumo_tentativas_atividade(bigint) from public, anon;
grant execute on function public.resumo_tentativas_atividade(bigint) to authenticated;
