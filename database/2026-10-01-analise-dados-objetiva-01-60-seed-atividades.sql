-- Avaliação Objetiva 01 de Análise de Dados: 32 -> 60 questões (itens 33 a 60 novos).
-- Contém o GABARITO: fora do Git (.gitignore). Idempotente. Gerado em 01/10/2026.
-- Plano: docs/expandir-avaliacao-objetiva-01-analise-dados-60-questoes.md

-- Backup do gabarito anterior (RLS ligado, sem políticas: só o dono do banco lê).
create table if not exists public.gabarito_backup_av01_analise_20261001 as
  select g.* from public.gabarito g join public.atividade a on a.id = g.atividade_id
  where a.pagina = '/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/AVALIACAO-OBJETIVA-01.html';
alter table public.gabarito_backup_av01_analise_20261001 enable row level security;

do $$
declare
  v_atividade bigint;
begin
  select id into v_atividade from public.atividade where pagina = '/MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/AVALIACAO-OBJETIVA-01.html';
  if v_atividade is null then
    raise exception 'Avaliação Objetiva 01 de Análise de Dados não encontrada';
  end if;

  update public.atividade set total_itens = 60 where id = v_atividade;

  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Aula 01: Regra de três simples direta', 'B'),
      (v_atividade, 2, 'Aula 01: Regra de três simples inversa', 'A'),
      (v_atividade, 3, 'Aula 01: Regra de três composta', 'C'),
      (v_atividade, 4, 'Aula 01: Conversão de unidades de massa', 'B'),
      (v_atividade, 5, 'Aula 01: Paletes no galpão pelo arranjo', 'C'),
      (v_atividade, 6, 'Aula 01: Volume de uma caixa', 'B'),
      (v_atividade, 7, 'Aula 01: Ponto de pedido', 'E'),
      (v_atividade, 8, 'Aula 01: Custo unitário', 'A'),
      (v_atividade, 9, 'Aula 02: Percentuais sucessivos', 'D'),
      (v_atividade, 10, 'Aula 02: Variação percentual do estoque', 'B'),
      (v_atividade, 11, 'Aula 02: Margem sobre a receita', 'C'),
      (v_atividade, 12, 'Aula 02: Média × mediana com valor extremo', 'E'),
      (v_atividade, 13, 'Aula 02: Moda', 'D'),
      (v_atividade, 14, 'Aula 02: Interpretação do desvio padrão', 'A'),
      (v_atividade, 15, 'Aula 02: Progressão aritmética', 'D'),
      (v_atividade, 16, 'Aula 02: Progressão geométrica', 'A'),
      (v_atividade, 17, 'Aula 03: Precedência dos operadores', 'B'),
      (v_atividade, 18, 'Aula 03: Referência absoluta', 'E'),
      (v_atividade, 19, 'Aula 03: Resultado da função SE', 'C'),
      (v_atividade, 20, 'Aula 03: CONT.VALORES', 'E'),
      (v_atividade, 21, 'Aula 03: MÉDIA com célula vazia', 'A'),
      (v_atividade, 22, 'Aula 03: Cópia de fórmula com referência relativa e absoluta', 'E'),
      (v_atividade, 23, 'Aula 03: Amplitude com MÁXIMO e MÍNIMO', 'C'),
      (v_atividade, 24, 'Aula 03: Erro na função SE', 'E'),
      (v_atividade, 25, 'Aula 04: O que a formatação faz com o valor', 'C'),
      (v_atividade, 26, 'Aula 04: Formatação condicional com fórmula', 'D'),
      (v_atividade, 27, 'Aula 04: Congelar painéis', 'B'),
      (v_atividade, 28, 'Aula 04: Lista suspensa ligada ao cadastro', 'D'),
      (v_atividade, 29, 'Aula 04: Estilo do alerta de erro', 'B'),
      (v_atividade, 30, 'Aula 04: Ordem da proteção', 'A'),
      (v_atividade, 31, 'Aula 04: Datas como números', 'D'),
      (v_atividade, 32, 'Aula 04: O que o filtro faz', 'A'),
      (v_atividade, 33, 'Aula 01: Conjuntos numéricos', 'C'),
      (v_atividade, 34, 'Aula 01: Razão de produtividade', 'A'),
      (v_atividade, 35, 'Aula 01: Conversão de volume', 'B'),
      (v_atividade, 36, 'Aula 01: Quantas embalagens comprar', 'C'),
      (v_atividade, 37, 'Aula 01: Peso total do palete', 'B'),
      (v_atividade, 38, 'Aula 01: Escolha do fornecedor pelo preço por quilo', 'D'),
      (v_atividade, 39, 'Aula 01: Insumos com taxa de refugo', 'B'),
      (v_atividade, 40, 'Aula 02: Desconto à vista', 'A'),
      (v_atividade, 41, 'Aula 02: Frequência relativa', 'E'),
      (v_atividade, 42, 'Aula 02: Mediana com quantidade par de dados', 'A'),
      (v_atividade, 43, 'Aula 02: Cálculo da variância', 'D'),
      (v_atividade, 44, 'Aula 02: PA ou PG?', 'E'),
      (v_atividade, 45, 'Aula 02: Acréscimo sobre o custo × margem sobre a receita', 'C'),
      (v_atividade, 46, 'Aula 02: Comparação em base 100', 'D'),
      (v_atividade, 47, 'Aula 03: O sinal de igual', 'E'),
      (v_atividade, 48, 'Aula 03: Número alinhado à esquerda', 'B'),
      (v_atividade, 49, 'Aula 03: CONT.NÚM e CONT.VALORES', 'A'),
      (v_atividade, 50, 'Aula 03: Dois pontos × ponto e vírgula', 'D'),
      (v_atividade, 51, 'Aula 03: Alça de preenchimento', 'E'),
      (v_atividade, 52, 'Aula 03: Atalho para fixar a referência', 'C'),
      (v_atividade, 53, 'Aula 03: Preenchimento Relâmpago', 'D'),
      (v_atividade, 54, 'Aula 04: Formato de porcentagem', 'E'),
      (v_atividade, 55, 'Aula 04: Barras de dados', 'A'),
      (v_atividade, 56, 'Aula 04: Congelar a primeira coluna', 'C'),
      (v_atividade, 57, 'Aula 04: Validação de quantidade', 'E'),
      (v_atividade, 58, 'Aula 04: Mensagem de entrada', 'D'),
      (v_atividade, 59, 'Aula 04: Proteger a estrutura da pasta', 'B'),
      (v_atividade, 60, 'Aula 04: Alinhamento profissional dos números', 'C')
  on conflict (atividade_id, item) do update
    set titulo = excluded.titulo, letra = excluded.letra;
end $$;
