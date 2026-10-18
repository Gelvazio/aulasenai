## Etapa 403-cd13692b — RL-988F933E-NIVEIS-E-MODELOS: ajustar o projeto à regra niveis-e-modelos.md

**Tarefa:** RL-988F933E-NIVEIS-E-MODELOS · **Pedido em:** 2026-10-18 13:41 · **Criada por:** DeepSeek Harness (deepseek-flash) (local · main)
**Pedido:** sincronização de tasks do rules-local: mudado niveis-e-modelos.md, 2026-10-18-ef54a693 -> 2026-10-18-988f933e
**Objetivo:** atualizar a regra de níveis deste projeto para a versão `2026-10-18-988f933e` do
`rules-local`: a regra global agora tem as linhas **OpenCode** (C37) e **Qoder** (C38) na matriz e
permite `PESADO` ao DeepSeek no OpenCode com `deepseek-v4-pro`, e a cópia local de
`.claude/rules/niveis.md` ficou defasada.

### O que mudou na regra e o que muda no projeto

| Situação | Arquivo | Avaliação |
|---|---|---|
| mudado | `niveis-e-modelos.md` | **exige ajuste → esta TASK**: este projeto tem matriz de níveis própria em `.claude/rules/niveis.md`, que ainda traz o DeepSeek `⛔` em `PESADO` e não tem OpenCode nem Qoder |
| mudado | `INDEX.md` | sem ajuste — é o índice das regras da fonte; o índice deste projeto (`.claude/rules/INDEX.md`) é de outra estrutura e não lista as regras globais |
| adicionado | `herdr.md` | sem ajuste — nenhuma regra, script ou quadro deste projeto usa o herdr; o uso citado em `tasks/PROMPT_PARA_O_LIDER.md` (arquivo local, não versionado) já segue o modelo da regra (painel = frente, líder com o Git) |

### RL-988F933E-NIVEIS-E-MODELOS.1 — Atualizar a matriz de níveis de `.claude/rules/niveis.md`

**Próximo passo:** ler `rules-local/regras/niveis-e-modelos.md` na versão `2026-10-18-988f933e` e
aplicar em `.claude/rules/niveis.md` a matriz com as linhas **OpenCode** e **Qoder** e a frase do
`PESADO` com o `deepseek-v4-pro`; conferir contra a skill `.claude/skills/classificar-tarefa/SKILL.md`
(já atualizada em 2026-10-18 12:33, é a mesma matriz) para não deixar as duas divergindo.

- **Nível:** LEVE — só `.md` (linhas de tabela e uma frase), sem lógica.
- **Modelo:** só Haiku — nunca outro
- **Descrição:** em `.claude/rules/niveis.md`: (1) acrescentar à tabela "Quem pega cada nível" a
  linha `| **OpenCode** | DeepSeek V4.1 Flash (\`deepseek-flash\`) | DeepSeek V4.1 Flash com thinking
  (\`deepseek-flash\`) | **DeepSeek V4 Pro (\`deepseek-v4-pro\`)** |`; (2) acrescentar a linha
  `| **Qoder** | ✅ | ✅ | ⛔ |`; (3) trocar a frase "`PESADO` é **só do Claude Code com Opus 5.5 ou
  superior, ou Fable**" pela da regra global, que inclui o DeepSeek e, no OpenCode, o
  `deepseek-v4-pro` (C35 e C37). Nada mais do projeto muda.
- **Critérios de aceitação:** a matriz e a frase do `PESADO` de `.claude/rules/niveis.md` ficam iguais
  em conteúdo às de `rules-local/regras/niveis-e-modelos.md` da versão `2026-10-18-988f933e`; nenhum
  outro arquivo do projeto muda; commit + push na `main`.
- **Entrega:** — · **Verificação:** —
