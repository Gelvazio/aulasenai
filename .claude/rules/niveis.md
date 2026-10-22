# 🎚️ Níveis de tarefa — quem pega o quê

Cada subtarefa tem um **nível**, para que modelos mais fracos façam as tarefas simples e o
modelo forte fique com as difíceis (tarefa #182). Vale para **todas as IAs**. Subtarefa, linha
e reserva: `tasks/quadro.md` e `tasks/frentes-e-reserva.md`.

## Os 3 níveis

| Nível | Em palavras simples | Sinais |
|---|---|---|
| `PESADO` | difícil | banco (SQL, RLS, RPC, seeds, consultas), login/papéis/permissões, gabarito, chaves ou segredos, segurança, arquitetura, mais de 3 arquivos ligados, mudança em massa, apagar dados |
| `MEDIO` | média | código com lógica (JS, Python, geradores, telas), de 1 a 3 arquivos; conferir se um pedido de tela foi feito |
| `LEVE` | fácil | só `.md`, textos, linhas do quadro, formatação, configuração simples sem lógica |

- **O sinal mais restritivo vence** ("1 arquivo, mas é SQL" = `PESADO`).
- **Na dúvida, sobe o nível.**

## Quem pega cada nível

| Ferramenta | `LEVE` | `MEDIO` | `PESADO` |
|---|---|---|---|
| **Claude Code** local | Haiku | Sonnet | **Sonnet, Opus 5.5 ou superior, ou Fable** (C48) |
| **Claude Code** nuvem | Haiku | Sonnet | Sonnet, Opus 5.5+ ou Fable, **sem banco** |
| **Gemini CLI** | Flash | Pro | ⛔ |
| **Antigravity** | Gemini Flash | ⛔ | ⛔ |
| **Grok** | rápido | principal | ⛔ |
| **DeepSeek** | Flash | raciocínio | ⛔ |
| **Codex** / **Cursor** | ✅ | ✅ | ⛔ |
| **Devin** / **Copilot** | ✅ | ⛔ | ⛔ |

- `PESADO` é do Claude Code com **Sonnet, Opus 5.5 ou superior, ou Fable** (C48, 2026-10-22).
- Banco continua **só do Claude Code local** (`multiplas-ias.md`).
- A tabela é do usuário: mudança nela vai para o "Registro de decisões" do `tasks/STATUS.md`.

## Como usar

- **Reserva com IA + modelo:** "Em uso por" = `<IA (modelo)> (<frente>) (desde <data hora>)`,
  ex.: `Claude Code (Sonnet 5.5) (local · main · s2)`, `Gemini CLI (Flash) (local · main)`. É
  assim que se sabe o modelo de quem reservou.
- ⛔ **NUNCA executar subtarefa que não é do seu modelo** (2026-10-16, #247; global C22): cada IA
  só pega os níveis marcados na **sua** linha — Haiku **só** `LEVE`, Sonnet `MEDIO` **e**
  `PESADO` (C48), Opus 5.5+/Fable **só** `PESADO`. Nem acima nem abaixo, **sem exceção** (nem com autorização). Sem
  subtarefa livre do seu modelo → não pega nenhuma e avisa o usuário. A coluna **Modelo** do
  quadro e a linha `- **Modelo:**` da etapa dizem qual é.
- **Onde fica o nível:** 1º item da seção da subtarefa na etapa —
  `- **Nível:** MEDIO — motivo curto` (o sinal que decidiu).
- **Quem classifica:** quem cria ou divide a subtarefa, pela skill
  `.claude/skills/classificar-tarefa/SKILL.md`. Subtarefa sem nível → classificar antes de pegar.
- **Tarefa antiga** (antes da #182, com tabela de itens): quem for pegar grava
  `**Nível:** <nível> — motivo` no topo da etapa ou divide a tarefa em subtarefas.
- Subtarefa de outro nível → liberar a reserva, reclassificar ou dividir; ⛔ nunca mudar o nível
  para caber na sua ferramenta.

## Equipe de agentes do Claude Code

Skill `.claude/skills/liderar-equipe/SKILL.md`: o líder (Opus 5.5+ ou Fable) reserva **uma
subtarefa por vez**, delega ao agente do nível (`executor-leve` = Haiku, `executor-medio` =
Sonnet, `executor-pesado` = Opus), confere, valida e commita. Só o líder usa Git e edita o
quadro; o agente `classificador-tarefas` só grava a linha `- **Nível:**` nas etapas. Quem
**executa** é o agente do nível (o líder nunca faz a subtarefa no lugar dele).
