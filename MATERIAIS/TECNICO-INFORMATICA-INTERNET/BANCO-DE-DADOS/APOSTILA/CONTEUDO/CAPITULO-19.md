# Capítulo 19 — Segurança da informação: pilares, acesso e auditoria

- **Aula:** 19
- **Capacidade:** C12, C13, C14

## Teoria

### Os três pilares da segurança da informação (C12)

Segurança da informação é proteger os dados para que fiquem **sigilosos**, **corretos** e
**disponíveis**:

| Pilar | Pergunta | Ameaça típica | Proteção no banco |
|---|---|---|---|
| **Confidencialidade** (2.1.3) | Só quem pode vê o dado? | Vazamento do CPF dos alunos; login compartilhado | Papéis e `GRANT` mínimos, permissão por coluna, visão, senha forte, `pg_hba.conf` (capítulo 4) |
| **Integridade** (2.1.1) | O dado está correto e completo? | Nota alterada sem autorização; exclusão por engano | Chaves e `CHECK` (capítulo 13), procedimento (17), trigger (18), quem pode alterar e auditoria |
| **Disponibilidade** (2.1.2) | O dado está lá quando é preciso? | Disco queimado, servidor fora do ar, tabela removida por acidente | Backup automático e **testado**, servidor estável, monitoramento |

Os pilares andam juntos: um backup sem senha resolve a disponibilidade e fere a confidencialidade;
dar `DELETE` para todos "para não atrapalhar" fere a integridade e a disponibilidade.

### Níveis hierárquicos de acesso e menor privilégio (C13)

| Nível da informação | Exemplo na escola | Quem acessa |
|---|---|---|
| **Pública** | Nome dos cursos, carga horária, valor | Qualquer pessoa (site) |
| **Interna** | Turmas e quantidade de matrículas por turma | Funcionários da escola |
| **Restrita** | Nome, e-mail e telefone do aluno, notas | Secretaria e coordenação |
| **Confidencial** | CPF, data de nascimento, parcelas e pagamentos | Só quem trabalha com o dado |

| Nível de acesso | Quem é | O que pode |
|---|---|---|
| **Administrador (DBA)** | `postgres` / responsável técnico | Tudo; **nunca** usado pela aplicação nem no dia a dia |
| **Dono dos objetos** | Papel que criou as tabelas | Alterar a estrutura |
| **Aplicação** | `app_escola` (capítulo 4) | Só os comandos que o back-end usa |
| **Usuários por função** | Secretaria, financeiro, coordenação | Só as tabelas e colunas da função |
| **Somente leitura** | Relatórios | `SELECT` em visões |

🔑 **Princípio do menor privilégio:** cada usuário recebe **só** as permissões de que precisa,
nada "a mais por garantia". Se a senha da secretaria vazar, o estrago fica limitado ao que a
secretaria podia fazer.

### Controle de acesso (2.2): a matriz de acesso

Antes do SQL, você, como aluno consultor, monta com a escola a **matriz de acesso** (S = `SELECT`,
I = `INSERT`, U = `UPDATE`, D = `DELETE`):

| Tabela | Secretaria | Financeiro | Coordenação |
|---|---|---|---|
| `curso`, `turma` | S | — | só pela visão |
| `aluno` | S I U | S só `id_aluno` e `nome` | — |
| `matricula` | S I U | S | só pela visão |
| `parcela` | — | S e U só `data_pagamento` | — |
| `vw_matriculas_por_turma` | — | — | S |
| `auditoria` | — | — | S |

Ninguém recebe `DELETE`: a matrícula é **cancelada** (`situacao = 'cancelada'`), não excluída, o
que protege a integridade e o histórico.

### Papéis (roles) no PostgreSQL

No PostgreSQL, usuário e grupo são a mesma coisa: um **papel**. A diferença é o atributo `LOGIN`:

```sql
REVOKE ALL ON DATABASE escola_db FROM PUBLIC;   -- tira o acesso padrão de "todo mundo"
REVOKE ALL ON SCHEMA public FROM PUBLIC;

CREATE ROLE grupo_secretaria NOLOGIN;            -- grupos: as permissões ficam aqui
CREATE ROLE grupo_financeiro NOLOGIN;
CREATE ROLE grupo_consulta   NOLOGIN;

CREATE ROLE ana_secretaria   LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_secretaria;
CREATE ROLE bruno_financeiro LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_financeiro;
```

- **Permissão no grupo, pessoa no grupo:** funcionário novo ganha um login no grupo; quem sai fica
  com `ALTER ROLE … NOLOGIN`.
- **Uma pessoa, um login:** login compartilhado acaba com a auditoria (não dá para saber quem fez).
- A senha do script é só exemplo: a real é definida pela equipe e **nunca** fica no Git nem no
  código do site.

### GRANT e REVOKE (C14)

```sql
GRANT CONNECT ON DATABASE escola_db TO grupo_secretaria, grupo_financeiro, grupo_consulta;
GRANT USAGE   ON SCHEMA public      TO grupo_secretaria, grupo_financeiro, grupo_consulta;

GRANT SELECT, INSERT, UPDATE ON aluno, matricula TO grupo_secretaria;
GRANT SELECT ON curso, turma TO grupo_secretaria;

GRANT SELECT ON matricula TO grupo_financeiro;
GRANT SELECT, UPDATE (data_pagamento) ON parcela TO grupo_financeiro;   -- por coluna
GRANT SELECT (id_aluno, nome) ON aluno TO grupo_financeiro;             -- não vê o CPF

REVOKE UPDATE ON matricula FROM grupo_secretaria;                       -- tira uma permissão
```

| Comando | O que faz |
|---|---|
| `GRANT … ON objeto TO papel` | **Dá** a permissão |
| `REVOKE … ON objeto FROM papel` | **Tira** a permissão |
| `GRANT SELECT (col1, col2) ON tabela` | Permissão **só nessas colunas** |
| `GRANT grupo TO pessoa` | Põe a pessoa no grupo (ela herda as permissões) |
| `WITH GRANT OPTION` | Deixa repassar a permissão: **evitar** |

Testando com o login do financeiro, o `SELECT cpf FROM aluno` dá **permission denied**, a baixa da
parcela funciona e uma exclusão em `parcela` dá **permission denied**. O erro é o resultado
esperado: mostra que a matriz foi respeitada.

### Visão (VIEW): mostrar só o necessário

```sql
CREATE VIEW vw_matriculas_por_turma AS
SELECT t.codigo, c.nome AS curso, count(m.id_matricula) AS matriculas
FROM turma t
JOIN curso c          ON c.id_curso = t.id_curso
LEFT JOIN matricula m ON m.id_turma = t.id_turma
GROUP BY t.codigo, c.nome;

GRANT SELECT ON vw_matriculas_por_turma TO grupo_consulta;
```

A coordenação vê o total por turma, mas `SELECT * FROM matricula` dá *permission denied*.

Para conferir: **`\du`** lista os papéis e seus grupos; **`\dp aluno`** mostra as permissões da
tabela, inclusive por coluna.

### Auditoria de acesso (2.3)

**Auditoria** é o registro de **quem fez o quê, quando e em qual dado**. No PostgreSQL ela tem duas
camadas:

1. **Log do servidor** (`postgresql.conf`): `log_connections = on` e `log_disconnections = on`
   registram quem entrou e saiu; `log_statement = 'mod'` registra os comandos que alteram dados.
2. **Tabela de auditoria com trigger** (evolução do histórico do capítulo 18):

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
REVOKE ALL ON auditoria FROM PUBLIC;          -- ninguém grava nem altera direto

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

GRANT SELECT ON auditoria TO grupo_consulta;   -- a coordenação lê, ninguém altera
```

- **Uma função para várias tabelas:** `TG_TABLE_NAME` e `TG_OP` dizem a tabela e a operação;
  `to_jsonb` guarda a linha inteira antes e depois.
- **`SECURITY DEFINER`:** os usuários não têm permissão na `auditoria` e não conseguem apagar o
  próprio rastro; a função grava porque roda com o poder do dono.
- **`session_user`:** dentro da função `SECURITY DEFINER`, o `current_user` vira o dono; o
  `session_user` continua sendo o login que conectou. Por isso cada pessoa precisa do próprio login.

### Boas práticas de segurança no banco (C14)

- A aplicação conecta com `app_escola`, **nunca** com `postgres`.
- Senha forte, diferente em cada login, trocada quando alguém sai; **nunca** no Git nem no
  JavaScript do site.
- `pg_hba.conf` libera só o servidor da aplicação e a rede da escola.
- Permissões no **grupo**; ninguém com `ALL`, `DELETE` ou `WITH GRANT OPTION` sem necessidade.
- Dados pessoais só para quem precisa: **LGPD** (Lei nº 13.709/2018).
- Backup automático com `pg_dump`, guardado em outro lugar e com **teste de restauração**.

## Resumo

- Pilares: confidencialidade (só quem pode vê), integridade (dado correto) e disponibilidade (dado
  presente quando preciso).
- Informação em níveis (pública, interna, restrita, confidencial) e menor privilégio para cada
  função.
- A matriz de acesso vira papéis de grupo, logins individuais e `GRANT`/`REVOKE`, até por coluna.
- Visões mostram só o necessário; `\du` e `\dp` conferem as permissões.
- Auditoria: log do servidor + tabela de auditoria com trigger `SECURITY DEFINER` e
  `session_user`.

## Glossário

- **Auditoria:** registro de quem acessou ou alterou o quê.
- **Confidencialidade:** só quem tem permissão vê o dado.
- **Integridade:** o dado está correto e completo.
- **Disponibilidade:** o dado está acessível quando é preciso.
- **Menor privilégio:** dar a cada usuário só as permissões de que ele precisa.
- **Papel (role):** usuário ou grupo de permissões no PostgreSQL.
