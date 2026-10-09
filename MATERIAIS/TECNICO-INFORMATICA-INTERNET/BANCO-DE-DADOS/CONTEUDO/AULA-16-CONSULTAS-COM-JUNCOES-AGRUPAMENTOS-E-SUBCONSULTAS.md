# Aula 16 — Consultas com Junções, Agrupamentos e Subconsultas

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 3.2 Linguagem de manipulação de dados — 3.2.1 Consulta
- **Capacidades:** C8 — Aplicar linguagem de manipulação de dados
- **Estratégias:** demonstração no psql, desenho das junções no quadro, desafios graduados de
  relatório, dinâmica em trios, trabalho da SA 2
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-16.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-16.md)

## Indicadores

- (10) Insere, atualiza, exclui e consulta dados com DML (C8).

## Objetivos

- Juntar tabelas relacionadas com **INNER JOIN** usando a chave estrangeira na cláusula **ON**.
- Usar **LEFT JOIN** para mostrar também as linhas sem correspondente (ex.: curso sem turma).
- Usar **apelidos de tabela** e juntar três ou mais tabelas na mesma consulta.
- Resumir dados com as funções de agregação **COUNT, SUM, AVG, MIN e MAX**.
- Agrupar com **GROUP BY** e filtrar grupos com **HAVING** (diferença para o WHERE).
- Escrever **subconsultas** no WHERE (com `=`, `IN` e `EXISTS`) e no FROM.
- Montar os relatórios da SA 2 (matrículas por curso, faturamento, inadimplência).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: WHERE, ORDER BY, LIMIT e DISTINCT (aula 15) |
| Exposição com demonstração | 40 min | Por que juntar tabelas; INNER JOIN, apelidos e LEFT JOIN |
| Demonstração | 35 min | COUNT, SUM, AVG, MIN, MAX; GROUP BY e HAVING; subconsultas |
| Intervalo | 15 min | — |
| Dinâmica | 25 min | "Relatório da diretoria" (abaixo) |
| Prática autônoma (SA 2) | 85 min | 10 relatórios no banco `escola_db` |
| Registro | 25 min | Correção coletiva e quiz de saída |

## Conteúdo

### 1. Por que juntar tabelas
Depois da normalização (aula 10), cada assunto fica numa tabela: a **turma** guarda só o
`id_curso`, não o nome do curso. Para mostrar "turma + nome do curso" é preciso **juntar** as duas
tabelas pela chave estrangeira (aula 13).

### 2. INNER JOIN
```sql
SELECT t.codigo, t.turno, c.nome AS curso
FROM turma t
INNER JOIN curso c ON c.id_curso = t.id_curso;
```
- **ON** diz qual coluna liga as tabelas (FK = PK).
- **t** e **c** são **apelidos de tabela**: deixam a consulta curta e evitam ambiguidade quando as
  duas tabelas têm colunas com o mesmo nome.
- O INNER JOIN traz **só as linhas que têm par** nas duas tabelas. `JOIN` sozinho = `INNER JOIN`.
- Esquecer o ON (ou ligar colunas erradas) gera o **produto cartesiano**: cada linha de uma tabela
  combinada com todas as da outra — resultado enorme e errado.

### 3. Três tabelas ou mais
```sql
SELECT a.nome AS aluno, t.codigo AS turma, c.nome AS curso, m.situacao
FROM matricula m
JOIN aluno a ON a.id_aluno = m.id_aluno
JOIN turma t ON t.id_turma = m.id_turma
JOIN curso c ON c.id_curso = t.id_curso
WHERE m.situacao = 'ativa'
ORDER BY c.nome, a.nome;
```
Cada JOIN acrescenta uma tabela e tem o seu ON. A tabela associativa `matricula` (aula 6) é a
ponte entre aluno e turma.

### 4. LEFT JOIN
```sql
SELECT c.nome, t.codigo
FROM curso c
LEFT JOIN turma t ON t.id_curso = c.id_curso;
```
- Traz **todas** as linhas da tabela da **esquerda** (curso), com ou sem par.
- Onde não há par, as colunas da direita vêm **NULL**.
- Achar quem **não tem** par: `WHERE t.id_turma IS NULL` (cursos sem nenhuma turma).
- **RIGHT JOIN** faz o mesmo pelo lado direito; na prática, basta inverter a ordem e usar LEFT.

### 5. Funções de agregação

| Função | O que devolve | Exemplo |
|---|---|---|
| `COUNT(*)` | quantidade de linhas | `SELECT count(*) FROM aluno;` |
| `COUNT(coluna)` | quantidade de valores **não nulos** | `count(email)` = alunos com e-mail |
| `SUM(coluna)` | soma | `sum(valor)` das parcelas |
| `AVG(coluna)` | média | `avg(valor_mensal)` dos cursos |
| `MIN` / `MAX` | menor / maior | `max(data_matricula)` = matrícula mais recente |

As funções de agregação **ignoram os NULL** (exceto `COUNT(*)`).

### 6. GROUP BY
```sql
SELECT c.nome AS curso, count(m.id_matricula) AS matriculas
FROM curso c
JOIN turma t ON t.id_curso = c.id_curso
JOIN matricula m ON m.id_turma = t.id_turma
GROUP BY c.nome
ORDER BY matriculas DESC;
```
- **GROUP BY** junta as linhas com o mesmo valor e calcula a agregação **por grupo**.
- Regra: toda coluna do SELECT que **não** está numa função de agregação **precisa** estar no
  GROUP BY (senão o PostgreSQL dá erro *must appear in the GROUP BY clause*).

### 7. HAVING × WHERE
```sql
SELECT t.codigo, count(*) AS alunos
FROM matricula m
JOIN turma t ON t.id_turma = m.id_turma
WHERE m.situacao = 'ativa'          -- filtra LINHAS antes de agrupar
GROUP BY t.codigo
HAVING count(*) < 5;                -- filtra GRUPOS depois de agrupar
```
- **WHERE** não aceita função de agregação; **HAVING** sim.
- Ordem de execução: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.

### 8. Subconsultas
Uma consulta dentro de outra, entre parênteses.
```sql
-- Cursos mais caros que a média (subconsulta que devolve UM valor)
SELECT nome, valor_mensal
FROM curso
WHERE valor_mensal > (SELECT avg(valor_mensal) FROM curso);

-- Alunos com alguma parcela vencida e não paga (subconsulta com IN)
SELECT nome FROM aluno
WHERE id_aluno IN (SELECT m.id_aluno
                   FROM matricula m
                   JOIN parcela p ON p.id_matricula = m.id_matricula
                   WHERE p.data_pagamento IS NULL AND p.vencimento < current_date);

-- Cursos sem nenhuma turma (EXISTS / NOT EXISTS)
SELECT c.nome FROM curso c
WHERE NOT EXISTS (SELECT 1 FROM turma t WHERE t.id_curso = c.id_curso);
```
- Com `=` a subconsulta deve devolver **um só valor**; com `IN`, uma **lista**.
- **EXISTS** só verifica se a subconsulta devolve alguma linha.
- Subconsulta no FROM vira uma "tabela temporária" e precisa de apelido:
  `SELECT avg(qtd) FROM (SELECT count(*) AS qtd FROM matricula GROUP BY id_turma) AS por_turma;`
- Muitas subconsultas podem ser escritas como JOIN; escolha a forma **mais clara** para quem vai
  ler.

### 9. Erros comuns
- JOIN sem ON (ou ON com colunas erradas) → produto cartesiano.
- Coluna sem agregação fora do GROUP BY → erro *must appear in the GROUP BY clause*.
- Função de agregação no WHERE (`WHERE count(*) > 3`) → erro; usar HAVING.
- INNER JOIN quando a pergunta pede "inclusive os que não têm" → as linhas sem par somem; usar
  LEFT JOIN.
- `COUNT(*)` depois de um LEFT JOIN conta a linha com NULL como 1; para contar só os pares, usar
  `COUNT(coluna_da_direita)`.

## Exemplo no contexto do curso
A diretora da escola de cursos livres fictícia pede o relatório mensal: "quantas matrículas ativas
cada curso tem, quanto cada curso fatura por mês e quais cursos ainda não têm turma". A equipe
escreve uma consulta com JOIN + GROUP BY para as matrículas, uma com `sum(p.valor)` agrupada por
curso para o faturamento e um LEFT JOIN com `WHERE t.id_turma IS NULL` para os cursos sem turma.
O back-end do sistema vai chamar exatamente essas consultas para montar o painel da secretaria.

## Dinâmica — Relatório da diretoria (25 min, trios)
- **Objetivo:** escolher entre JOIN, GROUP BY/HAVING e subconsulta para responder a um pedido real
  (C8).
- **Materiais:** cartões com pedidos ("turmas com menos de 5 alunos", "média de idade por curso",
  "alunos que nunca se matricularam", "curso com o maior faturamento").
- **Passo a passo:** (1) o trio sorteia um cartão; (2) desenha no papel as tabelas envolvidas e as
  ligações (FK → PK); (3) escreve a consulta e testa no psql; (4) apresenta à turma em 1 minuto,
  dizendo por que escolheu JOIN, HAVING ou subconsulta.
- **Fechamento:** a turma compara soluções diferentes para o mesmo cartão (JOIN × subconsulta).

## Situação-problema e entrega da aula
- **SA 2 (continuação):** script `04-relatorios.sql` com 10 relatórios comentados sobre os dados de
  teste: lista de matrículas com nomes (3 tabelas), cursos sem turma (LEFT JOIN), matrículas por
  curso (GROUP BY), turmas com poucos alunos (HAVING), faturamento previsto por curso (SUM),
  parcelas em atraso por aluno e cursos acima da média (subconsulta), cada um com a pergunta do
  cliente que responde.

## Verificação da aprendizagem
- Escrever a consulta que lista o código de cada turma com o nome do curso.
- Explicar a diferença entre INNER JOIN e LEFT JOIN com um exemplo da escola.
- Dizer quando usar WHERE e quando usar HAVING.
- Escrever a consulta dos alunos que não têm nenhuma matrícula.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), kit multimídia
e slides `../AULAS/AULA-16-SLIDES.pdf` (apresentação, quando o professor publicar).
