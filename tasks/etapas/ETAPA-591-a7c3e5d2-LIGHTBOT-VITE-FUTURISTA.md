## Etapa 591-a7c3e5d2 — #444: Light Bot em Vite com visual futurista

**Tarefa:** #444-a7c3e5d2 · **Pedido em:** 2026-10-29 22:05 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "LEIA https://www.gameflare.com/online-game/light-bot/ E CRIE 1 VERSAO COM VITE, HTML, CSS E JAVASCRIPT, USANDO O VISUAL FUTURISTA" (com `rules-ai/prompts/VISUAL-FUTURISTA.md`).
**Objetivo:** um Light Bot jogável em `jogos/ligthbot-versao-ia/`, feito com Vite + HTML + CSS + JS, no tema futurista (cyberpunk) já usado em `jogos/jogos.css`.

### Escopo
- **Entra:** grade de mapa com blocos e luzes, robô, área de programa com comandos (avançar, girar esquerda/direita, pular, acender), procedimentos (PROC1/PROC2), botões executar/parar/limpar, vários níveis, tela de vitória, contagem de comandos.
- **Não entra:** banco, login, ranking, som, editor de níveis, backend.
- Mecânica baseada no Light Bot clássico. A página do gameflare respondeu **403** à leitura (WebFetch), então as regras vêm do jogo conhecido; se o usuário quiser fidelidade a um detalhe da página (ex.: nº de níveis ou limite de comandos), basta dizer.

### Riscos
- O site é estático e **não roda `vite build` na Vercel**: o build precisa ficar versionado. Plano B: se o build gerar arquivos demais, usar `base: './'` e um único `assets/`.
- Regra do projeto diz "sem `package.json`" na raiz: o `package.json` fica **só** dentro de `ligthbot-versao-ia/fonte/`; `node_modules/` no `.gitignore`.

### Decisões
- **Proposta (aguarda o "sim"):** fonte em `ligthbot-versao-ia/fonte/` (Vite `root`), build com `outDir: '../'` e `emptyOutDir: false`, para o `index.html` gerado ficar em `ligthbot-versao-ia/index.html` e o card `ligthbot-versao-ia/` abrir direto.
- **2026-10-29 22:33 — execução em paralelo (ordem do usuário no chat: "use varios agentes"):** as subtarefas #444.9 a #444.20 são arquivos independentes sobre contratos fixos (constantes.js, nucleo/, classes CSS); a ordem de dependência do quadro era só de sequência. Cada agente é uma frente e reserva uma subtarefa; só o líder usa Git e edita o quadro.
- **Aprovação do usuário:** ✅ 2026-10-29 (usuário, no chat): "Sim, aprovo o plano da #444 e as decisões sugeridas" (JUMP para baixo de qualquer altura, vitória a cada ação, limite de 1000 passos, salvaguarda 8.4).

### #444.1 — Detalhar o REGRAS-JOGO.md (ambiguidades, limites, formato de nível, exemplos)
**Próximo passo:** entregue; a #444.2 aguarda o "sim" do usuário ao plano.
- **Nível:** LEVE — classificado (jev (confiança 0.97))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.97)
- **Arquivos:** jogos/ligthbot-versao-ia/REGRAS-JOGO.md
- **Critérios:** Regras sem ambiguidade: eixos, JUMP para baixo, limite de passos, momento da vitória, formato JSON de nível, exemplos de solução.
- **Entrega:** commit desta subtarefa (seções 6 a 15 acrescentadas ao REGRAS-JOGO.md, 338 linhas) por Claude Code (Haiku 5.5 · executor-leve; líder Sonnet 5.5).
- **Verificação:** releitura e grep das seções 6 a 15; as seções 1 a 5 ficaram intactas.
- **Anotação:** decisões sugeridas pelo executor a confirmar com o usuário: JUMP para baixo de qualquer altura, vitória checada a cada ação (substitui o texto da seção 5), limite de 1000 passos e salvaguarda para P1/P2 seguidos sem ação (8.4).

### #444.2 — Esqueleto Vite: package.json, vite.config.js, fonte/index.html, .gitignore
**Próximo passo:** entregue.
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/package.json, vite.config.js, fonte/index.html, .gitignore
- **Critérios:** `root` = fonte, `outDir` = '../', `emptyOutDir` false, `base` './'; node_modules ignorado.
- **Verificação:** `node --check vite.config.js`; JSON válido.
- **Entrega:** arquivos criados em jogos/ligthbot-versao-ia/fonte/ (package.json, vite.config.js, index.html, .gitignore) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** JSON do package.json válido; node --check do vite.config.js; index.html sem style= nem script inline

### #444.3 — Arquivo de constantes (orientações, limites, tamanhos, textos, chaves de storage)
**Próximo passo:** entregue.
- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/constantes.js
- **Critérios:** Nenhum número ou texto mágico nos outros módulos.
- **Verificação:** `node --check`.
- **Entrega:** fonte/src/constantes.js criado (comandos, orientações, áreas, limites, velocidades, textos, chaves) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** node --check constantes.js sem erro; 5 primitivos, P1/P2 e motivos de parada conferidos contra o REGRAS-JOGO.md

### #444.4 — Níveis em JSON: formato e os 10 primeiros níveis
**Próximo passo:** entregue.
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/niveis/*.json
- **Critérios:** Cada nível: alturas, objetivos, início, orientação, limites de MAIN/PROC1/PROC2, comandos liberados.
- **Verificação:** JSON válido; solução manual de cada nível descrita na etapa.
- **Entrega:** fonte/src/niveis/nivel-01.json a nivel-10.json e solucoes.md (gabarito do projeto, só na fonte) por Claude Code (Haiku 5.5 · executor-leve; líder Sonnet 5.5) (local · main).
- **Verificação:** JSON válido; as 10 soluções simuladas contra as guardas do REGRAS-JOGO.md: todas dão vitória dentro dos limites e dos comandos liberados

### #444.5 — Modelo do mundo: matrizes de alturas, objetivos e luzes
**Próximo passo:** entregue.
- **Nível:** MEDIO — classificado (jev (confiança 0.83))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.83)
- **Arquivos:** fonte/src/nucleo/mundo.js
- **Critérios:** Fora dos limites = altura 0; luz só alterna onde há objetivo.
- **Verificação:** `node --check`; leitura.
- **Entrega:** fonte/src/nucleo/mundo.js (mundo, alturas, objetivos, luzes, validação do nível) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** node --check sem erro; abismo fora do mapa e luz só em objetivo conferidos contra REGRAS-JOGO.md seções 1 e 3

### #444.6 — Robô e ações WALK, JUMP, LEFT, RIGHT, LIGHT
**Próximo passo:** entregue.
- **Nível:** MEDIO — classificado (jev (confiança 0.89))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Arquivos:** fonte/src/nucleo/robo.js
- **Critérios:** Guardas de altura exatamente como no REGRAS-JOGO.md; ação inválida não muda o estado.
- **Verificação:** `node --check`; conferir tabela de guardas.
- **Entrega:** fonte/src/nucleo/robo.js (WALK, JUMP, LEFT, RIGHT, LIGHT por mapa de estratégias) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** node --check sem erro; guardas de WALK (frente = atual, >0) e JUMP (frente = atual+1 ou menor, >0) conferidas contra REGRAS-JOGO.md

### #444.7 — Memória do programa: slots de MAIN, PROC1 e PROC2
**Próximo passo:** entregue.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/nucleo/programa.js
- **Critérios:** Slots de tamanho fixo por nível; slot vazio é ignorado; contagem de comandos usados.
- **Verificação:** `node --check`.
- **Entrega:** fonte/src/nucleo/programa.js (slots fixos, inserir, remover, limpar, contar) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** node --check sem erro; contagem = slots preenchidos (REGRAS-JOGO.md seção 10)

### #444.8 — Interpretador com pilha de chamadas P1 e P2 e limite de passos
**Próximo passo:** entregue.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/nucleo/interpretador.js
- **Critérios:** Retorno ao token seguinte; recursão funciona; para por vitória, parada manual ou limite de passos.
- **Verificação:** `node --check`; leitura de um caso de recursão.
- **Entrega:** fonte/src/nucleo/interpretador.js (pilha P1/P2, limite de passos, parada por vitória, fim, limite e chamadas sem ação) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** node --check sem erro; leitura contra REGRAS-JOGO.md seções 8 e 9 (passo só por ação primitiva, retorno ao slot seguinte, vitória a cada ação)

### #444.9 — Verificação de vitória (todas as luzes acesas)
**Próximo passo:** entregue.
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/nucleo/vitoria.js
- **Critérios:** Checada a cada passo executado.
- **Verificação:** `node --check`.
- **Entrega:** fonte/src/nucleo/vitoria.js (todasLuzesAcesas) por Claude Code (Haiku 5.5 · executor-leve; líder Sonnet 5.5) (local · main).
- **Verificação:** node --check sem erro; exports conferidos contra o contrato; revisão de leitura (JSDoc, nomes em português, sem style= inline)

### #444.10 — Desenho do mapa (grade isométrica em SVG)
**Próximo passo:** entregue.
- **Nível:** MEDIO — classificado (jev (confiança 0.88))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.88)
- **Arquivos:** fonte/src/interface/mapa.js
- **Critérios:** Blocos por altura, luzes azuis, abismo sem bloco; sem `style=` inline.
- **Verificação:** `node --check`; leitura.
- **Entrega:** fonte/src/interface/mapa.js (desenharMapa, atualizarLuzes, projetarCelula) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** node --check sem erro; exports conferidos contra o contrato; revisão de leitura (JSDoc, nomes em português, sem style= inline)

### #444.11 — Desenho e animação do robô (andar, pular, girar, acender)
**Próximo passo:** entregue.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/interface/robo-visual.js
- **Critérios:** Animação desligada com prefers-reduced-motion.
- **Verificação:** `node --check`.
- **Entrega:** fonte/src/interface/robo-visual.js (desenharRobo, animarAcao) por Claude Code (Sonnet 5.5) (local · main).
- **Verificação:** node --check sem erro; exports conferidos contra o contrato; revisão de leitura (JSDoc, nomes em português, sem style= inline)

### #444.12 — Paleta de comandos e áreas MAIN, PROC1 e PROC2 (clique para inserir e remover)
**Próximo passo:** depende da #444.11.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/interface/paleta.js
- **Critérios:** Respeita os slots e os comandos liberados do nível.
- **Verificação:** `node --check`.

### #444.13 — Controles: executar, passo a passo, parar, reiniciar, velocidade
**Próximo passo:** depende da #444.12.
- **Nível:** MEDIO — classificado (jev (confiança 0.80))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.80)
- **Arquivos:** fonte/src/interface/controles.js
- **Critérios:** Parar interrompe recursão infinita.
- **Verificação:** `node --check`.

### #444.14 — Seletor de níveis e progresso salvo
**Próximo passo:** depende da #444.13.
- **Nível:** MEDIO — classificado (jev (confiança 0.97))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.97)
- **Arquivos:** fonte/src/interface/seletor-niveis.js
- **Critérios:** Progresso só no navegador (localStorage com try/catch); nada no banco.
- **Verificação:** `node --check`.

### #444.15 — Tela de vitória e contagem de comandos usados
**Próximo passo:** depende da #444.14.
- **Nível:** MEDIO — classificado (jev (confiança 0.94))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.94)
- **Arquivos:** fonte/src/interface/vitoria-tela.js
- **Critérios:** Mostra comandos usados e limite; botão próximo nível.
- **Verificação:** `node --check`.

### #444.16 — CSS: tokens futuristas em :root e base (fundo, grade, tipografia)
**Próximo passo:** depende da #444.15.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/estilos/base.css
- **Critérios:** Orbitron e Share Tech Mono; neon ciano, magenta e violeta; contraste claro sobre escuro.
- **Verificação:** Leitura contra VISUAL-FUTURISTA.md.

### #444.17 — CSS: componentes (cartões holográficos, botões, slots, medidores de telemetria)
**Próximo passo:** depende da #444.16.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/estilos/componentes.css
- **Critérios:** Classes de responsabilidade única; modificadores BEM; sem !important desnecessário.
- **Verificação:** Leitura.

### #444.18 — CSS: mapa e robô
**Próximo passo:** depende da #444.17.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/estilos/mapa.css
- **Critérios:** Brilho neon nas luzes; animação com @keyframes.
- **Verificação:** Leitura.

### #444.19 — CSS: responsivo e acessibilidade (720 px, foco visível, reduced-motion)
**Próximo passo:** depende da #444.18.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/estilos/acessibilidade.css
- **Critérios:** 1 coluna até 720 px sem rolagem horizontal; outline magenta em :focus-visible.
- **Verificação:** Leitura.

### #444.20 — Fundo animado: rede de nós em SVG
**Próximo passo:** depende da #444.19.
- **Nível:** MEDIO — classificado (jev (confiança 0.94))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.94)
- **Arquivos:** fonte/src/interface/fundo.js + estilos
- **Critérios:** Linhas tracejadas e nós pulsando; desligado com reduced-motion.
- **Verificação:** `node --check`.

### #444.21 — main.js: montar tudo com injeção de dependências
**Próximo passo:** depende da #444.20.
- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** fonte/src/main.js
- **Critérios:** Núcleo sem DOM; interface recebe o núcleo por parâmetro.
- **Verificação:** `node --check`; nenhum arquivo > 1000 linhas e nenhuma função > 45.

### #444.22 — Build para ligthbot-versao-ia/ e conferência da saída
**Próximo passo:** depende da #444.21.
- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Arquivos:** ligthbot-versao-ia/index.html, assets/
- **Critérios:** `npm run build` sem erro; card da página de jogos abre o jogo.
- **Verificação:** `npm run build`.

### #444.23 — Orientação em docs/ (ORIENTACAO_JS_LIGHTBOT.md)
**Próximo passo:** depende da #444.22.
- **Nível:** LEVE — classificado (jev (confiança 0.98))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Arquivos:** docs/ORIENTACAO_JS_LIGHTBOT.md
- **Critérios:** Módulos, como rodar e como gerar o build.
- **Verificação:** Leitura.

### #444.24 — Conferência final e entrega (commit + push)
**Próximo passo:** depende da #444.23.
- **Nível:** LEVE — classificado (jev (confiança 0.91))
- **Modelo:** só Haiku 5.5 ou DeepSeek V4.1 Flash — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.91)
- **Arquivos:** pasta inteira
- **Critérios:** Sem node_modules versionado; `git diff --cached --name-only` limpo.
- **Verificação:** Comando de git.

