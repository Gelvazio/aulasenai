# Atividade Excel 29-09-2026 — Acrescentar as questões 7, 8, 9 e 10

**Criado em:** 2026-09-29 · **Status:** ✅ Concluído em 2026-09-29 (escopo final: ver seção 10 do plano da atividade)

## Objetivo

Acrescentar 4 questões novas (7 a 10) à atividade `ATIVIDADE-EXCEL-29-09-2026`, sobre os assuntos
das aulas 3, 4 e 5 (arquivos `3-Excel-Básico...`, `4-Excel-Intermediário...`,
`5-Excel-Avançado...`), continuando a **mesma planilha cumulativa** (`ESTOQUE-NOME-SOBRENOME.xlsx`).

## Assuntos ainda não cobertos pelas Q1–Q6

| Aula | Assunto sem questão | Questão |
|---|---|---|
| 3 | MÉDIA, MÁXIMO, MÍNIMO, CONT.NÚM × CONT.VALORES | **Q7** |
| 3 | Referência absoluta com taxa fixa (`$L$1`), precedência de operadores, Preenchimento Relâmpago (Ctrl+E) | **Q8** |
| 4 | Formatação condicional por **fórmula** (`=$I2<$F2`, linha inteira), escala de cores, datas como número (vencimento = data + 30) | **Q9** |
| 5 | CONT.SE/SOMASE com operadores (`">0"`, `">"&MÉDIA(...)`), ARRUMAR/VALOR e diagnóstico de `#N/D` | **Q10** |

## Proposta das questões

| Q | Título | Conteúdo resumido |
|---|---|---|
| 7 | Estatísticas de estoque com MÉDIA, MÁXIMO, MÍNIMO e contagens | Bloco na aba `Resumo`: saída média, maior/menor saldo, amplitude, itens cadastrados (CONT.VALORES), saldos lançados (CONT.NÚM) |
| 8 | Custo de armazenagem com referência absoluta e Preenchimento Relâmpago | Taxa 2% em célula isolada, `=J2*$M$1`, ordem dos parênteses, extrair a sigla do código com Ctrl+E |
| 9 | Alertas visuais por fórmula | Regra `=$I2<$F2` na linha do item, escala de cores no saldo, coluna Validade (data + 30) com formato de data |
| 10 | Indicadores com CONT.SE e SOMASE com critério | Itens com saldo > 0, valor acima da média, diagnóstico de `#N/D` (espaço/texto) com ARRUMAR e VALOR |

Cada questão segue o padrão: passos numerados, **1 imagem SVG por passo**, detalhamento completo,
caixas "Verifique" sem valores, critérios de correção e gabarito só no `GABARITO-PROFESSOR.md`.

## ⚠️ Decisão necessária — tempo e pontuação

Hoje a atividade tem **3h25** (limite 3h30) e **10,0 pontos**. Com 4 questões novas é preciso
redistribuir. Opções: (A) ampliar duração e manter 10 pontos redistribuídos; (B) ampliar duração
e subir a pontuação; (C) manter o tempo e tornar Q7–Q10 opcionais/bônus.

## Passos de execução (após aprovação)

| Passo | Ação | Arquivo | Status |
|---|---|---|---|
| 1 | Acrescentar Q7–Q10 (passos, imagens, critérios) | `.../ATIVIDADE-EXCEL-29-09-2026/atividade.json` | ⬜ |
| 2 | Ajustar tempos, pontos e capa | `atividade.json` e `ATIVIDADE-EXCEL-29-09-2026.md` | ⬜ |
| 3 | Regerar capa, questões e SVGs | `assets/gerador-atividade-excel/gerar_atividade_excel.py` | ⬜ |
| 4 | Conferir contas e escrever gabarito Q7–Q10 | `GABARITO-PROFESSOR.md` | ⬜ |
| 5 | Ajustar menu/índice se necessário | `MENU-ATIVIDADES.js` | ⬜ |
| 6 | Commit local | — | ⬜ |

**Riscos:** o gerador pode não suportar algum recurso visual (ex.: escala de cores); nesse caso
será estendido em `assets/gerador-atividade-excel/`. Nenhum teste automatizado será criado.

## Resultado final

Escopo ajustado pelo professor durante a execução: questões simples (1h30 no total), tabela de
120 linhas com botão Copiar, nota apenas na formatação e cobertura do conteúdo dos arquivos 3, 4
e 5 (funções, SE aninhado, CONT.SE/SOMASE, PROCV+SEERRO, formatação condicional, filtros,
congelar painéis). Detalhes e tempos em `ATIVIDADE-EXCEL-29-09-2026.md`, seção 10.

| Passo | Status |
|---|---|
| Q7–Q10 no `atividade.json` (26 passos, 21 imagens novas) | ✅ |
| Tempos, pontos e capa (4h50, 10,0 pontos, 6 abas) | ✅ |
| Regerar capa, questões e SVGs | ✅ |
| Gabarito Q1–Q10 atualizado | ✅ |
| Menus (`MENU-ATIVIDADES.js`, 2 arquivos) | ✅ |
