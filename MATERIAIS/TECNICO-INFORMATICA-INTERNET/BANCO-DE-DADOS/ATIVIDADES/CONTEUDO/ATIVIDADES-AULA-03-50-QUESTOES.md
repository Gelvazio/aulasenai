# Atividade: Preparação do Ambiente: Instalação do PostgreSQL — 50 Questões

- **Aula:** 03
- **Tema:** Preparação do Ambiente: Instalação do PostgreSQL
- **Ícone:** 💿
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Instalar e configurar gerenciadores de bancos de dados: checklist de requisitos, componentes do PostgreSQL (servidor, psql, pgAdmin, Stack Builder, pasta de dados), instalação no Windows e no Linux, senha do superusuário, porta, locale e codificação UTF8, serviço do PostgreSQL, conferência da instalação e solução de problemas comuns.
- **Conteúdo-base:** ../CONTEUDO/AULA-03-PREPARACAO-DO-AMBIENTE-INSTALACAO-DO-POSTGRESQL.md
- **Slides:** ../AULAS/AULA-03-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-03-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Checklist: Sistema de 64 Bits

- **Capacidade:** C10

**Comando:**  
Antes de instalar o PostgreSQL, por que conferir se o sistema operacional é de 64 bits?

**Alternativas:**
- A) Porque as versões atuais do PostgreSQL são feitas para sistemas de 64 bits suportados.
- B) Porque o PostgreSQL só funciona em celulares.
- C) Porque o sistema de 64 bits dispensa senha.
- D) Porque o número de bits define a porta do banco.

**Gabarito:** A

---

## ITEM 02 — Checklist: Porta Livre

- **Capacidade:** C10

**Comando:**  
Por que conferir se a porta 5432 está livre antes de instalar?

**Alternativas:**
- A) Porque a porta 5432 é a do navegador.
- B) Porque outro PostgreSQL já instalado pode estar usando a mesma porta.
- C) Porque a porta define a senha do superusuário.
- D) Porque sem porta livre o computador não liga.

**Gabarito:** B

---

## ITEM 03 — Checklist: Mesma Versão

- **Capacidade:** C10

**Comando:**  
Por que a equipe deve instalar a mesma versão principal do PostgreSQL em todas as máquinas?

**Alternativas:**
- A) Porque versões diferentes não guardam dados.
- B) Porque só existe uma versão do PostgreSQL.
- C) Para evitar diferenças de comportamento e de comandos entre os ambientes da equipe.
- D) Porque a versão define o nome das tabelas.

**Gabarito:** C

---

## ITEM 04 — Permissão de Administrador

- **Capacidade:** C10

**Comando:**  
Por que a instalação do PostgreSQL no Windows pede permissão de administrador?

**Alternativas:**
- A) Porque instala um serviço e grava arquivos em pastas do sistema.
- B) Porque o pgAdmin só abre como administrador do domínio.
- C) Porque o administrador é quem cria as tabelas.
- D) Porque sem ela a porta muda sozinha.

**Gabarito:** A

---

## ITEM 05 — Componente Server

- **Capacidade:** C10

**Comando:**  
O componente PostgreSQL Server é:

**Alternativas:**
- A) Um navegador de internet.
- B) O cliente gráfico de administração.
- C) O SGBD em si, que roda como serviço e guarda os dados.
- D) Um editor de planilhas.

**Gabarito:** C

---

## ITEM 06 — Componente psql

- **Capacidade:** C10

**Comando:**  
O que é o psql?

**Alternativas:**
- A) Um antivírus do servidor.
- B) A pasta onde ficam os dados.
- C) Um cliente de terminal para executar comandos SQL no PostgreSQL.
- D) Um cliente gráfico com janelas e menus.

**Gabarito:** C

---

## ITEM 07 — Componente pgAdmin

- **Capacidade:** C10

**Comando:**  
O que é o pgAdmin?

**Alternativas:**
- A) O serviço que guarda os dados.
- B) Uma extensão obrigatória do navegador.
- C) Um compilador de linguagem C.
- D) Um cliente gráfico para administrar e consultar o PostgreSQL.

**Gabarito:** D

---

## ITEM 08 — Stack Builder

- **Capacidade:** C10

**Comando:**  
O Stack Builder serve para:

**Alternativas:**
- A) Definir a senha do superusuário.
- B) Iniciar o serviço a cada consulta.
- C) Criar as tabelas automaticamente.
- D) Instalar extensões e ferramentas extras, sendo opcional.

**Gabarito:** D

---

## ITEM 09 — Pasta de Dados

- **Capacidade:** C10

**Comando:**  
A pasta de dados (data directory) do PostgreSQL guarda:

**Alternativas:**
- A) Os arquivos do banco, ligados ao nível físico.
- B) As senhas dos usuários do Windows.
- C) As telas do sistema web.
- D) Somente o instalador baixado.

**Gabarito:** A

---

## ITEM 10 — Onde Baixar o Instalador

- **Capacidade:** C10

**Comando:**  
De onde o instalador do PostgreSQL deve ser baixado?

**Alternativas:**
- A) Do site oficial do PostgreSQL.
- B) De qualquer site que aparecer primeiro na busca.
- C) De um anexo de e-mail desconhecido.
- D) De um pendrive encontrado no laboratório.

**Gabarito:** A

---

## ITEM 11 — Senha do Superusuário

- **Capacidade:** C10

**Comando:**  
Como deve ser a senha do superusuário postgres?

**Alternativas:**
- A) Igual a "postgres", para não esquecer.
- B) Publicada no README do projeto.
- C) Forte e guardada em local seguro, nunca no código do sistema nem em arquivo público.
- D) Escrita num comentário do código-fonte.

**Gabarito:** C

---

## ITEM 12 — Superusuário na Aplicação

- **Capacidade:** C11

**Comando:**  
O sistema web deve se conectar ao banco com o superusuário postgres?

**Alternativas:**
- A) Sim, desde que a senha fique no navegador.
- B) Sim, porque é o único usuário que existe.
- C) Sim, porque é mais rápido.
- D) Não; a aplicação usa um usuário próprio com só as permissões necessárias.

**Gabarito:** D

---

## ITEM 13 — Locale

- **Capacidade:** C11

**Comando:**  
O que é escolhido na opção locale durante a instalação?

**Alternativas:**
- A) A porta do servidor.
- B) O idioma e a região, que influenciam ordenação de textos e formatos.
- C) O número de tabelas do banco.
- D) O antivírus usado.

**Gabarito:** B

---

## ITEM 14 — Codificação UTF8

- **Capacidade:** C11

**Comando:**  
Por que usar a codificação UTF8?

**Alternativas:**
- A) Para trocar a porta para 3306.
- B) Para deixar o banco sem senha.
- C) Para impedir backups.
- D) Para guardar corretamente acentos e caracteres especiais.

**Gabarito:** D

---

## ITEM 15 — Componentes Necessários

- **Capacidade:** C10

**Comando:**  
Na instalação no Windows, quais componentes são marcados para esta UC?

**Alternativas:**
- A) Server, pgAdmin e Command Line Tools, sendo o Stack Builder opcional.
- B) Nenhum componente, pois tudo vem na nuvem.
- C) Somente o pgAdmin, sem o servidor.
- D) Apenas o Stack Builder.

**Gabarito:** A

---

## ITEM 16 — Instalação no Linux

- **Capacidade:** C10

**Comando:**  
Qual comando instala o PostgreSQL em distribuições baseadas em Debian, como o Ubuntu?

**Alternativas:**
- A) pip install servidor-banco
- B) sudo apt install postgresql postgresql-contrib
- C) npm install postgresql
- D) sudo apt install pgadmin-windows

**Gabarito:** B

---

## ITEM 17 — Status do Serviço no Linux

- **Capacidade:** C11

**Comando:**  
Qual comando mostra se o serviço do PostgreSQL está ativo no Linux?

**Alternativas:**
- A) sudo systemctl status postgresql
- B) ls postgresql
- C) sudo systemctl delete postgresql
- D) psql --apagar

**Gabarito:** A

---

## ITEM 18 — Entrar como postgres no Linux

- **Capacidade:** C11

**Comando:**  
No Linux, como se entra no psql como o usuário postgres logo após instalar?

**Alternativas:**
- A) sudo -u postgres psql
- B) sudo rm postgres
- C) postgres --navegador
- D) psql --sem-senha-root

**Gabarito:** A

---

## ITEM 19 — Versão do Cliente

- **Capacidade:** C10

**Comando:**  
Qual comando, no terminal, mostra a versão do cliente psql instalado?

**Alternativas:**
- A) systemctl version-banco
- B) psql --version
- C) psql --apagar-tudo
- D) SELECT nome FROM versao;

**Gabarito:** B

---

## ITEM 20 — Conectando pelo psql

- **Capacidade:** C11

**Comando:**  
O comando psql -U postgres -h localhost -p 5432 faz o quê?

**Alternativas:**
- A) Apaga o usuário postgres.
- B) Cria um banco chamado localhost.
- C) Conecta ao servidor local, na porta 5432, com o usuário postgres.
- D) Instala o PostgreSQL na porta 5432.

**Gabarito:** C

---

## ITEM 21 — SELECT version()

- **Capacidade:** C11

**Comando:**  
O que mostra o comando SELECT version(); dentro do psql?

**Alternativas:**
- A) O espaço livre no disco.
- B) A versão do servidor PostgreSQL ao qual você está conectado.
- C) A senha do superusuário.
- D) A lista de usuários do Windows.

**Gabarito:** B

---

## ITEM 22 — Comando \l

- **Capacidade:** C11

**Comando:**  
No psql, o comando \l serve para:

**Alternativas:**
- A) Limpar todas as tabelas.
- B) Listar os bancos de dados do servidor.
- C) Desligar o servidor.
- D) Trocar a senha.

**Gabarito:** B

---

## ITEM 23 — Comando \conninfo

- **Capacidade:** C11

**Comando:**  
No psql, o comando \conninfo mostra:

**Alternativas:**
- A) Os erros do instalador.
- B) O usuário, o banco, o servidor e a porta da conexão atual.
- C) A lista de serviços do Windows.
- D) O conteúdo de todas as tabelas.

**Gabarito:** B

---

## ITEM 24 — Comando \q

- **Capacidade:** C11

**Comando:**  
Qual comando sai do psql?

**Alternativas:**
- A) \l
- B) \conninfo
- C) SELECT sair;
- D) \q

**Gabarito:** D

---

## ITEM 25 — Registrando no pgAdmin

- **Capacidade:** C11

**Comando:**  
Para conectar o pgAdmin ao servidor local, o que se informa ao registrar o servidor?

**Alternativas:**
- A) A versão do Windows e o número de série.
- B) Somente o nome do computador do professor.
- C) Host localhost, porta 5432, usuário postgres e a senha.
- D) O endereço do site da escola.

**Gabarito:** C

---

## ITEM 26 — Bancos Iniciais

- **Capacidade:** C11

**Comando:**  
Quais bancos aparecem logo após uma instalação nova do PostgreSQL?

**Alternativas:**
- A) postgres, template0 e template1.
- B) loja, escola e clinica.
- C) master, model e msdb.
- D) Nenhum banco aparece.

**Gabarito:** A

---

## ITEM 27 — O Que É um Serviço

- **Capacidade:** C11

**Comando:**  
O servidor PostgreSQL roda como serviço. Isso significa que:

**Alternativas:**
- A) Ele só funciona com o pgAdmin aberto.
- B) Ele roda apenas dentro do navegador.
- C) Ele fica em segundo plano esperando conexões, mesmo sem janela aberta.
- D) Ele precisa ser reinstalado a cada uso.

**Gabarito:** C

---

## ITEM 28 — Serviço Parado

- **Capacidade:** C11

**Comando:**  
Se o serviço do PostgreSQL estiver parado, o que acontece?

**Alternativas:**
- A) O banco continua aceitando conexões normalmente.
- B) A porta muda para 3306.
- C) Nenhum sistema ou cliente consegue conectar ao banco.
- D) Os dados são apagados.

**Gabarito:** C

---

## ITEM 29 — Iniciar o Serviço no Windows

- **Capacidade:** C11

**Comando:**  
No Windows, onde se inicia o serviço do PostgreSQL parado?

**Alternativas:**
- A) No navegador, digitando a senha.
- B) No Painel de Controle de impressoras.
- C) No aplicativo Serviços, no item postgresql-x64 da versão instalada.
- D) No Bloco de Notas.

**Gabarito:** C

---

## ITEM 30 — Iniciar com o Sistema no Linux

- **Capacidade:** C11

**Comando:**  
Qual comando faz o PostgreSQL iniciar junto com o sistema no Linux?

**Alternativas:**
- A) psql --boot
- B) sudo systemctl enable postgresql
- C) sudo apt remove postgresql
- D) sudo systemctl disable postgresql

**Gabarito:** B

---

## ITEM 31 — Connection Refused

- **Capacidade:** C11

**Comando:**  
O erro "connection refused" ao conectar na porta 5432 indica, provavelmente:

**Alternativas:**
- A) Senha forte demais.
- B) Codificação UTF8 ativada.
- C) Serviço parado ou porta errada.
- D) Tabela sem chave primária.

**Gabarito:** C

---

## ITEM 32 — Password Authentication Failed

- **Capacidade:** C11

**Comando:**  
O erro "password authentication failed" indica:

**Alternativas:**
- A) Disco cheio.
- B) Senha errada para o usuário informado.
- C) Porta em uso por outro programa.
- D) Serviço do banco parado.

**Gabarito:** B

---

## ITEM 33 — Porta em Uso na Instalação

- **Capacidade:** C10

**Comando:**  
O instalador avisa que a porta 5432 está em uso. Qual solução é adequada?

**Alternativas:**
- A) Desligar o firewall de todos os computadores da escola.
- B) Instalar mesmo assim sobre a porta ocupada.
- C) Trocar a codificação para LATIN1.
- D) Usar outra porta livre ou remover a instalação antiga que ocupa a 5432.

**Gabarito:** D

---

## ITEM 34 — psql Não Reconhecido

- **Capacidade:** C10

**Comando:**  
No Windows, o terminal diz que psql não é reconhecido como comando. Qual é a causa provável?

**Alternativas:**
- A) A porta 5432 está livre.
- B) A pasta bin do PostgreSQL não está no PATH.
- C) A senha do postgres está errada.
- D) O banco não tem tabelas.

**Gabarito:** B

---

## ITEM 35 — Acentos Errados

- **Capacidade:** C11

**Comando:**  
Os nomes com acento aparecem com símbolos estranhos no banco. O que conferir?

**Alternativas:**
- A) A porta do servidor.
- B) A codificação do banco, que deve ser UTF8.
- C) O número de bancos de template.
- D) A versão do navegador.

**Gabarito:** B

---

## ITEM 36 — Roteiro de Instalação

- **Capacidade:** C10

**Comando:**  
O que deve ser registrado no roteiro de instalação?

**Alternativas:**
- A) As notas dos alunos.
- B) Versão, porta, pasta de dados, locale, data e quem instalou.
- C) Apenas o nome do computador.
- D) A senha do postgres em texto aberto.

**Gabarito:** B

---

## ITEM 37 — Menos Componentes

- **Capacidade:** C10

**Comando:**  
Por que a boa prática é instalar só os componentes necessários?

**Alternativas:**
- A) Porque o pgAdmin é proibido.
- B) Porque menos componentes significam menos riscos e menos coisas para manter.
- C) Porque componentes extras apagam o banco.
- D) Porque o instalador não permite escolher.

**Gabarito:** B

---

## ITEM 38 — Ordem da Preparação

- **Capacidade:** C10

**Comando:**  
Qual é a ordem correta da preparação do ambiente?

**Alternativas:**
- A) Criar as tabelas, instalar e depois conferir os requisitos.
- B) Testar a conexão antes de instalar.
- C) Instalar sem conferir nada e criar o banco no navegador.
- D) Conferir os requisitos, instalar, conferir o serviço e testar a conexão.

**Gabarito:** D

---

## ITEM 39 — Psql ou pgAdmin

- **Capacidade:** C10

**Comando:**  
Qual é a diferença entre o psql e o pgAdmin?

**Alternativas:**
- A) O psql é um cliente de terminal e o pgAdmin é um cliente gráfico; os dois conectam ao mesmo servidor.
- B) O pgAdmin só funciona sem servidor.
- C) O psql guarda os dados e o pgAdmin é o servidor.
- D) Não há diferença, são o mesmo programa.

**Gabarito:** A

---

## ITEM 40 — Escola de Cursos Livres

- **Capacidade:** C11

**Comando:**  
Na escola de cursos livres, uma máquina mostrou "connection refused" logo no primeiro teste. Qual foi a causa encontrada na aula?

**Alternativas:**
- A) A tabela de alunos não existia.
- B) O monitor estava desligado.
- C) O aluno digitou o e-mail errado no sistema.
- D) O serviço do PostgreSQL estava parado.

**Gabarito:** D

---

## ITEM 41 — Ambiente Igual na Equipe

- **Capacidade:** C10

**Comando:**  
Por que todos os desenvolvedores da escola instalaram o PostgreSQL com a mesma versão, UTF8 e porta 5432?

**Alternativas:**
- A) Porque é proibido mudar a porta.
- B) Para que só um computador funcione.
- C) Para economizar energia elétrica.
- D) Para que o banco se comporte igual em todas as máquinas e os scripts funcionem para todos.

**Gabarito:** D

---

## ITEM 42 — Pane: Porta Ocupada

- **Capacidade:** C10

**Comando:**  
Na dinâmica "Pane no laboratório", o cartão diz: "instalador avisa porta 5432 em uso". Qual é a causa provável?

**Alternativas:**
- A) Já existe outro PostgreSQL instalado usando a porta.
- B) A codificação é UTF8.
- C) O pgAdmin está em inglês.
- D) O cabo de rede está desconectado.

**Gabarito:** A

---

## ITEM 43 — Pane: Serviço

- **Capacidade:** C11

**Comando:**  
Na dinâmica, o cartão diz: "pgAdmin não conecta e o serviço aparece como parado". Qual é a solução?

**Alternativas:**
- A) Iniciar o serviço do PostgreSQL e tentar conectar de novo.
- B) Apagar a pasta de dados.
- C) Trocar a senha do Wi-Fi.
- D) Reinstalar o Windows.

**Gabarito:** A

---

## ITEM 44 — Firewall

- **Capacidade:** C11

**Comando:**  
Quando o banco está em outro servidor da rede, o que deve ser conferido além do serviço?

**Alternativas:**
- A) Se o firewall libera a porta do banco para o servidor da aplicação.
- B) Se o firewall libera a porta para qualquer computador da internet.
- C) Se o monitor do servidor está ligado.
- D) Se o navegador está atualizado.

**Gabarito:** A

---

## ITEM 45 — Senha em Local Seguro

- **Capacidade:** C11

**Comando:**  
Qual opção é um local adequado para guardar a senha do superusuário?

**Alternativas:**
- A) O código-fonte do front-end.
- B) Um grupo aberto de mensagens.
- C) Um gerenciador de senhas ou cofre da equipe com acesso restrito.
- D) Um bilhete colado no monitor.

**Gabarito:** C

---

## ITEM 46 — Pasta de Dados e Backup

- **Capacidade:** C10

**Comando:**  
Por que a localização da pasta de dados é registrada no roteiro?

**Alternativas:**
- A) Porque ela define a senha do banco.
- B) Porque o navegador abre os dados por ela.
- C) Porque é lá que fica o pgAdmin.
- D) Porque ela indica onde estão os arquivos do banco, importantes para backup e para o espaço em disco.

**Gabarito:** D

---

## ITEM 47 — Primeiro Uso do Ambiente

- **Capacidade:** C10

**Comando:**  
O ambiente instalado nesta aula será usado principalmente em quais aulas?

**Alternativas:**
- A) Somente na aula 1.
- B) Apenas na entrega da apostila.
- C) Em nenhuma aula, pois a UC é só teórica.
- D) Nas aulas de construção do banco, com DDL, DML, procedimentos e triggers.

**Gabarito:** D

---

## ITEM 48 — Codificação na Criação do Banco

- **Capacidade:** C11

**Comando:**  
Ao criar bancos para sistemas web brasileiros, qual codificação é recomendada?

**Alternativas:**
- A) Código Morse.
- B) Binária pura.
- C) ASCII sem acentos.
- D) UTF8.

**Gabarito:** D

---

## ITEM 49 — Instalação Concluída

- **Capacidade:** C11

**Comando:**  
Qual situação mostra que a instalação está pronta para uso?

**Alternativas:**
- A) O serviço está ativo, o SELECT version() responde e o pgAdmin mostra os bancos iniciais.
- B) O instalador foi baixado, mas não executado.
- C) O psql não é reconhecido no terminal.
- D) O serviço aparece como parado.

**Gabarito:** A

---

## ITEM 50 — Erro Comum de Segurança

- **Capacidade:** C11

**Comando:**  
Durante a instalação, qual decisão é um erro de segurança?

**Alternativas:**
- A) Instalar apenas os componentes necessários.
- B) Baixar o instalador do site oficial.
- C) Definir a senha do postgres como "123" e anotá-la no código do sistema.
- D) Guardar a senha num cofre de senhas da equipe.

**Gabarito:** C
