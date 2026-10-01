# Avaliação Prática Discursiva — Introdução à TIC (30 questões, 30 pontos)

**Objetivo:** criar a página `AVALIACAO-PRATICA.html` de Introdução à TIC com 30 questões
discursivas (Contexto + Comando + tópicos), em que o aluno escreve a resposta de cada tópico e
ela fica gravada no banco (Supabase) para correção posterior com IA.

**Tech Stack:** Markdown (fonte), Python (gerador), HTML + CSS + JavaScript vanilla, Supabase
(PostgreSQL + RLS + REST com JWT do aluno).

**Criado em:** 2026-10-01 10:26
**Concluído em:** 2026-10-01 10:50 (passo 9 aguardando pedido)
**Tempo decorrido:** ~60:00

---

## Contexto e decisões

- **Fonte das questões:** `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA.md`
  (já escrito, aguardando aprovação). São 3 questões por aula (aulas 01 a 10), todas com
  **Contexto** e **Comando**. A empresa é fictícia (Distribuidora Vale Sul Logística).
- **Tópicos:** cada questão tem de 1 a 3 tópicos (a, b, c), cada um com **o seu campo de
  resposta** e o seu valor. A soma dos tópicos de cada questão é 1 ponto (total de 30 pontos).
- **Banco hoje:** `resposta_atividade.letra` só aceita A–E (`resposta_atividade_letra_check`) e
  `atividade_completa()` conta essas linhas. Não dá para gravar texto. Solução: **tabelas novas**,
  sem mexer nas atividades objetivas.
- **Regras que continuam valendo:** login só para responder; nada de localStorage; horário da turma
  (é avaliação `AVALIACAO-*`, nunca liberada fora do horário); "Finalizar" só entrega com todos os
  tópicos gravados (relendo do banco); popups no lugar de `alert`; tentativas e recuperação pelo
  professor (a nova tentativa abre **em branco**, porque não há gabarito de letras).
- **Padrão de resposta (para a IA corrigir depois):** fica **só** no banco, na tabela
  `topico_discursivo` (leitura exclusiva do professor), e na fonte local
  `CONTEUDO/AVALIACAO-PRATICA-GABARITO.md`, que fica fora do Git (`*gabarito*` no `.gitignore`).
  O seed SQL gerado também fica fora do Git (`database/*-seed-atividades.sql`).
- **Fora deste escopo (tarefa seguinte, se você quiser):** a correção com IA em si, a tabela de
  notas por tópico e a nota da prática na `AVALIACAO-MEDIA-FINAL.html`.

## ⚠️ Divergência com a ementa

O `INTRODUCAO-TIC/EMENTA-CHALKIE-AI.md` (seção V) prevê **Avaliação Prática: 4 tarefas, 100 min,
peso 6,0**. O pedido é **30 questões discursivas, 30 pontos**, e a `AVALIACAO-MEDIA-FINAL.html` já
usa 30 pontos para a prática. Pela regra do projeto a ementa vence, então **sigo o pedido só se
você confirmar**. A ementa não será alterada sem pedido. A duração estimada de 30 questões escritas
é de **150 a 180 minutos**.

## Riscos

- Mudança no banco (tabelas, RLS e funções novas). O SQL é idempotente e não apaga dados; não mexe
  em `resposta_atividade` nem em `entrega_atividade`, só **amplia** a função
  `atividade_completa()` para também contar tópicos discursivos.
- Respostas longas: limite de 3.000 caracteres por tópico (no banco e na página).
- Perda de texto: gravação automática 1,5 s depois que o aluno para de digitar e ao sair do campo,
  com aviso "✅ Resposta gravada" ou "❌ Resposta NÃO gravada".

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Questões em `AVALIACAO-PRATICA.md` | ✅ Concluído | 2026-10-01 10:26 | — | — |
| 2 | Padrão de resposta em `AVALIACAO-PRATICA-GABARITO.md` (fora do Git) | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |
| 3 | SQL das tabelas discursivas (`database/2026-10-01-respostas-discursivas.sql`) | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |
| 4 | Gerador da página e do seed (`assets/gerador-avaliacao-discursiva/`) | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |
| 5 | Repositório JS no banco (`assets/js/respostas-discursivas-banco.js`) | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |
| 6 | Tela JS e CSS (`assets/js/avaliacao-discursiva.js` + `assets/css/avaliacao-discursiva.css`) | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |
| 7 | Gerar `AVALIACAO-PRATICA.html` e o seed | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |
| 8 | Card no `index.html` e item no `MENU-ATIVIDADES.js` | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |
| 9 | Aplicar o SQL no Supabase (só com o seu pedido) | ⬜ Pendente | 2026-10-01 10:26 | — | — |
| 10 | Registrar a regra no `CLAUDE.md` e commit | ✅ Concluído | 2026-10-01 10:26 | 2026-10-01 10:50 | — |

---

### Passo 1: Questões

**Status:** ✅ Concluído (aprovado em 2026-10-01)

**Arquivo:** `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA.md`

**Ação:** 30 itens no formato abaixo. A página mostra, em cada questão, a **aula/tópico** da
questão, o Contexto, o Comando e um campo de texto por tópico com o seu valor.

```markdown
## ITEM 23 — Funções SE, CONT.SE e CONT.VALORES
- **Aula:** 08 · Editor de Planilhas: Organização e Fórmulas
**Contexto:** ...
**Comando:** ...
**Tópicos:**
- a) Escreva a fórmula da célula E2 com a função SE e explique cada parte. (0,4)
- b) Escreva a fórmula com CONT.SE ... (0,3)
- c) Escreva a fórmula com CONT.VALORES ... (0,3)
```

**Verificação:** o gerador (passo 4) recusa a fonte se não houver 30 itens, se faltar Contexto,
Comando ou tópicos, ou se a soma dos tópicos de algum item for diferente de 1.

---

### Passo 2: Padrão de resposta (para a IA)

**Status:** ✅ Concluído

**Arquivo:** Criar `.../ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA-GABARITO.md` (fora do Git)

**Ação:** para cada tópico, escrever a resposta esperada e os critérios de correção (o que vale
nota cheia, metade ou zero), no formato `### ITEM NN-a` + `**Resposta esperada:**` +
`**Critérios:**`.

**Verificação:**

```powershell
git check-ignore -v "MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/CONTEUDO/AVALIACAO-PRATICA-GABARITO.md"
```

Esperado: a linha `*[Gg][Aa][Bb][Aa][Rr][Ii][Tt][Oo]*` do `.gitignore`.

---

### Passo 3: SQL das tabelas discursivas

**Status:** ✅ Concluído

**Arquivo:** Criar `database/2026-10-01-respostas-discursivas.sql`

**Ação:** SQL idempotente com RLS:

```sql
-- Tópicos de cada questão discursiva; o padrão de resposta só o professor lê.
create table if not exists public.topico_discursivo (
  atividade_id bigint not null references public.atividade(id) on delete cascade,
  item smallint not null check (item > 0),
  topico smallint not null check (topico > 0),
  enunciado text not null,
  pontos numeric(4,2) not null check (pontos > 0),
  resposta_esperada text,
  criterios text,
  primary key (atividade_id, item, topico)
);
alter table public.topico_discursivo enable row level security;
drop policy if exists topico_discursivo_professor on public.topico_discursivo;
create policy topico_discursivo_professor on public.topico_discursivo
  for all to authenticated
  using ((select public.eh_professor())) with check ((select public.eh_professor()));

-- Respostas escritas do aluno, uma por tópico e tentativa.
create table if not exists public.resposta_discursiva (
  aluno_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  atividade_id bigint not null references public.atividade(id) on delete cascade,
  tentativa smallint not null default 1 check (tentativa >= 1),
  item smallint not null check (item > 0),
  topico smallint not null check (topico > 0),
  texto text not null check (char_length(btrim(texto)) between 1 and 3000),
  atualizado_em timestamptz not null default now(),
  primary key (aluno_id, atividade_id, tentativa, item, topico)
);
alter table public.resposta_discursiva enable row level security;

-- Tópico válido = existe em topico_discursivo (função security definer, o aluno não lê a tabela).
create or replace function public.topico_valido(p_atividade bigint, p_item smallint,
                                                p_topico smallint)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.topico_discursivo t join public.atividade a
                   on a.id = t.atividade_id
                 where t.atividade_id = p_atividade and t.item = p_item
                   and t.topico = p_topico and a.ativo);
$$;

-- Políticas iguais às de resposta_atividade (dono, não professor, tentativa atual,
-- não entregue, dentro do horário).
drop policy if exists resposta_discursiva_select on public.resposta_discursiva;
create policy resposta_discursiva_select on public.resposta_discursiva for select
  to authenticated
  using (aluno_id = (select auth.uid()) or (select public.eh_professor()));
drop policy if exists resposta_discursiva_insert on public.resposta_discursiva;
create policy resposta_discursiva_insert on public.resposta_discursiva for insert
  to authenticated
  with check (aluno_id = (select auth.uid()) and not (select public.eh_professor())
    and public.topico_valido(atividade_id, item, topico)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and public.pode_responder_no_horario(atividade_id));
drop policy if exists resposta_discursiva_update on public.resposta_discursiva;
create policy resposta_discursiva_update on public.resposta_discursiva for update
  to authenticated
  using (aluno_id = (select auth.uid()) and not (select public.eh_professor())
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa))
  with check (aluno_id = (select auth.uid()) and not (select public.eh_professor())
    and public.topico_valido(atividade_id, item, topico)
    and tentativa = public.tentativa_atual(atividade_id)
    and not public.atividade_entregue(atividade_id, tentativa)
    and public.pode_responder_no_horario(atividade_id));

-- Entrega: atividade discursiva está completa quando todos os tópicos têm resposta;
-- as objetivas continuam com a regra de antes.
create or replace function public.atividade_completa(p_atividade bigint, p_tentativa smallint)
returns boolean language sql stable security definer set search_path = public as $$
  select case
    when exists (select 1 from public.topico_discursivo t where t.atividade_id = p_atividade)
    then (select count(*) from public.resposta_discursiva r
          where r.aluno_id = auth.uid() and r.atividade_id = p_atividade
            and r.tentativa = p_tentativa)
       = (select count(*) from public.topico_discursivo t where t.atividade_id = p_atividade)
    else (select count(*) from public.resposta_atividade r
          where r.aluno_id = auth.uid() and r.atividade_id = p_atividade
            and r.tentativa = p_tentativa)
       = (select a.total_itens from public.atividade a where a.id = p_atividade)
  end;
$$;
```

**Observação:** foi incluída também a política `resposta_discursiva_delete` (apagar o texto do campo remove a resposta do tópico).

**Verificação (depois de aplicado):**

```sql
select tablename, rowsecurity from pg_tables
where tablename in ('topico_discursivo','resposta_discursiva');
```

Esperado: as duas tabelas com `rowsecurity = true`.

---

### Passo 4: Gerador da página e do seed

**Status:** ✅ Concluído

**Arquivo:** Criar `assets/gerador-avaliacao-discursiva/gerar_avaliacao_discursiva.py` e
`assets/gerador-avaliacao-discursiva/template_avaliacao_discursiva.html`

**Ação:** ler o `AVALIACAO-PRATICA.md` (e, se existir, o `-GABARITO.md`), validar (30 itens,
Contexto, Comando, tópicos e soma = 1) e gerar:
- `ATIVIDADES/AVALIACAO-PRATICA.html`: cabeçalho, instruções e um cartão por questão com o selo
  da aula/tópico, Contexto, Comando e, para cada tópico, `<label>` + `<textarea>`
  (`data-item`, `data-topico`, `maxlength="3000"`), contador de caracteres e situação da gravação;
  sem `<style>`/`<script>` embutidos; com menu, `header-usuario`, supabase-js, `js/supabase.js`,
  `js/login.js` e `data-login="sim"`.
- `database/2026-10-01-avaliacao-pratica-seed-atividades.sql` (fora do Git): `insert ... on
  conflict (pagina) do update` em `atividade` (`total_itens = 30`) e upsert dos tópicos em
  `topico_discursivo` com o padrão de resposta.

Funções curtas (≤ 45 linhas), nomes em português, docstrings e constantes no topo.

**Verificação:**

```powershell
C:\Python314\python.exe assets\gerador-avaliacao-discursiva\gerar_avaliacao_discursiva.py "MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\INTRODUCAO-TIC\ATIVIDADES"
```

Esperado: "30 questões, 61 tópicos, 30 pontos" e os dois arquivos gerados.

---

### Passo 5: Repositório JS no banco

**Status:** ✅ Concluído

**Arquivo:** Criar `assets/js/respostas-discursivas-banco.js`

**Ação:** só acesso a dados (REST com o JWT do aluno via `sbH`/`sbGet` de `js/supabase.js`):
buscar a atividade pela página, ler a tentativa atual, ler as respostas da tentativa,
gravar um tópico (upsert em `resposta_discursiva`), ler a entrega e entregar
(`entrega_atividade`). Exposto como `window.criarRepositorioDiscursivo()`.

**Verificação:** `node --check assets/js/respostas-discursivas-banco.js` sem erros.

---

### Passo 6: Tela JS e CSS

**Status:** ✅ Concluído

**Arquivos:** Criar `assets/js/avaliacao-discursiva.js` e `assets/css/avaliacao-discursiva.css`

**Ação:**
- Ler é livre; ao clicar num campo sem login, popup oferecendo ir ao login (volta à página).
- Carregar as respostas do banco nos campos; gravar 1,5 s depois de parar de digitar e ao sair do
  campo; situação por tópico (💾 gravando, ✅ gravada, ❌ não gravada) e contador `n/3000`.
- Barra de progresso "X de 61 tópicos respondidos".
- "Finalizar": espera as gravações, relê do banco, e se faltar tópico destaca e lista (popup);
  senão pede confirmação e entrega. Depois de entregue, os campos ficam só leitura.
- Professor: aviso de que só os alunos respondem.
- Fora do horário: campos bloqueados com o aviso do horário da turma.
- Textos de tentativa/recuperação via `assets/js/termos-tentativa.js`; avisos via `popup.js`.
- CSS com tokens em `:root` (tema claro/escuro), classes BEM (`.topico-resposta`,
  `.topico-resposta--gravada`, `.topico-resposta--erro`), responsivo.

**Verificação:** `node --check assets/js/avaliacao-discursiva.js` sem erros.

---

### Passo 7: Gerar a página e o seed

**Status:** ✅ Concluído

**Ação:** rodar o gerador do passo 4 e conferir que o HTML tem 30 cartões e 61 campos.

```powershell
(Select-String -Path "MATERIAIS\ASSISTENTE-DE-OPERACOES-LOGISTICAS\INTRODUCAO-TIC\ATIVIDADES\AVALIACAO-PRATICA.html" -Pattern "<textarea").Count
```

Esperado: `61`.

---

### Passo 8: Índice e menu

**Status:** ✅ Concluído

**Arquivos:** Modificar `.../INTRODUCAO-TIC/ATIVIDADES/index.html` (índice feito à mão) e
`.../INTRODUCAO-TIC/ATIVIDADES/MENU-ATIVIDADES.js`

**Ação:** card "✍️ Avaliação Prática" depois da Avaliação Objetiva 02 e item no menu.

**Verificação:** `node --check` no `MENU-ATIVIDADES.js` e busca de `AVALIACAO-PRATICA.html` no índice.

---

### Passo 9: Aplicar no Supabase

**Status:** ⬜ Pendente — **só quando você pedir** ("aplique o SQL pelo Supabase")

**Ação:** conferir o banco real, aplicar `2026-10-01-respostas-discursivas.sql` e o seed, e
conferir com consultas de leitura (30 itens, 61 tópicos, RLS ligado, `anon` sem acesso).

---

### Passo 10: Regra no CLAUDE.md e commit

**Status:** ✅ Concluído

**Ação:** registrar no `CLAUDE.md` a regra das avaliações discursivas (tabelas, arquivos em
`assets/`, gerador) e fazer o commit só dos arquivos da tarefa, conferindo
`git diff --cached --name-only` (sem gabarito nem seed).
