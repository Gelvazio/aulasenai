-- Tarefa #166 (Etapa 293, pedido do usuário em 2026-10-14): a nota sugerida pela IA (nota_ia) nunca
-- chega ao aluno. Antes, o aluno lia a própria linha de correcao_discursiva (com nota do professor)
-- e a nota_ia vinha junto. Agora: (1) a view correcao_discursiva_aluno traz só o que o aluno pode
-- ver; (2) a tabela passa a ser lida só pelo professor. Idempotente; não mexe em dados.
-- Plano B: recriar a política antiga
--   create policy "correcao_discursiva_select" on public.correcao_discursiva for select
--   to authenticated using (((aluno_id = (select auth.uid())) and (nota_professor is not null))
--   or ((select eh_professor()) and professor_pode_ver_aluno(aluno_id)));

-- 1) View do aluno: roda com o dono (sem RLS da tabela) e filtra pelo usuário logado.
create or replace view public.correcao_discursiva_aluno as
select c.aluno_id, c.atividade_id, c.tentativa, c.item, c.topico,
       c.nota_professor, c.comentario, c.justificativa_mudanca
from public.correcao_discursiva c
where c.aluno_id = (select auth.uid())
  and c.nota_professor is not null;

revoke all on public.correcao_discursiva_aluno from public, anon, authenticated;
grant select on public.correcao_discursiva_aluno to authenticated;

-- 2) A tabela (com a nota_ia) passa a ser lida só pelo professor das turmas dele.
drop policy if exists "correcao_discursiva_select" on public.correcao_discursiva;
create policy "correcao_discursiva_select"
  on public.correcao_discursiva for select to authenticated
  using ((select eh_professor()) and professor_pode_ver_aluno(aluno_id));
