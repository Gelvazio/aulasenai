# Padrão de Resposta — Atividade Prática — Aula 15 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: DML: Consultas com Filtros e Ordenação.
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** a aplicação certa na situação **e** a justificativa,
   quando o tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do
   tema, conceito trocado ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** outros exemplos de sistema, desde que corretos; sinônimos dos
   termos (registro = linha; campo = coluna; SGBD = gerenciador de banco de dados; chave primária =
   PK; chave estrangeira = FK); SQL equivalente que produza o mesmo resultado no PostgreSQL; ordem
   diferente das partes da resposta.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** **SELECT *** mostra **todas as colunas**; listar as colunas traz **só as necessárias**, deixando a consulta mais **clara** e **leve**.
**Critérios:** Nota cheia (0,2): diferença clara. Metade (0,1): só uma parte. Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** SELECT nome, valor_mensal, valor_mensal * 12 AS valor_anual FROM curso;
**Critérios:** Nota cheia (0,4): consulta correta com o cálculo e o apelido. Metade (0,2): falta o apelido ou uma coluna. Zero (0): não calcula.

### ITEM 01-c
**Resposta esperada:** **Não altera**: o cálculo existe **só no resultado** da consulta. O **AS** dá o **nome** valor_anual à coluna calculada no resultado.
**Critérios:** Nota cheia (0,4): as duas explicações. Metade (0,2): uma. Zero (0): diz que grava na tabela.

### ITEM 02-a
**Resposta esperada:** SELECT nome, valor_mensal FROM curso WHERE valor_mensal >= 200;
**Critérios:** Nota cheia (0,2): operador >= correto. Metade (0,1): usa > (exclui 200). Zero (0): operador errado.

### ITEM 02-b
**Resposta esperada:** SELECT * FROM matricula WHERE data_matricula BETWEEN '2026-02-01' AND '2026-02-28';
**Critérios:** Nota cheia (0,4): BETWEEN com as duas datas entre aspas. Metade (0,2): datas fora do formato ou sem aspas. Zero (0): sem filtro de data.

### ITEM 02-c
**Resposta esperada:** **Sim**, o BETWEEN **inclui as duas pontas**. Se o campo fosse **data e hora**, '2026-02-28' seria a meia-noite do dia 28, e as matrículas **ao longo do dia 28 ficariam de fora**; seria melhor usar data_matricula >= '2026-02-01' AND data_matricula < '2026-03-01'.
**Critérios:** Nota cheia (0,4): inclui as pontas + problema da hora. Metade (0,2): só um. Zero (0): diz que não inclui as pontas.

### ITEM 03-a
**Resposta esperada:** O **IN** verifica se o valor **está numa lista** de valores.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 03-b
**Resposta esperada:** SELECT * FROM matricula WHERE situacao IN ('trancada', 'cancelada'); e SELECT * FROM turma WHERE id_curso IN (1, 3, 5);
**Critérios:** Nota cheia (0,4): as duas consultas. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 03-c
**Resposta esperada:** SELECT * FROM turma WHERE id_curso = 1 OR id_curso = 3 OR id_curso = 5; A forma com **IN** é **mais curta e legível**.
**Critérios:** Nota cheia (0,4): reescrita com OR + avaliação. Metade (0,2): só um. Zero (0): usa AND.

### ITEM 04-a
**Resposta esperada:** **%** representa **qualquer quantidade de caracteres** (inclusive nenhum); **_** representa **exatamente um caractere**.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.

### ITEM 04-b
**Resposta esperada:** SELECT nome FROM aluno WHERE nome LIKE 'Ana%';
**Critérios:** Nota cheia (0,4): consulta correta. Metade (0,2): '%Ana%' (traz também nomes que só contêm Ana). Zero (0): sem LIKE ou sem %.

### ITEM 04-c
**Resposta esperada:** SELECT nome FROM aluno WHERE nome ILIKE '%silva%'; O **ILIKE** funciona como o LIKE, mas **sem diferenciar maiúsculas e minúsculas** (recurso do PostgreSQL).
**Critérios:** Nota cheia (0,4): consulta + explicação. Metade (0,2): só um, ou lower(nome) LIKE '%silva%' sem explicar. Zero (0): LIKE 'Silva' exato.

### ITEM 05-a
**Resposta esperada:** SELECT nome FROM aluno WHERE email IS NULL;
**Critérios:** Nota cheia (0,2): IS NULL. Zero (0): = NULL.

### ITEM 05-b
**Resposta esperada:** **NULL** representa a **ausência de valor**; uma comparação com **=** contra NULL **não é verdadeira** (o resultado é desconhecido), então nenhuma linha passa no filtro. Por isso usa-se **IS NULL**.
**Critérios:** Nota cheia (0,4): ausência de valor + comparação não verdadeira + IS NULL. Metade (0,2): só "tem que usar IS NULL". Zero (0): sem relação.

### ITEM 05-c
**Resposta esperada:** SELECT nome, coalesce(email, 'sem e-mail') AS email FROM aluno;
**Critérios:** Nota cheia (0,4): coalesce correto. Metade (0,2): CASE ou ideia certa com erro de sintaxe. Zero (0): filtra só os vazios.

### ITEM 06-a
**Resposta esperada:** **AND**: as duas condições precisam ser verdadeiras. **OR**: basta uma ser verdadeira.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): invertidos.

### ITEM 06-b
**Resposta esperada:** Sem parênteses, o **AND é avaliado antes** do OR: a condição vira (turno = 'noite' AND id_curso = 1) OR id_curso = 3, trazendo **todas as turmas do curso 3**, de qualquer turno.
**Critérios:** Nota cheia (0,4): precedência + efeito. Metade (0,2): só "faltam parênteses". Zero (0): sem relação.

### ITEM 06-c
**Resposta esperada:** SELECT * FROM turma WHERE turno = 'noite' AND (id_curso = 1 OR id_curso = 3); (ou id_curso IN (1, 3)).
**Critérios:** Nota cheia (0,4): consulta correta. Metade (0,2): parênteses no lugar errado. Zero (0): mantém o erro.

### ITEM 07-a
**Resposta esperada:** **ASC** ordena do **menor para o maior** (padrão); **DESC** do **maior para o menor**.
**Critérios:** Nota cheia (0,2): os dois. Zero (0): invertidos.

### ITEM 07-b
**Resposta esperada:** SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal DESC, nome ASC;
**Critérios:** Nota cheia (0,4): as duas colunas na ordem certa. Metade (0,2): só a primeira ordenação. Zero (0): ordem invertida.

### ITEM 07-c
**Resposta esperada:** A segunda coluna serve de **desempate**: quando dois cursos têm o **mesmo valor**, ficam em **ordem alfabética** do nome.
**Critérios:** Nota cheia (0,4): ideia de desempate. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal DESC LIMIT 3;
**Critérios:** Nota cheia (0,2): ORDER BY DESC + LIMIT 3. Zero (0): sem ordenação.

### ITEM 08-b
**Resposta esperada:** SELECT nome FROM aluno ORDER BY nome LIMIT 10 OFFSET 10;
**Critérios:** Nota cheia (0,4): LIMIT 10 OFFSET 10 com ORDER BY. Metade (0,2): OFFSET errado ou sem ORDER BY. Zero (0): sem LIMIT.

### ITEM 08-c
**Resposta esperada:** Sem ORDER BY, o banco **não garante a ordem** das linhas: as "primeiras" e a "segunda página" podem **mudar** a cada consulta, repetindo ou pulando alunos.
**Critérios:** Nota cheia (0,4): ordem não garantida + consequência. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 09-a
**Resposta esperada:** SELECT DISTINCT turno FROM turma;
**Critérios:** Nota cheia (0,2): DISTINCT correto. Zero (0): sem DISTINCT.

### ITEM 09-b
**Resposta esperada:** SELECT nome, data_nascimento FROM aluno WHERE extract(month FROM data_nascimento) = 10;
**Critérios:** Nota cheia (0,4): filtro pelo mês correto. Metade (0,2): filtro que depende do ano (BETWEEN de um ano só). Zero (0): sem filtro de mês.

### ITEM 09-c
**Resposta esperada:** SELECT nome, extract(year FROM age(current_date, data_nascimento)) AS idade FROM aluno WHERE extract(month FROM data_nascimento) = 10; **age** calcula o intervalo entre hoje e o nascimento; **extract(year ...)** pega os anos; **current_date** é a data de hoje.
**Critérios:** Nota cheia (0,4): consulta + explicação das funções. Metade (0,2): só um. Zero (0): idade fixa.

### ITEM 10-a
**Resposta esperada:** Sem aspas, **noite** é lido como **nome de coluna** (erro de coluna inexistente). Correção: **WHERE turno = 'noite'**.
**Critérios:** Nota cheia (0,2): erro + correção. Metade (0,1): só a correção. Zero (0): nenhum.

### ITEM 10-b
**Resposta esperada:** Sem %, procura o nome **exatamente igual** a Silva. Correção: **WHERE nome LIKE '%Silva%'** (ou ILIKE '%silva%').
**Critérios:** Nota cheia (0,4): explicação + correção. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 10-c
**Resposta esperada:** O **LIMIT vem depois do ORDER BY**; na ordem errada dá **erro de sintaxe**. Correção: SELECT nome FROM curso ORDER BY valor_mensal DESC LIMIT 3;
**Critérios:** Nota cheia (0,4): erro + versão correta. Metade (0,2): só um. Zero (0): nenhum.
