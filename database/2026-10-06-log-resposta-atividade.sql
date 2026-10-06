-- Log de gravação das alternativas (plano: docs/log-resposta-atividade.md).
-- Cada alternativa marcada, trocada ou apagada em resposta_atividade gera uma linha em
-- log_resposta_atividade, com a letra anterior, a letra nova, a data e a hora e quem gravou.
-- A partir da aplicação, registra todo clique novo; o histórico de trocas anterior não existe, então
-- a alternativa atual de cada questão já respondida entra uma vez como CARGA_INICIAL (com a hora da
-- última gravação dela). Preenchido só pelo gatilho do banco:
-- ninguém grava, altera ou apaga o log pela API; o professor lê só os alunos das turmas dele.
-- Idempotente e sem apagar dados.

create table if not exists public.log_resposta_atividade (
  id              bigint generated always as identity primary key,
  aluno_id        uuid        not null,
  atividade_id    bigint      not null,
  tentativa       smallint    not null,
  item            smallint    not null,
  letra_anterior  character,
  letra_nova      character,
  operacao        text        not null check (operacao in ('CARGA_INICIAL', 'MARCOU', 'TROCOU', 'APAGOU')),
  herdada         boolean     not null default false,
  gravado_por     uuid,
  registrado_em   timestamptz not null default now()
);
create index if not exists log_resposta_atividade_busca_idx
  on public.log_resposta_atividade (atividade_id, aluno_id, registrado_em);

alter table public.log_resposta_atividade enable row level security;
revoke all on public.log_resposta_atividade from anon;
revoke truncate, insert, update, delete on public.log_resposta_atividade from authenticated;
grant select on public.log_resposta_atividade to authenticated;
drop policy if exists log_resposta_atividade_select on public.log_resposta_atividade;
create policy log_resposta_atividade_select on public.log_resposta_atividade
  for select to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

create or replace function public.registrar_log_resposta_atividade()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.log_resposta_atividade
      (aluno_id, atividade_id, tentativa, item, letra_anterior, letra_nova, operacao, herdada,
       gravado_por)
    values (new.aluno_id, new.atividade_id, new.tentativa, new.item, null, new.letra, 'MARCOU',
            coalesce(new.herdada, false), auth.uid());
    return new;
  end if;

  if tg_op = 'UPDATE' then
    if new.letra is not distinct from old.letra then
      return new;
    end if;
    insert into public.log_resposta_atividade
      (aluno_id, atividade_id, tentativa, item, letra_anterior, letra_nova, operacao, herdada,
       gravado_por)
    values (new.aluno_id, new.atividade_id, new.tentativa, new.item, old.letra, new.letra, 'TROCOU',
            coalesce(new.herdada, false), auth.uid());
    return new;
  end if;

  insert into public.log_resposta_atividade
    (aluno_id, atividade_id, tentativa, item, letra_anterior, letra_nova, operacao, herdada,
     gravado_por)
  values (old.aluno_id, old.atividade_id, old.tentativa, old.item, old.letra, null, 'APAGOU',
          coalesce(old.herdada, false), auth.uid());
  return old;
end;
$$;

revoke all on function public.registrar_log_resposta_atividade() from public, anon, authenticated;

drop trigger if exists resposta_atividade_log_trg on public.resposta_atividade;
create trigger resposta_atividade_log_trg
  after insert or update or delete on public.resposta_atividade
  for each row execute function public.registrar_log_resposta_atividade();

-- Carga inicial (uma vez só): a alternativa atual de cada questão já respondida, em qualquer atividade.
insert into public.log_resposta_atividade
  (aluno_id, atividade_id, tentativa, item, letra_anterior, letra_nova, operacao, herdada,
   gravado_por, registrado_em)
select r.aluno_id, r.atividade_id, r.tentativa, r.item, null, r.letra, 'CARGA_INICIAL',
       coalesce(r.herdada, false), r.aluno_id, coalesce(r.atualizado_em, now())
from public.resposta_atividade r
where not exists (select 1 from public.log_resposta_atividade l where l.operacao = 'CARGA_INICIAL');
