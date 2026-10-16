## Etapa 330-bcdf4868 — Card da AVALIACAO-OBJETIVA-01.html com o rótulo "AULA 06"

**Tarefa:** #203-bcdf4868-c19d-4a02-8f12-46a953a46f3c · **Pedido em:** 2026-10-16 14:57 · **Criada por:** Claude Code (Opus 5.5) (local · main · s10)
**Pedido:** "AVALIACAO-OBJETIVA-01.html,deve ser *AULA 06*" (sobre o rótulo "AVALIAÇÃO 01" do card
"Aula 06 - Editor de Textos: Formatação e Estruturação" no índice de atividades de ITIC).
**Objetivo:** o card da atividade `AVALIACAO-OBJETIVA-01.html` (ITIC, Logística) mostrar o rótulo
**AULA 06** em vez de **AVALIAÇÃO 01**.

### Escopo

- **Entra:** a linha da tabela `aulas` ligada à atividade `AVALIACAO-OBJETIVA-01.html` de ITIC:
  coluna `rotulo_card` passa a dar **AULA 06** (o rótulo vem dela — `assets/js/indice-aula-data.js`,
  `obterRotuloDaAula`).
- **Não entra:** título, data, outras aulas, o HTML gerado do índice (tem alteração local que não é
  desta tarefa).

### Riscos

- Mudar a linha errada → plano B: guardar o valor antigo na etapa e voltar com um `UPDATE` igual.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 15:05 | Aprovado o `UPDATE aulas SET rotulo_card = 'AULA 06' WHERE id = 69` | Usuário ("sim, pode gravar AULA 06 na aula 69") | Pedido da tarefa |

### #203.1 — Conferir a aula no banco e aprovar a mudança

**Próximo passo:** — (aprovado pelo usuário em 2026-10-16 15:05).

- **Achado (2026-10-16 15:00):** atividade **19** ("Avaliação Objetiva 01", página
  `.../INTRODUCAO-TIC/ATIVIDADES/AVALIACAO-OBJETIVA-01.html`) → aula **69** (matéria 25,
  `numero` 12, `rotulo_card` = **`AVALIAÇÃO 01`**, `nome_card`/`titulo` = "Aula 06 - Editor de
  Textos: Formatação e Estruturação", data 2026-09-28; só essa atividade na aula). A aula 26
  (`numero` 6) também tem `rotulo_card` = `AULA 06` — o índice desempata pelo nome do card.
- **Mudança proposta:** `UPDATE aulas SET rotulo_card = 'AULA 06' WHERE id = 69;`
  (volta: `... = 'AVALIAÇÃO 01'`).

- **Nível:** PESADO — banco (consulta e `UPDATE` em produção)
- **Descrição:** achar a atividade e a aula; registrar o valor atual de `rotulo_card`.
- **Critérios de aceitação:** usuário aprova o `UPDATE` com um "sim".

### #203.2 — Gravar o rótulo AULA 06 no banco

**Próximo passo:** — (entregue).

- **Nível:** PESADO — banco (`UPDATE` em produção)
- **Descrição:** `UPDATE aulas SET rotulo_card = 'AULA 06'` na aula conferida.
- **Critérios de aceitação:** consulta depois do `UPDATE` devolve `AULA 06`.
- **Entrega:** `UPDATE` aplicado pelo conector do Supabase em 2026-10-16 15:05 (só a aula 69,
  com a condição `rotulo_card = 'AVALIAÇÃO 01'`). **Verificação:** o `RETURNING` devolveu
  `id 69 · rotulo_card AULA 06 · nome_card "Aula 06 - Editor de Textos: Formatação e
  Estruturação"`. Na tela, o card passa a mostrar AULA 06 ao recarregar o índice (sem navegador
  aqui: confirmar na página).

### #203.3 — Aceite do usuário

**Próximo passo:** 👀 o usuário recarrega o índice de atividades de ITIC e confirma o rótulo AULA 06.

- **Nível:** LEVE — confirmação do usuário
