> Etapa movida do `tasks/STATUS.md` em 2026-10-09 (texto sem alteração; links relativos ajustados à pasta). Índice e estado geral: [../STATUS.md](../STATUS.md).

## Etapa 111 — Sessão obrigatória em todas as páginas HTML (pedido em 2026-10-09 00:23; aprovada em 2026-10-09 00:28)

Plano: [docs/validacao-sessao-todas-paginas.md](docs/validacao-sessao-todas-paginas.md). Regra: `CLAUDE.md` → "SESSÃO OBRIGATÓRIA EM TODAS AS PÁGINAS".

| Item | Descrição | Status | Concluído em | Verificação |
|------|-----------|--------|--------------|-------------|
| 111.1 | Regra no `CLAUDE.md` e no `docs/HISTORICO-REGRAS.md`: sem login nada carrega e vai para o `index.html` (exceções: `index.html` e `login.html` da raiz) | ✅ Concluído | 2026-10-09 00:27 | Leitura |
| 111.2 | Guarda de sessão no `js/header-usuario.js` (página oculta + modal "Aguarde, carregando..." com `assets/img/carregando.gif`; sem sessão → `window.stop()` e `index.html`) + CSS em `assets/css/header-usuario.css` | ✅ Concluído | 2026-10-09 00:33 | `node --check` |
| 111.3 | `assets/gerador-menu/tags_header.py`: tag do header como primeiro script do `<head>`, sem `defer`, em todos os `.html` (menos `login.html`, `.claude/`, templates e app do WhatsApp) | ✅ Concluído | 2026-10-09 00:33 | 2ª execução = 0 alteradas |
| 111.4 | Aplicado nas 257 páginas | ✅ Concluído | 2026-10-09 00:33 | Nenhum `header-usuario.js" defer` restante |
| 111.5 | Aceite do usuário (abrir uma página sem login → modal e `index.html`; com login → página normal) | ⬜ Pendente | — | — |
