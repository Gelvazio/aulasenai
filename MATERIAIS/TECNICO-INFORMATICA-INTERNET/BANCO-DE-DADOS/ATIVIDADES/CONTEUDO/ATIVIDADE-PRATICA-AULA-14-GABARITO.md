# Padrão de Resposta — Atividade Prática — Aula 14 — Banco de Dados (uso exclusivo do professor e da correção por IA)

> ⚠️ Arquivo com padrão de resposta: fica no Git, mas não vai para o site (`.vercelignore`). O conteúdo vai para a tabela
> `topico_discursivo` (leitura só do professor) pelo seed gerado. Tema da aula: DML: Inserção, Atualização e Exclusão.
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
**Resposta esperada:** INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES ('Excel Básico', 40, 180.00);
**Critérios:** Nota cheia (0,2): comando correto com colunas. Metade (0,1): sem lista de colunas. Zero (0): não insere.

### ITEM 01-b
**Resposta esperada:** INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES ('Python Iniciante', 60, 250.00), ('Design Gráfico', 48, 220.00);
**Critérios:** Nota cheia (0,4): um comando com dois grupos de valores. Metade (0,2): dois comandos separados corretos. Zero (0): errado.

### ITEM 01-c
**Resposta esperada:** O id usa **identidade**: o banco **gera o número sozinho**. Listar as colunas deixa claro **qual valor vai em qual coluna** e mantém o comando certo se a tabela **ganhar colunas novas**.
**Critérios:** Nota cheia (0,4): as duas explicações. Metade (0,2): uma. Zero (0): nenhuma.

### ITEM 02-a
**Resposta esperada:** Textos e datas entre **aspas simples** ('Bia Lima', '2009-05-10'); decimais com **ponto** (180.00); números sem aspas.
**Critérios:** Nota cheia (0,2): aspas simples + ponto. Metade (0,1): um dos dois. Zero (0): nenhum.

### ITEM 02-b
**Resposta esperada:** INSERT INTO aluno (nome, cpf, data_nascimento) VALUES ('Bia Lima', '11122233344', '2009-05-10') RETURNING id_aluno;
**Critérios:** Nota cheia (0,4): INSERT correto com RETURNING. Metade (0,2): INSERT sem RETURNING. Zero (0): não insere.

### ITEM 02-c
**Resposta esperada:** INSERT INTO matricula (id_aluno, id_turma) VALUES (<id devolvido>, 3); data_matricula e situacao têm **DEFAULT** (data de hoje e 'ativa') e são preenchidas sozinhas.
**Critérios:** Nota cheia (0,4): comando + motivo do DEFAULT. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 03-a
**Resposta esperada:** **curso → turma → aluno → matricula → parcela** (aluno pode vir antes de curso/turma; o importante é cada pai antes do filho).
**Critérios:** Nota cheia (0,2): ordem que respeita as FKs. Zero (0): ordem invertida.

### ITEM 03-b
**Resposta esperada:** As **chaves estrangeiras** exigem que o "pai" exista antes: a parcela aponta para uma matrícula que ainda não existe. Aparece o erro **violates foreign key constraint**.
**Critérios:** Nota cheia (0,4): motivo + erro. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 03-c
**Resposta esperada:** O banco **recusa** a turma com erro de **chave estrangeira**; nada é gravado.
**Critérios:** Nota cheia (0,4): recusa + motivo. Metade (0,2): "dá erro" sem explicar. Zero (0): diz que grava.

### ITEM 04-a
**Resposta esperada:** UPDATE curso SET valor_mensal = 195.00 WHERE id_curso = 1;
**Critérios:** Nota cheia (0,2): comando com WHERE. Zero (0): sem WHERE.

### ITEM 04-b
**Resposta esperada:** UPDATE matricula SET situacao = 'trancada' WHERE id_aluno = 5 AND id_turma = 2;
**Critérios:** Nota cheia (0,4): comando com as duas condições. Metade (0,2): uma condição só. Zero (0): sem WHERE.

### ITEM 04-c
**Resposta esperada:** UPDATE turma SET turno = 'noite', sala = 'B2' WHERE id_turma = 4;
**Critérios:** Nota cheia (0,4): duas colunas separadas por vírgula + WHERE. Metade (0,2): com AND no SET ou dois comandos. Zero (0): sem WHERE.

### ITEM 05-a
**Resposta esperada:** SELECT * FROM curso WHERE ativo = true;
**Critérios:** Nota cheia (0,2): SELECT com o mesmo filtro. Zero (0): sem filtro.

### ITEM 05-b
**Resposta esperada:** UPDATE curso SET valor_mensal = valor_mensal * 1.10 WHERE ativo = true;
**Critérios:** Nota cheia (0,4): cálculo + WHERE. Metade (0,2): cálculo errado com WHERE certo. Zero (0): sem WHERE.

### ITEM 05-c
**Resposta esperada:** Sem WHERE, **todos os cursos** (inclusive o desativado) seriam reajustados. Conferir o número de linhas (ex.: esperava "UPDATE 5" e veio "UPDATE 6") mostra o erro **antes do COMMIT**, permitindo o ROLLBACK.
**Critérios:** Nota cheia (0,4): consequência + uso da contagem. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 06-a
**Resposta esperada:** DELETE FROM matricula WHERE id_matricula = 12;
**Critérios:** Nota cheia (0,2): comando correto. Zero (0): sem WHERE.

### ITEM 06-b
**Resposta esperada:** DELETE FROM turma WHERE codigo = 'T99'; Ao apagar uma matrícula, as **parcelas dela são apagadas junto** (ON DELETE CASCADE).
**Critérios:** Nota cheia (0,4): comando + CASCADE. Metade (0,2): só um. Zero (0): nenhum.

### ITEM 06-c
**Resposta esperada:** O banco **recusa** a exclusão, porque o curso tem **turmas apontando para ele** e a chave usa **RESTRICT**/padrão.
**Critérios:** Nota cheia (0,4): recusa + motivo. Metade (0,2): só um. Zero (0): diz que apaga tudo.

### ITEM 07-a
**Resposta esperada:** Marcar o registro como **inativo** (ex.: ativo = false) **sem apagar** a linha.
**Critérios:** Nota cheia (0,2): definição. Zero (0): confunde com DELETE.

### ITEM 07-b
**Resposta esperada:** UPDATE curso SET ativo = false WHERE nome = 'Design Gráfico'; (ou pelo id_curso).
**Critérios:** Nota cheia (0,4): UPDATE com WHERE. Metade (0,2): sem WHERE preciso. Zero (0): DELETE.

### ITEM 07-c
**Resposta esperada:** O curso **some da lista** (consultas filtram ativo = true), mas **turmas, matrículas e histórico continuam** gravados; o DELETE seria recusado ou apagaria dados.
**Critérios:** Nota cheia (0,4): mantém histórico + sai da lista. Metade (0,2): só um. Zero (0): sem relação.

### ITEM 08-a
**Resposta esperada:** O primeiro **zerou o valor de todos os cursos**; o segundo **apagou todas as parcelas**.
**Critérios:** Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.

### ITEM 08-b
**Resposta esperada:** (1) escrever o **SELECT** com o mesmo WHERE; (2) executar dentro de uma **transação** e conferir o **número de linhas**; (3) **COMMIT** se estiver certo ou **ROLLBACK** se não.
**Critérios:** Nota cheia (0,4): os três passos. Metade (0,2): dois. Zero (0): um ou nenhum.

### ITEM 08-c
**Resposta esperada:** Depois do COMMIT, **não dá para desfazer com ROLLBACK**; é preciso **restaurar o backup** (ou recriar os dados a partir de outra fonte).
**Critérios:** Nota cheia (0,4): não desfaz + backup. Metade (0,2): só um. Zero (0): diz que o ROLLBACK resolve.

### ITEM 09-a
**Resposta esperada:** **BEGIN** inicia a transação; **COMMIT** confirma; **ROLLBACK** desfaz as alterações desde o BEGIN.
**Critérios:** Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.

### ITEM 09-b
**Resposta esperada:** BEGIN; SELECT * FROM aluno WHERE id_aluno = 7; UPDATE aluno SET email = 'bia.nova@exemplo.com' WHERE id_aluno = 7; COMMIT;
**Critérios:** Nota cheia (0,4): sequência completa e correta. Metade (0,2): falta o SELECT ou o BEGIN. Zero (0): sem WHERE.

### ITEM 09-c
**Resposta esperada:** Quando o resultado não é o esperado — ex.: o psql mostra **"UPDATE 3"** em vez de "UPDATE 1", sinal de que o WHERE pegou linhas demais; o ROLLBACK desfaz e o comando é corrigido.
**Critérios:** Nota cheia (0,4): situação + exemplo. Metade (0,2): só a ideia. Zero (0): sem relação.

### ITEM 10-a
**Resposta esperada:** **Dados fictícios**, nunca dados reais de pessoas.
**Critérios:** Nota cheia (0,2): fictícios. Zero (0): reais.

### ITEM 10-b
**Resposta esperada:** Na ordem das chaves estrangeiras: **cursos → turmas → alunos → matrículas → parcelas**. Sugestão: **5 cursos, 8 turmas, 30 alunos, 40 matrículas** e as parcelas de cada matrícula.
**Critérios:** Nota cheia (0,4): ordem + quantidades coerentes. Metade (0,2): só um. Zero (0): ordem errada.

### ITEM 10-c
**Resposta esperada:** **TRUNCATE** esvazia as tabelas de uma vez no **banco de teste** para recarregar do zero; cuidado: **nunca em produção** sem backup (e, com chaves estrangeiras, esvaziar as tabelas na ordem certa ou juntas).
**Critérios:** Nota cheia (0,4): uso + cuidado. Metade (0,2): só um. Zero (0): sugere em produção.
