-- ─────────────────────────────────────────────────────────────────────────────────────
-- Local e unidade curricular na turma (2026-09-30)
-- As abas de turma do relatório do professor (página da atividade) mostram, como em
-- scripts/criarUsuariosBancoDados.html: LOCAL + TURNO, unidade curricular e turma (quantidade).
-- Antes só existiam codigo, nome, turno e horario. Idempotente; não apaga dados.
-- A página de criar usuários passa a gravar local e uc junto com a turma.
-- ─────────────────────────────────────────────────────────────────────────────────────
alter table public.turma add column if not exists local text;
alter table public.turma add column if not exists uc text;

update public.turma set local = 'AI SALETE',
  uc = 'Análise de Dados Aplicada à Gestão' where codigo = '133933';
update public.turma set local = 'CEPLAS',
  uc = 'Fundamentos da Tecnologia e Programação' where codigo = 'QA LBTSN 2026/1 M2';
update public.turma set local = 'AI CEPLAS',
  uc = 'Introdução a Tecnologia da Informação e Comunicação' where codigo in ('135080', '135081');
