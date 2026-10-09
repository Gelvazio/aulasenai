# Atividade: Banco de Dados e SGBD: Conceitos e Usos — 50 Questões

- **Aula:** 01
- **Tema:** Banco de Dados e SGBD: Conceitos e Usos
- **Ícone:** 🗄️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Reconhecer as características e funcionalidades do banco de dados e os diferentes gerenciadores: dado × informação, banco de dados, SGBD e suas funcionalidades (armazenamento, consulta, integridade, controle de acesso, concorrência, recuperação), planilha × banco, redundância e inconsistência, arquitetura web (front-end, back-end e banco), bancos relacionais e não relacionais, tabela, linha e coluna e gestão do tempo na UC.
- **Conteúdo-base:** ../CONTEUDO/AULA-01-BANCO-DE-DADOS-E-SGBD.md
- **Slides:** ../AULAS/AULA-01-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-01-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que É um Dado

- **Capacidade:** C4

**Comando:**  
Qual opção é um exemplo de dado, sem contexto?

**Alternativas:**
- A) O número 17 registrado num campo.
- B) A frase "a aluna Ana tem 17 anos e está matriculada".
- C) O relatório de matrículas do mês com gráficos.
- D) A decisão de abrir uma nova turma.

**Gabarito:** A

---

## ITEM 02 — Dado × Informação

- **Capacidade:** C4

**Comando:**  
O que transforma dados em informação?

**Alternativas:**
- A) Converter os dados para letras maiúsculas.
- B) Guardar os dados em um pendrive.
- C) Organizar os dados e dar contexto a eles, para que tenham sentido.
- D) Apagar os dados repetidos do sistema.

**Gabarito:** C

---

## ITEM 03 — Definição de Banco de Dados

- **Capacidade:** C4

**Comando:**  
O que é um banco de dados?

**Alternativas:**
- A) Um programa que desenha as telas do sistema.
- B) Um servidor que hospeda apenas imagens.
- C) Um conjunto organizado de dados relacionados, guardado de forma permanente e que pode ser consultado e atualizado.
- D) Uma cópia impressa dos cadastros de clientes.

**Gabarito:** C

---

## ITEM 04 — Definição de SGBD

- **Capacidade:** C4

**Comando:**  
O que é um SGBD?

**Alternativas:**
- A) O navegador usado para abrir o sistema web.
- B) A linguagem usada para criar páginas HTML.
- C) A planilha onde ficam os dados da empresa.
- D) O programa que cria, guarda e gerencia o banco de dados, executando os pedidos do sistema.

**Gabarito:** D

---

## ITEM 05 — Quem Acessa o Arquivo do Banco

- **Capacidade:** C4

**Comando:**  
Num sistema web bem construído, como a aplicação chega aos dados?

**Alternativas:**
- A) Enviando um e-mail ao administrador do banco.
- B) Copiando o banco inteiro para o navegador do usuário.
- C) Abrindo diretamente o arquivo do banco no disco.
- D) Pedindo ao SGBD, que executa o pedido e devolve o resultado.

**Gabarito:** D

---

## ITEM 06 — Funcionalidade de Armazenamento

- **Capacidade:** C4

**Comando:**  
Qual funcionalidade do SGBD garante que os pedidos de ontem continuem gravados depois que o servidor reinicia?

**Alternativas:**
- A) Consulta com filtros.
- B) Concorrência.
- C) Armazenamento permanente.
- D) Controle de acesso.

**Gabarito:** C

---

## ITEM 07 — Funcionalidade de Integridade

- **Capacidade:** C4

**Comando:**  
Uma loja não aceita produto com preço negativo, mesmo que o sistema tente gravar. Que funcionalidade do SGBD é essa?

**Alternativas:**
- A) Armazenamento em nuvem.
- B) Recuperação de falhas.
- C) Concorrência.
- D) Integridade dos dados.

**Gabarito:** D

---

## ITEM 08 — Controle de Acesso

- **Capacidade:** C4

**Comando:**  
O caixa da loja consegue ver os pedidos, mas não consegue alterar o preço dos produtos. Que funcionalidade do SGBD garante isso?

**Alternativas:**
- A) Controle de acesso.
- B) Recuperação de falhas.
- C) Integridade referencial.
- D) Consulta rápida.

**Gabarito:** A

---

## ITEM 09 — Concorrência

- **Capacidade:** C4

**Comando:**  
Duas pessoas tentam comprar ao mesmo tempo o último fone de ouvido do estoque. Que funcionalidade do SGBD evita que os dois pedidos sejam aceitos?

**Alternativas:**
- A) Backup diário.
- B) Controle de concorrência.
- C) Controle de acesso.
- D) Armazenamento permanente.

**Gabarito:** B

---

## ITEM 10 — Recuperação de Falhas

- **Capacidade:** C4

**Comando:**  
Depois de uma pane no servidor, o banco é restaurado para o último estado seguro. Que funcionalidade é essa?

**Alternativas:**
- A) Controle de acesso.
- B) Integridade dos dados.
- C) Recuperação (backup e restauração).
- D) Consulta com filtros.

**Gabarito:** C

---

## ITEM 11 — Consulta

- **Capacidade:** C4

**Comando:**  
"Mostrar os pedidos do cliente 15 feitos em outubro" é um exemplo de qual funcionalidade do SGBD?

**Alternativas:**
- A) Instalação do servidor.
- B) Concorrência.
- C) Consulta de dados.
- D) Recuperação de falhas.

**Gabarito:** C

---

## ITEM 12 — Planilha com Vários Usuários

- **Capacidade:** C4

**Comando:**  
Qual é um problema típico de usar uma planilha compartilhada como "banco" de um sistema com muitos usuários ao mesmo tempo?

**Alternativas:**
- A) A planilha não aceita números.
- B) A planilha não pode ter cabeçalho.
- C) A planilha só abre no celular.
- D) Conflito de versões, com uma alteração apagando a outra.

**Gabarito:** D

---

## ITEM 13 — Planilha com Muitos Registros

- **Capacidade:** C4

**Comando:**  
Por que um banco de dados é mais indicado que uma planilha para milhares de registros consultados o tempo todo?

**Alternativas:**
- A) Porque o SGBD usa recursos como índices para consultar rapidamente grandes volumes.
- B) Porque planilhas não guardam textos.
- C) Porque bancos de dados não ocupam espaço em disco.
- D) Porque planilhas não permitem salvar o arquivo.

**Gabarito:** A

---

## ITEM 14 — Regra de E-mail Único

- **Capacidade:** C4

**Comando:**  
Em qual opção a regra "cada cliente tem um e-mail diferente" fica garantida mesmo que alguém tente gravar um e-mail repetido?

**Alternativas:**
- A) Numa planilha, pedindo para os usuários tomarem cuidado.
- B) Num arquivo de texto separado por vírgulas.
- C) Num documento do editor de textos.
- D) Num banco de dados, com uma restrição definida no SGBD.

**Gabarito:** D

---

## ITEM 15 — Redundância

- **Capacidade:** C4

**Comando:**  
O que é redundância de dados?

**Alternativas:**
- A) O mesmo dado copiado em vários lugares, como o endereço do cliente repetido em cada pedido.
- B) A falta de dados num cadastro.
- C) O uso de senha forte no banco.
- D) A divisão do banco em várias tabelas bem modeladas.

**Gabarito:** A

---

## ITEM 16 — Inconsistência

- **Capacidade:** C4

**Comando:**  
O endereço do cliente foi corrigido no cadastro, mas continua antigo em vários pedidos. Como se chama esse problema?

**Alternativas:**
- A) Concorrência controlada.
- B) Inconsistência causada pela redundância.
- C) Backup atualizado.
- D) Integridade garantida.

**Gabarito:** B

---

## ITEM 17 — Papel do Front-End

- **Capacidade:** C4

**Comando:**  
Na arquitetura de um sistema web, qual é o papel do front-end em relação aos dados?

**Alternativas:**
- A) Executar diretamente os comandos SQL no banco.
- B) Fazer o backup do banco de dados.
- C) Guardar os dados de forma permanente.
- D) Mostrar a tela ao usuário e enviar os pedidos para o back-end.

**Gabarito:** D

---

## ITEM 18 — Papel do Back-End

- **Capacidade:** C4

**Comando:**  
Qual é o papel do back-end num sistema web com banco de dados?

**Alternativas:**
- A) Substituir o SGBD.
- B) Aplicar as regras do negócio e conversar com o banco usando SQL.
- C) Guardar fisicamente os dados no disco.
- D) Desenhar os botões e as cores da tela.

**Gabarito:** B

---

## ITEM 19 — Papel do SGBD na Arquitetura

- **Capacidade:** C4

**Comando:**  
Na sequência navegador → back-end → SGBD, o que o SGBD faz?

**Alternativas:**
- A) Executa o SQL recebido e devolve as linhas pedidas.
- B) Confere se o usuário digitou o e-mail no formato certo na tela.
- C) Hospeda as imagens do site.
- D) Mostra a página ao usuário.

**Gabarito:** A

---

## ITEM 20 — Banco Aberto ao Navegador

- **Capacidade:** C4

**Comando:**  
Por que o banco de dados não deve ficar acessível diretamente pelo navegador do usuário?

**Alternativas:**
- A) Porque qualquer pessoa poderia tentar ler ou alterar os dados; quem acessa é o back-end, com usuário e senha próprios.
- B) Porque o banco ficaria mais rápido demais.
- C) Porque o SGBD só funciona sem internet.
- D) Porque o navegador não sabe mostrar textos.

**Gabarito:** A

---

## ITEM 21 — Linguagem de Conversa com o Banco

- **Capacidade:** C4

**Comando:**  
Qual linguagem o back-end usa para conversar com um banco relacional?

**Alternativas:**
- A) Markdown.
- B) HTML.
- C) SQL.
- D) CSS.

**Gabarito:** C

---

## ITEM 22 — Banco Relacional

- **Capacidade:** C9

**Comando:**  
Como os dados ficam organizados num banco relacional?

**Alternativas:**
- A) Em tabelas, com linhas e colunas, ligadas por chaves.
- B) Somente em pares de chave e valor sem estrutura.
- C) Em pastas de imagens.
- D) Em slides de apresentação.

**Gabarito:** A

---

## ITEM 23 — Banco Não Relacional

- **Capacidade:** C9

**Comando:**  
Qual destas características é de bancos não relacionais (NoSQL)?

**Alternativas:**
- A) Não guardam dados de forma permanente.
- B) Podem guardar dados como documentos, chave-valor ou grafos.
- C) Só funcionam em planilhas.
- D) Usam obrigatoriamente apenas tabelas com SQL.

**Gabarito:** B

---

## ITEM 24 — Exemplo de SGBD Relacional

- **Capacidade:** C9

**Comando:**  
Qual destes é um SGBD relacional?

**Alternativas:**
- A) Visual Studio Code.
- B) MongoDB.
- C) Redis.
- D) PostgreSQL.

**Gabarito:** D

---

## ITEM 25 — Exemplo de SGBD Não Relacional

- **Capacidade:** C9

**Comando:**  
Qual destes é um banco de dados não relacional orientado a documentos?

**Alternativas:**
- A) SQL Server.
- B) MySQL.
- C) PostgreSQL.
- D) MongoDB.

**Gabarito:** D

---

## ITEM 26 — SQLite

- **Capacidade:** C9

**Comando:**  
O SQLite é:

**Alternativas:**
- A) Um banco não relacional de grafos.
- B) Um SGBD relacional leve, cujo banco fica num único arquivo, muito usado em aplicativos e testes.
- C) Uma linguagem de estilos para páginas web.
- D) Um editor de planilhas.

**Gabarito:** B

---

## ITEM 27 — SGBD da UC

- **Capacidade:** C9

**Comando:**  
Qual SGBD é usado nesta unidade curricular?

**Alternativas:**
- A) MongoDB.
- B) Microsoft Access.
- C) Oracle.
- D) PostgreSQL.

**Gabarito:** D

---

## ITEM 28 — Motivos do PostgreSQL

- **Capacidade:** C9

**Comando:**  
Qual é um motivo para a UC usar o PostgreSQL?

**Alternativas:**
- A) Não precisa de SQL para funcionar.
- B) Só funciona em celulares.
- C) É o único banco que existe no mercado.
- D) É gratuito, de código aberto, robusto e usado em serviços como o Supabase.

**Gabarito:** D

---

## ITEM 29 — Tabela

- **Capacidade:** C4

**Comando:**  
Numa tabela de clientes, o que a tabela representa?

**Alternativas:**
- A) Um assunto do sistema, no caso os clientes.
- B) A senha do banco.
- C) Uma característica de todos os clientes.
- D) Um único cliente.

**Gabarito:** A

---

## ITEM 30 — Coluna

- **Capacidade:** C4

**Comando:**  
Na tabela de clientes, "email" é:

**Alternativas:**
- A) Uma tabela inteira.
- B) Uma coluna (campo), que representa uma característica do cliente.
- C) Uma linha (registro).
- D) Um SGBD.

**Gabarito:** B

---

## ITEM 31 — Linha

- **Capacidade:** C4

**Comando:**  
Na tabela de clientes, os dados "2, Bruno Lima, bruno@exemplo.com, Blumenau" formam:

**Alternativas:**
- A) Uma coluna.
- B) Um banco de dados inteiro.
- C) Uma linha (registro), que representa um cliente.
- D) Um gerenciador.

**Gabarito:** C

---

## ITEM 32 — Identificador da Linha

- **Capacidade:** C4

**Comando:**  
Para que serve a coluna "id" numa tabela de clientes?

**Alternativas:**
- A) Guardar a cidade do cliente.
- B) Identificar cada linha sem repetição.
- C) Contar quantas tabelas o banco tem.
- D) Definir a cor da tela de cadastro.

**Gabarito:** B

---

## ITEM 33 — Leitura de uma Consulta

- **Capacidade:** C4

**Comando:**  
O que faz a consulta SELECT nome, cidade FROM cliente WHERE cidade = 'Rio do Sul'?

**Alternativas:**
- A) Mostra o nome e a cidade dos clientes que moram em Rio do Sul.
- B) Altera a cidade de todos os clientes para Rio do Sul.
- C) Cria a tabela cliente.
- D) Apaga os clientes de Rio do Sul.

**Gabarito:** A

---

## ITEM 34 — Cláusula FROM

- **Capacidade:** C4

**Comando:**  
Na consulta SELECT nome FROM cliente, o que indica a palavra FROM?

**Alternativas:**
- A) O usuário que fez a consulta.
- B) A tabela de onde os dados são lidos.
- C) A coluna que será apagada.
- D) O nome do banco de backup.

**Gabarito:** B

---

## ITEM 35 — Cláusula WHERE

- **Capacidade:** C4

**Comando:**  
Na consulta com WHERE cidade = 'Rio do Sul', para que serve o WHERE?

**Alternativas:**
- A) Escolher a tabela.
- B) Filtrar as linhas que atendem à condição.
- C) Ordenar o resultado em ordem alfabética.
- D) Criar uma nova coluna.

**Gabarito:** B

---

## ITEM 36 — Exemplo de Sistema com Banco

- **Capacidade:** C4

**Comando:**  
Qual destes sistemas depende de um banco de dados para funcionar?

**Alternativas:**
- A) Um aplicativo de banco que guarda contas, saldos e transações.
- B) Uma calculadora simples que não guarda nada.
- C) Uma página estática com uma única foto e nenhum cadastro.
- D) Um relógio de parede analógico.

**Gabarito:** A

---

## ITEM 37 — Dados de uma Loja Virtual

- **Capacidade:** C4

**Comando:**  
Quais "coisas" uma loja virtual normalmente precisa guardar no banco?

**Alternativas:**
- A) Os vídeos de propaganda da televisão.
- B) Apenas as cores e as fontes do site.
- C) Somente o logotipo da loja.
- D) Clientes, produtos, pedidos e pagamentos.

**Gabarito:** D

---

## ITEM 38 — Finalizar Compra

- **Capacidade:** C4

**Comando:**  
Na Loja Ponto Web, ao clicar em "Finalizar compra", qual é a ordem correta dos passos?

**Alternativas:**
- A) O SGBD desenha a tela, o front-end grava o pedido e o back-end mostra o resultado.
- B) O front-end envia o carrinho, o back-end confere o estoque e grava o pedido, e o SGBD guarda os dados.
- C) O navegador grava o pedido direto no disco do servidor.
- D) O back-end envia o pedido por e-mail ao cliente, sem gravar.

**Gabarito:** B

---

## ITEM 39 — Pedido e Pagamento Juntos

- **Capacidade:** C4

**Comando:**  
O SGBD garante que o pedido só fique salvo se o pagamento também ficar. Isso protege principalmente:

**Alternativas:**
- A) O tamanho das imagens dos produtos.
- B) A velocidade da internet do cliente.
- C) A integridade e a consistência dos dados.
- D) A cor da página de pagamento.

**Gabarito:** C

---

## ITEM 40 — Banco Bem Modelado

- **Capacidade:** C4

**Comando:**  
O que um banco de dados bem modelado evita?

**Alternativas:**
- A) O uso de SQL.
- B) Que vários usuários acessem o sistema.
- C) Redundância desnecessária e inconsistência dos dados.
- D) A existência de tabelas.

**Gabarito:** C

---

## ITEM 41 — Sistema da Escola

- **Capacidade:** C4

**Comando:**  
No sistema de notas de uma escola, qual funcionalidade do SGBD impede que um aluno altere a própria nota?

**Alternativas:**
- A) Consulta.
- B) Controle de acesso.
- C) Recuperação.
- D) Armazenamento.

**Gabarito:** B

---

## ITEM 42 — App de Entregas

- **Capacidade:** C4

**Comando:**  
Num app de entregas, milhares de pedidos são gravados por minuto por pessoas diferentes. Qual funcionalidade do SGBD é essencial?

**Alternativas:**
- A) Impressão de relatórios em papel.
- B) Concorrência, para muitos acessos ao mesmo tempo sem bagunçar os dados.
- C) Envio de mensagens por SMS.
- D) Desenho das telas.

**Gabarito:** B

---

## ITEM 43 — Usuário do Banco para a Aplicação

- **Capacidade:** C4

**Comando:**  
O back-end deve se conectar ao banco:

**Alternativas:**
- A) Com um usuário e uma senha próprios da aplicação.
- B) Com a senha pessoal do cliente que está comprando.
- C) Pelo navegador de cada usuário.
- D) Sem senha, para ficar mais rápido.

**Gabarito:** A

---

## ITEM 44 — Dado Pessoal

- **Capacidade:** C4

**Comando:**  
Ao guardar dados de clientes, como CPF e endereço, o que o profissional precisa ter em mente?

**Alternativas:**
- A) Que são dados pessoais e precisam ser protegidos, com acesso só para quem precisa.
- B) Que podem ser publicados no site para facilitar.
- C) Que devem ficar numa planilha aberta a todos.
- D) Que não precisam de backup.

**Gabarito:** A

---

## ITEM 45 — Gestão do Tempo na UC

- **Capacidade:** C4

**Comando:**  
Por que a gestão do tempo (1.1) é importante nesta UC?

**Alternativas:**
- A) Porque as aulas não têm relação umas com as outras.
- B) Porque a UC não tem entregas.
- C) Porque o projeto cresce aula a aula e atrasar a modelagem atrasa toda a construção do banco.
- D) Porque o banco de dados é criado só no último dia.

**Gabarito:** C

---

## ITEM 46 — Plano de Estudos

- **Capacidade:** C4

**Comando:**  
O que deve constar no plano de estudos pessoal das 20 aulas?

**Alternativas:**
- A) O nome do SGBD de cada colega.
- B) Apenas a lista de jogos preferidos.
- C) O que entregar em cada semana, o tempo reservado para revisar e quando pedir ajuda.
- D) Somente a data da prova final.

**Gabarito:** C

---

## ITEM 47 — Ordem das Etapas da UC

- **Capacidade:** C4

**Comando:**  
Qual ordem segue a UC para chegar ao banco pronto?

**Alternativas:**
- A) Construir as tabelas sem saber o que o cliente quer e só depois conversar com ele.
- B) Entender o pedido do cliente, modelar os dados, preparar o SGBD e construir o banco com SQL.
- C) Escolher as cores das telas e depois apagar o banco.
- D) Fazer backup antes de existir qualquer dado.

**Gabarito:** B

---

## ITEM 48 — Detetive dos Dados

- **Capacidade:** C4

**Comando:**  
Na dinâmica "Detetive dos dados", ao analisar o app de banco, qual funcionalidade do SGBD o grupo deveria apontar como indispensável?

**Alternativas:**
- A) Concorrência e integridade, para que saldos e transferências fiquem corretos.
- B) Somente a impressão de extratos em papel.
- C) Nenhuma, porque apps de banco não usam banco de dados.
- D) Apenas o desenho do logotipo do app.

**Gabarito:** A

---

## ITEM 49 — Informação para Decisão

- **Capacidade:** C4

**Comando:**  
"Neste mês, 40 alunos se matricularam no curso de programação, 25% a mais que no mês passado." Isso é:

**Alternativas:**
- A) Um dado solto, sem contexto.
- B) Uma coluna de tabela.
- C) Informação, porque os dados foram organizados e ganharam sentido.
- D) Um SGBD.

**Gabarito:** C

---

## ITEM 50 — Relacional ou Não Relacional

- **Capacidade:** C9

**Comando:**  
Assinale a classificação correta:

**Alternativas:**
- A) PostgreSQL é não relacional; MongoDB é relacional.
- B) Todos os bancos são relacionais.
- C) MySQL e MongoDB usam o mesmo modelo de documentos.
- D) PostgreSQL e MySQL são relacionais; MongoDB é não relacional.

**Gabarito:** D
