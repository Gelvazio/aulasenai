-- Seed gerado por scripts/gerar-seed-atividades.py (grupo Operador de Produção Industrial). Idempotente.
do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
  select id into v_curso from public.curso where nome_completo = 'Operador de Produção Industrial' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Operador de Produção Industrial') returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = 'Fundamentos de Automação/Instrumentação' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('Fundamentos de Automação/Instrumentação', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Sistemas de Numeração e Conversão de Bases
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Sistemas de Numeração e Conversão de Bases' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (1, 'Sistemas de Numeração e Conversão de Bases', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Sistemas de Numeração e Conversão de Bases', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Sistemas de Numeração e Conversão de Bases (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O que é a base de um sistema', 'B'),
      (v_atividade, 2, 'Por que o CLP usa o binário', 'C'),
      (v_atividade, 3, 'Símbolos do binário', 'B'),
      (v_atividade, 4, 'Símbolos do hexadecimal', 'D'),
      (v_atividade, 5, 'Valor posicional no decimal', 'D'),
      (v_atividade, 6, 'Binário 1011 para decimal', 'C'),
      (v_atividade, 7, 'Binário 1101 para decimal', 'A'),
      (v_atividade, 8, 'Binário 10000 para decimal', 'D'),
      (v_atividade, 9, 'Decimal 13 para binário', 'D'),
      (v_atividade, 10, 'Decimal 6 para binário', 'C'),
      (v_atividade, 11, 'Decimal 25 para binário', 'B'),
      (v_atividade, 12, 'O que é um bit', 'D'),
      (v_atividade, 13, 'O que é um byte', 'A'),
      (v_atividade, 14, 'O que é um nibble', 'C'),
      (v_atividade, 15, 'Combinações com 4 bits', 'C'),
      (v_atividade, 16, 'Maior valor com 8 bits', 'B'),
      (v_atividade, 17, 'Letra A no hexadecimal', 'B'),
      (v_atividade, 18, 'Letra F no hexadecimal', 'B'),
      (v_atividade, 19, 'Binário para hexadecimal', 'C'),
      (v_atividade, 20, 'Hexadecimal para binário', 'B'),
      (v_atividade, 21, 'Hexadecimal 2A para decimal', 'C'),
      (v_atividade, 22, 'Hexadecimal FF para decimal', 'B'),
      (v_atividade, 23, 'Hexadecimal 1C para decimal', 'A'),
      (v_atividade, 24, 'Decimal 31 para hexadecimal', 'A'),
      (v_atividade, 25, 'Leitura de um cartão de entradas', 'A'),
      (v_atividade, 26, 'Bit mais significativo', 'D'),
      (v_atividade, 27, 'Uso do hexadecimal na indústria', 'C'),
      (v_atividade, 28, 'Pesos das posições binárias', 'A'),
      (v_atividade, 29, 'Método decimal para binário', 'A'),
      (v_atividade, 30, 'Método binário para hexadecimal', 'D'),
      (v_atividade, 31, 'Erro na conversão', 'A'),
      (v_atividade, 32, 'Contador de caixas', 'D'),
      (v_atividade, 33, 'Código de falha 0A', 'B'),
      (v_atividade, 34, 'Código de falha 1F', 'D'),
      (v_atividade, 35, 'Código de falha 2C', 'C'),
      (v_atividade, 36, 'Bits necessários', 'C'),
      (v_atividade, 37, 'Significado do 1 no CLP', 'C'),
      (v_atividade, 38, 'Decimal 100 para binário', 'D'),
      (v_atividade, 39, 'Hexadecimal 64 para decimal', 'D'),
      (v_atividade, 40, 'Somar 1 em binário', 'C'),
      (v_atividade, 41, 'Endereço do manual', 'C'),
      (v_atividade, 42, 'Sistema mostrado ao operador', 'A'),
      (v_atividade, 43, 'Equivalência entre sistemas', 'C'),
      (v_atividade, 44, 'Peso do bit mais à esquerda', 'A'),
      (v_atividade, 45, 'Todas as entradas em zero', 'A'),
      (v_atividade, 46, 'Mesmo valor em bases diferentes', 'A'),
      (v_atividade, 47, 'Decimal 12 para hexadecimal', 'C'),
      (v_atividade, 48, 'Hexadecimal B para binário', 'D'),
      (v_atividade, 49, 'Conferir antes de agir', 'A'),
      (v_atividade, 50, 'Símbolos do decimal', 'A');

  -- Aula 2: Funções Lógicas
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Funções Lógicas' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (2, 'Funções Lógicas', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Funções Lógicas', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Funções Lógicas (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-02-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Estados de uma variável lógica', 'D'),
      (v_atividade, 2, 'Regra da função AND', 'C'),
      (v_atividade, 3, 'Regra da função OR', 'C'),
      (v_atividade, 4, 'Regra da função NAND', 'A'),
      (v_atividade, 5, 'Regra da função NOR', 'B'),
      (v_atividade, 6, 'Regra da função EX-OR', 'B'),
      (v_atividade, 7, 'Regra da função NÃO EX-OR', 'D'),
      (v_atividade, 8, 'AND com 1 e 0', 'A'),
      (v_atividade, 9, 'OR com 0 e 1', 'B'),
      (v_atividade, 10, 'NAND com 1 e 1', 'B'),
      (v_atividade, 11, 'NOR com 0 e 0', 'B'),
      (v_atividade, 12, 'EX-OR com 1 e 1', 'D'),
      (v_atividade, 13, 'NÃO EX-OR com 0 e 0', 'A'),
      (v_atividade, 14, 'Tabela-verdade', 'D'),
      (v_atividade, 15, 'Linhas da tabela com 2 entradas', 'C'),
      (v_atividade, 16, 'Linhas da tabela com 3 entradas', 'C'),
      (v_atividade, 17, 'Expressão da função AND', 'B'),
      (v_atividade, 18, 'Expressão da função OR', 'A'),
      (v_atividade, 19, 'Símbolo do EX-OR', 'B'),
      (v_atividade, 20, 'Círculo de negação', 'B'),
      (v_atividade, 21, 'NAND como AND invertido', 'B'),
      (v_atividade, 22, 'NOR como OR invertido', 'A'),
      (v_atividade, 23, 'Comando bimanual', 'D'),
      (v_atividade, 24, 'Erro na prensa', 'B'),
      (v_atividade, 25, 'Expressão com porta de proteção', 'C'),
      (v_atividade, 26, 'Parada por emergência', 'B'),
      (v_atividade, 27, 'Lâmpada de linha liberada', 'C'),
      (v_atividade, 28, 'Interruptores de corredor', 'D'),
      (v_atividade, 29, 'Sensores redundantes', 'B'),
      (v_atividade, 30, 'Falta de condição de partida', 'A'),
      (v_atividade, 31, 'Linha da tabela AND', 'A'),
      (v_atividade, 32, 'Linha da tabela OR', 'C'),
      (v_atividade, 33, 'Linha da tabela EX-OR', 'D'),
      (v_atividade, 34, 'AND de três entradas', 'D'),
      (v_atividade, 35, 'OR de três entradas', 'B'),
      (v_atividade, 36, 'Segurança na lógica', 'C'),
      (v_atividade, 37, 'Alteração da lógica de segurança', 'B'),
      (v_atividade, 38, 'Simulador de portas lógicas', 'C'),
      (v_atividade, 39, 'Identificar a porta pela tabela', 'C'),
      (v_atividade, 40, 'Identificar outra porta', 'B'),
      (v_atividade, 41, 'Identificar a coincidência', 'D'),
      (v_atividade, 42, 'Lógica booleana', 'D'),
      (v_atividade, 43, 'Bomba com duas condições', 'B'),
      (v_atividade, 44, 'Sirene de alarme', 'C'),
      (v_atividade, 45, 'Resultado de uma expressão', 'A'),
      (v_atividade, 46, 'Outra expressão', 'C'),
      (v_atividade, 47, 'Inversão de um sinal', 'D'),
      (v_atividade, 48, 'Funções lógicas no CLP', 'D'),
      (v_atividade, 49, 'Escolha da função adequada', 'A'),
      (v_atividade, 50, 'Erro na tabela-verdade', 'D');

  -- Aula 3: CLP: Características Técnicas e Princípio de Funcionamento
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'CLP: Características Técnicas e Princípio de Funcionamento' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (3, 'CLP: Características Técnicas e Princípio de Funcionamento', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('CLP: Características Técnicas e Princípio de Funcionamento', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — CLP: Características Técnicas e Princípio de Funcionamento (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-03-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Significado da sigla CLP', 'B'),
      (v_atividade, 2, 'Definição de CLP', 'A'),
      (v_atividade, 3, 'O que o CLP substituiu', 'D'),
      (v_atividade, 4, 'Vantagem do CLP sobre relés', 'A'),
      (v_atividade, 5, 'Exemplos de entradas', 'A'),
      (v_atividade, 6, 'Exemplos de saídas', 'A'),
      (v_atividade, 7, 'Tensão de alimentação', 'A'),
      (v_atividade, 8, 'Saída a relé e a transistor', 'C'),
      (v_atividade, 9, 'Entradas analógicas', 'B'),
      (v_atividade, 10, 'Memória do CLP', 'C'),
      (v_atividade, 11, 'Comunicação do CLP', 'B'),
      (v_atividade, 12, 'Modo RUN', 'B'),
      (v_atividade, 13, 'Modo STOP', 'C'),
      (v_atividade, 14, 'Ciclo de varredura', 'A'),
      (v_atividade, 15, 'Primeira etapa do ciclo', 'A'),
      (v_atividade, 16, 'Execução do programa', 'A'),
      (v_atividade, 17, 'Atualização das saídas', 'A'),
      (v_atividade, 18, 'Repetição do ciclo', 'C'),
      (v_atividade, 19, 'Tempo de varredura', 'C'),
      (v_atividade, 20, 'Pulso muito curto', 'D'),
      (v_atividade, 21, 'LED de entrada', 'D'),
      (v_atividade, 22, 'Diagnóstico pelo LED', 'C'),
      (v_atividade, 23, 'LED de entrada apagado', 'B'),
      (v_atividade, 24, 'CLP na esteira de expedição', 'C'),
      (v_atividade, 25, 'Ambiente industrial', 'C'),
      (v_atividade, 26, 'Mudança de receita', 'B'),
      (v_atividade, 27, 'Problemas do painel de relés', 'D'),
      (v_atividade, 28, 'Entradas do forno', 'D'),
      (v_atividade, 29, 'Imagem das entradas', 'D'),
      (v_atividade, 30, 'Mudança durante o ciclo', 'B'),
      (v_atividade, 31, 'Modo de programação', 'A'),
      (v_atividade, 32, 'Quem altera o programa', 'D'),
      (v_atividade, 33, 'CLP e segurança no laboratório', 'A'),
      (v_atividade, 34, 'Botão de emergência no laboratório', 'A'),
      (v_atividade, 35, 'Características em catálogo', 'A'),
      (v_atividade, 36, 'Quantidade de entradas', 'D'),
      (v_atividade, 37, 'Entrada digital', 'A'),
      (v_atividade, 38, 'Saída analógica', 'A'),
      (v_atividade, 39, 'Misturador de tinta', 'C'),
      (v_atividade, 40, 'Quando o CLP para tudo', 'B'),
      (v_atividade, 41, 'Responsabilidade do operador', 'C'),
      (v_atividade, 42, 'Relé versus CLP', 'B'),
      (v_atividade, 43, 'CLP compacto em máquina pequena', 'B'),
      (v_atividade, 44, 'Fonte do CLP', 'A'),
      (v_atividade, 45, 'Leitura dos sinais pelo operador', 'A'),
      (v_atividade, 46, 'Registro da falha', 'C'),
      (v_atividade, 47, 'Varredura e segurança', 'B'),
      (v_atividade, 48, 'Histórico da automação', 'B'),
      (v_atividade, 49, 'Exemplo de uso do CLP', 'C'),
      (v_atividade, 50, 'Ficha de observação', 'B');

  -- Aula 4: CLP: Arquitetura e Especificação de Hardware
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'CLP: Arquitetura e Especificação de Hardware' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (4, 'CLP: Arquitetura e Especificação de Hardware', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('CLP: Arquitetura e Especificação de Hardware', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — CLP: Arquitetura e Especificação de Hardware (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-04-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Blocos da arquitetura', 'B'),
      (v_atividade, 2, 'Função da CPU', 'B'),
      (v_atividade, 3, 'Função da fonte', 'D'),
      (v_atividade, 4, 'Cartão de entradas digitais', 'D'),
      (v_atividade, 5, 'Cartão de saídas digitais', 'A'),
      (v_atividade, 6, 'Entrada analógica na arquitetura', 'C'),
      (v_atividade, 7, 'Saída analógica na arquitetura', 'B'),
      (v_atividade, 8, 'Módulo de comunicação', 'C'),
      (v_atividade, 9, 'Função da memória', 'B'),
      (v_atividade, 10, 'CLP compacto', 'B'),
      (v_atividade, 11, 'CLP modular', 'B'),
      (v_atividade, 12, 'Expansão de pontos', 'B'),
      (v_atividade, 13, 'Escolha entre compacto e modular', 'C'),
      (v_atividade, 14, 'Saída a relé', 'A'),
      (v_atividade, 15, 'Saída a transistor', 'A'),
      (v_atividade, 16, 'Especificação de hardware', 'B'),
      (v_atividade, 17, 'Endereço de entrada', 'C'),
      (v_atividade, 18, 'Leitura do endereço I0.3', 'A'),
      (v_atividade, 19, 'Endereço de saída', 'C'),
      (v_atividade, 20, 'Byte de entradas', 'A'),
      (v_atividade, 21, 'Endereçamento e numeração', 'B'),
      (v_atividade, 22, 'Comunicação com a manutenção', 'A'),
      (v_atividade, 23, 'Etiqueta do CLP', 'A'),
      (v_atividade, 24, 'Catálogo do fabricante', 'D'),
      (v_atividade, 25, 'Bornes', 'D'),
      (v_atividade, 26, 'Trilho DIN', 'C'),
      (v_atividade, 27, 'Tensão das entradas', 'C'),
      (v_atividade, 28, 'Corrente máxima da saída', 'A'),
      (v_atividade, 29, 'CPU e varredura', 'C'),
      (v_atividade, 30, 'Bateria ou memória retentiva', 'B'),
      (v_atividade, 31, 'Módulo de E/S remota', 'B'),
      (v_atividade, 32, 'Ficha técnica da bancada', 'D'),
      (v_atividade, 33, 'Segurança na identificação de módulos', 'D'),
      (v_atividade, 34, 'Retirada de módulos', 'A'),
      (v_atividade, 35, 'Classificação de dispositivos', 'A'),
      (v_atividade, 36, 'Sinaleiro de máquina ligada', 'B'),
      (v_atividade, 37, 'Sensor de temperatura analógico', 'D'),
      (v_atividade, 38, 'IHM na arquitetura', 'B'),
      (v_atividade, 39, 'Número de pontos necessários', 'C'),
      (v_atividade, 40, 'Reserva de pontos', 'B'),
      (v_atividade, 41, 'LED de alimentação', 'B'),
      (v_atividade, 42, 'LED de falha', 'B'),
      (v_atividade, 43, 'Fiação identificada', 'C'),
      (v_atividade, 44, 'Rack modular', 'B'),
      (v_atividade, 45, 'Saída de sinalização sonora', 'A'),
      (v_atividade, 46, 'Diferença entre entrada e saída', 'A'),
      (v_atividade, 47, 'Comunicação Ethernet', 'C'),
      (v_atividade, 48, 'Ficha técnica: tipo de saída', 'A'),
      (v_atividade, 49, 'Ordem do fluxo de sinais', 'A'),
      (v_atividade, 50, 'Por que conhecer a arquitetura', 'B');

  -- Aula 5: CLP: Linguagens de Programação
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'CLP: Linguagens de Programação' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (5, 'CLP: Linguagens de Programação', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('CLP: Linguagens de Programação', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — CLP: Linguagens de Programação (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-05-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Norma das linguagens', 'C'),
      (v_atividade, 2, 'Linguagem mais usada em máquinas', 'D'),
      (v_atividade, 3, 'Linguagem com blocos', 'D'),
      (v_atividade, 4, 'Linguagem textual', 'D'),
      (v_atividade, 5, 'Linguagem sequencial', 'B'),
      (v_atividade, 6, 'Foco do operador', 'A'),
      (v_atividade, 7, 'Contato normalmente aberto', 'B'),
      (v_atividade, 8, 'Contato normalmente fechado', 'B'),
      (v_atividade, 9, 'Bobina', 'C'),
      (v_atividade, 10, 'Rede (rung)', 'B'),
      (v_atividade, 11, 'Ordem de leitura do Ladder', 'D'),
      (v_atividade, 12, 'Contatos em série', 'B'),
      (v_atividade, 13, 'Contatos em paralelo', 'A'),
      (v_atividade, 14, 'Contato NF como inversão', 'A'),
      (v_atividade, 15, 'Leitura de rede em série', 'D'),
      (v_atividade, 16, 'Leitura de rede em paralelo', 'A'),
      (v_atividade, 17, 'Rede com contato NF', 'D'),
      (v_atividade, 18, 'Prensa em Ladder', 'B'),
      (v_atividade, 19, 'Prever a saída 1', 'B'),
      (v_atividade, 20, 'Prever a saída 2', 'A'),
      (v_atividade, 21, 'Prever a saída 3', 'C'),
      (v_atividade, 22, 'Prever a saída 4', 'C'),
      (v_atividade, 23, 'Lâmpada de máquina em operação', 'C'),
      (v_atividade, 24, 'Alarme em paralelo', 'D'),
      (v_atividade, 25, 'Emergência ligada como NF', 'A'),
      (v_atividade, 26, 'Ladder e diagrama elétrico', 'A'),
      (v_atividade, 27, 'Blocos de Função equivalentes', 'B'),
      (v_atividade, 28, 'Bloco OR em FBD', 'C'),
      (v_atividade, 29, 'Software de programação', 'D'),
      (v_atividade, 30, 'Caminho da energia', 'D'),
      (v_atividade, 31, 'Comentários no programa', 'C'),
      (v_atividade, 32, 'Comentário adequado', 'D'),
      (v_atividade, 33, 'Endereço no contato', 'C'),
      (v_atividade, 34, 'Mesmo endereço em vários contatos', 'A'),
      (v_atividade, 35, 'Bobina duplicada', 'A'),
      (v_atividade, 36, 'Esteira de paletes — rede 1', 'B'),
      (v_atividade, 37, 'Esteira de paletes — rede 2', 'C'),
      (v_atividade, 38, 'Esteira de paletes — rede 3', 'A'),
      (v_atividade, 39, 'Esteira de paletes — rede 4', 'B'),
      (v_atividade, 40, 'Teste no CLP real', 'C'),
      (v_atividade, 41, 'Programa de máquina em produção', 'B'),
      (v_atividade, 42, 'Ladder × FBD', 'B'),
      (v_atividade, 43, 'Lista de Instruções', 'A'),
      (v_atividade, 44, 'Contato de saída no programa', 'A'),
      (v_atividade, 45, 'Rede sem condição', 'A'),
      (v_atividade, 46, 'Mistura série e paralelo', 'D'),
      (v_atividade, 47, 'Prever a saída da rede mista', 'A'),
      (v_atividade, 48, 'Outra previsão da rede mista', 'A'),
      (v_atividade, 49, 'Converter frase em Ladder', 'C'),
      (v_atividade, 50, 'Por que ler o programa', 'D');

  -- Aula 6: CLP: Estruturas de Programação
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'CLP: Estruturas de Programação' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (6, 'CLP: Estruturas de Programação', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('CLP: Estruturas de Programação', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — CLP: Estruturas de Programação (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-06-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O que é o selo', 'C'),
      (v_atividade, 2, 'Botão de pulso', 'C'),
      (v_atividade, 3, 'Posição do contato de selo', 'D'),
      (v_atividade, 4, 'Botão DESLIGA na rede', 'A'),
      (v_atividade, 5, 'Prioridade da parada', 'C'),
      (v_atividade, 6, 'Emergência na rede', 'B'),
      (v_atividade, 7, 'Falta de energia e selo', 'A'),
      (v_atividade, 8, 'Perigo da chave de manter', 'C'),
      (v_atividade, 9, 'Correção da esteira', 'C'),
      (v_atividade, 10, 'Temporizador TON', 'A'),
      (v_atividade, 11, 'Preset do temporizador', 'A'),
      (v_atividade, 12, 'Tempo decorrido', 'B'),
      (v_atividade, 13, 'Entrada do TON desligada antes do tempo', 'C'),
      (v_atividade, 14, 'Aviso sonoro antes da partida', 'B'),
      (v_atividade, 15, 'Contador crescente', 'A'),
      (v_atividade, 16, 'Reset do contador', 'A'),
      (v_atividade, 17, 'Encaixotadora', 'C'),
      (v_atividade, 18, 'Contador após a caixa fechada', 'A'),
      (v_atividade, 19, 'Contagem atual', 'D'),
      (v_atividade, 20, 'O que é intertravamento', 'C'),
      (v_atividade, 21, 'Avanço e retorno', 'B'),
      (v_atividade, 22, 'Esteira com proteção', 'D'),
      (v_atividade, 23, 'Bomba e nível mínimo', 'A'),
      (v_atividade, 24, 'Ponte rolante', 'B'),
      (v_atividade, 25, 'Encaixotadora com temporizador', 'D'),
      (v_atividade, 26, 'Parada de emergência no teste', 'D'),
      (v_atividade, 27, 'Jumper em segurança', 'C'),
      (v_atividade, 28, 'Selo sem DESLIGA', 'D'),
      (v_atividade, 29, 'Leitura de rede com selo', 'D'),
      (v_atividade, 30, 'Desligar o motor com selo', 'D'),
      (v_atividade, 31, 'Contador e IHM', 'D'),
      (v_atividade, 32, 'Temporizador de mistura', 'D'),
      (v_atividade, 33, 'Temporizador com atraso no desligamento', 'B'),
      (v_atividade, 34, 'Ventilador após a parada', 'C'),
      (v_atividade, 35, 'Sequência de partida', 'D'),
      (v_atividade, 36, 'Parada em sequência', 'D'),
      (v_atividade, 37, 'Diagnóstico de intertravamento', 'A'),
      (v_atividade, 38, 'Teste do programa da esteira', 'A'),
      (v_atividade, 39, 'Contador e falta de energia', 'B'),
      (v_atividade, 40, 'Temporizador e segurança', 'D'),
      (v_atividade, 41, 'Interpretação de tempo', 'D'),
      (v_atividade, 42, 'Contador decrescente', 'B'),
      (v_atividade, 43, 'Saídas que nunca ligam juntas', 'B'),
      (v_atividade, 44, 'Seleção manual e automático', 'C'),
      (v_atividade, 45, 'Teste com simulador', 'C'),
      (v_atividade, 46, 'Registro do teste', 'B'),
      (v_atividade, 47, 'Aviso de partida e selo', 'D'),
      (v_atividade, 48, 'Conferir antes de culpar o CLP', 'B'),
      (v_atividade, 49, 'Contador de lote completo', 'C'),
      (v_atividade, 50, 'Estruturas e segurança do operador', 'C');
end $$;
