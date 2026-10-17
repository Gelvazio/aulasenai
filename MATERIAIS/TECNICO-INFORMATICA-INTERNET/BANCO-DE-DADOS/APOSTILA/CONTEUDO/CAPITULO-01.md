# Capítulo 01 — Banco de dados e SGBD: conceitos e usos

- **Aula:** 01
- **Capacidade:** C4, C9

## Teoria

### Dado, informação e banco de dados

Você, como aluno consultor, foi chamado por uma escola de cursos livres que controla tudo em
planilhas. Antes de propor um sistema, é preciso falar a mesma língua:

| Conceito | O que é | Exemplo na escola |
|---|---|---|
| **Dado** | Fato registrado, sem contexto | `"Ana"`, `17`, `2026-10-09` |
| **Informação** | Dado organizado, com sentido | "Ana, 17 anos, matriculou-se em 09/10/2026" |
| **Banco de dados** | Conjunto organizado de dados relacionados, guardado de forma permanente, consultado e atualizado por vários usuários e sistemas | Alunos, cursos, turmas e matrículas da escola |

Outros exemplos do dia a dia: o cadastro de clientes de uma loja virtual, o histórico de pedidos,
as notas de uma escola e as mensagens de um aplicativo de conversa.

### SGBD: o programa que cuida do banco

O **SGBD** (Sistema Gerenciador de Banco de Dados) é o programa que cria, guarda e gerencia o
banco. O sistema web nunca abre o arquivo do banco direto: ele **pede** ao SGBD, que executa o
pedido e devolve o resultado.

| Funcionalidade do SGBD | O que garante | Exemplo |
|---|---|---|
| Armazenamento | Os dados continuam lá depois que o servidor reinicia | As matrículas de ontem estão salvas |
| Consulta | Encontrar dados rápido, com filtros | "Alunos da turma de Excel de outubro" |
| Integridade | Regras que impedem dados errados | Não aceitar mensalidade negativa |
| Controle de acesso | Cada usuário só faz o que pode | A secretaria matricula; o aluno só consulta |
| Concorrência | Vários usuários ao mesmo tempo sem perder dados | Duas pessoas pegando a última vaga |
| Recuperação | Voltar a um estado seguro depois de falha | Restaurar o banco a partir do backup |

### Planilha × banco de dados

| Situação | Planilha | Banco de dados com SGBD |
|---|---|---|
| Vários usuários ao mesmo tempo | Conflito de versões | Controle de concorrência |
| Milhares de registros | Fica lenta | Índices e consultas rápidas |
| Regras (ex.: e-mail único) | Fáceis de quebrar | Restrições garantidas pelo SGBD |
| Quem pode ver e alterar | Arquivo inteiro ou nada | Permissão por tabela e por ação |
| Ligação com o sistema web | Manual | Conexão direta do back-end |

🔑 **Redundância** é o mesmo dado copiado em vários lugares (o telefone do aluno repetido em cada
matrícula). Uma alteração esquecida gera **inconsistência**. O banco bem modelado evita isso
(capítulos 6 a 11).

### O banco na arquitetura de um sistema web

```
Navegador (front-end)  →  Servidor da aplicação (back-end)  →  SGBD (banco de dados)
   tela de matrícula       confere a vaga e monta o SQL           guarda alunos e turmas
```

- O **front-end** mostra a tela e envia o pedido.
- O **back-end** aplica as regras do negócio e conversa com o banco usando **SQL**.
- O **SGBD** executa o SQL e devolve as linhas.

O banco nunca fica aberto direto para o navegador: quem acessa é o back-end, com usuário e senha
próprios (capítulo 19).

### Gerenciadores de banco de dados (4.1)

- **Relacional:** dados em **tabelas** (linhas e colunas) ligadas por chaves, com a linguagem
  **SQL**. Exemplos: PostgreSQL, MySQL/MariaDB, SQL Server, Oracle e SQLite.
- **Não relacional (NoSQL):** documentos, chave-valor ou grafos. Exemplos: MongoDB e Redis.

Nesta unidade curricular o SGBD é o **PostgreSQL**: gratuito, de código aberto e robusto. As
características e os requisitos de cada gerenciador são o tema do capítulo 2.

### Tabela, linha e coluna: primeira visão

| id | nome | email | cidade |
|---|---|---|---|
| 1 | Ana Souza | ana@exemplo.com | Rio do Sul |
| 2 | Bruno Lima | bruno@exemplo.com | Blumenau |

- **Tabela** = um assunto (alunos). **Coluna** (campo) = uma característica (nome, e-mail).
- **Linha** (registro) = um aluno. O **id** identifica cada linha sem repetição (chave primária,
  capítulo 13).

Só para conhecer o SQL (a sintaxe é estudada no capítulo 15):

```sql
SELECT nome, cidade
FROM aluno
WHERE cidade = 'Rio do Sul';
```

### Gestão do tempo na unidade curricular (1.1)

São 80 horas e um projeto que cresce a cada aula. Monte o seu **plano de estudos**: o que entregar
em cada semana, quanto tempo reservar para praticar SQL e quando pedir ajuda. Atrasar a modelagem
(capítulos 5 a 11) atrasa toda a construção do banco (capítulos 12 a 20).

## Resumo

- Dado é o fato solto; informação é o dado com sentido; banco de dados é o conjunto organizado e
  permanente de dados relacionados.
- O SGBD armazena, consulta, garante integridade, controla acesso, trata a concorrência e recupera
  falhas.
- Num sistema web, só o back-end conversa com o SGBD, usando SQL.
- Gerenciadores podem ser relacionais (PostgreSQL, MySQL, SQL Server, Oracle, SQLite) ou não
  relacionais (MongoDB, Redis); a unidade curricular usa o PostgreSQL.
- Um plano de estudos evita que o atraso da modelagem atrase o projeto inteiro.

## Glossário

- **SGBD:** programa que guarda e gerencia os dados
- **Banco de dados:** conjunto organizado de dados relacionados, guardado de forma permanente.
- **Redundância:** o mesmo dado guardado em mais de um lugar.
- **Inconsistência:** cópias do mesmo dado com valores diferentes.
- **SQL:** linguagem usada para criar, consultar e alterar bancos relacionais.
