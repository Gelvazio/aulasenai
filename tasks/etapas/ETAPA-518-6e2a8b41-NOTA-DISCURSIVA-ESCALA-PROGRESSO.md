## Etapa 518-6e2a8b41 — Nota da discursiva no Progresso da turma mostra 10,00 em vez da nota real

**Tarefa:** #369-6e2a8b41 · **Pedido em:** 2026-10-24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "POR QUE O PROFESSOR NAO VE A NOTA FINAL AQUI? ... NESTE CASO A NOTA E 8,47 E NAO 10" (aluno Alexander Rafael Moreno Rodrigues, avaliação prática de Introdução à TIC, 85% de acerto).
**Causa:** `progresso-turma-fontes.js` somava a nota da IA e a do professor em PONTOS BRUTOS; `notaProporcionalGlobal` (progresso-turma-global.js) espera a nota já na escala 0 a 10 e limita em 10. Com a prova valendo mais de 10 pontos, todo aluno passava de 10 e aparecia 10,00. O aluno vê o valor certo (função `notas_media_final` do banco: soma das notas ÷ pontos de todos os tópicos × 10).
**Objetivo:** o quadro mostrar a mesma nota que o banco e o aluno (ex.: 8,47).

### #369.1 — Normalizar a nota das discursivas para a escala 0–10 no Progresso da turma

**Próximo passo:** conferir na tela se o aluno do exemplo mostra 8,47.

- **Nível:** MEDIO — JS com lógica, 1 arquivo (Jev, confiança 0,73)
- **Modelo:** só Sonnet
- **Entrega:** `assets/js/progresso-turma-fontes.js` — `fatorDeEscalaDaDiscursiva` (10 ÷ soma dos pontos de todos os tópicos), `escalarCorrecoesDaDiscursiva` (nota e possível na escala da prova; o percentual de acerto não muda) e `escalarNotaDoProfessor`. A objetiva não muda (já usava 0–10).
- **Verificação:** `node --check` ok; revisão por agente sem achados; conta conferida com os dados do aluno por outro agente. Conferir na tela: o usuário.
