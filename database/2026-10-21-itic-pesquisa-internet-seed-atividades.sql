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

  -- Aula 10: Editor de Apresentações e TIC
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Editor de Apresentações e TIC' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (10, 'Editor de Apresentações e TIC', v_materia, v_curso, '2026-10-21')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('PESQUISA INTERNET', 'PENDENTE', v_aula, '2026-10-21',
      'Atividade — PESQUISA INTERNET (10 questões)', '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-PESQUISA-INTERNET.html', 10)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Modelo matemático da comunicação', 'B'),
      (v_atividade, 2, 'Primeiro microprocessador comercial', 'D'),
      (v_atividade, 3, 'Criador da World Wide Web', 'A'),
      (v_atividade, 4, 'Limite de anexo no Gmail', 'C'),
      (v_atividade, 5, 'Multa máxima da LGPD', 'B'),
      (v_atividade, 6, 'Margens da ABNT', 'C'),
      (v_atividade, 7, 'Norma ABNT das referências', 'D'),
      (v_atividade, 8, 'Função de busca na planilha', 'A'),
      (v_atividade, 9, 'Gráfico de relação entre variáveis', 'C'),
      (v_atividade, 10, 'Regra 10-20-30 das apresentações', 'B');
end $$;
