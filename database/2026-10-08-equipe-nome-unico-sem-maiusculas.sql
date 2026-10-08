-- Equipes: o nome não se repete na mesma turma + matéria, ignorando maiúsculas/minúsculas e
-- espaços nas pontas ("Dupla 1" = "dupla 1" = " Dupla 1 "). Outra turma pode usar o mesmo nome.
-- Pedido do usuário em 2026-10-08. Complementa a constraint equipe_turma_materia_nome_uk
-- (nome exato), que continua. Idempotente e sem apagar dados (conferido antes: 0 duplicados).
-- O app trata a violação (código 23505) com a mensagem MSG_DUPLICADO_EQUIPES.

create unique index if not exists equipe_turma_materia_nome_normalizado_uk
  on public.equipe (turma_codigo, materia_id, lower(btrim(nome)));
