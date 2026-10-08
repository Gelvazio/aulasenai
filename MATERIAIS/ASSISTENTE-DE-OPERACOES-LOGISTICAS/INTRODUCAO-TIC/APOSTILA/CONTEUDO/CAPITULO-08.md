# Capítulo 08 — Editor de Planilhas: Organização e Fórmulas

- **Aula:** 08
- **Capacidade:** C3

## Teoria

### Funções básicas da planilha

No almoxarifado da **Distribuidora Vale Norte**, a contagem é feita num caderno e a comparação com
o estoque mínimo é feita de cabeça. Uma **planilha** faz as contas sozinha e **avisa** quando um
item chega ao mínimo. Os recursos são os mesmos no Excel, nas Planilhas Google e no LibreOffice
Calc.

### Linhas, colunas e endereços

- **Pasta de trabalho** é o arquivo, com várias **abas** ("Estoque", "Pedidos").
- **Colunas** têm letras (A, B, C) e **linhas** têm números (1, 2, 3).
- **Célula** é a interseção de linha e coluna (B4); o **endereço** é a letra da coluna + o número
  da linha. **Intervalo** é um conjunto de células: `C2:C16`.

### Formatação de células

Use o tipo certo de dado: número sem texto junto ("15 un" não entra em cálculo), data formatada
como data e moeda formatada (não digite "R$"). Textos à esquerda e números à direita, cabeçalho em
negrito com borda e preenchimento. `#####` indica coluna estreita. A **formatação condicional**
pinta de vermelho o estoque abaixo do mínimo.

### Fórmulas básicas

Toda fórmula começa com **=** e usa endereços: `=C2-D2` recalcula sozinha. Ao copiar, a
referência **relativa** (`C2`) muda e a **absoluta** (`$H$1`) fica fixa.

| Função | Exemplo |
|---|---|
| **SOMA** | `=SOMA(C2:C16)` → total em estoque |
| **MÉDIA** | `=MÉDIA(C2:C16)` → estoque médio por item |
| **CONT.VALORES** | `=CONT.VALORES(B2:B16)` → itens cadastrados |
| **SE** | `=SE(C2<=D2;"REPOR";"OK")` → alerta de mínimo |

**SE** segue `=SE(teste; se_verdadeiro; se_falso)`.

| Código | Produto | Atual (C) | Mínimo (D) | Situação (E) |
|---|---|---|---|---|
| A01 | Luva nitrílica M | 120 | 100 | OK |
| A02 | Fita adesiva 48 mm | 35 | 50 | REPOR |
| A03 | Filme stretch | 18 | 20 | REPOR |
| A04 | Etiqueta térmica | 64 | 40 | OK |

A fórmula da E2 é copiada para as linhas de baixo; abaixo da tabela ficam o total, a média e a
quantidade de itens.

### Classificação e filtro

**Classificar** ordena (ex.: do menor para o maior estoque) — selecione a tabela inteira para não
separar produto e quantidade. **Filtrar** mostra só as linhas que interessam (ex.: REPOR), sem
apagar as outras. **Congelar painéis** mantém o cabeçalho visível.

### Configuração de página e impressão

Paisagem para tabelas largas, **área de impressão**, **ajustar a uma página de largura**, títulos
repetidos e cabeçalho/rodapé com nome, data e página. Confira a **visualização de impressão**.

## Resumo

- Linhas (números), colunas (letras) e células com endereço (B4); intervalos como `C2:C16`.
- Tipo de dado e formatação certos; formatação condicional destaca alertas.
- Fórmulas começam com =; SOMA, MÉDIA, CONT.VALORES e SE controlam o estoque.
- Classificar ordena, filtrar mostra o que interessa; configure a página antes de imprimir.

## Glossário

- **Célula:** interseção de linha e coluna (B4).
- **Intervalo:** conjunto de células, como C2:C16.
- **Função:** fórmula pronta com nome, como SOMA, MÉDIA, CONT.VALORES e SE.
- **Filtro:** recurso que mostra só as linhas que atendem a um critério.
