-- Seed gerado por assets/gerador-avaliacao-discursiva (não editar à mão; fora do Git).
-- Rodar depois de database/2026-10-01-respostas-discursivas.sql. Idempotente.
-- A avaliação nasce BLOQUEADA (ativo = false): o professor libera no índice de atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'BANCO DE DADOS' and a.numero = 7
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 7 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Prática — Aula 07', 'PENDENTE', v_aula, 'Atividade — Atividade Prática — Aula 07 (10 questões discursivas)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/ATIVIDADE-PRATICA-AULA-07.html', 10, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao, total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.topico_discursivo where atividade_id = v_atividade;
  insert into public.topico_discursivo (atividade_id, item, topico, enunciado, pontos,
      resposta_esperada, criterios) values
      (v_atividade, 1, 1, 'Diga quais são os atributos e quais são os valores no registro.', 0.2, 'Atributos: **título, autor, ano**. Valores: **Dom Casmurro, Machado de Assis, 1899**.', 'Nota cheia (0,2): os dois grupos corretos. Zero (0): invertidos.'),
      (v_atividade, 1, 2, 'Explique a diferença entre atributo e valor.', 0.4, 'O **atributo** é a **característica** que o sistema guarda (vale para todas as ocorrências); o **valor** é o **conteúdo** desse atributo numa ocorrência específica.', 'Nota cheia (0,4): diferença clara. Metade (0,2): só uma definição. Zero (0): definições trocadas.'),
      (v_atividade, 1, 3, 'Explique como os atributos podem ser desenhados no DER.', 0.4, 'Como **elipses ligadas** ao retângulo da entidade ou como **lista dentro do retângulo**.', 'Nota cheia (0,4): uma das notações bem descrita. Metade (0,2): descrição vaga. Zero (0): losango ou linha dupla.'),
      (v_atividade, 2, 1, 'Diga o que é atributo simples e o que é atributo composto.', 0.2, '**Simples:** não se divide em partes com significado próprio. **Composto:** pode ser dividido em partes menores, cada uma com significado.', 'Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.'),
      (v_atividade, 2, 2, 'Classifique os seis campos em simples ou composto.', 0.4, 'Simples: **CPF, data de nascimento, e-mail**. Compostos: **nome completo, endereço, telefone com DDD**.', 'Nota cheia (0,4): seis corretos. Metade (0,2): quatro ou cinco. Zero (0): três ou menos.'),
      (v_atividade, 2, 3, 'Escolha um campo composto e mostre em quais partes ele seria dividido.', 0.4, 'Ex.: **endereço** → rua, número, complemento, bairro, cidade, UF, CEP (ou nome completo → nome e sobrenome; telefone → DDD e número).', 'Nota cheia (0,4): composto com partes coerentes. Metade (0,2): partes incompletas. Zero (0): divide um atributo simples.'),
      (v_atividade, 3, 1, 'Diga qual é o critério para dividir um atributo composto.', 0.2, 'Dividir quando o sistema **precisa usar as partes separadamente** (filtrar, ordenar, validar).', 'Nota cheia (0,2): critério de uso das partes. Zero (0): critério sem relação.'),
      (v_atividade, 3, 2, 'Explique se o endereço deve ser dividido na loja e por quê.', 0.4, '**Sim**: a loja precisa **filtrar por cidade e bairro**, o que exige essas partes **separadas**; com o endereço num campo só, o filtro seria impreciso.', 'Nota cheia (0,4): decisão + justificativa pelo filtro. Metade (0,2): decisão sem justificativa. Zero (0): diz que não precisa dividir.'),
      (v_atividade, 3, 3, 'Explique o que acontece com as partes do composto quando a tabela for criada.', 0.4, '**Cada parte vira uma coluna** da tabela (rua, numero, bairro, cidade, cep).', 'Nota cheia (0,4): cada parte = coluna, com exemplo. Metade (0,2): sem exemplo. Zero (0): sem relação.'),
      (v_atividade, 4, 1, 'Defina atributo descritivo, nominativo e referencial em uma frase cada.', 0.2, '**Descritivo:** descreve uma característica sem identificar. **Nominativo:** além de descrever, **nomeia ou identifica** a ocorrência. **Referencial:** **faz referência a outra entidade**.', 'Nota cheia (0,2): as três. Metade (0,1): duas. Zero (0): uma ou nenhuma.'),
      (v_atividade, 4, 2, 'Classifique os atributos de CURSO.', 0.4, '**Código** e **nome**: nominativos; **carga horária** e **valor**: descritivos.', 'Nota cheia (0,4): os quatro corretos. Metade (0,2): três. Zero (0): dois ou menos.'),
      (v_atividade, 4, 3, 'Classifique os atributos de TURMA e explique o que o código do curso em TURMA indica.', 0.4, '**Código da turma**: nominativo; **turno**: descritivo; **código do curso**: **referencial**. Ele indica que existe um **relacionamento entre TURMA e CURSO** (a turma pertence a um curso).', 'Nota cheia (0,4): três corretos + significado. Metade (0,2): classificação certa sem significado. Zero (0): erra o referencial.'),
      (v_atividade, 5, 1, 'Diga qual atributo de PEDIDO é referencial e a qual entidade ele aponta.', 0.2, '**Código do cliente**, apontando para **CLIENTE**.', 'Nota cheia (0,2): atributo + entidade. Zero (0): outro atributo.'),
      (v_atividade, 5, 2, 'Explique o que o atributo referencial mostra sobre o modelo e em que ele vai se transformar na tabela.', 0.4, 'Mostra que existe um **relacionamento** entre PEDIDO e CLIENTE; na tabela, vira **chave estrangeira** (FK).', 'Nota cheia (0,4): relacionamento + chave estrangeira. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 5, 3, 'Explique o erro de usar um atributo referencial para uma entidade que não existe no modelo.', 0.4, 'O atributo **aponta para algo que não existe**: não há onde conferir se o valor é válido e o relacionamento fica **sem sentido**; a entidade referenciada precisa ser criada ou o atributo removido.', 'Nota cheia (0,4): erro + correção. Metade (0,2): só o erro. Zero (0): diz que está correto.'),
      (v_atividade, 6, 1, 'Diga as duas regras que um identificador precisa cumprir.', 0.2, '**Não se repete** e **não fica vazio**.', 'Nota cheia (0,2): as duas. Metade (0,1): uma. Zero (0): nenhuma.'),
      (v_atividade, 6, 2, 'Explique o problema de usar o nome e o problema de usar o e-mail.', 0.4, '**Nome:** existem **homônimos**, então se repete. **E-mail:** **pode mudar** (e alguns alunos podem não ter), e o identificador não deve mudar nem faltar.', 'Nota cheia (0,4): os dois problemas. Metade (0,2): um. Zero (0): nenhum.'),
      (v_atividade, 6, 3, 'Recomende o identificador e explique por que o CPF pode não servir numa escola com crianças.', 0.4, '**Código próprio (id)**: único, sempre preenchido e não muda. O CPF pode **não existir** para algumas crianças, e o identificador **não pode ficar vazio**.', 'Nota cheia (0,4): id + problema do CPF. Metade (0,2): só um. Zero (0): recomenda o nome.'),
      (v_atividade, 7, 1, 'Liste as colunas que um dicionário de atributos deve ter.', 0.2, '**Entidade, atributo, descrição, tipo, tamanho, obrigatório, classificação e exemplo.**', 'Nota cheia (0,2): cinco ou mais colunas. Metade (0,1): três ou quatro. Zero (0): menos.'),
      (v_atividade, 7, 2, 'Preencha a linha dos atributos preço e código da categoria (descrição, tipo, obrigatório, classificação e exemplo).', 0.4, '**preço** — valor de venda; decimal; obrigatório; simples, descritivo; 59,90. **código da categoria** — categoria do produto; inteiro; obrigatório; simples, referencial (CATEGORIA); 3.', 'Nota cheia (0,4): as duas linhas coerentes. Metade (0,2): uma linha completa ou duas incompletas. Zero (0): classificações erradas.'),
      (v_atividade, 7, 3, 'Explique para que serve o dicionário de atributos no projeto.', 0.4, '**Padroniza** e **documenta** cada atributo, para que toda a equipe entenda o que guardar e como; evita dúvidas de formato e serve de base para **criar as tabelas** (aula 12).', 'Nota cheia (0,4): documentação/padronização + uso na criação das tabelas. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 8, 1, 'Indique o identificador de PARCELA.', 0.2, '**Matrícula + número da parcela.**', 'Nota cheia (0,2): os dois juntos. Metade (0,1): só um. Zero (0): valor ou vencimento.'),
      (v_atividade, 8, 2, 'Classifique os cinco atributos de PARCELA quanto à função e diga qual pode ficar vazio.', 0.4, '**Número da parcela**: nominativo (parte do identificador); **matrícula**: referencial; **vencimento**, **valor** e **data de pagamento**: descritivos. A **data de pagamento** pode ficar vazia (parcela ainda não paga).', 'Nota cheia (0,4): classificação + atributo opcional. Metade (0,2): só um. Zero (0): ambos errados.'),
      (v_atividade, 8, 3, 'Explique por que o atributo matrícula, em PARCELA, é ao mesmo tempo referencial e parte do identificador.', 0.4, 'É **referencial** porque aponta para a entidade **MATRÍCULA** (a dona) e é **parte do identificador** porque PARCELA é **fraca**: só se identifica junto com a matrícula.', 'Nota cheia (0,4): as duas razões. Metade (0,2): uma. Zero (0): sem relação.'),
      (v_atividade, 9, 1, 'Diga qual é o problema do atributo idade.', 0.2, 'A **idade muda todo ano**; o certo é guardar a **data de nascimento** e calcular a idade.', 'Nota cheia (0,2): problema + correção. Metade (0,1): só um. Zero (0): diz que está certo.'),
      (v_atividade, 9, 2, 'Explique o problema do atributo telefones e como corrigir.', 0.4, '**Junta vários valores num campo só**: dificulta buscar, validar e alterar um dos telefones. Correção: guardar **cada telefone separadamente** (ex.: telefone principal e secundário, ou entidade TELEFONE ligada ao aluno).', 'Nota cheia (0,4): problema + correção. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 9, 3, 'Explique o problema do nome como identificador e proponha a correção.', 0.4, 'Existem **homônimos**: dois alunos com o mesmo nome teriam o mesmo identificador. Correção: usar um **código próprio (id)** como identificador e manter o nome como atributo.', 'Nota cheia (0,4): problema + correção. Metade (0,2): só um. Zero (0): sem relação.'),
      (v_atividade, 10, 1, 'Classifique os oito campos em simples ou composto.', 0.2, 'Compostos: **Nome** (nome e sobrenome) e **Endereço**. Simples: **CPF, Nascimento, Curso, Turma, Turno, Data**.', 'Nota cheia (0,2): todos corretos. Metade (0,1): um ou dois erros. Zero (0): três ou mais erros.'),
      (v_atividade, 10, 2, 'Classifique os oito campos em descritivo, nominativo ou referencial.', 0.4, '**Nome** e **CPF**: nominativos; **Nascimento**, **Endereço**, **Turno** e **Data**: descritivos; **Curso** e **Turma**: referenciais.', 'Nota cheia (0,4): todos corretos. Metade (0,2): até dois erros. Zero (0): três ou mais erros.'),
      (v_atividade, 10, 3, 'Diga a qual entidade pertencem Turno e Data e justifique.', 0.4, '**Turno** pertence a **TURMA** (é característica da turma, não do aluno). **Data** pertence a **MATRÍCULA** (é a data da ligação aluno–turma).', 'Nota cheia (0,4): as duas entidades com justificativa. Metade (0,2): uma, ou as duas sem justificativa. Zero (0): coloca as duas em ALUNO.');
end $$;
