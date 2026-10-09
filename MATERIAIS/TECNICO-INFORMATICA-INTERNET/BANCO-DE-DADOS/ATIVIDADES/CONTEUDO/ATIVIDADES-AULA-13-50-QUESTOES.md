# Atividade: DDL: Relações, Chaves e Restrições — 50 Questões

- **Aula:** 13
- **Tema:** DDL: Relações, Chaves e Restrições
- **Ícone:** 🔐
- **Duração:** 90–120 minutos
- **Formato:** Múltipla escolha (A, B, C, D)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos)
- **Capacidade avaliada:** Aplicar linguagem de definição de dados nas relações: chave primária simples e composta, chave estrangeira com REFERENCES e integridade referencial, ON DELETE (RESTRICT, CASCADE e SET NULL), UNIQUE, CHECK e domínios, ALTER TABLE ADD e DROP CONSTRAINT, restrições nomeadas, regras de negócio transformadas em restrições e leitura das mensagens de erro.
- **Conteúdo-base:** ../CONTEUDO/AULA-13-DDL-RELACOES-CHAVES-E-RESTRICOES.md
- **Slides:** ../AULAS/AULA-13-SLIDES.pdf
- **Folha de respostas:** sim

> Fonte única: o HTML `ATIVIDADES-AULA-13-50-QUESTOES.html` é gerado a partir deste arquivo por `assets/gerador-atividades/gerar_atividades.py`. A linha **Gabarito** alimenta o gabarito do banco (seed).

---

## ITEM 01 — Chave Primária

- **Capacidade:** C7

**Comando:**  
O que garante a chave primária (PRIMARY KEY)?

**Alternativas:**
- A) Que cada linha seja identificada por um valor único e não nulo.
- B) Que a tabela não tenha relações.
- C) Que os dados fiquem criptografados.
- D) Que a tabela tenha só uma coluna.

**Gabarito:** A

---

## ITEM 02 — Chave Primária Composta

- **Capacidade:** C7

**Comando:**  
Quando usar uma chave primária composta?

**Alternativas:**
- A) Só em tabelas sem dados.
- B) Sempre, em todas as tabelas.
- C) Nunca, ela é proibida.
- D) Quando a identificação precisa de mais de uma coluna, como matrícula e número da parcela.

**Gabarito:** D

---

## ITEM 03 — PK da Parcela

- **Capacidade:** C7

**Comando:**  
Qual é a chave primária da tabela parcela no exemplo da aula?

**Alternativas:**
- A) PRIMARY KEY (vencimento)
- B) PRIMARY KEY (id_matricula, numero)
- C) Nenhuma.
- D) PRIMARY KEY (valor)

**Gabarito:** B

---

## ITEM 04 — Chave Estrangeira

- **Capacidade:** C7

**Comando:**  
O que faz uma chave estrangeira (FOREIGN KEY)?

**Alternativas:**
- A) Gera números automáticos.
- B) Apaga dados repetidos.
- C) Torna o campo opcional.
- D) Garante que o valor exista na tabela referenciada, implementando o relacionamento.

**Gabarito:** D

---

## ITEM 05 — REFERENCES

- **Capacidade:** C7

**Comando:**  
O que significa id_curso integer NOT NULL REFERENCES curso (id_curso)?

**Alternativas:**
- A) Que id_curso pode ter qualquer valor.
- B) Que id_curso é chave estrangeira obrigatória que aponta para curso.
- C) Que id_curso é a chave primária de turma.
- D) Que curso será apagado.

**Gabarito:** B

---

## ITEM 06 — Integridade Referencial

- **Capacidade:** C7

**Comando:**  
O que é integridade referencial?

**Alternativas:**
- A) A garantia de que toda chave estrangeira aponta para uma linha que existe.
- B) A ordem alfabética das tabelas.
- C) O backup diário do banco.
- D) A garantia de que a senha é forte.

**Gabarito:** A

---

## ITEM 07 — Erro de Chave Estrangeira

- **Capacidade:** C7

**Comando:**  
Gravar uma turma com id_curso = 99, que não existe, gera qual erro?

**Alternativas:**
- A) duplicate key value.
- B) violates check constraint.
- C) connection refused.
- D) violates foreign key constraint.

**Gabarito:** D

---

## ITEM 08 — Associativa com Duas FKs

- **Capacidade:** C7

**Comando:**  
Na tabela matricula, quais chaves estrangeiras existem?

**Alternativas:**
- A) id_aluno, que aponta para aluno, e id_turma, que aponta para turma.
- B) Apenas data_matricula.
- C) Apenas id_matricula.
- D) Nenhuma chave estrangeira.

**Gabarito:** A

---

## ITEM 09 — UNIQUE na Matrícula

- **Capacidade:** C7

**Comando:**  
O que garante UNIQUE (id_aluno, id_turma) na tabela matricula?

**Alternativas:**
- A) Que o mesmo aluno não se matricule duas vezes na mesma turma.
- B) Que a data não se repita.
- C) Que cada turma tenha um aluno só.
- D) Que cada aluno tenha uma matrícula só na vida.

**Gabarito:** A

---

## ITEM 10 — ON DELETE Padrão

- **Capacidade:** C7

**Comando:**  
Sem nenhuma opção ON DELETE, o que acontece ao tentar apagar um curso que tem turmas?

**Alternativas:**
- A) O banco apaga só a primeira turma.
- B) As turmas ficam com id_curso vazio.
- C) O banco impede a exclusão, pois há linhas filhas apontando para ele.
- D) O curso e as turmas são apagados.

**Gabarito:** C

---

## ITEM 11 — RESTRICT

- **Capacidade:** C7

**Comando:**  
O que faz ON DELETE RESTRICT?

**Alternativas:**
- A) Deixa as filhas com chave vazia.
- B) Apaga as filhas junto.
- C) Impede apagar a linha pai se houver linhas filhas.
- D) Desliga a chave estrangeira.

**Gabarito:** C

---

## ITEM 12 — CASCADE

- **Capacidade:** C7

**Comando:**  
O que faz ON DELETE CASCADE?

**Alternativas:**
- A) Duplica as linhas filhas.
- B) Apaga também as linhas filhas quando a linha pai é apagada.
- C) Impede a exclusão.
- D) Deixa a chave das filhas vazia.

**Gabarito:** B

---

## ITEM 13 — SET NULL

- **Capacidade:** C7

**Comando:**  
O que faz ON DELETE SET NULL?

**Alternativas:**
- A) Impede a exclusão.
- B) Deixa vazia a chave estrangeira das linhas filhas quando o pai é apagado.
- C) Apaga as linhas filhas.
- D) Troca o pai por outro aleatório.

**Gabarito:** B

---

## ITEM 14 — CASCADE na Parcela

- **Capacidade:** C7

**Comando:**  
Por que usar ON DELETE CASCADE na chave de parcela para matricula?

**Alternativas:**
- A) Porque o CASCADE impede a exclusão.
- B) Porque parcelas devem sobrar sem dono.
- C) Porque matrícula é atributo de parcela.
- D) Porque parcela é entidade fraca e não faz sentido sem a matrícula.

**Gabarito:** D

---

## ITEM 15 — Curso com Turmas

- **Capacidade:** C7

**Comando:**  
A diretora não quer que um curso com turmas seja apagado por engano. Qual opção usar?

**Alternativas:**
- A) CASCADE.
- B) RESTRICT, ou o padrão sem ação.
- C) SET NULL.
- D) Nenhuma chave estrangeira.

**Gabarito:** B

---

## ITEM 16 — Supervisor que Saiu

- **Capacidade:** C7

**Comando:**  
Um supervisor deixa a empresa e os funcionários dele devem continuar cadastrados sem supervisor. Qual opção usar?

**Alternativas:**
- A) ON DELETE CASCADE.
- B) ON DELETE SET NULL na chave id_supervisor.
- C) RESTRICT obrigatório.
- D) Apagar todos os funcionários.

**Gabarito:** B

---

## ITEM 17 — Risco do CASCADE

- **Capacidade:** C7

**Comando:**  
Qual é o cuidado com o CASCADE?

**Alternativas:**
- A) Ele troca a senha do banco.
- B) Ele pode apagar muitos dados de uma vez, então só deve ser usado quando as filhas não fazem sentido sem o pai.
- C) Ele nunca apaga nada.
- D) Ele deixa o banco mais lento sempre.

**Gabarito:** B

---

## ITEM 18 — UNIQUE

- **Capacidade:** C7

**Comando:**  
O que faz a restrição UNIQUE na coluna cpf?

**Alternativas:**
- A) Gera CPFs automaticamente.
- B) Torna o CPF obrigatório.
- C) Impede que o mesmo CPF seja gravado em duas linhas.
- D) Criptografa o CPF.

**Gabarito:** C

---

## ITEM 19 — UNIQUE e Vazio

- **Capacidade:** C7

**Comando:**  
Com cpf varchar(11) UNIQUE, dois alunos sem CPF (NULL) podem ser cadastrados?

**Alternativas:**
- A) Só se forem irmãos.
- B) Sim, os vazios (NULL) não contam como valores repetidos.
- C) Não, o banco recusa o segundo.
- D) Só no Linux.

**Gabarito:** B

---

## ITEM 20 — CHECK

- **Capacidade:** C7

**Comando:**  
O que faz a restrição CHECK?

**Alternativas:**
- A) Exige que toda linha cumpra uma condição, como valor maior que zero.
- B) Confere a senha do usuário.
- C) Faz backup antes de gravar.
- D) Cria uma nova tabela.

**Gabarito:** A

---

## ITEM 21 — CHECK do Valor

- **Capacidade:** C7

**Comando:**  
Qual restrição garante que a mensalidade seja maior que zero?

**Alternativas:**
- A) CHECK (valor > 0)
- B) REFERENCES valor
- C) DEFAULT 0
- D) UNIQUE (valor)

**Gabarito:** A

---

## ITEM 22 — CHECK do Turno

- **Capacidade:** C7

**Comando:**  
Qual restrição implementa o domínio do turno?

**Alternativas:**
- A) PRIMARY KEY (turno)
- B) UNIQUE (turno)
- C) REFERENCES turno
- D) CHECK (turno IN ('manha', 'tarde', 'noite'))

**Gabarito:** D

---

## ITEM 23 — Erro de CHECK

- **Capacidade:** C7

**Comando:**  
Gravar o turno "madrugada" gera qual erro?

**Alternativas:**
- A) violates foreign key constraint.
- B) violates check constraint.
- C) relation already exists.
- D) duplicate key value.

**Gabarito:** B

---

## ITEM 24 — Erro de UNIQUE

- **Capacidade:** C7

**Comando:**  
Gravar um segundo aluno com o mesmo CPF gera qual erro?

**Alternativas:**
- A) violates check constraint.
- B) connection refused.
- C) duplicate key value violates unique constraint.
- D) syntax error at end of input.

**Gabarito:** C

---

## ITEM 25 — Erro de NOT NULL

- **Capacidade:** C7

**Comando:**  
A mensagem "null value in column nome violates not-null constraint" significa:

**Alternativas:**
- A) Que a tabela não existe.
- B) Que o nome é muito longo.
- C) Que o nome é repetido.
- D) Que o campo obrigatório nome ficou vazio.

**Gabarito:** D

---

## ITEM 26 — ADD CONSTRAINT UNIQUE

- **Capacidade:** C7

**Comando:**  
Qual comando acrescenta uma restrição UNIQUE nomeada no CPF de uma tabela existente?

**Alternativas:**
- A) CREATE UNIQUE aluno.cpf;
- B) UPDATE aluno SET cpf UNIQUE;
- C) INSERT CONSTRAINT INTO aluno;
- D) ALTER TABLE aluno ADD CONSTRAINT aluno_cpf_unico UNIQUE (cpf);

**Gabarito:** D

---

## ITEM 27 — ADD FOREIGN KEY

- **Capacidade:** C7

**Comando:**  
Qual comando acrescenta a chave estrangeira de aluno para responsavel?

**Alternativas:**
- A) ALTER TABLE aluno ADD CONSTRAINT aluno_responsavel_fk FOREIGN KEY (id_responsavel) REFERENCES responsavel (id_responsavel);
- B) CREATE FOREIGN aluno responsavel;
- C) SELECT FOREIGN KEY FROM aluno;
- D) ALTER TABLE responsavel DROP aluno;

**Gabarito:** A

---

## ITEM 28 — DROP CONSTRAINT

- **Capacidade:** C7

**Comando:**  
Qual comando remove a restrição aluno_cpf_unico?

**Alternativas:**
- A) DROP TABLE aluno_cpf_unico;
- B) UPDATE aluno DROP UNIQUE;
- C) ALTER TABLE aluno DROP CONSTRAINT aluno_cpf_unico;
- D) DELETE CONSTRAINT aluno_cpf_unico;

**Gabarito:** C

---

## ITEM 29 — Nomear Restrições

- **Capacidade:** C7

**Comando:**  
Por que dar nome às restrições?

**Alternativas:**
- A) Para esconder a restrição.
- B) Porque sem nome a restrição não funciona.
- C) Para deixar as mensagens de erro claras e facilitar alterar ou remover a restrição.
- D) Para aumentar o tamanho do banco.

**Gabarito:** C

---

## ITEM 30 — Regra: CPF

- **Capacidade:** C7

**Comando:**  
A regra de negócio "o CPF não se repete" vira qual restrição?

**Alternativas:**
- A) ON DELETE CASCADE.
- B) CHECK (cpf > 0).
- C) UNIQUE (cpf).
- D) DEFAULT now().

**Gabarito:** C

---

## ITEM 31 — Regra: Limite de Alunos

- **Capacidade:** C7

**Comando:**  
A regra "turma com no máximo 25 alunos" pode ser garantida com um CHECK simples?

**Alternativas:**
- A) Não, porque depende de contar outras linhas; ela será feita com trigger na aula 18.
- B) Sim, com CHECK (alunos <= 25) na matrícula.
- C) Sim, com UNIQUE na turma.
- D) Sim, com DEFAULT 25.

**Gabarito:** A

---

## ITEM 32 — FK Obrigatória

- **Capacidade:** C7

**Comando:**  
Por que a chave estrangeira id_curso em turma também tem NOT NULL?

**Alternativas:**
- A) Para permitir turmas sem curso.
- B) Porque toda turma precisa pertencer a um curso (participação obrigatória).
- C) Porque o curso não tem chave primária.
- D) Porque NOT NULL é exigido em toda chave estrangeira.

**Gabarito:** B

---

## ITEM 33 — FK Opcional

- **Capacidade:** C7

**Comando:**  
Quando uma chave estrangeira deve permitir vazio (sem NOT NULL)?

**Alternativas:**
- A) Sempre, em todas as chaves.
- B) Nunca.
- C) Quando a participação é opcional, como o funcionário que não tem supervisor.
- D) Só quando a tabela é pequena.

**Gabarito:** C

---

## ITEM 34 — Ordem de Criação

- **Capacidade:** C7

**Comando:**  
Por que a tabela curso precisa ser criada antes da tabela turma?

**Alternativas:**
- A) Porque o REFERENCES curso só funciona se a tabela curso já existir.
- B) Porque curso tem nome mais curto.
- C) A ordem não importa.
- D) Porque turma não tem colunas.

**Gabarito:** A

---

## ITEM 35 — Ordem de Exclusão

- **Capacidade:** C7

**Comando:**  
Num script que apaga as tabelas de teste, qual ordem evita erros de chave estrangeira?

**Alternativas:**
- A) Apagar primeiro as pais.
- B) A ordem não importa.
- C) Apagar primeiro as tabelas filhas, como parcela, e depois as pais, como matricula e curso.
- D) Apagar todas ao mesmo tempo sempre funciona.

**Gabarito:** C

---

## ITEM 36 — Código Único da Turma

- **Capacidade:** C7

**Comando:**  
Na tabela turma, o que garante codigo varchar(10) NOT NULL UNIQUE?

**Alternativas:**
- A) Que o código aponte para curso.
- B) Que toda turma tenha código e que ele não se repita.
- C) Que o código possa ficar vazio.
- D) Que o código seja gerado automaticamente.

**Gabarito:** B

---

## ITEM 37 — Escola: Apagar Curso

- **Capacidade:** C7

**Comando:**  
No exemplo da escola, o que aconteceu ao tentar apagar o curso Excel, que tem turmas?

**Alternativas:**
- A) O curso e as turmas foram apagados.
- B) Nada aconteceu e o curso sumiu.
- C) As turmas ficaram sem curso.
- D) O banco recusou, protegendo as turmas.

**Gabarito:** D

---

## ITEM 38 — Escola: Apagar Matrícula

- **Capacidade:** C7

**Comando:**  
No exemplo, o que aconteceu ao apagar uma matrícula de teste?

**Alternativas:**
- A) O aluno foi apagado junto.
- B) O banco recusou a exclusão.
- C) As parcelas ficaram órfãs.
- D) As parcelas dela foram apagadas junto, por causa do CASCADE.

**Gabarito:** D

---

## ITEM 39 — Dinâmica: Tentativa Proibida

- **Capacidade:** C7

**Comando:**  
Na dinâmica "Quebra-regra", o que a dupla anota a cada tentativa?

**Alternativas:**
- A) A nota da dupla vizinha.
- B) A senha do banco.
- C) A mensagem de erro e a restrição que barrou a tentativa.
- D) O tempo de execução apenas.

**Gabarito:** C

---

## ITEM 40 — Dinâmica: Tentativa que Passa

- **Capacidade:** C7

**Comando:**  
Na dinâmica, a dupla descobre que consegue gravar uma parcela com vencimento antes da matrícula. O que deve fazer?

**Alternativas:**
- A) Ignorar o problema.
- B) Propor uma restrição (como CHECK ou trigger) para barrar o caso.
- C) Apagar a tabela parcela.
- D) Desligar todas as restrições.

**Gabarito:** B

---

## ITEM 41 — Entrega da SA 2

- **Capacidade:** C7

**Comando:**  
O que é entregue nesta aula, na SA 2?

**Alternativas:**
- A) O script DDL atualizado com chaves primárias, estrangeiras com ON DELETE justificado, UNIQUE e CHECK, mais o registro das tentativas.
- B) O documento de escopo.
- C) Somente o DER.
- D) O cronograma.

**Gabarito:** A

---

## ITEM 42 — Restrição no Banco

- **Capacidade:** C7

**Comando:**  
Por que garantir as regras no banco, e não só na tela do sistema?

**Alternativas:**
- A) Porque a tela não pode validar nada.
- B) Porque o banco fica mais bonito.
- C) Porque o banco protege os dados mesmo que outro sistema ou um comando direto tente gravar algo errado.
- D) Porque as regras na tela são proibidas.

**Gabarito:** C

---

## ITEM 43 — PK e Identidade

- **Capacidade:** C7

**Comando:**  
Qual é a relação entre GENERATED ALWAYS AS IDENTITY e PRIMARY KEY no exemplo?

**Alternativas:**
- A) A identidade gera o número automaticamente e a PRIMARY KEY garante que ele seja único e não nulo.
- B) A identidade apaga a chave primária.
- C) São a mesma coisa.
- D) A PRIMARY KEY gera números aleatórios.

**Gabarito:** A

---

## ITEM 44 — FK e Índice

- **Capacidade:** C7

**Comando:**  
Por que é comum criar índice nas colunas de chave estrangeira?

**Alternativas:**
- A) Para acelerar as consultas que juntam as tabelas e as verificações de exclusão.
- B) Para criptografar os dados.
- C) Porque a chave estrangeira não funciona sem índice.
- D) Para impedir inserções.

**Gabarito:** A

---

## ITEM 45 — Chave Estrangeira e DER

- **Capacidade:** C7

**Comando:**  
De onde vêm as chaves estrangeiras do script?

**Alternativas:**
- A) Da lista de senhas.
- B) Da ordem alfabética das tabelas.
- C) Do arquivo pg_hba.conf.
- D) Dos relacionamentos do DER e dos atributos referenciais.

**Gabarito:** D

---

## ITEM 46 — CHECK com Datas

- **Capacidade:** C7

**Comando:**  
Qual restrição impede que a data de pagamento seja anterior ao vencimento menos 30 dias?

**Alternativas:**
- A) DEFAULT current_date
- B) REFERENCES vencimento
- C) UNIQUE (data_pagamento)
- D) CHECK (data_pagamento >= vencimento - 30)

**Gabarito:** D

---

## ITEM 47 — Mensagem Clara

- **Capacidade:** C7

**Comando:**  
Com a restrição nomeada aluno_cpf_unico, a mensagem de erro passa a:

**Alternativas:**
- A) Mostrar o nome da restrição, deixando claro qual regra foi violada.
- B) Esconder qualquer erro.
- C) Mostrar a senha do banco.
- D) Apagar o aluno repetido.

**Gabarito:** A

---

## ITEM 48 — Restrição Esquecida

- **Capacidade:** C7

**Comando:**  
O script não tem CHECK no valor da parcela, e alguém grava valor zero. O que isso mostra?

**Alternativas:**
- A) Que valor zero é sempre correto.
- B) Que a chave primária falhou.
- C) Que faltou transformar a regra de negócio em restrição.
- D) Que o banco está com defeito.

**Gabarito:** C

---

## ITEM 49 — Conferir com o DER

- **Capacidade:** C7

**Comando:**  
Por que conferir o script de restrições com o DER no fim da aula?

**Alternativas:**
- A) Para apagar o DER.
- B) Para garantir que todo relacionamento virou chave estrangeira com a cardinalidade certa.
- C) Para trocar as cores do DER.
- D) Para gerar o backup.

**Gabarito:** B

---

## ITEM 50 — Próxima Aula

- **Capacidade:** C7

**Comando:**  
O que será estudado na aula 14?

**Alternativas:**
- A) Levantamento de requisitos.
- B) Fluxograma.
- C) Instalação do PostgreSQL.
- D) DML: inserção, atualização e exclusão de dados.

**Gabarito:** D
