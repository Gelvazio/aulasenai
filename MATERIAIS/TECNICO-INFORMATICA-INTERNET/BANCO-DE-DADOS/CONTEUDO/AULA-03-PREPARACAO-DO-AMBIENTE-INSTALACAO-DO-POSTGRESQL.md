# Aula 03 — Preparação do Ambiente: Instalação do PostgreSQL

- **Matéria:** Banco de Dados · Técnico em Informática para Internet — SENAI · Módulo Específico II
- **Carga horária:** 4 h
- **Conhecimentos (ementa do curso):** 4.2 Preparação de ambiente de banco de dados — 4.2.1 Instalação
- **Capacidades:** C10 — Instalar gerenciadores de bancos de dados · C11 — Configurar gerenciadores
  de bancos de dados (primeiros ajustes)
- **Estratégias:** demonstração passo a passo, prática guiada no laboratório, roteiro de conferência,
  dinâmica em duplas
- **Prática da aula:** [`../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03.md`](../ATIVIDADES/CONTEUDO/ATIVIDADE-PRATICA-AULA-03.md)

## Indicadores

- (3) Instala e configura o PostgreSQL e conecta por cliente gráfico e terminal (C10/C11).

## Objetivos

- Conferir os **requisitos** antes de instalar (aula 2): sistema operacional, espaço, porta 5432.
- Instalar o **PostgreSQL** no Windows (instalador) e conhecer a instalação no Linux (gerenciador de
  pacotes).
- Entender os componentes instalados: **servidor**, **psql**, **pgAdmin**, **Stack Builder**.
- Definir com segurança a **senha do superusuário** `postgres` e a **porta**.
- Conferir se o **serviço** está rodando e conectar pelo **psql** e pelo **pgAdmin**.
- Resolver os problemas mais comuns de instalação.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Quiz: requisitos, portas e ACID (aula 2) |
| Demonstração | 40 min | Instalação no Windows, tela a tela; visão da instalação no Linux |
| Prática guiada | 50 min | Cada estudante instala (ou confere a instalação do laboratório) |
| Intervalo | 15 min | — |
| Prática guiada | 30 min | Conexão pelo psql e pelo pgAdmin; primeiros comandos |
| Dinâmica | 30 min | "Pane no laboratório" (abaixo) |
| Prática autônoma | 40 min | Roteiro de instalação com prints e conferência |
| Registro | 20 min | Socialização dos problemas encontrados e das soluções |

## Conteúdo

### 1. Antes de instalar — checklist
- Sistema operacional **64 bits** suportado pela versão escolhida do PostgreSQL.
- **Espaço em disco** para o programa, os dados, os índices e os backups.
- **Porta 5432** livre (outro PostgreSQL instalado ocupa a mesma porta).
- Permissão de **administrador** na máquina.
- Versão definida pela equipe (todas as máquinas na **mesma versão principal**, ex.: 16 ou 17).

### 2. Componentes do PostgreSQL

| Componente | Para que serve |
|---|---|
| **PostgreSQL Server** | O SGBD em si, que roda como **serviço** e guarda os dados |
| **psql** | Cliente de **terminal** para executar SQL |
| **pgAdmin** | Cliente **gráfico** para administrar e consultar |
| Stack Builder | Instala extensões e ferramentas extras (opcional) |
| Pasta de dados (*data directory*) | Onde ficam os arquivos do banco (nível físico, aula 2) |

### 3. Instalação no Windows (instalador)
1. Baixar o instalador do **site oficial** do PostgreSQL (nunca de sites desconhecidos).
2. Executar como administrador e escolher a **pasta de instalação**.
3. Marcar os componentes: Server, pgAdmin, Command Line Tools (Stack Builder é opcional).
4. Escolher a **pasta de dados**.
5. Definir a **senha do superusuário `postgres`** — forte, anotada em local seguro, **nunca** no
   código do sistema nem em arquivo público.
6. Manter a **porta 5432** (ou outra livre, se já houver um PostgreSQL na máquina).
7. Escolher o **locale** (idioma/região), por exemplo `Portuguese, Brazil`.
8. Concluir e aguardar o serviço iniciar.

### 4. Instalação no Linux (visão geral)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl status postgresql      # o serviço está ativo?
sudo -u postgres psql                 # entra no psql como o usuário postgres
```
No Linux o usuário `postgres` do sistema é criado junto, e o acesso local inicial usa esse usuário.

### 5. Conferindo a instalação
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

### 6. O serviço do PostgreSQL
O servidor roda como **serviço** (programa em segundo plano). Se ele estiver parado, nenhum
sistema consegue conectar.
- Windows: aplicativo **Serviços** → `postgresql-x64-NN` → Iniciar.
- Linux: `sudo systemctl start postgresql` e `sudo systemctl enable postgresql` (iniciar junto
  com o sistema).

### 7. Problemas comuns e soluções

| Sintoma | Causa provável | Solução |
|---|---|---|
| "Connection refused" | Serviço parado ou porta errada | Iniciar o serviço; conferir a porta |
| "password authentication failed" | Senha errada do usuário | Conferir a senha; redefinir com o DBA |
| Instalador avisa porta em uso | Outro PostgreSQL na 5432 | Usar outra porta ou remover a instalação antiga |
| `psql` não é reconhecido no terminal | Pasta `bin` fora do PATH | Usar o "SQL Shell (psql)" ou ajustar o PATH |
| Acentos errados nos dados | Locale/codificação diferente | Usar codificação **UTF8** |

### 8. Boas práticas
- Registrar no **roteiro de instalação**: versão, porta, pasta de dados, data e quem instalou.
- Senha do `postgres` **forte e guardada com segurança**; a aplicação **não** usa esse usuário
  (aula 4 e aula 19).
- Instalar só o necessário (menos componentes = menos riscos).

## Exemplo no contexto do curso
A equipe da escola de cursos livres fictícia vai desenvolver o sistema de matrículas. Antes de
qualquer tabela, cada desenvolvedor instala o PostgreSQL na mesma versão, com UTF8 e porta 5432,
e registra o roteiro. No primeiro teste, uma máquina mostra "connection refused": o serviço estava
parado. Com o roteiro, o problema é resolvido em minutos.

## Dinâmica — Pane no laboratório (30 min, duplas)
- **Objetivo:** diagnosticar e resolver problemas de instalação e conexão (C10, C11).
- **Materiais:** cartões de "pane" com a mensagem de erro e o contexto (porta em uso, serviço
  parado, senha errada, psql não reconhecido, acentos errados).
- **Passo a passo:** (1) a dupla sorteia um cartão; (2) escreve a causa provável e os passos para
  resolver; (3) quando possível, reproduz e resolve no próprio computador; (4) troca o cartão com
  outra dupla e confere a solução dela.
- **Fechamento:** a turma monta, no quadro, a tabela "sintoma → causa → solução" (item 7).

## Situação-problema e entrega da aula
- **Entrega:** roteiro de instalação com: requisitos conferidos, versão, porta, pasta de dados,
  locale, prints do `SELECT version();` e da conexão no pgAdmin, e um problema encontrado com a
  solução.
- **Ligação com a UC:** o ambiente instalado é usado em todas as aulas de construção (12 a 20).

## Verificação da aprendizagem
- Citar os componentes instalados e a função de cada um.
- Explicar por que a senha do `postgres` não pode ficar no código do sistema.
- Dizer dois comandos que confirmam que a instalação funcionou.
- Diagnosticar: "connection refused" na porta 5432.

## Recursos
Laboratório de informática, computador com acesso à internet, sistemas operacionais, sistema de
gerenciamento de banco de dados (PostgreSQL, psql e pgAdmin), manuais técnicos do PostgreSQL, kit
multimídia e slides `../AULAS/AULA-03-SLIDES.pdf` (apresentação, quando o professor publicar).
