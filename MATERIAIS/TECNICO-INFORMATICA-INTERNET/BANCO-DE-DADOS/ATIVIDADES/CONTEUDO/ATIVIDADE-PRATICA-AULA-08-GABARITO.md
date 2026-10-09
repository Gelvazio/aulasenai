# Padrão de Resposta — Atividade Prática — Aula 08 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Relacionamentos 1:1, 1:N e N:N.
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
**Resposta esperada:** É a **associação entre entidades** que o sistema precisa registrar; verbo: **"faz"** (ou "realiza").
**Critérios:** Nota cheia (0,2): definição + verbo. Metade (0,1): só um. Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** "Um cliente faz **quantos** pedidos no máximo?" → **vários (N)**. "Um pedido é feito por **quantos** clientes no máximo?" → **um (1)**.
**Critérios:** Nota cheia (0,4): as duas perguntas com respostas certas. Metade (0,2): uma pergunta certa. Zero (0): nenhuma.

### ITEM 01-c
**Resposta esperada:** **1:N** (um cliente, vários pedidos). O colega leu como se cada cliente fizesse **um só** pedido; não analisou que o mesmo cliente volta a comprar.
**Critérios:** Nota cheia (0,4): 1:N + explicação do erro. Metade (0,2): só a cardinalidade. Zero (0): mantém 1:1.

### ITEM 02-a
**Resposta esperada:** **1:1.**
**Critérios:** Nota cheia (0,2): 1:1. Zero (0): outra.

### ITEM 02-b
**Resposta esperada:** Cada ocorrência de um lado se liga a **no máximo uma** do outro: **um funcionário tem um crachá** e **um crachá é de um funcionário**.
**Critérios:** Nota cheia (0,4): definição aplicada aos dois sentidos. Metade (0,2): só um sentido. Zero (0): definição de 1:N.

### ITEM 02-c
**Resposta esperada:** (1) **chave estrangeira com UNIQUE** num dos lados (ex.: CRACHA.id_funcionario UNIQUE); (2) **juntar numa só tabela** (dados do crachá como colunas de FUNCIONÁRIO), quando sempre andam juntos.
**Critérios:** Nota cheia (0,4): as duas formas. Metade (0,2): uma. Zero (0): tabela associativa como única forma.

### ITEM 03-a
**Resposta esperada:** **1:N** (uma categoria, vários produtos).
**Critérios:** Nota cheia (0,2): 1:N no sentido certo. Zero (0): outra.

### ITEM 03-b
**Resposta esperada:** Em **PRODUTO** (o lado N), com o atributo **id_categoria**, que aponta para CATEGORIA.
**Critérios:** Nota cheia (0,4): tabela + atributo. Metade (0,2): só a tabela. Zero (0): em CATEGORIA.

### ITEM 03-c
**Resposta esperada:** CATEGORIA teria de guardar **vários produtos num campo só** (uma lista), o que dificulta buscar, alterar e garantir a ligação; no lado N, cada produto guarda **um único valor**.
**Critérios:** Nota cheia (0,4): problema da lista + vantagem do lado N. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 04-a
**Resposta esperada:** **CURSO (1,1) — oferece — (0,N) TURMA.**
**Critérios:** Nota cheia (0,2): os dois lados certos. Metade (0,1): um lado certo. Zero (0): nenhum.

### ITEM 04-b
**Resposta esperada:** "Um **curso oferece de zero a várias turmas**." "Uma **turma pertence a exatamente um curso**."
**Critérios:** Nota cheia (0,4): as duas frases corretas. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 04-c
**Resposta esperada:** Com mínimo **0**, o curso pode ser **cadastrado antes de ter turmas**; se fosse 1, o sistema não aceitaria um curso novo sem uma turma já criada.
**Critérios:** Nota cheia (0,4): efeito no cadastro + comparação. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 05-a
**Resposta esperada:** **N:N.**
**Critérios:** Nota cheia (0,2): N:N. Zero (0): outra.

### ITEM 05-b
**Resposta esperada:** Com uma **tabela associativa** (ex.: **LIVRO_AUTOR**) com **id_livro** e **id_autor** (chaves estrangeiras) e a ordem do autor.
**Critérios:** Nota cheia (0,4): associativa + as duas FKs. Metade (0,2): associativa sem colunas. Zero (0): FK num lado só.

### ITEM 05-c
**Resposta esperada:** Na **tabela associativa LIVRO_AUTOR**, porque a ordem é um **dado da ligação**: o mesmo autor pode ser o 1º num livro e o 2º em outro.
**Critérios:** Nota cheia (0,4): local + motivo. Metade (0,2): só o local. Zero (0): em LIVRO ou AUTOR.

### ITEM 06-a
**Resposta esperada:** **N:N** (um pedido tem vários produtos; um produto está em vários pedidos).
**Critérios:** Nota cheia (0,2): N:N. Zero (0): outra.

### ITEM 06-b
**Resposta esperada:** Limita o pedido a **3 produtos**; deixa campos **vazios** em pedidos menores; não tem onde guardar **quantidade e preço** de cada um; dificulta consultas como "quantas vezes o produto X foi vendido".
**Critérios:** Nota cheia (0,4): dois ou mais problemas. Metade (0,2): um. Zero (0): diz que está certo.

### ITEM 06-c
**Resposta esperada:** Tabela **ITEM_PEDIDO** (id_pedido, id_produto, quantidade, preco_unitario). **Quantidade** e **preço de venda** ficam nela, porque são **dados de cada combinação** pedido–produto.
**Critérios:** Nota cheia (0,4): tabela com colunas + motivo. Metade (0,2): só a tabela. Zero (0): sem associativa.

### ITEM 07-a
**Resposta esperada:** Se a participação no relacionamento é **obrigatória (1)** ou **opcional (0)**.
**Critérios:** Nota cheia (0,2): as duas ideias. Metade (0,1): uma. Zero (0): confunde com a máxima.

### ITEM 07-b
**Resposta esperada:** **ALUNO (1,1) — (0,N) CONTRATO**: um aluno tem **de 0 a vários** contratos (pode se cadastrar sem plano); cada contrato é de **exatamente 1** aluno.
**Critérios:** Nota cheia (0,4): os dois lados certos com leitura. Metade (0,2): um lado. Zero (0): nenhum.

### ITEM 07-c
**Resposta esperada:** Lado do CONTRATO, visto do aluno: **círculo + tridente** (zero ou muitos). Lado do ALUNO, visto do contrato: **traço + traço** (exatamente um).
**Critérios:** Nota cheia (0,4): os dois lados na notação. Metade (0,2): um lado. Zero (0): símbolos trocados.

### ITEM 08-a
**Resposta esperada:** É quando uma entidade **se relaciona com ela mesma**.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 08-b
**Resposta esperada:** **1:N**: um supervisor supervisiona vários funcionários; cada funcionário tem no máximo um supervisor. A participação mínima do funcionário é **0**, porque o **diretor não tem supervisor**.
**Critérios:** Nota cheia (0,4): 1:N + mínima 0 justificada pelo diretor. Metade (0,2): só um. Zero (0): N:N sem justificativa.

### ITEM 08-c
**Resposta esperada:** Uma coluna **id_supervisor** em FUNCIONÁRIO, **chave estrangeira para a própria tabela** FUNCIONÁRIO, podendo ficar **vazia** (para o diretor).
**Critérios:** Nota cheia (0,4): FK para a própria tabela + vazio permitido. Metade (0,2): só a FK. Zero (0): outra tabela sem relação.

### ITEM 09-a
**Resposta esperada:** Sem tabela associativa, **não há onde guardar as ligações** entre alunos e turmas nem os dados da matrícula (data, situação).
**Critérios:** Nota cheia (0,2): problema. Zero (0): diz que está certo.

### ITEM 09-b
**Resposta esperada:** CURSO teria de guardar **uma lista de turmas** num campo; a chave deve ficar em **TURMA** (o lado N), com **id_curso**.
**Critérios:** Nota cheia (0,4): problema + local certo. Metade (0,2): só um. Zero (0): mantém em CURSO.

### ITEM 09-c
**Resposta esperada:** Marcar obrigatório o lado errado pode fazer o banco **exigir pedido para cadastrar cliente**, impedindo cadastros que a loja precisa. Evita-se **perguntando ao cliente** e marcando como **opcional (0)** o pedido para o cliente.
**Critérios:** Nota cheia (0,4): risco + como evitar. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** ALUNO–TURMA **N:N**; MATRÍCULA–PARCELA **1:N**; RESPONSÁVEL–ALUNO **1:N**; PROFESSOR–TURMA **N:N**.
**Critérios:** Nota cheia (0,2): as quatro. Metade (0,1): três. Zero (0): duas ou menos.

### ITEM 10-b
**Resposta esperada:** ALUNO–TURMA: tabela associativa **MATRÍCULA** (id_aluno, id_turma, data, situação). PROFESSOR–TURMA: tabela associativa (ex.: **AULA_TURMA** ou PROFESSOR_TURMA) com id_professor e id_turma.
**Critérios:** Nota cheia (0,4): as duas associativas com as FKs. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 10-c
**Resposta esperada:** MATRÍCULA–PARCELA: **id_matricula em PARCELA** (lado N; parte do identificador, pois PARCELA é fraca). RESPONSÁVEL–ALUNO: **id_responsavel em ALUNO** (lado N).
**Critérios:** Nota cheia (0,4): as duas FKs no lado certo. Metade (0,2): uma. Zero (0): nenhuma.
