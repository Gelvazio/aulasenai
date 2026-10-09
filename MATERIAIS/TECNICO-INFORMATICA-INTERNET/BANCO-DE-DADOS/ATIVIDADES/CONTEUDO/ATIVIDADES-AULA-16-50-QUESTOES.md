# Atividade: Consultas com Junções, Agrupamentos e Subconsultas — 50 Questões

- **Aula:** 16
- **Tema:** Consultas com Junções, Agrupamentos e Subconsultas
- **Ícone:** 🔗
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar linguagem de manipulação de dados nas consultas: INNER JOIN e ON, apelidos de tabela, junção de três tabelas, LEFT e RIGHT JOIN, produto cartesiano, COUNT, SUM, AVG, MIN e MAX, GROUP BY, HAVING, ordem de execução, subconsultas com =, IN, EXISTS e no FROM e erros comuns.
- **Conteúdo-base:** ../CONTEUDO/AULA-16-CONSULTAS-COM-JUNCOES-AGRUPAMENTOS-E-SUBCONSULTAS.md
- **Slides:** ../AULAS/AULA-16-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-16-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Por Que Juntar Tabelas

- **Capacidade:** C8

**Comando:**  
Por que, depois da normalização, é preciso juntar tabelas para mostrar o nome do curso de cada turma?

**Alternativas:**
- A) Porque a turma guarda só o id_curso, e o nome fica na tabela curso.
- B) Porque o PostgreSQL não aceita consultas em uma tabela só.
- C) Porque o nome do curso fica repetido em todas as turmas.
- D) Porque a tabela turma não tem chave primária.

**Gabarito:** A

---

## ITEM 02 — Cláusula ON

- **Capacidade:** C8

**Comando:**  
No INNER JOIN, para que serve a cláusula ON?

**Alternativas:**
- A) Ordenar o resultado.
- B) Dizer quais colunas ligam as duas tabelas, normalmente FK = PK.
- C) Filtrar grupos depois do GROUP BY.
- D) Limitar a quantidade de linhas.

**Gabarito:** B

---

## ITEM 03 — INNER JOIN

- **Capacidade:** C8

**Comando:**  
Qual linha o INNER JOIN entre turma e curso traz no resultado?

**Alternativas:**
- A) Todas as linhas de curso, mesmo sem turma.
- B) Todas as linhas de turma, mesmo sem curso.
- C) Só as linhas que têm par nas duas tabelas.
- D) Todas as combinações possíveis entre as tabelas.

**Gabarito:** C

---

## ITEM 04 — JOIN Sozinho

- **Capacidade:** C8

**Comando:**  
Escrever apenas JOIN, sem a palavra INNER, no PostgreSQL:

**Alternativas:**
- A) Equivale a LEFT JOIN.
- B) Gera erro de sintaxe.
- C) Equivale a RIGHT JOIN.
- D) Equivale a INNER JOIN.

**Gabarito:** D

---

## ITEM 05 — Apelido de Tabela

- **Capacidade:** C8

**Comando:**  
Em FROM turma t JOIN curso c ON c.id_curso = t.id_curso, o que são t e c?

**Alternativas:**
- A) Novas tabelas criadas pela consulta.
- B) Apelidos das tabelas, que encurtam a consulta e evitam ambiguidade.
- C) Colunas calculadas.
- D) Índices das tabelas.

**Gabarito:** B

---

## ITEM 06 — Ambiguidade de Coluna

- **Capacidade:** C8

**Comando:**  
Turma e curso têm a coluna id_curso. O que acontece em SELECT id_curso FROM turma JOIN curso ON curso.id_curso = turma.id_curso;?

**Alternativas:**
- A) Erro de coluna ambígua: é preciso indicar a tabela, como turma.id_curso.
- B) O PostgreSQL escolhe a coluna de curso.
- C) Volta zero linhas.
- D) As duas colunas são somadas.

**Gabarito:** A

---

## ITEM 07 — Produto Cartesiano

- **Capacidade:** C8

**Comando:**  
O que acontece quando se juntam duas tabelas sem condição de ligação (ou com a ligação errada)?

**Alternativas:**
- A) O PostgreSQL liga as tabelas sozinho pela chave.
- B) Volta só a primeira linha de cada tabela.
- C) As tabelas são apagadas.
- D) Produto cartesiano: cada linha de uma combinada com todas as da outra.

**Gabarito:** D

---

## ITEM 08 — Três Tabelas

- **Capacidade:** C8

**Comando:**  
Para listar aluno, turma e curso de cada matrícula, quantos JOIN são necessários a partir de matricula?

**Alternativas:**
- A) Um só, que liga tudo.
- B) Nenhum: basta listar as tabelas no SELECT.
- C) Três: aluno, turma e curso, cada um com o seu ON.
- D) Dois, porque curso não se liga à turma.

**Gabarito:** C

---

## ITEM 09 — Tabela Ponte

- **Capacidade:** C8

**Comando:**  
Na consulta de alunos por turma, qual tabela faz a ponte entre aluno e turma?

**Alternativas:**
- A) curso.
- B) parcela.
- C) matricula, a tabela associativa.
- D) aluno.

**Gabarito:** C

---

## ITEM 10 — Ligação Correta

- **Capacidade:** C8

**Comando:**  
Qual é a ligação correta entre matricula (m) e turma (t)?

**Alternativas:**
- A) ON t.id_turma = m.id_turma
- B) ON t.id_curso = m.id_matricula
- C) ON t.codigo = m.situacao
- D) ON t.id_turma = m.id_aluno

**Gabarito:** A

---

## ITEM 11 — LEFT JOIN

- **Capacidade:** C8

**Comando:**  
O que o LEFT JOIN de curso (esquerda) com turma (direita) traz?

**Alternativas:**
- A) Só os cursos que têm turma.
- B) Só as turmas sem curso.
- C) Todas as turmas, com ou sem curso.
- D) Todos os cursos, com ou sem turma; sem turma, as colunas de turma vêm NULL.

**Gabarito:** D

---

## ITEM 12 — Cursos sem Turma

- **Capacidade:** C8

**Comando:**  
Como completar FROM curso c LEFT JOIN turma t ON t.id_curso = c.id_curso para achar os cursos sem nenhuma turma?

**Alternativas:**
- A) WHERE t.id_turma = 0
- B) WHERE t.id_turma IS NULL
- C) WHERE c.id_curso IS NULL
- D) HAVING t.id_turma = NULL

**Gabarito:** B

---

## ITEM 13 — RIGHT JOIN

- **Capacidade:** C8

**Comando:**  
O que faz o RIGHT JOIN?

**Alternativas:**
- A) Traz só as linhas sem par.
- B) Junta as tabelas pela direita e apaga as da esquerda.
- C) É o mesmo que INNER JOIN.
- D) Traz todas as linhas da tabela da direita, com ou sem par.

**Gabarito:** D

---

## ITEM 14 — Escolha do JOIN

- **Capacidade:** C8

**Comando:**  
A diretora pede "todos os alunos, inclusive os que nunca se matricularam". Qual junção usar entre aluno e matricula?

**Alternativas:**
- A) aluno INNER JOIN matricula.
- B) aluno LEFT JOIN matricula.
- C) Nenhuma: basta SELECT * FROM matricula.
- D) matricula INNER JOIN turma.

**Gabarito:** B

---

## ITEM 15 — COUNT(*)

- **Capacidade:** C8

**Comando:**  
O que devolve SELECT count(*) FROM aluno;?

**Alternativas:**
- A) A quantidade de linhas da tabela aluno.
- B) A soma dos id_aluno.
- C) O maior id_aluno.
- D) Todas as colunas de aluno.

**Gabarito:** A

---

## ITEM 16 — COUNT(coluna)

- **Capacidade:** C8

**Comando:**  
Qual a diferença entre count(*) e count(email) na tabela aluno?

**Alternativas:**
- A) Não há diferença.
- B) count(email) conta os e-mails repetidos duas vezes.
- C) count(email) conta só os alunos com e-mail preenchido (não nulo).
- D) count(*) ignora as linhas com NULL.

**Gabarito:** C

---

## ITEM 17 — SUM

- **Capacidade:** C8

**Comando:**  
Qual função soma o valor de todas as parcelas?

**Alternativas:**
- A) SUM(valor)
- B) COUNT(valor)
- C) AVG(valor)
- D) MAX(valor)

**Gabarito:** A

---

## ITEM 18 — AVG

- **Capacidade:** C8

**Comando:**  
Qual consulta mostra a média do valor mensal dos cursos?

**Alternativas:**
- A) SELECT sum(valor_mensal) FROM curso;
- B) SELECT avg(valor_mensal) FROM curso;
- C) SELECT valor_mensal FROM curso ORDER BY avg;
- D) SELECT count(valor_mensal) FROM curso;

**Gabarito:** B

---

## ITEM 19 — MIN e MAX

- **Capacidade:** C8

**Comando:**  
Para saber a data da matrícula mais recente, usa-se:

**Alternativas:**
- A) min(data_matricula)
- B) count(data_matricula)
- C) sum(data_matricula)
- D) max(data_matricula)

**Gabarito:** D

---

## ITEM 20 — Agregação e NULL

- **Capacidade:** C8

**Comando:**  
Como as funções SUM e AVG tratam os valores NULL?

**Alternativas:**
- A) Contam os NULL como zero na média.
- B) Dão erro quando encontram NULL.
- C) Ignoram os NULL no cálculo.
- D) Trocam o NULL pelo maior valor.

**Gabarito:** C

---

## ITEM 21 — GROUP BY

- **Capacidade:** C8

**Comando:**  
Para que serve o GROUP BY?

**Alternativas:**
- A) Ordenar o resultado.
- B) Juntar as linhas com o mesmo valor e calcular a agregação por grupo.
- C) Ligar duas tabelas.
- D) Remover colunas repetidas da tabela.

**Gabarito:** B

---

## ITEM 22 — Regra do GROUP BY

- **Capacidade:** C8

**Comando:**  
Na consulta SELECT c.nome, count(*) FROM ... GROUP BY ?, o que deve ir no GROUP BY?

**Alternativas:**
- A) count(*).
- B) Nada: o GROUP BY é opcional nesse caso.
- C) c.nome, porque toda coluna sem agregação no SELECT precisa estar no GROUP BY.
- D) Todas as colunas da tabela curso, sempre.

**Gabarito:** C

---

## ITEM 23 — Erro do GROUP BY

- **Capacidade:** C8

**Comando:**  
O erro "must appear in the GROUP BY clause" indica que:

**Alternativas:**
- A) Há coluna no SELECT sem agregação que não está no GROUP BY.
- B) A tabela não existe.
- C) Falta o ON no JOIN.
- D) O HAVING está antes do WHERE.

**Gabarito:** A

---

## ITEM 24 — Matrículas por Curso

- **Capacidade:** C8

**Comando:**  
Qual consulta conta as matrículas de cada curso?

**Alternativas:**
- A) SELECT count(*) FROM curso;
- B) SELECT nome FROM curso ORDER BY matriculas;
- C) SELECT DISTINCT id_turma FROM matricula;
- D) JOIN de curso, turma e matricula com count(m.id_matricula) e GROUP BY c.nome.

**Gabarito:** D

---

## ITEM 25 — HAVING

- **Capacidade:** C8

**Comando:**  
Para que serve o HAVING?

**Alternativas:**
- A) Filtrar linhas antes do agrupamento.
- B) Ligar tabelas.
- C) Dar apelidos às colunas.
- D) Filtrar os grupos depois do GROUP BY, aceitando funções de agregação.

**Gabarito:** D

---

## ITEM 26 — WHERE × HAVING

- **Capacidade:** C8

**Comando:**  
Qual a diferença entre WHERE e HAVING?

**Alternativas:**
- A) WHERE filtra linhas antes de agrupar; HAVING filtra grupos depois.
- B) São iguais e podem ser trocados.
- C) HAVING filtra linhas e WHERE filtra grupos.
- D) WHERE só funciona com JOIN.

**Gabarito:** A

---

## ITEM 27 — Agregação no WHERE

- **Capacidade:** C8

**Comando:**  
O que acontece com WHERE count(*) > 3?

**Alternativas:**
- A) Funciona igual ao HAVING.
- B) Devolve as linhas com id maior que 3.
- C) Erro: função de agregação não é aceita no WHERE; usar HAVING.
- D) Ignora a condição.

**Gabarito:** C

---

## ITEM 28 — Turmas com Poucos Alunos

- **Capacidade:** C8

**Comando:**  
Qual trecho filtra as turmas com menos de 5 matrículas?

**Alternativas:**
- A) WHERE count(*) < 5 GROUP BY t.codigo
- B) GROUP BY t.codigo HAVING count(*) < 5
- C) ORDER BY count(*) < 5
- D) LIMIT 5

**Gabarito:** B

---

## ITEM 29 — Ordem de Execução

- **Capacidade:** C8

**Comando:**  
Qual é a ordem lógica de execução das cláusulas?

**Alternativas:**
- A) SELECT, FROM, WHERE, ORDER BY, GROUP BY.
- B) FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.
- C) WHERE, SELECT, FROM, HAVING, GROUP BY.
- D) ORDER BY, SELECT, FROM, WHERE, HAVING.

**Gabarito:** B

---

## ITEM 30 — Apelido no ORDER BY

- **Capacidade:** C8

**Comando:**  
Em SELECT c.nome, count(*) AS matriculas ... GROUP BY c.nome ORDER BY matriculas DESC;, o ORDER BY:

**Alternativas:**
- A) Dá erro, porque o apelido não existe.
- B) Ordena pelo nome do curso.
- C) Agrupa de novo pela contagem.
- D) Ordena pelo apelido da contagem, do maior para o menor.

**Gabarito:** D

---

## ITEM 31 — Faturamento por Curso

- **Capacidade:** C8

**Comando:**  
Para o faturamento previsto por curso, juntam-se curso, turma, matricula e parcela e usa-se:

**Alternativas:**
- A) sum(p.valor) com GROUP BY c.nome.
- B) count(p.valor) sem GROUP BY.
- C) max(p.valor) com ORDER BY.
- D) avg(c.id_curso) com HAVING.

**Gabarito:** A

---

## ITEM 32 — Subconsulta

- **Capacidade:** C8

**Comando:**  
O que é uma subconsulta?

**Alternativas:**
- A) Uma tabela temporária gravada no disco.
- B) Um índice da tabela.
- C) Uma consulta dentro de outra, escrita entre parênteses.
- D) Um JOIN sem ON.

**Gabarito:** C

---

## ITEM 33 — Subconsulta com Um Valor

- **Capacidade:** C8

**Comando:**  
Em WHERE valor_mensal > (SELECT avg(valor_mensal) FROM curso), a subconsulta devolve:

**Alternativas:**
- A) Uma lista de cursos.
- B) Todas as colunas de curso.
- C) Um só valor: a média do valor mensal.
- D) Nenhum valor.

**Gabarito:** C

---

## ITEM 34 — Cursos Acima da Média

- **Capacidade:** C8

**Comando:**  
A consulta WHERE valor_mensal > (SELECT avg(valor_mensal) FROM curso) mostra:

**Alternativas:**
- A) Os cursos mais caros que a média.
- B) Os cursos mais baratos que a média.
- C) A média de todos os cursos.
- D) Só o curso mais caro.

**Gabarito:** A

---

## ITEM 35 — Subconsulta com IN

- **Capacidade:** C8

**Comando:**  
Quando a subconsulta devolve vários valores, qual operador usar no WHERE?

**Alternativas:**
- A) =
- B) IN
- C) LIKE
- D) BETWEEN

**Gabarito:** B

---

## ITEM 36 — Erro com Igual

- **Capacidade:** C8

**Comando:**  
O que acontece com WHERE id_aluno = (SELECT id_aluno FROM matricula) quando há várias matrículas?

**Alternativas:**
- A) Funciona e compara com a primeira linha.
- B) Devolve todos os alunos.
- C) Devolve zero linhas sem erro.
- D) Erro: a subconsulta devolve mais de uma linha; usar IN.

**Gabarito:** D

---

## ITEM 37 — EXISTS

- **Capacidade:** C8

**Comando:**  
O que o EXISTS verifica?

**Alternativas:**
- A) Se a subconsulta devolve pelo menos uma linha.
- B) Se a tabela existe no banco.
- C) Se a coluna aceita NULL.
- D) Se o valor é o maior da tabela.

**Gabarito:** A

---

## ITEM 38 — NOT EXISTS

- **Capacidade:** C8

**Comando:**  
A consulta SELECT c.nome FROM curso c WHERE NOT EXISTS (SELECT 1 FROM turma t WHERE t.id_curso = c.id_curso); mostra:

**Alternativas:**
- A) Os cursos que têm turma.
- B) As turmas sem curso.
- C) Todos os cursos e turmas.
- D) Os cursos que não têm nenhuma turma.

**Gabarito:** D

---

## ITEM 39 — Subconsulta no FROM

- **Capacidade:** C8

**Comando:**  
O que é obrigatório numa subconsulta usada no FROM?

**Alternativas:**
- A) Usar LEFT JOIN.
- B) Dar um apelido a ela (ex.: AS por_turma).
- C) Ter ORDER BY.
- D) Devolver um só valor.

**Gabarito:** B

---

## ITEM 40 — JOIN × Subconsulta

- **Capacidade:** C8

**Comando:**  
Quando a mesma pergunta pode ser respondida por JOIN ou por subconsulta, o que fazer?

**Alternativas:**
- A) Usar sempre subconsulta.
- B) Usar sempre produto cartesiano.
- C) Escolher a forma mais clara para quem vai ler a consulta.
- D) Escrever as duas na mesma consulta.

**Gabarito:** C

---

## ITEM 41 — Alunos com Parcela em Atraso

- **Capacidade:** C8

**Comando:**  
Qual filtro identifica parcela vencida e não paga?

**Alternativas:**
- A) p.data_pagamento IS NULL AND p.vencimento < current_date
- B) p.data_pagamento = NULL OR p.vencimento > current_date
- C) p.valor < 0
- D) p.vencimento IS NULL

**Gabarito:** A

---

## ITEM 42 — Alunos sem Matrícula

- **Capacidade:** C8

**Comando:**  
Qual consulta lista os alunos que nunca se matricularam?

**Alternativas:**
- A) aluno INNER JOIN matricula.
- B) aluno LEFT JOIN matricula com WHERE m.id_matricula IS NULL.
- C) SELECT * FROM matricula WHERE id_aluno IS NULL.
- D) SELECT count(*) FROM aluno.

**Gabarito:** B

---

## ITEM 43 — COUNT depois do LEFT JOIN

- **Capacidade:** C8

**Comando:**  
Depois de curso LEFT JOIN turma, como contar só as turmas reais de cada curso?

**Alternativas:**
- A) count(*), que ignora os NULL.
- B) sum(t.id_turma).
- C) count(t.id_turma), que não conta o NULL dos cursos sem turma.
- D) max(*).

**Gabarito:** C

---

## ITEM 44 — Média por Curso

- **Capacidade:** C8

**Comando:**  
Para a média de idade dos alunos por curso, a consulta precisa de:

**Alternativas:**
- A) Só a tabela curso.
- B) HAVING sem GROUP BY.
- C) LIMIT 1.
- D) JOIN até curso, avg da idade e GROUP BY c.nome.

**Gabarito:** D

---

## ITEM 45 — Maior Faturamento

- **Capacidade:** C8

**Comando:**  
Como mostrar só o curso de maior faturamento?

**Alternativas:**
- A) WHERE sum(p.valor) = max.
- B) GROUP BY c.nome, ORDER BY sum(p.valor) DESC e LIMIT 1.
- C) SELECT max(c.nome).
- D) GROUP BY p.valor LIMIT 1.

**Gabarito:** B

---

## ITEM 46 — Relatório no Back-end

- **Capacidade:** C8

**Comando:**  
Por que os relatórios em SQL são importantes para o back-end do sistema?

**Alternativas:**
- A) O back-end chama essas consultas para montar telas e painéis com dados do banco.
- B) Porque substituem o banco de dados.
- C) Porque apagam os dados antigos.
- D) Porque criam as tabelas automaticamente.

**Gabarito:** A

---

## ITEM 47 — Erro de INNER no Lugar de LEFT

- **Capacidade:** C8

**Comando:**  
Um relatório de "todos os cursos com a quantidade de turmas" usou INNER JOIN. Qual o problema?

**Alternativas:**
- A) Os cursos aparecem duplicados para sempre.
- B) Dá erro de sintaxe.
- C) A contagem vira soma.
- D) Os cursos sem turma somem do relatório.

**Gabarito:** D

---

## ITEM 48 — Organização do Script

- **Capacidade:** C8

**Comando:**  
O que o script 04-relatorios.sql da SA 2 deve trazer em cada relatório?

**Alternativas:**
- A) Só o resultado copiado da tela.
- B) Os comandos CREATE TABLE.
- C) A consulta comentada com a pergunta do cliente que ela responde.
- D) As senhas do banco.

**Gabarito:** C

---

## ITEM 49 — Leitura de Consulta

- **Capacidade:** C8

**Comando:**  
SELECT t.codigo, count(m.id_matricula) FROM turma t LEFT JOIN matricula m ON m.id_turma = t.id_turma GROUP BY t.codigo; mostra:

**Alternativas:**
- A) Cada turma com a quantidade de matrículas, inclusive as turmas com zero.
- B) Só as turmas com matrícula.
- C) O total de matrículas da escola em uma linha.
- D) As matrículas sem turma.

**Gabarito:** A

---

## ITEM 50 — Próxima Aula

- **Capacidade:** C8

**Comando:**  
O que será estudado na aula 17?

**Alternativas:**
- A) Normalização.
- B) Procedimentos armazenados.
- C) Instalação do PostgreSQL.
- D) Entidades fortes e fracas.

**Gabarito:** B
