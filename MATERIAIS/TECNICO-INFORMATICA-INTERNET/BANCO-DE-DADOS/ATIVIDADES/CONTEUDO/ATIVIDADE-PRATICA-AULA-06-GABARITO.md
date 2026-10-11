# Padrão de Resposta — Atividade Prática — Aula 06 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Entidades Fortes, Fracas e Associativas.
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
**Resposta esperada:** Descreve os dados do sistema: **entidades**, seus **atributos** e os **relacionamentos** entre elas.
**Critérios:** Nota cheia (0,2): três elementos. Metade (0,1): um ou dois. Zero (0): confunde com SQL ou instalação.

### ITEM 01-b
**Resposta esperada:** Fica no **nível conceitual**; é independente do SGBD porque descreve **o que** o sistema guarda, sem comandos nem detalhes de um gerenciador específico — o mesmo MER pode virar tabelas em PostgreSQL, MySQL etc.
**Critérios:** Nota cheia (0,4): nível + motivo da independência. Metade (0,2): só um. Zero (0): nível físico.

### ITEM 01-c
**Resposta esperada:** Sem o MER, os dados não são **entendidos e validados** com o cliente: as tabelas saem com **redundância, entidades faltando ou relacionamentos errados**, e é preciso **refazer** o banco depois, com mais custo.
**Critérios:** Nota cheia (0,4): risco concreto + retrabalho. Metade (0,2): "fica errado" sem detalhar. Zero (0): diz que não há risco.

### ITEM 02-a
**Resposta esperada:** LIVRO é a **entidade**; "Dom Casmurro" é uma **ocorrência (instância)** de LIVRO.
**Critérios:** Nota cheia (0,2): os dois corretos. Zero (0): invertidos.

### ITEM 02-b
**Resposta esperada:** A **entidade** é o **conjunto** (todos os livros); a **ocorrência** é **cada elemento** (um livro). Outro exemplo: LEITOR (entidade) e "Maria Silva" (ocorrência).
**Critérios:** Nota cheia (0,4): diferença + outro exemplo. Metade (0,2): só um. Zero (0): conceito errado.

### ITEM 02-c
**Resposta esperada:** **EMPRÉSTIMO** (ou RESERVA, MULTA): não é objeto físico, mas tem **dados próprios** (data de retirada, data de devolução) e **várias ocorrências**, por isso é entidade.
**Critérios:** Nota cheia (0,4): exemplo abstrato + justificativa. Metade (0,2): exemplo sem justificativa. Zero (0): exemplo concreto (livro, estante).

### ITEM 03-a
**Resposta esperada:** "**Isso tem dados próprios e várias ocorrências?**"
**Critérios:** Nota cheia (0,2): pergunta com as duas ideias. Metade (0,1): só uma. Zero (0): sem relação.

### ITEM 03-b
**Resposta esperada:** Entidades: **cliente, endereço, pedido, entregador**. Atributos: **telefone** (de cliente), **cor da moto** (de entregador ou moto).
**Critérios:** Nota cheia (0,4): seis corretos. Metade (0,2): quatro ou cinco. Zero (0): três ou menos.

### ITEM 03-c
**Resposta esperada:** No app, cada cliente tem **vários endereços** com **dados próprios** (apelido, rua, número, referência), então é entidade. Numa escola que guarda **um único endereço** por aluno, ele é só uma **característica** do aluno: atributo.
**Critérios:** Nota cheia (0,4): os dois contextos explicados. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 04-a
**Resposta esperada:** **Existe por si só** e tem **identificador próprio**.
**Critérios:** Nota cheia (0,2): as duas ideias. Metade (0,1): uma. Zero (0): confunde com fraca.

### ITEM 04-b
**Resposta esperada:** **CLIENTE, PRODUTO, PEDIDO e CATEGORIA.**
**Critérios:** Nota cheia (0,4): as quatro. Metade (0,2): três. Zero (0): inclui ITEM_PEDIDO e erra duas ou mais.

### ITEM 04-c
**Resposta esperada:** ITEM_PEDIDO **depende de PEDIDO** (o "item 2" só faz sentido dentro de um pedido) e é identificado junto com ele; também liga PEDIDO a PRODUTO com quantidade e preço — é **fraca/associativa**, não forte.
**Critérios:** Nota cheia (0,4): dependência do pedido explicada. Metade (0,2): só "depende" sem explicar. Zero (0): diz que é forte.

### ITEM 05-a
**Resposta esperada:** **Entidade fraca**; dona: **FUNCIONÁRIO**.
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): forte.

### ITEM 05-b
**Resposta esperada:** Pela **chave do funcionário** **mais** um **identificador parcial** do dependente (ex.: funcionário 120 + dependente 1, ou + nome).
**Critérios:** Nota cheia (0,4): chave da dona + parcial. Metade (0,2): só a chave do dependente. Zero (0): sem relação.

### ITEM 05-c
**Resposta esperada:** Os dependentes **deixam de existir** também, porque só existem **ligados ao funcionário**; sem ele, não fazem sentido no cadastro.
**Critérios:** Nota cheia (0,4): consequência + motivo. Metade (0,2): só um. Zero (0): diz que continuam iguais.

### ITEM 06-a
**Resposta esperada:** **Fraca**, depende de **MATRÍCULA**.
**Critérios:** Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): forte.

### ITEM 06-b
**Resposta esperada:** Toda matrícula tem uma "parcela 3"; só a **matrícula + o número** (ex.: matrícula 15, parcela 3) identifica uma parcela específica.
**Critérios:** Nota cheia (0,4): explicação com a combinação. Metade (0,2): explicação vaga. Zero (0): sem relação.

### ITEM 06-c
**Resposta esperada:** **Retângulo de linha dupla** (e o relacionamento identificador em losango duplo). Comunica que a entidade **depende da dona** para existir e ser identificada.
**Critérios:** Nota cheia (0,4): notação + significado. Metade (0,2): só um. Zero (0): notação errada.

### ITEM 07-a
**Resposta esperada:** **MATRÍCULA**, ligando **ALUNO** e **TURMA**.
**Critérios:** Nota cheia (0,2): entidade + as duas que liga. Metade (0,1): só o nome. Zero (0): outra entidade.

### ITEM 07-b
**Resposta esperada:** Esses dados são **da ligação** entre um aluno **e** uma turma: o mesmo aluno tem datas e notas diferentes em cada turma, e a mesma turma tem uma situação para cada aluno. Em ALUNO ou TURMA, eles se repetiriam ou se perderiam.
**Critérios:** Nota cheia (0,4): dados pertencem à combinação + exemplo. Metade (0,2): explicação vaga. Zero (0): diz que podem ficar em ALUNO.

### ITEM 07-c
**Resposta esperada:** Quando o relacionamento é **muitos-para-muitos** e **tem dados próprios**.
**Critérios:** Nota cheia (0,4): as duas condições. Metade (0,2): uma. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** Fortes: **PACIENTE** e **MÉDICO**. Associativa: **CONSULTA** (atendimento).
**Critérios:** Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.

### ITEM 08-b
**Resposta esperada:** O atendimento liga **paciente e médico em relação N:N** e tem **dados próprios** (data, hora, diagnóstico, valor) com **várias ocorrências**; não é característica de um só paciente ou médico.
**Critérios:** Nota cheia (0,4): N:N + dados próprios. Metade (0,2): só um. Zero (0): diz que é atributo.

### ITEM 08-c
**Resposta esperada:** **Fraca** depende de **uma dona** para existir (PARCELA só existe dentro da MATRÍCULA); **associativa** nasce de um **relacionamento N:N com dados próprios**, ligando duas entidades (CONSULTA liga PACIENTE e MÉDICO).
**Critérios:** Nota cheia (0,4): diferença com os dois exemplos. Metade (0,2): diferença sem exemplos. Zero (0): conceitos trocados.

### ITEM 09-a
**Resposta esperada:** **aluno, cliente, nome, CPF, telefone, plano, ficha de treino, instrutor, suplementos**.
**Critérios:** Nota cheia (0,2): a maioria dos substantivos. Metade (0,1): poucos. Zero (0): nenhum.

### ITEM 09-b
**Resposta esperada:** **cliente** é sinônimo de aluno; **nome, CPF e telefone** são atributos de aluno; **suplementos** estão fora do escopo.
**Critérios:** Nota cheia (0,4): os três motivos. Metade (0,2): dois. Zero (0): um ou nenhum.

### ITEM 09-c
**Resposta esperada:** **ALUNO, PLANO e INSTRUTOR**: fortes. **FICHA_TREINO**: **fraca**, depende de ALUNO (fichas numeradas por aluno: aluno 10, ficha 2). (Aceita-se o contrato do plano como associativa, se justificado.)
**Critérios:** Nota cheia (0,4): classificação coerente + justificativa da ficha. Metade (0,2): classificação sem justificativa. Zero (0): classificações incoerentes.

### ITEM 10-a
**Resposta esperada:** **ALUNO, RESPONSÁVEL, CURSO, TURMA, PROFESSOR, MATRÍCULA e PARCELA.**
**Critérios:** Nota cheia (0,2): seis ou sete. Metade (0,1): quatro ou cinco. Zero (0): três ou menos.

### ITEM 10-b
**Resposta esperada:** Fortes: **ALUNO, RESPONSÁVEL, CURSO, TURMA, PROFESSOR**. Associativa: **MATRÍCULA** (ALUNO–TURMA). Fraca: **PARCELA** (de MATRÍCULA).
**Critérios:** Nota cheia (0,4): todas corretas. Metade (0,2): um erro. Zero (0): dois ou mais erros.

### ITEM 10-c
**Resposta esperada:** São **características** (turno da turma, telefone do aluno), sem dados próprios nem várias ocorrências: **atributos**. Registrar as decisões permite **justificar** o modelo ao grupo e ao cliente e evita retrabalho.
**Critérios:** Nota cheia (0,4): motivo + importância do registro. Metade (0,2): só um. Zero (0): diz que são entidades.
