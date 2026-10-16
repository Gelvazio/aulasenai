-- ════════════════════════════════════════════════════════════════════════════════════════════
-- Excluir as atividades "Trabalho em Equipe — Manual de Comunicação Técnica" (v1 e v2) do ITIC
-- (2026-10-16, tarefa #212.2; pedido do usuário). Etapa:
-- tasks/etapas/ETAPA-339-12542c62-EXCLUIR-TRABALHO-EQUIPE-MANUAL-V2.md
--
-- • atividade 58 = .../ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA.html (aula 70)
-- • atividade 59 = .../ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html (aula 71)
-- Conferido em 2026-10-16 19:50: nenhuma resposta, entrega, gabarito, tópico, liberação ou
-- abertura ligada a elas (a cascata não apaga dado de aluno).
--
-- PARTE 1 — já aplicada pelo conector (não apaga dados): aulas 70 e 71 marcadas como excluídas,
-- o mesmo que a função excluir_aula faz.
-- PARTE 2 — DELETE das 2 linhas: aplicada pelo conector em 2026-10-16, a pedido do usuário
-- ("FINALIZE A TAREFA 212"); a cascata não levou nada (sem dados de aluno).
-- ════════════════════════════════════════════════════════════════════════════════════════════

-- PARTE 1
update public.aulas set excluido = 1, updated_at = now() where id in (70, 71) and excluido = 0;

-- PARTE 2
delete from public.atividade
 where id in (58, 59)
   and pagina like '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA%';

-- Conferência: deve voltar 0 linhas.
select id, pagina from public.atividade where id in (58, 59);
