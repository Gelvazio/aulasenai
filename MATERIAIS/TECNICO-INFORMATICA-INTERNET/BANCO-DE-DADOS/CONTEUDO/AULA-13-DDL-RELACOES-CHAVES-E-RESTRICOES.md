# Aula 13 — DDL: Relações, Chaves e Restrições

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 3.1 Linguagem de definição de dados — 3.1.3 Relações
- **Capacidades:** C7 — Aplicar linguagem de definição de dados
- **Estratégias:** demonstração no psql, prática guiada com erros provocados, dinâmica em duplas,
  trabalho da SA 2
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-13.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-13.md)

## Indicadores

- (9) Cria tabelas, campos, chaves e restrições com DDL (C7).

## Objetivos

- Criar **chaves primárias** simples e compostas.
- Criar **chaves estrangeiras** (REFERENCES) que implementam os relacionamentos do DER.
- Escolher a ação **ON DELETE** adequada (RESTRICT, CASCADE, SET NULL).
- Aplicar as restrições **UNIQUE** e **CHECK** a partir das regras de negócio (aula 5) e dos
  domínios (aula 11).
- Acrescentar restrições em tabelas existentes com **ALTER TABLE ... ADD CONSTRAINT**.
- Entender a **integridade referencial** e ler as mensagens de erro de restrição.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: tipos de dados e CREATE TABLE (aula 12) |
| Exposição dialogada | 35 min | Chave primária, chave estrangeira e integridade referencial |
| Demonstração | 30 min | ON DELETE; UNIQUE; CHECK; erros provocados |
| Intervalo | 15 min | — |
| Dinâmica | 25 min | "Quebra-regra" (abaixo) |
| Prática autônoma (SA 2) | 80 min | Script com todas as chaves e restrições da escola |
| Registro | 20 min | Teste das restrições e quiz de saída |
| Fechamento | 20 min | Conferência do script com o DER |

## Conteúdo

### 1. Chave primária (PRIMARY KEY)
Identifica cada linha: **única** e **não nula** (é o identificador da aula 7).
```sql
-- simples
id_aluno integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY
-- composta (entidade fraca PARCELA: matrícula + número)
PRIMARY KEY (id_matricula, numero)
```

### 2. Chave estrangeira (FOREIGN KEY)
Implementa o relacionamento: o valor **precisa existir** na tabela referenciada (integridade
referencial).
```sql
CREATE TABLE turma (
    id_turma  integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo    varchar(10) NOT NULL UNIQUE,
    turno     varchar(5)  NOT NULL CHECK (turno IN ('manha', 'tarde', 'noite')),
    id_curso  integer NOT NULL REFERENCES curso (id_curso)
);
```
Tentar gravar uma turma com `id_curso = 99` inexistente gera o erro *violates foreign key
constraint*.

### 3. Associativa com duas chaves estrangeiras
```sql
CREATE TABLE matricula (
    id_matricula    integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno        integer NOT NULL REFERENCES aluno (id_aluno),
    id_turma        integer NOT NULL REFERENCES turma (id_turma),
    data_matricula  date NOT NULL DEFAULT current_date,
    situacao        varchar(10) NOT NULL DEFAULT 'ativa'
                    CHECK (situacao IN ('ativa', 'trancada', 'concluida', 'cancelada')),
    UNIQUE (id_aluno, id_turma)        -- o mesmo aluno não se matricula duas vezes na mesma turma
);
```

### 4. ON DELETE — o que fazer com as linhas filhas

| Opção | Ao apagar a linha "pai"... | Uso típico |
|---|---|---|
| `RESTRICT` / padrão (`NO ACTION`) | **Impede** a exclusão se houver filhas | Não apagar curso que tem turmas |
| `CASCADE` | Apaga **também** as filhas | Entidade fraca: apagar a matrícula apaga as parcelas |
| `SET NULL` | Deixa a chave estrangeira das filhas **vazia** | Funcionário cujo supervisor saiu |

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
Cuidado: CASCADE pode apagar muitos dados de uma vez — usar só quando as filhas **não fazem
sentido** sem o pai.

### 5. UNIQUE e CHECK
- **UNIQUE**: o valor não se repete (`cpf varchar(11) UNIQUE`). Vazios (NULL) não contam como
  repetidos.
- **CHECK**: condição que toda linha precisa cumprir (`CHECK (valor > 0)`,
  `CHECK (data_pagamento >= vencimento - 30)`), inclusive os **domínios** da aula 11.

### 6. Nomeando e acrescentando restrições
```sql
ALTER TABLE aluno ADD CONSTRAINT aluno_cpf_unico UNIQUE (cpf);
ALTER TABLE aluno ADD CONSTRAINT aluno_responsavel_fk
      FOREIGN KEY (id_responsavel) REFERENCES responsavel (id_responsavel);
ALTER TABLE aluno DROP CONSTRAINT aluno_cpf_unico;
```
Dar **nome** às restrições deixa as mensagens de erro claras e facilita removê-las depois.

### 7. Da regra de negócio à restrição (retomada da aula 5)

| Regra do cliente | Restrição |
|---|---|
| CPF não se repete | `UNIQUE (cpf)` |
| Toda matrícula é de um aluno e de uma turma | `REFERENCES aluno`, `REFERENCES turma`, `NOT NULL` |
| Mensalidade maior que zero | `CHECK (valor > 0)` |
| Turno só manhã, tarde ou noite | `CHECK (turno IN (...))` |
| Não matricular duas vezes na mesma turma | `UNIQUE (id_aluno, id_turma)` |
| Turma com no máximo 25 alunos | Não cabe em CHECK simples: **trigger** (aula 18) |

### 8. Lendo os erros
- *duplicate key value violates unique constraint* → valor repetido.
- *violates foreign key constraint* → aponta para algo que não existe ou impede apagar o pai.
- *violates check constraint* → condição do CHECK não cumprida.
- *null value in column ... violates not-null constraint* → campo obrigatório vazio.

## Exemplo no contexto do curso
O grupo completa o script da escola de cursos livres fictícia com as chaves e restrições. No teste,
tenta apagar o curso "Excel", que tem turmas, e o banco recusa (RESTRICT) — exatamente o que a
diretora queria. Depois apaga uma matrícula de teste e as parcelas dela somem junto (CASCADE), sem
deixar parcelas "órfãs".

## Dinâmica — Quebra-regra (25 min, duplas)
- **Objetivo:** provar que as restrições funcionam, lendo as mensagens de erro (C7).
- **Materiais:** banco de teste da escola com as restrições e uma lista de "tentativas proibidas"
  (CPF repetido, turma de curso inexistente, mensalidade negativa, turno "madrugada").
- **Passo a passo:** (1) a dupla executa cada tentativa; (2) anota a mensagem de erro e qual
  restrição barrou; (3) cria uma tentativa nova que **passa** quando não deveria e propõe a
  restrição que falta.
- **Fechamento:** a turma reúne as restrições propostas e decide quais entram no script da SA 2.

## Situação-problema e entrega da aula
- **SA 2 (continuação):** script `01-ddl-escola.sql` atualizado com chaves primárias, estrangeiras
  (com ON DELETE justificado), UNIQUE e CHECK de todas as tabelas, mais o registro das tentativas
  da dinâmica (erro obtido e restrição responsável).

## Verificação da aprendizagem
- Escrever a chave estrangeira de `turma` para `curso`.
- Escolher entre RESTRICT, CASCADE e SET NULL para três situações.
- Transformar "o valor deve ser maior que zero" em restrição.
- Explicar a mensagem *violates foreign key constraint*.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), kit multimídia
e slides `../AULAS/AULA-13-SLIDES.pdf` (apresentação, quando o professor publicar).
