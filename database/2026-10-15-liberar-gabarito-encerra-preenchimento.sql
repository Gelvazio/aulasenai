-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Liberar o gabarito encerra o preenchimento da turma (2026-10-15, tarefa #175)
-- Etapa: tasks/etapas/ETAPA-302-cfc044e9-BLOQUEAR-ATIVIDADES-02-03-05-E-LIBERAR-GABARITOS.md
--
-- • liberar_gabarito_turma(): deixa de recusar quando faltam alunos da turma entregar.
-- • item_valido() / topico_valido(): recusam resposta do ALUNO cuja turma já tem o gabarito
--   liberado na atividade. A atividade continua visível (nota e gabarito de quem entregou);
--   "Recolher gabarito" reabre o preenchimento.
-- Atualiza database/2026-10-06-liberacao-respostas-turma.sql e
-- database/2026-10-05-bloqueio-atividade-por-turma.sql. Idempotente e sem apagar dados.
-- ════════════════════════════════════════════════════════════════════════════════════════════

-- 1) Preenchimento encerrado: aluno logado com alguma turma (turmaaluno) já liberada ------------
-- Professor e visitante sem login nunca ficam encerrados.
create or replace function public.preenchimento_encerrado_para_usuario(p_gabarito_liberado jsonb)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
     and not public.eh_professor()
     and exists (select 1 from public.turmaaluno ta
                 where ta.aluno_id = auth.uid() and p_gabarito_liberado ? ta.turma_codigo);
$$;

comment on function public.preenchimento_encerrado_para_usuario(jsonb) is
  'Verdadeiro para o aluno logado com alguma turma em atividade.gabarito_liberado: '
  'o gabarito foi liberado e o preenchimento da atividade está encerrado para ele.';

revoke all on function public.preenchimento_encerrado_para_usuario(jsonb) from public, anon;
grant execute on function public.preenchimento_encerrado_para_usuario(jsonb) to authenticated;

-- 2) Gravação de respostas: definição de 2026-10-05 + preenchimento encerrado -----------------
create or replace function public.item_valido(p_atividade bigint, p_item smallint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.atividade a
    where a.id = p_atividade and a.ativo and p_item <= a.total_itens
      and public.atividade_liberada_para_usuario(a.bloqueio)
      and not public.preenchimento_encerrado_para_usuario(a.gabarito_liberado)
  );
$$;

create or replace function public.topico_valido(p_atividade bigint, p_item smallint,
                                                p_topico smallint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.topico_discursivo t
    join public.atividade a on a.id = t.atividade_id
    where t.atividade_id = p_atividade and t.item = p_item and t.topico = p_topico and a.ativo
      and public.atividade_liberada_para_usuario(a.bloqueio)
      and not public.preenchimento_encerrado_para_usuario(a.gabarito_liberado)
  );
$$;

-- 3) Liberar sem exigir todos entregues (recolher continua sem condição) ----------------------
create or replace function public.liberar_gabarito_turma(
  p_atividade bigint, p_turma text, p_liberar boolean)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_liberado jsonb;
begin
  if not public.eh_professor() or not public.professor_tem_turma(p_turma) then
    raise exception 'Sem permissão para liberar o gabarito da turma %.', p_turma;
  end if;

  select gabarito_liberado into v_liberado
  from public.atividade where id = p_atividade for update;
  if not found then
    raise exception 'Atividade % não encontrada.', p_atividade;
  end if;

  if not p_liberar then
    update public.atividade set gabarito_liberado = v_liberado - p_turma where id = p_atividade;
    return false;
  end if;

  if not exists (select 1 from public.turmaaluno where turma_codigo = p_turma) then
    raise exception 'A turma % não tem alunos vinculados.', p_turma;
  end if;

  if not (v_liberado ? p_turma) then
    update public.atividade set gabarito_liberado = v_liberado || to_jsonb(p_turma)
    where id = p_atividade;
  end if;
  return true;
end;
$$;

comment on function public.liberar_gabarito_turma(bigint, text, boolean) is
  'Professor da turma libera (ou recolhe) o gabarito da atividade para a turma. Liberar não '
  'exige todos entregues: encerra o preenchimento da turma (item_valido/topico_valido).';

revoke all on function public.liberar_gabarito_turma(bigint, text, boolean) from public, anon;
grant execute on function public.liberar_gabarito_turma(bigint, text, boolean) to authenticated;
