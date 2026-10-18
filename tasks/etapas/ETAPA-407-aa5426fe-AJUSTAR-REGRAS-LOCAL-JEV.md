## Etapa 407-aa5426fe — RL-87FD6C11-JEV: ajustar o projeto à regra jev.md

**Tarefa:** RL-87FD6C11-JEV · **Pedido em:** 2026-10-18 19:20 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** sincronização de tasks do rules-local: adicionado jev.md, 2026-10-18-988f933e -> 2026-10-18-87fd6c11
**Objetivo:** a regra global nova `jev.md` (C39) usa o Jev como **conselheiro** de nível e guardrails e
diz que a skill `classificar-tarefa` tenta o Jev primeiro, com fallback para o Laya/sinais e
`JEV_MODO=off` como rollback. Neste projeto, as duas cópias da skill
(`.claude/skills/classificar-tarefa/SKILL.md` e `.agents/skills/classificar-tarefa/SKILL.md`) só
conhecem o Laya/sinais, então precisam do passo novo.

### O que mudou na regra e o que muda no projeto

| Situação | Arquivo | Avaliação |
|---|---|---|
| adicionado | `jev.md` | **exige ajuste → esta TASK**: a skill `classificar-tarefa` do projeto precisa consultar o Jev primeiro (cliente em `C:\fontes\rules-ai\scripts\jev\`, chave `TYPESAFE_API_KEY` só local), cair para o Laya/sinais sem chave, com `JEV_MODO=off` ou falha, e registrar a confiança; hoje as cópias da skill só têm Laya/sinais |
| mudado | `INDEX.md` | sem ajuste — é o índice das regras da fonte e só incluiu o item 19 novo; o índice deste projeto (`.claude/rules/INDEX.md`) é de outra estrutura e não lista as regras globais |

### RL-87FD6C11-JEV.1 — Skill `classificar-tarefa`: consultar o Jev primeiro

**Próximo passo:** ler `rules-local/regras/jev.md` (versão `2026-10-18-87fd6c11`) e pôr a consulta ao
Jev antes do Laya nas duas cópias da skill, com fallback, rollback e aviso de confiança.

- **Nível:** LEVE — só `.md` (as duas cópias da skill), sem lógica nem banco.
- **Modelo:** só Haiku — nunca outro
- **Descrição:** nas duas cópias da skill (`classificar-tarefa`): (1) passo novo antes do Laya —
  `node C:/fontes/rules-ai/scripts/jev.mjs classificar` (só local; sem `TYPESAFE_API_KEY`, com
  `JEV_MODO=off` ou falha → segue o fluxo Laya/sinais, e `off` é o rollback); (2) registrar a
  confiança do Jev junto do nível e, se Jev e Laya/sinais discordarem, vale o nível mais alto;
  (3) o Jev só sugere: não rebaixa nível, não reserva e não escolhe modelo; (4) a chave nunca vai
  para log nem para arquivo versionado, e o texto passa pelo `redigir.mjs` antes do envio.
- **Critérios de aceitação:** as duas cópias com o passo do Jev, o fallback Laya/sinais e o rollback
  `JEV_MODO=off`; nenhum outro arquivo do projeto muda; commit + push na `main`.
- **Entrega:** — · **Verificação:** —
