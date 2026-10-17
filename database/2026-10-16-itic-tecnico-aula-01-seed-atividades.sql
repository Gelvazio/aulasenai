-- Seed da Aula 01 de Introdução à TIC (Técnico em Informática para Internet), tarefa #226.1.
-- Só a aula (tabela aulas); a objetiva (#226.2) e a prática (#226.3) têm seed próprio.
-- Idempotente. A matéria é OUTRA linha de `materia`, separada da Introdução à TIC do curso
-- Assistente de Operações Logísticas (descrição em maiúsculas, como as do Técnico).
do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
begin
  select id into v_curso from public.curso
    where nome_completo = 'Técnico em Informática para Internet' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Técnico em Informática para Internet')
      returning id into v_curso;
  end if;

  select id into v_materia from public.materia
    where descricao = 'INTRODUÇÃO À TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id)
      values ('INTRODUÇÃO À TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Elementos da Comunicação e Níveis de Fala
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 1 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (1, 'Elementos da Comunicação e Níveis de Fala', v_materia, v_curso, 240, 1)
      returning id into v_aula;
  end if;
end $$;
