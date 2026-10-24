-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 9
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 9 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Eventos e navegação na interface', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Eventos e navegação na interface (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-09-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Evento em UI', 'A'),
      (v_atividade, 2, 'Toque longo', 'C'),
      (v_atividade, 3, 'Deslize', 'B'),
      (v_atividade, 4, 'Feedback no vidro liso', 'D'),
      (v_atividade, 5, 'Canal sonoro', 'A'),
      (v_atividade, 6, 'Resposta tátil', 'B'),
      (v_atividade, 7, 'Estados de componentes', 'C'),
      (v_atividade, 8, 'Estado ativo', 'D'),
      (v_atividade, 9, 'Anel de foco', 'B'),
      (v_atividade, 10, 'Botão desabilitado', 'A'),
      (v_atividade, 11, 'Componente desabilitado e eventos', 'C'),
      (v_atividade, 12, 'Fluxo de navegação', 'D'),
      (v_atividade, 13, 'Perguntas do usuário', 'A'),
      (v_atividade, 14, 'Barra inferior', 'B'),
      (v_atividade, 15, 'Trilha (breadcrumb)', 'D'),
      (v_atividade, 16, 'Beco sem saída', 'C'),
      (v_atividade, 17, 'Mapa de navegação', 'A'),
      (v_atividade, 18, 'Transição push', 'B'),
      (v_atividade, 19, 'Transição modal', 'C'),
      (v_atividade, 20, 'Transição fade', 'D'),
      (v_atividade, 21, 'Arquitetura de informação', 'B'),
      (v_atividade, 22, 'Níveis da arquitetura', 'A'),
      (v_atividade, 23, 'Prototipagem rápida', 'D'),
      (v_atividade, 24, 'Tabela de eventos', 'C'),
      (v_atividade, 25, 'Checklist de desorientação', 'B'),
      (v_atividade, 26, 'Erro crítico de navegação', 'A'),
      (v_atividade, 27, 'Padrão de navegação', 'C'),
      (v_atividade, 28, 'Ordem do agendamento', 'D'),
      (v_atividade, 29, 'Horários ocupados', 'A'),
      (v_atividade, 30, 'Confirmação com carregamento', 'B'),
      (v_atividade, 31, 'Matriz de transição', 'D'),
      (v_atividade, 32, 'Consistência da navegação', 'C'),
      (v_atividade, 33, 'Definição de feedback', 'A'),
      (v_atividade, 34, 'Definição de fluxo', 'B'),
      (v_atividade, 35, 'Evento em um card', 'C'),
      (v_atividade, 36, 'Clique em anúncio', 'D'),
      (v_atividade, 37, 'Foco por teclado', 'B'),
      (v_atividade, 38, 'Tela de Termos de Uso', 'A'),
      (v_atividade, 39, 'Nível de categoria', 'C'),
      (v_atividade, 40, 'Hover', 'D'),
      (v_atividade, 41, 'Animação em componente desabilitado', 'A'),
      (v_atividade, 42, 'Arquivar mensagem', 'B'),
      (v_atividade, 43, 'Toque sem resposta', 'D'),
      (v_atividade, 44, 'Tríade de orientação', 'C'),
      (v_atividade, 45, 'Mapa de navegação mobile', 'A'),
      (v_atividade, 46, 'Formulário temporário', 'B'),
      (v_atividade, 47, 'Evento principal', 'C'),
      (v_atividade, 48, 'Feedback nos cinco estados', 'D'),
      (v_atividade, 49, 'Próxima ação após o horário', 'B'),
      (v_atividade, 50, 'Barra inferior versus gavetas', 'A');
end $$;
