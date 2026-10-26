# ETAPA 542 — Link "Painel Professor" no menu

- **TASK:** #397 (pedida em 2026-10-26) · **Nível:** `LEVE` (sugestão do Jev, confiança 0,82; só Haiku 5.5 ou DeepSeek V4.1 Flash)

## Pedido

"coloque o link no menu de nome *Painel Professor*" — o `painel-professor.html` não tem link em nenhum menu.

## Itens

| Item | Descrição | Status |
|---|---|---|
| 397.1 | Acrescentar o item **Painel Professor** (abre `painel-professor.html`) no menu do perfil Professor, junto do item **Regras** (`js/header-usuario.js`); aparece só para o professor | ✅ 2026-10-26 |

**Entrega:** item `{ rotulo: "Painel Professor", rota: "../painel-professor.html" }` acrescentado em
`MENU_ADMINISTRADOR_HEADER` (`js/header-usuario.js`), logo antes do item **Regras** — mesmo padrão
(rota relativa à raiz, abre em nova aba). `node --check js/header-usuario.js` OK.
