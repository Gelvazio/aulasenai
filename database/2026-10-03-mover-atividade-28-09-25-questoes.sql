-- Atividade "O Ciclo do Feedback na Comunicação" (Introdução à TIC, 28/09/2026): a página saiu
-- da subpasta ATIVIDADES-AULA-28-09-2026/ para ATIVIDADES/ e passou a se chamar 25-QUESTOES
-- (tem 25 questões). Só troca atividade.pagina: respostas, entregas, tentativas e gabarito
-- continuam ligados pelo atividade_id. Idempotente (não faz nada se já estiver trocado).

update public.atividade
   set pagina = '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-28-09-2026-25-QUESTOES.html'
 where pagina = '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-28-09-2026/ATIVIDADES-AULA-28-09-2026-50-QUESTOES.html'
   and not exists (
       select 1 from public.atividade
        where pagina = '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-28-09-2026-25-QUESTOES.html');
