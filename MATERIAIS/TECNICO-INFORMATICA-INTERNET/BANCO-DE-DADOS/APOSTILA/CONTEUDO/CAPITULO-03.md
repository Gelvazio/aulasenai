# Capítulo 03 — Preparação do ambiente: instalação do PostgreSQL

- **Aula:** 03
- **Capacidade:** C10, C11

## Teoria

### Antes de instalar: checklist

Você, como aluno consultor, vai preparar as máquinas da equipe que desenvolve o sistema de
matrículas da escola. Antes do instalador, confira:

- Sistema operacional **64 bits** suportado pela versão escolhida do PostgreSQL.
- **Espaço em disco** para o programa, os dados, os índices e os backups.
- **Porta 5432** livre (outro PostgreSQL instalado ocupa a mesma porta).
- Permissão de **administrador** na máquina.
- Todas as máquinas na **mesma versão principal** (por exemplo, 16 ou 17).

### Componentes do PostgreSQL

| Componente | Para que serve |
|---|---|
| **PostgreSQL Server** | O SGBD em si; roda como **serviço** e guarda os dados |
| **psql** | Cliente de **terminal** para executar SQL |
| **pgAdmin** | Cliente **gráfico** para administrar e consultar |
| Stack Builder | Instala extensões e ferramentas extras (opcional) |
| Pasta de dados (*data directory*) | Onde ficam os arquivos do banco (nível físico, capítulo 2) |

### Roteiro de instalação no Windows

1. Baixar o instalador do **site oficial** do PostgreSQL (nunca de sites desconhecidos).
2. Executar como administrador e escolher a **pasta de instalação**.
3. Marcar os componentes: Server, pgAdmin e Command Line Tools (Stack Builder é opcional).
4. Escolher a **pasta de dados**.
5. Definir a **senha do superusuário `postgres`**: forte, guardada em local seguro, **nunca** no
   código do sistema nem em arquivo público.
6. Manter a **porta 5432** (ou outra livre, se já houver um PostgreSQL na máquina).
7. Escolher o **locale** (idioma e região), por exemplo `Portuguese, Brazil`.
8. Concluir e aguardar o serviço iniciar.

### Roteiro de instalação no Linux

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl status postgresql      # o serviço está ativo?
sudo -u postgres psql                 # entra no psql como o usuário postgres
```

No Linux o usuário `postgres` do sistema operacional é criado junto, e o acesso local inicial usa
esse usuário.

### Conferindo a instalação no psql

```bash
psql --version
psql -U postgres -h localhost -p 5432
```

Dentro do psql:

```sql
SELECT version();          -- mostra a versão do servidor
\l                         -- lista os bancos
\conninfo                  -- mostra usuário, banco, servidor e porta da conexão
\q                         -- sai do psql
```

No **pgAdmin**: *Servers → Register → Server*, informando `localhost`, porta `5432`, usuário
`postgres` e a senha. Se aparecerem os bancos `postgres`, `template0` e `template1`, a instalação
está pronta.

### O serviço do PostgreSQL

O servidor roda como **serviço** (programa em segundo plano). Parado, nenhum sistema conecta.

- **Windows:** aplicativo **Serviços** → `postgresql-x64-NN` → Iniciar.
- **Linux:** `sudo systemctl start postgresql` e `sudo systemctl enable postgresql` (iniciar
  junto com o sistema).

### Problemas comuns e soluções

| Sintoma | Causa provável | Solução |
|---|---|---|
| "Connection refused" | Serviço parado ou porta errada | Iniciar o serviço; conferir a porta |
| "password authentication failed" | Senha errada do usuário | Conferir a senha; redefinir com o DBA |
| Instalador avisa porta em uso | Outro PostgreSQL na 5432 | Usar outra porta ou remover a instalação antiga |
| `psql` não é reconhecido | Pasta `bin` fora do PATH | Usar o "SQL Shell (psql)" ou ajustar o PATH |
| Acentos errados nos dados | Codificação diferente | Usar a codificação **UTF8** |

Na equipe da escola, uma máquina mostrou "connection refused" no primeiro teste: o serviço estava
parado. Com o roteiro registrado, o problema foi resolvido em minutos.

### Boas práticas

- Registrar no **roteiro de instalação**: versão, porta, pasta de dados, data e quem instalou.
- Senha do `postgres` forte e guardada com segurança; a aplicação **não** usa esse usuário
  (capítulos 4 e 19).
- Instalar só o necessário: menos componentes, menos riscos.

## Resumo

- Antes de instalar: 64 bits, espaço em disco, porta 5432 livre, permissão de administrador e a
  mesma versão em toda a equipe.
- O PostgreSQL tem o servidor (serviço), o psql (terminal) e o pgAdmin (gráfico).
- No Windows, o instalador oficial; no Linux, `apt install postgresql`.
- A conferência é `psql --version`, `SELECT version();`, `\l` e `\conninfo`, e o registro do
  servidor no pgAdmin.
- Erros comuns vêm de serviço parado, porta ocupada, senha errada, PATH ou codificação.

## Glossário

- **Serviço:** programa que roda em segundo plano, como o servidor do PostgreSQL.
- **psql:** cliente de terminal do PostgreSQL.
- **pgAdmin:** cliente gráfico do PostgreSQL.
- **Porta:** número que identifica o serviço na rede; a do PostgreSQL é 5432.
- **Superusuário:** usuário com todos os poderes no SGBD (no PostgreSQL, o `postgres`).
- **UTF8:** codificação que guarda corretamente acentos e outros caracteres.
