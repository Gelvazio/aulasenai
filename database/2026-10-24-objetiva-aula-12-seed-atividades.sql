-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 12
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 12 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Jornada do usuário: objetivos do público-alvo e pesquisa', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Jornada do usuário: objetivos do público-alvo e pesquisa (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-12-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de público-alvo', 'A'),
      (v_atividade, 2, 'Projetar para todo mundo', 'B'),
      (v_atividade, 3, 'Objetivo primário', 'C'),
      (v_atividade, 4, 'Objetivo secundário', 'D'),
      (v_atividade, 5, 'Perfil com pressa', 'B'),
      (v_atividade, 6, 'Definição de jornada do usuário', 'A'),
      (v_atividade, 7, 'Além dos cliques', 'D'),
      (v_atividade, 8, 'Camada de pontos de atrito', 'C'),
      (v_atividade, 9, 'Camada de emoções', 'A'),
      (v_atividade, 10, 'Fases típicas da jornada digital', 'B'),
      (v_atividade, 11, 'Pico de estresse na curva de humor', 'C'),
      (v_atividade, 12, 'Etapa anterior à desistência', 'D'),
      (v_atividade, 13, 'Pesquisa quantitativa', 'A'),
      (v_atividade, 14, 'Pesquisa qualitativa', 'B'),
      (v_atividade, 15, 'Pergunta induzida', 'B'),
      (v_atividade, 16, 'Pergunta aberta e neutra', 'C'),
      (v_atividade, 17, 'Dica de entrevista', 'D'),
      (v_atividade, 18, 'Não defender o design', 'A'),
      (v_atividade, 19, 'Abraçar o silêncio', 'C'),
      (v_atividade, 20, 'Observar as reações', 'D'),
      (v_atividade, 21, 'Validação de pergunta neutra', 'B'),
      (v_atividade, 22, 'Objetivo da pergunta 1 do roteiro', 'A'),
      (v_atividade, 23, 'Objetivo da pergunta 2 do roteiro', 'C'),
      (v_atividade, 24, 'Regra de condução da pesquisa', 'A'),
      (v_atividade, 25, 'Anotação na simulação em duplas', 'D'),
      (v_atividade, 26, 'Tabulação dos relatos', 'B'),
      (v_atividade, 27, 'Primeiro passo diante da desistência', 'C'),
      (v_atividade, 28, 'Queda na etapa do calendário', 'A'),
      (v_atividade, 29, 'Atrito na seleção de horário', 'D'),
      (v_atividade, 30, 'Alvo de toque pequeno', 'B'),
      (v_atividade, 31, 'Campos excessivos', 'A'),
      (v_atividade, 32, 'Falta de feedback', 'C'),
      (v_atividade, 33, 'Transformar a dor em proposta visual', 'B'),
      (v_atividade, 34, 'Medo de o agendamento não ter sido feito', 'D'),
      (v_atividade, 35, 'Argumento diante do dono da clínica', 'A'),
      (v_atividade, 36, 'Coletar somente o essencial', 'B'),
      (v_atividade, 37, '"Você não é o seu usuário"', 'C'),
      (v_atividade, 38, 'Decisão baseada em fatos', 'D'),
      (v_atividade, 39, 'Sequência do mapeamento', 'A'),
      (v_atividade, 40, 'Jornada antes dos protótipos', 'B'),
      (v_atividade, 41, 'Recapitulação da aula', 'D'),
      (v_atividade, 42, 'Fase "entender" do ciclo', 'A'),
      (v_atividade, 43, 'Entender antes de desenhar', 'C'),
      (v_atividade, 44, 'Testar protótipos cedo', 'B'),
      (v_atividade, 45, 'Localizar pontos de atrito', 'A'),
      (v_atividade, 46, 'Vocabulário: atrito', 'D'),
      (v_atividade, 47, 'Vocabulário: público', 'C'),
      (v_atividade, 48, 'Vocabulário: pesquisa', 'B'),
      (v_atividade, 49, 'Destaque do objetivo primário', 'C'),
      (v_atividade, 50, 'Pergunta sobre o passado', 'D');
end $$;
