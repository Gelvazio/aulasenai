-- Bloqueio da aula ligado em todas as matérias (tarefa #210.2): mantém fechados os cards que hoje
-- o aluno não abre porque TODAS as atividades da aula estão bloqueadas para a turma dele
-- (atividade.ativo = false ou turma em atividade.bloqueio). Com o bloqueio da aula ligado, só o
-- botão da aula fecha o card; então grava aula_turma.bloqueio = true nesses pares aula × turma.
-- Turmas consideradas: as do curso da aula (turma.curso_id = aulas.curso_id). Testes de Front-End
-- (matéria 48) fica de fora: já usava o bloqueio da aula.
-- O gatilho aula_turma_bloqueio_propaga_atividades não muda nada nas atividades (já bloqueadas
-- para a turma). Idempotente; não apaga dados (a data da aula de linhas existentes é mantida).

with pares as (
  select a.id as aula_id, tu.codigo as turma_codigo
    from public.aulas a
    join public.turma tu on tu.curso_id = a.curso_id
    join public.atividade t on t.aula_id = a.id
   where coalesce(a.excluido, 0) = 0
     and a.materia_id <> 48
   group by a.id, tu.codigo
  having count(t.id) > 0
     and count(t.id) = count(t.id) filter (
           where not t.ativo or coalesce(t.bloqueio, '[]'::jsonb) ? tu.codigo)
)
insert into public.aula_turma (aula_id, turma_codigo, bloqueio)
select aula_id, turma_codigo, true from pares
on conflict (aula_id, turma_codigo) do update
   set bloqueio = true, updated_at = now()
 where public.aula_turma.bloqueio is distinct from true;
