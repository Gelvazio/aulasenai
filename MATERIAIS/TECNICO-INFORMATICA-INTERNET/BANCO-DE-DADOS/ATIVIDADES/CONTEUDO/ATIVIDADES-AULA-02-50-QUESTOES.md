# Atividade: Gerenciadores: Características, Requisitos e Níveis — 50 Questões

- **Aula:** 02
- **Tema:** Gerenciadores: Características, Requisitos e Níveis
- **Ícone:** ⚙️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer as características e funcionalidades do banco de dados, os diferentes níveis de gerenciamento de dados e os diferentes gerenciadores: modelo de dados, licença, transações ACID, desempenho, escalabilidade, segurança, ferramentas, requisitos de instalação (sistema operacional, hardware, rede e portas), níveis externo, conceitual e físico, independência de dados, papéis (usuário, desenvolvedor e DBA) e escolha justificada do gerenciador.
- **Conteúdo-base:** ../CONTEUDO/AULA-02-GERENCIADORES-CARACTERISTICAS-REQUISITOS-E-NIVEIS.md
- **Slides:** ../AULAS/AULA-02-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-02-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Característica Modelo de Dados

- **Capacidade:** C4

**Comando:**  
A característica "modelo de dados" de um gerenciador responde a qual pergunta?

**Alternativas:**
- A) Quem é o administrador do banco.
- B) Como os dados são organizados, por exemplo em tabelas ou em documentos.
- C) Quanto custa a licença do gerenciador.
- D) Qual porta de rede o servidor usa.

**Gabarito:** B

---

## ITEM 02 — Licença Livre

- **Capacidade:** C9

**Comando:**  
Qual destes gerenciadores é livre e de código aberto?

**Alternativas:**
- A) Nenhum gerenciador é livre.
- B) PostgreSQL.
- C) SQL Server Enterprise.
- D) Oracle Database Enterprise.

**Gabarito:** B

---

## ITEM 03 — Licença Comercial

- **Capacidade:** C9

**Comando:**  
Qual gerenciador é tipicamente comercial, usado por grandes empresas, bancos e governo?

**Alternativas:**
- A) MariaDB.
- B) SQLite.
- C) Oracle.
- D) PostgreSQL.

**Gabarito:** C

---

## ITEM 04 — O Que É Transação

- **Capacidade:** C4

**Comando:**  
O que é uma transação num banco de dados?

**Alternativas:**
- A) Um conjunto de comandos que deve acontecer inteiro ou nada.
- B) Uma tabela com dados financeiros.
- C) Uma conexão entre dois computadores.
- D) Um backup feito toda noite.

**Gabarito:** A

---

## ITEM 05 — Atomicidade

- **Capacidade:** C4

**Comando:**  
Na sigla ACID, a Atomicidade garante que:

**Alternativas:**
- A) Duas transações simultâneas não se atrapalham.
- B) Ou todos os comandos da transação acontecem, ou nenhum acontece.
- C) O dado confirmado nunca se perde.
- D) O banco aceita qualquer valor nos campos.

**Gabarito:** B

---

## ITEM 06 — Consistência

- **Capacidade:** C4

**Comando:**  
Na sigla ACID, a Consistência garante que:

**Alternativas:**
- A) O banco fica disponível 24 horas.
- B) As transações rodam sempre em ordem alfabética.
- C) Os dados são copiados para outro servidor.
- D) O banco sai de um estado válido para outro estado válido, respeitando as regras.

**Gabarito:** D

---

## ITEM 07 — Isolamento

- **Capacidade:** C4

**Comando:**  
Na sigla ACID, o Isolamento garante que:

**Alternativas:**
- A) Transações executadas ao mesmo tempo não interferem umas nas outras.
- B) Apenas um usuário pode existir no banco.
- C) Cada tabela fica num disco separado.
- D) O banco fica desligado da internet.

**Gabarito:** A

---

## ITEM 08 — Durabilidade

- **Capacidade:** C4

**Comando:**  
Na sigla ACID, a Durabilidade garante que:

**Alternativas:**
- A) O banco dura no mínimo dez anos.
- B) Depois de confirmado, o dado não se perde, mesmo com queda de energia.
- C) As consultas são sempre rápidas.
- D) Os dados podem ser apagados por qualquer usuário.

**Gabarito:** B

---

## ITEM 09 — COMMIT

- **Capacidade:** C4

**Comando:**  
Num bloco de transação, o que faz o comando COMMIT?

**Alternativas:**
- A) Inicia o servidor do banco.
- B) Confirma todas as alterações da transação.
- C) Apaga a tabela.
- D) Desfaz todas as alterações da transação.

**Gabarito:** B

---

## ITEM 10 — ROLLBACK

- **Capacidade:** C4

**Comando:**  
O que acontece quando uma transação termina com ROLLBACK?

**Alternativas:**
- A) O banco é reinstalado.
- B) Todas as alterações feitas na transação são desfeitas.
- C) Uma nova tabela é criada.
- D) Todas as alterações são confirmadas.

**Gabarito:** B

---

## ITEM 11 — Pedido sem Pagamento

- **Capacidade:** C4

**Comando:**  
Numa loja, o pedido foi gravado, mas o pagamento falhou e o pedido continuou salvo. Que propriedade ACID foi desrespeitada?

**Alternativas:**
- A) Atomicidade.
- B) Nenhuma, isso é o correto.
- C) Durabilidade.
- D) Isolamento.

**Gabarito:** A

---

## ITEM 12 — Estoque Negativo

- **Capacidade:** C4

**Comando:**  
Uma regra diz que o estoque nunca pode ficar negativo, mas uma venda deixou o estoque em -1. Que propriedade ACID foi desrespeitada?

**Alternativas:**
- A) Escalabilidade.
- B) Atomicidade apenas no backup.
- C) Durabilidade.
- D) Consistência.

**Gabarito:** D

---

## ITEM 13 — Escalabilidade Vertical

- **Capacidade:** C4

**Comando:**  
O que é escalabilidade vertical?

**Alternativas:**
- A) Aumentar os recursos do mesmo servidor, como memória e processador.
- B) Diminuir o número de usuários.
- C) Acrescentar mais servidores para dividir o trabalho.
- D) Trocar o banco relacional por planilhas.

**Gabarito:** A

---

## ITEM 14 — Escalabilidade Horizontal

- **Capacidade:** C4

**Comando:**  
O que é escalabilidade horizontal?

**Alternativas:**
- A) Colocar o monitor na horizontal.
- B) Aumentar a memória de um único servidor.
- C) Apagar dados antigos para liberar espaço.
- D) Acrescentar mais servidores para dividir a carga.

**Gabarito:** D

---

## ITEM 15 — Desempenho

- **Capacidade:** C4

**Comando:**  
Qual recurso do gerenciador ajuda no desempenho das consultas?

**Alternativas:**
- A) Cores da interface do cliente gráfico.
- B) Licença comercial.
- C) Índices e otimizador de consultas.
- D) Nome das tabelas em maiúsculas.

**Gabarito:** C

---

## ITEM 16 — Segurança do Gerenciador

- **Capacidade:** C4

**Comando:**  
Qual opção é uma característica de segurança de um gerenciador?

**Alternativas:**
- A) Número de tabelas permitidas.
- B) Tamanho da fonte no editor SQL.
- C) Usuários, papéis com permissões, criptografia e auditoria.
- D) Velocidade do teclado do servidor.

**Gabarito:** C

---

## ITEM 17 — Ferramentas e Comunidade

- **Capacidade:** C9

**Comando:**  
Por que a comunidade e as ferramentas de um gerenciador importam na escolha?

**Alternativas:**
- A) Porque a comunidade define a senha do banco.
- B) Porque sem comunidade o banco não guarda dados.
- C) Porque documentação, fóruns e clientes gráficos facilitam aprender, resolver problemas e manter o banco.
- D) Porque gerenciadores com comunidade não precisam de SQL.

**Gabarito:** C

---

## ITEM 18 — SQLite

- **Capacidade:** C9

**Comando:**  
Em qual situação o SQLite é uma boa escolha?

**Alternativas:**
- A) Um sistema com centenas de servidores trabalhando juntos.
- B) Um app de celular que guarda anotações num arquivo no próprio aparelho, sem servidor.
- C) Um banco central de um grande banco financeiro.
- D) Uma loja virtual com milhares de compras simultâneas.

**Gabarito:** B

---

## ITEM 19 — MongoDB

- **Capacidade:** C9

**Comando:**  
Em qual situação um banco de documentos como o MongoDB costuma ser considerado?

**Alternativas:**
- A) Catálogo em que cada categoria de produto tem campos diferentes.
- B) Sistema que não guarda nenhuma informação.
- C) Página estática sem dados.
- D) Planilha pessoal de gastos.

**Gabarito:** A

---

## ITEM 20 — MySQL e MariaDB

- **Capacidade:** C9

**Comando:**  
O que é correto sobre MySQL e MariaDB?

**Alternativas:**
- A) Só funcionam em celulares.
- B) São editores de planilhas.
- C) São bancos de documentos sem SQL.
- D) São gerenciadores relacionais muito usados em sites e hospedagens.

**Gabarito:** D

---

## ITEM 21 — SQL Server

- **Capacidade:** C9

**Comando:**  
O SQL Server é:

**Alternativas:**
- A) Uma linguagem de programação de front-end.
- B) Um banco de documentos gratuito do Google.
- C) Um sistema operacional para servidores.
- D) Um gerenciador relacional da Microsoft, com edição comercial e uma gratuita limitada.

**Gabarito:** D

---

## ITEM 22 — PostgreSQL e JSON

- **Capacidade:** C9

**Comando:**  
Sobre o PostgreSQL, é correto afirmar:

**Alternativas:**
- A) Não suporta transações.
- B) Não aceita SQL.
- C) É um banco só para celulares.
- D) É relacional e também consegue guardar dados em colunas JSON.

**Gabarito:** D

---

## ITEM 23 — Requisito de Sistema Operacional

- **Capacidade:** C9

**Comando:**  
Antes de instalar um gerenciador, conferir se ele roda em Windows, Linux ou macOS de 64 bits é verificar qual requisito?

**Alternativas:**
- A) Modelo de dados.
- B) Licença de uso.
- C) Sistema operacional suportado.
- D) Nível externo.

**Gabarito:** C

---

## ITEM 24 — Requisito de Disco

- **Capacidade:** C9

**Comando:**  
Por que o espaço em disco é um requisito importante do gerenciador?

**Alternativas:**
- A) Porque precisa caber os dados, os índices e os backups.
- B) Porque sem disco o banco fica mais rápido.
- C) Porque o disco guarda apenas o instalador.
- D) Porque o disco define a cor da tela.

**Gabarito:** A

---

## ITEM 25 — Porta do PostgreSQL

- **Capacidade:** C9

**Comando:**  
Qual é a porta padrão do PostgreSQL?

**Alternativas:**
- A) 1433.
- B) 5432.
- C) 3306.
- D) 80.

**Gabarito:** B

---

## ITEM 26 — Porta do MySQL

- **Capacidade:** C9

**Comando:**  
Qual é a porta padrão do MySQL?

**Alternativas:**
- A) 5432.
- B) 443.
- C) 3306.
- D) 21.

**Gabarito:** C

---

## ITEM 27 — Porta do SQL Server

- **Capacidade:** C9

**Comando:**  
Qual é a porta padrão do SQL Server?

**Alternativas:**
- A) 8080.
- B) 3306.
- C) 5432.
- D) 1433.

**Gabarito:** D

---

## ITEM 28 — Requisito de Rede

- **Capacidade:** C9

**Comando:**  
O servidor da aplicação não consegue conectar no banco porque a porta está bloqueada. Que requisito não foi atendido?

**Alternativas:**
- A) Nível externo das visões.
- B) Modelo de documentos.
- C) Rede: porta liberada no firewall para o servidor da aplicação.
- D) Licença comercial.

**Gabarito:** C

---

## ITEM 29 — Requisito de Pessoas

- **Capacidade:** C9

**Comando:**  
Por que o conhecimento da equipe entra nos requisitos da escolha do gerenciador?

**Alternativas:**
- A) Porque o gerenciador só funciona se todos souberem programar em C.
- B) Porque a equipe escolhe a porta do banco.
- C) Porque o conhecimento da equipe aumenta o espaço em disco.
- D) Porque a equipe precisa conseguir instalar, usar e manter o banco escolhido.

**Gabarito:** D

---

## ITEM 30 — Requisito de Disponibilidade

- **Capacidade:** C4

**Comando:**  
"O sistema de vendas não pode parar à noite" é um requisito de:

**Alternativas:**
- A) Nível físico.
- B) Disponibilidade.
- C) Modelo de dados.
- D) Licença.

**Gabarito:** B

---

## ITEM 31 — Níveis de Gerenciamento

- **Capacidade:** C6

**Comando:**  
Quais são os três níveis da arquitetura de gerenciamento de dados?

**Alternativas:**
- A) Básico, intermediário e avançado.
- B) Usuário, senha e permissão.
- C) Externo, conceitual (lógico) e físico (interno).
- D) Front-end, back-end e navegador.

**Gabarito:** C

---

## ITEM 32 — Nível Externo

- **Capacidade:** C6

**Comando:**  
O nível externo descreve:

**Alternativas:**
- A) Todas as tabelas do banco com suas chaves.
- B) A instalação do servidor.
- C) A parte dos dados que cada usuário ou tela enxerga (visões).
- D) Como os dados são gravados no disco.

**Gabarito:** C

---

## ITEM 33 — Nível Conceitual

- **Capacidade:** C6

**Comando:**  
O nível conceitual (lógico) descreve:

**Alternativas:**
- A) Todas as tabelas, colunas, chaves e regras do banco.
- B) O preço da licença.
- C) Apenas a tela de login.
- D) Os arquivos físicos e páginas do disco.

**Gabarito:** A

---

## ITEM 34 — Nível Físico

- **Capacidade:** C6

**Comando:**  
O nível físico (interno) descreve:

**Alternativas:**
- A) O nome dos clientes.
- B) Como os dados são gravados em arquivos, páginas e índices no disco.
- C) Quais telas o usuário vê.
- D) As regras do negócio da empresa.

**Gabarito:** B

---

## ITEM 35 — Classificando o Nível 1

- **Capacidade:** C6

**Comando:**  
"A secretaria vê apenas o nome e o curso dos alunos." Isso é do nível:

**Alternativas:**
- A) Externo.
- B) Conceitual.
- C) Físico.
- D) Nenhum nível.

**Gabarito:** A

---

## ITEM 36 — Classificando o Nível 2

- **Capacidade:** C6

**Comando:**  
"O banco tem as tabelas aluno, curso e matricula, ligadas por chaves." Isso é do nível:

**Alternativas:**
- A) Externo.
- B) Físico.
- C) De rede.
- D) Conceitual (lógico).

**Gabarito:** D

---

## ITEM 37 — Classificando o Nível 3

- **Capacidade:** C6

**Comando:**  
"O índice da tabela aluno está gravado num arquivo separado no disco." Isso é do nível:

**Alternativas:**
- A) Físico.
- B) De aplicação.
- C) Conceitual.
- D) Externo.

**Gabarito:** A

---

## ITEM 38 — Independência Lógica

- **Capacidade:** C6

**Comando:**  
O que é independência lógica de dados?

**Alternativas:**
- A) Usar dois gerenciadores ao mesmo tempo.
- B) Mudar o nível conceitual, como acrescentar uma coluna, sem quebrar as telas que não usam essa coluna.
- C) Apagar o banco sem perder dados.
- D) Mudar o disco do servidor sem alterar as tabelas.

**Gabarito:** B

---

## ITEM 39 — Independência Física

- **Capacidade:** C6

**Comando:**  
O que é independência física de dados?

**Alternativas:**
- A) Mudar como o dado é gravado, como criar um índice ou trocar de disco, sem mudar as tabelas nem a aplicação.
- B) Trocar o nome do banco.
- C) Desligar o servidor sem perder as conexões.
- D) Acrescentar uma coluna sem quebrar as telas.

**Gabarito:** A

---

## ITEM 40 — Papel do Usuário Final

- **Capacidade:** C6

**Comando:**  
Qual é o papel do usuário final em relação ao banco?

**Alternativas:**
- A) Instalar e configurar o SGBD.
- B) Definir os índices do nível físico.
- C) Usar as telas do sistema, que leem e gravam dados por ele.
- D) Escrever os comandos de criação das tabelas.

**Gabarito:** C

---

## ITEM 41 — Papel do Desenvolvedor

- **Capacidade:** C6

**Comando:**  
Qual é o papel do desenvolvedor em relação ao banco?

**Alternativas:**
- A) Usar somente as telas prontas.
- B) Trocar os discos do servidor.
- C) Apenas comprar a licença.
- D) Modelar os dados e escrever o SQL que a aplicação usa.

**Gabarito:** D

---

## ITEM 42 — Papel do DBA

- **Capacidade:** C6

**Comando:**  
O que faz o administrador de banco de dados (DBA)?

**Alternativas:**
- A) Vende o sistema aos clientes.
- B) Instala, configura, faz backup, cuida do desempenho e controla os acessos do banco.
- C) Desenha os botões das telas.
- D) Só digita dados nas planilhas.

**Gabarito:** B

---

## ITEM 43 — Primeiro Passo da Escolha

- **Capacidade:** C9

**Comando:**  
Qual é o primeiro passo para escolher um gerenciador para um sistema?

**Alternativas:**
- A) Listar os requisitos do sistema, como volume, acessos, transações, orçamento e equipe.
- B) Instalar todos e ver qual abre primeiro.
- C) Escolher o gerenciador mais famoso.
- D) Escolher pelo logotipo mais bonito.

**Gabarito:** A

---

## ITEM 44 — Critério de Escolha

- **Capacidade:** C9

**Comando:**  
Entre dois gerenciadores que atendem aos requisitos, qual critério a aula recomenda?

**Alternativas:**
- A) Preferir o de menor custo e risco, que a equipe consegue manter.
- B) Preferir sempre o mais caro.
- C) Preferir o que tem o nome mais curto.
- D) Sortear entre os dois.

**Gabarito:** A

---

## ITEM 45 — Justificativa Registrada

- **Capacidade:** C9

**Comando:**  
Por que a justificativa da escolha do gerenciador deve ser registrada?

**Alternativas:**
- A) Porque o gerenciador só instala com a justificativa impressa.
- B) Porque faz parte da documentação técnica do projeto e explica a decisão para a equipe.
- C) Porque sem ela o banco perde os dados.
- D) Porque a justificativa substitui o backup.

**Gabarito:** B

---

## ITEM 46 — Loja Ponto Web

- **Capacidade:** C9

**Comando:**  
A loja "Ponto Web" tem pagamentos e muitos acessos simultâneos. Qual escolha é coerente com a aula?

**Alternativas:**
- A) Nenhum banco, guardando tudo no navegador.
- B) SQLite, por guardar tudo num arquivo do celular do cliente.
- C) PostgreSQL, por oferecer transações ACID e escalabilidade.
- D) Uma planilha compartilhada.

**Gabarito:** C

---

## ITEM 47 — App de Anotações

- **Capacidade:** C9

**Comando:**  
Um app de anotações precisa funcionar sem internet, no próprio celular. Qual escolha é coerente?

**Alternativas:**
- A) Um cluster de MongoDB com dez servidores.
- B) SQL Server num data center.
- C) Oracle Enterprise em servidor dedicado.
- D) SQLite.

**Gabarito:** D

---

## ITEM 48 — Leilão dos Gerenciadores

- **Capacidade:** C9

**Comando:**  
Na dinâmica "Leilão dos gerenciadores", qual lance está correto para o requisito "funciona sem servidor"?

**Alternativas:**
- A) Oracle, porque é o mais caro.
- B) SQL Server, porque usa a porta 1433.
- C) MongoDB, porque guarda documentos.
- D) SQLite, porque o banco é um arquivo usado direto pela aplicação.

**Gabarito:** D

---

## ITEM 49 — Requisito ou Característica

- **Capacidade:** C4

**Comando:**  
"O sistema terá 2 mil acessos ao mesmo tempo" é:

**Alternativas:**
- A) A licença do gerenciador.
- B) O modelo de dados do gerenciador.
- C) Um requisito do sistema que o gerenciador escolhido precisa atender.
- D) O nível físico do banco.

**Gabarito:** C

---

## ITEM 50 — Visão para Cada Setor

- **Capacidade:** C6

**Comando:**  
Para que o financeiro veja mensalidades e a secretaria veja só dados de matrícula, sem mudar as tabelas, o banco usa:

**Alternativas:**
- A) Visões diferentes no nível externo.
- B) Discos diferentes no nível físico.
- C) Uma planilha para cada setor.
- D) Gerenciadores diferentes para cada setor.

**Gabarito:** A
