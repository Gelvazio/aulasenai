# Capítulo 09 — Planilhas: Análise Visual e Gráficos

- **Aula:** 09
- **Capacidade:** C3, S4

## Teoria

### Qual rota mais atrasa?

A gerência da **Distribuidora Vale Norte** fez uma pergunta simples: "qual rota mais atrasou as
entregas em outubro?". A planilha tem 300 linhas, uma por entrega. Olhando linha por linha,
ninguém responde em menos de uma hora. Com **filtro**, um **quadro-resumo** e um **gráfico** bem
escolhido, a resposta aparece em segundos — e abre espaço para a pergunta mais importante: **por
que** essa rota atrasa e o que dá para melhorar.

> 🎯 **Objetivos do capítulo:** **classificar e filtrar** dados para análise, montar **quadros e
> tabelas-resumo**, escolher e construir o **gráfico** adequado, **interpretar** o resultado (como
> o indicador de entregas no prazo), **analisar o problema** e **imprimir** o resultado.

### Da planilha de entregas ao quadro-resumo

A planilha de entregas tem, em cada linha: data, rota, cliente, prazo combinado, data da entrega
e uma coluna **Situação** com `=SE(entrega<=prazo;"No prazo";"Atrasada")` (função SE, capítulo 8).

O **quadro-resumo** (tabela-resumo) condensa as 300 linhas no que interessa para decidir:

| Rota | Entregas | No prazo | Atrasadas | % no prazo |
|---|---|---|---|---|
| Norte | 80 | 76 | 4 | 95% |
| Sul | 70 | 63 | 7 | 90% |
| Leste | 90 | 72 | 18 | 80% |
| Oeste | 60 | 57 | 3 | 95% |
| **Total** | **300** | **268** | **32** | **89%** |

**Boa apresentação do quadro:** cabeçalho em negrito com fundo suave, textos à esquerda,
números à direita, porcentagens com o mesmo número de casas e uma linha de total.

### Classificar e filtrar para analisar

- **Filtrar** a coluna Rota por "Leste" e a coluna Situação por "Atrasada" mostra só as 18
  entregas problemáticas — e a barra de status conta quantas linhas ficaram visíveis.
- **Classificar** o quadro-resumo pela coluna "% no prazo", do menor para o maior, coloca a rota
  pior no topo.
- Antes de classificar, selecione **toda a tabela** (ou use o filtro do cabeçalho) para não
  separar a rota dos seus números.
- **Validação de dados** ajuda a manter a análise confiável: uma **lista suspensa** com as rotas
  impede que alguém digite "Leste", "leste" e "LESTE" como se fossem rotas diferentes.

### Que gráfico usar? A pergunta decide

| Pergunta | Gráfico | Exemplo na Vale Norte |
|---|---|---|
| Comparar valores entre categorias | **Colunas** | Entregas atrasadas por rota |
| Comparar muitas categorias ou nomes longos | **Barras** (horizontais) | Atrasos por cliente |
| Mostrar evolução no tempo | **Linhas** | % no prazo de janeiro a outubro |
| Mostrar partes de um todo (até 5 fatias, somando 100%) | **Setores (pizza)** | Motivos dos atrasos: trânsito, carga, endereço |

### Montando o gráfico

1. Selecione o **quadro-resumo** com os cabeçalhos (ex.: colunas Rota e Atrasadas).
2. **Inserir → Gráfico** e escolha o tipo.
3. Confira se as **categorias** (rotas) estão no eixo certo.
4. Complete os elementos:
   - **título** que diga o que é medido e o período: "Entregas atrasadas por rota — outubro/2026";
   - **eixos** com rótulos e unidade (entregas, %);
   - **rótulos de dados** (o número em cima de cada coluna);
   - **legenda** só quando houver **duas ou mais séries** (ex.: Meta × Realizado); com uma série
     só, a legenda é desnecessária.

### Interpretar: o gráfico precisa virar decisão

O **indicador** (KPI) de entregas no prazo = entregas no prazo ÷ total. Com meta de 95%:

- **Aderência à meta:** Norte e Oeste atingem 95%; Sul fica perto (90%); **Leste, com 80%, está
  bem abaixo** e concentra 18 dos 32 atrasos (mais da metade).
- **Tendência:** num gráfico de linhas mês a mês, o indicador está subindo ou caindo?
- **Variabilidade:** há meses com quedas bruscas? Elas coincidem com algo (chuva, obras, novo
  motorista)?

**Análise do problema (S4):** o gráfico mostra **onde** está o problema; a análise busca o
**porquê**. Para a rota Leste, levante hipóteses (trânsito em horário de pico, excesso de
entregas por viagem, endereços incompletos, saída tardia da doca), confira com os dados
(filtre as entregas atrasadas e veja horários, clientes e motivos) e proponha melhorias que
possam ser medidas no mês seguinte.

### Gráficos que enganam

- **Eixo truncado:** se o eixo das colunas começa em 85% e não em 0%, uma diferença de 90% para
  95% parece enorme. Em colunas e barras, comece o eixo no **zero** (ou avise claramente).
- **Efeito 3D:** distorce o tamanho das colunas e fatias; em documentos técnicos, use **2D**.
- **Pizza com muitas fatias:** acima de 5, ninguém compara; use barras.
- **Cores:** use bom contraste e rótulos diretos; evite depender só de vermelho × verde, que
  pessoas com daltonismo não diferenciam.

### Levar para o relatório e para a impressão

- **Colar como imagem:** o gráfico fica "congelado" com os dados daquele dia.
- **Colar como objeto vinculado:** o gráfico no relatório ou no slide se atualiza quando a
  planilha muda (útil para relatórios mensais).
- **Impressão:** selecione o quadro e o gráfico e defina a **área de impressão**; use **paisagem**
  e **ajustar a uma página**; confira se as cores continuam legíveis em preto e branco; veja a
  **visualização de impressão** antes.

## Vídeos

- [Quando usar cada gráfico (linhas, setores e colunas/barras)?](https://www.youtube.com/watch?v=ECH16Pb4q6M) — 07:15 — Calcula rápido - Renan Marcel
- [Como criar gráficos no Excel para iniciantes](https://www.youtube.com/watch?v=FrypMTi2HiY) — 11:48 — Curso de Excel Online
- [Como criar gráfico no Google Planilhas](https://www.youtube.com/watch?v=GH-JHN_qxkQ) — 14:43 — Flávio Moita
- [Gráficos de linha enganosos](https://www.youtube.com/watch?v=oQXjKi5w-WA) — 04:57 — Khan Academy Brasil

## Exercícios

### ITEM 1
- **Capacidade:** C3, S4
- **Contexto:** Use o quadro-resumo de outubro do capítulo (rotas Norte, Sul, Leste e Oeste, com entregas, atrasos e % no prazo). A meta da empresa é 95% de entregas no prazo.
- **Comando:** Indique qual rota mais atrasa e qual gráfico mostraria isso melhor, interprete o resultado em relação à meta e proponha duas hipóteses de causa e uma melhoria para a rota com pior resultado.
- **Linhas:** 7

### ITEM 2
- **Capacidade:** C3
- **Contexto:** A gerência quer quatro gráficos: (a) % de entregas no prazo de janeiro a outubro; (b) atrasos por rota em outubro; (c) motivos dos atrasos (trânsito, carga mal arrumada, endereço incorreto); (d) atrasos de 15 clientes com nomes longos.
- **Comando:** Escolha o tipo de gráfico mais adequado para cada pedido e justifique cada escolha.
- **Linhas:** 5

### ITEM 3
- **Capacidade:** C3
- **Contexto:** Você vai criar um gráfico comparando, por rota, a meta (95%) e o resultado realizado de outubro.
- **Comando:** Descreva os passos para criar o gráfico e os elementos que ele precisa ter (título, eixos, rótulos e legenda), explicando por que, nesse caso, a legenda é necessária.
- **Linhas:** 5

### ITEM 4
- **Capacidade:** C3
- **Contexto:** Na planilha com as 300 entregas de outubro, o supervisor quer ver só as entregas atrasadas da rota Leste, da mais antiga para a mais recente.
- **Comando:** Explique como usar filtro e classificação para obter essa lista sem perder nem apagar dados, e como a validação de dados por lista suspensa evitaria erros na coluna Rota.
- **Linhas:** 5

### ITEM 5
- **Capacidade:** C3, S4
- **Contexto:** Num relatório da transportadora, o gráfico de colunas de "% no prazo" tem o eixo começando em 85%, e a coluna da rota Sul (90%) parece ter metade do tamanho da rota Norte (95%).
- **Comando:** Explique por que o gráfico engana, como corrigi-lo e por que é importante analisar criticamente gráficos antes de tomar decisões.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C3
- **Contexto:** O quadro-resumo e o gráfico de outubro precisam entrar no relatório mensal da expedição, que é atualizado todo mês, e também ser impressos para a reunião em uma única folha.
- **Comando:** Indique como inserir o gráfico no relatório para que ele se atualize sozinho e quais configurações de impressão usar para caber em uma folha legível.
- **Linhas:** 4

## Resumo

- **Filtrar** mostra só o que interessa; **classificar** ordena; **validação** (lista suspensa) mantém os dados padronizados.
- O **quadro-resumo** condensa centenas de linhas nos números que importam para decidir.
- A **pergunta** define o gráfico: colunas (comparar), barras (muitas categorias), linhas (tempo), pizza (partes de um todo, até 5 fatias).
- Gráfico profissional tem **título com período, eixos com unidade, rótulos** e legenda só com duas ou mais séries.
- **Interpretar** é comparar com a meta, ver tendência e variabilidade e **analisar o problema** até chegar a causas e melhorias.
- Cuidado com **eixo truncado**, 3D e cores sem contraste; leve o gráfico ao relatório (imagem ou vínculo) e confira a impressão.

## Glossário

- **Gráfico:** representação visual de dados numéricos de uma tabela.
- **Quadro-resumo:** tabela que condensa os dados brutos em totais e indicadores.
- **Eixo:** linha de referência do gráfico (horizontal = categorias ou tempo; vertical = valores).
- **Série de dados:** conjunto de valores representado com uma mesma cor no gráfico.
- **Legenda:** guia que identifica as cores ou séries de um gráfico.
- **Rótulo de dados:** número exibido junto de cada coluna, barra ou ponto.
- **Indicador (KPI):** medida usada para acompanhar o desempenho em relação a uma meta.
- **Gráfico de linhas:** gráfico indicado para mostrar a evolução de valores ao longo do tempo.
- **Gráfico de setores (pizza):** gráfico que mostra as partes de um todo que soma 100%.
- **Eixo truncado:** eixo de valores que não começa no zero e pode exagerar diferenças.
