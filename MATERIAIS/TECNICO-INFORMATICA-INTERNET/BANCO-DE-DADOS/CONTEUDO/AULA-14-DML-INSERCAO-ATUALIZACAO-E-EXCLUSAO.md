# Aula 14 — DML: Inserção, Atualização e Exclusão

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 3.2 Linguagem de manipulação de dados — 3.2.2 Atualização ·
  3.2.3 Inserção · 3.2.4 Exclusão
- **Capacidades:** C8 — Aplicar linguagem de manipulação de dados
- **Estratégias:** demonstração no psql, prática guiada com transações, dinâmica em duplas,
  carga de dados da SA 2
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-14.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-14.md)

## Indicadores

- (10) Insere, atualiza, exclui e consulta dados com DML (C8).

## Objetivos

- Inserir dados com **INSERT** (uma linha, várias linhas, lista de colunas, DEFAULT e RETURNING).
- Respeitar a **ordem de inserção** imposta pelas chaves estrangeiras.
- Alterar dados com **UPDATE ... SET ... WHERE**.
- Apagar dados com **DELETE ... WHERE**.
- Trabalhar com segurança: conferir com **SELECT** antes, usar **transação** (BEGIN, COMMIT,
  ROLLBACK) e nunca esquecer o **WHERE**.
- Montar a **carga de dados de teste** do sistema de matrículas com dados fictícios.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: chaves e restrições (aula 13) |
| Exposição com demonstração | 40 min | INSERT, ordem por chave estrangeira, RETURNING |
| Demonstração | 30 min | UPDATE e DELETE; o perigo do WHERE esquecido; transações |
| Intervalo | 15 min | — |
| Dinâmica | 25 min | "Rede de segurança" (abaixo) |
| Prática autônoma (SA 2) | 85 min | Script de carga de dados de teste e alterações |
| Registro | 30 min | Conferência das contagens e quiz de saída |

## Conteúdo

### 1. INSERT — inserir linhas
```sql
-- uma linha, informando as colunas (o id é gerado pelo banco)
INSERT INTO curso (nome, carga_horaria, valor_mensal)
VALUES ('Excel Básico', 40, 180.00);

-- várias linhas de uma vez
INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES
    ('Python Iniciante', 60, 250.00),
    ('Design Gráfico',   48, 220.00);

-- devolvendo o id gerado (útil para o back-end)
INSERT INTO aluno (nome, cpf, data_nascimento)
VALUES ('Ana Souza', '12345678901', '2008-03-21')
RETURNING id_aluno;
```
- Sempre **listar as colunas**: o comando continua certo mesmo se a tabela ganhar colunas novas.
- Colunas com **DEFAULT** (ativo, criado_em, data_matricula) podem ser omitidas.
- Textos e datas entre **aspas simples**; números sem aspas; decimal com **ponto**.

### 2. Ordem de inserção
A chave estrangeira exige que o "pai" exista antes: **curso → turma → aluno → matricula →
parcela**. Inserir uma turma de um curso que não existe gera *violates foreign key constraint*.

### 3. UPDATE — alterar linhas
```sql
UPDATE curso
SET valor_mensal = 195.00
WHERE id_curso = 1;

UPDATE matricula
SET situacao = 'trancada'
WHERE id_aluno = 5 AND id_turma = 2;

-- reajuste de 10% em todos os cursos ativos
UPDATE curso
SET valor_mensal = valor_mensal * 1.10
WHERE ativo = true;
```

### 4. DELETE — apagar linhas
```sql
DELETE FROM matricula
WHERE id_matricula = 12;
```
- As restrições continuam valendo: apagar um curso com turmas é **recusado** (RESTRICT); apagar uma
  matrícula apaga as **parcelas** (CASCADE).
- Em muitos sistemas prefere-se a **exclusão lógica** (`UPDATE ... SET ativo = false`) para não
  perder o histórico.

### 5. O perigo do WHERE esquecido
```sql
UPDATE curso SET valor_mensal = 0;   -- ❌ zera TODOS os cursos
DELETE FROM aluno;                   -- ❌ apaga TODOS os alunos (se as restrições deixarem)
```
**Rede de segurança:**
1. Escrever primeiro o **SELECT** com o mesmo WHERE e conferir quais linhas aparecem.
2. Rodar dentro de uma **transação** e conferir o número de linhas afetadas.
3. Confirmar com **COMMIT** ou desfazer com **ROLLBACK**.

```sql
BEGIN;
SELECT * FROM aluno WHERE id_aluno = 7;    -- confere o alvo
UPDATE aluno SET email = 'novo@exemplo.com' WHERE id_aluno = 7;  -- "UPDATE 1"
COMMIT;      -- ou ROLLBACK; se algo saiu errado
```

### 6. TRUNCATE
`TRUNCATE TABLE tabela_teste;` esvazia a tabela inteira de uma vez (mais rápido que DELETE sem
WHERE). Uso: **bancos de teste**, nunca em produção sem backup.

### 7. Carga de dados de teste
Script `02-dados-teste.sql` com dados **fictícios** (nunca dados reais de pessoas): 5 cursos, 8
turmas, 30 alunos, 40 matrículas e as parcelas. Ele permite testar as consultas das aulas 15 e 16.

## Exemplo no contexto do curso
A equipe da escola de cursos livres fictícia carrega os dados de teste. Ao rodar o UPDATE de
reajuste, um integrante esquece o `WHERE ativo = true` e reajusta também um curso desativado. Como
estava numa transação, ele vê "UPDATE 6" em vez de "UPDATE 5", desconfia, executa **ROLLBACK** e
refaz o comando com o WHERE.

## Dinâmica — Rede de segurança (25 min, duplas)
- **Objetivo:** praticar UPDATE e DELETE seguros com SELECT e transação (C8).
- **Materiais:** banco de teste e cartões de pedidos ("trancar a matrícula do aluno 5 na turma 2",
  "apagar a turma de teste T99", "corrigir o e-mail da aluna 7").
- **Passo a passo:** (1) a dupla escreve o SELECT do alvo; (2) abre a transação e executa o
  UPDATE/DELETE; (3) confere o número de linhas e decide COMMIT ou ROLLBACK; (4) troca de papel.
- **Fechamento:** a turma conta quantas vezes o ROLLBACK salvou um erro.

## Situação-problema e entrega da aula
- **SA 2 (continuação):** script `02-dados-teste.sql` com a carga de dados fictícios na ordem das
  chaves estrangeiras, mais 5 UPDATE e 3 DELETE com o SELECT de conferência e a transação de cada um.

## Verificação da aprendizagem
- Escrever o INSERT de um curso informando as colunas.
- Dizer a ordem de inserção curso, turma, aluno, matrícula, parcela e por quê.
- Escrever um UPDATE que tranca uma matrícula específica.
- Explicar o que acontece com UPDATE sem WHERE e como evitar.

## Recursos
Laboratório de informática, computador com acesso à internet, sistema de gerenciamento de banco de
dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas (VS Code), kit multimídia
e slides `../AULAS/AULA-14-SLIDES.pdf` (apresentação, quando o professor publicar).
