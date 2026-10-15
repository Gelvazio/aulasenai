## Etapa 294-9e7fb399 — Renumerar os itens pelo número da tarefa (N.x)

**Tarefa:** #167-9e7fb399-80b2-4fe2-8a49-c45941337d1e · **Pedido em:** 2026-10-14 21:07 · **Executor:** nuvem · relaxed-lovelace-sgtq7z
**Pedido:** "faça isso em todas as tarefas, usando esta mesma lógica" (itens `166.1`, `166.2`… em vez de `293.1`…)
**Objetivo:** os itens das etapas ligadas a uma tarefa passam a usar o número da tarefa (`N.x`), e não o número da etapa.
**Próximo passo:** 294.2 — rodar a renumeração das etapas com tarefa (script em arquivo temporário, fora do repositório).

### Escopo
- **Entra:** as 159 etapas com cabeçalho `**Tarefa:** #N`; as tarefas #131 e #154, que têm duas etapas cada, seguem numeração contínua (131.1 a 131.4; 154.1 a 154.7); `.claude/rules/tasks/quadro.md` (modelo `N.x`); `docs/HISTORICO-REGRAS.md`; referências internas aos itens dentro dessas etapas.
- **Não entra:** as etapas antigas sem tarefa no quadro (ficam como estão, sem número de tarefa para usar); histórico de commits; criar ou apagar tarefas.

### Riscos
- **Códigos repetidos com as etapas antigas:** a etapa 011 (sem tarefa) usa `11.1`, e a tarefa #11 também passará a usar `11.1`. Os códigos só são únicos dentro de cada tarefa; quem citar um item precisa dizer também a etapa. Plano B: `git revert` do commit da renumeração.

### Decisões
- 2026-10-14 21:07 — Usuário escolheu, para #131 e #154, numeração contínua (131.1, 131.2… nas duas etapas) em vez de sufixo de letra.
- 2026-10-14 21:07 — Usuário aprovou o plano ("Sim, executar").
- 2026-10-14 21:07 — Usuário pediu soltar a #166 (reserva desta frente) para pegar esta tarefa; a #166 segue para outra frente, nos passos 166.4 em diante.

### Itens

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 294.1 | Aprovação do plano pelo usuário ("Sim, executar") | ✅ Concluído | 2026-10-14 21:07 | usuário |
| 294.2 | Renumerar os itens das 159 etapas com tarefa (N.x) e as duas tarefas repetidas | ⬜ Pendente | — | conferir por script: nenhum `NNN.x` com número de etapa restante nas etapas com tarefa |
| 294.3 | Atualizar `quadro.md` (modelo `N.x`) e `docs/HISTORICO-REGRAS.md` | ⬜ Pendente | — | leitura do arquivo |
| 294.4 | Conferir: sem código repetido dentro de uma tarefa; referências internas corretas | ⬜ Pendente | — | script e amostra lida à mão |
| 294.5 | Auditoria independente da renumeração (workflow de revisão) | ⬜ Pendente | — | relatório da auditoria |
| 294.6 | Regenerar o visualizador `.claude/rules/index.html` e fazer commit + push | ⬜ Pendente | — | `git log` |
| 294.7 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
