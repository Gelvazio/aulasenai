-- Seed da atividade individual (apostila cap. 01 a 07) — gerado por scripts/gerar-seed-atividades.py.
do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
  select id into v_curso from public.curso where nome_completo = 'Assistente de Operações Logísticas' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Assistente de Operações Logísticas') returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = 'Introdução à Tecnologia da Informação e Comunicação' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('Introdução à Tecnologia da Informação e Comunicação', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 20: Revisão da Apostila — Capítulos 01 a 07
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Revisão da Apostila — Capítulos 01 a 07' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (20, 'Revisão da Apostila — Capítulos 01 a 07', v_materia, v_curso, '2026-10-09')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Revisão da Apostila — Capítulos 01 a 07', 'PENDENTE', v_aula, '2026-10-09',
      'Atividade — Revisão da Apostila — Capítulos 01 a 07 (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-APOSTILA-CAP-01-07.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Sete elementos da comunicação', 'C'),
      (v_atividade, 2, 'Feedback', 'A'),
      (v_atividade, 3, 'Tipo de ruído', 'A'),
      (v_atividade, 4, 'Código', 'A'),
      (v_atividade, 5, 'Comunicação assertiva', 'C'),
      (v_atividade, 6, 'Escuta ativa', 'A'),
      (v_atividade, 7, 'Linguagem com o cliente', 'C'),
      (v_atividade, 8, 'Consenso', 'C'),
      (v_atividade, 9, 'Hardware e software', 'B'),
      (v_atividade, 10, 'Memória RAM', 'A'),
      (v_atividade, 11, 'HDD e SSD', 'A'),
      (v_atividade, 12, 'Periférico de entrada', 'D'),
      (v_atividade, 13, 'Leitor que parou', 'A'),
      (v_atividade, 14, 'Sistema operacional', 'B'),
      (v_atividade, 15, 'Nome de arquivo', 'C'),
      (v_atividade, 16, 'Internet e web', 'A'),
      (v_atividade, 17, 'Operadores de busca', 'D'),
      (v_atividade, 18, 'Janela anônima', 'B'),
      (v_atividade, 19, 'Teste CRAAP', 'B'),
      (v_atividade, 20, 'Plágio', 'B'),
      (v_atividade, 21, 'Citação direta', 'B'),
      (v_atividade, 22, 'Download seguro', 'C'),
      (v_atividade, 23, 'Assunto do e-mail', 'C'),
      (v_atividade, 24, 'Campo CC', 'C'),
      (v_atividade, 25, 'CCO e LGPD', 'D'),
      (v_atividade, 26, 'Arquivo grande', 'D'),
      (v_atividade, 27, 'Permissão na nuvem', 'A'),
      (v_atividade, 28, 'Histórico de versões', 'B'),
      (v_atividade, 29, 'Ética digital', 'C'),
      (v_atividade, 30, 'Pilares da segurança', 'B'),
      (v_atividade, 31, 'LGPD', 'D'),
      (v_atividade, 32, 'Lei 12.737/2012', 'B'),
      (v_atividade, 33, 'Phishing', 'B'),
      (v_atividade, 34, 'Ransomware', 'D'),
      (v_atividade, 35, 'Senha forte', 'C'),
      (v_atividade, 36, 'Backup 3-2-1', 'B'),
      (v_atividade, 37, 'Margens ABNT', 'D'),
      (v_atividade, 38, 'Quebra de página', 'A'),
      (v_atividade, 39, 'Quebra de seção', 'B'),
      (v_atividade, 40, 'Numeração e marcadores', 'D'),
      (v_atividade, 41, 'Estilos e sumário', 'C'),
      (v_atividade, 42, 'Controle de alterações', 'D'),
      (v_atividade, 43, 'Formato final', 'D'),
      (v_atividade, 44, 'Texto técnico impessoal', 'D'),
      (v_atividade, 45, 'Norma do relatório', 'A'),
      (v_atividade, 46, 'Estrutura do relatório', 'B'),
      (v_atividade, 47, 'Ata de reunião', 'A'),
      (v_atividade, 48, 'Memorando e ofício', 'C'),
      (v_atividade, 49, 'Resumo informativo', 'A'),
      (v_atividade, 50, 'Jargão e redação empresarial', 'D');
end $$;
