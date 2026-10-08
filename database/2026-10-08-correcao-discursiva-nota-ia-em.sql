-- Correção parcial pela IA: data e hora em que a IA deu a nota_ia de cada alternativa.
-- Serve para a IA corrigir antes da entrega e recorrigir só o que o aluno mudou depois
-- (resposta_discursiva.atualizado_em > correcao_discursiva.nota_ia_em).
-- Idempotente; não apaga nem altera dados. Orientação: MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/
-- ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/CORRECAO-PROVA-ADAG.md

alter table public.correcao_discursiva
  add column if not exists nota_ia_em timestamptz;

comment on column public.correcao_discursiva.nota_ia_em is
  'Data e hora em que a IA gravou a nota_ia (correção parcial e final); só a IA preenche.';
