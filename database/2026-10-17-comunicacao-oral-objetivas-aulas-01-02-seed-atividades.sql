-- Seed gerado por scripts/gerar-seed-atividades.py — não editar à mão.
-- Rodar depois de 2026-09-28-atividades-gabarito.sql. Idempotente.

insert into public.turma (codigo, nome, turno, horario) values
  ('135080', 'AI AOPL 2026/2 M1', 'Manhã', '07:15 às 11:15'),
  ('135081', 'AI AOPL 2026/2 V1', 'Tarde', '13:15 às 17:15')
on conflict (codigo) do update set nome = excluded.nome, turno = excluded.turno, horario = excluded.horario;

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

  select id into v_materia from public.materia where descricao = 'Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Fundamentos da Comunicação no Mundo do Trabalho
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Fundamentos da Comunicação no Mundo do Trabalho' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (1, 'Fundamentos da Comunicação no Mundo do Trabalho', v_materia, v_curso, '2026-10-09')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Fundamentos da Comunicação no Mundo do Trabalho', 'PENDENTE', v_aula, '2026-10-09',
      'Atividade — Fundamentos da Comunicação no Mundo do Trabalho (50 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Por que comunicar bem no trabalho', 'B'),
      (v_atividade, 2, 'Consequências da falha', 'B'),
      (v_atividade, 3, 'Emissor', 'D'),
      (v_atividade, 4, 'Receptor', 'B'),
      (v_atividade, 5, 'Mensagem', 'C'),
      (v_atividade, 6, 'Canal', 'A'),
      (v_atividade, 7, 'Exemplos de canal', 'B'),
      (v_atividade, 8, 'Código', 'B'),
      (v_atividade, 9, 'Código não verbal', 'A'),
      (v_atividade, 10, 'Ruído', 'D'),
      (v_atividade, 11, 'Feedback', 'D'),
      (v_atividade, 12, 'Exemplo de feedback', 'D'),
      (v_atividade, 13, 'Ciclo da comunicação', 'C'),
      (v_atividade, 14, 'Sem feedback', 'A'),
      (v_atividade, 15, 'Ruído físico', 'D'),
      (v_atividade, 16, 'Ruído técnico', 'C'),
      (v_atividade, 17, 'Ruído semântico', 'D'),
      (v_atividade, 18, 'Ruído psicológico', 'A'),
      (v_atividade, 19, 'Reduzir o ruído', 'B'),
      (v_atividade, 20, 'Mensagem completa', 'A'),
      (v_atividade, 21, 'Aviso melhorado', 'B'),
      (v_atividade, 22, 'Escolher o canal', 'B'),
      (v_atividade, 23, 'Linguagem formal', 'A'),
      (v_atividade, 24, 'Linguagem informal', 'B'),
      (v_atividade, 25, 'Adequação', 'D'),
      (v_atividade, 26, 'Mensagem inadequada', 'C'),
      (v_atividade, 27, 'Reescrita formal', 'A'),
      (v_atividade, 28, 'Comunicação verbal', 'A'),
      (v_atividade, 29, 'Comunicação não verbal', 'C'),
      (v_atividade, 30, 'Exemplos não verbais', 'C'),
      (v_atividade, 31, 'Verbal e não verbal combinando', 'C'),
      (v_atividade, 32, 'Tom de voz', 'C'),
      (v_atividade, 33, 'Respeito na comunicação', 'D'),
      (v_atividade, 34, 'Telefone sem fio', 'D'),
      (v_atividade, 35, 'Segunda rodada', 'C'),
      (v_atividade, 36, 'Identificar o elemento', 'A'),
      (v_atividade, 37, 'Pergunta antes de agir', 'A'),
      (v_atividade, 38, 'Clareza', 'C'),
      (v_atividade, 39, 'Objetividade', 'B'),
      (v_atividade, 40, 'Data e hora exatas', 'B'),
      (v_atividade, 41, 'Situação de trabalho', 'B'),
      (v_atividade, 42, 'Equipe e comunicação', 'D'),
      (v_atividade, 43, 'Contexto profissional', 'A'),
      (v_atividade, 44, 'Canal errado', 'C'),
      (v_atividade, 45, 'Placas de segurança', 'C'),
      (v_atividade, 46, 'Emoji no trabalho', 'B'),
      (v_atividade, 47, 'Comunicar com respeito', 'A'),
      (v_atividade, 48, 'Elementos na prática', 'D'),
      (v_atividade, 49, 'Importância do feedback', 'A'),
      (v_atividade, 50, 'Síntese da aula', 'D');

  -- Aula 2: Comunicação Interpessoal e Trabalho em Equipe
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Comunicação Interpessoal e Trabalho em Equipe' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (2, 'Comunicação Interpessoal e Trabalho em Equipe', v_materia, v_curso, '2026-10-09')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Comunicação Interpessoal e Trabalho em Equipe', 'PENDENTE', v_aula, '2026-10-09',
      'Atividade — Comunicação Interpessoal e Trabalho em Equipe (50 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/ATIVIDADES/ATIVIDADES-AULA-02-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Comunicação interpessoal', 'B'),
      (v_atividade, 2, 'Clima da equipe', 'D'),
      (v_atividade, 3, 'Escutar × escuta ativa', 'A'),
      (v_atividade, 4, 'Prestar atenção', 'D'),
      (v_atividade, 5, 'Mostrar que está ouvindo', 'C'),
      (v_atividade, 6, 'Confirmar', 'D'),
      (v_atividade, 7, 'Perguntar', 'D'),
      (v_atividade, 8, 'Ordem das atitudes', 'C'),
      (v_atividade, 9, 'Interromper', 'A'),
      (v_atividade, 10, 'O que é feedback', 'B'),
      (v_atividade, 11, 'Fato ou pessoa', 'C'),
      (v_atividade, 12, 'Feedback sanduíche', 'A'),
      (v_atividade, 13, 'Feedback específico', 'B'),
      (v_atividade, 14, 'Receber feedback', 'B'),
      (v_atividade, 15, 'Exemplo de sanduíche', 'C'),
      (v_atividade, 16, 'Objetivo comum', 'A'),
      (v_atividade, 17, 'Papéis na equipe', 'A'),
      (v_atividade, 18, 'Coordenador', 'C'),
      (v_atividade, 19, 'Controlador de tempo', 'C'),
      (v_atividade, 20, 'Prazos', 'B'),
      (v_atividade, 21, 'Combinados', 'C'),
      (v_atividade, 22, 'Situação-problema', 'B'),
      (v_atividade, 23, 'Falar com "eu"', 'B'),
      (v_atividade, 24, 'Passos do conflito', 'D'),
      (v_atividade, 25, 'Conflito é normal', 'D'),
      (v_atividade, 26, 'Solução boa para todos', 'A'),
      (v_atividade, 27, 'Conferir o combinado', 'B'),
      (v_atividade, 28, 'Torre em silêncio', 'A'),
      (v_atividade, 29, 'Segunda rodada da torre', 'A'),
      (v_atividade, 30, 'Respeito às opiniões', 'A'),
      (v_atividade, 31, 'Clareza com a equipe', 'C'),
      (v_atividade, 32, 'Mensagem no grupo', 'D'),
      (v_atividade, 33, 'Empatia', 'B'),
      (v_atividade, 34, 'Divisão justa', 'A'),
      (v_atividade, 35, 'Equipe sem combinado', 'C'),
      (v_atividade, 36, 'Escuta e erro', 'C'),
      (v_atividade, 37, 'Não verbal na escuta', 'B'),
      (v_atividade, 38, 'Feedback em público', 'D'),
      (v_atividade, 39, 'Elogio útil', 'D'),
      (v_atividade, 40, 'Aceitar sugestões', 'B'),
      (v_atividade, 41, 'Liderança', 'D'),
      (v_atividade, 42, 'Atraso de colega', 'D'),
      (v_atividade, 43, 'Combinado escrito', 'D'),
      (v_atividade, 44, 'Participação de todos', 'A'),
      (v_atividade, 45, 'Comunicação e confiança', 'C'),
      (v_atividade, 46, 'Resposta respeitosa', 'A'),
      (v_atividade, 47, 'Discordar com respeito', 'B'),
      (v_atividade, 48, 'Escuta no atendimento interno', 'B'),
      (v_atividade, 49, 'Combinado justo', 'A'),
      (v_atividade, 50, 'Síntese da aula', 'C');
end $$;
