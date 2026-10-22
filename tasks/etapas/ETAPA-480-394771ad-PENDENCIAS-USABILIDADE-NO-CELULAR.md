## Etapa 480-394771ad — Tela Pendências: layout e usabilidade no celular

**Tarefa:** #351-394771ad-5a5f-4628-a465-eda0c07657b7 · **Pedido em:** 2026-10-22 18:21 · **Criada por:** Claude Code (Sonnet 5.5) (nuvem · dreamy-faraday-7x7tud)
**Pedido:** "Na tela dependências, melhore o layout na parte de usabilidade para o celular.
Apenas na tela dependência." (o usuário esclareceu: a tela é **Pendências**)
**Objetivo:** a tela Pendências (`MATERIAIS/AGENDA_COLABORADOR/pendencias.html`) fica fácil de
usar no celular: textos legíveis, botões de toque, lista e modal sem rolagem lateral.

### Escopo

- **Entra:** só `pendencias.html`, `assets/css/pendencias.css`, `assets/js/pendencias-pagina.js` e
  `assets/js/pendencias-modal.js` (só se o layout exigir).
- **Não entra:** outras telas, banco, regras de quem vê a tela (só Professor Administrador).

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-22 18:30 | Nível MEDIO (CSS/HTML/JS de 1 tela, até 3 arquivos); pedido sem banco nem login: tarefa pequena, sem plano | Claude Code (Sonnet 5.5) | `niveis.md` |

### #351.1 — Layout da tela Pendências para celular

**Próximo passo:** ler `pendencias.html`, `pendencias.css` e `pendencias-pagina.js` e ajustar o
layout para telas estreitas.

- **Nível:** MEDIO — 1 tela (HTML + CSS, JS só se preciso)
- **Modelo:** só Sonnet — nunca outro
- **Critérios de aceitação:** em 360 px sem rolagem lateral; textos ≥ 16 px nos campos; botões e
  filtros com alvo de toque ≥ 44 px; lista e modal legíveis; desktop sem mudança; `node --check`.
- **Entrega:** — · **Verificação:** —
