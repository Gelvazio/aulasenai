-- Tarefa #156 (Etapa 283, pedido do usuário em 2026-10-14): o professor pode MUDAR a nota já
-- confirmada de uma alternativa da discursiva (para cima ou para baixo), mas só com uma
-- justificativa; cada confirmação e cada mudança vira um EVENTO na tabela de histórico, que o
-- professor e o aluno (depois de entregar e do gabarito liberado) veem em linha do tempo.
-- Idempotente; não apaga dados. Plano B: reaplicar
-- database/2026-10-08-correcao-discursiva-nota-professor-travada.sql e não usar a tabela nova.

-- 1) Justificativa que o navegador manda junto com a nova nota (o trigger a lê e a registra).
alter table public.correcao_discursiva
  add column if not exists justificativa_mudanca text;

-- 2) Histórico em forma de eventos (quem grava é o trigger; ninguém grava direto).
create table if not exists public.correcao_discursiva_historico (
  id bigint generated always as identity primary key,
  aluno_id uuid not null,
  atividade_id bigint not null,
  tentativa smallint not null,
  item integer not null,
  topico integer not null,
  tipo text not null check (tipo in ('confirmacao', 'mudanca')),
  nota_anterior numeric check (nota_anterior is null or nota_anterior >= 0),
  nota_nova numeric not null check (nota_nova >= 0),
  justificativa text,
  feito_por uuid,
  feito_em timestamptz not null default now(),
  foreign key (aluno_id, atividade_id, tentativa, item, topico)
    references public.correcao_discursiva (aluno_id, atividade_id, tentativa, item, topico)
    on delete cascade
);

create index if not exists correcao_discursiva_historico_alternativa_idx
  on public.correcao_discursiva_historico
  (aluno_id, atividade_id, tentativa, item, topico, feito_em);

alter table public.correcao_discursiva_historico enable row level security;

-- Só leitura pelo navegador: sem política de insert/update/delete.
revoke all on public.correcao_discursiva_historico from anon, authenticated;
grant select on public.correcao_discursiva_historico to authenticated;

drop policy if exists "correcao_discursiva_historico_select"
  on public.correcao_discursiva_historico;
create policy "correcao_discursiva_historico_select"
  on public.correcao_discursiva_historico for select to authenticated
  using (
    (aluno_id = (select auth.uid()) and public.aluno_pode_ver_gabarito(atividade_id))
    or ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id))
  );

-- 3) Trigger de validação: a nota confirmada só muda com justificativa nova; nunca é apagada.
create or replace function public.correcao_discursiva_validar()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_pontos numeric;
  v_mudou boolean;
begin
  v_mudou := tg_op = 'UPDATE' and old.nota_professor is not null
     and new.nota_professor is distinct from old.nota_professor;
  if v_mudou and new.nota_professor is null then
    raise exception 'Nota já confirmada pelo professor: não pode ser apagada.';
  end if;
  if v_mudou and (length(trim(coalesce(new.justificativa_mudanca, ''))) < 5
      or new.justificativa_mudanca is not distinct from old.justificativa_mudanca) then
    raise exception 'Para mudar a nota já confirmada, informe a justificativa da mudança.';
  end if;
  select t.pontos into v_pontos from public.topico_discursivo t
    where t.atividade_id = new.atividade_id and t.item = new.item and t.topico = new.topico;
  if v_pontos is null then
    raise exception 'Tópico % do item % não existe nesta atividade.', new.topico, new.item;
  end if;
  if coalesce(new.nota_ia, 0) > v_pontos or coalesce(new.nota_professor, 0) > v_pontos then
    raise exception 'A nota não pode passar de % ponto(s) neste tópico.', v_pontos;
  end if;
  if tg_op = 'INSERT' or new.nota_professor is distinct from old.nota_professor then
    new.corrigido_por := auth.uid();
    new.corrigido_em := now();
  end if;
  return new;
end;
$function$;

-- 4) Trigger do histórico (depois de gravar, para a chave estrangeira já existir).
create or replace function public.correcao_discursiva_registrar_historico()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_anterior numeric := case when tg_op = 'UPDATE' then old.nota_professor else null end;
begin
  if new.nota_professor is null or new.nota_professor is not distinct from v_anterior then
    return new;
  end if;
  insert into public.correcao_discursiva_historico
    (aluno_id, atividade_id, tentativa, item, topico, tipo, nota_anterior, nota_nova,
     justificativa, feito_por, feito_em)
  values
    (new.aluno_id, new.atividade_id, new.tentativa, new.item, new.topico,
     case when v_anterior is null then 'confirmacao' else 'mudanca' end,
     v_anterior, new.nota_professor,
     case when v_anterior is null then null else trim(new.justificativa_mudanca) end,
     new.corrigido_por, coalesce(new.corrigido_em, now()));
  return new;
end;
$function$;

drop trigger if exists correcao_discursiva_historico_trg on public.correcao_discursiva;
create trigger correcao_discursiva_historico_trg
  after insert or update on public.correcao_discursiva
  for each row execute function public.correcao_discursiva_registrar_historico();

-- 5) Eventos de hoje: as notas já confirmadas ganham o evento "confirmacao" (uma vez só).
insert into public.correcao_discursiva_historico
  (aluno_id, atividade_id, tentativa, item, topico, tipo, nota_anterior, nota_nova,
   justificativa, feito_por, feito_em)
select c.aluno_id, c.atividade_id, c.tentativa, c.item, c.topico, 'confirmacao', null,
       c.nota_professor, null, c.corrigido_por, coalesce(c.corrigido_em, now())
from public.correcao_discursiva c
where c.nota_professor is not null
  and not exists (select 1 from public.correcao_discursiva_historico h
    where h.aluno_id = c.aluno_id and h.atividade_id = c.atividade_id
      and h.tentativa = c.tentativa and h.item = c.item and h.topico = c.topico);
