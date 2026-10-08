-- Aluno: a página da avaliação discursiva precisa saber, sem pedir o gabarito, se ele já foi
-- liberado para a turma do aluno logado (para carregar a prova entregue com a nota e as
-- observações da IA). A função só responde true/false sobre o próprio usuário (auth.uid()).
-- Idempotente; não mexe em dados. Regra: docs/regras/atividades.md (2026-10-08).

grant execute on function public.aluno_pode_ver_gabarito(bigint) to authenticated;
revoke execute on function public.aluno_pode_ver_gabarito(bigint) from anon;
