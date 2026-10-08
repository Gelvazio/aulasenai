-- Seed da Atividade Individual — Comunicação Técnica no CD (ITIC, sexta 09/10/2026).
-- Gerado por scripts/gerar-seed-atividades.py (só esta atividade). Idempotente.

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

  -- Aula 7: Textos Técnicos e Redação Empresarial
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Textos Técnicos e Redação Empresarial' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (7, 'Textos Técnicos e Redação Empresarial', v_materia, v_curso, '2026-10-09')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Comunicação Técnica no CD', 'PENDENTE', v_aula, '2026-10-09',
      'Atividade — Comunicação Técnica no CD (40 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-SEXTA-FEIRA/ATIVIDADE-INDIVIDUAL-COMUNICACAO-TECNICA.html', 40)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Elementos da comunicação', 'A'),
      (v_atividade, 2, 'Ruído', 'D'),
      (v_atividade, 3, 'Feedback', 'C'),
      (v_atividade, 4, 'Comunicação assertiva', 'D'),
      (v_atividade, 5, 'Brainstorming', 'C'),
      (v_atividade, 6, 'Papel do líder', 'D'),
      (v_atividade, 7, 'Equipe de 6', 'D'),
      (v_atividade, 8, 'Papéis registrados', 'A'),
      (v_atividade, 9, 'Ata — finalidade', 'A'),
      (v_atividade, 10, 'Ata — forma', 'C'),
      (v_atividade, 11, 'Ata — encerramento', 'B'),
      (v_atividade, 12, 'Relatório — linguagem', 'C'),
      (v_atividade, 13, 'Relatório — tabela', 'D'),
      (v_atividade, 14, 'Relatório — pessoa verbal', 'D'),
      (v_atividade, 15, 'Causa — endereço', 'D'),
      (v_atividade, 16, 'Diferença no inventário', 'C'),
      (v_atividade, 17, 'FEFO', 'A'),
      (v_atividade, 18, 'Sugestão de melhoria', 'B'),
      (v_atividade, 19, 'Pesquisa com aspas', 'D'),
      (v_atividade, 20, 'Referência da fonte', 'A'),
      (v_atividade, 21, 'Avaliação de fontes', 'C'),
      (v_atividade, 22, 'Memorando — finalidade', 'B'),
      (v_atividade, 23, 'Memorando — cabeçalho', 'B'),
      (v_atividade, 24, 'Coletor de dados', 'C'),
      (v_atividade, 25, 'Tipos de periférico', 'D'),
      (v_atividade, 26, 'Impressora de etiquetas', 'B'),
      (v_atividade, 27, 'Cartão de memória', 'A'),
      (v_atividade, 28, 'WMS', 'B'),
      (v_atividade, 29, 'E-mail — campo CC', 'A'),
      (v_atividade, 30, 'E-mail — assunto', 'B'),
      (v_atividade, 31, 'E-mail — explicação ao cliente', 'A'),
      (v_atividade, 32, 'E-mail — dados fictícios', 'C'),
      (v_atividade, 33, 'Phishing', 'C'),
      (v_atividade, 34, 'Senha forte', 'C'),
      (v_atividade, 35, 'Verificação em duas etapas', 'D'),
      (v_atividade, 36, 'Bloquear a tela', 'B'),
      (v_atividade, 37, 'Backup', 'B'),
      (v_atividade, 38, 'Margens do documento', 'A'),
      (v_atividade, 39, 'Sumário automático', 'B'),
      (v_atividade, 40, 'Quebra de página', 'A');
end $$;
