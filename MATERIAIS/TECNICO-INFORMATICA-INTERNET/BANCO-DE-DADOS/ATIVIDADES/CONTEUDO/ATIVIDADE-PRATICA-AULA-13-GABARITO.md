# Padrão de Resposta — Atividade Prática — Aula 13 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: DDL: Relações, Chaves e Restrições.
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
**Resposta esperada:** Que cada linha tenha um identificador **único** e **não nulo**.
**Critérios:** Nota cheia (0,2): único + não nulo. Metade (0,1): só um. Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** **id_aluno integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY**
**Critérios:** Nota cheia (0,4): identidade + PK. Metade (0,2): só PK ou só identidade. Zero (0): errado.

### ITEM 01-c
**Resposta esperada:** **PRIMARY KEY (id_matricula, numero)**. É composta porque parcela é **entidade fraca**: o número sozinho se repete em toda matrícula; só a **combinação** identifica a parcela.
**Critérios:** Nota cheia (0,4): comando + motivo. Metade (0,2): só um. Zero (0): PK só no número.

### ITEM 02-a
**Resposta esperada:** Garantia de que toda **chave estrangeira aponta para uma linha que existe** na tabela referenciada.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 02-b
**Resposta esperada:** CREATE TABLE turma ( id_turma integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, codigo varchar(10) NOT NULL UNIQUE, turno varchar(5) NOT NULL CHECK (turno IN ('manha', 'tarde', 'noite')), id_curso integer NOT NULL REFERENCES curso (id_curso) );
**Critérios:** Nota cheia (0,4): comando funcional com FK, UNIQUE e NOT NULL (CHECK do turno opcional). Metade (0,2): FK correta com outras falhas. Zero (0): sem FK.

### ITEM 02-c
**Resposta esperada:** O banco **recusa a gravação** com o erro **violates foreign key constraint**, porque o curso não existe.
**Critérios:** Nota cheia (0,4): recusa + erro/motivo. Metade (0,2): só "dá erro". Zero (0): diz que grava.

### ITEM 03-a
**Resposta esperada:** **id_aluno** (para aluno) e **id_turma** (para turma).
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 03-b
**Resposta esperada:** CREATE TABLE matricula ( id_matricula integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, id_aluno integer NOT NULL REFERENCES aluno (id_aluno), id_turma integer NOT NULL REFERENCES turma (id_turma), data_matricula date NOT NULL DEFAULT current_date, situacao varchar(10) NOT NULL DEFAULT 'ativa', UNIQUE (id_aluno, id_turma) ); (PK composta (id_aluno, id_turma) também é aceita.)
**Critérios:** Nota cheia (0,4): duas FKs + defaults + unicidade da combinação. Metade (0,2): uma ou duas falhas. Zero (0): sem FKs.

### ITEM 03-c
**Resposta esperada:** **UNIQUE (id_aluno, id_turma)** (ou PK composta): a **combinação** aluno + turma não pode se repetir; o mesmo aluno pode estar em outras turmas, mas não duas vezes na mesma.
**Critérios:** Nota cheia (0,4): restrição + funcionamento. Metade (0,2): só a restrição. Zero (0): UNIQUE só em id_aluno.

### ITEM 04-a
**Resposta esperada:** (1) **RESTRICT** (ou padrão); (2) **CASCADE**; (3) **SET NULL**.
**Critérios:** Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 04-b
**Resposta esperada:** (1) curso com turmas não deve sumir por engano: **RESTRICT impede**. (2) parcelas são **entidade fraca** e não fazem sentido sem a matrícula: **CASCADE apaga junto**.
**Critérios:** Nota cheia (0,4): as duas justificativas. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 04-c
**Resposta esperada:** **SET NULL** mantém os funcionários e apenas **esvazia o id_supervisor**; para isso a coluna precisa **aceitar vazio** (sem NOT NULL).
**Critérios:** Nota cheia (0,4): justificativa + condição de aceitar NULL. Metade (0,2): só um. Zero (0): CASCADE.

### ITEM 05-a
**Resposta esperada:** Porque parcela é **entidade fraca**: não faz sentido existir **sem a matrícula**.
**Critérios:** Nota cheia (0,2): motivo. Zero (0): sem relação.

### ITEM 05-b
**Resposta esperada:** CREATE TABLE parcela ( id_matricula integer NOT NULL REFERENCES matricula (id_matricula) ON DELETE CASCADE, numero smallint NOT NULL, vencimento date NOT NULL, valor numeric(10,2) NOT NULL CHECK (valor > 0), data_pagamento date, PRIMARY KEY (id_matricula, numero) );
**Critérios:** Nota cheia (0,4): FK com CASCADE, CHECK, PK composta e data opcional. Metade (0,2): uma ou duas falhas. Zero (0): sem FK.

### ITEM 05-c
**Resposta esperada:** CASCADE pode **apagar muitos dados de uma vez** sem aviso; usar **só quando as filhas não fazem sentido sem o pai** e, em produção, apagar com cuidado (backup, conferência).
**Critérios:** Nota cheia (0,4): risco + quando usar. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 06-a
**Resposta esperada:** **UNIQUE.**
**Critérios:** Nota cheia (0,2): UNIQUE. Zero (0): outra.

### ITEM 06-b
**Resposta esperada:** ALTER TABLE aluno ADD CONSTRAINT aluno_cpf_unico UNIQUE (cpf); ALTER TABLE aluno ADD CONSTRAINT aluno_email_unico UNIQUE (email);
**Critérios:** Nota cheia (0,4): os dois comandos nomeados. Metade (0,2): um, ou os dois sem nome. Zero (0): nenhum.

### ITEM 06-c
**Resposta esperada:** **Sim**: vazios (NULL) **não contam** como repetidos. O comando **falha** se já houver **CPFs repetidos** na tabela; é preciso corrigi-los antes.
**Critérios:** Nota cheia (0,4): as duas explicações. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 07-a
**Resposta esperada:** Exige que **toda linha cumpra uma condição**.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 07-b
**Resposta esperada:** **CHECK (valor_mensal > 0)** e **CHECK (turno IN ('manha', 'tarde', 'noite'))**.
**Critérios:** Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.

### ITEM 07-c
**Resposta esperada:** **CHECK (situacao IN ('ativa', 'trancada', 'concluida', 'cancelada'))**: o banco só aceita os valores da **lista fechada** (domínio), recusando grafias diferentes.
**Critérios:** Nota cheia (0,4): comando + ligação com domínio. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 08-a
**Resposta esperada:** Para que as **mensagens de erro** mostrem qual regra foi violada e para **alterar ou remover** a restrição depois com facilidade.
**Critérios:** Nota cheia (0,2): um dos dois motivos bem explicado. Zero (0): sem relação.

### ITEM 08-b
**Resposta esperada:** ALTER TABLE aluno ADD CONSTRAINT aluno_responsavel_fk FOREIGN KEY (id_responsavel) REFERENCES responsavel (id_responsavel);
**Critérios:** Nota cheia (0,4): comando correto. Metade (0,2): sem nome ou com pequeno erro. Zero (0): errado.

### ITEM 08-c
**Resposta esperada:** **ALTER TABLE aluno DROP CONSTRAINT aluno_email_unico;** Aceitável quando a **regra de negócio mudou** (com registro da decisão e aprovação do cliente), nunca só para "fazer passar" um dado errado.
**Critérios:** Nota cheia (0,4): comando + condição. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 09-a
**Resposta esperada:** (1) **chaves estrangeiras** para aluno e turma com **NOT NULL**; (2) **UNIQUE (cpf)**.
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.

### ITEM 09-b
**Resposta esperada:** Porque depende de **contar outras linhas** (as matrículas da turma), e o CHECK só olha a **linha atual**. Será garantida por **trigger** (aula 18) ou procedimento.
**Critérios:** Nota cheia (0,4): motivo + trigger. Metade (0,2): só um. Zero (0): diz que CHECK resolve.

### ITEM 09-c
**Resposta esperada:** Porque o banco **protege os dados de qualquer origem** (outro sistema, comando direto, erro no front-end); a tela pode ser contornada, o banco não.
**Critérios:** Nota cheia (0,4): proteção independente da tela. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** (1) **UNIQUE** aluno_cpf_unico; (2) **chave estrangeira** de turma; (3) **CHECK** do valor da parcela.
**Critérios:** Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 10-b
**Resposta esperada:** (1) gravar um **CPF que já existe**; (2) gravar uma turma com **id_curso que não existe** em curso.
**Critérios:** Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.

### ITEM 10-c
**Resposta esperada:** O colega gravou uma parcela com **valor que não cumpre o CHECK** (zero ou negativo). Corrigir: informar um **valor maior que zero**.
**Critérios:** Nota cheia (0,4): interpretação + correção. Metade (0,2): só um. Zero (0): sugere remover a restrição.
