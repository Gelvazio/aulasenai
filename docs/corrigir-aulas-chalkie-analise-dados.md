# Corrigir divergências PPTX × Markdown — Análise de Dados (AULAS-CHALKIE-AI-COLORIDA)

**Objetivo:** Corrigir as 3 divergências encontradas na conferência dos `.pptx` com os `.md` da
pasta `MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/`.

**Fonte da verdade:** `EMENTA-PRINCIPAL-GESTAO_E_CONTROLE_MATERIAIS.md` (UC com 32h) e
`ANALISE_DADOS_APLICADA_GESTAO/EMENTA-CHALKIE-AI.md` (4 aulas × 8h, contexto de gestão de materiais).

**Criado em:** 2026-09-27
**Concluído em:** 2026-09-27
**Tempo decorrido:** ~25 min

---

## Escopo (aprovado pelo usuário: "pode corrigir os 3 itens")

1. `0-APRESENTACAO UNIDADE CURRICULAR.pptx`, slide 5: "40 horas" → "32 horas";
   "10 encontros - 2" → "4 aulas de 8 horas".
2. `8-RELATORIO-AULAS-CHALKIE-AI-VERSAO.md`: refazer a partir dos 7 `.md` da pasta (que
   reproduzem os `.pptx` + complementos), agrupados pelas 4 aulas da ementa
   (1+2 → Aula 1 · 3+4 → Aula 2 · 5+6 → Aula 3 · 7 → Aula 4). A seção final
   "AVALIAÇÃO DA UNIDADE CURRICULAR" é mantida sem alteração. A versão anterior (de outro
   conjunto de `.pptx`, ausente da pasta) fica no histórico do Git.
3. Contextos genéricos que sobraram nos `.md`:
   - `4-...md` slide 31: "filial ou vendedor" / "vendas maiores que R$ 1.000" → almoxarifado.
   - `6-...md` slides 6/7: "somar vendas quando o vendedor for 'Lucas'" → setor requisitante;
     "ÍNDICE e CORRESPONDÊNCIA" → "ÍNDICE e CORRESP".
   - `6-...md` slide 10: "Região ou Vendedor" → "Categoria ou Fornecedor".
   - `6-...md` slide 26: "(vendedores, filiais)" → "(itens, fornecedores)".

## Riscos

- O `.pptx` é editado direto no XML (só o texto das 2 caixas; layout preservado).
- O relatório antigo tinha conteúdo de outro conjunto de slides; ele sai do arquivo (fica no Git).
- Os `.pptx` 1–7 continuam com o contexto genérico e as fórmulas vazias da exportação do Chalkie;
  os `.md` são a versão correta.

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Carga horária no `0-APRESENTACAO` | ✅ Concluído |
| 2 | Refazer o relatório 8 a partir dos 7 `.md` | ✅ Concluído |
| 3 | Trocar contextos genéricos nos `.md` 4 e 6 | ✅ Concluído |
| 4 | Verificar e fazer commit local | ✅ Concluído |

**Verificação:** reler o texto do slide 5 do `.pptx`; conferir no relatório 7 arquivos-fonte e
a seção de avaliação; `grep -i "vendedor"` nos `.md` 4 e 6 sem resultado.

---

## Resultado (2026-09-27)

- Slide 5 do `0-APRESENTACAO`: "Carga Horária: 32 horas" · "Nº de Aulas: 4 aulas de 8 horas".
- Relatório 8 refeito: 4 aulas, 7 arquivos-fonte, 285 slides + 17 complementos (302), blocos de
  alinhamento à ementa de cada aula e seção de avaliação mantidos. Sem "comissão"/"vendedor".
- `.md` 4 e 6: contextos trocados para almoxarifado; "CORRESPONDÊNCIA" → "CORRESP" (3 ocorrências).
