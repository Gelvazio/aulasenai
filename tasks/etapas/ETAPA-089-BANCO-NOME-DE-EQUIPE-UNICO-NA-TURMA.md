> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 89 — Banco: nome de equipe único na turma + matéria sem diferenciar maiúsculas (pedido em 2026-10-08 17:17:38)

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 89.1 | Conferir o banco real: já havia `UNIQUE (turma_codigo, materia_id, nome)` (nome exato); 0 duplicados ignorando maiúsculas/espaços | ✅ Concluído | 2026-10-08 17:17:38 | Consultas de leitura pelo conector |
| 89.2 | Usuário escolheu o escopo turma + matéria (outra turma pode repetir o nome) | ✅ Concluído | 2026-10-08 17:17:38 | Resposta do usuário no chat |
| 89.3 | Índice único `equipe_turma_materia_nome_normalizado_uk` em `(turma_codigo, materia_id, lower(btrim(nome)))` aplicado pelo conector; SQL em `database/2026-10-08-equipe-nome-unico-sem-maiusculas.sql`; `docs/database.md` + relatório HTML | ✅ Concluído | 2026-10-08 17:17:38 | `pg_indexes` mostra o índice; 15 equipes mantidas |
| 89.4 | Aceite do usuário | ⬜ Pendente | — | — |
