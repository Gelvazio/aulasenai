# Atividade: Normalização de Dados (1FN, 2FN e 3FN) — 50 Questões

- **Aula:** 10
- **Tema:** Normalização de Dados (1FN, 2FN e 3FN)
- **Ícone:** 🧹
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os procedimentos de normalização de dados: objetivo da normalização, anomalias de inserção, atualização e exclusão, dependência funcional, primeira forma normal (valores atômicos e sem grupos repetidos), segunda forma normal (sem dependência parcial), terceira forma normal (sem dependência transitiva), conferência com o DER e desnormalização justificada.
- **Conteúdo-base:** ../CONTEUDO/AULA-10-NORMALIZACAO-DE-DADOS-1FN-2FN-3FN.md
- **Slides:** ../AULAS/AULA-10-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-10-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Objetivo da Normalização

- **Capacidade:** C3

**Comando:**  
Qual é o objetivo da normalização?

**Alternativas:**
- A) Trocar a porta do servidor.
- B) Organizar as tabelas para que cada fato seja guardado uma única vez, evitando redundância e anomalias.
- C) Deixar o banco com o maior número possível de colunas por tabela.
- D) Apagar dados antigos.

**Gabarito:** B

---

## ITEM 02 — Benefício da Normalização

- **Capacidade:** C3

**Comando:**  
Qual é um benefício da normalização?

**Alternativas:**
- A) Dispensar chaves primárias.
- B) Guardar o mesmo dado em várias tabelas.
- C) Eliminar a necessidade de SQL.
- D) Alterar um dado em um só lugar, valendo para todo o sistema.

**Gabarito:** D

---

## ITEM 03 — Anomalia de Inserção

- **Capacidade:** C3

**Comando:**  
Na planilha "tudo junto" da escola, não dá para cadastrar um curso sem ter um aluno matriculado. Que anomalia é essa?

**Alternativas:**
- A) Anomalia de inserção.
- B) Anomalia de exclusão.
- C) Anomalia de atualização.
- D) Não é anomalia.

**Gabarito:** A

---

## ITEM 04 — Anomalia de Atualização

- **Capacidade:** C3

**Comando:**  
A carga do Excel mudou e foi alterada em só algumas linhas da planilha. Que anomalia é essa?

**Alternativas:**
- A) Normalização correta.
- B) Anomalia de inserção.
- C) Anomalia de exclusão.
- D) Anomalia de atualização.

**Gabarito:** D

---

## ITEM 05 — Anomalia de Exclusão

- **Capacidade:** C3

**Comando:**  
Ao apagar a única matrícula do curso de Python, a escola perde a informação de que o curso existe. Que anomalia é essa?

**Alternativas:**
- A) Integridade garantida.
- B) Anomalia de exclusão.
- C) Anomalia de atualização.
- D) Anomalia de inserção.

**Gabarito:** B

---

## ITEM 06 — Dependência Funcional

- **Capacidade:** C3

**Comando:**  
O que significa a dependência funcional A → B?

**Alternativas:**
- A) A e B são sempre iguais.
- B) Conhecendo A, sabe-se um único valor de B.
- C) B é a chave primária de A.
- D) A e B ficam sempre em tabelas diferentes, sem ligação.

**Gabarito:** B

---

## ITEM 07 — Exemplo de Dependência

- **Capacidade:** C3

**Comando:**  
Qual destas é uma dependência funcional correta no sistema da escola?

**Alternativas:**
- A) turno → id_turma.
- B) carga_curso → id_curso.
- C) id_aluno → nome do aluno.
- D) nome do aluno → id_aluno, sempre.

**Gabarito:** C

---

## ITEM 08 — Curso e Carga

- **Capacidade:** C3

**Comando:**  
A dependência curso → carga_curso indica que:

**Alternativas:**
- A) Conhecendo o curso, sabe-se a sua carga horária.
- B) O curso não tem carga.
- C) A carga define o curso de forma única.
- D) Conhecendo a carga, sabe-se o aluno.

**Gabarito:** A

---

## ITEM 09 — Definição de 1FN

- **Capacidade:** C3

**Comando:**  
Quando uma tabela está na primeira forma normal (1FN)?

**Alternativas:**
- A) Quando cada célula pode ter vários valores separados por vírgula.
- B) Quando tem colunas telefone1, telefone2 e telefone3.
- C) Quando todos os valores são atômicos, não há grupos repetidos e existe chave primária.
- D) Quando não tem nenhuma chave.

**Gabarito:** C

---

## ITEM 10 — Valor Atômico

- **Capacidade:** C3

**Comando:**  
O que é um valor atômico?

**Alternativas:**
- A) Um valor nulo obrigatório.
- B) Um valor criptografado.
- C) Um único valor por célula.
- D) Um valor com muitos dados separados por vírgula.

**Gabarito:** C

---

## ITEM 11 — Telefones na Mesma Célula

- **Capacidade:** C3

**Comando:**  
A célula "99999-1111, 98888-2222" fere qual forma normal?

**Alternativas:**
- A) Nenhuma.
- B) 2FN.
- C) 1FN, porque a célula tem mais de um valor.
- D) 3FN.

**Gabarito:** C

---

## ITEM 12 — Grupos Repetidos

- **Capacidade:** C3

**Comando:**  
As colunas telefone1, telefone2 e telefone3 são exemplo de:

**Alternativas:**
- A) Atributo referencial.
- B) Dependência transitiva.
- C) Chave composta correta.
- D) Grupo repetido, que fere a 1FN.

**Gabarito:** D

---

## ITEM 13 — Solução para a 1FN

- **Capacidade:** C3

**Comando:**  
Como resolver os vários telefones do aluno para atingir a 1FN?

**Alternativas:**
- A) Criar a tabela TELEFONE_ALUNO (id_aluno, telefone), com uma linha por telefone.
- B) Criar 10 colunas de telefone.
- C) Juntar todos os telefones num campo de texto maior.
- D) Apagar os telefones extras.

**Gabarito:** A

---

## ITEM 14 — Definição de 2FN

- **Capacidade:** C3

**Comando:**  
Quando uma tabela está na segunda forma normal (2FN)?

**Alternativas:**
- A) Quando tem exatamente duas colunas.
- B) Quando tem duas chaves primárias.
- C) Quando não está na 1FN.
- D) Quando está na 1FN e todo atributo não chave depende da chave inteira.

**Gabarito:** D

---

## ITEM 15 — Dependência Parcial

- **Capacidade:** C3

**Comando:**  
O que é dependência parcial?

**Alternativas:**
- A) Quando um atributo depende de outro atributo não chave.
- B) Quando a tabela não tem chave.
- C) Quando um atributo depende só de uma parte de uma chave composta.
- D) Quando o atributo é composto.

**Gabarito:** C

---

## ITEM 16 — 2FN e Chave Simples

- **Capacidade:** C3

**Comando:**  
Uma tabela na 1FN com chave primária simples, de uma só coluna, pode ter dependência parcial?

**Alternativas:**
- A) Sim, sempre.
- B) Só se a chave for texto.
- C) Não, a dependência parcial só ocorre com chave composta.
- D) Sim, se tiver mais de dez colunas.

**Gabarito:** C

---

## ITEM 17 — Nome do Aluno na Matrícula

- **Capacidade:** C3

**Comando:**  
Na tabela com chave (id_aluno, id_turma), o atributo nome_aluno depende só de id_aluno. O que fazer?

**Alternativas:**
- A) Mover nome_aluno para a tabela ALUNO.
- B) Apagar a tabela ALUNO.
- C) Deixar nome_aluno na tabela de matrículas.
- D) Copiar nome_aluno para TURMA.

**Gabarito:** A

---

## ITEM 18 — Turno na Matrícula

- **Capacidade:** C3

**Comando:**  
Na tabela com chave (id_aluno, id_turma), o turno depende só de id_turma. Para onde ele vai?

**Alternativas:**
- A) Fica na matrícula.
- B) Para a tabela TURMA.
- C) Para a tabela ALUNO.
- D) Para a tabela TELEFONE_ALUNO.

**Gabarito:** B

---

## ITEM 19 — Data da Matrícula

- **Capacidade:** C3

**Comando:**  
Na tabela com chave (id_aluno, id_turma), por que data_matricula fica nela?

**Alternativas:**
- A) Porque depende da chave inteira: da combinação daquele aluno com aquela turma.
- B) Porque datas nunca saem de tabela nenhuma.
- C) Porque depende só do aluno.
- D) Porque depende só da turma.

**Gabarito:** A

---

## ITEM 20 — Definição de 3FN

- **Capacidade:** C3

**Comando:**  
Quando uma tabela está na terceira forma normal (3FN)?

**Alternativas:**
- A) Quando tem exatamente três tabelas.
- B) Quando está só na 1FN.
- C) Quando está na 2FN e nenhum atributo não chave depende de outro atributo não chave.
- D) Quando tem três chaves primárias.

**Gabarito:** C

---

## ITEM 21 — Dependência Transitiva

- **Capacidade:** C3

**Comando:**  
O que é dependência transitiva?

**Alternativas:**
- A) Quando A → B e B → C, fazendo C depender da chave por meio de outro atributo não chave.
- B) Quando o valor é atômico.
- C) Quando a tabela tem chave composta.
- D) Quando o atributo depende da chave inteira.

**Gabarito:** A

---

## ITEM 22 — Carga do Curso na Turma

- **Capacidade:** C3

**Comando:**  
Em TURMA (id_turma, turno, id_curso, nome_curso, carga_curso), por que nome_curso e carga_curso ferem a 3FN?

**Alternativas:**
- A) Porque dependem do curso, e não diretamente da turma (dependência transitiva).
- B) Porque dependem só de parte da chave composta.
- C) Porque são valores não atômicos.
- D) Porque não têm acento.

**Gabarito:** A

---

## ITEM 23 — Correção da 3FN

- **Capacidade:** C3

**Comando:**  
Como corrigir TURMA (id_turma, turno, id_curso, nome_curso, carga_curso) para a 3FN?

**Alternativas:**
- A) Juntar TURMA e CURSO em uma só tabela com todos os campos.
- B) Copiar a carga para ALUNO.
- C) Apagar id_curso de TURMA.
- D) Criar CURSO (id_curso, nome_curso, carga_curso) e deixar em TURMA só id_curso como chave estrangeira.

**Gabarito:** D

---

## ITEM 24 — Regra de Bolso

- **Capacidade:** C3

**Comando:**  
Qual frase resume as três formas normais?

**Alternativas:**
- A) Toda tabela deve repetir o nome do cliente.
- B) Cada tabela deve ter o maior número de colunas possível.
- C) Cada atributo depende do usuário que o criou.
- D) Cada atributo depende da chave, da chave inteira e de nada além da chave.

**Gabarito:** D

---

## ITEM 25 — Ordem das Formas Normais

- **Capacidade:** C3

**Comando:**  
Qual é a ordem correta para normalizar?

**Alternativas:**
- A) 2FN, depois 3FN, sem 1FN.
- B) Qualquer ordem dá o mesmo resultado.
- C) 3FN, depois 1FN.
- D) 1FN, depois 2FN, depois 3FN.

**Gabarito:** D

---

## ITEM 26 — Resultado da Escola

- **Capacidade:** C3

**Comando:**  
Qual conjunto de tabelas resulta da normalização da planilha da escola?

**Alternativas:**
- A) ALUNO, TELEFONE_ALUNO, CURSO, TURMA e MATRICULA.
- B) Apenas ALUNO e CURSO.
- C) PLANILHA1 e PLANILHA2.
- D) Uma única tabela com todos os campos.

**Gabarito:** A

---

## ITEM 27 — Normalização e DER

- **Capacidade:** C3

**Comando:**  
Depois de normalizar, as tabelas devem ser conferidas com:

**Alternativas:**
- A) O manual do sistema operacional.
- B) O DER da aula 9, para ver se coincidem com as entidades e associativas.
- C) A lista de senhas.
- D) O arquivo pg_hba.conf.

**Gabarito:** B

---

## ITEM 28 — Mudança da Carga

- **Capacidade:** C3

**Comando:**  
Depois da normalização, a carga do Excel muda para 44 h. Quantos lugares precisam ser alterados?

**Alternativas:**
- A) Nenhum, a carga não pode mudar.
- B) Um só: a linha do Excel na tabela CURSO.
- C) Todas as linhas de matrícula do Excel.
- D) Todas as turmas do Excel.

**Gabarito:** B

---

## ITEM 29 — Pedido com Dados do Cliente

- **Capacidade:** C3

**Comando:**  
PEDIDO (id_pedido, data, id_cliente, nome_cliente, cidade_cliente) fere qual forma normal?

**Alternativas:**
- A) 1FN, pois tem chave simples.
- B) 2FN, pois tem chave composta.
- C) 3FN, pois nome e cidade dependem do cliente, não do pedido.
- D) Nenhuma.

**Gabarito:** C

---

## ITEM 30 — Correção do Pedido

- **Capacidade:** C3

**Comando:**  
Como normalizar PEDIDO (id_pedido, data, id_cliente, nome_cliente, cidade_cliente)?

**Alternativas:**
- A) PEDIDO com todos os campos e CLIENTE vazio.
- B) PEDIDO (id_pedido, data, id_cliente) e CLIENTE (id_cliente, nome, cidade).
- C) Apagar o cliente do pedido.
- D) Juntar PEDIDO e PRODUTO.

**Gabarito:** B

---

## ITEM 31 — Item do Pedido

- **Capacidade:** C3

**Comando:**  
ITEM_PEDIDO (id_pedido, id_produto, quantidade, nome_produto) tem nome_produto dependendo só de id_produto. Que forma normal é ferida?

**Alternativas:**
- A) 1FN.
- B) 2FN, por dependência parcial da chave composta.
- C) Nenhuma.
- D) 3FN apenas.

**Gabarito:** B

---

## ITEM 32 — Preço no Item

- **Capacidade:** C3

**Comando:**  
Por que guardar o preço unitário no ITEM_PEDIDO não é, necessariamente, um erro de normalização?

**Alternativas:**
- A) Porque o preço nunca muda.
- B) Porque normalização não vale para preços.
- C) Porque o item não tem chave.
- D) Porque é o preço daquela venda (histórico), que não deve mudar quando o preço atual do produto mudar.

**Gabarito:** D

---

## ITEM 33 — Desnormalização

- **Capacidade:** C3

**Comando:**  
O que é desnormalização?

**Alternativas:**
- A) Apagar as chaves estrangeiras.
- B) Esquecer de normalizar o banco.
- C) Normalizar até a 5FN.
- D) Repetir um dado de propósito, para ganhar desempenho, como decisão documentada e justificada.

**Gabarito:** D

---

## ITEM 34 — Justificar a Separação

- **Capacidade:** C3

**Comando:**  
Por que a aula pede para justificar cada separação de tabela?

**Alternativas:**
- A) Para mostrar qual dependência funcional motivou a separação e defender a decisão.
- B) Porque o SGBD exige um texto para cada tabela.
- C) Porque a justificativa substitui o DER.
- D) Para aumentar o tamanho do documento.

**Gabarito:** A

---

## ITEM 35 — Biblioteca

- **Capacidade:** C3

**Comando:**  
EMPRESTIMO (id_emprestimo, data, id_livro, titulo_livro, autor_livro) tem título e autor dependendo do livro. O que fazer?

**Alternativas:**
- A) Criar uma coluna titulo2.
- B) Apagar o livro do sistema.
- C) Mover título e autor para LIVRO e deixar id_livro em EMPRESTIMO.
- D) Manter tudo em EMPRESTIMO.

**Gabarito:** C

---

## ITEM 36 — Clínica

- **Capacidade:** C3

**Comando:**  
CONSULTA (id_consulta, data, id_medico, nome_medico, especialidade) tem dados do médico. Qual é a forma normal ferida?

**Alternativas:**
- A) 3FN, por dependência transitiva pelo id_medico.
- B) Nenhuma.
- C) 2FN, pois a chave é composta.
- D) 1FN.

**Gabarito:** A

---

## ITEM 37 — Endereço em Várias Partes

- **Capacidade:** C3

**Comando:**  
O campo endereço "Rua A, 10, Centro, Rio do Sul" num só valor, quando a escola precisa filtrar por bairro, prejudica qual princípio?

**Alternativas:**
- A) Nenhum, está correto.
- B) A 3FN, sempre.
- C) A atomicidade (1FN), pois o sistema precisa usar as partes separadamente.
- D) A durabilidade.

**Gabarito:** C

---

## ITEM 38 — Tabela sem Chave

- **Capacidade:** C3

**Comando:**  
Uma tabela sem chave primária pode estar na 1FN?

**Alternativas:**
- A) Sim, sempre.
- B) Não, a 1FN exige uma chave primária.
- C) Só se tiver mais de cem linhas.
- D) Só se tiver acentos.

**Gabarito:** B

---

## ITEM 39 — Redundância e Normalização

- **Capacidade:** C3

**Comando:**  
O nome do aluno repetido em todas as linhas de matrícula é:

**Alternativas:**
- A) Uma boa prática de desempenho sempre.
- B) Exigência da 3FN.
- C) Redundância, que a normalização elimina.
- D) Um atributo referencial.

**Gabarito:** C

---

## ITEM 40 — Anomalia e Consequência

- **Capacidade:** C3

**Comando:**  
Qual é a consequência prática de uma anomalia de atualização?

**Alternativas:**
- A) Dados contraditórios, com o mesmo fato com valores diferentes em linhas diferentes.
- B) O banco fica mais rápido.
- C) O DER fica mais bonito.
- D) O servidor muda de porta.

**Gabarito:** A

---

## ITEM 41 — Dinâmica: Primeiro Passo

- **Capacidade:** C3

**Comando:**  
Na dinâmica "Desmonta a planilha", qual é o primeiro passo do grupo?

**Alternativas:**
- A) Criar o banco no PostgreSQL.
- B) Apontar um exemplo de cada anomalia na planilha.
- C) Escrever o backup.
- D) Apagar a planilha.

**Gabarito:** B

---

## ITEM 42 — Dinâmica: Justificativa

- **Capacidade:** C3

**Comando:**  
Na dinâmica, como o grupo justifica cada separação de tabela?

**Alternativas:**
- A) Pela cor da planilha.
- B) Pela preferência pessoal.
- C) Pelo número de linhas.
- D) Pela dependência funcional que motivou a separação.

**Gabarito:** D

---

## ITEM 43 — Entrega da SA 1

- **Capacidade:** C3

**Comando:**  
O que o grupo entrega nesta aula, na SA 1?

**Alternativas:**
- A) O script de backup.
- B) As tabelas do sistema de matrículas na 3FN, com chaves, dependências e justificativas, conferidas com o DER.
- C) A configuração do servidor.
- D) Apenas o documento de escopo.

**Gabarito:** B

---

## ITEM 44 — Chave da Associativa

- **Capacidade:** C3

**Comando:**  
Na tabela MATRICULA (id_aluno, id_turma, data_matricula), qual é a chave primária?

**Alternativas:**
- A) Não precisa de chave.
- B) Somente o nome do aluno.
- C) Somente data_matricula.
- D) A chave composta (id_aluno, id_turma), ou um id próprio com UNIQUE na combinação.

**Gabarito:** D

---

## ITEM 45 — FK Depois da 3FN

- **Capacidade:** C3

**Comando:**  
Depois da 3FN, TURMA guarda id_curso. Esse campo é:

**Alternativas:**
- A) Chave estrangeira para CURSO.
- B) Chave primária de ALUNO.
- C) Atributo descritivo sem ligação.
- D) Grupo repetido.

**Gabarito:** A

---

## ITEM 46 — Dados Contraditórios

- **Capacidade:** C3

**Comando:**  
A planilha mostra o Excel com 40 h numa linha e 44 h em outra. Qual é a causa?

**Alternativas:**
- A) Redundância: a carga está repetida em várias linhas e foi alterada em só algumas.
- B) O curso tem duas cargas diferentes de propósito.
- C) Erro do sistema operacional.
- D) Falta de UTF8.

**Gabarito:** A

---

## ITEM 47 — Curso Novo Sem Aluno

- **Capacidade:** C3

**Comando:**  
Depois da normalização, como a escola cadastra um curso novo ainda sem alunos?

**Alternativas:**
- A) Não é possível.
- B) Inserindo uma linha em CURSO, sem precisar de matrícula.
- C) Criando uma matrícula falsa.
- D) Editando a planilha antiga.

**Gabarito:** B

---

## ITEM 48 — Apagar Matrícula

- **Capacidade:** C3

**Comando:**  
Depois da normalização, ao apagar a única matrícula do Python, o que acontece com o curso?

**Alternativas:**
- A) O curso é apagado junto.
- B) O curso continua cadastrado em CURSO.
- C) A carga do curso é zerada.
- D) Todos os alunos são apagados.

**Gabarito:** B

---

## ITEM 49 — 3FN e Turma

- **Capacidade:** C3

**Comando:**  
Em TURMA (id_turma, codigo, turno, id_curso), por que a tabela está na 3FN?

**Alternativas:**
- A) Porque tem quatro colunas.
- B) Porque repete a carga do curso.
- C) Porque codigo e turno dependem só de id_turma, e id_curso é chave estrangeira.
- D) Porque não tem chave primária.

**Gabarito:** C

---

## ITEM 50 — Normalização e Requisitos

- **Capacidade:** C3

**Comando:**  
Por que a normalização ajuda a atender o requisito "alterações em um só lugar" do cliente?

**Alternativas:**
- A) Porque impede qualquer alteração.
- B) Porque copia o dado em todas as tabelas.
- C) Porque apaga os dados antigos.
- D) Porque cada fato fica guardado uma única vez, na tabela certa.

**Gabarito:** D
