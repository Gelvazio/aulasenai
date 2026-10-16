-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Remover a tabela aula_turma (2026-10-16, tarefa #193)
-- Etapa: tasks/etapas/ETAPA-320-c3289a94-REMOVER-TABELA-AULA-TURMA.md
--
-- A pedido do usuário, o sistema volta ao estado de antes da aula_turma. Desfaz:
--   • database/2026-10-16-aula-turma.sql                (#185 — tabela, RLS e datas iniciais)
--   • database/2026-10-16-aula-turma-bloqueio.sql       (#186 — coluna bloqueio, gatilho e função)
--   • database/2026-10-16-aula-turma-calendario-itic.sql (#187 — datas do calendário)
-- ⚠️ APAGA as datas das aulas por turma (38 linhas em 2026-10-16 10:05; nenhuma aula bloqueada).
-- A "Data da aula" volta a ser aulas.data_planejada.
-- NÃO muda o bloqueio de atividade por turma (atividade.bloqueio, definir_bloqueio_turma,
-- atividade_liberada_para_usuario — database/2026-10-05-bloqueio-atividade-por-turma.sql).
--
-- Rodar no SQL Editor do Supabase (o conector do Claude Code bloqueia DROP TABLE). Sem CASCADE:
-- em 2026-10-16 nada dependia da tabela (sem view, chave estrangeira ou função que a leia); se
-- algo novo depender, o comando para com erro em vez de apagar outra coisa. Idempotente.
-- ════════════════════════════════════════════════════════════════════════════════════════════

-- Apagar a tabela leva junto o gatilho aula_turma_bloqueio_propaga_atividades_trg, as políticas
-- de RLS, o índice e a restrição de unicidade.
drop table if exists public.aula_turma;

drop function if exists public.aula_turma_bloqueio_propaga_atividades();

-- Conferência: as duas colunas devem voltar vazias (null).
select to_regclass('public.aula_turma') as tabela_aula_turma,
       to_regprocedure('public.aula_turma_bloqueio_propaga_atividades()') as funcao_do_gatilho;
