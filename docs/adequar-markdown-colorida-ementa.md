# Adequar os Markdown de AULAS-CHALKIE-AI-COLORIDA à ementa

**Objetivo:** Ajustar os 7 `.md` de
`MATERIAIS/GESTAO_E_CONTROLE_MATERIAIS/ANALISE_DADOS_APLICADA_GESTAO/AULAS-CHALKIE-AI-COLORIDA/`
para cobrirem 100% do `EMENTA-CHALKIE-AI.md` da matéria: conhecimentos [oficial], indicadores
1–12, situações-problema e regras para IA.

**Tech Stack:** Markdown (edição manual)

**Criado em:** 2026-09-25
**Concluído em:** 2026-09-25
**Tempo decorrido:** < 1 hora

**Base:** auditoria em `docs/converter-slides-chalkie-colorida-markdown.md`.

## Escopo

- ✅ Editar só os 7 `.md`. Os `.pptx` **não** mudam, então os `.md` deixam de ser cópia fiel dos slides.
- ✅ A ementa não será alterada.
- ✅ Mapa: decks 1–2 → Aula 1 · 3–4 → Aula 2 · 5–6 → Aula 3 · 7 → Aula 4.
- ❌ Sem aulas, pesos ou capacidades além da ementa (regras 1 e 2).

## Status Geral

| # | Passo | Status |
|---|-------|--------|
| 1 | Cabeçalho de alinhamento em cada `.md` | ✅ Concluído |
| 2 | Deck 1: conversão de unidades + área/volume/peso | ✅ Concluído |
| 3 | Deck 2: porcentagem composta + média × mediana no estoque | ✅ Concluído |
| 4 | Deck 3: MÁXIMO, MÍNIMO, CONT.NÚM + oficina de estoque | ✅ Concluído |
| 5 | Deck 4: validação de códigos + alerta de estoque mínimo | ✅ Concluído |
| 6 | Deck 5: PROCV no cadastro de itens + #N/D | ✅ Concluído |
| 7 | Deck 6: compras por fornecedor e mês + regra do gráfico | ✅ Concluído |
| 8 | Deck 7: KPIs de estoque + storytelling + Av4 | ✅ Concluído |
| 9 | Nova auditoria por palavra-chave (tudo ✅) | ✅ Concluído |

## Passos

### 1. Cabeçalho de alinhamento — ✅
Logo após o título de cada `.md`, um bloco com: aula da ementa, conhecimentos, capacidades
(C1/C2/S*), indicadores, avaliação da aula (Av1–Av4) e a nota "Excel ou LibreOffice Calc
(funções em português)" (regra 4).
**Verificação:** 7 arquivos com o bloco `> **Alinhamento à ementa**`.

### 2. Deck 1 (`1-Matemática-...md`) — ✅
Novos slides: **Conversão de Unidades** (kg↔g, m↔cm, m³↔L, com a unidade no resultado) e
**Área, Volume e Peso na Armazenagem** (situação 3: paletes 1,2 × 1,0 m num galpão 18 × 10 m com
corredor; capacidade em m³ e peso por prateleira). Inclui a situação 1 (parafusos: 1.200 un. em
8 dias → caixas de 250 para 30 dias) com resolução. Indicadores 1 e 3.

### 3. Deck 2 (`2-Fundamentos-...md`) — ✅
Situação 2 (aumento de 12% com 5% de desconto = 1,12 × 0,95), com o alerta "porcentagem sobre
porcentagem". Situação 4 (saídas diárias: média × mediana) com desvio padrão interpretado.
Exemplos de loja e vendas trocados por estoque e compras. Indicadores 2 e 4.

### 4. Deck 3 (`3-Excel-Básico-...md`) — ✅
Novo slide **MÁXIMO e MÍNIMO**; corrigir "a função CONT.NÚM" no slide 20. A oficina de folha
de pagamento vira **planilha de controle de estoque** (entradas, saídas, saldo, custo total com
referência absoluta), e o alerta "referência que anda" entra. Indicadores 5 e 6.

### 5. Deck 4 (`4-Excel-Intermediário-...md`) — ✅
Situação 5 (validação em lista para códigos de item) e situação 6 (saldo abaixo do mínimo em
vermelho com formatação condicional e SE). Práticas de vendas trocadas por estoque. Indicador 7.

### 6. Deck 5 (`5-Excel-Avançado-Funções-...md`) — ✅
Situação 7 (PROCV de descrição e preço de 300 itens pelo código), com SEERRO e a causa comum do
#N/D (espaço e número salvo como texto). Exemplos passam a usar cadastro de itens, pedidos e
fornecedores. Indicadores 8 e 9.

### 7. Deck 6 (`6-Excel-Avançado-Tabelas-...md`) — ✅
Situação 8 (tabela dinâmica de compras por fornecedor e mês + gráfico dinâmico), a regra
"comparar → colunas, tendência → linhas", o alerta sobre pizza com muitas fatias, e proteção da
planilha antes de distribuir o relatório. Indicadores 9 e 10.

### 8. Deck 7 (`7-Dashboards-...md`) — ✅
Situação 9 (KPIs de giro, ruptura, custo e cobertura do estoque), o termo **storytelling com
dados** (pergunta → dado → conclusão → ação) e o roteiro da Av4 (dataset bruto → dashboard →
apresentação de 5 min). Indicadores 11 e 12.

### 9. Nova auditoria — ✅
Rodar a contagem por palavra-chave de novo: cada conhecimento 1.1–1.8 e 2.1–2.2.8, os
indicadores 1–12 e as situações 1–9 aparecem pelo menos uma vez.

## Riscos

- Os `.md` passam a ter conteúdo que não está nos `.pptx`. Se os slides forem regenerados a
  partir dos `.pptx`, os ajustes se perdem.
- Sem commit agora: pela regra do projeto, o commit é feito no ciclo de 20 conversas.

## Resultado Final

**Auditoria:** 33/33 ✅ (conhecimentos 1.1–1.8 e 2.1–2.2.8, indicadores 1–12, situações 1–9 e
regra 4). Nenhuma lacuna de fórmula; nenhum exemplo fora da gestão de materiais nos arquivos 2–7.

| Arquivo | Slides (.pptx → .md) | Complementos |
|---|---|---|
| 1 | 41 → 45 | 29.1–29.4: parafusos, conversão de unidades, paletes no galpão, volume e peso |
| 2 | 41 → 43 | 10.1 porcentagem composta · 23.1 desvio padrão de prazos |
| 3 | 41 → 43 | 20.1 MÁXIMO/MÍNIMO · 20.2 CONT.NÚM × CONT.VALORES · oficina 35–39 virou controle de estoque |
| 4 | 41 → 43 | 15.1 saldo abaixo do mínimo · 24.1 validação de códigos |
| 5 | 40 → 42 | 11.1 PROCV em 300 itens · 23.1 causas do #N/D |
| 6 | 41 → 43 | 21.1 compras por fornecedor e mês · 36.1 proteção |
| 7 | 40 → 43 | 14.1 KPIs do estoque · 29.1 storytelling · 37.1 projeto final Av4 |

**Achado extra:** os próprios `.pptx` estão sem o texto das fórmulas em cerca de 40 trechos
(ex.: "A sintaxe  utiliza dois pontos ()"). A exportação do Chalkie AI perdeu esse texto. Os
`.md` foram preenchidos; os `.pptx` continuam com as lacunas.

**Extrator:** agora lê todos os nós de texto do parágrafo e usa o primeiro tópico como título
do slide.
