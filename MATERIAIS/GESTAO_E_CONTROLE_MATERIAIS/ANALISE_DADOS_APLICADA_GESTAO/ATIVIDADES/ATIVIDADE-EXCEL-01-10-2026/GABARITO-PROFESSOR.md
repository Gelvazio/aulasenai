# GABARITO DO PROFESSOR — ATIVIDADE-EXCEL-01-10-2026

**Uso restrito do professor.** Não publicar para os alunos.
**Natureza:** atividade prática **avaliativa**: compõe a nota final e vale **10 pontos** na linha
Atividades de Sala de Aula (40 pontos) da tabela de notas.
**Arquivo do aluno:** `COMPRAS-NOME-SOBRENOME.xlsx` · **Senha da proteção:** `senai2026`
**Pontuação:** 10,0 (entra direto na nota) · **Desempenho esperado:** 7,0 (70%)
**Base entregue:** `BASE-COMPRAS-1S-2026.xlsx`: 36 compras, com título mesclado em A1:G1 e linha
vazia depois da 18ª compra (problemas de propósito da Questão 1).

Todos os valores abaixo foram recalculados por script a partir da base.

---

## Questão 1 — Preparar a base (1,5)

| Conferir | Esperado | Pontos |
|---|---|---|
| Título mesclado e linha vazia removidos | Cabeçalhos na linha 1, compras em A2:H37 sem linha em branco | 0,5 |
| Valor Total | `H2 = F2*G2`, em Moeda (ex.: H2 = R$ 756,00; H37 = R$ 373,50) | 0,5 |
| Tabela oficial | Tabela chamada `Compras`, aba renomeada para `Base_Compras` | 0,5 |

## Questão 2 — TD por fornecedor (2,0)

| Fornecedor | Soma de Valor Total | % do Total |
|---|---|---|
| Beta Industrial | R$ 10.525,50 | 53,7% |
| Alfa Suprimentos | R$ 4.499,50 | 23,0% |
| Cometa EPI | R$ 2.494,00 | 12,7% |
| Delta Ferramentas | R$ 2.086,50 | 10,6% |
| **Total Geral** | **R$ 19.605,50** | **100,0%** |

Valores **antes** da compra nova da Questão 6. Depois da atualização: Cometa R$ 2.814,00 (14,1%),
Beta 52,8%, Alfa 22,6%, Delta 10,5%, total R$ 19.925,50.

| Resposta | Esperado |
|---|---|
| F3 — Maior fornecedor | Beta Industrial |
| F4 — Depende de um só (acima de 50%)? | **Sim** |
| F5 — Ação sugerida | Qualquer ação coerente: cadastrar/homologar um 2º fornecedor para fixação e elétrico, negociar contrato, dividir pedidos |

**Critérios:** TD correta (0,6) · Moeda e ordem decrescente (0,4) · % do Total Geral (0,5) · respostas (0,5).

## Questão 3 — Mês e trimestre (1,5)

| Mês | Alfa | Beta | Cometa | Delta | **Total** | Pedidos |
|---|---|---|---|---|---|---|
| jan | 756,00 | 2.078,00 | 480,00 | 392,00 | **3.706,00** | 6 |
| fev | 375,00 | 1.017,00 | 540,00 | 290,00 | **2.222,00** | 6 |
| mar | 1.134,00 | 4.204,00 | 640,00 | 330,00 | **6.308,00** | 6 |
| **Trim1** | | | | | **12.236,00** | 18 |
| abr | 817,00 | 805,50 | — | 294,00 | **1.916,50** | 6 |
| mai | 756,00 | 1.297,50 | 834,00 | 217,50 | **3.105,00** | 6 |
| jun | 661,50 | 1.123,50 | — | 563,00 | **2.348,00** | 6 |
| **Trim2** | | | | | **7.369,50** | 18 |
| **Total** | 4.499,50 | 10.525,50 | 2.494,00 | 2.086,50 | **19.605,50** | 36 |

Depois da compra nova (Q6): jun = R$ 2.668,00 com 7 pedidos (Cometa jun = 320,00); Trim2 = R$ 7.689,50.

| Resposta | Esperado |
|---|---|
| I3 — Mês de pico | **Março** (R$ 6.308,00) |
| I4 — Trimestre com mais compras | **1º trimestre** (Trim1) |
| I5 — Por que houve o pico? | Aceitar explicação coerente com os dados: compras grandes da **Beta Industrial** em março (disjuntores R$ 1.494,00, cabo R$ 1.360,00 e parafusos R$ 1.350,00), por exemplo reposição para obra, manutenção ou estoque para o semestre |

**Filtro Elétrico (conferência):** total de elétrico no semestre R$ 7.075,50 (antes da Q6).

**Critérios:** agrupamento meses/trimestres e Fornecedor em colunas (0,5) · contagem (0,4) · filtro e volta para (Tudo) (0,2) · respostas (0,4).

## Questão 4 — Gráficos dinâmicos (2,0)

| Item (5 primeiros) | Soma de Valor Total |
|---|---|
| Luva de vaqueta | R$ 3.874,50 |
| Cabo flexível 2,5 mm² | R$ 3.570,00 |
| Disjuntor 20 A | R$ 2.988,00 |
| Parafuso sextavado M8 | R$ 2.925,00 |
| Máscara PFF2 | R$ 1.504,00 (R$ 1.824,00 depois da Q6) |

- Gráfico 1: colunas agrupadas, meses no eixo, 4 séries (fornecedores), título, legenda embaixo, sem 3D e sem linhas de grade.
- Gráfico 2: barras com os 5 itens acima, rótulos de dados, sem legenda.
- **E3 (justificativa):** muitas categorias com valores parecidos ficam difíceis de comparar na pizza; barras mostram o ranking (comparar → barras/colunas; pizza só para 2 a 4 partes de um todo).

**Critérios:** gráfico de colunas (0,5) · gráfico limpo (0,4) · top 5 em barras com rótulos (0,6) · justificativa (0,5).

## Questão 5 — Campo calculado e gráfico combinado (1,5)

| Fornecedor | Soma de Armazenagem (5%) |
|---|---|
| Beta Industrial | ≈ R$ 526,28 |
| Alfa Suprimentos | ≈ R$ 224,98 |
| Cometa EPI | R$ 124,70 (R$ 140,70 depois da Q6) |
| Delta Ferramentas | ≈ R$ 104,33 |
| **Total** | **≈ R$ 980,28** (≈ R$ 996,28 depois da Q6) |

"≈": valores terminados em meio centavo; o Excel pode arredondar o último dígito.

- TD_Mensal: meses em linhas; Soma de Valor Total (os mesmos totais da Q3) e Contagem de Nº Pedido (6 por mês; junho 7 depois da Q6).
- Gráfico de combinação: Soma em colunas (eixo principal, até ~R$ 6.300) e Contagem em linha no **eixo secundário** (4 a 8).
- **F3 (justificativa):** as escalas são muito diferentes (milhares de reais × 6 ou 7 pedidos); sem o eixo secundário a linha ficaria colada no zero.

**Critérios:** TD_Mensal (0,4) · campo calculado (0,4) · combinado com eixo secundário (0,5) · justificativa (0,2).

## Questão 6 — Segmentação, atualização e proteção (1,5)

| Conferir | Esperado | Pontos |
|---|---|---|
| Segmentação de Categoria | Conexões de Relatório marcando TD_Fornecedor, TD_Mes e TD_Itens | 0,5 |
| Linha do tempo | Linha do tempo de Data na TD_Mes (sem filtro ao entregar) | 0,2 |
| Compra nova | Linha 38: 30/06/2026 · P-037 · Cometa EPI · EPI · Máscara PFF2 · 100 · 3,20 · R$ 320,00; TDs atualizadas (total R$ 19.925,50) | 0,4 |
| Proteção | Base_Compras e TD_Fornecedor protegidas com `senai2026`; TD_Fornecedor com "Usar Tabela Dinâmica e Gráfico Dinâmico" | 0,2 |
| Entrega | `COMPRAS-NOME-SOBRENOME.xlsx` com as 5 abas e os gráficos | 0,2 |

Conferência rápida com a segmentação em **EPI** (depois da Q6): total EPI R$ 7.313,50 (Alfa
R$ 4.499,50 + Cometa R$ 2.814,00).

---

## Erros comuns para observar na correção

- Tabela dinâmica criada **antes** de tirar a linha vazia: aparece uma linha "(vazio)" nas tabelas.
- Base sem Tabela oficial: a compra da Q6 fica fora da análise mesmo depois de Atualizar.
- Esquecer de **Atualizar Tudo** na Q6: os totais continuam em R$ 19.605,50.
- Filtro de Categoria esquecido em "Elétrico": respostas da Q3 erradas.
- Contagem feita sobre Valor Total em vez de Nº Pedido (dá o mesmo número, mas o campo pedido era Nº Pedido).
- Gráfico de pizza ou 3D na Q4.
- Segmentação sem Conexões de Relatório: filtra só a TD_Mes.
