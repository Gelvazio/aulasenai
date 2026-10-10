# Aula 12 — DDL: Tabelas e Campos

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 3 Linguagem de consulta de banco de dados — 3.1 Linguagem de
  definição de dados (3.1.1 Tabelas · 3.1.2 Campos)
- **Capacidades:** C7 — Aplicar linguagem de definição de dados
- **Estratégias:** demonstração no psql/pgAdmin, prática guiada, prática autônoma com o dicionário
  de dados, dinâmica em duplas
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-12.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-12.md)

## Indicadores

- (9) Cria tabelas, campos, chaves e restrições com DDL (C7).

## Objetivos

- Explicar o que é **SQL** e o que é a **DDL** (linguagem de definição de dados).
- Escolher os **tipos de dados** do PostgreSQL a partir do dicionário de dados.
- Criar tabelas com **CREATE TABLE**, usando **NOT NULL**, **DEFAULT** e identificador automático.
- Alterar tabelas com **ALTER TABLE** (acrescentar, renomear, mudar tipo e apagar colunas).
- Apagar tabelas com **DROP TABLE** e conhecer o cuidado necessário.
- Organizar os comandos num **script** versionado.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: padrão de nomes e formatos (aula 11) |
| Exposição dialogada | 35 min | SQL, DDL × DML; tipos de dados do PostgreSQL |
| Demonstração | 30 min | CREATE TABLE curso e aluno no psql e no pgAdmin |
| Intervalo | 15 min | — |
| Prática guiada | 30 min | ALTER TABLE e DROP TABLE num banco de teste |
| Dinâmica | 25 min | "Tradutor do dicionário" (abaixo) |
| Prática autônoma (SA 2) | 70 min | Script DDL das tabelas do sistema de matrículas |
| Registro | 20 min | Conferência com \d e quiz de saída |

## Conteúdo

### 1. SQL, DDL e DML
- **SQL** (*Structured Query Language*) é a linguagem padrão dos bancos relacionais.
- **DDL** (*Data Definition Language*): comandos que **criam e alteram a estrutura** — CREATE,
  ALTER, DROP.
- **DML** (*Data Manipulation Language*): comandos que **mexem nos dados** — INSERT, UPDATE,
  DELETE, SELECT (aulas 14 a 16).

### 2. Tipos de dados mais usados no PostgreSQL

| Tipo | Uso | Exemplo |
|---|---|---|
| `integer` / `bigint` | Números inteiros (bigint para valores muito grandes) | quantidade, id |
| `numeric(p,s)` | Decimal exato (p dígitos, s casas) | `numeric(10,2)` para dinheiro |
| `varchar(n)` | Texto com limite de n caracteres | `varchar(100)` para nome |
| `text` | Texto sem limite definido | observações |
| `char(n)` | Texto de tamanho fixo | `char(2)` para UF |
| `boolean` | Verdadeiro / falso | `ativo` |
| `date` | Data (AAAA-MM-DD) | data_nascimento |
| `timestamptz` | Data e hora com fuso | criado_em |

O tipo vem do **dicionário de dados** (aula 11): CPF → `varchar(11)` só dígitos; valor → `numeric(10,2)`.

### 3. CREATE TABLE
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
- **GENERATED ALWAYS AS IDENTITY**: o banco gera o número do id sozinho (1, 2, 3...).
- **NOT NULL**: o campo é obrigatório.
- **DEFAULT**: valor usado quando nada é informado (`true`, `now()`).
- Chaves primárias, estrangeiras e demais restrições são aprofundadas na **aula 13**.

### 4. Conferindo a estrutura
```sql
\dt              -- lista as tabelas (psql)
\d aluno         -- mostra as colunas, tipos e restrições de aluno
```
No pgAdmin: *Schemas → public → Tables → aluno → Columns*.

### 5. ALTER TABLE
```sql
ALTER TABLE aluno ADD COLUMN data_cadastro date DEFAULT current_date;   -- acrescenta coluna
ALTER TABLE aluno RENAME COLUMN telefone TO celular;                     -- renomeia
ALTER TABLE aluno ALTER COLUMN email TYPE varchar(150);                  -- muda o tipo
ALTER TABLE aluno ALTER COLUMN email SET NOT NULL;                       -- torna obrigatório
ALTER TABLE aluno DROP COLUMN data_cadastro;                             -- apaga a coluna
ALTER TABLE aluno RENAME TO estudante;                                   -- renomeia a tabela
```
Cuidado: tornar uma coluna NOT NULL **falha** se já houver linhas com o campo vazio; mudar o tipo
pode falhar se os dados atuais não couberem no novo tipo.

### 6. DROP TABLE
```sql
DROP TABLE IF EXISTS tabela_teste;
```
- Apaga a **tabela e todos os dados** — não há "desfazer" fora de uma transação.
- `IF EXISTS` evita erro quando a tabela não existe (útil em scripts).
- Antes de apagar em produção: **backup** e confirmação.

### 7. Script DDL
Os comandos ficam num arquivo `.sql` (ex.: `01-ddl-escola.sql`), em ordem, com comentários,
versionado no Git. Executar no psql:
```bash
psql -U postgres -d escola_db -f 01-ddl-escola.sql
```

## Exemplo no contexto do curso
O grupo traduz o dicionário de dados da escola de cursos livres fictícia: `curso`, `turma`,
`aluno`, `responsavel`, `professor`, `matricula`, `parcela`, `aula_turma`. Ao rodar o script, o
psql acusa erro: "relation curso already exists". O grupo acrescenta `DROP TABLE IF EXISTS` no
início do script de teste (nunca no banco de produção) e o script passa a rodar do zero sempre
que necessário.

## Dinâmica — Tradutor do dicionário (25 min, duplas)
- **Objetivo:** converter linhas do dicionário de dados em colunas SQL com o tipo certo (C7).
- **Materiais:** cartões com linhas do dicionário (ex.: "valor_mensal — decimal, 2 casas,
  obrigatório"; "uf — 2 letras"; "observacao — texto longo, opcional").
- **Passo a passo:** (1) a dupla escreve a definição SQL da coluna; (2) troca com a dupla vizinha,
  que confere tipo, NOT NULL e DEFAULT; (3) as duplas testam no psql criando uma tabela de teste.
- **Fechamento:** a turma lista os erros mais comuns (dinheiro como float, CPF como integer).

## Situação-problema e entrega da aula
- **SA 2 — Banco pronto para o back-end (aulas 12 a 20):** o sistema de matrículas precisa do
  banco funcionando no PostgreSQL.
- **Entrega:** script `01-ddl-escola.sql` com o CREATE TABLE de todas as tabelas (tipos, NOT NULL,
  DEFAULT e identificadores), executado no banco `escola_db`, com print do `\d` de duas tabelas.

## Verificação da aprendizagem
- Diferenciar DDL de DML com dois comandos de cada.
- Escolher o tipo para: preço, CPF, data de nascimento, ativo, observação.
- Escrever o comando que acrescenta a coluna `email` em `aluno`.
- Explicar o risco do DROP TABLE.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), kit multimídia
e slides `../AULAS/AULA-12-SLIDES.pdf` (apresentação, quando o professor publicar).
