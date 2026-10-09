-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'BANCO DE DADOS' and a.numero = 14
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 14 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 14', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 14 (10 questões discursivas)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADE-PRATICA-AULA-14.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Escreva o INSERT do curso Excel Básico informando as colunas.', 0.2, 'INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES (''Excel Básico'', 40, 180.00);', 'Nota cheia (0,2): comando correto com colunas. Metade (0,1): sem lista de colunas. Zero (0): não insere.'),
      (v_atividade, 1, 2, 'Escreva um único INSERT que cadastra Python Iniciante e Design Gráfico.', 0.4, 'INSERT INTO curso (nome, carga_horaria, valor_mensal) VALUES (''Python Iniciante'', 60, 250.00), (''Design Gráfico'', 48, 220.00);', 'Nota cheia (0,4): um comando com dois grupos de valores. Metade (0,2): dois comandos separados corretos. Zero (0): errado.'),
      (v_atividade, 1, 3, 'Explique por que o id_curso não é informado e por que listar as colunas.', 0.4, 'O id usa **identidade**: o banco **gera o número sozinho**. Listar as colunas deixa claro **qual valor vai em qual coluna** e mantém o comando certo se a tabela **ganhar colunas novas**.', 'Nota cheia (0,4): as duas explicações. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 2, 1, 'Explique como os textos, as datas e os números decimais são escritos no INSERT.', 0.2, 'Textos e datas entre **aspas simples** (''Bia Lima'', ''2009-05-10''); decimais com **ponto** (180.00); números sem aspas.', 'Nota cheia (0,2): aspas simples + ponto. Metade (0,1): um dos dois. Zero (0): nenhum.'),
      (v_atividade, 2, 2, 'Escreva o INSERT da aluna devolvendo o id gerado.', 0.4, 'INSERT INTO aluno (nome, cpf, data_nascimento) VALUES (''Bia Lima'', ''11122233344'', ''2009-05-10'') RETURNING id_aluno;', 'Nota cheia (0,4): INSERT correto com RETURNING. Metade (0,2): INSERT sem RETURNING. Zero (0): não insere.'),
      (v_atividade, 2, 3, 'Escreva o INSERT da matrícula dela na turma 3, explicando por que data_matricula e situacao podem ser omitidas.', 0.4, 'INSERT INTO matricula (id_aluno, id_turma) VALUES (<id devolvido>, 3); data_matricula e situacao têm **DEFAULT** (data de hoje e ''ativa'') e são preenchidas sozinhas.', 'Nota cheia (0,4): comando + motivo do DEFAULT. Metade (0,2): só um. Zero (0): nenhum.'),
      (v_atividade, 3, 1, 'Escreva a ordem correta de inserção das cinco tabelas.', 0.2, '**curso → turma → aluno → matricula → parcela** (aluno pode vir antes de curso/turma; o importante é cada pai antes do filho).', 'Nota cheia (0,2): ordem que respeita as FKs. Zero (0): ordem invertida.'),
      (v_atividade, 3, 2, 'Explique por que a ordem do colega gera erros e qual erro aparece.', 0.4, 'As **chaves estrangeiras** exigem que o "pai" exista antes: a parcela aponta para uma matrícula que ainda não existe. Aparece o erro **violates foreign key constraint**.', 'Nota cheia (0,4): motivo + erro. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 3, 3, 'Explique o que acontece ao inserir uma turma com um id_curso inexistente.', 0.4, 'O banco **recusa** a turma com erro de **chave estrangeira**; nada é gravado.', 'Nota cheia (0,4): recusa + motivo. Metade (0,2): "dá erro" sem explicar. Zero (0): diz que grava.'),
      (v_atividade, 4, 1, 'Escreva o UPDATE do valor do curso 1.', 0.2, 'UPDATE curso SET valor_mensal = 195.00 WHERE id_curso = 1;', 'Nota cheia (0,2): comando com WHERE. Zero (0): sem WHERE.'),
      (v_atividade, 4, 2, 'Escreva o UPDATE que tranca a matrícula do aluno 5 na turma 2.', 0.4, 'UPDATE matricula SET situacao = ''trancada'' WHERE id_aluno = 5 AND id_turma = 2;', 'Nota cheia (0,4): comando com as duas condições. Metade (0,2): uma condição só. Zero (0): sem WHERE.'),
      (v_atividade, 4, 3, 'Escreva o UPDATE da turma 4 alterando as duas colunas num só comando.', 0.4, 'UPDATE turma SET turno = ''noite'', sala = ''B2'' WHERE id_turma = 4;', 'Nota cheia (0,4): duas colunas separadas por vírgula + WHERE. Metade (0,2): com AND no SET ou dois comandos. Zero (0): sem WHERE.'),
      (v_atividade, 5, 1, 'Escreva o SELECT que mostra os cursos que serão reajustados.', 0.2, 'SELECT * FROM curso WHERE ativo = true;', 'Nota cheia (0,2): SELECT com o mesmo filtro. Zero (0): sem filtro.'),
      (v_atividade, 5, 2, 'Escreva o UPDATE do reajuste.', 0.4, 'UPDATE curso SET valor_mensal = valor_mensal * 1.10 WHERE ativo = true;', 'Nota cheia (0,4): cálculo + WHERE. Metade (0,2): cálculo errado com WHERE certo. Zero (0): sem WHERE.'),
      (v_atividade, 5, 3, 'Explique o que aconteceria se o WHERE fosse esquecido e como a conferência do número de linhas ajuda.', 0.4, 'Sem WHERE, **todos os cursos** (inclusive o desativado) seriam reajustados. Conferir o número de linhas (ex.: esperava "UPDATE 5" e veio "UPDATE 6") mostra o erro **antes do COMMIT**, permitindo o ROLLBACK.', 'Nota cheia (0,4): consequência + uso da contagem. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 6, 1, 'Escreva o DELETE da matrícula 12.', 0.2, 'DELETE FROM matricula WHERE id_matricula = 12;', 'Nota cheia (0,2): comando correto. Zero (0): sem WHERE.'),
      (v_atividade, 6, 2, 'Escreva o DELETE da turma T99 e explique o que acontece com as parcelas quando uma matrícula é apagada.', 0.4, 'DELETE FROM turma WHERE codigo = ''T99''; Ao apagar uma matrícula, as **parcelas dela são apagadas junto** (ON DELETE CASCADE).', 'Nota cheia (0,4): comando + CASCADE. Metade (0,2): só um. Zero (0): nenhum.'),
      (v_atividade, 6, 3, 'Explique o que acontece ao tentar apagar o curso Excel e por quê.', 0.4, 'O banco **recusa** a exclusão, porque o curso tem **turmas apontando para ele** e a chave usa **RESTRICT**/padrão.', 'Nota cheia (0,4): recusa + motivo. Metade (0,2): só um. Zero (0): diz que apaga tudo.'),
      (v_atividade, 7, 1, 'Explique o que é exclusão lógica.', 0.2, 'Marcar o registro como **inativo** (ex.: ativo = false) **sem apagar** a linha.', 'Nota cheia (0,2): definição. Zero (0): confunde com DELETE.'),
      (v_atividade, 7, 2, 'Escreva o comando que faz a exclusão lógica do curso Design Gráfico.', 0.4, 'UPDATE curso SET ativo = false WHERE nome = ''Design Gráfico''; (ou pelo id_curso).', 'Nota cheia (0,4): UPDATE com WHERE. Metade (0,2): sem WHERE preciso. Zero (0): DELETE.'),
      (v_atividade, 7, 3, 'Explique por que a exclusão lógica atende melhor à diretora que o DELETE.', 0.4, 'O curso **some da lista** (consultas filtram ativo = true), mas **turmas, matrículas e histórico continuam** gravados; o DELETE seria recusado ou apagaria dados.', 'Nota cheia (0,4): mantém histórico + sai da lista. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 8, 1, 'Diga o que cada um dos dois comandos fez.', 0.2, 'O primeiro **zerou o valor de todos os cursos**; o segundo **apagou todas as parcelas**.', 'Nota cheia (0,2): os dois. Metade (0,1): um. Zero (0): nenhum.'),
      (v_atividade, 8, 2, 'Explique os três passos da "rede de segurança" para evitar esse tipo de erro.', 0.4, '(1) escrever o **SELECT** com o mesmo WHERE; (2) executar dentro de uma **transação** e conferir o **número de linhas**; (3) **COMMIT** se estiver certo ou **ROLLBACK** se não.', 'Nota cheia (0,4): os três passos. Metade (0,2): dois. Zero (0): um ou nenhum.'),
      (v_atividade, 8, 3, 'Explique se é possível desfazer os comandos depois de confirmados e como recuperar os dados.', 0.4, 'Depois do COMMIT, **não dá para desfazer com ROLLBACK**; é preciso **restaurar o backup** (ou recriar os dados a partir de outra fonte).', 'Nota cheia (0,4): não desfaz + backup. Metade (0,2): só um. Zero (0): diz que o ROLLBACK resolve.'),
      (v_atividade, 9, 1, 'Diga o que fazem BEGIN, COMMIT e ROLLBACK.', 0.2, '**BEGIN** inicia a transação; **COMMIT** confirma; **ROLLBACK** desfaz as alterações desde o BEGIN.', 'Nota cheia (0,2): os três. Metade (0,1): dois. Zero (0): um ou nenhum.'),
      (v_atividade, 9, 2, 'Escreva a sequência de comandos (BEGIN, SELECT, UPDATE e COMMIT) para a correção.', 0.4, 'BEGIN; SELECT * FROM aluno WHERE id_aluno = 7; UPDATE aluno SET email = ''bia.nova@exemplo.com'' WHERE id_aluno = 7; COMMIT;', 'Nota cheia (0,4): sequência completa e correta. Metade (0,2): falta o SELECT ou o BEGIN. Zero (0): sem WHERE.'),
      (v_atividade, 9, 3, 'Explique em que situação você usaria ROLLBACK em vez de COMMIT, com um exemplo.', 0.4, 'Quando o resultado não é o esperado — ex.: o psql mostra **"UPDATE 3"** em vez de "UPDATE 1", sinal de que o WHERE pegou linhas demais; o ROLLBACK desfaz e o comando é corrigido.', 'Nota cheia (0,4): situação + exemplo. Metade (0,2): só a ideia. Zero (0): sem relação.'),
      (v_atividade, 10, 1, 'Diga que tipo de dado deve ser usado na carga de teste.', 0.2, '**Dados fictícios**, nunca dados reais de pessoas.', 'Nota cheia (0,2): fictícios. Zero (0): reais.'),
      (v_atividade, 10, 2, 'Explique a ordem dos INSERT no script e a quantidade sugerida de registros por tabela.', 0.4, 'Na ordem das chaves estrangeiras: **cursos → turmas → alunos → matrículas → parcelas**. Sugestão: **5 cursos, 8 turmas, 30 alunos, 40 matrículas** e as parcelas de cada matrícula.', 'Nota cheia (0,4): ordem + quantidades coerentes. Metade (0,2): só um. Zero (0): ordem errada.'),
      (v_atividade, 10, 3, 'Explique quando usar TRUNCATE para recomeçar a carga e o cuidado necessário.', 0.4, '**TRUNCATE** esvazia as tabelas de uma vez no **banco de teste** para recarregar do zero; cuidado: **nunca em produção** sem backup (e, com chaves estrangeiras, esvaziar as tabelas na ordem certa ou juntas).', 'Nota cheia (0,4): uso + cuidado. Metade (0,2): só um. Zero (0): sugere em produção.');
end $$;
