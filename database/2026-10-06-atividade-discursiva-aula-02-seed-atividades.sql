-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 2
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 2 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 02 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 02 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-02.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Assunto, tema e ideia principal do trecho, com a ideia principal em frase completa.', 1.0, 'Assunto: trabalho/emprego (ou formação profissional). Tema: a contratação de jovens com formação técnica nas indústrias do Alto Vale. Ideia principal: a formação técnica feita antes dos 18 anos aumenta as chances de contratação dos jovens da região (porque eles se adaptam mais rápido às máquinas e sistemas).', 'Nota cheia: assunto amplo, tema recortado e ideia principal em frase completa, todos coerentes com o trecho. Metade: dois dos três corretos, ou a ideia principal escrita como rótulo (sem frase completa). Zero: confunde os três níveis ou fica fora do trecho.'),
      (v_atividade, 2, 1, 'Tópico frasal identificado com justificativa e três palavras-chave.', 1.0, 'Tópico frasal: “A horta comunitária mudou a rotina do bairro Canoas.” É o tópico frasal porque está no início e resume a ideia-guia do parágrafo; as frases seguintes detalham essa mudança (produção de alimentos, revezamento dos moradores, aprendizado das crianças, convivência). Palavras-chave possíveis: horta comunitária, bairro/moradores, alimento (alface, tomate), rotina, convivência, famílias.', 'Nota cheia: tópico frasal correto, justificativa (resume a ideia do parágrafo/as outras frases detalham) e três palavras-chave pertinentes. Metade: tópico frasal correto sem justificativa, ou com menos de três palavras-chave. Zero: escolhe outra frase como tópico frasal e não justifica.'),
      (v_atividade, 3, 1, 'Classificação correta dos três comentários, cada uma explicada.', 1.0, '(1) Extrapolação — acrescenta uma conclusão que o texto não autoriza (a pesquisa não fala de reprovação). (2) Contradição — afirma o oposto do que a pesquisa mostra (ler melhorou as notas). (3) Redução — toma um detalhe (os 20 minutos) como se fosse a ideia central, deixando de lado que o resultado é sobre o hábito de leitura melhorar a interpretação.', 'Nota cheia: as três classificações corretas e explicadas. Metade: duas classificações corretas e explicadas, ou as três corretas sem explicação. Zero: uma ou nenhuma correta.'),
      (v_atividade, 4, 1, 'Resumo de até 4 linhas, fiel ao texto, com tema e ideia principal e sem opinião.', 1.0, 'Resumo de até 4 linhas, com as palavras do aluno, contendo: o tema (as causas da propagação das notícias falsas) e a ideia principal (as notícias falsas se espalham não só pela má-fé de quem as cria, mas também porque os algoritmos favorecem publicações que causam indignação; por isso, o combate exige punir autores e mudar as plataformas). Ex.: "O texto explica que as notícias falsas não se espalham só por má-fé, mas também porque os algoritmos destacam o que gera revolta. Por isso, combatê-las exige punir quem as cria e mudar o funcionamento das redes."', 'Nota cheia: até 4 linhas, fiel (duas causas + necessidade de duas ações), sem opinião nem acréscimos. Metade: falta uma das partes (uma das causas ou a conclusão), ou passa de 4 linhas, ou inclui opinião. Zero: copia o texto, inverte o sentido ou só dá opinião.'),
      (v_atividade, 5, 1, 'Ideia principal e uma ideia secundária identificadas, com a função da secundária explicada.', 1.0, 'Ideia principal: o uso de inteligência artificial nas tarefas escolares exige regras claras (porque copiar respostas prontas impede o aluno de exercitar a escrita e o raciocínio). Ideia secundária: "essas ferramentas ajudam a tirar dúvidas e a organizar ideias" — função de concessão: reconhece um lado positivo, mas não muda o foco do autor; ou "quando o aluno copia respostas prontas, deixa de exercitar a escrita" — função de justificativa/argumento que sustenta a ideia principal.', 'Nota cheia: ideia principal correta, uma ideia secundária correta e sua função explicada (concessão ou justificativa). Metade: ideia principal e secundária corretas sem explicar a função, ou só a ideia principal com explicação. Zero: troca a ideia principal pela secundária ou fica fora do trecho.');
end $$;
