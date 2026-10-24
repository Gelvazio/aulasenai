-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 16
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 16 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Determinação de escopo do projeto de interface', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Determinação de escopo do projeto de interface (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-16-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de escopo', 'A'),
      (v_atividade, 2, 'Fronteira do sistema', 'B'),
      (v_atividade, 3, 'Conceito de prioridade', 'C'),
      (v_atividade, 4, 'Delimitação', 'D'),
      (v_atividade, 5, 'Critério para incluir um recurso', 'B'),
      (v_atividade, 6, 'Jornada crítica', 'A'),
      (v_atividade, 7, 'Critério de corte', 'D'),
      (v_atividade, 8, 'Matriz valor × esforço', 'C'),
      (v_atividade, 9, 'Camada Essencial (Must)', 'C'),
      (v_atividade, 10, 'Camada Fora de Escopo (Won''t)', 'D'),
      (v_atividade, 11, 'Risco do inchaço de escopo', 'A'),
      (v_atividade, 12, 'Escopo enxuto e UX', 'B'),
      (v_atividade, 13, 'Desafio do estudo de caso', 'D'),
      (v_atividade, 14, 'Item que entra na versão 1', 'C'),
      (v_atividade, 15, 'Ordem da jornada crítica', 'B'),
      (v_atividade, 16, 'Seção de exclusões', 'A'),
      (v_atividade, 17, 'Declaração de objetivo', 'A'),
      (v_atividade, 18, 'Entregas obrigatórias (In)', 'C'),
      (v_atividade, 19, 'Limites expressos (Out)', 'B'),
      (v_atividade, 20, 'Pergunta diante de um pedido novo', 'D'),
      (v_atividade, 21, 'Por que listar o que não será feito', 'B'),
      (v_atividade, 22, 'Inchaço de escopo (scope creep)', 'D'),
      (v_atividade, 23, 'Análise cruzada', 'A'),
      (v_atividade, 24, 'Exequibilidade', 'C'),
      (v_atividade, 25, 'Vantagem do escopo focado', 'C'),
      (v_atividade, 26, 'Conceito de fronteira', 'A'),
      (v_atividade, 27, 'Conceito de prioridade', 'B'),
      (v_atividade, 28, 'Conceito de escopo', 'D'),
      (v_atividade, 29, 'Conceito de inchaço', 'D'),
      (v_atividade, 30, 'Dizer não com critério', 'B'),
      (v_atividade, 31, 'Aprovação com empatia', 'C'),
      (v_atividade, 32, 'Validação de escopo', 'A'),
      (v_atividade, 33, 'Efeito de um escopo focado', 'A'),
      (v_atividade, 34, 'Foco no usuário', 'D'),
      (v_atividade, 35, 'Debate sobre o quiz na tela inicial', 'C'),
      (v_atividade, 36, 'Alternativa recomendada no debate', 'B'),
      (v_atividade, 37, 'Documento de escopo assinado', 'B'),
      (v_atividade, 38, 'Requisitos claros para a aula 17', 'C'),
      (v_atividade, 39, 'Sequência para a aula 17', 'D'),
      (v_atividade, 40, 'Objetivo da matriz valor × esforço', 'A'),
      (v_atividade, 41, 'Importância atribuída pelos usuários', 'C'),
      (v_atividade, 42, 'Funcionalidade de menor importância', 'D'),
      (v_atividade, 43, 'Reclamação dos usuários', 'B'),
      (v_atividade, 44, 'Cuidado ao cortar uma ideia', 'A'),
      (v_atividade, 45, 'Exclusão típica da versão 1', 'D'),
      (v_atividade, 46, 'Objetivo da busca por inchaço', 'A'),
      (v_atividade, 47, 'Clareza do escopo para a equipe', 'B'),
      (v_atividade, 48, 'Passo após o escopo aprovado', 'C'),
      (v_atividade, 49, 'Regra de ouro da fronteira', 'A'),
      (v_atividade, 50, 'Camada Desejável (Could)', 'B');
end $$;
