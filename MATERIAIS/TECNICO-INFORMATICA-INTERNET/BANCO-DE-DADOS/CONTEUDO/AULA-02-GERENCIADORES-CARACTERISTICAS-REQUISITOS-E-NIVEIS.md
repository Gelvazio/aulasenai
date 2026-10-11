# Aula 02 — Gerenciadores: Características, Requisitos e Níveis

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 4.1 Gerenciadores — 4.1.1 Características · 4.1.2 Requisitos
- **Capacidades:** C4 — Reconhecer as características e funcionalidades do banco de dados ·
  C6 — Reconhecer os diferentes níveis de gerenciamento de dados · C9 — Reconhecer os diferentes
  gerenciadores de bancos de dados
- **Estratégias:** exposição dialogada, quadro comparativo, estudo de caso, dinâmica em grupos
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-02.md)

## Indicadores

- (2) Compara gerenciadores (relacional e não relacional) por características e requisitos (C6/C9).

## Objetivos

- Reconhecer as **características** que diferenciam os gerenciadores: modelo de dados, licença,
  desempenho, escalabilidade, transações (ACID), segurança, ferramentas e comunidade.
- Levantar os **requisitos** de um gerenciador: sistema operacional, memória, disco, rede, portas e
  conhecimento da equipe.
- Explicar os **níveis de gerenciamento de dados** (externo, conceitual/lógico e físico) e a
  **independência de dados**.
- Comparar PostgreSQL, MySQL/MariaDB, SQL Server, Oracle, SQLite e MongoDB.
- Escolher um gerenciador para um caso e justificar a escolha pelos requisitos.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: dado × informação, funções do SGBD, relacional × não relacional (aula 1) |
| Exposição dialogada | 45 min | Características dos gerenciadores; ACID; licenças; escalabilidade |
| Exposição | 30 min | Níveis de gerenciamento (externo, conceitual, físico) e independência de dados |
| Intervalo | 15 min | — |
| Dinâmica | 30 min | "Leilão dos gerenciadores" (abaixo) |
| Estudo de caso | 40 min | Requisitos de três sistemas e escolha do gerenciador |
| Prática autônoma | 45 min | Quadro comparativo de SGBDs |
| Registro | 20 min | Socialização dos quadros e quiz de saída |

## Conteúdo

### 1. Características de um gerenciador (4.1.1)

| Característica | Pergunta que ela responde | Exemplo |
|---|---|---|
| Modelo de dados | Como os dados são organizados? | Relacional (tabelas) ou documentos (JSON) |
| Licença | Quanto custa e o que posso fazer com ele? | Livre (PostgreSQL) ou comercial (Oracle) |
| Transações ACID | Os dados ficam corretos mesmo com falhas? | Pagamento e pedido salvos juntos |
| Desempenho | Responde rápido com muitos dados? | Índices, cache, otimizador de consultas |
| Escalabilidade | Aguenta crescer? | Mais memória (vertical) ou mais servidores (horizontal) |
| Segurança | Quem acessa o quê? | Usuários, papéis, criptografia, auditoria |
| Ferramentas e comunidade | Tem suporte, documentação e clientes gráficos? | pgAdmin, DBeaver, fóruns |

### 2. Transações e ACID
Uma **transação** é um conjunto de comandos que deve acontecer **inteiro ou nada**.

- **A — Atomicidade:** tudo ou nada (o pedido não fica salvo sem o pagamento).
- **C — Consistência:** o banco sai de um estado válido para outro válido (sem estoque negativo).
- **I — Isolamento:** transações ao mesmo tempo não se atrapalham (duas compras do último item).
- **D — Durabilidade:** depois de confirmado, o dado não se perde, mesmo se faltar energia.

```sql
BEGIN;
UPDATE produto SET estoque = estoque - 1 WHERE id = 10;
INSERT INTO pedido (cliente_id, produto_id) VALUES (5, 10);
COMMIT;   -- confirma tudo; em caso de erro, ROLLBACK desfaz tudo
```

### 3. Principais gerenciadores

| Gerenciador | Modelo | Licença | Quando costuma ser usado |
|---|---|---|---|
| **PostgreSQL** | Relacional (aceita JSON) | Livre | Sistemas web, APIs, dados complexos; base do Supabase |
| MySQL / MariaDB | Relacional | Livre (MySQL também tem versão comercial) | Sites e lojas, hospedagens comuns |
| SQL Server | Relacional | Comercial (tem edição gratuita limitada) | Empresas que usam produtos Microsoft |
| Oracle | Relacional | Comercial | Grandes empresas, bancos, governo |
| SQLite | Relacional, banco em um arquivo | Domínio público | Apps de celular, protótipos, testes |
| MongoDB | Documentos (NoSQL) | Livre com restrições / serviço pago | Dados com estrutura variável, catálogos |

### 4. Requisitos de um gerenciador (4.1.2)
Antes de instalar (aula 3), confere-se:

- **Sistema operacional** suportado (Windows, Linux, macOS) e arquitetura (64 bits).
- **Hardware:** memória RAM, processador e **espaço em disco** para os dados, índices e backups.
- **Rede:** porta de acesso (PostgreSQL 5432, MySQL 3306, SQL Server 1433), firewall, acesso do
  servidor da aplicação.
- **Software:** versão compatível com o back-end e o driver da linguagem.
- **Pessoas e custo:** conhecimento da equipe, licença, suporte.
- **Requisitos do sistema:** volume de dados, número de acessos simultâneos, necessidade de
  transações, disponibilidade (pode parar à noite?), segurança dos dados pessoais.

### 5. Níveis de gerenciamento de dados (C6)
A arquitetura em três níveis separa **o que o usuário vê** de **como os dados ficam no disco**:

| Nível | O que descreve | Quem usa | Exemplo |
|---|---|---|---|
| **Externo (visões)** | A parte dos dados que cada usuário ou tela enxerga | Usuários e aplicações | A secretaria vê nome e curso; o financeiro vê mensalidades |
| **Conceitual / lógico** | Todas as tabelas, colunas, chaves e regras | Analista e desenvolvedor | Tabelas aluno, curso, matricula |
| **Físico (interno)** | Como os dados são gravados: arquivos, páginas, índices | SGBD e administrador (DBA) | Arquivos de dados e índices no disco |

- **Independência lógica:** mudar o nível conceitual (acrescentar uma coluna) sem quebrar as
  telas que não usam essa coluna.
- **Independência física:** mudar como o dado é gravado (novo índice, outro disco) sem mudar as
  tabelas nem a aplicação.

Os papéis também têm níveis: **usuário final** (usa as telas), **desenvolvedor** (escreve SQL e
modela) e **administrador de banco (DBA)** (instala, configura, faz backup e controla acessos).

### 6. Como escolher o gerenciador
1. Liste os **requisitos** do sistema (volume, acessos, transações, orçamento, equipe).
2. Compare as **características** dos candidatos com esses requisitos.
3. Prefira o que atende com **menor custo e risco** e que a equipe consegue manter.
4. Registre a **justificativa** (ela entra na documentação técnica, aula 20).

## Exemplo no contexto do curso
Três sistemas fictícios pedem banco: (1) a loja virtual "Ponto Web", com pagamentos e muitos
acessos — precisa de ACID e escalabilidade: **PostgreSQL**; (2) um app de anotações que funciona
sem internet no celular — **SQLite**, um arquivo no próprio aparelho; (3) um catálogo de produtos
em que cada categoria tem campos diferentes — pode usar **MongoDB** ou colunas JSON do PostgreSQL.
A escolha muda porque os **requisitos** mudam.

## Dinâmica — Leilão dos gerenciadores (30 min, grupos de 4)
- **Objetivo:** associar características de gerenciadores a requisitos reais (C9, C4).
- **Materiais:** cartões de "requisito" (ex.: "funciona sem servidor", "transações bancárias",
  "licença gratuita", "dados com formato variável") e 100 "moedas" de papel por grupo.
- **Passo a passo:** (1) cada grupo representa um gerenciador; (2) o professor anuncia um cartão de
  requisito; (3) os grupos "dão lances" se o seu gerenciador atende, explicando em 30 segundos por
  quê; (4) a turma valida se a justificativa está correta; lance errado perde as moedas.
- **Fechamento:** monta-se no quadro a tabela requisito × gerenciador vencedor, ligando ao item 6.

## Situação-problema e entrega da aula
- **Entrega:** quadro comparativo de 4 gerenciadores (modelo, licença, ACID, escalabilidade,
  requisitos de instalação e porta) + escolha justificada do SGBD para um sistema web à escolha.
- **Ligação com a UC:** a escolha justificada é retomada na documentação técnica (aula 20).

## Verificação da aprendizagem
- Explicar cada letra de ACID com um exemplo de loja virtual.
- Dizer em que nível (externo, conceitual ou físico) está: uma tela do aluno; a tabela matricula; o
  arquivo de índice.
- Citar quatro requisitos que devem ser conferidos antes de instalar um SGBD.
- Justificar por que o SQLite não é a melhor escolha para uma loja com milhares de acessos.

## Recursos
Laboratório de informática, computador com acesso à internet, sistemas operacionais, kit
multimídia, sistema de gerenciamento de banco de dados (PostgreSQL), pacote de aplicativos de
escritório, manuais e catálogos técnicos dos gerenciadores e slides `../AULAS/AULA-02-SLIDES.pdf`
(apresentação, quando o professor publicar).
