-- ─────────────────────────────────────────────────────────────────────────────────────
-- Tabela usuario ligada ao auth.users pelas chaves primárias + registro "senha informada"
-- Pedido do professor em 2026-09-30 (coluna "Aluno anotou?" de scripts/criarUsuariosBancoDados.html).
--
-- Antes: usuario.id era número (sem PK) e só 5 de 17 linhas tinham auth_user_id.
-- Depois: usuario.id é uuid, PRIMARY KEY e FOREIGN KEY para auth.users(id) (on delete cascade);
--         toda conta do Auth ganha a sua linha em usuario; a coluna auth_user_id deixa de existir.
--
-- Segurança dos dados: as 17 linhas antigas são copiadas para public.usuario_legado_20260930
-- (RLS ligado e sem políticas: só a chave service_role lê). As 12 linhas sem conta no Auth (dados
-- de teste) saem de usuario. Roda uma vez; se usuario.id já for uuid, não muda a estrutura.
-- Executar no Supabase → SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────────────
do $$
begin
  if (select data_type from information_schema.columns
      where table_schema = 'public' and table_name = 'usuario' and column_name = 'id') = 'integer' then

    create table if not exists public.usuario_legado_20260930 as table public.usuario;
    alter table public.usuario_legado_20260930 enable row level security;

    delete from public.usuario where auth_user_id is null;

    alter table public.usuario drop column id;
    alter table public.usuario drop constraint if exists usuario_auth_user_id_key;
    alter table public.usuario rename column auth_user_id to id;
    alter table public.usuario alter column id set not null;
    alter table public.usuario add constraint usuario_pkey primary key (id);
    alter table public.usuario
      add constraint usuario_id_fkey foreign key (id) references auth.users (id) on delete cascade;
  end if;
end $$;

-- toda conta do Auth ganha a sua linha em usuario (mesma chave)
insert into public.usuario (id, nome_completo, email, login_usuario, perfil)
select u.id,
       coalesce(nullif(u.raw_user_meta_data ->> 'nome', ''), split_part(u.email, '@', 1)),
       u.email,
       split_part(u.email, '@', 1),
       coalesce(nullif(u.raw_app_meta_data ->> 'perfil', ''), 'ALUNO')
from auth.users u
where u.email is not null
  and not exists (select 1 from public.usuario x where x.id = u.id);

-- o nome completo dos alunos vem da tabela aluno
update public.usuario us
set nome_completo = a.nome
from public.aluno a
where a.id = us.id and us.nome_completo is distinct from a.nome;

-- registro de que a senha foi informada ao aluno
alter table public.usuario
  add column if not exists senha_informada boolean not null default false;
alter table public.usuario
  add column if not exists senha_informada_em timestamptz;

-- as colunas criadas antes em aluno não são mais usadas
alter table public.aluno drop column if exists senha_informada;
alter table public.aluno drop column if exists senha_informada_em;
