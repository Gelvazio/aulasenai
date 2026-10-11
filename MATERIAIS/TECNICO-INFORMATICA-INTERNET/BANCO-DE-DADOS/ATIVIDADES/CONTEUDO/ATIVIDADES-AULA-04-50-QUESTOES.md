# Atividade: Configuração do SGBD e Infraestrutura do Sistema — 50 Questões

- **Aula:** 04
- **Tema:** Configuração do SGBD e Infraestrutura do Sistema
- **Ícone:** 🛠️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Configurar gerenciadores de bancos de dados e correlacionar suas características com a infraestrutura do sistema: postgresql.conf e pg_hba.conf, parâmetros listen_addresses, port, max_connections, shared_buffers e timezone, métodos de autenticação, banco e usuário da aplicação, string de conexão e variáveis de ambiente, arquitetura front-end, back-end e servidor de banco, firewall, reload e restart.
- **Conteúdo-base:** ../CONTEUDO/AULA-04-CONFIGURACAO-DO-SGBD-E-INFRAESTRUTURA.md
- **Slides:** ../AULAS/AULA-04-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-04-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Arquivo postgresql.conf

- **Capacidade:** C11

**Comando:**  
O que o arquivo postgresql.conf controla?

**Alternativas:**
- A) O conteúdo das tabelas do sistema.
- B) Como o servidor funciona: endereços, porta, conexões, memória, fuso horário e registros.
- C) Quais usuários podem entrar e de onde.
- D) As telas do front-end.

**Gabarito:** B

---

## ITEM 02 — Arquivo pg_hba.conf

- **Capacidade:** C11

**Comando:**  
O que o arquivo pg_hba.conf controla?

**Alternativas:**
- A) Quem pode conectar, de onde, a qual banco e com qual método de autenticação.
- B) O fuso horário das datas.
- C) O nome das colunas das tabelas.
- D) A quantidade de memória do servidor.

**Gabarito:** A

---

## ITEM 03 — Localizar a Configuração

- **Capacidade:** C11

**Comando:**  
Qual comando mostra onde está o arquivo postgresql.conf em uso?

**Alternativas:**
- A) SHOW config_file;
- B) SHOW tables;
- C) SELECT * FROM postgresql.conf;
- D) DROP config_file;

**Gabarito:** A

---

## ITEM 04 — Localizar o pg_hba.conf

- **Capacidade:** C11

**Comando:**  
Qual comando mostra onde está o arquivo pg_hba.conf em uso?

**Alternativas:**
- A) CREATE hba_file;
- B) SHOW users;
- C) SELECT hba FROM pg_admin;
- D) SHOW hba_file;

**Gabarito:** D

---

## ITEM 05 — listen_addresses

- **Capacidade:** C11

**Comando:**  
Para que serve o parâmetro listen_addresses?

**Alternativas:**
- A) Definir a senha do superusuário.
- B) Definir o idioma das mensagens.
- C) Listar os bancos de dados.
- D) Definir em quais endereços de rede o servidor aceita conexões.

**Gabarito:** D

---

## ITEM 06 — listen_addresses = 'localhost'

- **Capacidade:** C11

**Comando:**  
Com listen_addresses = 'localhost', quem consegue conectar ao servidor?

**Alternativas:**
- A) Ninguém, nem a própria máquina.
- B) Somente o pgAdmin de outra cidade.
- C) Apenas programas na própria máquina do servidor.
- D) Qualquer computador da internet.

**Gabarito:** C

---

## ITEM 07 — Parâmetro port

- **Capacidade:** C11

**Comando:**  
O parâmetro port do postgresql.conf define:

**Alternativas:**
- A) A porta em que o servidor escuta as conexões.
- B) A versão do PostgreSQL.
- C) O número de tabelas permitido.
- D) A quantidade de discos.

**Gabarito:** A

---

## ITEM 08 — max_connections

- **Capacidade:** C11

**Comando:**  
O parâmetro max_connections define:

**Alternativas:**
- A) O número máximo de linhas de uma tabela.
- B) O número de bancos de template.
- C) A velocidade da rede.
- D) O número máximo de conexões ao mesmo tempo no servidor.

**Gabarito:** D

---

## ITEM 09 — shared_buffers

- **Capacidade:** C11

**Comando:**  
O parâmetro shared_buffers está ligado a:

**Alternativas:**
- A) Cor do tema do pgAdmin.
- B) Memória reservada para guardar dados em cache e acelerar o acesso.
- C) Porta do firewall.
- D) Quantidade de usuários do sistema operacional.

**Gabarito:** B

---

## ITEM 10 — timezone

- **Capacidade:** C11

**Comando:**  
Por que ajustar o parâmetro timezone para 'America/Sao_Paulo' num sistema brasileiro?

**Alternativas:**
- A) Para aumentar o número de conexões.
- B) Para liberar a porta 5432.
- C) Para que datas e horas sejam gravadas e mostradas no fuso correto.
- D) Para que o banco aceite acentos.

**Gabarito:** C

---

## ITEM 11 — log_connections

- **Capacidade:** C11

**Comando:**  
Ligar log_connections ajuda em quê?

**Alternativas:**
- A) Trocar a senha a cada conexão.
- B) Apagar conexões antigas automaticamente.
- C) Registrar cada conexão no log, o que apoia a auditoria de acesso.
- D) Desligar o firewall.

**Gabarito:** C

---

## ITEM 12 — ALTER SYSTEM

- **Capacidade:** C11

**Comando:**  
O que faz ALTER SYSTEM SET timezone = 'America/Sao_Paulo';?

**Alternativas:**
- A) Apaga o fuso horário do sistema operacional.
- B) Troca a senha do usuário postgres.
- C) Cria uma tabela chamada timezone.
- D) Grava o novo valor do parâmetro na configuração do servidor.

**Gabarito:** D

---

## ITEM 13 — pg_reload_conf

- **Capacidade:** C11

**Comando:**  
O que faz SELECT pg_reload_conf();?

**Alternativas:**
- A) Reinstala o PostgreSQL.
- B) Desliga o servidor imediatamente.
- C) Recarrega a configuração e aplica parâmetros que não exigem reinício, sem derrubar conexões.
- D) Apaga todas as tabelas.

**Gabarito:** C

---

## ITEM 14 — Parâmetro que Exige Restart

- **Capacidade:** C11

**Comando:**  
Qual destes parâmetros só vale depois de reiniciar o serviço?

**Alternativas:**
- A) Nenhum parâmetro exige reinício.
- B) timezone.
- C) port.
- D) log_connections.

**Gabarito:** C

---

## ITEM 15 — Reload ou Restart

- **Capacidade:** C11

**Comando:**  
Qual é a diferença entre reload e restart do PostgreSQL?

**Alternativas:**
- A) O reload apaga os dados e o restart os recupera.
- B) O reload aplica mudanças simples sem derrubar conexões; o restart é necessário para porta, endereços e memória e derruba as conexões.
- C) O restart só funciona no Linux.
- D) Não há diferença entre os dois.

**Gabarito:** B

---

## ITEM 16 — Quando Fazer Restart

- **Capacidade:** C11

**Comando:**  
Quando deve ser feito o restart do servidor de banco em produção?

**Alternativas:**
- A) A cada consulta executada.
- B) Fora do horário de uso, porque derruba as conexões abertas.
- C) No horário de maior movimento, para testar.
- D) Nunca, mesmo ao mudar a porta.

**Gabarito:** B

---

## ITEM 17 — Linha do pg_hba.conf

- **Capacidade:** C11

**Comando:**  
Na linha "host escola_db app_escola 10.0.0.20/32 scram-sha-256", o que significa 10.0.0.20/32?

**Alternativas:**
- A) O tamanho máximo do banco.
- B) A porta do servidor.
- C) O endereço de onde a conexão é permitida, no caso apenas o servidor 10.0.0.20.
- D) A senha do usuário.

**Gabarito:** C

---

## ITEM 18 — Método scram-sha-256

- **Capacidade:** C11

**Comando:**  
O método de autenticação scram-sha-256 no pg_hba.conf:

**Alternativas:**
- A) Bloqueia todos os usuários.
- B) Só funciona sem rede.
- C) Exige senha protegida e é o método recomendado.
- D) Deixa entrar sem senha.

**Gabarito:** C

---

## ITEM 19 — Método trust

- **Capacidade:** C11

**Comando:**  
Por que o método trust não deve ser usado num servidor real?

**Alternativas:**
- A) Porque deixa entrar sem senha quem combinar com a linha.
- B) Porque não funciona com UTF8.
- C) Porque apaga o banco ao conectar.
- D) Porque é lento demais.

**Gabarito:** A

---

## ITEM 20 — Ordem das Linhas

- **Capacidade:** C11

**Comando:**  
Sobre a ordem das linhas do pg_hba.conf, é correto afirmar:

**Alternativas:**
- A) A ordem das linhas não faz diferença.
- B) Todas as linhas são aplicadas ao mesmo tempo.
- C) Vale sempre a última linha do arquivo.
- D) Vale a primeira linha que combinar com a conexão.

**Gabarito:** D

---

## ITEM 21 — Depois de Alterar o pg_hba.conf

- **Capacidade:** C11

**Comando:**  
Depois de alterar o pg_hba.conf, o que é preciso fazer?

**Alternativas:**
- A) Recarregar a configuração, por exemplo com SELECT pg_reload_conf();
- B) Criar um novo superusuário.
- C) Apagar a pasta de dados.
- D) Reinstalar o PostgreSQL.

**Gabarito:** A

---

## ITEM 22 — Erro no pg_hba.conf

- **Capacidade:** C11

**Comando:**  
Um estagiário tenta conectar do próprio notebook e recebe "no pg_hba.conf entry". O que isso indica?

**Alternativas:**
- A) Que a codificação está errada.
- B) Que não há linha no pg_hba.conf permitindo aquele usuário, banco e endereço.
- C) Que o banco foi apagado.
- D) Que o disco está cheio.

**Gabarito:** B

---

## ITEM 23 — Criar o Banco

- **Capacidade:** C11

**Comando:**  
Qual comando cria o banco escola_db com codificação UTF8?

**Alternativas:**
- A) NEW DATABASE escola_db;
- B) INSERT DATABASE escola_db;
- C) CREATE DATABASE escola_db ENCODING 'UTF8';
- D) CREATE TABLE escola_db;

**Gabarito:** C

---

## ITEM 24 — Criar o Usuário da Aplicação

- **Capacidade:** C11

**Comando:**  
Qual comando cria o usuário app_escola com permissão de login e senha?

**Alternativas:**
- A) SELECT app_escola FROM usuarios;
- B) CREATE ROLE app_escola LOGIN PASSWORD 'senha-forte';
- C) DROP ROLE app_escola;
- D) CREATE TABLE app_escola;

**Gabarito:** B

---

## ITEM 25 — GRANT CONNECT

- **Capacidade:** C11

**Comando:**  
O que faz GRANT CONNECT ON DATABASE escola_db TO app_escola;?

**Alternativas:**
- A) Dá ao app_escola todos os poderes de superusuário.
- B) Permite que o usuário app_escola se conecte ao banco escola_db.
- C) Apaga o banco escola_db.
- D) Cria uma tabela de conexões.

**Gabarito:** B

---

## ITEM 26 — Por Que um Usuário Próprio

- **Capacidade:** C11

**Comando:**  
Por que a aplicação deve usar um usuário próprio, como app_escola, em vez do postgres?

**Alternativas:**
- A) Porque assim ela tem só as permissões necessárias e um invasor não ganha poder total sobre o servidor.
- B) Porque o postgres não consegue ler tabelas.
- C) Porque o postgres só funciona no Linux.
- D) Porque o usuário próprio dispensa senha.

**Gabarito:** A

---

## ITEM 27 — Testar o Usuário Novo

- **Capacidade:** C11

**Comando:**  
Qual comando testa a conexão com o novo usuário no banco escola_db?

**Alternativas:**
- A) CREATE ROLE teste;
- B) psql --apagar app_escola
- C) psql -U app_escola -h localhost -d escola_db
- D) systemctl delete escola_db

**Gabarito:** C

---

## ITEM 28 — String de Conexão

- **Capacidade:** C5

**Comando:**  
Na string postgresql://app_escola:SENHA@10.0.0.30:5432/escola_db, o que é 10.0.0.30?

**Alternativas:**
- A) O endereço do servidor de banco.
- B) O nome do banco.
- C) O usuário da aplicação.
- D) A versão do PostgreSQL.

**Gabarito:** A

---

## ITEM 29 — Partes da String

- **Capacidade:** C5

**Comando:**  
Na mesma string de conexão, o que indicam 5432 e escola_db?

**Alternativas:**
- A) A porta do servidor e o nome do banco.
- B) O número de tabelas e o nome do usuário.
- C) O máximo de conexões e a codificação.
- D) A senha e o fuso horário.

**Gabarito:** A

---

## ITEM 30 — Variável de Ambiente

- **Capacidade:** C5

**Comando:**  
Onde deve ficar a senha usada pelo back-end para conectar ao banco?

**Alternativas:**
- A) Escrita diretamente no código-fonte.
- B) Num comentário do README.
- C) No arquivo HTML da página de login.
- D) Numa variável de ambiente configurada no servidor, como DATABASE_URL, fora do código.

**Gabarito:** D

---

## ITEM 31 — Arquivo .env

- **Capacidade:** C5

**Comando:**  
O arquivo .env com a string de conexão deve:

**Alternativas:**
- A) Ser colado no chat da turma.
- B) Ser publicado no site junto com as páginas.
- C) Ser enviado por e-mail para todos os alunos.
- D) Ficar fora do repositório, sem ser enviado ao Git.

**Gabarito:** D

---

## ITEM 32 — Caminho da Requisição

- **Capacidade:** C5

**Comando:**  
Na infraestrutura da aula, qual é o caminho de uma requisição?

**Alternativas:**
- A) Navegador para o back-end, e o back-end para o servidor de banco pela rede interna.
- B) Back-end para o navegador, que grava no disco do servidor.
- C) Navegador direto para o banco, sem back-end.
- D) Banco para o navegador, sem passar pela rede.

**Gabarito:** A

---

## ITEM 33 — Banco em Rede Interna

- **Capacidade:** C5

**Comando:**  
Por que o servidor de banco deve ficar numa rede interna?

**Alternativas:**
- A) Para dispensar o backup.
- B) Para que só o back-end e os administradores consigam alcançá-lo, protegendo os dados.
- C) Para que o banco funcione sem energia.
- D) Para que o banco aceite mais acentos.

**Gabarito:** B

---

## ITEM 34 — Firewall do Banco

- **Capacidade:** C5

**Comando:**  
Qual regra de firewall é adequada para o servidor de banco da escola?

**Alternativas:**
- A) Bloquear também o back-end.
- B) Liberar a porta 5432 apenas para o servidor do back-end.
- C) Liberar a porta 5432 para toda a internet.
- D) Desligar o firewall para facilitar.

**Gabarito:** B

---

## ITEM 35 — Muitos Acessos

- **Capacidade:** C5

**Comando:**  
O sistema terá muitos acessos simultâneos. Qual decisão de infraestrutura ajuda?

**Alternativas:**
- A) Usar o método trust para ganhar velocidade.
- B) Desligar o log do servidor.
- C) Ajustar max_connections e usar um pool de conexões no back-end.
- D) Diminuir max_connections para 1.

**Gabarito:** C

---

## ITEM 36 — Pool de Conexões

- **Capacidade:** C5

**Comando:**  
O que faz um pool de conexões no back-end?

**Alternativas:**
- A) Apaga as conexões antigas do banco.
- B) Guarda as senhas dos usuários no navegador.
- C) Cria um banco novo para cada usuário.
- D) Reaproveita um conjunto de conexões abertas com o banco, em vez de abrir uma nova a cada pedido.

**Gabarito:** D

---

## ITEM 37 — Disponibilidade

- **Capacidade:** C5

**Comando:**  
Para que o sistema esteja sempre disponível e recuperável, qual decisão de infraestrutura é adequada?

**Alternativas:**
- A) Backup automático em outro disco e monitoramento do servidor.
- B) Não fazer backup para economizar espaço.
- C) Desligar o servidor à noite sem aviso.
- D) Guardar o único backup no mesmo disco do banco.

**Gabarito:** A

---

## ITEM 38 — Desempenho e Infraestrutura

- **Capacidade:** C5

**Comando:**  
Qual decisão de infraestrutura melhora o desempenho do banco?

**Alternativas:**
- A) Memória suficiente para o shared_buffers e disco rápido.
- B) Senha mais curta.
- C) Tela maior no servidor.
- D) Teclado sem fio no servidor.

**Gabarito:** A

---

## ITEM 39 — Datas Erradas

- **Capacidade:** C5

**Comando:**  
As matrículas aparecem com três horas de diferença. O que conferir primeiro?

**Alternativas:**
- A) Se o timezone do banco é o mesmo da aplicação.
- B) Se a porta é 5432.
- C) Se o pgAdmin está atualizado.
- D) Se o método é scram-sha-256.

**Gabarito:** A

---

## ITEM 40 — Correlação Característica e Infraestrutura

- **Capacidade:** C5

**Comando:**  
Correlacionar características do banco com a infraestrutura significa:

**Alternativas:**
- A) Escolher configurações e recursos de servidor e rede de acordo com o que o sistema precisa.
- B) Usar a mesma senha em todos os servidores.
- C) Desligar recursos de segurança para ganhar tempo.
- D) Instalar o banco no mesmo computador do aluno.

**Gabarito:** A

---

## ITEM 41 — Escola: Endereços

- **Capacidade:** C5

**Comando:**  
Na escola de cursos livres, o back-end está em 10.0.0.20 e o banco em 10.0.0.30. Qual configuração do pg_hba.conf é coerente?

**Alternativas:**
- A) Não ter nenhuma linha para o back-end.
- B) Liberar só o notebook do estagiário.
- C) Liberar todos os usuários de qualquer endereço com trust.
- D) Liberar o usuário app_escola no banco escola_db apenas a partir de 10.0.0.20.

**Gabarito:** D

---

## ITEM 42 — Escola: listen_addresses

- **Capacidade:** C11

**Comando:**  
Para que o banco da escola aceite conexões do back-end pela rede, qual configuração é coerente?

**Alternativas:**
- A) listen_addresses com o endereço do navegador do aluno.
- B) listen_addresses = 'localhost' apenas.
- C) Apagar o parâmetro listen_addresses.
- D) listen_addresses = '10.0.0.30', o endereço do servidor de banco na rede interna.

**Gabarito:** D

---

## ITEM 43 — Dados de Configuração

- **Capacidade:** C11

**Comando:**  
Qual comando mostra o valor atual de max_connections?

**Alternativas:**
- A) SET max_connections TO nada;
- B) SHOW max_connections;
- C) DROP max_connections;
- D) SELECT max_connections FROM alunos;

**Gabarito:** B

---

## ITEM 44 — Pasta da Configuração no Linux

- **Capacidade:** C11

**Comando:**  
No Linux (Debian/Ubuntu), onde normalmente ficam os arquivos de configuração do PostgreSQL?

**Alternativas:**
- A) Na pasta do pgAdmin no Windows.
- B) Em /etc/postgresql/versão/main/.
- C) Em /home/aluno/Downloads/.
- D) Dentro do navegador.

**Gabarito:** B

---

## ITEM 45 — Ficha de Configuração

- **Capacidade:** C11

**Comando:**  
O que deve constar na ficha de configuração entregue na aula?

**Alternativas:**
- A) As notas da turma.
- B) O print da tela inicial do Windows.
- C) Parâmetros ajustados, linhas do pg_hba.conf, banco e usuário criados, string de conexão sem a senha real e desenho da infraestrutura.
- D) Somente a senha do postgres.

**Gabarito:** C

---

## ITEM 46 — Permissões nas Tabelas

- **Capacidade:** C11

**Comando:**  
Depois do GRANT CONNECT, o usuário app_escola já pode ler todas as tabelas?

**Alternativas:**
- A) Não, o usuário nunca poderá acessar tabelas.
- B) Sim, e também apaga tabelas.
- C) Sim, o CONNECT dá acesso total.
- D) Não; as permissões em cada tabela são dadas depois, com GRANT SELECT, INSERT e outras.

**Gabarito:** D

---

## ITEM 47 — Erro Típico de Infraestrutura

- **Capacidade:** C5

**Comando:**  
Qual situação é um erro de infraestrutura?

**Alternativas:**
- A) O back-end conectar ao banco pela rede interna.
- B) O banco ficar acessível pela internet com a porta aberta para qualquer endereço.
- C) O backup ficar em outro disco.
- D) A senha ficar numa variável de ambiente.

**Gabarito:** B

---

## ITEM 48 — Parâmetro de Memória

- **Capacidade:** C11

**Comando:**  
Em geral, qual é uma referência comum para o shared_buffers de um servidor dedicado?

**Alternativas:**
- A) Toda a memória RAM, sem sobrar nada.
- B) Zero, para não usar memória.
- C) Cerca de 25% da memória RAM do servidor.
- D) O mesmo valor da porta.

**Gabarito:** C

---

## ITEM 49 — Mudança Sem Derrubar

- **Capacidade:** C11

**Comando:**  
Qual mudança pode ser aplicada com reload, sem derrubar as conexões?

**Alternativas:**
- A) O aumento do shared_buffers.
- B) Uma nova linha no pg_hba.conf.
- C) A troca da porta de 5432 para 5433.
- D) A mudança de listen_addresses.

**Gabarito:** B

---

## ITEM 50 — Monte a Arquitetura

- **Capacidade:** C5

**Comando:**  
Na dinâmica "Monte a arquitetura", para a necessidade "só o back-end pode acessar o banco", qual peça é a resposta?

**Alternativas:**
- A) Um backup em pendrive.
- B) Uma senha no código do front-end.
- C) Um navegador conectado direto ao banco.
- D) Firewall liberando a porta 5432 apenas para o servidor do back-end, com a linha correspondente no pg_hba.conf.

**Gabarito:** D
