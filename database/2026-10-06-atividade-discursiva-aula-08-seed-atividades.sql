-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 8
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 8 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 08 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 08 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-08.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Roteiro com gancho, dois argumentos e frase final coerentes com o tema.', 1.0, 'Gancho (ex.: "Você sabe quantas empresas conhecem a sua localização agora?" ou um dado/história curta); dois argumentos (ex.: dados pessoais expostos podem ser usados para golpes; fotos e informações publicadas hoje podem prejudicar uma vaga de emprego no futuro; aplicativos coletam dados sem que o usuário perceba); frase final com reflexão ou chamado à ação (ex.: "Antes de postar, pense: quem mais vai ver isso?" / "Revise hoje as configurações de privacidade").', 'Nota cheia: as três partes presentes, coerentes com o tema e com dois argumentos distintos. Metade: falta o gancho ou a frase final, ou só um argumento. Zero: não apresenta roteiro ou fica fora do tema.'),
      (v_atividade, 2, 1, 'Explicação do problema do tema amplo e proposta de tema delimitado justificada.', 1.0, '"Meio ambiente" é amplo demais: em 5 minutos a fala fica superficial, sem foco e cansativa, e não dá para apresentar uma tese clara. Proposta delimitada (ex.: "O descarte do lixo eletrônico em Rio do Sul", "A coleta seletiva na nossa escola", "O desperdício de água nos bebedouros da escola"), justificada por permitir profundidade, foco, exemplos concretos e uma ideia central clara no tempo disponível.', 'Nota cheia: explica o problema do tema amplo (superficialidade/falta de foco/tempo) e propõe tema delimitado com justificativa. Metade: só explica o problema ou só propõe o tema, ou proposta ainda ampla. Zero: diz que o tema está adequado ou não responde.'),
      (v_atividade, 3, 1, 'Quatro problemas apontados, cada um com uma técnica de correção.', 1.0, '(1) Fala rápida → diminuir o ritmo e articular as sílabas (dicção; aquecimento com trava-línguas). (2) Voz baixa → projetar a voz pelo diafragma, sem gritar. (3) Vício "tipo assim" → substituir por pausas conscientes. (4) Braços cruzados → postura aberta, gestos entre a cintura e o peito, palmas abertas. (5) Olhar só para os slides → contato visual com a plateia (técnica do farol); slides apenas como apoio.', 'Nota cheia: quatro problemas corretos, cada um com técnica adequada. Metade: dois ou três problemas com técnica, ou quatro problemas sem técnica. Zero: um ou nenhum problema com técnica.'),
      (v_atividade, 4, 1, 'História de 4 a 6 linhas com personagem, conflito, transformação e detalhe sensorial.', 1.0, 'História curta com personagem (ex.: o próprio aprendiz ou um operador), conflito (ex.: a linha parou porque ninguém achava uma peça no almoxarifado), transformação (ex.: depois de etiquetar as prateleiras, a peça foi achada em 1 minuto) e detalhe sensorial (ex.: "o barulho das máquinas parou de repente", "o cheiro de óleo", "as caixas empoeiradas"), em 4 a 6 linhas.', 'Nota cheia: os quatro elementos (personagem, conflito, transformação, detalhe sensorial) na extensão pedida e ligados à proposta. Metade: falta um elemento ou extensão fora do pedido. Zero: não é uma história ou faltam dois ou mais elementos.'),
      (v_atividade, 5, 1, 'Feedback com um ponto forte específico e duas sugestões práticas, em tom respeitoso.', 1.0, 'Ponto forte específico (ex.: "A pergunta do início prendeu a atenção de todos e sua postura transmitiu segurança."). Duas sugestões práticas (ex.: "Use os slides só com tópicos curtos e fale olhando para a turma"; "Ensaie com cronômetro para caber nos 3 minutos" / "corte um dos exemplos"). Tom respeitoso e encorajador.', 'Nota cheia: um ponto forte específico + duas sugestões práticas ligadas aos problemas (leitura dos slides e tempo) + tom respeitoso. Metade: ponto forte genérico ("foi bom") ou só uma sugestão prática. Zero: crítica ofensiva, sem sugestões ou fora do caso.');
end $$;
