# Atividade: Entidades Fortes, Fracas e Associativas — 50 Questões

- **Aula:** 06
- **Tema:** Entidades Fortes, Fracas e Associativas
- **Ícone:** 🧩
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os procedimentos do modelo entidade-relacionamento: o que é o MER, entidade e ocorrência, entidade × atributo, entidades fortes, fracas (entidade dona e identificação parcial) e associativas (relacionamento muitos-para-muitos com dados próprios), notação e passo a passo dos requisitos às entidades.
- **Conteúdo-base:** ../CONTEUDO/AULA-06-ENTIDADES-FORTES-FRACAS-E-ASSOCIATIVAS.md
- **Slides:** ../AULAS/AULA-06-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-06-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que É o MER

- **Capacidade:** C2

**Comando:**  
O que é o modelo entidade-relacionamento (MER)?

**Alternativas:**
- A) Um comando SQL que cria tabelas.
- B) Um programa de instalação do banco.
- C) Uma forma de descrever os dados do sistema, suas entidades, atributos e relacionamentos, independente do SGBD.
- D) Um tipo de backup do servidor.

**Gabarito:** C

---

## ITEM 02 — MER e Nível Conceitual

- **Capacidade:** C2

**Comando:**  
Em qual nível de gerenciamento de dados o MER se encaixa?

**Alternativas:**
- A) Nível conceitual.
- B) Nível de rede.
- C) Nível físico.
- D) Nível de hardware.

**Gabarito:** A

---

## ITEM 03 — MER Antes das Tabelas

- **Capacidade:** C2

**Comando:**  
Por que o MER é feito antes de criar as tabelas?

**Alternativas:**
- A) Porque o MER substitui o banco.
- B) Porque as tabelas não usam o MER.
- C) Porque o SGBD só instala depois do MER.
- D) Para entender e validar os dados com o cliente antes de escrever SQL.

**Gabarito:** D

---

## ITEM 04 — Definição de Entidade

- **Capacidade:** C2

**Comando:**  
O que é uma entidade no MER?

**Alternativas:**
- A) Uma coluna de uma tabela.
- B) Um conjunto de objetos do mundo real, concretos ou abstratos, sobre os quais o sistema guarda dados.
- C) Uma senha de acesso.
- D) Um valor digitado pelo usuário.

**Gabarito:** B

---

## ITEM 05 — Ocorrência

- **Capacidade:** C2

**Comando:**  
O que é uma ocorrência (instância) de uma entidade?

**Alternativas:**
- A) Cada elemento da entidade, como a aluna Ana na entidade ALUNO.
- B) O nome da entidade em maiúsculas.
- C) Um relacionamento entre duas entidades.
- D) O desenho do retângulo.

**Gabarito:** A

---

## ITEM 06 — Entidade Abstrata

- **Capacidade:** C2

**Comando:**  
Qual destas é uma entidade abstrata, que não é um objeto físico?

**Alternativas:**
- A) CADEIRA.
- B) LIVRO impresso.
- C) COMPUTADOR.
- D) MATRÍCULA.

**Gabarito:** D

---

## ITEM 07 — Nome da Entidade

- **Capacidade:** C2

**Comando:**  
Como o nome de uma entidade é escrito na notação usada na aula?

**Alternativas:**
- A) Em minúsculas, dentro de um losango.
- B) No plural, dentro de um círculo.
- C) Com números, sem forma geométrica.
- D) No singular e em maiúsculas, dentro de um retângulo.

**Gabarito:** D

---

## ITEM 08 — Entidade ou Atributo 1

- **Capacidade:** C2

**Comando:**  
"Curso" tem nome, carga horária e valor, e há vários cursos. Ele é:

**Alternativas:**
- A) Uma entidade.
- B) Um atributo de ALUNO.
- C) Uma ocorrência de MATRÍCULA.
- D) Um relacionamento.

**Gabarito:** A

---

## ITEM 09 — Entidade ou Atributo 2

- **Capacidade:** C2

**Comando:**  
Num sistema de escola, "telefone do aluno" é:

**Alternativas:**
- A) Uma entidade associativa.
- B) Um relacionamento muitos-para-muitos.
- C) Uma entidade forte.
- D) Um atributo de ALUNO.

**Gabarito:** D

---

## ITEM 10 — Pergunta Entidade ou Atributo

- **Capacidade:** C2

**Comando:**  
Qual pergunta ajuda a decidir se algo é entidade ou atributo?

**Alternativas:**
- A) Isso tem dados próprios e várias ocorrências?
- B) Isso começa com vogal?
- C) Isso tem nome curto?
- D) Isso aparece na tela inicial?

**Gabarito:** A

---

## ITEM 11 — Entidade Forte

- **Capacidade:** C2

**Comando:**  
O que caracteriza uma entidade forte?

**Alternativas:**
- A) Depende de outra entidade para existir.
- B) Só existe dentro de um relacionamento muitos-para-muitos.
- C) Existe por si só e tem identificador próprio.
- D) Não tem atributos.

**Gabarito:** C

---

## ITEM 12 — Exemplo de Forte

- **Capacidade:** C2

**Comando:**  
Qual destas é tipicamente uma entidade forte?

**Alternativas:**
- A) ITEM_PEDIDO.
- B) DEPENDENTE de um funcionário.
- C) PARCELA de uma matrícula.
- D) CLIENTE.

**Gabarito:** D

---

## ITEM 13 — Entidade Fraca

- **Capacidade:** C2

**Comando:**  
O que caracteriza uma entidade fraca?

**Alternativas:**
- A) Fica guardada em outro servidor.
- B) É pouco usada pelo sistema.
- C) Tem poucos atributos.
- D) Depende de outra entidade, a dona, para existir e ser identificada.

**Gabarito:** D

---

## ITEM 14 — Entidade Dona

- **Capacidade:** C2

**Comando:**  
Na entidade fraca ITEM_PEDIDO, qual é a entidade dona?

**Alternativas:**
- A) PEDIDO.
- B) FORNECEDOR.
- C) CLIENTE do vizinho.
- D) PRODUTO apenas como cor.

**Gabarito:** A

---

## ITEM 15 — Identificação da Fraca

- **Capacidade:** C2

**Comando:**  
Como é identificada uma ocorrência de entidade fraca, como a parcela 3 de uma matrícula?

**Alternativas:**
- A) Pela chave da entidade dona mais um identificador parcial, como matrícula 15 e parcela 3.
- B) Pelo nome do aluno em maiúsculas.
- C) Somente pelo número 3.
- D) Pela data de hoje.

**Gabarito:** A

---

## ITEM 16 — Exclusão da Dona

- **Capacidade:** C2

**Comando:**  
O que acontece com as ocorrências de uma entidade fraca quando a dona é excluída?

**Alternativas:**
- A) Elas também deixam de existir, pois dependem da dona.
- B) Elas passam para outra dona aleatória.
- C) Nada, continuam iguais.
- D) Elas viram entidades fortes.

**Gabarito:** A

---

## ITEM 17 — Notação da Fraca

- **Capacidade:** C2

**Comando:**  
Como a entidade fraca é desenhada na notação usada na aula?

**Alternativas:**
- A) Com círculo pontilhado.
- B) Com seta vermelha.
- C) Com retângulo de linha dupla.
- D) Com triângulo.

**Gabarito:** C

---

## ITEM 18 — Dependente

- **Capacidade:** C2

**Comando:**  
Num sistema de RH, DEPENDENTE só existe ligado a um FUNCIONÁRIO. DEPENDENTE é:

**Alternativas:**
- A) Entidade fraca.
- B) Relacionamento um-para-um obrigatório entre duas fortes.
- C) Atributo do sistema operacional.
- D) Entidade forte.

**Gabarito:** A

---

## ITEM 19 — Parcela

- **Capacidade:** C2

**Comando:**  
No sistema da escola, cada matrícula gera parcelas mensais. PARCELA é:

**Alternativas:**
- A) Entidade forte, sem relação com matrícula.
- B) Entidade associativa entre PROFESSOR e CURSO.
- C) Entidade fraca, dependente de MATRÍCULA.
- D) Atributo de CURSO.

**Gabarito:** C

---

## ITEM 20 — Entidade Associativa

- **Capacidade:** C2

**Comando:**  
Quando surge uma entidade associativa?

**Alternativas:**
- A) Quando uma entidade tem só um atributo.
- B) Quando um relacionamento muitos-para-muitos tem dados próprios.
- C) Quando a entidade é forte.
- D) Quando o banco tem mais de dez tabelas.

**Gabarito:** B

---

## ITEM 21 — Matrícula Associativa

- **Capacidade:** C2

**Comando:**  
Um aluno faz várias turmas e uma turma tem vários alunos; a ligação tem data e situação. Qual entidade associativa surge?

**Alternativas:**
- A) CORES.
- B) ENDEREÇO.
- C) TELEFONE.
- D) MATRÍCULA.

**Gabarito:** D

---

## ITEM 22 — Dados da Associativa

- **Capacidade:** C2

**Comando:**  
Qual dado pertence à entidade associativa MATRÍCULA, e não ao aluno nem à turma sozinhos?

**Alternativas:**
- A) O CPF do aluno.
- B) A sala da turma.
- C) A data em que aquele aluno se matriculou naquela turma.
- D) O nome do curso.

**Gabarito:** C

---

## ITEM 23 — Item do Pedido

- **Capacidade:** C2

**Comando:**  
Um pedido tem vários produtos e um produto aparece em vários pedidos. Quantidade e preço na venda ficam em:

**Alternativas:**
- A) CLIENTE.
- B) PRODUTO apenas.
- C) ITEM_PEDIDO, que liga PEDIDO e PRODUTO.
- D) CATEGORIA.

**Gabarito:** C

---

## ITEM 24 — Notação da Associativa

- **Capacidade:** C2

**Comando:**  
Como a entidade associativa é desenhada na notação usada na aula?

**Alternativas:**
- A) Com duas setas cruzadas.
- B) Com um retângulo envolvendo o losango do relacionamento.
- C) Com um círculo vazio.
- D) Com linha tracejada sem forma.

**Gabarito:** B

---

## ITEM 25 — Passo 1

- **Capacidade:** C2

**Comando:**  
No passo a passo dos requisitos às entidades, qual é o primeiro passo?

**Alternativas:**
- A) Escrever o CREATE TABLE.
- B) Escolher as cores do DER.
- C) Ler os requisitos e sublinhar os substantivos importantes.
- D) Instalar o pgAdmin.

**Gabarito:** C

---

## ITEM 26 — Passo 2

- **Capacidade:** C2

**Comando:**  
Depois de sublinhar os substantivos, o que se descarta?

**Alternativas:**
- A) As entidades fortes.
- B) As palavras do cliente.
- C) Todas as palavras com acento.
- D) Sinônimos, atributos e o que está fora do escopo.

**Gabarito:** D

---

## ITEM 27 — Sinônimos

- **Capacidade:** C2

**Comando:**  
Nos requisitos aparecem "aluno" e "estudante" com o mesmo sentido. O que fazer?

**Alternativas:**
- A) Considerar uma só entidade, ALUNO, pois são sinônimos.
- B) Criar uma associativa entre elas.
- C) Excluir as duas.
- D) Criar duas entidades diferentes.

**Gabarito:** A

---

## ITEM 28 — Fora do Escopo

- **Capacidade:** C2

**Comando:**  
Nos requisitos da escola aparece "cantina", que ficou fora do escopo. O que fazer?

**Alternativas:**
- A) Criar uma entidade fraca de CANTINA.
- B) Não incluir como entidade na versão atual.
- C) Criar a entidade mesmo assim.
- D) Transformar em atributo de ALUNO.

**Gabarito:** B

---

## ITEM 29 — Justificativa

- **Capacidade:** C2

**Comando:**  
Por que registrar a justificativa de cada classificação de entidade?

**Alternativas:**
- A) Para explicar e defender a decisão de modelagem diante do grupo e do cliente.
- B) Porque o SGBD exige justificativa para criar tabelas.
- C) Porque a justificativa substitui o DER.
- D) Para aumentar o número de páginas.

**Gabarito:** A

---

## ITEM 30 — Turma

- **Capacidade:** C2

**Comando:**  
No exemplo da escola, TURMA tem código próprio, embora pertença a um curso. Como ela foi classificada?

**Alternativas:**
- A) Entidade associativa entre aluno e responsável.
- B) Atributo de ALUNO.
- C) Entidade fraca obrigatória.
- D) Entidade forte.

**Gabarito:** D

---

## ITEM 31 — Responsável

- **Capacidade:** C2

**Comando:**  
No exemplo da escola, RESPONSÁVEL foi classificado como:

**Alternativas:**
- A) Entidade associativa.
- B) Atributo de TURMA.
- C) Relacionamento.
- D) Entidade forte.

**Gabarito:** D

---

## ITEM 32 — Turno

- **Capacidade:** C2

**Comando:**  
No exemplo da escola, "turno" foi classificado como:

**Alternativas:**
- A) Entidade associativa.
- B) Entidade forte.
- C) Atributo de TURMA.
- D) Entidade fraca.

**Gabarito:** C

---

## ITEM 33 — Professor

- **Capacidade:** C2

**Comando:**  
No exemplo da escola, PROFESSOR é:

**Alternativas:**
- A) Atributo de PARCELA.
- B) Entidade fraca de ALUNO.
- C) Ocorrência de CURSO.
- D) Entidade forte.

**Gabarito:** D

---

## ITEM 34 — Endereço na Escola

- **Capacidade:** C2

**Comando:**  
Num sistema de escola em que só se guarda um endereço por aluno, "endereço" tende a ser:

**Alternativas:**
- A) Atributo de ALUNO.
- B) Relacionamento N:N.
- C) Entidade associativa.
- D) Entidade fraca de CURSO.

**Gabarito:** A

---

## ITEM 35 — Endereço nas Entregas

- **Capacidade:** C2

**Comando:**  
Num app de entregas em que cada cliente cadastra vários endereços com apelido (casa, trabalho), "endereço" tende a ser:

**Alternativas:**
- A) Um relacionamento sem dados.
- B) Atributo simples sem importância.
- C) Entidade, pois tem dados próprios e várias ocorrências por cliente.
- D) Uma ocorrência de PRODUTO.

**Gabarito:** C

---

## ITEM 36 — Nota Fiscal

- **Capacidade:** C2

**Comando:**  
Num sistema de loja, NOTA_FISCAL tem número, data e valor e há várias. É:

**Alternativas:**
- A) Um atributo de cor.
- B) Uma entidade.
- C) Uma ocorrência de CLIENTE.
- D) Um nível físico.

**Gabarito:** B

---

## ITEM 37 — CPF

- **Capacidade:** C2

**Comando:**  
No sistema de clientes, o CPF é:

**Alternativas:**
- A) Uma entidade fraca.
- B) Uma entidade associativa.
- C) Uma entidade forte.
- D) Um atributo de CLIENTE.

**Gabarito:** D

---

## ITEM 38 — Item 2 do Pedido

- **Capacidade:** C2

**Comando:**  
Por que "item 2" só faz sentido dentro de um pedido?

**Alternativas:**
- A) Porque todos os pedidos têm só dois itens.
- B) Porque o item é uma entidade forte.
- C) Porque o item é identificado junto com o pedido a que pertence, sendo entidade fraca.
- D) Porque o número 2 é muito pequeno.

**Gabarito:** C

---

## ITEM 39 — Associativa e Relacionamento

- **Capacidade:** C2

**Comando:**  
A entidade associativa liga quantas entidades no exemplo de MATRÍCULA?

**Alternativas:**
- A) Todas as entidades do banco.
- B) Duas: ALUNO e TURMA.
- C) Apenas ALUNO.
- D) Nenhuma.

**Gabarito:** B

---

## ITEM 40 — Diferença Fraca e Associativa

- **Capacidade:** C2

**Comando:**  
Qual é a diferença entre entidade fraca e associativa?

**Alternativas:**
- A) Não há diferença.
- B) A fraca depende de uma dona para existir; a associativa nasce de um relacionamento N:N com dados próprios.
- C) A fraca tem mais atributos que a associativa.
- D) A associativa sempre é física e a fraca sempre é abstrata.

**Gabarito:** B

---

## ITEM 41 — Dinâmica: Pilha de Atributos

- **Capacidade:** C2

**Comando:**  
Na dinâmica "Separa e classifica", em qual pilha vai o cartão "cor"?

**Alternativas:**
- A) FRACA.
- B) É ATRIBUTO.
- C) ASSOCIATIVA.
- D) FORTE.

**Gabarito:** B

---

## ITEM 42 — Dinâmica: Dependente

- **Capacidade:** C2

**Comando:**  
Na dinâmica, o cartão "dependente" vai para qual caixa, e qual é a dona escrita?

**Alternativas:**
- A) FRACA, com a dona FUNCIONÁRIO.
- B) É ATRIBUTO de cor.
- C) FORTE, sem dona.
- D) ASSOCIATIVA entre cliente e produto.

**Gabarito:** A

---

## ITEM 43 — Dinâmica: Matrícula

- **Capacidade:** C2

**Comando:**  
Na dinâmica, o cartão "matrícula" vai para qual caixa?

**Alternativas:**
- A) FORTE sem relação com aluno.
- B) ASSOCIATIVA, ligando ALUNO e TURMA.
- C) É ATRIBUTO de CPF.
- D) FRACA de PRODUTO.

**Gabarito:** B

---

## ITEM 44 — Entrega da SA 1

- **Capacidade:** C2

**Comando:**  
O que o grupo entrega nesta aula, na SA 1?

**Alternativas:**
- A) O script SQL completo do banco.
- B) A lista de entidades do sistema de matrículas, classificadas e justificadas, com as palavras descartadas.
- C) A configuração do pg_hba.conf.
- D) O backup do servidor.

**Gabarito:** B

---

## ITEM 45 — Próximo Passo

- **Capacidade:** C2

**Comando:**  
Depois das entidades, o que se define na próxima aula da modelagem?

**Alternativas:**
- A) O backup diário.
- B) Os atributos de cada entidade.
- C) O cronograma final.
- D) A porta do servidor.

**Gabarito:** B

---

## ITEM 46 — Entidade Sem Ocorrências

- **Capacidade:** C2

**Comando:**  
Uma "entidade" que sempre terá uma única ocorrência e nenhum dado próprio, como "Escola Única", provavelmente:

**Alternativas:**
- A) Deve ser entidade fraca de todas.
- B) É obrigatória em todo MER.
- C) Não precisa ser entidade no modelo, podendo virar configuração ou ser descartada.
- D) Deve ser associativa entre todas.

**Gabarito:** C

---

## ITEM 47 — Paciente e Consulta

- **Capacidade:** C2

**Comando:**  
Num sistema de clínica, PACIENTE e MÉDICO se ligam por consultas com data, hora e diagnóstico. CONSULTA é:

**Alternativas:**
- A) Atributo de PACIENTE.
- B) Entidade associativa entre PACIENTE e MÉDICO.
- C) Entidade fraca de DIAGNÓSTICO.
- D) Um nível físico.

**Gabarito:** B

---

## ITEM 48 — Produto

- **Capacidade:** C2

**Comando:**  
Numa loja, PRODUTO com nome, preço e estoque é:

**Alternativas:**
- A) Atributo de CLIENTE.
- B) Associativa entre preço e estoque.
- C) Entidade forte.
- D) Entidade fraca de ITEM_PEDIDO.

**Gabarito:** C

---

## ITEM 49 — Ordem da Modelagem

- **Capacidade:** C2

**Comando:**  
Qual é a ordem da modelagem conceitual seguida na UC?

**Alternativas:**
- A) Entidades, atributos, relacionamentos e DER.
- B) DER, tabelas, entidades e requisitos.
- C) Backup, entidades, instalação e DER.
- D) Atributos, senha, porta e entidades.

**Gabarito:** A

---

## ITEM 50 — Identificador Próprio

- **Capacidade:** C2

**Comando:**  
Por que ALUNO é considerada forte?

**Alternativas:**
- A) Porque é a primeira entidade criada.
- B) Porque existe sozinha e é identificada pelo seu próprio identificador, como id ou CPF.
- C) Porque depende de TURMA.
- D) Porque tem muitos alunos.

**Gabarito:** B
