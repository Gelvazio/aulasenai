# Bug: `Chart is not defined` no exemplo do Looker Studio

**Criado em:** 2026-09-22
**Concluído em:** 2026-09-22
**Tempo decorrido:** ~5 min

## Sintoma
```
Uncaught ReferenceError: Chart is not defined
    at criarGraficoBarras (graficos.js:66:38)
favicon.ico:1 Failed to load resource: 404
```

## Análise (causa raiz)
- `index.html:8` carrega `https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.4/chart.umd.min.js`
- Essa URL retorna **HTTP 404** (verificado com `curl -I`) → a biblioteca nunca carrega → `Chart` não existe quando `graficos.js` executa
- A mesma versão no jsDelivr (`https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js`) retorna **HTTP 200**
- `favicon.ico` 404: inofensivo, o navegador procura um ícone que não existe

## Arquivos
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/FERRAMENTAS-DE-BI/LOOKER-STUDIO/index.html`

## Passos
| # | Ação | Verificação | Status |
|---|------|-------------|--------|
| 1 | Trocar a URL do Chart.js (linha 8) pela do jsDelivr | `curl -I` da nova URL retorna 200 | ✅ Concluído |
| 2 | Adicionar `<link rel="icon" href="data:,">` no `<head>` para eliminar o 404 do favicon | Leitura do `<head>` | ✅ Concluído |
| 3 | `git add` dos arquivos | — | ⛔ Bloqueado — index.lock |

## Resultado final
URL do Chart.js trocada para jsDelivr (200) e favicon vazio adicionado. git add bloqueado por index.lock.
