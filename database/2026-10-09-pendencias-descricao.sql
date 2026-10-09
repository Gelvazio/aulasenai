-- Pendências: coluna descricao (tela MATERIAIS/AGENDA_COLABORADOR/pendencias.html).
-- Plano: docs/pendencias-coluna-descricao.md. Idempotente e sem apagar dados.
-- Opcional (linhas antigas ficam sem descrição); as políticas de RLS da tabela já cobrem a coluna.

alter table public.pendencias add column if not exists descricao text;

alter table public.pendencias drop constraint if exists pendencias_descricao_tamanho;
alter table public.pendencias add constraint pendencias_descricao_tamanho
  check (descricao is null or char_length(descricao) <= 2000);

comment on column public.pendencias.descricao is
  'Descrição da pendência (opcional, até 2000 caracteres).';
