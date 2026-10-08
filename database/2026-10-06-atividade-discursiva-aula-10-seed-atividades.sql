-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Reforço de Linguagens' and a.numero = 10
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 10 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Aula 10 — Discursivas', 'PENDENTE', v_aula, 'Atividade — Aula 10 — Discursivas (5 questões discursivas)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/REFORCO_LINGUAGENS/ATIVIDADES/ATIVIDADE-DISCURSIVA-AULA-10.html', 5, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Trecho de crônica, frase de relatório técnico e uma diferença de linguagem apontada.', 1.0, '(1) Crônica: trecho em 1ª pessoa, com subjetividade, reflexão ou humor (ex.: "Justo no dia da feira, a impressora resolveu tirar férias no meio da peça. Fiquei ali, olhando o bico parado, pensando que até as máquinas têm medo de plateia."). (2) Relatório: frase impessoal e precisa, com dados (ex.: "Às 9h40, a impressora 3D interrompeu a impressão da peça de demonstração por travamento do extrusor."). Diferença: a crônica é subjetiva, usa 1ª pessoa, figuras e emoção; o relatório é impessoal, objetivo, sem opinião, com dados verificáveis.', 'Nota cheia: crônica com marcas do gênero, frase técnica impessoal e precisa e uma diferença correta. Metade: um dos dois textos inadequado ao gênero, ou falta a diferença. Zero: os dois textos com a mesma linguagem ou fora do fato.'),
      (v_atividade, 2, 1, 'Lead com as seis informações essenciais, na ordem da pirâmide invertida.', 1.0, 'Exemplo: "A TecVale reuniu 800 estudantes no sábado, no pavilhão de eventos de Rio do Sul, em uma feira de tecnologia com oficinas de robótica e programação, com o objetivo de aproximar os jovens da indústria." Deve conter: o quê (feira de tecnologia), quem (TecVale e 800 estudantes), quando (sábado), onde (pavilhão de eventos de Rio do Sul), como (oficinas de robótica e programação), por quê (aproximar os jovens da indústria), com o fato principal no início.', 'Nota cheia: as seis informações num parágrafo objetivo, com o fato principal no começo. Metade: quatro ou cinco informações, ou ordem que esconde o fato principal. Zero: três ou menos informações ou texto opinativo.'),
      (v_atividade, 3, 1, 'Síntese neutra de até 5 linhas e apreciação crítica com argumento.', 1.0, 'Síntese (até 5 linhas): apresenta a obra (título/autor/tipo) e o conteúdo principal de forma neutra, sem opinião. Apreciação crítica: avaliação explícita (positiva ou negativa) sustentada por pelo menos um argumento (ex.: "O filme é eficiente porque mostra, com situações reais, como...", "A música perde força porque repete...").', 'Nota cheia: síntese neutra de até 5 linhas + apreciação com avaliação fundamentada em argumento. Metade: síntese com opinião misturada, ou apreciação sem argumento ("gostei"). Zero: só opinião, sem síntese, ou fora da proposta.'),
      (v_atividade, 4, 1, 'Dois problemas apontados e reescrita mais precisa e bem organizada.', 1.0, 'Problemas: repetição do "porque" (coesão pobre); vocabulário genérico ("boa", "todo mundo", "é tudo"); período longo sem pontuação/conectivos variados; retomadas vagas ("isso"). Reescrita, ex.: "A integração de ferramentas digitais agiliza a comunicação entre os setores da empresa. Com isso, as decisões são tomadas mais rapidamente e os processos se tornam mais eficientes."', 'Nota cheia: dois problemas corretos e reescrita com vocabulário preciso, sem repetições e com pontuação/conectivos adequados, mantendo o sentido. Metade: dois problemas sem reescrita adequada, ou reescrita boa com só um problema apontado. Zero: não identifica problemas nem melhora o texto.'),
      (v_atividade, 5, 1, 'Memorial de 7 a 10 linhas com competência, exemplo, desafio e plano.', 1.0, 'Memorial de 7 a 10 linhas, em 1ª pessoa, com: uma competência desenvolvida (ex.: leitura crítica — identificar intenção e fake news; escrita — usar conectivos e revisar; oralidade — apresentar com postura e pausas); um exemplo concreto de uso (ex.: "verifiquei a fonte de uma mensagem antes de compartilhar"; "apresentei o pitch na feira"); um desafio a aprimorar (ex.: concordância, nervosismo ao falar) e um plano (ex.: ler um texto por semana, ensaiar com cronômetro, revisar em camadas).', 'Nota cheia: os quatro elementos (competência, exemplo, desafio, plano) na extensão pedida. Metade: falta um elemento ou extensão fora do pedido. Zero: faltam dois ou mais elementos ou texto genérico sem relação com a UC.');
end $$;
