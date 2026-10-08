-- Seed só da Aula 09 de Reforço de Linguagens (objetivas).
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

  -- Aula 9: Argumentação Oral, Debates e Registros
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Argumentação Oral, Debates e Registros' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (9, 'Argumentação Oral, Debates e Registros', v_materia, v_curso, '2026-11-27')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Argumentação Oral, Debates e Registros', 'PENDENTE', v_aula, '2026-11-27',
      'Atividade — Argumentação Oral, Debates e Registros (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-09-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Debate', 'A'),
      (v_atividade, 2, 'Assertividade', 'B'),
      (v_atividade, 3, 'Organização da fala', 'D'),
      (v_atividade, 4, 'Evidência legítima', 'C'),
      (v_atividade, 5, 'Fases do debate', 'B'),
      (v_atividade, 6, 'Respeito ao tempo', 'A'),
      (v_atividade, 7, 'Réplica', 'C'),
      (v_atividade, 8, 'Tréplica', 'D'),
      (v_atividade, 9, 'Falácia ad hominem', 'C'),
      (v_atividade, 10, 'Verdadeiro ou falso', 'D'),
      (v_atividade, 11, 'Escuta empática', 'A'),
      (v_atividade, 12, 'Registro coloquial', 'B'),
      (v_atividade, 13, 'Registro formal', 'A'),
      (v_atividade, 14, 'Registro técnico', 'B'),
      (v_atividade, 15, 'Comunicação passiva', 'C'),
      (v_atividade, 16, 'Resposta assertiva', 'D'),
      (v_atividade, 17, 'Variação linguística', 'B'),
      (v_atividade, 18, 'Preconceito linguístico', 'C'),
      (v_atividade, 19, 'Adequação linguística', 'A'),
      (v_atividade, 20, 'Registro escrito do debate', 'D');
end $$;
