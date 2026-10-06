-- 2026-10-06 — Nome do card da aula editável no modal "✏️ Editar aula" dos índices de atividades.
-- Coluna opcional: vazia (null) = o card mostra o título escrito no HTML do índice;
-- preenchida = o card mostra este nome. Grava pelo mesmo update de aulas (só professor, RLS).
-- Idempotente e sem apagar dados.

alter table public.aulas add column if not exists nome_card text;

alter table public.aulas drop constraint if exists aulas_nome_card_tamanho;
alter table public.aulas add constraint aulas_nome_card_tamanho
    check (nome_card is null or char_length(btrim(nome_card)) between 1 and 200);

comment on column public.aulas.nome_card is
    'Nome exibido no card da aula no índice de atividades (null = título do HTML).';
