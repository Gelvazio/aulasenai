-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 11
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 11 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Processo de design interativo', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Processo de design interativo (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-11-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Etapas do ciclo', 'A'),
      (v_atividade, 2, 'UI versus UX', 'B'),
      (v_atividade, 3, 'Conceito de design iterativo', 'C'),
      (v_atividade, 4, 'Modelo linear', 'D'),
      (v_atividade, 5, 'Etapa Entender', 'A'),
      (v_atividade, 6, 'Etapa Criar', 'B'),
      (v_atividade, 7, 'Etapa Testar', 'C'),
      (v_atividade, 8, 'Etapa Melhorar', 'D'),
      (v_atividade, 9, 'Retorno ao início', 'A'),
      (v_atividade, 10, 'Vocabulário: iteração', 'B'),
      (v_atividade, 11, 'Vocabulário: aprimoramento', 'C'),
      (v_atividade, 12, 'Vocabulário: versão', 'D'),
      (v_atividade, 13, 'Mito do design pronto', 'A'),
      (v_atividade, 14, 'Curva de maturidade', 'B'),
      (v_atividade, 15, 'Esboço inicial', 'C'),
      (v_atividade, 16, 'Versão testada', 'D'),
      (v_atividade, 17, 'Evolução temporal', 'A'),
      (v_atividade, 18, 'Versão 1.0', 'B'),
      (v_atividade, 19, 'Papel do erro', 'C'),
      (v_atividade, 20, 'Função pedagógica e técnica do erro', 'D'),
      (v_atividade, 21, 'Responsabilidade pelo clique errado', 'A'),
      (v_atividade, 22, 'Sinal de tempo e hesitação', 'B'),
      (v_atividade, 23, 'Cliques falsos', 'C'),
      (v_atividade, 24, 'Perguntas verbais', 'D'),
      (v_atividade, 25, 'Evidência objetiva', 'A'),
      (v_atividade, 26, 'Evidência ou gosto', 'B'),
      (v_atividade, 27, 'Papel do aluno na situação de aprendizagem', 'C'),
      (v_atividade, 28, 'Reclamações dos pacientes', 'D'),
      (v_atividade, 29, 'Problema do calendário na V1', 'A'),
      (v_atividade, 30, 'Problema do botão na V1', 'B'),
      (v_atividade, 31, 'Falta de confirmação de etapas', 'C'),
      (v_atividade, 32, 'Cards de horário', 'D'),
      (v_atividade, 33, 'Botão primário de alto contraste', 'A'),
      (v_atividade, 34, 'Card de resumo', 'B'),
      (v_atividade, 35, 'Área de toque da V2', 'C'),
      (v_atividade, 36, 'Matriz de causa e efeito: maior índice', 'D'),
      (v_atividade, 37, 'Matriz de causa e efeito: toque errado', 'A'),
      (v_atividade, 38, 'Matriz de causa e efeito: texto denso', 'B'),
      (v_atividade, 39, 'Origem dos dados da matriz', 'C'),
      (v_atividade, 40, 'Tempo de conclusão na V1 e na V2', 'D'),
      (v_atividade, 41, 'Taxa de erro na V2', 'A'),
      (v_atividade, 42, 'O que não comprova a superioridade', 'B'),
      (v_atividade, 43, 'Diagnóstico técnico dos toques errados', 'C'),
      (v_atividade, 44, 'Ação técnica na V2', 'D'),
      (v_atividade, 45, 'Resultado validado', 'A'),
      (v_atividade, 46, 'Registro documental', 'B'),
      (v_atividade, 47, 'Regra de projeto da Versão 1', 'C'),
      (v_atividade, 48, 'Regras de síntese', 'D'),
      (v_atividade, 49, 'Custo da correção', 'A'),
      (v_atividade, 50, 'Teste em pares', 'B');
end $$;
