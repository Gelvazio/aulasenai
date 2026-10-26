-- Seed gerado por assets/gerador-atividade-dinamica (não editar à mão). Idempotente.
-- Rodar depois de database/2026-10-26-nota-dinamica.sql. A dinâmica nasce BLOQUEADA (ativo = false).
do $$
declare
  v_aula bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 1
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 01 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, descricao, pagina,
      total_itens, ativo)
    values ('Atividade Dinâmica — Aula 01', 'PENDENTE', v_aula, 'Atividade — Atividade Dinâmica — Aula 01 (dinâmica em sala, nota do professor)',
      '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADE-DINAMICA-AULA-01.html', 1, false)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      descricao = excluded.descricao;
end $$;
