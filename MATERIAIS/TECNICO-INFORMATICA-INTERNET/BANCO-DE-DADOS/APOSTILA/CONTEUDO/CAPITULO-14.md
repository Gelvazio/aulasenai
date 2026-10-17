# Capítulo 14 — DML: inserção, atualização e exclusão

- **Aula:** 14
- **Capacidade:** C8

## Teoria

### INSERT: inserir linhas (3.2.3)

```sql
-- uma linha, informando as colunas (o id é gerado pelo banco)
INSERT INTO curso (nome, carga_horaria, valor_mensal)
VALUES ('Excel Básico', 40, 180.00);

-- várias linhas de uma vez
INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES
    ('Python Iniciante', 60, 250.00),
    ('Design Gráfico',   48, 220.00);

-- devolvendo o id gerado (útil para o back-end)
INSERT INTO aluno (nome, cpf, data_nascimento)
VALUES ('Ana Souza', '12345678901', '2008-03-21')
RETURNING id_aluno;
```

- Sempre **liste as colunas**: o comando continua certo mesmo se a tabela ganhar colunas novas.
- Colunas com **DEFAULT** (ativo, criado_em, data_matricula) podem ser omitidas.
- Textos e datas entre **aspas simples**; números sem aspas; decimal com **ponto**.

### Ordem de inserção

A chave estrangeira exige que o "pai" exista antes: **curso → turma → aluno → matricula →
parcela**. Inserir uma turma de um curso que não existe gera *violates foreign key constraint*.

### UPDATE: alterar linhas (3.2.2)

```sql
UPDATE curso
SET valor_mensal = 195.00
WHERE id_curso = 1;

UPDATE matricula
SET situacao = 'trancada'
WHERE id_aluno = 5 AND id_turma = 2;

-- reajuste de 10% em todos os cursos ativos
UPDATE curso
SET valor_mensal = valor_mensal * 1.10
WHERE ativo = true;
```

### DELETE: excluir linhas (3.2.4)

```sql
DELETE FROM matricula
WHERE id_matricula = 12;
```

- As restrições continuam valendo: excluir um curso com turmas é **recusado** (`RESTRICT`);
  excluir uma matrícula leva junto as **parcelas** (`CASCADE`).
- Muitos sistemas preferem a **exclusão lógica** (`UPDATE ... SET ativo = false`) para não perder o
  histórico.

### O perigo do WHERE esquecido

```sql
UPDATE curso SET valor_mensal = 0;   -- ❌ zera TODOS os cursos
```

Um `UPDATE` ou `DELETE` sem `WHERE` atinge **todas as linhas** da tabela. Rede de segurança:

1. Escreva primeiro o **SELECT** com o mesmo `WHERE` e confira quais linhas aparecem.
2. Rode dentro de uma **transação** e confira o número de linhas afetadas.
3. Confirme com **COMMIT** ou desfaça com **ROLLBACK**.

```sql
BEGIN;
SELECT * FROM aluno WHERE id_aluno = 7;                            -- confere o alvo
UPDATE aluno SET email = 'novo@exemplo.com' WHERE id_aluno = 7;    -- "UPDATE 1"
COMMIT;      -- ou ROLLBACK; se algo saiu errado
```

Na escola, um integrante esqueceu o `WHERE ativo = true` no reajuste e alcançou também um curso
desativado. Como estava numa transação, viu "UPDATE 6" em vez de "UPDATE 5", desconfiou, executou
**ROLLBACK** e refez o comando com o `WHERE`.

### TRUNCATE

`TRUNCATE TABLE tabela_teste;` esvazia a tabela inteira de uma vez, mais rápido que um `DELETE`
sem `WHERE`. Uso: **bancos de teste**, nunca em produção sem backup.

### Carga de dados de teste

O script `02-dados-teste.sql` traz dados **fictícios** (nunca dados reais de pessoas): 5 cursos, 8
turmas, 30 alunos, 40 matrículas e as parcelas. Com ele você testa as consultas dos capítulos 15 e
16.

## Resumo

- `INSERT` grava linhas (listando as colunas); `RETURNING` devolve o id gerado.
- A ordem de inserção segue as chaves estrangeiras: pai antes do filho.
- `UPDATE ... SET ... WHERE` altera; `DELETE FROM ... WHERE` exclui, respeitando `RESTRICT` e
  `CASCADE`.
- Sem `WHERE`, o comando atinge a tabela inteira: confira com `SELECT` e use `BEGIN`, `COMMIT` e
  `ROLLBACK`.
- `TRUNCATE` só em banco de teste; dados de teste sempre fictícios.

## Glossário

- **DML:** comandos que mexem nos dados
- **INSERT:** comando que grava linhas novas.
- **UPDATE:** comando que altera linhas existentes.
- **DELETE:** comando que exclui linhas.
- **ROLLBACK:** desfaz a transação em andamento.
- **Exclusão lógica:** marcar a linha como inativa em vez de excluí-la.
