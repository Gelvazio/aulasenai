-- Prova Prática ADAG (id 82): a página foi renomeada de PROVA-PRATICA-06-10-2026.html para
-- PROVA-PRATICA-01.html (pedido do usuário, 2026-10-08). Atualiza o caminho cadastrado para os
-- cards, o índice, a média final e a própria página acharem a atividade.
-- Respostas, entregas, correções, mínimos e liberações usam atividade_id = 82 e não mudam.
-- Valor anterior (para voltar, se preciso):
--   /MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA-06-10-2026.html
-- Idempotente.

update public.atividade
   set pagina = '/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA-01.html'
 where id = 82
   and pagina = '/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/PROVA-PRATICA-06-10-2026.html';
