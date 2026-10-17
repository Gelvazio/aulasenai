# Capítulo 20 — Projeto integrador: banco documentado para o back-end

- **Aula:** 20
- **Capacidade:** C1, C2, C3, C7, C8, C14, S1, S2

## Teoria

### Do pedido do cliente ao banco pronto (C1)

O projeto integrador junta as duas situações de aprendizagem:

| Etapa | Capítulos | Entrega |
|---|---|---|
| **SA 1** — Modelagem | 5 a 11 | Escopo, requisitos, DER, 3FN, padrão de nomes, dicionário, cronograma e fluxograma |
| **SA 2** — Banco funcionando | 12 a 19 | Scripts DDL, dados de teste, consultas, procedimentos, triggers, papéis e auditoria |
| **Projeto integrador** | 20 | Banco instalado do zero + documentação técnica + revisão em pares |

🔑 **Rastreabilidade:** cada tabela, coluna importante e regra do banco aponta para um
**requisito** do escopo. Tabela sem requisito sobra; requisito sem tabela ou regra falta.

| Requisito da escola | Onde está no banco |
|---|---|
| R1 — Cadastrar alunos com contato | Tabela `aluno` (capítulo 12) |
| R2 — Aluno não se matricula duas vezes na mesma turma | `UNIQUE (id_aluno, id_turma)` em `matricula` (13) |
| R3 — Turma com no máximo 25 alunos ativos | Procedimento `matricular` com `FOR UPDATE` (17) |
| R4 — Parcela paga não muda de valor | Trigger `trg_proteger_parcela_paga` (18) |
| R5 — Saber quem alterou a nota | Trigger `trg_historico_nota` (18) e auditoria (19) |
| R6 — Financeiro não vê o CPF | `GRANT SELECT (id_aluno, nome) ON aluno` (19) |
| R7 — Relatório de matrículas por turma | Visão `vw_matriculas_por_turma` (19) |

### A pasta do projeto e o script mestre (C7, C8)

```text
projeto-escola/
├── README.md                ← guia de instalação e visão geral
├── docs/                    ← escopo, DER, dicionário, cronograma, fluxograma, matriz de acesso
└── sql/
    ├── 00-instalar.sql      ← script mestre
    ├── 01-ddl-escola.sql    ← tabelas, chaves e restrições (capítulos 12–13)
    ├── 02-dados-teste.sql   ← carga de teste (14)
    ├── 03-consultas-basicas.sql
    ├── 04-relatorios.sql    ← junções, agrupamentos e subconsultas (15–16)
    ├── 05-procedimentos.sql ← matricular, registrar_pagamento (17)
    ├── 06-triggers.sql      ← histórico de nota e parcela paga (18)
    └── 07-seguranca.sql     ← papéis, GRANT, visão e auditoria (19)
```

A ordem importa: `turma` precisa de `curso`, o trigger precisa da função, o `GRANT` precisa das
tabelas. O script mestre chama os outros na ordem certa e para no primeiro erro:

```sql
-- 00-instalar.sql — uso: psql -U postgres -d escola_teste -f sql/00-instalar.sql
\set ON_ERROR_STOP on
\ir 01-ddl-escola.sql
\ir 02-dados-teste.sql
\ir 03-consultas-basicas.sql
\ir 04-relatorios.sql
\ir 05-procedimentos.sql
\ir 06-triggers.sql
\ir 07-seguranca.sql
\echo 'Banco instalado.'
```

- **`\set ON_ERROR_STOP on`:** sem ele, o psql mostra o erro e **continua**, e o banco fica pela
  metade sem ninguém perceber.
- **`\ir arquivo`:** executa outro script, com o caminho relativo à pasta do script mestre.
- Teste sempre num **banco limpo** (`escola_teste`), **nunca** no de produção.
- `CREATE OR REPLACE` e `IF NOT EXISTS` deixam os scripts rodarem de novo sem o erro "já existe".

### Documentação técnica (6.1, 6.2 e 6.3)

A documentação deixa **outra pessoa** (o colega do back-end, o professor, a próxima equipe) usar o
banco sem perguntar para quem fez.

| Documento | Conteúdo mínimo |
|---|---|
| **Escopo atualizado** (6.1) | Objetivo, requisitos (R1, R2…), o que entra e o que não entra, mudanças aceitas |
| **DER + dicionário de dados** | Entidades, relacionamentos, cardinalidades; para cada coluna: nome, tipo, nulo, chave, regra e exemplo |
| **Cronograma** (6.2) | Tarefas, responsável, data prevista e **data realizada**; atrasos com o motivo |
| **Fluxograma** (6.3) | Matrícula e pagamento, com cada decisão ligada ao procedimento ou trigger que a executa |
| **Matriz de acesso** | Quem pode S, I, U e D em cada tabela, visão e procedimento |
| **Guia de instalação (README)** | Versão do PostgreSQL, criação do banco, comando do script mestre, como testar |
| **Registro de decisões** | Decisão, motivo e alternativa descartada |

No **cronograma planejado × realizado**, um atraso vira registro: "procedimentos previstos para a
aula 17, entregues na 18: a regra de vagas mudou (mudança de escopo aceita)". No **fluxograma**,
cada decisão aponta para quem decide no banco: "aluno já matriculado na turma?" →
`UNIQUE (id_aluno, id_turma)`; "há vaga?" → `matricular`; "parcela já paga?" →
`trg_proteger_parcela_paga`.

### Revisão do modelo: DER e normalização (C2, C3)

- Toda entidade do DER virou tabela e toda tabela aparece no DER.
- Toda tabela tem **chave primária**; todo 1:N tem a **chave estrangeira** do lado N.
- Todo N:N virou **tabela associativa** (`matricula` entre `aluno` e `turma`).
- **1FN:** nenhuma coluna com lista; **2FN:** na chave composta (`parcela`), nada depende só de parte
  da chave; **3FN:** nada depende de coluna que não é chave.
- **Padrão de nomes** do capítulo 11 e tipos coerentes com o dicionário.

### Revisão do SQL: as consultas do back-end (C8)

| # | Consulta | Recursos |
|---|---|---|
| 1 | Alunos em ordem alfabética com e-mail | `ORDER BY` |
| 2 | Turmas de um curso num turno | `WHERE` com `AND` |
| 3 | Alunos cujo nome começa com "Ma" | `ILIKE` |
| 4 | Parcelas vencidas e não pagas | `vencimento < current_date AND data_pagamento IS NULL` |
| 5 | Matrículas com aluno, turma e curso | `JOIN` de quatro tabelas |
| 6 | Turmas sem nenhuma matrícula | `LEFT JOIN` + `IS NULL` |
| 7 | Total de matrículas por turma | `count`, `GROUP BY` |
| 8 | Turmas com mais de 20 matrículas | `HAVING` |
| 9 | Valor recebido por mês | `sum`, `date_trunc` |
| 10 | Alunos com mais de uma matrícula ativa | `HAVING count(*) > 1` ou subconsulta |

Cada consulta leva um comentário dizendo **qual tela ou relatório do back-end** a usa; consulta que
ninguém vai usar não entra.

### O contrato com o back-end (C14)

O back-end **não** recebe a senha do `postgres`: recebe o login `app_escola` e a lista do que pode
chamar.

| O back-end faz | Chama no banco | Permissão do `app_escola` |
|---|---|---|
| Matricular um aluno | `CALL matricular(p_aluno, p_turma)` | `EXECUTE` no procedimento |
| Registrar um pagamento | `CALL registrar_pagamento(p_matricula, p_numero)` | `EXECUTE` no procedimento |
| Listar matrículas por turma | `SELECT` na visão | `SELECT` na visão |
| Cadastrar e editar aluno | `INSERT` / `UPDATE` em `aluno` | Só nas colunas do formulário |
| Excluir matrícula | Não existe: a matrícula é **cancelada** | Sem `DELETE` |

```sql
GRANT CONNECT ON DATABASE escola_db TO app_escola;
GRANT USAGE ON SCHEMA public TO app_escola;
GRANT EXECUTE ON PROCEDURE matricular(integer, integer) TO app_escola;
GRANT EXECUTE ON PROCEDURE registrar_pagamento(integer, smallint) TO app_escola;
GRANT SELECT ON vw_matriculas_por_turma TO app_escola;
GRANT SELECT, INSERT, UPDATE (nome, email, telefone) ON aluno TO app_escola;
```

- O back-end usa **consultas com parâmetros** (`$1`, `$2` no driver), nunca o texto digitado pelo
  usuário colado no SQL: isso evita **SQL injection**.
- A senha do `app_escola` fica numa **variável de ambiente**, nunca no Git nem no JavaScript.
- As regras importantes ficam **no banco**: mesmo com um erro no back-end, o banco não aceita dado
  errado.

### Teste de ponta a ponta, backup e restauração

1. Num banco limpo, `psql -d escola_teste -f sql/00-instalar.sql` termina sem nenhum `ERROR`.
2. `\dt`, `\dv`, `\df` e `\du` mostram tabelas, visões, rotinas e papéis esperados.
3. `CALL matricular(1, 2);` grava; repetir dá o erro do `UNIQUE` (R2).
4. Pagar uma parcela e tentar mudar o valor: o trigger barra (R4).
5. Com o login do financeiro, `SELECT cpf FROM aluno;` dá *permission denied* (R6).
6. A auditoria mostra as alterações com o login de quem fez (R5).
7. As 10 consultas devolvem linhas coerentes com os dados de teste.

**Backup de entrega:** `pg_dump -U postgres -d escola_teste -F c -f escola.dump`. **Prova de que
funciona:** `createdb escola_restaurado` e `pg_restore -d escola_restaurado escola.dump`. Os
scripts da pasta `sql/` são a fonte; o dump é a fotografia do banco num momento.

### Revisão em pares e decisões justificadas (S1, S2)

- **Revisão em pares (S1):** cada equipe instala o projeto de outra seguindo **só o README**; toda
  dificuldade é uma falha da documentação, não do colega.
- **Dar a sugestão:** o que encontrou, onde (arquivo e linha) e o efeito ("o script 06 cria o
  trigger antes da função; a instalação para com erro"). Crítica ao trabalho, nunca à pessoa.
- **Receber a sugestão:** anotar no registro, decidir com a equipe se aceita e responder com o
  motivo.
- **Justificar as escolhas (S2):** cada decisão de modelagem e de segurança tem o motivo ligado a
  um requisito ("matrícula é cancelada, não excluída, porque o histórico financeiro precisa ficar").

## Resumo

- O projeto integrador junta a SA 1 (modelagem) e a SA 2 (banco funcionando), com rastreabilidade
  de cada regra até um requisito.
- Os scripts ficam numa pasta com ordem de execução e um script mestre com `ON_ERROR_STOP`.
- A documentação técnica reúne escopo, DER e dicionário, cronograma realizado, fluxograma, matriz
  de acesso, README e decisões.
- O back-end usa o login próprio e um contrato de permissões mínimas, com consultas parametrizadas.
- Teste de ponta a ponta, backup restaurado e revisão em pares fecham a entrega.

## Glossário

- **Rastreabilidade:** ligação de cada tabela e regra do banco a um requisito do escopo.
- **Script mestre:** script que executa os outros na ordem certa.
- **Documentação técnica:** documentos que permitem a outra pessoa instalar e usar o banco.
- **SQL injection:** ataque que cola texto do usuário no SQL; evitado com consultas parametrizadas.
- **pg_dump / pg_restore:** ferramentas de backup e restauração do PostgreSQL.
