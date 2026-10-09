-- 2026-10-09 — Unidade em um só lugar: tabela unidade ligada a curso e turma.
-- Plano: docs/tabela-unidade-curso-turma.md (Etapa 119 do STATUS.md).
-- Decisões do usuário (2026-10-09): "AI CEPLAS" e "CEPLAS" = mesma unidade (CEPLAS);
-- "SN.RDS-LAB INFORMATICA 01 - SENAI/SC - Rio do Sul" = "SENAI Rio do Sul"; demais locais = uma
-- unidade cada; a linha de teste id 1 vira "SENAI Rio do Sul" (endereço de teste apagado).
-- Idempotente; não apaga dados (curso.unidade e turma.local ficam até a fase 2).

-- 1. Backup (RLS ligado e sem políticas: só o banco lê)
create table if not exists public.unidade_backup_20261009 as table public.unidade;
create table if not exists public.curso_backup_20261009 as table public.curso;
create table if not exists public.turma_backup_20261009 as table public.turma;
alter table public.unidade_backup_20261009 enable row level security;
alter table public.curso_backup_20261009 enable row level security;
alter table public.turma_backup_20261009 enable row level security;

-- 2. unidade.descricao → unidade.nome (nome único)
do $$
begin
  if exists (select 1 from information_schema.columns
              where table_schema = 'public' and table_name = 'unidade'
                and column_name = 'descricao') then
    alter table public.unidade rename column descricao to nome;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'unidade_nome_key') then
    alter table public.unidade add constraint unidade_nome_key unique (nome);
  end if;
end $$;

-- 3. Unidades
update public.unidade
   set nome = 'SENAI Rio do Sul', bairro = null, endereco = null
 where id = 1 and nome = 'SENAI Rio do Sul 1';

insert into public.unidade (nome)
values ('CEPLAS'), ('AI SALETE'), ('ROBERTO MACHADO'), ('APRENDIZAGEM INDUSTRIAL TAIÓ TARDE')
on conflict (nome) do nothing;

-- 4. Ligações (unidade em uso não pode ser apagada)
alter table public.curso add column if not exists unidade_id bigint
  references public.unidade (id) on delete restrict;
alter table public.turma add column if not exists unidade_id bigint
  references public.unidade (id) on delete restrict;
create index if not exists curso_unidade_id_idx on public.curso (unidade_id);
create index if not exists turma_unidade_id_idx on public.turma (unidade_id);

-- 5. Migração dos textos antigos para a ligação
update public.curso c
   set unidade_id = u.id
  from public.unidade u
 where c.unidade_id is null and c.unidade = 'SENAI Rio do Sul' and u.nome = 'SENAI Rio do Sul';

update public.turma t
   set unidade_id = u.id
  from public.unidade u
 where t.unidade_id is null
   and u.nome = case t.local
     when 'AI CEPLAS' then 'CEPLAS'
     when 'CEPLAS' then 'CEPLAS'
     when 'SN.RDS-LAB INFORMATICA 01 - SENAI/SC - Rio do Sul' then 'SENAI Rio do Sul'
     else t.local
   end;
