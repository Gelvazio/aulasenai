-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Sugestões de vínculo aluno × turma para a página alunos.html (2026-10-05)
-- Plano: docs/sugestao-alunos-por-turma-confirmar.md
--
-- Lista os usuários com perfil ALUNO que ainda NÃO têm vínculo na turmaaluno, com a turma
-- sugerida (user_metadata.turma_codigo, gravado por scripts/criarUsuariosBancoDados.html ao criar
-- a conta). O user_metadata pode ser alterado pelo aluno: é SÓ sugestão. A gravação do vínculo
-- continua passando pelo RLS da turmaaluno (professor_tem_turma) e pelo trigger
-- turmaaluno_exige_aluno. Idempotente e sem apagar dados.
-- ════════════════════════════════════════════════════════════════════════════════════════════

create or replace function public.sugestoes_turmaaluno()
returns table (
  aluno_id uuid,
  nome_completo text,
  email text,
  turma_sugerida text,
  turma_nome text
)
language sql
stable
security definer
set search_path = public
as $$
  select u.id,
         us.nome_completo::text,
         u.email::text,
         t.codigo::text,
         t.nome::text
  from auth.users u
  left join public.usuario us on us.id = u.id
  left join public.turma t on t.codigo = u.raw_user_meta_data ->> 'turma_codigo'
  where public.eh_professor()
    and u.raw_app_meta_data ->> 'perfil' = 'ALUNO'
    and not exists (select 1 from public.turmaaluno ta where ta.aluno_id = u.id)
    and (t.codigo is null or public.professor_tem_turma(t.codigo))
  order by t.codigo nulls last, us.nome_completo;
$$;

comment on function public.sugestoes_turmaaluno() is
  'Alunos sem vínculo na turmaaluno, com a turma sugerida pelo user_metadata (só sugestão; '
  'o professor confirma em alunos.html). Só professor recebe linhas; professor comum só vê as '
  'sugestões das turmas dele ou sem turma; o administrador vê todas.';

revoke all on function public.sugestoes_turmaaluno() from public, anon;
grant execute on function public.sugestoes_turmaaluno() to authenticated;
