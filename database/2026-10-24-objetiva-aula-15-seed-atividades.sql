-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 15
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 15 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Coleta de feedbacks e resolução de conflitos', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Coleta de feedbacks e resolução de conflitos (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-15-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Desejo e necessidade', 'A'),
      (v_atividade, 2, 'Natureza do feedback', 'C'),
      (v_atividade, 3, 'Superfície e estrutura', 'B'),
      (v_atividade, 4, 'Última etapa da triagem', 'D'),
      (v_atividade, 5, 'Quadrante Descartar', 'A'),
      (v_atividade, 6, 'Quadrante Vitória Rápida', 'B'),
      (v_atividade, 7, 'Quadrante Estratégico', 'C'),
      (v_atividade, 8, 'Critério de relevância', 'D'),
      (v_atividade, 9, 'Critério de esforço', 'B'),
      (v_atividade, 10, 'Critério de prioridade', 'A'),
      (v_atividade, 11, 'Critério de impacto', 'D'),
      (v_atividade, 12, 'Leitura da pesquisa com formulários', 'C'),
      (v_atividade, 13, 'Primeira etapa da mediação', 'A'),
      (v_atividade, 14, 'Quarta etapa da mediação', 'B'),
      (v_atividade, 15, 'Definição de amabilidade', 'D'),
      (v_atividade, 16, 'Foco da discordância', 'C'),
      (v_atividade, 17, 'Validação de postura', 'A'),
      (v_atividade, 18, 'Como recusar uma solicitação', 'B'),
      (v_atividade, 19, 'Recusa sem resposta seca', 'C'),
      (v_atividade, 20, 'Exercício de priorização', 'D'),
      (v_atividade, 21, 'Referência normativa na justificativa', 'B'),
      (v_atividade, 22, 'Justificativa de desempenho', 'A'),
      (v_atividade, 23, 'Justificativa de prevenção de erros', 'C'),
      (v_atividade, 24, 'Negociação em equipe', 'D'),
      (v_atividade, 25, 'Primeira etapa do registro de recusas', 'A'),
      (v_atividade, 26, 'Segunda etapa do registro de recusas', 'B'),
      (v_atividade, 27, 'Terceira etapa do registro de recusas', 'D'),
      (v_atividade, 28, 'Estrutura do relatório formal', 'C'),
      (v_atividade, 29, 'Por que documentar decisões', 'B'),
      (v_atividade, 30, 'Reduzir campos do agendamento', 'A'),
      (v_atividade, 31, 'Campo opcional no agendamento', 'C'),
      (v_atividade, 32, 'Critério de clareza visual', 'D'),
      (v_atividade, 33, 'Recusar pop-up com amabilidade', 'A'),
      (v_atividade, 34, 'Matriz de conflito', 'B'),
      (v_atividade, 35, 'Triagem objetiva', 'C'),
      (v_atividade, 36, 'Matriz de prioridade', 'D'),
      (v_atividade, 37, 'Critério para recusar solicitação', 'B'),
      (v_atividade, 38, 'Por que a amabilidade é fundamental', 'A'),
      (v_atividade, 39, 'Conceito de feedback', 'D'),
      (v_atividade, 40, 'Conceito de mediação', 'C'),
      (v_atividade, 41, 'Conceito de critério', 'A'),
      (v_atividade, 42, 'Conceito de amabilidade', 'B'),
      (v_atividade, 43, 'Diálogo construtivo', 'C'),
      (v_atividade, 44, 'Demanda dos estudantes', 'D'),
      (v_atividade, 45, 'Demanda da coordenação', 'A'),
      (v_atividade, 46, 'Demanda da equipe técnica', 'C'),
      (v_atividade, 47, 'Passo antes do mapeamento de conflitos', 'B'),
      (v_atividade, 48, 'Separar desejo de necessidade na síntese', 'D'),
      (v_atividade, 49, 'Primeiro passo no estudo de caso', 'A'),
      (v_atividade, 50, 'Por que a recusa seca não funciona', 'B');
end $$;
