-- Log de cada execução das tarefas agendadas (regra docs/regras/tarefas-agendadas.md).
-- Já aplicado no Supabase (projeto AULAS SENAI); idempotente, não apaga dados.

create table if not exists public.agendamento_tarefa_logs (
  id uuid primary key default gen_random_uuid(),
  descricao text not null,
  data_hora timestamptz not null default now(),
  status text not null,
  nome_tarefa_agendamento text not null,
  tipo_assinatura text not null,
  aula text,
  commit_sha text,
  duracao_segundos integer,
  erro_mensagem text,
  repositorio text default 'Gelvazio/aulasenai',
  inicio_em timestamptz,
  fim_em timestamptz,
  sessao_url text,
  branch text default 'main',
  tentativas_push integer,
  arquivos_alterados integer,
  segundos_ate_trava integer,
  aula_status_anterior text,
  aula_status_novo text,
  conteudo_tarefa text
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'agendamento_tarefa_logs_tipo_assinatura_check'
  ) then
    alter table public.agendamento_tarefa_logs
      add constraint agendamento_tarefa_logs_tipo_assinatura_check
      check (tipo_assinatura in (
        'Claude (gelvazio@gmail.com)', 'Claude (gelvazio.c@edu.sc.senai.br)',
        'gemini', 'codex', 'grok'));
  end if;
end $$;

-- RLS ligado e sem políticas: a API pública não lê nem grava.
alter table public.agendamento_tarefa_logs enable row level security;
