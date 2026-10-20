-- #307.2 (2026-10-20): clona as respostas do respondente (líder) da equipe para os demais
-- membros, nas equipes ligadas à atividade (equipe_atividade, #307.1).
-- Respondente: equipe_atividade.respondente_id; se vazio, o membro com lider = true que tenha
-- respostas; senão quem entregou; senão quem tem mais respostas. Fica gravado na ligação.
-- Copia resposta_discursiva (prática), resposta_atividade (objetiva) e a entrega_atividade
-- (se o respondente entregou), na mesma tentativa do respondente. Nunca sobrescreve: só recebe o
-- clone o membro sem nenhuma resposta e sem entrega nessa atividade. A nota sai das respostas.
-- Só o professor da turma da equipe (professor_tem_turma). anon sem execução. Idempotente.

CREATE OR REPLACE FUNCTION public.escolher_respondente_equipe(p_equipe BIGINT, p_atividade BIGINT)
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT m.aluno_id
    FROM public.equipe_membro m
    LEFT JOIN LATERAL (
        SELECT count(*) AS total FROM public.resposta_discursiva r
        WHERE r.aluno_id = m.aluno_id AND r.atividade_id = p_atividade
    ) d ON TRUE
    LEFT JOIN LATERAL (
        SELECT count(*) AS total FROM public.resposta_atividade r
        WHERE r.aluno_id = m.aluno_id AND r.atividade_id = p_atividade
    ) o ON TRUE
    WHERE m.equipe_id = p_equipe AND (d.total + o.total) > 0
    ORDER BY m.lider DESC,
        EXISTS (SELECT 1 FROM public.entrega_atividade e
                WHERE e.aluno_id = m.aluno_id AND e.atividade_id = p_atividade) DESC,
        (d.total + o.total) DESC
    LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.clonar_respostas_equipe(p_atividade BIGINT)
RETURNS TABLE (equipe_id BIGINT, respondente_id UUID, alunos_clonados INT)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
    v_ligacao RECORD;
    v_respondente UUID;
    v_destino RECORD;
    v_clonados INT;
BEGIN
    FOR v_ligacao IN
        SELECT ea.id, ea.equipe_id, ea.respondente_id, eq.turma_codigo
        FROM public.equipe_atividade ea
        JOIN public.equipe eq ON eq.id = ea.equipe_id
        WHERE ea.atividade_id = p_atividade
        ORDER BY ea.equipe_id
    LOOP
        IF NOT public.professor_tem_turma(v_ligacao.turma_codigo) THEN
            RAISE EXCEPTION 'Sem permissão para a turma %', v_ligacao.turma_codigo
                USING ERRCODE = '42501';
        END IF;

        v_respondente := coalesce(v_ligacao.respondente_id,
            public.escolher_respondente_equipe(v_ligacao.equipe_id, p_atividade));
        v_clonados := 0;
        IF v_respondente IS NULL THEN
            equipe_id := v_ligacao.equipe_id; respondente_id := NULL; alunos_clonados := 0;
            RETURN NEXT;
            CONTINUE;
        END IF;

        UPDATE public.equipe_atividade SET respondente_id = v_respondente
        WHERE id = v_ligacao.id AND equipe_atividade.respondente_id IS NULL;

        FOR v_destino IN
            SELECT m.aluno_id FROM public.equipe_membro m
            WHERE m.equipe_id = v_ligacao.equipe_id AND m.aluno_id <> v_respondente
              AND NOT EXISTS (SELECT 1 FROM public.resposta_discursiva r
                              WHERE r.aluno_id = m.aluno_id AND r.atividade_id = p_atividade)
              AND NOT EXISTS (SELECT 1 FROM public.resposta_atividade r
                              WHERE r.aluno_id = m.aluno_id AND r.atividade_id = p_atividade)
              AND NOT EXISTS (SELECT 1 FROM public.entrega_atividade e
                              WHERE e.aluno_id = m.aluno_id AND e.atividade_id = p_atividade)
        LOOP
            INSERT INTO public.resposta_discursiva
                (aluno_id, atividade_id, tentativa, item, topico, texto, atualizado_em)
            SELECT v_destino.aluno_id, r.atividade_id, r.tentativa, r.item, r.topico, r.texto, now()
            FROM public.resposta_discursiva r
            WHERE r.aluno_id = v_respondente AND r.atividade_id = p_atividade
            ON CONFLICT DO NOTHING;

            INSERT INTO public.resposta_atividade
                (aluno_id, atividade_id, tentativa, item, letra, herdada)
            SELECT v_destino.aluno_id, r.atividade_id, r.tentativa, r.item, r.letra, r.herdada
            FROM public.resposta_atividade r
            WHERE r.aluno_id = v_respondente AND r.atividade_id = p_atividade
            ON CONFLICT DO NOTHING;

            INSERT INTO public.entrega_atividade
                (aluno_id, atividade_id, entregue_em, tentativa, entregue_por)
            SELECT v_destino.aluno_id, e.atividade_id, e.entregue_em, e.tentativa, auth.uid()
            FROM public.entrega_atividade e
            WHERE e.aluno_id = v_respondente AND e.atividade_id = p_atividade
            ON CONFLICT DO NOTHING;

            v_clonados := v_clonados + 1;
        END LOOP;

        equipe_id := v_ligacao.equipe_id;
        respondente_id := v_respondente;
        alunos_clonados := v_clonados;
        RETURN NEXT;
    END LOOP;
END;
$$;

REVOKE ALL ON FUNCTION public.escolher_respondente_equipe(BIGINT, BIGINT) FROM PUBLIC, anon,
    authenticated;
REVOKE ALL ON FUNCTION public.clonar_respostas_equipe(BIGINT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.clonar_respostas_equipe(BIGINT) TO authenticated;
