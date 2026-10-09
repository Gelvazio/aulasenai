# Atividade: Atividade Prática — Aula 16 — 10 Questões Discursivas

- **Aula:** AP-16
- **Rótulo da aula:** Atividade Prática — Aula 16
- **Tema:** Consultas com Junções, Agrupamentos e Subconsultas
- **Ícone:** 🔗
- **Duração:** 90–120 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 10
- **Pontuação:** 1,0 ponto por questão, dividido em 3 tópicos (0,2 + 0,4 + 0,4) — total: 10 pontos
- **Pontos por questão:** 1,0
- **Página:** ATIVIDADE-PRATICA-AULA-16.html
- **Bloquear colar:** sim
- **Campo do tamanho da resposta:** sim
- **Botão gravar:** sim
- **Progresso para o professor:** sim
- **Ocultar respostas após entrega:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais, os conteúdos da aula 16 (CONTEUDO/AULA-16-CONSULTAS-COM-JUNCOES-AGRUPAMENTOS-E-SUBCONSULTAS.md): INNER JOIN e apelidos, junção de três tabelas, LEFT JOIN, funções de agregação, GROUP BY, HAVING, subconsultas com =, IN, EXISTS e no FROM e erros comuns.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (ATIVIDADE-PRATICA-AULA-16-GABARITO.md, fora do site) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Aula no banco:** 16

**Seu papel em todas as questões:** Você, como aluno consultor, foi chamado para montar os relatórios da secretaria e da diretoria da escola de cursos livres com consultas SQL no banco escola_db (tabelas curso, turma, aluno, matricula e parcela das aulas 12 a 15).

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**: **(1)** o conceito ou a consulta pedida; **(2)** a consulta aplicada à situação; **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Respostas iguais às de colegas ou copiadas da internet são sinalizadas ao professor, que analisa e decide a nota do tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: consulta que funciona no PostgreSQL e devolve o que a pergunta pede, e justificativa com as palavras-chave do conteúdo. Consultas equivalentes que produzam o mesmo resultado valem.

## Cobertura da aula

| Conteúdo da aula 16 | Questões |
|---|---|
| INNER JOIN, ON e apelidos | 01 |
| Junção de três tabelas | 02 |
| LEFT JOIN | 03 |
| Funções de agregação | 04 |
| GROUP BY | 05, 07 |
| HAVING × WHERE e ordem de execução | 06 |
| Subconsultas com um valor e com IN | 08 |
| EXISTS e subconsulta no FROM | 09 |
| Erros comuns | 10 |

---

## ITEM 01 — INNER JOIN e Apelidos

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe da secretaria o pedido: "quero a lista das turmas com o código, o turno e o nome do curso de cada uma".

**Comando:**
Escreva e explique a consulta.

**Tópicos:**
- a) Explique por que é preciso juntar as tabelas turma e curso para atender o pedido. (0,2)
- b) Escreva a consulta com INNER JOIN e apelidos de tabela, mostrando o nome do curso com o apelido curso. (0,4)
- c) Explique o papel do ON e o que aconteceria se ele fosse ligado a colunas erradas. (0,4)

---

## ITEM 02 — Junção de Três Tabelas

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa entregar à coordenação a lista das matrículas ativas com o nome do aluno, o código da turma e o nome do curso, em ordem de curso e de aluno.

**Comando:**
Monte a consulta passo a passo.

**Tópicos:**
- a) Diga quais tabelas entram na consulta e qual delas faz a ponte entre aluno e turma. (0,2)
- b) Escreva a consulta completa. (0,4)
- c) Explique por que cada JOIN precisa do seu próprio ON. (0,4)

---

## ITEM 03 — LEFT JOIN

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe da diretora o pedido: "quero ver todos os cursos com as suas turmas, inclusive os cursos que ainda não têm turma".

**Comando:**
Escreva e explique as consultas.

**Tópicos:**
- a) Explique a diferença entre INNER JOIN e LEFT JOIN. (0,2)
- b) Escreva a consulta de todos os cursos com o código das suas turmas. (0,4)
- c) Altere a consulta para mostrar só os cursos sem nenhuma turma e explique o filtro. (0,4)

---

## ITEM 04 — Funções de Agregação

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe da secretaria quatro perguntas: quantos alunos existem, quantos têm e-mail, qual a média do valor mensal dos cursos e qual a data da matrícula mais recente.

**Comando:**
Escreva as consultas.

**Tópicos:**
- a) Escreva as consultas da quantidade de alunos e da quantidade de alunos com e-mail. (0,2)
- b) Escreva as consultas da média do valor mensal e da matrícula mais recente. (0,4)
- c) Explique por que count(*) e count(email) podem dar resultados diferentes. (0,4)

---

## ITEM 05 — GROUP BY

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa montar o relatório "quantidade de matrículas por curso", do curso com mais matrículas para o com menos.

**Comando:**
Escreva e explique a consulta.

**Tópicos:**
- a) Explique para que serve o GROUP BY. (0,2)
- b) Escreva a consulta pedida. (0,4)
- c) Explique a regra das colunas no GROUP BY e o erro que aparece quando ela não é cumprida. (0,4)

---

## ITEM 06 — HAVING × WHERE

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe o pedido: "quero as turmas com menos de 5 matrículas ativas, para decidir se juntamos turmas". Um colega escreveu WHERE count(*) < 5.

**Comando:**
Corrija e explique.

**Tópicos:**
- a) Explique o erro do colega. (0,2)
- b) Escreva a consulta correta. (0,4)
- c) Explique a ordem de execução das cláusulas e onde entram o WHERE e o HAVING. (0,4)

---

## ITEM 07 — Faturamento por Curso

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa calcular o faturamento previsto de cada curso (soma das parcelas) e destacar o curso que mais fatura.

**Comando:**
Escreva as consultas.

**Tópicos:**
- a) Diga quais tabelas são juntadas e qual função soma as parcelas. (0,2)
- b) Escreva a consulta do faturamento previsto por curso, do maior para o menor. (0,4)
- c) Mostre como deixar só o curso de maior faturamento e justifique. (0,4)

---

## ITEM 08 — Subconsultas com Um Valor e com IN

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, recebe dois pedidos: os cursos mais caros que a média e os alunos que têm alguma parcela vencida e não paga.

**Comando:**
Escreva e explique as subconsultas.

**Tópicos:**
- a) Explique o que é uma subconsulta. (0,2)
- b) Escreva a consulta dos cursos mais caros que a média. (0,4)
- c) Escreva a consulta dos alunos com parcela vencida e não paga e explique por que se usa IN e não =. (0,4)

---

## ITEM 09 — EXISTS e Subconsulta no FROM

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, precisa responder: quais cursos não têm nenhuma turma e qual a média de matrículas por turma.

**Comando:**
Escreva e explique as consultas.

**Tópicos:**
- a) Explique o que o EXISTS verifica. (0,2)
- b) Escreva a consulta dos cursos sem turma usando NOT EXISTS. (0,4)
- c) Escreva a consulta da média de matrículas por turma com uma subconsulta no FROM e explique o apelido. (0,4)

---

## ITEM 10 — Erros Comuns em Relatórios

- **Aula:** 16 · Consultas
- **Capacidade:** C8

**Contexto:**
Você, como aluno consultor, revisa três relatórios de um estagiário: (1) SELECT c.nome, count(t.id_turma) FROM curso c JOIN turma t ON t.id_curso = c.id_curso GROUP BY c.nome; para "todos os cursos com a quantidade de turmas"; (2) SELECT c.nome, t.turno, count(*) FROM curso c JOIN turma t ON t.id_curso = c.id_curso GROUP BY c.nome; (3) SELECT a.nome, t.codigo FROM aluno a, turma t;

**Comando:**
Aponte e corrija os erros.

**Tópicos:**
- a) Explique o problema do relatório 1 e corrija. (0,2)
- b) Explique o erro do relatório 2 e corrija. (0,4)
- c) Explique o que o relatório 3 produz e escreva a versão correta, ligando aluno e turma. (0,4)
