# Atividade: Relacionamentos 1:1, 1:N e N:N — 50 Questões

- **Aula:** 08
- **Tema:** Relacionamentos 1:1, 1:N e N:N
- **Ícone:** 🔗
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os procedimentos do modelo entidade-relacionamento nos relacionamentos: relacionamento e verbo, leitura nos dois sentidos, cardinalidade máxima 1:1, 1:N e N:N, cardinalidade mínima (participação obrigatória ou opcional), notação (mín, máx) e pé de galinha, autorrelacionamento, implementação por chave estrangeira ou tabela associativa e erros comuns.
- **Conteúdo-base:** ../CONTEUDO/AULA-08-RELACIONAMENTOS-1-1-1-N-E-N-N.md
- **Slides:** ../AULAS/AULA-08-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-08-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Definição de Relacionamento

- **Capacidade:** C2

**Comando:**  
O que é um relacionamento no MER?

**Alternativas:**
- A) A associação entre entidades que o sistema precisa registrar.
- B) Uma ocorrência de entidade.
- C) Um atributo composto.
- D) Um usuário do banco.

**Gabarito:** A

---

## ITEM 02 — Nome do Relacionamento

- **Capacidade:** C2

**Comando:**  
Como um relacionamento costuma ser nomeado?

**Alternativas:**
- A) Com uma cor.
- B) Com o nome do servidor.
- C) Com um número de porta.
- D) Com um verbo, como "faz", "oferece" ou "realiza".

**Gabarito:** D

---

## ITEM 03 — Notação do Relacionamento

- **Capacidade:** C2

**Comando:**  
No DER usado na aula, como o relacionamento é desenhado?

**Alternativas:**
- A) Como uma elipse solta.
- B) Como um retângulo de linha dupla.
- C) Como um triângulo.
- D) Como um losango ligando as entidades.

**Gabarito:** D

---

## ITEM 04 — Duas Perguntas

- **Capacidade:** C2

**Comando:**  
Como descobrir a cardinalidade máxima de um relacionamento entre A e B?

**Alternativas:**
- A) Contando o número de atributos de A.
- B) Perguntando quantos B um A tem no máximo e quantos A um B tem no máximo.
- C) Olhando o tamanho do nome das entidades.
- D) Perguntando só quantos B um A tem.

**Gabarito:** B

---

## ITEM 05 — Leitura num Sentido Só

- **Capacidade:** C2

**Comando:**  
Qual é o risco de ler a frase do relacionamento num sentido só?

**Alternativas:**
- A) A tabela perder os acentos.
- B) O servidor mudar de porta.
- C) O banco ficar sem senha.
- D) Marcar 1:N quando, na verdade, o relacionamento é N:N.

**Gabarito:** D

---

## ITEM 06 — Um para Um

- **Capacidade:** C2

**Comando:**  
O que caracteriza um relacionamento 1:1?

**Alternativas:**
- A) Várias de um lado se ligam a várias do outro.
- B) Uma ocorrência de um lado se liga a várias do outro.
- C) Cada ocorrência de um lado se liga a no máximo uma do outro lado.
- D) Nenhuma ocorrência se liga.

**Gabarito:** C

---

## ITEM 07 — Exemplo de 1:1

- **Capacidade:** C2

**Comando:**  
Qual destes é um exemplo de relacionamento 1:1?

**Alternativas:**
- A) Um cliente faz vários pedidos.
- B) Um funcionário tem um crachá e um crachá pertence a um funcionário.
- C) Um aluno faz várias turmas e uma turma tem vários alunos.
- D) Um curso tem várias turmas.

**Gabarito:** B

---

## ITEM 08 — Implementação do 1:1

- **Capacidade:** C2

**Comando:**  
Como um relacionamento 1:1 costuma ser implementado nas tabelas?

**Alternativas:**
- A) Com chave estrangeira com UNIQUE num dos lados, ou juntando numa só tabela.
- B) Sem nenhuma ligação entre as tabelas.
- C) Com uma tabela associativa obrigatória.
- D) Com a chave estrangeira repetida nos dois lados sem restrição.

**Gabarito:** A

---

## ITEM 09 — Um para Muitos

- **Capacidade:** C2

**Comando:**  
O que caracteriza um relacionamento 1:N?

**Alternativas:**
- A) Uma ocorrência de um lado se liga a várias do outro, e cada uma destas se liga a uma só.
- B) Cada ocorrência se liga a uma só nos dois lados.
- C) Nenhuma ocorrência se repete.
- D) Várias se ligam a várias nos dois lados.

**Gabarito:** A

---

## ITEM 10 — Exemplo de 1:N

- **Capacidade:** C2

**Comando:**  
"Um curso tem várias turmas; uma turma é de um curso." Qual é a cardinalidade?

**Alternativas:**
- A) 0:0.
- B) 1:N.
- C) N:N.
- D) 1:1.

**Gabarito:** B

---

## ITEM 11 — Chave Estrangeira no 1:N

- **Capacidade:** C2

**Comando:**  
Num relacionamento 1:N entre CURSO e TURMA, onde fica a chave estrangeira?

**Alternativas:**
- A) Numa tabela associativa obrigatória.
- B) Em CURSO, que guarda a lista de turmas.
- C) Em TURMA, o lado N, que guarda o id do curso.
- D) Em nenhuma das duas.

**Gabarito:** C

---

## ITEM 12 — Cliente e Pedido

- **Capacidade:** C2

**Comando:**  
"Um cliente faz vários pedidos; um pedido é de um cliente." Onde fica a chave estrangeira?

**Alternativas:**
- A) Em PEDIDO, com o id do cliente.
- B) Em PRODUTO.
- C) Em nenhuma tabela.
- D) Em CLIENTE, com a lista de pedidos.

**Gabarito:** A

---

## ITEM 13 — Muitos para Muitos

- **Capacidade:** C2

**Comando:**  
O que caracteriza um relacionamento N:N?

**Alternativas:**
- A) Nenhuma ocorrência se liga.
- B) Uma de um lado se liga a várias do outro, e não o contrário.
- C) Várias ocorrências de um lado se ligam a várias do outro.
- D) Uma de cada lado.

**Gabarito:** C

---

## ITEM 14 — Exemplo de N:N

- **Capacidade:** C2

**Comando:**  
"Um aluno faz várias turmas; uma turma tem vários alunos." Qual é a cardinalidade?

**Alternativas:**
- A) N:N.
- B) 1:1.
- C) 0:1.
- D) 1:N.

**Gabarito:** A

---

## ITEM 15 — Implementação do N:N

- **Capacidade:** C2

**Comando:**  
Como um relacionamento N:N é implementado nas tabelas?

**Alternativas:**
- A) Com uma tabela associativa no meio, contendo as duas chaves estrangeiras.
- B) Com uma chave estrangeira em apenas um dos lados.
- C) Juntando as duas entidades numa só tabela.
- D) Sem nenhuma ligação.

**Gabarito:** A

---

## ITEM 16 — Associativa do Pedido

- **Capacidade:** C2

**Comando:**  
O relacionamento N:N entre PEDIDO e PRODUTO é resolvido por qual tabela?

**Alternativas:**
- A) CATEGORIA.
- B) FORNECEDOR.
- C) CLIENTE.
- D) ITEM_PEDIDO, com id do pedido, id do produto, quantidade e preço.

**Gabarito:** D

---

## ITEM 17 — Associativa da Escola

- **Capacidade:** C2

**Comando:**  
O relacionamento N:N entre ALUNO e TURMA é resolvido por qual tabela?

**Alternativas:**
- A) PROFESSOR.
- B) CURSO.
- C) PARCELA.
- D) MATRÍCULA.

**Gabarito:** D

---

## ITEM 18 — N:N sem Associativa

- **Capacidade:** C2

**Comando:**  
Qual é o erro de deixar um relacionamento N:N sem tabela associativa?

**Alternativas:**
- A) O banco fica mais rápido.
- B) Nenhum erro, é o recomendado.
- C) O relacionamento vira 1:1.
- D) Não há onde guardar as ligações e os dados próprios de cada combinação.

**Gabarito:** D

---

## ITEM 19 — FK no Lado 1

- **Capacidade:** C2

**Comando:**  
Qual é o erro de colocar a chave estrangeira no lado 1 de um 1:N, como em CURSO?

**Alternativas:**
- A) O curso perde o nome.
- B) O curso teria de guardar uma lista de turmas num campo só, o que não funciona bem.
- C) Nenhum erro.
- D) A turma deixa de existir.

**Gabarito:** B

---

## ITEM 20 — Cardinalidade Mínima

- **Capacidade:** C2

**Comando:**  
O que a cardinalidade mínima indica?

**Alternativas:**
- A) O tamanho do texto do atributo.
- B) Se a participação no relacionamento é obrigatória (1) ou opcional (0).
- C) A porta do servidor.
- D) O número máximo de ligações.

**Gabarito:** B

---

## ITEM 21 — Participação Opcional

- **Capacidade:** C2

**Comando:**  
"Um cliente pode estar cadastrado sem nenhum pedido." Qual é a cardinalidade mínima do lado do pedido para o cliente?

**Alternativas:**
- A) N, muitos obrigatórios.
- B) 1, participação obrigatória.
- C) 0, participação opcional.
- D) Não existe mínima.

**Gabarito:** C

---

## ITEM 22 — Participação Obrigatória

- **Capacidade:** C2

**Comando:**  
"Todo pedido precisa ter um cliente." Qual é a cardinalidade mínima do pedido em relação ao cliente?

**Alternativas:**
- A) 1, participação obrigatória.
- B) N.
- C) 0, participação opcional.
- D) Indefinida.

**Gabarito:** A

---

## ITEM 23 — Leitura da Notação

- **Capacidade:** C2

**Comando:**  
Como se lê CLIENTE (1,1) —faz— (0,N) PEDIDO?

**Alternativas:**
- A) Um pedido tem de 0 a N clientes.
- B) Um cliente faz de 0 a N pedidos; um pedido é feito por exatamente 1 cliente.
- C) Clientes e pedidos não se ligam.
- D) Um cliente faz exatamente 1 pedido.

**Gabarito:** B

---

## ITEM 24 — Pé de Galinha

- **Capacidade:** C2

**Comando:**  
Na notação pé de galinha, o tridente indica:

**Alternativas:**
- A) Muitos.
- B) Atributo composto.
- C) Um.
- D) Zero.

**Gabarito:** A

---

## ITEM 25 — Círculo no Pé de Galinha

- **Capacidade:** C2

**Comando:**  
Na notação pé de galinha, o círculo indica:

**Alternativas:**
- A) Chave primária.
- B) Zero, participação opcional.
- C) Entidade fraca.
- D) Muitos.

**Gabarito:** B

---

## ITEM 26 — Traço no Pé de Galinha

- **Capacidade:** C2

**Comando:**  
Na notação pé de galinha, o traço indica:

**Alternativas:**
- A) Zero.
- B) Muitos.
- C) Atributo opcional.
- D) Um.

**Gabarito:** D

---

## ITEM 27 — Autorrelacionamento

- **Capacidade:** C2

**Comando:**  
O que é um autorrelacionamento?

**Alternativas:**
- A) Duas entidades com o mesmo nome.
- B) Um relacionamento sem verbo.
- C) Um relacionamento entre três entidades.
- D) Uma entidade que se relaciona com ela mesma.

**Gabarito:** D

---

## ITEM 28 — Exemplo de Autorrelacionamento

- **Capacidade:** C2

**Comando:**  
Qual é um exemplo de autorrelacionamento?

**Alternativas:**
- A) Um cliente faz vários pedidos.
- B) Um aluno faz várias turmas.
- C) Um curso tem várias turmas.
- D) Um funcionário supervisiona vários funcionários.

**Gabarito:** D

---

## ITEM 29 — Implementação do Autorrelacionamento

- **Capacidade:** C2

**Comando:**  
Como é implementado o autorrelacionamento 1:N "funcionário supervisiona funcionários"?

**Alternativas:**
- A) Com dois bancos de dados.
- B) Com uma chave estrangeira id_supervisor que aponta para a própria tabela FUNCIONÁRIO.
- C) Sem chave estrangeira.
- D) Com uma tabela CLIENTE.

**Gabarito:** B

---

## ITEM 30 — Pré-requisito

- **Capacidade:** C2

**Comando:**  
"Um curso pode ser pré-requisito de vários cursos, e um curso pode ter vários pré-requisitos." Qual é o tipo?

**Alternativas:**
- A) Atributo composto de CURSO.
- B) Autorrelacionamento N:N em CURSO.
- C) Relacionamento 1:1 entre CURSO e ALUNO.
- D) Entidade fraca de TURMA.

**Gabarito:** B

---

## ITEM 31 — Cupom e Pedido

- **Capacidade:** C2

**Comando:**  
"Cada pedido tem um só cupom, mas um cupom pode ser usado em vários pedidos." Qual é a cardinalidade entre CUPOM e PEDIDO?

**Alternativas:**
- A) 1:1, com UNIQUE.
- B) 1:N, com a chave estrangeira do cupom em PEDIDO.
- C) N:N, com tabela associativa obrigatória.
- D) Nenhum relacionamento.

**Gabarito:** B

---

## ITEM 32 — Aluno e Armário

- **Capacidade:** C2

**Comando:**  
"Um aluno tem um armário e um armário é de um aluno." Qual é a cardinalidade?

**Alternativas:**
- A) Autorrelacionamento.
- B) N:N.
- C) 1:N.
- D) 1:1.

**Gabarito:** D

---

## ITEM 33 — Médico e Paciente

- **Capacidade:** C2

**Comando:**  
"Um médico atende vários pacientes e um paciente é atendido por vários médicos." Como implementar?

**Alternativas:**
- A) Com uma tabela associativa, como CONSULTA, entre MÉDICO e PACIENTE.
- B) Com UNIQUE no paciente.
- C) Com a chave do médico em PACIENTE apenas.
- D) Juntando médico e paciente na mesma tabela.

**Gabarito:** A

---

## ITEM 34 — Matrícula e Parcela

- **Capacidade:** C2

**Comando:**  
"Cada matrícula gera uma ou mais parcelas; cada parcela é de uma matrícula." Qual é a cardinalidade completa?

**Alternativas:**
- A) MATRÍCULA (1,1) — (1,1) PARCELA.
- B) MATRÍCULA (0,N) — (0,N) PARCELA.
- C) MATRÍCULA (1,1) — (1,N) PARCELA.
- D) Não há relacionamento.

**Gabarito:** C

---

## ITEM 35 — Responsável e Aluno

- **Capacidade:** C2

**Comando:**  
No exemplo da escola, RESPONSÁVEL (1,1) — (0,N) ALUNO significa:

**Alternativas:**
- A) Responsável e aluno não se ligam.
- B) Um responsável responde por zero ou mais alunos, e cada aluno tem exatamente um responsável cadastrado.
- C) Cada responsável tem exatamente um aluno.
- D) Um aluno tem vários responsáveis obrigatórios.

**Gabarito:** B

---

## ITEM 36 — Professor e Turma

- **Capacidade:** C2

**Comando:**  
No exemplo da escola, por que PROFESSOR e TURMA são N:N?

**Alternativas:**
- A) Porque professor é atributo de turma.
- B) Porque um professor dá aula em várias turmas e uma turma pode ter mais de um professor.
- C) Porque turma é entidade fraca de professor.
- D) Porque cada turma tem um único professor para sempre.

**Gabarito:** B

---

## ITEM 37 — Curso e Turma na Escola

- **Capacidade:** C2

**Comando:**  
No exemplo da escola, CURSO (1,1) — (0,N) TURMA indica que:

**Alternativas:**
- A) Curso e turma não se relacionam.
- B) Cada curso tem exatamente uma turma.
- C) Um curso pode ter nenhuma ou várias turmas, e cada turma pertence a exatamente um curso.
- D) Uma turma pode ter vários cursos.

**Gabarito:** C

---

## ITEM 38 — Obrigatória sem Perguntar

- **Capacidade:** C2

**Comando:**  
Qual é o erro de marcar uma participação como obrigatória sem perguntar ao cliente?

**Alternativas:**
- A) O banco pode passar a recusar cadastros que o cliente precisa fazer, como cliente sem pedido.
- B) Nenhum erro.
- C) O DER perde o losango.
- D) O banco fica sem tabelas.

**Gabarito:** A

---

## ITEM 39 — FK e Referencial

- **Capacidade:** C2

**Comando:**  
A chave estrangeira do lado N de um 1:N corresponde a qual tipo de atributo da aula 7?

**Alternativas:**
- A) Atributo referencial.
- B) Atributo composto de endereço.
- C) Atributo descritivo de cor.
- D) Atributo opcional sem uso.

**Gabarito:** A

---

## ITEM 40 — Dados da Ligação

- **Capacidade:** C2

**Comando:**  
Num N:N, onde ficam os dados próprios da ligação, como quantidade e preço de venda?

**Alternativas:**
- A) No nome do relacionamento.
- B) Na tabela associativa.
- C) No servidor de banco, fora das tabelas.
- D) Na entidade do lado esquerdo.

**Gabarito:** B

---

## ITEM 41 — Dinâmica: Duas Perguntas em Voz Alta

- **Capacidade:** C2

**Comando:**  
Na dinâmica "Quantos de cada lado?", por que a dupla faz as duas perguntas em voz alta?

**Alternativas:**
- A) Para decorar os comandos SQL.
- B) Para treinar a pronúncia dos nomes.
- C) Para não esquecer de analisar os dois sentidos do relacionamento.
- D) Para descobrir a porta do servidor.

**Gabarito:** C

---

## ITEM 42 — Dinâmica: Divergência

- **Capacidade:** C2

**Comando:**  
Na dinâmica, quando duas duplas divergem sobre a cardinalidade, o que fazem?

**Alternativas:**
- A) Cada uma justifica a partir da frase do cliente.
- B) Escolhem a resposta da dupla mais rápida.
- C) Apagam o cartão.
- D) Sorteiam a cardinalidade.

**Gabarito:** A

---

## ITEM 43 — Entrega da SA 1

- **Capacidade:** C2

**Comando:**  
O que o grupo entrega nesta aula, na SA 1?

**Alternativas:**
- A) A lista dos relacionamentos com verbo, cardinalidades mínima e máxima, frase de leitura e forma de implementação.
- B) Somente a lista de atributos.
- C) A instalação do PostgreSQL.
- D) O backup do banco.

**Gabarito:** A

---

## ITEM 44 — Próximo Passo

- **Capacidade:** C2

**Comando:**  
Com entidades, atributos e relacionamentos definidos, o que se faz na aula 9?

**Alternativas:**
- A) A configuração do firewall.
- B) A normalização até a 5FN.
- C) O diagrama entidade-relacionamento (DER).
- D) O backup do servidor.

**Gabarito:** C

---

## ITEM 45 — Turma e Sala

- **Capacidade:** C2

**Comando:**  
"Uma turma usa uma sala por semestre, e uma sala é usada por várias turmas em horários diferentes." Qual é a cardinalidade entre SALA e TURMA?

**Alternativas:**
- A) Nenhum relacionamento.
- B) 1:1.
- C) 1:N, com a sala referenciada em TURMA.
- D) N:N obrigatório com associativa.

**Gabarito:** C

---

## ITEM 46 — Produto e Categoria

- **Capacidade:** C2

**Comando:**  
"Cada produto pertence a uma categoria; uma categoria tem vários produtos." Onde fica a chave estrangeira?

**Alternativas:**
- A) Em CLIENTE.
- B) Numa tabela associativa obrigatória.
- C) Em PRODUTO, com o id da categoria.
- D) Em CATEGORIA, com a lista de produtos.

**Gabarito:** C

---

## ITEM 47 — Autor e Livro

- **Capacidade:** C2

**Comando:**  
"Um livro pode ter vários autores e um autor escreve vários livros." Qual é a implementação?

**Alternativas:**
- A) Juntar autor e livro numa só tabela.
- B) Chave do autor dentro de LIVRO apenas.
- C) Tabela associativa LIVRO_AUTOR com o id do livro e o id do autor.
- D) UNIQUE no autor.

**Gabarito:** C

---

## ITEM 48 — Cardinalidade Máxima e Mínima

- **Capacidade:** C2

**Comando:**  
Qual é a diferença entre cardinalidade máxima e mínima?

**Alternativas:**
- A) São a mesma coisa.
- B) A máxima é sempre zero.
- C) A mínima define o tipo de dado.
- D) A máxima diz quantos no máximo se ligam; a mínima diz se a ligação é obrigatória ou opcional.

**Gabarito:** D

---

## ITEM 49 — Ligação com a Aula 6

- **Capacidade:** C2

**Comando:**  
A tabela associativa que resolve um N:N corresponde a qual conceito da aula 6?

**Alternativas:**
- A) Ocorrência.
- B) Entidade fraca de linha dupla sem relação.
- C) Entidade associativa.
- D) Atributo simples.

**Gabarito:** C

---

## ITEM 50 — Verbo nos Dois Sentidos

- **Capacidade:** C2

**Comando:**  
Em CLIENTE —faz— PEDIDO, como fica a leitura no sentido contrário?

**Alternativas:**
- A) Um pedido faz vários clientes.
- B) O pedido não pode ser lido ao contrário.
- C) Um cliente é feito por um pedido.
- D) Um pedido é feito por um cliente.

**Gabarito:** D
