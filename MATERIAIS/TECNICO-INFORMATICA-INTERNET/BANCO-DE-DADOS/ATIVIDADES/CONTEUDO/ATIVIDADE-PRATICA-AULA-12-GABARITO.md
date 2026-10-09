# Padrão de Resposta — Atividade Prática — Aula 12 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: DDL: Tabelas e Campos.
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
**Resposta esperada:** **Linguagem padrão** para **definir e manipular dados** em bancos relacionais.
**Critérios:** Nota cheia (0,2): linguagem + bancos relacionais. Metade (0,1): vago. Zero (0): confunde com SGBD.

### ITEM 01-b
**Resposta esperada:** A DDL **cria e altera a estrutura** do banco (tabelas, colunas): **CREATE, ALTER e DROP**.
**Critérios:** Nota cheia (0,4): função + três comandos. Metade (0,2): só um dos dois. Zero (0): cita comandos DML.

### ITEM 01-c
**Resposta esperada:** A DML **mexe nos dados**: **INSERT, UPDATE, DELETE e SELECT**. Ex.: cadastrar um aluno (INSERT) ou listar as turmas com vaga (SELECT).
**Critérios:** Nota cheia (0,4): função + quatro comandos + exemplo. Metade (0,2): parcial. Zero (0): cita comandos DDL.

### ITEM 02-a
**Resposta esperada:** nome **varchar(120)**; estoque **integer**.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.

### ITEM 02-b
**Resposta esperada:** preço **numeric(10,2)**: ponto flutuante pode gerar **erros de arredondamento**; o numeric é **exato**.
**Critérios:** Nota cheia (0,4): tipo + motivo. Metade (0,2): só um. Zero (0): float, text ou integer.

### ITEM 02-c
**Resposta esperada:** ativo **boolean**; descrição **text** (sem NOT NULL); data de lançamento **date**.
**Critérios:** Nota cheia (0,4): os três. Metade (0,2): dois. Zero (0): um ou nenhum.

### ITEM 03-a
**Resposta esperada:** **char(2)** (ou varchar(2)).
**Critérios:** Nota cheia (0,2): tamanho 2. Zero (0): varchar(255).

### ITEM 03-b
**Resposta esperada:** CPF e telefone **não são usados em contas** e começam com **zero** às vezes; como número, o **zero à esquerda se perde**. Tipo correto: **varchar(11)** só com dígitos.
**Critérios:** Nota cheia (0,4): motivo + tipo. Metade (0,2): só um. Zero (0): mantém número.

### ITEM 03-c
**Resposta esperada:** **timestamptz** (data e hora com fuso), em geral com **DEFAULT now()**, porque date guarda só a data e perde a hora.
**Critérios:** Nota cheia (0,4): tipo + motivo. Metade (0,2): tipo sem motivo. Zero (0): date ou texto.

### ITEM 04-a
**Resposta esperada:** **id_curso integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY**
**Critérios:** Nota cheia (0,2): identidade + PK. Metade (0,1): falta uma das partes. Zero (0): sem identidade nem PK.

### ITEM 04-b
**Resposta esperada:** CREATE TABLE curso ( id_curso integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, nome varchar(100) NOT NULL, carga_horaria integer NOT NULL, valor_mensal numeric(10,2) NOT NULL, ativo boolean NOT NULL DEFAULT true );
**Critérios:** Nota cheia (0,4): comando completo e funcional. Metade (0,2): estrutura certa com tipo ou restrição errados. Zero (0): comando que não cria a tabela.

### ITEM 04-c
**Resposta esperada:** **NOT NULL** torna o campo **obrigatório**; **DEFAULT true** preenche ativo com verdadeiro quando nada for informado.
**Critérios:** Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.

### ITEM 05-a
**Resposta esperada:** Porque **algumas crianças podem não ter CPF**; obrigatório, o cadastro delas seria recusado.
**Critérios:** Nota cheia (0,2): motivo. Zero (0): sem relação.

### ITEM 05-b
**Resposta esperada:** CREATE TABLE aluno ( id_aluno integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, nome varchar(100) NOT NULL, cpf varchar(11), data_nascimento date NOT NULL, email varchar(120), criado_em timestamptz NOT NULL DEFAULT now() );
**Critérios:** Nota cheia (0,4): comando completo e funcional com as obrigatoriedades certas. Metade (0,2): uma ou duas falhas. Zero (0): não cria a tabela.

### ITEM 05-c
**Resposta esperada:** Com **DEFAULT now()**, que grava a data e a hora do momento da inserção, no tipo **timestamptz**.
**Critérios:** Nota cheia (0,4): DEFAULT now() + timestamptz. Metade (0,2): só um. Zero (0): preenchimento manual.

### ITEM 06-a
**Resposta esperada:** **\dt**
**Critérios:** Nota cheia (0,2): \dt. Zero (0): outro.

### ITEM 06-b
**Resposta esperada:** **\d aluno**: mostra as **colunas**, os **tipos**, se aceitam vazio, os **valores padrão** e as **restrições/índices** da tabela.
**Critérios:** Nota cheia (0,4): comando + o que exibe. Metade (0,2): só um. Zero (0): comando errado.

### ITEM 06-c
**Resposta esperada:** No pgAdmin: **Schemas → public → Tables → aluno → Columns** (ou Properties da tabela).
**Critérios:** Nota cheia (0,4): caminho correto. Metade (0,2): caminho incompleto. Zero (0): sem relação.

### ITEM 07-a
**Resposta esperada:** **ALTER TABLE aluno ADD COLUMN celular varchar(11);**
**Critérios:** Nota cheia (0,2): comando correto. Zero (0): comando errado.

### ITEM 07-b
**Resposta esperada:** **ALTER TABLE aluno ALTER COLUMN email TYPE varchar(150);** e **ALTER TABLE aluno RENAME COLUMN telefone TO telefone_fixo;**
**Critérios:** Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.

### ITEM 07-c
**Resposta esperada:** Porque os **dados atuais precisam caber ou ser convertidos** para o novo tipo; se algum valor não couber (ex.: texto maior que o novo limite, letras numa coluna que vira número), o comando **falha**.
**Critérios:** Nota cheia (0,4): motivo com exemplo. Metade (0,2): motivo vago. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** **ALTER TABLE aluno ALTER COLUMN email SET NOT NULL;**
**Critérios:** Nota cheia (0,2): comando correto. Zero (0): errado.

### ITEM 08-b
**Resposta esperada:** Já existem **alunos com e-mail vazio (NULL)**; o banco não aceita tornar obrigatório um campo que já tem vazios.
**Critérios:** Nota cheia (0,4): causa correta. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 08-c
**Resposta esperada:** **Preencher os e-mails vazios** antes (pedir os dados aos alunos ou, se combinado, usar um valor provisório com UPDATE) e só então executar o SET NOT NULL de novo.
**Critérios:** Nota cheia (0,4): preencher antes + repetir o comando. Metade (0,2): só um. Zero (0): apagar os alunos.

### ITEM 09-a
**Resposta esperada:** **Apaga a tabela aluno e todos os dados** dela.
**Critérios:** Nota cheia (0,2): tabela + dados. Metade (0,1): só "apaga a tabela". Zero (0): "apaga só os dados".

### ITEM 09-b
**Resposta esperada:** Fazer **backup**, confirmar que é mesmo para apagar, verificar **dependências** (outras tabelas que apontam para aluno) e, de preferência, **não fazer em produção**; usar um banco de teste para "começar de novo".
**Critérios:** Nota cheia (0,4): dois ou mais cuidados. Metade (0,2): um. Zero (0): nenhum.

### ITEM 09-c
**Resposta esperada:** **IF EXISTS** evita erro quando a tabela **não existe**; é útil em **scripts de teste** que recriam o banco do zero.
**Critérios:** Nota cheia (0,4): função + uso. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** Arquivo **.sql** com os **comandos de criação da estrutura**, em ordem e com comentários.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 10-b
**Resposta esperada:** Criar primeiro as tabelas **referenciadas** e depois as que **apontam** para elas. Ex.: **curso antes de turma** (turma tem id_curso); **aluno e turma antes de matricula**; **matricula antes de parcela**.
**Critérios:** Nota cheia (0,4): regra + exemplo. Metade (0,2): só um. Zero (0): "qualquer ordem".

### ITEM 10-c
**Resposta esperada:** **psql -U postgres -d escola_db -f 01-ddl-escola.sql**. Versionar guarda o **histórico** das mudanças e permite **recriar o banco igual** em qualquer máquina da equipe.
**Critérios:** Nota cheia (0,4): comando + motivo. Metade (0,2): só um. Zero (0): nenhum.
