-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Oficinas de Impressão 3D e Robótica' and a.numero = 8
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 8 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 08', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 08 (10 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/OFICINAS_IMPRESSAO_3D_ROBOTICA/ATIVIDADES/ATIVIDADE-PRATICA-AULA-08.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Escreva em uma frase o problema da equipe e a peça que resolve esse problema.', 0.4, 'Exemplo: "O sensor está solto e balança; a equipe precisa de um suporte de sensor impresso em 3D para prendê-lo firme na frente do robô." Aceitar outra peça coerente com o problema descrito.', 'Nota cheia: problema claro e peça que o resolve. Metade: só o problema ou só a peça. Zero: em branco ou sem relação.'),
      (v_atividade, 1, 2, 'Cite duas perguntas-guia que a equipe deve responder antes de modelar.', 0.3, 'As perguntas-guia da aula: que tarefa o robô vai cumprir? Que peça falta?', 'Nota cheia: as duas perguntas (com as próprias palavras). Metade: uma. Zero: nenhuma ou fora do tema.'),
      (v_atividade, 1, 3, 'Cite dois exemplos de peça que uma equipe pode imprimir para um robô, além do suporte de sensor.', 0.3, 'Dois entre: para-choque, garra, roda, carcaça.', 'Nota cheia: dois exemplos coerentes. Metade: um. Zero: nenhum (suporte de sensor não conta).'),
      (v_atividade, 2, 1, 'Indique qual ideia a equipe deve escolher e justifique com o critério visto na aula.', 0.4, 'A ideia 1, o suporte simples. A aula diz que uma peça simples e testável vale mais que uma peça complexa que não termina.', 'Nota cheia: escolhe o suporte e justifica pela simplicidade/testabilidade. Metade: escolhe certo sem justificar. Zero: escolhe a garra.'),
      (v_atividade, 2, 2, 'Explique o risco de escolher uma peça complexa demais para o tempo da oficina.', 0.3, 'A peça não ficar pronta no tempo, e a equipe chegar ao fim sem protótipo funcionando para testar e apresentar.', 'Nota cheia: cita não terminar/não ter nada funcionando. Metade: resposta vaga (ex.: "dá trabalho"). Zero: sem relação.'),
      (v_atividade, 2, 3, 'Diga que característica a peça escolhida precisa ter para que o resultado possa ser comprovado no robô.', 0.3, 'Ser simples e testável: dá para imprimir, montar no robô e verificar se funciona.', 'Nota cheia: cita testável (ou comprovável) e simples. Metade: só um. Zero: sem relação.'),
      (v_atividade, 3, 1, 'Liste os quatro papéis da equipe no projeto integrado.', 0.4, 'Modelagem, impressão, programação e documentação.', 'Nota cheia: os quatro papéis. Metade: dois ou três. Zero: um ou nenhum.'),
      (v_atividade, 3, 2, 'Descreva em uma frase o que cada papel faz.', 0.3, 'Modelagem: desenha a peça no software 3D. Impressão: fatia e imprime. Programação: faz o programa do robô e depura. Documentação: registra o processo, as mudanças e as fotos.', 'Nota cheia: função coerente para os quatro papéis. Metade: para dois ou três. Zero: uma ou nenhuma.'),
      (v_atividade, 3, 3, 'Explique por que a documentação não pode ficar sem responsável.', 0.3, 'Porque o registro de cada mudança (o que mudou e por quê) será mostrado na apresentação; sem registro a equipe perde o histórico e não consegue explicar o projeto.', 'Nota cheia: liga a documentação à apresentação/prova do processo. Metade: resposta genérica. Zero: sem relação.'),
      (v_atividade, 4, 1, 'Explique por que o robô deve ser medido antes de modelar a peça.', 0.4, 'Porque a peça precisa se encaixar nas medidas reais do robô (furos de fixação, distâncias e espaço livre); modelar sem medir gera peça que não serve e obriga a imprimir de novo.', 'Nota cheia: cita medidas reais/encaixe e o retrabalho. Metade: só um. Zero: sem relação.'),
      (v_atividade, 4, 2, 'Indique que ferramenta a equipe pode usar para medir e três medidas que deve anotar.', 0.3, 'Paquímetro ou régua. Medidas: furos de fixação, distância entre pontos e espaço livre.', 'Nota cheia: ferramenta correta e três medidas. Metade: ferramenta e uma ou duas medidas. Zero: sem ferramenta e sem medidas.'),
      (v_atividade, 4, 3, 'Diga em que unidade as medidas devem ser anotadas para serem usadas na modelagem.', 0.3, 'Em milímetros (mm).', 'Nota cheia: milímetros. Zero: outra unidade ou em branco.'),
      (v_atividade, 5, 1, 'Explique o que é folga de encaixe e por que a impressão exige essa folga.', 0.4, 'Folga é uma pequena diferença a mais de medida no encaixe, para as peças se juntarem; a impressão tem tolerância, então peças com a mesma medida podem não encaixar.', 'Nota cheia: define folga e cita a tolerância da impressão. Metade: só um. Zero: sem relação.'),
      (v_atividade, 5, 2, 'Indique a faixa de folga recomendada na aula para encaixes.', 0.3, 'De 0,2 a 0,4 mm.', 'Nota cheia: faixa de 0,2 a 0,4 mm. Metade: indica um valor dentro da faixa. Zero: valor fora da faixa ou em branco.'),
      (v_atividade, 5, 3, 'Diga o que a equipe deve alterar no modelo e o que deve fazer em seguida para resolver o encaixe.', 0.3, 'Ajustar a medida no modelo, dando folga ao furo (ex.: furo de 3,2 a 3,4 mm), e imprimir de novo.', 'Nota cheia: ajustar o modelo com folga e reimprimir. Metade: só um dos dois. Zero: sem relação.'),
      (v_atividade, 6, 1, 'Explique por que o peso da peça deve ser verificado antes de montá-la no robô.', 0.4, 'Porque peça pesada demais atrapalha o motor e a bateria do robô.', 'Nota cheia: liga o peso ao prejuízo no robô (motor/bateria). Metade: resposta vaga. Zero: sem relação.'),
      (v_atividade, 6, 2, 'Indique quais componentes do robô sofrem com uma peça pesada demais.', 0.3, 'O motor e a bateria.', 'Nota cheia: motor e bateria. Metade: um deles. Zero: nenhum.'),
      (v_atividade, 6, 3, 'Proponha uma decisão para a equipe resolver o problema do peso.', 0.3, 'Exemplo: ajustar o projeto para uma peça menor ou mais leve e imprimir de novo, verificando o peso antes de montar.', 'Nota cheia: decisão coerente para reduzir o peso. Metade: decisão vaga. Zero: sem relação ou manter o problema.'),
      (v_atividade, 7, 1, 'Indique a espessura mínima de parede recomendada na aula e diga se o projeto atende.', 0.4, 'Paredes de pelo menos 1,2 mm. O projeto não atende, pois tem 0,8 mm.', 'Nota cheia: 1,2 mm e conclusão de que não atende. Metade: só um. Zero: sem relação.'),
      (v_atividade, 7, 2, 'Explique o problema da aba suspensa e como evitá-la.', 0.3, 'Parte suspensa fica sem apoio e exige suportes; deve-se evitar partes suspensas para dispensar suportes (redesenhando a peça).', 'Nota cheia: cita falta de apoio/suporte e como evitar. Metade: só um. Zero: sem relação.'),
      (v_atividade, 7, 3, 'Explique como a face plana deve ficar posicionada na impressão.', 0.3, 'A face plana deve ficar de apoio sobre a mesa de impressão.', 'Nota cheia: face plana apoiada na mesa. Zero: outra posição ou em branco.'),
      (v_atividade, 8, 1, 'Explique o que é imprimir primeiro uma versão pequena ou simplificada da peça.', 0.4, 'É imprimir antes um protótipo pequeno ou simplificado da peça, só para testar o encaixe, antes de imprimir a versão final.', 'Nota cheia: versão pequena/simplificada e objetivo de testar. Metade: só um. Zero: sem relação.'),
      (v_atividade, 8, 2, 'Indique o que a equipe testa com esse protótipo.', 0.3, 'O encaixe da peça no robô (medidas, furos e folgas).', 'Nota cheia: encaixe. Metade: resposta vaga (ex.: "se funciona"). Zero: sem relação.'),
      (v_atividade, 8, 3, 'Explique qual vantagem isso traz para o tempo e o material da equipe.', 0.3, 'Gasta menos tempo e menos filamento: se o encaixe estiver errado, descobre-se cedo, sem perder uma peça grande.', 'Nota cheia: tempo e material, ou erro descoberto cedo. Metade: só um. Zero: sem relação.'),
      (v_atividade, 9, 1, 'Explique como depurar o programa para achar o erro.', 0.4, 'Depurar o programa trecho por trecho, testando cada parte para achar onde o comportamento foge do previsto.', 'Nota cheia: trecho por trecho e comparar com o previsto. Metade: só um. Zero: sem relação.'),
      (v_atividade, 9, 2, 'Diga o que fazer quando o problema for o encaixe da peça, e não o programa.', 0.3, 'Ajustar a medida no modelo e imprimir de novo.', 'Nota cheia: ajustar o modelo e reimprimir. Metade: só um. Zero: sem relação.'),
      (v_atividade, 9, 3, 'Explique o que registrar a cada mudança e por que isso será útil depois.', 0.3, 'Registrar o que mudou e por quê, porque isso será mostrado na apresentação (e ajuda a lembrar o caminho do projeto).', 'Nota cheia: o que mudou e por quê, mais a utilidade. Metade: só um. Zero: sem relação.'),
      (v_atividade, 10, 1, 'Liste os três itens da entrega da aula.', 0.4, 'Protótipo com a peça impressa funcionando, o arquivo STL e o registro dos ajustes.', 'Nota cheia: os três itens. Metade: dois. Zero: um ou nenhum.'),
      (v_atividade, 10, 2, 'Dê um exemplo de erro que uma equipe pode encontrar ao integrar a peça ao robô e diga como corrigi-lo.', 0.3, 'Exemplo: a peça não encaixou; corrige-se ajustando a medida no modelo e imprimindo de novo. Ou: o robô não se comportou como previsto; corrige-se depurando o programa trecho por trecho.', 'Nota cheia: erro coerente e correção coerente com a aula. Metade: só o erro ou só a correção. Zero: sem relação.'),
      (v_atividade, 10, 3, 'Explique por que o professor confere os protótipos antes da Aula 9.', 0.3, 'Para saber se cada protótipo está pronto e funcionando para a apresentação da Aula 9.', 'Nota cheia: liga a conferência à apresentação. Metade: resposta vaga. Zero: sem relação.');
end $$;
