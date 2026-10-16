-- Aluno "Não é cópia" numa atividade discursiva (tarefa #133, Etapa 260, 2026-10-14).
-- O professor libera o aluno da comparação de cópia NA ATIVIDADE: as suspeitas pendentes em que
-- ele aparece (dele e dos colegas que apontam para ele) viram "nao_copia" (nada é apagado, nenhuma
-- nota muda) e a IA deixa de compará-lo (docs/regras/suspeita-copia-discursiva.md).
-- Desfazer tira a marca: ele volta a ser comparado nas próximas rodadas.
-- Idempotente; não apaga nem altera dados existentes.

create table if not exists public.aluno_liberado_copia (
  atividade_id bigint      not null references public.atividade(id) on delete cascade,
  aluno_id     uuid        not null references auth.users(id) on delete cascade,
  liberado_por uuid        references auth.users(id),
  liberado_em  timestamptz not null default now(),
  primary key (atividade_id, aluno_id)
);

comment on table public.aluno_liberado_copia is
  'Alunos que o professor marcou como "Não é cópia" numa atividade: fora da comparação de cópia.';

alter table public.aluno_liberado_copia enable row level security;

drop policy if exists "aluno_liberado_copia_select_professor" on public.aluno_liberado_copia;
create policy "aluno_liberado_copia_select_professor"
  on public.aluno_liberado_copia for select to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

revoke all on public.aluno_liberado_copia from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.aluno_liberado_copia from authenticated;
grant select on public.aluno_liberado_copia to authenticated;

create or replace function public.liberar_aluno_copia(
  p_atividade bigint, p_aluno uuid, p_liberar boolean)
returns integer
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_validadas integer := 0;
begin
  if not public.eh_professor() or not public.professor_pode_ver_aluno(p_aluno) then
    raise exception 'Só o professor do aluno pode marcar "Não é cópia".';
  end if;

  if not p_liberar then
    delete from public.aluno_liberado_copia
     where atividade_id = p_atividade and aluno_id = p_aluno;
    return 0;
  end if;

  insert into public.aluno_liberado_copia (atividade_id, aluno_id, liberado_por)
  values (p_atividade, p_aluno, auth.uid())
  on conflict (atividade_id, aluno_id) do nothing;

  update public.suspeita_copia_discursiva
     set situacao = 'nao_copia', validado_por = auth.uid(), validado_em = now()
   where atividade_id = p_atividade and situacao = 'pendente'
     and (aluno_id = p_aluno or aluno_parecido_id = p_aluno);
  get diagnostics v_validadas = row_count;
  return v_validadas;
end;
$function$;

revoke all on function public.liberar_aluno_copia(bigint, uuid, boolean) from public, anon;
grant execute on function public.liberar_aluno_copia(bigint, uuid, boolean) to authenticated;
