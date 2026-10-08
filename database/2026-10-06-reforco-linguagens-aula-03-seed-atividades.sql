-- Seed só da Aula 03 de Reforço de Linguagens (objetivas).
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

  -- Aula 3: Intenção Comunicativa e Análise Crítica
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Intenção Comunicativa e Análise Crítica' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (3, 'Intenção Comunicativa e Análise Crítica', v_materia, v_curso, '2026-10-16')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Intenção Comunicativa e Análise Crítica', 'PENDENTE', v_aula, '2026-10-16',
      'Atividade — Intenção Comunicativa e Análise Crítica (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-03-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Intenção comunicativa', 'C'),
      (v_atividade, 2, 'Informar e instruir', 'A'),
      (v_atividade, 3, 'Convencer e criticar', 'D'),
      (v_atividade, 4, 'Fato', 'B'),
      (v_atividade, 5, 'Fato e opinião misturados', 'B'),
      (v_atividade, 6, 'Suposição', 'D'),
      (v_atividade, 7, 'Tom neutro', 'A'),
      (v_atividade, 8, 'Tom alarmista', 'C'),
      (v_atividade, 9, 'Tom irônico', 'D'),
      (v_atividade, 10, 'Tom saudosista', 'A'),
      (v_atividade, 11, 'Efeito do verbo', 'C'),
      (v_atividade, 12, 'Escolha vocabular', 'B'),
      (v_atividade, 13, 'Checagem da fonte', 'A'),
      (v_atividade, 14, 'Viés', 'D'),
      (v_atividade, 15, 'Credibilidade do veículo', 'B'),
      (v_atividade, 16, 'Falso dilema', 'C'),
      (v_atividade, 17, 'Indícios de desinformação', 'D'),
      (v_atividade, 18, 'Viés de confirmação', 'C'),
      (v_atividade, 19, 'Artigo × editorial', 'A'),
      (v_atividade, 20, 'Mesmo fato, olhares diferentes', 'B');
end $$;
