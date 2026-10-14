-- Suspeita de Cópia nas avaliações discursivas (tarefa #129, Etapa 256, 2026-10-14).
-- A IA compara cada resposta com as dos outros alunos da MESMA turma, no mesmo item/tópico, e
-- grava aqui as suspeitas. Só o professor lê e valida ("Não é cópia" / "É cópia"); "É cópia"
-- grava nota_professor = 0 naquele tópico (correcao_discursiva, nota travada desde 2026-10-08).
-- Procedimento da IA: docs/regras/suspeita-copia-discursiva.md.
-- Idempotente; não apaga nem altera dados existentes.

create extension if not exists pg_trgm with schema extensions;

create table if not exists public.suspeita_copia_discursiva (
  atividade_id      bigint      not null references public.atividade(id) on delete cascade,
  aluno_id          uuid        not null references auth.users(id) on delete cascade,
  tentativa         smallint    not null,
  item              smallint    not null,
  topico            smallint    not null,
  aluno_parecido_id uuid        not null references auth.users(id) on delete cascade,
  semelhanca        numeric(4,3) not null check (semelhanca between 0 and 1),
  motivo            text,
  situacao          text        not null default 'pendente'
                    check (situacao in ('pendente', 'nao_copia', 'copia')),
  detectado_em      timestamptz not null default now(),
  validado_por      uuid        references auth.users(id),
  validado_em       timestamptz,
  primary key (atividade_id, aluno_id, tentativa, item, topico),
  check (aluno_parecido_id <> aluno_id)
);

comment on table public.suspeita_copia_discursiva is
  'Suspeitas de cópia nas discursivas: gravadas pela IA (pendente), validadas pelo professor '
  '(nao_copia / copia). Só o professor lê. Regra: docs/regras/suspeita-copia-discursiva.md';
comment on column public.suspeita_copia_discursiva.aluno_parecido_id is
  'Aluno da mesma turma com a resposta mais parecida no mesmo item/tópico.';
comment on column public.suspeita_copia_discursiva.semelhanca is
  'Semelhança dos dois textos (0 a 1, pg_trgm similarity) no momento da detecção.';
comment on column public.suspeita_copia_discursiva.motivo is
  'Porquê da suspeita, escrito pela IA (sem nomes de alunos).';

alter table public.suspeita_copia_discursiva enable row level security;

drop policy if exists "suspeita_copia_select_professor" on public.suspeita_copia_discursiva;
create policy "suspeita_copia_select_professor"
  on public.suspeita_copia_discursiva for select to authenticated
  using ((select public.eh_professor()) and public.professor_pode_ver_aluno(aluno_id));

-- Sem policy de insert/update/delete: o site só grava pela função validar_suspeita_copia.
revoke all on public.suspeita_copia_discursiva from anon;
revoke insert, update, delete, truncate, references, trigger
  on public.suspeita_copia_discursiva from authenticated;
grant select on public.suspeita_copia_discursiva to authenticated;

create or replace function public.validar_suspeita_copia(
  p_atividade bigint, p_aluno uuid, p_tentativa smallint,
  p_item smallint, p_topico smallint, p_e_copia boolean)
returns text
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_situacao text := case when p_e_copia then 'copia' else 'nao_copia' end;
  v_nota_professor numeric;
begin
  if not public.eh_professor() or not public.professor_pode_ver_aluno(p_aluno) then
    raise exception 'Só o professor do aluno pode validar a suspeita de cópia.';
  end if;
  if not exists (select 1 from public.suspeita_copia_discursiva s
                 where s.atividade_id = p_atividade and s.aluno_id = p_aluno
                   and s.tentativa = p_tentativa and s.item = p_item and s.topico = p_topico) then
    raise exception 'Suspeita de cópia não encontrada.';
  end if;

  if p_e_copia then
    select c.nota_professor into v_nota_professor from public.correcao_discursiva c
      where c.atividade_id = p_atividade and c.aluno_id = p_aluno and c.tentativa = p_tentativa
        and c.item = p_item and c.topico = p_topico;
    if v_nota_professor is not null and v_nota_professor <> 0 then
      raise exception
        'A nota do professor desta questão já foi confirmada (%) e não pode ser zerada.',
        v_nota_professor;
    end if;
    insert into public.correcao_discursiva
      (aluno_id, atividade_id, tentativa, item, topico, nota_professor, corrigido_por, corrigido_em)
    values (p_aluno, p_atividade, p_tentativa, p_item, p_topico, 0, auth.uid(), now())
    on conflict (aluno_id, atividade_id, tentativa, item, topico) do update
      set nota_professor = 0, corrigido_por = auth.uid(), corrigido_em = now()
      where public.correcao_discursiva.nota_professor is null;
  end if;

  update public.suspeita_copia_discursiva
     set situacao = v_situacao, validado_por = auth.uid(), validado_em = now()
   where atividade_id = p_atividade and aluno_id = p_aluno and tentativa = p_tentativa
     and item = p_item and topico = p_topico;
  return v_situacao;
end;
$function$;

revoke all on function
  public.validar_suspeita_copia(bigint, uuid, smallint, smallint, smallint, boolean)
  from public, anon;
grant execute on function
  public.validar_suspeita_copia(bigint, uuid, smallint, smallint, smallint, boolean)
  to authenticated;
