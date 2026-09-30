-- ─────────────────────────────────────────────────────────────────────────────────────
-- RLS restritivo na tabela usuario (pedido do professor em 2026-09-30)
--
-- Antes: RLS DESLIGADO e a chave anônima (anon) tinha SELECT/INSERT/UPDATE/DELETE/TRUNCATE,
-- inclusive leitura de senha_hash. Agora:
--   • RLS ligado; a política pública de SELECT sai;
--   • só usuário logado lê: a PRÓPRIA linha ou, se for professor (eh_professor()), todas;
--   • anon não tem nenhum acesso; ninguém grava pela API pública (a página local do professor
--     grava com a chave service_role, que ignora o RLS);
--   • as colunas legadas (senha_hash, codigoacesso, codigousado, dataexpiracaocodigo) não são
--     legíveis nem pelo usuário logado.
-- Idempotente. Executar no Supabase → SQL Editor (depois de 2026-09-30-usuario-liga-auth-users.sql).
-- ─────────────────────────────────────────────────────────────────────────────────────
alter table public.usuario enable row level security;

drop policy if exists "Permite SELECT público na usuario" on public.usuario;
drop policy if exists usuario_select on public.usuario;
create policy usuario_select on public.usuario
  for select to authenticated
  using (id = auth.uid() or public.eh_professor());

revoke all on public.usuario from anon, authenticated;
grant select (id, nome_completo, email, login_usuario, perfil, senha_informada, senha_informada_em)
  on public.usuario to authenticated;
