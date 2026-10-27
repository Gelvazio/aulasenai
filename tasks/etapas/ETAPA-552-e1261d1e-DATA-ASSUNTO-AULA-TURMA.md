## Etapa 552-e1261d1e — #403: Coluna data_assunto em aula_turma

**Tarefa:** #403-e1261d1e · **Pedido em:** 2026-10-27 10:37 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "crie mais uma coluna em aula_turma, de nome *data_assunto*, que é a data efetiva de passagem do assunto, inicial não informada, pra todos e fica embaixo do campo Data" (print do card de aula em ATIVIDADES/index.html).
**Objetivo:** guardar, por aula e por turma, a data em que o assunto foi efetivamente passado, separada da "Data da aula" (`aula_turma.data_aula`), e mostrá-la no card logo abaixo de "Data:".

### Escopo

- **Entra:** coluna `data_assunto date null` em `aula_turma`, criada por script idempotente em `database/`; linha "Data do assunto: DD/MM/AAAA" ou "Data do assunto não informada" logo abaixo de "Data:" no card (`assets/js/indice-aula-data.js`); leitura no repositório (`aula-turma-repositorio.js`, campo `CAMPOS_AULA_TURMA`); documentação em `docs/database.md`.
- **Não entra:** campo de edição no modal "✏️ Editar aula" (fica para outra tarefa, se o usuário pedir); mudança em `data_aula`; preencher a coluna com dados (começa tudo `null`); alterar RLS (a coluna herda a política da tabela).

### Critério de pronto

- Coluna existe em `aula_turma`, tipo `date`, aceita `null`, valor inicial `null` em todas as linhas.
- Card mostra "Data do assunto não informada" quando `data_assunto` é `null` e a data formatada quando houver valor.
- `docs/database.md` atualizado com a coluna.

### Riscos

- **Alteração no banco de produção:** o script é idempotente (`add column if not exists`), não apaga nada. Aplicar só depois da conferência por consulta de leitura.
- **Card sem a linha nova em matérias sem bloqueio ligado:** a linha só aparece onde o bloqueio da aula está ligado (mesma regra do campo "Data:").

### Premissas

- A coluna é por aula × turma (mesma chave de `aula_turma`).
- O texto segue o padrão do card: "Data: DD/MM/AAAA" e "Data não informada".

### Decisões

- 2026-10-27 10:37: tarefa grande (banco). Plano nesta etapa; execução só após "sim" do usuário.
- 2026-10-27 (usuário): "sim", aprovou o plano acima.
- 2026-10-27 (Sonnet, #403.1 e #403.3): script SQL criado; JS de `aula-turma-repositorio.js`, `indice-aula-bloqueio.js` e `indice-aula-data.js` alterado. Passou do escopo: `assets/css/indice-aula-data.css` recebeu a classe `.aula-data-assunto-card` no mesmo estilo de `.aula-data-card`. Mantido, por ser uma linha só.
- 2026-10-27 (usuário): deu acesso ao projeto `hxlvonriearllcmfqeri` ao conector; #403.2 destravada e concluída pelo líder (ver Entrega do #403.2).
- 2026-10-27 (#403.2, histórico): ⛔ **bloqueada**. O conector do Supabase só enxerga o projeto "Projetos de IA" (`ubrvdzwywyxydcblghwz`); o projeto do aulasenai (`hxlvonriearllcmfqeri`) não aparece, e a leitura de `aula_turma` nele deu "You do not have permission". Nada foi aplicado no banco. Destrava: o usuário roda o `database/2026-10-27-aula-turma-data-assunto.sql` no SQL Editor do projeto do aulasenai, ou dá acesso ao conector.
- 2026-10-27 (líder, Haiku): JS e CSS **não** vão ao Git antes do SQL: a leitura de `aula_turma` com `data_assunto` falharia sem a coluna. Entram num commit separado depois que o usuário confirmar que o SQL foi aplicado.

### Aprovação

- ✅ Aprovada pelo usuário em 2026-10-27 ("sim").

---

### #403.1 — Script SQL idempotente da coluna data_assunto

**Próximo passo:** criar `database/2026-10-27-aula-turma-data-assunto.sql` com `alter table aula_turma add column if not exists data_assunto date null;` e comentário de coluna.

- **Nível:** PESADO · effort high
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** o script não apaga dados e pode rodar mais de uma vez.
- **Critérios de aceitação:** script idempotente; nenhuma linha alterada além da coluna nova.
- **Entrega:** `database/2026-10-27-aula-turma-data-assunto.sql` (commit desta entrega) · **Verificação:** arquivo lido de volta pelo líder: `alter table public.aula_turma add column if not exists data_assunto date null;` + `comment on column`; sem `delete`, `drop` nem `update`.

### #403.2 — Aplicar o SQL e conferir por leitura

**Próximo passo:** aplicar o script no Supabase e conferir `information_schema.columns` e a contagem de `data_assunto is null` (deve ser igual ao total de linhas).

- **Nível:** PESADO · effort high
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** aplicação autorizada pelo "sim" do usuário; conferência só por leitura.
- **Critérios de aceitação:** coluna existe; todas as linhas com `null`.
- **Entrega:** SQL aplicado no projeto AULAS SENAI (`hxlvonriearllcmfqeri`) pelo líder, com acesso dado pelo usuário em 2026-10-27 · **Verificação:** `information_schema.columns`: `data_assunto` é `date`, `is_nullable` YES; `select count(*) filter (where data_assunto is null), count(*)`: 90 de 90 linhas nulas.

### #403.3 — Mostrar "Data do assunto" no card

**Próximo passo:** em `assets/js/indice-aula-data.js`, criar um elemento logo abaixo do de "Data:" e preencher com a data formatada ou "não informada".

- **Nível:** PESADO · effort high
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** ler `data_assunto` junto com `data_aula` em `aula-turma-repositorio.js`; funções curtas, JSDoc e sem valor fixo fora de constante.
- **Critérios de aceitação:** card com a linha nova nas matérias com bloqueio ligado; texto padrão quando vazio.
- **Entrega:** `indice-aula-data.js`, `indice-aula-bloqueio.js`, `aula-turma-repositorio.js` e `indice-aula-data.css` (commit desta entrega) · **Verificação:** `node --check` ok nos 3 JS; conferência no navegador não feita (regra do projeto).

### #403.4 — Documentar em docs/database.md

**Próximo passo:** acrescentar a coluna na tabela de `aula_turma` em `docs/database.md`.

- **Nível:** LEVE · effort low
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Descrição:** uma linha na tabela de colunas e uma nota de data.
- **Critérios de aceitação:** coluna documentada com tipo e descrição.
- **Entrega:** `docs/database.md` (linha `data_assunto` na tabela de `aula_turma`) · **Verificação:** leitura da linha pelo líder.

### #403.5 — Commit e push da entrega

**Próximo passo:** `git add` pelos caminhos desta tarefa (script, JS, docs, quadro, etapa); `git diff --cached --name-only`; commit e push na `main`. Nunca `git add .`.

- **Nível:** PESADO · effort high
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** um commit com tudo; o `.gitignore` do usuário (não commitado) fica de fora.
- **Critérios de aceitação:** push feito; mãe movida para `task_complete.md` quando todas as subtarefas estiverem ✅.
- **Entrega:** — · **Verificação:** —
