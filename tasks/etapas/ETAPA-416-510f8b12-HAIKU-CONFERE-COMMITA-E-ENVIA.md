## Etapa 416-510f8b12 — #287: Haiku confere, faz commit e push de toda entrega

**Tarefa:** #287-510f8b12-3ec8-4dfb-a269-9b6e0af2ff40 · **Pedido em:** 2026-10-18 20:10 · **Criada por:** Claude Code (Opus 5.5) (local · main · s17)
**Pedido:** "MUDE AS REGRAS,PRA QUE ESTA PARTE SEJA FEITA SEMPRE PELO HAIKU->CONFERIR,FAZER COMMIT E
PUSH,SE HOUVER PROBLEMAS,DAI ELE PEGA E ABRE UMA VERIFICACAO COM 1 SUBTASK AO SONNET" · "E MUDE ELA LA
NO *rules-ai* e aqui"
**Objetivo:** a conferência, o commit e o push de cada entrega passam a ser do Haiku; se a
conferência achar problema, o Haiku abre uma subtarefa de verificação para o Sonnet.

> ⚠️ **Tarefa grande** (regra de todas as IAs, dois repositórios): plano na #287.1 e **"sim"** do
> usuário antes da #287.2.

### Escopo

**Entra — `rules-ai`:** decisão nova em `CONFLITOS.md` (troca a parte "só o líder usa Git" da
equipe); `regras/niveis-e-modelos.md` (Equipe de agentes) e `regras/ciclo-da-task.md` (Encerrar);
`sincronizar.mjs --aplicar`; `STATUS_PROJETO.md` e quadro do `rules-ai`.
**Entra — `aulasenai`:** `.claude/rules/niveis.md`, `.claude/rules/tasks/ciclo-da-task.md`,
`.claude/rules/claude-code.md`; agente `.claude/agents/executor-leve.md` (passa a poder usar Git só
para conferir/commit/push); skill `liderar-equipe` (o líder passa a conferência ao Haiku);
`docs/HISTORICO-REGRAS.md`; visualizador.
**Não entra:** banco; tarefas já concluídas.

### Riscos

| Risco | Plano B |
|---|---|
| Haiku conferir entrega `PESADO` (banco, segurança) além do nível dele | Haiku confere arquivos, sintaxe, commit e quadro; o que exige banco fica na Verificação do executor `PESADO` |
| Entrega com problema parada sem commit na pasta compartilhada | Subtarefa de verificação para o Sonnet criada na hora (C26), com o próximo passo escrito |
| Hook de trava de modelo bloquear o commit do Haiku | Ajustar `verificar-modelo.js` se preciso, no mesmo commit |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|

### #287.1 — Plano e aprovação

**Próximo passo:** 👀 usuário responder às perguntas e dar o "sim".

- **Nível:** PESADO — regra de todas as IAs (arquitetura).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)

### #287.2 — Regra global no `rules-ai` e sincronização

**Próximo passo:** depende da #287.1.

- **Nível:** PESADO — regra de todas as IAs, outro repositório.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)

### #287.3 — Regras, agente e skill do `aulasenai`

**Próximo passo:** depende da #287.2.

- **Nível:** PESADO — regras do projeto, agente, skill e hook ligados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
