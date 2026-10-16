# Padrão de Resposta — Atividade Prática — Aula 20 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Projeto Integrador: Banco Documentado para o Back-End.
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
**Resposta esperada:** Rastreabilidade é ligar cada **tabela**, coluna importante e **regra** do banco a um **requisito** do escopo do cliente, para saber por que cada coisa existe e se todo pedido foi atendido.
**Critérios:** Nota cheia (0,2): ligação banco ↔ requisito do escopo. Metade (0,1): ideia incompleta (ex.: "conferir o banco" sem citar o requisito). Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** R2 = **UNIQUE (id_aluno, id_turma)** na tabela matricula; R3 = procedimento **matricular**, que conta as matrículas ativas (com FOR UPDATE) e barra a 26ª; R6 = **GRANT SELECT (id_aluno, nome) ON aluno** para o grupo do financeiro (permissão por coluna), sem SELECT no CPF.
**Critérios:** Nota cheia (0,4): os três certos. Metade (0,2): dois certos. Zero (0): um ou nenhum.

### ITEM 01-c
**Resposta esperada:** Tabela sem requisito **sobra** no modelo: precisa ser justificada ou retirada. Requisito sem tabela, restrição ou procedimento **falta**: o banco ainda não atende ao cliente e precisa ser completado.
**Critérios:** Nota cheia (0,4): sobra e falta, com o que fazer em cada caso. Metade (0,2): só um dos casos. Zero (0): sem relação.

### ITEM 02-a
**Resposta esperada:** Porque um objeto **depende** de outro: turma precisa de curso (chave estrangeira), o trigger precisa da função, o GRANT precisa da tabela já criada. Fora da ordem, o script dá erro.
**Critérios:** Nota cheia (0,2): dependência + exemplo correto. Metade (0,1): só a dependência sem exemplo, ou exemplo sem explicar. Zero (0): sem relação.

### ITEM 02-b
**Resposta esperada:** `\set ON_ERROR_STOP on`, depois `\i 01-ddl-escola.sql`, `\i 02-dados-teste.sql`, `\i 03-consultas-basicas.sql`, `\i 04-relatorios.sql`, `\i 05-procedimentos.sql`, `\i 06-triggers.sql`, `\i 07-seguranca.sql` (aceitar `\ir` e `\echo` entre eles). Execução: `psql -U postgres -d escola_teste -f sql/00-instalar.sql` (aceitar outro banco de teste).
**Critérios:** Nota cheia (0,4): ON_ERROR_STOP + os 7 scripts na ordem + comando psql -f. Metade (0,2): scripts na ordem sem ON_ERROR_STOP ou sem o comando de execução. Zero (0): ordem errada ou sem \i.

### ITEM 02-c
**Resposta esperada:** O psql **mostra o erro e continua** executando os outros scripts; o banco fica **pela metade** (falta tabela, função ou permissão) e o erro passa despercebido no meio das mensagens.
**Critérios:** Nota cheia (0,4): continua + banco incompleto/erro escondido. Metade (0,2): só um dos dois. Zero (0): diz que o psql para ou desfaz tudo.

### ITEM 03-a
**Resposta esperada:** O banco de desenvolvimento pode ter objetos **criados à mão** que não estão nos scripts; só um banco **limpo** prova que os scripts sozinhos instalam tudo. Nunca testar no banco de **produção** (dados reais da escola).
**Critérios:** Nota cheia (0,2): motivo + produção. Metade (0,1): só um dos dois. Zero (0): sem relação.

### ITEM 03-b
**Resposta esperada:** `DROP DATABASE IF EXISTS escola_teste;` e `CREATE DATABASE escola_teste;` (no psql ou com dropdb/createdb), depois `psql -U postgres -d escola_teste -f sql/00-instalar.sql`.
**Critérios:** Nota cheia (0,4): criar o banco limpo + rodar o mestre nele. Metade (0,2): só um dos dois. Zero (0): roda no banco de produção ou comandos sem relação.

### ITEM 03-c
**Resposta esperada:** (1) A função **registrar_historico_nota** existia só no banco de desenvolvimento: colocar o **CREATE OR REPLACE FUNCTION** dela no script 06, **antes** do CREATE TRIGGER (e usar `DROP TRIGGER IF EXISTS ... ON matricula` antes do CREATE TRIGGER). (2) Trocar `CREATE PROCEDURE` por **CREATE OR REPLACE PROCEDURE matricular** no script 05, para rodar de novo sem o erro "já existe".
**Critérios:** Nota cheia (0,4): as duas correções. Metade (0,2): uma correção. Zero (0): sem relação ou "apagar o banco toda vez".

### ITEM 04-a
**Resposta esperada:** Deixar **outra pessoa** (colega do back-end, professor, próxima equipe) **entender, instalar e usar** o banco sem precisar perguntar para quem fez.
**Critérios:** Nota cheia (0,2): outra pessoa + entender/instalar/usar. Metade (0,1): ideia incompleta. Zero (0): "para ter mais páginas" ou sem relação.

### ITEM 04-b
**Resposta esperada:** README: **versão do PostgreSQL**, como **criar o banco**, o **comando do script mestre**, os **logins** que precisam existir (sem as senhas) e **como testar**. Escopo atualizado: **objetivo** do sistema, **requisitos**, o que **entra**, o que **não entra** e as **mudanças de escopo** aceitas durante o projeto.
**Critérios:** Nota cheia (0,4): pelo menos 4 itens do README + 4 do escopo. Metade (0,2): só um dos documentos completo, ou os dois incompletos. Zero (0): sem relação ou com senha no README.

### ITEM 04-c
**Resposta esperada:** Exemplo: coluna **valor** · tipo **numeric(10,2)** · **não nula** (NOT NULL) · não é chave · regra **CHECK (valor > 0)** e não muda depois de paga (trigger) · exemplo **350.00**.
**Critérios:** Nota cheia (0,4): nome, tipo, nulo, chave, regra e exemplo. Metade (0,2): três ou quatro desses campos. Zero (0): só o nome.

### ITEM 05-a
**Resposta esperada:** **Tarefa**, **responsável**, data **prevista**, data **realizada** e **observação** (motivo dos atrasos).
**Critérios:** Nota cheia (0,2): previsto + realizado + responsável. Metade (0,1): só o previsto ou sem responsável. Zero (0): sem relação.

### ITEM 05-b
**Resposta esperada:** | Procedimentos (05) | responsável (ex.: Bruno) | Aula 17 | Aula 18 | Atraso: a regra de vagas mudou (mudança de escopo aceita) |
**Critérios:** Nota cheia (0,4): previsto 17 + realizado 18 + motivo. Metade (0,2): sem o motivo, ou trocando previsto e realizado. Zero (0): esconde o atraso (realizado igual ao previsto).

### ITEM 05-c
**Resposta esperada:** "Aluno já matriculado na turma?" = **UNIQUE (id_aluno, id_turma)** da tabela matricula; "Há vagas?" = procedimento **matricular** (conta as matrículas ativas e barra acima de 25). Ligar o fluxograma ao banco mostra **onde cada regra é executada**: o desenho deixa de ser só ilustração e vira a **explicação das regras** do banco, conferível no código.
**Critérios:** Nota cheia (0,4): os dois recursos + o motivo. Metade (0,2): os dois recursos sem o motivo, ou um recurso com o motivo. Zero (0): recursos trocados.

### ITEM 06-a
**Resposta esperada:** Dois entre: toda entidade virou tabela e toda tabela está no DER; toda tabela tem **chave primária**; toda ligação 1:N tem a **chave estrangeira** do lado N; N:N virou **tabela associativa**; o DER bate com o `\d` de cada tabela.
**Critérios:** Nota cheia (0,2): dois itens certos. Metade (0,1): um item. Zero (0): nenhum.

### ITEM 06-b
**Resposta esperada:** nome_curso em turma = **3FN** (depende do curso, não da chave da turma — dependência transitiva); telefones com lista = **1FN** (valor não atômico); IdMatrícula = **padrão de nomes** da UC (minúsculas, sem acento, id_ no início).
**Critérios:** Nota cheia (0,4): os três certos. Metade (0,2): dois certos. Zero (0): um ou nenhum.

### ITEM 06-c
**Resposta esperada:** Tirar **nome_curso** da turma e buscar o nome pelo JOIN com curso (id_curso); separar os telefones numa **tabela própria** (ex.: telefone_aluno com id_aluno) ou em colunas definidas com um telefone por coluna; renomear para **id_matricula** (`ALTER TABLE matricula RENAME COLUMN ...`).
**Critérios:** Nota cheia (0,4): as três correções. Metade (0,2): duas correções. Zero (0): uma ou nenhuma.

### ITEM 07-a
**Resposta esperada:** Para mostrar o **uso** de cada consulta no sistema (rastreabilidade): o colega do back-end sabe qual usar em cada tela, e consulta que **ninguém usa** sai do script.
**Critérios:** Nota cheia (0,2): uso no sistema/tela + retirar o que não é usado ou orientar o back-end. Metade (0,1): ideia incompleta. Zero (0): sem relação.

### ITEM 07-b
**Resposta esperada:** `SELECT a.nome, p.id_matricula, p.numero, p.vencimento, p.valor FROM parcela p JOIN matricula m ON m.id_matricula = p.id_matricula JOIN aluno a ON a.id_aluno = m.id_aluno WHERE p.vencimento < current_date AND p.data_pagamento IS NULL ORDER BY p.vencimento;`
**Critérios:** Nota cheia (0,4): JOIN parcela-matricula-aluno + vencimento < current_date + data_pagamento IS NULL. Metade (0,2): uma das condições faltando ou sem o nome do aluno. Zero (0): condição invertida ou sem JOIN.

### ITEM 07-c
**Resposta esperada:** `SELECT t.codigo FROM turma t LEFT JOIN matricula m ON m.id_turma = t.id_turma WHERE m.id_matricula IS NULL;` (aceitar NOT EXISTS). O **LEFT JOIN** mantém todas as turmas; as que não têm matrícula ficam com as colunas de matricula **nulas**, e o IS NULL filtra essas.
**Critérios:** Nota cheia (0,4): consulta certa + explicação do LEFT JOIN/IS NULL (ou NOT EXISTS). Metade (0,2): consulta certa sem explicação, ou explicação certa com erro pequeno no SQL. Zero (0): INNER JOIN ou sem relação.

### ITEM 08-a
**Resposta esperada:** O contrato é a **lista do que a aplicação pode chamar** no banco (visões, procedimentos, comandos) e **com quais permissões**, pelo login **app_escola**. A senha do postgres não é entregue porque o postgres **pode tudo** (apagar o banco, criar papéis): fere o **menor privilégio**.
**Critérios:** Nota cheia (0,2): lista do que pode chamar + motivo da recusa. Metade (0,1): só um dos dois. Zero (0): aceita entregar o postgres.

### ITEM 08-b
**Resposta esperada:** `GRANT CONNECT ON DATABASE escola_db TO app_escola; GRANT USAGE ON SCHEMA public TO app_escola; GRANT EXECUTE ON PROCEDURE matricular(integer, integer) TO app_escola; GRANT EXECUTE ON PROCEDURE registrar_pagamento(integer, smallint) TO app_escola; GRANT SELECT, UPDATE (nome, email, telefone) ON aluno TO app_escola;` (aceitar SELECT nas colunas que a tela mostra).
**Critérios:** Nota cheia (0,4): EXECUTE nos dois procedimentos + UPDATE só nas três colunas. Metade (0,2): falta um procedimento ou UPDATE na tabela inteira. Zero (0): GRANT ALL ou DELETE.

### ITEM 08-c
**Resposta esperada:** Consultas com **parâmetros** ($1, $2) impedem o **SQL injection**: o texto digitado pelo usuário nunca vira comando. A senha do app_escola fica numa **variável de ambiente** do servidor, **nunca no Git** nem no JavaScript do site.
**Critérios:** Nota cheia (0,4): SQL injection + variável de ambiente fora do Git. Metade (0,2): só um dos dois. Zero (0): senha no README ou no código.

### ITEM 09-a
**Resposta esperada:** **\dt** (tabelas), **\dv** (visões), **\df** (funções e procedimentos) e **\du** (papéis).
**Critérios:** Nota cheia (0,2): os quatro. Metade (0,1): dois ou três. Zero (0): um ou nenhum.

### ITEM 09-b
**Resposta esperada:** (1) Repetir `CALL matricular(1, 2);` → **erro** do UNIQUE (id_aluno, id_turma) (matrícula duplicada), mostrando que a regra R2 funciona. (2) No login do financeiro, `SELECT cpf FROM aluno;` → **ERROR: permission denied**, mostrando que a matriz de acesso (R6) foi respeitada.
**Critérios:** Nota cheia (0,4): os dois testes com o resultado esperado. Metade (0,2): um teste completo, ou os dois sem o resultado. Zero (0): resultados trocados (aceitar a matrícula repetida ou mostrar o CPF).

### ITEM 09-c
**Resposta esperada:** Backup: `pg_dump -U postgres -d escola_teste -F c -f escola.dump`. Prova: `createdb escola_restaurado` e `pg_restore -d escola_restaurado escola.dump`, conferindo as tabelas e os dados. Backup que **nunca foi restaurado** não é garantia de **disponibilidade**: só a restauração prova que o arquivo serve.
**Critérios:** Nota cheia (0,4): pg_dump + pg_restore num banco novo + motivo. Metade (0,2): pg_dump sem a restauração, ou restauração sem o motivo. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** A equipe revisora segue **só o README** e roda o **script mestre num banco limpo**, preenchendo a ficha (instalação, teste de ponta a ponta, modelo, segurança e documentação). Toda dificuldade aponta uma falha da documentação.
**Critérios:** Nota cheia (0,2): só pelo README + banco limpo/ficha. Metade (0,1): só um dos dois. Zero (0): sem relação.

### ITEM 10-b
**Resposta esperada:** Exemplo: "O **06-triggers.sql** (o quê/onde) cria o trigger antes da função registrar_historico_nota, e a instalação **para com erro no passo 6** (efeito)." A equipe **anota** a sugestão no registro, agradece, **decide** se aceita e **responde com o motivo** — crítica ao trabalho, nunca à pessoa.
**Critérios:** Nota cheia (0,4): sugestão com o quê, onde e efeito + como receber. Metade (0,2): só uma das duas partes. Zero (0): crítica pessoal ou sem relação.

### ITEM 10-c
**Resposta esperada:** | Matrícula é cancelada, não apagada | Guardar o **histórico** e as parcelas, protegendo a **integridade** (requisito de saber quem alterou e de manter os pagamentos) | DELETE com ON DELETE CASCADE |
**Critérios:** Nota cheia (0,4): decisão + motivo ligado ao requisito/integridade + alternativa descartada. Metade (0,2): falta o motivo ou a alternativa. Zero (0): sem relação.
