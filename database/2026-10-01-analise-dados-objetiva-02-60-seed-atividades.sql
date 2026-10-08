-- Avaliação Objetiva 02 de Análise de Dados: 24 -> 60 questões (itens 25 a 60 novos).
-- Contém o GABARITO: fora do Git (.gitignore). Idempotente. Gerado em 01/10/2026.
-- Plano: docs/expandir-avaliacao-objetiva-02-analise-dados-60-itens.md

-- Backup do gabarito anterior (RLS ligado, sem políticas: só o dono do banco lê).
create table if not exists public.gabarito_backup_av02_analise_20261001 as
  select g.* from public.gabarito g join public.atividade a on a.id = g.atividade_id
  where a.pagina = '/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/AVALIACAO-OBJETIVA-02.html';
alter table public.gabarito_backup_av02_analise_20261001 enable row level security;

do $$
declare
  v_atividade bigint;
begin
  select id into v_atividade from public.atividade where pagina = '/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/AVALIACAO-OBJETIVA-02.html';
  if v_atividade is null then
    raise exception 'Avaliação Objetiva 02 de Análise de Dados não encontrada';
  end if;

  update public.atividade set total_itens = 60 where id = v_atividade;

  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Aula 05: Montar o PROCV', 'C'),
      (v_atividade, 2, 'Aula 05: Número da coluna no PROCV', 'A'),
      (v_atividade, 3, 'Aula 05: SEERRO em valores financeiros', 'D'),
      (v_atividade, 4, 'Aula 05: Escolher o PROCH', 'B'),
      (v_atividade, 5, 'Aula 05: Resultado do CORRESP', 'A'),
      (v_atividade, 6, 'Aula 05: Buscar para a esquerda', 'D'),
      (v_atividade, 7, 'Aula 05: SE aninhado', 'C'),
      (v_atividade, 8, 'Aula 05: SOMASE', 'D'),
      (v_atividade, 9, 'Aula 06: Preparar a base da tabela dinâmica', 'A'),
      (v_atividade, 10, 'Aula 06: Posicionar os campos', 'C'),
      (v_atividade, 11, 'Aula 06: Contar pedidos', 'E'),
      (v_atividade, 12, 'Aula 06: Agrupar datas', 'B'),
      (v_atividade, 13, 'Aula 06: Atualizar a tabela dinâmica', 'E'),
      (v_atividade, 14, 'Aula 06: Gráfico de tendência', 'A'),
      (v_atividade, 15, 'Aula 06: Gráfico combinado', 'C'),
      (v_atividade, 16, 'Aula 06: Segmentação em vários gráficos', 'E'),
      (v_atividade, 17, 'Aula 07: KPI de giro', 'B'),
      (v_atividade, 18, 'Aula 07: KPI de ruptura', 'A'),
      (v_atividade, 19, 'Aula 07: KPI de cobertura', 'B'),
      (v_atividade, 20, 'Aula 07: Semáforo do KPI', 'E'),
      (v_atividade, 21, 'Aula 07: Leitura em Z', 'D'),
      (v_atividade, 22, 'Aula 07: Abas do dashboard', 'B'),
      (v_atividade, 23, 'Aula 07: Ordem de construção', 'D'),
      (v_atividade, 24, 'Aula 07: Storytelling com dados', 'C'),
      (v_atividade, 25, 'Aula 05: Correspondência exata no PROCV', 'B'),
      (v_atividade, 26, 'Aula 05: Matriz do PROCV sem cifrão', 'D'),
      (v_atividade, 27, 'Aula 05: Código com espaço extra', 'A'),
      (v_atividade, 28, 'Aula 05: Número salvo como texto', 'E'),
      (v_atividade, 29, 'Aula 05: SEERRO com mensagem amigável', 'C'),
      (v_atividade, 30, 'Aula 05: Como o SEERRO funciona', 'B'),
      (v_atividade, 31, 'Aula 05: Resultado do ÍNDICE', 'E'),
      (v_atividade, 32, 'Aula 05: Montar o ÍNDICE + CORRESP', 'A'),
      (v_atividade, 33, 'Aula 05: Resultado do SE aninhado', 'D'),
      (v_atividade, 34, 'Aula 05: CONT.SE com operador', 'C'),
      (v_atividade, 35, 'Aula 05: Critério acima da média', 'E'),
      (v_atividade, 36, 'Aula 05: Resultado do SOMASE', 'B'),
      (v_atividade, 37, 'Aula 06: A tabela dinâmica e a base original', 'A'),
      (v_atividade, 38, 'Aula 06: Base com problemas', 'C'),
      (v_atividade, 39, 'Aula 06: Área de Filtros', 'D'),
      (v_atividade, 40, 'Aula 06: Resumir valores por média', 'E'),
      (v_atividade, 41, 'Aula 06: Percentual do total geral', 'B'),
      (v_atividade, 42, 'Aula 06: Campo calculado', 'A'),
      (v_atividade, 43, 'Aula 06: Os maiores no topo', 'C'),
      (v_atividade, 44, 'Aula 06: Linha do Tempo', 'E'),
      (v_atividade, 45, 'Aula 06: Ranking de fornecedores', 'D'),
      (v_atividade, 46, 'Aula 06: Gráfico de dispersão', 'B'),
      (v_atividade, 47, 'Aula 06: Base como tabela oficial', 'A'),
      (v_atividade, 48, 'Aula 06: Proteger o relatório dinâmico', 'C'),
      (v_atividade, 49, 'Aula 07: Planilha comum × dashboard', 'D'),
      (v_atividade, 50, 'Aula 07: Cartões de KPI', 'E'),
      (v_atividade, 51, 'Aula 07: Segmentador para o painel inteiro', 'B'),
      (v_atividade, 52, 'Aula 07: Cores no painel', 'A'),
      (v_atividade, 53, 'Aula 07: Interface limpa', 'C'),
      (v_atividade, 54, 'Aula 07: Excesso de informação', 'E'),
      (v_atividade, 55, 'Aula 07: Gráficos 3D', 'D'),
      (v_atividade, 56, 'Aula 07: Apresentar para a diretoria', 'B'),
      (v_atividade, 57, 'Aula 07: Ticket médio', 'E'),
      (v_atividade, 58, 'Aula 07: Meta × realizado', 'C'),
      (v_atividade, 59, 'Aula 07: KPI de atraso', 'A'),
      (v_atividade, 60, 'Aula 07: Rascunho antes do software', 'D')
  on conflict (atividade_id, item) do update
    set titulo = excluded.titulo, letra = excluded.letra;
end $$;
