# Padrão de Resposta — Atividade Prática — Aula 19 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Segurança da Informação: Pilares, Acesso e Auditoria.
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
**Resposta esperada:** **Confidencialidade**, **integridade** e **disponibilidade** (sigla CID; em inglês, CIA).
**Critérios:** Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 01-b
**Resposta esperada:** (1) vazamento do CPF = **confidencialidade** (papéis e GRANT mínimos, permissão por coluna, visão, senha forte); (2) nota alterada = **integridade** (GRANT UPDATE só para quem pode, CHECK, trigger de validação, auditoria); (3) disco queimado = **disponibilidade** (backup automático e testado guardado em outro lugar, servidor estável, monitoramento).
**Critérios:** Nota cheia (0,4): os três pilares certos + uma proteção coerente para cada. Metade (0,2): pilares certos sem as proteções, ou dois casos completos. Zero (0): pilares trocados.

### ITEM 01-c
**Resposta esperada:** O backup **ajuda a disponibilidade** (dá para recuperar os dados), mas, sem senha e num pendrive compartilhado, **fere a confidencialidade**: qualquer pessoa que pegar o pendrive lê o CPF dos alunos. Os pilares andam juntos.
**Critérios:** Nota cheia (0,4): os dois pilares + o motivo. Metade (0,2): só um dos pilares com o motivo. Zero (0): pilares trocados ou sem relação.

### ITEM 02-a
**Resposta esperada:** **Pública**, **interna**, **restrita** e **confidencial**.
**Critérios:** Nota cheia (0,2): os quatro. Metade (0,1): dois ou três. Zero (0): um ou nenhum.

### ITEM 02-b
**Resposta esperada:** Nome do curso = **pública**; matrículas por turma = **interna**; e-mail do aluno = **restrita**; CPF do aluno = **confidencial**.
**Critérios:** Nota cheia (0,4): os quatro certos. Metade (0,2): dois ou três certos. Zero (0): um ou nenhum (aceitar e-mail como confidencial se justificado como dado pessoal).

### ITEM 02-c
**Resposta esperada:** O postgres é o **administrador** (pode tudo: apagar banco, criar papéis); se a senha vazar pelo back-end, o invasor **pode tudo**. A aplicação usa um login próprio (app_escola) com **só os comandos que o back-end usa** — menor privilégio; o postgres fica só com o DBA.
**Critérios:** Nota cheia (0,4): poder total do postgres + login próprio com o mínimo. Metade (0,2): só um dos dois. Zero (0): sem relação.

### ITEM 03-a
**Resposta esperada:** Cada usuário recebe **só as permissões necessárias** para o seu trabalho, nada "a mais por garantia"; se a senha vazar, o estrago fica limitado.
**Critérios:** Nota cheia (0,2): só o necessário. Metade (0,1): ideia incompleta (ex.: "dar pouca permissão" sem ligar ao trabalho). Zero (0): sem relação ou "acesso total".

### ITEM 03-b
**Resposta esperada:** Financeiro: **parcela = S e U só em data_pagamento** (sem I e sem D); **aluno = S só em id_aluno e nome** (sem I, U e D; não vê CPF nem telefone).
**Critérios:** Nota cheia (0,4): as duas tabelas com as colunas certas e sem DELETE. Metade (0,2): uma tabela certa, ou as duas sem restringir as colunas. Zero (0): acesso total ou com DELETE.

### ITEM 03-c
**Resposta esperada:** A matrícula é **cancelada** (situacao = 'cancelada', procedimento da aula 17), **não apagada**: assim o **histórico** e as parcelas ficam guardados e ninguém apaga dado por engano ou de propósito — protege a **integridade** (e a disponibilidade).
**Critérios:** Nota cheia (0,4): cancelar em vez de apagar + histórico/integridade. Metade (0,2): só um dos dois. Zero (0): sem relação.

### ITEM 04-a
**Resposta esperada:** No PostgreSQL, usuário e grupo são o mesmo objeto, o **papel (role)**. O papel de **grupo** é criado com **NOLOGIN** e guarda as permissões; o papel de **login** tem **LOGIN** e senha, é uma pessoa, e entra no grupo para herdar as permissões.
**Critérios:** Nota cheia (0,2): NOLOGIN × LOGIN + função de cada. Metade (0,1): só um dos lados. Zero (0): sem relação.

### ITEM 04-b
**Resposta esperada:** CREATE ROLE grupo_secretaria NOLOGIN; CREATE ROLE grupo_financeiro NOLOGIN; CREATE ROLE grupo_consulta NOLOGIN; CREATE ROLE ana_secretaria **LOGIN PASSWORD** '...' **IN ROLE grupo_secretaria**; (ou CREATE ROLE ana_secretaria LOGIN PASSWORD '...'; GRANT grupo_secretaria TO ana_secretaria;).
**Critérios:** Nota cheia (0,4): três grupos NOLOGIN + login no grupo. Metade (0,2): grupos sem o login, ou login fora do grupo. Zero (0): CREATE TABLE ou sem relação.

### ITEM 04-c
**Resposta esperada:** Com as permissões no **grupo**, cada funcionária nova só ganha o **login no grupo** e **herda** as permissões, todas iguais, sem script novo. O login **compartilhado** faz a auditoria mostrar "secretaria" e **não quem fez**, e a senha no post-it fica exposta; cada pessoa precisa do **próprio login**.
**Critérios:** Nota cheia (0,4): herança pelo grupo + auditoria sem saber quem. Metade (0,2): só um dos dois. Zero (0): sem relação.

### ITEM 05-a
**Resposta esperada:** Todo papel recebe por padrão (PUBLIC) acesso ao banco e ao esquema; o **REVOKE ... FROM PUBLIC** tira esse acesso, e **só entra quem recebeu GRANT**.
**Critérios:** Nota cheia (0,2): acesso padrão de todos + só quem recebeu GRANT. Metade (0,1): só "tira acesso". Zero (0): "apaga o banco" ou sem relação.

### ITEM 05-b
**Resposta esperada:** GRANT **CONNECT** ON DATABASE escola_db TO grupo_secretaria; GRANT **USAGE** ON SCHEMA public TO grupo_secretaria; GRANT **SELECT, INSERT, UPDATE** ON aluno, matricula TO grupo_secretaria; GRANT **SELECT** ON curso, turma TO grupo_secretaria;
**Critérios:** Nota cheia (0,4): CONNECT/USAGE + as permissões da matriz, para o grupo. Metade (0,2): falta CONNECT/USAGE, ou permissões a mais/a menos, ou dadas para a pessoa. Zero (0): GRANT ALL ou sem relação.

### ITEM 05-c
**Resposta esperada:** **REVOKE UPDATE ON matricula FROM grupo_secretaria;** — como a permissão estava no **grupo**, **todas as secretárias** perdem o UPDATE na matrícula ao mesmo tempo (continuam com SELECT e INSERT); quem tentar alterar recebe *permission denied*.
**Critérios:** Nota cheia (0,4): REVOKE certo + efeito em todas do grupo. Metade (0,2): só o comando ou só a explicação. Zero (0): GRANT, DROP ou DELETE.

### ITEM 06-a
**Resposta esperada:** Quando a pessoa precisa de **algumas colunas** da tabela e **não pode ver ou alterar as outras** (ex.: dados pessoais como CPF) — menor privilégio.
**Critérios:** Nota cheia (0,2): só as colunas necessárias + proteger as outras. Metade (0,1): ideia incompleta. Zero (0): sem relação.

### ITEM 06-b
**Resposta esperada:** GRANT **SELECT, UPDATE (data_pagamento)** ON parcela TO grupo_financeiro; GRANT **SELECT (id_aluno, nome)** ON aluno TO grupo_financeiro; (aceitar GRANT SELECT ON parcela + GRANT UPDATE (data_pagamento) ON parcela separados).
**Critérios:** Nota cheia (0,4): os dois GRANT com as colunas certas, para o grupo. Metade (0,2): só um deles certo. Zero (0): GRANT na tabela inteira (UPDATE ou SELECT sem colunas) ou ALL.

### ITEM 06-c
**Resposta esperada:** SELECT cpf = **ERROR: permission denied** (não tem SELECT no CPF); o UPDATE de data_pagamento **funciona**; DELETE = **permission denied**. Os erros são o **resultado esperado**: mostram que a **matriz de acesso foi respeitada**.
**Critérios:** Nota cheia (0,4): os três resultados + "erro esperado/matriz respeitada". Metade (0,2): resultados certos sem a explicação, ou dois resultados certos com ela. Zero (0): resultados trocados.

### ITEM 07-a
**Resposta esperada:** Uma **consulta salva com nome**, usada como se fosse uma tabela; o usuário recebe permissão na **visão** e não nas tabelas de baixo.
**Critérios:** Nota cheia (0,2): consulta salva + permissão na visão. Metade (0,1): só "consulta salva". Zero (0): "cópia da tabela" ou sem relação.

### ITEM 07-b
**Resposta esperada:** CREATE VIEW vw_matriculas_por_turma AS SELECT t.codigo, c.nome AS curso, **count(m.id_matricula)** AS matriculas FROM turma t JOIN curso c ON c.id_curso = t.id_curso **LEFT JOIN** matricula m ON m.id_turma = t.id_turma **GROUP BY** t.codigo, c.nome; **GRANT SELECT ON vw_matriculas_por_turma TO grupo_consulta;**
**Critérios:** Nota cheia (0,4): visão com junção, contagem e GROUP BY + GRANT na visão. Metade (0,2): visão sem o GRANT, ou GRANT sem a visão, ou JOIN em vez de LEFT JOIN. Zero (0): GRANT nas tabelas.

### ITEM 07-c
**Resposta esperada:** Dá **ERROR: permission denied**, porque a coordenação tem permissão **só na visão**, não na tabela matricula. É desejado: ela vê o **total por turma** e **nenhum dado de aluno** (menor privilégio, confidencialidade).
**Critérios:** Nota cheia (0,4): permission denied + motivo + por que é bom. Metade (0,2): só o resultado ou só o motivo. Zero (0): "mostra as matrículas".

### ITEM 08-a
**Resposta esperada:** **\du** (lista os papéis, atributos como Cannot login e Superuser, e os grupos de que cada um é membro).
**Critérios:** Nota cheia (0,2): \du. Metade (0,1): aponta o pgAdmin (Login/Group Roles). Zero (0): \dt, \dp ou outro.

### ITEM 08-b
**Resposta esperada:** **\dp parcela** (r = SELECT, a = INSERT, w = UPDATE, d = DELETE; Column privileges para as colunas) e SELECT grantee, privilege_type FROM **information_schema.role_table_grants** WHERE table_name = 'parcela';
**Critérios:** Nota cheia (0,4): as duas formas. Metade (0,2): só uma. Zero (0): nenhuma.

### ITEM 08-c
**Resposta esperada:** **ALTER ROLE** funcionario **NOLOGIN**; (ou DROP ROLE) e **ALTER ROLE** estagiario **VALID UNTIL '2026-12-31'**; As permissões ficam no **grupo**: tirar o login ou a pessoa do grupo não muda as permissões dos colegas, e o novo funcionário só entra no grupo.
**Critérios:** Nota cheia (0,4): os dois comandos + explicação do grupo. Metade (0,2): só um comando com a explicação, ou os dois sem ela. Zero (0): apagar tabelas ou passar a senha ao colega.

### ITEM 09-a
**Resposta esperada:** É o registro de **quem fez o quê, quando e em qual dado** (para investigar e provar responsabilidade — não repúdio). Camadas: **log do servidor** (postgresql.conf: log_connections, log_disconnections, log_statement = 'mod') e **tabela de auditoria alimentada por trigger**.
**Critérios:** Nota cheia (0,2): conceito + as duas camadas. Metade (0,1): só o conceito. Zero (0): confunde com backup.

### ITEM 09-b
**Resposta esperada:** CREATE TABLE auditoria (id_auditoria bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, tabela text NOT NULL, operacao text NOT NULL, usuario text NOT NULL DEFAULT **session_user**, momento timestamptz NOT NULL DEFAULT **now()**, dados_antes **jsonb**, dados_depois **jsonb**); CREATE OR REPLACE FUNCTION registrar_auditoria() RETURNS trigger LANGUAGE plpgsql **SECURITY DEFINER** SET search_path = public AS $$ BEGIN INSERT INTO auditoria (tabela, operacao, dados_antes, dados_depois) VALUES (**TG_TABLE_NAME, TG_OP**, CASE WHEN TG_OP <> 'INSERT' THEN **to_jsonb(OLD)** END, CASE WHEN TG_OP <> 'DELETE' THEN **to_jsonb(NEW)** END); RETURN NULL; END; $$; CREATE TRIGGER trg_auditoria_parcela **AFTER INSERT OR UPDATE OR DELETE ON parcela FOR EACH ROW** EXECUTE FUNCTION registrar_auditoria();
**Critérios:** Nota cheia (0,4): tabela com usuário/momento + função com TG_TABLE_NAME, TG_OP, OLD/NEW + trigger AFTER FOR EACH ROW. Metade (0,2): falta uma das três peças, ou sem antes/depois. Zero (0): sem trigger ou sem relação.

### ITEM 09-c
**Resposta esperada:** **SECURITY DEFINER** faz a função rodar com o **poder do dono**: ela grava na auditoria mesmo que os usuários **não tenham permissão** nela, e eles **não conseguem apagar o próprio rastro**. Dentro dela o **current_user vira o dono** da função; o **session_user** continua sendo o **login que conectou** — por isso grava quem fez de verdade.
**Critérios:** Nota cheia (0,4): as duas explicações. Metade (0,2): só uma. Zero (0): invertido (current_user = login que conectou).

### ITEM 10-a
**Resposta esperada:** O back-end com **postgres** tem **poder total** e a senha no **JavaScript do site** fica visível para qualquer um. Correção: conectar com o login **app_escola** (só o que o back-end usa) e guardar a senha em **variável de ambiente**, nunca no Git nem no site.
**Critérios:** Nota cheia (0,2): os dois erros + correção. Metade (0,1): só um. Zero (0): nenhum.

### ITEM 10-b
**Resposta esperada:** **GRANT ALL** dá permissões demais (inclusive DELETE e TRUNCATE) e **WITH GRANT OPTION** deixa o financeiro **repassar** a permissão — fere o menor privilégio. Correção: REVOKE ALL ON parcela FROM grupo_financeiro; GRANT SELECT, UPDATE (data_pagamento) ON parcela TO grupo_financeiro;
**Critérios:** Nota cheia (0,4): os dois problemas + GRANT mínimo por coluna. Metade (0,2): só um problema, ou correção sem explicação. Zero (0): mantém o ALL.

### ITEM 10-c
**Resposta esperada:** Backup no **mesmo disco** se perde junto quando o disco queima, e backup **nunca restaurado** não é garantia — fere a **disponibilidade**. Correção: guardar o pg_dump **em outro lugar**, com **acesso restrito**, e fazer **teste de restauração** periódico.
**Critérios:** Nota cheia (0,4): os dois problemas + correção. Metade (0,2): só um. Zero (0): nenhum.
