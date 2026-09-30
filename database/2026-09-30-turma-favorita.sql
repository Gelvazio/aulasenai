-- Turma favorita (2026-09-30).
-- Executar no Supabase → SQL Editor.
--
-- turma.favorito: no máximo UMA turma favorita (índice único parcial). Só o professor marca,
-- pela função definir_turma_favorita (security definer); a turma favorita já vem selecionada
-- no relatório das atividades e em criarUsuariosBancoDados.html. Nada é apagado.
alter table public.turma
  add column if not exists favorito boolean not null default false;

create unique index if not exists turma_favorita_unica
  on public.turma ((true)) where favorito;

create or replace function public.definir_turma_favorita(p_codigo text)
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  if not public.eh_professor() then
    raise exception 'Somente o professor pode definir a turma favorita.';
  end if;
  if p_codigo is not null and not exists (select 1 from public.turma where codigo = p_codigo) then
    raise exception 'Turma não encontrada.';
  end if;

  update public.turma set favorito = false where favorito;
  if p_codigo is not null then
    update public.turma set favorito = true where codigo = p_codigo;
  end if;
end;
$$;

revoke all on function public.definir_turma_favorita(text) from public;
grant execute on function public.definir_turma_favorita(text) to authenticated;

revoke execute on function public.definir_turma_favorita(text) from anon;
