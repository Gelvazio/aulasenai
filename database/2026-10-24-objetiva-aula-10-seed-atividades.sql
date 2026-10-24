-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 10
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 10 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('User Experience: definição e design centrado no usuário', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — User Experience: definição e design centrado no usuário (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-10-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Papel do feedback do botão', 'A'),
      (v_atividade, 2, 'Relação entre UI e UX', 'C'),
      (v_atividade, 3, 'Produto com boa UI e má UX', 'B'),
      (v_atividade, 4, 'Analogia da xícara de chá', 'D'),
      (v_atividade, 5, 'Conceito de experiência', 'A'),
      (v_atividade, 6, 'Dimensão emocional', 'B'),
      (v_atividade, 7, 'Dimensão de percepção', 'C'),
      (v_atividade, 8, 'Princípio do Design Centrado no Usuário', 'A'),
      (v_atividade, 9, 'Dor de cadastro extenso', 'D'),
      (v_atividade, 10, 'Você não é o seu usuário', 'B'),
      (v_atividade, 11, 'Abandonar suposições', 'C'),
      (v_atividade, 12, 'Sequência do UCD', 'A'),
      (v_atividade, 13, 'Pesquisar quem é a pessoa', 'D'),
      (v_atividade, 14, 'Mapear necessidades', 'B'),
      (v_atividade, 15, 'Criar protótipos', 'A'),
      (v_atividade, 16, 'Testar com usuários reais', 'C'),
      (v_atividade, 17, 'Alcance do polegar', 'B'),
      (v_atividade, 18, 'Tamanho mínimo de toque', 'D'),
      (v_atividade, 19, 'Baixo contraste', 'A'),
      (v_atividade, 20, 'Falha cognitiva', 'C'),
      (v_atividade, 21, 'Reconhecer é mais fácil que lembrar', 'B'),
      (v_atividade, 22, 'Luz solar extrema', 'D'),
      (v_atividade, 23, 'Conexão lenta', 'A'),
      (v_atividade, 24, 'Pressa e trepidação', 'B'),
      (v_atividade, 25, 'Equipe homogênea', 'C'),
      (v_atividade, 26, 'Acessibilidade para todos', 'D'),
      (v_atividade, 27, 'Beleza com utilidade', 'A'),
      (v_atividade, 28, 'Feedback de falha na arquitetura', 'B'),
      (v_atividade, 29, 'Opinião estética', 'C'),
      (v_atividade, 30, 'Pista de erro grave', 'D'),
      (v_atividade, 31, 'Finalidade da ficha', 'B'),
      (v_atividade, 32, 'Campo de perfil', 'A'),
      (v_atividade, 33, 'Campo de necessidade primária', 'C'),
      (v_atividade, 34, 'Campo de solução', 'D'),
      (v_atividade, 35, 'Confirmação de envio', 'B'),
      (v_atividade, 36, 'Objetivo do feedback', 'A'),
      (v_atividade, 37, 'Aplicativo de transporte', 'D'),
      (v_atividade, 38, 'Impacto emocional da decisão', 'C'),
      (v_atividade, 39, 'Definição de empatia', 'B'),
      (v_atividade, 40, 'Empatia como ferramenta técnica', 'A'),
      (v_atividade, 41, 'Pesquisa prévia', 'C'),
      (v_atividade, 42, 'Cultura UCD total', 'D'),
      (v_atividade, 43, 'Causa das interfaces difíceis', 'B'),
      (v_atividade, 44, 'Sobrecarga mental', 'A'),
      (v_atividade, 45, 'Necessidade primária de Dona Lúcia', 'C'),
      (v_atividade, 46, 'Problema central do cenário', 'D'),
      (v_atividade, 47, 'Desempenho comparativo', 'B'),
      (v_atividade, 48, 'Ordem da pesquisa', 'A'),
      (v_atividade, 49, 'Textos minúsculos', 'C'),
      (v_atividade, 50, 'Síntese da aula', 'D');
end $$;
