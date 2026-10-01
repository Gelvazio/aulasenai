-- Líder da turma (2026-10-01). Executar no Supabase → SQL Editor. Idempotente; nada é apagado.
--
-- turma.lider_aluno_id: aluno líder da sala. Usado como aluno selecionado por padrão nas telas do
-- professor (ex.: AVALIACAO-MEDIA-FINAL.html). Vazio = usar o primeiro aluno da chamada.
-- Leitura: a mesma da turma (turma_select). Só o professor grava, pela função definir_lider_turma.

alter table public.turma
  add column if not exists lider_aluno_id uuid references public.aluno(id) on delete set null;

-- Professor define (ou limpa, com nulo) o líder de uma turma; o aluno precisa ser da turma.
create or replace function public.definir_lider_turma(p_codigo text, p_aluno uuid)
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode definir o líder da turma.';
  end if;
  if p_aluno is not null and not exists (
      select 1 from public.aluno a where a.id = p_aluno and a.turma_codigo = p_codigo) then
    raise exception 'O aluno informado não é desta turma.';
  end if;

  update public.turma set lider_aluno_id = p_aluno where codigo = p_codigo;
  if not found then
    raise exception 'Turma não encontrada.';
  end if;
end;
$$;

revoke all on function public.definir_lider_turma(text, uuid) from public, anon;
grant execute on function public.definir_lider_turma(text, uuid) to authenticated;

-- Os líderes de cada turma são gravados direto no banco (definir_lider_turma ou UPDATE no SQL
-- Editor). Nomes de alunos não ficam neste arquivo, que é publicado (LGPD).
