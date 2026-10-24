-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 5
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 5 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Resolução de problemas: análise de cenários', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Resolução de problemas: análise de cenários (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-05-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Pilares do cenário', 'A'),
      (v_atividade, 2, 'Pilar Onde', 'B'),
      (v_atividade, 3, 'Natureza do cenário', 'C'),
      (v_atividade, 4, 'Iluminação e contraste', 'D'),
      (v_atividade, 5, 'Ofuscamento em local escuro', 'A'),
      (v_atividade, 6, 'Atenção fragmentada', 'B'),
      (v_atividade, 7, 'Precisão reduzida', 'C'),
      (v_atividade, 8, 'Estado offline', 'D'),
      (v_atividade, 9, 'Zona do polegar', 'A'),
      (v_atividade, 10, 'Área de toque mínima', 'B'),
      (v_atividade, 11, 'Primeiro passo do Quadro de Cenários', 'C'),
      (v_atividade, 12, 'Checar viabilidade', 'D'),
      (v_atividade, 13, 'Definição de mitigação', 'A'),
      (v_atividade, 14, 'Ambiente que o designer não controla', 'B'),
      (v_atividade, 15, 'Mitigação para claridade', 'C'),
      (v_atividade, 16, 'Mitigação para tremor', 'D'),
      (v_atividade, 17, 'Mitigação para ausência de sinal', 'A'),
      (v_atividade, 18, 'Mitigação para pressa', 'B'),
      (v_atividade, 19, 'Critérios de viabilidade', 'C'),
      (v_atividade, 20, 'Pergunta da viabilidade técnica', 'D'),
      (v_atividade, 21, 'Escolha na matriz de decisão', 'A'),
      (v_atividade, 22, 'Reconhecimento de voz descartado', 'B'),
      (v_atividade, 23, 'Formulário em 3 passos escolhido', 'C'),
      (v_atividade, 24, 'Ideias diferentes (S1)', 'D'),
      (v_atividade, 25, 'Discordância sobre telas', 'A'),
      (v_atividade, 26, 'Riscos percebidos por colegas', 'B'),
      (v_atividade, 27, 'Botão flutuante na barra inferior', 'C'),
      (v_atividade, 28, 'Última etapa do planejamento da tela', 'D'),
      (v_atividade, 29, 'Entregável "Riscos"', 'A'),
      (v_atividade, 30, 'Quantidade de mitigações', 'B'),
      (v_atividade, 31, 'Desafio do consultor', 'C'),
      (v_atividade, 32, 'Debate com um colega', 'D'),
      (v_atividade, 33, 'O que o contexto dita', 'A'),
      (v_atividade, 34, 'O que as restrições físicas definem', 'B'),
      (v_atividade, 35, 'Papel da viabilidade técnica', 'C'),
      (v_atividade, 36, 'Glossário: mitigação', 'D'),
      (v_atividade, 37, 'Glossário: viabilidade', 'A'),
      (v_atividade, 38, 'Glossário: contexto', 'B'),
      (v_atividade, 39, 'Glossário: cenário', 'C'),
      (v_atividade, 40, 'Regra de ouro do contraste', 'D'),
      (v_atividade, 41, 'Primeiro objetivo de aprendizagem', 'A'),
      (v_atividade, 42, 'Segundo objetivo de aprendizagem', 'B'),
      (v_atividade, 43, 'Terceiro objetivo de aprendizagem', 'C'),
      (v_atividade, 44, 'Relato que motivou a análise', 'D'),
      (v_atividade, 45, 'Problema de consultoria', 'A'),
      (v_atividade, 46, 'Cenário mapeado', 'B'),
      (v_atividade, 47, 'Riscos de interação do cenário', 'C'),
      (v_atividade, 48, 'Mitigações propostas para o formulário', 'D'),
      (v_atividade, 49, 'Critério de tempo de execução', 'A'),
      (v_atividade, 50, 'Comparação entre os dois cenários', 'B');
end $$;
