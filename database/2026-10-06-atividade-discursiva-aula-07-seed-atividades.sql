-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 7
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 7 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 07 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 07 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-07.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Cinco palavras corretamente classificadas, cada uma com sua função.', 1.0, 'Substantivo: impressora, oficina, alunos ou treinamento — nomeiam seres/objetos/ações. Adjetivo: nova — caracteriza a impressora. Verbo: funcionou ou precisam — indicam ação/necessidade. Advérbio: ontem (tempo), perfeitamente (modo) ou ainda (tempo) — modificam o verbo. Conjunção: mas — liga as orações com sentido de oposição.', 'Nota cheia: as cinco classes corretas com a função de cada uma. Metade: quatro classes corretas, ou cinco sem as funções. Zero: três ou menos corretas.'),
      (v_atividade, 2, 1, 'Classificação das duas frases, diferença explicada e gênero adequado a cada uma.', 1.0, 'Frase 1: denotativa — sentido literal, informação objetiva e precisa (5%). Frase 2: conotativa — sentido figurado ("foi às nuvens" = subiu muito; "levou junto o meu salário" = o salário não dá mais), com exagero e emoção. Gêneros: a 1 é adequada a notícia, relatório ou boletim econômico; a 2, a crônica, conversa informal, post de rede social, charge ou publicidade.', 'Nota cheia: classificação correta, diferença explicada (literal × figurado) e um gênero adequado para cada. Metade: classificação correta sem a explicação ou sem os gêneros. Zero: classificação invertida ou sem explicação.'),
      (v_atividade, 3, 1, 'Quatro figuras identificadas, cada uma com o efeito explicado.', 1.0, '(1) Personificação — o vento "assobia canções tristes" como uma pessoa, criando clima melancólico. (2) Hipérbole — "um século" exagera a espera, enfatizando a demora. (3) Metáfora — "ela é um sol" compara sem conectivo, mostrando que ela ilumina/alegra a família. (4) Sinestesia — "ouvi o cheiro doce" mistura audição, olfato e paladar, intensificando a sensação.', 'Nota cheia: as quatro figuras corretas com o efeito explicado. Metade: três figuras corretas com efeito, ou quatro sem efeito. Zero: duas ou menos corretas.'),
      (v_atividade, 4, 1, 'Ironia explicada, crítica identificada e pistas do contexto apontadas.', 1.0, 'A fala é irônica porque diz o oposto do que o personagem pensa: ele chama de "maravilha" um transporte que o deixou 40 minutos na chuva. A crítica é à má qualidade/atraso do transporte público da cidade. Pistas: a situação (encharcado, espera longa), o exagero do elogio e o contraste entre a fala e a imagem/contexto.', 'Nota cheia: explica o sentido oposto, identifica a crítica e aponta pistas do contexto. Metade: explica a ironia e a crítica sem as pistas, ou só a ironia com as pistas. Zero: interpreta a fala como elogio verdadeiro.'),
      (v_atividade, 5, 1, 'Slogan com metáfora e dois versos com antítese e personificação, com as figuras apontadas.', 1.0, 'Slogan com metáfora (ex.: "TecVale Eco: sua garrafa é um abraço no planeta." — garrafa = abraço, sem "como"). Dois versos com antítese (palavras opostas: velho/novo, lixo/tesouro, fim/começo) e personificação (ação humana ao objeto ou à natureza), ex.: "O plástico que era lixo agora sorri como tesouro, / no fim de uma vida, a garrafa canta um novo começo." Figuras apontadas corretamente.', 'Nota cheia: slogan com metáfora verdadeira, versos com antítese e personificação e as três figuras apontadas. Metade: falta uma das três figuras ou não aponta onde estão. Zero: nenhuma figura correta ou fora do produto.');
end $$;
