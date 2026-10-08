-- Seed só da Aula 06 de Reforço de Linguagens (objetivas).
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

  -- Aula 6: Pontuação e Concordância na Escrita
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Pontuação e Concordância na Escrita' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (6, 'Pontuação e Concordância na Escrita', v_materia, v_curso, '2026-11-06')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Pontuação e Concordância na Escrita', 'PENDENTE', v_aula, '2026-11-06',
      'Atividade — Pontuação e Concordância na Escrita (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-06-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Regra de ouro da vírgula', 'B'),
      (v_atividade, 2, 'Sujeito longo', 'A'),
      (v_atividade, 3, 'Vocativo', 'C'),
      (v_atividade, 4, 'Aposto', 'D'),
      (v_atividade, 5, 'Adjunto adverbial longo', 'A'),
      (v_atividade, 6, 'Vírgula antes de "mas"', 'C'),
      (v_atividade, 7, 'Dois-pontos', 'B'),
      (v_atividade, 8, 'Reticências', 'D'),
      (v_atividade, 9, 'Núcleo do sujeito', 'D'),
      (v_atividade, 10, 'Sujeito composto anteposto', 'B'),
      (v_atividade, 11, 'Verbo "haver"', 'A'),
      (v_atividade, 12, 'Verbo "fazer" (tempo)', 'C'),
      (v_atividade, 13, 'Locução com "haver"', 'C'),
      (v_atividade, 14, 'Pronome relativo "que"', 'D'),
      (v_atividade, 15, '"Meio" como advérbio', 'B'),
      (v_atividade, 16, '"Bastante" como pronome', 'A'),
      (v_atividade, 17, '"É proibido"', 'D'),
      (v_atividade, 18, 'Adjetivo e vários substantivos', 'A'),
      (v_atividade, 19, 'Desvios frequentes', 'B'),
      (v_atividade, 20, 'Ordem da autorrevisão', 'C');
end $$;
