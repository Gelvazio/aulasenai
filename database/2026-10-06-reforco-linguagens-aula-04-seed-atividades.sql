-- Seed só da Aula 04 de Reforço de Linguagens (objetivas).
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

  -- Aula 4: Coesão e Coerência Textual
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Coesão e Coerência Textual' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (4, 'Coesão e Coerência Textual', v_materia, v_curso, '2026-10-23')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Coesão e Coerência Textual', 'PENDENTE', v_aula, '2026-10-23',
      'Atividade — Coesão e Coerência Textual (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-04-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Coesão', 'D'),
      (v_atividade, 2, 'Coerência', 'B'),
      (v_atividade, 3, 'Frases corretas sem sentido', 'A'),
      (v_atividade, 4, 'Anáfora', 'C'),
      (v_atividade, 5, 'Catáfora', 'A'),
      (v_atividade, 6, 'Este ou esse', 'D'),
      (v_atividade, 7, 'Completar com coesão', 'C'),
      (v_atividade, 8, 'Sinônimo e hiperônimo', 'B'),
      (v_atividade, 9, 'Elipse', 'B'),
      (v_atividade, 10, 'Conectivo de conclusão', 'A'),
      (v_atividade, 11, 'Relação de causa', 'D'),
      (v_atividade, 12, 'Concessão', 'C'),
      (v_atividade, 13, 'Adversativa × concessiva', 'C'),
      (v_atividade, 14, 'Coeso, mas incoerente', 'B'),
      (v_atividade, 15, 'Fatores da coerência', 'A'),
      (v_atividade, 16, 'Verdadeiro ou falso', 'D'),
      (v_atividade, 17, 'Ambiguidade', 'B'),
      (v_atividade, 18, 'Paralelismo', 'C'),
      (v_atividade, 19, 'Eco', 'D'),
      (v_atividade, 20, 'Ordem do parágrafo argumentativo', 'A');
end $$;
