# Capítulo 04 — Configuração do SGBD e infraestrutura do sistema

- **Aula:** 04
- **Capacidade:** C5, C10, C11

## Teoria

### Onde ficam as configurações

Com o PostgreSQL instalado, você, como aluno consultor, prepara o servidor para o sistema de
matrículas da escola. Ele lê dois arquivos principais da **pasta de dados** (no Linux, de
`/etc/postgresql/NN/main/`):

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

### Parâmetros básicos do postgresql.conf

| Parâmetro | Função | Valor comum |
|---|---|---|
| `listen_addresses` | Em quais endereços o servidor aceita conexões | `'localhost'` ou o IP do servidor |
| `port` | Porta de escuta | `5432` |
| `max_connections` | Máximo de conexões ao mesmo tempo | `100` |
| `shared_buffers` | Memória reservada para cache de dados | cerca de 25% da memória do servidor |
| `timezone` | Fuso horário das datas | `'America/Sao_Paulo'` |
| `log_connections` | Registra cada conexão no log | `on` (ajuda na auditoria, capítulo 19) |

```sql
SHOW max_connections;
ALTER SYSTEM SET timezone = 'America/Sao_Paulo';
SELECT pg_reload_conf();   -- aplica parâmetros que não exigem reinício
```

`listen_addresses`, `port` e `shared_buffers` só valem depois de **reiniciar** o serviço.

### pg_hba.conf: quem pode entrar

Cada linha diz o tipo de conexão, o banco, o usuário, o endereço e o método de autenticação:

```
# TIPO   BANCO        USUÁRIO       ENDEREÇO          MÉTODO
local    all          postgres                        peer
host     escola_db    app_escola    127.0.0.1/32      scram-sha-256
host     escola_db    app_escola    10.0.0.20/32      scram-sha-256
```

- `scram-sha-256` exige **senha** protegida (método recomendado).
- `trust` deixa entrar **sem senha**: nunca usar em servidor de verdade.
- A ordem importa: vale a **primeira linha** que combinar.
- Depois de alterar: `SELECT pg_reload_conf();`

### Banco e usuário da aplicação

A aplicação **não usa** o superusuário `postgres`. Ela ganha um usuário próprio, só com o que
precisa:

```sql
CREATE DATABASE escola_db ENCODING 'UTF8';
CREATE ROLE app_escola LOGIN PASSWORD 'senha-forte-definida-pela-equipe';
GRANT CONNECT ON DATABASE escola_db TO app_escola;
-- as permissões em cada tabela são dadas no capítulo 19 (GRANT SELECT, INSERT...)
```

```bash
psql -U app_escola -h localhost -d escola_db    # testa a conexão com o novo usuário
```

### Infraestrutura do sistema (C5)

```
[Navegador] --HTTPS--> [Back-end 10.0.0.20] --rede interna, porta 5432--> [PostgreSQL 10.0.0.30]
                              |                                                  |
                     variáveis de ambiente                             backup diário em outro disco
```

| Necessidade do sistema | Decisão de infraestrutura |
|---|---|
| Muitos acessos simultâneos | `max_connections` adequado + *pool* de conexões no back-end |
| Segurança dos dados | Banco em rede interna; firewall liberando a 5432 só para o back-end |
| Disponibilidade | Backup automático, monitoramento, energia estável |
| Desempenho | Memória suficiente (`shared_buffers`) e disco rápido |
| Datas corretas | `timezone` igual ao da aplicação |

Na escola, o servidor de banco recebe `listen_addresses = '10.0.0.30'` e o pg_hba.conf libera só o
back-end (10.0.0.20) para o usuário `app_escola`. Quem tenta conectar de outro computador recebe
"no pg_hba.conf entry": a configuração está funcionando.

### String de conexão e variáveis de ambiente

O back-end conecta com uma **string de conexão**:

```
postgresql://app_escola:SENHA@10.0.0.30:5432/escola_db
```

A senha **não** fica no código: fica numa **variável de ambiente** (ex.: `DATABASE_URL`) no
servidor, e o arquivo com ela (ex.: `.env`) **não vai para o repositório**.

### Recarregar × reiniciar

- **Reload** (`SELECT pg_reload_conf();` ou `systemctl reload postgresql`): aplica o pg_hba.conf e
  parâmetros simples **sem derrubar** as conexões.
- **Restart** (`systemctl restart postgresql` ou Serviços → Reiniciar): exigido para porta,
  endereços e memória; **derruba** as conexões, então é feito fora do horário de uso.

## Resumo

- `postgresql.conf` define como o servidor funciona; `pg_hba.conf` define quem entra, de onde e
  como.
- Use `scram-sha-256`; nunca `trust` em servidor real.
- A aplicação tem banco e usuário próprios, nunca o `postgres`.
- A infraestrutura liga back-end e banco por rede interna, com firewall, backup e o mesmo fuso
  horário.
- A senha fica em variável de ambiente; reload aplica sem derrubar, restart derruba as conexões.

## Glossário

- **postgresql.conf:** arquivo com os parâmetros de funcionamento do servidor.
- **pg_hba.conf:** arquivo que define quem pode conectar e como se autentica.
- **String de conexão:** endereço com usuário, servidor, porta e banco usado pelo back-end.
- **Variável de ambiente:** valor configurado no servidor, fora do código (ex.: `DATABASE_URL`).
- **Pool de conexões:** conjunto de conexões reaproveitadas pelo back-end.
