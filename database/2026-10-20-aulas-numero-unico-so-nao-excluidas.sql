-- #308.2 (2026-10-20): o número da aula só não pode repetir entre as aulas NÃO excluídas da
-- matéria. Antes, a regra UNIQUE (materia_id, numero) valia também para as aulas com
-- excluido = 1, que a tela não mostra, e o "➕ Nova aula" falhava sem motivo visível.
-- Idempotente: pode rodar de novo sem erro.

ALTER TABLE public.aulas DROP CONSTRAINT IF EXISTS aulas_materia_id_numero_key;

CREATE UNIQUE INDEX IF NOT EXISTS aulas_materia_id_numero_ativas_key
    ON public.aulas (materia_id, numero)
    WHERE excluido = 0;
