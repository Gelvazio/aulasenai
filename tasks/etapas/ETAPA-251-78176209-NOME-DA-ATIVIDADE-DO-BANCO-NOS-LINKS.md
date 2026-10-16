## Etapa 251-78176209 — Texto do botão da atividade vem do banco (nome_atividade)

**Tarefa:** #124-78176209-1d87-4c8b · **Pedido em:** 2026-10-14 13:20 · **Executor:** Claude Code (local · main)
**Pedido:** "ESTE TEXTO N ESTA CARREGANDO DA ATIVIDADE" (print do botão "ID 81 ✍️ Discursivas" no card de sexta)
**Objetivo:** em todos os `ATIVIDADES/index.html`, o texto do botão de cada atividade passa a ser o `atividade.nome_atividade` do banco (mantendo o emoji do começo e a etiqueta "ID NN"); sem nome no banco, ou atividade que o usuário não lê pelo RLS, fica o texto do HTML.
**Próximo passo:** 124.2 — aceite do usuário.

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 124.1 | `assets/js/indice-aula-repositorio.js`: `buscarNomesDasAtividadesCard`; `assets/js/indice-aula-data.js`: `renderizarNomesDasAtividades` + `escreverNomeNoLink`, chamado no fim de `desenharCardsDoIndice` | ✅ Concluído | 2026-10-14 13:20 | `node --check` nos 2 arquivos; regex do prefixo testado no node ("✍️ ", "🔒 📘 ", "📝 ") |
| 124.2 | Aceite do usuário (recarregar o índice da ITIC) | 👀 Aguardando o usuário | — | — |
