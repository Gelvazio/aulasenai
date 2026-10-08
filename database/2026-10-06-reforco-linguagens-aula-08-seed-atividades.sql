-- Seed só da Aula 08 de Reforço de Linguagens (objetivas).
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

  -- Aula 8: Oralidade e Apresentação em Público
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Oralidade e Apresentação em Público' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (8, 'Oralidade e Apresentação em Público', v_materia, v_curso, '2026-11-20')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Oralidade e Apresentação em Público', 'PENDENTE', v_aula, '2026-11-20',
      'Atividade — Oralidade e Apresentação em Público (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-08-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Oratória', 'D'),
      (v_atividade, 2, 'Improviso', 'A'),
      (v_atividade, 3, 'Delimitação do tema', 'C'),
      (v_atividade, 4, 'Roteiro em três atos', 'B'),
      (v_atividade, 5, 'Ordem do planejamento', 'C'),
      (v_atividade, 6, 'Dicção', 'D'),
      (v_atividade, 7, 'Volume da voz', 'A'),
      (v_atividade, 8, 'Vícios de linguagem', 'B'),
      (v_atividade, 9, 'Função da pausa', 'A'),
      (v_atividade, 10, 'Postura', 'B'),
      (v_atividade, 11, 'Contato visual', 'D'),
      (v_atividade, 12, 'Gestos', 'C'),
      (v_atividade, 13, 'Mito ou verdade', 'B'),
      (v_atividade, 14, 'Storytelling', 'C'),
      (v_atividade, 15, 'Detalhes sensoriais', 'A'),
      (v_atividade, 16, 'Slides', 'D'),
      (v_atividade, 17, 'Nervosismo', 'A'),
      (v_atividade, 18, 'Escuta ativa', 'C'),
      (v_atividade, 19, 'Feedback construtivo', 'D'),
      (v_atividade, 20, 'Efeito holofote', 'B');
end $$;
