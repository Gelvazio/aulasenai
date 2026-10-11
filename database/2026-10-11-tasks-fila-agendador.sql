-- Fila "tasks" lida pelo agendador único (tarefa #24-9fb25086-5b51-44cb, Etapa 142-2a52ee2f).
-- Plano: docs/fila-tasks-agendador-unico.md. Idempotente e sem apagar dados.
-- Quem grava: o Professor Administrador (página tasks.html, RLS) e a rotina agendada pelo
-- conector do Supabase (funções pegar_proxima_task / finalizar_task, sem acesso pela API).
-- Regra: toda task existe na tabela e no GitHub (TASKS.md ou tasks/fila/TASK-NNNN.md).

create table if not exists public.tasks (
  id bigint generated always as identity primary key,
  codigo text unique,
  origem text not null default 'pagina',
  arquivo_md text,
  md5_md text,
  sincronizado_em timestamptz,
  titulo text not null,
  instrucao text not null,
  prioridade smallint not null default 3,
  executar boolean not null default true,
  executar_apos timestamptz,
  status text not null default 'pendente',
  tentativas smallint not null default 0,
  max_tentativas smallint not null default 3,
  trava_frente text,
  trava_em timestamptz,
  expira_em timestamptz,
  resultado text,
  pr_url text,
  commit_sha text,
  log_id uuid,
  excluido boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid default auth.uid(),
  atualizado_por uuid default auth.uid()
);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'tasks_status_check') then
    alter table public.tasks add constraint tasks_status_check check (status in (
      'pendente', 'em_execucao', 'concluida', 'recusada', 'erro', 'cancelada'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'tasks_origem_check') then
    alter table public.tasks add constraint tasks_origem_check
      check (origem in ('pagina', 'repositorio'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'tasks_prioridade_check') then
    alter table public.tasks add constraint tasks_prioridade_check
      check (prioridade between 1 and 5);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'tasks_tentativas_check') then
    alter table public.tasks add constraint tasks_tentativas_check
      check (tentativas >= 0 and max_tentativas between 1 and 10);
  end if;
end $$;

create index if not exists tasks_fila_idx on public.tasks (prioridade, criado_em)
  where status = 'pendente' and executar and not excluido;

-- Código, arquivo e datas automáticos; quem alterou vem do auth.uid() (nunca da página).
create or replace function public.tasks_preencher()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    new.codigo := coalesce(nullif(trim(new.codigo), ''), 'TASK-' || lpad(new.id::text, 4, '0'));
    new.arquivo_md := coalesce(new.arquivo_md, 'tasks/fila/' || new.codigo || '.md');
    new.criado_em := now();
    new.criado_por := coalesce(auth.uid(), new.criado_por);
  end if;
  new.atualizado_em := now();
  new.atualizado_por := coalesce(auth.uid(), new.atualizado_por);
  return new;
end;
$$;

drop trigger if exists tasks_preencher_trg on public.tasks;
create trigger tasks_preencher_trg before insert or update on public.tasks
  for each row execute function public.tasks_preencher();

-- A página não pode pôr nem tirar uma task de "em_execucao" (só as funções da rotina).
create or replace function public.tasks_validar_pagina()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new; -- conector / funções da rotina
  end if;
  if tg_op = 'UPDATE' and old.status = 'em_execucao' then
    raise exception 'Task em execução não pode ser alterada pela página.';
  end if;
  if new.status = 'em_execucao' then
    raise exception 'Só a rotina agendada coloca uma task em execução.';
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_validar_pagina_trg on public.tasks;
create trigger tasks_validar_pagina_trg before insert or update on public.tasks
  for each row execute function public.tasks_validar_pagina();

-- RLS: só o Professor Administrador lê e grava; sem DELETE (exclusão lógica).
alter table public.tasks enable row level security;
revoke all on public.tasks from anon;
revoke delete, truncate on public.tasks from authenticated;

drop policy if exists tasks_admin_select on public.tasks;
create policy tasks_admin_select on public.tasks for select to authenticated
  using (public.eh_professor_administrador());

drop policy if exists tasks_admin_insert on public.tasks;
create policy tasks_admin_insert on public.tasks for insert to authenticated
  with check (public.eh_professor_administrador());

drop policy if exists tasks_admin_update on public.tasks;
create policy tasks_admin_update on public.tasks for update to authenticated
  using (public.eh_professor_administrador())
  with check (public.eh_professor_administrador());

-- Pega 1 task da fila (atômico: duas execuções nunca pegam a mesma).
create or replace function public.pegar_proxima_task(p_frente text)
returns setof public.tasks
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id bigint;
begin
  update public.tasks
     set status = 'pendente', trava_frente = null, trava_em = null, expira_em = null,
         resultado = coalesce(resultado || E'\n', '') || 'Trava expirada em ' || now()
   where status = 'em_execucao' and expira_em < now();

  select id into v_id from public.tasks
   where status = 'pendente' and executar and not excluido
     and (executar_apos is null or executar_apos <= now())
     and tentativas < max_tentativas
   order by prioridade, criado_em
   limit 1
   for update skip locked;

  if v_id is null then
    return;
  end if;

  return query
  update public.tasks
     set status = 'em_execucao', trava_frente = p_frente, trava_em = now(),
         expira_em = now() + interval '90 minutes', tentativas = tentativas + 1
   where id = v_id
  returning *;
end;
$$;

-- Fecha a task pega pela rotina. "erro" com tentativas sobrando volta a "pendente".
create or replace function public.finalizar_task(
  p_id bigint, p_status text, p_resultado text,
  p_pr_url text default null, p_commit_sha text default null)
returns public.tasks
language plpgsql
security definer
set search_path = public
as $$
declare
  v_task public.tasks;
begin
  if p_status not in ('concluida', 'recusada', 'erro') then
    raise exception 'Status final inválido: %', p_status;
  end if;

  update public.tasks
     set status = case when p_status = 'erro' and tentativas < max_tentativas
                       then 'pendente' else p_status end,
         resultado = p_resultado,
         pr_url = coalesce(p_pr_url, pr_url),
         commit_sha = coalesce(p_commit_sha, commit_sha),
         trava_frente = null, trava_em = null, expira_em = null
   where id = p_id and status = 'em_execucao'
  returning * into v_task;

  if v_task.id is null then
    raise exception 'Task % não está em execução.', p_id;
  end if;
  return v_task;
end;
$$;

-- As funções da rotina não ficam na API (só o conector do Supabase as chama).
revoke execute on function public.pegar_proxima_task(text) from public, anon, authenticated;
revoke execute on function public.finalizar_task(bigint, text, text, text, text)
  from public, anon, authenticated;

comment on table public.tasks is
  'Fila lida pelo agendador único (#24). Toda task existe aqui e no GitHub (TASKS.md ou tasks/fila/).';

-- ── 2026-10-11: ordem e dependências (pedido do usuário: "crie ordem na tabela task e campo
-- task_dependente com o id das tasks de que ela depende; só inicia com as dependentes concluídas").
alter table public.tasks add column if not exists ordem integer;
alter table public.tasks add column if not exists task_dependente bigint[] not null default '{}';

create index if not exists tasks_ordem_idx on public.tasks (ordem);

-- Dependências válidas: ids existentes, sem a própria task e sem repetição.
create or replace function public.tasks_validar_dependencias()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_faltando bigint;
begin
  new.task_dependente := coalesce(
    (select array_agg(distinct d order by d) from unnest(new.task_dependente) d), '{}');
  if new.id = any(new.task_dependente) then
    raise exception 'Uma task não pode depender dela mesma.';
  end if;
  select d into v_faltando from unnest(new.task_dependente) d
   where not exists (select 1 from public.tasks t where t.id = d) limit 1;
  if v_faltando is not null then
    raise exception 'Task dependente % não existe.', v_faltando;
  end if;
  return new;
end;
$$;

drop trigger if exists tasks_validar_dependencias_trg on public.tasks;
create trigger tasks_validar_dependencias_trg before insert or update on public.tasks
  for each row execute function public.tasks_validar_dependencias();

-- Só pega task cujas dependências estão todas concluídas; ordem: prioridade, ordem, criação.
create or replace function public.pegar_proxima_task(p_frente text)
returns setof public.tasks
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id bigint;
begin
  update public.tasks
     set status = 'pendente', trava_frente = null, trava_em = null, expira_em = null,
         resultado = coalesce(resultado || E'\n', '') || 'Trava expirada em ' || now()
   where status = 'em_execucao' and expira_em < now();

  select t.id into v_id from public.tasks t
   where t.status = 'pendente' and t.executar and not t.excluido
     and (t.executar_apos is null or t.executar_apos <= now())
     and t.tentativas < t.max_tentativas
     and not exists (
       select 1 from unnest(t.task_dependente) d
         left join public.tasks x on x.id = d
        where x.status is distinct from 'concluida')
   order by t.prioridade, t.ordem nulls last, t.criado_em
   limit 1
   for update of t skip locked;

  if v_id is null then
    return;
  end if;

  return query
  update public.tasks
     set status = 'em_execucao', trava_frente = p_frente, trava_em = now(),
         expira_em = now() + interval '90 minutes', tentativas = tentativas + 1
   where id = v_id
  returning *;
end;
$$;

revoke execute on function public.pegar_proxima_task(text) from public, anon, authenticated;
