## Etapa 375-189bc6ee — #248: Comando "verify" e coluna VERIFICADO no quadro

**Tarefa:** #248-189bc6ee-2e3f-4b28-913a-d00f18254cfa · **Pedido em:** 2026-10-16 23:38 · **Criada por:** Claude Code (Opus 5.5) (local · main · s17)
**Pedido:** "Crie 1 regra que sempre que eu digitar verify, executar 1 verificação completa no quadro
de tasks, buscando conflitos e vendo se o que foi feito,foi aplicado mesmo,adicione mais 1 colunas a
de nome VERIFICADO=true,Pra tarefas qe foram verificadas"
**Objetivo:** ao digitar `verify`, a IA confere o quadro inteiro (conflitos e se o que foi entregue
está mesmo aplicado) e marca `true` na nova coluna **VERIFICADO** das tarefas conferidas.

> ⚠️ **Tarefa grande** (regra de todas as IAs, coluna nova em todas as linhas do quadro, gerador do
> visualizador): plano na #248.1 e **"sim"** do usuário antes da #248.2.

### Escopo (a confirmar na #248.1)

**Entra:** regra nova em `.claude/rules/tasks/` + gatilho `verify` no `AGENTS.md` + comando
`.claude/commands/verify.md`; coluna `Verificado` no `tasks/STATUS.md` e no `tasks/task_complete.md`
(modelos em `tasks/quadro.md`); leitor do visualizador (`scripts/regras/visualizador/leitor_tarefas.py`).

**Não entra:** corrigir o que a verificação achar (vira tarefa nova); banco além de consulta.

### Riscos

| Risco | Plano B |
|---|---|
| Coluna nova quebra o visualizador ou scripts que leem o quadro | Ajustar o leitor no mesmo commit; conferir com o gerador |
| Mudança em massa no `STATUS.md` com várias frentes ativas | Script idempotente que só acrescenta a coluna; recado para todas em `tasks/RECADOS.md` |
| Marcar `true` sem prova | Só `true` com prova anotada na etapa (arquivo/linha, commit ou consulta) |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|

### #248.1 — Plano e aprovação (tarefa grande)

**Próximo passo:** 👀 usuário responder às perguntas do plano e dar o "sim".

- **Nível:** PESADO — regra de todas as IAs e mudança em massa no quadro.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Entrega:** — · **Verificação:** —

### #248.2 — Regra, gatilho e comando `verify`

**Próximo passo:** depende da #248.1.

- **Nível:** PESADO — regra de fluxo para todas as IAs (arquitetura do quadro).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)

### #248.3 — Coluna `Verificado` no quadro, modelos e visualizador

**Próximo passo:** depende da #248.1.

- **Nível:** PESADO — mudança em massa no quadro e script do gerador.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)

### #248.4 — Aceite do usuário

**Próximo passo:** depende da #248.3; o usuário digita `verify` e confere o resultado.

- **Nível:** LEVE — conferência do usuário.
- **Modelo:** Usuário — nenhuma IA executa (#247)
