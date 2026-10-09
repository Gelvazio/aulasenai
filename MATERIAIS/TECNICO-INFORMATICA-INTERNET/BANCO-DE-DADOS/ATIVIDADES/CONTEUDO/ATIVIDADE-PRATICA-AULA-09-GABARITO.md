# Padrão de Resposta — Atividade Prática — Aula 09 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Diagrama Entidade-Relacionamento (DER).
> **Pontos:** tópico a) 0,2 (metade 0,1); tópicos b) e c) 0,4 (metade 0,2). 10 questões × 1,0 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** a aplicação certa na situação **e** a justificativa,
   quando o tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em branco, fora do
   tema, conceito trocado ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** outros exemplos de sistema, desde que corretos; sinônimos dos
   termos (registro = linha; campo = coluna; SGBD = gerenciador de banco de dados; chave primária =
   PK; chave estrangeira = FK); SQL equivalente que produza o mesmo resultado no PostgreSQL; ordem
   diferente das partes da resposta.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** Entidade: **retângulo**; relacionamento: **losango**; atributo: **elipse** ligada à entidade.
**Critérios:** Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 01-b
**Resposta esperada:** Identificador: elipse com o **nome sublinhado** (ou bolinha preenchida no brModelo). Entidade fraca: **retângulo de linha dupla** (com relacionamento identificador em losango duplo).
**Critérios:** Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.

### ITEM 01-c
**Resposta esperada:** Atributo composto: elipse **ligada a outras elipses** (as partes, ex.: endereço → rua, número). Associativa: **retângulo envolvendo o losango** do relacionamento.
**Critérios:** Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.

### ITEM 02-a
**Resposta esperada:** Entidades: **LEITOR, EMPRÉSTIMO, LIVRO**. Relacionamentos: LEITOR —**faz**— EMPRÉSTIMO; EMPRÉSTIMO —**de**/refere-se a— LIVRO.
**Critérios:** Nota cheia (0,2): entidades + relacionamentos com verbo. Metade (0,1): sem verbos. Zero (0): entidades erradas.

### ITEM 02-b
**Resposta esperada:** **LEITOR (1,1) — faz — (0,N) EMPRÉSTIMO**; **LIVRO (1,1) — (0,N) EMPRÉSTIMO** (um livro tem 0 ou vários empréstimos; cada empréstimo é de 1 livro).
**Critérios:** Nota cheia (0,4): os dois relacionamentos corretos. Metade (0,2): um. Zero (0): nenhum.

### ITEM 02-c
**Resposta esperada:** **id_leitor**, **id_livro**, **id_emprestimo**. Atributos de EMPRÉSTIMO: **data de retirada**, **data prevista de devolução**, **data de devolução** (também multa, situação).
**Critérios:** Nota cheia (0,4): três identificadores + dois atributos. Metade (0,2): só uma das partes. Zero (0): nenhuma.

### ITEM 03-a
**Resposta esperada:** Traço = **um**; círculo = **zero**; tridente = **muitos**.
**Critérios:** Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 03-b
**Resposta esperada:** Cada entidade é uma **caixa** com a **lista de atributos** (colunas), com a **chave primária (PK)** e as **chaves estrangeiras (FK)** indicadas.
**Critérios:** Nota cheia (0,4): caixa + atributos + PK/FK. Metade (0,2): sem PK/FK. Zero (0): descreve losango.

### ITEM 03-c
**Resposta esperada:** O N:N aparece **resolvido por uma tabela associativa** no meio, ligada às duas entidades por relacionamentos **1:N** (tridente do lado da associativa).
**Critérios:** Nota cheia (0,4): associativa + dois 1:N. Metade (0,2): só a associativa. Zero (0): linha direta N:N.

### ITEM 04-a
**Resposta esperada:** Do lado de **CLIENTE**: **dois traços** (exatamente um). Do lado de **PEDIDO**: **círculo e tridente** (zero ou muitos).
**Critérios:** Nota cheia (0,2): os dois lados. Metade (0,1): um. Zero (0): invertidos.

### ITEM 04-b
**Resposta esperada:** Surge a tabela **ITEM_PEDIDO** entre PEDIDO e PRODUTO, com **id_pedido**, **id_produto**, **quantidade** e **preco_unitario**; PEDIDO 1:N ITEM_PEDIDO e PRODUTO 1:N ITEM_PEDIDO.
**Critérios:** Nota cheia (0,4): tabela + colunas + ligações. Metade (0,2): tabela sem colunas. Zero (0): sem tabela do meio.

### ITEM 04-c
**Resposta esperada:** PEDIDO: PK **id_pedido**; FK **id_cliente**. ITEM_PEDIDO: FKs **id_pedido** e **id_produto**; PK **composta (id_pedido, id_produto)** ou um id próprio.
**Critérios:** Nota cheia (0,4): PK e FKs das duas tabelas. Metade (0,2): uma tabela correta. Zero (0): nenhuma.

### ITEM 05-a
**Resposta esperada:** Diretora: **DER conceitual** (Chen). Desenvolvedor: **DER lógico** (pé de galinha).
**Critérios:** Nota cheia (0,2): os dois. Zero (0): invertidos.

### ITEM 05-b
**Resposta esperada:** O **conceitual** mostra o **negócio** (entidades, relacionamentos, cardinalidades) para **validar com o cliente**; o **lógico** mostra as **tabelas**, **colunas**, **chaves primárias e estrangeiras**, já com os N:N resolvidos.
**Critérios:** Nota cheia (0,4): diferença com elementos dos dois. Metade (0,2): só um explicado. Zero (0): invertida.

### ITEM 05-c
**Resposta esperada:** A **normalização** (aula 10) e a escrita do **SQL de criação das tabelas** (DDL, aula 12).
**Critérios:** Nota cheia (0,4): as duas. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 06-a
**Resposta esperada:** Colocar as **entidades fortes principais no centro** (ex.: ALUNO, PLANO, INSTRUTOR).
**Critérios:** Nota cheia (0,2): passo correto. Zero (0): começar pelos atributos.

### ITEM 06-b
**Resposta esperada:** Ligar com os **relacionamentos e verbos** → marcar as **cardinalidades** nos dois lados → acrescentar **fracas e associativas** → acrescentar os **atributos**, sublinhando os identificadores.
**Critérios:** Nota cheia (0,4): ordem completa. Metade (0,2): ordem com um passo faltando. Zero (0): ordem invertida.

### ITEM 06-c
**Resposta esperada:** Linhas cruzadas deixam o diagrama **difícil de ler**, inclusive pelo cliente. Padronizar: nomes **no singular**, com o **mesmo estilo** (maiúsculas para entidades, minúsculas com sublinhado para atributos).
**Critérios:** Nota cheia (0,4): motivo + padrão de nomes. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 07-a
**Resposta esperada:** (1) **brModelo**; (2) **draw.io**; (3) **pgAdmin ERD Tool**.
**Critérios:** Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 07-b
**Resposta esperada:** O brModelo foi **feito para ensino**, desenha a **notação de Chen** (conceitual) e **gera o modelo lógico**, mostrando a passagem de um para o outro.
**Critérios:** Nota cheia (0,4): ensino + Chen + geração do lógico. Metade (0,2): parcial. Zero (0): sem relação.

### ITEM 07-c
**Resposta esperada:** Gerar o SQL **economiza tempo** e **mantém diagrama e banco iguais**. Cuidado: **conferir o SQL gerado** (tipos, restrições, nomes, chaves) antes de executar, pois a ferramenta não conhece todas as regras do negócio.
**Critérios:** Nota cheia (0,4): vantagem + cuidado. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** (1) PACIENTE **sem identificador**; (2) relacionamento **sem verbo**; (3) **telefone repetido** em duas entidades; (4) **requisito do convênio** ausente.
**Critérios:** Nota cheia (0,2): os quatro. Metade (0,1): dois ou três. Zero (0): um ou nenhum.

### ITEM 08-b
**Resposta esperada:** O mesmo dado em dois lugares é **redundância**: se o paciente muda o telefone, uma das cópias fica **desatualizada** (inconsistência).
**Critérios:** Nota cheia (0,4): redundância + inconsistência. Metade (0,2): só um. Zero (0): diz que é correto.

### ITEM 08-c
**Resposta esperada:** (1) acrescentar **id_paciente** (sublinhado); (2) nomear o relacionamento com verbo (ex.: **"agenda"/"realiza"**); (3) deixar o telefone **só em PACIENTE**; (4) acrescentar **convênio** (atributo de PACIENTE ou entidade CONVÊNIO ligada a ele).
**Critérios:** Nota cheia (0,4): as quatro correções. Metade (0,2): duas ou três. Zero (0): uma ou nenhuma.

### ITEM 09-a
**Resposta esperada:** Ex.: "**Uma turma pode ter mais de um professor?** Se sim, esse relacionamento não seria N:N?"
**Critérios:** Nota cheia (0,2): sugestão em forma de pergunta, sem acusar. Metade (0,1): afirmação educada. Zero (0): acusação ("está errado").

### ITEM 09-b
**Resposta esperada:** **Escutar** sem se defender, **verificar nos requisitos** (a turma pode ter mais de um professor?) e **aceitar** a mudança ou **justificar** por que manter.
**Critérios:** Nota cheia (0,4): escutar + verificar + aceitar/justificar. Metade (0,2): dois dos três. Zero (0): recusar sem ouvir.

### ITEM 09-c
**Resposta esperada:** Para manter o **histórico das decisões**: o grupo e o professor sabem **o que mudou e por quê**, e evita-se voltar à mesma discussão depois.
**Critérios:** Nota cheia (0,4): histórico + motivo. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** Fortes: **CURSO, TURMA, ALUNO, RESPONSÁVEL, PROFESSOR**. Associativas: **MATRÍCULA** (ALUNO–TURMA) e **AULA_TURMA** (PROFESSOR–TURMA). Fraca: **PARCELA**.
**Critérios:** Nota cheia (0,2): todas corretas. Metade (0,1): um erro. Zero (0): dois ou mais.

### ITEM 10-b
**Resposta esperada:** CURSO (1,1)—oferece—(0,N) TURMA; ALUNO (1,1)—(0,N) MATRÍCULA (0,N)—(1,1) TURMA; MATRÍCULA (1,1)—gera—(1,N) PARCELA; RESPONSÁVEL (1,1)—responde por—(0,N) ALUNO; PROFESSOR (1,1)—(0,N) AULA_TURMA (0,N)—(1,1) TURMA.
**Critérios:** Nota cheia (0,4): cinco relacionamentos coerentes. Metade (0,2): três ou quatro. Zero (0): dois ou menos.

### ITEM 10-c
**Resposta esperada:** MATRÍCULA: **id_aluno, id_turma, data, situação, nota_final**. PARCELA: **número, vencimento, valor, data_pagamento** (e id_matricula). Identificador de PARCELA: **id_matricula + número**.
**Critérios:** Nota cheia (0,4): atributos das duas + identificador. Metade (0,2): parcial. Zero (0): sem relação.
