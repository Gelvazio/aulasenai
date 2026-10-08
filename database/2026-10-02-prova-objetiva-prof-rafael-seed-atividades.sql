-- Prova Objetiva Prof. Rafael (após a aula 03). Gerado com scripts/gerar-seed-atividades.py. Idempotente.
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
    values ('Conversão de bases, sistemas supervisórios (SCADA/IHM) e variáveis de controle', 'PENDENTE', v_aula, '2026-10-02',
      'Atividade — Conversão de bases, sistemas supervisórios (SCADA/IHM) e variáveis de controle (20 questões)', '/MATERIAIS/OPERADOR_PRODUCAO_INDUSTRIAL/FUNDAMENTOS-DE-AUTOMACAO-INSTRUMENTACAO/ATIVIDADES/PROVA-OBJETIVA-PROF-RAFAEL.html', 20)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'O que é uma base numérica', 'C'),
      (v_atividade, 2, 'Decimal para binário', 'C'),
      (v_atividade, 3, 'Decimal para octal', 'B'),
      (v_atividade, 4, 'Decimal para hexadecimal', 'A'),
      (v_atividade, 5, 'Binário para decimal', 'A'),
      (v_atividade, 6, 'Hexadecimal para decimal', 'B'),
      (v_atividade, 7, 'Binário para octal e hexadecimal', 'D'),
      (v_atividade, 8, 'O que é um sistema supervisório', 'A'),
      (v_atividade, 9, 'Significado de SCADA', 'C'),
      (v_atividade, 10, 'IHM e CLP', 'B'),
      (v_atividade, 11, 'IHM × SCADA', 'D'),
      (v_atividade, 12, 'Arquitetura de supervisão', 'B'),
      (v_atividade, 13, 'Boas práticas de alarme', 'D'),
      (v_atividade, 14, 'Falha de comunicação com o SCADA', 'A'),
      (v_atividade, 15, 'Instrumentos de pressão', 'A'),
      (v_atividade, 16, 'Medidores de vazão', 'B'),
      (v_atividade, 17, 'Sensores de temperatura', 'C'),
      (v_atividade, 18, 'Setpoint e variável de processo', 'B'),
      (v_atividade, 19, 'Interpretação do 4–20 mA', 'D'),
      (v_atividade, 20, 'Controle de nível do tanque', 'D');
end $$;
