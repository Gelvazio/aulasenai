## Etapa 481-5d2b8e47 — index.html exige login

**Tarefa:** #352-5d2b8e47 · **Pedido em:** 2026-10-23 09:20 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "no index.html (http://127.0.0.1:5501/index.html), se nao estiver logado, redirecione direto para login.html"
**Objetivo:** quem abrir o `index.html` sem sessão vai direto para o `login.html` (e volta ao index depois de entrar).

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-23 09:20 | Nível PESADO (login/guarda de sessão); Sonnet pode (C48). Pedido pontual de 1 arquivo, sem banco: executado sem plano separado | Claude Code (Sonnet 5.5) | `niveis.md`, `ciclo-da-task.md` |
| 2026-10-23 09:20 | Reaproveitar a guarda de sessão do `js/header-usuario.js` (já é o 1º script do index): tirar o index da lista de páginas públicas e mandar quem está sem sessão para `login.html?voltar=` | Claude Code (Sonnet 5.5) | uma guarda só, sem script novo |

### #352.1 — Guarda de sessão leva ao login.html

**Próximo passo:** editar `js/header-usuario.js` (lista de páginas públicas e destino do redirecionamento) e `docs/ORIENTACAO_JS_LOGIN.md`.

- **Nível:** PESADO — login e guarda de sessão
- **Modelo:** só Sonnet — nunca outro (C48: Sonnet pega PESADO)
- **Critérios de aceitação:** `index.html` sem sessão redireciona para `login.html?voltar=index.html`; páginas protegidas também vão ao login; `login.html` continua público; sem laço de redirecionamento; `node --check`.
- **Entrega:** — · **Verificação:** —
