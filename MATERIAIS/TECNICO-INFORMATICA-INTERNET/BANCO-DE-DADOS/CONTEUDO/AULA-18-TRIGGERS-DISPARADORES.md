# Aula 18 — Triggers (Disparadores)

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 3.2 Linguagem de manipulação de dados — 3.2.6 Triggers
  (disparadores)
- **Capacidades:** C8 — Aplicar linguagem de manipulação de dados
- **Estratégias:** demonstração no psql, construção passo a passo de um trigger de histórico e de um
  de validação, leitura de erros, dinâmica em grupos, trabalho da SA 2
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-18.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-18.md)

## Indicadores

- (11) Cria procedimento armazenado e trigger para uma regra do negócio (C8).

## Objetivos

- Explicar o que é um **trigger** (disparador) e em que ele difere de um procedimento chamado com
  `CALL`.
- Escolher o **evento** (`INSERT`, `UPDATE`, `DELETE`), o **momento** (`BEFORE` ou `AFTER`) e o
  **nível** (`FOR EACH ROW` ou `FOR EACH STATEMENT`) de um trigger.
- Escrever a **função de trigger** em PL/pgSQL (`RETURNS trigger`) usando **`NEW`**, **`OLD`** e
  **`TG_OP`**.
- Criar um trigger de **histórico** (quem mudou a nota, quando, de quanto para quanto) e um de
  **validação** (barrar alteração de parcela já paga).
- Listar, desligar e remover triggers e evitar os erros comuns (falta de `RETURN NEW`, laço infinito).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: função × procedimento, RAISE e FOR UPDATE (aula 17) |
| Exposição dialogada | 30 min | O que é trigger; evento, momento e nível; NEW e OLD |
| Demonstração | 40 min | Trigger de histórico de nota; trigger de validação da parcela; testes |
| Intervalo | 15 min | — |
| Dinâmica | 25 min | "Quem dispara?" (abaixo) |
| Prática autônoma (SA 2) | 90 min | Script com 2 triggers da escola e os testes |
| Registro | 25 min | Conferência do histórico gravado e quiz de saída |

## Conteúdo

### 1. O que é um trigger
**Trigger** (disparador, gatilho) é uma rotina que o banco executa **sozinho** quando acontece um
**evento** numa tabela — ninguém precisa chamá-la. Na aula 17 o back-end fazia `CALL matricular(...)`;
com um trigger, basta o `UPDATE` acontecer, venha ele do site, do aplicativo ou do pgAdmin.

| | Procedimento (aula 17) | Trigger |
|---|---|---|
| Quem executa | O sistema chama com `CALL` ou `SELECT` | O banco, quando o evento acontece |
| Pode ser esquecido? | Sim, se alguém mexer direto na tabela | Não: vale para qualquer comando na tabela |
| Uso típico | Ação completa do negócio (matricular) | Histórico, validação, preencher campos automáticos |

### 2. As três escolhas de um trigger

| Escolha | Opções | Significado |
|---|---|---|
| **Evento** | `INSERT`, `UPDATE` (ou `UPDATE OF coluna`), `DELETE` | Qual comando dispara |
| **Momento** | `BEFORE` (antes) · `AFTER` (depois) | `BEFORE` pode **mudar ou barrar** a linha; `AFTER` vê a linha já gravada (bom para histórico) |
| **Nível** | `FOR EACH ROW` · `FOR EACH STATEMENT` | Uma vez **por linha** afetada ou uma vez **por comando** |

Um `UPDATE` que muda 30 linhas dispara um trigger `FOR EACH ROW` **30 vezes** e um
`FOR EACH STATEMENT` **uma vez**.

### 3. Duas peças no PostgreSQL: a função e o trigger
No PostgreSQL o trigger é montado em **duas partes**:
1. uma **função de trigger**, em PL/pgSQL, que **não recebe parâmetros** e devolve o tipo
   **`trigger`** (`RETURNS trigger`);
2. o comando **`CREATE TRIGGER`**, que liga essa função a uma tabela, a um evento e a um momento.

Dentro da função existem variáveis prontas:

| Variável | O que guarda | Existe em |
|---|---|---|
| `NEW` | A linha **nova** (como vai ficar) | `INSERT` e `UPDATE` |
| `OLD` | A linha **antiga** (como estava) | `UPDATE` e `DELETE` |
| `TG_OP` | O nome da operação: `'INSERT'`, `'UPDATE'` ou `'DELETE'` | Todas |
| `TG_TABLE_NAME` | O nome da tabela que disparou | Todas |

### 4. Trigger de histórico (AFTER): quem mudou a nota
A secretaria pediu para guardar **toda alteração de nota final**, com o usuário e a data. Primeiro a
coluna da nota (combinada no DER da aula 9) e a tabela de histórico:
```sql
ALTER TABLE matricula ADD COLUMN nota_final numeric(4,2) CHECK (nota_final BETWEEN 0 AND 10);

CREATE TABLE historico_nota (
    id_historico   integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_matricula   integer NOT NULL REFERENCES matricula (id_matricula),
    nota_anterior  numeric(4,2),
    nota_nova      numeric(4,2),
    alterado_por   text NOT NULL DEFAULT current_user,
    alterado_em    timestamptz NOT NULL DEFAULT now()
);
```
Depois a função e o trigger:
```sql
CREATE OR REPLACE FUNCTION registrar_historico_nota()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO historico_nota (id_matricula, nota_anterior, nota_nova)
    VALUES (NEW.id_matricula, OLD.nota_final, NEW.nota_final);
    RETURN NEW;            -- em AFTER o retorno é ignorado, mas a função precisa devolver algo
END;
$$;

CREATE TRIGGER trg_historico_nota
AFTER UPDATE OF nota_final ON matricula
FOR EACH ROW
WHEN (OLD.nota_final IS DISTINCT FROM NEW.nota_final)
EXECUTE FUNCTION registrar_historico_nota();

UPDATE matricula SET nota_final = 8.5 WHERE id_matricula = 10;
SELECT * FROM historico_nota;   -- uma linha: de NULL para 8.50, com usuário e data
```
- **`UPDATE OF nota_final`**: só dispara quando o comando mexe nessa coluna.
- **`WHEN (OLD.nota_final IS DISTINCT FROM NEW.nota_final)`**: só grava se o valor mudou de verdade
  (`IS DISTINCT FROM` trata o `NULL` corretamente; `<>` com `NULL` dá "desconhecido").
- **`current_user`** e **`now()`** registram quem e quando — a base da **auditoria** da aula 19.

### 5. Trigger de validação (BEFORE): parcela paga não muda
Regra do negócio: depois de paga, a parcela **não pode ter o valor nem o vencimento alterados**, e
não pode ser apagada.
```sql
CREATE OR REPLACE FUNCTION proteger_parcela_paga()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF OLD.data_pagamento IS NOT NULL THEN
        IF TG_OP = 'DELETE' THEN
            RAISE EXCEPTION 'Parcela %/% já paga não pode ser excluída',
                OLD.id_matricula, OLD.numero;
        END IF;
        IF NEW.valor <> OLD.valor OR NEW.vencimento <> OLD.vencimento THEN
            RAISE EXCEPTION 'Parcela %/% já paga: valor e vencimento não mudam',
                OLD.id_matricula, OLD.numero;
        END IF;
    END IF;
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;        -- em DELETE, devolver OLD deixa a exclusão seguir
    END IF;
    RETURN NEW;            -- em UPDATE, devolver NEW deixa a alteração seguir
END;
$$;

CREATE TRIGGER trg_proteger_parcela_paga
BEFORE UPDATE OR DELETE ON parcela
FOR EACH ROW
EXECUTE FUNCTION proteger_parcela_paga();
```
O que o retorno faz num trigger **BEFORE ... FOR EACH ROW**:

| Retorno | Efeito |
|---|---|
| `RETURN NEW` | A linha segue (pode ter sido alterada antes, ex.: `NEW.email := lower(NEW.email);`) |
| `RETURN OLD` | Usado em `DELETE` para deixar a exclusão seguir |
| `RETURN NULL` | A linha é **pulada em silêncio** (nada é gravado e não aparece erro) |
| `RAISE EXCEPTION` | O comando inteiro para e é **desfeito**, com a mensagem de erro |

### 6. Trigger, restrição ou procedimento?
- **Restrição** (`CHECK`, `UNIQUE`, `FOREIGN KEY` — aula 13): a primeira escolha quando a regra olha
  **só a própria linha** (`valor > 0`).
- **Trigger**: quando a regra precisa comparar **antes e depois** (`OLD` × `NEW`), gravar em
  **outra tabela** (histórico) ou valer para **qualquer comando** na tabela.
- **Procedimento**: quando é uma **ação do negócio** que o sistema pede (matricular, registrar
  pagamento).

⚠️ Trigger demais deixa o banco "mágico": quem lê o `UPDATE` não vê o que mais acontece. Documentar
cada trigger no dicionário de dados (aula 11) e no script da SA 2.

### 7. Listar, desligar e remover
- **`\d matricula`** no psql mostra os triggers da tabela no fim; no pgAdmin, *Tables → matricula →
  Triggers*.
- **`ALTER TABLE parcela DISABLE TRIGGER trg_proteger_parcela_paga;`** desliga (e `ENABLE` religa) —
  usar só em manutenção, com cuidado.
- **`DROP TRIGGER trg_historico_nota ON matricula;`** remove o trigger (a função continua existindo;
  `DROP FUNCTION registrar_historico_nota();` remove a função).
- **`CREATE OR REPLACE TRIGGER`** (PostgreSQL 14 ou mais novo) troca a definição sem apagar antes.

### 8. Erros comuns
- Função de trigger com `RETURNS void` ou com parâmetros → erro ao criar o trigger: ela deve ser
  `RETURNS trigger` e sem parâmetros.
- Trigger `BEFORE` sem `RETURN NEW` (ou com `RETURN NULL`) → a linha **some em silêncio**: o
  `UPDATE` diz "UPDATE 0" e ninguém entende por quê.
- Usar `NEW` num trigger de `DELETE` (ou `OLD` num de `INSERT`) → o valor vem vazio (`NULL`).
- Trigger `AFTER UPDATE` na tabela `matricula` que faz `UPDATE matricula` → dispara de novo, em
  **laço**, até dar erro de profundidade; para mudar a própria linha, usar `BEFORE` e alterar `NEW`.
- Esquecer o `WHEN` (ou o `UPDATE OF`) no histórico → grava linha mesmo quando a nota não mudou.

## Exemplo no contexto do curso
Um aluno reclama que a nota final dele "caiu" de 8,0 para 6,0 no sistema da escola de cursos livres
fictícia e ninguém sabe quem mudou. A equipe cria a tabela `historico_nota` e o trigger
`trg_historico_nota`: a partir dali, toda alteração da nota grava o valor antigo, o novo, o usuário do
banco e a data e a hora — mesmo que a mudança venha direto do pgAdmin. Na mesma reunião, a secretaria
pede que parcela paga não seja mais editada; a equipe cria o trigger `trg_proteger_parcela_paga`.

## Dinâmica — Quem dispara? (25 min, grupos de 3)
- **Objetivo:** escolher evento, momento e nível do trigger e a melhor ferramenta para cada regra
  (C8).
- **Materiais:** cartões com regras ("guardar quem mudou a nota", "e-mail sempre em minúsculas",
  "parcela paga não muda", "valor maior que zero", "matricular só com vaga", "contar quantas
  matrículas foram canceladas por dia").
- **Passo a passo:** (1) o grupo separa os cartões em "restrição", "procedimento" e "trigger";
  (2) para cada trigger, preenche a ficha **evento · momento · nível · NEW/OLD usados**; (3) escreve
  o esboço da função de um deles e apresenta o caso que ele barra ou registra.
- **Fechamento:** o professor executa no psql um dos esboços da turma e mostra o histórico gravado
  ou o erro devolvido.

## Situação-problema e entrega da aula
- **SA 2 (continuação):** script `06-triggers.sql` com a coluna `nota_final`, a tabela
  `historico_nota`, o trigger de histórico de nota e o trigger que protege a parcela paga, cada um
  com um comentário da regra do negócio e com os testes: alteração que grava histórico, alteração
  sem mudança de valor (não grava) e tentativa barrada na parcela paga.

## Verificação da aprendizagem
- Explicar a diferença entre um trigger e um procedimento chamado com `CALL`.
- Dizer quando usar `BEFORE` e quando usar `AFTER`, com um exemplo de cada.
- Explicar o que são `NEW` e `OLD` e em quais eventos cada um existe.
- Dizer o que acontece com a linha quando a função de um trigger `BEFORE` devolve `NULL`.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), kit multimídia
e slides `../AULAS/AULA-18-SLIDES.pdf` (apresentação, quando o professor publicar).
