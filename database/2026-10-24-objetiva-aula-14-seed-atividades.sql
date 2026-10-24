-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 14
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 14 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Estratégias de coleta de informações: determinação e aplicação', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Estratégias de coleta de informações: determinação e aplicação (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-14-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Motivo da coleta formal', 'A'),
      (v_atividade, 2, 'Escolha do método para alcance amplo', 'B'),
      (v_atividade, 3, 'Força da entrevista', 'C'),
      (v_atividade, 4, 'Dados quantitativos', 'D'),
      (v_atividade, 5, 'Dados qualitativos', 'A'),
      (v_atividade, 6, 'Identificar pergunta indutora', 'C'),
      (v_atividade, 7, 'Pergunta neutra', 'B'),
      (v_atividade, 8, 'Escala Likert', 'D'),
      (v_atividade, 9, 'Tamanho do questionário', 'A'),
      (v_atividade, 10, 'Ordem das etapas da entrevista', 'B'),
      (v_atividade, 11, 'Escuta ativa por paráfrase', 'C'),
      (v_atividade, 12, 'Pergunta de aprofundamento', 'A'),
      (v_atividade, 13, 'Reação diante de uma fala emocional', 'D'),
      (v_atividade, 14, 'Postura do aluno consultor', 'B'),
      (v_atividade, 15, 'Primeira etapa da tabulação', 'C'),
      (v_atividade, 16, 'Categorização de relatos', 'A'),
      (v_atividade, 17, 'Método que vem primeiro', 'D'),
      (v_atividade, 18, 'Validação cruzada', 'B'),
      (v_atividade, 19, 'Erro comum na entrevista', 'C'),
      (v_atividade, 20, 'Tratamento de outliers', 'A'),
      (v_atividade, 21, 'Viés do designer', 'B'),
      (v_atividade, 22, 'Da evidência à decisão de UI', 'D'),
      (v_atividade, 23, 'Checklist antes da coleta', 'A'),
      (v_atividade, 24, 'Registro durante a coleta', 'C'),
      (v_atividade, 25, 'Após a coleta', 'B'),
      (v_atividade, 26, 'Conceito de dados brutos', 'D'),
      (v_atividade, 27, 'Agrupamento de notas', 'A'),
      (v_atividade, 28, 'Visualização dos dados', 'C'),
      (v_atividade, 29, 'Vantagem da escala padronizada', 'D'),
      (v_atividade, 30, 'Quantitativo ou qualitativo', 'B'),
      (v_atividade, 31, 'Roteiro da entrevista em profundidade', 'C'),
      (v_atividade, 32, 'Formato de múltipla escolha', 'D'),
      (v_atividade, 33, 'Pergunta aberta curta', 'A'),
      (v_atividade, 34, 'Conceito de investigação', 'B'),
      (v_atividade, 35, 'Pergunta sobre o modelo mental', 'C'),
      (v_atividade, 36, 'Conceito de tabulação', 'A'),
      (v_atividade, 37, 'Conceito de questionário', 'D'),
      (v_atividade, 38, 'Acolher o silêncio', 'B'),
      (v_atividade, 39, 'Evolução histórica da pesquisa em UX', 'C'),
      (v_atividade, 40, 'Papéis na dupla de prática', 'D'),
      (v_atividade, 41, 'Registro na aplicação cruzada', 'A'),
      (v_atividade, 42, 'Erro comum: formulário longo', 'B'),
      (v_atividade, 43, 'Observação corporal', 'C'),
      (v_atividade, 44, 'Prioridade da matriz de dificuldades', 'D'),
      (v_atividade, 45, 'Limpeza dos dados', 'B'),
      (v_atividade, 46, 'Identificar a pergunta indutora', 'A'),
      (v_atividade, 47, 'Encerramento da entrevista', 'D'),
      (v_atividade, 48, 'Decisão baseada em dados', 'C'),
      (v_atividade, 49, 'Escolha entre questionário e entrevista', 'A'),
      (v_atividade, 50, 'Síntese dos aprendizados', 'B');
end $$;
