-- ============================================================================
-- Volta a atividade 152 para "em andamento" para a aluna
-- Amanda Zarqueta de Oliveira — tarefa #291 · etapa 420-d8c364a6
--
-- O QUE FAZ: apaga SÓ as ENTREGAS (public.entrega_atividade) dessa aluna na
-- atividade 152. As respostas que ela marcou (public.resposta_atividade)
-- continuam, então a atividade volta a aparecer como "em andamento".
--
-- O QUE NÃO FAZ: não mexe em schema, RLS, trigger, liberacao_atividade,
-- respostas, notas nem correção discursiva.
--
-- COMO RODAR (SQL Editor do Supabase, banco de produção):
--   1) Rode o SELECT 1 e confira que é a aluna certa (nome/e-mail/turma).
--   2) Rode o SELECT 2 e confira as entregas que serão apagadas.
--   3) Rode o DELETE.
--   4) Rode o SELECT 3: deve retornar 0.
--
-- Se o SELECT 1 trouxer mais de uma aluna, use o e-mail exato no lugar do
-- nome no DELETE (e repita o filtro nos SELECTs).
-- O DELETE é idempotente: rodar de novo não apaga mais nada.
-- ============================================================================

-- 1) Confere a aluna.
select a.id, a.nome, a.email, a.turma_codigo
from public.aluno a
where a.nome ilike '%Amanda Zarqueta de Oliveira%'
order by a.nome;

-- 2) Confere as entregas que serão apagadas (o esperado: só a atividade 152).
select e.aluno_id, a.nome, a.email, e.atividade_id, e.tentativa,
       e.entregue_em, e.entregue_por
from public.entrega_atividade e
join public.aluno a on a.id = e.aluno_id
where a.nome ilike '%Amanda Zarqueta de Oliveira%'
  and e.atividade_id = 152
order by e.tentativa;

-- 3) Apaga a entrega da aluna na atividade 152 (volta para "em andamento").
--    As respostas continuam; para apagá-las também, existe o bloco comentado
--    no fim deste arquivo.
delete from public.entrega_atividade e
using public.aluno a
where a.id = e.aluno_id
  and a.nome ilike '%Amanda Zarqueta de Oliveira%'
  and e.atividade_id = 152;

-- 4) Confere: deve retornar 0.
select count(*) as entregas_restantes
from public.entrega_atividade e
join public.aluno a on a.id = e.aluno_id
where a.nome ilike '%Amanda Zarqueta de Oliveira%'
  and e.atividade_id = 152;

-- ----------------------------------------------------------------------------
-- OPCIONAL (só se o usuário pedir): apagar TAMBÉM as respostas da aluna na
-- atividade 152, deixando a atividade como se ela nunca tivesse começado.
-- Tire o comentário das 4 linhas abaixo para rodar.
-- ----------------------------------------------------------------------------
-- delete from public.resposta_atividade r
-- using public.aluno a
-- where a.id = r.aluno_id
--   and a.nome ilike '%Amanda Zarqueta de Oliveira%'
--   and r.atividade_id = 152;
