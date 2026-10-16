## Etapa 289-71eb6c9b — Bug: "Confirmar Todas" do aluno Adriel diz que não há questão para confirmar

**Tarefa:** #162-71eb6c9b-0a10-4b3a-8837 · **Pedido em:** 2026-10-14 20:36 · **Executor:** Claude Code (local · main)
**Pedido:** "AO TENTAR CONFIRMAR A NOTA DO ADRIEL, DA ESSE ERRO" (popup: "Não há questão para confirmar: todas já têm a nota do professor ou estão com suspeita de cópia pendente.")
**Objetivo:** entender por que o aluno ADRIEL TORESANI STEFFENS não tem questão para confirmar e corrigir se for erro.
**Próximo passo:** 162.3 — usuário confirmar que o aviso estava certo (não era erro).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 162.1 | Consulta ao banco: ADRIEL TORESANI STEFFENS, atividade 81, tem 20 correções, as **20 já com `nota_professor`** (0 só com IA, 0 sem nota) | ✅ Concluído | 2026-10-14 20:37 | consulta SQL em `correcao_discursiva` |
| 162.2 | Não há o que corrigir: o aviso "Não há questão para confirmar: todas já têm a nota do professor…" está certo, a nota do Adriel já foi confirmada | ✅ Concluído | 2026-10-14 20:37 | resultado do item 162.1 |
| 162.3 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
