## Etapa 294-9e7fb399 — Renumerar os itens pelo número da tarefa (N.x)

**Tarefa:** #167-9e7fb399-80b2-4fe2-8a49-c45941337d1e · **Pedido em:** 2026-10-14 21:07 · **Executor:** nuvem · relaxed-lovelace-sgtq7z
**Pedido:** "faça isso em todas as tarefas, usando esta mesma lógica" (itens `166.1`, `166.2`… em vez de `293.1`…)
**Objetivo:** os itens das etapas ligadas a uma tarefa passam a usar o número da tarefa (`N.x`), e não o número da etapa.
**Próximo passo:** 167.7 — aceite do usuário.

### Escopo
- **Entra:** as 159 etapas com cabeçalho `**Tarefa:** #N`; as tarefas #131 e #154, que têm duas etapas cada, seguem numeração contínua (131.1 a 131.4; 154.1 a 154.7); `.claude/rules/tasks/quadro.md` (modelo `N.x`); `docs/HISTORICO-REGRAS.md`; referências internas aos itens dentro dessas etapas.
- **Não entra:** as etapas antigas sem tarefa no quadro (ficam como estão, sem número de tarefa para usar); histórico de commits; criar ou apagar tarefas.

### Riscos
- **Códigos repetidos com as etapas antigas:** a etapa 011 (sem tarefa) usa `11.1`, e a tarefa #11 também passará a usar `11.1`. Os códigos só são únicos dentro de cada tarefa; quem citar um item precisa dizer também a etapa. Plano B: `git revert` do commit da renumeração.

### Decisões
- 2026-10-14 21:42 — Usuário escolheu renumerar também as 5 etapas sem o cabeçalho `**Tarefa:**` (079 → 15.x; 121 → 18.x; 141-a7e81c26 → 23.x; #17 continua depois da 073: 070 → 17.18–17.22, 072 → 17.23–17.30; citações 70.5 e 72.8 → 17.22 e 17.30), com o quadro mostrado antes de gravar.
- 2026-10-14 21:11 — Usuário aprovou o quadro de renumeração ("Sim, gravar como está"), com os 381 códigos repetidos com etapas antigas sem tarefa.
- 2026-10-14 21:11 — O código duplicado `17.15` da etapa 073 (já existia no arquivo original) virou `17.15b`, o segundo item 15 acrescentado depois.
- 2026-10-14 21:07 — Usuário escolheu, para #131 e #154, numeração contínua (131.1, 131.2… nas duas etapas) em vez de sufixo de letra.
- 2026-10-14 21:07 — Usuário aprovou o plano ("Sim, executar").
- 2026-10-14 21:07 — Usuário pediu soltar a #166 (reserva desta frente) para pegar esta tarefa; a #166 segue para outra frente, nos passos 166.4 em diante.
- 2026-10-14 21:34 — Auditoria (167.5) corrigida: 073 (Próximo passo → 17.15b); 207 (#80) e 208 (#81), que usavam o código `E-uuid8.k`, renumeradas para 80.x e 81.x; 143 (#25) cita as sub-tasks como `#25.NN` para não confundir com os itens 25.NN; citações antigas na 148 (25.3–25.24, 24.5) e na 292 (26.5/26.6); título da #17 no quadro (17.14); `scripts/testes-frontend/fechar_banco.py` e `pipeline.py` passam a usar 22.x (o fechar_banco quebraria nas aulas 05 a 10); exemplo das #131 no `quadro.md` (são duas tarefas com o mesmo número).
- 2026-10-14 21:34 — Achados descartados pelo verificador (não corrigidos): etapas antigas 127 e 136 citam 125.5/125.8 (hoje 20.5/20.8); `scripts/banco-de-dados/pipeline.py` e `commit_aula.sh` citam 125.x (as 20 aulas já estão fechadas); `docs/fila-tasks-agendador-unico.md` (registro da #24 cancelada); exemplo de saída da skill `proxima-task`.

### Itens

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 167.1 | Aprovação do plano pelo usuário ("Sim, executar") | ✅ Concluído | 2026-10-14 21:07 | usuário |
| 167.2 | Renumerar os itens das 157 etapas com tarefa (N.x) e as duas tarefas repetidas | ✅ Concluído | 2026-10-14 21:11 | conferir por script: nenhum `NNN.x` com número de etapa restante nas etapas com tarefa |
| 167.3 | Atualizar `quadro.md` (modelo `N.x`) e `docs/HISTORICO-REGRAS.md` | ✅ Concluído | 2026-10-14 21:11 | leitura do arquivo |
| 167.4 | Conferir: sem código repetido dentro de uma tarefa; referências internas corretas | ✅ Concluído | 2026-10-14 21:11 | script e amostra lida à mão |
| 167.5 | Auditoria independente da renumeração (workflow de revisão) | ✅ Concluído | 2026-10-14 21:34 | workflow: 3 auditores (integridade, referências, regras e scripts) + 1 verificador cético por auditor; 12 achados confirmados (11 corrigidos, 1 vai para o 167.8), 9 descartados |
| 167.6 | Regenerar o visualizador `.claude/rules/index.html` e fazer commit + push | ✅ Concluído | 2026-10-14 21:34 | `git log`: 8fa31ad (renumeração) e o commit das correções da auditoria |
| 167.8 | Decidir as 5 etapas ligadas a tarefa no quadro sem o cabeçalho `**Tarefa:**` (079 #15; 070 e 072 #17; 121 #18; 141-a7e81c26 #23; 41 itens): renumerar ou deixar como estão — decidido: renumerar (41 itens, cabeçalho **Tarefa:** nas 5 etapas, citações no `STATUS.md`, na 073 e na 121) | ✅ Concluído | 2026-10-14 21:49 | quadro mostrado e aprovado ("Sim, gravar como está"); commit bf866a0; auditoria independente (workflow: 3 auditores — integridade, referências, ferramentas — + verificador cético por achado): 0 achados |
| 167.7 | Aceite do usuário | ✅ Concluído (aceite do usuário: "Aceito tudo", 2026-10-16 21:08) | 2026-10-16 21:08 | — |
