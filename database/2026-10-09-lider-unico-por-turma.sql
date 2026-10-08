-- Aluno líder: no máximo 1 líder por turma (pedido do usuário em 2026-10-08).
-- Plano: docs/aluno-lider-cadastra-equipes.md. Idempotente e sem apagar dados.
-- Ao ligar o líder de um aluno, a função recusa se alguma turma dele (turmaaluno) já tem outro
-- aluno com usuario.lider = 1, dizendo quem é o líder atual e em qual turma.

create or replace function public.definir_lider_usuario(p_usuario uuid, p_lider smallint)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_conflito record;
begin
  if p_lider not in (0, 1) then raise exception 'lider deve ser 0 ou 1'; end if;
  if not public.professor_pode_ver_aluno(p_usuario) then
    raise exception 'Sem permissão para este aluno';
  end if;
  if p_lider = 1 then
    select u.nome_completo, ta_outro.turma_codigo into v_conflito
    from public.turmaaluno ta_aluno
    join public.turmaaluno ta_outro on ta_outro.turma_codigo = ta_aluno.turma_codigo
    join public.usuario u on u.id = ta_outro.aluno_id
    where ta_aluno.aluno_id = p_usuario and ta_outro.aluno_id <> p_usuario and u.lider = 1
    limit 1;
    if found then
      raise exception 'A turma % já tem líder: %. Desligue o líder atual antes (1 líder por turma).',
        v_conflito.turma_codigo, v_conflito.nome_completo;
    end if;
  end if;
  update public.usuario set lider = p_lider where id = p_usuario;
end $$;
revoke all on function public.definir_lider_usuario(uuid, smallint) from public, anon;
grant execute on function public.definir_lider_usuario(uuid, smallint) to authenticated;
