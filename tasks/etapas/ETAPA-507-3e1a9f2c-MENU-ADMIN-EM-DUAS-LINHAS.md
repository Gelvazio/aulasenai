## Etapa 507-3e1a9f2c — Menu do Professor Administrador em duas linhas (metade em cima, metade embaixo)

**Tarefa:** #358-3e1a9f2c-5f77-4d2e-9c4b-1a2f8e6d0c31 · **Pedido em:** 2026-10-24 18:50 · **Criada por:** Devin (líder · local · main)
**Pedido:** "crie 2 linha aqui, pra por metade em cima e metade embaixo dos menus" (print do header: Início, USUARIOS, RELATORIOS, ALUNOS, CORREÇÃO, TURMAS, CURSO, PENDÊNCIAS, Matérias Pendentes, EQUIPES, Regras)
**Objetivo:** o menu do Professor Administrador (`header-usuario__menu`) fica em 2 linhas de propósito — primeira metade dos itens em cima, segunda metade embaixo — em vez de quebrar só pela largura (`flex-wrap`).

### Escopo (plano — tarefa pequena, sem aprovação prévia)

**Entra**
- `js/header-usuario.js`: ao montar os itens do administrador, dividir a lista ao meio (primeira metade + resto) e agrupar cada metade numa linha própria (ex.: `<div class="header-usuario__menu-linha">` por metade) — incluindo o botão EQUIPES e o link Regras na segunda linha.
- `assets/css/header-usuario.css`: estilizar a linha do menu (`display: flex; flex-wrap: wrap; gap`) e o container como coluna; sem quebrar o celular (`celular.css` já flex-wrap; garantir que não haja overflow horizontal).
- Registro no quadro e commit + push na `main`.

**Não entra**: mudar os itens, rotas ou rótulos; mexer no que aparece para outros professores; tocar em `celular.css` além do necessário; banco de dados.

### Subtarefas

- **#358.1 — Dividir o menu do administrador em 2 linhas (JS + CSS do header)**
  - **Arquivos:** `js/header-usuario.js`, `assets/css/header-usuario.css`
  - **Critérios:** itens do `MENU_ADMINISTRADOR_HEADER` + EQUIPES + Regras renderizam em 2 linhas (metade/metade); o menu continua só do Professor Administrador (RPC) e os links abrem em nova aba; nomes em português, JSDoc, funções ≤ 45 linhas, linhas ≤ 100 caracteres; sem overflow horizontal; mobile segue quebrando normalmente.
  - **Nível:** PESADO (Jev, confiança 0,18 — baixa; mantido por segurança porque toca o header de todas as páginas)
  - **Entrega:** `js/header-usuario.js` (lista única de itens, EQUIPES antes do Regras, `montarLinhasMenuHeader` divide ao meio em 2 `.header-usuario__menu-linha`) e `assets/css/header-usuario.css` (menu em coluna + classe de linha). Executor-pesado (Sonnet); correções finais do líder (código corrompido removido, `catch` restaurado, linhas > 100).
  - **Verificação:** `node --check` ok; DOM falso em Node: 2 linhas de 5 itens cada (USUARIOS…TURMAS / CURSO…Regras, EQUIPES antes de Regras); menu só após RPC; links `target="_blank"` mantidos.

- **#358.2 — Links do menu menos redondos e centralizados**
  - **Arquivos:** `assets/css/header-usuario.css`
  - **Critérios:** `.header-usuario__menu-link` com `border-radius` menor (de 16 px para 8 px); linhas do menu centralizadas (`justify-content: center`); mobile sem overflow.
  - **Nível:** LEVE (Jev, confiança 0,77)
  - **Entrega:** `assets/css/header-usuario.css` — `border-radius` de 16 para 4 px (reforço: pedido repetido), menu com `flex: 1` ocupando o espaço livre da barra, `justify-content: center` nas linhas e `text-align: center` nos links, `justify-content: center` nas linhas e `text-align: center` nos links. Devin (LEVE).
- **Verificação:** linhas ≤ 100; `node --check` do JS ok; flex-wrap mantido no mobile.

### Registro

| Data | Evento |
|------|--------|
| 2026-10-24 | TASK criada e publicada por Devin (líder); nível PESADO pelo Jev (conf. 0,18) → executor-pesado. |
