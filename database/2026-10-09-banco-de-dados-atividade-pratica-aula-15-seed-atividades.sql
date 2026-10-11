-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'BANCO DE DADOS' and a.numero = 15
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 15 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 15', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 15 (10 questões discursivas)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADE-PRATICA-AULA-15.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Explique a diferença entre SELECT * e listar as colunas.', 0.2, '**SELECT *** mostra **todas as colunas**; listar as colunas traz **só as necessárias**, deixando a consulta mais **clara** e **leve**.', 'Nota cheia (0,2): diferença clara. Metade (0,1): só uma parte. Zero (0): sem relação.'),
      (v_atividade, 1, 2, 'Escreva a consulta pedida, com a coluna do valor anual chamada valor_anual.', 0.4, 'SELECT nome, valor_mensal, valor_mensal * 12 AS valor_anual FROM curso;', 'Nota cheia (0,4): consulta correta com o cálculo e o apelido. Metade (0,2): falta o apelido ou uma coluna. Zero (0): não calcula.'),
      (v_atividade, 1, 3, 'Explique se a coluna calculada altera os dados da tabela curso e o papel do AS.', 0.4, '**Não altera**: o cálculo existe **só no resultado** da consulta. O **AS** dá o **nome** valor_anual à coluna calculada no resultado.', 'Nota cheia (0,4): as duas explicações. Metade (0,2): uma. Zero (0): diz que grava na tabela.'),
      (v_atividade, 2, 1, 'Escreva a consulta dos cursos a partir de R$ 200.', 0.2, 'SELECT nome, valor_mensal FROM curso WHERE valor_mensal >= 200;', 'Nota cheia (0,2): operador >= correto. Metade (0,1): usa > (exclui 200). Zero (0): operador errado.'),
      (v_atividade, 2, 2, 'Escreva a consulta das matrículas de fevereiro de 2026 usando BETWEEN.', 0.4, 'SELECT * FROM matricula WHERE data_matricula BETWEEN ''2026-02-01'' AND ''2026-02-28'';', 'Nota cheia (0,4): BETWEEN com as duas datas entre aspas. Metade (0,2): datas fora do formato ou sem aspas. Zero (0): sem filtro de data.'),
      (v_atividade, 2, 3, 'Explique se o BETWEEN inclui as datas das pontas e o que aconteceria se o campo fosse data e hora.', 0.4, '**Sim**, o BETWEEN **inclui as duas pontas**. Se o campo fosse **data e hora**, ''2026-02-28'' seria a meia-noite do dia 28, e as matrículas **ao longo do dia 28 ficariam de fora**; seria melhor usar data_matricula >= ''2026-02-01'' AND data_matricula < ''2026-03-01''.', 'Nota cheia (0,4): inclui as pontas + problema da hora. Metade (0,2): só um. Zero (0): diz que não inclui as pontas.'),
      (v_atividade, 3, 1, 'Explique o que faz o operador IN.', 0.2, 'O **IN** verifica se o valor **está numa lista** de valores.', 'Nota cheia (0,2): definição. Zero (0): sem relação.'),
      (v_atividade, 3, 2, 'Escreva as duas consultas usando IN.', 0.4, 'SELECT * FROM matricula WHERE situacao IN (''trancada'', ''cancelada''); e SELECT * FROM turma WHERE id_curso IN (1, 3, 5);', 'Nota cheia (0,4): as duas consultas. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 3, 3, 'Reescreva a consulta das turmas sem IN, usando OR, e diga qual forma é mais legível.', 0.4, 'SELECT * FROM turma WHERE id_curso = 1 OR id_curso = 3 OR id_curso = 5; A forma com **IN** é **mais curta e legível**.', 'Nota cheia (0,4): reescrita com OR + avaliação. Metade (0,2): só um. Zero (0): usa AND.'),
      (v_atividade, 4, 1, 'Explique o que significam % e _ no LIKE.', 0.2, '**%** representa **qualquer quantidade de caracteres** (inclusive nenhum); **_** representa **exatamente um caractere**.', 'Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.'),
      (v_atividade, 4, 2, 'Escreva a consulta dos nomes que começam com Ana.', 0.4, 'SELECT nome FROM aluno WHERE nome LIKE ''Ana%'';', 'Nota cheia (0,4): consulta correta. Metade (0,2): ''%Ana%'' (traz também nomes que só contêm Ana). Zero (0): sem LIKE ou sem %.'),
      (v_atividade, 4, 3, 'Escreva a consulta de Silva em qualquer posição sem diferenciar maiúsculas e explique o operador usado.', 0.4, 'SELECT nome FROM aluno WHERE nome ILIKE ''%silva%''; O **ILIKE** funciona como o LIKE, mas **sem diferenciar maiúsculas e minúsculas** (recurso do PostgreSQL).', 'Nota cheia (0,4): consulta + explicação. Metade (0,2): só um, ou lower(nome) LIKE ''%silva%'' sem explicar. Zero (0): LIKE ''Silva'' exato.'),
      (v_atividade, 5, 1, 'Escreva a consulta correta dos alunos sem e-mail.', 0.2, 'SELECT nome FROM aluno WHERE email IS NULL;', 'Nota cheia (0,2): IS NULL. Zero (0): = NULL.'),
      (v_atividade, 5, 2, 'Explique por que = NULL não funciona.', 0.4, '**NULL** representa a **ausência de valor**; uma comparação com **=** contra NULL **não é verdadeira** (o resultado é desconhecido), então nenhuma linha passa no filtro. Por isso usa-se **IS NULL**.', 'Nota cheia (0,4): ausência de valor + comparação não verdadeira + IS NULL. Metade (0,2): só "tem que usar IS NULL". Zero (0): sem relação.'),
      (v_atividade, 5, 3, 'Escreva a consulta que mostra nome e e-mail de todos os alunos, exibindo "sem e-mail" quando o campo estiver vazio.', 0.4, 'SELECT nome, coalesce(email, ''sem e-mail'') AS email FROM aluno;', 'Nota cheia (0,4): coalesce correto. Metade (0,2): CASE ou ideia certa com erro de sintaxe. Zero (0): filtra só os vazios.'),
      (v_atividade, 6, 1, 'Explique a diferença entre AND e OR.', 0.2, '**AND**: as duas condições precisam ser verdadeiras. **OR**: basta uma ser verdadeira.', 'Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): invertidos.'),
      (v_atividade, 6, 2, 'Explique por que a condição do colega traz turmas erradas.', 0.4, 'Sem parênteses, o **AND é avaliado antes** do OR: a condição vira (turno = ''noite'' AND id_curso = 1) OR id_curso = 3, trazendo **todas as turmas do curso 3**, de qualquer turno.', 'Nota cheia (0,4): precedência + efeito. Metade (0,2): só "faltam parênteses". Zero (0): sem relação.'),
      (v_atividade, 6, 3, 'Escreva a consulta correta.', 0.4, 'SELECT * FROM turma WHERE turno = ''noite'' AND (id_curso = 1 OR id_curso = 3); (ou id_curso IN (1, 3)).', 'Nota cheia (0,4): consulta correta. Metade (0,2): parênteses no lugar errado. Zero (0): mantém o erro.'),
      (v_atividade, 7, 1, 'Explique o que fazem ASC e DESC.', 0.2, '**ASC** ordena do **menor para o maior** (padrão); **DESC** do **maior para o menor**.', 'Nota cheia (0,2): os dois. Zero (0): invertidos.'),
      (v_atividade, 7, 2, 'Escreva a consulta pedida.', 0.4, 'SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal DESC, nome ASC;', 'Nota cheia (0,4): as duas colunas na ordem certa. Metade (0,2): só a primeira ordenação. Zero (0): ordem invertida.'),
      (v_atividade, 7, 3, 'Explique para que serve a segunda coluna no ORDER BY.', 0.4, 'A segunda coluna serve de **desempate**: quando dois cursos têm o **mesmo valor**, ficam em **ordem alfabética** do nome.', 'Nota cheia (0,4): ideia de desempate. Zero (0): sem relação.'),
      (v_atividade, 8, 1, 'Escreva a consulta dos 3 cursos mais caros.', 0.2, 'SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal DESC LIMIT 3;', 'Nota cheia (0,2): ORDER BY DESC + LIMIT 3. Zero (0): sem ordenação.'),
      (v_atividade, 8, 2, 'Escreva a consulta da segunda página de alunos.', 0.4, 'SELECT nome FROM aluno ORDER BY nome LIMIT 10 OFFSET 10;', 'Nota cheia (0,4): LIMIT 10 OFFSET 10 com ORDER BY. Metade (0,2): OFFSET errado ou sem ORDER BY. Zero (0): sem LIMIT.'),
      (v_atividade, 8, 3, 'Explique por que o ORDER BY é necessário quando se usa LIMIT e OFFSET.', 0.4, 'Sem ORDER BY, o banco **não garante a ordem** das linhas: as "primeiras" e a "segunda página" podem **mudar** a cada consulta, repetindo ou pulando alunos.', 'Nota cheia (0,4): ordem não garantida + consequência. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 9, 1, 'Escreva a consulta dos turnos sem repetição.', 0.2, 'SELECT DISTINCT turno FROM turma;', 'Nota cheia (0,2): DISTINCT correto. Zero (0): sem DISTINCT.'),
      (v_atividade, 9, 2, 'Escreva a consulta dos aniversariantes de outubro.', 0.4, 'SELECT nome, data_nascimento FROM aluno WHERE extract(month FROM data_nascimento) = 10;', 'Nota cheia (0,4): filtro pelo mês correto. Metade (0,2): filtro que depende do ano (BETWEEN de um ano só). Zero (0): sem filtro de mês.'),
      (v_atividade, 9, 3, 'Acrescente a idade em anos na consulta do tópico b e explique as funções usadas.', 0.4, 'SELECT nome, extract(year FROM age(current_date, data_nascimento)) AS idade FROM aluno WHERE extract(month FROM data_nascimento) = 10; **age** calcula o intervalo entre hoje e o nascimento; **extract(year ...)** pega os anos; **current_date** é a data de hoje.', 'Nota cheia (0,4): consulta + explicação das funções. Metade (0,2): só um. Zero (0): idade fixa.'),
      (v_atividade, 10, 1, 'Explique o erro da consulta 1 e corrija.', 0.2, 'Sem aspas, **noite** é lido como **nome de coluna** (erro de coluna inexistente). Correção: **WHERE turno = ''noite''**.', 'Nota cheia (0,2): erro + correção. Metade (0,1): só a correção. Zero (0): nenhum.'),
      (v_atividade, 10, 2, 'Explique o que a consulta 2 faz e corrija para encontrar Silva em qualquer posição.', 0.4, 'Sem %, procura o nome **exatamente igual** a Silva. Correção: **WHERE nome LIKE ''%Silva%''** (ou ILIKE ''%silva%'').', 'Nota cheia (0,4): explicação + correção. Metade (0,2): só um. Zero (0): nenhum.'),
      (v_atividade, 10, 3, 'Explique o erro da consulta 3 e escreva a versão correta.', 0.4, 'O **LIMIT vem depois do ORDER BY**; na ordem errada dá **erro de sintaxe**. Correção: SELECT nome FROM curso ORDER BY valor_mensal DESC LIMIT 3;', 'Nota cheia (0,4): erro + versão correta. Metade (0,2): só um. Zero (0): nenhum.');
end $$;
