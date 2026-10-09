# Padrão de Resposta — Atividade Prática — Aula 07 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Atributos.
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
**Resposta esperada:** Atributos: **título, autor, ano**. Valores: **Dom Casmurro, Machado de Assis, 1899**.
**Critérios:** Nota cheia (0,2): os dois grupos corretos. Zero (0): invertidos.

### ITEM 01-b
**Resposta esperada:** O **atributo** é a **característica** que o sistema guarda (vale para todas as ocorrências); o **valor** é o **conteúdo** desse atributo numa ocorrência específica.
**Critérios:** Nota cheia (0,4): diferença clara. Metade (0,2): só uma definição. Zero (0): definições trocadas.

### ITEM 01-c
**Resposta esperada:** Como **elipses ligadas** ao retângulo da entidade ou como **lista dentro do retângulo**.
**Critérios:** Nota cheia (0,4): uma das notações bem descrita. Metade (0,2): descrição vaga. Zero (0): losango ou linha dupla.

### ITEM 02-a
**Resposta esperada:** **Simples:** não se divide em partes com significado próprio. **Composto:** pode ser dividido em partes menores, cada uma com significado.
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 02-b
**Resposta esperada:** Simples: **CPF, data de nascimento, e-mail**. Compostos: **nome completo, endereço, telefone com DDD**.
**Critérios:** Nota cheia (0,4): seis corretos. Metade (0,2): quatro ou cinco. Zero (0): três ou menos.

### ITEM 02-c
**Resposta esperada:** Ex.: **endereço** → rua, número, complemento, bairro, cidade, UF, CEP (ou nome completo → nome e sobrenome; telefone → DDD e número).
**Critérios:** Nota cheia (0,4): composto com partes coerentes. Metade (0,2): partes incompletas. Zero (0): divide um atributo simples.

### ITEM 03-a
**Resposta esperada:** Dividir quando o sistema **precisa usar as partes separadamente** (filtrar, ordenar, validar).
**Critérios:** Nota cheia (0,2): critério de uso das partes. Zero (0): critério sem relação.

### ITEM 03-b
**Resposta esperada:** **Sim**: a loja precisa **filtrar por cidade e bairro**, o que exige essas partes **separadas**; com o endereço num campo só, o filtro seria impreciso.
**Critérios:** Nota cheia (0,4): decisão + justificativa pelo filtro. Metade (0,2): decisão sem justificativa. Zero (0): diz que não precisa dividir.

### ITEM 03-c
**Resposta esperada:** **Cada parte vira uma coluna** da tabela (rua, numero, bairro, cidade, cep).
**Critérios:** Nota cheia (0,4): cada parte = coluna, com exemplo. Metade (0,2): sem exemplo. Zero (0): sem relação.

### ITEM 04-a
**Resposta esperada:** **Descritivo:** descreve uma característica sem identificar. **Nominativo:** além de descrever, **nomeia ou identifica** a ocorrência. **Referencial:** **faz referência a outra entidade**.
**Critérios:** Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 04-b
**Resposta esperada:** **Código** e **nome**: nominativos; **carga horária** e **valor**: descritivos.
**Critérios:** Nota cheia (0,4): os quatro corretos. Metade (0,2): três. Zero (0): dois ou menos.

### ITEM 04-c
**Resposta esperada:** **Código da turma**: nominativo; **turno**: descritivo; **código do curso**: **referencial**. Ele indica que existe um **relacionamento entre TURMA e CURSO** (a turma pertence a um curso).
**Critérios:** Nota cheia (0,4): três corretos + significado. Metade (0,2): classificação certa sem significado. Zero (0): erra o referencial.

### ITEM 05-a
**Resposta esperada:** **Código do cliente**, apontando para **CLIENTE**.
**Critérios:** Nota cheia (0,2): atributo + entidade. Zero (0): outro atributo.

### ITEM 05-b
**Resposta esperada:** Mostra que existe um **relacionamento** entre PEDIDO e CLIENTE; na tabela, vira **chave estrangeira** (FK).
**Critérios:** Nota cheia (0,4): relacionamento + chave estrangeira. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 05-c
**Resposta esperada:** O atributo **aponta para algo que não existe**: não há onde conferir se o valor é válido e o relacionamento fica **sem sentido**; a entidade referenciada precisa ser criada ou o atributo removido.
**Critérios:** Nota cheia (0,4): erro + correção. Metade (0,2): só o erro. Zero (0): diz que está correto.

### ITEM 06-a
**Resposta esperada:** **Não se repete** e **não fica vazio**.
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 06-b
**Resposta esperada:** **Nome:** existem **homônimos**, então se repete. **E-mail:** **pode mudar** (e alguns alunos podem não ter), e o identificador não deve mudar nem faltar.
**Critérios:** Nota cheia (0,4): os dois problemas. Metade (0,2): um. Zero (0): nenhum.

### ITEM 06-c
**Resposta esperada:** **Código próprio (id)**: único, sempre preenchido e não muda. O CPF pode **não existir** para algumas crianças, e o identificador **não pode ficar vazio**.
**Critérios:** Nota cheia (0,4): id + problema do CPF. Metade (0,2): só um. Zero (0): recomenda o nome.

### ITEM 07-a
**Resposta esperada:** **Entidade, atributo, descrição, tipo, tamanho, obrigatório, classificação e exemplo.**
**Critérios:** Nota cheia (0,2): cinco ou mais colunas. Metade (0,1): três ou quatro. Zero (0): menos.

### ITEM 07-b
**Resposta esperada:** **preço** — valor de venda; decimal; obrigatório; simples, descritivo; 59,90. **código da categoria** — categoria do produto; inteiro; obrigatório; simples, referencial (CATEGORIA); 3.
**Critérios:** Nota cheia (0,4): as duas linhas coerentes. Metade (0,2): uma linha completa ou duas incompletas. Zero (0): classificações erradas.

### ITEM 07-c
**Resposta esperada:** **Padroniza** e **documenta** cada atributo, para que toda a equipe entenda o que guardar e como; evita dúvidas de formato e serve de base para **criar as tabelas** (aula 12).
**Critérios:** Nota cheia (0,4): documentação/padronização + uso na criação das tabelas. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** **Matrícula + número da parcela.**
**Critérios:** Nota cheia (0,2): os dois juntos. Metade (0,1): só um. Zero (0): valor ou vencimento.

### ITEM 08-b
**Resposta esperada:** **Número da parcela**: nominativo (parte do identificador); **matrícula**: referencial; **vencimento**, **valor** e **data de pagamento**: descritivos. A **data de pagamento** pode ficar vazia (parcela ainda não paga).
**Critérios:** Nota cheia (0,4): classificação + atributo opcional. Metade (0,2): só um. Zero (0): ambos errados.

### ITEM 08-c
**Resposta esperada:** É **referencial** porque aponta para a entidade **MATRÍCULA** (a dona) e é **parte do identificador** porque PARCELA é **fraca**: só se identifica junto com a matrícula.
**Critérios:** Nota cheia (0,4): as duas razões. Metade (0,2): uma. Zero (0): sem relação.

### ITEM 09-a
**Resposta esperada:** A **idade muda todo ano**; o certo é guardar a **data de nascimento** e calcular a idade.
**Critérios:** Nota cheia (0,2): problema + correção. Metade (0,1): só um. Zero (0): diz que está certo.

### ITEM 09-b
**Resposta esperada:** **Junta vários valores num campo só**: dificulta buscar, validar e alterar um dos telefones. Correção: guardar **cada telefone separadamente** (ex.: telefone principal e secundário, ou entidade TELEFONE ligada ao aluno).
**Critérios:** Nota cheia (0,4): problema + correção. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 09-c
**Resposta esperada:** Existem **homônimos**: dois alunos com o mesmo nome teriam o mesmo identificador. Correção: usar um **código próprio (id)** como identificador e manter o nome como atributo.
**Critérios:** Nota cheia (0,4): problema + correção. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** Compostos: **Nome** (nome e sobrenome) e **Endereço**. Simples: **CPF, Nascimento, Curso, Turma, Turno, Data**.
**Critérios:** Nota cheia (0,2): todos corretos. Metade (0,1): um ou dois erros. Zero (0): três ou mais erros.

### ITEM 10-b
**Resposta esperada:** **Nome** e **CPF**: nominativos; **Nascimento**, **Endereço**, **Turno** e **Data**: descritivos; **Curso** e **Turma**: referenciais.
**Critérios:** Nota cheia (0,4): todos corretos. Metade (0,2): até dois erros. Zero (0): três ou mais erros.

### ITEM 10-c
**Resposta esperada:** **Turno** pertence a **TURMA** (é característica da turma, não do aluno). **Data** pertence a **MATRÍCULA** (é a data da ligação aluno–turma).
**Critérios:** Nota cheia (0,4): as duas entidades com justificativa. Metade (0,2): uma, ou as duas sem justificativa. Zero (0): coloca as duas em ALUNO.
