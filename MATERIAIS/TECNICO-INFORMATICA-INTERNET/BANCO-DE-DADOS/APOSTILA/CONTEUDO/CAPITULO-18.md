# Capítulo 18 — Triggers (disparadores)

- **Aula:** 18
- **Capacidade:** C8

## Teoria

### O que é um trigger (3.2.6)

**Trigger** (disparador, gatilho) é uma rotina que o banco executa **sozinho** quando acontece um
**evento** numa tabela; ninguém precisa chamá-la. No capítulo 17 o back-end fazia
`CALL matricular(...)`; com um trigger, basta o `UPDATE` acontecer, venha ele do site, do aplicativo
ou do cliente gráfico.

| | Procedimento (capítulo 17) | Trigger |
|---|---|---|
| Quem executa | O sistema chama com `CALL` ou `SELECT` | O banco, quando o evento acontece |
| Pode ser esquecido? | Sim, se alguém mexer direto na tabela | Não: vale para qualquer comando na tabela |
| Uso típico | Ação do negócio (matricular) | Histórico, validação, campos automáticos |

### As três escolhas de um trigger

| Escolha | Opções | Significado |
|---|---|---|
| **Evento** | `INSERT`, `UPDATE` (ou `UPDATE OF coluna`), `DELETE` | Qual comando dispara |
| **Momento** | `BEFORE` · `AFTER` | `BEFORE` pode **mudar ou barrar** a linha; `AFTER` vê a linha já gravada |
| **Nível** | `FOR EACH ROW` · `FOR EACH STATEMENT` | Uma vez **por linha** afetada ou uma vez **por comando** |

Um `UPDATE` que muda 30 linhas dispara um trigger `FOR EACH ROW` **30 vezes** e um
`FOR EACH STATEMENT` **uma vez**.

### Duas peças no PostgreSQL: a função e o trigger

1. Uma **função de trigger** em PL/pgSQL, **sem parâmetros**, que devolve o tipo `trigger`
   (`RETURNS trigger`).
2. O comando **`CREATE TRIGGER`**, que liga essa função a uma tabela, um evento e um momento.

| Variável pronta | O que guarda | Existe em |
|---|---|---|
| `NEW` | A linha **nova** (como vai ficar) | `INSERT` e `UPDATE` |
| `OLD` | A linha **antiga** (como estava) | `UPDATE` e `DELETE` |
| `TG_OP` | A operação: `'INSERT'`, `'UPDATE'` ou `'DELETE'` | Todas |
| `TG_TABLE_NAME` | A tabela que disparou | Todas |

### Trigger de histórico (AFTER): quem mudou a nota

Um aluno da escola reclamou que a nota final "caiu" de 8,0 para 6,0 e ninguém sabe quem mudou. A
secretaria pede para guardar **toda alteração de nota**, com o usuário e a data:

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

CREATE OR REPLACE FUNCTION registrar_historico_nota()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO historico_nota (id_matricula, nota_anterior, nota_nova)
    VALUES (NEW.id_matricula, OLD.nota_final, NEW.nota_final);
    RETURN NEW;      -- em AFTER o retorno é ignorado, mas a função precisa devolver algo
END;
$$;

CREATE TRIGGER trg_historico_nota
AFTER UPDATE OF nota_final ON matricula
FOR EACH ROW
WHEN (OLD.nota_final IS DISTINCT FROM NEW.nota_final)
EXECUTE FUNCTION registrar_historico_nota();
```

- **`UPDATE OF nota_final`:** só dispara quando o comando mexe nessa coluna.
- **`WHEN (… IS DISTINCT FROM …)`:** só grava se o valor mudou de verdade (`IS DISTINCT FROM`
  trata o `NULL` corretamente).
- **`current_user`** e **`now()`** registram quem e quando: a base da **auditoria** (capítulo 19).

### Trigger de validação (BEFORE): parcela paga não muda

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
        RETURN OLD;   -- em DELETE, devolver OLD deixa a exclusão seguir
    END IF;
    RETURN NEW;       -- em UPDATE, devolver NEW deixa a alteração seguir
END;
$$;

CREATE TRIGGER trg_proteger_parcela_paga
BEFORE UPDATE OR DELETE ON parcela
FOR EACH ROW
EXECUTE FUNCTION proteger_parcela_paga();
```

| Retorno num BEFORE … FOR EACH ROW | Efeito |
|---|---|
| `RETURN NEW` | A linha segue (pode ter sido ajustada, ex.: `NEW.email := lower(NEW.email);`) |
| `RETURN OLD` | Usado em `DELETE` para deixar a exclusão seguir |
| `RETURN NULL` | A linha é **pulada em silêncio** (nada é gravado e não aparece erro) |
| `RAISE EXCEPTION` | O comando inteiro para e é **desfeito**, com a mensagem |

### Trigger, restrição ou procedimento?

- **Restrição** (`CHECK`, `UNIQUE`, chave estrangeira): primeira escolha quando a regra olha **só a
  própria linha** (`valor > 0`).
- **Trigger:** quando a regra compara **antes e depois** (`OLD` × `NEW`), grava em **outra tabela**
  (histórico) ou precisa valer para **qualquer comando**.
- **Procedimento:** quando é uma **ação do negócio** que o sistema pede (matricular, registrar
  pagamento).

⚠️ Trigger demais deixa o banco "mágico": quem lê o `UPDATE` não vê o que mais acontece. Documente
cada trigger no dicionário de dados e no script da SA 2.

### Listar, desligar e remover

- **`\d matricula`** no psql mostra os triggers da tabela.
- **`ALTER TABLE parcela DISABLE TRIGGER trg_proteger_parcela_paga;`** desliga (e `ENABLE` religa):
  só em manutenção.
- **`DROP TRIGGER trg_historico_nota ON matricula;`** remove o trigger; a função continua existindo.

### Erros comuns

- Função com `RETURNS void` ou com parâmetros → erro ao criar o trigger.
- `BEFORE` sem `RETURN NEW` (ou com `RETURN NULL`) → a linha **some em silêncio** ("UPDATE 0").
- `NEW` num trigger de `DELETE` (ou `OLD` num de `INSERT`) → valor vazio.
- `AFTER UPDATE` em `matricula` que faz `UPDATE matricula` → dispara de novo, em **laço**; para
  ajustar a própria linha, use `BEFORE` e altere `NEW`.
- Sem o `WHEN` no histórico → grava linha mesmo quando a nota não mudou.

## Resumo

- Trigger é uma rotina que o banco executa sozinho num evento (`INSERT`, `UPDATE`, `DELETE`).
- Escolhas: evento, momento (`BEFORE` ou `AFTER`) e nível (por linha ou por comando).
- No PostgreSQL: função `RETURNS trigger` + `CREATE TRIGGER`, com `NEW`, `OLD` e `TG_OP`.
- `AFTER` serve para histórico; `BEFORE` valida, ajusta ou barra a linha.
- Restrição para a própria linha, trigger para antes × depois e histórico, procedimento para ações.

## Glossário

- **Trigger:** rotina disparada por um evento
- **NEW / OLD:** a linha como vai ficar e como estava, dentro da função de trigger.
- **BEFORE / AFTER:** momento em que o trigger roda, antes ou depois do comando.
- **FOR EACH ROW:** o trigger roda uma vez para cada linha afetada.
- **Tabela de histórico:** tabela que guarda as alterações com valor antigo, novo, usuário e data.
