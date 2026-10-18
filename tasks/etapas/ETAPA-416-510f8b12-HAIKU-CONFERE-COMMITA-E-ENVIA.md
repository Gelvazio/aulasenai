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

### Requisitos

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO um executor da equipe de agentes entrega uma subtarefa, O SISTEMA DEVE ter a conferência, o commit e o push feitos pelo Haiku (`executor-leve`), não pelo líder | #287.2, #287.3 | leitura de `regras/niveis-e-modelos.md`, `.claude/rules/niveis.md`, `.claude/agents/executor-leve.md` e da skill `liderar-equipe` |
| R1.2 | SE a conferência do Haiku achar problema, ENTÃO O SISTEMA DEVE não commitar a entrega e criar na mesma mãe a subtarefa `Verificação: <problema>` (`MEDIO · só Sonnet`), e o Haiku confere de novo depois do conserto | #287.2, #287.3 | leitura das mesmas regras e do `ciclo-da-task.md` |
| R1.3 | ONDE a entrega é `PESADO` (banco, segurança), O SISTEMA DEVE limitar a conferência do Haiku a arquivos, sintaxe e registro da Verificação, sem consulta ao banco | #287.2, #287.3 | leitura |
| R1.4 | O SISTEMA DEVE manter a reserva com o líder e deixar o Haiku mover a linha para `task_complete.md` no commit da entrega | #287.2, #287.3 | leitura |
| R1.5 | ENQUANTO a sessão trabalhar sozinha (sem equipe de agentes), O SISTEMA DEVE seguir o fluxo de hoje (quem executa commita) | #287.2, #287.3 | leitura |
| R2.1 | QUANDO a regra global mudar, O SISTEMA DEVE registrar a decisão no `CONFLITOS.md` e levar às IAs com `node scripts/sincronizar.mjs --aplicar` | #287.2 | saída do script; `grep` no `dist/REGRAS-GLOBAIS.md` |
| R3.1 | SE o Haiku commitar a entrega de outro executor ou criar a subtarefa de verificação, ENTÃO O SISTEMA DEVE deixar o hook do `aulasenai` passar o commit | #287.3 | leitura de `scripts/claude-hooks/verificar-modelo.js` e execução com entrada de exemplo |

**Fora do escopo (não-objetivos):** sessões sozinhas (sem equipe); banco; tarefas concluídas;
skills fora dos dois repositórios (só registradas).

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | Nenhum arquivo de regra dos dois repositórios diz que "só o líder usa Git" ou que o executor-leve "nunca usa Git" | todos os `.md` de regras, agentes e skills do `rules-ai` e do `aulasenai` (fora `dist/`, `rules-local/`, histórico) | `grep` por "só o líder", "nunca usa Git" | não: conferência por `grep` basta |
| INV-2 | O Haiku nunca executa a subtarefa `MEDIO`/`PESADO` em si (C22 continua): só confere, commita e abre a verificação | todas as regras alteradas | leitura | não: regra de texto |
| INV-3 | Todo arquivo de `.claude/rules/` alterado fica com no máximo 5 KB | arquivos alterados em `.claude/rules/` | `wc -c` | não: comando basta |

**Casos de borda:** entrega sem nada a commitar; problema achado só na tela (sem navegador); duas
entregas seguidas na mesma mãe.

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| 1 | Vale só na equipe de agentes ou também em sessão sozinha? | Só na equipe de agentes | 2026-10-18 20:10 | Gelvazio ("sim" ao padrão) |
| 2 | Em entrega `PESADO`, o Haiku confere sem consultar o banco? | Sim: arquivos, sintaxe e registro da Verificação | 2026-10-18 20:10 | Gelvazio ("sim" ao padrão) |
| 3 | A reserva continua com o líder e o Haiku só move a linha para concluídas no commit? | Sim | 2026-10-18 20:10 | Gelvazio ("sim" ao padrão) |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-18 20:10 | Plano aprovado ("sim"), com as respostas padrão das 3 perguntas | Gelvazio | resposta no chat |

### #287.1 — Plano e aprovação

**Próximo passo:** — (entregue; plano aprovado em 2026-10-18 20:10).

- **Nível:** PESADO — regra de todas as IAs (arquitetura).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Effort:** high
- **Entrega:** plano, spec e decisões nesta etapa · **Verificação:** "sim" do usuário; `node C:/fontes/rules-ai/spec/verificar-spec.mjs` nesta etapa.

### #287.2 — Regra global no `rules-ai` e sincronização

**Próximo passo:** mapear os trechos (varredura) e escrever a decisão nova no `CONFLITOS.md` e as regras; tarefa espelho `HAIKU-COMMIT-GLOBAL` no quadro do `rules-ai`.

- **Nível:** PESADO — regra de todas as IAs, outro repositório.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Effort:** high

### #287.3 — Regras, agente e skill do `aulasenai`

**Próximo passo:** depende da #287.2.

- **Nível:** PESADO — regras do projeto, agente, skill e hook ligados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Effort:** high
