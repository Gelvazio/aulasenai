-- Apagar as suspeitas de cópia abaixo de 90% de semelhança (pedido do usuário, 2026-10-14,
-- tarefa #132). Desde a #131 só conta como suspeita 90% ou mais; as linhas abaixo disso foram
-- gravadas na 1ª rodada da IA (atividade 81) e estão todas pendentes (nenhuma validada).
-- Só apaga linhas ainda PENDENTES: o que o professor já validou fica.
-- Executar no SQL Editor do Supabase (projeto AULAS SENAI).

-- 1. Conferir antes (esperado em 2026-10-14: 34 linhas, todas da atividade 81)
select atividade_id, count(*) as linhas
from public.suspeita_copia_discursiva
where semelhanca < 0.9 and situacao = 'pendente'
group by atividade_id;

-- 2. Apagar
delete from public.suspeita_copia_discursiva
where semelhanca < 0.9 and situacao = 'pendente';

-- 3. Conferir depois (esperado: 0)
select count(*) as abaixo_de_90
from public.suspeita_copia_discursiva
where semelhanca < 0.9;
