-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'BANCO DE DADOS' and a.numero = 13
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 13 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 13', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 13 (10 questões discursivas)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADE-PRATICA-AULA-13.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Diga o que a chave primária garante.', 0.2, 'Que cada linha tenha um identificador **único** e **não nulo**.', 'Nota cheia (0,2): único + não nulo. Metade (0,1): só um. Zero (0): sem relação.'),
      (v_atividade, 1, 2, 'Escreva a coluna id_aluno com identificador automático e chave primária.', 0.4, '**id_aluno integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY**', 'Nota cheia (0,4): identidade + PK. Metade (0,2): só PK ou só identidade. Zero (0): errado.'),
      (v_atividade, 1, 3, 'Escreva a chave primária composta de parcela e explique por que ela é composta.', 0.4, '**PRIMARY KEY (id_matricula, numero)**. É composta porque parcela é **entidade fraca**: o número sozinho se repete em toda matrícula; só a **combinação** identifica a parcela.', 'Nota cheia (0,4): comando + motivo. Metade (0,2): só um. Zero (0): PK só no número.'),
      (v_atividade, 2, 1, 'Explique o que é integridade referencial.', 0.2, 'Garantia de que toda **chave estrangeira aponta para uma linha que existe** na tabela referenciada.', 'Nota cheia (0,2): definição. Zero (0): sem relação.'),
      (v_atividade, 2, 2, 'Escreva o CREATE TABLE da tabela turma com a chave estrangeira para curso.', 0.4, 'CREATE TABLE turma ( id_turma integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, codigo varchar(10) NOT NULL UNIQUE, turno varchar(5) NOT NULL CHECK (turno IN (''manha'', ''tarde'', ''noite'')), id_curso integer NOT NULL REFERENCES curso (id_curso) );', 'Nota cheia (0,4): comando funcional com FK, UNIQUE e NOT NULL (CHECK do turno opcional). Metade (0,2): FK correta com outras falhas. Zero (0): sem FK.'),
      (v_atividade, 2, 3, 'Explique o que acontece ao tentar gravar uma turma com um id_curso que não existe.', 0.4, 'O banco **recusa a gravação** com o erro **violates foreign key constraint**, porque o curso não existe.', 'Nota cheia (0,4): recusa + erro/motivo. Metade (0,2): só "dá erro". Zero (0): diz que grava.'),
      (v_atividade, 3, 1, 'Diga quais chaves estrangeiras a tabela precisa.', 0.2, '**id_aluno** (para aluno) e **id_turma** (para turma).', 'Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.'),
      (v_atividade, 3, 2, 'Escreva o CREATE TABLE completo da tabela matricula.', 0.4, 'CREATE TABLE matricula ( id_matricula integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, id_aluno integer NOT NULL REFERENCES aluno (id_aluno), id_turma integer NOT NULL REFERENCES turma (id_turma), data_matricula date NOT NULL DEFAULT current_date, situacao varchar(10) NOT NULL DEFAULT ''ativa'', UNIQUE (id_aluno, id_turma) ); (PK composta (id_aluno, id_turma) também é aceita.)', 'Nota cheia (0,4): duas FKs + defaults + unicidade da combinação. Metade (0,2): uma ou duas falhas. Zero (0): sem FKs.'),
      (v_atividade, 3, 3, 'Explique qual restrição impede a matrícula repetida e como ela funciona.', 0.4, '**UNIQUE (id_aluno, id_turma)** (ou PK composta): a **combinação** aluno + turma não pode se repetir; o mesmo aluno pode estar em outras turmas, mas não duas vezes na mesma.', 'Nota cheia (0,4): restrição + funcionamento. Metade (0,2): só a restrição. Zero (0): UNIQUE só em id_aluno.'),
      (v_atividade, 4, 1, 'Indique RESTRICT, CASCADE ou SET NULL para cada um dos três casos.', 0.2, '(1) **RESTRICT** (ou padrão); (2) **CASCADE**; (3) **SET NULL**.', 'Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.'),
      (v_atividade, 4, 2, 'Explique a escolha dos casos 1 e 2.', 0.4, '(1) curso com turmas não deve sumir por engano: **RESTRICT impede**. (2) parcelas são **entidade fraca** e não fazem sentido sem a matrícula: **CASCADE apaga junto**.', 'Nota cheia (0,4): as duas justificativas. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 4, 3, 'Explique a escolha do caso 3 e a condição que a coluna de chave estrangeira precisa ter.', 0.4, '**SET NULL** mantém os funcionários e apenas **esvazia o id_supervisor**; para isso a coluna precisa **aceitar vazio** (sem NOT NULL).', 'Nota cheia (0,4): justificativa + condição de aceitar NULL. Metade (0,2): só um. Zero (0): CASCADE.'),
      (v_atividade, 5, 1, 'Explique por que parcela pode usar CASCADE.', 0.2, 'Porque parcela é **entidade fraca**: não faz sentido existir **sem a matrícula**.', 'Nota cheia (0,2): motivo. Zero (0): sem relação.'),
      (v_atividade, 5, 2, 'Escreva o CREATE TABLE completo da tabela parcela.', 0.4, 'CREATE TABLE parcela ( id_matricula integer NOT NULL REFERENCES matricula (id_matricula) ON DELETE CASCADE, numero smallint NOT NULL, vencimento date NOT NULL, valor numeric(10,2) NOT NULL CHECK (valor > 0), data_pagamento date, PRIMARY KEY (id_matricula, numero) );', 'Nota cheia (0,4): FK com CASCADE, CHECK, PK composta e data opcional. Metade (0,2): uma ou duas falhas. Zero (0): sem FK.'),
      (v_atividade, 5, 3, 'Explique o cuidado necessário ao usar CASCADE.', 0.4, 'CASCADE pode **apagar muitos dados de uma vez** sem aviso; usar **só quando as filhas não fazem sentido sem o pai** e, em produção, apagar com cuidado (backup, conferência).', 'Nota cheia (0,4): risco + quando usar. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 6, 1, 'Diga qual restrição implementa a regra.', 0.2, '**UNIQUE.**', 'Nota cheia (0,2): UNIQUE. Zero (0): outra.'),
      (v_atividade, 6, 2, 'Escreva os comandos que acrescentam as restrições, com nome, na tabela existente.', 0.4, 'ALTER TABLE aluno ADD CONSTRAINT aluno_cpf_unico UNIQUE (cpf); ALTER TABLE aluno ADD CONSTRAINT aluno_email_unico UNIQUE (email);', 'Nota cheia (0,4): os dois comandos nomeados. Metade (0,2): um, ou os dois sem nome. Zero (0): nenhum.'),
      (v_atividade, 6, 3, 'Explique se dois alunos sem CPF podem ser cadastrados e por que o comando pode falhar se já houver CPFs repetidos.', 0.4, '**Sim**: vazios (NULL) **não contam** como repetidos. O comando **falha** se já houver **CPFs repetidos** na tabela; é preciso corrigi-los antes.', 'Nota cheia (0,4): as duas explicações. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 7, 1, 'Explique o que faz a restrição CHECK.', 0.2, 'Exige que **toda linha cumpra uma condição**.', 'Nota cheia (0,2): definição. Zero (0): sem relação.'),
      (v_atividade, 7, 2, 'Escreva as restrições CHECK do valor e do turno.', 0.4, '**CHECK (valor_mensal > 0)** e **CHECK (turno IN (''manha'', ''tarde'', ''noite''))**.', 'Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 7, 3, 'Escreva a restrição CHECK da situação e explique como ela implementa o domínio da aula 11.', 0.4, '**CHECK (situacao IN (''ativa'', ''trancada'', ''concluida'', ''cancelada''))**: o banco só aceita os valores da **lista fechada** (domínio), recusando grafias diferentes.', 'Nota cheia (0,4): comando + ligação com domínio. Metade (0,2): só um. Zero (0): nenhum.'),
      (v_atividade, 8, 1, 'Explique por que dar nome às restrições.', 0.2, 'Para que as **mensagens de erro** mostrem qual regra foi violada e para **alterar ou remover** a restrição depois com facilidade.', 'Nota cheia (0,2): um dos dois motivos bem explicado. Zero (0): sem relação.'),
      (v_atividade, 8, 2, 'Escreva o comando que acrescenta a chave estrangeira de aluno para responsavel.', 0.4, 'ALTER TABLE aluno ADD CONSTRAINT aluno_responsavel_fk FOREIGN KEY (id_responsavel) REFERENCES responsavel (id_responsavel);', 'Nota cheia (0,4): comando correto. Metade (0,2): sem nome ou com pequeno erro. Zero (0): errado.'),
      (v_atividade, 8, 3, 'Escreva o comando que remove a restrição aluno_email_unico e explique quando remover uma restrição é aceitável.', 0.4, '**ALTER TABLE aluno DROP CONSTRAINT aluno_email_unico;** Aceitável quando a **regra de negócio mudou** (com registro da decisão e aprovação do cliente), nunca só para "fazer passar" um dado errado.', 'Nota cheia (0,4): comando + condição. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 9, 1, 'Indique a restrição das regras 1 e 2.', 0.2, '(1) **chaves estrangeiras** para aluno e turma com **NOT NULL**; (2) **UNIQUE (cpf)**.', 'Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.'),
      (v_atividade, 9, 2, 'Explique por que a regra 3 não cabe num CHECK simples e como será garantida.', 0.4, 'Porque depende de **contar outras linhas** (as matrículas da turma), e o CHECK só olha a **linha atual**. Será garantida por **trigger** (aula 18) ou procedimento.', 'Nota cheia (0,4): motivo + trigger. Metade (0,2): só um. Zero (0): diz que CHECK resolve.'),
      (v_atividade, 9, 3, 'Explique por que garantir as regras no banco, e não só na tela do sistema.', 0.4, 'Porque o banco **protege os dados de qualquer origem** (outro sistema, comando direto, erro no front-end); a tela pode ser contornada, o banco não.', 'Nota cheia (0,4): proteção independente da tela. Metade (0,2): explicação vaga. Zero (0): sem relação.'),
      (v_atividade, 10, 1, 'Diga qual restrição barrou cada uma das três tentativas.', 0.2, '(1) **UNIQUE** aluno_cpf_unico; (2) **chave estrangeira** de turma; (3) **CHECK** do valor da parcela.', 'Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.'),
      (v_atividade, 10, 2, 'Explique o que o colega tentou fazer nos casos 1 e 2.', 0.4, '(1) gravar um **CPF que já existe**; (2) gravar uma turma com **id_curso que não existe** em curso.', 'Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 10, 3, 'Explique o caso 3 e como corrigir o comando do colega.', 0.4, 'O colega gravou uma parcela com **valor que não cumpre o CHECK** (zero ou negativo). Corrigir: informar um **valor maior que zero**.', 'Nota cheia (0,4): interpretação + correção. Metade (0,2): só um. Zero (0): sugere remover a restrição.');
end $$;
