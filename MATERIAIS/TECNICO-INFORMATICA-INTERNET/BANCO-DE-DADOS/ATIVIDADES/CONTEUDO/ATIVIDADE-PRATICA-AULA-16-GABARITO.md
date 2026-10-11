# Padrão de Resposta — Atividade Prática — Aula 16 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Consultas com Junções, Agrupamentos e Subconsultas.
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
**Resposta esperada:** A turma guarda **só o id_curso** (chave estrangeira); o **nome do curso** está na tabela **curso**. Por causa da **normalização**, é preciso **juntar** as duas tabelas.
**Critérios:** Nota cheia (0,2): cita que o nome está em outra tabela/ligada pela FK. Metade (0,1): só diz "para ligar" sem dizer onde está o nome. Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** SELECT t.codigo, t.turno, c.nome AS curso FROM turma t INNER JOIN curso c ON c.id_curso = t.id_curso;
**Critérios:** Nota cheia (0,4): JOIN com ON correto (FK = PK), apelidos e AS curso. Metade (0,2): JOIN certo, mas sem apelido ou sem uma coluna. Zero (0): sem ON ou ligação errada.

### ITEM 01-c
**Resposta esperada:** O **ON** diz **quais colunas ligam** as tabelas (t.id_curso = c.id_curso). Sem ligação ou com colunas erradas, sai o **produto cartesiano** (cada turma combinada com todos os cursos) ou um resultado **errado**.
**Critérios:** Nota cheia (0,4): papel do ON + produto cartesiano/resultado errado. Metade (0,2): só um. Zero (0): diz que o ON ordena ou filtra grupos.

### ITEM 02-a
**Resposta esperada:** Entram **matricula, aluno, turma e curso**; a **matricula** (tabela **associativa**) faz a ponte entre aluno e turma.
**Critérios:** Nota cheia (0,2): as quatro tabelas + matricula como ponte. Metade (0,1): só um dos dois. Zero (0): sem relação.

### ITEM 02-b
**Resposta esperada:** SELECT a.nome AS aluno, t.codigo AS turma, c.nome AS curso FROM matricula m JOIN aluno a ON a.id_aluno = m.id_aluno JOIN turma t ON t.id_turma = m.id_turma JOIN curso c ON c.id_curso = t.id_curso WHERE m.situacao = 'ativa' ORDER BY c.nome, a.nome;
**Critérios:** Nota cheia (0,4): três JOIN com os ON certos, filtro 'ativa' e ORDER BY. Metade (0,2): falta o filtro ou a ordenação, ou um ON errado. Zero (0): sem JOIN.

### ITEM 02-c
**Resposta esperada:** Cada JOIN **acrescenta uma tabela** e precisa dizer **como ela se liga** às anteriores (a sua **FK = PK**); sem isso, aquela tabela gera **produto cartesiano**.
**Critérios:** Nota cheia (0,4): cada tabela tem sua ligação + risco de produto cartesiano. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 03-a
**Resposta esperada:** O **INNER JOIN** traz **só as linhas com par** nas duas tabelas; o **LEFT JOIN** traz **todas as linhas da tabela da esquerda**, com ou sem par (sem par, as colunas da direita vêm **NULL**).
**Critérios:** Nota cheia (0,2): as duas definições. Metade (0,1): só uma. Zero (0): definições trocadas.

### ITEM 03-b
**Resposta esperada:** SELECT c.nome, t.codigo FROM curso c LEFT JOIN turma t ON t.id_curso = c.id_curso;
**Critérios:** Nota cheia (0,4): curso à esquerda com LEFT JOIN e ON correto (ou turma RIGHT JOIN curso). Metade (0,2): LEFT JOIN com as tabelas invertidas. Zero (0): INNER JOIN.

### ITEM 03-c
**Resposta esperada:** SELECT c.nome FROM curso c LEFT JOIN turma t ON t.id_curso = c.id_curso WHERE t.id_turma IS NULL; — curso sem turma fica com as colunas de turma **NULL**, por isso o filtro é **IS NULL** (nunca = NULL).
**Critérios:** Nota cheia (0,4): filtro IS NULL na coluna da direita + explicação. Metade (0,2): só a consulta ou só a explicação. Zero (0): usa = NULL ou filtra a coluna de curso.

### ITEM 04-a
**Resposta esperada:** SELECT count(*) FROM aluno; e SELECT count(email) FROM aluno;
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 04-b
**Resposta esperada:** SELECT avg(valor_mensal) FROM curso; e SELECT max(data_matricula) FROM matricula;
**Critérios:** Nota cheia (0,4): avg e max corretos. Metade (0,2): uma das duas. Zero (0): funções trocadas.

### ITEM 04-c
**Resposta esperada:** **count(*)** conta **todas as linhas**; **count(email)** conta só os valores **não nulos**: as funções de agregação **ignoram os NULL**, então alunos sem e-mail ficam de fora.
**Critérios:** Nota cheia (0,4): explica os dois + NULL. Metade (0,2): só um. Zero (0): diz que são iguais.

### ITEM 05-a
**Resposta esperada:** O **GROUP BY** junta as linhas com o **mesmo valor** e calcula a agregação **por grupo**.
**Critérios:** Nota cheia (0,2): definição. Zero (0): confunde com ordenação.

### ITEM 05-b
**Resposta esperada:** SELECT c.nome AS curso, count(m.id_matricula) AS matriculas FROM curso c JOIN turma t ON t.id_curso = c.id_curso JOIN matricula m ON m.id_turma = t.id_turma GROUP BY c.nome ORDER BY matriculas DESC;
**Critérios:** Nota cheia (0,4): JOIN até matricula, count, GROUP BY c.nome e ORDER BY DESC. Metade (0,2): falta a ordenação ou um JOIN. Zero (0): sem GROUP BY.

### ITEM 05-c
**Resposta esperada:** Toda coluna do SELECT **sem função de agregação** precisa estar **no GROUP BY**; senão o PostgreSQL dá o erro **must appear in the GROUP BY clause** ("deve aparecer na cláusula GROUP BY").
**Critérios:** Nota cheia (0,4): regra + erro. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 06-a
**Resposta esperada:** O **WHERE não aceita função de agregação**: filtra **linhas antes** de agrupar; para filtrar pela contagem, usa-se **HAVING**.
**Critérios:** Nota cheia (0,2): WHERE sem agregação + usar HAVING. Metade (0,1): só um. Zero (0): sem relação.

### ITEM 06-b
**Resposta esperada:** SELECT t.codigo, count(*) AS alunos FROM matricula m JOIN turma t ON t.id_turma = m.id_turma WHERE m.situacao = 'ativa' GROUP BY t.codigo HAVING count(*) < 5;
**Critérios:** Nota cheia (0,4): WHERE para 'ativa', GROUP BY e HAVING count < 5. Metade (0,2): falta o filtro 'ativa' ou o GROUP BY. Zero (0): mantém a agregação no WHERE.

### ITEM 06-c
**Resposta esperada:** Ordem: **FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT**. O **WHERE** age **antes** do agrupamento (linhas) e o **HAVING depois** (grupos).
**Critérios:** Nota cheia (0,4): ordem com WHERE antes e HAVING depois do GROUP BY. Metade (0,2): só a posição de WHERE e HAVING. Zero (0): ordem invertida.

### ITEM 07-a
**Resposta esperada:** Juntam-se **curso, turma, matricula e parcela**; a soma é feita com **SUM(p.valor)**.
**Critérios:** Nota cheia (0,2): tabelas + SUM. Metade (0,1): só um. Zero (0): sem relação.

### ITEM 07-b
**Resposta esperada:** SELECT c.nome, sum(p.valor) AS faturamento FROM curso c JOIN turma t ON t.id_curso = c.id_curso JOIN matricula m ON m.id_turma = t.id_turma JOIN parcela p ON p.id_matricula = m.id_matricula GROUP BY c.nome ORDER BY faturamento DESC;
**Critérios:** Nota cheia (0,4): JOIN até parcela, SUM, GROUP BY e ORDER BY DESC. Metade (0,2): falta a ordenação ou um JOIN. Zero (0): sem SUM ou sem GROUP BY.

### ITEM 07-c
**Resposta esperada:** Acrescentar **LIMIT 1** depois do **ORDER BY faturamento DESC**: a ordem decrescente põe o maior em primeiro e o LIMIT traz só essa linha.
**Critérios:** Nota cheia (0,4): ORDER BY DESC + LIMIT 1 com justificativa (ou subconsulta equivalente). Metade (0,2): sem justificativa. Zero (0): usa max(c.nome) ou WHERE sum().

### ITEM 08-a
**Resposta esperada:** É uma **consulta dentro de outra**, escrita **entre parênteses**, cujo resultado é usado pela consulta de fora.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 08-b
**Resposta esperada:** SELECT nome, valor_mensal FROM curso WHERE valor_mensal > (SELECT avg(valor_mensal) FROM curso);
**Critérios:** Nota cheia (0,4): subconsulta com avg e operador >. Metade (0,2): usa >= ou falta coluna. Zero (0): avg direto no WHERE sem subconsulta.

### ITEM 08-c
**Resposta esperada:** SELECT nome FROM aluno WHERE id_aluno IN (SELECT m.id_aluno FROM matricula m JOIN parcela p ON p.id_matricula = m.id_matricula WHERE p.data_pagamento IS NULL AND p.vencimento < current_date); — usa-se **IN** porque a subconsulta devolve **vários valores**; com **=** dá erro quando volta **mais de uma linha**.
**Critérios:** Nota cheia (0,4): consulta correta + explicação do IN. Metade (0,2): só um dos dois. Zero (0): nenhum.

### ITEM 09-a
**Resposta esperada:** O **EXISTS** verifica se a subconsulta devolve **pelo menos uma linha** (verdadeiro ou falso).
**Critérios:** Nota cheia (0,2): definição. Zero (0): diz que verifica se a tabela existe.

### ITEM 09-b
**Resposta esperada:** SELECT c.nome FROM curso c WHERE NOT EXISTS (SELECT 1 FROM turma t WHERE t.id_curso = c.id_curso);
**Critérios:** Nota cheia (0,4): NOT EXISTS ligado ao curso de fora. Metade (0,2): subconsulta sem a ligação com c.id_curso. Zero (0): sem NOT EXISTS.

### ITEM 09-c
**Resposta esperada:** SELECT avg(qtd) FROM (SELECT count(*) AS qtd FROM matricula GROUP BY id_turma) AS por_turma; — a subconsulta no FROM vira uma **tabela temporária** e **precisa de apelido** (AS por_turma).
**Critérios:** Nota cheia (0,4): consulta correta + apelido obrigatório. Metade (0,2): só um dos dois. Zero (0): nenhum.

### ITEM 10-a
**Resposta esperada:** Com **INNER JOIN**, os cursos **sem turma somem**. Correção: **curso c LEFT JOIN turma t** ON t.id_curso = c.id_curso, mantendo **count(t.id_turma)** (que dá 0 para quem não tem turma).
**Critérios:** Nota cheia (0,2): problema + LEFT JOIN. Metade (0,1): só um. Zero (0): nenhum.

### ITEM 10-b
**Resposta esperada:** A coluna **t.turno** está no SELECT **sem agregação** e **fora do GROUP BY** → erro *must appear in the GROUP BY clause*. Correção: **GROUP BY c.nome, t.turno** (ou tirar t.turno do SELECT).
**Critérios:** Nota cheia (0,4): erro + correção. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 10-c
**Resposta esperada:** Sem ligação, sai o **produto cartesiano** (cada aluno com todas as turmas). Correção: SELECT a.nome, t.codigo FROM aluno a JOIN matricula m ON m.id_aluno = a.id_aluno JOIN turma t ON t.id_turma = m.id_turma;
**Critérios:** Nota cheia (0,4): produto cartesiano + consulta pela matricula. Metade (0,2): só um. Zero (0): nenhum.
