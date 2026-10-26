-- #393: o professor pode liberar SÓ A NOTA e o resultado por tópico (✅/🟡/❌ + explicação) de uma
-- atividade discursiva para uma turma, SEM liberar o padrão de resposta (resposta_esperada).
-- Vale para todas as atividades discursivas (a página é global). Liberar o gabarito continua
-- liberando tudo (nota + resultado + padrão de resposta). Não encerra o preenchimento da turma.

alter table public.atividade add column if not exists nota_liberada jsonb not null default '[]'::jsonb;

create or replace function public.liberar_nota_turma(p_atividade bigint, p_turma text, p_liberar boolean)
returns boolean language plpgsql security definer set search_path = public as $$
declare v_liberada jsonb;
begin
  if not public.eh_professor() or not public.professor_tem_turma(p_turma) then
    raise exception 'Sem permissão para liberar a nota da turma %.', p_turma;
  end if;
  select nota_liberada into v_liberada from public.atividade where id = p_atividade for update;
  if not found then raise exception 'Atividade % não encontrada.', p_atividade; end if;

  if not p_liberar then
    update public.atividade set nota_liberada = v_liberada - p_turma where id = p_atividade;
    return false;
  end if;
  if not (v_liberada ? p_turma) then
    update public.atividade set nota_liberada = v_liberada || to_jsonb(p_turma)
     where id = p_atividade;
  end if;
  return true;
end $$;

-- Aluno que entregou e cuja turma teve a NOTA ou o GABARITO liberado.
create or replace function public.aluno_pode_ver_nota(p_atividade bigint)
returns boolean language sql stable security definer set search_path = public as $$
  select auth.uid() is not null
     and exists (select 1 from public.atividade a
                 join public.turmaaluno ta
                   on (a.nota_liberada ? ta.turma_codigo or a.gabarito_liberado ? ta.turma_codigo)
                 where a.id = p_atividade and ta.aluno_id = auth.uid())
     and exists (select 1 from public.entrega_atividade e
                 where e.atividade_id = p_atividade and e.aluno_id = auth.uid());
$$;

-- Tópicos para o resultado do aluno: enunciado e pontos, SEM a resposta esperada.
create or replace function public.solicitar_resultado_discursivo(p_atividade bigint)
returns table (item smallint, topico smallint, enunciado text, pontos numeric)
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Entre com o seu usuário.'; end if;
  if not public.aluno_pode_ver_nota(p_atividade) then return; end if;
  return query select t.item, t.topico, t.enunciado, t.pontos
    from public.topico_discursivo t where t.atividade_id = p_atividade order by t.item, t.topico;
end $$;

revoke all on function public.liberar_nota_turma(bigint, text, boolean),
  public.aluno_pode_ver_nota(bigint), public.solicitar_resultado_discursivo(bigint)
  from public, anon;
grant execute on function public.liberar_nota_turma(bigint, text, boolean),
  public.aluno_pode_ver_nota(bigint), public.solicitar_resultado_discursivo(bigint)
  to authenticated;
