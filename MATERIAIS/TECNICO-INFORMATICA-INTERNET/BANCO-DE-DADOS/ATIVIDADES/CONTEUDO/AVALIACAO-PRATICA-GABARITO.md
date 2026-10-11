# Padrão de Resposta — Avaliação Prática — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema: Aulas 01 a 20 — banco completo de um caso fornecido (Biblioteca Comunitária Ler Mais, banco biblioteca_db).
> **Pontos:** tópico a) 0,1 (metade 0,05); tópicos b) e c) 0,2 (metade 0,1). 20 questões × 0,5 = 10.

## Instruções para a IA corretora (valem para todos os tópicos)

1. Corrija **cada tópico isoladamente**, comparando a resposta do aluno com a **Resposta esperada**
   e os **Critérios** do tópico. Não use conteúdo de outro tópico para completar a nota.
2. Dê **somente** uma destas notas: **nota cheia**, **metade** ou **zero** (os valores estão em
   cada critério). Não invente frações intermediárias.
3. **Nota cheia** = traz o conceito **e** a aplicação certa no caso da biblioteca **e** a
   justificativa, quando o tópico pede. **Metade** = o caso descrito em "Metade". **Zero** = em
   branco, fora do tema, conceito trocado ou o caso descrito em "Zero".
4. **Equivalências sempre aceitas:** nomes de tabelas e colunas diferentes dos do padrão, desde que
   coerentes e no padrão da UC (minúsculas, singular, sem acento, `_`); sinônimos dos termos
   (registro = linha; campo = coluna; SGBD = gerenciador de banco de dados; chave primária = PK;
   chave estrangeira = FK); SQL equivalente que produza o mesmo resultado no PostgreSQL (ex.: `JOIN`
   = `INNER JOIN`, `integer` = `int`, `identity` no lugar de `serial`, valores da situação em
   maiúsculas se usados de forma consistente); ordem diferente das partes da resposta; pequenos
   erros de digitação em SQL que não mudem a lógica.
5. **Erros de português não descontam** se a ideia estiver clara. Termos do conteúdo
   (palavras-chave) podem vir com outras palavras de mesmo sentido.
6. **Resposta idêntica à de colega ou copiada da internet:** sinalize para o professor (não zere
   sozinha).
7. Devolva, para cada tópico: a nota sugerida, a(s) palavra(s)-chave encontrada(s) e uma frase
   curta explicando o desconto, quando houver. **A nota só vale depois da confirmação do professor.**

---

### ITEM 01-a
**Resposta esperada:** **Requisito de dados** diz **o que precisa ser guardado** (ex.: R1 — nome, CPF, e-mail e telefones do leitor). **Regra de negócio** diz **uma condição que os dados precisam obedecer** e vira restrição, procedimento ou trigger (ex.: R5 — no máximo 3 empréstimos em aberto; ou R4 — um exemplar só num empréstimo aberto).
**Critérios:** Nota cheia (0,1): as duas definições com um exemplo correto de cada. Metade (0,05): só as definições, ou exemplos sem a diferença. Zero (0): definições trocadas ou sem relação.

### ITEM 01-b
**Resposta esperada:** **R4** = tabela **emprestimo** (datas) + índice único parcial em id_exemplar onde data_devolucao é nula (ou regra no procedimento). **R5** = **procedimento emprestar**, que confere leitor ativo, atraso e o limite de 3. **R7** = tabela **historico_exemplar** + **trigger** no UPDATE da situação do exemplar. **R8** = **papéis e GRANT/REVOKE** (grupo do balcão sem SELECT no CPF, coordenação só na visão, app_biblioteca só o necessário).
**Critérios:** Nota cheia (0,2): os quatro requisitos ligados ao objeto certo. Metade (0,1): dois ou três certos. Zero (0): um ou nenhum.

### ITEM 01-c
**Resposta esperada:** É **mudança de escopo**: reserva e SMS **não estão** em R1 a R8. A equipe registra o pedido, **avalia o impacto** (novas tabelas como reserva, integração de SMS, prazo e custo) e só inclui com **nova aprovação** do cliente, ajustando o prazo; ou deixa para uma **próxima versão**. No documento de escopo: o pedido, a data, quem pediu, a decisão (entra/não entra), o impacto e o item no "não entra" se ficar de fora.
**Critérios:** Nota cheia (0,2): reconhece a mudança de escopo + avaliação de impacto/aprovação + o que registrar. Metade (0,1): só aceita ou recusa com motivo, sem dizer o que registrar (ou registra sem avaliar o impacto). Zero (0): inclui direto sem análise, ou sem relação.

### ITEM 02-a
**Resposta esperada:** O SGBD relacional garante **integridade** (chaves, UNIQUE, CHECK impedem CPF repetido e exemplar emprestado duas vezes), **acesso simultâneo** de vários atendentes com **transações** e bloqueio, **controle de acesso** por usuário (o balcão sem CPF) e **backup**. A planilha aceita dados duplicados ou errados, um sobrescreve o outro e qualquer um vê tudo.
**Critérios:** Nota cheia (0,1): pelo menos duas vantagens ligadas ao caso. Metade (0,05): uma vantagem, ou vantagens genéricas sem o caso. Zero (0): sem relação.

### ITEM 02-b
**Resposta esperada:** CREATE DATABASE biblioteca_db ENCODING 'UTF8'; CREATE ROLE app_biblioteca LOGIN PASSWORD 'senha-forte-definida-pela-equipe'; GRANT CONNECT ON DATABASE biblioteca_db TO app_biblioteca; Linha do pg_hba.conf: `host  biblioteca_db  app_biblioteca  10.0.0.20/32  scram-sha-256`. Recarregar: `SELECT pg_reload_conf();` (aceitar `pg_ctl reload` ou `systemctl reload postgresql`; aceitar a menção a `listen_addresses` no postgresql.conf, que exige reiniciar).
**Critérios:** Nota cheia (0,2): banco + usuário com LOGIN e senha + CONNECT + linha do pg_hba com o IP 10.0.0.20 e scram-sha-256 (ou md5) + recarga. Metade (0,1): falta a linha do pg_hba ou o banco/usuário, ou usa `trust`/`0.0.0.0/0`. Zero (0): usa o superusuário postgres na aplicação ou comandos sem relação.

### ITEM 02-c
**Resposta esperada:** **Externo** = o que cada usuário ou tela vê (ex.: tela do balcão ou visão sem o CPF; relatório da coordenação). **Conceitual/lógico** = todas as tabelas, colunas, chaves e regras (ex.: leitor, livro, exemplar, emprestimo). **Físico/interno** = como o SGBD grava no disco: arquivos de dados, páginas e índices (ex.: o índice único dos empréstimos em aberto). A separação dá **independência**: muda-se um nível sem quebrar o outro.
**Critérios:** Nota cheia (0,2): os três níveis com exemplo correto do caso. Metade (0,1): dois níveis certos, ou os três sem exemplo do caso. Zero (0): níveis trocados ou sem relação.

### ITEM 03-a
**Resposta esperada:** **Forte** existe sozinha, com identificador próprio (ex.: leitor). **Fraca** só existe ligada a outra e depende dela para ser identificada (ex.: telefone do leitor). **Associativa** nasce de um relacionamento N:N e liga duas entidades, podendo ter atributos próprios (ex.: empréstimo).
**Critérios:** Nota cheia (0,1): as três definições corretas. Metade (0,05): duas certas. Zero (0): uma ou nenhuma.

### ITEM 03-b
**Resposta esperada:** **Fortes:** LEITOR, LIVRO, AUTOR, EDITORA, CATEGORIA. **Fracas:** TELEFONE_LEITOR (depende do leitor), EXEMPLAR (só existe para um livro; aceitar como forte se justificar o tombo como identificador próprio), HISTORICO_EXEMPLAR (depende do exemplar). **Associativas:** LIVRO_AUTOR (livro N:N autor) e EMPRESTIMO (leitor N:N exemplar, com datas e multa).
**Critérios:** Nota cheia (0,2): todas as entidades principais (leitor, livro, autor, editora, categoria, exemplar, empréstimo) presentes e classificadas corretamente, com as duas associativas. Metade (0,1): falta uma ou duas entidades ou uma classificação errada (ex.: empréstimo como forte). Zero (0): lista com atributos no lugar de entidades ou quase tudo errado.

### ITEM 03-c
**Resposta esperada:** O **livro** é a obra (título, ISBN, autores); o **exemplar** é cada cópia física, com **tombo próprio** e **situação própria** (R3): duas cópias do mesmo livro podem estar uma emprestada e outra disponível. A proposta do colega guarda **só um leitor e uma data por livro** (não registra vários empréstimos nem o histórico — R4), não identifica qual cópia saiu (R3) e não guarda as mudanças de situação (R7); "quantidade_disponivel" é dado **derivado** que fica inconsistente.
**Critérios:** Nota cheia (0,2): diferença obra × cópia física + pelo menos dois problemas da proposta ligados a R3, R4 ou R7. Metade (0,1): só a diferença, ou só os problemas. Zero (0): concorda com a proposta ou sem relação.

### ITEM 04-a
**Resposta esperada:** **Simples** = não se divide (e-mail). **Composto** = formado por partes (endereço: rua, número, cidade). **Multivalorado** = pode ter vários valores (telefones). **Derivado** = calculado de outros (dias de atraso). **Identificador** = identifica cada ocorrência (id_leitor; CPF como chave candidata).
**Critérios:** Nota cheia (0,1): os cinco tipos certos. Metade (0,05): três ou quatro certos. Zero (0): dois ou menos.

### ITEM 04-b
**Resposta esperada:** id_leitor — **identificador** (chave primária); nome — simples (aceitar composto: nome e sobrenome); cpf — simples, **chave candidata** (único); email — simples, único (também candidata); data_cadastro — simples; ativo — simples (sim/não); telefones — **multivalorado**.
**Critérios:** Nota cheia (0,2): atributos de R1 listados, identificador e chave candidata (CPF ou e-mail) corretos e telefones como multivalorado. Metade (0,1): lista certa com uma classificação errada ou sem a chave candidata. Zero (0): sem identificador ou classificações quase todas erradas.

### ITEM 04-c
**Resposta esperada:** Telefones viram a tabela **telefone_leitor** (id_telefone, **id_leitor** FK, numero), uma linha por telefone — nunca colunas tel1, tel2. **Dias de atraso** é **derivado** e muda todo dia (CURRENT_DATE − data_prevista): é **calculado na consulta**, gravar deixaria o dado desatualizado. A **multa** é gravada porque é o **valor cobrado no momento da devolução** (R6), um fato que precisa ficar fixo no histórico mesmo que a regra mude depois.
**Critérios:** Nota cheia (0,2): tabela de telefones com FK + motivo de não gravar os dias + motivo de gravar a multa. Metade (0,1): duas das três partes. Zero (0): colunas tel1/tel2 e sem justificativa, ou sem relação.

### ITEM 05-a
**Resposta esperada:** **1:1** = cada ocorrência de um lado liga a no máximo uma do outro. **1:N** = uma ocorrência de um lado liga a várias do outro, e cada uma destas liga a só uma. **N:N** = várias de um lado ligam a várias do outro.
**Critérios:** Nota cheia (0,1): as três corretas. Metade (0,05): duas corretas. Zero (0): uma ou nenhuma.

### ITEM 05-b
**Resposta esperada:** editora–livro **1:N**; categoria–livro **1:N**; livro–autor **N:N**; livro–exemplar **1:N**; leitor–telefone **1:N**; leitor–empréstimo **1:N**.
**Critérios:** Nota cheia (0,2): as seis certas. Metade (0,1): quatro ou cinco certas. Zero (0): três ou menos.

### ITEM 05-c
**Resposta esperada:** **livro–autor** vira a tabela associativa **livro_autor** (id_livro FK, id_autor FK) com **chave primária composta (id_livro, id_autor)**. **leitor–exemplar** (um leitor leva vários exemplares e um exemplar é levado por vários leitores ao longo do tempo) vira a tabela **emprestimo**, com **chave primária própria id_emprestimo** e as FKs **id_leitor** e **id_exemplar**, mais os atributos do relacionamento (datas e multa). A PK própria é necessária porque o mesmo leitor pode pegar o mesmo exemplar mais de uma vez.
**Critérios:** Nota cheia (0,2): as duas tabelas com PK e FKs corretas. Metade (0,1): só uma das duas certa, ou as duas sem dizer as chaves. Zero (0): resolve N:N com FK numa das pontas ou sem relação.

### ITEM 06-a
**Resposta esperada:** **Retângulo** = entidade (tabela); **losango** (ou a linha de ligação no modelo lógico) = relacionamento; atributo **sublinhado** = identificador (chave primária); **marcação de cardinalidade** (1, N; pé de galinha; (0,1)/(1,N)) = quantos de um lado se ligam ao outro.
**Critérios:** Nota cheia (0,1): os quatro elementos certos. Metade (0,05): dois ou três certos. Zero (0): um ou nenhum.

### ITEM 06-b
**Resposta esperada:** editora (**id_editora** PK, nome, cidade); categoria (**id_categoria** PK, nome); autor (**id_autor** PK, nome); livro (**id_livro** PK, titulo, isbn, ano_publicacao, id_editora FK, id_categoria FK); livro_autor (**id_livro + id_autor** PK, ambos FK); exemplar (**id_exemplar** PK, id_livro FK, codigo_tombo, situacao); leitor (**id_leitor** PK, nome, cpf, email, data_cadastro, ativo); telefone_leitor (**id_telefone** PK, id_leitor FK, numero); emprestimo (**id_emprestimo** PK, id_exemplar FK, id_leitor FK, datas, valor_multa); historico_exemplar (**id_historico** PK, id_exemplar FK, situações, usuario, alterado_em). Ligações: editora 1:N livro; categoria 1:N livro; livro 1:N livro_autor N:1 autor; livro 1:N exemplar; leitor 1:N telefone_leitor; leitor 1:N emprestimo; exemplar 1:N emprestimo; exemplar 1:N historico_exemplar.
**Critérios:** Nota cheia (0,2): todas as tabelas principais com PK e FK certas e ligações com cardinalidade (aceitar sem historico_exemplar). Metade (0,1): falta uma tabela, as FKs ou as cardinalidades. Zero (0): sem chaves ou sem relação com o caso.

### ITEM 06-c
**Resposta esperada:** id_emprestimo (tipo: serial, obrigatório: sim, restrição / descrição: PK); id_exemplar (tipo: integer, obrigatório: sim, restrição / descrição: FK → exemplar; só um empréstimo aberto por exemplar); id_leitor (tipo: integer, obrigatório: sim, restrição / descrição: FK → leitor); data_emprestimo (tipo: date, obrigatório: sim, restrição / descrição: padrão CURRENT_DATE); data_prevista (tipo: date, obrigatório: sim, restrição / descrição: data_emprestimo + 14; não antes do empréstimo); data_devolucao (tipo: date, obrigatório: não, restrição / descrição: nula = empréstimo em aberto; não antes do empréstimo); valor_multa (tipo: numeric(8,2), obrigatório: sim, restrição / descrição: padrão 0; ≥ 0; R$ 1,00 por dia de atraso);
**Critérios:** Nota cheia (0,2): todas as colunas com tipo, obrigatoriedade e restrição/descrição coerentes, com PK, FKs e data_devolucao opcional. Metade (0,1): falta uma ou duas colunas ou as restrições. Zero (0): sem chaves ou tabela errada.

### ITEM 07-a
**Resposta esperada:** **1FN** = cada célula com um único valor (atômico), sem grupos repetidos. **2FN** = está na 1FN e todo atributo não chave depende da **chave inteira** (sem dependência parcial de parte da chave composta). **3FN** = está na 2FN e nenhum atributo não chave depende de **outro atributo não chave** (sem dependência transitiva).
**Critérios:** Nota cheia (0,1): as três regras corretas. Metade (0,05): duas corretas. Zero (0): uma ou nenhuma.

### ITEM 07-b
**Resposta esperada:** Violam a **1FN**: **telefones_leitor** e **autores** (vários valores na mesma célula). Separando cada autor numa linha, a chave passa a ser (num_emprestimo, autor) e **titulo, cpf_leitor, datas, tombo** etc. dependem **só de num_emprestimo** (parte da chave): é a **dependência parcial** que viola a 2FN. Solução: autor vai para outra tabela ligada ao livro.
**Critérios:** Nota cheia (0,2): os dois multivalorados + a dependência parcial explicada. Metade (0,1): só a 1FN ou só a 2FN. Zero (0): sem relação.

### ITEM 07-c
**Resposta esperada:** Transitivas: num_emprestimo → cpf_leitor → **nome_leitor**; num_emprestimo → tombo → isbn → **titulo, editora**; editora → **cidade_editora**. Tabelas finais: leitor (**id_leitor**, cpf, nome), telefone_leitor (**id_telefone**, id_leitor, numero), editora (**id_editora**, nome, cidade), livro (**id_livro**, isbn, titulo, id_editora), autor (**id_autor**, nome), livro_autor (**id_livro, id_autor**), exemplar (**id_exemplar**, codigo_tombo, id_livro), emprestimo (**id_emprestimo**, id_leitor, id_exemplar, data_emprestimo, data_prevista).
**Critérios:** Nota cheia (0,2): pelo menos duas transitivas certas + tabelas finais com chaves sem repetição. Metade (0,1): só as dependências ou tabelas com uma repetição restante (ex.: cidade_editora no livro). Zero (0): tabelas que repetem dados ou sem relação.

### ITEM 08-a
**Resposta esperada:** Sem padrão cada pessoa escreve de um jeito ("DataEmp", "dt prev") e os valores chegam diferentes ("DISP", "Disponível"), e as **consultas e filtros erram**. Padronizar antes do DDL deixa o banco **previsível, legível** e fácil de integrar com o back-end, e evita renomear tabelas depois.
**Critérios:** Nota cheia (0,1): problema da falta de padrão + benefício. Metade (0,05): só um dos dois. Zero (0): sem relação.

### ITEM 08-b
**Resposta esperada:** Leitores → **leitor**; DataEmp → **data_emprestimo**; dt prev → **data_prevista**; Situação → **situacao**; tel1/tel2 → tabela **telefone_leitor** com a coluna **numero**; valorMulta → **valor_multa**; user → **usuario** (user é palavra reservada). Situação com **lista fechada**: `CHECK (situacao IN ('disponivel', 'emprestado', 'baixado'))` (aceitar tabela de apoio com FK) e valores sempre em minúsculas, sem acento.
**Critérios:** Nota cheia (0,2): nomes em minúsculas, singular, sem acento, com `_` (tel1/tel2 resolvidos em tabela) + domínio fechado por CHECK ou tabela de apoio. Metade (0,1): só os nomes ou só o domínio. Zero (0): mantém acentos/espaços/maiúsculas ou sem relação.

### ITEM 08-c
**Resposta esperada:** **Início** → atendente informa o leitor e o tombo → consulta **leitor**: está ativo? (não → recusa, fim) → consulta **emprestimo**: tem empréstimo atrasado? (sim → recusa, fim) → tem 3 em aberto? (sim → recusa, fim) → consulta **exemplar**: está disponível? (não → recusa, fim) → grava em **emprestimo** (data prevista = hoje + 14) → muda **exemplar** para emprestado (o trigger grava **historico_exemplar**) → entrega o comprovante → **Fim**.
**Critérios:** Nota cheia (0,2): início e fim, as decisões de R5 (ativo, atraso, limite de 3) e a disponibilidade, com as tabelas de cada passo. Metade (0,1): fluxo sem as tabelas ou faltando duas decisões. Zero (0): sem decisões ou sem relação.

### ITEM 09-a
**Resposta esperada:** **serial** = número automático para a chave primária; **varchar(n)** = texto de tamanho variável (nome, título, e-mail); **char(n)** = texto de tamanho fixo (CPF com 11, ISBN com 13); **date** = datas do empréstimo, comparáveis e com cálculo de dias; **boolean** = sim/não (ativo); **numeric(8,2)** = dinheiro com 2 casas exatas (multa), sem erro de arredondamento.
**Critérios:** Nota cheia (0,1): pelo menos cinco tipos com uso certo no caso. Metade (0,05): três ou quatro certos. Zero (0): dois ou menos, ou usa texto para datas e dinheiro.

### ITEM 09-b
**Resposta esperada:** CREATE TABLE editora ( id_editora serial PRIMARY KEY, nome       varchar(100) NOT NULL UNIQUE, cidade     varchar(80)  NOT NULL ); CREATE TABLE categoria ( id_categoria serial PRIMARY KEY, nome         varchar(60) NOT NULL UNIQUE ); CREATE TABLE autor ( id_autor serial PRIMARY KEY, nome     varchar(120) NOT NULL );
**Critérios:** Nota cheia (0,2): as três tabelas com PK, tipos coerentes e NOT NULL nos nomes (cidade na editora). Metade (0,1): falta uma tabela, a PK ou os NOT NULL. Zero (0): sintaxe que não roda no PostgreSQL ou sem relação.

### ITEM 09-c
**Resposta esperada:** CREATE TABLE leitor ( id_leitor     serial PRIMARY KEY, nome          varchar(120) NOT NULL, cpf           char(11)     NOT NULL UNIQUE CHECK (cpf ~ '^[0-9]{11}$'), email         varchar(150) NOT NULL UNIQUE, data_cadastro date         NOT NULL DEFAULT CURRENT_DATE, ativo         boolean      NOT NULL DEFAULT true ); CREATE TABLE telefone_leitor ( id_telefone serial PRIMARY KEY, id_leitor   integer NOT NULL REFERENCES leitor (id_leitor), numero      varchar(11) NOT NULL CHECK (numero ~ '^[0-9]{10,11}$'), UNIQUE (id_leitor, numero) ); CPF é **texto**: não se faz conta com ele, tem **zero à esquerda** (01234567890) que um número perderia, e tem **tamanho fixo** de 11 dígitos (a máscara é da tela).
**Critérios:** Nota cheia (0,2): as duas tabelas com PK, UNIQUE em cpf e email, FK do telefone para o leitor + justificativa do CPF (zero à esquerda ou não é usado em cálculo). Metade (0,1): tabelas certas sem a justificativa, ou justificativa com tabela sem FK/UNIQUE. Zero (0): CPF numérico sem justificativa e sem FK, ou sem relação.

### ITEM 10-a
**Resposta esperada:** **PRIMARY KEY** identifica cada linha (única e não nula); **FOREIGN KEY** liga a uma linha que existe em outra tabela (integridade referencial); **UNIQUE** impede valor repetido (ISBN, tombo, CPF); **NOT NULL** obriga o preenchimento; **CHECK** aceita só valores que cumprem uma condição (situação da lista, multa ≥ 0).
**Critérios:** Nota cheia (0,1): as cinco restrições certas. Metade (0,05): três ou quatro certas. Zero (0): duas ou menos.

### ITEM 10-b
**Resposta esperada:** CREATE TABLE livro ( id_livro       serial PRIMARY KEY, titulo         varchar(200) NOT NULL, isbn           char(13) NOT NULL UNIQUE CHECK (isbn ~ '^[0-9]{13}$'), ano_publicacao smallint CHECK (ano_publicacao BETWEEN 1450 AND 2100), id_editora     integer NOT NULL REFERENCES editora (id_editora), id_categoria   integer NOT NULL REFERENCES categoria (id_categoria) ); CREATE TABLE livro_autor ( id_livro integer NOT NULL REFERENCES livro (id_livro), id_autor integer NOT NULL REFERENCES autor (id_autor), PRIMARY KEY (id_livro, id_autor) ); CREATE TABLE exemplar ( id_exemplar  serial PRIMARY KEY, id_livro     integer NOT NULL REFERENCES livro (id_livro), codigo_tombo varchar(20) NOT NULL UNIQUE, situacao     varchar(12) NOT NULL DEFAULT 'disponivel' CHECK (situacao IN ('disponivel', 'emprestado', 'baixado')) );
**Critérios:** Nota cheia (0,2): as três tabelas com PK (composta na livro_autor), FKs, UNIQUE do ISBN e do tombo e CHECK da situação. Metade (0,1): falta a PK composta, uma FK ou o CHECK/UNIQUE. Zero (0): sem FKs ou sintaxe que não roda.

### ITEM 10-c
**Resposta esperada:** CREATE TABLE emprestimo ( id_emprestimo   serial PRIMARY KEY, id_exemplar     integer NOT NULL REFERENCES exemplar (id_exemplar) ON DELETE RESTRICT, id_leitor       integer NOT NULL REFERENCES leitor (id_leitor) ON DELETE RESTRICT, data_emprestimo date NOT NULL DEFAULT CURRENT_DATE, data_prevista   date NOT NULL, data_devolucao  date, valor_multa     numeric(8,2) NOT NULL DEFAULT 0 CHECK (valor_multa >= 0), CHECK (data_prevista >= data_emprestimo), CHECK (data_devolucao IS NULL OR data_devolucao >= data_emprestimo) ); CREATE UNIQUE INDEX ux_emprestimo_exemplar_aberto ON emprestimo (id_exemplar) WHERE data_devolucao IS NULL; **ON DELETE RESTRICT** impede excluir um leitor ou exemplar que tem empréstimos: o histórico não fica com linhas "órfãs" e o SGBD devolve erro (aceitar NO ACTION, o padrão, com a mesma explicação).
**Critérios:** Nota cheia (0,2): tabela com FKs, CHECK das datas e da multa + índice único parcial (ou outra garantia equivalente no banco) + explicação do RESTRICT. Metade (0,1): falta o índice parcial ou a explicação, ou faltam os CHECK. Zero (0): sem FKs ou usa CASCADE dizendo que preserva o histórico.

### ITEM 11-a
**Resposta esperada:** **INSERT** acrescenta linhas, **UPDATE** altera valores de linhas existentes e o **comando de exclusão** remove linhas; UPDATE e exclusão precisam de **WHERE**, senão atingem a tabela inteira. O leitor com empréstimos **não é excluído** porque a FK (RESTRICT) impede e porque o **histórico** de empréstimos e multas precisa continuar: ele é **inativado** (ativo = false).
**Critérios:** Nota cheia (0,1): os três comandos + motivo de inativar (FK/histórico). Metade (0,05): só os comandos, ou só o motivo. Zero (0): sem relação.

### ITEM 11-b
**Resposta esperada:** INSERT INTO editora (nome, cidade) VALUES ('Editora Aurora', 'Blumenau'); INSERT INTO categoria (nome) VALUES ('Literatura brasileira'); INSERT INTO autor (nome) VALUES ('Ana Prado'); INSERT INTO livro (titulo, isbn, ano_publicacao, id_editora, id_categoria) VALUES ('Contos do Vale', '9788500000011', 2015, 1, 1); INSERT INTO livro_autor (id_livro, id_autor) VALUES (1, 1); INSERT INTO exemplar (id_livro, codigo_tombo) VALUES (1, 'T-0001'), (1, 'T-0002'); INSERT INTO leitor (nome, cpf, email) VALUES ('Marina Souza', '01234567890', 'marina.souza@exemplo.com'); INSERT INTO telefone_leitor (id_leitor, numero) VALUES (1, '47999990001'); (aceitar subconsultas ou RETURNING no lugar dos ids fixos e dados fictícios diferentes)
**Critérios:** Nota cheia (0,2): todos os INSERT na ordem das dependências (pai antes do filho), com as colunas citadas e a ligação livro_autor. Metade (0,1): falta um ou dois INSERT ou ordem que quebra uma FK. Zero (0): INSERT sem relação com as tabelas do caso ou dados pessoais reais.

### ITEM 11-c
**Resposta esperada:** BEGIN; UPDATE emprestimo SET data_devolucao = CURRENT_DATE, valor_multa    = GREATEST(CURRENT_DATE - data_prevista, 0) * 1.00 WHERE id_emprestimo = 1 AND data_devolucao IS NULL; UPDATE exemplar SET situacao = 'disponivel' WHERE id_exemplar = (SELECT id_exemplar FROM emprestimo WHERE id_emprestimo = 1); COMMIT; UPDATE leitor SET ativo = false WHERE id_leitor = 1; Com 5 dias de atraso, valor_multa = 5,00 (aceitar o valor fixo 5.00 escrito direto).
**Critérios:** Nota cheia (0,2): BEGIN/COMMIT com as duas atualizações (devolução com multa e exemplar disponível) com WHERE + UPDATE que inativa o leitor. Metade (0,1): sem transação, ou falta uma das atualizações, ou falta a inativação. Zero (0): UPDATE sem WHERE ou exclusão do leitor.

### ITEM 12-a
**Resposta esperada:** **WHERE** filtra as linhas; **ORDER BY** ordena o resultado (ASC/DESC); **BETWEEN** filtra uma faixa com os limites incluídos; **ILIKE** compara texto com padrão (% = qualquer sequência) sem diferenciar maiúsculas; **IS NULL** testa se o valor está vazio (nulo).
**Critérios:** Nota cheia (0,1): os cinco certos. Metade (0,05): três ou quatro certos. Zero (0): dois ou menos.

### ITEM 12-b
**Resposta esperada:** /* Consulta 1 */ SELECT titulo, ano_publicacao FROM livro WHERE ano_publicacao BETWEEN 2000 AND 2020 ORDER BY ano_publicacao DESC, titulo; /* Consulta 2 */ SELECT nome, email FROM leitor WHERE ativo = true AND nome ILIKE 'mar%' ORDER BY nome;
**Critérios:** Nota cheia (0,2): as duas consultas com filtro e ordenação certos (DESC no ano e desempate por título; ILIKE ou lower(...) LIKE e só nome e e-mail). Metade (0,1): uma consulta certa, ou as duas sem a ordenação pedida. Zero (0): nenhuma roda ou filtros errados.

### ITEM 12-c
**Resposta esperada:** /* Consulta 3 */ SELECT id_emprestimo, id_leitor, id_exemplar, data_prevista, CURRENT_DATE - data_prevista AS dias_atraso FROM emprestimo WHERE data_devolucao IS NULL AND data_prevista < CURRENT_DATE ORDER BY dias_atraso DESC; Usa-se **IS NULL** porque NULL significa "valor desconhecido": a comparação `= NULL` nunca dá verdadeiro (resulta em nulo) e a consulta voltaria **vazia**.
**Critérios:** Nota cheia (0,2): filtro de em aberto + atrasado, dias calculados, ordem decrescente + explicação do IS NULL. Metade (0,1): consulta certa sem a explicação, ou explicação com a consulta sem o cálculo/ordem. Zero (0): usa `= NULL` ou sem relação.

### ITEM 13-a
**Resposta esperada:** **INNER JOIN** traz só as linhas que têm par nas duas tabelas. **LEFT JOIN** traz **todas** as linhas da tabela da esquerda, mesmo sem par, com as colunas da direita nulas.
**Critérios:** Nota cheia (0,1): as duas definições certas. Metade (0,05): só uma certa. Zero (0): trocadas ou sem relação.

### ITEM 13-b
**Resposta esperada:** /* Consulta 4 */ SELECT le.nome AS leitor, l.titulo, ex.codigo_tombo, em.data_prevista FROM emprestimo em JOIN leitor   le ON le.id_leitor   = em.id_leitor JOIN exemplar ex ON ex.id_exemplar = em.id_exemplar JOIN livro    l  ON l.id_livro     = ex.id_livro WHERE em.data_devolucao IS NULL ORDER BY em.data_prevista;
**Critérios:** Nota cheia (0,2): as quatro tabelas ligadas pelas chaves certas (livro pelo exemplar), filtro de em aberto e ordenação. Metade (0,1): falta uma junção ou o filtro/ordem. Zero (0): junção sem condição (produto cartesiano) ou sem relação.

### ITEM 13-c
**Resposta esperada:** /* Consulta 5 */ SELECT l.titulo FROM livro l LEFT JOIN exemplar ex ON ex.id_livro = l.id_livro WHERE ex.id_exemplar IS NULL ORDER BY l.titulo; O INNER JOIN **descarta** os livros sem exemplar, que são justamente os procurados; o LEFT JOIN mantém todos os livros e os sem exemplar aparecem com as colunas de exemplar **nulas**, filtradas pelo IS NULL. (Aceitar NOT EXISTS ou NOT IN com a explicação do LEFT JOIN.)
**Critérios:** Nota cheia (0,2): consulta certa com LEFT JOIN + IS NULL + explicação. Metade (0,1): consulta certa sem explicação, ou explicação certa com consulta incompleta. Zero (0): INNER JOIN ou sem relação.

### ITEM 14-a
**Resposta esperada:** **GROUP BY** junta as linhas com o mesmo valor para aplicar funções de agregação (count, sum, avg) por grupo. **WHERE** filtra as **linhas antes** de agrupar; **HAVING** filtra os **grupos depois** de agrupar, e pode usar as agregações.
**Critérios:** Nota cheia (0,1): GROUP BY + diferença WHERE × HAVING. Metade (0,05): só uma das partes. Zero (0): sem relação.

### ITEM 14-b
**Resposta esperada:** /* Consulta 6 */ SELECT c.nome AS categoria, count(em.id_emprestimo) AS total_emprestimos FROM categoria c JOIN livro      l  ON l.id_categoria = c.id_categoria JOIN exemplar   ex ON ex.id_livro    = l.id_livro JOIN emprestimo em ON em.id_exemplar = ex.id_exemplar GROUP BY c.nome ORDER BY total_emprestimos DESC; (aceitar LEFT JOIN para mostrar categorias com zero)
**Critérios:** Nota cheia (0,2): junções até o empréstimo, count, GROUP BY da categoria e ordem decrescente. Metade (0,1): falta uma junção ou a ordem. Zero (0): sem GROUP BY ou sem relação.

### ITEM 14-c
**Resposta esperada:** /* Consulta 7 */ SELECT le.nome, count(*) AS qtd_emprestimos, sum(em.valor_multa) AS total_multas FROM leitor le JOIN emprestimo em ON em.id_leitor = le.id_leitor WHERE em.data_emprestimo >= DATE '2026-01-01' AND em.data_emprestimo <  DATE '2027-01-01' GROUP BY le.id_leitor, le.nome HAVING count(*) > 2 ORDER BY qtd_emprestimos DESC; O ano filtra **linhas** (cada empréstimo), então fica no WHERE, antes de agrupar; "mais de 2" é uma condição sobre a **contagem do grupo**, que só existe depois do GROUP BY, então fica no HAVING. (Aceitar `EXTRACT(YEAR FROM data_emprestimo) = 2026`.)
**Critérios:** Nota cheia (0,2): consulta com WHERE do ano, GROUP BY, HAVING count > 2 e soma das multas + explicação. Metade (0,1): consulta certa sem explicação, ou com o ano no HAVING. Zero (0): count no WHERE ou sem relação.

### ITEM 15-a
**Resposta esperada:** **Subconsulta** é um SELECT dentro de outro comando, cujo resultado é usado pela consulta de fora. **IN** compara um valor com a **lista** devolvida pela subconsulta; **EXISTS** só verifica se a subconsulta **devolve alguma linha** (normalmente ligada à linha de fora — correlacionada) e é seguro com nulos (NOT IN com nulo não traz nada).
**Critérios:** Nota cheia (0,1): definição + diferença IN × EXISTS. Metade (0,05): só uma das partes. Zero (0): sem relação.

### ITEM 15-b
**Resposta esperada:** /* Consulta 8 */ SELECT l.titulo FROM livro l WHERE NOT EXISTS ( SELECT 1 FROM exemplar ex JOIN emprestimo em ON em.id_exemplar = ex.id_exemplar WHERE ex.id_livro = l.id_livro) ORDER BY l.titulo; /* Consulta 9 */ SELECT id_emprestimo, id_leitor, valor_multa FROM emprestimo WHERE valor_multa > (SELECT avg(valor_multa) FROM emprestimo WHERE valor_multa > 0) ORDER BY valor_multa DESC;
**Critérios:** Nota cheia (0,2): consulta 8 com NOT EXISTS correlacionado pelo livro passando pelo exemplar + consulta 9 com a média só das multas > 0. Metade (0,1): uma das duas certa, ou a 9 com a média de todos os empréstimos. Zero (0): nenhuma certa.

### ITEM 15-c
**Resposta esperada:** /* Consulta 10 */ SELECT l.titulo, count(*) AS qtd_emprestimos FROM livro l JOIN exemplar   ex ON ex.id_livro    = l.id_livro JOIN emprestimo em ON em.id_exemplar = ex.id_exemplar GROUP BY l.id_livro, l.titulo HAVING count(*) = ( SELECT max(qtd) FROM (SELECT count(*) AS qtd FROM emprestimo em2 JOIN exemplar ex2 ON ex2.id_exemplar = em2.id_exemplar GROUP BY ex2.id_livro) AS t); Com **empate** (dois títulos com a mesma quantidade máxima), ORDER BY ... LIMIT 1 mostra **só um** e esconde o outro de forma arbitrária; a subconsulta com o máximo traz **todos** os empatados.
**Critérios:** Nota cheia (0,2): agrupamento por livro + HAVING comparando com o máximo da subconsulta + explicação do empate. Metade (0,1): consulta certa sem a explicação, ou só ORDER BY/LIMIT com a explicação do empate. Zero (0): sem relação.

### ITEM 16-a
**Resposta esperada:** **Função** (CREATE FUNCTION) **devolve um valor** e é chamada dentro de um SELECT. **Procedimento** (CREATE PROCEDURE) executa uma **ação** (gravar, alterar), é chamado com **CALL** e pode controlar transação. O empréstimo é procedimento porque **grava** o empréstimo e **muda** o exemplar, aplicando as regras de R5 num só lugar.
**Critérios:** Nota cheia (0,1): diferença (retorno × ação; SELECT × CALL) + motivo no caso. Metade (0,05): só a diferença ou só o motivo. Zero (0): sem relação.

### ITEM 16-b
**Resposta esperada:** CREATE OR REPLACE PROCEDURE emprestar(p_id_leitor integer, p_id_exemplar integer) LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ DECLARE v_ativo     boolean; v_situacao  varchar(12); v_abertos   integer; v_atrasados integer; BEGIN SELECT ativo INTO v_ativo FROM leitor WHERE id_leitor = p_id_leitor FOR UPDATE; IF NOT FOUND OR NOT v_ativo THEN RAISE EXCEPTION 'Leitor % não existe ou está inativo', p_id_leitor; END IF; SELECT situacao INTO v_situacao FROM exemplar WHERE id_exemplar = p_id_exemplar FOR UPDATE; IF NOT FOUND OR v_situacao <> 'disponivel' THEN RAISE EXCEPTION 'Exemplar % não está disponível', p_id_exemplar; END IF; SELECT count(*), count(*) FILTER (WHERE data_prevista < CURRENT_DATE) INTO v_abertos, v_atrasados FROM emprestimo WHERE id_leitor = p_id_leitor AND data_devolucao IS NULL; IF v_atrasados > 0 THEN RAISE EXCEPTION 'Leitor % tem empréstimo em atraso', p_id_leitor; END IF; IF v_abertos >= 3 THEN RAISE EXCEPTION 'Leitor % já tem 3 empréstimos em aberto', p_id_leitor; END IF; INSERT INTO emprestimo (id_exemplar, id_leitor, data_emprestimo, data_prevista) VALUES (p_id_exemplar, p_id_leitor, CURRENT_DATE, CURRENT_DATE + 14); UPDATE exemplar SET situacao = 'emprestado' WHERE id_exemplar = p_id_exemplar; END; $$; (SECURITY DEFINER e search_path são boa prática para a aula 19, mas não obrigatórios; aceitar IF EXISTS no lugar das contagens.)
**Critérios:** Nota cheia (0,2): confere exemplar disponível, leitor ativo, atraso e limite de 3 com RAISE EXCEPTION + INSERT com data prevista de 14 dias + UPDATE do exemplar. Metade (0,1): falta uma das regras de R5 ou o UPDATE do exemplar. Zero (0): sem as regras, sintaxe que não é PL/pgSQL ou função que não grava.

### ITEM 16-c
**Resposta esperada:** `CALL emprestar(1, 1);` → **CALL**: exemplar 1 passa a 'emprestado' e aparece em emprestimo com data_prevista = hoje + 14 (conferir com `SELECT situacao FROM exemplar WHERE id_exemplar = 1;`). Com o leitor 2 já com 3 empréstimos em aberto: `CALL emprestar(2, 5);` → **ERROR: Leitor 2 já tem 3 empréstimos em aberto** e nada é gravado. O **FOR UPDATE** **trava a linha** do exemplar (e do leitor) até o fim da transação: o segundo atendente **espera** e, quando continua, já lê 'emprestado' e recebe o erro — o mesmo exemplar não sai em dois empréstimos.
**Critérios:** Nota cheia (0,2): uma chamada que funciona e uma barrada, com o resultado esperado + o FOR UPDATE como trava da linha contra a corrida. Metade (0,1): só os testes ou só a explicação do FOR UPDATE. Zero (0): sem relação.

### ITEM 17-a
**Resposta esperada:** **Trigger** é uma rotina disparada **automaticamente** por um evento (INSERT, UPDATE ou exclusão) numa tabela, sem ninguém chamar. **AFTER** = roda depois de a alteração ser feita; **FOR EACH ROW** = roda uma vez para cada linha alterada; **OLD** = a linha como era antes; **NEW** = a linha como ficou.
**Critérios:** Nota cheia (0,1): definição + AFTER, FOR EACH ROW, OLD e NEW. Metade (0,05): definição com só parte dos termos. Zero (0): confunde com procedimento chamado por CALL ou sem relação.

### ITEM 17-b
**Resposta esperada:** CREATE TABLE historico_exemplar ( id_historico      serial PRIMARY KEY, id_exemplar       integer NOT NULL REFERENCES exemplar (id_exemplar), situacao_anterior varchar(12), situacao_nova     varchar(12) NOT NULL, usuario           text NOT NULL DEFAULT session_user, alterado_em       timestamptz NOT NULL DEFAULT now() ); CREATE OR REPLACE FUNCTION registrar_historico_exemplar() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN INSERT INTO historico_exemplar (id_exemplar, situacao_anterior, situacao_nova, usuario, alterado_em) VALUES (NEW.id_exemplar, OLD.situacao, NEW.situacao, session_user, now()); RETURN NEW; END; $$; CREATE TRIGGER trg_historico_exemplar AFTER UPDATE OF situacao ON exemplar FOR EACH ROW WHEN (OLD.situacao IS DISTINCT FROM NEW.situacao) EXECUTE FUNCTION registrar_historico_exemplar(); (aceitar `current_user` sem SECURITY DEFINER e o IF dentro da função no lugar do WHEN)
**Critérios:** Nota cheia (0,2): tabela de histórico + função RETURNS trigger que grava OLD e NEW da situação, usuário e data e hora + CREATE TRIGGER AFTER UPDATE FOR EACH ROW com a condição de mudança. Metade (0,1): falta a condição de mudança, o usuário/data ou a tabela. Zero (0): sem a função ou sem o CREATE TRIGGER.

### ITEM 17-c
**Resposta esperada:** `UPDATE exemplar SET situacao = 'baixado' WHERE id_exemplar = 2;` e depois `SELECT situacao_anterior, situacao_nova, usuario, alterado_em FROM historico_exemplar WHERE id_exemplar = 2;` → **uma linha**: disponivel → baixado, com o usuário logado e a data e hora atuais (repetir o mesmo UPDATE **não** cria nova linha; aceitar o teste pelo CALL emprestar). No trigger, o histórico é gravado **sempre**, venha a mudança do procedimento, da devolução, de outra aplicação ou de um UPDATE manual no psql; no back-end, quem altera por fora **escapa** do registro, e a regra teria de ser repetida em cada tela.
**Critérios:** Nota cheia (0,2): teste com UPDATE + SELECT e o resultado esperado + justificativa (registra qualquer origem). Metade (0,1): só o teste ou só a justificativa. Zero (0): sem relação.

### ITEM 18-a
**Resposta esperada:** **Confidencialidade** = só quem pode vê o dado (risco: vazamento do CPF dos leitores). **Integridade** = o dado está correto e completo (risco: alguém alterar a data de devolução ou zerar uma multa). **Disponibilidade** = o dado está lá quando é preciso (risco: disco queimado sem backup, balcão sem sistema).
**Critérios:** Nota cheia (0,1): os três pilares com risco do caso. Metade (0,05): os três sem risco do caso, ou dois com risco. Zero (0): pilares trocados ou sem relação.

### ITEM 18-b
**Resposta esperada:** **Pública**: catálogo (título, autor, categoria, se há exemplar disponível) — qualquer um no site. **Interna**: quantidade de empréstimos por categoria, situação dos exemplares — funcionários. **Restrita**: nome, e-mail, telefone do leitor e seus empréstimos e multas — balcão e coordenação. **Confidencial**: CPF — só o cadastro/DBA. Hierarquia: **DBA** (postgres: tudo, backup, papéis) → **dono dos objetos** (altera estrutura) → **aplicação** (app_biblioteca: só os comandos do back-end) → **usuários por função** (balcão) → **somente leitura** (coordenação, por visões).
**Critérios:** Nota cheia (0,2): os quatro níveis com dados do caso + a hierarquia de acesso. Metade (0,1): só a classificação ou só a hierarquia, ou CPF fora do confidencial. Zero (0): sem relação.

### ITEM 18-c
**Resposta esperada:** Histórico do exemplar = **integridade** (e rastreabilidade/auditoria: quem mudou o quê e quando). Backup diário testado = **disponibilidade**. Permissão por coluna sem o CPF = **confidencialidade**. **LGPD**: o CPF é dado pessoal, coletado só com **finalidade** definida (identificar o leitor), acesso só a quem precisa (**necessidade**), protegido contra vazamento (**segurança**) e nunca usado em teste com dado real; dados de adolescentes exigem cuidado redobrado.
**Critérios:** Nota cheia (0,2): as três medidas ligadas ao pilar certo + cuidado da LGPD (finalidade, necessidade ou acesso mínimo). Metade (0,1): pilares certos sem a LGPD, ou LGPD com um pilar trocado. Zero (0): sem relação.

### ITEM 19-a
**Resposta esperada:** **Menor privilégio** = cada pessoa ou sistema recebe **só as permissões necessárias** para a sua função, nada além. **Papel de grupo (NOLOGIN)** junta as permissões de uma função e não entra no banco; **papel de login** é a pessoa (ou a aplicação) que entra com senha e **herda** as permissões do grupo do qual é membro.
**Critérios:** Nota cheia (0,1): menor privilégio + diferença grupo × login. Metade (0,05): só uma das partes. Zero (0): sem relação.

### ITEM 19-b
**Resposta esperada:** REVOKE ALL ON DATABASE biblioteca_db FROM PUBLIC; REVOKE ALL ON SCHEMA public FROM PUBLIC; CREATE ROLE grupo_balcao NOLOGIN; CREATE ROLE lucas_balcao LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_balcao; GRANT CONNECT ON DATABASE biblioteca_db TO grupo_balcao; GRANT USAGE ON SCHEMA public TO grupo_balcao; GRANT SELECT (id_leitor, nome, email, ativo) ON leitor TO grupo_balcao; GRANT SELECT ON livro, autor, livro_autor, editora, categoria, exemplar, emprestimo TO grupo_balcao; GRANT UPDATE (data_devolucao, valor_multa) ON emprestimo TO grupo_balcao; GRANT UPDATE (situacao) ON exemplar TO grupo_balcao; REVOKE EXECUTE ON PROCEDURE emprestar(integer, integer) FROM PUBLIC; GRANT EXECUTE ON PROCEDURE emprestar(integer, integer) TO grupo_balcao, app_biblioteca; (aceitar `GRANT grupo_balcao TO app_biblioteca`; nenhum GRANT de CREATE, ALTER, DROP nem do comando de exclusão)
**Critérios:** Nota cheia (0,2): REVOKE de PUBLIC + grupo NOLOGIN e login no grupo + SELECT por coluna no leitor sem o CPF + EXECUTE no procedimento, sem privilégio a mais. Metade (0,1): falta o REVOKE de PUBLIC ou o EXECUTE, ou o SELECT do leitor é na tabela inteira. Zero (0): GRANT ALL, superusuário ou sem relação.

### ITEM 19-c
**Resposta esperada:** CREATE VIEW vw_emprestimos_categoria AS SELECT c.nome AS categoria, count(em.id_emprestimo) AS total_emprestimos FROM categoria c JOIN livro      l  ON l.id_categoria = c.id_categoria JOIN exemplar   ex ON ex.id_livro    = l.id_livro JOIN emprestimo em ON em.id_exemplar = ex.id_exemplar GROUP BY c.nome; CREATE ROLE grupo_coordenacao NOLOGIN; CREATE ROLE helena_coordenacao LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_coordenacao; GRANT CONNECT ON DATABASE biblioteca_db TO grupo_coordenacao; GRANT USAGE ON SCHEMA public TO grupo_coordenacao; GRANT SELECT ON vw_emprestimos_categoria TO grupo_coordenacao; /* teste (como postgres) */ SET ROLE lucas_balcao; SELECT nome, email FROM leitor; /* funciona */ SELECT cpf FROM leitor; /* ERROR: permission denied for table leitor */ RESET ROLE; (aceitar outra visão de relatório e o teste entrando com `psql -U lucas_balcao -d biblioteca_db`)
**Critérios:** Nota cheia (0,2): coordenação só com SELECT na visão + teste do balcão com o erro de permissão no CPF. Metade (0,1): só a coordenação ou só o teste, ou coordenação com SELECT nas tabelas. Zero (0): sem relação.

### ITEM 20-a
**Resposta esperada:** **Escopo** com a rastreabilidade R1 a R8 → objetos do banco (prova que tudo foi atendido); **DER e dicionário de dados** (estrutura, tipos e restrições para o back-end); **README** (como instalar: ordem dos scripts, script mestre, usuário da aplicação); **matriz de acesso** (quem pode o quê, R8); **registro de decisões** (o que se decidiu e por quê, ex.: inativar leitor em vez de excluir).
**Critérios:** Nota cheia (0,1): pelo menos três documentos com a função de cada. Metade (0,05): documentos citados sem a função, ou só um ou dois. Zero (0): sem relação.

### ITEM 20-b
**Resposta esperada:** \set ON_ERROR_STOP on \i 01-ddl-biblioteca.sql \i 02-dados-teste.sql \i 03-consultas.sql \i 04-procedimentos.sql \i 05-triggers.sql \i 06-visoes.sql \i 07-seguranca.sql Num banco limpo: `dropdb -U postgres --if-exists biblioteca_teste`, `createdb -U postgres biblioteca_teste` e `psql -U postgres -d biblioteca_teste -f sql/00-instalar.sql` (aceitar DROP DATABASE / CREATE DATABASE no psql e `\ir`).
**Critérios:** Nota cheia (0,2): ON_ERROR_STOP + os sete scripts na ordem das dependências + banco limpo de teste + psql -f. Metade (0,1): falta o ON_ERROR_STOP ou o banco limpo, ou ordem com um script fora do lugar. Zero (0): roda no banco de produção sem teste ou ordem que quebra (segurança antes das tabelas).

### ITEM 20-c
**Resposta esperada:** `pg_dump -U postgres -d biblioteca_teste -F c -f biblioteca.dump`. Prova: `createdb -U postgres biblioteca_restaurado`, `pg_restore -U postgres -d biblioteca_restaurado biblioteca.dump` e conferir com `\dt`, `\df` e `SELECT count(*) FROM livro;` no banco restaurado (papéis são globais: aceitar `pg_dumpall --roles-only`). Backup que **nunca foi restaurado não é garantia**: o arquivo pode estar incompleto, corrompido ou sem objetos, e só a restauração prova que dá para **recuperar** o banco (disponibilidade).
**Critérios:** Nota cheia (0,2): pg_dump + restauração em outro banco + conferência + motivo do teste. Metade (0,1): só o pg_dump com o motivo, ou restauração sem o motivo. Zero (0): sem comando de backup ou sem relação.
