-- Cadastra os trabalhos em equipe da ITIC (v1 e v2) na tabela atividade, para o índice de
-- atividades mostrar o interruptor Bloquear/Desbloquear nos dois cards (o professor controla
-- atividade.ativo). Sem gabarito. Idempotente: rodar de novo só atualiza aula e descrição.
-- Rodar no Supabase → SQL Editor.
do $$
declare
  v_aula bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Introdução à Tecnologia da Informação e Comunicação' and a.numero = 7
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 7 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values
      ('Trabalho em Equipe — Manual de Comunicação Técnica', 'PENDENTE', v_aula,
        'Trabalho em equipe — Manual de Comunicação Técnica do CD (Aulas 01 a 07)',
        '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA.html',
        1, true),
      ('Trabalho em Equipe v2 — Manual de Comunicação Técnica', 'PENDENTE', v_aula,
        'Trabalho em equipe v2 (simplificado, turma 135081) — Manual de Comunicação Técnica do CD',
        '/MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/ATIVIDADE-GRANDE/TRABALHO-EQUIPE-MANUAL-COMUNICACAO-TECNICA-v2.html',
        1, true)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao;
end $$;
