-- Atividade "Liga ou Desliga?" (jogo de segurança elétrica) na aula 01 de Noções de Eletricidade e
-- Circuitos Básicos (matéria criada por 2026-10-20-materia-nocoes-eletricidade-aulas.sql).
-- Tarefa #302.1. Gabarito: A = LIGAR (seguro), B = DESLIGAR / NÃO USAR, tirado do `safe` do jogo.
-- Idempotente: a atividade é única por `pagina`; o gabarito é refeito para a atividade. Não apaga
-- nada de outras atividades.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a
    join public.materia m on m.id = a.materia_id
    where m.descricao = 'Noções de Eletricidade e Circuitos Básicos' and a.numero = 1 limit 1;
  if v_aula is null then
    raise exception 'Aula 01 de Noções de Eletricidade não encontrada: rode antes o seed da matéria.';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Liga ou Desliga? Segurança elétrica em casa', 'PENDENTE', v_aula, '2026-10-20',
      'Jogo — Liga ou Desliga? Desafio de segurança elétrica em casa (12 situações)',
      '/MATERIAIS/RIO_DO_SUL_MAIS_TECH/NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/ATIVIDADES/jogo_liga_ou_desliga_seguranca_eletrica.html', 12)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Lâmpada em bom estado', 'A'),
      (v_atividade, 2, 'Carregador danificado', 'B'),
      (v_atividade, 3, 'Ferro de passar', 'A'),
      (v_atividade, 4, 'Televisão', 'A'),
      (v_atividade, 5, 'Chuveiro elétrico', 'B'),
      (v_atividade, 6, 'Secador de cabelo', 'A'),
      (v_atividade, 7, 'Tomada com fios danificados', 'B'),
      (v_atividade, 8, 'Micro-ondas', 'A'),
      (v_atividade, 9, 'Geladeira', 'A'),
      (v_atividade, 10, 'Ventilador com grade', 'A'),
      (v_atividade, 11, 'Extensão sobrecarregada', 'B'),
      (v_atividade, 12, 'Celular ou cabo molhado', 'B');
end $$;
