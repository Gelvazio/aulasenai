# Criar menu em `js/menu.js` para as páginas de atividades

**Criado em:** 2026-09-27 19:05
**Concluído em:** 2026-09-27 19:40
**Tempo decorrido:** ~35 min
**Status geral:** ✅ Concluído

---

## 1. Objetivo

Criar um menu de navegação em JavaScript (`C:\fontes\aulasenai\js\menu.js`) e aplicá-lo no
**cabeçalho** (`<header>`) de todos os HTML de duas pastas `ATIVIDADES/`:

| Pasta | HTML |
|---|---|
| `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/` | 14: 2 capas Excel + 12 questões |
| `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC/ATIVIDADES/` | 14: `index.html`, 10 atividades de 50 questões e 3 da pasta `ATIVIDADES-AULA-23-09-2026/` |

O menu é uma barra no topo do `<header>`: links diretos e grupos com submenu. A página atual
aparece destacada, no celular a barra vira um botão ☰, e o menu não sai na impressão/PDF.

## 2. Decisões técnicas

- **Local do JS:** `js/menu.js`, por pedido do usuário (exceção à regra de `assets/js/`,
  registrada no `CLAUDE.md`).
- **Sem dados fixos no JS:** cada pasta `ATIVIDADES/` tem seu `MENU-ATIVIDADES.js` com
  `window.MENU_ATIVIDADES = { titulo, itens: [...] }`. Um item é `{ rotulo, link }` ou
  `{ rotulo, subitens: [...] }`.
- **Links relativos à pasta do arquivo de dados:** o `menu.js` localiza a tag
  `<script src=".../MENU-ATIVIDADES.js">` e resolve os links a partir dela. Assim funciona em
  qualquer nível de subpasta, inclusive abrindo por `file://`.
- **CSS:** `assets/css/menu.css` com tokens próprios em `:root`, porque cada página usa um CSS
  diferente.
- **Geradores:** os três geradores passam a incluir as tags quando existir `MENU-ATIVIDADES.js`
  na pasta `ATIVIDADES/`:
  - `gerador-atividade-excel`
  - `gerador-atividades` (template + índice)
  - `gerador-indices`
- As 3 páginas da pasta `ATIVIDADES-AULA-23-09-2026/` têm `<style>`/`<script>`/`onclick`
  embutidos (legado). Elas só **recebem as tags do menu**; a refatoração delas fica fora do
  escopo.

## 3. Arquivos previstos

| Arquivo | Ação |
|---|---|
| `js/menu.js` | Criar |
| `assets/css/menu.css` | Criar |
| `.../ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/MENU-ATIVIDADES.js` | Criar (dados) |
| `.../INTRODUCAO-TIC/ATIVIDADES/MENU-ATIVIDADES.js` | Criar (dados) |
| 28 HTML das duas pastas | Inserir 3 tags antes de `</head>` |
| `assets/gerador-atividade-excel/gerar_atividade_excel.py` | Incluir tags do menu |
| `assets/gerador-atividades/gerar_atividades.py` + `template_atividade.html` | Incluir tags do menu |
| `assets/gerador-indices/gerar_indices.py` | Incluir tags do menu |
| `CLAUDE.md` | Registrar `menu.js`, `menu.css` e `MENU-ATIVIDADES.js` |

## 4. Riscos

- Atividade nova numa pasta precisa ser acrescentada ao `MENU-ATIVIDADES.js` da pasta.
- Gerar as páginas com geradores antigos apagaria as tags. Isso é mitigado pelos passos 5 a 7.

## 5. Passos

| # | Passo | Arquivo(s) | Verificação | Status |
|---|---|---|---|---|
| 1 | Criar os 2 arquivos de dados do menu | `MENU-ATIVIDADES.js` (2 pastas) | `node --check`; links conferidos | ✅ Concluído |
| 2 | Criar `menu.js` | `js/menu.js` | `node --check` | ✅ Concluído |
| 3 | Criar `menu.css` | `assets/css/menu.css` | Revisão | ✅ Concluído |
| 4 | Inserir as tags nos 28 HTML | 28 HTML | `grep -l js/menu.js` = 28 | ✅ Concluído |
| 5 | Gerador Excel | `gerar_atividade_excel.py` | `py_compile` | ✅ Concluído |
| 6 | Gerador de atividades de 50 questões | `gerar_atividades.py`, `template_atividade.html` | `py_compile` | ✅ Concluído |
| 7 | Gerador de índices | `gerar_indices.py` | `py_compile` | ✅ Concluído |
| 8 | Registrar no `CLAUDE.md` | `CLAUDE.md` | Leitura | ✅ Concluído |
| 9 | Commit local (sem push) + `graphify update .` | — | `git log -1` | ✅ Concluído |

## 6. Resultado final

**Ajuste pedido depois (2026-09-27):** menu também em
`MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/index.html`
(índice da matéria), com um `MENU-ATIVIDADES.js` próprio (links para as atividades Excel). As
páginas Excel ganharam o item "📚 Índice" apontando para esse índice. Os dois arquivos de dados
precisam ser mantidos em sincronia.

- `js/menu.js`, `assets/css/menu.css` e dois `MENU-ATIVIDADES.js` criados; `node --check` sem erros.
- Tags aplicadas nos 28 HTML: o `git diff` mostra 84 inserções (3 por página) e nenhuma remoção.
- Novo helper `assets/gerador-menu/tags_menu.py`, usado pelos 3 geradores. Todos compilam e geram
  as mesmas tags que foram aplicadas às páginas.
- Pendência: as 3 páginas legadas de `ATIVIDADES-AULA-23-09-2026/` continuam com
  `<style>`/`<script>` embutidos (fora do escopo).
