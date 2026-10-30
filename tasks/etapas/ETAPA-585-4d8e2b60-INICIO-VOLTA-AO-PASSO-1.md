## Etapa 585-4d8e2b60 — #438: Botão "Início" volta ao passo 1 (não ao menu)

**Tarefa:** #438-4d8e2b60 · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "INÍCIO, VOLTA NA ETAPA INICIAL, E NÃO AO MENU DE PROJETOS".
**Objetivo:** o botão Início da navegação dos projetos Scratch leva ao passo 1 do próprio projeto.

### #438.1 — Início vai ao passo 1
- **Nível:** MEDIO — Jev (confiança 0,56 → matriz) · **Modelo:** só Sonnet · **Effort:** medium
- Troca `<a class="seta" href="index.html">Início</a>` por `<button id="passo-inicio" class="seta" type="button">Início</button>` nos 12 projetos e no modelo; `scratch.js` liga o clique a `mostrar(0)`; o botão fica desativado no passo 1. O link "Todos os projetos" no topo continua levando ao menu.
