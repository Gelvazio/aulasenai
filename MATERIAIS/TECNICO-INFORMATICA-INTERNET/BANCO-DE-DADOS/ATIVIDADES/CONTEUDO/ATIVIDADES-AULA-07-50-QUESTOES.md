# Atividade: Atributos — 50 Questões

- **Aula:** 07
- **Tema:** Atributos
- **Ícone:** 🏷️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os procedimentos do modelo entidade-relacionamento nos atributos: atributo e valor, atributos simples e compostos, descritivos, nominativos e referenciais, identificador, dicionário de atributos (descrição, tipo, tamanho, obrigatoriedade, classificação e exemplo) e erros comuns de modelagem de atributos.
- **Conteúdo-base:** ../CONTEUDO/AULA-07-ATRIBUTOS.md
- **Slides:** ../AULAS/AULA-07-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-07-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Definição de Atributo

- **Capacidade:** C2

**Comando:**  
O que é um atributo no modelo entidade-relacionamento?

**Alternativas:**
- A) Uma ocorrência da entidade.
- B) Uma ligação entre duas entidades.
- C) Um usuário do banco.
- D) Uma característica da entidade que o sistema precisa guardar.

**Gabarito:** D

---

## ITEM 02 — Valor do Atributo

- **Capacidade:** C2

**Comando:**  
Em nome = "Ana Souza", o que é "Ana Souza"?

**Alternativas:**
- A) O valor do atributo nome numa ocorrência.
- B) Um relacionamento.
- C) Uma entidade forte.
- D) O nome da tabela.

**Gabarito:** A

---

## ITEM 03 — Notação do Atributo

- **Capacidade:** C2

**Comando:**  
Como o atributo pode ser desenhado no DER?

**Alternativas:**
- A) Como retângulo de linha dupla.
- B) Como elipse ligada à entidade ou em lista dentro do retângulo.
- C) Como seta pontilhada sem rótulo.
- D) Como losango entre duas entidades.

**Gabarito:** B

---

## ITEM 04 — Atributo Simples

- **Capacidade:** C2

**Comando:**  
O que é um atributo simples?

**Alternativas:**
- A) Um atributo opcional.
- B) Um atributo sem valor.
- C) Um atributo que aponta para outra entidade.
- D) Um atributo que não se divide em partes com significado próprio.

**Gabarito:** D

---

## ITEM 05 — Exemplo de Simples

- **Capacidade:** C2

**Comando:**  
Qual destes é um atributo simples?

**Alternativas:**
- A) Nome completo com sobrenome separado.
- B) Endereço completo.
- C) Data de nascimento.
- D) Telefone com DDD e número separados.

**Gabarito:** C

---

## ITEM 06 — Atributo Composto

- **Capacidade:** C2

**Comando:**  
O que é um atributo composto?

**Alternativas:**
- A) Um atributo calculado por fórmula.
- B) Um atributo que se repete em várias tabelas.
- C) Um atributo que pode ser dividido em partes menores, cada uma com significado.
- D) Um atributo obrigatório.

**Gabarito:** C

---

## ITEM 07 — Exemplo de Composto

- **Capacidade:** C2

**Comando:**  
Qual destes é um atributo composto?

**Alternativas:**
- A) Preço.
- B) Endereço, com rua, número, bairro, cidade e CEP.
- C) Quantidade.
- D) CPF.

**Gabarito:** B

---

## ITEM 08 — Quando Dividir o Composto

- **Capacidade:** C2

**Comando:**  
Quando o atributo composto deve ser dividido em partes?

**Alternativas:**
- A) Sempre que o nome do atributo for longo.
- B) Somente quando o cliente pedir cores diferentes.
- C) Quando o sistema precisa usar as partes separadamente, como listar alunos por bairro.
- D) Nunca, pois partes são proibidas.

**Gabarito:** C

---

## ITEM 09 — Composto Vira Colunas

- **Capacidade:** C2

**Comando:**  
Na hora de criar a tabela, o que acontece com um atributo composto dividido?

**Alternativas:**
- A) Ele é apagado.
- B) Cada parte vira uma coluna.
- C) Ele vira uma senha.
- D) Ele vira uma nova base de dados.

**Gabarito:** B

---

## ITEM 10 — Atributo Descritivo

- **Capacidade:** C2

**Comando:**  
O que é um atributo descritivo?

**Alternativas:**
- A) Um atributo que descreve uma característica da ocorrência, sem identificá-la.
- B) Um atributo que identifica a ocorrência.
- C) Um atributo sem tipo.
- D) Um atributo que aponta para outra entidade.

**Gabarito:** A

---

## ITEM 11 — Exemplo de Descritivo

- **Capacidade:** C2

**Comando:**  
Qual destes é tipicamente um atributo descritivo?

**Alternativas:**
- A) Código do curso dentro da turma.
- B) Código do curso.
- C) Carga horária do curso.
- D) Número da matrícula.

**Gabarito:** C

---

## ITEM 12 — Atributo Nominativo

- **Capacidade:** C2

**Comando:**  
O que é um atributo nominativo?

**Alternativas:**
- A) Um atributo que, além de descrever, nomeia ou identifica a ocorrência.
- B) Um atributo que só guarda cores.
- C) Um atributo que pertence a outra entidade.
- D) Um atributo que sempre fica vazio.

**Gabarito:** A

---

## ITEM 13 — Exemplo de Nominativo

- **Capacidade:** C2

**Comando:**  
Qual destes é um atributo nominativo da entidade CURSO?

**Alternativas:**
- A) Situação ativo ou inativo.
- B) Valor da mensalidade.
- C) Código do curso.
- D) Carga horária.

**Gabarito:** C

---

## ITEM 14 — Atributo Referencial

- **Capacidade:** C2

**Comando:**  
O que é um atributo referencial?

**Alternativas:**
- A) Um atributo calculado pelo sistema.
- B) Um atributo que nunca muda.
- C) Um atributo que descreve a cor de algo.
- D) Um atributo que faz referência a outra entidade, ligando as duas.

**Gabarito:** D

---

## ITEM 15 — Exemplo de Referencial

- **Capacidade:** C2

**Comando:**  
Na entidade TURMA, o código do curso é:

**Alternativas:**
- A) Um atributo referencial, que aponta para CURSO.
- B) Um atributo descritivo da cor da turma.
- C) Um atributo composto.
- D) O identificador do aluno.

**Gabarito:** A

---

## ITEM 16 — Referencial e Chave Estrangeira

- **Capacidade:** C2

**Comando:**  
O atributo referencial é a base de qual conceito das tabelas?

**Alternativas:**
- A) Codificação UTF8.
- B) Backup.
- C) Porta do servidor.
- D) Chave estrangeira.

**Gabarito:** D

---

## ITEM 17 — Nominativo e Identificador

- **Capacidade:** C2

**Comando:**  
O atributo nominativo costuma ser candidato a quê?

**Alternativas:**
- A) Identificador, que depois vira chave primária.
- B) Índice de cor.
- C) Atributo opcional sem uso.
- D) Senha do banco.

**Gabarito:** A

---

## ITEM 18 — Referencial Mostra Relacionamento

- **Capacidade:** C2

**Comando:**  
Quando TURMA tem o atributo código do curso, o que isso indica?

**Alternativas:**
- A) Que CURSO é atributo de TURMA.
- B) Que TURMA e CURSO são a mesma entidade.
- C) Que não há ligação entre as entidades.
- D) Que existe um relacionamento entre TURMA e CURSO.

**Gabarito:** D

---

## ITEM 19 — Definição de Identificador

- **Capacidade:** C2

**Comando:**  
O que é o identificador de uma entidade?

**Alternativas:**
- A) O atributo ou conjunto de atributos que distingue cada ocorrência de todas as outras.
- B) O primeiro atributo da lista.
- C) O atributo com o maior texto.
- D) O atributo que pode ficar vazio.

**Gabarito:** A

---

## ITEM 20 — Regras do Identificador

- **Capacidade:** C2

**Comando:**  
Quais são as regras de um identificador?

**Alternativas:**
- A) Não se repete e não fica vazio.
- B) Muda toda semana.
- C) Deve ser sempre um texto longo.
- D) Pode se repetir e ficar vazio.

**Gabarito:** A

---

## ITEM 21 — Identificador da Fraca

- **Capacidade:** C2

**Comando:**  
Qual é o identificador da entidade fraca PARCELA?

**Alternativas:**
- A) O id da matrícula mais o número da parcela.
- B) Somente o número da parcela.
- C) O nome do aluno.
- D) O valor da parcela.

**Gabarito:** A

---

## ITEM 22 — Código Próprio

- **Capacidade:** C2

**Comando:**  
Por que é preferível usar um código próprio (id) como identificador em vez do e-mail?

**Alternativas:**
- A) Porque o id é mais bonito.
- B) Porque o e-mail pode mudar, e o identificador não deve mudar.
- C) Porque o e-mail sempre se repete.
- D) Porque o e-mail não pode ser guardado.

**Gabarito:** B

---

## ITEM 23 — CPF de Criança

- **Capacidade:** C2

**Comando:**  
Por que o CPF nem sempre é um bom identificador numa escola com crianças?

**Alternativas:**
- A) Porque o CPF muda todo ano.
- B) Porque o CPF é um atributo referencial.
- C) Porque algumas crianças podem não ter CPF, e o identificador não pode ficar vazio.
- D) Porque CPF tem letras.

**Gabarito:** C

---

## ITEM 24 — Nome como Identificador

- **Capacidade:** C2

**Comando:**  
Por que o nome não deve ser usado como identificador?

**Alternativas:**
- A) Porque nomes não têm letras.
- B) Porque o nome é atributo referencial.
- C) Porque o nome nunca é obrigatório.
- D) Porque existem pessoas com o mesmo nome (homônimos).

**Gabarito:** D

---

## ITEM 25 — Idade ou Data de Nascimento

- **Capacidade:** C2

**Comando:**  
Por que guardar a data de nascimento em vez da idade?

**Alternativas:**
- A) Porque a data ocupa menos espaço que qualquer número.
- B) Porque a idade muda todo ano e a data não; a idade pode ser calculada.
- C) Porque datas não podem ser calculadas.
- D) Porque a idade é atributo composto.

**Gabarito:** B

---

## ITEM 26 — Vários Telefones num Campo

- **Capacidade:** C2

**Comando:**  
Qual é o problema de guardar "99999-1111 / 98888-2222" num único campo de telefone?

**Alternativas:**
- A) O banco não aceita números.
- B) Não há problema algum.
- C) O telefone vira identificador.
- D) Junta várias informações num campo, dificultando buscar, validar e atualizar cada telefone.

**Gabarito:** D

---

## ITEM 27 — Referencial sem Entidade

- **Capacidade:** C2

**Comando:**  
Qual é o erro de criar um atributo referencial "código do fornecedor" sem existir a entidade FORNECEDOR?

**Alternativas:**
- A) O atributo aponta para uma entidade que não existe no modelo.
- B) Nenhum erro, é a forma correta.
- C) O fornecedor vira atributo simples.
- D) O atributo fica bonito demais.

**Gabarito:** A

---

## ITEM 28 — Dicionário de Atributos

- **Capacidade:** C2

**Comando:**  
O que é o dicionário de atributos?

**Alternativas:**
- A) Um livro de português.
- B) O instalador do PostgreSQL.
- C) Um documento que registra cada atributo de forma padronizada, com descrição, tipo, tamanho, obrigatoriedade e exemplo.
- D) A lista de senhas do banco.

**Gabarito:** C

---

## ITEM 29 — Coluna Obrigatório

- **Capacidade:** C2

**Comando:**  
No dicionário de atributos, a coluna "obrigatório" informa:

**Alternativas:**
- A) Se o atributo tem acento.
- B) Se o atributo pode ou não ficar vazio.
- C) Se o atributo é uma entidade.
- D) Se o atributo é bonito.

**Gabarito:** B

---

## ITEM 30 — Tipo do Atributo

- **Capacidade:** C2

**Comando:**  
Na aula 7, como é registrado o tipo do atributo no dicionário?

**Alternativas:**
- A) Com a cor do atributo.
- B) Com a ideia geral: inteiro, texto, data, decimal ou verdadeiro/falso.
- C) Com a porta do servidor.
- D) Com o nome do usuário que criou.

**Gabarito:** B

---

## ITEM 31 — Tamanho do Texto

- **Capacidade:** C2

**Comando:**  
Por que registrar o tamanho de um atributo texto, como nome com 100 caracteres?

**Alternativas:**
- A) Para numerar as entidades.
- B) Para definir o limite de caracteres aceito e planejar a coluna da tabela.
- C) Para escolher a fonte da tela.
- D) Para definir a senha.

**Gabarito:** B

---

## ITEM 32 — Exemplo no Dicionário

- **Capacidade:** C2

**Comando:**  
Para que serve a coluna "exemplo" no dicionário de atributos?

**Alternativas:**
- A) Guardar a senha do aluno.
- B) Substituir o tipo do atributo.
- C) Indicar a porta do servidor.
- D) Mostrar um valor típico, evitando dúvidas sobre formato e conteúdo.

**Gabarito:** D

---

## ITEM 33 — Escola: Nome

- **Capacidade:** C2

**Comando:**  
No exemplo da ficha da escola, como o atributo nome foi classificado?

**Alternativas:**
- A) Composto e nominativo.
- B) Entidade fraca.
- C) Descritivo e opcional apenas.
- D) Simples e referencial.

**Gabarito:** A

---

## ITEM 34 — Escola: CPF

- **Capacidade:** C2

**Comando:**  
No exemplo da ficha da escola, como o CPF foi classificado?

**Alternativas:**
- A) Simples e nominativo.
- B) Entidade associativa.
- C) Composto e referencial.
- D) Descritivo e composto.

**Gabarito:** A

---

## ITEM 35 — Escola: Endereço

- **Capacidade:** C2

**Comando:**  
Por que o endereço foi dividido em partes no exemplo da escola?

**Alternativas:**
- A) Porque endereço é referencial.
- B) Porque endereço é sempre identificador.
- C) Porque a escola quer relatórios por bairro.
- D) Porque o banco não guarda textos longos.

**Gabarito:** C

---

## ITEM 36 — Escola: Curso na Ficha

- **Capacidade:** C2

**Comando:**  
Na ficha de matrícula da escola, o campo "Curso" foi classificado como:

**Alternativas:**
- A) Composto por rua e número.
- B) Simples e identificador do aluno.
- C) Referencial, pois aponta para a entidade CURSO.
- D) Descritivo de cor.

**Gabarito:** C

---

## ITEM 37 — Escola: Data da Matrícula

- **Capacidade:** C2

**Comando:**  
Na ficha, o campo "Data" da matrícula é:

**Alternativas:**
- A) Identificador de ALUNO.
- B) Referencial para CURSO.
- C) Descritivo da MATRÍCULA.
- D) Composto de CEP.

**Gabarito:** C

---

## ITEM 38 — Escola: Turno

- **Capacidade:** C2

**Comando:**  
Na classificação da ficha da escola, o turno é:

**Alternativas:**
- A) Identificador de MATRÍCULA.
- B) Descritivo de TURMA.
- C) Entidade fraca.
- D) Referencial para ALUNO.

**Gabarito:** B

---

## ITEM 39 — Nome Descritivo ou Nominativo

- **Capacidade:** C2

**Comando:**  
O nome do curso, como "Excel Básico", é considerado nominativo porque:

**Alternativas:**
- A) É sempre um número.
- B) Nunca é mostrado ao usuário.
- C) Aponta para outra entidade.
- D) Além de descrever, nomeia a ocorrência do curso.

**Gabarito:** D

---

## ITEM 40 — Preço do Produto

- **Capacidade:** C2

**Comando:**  
Na entidade PRODUTO, o preço é:

**Alternativas:**
- A) Referencial para CLIENTE.
- B) Identificador do produto.
- C) Composto e nominativo.
- D) Simples e descritivo.

**Gabarito:** D

---

## ITEM 41 — Código do Cliente no Pedido

- **Capacidade:** C2

**Comando:**  
Na entidade PEDIDO, o atributo código do cliente é:

**Alternativas:**
- A) Identificador do produto.
- B) Referencial, apontando para CLIENTE.
- C) Descritivo da cor do pedido.
- D) Composto de rua e número.

**Gabarito:** B

---

## ITEM 42 — Telefone com DDD

- **Capacidade:** C2

**Comando:**  
Quando o telefone é guardado com DDD e número separados, ele é tratado como:

**Alternativas:**
- A) Identificador obrigatório.
- B) Atributo referencial.
- C) Entidade fraca.
- D) Atributo composto.

**Gabarito:** D

---

## ITEM 43 — Situação da Matrícula

- **Capacidade:** C2

**Comando:**  
O atributo situação da matrícula (ativa, trancada, concluída) é:

**Alternativas:**
- A) Composto e referencial.
- B) Simples e descritivo.
- C) Entidade associativa.
- D) Nominativo e identificador.

**Gabarito:** B

---

## ITEM 44 — Dinâmica: Campo Idade

- **Capacidade:** C2

**Comando:**  
Na dinâmica "Raio X da ficha", o grupo encontra o campo "idade". Qual é o apontamento correto?

**Alternativas:**
- A) É o identificador ideal.
- B) Deve virar entidade forte.
- C) É um erro de cadastro; deve-se guardar a data de nascimento e calcular a idade.
- D) É um atributo referencial.

**Gabarito:** C

---

## ITEM 45 — Dinâmica: Identificador

- **Capacidade:** C2

**Comando:**  
Na dinâmica, numa ficha de biblioteca, qual atributo é o melhor identificador do LIVRO?

**Alternativas:**
- A) Um código próprio do livro no acervo, que não se repete.
- B) A cor da capa.
- C) O nome do autor.
- D) O título do livro.

**Gabarito:** A

---

## ITEM 46 — Entrega da SA 1

- **Capacidade:** C2

**Comando:**  
O que o grupo entrega nesta aula, na SA 1?

**Alternativas:**
- A) O pg_hba.conf configurado.
- B) A avaliação final da UC.
- C) O dicionário de atributos de todas as entidades do sistema de matrículas.
- D) O script de backup.

**Gabarito:** C

---

## ITEM 47 — Próxima Etapa

- **Capacidade:** C2

**Comando:**  
Depois dos atributos, qual conteúdo da modelagem é estudado na aula 8?

**Alternativas:**
- A) Triggers de auditoria.
- B) Relacionamentos 1:1, 1:N e N:N.
- C) Instalação do PostgreSQL.
- D) Backup do servidor.

**Gabarito:** B

---

## ITEM 48 — Tipos no PostgreSQL

- **Capacidade:** C2

**Comando:**  
Em qual aula os tipos de dados exatos do PostgreSQL, como integer, varchar e date, são definidos?

**Alternativas:**
- A) Na aula 1.
- B) Na aula 12, de DDL: tabelas e campos.
- C) Nunca, pois não fazem parte da UC.
- D) Na aula 5, de escopo.

**Gabarito:** B

---

## ITEM 49 — Atributo de Associativa

- **Capacidade:** C2

**Comando:**  
A nota final de um aluno numa turma é atributo de qual entidade?

**Alternativas:**
- A) ALUNO.
- B) PROFESSOR.
- C) CURSO.
- D) MATRÍCULA, a associativa entre ALUNO e TURMA.

**Gabarito:** D

---

## ITEM 50 — Classificação em Duas Dimensões

- **Capacidade:** C2

**Comando:**  
Um mesmo atributo pode ser classificado em duas dimensões. Qual exemplo está correto?

**Alternativas:**
- A) CPF é simples quanto à estrutura e nominativo quanto à função.
- B) CPF é composto e referencial.
- C) Preço é nominativo e composto.
- D) Endereço é simples e identificador.

**Gabarito:** A
