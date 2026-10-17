# Atividade: Avaliação Objetiva 02 — 50 Questões

- **Aula:** AV-02
- **Rótulo da aula:** Avaliação Objetiva 02
- **Tema:** Aulas 11 a 20
- **Ícone:** 📝
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar os conteúdos das aulas 11 a 20 de Banco de Dados (5 questões por aula), em situações de contexto → comando. Aplicada na aula 20.
- **Conteúdo-base:** ../CONTEUDO/AULA-11-*.md a ../CONTEUDO/AULA-20-*.md
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim

> Fonte única: o HTML `AVALIACAO-OBJETIVA-02.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py --so`. A linha **Gabarito** alimenta o gabarito do banco (seed) e não vai para a página.

---

## ITEM 01 — Padrão de Nomes da Biblioteca

- **Capacidade:** C3

**Comando:**  
A equipe que modela o banco de uma biblioteca escolar recebeu um rascunho do dicionário de dados com as colunas "DataEmprestimo", "Valor Multa" e "user" e precisa ajustá-las ao padrão de nomes adotado na UC (minúsculas, sem acento, palavras separadas por _, sem espaços nem palavras reservadas do SQL). Qual conjunto de nomes segue esse padrão?

**Alternativas:**
- A) data_emprestimo, valor_multa e usuario
- B) dt_emp, vlr_mlt e usr
- C) data_emprestimo, valorMulta e user
- D) DataEmprestimo, valor multa e user

**Gabarito:** A

---

## ITEM 02 — Telefone e CEP Padronizados

- **Capacidade:** C3

**Comando:**  
No cadastro de clientes de uma loja de informática, os telefones chegam como "(47) 99999-0000" e "4799999 0000" e os CEPs como "89.160-000" e "89160000", o que atrapalha buscas e comparações. Seguindo o padrão de tipos e formatos da UC, como esses dados devem ser guardados no banco?

**Alternativas:**
- A) Como integer, porque ocupa menos espaço e facilita as contas
- B) Como numeric(11,0), para manter o padrão dos valores numéricos
- C) Como texto exatamente do jeito que o usuário digitou na tela
- D) Como texto contendo só os dígitos, deixando a máscara para a tela

**Gabarito:** D

---

## ITEM 03 — Domínio do Status do Pedido

- **Capacidade:** C3

**Comando:**  
Ao conferir a tabela pedido de uma loja virtual, a equipe encontrou na coluna status_pedido os valores 'Pago', 'PAGO', 'pg' e 'pago' para a mesma situação. A equipe decidiu que os únicos valores válidos serão pendente, pago e cancelado. Qual recurso garante esse domínio no próprio banco?

**Alternativas:**
- A) NOT NULL na coluna status_pedido para impedir valores vazios
- B) UNIQUE (status_pedido) para impedir valores repetidos
- C) CHECK (status_pedido IN ('pendente', 'pago', 'cancelado'))
- D) DEFAULT 'pago' na coluna status_pedido para valores novos

**Gabarito:** C

---

## ITEM 04 — Atraso e Dependência no Cronograma

- **Capacidade:** C1, C3

**Comando:**  
No cronograma do projeto do banco de uma clínica, a etapa "Scripts DDL e DML" depende da etapa "Normalização e padrão", que terminou uma semana depois do previsto. O cronograma não tinha folga antes do marco "Banco criado". Qual é a consequência direta desse atraso no planejamento?

**Alternativas:**
- A) O marco "Banco criado" não muda, porque marcos não têm dependências
- B) Somente a documentação técnica atrasa, porque é a última etapa
- C) Os scripts começam uma semana depois e o marco atrasa, salvo replanejamento
- D) Os scripts podem começar no prazo, pois não dependem do modelo final

**Gabarito:** C

---

## ITEM 05 — Símbolos do Fluxo de Empréstimo

- **Capacidade:** C1

**Comando:**  
A equipe desenha o fluxograma do empréstimo de livros: depois de informar a matrícula do leitor, o sistema consulta a tabela de multas e pergunta "o leitor tem multa em aberto?", seguindo caminhos diferentes para sim e para não. Quais símbolos representam, respectivamente, a pergunta e a consulta à tabela de multas?

**Alternativas:**
- A) Retângulo para a pergunta e paralelogramo para a consulta ao banco
- B) Losango para a pergunta e cilindro para a consulta ao banco
- C) Paralelogramo para a pergunta e retângulo para a consulta ao banco
- D) Oval para a pergunta e losango para a consulta ao banco

**Gabarito:** B

---

## ITEM 06 — Tipo do Preço do Produto

- **Capacidade:** C7

**Comando:**  
O dicionário de dados de uma loja de informática diz que a coluna preco da tabela produto guarda valores em reais com centavos e é obrigatória. Ao escrever o CREATE TABLE produto no PostgreSQL, qual definição da coluna segue o dicionário e evita erros de arredondamento?

**Alternativas:**
- A) preco integer NOT NULL
- B) preco real NOT NULL
- C) preco varchar(10) NOT NULL
- D) preco numeric(10,2) NOT NULL

**Gabarito:** D

---

## ITEM 07 — Coluna Nova em Tabela Existente

- **Capacidade:** C7

**Comando:**  
A tabela cliente de uma loja já está em uso com 500 linhas, e o gerente pediu uma coluna data_cadastro que receba automaticamente a data do dia quando nada for informado. Qual comando DDL acrescenta essa coluna sem recriar a tabela?

**Alternativas:**
- A) ALTER TABLE cliente ADD COLUMN data_cadastro date DEFAULT current_date;
- B) UPDATE TABLE cliente ADD data_cadastro date DEFAULT current_date;
- C) ALTER TABLE cliente ALTER COLUMN data_cadastro date DEFAULT current_date;
- D) CREATE COLUMN data_cadastro ON cliente date DEFAULT current_date;

**Gabarito:** A

---

## ITEM 08 — Falha ao Tornar Obrigatório

- **Capacidade:** C7

**Comando:**  
Na escola de cursos livres, o técnico executou ALTER TABLE aluno ALTER COLUMN email SET NOT NULL; e o PostgreSQL recusou o comando, embora a coluna email exista e o nome esteja correto. Qual é a causa mais provável da falha?

**Alternativas:**
- A) Já existem alunos com o email vazio (NULL) na tabela
- B) SET NOT NULL só funciona em tabelas ainda sem linhas
- C) A coluna precisa ser UNIQUE antes de virar NOT NULL
- D) O tipo varchar não aceita a restrição NOT NULL

**Gabarito:** A

---

## ITEM 09 — Script de Teste que Roda de Novo

- **Capacidade:** C7

**Comando:**  
O script de teste 01-ddl-loja.sql roda bem na primeira vez, mas na segunda o psql mostra o erro "relation produto already exists". A equipe quer que o script de teste possa ser executado do zero sempre que necessário, sem nunca rodá-lo no banco de produção. Qual ajuste resolve?

**Alternativas:**
- A) Trocar o CREATE TABLE por TRUNCATE TABLE para reaproveitar a tabela existente
- B) Retirar os CREATE TABLE do script e criar as tabelas manualmente no pgAdmin
- C) Acrescentar DROP TABLE IF EXISTS antes de cada CREATE TABLE no script de teste
- D) Renomear as tabelas a cada execução para que os nomes nunca se repitam

**Gabarito:** C

---

## ITEM 10 — Separando DDL de DML

- **Capacidade:** C7

**Comando:**  
Ao organizar os scripts do sistema de uma clínica, a equipe precisa separar o arquivo de estrutura (DDL) do arquivo de dados (DML). O rascunho tem os comandos CREATE TABLE, INSERT, ALTER TABLE, UPDATE e DROP TABLE. Quais deles pertencem ao arquivo de DDL?

**Alternativas:**
- A) CREATE TABLE, ALTER TABLE e DROP TABLE
- B) CREATE TABLE, INSERT e UPDATE
- C) ALTER TABLE, UPDATE e INSERT
- D) INSERT, UPDATE e DROP TABLE

**Gabarito:** A

---

## ITEM 11 — Paciente com Consultas

- **Capacidade:** C7

**Comando:**  
No banco de uma clínica, a tabela consulta tem a coluna id_paciente ligada a paciente. A regra do cliente é que um paciente com consultas registradas nunca pode ser apagado, para não perder o histórico. Qual definição da chave estrangeira em consulta atende a essa regra?

**Alternativas:**
- A) id_paciente integer REFERENCES paciente (id_paciente) ON DELETE SET NULL
- B) id_paciente integer NOT NULL UNIQUE, sem referência à tabela paciente
- C) id_paciente integer NOT NULL REFERENCES paciente (id_paciente) ON DELETE CASCADE
- D) id_paciente integer NOT NULL REFERENCES paciente (id_paciente) ON DELETE RESTRICT

**Gabarito:** D

---

## ITEM 12 — Itens do Pedido

- **Capacidade:** C7

**Comando:**  
Na loja virtual, item_pedido é uma entidade fraca: cada item é identificado pelo pedido e pelo número do item, e não faz sentido sem o pedido. Ao apagar um pedido de teste, os itens dele devem sumir junto. Qual definição atende a esse modelo?

**Alternativas:**
- A) id_pedido integer sem REFERENCES e PRIMARY KEY (id_pedido, numero_item)
- B) id_pedido REFERENCES pedido (id_pedido) ON DELETE SET NULL e UNIQUE (numero_item)
- C) id_pedido REFERENCES pedido (id_pedido) ON DELETE RESTRICT e PRIMARY KEY (numero_item)
- D) id_pedido REFERENCES pedido (id_pedido) ON DELETE CASCADE e PRIMARY KEY (id_pedido, numero_item)

**Gabarito:** D

---

## ITEM 13 — Reserva Repetida

- **Capacidade:** C7

**Comando:**  
Na biblioteca, a tabela reserva liga leitor e livro. A regra é que um mesmo leitor não pode ter duas reservas do mesmo livro, mas pode reservar vários livros diferentes e um livro pode ser reservado por leitores diferentes. Qual restrição implementa exatamente essa regra?

**Alternativas:**
- A) PRIMARY KEY (id_livro)
- B) CHECK (id_leitor <> id_livro)
- C) UNIQUE (id_leitor)
- D) UNIQUE (id_leitor, id_livro)

**Gabarito:** D

---

## ITEM 14 — Lendo o Erro de CHECK

- **Capacidade:** C7

**Comando:**  
Durante a dinâmica de testes, uma dupla executou um INSERT na tabela turma e recebeu a mensagem "new row for relation turma violates check constraint turma_turno_check". A tabela tem turno varchar(5) NOT NULL CHECK (turno IN ('manha', 'tarde', 'noite')). O que essa mensagem indica?

**Alternativas:**
- A) O valor informado para turno está fora da lista permitida
- B) O curso informado na turma não existe na tabela curso
- C) O campo turno foi deixado vazio no INSERT
- D) Já existe outra turma cadastrada com o mesmo turno

**Gabarito:** A

---

## ITEM 15 — Restrição com Nome

- **Capacidade:** C7

**Comando:**  
No banco de recursos humanos de uma empresa, a tabela funcionario já existe e o RH pediu que o salário seja sempre maior que zero. A equipe quer que a restrição tenha um nome claro, para facilitar a leitura do erro e a remoção futura. Qual comando faz isso?

**Alternativas:**
- A) ALTER TABLE funcionario ADD CHECK CONSTRAINT funcionario_salario_positivo (salario > 0);
- B) ALTER TABLE funcionario ADD CONSTRAINT funcionario_salario_positivo CHECK (salario > 0);
- C) ALTER TABLE funcionario ALTER COLUMN salario SET CHECK funcionario_salario_positivo > 0;
- D) CREATE CONSTRAINT funcionario_salario_positivo ON funcionario CHECK (salario > 0);

**Gabarito:** B

---

## ITEM 16 — Ordem da Carga de Dados

- **Capacidade:** C8

**Comando:**  
A equipe da loja virtual vai montar o script de carga de dados de teste. A tabela pedido tem chave estrangeira para cliente, e item_pedido tem chaves estrangeiras para pedido e para produto. Em que ordem os INSERT devem ser executados para não violar as chaves estrangeiras?

**Alternativas:**
- A) Qualquer ordem, pois as chaves estrangeiras só valem no SELECT
- B) Primeiro item_pedido, depois pedido e por fim cliente e produto
- C) Primeiro pedido, depois cliente e item_pedido e por fim produto
- D) Primeiro cliente e produto, depois pedido e por fim item_pedido

**Gabarito:** D

---

## ITEM 17 — Id Devolvido ao Back-End

- **Capacidade:** C8

**Comando:**  
O back-end da loja cadastra um cliente e, logo em seguida, precisa do id_cliente gerado pelo banco para criar o primeiro pedido. A coluna id_cliente é GENERATED ALWAYS AS IDENTITY. Qual comando insere o cliente e já devolve o id gerado?

**Alternativas:**
- A) INSERT INTO cliente (nome, email) VALUES ('Rita Lima', 'rita@exemplo.com') RETURN id_cliente;
- B) INSERT INTO cliente (nome, email) OUTPUT id_cliente VALUES ('Rita Lima', 'rita@exemplo.com');
- C) INSERT INTO cliente (nome, email) VALUES ('Rita Lima', 'rita@exemplo.com') RETURNING id_cliente;
- D) INSERT INTO cliente (id_cliente, nome, email) VALUES (NULL, 'Rita Lima', 'rita@exemplo.com');

**Gabarito:** C

---

## ITEM 18 — Reajuste Desconfiado

- **Capacidade:** C8

**Comando:**  
Dentro de uma transação, o técnico executou BEGIN; e depois UPDATE produto SET preco = preco * 1.05 WHERE ativo = true; esperando reajustar 40 produtos ativos, mas o psql respondeu "UPDATE 48". A transação ainda não foi confirmada. Qual é a atitude correta?

**Alternativas:**
- A) Executar TRUNCATE na tabela produto e recarregar os dados de teste
- B) Executar ROLLBACK, conferir o WHERE com um SELECT e refazer o UPDATE
- C) Executar o mesmo UPDATE de novo para confirmar o número de linhas
- D) Executar COMMIT e corrigir os 8 produtos depois com outro UPDATE

**Gabarito:** B

---

## ITEM 19 — Médico Desligado

- **Capacidade:** C8

**Comando:**  
O médico de id 8 deixou a clínica, mas as consultas que ele atendeu precisam continuar no histórico e as telas devem deixar de oferecê-lo para novos agendamentos. A tabela medico tem a coluna ativo boolean. Qual comando aplica a exclusão lógica recomendada?

**Alternativas:**
- A) UPDATE medico SET ativo = false WHERE id_medico = 8;
- B) UPDATE medico SET ativo = false;
- C) TRUNCATE TABLE medico;
- D) DELETE FROM medico WHERE id_medico = 8;

**Gabarito:** A

---

## ITEM 20 — Trancar uma Matrícula

- **Capacidade:** C8

**Comando:**  
A secretaria da escola pediu para trancar somente a matrícula do aluno 12 na turma 4; esse aluno tem outras matrículas e a turma 4 tem outros alunos que devem continuar como estão. Qual comando faz exatamente isso?

**Alternativas:**
- A) UPDATE matricula WHERE id_aluno = 12 AND id_turma = 4 SET situacao = 'trancada';
- B) UPDATE matricula SET situacao = 'trancada', id_aluno = 12, id_turma = 4;
- C) UPDATE matricula SET situacao = 'trancada' WHERE id_aluno = 12 AND id_turma = 4;
- D) UPDATE matricula SET situacao = 'trancada' WHERE id_aluno = 12 OR id_turma = 4;

**Gabarito:** C

---

## ITEM 21 — Pedidos de Março

- **Capacidade:** C8

**Comando:**  
O gerente da loja quer todos os pedidos feitos em março de 2026, incluindo os dias 1º e 31. A coluna data_pedido é do tipo date. Qual filtro devolve exatamente esses pedidos?

**Alternativas:**
- A) WHERE data_pedido BETWEEN '2026-03-01' AND '2026-03-31'
- B) WHERE data_pedido IN ('2026-03-01', '2026-03-31')
- C) WHERE data_pedido BETWEEN '2026-03-31' AND '2026-03-01'
- D) WHERE data_pedido > '2026-03-01' AND data_pedido < '2026-03-31'

**Gabarito:** A

---

## ITEM 22 — Busca por Sobrenome

- **Capacidade:** C8

**Comando:**  
A atendente da clínica digita "souza" na busca e quer encontrar pacientes como "Ana Souza", "SOUZA Lima" e "Carlos de souza", ou seja, com o sobrenome em qualquer posição do nome e escrito com maiúsculas ou minúsculas. Qual filtro atende ao pedido no PostgreSQL?

**Alternativas:**
- A) WHERE nome LIKE 'souza'
- B) WHERE nome = '%souza%'
- C) WHERE nome ILIKE '%souza%'
- D) WHERE nome ILIKE 'souza%'

**Gabarito:** C

---

## ITEM 23 — Clientes sem Telefone

- **Capacidade:** C8

**Comando:**  
Um colega escreveu SELECT nome FROM cliente WHERE telefone = NULL; para listar os clientes sem telefone e a consulta não devolveu nenhuma linha, embora existam clientes com o telefone vazio. Qual filtro corrige a consulta?

**Alternativas:**
- A) WHERE telefone = 'NULL'
- B) WHERE telefone IS NULL
- C) WHERE telefone <> NULL
- D) WHERE NOT telefone = NULL

**Gabarito:** B

---

## ITEM 24 — Categoria e Preço

- **Capacidade:** C8

**Comando:**  
O gerente quer os produtos das categorias 1 ou 3 que custam até R$ 100,00. A consulta deve trazer só produtos que cumprem as duas exigências ao mesmo tempo: estar numa dessas categorias e ter preço até 100. Qual WHERE está correto?

**Alternativas:**
- A) WHERE preco <= 100 AND id_categoria = 1 AND id_categoria = 3
- B) WHERE preco <= 100 AND id_categoria = 1 OR id_categoria = 3
- C) WHERE preco <= 100 OR id_categoria IN (1, 3)
- D) WHERE preco <= 100 AND (id_categoria = 1 OR id_categoria = 3)

**Gabarito:** D

---

## ITEM 25 — Terceira Página da Lista

- **Capacidade:** C8

**Comando:**  
A tela de clientes do sistema mostra 20 nomes por página, em ordem alfabética. O back-end precisa montar a consulta da terceira página. Qual final de consulta devolve exatamente essa página?

**Alternativas:**
- A) ORDER BY nome LIMIT 40 OFFSET 20
- B) ORDER BY nome LIMIT 20 OFFSET 60
- C) ORDER BY nome LIMIT 20 OFFSET 40
- D) ORDER BY nome LIMIT 20 OFFSET 3

**Gabarito:** C

---

## ITEM 26 — Clientes que Nunca Compraram

- **Capacidade:** C8

**Comando:**  
O setor de marketing da loja quer a lista dos clientes que nunca fizeram nenhum pedido, para enviar um cupom de boas-vindas. A tabela pedido tem a coluna id_cliente ligada a cliente. Qual consulta devolve esses clientes?

**Alternativas:**
- A) SELECT c.nome FROM cliente c LEFT JOIN pedido p ON p.id_cliente = c.id_cliente WHERE p.id_pedido IS NOT NULL;
- B) SELECT c.nome FROM cliente c LEFT JOIN pedido p ON p.id_cliente = c.id_cliente WHERE p.id_pedido IS NULL;
- C) SELECT c.nome FROM cliente c INNER JOIN pedido p ON p.id_cliente = c.id_cliente WHERE p.id_pedido IS NULL;
- D) SELECT c.nome FROM cliente c LEFT JOIN pedido p ON p.id_cliente = c.id_cliente WHERE p.id_pedido = NULL;

**Gabarito:** B

---

## ITEM 27 — Erro de Agrupamento

- **Capacidade:** C8

**Comando:**  
Para o relatório da diretoria, a equipe escreveu SELECT c.nome, t.turno, count(*) FROM turma t JOIN curso c ON c.id_curso = t.id_curso GROUP BY c.nome; e o PostgreSQL respondeu "column t.turno must appear in the GROUP BY clause". O objetivo é contar as turmas de cada curso em cada turno. Qual correção resolve?

**Alternativas:**
- A) Trocar o JOIN por LEFT JOIN e manter o GROUP BY
- B) Trocar o agrupamento para GROUP BY c.nome, t.turno
- C) Trocar count(*) por count(t.turno) e manter o GROUP BY
- D) Mover a contagem para um WHERE count(*) > 0

**Gabarito:** B

---

## ITEM 28 — Categorias com Muitos Produtos

- **Capacidade:** C8

**Comando:**  
O gerente quer saber quais categorias têm mais de 10 produtos ativos. A tabela produto tem as colunas id_categoria e ativo. Qual consulta responde corretamente, filtrando as linhas antes de agrupar e os grupos depois de agrupar?

**Alternativas:**
- A) SELECT id_categoria, count(*) FROM produto GROUP BY id_categoria WHERE count(*) > 10 AND ativo = true;
- B) SELECT id_categoria, count(*) FROM produto HAVING ativo = true GROUP BY id_categoria;
- C) SELECT id_categoria, count(*) FROM produto WHERE ativo = true AND count(*) > 10 GROUP BY id_categoria;
- D) SELECT id_categoria, count(*) FROM produto WHERE ativo = true GROUP BY id_categoria HAVING count(*) > 10;

**Gabarito:** D

---

## ITEM 29 — Produtos Acima da Média

- **Capacidade:** C8

**Comando:**  
A loja quer destacar no site os produtos com preço acima da média de preço de todos os produtos cadastrados. Qual consulta usa corretamente uma subconsulta que devolve um único valor?

**Alternativas:**
- A) SELECT nome, preco FROM produto WHERE preco > (SELECT avg(preco) FROM produto);
- B) SELECT nome, preco FROM produto WHERE preco > (SELECT preco FROM produto);
- C) SELECT nome, preco FROM produto WHERE preco > avg(preco);
- D) SELECT nome, preco FROM produto HAVING preco > avg(preco) GROUP BY nome;

**Gabarito:** A

---

## ITEM 30 — Turma Vazia Contada como Um

- **Capacidade:** C8

**Comando:**  
O relatório SELECT t.codigo, count(*) FROM turma t LEFT JOIN matricula m ON m.id_turma = t.id_turma GROUP BY t.codigo; mostra 1 matrícula para a turma T07, que na verdade não tem nenhum aluno matriculado. Qual ajuste faz a turma T07 aparecer com zero?

**Alternativas:**
- A) Acrescentar HAVING count(*) > 0 ao final
- B) Trocar count(*) por sum(t.id_turma)
- C) Trocar count(*) por count(m.id_matricula)
- D) Trocar o LEFT JOIN por INNER JOIN

**Gabarito:** C

---

## ITEM 31 — Função do Total Gasto

- **Capacidade:** C8

**Comando:**  
O back-end da loja precisa mostrar, dentro de uma consulta, quanto um cliente já gastou, chamando algo como SELECT total_gasto(5);. A rotina deve calcular a soma dos pedidos e devolver esse valor. Qual forma de rotina do PostgreSQL atende a esse uso?

**Alternativas:**
- A) CREATE FUNCTION total_gasto(p_cliente integer) RETURNS numeric, chamada com SELECT
- B) CREATE PROCEDURE total_gasto(p_cliente integer) sem retorno, chamada com SELECT
- C) CREATE PROCEDURE total_gasto(p_cliente integer) RETURNS numeric, chamada com CALL
- D) CREATE TRIGGER total_gasto ligado à tabela pedido, chamado com SELECT

**Gabarito:** A

---

## ITEM 32 — Consulta sem Destino

- **Capacidade:** C8

**Comando:**  
Dentro de uma função PL/pgSQL que conta os empréstimos ativos de um leitor, o aluno escreveu SELECT count(*) FROM emprestimo WHERE id_leitor = p_leitor AND data_devolucao IS NULL; e, ao chamar a função, recebeu o erro "query has no destination for result data". Qual correção resolve?

**Alternativas:**
- A) Trocar o SELECT por CALL count(*) FROM emprestimo WHERE ...
- B) Usar SELECT count(*) INTO v_qtd FROM emprestimo WHERE ... e devolver v_qtd
- C) Acrescentar RAISE NOTICE antes do SELECT para guardar o resultado
- D) Trocar o parâmetro p_leitor pelo nome da coluna id_leitor

**Gabarito:** B

---

## ITEM 33 — Estoque que Ficou Negativo

- **Capacidade:** C8

**Comando:**  
O procedimento baixar_estoque da loja confere a quantidade disponível e, quando ela é insuficiente, executa RAISE NOTICE 'Estoque insuficiente'; mesmo assim, o UPDATE que diminui o estoque continua e o saldo fica negativo. Qual mudança faz o procedimento barrar a operação e desfazer o que já foi feito?

**Alternativas:**
- A) Acrescentar COMMIT logo depois do RAISE NOTICE
- B) Trocar RAISE NOTICE por RAISE EXCEPTION na verificação do estoque
- C) Trocar o UPDATE por um INSERT na tabela de estoque
- D) Trocar RAISE NOTICE por RETURN NULL na verificação do estoque

**Gabarito:** B

---

## ITEM 34 — IF NOT FOUND na Devolução

- **Capacidade:** C8

**Comando:**  
O procedimento registrar_devolucao da biblioteca executa UPDATE emprestimo SET data_devolucao = current_date WHERE id_emprestimo = p_emprestimo AND data_devolucao IS NULL; e, em seguida, IF NOT FOUND THEN RAISE EXCEPTION ...; END IF;. Em que situação a exceção é disparada?

**Alternativas:**
- A) Quando a devolução foi registrada com sucesso na data de hoje
- B) Sempre que o procedimento é chamado com CALL fora de uma transação
- C) Quando nenhuma linha foi alterada: empréstimo inexistente ou já devolvido
- D) Quando o UPDATE alterou mais de uma linha da tabela emprestimo

**Gabarito:** C

---

## ITEM 35 — Última Vaga Disputada

- **Capacidade:** C8

**Comando:**  
No dia de abertura de matrículas, duas atendentes chamam ao mesmo tempo CALL matricular(...) para a última vaga da mesma turma. O procedimento começa com PERFORM 1 FROM turma WHERE id_turma = p_turma FOR UPDATE; antes de contar os alunos ativos. Qual é o papel do FOR UPDATE nesse caso?

**Alternativas:**
- A) Travar a linha da turma, fazendo a segunda chamada esperar e contar a primeira matrícula
- B) Impedir que a turma seja consultada por SELECT até o fim do dia
- C) Repetir a matrícula para as duas atendentes e somar as duas no total
- D) Atualizar automaticamente a quantidade de vagas da turma na tabela turma

**Gabarito:** A

---

## ITEM 36 — E-mail Sempre em Minúsculas

- **Capacidade:** C8

**Comando:**  
A loja quer que o e-mail do cliente seja gravado sempre em minúsculas, venha o INSERT ou o UPDATE do site, do aplicativo ou do pgAdmin. A equipe vai usar um trigger que ajusta a própria linha antes de ela ser gravada. Qual combinação está correta?

**Alternativas:**
- A) BEFORE DELETE FOR EACH ROW, com OLD.email := lower(OLD.email); e RETURN OLD;
- B) BEFORE INSERT OR UPDATE FOR EACH STATEMENT, com NEW.email := lower(NEW.email);
- C) BEFORE INSERT OR UPDATE FOR EACH ROW, com NEW.email := lower(NEW.email); e RETURN NEW;
- D) AFTER INSERT OR UPDATE FOR EACH ROW, com NEW.email := lower(NEW.email); e RETURN NULL;

**Gabarito:** C

---

## ITEM 37 — UPDATE 0 Inesperado

- **Capacidade:** C8

**Comando:**  
Depois de criar um trigger BEFORE UPDATE FOR EACH ROW na tabela produto, toda alteração de preço passou a responder "UPDATE 0", sem nenhuma mensagem de erro, e os preços não mudam. Qual é a causa mais provável na função do trigger?

**Alternativas:**
- A) A função devolve NULL em vez de NEW, e a linha é pulada em silêncio
- B) A função devolve NEW, o que cancela a alteração da linha
- C) O trigger deveria ser FOR EACH STATEMENT para aceitar UPDATE
- D) A função usa OLD, que não existe em comandos UPDATE

**Gabarito:** A

---

## ITEM 38 — Histórico de Cada Preço

- **Capacidade:** C8

**Comando:**  
A loja quer guardar na tabela historico_preco uma linha para cada produto que tiver o preço alterado, com o valor antigo e o novo. Um único UPDATE de reajuste pode mudar 30 produtos de uma vez. Qual nível de trigger atende a esse pedido?

**Alternativas:**
- A) FOR EACH STATEMENT, que executa uma vez para cada linha alterada
- B) FOR EACH ROW, que executa uma vez só por comando UPDATE
- C) FOR EACH STATEMENT, que grava 30 linhas usando NEW e OLD
- D) FOR EACH ROW, que executa uma vez para cada linha alterada

**Gabarito:** D

---

## ITEM 39 — Histórico sem Mudança Real

- **Capacidade:** C8

**Comando:**  
O trigger AFTER UPDATE OF preco ON produto está gravando linhas no histórico mesmo quando o UPDATE repete o mesmo preço. Alguns produtos ainda estão com preço NULL. Qual cláusula no CREATE TRIGGER faz o histórico ser gravado só quando o valor muda de verdade, tratando o NULL corretamente?

**Alternativas:**
- A) WHEN (OLD.preco = NEW.preco)
- B) WHEN (OLD.preco <> NEW.preco OR NEW.preco = NULL)
- C) WHEN (NEW.preco IS NOT NULL)
- D) WHEN (OLD.preco IS DISTINCT FROM NEW.preco)

**Gabarito:** D

---

## ITEM 40 — Laço do Trigger

- **Capacidade:** C8

**Comando:**  
Para registrar a data da última alteração, a equipe criou um trigger AFTER UPDATE ON produto cuja função executa UPDATE produto SET atualizado_em = now() WHERE id_produto = NEW.id_produto;. Ao testar, o banco entrou em laço até dar erro de profundidade. Qual é a correção recomendada?

**Alternativas:**
- A) Usar FOR EACH STATEMENT e manter o UPDATE dentro da função
- B) Manter AFTER UPDATE e trocar o UPDATE da função por um DELETE
- C) Manter AFTER UPDATE e acrescentar RETURN NULL depois do UPDATE
- D) Usar BEFORE UPDATE e fazer NEW.atualizado_em := now(); com RETURN NEW;

**Gabarito:** D

---

## ITEM 41 — Servidor Fora do Ar

- **Capacidade:** C12

**Comando:**  
O servidor do banco de uma clínica ficou dois dias fora do ar depois que o disco queimou, e o backup, que nunca tinha sido testado, não pôde ser restaurado. Durante esse tempo nenhum atendimento conseguiu consultar os prontuários. Qual pilar da segurança da informação foi atingido principalmente?

**Alternativas:**
- A) Autenticidade, pois os usuários não conseguiram provar quem eram
- B) Disponibilidade, pois o dado não estava acessível quando foi preciso
- C) Confidencialidade, pois pessoas sem permissão viram os prontuários
- D) Integridade, pois os prontuários foram alterados sem autorização

**Gabarito:** B

---

## ITEM 42 — Atendente Altera Só o Telefone

- **Capacidade:** C13, C14

**Comando:**  
Na matriz de acesso da clínica, o grupo de atendimento pode consultar os pacientes, mas só pode alterar o telefone deles; CPF e data de nascimento ficam fora do alcance de alteração. Seguindo o menor privilégio, qual comando dá a permissão de alteração correta?

**Alternativas:**
- A) GRANT UPDATE (telefone) ON paciente TO grupo_atendimento;
- B) GRANT UPDATE ON paciente (telefone) TO grupo_atendimento;
- C) GRANT UPDATE ON paciente TO grupo_atendimento;
- D) GRANT ALL ON paciente TO grupo_atendimento;

**Gabarito:** A

---

## ITEM 43 — Funcionário Novo na Secretaria

- **Capacidade:** C13, C14

**Comando:**  
A escola contratou o atendente João para a secretaria. As permissões da secretaria já estão concedidas ao papel de grupo grupo_secretaria (NOLOGIN). Seguindo as boas práticas da aula, como o acesso de João deve ser criado?

**Alternativas:**
- A) Repassar a João a senha do login secretaria já usado pelos outros atendentes
- B) CREATE ROLE joao_secretaria LOGIN SUPERUSER PASSWORD 'troque-esta-senha';
- C) CREATE ROLE joao_secretaria LOGIN PASSWORD 'troque-esta-senha' IN ROLE grupo_secretaria;
- D) Repetir para joao_secretaria todos os GRANT já dados a grupo_secretaria

**Gabarito:** C

---

## ITEM 44 — Login que Enxerga Demais

- **Capacidade:** C14

**Comando:**  
Na escola, um login novo, criado para outro setor e sem nenhum GRANT, conseguiu conectar no banco escola_db e listar as tabelas do esquema public. A equipe percebeu que faltou um passo do script de segurança. Qual passo evita isso?

**Alternativas:**
- A) ALTER ROLE PUBLIC NOLOGIN; para que nenhum login novo consiga entrar no banco
- B) REVOKE ALL ON DATABASE escola_db FROM PUBLIC; e REVOKE ALL ON SCHEMA public FROM PUBLIC;
- C) DROP SCHEMA public; para que o login não encontre nenhuma tabela para listar
- D) GRANT CONNECT ON DATABASE escola_db TO PUBLIC; e GRANT USAGE ON SCHEMA public TO PUBLIC;

**Gabarito:** B

---

## ITEM 45 — Auditoria que Mostra o Dono

- **Capacidade:** C14

**Comando:**  
A função registrar_auditoria da escola é SECURITY DEFINER e grava o usuário com current_user. Ao conferir a tabela auditoria, a coordenação viu que todas as alterações aparecem com o nome do dono da função, e não com o login de quem alterou. Qual ajuste mostra o login que conectou?

**Alternativas:**
- A) Usar o login postgres para todos, para padronizar o usuário
- B) Retirar o SECURITY DEFINER e dar INSERT na auditoria a todos
- C) Gravar session_user, que continua sendo o login que conectou
- D) Gravar TG_TABLE_NAME, que identifica quem executou o comando

**Gabarito:** C

---

## ITEM 46 — Instalação pela Metade

- **Capacidade:** C7

**Comando:**  
O script mestre 00-instalar.sql chama os scripts 01 a 07 com \i. Na instalação num banco limpo, o script 03 deu erro, mas o psql continuou até o fim e o banco ficou incompleto sem que ninguém percebesse. Qual linha, no início do script mestre, faz a instalação parar no primeiro erro?

**Alternativas:**
- A) \i 01-ddl-escola.sql
- B) \set ON_ERROR_STOP on
- C) \set AUTOCOMMIT off
- D) \echo 'Parar no primeiro erro'

**Gabarito:** B

---

## ITEM 47 — Trigger antes da Função

- **Capacidade:** C8

**Comando:**  
Na revisão cruzada, o colega rodou o script mestre num banco limpo e a instalação parou no script 06-triggers.sql com o erro "function registrar_historico_nota() does not exist". A função só existia no banco de desenvolvimento da equipe. Qual é a correção adequada?

**Alternativas:**
- A) Criar a função à mão no banco do colega e manter o script como está
- B) Escrever o CREATE FUNCTION no 06-triggers.sql antes do CREATE TRIGGER
- C) Trocar o CREATE TRIGGER por CALL registrar_historico_nota() no script
- D) Mover o CREATE TRIGGER para o 01-ddl-escola.sql, antes das tabelas

**Gabarito:** B

---

## ITEM 48 — Tabela sem Requisito

- **Capacidade:** C1

**Comando:**  
Ao montar a tabela de rastreabilidade do projeto integrador, a equipe percebeu que a tabela cupom_desconto, criada no 01-ddl-escola.sql, não aponta para nenhum requisito do escopo aprovado com o cliente. Segundo a rastreabilidade da aula, como essa situação deve ser tratada?

**Alternativas:**
- A) Nada a fazer, pois tabelas extras não afetam a documentação
- B) A tabela falta: criar um requisito novo sem consultar o cliente
- C) Apagar o escopo e refazê-lo a partir das tabelas do script
- D) A tabela sobra: remover ou registrar uma mudança de escopo aceita pelo cliente

**Gabarito:** D

---

## ITEM 49 — Contrato da Matrícula

- **Capacidade:** C14

**Comando:**  
No contrato com o back-end, o login app_escola deve matricular alunos sempre respeitando o limite de vagas da turma e nunca apagar matrículas, que são canceladas. Qual comando está de acordo com esse contrato e com o menor privilégio?

**Alternativas:**
- A) GRANT ALL ON matricula TO app_escola;
- B) GRANT EXECUTE ON PROCEDURE matricular(integer, integer) TO app_escola;
- C) Usar o login postgres na aplicação para evitar erros de permissão
- D) GRANT INSERT, DELETE ON matricula TO app_escola;

**Gabarito:** B

---

## ITEM 50 — Nome do Curso Repetido na Turma

- **Capacidade:** C2, C3

**Comando:**  
No checklist do modelo, a equipe notou que a tabela turma tem as colunas id_curso e nome_curso; o nome do curso também está na tabela curso e já houve turmas com o nome desatualizado depois de uma troca de nome. Qual diagnóstico e correção estão de acordo com a revisão do modelo?

**Alternativas:**
- A) Fere a 3FN: retirar nome_curso de turma e obter o nome por JOIN com curso
- B) Fere a 2FN: transformar nome_curso na chave primária da tabela turma
- C) Fere a 1FN: dividir nome_curso em duas colunas na própria tabela turma
- D) Está correto: manter nome_curso em turma e atualizar à mão quando mudar

**Gabarito:** A
