-- Tarefa #263 (2026-10-17, pedido do usuário): o card "AVALIAÇÃO 02" do índice da ITIC estava
-- sem aula própria e usava a aula 27 (AULA 07) pela atividade 20 (AVALIACAO-OBJETIVA-02.html).
-- Decisão do usuário: devolver a atividade 20 para a aula 30 (AULA 10), onde estava antes.
-- Aplicado pelo Claude Code local em 2026-10-17 18:27. Idempotente.
update public.atividade set aula_id = 30 where id = 20 and aula_id = 27;

-- Volta (se precisar desfazer):
-- update public.atividade set aula_id = 27 where id = 20 and aula_id = 30;
