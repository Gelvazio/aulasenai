-- Média de perguntas respondidas por atividade na turma (card "Notas e média", só professor).
-- Só leitura. Idempotente. Média = soma, entre os alunos ativos da turma (desistente = false), da
-- melhor tentativa de cada aluno (perguntas com resposta) / quantidade de alunos ativos.
-- Objetiva: itens com alternativa marcada; discursiva: itens com algum tópico com texto.
-- Total = itens do gabarito (objetiva) ou itens de tópicos (discursiva).
create or replace function public.media_perguntas_turma(p_turma text, p_paginas text[])
 returns table(pagina text, media numeric, total integer)
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  with alunos as (
    select al.id from public.aluno al
    where al.turma_codigo = p_turma and al.desistente = false
  ),
  qtd_alunos as (select count(*) as n from alunos),
  atividades as (
    select a.id, a.pagina from public.atividade a where a.pagina = any (p_paginas)
  ),
  totais as (
    select at.id, at.pagina,
           greatest(
             (select count(*) from public.gabarito g where g.atividade_id = at.id),
             (select count(distinct t.item) from public.topico_discursivo t
               where t.atividade_id = at.id))::integer as total
    from atividades at
  ),
  respondidas as (
    select r.atividade_id, r.aluno_id, r.tentativa, count(distinct r.item) as q
    from public.resposta_atividade r
    join alunos al on al.id = r.aluno_id
    where r.atividade_id in (select id from atividades) and coalesce(r.letra, '') <> ''
    group by r.atividade_id, r.aluno_id, r.tentativa
    union all
    select d.atividade_id, d.aluno_id, d.tentativa, count(distinct d.item)
    from public.resposta_discursiva d
    join alunos al on al.id = d.aluno_id
    where d.atividade_id in (select id from atividades) and trim(d.texto) <> ''
    group by d.atividade_id, d.aluno_id, d.tentativa
  ),
  melhor as (
    select atividade_id, aluno_id, max(q) as q from respondidas group by atividade_id, aluno_id
  )
  select t.pagina,
         round(coalesce((select sum(m.q) from melhor m where m.atividade_id = t.id), 0)::numeric
               / nullif((select n from qtd_alunos), 0), 1),
         t.total
  from totais t
  where public.eh_professor() and public.professor_tem_turma(p_turma);
$function$;

revoke all on function public.media_perguntas_turma(text, text[]) from public, anon;
grant execute on function public.media_perguntas_turma(text, text[]) to authenticated;
