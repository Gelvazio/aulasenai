-- Slides das aulas no Supabase Storage privado, bloqueados junto com a aula (tarefa #209).
-- Bucket privado "slides"; cada PDF em "<materia_id>/AULA-NN-SLIDES.pdf" (ex.: 48/AULA-03-SLIDES.pdf).
-- Leitura (link temporário pelo site): professor sempre; aluno só se a aula de número NN da matéria
-- não estiver bloqueada para todas (aulas.ativo = false) nem em TODAS as turmas dele
-- (aula_turma.bloqueio, #206). Aula não cadastrada ou aluno sem turma: liberado (mesma regra das
-- atividades, atividade_liberada_para_usuario). Sem login: nada. Gravar e apagar: só professor.
-- Idempotente; não apaga dados.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('slides', 'slides', false, 20971520, array['application/pdf'])
on conflict (id) do update
   set public = false,
       file_size_limit = excluded.file_size_limit,
       allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.slide_liberado_para_usuario(p_nome text)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  with partes as (
    select case when split_part(p_nome, '/', 1) ~ '^[0-9]+$'
                then split_part(p_nome, '/', 1)::bigint end as materia_id,
           (regexp_match(split_part(p_nome, '/', 2), '^AULA-([0-9]+)-SLIDES\.pdf$', 'i'))[1]::int
             as numero
  ), aula as (
    select a.id, a.ativo
      from public.aulas a, partes p
     where a.materia_id = p.materia_id and a.numero = p.numero and coalesce(a.excluido, 0) = 0
     order by a.id
     limit 1
  ), turmas as (
    select ta.turma_codigo from public.turmaaluno ta where ta.aluno_id = auth.uid()
  )
  select auth.uid() is not null and (
           public.eh_professor()
        or not exists (select 1 from aula)
        or (
             (select ativo from aula) is distinct from false
         and (
               not exists (select 1 from turmas)
            or exists (select 1 from turmas t
                        where not exists (select 1 from public.aula_turma at
                                           where at.aula_id = (select id from aula)
                                             and at.turma_codigo = t.turma_codigo
                                             and at.bloqueio))
             )
           )
         );
$function$;

revoke all on function public.slide_liberado_para_usuario(text) from public, anon;
grant execute on function public.slide_liberado_para_usuario(text) to authenticated;

drop policy if exists "slides_select" on storage.objects;
create policy "slides_select" on storage.objects
  for select to authenticated
  using (bucket_id = 'slides' and public.slide_liberado_para_usuario(name));

drop policy if exists "slides_insert_professor" on storage.objects;
create policy "slides_insert_professor" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'slides' and (select public.eh_professor()));

drop policy if exists "slides_update_professor" on storage.objects;
create policy "slides_update_professor" on storage.objects
  for update to authenticated
  using (bucket_id = 'slides' and (select public.eh_professor()))
  with check (bucket_id = 'slides' and (select public.eh_professor()));

drop policy if exists "slides_delete_professor" on storage.objects;
create policy "slides_delete_professor" on storage.objects
  for delete to authenticated
  using (bucket_id = 'slides' and (select public.eh_professor()));
