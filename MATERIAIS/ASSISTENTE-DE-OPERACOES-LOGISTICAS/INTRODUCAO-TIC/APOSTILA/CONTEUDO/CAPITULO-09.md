# Capítulo 09 — Planilhas: Análise Visual e Gráficos

- **Aula:** 09
- **Capacidade:** C3, S4

## Teoria

### Classificação e filtro para analisar

A gerência da **Distribuidora Vale Norte** quer saber qual rota mais atrasou em outubro. São 300
linhas, uma por entrega, com a coluna **Situação** `=SE(entrega<=prazo;"No prazo";"Atrasada")`.
**Filtrar** Rota = "Leste" e Situação = "Atrasada" mostra só as entregas problemáticas;
**classificar** o resumo por "% no prazo" põe a pior rota no topo. Uma **lista suspensa**
(validação de dados) evita "Leste", "leste" e "LESTE" como rotas diferentes.

### Quadros e tabelas

O **quadro-resumo** condensa as 300 linhas no que importa para decidir:

| Rota | Entregas | No prazo | Atrasadas | % no prazo |
|---|---|---|---|---|
| Norte | 80 | 76 | 4 | 95% |
| Sul | 70 | 63 | 7 | 90% |
| Leste | 90 | 72 | 18 | 80% |
| Oeste | 60 | 57 | 3 | 95% |
| **Total** | **300** | **268** | **32** | **89%** |

Cabeçalho em negrito, números à direita e linha de total.

### Gráficos: a pergunta decide

| Pergunta | Gráfico |
|---|---|
| Comparar categorias | **Colunas** (atrasos por rota) |
| Muitas categorias ou nomes longos | **Barras** (atrasos por cliente) |
| Evolução no tempo | **Linhas** (% no prazo por mês) |
| Partes de um todo (até 5 fatias) | **Setores** (motivos dos atrasos) |

Selecione o quadro com os cabeçalhos → **Inserir → Gráfico** → complete com **título com período**
("Entregas atrasadas por rota — outubro/2026"), **eixos** com unidade, **rótulos de dados** e
**legenda** só com duas ou mais séries. Cuidado com gráficos que enganam: **eixo truncado** (comece
no zero), efeito 3D, pizza com muitas fatias e cores sem contraste.

### Interpretar e analisar o problema

O **indicador** de entregas no prazo = no prazo ÷ total. Com meta de 95%, Norte e Oeste atingem;
**Leste, com 80%, concentra 18 dos 32 atrasos**. Veja também a tendência mês a mês. O gráfico mostra
**onde** está o problema; a análise (S4) busca o **porquê**: levante hipóteses (trânsito no pico,
excesso de entregas por viagem, endereços incompletos), confira nos dados filtrados e proponha
melhorias mensuráveis.

### Impressão

Defina a **área de impressão** com quadro e gráfico, use paisagem e **ajustar a uma página**,
confira a legibilidade em preto e branco e a **visualização de impressão**. Para o relatório, cole
o gráfico como imagem (fixo) ou como objeto vinculado (atualiza com a planilha).

## Resumo

- Filtrar e classificar destacam o problema; validação padroniza os dados.
- O quadro-resumo condensa os dados; a pergunta define o gráfico.
- Gráfico com título, eixos, rótulos e legenda só quando há mais de uma série.
- Interpretar = comparar com a meta e analisar causas e melhorias; conferir a impressão.

## Glossário

- **Quadro-resumo:** tabela que condensa os dados brutos em totais e indicadores.
- **Indicador (KPI):** medida usada para acompanhar o desempenho em relação a uma meta.
- **Legenda:** guia que identifica as cores ou séries de um gráfico.
- **Eixo truncado:** eixo de valores que não começa no zero e pode exagerar diferenças.
