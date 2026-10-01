# ATIVIDADE-EXCEL-01-10-2026 — Plano da Atividade Prática (Tabelas Dinâmicas e Gráficos)

**Unidade curricular:** Análise de Dados Aplicada à Gestão (32h)
**Curso:** Aprendizagem Industrial — Assistente em Processos de Gestão e Controle de Materiais
**Data de aplicação:** 01/10/2026 · **Duração:** 3h25 (máximo 3h30)
**Fontes:** `../6-Excel-Avançado-Tabelas-Dinâmicas-e-Gráficos.md` e `../../EMENTA-CHALKIE-AI.md`
(fonte da verdade)
**Editor:** Excel ou LibreOffice Calc (funções em português)
**Padrão:** regra "📗 PADRÃO DE ATIVIDADE PRÁTICA DE EXCEL" do `CLAUDE.md`, mesmo modelo da
`ATIVIDADE-EXCEL-29-09-2026`
**Status do plano:** ✅ Aprovado em 2026-09-27 (avaliativa, 10 pontos em Atividades de Sala de Aula)

---

## 1. Visão geral

Atividade prática **avaliativa**: **compõe a nota final** da UC e vale **10 pontos** na tabela de
notas do professor (nota final de 100 pontos, média 70). O aluno recebe a base
de **36 compras do 1º semestre de 2026** do almoxarifado da **Metalúrgica Vale do Itajaí**
(empresa fictícia, a mesma da atividade anterior) e responde a perguntas do gerente de compras
com **tabelas dinâmicas, gráficos dinâmicos, segmentação de dados e proteção**.

- Um único arquivo, construído aba por aba: `Base_Compras`, `TD_Fornecedor`, `TD_Mes`,
  `TD_Itens` e `TD_Mensal`.
- Cada questão tem um HTML próprio, com passos numerados. **Cada passo tem uma imagem** da tela
  do Excel (ponto a clicar destacado e numerado) e o detalhamento completo.
- Caixas **"Verifique"** dizem o que observar, sem revelar valores. Os valores esperados ficam
  **só no gabarito do professor**.

### Alinhamento à ementa

| Ementa | Onde entra |
|---|---|
| 2.2.3 Tabela dinâmica | Q2, Q3, Q4 e Q5 |
| 2.2.4 Filtros | Q3 (filtro da tabela dinâmica), Q4 (10 primeiros) e Q6 (segmentação e linha do tempo) |
| 2.2.6 Proteção de células | Q6 |
| 2.2.8 Gráficos dinâmicos | Q4 e Q5 |
| Base (requisitos da base bruta, Tabela oficial) | Q1 |
| Indicadores de desempenho | 9 (tabela dinâmica) e 10 (proteção e escolha do gráfico adequado) |
| Situação-problema da ementa | **8**: "Qual fornecedor e qual mês concentram as compras?" |
| Capacidades | C1, C2, S1 Pensamento crítico, S2 Aprendizagem ativa |

---

## 2. Tempos e pontuação

| Momento | Conteúdo | Tempo | Pontos |
|---|---|---|---|
| Abertura | Leitura da capa, baixar a base e abrir o Excel | 15 min | — |
| **Questão 1** | Preparar a base: corrigir problemas, Valor Total e Tabela oficial | 20 min | 1,5 |
| **Questão 2** | Tabela dinâmica por fornecedor, ordenação e % do total | 30 min | 2,0 |
| **Questão 3** | Agrupar datas por mês e trimestre, contagem de pedidos e filtro | 25 min | 1,5 |
| Intervalo | — | 15 min | — |
| **Questão 4** | Gráficos dinâmicos: colunas por mês e barras dos 5 maiores itens | 35 min | 2,0 |
| **Questão 5** | Campo calculado e gráfico combinado com eixo secundário | 25 min | 1,5 |
| **Questão 6** | Segmentação, linha do tempo, atualização e proteção | 30 min | 1,5 |
| Fechamento | Conferência final e entrega | 10 min | — |
| **Total** | | **3h25** | **10,0** |

Trabalho nas questões: 2h45. Com abertura, intervalo e fechamento, a atividade fica em 3h25.
**Valor na nota final: 10 pontos.** A pontuação das questões já soma 10, e cada ponto obtido
entra direto na nota. O desempenho mínimo esperado é de 7,0 (70%, mesma média da tabela de notas
e nota mínima da ementa).

---

## 3. Dados da atividade

### Arquivo que o aluno recebe: `BASE-COMPRAS-1S-2026.xlsx`

Gerado pelo script junto com a atividade. Tem **dois problemas de propósito**, que o aluno
corrige na Q1 (slide 9 do arquivo 6): um **título mesclado** na linha 1, acima dos cabeçalhos, e
uma **linha vazia** no meio da base.

Colunas: Data · Nº Pedido · Fornecedor · Categoria · Item · Quantidade · Valor Unitário
(o **Valor Total** o aluno cria na Q1).

| Data | Nº Pedido | Fornecedor | Categoria | Item | Qtd | Valor Unit. |
|---|---|---|---|---|---|---|
| 05/01/2026 | P-001 | Alfa Suprimentos | EPI | Luva de vaqueta | 40 | 18,90 |
| 09/01/2026 | P-002 | Beta Industrial | Fixação | Parafuso sextavado M8 | 2000 | 0,45 |
| 14/01/2026 | P-003 | Beta Industrial | Elétrico | Cabo flexível 2,5 mm² | 200 | 3,40 |
| 20/01/2026 | P-004 | Cometa EPI | EPI | Máscara PFF2 | 150 | 3,20 |
| 23/01/2026 | P-005 | Delta Ferramentas | Ferramentas | Disco de corte 7" | 40 | 9,80 |
| 28/01/2026 | P-006 | Beta Industrial | Elétrico | Disjuntor 20 A | 20 | 24,90 |
| 03/02/2026 | P-007 | Beta Industrial | Fixação | Porca M8 | 2000 | 0,15 |
| 06/02/2026 | P-008 | Alfa Suprimentos | EPI | Óculos de proteção | 30 | 12,50 |
| 11/02/2026 | P-009 | Beta Industrial | Elétrico | Fita isolante 19 mm | 30 | 6,90 |
| 17/02/2026 | P-010 | Delta Ferramentas | Ferramentas | Broca aço rápido 8 mm | 20 | 14,50 |
| 20/02/2026 | P-011 | Cometa EPI | EPI | Protetor auricular plug | 300 | 1,80 |
| 25/02/2026 | P-012 | Beta Industrial | Elétrico | Cabo flexível 2,5 mm² | 150 | 3,40 |
| 02/03/2026 | P-013 | Beta Industrial | Elétrico | Disjuntor 20 A | 60 | 24,90 |
| 05/03/2026 | P-014 | Alfa Suprimentos | EPI | Luva de vaqueta | 60 | 18,90 |
| 10/03/2026 | P-015 | Beta Industrial | Elétrico | Cabo flexível 2,5 mm² | 400 | 3,40 |
| 13/03/2026 | P-016 | Delta Ferramentas | Ferramentas | Trena 5 m | 15 | 22,00 |
| 18/03/2026 | P-017 | Beta Industrial | Fixação | Parafuso sextavado M8 | 3000 | 0,45 |
| 24/03/2026 | P-018 | Cometa EPI | EPI | Máscara PFF2 | 200 | 3,20 |
| 02/04/2026 | P-019 | Delta Ferramentas | Ferramentas | Disco de corte 7" | 30 | 9,80 |
| 07/04/2026 | P-020 | Alfa Suprimentos | EPI | Luva de vaqueta | 30 | 18,90 |
| 10/04/2026 | P-021 | Beta Industrial | Fixação | Porca M8 | 1500 | 0,15 |
| 15/04/2026 | P-022 | Beta Industrial | Elétrico | Fita isolante 19 mm | 25 | 6,90 |
| 22/04/2026 | P-023 | Alfa Suprimentos | EPI | Óculos de proteção | 20 | 12,50 |
| 28/04/2026 | P-024 | Beta Industrial | Elétrico | Cabo flexível 2,5 mm² | 120 | 3,40 |
| 04/05/2026 | P-025 | Beta Industrial | Elétrico | Disjuntor 20 A | 25 | 24,90 |
| 08/05/2026 | P-026 | Cometa EPI | EPI | Protetor auricular plug | 250 | 1,80 |
| 12/05/2026 | P-027 | Delta Ferramentas | Ferramentas | Broca aço rápido 8 mm | 15 | 14,50 |
| 19/05/2026 | P-028 | Alfa Suprimentos | EPI | Luva de vaqueta | 40 | 18,90 |
| 22/05/2026 | P-029 | Beta Industrial | Fixação | Parafuso sextavado M8 | 1500 | 0,45 |
| 27/05/2026 | P-030 | Cometa EPI | EPI | Máscara PFF2 | 120 | 3,20 |
| 02/06/2026 | P-031 | Beta Industrial | Elétrico | Cabo flexível 2,5 mm² | 180 | 3,40 |
| 05/06/2026 | P-032 | Delta Ferramentas | Ferramentas | Trena 5 m | 10 | 22,00 |
| 10/06/2026 | P-033 | Delta Ferramentas | Ferramentas | Disco de corte 7" | 35 | 9,80 |
| 16/06/2026 | P-034 | Alfa Suprimentos | EPI | Luva de vaqueta | 35 | 18,90 |
| 19/06/2026 | P-035 | Beta Industrial | Elétrico | Fita isolante 19 mm | 20 | 6,90 |
| 25/06/2026 | P-036 | Beta Industrial | Elétrico | Disjuntor 20 A | 15 | 24,90 |

**Compra nova (Q6, para testar a atualização):** 30/06/2026 · P-037 · Cometa EPI · EPI · Máscara
PFF2 · 100 · 3,20.

### Resultados conferidos por script (só no gabarito)

| Pergunta | Antes da compra nova (Q2 a Q5) | Depois da compra nova (Q6) |
|---|---|---|
| Total comprado | R$ 19.605,50 | R$ 19.925,50 |
| Maior fornecedor | Beta Industrial — R$ 10.525,50 (53,7%) | Beta Industrial (52,8%) |
| Demais fornecedores | Alfa R$ 4.499,50 (23,0%) · Cometa R$ 2.494,00 (12,7%) · Delta R$ 2.086,50 (10,6%) | Cometa passa a R$ 2.814,00 |
| Mês de pico | Março — R$ 6.308,00 | Março |
| Trimestres | 1º: R$ 12.236,00 · 2º: R$ 7.369,50 | 2º: R$ 7.689,50 |
| 5 maiores itens | Luva R$ 3.874,50 · Cabo R$ 3.570,00 · Disjuntor R$ 2.988,00 · Parafuso R$ 2.925,00 · Máscara R$ 1.504,00 | Máscara R$ 1.824,00 |
| Pedidos por mês | 6 em cada mês | Junho: 7 |

A base foi montada para que a análise leve a uma **conclusão de gestão**: há **dependência de um
só fornecedor** (Beta Industrial, acima de 50%) e um **pico em março**, que o aluno deve comentar.

---

## 4. Questões e passos (cada passo = 1 imagem + detalhamento)

### Questão 1 — Preparar a base de compras (20 min · 1,5 pt)

**Arquivo:** `ATIVIDADE-EXCEL-01-10-2026/QUESTAO-01-PREPARAR-BASE.html` · **Slides:** 9, 36

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Baixar `BASE-COMPRAS-1S-2026.xlsx` (link na capa), abrir e **Salvar como** `COMPRAS-NOME-SOBRENOME.xlsx` | Caixa Salvar Como |
| 2 | Corrigir o **título mesclado**: excluir a linha 1 (botão direito no número da linha → Excluir), deixando os cabeçalhos na linha 1 | Linha 1 mesclada destacada + menu Excluir |
| 3 | Corrigir a **linha vazia**: encontrar a linha em branco e excluí-la | Grade com a linha vazia destacada |
| 4 | Criar a coluna **Valor Total** em H: `=F2*G2`, formato Moeda, copiar até o fim | Barra de fórmulas + coluna H |
| 5 | Transformar em **Tabela oficial**: [[Ctrl]]+[[Alt]]+[[T]] → "Minha tabela tem cabeçalhos" → nome `Compras`; renomear a aba para `Base_Compras` | Caixa Criar Tabela + campo Nome da Tabela |

**Critérios (1,5):** título e linha vazia removidos (0,5) · Valor Total correto (0,5) · Tabela `Compras` criada e aba renomeada (0,5).

### Questão 2 — Quanto foi comprado de cada fornecedor? (30 min · 2,0 pt)

**Arquivo:** `QUESTAO-02-TD-FORNECEDOR.html` · **Slides:** 8, 10–14, 16, 21.1

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Clicar na tabela → Inserir → **Tabela Dinâmica** → Nova Planilha | Caixa Criar Tabela Dinâmica (Tabela/Intervalo: Compras) |
| 2 | No painel de campos: **Fornecedor** em Linhas e **Valor Total** em Valores | Painel "Campos da Tabela Dinâmica" com as 4 áreas e setas de arrastar |
| 3 | Formatar os valores: Configurações do Campo de Valor → **Formato do Número** → Moeda | Caixa Configurações do Campo de Valor |
| 4 | Ordenar do **maior para o menor** (botão direito → Classificar) | Menu Classificar |
| 5 | Arrastar **Valor Total de novo** para Valores → Mostrar Valores Como → **% do Total Geral** | Menu Mostrar Valores Como |
| 6 | Renomear a aba `TD_Fornecedor` e responder nas células indicadas: maior fornecedor e se há **dependência acima de 50%** (Sim/Não) | Aba com as células de resposta destacadas |

**Critérios (2,0):** tabela dinâmica correta (0,6) · moeda e ordenação (0,4) · % do Total Geral (0,5) · respostas de análise (0,5).

### Questão 3 — Em que mês as compras se concentram? (25 min · 1,5 pt)

**Arquivo:** `QUESTAO-03-TD-MES-TRIMESTRE.html` · **Slides:** 14–16

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Nova tabela dinâmica na aba `TD_Mes`: **Data** em Linhas, **Fornecedor** em Colunas e **Valor Total** em Valores | Painel de campos preenchido |
| 2 | Agrupar as datas: botão direito numa data → **Agrupar** → marcar **Meses** e **Trimestres** | Caixa Agrupamento |
| 3 | Contar pedidos: arrastar **Nº Pedido** para Valores → Resumir Valores Por → **Contagem** | Menu Resumir Valores Por |
| 4 | Usar a área **Filtros**: arrastar **Categoria** para Filtros e ver só "Elétrico"; depois voltar para "(Tudo)" | Filtro da tabela dinâmica aberto |
| 5 | Responder nas células indicadas: **mês de pico**, **trimestre com mais compras** e uma explicação possível para o pico | Células de resposta destacadas |

**Critérios (1,5):** datas agrupadas por mês e trimestre (0,5) · contagem de pedidos (0,4) · uso do filtro (0,2) · respostas (0,4).

### Questão 4 — Gráficos dinâmicos (35 min · 2,0 pt)

**Arquivo:** `QUESTAO-04-GRAFICOS-DINAMICOS.html` · **Slides:** 25–29, 35

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Na `TD_Mes`, Análise da Tabela Dinâmica → **Gráfico Dinâmico** → **Colunas Agrupadas** | Caixa Inserir Gráfico com Colunas Agrupadas |
| 2 | Deixar o gráfico limpo: título `Compras por fornecedor e mês`, sem linhas de grade, legenda embaixo, sem 3D | Gráfico de colunas com os elementos numerados |
| 3 | Nova tabela dinâmica `TD_Itens`: **Item** em Linhas e **Valor Total** em Valores → filtro **10 Primeiros** mudado para **5** | Caixa Filtro dos 10 Primeiros |
| 4 | Ordenar do maior para o menor e criar um **Gráfico de Barras** com **rótulos de dados** | Gráfico de barras com rótulos |
| 5 | Escolha do gráfico certo: responder por que esses dados **não** vão em pizza (muitas categorias; comparar → colunas, tendência → linhas) | Comparação lado a lado: pizza lotada × barras |

**Critérios (2,0):** gráfico de colunas por mês (0,5) · gráfico limpo com título (0,4) · 5 maiores itens com barras e rótulos (0,6) · justificativa da escolha do gráfico (0,5).

### Questão 5 — Campo calculado e gráfico combinado (25 min · 1,5 pt)

**Arquivo:** `QUESTAO-05-CAMPO-CALCULADO-COMBINADO.html` · **Slides:** 19, 30–32

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Nova tabela dinâmica `TD_Mensal`: **Data** (Meses) em Linhas; **Soma de Valor Total** e **Contagem de Nº Pedido** em Valores | Painel de campos |
| 2 | **Campo calculado** `Armazenagem` = `='Valor Total'*0,05` (Análise → Campos, Itens e Conjuntos → Campo Calculado) | Caixa Inserir Campo Calculado |
| 3 | Gráfico Dinâmico → **Combinação**: Valor Total em colunas e Contagem em **linha no eixo secundário** | Caixa Inserir Gráfico, aba Combinação |
| 4 | Conferir: sem o eixo secundário a linha ficaria "grudada no chão"; escrever em uma frase por que usou dois eixos | Gráfico combinado com os dois eixos numerados |

**Critérios (1,5):** tabela mensal com soma e contagem (0,4) · campo calculado (0,4) · gráfico combinado com eixo secundário (0,5) · justificativa (0,2).
**LibreOffice Calc:** não tem campo calculado na tabela dinâmica; criar a coluna `Armazenagem` na base (`=H2*0,05`).

### Questão 6 — Painel interativo, atualização e proteção (30 min · 1,5 pt)

**Arquivo:** `QUESTAO-06-SEGMENTACAO-ATUALIZACAO-PROTECAO.html` · **Slides:** 20, 33–34, 36–36.1

| Passo | O que fazer | Imagem |
|---|---|---|
| 1 | Na `TD_Mes`: Análise → **Inserir Segmentação de Dados** → **Categoria** | Segmentação com os botões das categorias |
| 2 | Botão direito na segmentação → **Conexões de Relatório** → marcar as tabelas dinâmicas das abas TD_Fornecedor, TD_Mes e TD_Itens | Caixa Conexões de Relatório |
| 3 | **Linha do Tempo** pela Data e seleção do 1º trimestre; depois limpar | Linha do tempo com Jan–Mar selecionado |
| 4 | Lançar a **compra nova** (P-037) na última linha da Tabela `Compras` e usar **Dados → Atualizar Tudo** | Botão Atualizar Tudo + nova linha na tabela |
| 5 | **Proteger** a `Base_Compras` (senha `senai2026`) e a `TD_Fornecedor` marcando **"Usar Tabela Dinâmica e Gráfico Dinâmico"** | Caixa Proteger Planilha com a opção marcada |
| 6 | Testar a segmentação com as abas protegidas, **salvar** e entregar | Segmentação funcionando + Salvar Como |

**Critérios (1,5):** segmentação conectada às 3 tabelas (0,5) · linha do tempo (0,2) · atualização com a compra nova (0,4) · proteção correta (0,2) · arquivo salvo (0,2).
**LibreOffice Calc:** não tem segmentação nem linha do tempo; usar o **filtro da tabela dinâmica** (Categoria) e o agrupamento de datas.

---

## 5. Imagens

- **32 imagens SVG**, uma por passo (Q1: 5 · Q2: 6 · Q3: 5 · Q4: 5 · Q5: 4 · Q6: 6), mais 1 na capa.
- Mesmo estilo da atividade de 29/09, com números laranja nos pontos a clicar.
- **Novos elementos no gerador** (reutilizáveis): painel "Campos da Tabela Dinâmica" (lista de
  campos e 4 áreas), tabela dinâmica na grade, gráficos (colunas, barras, pizza e combinação com
  eixo secundário), segmentação de dados, linha do tempo e caixas Criar Tabela Dinâmica,
  Agrupamento, Configurações do Campo de Valor, 10 Primeiros, Campo Calculado, Inserir Gráfico e
  Conexões de Relatório.
- Como na atividade anterior, as imagens **não revelam os resultados**: nas tabelas dinâmicas os
  valores aparecem mascarados (`•••`), e os gráficos usam **números de ilustração**, com um selo
  "Ilustração", que não são os da base real.

---

## 6. Arquivos a criar ou alterar

```
assets/gerador-atividade-excel/
├─ graficos_excel.py            → NOVO: gráficos, segmentação e linha do tempo em SVG
├─ tabela_dinamica_excel.py     → NOVO: painel de campos e tabela dinâmica
├─ gerar_atividade_excel.py     → suporte a "arquivos_base" (gera o .xlsx de base) e link na capa
└─ sobreposicoes_excel.py       → liga os novos elementos

MATERIAIS/.../AULAS-CHALKIE-AI-COLORIDA/ATIVIDADES/
├─ ATIVIDADE-EXCEL-01-10-2026.md          → este plano
├─ ATIVIDADE-EXCEL-01-10-2026.html        → capa
└─ ATIVIDADE-EXCEL-01-10-2026/
   ├─ atividade.json                      → conteúdo (fonte única)
   ├─ BASE-COMPRAS-1S-2026.xlsx           → base para o aluno (com os 2 problemas de propósito)
   ├─ QUESTAO-01-PREPARAR-BASE.html ... QUESTAO-06-SEGMENTACAO-ATUALIZACAO-PROTECAO.html
   ├─ GABARITO-PROFESSOR.md
   └─ img/ (32 SVG)

MATERIAIS/.../ANALISE_DADOS_APLICADA_GESTAO/ATIVIDADES/index.html → novo botão no índice
MATERIAIS/.../ANALISE_DADOS_APLICADA_GESTAO/docs/atividade-excel-01-10-2026.md → registro da tarefa
```

A atividade de 29/09 **não é alterada**. Depois de mudar o gerador, eu a gero de novo só para
confirmar que continua idêntica.

---

## 7. Execução (após aprovação)

| Passo | Ação | Status |
|---|---|---|
| 1 | Novos elementos do gerador (tabela dinâmica, gráficos, segmentação, linha do tempo) | ✅ |
| 2 | Geração do `BASE-COMPRAS-1S-2026.xlsx` pelo gerador | ✅ |
| 3 | `atividade.json` com as 6 questões e os 31 passos | ✅ |
| 4 | Gerar, converter as imagens em PNG e revisar uma a uma | ✅ |
| 5 | Refazer por script os valores do gabarito | ✅ |
| 6 | `GABARITO-PROFESSOR.md`, link no índice e registro em `docs/` | ✅ |
| 7 | Confirmar que a atividade de 29/09 continua idêntica | ✅ |
| 8 | Commit local | ✅ |

---

## 8. Decisões do professor (2026-09-27)

1. **Nota:** compõe a nota final, na linha **Atividades de Sala de Aula (40 pontos)**, valendo
   **10 pontos**.
2. **Atividade de 29/09:** também passa a compor a nota (10 pontos em Atividades de Sala de Aula).
3. **Nome:** `ATIVIDADE-EXCEL-01-10-2026` (um hífen).
4. **Base com problemas de propósito:** mantida.
5. **Imagens:** tabelas dinâmicas com valores mascarados e gráficos com números de ilustração.

---

## 9. Resultado da execução (2026-09-27)

- ✅ Capa + 6 questões + `BASE-COMPRAS-1S-2026.xlsx` gerados por
  `assets/gerador-atividade-excel/gerar_atividade_excel.py` a partir do `atividade.json`.
- ✅ 32 imagens SVG (31 passos + capa), validadas como XML e revisadas uma a uma em PNG.
- ✅ Gerador ampliado (reutilizável): painel de campos, tabela dinâmica, gráficos de colunas,
  barras, pizza e combinado, segmentação, linha do tempo, guias contextuais, caixas de lista nos
  diálogos, células mescladas e geração do `.xlsx` de base.
- ✅ Imagens sem respostas: valores das tabelas dinâmicas como `•••` e gráficos com números de
  ilustração neutros ("Fornecedor 1 a 4", "Item A a E").
- ✅ Gabarito conferido por script (Beta 53,7%; pico em março; total R$ 19.605,50 e
  R$ 19.925,50 depois da compra nova).
- ✅ Índices regenerados com `assets/gerador-indices/gerar_indices.py` (a matéria lista as duas
  atividades).
- ⚠️ Atividade de 29/09: regenerada; mudaram só as 7 imagens da guia Dados (botão novo
  "Atualizar Tudo" no fim da faixa) e os textos de natureza/nota (agora avaliativa, 10 pontos).
