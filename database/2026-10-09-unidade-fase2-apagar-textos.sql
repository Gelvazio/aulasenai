-- 2026-10-09 — Fase 2 da unidade em um só lugar: apaga os textos antigos.
-- Plano: docs/tabela-unidade-curso-turma.md (Etapa 119 do STATUS.md, passo 10).
-- O código já lê a unidade só por turma.unidade_id / curso.unidade_id (tabela unidade).
-- Os valores antigos ficam guardados em turma_backup_20261009 e curso_backup_20261009.

alter table public.turma drop column if exists local;
alter table public.curso drop column if exists unidade;
