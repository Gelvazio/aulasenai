-- ============================================================================
-- ANO-SEMESTRE-CURSO.1 — Ano e semestre no curso
-- Etapa: tasks/etapas/ETAPA-493-d4b8e2f6-ANO-E-SEMESTRE-NO-CURSO.md
--
-- Colunas opcionais curso.ano (AAAA) e curso.semestre (1 ou 2), usadas na lista "Curso" do
-- modal Equipes (assets/js/equipes-modal.js) e no cadastro de curso (cursos.html).
-- Preenchimento inicial: período AAAA/S mais frequente no nome das turmas do curso
-- (ex.: "AI OPIR 2026/1 V1"); curso sem turma com período fica em branco.
-- Idempotente; não apaga nada e não sobrescreve valor já preenchido.
-- ============================================================================

-- 1. Colunas -----------------------------------------------------------------
alter table public.curso add column if not exists ano smallint;
alter table public.curso add column if not exists semestre smallint;

alter table public.curso drop constraint if exists curso_semestre_valido;
alter table public.curso add constraint curso_semestre_valido
  check (semestre is null or semestre in (1, 2));

alter table public.curso drop constraint if exists curso_ano_valido;
alter table public.curso add constraint curso_ano_valido
  check (ano is null or ano between 2000 and 2100);

comment on column public.curso.ano is 'Ano de oferta do curso (AAAA); opcional.';
comment on column public.curso.semestre is 'Semestre de oferta do curso (1 ou 2); opcional.';

-- 2. Preenchimento inicial pelas turmas ---------------------------------------
update public.curso c
set ano = p.ano, semestre = p.semestre
from (
  select distinct on (curso_id) curso_id, ano, semestre
  from (
    select t.curso_id, (m.periodo)[1]::smallint as ano, (m.periodo)[2]::smallint as semestre,
           count(*) as turmas
    from public.turma t
    cross join lateral (select regexp_match(t.nome, '(20[0-9]{2})/([12])') as periodo) m
    where t.curso_id is not null and m.periodo is not null
    group by 1, 2, 3
  ) contagem
  order by curso_id, turmas desc, ano desc, semestre desc
) p
where c.id = p.curso_id and c.ano is null and c.semestre is null;
