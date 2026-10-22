-- #345.2 (etapa 474-097d44db): senha inicial dos alunos no banco, só para PROFESSOR.
-- Decisão do usuário (2026-10-22): guardar a senha inicial em texto, lida por qualquer professor;
-- se o aluno trocar a senha, a tela continua mostrando a inicial.
-- Idempotente. As senhas NÃO ficam neste arquivo: a carga é feita à parte (a partir de
-- scripts/LISTAPRESENCA.js) e pela tela local criarUsuariosBancoDados.html (upsert).

create table if not exists public.usuario_senha_inicial (
  usuario_id uuid primary key references public.usuario(id) on delete cascade,
  senha_inicial text not null,
  atualizado_em timestamptz not null default now()
);

alter table public.usuario_senha_inicial enable row level security;

revoke all on public.usuario_senha_inicial from anon;
grant select, insert, update on public.usuario_senha_inicial to authenticated;

drop policy if exists "usuario_senha_inicial_select_professor" on public.usuario_senha_inicial;
create policy "usuario_senha_inicial_select_professor" on public.usuario_senha_inicial
  for select to authenticated using ((select public.eh_professor()));

drop policy if exists "usuario_senha_inicial_insert_professor" on public.usuario_senha_inicial;
create policy "usuario_senha_inicial_insert_professor" on public.usuario_senha_inicial
  for insert to authenticated with check ((select public.eh_professor()));

drop policy if exists "usuario_senha_inicial_update_professor" on public.usuario_senha_inicial;
create policy "usuario_senha_inicial_update_professor" on public.usuario_senha_inicial
  for update to authenticated
  using ((select public.eh_professor())) with check ((select public.eh_professor()));

-- Lista de alunos por turma com a senha inicial (tela USUARIOS online). Qualquer professor.
create or replace function public.listar_usuarios_senhas()
returns table (
  turma_codigo text,
  turma_nome text,
  numero_chamada integer,
  usuario_id uuid,
  nome text,
  email text,
  senha_inicial text,
  desistente boolean
)
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  if not public.eh_professor() then
    raise exception 'Somente professor pode ver as senhas.' using errcode = '42501';
  end if;

  return query
  select ta.turma_codigo,
         t.nome,
         a.numero_chamada,
         u.id,
         u.nome_completo::text,
         u.email::text,
         s.senha_inicial,
         ta.desistente
    from public.turmaaluno ta
    join public.usuario u on u.id = ta.aluno_id
    join public.turma t on t.codigo = ta.turma_codigo
    left join public.aluno a on a.id = ta.aluno_id
    left join public.usuario_senha_inicial s on s.usuario_id = u.id
   order by ta.turma_codigo, a.numero_chamada nulls last, u.nome_completo;
end;
$$;

revoke all on function public.listar_usuarios_senhas() from public, anon;
grant execute on function public.listar_usuarios_senhas() to authenticated;
