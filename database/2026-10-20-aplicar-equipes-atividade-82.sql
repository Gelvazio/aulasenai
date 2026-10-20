-- #307.6 (2026-10-20): aplica a equipe × atividade na Prova Prática 01 (atividade 82), turma
-- 133933, matéria 27. Rodar INTEIRO no SQL Editor do Supabase (uma transação).
-- 1) liga as 15 equipes da turma à 82; 2) marca como líder o respondente de cada equipe sem
-- líder; 3) roda o clone como o professor da turma (a função exige professor_tem_turma, e no
-- SQL Editor auth.uid() é nulo — por isso o set_config com o id do professor);
-- a conferência é feita depois por consulta de leitura. Idempotente: rodar de novo não duplica nada.

BEGIN;

SELECT set_config('request.jwt.claims',
    '{"sub":"5071e93e-712d-4d50-84a5-09fb77b5c251","role":"authenticated"}', true);

INSERT INTO public.equipe_atividade (equipe_id, atividade_id, criado_por)
SELECT e.id, 82, '5071e93e-712d-4d50-84a5-09fb77b5c251'::uuid
FROM public.equipe e
WHERE e.turma_codigo = '133933' AND e.materia_id = 27
ON CONFLICT (equipe_id, atividade_id) DO NOTHING;

UPDATE public.equipe_membro m SET lider = true
WHERE m.equipe_id IN (SELECT id FROM public.equipe
                      WHERE turma_codigo = '133933' AND materia_id = 27)
  AND m.aluno_id = public.escolher_respondente_equipe(m.equipe_id, 82)
  AND NOT EXISTS (SELECT 1 FROM public.equipe_membro o
                  WHERE o.equipe_id = m.equipe_id AND o.lider);

SELECT * FROM public.clonar_respostas_equipe(82);

COMMIT;
