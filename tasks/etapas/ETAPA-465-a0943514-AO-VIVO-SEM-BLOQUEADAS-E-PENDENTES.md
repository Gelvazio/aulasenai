## Etapa 465-a0943514 — Tela AO VIVO sem bloqueadas e pendentes

**Tarefa:** #336-a0943514-62d9-4297-926b-309e2601cd9e · **Pedido em:** 2026-10-21 19:01 · **Criada por:** Claude Code (Opus 5.5) (local · main · s34)
**Pedido:** "na pagina live,bloqueada e pendente nao deve aparecer" (print dos cartões ⛔ 88
Bloqueadas e ⬜ 1260 Pendentes)
**Objetivo:** a `live.html` mostra só o que está vivo (em andamento, aguardando, frentes e
concluídas), sem bloqueadas e pendentes.

### #336.1 — Tirar bloqueadas e pendentes da live.html

**Próximo passo:** — (concluída)

- **Nível:** MEDIO — JS de tela, 2 arquivos
- **Modelo:** só Sonnet — nunca outro
- **Descrição:** em `scripts/regras/visualizador/live.js`, tirar ⛔ e ⬜ de `RESUMO_ITENS` e o
  desenho da tabela `ao-vivo-bloqueadas` (e constantes que ficarem sem uso); em
  `live-modelo.html`, tirar a seção "⛔ Bloqueadas". Regenerar.
- **Critérios de aceitação:** nenhum "Bloqueadas"/"Pendentes" na `live.html`; `node --check` ok;
  conferir na tela (usuário).
- **Executor:** Claude Code (Sonnet · executor-medio) (local · main · s34), líder Opus 5.5
- **Entrega:** `live.js` (sem ⛔/⬜ no resumo e sem a tabela de bloqueadas; constantes sem uso
  removidas) e `live-modelo.html` (sem a seção ⛔) — 2026-10-21 19:05
- **Verificação:** `node --check` ok; grep "Bloquead|Pendentes|ao-vivo-bloqueadas" na
  `live.html` = 0; linhas ≤ 100. Conferir na tela (usuário).
