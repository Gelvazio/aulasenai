## Etapa 383-e5bfca00 — Chave primária da tabela `aulas` composta (id, materia_id, curso_id)

**Tarefa:** #256-e5bfca00-3fcd-439e-b6a0-d5079863c599 · **Pedido em:** 2026-10-17 11:59 · **Criada por:** Claude Code (Opus 5.5) (local · main · s14)
**Pedido:** "mas deve ser assim, corrija entao->a chave da tabela aula composta por
aula.id,materia.id e curso.id"
**Objetivo:** a chave primária de `aulas` passa de `(id)` para `(id, materia_id, curso_id)`.

### Situação no banco (consulta de 2026-10-17 11:59)

- `aulas_pkey` = `PRIMARY KEY (id)`; `aulas_materia_id_numero_key` = `UNIQUE (materia_id, numero)`.
- 103 aulas; `id`, `materia_id` e `curso_id` são `NOT NULL`, sem nenhum nulo; o `curso_id` de
  todas bate com o `curso_id` da matéria.
- Apontam para `aulas(id)`: `atividade_aula_id_fkey` e `aula_turma_aula_id_fkey` (cascade).

### Escopo

- **Entra:** numa migração só (tudo ou nada): criar `UNIQUE (id)` (`aulas_id_key`), soltar as 2
  chaves estrangeiras, trocar `aulas_pkey` por `PRIMARY KEY (id, materia_id, curso_id)` e recriar
  as 2 chaves estrangeiras apontando para `aulas(id)` (agora pelo `UNIQUE`), com o mesmo
  comportamento de antes; `database/2026-10-17-aulas-chave-composta.sql`; `docs/database.md`.
- **Não entra:** pôr `materia_id`/`curso_id` em `atividade` e `aula_turma` (elas continuam
  ligadas só pelo `aula_id`); mudar telas (todas buscam e gravam pelo `id`, que continua único).

### Riscos

- O `id` precisa continuar único sozinho: sem isso, `atividade.aula_id` e `aula_turma.aula_id`
  não teriam como apontar para a aula. Por isso fica o `UNIQUE (id)` junto da chave composta.
- Falha no meio: a migração roda inteira ou nada (transação); plano B = o banco fica como está.
- A API do Supabase (PostgREST) monta as junções `atividade → aulas` pelas chaves
  estrangeiras: recriadas com o mesmo nome, as telas seguem iguais.

### Decisões

- (aguardando o "sim" do usuário ao plano)

### #256.1 — Plano e aprovação

**Próximo passo:** esperar o "sim" do usuário.

- **Nível:** PESADO — mudança de chave no banco.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro

### #256.2 — Migração da chave composta

**Próximo passo:** depois do "sim".

- **Nível:** PESADO — schema do banco (chaves).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Verificação:** consulta às restrições de `aulas`, `atividade` e `aula_turma` depois da
  migração; contagem das 103 aulas igual; junção `atividade → aulas` pela API respondendo.
