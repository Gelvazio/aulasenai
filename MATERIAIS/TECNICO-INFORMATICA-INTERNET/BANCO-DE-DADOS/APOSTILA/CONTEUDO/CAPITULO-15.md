# Capítulo 15 — DML: consultas com filtros e ordenação

- **Aula:** 15
- **Capacidade:** C8

## Teoria

### Estrutura básica do SELECT (3.2.1)

```sql
SELECT coluna1, coluna2       -- o que mostrar
FROM tabela                   -- de onde
WHERE condição                -- quais linhas
ORDER BY coluna               -- em que ordem
LIMIT 10;                     -- quantas linhas
```

A ordem de escrita é sempre essa. `SELECT *` mostra todas as colunas e é útil para explorar; no
sistema, prefira **listar as colunas** (mais claro e mais leve).

### Colunas, apelidos e cálculos

```sql
SELECT nome AS curso,
       valor_mensal,
       valor_mensal * 12 AS valor_anual
FROM curso;
```

- **`AS`** dá um nome amigável à coluna no resultado.
- Expressões fazem contas na consulta, sem alterar os dados.

### WHERE e operadores

| Operador | Exemplo | Significado |
|---|---|---|
| `=` `<>` | `turno = 'noite'` | igual / diferente |
| `>` `>=` `<` `<=` | `valor_mensal >= 200` | comparação |
| `BETWEEN` | `data_matricula BETWEEN '2026-02-01' AND '2026-02-28'` | intervalo (inclui as pontas) |
| `IN` | `situacao IN ('trancada', 'cancelada')` | está na lista |
| `LIKE` | `nome LIKE 'Ana%'` | começa com "Ana" (`%` = qualquer texto, `_` = um caractere) |
| `ILIKE` | `nome ILIKE '%silva%'` | como `LIKE`, sem diferenciar maiúsculas |
| `IS NULL` | `cpf IS NULL` | campo vazio (nunca `= NULL`) |

### Combinando condições

```sql
SELECT codigo, turno
FROM turma
WHERE turno = 'noite' AND (id_curso = 1 OR id_curso = 3);
```

- **`AND`:** as duas condições precisam ser verdadeiras; **`OR`:** basta uma; **`NOT`:** inverte.
- Use **parênteses** ao misturar `AND` e `OR`: sem eles, o `AND` é avaliado antes.

### Ordenar e limitar

```sql
SELECT nome, valor_mensal
FROM curso
ORDER BY valor_mensal DESC, nome ASC
LIMIT 3;
```

- **`ASC`** (padrão) vai do menor para o maior; **`DESC`**, do maior para o menor.
- Com mais de uma coluna, a segunda desempata.
- **`LIMIT n`** traz as n primeiras linhas; **`OFFSET m`** pula m linhas. Página 2, de 10 em 10:
  `LIMIT 10 OFFSET 10`.

### DISTINCT

```sql
SELECT DISTINCT turno FROM turma;   -- cada turno aparece uma vez
```

### Funções simples

```sql
SELECT upper(nome) AS nome_maiusculo,
       length(nome) AS letras,
       extract(year FROM age(current_date, data_nascimento)) AS idade
FROM aluno
WHERE extract(month FROM data_nascimento) = 10;   -- aniversariantes de outubro
```

- **Texto:** `upper`, `lower`, `length`, `trim`, `concat`.
- **Data:** `current_date`, `now()`, `extract`, `age`.
- **`coalesce(email, 'sem e-mail')`** mostra um texto quando o campo está vazio.

### As perguntas do cliente viram consultas

| Pergunta da escola | Consulta |
|---|---|
| Matrículas trancadas ou canceladas, da mais antiga para a mais nova | `SELECT id_aluno, id_turma, data_matricula, situacao FROM matricula WHERE situacao IN ('trancada', 'cancelada') ORDER BY data_matricula;` |
| Alunos sem e-mail, para completar o cadastro | `SELECT nome, telefone FROM aluno WHERE email IS NULL ORDER BY nome;` |
| Os 3 cursos mais caros | `SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal DESC LIMIT 3;` |
| Turmas da noite | `SELECT codigo FROM turma WHERE turno = 'noite';` |

Para cada consulta, anote o **resultado esperado** com os dados de teste antes de rodar: se o
resultado vier diferente, o erro aparece na hora.

### Erros comuns

- Texto sem aspas simples (`WHERE turno = noite`) → erro de coluna inexistente.
- `= NULL` em vez de `IS NULL` → nenhuma linha volta.
- `AND` e `OR` misturados sem parênteses → resultado errado sem nenhuma mensagem de erro.
- Esquecer o `%` no `LIKE` → procura o texto exato.

## Resumo

- `SELECT … FROM … WHERE … ORDER BY … LIMIT`, sempre nessa ordem.
- `AS` dá apelido; expressões calculam sem alterar os dados.
- Filtros com `=`, `<>`, comparações, `BETWEEN`, `IN`, `LIKE`, `ILIKE` e `IS NULL`.
- `AND`, `OR` e `NOT` combinam condições; parênteses evitam surpresas.
- `ORDER BY` ordena, `LIMIT`/`OFFSET` paginam, `DISTINCT` tira repetidos, funções tratam texto e
  datas.

## Glossário

- **SELECT:** comando que consulta dados.
- **WHERE:** cláusula que filtra as linhas.
- **ORDER BY:** cláusula que ordena o resultado.
- **LIKE:** busca por padrão de texto com `%` e `_`.
- **NULL:** ausência de valor; testado com `IS NULL`.
- **Paginação:** mostrar o resultado em partes com `LIMIT` e `OFFSET`.
