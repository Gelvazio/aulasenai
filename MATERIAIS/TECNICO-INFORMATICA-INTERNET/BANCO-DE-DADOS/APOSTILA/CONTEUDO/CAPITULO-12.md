# Capítulo 12 — DDL: tabelas e campos

- **Aula:** 12
- **Capacidade:** C7

## Teoria

### A situação de aprendizagem 2

Começa aqui a **SA 2 — Banco pronto para o back-end** (capítulos 12 a 20). O sistema de matrículas
modelado na SA 1 precisa do banco funcionando. Você, como aluno consultor, cria o banco no
PostgreSQL (DDL), carrega e consulta dados (DML), automatiza regras com procedimento e trigger, cria
papéis com permissões mínimas e auditoria e entrega a documentação técnica.

### SQL, DDL e DML

- **SQL** (*Structured Query Language*) é a linguagem padrão dos bancos relacionais.
- **DDL** (*Data Definition Language*): comandos que **criam e alteram a estrutura**: `CREATE`,
  `ALTER`, `DROP`.
- **DML** (*Data Manipulation Language*): comandos que **mexem nos dados**: `INSERT`, `UPDATE`,
  `DELETE`, `SELECT` (capítulos 14 a 16).

### Tipos de dados mais usados no PostgreSQL

| Tipo | Uso | Exemplo |
|---|---|---|
| `integer` / `bigint` | Números inteiros (`bigint` para valores muito grandes) | quantidade, id |
| `numeric(p,s)` | Decimal exato (p dígitos, s casas) | `numeric(10,2)` para dinheiro |
| `varchar(n)` | Texto com até n caracteres | `varchar(100)` para nome |
| `text` | Texto sem limite definido | observações |
| `char(n)` | Texto de tamanho fixo | `char(2)` para UF |
| `boolean` | Verdadeiro ou falso | `ativo` |
| `date` | Data (AAAA-MM-DD) | data_nascimento |
| `timestamptz` | Data e hora com fuso | criado_em |

O tipo vem do **dicionário de dados** (capítulo 11): CPF → `varchar(11)` só com dígitos; valor →
`numeric(10,2)`.

### CREATE TABLE: tabelas e campos (3.1.1 e 3.1.2)

```sql
CREATE TABLE curso (
    id_curso       integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome           varchar(100) NOT NULL,
    carga_horaria  integer NOT NULL,
    valor_mensal   numeric(10,2) NOT NULL,
    ativo          boolean NOT NULL DEFAULT true,
    criado_em      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE aluno (
    id_aluno         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome             varchar(100) NOT NULL,
    cpf              varchar(11),
    data_nascimento  date NOT NULL,
    email            varchar(120),
    telefone         varchar(11)
);
```

- **`GENERATED ALWAYS AS IDENTITY`:** o banco gera o número do id sozinho (1, 2, 3…).
- **`NOT NULL`:** o campo é obrigatório.
- **`DEFAULT`:** valor usado quando nada é informado (`true`, `now()`).
- As chaves estrangeiras e as demais restrições ficam para o **capítulo 13**.

### Conferindo a estrutura

```sql
\dt              -- lista as tabelas (psql)
\d aluno         -- mostra colunas, tipos e restrições de aluno
```

No cliente gráfico: *Schemas → public → Tables → aluno → Columns*.

### ALTER TABLE: mudar a estrutura

```sql
ALTER TABLE aluno ADD COLUMN data_cadastro date DEFAULT current_date;   -- acrescenta coluna
ALTER TABLE aluno RENAME COLUMN telefone TO celular;                     -- renomeia a coluna
ALTER TABLE aluno ALTER COLUMN email TYPE varchar(150);                  -- muda o tipo
ALTER TABLE aluno ALTER COLUMN email SET NOT NULL;                       -- torna obrigatório
ALTER TABLE aluno DROP COLUMN data_cadastro;                             -- remove a coluna
```

⚠️ Tornar uma coluna `NOT NULL` **falha** se já houver linhas com o campo vazio; mudar o tipo pode
falhar se os dados atuais não couberem no novo tipo.

### DROP TABLE: remover a tabela

```sql
DROP TABLE IF EXISTS tabela_teste;
```

- Remove a **tabela e todos os dados**; não há "desfazer" fora de uma transação.
- `IF EXISTS` evita erro quando a tabela não existe (útil em scripts de teste).
- Em produção, só com **backup** e confirmação.

### O script DDL

Os comandos ficam num arquivo `.sql` (ex.: `01-ddl-escola.sql`), em ordem, com comentários e
versionado no Git:

```bash
psql -U postgres -d escola_db -f 01-ddl-escola.sql
```

Na escola, o dicionário de dados vira as tabelas `curso`, `turma`, `aluno`, `responsavel`,
`professor`, `matricula`, `parcela` e a associativa entre professor e turma. Na segunda execução, o
psql acusou "relation curso already exists": o grupo pôs `DROP TABLE IF EXISTS` no início do script
**de teste** (nunca no de produção), e o script passou a rodar do zero sempre que preciso.

## Resumo

- SQL é a linguagem dos bancos relacionais; DDL cria a estrutura, DML mexe nos dados.
- Tipos principais: `integer`, `numeric(10,2)`, `varchar(n)`, `text`, `boolean`, `date`,
  `timestamptz`.
- `CREATE TABLE` define colunas, tipos, `NOT NULL`, `DEFAULT` e o id gerado pelo banco.
- `ALTER TABLE` acrescenta, renomeia, muda ou remove colunas; `DROP TABLE` remove a tabela.
- O script `.sql` fica versionado e roda com `psql -f`.

## Glossário

- **DDL:** comandos que criam a estrutura
- **Tipo de dado:** a espécie de valor que a coluna aceita (inteiro, texto, data…).
- **NOT NULL:** restrição que torna a coluna obrigatória.
- **DEFAULT:** valor usado quando nenhum é informado.
- **IDENTITY:** coluna cujo número o banco gera sozinho.
- **Script SQL:** arquivo `.sql` com os comandos em ordem.
