-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 8
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 8 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Layout: tamanho, espaçamento, texturas, fontes e repetição', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Layout: tamanho, espaçamento, texturas, fontes e repetição (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-08-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Escala de tamanho', 'A'),
      (v_atividade, 2, 'Hierarquia do corpo de texto', 'C'),
      (v_atividade, 3, 'Tamanho do corpo de texto', 'B'),
      (v_atividade, 4, 'Área mínima de toque', 'D'),
      (v_atividade, 5, 'Botões pequenos no celular', 'A'),
      (v_atividade, 6, 'Espaço em branco', 'B'),
      (v_atividade, 7, 'Lei da proximidade', 'D'),
      (v_atividade, 8, 'Rótulo de campo', 'C'),
      (v_atividade, 9, 'Separação de seções', 'B'),
      (v_atividade, 10, 'Grade de 8 pontos', 'A'),
      (v_atividade, 11, 'Valores fora da grade', 'D'),
      (v_atividade, 12, 'Ponte com o front-end', 'B'),
      (v_atividade, 13, 'Espaço interno de 8 px', 'C'),
      (v_atividade, 14, 'Espaçamento macro', 'A'),
      (v_atividade, 15, 'Separar duas seções', 'C'),
      (v_atividade, 16, 'Construção da profundidade', 'D'),
      (v_atividade, 17, 'Opacidade da sombra', 'A'),
      (v_atividade, 18, 'Camada em foco', 'B'),
      (v_atividade, 19, 'Função do fundo base', 'C'),
      (v_atividade, 20, 'Estado de foco (hover)', 'D'),
      (v_atividade, 21, 'Princípio da repetição', 'B'),
      (v_atividade, 22, 'O que repetir', 'A'),
      (v_atividade, 23, 'Estilo de ícones', 'D'),
      (v_atividade, 24, 'Estrutura de cartões', 'C'),
      (v_atividade, 25, 'Consistência interna', 'B'),
      (v_atividade, 26, 'Consistência externa', 'A'),
      (v_atividade, 27, 'Falta de margem', 'C'),
      (v_atividade, 28, 'Salada de fontes', 'D'),
      (v_atividade, 29, 'H1 do guia visual', 'A'),
      (v_atividade, 30, 'Grade de espaços do guia', 'B'),
      (v_atividade, 31, 'Altura do botão', 'C'),
      (v_atividade, 32, 'Raio do botão', 'D'),
      (v_atividade, 33, 'Espaço interno do botão', 'B'),
      (v_atividade, 34, 'Raio do cartão', 'A'),
      (v_atividade, 35, 'Botão para o toque', 'D'),
      (v_atividade, 36, 'Tamanhos tipográficos da dinâmica', 'C'),
      (v_atividade, 37, 'Lista de verificação entre pares', 'B'),
      (v_atividade, 38, 'Benefício para o desenvolvedor', 'A'),
      (v_atividade, 39, 'Trio que define a ordem', 'D'),
      (v_atividade, 40, 'Função da escala de tamanho', 'C'),
      (v_atividade, 41, 'Por que a grade de 8 pixels', 'A'),
      (v_atividade, 42, 'Repetição e experiência', 'B'),
      (v_atividade, 43, 'Conceito de guia visual', 'C'),
      (v_atividade, 44, 'Corpo de texto padrão', 'D'),
      (v_atividade, 45, 'Legendas e metadados', 'B'),
      (v_atividade, 46, 'Subtítulos', 'A'),
      (v_atividade, 47, 'Título H1 de abertura', 'C'),
      (v_atividade, 48, 'Níveis de leitura', 'D'),
      (v_atividade, 49, 'Espaço negativo', 'A'),
      (v_atividade, 50, 'Janela modal', 'B');
end $$;
