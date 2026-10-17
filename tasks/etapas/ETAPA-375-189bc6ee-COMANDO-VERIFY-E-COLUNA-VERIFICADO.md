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
| 2026-10-16 23:42 | Plano aprovado ("Sim"). As 3 perguntas ficaram sem resposta; valeu o padrão do plano: **só neste projeto** (regra em `.claude/rules/tasks/`, reutilizável), **só as linhas ainda não verificadas** (`verify tudo` confere todas), linhas não verificadas com **`—`** | Gelvazio | resposta "Sim" no chat |
| 2026-10-16 23:42 | Sai a #248.4 (aceite): a regra de 2026-10-17 (sem aceite do usuário em tarefa grande) manda a IA finalizar | Claude Code (Opus 5.5) s17 | `docs/HISTORICO-REGRAS.md` |
| 2026-10-16 23:43 | Coluna **Verificado** no fim da tabela (depois de Etapa): quem lê pela posição não quebra | Claude Code (Opus 5.5) s17 | menor risco |

### #248.1 — Plano e aprovação (tarefa grande)

**Próximo passo:** — (entregue; plano aprovado em 2026-10-16 23:42).

- **Nível:** PESADO — regra de todas as IAs e mudança em massa no quadro.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Entrega:** plano nesta etapa · **Verificação:** "Sim" do usuário no chat.

### #248.2 — Regra, gatilho e comando `verify`

**Próximo passo:** — (entregue).

- **Nível:** PESADO — regra de fluxo para todas as IAs (arquitetura do quadro).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Entrega:** `.claude/rules/tasks/verificacao.md` (nova), regra 14 do `AGENTS.md`, `.claude/commands/verify.md`, `INDEX.md`, `claude-code.md`, `docs/HISTORICO-REGRAS.md`. · **Verificação:** leitura; `verificacao.md` com 2,6 KB (≤ 5 KB).

### #248.3 — Coluna `Verificado` no quadro, modelos e visualizador

**Próximo passo:** — (entregue).

- **Nível:** PESADO — mudança em massa no quadro e script do gerador.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro (#247)
- **Entrega:** coluna `Verificado` (`—`) em 852 linhas do `tasks/STATUS.md` e 253 do `tasks/task_complete.md` (script idempotente na pasta da sessão); modelo em `tasks/quadro.md`. · **Verificação:** todas as linhas de "📌 Tarefas" com 9 colunas (`awk`); visualizador regenerado sem erro (o leitor acha as colunas pelo nome).

### #248.4 — Aceite do usuário

**Próximo passo:** ⛔ removida em 2026-10-16 23:42 (regra "sem aceite do usuário em tarefa grande").
