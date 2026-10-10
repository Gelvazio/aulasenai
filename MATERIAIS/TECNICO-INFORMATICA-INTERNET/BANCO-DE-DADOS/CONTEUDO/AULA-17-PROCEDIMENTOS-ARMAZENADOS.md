# Aula 17 — Procedimentos Armazenados

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 3.2 Linguagem de manipulação de dados — 3.2.5 Procedimentos
  armazenados
- **Capacidades:** C8 — Aplicar linguagem de manipulação de dados
- **Estratégias:** demonstração no psql, construção passo a passo de um procedimento, leitura de
  erros, dinâmica em duplas, trabalho da SA 2
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-17.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-17.md)

## Indicadores

- (11) Cria procedimento armazenado e trigger para uma regra do negócio (C8).

## Objetivos

- Explicar o que é um **procedimento armazenado** e por que guardar uma regra do negócio no banco.
- Diferenciar **função** (`CREATE FUNCTION`, chamada com `SELECT`, devolve valor) de
  **procedimento** (`CREATE PROCEDURE`, chamado com `CALL`).
- Escrever blocos em **PL/pgSQL**: parâmetros, `DECLARE`, `SELECT ... INTO`, `IF`, `RETURN`.
- Barrar operações inválidas com **`RAISE EXCEPTION`** e avisar com **`RAISE NOTICE`**.
- Alterar e remover rotinas com **`CREATE OR REPLACE`** e **`DROP`**.
- Criar o procedimento da SA 2: **matricular um aluno só se a turma tiver vaga** (até 25 alunos).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: JOIN, GROUP BY e subconsultas (aula 16) |
| Exposição dialogada | 30 min | O que é procedimento armazenado; função × procedimento; PL/pgSQL |
| Demonstração | 40 min | Função `valor_pago`; procedimento `matricular`; RAISE; CALL e SELECT |
| Intervalo | 15 min | — |
| Dinâmica | 25 min | "A regra mora onde?" (abaixo) |
| Prática autônoma (SA 2) | 90 min | Script com 1 função e 2 procedimentos da escola |
| Registro | 25 min | Teste dos casos de erro e quiz de saída |

## Conteúdo

### 1. O que é um procedimento armazenado
É um conjunto de comandos SQL **guardado dentro do banco**, com nome e parâmetros, que o sistema
chama quando precisa. Em vez de o back-end mandar vários comandos soltos (contar alunos, comparar
com o limite, inserir a matrícula), ele chama **uma rotina** e o banco faz tudo junto.

| Vantagem | Por quê |
|---|---|
| A regra fica num lugar só | Qualquer sistema (site, aplicativo, script) que usa o banco segue a mesma regra |
| Menos idas e voltas | Uma chamada no lugar de vários comandos pela rede |
| Segurança | O usuário pode ter permissão só de chamar a rotina, sem mexer direto nas tabelas (aula 19) |

⚠️ Regra muito ligada à tela (formato de mensagem, cor do botão) fica no back-end; regra que
protege os **dados** (vaga, saldo, situação) é boa candidata a ficar no banco.

### 2. Função × procedimento no PostgreSQL

| | Função (`CREATE FUNCTION`) | Procedimento (`CREATE PROCEDURE`) |
|---|---|---|
| Como chamar | `SELECT valor_pago(10);` | `CALL matricular(3, 2);` |
| Devolve valor | Sim (`RETURNS numeric`, `RETURNS integer`…) | Não (pode ter parâmetro `INOUT`) |
| Uso típico | Calcular e devolver um resultado | Executar uma ação (inserir, atualizar) |
| Controle de transação | Não pode usar `COMMIT` | Pode usar `COMMIT` (chamado fora de um bloco de transação) |

No dia a dia, "procedimento armazenado" é o nome geral para as duas.

### 3. Estrutura de um bloco PL/pgSQL
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
- **`$$ ... $$`** delimita o corpo da rotina.
- **`DECLARE`** cria variáveis; **`SELECT ... INTO`** guarda o resultado de uma consulta na variável.
- Prefixos **`p_`** (parâmetro) e **`v_`** (variável) evitam confundir com nomes de colunas.

### 4. Procedimento com regra do negócio
```sql
CREATE OR REPLACE PROCEDURE matricular(p_aluno integer, p_turma integer)
LANGUAGE plpgsql
AS $$
DECLARE
    v_ativos integer;
BEGIN
    -- trava a turma para duas matrículas ao mesmo tempo não passarem do limite
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
- **`IF ... THEN ... ELSIF ... ELSE ... END IF;`** decide o caminho.
- **`RAISE EXCEPTION`** para tudo e **desfaz** o que a chamada já fez (nada fica pela metade).
- **`RAISE NOTICE`** só mostra uma mensagem, sem parar.
- **`FOUND`** fica verdadeiro quando o último comando achou ou alterou alguma linha.
- **`FOR UPDATE`** tranca a linha da turma até o fim da transação: a segunda matrícula simultânea
  espera a primeira terminar e já conta o aluno novo.
- A chave estrangeira e o `UNIQUE (id_aluno, id_turma)` da aula 13 continuam valendo: aluno
  inexistente ou matrícula repetida dão erro mesmo dentro do procedimento.

### 5. Procedimento que atualiza
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

### 6. Alterar, listar e remover
- **`CREATE OR REPLACE`** troca o corpo mantendo o nome e os parâmetros.
- **`\df`** no psql lista as funções e procedimentos; o pgAdmin mostra em *Functions* e *Procedures*.
- **`DROP FUNCTION valor_pago(integer);`** e **`DROP PROCEDURE matricular(integer, integer);`** —
  os tipos dos parâmetros identificam a rotina (pode haver duas com o mesmo nome).

### 7. Erros comuns
- Chamar procedimento com `SELECT` ou função com `CALL` → erro (cada uma tem o seu jeito).
- Esquecer o `INTO` no `SELECT` dentro do PL/pgSQL → erro "query has no destination for result data".
- Parâmetro com o mesmo nome de uma coluna (`id_turma`) → erro de nome ambíguo; usar `p_`.
- Esquecer o `;` depois de `END IF` ou o `$$` do fim → erro de sintaxe.
- Usar `RAISE NOTICE` onde a operação deveria ser barrada → a matrícula entra mesmo sem vaga.

## Exemplo no contexto do curso
A secretaria da escola de cursos livres fictícia reclama que, em dia de abertura de matrículas,
algumas turmas ficam com 26 ou 27 alunos: duas atendentes matriculam ao mesmo tempo e o sistema só
conferia a vaga na tela. A equipe cria o procedimento `matricular`, que trava a turma, conta os
alunos ativos e só insere se houver vaga. O back-end passa a fazer só `CALL matricular(...)` e a
mostrar a mensagem do `RAISE EXCEPTION` quando a turma está cheia.

## Dinâmica — A regra mora onde? (25 min, duplas)
- **Objetivo:** decidir se uma regra fica no banco (procedimento/restrição) ou no back-end e
  justificar (C8).
- **Materiais:** cartões com regras ("turma tem até 25 alunos", "CPF não se repete", "mensagem de
  boas-vindas por e-mail", "parcela paga não pode ser paga de novo", "mostrar valores em reais na
  tela").
- **Passo a passo:** (1) a dupla separa os cartões em "restrição (aula 13)", "procedimento" e
  "back-end"; (2) escolhe um cartão de procedimento e escreve o esboço em PL/pgSQL; (3) apresenta
  à turma o caso de erro que a rotina barra.
- **Fechamento:** a turma compara as escolhas e o professor mostra que a mesma regra pode estar
  em mais de um lugar (tela avisa, banco garante).

## Situação-problema e entrega da aula
- **SA 2 (continuação):** script `05-procedimentos.sql` com a função `valor_pago`, o procedimento
  `matricular` (vaga de até 25 alunos) e o procedimento `registrar_pagamento`, cada um com um
  comentário da regra do negócio e com as chamadas de teste do caso certo e de cada caso de erro.

## Verificação da aprendizagem
- Explicar a diferença entre função e procedimento no PostgreSQL e como cada um é chamado.
- Dizer o que acontece com o `INSERT` quando o procedimento chega a um `RAISE EXCEPTION`.
- Escrever a função que devolve quantos alunos ativos uma turma tem.
- Explicar por que o procedimento `matricular` trava a turma com `FOR UPDATE`.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), kit multimídia
e slides `../AULAS/AULA-17-SLIDES.pdf` (apresentação, quando o professor publicar).
