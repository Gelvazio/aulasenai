# Padrão de Resposta — Atividade Prática — Aula 17 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: Procedimentos Armazenados.
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
**Resposta esperada:** É um conjunto de comandos SQL **guardado no banco**, com **nome e parâmetros**, que o sistema **chama** quando precisa.
**Critérios:** Nota cheia (0,2): guardado no banco + chamado pelo nome. Metade (0,1): só uma parte. Zero (0): sem relação.

### ITEM 01-b
**Resposta esperada:** Duas entre: a regra fica **num lugar só** e vale para **qualquer sistema** que usa o banco; **menos idas e voltas** pela rede (uma chamada no lugar de vários comandos); **segurança** (o usuário pode ter permissão só de chamar a rotina); o banco garante a regra mesmo com **acessos simultâneos**.
**Critérios:** Nota cheia (0,4): duas vantagens corretas. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 01-c
**Resposta esperada:** Exemplo: **formatar os valores em reais** ou a **mensagem/cor da tela**, ou enviar e-mail de boas-vindas. Fica no back-end porque é ligada à **apresentação/tela**, não protege a integridade dos **dados**.
**Critérios:** Nota cheia (0,4): exemplo adequado + justificativa. Metade (0,2): só o exemplo. Zero (0): exemplo de regra de dados (vaga, saldo).

### ITEM 02-a
**Resposta esperada:** A **função** devolve um valor (RETURNS) e é chamada com **SELECT**; o **procedimento** executa uma ação e é chamado com **CALL**.
**Critérios:** Nota cheia (0,2): retorno + forma de chamar. Metade (0,1): só um. Zero (0): invertido.

### ITEM 02-b
**Resposta esperada:** Cálculo do valor pago = **função**: SELECT valor_pago(10); Matrícula = **procedimento**: CALL matricular(3, 2);
**Critérios:** Nota cheia (0,4): tipos e chamadas corretos. Metade (0,2): tipos certos sem as chamadas, ou uma das duas. Zero (0): tipos trocados.

### ITEM 02-c
**Resposta esperada:** Dá **erro**: procedimento **não é chamado com SELECT**, e sim com **CALL** (o PostgreSQL avisa que é um procedimento).
**Critérios:** Nota cheia (0,4): erro + forma correta. Metade (0,2): só "dá erro". Zero (0): diz que funciona.

### ITEM 03-a
**Resposta esperada:** **DECLARE** cria as **variáveis locais**; **SELECT ... INTO** guarda o **resultado da consulta** dentro de uma variável.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.

### ITEM 03-b
**Resposta esperada:** CREATE OR REPLACE FUNCTION valor_pago(p_matricula integer) RETURNS numeric LANGUAGE plpgsql AS $$ DECLARE v_total numeric; BEGIN SELECT coalesce(sum(valor), 0) INTO v_total FROM parcela WHERE id_matricula = p_matricula AND data_pagamento IS NOT NULL; RETURN v_total; END; $$;
**Critérios:** Nota cheia (0,4): função correta (RETURNS, INTO, filtro de pagas, RETURN). Metade (0,2): falta o filtro de pagas, o INTO ou o RETURN. Zero (0): não é função ou não soma.

### ITEM 03-c
**Resposta esperada:** Sem parcela paga, sum devolve **NULL**; o **coalesce** troca por **0**. Chamada: SELECT valor_pago(10);
**Critérios:** Nota cheia (0,4): explicação + chamada. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 04-a
**Resposta esperada:** Porque matrículas **trancadas, concluídas ou canceladas não ocupam vaga**; só as **ativas** contam para o limite.
**Critérios:** Nota cheia (0,2): justificativa correta. Zero (0): sem relação.

### ITEM 04-b
**Resposta esperada:** CREATE OR REPLACE PROCEDURE matricular(p_aluno integer, p_turma integer) LANGUAGE plpgsql AS $$ DECLARE v_ativos integer; BEGIN SELECT count(*) INTO v_ativos FROM matricula WHERE id_turma = p_turma AND situacao = 'ativa'; IF v_ativos >= 25 THEN RAISE EXCEPTION 'Turma % sem vaga', p_turma; END IF; INSERT INTO matricula (id_aluno, id_turma) VALUES (p_aluno, p_turma); END; $$;
**Critérios:** Nota cheia (0,4): contagem das ativas + IF >= 25 com RAISE EXCEPTION + INSERT. Metade (0,2): falta o filtro de ativas, usa > 25 ou usa NOTICE. Zero (0): não confere a vaga.

### ITEM 04-c
**Resposta esperada:** O **RAISE EXCEPTION** interrompe o procedimento antes do INSERT e **desfaz** tudo o que a chamada tinha feito: **nenhuma matrícula é gravada** e o erro volta para quem chamou.
**Critérios:** Nota cheia (0,4): interrompe + nada gravado. Metade (0,2): só um. Zero (0): diz que a matrícula entra.

### ITEM 05-a
**Resposta esperada:** As duas chamadas **contam ao mesmo tempo** (cada uma vê 24 alunos), as duas acham que há vaga e as **duas inserem**.
**Critérios:** Nota cheia (0,2): contagem simultânea antes do INSERT. Zero (0): sem relação.

### ITEM 05-b
**Resposta esperada:** PERFORM 1 FROM turma WHERE id_turma = p_turma FOR UPDATE; IF NOT FOUND THEN RAISE EXCEPTION 'Turma % não existe', p_turma; END IF;
**Critérios:** Nota cheia (0,4): trava com FOR UPDATE + teste de turma inexistente. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 05-c
**Resposta esperada:** O **FOR UPDATE tranca a linha da turma** até o fim da transação: a **segunda chamada espera** a primeira terminar, depois conta e já encontra **25 alunos**, recebendo o erro de sem vaga.
**Critérios:** Nota cheia (0,4): espera + nova contagem com o aluno novo. Metade (0,2): só "trava a turma". Zero (0): sem relação.

### ITEM 06-a
**Resposta esperada:** **NOTICE** só **mostra uma mensagem** e o procedimento **continua**; **EXCEPTION** **para** a rotina e **desfaz** a operação.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): invertidos.

### ITEM 06-b
**Resposta esperada:** RAISE EXCEPTION 'Turma % sem vaga (% alunos ativos)', p_turma, v_ativos;
**Critérios:** Nota cheia (0,4): EXCEPTION com os dois marcadores %. Metade (0,2): EXCEPTION sem os valores. Zero (0): mantém NOTICE.

### ITEM 06-c
**Resposta esperada:** A chamada CALL matricular(...) **volta com erro** e o back-end recebe a **mensagem do RAISE EXCEPTION**, que pode mostrar ao usuário.
**Critérios:** Nota cheia (0,4): recebe o erro + mensagem. Metade (0,2): só "dá erro". Zero (0): sem relação.

### ITEM 07-a
**Resposta esperada:** **FOUND** fica verdadeira quando o último comando (UPDATE, INSERT, SELECT INTO, PERFORM) **achou ou alterou pelo menos uma linha**.
**Critérios:** Nota cheia (0,2): definição. Zero (0): sem relação.

### ITEM 07-b
**Resposta esperada:** CREATE OR REPLACE PROCEDURE registrar_pagamento(p_matricula integer, p_numero smallint) LANGUAGE plpgsql AS $$ BEGIN UPDATE parcela SET data_pagamento = current_date WHERE id_matricula = p_matricula AND numero = p_numero AND data_pagamento IS NULL; IF NOT FOUND THEN RAISE EXCEPTION 'Parcela %/% não encontrada ou já paga', p_matricula, p_numero; END IF; END; $$;
**Critérios:** Nota cheia (0,4): UPDATE com current_date + IF NOT FOUND com RAISE EXCEPTION. Metade (0,2): falta o teste do FOUND. Zero (0): não atualiza a parcela.

### ITEM 07-c
**Resposta esperada:** Para **não registrar de novo** o pagamento de parcela **já paga** (ela não é alterada e o FOUND fica falso, gerando o erro). Chamada: CALL registrar_pagamento(10, 2::smallint);
**Critérios:** Nota cheia (0,4): justificativa + chamada. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 08-a
**Resposta esperada:** **\df**
**Critérios:** Nota cheia (0,2): \df. Zero (0): outro comando.

### ITEM 08-b
**Resposta esperada:** Usar **CREATE OR REPLACE PROCEDURE matricular(...)** com o **mesmo nome e os mesmos parâmetros**, trocando 25 por **30** no IF; o corpo é substituído sem precisar de DROP.
**Critérios:** Nota cheia (0,4): CREATE OR REPLACE + mesmo nome/parâmetros. Metade (0,2): só "CREATE OR REPLACE". Zero (0): apaga e recria sem explicar, ou altera a tabela.

### ITEM 08-c
**Resposta esperada:** DROP FUNCTION total_alunos(integer); O tipo é informado porque **pode haver rotinas com o mesmo nome** e **parâmetros diferentes**; o tipo identifica qual remover.
**Critérios:** Nota cheia (0,4): comando + justificativa. Metade (0,2): só um. Zero (0): DROP TABLE ou DELETE.

### ITEM 09-a
**Resposta esperada:** Um **inteiro** (RETURNS integer ou bigint), porque a função devolve uma **quantidade**.
**Critérios:** Nota cheia (0,2): tipo inteiro. Zero (0): texto ou sem retorno.

### ITEM 09-b
**Resposta esperada:** CREATE OR REPLACE FUNCTION alunos_ativos(p_turma integer) RETURNS integer LANGUAGE plpgsql AS $$ DECLARE v_total integer; BEGIN SELECT count(*) INTO v_total FROM matricula WHERE id_turma = p_turma AND situacao = 'ativa'; RETURN v_total; END; $$;
**Critérios:** Nota cheia (0,4): função correta com filtro de ativas e RETURN. Metade (0,2): falta o filtro de ativas ou o RETURN. Zero (0): não é função.

### ITEM 09-c
**Resposta esperada:** Chamadas: **caso certo** (turma com vaga, CALL matricular(3, 2)), **turma cheia** (deve dar erro de sem vaga), **turma inexistente** (deve dar erro) e **matrícula repetida** (erro do UNIQUE). Justificativa: mostrar que a rotina **funciona no caso certo e barra cada caso inválido**.
**Critérios:** Nota cheia (0,4): caso certo + pelo menos dois casos de erro + justificativa. Metade (0,2): só o caso certo ou sem justificativa. Zero (0): nenhum teste.

### ITEM 10-a
**Resposta esperada:** Falta o **INTO**: o resultado não tem para onde ir e dá erro. Correção: SELECT count(*) INTO v_total FROM matricula WHERE id_turma = p_turma;
**Critérios:** Nota cheia (0,2): erro + correção. Metade (0,1): só um. Zero (0): nenhum.

### ITEM 10-b
**Resposta esperada:** O parâmetro tem o **mesmo nome da coluna**: o nome fica **ambíguo** (erro) ou a condição compara a coluna com ela mesma. Correção: renomear o parâmetro para **p_turma** e usar WHERE id_turma = p_turma.
**Critérios:** Nota cheia (0,4): ambiguidade + correção com prefixo. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 10-c
**Resposta esperada:** valor_pago é uma **função**: não se chama com **CALL**, e sim dentro de um **SELECT**. Correção: SELECT valor_pago(10);
**Critérios:** Nota cheia (0,4): erro + chamada correta. Metade (0,2): só um. Zero (0): nenhum.
