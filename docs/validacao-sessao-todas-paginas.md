# Validação de sessão em todas as páginas HTML

- **Criado em:** 2026-10-09 00:25:00 (horário de Brasília)
- **Aprovado em:** 2026-10-09 00:28 (usuário escolheu a "Opção A" + modal "Aguarde, carregando..." com GIF)
- **Concluído em:** 2026-10-09 00:33
- **Tempo decorrido:** cerca de 10 minutos
- **Etapa no `STATUS.md`:** Etapa 111
- **Regra:** `CLAUDE.md` → "SESSÃO OBRIGATÓRIA EM TODAS AS PÁGINAS (SEM LOGIN, NADA CARREGA)"

## Objetivo

Sem usuário logado, nenhuma página do site mostra conteúdo: ela fica oculta e vai direto para o
`index.html` da raiz. As únicas páginas públicas são o `index.html` da raiz (apresentação do
professor e botão de entrar) e o `login.html`.

## Escopo

- **Entra:** o guarda de sessão dentro do `js/header-usuario.js`; o modal "Aguarde, carregando..."
  com o GIF `assets/img/carregando.gif`; a tag do header como **primeiro script do `<head>`, sem
  `defer`**, em todos os `.html` do projeto; o `tags_header.py`, para os geradores já porem a tag
  no lugar certo.
- **Não entra:** proteção no servidor (a Vercel serve arquivos estáticos e a sessão do Supabase
  fica no `localStorage`); `login.html`; a pasta `.claude/`; os templates dos geradores (a tag entra
  ao gerar); o app `MATERIAIS/AGENDA_COLABORADOR/AUTOMATIZACAO-WHATSAPP/` (tem servidor próprio).
- **Critério de pronto:** todo `.html` publicado carrega o `js/header-usuario.js` no início do
  `<head>`, sem `defer`; rodar o `tags_header.py` de novo não muda nada; `node --check` sem erro.

## Como funciona

1. O `js/header-usuario.js` é lido antes de tudo (primeiro script do `<head>`, sem `defer`).
2. Página pública (index/login da raiz) passa direto, como antes.
3. Nas demais, ele **esconde a página** (`visibility: hidden` no `<html>`) e mostra o modal
   "Aguarde, carregando..." com o GIF (fora do `<body>`, com `visibility` própria).
4. Lê a sessão gravada pelo Supabase (`localStorage`, chave `sb-<ref>-auth-token`). Sem sessão
   (ou vencida sem `refresh_token`): `window.stop()` + `location.replace(index.html)` — nada mais
   carrega.
5. Com sessão: no `DOMContentLoaded`, confirma no Supabase Auth (`getSession`, renova o token).
   Sem usuário → `index.html`; com usuário → tira o modal, mostra a página e desenha o header.

## Passos

| # | Ação | Arquivos | Verificação | Status |
|---|------|----------|-------------|--------|
| 1 | Regra no `CLAUDE.md` + histórico | `CLAUDE.md`, `docs/HISTORICO-REGRAS.md` | leitura | ✅ Concluído |
| 2 | GIF de carregamento (cores SENAI) | `assets/img/carregando.gif` | arquivo aberto e conferido | ✅ Concluído |
| 3 | Guarda de sessão + modal | `js/header-usuario.js`, `assets/css/header-usuario.css` | `node --check` | ✅ Concluído |
| 4 | Tag no início do `<head>`, sem `defer`, e todos os `.html` | `assets/gerador-menu/tags_header.py` | `python -m py_compile`; 2ª execução = 0 alteradas | ✅ Concluído |
| 5 | Aplicar em todas as páginas (257) | `*.html` | busca por `header-usuario.js" defer` = 0 | ✅ Concluído |
| 6 | Aceite do usuário (testar no navegador sem e com login) | — | — | ⬜ Pendente |

## Riscos

| Risco | Plano B |
|-------|---------|
| Proteção só no navegador: o `.html` ainda pode ser baixado direto pelo endereço | Gabarito e dado sensível continuam proibidos nos arquivos publicados; dados protegidos pelo RLS |
| Falha ao carregar a biblioteca do Supabase (CDN) manda o usuário logado para o `index.html` | Recarregar a página; é o comportamento seguro (falha fechada) |
| Página aberta direto do disco (`file://`) sem login no mesmo endereço vai para o `index.html` | Usar o site publicado ou entrar pelo `login.html` local |
| Páginas sem o `<div id="header-usuario">` ganharam a barra do header | Era o padrão das demais páginas |

## Resultado

- 257 páginas com o guarda no início do `<head>`; o `login.html` ficou de fora.
- Geradores (`gerar_atividades`, `gerar_avaliacao_discursiva`, `gerar_apostila`,
  `gerar_avaliacao_media_final`, `gerar_atividade_excel`, `gerar_indices`) usam o
  `tags_header.py` e já geram as páginas com o guarda.
- Teste visual no navegador: com o usuário (regra "nunca abrir navegador").
