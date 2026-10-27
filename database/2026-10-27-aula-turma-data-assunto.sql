-- #403: data efetiva de passagem do assunto, por aula e por turma (aula_turma.data_assunto).
-- Separada da "Data da aula" (data_aula). Começa null (não informada) para todas as linhas.
-- Idempotente: não apaga nem altera dados; a coluna herda o RLS da tabela.

alter table public.aula_turma add column if not exists data_assunto date null;

comment on column public.aula_turma.data_assunto is
  'Data efetiva em que o assunto da aula foi passado na turma; null = não informada.';
