-- ─────────────────────────────────────────────────────────────────────────────────────
-- CRUD de atividades pelo professor (modal "CADASTRAR ATIVIDADES" do ATIVIDADES/index.html)
-- Plano: docs/crud-atividades-modal-index.md  —  2026-09-29
--
-- Idempotente. Executar no Supabase → SQL Editor (depois de 2026-09-28-atividades-gabarito.sql).
-- Só o professor (app_metadata.perfil = 'PROFESSOR', função eh_professor()) grava em atividade.
-- A leitura continua pública para as ativas (policy atividade_select).
-- ─────────────────────────────────────────────────────────────────────────────────────

drop policy if exists atividade_insert_professor on public.atividade;
create policy atividade_insert_professor on public.atividade
  for insert to authenticated with check (public.eh_professor());

drop policy if exists atividade_update_professor on public.atividade;
create policy atividade_update_professor on public.atividade
  for update to authenticated using (public.eh_professor()) with check (public.eh_professor());

drop policy if exists atividade_delete_professor on public.atividade;
create policy atividade_delete_professor on public.atividade
  for delete to authenticated using (public.eh_professor());

grant insert, update, delete on public.atividade to authenticated;
grant usage, select on all sequences in schema public to authenticated;
