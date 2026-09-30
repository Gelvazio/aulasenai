# Alinhar a ementa de Análise de Dados à ementa do curso

**Objetivo:** Remover o item 2.1 da lista oficial e completar a S3 no `EMENTA-CHALKIE-AI.md` de
Análise de Dados Aplicada à Gestão, conforme `EMENTA-PRINCIPAL-GESTAO_E_CONTROLE_MATERIAIS.md`
(fonte da verdade), e corrigir o cabeçalho do arquivo 3 dos Markdown da pasta
`AULAS-CHALKIE-AI-COLORIDA`.

**Tech Stack:** Markdown · Python 3.14 (script `criar-status-cursos.py`)

**Criado em:** 2026-09-27
**Concluído em:** 2026-09-27
**Tempo decorrido:** < 30 min

**Aprovação:** o usuário aprovou as correções 1 e 2 no chat e pediu para **não** renomear a pasta.

## Escopo e riscos

- A ementa precisa continuar entre 14.800 e 14.950 caracteres (tinha 14.858).
- Esta matéria não tem `STATUS-EMENTAS.md` próprio, porque `criar-status-ementas.py` só cobre o
  RIO_DO_SUL_MAIS_TECH. Só o `STATUS-EMENTAS-CURSOS.md` é regenerado; o script preserva as
  marcações VERIFICAR/IGNORAR.
- A pasta `ANALISE_DADOS_APLICADA_GESTAO` não é renomeada.

## Status Geral

| # | Passo | Status |
|---|-------|--------|
| 1 | `EMENTA-CHALKIE-AI.md`: fonte, S3, 2.1 fora do [oficial], tabelas das Seções IV e X | ✅ Concluído |
| 2 | Conferir tamanho (14.800 a 14.950 caracteres) | ✅ Concluído |
| 3 | Regenerar `MATERIAIS/STATUS-EMENTAS-CURSOS.md` | ✅ Concluído |
| 4 | Cabeçalho do arquivo 3 em `AULAS-CHALKIE-AI-COLORIDA` | ✅ Concluído |
| 5 | `git add` (commit no ciclo de 20 conversas) | ✅ Concluído |

## Resultado Final

- `EMENTA-CHALKIE-AI.md`: a fonte agora é a ementa do curso; o 2.1 saiu da lista [oficial] e
  virou "base para o 2.2" no detalhamento; S3 completada; Seções IV e X ajustadas.
  Tamanho: 14.858 → 14.943 caracteres ✅.
- `STATUS-EMENTAS-CURSOS.md` regenerado: ANALISE_DADOS_APLICADA_GESTAO = 14.943 ✅ Conforme;
  marcações VERIFICAR/IGNORAR preservadas.
- Arquivo 3 de `AULAS-CHALKIE-AI-COLORIDA`: cabeçalho indica "base didática para o 2.2".
- Pasta não renomeada, a pedido do usuário.
