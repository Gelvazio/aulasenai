-- Seed só da Aula 02 de Reforço de Linguagens (objetivas).
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

  -- Aula 2: Tema, Assunto e Ideia Principal
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Tema, Assunto e Ideia Principal' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (2, 'Tema, Assunto e Ideia Principal', v_materia, v_curso, '2026-10-09')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Tema, Assunto e Ideia Principal', 'PENDENTE', v_aula, '2026-10-09',
      'Atividade — Tema, Assunto e Ideia Principal (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-02-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Assunto', 'B'),
      (v_atividade, 2, 'Tema', 'D'),
      (v_atividade, 3, 'Ideia principal', 'A'),
      (v_atividade, 4, 'Funil de delimitação', 'C'),
      (v_atividade, 5, 'Classificando um enunciado', 'C'),
      (v_atividade, 6, 'Ideias secundárias', 'A'),
      (v_atividade, 7, 'Tópico frasal', 'D'),
      (v_atividade, 8, 'Verdadeiro ou falso', 'B'),
      (v_atividade, 9, 'Zonas estratégicas', 'A'),
      (v_atividade, 10, 'Palavras-chave', 'C'),
      (v_atividade, 11, 'Sublinhado inteligente', 'B'),
      (v_atividade, 12, 'Glosa', 'D'),
      (v_atividade, 13, 'Extrapolação', 'D'),
      (v_atividade, 14, 'Redução', 'A'),
      (v_atividade, 15, 'Contradição', 'C'),
      (v_atividade, 16, 'Ideia principal de um trecho', 'B'),
      (v_atividade, 17, 'Concessão no texto', 'A'),
      (v_atividade, 18, 'O que é resumir', 'D'),
      (v_atividade, 19, 'Neutralidade do resumo', 'C'),
      (v_atividade, 20, 'Guia de extração', 'B');
end $$;
