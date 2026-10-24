-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 13
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 13 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Usabilidade: friendly e intuitividade', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Usabilidade: friendly e intuitividade (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-13-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de usabilidade', 'A'),
      (v_atividade, 2, 'Pilar da eficácia', 'C'),
      (v_atividade, 3, 'Pilar da eficiência', 'B'),
      (v_atividade, 4, 'Pilar da satisfação', 'D'),
      (v_atividade, 5, 'Interface amigável', 'A'),
      (v_atividade, 6, 'Pilar clara', 'B'),
      (v_atividade, 7, 'Pilar paciente', 'C'),
      (v_atividade, 8, 'Conceito de intuitividade', 'A'),
      (v_atividade, 9, 'Convenção do ícone de casinha', 'D'),
      (v_atividade, 10, 'Convenção da lixeira', 'B'),
      (v_atividade, 11, 'Curva de aprendizado', 'A'),
      (v_atividade, 12, 'Primeiro contato', 'C'),
      (v_atividade, 13, 'Redução de esforço', 'D'),
      (v_atividade, 14, 'Visibilidade do status do sistema', 'B'),
      (v_atividade, 15, 'Feedback de progresso', 'A'),
      (v_atividade, 16, 'Feedback de confirmação', 'C'),
      (v_atividade, 17, 'Alerta imediato', 'B'),
      (v_atividade, 18, 'Prevenção ativa', 'D'),
      (v_atividade, 19, 'Máscara de digitação', 'A'),
      (v_atividade, 20, 'Confirmação de destruição', 'C'),
      (v_atividade, 21, 'Mensagem construtiva', 'B'),
      (v_atividade, 22, 'Função da mensagem de erro', 'D'),
      (v_atividade, 23, 'Foco no campo com erro', 'A'),
      (v_atividade, 24, 'Rótulo permanente', 'C'),
      (v_atividade, 25, 'Regras prévias', 'B'),
      (v_atividade, 26, 'Clareza dos botões', 'A'),
      (v_atividade, 27, 'Botão com ação clara', 'D'),
      (v_atividade, 28, 'Ação primária', 'C'),
      (v_atividade, 29, 'Termos simples', 'B'),
      (v_atividade, 30, 'Efeito do jargão', 'A'),
      (v_atividade, 31, 'Concentração de atrito', 'D'),
      (v_atividade, 32, 'Primeira etapa da auditoria', 'B'),
      (v_atividade, 33, 'Etapa após o checklist', 'C'),
      (v_atividade, 34, 'Correção do botão "Processar"', 'A'),
      (v_atividade, 35, 'Primeiro passo da correção', 'D'),
      (v_atividade, 36, 'Retorno após a ação', 'B'),
      (v_atividade, 37, 'Número de passos da correção', 'C'),
      (v_atividade, 38, 'Usabilidade como métrica de qualidade', 'A'),
      (v_atividade, 39, 'Debate: o usuário erra?', 'D'),
      (v_atividade, 40, 'Design centrado no usuário', 'B'),
      (v_atividade, 41, 'Critérios da ISO 9241-11', 'C'),
      (v_atividade, 42, 'Interface intuitiva', 'A'),
      (v_atividade, 43, 'Função da mensagem construtiva', 'B'),
      (v_atividade, 44, 'Prevenção em ações irreversíveis', 'D'),
      (v_atividade, 45, 'Teste de intuitividade', 'A'),
      (v_atividade, 46, 'Convenção da lupa', 'C'),
      (v_atividade, 47, 'Itens do checklist', 'B'),
      (v_atividade, 48, 'Eficiência comprometida', 'D'),
      (v_atividade, 49, 'Eficácia', 'C'),
      (v_atividade, 50, 'Medir usabilidade, não beleza', 'D');
end $$;
