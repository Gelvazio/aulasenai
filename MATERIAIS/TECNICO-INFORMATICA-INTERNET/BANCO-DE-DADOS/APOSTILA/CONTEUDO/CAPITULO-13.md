# Capítulo 13 — DDL: relações, chaves e restrições

- **Aula:** 13
- **Capacidade:** C7

## Teoria

### Chave primária (PRIMARY KEY)

Identifica cada linha: é **única** e **não nula** (o identificador do capítulo 7).

```sql
-- simples
id_aluno integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY
-- composta (entidade fraca PARCELA: matrícula + número)
PRIMARY KEY (id_matricula, numero)
```

### Chave estrangeira (FOREIGN KEY): as relações (3.1.3)

Implementa o relacionamento: o valor **precisa existir** na tabela referenciada (**integridade
referencial**).

```sql
CREATE TABLE turma (
    id_turma  integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo    varchar(10) NOT NULL UNIQUE,
    turno     varchar(5)  NOT NULL CHECK (turno IN ('manha', 'tarde', 'noite')),
    id_curso  integer NOT NULL REFERENCES curso (id_curso)
);
```

Gravar uma turma com `id_curso = 99`, que não existe, gera o erro *violates foreign key
constraint*.

### Associativa com duas chaves estrangeiras

```sql
CREATE TABLE matricula (
    id_matricula    integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno        integer NOT NULL REFERENCES aluno (id_aluno),
    id_turma        integer NOT NULL REFERENCES turma (id_turma),
    data_matricula  date NOT NULL DEFAULT current_date,
    situacao        varchar(10) NOT NULL DEFAULT 'ativa'
                    CHECK (situacao IN ('ativa', 'trancada', 'concluida', 'cancelada')),
    UNIQUE (id_aluno, id_turma)   -- o mesmo aluno não se matricula duas vezes na mesma turma
);
```

### ON DELETE: o que acontece com as linhas filhas

| Opção | Ao excluir a linha "pai"… | Uso típico |
|---|---|---|
| `RESTRICT` ou o padrão (`NO ACTION`) | **Impede** a exclusão se houver filhas | Não excluir curso que tem turmas |
| `CASCADE` | Exclui **também** as filhas | Entidade fraca: a matrícula leva as parcelas |
| `SET NULL` | Deixa vazia a chave estrangeira das filhas | Funcionário cujo supervisor saiu |

```sql
CREATE TABLE parcela (
    id_matricula    integer NOT NULL REFERENCES matricula (id_matricula) ON DELETE CASCADE,
    numero          smallint NOT NULL,
    vencimento      date NOT NULL,
    valor           numeric(10,2) NOT NULL CHECK (valor > 0),
    data_pagamento  date,
    PRIMARY KEY (id_matricula, numero)
);
```

⚠️ `CASCADE` pode excluir muitos dados de uma vez: use só quando as filhas **não fazem sentido** sem
o pai.

### UNIQUE e CHECK

- **`UNIQUE`:** o valor não se repete (`cpf varchar(11) UNIQUE`). Valores vazios (NULL) não contam
  como repetidos.
- **`CHECK`:** condição que toda linha cumpre (`CHECK (valor > 0)`), inclusive os **domínios** do
  capítulo 11.

### Nomeando e acrescentando restrições

```sql
ALTER TABLE aluno ADD CONSTRAINT aluno_cpf_unico UNIQUE (cpf);
ALTER TABLE aluno ADD CONSTRAINT aluno_responsavel_fk
      FOREIGN KEY (id_responsavel) REFERENCES responsavel (id_responsavel);
```

Dar **nome** às restrições deixa as mensagens de erro claras e facilita mudá-las depois.

### Da regra de negócio à restrição

| Regra do cliente (capítulo 5) | Restrição |
|---|---|
| CPF não se repete | `UNIQUE (cpf)` |
| Toda matrícula é de um aluno e de uma turma | `REFERENCES aluno`, `REFERENCES turma`, `NOT NULL` |
| Mensalidade maior que zero | `CHECK (valor > 0)` |
| Turno só manhã, tarde ou noite | `CHECK (turno IN (...))` |
| Não matricular duas vezes na mesma turma | `UNIQUE (id_aluno, id_turma)` |
| Turma com no máximo 25 alunos | Não cabe num CHECK simples: **trigger** (capítulo 18) |

### Lendo os erros

| Mensagem | Significado |
|---|---|
| *duplicate key value violates unique constraint* | Valor repetido |
| *violates foreign key constraint* | Aponta para algo que não existe, ou impede excluir o pai |
| *violates check constraint* | A condição do CHECK não foi cumprida |
| *null value in column … violates not-null constraint* | Campo obrigatório vazio |

Na escola, o grupo tentou excluir o curso "Excel", que tem turmas, e o banco recusou (`RESTRICT`),
exatamente o que a diretora queria. Ao excluir uma matrícula de teste, as parcelas dela saíram
junto (`CASCADE`), sem deixar parcelas "órfãs". O erro é o **resultado esperado**: mostra que a
regra está protegida pelo banco.

## Resumo

- Chave primária identifica cada linha; pode ser simples ou composta (entidade fraca).
- Chave estrangeira implementa a relação e garante a integridade referencial.
- A associativa tem duas chaves estrangeiras e, em geral, um `UNIQUE` do par.
- `ON DELETE` decide: impedir (`RESTRICT`), levar junto (`CASCADE`) ou esvaziar (`SET NULL`).
- `UNIQUE` e `CHECK` transformam regras de negócio em restrições; restrições nomeadas dão erros
  claros.

## Glossário

- **Chave primária (PK):** identifica cada linha
- **Chave estrangeira (FK):** liga uma tabela a outra
- **Integridade referencial:** garantia de que toda chave estrangeira aponta para uma linha que
  existe.
- **UNIQUE:** restrição que impede valores repetidos.
- **CHECK:** restrição com uma condição que toda linha precisa cumprir.
- **ON DELETE CASCADE:** excluir o pai exclui também as linhas filhas.
