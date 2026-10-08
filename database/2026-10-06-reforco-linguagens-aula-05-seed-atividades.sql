-- Seed só da Aula 05 de Reforço de Linguagens (objetivas).
do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
  select id into v_curso from public.curso where nome_completo = 'Rio do Sul Mais Tech' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Rio do Sul Mais Tech') returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = 'Reforço de Linguagens' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('Reforço de Linguagens', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 5: Tipologias Textuais na Prática
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Tipologias Textuais na Prática' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (5, 'Tipologias Textuais na Prática', v_materia, v_curso, '2026-10-30')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Tipologias Textuais na Prática', 'PENDENTE', v_aula, '2026-10-30',
      'Atividade — Tipologias Textuais na Prática (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-05-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Tipologia × gênero', 'A'),
      (v_atividade, 2, 'Elementos da narração', 'C'),
      (v_atividade, 3, 'Motor da narrativa', 'B'),
      (v_atividade, 4, 'Arco do enredo', 'D'),
      (v_atividade, 5, 'Clímax', 'D'),
      (v_atividade, 6, 'Narrador em 1ª pessoa', 'B'),
      (v_atividade, 7, 'Narrador onisciente', 'C'),
      (v_atividade, 8, 'Marcas da descrição', 'A'),
      (v_atividade, 9, 'Descrição objetiva', 'C'),
      (v_atividade, 10, 'Verdadeiro ou falso', 'D'),
      (v_atividade, 11, 'Ordem espacial', 'A'),
      (v_atividade, 12, 'Texto argumentativo', 'B'),
      (v_atividade, 13, 'Parágrafo argumentativo', 'B'),
      (v_atividade, 14, 'Concessão e refutação', 'C'),
      (v_atividade, 15, 'Estratégia válida', 'D'),
      (v_atividade, 16, 'Texto misto', 'A'),
      (v_atividade, 17, 'Registro adequado', 'C'),
      (v_atividade, 18, 'Identificando a tipologia', 'D'),
      (v_atividade, 19, 'Tese', 'B'),
      (v_atividade, 20, 'Trabalho em grupo na escrita', 'A');
end $$;
