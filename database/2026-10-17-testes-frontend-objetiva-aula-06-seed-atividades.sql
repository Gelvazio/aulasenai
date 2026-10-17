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

  -- Aula 6: Testes End to End com Cypress e Playwright
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Testes End to End com Cypress e Playwright' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (6, 'Testes End to End com Cypress e Playwright', v_materia, v_curso, '2026-10-30')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Testes End to End com Cypress e Playwright', 'PENDENTE', v_aula, '2026-10-30',
      'Atividade — Testes End to End com Cypress e Playwright (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/TESTES-DE-FRONTEND/ATIVIDADES/ATIVIDADES-AULA-06-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O Que É um Teste E2E', 'C'),
      (v_atividade, 2, 'Ambiente do E2E', 'A'),
      (v_atividade, 3, 'Velocidade do E2E', 'D'),
      (v_atividade, 4, 'Pirâmide de Testes', 'B'),
      (v_atividade, 5, 'Erro Que o E2E Encontra', 'A'),
      (v_atividade, 6, 'Validação no E2E', 'D'),
      (v_atividade, 7, 'Instalando o Cypress', 'D'),
      (v_atividade, 8, 'Instalando o Playwright', 'A'),
      (v_atividade, 9, 'Interface do Cypress', 'D'),
      (v_atividade, 10, 'Cypress Sem Interface', 'A'),
      (v_atividade, 11, 'Executando no Playwright', 'C'),
      (v_atividade, 12, 'Navegadores do Playwright', 'D'),
      (v_atividade, 13, 'Navegadores do Cypress', 'D'),
      (v_atividade, 14, 'Estilo do Cypress', 'A'),
      (v_atividade, 15, 'Estilo do Playwright', 'A'),
      (v_atividade, 16, 'Destaque do Cypress', 'A'),
      (v_atividade, 17, 'Destaque do Playwright', 'C'),
      (v_atividade, 18, 'Escolhendo a Ferramenta', 'A'),
      (v_atividade, 19, 'Espera Automática', 'C'),
      (v_atividade, 20, 'Endereço Base no Cypress', 'B'),
      (v_atividade, 21, 'Endereço Base no Playwright', 'D'),
      (v_atividade, 22, 'Aplicação Rodando', 'C'),
      (v_atividade, 23, 'Seletor por Classe', 'C'),
      (v_atividade, 24, 'Seletor por Papel', 'B'),
      (v_atividade, 25, 'Seletor por Rótulo', 'C'),
      (v_atividade, 26, 'Atributo de Teste', 'D'),
      (v_atividade, 27, 'Quando Usar data-testid', 'A'),
      (v_atividade, 28, 'Ordem dos Seletores', 'B'),
      (v_atividade, 29, 'Caixa Preta no E2E', 'A'),
      (v_atividade, 30, 'Visitar a Página', 'D'),
      (v_atividade, 31, 'Digitar no Campo', 'D'),
      (v_atividade, 32, 'Verificar a URL no Cypress', 'C'),
      (v_atividade, 33, 'Verificar a URL no Playwright', 'D'),
      (v_atividade, 34, 'Mensagem Visível', 'A'),
      (v_atividade, 35, 'Login com Falha', 'C'),
      (v_atividade, 36, 'Por Que Conferir a Rota', 'B'),
      (v_atividade, 37, 'Caso de Teste em E2E', 'D'),
      (v_atividade, 38, 'Verificação no Meio do Caminho', 'C'),
      (v_atividade, 39, 'Contador do Carrinho', 'B'),
      (v_atividade, 40, 'Botão Habilitado', 'B'),
      (v_atividade, 41, 'Defeito Só no E2E', 'B'),
      (v_atividade, 42, 'Usabilidade no E2E', 'A'),
      (v_atividade, 43, 'Rótulo e Usabilidade', 'B'),
      (v_atividade, 44, 'Uso Só com Teclado', 'B'),
      (v_atividade, 45, 'Teste Intermitente', 'B'),
      (v_atividade, 46, 'Espera Fixa', 'C'),
      (v_atividade, 47, 'Esperar a Requisição', 'B'),
      (v_atividade, 48, 'Dados Compartilhados', 'C'),
      (v_atividade, 49, 'Dependência de Ordem', 'A'),
      (v_atividade, 50, 'Rodar Três Vezes', 'B');
end $$;
