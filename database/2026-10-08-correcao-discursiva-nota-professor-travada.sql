-- Nota do professor travada depois de confirmada (pedido do usuário, 2026-10-08): uma vez gravada a
-- nota_professor de uma alternativa, ela NÃO pode mais ser alterada nem apagada, nem pelo professor.
-- Recria a função do trigger correcao_discursiva_validar mantendo as regras antigas (tópico existe,
-- nota ≤ pontos, corrigido_por/corrigido_em) e acrescentando a trava. Idempotente; não mexe em dados.

create or replace function public.correcao_discursiva_validar()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_pontos numeric;
begin
  if tg_op = 'UPDATE' and old.nota_professor is not null
     and new.nota_professor is distinct from old.nota_professor then
    raise exception 'Nota já confirmada pelo professor: não pode mais ser alterada.';
  end if;
  select t.pontos into v_pontos from public.topico_discursivo t
    where t.atividade_id = new.atividade_id and t.item = new.item and t.topico = new.topico;
  if v_pontos is null then
    raise exception 'Tópico % do item % não existe nesta atividade.', new.topico, new.item;
  end if;
  if coalesce(new.nota_ia, 0) > v_pontos or coalesce(new.nota_professor, 0) > v_pontos then
    raise exception 'A nota não pode passar de % ponto(s) neste tópico.', v_pontos;
  end if;
  if tg_op = 'INSERT' or new.nota_professor is distinct from old.nota_professor then
    new.corrigido_por := auth.uid();
    new.corrigido_em := now();
  end if;
  return new;
end;
$function$;
