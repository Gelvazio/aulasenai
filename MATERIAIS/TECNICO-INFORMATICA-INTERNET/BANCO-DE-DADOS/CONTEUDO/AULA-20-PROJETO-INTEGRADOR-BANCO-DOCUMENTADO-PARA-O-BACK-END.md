# Aula 20 — Projeto Integrador: Banco Documentado para o Back-End

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 6 Documentação técnica — 6.1 Escopo do projeto · 6.2
  Cronograma · 6.3 Fluxograma · 3 Linguagem de consulta de banco de dados (revisão) · 5 Modelo
  entidade-relacionamento (revisão)
- **Capacidades:** C1 — Reconhecer as demandas do cliente · C2 — Aplicar os procedimentos do modelo
  de modelagem entidade-relacionamento · C3 — Aplicar os procedimentos de normalização e
  padronização de dados · C7 — Aplicar linguagem de definição de dados · C8 — Aplicar linguagem de
  manipulação de dados · C14 — Aplicar boas práticas de segurança da informação · S1 — Trabalho em
  equipe e cooperação · S2 — Pensamento crítico e tomada de decisão
- **Estratégias:** retomada guiada pelo checklist da SA 2, demonstração da instalação do banco do
  zero com um script mestre, revisão em pares, apresentação curta de cada equipe, avaliação prática
  e objetiva da UC
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-20.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-20.md)

## Indicadores

- (13) Justifica escolhas de modelagem e de segurança com base nos requisitos (S2).
- (14) Acolhe sugestões do colega na revisão do modelo e do script (S1).

## Objetivos

- Fechar a **SA 2**: o banco `escola_db` instalado do zero, sem erro, a partir dos scripts da
  equipe, pronto para o back-end usar.
- Organizar os scripts (`01-ddl-escola.sql` a `07-seguranca.sql`) num **script mestre** e numa
  pasta de projeto que qualquer pessoa consiga rodar.
- Produzir a **documentação técnica** do banco: escopo atualizado (6.1), DER e dicionário de dados,
  cronograma planejado × realizado (6.2), fluxograma do processo ligado aos procedimentos (6.3),
  matriz de acesso e guia de instalação.
- Revisar o **modelo** (DER e 3FN, aulas 6 a 10) e o **SQL** (DDL, DML, consultas, procedimentos e
  triggers, aulas 12 a 18) com um checklist, ligando cada tabela a um requisito do cliente (C1).
- Definir o **contrato com o back-end**: o que a aplicação pode chamar (visões, procedimentos,
  consultas) com o login `app_escola` e o menor privilégio (C14).
- Fazer e receber a **revisão em pares**, registrar as sugestões e justificar as decisões (S1, S2).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Checklist da SA 2: o que já roda, o que falta (aulas 12–19) |
| Exposição dialogada | 30 min | Pasta do projeto, script mestre, documentação técnica e contrato com o back-end |
| Demonstração | 30 min | Banco criado do zero com o script mestre, teste de ponta a ponta e `pg_dump` |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Revisão cruzada" (abaixo) |
| Prática autônoma (SA 2) | 80 min | Ajustes da revisão, documentação e teste final |
| Apresentação e registro | 40 min | Cada equipe mostra o banco rodando (5 min) e entrega o pacote |

> A avaliação prática da UC (banco completo de um caso fornecido, 25%) e a segunda avaliação
> objetiva (15%) acontecem nesta aula ou no encontro marcado pelo professor (ementa, Seção V).

## Conteúdo

### 1. Do pedido do cliente ao banco pronto (C1)
O projeto integrador junta as duas situações de aprendizagem:

| Etapa | Aulas | Entrega |
|---|---|---|
| **SA 1** — Modelagem | 5 a 11 | Escopo, requisitos, DER, 3FN, padrão de nomes, dicionário, cronograma e fluxograma |
| **SA 2** — Banco funcionando | 12 a 19 | Scripts DDL, dados de teste, consultas, procedimentos, triggers, papéis e auditoria |
| **Projeto integrador** | 20 | Banco instalado do zero + documentação técnica + revisão em pares |

**Rastreabilidade:** cada tabela, coluna importante e regra do banco deve apontar para um
**requisito** do escopo (aula 5). Se uma tabela não atende a nenhum requisito, sobra; se um
requisito não tem tabela ou regra, falta.

| Requisito do cliente (exemplo da escola, numerado no escopo) | Onde está no banco |
|---|---|
| R1 — Cadastrar alunos com contato | Tabela `aluno` (aula 12) |
| R2 — Um aluno não se matricula duas vezes na mesma turma | `UNIQUE (id_aluno, id_turma)` em `matricula` (aula 13) |
| R3 — Turma tem no máximo 25 alunos ativos | Procedimento `matricular` conta as matrículas ativas com `FOR UPDATE` (aula 17) |
| R4 — Parcela paga não pode mudar de valor | Trigger `trg_proteger_parcela_paga` (aula 18) |
| R5 — Saber quem alterou a nota | Trigger `trg_historico_nota` (aula 18) e auditoria (aula 19) |
| R6 — Financeiro não vê o CPF | `GRANT SELECT (id_aluno, nome) ON aluno` (aula 19) |
| R7 — Relatório de matrículas por turma | Visão `vw_matriculas_por_turma` (aula 19) |

### 2. A pasta do projeto e o script mestre (C7, C8)
Os scripts das aulas são juntados numa pasta com uma **ordem de execução**. A ordem importa: a
tabela `turma` precisa de `curso`, o trigger precisa da função, o `GRANT` precisa das tabelas.

```text
projeto-escola/
├── README.md                ← guia de instalação e visão geral (documentação)
├── docs/
│   ├── escopo.md            ← escopo atualizado e requisitos (6.1)
│   ├── der.png + dicionario.md
│   ├── cronograma.md        ← planejado × realizado (6.2)
│   ├── fluxograma-matricula.png (6.3)
│   └── matriz-acesso.md
└── sql/
    ├── 00-instalar.sql      ← script mestre
    ├── 01-ddl-escola.sql    ← tabelas, chaves e restrições (aulas 12–13)
    ├── 02-dados-teste.sql   ← carga de teste (aula 14)
    ├── 03-consultas-basicas.sql
    ├── 04-relatorios.sql    ← junções, agrupamentos e subconsultas (aulas 15–16)
    ├── 05-procedimentos.sql ← matricular, registrar_pagamento (aula 17)
    ├── 06-triggers.sql      ← histórico de nota e parcela paga (aula 18)
    └── 07-seguranca.sql     ← papéis, GRANT, visão e auditoria (aula 19)
```

O **script mestre** chama os outros na ordem certa com o comando `\i` do psql e para no primeiro
erro:
```sql
-- 00-instalar.sql  — uso: psql -U postgres -d escola_db -f sql/00-instalar.sql
\set ON_ERROR_STOP on
\echo '1/7 Estrutura'
\i 01-ddl-escola.sql
\echo '2/7 Dados de teste'
\i 02-dados-teste.sql
\echo '3/7 Consultas básicas'
\i 03-consultas-basicas.sql
\echo '4/7 Relatórios'
\i 04-relatorios.sql
\echo '5/7 Procedimentos'
\i 05-procedimentos.sql
\echo '6/7 Triggers'
\i 06-triggers.sql
\echo '7/7 Segurança'
\i 07-seguranca.sql
\echo 'Banco escola_db instalado.'
```
- **`\set ON_ERROR_STOP on`**: sem ele, o psql mostra o erro e **continua**, e o banco fica pela
  metade sem ninguém perceber.
- **`\i arquivo`**: executa outro script; com `\ir` o caminho é relativo à pasta do script mestre.
- **Banco limpo para testar:** `DROP DATABASE IF EXISTS escola_teste;` e
  `CREATE DATABASE escola_teste;` e rodar o mestre nele — **nunca** no banco de produção.
- **Scripts que podem rodar de novo:** `CREATE OR REPLACE FUNCTION`/`PROCEDURE`/`VIEW`,
  `CREATE TABLE IF NOT EXISTS` e `DROP TRIGGER IF EXISTS ... ON tabela` antes do `CREATE TRIGGER`
  evitam o erro "já existe" na segunda execução.
- Comentário no topo de cada script: o que faz, de que aula veio, de que script depende.

### 3. Documentação técnica do banco (6.1, 6.2, 6.3)
A documentação é o que deixa **outra pessoa** (o colega do back-end, o professor, a próxima
equipe) entender e usar o banco sem perguntar para quem fez.

| Documento | Conteúdo mínimo | Conhecimento |
|---|---|---|
| **Escopo atualizado** | Objetivo do sistema, requisitos (R1, R2...), o que **entra** e o que **não entra**, mudanças de escopo aceitas durante o projeto | 6.1 (aula 5) |
| **DER + dicionário de dados** | Entidades, relacionamentos e cardinalidades; para cada coluna: nome, tipo, tamanho, nulo, chave, regra e exemplo | 5 (aulas 6–11) |
| **Cronograma** | Tarefas, responsável, data prevista e **data realizada**; atrasos com o motivo | 6.2 (aula 11) |
| **Fluxograma** | Processo de matrícula e de pagamento, com cada decisão ligada ao procedimento ou trigger que a executa | 6.3 (aula 11) |
| **Matriz de acesso** | Quem pode S, I, U e D em cada tabela, visão e procedimento | 2.2 (aula 19) |
| **Guia de instalação (README)** | Versão do PostgreSQL, como criar o banco, comando do script mestre, logins que precisam existir, como testar | 3 e 4 |
| **Registro de decisões** | Decisão, motivo e alternativa descartada (ex.: "matrícula é cancelada, não apagada") | S2 |

**Cronograma planejado × realizado** (6.2): o cronograma da aula 11 vira o registro do que
aconteceu.

| Tarefa | Responsável | Previsto | Realizado | Observação |
|---|---|---|---|---|
| DDL com chaves (01) | Ana | Aula 13 | Aula 13 | — |
| Procedimentos (05) | Bruno | Aula 17 | Aula 18 | Atraso: regra de vagas mudou (mudança de escopo aceita) |
| Segurança (07) | Carla | Aula 19 | Aula 19 | — |
| Documentação final | Equipe | Aula 20 | Aula 20 | — |

**Fluxograma ligado ao banco** (6.3): cada losango de decisão do processo de matrícula aponta para
quem decide no banco — "Aluno já matriculado na turma?" → `UNIQUE (id_aluno, id_turma)`;
"Há vagas?" → procedimento `matricular`; "Parcela já paga?" → trigger
`trg_proteger_parcela_paga`. Assim o fluxograma deixa de ser só um desenho e vira a explicação das
regras do banco.

### 4. Revisão do modelo: DER e normalização (C2, C3)
Checklist do modelo, conferido com o `\d` de cada tabela:

- [ ] Toda entidade do DER virou tabela e toda tabela aparece no DER.
- [ ] Toda tabela tem **chave primária**; toda ligação 1:N tem a **chave estrangeira** do lado N.
- [ ] Relacionamento N:N virou **tabela associativa** (`matricula` entre `aluno` e `turma`).
- [ ] **1FN:** nenhuma coluna com lista ("telefone1, telefone2" ou "123;456").
- [ ] **2FN:** na chave composta (`parcela`), nenhuma coluna depende só de parte da chave.
- [ ] **3FN:** nenhuma coluna depende de outra que não é chave (o nome do curso fica em `curso`,
  não repetido em `turma`).
- [ ] **Padrão de nomes** da aula 11: minúsculas, sem acento, singular, `id_` nas chaves, mesmo
  nome da coluna nas duas pontas da FK.
- [ ] Tipos coerentes com o dicionário (`numeric(10,2)` para dinheiro, `date` para datas,
  `varchar(11)` para CPF só com números).

### 5. Revisão do SQL: as consultas do back-end (C8)
A avaliação prática pede **10 consultas** úteis ao sistema. Lista de conferência da equipe:

| # | Consulta | Recursos de SQL |
|---|---|---|
| 1 | Alunos em ordem alfabética com e-mail | `SELECT`, `ORDER BY` |
| 2 | Turmas de um curso num turno | `WHERE` com `AND` |
| 3 | Alunos cujo nome começa com "Ma" | `LIKE` / `ILIKE` |
| 4 | Parcelas vencidas e não pagas | `WHERE vencimento < current_date AND data_pagamento IS NULL` |
| 5 | Matrículas com nome do aluno, turma e curso | `JOIN` de quatro tabelas |
| 6 | Turmas sem nenhuma matrícula | `LEFT JOIN` + `IS NULL` |
| 7 | Total de matrículas por turma | `COUNT`, `GROUP BY` |
| 8 | Turmas com mais de 20 matrículas | `HAVING` |
| 9 | Valor recebido por mês | `SUM`, `date_trunc` ou `extract` |
| 10 | Alunos com mais de uma matrícula ativa | subconsulta ou `HAVING COUNT(*) > 1` |

Cada consulta vai no script com um comentário dizendo **qual tela ou relatório do back-end** usa
ela. Consulta que ninguém vai usar não entra.

### 6. O contrato com o back-end (C14)
O back-end **não** recebe a senha do `postgres` nem acesso a tudo: recebe o login `app_escola`
(aula 4) e uma lista do que pode chamar — o **contrato** entre o banco e a aplicação.

| O back-end faz | Chama no banco | Permissão do `app_escola` |
|---|---|---|
| Matricular um aluno | `CALL matricular(p_aluno, p_turma)` | `EXECUTE` no procedimento |
| Registrar um pagamento | `CALL registrar_pagamento(p_matricula, p_numero)` | `EXECUTE` no procedimento |
| Listar turmas com vagas | `SELECT` na visão da turma | `SELECT` na visão |
| Cadastrar e editar aluno | `INSERT` / `UPDATE` em `aluno` | `INSERT`, `UPDATE` só nas colunas do formulário |
| Excluir matrícula | ❌ não existe: a matrícula é **cancelada** (`situacao = 'cancelada'`) | sem `DELETE` |

```sql
GRANT CONNECT ON DATABASE escola_db TO app_escola;
GRANT USAGE ON SCHEMA public TO app_escola;
GRANT EXECUTE ON PROCEDURE matricular(integer, integer) TO app_escola;
GRANT EXECUTE ON PROCEDURE registrar_pagamento(integer, smallint) TO app_escola;
GRANT SELECT ON vw_matriculas_por_turma TO app_escola;
GRANT SELECT, INSERT, UPDATE (nome, email, telefone) ON aluno TO app_escola;
```
- O back-end usa **consultas com parâmetros** (`$1`, `$2` no driver do PostgreSQL), nunca texto
  digitado pelo usuário colado no SQL — isso evita **SQL injection**.
- A senha do `app_escola` fica numa **variável de ambiente** do servidor, nunca no Git nem no
  JavaScript do site (aula 19).
- Toda regra importante fica **no banco** (chave, `CHECK`, procedimento, trigger): mesmo que o
  back-end tenha um erro, o banco não aceita dado errado.

### 7. Teste de ponta a ponta
Antes de entregar, a equipe roda o roteiro num **banco limpo** e anota o resultado:

1. `CREATE DATABASE escola_teste;` e `psql -d escola_teste -f sql/00-instalar.sql` → termina com
   "Banco escola_db instalado." e **nenhum** `ERROR`.
2. `\dt`, `\dv`, `\df` e `\du` → tabelas, visões, funções/procedimentos e papéis esperados.
3. `CALL matricular(1, 2);` → a matrícula aparece em `matricula`; repetir → erro do
   `UNIQUE (id_aluno, id_turma)` (R2).
4. Pagar uma parcela com `CALL registrar_pagamento(10, 2::smallint)` e tentar mudar o valor dela → o trigger barra (R4).
5. Entrar com o login do financeiro: `SELECT cpf FROM aluno;` → *permission denied* (R6).
6. `SELECT * FROM auditoria ORDER BY momento DESC;` → a alteração aparece com o login (R5).
7. As 10 consultas do script 04 devolvem linhas coerentes com os dados de teste.

### 8. Backup de entrega e restauração
- **Entrega do banco:** `pg_dump -U postgres -d escola_teste -F c -f escola.dump` (formato
  personalizado) ou `pg_dump --schema-only -f estrutura.sql` só com a estrutura.
- **Prova de que o backup funciona:** `createdb escola_restaurado` e
  `pg_restore -d escola_restaurado escola.dump` — backup que nunca foi restaurado não é garantia
  (aula 19, disponibilidade).
- Os scripts da pasta `sql/` são a **fonte**; o dump é a fotografia do banco num momento.

### 9. Revisão em pares e decisões justificadas (S1, S2)
- **Revisão em pares (S1):** cada equipe roda o projeto de outra seguindo só o README. Toda
  dificuldade é uma falha da documentação, não do colega.
- **Como dar a sugestão:** dizer o que encontrou, onde (arquivo e linha) e o efeito ("o script 06
  cria o trigger antes da função, a instalação para com erro"). Crítica ao trabalho, nunca à
  pessoa.
- **Como receber:** anotar a sugestão no registro, agradecer, decidir com a equipe se aceita e
  responder com o motivo.
- **Registro de decisões (S2):**

| Decisão | Motivo (requisito) | Alternativa descartada |
|---|---|---|
| Matrícula é cancelada, não apagada | Guardar o histórico e as parcelas (R5) | `DELETE` com `ON DELETE CASCADE` |
| Vagas conferidas no procedimento | A regra depende de contar as matrículas da turma (R3) | Conferir só na tela do back-end |
| Financeiro vê só `id_aluno` e `nome` | LGPD e menor privilégio (R6) | `SELECT` na tabela inteira |

### 10. Erros comuns
- Rodar os scripts fora de ordem ou sem `ON_ERROR_STOP` → banco pela metade e erro escondido.
- Testar só no banco de desenvolvimento, que tem objetos criados à mão → na máquina do colega
  não roda. Sempre testar num banco **limpo**.
- README que não diz a versão do PostgreSQL nem os logins necessários.
- Documentação desatualizada: o DER mostra uma coluna que o DDL não tem.
- Senha do `app_escola` ou do `postgres` escrita no README ou no script que vai para o Git.
- Consulta montada colando o texto do usuário no SQL (`"... WHERE nome = '" + nome + "'"`) → SQL
  injection.
- Cronograma entregue só com o planejado, sem o realizado e sem o motivo dos atrasos.

## Exemplo no contexto do curso
A equipe da escola de cursos livres fictícia entrega a pasta `projeto-escola`. O colega do
back-end clona o repositório, lê o README, cria o banco `escola_teste` e roda
`psql -f sql/00-instalar.sql`: o script para no passo 6 com "function registrar_historico_nota()
does not exist". Na revisão cruzada, a equipe descobre que a função estava só no banco de
desenvolvimento; ela vai para o `06-triggers.sql` antes do `CREATE TRIGGER`, o README ganha a
linha "PostgreSQL 16 ou mais novo" e o registro de decisões anota a correção. Na segunda tentativa,
o banco instala sem erro, o `CALL matricular(1, 2)` funciona e o login do financeiro recebe
*permission denied* ao tentar ver o CPF.

## Dinâmica — Revisão cruzada (30 min, equipes da SA 2)
- **Objetivo:** testar o projeto de outra equipe só pela documentação, dar e receber sugestões e
  justificar decisões (S1, S2).
- **Materiais:** o repositório (ou pasta) de outra equipe, um banco limpo no PostgreSQL e a
  ficha de revisão (abaixo).
- **Passo a passo:** (1) a equipe revisora segue **só o README** e roda o script mestre num banco
  limpo; (2) preenche a ficha: instalou sem erro? as 7 provas do teste de ponta a ponta passaram?
  o DER bate com o `\d`? há requisito sem tabela ou regra? (3) entrega **duas** sugestões escritas
  (o quê, onde, efeito); (4) a equipe revisada responde cada sugestão: aceita e corrige, ou não
  aceita e justifica.
- **Ficha de revisão:** instalação (sim/não, em qual passo parou) · teste de ponta a ponta (7
  itens) · modelo (PK, FK, 3FN, nomes) · segurança (sem `postgres` na aplicação, sem senha no
  Git, matriz respeitada) · documentação (README, escopo, cronograma, fluxograma).
- **Fechamento:** o professor pede a uma equipe que mostre uma sugestão recebida e como ela mudou o
  projeto.

## Situação-problema e entrega da aula
- **SA 2 (entrega final):** pasta `projeto-escola` com os scripts `00-instalar.sql` a
  `07-seguranca.sql`, o README (guia de instalação), o escopo atualizado, o DER e o dicionário, o
  cronograma planejado × realizado, o fluxograma ligado aos procedimentos e triggers, a matriz de
  acesso, o registro de decisões com as sugestões da revisão cruzada, o roteiro de teste de ponta a
  ponta com os resultados e o arquivo `escola.dump` restaurado com sucesso num banco limpo.

## Verificação da aprendizagem
- Explicar por que o script mestre usa `\set ON_ERROR_STOP on` e por que os scripts têm uma ordem.
- Ligar três requisitos do cliente à tabela, restrição, procedimento ou trigger que os atende.
- Citar o que o README precisa dizer para outra pessoa instalar o banco.
- Escrever dois `GRANT` do contrato com o back-end e dizer por que o `app_escola` não recebe
  `DELETE`.
- Dizer como provar que o backup de entrega funciona.
- Dar uma sugestão de revisão no formato "o quê, onde, efeito" e registrar uma decisão com o
  motivo.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), ferramenta de
diagramação (draw.io ou brModelo), Git, kit multimídia e slides `../AULAS/AULA-20-SLIDES.pdf`
(apresentação, quando o professor publicar).
