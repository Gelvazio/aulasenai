-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 2
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 2 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Formas geométricas e regras de visualização dos elementos da interface', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Formas geométricas e regras de visualização dos elementos da interface (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-02-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Forma que delimita cartões', 'A'),
      (v_atividade, 2, 'Forma que indica direção', 'C'),
      (v_atividade, 3, 'Uso do círculo', 'B'),
      (v_atividade, 4, 'Por que o botão é retângulo', 'D'),
      (v_atividade, 5, 'Cantos vivos', 'A'),
      (v_atividade, 6, 'Proposta de cantos arredondados', 'B'),
      (v_atividade, 7, 'Efeito da pílula', 'C'),
      (v_atividade, 8, 'Botão de ação principal', 'A'),
      (v_atividade, 9, 'Regra de ouro dos botões', 'D'),
      (v_atividade, 10, 'Nível primário', 'B'),
      (v_atividade, 11, 'Nível terciário', 'A'),
      (v_atividade, 12, 'Nível secundário', 'C'),
      (v_atividade, 13, 'Posição que atrai o olhar', 'B'),
      (v_atividade, 14, 'Espaço vazio', 'D'),
      (v_atividade, 15, 'Equilíbrio simétrico', 'A'),
      (v_atividade, 16, 'Proposta sobre a tela de login', 'C'),
      (v_atividade, 17, 'Tensão visual', 'D'),
      (v_atividade, 18, 'Escala base', 'B'),
      (v_atividade, 19, 'Escala intermediária', 'A'),
      (v_atividade, 20, 'Escala de destaque', 'C'),
      (v_atividade, 21, 'Linha do tempo: pílula', 'B'),
      (v_atividade, 22, 'Linha do tempo: 1984', 'D'),
      (v_atividade, 23, 'Linha do tempo: hoje', 'A'),
      (v_atividade, 24, 'Primeiro passo do raio-x', 'C'),
      (v_atividade, 25, 'Problema do estudo de caso', 'B'),
      (v_atividade, 26, 'Proposta para o agendamento', 'D'),
      (v_atividade, 27, 'Área de toque', 'A'),
      (v_atividade, 28, 'Diagnóstico do botão', 'B'),
      (v_atividade, 29, 'Correção do botão', 'C'),
      (v_atividade, 30, 'Fatores do peso visual', 'D'),
      (v_atividade, 31, 'Contraste no peso visual', 'A'),
      (v_atividade, 32, 'Espaço no peso visual', 'B'),
      (v_atividade, 33, 'Definição de equilíbrio', 'C'),
      (v_atividade, 34, 'Definição de proporção', 'D'),
      (v_atividade, 35, 'Primeiro passo da análise', 'A'),
      (v_atividade, 36, 'Atitude diante das propostas da equipe', 'B'),
      (v_atividade, 37, 'Destaque unívoco', 'C'),
      (v_atividade, 38, 'Clareza de contêineres', 'D'),
      (v_atividade, 39, 'Ergonomia geométrica', 'A'),
      (v_atividade, 40, 'Debate sobre o app diário', 'B'),
      (v_atividade, 41, 'Primeiro foco de atenção', 'C'),
      (v_atividade, 42, 'Síntese da geometria', 'D'),
      (v_atividade, 43, 'Botão sólido e contorno', 'A'),
      (v_atividade, 44, 'Retângulos como contêineres', 'B'),
      (v_atividade, 45, 'Cantos arredondados', 'C'),
      (v_atividade, 46, 'Apresentação de ajustes', 'D'),
      (v_atividade, 47, 'Equilíbrio assimétrico', 'A'),
      (v_atividade, 48, 'Função do eixo central', 'B'),
      (v_atividade, 49, 'Nível terciário, outro exemplo', 'C'),
      (v_atividade, 50, 'Risco de dois botões sólidos', 'D');
end $$;
