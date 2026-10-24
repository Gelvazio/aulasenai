-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 3
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 3 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Teoria das cores na interface', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Teoria das cores na interface (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-03-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Harmonia monocromática', 'A'),
      (v_atividade, 2, 'Cores análogas', 'C'),
      (v_atividade, 3, 'Harmonia complementar', 'B'),
      (v_atividade, 4, 'Botão principal em tela azul', 'D'),
      (v_atividade, 5, 'Matiz (hue)', 'A'),
      (v_atividade, 6, 'Brilho e legibilidade', 'B'),
      (v_atividade, 7, 'Saturação excessiva', 'C'),
      (v_atividade, 8, 'Contraste de texto normal', 'A'),
      (v_atividade, 9, 'Contraste de texto grande', 'D'),
      (v_atividade, 10, 'Contraste de ícones e bordas', 'B'),
      (v_atividade, 11, 'Texto cinza em caixa de aviso', 'C'),
      (v_atividade, 12, 'Nível AA do WCAG', 'A'),
      (v_atividade, 13, 'Nível AAA do WCAG', 'B'),
      (v_atividade, 14, 'Ferramenta de verificação de contraste', 'D'),
      (v_atividade, 15, 'Dependência da cor', 'A'),
      (v_atividade, 16, 'Campo obrigatório só com cor', 'C'),
      (v_atividade, 17, 'Cor de sucesso', 'B'),
      (v_atividade, 18, 'Cor de erro', 'D'),
      (v_atividade, 19, 'Cor de atenção', 'A'),
      (v_atividade, 20, 'Cor de ação e informação', 'C'),
      (v_atividade, 21, 'Efeito carnaval', 'B'),
      (v_atividade, 22, 'Regra de ação', 'D'),
      (v_atividade, 23, 'Cor primária', 'A'),
      (v_atividade, 24, 'Neutro de fundo', 'B'),
      (v_atividade, 25, 'Cor de alerta/status', 'C'),
      (v_atividade, 26, 'Neutro de texto', 'D'),
      (v_atividade, 27, 'Cor secundária', 'A'),
      (v_atividade, 28, 'Contraste do neutro de texto', 'B'),
      (v_atividade, 29, 'Escolha da cor primária', 'C'),
      (v_atividade, 30, 'Confirmar e cancelar', 'D'),
      (v_atividade, 31, 'Cor de status e daltonismo', 'A'),
      (v_atividade, 32, 'Uso da harmonia complementar', 'B'),
      (v_atividade, 33, 'Vibração cromática', 'D'),
      (v_atividade, 34, 'Dica para cores análogas', 'A'),
      (v_atividade, 35, 'Vantagem da monocromática', 'C'),
      (v_atividade, 36, 'Atenção na monocromática', 'C'),
      (v_atividade, 37, 'Uso típico da monocromática', 'A'),
      (v_atividade, 38, 'Daltonismo e cor', 'D'),
      (v_atividade, 39, 'Conceito de contraste', 'B'),
      (v_atividade, 40, 'Condições visuais variadas', 'C'),
      (v_atividade, 41, 'Inspecionar elemento', 'A'),
      (v_atividade, 42, 'Leitura confortável', 'B'),
      (v_atividade, 43, 'Círculo cromático em UI', 'D'),
      (v_atividade, 44, 'Texto cinza e decisão', 'C'),
      (v_atividade, 45, 'Cores de apoio', 'A'),
      (v_atividade, 46, 'Cor primária', 'B'),
      (v_atividade, 47, 'Critério de harmonia na avaliação em pares', 'D'),
      (v_atividade, 48, 'Critério de completude', 'C'),
      (v_atividade, 49, 'Consequência do efeito carnaval', 'D'),
      (v_atividade, 50, 'Síntese: destaque', 'B');
end $$;
