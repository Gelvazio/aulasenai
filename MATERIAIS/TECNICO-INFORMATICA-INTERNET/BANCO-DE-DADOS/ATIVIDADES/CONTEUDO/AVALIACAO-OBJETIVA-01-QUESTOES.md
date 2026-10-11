# Atividade: Avaliação Objetiva 01 — 50 Questões

- **Aula:** AV-01
- **Rótulo da aula:** Avaliação Objetiva 01
- **Tema:** Aulas 01 a 10
- **Ícone:** 📝
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os conteúdos das aulas 01 a 10 de Banco de Dados (5 questões por aula), em situações de contexto → comando. Aplicada na aula 11.
- **Conteúdo-base:** ../CONTEUDO/AULA-01-*.md a ../CONTEUDO/AULA-10-*.md
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim

> Fonte única: o HTML `AVALIACAO-OBJETIVA-01.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py --so`. A linha **Gabarito** alimenta o gabarito do banco (seed) e não vai para a página.

---

## ITEM 01 — Dado e Informação na Academia

- **Capacidade:** C4

**Comando:**  
Na academia "Corpo Ativo", o sistema guarda no PostgreSQL os valores "Carla", "3" e "2026-08-15" em colunas separadas. O relatório da recepção mostra a frase "Carla treinou 3 vezes desde 15/08/2026". Qual afirmação descreve corretamente essa situação?

**Alternativas:**
- A) Os valores soltos são informação, e a frase do relatório é dado, porque foi gerada pelo sistema.
- B) Os valores soltos só viram dado depois que o SGBD os transforma em uma frase do relatório.
- C) Os valores soltos e a frase são banco de dados, porque ambos ficam guardados no servidor da academia.
- D) Os valores soltos são dados, e a frase do relatório é informação, porque organiza os dados com sentido.

**Gabarito:** D

---

## ITEM 02 — Concorrência na Venda de Passagens

- **Capacidade:** C4

**Comando:**  
Uma empresa de ônibus vende passagens pelo site e pelo guichê ao mesmo tempo. Dois atendentes tentam vender a última poltrona do mesmo horário no mesmo segundo, e o SGBD garante que só uma venda seja registrada. Qual funcionalidade do SGBD está sendo usada nessa situação?

**Alternativas:**
- A) Armazenamento, que mantém os dados guardados mesmo depois que o servidor reinicia.
- B) Controle de concorrência, que permite vários usuários ao mesmo tempo sem bagunçar os dados.
- C) Recuperação, que volta o banco a um estado seguro depois de uma falha no servidor.
- D) Consulta, que encontra rapidamente as poltronas livres usando filtros no horário.

**Gabarito:** B

---

## ITEM 03 — Pane no Servidor da Farmácia

- **Capacidade:** C4

**Comando:**  
O servidor do banco de uma rede de farmácias sofreu uma falha no disco durante a madrugada. Pela manhã, a equipe voltou o banco ao estado da noite anterior usando a cópia de segurança gerada pelo processo de backup. Qual funcionalidade do SGBD permitiu essa retomada?

**Alternativas:**
- A) Concorrência, que organiza os acessos simultâneos de vários usuários.
- B) Controle de acesso, que define o que cada usuário pode fazer no banco.
- C) Integridade, que impede a gravação de dados errados nas tabelas.
- D) Recuperação, que permite voltar a um estado seguro depois de uma falha.

**Gabarito:** D

---

## ITEM 04 — Quem Conversa com o Banco

- **Capacidade:** C4

**Comando:**  
No sistema de agendamento de uma clínica, o paciente escolhe o horário numa página no navegador e clica em "Confirmar". A equipe discute qual parte da arquitetura deve enviar o comando SQL ao PostgreSQL para gravar o agendamento. Segundo a arquitetura de um sistema web, quem deve fazer isso?

**Alternativas:**
- A) O SGBD, que busca sozinho os dados digitados na tela do paciente a cada clique.
- B) O back-end, que aplica as regras do negócio e conversa com o SGBD usando SQL.
- C) O front-end, que abre a conexão direta do navegador do paciente com o PostgreSQL.
- D) O próprio navegador, que grava o agendamento direto no arquivo do banco de dados.

**Gabarito:** B

---

## ITEM 05 — Classificando os Gerenciadores

- **Capacidade:** C9

**Comando:**  
Uma startup de entregas usa PostgreSQL para pedidos e pagamentos e MongoDB para um catálogo em que cada loja cadastra produtos com campos diferentes. Um novo estagiário pergunta como classificar esses dois gerenciadores. Qual classificação está correta?

**Alternativas:**
- A) PostgreSQL é não relacional, baseado em documentos; MongoDB é relacional, com tabelas e SQL.
- B) PostgreSQL é relacional, com tabelas e SQL; MongoDB é não relacional, baseado em documentos.
- C) Os dois são não relacionais, pois ambos aceitam guardar dados no formato JSON.
- D) Os dois são relacionais, pois ambos guardam dados em tabelas ligadas por chaves.

**Gabarito:** B

---

## ITEM 06 — Durabilidade após o COMMIT

- **Capacidade:** C4

**Comando:**  
No sistema de uma loja virtual, a transação de um pedido termina com COMMIT e o cliente recebe a confirmação. Segundos depois, falta energia no prédio do servidor e, ao religar, o pedido continua gravado no PostgreSQL. Qual propriedade ACID explica esse comportamento?

**Alternativas:**
- A) Consistência, pois o banco desfaz automaticamente qualquer pedido sem pagamento.
- B) Atomicidade, pois a transação é dividida em partes gravadas uma de cada vez.
- C) Durabilidade, pois o dado confirmado não se perde mesmo com falta de energia.
- D) Isolamento, pois o pedido fica escondido das outras transações até o religamento.

**Gabarito:** C

---

## ITEM 07 — Erro no Meio da Transação

- **Capacidade:** C4

**Comando:**  
Na cantina digital de uma escola, a compra de um lanche executa, dentro de BEGIN, um UPDATE que reduz o saldo do aluno e um INSERT que registra a venda. O INSERT falha por erro de digitação na coluna. Qual comando deve ser usado para que o saldo não fique reduzido sem a venda registrada?

**Alternativas:**
- A) ROLLBACK, que desfaz todos os comandos da transação e mantém o princípio do tudo ou nada.
- B) COMMIT, que confirma o UPDATE já executado e descarta apenas o INSERT que falhou.
- C) BEGIN novamente, que reinicia a transação e grava de vez o UPDATE já executado.
- D) SELECT version(), que mostra a versão do servidor e cancela a transação em andamento.

**Gabarito:** A

---

## ITEM 08 — Visão do Setor Financeiro

- **Capacidade:** C6

**Comando:**  
No sistema de uma faculdade, a tela do setor financeiro mostra apenas o nome do aluno e as mensalidades, enquanto a secretaria vê nome, curso e turma. As tabelas completas existem uma só vez no banco. Em qual nível de gerenciamento de dados está a parte que cada setor enxerga?

**Alternativas:**
- A) No nível de recuperação, formado pelas cópias de backup feitas pelo DBA.
- B) No nível físico, formado pelos arquivos, páginas e índices gravados no disco.
- C) No nível externo, formado pelas visões dos dados que cada usuário ou tela enxerga.
- D) No nível conceitual, formado por todas as tabelas, colunas, chaves e regras.

**Gabarito:** C

---

## ITEM 09 — Novo Índice em Outro Disco

- **Capacidade:** C6

**Comando:**  
O DBA de uma rede de livrarias criou um novo índice e moveu os arquivos de dados para um disco mais rápido. As tabelas continuaram com as mesmas colunas e a aplicação funcionou sem nenhuma alteração no código. Que conceito dos níveis de gerenciamento essa situação demonstra?

**Alternativas:**
- A) Nível externo, pois o DBA alterou a parte dos dados que cada tela da livraria enxerga.
- B) Durabilidade, pois os dados confirmados não se perdem ao trocar o disco do servidor.
- C) Independência lógica, pois mudou a estrutura das tabelas sem quebrar as telas que não usam as colunas.
- D) Independência física, pois mudou a forma de gravar os dados sem mudar as tabelas nem a aplicação.

**Gabarito:** D

---

## ITEM 10 — Aplicativo de Coleta sem Internet

- **Capacidade:** C9

**Comando:**  
Uma cooperativa agrícola precisa de um aplicativo de celular para técnicos anotarem visitas em áreas rurais sem internet, guardando os dados no próprio aparelho até voltar à cidade. Considerando as características dos gerenciadores estudados, qual escolha é mais adequada para esse requisito?

**Alternativas:**
- A) SQLite, porque é um banco relacional em um arquivo que funciona no próprio aparelho.
- B) PostgreSQL em servidor central, porque o celular precisa de conexão constante com a porta 5432.
- C) SQL Server, porque usa a porta 1433 e exige servidor sempre conectado à rede.
- D) Oracle, porque é comercial e indicado para grandes empresas com servidores dedicados.

**Gabarito:** A

---

## ITEM 11 — Porta Ocupada na Instalação

- **Capacidade:** C10

**Comando:**  
No laboratório de uma escola técnica, o instalador do PostgreSQL avisa que a porta 5432 já está em uso. O técnico descobre que uma versão antiga do PostgreSQL continua instalada na máquina. Qual é a solução indicada para esse problema?

**Alternativas:**
- A) Trocar a codificação do banco para UTF8 para liberar a porta 5432 automaticamente.
- B) Usar outra porta livre na nova instalação ou remover a instalação antiga do PostgreSQL.
- C) Ignorar o aviso, porque dois servidores podem ouvir a mesma porta sem conflito.
- D) Desligar o firewall da máquina, porque ele é a causa de toda porta aparecer em uso.

**Gabarito:** B

---

## ITEM 12 — Componentes do PostgreSQL

- **Capacidade:** C10

**Comando:**  
Ao final da instalação do PostgreSQL no computador de uma agência de turismo, a equipe precisa explicar ao gerente a função do psql e do pgAdmin, que apareceram no menu do Windows. Qual descrição está correta?

**Alternativas:**
- A) O psql instala extensões extras, e o pgAdmin é o serviço que roda em segundo plano no sistema.
- B) O psql é um cliente de terminal para executar SQL, e o pgAdmin é um cliente gráfico para administrar e consultar.
- C) O psql é o servidor que guarda os dados, e o pgAdmin é a pasta onde ficam os arquivos do banco.
- D) O psql é um cliente gráfico para desenhar o DER, e o pgAdmin é o cliente de terminal do servidor.

**Gabarito:** B

---

## ITEM 13 — Connection Refused na Clínica

- **Capacidade:** C11

**Comando:**  
Na manhã de segunda-feira, o sistema de uma clínica odontológica não conecta ao banco e mostra a mensagem "connection refused" na porta 5432. O técnico confere que a senha está correta e que a porta configurada é a mesma. Qual é a causa provável e a ação recomendada?

**Alternativas:**
- A) O serviço do PostgreSQL está parado; é preciso iniciá-lo e conferir a porta.
- B) A pasta bin está fora do PATH; é preciso usar o atalho SQL Shell no menu do Windows.
- C) A codificação está errada; é preciso recriar o banco com a codificação UTF8.
- D) A senha do usuário está errada; é preciso redefini-la com o administrador do banco.

**Gabarito:** A

---

## ITEM 14 — Nomes com Acentos Errados

- **Capacidade:** C11

**Comando:**  
Depois de instalar o PostgreSQL, a equipe de um centro de idiomas cadastrou alunos e percebeu que nomes como "João" e "Conceição" aparecem com caracteres estranhos nas consultas. Qual é a causa provável e a solução indicada nas boas práticas da instalação?

**Alternativas:**
- A) Porta 5432 ocupada; reinstalar o PostgreSQL em outra porta livre.
- B) Senha do superusuário fraca; definir uma senha forte para o postgres.
- C) Serviço do PostgreSQL parado; iniciar o serviço pelo aplicativo Serviços.
- D) Locale ou codificação diferente; usar a codificação UTF8 no banco.

**Gabarito:** D

---

## ITEM 15 — Conferindo a Conexão no psql

- **Capacidade:** C11

**Comando:**  
Um técnico conectou ao PostgreSQL pelo psql numa máquina com duas instalações e quer confirmar com qual usuário, banco, servidor e porta está conectado antes de executar qualquer comando. Qual comando do psql mostra essas informações?

**Alternativas:**
- A) O comando \conninfo, que mostra usuário, banco, servidor e porta da conexão.
- B) O comando SHOW hba_file, que mostra o usuário e a porta da sessão aberta.
- C) O comando \l, que mostra usuário, porta e pasta de dados de cada banco.
- D) O comando \q, que mostra a conexão atual antes de sair do psql.

**Gabarito:** A

---

## ITEM 16 — Quem Pode Entrar no Banco

- **Capacidade:** C11

**Comando:**  
O administrador do banco de uma rede de academias precisa permitir que apenas o servidor da aplicação, no endereço 10.0.0.20, conecte ao banco academia_db com o usuário app_academia usando senha. Em qual arquivo de configuração do PostgreSQL essa regra deve ser escrita?

**Alternativas:**
- A) No pg_hba.conf, que define quem pode conectar, de onde, a qual banco e como se autentica.
- B) No data_directory, que guarda as linhas de permissão de cada usuário por endereço.
- C) No postgresql.conf, que define quem pode conectar, de onde, a qual banco e como se autentica.
- D) No arquivo .env do back-end, que define as regras de entrada aplicadas pelo servidor de banco.

**Gabarito:** A

---

## ITEM 17 — Linha com Método trust

- **Capacidade:** C11

**Comando:**  
Ao revisar o servidor de produção de uma loja de calçados, a equipe encontrou no pg_hba.conf uma linha do tipo host para o usuário da aplicação com o método trust. Por que essa linha deve ser corrigida e qual método é o recomendado?

**Alternativas:**
- A) Porque trust deixa entrar sem senha; o recomendado é scram-sha-256, que exige senha protegida.
- B) Porque trust bloqueia todas as conexões; o recomendado é local, que libera qualquer endereço.
- C) Porque trust só funciona no Linux; o recomendado é md5, que é o único aceito no Windows.
- D) Porque trust exige senha muito longa; o recomendado é peer, que dispensa senha na rede.

**Gabarito:** A

---

## ITEM 18 — Reload ou Restart

- **Capacidade:** C11

**Comando:**  
O DBA de uma escola de idiomas alterou o parâmetro listen_addresses no postgresql.conf para que o banco aceite conexões no IP do servidor. Ele executou SELECT pg_reload_conf(), mas a mudança não teve efeito. O que precisa ser feito para aplicar essa alteração?

**Alternativas:**
- A) Apagar a linha do pg_hba.conf, pois listen_addresses é lido apenas desse arquivo.
- B) Criar um novo banco com ENCODING UTF8, pois a codificação controla os endereços aceitos.
- C) Executar pg_reload_conf mais uma vez, pois esse parâmetro só vale após dois recarregamentos.
- D) Reiniciar o serviço, de preferência fora do horário de uso, pois esse parâmetro exige restart.

**Gabarito:** D

---

## ITEM 19 — Muitos Acessos Simultâneos

- **Capacidade:** C5

**Comando:**  
Uma plataforma de inscrições para vestibular espera 200 candidatos acessando ao mesmo tempo no último dia de inscrição, e o back-end abre uma conexão nova ao banco a cada requisição. Segundo a correlação entre características do banco e infraestrutura, qual decisão é a mais adequada?

**Alternativas:**
- A) Ajustar max_connections de forma adequada e usar um pool de conexões no back-end.
- B) Configurar o timezone para America/Sao_Paulo e reiniciar o servidor de banco.
- C) Trocar o método do pg_hba.conf para trust para acelerar a entrada dos candidatos.
- D) Deixar o banco aberto ao navegador para que cada candidato conecte direto.

**Gabarito:** A

---

## ITEM 20 — Senha da String de Conexão

- **Capacidade:** C5

**Comando:**  
O back-end de um sistema de biblioteca conecta ao banco pela string postgresql://app_biblio:SENHA@10.0.0.30:5432/biblio_db. Um desenvolvedor sugere escrever essa string, com a senha, direto no código-fonte publicado no repositório da equipe. Qual é a prática correta?

**Alternativas:**
- A) Trocar o usuário app_biblio pelo superusuário postgres, que dispensa senha na string.
- B) Guardar a string numa variável de ambiente, como DATABASE_URL, e manter o arquivo .env fora do repositório.
- C) Escrever a string no código-fonte, desde que o repositório tenha um arquivo README explicando a senha.
- D) Guardar a string no pg_hba.conf, que é o arquivo lido pelo back-end para montar a conexão.

**Gabarito:** B

---

## ITEM 21 — Planilha Online ou Necessidade Real

- **Capacidade:** C1

**Comando:**  
O dono de uma oficina mecânica pede "uma planilha online para as ordens de serviço". Na conversa, descobre-se que carros ficam prontos sem que o cliente seja avisado e que ninguém sabe quais peças foram usadas em cada serviço. Segundo a aula, para que o banco de dados deve ser modelado?

**Alternativas:**
- A) Para a solução que o profissional prefere, sem considerar o processo da oficina.
- B) Para a necessidade real descoberta, ou seja, o problema de controle das ordens e das peças.
- C) Para a frase inicial do cliente, reproduzindo as colunas de uma planilha online.
- D) Para os relatórios de outras oficinas, copiando o modelo de dados delas.

**Gabarito:** B

---

## ITEM 22 — Fichas e Recibos da Clínica

- **Capacidade:** C1

**Comando:**  
Para levantar os dados do sistema de uma clínica veterinária, a equipe recolheu as fichas de atendimento em papel, os recibos e a planilha de vacinas usada hoje, tratando cada campo como um dado candidato. Qual técnica de levantamento está sendo aplicada?

**Alternativas:**
- A) Observação, que acompanha o trabalho real da equipe sem atrapalhar a rotina.
- B) Questionário, que ouve muitas pessoas rapidamente com perguntas claras e curtas.
- C) Análise de documentos, que examina fichas, planilhas, recibos e relatórios atuais.
- D) Entrevista, que conversa com quem decide e quem executa usando perguntas abertas.

**Gabarito:** C

---

## ITEM 23 — Requisito de Acesso no Hotel

- **Capacidade:** C1

**Comando:**  
No levantamento do sistema de reservas de um hotel, o gerente afirma: "só a recepção pode alterar uma reserva; a camareira apenas consulta os quartos que vai limpar". A equipe precisa classificar essa frase entre os tipos de requisitos de dados. Qual é a classificação correta?

**Alternativas:**
- A) Requisito de qualidade, pois define o formato das datas e dos nomes.
- B) Requisito de dados a guardar, pois define os atributos de cada quarto.
- C) Requisito de volume e histórico, pois define quanto o banco cresce por mês.
- D) Requisito de acesso, pois define quem pode ver e quem pode alterar cada informação.

**Gabarito:** D

---

## ITEM 24 — O Que Não Entra no Escopo

- **Capacidade:** C1

**Comando:**  
No documento de escopo do sistema de uma escola de música, a primeira versão cobre alunos, professores, instrumentos e aulas. A diretora também comentou sobre a folha de pagamento e o estoque da lanchonete, que não serão tratados agora. Por que registrar esses itens na seção "Não entra no escopo"?

**Alternativas:**
- A) Para garantir que esses itens sejam modelados primeiro, antes das entidades principais.
- B) Para dispensar o registro das partes interessadas e das premissas do projeto.
- C) Para deixar claro o que fica de fora e evitar pedidos de "só mais uma coisinha" sem controle.
- D) Para transformar esses itens em regras de negócio que viram restrições CHECK no banco.

**Gabarito:** C

---

## ITEM 25 — Pedido Novo no Meio do Projeto

- **Capacidade:** C1

**Comando:**  
Na terceira semana do projeto de uma loja de bicicletas, o cliente pede que o sistema também controle aluguel de bicicletas por hora, algo que não estava no escopo aprovado. Segundo a aula, como a equipe deve tratar esse pedido?

**Alternativas:**
- A) Apagar o documento de escopo e começar o levantamento de requisitos do zero.
- B) Recusar o pedido sem análise, pois o escopo aprovado nunca pode ser alterado.
- C) Registrar o pedido, o impacto em tempo, tabelas e custo e obter a aprovação antes de incluí-lo.
- D) Incluir o pedido imediatamente nas tabelas, sem registro, para não desagradar o cliente.

**Gabarito:** C

---

## ITEM 26 — Entidade Forte na Locadora

- **Capacidade:** C2

**Comando:**  
No modelo de uma locadora de veículos, VEÍCULO existe por si só e é identificado pela placa ou por um código próprio, sem depender de nenhuma outra entidade do sistema. Como VEÍCULO deve ser classificado no modelo entidade-relacionamento?

**Alternativas:**
- A) Como entidade fraca, pois sua identificação depende de outra entidade dona.
- B) Como entidade associativa, pois nasce de um relacionamento muitos-para-muitos.
- C) Como entidade forte, pois existe por si só e tem identificador próprio.
- D) Como atributo, pois é apenas uma característica da entidade LOCAÇÃO.

**Gabarito:** C

---

## ITEM 27 — Identificação da Mensalidade

- **Capacidade:** C2

**Comando:**  
No sistema de uma academia, cada CONTRATO gera mensalidades numeradas 1, 2, 3 e assim por diante; a "mensalidade 4" só faz sentido dentro de um contrato e deixa de existir se o contrato for excluído. Como MENSALIDADE é classificada e identificada?

**Alternativas:**
- A) Atributo composto de CONTRATO, dividido em número, vencimento e valor.
- B) Entidade associativa, identificada pelas chaves de CONTRATO e de ALUNO juntas.
- C) Entidade fraca, identificada pela chave do CONTRATO mais o número da mensalidade.
- D) Entidade forte, identificada apenas pelo número da mensalidade, que nunca se repete.

**Gabarito:** C

---

## ITEM 28 — Inscrição em Oficinas

- **Capacidade:** C2

**Comando:**  
Num evento de tecnologia, um participante se inscreve em várias oficinas e cada oficina recebe vários participantes. A organização precisa guardar a data da inscrição e a presença confirmada de cada participante em cada oficina. Como essa ligação deve aparecer no modelo?

**Alternativas:**
- A) Como entidade associativa INSCRIÇÃO, pois o relacionamento muitos-para-muitos tem dados próprios.
- B) Como entidade fraca INSCRIÇÃO, dependente apenas da entidade PARTICIPANTE.
- C) Como atributo composto de OFICINA, com data da inscrição e presença.
- D) Como entidade forte INSCRIÇÃO, sem qualquer ligação com PARTICIPANTE e OFICINA.

**Gabarito:** A

---

## ITEM 29 — Cor do Veículo

- **Capacidade:** C2

**Comando:**  
Ao sublinhar os substantivos dos requisitos de um estacionamento, a equipe encontrou "cliente", "veículo", "vaga" e "cor do veículo". Usando a pergunta "isso tem dados próprios e se repete com várias ocorrências?", como "cor do veículo" deve ser tratada?

**Alternativas:**
- A) Como entidade forte, pois cada cor pode ser cadastrada várias vezes no sistema.
- B) Como entidade associativa, pois liga VEÍCULO e VAGA no estacionamento.
- C) Como entidade fraca, pois a cor depende do veículo para existir.
- D) Como atributo de VEÍCULO, pois é só uma característica sem dados próprios.

**Gabarito:** D

---

## ITEM 30 — Estudante e Aluno nos Requisitos

- **Capacidade:** C2

**Comando:**  
Nos requisitos de um cursinho pré-vestibular aparecem as palavras "aluno" e "estudante", usadas pela secretaria e pelos professores para a mesma pessoa matriculada. No passo a passo dos requisitos às entidades, o que a equipe deve fazer com esses dois substantivos?

**Alternativas:**
- A) Descartar os dois substantivos, pois pessoas não podem ser entidades.
- B) Criar duas entidades fortes, ALUNO e ESTUDANTE, uma para cada setor.
- C) Tratá-los como sinônimos e manter uma única entidade, por exemplo ALUNO.
- D) Criar ESTUDANTE como entidade fraca dependente da entidade ALUNO.

**Gabarito:** C

---

## ITEM 31 — Endereço para Relatório por Bairro

- **Capacidade:** C2

**Comando:**  
Uma pizzaria quer listar os clientes por bairro para planejar as rotas de entrega. Hoje o endereço é guardado num único campo com rua, número, bairro e cidade juntos. Como a equipe deve tratar o atributo endereço no modelo?

**Alternativas:**
- A) Como atributo simples, mantido em um único campo, pois o bairro pode ser lido no texto.
- B) Como atributo referencial, pois o endereço faz referência à entidade PIZZARIA.
- C) Como identificador, pois o endereço distingue um cliente de todos os outros.
- D) Como atributo composto, dividido em partes, pois o sistema precisa usar o bairro separadamente.

**Gabarito:** D

---

## ITEM 32 — Código do Setor no Funcionário

- **Capacidade:** C2

**Comando:**  
No cadastro de funcionários de uma fábrica, a entidade FUNCIONÁRIO guarda o atributo id_setor, que aponta para a entidade SETOR onde a pessoa trabalha. Quanto à função, como id_setor deve ser classificado dentro de FUNCIONÁRIO?

**Alternativas:**
- A) Composto, pois pode ser dividido em partes menores com significado próprio.
- B) Descritivo, pois apenas descreve uma característica do funcionário sem ligação.
- C) Referencial, pois faz referência a outra entidade e é a semente da chave estrangeira.
- D) Nominativo, pois nomeia e identifica o próprio funcionário dentro da fábrica.

**Gabarito:** C

---

## ITEM 33 — Código do Produto no Mercado

- **Capacidade:** C2

**Comando:**  
No sistema de um mercado, cada produto tem um código interno que aparece na etiqueta e serve para nomear e distinguir aquele produto dos demais. A equipe está classificando os atributos de PRODUTO quanto à função. Como o código do produto deve ser classificado?

**Alternativas:**
- A) Composto, pois se divide em partes como nome, preço e quantidade.
- B) Referencial, pois liga a entidade PRODUTO a outra entidade do mercado.
- C) Nominativo, pois além de descrever nomeia ou identifica a ocorrência.
- D) Descritivo, pois descreve uma característica sem identificar a ocorrência.

**Gabarito:** C

---

## ITEM 34 — Idade no Cadastro do Paciente

- **Capacidade:** C2

**Comando:**  
Na ficha de um posto de saúde existe o campo "idade", digitado no primeiro atendimento do paciente. Na revisão do dicionário de atributos, a equipe aponta esse campo como um erro comum de modelagem. Qual é a correção recomendada?

**Alternativas:**
- A) Guardar a idade em dois campos, um com os anos e outro com os meses.
- B) Guardar a idade como identificador, pois ela distingue os pacientes do posto.
- C) Guardar a idade como atributo referencial para a entidade ATENDIMENTO.
- D) Guardar a data de nascimento, pois a idade muda todo ano e a data não.

**Gabarito:** D

---

## ITEM 35 — Identificador do Associado

- **Capacidade:** C2

**Comando:**  
No sistema de um clube, a equipe pensa em usar o e-mail como identificador do ASSOCIADO. Um colega lembra que associados trocam de e-mail e que filhos menores podem não ter CPF. Qual é a escolha recomendada para o identificador?

**Alternativas:**
- A) O e-mail do associado, atualizado a cada troca para manter a identificação.
- B) O nome completo do associado, que é sempre preenchido na ficha do clube.
- C) Um código próprio, como id_associado, que não se repete e não fica vazio.
- D) A data de nascimento do associado, que nunca muda ao longo do tempo.

**Gabarito:** C

---

## ITEM 36 — Setor e Funcionário

- **Capacidade:** C2

**Comando:**  
Numa empresa de logística, um setor tem vários funcionários e cada funcionário trabalha em um único setor. Ao transformar esse relacionamento 1:N em tabelas, a equipe precisa decidir onde fica a chave estrangeira. Qual é a decisão correta?

**Alternativas:**
- A) As duas tabelas guardam uma chave estrangeira apontando uma para a outra.
- B) É obrigatório criar uma tabela associativa entre SETOR e FUNCIONÁRIO.
- C) A chave estrangeira fica no lado 1, ou seja, SETOR guarda a lista de funcionários.
- D) A chave estrangeira fica no lado N, ou seja, FUNCIONÁRIO guarda id_setor.

**Gabarito:** D

---

## ITEM 37 — Atores e Filmes

- **Capacidade:** C2

**Comando:**  
No banco de uma plataforma de filmes, um ator participa de vários filmes e um filme tem vários atores, e é preciso guardar o nome do personagem de cada ator em cada filme. Como esse relacionamento deve ser implementado?

**Alternativas:**
- A) Com uma chave estrangeira id_filme em ATOR, guardando o personagem na mesma tabela.
- B) Com uma tabela associativa entre ATOR e FILME, com as duas chaves estrangeiras e o personagem.
- C) Com uma chave estrangeira com UNIQUE em um dos lados, como num relacionamento 1:1.
- D) Com uma chave estrangeira id_ator em FILME, guardando a lista de atores em um campo.

**Gabarito:** B

---

## ITEM 38 — Cliente sem Compras

- **Capacidade:** C2

**Comando:**  
Numa loja de roupas, o cliente pode se cadastrar no site sem ter feito nenhuma compra, mas toda compra precisa estar ligada a um cliente. A equipe está definindo a cardinalidade mínima do lado de COMPRA, lendo "um cliente faz quantas compras, no mínimo?". Qual é a resposta correta?

**Alternativas:**
- A) Dois, pois a participação mínima exige uma compra e um pagamento.
- B) Muitos, pois a cardinalidade mínima de um 1:N é sempre igual a N.
- C) Um, pois a participação é obrigatória e todo cliente precisa de uma compra.
- D) Zero, pois a participação é opcional e o cliente pode existir sem compras.

**Gabarito:** D

---

## ITEM 39 — Supervisor do Funcionário

- **Capacidade:** C2

**Comando:**  
Num call center, cada atendente é supervisionado por outro funcionário, e um supervisor acompanha vários atendentes; todos estão na mesma entidade FUNCIONÁRIO. Como esse relacionamento é chamado e como é implementado no caso 1:N?

**Alternativas:**
- A) Relacionamento 1:1, com uma chave estrangeira com UNIQUE na tabela FUNCIONÁRIO.
- B) Relacionamento N:N, com uma tabela associativa entre FUNCIONÁRIO e SUPERVISOR.
- C) Entidade fraca, com a tabela SUPERVISOR dependente da tabela FUNCIONÁRIO.
- D) Autorrelacionamento, com uma chave estrangeira id_supervisor apontando para a mesma tabela.

**Gabarito:** D

---

## ITEM 40 — Funcionário e Crachá

- **Capacidade:** C2

**Comando:**  
Numa indústria, cada funcionário tem um único crachá e cada crachá pertence a um único funcionário, mas os dois são cadastrados em momentos diferentes e por setores diferentes. Como esse relacionamento 1:1 pode ser implementado, segundo a aula?

**Alternativas:**
- A) Com uma tabela associativa contendo as duas chaves estrangeiras e a data de emissão.
- B) Com chave estrangeira com UNIQUE em um dos lados, ou juntando numa só tabela se andarem sempre juntos.
- C) Com um autorrelacionamento na tabela FUNCIONÁRIO apontando para o próprio crachá.
- D) Com uma chave estrangeira sem UNIQUE no lado do crachá, permitindo vários crachás.

**Gabarito:** B

---

## ITEM 41 — Identificador no DER de Chen

- **Capacidade:** C2

**Comando:**  
A equipe de uma biblioteca escolar está desenhando o DER na notação de Chen e precisa destacar que id_livro é o identificador da entidade LIVRO, diferenciando-o dos atributos titulo e ano. Como o identificador deve ser representado?

**Alternativas:**
- A) Como elipse com o nome sublinhado, ou bolinha preenchida no brModelo.
- B) Como retângulo envolvendo o losango do relacionamento.
- C) Como losango com um verbo ligando LIVRO a outra entidade.
- D) Como retângulo de linha dupla ligado à entidade LIVRO.

**Gabarito:** A

---

## ITEM 42 — Círculo no Pé de Galinha

- **Capacidade:** C2

**Comando:**  
No modelo lógico de uma loja virtual desenhado no draw.io, a linha entre CLIENTE e PEDIDO termina, do lado de PEDIDO, com um círculo e um tridente. O professor pede que a turma interprete esses símbolos. O que eles indicam nessa ponta?

**Alternativas:**
- A) Um ou muitos pedidos, pois o círculo vale 1 e o tridente vale muitos.
- B) Zero ou muitos pedidos, pois o círculo vale 0 e o tridente vale muitos.
- C) Nenhum pedido possível, pois o círculo indica que o relacionamento foi excluído.
- D) Exatamente um pedido, pois o círculo vale 1 e o tridente marca a chave primária.

**Gabarito:** B

---

## ITEM 43 — DER Conceitual e Lógico

- **Capacidade:** C2

**Comando:**  
A equipe de um sistema de clínica apresentou ao dono um DER em notação de Chen para validar o negócio. Agora vai preparar a normalização e o SQL e precisa de um diagrama que mostre as tabelas com as chaves primárias e estrangeiras. Qual diagrama deve ser produzido nessa etapa?

**Alternativas:**
- A) O documento de escopo, que lista as tabelas e as chaves de cada entidade.
- B) O DER lógico em pé de galinha, que mostra tabelas, chaves primárias e chaves estrangeiras.
- C) O DER conceitual em Chen, que mostra somente as entidades sem relacionamentos.
- D) O dicionário de atributos, que substitui o diagrama na preparação do SQL.

**Gabarito:** B

---

## ITEM 44 — Ferramenta que Gera o SQL

- **Capacidade:** C2

**Comando:**  
Uma equipe de desenvolvimento quer desenhar o modelo lógico do banco de uma escola de dança e, a partir do próprio diagrama, gerar o SQL para o PostgreSQL já instalado no laboratório. Qual ferramenta estudada atende diretamente a essa necessidade?

**Alternativas:**
- A) O pgAdmin ERD Tool, que desenha o modelo lógico e gera o SQL para o PostgreSQL.
- B) O Stack Builder, que instala o diagrama e cria as tabelas sem SQL.
- C) O psql, que desenha o modelo conceitual e exporta a imagem do DER.
- D) O arquivo pg_hba.conf, que recebe o desenho e gera as tabelas do banco.

**Gabarito:** A

---

## ITEM 45 — Revisão Cruzada do DER

- **Capacidade:** C2

**Comando:**  
Na revisão em dupla do DER de um sistema de hotel, o revisor pergunta: "o relacionamento entre HÓSPEDE e RESERVA é mesmo 1:1?". O grupo autor discorda à primeira vista. Qual atitude do grupo autor está de acordo com as boas práticas da revisão?

**Alternativas:**
- A) Escutar, verificar nos requisitos, aceitar ou justificar e registrar a mudança.
- B) Apagar o relacionamento do DER, para que a dúvida não apareça na entrega.
- C) Aceitar toda sugestão sem verificar, para evitar qualquer discussão com o revisor.
- D) Manter o desenho sem conferir, pois o autor conhece melhor o próprio modelo.

**Gabarito:** A

---

## ITEM 46 — Mudança do Valor da Diária

- **Capacidade:** C3

**Comando:**  
Uma pousada guarda numa planilha única as reservas com o tipo do quarto e o valor da diária repetido em cada linha. Quando o valor da diária do quarto "Luxo" muda, a recepção precisa alterar todas as linhas desse tipo; esquecendo uma, os dados ficam contraditórios. Qual anomalia é essa?

**Alternativas:**
- A) Anomalia de atualização.
- B) Anomalia de exclusão.
- C) Dependência parcial.
- D) Anomalia de inserção.

**Gabarito:** A

---

## ITEM 47 — E-mails na Mesma Célula

- **Capacidade:** C3

**Comando:**  
Na tabela de clientes de uma gráfica, a coluna "emails" guarda valores como "ana@exemplo.com, ana.vendas@exemplo.com" na mesma célula. Para colocar a tabela na primeira forma normal, qual é a solução correta?

**Alternativas:**
- A) Criar uma tabela separada com a chave do cliente e o e-mail, uma linha por e-mail.
- B) Criar as colunas email1, email2 e email3 na própria tabela de clientes.
- C) Manter a coluna como está, separando os e-mails por ponto e vírgula.
- D) Mover a coluna "emails" para a tabela de pedidos da gráfica.

**Gabarito:** A

---

## ITEM 48 — Nome do Produto no Item

- **Capacidade:** C3

**Comando:**  
A tabela ITEM_VENDA de uma papelaria tem chave composta (id_venda, id_produto) e os atributos quantidade e nome_produto. O nome_produto depende só de id_produto, e não da chave inteira. Que problema é esse e como corrigir?

**Alternativas:**
- A) Ausência de chave primária que fere a 1FN; criar a coluna id_item_venda.
- B) Dependência transitiva que fere a 3FN; mover quantidade para a tabela VENDA.
- C) Dependência parcial que fere a 2FN; mover nome_produto para a tabela PRODUTO.
- D) Valor não atômico que fere a 1FN; dividir nome_produto em duas colunas.

**Gabarito:** C

---

## ITEM 49 — Nome do Setor no Funcionário

- **Capacidade:** C3

**Comando:**  
A tabela FUNCIONARIO de uma transportadora tem (id_funcionario, nome, id_setor, nome_setor). Sabe-se que id_funcionario determina id_setor, e id_setor determina nome_setor. Qual forma normal é violada e qual é a correção?

**Alternativas:**
- A) Nenhuma forma normal, pois todo atributo de FUNCIONARIO depende de id_funcionario.
- B) A 3FN, por dependência transitiva; nome_setor vai para SETOR e FUNCIONARIO fica com id_setor.
- C) A 1FN, por valor não atômico; nome_setor é dividido em várias colunas na mesma tabela.
- D) A 2FN, por dependência parcial; a chave de FUNCIONARIO passa a ser composta com nome_setor.

**Gabarito:** B

---

## ITEM 50 — Preço no Item do Pedido

- **Capacidade:** C3

**Comando:**  
Na normalização do banco de uma loja de eletrônicos, um colega quer retirar o preço da tabela ITEM_PEDIDO por achar que ele repete o preço de PRODUTO. A loja precisa saber quanto cada cliente pagou, mesmo depois de reajustes. Qual decisão é a correta?

**Alternativas:**
- A) Manter o preço no item, mas atualizá-lo sempre que o preço do produto mudar.
- B) Manter o preço no item, pois é o preço daquela venda e não deve mudar com o preço atual.
- C) Retirar o preço do item, pois toda repetição de dado fere a primeira forma normal.
- D) Retirar o preço de PRODUTO, pois o preço deve existir somente no item do pedido.

**Gabarito:** B
