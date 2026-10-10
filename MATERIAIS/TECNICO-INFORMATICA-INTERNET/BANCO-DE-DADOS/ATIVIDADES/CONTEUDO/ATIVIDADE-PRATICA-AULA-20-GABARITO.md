# Padrão de Resposta — Atividade Prática — Aula 20 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Projeto Integrador: Banco Documentado para o Back-end.
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
**Resposta esperada:** Quando **outra pessoa** (o back-end, o DBA, a próxima equipe) consegue **entender, recriar e usar** o banco **sem perguntar** ao grupo que o fez.
**Critérios:** Nota cheia (0,2): outra pessoa + entender/recriar/usar sem perguntar. Metade (0,1): só "funciona no computador do grupo" com a ideia de usar. Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** **Escopo** (objetivo, requisitos, entra/não entra); **DER** (modelo final); **dicionário de dados** (cada coluna com tipo, formato, domínio); **cronograma** (planejado × realizado); **fluxograma** (processo da matrícula e pontos do banco); **scripts numerados** (recriam o banco); **matriz de acesso** (quem pode S, I, U, D); **README/guia de instalação** (recriar, conectar e testar).
**Critérios:** Nota cheia (0,4): pelo menos seis peças com a função certa. Metade (0,2): três a cinco peças, ou peças sem a função. Zero (0): duas ou menos.

### ITEM 01-c
**Resposta esperada:** Porque é o **ponto de partida** de quem não fez o banco: explica **como recriar do zero** (ordem dos scripts e comandos), **como conectar** (login app_escola e variável de ambiente) e **como testar** (conferência e testes); sem ele, a empresa teria de perguntar ao grupo.
**Critérios:** Nota cheia (0,4): recriar + conectar + testar. Metade (0,2): dois dos três. Zero (0): um ou nenhum.

### ITEM 02-a
**Resposta esperada:** O **documento de escopo** (aula 5): objetivo, partes interessadas, o que **entra** e o que **não entra**, **requisitos de dados**, entregas e prazos, premissas e riscos.
**Critérios:** Nota cheia (0,2): escopo + pelo menos três itens. Metade (0,1): só "escopo". Zero (0): outro documento.

### ITEM 02-b
**Resposta esperada:** (1) requisito sem tabela = **pendência**: criar o que falta (ex.: coluna ou tabela de responsável) e registrar no cronograma; (2) tabela sem requisito = **excesso** (ou mudança de escopo sem registro): retirar da entrega ou registrar a mudança e pedir aprovação.
**Critérios:** Nota cheia (0,4): as duas classificações + o que fazer. Metade (0,2): classificações sem a ação, ou só uma completa. Zero (0): trocadas.

### ITEM 02-c
**Resposta esperada:** Registrar o **pedido**, o **impacto** (tempo, tabelas, custo) e obter a **aprovação** do cliente; só então a tabela entra no escopo, no cronograma e na rastreabilidade.
**Critérios:** Nota cheia (0,4): pedido + impacto + aprovação. Metade (0,2): só um ou dois. Zero (0): "cria e pronto".

### ITEM 03-a
**Resposta esperada:** **Nome padronizado**, **tipo**, **formato**, **obrigatoriedade** (NOT NULL), **domínio** (valores aceitos) e **descrição**.
**Critérios:** Nota cheia (0,2): pelo menos quatro. Metade (0,1): duas ou três. Zero (0): uma ou nenhuma.

### ITEM 03-b
**Resposta esperada:** Tabela **parcela** · coluna **data_pagamento** · tipo **date** · formato AAAA-MM-DD · **opcional** (nula enquanto não paga) · descrição: **data em que a parcela foi paga**; só o financeiro altera (aula 19).
**Critérios:** Nota cheia (0,4): nome certo + date + opcional + descrição. Metade (0,2): nome e tipo certos sem obrigatoriedade/descrição. Zero (0): mantém "pago_em" ou tipo texto.

### ITEM 03-c
**Resposta esperada:** A documentação **deixa de bater com o banco**: o back-end escreve consultas com o nome ou o tipo errado, tem **erro** e perde a confiança no documento; o dicionário é o que **guia o SQL** e precisa ser atualizado junto.
**Critérios:** Nota cheia (0,4): não bate + consequência. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 04-a
**Resposta esperada:** Porque **a ordem de execução importa**: a tabela de referência precisa existir antes da **chave estrangeira**, e as tabelas antes do **GRANT** e das rotinas.
**Critérios:** Nota cheia (0,2): ordem + exemplo de dependência. Metade (0,1): só "por causa da ordem". Zero (0): estética.

### ITEM 04-b
**Resposta esperada:** **01-banco-e-usuario.sql** (banco e login app_escola); **02-tabelas.sql** (CREATE TABLE); **03-chaves-e-restricoes.sql** (PK, FK, UNIQUE, CHECK); **04-dados-iniciais.sql** (INSERT); **05-consultas.sql** (relatórios); **06-procedimentos-e-triggers.sql** (matricular e triggers); **07-seguranca.sql** (grupos, GRANT, visão, auditoria).
**Critérios:** Nota cheia (0,4): os sete na ordem com o conteúdo. Metade (0,2): ordem com uma ou duas trocas, ou sem o conteúdo. Zero (0): segurança antes das tabelas ou ordem sem sentido.

### ITEM 04-c
**Resposta esperada:** **Comentário no início** (o que faz, dependência, quem alterou); **idempotente** (IF NOT EXISTS, CREATE OR REPLACE); **transação** (BEGIN/COMMIT: se falhar, nada fica pela metade); **sem senha real**; **versionado no Git**. Explicação de uma delas.
**Critérios:** Nota cheia (0,4): três práticas + explicação correta de uma. Metade (0,2): três sem explicação, ou duas com explicação. Zero (0): uma ou nenhuma.

### ITEM 05-a
**Resposta esperada:** O banco do próprio computador pode estar **"remendado"** (comandos rodados à mão, fora dos scripts) e **esconder erros**; só a recriação **num banco limpo** prova que os **scripts sozinhos** criam o banco.
**Critérios:** Nota cheia (0,2): remendado/esconde erro + só os scripts. Metade (0,1): só um. Zero (0): sem relação.

### ITEM 05-b
**Resposta esperada:** psql -U postgres -d escola_db **-v ON_ERROR_STOP=1** -f 02-tabelas.sql e depois psql -U postgres -d escola_db **-v ON_ERROR_STOP=1** -f 03-chaves-e-restricoes.sql (nessa ordem).
**Critérios:** Nota cheia (0,4): os dois comandos com -d escola_db, -f e ON_ERROR_STOP, na ordem. Metade (0,2): sem ON_ERROR_STOP, ou ordem trocada. Zero (0): comandos sem relação.

### ITEM 05-c
**Resposta esperada:** Faz o psql **parar no primeiro erro**, em vez de **seguir e esconder** o problema (o 03 falhou e os outros rodaram por cima). Dentro do psql, **\i 02-tabelas.sql** executa o arquivo.
**Critérios:** Nota cheia (0,4): para no primeiro erro + \i. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 06-a
**Resposta esperada:** É uma tabela que **liga cada requisito do escopo** ao que o **atende no banco** (tabela, restrição, rotina, permissão) e ao **script** onde está.
**Critérios:** Nota cheia (0,2): requisito → banco → script. Metade (0,1): sem o script ou sem o requisito. Zero (0): confunde com cronograma.

### ITEM 06-b
**Resposta esperada:** R1 → **UNIQUE (cpf)** em aluno, scripts 02/03; R2 → **procedimento matricular** (conta e barra a 26ª), script 06; R4 → **trigger de validação** da parcela, script 06; R6 → **GRANT SELECT (id_aluno, nome) ON aluno** ao grupo do financeiro, script 07.
**Critérios:** Nota cheia (0,4): os quatro com peça e script. Metade (0,2): dois ou três certos, ou os quatro sem script. Zero (0): um ou nenhum.

### ITEM 06-c
**Resposta esperada:** Requisito **sem linha** (nada no banco o atende) é **pendência**; tabela ou rotina que **não aparece** em nenhuma linha é **excesso** ou mudança de escopo sem registro. A matriz também prova ao cliente que **nada ficou de fora**.
**Critérios:** Nota cheia (0,4): pendência + excesso. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 07-a
**Resposta esperada:** **\dt** lista as tabelas; **\d matricula** mostra colunas, tipos e restrições.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.

### ITEM 07-b
**Resposta esperada:** Ex.: (1) SELECT count(*) FROM curso; → a quantidade de cursos dos dados iniciais; (2) CALL matricular(...) numa turma com 25 alunos → **erro** com a mensagem do RAISE EXCEPTION; (3) login do financeiro: SELECT cpf FROM aluno; → **permission denied**. Outros testes válidos: gravar FK inexistente (erro), alterar a nota e ver o histórico, alterar parcela e ver a auditoria, \dp.
**Critérios:** Nota cheia (0,4): três testes de tipos diferentes com ação e resultado esperado. Metade (0,2): dois, ou três sem o resultado esperado. Zero (0): um ou nenhum.

### ITEM 07-c
**Resposta esperada:** Cada linha registra **o que foi testado**, o **resultado esperado** e o **resultado obtido**. O erro pode ser o esperado porque prova que a **regra funciona** (FK, CHECK, turma cheia, permission denied).
**Critérios:** Nota cheia (0,4): as três colunas + erro esperado. Metade (0,2): só uma das partes. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** pg_dump -U postgres **-Fc** -d escola_db -f escola_db_entrega.dump
**Critérios:** Nota cheia (0,2): pg_dump com -Fc e o banco. Metade (0,1): pg_dump sem -Fc (formato texto). Zero (0): pg_restore ou outro.

### ITEM 08-b
**Resposta esperada:** createdb -U postgres escola_db_teste; pg_restore -U postgres -d escola_db_teste escola_db_entrega.dump; psql -U postgres -d escola_db_teste -c "SELECT count(*) FROM aluno;"
**Critérios:** Nota cheia (0,4): os três passos em outro banco. Metade (0,2): restaura sem conferir, ou restaura no banco original. Zero (0): nenhum passo certo.

### ITEM 08-c
**Resposta esperada:** Backup **nunca restaurado não é garantia** (disponibilidade): só a restauração prova que o arquivo serve. O arquivo tem **dados pessoais** (CPF etc.): no **Git** ficaria exposto a quem acessa o repositório (confidencialidade, LGPD); fica num lugar com **acesso restrito**.
**Critérios:** Nota cheia (0,4): as duas explicações. Metade (0,2): só uma. Zero (0): nenhuma.

### ITEM 09-a
**Resposta esperada:** Login **app_escola** (só o que o sistema precisa); string de conexão numa **variável de ambiente**.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): postgres ou senha no código.

### ITEM 09-b
**Resposta esperada:** DATABASE_URL=**postgresql://app_escola:<senha>@servidor:5432/escola_db**. Contrato: **tabelas e colunas** (dicionário), **visões** (vw_matriculas_por_turma), **procedimentos** (CALL matricular(id_aluno, id_turma)) e as **mensagens de erro** que devolvem.
**Critérios:** Nota cheia (0,4): URL com app_escola + pelo menos três itens do contrato. Metade (0,2): só a URL ou só o contrato. Zero (0): URL com postgres e sem contrato.

### ITEM 09-c
**Resposta esperada:** O postgres tem **poder total**: entregar a senha fere o **menor privilégio** e, se vazar, o invasor pode tudo. Quando o banco devolve um erro de regra, o back-end deve **tratar o erro** e mostrar uma **mensagem clara** ao usuário (ex.: "turma sem vagas"), sem desligar a regra do banco.
**Critérios:** Nota cheia (0,4): menor privilégio + tratar o erro. Metade (0,2): só um. Zero (0): entrega a senha ou ignora o erro.

### ITEM 10-a
**Resposta esperada:** Uma linha no registro da revisão com a **sugestão**, a **decisão** (aceita ou não), o **motivo** e **quem ajusta**.
**Critérios:** Nota cheia (0,2): os quatro campos (aceitar três). Metade (0,1): só a sugestão e a decisão. Zero (0): não registrar.

### ITEM 10-b
**Resposta esperada:** (1) A parcela é **entidade fraca**: só existe dentro da matrícula; a chave **(id_matricula, numero)** identifica a parcela pela dona e **impede parcela repetida** na mesma matrícula. (2) O limite precisa **contar as matrículas** da turma (consulta em outras linhas); um **CHECK só olha a própria linha**, por isso a regra fica no **procedimento** (com a trava da aula 17).
**Critérios:** Nota cheia (0,4): as duas justificativas técnicas. Metade (0,2): só uma. Zero (0): "porque sim" ou justificativas erradas.

### ITEM 10-c
**Resposta esperada:** **Revisor** pergunta em vez de acusar, aponta onde está o problema e sugere; **autor** escuta, confere nos requisitos e **aceita ou justifica**. Decisão (qualquer uma vale com base técnica): ex.: **não aceitar**, porque "matricula" é o termo do **escopo** e do cliente e já está no dicionário, nos scripts, no procedimento e na matriz de acesso — renomear agora geraria retrabalho e risco; ou **aceitar**, registrando e ajustando todas as peças.
**Critérios:** Nota cheia (0,4): atitudes dos dois + decisão justificada com requisito/impacto. Metade (0,2): só as atitudes ou só a decisão justificada. Zero (0): decisão sem justificativa e sem atitudes.
