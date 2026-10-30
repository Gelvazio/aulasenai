## Etapa 582-3f7a91c4 — #435: Projetos Scratch passo a passo (Fundamentos da Tecnologia e Programação)

**Tarefa:** #435-3f7a91c4 · **Pedido em:** 2026-10-29 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** na pasta `AULAS/projetos-scratch` de Fundamentos da Tecnologia e Programação, criar `index.html` (tema visual futurista, `rules-ai/prompts/VISUAL-FUTURISTA.md`) que referencia vários projetos de Scratch da mesma pasta; usar vários agentes ao mesmo tempo; projetos para crianças da 8ª série em 2 aulas de 3 horas; cada hora entrega 1 projeto (3 por aula, 6 no mínimo, de 10 a 15 desejáveis); cada projeto é uma página HTML em passo a passo com setas para frente e para trás; explicações baseadas no livro "Scratch: jeito divertido de programar" (`APOSTILA/Scratch-jeito_divertido_de_programar.pdf`) e no site scratch.mit.edu.
**Objetivo:** material de 12 projetos Scratch, prontos para uso em 2 aulas de 3 horas.

### Decisões
- 2026-10-29: 12 projetos, 6 por aula, 2 por hora (curtos, ~30 min cada); em cada hora o aluno entrega ao menos 1 projeto.
- Folha de estilo e script de passos compartilhados em `projetos-scratch/assets/` (futurista, setas ← →, teclado, barra de progresso).
- Não é conteúdo de aula (`CONTEUDO/AULA-NN`): são roteiros de prática; nenhum slide é gerado.

### #435.1 — Base compartilhada e modelo de página
**Próximo passo:** criar `assets/scratch.css`, `assets/scratch.js` e `projeto-modelo.html`.
- **Nível:** PESADO — sinal do Jev (hook da mensagem: mais_de_3_arquivos, confiança baixa → mais restritivo)
- **Modelo:** só Sonnet (ou Opus 5.5+/Fable, DeepSeek) — Sonnet executa
- **Critérios:** passos com setas, teclado, progresso; sem JS/CSS inline; acessibilidade do prompt futurista.
- **Entrega:** — · **Verificação:** `node --check`.

### #435.2 — Projetos da Aula 1 (01 a 06)
**Próximo passo:** agentes escrevem as 6 páginas.
- **Nível:** PESADO (mesmo sinal) · **Modelo:** só Sonnet
- **Verificação:** cada página tem passos, abre os assets e passa na conferência de estrutura.

### #435.3 — Projetos da Aula 2 (07 a 12)
**Próximo passo:** agentes escrevem as 6 páginas.
- **Nível:** PESADO (mesmo sinal) · **Modelo:** só Sonnet

### #435.4 — index.html, conferência e entrega
**Próximo passo:** criar `index.html` listando os 12 projetos por aula/hora; conferir links; commit + push.
- **Nível:** PESADO (mesmo sinal) · **Modelo:** só Sonnet

### Entrega (2026-10-29)
- 12 projetos `projeto-01..12-*.html`, `index.html`, `assets/scratch.css|js`, `projeto-modelo.html` em `AULAS/projetos-scratch/`; escritos por 4 agentes Sonnet em paralelo.
- **Verificação:** `node --check assets/scratch.js` ok; cada projeto tem 9 a 11 passos e os 4 ids de navegação; sem CSS/JS inline; links do index existem. Não conferido na tela (sem navegador): testar no Scratch os blocos citados (pare todos/mande no 09, lógica "tocando" no 10, rótulos do 03). Livro lido só em parte por alguns agentes.
- **Pendente (👀):** avaliação de cada etapa — opção A (nota no sistema, como Atividade Dinâmica) ou B (ficha de critérios na página).

### Decisões (2026-10-29)
- O usuário escolheu a **opção B** para avaliar cada etapa: ficha de critérios dentro da página (sem nota no sistema).

### #435.5 — Ficha de critérios no passo Entrega dos 12 projetos
**Próximo passo:** em cada `projeto-NN-*.html`, no último passo, acrescentar uma `<table class="ficha-avaliacao">` com 4 a 5 critérios (os mesmos já citados na caixa `.entrega`), colunas Critério · Pontos · Ok (✔ para o professor marcar) e linha "Total: 10"; acrescentar a classe `.ficha-avaliacao` ao final de `assets/scratch.css` (borda neon ciano, cabeçalho em Orbitron, sem estilo inline).
- **Nível:** LEVE — decidido pelo Jev (confiança 0,96); **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash; **Effort:** low
- **Critérios:** pontos de cada ficha somam 10; critérios coerentes com o projeto; sem JS/CSS inline.
- **Verificação:** `grep -c ficha-avaliacao` = 1 por projeto (12); leitura da soma dos pontos.

### #435.6 — Índice compacto (os 12 cards numa tela)
**Próximo passo:** reduzir cabeçalho e cards do `index.html` e organizar as Aulas 1 e 2 lado a lado, com 3 colunas de cards cada, para caber sem rolagem em tela de desktop.
- **Nível:** MEDIO — Jev (confiança 0,73) · **Modelo:** só Sonnet · **Pedido do usuário:** "diminua o menu e o tamanho dos cards, mas faça caber numa página"
- **Verificação:** leitura do HTML/CSS; sem navegador (usuário confere na tela).

- **Entrega #435.6:** `index.html` refeito (cabeçalho em uma linha, Aula 1 e Aula 2 lado a lado, 3 colunas de cards pequenos) e bloco `.indice-compacto` no `scratch.css`. **Verificação:** 12 cards, links existem; tela não conferida (sem navegador).

### #435.7 — Páginas dos projetos sem barra de rolagem
**Próximo passo:** CSS em tela cheia (100dvh, cabeçalho compacto) e ajuste automático de escala do passo em `scratch.js`.
- **Nível:** MEDIO · **Modelo:** só Sonnet · **Pedido:** "não deve ter barra de rolagem nas páginas dos projetos"
- **Entrega #435.7:** CSS em tela cheia (100dvh, cabeçalho compacto) e `ajustarEscala` no `scratch.js` (reduz a fonte do passo até caber, mínimo 50%). **Verificação:** `node --check` ok; tela não conferida (sem navegador).

### #435.8 — Só o passo ativo aparece (regressão da #435.7)
**Próximo passo:** em `AULAS/projetos-scratch/assets/scratch.css`, trocar a regra `.pagina:has(.passo) > .cartao { display: flex; ... }` e suas variações (`> .cartao h1`, `p`, `.fichas`) para `> .cartao:not(.passo)`, e acrescentar `.passo { display: none; }` e `.passo.ativo { display: block; }` depois dela. Causa: o `article.passo.cartao` é filho direto de `.pagina`, então a regra do cabeçalho compacto (mais específica) forçou `display: flex` em todos os passos e eles aparecem empilhados e cortados.
- **Nível:** LEVE — Jev (confiança 0,91) · **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash · **Effort:** low
- **Critérios:** só um `.passo` visível por vez; sem barra de rolagem; resto do CSS intacto.
- **Verificação:** leitura do CSS (seletores com `:not(.passo)`); tela conferida pelo usuário.
- **Entrega #435.8:** em `assets/scratch.css`, os seletores do cabeçalho compacto passaram a usar `> .cartao:not(.passo)`, para o passo deixar de herdar `display: flex`. Só o passo ativo aparece. **Verificação:** leitura do CSS (grep dos seletores); tela a conferir pelo usuário.
