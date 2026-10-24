-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 7
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 7 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Layout: padrões de leitura F e Z e alinhamento', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Layout: padrões de leitura F e Z e alinhamento (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-07-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Conceito de layout', 'B'),
      (v_atividade, 2, 'Leitura ao abrir uma tela', 'D'),
      (v_atividade, 3, 'Perguntas do usuário', 'A'),
      (v_atividade, 4, 'Escaneabilidade', 'C'),
      (v_atividade, 5, 'Rastreamento visual', 'A'),
      (v_atividade, 6, 'Duração das fixações', 'B'),
      (v_atividade, 7, 'Pontos de atenção', 'D'),
      (v_atividade, 8, 'Banners', 'C'),
      (v_atividade, 9, 'Padrão de leitura de textos', 'C'),
      (v_atividade, 10, 'Haste vertical do padrão F', 'A'),
      (v_atividade, 11, 'Subtítulos', 'D'),
      (v_atividade, 12, 'Onde aparece o padrão Z', 'B'),
      (v_atividade, 13, 'Ponto do CTA no padrão Z', 'A'),
      (v_atividade, 14, 'Ponto 2 do padrão Z', 'B'),
      (v_atividade, 15, 'Escolha do padrão', 'C'),
      (v_atividade, 16, 'Previsibilidade do layout', 'D'),
      (v_atividade, 17, 'Conceito de alinhamento', 'A'),
      (v_atividade, 18, 'Conceito de grade', 'C'),
      (v_atividade, 19, 'Alinhamento vertical', 'B'),
      (v_atividade, 20, 'Desalinhamento acidental', 'D'),
      (v_atividade, 21, 'Alinhamento padrão de ouro', 'D'),
      (v_atividade, 22, 'Textos longos', 'A'),
      (v_atividade, 23, 'Alinhamento à direita', 'C'),
      (v_atividade, 24, 'Valores em apps bancários', 'B'),
      (v_atividade, 25, 'Títulos curtos', 'A'),
      (v_atividade, 26, 'Elementos de uma grade', 'B'),
      (v_atividade, 27, 'Calhas (gutters)', 'C'),
      (v_atividade, 28, 'Grade de 12 colunas', 'D'),
      (v_atividade, 29, 'Banner de largura total', 'A'),
      (v_atividade, 30, 'Três cards lado a lado', 'C'),
      (v_atividade, 31, 'Linha de dobra', 'B'),
      (v_atividade, 32, 'Informação crítica', 'D'),
      (v_atividade, 33, 'Botão de conversão', 'A'),
      (v_atividade, 34, 'Esboço em papel', 'D'),
      (v_atividade, 35, 'Colunas do esboço', 'C'),
      (v_atividade, 36, 'Proporção do esboço', 'B'),
      (v_atividade, 37, 'Botão de agendamento', 'A'),
      (v_atividade, 38, 'Checklist de alinhamento', 'C'),
      (v_atividade, 39, 'Evolução do design', 'B'),
      (v_atividade, 40, 'Espaçamentos em design systems', 'D'),
      (v_atividade, 41, 'Página de notícias', 'A'),
      (v_atividade, 42, 'Ordem do padrão Z', 'B'),
      (v_atividade, 43, 'Protótipo de baixa fidelidade', 'C'),
      (v_atividade, 44, 'Design sistemático', 'D'),
      (v_atividade, 45, 'Escaneabilidade', 'A'),
      (v_atividade, 46, 'F versus Z', 'C'),
      (v_atividade, 47, 'Alinhamento horizontal', 'B'),
      (v_atividade, 48, 'Margens da grade', 'D'),
      (v_atividade, 49, 'Topo esquerdo da tela de agendamento', 'A'),
      (v_atividade, 50, 'Conexão visual dos elementos', 'B');
end $$;
