# Botão ENTRAR e barra do usuário logado em todas as páginas

- **Criado em:** 2026-09-29
- **Status:** ✅ Concluído (2026-09-29)
- **Objetivo:** (1) `index.html` ganha o botão **ENTRAR**; (2) toda página do site mostra, no
  topo, o usuário logado (nome, perfil e botão Sair).
- **Tecnologias:** JavaScript puro, CSS, Supabase Auth (supabase-js v2 já usado em `js/login.js`),
  Python (geradores existentes).
- **Riscos:** ~111 páginas HTML; parte é gerada (índices, atividades) e parte é feita à mão. Páginas
  geradas devem ser alteradas pelo gerador, senão a próxima geração apaga a mudança.
- **Dependências:** `js/supabase.js` (cliente compartilhado), `js/login.js`, `login.html`,
  `docs/ORIENTACAO_JS_LOGIN.md`, `docs/ORIENTACAO_USUARIO.md`.

## Solução proposta (um único módulo reutilizável)

| Arquivo | Ação |
|---|---|
| `assets/js/barra-usuario.js` | Novo. Lê a sessão do Supabase Auth; logado → barra fixa no topo com "👤 nome · perfil" e botão **Sair**; deslogado → botão **ENTRAR** (vai a `login.html?voltar=<página atual>`). Carrega o supabase-js do CDN se a página ainda não tiver. |
| `assets/css/barra-usuario.css` | Novo. Estilo da barra (usa as cores SENAI, funciona no tema das páginas). |
| `assets/gerador-menu/tags_menu.py` (ou módulo irmão) | Passa a incluir as tags da barra, para os 3 geradores (índices, atividades, atividade-excel). |
| Páginas já existentes | Script único que insere as tags da barra no `<head>` das páginas que ainda não têm (idempotente). |

## Passos

| # | Passo | Status |
|---|---|---|
| 1 | Criar `assets/js/barra-usuario.js` e `assets/css/barra-usuario.css` | ✅ Concluído |
| 2 | Incluir as tags nos geradores e regenerar `index.html` (raiz) e demais índices | ✅ Concluído |
| 3 | Inserir as tags nas páginas existentes (feitas à mão) com script idempotente | ✅ Concluído |
| 4 | Conferir sintaxe (`node --check`) e contagem de páginas alteradas | ✅ Concluído |
| 5 | Atualizar `CLAUDE.md` (lista de `assets/`) | ✅ Concluído |

## Decisões que dependem do usuário

1. Abrangência: **todas** as ~111 páginas ou só as que já usam login/atividades e os índices?
2. Páginas em `scripts/` (ferramentas locais como `criarUsuariosBancoDados.html`) ficam de fora?
3. A barra deslogada mostra só o botão ENTRAR (sem bloquear o acesso às páginas)?

## Resultado

`js/header-usuario.js` genérico; header aplicado em 100 páginas (index.html raiz + MATERIAIS) por `assets/gerador-menu/tags_header.py`; os 3 geradores passaram a inserir o header. Escopo definido pelo usuário: todos os HTML de MATERIAIS (+ index.html da raiz).
