# Padrão de Resposta — Atividade Prática — Aula 10 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Normalização de Dados (1FN, 2FN e 3FN).
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
**Resposta esperada:** Organizar as tabelas para que **cada fato seja guardado uma única vez**, evitando **redundância** e **anomalias**.
**Critérios:** Nota cheia (0,2): cada fato uma vez / redundância e anomalias. Metade (0,1): só "organizar". Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** Dois entre: **menos redundância** (menos espaço e menos cópias); **menos erros e contradições**; **alterar em um só lugar**; banco **mais fácil de manter** e de consultar.
**Critérios:** Nota cheia (0,4): dois benefícios aplicados à loja. Metade (0,2): um benefício. Zero (0): benefícios errados.

### ITEM 01-c
**Resposta esperada:** Ex.: o **endereço do cliente** fica **só na tabela CLIENTE**; os pedidos guardam apenas o **id do cliente**. Se o cliente muda de endereço, altera-se **uma vez** e todos os pedidos passam a mostrar o novo.
**Critérios:** Nota cheia (0,4): exemplo com dado guardado uma vez + efeito. Metade (0,2): exemplo sem efeito. Zero (0): sem relação.

### ITEM 02-a
**Resposta esperada:** Não dá para **cadastrar um livro novo** (ou um leitor) **sem ter um empréstimo** dele.
**Critérios:** Nota cheia (0,2): exemplo coerente. Zero (0): exemplo de outra anomalia.

### ITEM 02-b
**Resposta esperada:** Se o **telefone do leitor** (ou a editora de um livro) mudar, é preciso alterar **todas as linhas** dele; esquecendo uma, o leitor fica com **telefones diferentes** e a biblioteca não sabe qual é o certo.
**Critérios:** Nota cheia (0,4): exemplo + consequência. Metade (0,2): só um. Zero (0): outra anomalia.

### ITEM 02-c
**Resposta esperada:** Ao apagar o **único empréstimo de um livro** (ou de um leitor), perde-se a informação de que **o livro existe** (título, autor, editora) ou os **dados do leitor**.
**Critérios:** Nota cheia (0,4): exemplo + o que se perde. Metade (0,2): só um. Zero (0): outra anomalia.

### ITEM 03-a
**Resposta esperada:** Conhecendo **A**, sabe-se **um único valor de B**.
**Critérios:** Nota cheia (0,2): definição correta. Zero (0): sem relação.

### ITEM 03-b
**Resposta esperada:** **id_pedido → data, id_cliente, valor_total**; **id_cliente → nome_cliente, cidade_cliente**.
**Critérios:** Nota cheia (0,4): as duas dependências. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 03-c
**Resposta esperada:** nome e cidade dependem de **id_cliente**, que não é a chave de PEDIDO (dependência **transitiva**: id_pedido → id_cliente → nome). Por isso vão para **CLIENTE**, e PEDIDO fica com id_cliente.
**Critérios:** Nota cheia (0,4): transitiva + divisão. Metade (0,2): só a divisão. Zero (0): sem relação.

### ITEM 04-a
**Resposta esperada:** **Valores atômicos**; **sem grupos repetidos**; **chave primária**.
**Critérios:** Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 04-b
**Resposta esperada:** **telefones** tem **vários valores numa célula** (não atômico); **email1, email2, email3** são **grupo repetido**.
**Critérios:** Nota cheia (0,4): os dois problemas. Metade (0,2): um. Zero (0): nenhum.

### ITEM 04-c
**Resposta esperada:** **CLIENTE (id_cliente, nome)**; **TELEFONE_CLIENTE (id_cliente, telefone)**; **EMAIL_CLIENTE (id_cliente, email)**.
**Critérios:** Nota cheia (0,4): três tabelas corretas. Metade (0,2): resolve só um dos problemas. Zero (0): mantém os problemas.

### ITEM 05-a
**Resposta esperada:** Quando um atributo depende **só de uma parte** de uma **chave composta**.
**Critérios:** Nota cheia (0,2): definição. Zero (0): confunde com transitiva.

### ITEM 05-b
**Resposta esperada:** **nome_produto** e **categoria_produto** dependem **só de id_produto**.
**Critérios:** Nota cheia (0,4): os dois atributos + a parte da chave. Metade (0,2): um. Zero (0): inclui quantidade.

### ITEM 05-c
**Resposta esperada:** **ITEM_PEDIDO (id_pedido, id_produto, quantidade)** e **PRODUTO (id_produto, nome, categoria)**. Quantidade fica porque depende da **chave inteira**: daquele produto naquele pedido.
**Critérios:** Nota cheia (0,4): tabelas + motivo. Metade (0,2): só um. Zero (0): quantidade em PRODUTO.

### ITEM 06-a
**Resposta esperada:** **Não está**: nome_aluno e turno dependem só de **parte** da chave composta.
**Critérios:** Nota cheia (0,2): não + motivo. Metade (0,1): só "não". Zero (0): "está".

### ITEM 06-b
**Resposta esperada:** **nome_aluno → ALUNO** (depende só de id_aluno); **turno → TURMA** (depende só de id_turma).
**Critérios:** Nota cheia (0,4): os dois destinos com motivo. Metade (0,2): um. Zero (0): nenhum.

### ITEM 06-c
**Resposta esperada:** **ALUNO (id_aluno, nome)**; **TURMA (id_turma, turno)**; **MATRICULA (id_aluno, id_turma, data_matricula, situacao)**. Data e situação dependem da **combinação** aluno–turma (chave inteira).
**Critérios:** Nota cheia (0,4): três tabelas + motivo. Metade (0,2): só um. Zero (0): estrutura errada.

### ITEM 07-a
**Resposta esperada:** Quando **A → B** e **B → C**: C depende da chave **por meio de um atributo não chave**.
**Critérios:** Nota cheia (0,2): definição. Zero (0): confunde com parcial.

### ITEM 07-b
**Resposta esperada:** **id_turma → id_curso → nome_curso, carga_curso, valor_mensal**.
**Critérios:** Nota cheia (0,4): cadeia com os atributos do curso. Metade (0,2): cadeia incompleta. Zero (0): sem relação.

### ITEM 07-c
**Resposta esperada:** **TURMA (id_turma, turno, sala, id_curso)** com **id_curso FK**; **CURSO (id_curso, nome, carga_horaria, valor_mensal)**.
**Critérios:** Nota cheia (0,4): duas tabelas + FK. Metade (0,2): sem indicar a FK. Zero (0): mantém tudo junto.

### ITEM 08-a
**Resposta esperada:** **3FN.**
**Critérios:** Nota cheia (0,2): 3FN. Zero (0): outra.

### ITEM 08-b
**Resposta esperada:** **id_consulta → id_paciente → nome_paciente**; **id_consulta → id_medico → nome_medico, especialidade**.
**Critérios:** Nota cheia (0,4): as duas cadeias. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 08-c
**Resposta esperada:** **CONSULTA (id_consulta, data, id_paciente, id_medico, valor)**; **PACIENTE (id_paciente, nome)**; **MEDICO (id_medico, nome, especialidade)**.
**Critérios:** Nota cheia (0,4): três tabelas corretas. Metade (0,2): duas. Zero (0): estrutura errada.

### ITEM 09-a
**Resposta esperada:** **Errado.**
**Critérios:** Nota cheia (0,2): errado. Zero (0): certo.

### ITEM 09-b
**Resposta esperada:** O preço no item é o **preço daquela venda** (histórico); o preço em PRODUTO é o **preço atual**. Se o produto mudar de preço, os **pedidos antigos** precisam continuar com o valor cobrado na época.
**Critérios:** Nota cheia (0,4): histórico × atual + consequência. Metade (0,2): explicação parcial. Zero (0): concorda em apagar.

### ITEM 09-c
**Resposta esperada:** **Desnormalização** é **repetir um dado de propósito** (ex.: para ganhar desempenho em relatórios). Cuidado: deve ser uma **decisão documentada e justificada**, com forma de manter os dados **coerentes**.
**Critérios:** Nota cheia (0,4): definição + cuidado. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** Separa os **telefones** (vários numa célula) numa tabela própria, deixando **um valor por célula**, e define a **chave primária**.
**Critérios:** Nota cheia (0,2): telefones separados / valores atômicos. Zero (0): sem relação.

### ITEM 10-b
**Resposta esperada:** **ALUNO (id_aluno PK, nome)**; **TELEFONE_ALUNO (id_aluno FK, telefone)**; **CURSO (id_curso PK, nome, carga_horaria)**; **TURMA (id_turma PK, codigo, turno, id_curso FK)**; **MATRICULA (id_aluno FK, id_turma FK, data_matricula; PK composta ou id próprio)**.
**Critérios:** Nota cheia (0,4): cinco tabelas com chaves. Metade (0,2): quatro tabelas ou sem as chaves. Zero (0): estrutura errada.

### ITEM 10-c
**Resposta esperada:** Conferir se cada tabela corresponde a uma **entidade ou associativa do DER** (ALUNO, CURSO, TURMA, MATRÍCULA) e se as **FKs** batem com os relacionamentos. Agora, a carga muda **uma só vez em CURSO** e vale para todas as turmas e matrículas.
**Critérios:** Nota cheia (0,4): conferência + efeito da mudança. Metade (0,2): só um. Zero (0): sem relação.
