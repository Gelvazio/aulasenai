-- Tarefa #259.4 (2026-10-17): remove a coluna aulas.rotulo_card (o card usa só "AULA NN" de
-- aulas.numero, #258/#259). Pedido do usuário: "faça a remoção do rotulo_card de tudo".
-- Nenhuma função nem view do banco usa a coluna (consulta de 2026-10-17). Os 77 valores estão
-- em database/2026-10-17-aulas-rotulo-card-copia.sql. Idempotente.

alter table public.aulas drop column if exists rotulo_card;
