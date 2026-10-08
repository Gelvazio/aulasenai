-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 1
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 1 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 01 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 01 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-01.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Resposta com a compreensão global e as três informações específicas.', 1.0, 'Compreensão global: a notícia informa que Rio do Sul vai receber uma feira de tecnologia para estudantes, com oficinas e entrada gratuita. Informações específicas: quem organiza — a empresa TecVale; quando — na próxima sexta-feira, a partir das 8h; onde — no pavilhão central de eventos de Rio do Sul.', 'Nota cheia: apresenta o assunto geral da notícia e as três informações corretas (quem, quando, onde). Metade: assunto geral correto e uma ou duas informações, ou as três informações sem o assunto geral. Zero: não identifica o assunto nem as informações.'),
      (v_atividade, 2, 1, 'Resumo de até 5 linhas com as 3 ideias principais.', 1.0, 'Resumo de até 5 linhas com as palavras do aluno contendo as 3 ideias: (1) o celular em sala de aula deve ter uso limitado; (2) as notificações atrapalham a concentração e as redes sociais tomam o tempo da leitura e da conversa; (3) por isso as escolas precisam de regras claras. Ex.: "O texto defende limitar o celular na sala, porque os avisos tiram a atenção dos alunos e as redes ocupam o tempo de ler e conversar. Assim, as escolas devem criar regras para o uso."', 'Nota cheia: as 3 ideias, até 5 linhas, com as próprias palavras. Metade: duas ideias, ou passa de 5 linhas, ou copia grande parte do texto. Zero: uma ideia ou nenhuma, opinião pessoal no lugar do resumo, ou cópia integral.'),
      (v_atividade, 3, 1, 'Tema, ideia principal e a explicação da diferença entre eles.', 1.0, 'Tema: a coleta seletiva na escola (o lixo/reciclagem na escola). Ideia principal: a coleta seletiva feita pelos alunos reduziu pela metade o lixo enviado ao aterro, mostrando que pequenas atitudes diárias ajudam o meio ambiente. Diferença: o tema é o assunto do texto; a ideia principal é o que o texto afirma sobre esse assunto (a mensagem central).', 'Nota cheia: tema e ideia principal corretos e a diferença explicada com o exemplo. Metade: tema e ideia corretos sem explicar a diferença, ou só um dos dois correto com a diferença explicada. Zero: confunde tema e ideia principal e não explica.'),
      (v_atividade, 4, 1, 'Três atitudes de leitura crítica, cada uma com justificativa.', 1.0, 'Três atitudes, com justificativa, como: (1) verificar a fonte/o autor — mensagem sem autor pode ser falsa; (2) conferir em fontes oficiais (site ou rede da organização, da escola, notícias confiáveis) — só a organização confirma o cancelamento; (3) desconfiar do tom alarmista (URGENTE, letras maiúsculas, "repasse para todos") — é típico de notícia falsa; (4) relacionar com o que já sabe/perguntar ao professor ou responsável; (5) não repassar antes de confirmar — evita espalhar desinformação.', 'Nota cheia: três atitudes coerentes com a leitura crítica, cada uma justificada. Metade: três atitudes sem justificativa, ou duas atitudes justificadas. Zero: uma atitude ou nenhuma, ou diz que repassaria sem verificar.'),
      (v_atividade, 5, 1, 'Classificação dos quatro trechos, cada uma com justificativa.', 1.0, 'Trecho 1 — narrativo: conta uma história, uma sequência de fatos com personagem (Lucas). Trecho 2 — descritivo: descreve as características de um lugar (a praça). Trecho 3 — informativo: informa um fato com dados (data, hora, local). Trecho 4 — argumentativo: defende uma opinião ("deveria") com justificativa ("porque...") para convencer.', 'Nota cheia: os quatro trechos classificados corretamente e justificados pelo objetivo. Metade: três trechos certos com justificativa, ou os quatro certos sem justificativa. Zero: dois ou menos corretos.');
end $$;
