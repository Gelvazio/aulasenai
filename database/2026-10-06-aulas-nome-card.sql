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

-- Rótulo pequeno do topo do card ("AULA 01"), também editável no modal (null = rótulo do HTML).
alter table public.aulas add column if not exists rotulo_card text;

alter table public.aulas drop constraint if exists aulas_rotulo_card_tamanho;
alter table public.aulas add constraint aulas_rotulo_card_tamanho
    check (rotulo_card is null or char_length(btrim(rotulo_card)) between 1 and 60);

comment on column public.aulas.rotulo_card is
    'Rótulo do topo do card da aula no índice de atividades, ex.: AULA 01 (null = rótulo do HTML).';
