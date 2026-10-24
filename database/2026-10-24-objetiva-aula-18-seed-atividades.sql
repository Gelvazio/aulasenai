-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 18
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 18 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Mock-ups digitais e processo de criação', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Mock-ups digitais e processo de criação (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-18-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Função do mock-up digital', 'A'),
      (v_atividade, 2, 'Teste no papel antes do digital', 'C'),
      (v_atividade, 3, 'Baixa fidelidade', 'B'),
      (v_atividade, 4, 'Painel de camadas', 'D'),
      (v_atividade, 5, 'Dimensão da prancheta', 'A'),
      (v_atividade, 6, 'Plano de fundo na lista de camadas', 'B'),
      (v_atividade, 7, 'Texto que some na tela', 'D'),
      (v_atividade, 8, 'Nomes de camadas', 'C'),
      (v_atividade, 9, 'Componente mestre', 'A'),
      (v_atividade, 10, 'Alteração em componente', 'B'),
      (v_atividade, 11, 'Grade de 8 px', 'C'),
      (v_atividade, 12, 'Largura do botão', 'D'),
      (v_atividade, 13, 'Título da tela', 'B'),
      (v_atividade, 14, 'Texto de apoio', 'A'),
      (v_atividade, 15, 'Etapa de transposição', 'D'),
      (v_atividade, 16, 'Etapa de acabamento', 'C'),
      (v_atividade, 17, 'O que não fazer na digitalização', 'A'),
      (v_atividade, 18, 'Fidelidade estrutural', 'B'),
      (v_atividade, 19, 'Justificativa de cor', 'C'),
      (v_atividade, 20, 'Registro de alterações', 'D'),
      (v_atividade, 21, 'Ficha técnica', 'A'),
      (v_atividade, 22, 'Critério de legibilidade', 'C'),
      (v_atividade, 23, 'Critério de consistência', 'B'),
      (v_atividade, 24, 'Critério de acabamento', 'D'),
      (v_atividade, 25, 'Classificação do mock-up', 'B'),
      (v_atividade, 26, 'Limite do mock-up', 'A'),
      (v_atividade, 27, 'Painel de estilos', 'C'),
      (v_atividade, 28, 'Barra de criação', 'D'),
      (v_atividade, 29, 'Tradução visual de formas', 'A'),
      (v_atividade, 30, 'Legibilidade na transposição', 'B'),
      (v_atividade, 31, 'Padrão de leitura', 'D'),
      (v_atividade, 32, 'Princípio de repetição', 'C'),
      (v_atividade, 33, 'Escolha de ícones e fotos', 'A'),
      (v_atividade, 34, 'Risco de infração', 'B'),
      (v_atividade, 35, 'Feedback entre colegas', 'C'),
      (v_atividade, 36, 'Justificar a posição do botão', 'D'),
      (v_atividade, 37, 'Métrica de contraste', 'A'),
      (v_atividade, 38, 'Ordem das camadas de um card', 'B'),
      (v_atividade, 39, 'Função da hierarquia tipográfica', 'C'),
      (v_atividade, 40, 'Registro que explica decisões', 'D'),
      (v_atividade, 41, 'Vantagem do componente', 'A'),
      (v_atividade, 42, 'Conceito de camada', 'B'),
      (v_atividade, 43, 'Conceito de composição', 'C'),
      (v_atividade, 44, 'Conceito de mock-up', 'D'),
      (v_atividade, 45, 'Pergunta que o mock-up responde', 'A'),
      (v_atividade, 46, 'Vantagem do papel', 'B'),
      (v_atividade, 47, 'Média fidelidade', 'C'),
      (v_atividade, 48, 'Alta fidelidade', 'D'),
      (v_atividade, 49, 'Cálculo da largura do botão', 'A'),
      (v_atividade, 50, 'Respeitar a validação do papel', 'B');
end $$;
