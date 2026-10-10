# Aula 19 — Segurança da Informação: Pilares, Acesso e Auditoria

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 2 Segurança da informação — 2.1 Pilares (2.1.1 Integridade ·
  2.1.2 Disponibilidade · 2.1.3 Confidencialidade) · 2.2 Controle de acesso · 2.3 Auditoria de acesso
- **Capacidades:** C12 — Reconhecer os pilares da segurança da informação · C13 — Reconhecer os
  níveis hierárquicos de segurança da informação · C14 — Aplicar boas práticas de segurança da
  informação
- **Estratégias:** exposição dialogada com casos de vazamento e perda de dados, demonstração no psql
  com logins diferentes, construção da matriz de acesso, dinâmica em grupos, trabalho da SA 2
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-19.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-19.md)

## Indicadores

- (12) Aplica pilares, níveis de acesso e auditoria com papéis e permissões (C12–C14).

## Objetivos

- Explicar os três pilares da segurança da informação — **confidencialidade**, **integridade** e
  **disponibilidade** — e reconhecer qual deles cada ameaça atinge.
- Montar a **matriz de acesso** do sistema (quem pode ler, incluir, alterar e excluir o quê),
  seguindo o **princípio do menor privilégio** e os **níveis hierárquicos** de acesso.
- Criar **papéis** (`CREATE ROLE`) de grupo e de login no PostgreSQL e dar ou tirar permissões com
  **`GRANT`** e **`REVOKE`**, inclusive por coluna e por visão (`VIEW`).
- Registrar **quem fez o quê e quando** numa tabela de **auditoria** alimentada por trigger.
- Aplicar boas práticas: senha forte, sem usuário compartilhado, sem `postgres` na aplicação, backup
  testado e cuidado com dados pessoais (LGPD).

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: trigger de histórico, `current_user` e `now()` (aula 18) |
| Exposição dialogada | 35 min | Pilares, ameaças, níveis hierárquicos, menor privilégio e LGPD |
| Demonstração | 40 min | Papéis, `GRANT`/`REVOKE`, permissão por coluna, visão e teste com cada login |
| Intervalo | 15 min | — |
| Dinâmica | 25 min | "Quem pode o quê?" (abaixo) |
| Prática autônoma (SA 2) | 85 min | Script de papéis, permissões e auditoria da escola, com os testes |
| Registro | 25 min | Conferência da auditoria gravada e quiz de saída |

## Conteúdo

### 1. Os três pilares da segurança da informação (C12)
Segurança da informação é proteger os dados para que fiquem **sigilosos**, **corretos** e
**disponíveis**. Os três pilares (conhecidos pela sigla **CID**, em inglês *CIA*):

| Pilar | Pergunta | Ameaça típica | Proteção no banco |
|---|---|---|---|
| **Confidencialidade** | Só quem pode vê o dado? | Vazamento do CPF dos alunos; login compartilhado | Papéis e `GRANT` mínimos, permissão por coluna, visão, senha forte, conexão só da rede do servidor (`pg_hba.conf`, aula 4) |
| **Integridade** | O dado está correto e completo? | Alguém muda a nota sem autorização; exclusão por engano | Chaves e `CHECK` (aula 13), transação e procedimento (aula 17), trigger de validação (aula 18), quem pode alterar (`GRANT UPDATE`) e auditoria |
| **Disponibilidade** | O dado está lá quando é preciso? | Disco queimado, servidor fora do ar, `DROP TABLE` acidental | Backup automático e **testado** (`pg_dump`), servidor estável, monitoramento, ninguém com poder de apagar sem precisar |

Os pilares andam juntos: um backup sem senha resolve a disponibilidade e fere a confidencialidade;
dar `DELETE` para todo mundo "para não atrapalhar" fere a integridade e a disponibilidade.

Alguns autores somam **autenticidade** (o usuário é quem diz ser — login e senha) e
**não repúdio** (quem fez não pode negar — auditoria). Os dois aparecem nesta aula como
**controle de acesso** e **auditoria**.

### 2. Níveis hierárquicos de acesso e menor privilégio (C13)
A informação é classificada em **níveis** e cada função da organização recebe só o nível de que
precisa:

| Nível da informação | Exemplo na escola | Quem acessa |
|---|---|---|
| **Pública** | Nome dos cursos, carga horária, valor | Qualquer um (site) |
| **Interna** | Turmas, quantidade de matrículas por turma | Funcionários da escola |
| **Restrita** | Nome, e-mail e telefone do aluno, notas | Secretaria e coordenação |
| **Confidencial** | CPF, data de nascimento, parcelas e pagamentos | Só quem trabalha com o dado (secretaria / financeiro) |

E as funções formam uma **hierarquia** de poder sobre o banco (aula 2):

| Nível de acesso | Quem é | O que pode |
|---|---|---|
| **Administrador (DBA)** | `postgres` / responsável técnico | Tudo: criar banco, papéis, backup — **nunca** usado pela aplicação nem no dia a dia |
| **Dono dos objetos** | Papel que criou as tabelas (o script da SA 2) | Alterar a estrutura (`ALTER`, `DROP`) |
| **Aplicação** | `app_escola` (aula 4) | Só os comandos que o back-end usa |
| **Usuários por função** | Secretaria, financeiro, coordenação | Só as tabelas e colunas da função |
| **Somente leitura** | Relatórios, coordenação | `SELECT` em visões, sem alterar nada |

**Princípio do menor privilégio:** cada usuário recebe **só** as permissões necessárias para o
trabalho dele — nada "a mais por garantia". Se a senha da secretaria vazar, o estrago fica limitado
ao que a secretaria podia fazer.

### 3. Matriz de acesso
Antes do SQL, a equipe monta a **matriz de acesso** (documento da SA 2) com a conversa com o cliente
(aula 5). Letras: **S** = `SELECT`, **I** = `INSERT`, **U** = `UPDATE`, **D** = `DELETE`.

| Tabela | Secretaria | Financeiro | Coordenação |
|---|---|---|---|
| `curso`, `turma` | S | — | — (só pela visão) |
| `aluno` | S I U | S só `id_aluno` e `nome` | — |
| `matricula` | S I U | S | — (só pela visão) |
| `parcela` | — | S e U só `data_pagamento` | — |
| `vw_matriculas_por_turma` | — | — | S |
| `auditoria` | — | — | S |

Ninguém recebe `DELETE`: matrícula é **cancelada** (`situacao = 'cancelada'`, aula 17), não
apagada. Isso protege a integridade e o histórico.

### 4. Papéis (roles) no PostgreSQL
No PostgreSQL, **usuário e grupo são a mesma coisa: um papel (*role*)**. A diferença é o atributo
`LOGIN`:
```sql
-- 1) tirar o acesso que "todo mundo" (PUBLIC) recebe por padrão
REVOKE ALL ON DATABASE escola_db FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- 2) papéis de GRUPO (sem login): as permissões ficam aqui
CREATE ROLE grupo_secretaria NOLOGIN;
CREATE ROLE grupo_financeiro NOLOGIN;
CREATE ROLE grupo_consulta   NOLOGIN;

-- 3) papéis de LOGIN (uma pessoa = um login) dentro do grupo
CREATE ROLE ana_secretaria    LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_secretaria;
CREATE ROLE bruno_financeiro  LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_financeiro;
CREATE ROLE carla_coordenacao LOGIN PASSWORD 'troque-esta-senha';
GRANT grupo_consulta TO carla_coordenacao;      -- outra forma de pôr no grupo
```
- **Permissão no grupo, pessoa no grupo:** quando entra um funcionário novo, basta criar o login
  dele no grupo; quando sai, `ALTER ROLE ... NOLOGIN` (ou `DROP ROLE`) — sem refazer as permissões.
- **Uma pessoa, um login:** login compartilhado ("secretaria" com a senha no post-it) acaba com a
  auditoria — não dá para saber quem fez.
- A senha do script é só exemplo: a senha real é definida pela equipe, **nunca** fica no Git nem no
  código do site.
- `ALTER ROLE bruno_financeiro VALID UNTIL '2026-12-31';` faz o login **expirar** (estagiário,
  contrato temporário).

### 5. GRANT e REVOKE (C14)
```sql
-- entrar no banco e enxergar o esquema
GRANT CONNECT ON DATABASE escola_db TO grupo_secretaria, grupo_financeiro, grupo_consulta;
GRANT USAGE   ON SCHEMA public      TO grupo_secretaria, grupo_financeiro, grupo_consulta;

-- secretaria
GRANT SELECT, INSERT, UPDATE ON aluno, matricula TO grupo_secretaria;
GRANT SELECT ON curso, turma TO grupo_secretaria;

-- financeiro: permissão POR COLUNA
GRANT SELECT ON matricula TO grupo_financeiro;
GRANT SELECT, UPDATE (data_pagamento) ON parcela TO grupo_financeiro;
GRANT SELECT (id_aluno, nome) ON aluno TO grupo_financeiro;     -- não vê CPF nem telefone

-- tirar uma permissão
REVOKE UPDATE ON matricula FROM grupo_secretaria;
```
| Comando | O que faz |
|---|---|
| `GRANT privilégios ON objeto TO papel` | **Dá** a permissão |
| `REVOKE privilégios ON objeto FROM papel` | **Tira** a permissão |
| `GRANT SELECT (col1, col2) ON tabela` | Permissão **só nessas colunas** |
| `GRANT grupo TO pessoa` | Põe a pessoa no grupo (ela **herda** as permissões) |
| `WITH GRANT OPTION` | Deixa o papel repassar a permissão — **evitar** (o controle sai da mão do DBA) |

Privilégios mais usados nas tabelas: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`,
`REFERENCES` e `TRIGGER`; `ALL` dá todos (evitar). Nas funções e procedimentos: `EXECUTE`.

Teste com o login de cada pessoa (`psql -U bruno_financeiro -d escola_db`):
```sql
SELECT id_aluno, nome FROM aluno;                       -- funciona
SELECT cpf FROM aluno;                                   -- ERROR: permission denied for table aluno
UPDATE parcela SET data_pagamento = current_date
 WHERE id_matricula = 10 AND numero = 1;                 -- funciona
UPDATE parcela SET valor = 1 WHERE id_matricula = 10;    -- ERROR: permission denied
DELETE FROM parcela;                                     -- ERROR: permission denied
```
O erro **"permission denied"** é o banco dizendo que a matriz foi respeitada — é o resultado
esperado do teste.

### 6. Visão (VIEW) para mostrar só o necessário
Uma **visão** é uma consulta salva com nome; o usuário recebe permissão na visão e **não** nas
tabelas de baixo:
```sql
CREATE VIEW vw_matriculas_por_turma AS
SELECT t.codigo, c.nome AS curso, count(m.id_matricula) AS matriculas
FROM turma t
JOIN curso c          ON c.id_curso = t.id_curso
LEFT JOIN matricula m ON m.id_turma = t.id_turma
GROUP BY t.codigo, c.nome;

GRANT SELECT ON vw_matriculas_por_turma TO grupo_consulta;
```
A coordenação vê o total de matrículas por turma, mas `SELECT * FROM matricula` dá
*permission denied*: nenhum dado de aluno aparece.

### 7. Conferindo as permissões
- **`\du`** — lista os papéis, os atributos (`Cannot login`, `Superuser`) e de quais grupos cada um
  é membro.
- **`\dp aluno`** — mostra as permissões da tabela (`r` = SELECT, `a` = INSERT, `w` = UPDATE,
  `d` = DELETE) e, em *Column privileges*, as permissões por coluna.
- Consulta: `SELECT grantee, privilege_type FROM information_schema.role_table_grants WHERE
  table_name = 'parcela';`
- No pgAdmin: *Login/Group Roles* e a aba *Security* de cada tabela.

### 8. Auditoria de acesso (2.3)
**Auditoria** é o registro de **quem fez o quê, quando e em qual dado**, para investigar problemas e
provar responsabilidades (não repúdio). No PostgreSQL ela é feita em duas camadas:

1. **Log do servidor** (`postgresql.conf`, aula 4): `log_connections = on` e
   `log_disconnections = on` registram quem entrou e saiu; `log_statement = 'mod'` registra os
   comandos que alteram dados. Bom para investigar acessos, mas o arquivo fica no servidor.
2. **Tabela de auditoria com trigger** (evolução do histórico da aula 18): grava cada alteração das
   tabelas sensíveis dentro do próprio banco.
```sql
CREATE TABLE auditoria (
    id_auditoria  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tabela        text NOT NULL,
    operacao      text NOT NULL,                       -- INSERT, UPDATE ou DELETE
    usuario       text NOT NULL DEFAULT session_user,  -- login que conectou
    momento       timestamptz NOT NULL DEFAULT now(),
    dados_antes   jsonb,
    dados_depois  jsonb
);
REVOKE ALL ON auditoria FROM PUBLIC;          -- ninguém grava nem apaga direto

CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER                  -- roda com o poder do dono: grava mesmo sem GRANT na auditoria
SET search_path = public
AS $$
BEGIN
    INSERT INTO auditoria (tabela, operacao, dados_antes, dados_depois)
    VALUES (TG_TABLE_NAME, TG_OP,
            CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END,
            CASE WHEN TG_OP <> 'DELETE' THEN to_jsonb(NEW) END);
    RETURN NULL;                  -- trigger AFTER: o retorno é ignorado
END;
$$;

CREATE TRIGGER trg_auditoria_parcela
AFTER INSERT OR UPDATE OR DELETE ON parcela
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER trg_auditoria_aluno
AFTER INSERT OR UPDATE OR DELETE ON aluno
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();

GRANT SELECT ON auditoria TO grupo_consulta;   -- a coordenação lê, ninguém altera
```
- **Uma função para várias tabelas:** `TG_TABLE_NAME` e `TG_OP` (aula 18) dizem a tabela e a
  operação; `to_jsonb(OLD)` e `to_jsonb(NEW)` guardam a linha inteira antes e depois.
- **`SECURITY DEFINER`:** os usuários **não** têm permissão na `auditoria`, então não conseguem
  apagar o próprio rastro; a função grava porque roda com o poder do dono dela. O
  `SET search_path = public` evita que alguém troque a tabela por outra de mesmo nome.
- **`session_user` e não `current_user`:** dentro de uma função `SECURITY DEFINER` o
  `current_user` vira o **dono** da função; o `session_user` continua sendo o **login que
  conectou** — por isso cada pessoa precisa do **próprio login**.

Depois do teste do financeiro:
```sql
SELECT momento, usuario, tabela, operacao,
       dados_antes ->> 'data_pagamento' AS antes,
       dados_depois ->> 'data_pagamento' AS depois
FROM auditoria
ORDER BY momento DESC;
```

### 9. Boas práticas de segurança no banco (C14)
- A aplicação conecta com `app_escola` (aula 4), **nunca** com `postgres`; o `postgres` fica só
  com o DBA.
- Senha forte, diferente em cada login, trocada quando alguém sai; **senha nunca no Git** nem no
  JavaScript do site (variáveis de ambiente).
- `pg_hba.conf` libera só o servidor da aplicação e a rede da escola (aula 4).
- Permissões no **grupo**; pessoas no grupo; ninguém com `ALL`, `DELETE` ou `WITH GRANT OPTION`
  sem necessidade.
- Dados pessoais (CPF, nascimento, telefone) só para quem precisa — **LGPD** (Lei nº 13.709/2018):
  coletar só o necessário, proteger e saber quem acessou.
- Backup automático com `pg_dump`, guardado **em outro lugar**, com acesso restrito e **teste de
  restauração** (backup que nunca foi restaurado não é garantia de disponibilidade).
- Revisar a matriz de acesso e a auditoria periodicamente.

### 10. Erros comuns
- Esquecer o `REVOKE ... FROM PUBLIC` → qualquer login novo entra no banco e enxerga o esquema.
- Dar permissão para a **pessoa** em vez do **grupo** → cada funcionário novo vira um script novo e
  as permissões ficam diferentes entre colegas.
- `GRANT ALL` "para não dar erro" → fere o menor privilégio; o erro de permissão é que avisa que a
  matriz precisa ser revista.
- Dar `SELECT` na tabela inteira quando a pessoa só precisa de algumas colunas → usar permissão por
  coluna ou visão.
- Usar `current_user` na auditoria com `SECURITY DEFINER` → grava sempre o dono da função.
- Login compartilhado → a auditoria mostra "secretaria", e não **quem** foi.

## Exemplo no contexto do curso
A escola de cursos livres fictícia descobre que uma planilha com o CPF de todos os alunos circulou
num grupo de mensagens. Ninguém sabe quem exportou: todos usavam o login `postgres`. A equipe
monta a matriz de acesso, cria os grupos `grupo_secretaria`, `grupo_financeiro` e `grupo_consulta`,
um login por funcionário, tira o `postgres` do dia a dia e liga a auditoria em `aluno` e `parcela`.
No teste, o login do financeiro marca o pagamento de uma parcela, recebe *permission denied* ao
tentar ver o CPF, e a tabela `auditoria` mostra o login, a data e o valor antes e depois.

## Dinâmica — Quem pode o quê? (25 min, grupos de 3)
- **Objetivo:** classificar os dados por nível, aplicar o menor privilégio e ligar cada ameaça ao
  pilar atingido (C12–C14).
- **Materiais:** cartões com dados (CPF, nome do curso, nota, valor da parcela, total de matrículas
  por turma), cartões com funções (secretaria, financeiro, coordenação, site) e cartões com
  ameaças ("disco queimou", "nota alterada sem autorização", "planilha de CPF vazou",
  "estagiário apagou a turma").
- **Passo a passo:** (1) o grupo classifica cada dado em pública, interna, restrita ou
  confidencial; (2) preenche a matriz de acesso (S, I, U, D) para cada função; (3) liga cada ameaça
  ao pilar atingido e escreve **um** comando (`GRANT`, `REVOKE`, visão, trigger ou backup) que a
  evita.
- **Fechamento:** o professor executa no psql os comandos de dois grupos, entra com o login de cada
  função e mostra o *permission denied* e a linha gravada na auditoria.

## Situação-problema e entrega da aula
- **SA 2 (continuação):** script `07-seguranca.sql` com: a matriz de acesso como comentário no
  início; `REVOKE ... FROM PUBLIC`; os três grupos e um login por pessoa; os `GRANT` da matriz
  (com uma permissão por coluna e uma visão); a tabela `auditoria`, a função e os triggers em
  `aluno` e `parcela`; e os testes com cada login — um comando permitido, um barrado com
  *permission denied* e a consulta da auditoria mostrando o login que alterou.

## Verificação da aprendizagem
- Dizer qual pilar é atingido em cada caso: vazamento de CPF, nota alterada sem autorização, servidor
  fora do ar.
- Explicar o princípio do menor privilégio com um exemplo da escola.
- Explicar a diferença entre um papel de grupo e um papel de login e por que as permissões ficam no
  grupo.
- Escrever o `GRANT` que deixa o financeiro alterar só a coluna `data_pagamento` da `parcela`.
- Dizer por que a função de auditoria usa `session_user` e `SECURITY DEFINER`.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), kit multimídia
e slides `../AULAS/AULA-19-SLIDES.pdf` (apresentação, quando o professor publicar).
