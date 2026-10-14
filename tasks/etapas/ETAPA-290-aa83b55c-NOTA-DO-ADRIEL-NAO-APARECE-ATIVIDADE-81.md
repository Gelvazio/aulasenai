## Etapa 290-aa83b55c — Bug: a nota do Adriel não aparece na atividade 81

**Tarefa:** #163-aa83b55c-cc25-49ad-9ded · **Pedido em:** 2026-10-14 20:41 · **Executor:** Claude Code (local · main)
**Pedido:** "ADRIEL TORESANI STEFFENS, JA FOI CORRIGIDO E NAO MOSTRA A NOTA DELE NA ATIVIDADE ID=81, POR QUE?"
**Objetivo:** descobrir por que a nota do Adriel não aparece na atividade 81 e corrigir se for erro.
**Próximo passo:** 290.2 — usuário dizer em qual tela a nota não aparece (Progresso do professor, página do aluno ou média final).

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 290.1 | Banco: Adriel (atividade 81) entregou a tentativa 1 em 14/10 17:22; 20 respostas preenchidas; 20 correções com nota do professor (soma 9,50) e com nota da IA (soma 9,50); prova de 10 pontos e 20 questões → nota 9,50. A função `notas_media_final` calcula 9,50 para ele. O dado está certo; falta saber em qual tela a nota some | ✅ Concluído | 2026-10-14 20:43 | consultas SQL em `correcao_discursiva`, `entrega_atividade`, `resposta_discursiva` e leitura de `notas_media_final` |
| 290.2 | Corrigir (se for erro) | 👀 Aguardando o usuário | — | — |
| 290.3 | Aceite do usuário | ⬜ Pendente | — | — |
