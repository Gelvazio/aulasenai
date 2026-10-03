-- 2026-10-03 — Cada professor só vê e altera os alunos das turmas vinculadas a ele
-- (tabela turmaprofessor). O Professor Administrador continua vendo tudo.
-- Plano: docs/restringir-professor-as-turmas-vinculadas.md
-- Idempotente e sem apagar dados.

-- 1) Vínculos das turmas que estavam sem professor (decisão do usuário: gelvazio nas 3).
insert into public.turmaprofessor (turma_codigo, professor_id)
select t.codigo, u.id
from public.turma t
cross join auth.users u
where u.email = 'gelvazio.camargo@senai.local'
  and t.codigo in ('135080', '135081', 'QA LBTSN 2026/1 M2')
  and not exists (select 1 from public.turmaprofessor tp
                  where tp.turma_codigo = t.codigo and tp.professor_id = u.id);

-- 2) O professor logado pode ver o aluno? Administrador: sempre. Demais professores: aluno de
--    uma turma vinculada a ele, ou aluno ainda sem turma (para poder vinculá-lo em alunos.html).
create or replace function public.professor_pode_ver_aluno(p_aluno uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $$
  select public.eh_professor() and (
    public.eh_professor_administrador()
    or exists (select 1 from public.turmaaluno ta
               join public.turmaprofessor tp on tp.turma_codigo = ta.turma_codigo
               where ta.aluno_id = p_aluno and tp.professor_id = auth.uid())
    or (not exists (select 1 from public.turmaaluno ta where ta.aluno_id = p_aluno)
        and exists (select 1 from auth.users u
                    where u.id = p_aluno and u.raw_app_meta_data ->> 'perfil' = 'ALUNO'))
  );
$$;

revoke all on function public.professor_pode_ver_aluno(uuid) from public, anon;
grant execute on function public.professor_pode_ver_aluno(uuid) to authenticated;

-- 3) Leitura dos dados de alunos pelo professor.
drop policy if exists aluno_select on public.aluno;
create policy aluno_select on public.aluno for select to authenticated
  using (id = (select auth.uid()) or public.professor_pode_ver_aluno(id));

drop policy if exists usuario_select on public.usuario;
create policy usuario_select on public.usuario for select to authenticated
  using (id = (select auth.uid()) or public.professor_pode_ver_aluno(id));

drop policy if exists resposta_select on public.resposta_atividade;
create policy resposta_select on public.resposta_atividade for select to authenticated
  using (aluno_id = (select auth.uid()) or public.professor_pode_ver_aluno(aluno_id));

drop policy if exists entrega_select on public.entrega_atividade;
create policy entrega_select on public.entrega_atividade for select to authenticated
  using (aluno_id = (select auth.uid()) or public.professor_pode_ver_aluno(aluno_id));

drop policy if exists liberacao_select on public.liberacao_atividade;
create policy liberacao_select on public.liberacao_atividade for select to authenticated
  using (aluno_id = (select auth.uid()) or public.professor_pode_ver_aluno(aluno_id));

drop policy if exists resposta_discursiva_select on public.resposta_discursiva;
create policy resposta_discursiva_select on public.resposta_discursiva for select to authenticated
  using (aluno_id = (select auth.uid()) or public.professor_pode_ver_aluno(aluno_id));

-- 4) turmaaluno: o professor só lê e grava vínculos das turmas dele.
drop policy if exists turmaaluno_select on public.turmaaluno;
create policy turmaaluno_select on public.turmaaluno for select to authenticated
  using (aluno_id = auth.uid() or (public.eh_professor() and public.professor_tem_turma(turma_codigo)));

drop policy if exists turmaaluno_insert_professor on public.turmaaluno;
create policy turmaaluno_insert_professor on public.turmaaluno for insert to authenticated
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

drop policy if exists turmaaluno_update_professor on public.turmaaluno;
create policy turmaaluno_update_professor on public.turmaaluno for update to authenticated
  using (public.eh_professor() and public.professor_tem_turma(turma_codigo))
  with check (public.eh_professor() and public.professor_tem_turma(turma_codigo));

drop policy if exists turmaaluno_delete_professor on public.turmaaluno;
create policy turmaaluno_delete_professor on public.turmaaluno for delete to authenticated
  using (public.eh_professor() and public.professor_tem_turma(turma_codigo));

-- 5) Funções do professor: só turmas/alunos dele.
create or replace function public.definir_horario_turma(p_codigo text, p_inicio time, p_fim time)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode definir o horário da turma.';
  end if;
  if not public.professor_tem_turma(p_codigo) then
    raise exception 'Esta turma não está vinculada a você.';
  end if;
  if (p_inicio is null) <> (p_fim is null) then
    raise exception 'Informe o horário de início e o de fim (ou deixe os dois vazios).';
  end if;
  if p_inicio is not null and p_inicio >= p_fim then
    raise exception 'O horário de início deve ser menor que o de fim.';
  end if;

  update public.turma set hora_inicio = p_inicio, hora_fim = p_fim where codigo = p_codigo;
  if not found then
    raise exception 'Turma não encontrada.';
  end if;
end;
$function$;

create or replace function public.definir_lider_turma(p_codigo text, p_aluno uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode definir o líder da turma.';
  end if;
  if not public.professor_tem_turma(p_codigo) then
    raise exception 'Esta turma não está vinculada a você.';
  end if;
  if p_aluno is not null and not exists (
      select 1 from public.turmaaluno ta
      where ta.aluno_id = p_aluno and ta.turma_codigo = p_codigo) then
    raise exception 'O aluno informado não é desta turma.';
  end if;

  update public.turma set lider_aluno_id = p_aluno where codigo = p_codigo;
  if not found then
    raise exception 'Turma não encontrada.';
  end if;
end;
$function$;

create or replace function public.liberar_fora_horario(p_atividade bigint, p_aluno uuid, p_liberar boolean)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode liberar atividade fora do horário.';
  end if;
  if not public.professor_pode_ver_aluno(p_aluno) then
    raise exception 'Este aluno não é de uma turma vinculada a você.';
  end if;
  if p_liberar and public.atividade_eh_avaliacao(p_atividade) then
    raise exception 'Avaliações seguem sempre o horário da turma: não podem ser liberadas.';
  end if;

  update public.atividade
     set atividade_liberada_fora_horario = case
           when p_liberar then (select coalesce(jsonb_agg(distinct v), '[]'::jsonb)
                                from jsonb_array_elements_text(
                                  atividade_liberada_fora_horario || to_jsonb(p_aluno::text)) v)
           else atividade_liberada_fora_horario - p_aluno::text
         end
   where id = p_atividade;
  if not found then
    raise exception 'Atividade não encontrada.';
  end if;
end;
$function$;

create or replace function public.liberar_nova_tentativa(p_aluno uuid, p_atividade bigint)
returns smallint
language plpgsql
security definer
set search_path to 'public'
as $function$
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
  if not public.professor_pode_ver_aluno(p_aluno) then
    raise exception 'Este aluno não é de uma turma vinculada a você.';
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

  insert into public.resposta_atividade (aluno_id, atividade_id, tentativa, item, letra, herdada)
  select r.aluno_id, r.atividade_id, v_nova, r.item, r.letra, true
  from public.resposta_atividade r
  join public.gabarito g on g.atividade_id = r.atividade_id and g.item = r.item
  where r.aluno_id = p_aluno and r.atividade_id = p_atividade and r.tentativa = v_atual
    and r.letra = g.letra;

  return v_nova;
end;
$function$;

create or replace function public.resumo_tentativas_atividade(p_atividade bigint)
returns table(aluno_id uuid, nome text, numero_chamada integer, turma_codigo text,
              turma_nome text, tentativa smallint, respondidas integer, acertos integer,
              total integer, entregue_em timestamptz, ultima_gravacao timestamptz)
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
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
$function$;
