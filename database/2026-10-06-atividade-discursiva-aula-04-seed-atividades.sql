-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 4
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 4 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 04 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 04 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-04.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Reescrita sem repetições, com pronome, sinônimo/hiperônimo e elipse.', 1.0, 'Exemplo: "A TecVale comprou uma impressora 3D e a instalou na oficina. O equipamento quebrou na primeira semana, e a empresa acionou a garantia." Recursos: pronome ("a" retomando a impressora), sinônimo/hiperônimo ("o equipamento", "a empresa"), elipse (sujeito "A TecVale" omitido em "e a instalou").', 'Nota cheia: trecho sem repetições desnecessárias, sentido mantido e os três recursos (pronome, sinônimo/hiperônimo, elipse). Metade: reescrita melhorada com dois dos recursos, ou ainda com uma repetição. Zero: copia o trecho, muda o sentido ou não usa os recursos.'),
      (v_atividade, 2, 1, 'Parágrafo coeso com três conectivos e a relação de cada um explicada.', 1.0, 'Exemplo: "A fábrica comprou máquinas novas; por isso, a produção aumentou 30%. No entanto, os funcionários ainda não foram treinados. Portanto, a empresa vai oferecer um curso em novembro." Relações: "por isso" = consequência/causa; "no entanto" = oposição (adversativa) — ou "embora" = concessão; "portanto" = conclusão.', 'Nota cheia: as quatro ideias num parágrafo coerente, três conectivos de sentidos diferentes e adequados, cada relação nomeada corretamente. Metade: parágrafo coerente com dois conectivos adequados, ou três conectivos sem explicar as relações, ou um conectivo com sentido errado. Zero: frases soltas, sem conectivos ou com relações incoerentes.'),
      (v_atividade, 3, 1, 'Explicação da coesão presente, da falta de coerência e do fator quebrado.', 1.0, 'Há coesão porque as frases estão ligadas por recursos formais: o pronome "ele" retoma "o sol" e o conectivo "por isso" liga as orações. Não há coerência porque as afirmações contradizem o conhecimento do mundo (o sol não é uma estrela fria e pequena; não aquece mais à noite do que de dia) e a conclusão não decorre da premissa (estrela fria não poderia aquecer mais). Fator quebrado: não contradição (e também a progressão lógica).', 'Nota cheia: aponta um recurso de coesão, explica a falta de lógica/contradição e nomeia o fator (não contradição ou progressão lógica). Metade: explica a falta de coerência sem citar recurso de coesão, ou sem nomear o fator. Zero: diz que o trecho é coerente ou não explica.'),
      (v_atividade, 4, 1, 'Problema de cada frase identificado e as três reescritas corrigidas.', 1.0, '(1) Ambiguidade — "seu projeto" pode ser da supervisora ou da estagiária. Correção: "A supervisora conversou com a estagiária sobre o projeto dela (da estagiária)." (2) Quebra de paralelismo — enumeração com formas diferentes. Correção: "aprendemos a soldar, a programar e a montar robôs." (3) Eco — repetição do som "-ção" (solução, questão, emoção, reunião). Correção: "A resposta para o problema emocionou os participantes do encontro."', 'Nota cheia: os três problemas corretos e as três reescritas resolvendo o problema. Metade: dois problemas corretos com reescritas, ou os três identificados sem reescrever. Zero: um ou nenhum problema correto.'),
      (v_atividade, 5, 1, 'Parágrafo de 5 a 7 linhas com os quatro movimentos e os conectivos adequados.', 1.0, 'Parágrafo de 5 a 7 linhas sobre o celular no intervalo com: tópico frasal (posição clara, ex.: "O uso do celular no intervalo deve ser limitado."); causa/dado com conectivo explicativo (porque, visto que, já que — ex.: "porque reduz a convivência entre os colegas"); contraposição com conectivo concessivo/adversativo (embora, ainda que, mas, no entanto — ex.: "Embora o aparelho ajude a falar com a família..."); conclusão parcial com conectivo conclusivo (portanto, logo, assim).', 'Nota cheia: os quatro movimentos na ordem, conectivos adequados a cada função e extensão de 5 a 7 linhas. Metade: três movimentos, ou conectivos inadequados em um dos movimentos, ou extensão fora do pedido. Zero: menos de dois movimentos, fora do tema ou sem posição.');
end $$;
