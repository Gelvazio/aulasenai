# Aula 04 — Configuração do SGBD e Infraestrutura do Sistema

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 4.2.2 Configuração
- **Capacidades:** C5 — Correlacionar as características e funcionalidades do banco de dados com a
  infraestrutura do sistema · C11 — Configurar gerenciadores de bancos de dados · C10 — Instalar
  gerenciadores de bancos de dados (conferência)
- **Estratégias:** demonstração, prática guiada no laboratório, desenho de arquitetura, dinâmica em
  duplas
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-04.md)

## Indicadores

- (3) Instala e configura o PostgreSQL e conecta por cliente gráfico e terminal (C10/C11).
- (4) Liga o banco à infraestrutura do sistema (servidor, porta, usuário, back-end) (C5).

## Objetivos

- Localizar e entender os arquivos de configuração **postgresql.conf** e **pg_hba.conf**.
- Ajustar parâmetros básicos: **listen_addresses**, **port**, **max_connections**,
  **shared_buffers**, **timezone**.
- Criar o **banco** e o **usuário da aplicação** com permissões mínimas.
- Montar a **string de conexão** que o back-end usa, guardando a senha fora do código
  (variáveis de ambiente).
- Desenhar a **infraestrutura**: front-end, back-end, servidor de banco, rede e firewall.
- Saber quando **recarregar** e quando **reiniciar** o serviço.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: componentes, serviço e erros de instalação (aula 3) |
| Exposição com demonstração | 40 min | postgresql.conf, pg_hba.conf, parâmetros e reload × restart |
| Prática guiada | 45 min | Criar banco e usuário da aplicação; testar a conexão com ele |
| Intervalo | 15 min | — |
| Exposição | 25 min | Infraestrutura do sistema web e string de conexão |
| Dinâmica | 30 min | "Monte a arquitetura" (abaixo) |
| Prática autônoma | 50 min | Ficha de configuração do ambiente da SA |
| Registro | 20 min | Socialização e quiz de saída |

## Conteúdo

### 1. Onde ficam as configurações
O PostgreSQL lê dois arquivos principais da **pasta de dados** (ou de `/etc/postgresql/NN/main/`
no Linux):

| Arquivo | O que controla |
|---|---|
| **postgresql.conf** | Como o servidor funciona: endereços, porta, conexões, memória, fuso horário, registros (log) |
| **pg_hba.conf** | **Quem** pode conectar, **de onde**, a **qual banco** e **como se autentica** |

Para descobrir onde estão:
```sql
SHOW config_file;
SHOW hba_file;
SHOW data_directory;
```

### 2. Parâmetros básicos do postgresql.conf

| Parâmetro | Função | Valor comum |
|---|---|---|
| `listen_addresses` | Em quais endereços o servidor aceita conexões | `'localhost'` (só a própria máquina) ou o IP do servidor |
| `port` | Porta de escuta | `5432` |
| `max_connections` | Máximo de conexões ao mesmo tempo | `100` |
| `shared_buffers` | Memória reservada para cache de dados | cerca de 25% da RAM do servidor |
| `timezone` | Fuso horário das datas | `'America/Sao_Paulo'` |
| `log_connections` | Registra cada conexão no log | `on` (ajuda na auditoria, aula 19) |

Ver e alterar um parâmetro:
```sql
SHOW max_connections;
ALTER SYSTEM SET timezone = 'America/Sao_Paulo';
SELECT pg_reload_conf();   -- aplica parâmetros que não exigem reinício
```
Parâmetros como `listen_addresses`, `port` e `shared_buffers` só valem depois de **reiniciar** o
serviço.

### 3. pg_hba.conf — quem pode entrar
Cada linha diz: tipo de conexão, banco, usuário, endereço e método de autenticação.

```
# TIPO   BANCO        USUÁRIO       ENDEREÇO          MÉTODO
local    all          postgres                        peer
host     escola_db    app_escola    127.0.0.1/32      scram-sha-256
host     escola_db    app_escola    10.0.0.20/32      scram-sha-256
```
- `scram-sha-256` exige **senha** protegida (método recomendado).
- `trust` deixa entrar **sem senha** — nunca usar em servidor de verdade.
- A ordem importa: vale a **primeira linha** que combinar.
- Depois de alterar: `SELECT pg_reload_conf();`

### 4. Banco e usuário da aplicação
A aplicação **não usa** o superusuário `postgres` (aula 3). Cria-se um usuário próprio, só com o
que ela precisa:

```sql
CREATE DATABASE escola_db ENCODING 'UTF8';
CREATE ROLE app_escola LOGIN PASSWORD 'senha-forte-definida-pela-equipe';
GRANT CONNECT ON DATABASE escola_db TO app_escola;
-- as permissões em cada tabela são dadas na aula 19 (GRANT SELECT, INSERT...)
```
Testar a conexão com o novo usuário:
```bash
psql -U app_escola -h localhost -d escola_db
```

### 5. Infraestrutura do sistema (C5)
```
[Navegador] --HTTPS--> [Servidor da aplicação: back-end] --rede interna, porta 5432--> [Servidor de banco: PostgreSQL]
                                         |                                                   |
                              variáveis de ambiente                                 backup diário em outro disco
```
Correlação entre características do banco e infraestrutura:

| Necessidade do sistema | Decisão de infraestrutura |
|---|---|
| Muitos acessos simultâneos | `max_connections` adequado + *pool* de conexões no back-end |
| Segurança dos dados | Banco numa rede interna; firewall liberando a 5432 só para o back-end |
| Disponibilidade | Backup automático, monitoramento, servidor com energia estável |
| Desempenho | Memória suficiente (`shared_buffers`), disco rápido |
| Datas corretas | `timezone` igual ao da aplicação |

### 6. String de conexão e variáveis de ambiente
O back-end conecta usando uma **string de conexão**:
```
postgresql://app_escola:SENHA@10.0.0.30:5432/escola_db
```
A senha **não** fica escrita no código: fica numa **variável de ambiente** (ex.: `DATABASE_URL`)
configurada no servidor, e o arquivo com ela (ex.: `.env`) **não vai para o repositório**.

### 7. Recarregar × reiniciar
- **Reload** (`SELECT pg_reload_conf();` ou `systemctl reload postgresql`): aplica mudanças no
  pg_hba.conf e em parâmetros simples, **sem derrubar** as conexões.
- **Restart** (`systemctl restart postgresql` ou Serviços → Reiniciar): necessário para porta,
  endereços e memória; **derruba** as conexões — fazer fora do horário de uso.

## Exemplo no contexto do curso
Na escola de cursos livres fictícia, o back-end fica no servidor 10.0.0.20 e o banco no 10.0.0.30.
A equipe configura `listen_addresses = '10.0.0.30'`, libera no pg_hba.conf apenas o 10.0.0.20 para o
usuário `app_escola`, ajusta o fuso para São Paulo e guarda a `DATABASE_URL` como variável de
ambiente. Um estagiário que tenta conectar do próprio notebook recebe "no pg_hba.conf entry" — a
configuração está funcionando.

## Dinâmica — Monte a arquitetura (30 min, duplas)
- **Objetivo:** correlacionar necessidades do sistema com configurações e infraestrutura (C5, C11).
- **Materiais:** cartões com peças (navegador, back-end, banco, firewall, backup, variável de
  ambiente) e cartões de necessidade ("200 acessos ao mesmo tempo", "só o back-end pode acessar o
  banco", "datas no horário de Brasília").
- **Passo a passo:** (1) a dupla monta o desenho com as peças; (2) para cada necessidade, indica o
  parâmetro ou a decisão de infraestrutura; (3) troca com outra dupla, que aponta uma falha de
  segurança ou de configuração no desenho.
- **Fechamento:** a turma compara os desenhos com a tabela do item 5.

## Situação-problema e entrega da aula
- **Entrega:** ficha de configuração do ambiente do sistema de matrículas: parâmetros ajustados
  (com valores), linhas do pg_hba.conf, banco e usuário da aplicação criados, string de conexão
  (sem a senha real) e desenho da infraestrutura.
- **Ligação com a UC:** o banco `escola_db` e o usuário `app_escola` são usados nas aulas 12 a 20.

## Verificação da aprendizagem
- Dizer o que controla o postgresql.conf e o que controla o pg_hba.conf.
- Explicar por que `trust` não deve ser usado num servidor real.
- Escrever os comandos que criam o banco e o usuário da aplicação.
- Dizer se a mudança de porta exige reload ou restart, e por quê.

## Recursos
Laboratório de informática, computador com acesso à internet, sistemas operacionais, sistema de
gerenciamento de banco de dados (PostgreSQL, psql e pgAdmin), IDE para desenvolvimento de sistemas
(VS Code), manuais técnicos do PostgreSQL, kit multimídia e slides `../AULAS/AULA-04-SLIDES.pdf`
(apresentação, quando o professor publicar).
