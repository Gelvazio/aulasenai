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

  select id into v_materia from public.materia where descricao = 'BANCO DE DADOS' limit 1;
  if v_materia is null then
    insert into public.materia (descricao, curso_id) values ('BANCO DE DADOS', v_curso)
      returning id into v_materia;
  else
    update public.materia set curso_id = v_curso where id = v_materia and curso_id is null;
  end if;

  insert into public.cursomateria (cursoid, materiaid) values (v_curso, v_materia)
    on conflict do nothing;

  -- Aula 11: Padronização de Dados, Cronograma e Fluxograma
  select id into v_aula from public.aulas
    where materia_id = v_materia and titulo = 'Padronização de Dados, Cronograma e Fluxograma' limit 1;
  if v_aula is null then
    insert into public.aulas (numero, titulo, materia_id, curso_id, data_planejada)
      values (11, 'Padronização de Dados, Cronograma e Fluxograma', v_materia, v_curso, '2026-09-28')
      returning id into v_aula;
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Avaliação Objetiva 01', 'PENDENTE', v_aula, '2026-09-28',
      'Atividade — Avaliação Objetiva 01 (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/BANCO-DE-DADOS/ATIVIDADES/AVALIACAO-OBJETIVA-01.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Dado e Informação na Academia', 'D'),
      (v_atividade, 2, 'Concorrência na Venda de Passagens', 'B'),
      (v_atividade, 3, 'Pane no Servidor da Farmácia', 'D'),
      (v_atividade, 4, 'Quem Conversa com o Banco', 'B'),
      (v_atividade, 5, 'Classificando os Gerenciadores', 'B'),
      (v_atividade, 6, 'Durabilidade após o COMMIT', 'C'),
      (v_atividade, 7, 'Erro no Meio da Transação', 'A'),
      (v_atividade, 8, 'Visão do Setor Financeiro', 'C'),
      (v_atividade, 9, 'Novo Índice em Outro Disco', 'D'),
      (v_atividade, 10, 'Aplicativo de Coleta sem Internet', 'A'),
      (v_atividade, 11, 'Porta Ocupada na Instalação', 'B'),
      (v_atividade, 12, 'Componentes do PostgreSQL', 'B'),
      (v_atividade, 13, 'Connection Refused na Clínica', 'A'),
      (v_atividade, 14, 'Nomes com Acentos Errados', 'D'),
      (v_atividade, 15, 'Conferindo a Conexão no psql', 'A'),
      (v_atividade, 16, 'Quem Pode Entrar no Banco', 'A'),
      (v_atividade, 17, 'Linha com Método trust', 'A'),
      (v_atividade, 18, 'Reload ou Restart', 'D'),
      (v_atividade, 19, 'Muitos Acessos Simultâneos', 'A'),
      (v_atividade, 20, 'Senha da String de Conexão', 'B'),
      (v_atividade, 21, 'Planilha Online ou Necessidade Real', 'B'),
      (v_atividade, 22, 'Fichas e Recibos da Clínica', 'C'),
      (v_atividade, 23, 'Requisito de Acesso no Hotel', 'D'),
      (v_atividade, 24, 'O Que Não Entra no Escopo', 'C'),
      (v_atividade, 25, 'Pedido Novo no Meio do Projeto', 'C'),
      (v_atividade, 26, 'Entidade Forte na Locadora', 'C'),
      (v_atividade, 27, 'Identificação da Mensalidade', 'C'),
      (v_atividade, 28, 'Inscrição em Oficinas', 'A'),
      (v_atividade, 29, 'Cor do Veículo', 'D'),
      (v_atividade, 30, 'Estudante e Aluno nos Requisitos', 'C'),
      (v_atividade, 31, 'Endereço para Relatório por Bairro', 'D'),
      (v_atividade, 32, 'Código do Setor no Funcionário', 'C'),
      (v_atividade, 33, 'Código do Produto no Mercado', 'C'),
      (v_atividade, 34, 'Idade no Cadastro do Paciente', 'D'),
      (v_atividade, 35, 'Identificador do Associado', 'C'),
      (v_atividade, 36, 'Setor e Funcionário', 'D'),
      (v_atividade, 37, 'Atores e Filmes', 'B'),
      (v_atividade, 38, 'Cliente sem Compras', 'D'),
      (v_atividade, 39, 'Supervisor do Funcionário', 'D'),
      (v_atividade, 40, 'Funcionário e Crachá', 'B'),
      (v_atividade, 41, 'Identificador no DER de Chen', 'A'),
      (v_atividade, 42, 'Círculo no Pé de Galinha', 'B'),
      (v_atividade, 43, 'DER Conceitual e Lógico', 'B'),
      (v_atividade, 44, 'Ferramenta que Gera o SQL', 'A'),
      (v_atividade, 45, 'Revisão Cruzada do DER', 'A'),
      (v_atividade, 46, 'Mudança do Valor da Diária', 'A'),
      (v_atividade, 47, 'E-mails na Mesma Célula', 'A'),
      (v_atividade, 48, 'Nome do Produto no Item', 'C'),
      (v_atividade, 49, 'Nome do Setor no Funcionário', 'B'),
      (v_atividade, 50, 'Preço no Item do Pedido', 'B');
end $$;
