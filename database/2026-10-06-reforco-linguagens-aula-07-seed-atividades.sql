-- Seed só da Aula 07 de Reforço de Linguagens (objetivas).
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

  -- Aula 7: Classes de Palavras e Figuras de Linguagem
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Classes de Palavras e Figuras de Linguagem' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (7, 'Classes de Palavras e Figuras de Linguagem', v_materia, v_curso, '2026-11-13')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Classes de Palavras e Figuras de Linguagem', 'PENDENTE', v_aula, '2026-11-13',
      'Atividade — Classes de Palavras e Figuras de Linguagem (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-07-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Substantivo', 'C'),
      (v_atividade, 2, 'Classes invariáveis', 'D'),
      (v_atividade, 3, 'Pronome e coesão', 'B'),
      (v_atividade, 4, 'Conjunção e advérbio', 'A'),
      (v_atividade, 5, 'Advérbio', 'B'),
      (v_atividade, 6, 'Denotação', 'A'),
      (v_atividade, 7, 'Conotação', 'D'),
      (v_atividade, 8, 'Metáfora', 'C'),
      (v_atividade, 9, 'Comparação (símile)', 'A'),
      (v_atividade, 10, 'Metonímia', 'C'),
      (v_atividade, 11, 'Autor pela obra', 'D'),
      (v_atividade, 12, 'Hipérbole', 'B'),
      (v_atividade, 13, 'Ironia', 'D'),
      (v_atividade, 14, 'Personificação', 'B'),
      (v_atividade, 15, 'Antítese', 'C'),
      (v_atividade, 16, 'Paradoxo', 'A'),
      (v_atividade, 17, 'Sinestesia', 'C'),
      (v_atividade, 18, 'Onomatopeia', 'A'),
      (v_atividade, 19, 'Verdadeiro ou falso', 'B'),
      (v_atividade, 20, 'Figuras na publicidade', 'D');
end $$;
