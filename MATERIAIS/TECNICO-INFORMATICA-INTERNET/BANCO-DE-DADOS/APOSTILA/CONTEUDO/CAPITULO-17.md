# Capítulo 17 — Procedimentos armazenados

- **Aula:** 17
- **Capacidade:** C8

## Teoria

### O que é um procedimento armazenado (3.2.5)

É um conjunto de comandos SQL **guardado dentro do banco**, com nome e parâmetros, que o sistema
chama quando precisa. Em vez de o back-end mandar vários comandos soltos (contar alunos, comparar
com o limite, inserir a matrícula), ele chama **uma rotina** e o banco faz tudo junto.

| Vantagem | Por quê |
|---|---|
| A regra fica num lugar só | Site, aplicativo ou script que usam o banco seguem a mesma regra |
| Menos idas e voltas | Uma chamada no lugar de vários comandos pela rede |
| Segurança | O usuário pode só chamar a rotina, sem mexer direto nas tabelas (capítulo 19) |

⚠️ Regra ligada à tela (formato de mensagem, cor do botão) fica no back-end; regra que protege os
**dados** (vaga, saldo, situação) é boa candidata a ficar no banco.

### Função × procedimento no PostgreSQL

| | Função (`CREATE FUNCTION`) | Procedimento (`CREATE PROCEDURE`) |
|---|---|---|
| Como chamar | `SELECT valor_pago(10);` | `CALL matricular(3, 2);` |
| Devolve valor | Sim (`RETURNS numeric`, `RETURNS integer`…) | Não (pode ter parâmetro `INOUT`) |
| Uso típico | Calcular e devolver um resultado | Executar uma ação (inserir, atualizar) |
| Transação | Não pode usar `COMMIT` | Pode usar `COMMIT` (chamado fora de um bloco de transação) |

No dia a dia, "procedimento armazenado" é o nome geral para as duas.

### Estrutura de um bloco PL/pgSQL

```sql
CREATE OR REPLACE FUNCTION valor_pago(p_matricula integer)
RETURNS numeric
LANGUAGE plpgsql
AS $$
DECLARE
    v_total numeric;                       -- variável local
BEGIN
    SELECT coalesce(sum(valor), 0) INTO v_total
    FROM parcela
    WHERE id_matricula = p_matricula
      AND data_pagamento IS NOT NULL;
    RETURN v_total;                        -- valor devolvido
END;
$$;

SELECT valor_pago(10);                     -- quanto a matrícula 10 já pagou
```

- **`$$ … $$`** delimita o corpo da rotina.
- **`DECLARE`** cria variáveis; **`SELECT … INTO`** guarda o resultado da consulta na variável.
- Os prefixos **`p_`** (parâmetro) e **`v_`** (variável) evitam confusão com nomes de colunas.

### Matricular só se houver vaga

```sql
CREATE OR REPLACE PROCEDURE matricular(p_aluno integer, p_turma integer)
LANGUAGE plpgsql
AS $$
DECLARE
    v_ativos integer;
BEGIN
    -- trava a turma para duas matrículas simultâneas não passarem do limite
    PERFORM 1 FROM turma WHERE id_turma = p_turma FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Turma % não existe', p_turma;
    END IF;

    SELECT count(*) INTO v_ativos
    FROM matricula
    WHERE id_turma = p_turma AND situacao = 'ativa';

    IF v_ativos >= 25 THEN
        RAISE EXCEPTION 'Turma % sem vaga (% alunos ativos)', p_turma, v_ativos;
    END IF;

    INSERT INTO matricula (id_aluno, id_turma) VALUES (p_aluno, p_turma);
    RAISE NOTICE 'Aluno % matriculado na turma %', p_aluno, p_turma;
END;
$$;

CALL matricular(3, 2);
```

- **`IF … THEN … ELSIF … ELSE … END IF;`** decide o caminho.
- **`RAISE EXCEPTION`** para tudo e **desfaz** o que a chamada já fez: nada fica pela metade.
- **`RAISE NOTICE`** só mostra uma mensagem, sem parar.
- **`FOUND`** fica verdadeiro quando o último comando achou ou alterou alguma linha.
- **`FOR UPDATE`** tranca a linha da turma até o fim da transação: a segunda matrícula simultânea
  espera a primeira terminar e já conta o aluno novo.
- A chave estrangeira e o `UNIQUE (id_aluno, id_turma)` do capítulo 13 continuam valendo dentro do
  procedimento.

Na escola, em dia de abertura de matrículas, turmas ficavam com 26 ou 27 alunos: duas atendentes
matriculavam ao mesmo tempo e o sistema só conferia a vaga na tela. Com o procedimento, o back-end
passa a fazer só `CALL matricular(...)` e mostra a mensagem do `RAISE EXCEPTION` quando a turma
está cheia.

### Procedimento que atualiza

```sql
CREATE OR REPLACE PROCEDURE registrar_pagamento(p_matricula integer, p_numero smallint)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE parcela
    SET data_pagamento = current_date
    WHERE id_matricula = p_matricula AND numero = p_numero AND data_pagamento IS NULL;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Parcela %/% não encontrada ou já paga', p_matricula, p_numero;
    END IF;
END;
$$;

CALL registrar_pagamento(10, 2::smallint);
```

### Alterar, listar e remover

- **`CREATE OR REPLACE`** troca o corpo mantendo o nome e os parâmetros.
- **`\df`** no psql lista funções e procedimentos.
- **`DROP FUNCTION valor_pago(integer);`** e **`DROP PROCEDURE matricular(integer, integer);`**: os
  tipos dos parâmetros identificam a rotina (pode haver duas com o mesmo nome).

### Erros comuns

- Chamar procedimento com `SELECT` ou função com `CALL` → erro.
- `SELECT` sem `INTO` dentro do PL/pgSQL → erro "query has no destination for result data".
- Parâmetro com o nome de uma coluna (`id_turma`) → nome ambíguo; use `p_`.
- Esquecer o `;` depois de `END IF` ou o `$$` do fim → erro de sintaxe.
- `RAISE NOTICE` onde a operação deveria ser barrada → a matrícula entra mesmo sem vaga.

## Resumo

- Procedimento armazenado é uma rotina guardada no banco, chamada pelo sistema.
- Função devolve valor (`SELECT`); procedimento executa uma ação (`CALL`).
- PL/pgSQL: `DECLARE`, `BEGIN … END`, `SELECT … INTO`, `IF`, `RAISE`, `FOUND`.
- `RAISE EXCEPTION` barra a operação e desfaz tudo; `FOR UPDATE` evita duas matrículas na última
  vaga.
- Regras que protegem os dados ficam no banco; regras de tela ficam no back-end.

## Glossário

- **Procedimento armazenado:** rotina guardada no banco
- **PL/pgSQL:** linguagem de programação das rotinas do PostgreSQL.
- **Parâmetro:** valor recebido pela rotina na chamada.
- **RAISE EXCEPTION:** comando que barra a operação e desfaz o que já foi feito.
- **FOR UPDATE:** trava a linha lida até o fim da transação.
