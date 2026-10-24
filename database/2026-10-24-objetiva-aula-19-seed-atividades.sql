-- Seed gerado por gerar-seeds-objetivas-uiux.py. Idempotente.
do $$
declare
  v_aula bigint;
  v_atividade bigint;
begin
  select a.id into v_aula from public.aulas a join public.materia m on m.id = a.materia_id
    where m.descricao = 'Fundamentos de UI / UX' and a.numero = 19
    order by a.id limit 1;
  if v_aula is null then
    raise exception 'Aula 19 da matéria não encontrada';
  end if;

  insert into public.atividade (nome_atividade, status, aula_id, data_atividade, descricao,
      pagina, total_itens)
    values ('Direito autoral: definição, anterioridade, Creative Commons e registro', 'PENDENTE', v_aula, '2026-10-24',
      'Atividade — Direito autoral: definição, anterioridade, Creative Commons e registro (50 questões)', '/MATERIAIS/TECNICO-INFORMATICA-INTERNET/FUNDAMENTOS-DE-UI-UX/ATIVIDADES/ATIVIDADES-AULA-19-50-QUESTOES.html', 50)
    on conflict (pagina) do update set aula_id = excluded.aula_id,
      data_atividade = excluded.data_atividade, descricao = excluded.descricao,
      total_itens = excluded.total_itens
    returning id into v_atividade;

  delete from public.gabarito where atividade_id = v_atividade;
  insert into public.gabarito (atividade_id, item, titulo, letra) values
      (v_atividade, 1, 'Início da proteção autoral', 'A'),
      (v_atividade, 2, 'Lei brasileira citada na aula', 'C'),
      (v_atividade, 3, 'Direitos morais', 'B'),
      (v_atividade, 4, 'Direitos patrimoniais', 'D'),
      (v_atividade, 5, 'Linha de proteção da obra', 'A'),
      (v_atividade, 6, 'Etapa de fixação', 'B'),
      (v_atividade, 7, 'Princípio da anterioridade', 'C'),
      (v_atividade, 8, 'Provas de anterioridade', 'A'),
      (v_atividade, 9, 'Guardar só o arquivo final', 'D'),
      (v_atividade, 10, 'Foto de pessoa retratada', 'B'),
      (v_atividade, 11, 'Uso de fontes em aplicativos', 'C'),
      (v_atividade, 12, 'Atribuição em pacotes de ícones', 'A'),
      (v_atividade, 13, 'Primeira consequência da infração', 'D'),
      (v_atividade, 14, 'Suspensão pela plataforma', 'B'),
      (v_atividade, 15, 'Indenização por uso não autorizado', 'A'),
      (v_atividade, 16, 'Lema do Creative Commons', 'C'),
      (v_atividade, 17, 'Significado da sigla NC', 'D'),
      (v_atividade, 18, 'Cláusula ND na prática', 'B'),
      (v_atividade, 19, 'Exigência da cláusula SA', 'A'),
      (v_atividade, 20, 'Decifrando a licença CC BY-NC-SA', 'C'),
      (v_atividade, 21, 'Significado da sigla BY', 'B'),
      (v_atividade, 22, 'Significado da sigla NC', 'D'),
      (v_atividade, 23, 'Alterar cor com cláusula restritiva', 'A'),
      (v_atividade, 24, 'Requisito para produto pago', 'C'),
      (v_atividade, 25, 'Arte CC BY-NC em aplicativo pago', 'B'),
      (v_atividade, 26, 'Trilha de auditoria de um ativo', 'D'),
      (v_atividade, 27, 'Órgão que registra marcas e programas', 'A'),
      (v_atividade, 28, 'Órgão que registra direito autoral visual', 'B'),
      (v_atividade, 29, 'Registro e design system', 'C'),
      (v_atividade, 30, 'Conteúdo de uma linha da ficha de licenças', 'D'),
      (v_atividade, 31, 'Avatar com licença sem uso comercial', 'A'),
      (v_atividade, 32, 'Tipografias sob SIL Open Font License', 'B'),
      (v_atividade, 33, 'Pacotes de ícones permissivos', 'C'),
      (v_atividade, 34, 'Passos da auditoria em pares', 'D'),
      (v_atividade, 35, 'Ordem lógica da auditoria', 'B'),
      (v_atividade, 36, 'Recurso com licença permissiva comprovada', 'A'),
      (v_atividade, 37, 'Crédito ainda não exibido', 'C'),
      (v_atividade, 38, 'Recurso sem procedência em app comercial', 'D'),
      (v_atividade, 39, 'Nível Excelente da rubrica', 'A'),
      (v_atividade, 40, 'Nível Insuficiente da rubrica', 'B'),
      (v_atividade, 41, 'Cláusulas a evitar em produto comercial', 'D'),
      (v_atividade, 42, 'Documentação dos termos de licença', 'C'),
      (v_atividade, 43, 'Cópia de layout sem registro', 'A'),
      (v_atividade, 44, 'Ícones CC BY em interface comercial', 'B'),
      (v_atividade, 45, 'Conceito de autoria', 'C'),
      (v_atividade, 46, 'Conceito de licenciamento', 'D'),
      (v_atividade, 47, 'Conceito de registro', 'B'),
      (v_atividade, 48, 'Conceito de anterioridade', 'A'),
      (v_atividade, 49, 'Ética na carreira digital', 'C'),
      (v_atividade, 50, 'Rascunho datado e data de publicação', 'D');
end $$;
