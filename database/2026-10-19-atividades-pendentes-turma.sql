-- #293.6 — Alerta de atividade pendente nos cards do índice (só professor).
-- Etapa: tasks/etapas/ETAPA-422-601a21b2-ALERTA-DE-ATIVIDADE-PENDENTE-NA-TURMA.md (#293.4/#293.5).
--
-- Uma linha por atividade (com aula), para a turma escolhida no combo "Turma:", com a contagem
-- de alunos pendentes. Devolve só contagens: nenhum nome, nota, resposta ou gabarito (I5).
-- Pendente (regra da #293.4) = aluno da turma, sem falta no dia da atividade, atividade com
-- questão e não bloqueada, e na tentativa atual: (a) não entregou, ou (b) entregou com nota
-- abaixo da mínima. Discursiva com correção do professor incompleta = aguardando correção (não
-- conta). Nota discursiva só com nota_professor, nunca nota_ia (#166).
-- Acesso: só professor da turma (ou administrador); aluno, visitante e turma sem aluno → 0 linhas.
-- Idempotente: create or replace + grants.

create or replace function public.atividades_pendentes_turma(
  p_turma text,
  p_nota_minima numeric default 7
)
returns table(
  turma_codigo text,
  aula_id bigint,
  atividade_id bigint,
  tem_questao boolean,
  bloqueada boolean,
  pendentes integer,
  nao_fizeram integer,
  nota_baixa integer
)
language sql
stable
security definer
set search_path to 'public'
as $function$
  with
  permissao as (
    -- Turma sem aluno não tem o que concluir: 0 linhas, para nenhum card ficar verde (#293.33).
    select public.eh_professor() and public.professor_tem_turma(p_turma)
           and exists (select 1 from public.turmaaluno ta where ta.turma_codigo = p_turma)
             as pode
  ),
  parametros as (
    -- Nota mínima do materia.json; fora de (0, 10] vale a padrão 7,0 (#293.11).
    select case when p_nota_minima > 0 and p_nota_minima <= 10
                then p_nota_minima else 7 end as nota_minima
  ),
  atividades as (
    select a.id, a.aula_id,
           coalesce(a.data_atividade, au.data_planejada) as dia,
           exists (select 1 from public.gabarito g where g.atividade_id = a.id) as objetiva,
           exists (select 1 from public.topico_discursivo t where t.atividade_id = a.id)
             as discursiva,
           (not a.ativo
            or coalesce(a.bloqueio ? p_turma, false)
            or not coalesce(au.ativo, true)
            or coalesce(au.excluido, 0) = 1
            or exists (select 1 from public.aula_turma x
                       where x.aula_id = a.aula_id and x.turma_codigo = p_turma and x.bloqueio))
             as bloqueada
    from public.atividade a
    join public.aulas au on au.id = a.aula_id
    where (select pode from permissao)
  ),
  pares as (
    select at.id, at.objetiva, ta.aluno_id,
           public.tentativa_atual_do_aluno(ta.aluno_id, at.id) as tentativa,
           coalesce((select max(e.tentativa) from public.entrega_atividade e
                     where e.aluno_id = ta.aluno_id and e.atividade_id = at.id), 0) as entregue_ate,
           exists (select 1 from public.falta_aluno f
                   where f.aluno_id = ta.aluno_id and f.data = at.dia) as faltou
    from atividades at
    join public.turmaaluno ta on ta.turma_codigo = p_turma
    where not at.bloqueada and (at.objetiva or at.discursiva)
  ),
  entregues as (
    select p.*, public.minimo_questoes_para_entregar(p.id, p.aluno_id) as minimo
    from pares p
    where not p.faltou and p.entregue_ate >= p.tentativa
  ),
  notas_objetivas as (
    select en.id, en.aluno_id,
           least(10, (select count(*) from public.resposta_atividade r
                      join public.gabarito g
                        on g.atividade_id = r.atividade_id and g.item = r.item
                       and g.letra = r.letra
                      where r.aluno_id = en.aluno_id and r.atividade_id = en.id
                        and r.tentativa = en.tentativa)::numeric
                     / nullif(en.minimo, 0) * 10) as nota,
           false as aguardando
    from entregues en
    where en.objetiva
  ),
  notas_discursivas as (
    select en.id, en.aluno_id,
           case when d.respondidos = 0 then 0
                when d.corrigidos = d.respondidos
                then least(10, d.soma_professor / nullif(d.soma_pontos, 0) * 10
                               * d.itens / nullif(en.minimo, 0))
           end as nota,
           (d.respondidos > 0 and d.corrigidos < d.respondidos) as aguardando
    from entregues en
    cross join lateral (
      select count(r.item) as respondidos,
             count(c.nota_professor) filter (where r.item is not null) as corrigidos,
             coalesce(sum(c.nota_professor) filter (where r.item is not null), 0)
               as soma_professor,
             sum(t.pontos) as soma_pontos,
             count(distinct t.item)::numeric as itens
      from public.topico_discursivo t
      left join public.resposta_discursiva r
        on r.atividade_id = t.atividade_id and r.item = t.item and r.topico = t.topico
       and r.aluno_id = en.aluno_id and r.tentativa = en.tentativa and trim(r.texto) <> ''
      left join public.correcao_discursiva c
        on c.atividade_id = t.atividade_id and c.item = t.item and c.topico = t.topico
       and c.aluno_id = en.aluno_id and c.tentativa = en.tentativa
      where t.atividade_id = en.id
    ) d
    where not en.objetiva
  ),
  notas as (
    select * from notas_objetivas
    union all
    select * from notas_discursivas
  ),
  contagens as (
    select p.id,
           count(*) filter (where not p.faltou and p.entregue_ate < p.tentativa)::integer
             as nao_fizeram,
           count(*) filter (where not n.aguardando
                              and round(coalesce(n.nota, 0), 2)
                                  < (select nota_minima from parametros))::integer
             as nota_baixa
    from pares p
    left join notas n on n.id = p.id and n.aluno_id = p.aluno_id
    group by p.id
  )
  select p_turma, at.aula_id, at.id,
         (at.objetiva or at.discursiva),
         at.bloqueada,
         coalesce(c.nao_fizeram + c.nota_baixa, 0),
         coalesce(c.nao_fizeram, 0),
         coalesce(c.nota_baixa, 0)
  from atividades at
  left join contagens c on c.id = at.id
  order by at.aula_id, at.id;
$function$;

comment on function public.atividades_pendentes_turma(text, numeric) is
  'Alerta do índice (#293): pendentes por atividade na turma. Só professor da turma; só contagens.';

revoke all on function public.atividades_pendentes_turma(text, numeric) from public, anon;
grant execute on function public.atividades_pendentes_turma(text, numeric) to authenticated;
