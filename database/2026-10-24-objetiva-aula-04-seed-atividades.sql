-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 4
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 4 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Resolução de problemas: análise crítica', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Resolução de problemas: análise crítica (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-04-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Fato objetivo da tela', 'A'),
      (v_atividade, 2, 'Gosto pessoal', 'C'),
      (v_atividade, 3, 'Elemento da tríade investigativa', 'B'),
      (v_atividade, 4, 'Ordem do método investigativo', 'D'),
      (v_atividade, 5, 'Efeito prático', 'A'),
      (v_atividade, 6, 'Contraste insuficiente', 'B'),
      (v_atividade, 7, 'Desalinhamento visual', 'D'),
      (v_atividade, 8, 'Área de toque pequena', 'C'),
      (v_atividade, 9, 'Falta de hierarquia', 'A'),
      (v_atividade, 10, 'Sobrecarga cognitiva', 'A'),
      (v_atividade, 11, 'Erro operacional', 'C'),
      (v_atividade, 12, 'Abandono de tarefa', 'D'),
      (v_atividade, 13, 'Conceito de ruído visual', 'B'),
      (v_atividade, 14, 'Fontes de ruído', 'A'),
      (v_atividade, 15, 'Avisos flutuantes', 'D'),
      (v_atividade, 16, 'Bordas pesadas', 'C'),
      (v_atividade, 17, 'Botão invisível', 'A'),
      (v_atividade, 18, 'Campo ambíguo', 'B'),
      (v_atividade, 19, 'Ausência de feedback', 'D'),
      (v_atividade, 20, 'Responsabilidade pelo erro', 'C'),
      (v_atividade, 21, 'Definição de diagnóstico', 'B'),
      (v_atividade, 22, 'Causalidade', 'A'),
      (v_atividade, 23, 'Barreira', 'C'),
      (v_atividade, 24, 'Ruído visual', 'D'),
      (v_atividade, 25, 'Severidade catastrófica', 'B'),
      (v_atividade, 26, 'Severidade cosmética', 'B'),
      (v_atividade, 27, 'Severidade leve', 'B'),
      (v_atividade, 28, 'Severidade grave', 'C'),
      (v_atividade, 29, 'Estrutura do relatório técnico', 'D'),
      (v_atividade, 30, 'Hipótese de causa técnica', 'B'),
      (v_atividade, 31, 'Proposta de melhoria', 'C'),
      (v_atividade, 32, 'Fato observado com evidência', 'D'),
      (v_atividade, 33, 'Checklist de contraste', 'A'),
      (v_atividade, 34, 'Checklist de área de toque', 'A'),
      (v_atividade, 35, 'Visibilidade da ação principal', 'D'),
      (v_atividade, 36, 'Crítica construtiva', 'C'),
      (v_atividade, 37, 'Abordagem agressiva', 'B'),
      (v_atividade, 38, 'Amabilidade no trabalho', 'A'),
      (v_atividade, 39, 'Julgamento precipitado', 'C'),
      (v_atividade, 40, 'Fato mensurável', 'D'),
      (v_atividade, 41, 'Gosto pessoal versus análise crítica', 'A'),
      (v_atividade, 42, 'Área de toque de 44 por 44 pixels', 'B'),
      (v_atividade, 43, 'Síntese: fatos provam', 'C'),
      (v_atividade, 44, 'Síntese: soluções libertam', 'D'),
      (v_atividade, 45, 'Fato observado no caso do agendamento', 'A'),
      (v_atividade, 46, 'Estados de horário no caso do agendamento', 'B'),
      (v_atividade, 47, 'Botão Confirmar abaixo da dobra', 'C'),
      (v_atividade, 48, 'Causa técnica da falha de seleção de datas', 'D'),
      (v_atividade, 49, 'Solução proposta para o calendário', 'B'),
      (v_atividade, 50, 'Efeito prático no caso do calendário', 'A');
end $$;
