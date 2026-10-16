-- Desfaz o 2026-10-16-slides-storage.sql (tarefa #209.7, pedido do usuário em 2026-10-16):
-- tira as 4 políticas do bucket "slides" em storage.objects e a função
-- slide_liberado_para_usuario. Os PDFs continuam no site. Idempotente.
-- O bucket "slides" (vazio) NÃO sai por SQL: o Supabase recusa "delete from storage.buckets"
-- (storage.protect_delete). Apagar pelo painel: Storage → slides → Delete bucket.

drop policy if exists "slides_select" on storage.objects;
drop policy if exists "slides_insert_professor" on storage.objects;
drop policy if exists "slides_update_professor" on storage.objects;
drop policy if exists "slides_delete_professor" on storage.objects;

drop function if exists public.slide_liberado_para_usuario(text);
