# Capítulo 02 — Gerenciadores: características, requisitos e níveis

- **Aula:** 02
- **Capacidade:** C4, C6, C9

## Teoria

### Características de um gerenciador (4.1.1)

Antes de recomendar um SGBD para a escola de cursos livres, você, como aluno consultor, compara os
candidatos pelas mesmas perguntas:

| Característica | Pergunta que ela responde | Exemplo |
|---|---|---|
| Modelo de dados | Como os dados são organizados? | Relacional (tabelas) ou documentos (JSON) |
| Licença | Quanto custa e o que posso fazer com ele? | Livre (PostgreSQL) ou comercial (Oracle) |
| Transações ACID | Os dados ficam corretos mesmo com falhas? | Matrícula e pagamento salvos juntos |
| Desempenho | Responde rápido com muitos dados? | Índices e otimizador de consultas |
| Escalabilidade | Aguenta crescer? | Mais memória (vertical) ou mais servidores (horizontal) |
| Segurança | Quem acessa o quê? | Usuários, papéis, criptografia, auditoria |
| Ferramentas e comunidade | Tem documentação e clientes gráficos? | pgAdmin, DBeaver, fóruns |

### Transações e ACID

Uma **transação** é um conjunto de comandos que acontece **inteiro ou nada**.

- **A — Atomicidade:** tudo ou nada (a matrícula não fica salva sem ocupar a vaga).
- **C — Consistência:** o banco sai de um estado válido para outro válido (vagas nunca negativas).
- **I — Isolamento:** transações simultâneas não se atrapalham (duas pessoas e a última vaga).
- **D — Durabilidade:** depois de confirmado, o dado não se perde, mesmo se faltar energia.

```sql
BEGIN;
UPDATE turma SET vagas = vagas - 1 WHERE id = 10;
INSERT INTO matricula (aluno_id, turma_id) VALUES (5, 10);
COMMIT;   -- confirma tudo; em caso de erro, ROLLBACK desfaz tudo
```

### Principais gerenciadores

| Gerenciador | Modelo | Licença | Quando costuma ser usado |
|---|---|---|---|
| **PostgreSQL** | Relacional (aceita JSON) | Livre | Sistemas web, APIs, dados complexos |
| MySQL / MariaDB | Relacional | Livre (o MySQL também tem versão comercial) | Sites e lojas, hospedagens comuns |
| SQL Server | Relacional | Comercial (com edição gratuita limitada) | Empresas que usam produtos Microsoft |
| Oracle | Relacional | Comercial | Grandes empresas, bancos, governo |
| SQLite | Relacional, banco num arquivo | Domínio público | Apps de celular, protótipos, testes |
| MongoDB | Documentos (NoSQL) | Livre com restrições ou serviço pago | Dados com estrutura variável, catálogos |

### Requisitos de um gerenciador (4.1.2)

Antes de instalar (capítulo 3), confira:

- **Sistema operacional** suportado (Windows, Linux, macOS) e arquitetura (64 bits).
- **Hardware:** memória, processador e **espaço em disco** para dados, índices e backups.
- **Rede:** porta de acesso (PostgreSQL 5432, MySQL 3306, SQL Server 1433), firewall e acesso do
  servidor da aplicação.
- **Software:** versão compatível com o back-end e com o driver da linguagem.
- **Pessoas e custo:** conhecimento da equipe, licença e suporte.
- **Requisitos do sistema:** volume de dados, acessos simultâneos, necessidade de transações,
  disponibilidade (pode parar à noite?) e proteção dos dados pessoais.

### Comparação em tabela: PostgreSQL, MySQL, SQLite e MongoDB

| Critério | PostgreSQL | MySQL | SQLite | MongoDB |
|---|---|---|---|---|
| Modelo | Relacional + JSON | Relacional | Relacional, arquivo único | Documentos |
| Transações ACID | Sim | Sim (motor InnoDB) | Sim | Sim, com limitações por cenário |
| Acesso simultâneo | Alto | Alto | Baixo (um escritor por vez) | Alto |
| Instalação | Servidor | Servidor | Nenhuma (biblioteca) | Servidor ou serviço na nuvem |
| Porta padrão | 5432 | 3306 | — | 27017 |
| Bom para | Sistema web com regras e relatórios | Sites e lojas | App local, testes | Catálogo com campos variáveis |

### Níveis de gerenciamento de dados (C6)

A arquitetura em três níveis separa **o que o usuário vê** de **como os dados ficam no disco**:

| Nível | O que descreve | Quem usa | Exemplo na escola |
|---|---|---|---|
| **Externo (visões)** | A parte dos dados que cada usuário ou tela enxerga | Usuários e aplicações | A secretaria vê nome e curso; o financeiro vê mensalidades |
| **Conceitual (lógico)** | Todas as tabelas, colunas, chaves e regras | Analista e desenvolvedor | Tabelas aluno, curso, matricula |
| **Físico (interno)** | Como os dados são gravados: arquivos, páginas, índices | SGBD e administrador (DBA) | Arquivos de dados e índices no disco |

- **Independência lógica:** acrescentar uma coluna sem quebrar as telas que não a usam.
- **Independência física:** criar um índice ou trocar o disco sem mudar tabelas nem aplicação.

Os papéis também têm níveis: **usuário final** (usa as telas), **desenvolvedor** (escreve SQL e
modela) e **administrador de banco (DBA)** (instala, configura, faz backup e controla acessos).

### Como escolher o gerenciador

1. Liste os **requisitos** do sistema (volume, acessos, transações, orçamento, equipe).
2. Compare as **características** dos candidatos com esses requisitos.
3. Prefira o que atende com **menor custo e risco** e que a equipe consegue manter.
4. Registre a **justificativa**: ela entra na documentação técnica (capítulo 20).

Para a escola, com matrículas simultâneas, vagas que não podem passar do limite e relatórios, a
recomendação é um SGBD relacional com ACID e servidor: o **PostgreSQL**. Um app de anotações que
funciona sem internet usaria **SQLite**; um catálogo em que cada item tem campos diferentes poderia
usar **MongoDB** ou colunas JSON do PostgreSQL. A escolha muda porque os **requisitos** mudam.

## Resumo

- Gerenciadores se comparam por modelo de dados, licença, ACID, desempenho, escalabilidade,
  segurança e ferramentas.
- ACID: atomicidade, consistência, isolamento e durabilidade; `BEGIN` … `COMMIT` ou `ROLLBACK`.
- Requisitos: sistema operacional, hardware, rede (porta), software, pessoas, custo e o que o
  sistema exige.
- Três níveis: externo (visões), conceitual (tabelas e regras) e físico (arquivos e índices).
- A escolha do SGBD é justificada pelos requisitos e registrada na documentação.

## Glossário

- **Transação:** conjunto de comandos que acontece inteiro ou nada.
- **ACID:** atomicidade, consistência, isolamento e durabilidade das transações.
- **Escalabilidade:** capacidade de crescer em dados e acessos sem perder desempenho.
- **DBA:** administrador de banco de dados; instala, configura, faz backup e controla acessos.
- **Visão (nível externo):** parte dos dados que um usuário ou tela enxerga.
