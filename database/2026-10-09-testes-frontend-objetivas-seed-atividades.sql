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
  select id into v_curso from public.curso where nome_completo = 'Técnico em Informática para Internet' limit 1;
  if v_curso is null then
    insert into public.curso (nome_completo) values ('Técnico em Informática para Internet') returning id into v_curso;
  end if;

  select id into v_materia from public.materia where descricao = 'TESTES DE FRONTEND' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('TESTES DE FRONTEND', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 1: Fundamentos de Testes de Software
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Fundamentos de Testes de Software' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (1, 'Fundamentos de Testes de Software', v_materia, v_curso, '2026-10-08')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Fundamentos de Testes de Software', 'PENDENTE', v_aula, '2026-10-08',
      'Atividade — Fundamentos de Testes de Software (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-01-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Para Que Serve Testar', 'D'),
      (v_atividade, 2, 'O Que o Teste Não Prova', 'D'),
      (v_atividade, 3, 'Verdadeiro ou Falso do Teste', 'A'),
      (v_atividade, 4, 'Escolha do Que Testar', 'A'),
      (v_atividade, 5, 'Definição de Erro', 'B'),
      (v_atividade, 6, 'Definição de Defeito', 'C'),
      (v_atividade, 7, 'Definição de Falha', 'D'),
      (v_atividade, 8, 'Cadeia Erro → Defeito → Falha', 'D'),
      (v_atividade, 9, 'Identificando o Erro no CEP', 'C'),
      (v_atividade, 10, 'Identificando o Defeito no CEP', 'B'),
      (v_atividade, 11, 'Identificando a Falha no CEP', 'C'),
      (v_atividade, 12, 'Defeito Que Não Vira Falha', 'B'),
      (v_atividade, 13, 'Defeito Como Risco', 'A'),
      (v_atividade, 14, 'Preço Que Aparece Como NaN', 'B'),
      (v_atividade, 15, 'Regra de 10 de Myers', 'D'),
      (v_atividade, 16, 'Fase Mais Barata Para Corrigir', 'A'),
      (v_atividade, 17, 'Custo do Defeito em Produção', 'B'),
      (v_atividade, 18, 'Pergunta da Verificação', 'D'),
      (v_atividade, 19, 'Pergunta da Validação', 'A'),
      (v_atividade, 20, 'Com o Que a Verificação Compara', 'B'),
      (v_atividade, 21, 'Com o Que a Validação Compara', 'A'),
      (v_atividade, 22, 'Exemplo de Verificação', 'D'),
      (v_atividade, 23, 'Exemplo de Validação', 'C'),
      (v_atividade, 24, 'Passa na Verificação e Falha na Validação', 'D'),
      (v_atividade, 25, 'Login Bloqueado Sem Mensagem', 'C'),
      (v_atividade, 26, 'Quando a Verificação Acontece', 'D'),
      (v_atividade, 27, 'Quando a Validação Acontece', 'B'),
      (v_atividade, 28, 'Teste de Funcionalidade', 'A'),
      (v_atividade, 29, 'Exemplo de Funcionalidade', 'D'),
      (v_atividade, 30, 'Teste de Usabilidade', 'C'),
      (v_atividade, 31, 'Exemplo de Usabilidade', 'B'),
      (v_atividade, 32, 'Teste de Confiabilidade', 'A'),
      (v_atividade, 33, 'Exemplo de Confiabilidade', 'A'),
      (v_atividade, 34, 'Teste de Desempenho', 'A'),
      (v_atividade, 35, 'Página Que Leva 6 Segundos', 'A'),
      (v_atividade, 36, 'Teste de Manutenibilidade', 'B'),
      (v_atividade, 37, 'Teste Que Quebra Com Classe CSS', 'B'),
      (v_atividade, 38, 'Campo de Data Sem Teclado', 'D'),
      (v_atividade, 39, 'Carrinho Some ao Atualizar', 'C'),
      (v_atividade, 40, 'Botão Pagar e Leitor de Tela', 'C'),
      (v_atividade, 41, 'Base da Pirâmide', 'C'),
      (v_atividade, 42, 'Meio da Pirâmide', 'B'),
      (v_atividade, 43, 'Topo da Pirâmide', 'A'),
      (v_atividade, 44, 'Subindo na Pirâmide', 'C'),
      (v_atividade, 45, 'Cone de Sorvete', 'D'),
      (v_atividade, 46, 'Pirâmide de Uma Fintech', 'B'),
      (v_atividade, 47, 'Classificando Cenário Unitário', 'C'),
      (v_atividade, 48, 'Classificando Cenário E2E', 'C'),
      (v_atividade, 49, 'Responsabilidade de Quem Desenvolve', 'A'),
      (v_atividade, 50, 'Registro de Uma Falha', 'B');

  -- Aula 2: Planejamento, Verificação, Validação e Casos de Teste
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Planejamento, Verificação, Validação e Casos de Teste' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (2, 'Planejamento, Verificação, Validação e Casos de Teste', v_materia, v_curso, '2026-10-14')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Planejamento, Verificação, Validação e Casos de Teste', 'PENDENTE', v_aula, '2026-10-14',
      'Atividade — Planejamento, Verificação, Validação e Casos de Teste (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-02-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Onde o Teste Começa', 'C'),
      (v_atividade, 2, 'Requisito Testável', 'B'),
      (v_atividade, 3, 'Requisito Vago', 'D'),
      (v_atividade, 4, 'Pergunta do Testador', 'B'),
      (v_atividade, 5, 'Reescrevendo o Frete', 'B'),
      (v_atividade, 6, 'Atividades do Processo de Teste', 'B'),
      (v_atividade, 7, 'O Que o Planejamento Define', 'D'),
      (v_atividade, 8, 'O Que o Desenho dos Testes Faz', 'C'),
      (v_atividade, 9, 'Ordem do Processo', 'D'),
      (v_atividade, 10, 'Seção Escopo do Plano', 'B'),
      (v_atividade, 11, 'Seção Fora do Escopo', 'A'),
      (v_atividade, 12, 'Fora do Escopo Justificado', 'B'),
      (v_atividade, 13, 'Seção Estratégia', 'C'),
      (v_atividade, 14, 'Ambientes e Massa de Testes', 'D'),
      (v_atividade, 15, 'Riscos no Plano', 'C'),
      (v_atividade, 16, 'Fórmula do Risco', 'C'),
      (v_atividade, 17, 'Funcionalidade de Alto Risco', 'B'),
      (v_atividade, 18, 'Risco do Cálculo do Total', 'A'),
      (v_atividade, 19, 'Seção Métricas', 'D'),
      (v_atividade, 20, 'Caixa Preta', 'A'),
      (v_atividade, 21, 'Caixa Branca', 'B'),
      (v_atividade, 22, 'Base da Caixa Preta', 'B'),
      (v_atividade, 23, 'Técnicas de Caixa Preta', 'C'),
      (v_atividade, 24, 'Técnicas de Caixa Branca', 'D'),
      (v_atividade, 25, 'Classificando o else', 'C'),
      (v_atividade, 26, 'Classificando E-mail Sem @', 'B'),
      (v_atividade, 27, 'Partição de Equivalência', 'A'),
      (v_atividade, 28, 'Partições da Senha', 'A'),
      (v_atividade, 29, 'Valores-Limite', 'C'),
      (v_atividade, 30, 'Limites da Senha', 'A'),
      (v_atividade, 31, 'Limites do Frete Grátis', 'A'),
      (v_atividade, 32, 'Resultado no Limite do Frete', 'C'),
      (v_atividade, 33, 'Partições da Idade', 'D'),
      (v_atividade, 34, 'Campos do Caso de Teste', 'D'),
      (v_atividade, 35, 'Pré-Condição', 'D'),
      (v_atividade, 36, 'Resultado Esperado', 'A'),
      (v_atividade, 37, 'Caso de Teste Vago', 'B'),
      (v_atividade, 38, 'Caso Executável por Outra Pessoa', 'C'),
      (v_atividade, 39, 'Resultado do CT-LOGIN-03', 'D'),
      (v_atividade, 40, 'Suíte de Testes', 'A'),
      (v_atividade, 41, 'Matriz de Rastreabilidade', 'D'),
      (v_atividade, 42, 'Requisito Sem Caso', 'D'),
      (v_atividade, 43, 'BDD', 'B'),
      (v_atividade, 44, 'Dado no BDD', 'A'),
      (v_atividade, 45, 'Requisito RF-11', 'A'),
      (v_atividade, 46, 'Faixa de Quantidade', 'C'),
      (v_atividade, 47, 'Cadastro Fácil', 'C'),
      (v_atividade, 48, 'Justificando Decisões', 'B'),
      (v_atividade, 49, 'Cronograma do Plano', 'A'),
      (v_atividade, 50, 'SA 1', 'A');

  -- Aula 3: Testes Unitários no Front-End com Vitest
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Testes Unitários no Front-End com Vitest' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (3, 'Testes Unitários no Front-End com Vitest', v_materia, v_curso, '2026-10-15')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Testes Unitários no Front-End com Vitest', 'PENDENTE', v_aula, '2026-10-15',
      'Atividade — Testes Unitários no Front-End com Vitest (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-03-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Que É Teste Automatizado', 'A'),
      (v_atividade, 2, 'Vantagem da Automação', 'B'),
      (v_atividade, 3, 'Teste de Regressão', 'D'),
      (v_atividade, 4, 'Teste Unitário', 'A'),
      (v_atividade, 5, 'O Que o Unitário Não Usa', 'D'),
      (v_atividade, 6, 'Unitário na Pirâmide', 'D'),
      (v_atividade, 7, 'Para Que Serve o Vitest', 'C'),
      (v_atividade, 8, 'Por Que Vitest', 'B'),
      (v_atividade, 9, 'Ferramenta de E2E', 'B'),
      (v_atividade, 10, 'Testing Library', 'D'),
      (v_atividade, 11, 'Jest e Vitest', 'C'),
      (v_atividade, 12, 'Instalando o Vitest', 'A'),
      (v_atividade, 13, 'Iniciando o Projeto', 'C'),
      (v_atividade, 14, 'Modo Observação', 'B'),
      (v_atividade, 15, 'Rodar Uma Vez', 'D'),
      (v_atividade, 16, 'Nome do Arquivo de Teste', 'D'),
      (v_atividade, 17, 'Padrão AAA', 'A'),
      (v_atividade, 18, 'Arrange', 'C'),
      (v_atividade, 19, 'Act', 'C'),
      (v_atividade, 20, 'Assert', 'D'),
      (v_atividade, 21, 'Identificando o Assert', 'B'),
      (v_atividade, 22, 'Função do describe', 'A'),
      (v_atividade, 23, 'Função do it', 'B'),
      (v_atividade, 24, 'Nome do Teste', 'B'),
      (v_atividade, 25, 'Independência dos Testes', 'D'),
      (v_atividade, 26, 'Matcher toBe', 'A'),
      (v_atividade, 27, 'Matcher toEqual', 'B'),
      (v_atividade, 28, 'Somando 0.1 e 0.2', 'A'),
      (v_atividade, 29, 'Esperando Erro', 'A'),
      (v_atividade, 30, 'Forma do toThrow', 'C'),
      (v_atividade, 31, 'Matcher toContain', 'C'),
      (v_atividade, 32, 'Matcher do Mock', 'D'),
      (v_atividade, 33, 'Matcher Mais Específico', 'B'),
      (v_atividade, 34, 'Caixa Branca no Unitário', 'A'),
      (v_atividade, 35, 'Caminhos do Frete', 'C'),
      (v_atividade, 36, 'Mínimo de Testes do Frete', 'B'),
      (v_atividade, 37, 'Limite do Frete', 'C'),
      (v_atividade, 38, 'Abaixo do Limite', 'C'),
      (v_atividade, 39, 'Mutante Sobrevivente', 'C'),
      (v_atividade, 40, 'Valor de um Teste', 'B'),
      (v_atividade, 41, 'If Dentro de If', 'B'),
      (v_atividade, 42, 'O Que É Mock', 'A'),
      (v_atividade, 43, 'Quando Usar Mock', 'A'),
      (v_atividade, 44, 'Criando Mock no Vitest', 'D'),
      (v_atividade, 45, 'Mock que Resolve', 'A'),
      (v_atividade, 46, 'Injeção de Dependência', 'B'),
      (v_atividade, 47, 'API Real no Unitário', 'A'),
      (v_atividade, 48, 'beforeEach', 'D'),
      (v_atividade, 49, 'Cupom de 15%', 'D'),
      (v_atividade, 50, 'Total com Centavos', 'C');
end $$;
