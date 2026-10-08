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

-- Nome e descrição também (pedido do usuário, 2026-10-08). Valores anteriores:
--   nome_atividade = 'Prova Prática 06-10-2026'
--   descricao      = 'Atividade — Prova Prática 06-10-2026 (20 questões discursivas)'
update public.atividade set nome_atividade = 'Prova Prática 01'
 where id = 82 and nome_atividade = 'Prova Prática 06-10-2026';
update public.atividade set descricao = 'Atividade — Prova Prática 01 (20 questões discursivas)'
 where id = 82 and descricao = 'Atividade — Prova Prática 06-10-2026 (20 questões discursivas)';
