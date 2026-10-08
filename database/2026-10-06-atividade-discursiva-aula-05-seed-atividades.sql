-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 5
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 5 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 05 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 05 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-05.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Parágrafo narrativo de 4 a 6 linhas com foco, tempo, lugar, conflito e tensão final.', 1.0, 'Parágrafo narrativo de 4 a 6 linhas, em 1ª ou 3ª pessoa, com tempo e lugar definidos (ex.: "Na tarde de sábado, no pavilhão da feira..."), verbos de ação no pretérito perfeito, um conflito (ex.: o robô para, a energia cai, o controle some) e final com tensão (o desfecho fica em aberto, perto do clímax).', 'Nota cheia: foco narrativo coerente, tempo e lugar, conflito claro, verbos no passado e final tenso, na extensão pedida. Metade: falta um dos elementos (tempo/lugar, conflito ou tensão final) ou extensão fora do pedido. Zero: não é narrativa (só descreve ou opina) ou fora da situação.'),
      (v_atividade, 2, 1, 'Descrição de 4 a 6 linhas com ordem espacial e dois adjetivos sonoros ou olfativos.', 1.0, 'Descrição de 4 a 6 linhas de um ambiente da escola, organizada do geral para os detalhes (ex.: "A oficina é ampla e iluminada... Nas bancadas... No canto..."), com verbos de estado (é, está, parece), adjetivos e pelo menos dois adjetivos/expressões sensoriais de som ou cheiro (ex.: "barulhenta", "zumbido constante", "cheiro forte de solda", "perfumada"). Sem sequência de acontecimentos.', 'Nota cheia: ordem espacial perceptível, dois adjetivos sonoros/olfativos e predomínio da descrição, na extensão pedida. Metade: falta a ordem espacial ou só um adjetivo sensorial, ou mistura muita narração. Zero: narra uma história ou não descreve um ambiente.'),
      (v_atividade, 3, 1, 'Parágrafo com tese, fundamentação, conclusão e conectivo.', 1.0, 'Parágrafo com tese clara no início (ex.: "O uso da IA nas tarefas escolares deve ser permitido com regras."), fundamentação (dado, exemplo ou razão: ajuda a tirar dúvidas, mas copiar respostas impede o aprendizado da escrita) com conectivo (porque, pois, já que, no entanto) e conclusão que retoma a tese (portanto, assim...).', 'Nota cheia: tese explícita, fundamentação pertinente, conclusão ligada à tese e ao menos um conectivo adequado. Metade: falta a conclusão ou a fundamentação é só opinião repetida. Zero: sem tese ou fora do tema.'),
      (v_atividade, 4, 1, 'Concessão com conectivo concessivo e refutação respeitosa com razão ou dado.', 1.0, 'Exemplo: "Embora a prefeitura tenha outras prioridades, a reforma da praça não é desperdício, porque oferece lazer seguro às crianças e aos idosos e valoriza o comércio do bairro." Concessão com "embora/ainda que" reconhecendo o argumento do colega; refutação com uma razão ou dado, sem ofender.', 'Nota cheia: concessão com conectivo concessivo + refutação com razão/dado + tom respeitoso. Metade: só a concessão ou só a refutação, ou falta o conectivo concessivo. Zero: ataca o colega, não argumenta ou fica fora do tema.'),
      (v_atividade, 5, 1, 'As três tipologias identificadas e a predominante justificada.', 1.0, 'Narrativa: "Na sexta-feira, um caminhão perdeu o freio na descida da Rua XV e atingiu três carros." Descritiva: "A rua é estreita, íngreme e sem acostamento, cercada de casas antigas." Argumentativa: "É urgente que a prefeitura proíba caminhões pesados nesse trecho, pois o risco de novos acidentes é grande." Predomina a argumentação: a narração e a descrição servem de apoio para defender a proibição (propósito do texto).', 'Nota cheia: as três frases corretamente classificadas e a argumentativa apontada como predominante, com justificativa (propósito/defesa da proibição). Metade: as três classificações corretas sem justificar a predominante, ou duas corretas com a predominante justificada. Zero: uma ou nenhuma classificação correta.');
end $$;
