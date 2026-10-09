# Padrão de Resposta — Atividade Prática — Aula 01 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Banco de Dados e SGBD: Conceitos e Usos.
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
**Resposta esperada:** A anotação é **dado**: são fatos registrados **sem contexto** (não se sabe o que significa 17 nem a data).
**Critérios:** Palavras-chave: dado; sem contexto/sem sentido. Nota cheia (0,2): diz "dado" e justifica pela falta de contexto. Metade (0,1): diz "dado" sem justificar. Zero (0): diz que já é informação.

### ITEM 01-b
**Resposta esperada:** Exemplo: "A aluna **Ana**, de **17 anos**, matriculou-se no curso de **Programação** em **09/10/2026**." Os dados foram **organizados e ganharam sentido**.
**Critérios:** Palavras-chave: frase com os quatro dados interpretados (nome, idade, data, curso). Nota cheia (0,4): reescreve com contexto usando os dados corretamente. Metade (0,2): reescreve com contexto, mas deixa de fora ou interpreta errado um dos dados. Zero (0): repete a anotação sem contexto.

### ITEM 01-c
**Resposta esperada:** O banco de dados da escola é o **conjunto organizado de dados relacionados**, guardado de forma **permanente**, que pode ser **consultado e atualizado** pelo sistema. Deve guardar, por exemplo: **alunos, cursos, matrículas** (também turmas, professores, pagamentos, notas).
**Critérios:** Palavras-chave: conjunto organizado; dados relacionados; permanente; consultar/atualizar; três entidades coerentes. Nota cheia (0,4): definição correta + três itens coerentes. Metade (0,2): só a definição ou só os três itens. Zero (0): confunde banco de dados com o programa, o site ou o computador e não cita itens coerentes.

### ITEM 02-a
**Resposta esperada:** O **SGBD** (Sistema Gerenciador de Banco de Dados) é o **programa que cria, guarda e gerencia** o banco de dados, executando os pedidos do sistema.
**Critérios:** Palavras-chave: programa/software; gerencia/guarda o banco. Nota cheia (0,2): definição com programa + gerenciar. Metade (0,1): "é onde ficam os dados" sem dizer que é o programa gerenciador. Zero (0): confunde com planilha, site ou linguagem.

### ITEM 02-b
**Resposta esperada:** O sistema web **não abre o arquivo do banco direto**: o back-end **envia um pedido (em SQL) ao SGBD**, que **executa** e **devolve o resultado**.
**Critérios:** Palavras-chave: pede ao SGBD; SQL; executa; devolve resultado; não acessa o arquivo direto. Nota cheia (0,4): descreve o pedido ao SGBD e o retorno. Metade (0,2): diz só "usa o SGBD" sem explicar o pedido/retorno. Zero (0): diz que o sistema grava direto no arquivo.

### ITEM 02-c
**Resposta esperada:** Dois entre: **concorrência** (dois pedidos ao mesmo tempo podem se sobrescrever); **integridade** (nada impede dados errados, como preço negativo); **controle de acesso** (qualquer um que abre o arquivo vê tudo); **consulta lenta** com muitos pedidos; **recuperação** (sem backup/restauração se o arquivo corromper).
**Critérios:** Palavras-chave: dois problemas entre concorrência, integridade, acesso, desempenho, recuperação, cada um com justificativa. Nota cheia (0,4): dois problemas justificados. Metade (0,2): um problema justificado ou dois sem justificativa. Zero (0): problemas sem relação com dados ("o site fica feio").

### ITEM 03-a
**Resposta esperada:** (1) **Concorrência**; (2) **Controle de acesso**; (3) **Recuperação** (backup e restauração).
**Critérios:** Palavras-chave: concorrência; controle de acesso; recuperação. Nota cheia (0,2): as três corretas. Metade (0,1): duas corretas. Zero (0): uma ou nenhuma.

### ITEM 03-b
**Resposta esperada:** Sem controle de concorrência, as duas transferências poderiam **ler o mesmo saldo ao mesmo tempo** e uma **sobrescrever a outra**: o saldo final ficaria **errado** (por exemplo, sair dinheiro duas vezes mas descontar só uma, ou a conta ficar negativa sem permissão).
**Critérios:** Palavras-chave: mesmo momento; uma sobrescreve a outra; saldo errado/inconsistente. Nota cheia (0,4): explica o conflito e o efeito no saldo. Metade (0,2): diz só "o saldo fica errado" sem explicar o conflito. Zero (0): resposta sem relação com acesso simultâneo.

### ITEM 03-c
**Resposta esperada:** Exemplos: **armazenamento** (as transações continuam guardadas por anos); **integridade** (não aceitar transferência de valor negativo ou para conta inexistente); **consulta** (mostrar o extrato do mês).
**Critérios:** Palavras-chave: funcionalidade diferente das três (armazenamento, integridade ou consulta) + exemplo no app. Nota cheia (0,4): funcionalidade correta com exemplo coerente. Metade (0,2): funcionalidade certa sem exemplo, ou exemplo certo com nome trocado. Zero (0): repete concorrência, acesso ou recuperação.

### ITEM 04-a
**Resposta esperada:** **Conflito de versões / falta de controle de concorrência**: quando dois vendedores salvam, a versão de um **sobrescreve** a do outro.
**Critérios:** Palavras-chave: conflito de versões; concorrência; sobrescrever. Nota cheia (0,2): identifica o problema. Metade (0,1): "a planilha dá erro" sem dizer qual. Zero (0): culpa só o vendedor ou o computador.

### ITEM 04-b
**Resposta esperada:** Dois aspectos, por exemplo: **volume** — com 8 mil pedidos a planilha fica lenta, o banco consulta rápido com índices; **regras** — a planilha aceita dados errados, o banco garante restrições; **permissões** — a planilha é tudo ou nada, o banco dá permissão por tabela e ação; **acesso simultâneo** — o banco controla a concorrência.
**Critérios:** Palavras-chave: dois aspectos comparados (planilha × banco) aplicados à loja. Nota cheia (0,4): dois aspectos comparados corretamente. Metade (0,2): um aspecto comparado, ou dois citados sem comparar. Zero (0): comparação errada (ex.: "planilha é mais segura").

### ITEM 04-c
**Resposta esperada:** A planilha é adequada para **listas pequenas, usadas por uma pessoa ou poucas, sem integração com sistema** (ex.: controle pessoal de tarefas ou um levantamento rápido), porque não precisa de concorrência, regras nem permissões.
**Critérios:** Palavras-chave: pouco volume; poucos usuários; sem integração; justificativa. Nota cheia (0,4): situação coerente + justificativa. Metade (0,2): situação coerente sem justificativa. Zero (0): diz que a planilha nunca serve ou que serve para o sistema da loja.

### ITEM 05-a
**Resposta esperada:** **Redundância** é o **mesmo dado copiado em vários lugares**: o nome, o telefone e o endereço da cliente estão **repetidos em cada pedido**.
**Critérios:** Palavras-chave: mesmo dado repetido; exemplo da tabela. Nota cheia (0,2): definição + exemplo. Metade (0,1): só definição ou só exemplo. Zero (0): confunde com backup ou falta de dados.

### ITEM 05-b
**Resposta esperada:** Como o endereço está repetido, corrigir um só pedido deixou **versões diferentes do mesmo dado** (inconsistência). A loja pode **entregar no endereço antigo**, emitir nota errada e não saber qual endereço é o certo.
**Critérios:** Palavras-chave: versões diferentes do mesmo dado; inconsistência; prejuízo concreto. Nota cheia (0,4): explica a causa e um prejuízo. Metade (0,2): só a causa ou só o prejuízo. Zero (0): explicação sem relação com a repetição.

### ITEM 05-c
**Resposta esperada:** Criar uma **tabela de clientes** com o endereço guardado **uma única vez** e, na tabela de pedidos, guardar só o **identificador do cliente** (id). Assim, ao mudar o endereço, a correção vale para todos os pedidos e não há inconsistência.
**Critérios:** Palavras-chave: tabela de clientes separada; pedido guarda o id do cliente; atualização em um lugar só. Nota cheia (0,4): proposta + justificativa. Metade (0,2): proposta sem justificativa ou justificativa sem proposta clara. Zero (0): "corrigir todos os pedidos à mão" como solução.

### ITEM 06-a
**Resposta esperada:** O **front-end** (a página no navegador).
**Critérios:** Palavras-chave: front-end/navegador/tela. Nota cheia (0,2): front-end. Metade (0,1): "o site" sem distinguir. Zero (0): back-end ou banco.

### ITEM 06-b
**Resposta esperada:** O **back-end** recebe e-mail e senha, aplica as **regras** (confere o usuário, compara a senha protegida) e **monta uma consulta SQL** que envia ao **SGBD** para buscar o usuário pelo e-mail.
**Critérios:** Palavras-chave: back-end; regras; consulta SQL; envia ao SGBD. Nota cheia (0,4): regras + SQL ao SGBD. Metade (0,2): só "confere a senha" sem a conversa com o banco. Zero (0): diz que o front-end consulta o banco direto.

### ITEM 06-c
**Resposta esperada:** O **SGBD executa a consulta**, procura o usuário na tabela e **devolve a linha encontrada** (ou nenhuma) ao back-end, que decide se o login é válido.
**Critérios:** Palavras-chave: executa a consulta; procura na tabela; devolve as linhas/resultado. Nota cheia (0,4): execução + retorno. Metade (0,2): só "guarda os usuários". Zero (0): diz que o SGBD mostra a página "Minha conta".

### ITEM 07-a
**Resposta esperada:** **Não é adequada**: o banco não pode ficar acessível pelo navegador.
**Critérios:** Palavras-chave: não adequada/errada. Nota cheia (0,2): não adequada. Metade (0,1): "depende" com alguma ressalva de segurança. Zero (0): adequada.

### ITEM 07-b
**Resposta esperada:** Qualquer pessoa que abrir o código da página vê o **endereço e a senha** e pode **ler, alterar ou apagar** todos os dados (inclusive dados pessoais), sem passar pelas regras do sistema.
**Critérios:** Palavras-chave: senha exposta; qualquer pessoa; ler/alterar/apagar dados; dados pessoais. Nota cheia (0,4): risco concreto explicado. Metade (0,2): "é inseguro" sem dizer o que pode acontecer. Zero (0): risco sem relação ("a página fica lenta").

### ITEM 07-c
**Resposta esperada:** Quem se conecta ao banco é o **back-end**, no servidor, com **usuário e senha próprios da aplicação** (com o mínimo de permissões), guardados fora do código do navegador; o front-end só conversa com o back-end.
**Critérios:** Palavras-chave: back-end; servidor; usuário/senha próprios; front-end não acessa o banco. Nota cheia (0,4): quem conecta + como. Metade (0,2): só "pelo back-end". Zero (0): mantém a conexão no navegador.

### ITEM 08-a
**Resposta esperada:** **Relacionais:** PostgreSQL, MySQL, SQLite. **Não relacionais:** MongoDB, Redis.
**Critérios:** Nota cheia (0,2): os cinco corretos. Metade (0,1): um erro. Zero (0): dois ou mais erros.

### ITEM 08-b
**Resposta esperada:** No **relacional**, os dados ficam em **tabelas** (linhas e colunas) ligadas por **chaves**, e usa-se **SQL**. No **não relacional**, os dados ficam em outras estruturas, como **documentos**, **chave-valor** ou **grafos**, com estrutura mais flexível.
**Critérios:** Palavras-chave: tabelas/linhas/colunas/chaves/SQL × documentos/chave-valor/grafos. Nota cheia (0,4): descreve os dois modelos. Metade (0,2): descreve só um. Zero (0): descrição trocada.

### ITEM 08-c
**Resposta esperada:** **PostgreSQL**, porque é **gratuito e de código aberto**, **robusto** e usado em serviços como o **Supabase** (também: muito usado no mercado, segue bem o padrão SQL).
**Critérios:** Palavras-chave: PostgreSQL + dois motivos. Nota cheia (0,4): PostgreSQL + dois motivos. Metade (0,2): PostgreSQL + um motivo. Zero (0): outro gerenciador.

### ITEM 09-a
**Resposta esperada:** A **tabela** "aluno" representa o assunto alunos; uma **coluna** (ex.: email) é uma característica do aluno; uma **linha** (ex.: "1, Ana Souza...") é um aluno.
**Critérios:** Nota cheia (0,2): os três corretos. Metade (0,1): dois corretos. Zero (0): um ou nenhum.

### ITEM 09-b
**Resposta esperada:** O **id identifica cada linha sem repetição**, para o sistema achar exatamente aquele aluno. Se dois alunos tivessem o mesmo id, o sistema **não saberia qual é qual**: poderia mostrar, alterar ou apagar o aluno errado.
**Critérios:** Palavras-chave: identifica; sem repetição/único; aluno errado. Nota cheia (0,4): função + consequência. Metade (0,2): só a função. Zero (0): diz que o id guarda dados do aluno, como a idade.

### ITEM 09-c
**Resposta esperada:** Devolve o **nome dos alunos de Blumenau** (no exemplo, **Bruno Lima**). **SELECT** escolhe as colunas mostradas (nome), **FROM** indica a tabela (aluno) e **WHERE** filtra as linhas (cidade = 'Blumenau').
**Critérios:** Palavras-chave: Bruno Lima/alunos de Blumenau; SELECT colunas; FROM tabela; WHERE filtro. Nota cheia (0,4): resultado + papel das três partes. Metade (0,2): resultado certo e uma ou duas partes explicadas. Zero (0): diz que a consulta apaga ou altera dados.

### ITEM 10-a
**Resposta esperada:** Porque o **projeto cresce aula a aula** e cada etapa depende da anterior; sem organizar o tempo, as entregas atrasam.
**Critérios:** Palavras-chave: projeto contínuo; etapas dependentes; atraso. Nota cheia (0,2): justificativa com a dependência entre etapas. Metade (0,1): "para não atrasar" sem explicar. Zero (0): sem relação.

### ITEM 10-b
**Resposta esperada:** A UC segue a ordem **entender o pedido → modelar → preparar o SGBD → construir com SQL**. Sem a modelagem, as tabelas ficam com **redundância e erros** e precisam ser **refeitas**, atrasando todas as aulas de construção (12 a 20).
**Critérios:** Palavras-chave: ordem das etapas; tabelas sem modelo com erros/redundância; retrabalho. Nota cheia (0,4): ordem + consequência. Metade (0,2): só a consequência genérica. Zero (0): concorda com deixar a modelagem para o fim.

### ITEM 10-c
**Resposta esperada:** Exemplo: (1) **entregar** a atividade de cada aula na mesma semana; (2) **reservar 1 hora por semana** para revisar SQL; (3) **pedir ajuda** ao professor ou colega quando travar mais de 20 minutos. Justificativa de um item (ex.: a revisão semanal evita acumular dúvidas para a avaliação).
**Critérios:** Palavras-chave: três itens (entrega, revisão, ajuda) + justificativa de um. Nota cheia (0,4): três itens coerentes + justificativa. Metade (0,2): itens incompletos ou sem justificativa. Zero (0): plano sem relação com a UC.
