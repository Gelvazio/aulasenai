-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'BANCO DE DADOS' and a.numero = 10
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 10 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 10', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 10 (10 questões discursivas)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADE-PRATICA-AULA-10.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Diga o objetivo da normalização.', 0.2, 'Organizar as tabelas para que **cada fato seja guardado uma única vez**, evitando **redundância** e **anomalias**.', 'Nota cheia (0,2): cada fato uma vez / redundância e anomalias. Metade (0,1): só "organizar". Zero (0): sem relação.'),
      (v_atividade, 1, 2, 'Explique dois benefícios da normalização para a loja.', 0.4, 'Dois entre: **menos redundância** (menos espaço e menos cópias); **menos erros e contradições**; **alterar em um só lugar**; banco **mais fácil de manter** e de consultar.', 'Nota cheia (0,4): dois benefícios aplicados à loja. Metade (0,2): um benefício. Zero (0): benefícios errados.'),
      (v_atividade, 1, 3, 'Explique a ideia "cada fato guardado uma única vez" com um exemplo de dado da loja.', 0.4, 'Ex.: o **endereço do cliente** fica **só na tabela CLIENTE**; os pedidos guardam apenas o **id do cliente**. Se o cliente muda de endereço, altera-se **uma vez** e todos os pedidos passam a mostrar o novo.', 'Nota cheia (0,4): exemplo com dado guardado uma vez + efeito. Metade (0,2): exemplo sem efeito. Zero (0): sem relação.'),
      (v_atividade, 2, 1, 'Dê um exemplo de anomalia de inserção nessa planilha.', 0.2, 'Não dá para **cadastrar um livro novo** (ou um leitor) **sem ter um empréstimo** dele.', 'Nota cheia (0,2): exemplo coerente. Zero (0): exemplo de outra anomalia.'),
      (v_atividade, 2, 2, 'Dê um exemplo de anomalia de atualização e a consequência para a biblioteca.', 0.4, 'Se o **telefone do leitor** (ou a editora de um livro) mudar, é preciso alterar **todas as linhas** dele; esquecendo uma, o leitor fica com **telefones diferentes** e a biblioteca não sabe qual é o certo.', 'Nota cheia (0,4): exemplo + consequência. Metade (0,2): só um. Zero (0): outra anomalia.'),
      (v_atividade, 2, 3, 'Dê um exemplo de anomalia de exclusão e explique o que se perde.', 0.4, 'Ao apagar o **único empréstimo de um livro** (ou de um leitor), perde-se a informação de que **o livro existe** (título, autor, editora) ou os **dados do leitor**.', 'Nota cheia (0,4): exemplo + o que se perde. Metade (0,2): só um. Zero (0): outra anomalia.'),
      (v_atividade, 3, 1, 'Explique o que significa a dependência funcional A → B.', 0.2, 'Conhecendo **A**, sabe-se **um único valor de B**.', 'Nota cheia (0,2): definição correta. Zero (0): sem relação.'),
      (v_atividade, 3, 2, 'Escreva as dependências funcionais da tabela, a partir de id_pedido e de id_cliente.', 0.4, '**id_pedido → data, id_cliente, valor_total**; **id_cliente → nome_cliente, cidade_cliente**.', 'Nota cheia (0,4): as duas dependências. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 3, 3, 'Explique como essas dependências mostram que a tabela precisa ser dividida.', 0.4, 'nome e cidade dependem de **id_cliente**, que não é a chave de PEDIDO (dependência **transitiva**: id_pedido → id_cliente → nome). Por isso vão para **CLIENTE**, e PEDIDO fica com id_cliente.', 'Nota cheia (0,4): transitiva + divisão. Metade (0,2): só a divisão. Zero (0): sem relação.'),
      (v_atividade, 4, 1, 'Diga as três condições da 1FN.', 0.2, '**Valores atômicos**; **sem grupos repetidos**; **chave primária**.', 'Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.'),
      (v_atividade, 4, 2, 'Explique quais colunas ferem a 1FN e por quê.', 0.4, '**telefones** tem **vários valores numa célula** (não atômico); **email1, email2, email3** são **grupo repetido**.', 'Nota cheia (0,4): os dois problemas. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 4, 3, 'Escreva as tabelas na 1FN.', 0.4, '**CLIENTE (id_cliente, nome)**; **TELEFONE_CLIENTE (id_cliente, telefone)**; **EMAIL_CLIENTE (id_cliente, email)**.', 'Nota cheia (0,4): três tabelas corretas. Metade (0,2): resolve só um dos problemas. Zero (0): mantém os problemas.'),
      (v_atividade, 5, 1, 'Explique o que é dependência parcial.', 0.2, 'Quando um atributo depende **só de uma parte** de uma **chave composta**.', 'Nota cheia (0,2): definição. Zero (0): confunde com transitiva.'),
      (v_atividade, 5, 2, 'Diga quais atributos têm dependência parcial e de qual parte da chave dependem.', 0.4, '**nome_produto** e **categoria_produto** dependem **só de id_produto**.', 'Nota cheia (0,4): os dois atributos + a parte da chave. Metade (0,2): um. Zero (0): inclui quantidade.'),
      (v_atividade, 5, 3, 'Escreva as tabelas na 2FN e diga por que quantidade fica em ITEM_PEDIDO.', 0.4, '**ITEM_PEDIDO (id_pedido, id_produto, quantidade)** e **PRODUTO (id_produto, nome, categoria)**. Quantidade fica porque depende da **chave inteira**: daquele produto naquele pedido.', 'Nota cheia (0,4): tabelas + motivo. Metade (0,2): só um. Zero (0): quantidade em PRODUTO.'),
      (v_atividade, 6, 1, 'Diga se a tabela está na 2FN e justifique em uma frase.', 0.2, '**Não está**: nome_aluno e turno dependem só de **parte** da chave composta.', 'Nota cheia (0,2): não + motivo. Metade (0,1): só "não". Zero (0): "está".'),
      (v_atividade, 6, 2, 'Diga para onde vão nome_aluno e turno e explique por quê.', 0.4, '**nome_aluno → ALUNO** (depende só de id_aluno); **turno → TURMA** (depende só de id_turma).', 'Nota cheia (0,4): os dois destinos com motivo. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 6, 3, 'Escreva as tabelas resultantes e explique por que data_matricula e situacao ficam na matrícula.', 0.4, '**ALUNO (id_aluno, nome)**; **TURMA (id_turma, turno)**; **MATRICULA (id_aluno, id_turma, data_matricula, situacao)**. Data e situação dependem da **combinação** aluno–turma (chave inteira).', 'Nota cheia (0,4): três tabelas + motivo. Metade (0,2): só um. Zero (0): estrutura errada.'),
      (v_atividade, 7, 1, 'Explique o que é dependência transitiva.', 0.2, 'Quando **A → B** e **B → C**: C depende da chave **por meio de um atributo não chave**.', 'Nota cheia (0,2): definição. Zero (0): confunde com parcial.'),
      (v_atividade, 7, 2, 'Mostre a dependência transitiva na tabela TURMA.', 0.4, '**id_turma → id_curso → nome_curso, carga_curso, valor_mensal**.', 'Nota cheia (0,4): cadeia com os atributos do curso. Metade (0,2): cadeia incompleta. Zero (0): sem relação.'),
      (v_atividade, 7, 3, 'Escreva as tabelas na 3FN, indicando a chave estrangeira.', 0.4, '**TURMA (id_turma, turno, sala, id_curso)** com **id_curso FK**; **CURSO (id_curso, nome, carga_horaria, valor_mensal)**.', 'Nota cheia (0,4): duas tabelas + FK. Metade (0,2): sem indicar a FK. Zero (0): mantém tudo junto.'),
      (v_atividade, 8, 1, 'Diga qual forma normal a tabela fere.', 0.2, '**3FN.**', 'Nota cheia (0,2): 3FN. Zero (0): outra.'),
      (v_atividade, 8, 2, 'Explique as dependências transitivas da tabela.', 0.4, '**id_consulta → id_paciente → nome_paciente**; **id_consulta → id_medico → nome_medico, especialidade**.', 'Nota cheia (0,4): as duas cadeias. Metade (0,2): uma. Zero (0): nenhuma.'),
      (v_atividade, 8, 3, 'Escreva as tabelas na 3FN.', 0.4, '**CONSULTA (id_consulta, data, id_paciente, id_medico, valor)**; **PACIENTE (id_paciente, nome)**; **MEDICO (id_medico, nome, especialidade)**.', 'Nota cheia (0,4): três tabelas corretas. Metade (0,2): duas. Zero (0): estrutura errada.'),
      (v_atividade, 9, 1, 'Diga se o colega está certo ou errado.', 0.2, '**Errado.**', 'Nota cheia (0,2): errado. Zero (0): certo.'),
      (v_atividade, 9, 2, 'Explique por que o preço no item do pedido é um dado diferente do preço atual do produto.', 0.4, 'O preço no item é o **preço daquela venda** (histórico); o preço em PRODUTO é o **preço atual**. Se o produto mudar de preço, os **pedidos antigos** precisam continuar com o valor cobrado na época.', 'Nota cheia (0,4): histórico × atual + consequência. Metade (0,2): explicação parcial. Zero (0): concorda em apagar.'),
      (v_atividade, 9, 3, 'Explique o que é desnormalização e o cuidado necessário ao usá-la.', 0.4, '**Desnormalização** é **repetir um dado de propósito** (ex.: para ganhar desempenho em relatórios). Cuidado: deve ser uma **decisão documentada e justificada**, com forma de manter os dados **coerentes**.', 'Nota cheia (0,4): definição + cuidado. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 10, 1, 'Diga o que a 1FN muda na planilha.', 0.2, 'Separa os **telefones** (vários numa célula) numa tabela própria, deixando **um valor por célula**, e define a **chave primária**.', 'Nota cheia (0,2): telefones separados / valores atômicos. Zero (0): sem relação.'),
      (v_atividade, 10, 2, 'Escreva as tabelas finais na 3FN, com as chaves primárias e estrangeiras.', 0.4, '**ALUNO (id_aluno PK, nome)**; **TELEFONE_ALUNO (id_aluno FK, telefone)**; **CURSO (id_curso PK, nome, carga_horaria)**; **TURMA (id_turma PK, codigo, turno, id_curso FK)**; **MATRICULA (id_aluno FK, id_turma FK, data_matricula; PK composta ou id próprio)**.', 'Nota cheia (0,4): cinco tabelas com chaves. Metade (0,2): quatro tabelas ou sem as chaves. Zero (0): estrutura errada.'),
      (v_atividade, 10, 3, 'Explique como conferir o resultado com o DER e o que acontece agora quando a carga de um curso muda.', 0.4, 'Conferir se cada tabela corresponde a uma **entidade ou associativa do DER** (ALUNO, CURSO, TURMA, MATRÍCULA) e se as **FKs** batem com os relacionamentos. Agora, a carga muda **uma só vez em CURSO** e vale para todas as turmas e matrículas.', 'Nota cheia (0,4): conferência + efeito da mudança. Metade (0,2): só um. Zero (0): sem relação.');
end $$;
