-- Link do slide de cada aula (tarefa #428.1, aprovada pelo usuário em 2026-10-29).
-- Coluna `link_aula` (text) na tabela `aulas`: guarda o link do PDF do slide, mostrado no índice
-- de atividades como o botão "SLIDE AULA NN". Idempotente; não apaga dados; o RLS da tabela
-- `aulas` continua o mesmo (a coluna nova herda as políticas da tabela).
--
-- Backup antes do ALTER: cópia da tabela `aulas` em `aulas_backup_20261029`, com RLS ligado e
-- nenhuma política (ninguém lê pela API; só o painel do Supabase). Pode ser apagada quando o
-- usuário confirmar a tarefa.

-- 1) Backup (só cria uma vez)
create table if not exists public.aulas_backup_20261029 as table public.aulas;
alter table public.aulas_backup_20261029 enable row level security;

-- 2) Coluna do link do slide
alter table public.aulas
  add column if not exists link_aula text;

comment on column public.aulas.link_aula is
  'Link do PDF do slide da aula (botão "SLIDE AULA NN" no índice de atividades; vazio = sem botão).';
