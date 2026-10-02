-- Exclui a turma duplicada "AI OPIR 2026/1 V1" (nome usado como código; a turma real é 122552).
-- Pedido do professor em 2026-10-02. Aplicado pelo conector do Supabase. Idempotente.
-- Antes de excluir, copia para turma_legado_20261002 (RLS ligado, sem políticas).

create table if not exists public.turma_legado_20261002 as
  select * from public.turma where false;
alter table public.turma_legado_20261002 enable row level security;
revoke all on public.turma_legado_20261002 from anon, authenticated;

insert into public.turma_legado_20261002
select t.* from public.turma t
where t.codigo = 'AI OPIR 2026/1 V1'
  and not exists (select 1 from public.turma_legado_20261002 l where l.codigo = t.codigo);

-- Exclui só se nada estiver vinculado à turma duplicada.
delete from public.turma t
where t.codigo = 'AI OPIR 2026/1 V1'
  and not exists (select 1 from public.aluno a where a.turma_codigo = t.codigo)
  and not exists (select 1 from public.turmaaluno ta where ta.turma_codigo = t.codigo)
  and not exists (select 1 from public.turmaprofessor tp where tp.turma_codigo = t.codigo);
