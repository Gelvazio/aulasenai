# Capítulo 08 — Editor de Planilhas: Organização e Fórmulas

- **Aula:** 08
- **Capacidade:** C3

## Teoria

### Do caderno de contagem para a planilha

No almoxarifado da **Distribuidora Vale Norte**, a contagem de estoque ainda é feita num caderno.
Para saber se um item precisa ser reposto, alguém compara, de cabeça, a quantidade contada com o
estoque mínimo. Erros de soma, itens esquecidos e pedidos de compra atrasados são comuns. Uma
**planilha** bem organizada faz as contas sozinha e **avisa** quando um item chega ao mínimo.

> 🎯 **Objetivos do capítulo:** organizar dados em **linhas, colunas e células**, **formatar** a
> planilha, usar **fórmulas e funções básicas** (SOMA, MÉDIA, CONT.VALORES e SE), **classificar e
> filtrar** e **configurar a página para impressão**.

### Anatomia da planilha

- **Pasta de trabalho:** o arquivo; pode ter várias **abas** (planilhas), como "Estoque" e "Pedidos".
- **Colunas** são identificadas por letras (A, B, C...) e **linhas** por números (1, 2, 3...).
- **Célula** é a interseção de linha e coluna (B4). O **endereço** da célula é a letra da coluna
  seguida do número da linha.
- **Intervalo** é um conjunto de células: `C2:C16` (da C2 até a C16).

Os recursos são os mesmos nas principais planilhas (Excel, Planilhas Google, LibreOffice Calc);
as funções em português têm os mesmos nomes.

### Tipos de dados

| Tipo | Exemplo | Cuidado |
|---|---|---|
| Texto | Luva nitrílica M | Não misture número com texto: "15 un" não entra em cálculo |
| Número | 15 | Use uma coluna para a unidade, se precisar |
| Data | 14/10/2026 | Formate como data para poder ordenar |
| Moeda | R$ 3,50 | Formate como moeda; não digite "R$" à mão |

### Formatação de células

- **Formato de número:** número, moeda, porcentagem, data.
- **Alinhamento:** textos à esquerda, números à direita; títulos centralizados sobre a tabela.
- **Bordas e preenchimento** no cabeçalho; **negrito** nos títulos.
- **Largura da coluna:** se aparecer `#####`, a coluna está estreita demais para o número.
- **Formatação condicional:** pinta a célula automaticamente (ex.: vermelho quando o estoque
  está abaixo do mínimo).

### Fórmulas: o coração da planilha

Toda fórmula começa com **=**. Operadores: `+` soma, `-` subtração, `*` multiplicação, `/`
divisão. Use **endereços**, não números fixos: `=C2-D2` é recalculado sozinho quando C2 muda.

- **Referência relativa** (`C2`): muda quando a fórmula é copiada para baixo (C3, C4...).
- **Referência absoluta** (`$H$1`): fica fixa ao copiar — útil para um valor único, como o custo
  de armazenagem por caixa guardado na célula H1.

### Funções básicas

| Função | O que faz | Exemplo na planilha de estoque |
|---|---|---|
| **SOMA** | Soma um intervalo | `=SOMA(C2:C16)` → total de unidades em estoque |
| **MÉDIA** | Calcula a média | `=MÉDIA(C2:C16)` → estoque médio por item |
| **CONT.VALORES** | Conta células preenchidas | `=CONT.VALORES(B2:B16)` → quantos itens estão cadastrados |
| **SE** | Testa uma condição e devolve um de dois resultados | `=SE(C2<=D2;"REPOR";"OK")` → alerta de estoque mínimo |

A função **SE** segue a lógica: `=SE(teste; valor_se_verdadeiro; valor_se_falso)`. No exemplo,
se o estoque atual (C2) for menor ou igual ao mínimo (D2), aparece **REPOR**; senão, **OK**.

### Exemplo: estoque de 15 itens com alerta de mínimo

| Código | Produto | Estoque atual (C) | Estoque mínimo (D) | Situação (E) |
|---|---|---|---|---|
| A01 | Luva nitrílica M (par) | 120 | 100 | OK |
| A02 | Fita adesiva 48 mm | 35 | 50 | REPOR |
| A03 | Filme stretch (rolo) | 18 | 20 | REPOR |
| A04 | Etiqueta térmica (rolo) | 64 | 40 | OK |
| A05 | Palete PBR | 42 | 30 | OK |
| A06 | Cantoneira de papelão | 300 | 250 | OK |
| A07 | Caixa de papelão G | 90 | 120 | REPOR |
| A08 | Caixa de papelão M | 210 | 150 | OK |
| A09 | Saco plástico 60 L | 500 | 400 | OK |
| A10 | Lacre numerado | 950 | 1000 | REPOR |
| A11 | Bateria do coletor | 6 | 4 | OK |
| A12 | Óculos de proteção | 25 | 20 | OK |
| A13 | Capacete | 12 | 10 | OK |
| A14 | Ribbon para impressora | 9 | 10 | REPOR |
| A15 | Marcador permanente | 40 | 30 | OK |

Os dados começam na linha 2 (a linha 1 é o cabeçalho). Na célula E2 vai `=SE(C2<=D2;"REPOR";"OK")`
e a fórmula é **copiada** até a E16. Embaixo da tabela: total (SOMA), média (MÉDIA) e quantidade de
itens (CONT.VALORES). Com esses dados, um **gráfico de colunas** comparando estoque atual e mínimo
mostra rapidamente o que precisa ser reposto (gráficos são o tema do capítulo 9).

### Classificação e filtro

- **Classificar:** ordena os dados (de A a Z, do menor para o maior) — ex.: produtos do menor para
  o maior estoque. Selecione **a tabela inteira** antes, para não separar o produto da sua
  quantidade.
- **Filtrar:** mostra só as linhas que interessam — ex.: só os itens com situação **REPOR**. As
  outras linhas ficam escondidas, não apagadas.
- **Congelar painéis:** mantém o cabeçalho visível ao rolar uma lista longa.

### Configuração de página e impressão

- **Orientação** paisagem para tabelas largas; **margens** estreitas quando necessário.
- **Área de impressão:** imprime só o intervalo escolhido.
- **Ajustar a uma página de largura:** evita a tabela cortada em várias folhas.
- **Repetir a linha de títulos** em todas as páginas e colocar **cabeçalho/rodapé** com o nome do
  relatório, a data e o número da página.
- Sempre confira a **visualização de impressão** antes de imprimir.

## Vídeos

- [Como usar SOMA, MÉDIA, MÍNIMO e MÁXIMO passo a passo](https://www.youtube.com/watch?v=xokwgKhcGOo) — 09:09 — Érika Melo
- [Como usar a função SE no Google Planilha](https://www.youtube.com/watch?v=1FX0whI33u8) — 04:52 — As dicas de informatica
- [Como usar Classificar e Filtrar no Excel](https://www.youtube.com/watch?v=PBqXGDfzZPE) — 08:45 — Curso de Excel Online
- [Planilha de controle de estoque](https://www.youtube.com/watch?v=Ohvui4-ili8) — 03:50 — Smart Planilhas

## Exercícios

### ITEM 1
- **Capacidade:** C3
- **Contexto:** A contagem de estoque do almoxarifado é feita em papel, e ninguém percebe a tempo quando um item chega ao estoque mínimo.
- **Comando:** Descreva como montar a planilha de controle: quais colunas criar, em que linha começam os dados, que fórmula usar para o alerta de estoque mínimo e como formatar a coluna do alerta para destacar os itens a repor.
- **Linhas:** 6

### ITEM 2
- **Capacidade:** C3
- **Contexto:** Use a tabela de 15 itens do capítulo (estoque atual na coluna C, das linhas 2 a 16; mínimo na coluna D; produtos na coluna B).
- **Comando:** Escreva as fórmulas para: (a) total de unidades em estoque; (b) estoque médio por item; (c) quantidade de itens cadastrados; (d) situação do item da linha 2. Explique o que cada uma faz.
- **Linhas:** 6

### ITEM 3
- **Capacidade:** C3
- **Contexto:** O custo de armazenagem por unidade (R$ 0,40) está na célula H1. Na coluna F, você quer calcular o custo de cada item multiplicando o estoque (coluna C) por esse valor e copiar a fórmula para os 15 itens.
- **Comando:** Escreva a fórmula da célula F2 e explique por que ela precisa de referência absoluta ($) em H1. O que aconteceria sem o $ ao copiar a fórmula para baixo?
- **Linhas:** 4

### ITEM 4
- **Capacidade:** C3
- **Contexto:** O supervisor pediu uma lista só com os itens que precisam ser repostos, do menor para o maior estoque, para montar o pedido de compra.
- **Comando:** Explique, passo a passo, como usar filtro e classificação para obter essa lista sem apagar nenhum dado da planilha.
- **Linhas:** 4

### ITEM 5
- **Capacidade:** C3
- **Contexto:** Ao imprimir a planilha de estoque, ela saiu em três folhas, com a última coluna sozinha numa página e sem o cabeçalho nas folhas seguintes.
- **Comando:** Indique as configurações de página e de impressão que resolvem o problema e o que conferir antes de imprimir de novo.
- **Linhas:** 4

### ITEM 6
- **Capacidade:** C3
- **Contexto:** Na planilha de um colega aparecem três problemas: a quantidade foi digitada como "15 un", uma coluna mostra "#####" e a soma não inclui os itens novos colocados no fim da lista.
- **Comando:** Explique a causa de cada problema e como corrigi-lo.
- **Linhas:** 4

### ITEM 7
- **Capacidade:** C3
- **Contexto:** Na reunião semanal, a gerência quer ver, num relance, quais dos 15 itens estão abaixo do mínimo.
- **Comando:** Explique que gráfico você faria com a tabela (quais colunas selecionar e por quê) e como ele ajuda a decidir a reposição.
- **Linhas:** 4

## Resumo

- A planilha é organizada em **linhas** (números), **colunas** (letras) e **células** (endereço como B4); intervalos como `C2:C16`.
- Use o **tipo de dado** certo e **formate** células (moeda, data, bordas, formatação condicional).
- Fórmulas começam com **=** e usam endereços; **$** fixa uma referência ao copiar.
- **SOMA**, **MÉDIA**, **CONT.VALORES** e **SE** resolvem o controle de estoque, inclusive o alerta de mínimo.
- **Classificar** ordena; **filtrar** mostra só o que interessa, sem apagar dados.
- Configure orientação, área de impressão, ajuste à página e títulos repetidos e confira a visualização antes de imprimir.

## Glossário

- **Célula:** interseção de linha e coluna (B4).
- **Planilha:** grade de linhas e colunas para organizar dados e fazer cálculos.
- **Pasta de trabalho:** arquivo de planilha, que pode ter várias abas.
- **Intervalo:** conjunto de células, como C2:C16.
- **Fórmula:** cálculo que começa com o sinal de igual (=).
- **Função:** fórmula pronta com nome, como SOMA, MÉDIA, CONT.VALORES e SE.
- **Referência absoluta:** endereço fixado com $ (ex.: $H$1), que não muda ao copiar a fórmula.
- **Classificação:** ordenação dos dados por uma coluna.
- **Filtro:** recurso que mostra só as linhas que atendem a um critério.
- **Área de impressão:** intervalo definido para ser impresso.
