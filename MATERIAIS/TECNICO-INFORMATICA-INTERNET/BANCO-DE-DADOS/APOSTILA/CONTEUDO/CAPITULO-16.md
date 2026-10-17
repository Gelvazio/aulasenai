# Capítulo 16 — Consultas com junções, agrupamentos e subconsultas

- **Aula:** 16
- **Capacidade:** C8

## Teoria

### Por que juntar tabelas

Depois da normalização (capítulo 10), cada assunto fica numa tabela: a **turma** guarda só o
`id_curso`, não o nome do curso. Para mostrar "turma + nome do curso", é preciso **juntar** as
tabelas pela chave estrangeira (capítulo 13).

### INNER JOIN

```sql
SELECT t.codigo, t.turno, c.nome AS curso
FROM turma t
INNER JOIN curso c ON c.id_curso = t.id_curso;
```

- **`ON`** diz qual coluna liga as tabelas (FK = PK).
- **`t`** e **`c`** são **apelidos de tabela**: deixam a consulta curta e evitam ambiguidade.
- O `INNER JOIN` traz **só as linhas que têm par** nas duas tabelas; `JOIN` sozinho é `INNER JOIN`.
- Sem o `ON` (ou com colunas erradas) sai o **produto cartesiano**: cada linha de uma tabela
  combinada com todas as da outra.

### Três tabelas ou mais

```sql
SELECT a.nome AS aluno, t.codigo AS turma, c.nome AS curso, m.situacao
FROM matricula m
JOIN aluno a ON a.id_aluno = m.id_aluno
JOIN turma t ON t.id_turma = m.id_turma
JOIN curso c ON c.id_curso = t.id_curso
WHERE m.situacao = 'ativa'
ORDER BY c.nome, a.nome;
```

Cada `JOIN` acrescenta uma tabela e tem o seu `ON`. A associativa `matricula` é a ponte entre aluno
e turma.

### LEFT JOIN

```sql
SELECT c.nome, t.codigo
FROM curso c
LEFT JOIN turma t ON t.id_curso = c.id_curso;
```

- Traz **todas** as linhas da tabela da **esquerda**, com ou sem par; sem par, as colunas da
  direita vêm **NULL**.
- Quem **não tem** par: `WHERE t.id_turma IS NULL` (cursos sem nenhuma turma).
- `RIGHT JOIN` faz o mesmo pelo lado direito; na prática, basta inverter a ordem e usar `LEFT`.

### Funções de agregação

| Função | O que devolve | Exemplo |
|---|---|---|
| `count(*)` | Quantidade de linhas | `SELECT count(*) FROM aluno;` |
| `count(coluna)` | Quantidade de valores **não nulos** | `count(email)` = alunos com e-mail |
| `sum(coluna)` | Soma | `sum(valor)` das parcelas |
| `avg(coluna)` | Média | `avg(valor_mensal)` dos cursos |
| `min` / `max` | Menor / maior | `max(data_matricula)` = matrícula mais recente |

As agregações **ignoram os NULL** (menos o `count(*)`).

### GROUP BY e HAVING

```sql
SELECT c.nome AS curso, count(m.id_matricula) AS matriculas
FROM curso c
JOIN turma t ON t.id_curso = c.id_curso
JOIN matricula m ON m.id_turma = t.id_turma
WHERE m.situacao = 'ativa'          -- filtra LINHAS antes de agrupar
GROUP BY c.nome
HAVING count(m.id_matricula) < 5    -- filtra GRUPOS depois de agrupar
ORDER BY matriculas DESC;
```

- **`GROUP BY`** junta as linhas com o mesmo valor e calcula a agregação **por grupo**.
- Toda coluna do `SELECT` fora de uma agregação **precisa** estar no `GROUP BY`.
- **`WHERE`** não aceita agregação; **`HAVING`** aceita.
- Ordem de execução: `FROM`/`JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` →
  `LIMIT`.

### Subconsultas

Uma consulta dentro de outra, entre parênteses:

```sql
-- Cursos mais caros que a média (a subconsulta devolve UM valor)
SELECT nome, valor_mensal
FROM curso
WHERE valor_mensal > (SELECT avg(valor_mensal) FROM curso);

-- Alunos com parcela vencida e não paga (a subconsulta devolve uma lista)
SELECT nome FROM aluno
WHERE id_aluno IN (SELECT m.id_aluno
                   FROM matricula m
                   JOIN parcela p ON p.id_matricula = m.id_matricula
                   WHERE p.data_pagamento IS NULL AND p.vencimento < current_date);

-- Cursos sem nenhuma turma
SELECT c.nome FROM curso c
WHERE NOT EXISTS (SELECT 1 FROM turma t WHERE t.id_curso = c.id_curso);
```

- Com `=`, a subconsulta devolve **um só valor**; com `IN`, uma **lista**; `EXISTS` só verifica se
  há alguma linha.
- Subconsulta no `FROM` precisa de apelido: `SELECT avg(qtd) FROM (SELECT count(*) AS qtd FROM
  matricula GROUP BY id_turma) AS por_turma;`
- Muitas subconsultas podem virar `JOIN`: escolha a forma **mais clara** para quem vai ler.

### Escada de consultas: do simples ao relatório

| Nível | Exemplo de pergunta | Recursos |
|---|---|---|
| 1. Filtro | Turmas da noite | `WHERE` |
| 2. Ordenação | Cursos do mais caro ao mais barato | `ORDER BY` |
| 3. Junção | Aluno, turma e curso de cada matrícula ativa | `JOIN` |
| 4. Agrupamento | Matrículas ativas por curso | `GROUP BY`, `count` |
| 5. Subconsulta | Alunos com parcela vencida | `IN (SELECT …)` |

Em todos os níveis, anote o **resultado esperado** com os dados de teste antes de rodar.

### O relatório da diretora

A diretora pediu: "quantas matrículas ativas cada curso tem, quanto cada curso fatura por mês e
quais cursos ainda não têm turma". Você, como aluno consultor, resolve com `JOIN` + `GROUP BY` para
as matrículas, `sum(p.valor)` agrupado por curso para o faturamento e `LEFT JOIN` com `WHERE
t.id_turma IS NULL` para os cursos sem turma. O back-end vai chamar essas consultas para montar o
painel da secretaria.

### Erros comuns

- `JOIN` sem `ON` (ou com colunas erradas) → produto cartesiano.
- Coluna sem agregação fora do `GROUP BY` → erro *must appear in the GROUP BY clause*.
- Agregação no `WHERE` (`WHERE count(*) > 3`) → erro; use `HAVING`.
- `INNER JOIN` quando a pergunta pede "inclusive os que não têm" → as linhas sem par somem.
- `count(*)` depois de `LEFT JOIN` conta a linha com NULL; para contar só os pares, use
  `count(coluna_da_direita)`.

## Resumo

- `JOIN … ON` junta tabelas pela chave; `INNER` traz só os pares, `LEFT` traz todos da esquerda.
- Agregações (`count`, `sum`, `avg`, `min`, `max`) resumem; `GROUP BY` calcula por grupo.
- `WHERE` filtra linhas antes de agrupar; `HAVING` filtra grupos depois.
- Subconsultas devolvem um valor (`=`), uma lista (`IN`) ou testam existência (`EXISTS`).
- Relatórios combinam junção, agrupamento e subconsulta, sempre conferidos com o resultado
  esperado.

## Glossário

- **JOIN:** junção de tabelas pela coluna que as liga.
- **LEFT JOIN:** junção que mantém todas as linhas da tabela da esquerda.
- **Produto cartesiano:** combinação de todas as linhas de uma tabela com todas as da outra.
- **Agregação:** função que resume várias linhas num valor (`count`, `sum`, `avg`).
- **GROUP BY:** cláusula que agrupa linhas para calcular por grupo.
- **Subconsulta:** consulta dentro de outra consulta.
