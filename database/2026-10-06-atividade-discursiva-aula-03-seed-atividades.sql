-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 3
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 3 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 03 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 03 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-03.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Fato, opinião e suposição identificados, cada um com explicação.', 1.0, 'Fato: "A TecVale contratou 40 jovens aprendizes em 2026" — pode ser verificado (número e data). Opinião: "Esse é, sem dúvida, o melhor programa de aprendizagem do Brasil" — é um juízo de valor do autor. Suposição: "Naturalmente, todas as outras empresas da região vão copiar a ideia no ano que vem" — é uma previsão/hipótese apresentada como certeza (marcada por "naturalmente").', 'Nota cheia: as três partes corretamente separadas e explicadas. Metade: as três corretas sem explicação, ou duas corretas e explicadas. Zero: uma ou nenhuma correta.'),
      (v_atividade, 2, 1, 'Tom das duas manchetes e dois recursos da segunda que direcionam o leitor.', 1.0, 'Manchete 1: tom neutro/informativo (dado objetivo, sem adjetivos). Manchete 2: tom alarmista/persuasivo/indignado. Recursos que direcionam o leitor: "ABSURDO!", letras maiúsculas (DISPARAR), pontos de exclamação, o verbo "assaltam" (metáfora acusatória), "disparar" (exagero), "bolso do trabalhador" (apelo emocional), ausência do número do reajuste.', 'Nota cheia: tons das duas manchetes corretos e dois recursos da segunda explicados ou citados. Metade: só os tons, ou só os recursos, ou um tom e um recurso. Zero: não identifica tom nem recursos.'),
      (v_atividade, 3, 1, 'Três sinais de desinformação e a atitude de checagem antes de compartilhar.', 1.0, 'Sinais: tom alarmista e caixa alta ("ATENÇÃO!!!"); fonte vaga/não verificável ("um amigo de um primo"); falta de data, documento ou link oficial; pedido de repasse urgente ("repasse antes que apaguem"); notícia que muda algo grande sem fonte oficial. Atitude: verificar em fontes oficiais (site da Secretaria de Educação, da escola, jornais confiáveis), perguntar ao professor/direção e não repassar até confirmar.', 'Nota cheia: três sinais pertinentes e a atitude de checagem em fonte confiável antes de compartilhar. Metade: dois sinais com a atitude, ou três sinais sem a atitude. Zero: um sinal ou nenhum, ou diz que compartilharia sem checar.'),
      (v_atividade, 4, 1, 'Duas técnicas identificadas, cada uma com o efeito explicado.', 1.0, 'Apelo ao medo — "a cidade vai virar um caos": tenta assustar o leitor para bloquear o raciocínio e forçar o voto. Falso dilema — ou vota no candidato ou haverá caos: reduz as possibilidades a dois extremos. Inimigo comum — "a culpa de todos os problemas é dos políticos de fora": cria um bode expiatório e une o leitor contra um grupo.', 'Nota cheia: duas técnicas corretas, cada uma ligada a um trecho e com o efeito explicado. Metade: duas técnicas sem explicar o efeito, ou uma técnica bem explicada. Zero: nenhuma técnica correta.'),
      (v_atividade, 5, 1, 'Intenção dos três textos, cada uma justificada com uma pista.', 1.0, '(1) Informar/instruir — pista: verbos no imperativo e passos ("conecte", "pressione por 3 segundos"). (2) Convencer — pista: defende uma tese com justificativa ("é urgente que a escola invista... porque..."). (3) Entreter — pista: narrativa ficcional e humorística (robô "envergonhado", tropeçou na própria sombra).', 'Nota cheia: as três intenções corretas, cada uma com uma pista do texto. Metade: três corretas sem pistas, ou duas corretas com pistas. Zero: uma ou nenhuma correta.');
end $$;
