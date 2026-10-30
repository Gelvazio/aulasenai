## Etapa 584-9c41e7a2 — #437: Botão "Início" na navegação dos projetos Scratch

**Tarefa:** #437-9c41e7a2 · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "deve ter um botão início aqui" (barra com Voltar e Avançar das páginas dos projetos).
**Objetivo:** botão "Início" na barra de navegação dos 12 projetos, levando ao `index.html`.

### #437.1 — Botão Início nos 12 projetos
**Próximo passo:** em cada `projeto-NN-*.html`, dentro de `<nav class="navegacao">`, acrescentar entre os botões Voltar e Avançar `<a class="seta" href="index.html">Início</a>`; em `assets/scratch.css` acrescentar `a.seta { text-decoration: none; display: inline-block; text-align: center; }`.
- **Nível:** LEVE — Jev (confiança 0,61, matriz) · **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash · **Effort:** low
- **Verificação:** `grep -c 'href="index.html">Início' ` = 1 por projeto (12).
- **Entrega #437.1:** botão Início (link para index.html) na navegação dos 12 projetos e no modelo; botão "Final »" (`passo-final`, vai ao último passo e fica desabilitado nele) em `assets/scratch.js` e nas páginas; classe `a.seta` no CSS. **Verificação:** grep conferido (1 por arquivo, Início e Final); `node --check assets/scratch.js` OK; tela não conferida (sem navegador).
