## Etapa 374-afb852cd — #247: Nunca executar tarefa que não é do seu modelo

**Tarefa:** #247-afb852cd-5ce3-4200-8dd1-0f36f02b3533 · **Pedido em:** 2026-10-16 22:48 · **Criada por:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o)
**Pedido:** "Ajuste todas as tasks e o gerador de task global, pra que NUNCA EXECUTE TAREFA QUE NAO
E SEU MODELO, coloque isso em todas as tasks, crie essa task agora e ja assuma"
**Objetivo:** nenhuma IA executa subtarefa de outro modelo — a regra fica no global (`rules-ai`),
no projeto, em todas as tarefas abertas e no que cria tarefas novas.

> ⚠️ **Tarefa grande** (regra de todas as IAs, dois repositórios, mudança em massa no quadro e
> no gerador): plano na #247.1 e **"sim"** do usuário antes da #247.2.

### Escopo (a confirmar na #247.1)

**Entra:** regra global (`rules-ai/regras/`, `CONFLITOS.md`); regras do projeto (`AGENTS.md`,
`niveis.md`, `tasks/`); aviso em todas as tarefas abertas do `tasks/STATUS.md` e nas etapas; o
que gera tarefas (modelos do quadro, skills `classificar-tarefa`/`liderar-equipe` e scripts).

**Não entra:** banco de dados; tarefas concluídas (histórico); mudar o nível de tarefa existente.

### Riscos

| Risco | Plano B |
|---|---|
| A regra atual (C2 = A, 2026-10-16) deixa modelo forte pegar nível mais leve | Pedir ao usuário a decisão nova da C2 e registrar no `CONFLITOS.md` |
| Mudança em massa no `STATUS.md` com várias frentes ativas | Script idempotente; só a coluna/marca nova; recado para todas |
| Exceções já autorizadas (#185.1, #206.2–#206.4) | Histórico não muda; vale para o que vier |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 22:53 | Plano aprovado com as respostas: **Q1 = sim** (cada modelo só o seu nível exato; troca a C2); **Q2 = sim** (acabam as exceções de nível autorizadas); **Q3 = coluna Modelo** igual ao global; **Q4 = esta sessão (Opus 5.5) só para criar esta regra (#247), e nada mais** | Usuário | Pedido do usuário |
| 2026-10-16 22:53 | Subtarefas redivididas pelo plano: #247.2 regra global, #247.3 regra do projeto, #247.4 trava, #247.5 todas as tarefas (inclui a coluna no `task_complete.md`, para as linhas poderem ser movidas), #247.6 aceite | Claude Code (Opus 5.5) | Plano aprovado |

### #247.1 — Levantamento e plano (tarefa grande)

**Próximo passo:** — (entregue; plano aprovado em 2026-10-16 22:53).

- **Nível:** PESADO — regra de todas as IAs (arquitetura), dois repositórios, mudança em massa.
- **Descrição:** levantamento dos lugares a mudar e plano com subtarefas, níveis e verificação.
- **Critérios de aceitação:** plano aprovado pelo usuário.
- **Executor:** Claude Code (Opus 5.5) (nuvem · ccr-3274812b-0nj48o).

**Levantamento (2026-10-16 22:52):**

| Onde | O que é | Situação hoje |
|---|---|---|
| `rules-ai/regras/niveis-e-modelos.md` e `frentes-e-reserva.md` | Regra global | "Pega até o máximo do seu modelo; modelo forte desce se não houver do seu nível" (C2 = A) |
| `rules-ai/regras/quadro-de-tarefas.md` | **Gerador global de tarefas** (modelos do `STATUS.md`, do `task_complete.md` e da etapa) | Já tem a coluna **Modelo** (`LEVE · Haiku`); não diz "nunca outro modelo" |
| `rules-ai/scripts/sincronizar.mjs` | Entrega as regras a cada IA (`~/.claude/CLAUDE.md`, Gemini, Codex…) | Não precisa mudar; depois da regra, o usuário roda `--aplicar` na máquina dele |
| `aulasenai`: `AGENTS.md` (regra 8), `.claude/rules/niveis.md`, `tasks/frentes-e-reserva.md`, `tasks/quadro.md` | Regras do projeto | Iguais à C2 = A; o quadro **não tem** a coluna Modelo |
| Skills `classificar-tarefa` e `liderar-equipe`; agentes `executor-*` | O que cria e distribui subtarefas | O líder já delega ao executor do nível |
| `scripts/claude-hooks/regras-bloqueio.js` | Travas do Claude Code | Não trava reserva de nível errado |
| Leitores do `STATUS.md`: `leitor_tarefas.py`, `aba-tasks.js`, `fechar_banco.py`, `criar_status_faltantes.py` | Leem as colunas | Precisam aceitar a coluna nova |
| Quadro | ~728 subtarefas abertas; 843 seções com nível nas etapas | Modelo não gravado em nenhuma |

**Plano proposto:**
1. **#247.2 Regra global** (`rules-ai`): "⛔ nunca executar subtarefa que não é do seu modelo" em
   `niveis-e-modelos.md`, `frentes-e-reserva.md` e `ciclo-da-task.md`; no `quadro-de-tarefas.md`,
   coluna Modelo obrigatória e linha `- **Modelo:**` no modelo da etapa; nova decisão da C2 no
   `CONFLITOS.md`; push no `rules-ai`.
2. **#247.3 Regra do projeto**: `AGENTS.md` (regra 8), `niveis.md`, `tasks/frentes-e-reserva.md`,
   `tasks/quadro.md`, skills `classificar-tarefa` e `liderar-equipe`; histórico.
3. **#247.4 Trava**: regra nova no `regras-bloqueio.js` — no `git commit`, se o `STATUS.md` traz
   reserva nova cujo modelo em "Em uso por" não é o do nível, bloqueia.
4. **#247.5 Todas as tarefas**: script idempotente que põe a coluna **Modelo** em todas as linhas
   abertas do `STATUS.md` (`LEVE · Haiku`, `MEDIO · Sonnet`, `PESADO · Opus 5.5+/Fable`; mãe = `—`;
   aceite = `Usuário`) e a linha `- **Modelo:** só <modelo> — nunca outro` em cada seção de
   subtarefa aberta das etapas; ajustar os 4 leitores; recado para todas as frentes.
5. **#247.6 Aceite** do usuário.

**Perguntas (Q1–Q4):**
- **Q1:** "Seu modelo" = **só o nível exato** (Opus só PESADO, Sonnet só MEDIO, Haiku só LEVE)? Isso
  troca a C2 (hoje: até o máximo, e o forte desce se não houver do seu nível).
- **Q2:** As exceções que você autoriza (como a #206: Sonnet em PESADO) acabam também?
- **Q3:** O modelo vai numa **coluna Modelo** no quadro, igual ao global (recomendado), ou só no
  título, como o `effort`?
- **Q4:** Com Q1 = sim, as subtarefas LEVE e MEDIO desta tarefa (texto das regras, hook) só podem
  ser feitas por Haiku e Sonnet. Esta sessão (Opus) fica só com as PESADO (#247.5) e deixa as
  outras livres, ou você autoriza esta sessão só para esta tarefa?

### #247.2 — Regra global no rules-ai

**Próximo passo:** — (entregue).

- **Entrega:** `rules-ai` commit `a48e13d` — `regras/niveis-e-modelos.md` (⛔ nunca outro modelo,
  sem exceção; reserva do líder com o modelo do executor), `frentes-e-reserva.md`,
  `ciclo-da-task.md`, `quadro-de-tarefas.md` (coluna Modelo obrigatória `<nível> · só <modelo>` e
  linha `- **Modelo:**` no modelo da etapa); `CONFLITOS.md`: C2 → B e C22; tarefa global
  MODELO-GLOBAL (etapa 004 do `rules-ai`), com o `sincronizar.mjs --aplicar` 👀 para o usuário.
- **Verificação:** leitura dos 5 arquivos depois do push; `git log` do `rules-ai`.

- **Nível:** LEVE — só `.md` (feita por esta sessão Opus por autorização do usuário, só na #247).

### #247.3 — Regra do projeto

**Próximo passo:** — (entregue).

- **Entrega:** `AGENTS.md` (regra 8: ⛔ nunca outro modelo); `.claude/rules/niveis.md`;
  `tasks/frentes-e-reserva.md`; `tasks/ciclo-da-task.md`; `tasks/quadro.md` (coluna Modelo no
  modelo do `STATUS.md` e linha `- **Modelo:**` no modelo da etapa); skill `classificar-tarefa`
  (grava Nível + Modelo); skill `liderar-equipe` (o líder nunca faz a subtarefa no lugar do
  executor — saiu o "ou assumir a correção"); `docs/HISTORICO-REGRAS.md`.
- **Verificação:** leitura dos arquivos; tamanhos ≤ 5 KB (`quadro.md` 5080 bytes, era 5003).

- **Nível:** LEVE — só `.md` (`AGENTS.md`, `niveis.md`, `tasks/`, skills), autorização da #247.

### #247.4 — Trava no Claude Code (hook)

**Próximo passo:** função nova em `scripts/claude-hooks/regras-bloqueio.js`: no `git commit`, ler
as linhas acrescentadas no `tasks/STATUS.md` staged e bloquear reserva cujo modelo em "Em uso
por" não é o da coluna Modelo / do nível.

- **Nível:** MEDIO — lógica em 1 a 2 arquivos JS (`regras-bloqueio.js`), autorização da #247.

### #247.5 — Coluna Modelo e aviso em todas as tarefas

**Próximo passo:** esperar a #247.4.

- **Nível:** PESADO — mudança em massa no quadro e nas etapas, mais de 3 arquivos ligados.

### #247.6 — Aceite do usuário

**Próximo passo:** esperar a #247.5.

- **Nível:** LEVE — conferência do usuário.
