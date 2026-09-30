# Criar Material — Ferramentas de BI / Looker Studio

**Objetivo:** Criar pasta `FERRAMENTAS-DE-BI/LOOKER-STUDIO` com guia de uso (CLAUDE.md), página de exemplos interativos (index.html) e scripts JS modulares e documentados.

**Tech Stack:** Markdown + HTML5/CSS3 + JavaScript (Chart.js via CDN)

**Criado em:** 2026-09-22
**Concluído em:** 2026-09-22

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em |
|-------|-----------|--------|-----------|--------------|
| 1 | Criar `FERRAMENTAS-DE-BI/LOOKER-STUDIO/CLAUDE.md` com passo a passo de uso do Looker Studio | ✅ Concluído | 2026-09-22 | 2026-09-22 |
| 2 | Criar `FERRAMENTAS-DE-BI/LOOKER-STUDIO/index.html` com exemplos de dashboards visuais | ✅ Concluído | 2026-09-22 | 2026-09-22 |
| 3 | Criar `FERRAMENTAS-DE-BI/LOOKER-STUDIO/js/` com scripts modulares (≤200 linhas/arquivo, ≤30 linhas/método, documentados) | ✅ Concluído | 2026-09-22 | 2026-09-22 |

---

### Passo 1: CLAUDE.md

**Arquivo:** `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/FERRAMENTAS-DE-BI/LOOKER-STUDIO/CLAUDE.md`

**Ação:** Guia com: o que é o Looker Studio, criação de conta (Google, sem exigência corporativa), conexão de fonte de dados, criação de gráficos, filtros/controles, KPIs, compartilhamento/publicação, boas práticas.

---

### Passo 2: index.html

**Arquivo:** `.../LOOKER-STUDIO/index.html`

**Ação:** Página com explicação + dashboard interativo de exemplo (KPIs, gráfico de barras, linha e pizza, filtro por categoria), no padrão visual SENAI, usando Chart.js.

---

### Passo 3: js/

**Arquivo:** `.../LOOKER-STUDIO/js/dados-exemplo.js`, `graficos.js`, `kpis.js`, `filtros.js`, `main.js`

**Ação:** Cada arquivo documentado com JSDoc, máx. 200 linhas por arquivo e 30 linhas por função.

**Verificação:**
```bash
wc -l js/*.js
```
Esperado: todos ≤ 200 linhas.

---
