## Etapa 348-c7244bf6 — Dois cards da Aula 06 editam a mesma aula

**Tarefa:** #221-c7244bf6-9b58-4d1a-866c-f20d325e287a · **Pedido em:** 2026-10-16 20:12 · **Criada por:** Claude Code (Opus 5.5) (local · main · s16)
**Pedido:** "2 cards, estao ficando com mesmo id,pois ao editar a aula de 1,edita a aula de outro
tb,verifique" (print: no índice da ITIC aparecem dois cards "AULA 06 — Editor de Textos:
Formatação e Estruturação-old", um com a atividade ID 19 e outro com as atividades ID 08 e ID 102).
**Objetivo:** descobrir por que os dois cards apontam para a mesma aula ao editar e corrigir, para
que cada card edite só a sua aula.

### #221.1 — Investigar e corrigir os dois cards da Aula 06

**Próximo passo:** ler o índice da ITIC, o "Editar aula" (`indice-aula-modal.js`) e as aulas da
matéria no banco para achar a chave repetida.

- **Nível:** PESADO — bug que pode envolver dados do banco (tabela `aulas`) e mais de um arquivo.

### #221.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário edita um dos cards da Aula 06 e confere que o outro não muda.

- **Nível:** LEVE — conferência do usuário.
