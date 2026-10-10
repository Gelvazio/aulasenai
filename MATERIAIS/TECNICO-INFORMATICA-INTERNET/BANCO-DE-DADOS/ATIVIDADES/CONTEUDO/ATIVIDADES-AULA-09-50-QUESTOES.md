# Atividade: Diagrama Entidade-Relacionamento (DER) — 50 Questões

- **Aula:** 09
- **Tema:** Diagrama Entidade-Relacionamento (DER)
- **Ícone:** 🗺️
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os procedimentos do modelo entidade-relacionamento no DER: elementos e formas da notação de Chen, notação pé de galinha, modelo conceitual × lógico, passo a passo do desenho, ferramentas de modelagem (brModelo, draw.io, pgAdmin ERD Tool), checklist de qualidade e revisão em dupla com acolhimento de sugestões.
- **Conteúdo-base:** ../CONTEUDO/AULA-09-DIAGRAMA-ENTIDADE-RELACIONAMENTO.md
- **Slides:** ../AULAS/AULA-09-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-09-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — O Que É o DER

- **Capacidade:** C2

**Comando:**  
O que é o DER?

**Alternativas:**
- A) Um arquivo de configuração do PostgreSQL.
- B) Um comando SQL de consulta.
- C) Um relatório de backup.
- D) O desenho do modelo entidade-relacionamento, mostrando entidades, atributos e relacionamentos.

**Gabarito:** D

---

## ITEM 02 — Forma da Entidade

- **Capacidade:** C2

**Comando:**  
Na notação de Chen, qual forma representa a entidade?

**Alternativas:**
- A) Losango.
- B) Triângulo.
- C) Retângulo.
- D) Elipse.

**Gabarito:** C

---

## ITEM 03 — Forma do Relacionamento

- **Capacidade:** C2

**Comando:**  
Na notação de Chen, qual forma representa o relacionamento?

**Alternativas:**
- A) Losango.
- B) Elipse.
- C) Retângulo.
- D) Círculo preenchido.

**Gabarito:** A

---

## ITEM 04 — Forma do Atributo

- **Capacidade:** C2

**Comando:**  
Na notação de Chen, qual forma representa o atributo?

**Alternativas:**
- A) Elipse ligada à entidade.
- B) Retângulo de linha dupla.
- C) Losango.
- D) Seta tracejada.

**Gabarito:** A

---

## ITEM 05 — Identificador no DER

- **Capacidade:** C2

**Comando:**  
Como o identificador aparece no DER de Chen?

**Alternativas:**
- A) Com o nome do atributo sublinhado, ou bolinha preenchida no brModelo.
- B) Sem nenhuma marcação.
- C) Dentro de um losango.
- D) Com o nome em vermelho.

**Gabarito:** A

---

## ITEM 06 — Entidade Fraca no DER

- **Capacidade:** C2

**Comando:**  
Como a entidade fraca aparece no DER?

**Alternativas:**
- A) Elipse pontilhada.
- B) Losango simples.
- C) Retângulo de linha dupla.
- D) Retângulo sem nome.

**Gabarito:** C

---

## ITEM 07 — Atributo Composto no DER

- **Capacidade:** C2

**Comando:**  
Como o atributo composto aparece no DER de Chen?

**Alternativas:**
- A) Como um retângulo dentro de outro.
- B) Como uma seta com tridente.
- C) Como uma elipse ligada a outras elipses, que são as suas partes.
- D) Como um losango duplo.

**Gabarito:** C

---

## ITEM 08 — Associativa no DER

- **Capacidade:** C2

**Comando:**  
Como a entidade associativa aparece no DER de Chen?

**Alternativas:**
- A) Como uma elipse dupla.
- B) Como um círculo vazio.
- C) Como dois losangos lado a lado.
- D) Como um retângulo envolvendo o losango do relacionamento.

**Gabarito:** D

---

## ITEM 09 — Cardinalidade no DER

- **Capacidade:** C2

**Comando:**  
No DER de Chen usado na aula, onde aparece a cardinalidade?

**Alternativas:**
- A) Como (mín, máx) junto a cada entidade, nos dois lados do relacionamento.
- B) Somente no título do diagrama.
- C) Dentro do nome da entidade.
- D) Em nenhum lugar.

**Gabarito:** A

---

## ITEM 10 — Notação Pé de Galinha

- **Capacidade:** C2

**Comando:**  
A notação pé de galinha é usada principalmente em qual modelo?

**Alternativas:**
- A) No modelo lógico, com as tabelas e as chaves.
- B) No documento de escopo.
- C) No nível físico dos discos.
- D) No arquivo pg_hba.conf.

**Gabarito:** A

---

## ITEM 11 — Caixa no Pé de Galinha

- **Capacidade:** C2

**Comando:**  
No pé de galinha, como cada entidade aparece?

**Alternativas:**
- A) Como uma caixa com a lista de atributos, indicando PK e FK.
- B) Como uma elipse sublinhada.
- C) Como um losango com verbo.
- D) Como um texto solto sem forma.

**Gabarito:** A

---

## ITEM 12 — Tridente

- **Capacidade:** C2

**Comando:**  
No pé de galinha, o tridente na ponta da linha indica:

**Alternativas:**
- A) Muitos.
- B) Um.
- C) Zero.
- D) Identificador.

**Gabarito:** A

---

## ITEM 13 — N:N no Pé de Galinha

- **Capacidade:** C2

**Comando:**  
Como o relacionamento N:N aparece no modelo lógico em pé de galinha?

**Alternativas:**
- A) Como um atributo composto.
- B) Como uma linha direta com dois tridentes, sem tabela no meio.
- C) Já resolvido por uma tabela associativa entre as duas entidades.
- D) Não aparece.

**Gabarito:** C

---

## ITEM 14 — Conversão para Pé de Galinha

- **Capacidade:** C2

**Comando:**  
CURSO (1,1) —oferece— (0,N) TURMA, em pé de galinha, fica:

**Alternativas:**
- A) Do lado de CURSO, círculo e tridente; do lado de TURMA, dois traços.
- B) Tridente nos dois lados.
- C) Círculo nos dois lados.
- D) Do lado de CURSO, dois traços (exatamente um); do lado de TURMA, círculo e tridente (zero ou muitos).

**Gabarito:** D

---

## ITEM 15 — Conceitual e Lógico

- **Capacidade:** C2

**Comando:**  
Qual é a diferença entre o DER conceitual e o lógico?

**Alternativas:**
- A) O conceitual mostra o negócio para validar com o cliente; o lógico mostra tabelas, chaves primárias e estrangeiras.
- B) Não há diferença.
- C) O lógico é desenhado à mão e o conceitual não.
- D) O conceitual tem SQL e o lógico não.

**Gabarito:** A

---

## ITEM 16 — Para Que Serve o Lógico

- **Capacidade:** C2

**Comando:**  
O DER lógico prepara quais etapas seguintes?

**Alternativas:**
- A) O backup do servidor.
- B) A escolha da cor das telas.
- C) A instalação do sistema operacional.
- D) A normalização e a escrita do SQL de criação das tabelas.

**Gabarito:** D

---

## ITEM 17 — Passo 1 do Desenho

- **Capacidade:** C2

**Comando:**  
Qual é o primeiro passo para desenhar o DER na aula?

**Alternativas:**
- A) Colocar as entidades fortes principais no centro.
- B) Desenhar os atributos antes das entidades.
- C) Escolher a fonte do texto.
- D) Escrever o CREATE TABLE.

**Gabarito:** A

---

## ITEM 18 — Passo do Verbo

- **Capacidade:** C2

**Comando:**  
Depois de ligar as entidades com relacionamentos, o que se escreve no losango?

**Alternativas:**
- A) O tipo de dado.
- B) O verbo do relacionamento.
- C) A porta do servidor.
- D) A senha do banco.

**Gabarito:** B

---

## ITEM 19 — Linhas Cruzadas

- **Capacidade:** C2

**Comando:**  
Por que evitar linhas cruzadas no DER?

**Alternativas:**
- A) Para que o diagrama fique legível, inclusive para o cliente.
- B) Porque é exigido pelo PostgreSQL.
- C) Porque o SGBD rejeita linhas cruzadas.
- D) Porque linhas cruzadas apagam atributos.

**Gabarito:** A

---

## ITEM 20 — Nomes no DER

- **Capacidade:** C2

**Comando:**  
Como os nomes das entidades devem estar no DER?

**Alternativas:**
- A) Em idiomas misturados.
- B) Com números aleatórios.
- C) No singular e padronizados.
- D) No plural e com abreviações diferentes.

**Gabarito:** C

---

## ITEM 21 — brModelo

- **Capacidade:** C2

**Comando:**  
O que é o brModelo?

**Alternativas:**
- A) Um SGBD não relacional.
- B) Um navegador de internet.
- C) Uma ferramenta feita para ensino, que desenha o modelo conceitual de Chen e gera o lógico.
- D) Um antivírus.

**Gabarito:** C

---

## ITEM 22 — draw.io

- **Capacidade:** C2

**Comando:**  
O que é o draw.io (diagrams.net)?

**Alternativas:**
- A) Um compilador de C.
- B) Uma ferramenta gratuita, no navegador, com formas de ER e pé de galinha.
- C) Um gerenciador de banco pago.
- D) Um servidor de e-mail.

**Gabarito:** B

---

## ITEM 23 — pgAdmin ERD Tool

- **Capacidade:** C2

**Comando:**  
O que a ERD Tool do pgAdmin permite?

**Alternativas:**
- A) Criar slides de apresentação.
- B) Desenhar o modelo lógico e gerar o SQL para o PostgreSQL.
- C) Editar fotos.
- D) Instalar o Windows.

**Gabarito:** B

---

## ITEM 24 — Checklist: Requisitos

- **Capacidade:** C2

**Comando:**  
No checklist do DER, por que conferir se todo requisito do escopo aparece no diagrama?

**Alternativas:**
- A) Para aumentar o número de entidades.
- B) Para apagar os requisitos.
- C) Para trocar a porta do servidor.
- D) Para garantir que nenhum dado pedido pelo cliente ficou de fora.

**Gabarito:** D

---

## ITEM 25 — Checklist: Identificador

- **Capacidade:** C2

**Comando:**  
Qual pergunta do checklist confere os identificadores?

**Alternativas:**
- A) Toda entidade tem mais de dez atributos?
- B) Toda entidade tem nome em inglês?
- C) Toda entidade tem cor?
- D) Toda entidade tem identificador?

**Gabarito:** D

---

## ITEM 26 — Checklist: Relacionamentos

- **Capacidade:** C2

**Comando:**  
Qual item do checklist confere os relacionamentos?

**Alternativas:**
- A) Todo relacionamento fica fora do diagrama.
- B) Todo relacionamento tem uma senha.
- C) Todo relacionamento é 1:1.
- D) Todo relacionamento tem verbo e cardinalidade nos dois lados.

**Gabarito:** D

---

## ITEM 27 — Checklist: Atributo Repetido

- **Capacidade:** C2

**Comando:**  
Por que o checklist pede atenção a atributos repetidos em duas entidades sem motivo?

**Alternativas:**
- A) Porque podem indicar redundância no modelo.
- B) Porque o SGBD apaga atributos repetidos.
- C) Porque atributos nunca se repetem.
- D) Porque o desenho fica colorido.

**Gabarito:** A

---

## ITEM 28 — Checklist: Legibilidade

- **Capacidade:** C2

**Comando:**  
Qual é o critério de legibilidade do checklist?

**Alternativas:**
- A) O desenho só precisa ser lido pelo autor.
- B) O desenho deve ter letras pequenas para caber tudo.
- C) O desenho deve ser lido por quem não o fez, inclusive o cliente.
- D) O desenho não precisa de nomes.

**Gabarito:** C

---

## ITEM 29 — Checklist: Fraca e Dona

- **Capacidade:** C2

**Comando:**  
O checklist pede que as entidades fracas indiquem o quê?

**Alternativas:**
- A) A cor da linha dupla.
- B) A entidade dona de que dependem.
- C) O número de telefone do cliente.
- D) O tamanho do disco.

**Gabarito:** B

---

## ITEM 30 — Revisão em Dupla

- **Capacidade:** C2

**Comando:**  
Por que revisar o DER com outra pessoa?

**Alternativas:**
- A) Para aumentar o tempo da aula.
- B) Porque o revisor encontra erros que o autor não percebe.
- C) Porque o SGBD exige duas assinaturas.
- D) Porque o autor não pode desenhar sozinho.

**Gabarito:** B

---

## ITEM 31 — Atitude do Revisor

- **Capacidade:** C2

**Comando:**  
Qual é a atitude adequada do revisor do DER?

**Alternativas:**
- A) Não dizer nada para não incomodar.
- B) Rir dos erros encontrados.
- C) Apagar o DER do colega e fazer outro.
- D) Fazer perguntas, como "este relacionamento é mesmo 1:1?", em vez de acusar.

**Gabarito:** D

---

## ITEM 32 — Atitude do Autor

- **Capacidade:** C2

**Comando:**  
Diante de uma sugestão no seu DER, qual é a atitude do autor?

**Alternativas:**
- A) Recusar qualquer sugestão sem ouvir.
- B) Aceitar tudo sem verificar.
- C) Escutar, verificar nos requisitos e aceitar ou justificar a decisão.
- D) Desistir do projeto.

**Gabarito:** C

---

## ITEM 33 — Registro das Mudanças

- **Capacidade:** C2

**Comando:**  
Por que registrar as mudanças feitas a partir da revisão?

**Alternativas:**
- A) Para aumentar o tamanho do arquivo.
- B) Porque sem registro o DER some.
- C) Para que o grupo saiba o que mudou, por quê, e mantenha o histórico das decisões.
- D) Porque o pgAdmin exige registro.

**Gabarito:** C

---

## ITEM 34 — Escola: Associativa MATRÍCULA

- **Capacidade:** C2

**Comando:**  
No DER da escola, quais atributos estão na associativa MATRÍCULA?

**Alternativas:**
- A) CPF e nome do aluno.
- B) Endereço do responsável.
- C) Data, situação e nota final.
- D) Nome do curso e carga horária.

**Gabarito:** C

---

## ITEM 35 — Escola: PARCELA

- **Capacidade:** C2

**Comando:**  
No DER da escola, PARCELA aparece como:

**Alternativas:**
- A) Entidade fraca, ligada a MATRÍCULA por "gera".
- B) Atributo de CURSO.
- C) Entidade forte sem ligação.
- D) Entidade associativa entre aluno e curso.

**Gabarito:** A

---

## ITEM 36 — Escola: Professor e Turma

- **Capacidade:** C2

**Comando:**  
No DER da escola, como PROFESSOR e TURMA estão ligados?

**Alternativas:**
- A) Por um relacionamento 1:1 obrigatório.
- B) Pela associativa AULA_TURMA, com dia da semana e horário.
- C) Por uma chave do professor dentro de CURSO.
- D) Não estão ligados.

**Gabarito:** B

---

## ITEM 37 — Escola: Sugestão da Revisão

- **Capacidade:** C2

**Comando:**  
Na revisão do DER da escola, qual atributo faltava e foi incluído?

**Alternativas:**
- A) O nome do professor em PARCELA.
- B) A senha do aluno em MATRÍCULA.
- C) O CPF em TURMA.
- D) O valor da mensalidade (valor_mensal) em CURSO.

**Gabarito:** D

---

## ITEM 38 — Escola: Curso e Turma

- **Capacidade:** C2

**Comando:**  
No DER da escola, qual é a cardinalidade entre CURSO e TURMA?

**Alternativas:**
- A) CURSO (1,1) — (1,1) TURMA.
- B) CURSO (1,1) — oferece — (0,N) TURMA.
- C) CURSO (0,N) — (0,N) TURMA.
- D) Não há relacionamento.

**Gabarito:** B

---

## ITEM 39 — Escola: Responsável

- **Capacidade:** C2

**Comando:**  
No DER da escola, RESPONSÁVEL e ALUNO estão ligados como:

**Alternativas:**
- A) RESPONSÁVEL como atributo de PARCELA.
- B) RESPONSÁVEL (1,1) — responde por — (0,N) ALUNO.
- C) Sem ligação.
- D) RESPONSÁVEL (0,N) — (0,N) ALUNO com tabela associativa.

**Gabarito:** B

---

## ITEM 40 — Dinâmica: Revisão Cruzada

- **Capacidade:** C2

**Comando:**  
Na dinâmica "Revisão cruzada", quantas perguntas ou sugestões cada grupo escreve, no máximo?

**Alternativas:**
- A) Exatamente 50.
- B) Até 5.
- C) Nenhuma.
- D) Uma por atributo, sem limite.

**Gabarito:** B

---

## ITEM 41 — Dinâmica: O Que o Autor Registra

- **Capacidade:** C2

**Comando:**  
Na dinâmica, o que o grupo autor registra depois da conversa?

**Alternativas:**
- A) A cor preferida de cada integrante.
- B) Somente os nomes dos revisores.
- C) O que aceitou e o que manteve, com o motivo.
- D) A nota do outro grupo.

**Gabarito:** C

---

## ITEM 42 — Entrega da SA 1

- **Capacidade:** C2

**Comando:**  
O que o grupo entrega nesta aula, na SA 1?

**Alternativas:**
- A) O script de backup.
- B) O cronograma do semestre.
- C) O pg_hba.conf.
- D) O DER do sistema de matrículas na ferramenta, completo, mais o registro da revisão cruzada.

**Gabarito:** D

---

## ITEM 43 — DER Incompleto

- **Capacidade:** C2

**Comando:**  
Um DER mostra entidades e relacionamentos, mas nenhum identificador. O que está faltando?

**Alternativas:**
- A) Colocar a senha do banco.
- B) Trocar as elipses por retângulos.
- C) Marcar o identificador de cada entidade.
- D) Desenhar mais losangos.

**Gabarito:** C

---

## ITEM 44 — N:N no Conceitual

- **Capacidade:** C2

**Comando:**  
No DER conceitual de Chen, um N:N com dados próprios aparece como:

**Alternativas:**
- A) Uma entidade fraca de linha dupla sem relação.
- B) Um atributo composto.
- C) Duas tabelas sem ligação.
- D) Relacionamento com atributos ou entidade associativa envolvendo o losango.

**Gabarito:** D

---

## ITEM 45 — DER e Requisitos

- **Capacidade:** C2

**Comando:**  
O DER deve ser conferido com qual documento das aulas anteriores?

**Alternativas:**
- A) O relatório de backup.
- B) O documento de escopo com os requisitos de dados.
- C) O manual do sistema operacional.
- D) O instalador do PostgreSQL.

**Gabarito:** B

---

## ITEM 46 — Erro: Cardinalidade num Lado Só

- **Capacidade:** C2

**Comando:**  
Um DER tem a cardinalidade marcada só do lado de TURMA no relacionamento com CURSO. O que fazer?

**Alternativas:**
- A) Deixar como está.
- B) Marcar também a cardinalidade do lado de CURSO, pois o relacionamento é lido nos dois sentidos.
- C) Transformar o relacionamento em atributo.
- D) Apagar a cardinalidade de TURMA.

**Gabarito:** B

---

## ITEM 47 — Erro: Associativa sem Chaves

- **Capacidade:** C2

**Comando:**  
No modelo lógico, a tabela MATRÍCULA aparece sem id_aluno e id_turma. O que está errado?

**Alternativas:**
- A) Faltam as chaves estrangeiras que ligam a associativa às duas entidades.
- B) Nada está errado.
- C) Falta a senha do aluno.
- D) Falta a cor da tabela.

**Gabarito:** A

---

## ITEM 48 — Por Que Desenhar

- **Capacidade:** C2

**Comando:**  
Por que desenhar o DER antes de escrever o SQL?

**Alternativas:**
- A) Porque o SQL não aceita tabelas sem desenho anexado.
- B) Porque o desenho permite ver e validar o modelo inteiro antes de construir.
- C) Porque o desenho substitui o banco.
- D) Porque o servidor exige um arquivo de imagem.

**Gabarito:** B

---

## ITEM 49 — Próxima Etapa

- **Capacidade:** C2

**Comando:**  
Depois do DER, qual é a próxima etapa da modelagem na UC?

**Alternativas:**
- A) O backup do banco.
- B) A normalização de dados (1FN, 2FN e 3FN).
- C) A instalação do PostgreSQL.
- D) A apresentação final.

**Gabarito:** B

---

## ITEM 50 — Legenda do Diagrama

- **Capacidade:** C2

**Comando:**  
Por que é útil colocar uma legenda ou título no DER?

**Alternativas:**
- A) Para esconder os relacionamentos.
- B) Para que o SGBD leia o desenho.
- C) Para substituir os atributos.
- D) Para identificar o sistema, a versão e a notação usada, facilitando a leitura.

**Gabarito:** D
