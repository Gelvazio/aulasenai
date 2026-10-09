-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'BANCO DE DADOS' and a.numero = 12
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 12 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 12', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 12 (10 questões discursivas)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADE-PRATICA-AULA-12.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Diga o que é SQL em uma frase.', 0.2, '**Linguagem padrão** para **definir e manipular dados** em bancos relacionais.', 'Nota cheia (0,2): linguagem + bancos relacionais. Metade (0,1): vago. Zero (0): confunde com SGBD.'),
      (v_atividade, 1, 2, 'Explique o que faz a DDL e cite seus três comandos principais.', 0.4, 'A DDL **cria e altera a estrutura** do banco (tabelas, colunas): **CREATE, ALTER e DROP**.', 'Nota cheia (0,4): função + três comandos. Metade (0,2): só um dos dois. Zero (0): cita comandos DML.'),
      (v_atividade, 1, 3, 'Explique o que faz a DML, cite seus quatro comandos e dê um exemplo de quando usá-la.', 0.4, 'A DML **mexe nos dados**: **INSERT, UPDATE, DELETE e SELECT**. Ex.: cadastrar um aluno (INSERT) ou listar as turmas com vaga (SELECT).', 'Nota cheia (0,4): função + quatro comandos + exemplo. Metade (0,2): parcial. Zero (0): cita comandos DDL.'),
      (v_atividade, 2, 1, 'Escreva o tipo de nome e de estoque.', 0.2, 'nome **varchar(120)**; estoque **integer**.', 'Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.'),
      (v_atividade, 2, 2, 'Escreva o tipo de preço e explique por que não usar um tipo de ponto flutuante.', 0.4, 'preço **numeric(10,2)**: ponto flutuante pode gerar **erros de arredondamento**; o numeric é **exato**.', 'Nota cheia (0,4): tipo + motivo. Metade (0,2): só um. Zero (0): float, text ou integer.'),
      (v_atividade, 2, 3, 'Escreva o tipo de ativo, de descrição e da data de lançamento.', 0.4, 'ativo **boolean**; descrição **text** (sem NOT NULL); data de lançamento **date**.', 'Nota cheia (0,4): os três. Metade (0,2): dois. Zero (0): um ou nenhum.'),
      (v_atividade, 3, 1, 'Diga o tipo correto para uf.', 0.2, '**char(2)** (ou varchar(2)).', 'Nota cheia (0,2): tamanho 2. Zero (0): varchar(255).'),
      (v_atividade, 3, 2, 'Explique o erro do cpf como integer e do telefone como numeric e indique o tipo correto.', 0.4, 'CPF e telefone **não são usados em contas** e começam com **zero** às vezes; como número, o **zero à esquerda se perde**. Tipo correto: **varchar(11)** só com dígitos.', 'Nota cheia (0,4): motivo + tipo. Metade (0,2): só um. Zero (0): mantém número.'),
      (v_atividade, 3, 3, 'Explique o tipo adequado para criado_em, se o sistema precisa da data e da hora com fuso.', 0.4, '**timestamptz** (data e hora com fuso), em geral com **DEFAULT now()**, porque date guarda só a data e perde a hora.', 'Nota cheia (0,4): tipo + motivo. Metade (0,2): tipo sem motivo. Zero (0): date ou texto.'),
      (v_atividade, 4, 1, 'Escreva a linha da coluna id_curso com identificador automático e chave primária.', 0.2, '**id_curso integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY**', 'Nota cheia (0,2): identidade + PK. Metade (0,1): falta uma das partes. Zero (0): sem identidade nem PK.'),
      (v_atividade, 4, 2, 'Escreva o comando CREATE TABLE completo da tabela curso.', 0.4, 'CREATE TABLE curso ( id_curso integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, nome varchar(100) NOT NULL, carga_horaria integer NOT NULL, valor_mensal numeric(10,2) NOT NULL, ativo boolean NOT NULL DEFAULT true );', 'Nota cheia (0,4): comando completo e funcional. Metade (0,2): estrutura certa com tipo ou restrição errados. Zero (0): comando que não cria a tabela.'),
      (v_atividade, 4, 3, 'Explique o papel de NOT NULL e de DEFAULT no comando.', 0.4, '**NOT NULL** torna o campo **obrigatório**; **DEFAULT true** preenche ativo com verdadeiro quando nada for informado.', 'Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 5, 1, 'Explique por que o CPF fica opcional na escola.', 0.2, 'Porque **algumas crianças podem não ter CPF**; obrigatório, o cadastro delas seria recusado.', 'Nota cheia (0,2): motivo. Zero (0): sem relação.'),
      (v_atividade, 5, 2, 'Escreva o comando CREATE TABLE completo da tabela aluno.', 0.4, 'CREATE TABLE aluno ( id_aluno integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, nome varchar(100) NOT NULL, cpf varchar(11), data_nascimento date NOT NULL, email varchar(120), criado_em timestamptz NOT NULL DEFAULT now() );', 'Nota cheia (0,4): comando completo e funcional com as obrigatoriedades certas. Metade (0,2): uma ou duas falhas. Zero (0): não cria a tabela.'),
      (v_atividade, 5, 3, 'Explique como a coluna de data e hora de cadastro é preenchida sozinha e qual tipo ela usa.', 0.4, 'Com **DEFAULT now()**, que grava a data e a hora do momento da inserção, no tipo **timestamptz**.', 'Nota cheia (0,4): DEFAULT now() + timestamptz. Metade (0,2): só um. Zero (0): preenchimento manual.'),
      (v_atividade, 6, 1, 'Escreva o comando do psql que lista as tabelas.', 0.2, '**\dt**', 'Nota cheia (0,2): \dt. Zero (0): outro.'),
      (v_atividade, 6, 2, 'Escreva o comando que mostra a estrutura da tabela aluno e explique o que ele exibe.', 0.4, '**\d aluno**: mostra as **colunas**, os **tipos**, se aceitam vazio, os **valores padrão** e as **restrições/índices** da tabela.', 'Nota cheia (0,4): comando + o que exibe. Metade (0,2): só um. Zero (0): comando errado.'),
      (v_atividade, 6, 3, 'Explique onde conferir as colunas da tabela no pgAdmin.', 0.4, 'No pgAdmin: **Schemas → public → Tables → aluno → Columns** (ou Properties da tabela).', 'Nota cheia (0,4): caminho correto. Metade (0,2): caminho incompleto. Zero (0): sem relação.'),
      (v_atividade, 7, 1, 'Escreva o comando que acrescenta a coluna celular.', 0.2, '**ALTER TABLE aluno ADD COLUMN celular varchar(11);**', 'Nota cheia (0,2): comando correto. Zero (0): comando errado.'),
      (v_atividade, 7, 2, 'Escreva os comandos que aumentam o e-mail e renomeiam o telefone.', 0.4, '**ALTER TABLE aluno ALTER COLUMN email TYPE varchar(150);** e **ALTER TABLE aluno RENAME COLUMN telefone TO telefone_fixo;**', 'Nota cheia (0,4): os dois. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 7, 3, 'Explique por que mudar o tipo de uma coluna pode falhar quando a tabela já tem dados.', 0.4, 'Porque os **dados atuais precisam caber ou ser convertidos** para o novo tipo; se algum valor não couber (ex.: texto maior que o novo limite, letras numa coluna que vira número), o comando **falha**.', 'Nota cheia (0,4): motivo com exemplo. Metade (0,2): motivo vago. Zero (0): sem relação.'),
      (v_atividade, 8, 1, 'Escreva o comando que torna o e-mail obrigatório.', 0.2, '**ALTER TABLE aluno ALTER COLUMN email SET NOT NULL;**', 'Nota cheia (0,2): comando correto. Zero (0): errado.'),
      (v_atividade, 8, 2, 'Explique a causa provável do erro.', 0.4, 'Já existem **alunos com e-mail vazio (NULL)**; o banco não aceita tornar obrigatório um campo que já tem vazios.', 'Nota cheia (0,4): causa correta. Metade (0,2): explicação vaga. Zero (0): sem relação.'),
      (v_atividade, 8, 3, 'Explique como resolver antes de executar o comando de novo.', 0.4, '**Preencher os e-mails vazios** antes (pedir os dados aos alunos ou, se combinado, usar um valor provisório com UPDATE) e só então executar o SET NOT NULL de novo.', 'Nota cheia (0,4): preencher antes + repetir o comando. Metade (0,2): só um. Zero (0): apagar os alunos.'),
      (v_atividade, 9, 1, 'Diga o que o comando DROP TABLE aluno faz.', 0.2, '**Apaga a tabela aluno e todos os dados** dela.', 'Nota cheia (0,2): tabela + dados. Metade (0,1): só "apaga a tabela". Zero (0): "apaga só os dados".'),
      (v_atividade, 9, 2, 'Explique os cuidados antes de um DROP TABLE em produção.', 0.4, 'Fazer **backup**, confirmar que é mesmo para apagar, verificar **dependências** (outras tabelas que apontam para aluno) e, de preferência, **não fazer em produção**; usar um banco de teste para "começar de novo".', 'Nota cheia (0,4): dois ou mais cuidados. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 9, 3, 'Explique para que serve IF EXISTS e em que tipo de script ele é útil.', 0.4, '**IF EXISTS** evita erro quando a tabela **não existe**; é útil em **scripts de teste** que recriam o banco do zero.', 'Nota cheia (0,4): função + uso. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 10, 1, 'Diga o que é um script DDL.', 0.2, 'Arquivo **.sql** com os **comandos de criação da estrutura**, em ordem e com comentários.', 'Nota cheia (0,2): definição. Zero (0): sem relação.'),
      (v_atividade, 10, 2, 'Explique em que ordem criar as tabelas e por quê, com um exemplo.', 0.4, 'Criar primeiro as tabelas **referenciadas** e depois as que **apontam** para elas. Ex.: **curso antes de turma** (turma tem id_curso); **aluno e turma antes de matricula**; **matricula antes de parcela**.', 'Nota cheia (0,4): regra + exemplo. Metade (0,2): só um. Zero (0): "qualquer ordem".'),
      (v_atividade, 10, 3, 'Escreva o comando que executa o script no banco escola_db e explique por que versionar o script no Git.', 0.4, '**psql -U postgres -d escola_db -f 01-ddl-escola.sql**. Versionar guarda o **histórico** das mudanças e permite **recriar o banco igual** em qualquer máquina da equipe.', 'Nota cheia (0,4): comando + motivo. Metade (0,2): só um. Zero (0): nenhum.');
end $$;
