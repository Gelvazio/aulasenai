-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 6
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 6 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 06 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 06 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-06.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Diferença de sentido explicada e função da vírgula na segunda mensagem.', 1.0, 'Em "Não espere." a pessoa recebe a ordem de não esperar (ir embora, seguir). Em "Não, espere." a pessoa recebe uma negação seguida da ordem de esperar (ficar). A vírgula separa a palavra "não" (resposta/negação) da ordem "espere", mudando completamente a ação pedida.', 'Nota cheia: explica os dois sentidos opostos e a função da vírgula (separar a negação da ordem). Metade: explica a diferença sem a função da vírgula, ou só um dos sentidos. Zero: diz que não há diferença ou não explica.'),
      (v_atividade, 2, 1, 'Aviso pontuado corretamente e três usos de sinais explicados.', 1.0, '"Atenção, estudantes: no próximo sábado, a TecVale, empresa de tecnologia de Rio do Sul, vai receber a turma. Tragam caderno, caneta e crachá." (variações aceitas: "Atenção, estudantes!"; ponto e vírgula no lugar do ponto). Usos: vírgula do vocativo ("estudantes"); vírgula do adjunto adverbial deslocado ("no próximo sábado"); vírgulas do aposto explicativo ("empresa de tecnologia de Rio do Sul"); vírgulas da enumeração ("caderno, caneta e crachá"); ponto final separando as frases; dois-pontos/exclamação após o chamamento.', 'Nota cheia: aviso pontuado sem separar sujeito e verbo, com aposto e enumeração corretos, e três usos explicados. Metade: pontuação quase toda correta com um ou dois usos explicados, ou três usos explicados com um erro de pontuação. Zero: pontuação aleatória ou sem explicação.'),
      (v_atividade, 3, 1, 'Três frases corrigidas, cada uma com a regra explicada.', 1.0, '(1) "Havia muitas peças com defeito no estoque." — "haver" com sentido de existir é impessoal e fica no singular. (2) "A caixa de parafusos novos chegou ontem." — o verbo concorda com o núcleo do sujeito ("caixa"), não com "parafusos". (3) "Faz três semanas que a máquina parou." — "fazer" indicando tempo é impessoal e fica no singular.', 'Nota cheia: as três correções certas com as regras explicadas. Metade: três correções sem explicação, ou duas corretas e explicadas. Zero: uma ou nenhuma correção correta.'),
      (v_atividade, 4, 1, 'Três frases corrigidas, com a explicação de "meio", "é proibido" e "bastante".', 1.0, '(1) "As estagiárias ficaram meio nervosas na apresentação." — "meio" é advérbio (= um pouco) e não varia. (2) "É proibida a entrada de pessoas sem equipamento." — com artigo ("a entrada"), o adjetivo concorda com o substantivo (ou: "É proibido entrada...", sem artigo). (3) "Havia bastantes motivos para comemorar." — "bastante" é pronome (= muitos) e concorda com "motivos".', 'Nota cheia: as três correções certas com a explicação de cada caso. Metade: três correções sem explicação, ou duas corretas e explicadas. Zero: uma ou nenhuma correção correta.'),
      (v_atividade, 5, 1, 'E-mail reescrito sem desvios e lista dos desvios encontrados.', 1.0, '"Os relatórios da semana passada já foram enviados. Havia algumas dúvidas sobre as medidas, mas eu e o meu colega as resolvemos. Estou meio preocupado com o prazo." Desvios: vírgula entre sujeito e verbo; "foi enviado" → "foram enviados" (concordância com "relatórios"); "Haviam" → "Havia" (haver impessoal); falta de vírgula antes de "mas"; "resolveu" → "resolvemos" (sujeito composto com "eu"); "meia" → "meio" (advérbio invariável).', 'Nota cheia: e-mail sem desvios e pelo menos cinco dos seis desvios listados. Metade: três ou quatro desvios corrigidos e listados, ou e-mail corrigido sem a lista. Zero: dois ou menos desvios corrigidos.');
end $$;
