-- Seed gerado a partir de scripts/gerar-seed-atividades.py (grupo Automação, aulas 07+).
-- Idempotente; não editar à mão.

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

  -- Aula 7: Sistemas de Supervisão: Local e Remoto e seus Componentes
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Sistemas de Supervisão: Local e Remoto e seus Componentes' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (7, 'Sistemas de Supervisão: Local e Remoto e seus Componentes', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Sistemas de Supervisão: Local e Remoto e seus Componentes', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Sistemas de Supervisão: Local e Remoto e seus Componentes (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-07-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O que é supervisionar um processo', 'C'),
      (v_atividade, 2, 'De onde vêm os dados da supervisão', 'D'),
      (v_atividade, 3, 'Ganho da supervisão', 'A'),
      (v_atividade, 4, 'Anotações em papel', 'B'),
      (v_atividade, 5, 'Base da pirâmide', 'A'),
      (v_atividade, 6, 'Nível do CLP', 'B'),
      (v_atividade, 7, 'Nível do SCADA', 'B'),
      (v_atividade, 8, 'Topo da pirâmide', 'C'),
      (v_atividade, 9, 'Sentido dos dados', 'D'),
      (v_atividade, 10, 'Supervisão local', 'C'),
      (v_atividade, 11, 'Supervisão remota', 'A'),
      (v_atividade, 12, 'Abrangência', 'D'),
      (v_atividade, 13, 'Tela da envasadora', 'B'),
      (v_atividade, 14, 'Sala de controle do laticínio', 'B'),
      (v_atividade, 15, 'Efluentes a distância', 'A'),
      (v_atividade, 16, 'Líder consultando a produção', 'B'),
      (v_atividade, 17, 'Instrumentos de campo', 'C'),
      (v_atividade, 18, 'Papel do CLP', 'B'),
      (v_atividade, 19, 'Rede de comunicação', 'D'),
      (v_atividade, 20, 'Estação de supervisão', 'B'),
      (v_atividade, 21, 'Banco de dados', 'A'),
      (v_atividade, 22, 'IHM e telas', 'D'),
      (v_atividade, 23, 'Componente que falta', 'D'),
      (v_atividade, 24, 'Seis componentes', 'A'),
      (v_atividade, 25, 'Valor congelado na tela', 'C'),
      (v_atividade, 26, 'Queda de rede', 'B'),
      (v_atividade, 27, 'Acesso indevido', 'B'),
      (v_atividade, 28, 'Senha pessoal', 'C'),
      (v_atividade, 29, 'Partida remota com risco', 'D'),
      (v_atividade, 30, 'Supervisão não substitui segurança', 'D'),
      (v_atividade, 31, 'Menos deslocamento', 'C'),
      (v_atividade, 32, 'Histórico para análise', 'D'),
      (v_atividade, 33, 'Transmissor no campo', 'B'),
      (v_atividade, 34, 'ERP e indicadores', 'D'),
      (v_atividade, 35, 'Do programa à tela', 'B'),
      (v_atividade, 36, 'Classificar situação 1', 'C'),
      (v_atividade, 37, 'Classificar situação 2', 'A'),
      (v_atividade, 38, 'Diagrama do laticínio', 'C'),
      (v_atividade, 39, 'O que fica no local', 'A'),
      (v_atividade, 40, 'O que vai para a sala', 'A'),
      (v_atividade, 41, 'Alarme rápido', 'C'),
      (v_atividade, 42, 'Ethernet industrial', 'A'),
      (v_atividade, 43, 'CLP guarda valores', 'D'),
      (v_atividade, 44, 'Tela apagada', 'D'),
      (v_atividade, 45, 'Celular como supervisão', 'C'),
      (v_atividade, 46, 'Componente para relatório', 'A'),
      (v_atividade, 47, 'Cuidado com mudanças pela tela', 'B'),
      (v_atividade, 48, 'Palavra-chave da aula', 'A'),
      (v_atividade, 49, 'Ganhos e cuidados', 'A'),
      (v_atividade, 50, 'Importância para o operador', 'C');

  -- Aula 8: Softwares SCADA, IHM e Funções Básicas da Supervisão
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Softwares SCADA, IHM e Funções Básicas da Supervisão' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (8, 'Softwares SCADA, IHM e Funções Básicas da Supervisão', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Softwares SCADA, IHM e Funções Básicas da Supervisão', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Softwares SCADA, IHM e Funções Básicas da Supervisão (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-08-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Onde fica a IHM', 'B'),
      (v_atividade, 2, 'Onde roda o SCADA', 'C'),
      (v_atividade, 3, 'Alcance da IHM', 'D'),
      (v_atividade, 4, 'Alcance do SCADA', 'A'),
      (v_atividade, 5, 'Uso típico da IHM', 'B'),
      (v_atividade, 6, 'Uso típico do SCADA', 'B'),
      (v_atividade, 7, 'Sinótico', 'D'),
      (v_atividade, 8, 'Função comando', 'C'),
      (v_atividade, 9, 'Tendência', 'A'),
      (v_atividade, 10, 'Receitas', 'D'),
      (v_atividade, 11, 'Histórico e relatórios', 'D'),
      (v_atividade, 12, 'Controle de acesso', 'D'),
      (v_atividade, 13, 'Qual função está em uso 1', 'B'),
      (v_atividade, 14, 'Qual função está em uso 2', 'C'),
      (v_atividade, 15, 'Qual função está em uso 3', 'A'),
      (v_atividade, 16, 'Qual função está em uso 4', 'A'),
      (v_atividade, 17, 'Qual função está em uso 5', 'C'),
      (v_atividade, 18, 'Qual função está em uso 6', 'D'),
      (v_atividade, 19, 'Primeiro passo com alarme', 'D'),
      (v_atividade, 20, 'Prioridade dos alarmes', 'D'),
      (v_atividade, 21, 'Reconhecer não é resolver', 'A'),
      (v_atividade, 22, 'Agir conforme procedimento', 'C'),
      (v_atividade, 23, 'Último passo', 'B'),
      (v_atividade, 24, 'Nível alto no TQ-02', 'A'),
      (v_atividade, 25, 'Dois alarmes ao mesmo tempo', 'B'),
      (v_atividade, 26, 'Alarmes piscando sem reconhecimento', 'B'),
      (v_atividade, 27, 'Receita errada', 'D'),
      (v_atividade, 28, 'Cores e estados', 'D'),
      (v_atividade, 29, 'Legenda da tela', 'B'),
      (v_atividade, 30, 'Tendência subindo ou estável', 'A'),
      (v_atividade, 31, 'Tendência estável', 'A'),
      (v_atividade, 32, 'Conteúdo do relatório de turno', 'B'),
      (v_atividade, 33, 'Registro de um alarme', 'B'),
      (v_atividade, 34, 'Senha compartilhada', 'D'),
      (v_atividade, 35, 'Parâmetros de segurança', 'B'),
      (v_atividade, 36, 'IHM ou SCADA 1', 'D'),
      (v_atividade, 37, 'IHM ou SCADA 2', 'C'),
      (v_atividade, 38, 'Sobretemperatura', 'C'),
      (v_atividade, 39, 'Porta aberta', 'C'),
      (v_atividade, 40, 'Fim de lote', 'A'),
      (v_atividade, 41, 'Alarme × evento', 'C'),
      (v_atividade, 42, 'Comando com autorização', 'A'),
      (v_atividade, 43, 'Tela de detalhe', 'B'),
      (v_atividade, 44, 'Tela de alarmes', 'A'),
      (v_atividade, 45, 'Visão geral', 'C'),
      (v_atividade, 46, 'Alarme reconhecido que continua', 'A'),
      (v_atividade, 47, 'Relatório e passagem de turno', 'C'),
      (v_atividade, 48, 'Manual × automático', 'B'),
      (v_atividade, 49, 'Turno simulado', 'C'),
      (v_atividade, 50, 'Importância para o operador', 'A');

  -- Aula 9: Instrumentação: Simbologia, Fluxogramas, Malhas e Sinais
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Instrumentação: Simbologia, Fluxogramas, Malhas e Sinais' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (9, 'Instrumentação: Simbologia, Fluxogramas, Malhas e Sinais', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Instrumentação: Simbologia, Fluxogramas, Malhas e Sinais', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Instrumentação: Simbologia, Fluxogramas, Malhas e Sinais (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-09-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Formação do TAG', 'B'),
      (v_atividade, 2, 'Primeira letra', 'B'),
      (v_atividade, 3, 'Letras seguintes', 'B'),
      (v_atividade, 4, 'Letra P', 'D'),
      (v_atividade, 5, 'Letra T inicial', 'A'),
      (v_atividade, 6, 'Letra L', 'D'),
      (v_atividade, 7, 'Letra F', 'D'),
      (v_atividade, 8, 'PI-101', 'D'),
      (v_atividade, 9, 'TT-205', 'A'),
      (v_atividade, 10, 'LIC-301', 'A'),
      (v_atividade, 11, 'FV-110', 'D'),
      (v_atividade, 12, 'LAH-302', 'D'),
      (v_atividade, 13, 'Letra A e H/L', 'B'),
      (v_atividade, 14, 'Número da malha', 'D'),
      (v_atividade, 15, 'Criar o TAG', 'D'),
      (v_atividade, 16, 'Criar o TAG 2', 'B'),
      (v_atividade, 17, 'Círculo sem linha', 'A'),
      (v_atividade, 18, 'Círculo com linha', 'B'),
      (v_atividade, 19, 'Classes de instrumentos', 'B'),
      (v_atividade, 20, 'Elemento final de controle', 'A'),
      (v_atividade, 21, 'O que é P&ID', 'A'),
      (v_atividade, 22, 'Malha aberta', 'D'),
      (v_atividade, 23, 'Malha fechada', 'C'),
      (v_atividade, 24, 'Set point', 'B'),
      (v_atividade, 25, 'PI na linha de ar', 'C'),
      (v_atividade, 26, 'TIC na estufa', 'A'),
      (v_atividade, 27, 'Caminho da malha fechada', 'B'),
      (v_atividade, 28, 'Quem compara', 'D'),
      (v_atividade, 29, 'Quem mede', 'C'),
      (v_atividade, 30, 'Sinal pneumático', 'C'),
      (v_atividade, 31, 'Sinal analógico', 'C'),
      (v_atividade, 32, 'Sinal digital', 'C'),
      (v_atividade, 33, 'Exemplo pneumático', 'A'),
      (v_atividade, 34, 'Exemplo digital', 'C'),
      (v_atividade, 35, 'Exemplo analógico', 'C'),
      (v_atividade, 36, 'Conversão 12 mA', 'A'),
      (v_atividade, 37, 'Conversão 4 mA', 'A'),
      (v_atividade, 38, 'Conversão 20 mA', 'B'),
      (v_atividade, 39, 'LT-301 em 8 mA', 'C'),
      (v_atividade, 40, 'LT-301 em 16 mA', 'B'),
      (v_atividade, 41, 'Fórmula 4–20 mA', 'C'),
      (v_atividade, 42, 'Por que 16', 'A'),
      (v_atividade, 43, 'Zero vivo', 'D'),
      (v_atividade, 44, 'Falha de sinal no LT', 'B'),
      (v_atividade, 45, 'Metade da faixa', 'A'),
      (v_atividade, 46, 'Classificar sinais', 'C'),
      (v_atividade, 47, 'Instrumento no painel', 'A'),
      (v_atividade, 48, 'Ler o TAG na prática', 'D'),
      (v_atividade, 49, 'Conversão 8 mA em temperatura', 'C'),
      (v_atividade, 50, 'Segurança na bancada', 'B');

  -- Aula 10: Pressão: Unidades, Conversões e Dispositivos de Medição
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Pressão: Unidades, Conversões e Dispositivos de Medição' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (10, 'Pressão: Unidades, Conversões e Dispositivos de Medição', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Pressão: Unidades, Conversões e Dispositivos de Medição', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Pressão: Unidades, Conversões e Dispositivos de Medição (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-10-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Definição de pressão', 'B'),
      (v_atividade, 2, 'Pressão e área', 'D'),
      (v_atividade, 3, 'Cálculo simples', 'C'),
      (v_atividade, 4, 'Pressão absoluta', 'D'),
      (v_atividade, 5, 'Pressão manométrica', 'D'),
      (v_atividade, 6, 'Manômetro em zero', 'A'),
      (v_atividade, 7, 'Pressão diferencial', 'A'),
      (v_atividade, 8, 'Filtro sujo', 'D'),
      (v_atividade, 9, 'Vácuo', 'C'),
      (v_atividade, 10, 'Instrumento para vácuo', 'B'),
      (v_atividade, 11, 'Fator bar → psi', 'A'),
      (v_atividade, 12, 'Fator bar → kPa', 'B'),
      (v_atividade, 13, 'Fator psi → bar', 'A'),
      (v_atividade, 14, 'kgf/cm² e bar', 'C'),
      (v_atividade, 15, 'Atmosfera', 'B'),
      (v_atividade, 16, 'Metro de coluna d''água', 'B'),
      (v_atividade, 17, '6 bar em psi', 'C'),
      (v_atividade, 18, '120 psi em bar', 'C'),
      (v_atividade, 19, '350 kPa em bar', 'A'),
      (v_atividade, 20, '2 bar em kPa', 'A'),
      (v_atividade, 21, '8 bar em psi', 'D'),
      (v_atividade, 22, '145 psi em bar', 'A'),
      (v_atividade, 23, '10 mH₂O em bar', 'C'),
      (v_atividade, 24, 'Faixa da Plásticos Norte', 'C'),
      (v_atividade, 25, 'Transmissor em kPa', 'B'),
      (v_atividade, 26, 'Pressão baixa na rede', 'A'),
      (v_atividade, 27, 'Ficha em psi e manômetro em bar', 'A'),
      (v_atividade, 28, 'Tubo de Bourdon', 'B'),
      (v_atividade, 29, 'Uso do Bourdon', 'C'),
      (v_atividade, 30, 'Manômetro de diafragma', 'C'),
      (v_atividade, 31, 'Tubo em U', 'D'),
      (v_atividade, 32, 'Uso do tubo em U', 'D'),
      (v_atividade, 33, 'Pressostato', 'C'),
      (v_atividade, 34, 'Sinal do pressostato', 'B'),
      (v_atividade, 35, 'Pressostato liga e desliga', 'B'),
      (v_atividade, 36, 'Transmissor de pressão', 'A'),
      (v_atividade, 37, 'Qual instrumento escolher 1', 'C'),
      (v_atividade, 38, 'Qual instrumento escolher 2', 'D'),
      (v_atividade, 39, 'Qual instrumento escolher 3', 'D'),
      (v_atividade, 40, 'Paralaxe', 'A'),
      (v_atividade, 41, 'Conferir a unidade', 'B'),
      (v_atividade, 42, 'Registro correto', 'A'),
      (v_atividade, 43, 'Rede de ferramentas', 'B'),
      (v_atividade, 44, 'Ponteiro além do limite', 'B'),
      (v_atividade, 45, 'Escolher a faixa do manômetro', 'D'),
      (v_atividade, 46, 'Converter kgf/cm² para psi', 'C'),
      (v_atividade, 47, '29 psi em bar', 'A'),
      (v_atividade, 48, 'Diferencial em números', 'B'),
      (v_atividade, 49, 'Segurança com pressão', 'D'),
      (v_atividade, 50, 'Por que observar a pressão', 'D');

  -- Aula 11: Medição de Nível: Direta, Indireta, Descontínua e de Sólidos
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Medição de Nível: Direta, Indireta, Descontínua e de Sólidos' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (11, 'Medição de Nível: Direta, Indireta, Descontínua e de Sólidos', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Medição de Nível: Direta, Indireta, Descontínua e de Sólidos', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Medição de Nível: Direta, Indireta, Descontínua e de Sólidos (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-11-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O que é medir nível', 'B'),
      (v_atividade, 2, 'Medição direta', 'A'),
      (v_atividade, 3, 'Medição indireta', 'A'),
      (v_atividade, 4, 'Exemplos de medição direta', 'A'),
      (v_atividade, 5, 'Exemplos de medição indireta', 'D'),
      (v_atividade, 6, 'Visor de vidro', 'C'),
      (v_atividade, 7, 'Pressão hidrostática', 'A'),
      (v_atividade, 8, 'Água: 1 metro', 'D'),
      (v_atividade, 9, '19,6 kPa', 'C'),
      (v_atividade, 10, '29,4 kPa', 'D'),
      (v_atividade, 11, '9,8 kPa', 'D'),
      (v_atividade, 12, '0,49 bar', 'B'),
      (v_atividade, 13, 'Pressão de 4 m de água', 'D'),
      (v_atividade, 14, 'Densidade importa', 'C'),
      (v_atividade, 15, 'Líquido mais denso', 'D'),
      (v_atividade, 16, 'Configuração errada', 'B'),
      (v_atividade, 17, 'Medidor descontínuo', 'A'),
      (v_atividade, 18, 'Sinal do descontínuo', 'C'),
      (v_atividade, 19, 'Chave de boia', 'B'),
      (v_atividade, 20, 'Caixa d''água da fábrica', 'B'),
      (v_atividade, 21, 'Eletrodos condutivos', 'D'),
      (v_atividade, 22, 'Limite dos eletrodos', 'B'),
      (v_atividade, 23, 'Chave vibratória', 'C'),
      (v_atividade, 24, 'Uso da chave vibratória', 'A'),
      (v_atividade, 25, 'Chave capacitiva', 'D'),
      (v_atividade, 26, 'Nível de sólidos por pesagem', 'B'),
      (v_atividade, 27, 'Cuidado da pesagem', 'A'),
      (v_atividade, 28, 'Ultrassom e radar', 'A'),
      (v_atividade, 29, 'Cuidado com ultrassom em silos', 'C'),
      (v_atividade, 30, 'Prumo eletromecânico', 'C'),
      (v_atividade, 31, 'Medição periódica', 'B'),
      (v_atividade, 32, 'Pás rotativas', 'A'),
      (v_atividade, 33, 'Tipo de medição das pás', 'C'),
      (v_atividade, 34, 'Silo de grãos', 'A'),
      (v_atividade, 35, 'Proteção independente', 'D'),
      (v_atividade, 36, 'LAH no tanque', 'C'),
      (v_atividade, 37, 'Escolher o medidor 1', 'B'),
      (v_atividade, 38, 'Escolher o medidor 2', 'C'),
      (v_atividade, 39, 'Escolher o medidor 3', 'A'),
      (v_atividade, 40, 'Comparar leituras', 'A'),
      (v_atividade, 41, 'Registro de nível', 'D'),
      (v_atividade, 42, 'Contínua × descontínua', 'D'),
      (v_atividade, 43, 'Vareta', 'D'),
      (v_atividade, 44, 'Nível e qualidade', 'B'),
      (v_atividade, 45, 'Bomba a seco', 'C'),
      (v_atividade, 46, 'Transbordamento e segurança', 'A'),
      (v_atividade, 47, 'Entrar em silo', 'B'),
      (v_atividade, 48, 'Ler o nível em porcentagem', 'C'),
      (v_atividade, 49, 'Transmissor de nível no TAG', 'B'),
      (v_atividade, 50, 'Por que observar o nível', 'B');

  -- Aula 12: Vazão: Unidades e Principais Medidores
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Vazão: Unidades e Principais Medidores' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (12, 'Vazão: Unidades e Principais Medidores', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Vazão: Unidades e Principais Medidores', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Vazão: Unidades e Principais Medidores (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-12-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O que é vazão volumétrica', 'C'),
      (v_atividade, 2, 'Fórmula da vazão', 'B'),
      (v_atividade, 3, 'Vazão mássica', 'C'),
      (v_atividade, 4, 'Quando usar vazão mássica', 'D'),
      (v_atividade, 5, 'm³/h em L/h', 'A'),
      (v_atividade, 6, 'm³/h em L/min', 'D'),
      (v_atividade, 7, 'L/min em L/h', 'A'),
      (v_atividade, 8, 'L/s em m³/h', 'D'),
      (v_atividade, 9, 'Método do balde', 'A'),
      (v_atividade, 10, 'Balde em L/min', 'A'),
      (v_atividade, 11, 'Balde em m³/h', 'D'),
      (v_atividade, 12, '6 m³/h em L/min', 'A'),
      (v_atividade, 13, '120 L/min em m³/h', 'A'),
      (v_atividade, 14, '3 m³/h em L/h', 'D'),
      (v_atividade, 15, 'Tanque cheio em 10 minutos', 'C'),
      (v_atividade, 16, 'Tempo para encher', 'C'),
      (v_atividade, 17, 'Rotâmetro', 'A'),
      (v_atividade, 18, 'Uso do rotâmetro', 'C'),
      (v_atividade, 19, 'Leitura do rotâmetro', 'B'),
      (v_atividade, 20, 'Rotâmetro de ar com água', 'A'),
      (v_atividade, 21, 'Placa de orifício', 'D'),
      (v_atividade, 22, 'Aplicação da placa de orifício', 'B'),
      (v_atividade, 23, 'Turbina', 'B'),
      (v_atividade, 24, 'Aplicação da turbina', 'B'),
      (v_atividade, 25, 'Eletromagnético', 'D'),
      (v_atividade, 26, 'Limite do eletromagnético', 'A'),
      (v_atividade, 27, 'Ultrassônico', 'C'),
      (v_atividade, 28, 'Vantagem do ultrassônico', 'C'),
      (v_atividade, 29, 'Coriolis', 'A'),
      (v_atividade, 30, 'Dosagem de xarope', 'A'),
      (v_atividade, 31, 'Hidrômetro', 'D'),
      (v_atividade, 32, 'Consumo por setor', 'C'),
      (v_atividade, 33, 'Sinal da turbina', 'B'),
      (v_atividade, 34, 'Sinal 4–20 mA', 'B'),
      (v_atividade, 35, 'Água de resfriamento', 'B'),
      (v_atividade, 36, 'Comparar leitura e cálculo', 'B'),
      (v_atividade, 37, 'Diferença em %', 'C'),
      (v_atividade, 38, 'Planilha de vazões', 'B'),
      (v_atividade, 39, 'Gráfico de dispersão', 'B'),
      (v_atividade, 40, 'Balde com 15 L', 'C'),
      (v_atividade, 41, 'Cuidado no método do balde', 'D'),
      (v_atividade, 42, 'Vazão e qualidade', 'B'),
      (v_atividade, 43, 'Totalizador', 'D'),
      (v_atividade, 44, 'FT no fluxograma', 'C'),
      (v_atividade, 45, 'Indicação local × remota', 'A'),
      (v_atividade, 46, 'Registro de vazão', 'D'),
      (v_atividade, 47, '60 L/min em m³/h', 'C'),
      (v_atividade, 48, '2 m³/h em L/min', 'D'),
      (v_atividade, 49, 'Segurança na bancada de vazão', 'A'),
      (v_atividade, 50, 'Por que observar a vazão', 'B');

  -- Aula 13: Temperatura: Medidores por Dilatação e Termopar
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Temperatura: Medidores por Dilatação e Termopar' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (13, 'Temperatura: Medidores por Dilatação e Termopar', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Temperatura: Medidores por Dilatação e Termopar', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Temperatura: Medidores por Dilatação e Termopar (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-13-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, '°C para K', 'A'),
      (v_atividade, 2, '°C para °F', 'C'),
      (v_atividade, 3, '80 °C em K', 'B'),
      (v_atividade, 4, '80 °C em °F', 'A'),
      (v_atividade, 5, '100 °C em °F', 'D'),
      (v_atividade, 6, '0 °C em K', 'C'),
      (v_atividade, 7, '25 °C em °F', 'A'),
      (v_atividade, 8, '200 °C em °F', 'D'),
      (v_atividade, 9, '−20 °C em K', 'B'),
      (v_atividade, 10, 'Princípio da dilatação', 'B'),
      (v_atividade, 11, 'Termômetro de líquido em vidro', 'B'),
      (v_atividade, 12, 'Uso do líquido em vidro', 'B'),
      (v_atividade, 13, 'Bimetálico', 'A'),
      (v_atividade, 14, 'Uso do bimetálico', 'A'),
      (v_atividade, 15, 'Sistema cheio', 'C'),
      (v_atividade, 16, 'Distância do sistema cheio', 'A'),
      (v_atividade, 17, 'Sinal dos medidores por dilatação', 'C'),
      (v_atividade, 18, 'Termopar', 'A'),
      (v_atividade, 19, 'Efeito Seebeck', 'B'),
      (v_atividade, 20, 'Sinal do termopar', 'C'),
      (v_atividade, 21, 'Junta fria', 'D'),
      (v_atividade, 22, 'Tipo J', 'C'),
      (v_atividade, 23, 'Tipo K', 'D'),
      (v_atividade, 24, 'Tipo T', 'D'),
      (v_atividade, 25, 'Injetora de plástico', 'C'),
      (v_atividade, 26, 'Forno de tratamento térmico', 'C'),
      (v_atividade, 27, 'Câmara fria', 'B'),
      (v_atividade, 28, 'Cabo de compensação', 'B'),
      (v_atividade, 29, 'Cabo comum', 'C'),
      (v_atividade, 30, 'Polaridade invertida', 'D'),
      (v_atividade, 31, 'Vantagens do termopar', 'A'),
      (v_atividade, 32, 'Limitação do termopar', 'B'),
      (v_atividade, 33, 'Bimetálico na linha de vapor', 'C'),
      (v_atividade, 34, 'Faixa da estufa', 'D'),
      (v_atividade, 35, 'Leituras divergentes', 'A'),
      (v_atividade, 36, 'Causa possível 1', 'D'),
      (v_atividade, 37, 'Causa possível 2', 'D'),
      (v_atividade, 38, 'Mensagem ao líder', 'C'),
      (v_atividade, 39, 'Comparação na bancada', 'D'),
      (v_atividade, 40, 'Termopar danificado', 'C'),
      (v_atividade, 41, 'Tempo de resposta', 'A'),
      (v_atividade, 42, 'TIC na estufa', 'D'),
      (v_atividade, 43, 'Escala errada', 'D'),
      (v_atividade, 44, 'Temperatura e qualidade', 'A'),
      (v_atividade, 45, 'Segurança com temperatura', 'B'),
      (v_atividade, 46, 'Bulbo mal instalado', 'B'),
      (v_atividade, 47, 'TAG de temperatura', 'A'),
      (v_atividade, 48, 'Dilatação × termopar', 'B'),
      (v_atividade, 49, '40 °C em °F', 'A'),
      (v_atividade, 50, 'Por que observar a temperatura', 'B');

  -- Aula 14: Temperatura: Termorresistência (PT100) e Laudo Comparativo
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Temperatura: Termorresistência (PT100) e Laudo Comparativo' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (14, 'Temperatura: Termorresistência (PT100) e Laudo Comparativo', v_materia, v_curso, '2026-10-02')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Temperatura: Termorresistência (PT100) e Laudo Comparativo', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Temperatura: Termorresistência (PT100) e Laudo Comparativo (50 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/ATIVIDADES-AULA-14-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Princípio da termorresistência', 'B'),
      (v_atividade, 2, 'Metal mais usado', 'D'),
      (v_atividade, 3, 'Significado de PT100', 'B'),
      (v_atividade, 4, 'Variação por grau', 'A'),
      (v_atividade, 5, 'Fórmula de estimativa', 'A'),
      (v_atividade, 6, 'PT100 a 0 °C', 'B'),
      (v_atividade, 7, '119,4 Ω', 'B'),
      (v_atividade, 8, '138,5 Ω', 'C'),
      (v_atividade, 9, '107,7 Ω', 'A'),
      (v_atividade, 10, '115,4 Ω', 'A'),
      (v_atividade, 11, 'Resistência a 60 °C', 'D'),
      (v_atividade, 12, 'Resistência a 75 °C', 'A'),
      (v_atividade, 13, 'Abaixo de zero', 'C'),
      (v_atividade, 14, 'Resistência a 200 °C', 'D'),
      (v_atividade, 15, 'Ligação a 2 fios', 'A'),
      (v_atividade, 16, 'Ligação a 3 fios', 'B'),
      (v_atividade, 17, 'Ligação a 4 fios', 'A'),
      (v_atividade, 18, 'Cabo longo a 2 fios', 'D'),
      (v_atividade, 19, 'Princípio: termopar × PT100', 'A'),
      (v_atividade, 20, 'Faixa: termopar × PT100', 'C'),
      (v_atividade, 21, 'Precisão', 'B'),
      (v_atividade, 22, 'Tempo de resposta', 'C'),
      (v_atividade, 23, 'Custo', 'C'),
      (v_atividade, 24, 'Usos típicos', 'D'),
      (v_atividade, 25, 'Pasteurizador', 'B'),
      (v_atividade, 26, 'Forno a 900 °C', 'C'),
      (v_atividade, 27, 'Câmara fria de frigorífico', 'D'),
      (v_atividade, 28, 'Laudo: objetivo', 'C'),
      (v_atividade, 29, 'Partes do laudo', 'A'),
      (v_atividade, 30, 'Tabela do laudo', 'C'),
      (v_atividade, 31, 'Diferença do sensor', 'D'),
      (v_atividade, 32, 'Conclusão do laudo', 'A'),
      (v_atividade, 33, 'Recomendação no laudo', 'B'),
      (v_atividade, 34, 'Medir resistência com segurança', 'B'),
      (v_atividade, 35, 'Resistência infinita', 'D'),
      (v_atividade, 36, 'Resistência quase zero', 'D'),
      (v_atividade, 37, 'Transmissor para PT100', 'C'),
      (v_atividade, 38, 'TT do pasteurizador', 'C'),
      (v_atividade, 39, 'Estabilidade', 'C'),
      (v_atividade, 40, 'Bainha e poço', 'B'),
      (v_atividade, 41, 'Escolher pelo critério', 'D'),
      (v_atividade, 42, 'Divergência no pasteurizador', 'D'),
      (v_atividade, 43, 'Registro de temperatura', 'B'),
      (v_atividade, 44, 'Sensor certo e segurança do alimento', 'B'),
      (v_atividade, 45, 'Segurança na bancada de temperatura', 'B'),
      (v_atividade, 46, 'PT100 × termopar: resumo', 'D'),
      (v_atividade, 47, 'Por que observar com o sensor certo', 'C'),
      (v_atividade, 48, '111,55 Ω', 'A'),
      (v_atividade, 49, 'Sensor para injetora', 'A'),
      (v_atividade, 50, 'Encerramento da UC', 'A');
end $$;
