# Atividade: Padronização de Dados, Cronograma e Fluxograma — 50 Questões

- **Aula:** 11
- **Tema:** Padronização de Dados, Cronograma e Fluxograma
- **Ícone:** 📐
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os procedimentos de padronização de dados e reconhecer as demandas do cliente na documentação técnica: padrão de nomes de tabelas, colunas e chaves, tipos e formatos padronizados (datas, documentos, valores, textos), domínios, dicionário de dados final, cronograma (etapas, dependências, responsáveis e marcos) e fluxograma (símbolos e processo de matrícula).
- **Conteúdo-base:** ../CONTEUDO/AULA-11-PADRONIZACAO-DE-DADOS-CRONOGRAMA-E-FLUXOGRAMA.md
- **Slides:** ../AULAS/AULA-11-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-11-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Por Que Padronizar

- **Capacidade:** C3

**Comando:**  
Por que padronizar os dados e os nomes do banco?

**Alternativas:**
- A) Para deixar cada pessoa escrever do seu jeito.
- B) Para deixar o banco previsível, legível e fácil de integrar, evitando erros nas consultas.
- C) Para dispensar a normalização.
- D) Para aumentar o número de tabelas.

**Gabarito:** B

---

## ITEM 02 — Nome de Tabela

- **Capacidade:** C3

**Comando:**  
Qual nome de tabela segue o padrão da UC?

**Alternativas:**
- A) item_pedido
- B) ITEMPEDIDOS
- C) ítem-pedido
- D) Itens Pedidos

**Gabarito:** A

---

## ITEM 03 — Nome de Coluna

- **Capacidade:** C3

**Comando:**  
Qual nome de coluna segue o padrão da UC?

**Alternativas:**
- A) dtnsc
- B) data_nascimento
- C) DataDeNascimentoDoAluno
- D) Data Nasc

**Gabarito:** B

---

## ITEM 04 — Singular

- **Capacidade:** C3

**Comando:**  
Pelo padrão da UC, as tabelas são nomeadas:

**Alternativas:**
- A) No plural, como alunos.
- B) No singular, como aluno.
- C) Com acentos, como matrícula.
- D) Com números, como tabela1.

**Gabarito:** B

---

## ITEM 05 — Chave Primária

- **Capacidade:** C3

**Comando:**  
Qual é o padrão para o nome da chave primária?

**Alternativas:**
- A) id ou id_<tabela>, como id_aluno.
- B) PK1.
- C) codigo_principal_da_tabela_do_aluno.
- D) numero.

**Gabarito:** A

---

## ITEM 06 — Chave Estrangeira

- **Capacidade:** C3

**Comando:**  
Na tabela turma, como se chama a chave estrangeira para curso?

**Alternativas:**
- A) id_curso
- B) c
- C) Curso
- D) curso_da_turma_fk_principal

**Gabarito:** A

---

## ITEM 07 — Palavra Reservada

- **Capacidade:** C3

**Comando:**  
Por que não usar order como nome de tabela?

**Alternativas:**
- A) Porque o PostgreSQL não aceita tabelas de pedidos.
- B) Porque é curta demais.
- C) Porque é palavra reservada do SQL e causa erros ou exige tratamento especial.
- D) Porque é uma palavra em inglês.

**Gabarito:** C

---

## ITEM 08 — Espaços e Acentos

- **Capacidade:** C3

**Comando:**  
Por que evitar espaços e acentos nos nomes de tabelas e colunas?

**Alternativas:**
- A) Porque são proibidos por lei.
- B) Porque o banco fica mais bonito sem eles.
- C) Porque exigem aspas no SQL e causam problemas de compatibilidade e digitação.
- D) Porque o pgAdmin apaga os acentos.

**Gabarito:** C

---

## ITEM 09 — Coluna Verdadeiro ou Falso

- **Capacidade:** C3

**Comando:**  
Qual nome é adequado para uma coluna verdadeiro/falso que indica se a parcela foi paga?

**Alternativas:**
- A) valor
- B) x
- C) pago
- D) data

**Gabarito:** C

---

## ITEM 10 — Formato de Data

- **Capacidade:** C3

**Comando:**  
Qual é o formato padrão de data guardado no banco?

**Alternativas:**
- A) mês por extenso.
- B) Número de dias desde o nascimento.
- C) dd/mm/aa como texto.
- D) AAAA-MM-DD, no tipo data.

**Gabarito:** D

---

## ITEM 11 — Data e a Tela

- **Capacidade:** C3

**Comando:**  
Se o banco guarda AAAA-MM-DD, como o usuário vê a data?

**Alternativas:**
- A) O banco guarda os dois formatos em colunas diferentes.
- B) A data não aparece na tela.
- C) A tela mostra no formato dd/mm/aaaa, convertendo o valor guardado.
- D) O usuário precisa ler AAAA-MM-DD sempre.

**Gabarito:** C

---

## ITEM 12 — Data com Hora

- **Capacidade:** C3

**Comando:**  
Para registrar data e hora corretas no horário de Brasília, qual tipo é indicado?

**Alternativas:**
- A) Número inteiro.
- B) Texto livre.
- C) Verdadeiro/falso.
- D) Tipo de data e hora com fuso, como timestamptz.

**Gabarito:** D

---

## ITEM 13 — CPF Como Texto

- **Capacidade:** C3

**Comando:**  
Por que o CPF é guardado como texto só com dígitos?

**Alternativas:**
- A) Para manter zeros à esquerda e deixar a máscara com pontos para a tela.
- B) Para fazer contas com o CPF.
- C) Porque CPF tem letras.
- D) Para guardar o CPF com espaços.

**Gabarito:** A

---

## ITEM 14 — Telefone e CEP

- **Capacidade:** C3

**Comando:**  
Como o padrão da UC guarda telefone e CEP?

**Alternativas:**
- A) Como texto, só com dígitos.
- B) Com máscara e espaços.
- C) Como número decimal.
- D) Como data.

**Gabarito:** A

---

## ITEM 15 — Valores em Dinheiro

- **Capacidade:** C3

**Comando:**  
Qual tipo é indicado para valores em dinheiro, como a mensalidade?

**Alternativas:**
- A) Texto com o símbolo R$.
- B) Inteiro sem centavos.
- C) Decimal com 2 casas.
- D) Verdadeiro/falso.

**Gabarito:** C

---

## ITEM 16 — E-mail em Minúsculas

- **Capacidade:** C3

**Comando:**  
Por que padronizar o e-mail em minúsculas?

**Alternativas:**
- A) Porque o banco não guarda letras maiúsculas.
- B) Para ocupar menos espaço.
- C) Porque e-mails não aceitam maiúsculas.
- D) Para evitar duplicidade, como Ana@exemplo.com e ana@exemplo.com.

**Gabarito:** D

---

## ITEM 17 — Nomes Sem Abreviação

- **Capacidade:** C3

**Comando:**  
Por que guardar nomes sem abreviação e sem espaços extras?

**Alternativas:**
- A) Para esconder dados dos usuários.
- B) Porque abreviações são proibidas por lei.
- C) Para ocupar mais espaço.
- D) Para que buscas e ordenações funcionem corretamente.

**Gabarito:** D

---

## ITEM 18 — Domínio

- **Capacidade:** C3

**Comando:**  
O que é um domínio de valores?

**Alternativas:**
- A) A senha do banco.
- B) Uma lista fechada de valores possíveis para um atributo, como os turnos manha, tarde e noite.
- C) O endereço do site.
- D) O nome do servidor.

**Gabarito:** B

---

## ITEM 19 — Domínio da Situação

- **Capacidade:** C3

**Comando:**  
Qual é o domínio da situação da matrícula definido na aula?

**Alternativas:**
- A) 1 a 1000.
- B) qualquer texto livre.
- C) sim e não.
- D) ativa, trancada, concluida e cancelada.

**Gabarito:** D

---

## ITEM 20 — Garantir o Domínio

- **Capacidade:** C3

**Comando:**  
Como o banco pode garantir um domínio de valores?

**Alternativas:**
- A) Com restrição CHECK ou tabela de apoio.
- B) Com a porta do servidor.
- C) Com um aviso na tela.
- D) Com backup.

**Gabarito:** A

---

## ITEM 21 — Sem Domínio

- **Capacidade:** C3

**Comando:**  
Qual é o problema de não ter domínio para a situação?

**Alternativas:**
- A) Gravar "Ativo", "ATIVA" e "atv" para a mesma coisa, atrapalhando consultas.
- B) Nenhum problema.
- C) A tabela perder a chave primária.
- D) O banco ficar mais rápido.

**Gabarito:** A

---

## ITEM 22 — Dicionário de Dados Final

- **Capacidade:** C3

**Comando:**  
O que o dicionário de dados final passa a conter nesta aula?

**Alternativas:**
- A) Os comandos de backup.
- B) Somente as senhas.
- C) Os nomes padronizados, tipos, formatos e domínios de cada atributo.
- D) Apenas o nome do cliente.

**Gabarito:** C

---

## ITEM 23 — Dicionário e SQL

- **Capacidade:** C3

**Comando:**  
Para que o dicionário de dados final é usado na aula 12?

**Alternativas:**
- A) Para instalar o PostgreSQL.
- B) Para configurar o pg_hba.conf.
- C) Para guiar a escrita do SQL de criação das tabelas.
- D) Para desenhar os slides.

**Gabarito:** C

---

## ITEM 24 — O Que É Cronograma

- **Capacidade:** C1

**Comando:**  
O que é o cronograma do projeto?

**Alternativas:**
- A) A lista das etapas com duração, início e fim, dependências, responsáveis e marcos.
- B) O fluxo de telas do sistema.
- C) O desenho das tabelas.
- D) A senha do banco.

**Gabarito:** A

---

## ITEM 25 — Dependência no Cronograma

- **Capacidade:** C1

**Comando:**  
O que é uma dependência no cronograma?

**Alternativas:**
- A) Uma chave estrangeira.
- B) Uma etapa que precisa estar pronta antes de outra começar.
- C) O nome do responsável.
- D) O custo do projeto.

**Gabarito:** B

---

## ITEM 26 — Marco

- **Capacidade:** C1

**Comando:**  
O que é um marco no cronograma?

**Alternativas:**
- A) Uma entrega importante, como "DER validado" ou "banco criado".
- B) Um símbolo do fluxograma.
- C) Uma porta de rede.
- D) Um atributo da tabela.

**Gabarito:** A

---

## ITEM 27 — Folga

- **Capacidade:** C1

**Comando:**  
Por que deixar folga antes dos marcos do cronograma?

**Alternativas:**
- A) Para aumentar o custo.
- B) Para descansar o projeto inteiro.
- C) Porque o cronograma exige espaços vazios.
- D) Para absorver imprevistos sem atrasar a entrega.

**Gabarito:** D

---

## ITEM 28 — Scripts Depois do Modelo

- **Capacidade:** C1

**Comando:**  
No cronograma da aula, por que os scripts DDL só começam depois do modelo final?

**Alternativas:**
- A) Porque não há relação entre eles.
- B) Porque dependem do modelo normalizado e padronizado.
- C) Porque o SQL é mais fácil que a modelagem.
- D) Porque o PostgreSQL só instala no fim.

**Gabarito:** B

---

## ITEM 29 — Acompanhamento

- **Capacidade:** C1

**Comando:**  
Como acompanhar o cronograma durante o projeto?

**Alternativas:**
- A) Olhando só no último dia.
- B) Comparando, toda semana, o realizado com o planejado e ajustando quando houver atraso.
- C) Nunca, pois o cronograma não muda.
- D) Apagando as etapas atrasadas.

**Gabarito:** B

---

## ITEM 30 — Gantt

- **Capacidade:** C1

**Comando:**  
O que é um gráfico de Gantt?

**Alternativas:**
- A) Um gráfico de barras que mostra as etapas no tempo, com início e fim.
- B) Um tipo de backup.
- C) Um diagrama de entidades.
- D) Um comando SQL.

**Gabarito:** A

---

## ITEM 31 — O Que É Fluxograma

- **Capacidade:** C1

**Comando:**  
O que é um fluxograma?

**Alternativas:**
- A) Um desenho dos passos de um processo e das decisões, na ordem em que acontecem.
- B) Uma lista de senhas.
- C) Um arquivo de configuração.
- D) Uma tabela normalizada.

**Gabarito:** A

---

## ITEM 32 — Oval

- **Capacidade:** C1

**Comando:**  
No fluxograma, o que representa a forma oval (terminal)?

**Alternativas:**
- A) Uma decisão.
- B) Um banco de dados.
- C) Início ou fim do processo.
- D) Uma entrada de dados.

**Gabarito:** C

---

## ITEM 33 — Retângulo

- **Capacidade:** C1

**Comando:**  
No fluxograma, o que representa o retângulo?

**Alternativas:**
- A) Um processo, ou seja, uma ação.
- B) O início.
- C) Um banco de dados.
- D) Uma decisão.

**Gabarito:** A

---

## ITEM 34 — Losango

- **Capacidade:** C1

**Comando:**  
No fluxograma, o que representa o losango?

**Alternativas:**
- A) O fim.
- B) Um processo.
- C) Um documento.
- D) Uma decisão, com caminhos sim e não.

**Gabarito:** D

---

## ITEM 35 — Paralelogramo

- **Capacidade:** C1

**Comando:**  
No fluxograma, o que representa o paralelogramo?

**Alternativas:**
- A) Uma chave estrangeira.
- B) Uma decisão.
- C) O início.
- D) Entrada ou saída de dados.

**Gabarito:** D

---

## ITEM 36 — Cilindro

- **Capacidade:** C1

**Comando:**  
No fluxograma, o que representa o cilindro?

**Alternativas:**
- A) Um usuário.
- B) O banco de dados, onde há consulta ou gravação.
- C) O fim do processo.
- D) Uma decisão.

**Gabarito:** B

---

## ITEM 37 — Setas

- **Capacidade:** C1

**Comando:**  
No fluxograma, para que servem as setas?

**Alternativas:**
- A) Indicar chaves primárias.
- B) Indicar o sentido do fluxo, de um passo para o outro.
- C) Indicar o tamanho do disco.
- D) Indicar a senha.

**Gabarito:** B

---

## ITEM 38 — Decisão da Vaga

- **Capacidade:** C1

**Comando:**  
No fluxo da matrícula, onde aparece a pergunta "a turma tem vaga?"

**Alternativas:**
- A) Num paralelogramo de saída.
- B) Num oval de início.
- C) Num losango de decisão, depois de consultar o banco.
- D) Não aparece.

**Gabarito:** C

---

## ITEM 39 — Gravação no Fluxo

- **Capacidade:** C1

**Comando:**  
No fluxo da matrícula, quando a matrícula e as parcelas são gravadas?

**Alternativas:**
- A) Nunca são gravadas.
- B) Depois de confirmar que a turma tem vaga, num passo ligado ao cilindro do banco.
- C) Antes de informar o CPF.
- D) No início do fluxo.

**Gabarito:** B

---

## ITEM 40 — Decisão Esquecida

- **Capacidade:** C1

**Comando:**  
No exemplo da escola, qual decisão o fluxograma revelou que estava faltando?

**Alternativas:**
- A) O curso tem nome?
- B) O aluno gosta da cor azul?
- C) O aluno é menor de idade? Se sim, cadastrar o responsável.
- D) O servidor está ligado?

**Gabarito:** C

---

## ITEM 41 — Fluxograma e Requisitos

- **Capacidade:** C1

**Comando:**  
Por que o fluxograma ajuda a reconhecer as demandas do cliente?

**Alternativas:**
- A) Porque gera o SQL automaticamente.
- B) Porque elimina o cronograma.
- C) Porque mostra o processo passo a passo e revela decisões e dados esquecidos no levantamento.
- D) Porque substitui o banco de dados.

**Gabarito:** C

---

## ITEM 42 — Escola: Turno Padronizado

- **Capacidade:** C3

**Comando:**  
No exemplo da escola, como ficou o antigo campo Turma.Turno?

**Alternativas:**
- A) turnos_das_turmas como número.
- B) Foi apagado.
- C) TURMA.TURNO em texto livre.
- D) turma.turno, com domínio manha, tarde e noite.

**Gabarito:** D

---

## ITEM 43 — Escola: Valor

- **Capacidade:** C3

**Comando:**  
No exemplo da escola, como ficou o campo valor?

**Alternativas:**
- A) valor em texto com R$.
- B) ValorDaMensalidadeDoCurso.
- C) v como inteiro.
- D) valor_mensal, decimal com 2 casas.

**Gabarito:** D

---

## ITEM 44 — Escola: CPF

- **Capacidade:** C3

**Comando:**  
No exemplo da escola, como ficou o CPF que tinha pontos?

**Alternativas:**
- A) cpf como número decimal.
- B) cpf, só com dígitos, como texto.
- C) CPF com pontos e traço.
- D) Foi dividido em quatro colunas.

**Gabarito:** B

---

## ITEM 45 — Dinâmica: Cilindro

- **Capacidade:** C1

**Comando:**  
Na dinâmica "Fluxo da matrícula", o que o grupo marca com o cilindro?

**Alternativas:**
- A) O início e o fim.
- B) As decisões do processo.
- C) Os nomes dos integrantes.
- D) Os pontos em que o banco é consultado ou gravado, dizendo qual tabela.

**Gabarito:** D

---

## ITEM 46 — Dinâmica: Ferramenta

- **Capacidade:** C1

**Comando:**  
Depois de montar o fluxo na mesa, para onde o grupo passa o fluxograma?

**Alternativas:**
- A) Para o backup.
- B) Para o dicionário de senhas.
- C) Para a ferramenta de diagramas, como o draw.io.
- D) Para o pg_hba.conf.

**Gabarito:** C

---

## ITEM 47 — Entrega da SA 1

- **Capacidade:** C3

**Comando:**  
O que o grupo entrega no fechamento da SA 1?

**Alternativas:**
- A) Somente a lista de entidades.
- B) Padrão aplicado com dicionário de dados final, domínios, cronograma com dependências e marcos e fluxograma da matrícula.
- C) A instalação do PostgreSQL.
- D) Somente o script de backup.

**Gabarito:** B

---

## ITEM 48 — Corrigir Nome

- **Capacidade:** C3

**Comando:**  
Qual é a correção do nome ValorMensal para o padrão da UC?

**Alternativas:**
- A) valor_mensal
- B) ValorMensal sem mudança
- C) vm
- D) VALOR MENSAL

**Gabarito:** A

---

## ITEM 49 — Responsável no Cronograma

- **Capacidade:** C1

**Comando:**  
Por que o cronograma indica o responsável de cada etapa?

**Alternativas:**
- A) Porque o SGBD exige.
- B) Para que todos saibam quem cuida de cada entrega e a quem perguntar.
- C) Para esconder o andamento.
- D) Para dar notas aos integrantes.

**Gabarito:** B

---

## ITEM 50 — Padrão e Back-End

- **Capacidade:** C3

**Comando:**  
Como a padronização de nomes ajuda o desenvolvedor do back-end?

**Alternativas:**
- A) Ele dispensa as chaves estrangeiras.
- B) Ele passa a usar planilhas.
- C) Ele não precisa mais escrever SQL.
- D) Ele consegue prever os nomes de tabelas e colunas e escrever o SQL com menos erros.

**Gabarito:** D
