## Etapa 453-e41c087e — Atividade ligada às turmas; excluir só na turma atual

**Tarefa:** #324-e41c087e-cd62-4347-8a4f-26e1b7254a7f · **Pedido em:** 2026-10-21 12:49 · **Criada por:** Claude Code (Opus 5.5) (nuvem · clever-edison-o722i5)
**Pedido:** "crie 1 tarefa para: faça a exclusão da atividade valer só pra turma atual, e ficar
ligada nas turmas e nao somente na aula, ao carregar a atividade no card, ja esta sendo pego
apenas as atividades da turma atual selecionada?" → "deve ter esta ligacao aqui: aula, x
atividade x materia x turma ?"
**Objetivo:** a atividade passa a ser ligada a aula × matéria × turma; excluir no card apaga só
na turma do combo, e o card mostra só as atividades da turma escolhida.

### Situação de hoje (levantada em 2026-10-21)

- `atividade` liga só à aula (`atividade.aula_id → aulas.id`; a matéria vem de
  `aulas.materia_id`). Não existe tabela atividade × turma.
- Excluir (`excluirAtividadeDaAulaCard`, `assets/js/indice-aula-repositorio.js`, e
  `excluirAtividadeCrud`, `assets/js/atividades-crud-repositorio.js`) faz `DELETE` na linha da
  atividade: some de **todas** as turmas, com gabarito, respostas e entregas em cascata.
- O card **não filtra pela turma**: `listarAtividadesDaAulaCard` (modal da aula, por `aula_id`)
  e `buscarAtividadesDasAulasCard` (botões do card, `aula_id` + `ativo`). A única separação por
  turma é o `atividade.bloqueio` (lista de turmas) no RLS
  (`atividade_liberada_para_usuario`), que esconde do **aluno**; o professor vê todas.
- Padrão parecido já existe para a aula: `aula_turma` (`aula_id`, `materia_id` copiada da aula
  por gatilho, `turma_codigo`, `data_aula`, `bloqueio`) — `docs/database.md`.
- Levantado no plano (#324.1): o card junta dois tipos de link — os do HTML da pasta (só ficam
  se `atividade.aula_id` = aula do card, #316; `indice-aula-grade-banco.js`) e os 📝 do banco
  (`indice-aula-atividades-vinculadas.js`). Para o **aluno**, o que o RLS esconde some dos dois
  (o link do HTML sai porque a atividade não é lida). Para o **professor** (lê tudo), o filtro
  pela turma precisa ser feito na tela, nos dois tipos de link.
- `turma_materia` (#211) só tinha Introdução à TIC (matéria 25) × 135080 e 135081 na criação;
  matéria sem linha nela mostra todas as turmas no combo.
- O alerta de pendentes do card (`atividades_pendentes_turma`, #293) é por turma e hoje conta
  toda atividade com aula.

### Escopo

- **Entra:**
  - Tabela nova `aula_atividade_turma` (aula × atividade × matéria × turma), com RLS, gatilhos e
    carga inicial (#324.2, parte 1).
  - Funções no banco: `atividade_na_turma`, `atividades_das_aulas_por_turma` (leitura das telas)
    e `definir_atividade_na_turma` (excluir e religar numa turma) (#324.2, parte 1).
  - Aluno passa a ver só as atividades ligadas à turma dele (RLS `atividade_select`,
    `item_valido`, `topico_valido`); o alerta de pendentes deixa de contar a atividade fora da
    turma (#324.2, parte 2).
  - Card e modal "✏️ Editar aula": só as atividades da turma do combo; 🗑️ tira só da turma
    (#324.3).
  - CADASTRAR ATIVIDADES: 🗑️ tira só da turma do combo; a atividade fora da turma aparece
    marcada, com "↩ Religar na turma" (#324.4) — é o caminho para a decisão 1 ("voltam se
    religar").
  - Documentação (#324.5).
- **Não entra:** mudar a hierarquia `curso → materia → aulas → atividade`; notas já lançadas;
  relatórios do professor, progresso da turma e média final (continuam contando a atividade
  excluída da turma); apagar a atividade de vez pelas telas (deixa de existir: só por SQL, com
  pedido do usuário); ligar turmas às matérias (já existe: 📚 Matérias em `turmas.html`);
  visitante sem login (continua lendo as atividades ativas, como hoje).
- **Critério de pronto:**
  1. Toda atividade com aula ligada a todas as turmas da matéria (`turma_materia`), com a
     contagem conferida.
  2. 🗑️ no modal da aula e no CADASTRAR ATIVIDADES tira a atividade só da turma do combo;
     gabarito, respostas e entregas continuam no banco.
  3. Card e modal do professor mostram só as atividades da turma do combo; sem turma no combo,
     tudo como hoje.
  4. Aluno vê só as atividades da turma dele (simulação em transação desfeita).
  5. Atividade nova entra sozinha em todas as turmas da matéria.
  6. `node --check` ok nos JS alterados; documentação atualizada.

### Riscos

| Risco | Plano B |
|---|---|
| Carga incompleta: aluno perde atividade | Parte 2 só após a carga conferida; desfazer pronto |
| Matéria sem `turma_materia` | Regra de transição P1: vale para todas as turmas, como hoje |
| Aluno em turma fora da `turma_materia` | Consulta antes da parte 2; > 0 → parar e avisar |
| Até a #324.3/#324.4, o 🗑️ antigo apaga de vez | Recado: não usar o 🗑️ até as telas |
| RLS mais lento (função por linha) | Tabela pequena; índice único; `explain` só de leitura |
| Religar turma à matéria devolve as excluídas nela (P5) | Documentado; excluir de novo |
| Relatórios e média final contam a atividade excluída da turma | Fora do escopo; vira tarefa nova |
| Exclusão apagar respostas | Impossível: a função só apaga a linha do vínculo (atividade + turma) |
| Rodar o SQL de novo religaria o que foi excluído | Carga só com a tabela vazia (P9) |
| Link do HTML escondido ainda com ON/OFF visível | Link e controles dentro de um `span hidden` |

### Decisões

| Quando | Decisão | Quem |
|---|---|---|
| 2026-10-21 12:49 | O vínculo é aula × atividade × matéria × turma (tabela própria) | Usuário |
| 2026-10-21 12:58 | Excluir numa turma tira só o vínculo; respostas e entregas ficam | Usuário |
| 2026-10-21 12:58 | Fora da última turma, a atividade fica guardada no banco, sem turma | Usuário |
| 2026-10-21 12:58 | Atividade nova entra em todas as turmas da matéria (turma_materia) | Usuário |
| 2026-10-21 12:58 | `bloqueio` fica: vínculo = existe na turma; bloqueio = liberada | Usuário |

### Plano

Escrito na #324.1 (2026-10-21) por Claude Code (Opus · executor-pesado)
(nuvem · clever-edison-o722i5). Vale com o "sim" do usuário.

#### Regras de funcionamento (propostas; entram com o "sim")

- **P1 — "Atividade na turma":** existe a linha atividade + turma na `aula_atividade_turma`.
  **Regra de transição:** atividade sem aula, ou de matéria sem nenhuma turma em
  `turma_materia`, vale para todas as turmas (como hoje). Motivo: é a mesma regra do combo
  "Turma:" (matéria sem vínculo = todas); sem ela, as atividades das matérias ainda sem
  `turma_materia` sumiriam para os alunos.
- **P2 — Quem grava:** ninguém grava direto na tabela pelo site (só `select`). Excluir e religar
  passam pela função `definir_atividade_na_turma` (professor da turma ou administrador; recusa
  turma que não é da matéria, com mensagem clara), no molde do `definir_bloqueio_turma`. O resto
  é feito pelos gatilhos.
- **P3 — Atividade nova** (com aula): o gatilho liga em todas as turmas da matéria (decisão 3).
  O cadastro (#324.4) não grava vínculo.
- **P4 — Atividade muda de aula:** mesma matéria → os vínculos acompanham (troca só o `aula_id`;
  as exclusões ficam). Outra matéria → sai das turmas antigas e entra em todas as da matéria
  nova. Ficou sem aula ("−") → sai de todas as turmas; ao ganhar aula de novo, entra em todas.
- **P5 — Turma ligada a uma matéria** (insert em `turma_materia`): recebe todas as atividades da
  matéria (também as que tinham sido excluídas nela). Turma desligada da matéria: os vínculos
  ficam (nada se apaga sozinho).
- **P6 — Sem turma no combo:** card e modal como hoje (todas as atividades); 🗑️ não apaga nada e
  pede para escolher a turma. Nenhuma tela apaga mais a atividade de vez (decisão 2).
- **P7 — Professor** continua lendo tudo no banco; o filtro dele é de tela, pela turma do combo.
  **Aluno:** pelo RLS. **Visitante sem login:** como hoje (ativas).
- **P8 — Aluno com mais de uma turma** vê a atividade se, em pelo menos uma turma dele, ela
  estiver ligada **e** liberada (`atividade.bloqueio`) — a mesma turma para as duas coisas.
- **P9 — Carga** só roda com a tabela vazia: rodar o script de novo não religa o que foi
  excluído.
- **P10 — Duas partes no banco:** parte 1 (tabela, gatilhos, funções, carga) não muda nada para
  o aluno; parte 2 (RLS do aluno e pendentes) só depois da carga conferida.

#### Banco (#324.2 — só Claude Code local)

Arquivos novos (idempotentes, sem apagar dados), registrados em `database/SEEDS-APLICADOS.md`:

- `database/2026-10-21-aula-atividade-turma.sql` — parte 1.
- `database/2026-10-21-aula-atividade-turma-aluno.sql` — parte 2.

**Tabela `aula_atividade_turma`:**

| Coluna | Tipo | Regra |
|---|---|---|
| `id` | `bigint` identity (PK) | — |
| `aula_id` | `bigint not null` → `aulas.id` (on delete cascade) | copiada da atividade (gatilho) |
| `atividade_id` | `bigint not null` → `atividade.id` (on delete cascade) | — |
| `materia_id` | `bigint not null` → `materia.id` (on delete cascade) | copiada da aula (gatilho) |
| `turma_codigo` | `text not null` → `turma.codigo` (on update/delete cascade) | — |
| `criado_em` / `criado_por` | `timestamptz` / `uuid` (`auth.uid()`, on delete set null) | — |

Única em (`atividade_id`, `turma_codigo`); índices (`turma_codigo`, `aula_id`) e
(`materia_id`, `turma_codigo`). A FK das respostas e entregas continua na `atividade`: apagar o
vínculo não apaga nada delas.

**Objetos novos ou alterados:**

| Objeto | Tipo | O que faz |
|---|---|---|
| `aula_atividade_turma_copiar_aula_trg` | gatilho BEFORE | copia aula e matéria; recusa sem aula |
| `ligar_atividade_nas_turmas_da_materia(id)` | função interna | liga nas turmas da matéria |
| `atividade_acompanha_turmas_da_aula_trg` | gatilho AFTER na `atividade` | P3 e P4 |
| `turma_materia_liga_atividades_trg` | gatilho AFTER na `turma_materia` | P5 |
| `atividade_na_turma(id, turma)` | função (definer) | P1 |
| `atividades_das_aulas_por_turma(turma, aulas[])` | RPC (invoker) | telas: id, página, `na_turma` |
| `definir_atividade_na_turma(id, turma, ligar)` | RPC (definer) | excluir/religar numa turma (P2) |
| `atividade_visivel_para_usuario(id, bloqueio)` | função (parte 2) | P8 |
| `atividade_select`, `item_valido`, `topico_valido` | parte 2 | trocam a conferência pela P8 |
| `atividades_pendentes_turma` | parte 2 | só conta atividade na turma |

**RLS da tabela:** ligado; `anon` sem acesso; `authenticated` só `select`; `truncate` revogado.
Lê: professor das turmas dele (`eh_professor()` + `professor_tem_turma`, administrador em
todas) e o aluno das turmas dele (`turmaaluno`).

**Rascunho da parte 1** (o executor da #324.2 confere no banco antes de aplicar):

```sql
-- 1) Tabela e RLS -------------------------------------------------------------------------
create table if not exists public.aula_atividade_turma (
  id           bigint generated always as identity primary key,
  aula_id      bigint not null references public.aulas (id) on delete cascade,
  atividade_id bigint not null references public.atividade (id) on delete cascade,
  materia_id   bigint not null references public.materia (id) on delete cascade,
  turma_codigo text   not null
               references public.turma (codigo) on update cascade on delete cascade,
  criado_em    timestamptz not null default now(),
  criado_por   uuid default auth.uid() references auth.users (id) on delete set null,
  constraint aula_atividade_turma_unica unique (atividade_id, turma_codigo)
);
create index if not exists aula_atividade_turma_turma_aula_idx
  on public.aula_atividade_turma (turma_codigo, aula_id);
create index if not exists aula_atividade_turma_materia_turma_idx
  on public.aula_atividade_turma (materia_id, turma_codigo);

alter table public.aula_atividade_turma enable row level security;
revoke all on public.aula_atividade_turma from anon, authenticated;
grant select on public.aula_atividade_turma to authenticated;

drop policy if exists aula_atividade_turma_select on public.aula_atividade_turma;
create policy aula_atividade_turma_select on public.aula_atividade_turma
  for select to authenticated
  using (((select public.eh_professor())
          and public.professor_tem_turma(aula_atividade_turma.turma_codigo))
         or exists (select 1 from public.turmaaluno ta
                     where ta.aluno_id = auth.uid()
                       and ta.turma_codigo = aula_atividade_turma.turma_codigo));

-- 2) A aula e a matéria do vínculo são sempre as da atividade ------------------------------
create or replace function public.aula_atividade_turma_copiar_aula()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  select a.aula_id, au.materia_id into new.aula_id, new.materia_id
    from public.atividade a
    join public.aulas au on au.id = a.aula_id
   where a.id = new.atividade_id;
  if new.aula_id is null then
    raise exception 'A atividade % não tem aula: não pode ser ligada a uma turma.',
      new.atividade_id;
  end if;
  return new;
end $$;
revoke execute on function public.aula_atividade_turma_copiar_aula()
  from public, anon, authenticated;
drop trigger if exists aula_atividade_turma_copiar_aula_trg on public.aula_atividade_turma;
create trigger aula_atividade_turma_copiar_aula_trg
  before insert or update on public.aula_atividade_turma
  for each row execute function public.aula_atividade_turma_copiar_aula();

-- 3) Liga uma atividade em todas as turmas da matéria da aula dela (P3) -------------------
create or replace function public.ligar_atividade_nas_turmas_da_materia(p_atividade bigint)
returns void language sql security definer set search_path = public as $$
  insert into public.aula_atividade_turma (atividade_id, turma_codigo)
  select a.id, tm.turma_codigo
    from public.atividade a
    join public.aulas au on au.id = a.aula_id
    join public.turma_materia tm on tm.materia_id = au.materia_id
   where a.id = p_atividade
  on conflict (atividade_id, turma_codigo) do nothing;
$$;
revoke execute on function public.ligar_atividade_nas_turmas_da_materia(bigint)
  from public, anon, authenticated;

-- 4) Atividade nova ou que mudou de aula (P3 e P4) ----------------------------------------
create or replace function public.atividade_acompanha_turmas_da_aula()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_materia_antiga bigint;
  v_materia_nova   bigint;
begin
  if tg_op = 'UPDATE' and old.aula_id is not distinct from new.aula_id then
    return new;
  end if;
  if tg_op = 'UPDATE' then
    select materia_id into v_materia_antiga from public.aulas where id = old.aula_id;
    select materia_id into v_materia_nova from public.aulas where id = new.aula_id;
    if v_materia_antiga = v_materia_nova then
      update public.aula_atividade_turma set aula_id = new.aula_id
       where atividade_id = new.id;
      return new;
    end if;
    delete from public.aula_atividade_turma where atividade_id = new.id;
  end if;
  perform public.ligar_atividade_nas_turmas_da_materia(new.id);
  return new;
end $$;
revoke execute on function public.atividade_acompanha_turmas_da_aula()
  from public, anon, authenticated;
drop trigger if exists atividade_acompanha_turmas_da_aula_trg on public.atividade;
create trigger atividade_acompanha_turmas_da_aula_trg
  after insert or update of aula_id on public.atividade
  for each row execute function public.atividade_acompanha_turmas_da_aula();

-- 5) Turma ligada a uma matéria recebe as atividades dela (P5) ----------------------------
create or replace function public.turma_materia_liga_atividades()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.aula_atividade_turma (atividade_id, turma_codigo)
  select a.id, new.turma_codigo
    from public.atividade a
    join public.aulas au on au.id = a.aula_id
   where au.materia_id = new.materia_id
  on conflict (atividade_id, turma_codigo) do nothing;
  return new;
end $$;
revoke execute on function public.turma_materia_liga_atividades()
  from public, anon, authenticated;
drop trigger if exists turma_materia_liga_atividades_trg on public.turma_materia;
create trigger turma_materia_liga_atividades_trg
  after insert on public.turma_materia
  for each row execute function public.turma_materia_liga_atividades();

-- 6) A atividade existe na turma? (P1, com a regra de transição) ---------------------------
create or replace function public.atividade_na_turma(p_atividade bigint, p_turma text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.aula_atividade_turma v
                  where v.atividade_id = p_atividade and v.turma_codigo = p_turma)
      or not exists (select 1 from public.atividade a
                       join public.aulas au on au.id = a.aula_id
                       join public.turma_materia tm on tm.materia_id = au.materia_id
                      where a.id = p_atividade);
$$;
revoke all on function public.atividade_na_turma(bigint, text) from public, anon;
grant execute on function public.atividade_na_turma(bigint, text) to authenticated;

-- 7) Leitura das telas: atividades das aulas com a marca da turma (RLS da atividade vale) --
create or replace function public.atividades_das_aulas_por_turma(p_turma text,
                                                                 p_aulas bigint[])
returns table (atividade_id bigint, pagina text, na_turma boolean)
language sql stable security invoker set search_path = public as $$
  select a.id, a.pagina, public.atividade_na_turma(a.id, p_turma)
    from public.atividade a
   where a.aula_id = any (p_aulas)
   order by a.id;
$$;
revoke all on function public.atividades_das_aulas_por_turma(text, bigint[]) from public, anon;
grant execute on function public.atividades_das_aulas_por_turma(text, bigint[])
  to authenticated;

-- 8) Excluir (p_ligar = false) ou religar (true) a atividade numa turma (P2) ---------------
create or replace function public.definir_atividade_na_turma(p_atividade bigint,
                                                             p_turma text, p_ligar boolean)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  v_materia bigint;
begin
  if not public.eh_professor() or not public.professor_tem_turma(p_turma) then
    raise exception 'Sem permissão para mudar as atividades da turma %.', p_turma;
  end if;
  select au.materia_id into v_materia
    from public.atividade a join public.aulas au on au.id = a.aula_id
   where a.id = p_atividade;
  if v_materia is null then
    raise exception 'A atividade % não existe ou não tem aula.', p_atividade;
  end if;
  if not exists (select 1 from public.turma_materia
                  where materia_id = v_materia and turma_codigo = p_turma) then
    raise exception 'A turma % não está ligada à matéria desta atividade (📚 Matérias).',
      p_turma;
  end if;
  if p_ligar then
    insert into public.aula_atividade_turma (atividade_id, turma_codigo)
    values (p_atividade, p_turma) on conflict (atividade_id, turma_codigo) do nothing;
  else
    delete from public.aula_atividade_turma
     where atividade_id = p_atividade and turma_codigo = p_turma;
  end if;
  return p_ligar;
end $$;
revoke all on function public.definir_atividade_na_turma(bigint, text, boolean)
  from public, anon;
grant execute on function public.definir_atividade_na_turma(bigint, text, boolean)
  to authenticated;

-- 9) Carga inicial: toda atividade com aula × todas as turmas da matéria (P9) ---------------
insert into public.aula_atividade_turma (atividade_id, turma_codigo)
select a.id, tm.turma_codigo
  from public.atividade a
  join public.aulas au on au.id = a.aula_id
  join public.turma_materia tm on tm.materia_id = au.materia_id
 where not exists (select 1 from public.aula_atividade_turma)
on conflict (atividade_id, turma_codigo) do nothing;
```

**Rascunho da parte 2** (só depois das conferências da parte 1):

```sql
-- 1) Aluno: ligada E liberada na mesma turma dele (P8) -------------------------------------
create or replace function public.atividade_visivel_para_usuario(p_atividade bigint,
                                                                 p_bloqueio jsonb)
returns boolean language sql stable security definer set search_path = public as $$
  select auth.uid() is null
      or public.eh_professor()
      or not exists (select 1 from public.turmaaluno ta where ta.aluno_id = auth.uid())
      or exists (select 1 from public.turmaaluno ta
                  where ta.aluno_id = auth.uid()
                    and not (coalesce(p_bloqueio, '[]'::jsonb) ? ta.turma_codigo)
                    and public.atividade_na_turma(p_atividade, ta.turma_codigo));
$$;
revoke all on function public.atividade_visivel_para_usuario(bigint, jsonb) from public;
grant execute on function public.atividade_visivel_para_usuario(bigint, jsonb)
  to anon, authenticated;

-- 2) Leitura da atividade --------------------------------------------------------------------
drop policy if exists atividade_select on public.atividade;
create policy atividade_select on public.atividade
  for select to anon, authenticated
  using ((ativo and public.atividade_visivel_para_usuario(id, bloqueio))
         or public.eh_professor());

-- 3) item_valido e topico_valido: definição atual (2026-10-15) trocando só
--    "public.atividade_liberada_para_usuario(a.bloqueio)" por
--    "public.atividade_visivel_para_usuario(a.id, a.bloqueio)".
-- 4) atividades_pendentes_turma: definição atual (pg_get_functiondef) acrescentando no CTE
--    "atividades": "and public.atividade_na_turma(a.id, p_turma)" no where.
```

`atividade_liberada_para_usuario` fica no banco sem mudança (pode haver outro uso).

**Conferências (só leitura; números anotados na seção da #324.2):**

1. Antes da carga — esperado:
   `select count(*) from atividade a join aulas au on au.id = a.aula_id
   join turma_materia tm on tm.materia_id = au.materia_id;`
2. Depois — gravado = esperado; 0 repetidos; 0 faltando (anti-join do mesmo `select` com a
   tabela); 0 linhas com `aula_id`/`materia_id` diferente da atividade/aula.
3. Matérias com atividade e **sem** `turma_materia` (ficam pela regra de transição): listar
   `materia.id`, `descricao` e quantidade, e mostrar ao usuário.
4. Antes da parte 2 — alunos que perderiam acesso: com entrega em atividade de matéria com
   `turma_materia`, mas sem nenhuma turma (`turmaaluno`) ligada a essa matéria. Esperado 0;
   senão parar e avisar o usuário.
5. Simulações em transação desfeita (`begin … rollback`, `set local role authenticated` +
   `request.jwt.claims`): aluno de 135080 e de 135081 leem as mesmas atividades antes e depois
   da parte 2; excluir uma atividade na 135080 → some só para o aluno da 135080, as respostas
   dela continuam (contagem igual); religar → volta; professor sem a turma → erro; atividade
   nova com aula de ITIC → 2 vínculos; trocar a aula para outra matéria → vínculos trocam.

**Desfazer a parte 2 (plano B):** recriar `atividade_select` com
`(ativo and public.atividade_liberada_para_usuario(bloqueio)) or public.eh_professor()`, rodar de
novo a seção 2 de `database/2026-10-15-liberar-gabarito-encerra-preenchimento.sql` e o
`database/2026-10-19-atividades-pendentes-turma.sql`. A parte 1 pode ficar (não muda nada para o
aluno).

#### Telas (#324.3 e #324.4)

Turma = valor do combo `.barra-turma-favorita__lista` (só existe para o professor). Sem combo ou
vazio = como hoje (P6). Erros do banco aparecem com a mensagem da função (ex.: turma fora da
matéria).

**#324.3 — `assets/js/indice-aula-repositorio.js`:**

- Constantes `RPC_ATIVIDADES_POR_TURMA_CARD = 'atividades_das_aulas_por_turma'` e
  `RPC_DEFINIR_ATIVIDADE_NA_TURMA_CARD = 'definir_atividade_na_turma'`.
- Nova `lerAtividadesPorTurmaCard(turma, idsAulas)` → `[{atividade_id, pagina, na_turma}]` pelo
  `cliente.rpc`; sem turma ou sem aulas → `[]`; erro → `throw new Error(error.message)`.
- Nova `listarAtividadesDaAulaNaTurmaCard(idAula, turma)`: sem turma = `listarAtividadesDaAulaCard`;
  com turma = a mesma lista filtrada pelos ids com `na_turma`.
- Nova `excluirAtividadeDaTurmaCard(idAtividade, turma)`: RPC com `p_ligar: false`.
- Sai `excluirAtividadeDaAulaCard` (o `DELETE` da atividade). `listarAtividadesDaAulaCard` e
  `buscarAtividadesDasAulasCard` ficam iguais (também usadas por `indice-aula-excluir-card.js` e
  `indice-atividades-id-aluno.js`).

**#324.3 — `assets/js/indice-aula-atividades-vinculadas.js`:**

- `lerTurmaDoComboVinculadas()` (vazio para aluno e sem combo).
- Links do HTML de atividade **fora da turma** vão para dentro de um `<span hidden
  data-fora-da-turma>` no mesmo lugar do `.acoes` (antes, saem os controles que vêm logo depois
  do link: ON/OFF, ✏️, "−"; os que outros módulos puserem depois com `link.after` ficam dentro
  do span, escondidos). `devolverLinksDaTurma()` troca cada span pelo link.
- `renderizarAtividadesVinculadas(itens)`: 1) remove os 📝 e devolve os links escondidos;
  2) lê em paralelo `buscarAtividadesDasAulasCard` e `lerAtividadesPorTurmaCard`; 3) esconde os
  links do HTML cuja chave (`obterChaveDaPagina`) é de atividade com `na_turma = false`; 4) cria
  os 📝 só das atividades na turma.
- `inserirBotoesNoCard`: âncora = último `:scope > a.btn` do `.acoes` (não pega link escondido).
- Ouve `turma-indice-alterada` → `atualizarAtividadesVinculadasDoIndice()` (de
  `indice-aula-data.js`, se existir), que já refaz os botões, redesenha os cards e remonta os
  ON/OFF. O combo dispara esse evento também ao abrir (`indice-turma-favorita.js`).

**#324.3 — `assets/js/indice-aula-modal.js`:**

- `turmaDoComboModalAula()`; guardar o `h3` da lista em `elementosModalAula`.
- `carregarAtividadesModalAula`: `listarAtividadesDaAulaNaTurmaCard(id, turma)`; título
  "Atividades desta aula na turma X" (sem turma: como hoje); vazio: "Nenhuma atividade desta
  aula na turma X."
- Botão "🗑️ Excluir da turma". `aoExcluirAtividadeAula`: sem turma → mensagem "Escolha a turma
  no combo "Turma:" do índice: a exclusão vale só para ela." e não chama o banco; com turma →
  confirmação nova ("A atividade ID N — nome sai da turma X. O gabarito, as respostas e as
  entregas dos alunos ficam guardados e voltam se ela for ligada de novo à turma.
  Continuar?") → `excluirAtividadeDaTurmaCard` → recarrega lista e cards → "✅ Atividade
  excluída da turma X."

**#324.4 — `assets/js/atividades-crud-repositorio.js`:**

- Sai `excluirAtividadeCrud` (o `DELETE`).
- Nova `definirAtividadeNaTurmaCrud(id, turma, ligar)` (RPC `definir_atividade_na_turma`).
- Nova `lerTurmaDasAtividadesCrud(turma, idsAulas)` → `Map<atividade_id, na_turma>` (RPC
  `atividades_das_aulas_por_turma`; sem turma → `Map` vazio).
- `gravarAtividadeCrud` igual: a atividade nova entra nas turmas pelo gatilho (P3).

**#324.4 — `assets/js/atividades-crud-modal.js`:**

- Turma do combo; `recarregarListaCrud` guarda `na_turma` em cada atividade (aulas das
  atividades da lista).
- `criarLinhaAtividadeCrud`: na turma → "🗑️ Excluir da turma"; fora → " · FORA DA TURMA X" no
  detalhe e "↩ Religar na turma" (`data-acao="religar"`) no lugar do 🗑️.
- `aoExcluirCrud(id)`: sem turma → mensagem; com turma → confirmação nova (mesmo texto do modal
  da aula) → `definirAtividadeNaTurmaCrud(id, turma, false)` → recarrega lista e cards.
- `aoReligarCrud(id)` (novo): confirma ("A atividade volta para a turma X, com as respostas e
  entregas guardadas.") → `definirAtividadeNaTurmaCrud(id, turma, true)` → recarrega.
- `aoClicarModalCrud`: ação `religar`. O arquivo tem 862 linhas: deve ficar ≤ 1000 (se passar,
  a parte da turma vai para `assets/js/atividades-crud-turma.js`).

#### Verificação (sem navegador e sem testes automatizados)

- **#324.2:** conferências 1 a 5 acima, com os números na seção; registro dos 2 arquivos em
  `database/SEEDS-APLICADOS.md`.
- **#324.3 e #324.4:** `node --check` nos arquivos alterados; `grep` sem `sbDelete` de
  `atividade` neles; leitura do código contra este plano; `wc -l` ≤ 1000. Para o usuário
  conferir na tela: trocar a turma do combo muda as atividades do card; 🗑️ tira só da turma;
  "↩ Religar" devolve; aluno de cada turma vê só as dele.
- **#324.5:** leitura dos documentos contra o banco e o código entregues.

### #324.1 — Plano detalhado e aprovação do usuário

**Próximo passo:** líder mostra o plano ao usuário e registra o "sim" em Decisões.

- **Nível:** PESADO — banco, RLS e arquitetura do vínculo
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Critérios de aceitação:** plano nesta etapa (escopo, decisões, SQL previsto, arquivos,
  verificação) e "sim" do usuário registrado em Decisões.
- **Entrega:** plano escrito na seção "Plano" (2026-10-21) · **Verificação:** —

### #324.2 — Banco: tabela do vínculo, RLS, carga inicial e "excluir na turma"

**Próximo passo:** esperar o "sim" da #324.1. Depois (Claude Code local): conferir no banco as
definições atuais de `item_valido`, `topico_valido` e `atividades_pendentes_turma`
(`pg_get_functiondef`), criar os 2 arquivos do Plano, aplicar a parte 1, fazer as conferências
1 a 4 e só então aplicar a parte 2 e a conferência 5.

- **Nível:** PESADO — SQL, RLS e carga em produção
- **Modelo:** só Claude Code local (Opus 5.5+ ou Fable) — nunca outro (banco só local)
- **Descrição:** `database/2026-10-21-aula-atividade-turma.sql` (parte 1: tabela, RLS,
  gatilhos, funções, carga) e `database/2026-10-21-aula-atividade-turma-aluno.sql` (parte 2:
  `atividade_visivel_para_usuario`, `atividade_select`, `item_valido`, `topico_valido`,
  `atividades_pendentes_turma`), conforme o Plano. Recado em `tasks/RECADOS.md`: não usar o 🗑️
  de atividade até a #324.3 e a #324.4.
- **Critérios de aceitação:** SQL idempotente, aplicado e registrado; carga = contagem esperada
  (0 faltando, 0 repetidos); RLS: aluno lê só da turma dele, ninguém grava direto na tabela;
  `definir_atividade_na_turma` recusa quem não é professor da turma e turma fora da matéria;
  respostas e entregas intactas; matérias sem `turma_materia` listadas para o usuário.
- **Entrega:** — · **Verificação:** —

### #324.3 — Card e modal da aula: só as atividades da turma do combo; excluir só nela

**Próximo passo:** esperar a #324.2.

- **Nível:** MEDIO — JS de tela, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `indice-aula-repositorio.js`, `indice-aula-modal.js`,
  `indice-aula-atividades-vinculadas.js` — funções e textos do Plano ("Telas", #324.3).
- **Critérios de aceitação:** card (links do HTML e 📝) e modal listam só as atividades da turma
  do combo; sem turma, como hoje; trocar a turma refaz o card; 🗑️ chama
  `definir_atividade_na_turma` (nenhum `DELETE` de atividade); confirmação diz a turma e que as
  respostas ficam; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #324.4 — Cadastro de atividades: excluir e religar na turma do combo

**Próximo passo:** esperar a #324.2.

- **Nível:** MEDIO — JS de tela, até 3 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** `atividades-crud-repositorio.js` e `atividades-crud-modal.js` — funções e
  textos do Plano ("Telas", #324.4). O cadastro não grava vínculo (gatilho P3).
- **Critérios de aceitação:** 🗑️ tira só da turma do combo (sem turma, só avisa); atividade
  fora da turma aparece marcada, com "↩ Religar na turma"; nenhum `DELETE` de atividade;
  arquivo ≤ 1000 linhas; `node --check` ok.
- **Entrega:** — · **Verificação:** —

### #324.5 — Documentação do vínculo atividade × turma

**Próximo passo:** esperar a #324.3 e a #324.4.

- **Nível:** LEVE — só `.md`/relatório
- **Modelo:** só Haiku — nunca outro
- **Descrição:** `docs/database.md` (seção nova `aula_atividade_turma` com tabela, gatilhos,
  funções, RLS e as regras P1–P9; `atividade_select` atualizada) e
  `docs/relatorio_verificacao_database.html`; `docs/regras/atividades.md` (excluir = só na
  turma; religar no CADASTRAR ATIVIDADES; atividade nova entra em todas as turmas da matéria).
- **Critérios de aceitação:** textos batem com o SQL aplicado e o código entregue.
- **Entrega:** — · **Verificação:** —
