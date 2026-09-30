# Corrigir divergências dos Markdown de AULAS-CHALKIE-AI-COLORIDA com a ementa

**Objetivo:** Corrigir as divergências da auditoria de 2026-09-27 entre os Markdown de
`MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/`
e o `EMENTA-CHALKIE-AI.md` da matéria.

**Tech Stack:** Markdown · Python 3.14

**Criado em:** 2026-09-27
**Concluído em:** 2026-09-27

**Aprovação (chat):** "sim, corrija; ponto 3: siga a tabela de notas de 100 pontos".

## Status Geral

| # | Passo | Status |
|---|-------|--------|
| 1 | `CORRESPONDÊNCIA(` → `CORRESP(` (arquivo 5 e relatório 8) | ✅ Concluído |
| 2 | "Aula 6" e "Aula 7" → "arquivo 6, ainda na Aula 3" e "Aula 4 (arquivo 7)" (arquivos 5 e 6 e relatório 8) | ✅ Concluído |
| 3 | Seção V da ementa e cabeçalhos dos .md passam a seguir a tabela de notas de 100 pontos (média 70) | ✅ Concluído |
| 4 | Status da `ATIVIDADE-EXCEL-29-09-2026.md`: "formativa" → "avaliativa, 10 pontos" | ✅ Concluído |

## Resultado do passo 3

Tabela enviada pelo professor (imagem no chat): Atividades de sala de aula, toda aula, 40 ·
Prova objetiva 01, 01/10/2026, 20 · Prova objetiva 02 e prova prática 01, 08/10/2026, 20 ·
Recuperação de todas, 13/10/2026, 20 · Comportamento, toda aula, 10 · Total 110 · Nota final 100 ·
Média 70.

- `EMENTA-CHALKIE-AI.md`: Seção V trocada pela tabela; Seção IV sem Av1–Av4; métricas com
  "nota final ≥ 70 pontos". Tamanho: 14.943 → 14.892 caracteres ✅.
- Cabeçalhos "Avaliação" dos .md 1–7 e do relatório 8 apontam para a tabela de notas.
- Arquivo 7 e relatório: projeto final sem "Av4 / peso 25%"; média da UC 70 pontos.
- Relatório 8: seção de avaliação trocada pela tabela de notas.
- `ATIVIDADE-EXCEL-29-09-2026.md`: sem "Av3" e "nota mínima 7,0".
- `STATUS-EMENTAS-CURSOS.md` regenerado: ANALISE_DADOS_APLICADA_GESTAO = 14.892 ✅ Conforme.
