-- Avaliações discursivas: respostas escritas por tópico, gravadas para correção posterior (IA).
-- Plano: docs/avaliacao-pratica-discursiva-itic.md
-- Idempotente e sem apagar dados. Não altera resposta_atividade nem entrega_atividade:
-- só amplia atividade_completa() para também entender as atividades discursivas.

-- Tópicos de cada questão discursiva. O padrão de resposta e os critérios só o professor lê.
create table if not exists public.topico_discursivo (
  atividade_id bigint not null references public.atividade(id) on delete cascade,
  item smallint not null check (item > 0),
  topico smallint not null check (topico > 0),
  enunciado text not null,
  pontos numeric(4,2) not null check (pontos > 0),
  resposta_esperada text,
  criterios text,
  primary key (atividade_id, item, topico)
);

alter table public.topico_discursivo enable row level security;
revoke all on public.topico_discursivo from anon;

drop policy if exists topico_discursivo_professor on public.topico_discursivo;
create policy topico_discursivo_professor on public.topico_discursivo
  for all to authenticated
  using ((select public.eh_professor()))
  with check ((select public.eh_professor()));

-- Respostas escritas do aluno: uma linha por tópico e tentativa.
create table if not exists public.resposta_discursiva (
  aluno_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  atividade_id bigint not null references public.atividade(id) on delete cascade,
  tentativa smallint not null default 1 check (tentativa >= 1),
  item smallint not null check (item > 0),
  topico smallint not null check (topico > 0),
  texto text not null check (char_length(btrim(texto)) between 1 and 3000),
  atualizado_em timestamptz not null default now(),
  primary key (aluno_id, atividade_id, tentativa, item, topico)
);

alter table public.resposta_discursiva enable row level security;
revoke all on public.resposta_discursiva from anon;

-- Tópico válido = existe em topico_discursivo de uma atividade ativa (o aluno não lê a tabela,
-- por isso a função é security definer).
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
  );
$$;

-- Mesmas regras de resposta_atividade: dono, não professor, tentativa em andamento,
-- antes da entrega e dentro do horário da turma.
drop policy if exists resposta_discursiva_select on public.resposta_discursiva;
create policy resposta_discursiva_select on public.resposta_discursiva
  for select to authenticated
  using (aluno_id = (select auth.uid()) or (select public.eh_professor()));

drop policy if exists resposta_discursiva_insert on public.resposta_discursiva;
create policy resposta_discursiva_insert on public.resposta_discursiva
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and public.topico_valido(atividade_id, item, topico)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and public.pode_responder_no_horario(atividade_id)
  );

drop policy if exists resposta_discursiva_update on public.resposta_discursiva;
create policy resposta_discursiva_update on public.resposta_discursiva
  for update to authenticated
  using (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  )
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and public.topico_valido(atividade_id, item, topico)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and public.pode_responder_no_horario(atividade_id)
  );

-- Apagar o texto do campo remove a resposta do tópico (mesmas condições do update).
drop policy if exists resposta_discursiva_delete on public.resposta_discursiva;
create policy resposta_discursiva_delete on public.resposta_discursiva
  for delete to authenticated
  using (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and public.pode_responder_no_horario(atividade_id)
  );

-- Entrega: a atividade discursiva está completa quando todos os tópicos têm resposta;
-- as objetivas continuam com a regra de antes (uma letra por item).
create or replace function public.atividade_completa(p_atividade bigint, p_tentativa smallint)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select case
    when exists (select 1 from public.topico_discursivo t where t.atividade_id = p_atividade)
    then (select count(*) from public.resposta_discursiva r
          where r.aluno_id = auth.uid() and r.atividade_id = p_atividade
            and r.tentativa = p_tentativa)
       = (select count(*) from public.topico_discursivo t where t.atividade_id = p_atividade)
    else (select count(*) from public.resposta_atividade r
          where r.aluno_id = auth.uid() and r.atividade_id = p_atividade
            and r.tentativa = p_tentativa)
       = (select a.total_itens from public.atividade a where a.id = p_atividade)
  end;
$$;
