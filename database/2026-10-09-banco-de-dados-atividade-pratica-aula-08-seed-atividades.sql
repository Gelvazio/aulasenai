-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'BANCO DE DADOS' and a.numero = 8
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 8 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 08', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 08 (10 questões discursivas)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADE-PRATICA-AULA-08.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Diga o que é um relacionamento e qual verbo pode nomear este.', 0.2, 'É a **associação entre entidades** que o sistema precisa registrar; verbo: **"faz"** (ou "realiza").', 'Nota cheia (0,2): definição + verbo. Metade (0,1): só um. Zero (0): sem relação.'),
      (v_atividade, 1, 2, 'Faça as duas perguntas da cardinalidade máxima para CLIENTE e PEDIDO e responda cada uma.', 0.4, '"Um cliente faz **quantos** pedidos no máximo?" → **vários (N)**. "Um pedido é feito por **quantos** clientes no máximo?" → **um (1)**.', 'Nota cheia (0,4): as duas perguntas com respostas certas. Metade (0,2): uma pergunta certa. Zero (0): nenhuma.'),
      (v_atividade, 1, 3, 'Diga a cardinalidade correta e explique o erro do colega.', 0.4, '**1:N** (um cliente, vários pedidos). O colega leu como se cada cliente fizesse **um só** pedido; não analisou que o mesmo cliente volta a comprar.', 'Nota cheia (0,4): 1:N + explicação do erro. Metade (0,2): só a cardinalidade. Zero (0): mantém 1:1.'),
      (v_atividade, 2, 1, 'Diga a cardinalidade entre FUNCIONÁRIO e CRACHÁ.', 0.2, '**1:1.**', 'Nota cheia (0,2): 1:1. Zero (0): outra.'),
      (v_atividade, 2, 2, 'Explique o que caracteriza um relacionamento 1:1 usando o exemplo.', 0.4, 'Cada ocorrência de um lado se liga a **no máximo uma** do outro: **um funcionário tem um crachá** e **um crachá é de um funcionário**.', 'Nota cheia (0,4): definição aplicada aos dois sentidos. Metade (0,2): só um sentido. Zero (0): definição de 1:N.'),
      (v_atividade, 2, 3, 'Explique duas formas de implementar esse 1:1 nas tabelas.', 0.4, '(1) **chave estrangeira com UNIQUE** num dos lados (ex.: CRACHA.id_funcionario UNIQUE); (2) **juntar numa só tabela** (dados do crachá como colunas de FUNCIONÁRIO), quando sempre andam juntos.', 'Nota cheia (0,4): as duas formas. Metade (0,2): uma. Zero (0): tabela associativa como única forma.'),
      (v_atividade, 3, 1, 'Diga a cardinalidade entre CATEGORIA e PRODUTO.', 0.2, '**1:N** (uma categoria, vários produtos).', 'Nota cheia (0,2): 1:N no sentido certo. Zero (0): outra.'),
      (v_atividade, 3, 2, 'Explique em qual tabela fica a chave estrangeira e qual atributo ela guarda.', 0.4, 'Em **PRODUTO** (o lado N), com o atributo **id_categoria**, que aponta para CATEGORIA.', 'Nota cheia (0,4): tabela + atributo. Metade (0,2): só a tabela. Zero (0): em CATEGORIA.'),
      (v_atividade, 3, 3, 'Explique por que a chave estrangeira não deve ficar em CATEGORIA.', 0.4, 'CATEGORIA teria de guardar **vários produtos num campo só** (uma lista), o que dificulta buscar, alterar e garantir a ligação; no lado N, cada produto guarda **um único valor**.', 'Nota cheia (0,4): problema da lista + vantagem do lado N. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 4, 1, 'Escreva o relacionamento na notação (mín, máx) dos dois lados.', 0.2, '**CURSO (1,1) — oferece — (0,N) TURMA.**', 'Nota cheia (0,2): os dois lados certos. Metade (0,1): um lado certo. Zero (0): nenhum.'),
      (v_atividade, 4, 2, 'Leia a notação em voz alta, em frases, nos dois sentidos.', 0.4, '"Um **curso oferece de zero a várias turmas**." "Uma **turma pertence a exatamente um curso**."', 'Nota cheia (0,4): as duas frases corretas. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 4, 3, 'Explique como a cardinalidade mínima 0 do lado da turma afeta o cadastro de um curso novo.', 0.4, 'Com mínimo **0**, o curso pode ser **cadastrado antes de ter turmas**; se fosse 1, o sistema não aceitaria um curso novo sem uma turma já criada.', 'Nota cheia (0,4): efeito no cadastro + comparação. Metade (0,2): explicação vaga. Zero (0): sem relação.'),
      (v_atividade, 5, 1, 'Diga a cardinalidade entre LIVRO e AUTOR.', 0.2, '**N:N.**', 'Nota cheia (0,2): N:N. Zero (0): outra.'),
      (v_atividade, 5, 2, 'Explique como implementar esse relacionamento nas tabelas, indicando as colunas da tabela do meio.', 0.4, 'Com uma **tabela associativa** (ex.: **LIVRO_AUTOR**) com **id_livro** e **id_autor** (chaves estrangeiras) e a ordem do autor.', 'Nota cheia (0,4): associativa + as duas FKs. Metade (0,2): associativa sem colunas. Zero (0): FK num lado só.'),
      (v_atividade, 5, 3, 'Explique onde fica a "ordem dos autores na capa" e por quê.', 0.4, 'Na **tabela associativa LIVRO_AUTOR**, porque a ordem é um **dado da ligação**: o mesmo autor pode ser o 1º num livro e o 2º em outro.', 'Nota cheia (0,4): local + motivo. Metade (0,2): só o local. Zero (0): em LIVRO ou AUTOR.'),
      (v_atividade, 6, 1, 'Diga a cardinalidade real entre PEDIDO e PRODUTO.', 0.2, '**N:N** (um pedido tem vários produtos; um produto está em vários pedidos).', 'Nota cheia (0,2): N:N. Zero (0): outra.'),
      (v_atividade, 6, 2, 'Explique os problemas dos campos produto1, produto2 e produto3.', 0.4, 'Limita o pedido a **3 produtos**; deixa campos **vazios** em pedidos menores; não tem onde guardar **quantidade e preço** de cada um; dificulta consultas como "quantas vezes o produto X foi vendido".', 'Nota cheia (0,4): dois ou mais problemas. Metade (0,2): um. Zero (0): diz que está certo.'),
      (v_atividade, 6, 3, 'Proponha a tabela que resolve o relacionamento e explique onde ficam quantidade e preço de venda.', 0.4, 'Tabela **ITEM_PEDIDO** (id_pedido, id_produto, quantidade, preco_unitario). **Quantidade** e **preço de venda** ficam nela, porque são **dados de cada combinação** pedido–produto.', 'Nota cheia (0,4): tabela com colunas + motivo. Metade (0,2): só a tabela. Zero (0): sem associativa.'),
      (v_atividade, 7, 1, 'Diga o que indica a cardinalidade mínima.', 0.2, 'Se a participação no relacionamento é **obrigatória (1)** ou **opcional (0)**.', 'Nota cheia (0,2): as duas ideias. Metade (0,1): uma. Zero (0): confunde com a máxima.'),
      (v_atividade, 7, 2, 'Escreva a cardinalidade (mín, máx) de ALUNO e CONTRATO, considerando que um aluno pode ter vários contratos ao longo do tempo.', 0.4, '**ALUNO (1,1) — (0,N) CONTRATO**: um aluno tem **de 0 a vários** contratos (pode se cadastrar sem plano); cada contrato é de **exatamente 1** aluno.', 'Nota cheia (0,4): os dois lados certos com leitura. Metade (0,2): um lado. Zero (0): nenhum.'),
      (v_atividade, 7, 3, 'Explique como essas cardinalidades ficariam na notação pé de galinha (traço, círculo e tridente).', 0.4, 'Lado do CONTRATO, visto do aluno: **círculo + tridente** (zero ou muitos). Lado do ALUNO, visto do contrato: **traço + traço** (exatamente um).', 'Nota cheia (0,4): os dois lados na notação. Metade (0,2): um lado. Zero (0): símbolos trocados.'),
      (v_atividade, 8, 1, 'Diga o que é autorrelacionamento.', 0.2, 'É quando uma entidade **se relaciona com ela mesma**.', 'Nota cheia (0,2): definição. Zero (0): sem relação.'),
      (v_atividade, 8, 2, 'Diga a cardinalidade do relacionamento "supervisiona" e explique a participação mínima, considerando o diretor.', 0.4, '**1:N**: um supervisor supervisiona vários funcionários; cada funcionário tem no máximo um supervisor. A participação mínima do funcionário é **0**, porque o **diretor não tem supervisor**.', 'Nota cheia (0,4): 1:N + mínima 0 justificada pelo diretor. Metade (0,2): só um. Zero (0): N:N sem justificativa.'),
      (v_atividade, 8, 3, 'Explique como implementar esse autorrelacionamento na tabela FUNCIONÁRIO.', 0.4, 'Uma coluna **id_supervisor** em FUNCIONÁRIO, **chave estrangeira para a própria tabela** FUNCIONÁRIO, podendo ficar **vazia** (para o diretor).', 'Nota cheia (0,4): FK para a própria tabela + vazio permitido. Metade (0,2): só a FK. Zero (0): outra tabela sem relação.'),
      (v_atividade, 9, 1, 'Diga qual é o problema do erro 1.', 0.2, 'Sem tabela associativa, **não há onde guardar as ligações** entre alunos e turmas nem os dados da matrícula (data, situação).', 'Nota cheia (0,2): problema. Zero (0): diz que está certo.'),
      (v_atividade, 9, 2, 'Explique o problema do erro 2 e onde a chave estrangeira deveria ficar.', 0.4, 'CURSO teria de guardar **uma lista de turmas** num campo; a chave deve ficar em **TURMA** (o lado N), com **id_curso**.', 'Nota cheia (0,4): problema + local certo. Metade (0,2): só um. Zero (0): mantém em CURSO.'),
      (v_atividade, 9, 3, 'Explique o risco do erro 3 para o cadastro de clientes e como evitá-lo.', 0.4, 'Marcar obrigatório o lado errado pode fazer o banco **exigir pedido para cadastrar cliente**, impedindo cadastros que a loja precisa. Evita-se **perguntando ao cliente** e marcando como **opcional (0)** o pedido para o cliente.', 'Nota cheia (0,4): risco + como evitar. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 10, 1, 'Diga a cardinalidade de ALUNO–TURMA, MATRÍCULA–PARCELA, RESPONSÁVEL–ALUNO e PROFESSOR–TURMA.', 0.2, 'ALUNO–TURMA **N:N**; MATRÍCULA–PARCELA **1:N**; RESPONSÁVEL–ALUNO **1:N**; PROFESSOR–TURMA **N:N**.', 'Nota cheia (0,2): as quatro. Metade (0,1): três. Zero (0): duas ou menos.'),
      (v_atividade, 10, 2, 'Explique como ALUNO–TURMA e PROFESSOR–TURMA serão implementados.', 0.4, 'ALUNO–TURMA: tabela associativa **MATRÍCULA** (id_aluno, id_turma, data, situação). PROFESSOR–TURMA: tabela associativa (ex.: **AULA_TURMA** ou PROFESSOR_TURMA) com id_professor e id_turma.', 'Nota cheia (0,4): as duas associativas com as FKs. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 10, 3, 'Explique como MATRÍCULA–PARCELA e RESPONSÁVEL–ALUNO serão implementados.', 0.4, 'MATRÍCULA–PARCELA: **id_matricula em PARCELA** (lado N; parte do identificador, pois PARCELA é fraca). RESPONSÁVEL–ALUNO: **id_responsavel em ALUNO** (lado N).', 'Nota cheia (0,4): as duas FKs no lado certo. Metade (0,2): uma. Zero (0): nenhuma.');
end $$;
