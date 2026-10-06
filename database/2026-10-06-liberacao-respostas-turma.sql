-- Liberar gabaritos por atividade e turma (plano: docs/liberacao-respostas-por-turma.md).
-- • atividade.gabarito_liberado: lista JSON com os códigos das turmas que já podem ver o gabarito.
-- • liberar_gabarito_turma(): só o professor da turma (administrador em todas); liberar exige que
--   TODOS os alunos da turma tenham entregado a última tentativa; recolher não tem condição.
-- • solicitar_gabarito(): o aluno recebe o gabarito real só se a turma dele estiver liberada e ele
--   já tiver entregado; senão nada volta e a tentativa fica gravada em tentativaacessogabarito.
--   A tabela gabarito continua só do professor (RLS sem mudança).
-- • Depois da liberação, nenhuma nova tentativa/recuperação para os alunos da turma (trigger).
-- Idempotente e sem apagar dados.

alter table public.atividade
  add column if not exists gabarito_liberado jsonb not null default '[]'::jsonb;

-- Registro de cada vez que o aluno pediu o gabarito antes da liberação.
create table if not exists public.tentativaacessogabarito (
  id           bigint generated always as identity primary key,
  atividade_id bigint not null references public.atividade (id),
  aluno_id     uuid   not null references auth.users (id),
  data_hora    timestamptz not null default now()
);
create index if not exists tentativaacessogabarito_atividade_idx
  on public.tentativaacessogabarito (atividade_id, aluno_id);

alter table public.tentativaacessogabarito enable row level security;
revoke all on public.tentativaacessogabarito from anon;
revoke truncate, insert, update, delete on public.tentativaacessogabarito from authenticated;
grant select on public.tentativaacessogabarito to authenticated;
drop policy if exists tentativaacessogabarito_select on public.tentativaacessogabarito;
create policy tentativaacessogabarito_select on public.tentativaacessogabarito
  for select to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

-- Alunos da turma que ainda NÃO entregaram a última tentativa liberada da atividade
-- (só o professor da turma recebe a contagem; para os demais, 0).
create or replace function public.alunos_sem_entrega_turma(p_atividade bigint, p_turma text)
returns integer
language sql
stable
security definer
set search_path to 'public'
as $$
  select count(*)::integer
  from public.turmaaluno ta
  where ta.turma_codigo = p_turma
    and public.eh_professor() and public.professor_tem_turma(p_turma)
    and coalesce((select max(e.tentativa) from public.entrega_atividade e
                   where e.aluno_id = ta.aluno_id and e.atividade_id = p_atividade), 0)
        < coalesce((select max(l.tentativa) from public.liberacao_atividade l
                   where l.aluno_id = ta.aluno_id and l.atividade_id = p_atividade), 1);
$$;

create or replace function public.liberar_gabarito_turma(
  p_atividade bigint, p_turma text, p_liberar boolean)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_liberado jsonb;
  v_faltam   integer;
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
  v_faltam := public.alunos_sem_entrega_turma(p_atividade, p_turma);
  if v_faltam > 0 then
    raise exception 'Faltam % aluno(s) da turma % entregar a atividade.', v_faltam, p_turma;
  end if;

  if not (v_liberado ? p_turma) then
    update public.atividade set gabarito_liberado = v_liberado || to_jsonb(p_turma)
    where id = p_atividade;
  end if;
  return true;
end;
$$;

-- Pedido do gabarito pelo ALUNO logado: devolve o gabarito real só com a turma dele liberada e a
-- atividade entregue; senão grava a tentativa em tentativaacessogabarito e não devolve nada.
create or replace function public.solicitar_gabarito(p_atividade bigint)
returns table (item smallint, titulo text, letra character)
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  v_pode boolean;
begin
  if auth.uid() is null then
    raise exception 'Entre com o seu usuário para pedir o gabarito.';
  end if;

  v_pode := exists (select 1 from public.atividade a
                    join public.turmaaluno ta on a.gabarito_liberado ? ta.turma_codigo
                    where a.id = p_atividade and ta.aluno_id = auth.uid())
        and exists (select 1 from public.entrega_atividade e
                    where e.atividade_id = p_atividade and e.aluno_id = auth.uid());

  if not v_pode then
    if exists (select 1 from public.atividade where id = p_atividade) then
      insert into public.tentativaacessogabarito (atividade_id, aluno_id)
      values (p_atividade, auth.uid());
    end if;
    return;
  end if;

  return query
    select g.item, g.titulo, g.letra from public.gabarito g
    where g.atividade_id = p_atividade order by g.item;
end;
$$;

-- Recuperação/nova tentativa recusada quando o gabarito já foi liberado para a turma do aluno.
create or replace function public.recusar_tentativa_gabarito_liberado()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if exists (select 1 from public.atividade a
             join public.turmaaluno ta on a.gabarito_liberado ? ta.turma_codigo
             where a.id = new.atividade_id and ta.aluno_id = new.aluno_id) then
    raise exception 'O gabarito desta atividade já foi liberado para a turma do aluno: %',
      'não é possível liberar nova tentativa ou recuperação.';
  end if;
  return new;
end;
$$;

drop trigger if exists liberacao_gabarito_liberado_trg on public.liberacao_atividade;
create trigger liberacao_gabarito_liberado_trg
  before insert on public.liberacao_atividade
  for each row execute function public.recusar_tentativa_gabarito_liberado();

-- Permissões: nada para anon; só usuários logados executam (as funções conferem o perfil).
revoke all on function public.alunos_sem_entrega_turma(bigint, text) from public, anon;
revoke all on function public.liberar_gabarito_turma(bigint, text, boolean) from public, anon;
revoke all on function public.solicitar_gabarito(bigint) from public, anon;
revoke all on function public.recusar_tentativa_gabarito_liberado()
  from public, anon, authenticated;
grant execute on function public.alunos_sem_entrega_turma(bigint, text) to authenticated;
grant execute on function public.liberar_gabarito_turma(bigint, text, boolean) to authenticated;
grant execute on function public.solicitar_gabarito(bigint) to authenticated;
