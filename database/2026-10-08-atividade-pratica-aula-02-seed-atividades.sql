-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho' and a.numero = 2
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 2 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 02', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 02 (10 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/ATIVIDADES/ATIVIDADE-PRATICA-AULA-02.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Cite as 4 atitudes da escuta ativa.', 0.5, 'Prestar atenção, mostrar que está ouvindo, confirmar e perguntar.', 'Nota cheia: as quatro. Metade: duas ou três. Zero: uma ou nenhuma.'),
      (v_atividade, 1, 2, 'Escreva uma resposta do aprendiz que confirme a tarefa e faça uma pergunta útil.', 0.5, 'Exemplo: "Então são os 30 robôs do lote 18, antes do almoço. O que devo conferir em cada um?"', 'Nota cheia: confirma os dados e faz pergunta pertinente. Metade: só um dos dois. Zero: nenhum.'),
      (v_atividade, 2, 1, 'Aponte duas atitudes de Pedro que prejudicam a escuta.', 0.5, 'Olhar o celular, bocejar e interromper (quaisquer duas).', 'Nota cheia: duas atitudes certas. Metade: uma. Zero: nenhuma.'),
      (v_atividade, 2, 2, 'Descreva como Pedro deveria agir para praticar a escuta ativa.', 0.5, 'Guardar o celular, olhar para o colega, ouvir até o fim, acenar/dizer "entendi", confirmar e perguntar.', 'Nota cheia: pelo menos três atitudes corretas. Metade: duas. Zero: uma ou nenhuma.'),
      (v_atividade, 3, 1, 'Escreva um feedback no modelo sanduíche.', 0.5, 'Exemplo: "Você falou com segurança! Os slides ficaram com letra pequena e muito texto; com letra maior e tópicos, a apresentação fica ótima."', 'Nota cheia: positivo + ponto a melhorar específico + incentivo. Metade: falta uma parte. Zero: crítica ofensiva ou vaga.'),
      (v_atividade, 3, 2, 'Explique por que o feedback deve falar do fato e não da pessoa.', 0.5, 'Porque ajuda a pessoa a saber o que mudar sem se sentir atacada, evitando conflito.', 'Nota cheia: cita melhoria e respeito/evitar conflito. Metade: só um. Zero: sem relação.'),
      (v_atividade, 4, 1, 'Escreva sua resposta à supervisora.', 0.5, 'Exemplo: "Obrigado pelo retorno! Vou incluir o aviso de segurança no passo 3 ainda hoje."', 'Nota cheia: agradece e diz o que vai fazer. Metade: só um. Zero: se defende ou ignora.'),
      (v_atividade, 4, 2, 'Cite duas atitudes erradas ao receber um feedback.', 0.5, 'Interromper para se defender, ficar bravo, fingir que ouviu e não mudar, culpar outros (quaisquer duas).', 'Nota cheia: duas atitudes. Metade: uma. Zero: nenhuma.'),
      (v_atividade, 5, 1, 'Defina 4 papéis para a equipe e a função de cada um.', 0.5, 'Exemplo: coordenador (organiza e acompanha), relator/registro (anota decisões), controlador de tempo (prazos), apresentador (fala na apresentação).', 'Nota cheia: quatro papéis com função coerente. Metade: dois ou três. Zero: um ou nenhum.'),
      (v_atividade, 5, 2, 'Explique por que a equipe precisa de papéis e prazos.', 0.5, 'Para cada um saber sua responsabilidade, nada ficar sem fazer e a entrega sair no tempo certo.', 'Nota cheia: responsabilidade + prazo/organização. Metade: só um. Zero: sem relação.'),
      (v_atividade, 6, 1, 'Escreva 4 regras de convivência para a equipe.', 0.5, 'Exemplos: ouvir até o fim; avisar no grupo se atrasar; dividir as tarefas de forma justa; discordar com respeito; responder às mensagens da equipe.', 'Nota cheia: quatro regras claras e respeitosas. Metade: duas ou três. Zero: uma ou nenhuma.'),
      (v_atividade, 6, 2, 'Explique como a equipe vai conferir se o combinado está sendo cumprido.', 0.5, 'Exemplo: revisar o combinado numa conversa rápida no fim de cada semana e ajustar o que não funcionou.', 'Nota cheia: forma de conferência com momento definido. Metade: vaga. Zero: não explica.'),
      (v_atividade, 7, 1, 'Escreva uma frase para os colegas falarem com Lucas usando "eu", sem acusar.', 0.5, 'Exemplo: "Eu me sinto sem função quando a montagem é feita sem a gente. Podemos dividir as etapas?"', 'Nota cheia: fala do sentimento com "eu" e propõe diálogo. Metade: sem acusação mas vaga. Zero: acusa ou ofende.'),
      (v_atividade, 7, 2, 'Proponha uma solução boa para todos.', 0.5, 'Dividir as etapas da montagem, deixando Lucas na etapa em que é melhor (ex.: teste final), com prazo por etapa e aviso no grupo ao terminar.', 'Nota cheia: todos participam + aproveita a habilidade de Lucas + combinado. Metade: só divisão. Zero: punição ou exclusão.'),
      (v_atividade, 8, 1, 'Liste, em ordem, os 5 passos para resolver o conflito.', 0.5, '1. Acalmar e conversar em particular; 2. cada um fala o que sente, sem acusar; 3. ouvir o outro lado; 4. buscar solução boa para todos; 5. registrar o combinado e conferir depois.', 'Nota cheia: cinco passos na ordem. Metade: três ou quatro. Zero: menos de três.'),
      (v_atividade, 8, 2, 'Sugira uma solução para a bancada.', 0.5, 'Exemplo: revezamento por dia da semana, registrado numa escala no mural.', 'Nota cheia: solução justa e registrada. Metade: justa sem registro. Zero: injusta ou nenhuma.'),
      (v_atividade, 9, 1, 'Explique por que a segunda torre ficou mais alta.', 0.5, 'Porque a equipe conversou, planejou, dividiu papéis e controlou o tempo.', 'Nota cheia: cita comunicação e organização/papéis. Metade: só um. Zero: sem relação.'),
      (v_atividade, 9, 2, 'Relacione a dinâmica com o trabalho numa fábrica.', 0.5, 'Na fábrica, equipes que se comunicam e têm papéis definidos produzem mais, com menos erros e retrabalho.', 'Nota cheia: relação clara com produção/erros. Metade: relação vaga. Zero: sem relação.'),
      (v_atividade, 10, 1, 'Explique por que a mensagem pode piorar o clima da equipe.', 0.5, 'Porque generaliza, acusa todos em público e usa tom agressivo (exclamações), gerando conflito em vez de solução.', 'Nota cheia: cita acusação/generalização e tom. Metade: só um. Zero: diz que está adequada.'),
      (v_atividade, 10, 2, 'Reescreva a mensagem de forma clara e respeitosa, propondo uma solução.', 0.5, 'Exemplo: "Pessoal, estou com muitas tarefas. Podemos rever a divisão hoje às 16h?"', 'Nota cheia: respeitosa + fato + proposta. Metade: respeitosa sem proposta. Zero: continua agressiva.');
end $$;
