# Padrão de Resposta — Atividade Prática — Aula 18 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Triggers (Disparadores).
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
**Resposta esperada:** É uma rotina que o banco **executa sozinho** quando acontece um **evento** (INSERT, UPDATE ou DELETE) numa **tabela**.
**Critérios:** Nota cheia (0,2): executa sozinho + evento na tabela. Metade (0,1): só uma parte. Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** O **procedimento** é **chamado pelo sistema** (CALL ou SELECT); o **trigger** é executado **pelo próprio banco** quando o evento acontece, **sem ninguém chamar**.
**Critérios:** Nota cheia (0,4): quem executa cada um. Metade (0,2): só um dos lados. Zero (0): invertido.

### ITEM 01-c
**Resposta esperada:** Porque o trigger dispara para **qualquer comando na tabela**, venha do site, do aplicativo ou do **pgAdmin**; o procedimento só vale se alguém **lembrar de chamá-lo**.
**Critérios:** Nota cheia (0,4): qualquer origem + comparação com o procedimento. Metade (0,2): só "vale para qualquer comando". Zero (0): sem relação.

### ITEM 02-a
**Resposta esperada:** **INSERT**, **UPDATE** e **DELETE**.
**Critérios:** Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum, ou cita SELECT.

### ITEM 02-b
**Resposta esperada:** **BEFORE** roda **antes** de gravar e pode **mudar ou barrar** a linha (ex.: validação da parcela paga, e-mail em minúsculas); **AFTER** roda **depois**, com a linha **já gravada** (ex.: **histórico** de nota).
**Critérios:** Nota cheia (0,4): diferença + um uso de cada. Metade (0,2): diferença sem usos, ou só um lado. Zero (0): invertido.

### ITEM 02-c
**Resposta esperada:** FOR EACH ROW dispara **30 vezes** (uma **por linha** afetada); FOR EACH STATEMENT dispara **1 vez** (uma **por comando**).
**Critérios:** Nota cheia (0,4): os dois números + explicação. Metade (0,2): só um número correto. Zero (0): números trocados.

### ITEM 03-a
**Resposta esperada:** Uma **função de trigger** (PL/pgSQL, RETURNS trigger) e o comando **CREATE TRIGGER**, que liga a função à tabela, ao evento e ao momento.
**Critérios:** Nota cheia (0,2): as duas peças. Metade (0,1): só uma. Zero (0): nenhuma.

### ITEM 03-b
**Resposta esperada:** CREATE OR REPLACE FUNCTION registrar_historico_nota() **RETURNS trigger** LANGUAGE plpgsql AS $$ ... $$; e, no trigger: **EXECUTE FUNCTION** registrar_historico_nota(); (nome da função pode ser outro; sem parâmetros).
**Critérios:** Nota cheia (0,4): RETURNS trigger sem parâmetros + EXECUTE FUNCTION. Metade (0,2): só um dos dois. Zero (0): RETURNS void, CALL ou função com parâmetros.

### ITEM 03-c
**Resposta esperada:** **NEW** = linha **nova** (existe em **INSERT e UPDATE**); **OLD** = linha **antiga** (existe em **UPDATE e DELETE**); **TG_OP** = nome da operação ('INSERT', 'UPDATE' ou 'DELETE').
**Critérios:** Nota cheia (0,4): as três variáveis + eventos de NEW e OLD. Metade (0,2): explica as variáveis sem os eventos, ou só duas delas. Zero (0): NEW e OLD trocados.

### ITEM 04-a
**Resposta esperada:** ALTER TABLE matricula ADD COLUMN nota_final **numeric(4,2)** CHECK (nota_final **BETWEEN 0 AND 10**);
**Critérios:** Nota cheia (0,2): ALTER TABLE ADD COLUMN numeric(4,2) com o CHECK. Metade (0,1): sem o CHECK ou com outro tipo numérico. Zero (0): CREATE TABLE ou tipo texto.

### ITEM 04-b
**Resposta esperada:** CREATE TABLE historico_nota (id_historico integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, id_matricula integer NOT NULL REFERENCES matricula (id_matricula), nota_anterior numeric(4,2), nota_nova numeric(4,2), alterado_por text NOT NULL **DEFAULT current_user**, alterado_em timestamptz NOT NULL **DEFAULT now()**);
**Critérios:** Nota cheia (0,4): chave primária, FK para matricula, as duas notas e usuário/data com DEFAULT. Metade (0,2): falta a FK ou os DEFAULT. Zero (0): sem as notas ou sem relação.

### ITEM 04-c
**Resposta esperada:** Para que o banco grave **sozinho quem** alterou (usuário do banco) e **quando** (data e hora), sem depender de quem escreve o INSERT — base da **auditoria**.
**Critérios:** Nota cheia (0,4): automático + quem e quando. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 05-a
**Resposta esperada:** **AFTER**, porque o histórico registra uma alteração **já gravada** (e não precisa mudar nem barrar a linha).
**Critérios:** Nota cheia (0,2): AFTER + motivo. Metade (0,1): só AFTER. Zero (0): BEFORE sem justificativa válida.

### ITEM 05-b
**Resposta esperada:** CREATE OR REPLACE FUNCTION registrar_historico_nota() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN INSERT INTO historico_nota (id_matricula, nota_anterior, nota_nova) VALUES (**NEW.id_matricula, OLD.nota_final, NEW.nota_final**); RETURN NEW; END; $$;
**Critérios:** Nota cheia (0,4): RETURNS trigger + INSERT com OLD e NEW certos + RETURN. Metade (0,2): OLD/NEW trocados ou falta o RETURN. Zero (0): não grava no histórico.

### ITEM 05-c
**Resposta esperada:** CREATE TRIGGER trg_historico_nota AFTER **UPDATE OF nota_final** ON matricula FOR EACH ROW **WHEN (OLD.nota_final IS DISTINCT FROM NEW.nota_final)** EXECUTE FUNCTION registrar_historico_nota(); — **IS DISTINCT FROM** trata o **NULL**: de NULL para 8,5 conta como mudança (com <> o resultado seria "desconhecido" e não gravaria).
**Critérios:** Nota cheia (0,4): trigger correto com UPDATE OF e WHEN + explicação do NULL. Metade (0,2): trigger sem o WHEN ou sem a explicação. Zero (0): sem trigger.

### ITEM 06-a
**Resposta esperada:** **BEFORE UPDATE** (pode incluir DELETE), **FOR EACH ROW**, porque precisa **barrar** antes de gravar.
**Critérios:** Nota cheia (0,2): BEFORE + UPDATE. Metade (0,1): só um. Zero (0): AFTER INSERT.

### ITEM 06-b
**Resposta esperada:** CREATE OR REPLACE FUNCTION proteger_parcela_paga() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF **OLD.data_pagamento IS NOT NULL** AND (**NEW.valor <> OLD.valor OR NEW.vencimento <> OLD.vencimento**) THEN **RAISE EXCEPTION** 'Parcela %/% já paga', OLD.id_matricula, OLD.numero; END IF; RETURN NEW; END; $$;
**Critérios:** Nota cheia (0,4): testa parcela paga + compara valor e vencimento OLD × NEW + RAISE EXCEPTION + RETURN NEW. Metade (0,2): falta uma das comparações, o RETURN NEW ou usa NOTICE. Zero (0): não confere se está paga.

### ITEM 06-c
**Resposta esperada:** CREATE TRIGGER trg_proteger_parcela_paga BEFORE UPDATE ON parcela FOR EACH ROW EXECUTE FUNCTION proteger_parcela_paga(); — o **RAISE EXCEPTION para** o comando e **desfaz** tudo: **nenhuma parcela é alterada** e o erro volta para quem executou o UPDATE.
**Critérios:** Nota cheia (0,4): trigger correto + para e desfaz. Metade (0,2): só um. Zero (0): diz que a alteração é gravada.

### ITEM 07-a
**Resposta esperada:** A **linha segue** e é gravada como está em **NEW** (inclusive com os ajustes feitos na função).
**Critérios:** Nota cheia (0,2): segue/grava NEW. Zero (0): diz que cancela.

### ITEM 07-b
**Resposta esperada:** CREATE OR REPLACE FUNCTION email_minusculo() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN **NEW.email := lower(NEW.email)**; **RETURN NEW**; END; $$; CREATE TRIGGER trg_email_minusculo **BEFORE INSERT OR UPDATE** ON aluno FOR EACH ROW EXECUTE FUNCTION email_minusculo();
**Critérios:** Nota cheia (0,4): altera NEW com lower + RETURN NEW + trigger BEFORE INSERT OR UPDATE. Metade (0,2): falta o RETURN NEW, usa AFTER ou faz UPDATE na tabela. Zero (0): sem relação.

### ITEM 07-c
**Resposta esperada:** A função do colega devolve **NULL** (ou não devolve NEW): num trigger BEFORE a linha é **pulada em silêncio**, nada é gravado e não aparece erro — por isso "UPDATE 0". Num trigger de **DELETE**, devolver **OLD** deixa a exclusão seguir.
**Critérios:** Nota cheia (0,4): explica o RETURN NULL + RETURN OLD no DELETE. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 08-a
**Resposta esperada:** **Restrição CHECK (valor > 0)**, porque a regra olha **só a própria linha** — é a primeira escolha, mais simples que um trigger.
**Critérios:** Nota cheia (0,2): CHECK + motivo. Metade (0,1): só CHECK. Zero (0): trigger ou procedimento.

### ITEM 08-b
**Resposta esperada:** Regra 2: **trigger** (AFTER UPDATE), porque compara **OLD × NEW** e grava em **outra tabela** (histórico) para qualquer comando. Regra 3: **procedimento** (CALL matricular), porque é uma **ação do negócio** que o sistema pede.
**Critérios:** Nota cheia (0,4): as duas escolhas com justificativa. Metade (0,2): uma certa, ou as duas sem justificativa. Zero (0): as duas trocadas.

### ITEM 08-c
**Resposta esperada:** O banco fica **"mágico"**: quem lê o comando **não vê o que mais acontece**, e erros ficam difíceis de achar. Para diminuir: **documentar** cada trigger (dicionário de dados e comentário no script) e usar trigger só quando restrição ou procedimento não resolvem.
**Critérios:** Nota cheia (0,4): risco + como diminuir. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 09-a
**Resposta esperada:** **\d parcela** no psql (os triggers aparecem no fim); no pgAdmin, Tables → parcela → Triggers.
**Critérios:** Nota cheia (0,2): \d parcela (ou caminho do pgAdmin). Zero (0): SELECT na tabela ou comando inexistente.

### ITEM 09-b
**Resposta esperada:** ALTER TABLE parcela **DISABLE TRIGGER** trg_proteger_parcela_paga; (correções) ALTER TABLE parcela **ENABLE TRIGGER** trg_proteger_parcela_paga; — Cuidado: enquanto está desligado, a **regra não vale**; usar só em **manutenção**, pelo menor tempo, e **religar** logo depois.
**Critérios:** Nota cheia (0,4): os dois comandos + cuidado. Metade (0,2): só os comandos ou só o cuidado. Zero (0): DROP no lugar de desligar.

### ITEM 09-c
**Resposta esperada:** **DROP TRIGGER trg_historico_nota ON matricula;** — a **função continua existindo**; para removê-la: DROP FUNCTION registrar_historico_nota();
**Critérios:** Nota cheia (0,4): DROP TRIGGER com ON tabela + função continua. Metade (0,2): falta o ON matricula ou a explicação da função. Zero (0): DROP TABLE.

### ITEM 10-a
**Resposta esperada:** Função de trigger deve ser **RETURNS trigger** (sem parâmetros); com RETURNS void o CREATE TRIGGER dá **erro**. Correção: trocar para RETURNS trigger e devolver NEW (ou OLD).
**Critérios:** Nota cheia (0,2): erro + correção. Metade (0,1): só um. Zero (0): nenhum.

### ITEM 10-b
**Resposta esperada:** O UPDATE dentro do trigger AFTER UPDATE na mesma tabela **dispara o trigger de novo**, em **laço**, até dar erro de profundidade. Correção: trigger **BEFORE** que altera **NEW** (NEW.nota_final := round(NEW.nota_final, 1); RETURN NEW;).
**Critérios:** Nota cheia (0,4): laço + correção com BEFORE e NEW. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 10-c
**Resposta esperada:** Sem WHEN e sem UPDATE OF, o trigger **grava histórico em todo UPDATE** da matrícula, **mesmo quando a nota não mudou**. Correção: AFTER **UPDATE OF nota_final** ... **WHEN (OLD.nota_final IS DISTINCT FROM NEW.nota_final)**.
**Critérios:** Nota cheia (0,4): problema + correção com WHEN (UPDATE OF opcional). Metade (0,2): só um. Zero (0): nenhum.
