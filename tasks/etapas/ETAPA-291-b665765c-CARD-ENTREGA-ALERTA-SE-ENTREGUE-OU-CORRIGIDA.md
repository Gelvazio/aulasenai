## Etapa 291-b665765c — Card "Finalizar a avaliação": sem botão e com alerta se já entregue ou corrigida

**Tarefa:** #164-b665765c-7549-418f-8c74 · **Pedido em:** 2026-10-14 20:43 · **Executor:** Claude Code (local · main)
**Pedido:** "se ja foi corrigido, ou ja foi entregue, nao mostre este botao embaixo, mostre um alerta, se somente entregue, *Atividade já entregue! Aguarde a correção!*, ou *Atividade Corrigida, veja sua nota no inicio!*" (card ENTREGA / "Finalizar a avaliação" da discursiva)
**Objetivo:** no card de entrega do aluno, quando a atividade já foi entregue o botão some e aparece o alerta: só entregue → "Atividade já entregue! Aguarde a correção!"; corrigida → "Atividade Corrigida, veja sua nota no inicio!".
**Próximo passo:** 291.3 — aluno que já entregou abrir a atividade e conferir o alerta no card ENTREGA.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 291.1 | Card = `section.entrega-discursiva` (botão `btnFinalizarDiscursiva`, já escondido após entregar); "corrigida" = `notas_media_final` com situação `NOTA`, só lida quando o gabarito está liberado (a nota do início só aparece nesse caso) | ✅ Concluído | 2026-10-14 20:45 | leitura de `avaliacao-discursiva.js` e `resultado-aluno-discursiva.js` |
| 291.2 | Alerta no card: entregue → "Atividade já entregue! Aguarde a correção!"; corrigida (nota visível) → "Atividade Corrigida, veja sua nota no início!" (escrito com acento). Se corrigida mas o gabarito ainda não liberado, fica o aviso de aguardar, porque a nota ainda não aparece no início. `avaliacao-discursiva.js`, `resultado-aluno-discursiva.js`, CSS | ✅ Concluído | 2026-10-14 20:45 | `node --check`; revisão do código (sem navegador) |
| 291.3 | Aceite do usuário | 👀 Aguardando o usuário | — | — |
