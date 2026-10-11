-- Regras do projeto no banco: cópia do repositório (origem = Git) do CLAUDE.md, de docs/regras/,
-- do docs/HISTORICO-REGRAS.md e do docs/REGRAS-ATIVIDADE-PRATICA.md, inteira e por seção.
-- Tarefa #26-55a91111-02ce-4cb1 (Etapa 144-aff33423); plano docs/regras-no-banco.md.
-- Gravação só pelo conector do Supabase (script scripts/regras/sincronizar_regras.py);
-- leitura só do Professor Administrador. Idempotente, não apaga dados.

create table if not exists public.regra_documento (
  id bigint generated always as identity primary key,
  caminho text not null unique,
  versao_regras text,
  conteudo text not null,
  md5 text not null,
  commit_sha text,
  ativo boolean not null default true,
  sincronizado_em timestamptz not null default now()
);

comment on table public.regra_documento is
  'Cópia (origem = repositório) de cada arquivo de regras; md5 do conteúdo e commit da cópia.';

create table if not exists public.regra_secao (
  id bigint generated always as identity primary key,
  documento_id bigint not null references public.regra_documento (id),
  caminho text not null,
  ordem integer not null,
  nivel smallint not null check (nivel in (2, 3)),
  titulo text not null,
  secao_pai text,
  conteudo text not null,
  md5 text not null,
  ativo boolean not null default true,
  sincronizado_em timestamptz not null default now(),
  unique (caminho, ordem)
);

comment on table public.regra_secao is
  'Uma linha por seção (## e ###) de cada arquivo de regras; seção que deixou de existir fica ativo = false.';

create index if not exists regra_secao_titulo_idx on public.regra_secao (titulo);

alter table public.regra_documento enable row level security;
alter table public.regra_secao enable row level security;
revoke all on public.regra_documento from anon;
revoke all on public.regra_secao from anon;
revoke insert, update, delete, truncate on public.regra_documento from authenticated;
revoke insert, update, delete, truncate on public.regra_secao from authenticated;

drop policy if exists regra_documento_admin_select on public.regra_documento;
create policy regra_documento_admin_select on public.regra_documento for select to authenticated
  using (public.eh_professor_administrador());

drop policy if exists regra_secao_admin_select on public.regra_secao;
create policy regra_secao_admin_select on public.regra_secao for select to authenticated
  using (public.eh_professor_administrador());
