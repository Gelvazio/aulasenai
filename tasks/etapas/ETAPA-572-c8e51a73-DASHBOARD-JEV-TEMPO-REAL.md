## Etapa 572-c8e51a73 — #425: Dashboard em tempo real das chamadas do Jev (visual futurista)

**Tarefa:** #425-c8e51a73 · **Pedido em:** 2026-10-27 21:00 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "leia a pasta rules-local\jev e crie um dashboard em tempo real, com as chamadas do JEV em rules-local\jev\dashboard.html, e use visual futurista" (prompt de visual: `C:\fontes\rules-ai\prompts\VISUAL-FUTURISTA.md`).
**Objetivo:** uma página que mostre ao vivo as chamadas do Jev deste projeto (latência, tokens, custo, erros, nível e decisão das mensagens), em estética cyberpunk.

**Análise (leitura da pasta e dos logs):**
- `rules-local/jev/saidas/chamadas.jsonl` (uma linha por chamada à API: data, ação, modelo, tokens, custo, latência, situação, erro) e `saidas/mensagens-AAAA-MM.jsonl` (uma linha por mensagem: projeto, decisão jev/matriz/sinais, nível, confiança, ação). Ambos ficam fora do Git e **sem texto das mensagens** (só metadados).
- Aberta por `file://` o navegador bloqueia `fetch`; por servidor local (Live Server, porta 5501) o `fetch` com atualização periódica funciona. Para `file://` o painel oferece "Conectar pasta saídas" (File System Access API).
- Pedido acrescentado no meio do trabalho (2026-10-27): "coloque as tarefas em formas de cards, sendo classificadas em tempo real e mudando ao vivo". Fonte: `tasks/STATUS.md` (formato simplificado: mãe `- #ID — [título](etapa) · status · reserva` e subtarefas `  - #ID.n — título · status · \`NÍVEL · effort\` · só <modelo> · reserva`), lida pelo mesmo servidor (`../../tasks/STATUS.md`).
- `rules-local/` é gerada pelo script de sessão; os 3 arquivos novos do painel não estão na tabela da `VERSAO.md`, então não são regravados nem apagados pela sincronização (ordem expressa do usuário de criar o arquivo nesta pasta).

### Escopo

- **Entra:** `rules-local/jev/dashboard.html`, `dashboard.css` e `dashboard.js` (HTML, CSS e JS separados); painéis: indicadores (chamadas, custo, latência média e p95, tokens, erros), chamadas por hora, latência ao vivo, distribuição de nível e de decisão, confiança, rede de nós animada, terminais com as últimas chamadas e mensagens; **as tarefas do quadro (`tasks/STATUS.md`) em forma de cards**, agrupadas por nível classificado (LEVE, MEDIO, PESADO e "a classificar pelo Jev"), com status, modelo e reserva, que mudam ao vivo (a leitura do quadro se repete e o card que mudou de coluna, status ou reserva pisca); filtros Hoje / 24 h / Tudo; pausar; atualização a cada 3 s; sem libs externas além das fontes (Orbitron e Share Tech Mono); animações desligam com `prefers-reduced-motion`.
- **Não entra:** ler texto das mensagens (não existe no log), gravar nada no banco, subir servidor, alterar o Jev.

### Critério de pronto

- `node --check` no JS; lendo o código, o painel lê as duas fontes, agrega e redesenha a cada 3 s; layout de 1 coluna até 720 px; foco visível.
- Conferir na tela só o usuário (sem navegador).

### Decisões

- 2026-10-27 (Sonnet, C52): nível e modelo classificados pelo Jev.

---

### #425.1 — Criar o dashboard do Jev (HTML, CSS e JS)

**Próximo passo:** (entregue) — nada; o usuário confirma na tela.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** conforme o escopo acima.
- **Critérios de Aceitação:** `dashboard.html` abre no Live Server e mostra os indicadores e os terminais com as chamadas reais, atualizando sozinho.
- **Entrega:** `rules-local/jev/dashboard.html`, `dashboard.css`, `dashboard-dados.js`, `dashboard-fonte.js`, `dashboard-tela.js`, `dashboard-cartoes.js` e `dashboard.js` (feitos em paralelo por 3 agentes executor-medio: HTML+CSS, tela, fonte+orquestração; dados e revisão pelo executor principal) · **Verificação:** `node --check` ok nos 5 JS; teste de fumaça em Node dos agregadores com os logs reais (617 chamadas, 809 mensagens, quadro com 56 subtarefas abertas por nível); conferência de que todos os ids usados pelo JS existem no HTML; sem `style`/`onclick` inline; o visual e o tempo real só o usuário confirma na tela (sem navegador): abrir `http://127.0.0.1:5501/rules-local/jev/dashboard.html` pelo Live Server.
