# Dataset CSV para exercícios no Looker Studio

**Criado em:** 2026-09-22
**Concluído em:** 2026-09-22
**Tempo decorrido:** ~5 min

## Objetivo
Criar um dataset CSV fictício de estoque, pronto para importar no Google Sheets / Looker Studio, usado no exercício da seção 9 do `CLAUDE.md` da pasta LOOKER-STUDIO.

## Escopo
- Um arquivo `dados/estoque-materiais.csv` (~120 linhas, 12 meses × 10 produtos em 5 categorias)
- Colunas: `data` (AAAA-MM-DD), `mes`, `categoria`, `produto`, `fornecedor`, `quantidade`, `valor_unitario`, `valor_total`, `estoque_minimo`, `situacao` (OK / Abaixo do mínimo)
- Separador vírgula, decimal com ponto, UTF-8 — formato que o Looker Studio reconhece automaticamente (número, data, texto)
- Categorias/produtos coerentes com `js/dados-exemplo.js` (Matéria-Prima, Embalagem, Ferramentas + EPI, Manutenção)
- Uma linha no `CLAUDE.md` da pasta apontando para o CSV

## Fora do escopo
- Alterar `index.html` ou os arquivos `js/`
- Testes automatizados

## Arquivos previstos
- `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/FERRAMENTAS-DE-BI/LOOKER-STUDIO/dados/estoque-materiais.csv` (novo)
- `.../LOOKER-STUDIO/CLAUDE.md` (seção 9 — referência ao CSV)

## Riscos
- Decimal com vírgula quebraria a detecção numérica → usar ponto
- Acentos corrompidos se não for UTF-8 → gerar em UTF-8

## Passos
| # | Ação | Arquivo | Verificação | Status |
|---|------|---------|-------------|--------|
| 1 | Gerar CSV com script Python (dados determinísticos) | `dados/estoque-materiais.csv` | Contar linhas e conferir cabeçalho | ✅ Concluído |
| 2 | Referenciar CSV na seção 9 | `CLAUDE.md` (LOOKER-STUDIO) | Leitura do trecho | ✅ Concluído |
| 3 | `git add` (commit segue regra de 20 chats) | — | — | ⛔ Bloqueado — `.git/index.lock` em uso por outro processo git |

## Resultado final
CSV gerado com 120 registros (15 abaixo do mínimo), referenciado na seção 9 do CLAUDE.md da pasta LOOKER-STUDIO.
