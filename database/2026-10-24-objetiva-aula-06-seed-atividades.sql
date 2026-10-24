-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 6
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 6 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('User Interface: definição e tipos de interface', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — User Interface: definição e tipos de interface (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-06-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de User Interface', 'A'),
      (v_atividade, 2, 'Interface de mão dupla', 'B'),
      (v_atividade, 3, 'Definição de CLI', 'B'),
      (v_atividade, 4, 'Significado de WIMP', 'D'),
      (v_atividade, 5, 'Vantagem da CLI em scripts', 'B'),
      (v_atividade, 6, 'Limitação da CLI', 'B'),
      (v_atividade, 7, 'Onde a CLI ainda é muito usada', 'C'),
      (v_atividade, 8, 'Vantagem da GUI em relação à memória', 'D'),
      (v_atividade, 9, 'Desafio de projeto na GUI', 'B'),
      (v_atividade, 10, 'Ordem do processamento da voz', 'B'),
      (v_atividade, 11, 'Desafio das interfaces de voz', 'C'),
      (v_atividade, 12, 'Privacidade na voz', 'D'),
      (v_atividade, 13, 'Definição de NUI', 'B'),
      (v_atividade, 14, 'Sensor da NUI', 'A'),
      (v_atividade, 15, 'Multi-touch', 'C'),
      (v_atividade, 16, 'Ciclo de interação humano-máquina', 'D'),
      (v_atividade, 17, 'Diagnóstico de contexto', 'A'),
      (v_atividade, 18, 'Quadro comparativo de modalidades', 'B'),
      (v_atividade, 19, 'O contexto decide a interface', 'B'),
      (v_atividade, 20, 'Acessibilidade e leitores de tela', 'D'),
      (v_atividade, 21, 'Esforço de aprendizado', 'A'),
      (v_atividade, 22, 'Tocar música pela GUI', 'B'),
      (v_atividade, 23, 'Tocar música pela voz', 'C'),
      (v_atividade, 24, 'Pergunta sobre multimodalidade', 'D'),
      (v_atividade, 25, 'Estudo de caso: botões pequenos', 'A'),
      (v_atividade, 26, 'Estudo de caso: mensagens de erro', 'A'),
      (v_atividade, 27, 'Debate sobre o futuro', 'C'),
      (v_atividade, 28, 'Por que NUI se chama "natural"', 'A'),
      (v_atividade, 29, 'Quadro comparativo de modalidades', 'D'),
      (v_atividade, 30, 'Acessibilidade para surdos', 'D'),
      (v_atividade, 31, 'Sensor de biometria', 'C'),
      (v_atividade, 32, 'Ponto fraco da GUI', 'A'),
      (v_atividade, 33, 'Ponto fraco da VUI', 'A'),
      (v_atividade, 34, 'Ponto fraco da NUI', 'C'),
      (v_atividade, 35, 'Melhor uso da VUI', 'D'),
      (v_atividade, 36, 'Público leigo e CLI', 'A'),
      (v_atividade, 37, 'Conceito de modalidade', 'C'),
      (v_atividade, 38, 'Saída da interface', 'C'),
      (v_atividade, 39, 'Evolução: década de 1980', 'B'),
      (v_atividade, 40, 'Evolução: anos 1960 e 1970', 'A'),
      (v_atividade, 41, 'Evolução: anos 2000 e 2010', 'B'),
      (v_atividade, 42, 'Evolução: dias atuais', 'D'),
      (v_atividade, 43, 'Consequência de uma escolha errada', 'C'),
      (v_atividade, 44, 'Acessibilidade motora', 'C'),
      (v_atividade, 45, 'Conceito de interface multimodal', 'B'),
      (v_atividade, 46, 'Conceito de interação', 'D'),
      (v_atividade, 47, 'Importância do contraste', 'A'),
      (v_atividade, 48, 'Ícones universais', 'A'),
      (v_atividade, 49, 'Janelas e multitarefa', 'D'),
      (v_atividade, 50, 'Próxima aula', 'C');
end $$;
