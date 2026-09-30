-- Alternativa E nas atividades (2026-09-30). Executar no Supabase → SQL Editor. Nada é apagado.
-- As atividades de Análise de Dados Aplicada à Gestão têm 5 alternativas (A a E); antes o banco
-- aceitava só A a D em gabarito.letra e resposta_atividade.letra.
alter table public.gabarito drop constraint if exists gabarito_letra_check;
alter table public.gabarito add constraint gabarito_letra_check
  check (letra = any (array['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar, 'E'::bpchar]));

alter table public.resposta_atividade drop constraint if exists resposta_atividade_letra_check;
alter table public.resposta_atividade add constraint resposta_atividade_letra_check
  check (letra = any (array['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar, 'E'::bpchar]));
