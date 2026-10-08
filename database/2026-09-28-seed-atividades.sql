-- Seed gerado por scripts/gerar-seed-atividades.py — não editar à mão.
-- Rodar depois de 2026-09-28-atividades-gabarito.sql. Idempotente.

insert into public.turma (codigo, nome, turno, horario) values
  ('135080', 'AI AOPL 2026/2 M1', 'Manhã', '07:15 às 11:15'),
  ('135081', 'AI AOPL 2026/2 V1', 'Tarde', '13:15 às 17:15')
on conflict (codigo) do update set nome = excluded.nome, turno = excluded.turno, horario = excluded.horario;

do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
  select id into v_curso from public.curso where nome_completo = 'Assistente de Operações Logísticas' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Assistente de Operações Logísticas') returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = 'Introdução à Tecnologia da Informação e Comunicação' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('Introdução à Tecnologia da Informação e Comunicação', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Comunicação Profissional e Seus Fundamentos
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Comunicação Profissional e Seus Fundamentos' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (1, 'Comunicação Profissional e Seus Fundamentos', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Comunicação Profissional e Seus Fundamentos', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Comunicação Profissional e Seus Fundamentos (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Os Elementos da Comunicação', 'A'),
      (v_atividade, 2, 'O Papel do Emissor', 'B'),
      (v_atividade, 3, 'O Receptor', 'C'),
      (v_atividade, 4, 'O Canal', 'D'),
      (v_atividade, 5, 'A Mensagem', 'A'),
      (v_atividade, 6, 'O Código Compartilhado', 'B'),
      (v_atividade, 7, 'Função do Feedback', 'D'),
      (v_atividade, 8, 'Circuito Fechado', 'C'),
      (v_atividade, 9, 'Ordem do Feedback', 'B'),
      (v_atividade, 10, 'Identificando o Erro', 'A'),
      (v_atividade, 11, 'TIC nas Organizações', 'C'),
      (v_atividade, 12, 'Conceito de Ruído', 'B'),
      (v_atividade, 13, 'Ruído Físico', 'D'),
      (v_atividade, 14, 'Ruído Técnico', 'A'),
      (v_atividade, 15, 'Ruído Semântico', 'C'),
      (v_atividade, 16, 'Ruído Psicológico', 'B'),
      (v_atividade, 17, 'Ruído Não É Só Técnico', 'D'),
      (v_atividade, 18, 'Mitigando Ruídos', 'A'),
      (v_atividade, 19, 'Formalizar por Escrito', 'B'),
      (v_atividade, 20, 'Escolha do Canal', 'C'),
      (v_atividade, 21, 'Assertividade', 'D'),
      (v_atividade, 22, 'Estilo Passivo', 'A'),
      (v_atividade, 23, 'Estilo Agressivo', 'B'),
      (v_atividade, 24, 'Estilo Assertivo', 'C'),
      (v_atividade, 25, 'Efeitos dos Estilos Inadequados', 'D'),
      (v_atividade, 26, 'Empatia', 'A'),
      (v_atividade, 27, 'Escuta Ativa', 'B'),
      (v_atividade, 28, 'Frase de Validação', 'C'),
      (v_atividade, 29, 'Níveis de Fala', 'D'),
      (v_atividade, 30, 'Linguagem Culta', 'B'),
      (v_atividade, 31, 'Linguagem Técnica', 'A'),
      (v_atividade, 32, 'Jargão Profissional', 'C'),
      (v_atividade, 33, 'Adequação Vocabular', 'D'),
      (v_atividade, 34, 'Explicando ao Cliente', 'B'),
      (v_atividade, 35, 'Pares e Clientes', 'A'),
      (v_atividade, 36, 'Trabalho em Equipe', 'B'),
      (v_atividade, 37, 'Consenso', 'C'),
      (v_atividade, 38, 'Risco da Imposição', 'D'),
      (v_atividade, 39, 'Conflito Construtivo', 'A'),
      (v_atividade, 40, 'Critérios Objetivos', 'B'),
      (v_atividade, 41, 'Amabilidade', 'C'),
      (v_atividade, 42, 'Cooperação', 'D'),
      (v_atividade, 43, 'Respeito à Hierarquia', 'A'),
      (v_atividade, 44, 'Abertura à Mudança', 'B'),
      (v_atividade, 45, 'Ética na Informação', 'C'),
      (v_atividade, 46, 'Relatar os Fatos', 'D'),
      (v_atividade, 47, 'Ocultar Falhas', 'A'),
      (v_atividade, 48, 'Sequência do Alinhamento', 'B'),
      (v_atividade, 49, 'Comunicado Eficaz', 'C'),
      (v_atividade, 50, 'Estudo de Caso', 'D');

  -- Aula 2: Hardware, Periféricos e Sistemas Operacionais
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Hardware, Periféricos e Sistemas Operacionais' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (2, 'Hardware, Periféricos e Sistemas Operacionais', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Hardware, Periféricos e Sistemas Operacionais', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Hardware, Periféricos e Sistemas Operacionais (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-02-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Hardware ou Software?', 'B'),
      (v_atividade, 2, 'O Processador (CPU)', 'C'),
      (v_atividade, 3, 'Memória RAM', 'B'),
      (v_atividade, 4, 'HDD ou SSD?', 'B'),
      (v_atividade, 5, 'Computador como Canal', 'D'),
      (v_atividade, 6, 'Classificação de Periféricos', 'B'),
      (v_atividade, 7, 'Periféricos: Entrada, Saída ou Ambos', 'B'),
      (v_atividade, 8, 'Conexões de Rede', 'B'),
      (v_atividade, 9, 'Uso Correto de Periféricos', 'C'),
      (v_atividade, 10, 'Funções do Sistema Operacional', 'D'),
      (v_atividade, 11, 'Tipos de Sistema Operacional', 'B'),
      (v_atividade, 12, 'Elementos da Interface Gráfica', 'B'),
      (v_atividade, 13, 'Atalhos de Teclado', 'C'),
      (v_atividade, 14, 'Nomenclatura Profissional de Arquivos', 'C'),
      (v_atividade, 15, 'Estrutura de Diretórios', 'A'),
      (v_atividade, 16, 'Pesquisa com Curinga', 'C'),
      (v_atividade, 17, 'Procedimento de Compactação', 'C'),
      (v_atividade, 18, 'Diagnóstico de Falhas de Hardware', 'B'),
      (v_atividade, 19, 'Backup 3-2-1', 'B'),
      (v_atividade, 20, 'Boas Práticas de Organização', 'D'),
      (v_atividade, 21, 'Componentes da Placa-Mãe', 'B'),
      (v_atividade, 22, 'Extensões de Arquivo', 'C'),
      (v_atividade, 23, 'Periférico de Entrada/Saída', 'C'),
      (v_atividade, 24, 'Vantagem do SSD', 'C'),
      (v_atividade, 25, 'Manutenção Preventiva', 'D'),
      (v_atividade, 26, 'Superaquecimento', 'D'),
      (v_atividade, 27, 'Armazenamento em Nuvem', 'C'),
      (v_atividade, 28, 'Conexão USB', 'B'),
      (v_atividade, 29, 'Lentidão ao Salvar', 'C'),
      (v_atividade, 30, 'Profissionalismo com Arquivos', 'B'),
      (v_atividade, 31, 'A Máquina de Von Neumann', 'B'),
      (v_atividade, 32, 'Partes da CPU', 'D'),
      (v_atividade, 33, 'Registradores', 'A'),
      (v_atividade, 34, 'Pouca Memória RAM', 'C'),
      (v_atividade, 35, 'Encaixes da Placa-Mãe', 'B'),
      (v_atividade, 36, 'Chipset', 'D'),
      (v_atividade, 37, 'Conexão de Vídeo', 'A'),
      (v_atividade, 38, 'Drivers Atualizados', 'C'),
      (v_atividade, 39, 'Impressora Padrão', 'D'),
      (v_atividade, 40, 'O SO e os Dispositivos', 'B'),
      (v_atividade, 41, 'Camadas do Sistema', 'D'),
      (v_atividade, 42, 'Linux no Mercado', 'A'),
      (v_atividade, 43, 'Proprietário × Código Aberto', 'C'),
      (v_atividade, 44, 'Mover com o Teclado', 'B'),
      (v_atividade, 45, 'Desfazer uma Ação', 'A'),
      (v_atividade, 46, 'Dados Exportados do WMS', 'C'),
      (v_atividade, 47, 'Documento Formal', 'B'),
      (v_atividade, 48, 'Pesquisa por Tamanho', 'D'),
      (v_atividade, 49, 'Extrair Arquivos', 'C'),
      (v_atividade, 50, 'Contas com Privilégio Limitado', 'B');

  -- Aula 3: Navegação na Web e Pesquisa Acadêmica
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Navegação na Web e Pesquisa Acadêmica' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (3, 'Navegação na Web e Pesquisa Acadêmica', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Navegação na Web e Pesquisa Acadêmica', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Navegação na Web e Pesquisa Acadêmica (25 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-03-50-QUESTOES.html', 25)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Navegador', 'B'),
      (v_atividade, 2, 'Internet e Web', 'D'),
      (v_atividade, 3, 'Tradução DNS', 'A'),
      (v_atividade, 4, 'Cache', 'D'),
      (v_atividade, 5, 'Cookies', 'A'),
      (v_atividade, 6, 'Extensões', 'B'),
      (v_atividade, 7, 'Mito da Navegação Anônima', 'A'),
      (v_atividade, 8, 'Fases do Buscador', 'C'),
      (v_atividade, 9, 'Operador AND', 'C'),
      (v_atividade, 10, 'Excluindo Termos', 'D'),
      (v_atividade, 11, 'Aspas na Busca', 'B'),
      (v_atividade, 12, 'Operador site:', 'C'),
      (v_atividade, 13, 'Operador filetype:', 'D'),
      (v_atividade, 14, 'Google Acadêmico', 'B'),
      (v_atividade, 15, 'CRAAP: Autoridade', 'A'),
      (v_atividade, 16, 'Fonte Duvidosa', 'C'),
      (v_atividade, 17, 'Extensão Dupla', 'A'),
      (v_atividade, 18, 'Lei 9.610/98', 'C'),
      (v_atividade, 19, 'Disponível Não É Público', 'D'),
      (v_atividade, 20, 'Licença CC BY', 'A'),
      (v_atividade, 21, 'Licença CC NC', 'B'),
      (v_atividade, 22, 'Plágio Mosaico', 'A'),
      (v_atividade, 23, 'Citação Direta Curta', 'C'),
      (v_atividade, 24, 'Política de Uso Aceitável', 'B'),
      (v_atividade, 25, 'Fluxo de Pesquisa', 'D');

  -- Aula 4: Comunicação Digital e Colaboração em Nuvem
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Comunicação Digital e Colaboração em Nuvem' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (4, 'Comunicação Digital e Colaboração em Nuvem', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Comunicação Digital e Colaboração em Nuvem', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Comunicação Digital e Colaboração em Nuvem (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-04-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O E-mail como Documento', 'C'),
      (v_atividade, 2, 'Anatomia do E-mail', 'A'),
      (v_atividade, 3, 'Assunto Vago', 'D'),
      (v_atividade, 4, 'Assunto Ideal', 'B'),
      (v_atividade, 5, 'Saudação Adequada', 'D'),
      (v_atividade, 6, 'Fechamento', 'B'),
      (v_atividade, 7, 'Campo "Para"', 'C'),
      (v_atividade, 8, 'Campo CC', 'A'),
      (v_atividade, 9, 'Campo CCO', 'A'),
      (v_atividade, 10, 'CCO e LGPD', 'C'),
      (v_atividade, 11, 'Anexo Pesado', 'B'),
      (v_atividade, 12, 'Limite para Anexos', 'D'),
      (v_atividade, 13, 'Formato do Documento Final', 'B'),
      (v_atividade, 14, 'O Anexo Esquecido', 'D'),
      (v_atividade, 15, 'CAPS LOCK', 'A'),
      (v_atividade, 16, 'Responder a Todos', 'C'),
      (v_atividade, 17, 'Confirmação de Recebimento', 'C'),
      (v_atividade, 18, 'Horário Comercial', 'A'),
      (v_atividade, 19, 'Computação em Nuvem', 'D'),
      (v_atividade, 20, 'Onde Ficam os Dados', 'B'),
      (v_atividade, 21, 'Armazenamento em Nuvem', 'D'),
      (v_atividade, 22, 'Aplicações SaaS', 'B'),
      (v_atividade, 23, 'Organização de Pastas', 'C'),
      (v_atividade, 24, 'Formato de Data', 'A'),
      (v_atividade, 25, 'Sincronização', 'A'),
      (v_atividade, 26, 'Edição Offline', 'C'),
      (v_atividade, 27, 'Ícones de Status', 'B'),
      (v_atividade, 28, 'Permissão de Leitor', 'D'),
      (v_atividade, 29, 'Permissão de Comentador', 'B'),
      (v_atividade, 30, 'Permissão de Editor', 'D'),
      (v_atividade, 31, 'Link Público', 'A'),
      (v_atividade, 32, 'Colaboração em Tempo Real', 'C'),
      (v_atividade, 33, 'Identificação dos Colaboradores', 'C'),
      (v_atividade, 34, 'Histórico de Versões', 'A'),
      (v_atividade, 35, 'Nomear Versões', 'D'),
      (v_atividade, 36, 'Menções', 'B'),
      (v_atividade, 37, 'Resolver Comentário', 'D'),
      (v_atividade, 38, 'Criar e Compartilhar Pasta', 'B'),
      (v_atividade, 39, 'Comunicação Assíncrona', 'C'),
      (v_atividade, 40, 'Mensagem Completa', 'A'),
      (v_atividade, 41, 'Ruído em Equipes Remotas', 'A'),
      (v_atividade, 42, 'Estratégia de Alinhamento', 'C'),
      (v_atividade, 43, 'Rastros Digitais', 'B'),
      (v_atividade, 44, 'Cyberbullying', 'D'),
      (v_atividade, 45, 'Sabotagem', 'B'),
      (v_atividade, 46, 'Como Denunciar', 'D'),
      (v_atividade, 47, 'Não Revidar', 'A'),
      (v_atividade, 48, 'Leis de Proteção', 'C'),
      (v_atividade, 49, 'Debate: Pasta Pública', 'C'),
      (v_atividade, 50, 'Prática Correta', 'A');

  -- Aula 5: Segurança da Informação e Proteção de Dados
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Segurança da Informação e Proteção de Dados' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (5, 'Segurança da Informação e Proteção de Dados', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Segurança da Informação e Proteção de Dados', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Segurança da Informação e Proteção de Dados (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-05-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Confidencialidade', 'D'),
      (v_atividade, 2, 'Integridade Violada', 'B'),
      (v_atividade, 3, 'Disponibilidade Violada', 'A'),
      (v_atividade, 4, 'Confidencialidade Violada', 'C'),
      (v_atividade, 5, 'Tríade CIA', 'A'),
      (v_atividade, 6, 'Protegendo a Integridade', 'C'),
      (v_atividade, 7, 'Protegendo a Disponibilidade', 'D'),
      (v_atividade, 8, 'Criptografia', 'B'),
      (v_atividade, 9, 'Lei Carolina Dieckmann', 'B'),
      (v_atividade, 10, 'Invasão no Trabalho', 'D'),
      (v_atividade, 11, 'Código Penal', 'C'),
      (v_atividade, 12, 'O Que a LGPD Regula', 'A'),
      (v_atividade, 13, 'Número da LGPD', 'C'),
      (v_atividade, 14, 'Finalidade da Coleta', 'A'),
      (v_atividade, 15, 'Multas da LGPD', 'B'),
      (v_atividade, 16, 'ANPD', 'D'),
      (v_atividade, 17, 'Dado Pessoal Comum', 'D'),
      (v_atividade, 18, 'Dado Pessoal Sensível', 'B'),
      (v_atividade, 19, 'Guardar para Sempre', 'A'),
      (v_atividade, 20, 'Vírus', 'C'),
      (v_atividade, 21, 'Worm', 'A'),
      (v_atividade, 22, 'Trojan', 'C'),
      (v_atividade, 23, 'Ransomware', 'D'),
      (v_atividade, 24, 'Pagar o Resgate?', 'B'),
      (v_atividade, 25, 'Keylogger', 'B'),
      (v_atividade, 26, 'Adware', 'D'),
      (v_atividade, 27, 'Engenharia Social', 'C'),
      (v_atividade, 28, 'Sinais de Phishing', 'A'),
      (v_atividade, 29, 'Phishing', 'C'),
      (v_atividade, 30, 'Senha Forte', 'A'),
      (v_atividade, 31, 'Tamanho da Senha', 'B'),
      (v_atividade, 32, 'Reutilizar Senhas', 'D'),
      (v_atividade, 33, 'Senha no Post-it', 'D'),
      (v_atividade, 34, 'Autenticação em Dois Fatores', 'B'),
      (v_atividade, 35, '"Algo que Você Tem"', 'A'),
      (v_atividade, 36, '"Algo que Você É"', 'C'),
      (v_atividade, 37, 'HTTPS', 'A'),
      (v_atividade, 38, 'O Cadeado Não Basta', 'C'),
      (v_atividade, 39, 'VPN', 'D'),
      (v_atividade, 40, 'Wi-Fi Público', 'B'),
      (v_atividade, 41, 'Conexão Remota Segura', 'B'),
      (v_atividade, 42, 'Regra 3-2-1', 'D'),
      (v_atividade, 43, 'Cópia Externa', 'C'),
      (v_atividade, 44, 'Celular Corporativo', 'A'),
      (v_atividade, 45, 'Instalação de Aplicativos', 'C'),
      (v_atividade, 46, 'Caso do Pen Drive', 'A'),
      (v_atividade, 47, 'Bloquear a Tela', 'B'),
      (v_atividade, 48, 'Reportar Incidentes', 'D'),
      (v_atividade, 49, 'Fator Humano', 'D'),
      (v_atividade, 50, 'Auditoria de Risco', 'B');

  -- Aula 5: Segurança da Informação e Proteção de Dados
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Segurança da Informação e Proteção de Dados' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (5, 'Segurança da Informação e Proteção de Dados', v_materia, v_curso, '2026-09-30')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Avaliação Objetiva 01', 'PENDENTE', v_aula, '2026-09-30',
      'Atividade — Avaliação Objetiva 01 (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/AVALIACAO-OBJETIVA-01.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Elementos da Comunicação', 'A'),
      (v_atividade, 2, 'Função do Feedback', 'C'),
      (v_atividade, 3, 'Ruído Semântico', 'A'),
      (v_atividade, 4, 'Comunicação Assertiva', 'B'),
      (v_atividade, 5, 'Código Compartilhado', 'A'),
      (v_atividade, 6, 'Mitigação de Ruídos', 'C'),
      (v_atividade, 7, 'Consenso em Equipe', 'B'),
      (v_atividade, 8, 'Adequação ao Público', 'A'),
      (v_atividade, 9, 'Ética na Informação', 'A'),
      (v_atividade, 10, 'Alinhamento Profissional', 'C'),
      (v_atividade, 11, 'Processamento', 'C'),
      (v_atividade, 12, 'Memória RAM', 'C'),
      (v_atividade, 13, 'HDD × SSD', 'D'),
      (v_atividade, 14, 'Periférico de Entrada e Saída', 'B'),
      (v_atividade, 15, 'Retirada Segura', 'C'),
      (v_atividade, 16, 'Papel do Sistema Operacional', 'A'),
      (v_atividade, 17, 'Nomenclatura de Arquivos', 'A'),
      (v_atividade, 18, 'Compactar e Enviar', 'D'),
      (v_atividade, 19, 'Diagnóstico de Periférico', 'B'),
      (v_atividade, 20, 'Arquitetura de Von Neumann', 'D'),
      (v_atividade, 21, 'Internet × Web', 'A'),
      (v_atividade, 22, 'Operadores de Busca', 'C'),
      (v_atividade, 23, 'Navegação Anônima', 'B'),
      (v_atividade, 24, 'Método CRAAP', 'A'),
      (v_atividade, 25, 'Motores de Busca', 'D'),
      (v_atividade, 26, 'Direitos Autorais', 'D'),
      (v_atividade, 27, 'Creative Commons', 'B'),
      (v_atividade, 28, 'Tipos de Plágio', 'A'),
      (v_atividade, 29, 'Citação ABNT', 'B'),
      (v_atividade, 30, 'Download Seguro', 'B'),
      (v_atividade, 31, 'E-mail Corporativo', 'C'),
      (v_atividade, 32, 'Uso do CCO', 'D'),
      (v_atividade, 33, 'Assunto do E-mail', 'C'),
      (v_atividade, 34, 'Anexos Grandes', 'D'),
      (v_atividade, 35, 'Permissões na Nuvem', 'D'),
      (v_atividade, 36, 'Histórico de Versões', 'B'),
      (v_atividade, 37, 'Comunicação Assíncrona', 'B'),
      (v_atividade, 38, 'Menções nos Comentários', 'A'),
      (v_atividade, 39, 'Denúncia de Abusos', 'D'),
      (v_atividade, 40, 'Netiqueta', 'B'),
      (v_atividade, 41, 'Tríade CIA', 'C'),
      (v_atividade, 42, 'Disponibilidade', 'A'),
      (v_atividade, 43, 'Lei Carolina Dieckmann', 'D'),
      (v_atividade, 44, 'LGPD', 'D'),
      (v_atividade, 45, 'Dados Sensíveis', 'D'),
      (v_atividade, 46, 'Ransomware', 'C'),
      (v_atividade, 47, 'Worm', 'C'),
      (v_atividade, 48, 'Autenticação em Dois Fatores', 'A'),
      (v_atividade, 49, 'Backup 3-2-1', 'B'),
      (v_atividade, 50, 'VPN no Home Office', 'B');

  -- Aula 6: Editor de Textos: Formatação e Estruturação
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Editor de Textos: Formatação e Estruturação' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (6, 'Editor de Textos: Formatação e Estruturação', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Editor de Textos: Formatação e Estruturação', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Editor de Textos: Formatação e Estruturação (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-06-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Formatação', 'A'),
      (v_atividade, 2, 'Estilo', 'C'),
      (v_atividade, 3, 'Margem', 'B'),
      (v_atividade, 4, 'Formato Aberto', 'D'),
      (v_atividade, 5, 'Barra de Status', 'B'),
      (v_atividade, 6, 'Régua', 'D'),
      (v_atividade, 7, 'Fonte para Impressos', 'A'),
      (v_atividade, 8, 'Evitar Sublinhado', 'C'),
      (v_atividade, 9, 'Dicionário Personalizado', 'D'),
      (v_atividade, 10, 'Alinhamento Justificado', 'A'),
      (v_atividade, 11, 'Alinhamento Centralizado', 'C'),
      (v_atividade, 12, 'Colunas', 'B'),
      (v_atividade, 13, 'Recuo de Primeira Linha', 'C'),
      (v_atividade, 14, 'Espaçamento entre Linhas', 'B'),
      (v_atividade, 15, 'Separar Parágrafos', 'D'),
      (v_atividade, 16, 'Folha A4', 'A'),
      (v_atividade, 17, 'Margens ABNT', 'A'),
      (v_atividade, 18, 'Margem Esquerda', 'C'),
      (v_atividade, 19, 'Orientação Paisagem', 'B'),
      (v_atividade, 20, 'Listas Multiníveis', 'D'),
      (v_atividade, 21, 'Bordas e Sombreamento', 'B'),
      (v_atividade, 22, 'Cabeçalho da Tabela', 'D'),
      (v_atividade, 23, 'Números em Tabelas', 'A'),
      (v_atividade, 24, 'Bordas de Tabela', 'C'),
      (v_atividade, 25, 'Legenda de Figuras', 'D'),
      (v_atividade, 26, 'Gráfico no Documento', 'A'),
      (v_atividade, 27, 'Erro Comum nos Títulos', 'C'),
      (v_atividade, 28, 'Alteração Global', 'B'),
      (v_atividade, 29, 'Requisito do Sumário', 'C'),
      (v_atividade, 30, 'Ordem do Sumário', 'B'),
      (v_atividade, 31, 'Atualizar o Sumário', 'D'),
      (v_atividade, 32, 'Quebra de Página', 'A'),
      (v_atividade, 33, 'Quebra de Seção', 'A'),
      (v_atividade, 34, 'Sem Quebra de Seção', 'C'),
      (v_atividade, 35, 'Cabeçalho', 'B'),
      (v_atividade, 36, 'Desvincular do Anterior', 'D'),
      (v_atividade, 37, 'Numeração pelas Normas', 'B'),
      (v_atividade, 38, 'Localizar e Substituir', 'D'),
      (v_atividade, 39, 'Atalho de Substituição', 'A'),
      (v_atividade, 40, 'Verificação Ortográfica', 'C'),
      (v_atividade, 41, 'Controle de Alterações', 'D'),
      (v_atividade, 42, 'Aceitar ou Rejeitar', 'A'),
      (v_atividade, 43, 'Revisão Respeitosa', 'C'),
      (v_atividade, 44, 'Modos de Exibição', 'B'),
      (v_atividade, 45, 'Linhas Órfãs e Viúvas', 'C'),
      (v_atividade, 46, 'Pré-Visualização', 'B'),
      (v_atividade, 47, 'Vantagem do PDF', 'D'),
      (v_atividade, 48, 'PDF e Privacidade', 'A'),
      (v_atividade, 49, 'Proposta em .docx', 'A'),
      (v_atividade, 50, 'Padrão da Prática', 'C');

  -- Aula 7: Textos Técnicos e Redação Empresarial
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Textos Técnicos e Redação Empresarial' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (7, 'Textos Técnicos e Redação Empresarial', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Textos Técnicos e Redação Empresarial', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Textos Técnicos e Redação Empresarial (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-07-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Texto Técnico', 'B'),
      (v_atividade, 2, 'Relatório', 'A'),
      (v_atividade, 3, 'Ata', 'C'),
      (v_atividade, 4, 'Norma', 'D'),
      (v_atividade, 5, 'Clareza', 'D'),
      (v_atividade, 6, 'Concisão', 'C'),
      (v_atividade, 7, 'Objetividade', 'A'),
      (v_atividade, 8, 'Impessoalidade', 'B'),
      (v_atividade, 9, 'Frase Impessoal', 'C'),
      (v_atividade, 10, 'Expressões a Evitar', 'D'),
      (v_atividade, 11, 'NBR 14724', 'B'),
      (v_atividade, 12, 'NBR 6023', 'A'),
      (v_atividade, 13, 'ISO 9001', 'A'),
      (v_atividade, 14, 'ISO/IEC 27001', 'B'),
      (v_atividade, 15, 'Aplicação das Normas', 'D'),
      (v_atividade, 16, 'Partes do Relatório', 'C'),
      (v_atividade, 17, 'Parte Pós-Textual', 'B'),
      (v_atividade, 18, 'Parte Pré-Textual', 'A'),
      (v_atividade, 19, 'Relatório de Incidente', 'C'),
      (v_atividade, 20, 'Fluxo do Relatório', 'D'),
      (v_atividade, 21, 'Norma IEEE 802.3', 'D'),
      (v_atividade, 22, 'Finalidade da Ata', 'C'),
      (v_atividade, 23, 'Verbos da Ata', 'A'),
      (v_atividade, 24, 'Números por Extenso', 'B'),
      (v_atividade, 25, 'A Expressão "Digo"', 'C'),
      (v_atividade, 26, 'Norma ANSI Z535', 'D'),
      (v_atividade, 27, 'Ordem da Ata', 'B'),
      (v_atividade, 28, 'Memorando', 'A'),
      (v_atividade, 29, 'Ofício', 'A'),
      (v_atividade, 30, 'Interpretar um Documento', 'B'),
      (v_atividade, 31, 'Ficha com Dados de Segurança', 'D'),
      (v_atividade, 32, 'Resumo Informativo', 'C'),
      (v_atividade, 33, 'Fato ou Recomendação', 'B'),
      (v_atividade, 34, 'Declarar a Norma', 'A'),
      (v_atividade, 35, 'Estilo de Citação IEEE', 'C'),
      (v_atividade, 36, 'Verbos no POP', 'D'),
      (v_atividade, 37, 'POP para Novatos', 'D'),
      (v_atividade, 38, 'Alertas e EPIs', 'C'),
      (v_atividade, 39, 'Ordem de Serviço', 'A'),
      (v_atividade, 40, 'Campos da OS', 'B'),
      (v_atividade, 41, 'Identificação do Ativo', 'C'),
      (v_atividade, 42, 'Relatório para a Diretoria', 'D'),
      (v_atividade, 43, 'Prolixidade', 'B'),
      (v_atividade, 44, 'Juízo de Valor', 'A'),
      (v_atividade, 45, 'Substituir Adjetivos', 'A'),
      (v_atividade, 46, 'Completar a Frase', 'B'),
      (v_atividade, 47, 'Reescrita Técnica', 'D'),
      (v_atividade, 48, 'Tempo de Indisponibilidade', 'C'),
      (v_atividade, 49, 'Causa Raiz', 'B'),
      (v_atividade, 50, 'Responsabilidade na OS', 'A');

  -- Aula 8: Editor de Planilhas: Organização e Fórmulas
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Editor de Planilhas: Organização e Fórmulas' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (8, 'Editor de Planilhas: Organização e Fórmulas', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Editor de Planilhas: Organização e Fórmulas', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Editor de Planilhas: Organização e Fórmulas (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-08-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Célula', 'C'),
      (v_atividade, 2, 'Início da Fórmula', 'D'),
      (v_atividade, 3, 'Função', 'A'),
      (v_atividade, 4, 'Identificação das Colunas', 'B'),
      (v_atividade, 5, 'Endereço da Célula', 'A'),
      (v_atividade, 6, 'Referência Inválida', 'B'),
      (v_atividade, 7, 'Intervalo', 'C'),
      (v_atividade, 8, 'Alinhamento de Números', 'D'),
      (v_atividade, 9, 'Dado de Texto', 'D'),
      (v_atividade, 10, 'Formato Moeda', 'C'),
      (v_atividade, 11, 'Cálculo com Datas', 'B'),
      (v_atividade, 12, 'Destaque de Estoque Baixo', 'A'),
      (v_atividade, 13, 'Operador de Multiplicação', 'B'),
      (v_atividade, 14, 'Função CONT.VALORES', 'A'),
      (v_atividade, 15, 'Ordem de Precedência', 'D'),
      (v_atividade, 16, 'Fórmula Dinâmica', 'C'),
      (v_atividade, 17, 'Por Que Usar Referências', 'C'),
      (v_atividade, 18, 'Função SOMA', 'D'),
      (v_atividade, 19, 'Função MÉDIA', 'A'),
      (v_atividade, 20, 'Dois Pontos e Ponto e Vírgula', 'B'),
      (v_atividade, 21, 'Contar Pedidos Atrasados', 'A'),
      (v_atividade, 22, 'Sintaxe do CONT.SE', 'B'),
      (v_atividade, 23, 'Estrutura da Função SE', 'C'),
      (v_atividade, 24, 'Escrevendo o SE', 'D'),
      (v_atividade, 25, 'Texto entre Aspas', 'D'),
      (v_atividade, 26, 'Resultado do SE (Verdadeiro)', 'C'),
      (v_atividade, 27, 'Contando Itens do Inventário', 'B'),
      (v_atividade, 28, 'Ordenação Decrescente', 'A'),
      (v_atividade, 29, 'Cuidado ao Ordenar', 'B'),
      (v_atividade, 30, 'O Filtro Não Apaga', 'A'),
      (v_atividade, 31, 'Filtrar uma Região', 'D'),
      (v_atividade, 32, 'Ordem para Filtrar', 'C'),
      (v_atividade, 33, 'Congelar Linha Superior', 'C'),
      (v_atividade, 34, 'Congelar Primeira Coluna', 'D'),
      (v_atividade, 35, 'Proteger Fórmulas', 'A'),
      (v_atividade, 36, 'Células de Entrada', 'B'),
      (v_atividade, 37, 'Afirmação Verdadeira', 'A'),
      (v_atividade, 38, 'Área de Impressão', 'B'),
      (v_atividade, 39, 'Ajustar para Uma Página', 'C'),
      (v_atividade, 40, 'Orientação Paisagem', 'D'),
      (v_atividade, 41, 'Repetir Linhas no Topo', 'D'),
      (v_atividade, 42, 'Rodapé do Relatório', 'C'),
      (v_atividade, 43, 'Formato CSV', 'B'),
      (v_atividade, 44, 'Exportação do WMS', 'A'),
      (v_atividade, 45, 'Separador no Brasil', 'B'),
      (v_atividade, 46, 'Acentos Quebrados', 'A'),
      (v_atividade, 47, 'Tudo na Coluna A', 'D'),
      (v_atividade, 48, 'Cálculo por Item', 'C'),
      (v_atividade, 49, 'Auditoria Orçamentária', 'C'),
      (v_atividade, 50, 'Decisões com Planilhas', 'D');

  -- Aula 9: Planilhas Eletrônicas: Análise Visual e Gráficos
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Planilhas Eletrônicas: Análise Visual e Gráficos' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (9, 'Planilhas Eletrônicas: Análise Visual e Gráficos', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Planilhas Eletrônicas: Análise Visual e Gráficos', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Planilhas Eletrônicas: Análise Visual e Gráficos (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-09-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Gráfico', 'D'),
      (v_atividade, 2, 'Legenda', 'A'),
      (v_atividade, 3, 'Indicador', 'B'),
      (v_atividade, 4, 'Validação', 'C'),
      (v_atividade, 5, 'Por Que Visualizar', 'C'),
      (v_atividade, 6, 'Tabela × Painel', 'D'),
      (v_atividade, 7, 'Escolha do Gráfico', 'A'),
      (v_atividade, 8, 'Gráfico de Colunas', 'B'),
      (v_atividade, 9, 'Gráfico de Linhas', 'B'),
      (v_atividade, 10, 'Gráfico de Barras', 'C'),
      (v_atividade, 11, 'Gráfico de Pizza', 'D'),
      (v_atividade, 12, 'Número de Fatias', 'A'),
      (v_atividade, 13, 'Soma das Fatias', 'A'),
      (v_atividade, 14, 'Muitas Categorias', 'B'),
      (v_atividade, 15, 'Eixo X no Gráfico de Linhas', 'C'),
      (v_atividade, 16, 'Consumo de Energia', 'D'),
      (v_atividade, 17, 'Primeiro Passo', 'D'),
      (v_atividade, 18, 'Ordem de Inserção', 'A'),
      (v_atividade, 19, 'Título do Gráfico', 'B'),
      (v_atividade, 20, 'Unidades nos Eixos', 'C'),
      (v_atividade, 21, 'Rótulos de Dados', 'C'),
      (v_atividade, 22, 'Legenda Desnecessária', 'D'),
      (v_atividade, 23, 'Legenda Indispensável', 'A'),
      (v_atividade, 24, 'Legenda Obrigatória?', 'B'),
      (v_atividade, 25, 'Quadro Demonstrativo', 'B'),
      (v_atividade, 26, 'Milhares de Notas', 'C'),
      (v_atividade, 27, 'Hierarquia do Quadro', 'D'),
      (v_atividade, 28, 'Cidade Digitada Errado', 'A'),
      (v_atividade, 29, 'Lista Suspensa', 'A'),
      (v_atividade, 30, 'Intervalo Numérico', 'B'),
      (v_atividade, 31, 'Limite de Caracteres', 'C'),
      (v_atividade, 32, 'Filtro de Datas', 'D'),
      (v_atividade, 33, 'Completar a Frase', 'D'),
      (v_atividade, 34, 'KPIs', 'A'),
      (v_atividade, 35, 'Tendência', 'B'),
      (v_atividade, 36, 'Aderência à Meta', 'C'),
      (v_atividade, 37, 'Variabilidade', 'C'),
      (v_atividade, 38, 'Infográfico', 'D'),
      (v_atividade, 39, 'Acessibilidade', 'A'),
      (v_atividade, 40, 'Cores Inadequadas', 'B'),
      (v_atividade, 41, 'Imagem Estática', 'B'),
      (v_atividade, 42, 'Slide Sempre Atualizado', 'C'),
      (v_atividade, 43, 'Vínculo de Dados', 'D'),
      (v_atividade, 44, 'Eixo Truncado', 'A'),
      (v_atividade, 45, 'Efeito 3D', 'A'),
      (v_atividade, 46, 'Norma em Documentos Técnicos', 'B'),
      (v_atividade, 47, 'Integridade Visual', 'C'),
      (v_atividade, 48, 'Construção do Painel', 'D'),
      (v_atividade, 49, 'Diferença Real', 'D'),
      (v_atividade, 50, 'Credibilidade', 'A');

  -- Aula 10: Editor de Apresentações e TIC
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Editor de Apresentações e TIC' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (10, 'Editor de Apresentações e TIC', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Editor de Apresentações e TIC', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Editor de Apresentações e TIC (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-10-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Função dos Slides', 'B'),
      (v_atividade, 2, 'Slide', 'C'),
      (v_atividade, 3, 'Multimídia', 'D'),
      (v_atividade, 4, 'Narrativa', 'A'),
      (v_atividade, 5, 'Contraste', 'D'),
      (v_atividade, 6, 'Proporção do Slide', 'A'),
      (v_atividade, 7, 'Hierarquia dos Títulos', 'B'),
      (v_atividade, 8, 'Famílias Tipográficas', 'C'),
      (v_atividade, 9, 'Ordem da Narrativa', 'A'),
      (v_atividade, 10, 'Etapa de Complicação', 'D'),
      (v_atividade, 11, 'Etapa de Conclusão', 'C'),
      (v_atividade, 12, 'Slide Mestre', 'B'),
      (v_atividade, 13, 'Trocar o Logotipo', 'C'),
      (v_atividade, 14, 'Quando Configurar o Mestre', 'B'),
      (v_atividade, 15, 'Ícones', 'A'),
      (v_atividade, 16, 'Definir a Proporção Antes', 'D'),
      (v_atividade, 17, 'Duração dos Vídeos', 'B'),
      (v_atividade, 18, 'Execução do Vídeo', 'C'),
      (v_atividade, 19, 'Antes de Usar Mídias', 'D'),
      (v_atividade, 20, 'Objeto Vinculado', 'A'),
      (v_atividade, 21, 'Vínculo com a Planilha', 'D'),
      (v_atividade, 22, 'Retrato Fixo', 'A'),
      (v_atividade, 23, 'Hiperlinks Internos', 'B'),
      (v_atividade, 24, 'Formato de Exibição', 'C'),
      (v_atividade, 25, 'Transição Recomendada', 'A'),
      (v_atividade, 26, 'Efeitos Exagerados', 'D'),
      (v_atividade, 27, 'Modo Apresentador', 'C'),
      (v_atividade, 28, 'Exportar em PDF', 'B'),
      (v_atividade, 29, 'Contato Visual', 'C'),
      (v_atividade, 30, 'Postura', 'B'),
      (v_atividade, 31, 'O Emissor', 'A'),
      (v_atividade, 32, 'O Canal', 'D'),
      (v_atividade, 33, 'O Feedback', 'B'),
      (v_atividade, 34, 'Ruído na Apresentação', 'C'),
      (v_atividade, 35, 'Sobrecarga Cognitiva', 'D'),
      (v_atividade, 36, 'Fluxo de Integração', 'A'),
      (v_atividade, 37, 'Imagem da Internet', 'D'),
      (v_atividade, 38, 'Dados na Tela', 'A'),
      (v_atividade, 39, 'Slides na Nuvem', 'B'),
      (v_atividade, 40, 'Prática Incorreta', 'C'),
      (v_atividade, 41, 'Maturidade Digital', 'A'),
      (v_atividade, 42, 'Ausência do Tom de Voz', 'D'),
      (v_atividade, 43, 'Primeira Etapa do Projeto', 'C'),
      (v_atividade, 44, 'Sustentação Oral', 'B'),
      (v_atividade, 45, 'Apresentação Autoexecutável', 'C'),
      (v_atividade, 46, 'Hipertexto', 'B'),
      (v_atividade, 47, 'Vínculo Dinâmico', 'A'),
      (v_atividade, 48, 'Ruído de Comunicação', 'D'),
      (v_atividade, 49, 'Editor Online', 'B'),
      (v_atividade, 50, 'Profissional Diferenciado', 'C');

  -- Aula 10: Editor de Apresentações e TIC
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Editor de Apresentações e TIC' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (10, 'Editor de Apresentações e TIC', v_materia, v_curso, '2026-09-30')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Avaliação Objetiva 02', 'PENDENTE', v_aula, '2026-09-30',
      'Atividade — Avaliação Objetiva 02 (50 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/AVALIACAO-OBJETIVA-02.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Margens ABNT', 'C'),
      (v_atividade, 2, 'Estilos de Título', 'C'),
      (v_atividade, 3, 'Quebra de Seção', 'D'),
      (v_atividade, 4, 'Espaçamento entre Parágrafos', 'C'),
      (v_atividade, 5, 'Texto Justificado', 'A'),
      (v_atividade, 6, 'Numeração de Páginas', 'D'),
      (v_atividade, 7, 'Controle de Alterações', 'C'),
      (v_atividade, 8, 'Exportação em PDF', 'D'),
      (v_atividade, 9, 'Localizar e Substituir', 'B'),
      (v_atividade, 10, 'Legendas de Figuras', 'B'),
      (v_atividade, 11, 'Impessoalidade', 'D'),
      (v_atividade, 12, 'Memorando e Ofício', 'C'),
      (v_atividade, 13, 'NBR 14724', 'B'),
      (v_atividade, 14, 'ISO/IEC 27001', 'A'),
      (v_atividade, 15, 'Ata de Reunião', 'B'),
      (v_atividade, 16, 'Relatório Post-Mortem', 'A'),
      (v_atividade, 17, 'Procedimento Operacional Padrão', 'D'),
      (v_atividade, 18, 'Resumo Informativo', 'C'),
      (v_atividade, 19, 'Ordem de Serviço', 'A'),
      (v_atividade, 20, 'Reescrita Técnica', 'A'),
      (v_atividade, 21, 'Endereçamento de Células', 'A'),
      (v_atividade, 22, 'Fórmulas Dinâmicas', 'B'),
      (v_atividade, 23, 'Precedência de Operadores', 'A'),
      (v_atividade, 24, 'Função SE', 'B'),
      (v_atividade, 25, 'Função CONT.SE', 'A'),
      (v_atividade, 26, 'CONT.VALORES × CONT.SE', 'B'),
      (v_atividade, 27, 'Filtros', 'D'),
      (v_atividade, 28, 'Congelar Painéis', 'A'),
      (v_atividade, 29, 'CSV no Brasil', 'A'),
      (v_atividade, 30, 'Proteção de Células', 'C'),
      (v_atividade, 31, 'Gráfico de Linhas', 'D'),
      (v_atividade, 32, 'Gráfico de Pizza', 'C'),
      (v_atividade, 33, 'Legenda do Gráfico', 'A'),
      (v_atividade, 34, 'Validação de Dados', 'C'),
      (v_atividade, 35, 'Eixo Truncado', 'C'),
      (v_atividade, 36, 'Vínculo de Dados', 'D'),
      (v_atividade, 37, 'Gráfico de Colunas', 'A'),
      (v_atividade, 38, 'Efeito 3D em Gráficos', 'D'),
      (v_atividade, 39, 'Cores e Acessibilidade', 'B'),
      (v_atividade, 40, 'Construção de Painel', 'B'),
      (v_atividade, 41, 'Slide Mestre', 'C'),
      (v_atividade, 42, 'Papel dos Slides', 'B'),
      (v_atividade, 43, 'Formato do Slide', 'D'),
      (v_atividade, 44, 'Áudio e Vídeo', 'B'),
      (v_atividade, 45, 'Transições Sóbrias', 'A'),
      (v_atividade, 46, 'Objeto Vinculado', 'D'),
      (v_atividade, 47, 'PDF da Apresentação', 'B'),
      (v_atividade, 48, 'Ruído nos Slides', 'D'),
      (v_atividade, 49, 'LGPD em Apresentações', 'C'),
      (v_atividade, 50, 'Fluxo de Integração', 'B');

  -- Aula 11: O Ciclo do Feedback na Comunicação
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'O Ciclo do Feedback na Comunicação' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (11, 'O Ciclo do Feedback na Comunicação', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('O Ciclo do Feedback na Comunicação', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — O Ciclo do Feedback na Comunicação (25 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADES-AULA-28-09-2026-25-QUESTOES.html', 25)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Feedback nas Relações Humanas', 'B'),
      (v_atividade, 2, 'Mensagem Sem Resposta', 'C'),
      (v_atividade, 3, 'Função no Ciclo Comunicativo', 'A'),
      (v_atividade, 4, 'Comunicação Unilateral', 'B'),
      (v_atividade, 5, 'Presunção de Certeza', 'D'),
      (v_atividade, 6, 'Erros Ocultos', 'A'),
      (v_atividade, 7, 'Unilateral ou Bidirecional?', 'D'),
      (v_atividade, 8, 'Foco do Feedback Construtivo', 'A'),
      (v_atividade, 9, 'Estrutura do Feedback Fundamentado', 'C'),
      (v_atividade, 10, 'Retorno Factual', 'D'),
      (v_atividade, 11, 'Objetivo do Feedback Sanduíche', 'B'),
      (v_atividade, 12, 'Ordem das Camadas', 'D'),
      (v_atividade, 13, 'Aplicando a Técnica', 'A'),
      (v_atividade, 14, 'Riscos do Sanduíche', 'B'),
      (v_atividade, 15, 'Postura Defensiva', 'B'),
      (v_atividade, 16, 'Orgulho Excessivo', 'C'),
      (v_atividade, 17, 'Como Reagir a Críticas', 'D'),
      (v_atividade, 18, 'Cultura de Confiança', 'C'),
      (v_atividade, 19, 'Causa dos Atritos em Grupo', 'A'),
      (v_atividade, 20, 'O Ciclo Contínuo de Alinhamento', 'C'),
      (v_atividade, 21, 'Checagem Intermediária', 'D'),
      (v_atividade, 22, 'Estudo de Caso: A Fala Construtiva', 'A'),
      (v_atividade, 23, 'Resultado do Cenário Destrutivo', 'B'),
      (v_atividade, 24, 'Lições do Estudo de Caso', 'C'),
      (v_atividade, 25, 'O Ciclo Completo em Ação', 'B');
end $$;

do $$
declare
  v_curso bigint;
  v_materia bigint;
  v_aula bigint;
  v_atividade bigint;
begin
  select id into v_curso from public.curso where nome_completo = 'Rio do Sul Mais Tech' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Rio do Sul Mais Tech') returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = 'Fundamentos da Tecnologia e Programação' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('Fundamentos da Tecnologia e Programação', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Introdução à Tecnologia e Dispositivos Digitais
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Introdução à Tecnologia e Dispositivos Digitais' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (1, 'Introdução à Tecnologia e Dispositivos Digitais', v_materia, v_curso, '2026-09-29')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Introdução à Tecnologia e Dispositivos Digitais', 'PENDENTE', v_aula, '2026-09-29',
      'Atividade — Introdução à Tecnologia e Dispositivos Digitais (50 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES/ATIVIDADES-AULA-29-09-2026-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'A Missão Apollo 11', 'B'),
      (v_atividade, 2, 'Conceito de Tecnologia', 'D'),
      (v_atividade, 3, 'Origem da Palavra', 'A'),
      (v_atividade, 4, 'Revoluções Tecnológicas', 'C'),
      (v_atividade, 5, 'Tecnologia em Informática', 'B'),
      (v_atividade, 6, 'Vocabulário: Hardware', 'A'),
      (v_atividade, 7, 'Vocabulário: Software', 'D'),
      (v_atividade, 8, 'Vocabulário: Dispositivo', 'C'),
      (v_atividade, 9, 'O ENIAC', 'B'),
      (v_atividade, 10, 'Os Transistores', 'A'),
      (v_atividade, 11, 'O Microchip', 'C'),
      (v_atividade, 12, 'Computação Ubíqua', 'D'),
      (v_atividade, 13, 'Comunicação Instantânea', 'B'),
      (v_atividade, 14, 'Automação de Rotinas', 'A'),
      (v_atividade, 15, 'Uso Responsável', 'C'),
      (v_atividade, 16, 'Computadores', 'D'),
      (v_atividade, 17, 'Smartphones', 'B'),
      (v_atividade, 18, 'Tablets', 'C'),
      (v_atividade, 19, 'Wearables', 'A'),
      (v_atividade, 20, 'Classificando Dispositivos', 'D'),
      (v_atividade, 21, 'Internet das Coisas', 'C'),
      (v_atividade, 22, 'Hardware: O Corpo', 'B'),
      (v_atividade, 23, 'Software: A Mente', 'A'),
      (v_atividade, 24, 'Sem Software', 'D'),
      (v_atividade, 25, 'A CPU', 'C'),
      (v_atividade, 26, 'O Trabalho da CPU', 'B'),
      (v_atividade, 27, 'Memória RAM', 'D'),
      (v_atividade, 28, 'SSD e HD', 'A'),
      (v_atividade, 29, 'Trabalho Perdido', 'C'),
      (v_atividade, 30, 'O Ciclo do Processamento', 'B'),
      (v_atividade, 31, 'Periféricos de Entrada', 'A'),
      (v_atividade, 32, 'Periféricos de Saída', 'D'),
      (v_atividade, 33, 'Dispositivos Híbridos', 'B'),
      (v_atividade, 34, 'Hardware e Periféricos: Teclado', 'A'),
      (v_atividade, 35, 'Sistema Operacional', 'C'),
      (v_atividade, 36, 'Funções do SO', 'B'),
      (v_atividade, 37, 'Windows', 'C'),
      (v_atividade, 38, 'macOS e iOS', 'B'),
      (v_atividade, 39, 'Android', 'A'),
      (v_atividade, 40, 'Linux', 'D'),
      (v_atividade, 41, 'Rede de Computadores', 'B'),
      (v_atividade, 42, 'Wi-Fi não é Internet', 'C'),
      (v_atividade, 43, 'Internet e Intranet', 'A'),
      (v_atividade, 44, 'Como Trafega a Informação', 'D'),
      (v_atividade, 45, 'Caminho da Conexão', 'B'),
      (v_atividade, 46, 'Tecnologia nos Setores', 'C'),
      (v_atividade, 47, 'Acessibilidade Digital', 'A'),
      (v_atividade, 48, 'Tecnologias Assistivas', 'D'),
      (v_atividade, 49, 'Impacto na Comunicação', 'B'),
      (v_atividade, 50, 'Equilíbrio Digital', 'C');

  -- Aula 2: Cidadania Digital e Segurança Online
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Cidadania Digital e Segurança Online' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (2, 'Cidadania Digital e Segurança Online', v_materia, v_curso, '2026-10-06')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Cidadania Digital e Segurança Online', 'PENDENTE', v_aula, '2026-10-06',
      'Atividade — Cidadania Digital e Segurança Online (50 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES/ATIVIDADES-AULA-06-10-2026-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Revisão: Hardware', 'B'),
      (v_atividade, 2, 'Revisão: Software', 'C'),
      (v_atividade, 3, 'Revisão: CPU', 'B'),
      (v_atividade, 4, 'O Rastro Indelével', 'C'),
      (v_atividade, 5, 'Vocabulário: Privacidade', 'A'),
      (v_atividade, 6, 'Vocabulário: Cyberbullying', 'D'),
      (v_atividade, 7, 'Vocabulário: Desinformação', 'A'),
      (v_atividade, 8, 'Vocabulário: Ética', 'B'),
      (v_atividade, 9, 'O que é Cidadania Digital?', 'C'),
      (v_atividade, 10, 'Direitos Digitais', 'C'),
      (v_atividade, 11, 'Deveres Digitais', 'D'),
      (v_atividade, 12, 'Pegada Digital', 'D'),
      (v_atividade, 13, 'Apagar o Rastro', 'C'),
      (v_atividade, 14, 'Rastros Ativos', 'A'),
      (v_atividade, 15, 'Rastros Passivos', 'A'),
      (v_atividade, 16, 'Identificando o Rastro Passivo', 'D'),
      (v_atividade, 17, 'A LGPD', 'B'),
      (v_atividade, 18, 'Consentimento', 'B'),
      (v_atividade, 19, 'Geolocalização', 'B'),
      (v_atividade, 20, 'Perfis Fechados', 'D'),
      (v_atividade, 21, 'Fotos de Terceiros', 'D'),
      (v_atividade, 22, 'Autenticação em Dois Fatores', 'B'),
      (v_atividade, 23, 'Comprimento da Senha', 'D'),
      (v_atividade, 24, 'Complexidade da Senha', 'A'),
      (v_atividade, 25, 'Exclusividade da Senha', 'D'),
      (v_atividade, 26, 'Senha Frágil', 'B'),
      (v_atividade, 27, 'Senha Forte', 'C'),
      (v_atividade, 28, 'Onde Guardar a Senha', 'A'),
      (v_atividade, 29, 'Função do Firewall', 'D'),
      (v_atividade, 30, 'Função do Antivírus', 'B'),
      (v_atividade, 31, 'O que são Fake News', 'C'),
      (v_atividade, 32, 'Por que os Boatos Viajam Rápido', 'B'),
      (v_atividade, 33, 'Checando a Fonte', 'D'),
      (v_atividade, 34, 'Checagem em Veículos', 'C'),
      (v_atividade, 35, 'Pause antes de Compartilhar', 'C'),
      (v_atividade, 36, 'Agências de Checagem', 'A'),
      (v_atividade, 37, 'Mensagem Chocante', 'A'),
      (v_atividade, 38, 'Características do Cyberbullying', 'B'),
      (v_atividade, 39, 'Impactos do Cyberbullying', 'C'),
      (v_atividade, 40, 'Passos de Ação', 'D'),
      (v_atividade, 41, 'SaferNet Brasil', 'D'),
      (v_atividade, 42, 'Disque 100', 'B'),
      (v_atividade, 43, 'Netiqueta', 'A'),
      (v_atividade, 44, 'Regras da Netiqueta', 'C'),
      (v_atividade, 45, 'Plágio Digital', 'A'),
      (v_atividade, 46, 'Creative Commons', 'A'),
      (v_atividade, 47, 'Legislação Digital', 'D'),
      (v_atividade, 48, 'Checklist Seguro', 'C'),
      (v_atividade, 49, 'Debate: Foto Editada', 'A'),
      (v_atividade, 50, 'Atitude Imediata', 'B');

  -- Aula 3: Ferramentas de Produtividade
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Ferramentas de Produtividade' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (3, 'Ferramentas de Produtividade', v_materia, v_curso, '2026-10-27')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Ferramentas de Produtividade', 'PENDENTE', v_aula, '2026-10-27',
      'Atividade — Ferramentas de Produtividade (50 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES/ATIVIDADES-AULA-27-10-2026-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Revisão: Notícia Duvidosa', 'B'),
      (v_atividade, 2, 'Vocabulário: Atalhos', 'A'),
      (v_atividade, 3, 'Vocabulário: Formatação', 'B'),
      (v_atividade, 4, 'Vocabulário: Produtividade', 'B'),
      (v_atividade, 5, 'Por que Digitar com Eficiência', 'D'),
      (v_atividade, 6, 'Ergonomia: Coluna', 'C'),
      (v_atividade, 7, 'Ergonomia: Pés', 'D'),
      (v_atividade, 8, 'Ergonomia: Monitor', 'A'),
      (v_atividade, 9, 'Prevenção da LER', 'A'),
      (v_atividade, 10, 'A Linha-Guia: Mão Esquerda', 'A'),
      (v_atividade, 11, 'A Linha-Guia: Mão Direita', 'C'),
      (v_atividade, 12, 'As Saliências do F e do J', 'B'),
      (v_atividade, 13, 'Dedos Indicadores', 'B'),
      (v_atividade, 14, 'Dedos Médios', 'B'),
      (v_atividade, 15, 'Dedos Anelares', 'D'),
      (v_atividade, 16, 'Mínimos e Polegares', 'B'),
      (v_atividade, 17, 'Treino: Posição Base', 'A'),
      (v_atividade, 18, 'Treino: Precisão', 'D'),
      (v_atividade, 19, 'O Poder dos Atalhos', 'C'),
      (v_atividade, 20, 'Ctrl + C', 'A'),
      (v_atividade, 21, 'Ctrl + X', 'D'),
      (v_atividade, 22, 'Ctrl + V', 'B'),
      (v_atividade, 23, 'Ctrl + Z', 'A'),
      (v_atividade, 24, 'Refazer uma Ação', 'C'),
      (v_atividade, 25, 'Ctrl + A', 'C'),
      (v_atividade, 26, 'Ctrl + F', 'C'),
      (v_atividade, 27, 'Ctrl + S', 'D'),
      (v_atividade, 28, 'Ctrl + P', 'B'),
      (v_atividade, 29, 'Editores de Texto Modernos', 'B'),
      (v_atividade, 30, 'Google Docs', 'B'),
      (v_atividade, 31, 'LibreOffice Writer', 'D'),
      (v_atividade, 32, 'Barra de Menus', 'C'),
      (v_atividade, 33, 'Barra de Ícones', 'A'),
      (v_atividade, 34, 'Área do Documento', 'A'),
      (v_atividade, 35, 'Fonte e Tamanho', 'A'),
      (v_atividade, 36, 'Negrito', 'B'),
      (v_atividade, 37, 'Itálico', 'D'),
      (v_atividade, 38, 'Sublinhado', 'A'),
      (v_atividade, 39, 'Alinhamento à Esquerda e Justificado', 'D'),
      (v_atividade, 40, 'Alinhamento Centralizado', 'D'),
      (v_atividade, 41, 'Listas: Quando Usar', 'C'),
      (v_atividade, 42, 'Inserção de Imagens', 'D'),
      (v_atividade, 43, 'Tabelas', 'A'),
      (v_atividade, 44, 'Hiperlinks', 'B'),
      (v_atividade, 45, 'Revisão Ortográfica', 'D'),
      (v_atividade, 46, 'Formato Editável', 'C'),
      (v_atividade, 47, 'Formato PDF', 'D'),
      (v_atividade, 48, 'Permissões de Compartilhamento', 'C'),
      (v_atividade, 49, 'Etapas de Produção de um Texto', 'C'),
      (v_atividade, 50, 'Nuvem Compartilhada', 'C');

  -- Aula 4: Ferramentas de Apresentação e Pesquisa Online
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Ferramentas de Apresentação e Pesquisa Online' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (4, 'Ferramentas de Apresentação e Pesquisa Online', v_materia, v_curso, '2026-11-03')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Ferramentas de Apresentação e Pesquisa Online', 'PENDENTE', v_aula, '2026-11-03',
      'Atividade — Ferramentas de Apresentação e Pesquisa Online (50 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES/ATIVIDADES-AULA-03-11-2026-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Revisão: Copiar Texto', 'C'),
      (v_atividade, 2, 'Vocabulário: Apresentação', 'A'),
      (v_atividade, 3, 'Vocabulário: Credibilidade', 'C'),
      (v_atividade, 4, 'Por que Apresentar Visualmente', 'D'),
      (v_atividade, 5, 'Google Slides', 'A'),
      (v_atividade, 6, 'Microsoft PowerPoint', 'A'),
      (v_atividade, 7, 'Estrutura: Título', 'C'),
      (v_atividade, 8, 'Estrutura: Introdução', 'D'),
      (v_atividade, 9, 'Estrutura: Conteúdo', 'C'),
      (v_atividade, 10, 'Estrutura: Conclusão', 'A'),
      (v_atividade, 11, 'Ordem da Apresentação', 'D'),
      (v_atividade, 12, 'Layouts', 'D'),
      (v_atividade, 13, 'Consistência Visual', 'A'),
      (v_atividade, 14, 'Imagens', 'C'),
      (v_atividade, 15, 'Vídeos', 'D'),
      (v_atividade, 16, 'Gráficos e Tabelas', 'D'),
      (v_atividade, 17, 'Transições', 'D'),
      (v_atividade, 18, 'Animação de Objetos', 'B'),
      (v_atividade, 19, 'Menos Texto, Mais Impacto', 'D'),
      (v_atividade, 20, 'Hierarquia e Contraste', 'C'),
      (v_atividade, 21, 'Espaço em Branco', 'C'),
      (v_atividade, 22, 'O que é Navegador', 'A'),
      (v_atividade, 23, 'Principais Navegadores', 'D'),
      (v_atividade, 24, 'URL versus Busca', 'B'),
      (v_atividade, 25, 'Mecanismo de Busca', 'B'),
      (v_atividade, 26, 'Abas', 'B'),
      (v_atividade, 27, 'Palavras-Chave', 'C'),
      (v_atividade, 28, 'Termos Genéricos', 'B'),
      (v_atividade, 29, 'Aspas Duplas', 'B'),
      (v_atividade, 30, 'Sinal de Menos', 'D'),
      (v_atividade, 31, 'Operador site:', 'A'),
      (v_atividade, 32, 'Operador filetype:', 'A'),
      (v_atividade, 33, 'Recorte Temporal', 'D'),
      (v_atividade, 34, 'Aplicando Operadores', 'C'),
      (v_atividade, 35, 'Nem Tudo na Web é Fato', 'B'),
      (v_atividade, 36, 'Pilar: Autoridade', 'A'),
      (v_atividade, 37, 'Pilar: Exatidão', 'C'),
      (v_atividade, 38, 'Pilar: Atualidade', 'B'),
      (v_atividade, 39, 'Pilar: Objetividade', 'A'),
      (v_atividade, 40, 'Sinais de Alerta: Sensacionalismo', 'A'),
      (v_atividade, 41, 'Sinais de Alerta: Anúncios', 'B'),
      (v_atividade, 42, 'Favoritos', 'C'),
      (v_atividade, 43, 'Pastas de Favoritos', 'B'),
      (v_atividade, 44, 'Histórico de Navegação', 'C'),
      (v_atividade, 45, 'Reabrir Aba', 'B'),
      (v_atividade, 46, 'Painel de Downloads', 'C'),
      (v_atividade, 47, 'Downloads Seguros', 'A'),
      (v_atividade, 48, 'Primeiros Resultados', 'A'),
      (v_atividade, 49, 'Plágio e Fontes', 'B'),
      (v_atividade, 50, 'Etapas do Trabalho Digital', 'D');

  -- Aula 5: Introdução aos Algoritmos
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Introdução aos Algoritmos' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (5, 'Introdução aos Algoritmos', v_materia, v_curso, '2026-11-10')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Introdução aos Algoritmos', 'PENDENTE', v_aula, '2026-11-10',
      'Atividade — Introdução aos Algoritmos (50 questões)', '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ATIVIDADES/ATIVIDADES-AULA-10-11-2026-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Revisão: Boa Apresentação', 'A'),
      (v_atividade, 2, 'Vocabulário: Algoritmo', 'B'),
      (v_atividade, 3, 'Vocabulário: Fluxograma', 'A'),
      (v_atividade, 4, 'Vocabulário: Lógica', 'C'),
      (v_atividade, 5, 'Vocabulário: Sequência', 'C'),
      (v_atividade, 6, 'Como as Máquinas Pensam', 'C'),
      (v_atividade, 7, 'Organizar o Raciocínio', 'D'),
      (v_atividade, 8, 'Algoritmo: Receita Lógica', 'D'),
      (v_atividade, 9, 'Propriedade: Finitude', 'D'),
      (v_atividade, 10, 'Propriedade: Clareza', 'D'),
      (v_atividade, 11, 'Propriedade: Eficácia', 'B'),
      (v_atividade, 12, 'Algoritmo: Escovar os Dentes', 'D'),
      (v_atividade, 13, 'Algoritmo: Fazer um Bolo', 'D'),
      (v_atividade, 14, 'Algoritmo: Sacar Dinheiro', 'C'),
      (v_atividade, 15, 'Pilar: Decomposição', 'C'),
      (v_atividade, 16, 'Pilar: Padrões', 'C'),
      (v_atividade, 17, 'Pilar: Abstração', 'B'),
      (v_atividade, 18, 'Pilar: Algoritmos', 'B'),
      (v_atividade, 19, 'Os Quatro Pilares', 'B'),
      (v_atividade, 20, 'Decomposição: Jogo Digital', 'B'),
      (v_atividade, 21, 'Padrões: Gravidade', 'A'),
      (v_atividade, 22, 'Abstração: Mapa do Metrô', 'A'),
      (v_atividade, 23, 'Abstrair não é Esquecer', 'C'),
      (v_atividade, 24, 'Importância da Sequência', 'B'),
      (v_atividade, 25, 'Erro Comum', 'D'),
      (v_atividade, 26, 'Atravessar a Rua', 'A'),
      (v_atividade, 27, 'Ordem: Preparar um Chá', 'A'),
      (v_atividade, 28, 'Condicional SE/ENTÃO/SENÃO', 'B'),
      (v_atividade, 29, 'Teste Lógico', 'C'),
      (v_atividade, 30, 'Condicional: Média do Aluno', 'C'),
      (v_atividade, 31, 'Decisões no Trânsito: Verde', 'A'),
      (v_atividade, 32, 'Decisões no Trânsito: Vermelho', 'C'),
      (v_atividade, 33, 'Estruturas de Repetição', 'A'),
      (v_atividade, 34, 'Laço ENQUANTO', 'B'),
      (v_atividade, 35, 'Laço PARA', 'D'),
      (v_atividade, 36, 'Laço Infinito', 'C'),
      (v_atividade, 37, 'Variável de Controle', 'B'),
      (v_atividade, 38, 'SE/ENTÃO não é Repetição', 'A'),
      (v_atividade, 39, 'O que é Fluxograma', 'A'),
      (v_atividade, 40, 'Benefícios do Fluxograma', 'A'),
      (v_atividade, 41, 'Símbolo: Terminal', 'B'),
      (v_atividade, 42, 'Símbolo: Processo', 'C'),
      (v_atividade, 43, 'Símbolo: Decisão', 'A'),
      (v_atividade, 44, 'Símbolo: Dados', 'C'),
      (v_atividade, 45, 'Roteiro do Fluxograma', 'D'),
      (v_atividade, 46, 'Algoritmos de Busca na Web', 'D'),
      (v_atividade, 47, 'Semáforo Inteligente', 'B'),
      (v_atividade, 48, 'Evolução do Algoritmo de Tráfego', 'D'),
      (v_atividade, 49, 'Raciocínio Lógico', 'B'),
      (v_atividade, 50, 'Desafio: Atravessar o Rio', 'D');
end $$;
