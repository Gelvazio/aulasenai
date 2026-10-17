## Etapa 390-4ae42a94 — Card "AVALIAÇÃO 02" sem id de aula (ITIC)

**Tarefa:** #263-4ae42a94-cc1e-43be-ab1f-5e7100712383 · **Pedido em:** 2026-10-17 18:23 · **Criada por:** Claude Code (Opus 5.5) (local · main · s20)
**Pedido:** "o card AVALIAÇÃO 02, esta sem id de aula, verifique na pasta
MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/index.html"
**Objetivo:** o card "AVALIAÇÃO 02" passa a ter a sua própria aula (linha em `aulas`, com id).

### Diagnóstico (2026-10-17 18:24, leitura do código e consulta)

- O card acha a aula pela **primeira atividade** dele (`indice-aula-data.js:172`,
  `encontrarAulaPelasPaginas`): `AVALIACAO-OBJETIVA-02.html` = atividade **20**, hoje com
  `aula_id` **27** (aula 07, "Textos Técnicos e Redação Empresarial").
- Na matéria 25 **não existe aula** para a Avaliação 02: o card pega emprestada a aula 27. O
  mesmo vale para o card "AVALIAÇÃO PRÁTICA" (atividade 36, também na aula 27).

### #263.1 — Decidir a aula do card (usuário)

**Próximo passo:** — (entregue em 2026-10-17 18:33; conferir na tela).

- **Decisão do usuário (2026-10-17 18:27):** "Voltar para a aula 10" — sem aula nova; a
  atividade 20 volta para a aula 30 (AULA 10), onde estava no diagnóstico da #260. O card
  "AVALIAÇÃO PRÁTICA" (atividade 36, aula 27) fica como está.
- **Entrega (Opus 5.5, s20):** `update atividade set aula_id = 30 where id = 20 and
  aula_id = 27` pelo conector; SQL com a volta em
  `database/2026-10-17-avaliacao-objetiva-02-volta-para-aula-10-itic.sql`.
- **Verificação:** o `update ... returning` devolveu `id 20, aula_id 30`.

- **Nível:** PESADO — mudança no banco (aula nova e `atividade.aula_id`).
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
