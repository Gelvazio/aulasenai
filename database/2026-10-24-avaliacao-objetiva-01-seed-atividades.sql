do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 1
    order by a.id limit 1;
  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao, pagina, total_itens, ativo)
    values ('Avaliação Objetiva 01 — Fundamentos de UI/UX', 'PENDENTE', v_aula, '2026-10-24',
      'Avaliação Objetiva — aulas 01 a 19 (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/AVALIACAO-OBJETIVA-01.html', 50, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id, descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;
  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O que é design de verdade (Aula 01)', 'A'),
      (v_atividade, 2, 'Forma e função (Aula 01)', 'C'),
      (v_atividade, 3, 'A revolução da Interface Gráfica (Aula 01)', 'B'),
      (v_atividade, 4, 'Esqueumorfismo (Aula 01)', 'D'),
      (v_atividade, 5, 'O papel das formas geométricas (Aula 02)', 'B'),
      (v_atividade, 6, 'Anatomia do botão de ação (Aula 02)', 'A'),
      (v_atividade, 7, 'Peso visual e hierarquia (Aula 02)', 'D'),
      (v_atividade, 8, 'Falha grave de contraste (Aula 03)', 'C'),
      (v_atividade, 9, 'Harmonias do círculo cromático (Aula 03)', 'A'),
      (v_atividade, 10, 'Significado funcional da cor (Aula 03)', 'B'),
      (v_atividade, 11, 'Análise crítica: fato, causa e efeito (Aula 04)', 'D'),
      (v_atividade, 12, 'Preferência pessoal × problema estrutural (Aula 04)', 'C'),
      (v_atividade, 13, 'Análise de cenários de uso (Aula 05)', 'B'),
      (v_atividade, 14, 'Cenário físico e decisões de projeto (Aula 05)', 'A'),
      (v_atividade, 15, 'User Interface: definição (Aula 06)', 'C'),
      (v_atividade, 16, 'Tipos de interface (Aula 06)', 'D'),
      (v_atividade, 17, 'Menor esforço para iniciantes (Aula 06)', 'A'),
      (v_atividade, 18, 'Padrão de leitura em F (Aula 07)', 'B'),
      (v_atividade, 19, 'Padrão de leitura em Z (Aula 07)', 'C'),
      (v_atividade, 20, 'Alinhamento e grades (Aula 07)', 'A'),
      (v_atividade, 21, 'Escala e hierarquia visual (Aula 08)', 'D'),
      (v_atividade, 22, 'Espaçamento e respiro (Aula 08)', 'B'),
      (v_atividade, 23, 'Repetição de padrões (Aula 08)', 'A'),
      (v_atividade, 24, 'Eventos e feedback visual (Aula 09)', 'C'),
      (v_atividade, 25, 'O botão fantasma (Aula 09)', 'D'),
      (v_atividade, 26, 'Rotas e fluxos de navegação (Aula 09)', 'B'),
      (v_atividade, 27, 'UI versus UX (Aula 10)', 'A'),
      (v_atividade, 28, 'Empatia no design centrado no usuário (Aula 10)', 'C'),
      (v_atividade, 29, 'O ciclo do design interativo (Aula 11)', 'D'),
      (v_atividade, 30, 'Da versão 1 à versão 2 (Aula 11)', 'B'),
      (v_atividade, 31, 'Público-alvo e objetivos (Aula 12)', 'A'),
      (v_atividade, 32, 'Pontos de atrito na jornada (Aula 12)', 'D'),
      (v_atividade, 33, 'Perguntas neutras na entrevista (Aula 12)', 'C'),
      (v_atividade, 34, 'O que é usabilidade (Aula 13)', 'B'),
      (v_atividade, 35, 'Intuitividade e modelo mental (Aula 13)', 'A'),
      (v_atividade, 36, 'De quem é o erro (Aula 13)', 'C'),
      (v_atividade, 37, 'Questionário × entrevista (Aula 14)', 'D'),
      (v_atividade, 38, 'Projetar sem dados é palpite (Aula 14)', 'B'),
      (v_atividade, 39, 'Coleta de feedbacks (Aula 15)', 'A'),
      (v_atividade, 40, 'Mediação de pedidos opostos (Aula 15)', 'B'),
      (v_atividade, 41, 'O que é escopo (Aula 16)', 'C'),
      (v_atividade, 42, 'Delimitar para focar no essencial (Aula 16)', 'D'),
      (v_atividade, 43, 'O papel do storyboard (Aula 17)', 'D'),
      (v_atividade, 44, 'Protótipo de papel (Aula 17)', 'C'),
      (v_atividade, 45, 'Por que testar no papel primeiro (Aula 17)', 'A'),
      (v_atividade, 46, 'Mock-up digital de alta fidelidade (Aula 18)', 'B'),
      (v_atividade, 47, 'Do papel ao mock-up (Aula 18)', 'D'),
      (v_atividade, 48, 'A armadilha da imagem na web (Aula 19)', 'B'),
      (v_atividade, 49, 'Creative Commons (Aula 19)', 'C'),
      (v_atividade, 50, 'Direito autoral e anterioridade (Aula 19)', 'A');
end $$;