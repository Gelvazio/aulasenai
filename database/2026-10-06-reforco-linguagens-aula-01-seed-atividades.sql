-- Seed gerado por scripts/gerar-seed-atividades.py (grupo Reforço de Linguagens).
-- Idempotente; rodar ANTES do seed da atividade discursiva da aula.

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

  -- Aula 1: Leitura e Compreensão Textual Básica
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Leitura e Compreensão Textual Básica' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (1, 'Leitura e Compreensão Textual Básica', v_materia, v_curso, '2026-09-08')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Leitura e Compreensão Textual Básica', 'PENDENTE', v_aula, '2026-09-08',
      'Atividade — Leitura e Compreensão Textual Básica (20 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADES-AULA-01-20-QUESTOES.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Compreensão global', 'C'),
      (v_atividade, 2, 'Compreensão detalhada', 'A'),
      (v_atividade, 3, 'Compreensão crítica', 'C'),
      (v_atividade, 4, 'Assunto da notícia', 'B'),
      (v_atividade, 5, 'Quando acontece', 'B'),
      (v_atividade, 6, 'Tipo de texto da notícia', 'D'),
      (v_atividade, 7, 'Pergunta crítica sobre a notícia', 'D'),
      (v_atividade, 8, 'Função da introdução', 'A'),
      (v_atividade, 9, 'Ordem da estrutura', 'A'),
      (v_atividade, 10, 'Papel de uma informação', 'D'),
      (v_atividade, 11, 'O que é tema', 'C'),
      (v_atividade, 12, 'O que é ideia principal', 'B'),
      (v_atividade, 13, 'Tema × ideia principal', 'D'),
      (v_atividade, 14, 'Leitura dinâmica', 'A'),
      (v_atividade, 15, 'Leitura cuidadosa', 'A'),
      (v_atividade, 16, 'Mensagem suspeita', 'C'),
      (v_atividade, 17, 'Tipo do texto sobre Lucas', 'B'),
      (v_atividade, 18, 'Tipo do texto sobre a praça', 'B'),
      (v_atividade, 19, 'O que é resumo', 'C'),
      (v_atividade, 20, 'Melhor resumo da notícia', 'D');
end $$;
