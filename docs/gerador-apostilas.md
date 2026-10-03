# Gerador de Apostilas (piloto: Introdução à TIC)

**Objetivo:** criar um gerador reutilizável que monta a apostila HTML (com exportação PDF) de
qualquer matéria a partir das aulas, e gerar a primeira apostila para Introdução à TIC (ITIC).

**Tech Stack:** Python 3.14 (`markdown` 3.10), HTML5, CSS3 (impressão), JavaScript Vanilla.

**Criado em:** 2026-10-03 13:55
**Concluído em:** — (piloto em andamento)
**Tempo decorrido:** —

**Regra registrada:** seção `## 📘 REGRAS APOSTILAS` do `CLAUDE.md` da raiz.

---

## Escopo (decisões do usuário, 2026-10-03)

| Item | Decisão |
|---|---|
| Fonte | Aulas da matéria (`CONTEUDO/N-*.md` gerados dos slides) + `EMENTA-CHALKIE-AI.md` |
| Saída | HTML único + botão Exportar PDF |
| Capítulo | Capacidades · Teoria + exemplos · Vídeos YouTube ≤ 15 min · Exercícios ITEM · Resumo · Glossário |
| Piloto | `MATERIAIS/ASSISTENTE-DE-OPERACOES-LOGISTICAS/INTRODUCAO-TIC` (10 aulas → 10 capítulos) |

## Arquivos previstos

| Arquivo | Ação |
|---|---|
| `assets/gerador-apostilas/gerar_apostila.py` | Criar — lê fontes, valida, gera HTML (funções ≤ 45 linhas) |
| `assets/gerador-apostilas/template_apostila.html` | Criar — capa, sumário, `{{CAPITULOS}}`, glossário |
| `assets/css/apostila.css` | Criar — layout, caixas (resumo, vídeo, ITEM), `@media print` |
| `assets/js/apostila.js` | Criar — botão Exportar PDF (`window.print`), sumário ativo |
| `<ITIC>/APOSTILA/CONTEUDO/CAPITULO-01.md` … `-10.md` | Criar — um por aula, um por vez |
| `<ITIC>/APOSTILA/APOSTILA-INTRODUCAO-TIC.html` | Gerado |
| `<ITIC>/APOSTILA/STATUS-APOSTILA.md` | Criar — controle por capítulo |
| `<ITIC>/ATIVIDADES/MENU-ATIVIDADES.js` | Modificar — item "📘 Apostila" |
| `CLAUDE.md` | ✅ seção REGRAS APOSTILAS + registro no mapa de `assets/` |

## Formato da fonte `CAPITULO-NN.md`

```markdown
# Capítulo 01 — Comunicação Profissional e Seus Fundamentos
- **Aula:** 01
- **Capacidade:** C1

## Teoria
(texto com exemplos do almoxarifado/expedição fictícios; Markdown livre, tabelas permitidas)

## Vídeos
- [Elementos da comunicação](https://www.youtube.com/watch?v=XXXX) — 08:30 — Canal

## Exercícios
### ITEM 1
- **Capacidade:** C1
- **Contexto:** ...
- **Comando:** ...

## Resumo
- tópico 1 ...

## Glossário
- **Ruído:** interferência que ...
```

## Riscos e dependências

- ⚠️ **Vídeos:** o Claude não abre navegador; os vídeos serão buscados por pesquisa na web
  (WebSearch, sem navegador) e a duração anotada na fonte. Link/duração podem mudar ou estar
  errados → coluna "Vídeos conferidos pelo professor" no status; o professor confere antes de
  divulgar. Se preferir, o professor indica os vídeos.
- ⚠️ Tamanho: 10 capítulos ≈ 150–200 KB de HTML (aceitável).
- ⚠️ PDF pela impressão do navegador ("Salvar como PDF"): os iframes do YouTube são ocultados e
  aparece o link escrito.
- ✅ Sem banco de dados, sem login (apostila de leitura livre), sem gabarito.
- ⛔ Não escrever testes automatizados (regra global). Validação: `py_compile`, `node --check`,
  e conferência por script (5 partes por capítulo, vídeos ≤ 15:00).

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|---|---|---|---|---|---|
| 1 | Regra REGRAS APOSTILAS no `CLAUDE.md` | ✅ Concluído | 2026-10-03 13:55 | 2026-10-03 13:55 | 00:30 |
| 2 | `assets/css/apostila.css` + `assets/js/apostila.js` | ✅ Concluído | 2026-10-03 13:55 | 2026-10-03 14:30 | — |
| 3 | Template + `gerar_apostila.py` (parse, validação, HTML) | ✅ Concluído | 2026-10-03 13:55 | 2026-10-03 15:00 | — |
| 4 | `STATUS-APOSTILA.md` da ITIC | ✅ Concluído | 2026-10-03 13:55 | 2026-10-03 14:40 | — |
| 5 | Capítulos 01 a 10 — um por vez (fonte → gerar → conferir → status) | 🔄 Em progresso — capítulo 01 aguardando validação; 02 e 03 em rascunho | 2026-10-03 13:55 | — | — |
| 6 | Item "Apostila" no `MENU-ATIVIDADES.js` + mapa de `assets/` no `CLAUDE.md` | ✅ Concluído | 2026-10-03 13:55 | 2026-10-03 14:40 | — |
| 7 | Conferência final (`py_compile`, `node --check`, script de conferência) | ✅ Concluído (py_compile, node --check, conferência por script) | 2026-10-03 13:55 | 2026-10-03 15:45 | — |
| 8 | Commit local (sem push) + `graphify update .` | ✅ Concluído (commit único com a migração para materia.json) | 2026-10-03 13:55 | 2026-10-03 15:50 | — |

---

### Passo 2: CSS e JS da apostila
**Status:** ⬜ Pendente · **Arquivos:** `assets/css/apostila.css`, `assets/js/apostila.js`
**Ação:** tokens em `:root` (cores SENAI #004384), classes `.capa-apostila`, `.sumario`,
`.capitulo`, `.caixa-video`, `.caixa-resumo`, `.exercicio-box` (padrão ITEM), `.glossario`;
`@media print` com `page-break-before` por capítulo e ocultando iframes/botões. JS: liga o botão
`#botao-exportar-pdf` a `window.print()` e destaca no sumário o capítulo visível.
**Verificação:** `node --check assets/js/apostila.js`

### Passo 3: Gerador
**Status:** ⬜ Pendente · **Arquivos:** `assets/gerador-apostilas/gerar_apostila.py`, `template_apostila.html`
**Ação:** ler `ATIVIDADES/atividades.json`; ler `APOSTILA/CONTEUDO/CAPITULO-*.md`; separar as
seções (`## Teoria`, `## Vídeos`, `## Exercícios`, `## Resumo`, `## Glossário`); recusar capítulo
sem alguma seção, vídeo sem duração ou > 15:00, capacidade inexistente; converter Markdown com
`markdown` (extensões `tables`); montar ITEMs no padrão do `CLAUDE.md`; quadro de capacidades
via `capacidades.py`; glossário consolidado em ordem alfabética; inserir header/menu.
**Verificação:** `C:\Python314\python.exe -m py_compile assets\gerador-apostilas\gerar_apostila.py`

### Passo 4: STATUS-APOSTILA.md
**Status:** ⬜ Pendente · Colunas: Capítulo · Tema · Teoria · Vídeos · Exercícios · Resumo ·
Glossário · Gerado · Vídeos conferidos pelo professor.

### Passo 5: Capítulos 01–10 (um por vez)
**Status:** ⬜ Pendente · Para cada aula: escrever `CAPITULO-NN.md` a partir de
`CONTEUDO/NN-*.md` + ementa (5 exercícios ITEM, 1–3 vídeos ≤ 15 min, resumo, 5+ termos) →
`gerar_apostila.py <ITIC> --capitulo=NN` → conferir → marcar ✅ no status.
**Verificação:** saída do gerador sem erros e contagem de seções por capítulo.

### Passo 6: Menu e registro
**Status:** ⬜ Pendente · Acrescentar `{ rotulo: "📘 Apostila", link: "../APOSTILA/APOSTILA-INTRODUCAO-TIC.html" }`.

### Passo 7: Conferência final
**Status:** ⬜ Pendente · `py_compile`, `node --check`, gerador completo sem erros.

### Passo 8: Commit
**Status:** ⬜ Pendente · `git add` só dos arquivos da tarefa; conferir `git diff --cached --name-only`.

---

## Mudanças pedidas durante a validação (2026-10-03)

- Tema SESI SENAI (`GERADOR-AULAS/TEMA-SENAI.png`); páginas em cards A4; PDF uma página por card
  (`@page` margem 0, sem o endereço do navegador).
- Sumário detalhado com número de página, introdução, todas as capacidades, glossário no início,
  resumo antes dos exercícios, exercícios em páginas próprias com "Exportar PDF".
- Mínimo de 5 exercícios por capítulo; vídeos como miniatura + link.
- Markdown completo `<MATERIA>/APOSTILA/APOSTILA-<MATERIA>.md` (`--markdown`, `--forcar`).
- Dados da matéria no arquivo único `<MATERIA>/materia.json` (ver `docs/arquivo-unico-materia-json.md`)
  e conferência de cobertura da ementa por capítulo.
