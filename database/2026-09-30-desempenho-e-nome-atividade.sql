-- ─────────────────────────────────────────────────────────────────────────────────────
-- Ajustes de desempenho e um bug do cadastro de atividades (2026-09-30). Não apaga dados.
--  1. atividade.nome_atividade deixa de ser obrigatória (o botão "CADASTRAR ATIVIDADES" não a envia
--     e criar atividade nova falhava com NOT NULL). Coluna do quiz antigo; o texto atual é descricao.
--  2. Políticas com (select auth.uid()) / (select eh_professor()): avaliadas uma vez por consulta,
--     não uma vez por linha (aviso auth_rls_initplan). Mesmo comportamento.
--  3. Índices nas chaves estrangeiras sem índice (aluno.turma_codigo, entrega_atividade.atividade_id).
--  4. Remove as políticas de leitura do professor em aulas e materia: são redundantes, porque a
--     política de leitura pública (using true) já libera tudo (aviso multiple_permissive_policies).
-- Idempotente. Executar no Supabase → SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────────────

-- 1. atividade nova sem nome_atividade
alter table public.atividade alter column nome_atividade drop not null;

-- 3. índices das chaves estrangeiras
create index if not exists aluno_turma_codigo_idx on public.aluno (turma_codigo);
create index if not exists entrega_atividade_atividade_idx
  on public.entrega_atividade (atividade_id);

-- 4. políticas redundantes
drop policy if exists aulas_select_professor on public.aulas;
drop policy if exists materia_select_professor on public.materia;

-- 2. políticas sem reavaliação por linha
drop policy if exists aluno_select on public.aluno;
create policy aluno_select on public.aluno
  for select to authenticated
  using (id = (select auth.uid()) or (select public.eh_professor()));

drop policy if exists usuario_select on public.usuario;
create policy usuario_select on public.usuario
  for select to authenticated
  using (id = (select auth.uid()) or (select public.eh_professor()));

drop policy if exists gabarito_select on public.gabarito;
create policy gabarito_select on public.gabarito
  for select to authenticated
  using ((select public.eh_professor()));

drop policy if exists liberacao_select on public.liberacao_atividade;
create policy liberacao_select on public.liberacao_atividade
  for select to authenticated
  using (aluno_id = (select auth.uid()) or (select public.eh_professor()));

drop policy if exists resposta_select on public.resposta_atividade;
create policy resposta_select on public.resposta_atividade
  for select to authenticated
  using (aluno_id = (select auth.uid()) or (select public.eh_professor()));

drop policy if exists resposta_insert on public.resposta_atividade;
create policy resposta_insert on public.resposta_atividade
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  );

drop policy if exists resposta_update on public.resposta_atividade;
create policy resposta_update on public.resposta_atividade
  for update to authenticated
  using (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  )
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and public.item_valido(atividade_id, item)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
  );

drop policy if exists entrega_select on public.entrega_atividade;
create policy entrega_select on public.entrega_atividade
  for select to authenticated
  using (aluno_id = (select auth.uid()) or (select public.eh_professor()));

drop policy if exists entrega_insert on public.entrega_atividade;
create policy entrega_insert on public.entrega_atividade
  for insert to authenticated
  with check (
    aluno_id = (select auth.uid())
    and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and public.atividade_completa(atividade_id, tentativa)
  );
