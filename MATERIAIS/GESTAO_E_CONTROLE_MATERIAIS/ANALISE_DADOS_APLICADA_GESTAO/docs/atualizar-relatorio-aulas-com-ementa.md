# Atualizar o relatório das aulas com o que falta da ementa

**Objetivo:** completar `AULAS-CHALKIE-AI-COLORIDA/8-RELATORIO-AULAS-CHALKIE-AI-VERSAO.md` com
todos os itens do `EMENTA-CHALKIE-AI.md` que não constam nele, usando como fonte os 7 Markdown de
aulas da mesma pasta (já alinhados à ementa).

**Tech Stack:** Markdown

**Criado em:** 2026-09-27 12:23
**Concluído em:** 2026-09-27 12:29
**Tempo decorrido:** 06:00

**Permissão:** curso `GESTAO_E_CONTROLE_MATERIAIS` está como `VERIFICAR` no
`STATUS-EMENTAS-CURSOS.md` ✅

---

## Escopo

- ✅ Alterar **somente** `8-RELATORIO-AULAS-CHALKIE-AI-VERSAO.md`.
- ❌ Não alterar a ementa, os 7 Markdown de aula nem os `.pptx`.
- ✅ Conteúdo novo entra como **slides complementares `N.1`, `N.2`...** (mesma convenção dos 7
  Markdown), logo após o slide relacionado, sem renumerar os slides existentes.
- ✅ Cada aula ganha um bloco "Alinhamento à ementa" (conhecimentos, capacidades, indicadores,
  avaliação, situações-problema), igual ao dos 7 Markdown.
- ✅ Contexto sempre de gestão de materiais; funções em português; Excel ou LibreOffice Calc.
- ✅ Toda conta com resolução conferível (reaproveitada dos 7 Markdown, já conferidos).

## Arquivos

| Arquivo | Ação |
|---|---|
| `AULAS-CHALKIE-AI-COLORIDA/8-RELATORIO-AULAS-CHALKIE-AI-VERSAO.md` | Modificar |
| `docs/atualizar-relatorio-aulas-com-ementa.md` | Este plano (status) |

## Riscos

- Os slides `N.x` não existem no `.pptx`; ficam identificados como complemento no cabeçalho.
- Slides existentes com contexto fora de gestão de materiais (loja de roupas, RH, comissão)
  **não são reescritos**; recebem complemento com a versão de almoxarifado (passo 7).

---

## Status Geral

| Passo | Descrição | Status | Criado em | Concluído em | Tempo decorrido |
|-------|-----------|--------|-----------|--------------|-----------------|
| 1 | Cabeçalho geral + bloco de alinhamento nas 4 aulas | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 2 | Aula 1: conversão de unidades, regra de três de compra, variação de estoque, % sobre % | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 3 | Aula 1: paletes no galpão, média × mediana nas saídas, cálculo do desvio padrão e moda | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 4 | Aula 2: preencher fórmulas vazias; validação de códigos; saldo abaixo do mínimo em vermelho | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 5 | Aula 3: PROCV em 300 itens, causas do #N/D, compras por fornecedor e mês, gráfico dinâmico; preencher fórmulas vazias | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 6 | Aula 4: KPIs do estoque (giro, ruptura, custo, cobertura), storytelling em 4 passos, Av4 conforme ementa (2h, 4 KPIs) | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 7 | Complementos de contexto de materiais para Av2 (loja) e Av3 (bônus/RH) | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 8 | Seção final "Avaliação da UC": pesos, nota final, aprovação, critérios Av1–Av4, rubrica 4 níveis, recuperação, dificuldades comuns | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 9 | Conferência: checklist ementa × relatório (conhecimentos, 12 indicadores, 9 situações) | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |
| 10 | Commit local | ✅ Concluído | 2026-09-27 12:23 | 2026-09-27 12:29 | 06:00 |

---

### Passo 1: Cabeçalho e alinhamento por aula

**Status:** ✅ Concluído
**Arquivo:** `AULAS-CHALKIE-AI-COLORIDA/8-RELATORIO-AULAS-CHALKIE-AI-VERSAO.md`
**Ação:** no topo, citar a ementa como fonte da verdade, a convenção `N.x`, a data de atualização
e o editor (Excel ou LibreOffice Calc). Em cada `## AULA N`, inserir o bloco:

```markdown
> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Conhecimentos [oficial]:** ...
> - **Capacidades:** ...
> - **Indicadores de desempenho:** ...
> - **Avaliação:** ...
> - **Situações-problema:** ...
```

**Verificação:** `grep -c "Alinhamento à ementa"` → 4.

### Passo 2 e 3: Aula 1 (matemática)

**Status:** ✅ Concluído
**Ação:** inserir slides complementares com o conteúdo de `1-Matemática...md` (slides 29.1–29.4,
28) e `2-Fundamentos...md` (slides 10.1, 18, 23.1): situação 1 (parafusos → 18 caixas), tabela de
conversão (kg/g, m/cm, m²/cm², m³/L) + 75 g por frasco, situação 3 (120 paletes), volume/peso por
palete (54 caixas, 648 kg), situação 2 (R$ 53,20; +6,4%), variação de estoque (800 → 680 = −15%),
situação 4 (luvas 12, 14, 15, 18, 91: média 30 × mediana 15), desvio padrão fornecedores A e B
(0,63 × 3,16) com `DESVPAD.P`/`DESVPAD.A`, moda do tamanho de luva, resolução da regra de três
composta do slide 15 (analistas).
**Verificação:** `grep` por "Conversão de Unidades", "Situação-Problema", "DESVPAD" no arquivo.

### Passo 4: Aula 2 (Excel básico e intermediário)

**Status:** ✅ Concluído
**Ação:** preencher as fórmulas que ficaram vazias (slides 12, 16, 17, 18, 20, 23, 24, 34, 35,
36) e inserir situação 5 (validação por `=Cadastro!$A$2:$A$300`) e situação 6
(`=$E2<$F2` em vermelho + `=SE(E2<F2; "Repor"; "OK")`).
**Verificação:** `grep -n ":  \|: \.$\| \. $"` sem ocorrências de fórmula vazia na Aula 2.

### Passo 5: Aula 3 (Excel avançado e visualização)

**Status:** ✅ Concluído
**Ação:** preencher fórmulas vazias (slides 8, 9, 11, 15, 16) e inserir situação 7 (PROCV em
300 itens), causas do #N/D (ARRUMAR, VALOR, ÉTEXTO), situação 8 (tabela dinâmica de compras por
fornecedor e mês, % do total, 3 perguntas) e gráfico dinâmico ligado à tabela dinâmica.

### Passo 6: Aula 4 (dashboards)

**Status:** ✅ Concluído
**Ação:** inserir situação 9 (tabela de KPIs: giro, ruptura, custo, cobertura, com meta e
semáforo), storytelling em 4 passos (pergunta → dado → conclusão → ação, roteiro de 5 min) e
complemento da Av4 conforme ementa: 2h, dataset de movimentações de estoque, 4 KPIs, 2 gráficos
dinâmicos, segmentação por setor, critérios 25% cada, nota mínima 7,0; alternativa do LibreOffice.

### Passo 7: Contexto de gestão de materiais

**Status:** ✅ Concluído
**Ação:** após o slide 41 da Aula 2 (Loja Modelo) e o slide 40–41 da Aula 3 (bônus de lojas),
inserir versão de almoxarifado da atividade avaliativa (planilha de controle de estoque; análise
de requisições por categoria com PROCV + SEERRO + SE aninhado + tabela dinâmica), com os critérios
da ementa (Av2 30/40/30; Av3 35/35/30).

### Passo 8: Seção "Avaliação da UC"

**Status:** ✅ Concluído
**Ação:** ao final do arquivo, tabela de instrumentos com pesos (25/25/20/25 + 5% participação),
fórmula da nota final, aprovação (≥ 7,0 em todas e 75% de presença), rubrica de 4 níveis,
recuperação e as 5 dificuldades comuns com o tratamento.

### Passo 9: Conferência

**Status:** ✅ Concluído
**Ação:** reler a ementa item a item e marcar no fim deste plano a tabela de cobertura
(1.1–1.8, 2.2.1–2.2.8, indicadores 1–12, situações 1–9).

### Passo 10: Commit local

**Status:** ✅ Concluído

```powershell
git add "MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO"
git commit -m "docs(analise-dados): completa relatório das aulas com o que faltava da ementa"
```

Sem push (regra do projeto).

---

## Resultado

- 22 slides complementares `N.x` inseridos (Aula 1: 11 · Aula 2: 3 · Aula 3: 5 · Aula 4: 3),
  incluindo a versão almoxarifado da Av2 e da Av3.
- Fórmulas vazias preenchidas: Aula 2 (slides 12, 15, 16, 17, 18, 20, 23, 24, 34, 35, 36) e
  Aula 3 (slides 8, 9, 11, 15, 16); resposta do slide 41 da Aula 3.
- Bloco "Alinhamento à ementa" nas 4 aulas e seção final "Avaliação da UC" com pesos, nota,
  aprovação, rubrica, recuperação, dificuldades comuns e tabela de cobertura.

### Cobertura ementa × relatório

| Item da ementa | Situação |
|---|---|
| Conhecimentos 1.1–1.8 | ✅ Todos |
| Conhecimentos 2.2.1–2.2.8 | ✅ Todos |
| Indicadores 1–12 | ✅ Todos |
| Situações-problema 1–9 | ✅ Todas |
| Dificuldades comuns (5) | ✅ Todas |
| Avaliação (pesos, critérios, rubrica, recuperação) | ✅ |
| Contexto gestão de materiais | ✅ Complementos Av2, Av3 e Av4 |

**Pendência:** slides originais de loja de roupas, RH e vendas foram mantidos (decisão do plano).
