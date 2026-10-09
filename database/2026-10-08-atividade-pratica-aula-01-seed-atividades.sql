-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho' and a.numero = 1
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 1 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 01', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 01 (10 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/ATIVIDADES/ATIVIDADE-PRATICA-AULA-01.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Indique o emissor, o receptor, a mensagem e o canal.', 0.5, 'Emissor: a supervisora Carla. Receptor: os montadores da linha 2. Mensagem: "amanhã cedo troca a peça". Canal: a fala (voz) no corredor.', 'Nota cheia: os quatro elementos certos. Metade: dois ou três certos. Zero: um ou nenhum.'),
      (v_atividade, 1, 2, 'Indique o código, o ruído e se houve feedback.', 0.5, 'Código: a língua portuguesa falada. Ruído: o barulho das máquinas e a palavra vaga "a peça". Feedback: não houve, ninguém confirmou.', 'Nota cheia: código, pelo menos um ruído e a ausência de feedback. Metade: dois desses. Zero: um ou nenhum.'),
      (v_atividade, 2, 1, 'Classifique cada situação em ruído físico, técnico, semântico ou psicológico.', 0.5, '(1) técnico; (2) semântico; (3) físico; (4) psicológico.', 'Nota cheia: as quatro certas. Metade: duas ou três. Zero: uma ou nenhuma.'),
      (v_atividade, 2, 2, 'Proponha uma forma de evitar dois desses ruídos.', 0.5, 'Exemplos: trocar o rádio ou repetir por escrito; explicar a sigla ou escrever por extenso; conversar longe da prensa; esperar o colega se acalmar ou escolher outro momento.', 'Nota cheia: duas soluções coerentes com o ruído. Metade: uma. Zero: nenhuma coerente.'),
      (v_atividade, 3, 1, 'Explique o que falta no aviso para ele ser entendido por todos.', 0.5, 'Falta dizer o quê (qual peça/tarefa), quem faz, quando (dia e hora) e onde (linha/setor).', 'Nota cheia: aponta pelo menos três informações que faltam. Metade: duas. Zero: uma ou nenhuma.'),
      (v_atividade, 3, 2, 'Escreva a nova versão do aviso, completa e clara, pedindo confirmação.', 0.5, 'Exemplo: "Linha 2: amanhã, 8h, trocar o motor dos robôs R2 do lote 15. Responsável: equipe da manhã. Confirmem com 👍."', 'Nota cheia: o quê, quem/onde, quando e pedido de confirmação. Metade: falta um elemento. Zero: continua vago.'),
      (v_atividade, 4, 1, 'Escreva uma resposta de feedback que confirme a mensagem.', 0.5, 'Exemplo: "Entendido: 40 robôs azuis para Ibirama, até sexta às 14h, na doca 3."', 'Nota cheia: repete os dados principais com as próprias palavras. Metade: confirma só parte. Zero: apenas "ok" ou nada.'),
      (v_atividade, 4, 2, 'Explique por que esse feedback é importante para a equipe.', 0.5, 'Porque o emissor fica sabendo que a mensagem foi entendida e pode corrigir erros antes que causem retrabalho ou atraso.', 'Nota cheia: cita a confirmação do entendimento e a prevenção de erros. Metade: só um. Zero: sem relação.'),
      (v_atividade, 5, 1, 'Escreva a mensagem informal para o amigo.', 0.5, 'Exemplo: "E aí! Vou atrasar uns 15 min, já chego."', 'Nota cheia: linguagem informal adequada e informação do atraso. Metade: informação incompleta. Zero: não escreveu.'),
      (v_atividade, 5, 2, 'Escreva a mensagem formal para o supervisor, explicando o motivo e o horário de chegada.', 0.5, 'Exemplo: "Bom dia, Sr. Paulo. O ônibus atrasou e devo chegar às 8h15. Peço desculpas pelo atraso."', 'Nota cheia: saudação, motivo, horário e linguagem formal. Metade: falta um item. Zero: linguagem informal ou sem informação.'),
      (v_atividade, 6, 1, 'Explique por que a mensagem não é adequada.', 0.5, 'Porque usa gírias e abreviações (linguagem informal) com um cliente, que exige linguagem formal e respeitosa; também falta informação (qual pedido, quando chega).', 'Nota cheia: aponta a informalidade e a falta de informação. Metade: só um. Zero: diz que está adequada.'),
      (v_atividade, 6, 2, 'Reescreva a mensagem em linguagem formal e completa.', 0.5, 'Exemplo: "Prezado cliente, o pedido 482 foi enviado hoje e deve chegar até quinta-feira, 10/10. Atenciosamente, Vale Tech."', 'Nota cheia: tratamento formal, número/identificação do pedido e prazo. Metade: falta um. Zero: continua informal.'),
      (v_atividade, 7, 1, 'Diferencie comunicação verbal e não verbal usando essa situação.', 0.5, 'Verbal: a frase "tô entendendo" (palavras). Não verbal: braços cruzados e olhar no celular (postura e olhar).', 'Nota cheia: define as duas e dá os exemplos certos. Metade: só uma. Zero: trocadas.'),
      (v_atividade, 7, 2, 'Explique o problema e diga como o aprendiz deveria agir.', 0.5, 'A comunicação não verbal contradiz a verbal e passa desinteresse. Deveria guardar o celular, olhar para a supervisora, ter postura aberta e confirmar o que entendeu.', 'Nota cheia: aponta a contradição e propõe atitudes adequadas. Metade: só um dos dois. Zero: sem relação.'),
      (v_atividade, 8, 1, 'Indique o canal mais adequado para a regra de segurança e justifique.', 0.5, 'Mural/placa e comunicado escrito (e-mail ou grupo oficial), porque precisa alcançar todos e ficar registrado.', 'Nota cheia: canal escrito/coletivo com justificativa. Metade: canal certo sem justificativa. Zero: canal inadequado.'),
      (v_atividade, 8, 2, 'Indique o canal mais adequado para o recado rápido e justifique.', 0.5, 'Fala direta (conversa), porque o colega está perto e o assunto é simples e imediato.', 'Nota cheia: fala direta com justificativa. Metade: sem justificativa. Zero: canal inadequado.'),
      (v_atividade, 9, 1, 'Escreva uma frase clara e respeitosa para avisar o colega.', 0.5, 'Exemplo: "O sensor ficou invertido; posso te mostrar o lado certo para a gente ajustar?"', 'Nota cheia: fala do fato, sem ofensa, e oferece ajuda. Metade: respeitosa mas vaga. Zero: ofensiva ou não avisa.'),
      (v_atividade, 9, 2, 'Explique por que falar do fato, e não da pessoa, melhora o trabalho em equipe.', 0.5, 'Porque evita ofensas e conflitos, mantém o clima de confiança e foca na solução do problema.', 'Nota cheia: cita respeito/clima e foco na solução. Metade: só um. Zero: sem relação.'),
      (v_atividade, 10, 1, 'Descreva a situação e identifique emissor, receptor, canal e mensagem.', 0.5, 'Resposta pessoal com os quatro elementos identificados corretamente na situação descrita.', 'Nota cheia: situação descrita + quatro elementos coerentes. Metade: dois ou três. Zero: sem situação ou elementos errados.'),
      (v_atividade, 10, 2, 'Diga se houve ruído e feedback e proponha uma melhoria.', 0.5, 'Resposta pessoal indicando o ruído (ou a ausência dele), se houve confirmação e uma melhoria coerente (canal, clareza ou pedido de confirmação).', 'Nota cheia: ruído + feedback + melhoria coerente. Metade: dois desses. Zero: um ou nenhum.');
end $$;
