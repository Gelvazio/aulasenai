# Atividade: DML: Consultas com Filtros e Ordenação — 50 Questões

- **Aula:** 15
- **Tema:** DML: Consultas com Filtros e Ordenação
- **Ícone:** 🔍
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar linguagem de manipulação de dados nas consultas: SELECT e FROM, colunas, apelidos e expressões, WHERE com operadores de comparação, BETWEEN, IN, LIKE, ILIKE e IS NULL, AND, OR, NOT e parênteses, ORDER BY ASC e DESC, LIMIT e OFFSET, DISTINCT, funções de texto e data e erros comuns.
- **Conteúdo-base:** ../CONTEUDO/AULA-15-DML-CONSULTAS-COM-FILTROS-E-ORDENACAO.md
- **Slides:** ../AULAS/AULA-15-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-15-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — SELECT e FROM

- **Capacidade:** C8

**Comando:**  
Na consulta SELECT nome FROM curso;, o que indica o FROM?

**Alternativas:**
- A) A tabela de onde os dados são lidos.
- B) A condição de filtro.
- C) A coluna que será mostrada.
- D) A ordem do resultado.

**Gabarito:** A

---

## ITEM 02 — SELECT Asterisco

- **Capacidade:** C8

**Comando:**  
O que faz SELECT * FROM aluno;?

**Alternativas:**
- A) Mostra só a primeira coluna.
- B) Mostra todas as colunas de todas as linhas da tabela aluno.
- C) Conta quantos alunos existem.
- D) Apaga todos os alunos.

**Gabarito:** B

---

## ITEM 03 — Listar Colunas

- **Capacidade:** C8

**Comando:**  
Por que, no sistema, é melhor listar as colunas em vez de usar SELECT *?

**Alternativas:**
- A) Porque o asterisco altera os dados.
- B) Porque o SELECT * não funciona no PostgreSQL.
- C) Porque a consulta fica mais clara e traz só os dados necessários.
- D) Porque listar colunas apaga as outras.

**Gabarito:** C

---

## ITEM 04 — Ordem das Cláusulas

- **Capacidade:** C8

**Comando:**  
Qual é a ordem correta das cláusulas numa consulta?

**Alternativas:**
- A) SELECT, FROM, WHERE, ORDER BY, LIMIT.
- B) FROM, SELECT, LIMIT, WHERE.
- C) ORDER BY, WHERE, FROM, SELECT.
- D) WHERE, SELECT, FROM, ORDER BY.

**Gabarito:** A

---

## ITEM 05 — Apelido AS

- **Capacidade:** C8

**Comando:**  
O que faz valor_mensal * 12 AS valor_anual?

**Alternativas:**
- A) Calcula o valor anual e mostra a coluna com o nome valor_anual.
- B) Cria uma nova coluna na tabela.
- C) Apaga o valor mensal.
- D) Altera o valor guardado na tabela.

**Gabarito:** A

---

## ITEM 06 — Expressão Não Altera

- **Capacidade:** C8

**Comando:**  
Uma expressão calculada no SELECT altera os dados da tabela?

**Alternativas:**
- A) Sim, apaga o valor antigo.
- B) Sim, grava o novo valor.
- C) Não, ela só calcula o valor no resultado da consulta.
- D) Só se tiver AS.

**Gabarito:** C

---

## ITEM 07 — Igual a Texto

- **Capacidade:** C8

**Comando:**  
Qual WHERE traz as turmas do turno da noite?

**Alternativas:**
- A) WHERE turno = noite
- B) WHERE 'turno' = noite
- C) WHERE turno = 'noite'
- D) WHERE turno LIKE noite

**Gabarito:** C

---

## ITEM 08 — Diferente

- **Capacidade:** C8

**Comando:**  
Qual operador significa "diferente de"?

**Alternativas:**
- A) ==
- B) <>
- C) ><
- D) =<

**Gabarito:** B

---

## ITEM 09 — Maior ou Igual

- **Capacidade:** C8

**Comando:**  
Qual consulta traz os cursos com valor a partir de R$ 200?

**Alternativas:**
- A) SELECT nome FROM curso WHERE valor_mensal = '>200';
- B) SELECT nome FROM curso ORDER BY 200;
- C) SELECT nome FROM curso WHERE valor_mensal >= 200;
- D) SELECT nome FROM curso WHERE valor_mensal <= 200;

**Gabarito:** C

---

## ITEM 10 — BETWEEN

- **Capacidade:** C8

**Comando:**  
O que faz WHERE valor_mensal BETWEEN 200 AND 250?

**Alternativas:**
- A) Traz só os valores 200 e 250.
- B) Altera os valores para 200 e 250.
- C) Traz os valores entre 200 e 250, sem as pontas.
- D) Traz os valores de 200 a 250, incluindo as duas pontas.

**Gabarito:** D

---

## ITEM 11 — BETWEEN com Datas

- **Capacidade:** C8

**Comando:**  
Qual filtro traz as matrículas de fevereiro de 2026?

**Alternativas:**
- A) WHERE data_matricula = 'fevereiro'
- B) WHERE data_matricula LIKE 02
- C) WHERE data_matricula IN 2026
- D) WHERE data_matricula BETWEEN '2026-02-01' AND '2026-02-28'

**Gabarito:** D

---

## ITEM 12 — IN

- **Capacidade:** C8

**Comando:**  
O que faz WHERE situacao IN ('trancada', 'cancelada')?

**Alternativas:**
- A) Apaga as matrículas canceladas.
- B) Traz as linhas cuja situação é trancada ou cancelada.
- C) Altera a situação para trancada.
- D) Traz as linhas com as duas situações ao mesmo tempo.

**Gabarito:** B

---

## ITEM 13 — IN e OR

- **Capacidade:** C8

**Comando:**  
WHERE id_curso IN (1, 3) é equivalente a:

**Alternativas:**
- A) WHERE id_curso = 1 AND id_curso = 3
- B) WHERE id_curso BETWEEN 1 AND 3
- C) WHERE id_curso = 1 OR id_curso = 3
- D) WHERE id_curso <> 1

**Gabarito:** C

---

## ITEM 14 — LIKE com Porcentagem

- **Capacidade:** C8

**Comando:**  
O que faz WHERE nome LIKE 'Ana%'?

**Alternativas:**
- A) Traz os nomes que terminam com Ana.
- B) Traz somente o nome exato Ana.
- C) Traz os nomes que começam com Ana.
- D) Traz os nomes sem Ana.

**Gabarito:** C

---

## ITEM 15 — LIKE no Meio

- **Capacidade:** C8

**Comando:**  
Qual filtro traz os nomes que contêm Silva em qualquer posição?

**Alternativas:**
- A) WHERE nome IN ('Silva')
- B) WHERE nome LIKE '%Silva%'
- C) WHERE nome LIKE 'Silva'
- D) WHERE nome = '%Silva%'

**Gabarito:** B

---

## ITEM 16 — Sublinhado no LIKE

- **Capacidade:** C8

**Comando:**  
No LIKE, o que representa o caractere _ (sublinhado)?

**Alternativas:**
- A) Exatamente um caractere qualquer.
- B) Qualquer quantidade de caracteres.
- C) Um espaço obrigatório.
- D) O fim do texto.

**Gabarito:** A

---

## ITEM 17 — ILIKE

- **Capacidade:** C8

**Comando:**  
Qual é a diferença entre LIKE e ILIKE no PostgreSQL?

**Alternativas:**
- A) O ILIKE só funciona com números.
- B) Não há diferença.
- C) O ILIKE apaga as linhas encontradas.
- D) O ILIKE não diferencia maiúsculas de minúsculas.

**Gabarito:** D

---

## ITEM 18 — IS NULL

- **Capacidade:** C8

**Comando:**  
Qual filtro traz os alunos sem e-mail cadastrado?

**Alternativas:**
- A) WHERE email = NULL
- B) WHERE email IS NULL
- C) WHERE email LIKE NULL
- D) WHERE email = ''

**Gabarito:** B

---

## ITEM 19 — Por Que Não = NULL

- **Capacidade:** C8

**Comando:**  
Por que WHERE cpf = NULL não traz nenhuma linha?

**Alternativas:**
- A) Porque falta o ORDER BY.
- B) Porque NULL representa ausência de valor e não pode ser comparado com =; usa-se IS NULL.
- C) Porque o CPF nunca é vazio.
- D) Porque o PostgreSQL não guarda NULL.

**Gabarito:** B

---

## ITEM 20 — IS NOT NULL

- **Capacidade:** C8

**Comando:**  
Qual filtro traz os alunos que têm CPF cadastrado?

**Alternativas:**
- A) WHERE NOT cpf
- B) WHERE cpf IS NOT NULL
- C) WHERE cpf = NOT NULL
- D) WHERE cpf <> NULL

**Gabarito:** B

---

## ITEM 21 — AND

- **Capacidade:** C8

**Comando:**  
Em WHERE turno = 'noite' AND id_curso = 2, quais turmas aparecem?

**Alternativas:**
- A) Só as turmas do curso 1.
- B) Todas as turmas da noite e todas do curso 2.
- C) Nenhuma turma.
- D) As turmas da noite que são do curso 2.

**Gabarito:** D

---

## ITEM 22 — OR

- **Capacidade:** C8

**Comando:**  
Em WHERE turno = 'manha' OR turno = 'tarde', quais turmas aparecem?

**Alternativas:**
- A) Somente as turmas que são de manhã e de tarde ao mesmo tempo.
- B) Somente as turmas da noite.
- C) As turmas da manhã e as da tarde.
- D) Nenhuma turma.

**Gabarito:** C

---

## ITEM 23 — NOT

- **Capacidade:** C8

**Comando:**  
O que faz WHERE NOT situacao = 'ativa'?

**Alternativas:**
- A) Apaga as ativas.
- B) Dá erro sempre.
- C) Traz só as ativas.
- D) Traz as matrículas cuja situação não é ativa.

**Gabarito:** D

---

## ITEM 24 — Parênteses

- **Capacidade:** C8

**Comando:**  
Por que usar parênteses em WHERE turno = 'noite' AND (id_curso = 1 OR id_curso = 3)?

**Alternativas:**
- A) Porque o PostgreSQL exige parênteses em todo WHERE.
- B) Para deixar a consulta mais lenta.
- C) Porque, sem eles, o AND é avaliado antes do OR e o resultado muda.
- D) Os parênteses não fazem diferença.

**Gabarito:** C

---

## ITEM 25 — Erro sem Parênteses

- **Capacidade:** C8

**Comando:**  
Qual é o risco de misturar AND e OR sem parênteses?

**Alternativas:**
- A) O comando nunca executar.
- B) Receber um resultado errado sem nenhuma mensagem de erro.
- C) O banco apagar a tabela.
- D) O servidor parar.

**Gabarito:** B

---

## ITEM 26 — ORDER BY

- **Capacidade:** C8

**Comando:**  
O que faz ORDER BY nome?

**Alternativas:**
- A) Ordena o resultado pelo nome, em ordem crescente (A a Z).
- B) Agrupa os nomes repetidos.
- C) Altera os nomes na tabela.
- D) Filtra os nomes.

**Gabarito:** A

---

## ITEM 27 — DESC

- **Capacidade:** C8

**Comando:**  
Qual consulta lista os cursos do mais caro para o mais barato?

**Alternativas:**
- A) SELECT nome FROM curso WHERE DESC;
- B) SELECT nome FROM curso LIMIT DESC;
- C) SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal DESC;
- D) SELECT nome, valor_mensal FROM curso ORDER BY valor_mensal ASC;

**Gabarito:** C

---

## ITEM 28 — Desempate

- **Capacidade:** C8

**Comando:**  
Em ORDER BY valor_mensal DESC, nome ASC, para que serve nome ASC?

**Alternativas:**
- A) Para desempatar, em ordem alfabética, os cursos com o mesmo valor.
- B) Para inverter a ordem do valor.
- C) Para filtrar os nomes.
- D) Não tem efeito.

**Gabarito:** A

---

## ITEM 29 — LIMIT

- **Capacidade:** C8

**Comando:**  
O que faz LIMIT 3 no fim da consulta?

**Alternativas:**
- A) Apaga 3 linhas.
- B) Traz a terceira linha apenas.
- C) Traz no máximo as 3 primeiras linhas do resultado.
- D) Limita a 3 colunas.

**Gabarito:** C

---

## ITEM 30 — Os 5 Mais Caros

- **Capacidade:** C8

**Comando:**  
Qual consulta traz os 5 cursos mais caros?

**Alternativas:**
- A) SELECT 5 FROM curso;
- B) SELECT nome FROM curso WHERE valor_mensal = 5;
- C) SELECT nome FROM curso ORDER BY valor_mensal DESC LIMIT 5;
- D) SELECT nome FROM curso LIMIT 5 ORDER BY valor_mensal;

**Gabarito:** C

---

## ITEM 31 — OFFSET

- **Capacidade:** C8

**Comando:**  
Para mostrar a segunda página de alunos, de 10 em 10, em ordem alfabética, qual consulta usar?

**Alternativas:**
- A) SELECT nome FROM aluno WHERE pagina = 2;
- B) SELECT nome FROM aluno OFFSET 2 LIMIT 2;
- C) SELECT nome FROM aluno LIMIT 2;
- D) SELECT nome FROM aluno ORDER BY nome LIMIT 10 OFFSET 10;

**Gabarito:** D

---

## ITEM 32 — DISTINCT

- **Capacidade:** C8

**Comando:**  
O que faz SELECT DISTINCT turno FROM turma;?

**Alternativas:**
- A) Apaga turnos repetidos da tabela.
- B) Conta os turnos.
- C) Mostra cada turno uma única vez.
- D) Mostra todos os turnos repetidos.

**Gabarito:** C

---

## ITEM 33 — upper

- **Capacidade:** C8

**Comando:**  
O que faz a função upper(nome)?

**Alternativas:**
- A) Remove os espaços do nome.
- B) Altera o nome na tabela para maiúsculas.
- C) Conta as letras do nome.
- D) Mostra o nome em letras maiúsculas.

**Gabarito:** D

---

## ITEM 34 — length

- **Capacidade:** C8

**Comando:**  
O que devolve length(nome)?

**Alternativas:**
- A) A quantidade de caracteres do nome.
- B) O nome em minúsculas.
- C) A data de nascimento.
- D) O número de alunos.

**Gabarito:** A

---

## ITEM 35 — current_date

- **Capacidade:** C8

**Comando:**  
O que devolve current_date?

**Alternativas:**
- A) A data da última consulta.
- B) A data de hoje.
- C) A data de nascimento do aluno.
- D) A hora atual com fuso.

**Gabarito:** B

---

## ITEM 36 — age e extract

- **Capacidade:** C8

**Comando:**  
Para calcular a idade em anos a partir da data de nascimento, qual expressão é adequada?

**Alternativas:**
- A) data_nascimento - 'anos'
- B) extract(year FROM age(current_date, data_nascimento))
- C) length(data_nascimento)
- D) upper(data_nascimento)

**Gabarito:** B

---

## ITEM 37 — Aniversariantes

- **Capacidade:** C8

**Comando:**  
Qual filtro traz os aniversariantes de outubro?

**Alternativas:**
- A) WHERE extract(month FROM data_nascimento) = 10
- B) WHERE data_nascimento = 'outubro'
- C) WHERE month = 10
- D) WHERE data_nascimento LIKE '10'

**Gabarito:** A

---

## ITEM 38 — coalesce

- **Capacidade:** C8

**Comando:**  
O que faz coalesce(email, 'sem e-mail')?

**Alternativas:**
- A) Junta dois e-mails.
- B) Mostra 'sem e-mail' quando o e-mail está vazio (NULL).
- C) Cria um e-mail novo.
- D) Apaga os e-mails vazios.

**Gabarito:** B

---

## ITEM 39 — Texto sem Aspas

- **Capacidade:** C8

**Comando:**  
Qual é o erro de WHERE turno = noite?

**Alternativas:**
- A) O banco apaga a turma.
- B) Sem aspas, noite é lido como nome de coluna, e o banco acusa coluna inexistente.
- C) Nenhum, está correto.
- D) O turno vira número.

**Gabarito:** B

---

## ITEM 40 — LIKE sem Porcentagem

- **Capacidade:** C8

**Comando:**  
O que acontece com WHERE nome LIKE 'Silva', sem o %?

**Alternativas:**
- A) Procura somente o nome exatamente igual a Silva.
- B) Dá erro de sintaxe.
- C) Procura qualquer nome com Silva.
- D) Traz todos os nomes.

**Gabarito:** A

---

## ITEM 41 — Escola: Trancadas ou Canceladas

- **Capacidade:** C8

**Comando:**  
Qual consulta responde "matrículas trancadas ou canceladas, da mais antiga para a mais nova"?

**Alternativas:**
- A) SELECT id_aluno, id_turma, data_matricula, situacao FROM matricula WHERE situacao IN ('trancada', 'cancelada') ORDER BY data_matricula;
- B) SELECT situacao FROM matricula LIMIT 1;
- C) DELETE FROM matricula WHERE situacao IN ('trancada', 'cancelada');
- D) SELECT * FROM matricula WHERE situacao = 'ativa' ORDER BY data_matricula DESC;

**Gabarito:** A

---

## ITEM 42 — Escola: Sem E-mail

- **Capacidade:** C8

**Comando:**  
A secretaria quer completar o cadastro dos alunos sem e-mail. Qual filtro usar?

**Alternativas:**
- A) WHERE email = 'sem e-mail'
- B) WHERE email IS NULL
- C) WHERE email > 0
- D) WHERE email LIKE '%'

**Gabarito:** B

---

## ITEM 43 — Faixa de Preço

- **Capacidade:** C8

**Comando:**  
Qual consulta responde "cursos que custam entre R$ 200 e R$ 250"?

**Alternativas:**
- A) SELECT nome FROM curso ORDER BY 200, 250;
- B) SELECT nome FROM curso WHERE valor_mensal > 250;
- C) SELECT nome FROM curso WHERE valor_mensal IN (200, 250) ORDER BY nome LIMIT 2;
- D) SELECT nome FROM curso WHERE valor_mensal BETWEEN 200 AND 250;

**Gabarito:** D

---

## ITEM 44 — Turmas da Noite do Curso 2

- **Capacidade:** C8

**Comando:**  
Qual consulta responde "turmas da noite do curso 2"?

**Alternativas:**
- A) SELECT codigo FROM turma WHERE turno = 'noite' OR id_curso = 2;
- B) SELECT codigo FROM turma WHERE id_curso = 'noite';
- C) SELECT codigo FROM curso WHERE turno = 2;
- D) SELECT codigo FROM turma WHERE turno = 'noite' AND id_curso = 2;

**Gabarito:** D

---

## ITEM 45 — Nome com Silva sem Distinguir

- **Capacidade:** C8

**Comando:**  
Qual filtro encontra "Silva", "silva" e "SILVA" no nome?

**Alternativas:**
- A) WHERE nome = 'Silva'
- B) WHERE nome LIKE 'silva'
- C) WHERE upper(nome) = 'silva'
- D) WHERE nome ILIKE '%silva%'

**Gabarito:** D

---

## ITEM 46 — Dinâmica: Conferência

- **Capacidade:** C8

**Comando:**  
Na dinâmica "Pergunta do cliente", o que a dupla vizinha confere?

**Alternativas:**
- A) Se a consulta usa SELECT *.
- B) Se a consulta tem mais de dez linhas.
- C) A velocidade de digitação.
- D) Se o resultado da consulta responde de fato à pergunta.

**Gabarito:** D

---

## ITEM 47 — Entrega da SA 2

- **Capacidade:** C8

**Comando:**  
O que é entregue nesta aula, na SA 2?

**Alternativas:**
- A) O script com 15 consultas comentadas, cada uma com a pergunta do cliente que responde.
- B) O DER.
- C) A configuração do servidor.
- D) O script de criação das tabelas.

**Gabarito:** A

---

## ITEM 48 — Consulta Não Altera

- **Capacidade:** C8

**Comando:**  
O SELECT altera os dados das tabelas?

**Alternativas:**
- A) Não, ele só lê e mostra os dados.
- B) Só com WHERE.
- C) Só com ORDER BY.
- D) Sim, sempre.

**Gabarito:** A

---

## ITEM 49 — Número de Linhas

- **Capacidade:** C8

**Comando:**  
Uma consulta com WHERE que não encontra nenhuma linha:

**Alternativas:**
- A) Apaga a tabela.
- B) Dá erro de sintaxe.
- C) Devolve todas as linhas.
- D) Executa sem erro e devolve zero linhas.

**Gabarito:** D

---

## ITEM 50 — Próxima Aula

- **Capacidade:** C8

**Comando:**  
O que será estudado na aula 16?

**Alternativas:**
- A) Consultas com junções, agrupamentos e subconsultas.
- B) Normalização.
- C) Fluxograma.
- D) Instalação do PostgreSQL.

**Gabarito:** A
