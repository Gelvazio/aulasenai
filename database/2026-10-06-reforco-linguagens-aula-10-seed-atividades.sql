-- Seed só da Aula 10 de Reforço de Linguagens (objetivas).
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

  -- Aula 10: Gêneros Literários, Textos Técnicos e Síntese
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Gêneros Literários, Textos Técnicos e Síntese' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (10, 'Gêneros Literários, Textos Técnicos e Síntese', v_materia, v_curso, '2026-12-04')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Gêneros Literários, Textos Técnicos e Síntese', 'PENDENTE', v_aula, '2026-12-04',
      'Atividade — Gêneros Literários, Textos Técnicos e Síntese (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-10-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Crônica', 'B'),
      (v_atividade, 2, 'Crônica reflexiva', 'C'),
      (v_atividade, 3, 'Marcas da crônica', 'A'),
      (v_atividade, 4, 'Elementos da poesia', 'D'),
      (v_atividade, 5, 'Soneto', 'A'),
      (v_atividade, 6, 'Soneto × crônica', 'B'),
      (v_atividade, 7, 'Verso livre', 'D'),
      (v_atividade, 8, 'Texto técnico', 'C'),
      (v_atividade, 9, 'Linguagem do relatório', 'D'),
      (v_atividade, 10, 'Artigo científico', 'A'),
      (v_atividade, 11, 'Pirâmide invertida', 'C'),
      (v_atividade, 12, 'Lead', 'B'),
      (v_atividade, 13, 'Técnicas de síntese', 'C'),
      (v_atividade, 14, 'Resumo × resenha', 'D'),
      (v_atividade, 15, 'Autorrevisão', 'A'),
      (v_atividade, 16, 'Verdadeiro ou falso', 'B'),
      (v_atividade, 17, 'Feedback na revisão', 'A'),
      (v_atividade, 18, 'Portfólio reflexivo', 'B'),
      (v_atividade, 19, 'Etapas do portfólio', 'C'),
      (v_atividade, 20, 'Composição do portfólio', 'D');
end $$;
