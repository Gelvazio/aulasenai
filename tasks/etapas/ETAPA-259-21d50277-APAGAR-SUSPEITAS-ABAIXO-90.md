## Etapa 259-21d50277 — Apagar as suspeitas de cópia abaixo de 90%

**Tarefa:** #132-21d50277-6607-4cac · **Pedido em:** 2026-10-14 14:32 · **Executor:** Claude Code (local · main)
**Pedido:** "apague as suspeitas abaixo de 90%"
**Objetivo:** tirar do banco as 34 suspeitas pendentes da atividade 81 com semelhança abaixo de 90% (critério da #131).
**Próximo passo:** — (concluída)

Apagar linhas em massa não vai pelo conector (`.claude/rules/security-banco.md`): o SQL fica pronto e o professor executa. As linhas são regeradas pela IA se precisar (sem backup separado: nenhuma foi validada).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 132.1 | SQL `database/2026-10-14-apagar-suspeitas-copia-abaixo-90.sql` (conferir → apagar só `pendente` com `semelhanca < 0.9` → conferir) | ✅ Concluído | 2026-10-14 14:32 | Consulta antes: 34 linhas, todas da atividade 81, todas pendentes |
| 132.2 | Professor executa o SQL no SQL Editor do Supabase | ✅ Concluído | 2026-10-14 14:34 | Usuário: "feito" |
| 132.3 | Conferir pelo conector (esperado: 0 abaixo de 90%; 75 suspeitas na 81) | ✅ Concluído | 2026-10-14 14:34 | Consulta: abaixo_90 = 0, na_81 = 75, total = 75 |
