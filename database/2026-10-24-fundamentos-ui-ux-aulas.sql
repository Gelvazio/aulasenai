-- Seed das aulas de Fundamentos de UI/UX (Técnico em Informática para Internet).
-- Cadastra a matéria e as 19 aulas no banco.
-- Idempotente.
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
    where descricao = 'Fundamentos de UI / UX' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id)
      values ('Fundamentos de UI / UX', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Princípios de design: definição e evolução histórica
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 1 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (1, 'Princípios de design: definição e evolução histórica', v_materia, v_curso, 240, 1)
      returning id into v_aula;
  end if;

  -- Aula 2: Formas geométricas e regras de visualização dos elementos da interface
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 2 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (2, 'Formas geométricas e regras de visualização dos elementos da interface', v_materia, v_curso, 240, 2)
      returning id into v_aula;
  end if;

  -- Aula 3: Teoria das cores na interface
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 3 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (3, 'Teoria das cores na interface', v_materia, v_curso, 240, 3)
      returning id into v_aula;
  end if;

  -- Aula 4: Resolução de problemas: análise crítica
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 4 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (4, 'Resolução de problemas: análise crítica', v_materia, v_curso, 240, 4)
      returning id into v_aula;
  end if;

  -- Aula 5: Resolução de problemas: análise de cenários
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 5 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (5, 'Resolução de problemas: análise de cenários', v_materia, v_curso, 240, 5)
      returning id into v_aula;
  end if;

  -- Aula 6: User Interface: definição e tipos de interface
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 6 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (6, 'User Interface: definição e tipos de interface', v_materia, v_curso, 240, 6)
      returning id into v_aula;
  end if;

  -- Aula 7: Layout: padrões de leitura F e Z e alinhamento
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 7 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (7, 'Layout: padrões de leitura F e Z e alinhamento', v_materia, v_curso, 240, 7)
      returning id into v_aula;
  end if;

  -- Aula 8: Layout: tamanho, espaçamento, texturas, fontes e repetição
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 8 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (8, 'Layout: tamanho, espaçamento, texturas, fontes e repetição', v_materia, v_curso, 240, 8)
      returning id into v_aula;
  end if;

  -- Aula 9: Eventos e navegação na interface
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 9 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (9, 'Eventos e navegação na interface', v_materia, v_curso, 240, 9)
      returning id into v_aula;
  end if;

  -- Aula 10: User Experience: definição e design centrado no usuário
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 10 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (10, 'User Experience: definição e design centrado no usuário', v_materia, v_curso, 240, 10)
      returning id into v_aula;
  end if;

  -- Aula 11: User Experience: jornada do usuário e usabilidade
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 11 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (11, 'User Experience: jornada do usuário e usabilidade', v_materia, v_curso, 240, 11)
      returning id into v_aula;
  end if;

  -- Aula 12: Estratégias de coleta de informações
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 12 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (12, 'Estratégias de coleta de informações', v_materia, v_curso, 240, 12)
      returning id into v_aula;
  end if;

  -- Aula 13: Prototipagem
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 13 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (13, 'Prototipagem', v_materia, v_curso, 240, 13)
      returning id into v_aula;
  end if;

  -- Aula 14: Direito autoral
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 14 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (14, 'Direito autoral', v_materia, v_curso, 240, 14)
      returning id into v_aula;
  end if;

  -- Aula 15: Princípios de design: formas geométricas
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 15 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (15, 'Princípios de design: formas geométricas', v_materia, v_curso, 240, 15)
      returning id into v_aula;
  end if;

  -- Aula 16: Princípios de design: regras de visualização
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 16 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (16, 'Princípios de design: regras de visualização', v_materia, v_curso, 240, 16)
      returning id into v_aula;
  end if;

  -- Aula 17: Princípios de design: teoria das cores
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 17 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (17, 'Princípios de design: teoria das cores', v_materia, v_curso, 240, 17)
      returning id into v_aula;
  end if;

  -- Aula 18: Princípios de design: processo de criação
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 18 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (18, 'Princípios de design: processo de criação', v_materia, v_curso, 240, 18)
      returning id into v_aula;
  end if;

  -- Aula 19: Projeto final de UI/UX
  select id into v_aula from public.aulas
    where materia_id = v_materia and numero = 19 limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, duracao_minutos, sequencia)
      values (19, 'Projeto final de UI/UX', v_materia, v_curso, 240, 19)
      returning id into v_aula;
  end if;
end $$;
