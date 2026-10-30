## Etapa 583-6b2e5d17 — #436: Placar de equipes com timer (projetos Scratch)

**Tarefa:** #436-6b2e5d17 · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "tem como gamificar os projetos e colocar time para cada um, para os alunos disputarem entre si?" → "placar na página com timer".
**Objetivo:** página `placar.html` em `AULAS/projetos-scratch/` com equipes, pontos por projeto, ranking com medalhas e cronômetro regressivo; dados só no navegador do professor (`localStorage`).

### #436.1 — Placar com timer
**Próximo passo:** criar `placar.html`, `assets/placar.css`, `assets/placar.js` e ligar no `index.html`.
- **Nível:** MEDIO — Jev (confiança 0,92) · **Modelo:** só Sonnet · **Effort:** medium
- **Critérios:** equipes (nome e cor), pontos por projeto e bônus, ranking com medalhas, timer regressivo (iniciar, pausar, zerar, alerta sonoro), dados salvos no navegador, sem rolagem na tela.
- **Verificação:** `node --check`; leitura do HTML/CSS.
