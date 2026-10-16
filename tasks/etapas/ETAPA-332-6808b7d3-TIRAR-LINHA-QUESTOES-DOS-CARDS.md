## Etapa 332-6808b7d3 — Tirar a linha "50 questões · múltipla escolha · 90–120 minutos" dos cards

**Tarefa:** #205-6808b7d3-2460-47de-8321-a28e1930ce2c · **Pedido em:** 2026-10-16 15:09 · **Criada por:** Claude Code (Opus 5.5) (local · main · s10)
**Pedido:** "APAGUE ESTES TEXTOS,DOS CARDS DE ATIVIDADES TB" (imagem com a linha
"50 questões · múltipla escolha · 90–120 minutos" marcada nos cards).
**Pedido (2026-10-16 15:12, mesma tarefa):** "N MOSTRE ESTES CONTEUDOS DE MARKDOWN NOS CARDS TB"
(imagem com o botão "📚 Conteúdo (.md)" marcado).
**Objetivo:** os cards dos índices de atividades deixam de mostrar a linha de resumo (`.meta`) e o
botão "📚 Conteúdo (.md)".

### #205.1 — Tirar a linha de resumo dos cards

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — código (CSS/JS/gerador) em 1 a 3 arquivos
- **Critérios de aceitação:** nenhum card de atividade mostra a linha de resumo nem o botão
  "Conteúdo (.md)".
- **Decisão:** esconder pelo `assets/css/indice-aula-data.css`, que o `atividades-crud-modal.js`
  carrega só nos 33 índices de matéria — os índices de curso (cards de matéria com "N arquivos de
  atividade") continuam iguais, e não é preciso regravar 33 HTMLs gerados.
- **Entrega:** regras `.aula .meta` e `.aula .acoes a.btn[href$=".md"]` com `display: none` em
  `assets/css/indice-aula-data.css`; JSDoc de `carregarDataAulasIndice` ajustado.
  **Verificação:** `node --check` ok; os 33 `ATIVIDADES/index.html` carregam o
  `atividades-crud-modal.js`; os botões `.md` dos cards são só "📚 Conteúdo (.md)" (grep);
  confirmar na página (sem navegador aqui).

### #205.2 — Aceite do usuário

**Próximo passo:** 👀 o usuário recarrega um índice de atividades e confirma que a linha e o botão sumiram.

- **Nível:** LEVE — confirmação do usuário
