# Capítulo 05 — Planilhas Simples e Boas Práticas de Pesquisa

- **Aula:** 05
- **Capacidade:** C1, C6, C7

## Teoria

### Quanto você gasta por semana?

Lucas jura que gasta "quase nada" com lanches. Quando anotou tudo numa planilha, descobriu que
eram R$ 62,00 por semana — o preço de um fone novo por mês. Planilhas transformam números soltos em
**informação**. E, para decidir bem, também é preciso saber **pesquisar** em fontes confiáveis.

> 🎯 **Objetivos do capítulo:** montar uma planilha com fórmulas de soma e média e um gráfico,
> apresentar o resultado em um slide, pesquisar com eficiência no navegador e avaliar se uma fonte
> é confiável.

### Planilhas simples

**Google Sheets**, **Excel** e **LibreOffice Calc** organizam dados em uma grade.

- **Coluna:** identificada por letra (A, B, C...).
- **Linha:** identificada por número (1, 2, 3...).
- **Célula:** o encontro de uma coluna com uma linha, como **B3**.
- **Intervalo:** um grupo de células, como **B2:B8** (de B2 até B8).

### Fórmulas

Toda fórmula começa com o sinal de **=**.

| Fórmula | O que faz | Exemplo |
|---|---|---|
| `=B2+B3` | Soma duas células | 8,00 + 12,50 = 20,50 |
| `=SOMA(B2:B8)` | Soma um intervalo | Total da semana |
| `=MÉDIA(B2:B8)` | Calcula a média | Gasto médio por dia |
| `=MÁXIMO(B2:B8)` | Maior valor | Dia em que mais gastou |
| `=MÍNIMO(B2:B8)` | Menor valor | Dia em que menos gastou |

📊 **Planilha de gastos da semana:**

| | A | B |
|---|---|---|
| 1 | **Dia** | **Gasto (R$)** |
| 2 | Segunda | 8,00 |
| 3 | Terça | 12,50 |
| 4 | Quarta | 6,00 |
| 5 | Quinta | 15,00 |
| 6 | Sexta | 10,50 |
| 7 | Sábado | 10,00 |
| 8 | Domingo | 0,00 |
| 9 | **Total** | `=SOMA(B2:B8)` → 62,00 |
| 10 | **Média** | `=MÉDIA(B2:B8)` → 8,86 |

🔑 **Ponto-chave:** se você muda um valor, a fórmula recalcula sozinha. É por isso que se usa
fórmula, e não a calculadora.

### Gráficos e o slide do resultado

Selecione os dados (A1:B8) → **Inserir → Gráfico**. Gráfico de **colunas** compara dias; gráfico de
**pizza** mostra partes de um total. Copie o gráfico para um slide com um título que diga a
conclusão, por exemplo: **"Quinta é o dia em que mais gasto: R$ 15,00"**.

### Mini portfólio digital

Com o currículo (documento), os 5 slides e a planilha, você completa o **mini portfólio digital**.
Guarde tudo numa pasta organizada: `Portfolio > 01-Documento`, `02-Slides`, `03-Planilha`.

### Navegadores e buscadores

- **Navegador:** programa que abre sites (Chrome, Edge, Firefox, Safari).
- **Buscador:** site que encontra páginas (Google, Bing, DuckDuckGo).
- **Site / endereço (URL):** como `www.sc.senai.br`.

| Técnica de pesquisa | Exemplo |
|---|---|
| Palavras-chave em vez de frases longas | `impressora 3D preço escola` |
| Aspas para a frase exata | `"pensamento computacional"` |
| Sinal de menos para excluir | `scratch -gato` |
| `site:` para buscar num site | `robótica site:gov.br` |
| Filtro de data e de tipo (imagens, notícias) | Ferramentas → Qualquer data → Último ano |

### Como avaliar uma fonte

| Pergunta | Fonte confiável |
|---|---|
| Quem escreveu? | Tem autor ou instituição identificada |
| Quando? | Tem data e está atualizada |
| Onde foi publicado? | Órgão público, universidade, jornal conhecido |
| Mostra de onde tirou os dados? | Cita referências |
| Outras fontes confirmam? | Sim, pelo menos uma segunda fonte |

🔍 **Exemplo:** antes de comprar uma impressora, a **TecVale** comparou a página do fabricante, a
avaliação de um site de tecnologia conhecido e a opinião de outra escola que usa o modelo.

## Vídeos

- ⏳ Vídeos pendentes: escolher de 1 a 4 vídeos de até 15 min e conferir localmente a duração (TASKS.md #12).

## Exercícios

### ITEM 1
- **Capacidade:** C1
- **Contexto:** Você anotou seus gastos com lanches de segunda a domingo nas células B2 a B8 de uma planilha.
- **Comando:** Escreva as fórmulas para calcular o total e a média da semana e explique por que é melhor usar fórmula do que somar na calculadora.
- **Linhas:** 4

### ITEM 2
- **Capacidade:** C1, C6
- **Contexto:** Você precisa apresentar o resultado da sua planilha de gastos em um único slide para a turma.
- **Comando:** Diga que tipo de gráfico usaria, que título colocaria no slide e que conclusão ele deve mostrar.
- **Linhas:** 4

### ITEM 3
- **Capacidade:** C1
- **Contexto:** Na planilha, a célula B5 tem 15,00 e a fórmula em B9 é =SOMA(B2:B8).
- **Comando:** Explique o que significam "B5" e "B2:B8" e o que acontece com B9 se você mudar o valor de B5 para 20,00.
- **Linhas:** 4

### ITEM 4
- **Capacidade:** C1
- **Contexto:** Você precisa achar informações sobre "pensamento computacional", mas a busca traz milhares de resultados que não ajudam.
- **Comando:** Escreva duas buscas melhores usando técnicas de pesquisa (aspas, sinal de menos, site: ou filtro) e explique cada uma.
- **Linhas:** 4

### ITEM 5
- **Capacidade:** C7
- **Contexto:** Duas notícias dizem o contrário uma da outra: uma afirma que "celulares serão proibidos em todas as escolas no mês que vem"; a outra, que "não há nenhuma lei sobre isso".
- **Comando:** Explique como descobrir qual é confiável, usando as perguntas de avaliação de fontes.
- **Linhas:** 5

### ITEM 6
- **Capacidade:** C6
- **Contexto:** A TecVale quer saber quanto a equipe gasta com café e pediu uma solução simples.
- **Comando:** Proponha como organizar a planilha (colunas, fórmulas e gráfico) e uma ideia criativa para apresentar o resultado na reunião de sexta.
- **Linhas:** 5

## Resumo

- Planilhas organizam dados em **colunas** (letras), **linhas** (números) e **células** (como B3).
- Fórmulas começam com **=**: `=SOMA()`, `=MÉDIA()`, `=MÁXIMO()`, `=MÍNIMO()`; o resultado muda sozinho quando os dados mudam.
- **Gráficos** transformam números em imagem; um slide com o gráfico e uma conclusão fecha o mini portfólio.
- O **navegador** abre sites e o **buscador** encontra páginas; palavras-chave, aspas, sinal de menos e filtros melhoram a pesquisa.
- Fonte confiável tem **autor, data, referências** e é confirmada por **outra fonte**.

## Glossário

- **Planilha:** programa ou arquivo que organiza dados em linhas e colunas e faz cálculos.
- **Célula:** encontro de uma coluna com uma linha, identificado como B3.
- **Intervalo:** conjunto de células, como B2:B8.
- **Fórmula:** instrução que começa com = e faz um cálculo na planilha.
- **Gráfico:** representação visual dos dados (colunas, pizza, linhas).
- **Navegador:** programa que abre sites (Chrome, Edge, Firefox).
- **Buscador:** site que encontra páginas na internet (Google, Bing).
- **URL:** endereço de uma página na internet.
- **Palavra-chave:** termo principal usado numa pesquisa.
- **Fonte confiável:** origem de informação com autor, data e referências, confirmada por outras fontes.
