# RELATÓRIO DE CONTEÚDO DAS AULAS - ANÁLISE DE DADOS APLICADA À GESTÃO

**Data de Geração:** 2026-09-14
**Atualizado em:** 2026-09-27 — refeito a partir dos 7 `.md` desta pasta (que reproduzem os
`.pptx` 1 a 7 e acrescentam os complementos da ementa)
**Unidade curricular:** Análise de Dados Aplicada à Gestão
**Curso:** Aprendizagem Industrial — Assistente em Processos de Gestão e Controle de Materiais (456h)
**Carga Horária:** 32 horas (4 aulas × 8h)

> **Fonte da verdade:** `../EMENTA-CHALKIE-AI.md`. Em caso de divergência, a ementa vence.
> - **Fonte deste relatório:** os arquivos `1-` a `7-*.md` desta pasta, agrupados pelas 4 aulas da
>   ementa (1+2 → Aula 1 · 3+4 → Aula 2 · 5+6 → Aula 3 · 7 → Aula 4). Os `.md` reproduzem os
>   `.pptx` de mesmo nome, com as fórmulas que a exportação do Chalkie deixou vazias no `.pptx` e
>   com o contexto de gestão de materiais da ementa.
> - Slides `N.1`, `N.2`... são **complementos da ementa** e não existem no `.pptx`.
> - **Editor:** Excel ou LibreOffice Calc, com nomes das funções em português (PROCV, SE,
>   CONT.SE, SOMASE e SEERRO têm o mesmo nome nos dois).
> - **Contexto:** gestão de materiais (estoque, compras, armazenagem, fornecedores, custos).
> - A avaliação completa da UC (pesos, rubrica, recuperação) está no fim do arquivo.

---

## AULA 1: Matemática Aplicada à Gestão

**Total de Slides:** 82 (+ 6 complementos N.x)

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 1 — Matemática Aplicada à Gestão (8h)
> - **Conhecimentos [oficial]:** 1.1 Conjuntos numéricos · 1.2 Razão e proporção · 1.3 Regra de três · 1.4 Conversão de unidades · 1.5 Porcentagem · 1.6 Área, volume e peso · 1.7 Sequência lógica · 1.8 Estatística básica
> - **Capacidades:** C2 · S1 Pensamento crítico · S4 Resolução de problemas
> - **Indicadores de desempenho:** 1 (regra de três em compra e consumo) · 2 (aumento, desconto e variação de estoque) · 3 (conversões, área e volume) · 4 (média, mediana, moda e desvio padrão)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** 1 (parafusos) · 2 (aumento de 12% com desconto de 5%) · 3 (paletes no galpão) · 4 (média × mediana nas saídas)

### Arquivo `1-Matemática-Aplicada-à-Gestão-Parte-1.md` (41 slides + 4 complementos)

#### Slide 1 — Matemática Aplicada à Gestão: Parte 1

- Fundamentos numéricos, proporções e tomada de decisão corporativa.

#### Slide 2 — Um Erro de Cálculo Milionário?

- Se uma fábrica erra a proporção de insumos em apenas 2%, milhares de produtos podem ser perdidos. Como a matemática garante a sobrevivência de um negócio real?

#### Slide 3 — Objetivos da Nossa Aula

- CONCEITOS GERAIS

- Nesta aula inaugural, você desenvolverá competências matemáticas essenciais para o mercado corporativo:
- Identificar conjuntos numéricos em fluxos de caixa, inventários e medições.
- Aplicar razões e proporções para comparar métricas de produtividade e custos.
- Dominar regras de três simples e compostas para otimizar estoques e equipes.
- Converter unidades e calcular área, volume e peso na armazenagem.

#### Slide 4 — Vocabulário Essencial da Gestão

- Estoque Mínimo
- Quantidade limite antes de faltar produto.

- Razão
- Comparação direta entre duas grandezas corporativas.

- Insumo
- Material necessário para produzir bens ou serviços.

- Eficiência
- Capacidade de produzir mais gastando menos recursos.

#### Slide 5 — Conjuntos Numéricos no Negócio

- CONCEITOS GERAIS

- Toda informação contábil ou operacional pertence a um conjunto matemático específico. Saber diferenciar esses números impede erros grotescos de arredondamento em sistemas informatizados.

- 🧠

- Lembre-se
- Nem toda variável pode ser dividida: não vendemos meio caminhão ou um terço de funcionário!

#### Slide 6 — Naturais e Inteiros na Empresa

- Números Naturais (N)
- Contagem de unidades indivisíveis:
- Clientes atendidos.
- Caixas em estoque.
- Veículos na frota.

- Números Inteiros (Z)
- Valores negativos em finanças:
- Saldo bancário (débito/crédito).
- Lucro ou prejuízo contábil.
- Variação em câmaras frias.

#### Slide 7 — Racionais e Reais na Produção

- Números Racionais (Q)
- Fração, decimal ou dízima:
- Preços (ex: R$ 4,75).
- Descontos e taxas.
- Peso de insumos.

- Números Reais (R)
- Inclui irracionais para engenharia:
- Pi (π) em volume de tanques.
- Cálculo de depreciação contínua.

#### Slide 8 — Classificação de Dados Gerenciais

- O Perigo da Incompatibilidade
- Configurar tipos de dados incorretos em planilhas causa falhas:
- Itens: Números inteiros.
- Custos/Taxas: Decimais (2 a 4 casas).
- Perdas: Medidas contínuas (g/litros).

- ⚠️

- Atenção
- Dividir 10 caixas por 3 lojas gera dízimas. Lojas recebem apenas itens inteiros, nunca frações.

#### Slide 9 — Desafio: Identificando Conjuntos

- Um gestor de logística analisa três variáveis: número de funcionários, saldo bancário e peso do frete. A quais conjuntos pertencem essas grandezas?

- 1.

- Reais, Naturais e Inteiros

- 2.

- Inteiros, Racionais e Naturais

- 3.

- Naturais, Inteiros e Racionais

- 4.

- Racionais, Naturais e Inteiros

#### Slide 10 — Desafio: Identificando Conjuntos

- ✅

- Um gestor de logística analisa três variáveis: número de funcionários, saldo bancário e peso do frete. A quais conjuntos pertencem essas grandezas?

- 1.

- Reais, Naturais e Inteiros

- 2.

- Inteiros, Racionais e Naturais

- 3.

- Naturais, Inteiros e Racionais

- ✓

- 4.

- Racionais, Naturais e Inteiros

#### Slide 11 — Operações Básicas na Empresa

- OPERAÇÕES PRÁTICAS

- Adição, subtração, multiplicação e divisão formam a base do controle operacional. Na gestão, elas são combinadas para calcular receita bruta, ponto de equilíbrio, margem de contribuição e giro de estoques. A precisão nessas quatro operações determina a saúde financeira do negócio.

#### Slide 12 — Cálculo de Custo Unitário

- OPERAÇÕES PRÁTICAS

- Estrutura de Custos
- Custo unitário = (Fixos + Variáveis) / Produção:
- Fixos: Aluguel, salários, seguros (R$ 12k).
- Variáveis: Matéria-prima, energia (R$ 8k).
- Produção: 4.000 peças/mês.

- 🔍

- Exemplo
- Custo Unitário = (12k + 8k) / 4k = R$ 5,00/peça.

#### Slide 13 — Equilíbrio Operacional

- Entendendo a Margem
- Se o produto custa R$ 5,00 e é vendido por R$ 8,00, a margem unitária é:
- Preço de Venda: R$ 8,00
- Custo Variável: R$ 2,00
- Margem Bruta: R$ 6,00
- Essa margem cobre custos fixos e gera lucro operacional.

- 🔑

- Ponto-chave
- Sem margem positiva, vender mais aumenta o prejuízo.

#### Slide 14 — Verificando o Custo Unitário

- Se uma empresa dobrar a sua quantidade produzida mantendo os mesmos custos fixos, o custo fixo unitário por produto cairá pela metade.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

#### Slide 15 — Verificando o Custo Unitário

- ✅

- Se uma empresa dobrar a sua quantidade produzida mantendo os mesmos custos fixos, o custo fixo unitário por produto cairá pela metade.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- O valor fixo total é diluído por um número duas vezes maior de unidades produzidas.

- 🔑

#### Slide 16 — O Conceito de Razão

- Razão é o quociente a/b (b≠0). Na gestão, mede produtividade, liquidez e eficiência.

- Custo por Atendimento: Razão entre despesas e clientes.

- Peças por Hora: Razão entre produção total e tempo.

- Rotatividade: Razão entre saídas e estoque médio.

#### Slide 17 — Proporção: Igualdade de Razões

- Uma proporção é a igualdade matemática entre duas ou mais razões: a/b = c/d. A propriedade fundamental garante que o produto dos extremos é igual ao produto dos meios:
- a × d = b × c
- Se uma máquina produz 150 peças em 2 horas, esperamos que ela produza 300 peças em 4 horas sob as mesmas condições.

- 🧠

- Lembre-se
- Se a/b = c/d, qualquer incógnita pode ser isolada e calculada com exatidão.

#### Slide 18 — Direta ou Inversamente Proporcional?

- Diretamente Proporcional
- Quando uma grandeza sobe, a outra também:
- Mais entregas exigem mais combustível.
- Mais matéria-prima gera mais produtos.

- Inversamente Proporcional
- Quando uma grandeza sobe, a outra desce:
- Mais operários reduzem o tempo do lote.
- Maior velocidade reduz o tempo de viagem.

#### Slide 19 — Regra de Três Simples Direta

- Caso: Consumo de Embalagens
- Uma linha de produção gasta 45 kg de resina plástica para moldar 600 frascos de cosméticos. Quantos quilos de resina serão necessários para atender a um pedido urgente de 1.800 frascos?
- Montagem: 45 / 600 = x / 1.800
- Multiplicação cruzada: 600 × x = 45 × 1.800
- Resolução: 600x = 81.000 → x = 81.000 / 600 = 135 kg de resina.

#### Slide 20 — Regra de Três Simples Inversa

- Caso: Descarregamento
- 4 conferentes descarregam uma carreta em 6h. Com 8 conferentes de mesma produtividade, quanto tempo levará?
- Proporção inversa: 4 × 6 = 8 × x
- Resolução: 24 = 8x → x = 3 horas.

- ⚠️

- Atenção
- Não cruze valores em grandezas inversas! O produto das linhas deve ser constante.

#### Slide 21 — Checagem: Tipo de Relação

- Se um centro de distribuição aumenta a velocidade de separação de 50 pedidos por hora para 100 pedidos por hora, o tempo necessário para separar 500 pedidos:

- 1.

- Aumenta em 50%, pois há maior desgaste dos separadores.

- 2.

- Dobra de valor, pois velocidade e tempo são grandezas diretamente proporcionais.

- 3.

- Permanece exatamente igual, pois o volume do lote é fixo.

- 4.

- Cai pela metade, pois velocidade e tempo são inversamente proporcionais.

#### Slide 22 — Checagem: Tipo de Relação

- ✅

- Se um centro de distribuição aumenta a velocidade de separação de 50 pedidos por hora para 100 pedidos por hora, o tempo necessário para separar 500 pedidos:

- 1.

- Aumenta em 50%, pois há maior desgaste dos separadores.

- 2.

- Dobra de valor, pois velocidade e tempo são grandezas diretamente proporcionais.

- 3.

- Permanece exatamente igual, pois o volume do lote é fixo.

- ✓

- 4.

- Cai pela metade, pois velocidade e tempo são inversamente proporcionais.

#### Slide 23 — Regra de Três Composta

- Múltiplas Variáveis
- Processos fabris dependem de várias grandezas. A regra de três composta relaciona três ou mais fatores:
- Máquinas em operação.
- Horas diárias trabalhadas.
- Dias de produção.
- Peças produzidas.

- 🔑

- Ponto-chave
- Compare cada variável com a incógnita para definir a proporcionalidade.

#### Slide 24 — Passo a Passo da Regra Composta

- 1. Identificar
- Organizar as grandezas em colunas com suas respectivas unidades.

- 2. Analisar Sentido
- Fixar a coluna da incógnita e avaliar se as outras são diretas ou inversas.

- 3. Inverter Inversas
- Inverter as frações das grandezas inversamente proporcionais.

- 4. Resolver
- Igualar a razão principal ao produto das razões secundárias e calcular.

#### Slide 25 — Caso Real: Otimização Fabril

- O Problema da Fábrica de Caixas
- 6 máquinas, 8h/dia, produzem 1.200 caixas em 5 dias. Quantas caixas 9 máquinas, 10h/dia, produzem em 4 dias?
- Relação: mais máquinas/horas (+ caixas: direta); menos dias (- caixas: direta).
- Equação: 1.200 / x = (6/9) × (8/10) × (5/4)
- Multiplicando: (6 × 8 × 5) / (9 × 10 × 4) = 240 / 360 = 2/3
- 1.200 / x = 2/3 → 2x = 3.600 → x = 1.800 caixas.

#### Slide 26 — Etapas de Cálculo de Produção

- Ordene os passos lógicos que um gestor deve seguir ao aplicar uma regra de três composta para redimensionar sua equipe:

- Multiplicar as razões e isolar a incógnita para encontrar o resultado.

- Tabelar os dados conhecidos e identificar a grandeza desconhecida.

- Classificar cada grandeza como diretamente ou inversamente proporcional.

- Inverter os valores das grandezas identificadas como inversas.

#### Slide 27 — Etapas de Cálculo de Produção

- ✅

- Ordene os passos lógicos que um gestor deve seguir ao aplicar uma regra de três composta para redimensionar sua equipe:

- 1

- Tabelar os dados conhecidos e identificar a grandeza desconhecida.

- 2

- Classificar cada grandeza como diretamente ou inversamente proporcional.

- Inverter os valores das grandezas identificadas como inversas.

- 3

- 4

- Multiplicar as razões e isolar a incógnita para encontrar o resultado.

#### Slide 28 — Gestão de Materiais e Estoques

- Almoxarifado: cálculo de consumo, reposição e lote econômico.

- Consumo Médio Diário
- Demanda mensal / dias úteis:
- Demanda: 2.200 un
- Dias: 22
- Consumo: 100 un/dia

- Ponto de Pedido (PP)
- Momento de repor estoque:
- Prazo: 5 dias
- Seg.: 200 un
- PP: (100x5)+200=700 un

#### Slide 29 — Previsão de Insumos Críticos

- Fatores de Consumo Variável
- Gestores monitoram três variáveis para evitar desabastecimento:
- Taxa de Refugo: Perda média fabril.
- Sazonalidade: Picos de demanda.
- Lead Time: Atrasos na entrega.

- 🔍

- Exemplo
- Com 5% de perda, para entregar 1.000 itens, planeje insumos para 1.053 unidades.

#### Slide 29.1 — Situação-Problema: Quantas Caixas Comprar?

- O consumo de parafusos foi de 1.200 unidades em 8 dias. Quantas caixas de 250 unidades comprar para 30 dias?

- Regra de três direta: 1.200 un — 8 dias; x — 30 dias
- x = 1.200 × 30 ÷ 8 = 4.500 unidades
- Caixas: 4.500 ÷ 250 = 18 caixas

- Prova real: 18 × 250 = 4.500 un, e 4.500 ÷ 30 = 150 un/dia, igual a 1.200 ÷ 8.

- Atenção
- Se a divisão não der exata, arredonde para cima: não se compra meia caixa.

#### Slide 29.2 — Conversão de Unidades

- Conversões mais usadas no almoxarifado:

| Grandeza | Relação | Exemplo |
|---|---|---|
| Massa | 1 kg = 1.000 g · 1 t = 1.000 kg | 45 kg de resina = 45.000 g |
| Comprimento | 1 m = 100 cm · 1 cm = 10 mm | fita de 2,5 m = 250 cm |
| Área | 1 m² = 10.000 cm² | etiqueta de 50 cm² = 0,005 m² |
| Volume | 1 m³ = 1.000 L · 1 L = 1.000 mL | tanque de 2,5 m³ = 2.500 L |

- Exemplo: 45 kg de resina moldam 600 frascos. Quanto cada frasco usa?
- 45 kg = 45.000 g → 45.000 g ÷ 600 = 75 g por frasco.

- 🧠

- Lembre-se
- Converta tudo para a mesma unidade antes de comparar e escreva a unidade em cada resultado (kg com kg, m² com m², m³ com m³).

#### Slide 29.3 — Área, Volume e Peso na Armazenagem

- Área = comprimento × largura (m²)
- Volume = comprimento × largura × altura (m³)
- Peso total = quantidade × peso unitário (kg)

- Situação-problema: quantos paletes de 1,2 m × 1,0 m cabem num galpão de 18 m × 10 m, deixando um corredor central de 2 m?
- Área útil: 18 m × (10 m − 2 m) = 144 m²; área do palete: 1,2 × 1,0 = 1,2 m²
- Arranjo: 18 ÷ 1,2 = 15 paletes no comprimento; cada lado do corredor tem 4 m → 4 ÷ 1,0 = 4 fileiras
- Total: 15 × 4 × 2 lados = 120 paletes por nível (120 × 1,2 m² = 144 m² ✓)

- Atenção
- Confira sempre pelo arranjo (quantos cabem em cada lado), não só pela divisão de áreas: sobra de espaço não vira palete.

#### Slide 29.4 — Volume e Peso por Palete

- Caixa de 0,40 m × 0,30 m × 0,25 m = 0,03 m³ = 30 L; cada caixa pesa 12 kg.
- Carga máxima do palete: 1,2 m × 1,0 m × 1,5 m de altura.

- Pelo volume: 1,8 m³ ÷ 0,03 m³ = 60 caixas (valor teórico)
- Pelo arranjo: 1,2 ÷ 0,40 = 3 · 1,0 ÷ 0,30 = 3 (sobra 0,1 m) · 1,5 ÷ 0,25 = 6 → 3 × 3 × 6 = 54 caixas
- Peso: 54 × 12 kg = 648 kg, abaixo do limite de 1.000 kg do palete ✓

- Checagem rápida
- Um tanque de 1,5 m³ comporta quantos litros? A) 150 L · B) 1.500 L · C) 15.000 L — Resposta: B (1 m³ = 1.000 L).

#### Slide 30 — Calculadoras e Planilhas

- Automação para Evitar Erros
- Cálculo manual treina o raciocínio, mas usamos planilhas para agilidade:
- Fórmulas: Atualização instantânea ao mudar variáveis.
- Precisão: Elimina erros humanos em cálculos repetitivos.
- Simulações: O que ocorre se o insumo subir 10%?

- 🧠

- Lembre-se
- Planilhas seguem sua lógica. O pensamento crítico é insubstituível.

#### Slide 31 — A Matemática das Planilhas

- QUESTÃO 21 - AUDITOR PÚBLICO INTERNO (ADMINISTRAÇÃO) DA PREFEITURA MUNICIPAL DE GUARATINGUETÁ 2022

#### Slide 32 — Minimizando Erros de Análise

- Validação Numérica
- Desvios decimais em custos geram rombos contábeis. Práticas de validação:
- Estimativa: Verifique se o resultado faz sentido físico e financeiro.
- Prova Real: Multiplique custo unitário pela quantidade para conferir.
- Conferência Cruzada: Compare cálculos de dois sistemas ou pessoas.

#### Slide 33 — Teste Rápido de Gestão

- Pergunta 1:
- Se 5 caminhões transportam 120 toneladas de grãos, quantas toneladas transportarão 8 caminhões idênticos?

- Pergunta 2:
- Um estoque de 600 unidades atende a demanda diária de 30 unidades por quantos dias?

- Pergunta 3:
- Qual operação matemática básica é usada para encontrar o custo médio unitário a partir do custo total?

#### Slide 34 — Teste Rápido de Gestão

- ✅

- Resposta 1:
- 192 toneladas (120 ÷ 5 = 24 t por caminhão; 24 × 8 = 192 t).

- Resposta 2:
- 20 dias (600 ÷ 30 = 20 dias).

- Resposta 3:
- Divisão (Custo Total dividido pela Quantidade Produzida).

#### Slide 35 — Estudo de Caso: O Fornecedor A ou B?

- Decisão de Compra Corporativa
- Restaurante consome 1.200 kg/mês:
- Fornecedor A: 5 kg por R$ 26,00.
- Fornecedor B: 30 kg por R$ 150,00.
- Preço por quilo:
- Fornecedor A: R$ 5,20/kg.
- Fornecedor B: R$ 5,00/kg.
- Economia: 1.200 kg × R$ 0,20 = R$ 240,00/mês.

#### Slide 36 — Impacto da Precisão no Lucro

- CONCEITOS GERAIS

- Na gestão de alto desempenho, centavos importam. Em escala industrial de 500.000 unidades ao ano, uma economia proporcional de R$ 0,08 por unidade representa R$ 40.000,00 a mais no lucro líquido da organização.

- 🤯

- Curiosidade
- Grandes companhias aéreas já economizaram centenas de milhares de dólares ao retirar apenas uma azeitona das saladas servidas a bordo!

#### Slide 37 — Precisão Matemática e Eficiência

- Em sua opinião, um pequeno arredondamento de centavos em planilhas financeiras pode realmente colocar a saúde de uma grande empresa em risco? Como a precisão afeta a confiança dos clientes e acionistas?

#### Slide 38 — Precisão Matemática e Eficiência

- ✅

- Você poderia ter dito...
- Arredondamentos sucessivos podem acumular distorções de milhares de reais.
- Erros fiscais geram autuações e multas pesadas de órgãos reguladores.
- A confiabilidade dos relatórios contábeis sustenta o investimento.

#### Slide 39 — Síntese dos Aprendizados

- Razão e Proporção: Comparamos grandezas para medir produtividade, margens e custos unitários com precisão.

- Conjuntos Numéricos: Usamos Naturais, Inteiros e Racionais conforme a natureza de cada variável de gestão.

- Regra de Três: Dimensionamos estoques, equipes e processos fabris simples ou compostos sem desperdícios.

- Unidades, Área, Volume e Peso: convertemos antes de comparar e dimensionamos a armazenagem sempre com a unidade no resultado.

#### Slide 40 — Missão Prática: O Redimensionamento

- Equação: 720/1440 = (6/x) * (6/8)
- Grandezas: Encomendas (D), Operadores (I), Horas (I).
- Cálculo: 0,5 = 36/8x -> 4x = 36 -> x = 9 operadores.
- Contratações: 9 - 6 = 3 novos funcionários.

#### Slide 41 — Próximo Passo: Aula 2

- OPERAÇÕES PRÁTICAS

- Na próxima aula, avançaremos para o universo das Porcentagens Comerciais, Estatística Básica (média, mediana e moda) e Lógica de Previsão Empresarial.

- 🧠

- Lembre-se
- Revise as proporções calculadas hoje: elas serão a chave para entender as variações percentuais de mercado!

### Arquivo `2-Fundamentos-Matemáticos-para-Gestão.md` (41 slides + 2 complementos)

#### Slide 1 — Fundamentos Matemáticos para Gestão

- Parte 2: Porcentagem, Estatística Básica e Previsões

#### Slide 2 — Decisões que Mudam Rumos

- Você prefere ter um produto com 20% de margem ou vender o dobro com desconto? A matemática decide o futuro de empresas todos os dias.

#### Slide 3 — Objetivos da Aula de Hoje

- O que vamos dominar hoje:
- Calcular variações percentuais (inclusive de estoque), aumentos e descontos sucessivos, margens de lucro e impactos tributários.
- Determinar medidas estatísticas: média, mediana, moda e noções de dispersão com variância e desvio padrão.
- Identificar padrões em sequências lógicas e tabelas de frequência para prever tendências.

#### Slide 4 — Vocabulário-Chave da Gestão

- Média: Soma dos dados dividida pelo número total de observações.

- Variância: Medida que indica a dispersão dos dados em torno da média.

- Porcentagem: Razão base 100, usada para comparar partes e variações.

- Mediana: Valor central que divide um conjunto de dados ordenado.

#### Slide 5 — Recapitulando: Proporções na Gestão

- REVISÃO DA AULA 1

- Na aula passada, vimos como razões comparam grandezas e proporções igualam razões equivalentes. A regra de três permitiu dimensionar recursos, mão de obra e insumos produtivos com precisão.

- Lembre-se
- Em proporções diretas, o produto dos extremos iguala o dos meios: se a/b = c/d, então a · d = b · c.

- 🧠

#### Slide 6 — Quiz: Proporção no Estoque

- Um armazém utiliza 15 caixas organizadoras para acomodar 450 peças. Mantendo essa mesma proporção, quantas caixas serão necessárias para 1.200 peças?

- 1.

- 35 caixas

- 2.

- 50 caixas

- 3.

- 40 caixas

- 4.

- 30 caixas

#### Slide 7 — Quiz: Proporção no Estoque

- ✅

- Um armazém utiliza 15 caixas organizadoras para acomodar 450 peças. Mantendo essa mesma proporção, quantas caixas serão necessárias para 1.200 peças?

- 1.

- 35 caixas

- 2.

- 50 caixas

- 3.

- 40 caixas

- ✓

- 4.

- 30 caixas

#### Slide 8 — O Poder dos Percentuais

- FUNDAMENTOS MATEMÁTICOS

- A porcentagem traduz números absolutos em uma escala padrão de base 100, facilitando comparações imediatas entre grandezas distintas.
- Na gestão executiva, comparar 15 itens com defeito em 50 produzidos (30%) é muito mais alarmante do que 15 defeitos em 1.500 (1%).

- 🔑

- Ponto-chave
- Multiplicar por 0,15 equivale a extrair 15%; multiplicar por 1,15 aplica um acréscimo de 15%.

#### Slide 9 — Cálculo de Variação Percentual

- A variação percentual mede o crescimento ou queda de um indicador. A fórmula compara o valor final com o inicial:

- 🔍

- Exemplo
- Exemplo: Faturamento de R$ 80 mil para R$ 100 mil: (100-80)/80 = 0,25 ou +25%.

#### Slide 10 — Aplicações: Margem e Desconto

- Margem de Lucro
- Razão entre lucro líquido e receita total.
- Uma venda de R$ 200 com lucro de R$ 50 resulta em margem de 25%.

- Descontos Comerciais
- Reduções sobre o preço base para acelerar giro ou pagamentos à vista.
- Produto de R$ 80 com 10% de desconto custa R$ 72 (R$ 80 · 0,90).

#### Slide 10.1 — Porcentagem sobre Porcentagem

- Situação-problema: o fornecedor aumentou o preço em 12% e deu 5% de desconto à vista. Qual o preço final de um item de R$ 50,00 e qual a variação real?

- Aumento: R$ 50,00 × 1,12 = R$ 56,00
- Desconto: R$ 56,00 × 0,95 = R$ 53,20
- Fator total: 1,12 × 0,95 = 1,064 → aumento real de 6,4%

- ⚠️
- Atenção
- Erro comum: somar 12% − 5% = 7%. Percentuais sucessivos se multiplicam como fatores, nunca se somam.

- Variação de estoque
- Saldo foi de 800 para 680 unidades: (680 − 800) ÷ 800 = −0,15 → queda de 15%.

#### Slide 11 — Tributos e Formação de Preço

- FINANÇAS OPERACIONAIS

- Empresas recolhem impostos calculados sobre o faturamento, como ICMS, PIS e COFINS.
- Saber precificar exige incluir o custo da mercadoria, as despesas operacionais, a alíquota tributária e a margem desejada.

- Atenção
- Calcular 20% sobre o custo não é o mesmo que garantir 20% de margem sobre a receita final.

- ⚠️

#### Slide 12 — Prática de Variação e Margem

- Se o valor em estoque aumentou de R$ 40.000 para R$ 50.000, houve uma variação de ____%, e um item vendido por R$ 100 com custo de R$ 70 possui lucro de ____ reais.

- Banco de palavras 🏦

- 20

- 40

- 25

- 50

- 10

- 30

#### Slide 13 — Prática de Variação e Margem

- ✅

- Se o valor em estoque aumentou de R$ 40.000 para R$ 50.000, houve uma variação de 25%, e um item vendido por R$ 100 com custo de R$ 70 possui lucro de 30 reais.

- Banco de palavras 🏦

- 20

- 40

- 25

- 50

- 10

- 30

#### Slide 14 — O Desafio dos Dados Brutos

- Centenas de números soltos geram confusão. Como resumir o desempenho de uma filial inteira com apenas algumas medidas certeiras?

#### Slide 15 — Estatística Descritiva: A Média

- MEDIDAS DE TENDÊNCIA

- A média aritmética representa o centro de gravidade dos dados.
- Ela é obtida somando todos os valores da amostra e dividindo a soma pela quantidade de observações computadas.

- 🧠

- Lembre-se
- Média = (x₁ + x₂ + ... + xₙ) / n. É muito útil, mas pode ser distorcida por valores discrepantes (outliers).

#### Slide 16 — A Mediana: O Valor Central

- MEDIDAS DE TENDÊNCIA

- A mediana é o número exato que divide uma lista ordenada de valores em duas metades com igual número de elementos.
- Se o número de termos for ímpar, ela é o termo do meio; se for par, calcula-se a média aritmética dos dois valores centrais.

- Ponto-chave
- A mediana é resistente a valores extremos. Se um único pedido extraordinário de 900 unidades entra numa semana de saídas de 20 a 30, a mediana reflete melhor o consumo típico.

- 🔑

#### Slide 17 — A Moda: A Maior Frequência

- MEDIDAS DE TENDÊNCIA

- A moda é o valor que ocorre com maior repetição em um conjunto de observações.
- Na gestão de estoque, a moda revela qual tamanho de calçado, voltagem ou cor tem maior demanda popular.

- 🤯

- Curiosidade
- Um conjunto pode ter uma única moda (unimodal), duas modas (bimodal) ou nenhuma moda se nenhum valor se repetir (amodal).

#### Slide 18 — Exemplo Comparativo: Média e Mediana

- Situação-problema: as saídas diárias de luvas (pares) do almoxarifado em 5 dias úteis foram 12, 14, 15, 18 e 91 (o dia 91 foi um pedido extraordinário).
- Observe como a escolha da medida altera drasticamente o resumo:

- Cálculo da Média
- Soma: 12 + 14 + 15 + 18 + 91 = 150
- Divisão: 150 / 5 = 30 pares
- Conclusão: A média dá a falsa impressão de que os dias normais giram em torno de 30 pares.

- Cálculo da Mediana
- Lista em ordem: 12, 14, 15, 18, 91
- Termo central: 15 pares
- Conclusão: A mediana representa fielmente o fluxo padrão, isolando o dia atípico (91).

#### Slide 19 — Verificação: Impacto dos Extremos

- A média aritmética é sempre a melhor métrica para resumir o consumo diário de um item que tem dias de pico muito atípicos.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

#### Slide 20 — Verificação: Impacto dos Extremos

- ✅

- A média aritmética é sempre a melhor métrica para resumir o consumo diário de um item que tem dias de pico muito atípicos.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- Poucos dias de pico (inventário, pedido extraordinário) puxam a média para cima, tornando a mediana mais fiel ao consumo típico do item.

- 🔑

#### Slide 21 — Por que Conhecer a Dispersão?

- Dois fornecedores podem entregar pedidos em uma média de 5 dias úteis.
- Contudo, o Fornecedor A sempre entrega entre 4 e 6 dias, enquanto o Fornecedor B varia de 1 a 9 dias. A dispersão mede o risco e a previsibilidade dessa operação.

- Atenção
- Confiar apenas na média pode esconder altos riscos operacionais e falhas graves de fornecimento.

- ⚠️

#### Slide 22 — Variância e Desvio Padrão

- Baixa Dispersão
- Dados concentrados perto da média.
- Menor variância
- Processo previsível e estável

- Alta Dispersão
- Dados espalhados longe do centro.
- Maior desvio padrão
- Processo volátil e incerto

#### Slide 23 — Calculando a Variância Passo a Passo

- A variância (s²) mede a média dos quadrados dos desvios de cada dado em relação à média geral:

- Calcular a média aritmética da amostra

- Subtrair a média de cada dado individual

- Elevar cada diferença obtida ao quadrado

- Somar os quadrados e dividir pelo total

#### Slide 23.1 — Desvio Padrão na Prática: Prazos de Fornecedores

- Prazos de entrega (dias) das últimas 5 compras, ambos com média de 5 dias:

| Fornecedor | Prazos | Desvios² | Variância | Desvio padrão |
|---|---|---|---|---|
| A | 4, 5, 6, 5, 5 | 1, 0, 1, 0, 0 → soma 2 | 2 ÷ 5 = 0,4 | ≈ 0,63 dia |
| B | 1, 9, 5, 2, 8 | 16, 16, 0, 9, 9 → soma 50 | 50 ÷ 5 = 10 | ≈ 3,16 dias |

- Interpretação: o Fornecedor B é imprevisível; com ele, o estoque de segurança precisa ser maior, mesmo com a mesma média.

- Na planilha: =DESVPAD.P(B2:B6) (população, como acima) ou =DESVPAD.A(B2:B6) (amostra, divide por n − 1).

- Moda na gestão: o tamanho de luva mais retirado (ex.: M) orienta o que comprar em maior quantidade.

#### Slide 24 — Tabelas de Frequência

- ORGANIZAÇÃO DE DADOS

- Uma tabela de frequência agrupa medições em classes ordenadas, permitindo enxergar padrões em grandes volumes.
- Ela exibe a frequência absoluta (contagem de ocorrências) e a frequência relativa (proporção percentual de cada categoria).

- Ponto-chave
- A frequência relativa permite comparar grupos de tamanhos diferentes com total consistência.

- 🔑

#### Slide 25 — Leitura de Frequência na Prática

- Pesquisa de satisfação realizada com 200 clientes de uma loja de materiais:

- Frequência Absoluta
- Excelente: 80 clientes
- Bom: 70 clientes
- Regular: 30 clientes
- Ruim: 20 clientes
- Total: 200 avaliações

- Frequência Relativa
- Excelente: 80/200 = 40%
- Bom: 70/200 = 35%
- Regular: 30/200 = 15%
- Ruim: 20/200 = 10%
- Total: 100% da base

- 🔍

- Exemplo
- Constatamos que 75% dos clientes aprovam a loja (Excelente + Bom), fundamentando metas de retenção.

#### Slide 26 — Entendendo Estatística na Prática

- Média, mediana e moda: base para decisões.

#### Slide 27 — Padrões em Séries: Progressão Aritmética

- PREVISÃO EMPRESARIAL

- Em uma Progressão Aritmética (PA), cada termo posterior resulta da soma do termo anterior com uma razão constante (r).
- Se uma equipe abre 5 novos pontos de venda a cada trimestre, sua expansão segue o modelo linear de uma PA.

- Exemplo
- Lojas abertas por trimestre: 10, 15, 20, 25... Razão r = +5 lojas a cada período.

- 🔍

#### Slide 28 — Padrões em Séries: Progressão Geométrica

- PREVISÃO EMPRESARIAL

- Em uma Progressão Geométrica (PG), cada termo é obtido multiplicando o anterior por uma razão constante (q).
- Crescimentos exponenciais, como o volume de acessos a uma plataforma digital ou juros compostos, seguem uma PG.

- Lembre-se
- Usuários ativos: 1.000, 2.000, 4.000, 8.000... Razão multiplicativa q = 2 (dobrando a cada ciclo).

- 🧠

#### Slide 29 — Comparando Modelos de Crescimento

- Progressão Aritmética
- Crescimento por soma fixa
- Comportamento linear
- Exemplo: meta fixa de +50 unidades/mês

- Progressão Geométrica
- Crescimento por multiplicação
- Comportamento acelerado
- Exemplo: vendas dobrando (+100%) a cada mês

#### Slide 30 — Sequência Lógica de Crescimento

- Ordene os termos desta Progressão Aritmética de faturamento bimestral que cresce à razão fixa de R$ 15.000 a partir de R$ 30.000:

- Bimestre 1: R$ 30.000

- Bimestre 4: R$ 75.000

- Bimestre 3: R$ 60.000

- Bimestre 2: R$ 45.000

#### Slide 31 — Sequência Lógica de Crescimento

- ✅

- Ordene os termos desta Progressão Aritmética de faturamento bimestral que cresce à razão fixa de R$ 15.000 a partir de R$ 30.000:

- 1

- Bimestre 1: R$ 30.000

- 2

- Bimestre 2: R$ 45.000

- Bimestre 3: R$ 60.000

- 3

- 4

- Bimestre 4: R$ 75.000

#### Slide 32 — Lógica de Causa e Efeito na Gestão

- TOMADA DE DECISÃO

- Projeções financeiras confiáveis combinam tendências numéricas com hipóteses causais de mercado.
- Se o preço de venda de um item aumenta em 20%, qual será o efeito sobre o volume demandado e sobre a receita líquida?

- Ponto-chave
- Correlação numérica não garante causalidade automática: é fundamental compreender os fatores operacionais subjacentes.

- 🔑

#### Slide 33 — Árvore de Decisão e Cenários

- Decisão: Reduzir Preço em 10%
- Hipótese Otimista: Volume sobe 30%, aumentando receita total líquida.
- Hipótese Pessimista: Volume sobe apenas 5%, corroendo a margem de lucro.

- Decisão: Manter Preço e Investir
- Hipótese Otimista: Produto preserva alto valor percebido e atrai novos clientes.
- Hipótese Pessimista: Custo com marketing sobe sem gerar retorno em vendas.

- 🧠

- Lembre-se
- A matemática fornece os cenários de risco, mas o gestor escolhe a estratégia mais coerente.

#### Slide 34 — Análise de Dataset: Custos de Envio

- Distribuidora analisou prazos de 7 remessas: 2, 3, 3, 4, 4, 4, 8 dias.

- Média: Soma 28 / 7 = 4,0 dias de prazo médio.

- Mediana: O valor central do rol é 4 dias.

- Moda: Valor mais frequente é 4 dias (3 vezes).

- Amplitude: Diferença do maior para o menor: 8 - 2 = 6 dias.

#### Slide 35 — Identificando Tendências Visuais

- ANÁLISE ESTRATÉGICA

- Gráficos de linhas e dispersão mostram se os dados operacionais estão em alta sustentada, estabilidade ou retração.
- Reconhecer tendências antes dos concorrentes viabiliza ajustes em compras de insumos, contratações e investimentos de capital.

- 🔑

- Ponto-chave
- Linhas de tendência suavizam flutuações pontuais de curto prazo e revelam a real direção do negócio.

#### Slide 36 — Tendências no Planejamento Estratégico

- Sazonalidade
- Padrões periódicos previsíveis, como o pico de vendas de brinquedos em dezembro ou sorvetes no verão.

- Estabilidade
- Consumo contínuo sem grandes surtos, permitindo estoques enxutos e compras programadas.

#### Slide 37 — Consolidação dos Conceitos

- Relacione as palavras com as definições

- Variância

- Valor que ocupa o centro exato de uma sequência ordenada de dados.

- Porcentagem

- Razão expressa em base 100 para comparar grandezas e variações.

- Mediana

- Dado que apresenta o maior número de ocorrências na amostra.

- Moda

- Medida que avalia a dispersão dos valores ao redor da média.

#### Slide 38 — Consolidação dos Conceitos

- ✅

- Relacione as palavras com as definições

- Variância

- Valor que ocupa o centro exato de uma sequência ordenada de dados.

- A

- Porcentagem

- B

- Razão expressa em base 100 para comparar grandezas e variações.

- Mediana

- Dado que apresenta o maior número de ocorrências na amostra.

- C

- Moda

- D

- Medida que avalia a dispersão dos valores ao redor da média.

#### Slide 39 — Estudo de Caso: Análise Gerencial

- Uma distribuidora teve os seguintes faturamentos no primeiro semestre (em milhares de reais): R$ 40, R$ 42, R$ 42, R$ 44, R$ 48 e R$ 84.
- Calcule a média e a mediana do período.
- Qual medida reflete melhor o desempenho típico? Justifique.
- Calcule a variação percentual entre o primeiro e o último mês.

#### Slide 40 — Decisão Estratégica: Preço vs. Volume

- Se sua empresa precisasse aumentar o lucro no próximo trimestre, seria mais seguro cortar os custos operacionais em 10% ou aplicar um desconto de 10% para buscar um salto de 25% nas vendas?
- Quais medidas estatísticas e financeiras você usaria para validar essa escolha?

#### Slide 41 — Decisão Estratégica: Preço vs. Volume

- ✅

- Você poderia ter dito...
- A resposta ideal avalia elasticidade e custos. Cortar despesas garante margem
- independente do mercado. Descontos para 25% de volume extra sobrecarregam a
- logística e dependem da demanda. O gestor deve monitorar o desvio padrão de
- vendas, a variabilidade dos custos e calcular o ponto de equilíbrio antes.

---

## AULA 2: Excel Básico e Intermediário para Gestão

**Total de Slides:** 82 (+ 4 complementos N.x)

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 2 — Excel Básico e Intermediário (8h)
> - **Conhecimentos [oficial]:** base didática para o 2.2 (interface, fórmulas e funções básicas) · 2.2.1 Formatação condicional · 2.2.5 Validação de dados (+ congelar painéis)
> - **Capacidades:** C1 · C2
> - **Indicadores de desempenho:** 5 (formatação profissional e referências relativas/absolutas) · 6 (SOMA, MÉDIA, CONT, MÁXIMO, MÍNIMO e SE) · 7 (formatação condicional e validação com lista suspensa)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** 5 (códigos digitados errados) · 6 (saldo abaixo do mínimo em vermelho)

### Arquivo `3-Excel-Básico-Interface-e-Fórmulas.md` (41 slides + 2 complementos)

#### Slide 1 — Excel Básico: Interface e Fórmulas

- Dominando a interface, operações essenciais e automação no Excel.

#### Slide 2 — Imagine Calcular o Saldo de Mil Itens Manualmente

- Como os almoxarifados controlavam entradas, saídas e saldos antes das planilhas eletrônicas?

#### Slide 3 — Objetivos da Nossa Aula

- Dominar interface, células e navegação no Excel.

- 1

- Criar fórmulas e usar SOMA, MÉDIA, CONT.NÚM, CONT.VALORES, MÁXIMO e MÍNIMO.

- 2

- Aplicar referências e a função SE para decisões.

- 3

- 🧠

- Lembre-se
- Ao final, você criará uma planilha automatizada de controle de estoque.

#### Slide 4 — Recapitulação: Estatística e Gestão

- Medidas em Decisões
- Nas aulas anteriores, vimos ferramentas estatísticas:
- Média e Mediana: identificam centros de custos e vendas
- Desvio Padrão: quantifica riscos e dispersão
- Variações Percentuais: medem crescimento e margens

- 🔑

- Ponto-chave
- O Excel torna essas análises instantâneas e dinâmicas.

#### Slide 5 — Quiz: Revisão Estatística

- Se o faturamento de uma loja sobe de R$ 10.000 para R$ 12.500, qual foi a variação percentual?

- 1.

- +15%

- 2.

- +12,5%

- 3.

- +20%

- 4.

- +25%

#### Slide 6 — Quiz: Revisão Estatística

- ✅

- Se o faturamento de uma loja sobe de R$ 10.000 para R$ 12.500, qual foi a variação percentual?

- 1.

- +15%

- 2.

- +12,5%

- 3.

- +20%

- ✓

- 4.

- +25%

#### Slide 7 — Vocabulário Fundamental do Excel

- Planilha: Área de trabalho composta por milhões de células organizadas.

- Sintaxe: Regra gramatical para escrita de funções e seus argumentos.

- Célula: Interseção de linha e coluna, identificada por letra e número (ex.: B4).

- Fórmula: Expressão para calcular valores, iniciada obrigatoriamente por sinal de igual.

#### Slide 8 — A Estrutura da Interface

- A tela do Excel organiza ferramentas em Guias superiores (Página Inicial, Inserir, Fórmulas) e reúne comandos na Faixa de Opções.

- Logo abaixo da faixa, a Barra de Fórmulas exibe o conteúdo exato ou equação da célula ativa, permitindo edições rápidas com precisão cirúrgica.

#### Slide 9 — Colunas, Linhas e Abas

- Colunas e Linhas
- Colunas verticais recebem letras (A, B, C...). Linhas horizontais recebem números (1, 2, 3...). O cruzamento gera o endereço único da célula.

- Pastas e Abas
- Um arquivo é uma Pasta de Trabalho, podendo abrigar múltiplas abas organizadas por departamentos como Vendas, Custos e RH.

#### Slide 10 — Entrada e Tipos de Dados

- O Excel classifica as informações inseridas automaticamente:
- Textos: alinhados automaticamente à esquerda
- Números e Datas: alinhados automaticamente à direita
- Valores Lógicos: termos VERDADEIRO ou FALSO centralizados

- ⚠️

- Atenção
- Se um número ficar alinhado à esquerda, o Excel o interpretou como texto e não fará contas!

#### Slide 11 — Formatação Essencial de Células

- Porcentagem
- Multiplica a fração por 100 e exibe o símbolo % (ex.: 0,15 vira 15%).

- Moeda / Contábil
- Formata valores com símbolo R$ e duas casas decimais padronizadas.

- Bordas e Cores
- Destacam títulos e totais, separando dados brutos de resultados gerenciais.

#### Slide 12 — Visão Geral: Excel na Prática

- Aprenda: cursores, seleção de intervalos e organização de planilhas.

#### Slide 13 — Construindo Fórmulas Básicas

- Toda fórmula no Excel deve começar com o sinal de igual (=). Sem ele, o programa entende o cálculo como texto comum.

- Em vez de somar números fixos (=10+20), somamos referências de células (=A1+B1). Assim, o resultado atualiza sozinho quando os valores mudam!

- 🧠

- Lembre-se
- O sinal de igual avisa o Excel: 'prepare-se para calcular!'

#### Slide 14 — Operadores Aritméticos no Teclado

- Soma e Subtração
- Adição: sinal + (ex.: =B2+C2)
- Subtração: sinal - (ex.: =B2-C2)
- Utilizados para calcular receitas totais e descontos sobre produtos.

- Multiplicação e Divisão
- Multiplicação: asterisco * (ex.: =B2*C2)
- Divisão: barra / (ex.: =B2/C2)
- Utilizados para precificação unitária e cálculo de taxas mensais.

#### Slide 15 — Precedência Operatória no Excel

- Assim como na matemática escolar, o Excel respeita ordens rigorosas:
- Parênteses
- Multiplicação (*) e Divisão (/)
- Adição (+) e Subtração (-)

- ⚠️

- Atenção
- A fórmula =10+5*2 resulta em 20. Se você desejava somar antes, use =(10+5)*2 para obter 30.

#### Slide 16 — Checando a Lógica de Fórmulas

- No Excel, a expressão =5+2*10 resulta em 70.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

#### Slide 17 — Checando a Lógica de Fórmulas

- ✅

- No Excel, a expressão =5+2*10 resulta em 70.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- A multiplicação é calculada antes da soma: 2*10=20, depois 5+20=25.

- 🔑

#### Slide 18 — A Função SOMA (SUM)

- A função SOMA totaliza rapidamente centenas de números sem a necessidade de digitar operador por operador.

- A sintaxe =SOMA(B2:B6) utiliza dois pontos (:) para indicar um intervalo contínuo, somando da célula B2 até a célula B6.

#### Slide 19 — A Função MÉDIA (AVERAGE)

- A função MÉDIA soma todos os valores do intervalo selecionado e divide a soma pela quantidade de elementos numéricos preenchidos.

- 🔍

- Exemplo
- Se as saídas de um item em C2, C3 e C4 forem 8, 7 e 9 caixas, a fórmula =MÉDIA(C2:C4) retornará automaticamente 8.

- Células vazias são desconsideradas no divisor, preservando a exatidão estatística do indicador.

#### Slide 20 — A Função CONT.VALORES (COUNTA)

- Enquanto a função CONT.NÚM computa apenas dígitos numéricos, a função CONT.VALORES contabiliza qualquer célula preenchida com texto ou número.

- 🔑

- Ponto-chave
- Ideal para saber quantos itens estão cadastrados no estoque pela descrição na coluna A.

- Sintaxe: =CONT.VALORES(A2:A50). Células em branco são ignoradas.

#### Slide 20.1 — As Funções MÁXIMO e MÍNIMO

- MÁXIMO retorna o maior valor de um intervalo; MÍNIMO retorna o menor.

- =MÁXIMO(C2:C31): maior saída diária do mês
- =MÍNIMO(E2:E200): menor saldo entre os itens cadastrados

- 🔍
- Exemplo
- Saídas de 8, 15, 4 e 12 caixas: MÁXIMO = 15, MÍNIMO = 4 e a amplitude (=MÁXIMO(...)-MÍNIMO(...)) = 11 caixas.

#### Slide 20.2 — CONT.NÚM × CONT.VALORES

- Intervalo A2:A6 com: "Luva", 25, (vazio), "Óculos", 10

- =CONT.NÚM(A2:A6) → 2 (conta só números)
- =CONT.VALORES(A2:A6) → 4 (conta qualquer célula preenchida)

- 🔑
- Ponto-chave
- Use CONT.NÚM para quantidades lançadas e CONT.VALORES para itens cadastrados.

#### Slide 21 — Passo a Passo da Função

- Ordene os passos corretos para calcular a média de uma coluna de saídas do estoque:

- Clique na célula onde o resultado final deve aparecer

- Selecione com o mouse o intervalo de dados desejado (ex.: B2:B10)

- Digite o sinal de igual seguido do nome da função: =MÉDIA(

- Feche os parênteses ) e pressione a tecla Enter

#### Slide 22 — Passo a Passo da Função

- ✅

- Ordene os passos corretos para calcular a média de uma coluna de saídas do estoque:

- 1

- Clique na célula onde o resultado final deve aparecer

- 2

- Digite o sinal de igual seguido do nome da função: =MÉDIA(

- Selecione com o mouse o intervalo de dados desejado (ex.: B2:B10)

- 3

- 4

- Feche os parênteses ) e pressione a tecla Enter

#### Slide 23 — Lógica Condicional: A Função SE

- Na gestão empresarial, decisões dependem de regras: 'se a meta for atingida, pague bônus; caso contrário, não pague'.

- A função SE avalia uma condição lógica. Se for verdadeira, executa uma ação; se for falsa, executa um caminho alternativo definido por você.

#### Slide 24 — A Estrutura da Função SE

- Os 3 Argumentos
- A sintaxe exige três elementos separados por ponto e vírgula:
- =SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)

- Exemplo Prático
- =SE(D2<E2; "Repor"; "OK"): se o saldo em D2 for menor que o estoque mínimo em E2, exibe 'Repor'; caso contrário, exibe 'OK'.

#### Slide 25 — Operadores de Comparação Lógica

- Para montar o teste lógico no primeiro argumento, usamos os operadores comparativos:
- Maior que: >
- Menor que: <
- Maior ou igual: >=
- Menor ou igual: <=
- Igual: = e Diferente: <>

- 🧠

- Lembre-se
- Sempre que o resultado de texto for fixo, escreva-o entre aspas duplas ("Bônus").

#### Slide 26 — Análise de Fórmulas com SE

- Avaliando a fórmula =SE(C2>5000; C2*0,1; 0), quais afirmativas são verdadeiras?

- 1.

- Se C2 for igual a 6.000, o resultado retornado será 600

- 2.

- A fórmula apresenta erro de sintaxe por não conter textos entre aspas

- 3.

- Se C2 for igual a 4.500, o resultado retornado será 0

- 4.

- Se C2 for exatamente 5.000, o resultado calculado será 500

#### Slide 27 — Análise de Fórmulas com SE

- ✅

- Avaliando a fórmula =SE(C2>5000; C2*0,1; 0), quais afirmativas são verdadeiras?

- ✓

- 1.

- Se C2 for igual a 6.000, o resultado retornado será 600

- 2.

- A fórmula apresenta erro de sintaxe por não conter textos entre aspas

- 3.

- Se C2 for igual a 4.500, o resultado retornado será 0

- ✓

- 4.

- Se C2 for exatamente 5.000, o resultado calculado será 500

#### Slide 28 — Referências Relativas no Excel

- Por padrão, as referências no Excel são relativas. Quando você escreve =B2*C2 e arrasta a fórmula para baixo, ela ajusta automaticamente para =B3*C3.

- 🔑

- Ponto-chave
- O Excel memoriza a posição proporcional: 'multiplique as duas células à minha esquerda'.

- Essa característica economiza horas de trabalho repetitivo em listas com milhares de linhas.

#### Slide 29 — O Desafio da Taxa Fixa

- Imagine calcular o imposto de vários produtos multiplicando cada valor pela taxa fixa de 10% localizada isoladamente na célula F1.

- Se você arrastar =B2*F1 para baixo, a próxima linha buscará =B3*F2. Como F2 está vazia, o resultado será zero!

- ⚠️

- Atenção
- Precisamos travar a referência da célula F1 para que ela não se desloque!

#### Slide 30 — Referências Absolutas e o Cifrão

- O Símbolo Cifrão ($)
- O cifrão fixa a célula de cálculo: =B2*$F$1.
- Ao arrastar, a fórmula vira =B3*$F$1, mantendo a taxa correta.

- O Atalho Mágico F4
- Ao digitar uma célula na fórmula, pressione F4.
- O Excel insere automaticamente os cifrões na referência.

#### Slide 31 — Alça de Preenchimento Rápido

- No canto inferior direito da célula ativa, existe um pequeno quadrado verde chamado Alça de Preenchimento.

- Ao clicar e arrastar (ou dar um duplo clique), o Excel copia fórmulas ou gera sequências lógicas (dias da semana, meses, datas).

- 🤯

- Curiosidade
- O duplo clique na alça propaga o cálculo até a última linha preenchida da tabela vizinha!

#### Slide 32 — O Poder do Preenchimento Relâmpago

- O Preenchimento Relâmpago (atalho ) reconhece padrões de texto e replica transformações instantaneamente.

- Exemplo
- Se a coluna A possui 'Lucas Silva', digite 'Lucas' na coluna B e aperte Ctrl+E: o Excel extrairá todos os primeiros nomes sozinhos.

- 🔍

- Funciona para formatar CPFs, separar sobrenomes ou concatenar códigos empresariais.

#### Slide 33 — Fixando Conceitos e Atalhos

- Relacione as palavras com as definições

- Ponto e Vírgula (;)

- Atalho que insere cifrões para fixar uma referência absoluta

- Dois Pontos (:)

- Operador que indica intervalo contínuo do início ao fim

- Ctrl + E

- Atalho do Preenchimento Relâmpago para reconhecer padrões

- F4

- Separador individual de argumentos dentro de uma função

#### Slide 34 — Fixando Conceitos e Atalhos

- ✅

- Relacione as palavras com as definições

- Ponto e Vírgula (;)

- Atalho que insere cifrões para fixar uma referência absoluta

- A

- Dois Pontos (:)

- B

- Operador que indica intervalo contínuo do início ao fim

- Ctrl + E

- Atalho do Preenchimento Relâmpago para reconhecer padrões

- C

- F4

- D

- Separador individual de argumentos dentro de uma função

#### Slide 35 — Oficina Prática: Controle de Estoque

- Chegou a hora de consolidar estrutura, fórmulas e tomada de decisão em um caso real de almoxarifado.

- Vamos construir uma planilha automatizada com saldo, custo em estoque, custo de armazenagem, alerta de reposição e resumo do mês.

#### Slide 36 — Passo 1: Estrutura da Planilha

- Cabeçalhos: Código, Item, Entradas, Saídas, Saldo, Estoque Mínimo, Custo Unitário, Custo em Estoque, Armazenagem e Situação.

- Na célula isolada L1, cadastre a taxa mensal de armazenagem: 2% (0,02).

- Formate os custos como Moeda (R$) e as quantidades como número inteiro.

#### Slide 37 — Passo 2: Fórmulas Automatizadas

- Saldo e Custo
- Saldo (E2): =C2-D2
- Custo em Estoque (H2): =E2*G2

- Armazenagem e Situação
- Armazenagem (I2): =H2*$L$1 — a referência absoluta trava a taxa ao arrastar.
- Situação (J2): =SE(E2<F2; "Repor"; "OK")

#### Slide 38 — Passo 3: Resumo do Mês

- Custo total em estoque: =SOMA(H2:H11)
- Saída média por item: =MÉDIA(D2:D11)
- Maior e menor saldo: =MÁXIMO(E2:E11) e =MÍNIMO(E2:E11)
- Itens cadastrados: =CONT.VALORES(B2:B11)
- Itens com saldo numérico lançado: =CONT.NÚM(E2:E11)

#### Slide 39 — Desafio Prático de Gestão

- Abra a planilha e execute o projeto de controle de estoque:
- Cadastre 10 itens do almoxarifado (luvas, parafusos, fita, óculos...).
- Em L1, insira 2% e calcule a armazenagem usando $L$1.
- Aplique SE: saldo abaixo do mínimo → "Repor".
- Calcule total, média, MÁXIMO e MÍNIMO no resumo.
- Copie uma fórmula sem $ e observe a referência que "anda"; corrija com F4.

#### Slide 40 — Debate: Eficiência e Riscos

- Por que erros em referências absolutas ou de fórmulas no Excel podem gerar grandes prejuízos para a administração de uma empresa?

#### Slide 41 — Debate: Eficiência e Riscos

- ✅

- Você poderia ter dito...
- Uma fórmula incorreta pode se propagar para milhares de linhas despercebida.
- Isso acarreta compras em excesso ou em falta, custo de estoque errado e distorção em relatórios que embasam decisões da gerência.

### Arquivo `4-Excel-Intermediário-Formatação-e-Validação.md` (41 slides + 2 complementos)

#### Slide 1 — Excel Intermediário: Formatação e Validação

- Transformando planilhas brutas em relatórios gerenciais confiáveis e profissionais.

#### Slide 2 — Você Confiaria Neste Relatório?

- Imagine receber uma planilha de vendas cheia de números sem vírgula, datas no padrão americano e digitações com erros ortográficos. Uma decisão de negócios milionária pode falhar por falta de organização e padronização visual.

#### Slide 3 — Objetivos da Nossa Aula

- Nesta aula do curso de Análise de Dados, vamos desenvolver três habilidades essenciais para o mercado de trabalho:

- Padronizar números, moedas, percentuais e datas com precisão.

- 1

- 2

- Aplicar regras de validação para impedir dados incorretos.

- Proteger fórmulas e estruturar relatórios com painéis e filtros.

- 3

#### Slide 4 — Vocabulário Essencial da Aula

- Validação - Regras que controlam e padronizam entradas de dados nas células.

- Proteção - Segurança para impedir alterações acidentais em fórmulas.

- Formatação - Ajusta a exibição visual de números sem alterar o valor armazenado.

- Filtro - Recurso para isolar, ordenar e exibir apenas linhas da tabela.

#### Slide 5 — Revisão: Estrutura Básica do Excel

- CONCEITO

- Na aula anterior, vimos que o Excel organiza dados em células, definidas pelo cruzamento de colunas (letras) e linhas (números).
- Toda fórmula deve iniciar com o sinal de igualdade (=).
- Funções como =SOMA() e =MÉDIA() aceleram cálculos complexos.

- 🧠

- Lembre-se
- Fórmulas incorretas propagam erros por todo o relatório.

#### Slide 6 — Revisão: A Lógica da Função SE

- Estrutura da Condição
- A função SE toma decisões automáticas baseando-se em uma premissa lógica verdadeira ou falsa:

- Aplicação Gerencial
- No ambiente de negócios, o teste lógico costuma conferir o cumprimento de metas comerciais ou a necessidade de reposição de itens no estoque.

- Exemplo
- =SE(D2<E2; "Repor"; "OK") classifica a situação do item sem intervenção manual.

- 🔍

#### Slide 7 — Referências Relativas e Absolutas

- CONCEITO

- Ao arrastar fórmulas, o Excel ajusta coordenadas automaticamente (referência relativa).
- Para travar células fixas (taxas e custos fixos), usamos o cifrão ($).
- Exemplo: $D$1 fixa coluna D e linha 1 ao copiar.

- Ponto-chave
- Use F4 para alternar rapidamente entre tipos de fixação de célula.

- 🔑

#### Slide 8 — Quiz: Referências no Excel

- Qual é a finalidade de usar o caractere cifrão ($) na referência de uma célula como $B$4?

- 1.

- Travar a célula para que ela não mude ao arrastar a fórmula.

- 2.

- Proteger a planilha inteira contra visualização de terceiros.

- 3.

- Indicar que a célula contém um cálculo financeiro de desconto.

- 4.

- Converter o valor numérico digitado diretamente para a moeda Real.

#### Slide 9 — Quiz: Referências no Excel

- ✅

- Qual é a finalidade de usar o caractere cifrão ($) na referência de uma célula como $B$4?

- ✓

- 1.

- Travar a célula para que ela não mude ao arrastar a fórmula.

- 2.

- Proteger a planilha inteira contra visualização de terceiros.

- 3.

- Indicar que a célula contém um cálculo financeiro de desconto.

- 4.

- Converter o valor numérico digitado diretamente para a moeda Real.

#### Slide 10 — Formatação Avançada de Células

- EXPLICAÇÃO

- Formatar uma célula consiste em mudar sua aparência sem alterar seu conteúdo real. O número bruto 1500,5 armazenado pelo sistema pode se manifestar para o leitor como R$ 1.500,50 ou 1.500,5, preservando cálculos perfeitamente exatos nos bastidores.

- ⚠️

- Atenção
- Nunca digite letras como 'R$' dentro da célula, pois isso transforma o número em texto e anula as fórmulas!

#### Slide 11 — Tratando Moedas e Percentuais

- Formato de Moeda
- O formato Moeda ou Contábil alinha os símbolos de moeda e separa os milhares e decimais por vírgula e ponto com perfeição visual.

- Formato de Porcentagem
- Multiplica mentalmente o valor por 100 e exibe o símbolo %. Um valor decimal como 0,15 vira instantaneamente 15%.

- 🧠

- Lembre-se
- Se você digitar 15 e depois clicar em %, o Excel registrará 1500%. Digite 0,15 (ou 15%) primeiro.

- 🔍

- Exemplo
- O valor 1234567 torna-se R$ 1.234.567,00, facilitando a leitura do valor em estoque.

#### Slide 12 — Padronização de Datas no Sistema

- EXPLICAÇÃO

- Para o Excel, toda data é um número sequencial de dias contados desde 01 de janeiro de 1900.
- O número 46000 representa 09/12/2025.
- O formato de Data Abreviada exibe 09/12/2025.
- O formato de Data Completa detalha o dia da semana e o mês por extenso.

- 🤯

- Curiosidade
- Como datas são números, você pode somar 30 a uma data para calcular vencimentos!

#### Slide 13 — A Magia da Formatação Condicional

- O que é Formatação Condicional?
- É um recurso dinâmico que aplica automaticamente cores de fundo, bordas ou fontes com base em regras matemáticas pré-estabelecidas.
- Valores acima da meta ganham preenchimento verde.
- Valores críticos ou prejuízos acendem em vermelho.

- Ao atualizar qualquer número na tabela, a cor muda de forma instantânea sem precisar de ajustes manuais.

#### Slide 14 — Escalas de Cor e Barras de Dados

- EXPLICAÇÃO

- Além de regras de maior/menor, o Excel oferece recursos visuais em células:
- Barras de Dados: gráficos horizontais dentro da célula.
- Escalas de Cor: gradientes (verde a vermelho) para representar calor de vendas.

- Ponto-chave
- Identifica índices em painéis executivos.

- 🔑

#### Slide 15 — Alerta Visual Instantâneo

- Em um relatório com dez mil linhas, ninguém lê célula por célula. A formatação condicional atua como um semáforo inteligente, guiando o olhar do gestor direto para o problema que exige ação urgente.

#### Slide 15.1 — Estoque Abaixo do Mínimo em Vermelho

- Situação-problema: o saldo abaixo do mínimo precisa ficar vermelho.

- Selecione E2:E200 (Saldo) → Formatação Condicional → Nova Regra → Usar uma fórmula:
- =$E2<$F2 → preenchimento vermelho
- O $ só na coluna deixa a linha "andar" e compara cada item com o próprio mínimo.

- Na coluna Situação: =SE(E2<F2; "Repor"; "OK") + regra "Texto que contém Repor" em vermelho.

- 🔑
- Ponto-chave
- A cor muda sozinha quando uma nova saída é lançada: o comprador vê na hora o que repor.

#### Slide 16 — Estilização Profissional de Tabelas

- Tipografia
- Adote uma única família de fontes limpas, como Aptos, Segoe UI ou Calibri.

- Alinhamento
- Alinhe textos à esquerda e todos os números e moedas sempre à direita.

- Contraste e Bordas
- Use cabeçalhos escuros com texto branco e linhas de grade discretas.

- Hierarquia
- Destaque linhas de totais gerais com negrito e borda dupla inferior.

#### Slide 17 — Poluição Visual vs. Clareza de Dados

- EXPLICAÇÃO

- Evite cores primárias fortes que criam um 'efeito carnaval' cansativo.
- Use tons neutros como cinza, azul-marinho e grafite.
- Reserve cores saturadas apenas para sinalizar exceções e metas.

- ⚠️

- Atenção
- Menos cores trazem elegância e autoridade profissional à análise.

#### Slide 18 — Verificação: Alinhamento de Células

- Em tabelas corporativas, os números devem ser alinhados à esquerda para facilitar a leitura alfabética.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

#### Slide 19 — Verificação: Alinhamento de Células

- ✅

- Em tabelas corporativas, os números devem ser alinhados à esquerda para facilitar a leitura alfabética.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- Números devem ser alinhados à direita para que as casas decimais e ordens de grandeza fiquem perfeitamente emparelhadas.

- 🔑

#### Slide 20 — Congelamento de Painéis

- EXPLICAÇÃO

- Ao rolar para baixo uma tabela com centenas de linhas, os títulos das colunas somem da tela, deixando você perdido sobre o que cada valor significa.
- O Congelar Painéis fixa linhas de cabeçalho e colunas de identificação no topo da tela.
- Encontre na guia Exibir > Congelar Painéis.

- Lembre-se
- Posicione o cursor exatamente na célula abaixo e à direita do bloco que você deseja manter congelado.

- 🧠

#### Slide 21 — Três Opções de Congelamento

- Congelar Linha Superior
- Fixa exclusivamente a Linha 1 da planilha. É o método mais rápido para relatórios simples cujo título e cabeçalho ocupam a primeira linha.

- Congelar Primeira Coluna
- Fixa somente a Coluna A. Permite rolar os dados para a direita mantendo sempre visível o código ou nome do produto analisado.

- Congelar Painéis Livre
- Trava simultaneamente múltiplas linhas e colunas acima e à esquerda da célula atualmente selecionada.

- Ponto-chave
- A opção mais versátil do dia a dia.

- 🔑

- 🔍

- Exemplo
- Ideal para listas de compras rápidas.

- 🔍

- Exemplo
- Perfeito para orçamentos de doze meses.

#### Slide 22 — O Perigo dos Dados Incorretos

- CONCEITO

- Se um operador digitar 'São Paulo', outro 'Sao Paulo' e um terceiro 'SP', o Excel falhará ao consolidar vendas por estado em fórmulas.
- Digitações inconsistentes distorcem contagens e somas.
- Erros de digitação geram decisões gerenciais erradas.

- ⚠️

- Atenção
- Regra de ouro: dados de entrada incorretos geram relatórios inúteis.

#### Slide 23 — Validação de Dados: Como Funciona

- O que é a Validação?
- A Validação de Dados cria regras de entrada:
- Permite apenas números em faixas (ex: 1 a 100).
- Aceita datas apenas do ano fiscal corrente.
- Limita o tamanho do texto (ex: CPF com 11 dígitos).

- Alertas Personalizados
- Crie avisos para erros de digitação:
- Mensagem de Entrada: instrui o usuário ao clicar na célula.
- Alerta de Erro: impede a gravação até a correção.

- 🧠

- Lembre-se
- Acesse via guia Dados > Validação de Dados.

#### Slide 24 — Criando Listas Suspensas

- EXPLICAÇÃO

- A lista suspensa é a forma mais eficiente de validação de dados no Excel corporativo:
- Selecione o intervalo que receberá as escolhas.
- Na Validação, escolha Permitir: Lista.
- Digite as opções separadas por ponto e vírgula: MAT-001;MAT-002;MAT-003 ou selecione um intervalo de apoio.

- 🔑

- Ponto-chave
- O usuário escolhe com um clique de mouse, eliminando 100% dos erros de digitação.

#### Slide 24.1 — Validando Códigos de Item

- Situação-problema: a planilha de estoque tem códigos digitados errados. Como impedir?

- Cadastre os códigos válidos na aba Cadastro, em A2:A300.
- Na coluna Código da aba Movimentação: Dados → Validação de Dados → Permitir: Lista → Fonte: =Cadastro!$A$2:$A$300
- Alerta de erro: estilo Parar, título "Código inexistente".
- Quantidade: Permitir Número inteiro maior ou igual a 1.

- 🧠
- Lembre-se
- Código validado na entrada evita o erro #N/D no PROCV da Aula 3.

#### Slide 25 — Vídeo: Validação de Dados em Ação

- Crie listas suspensas e alertas de erro.

#### Slide 26 — Ordenação: Configurando uma Lista

- Qual é a sequência correta para configurar uma lista suspensa de opções em uma célula?

- Selecionar as células que receberão a lista suspensa.

- Digitar os itens no campo Fonte separados por ponto e vírgula.

- Acessar a guia Dados e clicar no botão Validação de Dados.

- Na caixa de diálogo, alterar a opção Permitir para Lista.

#### Slide 27 — Ordenação: Configurando uma Lista

- ✅

- Qual é a sequência correta para configurar uma lista suspensa de opções em uma célula?

- 1

- Selecionar as células que receberão a lista suspensa.

- 2

- Acessar a guia Dados e clicar no botão Validação de Dados.

- Na caixa de diálogo, alterar a opção Permitir para Lista.

- 3

- 4

- Digitar os itens no campo Fonte separados por ponto e vírgula.

#### Slide 28 — Mecanismos de Proteção no Excel

- CONCEITO

- Depois de despender horas calculando fórmulas sofisticadas, qualquer usuário desatento pode clicar acidentalmente na tecla Delete e apagar o modelo de projeção. O Excel oferece uma arquitetura de proteção em duas etapas para blindar a sua lógica de negócio.

- Ponto-chave
- A proteção garante a integridade dos cálculos sem impedir que novos dados sejam lançados.

- 🔑

#### Slide 29 — A Lógica do Bloqueio de Células

- Etapa 1: Destravar Entradas
- Por padrão, todas as células estão 'Bloqueadas'.
- Selecione células para entrada de dados.
- Use , aba Proteção e desmarque Bloqueadas.

- Etapa 2: Proteger a Planilha
- Na guia Revisão, clique em Proteger Planilha.
- O bloqueio será ativado.
- Fórmulas ficam intocáveis.
- Células desmarcadas seguem editáveis.

- ⚠️

- Atenção
- Proteger sem destravar células de entrada congela toda a planilha!

#### Slide 30 — Níveis de Segurança: Pasta vs. Planilha

- EXPLICAÇÃO

- Proteger Planilha: impede edição de células, fórmulas ou formatação na aba atual.
- Proteger Estrutura da Pasta: impede que usuários excluam, renomeiem ou adicionem abas no arquivo.

- 🧠

- Lembre-se
- Defina uma senha opcional para impedir desativações não autorizadas.

#### Slide 31 — Filtro Automático para Análise

- EXPLICAÇÃO

- O AutoFiltro adiciona setas nos cabeçalhos para consultar dados sem alterar a tabela:
- Seleção: marque a categoria ou o fornecedor desejado.
- Filtros de Número: exiba itens com custo em estoque 'maior que R$ 1.000'.
- Ordenação: classifique de A a Z ou por valores.

- 🔍

- Exemplo
- Use Ctrl+Shift+L para ativar ou desativar filtros rapidamente.

#### Slide 32 — Quiz: Procedimento de Proteção

- Qual é a ordem correta para permitir que usuários editem apenas dados de entrada, preservando fórmulas protegidas?

- 1.

- Ativar Proteger Planilha e em seguida apagar as fórmulas das células que devem ser editadas.

- 2.

- Aplicar formatação condicional vermelha sobre as células que não podem ser alteradas.

- 3.

- Inserir uma senha na pasta de trabalho e ocultar todas as colunas que possuem cálculos.

- 4.

- Destravar as células de entrada em Formatar Células e depois ativar Proteger Planilha.

#### Slide 33 — Quiz: Procedimento de Proteção

- ✅

- Qual é a ordem correta para permitir que usuários editem apenas dados de entrada, preservando fórmulas protegidas?

- 1.

- Ativar Proteger Planilha e em seguida apagar as fórmulas das células que devem ser editadas.

- 2.

- Aplicar formatação condicional vermelha sobre as células que não podem ser alteradas.

- 3.

- Inserir uma senha na pasta de trabalho e ocultar todas as colunas que possuem cálculos.

- ✓

- 4.

- Destravar as células de entrada em Formatar Células e depois ativar Proteger Planilha.

#### Slide 34 — Prática 1: Relatório de Estoque

- Abra a planilha de estoque e siga estes passos de estilização:
- Formate Custo em Estoque como 'Moeda (R$)' e datas de entrada como 'Data Abreviada'.
- Cabeçalho: fundo azul-escuro, texto branco e negrito.
- Formatação Condicional: vermelho para saldo abaixo do estoque mínimo e verde para saldo acima dele.
- Congele a linha do cabeçalho para fixá-la na rolagem.

#### Slide 35 — Prática 2: Formulário com Validação

- Cadastro de requisições ao almoxarifado:
- Código do item: Lista vinculada ao cadastro (MAT-001 a MAT-050).
- Quantidade: Inteiro (1 a 500 unidades).
- Alerta: 'Parar', título 'Quantidade Inválida', msg 'Use 1 a 500'.
- Teste: Verifique o bloqueio ao inserir valores fora do intervalo.

#### Slide 36 — Prática 3: Bloqueio Estratégico

- Selecione células de quantidades e preços unitários.
- Em 'Formatar Células' (Ctrl+1), aba 'Proteção', desmarque 'Bloqueadas'.
- Na guia 'Revisão', clique em 'Proteger Planilha' com a senha 'gestao2026'.
- Tente editar a fórmula de custo em estoque e verifique o aviso do Excel.

#### Slide 37 — Síntese dos Recursos Estudados

- Comunicação Visual
- Formatação customizada de moedas, percentuais e datas.
- Formatação condicional para chamar a atenção gerencial.
- Congelamento de painéis para navegação sem perda de contexto.

- Confiabilidade Operacional
- Validação de dados com listas suspensas anti-erro.
- Bloqueio seletivo e proteção de fórmulas essenciais.
- AutoFiltros rápidos para segmentação e conferência de dados.

- Lembre-se
- Um bom analista de dados não apenas faz contas; ele constrói ferramentas confiáveis que qualquer pessoa da equipe pode operar com segurança.

- 🧠

#### Slide 38 — Debate: Segurança vs. Facilidade

- Por que travar completamente uma planilha com senha pode, às vezes, atrapalhar o fluxo de trabalho de uma equipe se o analista não planejar bem quais células devem ficar livres?

#### Slide 39 — Debate: Segurança vs. Facilidade

- ✅

- Você poderia ter dito...
- Se as células de digitação não forem devidamente destravadas antes da proteção, os colegas de trabalho não conseguirão preencher pedidos ou lançamentos do dia a dia, paralisando a operação da empresa até que a senha seja inserida.

#### Slide 40 — Desafio Final de Fixação

- Pergunta 1:
- O que acontece com o valor numérico armazenado no Excel quando aplicamos a formatação de Moeda em uma célula?

- Pergunta 2:
- Qual é a função do separador ponto e vírgula (;) ao configurar manualmente os itens de uma Lista Suspensa?

- Pergunta 3:
- Por que devemos desmarcar a opção 'Bloqueadas' antes de clicar no botão 'Proteger Planilha'?

#### Slide 41 — Desafio Final de Fixação

- ✅

- Resposta 1:
- O valor permanece exatamente o mesmo nos bastidores; apenas a sua exibição visual ganha o símbolo R$, separadores de milhar e duas casas decimais.

- Resposta 2:
- Separar cada uma das opções individuais que serão exibidas como alternativas selecionáveis dentro do menu suspenso.

- Resposta 3:
- Para indicar ao Excel quais células específicas devem continuar liberadas para digitação, mantendo apenas as células com fórmulas e cabeçalhos travados.

---

## AULA 3: Excel Avançado e Visualização de Dados

**Total de Slides:** 81 (+ 4 complementos N.x)

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 3 — Excel Avançado e Visualização (8h)
> - **Conhecimentos [oficial]:** 2.2.2 Funções (PROCV, PROCH, Função SE, CONT.SE) · 2.2.3 Tabela dinâmica · 2.2.4 Filtros · 2.2.6 Proteção de células · 2.2.8 Gráficos dinâmicos (+ ÍNDICE/CORRESP, SEERRO, SOMASE)
> - **Capacidades:** C1 · C2 · S2 Aprendizagem ativa
> - **Indicadores de desempenho:** 8 (PROCV/PROCH com SEERRO) · 9 (CONT.SE, SOMASE e tabela dinâmica) · 10 (proteção e escolha do gráfico adequado)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** 7 (PROCV de 300 itens pelo código) · 8 (compras por fornecedor e mês)

### Arquivo `5-Excel-Avançado-Funções-Complexas-e-Busca.md` (40 slides + 2 complementos)

#### Slide 1 — Excel Avançado: Funções Complexas e Busca

- Domine PROCV, ÍNDICE, CORRESP e agregações condicionais para gestão.

#### Slide 2 — O Desafio dos Dados Dispersos

- Imagine procurar manualmente o preço de 500 produtos em uma lista com 10.000 itens. Como fazer isso em segundos sem errar?

#### Slide 3 — Objetivos da Aula

- Hoje você vai dominar ferramentas fundamentais para conectar dados e gerar relatórios executivos confiáveis.

- Construir buscas com PROCV, PROCH e ÍNDICE+CORRESP.

- 1

- 2

- Tratar erros com SEERRO e estruturar SE aninhado.

- Consolidar métricas com CONT.SE e SOMASE.

- 3

#### Slide 4 — Vocabulário Essencial

- Consulta: Recuperação automática de dados entre tabelas distintas.

- Tratamento: Prevenção e correção de erros em buscas não encontradas.

- Pesquisa: Localização de um valor-chave em colunas ou matrizes.

- Agregação: Cálculo que reúne múltiplos registros, como somas ou contagens.

#### Slide 5 — Revisão: Aulas Anteriores

- REVISÃO

- Revisamos proteção e organização para manter planilhas padronizadas:
- Formatação Condicional: realce visual automático.
- Validação de Dados: listas e limites de entrada.
- Proteção e Bloqueio: segurança contra edições.

- 🧠

- Lembre-se
- Congelar painéis mantém cabeçalhos visíveis na navegação.

#### Slide 6 — Quiz: Validação e Navegação

- Pergunta 1:
- Qual recurso impede digitação de valores inválidos em uma célula?

- Pergunta 2:
- Qual ferramenta mantém títulos de colunas visíveis ao rolar a tela?

- Pergunta 3:
- Como destacar automaticamente vendas acima de R$ 1.000 com cor verde?

#### Slide 7 — Quiz: Validação e Navegação

- ✅

- Resposta 1:
- Validação de Dados

- Resposta 2:
- Congelar Painéis

- Resposta 3:
- Formatação Condicional

#### Slide 8 — O Conceito de Cruzamento de Dados

- Em gestão, raramente todas as informações ficam em um só lugar. Tabelas cadastrais separam produtos de transações para evitar repetições desnecessárias.

- Tabela de Vendas
- Registra transações diárias com Data, ID do Produto e Quantidade Vendida. O nome e o preço não são digitados aqui.

- Cadastro de Produtos
- Lista única com ID, Descrição, Categoria e Preço Unitário. Serve como a matriz oficial de referência da empresa.

- Exemplo
- Venda #101: Produto ID 42, 3 unidades vendidas.

- 🔍

- 🔑

- Ponto-chave
- O ID do Produto é a chave primária que conecta as duas bases.

#### Slide 9 — PROCV: Pesquisa Vertical

- FUNÇÃO DE BUSCA

- A função PROCV (Procura Vertical) percorre a primeira coluna de uma tabela procurando um valor-chave e retorna o dado de outra coluna na mesma linha.

- 🧠

- Lembre-se
- Sintaxe: =PROCV(valor_procurado; matriz_tabela; núm_índice_coluna; [procurar_intervalo])

#### Slide 10 — Anatomia dos Argumentos do PROCV

- Entender cada parâmetro evita erros comuns em planilhas de gestão:

- 1

- Valor Procurado: O código ou texto a pesquisar (ex: A2).

- 2

- Matriz Tabela: O intervalo de dados fixado com $ (ex: $F$2:$H$50).

- 3

- Núm Índice Coluna: O número da coluna de retorno (1, 2, 3...).

- 4

- Procurar Intervalo: Use 0 ou FALSO para correspondência exata.

#### Slide 11 — A Regra de Ouro do PROCV

- FUNÇÃO DE BUSCA

- O PROCV possui uma limitação estrutural crucial: ele só procura da esquerda para a direita.
- A coluna que contém o código pesquisado precisa obrigatoriamente ser a primeira coluna da matriz selecionada.

- Atenção
- Se o código estiver na coluna C e o preço na coluna B, o PROCV tradicional não funcionará diretamente.

- ⚠️

#### Slide 11.1 — PROCV em 300 Itens

- Situação-problema: buscar a descrição e o preço de 300 itens pelo código, sem copiar à mão.

- Aba Cadastro, A2:C301: Código | Descrição | Preço
- Aba Pedido, código em A2:
- Descrição (B2): =PROCV(A2; Cadastro!$A$2:$C$301; 2; 0)
- Preço (C2): =PROCV(A2; Cadastro!$A$2:$C$301; 3; 0)
- Arraste até a linha 301: os 300 itens são preenchidos em segundos.

- 🔑
- Ponto-chave
- O $ trava a tabela de busca; sem ele, o intervalo "anda" e os últimos itens retornam #N/D.

#### Slide 12 — Verificação: Argumentos do PROCV

- Na fórmula =PROCV(A2; D2:G20; 3; FALSO), o que o número 3 representa?

- 1.

- O número da coluna de onde será extraído o resultado

- 2.

- A linha exata onde está o valor procurado

- 3.

- A quantidade de resultados repetidos a encontrar

- 4.

- O número de colunas puladas antes de iniciar a busca

#### Slide 13 — Verificação: Argumentos do PROCV

- ✅

- Na fórmula =PROCV(A2; D2:G20; 3; FALSO), o que o número 3 representa?

- ✓

- 1.

- O número da coluna de onde será extraído o resultado

- 2.

- A linha exata onde está o valor procurado

- 3.

- A quantidade de resultados repetidos a encontrar

- 4.

- O número de colunas puladas antes de iniciar a busca

#### Slide 14 — PROCH: Pesquisa Horizontal

- FUNÇÃO DE BUSCA

- Quando a base está disposta em linhas em vez de colunas, utilizamos o PROCH (Procura Horizontal).
- Ele busca a chave na primeira linha da matriz e desce até a linha indicada para retornar a informação correspondente.

- Exemplo
- Tabelas de alíquotas com meses no cabeçalho horizontal: =PROCH("Março"; B1:M5; 3; 0)

- 🔍

#### Slide 15 — Comparando PROCV e PROCH

- PROCV (Vertical)
- Ideal para listas convencionais onde cada linha é um registro e cada coluna é um campo descritivo.

- PROCH (Horizontal)
- Utilizado em matrizes gerenciais com períodos (meses, trimestres) organizados lado a lado no topo.

#### Slide 16 — ÍNDICE e CORRESP: A Dupla Dinâmica

- BUSCA FLEXÍVEL

- Para superar as limitações do PROCV, combinamos duas funções independentes e poderosas:
- CORRESPONDÊNCIA: localiza a posição numérica de um item.
- ÍNDICE: extrai o conteúdo de uma coordenada exata.

- Ponto-chave
- Essa combinação permite pesquisar para a esquerda e em matrizes bidirecionais.

- 🔑

#### Slide 17 — Mecanismo da Função CORRESP

- A função CORRESPONDÊNCIA (ou CORRESP) não traz o preço ou o nome; ela informa em qual posição da lista o item está localizado.

- 🔍

- Exemplo
- Sintaxe: =CORRESP(valor_procurado; matriz_pesquisada; [tipo_correspondência])

- Se a lista de fornecedores em A2:A5 for ["Alfa", "Beta", "Cometa", "Delta"], a fórmula =CORRESP("Cometa"; A2:A5; 0) retorna exatamente o número 3.

#### Slide 18 — Mecanismo da Função ÍNDICE

- BUSCA FLEXÍVEL

- A função ÍNDICE funciona como um sistema de GPS na planilha. Dado um intervalo e um número de linha, ela entrega o dado gravado naquela célula.

- 🧠

- Lembre-se
- Fórmula combinada: =ÍNDICE(coluna_resultado; CORRESP(chave; coluna_chave; 0))

#### Slide 19 — Ordem: Montagem do ÍNDICE + CORRESP

- Ordene as etapas lógicas para montar a busca combinada bidirecional no Excel:

- Identificar a coluna onde está o resultado final desejado

- Definir tipo de correspondência exata 0 no final do CORRESP

- Escrever a função ÍNDICE selecionando o intervalo do resultado

- Inserir a função CORRESP no argumento de número da linha

#### Slide 20 — Ordem: Montagem do ÍNDICE + CORRESP

- ✅

- Ordene as etapas lógicas para montar a busca combinada bidirecional no Excel:

- 1

- Identificar a coluna onde está o resultado final desejado

- 2

- Escrever a função ÍNDICE selecionando o intervalo do resultado

- Inserir a função CORRESP no argumento de número da linha

- 3

- 4

- Definir tipo de correspondência exata 0 no final do CORRESP

#### Slide 21 — Vídeo Tutorial: Buscas Avançadas

- Compare PROCV e ÍNDICE+CORRESP em bases reais:

#### Slide 22 — Prevenção de Erros com SEERRO

- TRATAMENTO DE DADOS

- Quando uma busca não encontra o código, o Excel exibe o temido erro #N/D (Não Disponível). Isso polui relatórios e quebra somas subsequentes.

- ⚠️

- Atenção
- Planilhas profissionais nunca devem expor códigos de erro ao tomador de decisão.

#### Slide 23 — Aplicando a Função SEERRO

- A função SEERRO intercepta falhas e substitui o código técnico por uma mensagem amigável ou valor neutro.

- Fórmula Desprotegida
- =PROCV(A2; D:F; 2; 0)
- Se o código de A2 não existir na coluna D, a célula exibirá o erro #N/D.

- Fórmula Protegida
- =SEERRO(PROCV(A2; D:F; 2; 0); "Código não cadastrado")
- Caso ocorra qualquer erro, exibe o texto amigável definido.

- ⚠️

- Atenção
- Gera impacto negativo visual e bloqueia fórmulas encadeadas.

- 🔑

- Ponto-chave
- Pode retornar 0 em células de valor financeiro para viabilizar somas.

#### Slide 23.1 — Por que o PROCV Retorna #N/D?

- Código com espaço extra ("MAT-001 "): limpe com =ARRUMAR(A2).
- Número salvo como texto (triângulo verde na célula): converta para número ou use =VALOR(A2).
- Código realmente inexistente: trate com SEERRO e revise o cadastro.
- Último argumento esquecido: sem o 0, a busca é aproximada e pode trazer o item errado.

- 🧠
- Lembre-se
- Confira o tipo antes de culpar a fórmula: =ÉTEXTO(A2) retorna VERDADEIRO se o código estiver como texto.

#### Slide 24 — Verificação: Uso do SEERRO

- A função SEERRO impede que uma busca com PROCV procure o dado na planilha.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

#### Slide 25 — Verificação: Uso do SEERRO

- ✅

- A função SEERRO impede que uma busca com PROCV procure o dado na planilha.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- O SEERRO executa o cálculo normal e só age se houver falha na fórmula.

- 🔑

#### Slide 26 — Lógica Condicional: SE Aninhado

- LÓGICA CONDICIONAL

- Um único SE testa apenas duas saídas (Verdadeiro ou Falso). Para classificar três ou mais cenários, colocamos uma função SE dentro de outra.

- 🔍

- Exemplo
- Faixas de desconto de um fornecedor:
- Pedido de compra ≥ R$ 10.000: 15%
- Pedido de compra ≥ R$ 5.000: 10%
- Outros valores: 0%

#### Slide 27 — Construindo o SE Aninhado

- Veja a sintaxe estruturada para classificar a situação do estoque:
- =SE(D2<10; "Crítico"; SE(D2<=30; "Atenção"; "Normal"))

- 🧠

- Lembre-se
- Sempre ordene os testes em sequência lógica (do maior para o menor) para que as condições não se anulem.

#### Slide 28 — Agregação: Função CONT.SE

- AGREGAÇÃO DE DADOS

- A função CONT.SE conta quantas células atendem a um critério específico pré-estabelecido.
- Ela evita contagens manuais propensas a erros em cadastros volumosos.

- 🧠

- Lembre-se
- Sintaxe: =CONT.SE(intervalo; critérios)
- Exemplo: =CONT.SE(C2:C100; "Concluído")

#### Slide 29 — Exemplos de Critérios no CONT.SE

- Critérios do CONT.SE aceitam textos e operadores matemáticos:

- Texto Exato: =CONT.SE(C:C; "EPI") conta itens da categoria EPI.

- Maior que Zero: =CONT.SE(D:D; ">0") conta itens com saldo.

- Acima da Média: =CONT.SE(E:E; ">"&MÉDIA(E:E)) localiza pedidos grandes.

- Diferente de Vazio: =CONT.SE(B:B; "<>") conta cadastros preenchidos.

#### Slide 30 — Consolidação: Função SOMASE

- AGREGAÇÃO DE DADOS

- A função SOMASE soma valores numéricos apenas das linhas que atendem a uma condição determinada.
- É a base para demonstrativos financeiros e relatórios de vendas por filial.

- 🧠

- Lembre-se
- Sintaxe: =SOMASE(intervalo_critério; critérios; [intervalo_soma])

#### Slide 31 — Comparando CONT.SE e SOMASE

- CONT.SE (Frequência)
- Responde à pergunta: Quantas vezes?
- Ideal para contar número de notas fiscais emitidas, clientes ativos ou produtos devolvidos.

- SOMASE (Volume Financeiro)
- Responde à pergunta: Quanto gerou?
- Ideal para acumular receita total, volume de despesas ou peso total de itens expedidos.

- 🔍

- Exemplo
- =CONT.SE(Região; "Sul") → Retorna 42 pedidos realizados.

- 🔍

- Exemplo
- =SOMASE(Região; "Sul"; Faturamento) → Retorna R$ 85.000.

#### Slide 32 — Casos Práticos no Mercado

- Grandes redes varejistas utilizam exatamente essas funções para cruzar cadastros de clientes com cupons fiscais diariamente.

#### Slide 33 — Prática 1: Cruzando Cadastros

- Para preencher o Preço_Unit na célula D2:
- =SEERRO(PROCV(B2; 'Base Produtos'!$G:$I; 3; 0); 0)
- Esta fórmula busca o ID_Produto (B2) na base de produtos, retornando a coluna 3 (Preço_Tabela). O parâmetro 0 garante busca exata, e SEERRO retorna 0 caso não encontre o item.

#### Slide 34 — Solução: Prática 1

- ESTUDO DE CASO

- Análise da Fórmula
- A solução profissional combina a busca exata com o tratamento preventivo de dados:
- PROCV(...; 3; 0): o 0 (FALSO) força a busca exata do código.
- SEERRO(...; 0): devolve 0 quando o código não existe, sem quebrar os totais.

- 🔑

- Ponto-chave
- Retornar 0 em vez de texto permite que a coluna Total (=C2*D2) continue calculando sem quebrar a planilha.

#### Slide 35 — Prática 2: Análise por Categoria

- Almoxarifado central: análise de requisições por categoria
- Coluna C: Categoria | Coluna E: Valor Total
- Contar requisições de "EPI":
- =CONT.SE(C:C; "EPI")
- Valor total gasto com "Ferramentas":
- =SOMASE(C:C; "Ferramentas"; E:E)

#### Slide 36 — Solução: Prática 2

- 1. Contagem de Requisições
- O Excel verifica linha por linha no intervalo C2:C200 e incrementa o contador cada vez que encontra o termo.

- 2. Gasto com Ferramentas
- O critério é testado na coluna de categorias (C), mas o somatório é aplicado na coluna de valores (E).

- 🔑

- Ponto-chave
- Os intervalos de critério e de soma precisam ter o mesmo número de linhas.

- Lembre-se
- O critério entre aspas garante que o Excel procure exatamente o texto.

- 🧠

#### Slide 37 — Discussão: PROCV ou ÍNDICE?

- Em que situações em um ambiente empresarial você recomendaria abandonar o PROCV e adotar definitivamente a dupla ÍNDICE + CORRESPONDÊNCIA?

#### Slide 38 — Discussão: PROCV ou ÍNDICE?

- ✅

- Você poderia ter dito...
- Quando a coluna pesquisada estiver à direita do resultado.
- Em bases grandes, onde inserir colunas quebra o índice do PROCV.
- Para consultas bidirecionais em linhas e colunas.
- Para maior velocidade em planilhas com milhares de linhas.

#### Slide 39 — Prática 3: Relatório Gerencial

- Você é responsável pelo fechamento mensal:
- Base de estoque em A2:D100 (Cód, Item, Categoria, Saldo).
- Na tabela resumo, use SE na coluna 'Status':
- Saldo < 10: "Crítico"
- Saldo <= 30: "Atenção"
- Saldo > 30: "Normal"
- Calcule o total "Crítico" com CONT.SE.

#### Slide 40 — Síntese e Próxima Aula

- ENCERRAMENTO

- Habilidades Conquistadas
- Hoje você aprendeu a cruzar dados com segurança, tratar erros de buscas e criar métricas de agregação condicionais para relatórios gerenciais.
- No arquivo 6, ainda na Aula 3, avançaremos para Tabelas Dinâmicas e Gráficos Interativos para transformar esses números em painéis executivos!

- 🧠

- Lembre-se
- Pratique as combinações em arquivos reais para fixar a sintaxe dos argumentos.

### Arquivo `6-Excel-Avançado-Tabelas-Dinâmicas-e-Gráficos.md` (41 slides + 2 complementos)

#### Slide 1 — Excel Avançado: Tabelas Dinâmicas e Gráficos

- Transformando dados brutos em inteligência visual para gestão.

#### Slide 2 — O Mistério de Mil Linhas

- Imagine receber uma planilha com dez mil vendas do ano inteiro. O diretor entra na sala e pede agora o total vendido em cada região, mês a mês. Você somaria linha por linha com calculadora ou resolveria tudo em dois cliques?

#### Slide 3 — Objetivos da Aula de Hoje

- Neste encontro avançado, você vai dominar ferramentas essenciais de visualização e análise rápida:
- Estruturar Tabelas Dinâmicas com filtros, grupos e cálculos rápidos.
- Conectar Segmentações de Dados para criar relatórios interativos e ágeis.
- Construir Gráficos Dinâmicos e Combinados com múltiplos eixos visuais.

#### Slide 4 — Vocabulário Essencial de Análise

- Gráfico - Representação geométrica que revela tendências e comparações.

- Agrupamento - União de dados em blocos temporais ou faixas de valores.

- Dinâmica - Reorganiza campos instantaneamente sem alterar a base original.

- Segmentação - Filtro visual com botões para refinar relatórios dinâmicos.

#### Slide 5 — Recapitulação: Busca e Agregações

- Revisão de busca e agregação condicional:
- PROCV: Busca vertical à direita.
- ÍNDICE/CORRESP: Busca bidirecional flexível.
- SOMASE/CONT.SE: Agregações por regras.
- SEERRO: Tratamento de erros em fórmulas.

- 🧠

- Lembre-se
- Buscas operam célula a célula; tabelas dinâmicas resumem centenas de categorias instantaneamente.

#### Slide 6 — Quiz Rápido: Busca e Erros

- Pergunta 1:
- Qual função evita que fórmulas mostrem erros como #N/D ou #VALOR! na planilha?

- Pergunta 2:
- Por que a combinação ÍNDICE e CORRESP é mais versátil que o PROCV?

- Pergunta 3:
- Qual função usamos para somar as quantidades requisitadas apenas quando o setor for 'Manutenção'?

#### Slide 7 — Quiz Rápido: Busca e Erros

- ✅

- Resposta 1:
- A função SEERRO (ou IFERROR).

- Resposta 2:
- Porque ela permite buscar valores em qualquer direção, inclusive à esquerda da coluna de pesquisa.

- Resposta 3:
- A função SOMASE (ou SUMIF).

#### Slide 8 — O que é uma Tabela Dinâmica?

- A Tabela Dinâmica (Pivot Table) é uma ferramenta do Excel capaz de resumir, calcular e analisar dados automaticamente. Ela permite agrupar informações dispersas em categorias claras, calcular somas, médias ou contagens sem exigir a digitação manual de dezenas de fórmulas.

- 🔑

- Ponto-chave
- Ela nunca apaga nem modifica seus dados originais: funciona como uma lente analítica que lê a base bruta.

#### Slide 9 — Requisitos da Base Bruta

- Para criar tabelas dinâmicas, a base deve seguir regras de higiene cadastral:
- Cabeçalhos: Cada coluna deve ter um nome único.
- Sem linhas vazias: Linhas em branco partem a seleção.
- Uma informação por coluna: Datas, valores e textos em colunas próprias.

- ⚠️

- Atenção
- Células mescladas quebram a Tabela Dinâmica. Mantenha os dados limpos!

#### Slide 10 — Os Quatro Quadrantes Mágicos

- Linhas e Colunas
- Linhas: Define categorias verticais, como Categoria de material ou Fornecedor.
- Colunas: Espalha subcategorias horizontalmente, como Meses ou Pagamento.

- Valores e Filtros
- Valores: Onde entram números para cálculo (Soma, Média, Contagem).
- Filtros: Campo no topo para restringir a análise por filial ou ano.

#### Slide 11 — Teste seu Raciocínio de Estrutura

- Se você quer ver o faturamento total por categoria de produto, onde deve colocar o campo 'Valor' e o campo 'Categoria'?

- 1.

- Categoria em Linhas e Valor em Valores

- 2.

- Valor em Linhas e Categoria em Colunas

- 3.

- Ambos os campos na área de Filtros

- 4.

- Categoria em Valores e Valor em Linhas

#### Slide 12 — Teste seu Raciocínio de Estrutura

- ✅

- Se você quer ver o faturamento total por categoria de produto, onde deve colocar o campo 'Valor' e o campo 'Categoria'?

- ✓

- 1.

- Categoria em Linhas e Valor em Valores

- 2.

- Valor em Linhas e Categoria em Colunas

- 3.

- Ambos os campos na área de Filtros

- 4.

- Categoria em Valores e Valor em Linhas

#### Slide 13 — Passo a Passo de Criação

- Crie tabelas dinâmicas em 4 passos:
- Selecione uma célula da base de dados.
- Vá em Inserir > Tabela Dinâmica.
- Confirme o intervalo e escolha Nova Planilha.
- Arraste campos para os quatro quadrantes.

- 🔍

- Exemplo
- Ao arrastar 'Cliente' para Linhas e 'Total' para Valores, o Excel consolida compras por cliente instantaneamente.

#### Slide 14 — Configuração do Campo de Valor

- O Excel soma números e conta textos por padrão. Altere a operação facilmente:
- Média: Avalia tíquete médio ou preço praticado.
- Contagem: Descobre a quantidade de pedidos emitidos.
- Máximo/Mínimo: Revela picos de venda e menores transações.

- 🧠

- Lembre-se
- Clique com o botão direito em um número e use 'Resumir Valores Por' para alternar o cálculo.

#### Slide 15 — Agrupamento de Datas e Horas

- Bases operacionais registram vendas diárias com dia, mês e ano. Em vez de ler centenas de datas soltas, use o Agrupamento Automático do Excel. Ele organiza transações em Meses, Trimestres e Anos automaticamente.

- 🔑

- Ponto-chave
- Clique em qualquer data da tabela dinâmica, aperte o botão direito e selecione 'Agrupar'. Marque Meses e Trimestres para obter resumos sazonais.

#### Slide 16 — Ordenação e Filtros Rápidos

- Apresentar dados desordenados dificulta a tomada de decisão. As tabelas dinâmicas permitem hierarquizar respostas:
- Mais Vendidos ao Topo: Ordene o campo de valores de forma Decrescente (Z-A).
- Filtro dos 10 Primeiros: Isole apenas os clientes ou produtos líderes.
- Filtro por Rótulo: Mostre apenas registros que contenham palavras específicas.

#### Slide 17 — Checando o Agrupamento

- Se você agrupar datas por Mês na tabela dinâmica, a base de dados original terá suas datas apagadas para sempre.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

#### Slide 18 — Checando o Agrupamento

- ✅

- Se você agrupar datas por Mês na tabela dinâmica, a base de dados original terá suas datas apagadas para sempre.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- A tabela dinâmica apenas exibe uma visão consolidada, preservando todas as datas originais da base intactas.

- 🔑

#### Slide 19 — Campos Calculados na Tabela

- Calcule o custo de armazenagem de 5% sem alterar a base:
- O Campo Calculado cria variáveis na tabela dinâmica.
- Vá em Análise de Tabela Dinâmica > Campos, Itens e Conjuntos > Campo Calculado.
- Use a fórmula: ='Valor da Compra' * 0,05.

- Curiosidade
- O campo calculado atualiza-se ao inserir novos dados na base.

- 🤯

#### Slide 20 — Segmentação de Dados (Slicers)

- A Segmentação de Dados substitui os filtros suspensos tradicionais por blocos de botões táteis e visuais:
- Cada botão representa uma categoria da sua coluna.
- Clicar em um botão filtra instantaneamente o relatório.
- Segurando a tecla , é possível selecionar múltiplos botões.
- Botões cinzas sem realce indicam categorias sem movimentação.

#### Slide 21 — Aplicação: Vendas e Estoque

- Controle de Estoque
- Giro: Pedidos por lote.
- Reposição: Estoque mínimo.
- Custo: Unidades x custo unitário.

- Performance Comercial
- Vendas: Metas batidas.
- Mix: Categorias mais rentáveis.
- Concentração: Cidades com maior faturamento.

#### Slide 21.1 — Compras por Fornecedor e Mês

- Situação-problema: qual fornecedor e qual mês concentram as compras?

- Base Compras: Data | Fornecedor | Item | Quantidade | Valor
- Linhas: Fornecedor · Colunas: Data agrupada por Mês · Valores: Soma de Valor
- Mostrar valores como: % do Total Geral → revela a concentração
- Gráfico dinâmico: colunas agrupadas (comparar fornecedores mês a mês)

- Perguntas de análise
- Qual fornecedor tem a maior fatia? Há dependência de um só (acima de 50%)?
- Em que mês houve pico de compras? Foi planejado?
- Que ação a área de compras deve propor?

#### Slide 22 — Vídeo: Tabelas Dinâmicas na Prática

- Crie tabelas dinâmicas com dados brutos. Mova campos entre linhas e colunas para mudar a perspectiva do relatório.

#### Slide 23 — Ordem de Montagem do Relatório

- Qual é a sequência correta para montar uma análise dinâmica estruturada no Excel?

- Clicar em Inserir Tabela Dinâmica e abrir nova planilha

- Garantir cabeçalhos e ausência de células mescladas na base

- Inserir Segmentação de Dados para navegação interativa

- Arrastar dimensões para Linhas e métricas para Valores

#### Slide 24 — Ordem de Montagem do Relatório

- ✅

- Qual é a sequência correta para montar uma análise dinâmica estruturada no Excel?

- 1

- Garantir cabeçalhos e ausência de células mescladas na base

- 2

- Clicar em Inserir Tabela Dinâmica e abrir nova planilha

- Arrastar dimensões para Linhas e métricas para Valores

- 3

- 4

- Inserir Segmentação de Dados para navegação interativa

#### Slide 25 — Visualização de Dados: Por que Gráficos?

- O cérebro humano processa formas, cores e tamanhos muito mais rápido do que lê tabelas repletas de números. Um gráfico bem escolhido comunica em poucos segundos se as metas foram batidas, se há perdas em um setor ou se o faturamento está crescendo.

- 🧠

- Lembre-se
- Um gráfico ruim distorce a realidade; um gráfico correto conduz a equipe à decisão certa.

#### Slide 26 — Escolhendo o Tipo Ideal de Gráfico

- Linhas - Mostra evolução e tendências em dias, meses ou trimestres.

- Dispersão (XY) - Identifica correlação entre variáveis quantitativas.

- Colunas e Barras - Compara itens ou ranking de categorias (itens, fornecedores).

- Pizza ou Rosca - Mostra partes de um todo (limite 4 fatias).

- Regra rápida: comparar → colunas; tendência → linhas. Muitas categorias nunca vão em pizza.

#### Slide 27 — O Poder do Gráfico Dinâmico

- Diferente de um gráfico tradicional estático, o Gráfico Dinâmico está diretamente conectado à Tabela Dinâmica:
- Se você filtrar um item na tabela, o gráfico se altera sozinho.
- Se você alternar botões da Segmentação de Dados, as colunas sobem e descem em tempo real.
- Botões de campo integrados ao gráfico permitem expandir ou recolher períodos.

#### Slide 28 — Estilização e Clareza Visual

- Menos é mais. Aplique boas práticas de design para não cansar o leitor:
- Elimine poluição: Retire linhas de grade e bordas pesadas.
- Contraste intencional: Use cor marcante para o destaque e cinza para o restante.
- Tipografia limpa: Mantenha títulos diretos e legíveis.

- ⚠️

- Atenção
- Evite efeitos 3D ou sombras exageradas. Eles distorcem as proporções dos dados!

#### Slide 29 — Inserção de Rótulos Estratégicos

- Rótulos de dados informam o número exato sobre a barra ou linha:
- Quando utilizar rótulos diretos nas barras, você pode remover o eixo numérico vertical para despoluir a visualização.
- Posicione rótulos na extremidade externa para fácil leitura.
- Utilize formatação de moeda abreviada (ex: ) para tabelas grandes.

#### Slide 30 — Gráficos Combinados (Eixo Duplo)

- O Problema das Escalas
- Como comparar o Faturamento (R$ 500.000) com a Margem de Lucro (12%) no mesmo gráfico? A margem percentual viraria uma linha invisível grudada no chão do gráfico.

- A Solução do Eixo Secundário
- O Gráfico Combinado insere um segundo eixo vertical à direita. As colunas leem o volume em reais à esquerda e a linha lê os percentuais à direita com total precisão.

#### Slide 31 — Verificação: Gráficos Combinados

- Quando é indispensável utilizar um gráfico combinado com eixo secundário?

- 1.

- Ao comparar duas métricas com grandezas ou escalas muito diferentes

- 2.

- Sempre que a tabela de origem tiver células em branco

- 3.

- Apenas quando o gráfico tiver mais de 20 colunas de dados

- 4.

- Quando queremos transformar colunas em formato de pizza

#### Slide 32 — Verificação: Gráficos Combinados

- ✅

- Quando é indispensável utilizar um gráfico combinado com eixo secundário?

- ✓

- 1.

- Ao comparar duas métricas com grandezas ou escalas muito diferentes

- 2.

- Sempre que a tabela de origem tiver células em branco

- 3.

- Apenas quando o gráfico tiver mais de 20 colunas de dados

- 4.

- Quando queremos transformar colunas em formato de pizza

#### Slide 33 — Conectando Filtros a Múltiplos Gráficos

- O verdadeiro poder de um painel interativo surge quando uma única Segmentação de Dados comanda diversos gráficos ao mesmo tempo. Ao clicar em 'Região Sul', todos os gráficos da tela se sincronizam imediatamente para mostrar o cenário do Sul.

- 🔑

- Ponto-chave
- Clique na segmentação com o botão direito, selecione 'Conexões de Relatório' e marque todas as tabelas dinâmicas desejadas.

#### Slide 34 — Linha do Tempo Dinâmica

- Além da segmentação comum, o Excel oferece a Linha do Tempo para colunas contendo datas:
- Uma barra horizontal elegante com deslizador de períodos.
- Permite alternar a escala entre Anos, Trimestres, Meses e Dias.
- Basta arrastar as bordas do seletor para analisar qualquer intervalo de tempo.

#### Slide 35 — Erros Comuns na Visualização

- O Erro da Pizza Lotada
- Criar gráficos de pizza com dezenas de categorias torna a leitura impossível. Gráficos circulares servem apenas para 2 a 4 fatias com contrastes claros.

- Eixo Truncado Desleal
- Começar o eixo de colunas em valores diferentes de zero distorce a proporção visual e transmite uma falsa impressão de crescimento descontrolado.

#### Slide 36 — Atualização Automática de Dados

- Analistas devem dominar este ponto:
- A Tabela Dinâmica usa um 'cache' de dados.
- Se alterar a base bruta, a tabela não atualiza sozinha.
- Clique com o botão direito em Atualizar ou use Alt+F5.

- 🧠

- Lembre-se
- Transformar a base em Tabela Oficial (Inserir → Tabela) faz novas linhas serem incorporadas automaticamente à fonte!

#### Slide 36.1 — Proteger o Relatório Antes de Distribuir

- Revisão → Proteger Planilha, marcando "Usar Tabela Dinâmica e Gráfico Dinâmico" para os filtros continuarem funcionando.
- Bloqueie a aba da base de compras: ninguém altera os dados de origem por engano.
- Guarde a senha com o responsável pelo relatório.

- ⚠️
- Atenção
- Proteção evita erro acidental, não é segurança total: dados sigilosos pedem controle de acesso ao arquivo.

#### Slide 37 — Atividade: Relatórios Multi-Perspectiva

- Abra a base de compras do almoxarifado e execute estas análises:
- Setorial: Crie Tabela Dinâmica com Valor Comprado por Categoria de Material.
- Temporal: Agrupe datas por Trimestre e mova para Colunas.
- Percentual: Exiba como '% do Total', identifique o trimestre
- de maior fatia e anote sua conclusão.

#### Slide 38 — Atividade: Conjunto de Gráficos Dinâmicos

- Desenvolva a camada visual interativa:
- Gráfico de Barras: Exiba os 5 itens de maior custo em estoque.
- Gráfico Combinado: Mostre Valor Comprado e % do Orçamento mensal.
- Painel Integrado: Adicione segmentação por Fornecedor.

#### Slide 39 — Desafio de Fixação dos Conceitos

- Relacione as palavras com as definições

- Gráfico Combinado

- Resumo interativo de base bruta capaz de condensar cálculos sem criar novas fórmulas.

- Agrupamento

- Visualização que sobrepõe colunas e linhas utilizando dois eixos com escalas distintas.

- Tabela Dinâmica

- Recurso que reúne datas individuais em blocos de meses, trimestres ou anos.

- Segmentação de Dados

- Painel com botões clicáveis para filtrar relatórios dinâmicos de forma ágil e intuitiva.

#### Slide 40 — Desafio de Fixação dos Conceitos

- ✅

- Relacione as palavras com as definições

- Gráfico Combinado

- Resumo interativo de base bruta capaz de condensar cálculos sem criar novas fórmulas.

- A

- Agrupamento

- B

- Visualização que sobrepõe colunas e linhas utilizando dois eixos com escalas distintas.

- Tabela Dinâmica

- Recurso que reúne datas individuais em blocos de meses, trimestres ou anos.

- C

- Segmentação de Dados

- D

- Painel com botões clicáveis para filtrar relatórios dinâmicos de forma ágil e intuitiva.

#### Slide 41 — Rumo aos Dashboards Executivos

- Hoje você dominou os motores analíticos mais cobiçados do mercado corporativo: a síntese precisa das Tabelas Dinâmicas e o impacto visual dos Gráficos Interativos. Na Aula 4 (arquivo 7), juntaremos tudo isso em um Dashboard Executivo Completo de nível profissional!

---

## AULA 4: Dashboards Executivos e Projeto Final Integrado

**Total de Slides:** 40 (+ 3 complementos N.x)

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 4 — Dashboards Executivos e Projeto Final (8h)
> - **Conhecimentos [oficial]:** 2.2.7 Dashboard · 2.2.8 Gráficos dinâmicos (integra todos os conhecimentos)
> - **Capacidades:** C1 · C2 · S3 Criatividade e iniciativa · S5 Liderança e colaboração
> - **Indicadores de desempenho:** 11 (dashboard com KPIs, gráficos dinâmicos e segmentação) · 12 (storytelling com dados)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** 9 (giro, ruptura e custo do estoque numa tela)

### Arquivo `7-Dashboards-Interativos-e-Integração-de-Dados.md` (40 slides + 3 complementos)

#### Slide 1 — Dashboards Interativos e Integração de Dados

- Transformando números brutos em decisões visuais estratégicas na gestão.

#### Slide 2 — Decisões em Segundos

- Se um diretor tivesse apenas trinta segundos para avaliar a saúde da empresa inteira, ele conseguiria entender lendo duzentas linhas de planilha?

#### Slide 3 — Objetivos da Aula

- O Que Vamos Construir Hoje
- Domine a apresentação de dados gerenciais:
- Projetar layouts intuitivos com KPIs
- Integrar gráficos e tabelas em tela única
- Aplicar segmentadores para controle total
- Apresentar conclusões com storytelling com dados

- 🧠

- Lembre-se
- Dashboards eficazes respondem perguntas de negócio sem esforço mental do leitor.

#### Slide 4 — Vocabulário Essencial

- Interatividade
- Capacidade de filtrar dados instantaneamente por cliques.

- Layout
- Estrutura e distribuição visual planejada dos elementos em tela.

- Dashboard
- Painel visual integrado com métricas centrais do negócio.

- Indicador
- Métrica quantitativa direta para acompanhar metas críticas.

#### Slide 5 — Relembrando: Tabelas Dinâmicas

- RECAPITULAÇÃO

- Motor dos Painéis
- Transformamos registros de vendas em resumos automáticos via Tabela Dinâmica:
- Linhas/Colunas: organizam categorias e períodos
- Valores: somam faturamentos ou médias
- Filtros: isolam dados rapidamente

- 🔑

- Ponto-chave
- Tabelas dinâmicas estruturadas são a base de todo dashboard automático.

#### Slide 6 — Relembrando: Gráficos Dinâmicos

- RECAPITULAÇÃO

- Resumo
- Gráficos dinâmicos refletem alterações nas tabelas de origem instantaneamente.
- Linha: evolução temporal.
- Colunas: comparação de categorias.
- Barras: ranking de produtos.

- ⚠️

- Atenção
- Evite pizza com >3 categorias: comparação visual de áreas é ineficiente.

#### Slide 7 — Quiz: Escolha de Gráficos

- Qual tipo de gráfico dinâmico é mais recomendado para demonstrar o crescimento do faturamento de uma loja mês a mês durante um ano?

- 1.

- Gráfico de Dispersão sem conexão entre os pontos mensais.

- 2.

- Gráfico de Linha, pois evidencia variações temporais contínuas.

- 3.

- Gráfico de Pizza com doze fatias estreitas e coloridas.

- 4.

- Gráfico de Radar com múltiplos eixos sobrepostos.

#### Slide 8 — Quiz: Escolha de Gráficos

- ✅

- Qual tipo de gráfico dinâmico é mais recomendado para demonstrar o crescimento do faturamento de uma loja mês a mês durante um ano?

- 1.

- Gráfico de Dispersão sem conexão entre os pontos mensais.

- ✓

- 2.

- Gráfico de Linha, pois evidencia variações temporais contínuas.

- 3.

- Gráfico de Pizza com doze fatias estreitas e coloridas.

- 4.

- Gráfico de Radar com múltiplos eixos sobrepostos.

#### Slide 9 — O que é um Dashboard?

- O Painel de Controle Gerencial
- Assim como o velocímetro e os marcadores de combustível mostram tudo o que o motorista precisa sem que ele abra o capô do carro, um dashboard executivo sintetiza o desempenho geral de uma organização em uma única interface clara e consolidada.

- Exemplo
- Na gestão de estoque de uma distribuidora, o dashboard avisa em segundos quais produtos estão prestes a faltar nas prateleiras.

- 🔍

#### Slide 10 — Planilha Comum versus Dashboard

- Tabela de Registro
- Armazena transações brutas em milhares de linhas. É densa, cansativa para leitura rápida e exige fórmulas manuais contínuas para cada nova pergunta de negócio.

- Painel Estratégico
- Agrupa apenas totais críticos e indicadores calculados. Permite que gestores descubram gargalos e oportunidades em segundos com botões visuais.

#### Slide 11 — Tomada de Decisão Estratégica

- Da Informação à Ação
- Dados geram valor ao permitir ações rápidas e precisas. Líderes buscam respostas objetivas:
- Onde estão os maiores custos?
- Quem são os clientes com maior retenção?
- Quando ocorreram quedas de rentabilidade?

- 🧠

- Lembre-se
- Dashboards não apenas exibem o passado: eles orientam os próximos passos da equipe.

#### Slide 12 — Princípios de Design e Usabilidade

- A Regra de Ouro: Simplicidade Funcional
- Menos é mais na comunicação analítica. O objetivo primordial de qualquer painel é facilitar a leitura humana sem sobrecarregar a memória de trabalho com ornamentos desnecessários.

- ⚠️

- Atenção
- Evite o 'efeito arco-íris': usar dez cores diferentes em uma mesma tela confunde o leitor e oculta os verdadeiros alertas de gestão.

#### Slide 13 — Anatomia de um Dashboard

- 1. Cabeçalho
- Título do projeto, data de atualização e logo corporativo discreto.

- 2. Cartões KPI
- Métricas macro com valores consolidados no topo da tela.

- 3. Gráficos Centrais
- Comparações visuais de categorias e tendências temporais.

- 4. Barra de Filtros
- Segmentadores laterais ou superiores para navegação interativa.

#### Slide 14 — O que são KPIs?

- MÉTRICAS

- Indicadores-Chave de Desempenho
- KPI (Key Performance Indicator) mede o sucesso de metas empresariais.
- Faturamento: soma líquida de vendas
- Ticket Médio: gasto médio por cliente
- Atraso: % de entregas fora do prazo

- 🔍

- Exemplo
- Meta: R$ 50k. Realizado: R$ 52,3k. Meta superada.

#### Slide 14.1 — KPIs do Estoque

- Situação-problema: a gerência quer ver, numa tela, giro, ruptura e custo do estoque do mês.

| KPI | Cálculo | Exemplo |
|---|---|---|
| Giro | custo das saídas ÷ estoque médio | R$ 120.000 ÷ R$ 30.000 = 4 vezes no trimestre |
| Ruptura | requisições não atendidas ÷ total de requisições | 12 ÷ 400 = 3% |
| Custo do estoque | soma de saldo × custo unitário | =SOMA(H2:H300) |
| Cobertura | saldo ÷ consumo médio diário | 700 ÷ 100 = 7 dias |

- 🔑
- Ponto-chave
- Todo KPI precisa de meta e semáforo: ruptura acima de 5% fica vermelha.

#### Slide 15 — Projetando Cartões de Métricas

- MÉTRICAS

- Clareza e Espaçamento
- Cartões devem conter apenas três informações:
- Rótulo: nome do indicador em caixa alta
- Número: tamanho grande para leitura rápida
- Tendência: seta indicando alta ou baixa

- 🔑

- Ponto-chave
- Use dimensões idênticas para harmonia e equilíbrio visual.

#### Slide 16 — Padrão de Leitura em Z

- O Caminho do Olhar
- Olhos exploram telas em Z:
- Topo: leitura da esquerda à direita
- Diagonal: descida ao canto inferior
- Base: leitura final à direita

- Aplicação no Layout
- Topo: KPIs de alto impacto
- Centro: gráfico de tendência
- Base: detalhes e rankings

#### Slide 17 — Psicologia das Cores nos Painéis

- Cores Comunicam Significados
- Cores possuem convenções universais:
- Verde: meta atingida
- Vermelho: alerta ou queda
- Azul/Cinza: dados neutros

- ⚠️

- Atenção
- Evite vermelho para crescimento positivo; causa pânico desnecessário.

#### Slide 18 — Verificação: Uso de Cores

- Para tornar um painel executivo dinâmico e atrativo, cada gráfico deve ter uma cor chamativa diferente, como amarelo, rosa e roxo.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

#### Slide 19 — Verificação: Uso de Cores

- ✅

- Para tornar um painel executivo dinâmico e atrativo, cada gráfico deve ter uma cor chamativa diferente, como amarelo, rosa e roxo.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- O excesso de cores gera sobrecarga cognitiva e deve-se preferir paletas sóbrias com cores de alerta reservadas para desvios críticos.

- 🔑

#### Slide 20 — O Poder dos Segmentadores de Dados

- Filtros Visuais
- Segmentadores (Slicers) substituem menus por botões, agilizando dashboards.

- Botões de Seleção
- Filtre regiões/categorias. Use Ctrl para múltiplas seleções.

- Linha do Tempo
- Filtro de datas: arraste a barra para selecionar períodos.

#### Slide 21 — Conexões de Relatório no Excel

- O Segredo da Interatividade Total
- Por padrão, um segmentador controla apenas sua tabela. Para gerenciar o painel inteiro:
- Clique com o botão direito no segmentador
- Selecione Conexões de Relatório
- Marque as tabelas dinâmicas desejadas

- 🧠

- Lembre-se
- Ao marcar as caixas, um clique em 'Região Sul' atualizará todos os gráficos do painel!

#### Slide 22 — Exemplo Prático em Vídeo

- Integração em Tempo Real
- Conecte gráficos e segmentadores para decisões rápidas.

#### Slide 23 — A Estrutura de Abas Recomendada

- Organização em Camadas Profissionais
- Nunca misture os dados brutos com a tela final de apresentação. Mantenha seu arquivo de trabalho rigorosamente dividido em três abas especializadas para garantir segurança e organização.

- Ponto-chave
- Separar a visualização da mecânica dos cálculos previne exclusões acidentais de fórmulas durante reuniões gerenciais.

- 🔑

#### Slide 24 — As Três Abas Fundamentais

- 1. Base_Dados
- Onde ficam as tabelas brutas de importação, sem gráficos nem formatações decorativas excessivas.

- 2. Calculos_Apoio
- Aba técnica reservada exclusivamente para as tabelas dinâmicas que alimentam os gráficos visuais.

- 3. Dashboard
- A única aba que o diretor verá: limpa, proporcional, sem linhas de grade visíveis e 100% interativa.

#### Slide 25 — Ordem de Construção

- Qual é a sequência lógica correta para construir um dashboard robusto e funcional a partir do zero?

- Criar os gráficos dinâmicos e recortá-los para a aba do Dashboard

- Gerar tabelas dinâmicas de apoio com as somas e médias necessárias

- Organizar e validar a base de dados bruta em tabela estruturada

- Inserir segmentadores e conectar todas as tabelas via Conexões de Relatório

#### Slide 26 — Ordem de Construção

- ✅

- Qual é a sequência lógica correta para construir um dashboard robusto e funcional a partir do zero?

- 1

- Organizar e validar a base de dados bruta em tabela estruturada

- 2

- Gerar tabelas dinâmicas de apoio com as somas e médias necessárias

- Criar os gráficos dinâmicos e recortá-los para a aba do Dashboard

- 3

- 4

- Inserir segmentadores e conectar todas as tabelas via Conexões de Relatório

#### Slide 27 — Alinhamento e Ajuste Fino

- A Diferença Entre Amador e Profissional
- Gráficos desalinhados transmitem desleixo. Use as ferramentas nativas:
- Alinhar à Esquerda: unifica margens
- Distribuir Verticalmente: espaçamento idêntico
- Ajustar à Grade: fixa bordas nas células

- 🔍

- Exemplo
- Segure Alt ao redimensionar gráficos para fixá-los com precisão nas linhas da planilha.

#### Slide 28 — Limpando a Interface para Entrega

- Interface Profissional
- Remova elementos de planilha antes da apresentação:
- Desmarque Linhas de Grade (guia Exibir)
- Oculte Barra de Fórmulas e cabeçalhos
- Oculte botões de campo dos gráficos

- 🧠

- Lembre-se
- Sem linhas de grade, o painel parece software corporativo.

#### Slide 29 — Apresentando para a Alta Liderança

- Postura e Condução Executiva
- Ao apresentar para diretores, nunca comece explicando as fórmulas ou as dificuldades técnicas encontradas na planilha. Foque exclusivamente no impacto financeiro e operacional que os números revelam.

- 🔑

- Ponto-chave
- Apresente primeiro a conclusão: 'Nossas perdas de estoque caíram 14%', e em seguida demonstre o gráfico que comprova essa afirmação.

#### Slide 29.1 — Storytelling com Dados

- Conte a história em 4 passos: Pergunta → Dado → Conclusão → Ação.

- Pergunta: por que faltaram luvas em março?
- Dado: ruptura de 8% e cobertura de apenas 3 dias.
- Conclusão: o estoque mínimo está abaixo do consumo real.
- Ação: subir o mínimo para 10 dias de cobertura.

- 🧠
- Lembre-se
- Roteiro de 5 minutos: 1 min para a pergunta, 2 para os dados, 1 para a conclusão e 1 para a ação proposta.

#### Slide 30 — Erros Comuns em Dashboards

- Gráficos 3D Desnecessários
- Barras e pizzas tridimensionais distorcem proporções visuais e induzem o cérebro a ler valores errados. Prefira sempre elementos bidimensionais planos.

- Excesso de Informação
- Colocar mais de 7 métricas na mesma tela destrói o foco. Se um indicador não altera decisões imediatas do gestor, retire-o imediatamente do painel.

#### Slide 31 — Debate: O Que Mostrar?

- Um gerente de loja insiste em colocar 15 gráficos diferentes em uma única tela de dashboard para 'não perder nenhum detalhe'. Como você justificaria para ele que reduzir o painel para apenas 4 gráficos principais geraria decisões mais rápidas e eficientes?

#### Slide 32 — Debate: O Que Mostrar?

- ✅

- Você poderia ter dito...
- Argumentar sobre sobrecarga cognitiva: quando tudo é destacado, nada se destaca.
- Mostrar que decisões rápidas dependem de foco nos indicadores prioritários.
- Sugerir um segundo painel para consultas táticas pontuais.

#### Slide 33 — Desafio Prático: O Caso da TecLog

- Cenário de Negócio
- A TecLog monitorou 1.200 entregas semestrais e precisa de um painel gerencial.
- Problema: custos de frete altos na Região Norte
- Dados: data, estado, veículo, custo e prazo
- Objetivo: criar dashboard interativo para diretoria

- 🔍

- Exemplo
- Você é o analista júnior responsável por este desafio.

#### Slide 34 — Planejando o Rascunho no Papel

- Wireframe: Esboço Inicial
- Desenhe no papel antes do software para evitar retrabalho.

- Bloco Superior
- Cartão 1: Total Frete (R$)
- Cartão 2: % Entregas
- Cartão 3: Tempo Médio

- Bloco Visual
- Gráfico 1: Evolução Custos
- Gráfico 2: Custo por Veículo
- Filtros: Região e Mês

#### Slide 35 — Atividade 1: Rascunho e Métricas

- Em duplas, desenhem o layout da TecLog:
- Delimitem a moldura da tela.
- Desenhem 3 caixas para KPIs.
- Posicionem 2 gráficos dinâmicos.
- Definam espaço para 2 filtros.
- Tempo: 15 minutos. Sejam precisos!

#### Slide 36 — Guia de Montagem no Software

- Executando o Projeto
- Com o esboço validado, siga o protocolo na planilha:
- Nomeie abas: Base_Dados, Calculos_Apoio e Dashboard
- Crie tabelas dinâmicas na aba Calculos_Apoio
- Mova gráficos para a aba Dashboard
- Vincule segmentadores aos gráficos

- 🔑

- Ponto-chave
- Use tons de azul-marinho e cinza para manter o padrão sóbrio da empresa.

#### Slide 37 — Atividade 2: Construção Completa

- Abra 'TecLog_Dados_Semestrais.xlsx' e monte o painel:
- Aba 'Dashboard': oculte linhas de grade.
- Crie 3 cartões de indicadores no topo.
- Insira gráfico de linha e barras comparativas.
- Adicione segmentador 'Região' nas tabelas.
- Filtre 'Norte' e identifique maiores fretes.
- Tempo: 35 min. Chame o professor para validar!

#### Slide 37.1 — Projeto Final: Dashboard de Estoque

- Dataset bruto de movimentações do mês → dashboard → apresentação.

- Organize em Base_Dados, Calculos_Apoio e Dashboard.
- 4 KPIs: giro, ruptura, custo e cobertura, com meta e semáforo.
- 2 gráficos dinâmicos e segmentação por setor.
- Apresentação de 5 minutos à "gerência" com storytelling.

- Critérios de correção
- Análise, cálculos, design e apresentação oral: 25% cada. Média da UC: 70 pontos.

- No LibreOffice Calc sem segmentação de dados, use os filtros da tabela dinâmica.

#### Slide 38 — Revisão Executiva dos Conceitos

- Pergunta 1:
- Qual comando deve ser acessado para fazer com que um único segmentador filtre simultaneamente dois gráficos gerados por tabelas dinâmicas diferentes?

- Pergunta 2:
- Por que devemos desmarcar as linhas de grade da planilha na aba final do dashboard?

- Pergunta 3:
- Qual é a principal função dos cartões de KPI posicionados na parte superior de um painel de gestão?

#### Slide 39 — Revisão Executiva dos Conceitos

- ✅

- Resposta 1:
- Conexões de Relatório (ou Conexões de Tabela Dinâmica).

- Resposta 2:
- Para eliminar poluição visual e conferir aparência profissional de aplicativo executivo.

- Resposta 3:
- Apresentar números e métricas consolidadas de maior impacto imediato para tomada de decisão rápida.

#### Slide 40 — Você é um Analista de Dados!

- Encerramento da Nossa Jornada
- Você percorreu um caminho completo: dos fundamentos matemáticos à criação de painéis interativos que orientam negócios. Agora, você possui ferramentas sólidas para transformar dados brutos em inteligência estratégica!

- 🧠

- Lembre-se
- Dominar a visualização de dados abre portas em qualquer setor da economia moderna.

---

## AVALIAÇÃO DA UNIDADE CURRICULAR (conforme a ementa)

> Complemento da ementa (`../EMENTA-CHALKIE-AI.md`, Seção V); não existe no `.pptx`.

### Tabela de notas

| Avaliação | Data | Pontos |
|---|---|---|
| Atividades de sala de aula | Toda aula | 40 |
| Prova objetiva 01 | 01/10/2026 | 20 |
| Prova objetiva 02 e prova prática 01 | 08/10/2026 | 20 |
| Recuperação de todas | 13/10/2026 | 20 |
| Comportamento | Toda aula | 10 |

### Nota final e aprovação

- **Total:** 110 pontos · **Nota final:** 100 pontos · **Média:** 70 pontos · presença mínima de 75%.
- **Recuperação:** prova de 13/10/2026, com nova base de dados equivalente, retomando só as capacidades pendentes, conforme regimento da unidade SENAI.

### Rubrica de desempenho (4 níveis)

| Nível | Nota | Descrição |
|---|---|---|
| **Excelente** | 9–10 | Cálculos e fórmulas corretos, planilha organizada e protegida, conclusões claras e justificadas |
| **Bom** | 7–8 | Resultado correto com pequenos ajustes de formatação ou explicação |
| **Aceitável** | 5–6 | Cumpre o essencial com orientação; erros pontuais que não invalidam a análise |
| **Insuficiente** | 0–4 | Cálculos ou fórmulas incorretos que levam a conclusão errada, ou tarefa não concluída |

### Dificuldades comuns (e como tratar)

| Dificuldade | Como tratar | Onde no relatório |
|---|---|---|
| Porcentagem sobre porcentagem | Multiplicar os fatores (1,12 × 0,95), nunca somar 12% e −5% | Aula 1, slide 19.1 |
| Unidades misturadas | Converter para a mesma unidade e exigir a unidade em cada resultado | Aula 1, slide 22.1 |
| Referência que "anda" | Mostrar o erro da fórmula copiada sem $ e corrigir com F4 | Aula 2, slides 23–26 |
| PROCV com #N/D | Conferir espaço extra e número salvo como texto (ARRUMAR, VALOR, ÉTEXTO) | Aula 3, slide 18.1 |
| Gráfico errado | Regra "comparar → colunas, tendência → linhas"; pizza só com poucas fatias | Aula 3, slides 27–28 |

### Cobertura da ementa neste relatório

| Ementa | Onde está |
|---|---|
| 1.1 Conjuntos numéricos | Aula 1, slides 5–6 |
| 1.2 Razão e proporção | Aula 1, slides 11–12 |
| 1.3 Regra de três | Aula 1, slides 13–17, 13.1 e 15.1 |
| 1.4 Conversão de unidades | Aula 1, slide 22.1 |
| 1.5 Porcentagem | Aula 1, slides 18–22, 19.1 e 19.2 |
| 1.6 Área, volume e peso | Aula 1, slides 23–25, 23.1 e 24.1 |
| 1.7 Sequência lógica | Aula 1, slides 32–35 |
| 1.8 Estatística básica | Aula 1, slides 26–31, 27.1, 31.1 e 31.2 |
| 2.2.1 Formatação condicional | Aula 2, slides 28 e 28.1 |
| 2.2.2 Funções (PROCV, PROCH, SE, CONT.SE) | Aula 2, slides 20–22; Aula 3, slides 8–18, 9.1 e 18.1 |
| 2.2.3 Tabela dinâmica | Aula 3, slides 20–25 e 23.1 |
| 2.2.4 Filtros | Aula 3, slide 19 |
| 2.2.5 Validação de dados | Aula 2, slides 30 e 30.1 |
| 2.2.6 Proteção de células | Aula 3, slides 33–35 |
| 2.2.7 Dashboard | Aula 4, slides 8–31, 13.1 e 38.1 |
| 2.2.8 Gráficos dinâmicos | Aula 3, slides 26–32 e 23.2; Aula 4, slides 18–22 |
| Situações-problema 1 a 9 | Aula 1: 13.1, 19.1, 23.1, 27.1 · Aula 2: 30.1, 28.1 · Aula 3: 9.1, 23.1 · Aula 4: 13.1 |

---
