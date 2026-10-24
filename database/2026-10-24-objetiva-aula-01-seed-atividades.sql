-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 1
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 1 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Princípios de design: definição e evolução histórica', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Princípios de design: definição e evolução histórica (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de design', 'A'),
      (v_atividade, 2, 'Tela bonita, botão perdido', 'C'),
      (v_atividade, 3, 'Design funcional', 'B'),
      (v_atividade, 4, 'Marco de Gutenberg', 'D'),
      (v_atividade, 5, 'Origem do design gráfico comercial', 'A'),
      (v_atividade, 6, 'Premissa da Bauhaus', 'B'),
      (v_atividade, 7, 'Contribuição do Estilo Suíço', 'C'),
      (v_atividade, 8, 'O desafio da linha de comando', 'A'),
      (v_atividade, 9, 'A ideia da interface gráfica', 'D'),
      (v_atividade, 10, 'A metáfora da área de trabalho', 'B'),
      (v_atividade, 11, 'As primeiras páginas da web', 'A'),
      (v_atividade, 12, 'Meio impresso e tela digital', 'C'),
      (v_atividade, 13, 'Fase do ciclo de adaptação', 'D'),
      (v_atividade, 14, 'Ajuste da virada mobile', 'B'),
      (v_atividade, 15, 'Objetivo do esqueumorfismo', 'A'),
      (v_atividade, 16, 'Característica do Flat Design', 'C'),
      (v_atividade, 17, 'Noção trazida pelo Material Design', 'B'),
      (v_atividade, 18, 'Foco do design inclusivo', 'D'),
      (v_atividade, 19, 'Tecnologia e necessidades humanas', 'A'),
      (v_atividade, 20, 'Regra de ouro', 'C'),
      (v_atividade, 21, 'Intenção de projeto', 'B'),
      (v_atividade, 22, 'Definição de interface', 'D'),
      (v_atividade, 23, 'Causa do botão que ninguém vê', 'A'),
      (v_atividade, 24, 'Solução para o botão', 'B'),
      (v_atividade, 25, 'Etapa que centra o projeto no ser humano', 'C'),
      (v_atividade, 26, 'Virada mobile e o dedo', 'D'),
      (v_atividade, 27, 'Associação de termos', 'A'),
      (v_atividade, 28, 'Definição de GUI', 'B'),
      (v_atividade, 29, 'Origem do modo escuro', 'C'),
      (v_atividade, 30, 'Significado de desígnio', 'D'),
      (v_atividade, 31, 'O que o design equilibra', 'A'),
      (v_atividade, 32, 'Marco de 1957', 'B'),
      (v_atividade, 33, 'Marco de 1880', 'C'),
      (v_atividade, 34, 'Ordem cronológica dos marcos', 'A'),
      (v_atividade, 35, 'O que a Xerox PARC concebeu', 'D'),
      (v_atividade, 36, 'Por que o botão é um problema', 'B'),
      (v_atividade, 37, 'Exemplos de tarefas do design funcional', 'A'),
      (v_atividade, 38, 'Primeira etapa da consultoria', 'C'),
      (v_atividade, 39, 'Missão do aluno consultor na SA 1', 'D'),
      (v_atividade, 40, 'Competências do curso', 'B'),
      (v_atividade, 41, 'Função da padronização de Gutenberg', 'A'),
      (v_atividade, 42, 'Elementos familiares da GUI', 'C'),
      (v_atividade, 43, 'Limitação técnica da web nos anos 1990', 'B'),
      (v_atividade, 44, 'Característica do meio impresso', 'D'),
      (v_atividade, 45, 'Mudança trazida pela Revolução Industrial', 'A'),
      (v_atividade, 46, 'Objetivo estratégico do sistema', 'C'),
      (v_atividade, 47, 'Etapa de storyboard e teste em papel', 'B'),
      (v_atividade, 48, 'Fase de recursos sem critério', 'D'),
      (v_atividade, 49, 'Gesto natural da tela sensível ao toque', 'D'),
      (v_atividade, 50, 'Origem do tamanho dinâmico da fonte', 'C');
end $$;
