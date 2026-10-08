-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 9
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 9 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 09 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 09 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-09.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Tese da bancada oponente e dois argumentos com evidências ou exemplos.', 1.0, 'Tese contra a liberação sem restrições (ex.: "A IA não deve ser liberada sem restrições nas avaliações, porque as provas precisam medir o que o aluno aprendeu."). Dois argumentos com evidência ou exemplo, como: risco de plágio/cópia de respostas prontas; atrofia do pensamento crítico e da escrita (o aluno deixa de praticar); avaliação deixa de mostrar o aprendizado real; desigualdade de acesso às ferramentas; exemplo de escolas que exigem uso declarado/orientado.', 'Nota cheia: tese clara da bancada oponente e dois argumentos distintos, cada um com evidência, dado ou exemplo. Metade: tese com só um argumento, ou dois argumentos sem evidência/exemplo. Zero: defende a bancada errada ou não apresenta tese.'),
      (v_atividade, 2, 1, 'Falácia identificada e explicada e réplica respeitosa focada nas ideias.', 1.0, 'Falácia ad hominem: o colega ataca a idade das pessoas em vez de responder ao argumento; a idade não torna um argumento falso nem verdadeiro, por isso não o derruba. Réplica respeitosa, ex.: "A idade não muda os dados. A pesquisa que apresentamos mostra que..., e gostaríamos de ouvir qual dado vocês têm contra esse argumento."', 'Nota cheia: nomeia a falácia (ad hominem/ataque pessoal), explica por que não refuta o argumento e escreve réplica respeitosa voltada às ideias/dados. Metade: identifica a falácia sem explicar, ou só escreve a réplica. Zero: responde com outro ataque pessoal ou não identifica a falácia.'),
      (v_atividade, 3, 1, 'Inadequação explicada e mensagem reescrita em registro formal.', 1.0, 'O registro é coloquial/informal (gírias "e aí", "bora", "parada", "tô de boa", tratamento "chefe"), inadequado para uma mensagem profissional à gerente, que pede registro formal. Reescrita, ex.: "Bom dia, senhora [nome]. Gostaria de agendar uma reunião para tratarmos do relatório. Tenho disponibilidade amanhã. Seria possível? Atenciosamente, [nome]."', 'Nota cheia: explica a inadequação (registro informal × situação profissional) e reescreve em registro formal, sem gírias e com cumprimento/fechamento. Metade: só explica ou só reescreve, ou a reescrita mantém gírias. Zero: diz que a mensagem é adequada.'),
      (v_atividade, 4, 1, 'Três respostas coerentes com cada estilo e justificativa da assertiva.', 1.0, 'Passiva (ex.: "Tudo bem, deixa que eu faço a sua parte…" — aceita a sobrecarga e esconde o incômodo). Agressiva (ex.: "Você é preguiçoso, sempre atrapalha o grupo!" — ataca e constrange). Assertiva (ex.: "Nossa entrega é amanhã e a sua parte ainda falta. Podemos combinar até as 18h para você enviar? Se precisar, eu ajudo a revisar." — expõe o problema com clareza, respeita o colega e propõe acordo). A assertiva é a mais adequada porque resolve o problema, mantém a colaboração e o respeito.', 'Nota cheia: três respostas coerentes com cada estilo e justificativa da assertiva (clareza + respeito + solução). Metade: dois estilos corretos, ou três sem justificativa. Zero: estilos confundidos ou só uma resposta.'),
      (v_atividade, 5, 1, 'Preconceito linguístico explicado e proposta de adequação sem apagar a variedade.', 1.0, 'O comentário é preconceito linguístico porque julga a inteligência do candidato pelo sotaque e pelas expressões regionais; variação linguística não é erro, é parte da língua. Adequação: em situações formais, o candidato pode usar a norma-padrão (vocabulário preciso, concordância, evitar gírias) mantendo o sotaque e sua identidade; dominar a norma-padrão amplia a autonomia sem apagar a variedade de origem, que continua válida no dia a dia.', 'Nota cheia: explica o preconceito (julgar a pessoa pela fala; variação não é erro) e propõe adequação sem apagar a variedade. Metade: explica só o preconceito ou só a adequação, ou sugere eliminar o sotaque. Zero: concorda com o comentário.');
end $$;
