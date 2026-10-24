-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 17
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 17 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Prototipagem: storyboard e protótipos de papel', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Prototipagem: storyboard e protótipos de papel (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-17-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Objetivo de prototipar', 'A'),
      (v_atividade, 2, 'Definição de storyboard', 'C'),
      (v_atividade, 3, 'Elementos do storyboard', 'B'),
      (v_atividade, 4, 'Quadro que mostra a dor', 'D'),
      (v_atividade, 5, 'Custo na etapa de papel', 'A'),
      (v_atividade, 6, 'Efeito de prototipar no papel', 'B'),
      (v_atividade, 7, 'Motivo do baixo custo no papel', 'D'),
      (v_atividade, 8, 'Foco do protótipo de papel', 'C'),
      (v_atividade, 9, 'Função das notas adesivas', 'A'),
      (v_atividade, 10, 'Função das tiras', 'B'),
      (v_atividade, 11, 'Vantagem do papel', 'C'),
      (v_atividade, 12, 'Papel do homem-computador', 'D'),
      (v_atividade, 13, 'Quem registra as hesitações', 'A'),
      (v_atividade, 14, 'Quem acolhe o testador', 'B'),
      (v_atividade, 15, 'Formulação correta da tarefa', 'D'),
      (v_atividade, 16, 'Por que não indicar o botão', 'C'),
      (v_atividade, 17, 'Iteração a lápis', 'A'),
      (v_atividade, 18, 'Ordem do ciclo iterativo', 'B'),
      (v_atividade, 19, 'Mudança no caso de agendamento', 'C'),
      (v_atividade, 20, 'Resultado do reteste', 'D'),
      (v_atividade, 21, 'Diagnóstico do ajuste de fluxo', 'A'),
      (v_atividade, 22, 'Ação física do ajuste', 'D'),
      (v_atividade, 23, 'Diagnóstico rápido do logotipo', 'B'),
      (v_atividade, 24, 'Vocabulário: simulação', 'C'),
      (v_atividade, 25, 'Vocabulário: prototipagem', 'A'),
      (v_atividade, 26, 'Vocabulário: fidelidade', 'B'),
      (v_atividade, 27, 'Origem do storyboard', 'D'),
      (v_atividade, 28, 'Razão de definir o escopo', 'C'),
      (v_atividade, 29, 'Objetivo do escopo', 'A'),
      (v_atividade, 30, 'Definição de facilitador', 'B'),
      (v_atividade, 31, 'Definição de homem-computador', 'D'),
      (v_atividade, 32, 'Definição de storyboard no quadro de conceitos', 'C'),
      (v_atividade, 33, 'Papéis na sessão de teste', 'A'),
      (v_atividade, 34, 'Recorte dinâmico de menu', 'B'),
      (v_atividade, 35, 'Simulação de alerta', 'C'),
      (v_atividade, 36, 'Simulação de campo digitado', 'D'),
      (v_atividade, 37, 'Foco do storyboard', 'A'),
      (v_atividade, 38, 'Ordem da narrativa', 'B'),
      (v_atividade, 39, 'Regra de ouro do homem-computador', 'D'),
      (v_atividade, 40, 'Prejuízo de programar direto', 'C'),
      (v_atividade, 41, 'Ilusão do código direto', 'A'),
      (v_atividade, 42, 'O que vem na aula 18', 'B'),
      (v_atividade, 43, 'Função do storyboard', 'C'),
      (v_atividade, 44, 'Ação do homem-computador', 'D'),
      (v_atividade, 45, 'Poder do lápis e da borracha', 'A'),
      (v_atividade, 46, 'Nome alternativo da técnica', 'C'),
      (v_atividade, 47, 'Vantagem da baixa fidelidade', 'B'),
      (v_atividade, 48, 'Função da folha A4', 'D'),
      (v_atividade, 49, 'Custo em produção', 'A'),
      (v_atividade, 50, 'Dica sobre o segundo testador', 'B');
end $$;
