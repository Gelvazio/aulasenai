# 6 Excel Avançado Tabelas Dinâmicas e Gráficos

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 3 — Excel Avançado e Visualização (8h), parte 2 de 2
> - **Conhecimentos [oficial]:** 2.2.3 Tabela dinâmica · 2.2.4 Filtros · 2.2.6 Proteção de células · 2.2.8 Gráficos dinâmicos
> - **Capacidades:** C1 · C2 · S2 Aprendizagem ativa
> - **Indicadores de desempenho:** 9 (tabela dinâmica) · 10 (proteção e escolha do gráfico adequado)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** 8 (compras por fornecedor e mês)
> - **Editor:** Excel ou LibreOffice Calc (funções em português; PROCV, SE, CONT.SE, SOMASE e SEERRO têm o mesmo nome nos dois)
> - Slides `N.1`, `N.2`... são complementos da ementa e não existem no `.pptx`.

## Slide 1 — Excel Avançado: Tabelas Dinâmicas e Gráficos

- Transformando dados brutos em inteligência visual para gestão.

## Slide 2 — O Mistério de Mil Linhas

- Imagine receber uma planilha com dez mil vendas do ano inteiro. O diretor entra na sala e pede agora o total vendido em cada região, mês a mês. Você somaria linha por linha com calculadora ou resolveria tudo em dois cliques?

## Slide 3 — Objetivos da Aula de Hoje

- Neste encontro avançado, você vai dominar ferramentas essenciais de visualização e análise rápida:
- Estruturar Tabelas Dinâmicas com filtros, grupos e cálculos rápidos.
- Conectar Segmentações de Dados para criar relatórios interativos e ágeis.
- Construir Gráficos Dinâmicos e Combinados com múltiplos eixos visuais.

## Slide 4 — Vocabulário Essencial de Análise

- Gráfico - Representação geométrica que revela tendências e comparações.

- Agrupamento - União de dados em blocos temporais ou faixas de valores.

- Dinâmica - Reorganiza campos instantaneamente sem alterar a base original.

- Segmentação - Filtro visual com botões para refinar relatórios dinâmicos.

## Slide 5 — Recapitulação: Busca e Agregações

- Revisão de busca e agregação condicional:
- PROCV: Busca vertical à direita.
- ÍNDICE/CORRESP: Busca bidirecional flexível.
- SOMASE/CONT.SE: Agregações por regras.
- SEERRO: Tratamento de erros em fórmulas.

- 🧠

- Lembre-se
- Buscas operam célula a célula; tabelas dinâmicas resumem centenas de categorias instantaneamente.

## Slide 6 — Quiz Rápido: Busca e Erros

- Pergunta 1:
- Qual função evita que fórmulas mostrem erros como #N/D ou #VALOR! na planilha?

- Pergunta 2:
- Por que a combinação ÍNDICE e CORRESP é mais versátil que o PROCV?

- Pergunta 3:
- Qual função usamos para somar as quantidades requisitadas apenas quando o setor for 'Manutenção'?

## Slide 7 — Quiz Rápido: Busca e Erros

- ✅

- Resposta 1:
- A função SEERRO (ou IFERROR).

- Resposta 2:
- Porque ela permite buscar valores em qualquer direção, inclusive à esquerda da coluna de pesquisa.

- Resposta 3:
- A função SOMASE (ou SUMIF).

## Slide 8 — O que é uma Tabela Dinâmica?

- A Tabela Dinâmica (Pivot Table) é uma ferramenta do Excel capaz de resumir, calcular e analisar dados automaticamente. Ela permite agrupar informações dispersas em categorias claras, calcular somas, médias ou contagens sem exigir a digitação manual de dezenas de fórmulas.

- 🔑

- Ponto-chave
- Ela nunca apaga nem modifica seus dados originais: funciona como uma lente analítica que lê a base bruta.

## Slide 9 — Requisitos da Base Bruta

- Para criar tabelas dinâmicas, a base deve seguir regras de higiene cadastral:
- Cabeçalhos: Cada coluna deve ter um nome único.
- Sem linhas vazias: Linhas em branco partem a seleção.
- Uma informação por coluna: Datas, valores e textos em colunas próprias.

- ⚠️

- Atenção
- Células mescladas quebram a Tabela Dinâmica. Mantenha os dados limpos!

## Slide 10 — Os Quatro Quadrantes Mágicos

- Linhas e Colunas
- Linhas: Define categorias verticais, como Categoria de material ou Fornecedor.
- Colunas: Espalha subcategorias horizontalmente, como Meses ou Pagamento.

- Valores e Filtros
- Valores: Onde entram números para cálculo (Soma, Média, Contagem).
- Filtros: Campo no topo para restringir a análise por filial ou ano.

## Slide 11 — Teste seu Raciocínio de Estrutura

- Se você quer ver o faturamento total por categoria de produto, onde deve colocar o campo 'Valor' e o campo 'Categoria'?

- 1.

- Categoria em Linhas e Valor em Valores

- 2.

- Valor em Linhas e Categoria em Colunas

- 3.

- Ambos os campos na área de Filtros

- 4.

- Categoria em Valores e Valor em Linhas

## Slide 12 — Teste seu Raciocínio de Estrutura

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

## Slide 13 — Passo a Passo de Criação

- Crie tabelas dinâmicas em 4 passos:
- Selecione uma célula da base de dados.
- Vá em Inserir > Tabela Dinâmica.
- Confirme o intervalo e escolha Nova Planilha.
- Arraste campos para os quatro quadrantes.

- 🔍

- Exemplo
- Ao arrastar 'Cliente' para Linhas e 'Total' para Valores, o Excel consolida compras por cliente instantaneamente.

## Slide 14 — Configuração do Campo de Valor

- O Excel soma números e conta textos por padrão. Altere a operação facilmente:
- Média: Avalia tíquete médio ou preço praticado.
- Contagem: Descobre a quantidade de pedidos emitidos.
- Máximo/Mínimo: Revela picos de venda e menores transações.

- 🧠

- Lembre-se
- Clique com o botão direito em um número e use 'Resumir Valores Por' para alternar o cálculo.

## Slide 15 — Agrupamento de Datas e Horas

- Bases operacionais registram vendas diárias com dia, mês e ano. Em vez de ler centenas de datas soltas, use o Agrupamento Automático do Excel. Ele organiza transações em Meses, Trimestres e Anos automaticamente.

- 🔑

- Ponto-chave
- Clique em qualquer data da tabela dinâmica, aperte o botão direito e selecione 'Agrupar'. Marque Meses e Trimestres para obter resumos sazonais.

## Slide 16 — Ordenação e Filtros Rápidos

- Apresentar dados desordenados dificulta a tomada de decisão. As tabelas dinâmicas permitem hierarquizar respostas:
- Mais Vendidos ao Topo: Ordene o campo de valores de forma Decrescente (Z-A).
- Filtro dos 10 Primeiros: Isole apenas os clientes ou produtos líderes.
- Filtro por Rótulo: Mostre apenas registros que contenham palavras específicas.

## Slide 17 — Checando o Agrupamento

- Se você agrupar datas por Mês na tabela dinâmica, a base de dados original terá suas datas apagadas para sempre.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

## Slide 18 — Checando o Agrupamento

- ✅

- Se você agrupar datas por Mês na tabela dinâmica, a base de dados original terá suas datas apagadas para sempre.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- A tabela dinâmica apenas exibe uma visão consolidada, preservando todas as datas originais da base intactas.

- 🔑

## Slide 19 — Campos Calculados na Tabela

- Calcule o custo de armazenagem de 5% sem alterar a base:
- O Campo Calculado cria variáveis na tabela dinâmica.
- Vá em Análise de Tabela Dinâmica > Campos, Itens e Conjuntos > Campo Calculado.
- Use a fórmula: ='Valor da Compra' * 0,05.

- Curiosidade
- O campo calculado atualiza-se ao inserir novos dados na base.

- 🤯

## Slide 20 — Segmentação de Dados (Slicers)

- A Segmentação de Dados substitui os filtros suspensos tradicionais por blocos de botões táteis e visuais:
- Cada botão representa uma categoria da sua coluna.
- Clicar em um botão filtra instantaneamente o relatório.
- Segurando a tecla , é possível selecionar múltiplos botões.
- Botões cinzas sem realce indicam categorias sem movimentação.

## Slide 21 — Aplicação: Vendas e Estoque

- Controle de Estoque
- Giro: Pedidos por lote.
- Reposição: Estoque mínimo.
- Custo: Unidades x custo unitário.

- Performance Comercial
- Vendas: Metas batidas.
- Mix: Categorias mais rentáveis.
- Concentração: Cidades com maior faturamento.

## Slide 21.1 — Compras por Fornecedor e Mês

- Situação-problema: qual fornecedor e qual mês concentram as compras?

- Base Compras: Data | Fornecedor | Item | Quantidade | Valor
- Linhas: Fornecedor · Colunas: Data agrupada por Mês · Valores: Soma de Valor
- Mostrar valores como: % do Total Geral → revela a concentração
- Gráfico dinâmico: colunas agrupadas (comparar fornecedores mês a mês)

- Perguntas de análise
- Qual fornecedor tem a maior fatia? Há dependência de um só (acima de 50%)?
- Em que mês houve pico de compras? Foi planejado?
- Que ação a área de compras deve propor?

## Slide 22 — Vídeo: Tabelas Dinâmicas na Prática

- Crie tabelas dinâmicas com dados brutos. Mova campos entre linhas e colunas para mudar a perspectiva do relatório.

## Slide 23 — Ordem de Montagem do Relatório

- Qual é a sequência correta para montar uma análise dinâmica estruturada no Excel?

- Clicar em Inserir Tabela Dinâmica e abrir nova planilha

- Garantir cabeçalhos e ausência de células mescladas na base

- Inserir Segmentação de Dados para navegação interativa

- Arrastar dimensões para Linhas e métricas para Valores

## Slide 24 — Ordem de Montagem do Relatório

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

## Slide 25 — Visualização de Dados: Por que Gráficos?

- O cérebro humano processa formas, cores e tamanhos muito mais rápido do que lê tabelas repletas de números. Um gráfico bem escolhido comunica em poucos segundos se as metas foram batidas, se há perdas em um setor ou se o faturamento está crescendo.

- 🧠

- Lembre-se
- Um gráfico ruim distorce a realidade; um gráfico correto conduz a equipe à decisão certa.

## Slide 26 — Escolhendo o Tipo Ideal de Gráfico

- Linhas - Mostra evolução e tendências em dias, meses ou trimestres.

- Dispersão (XY) - Identifica correlação entre variáveis quantitativas.

- Colunas e Barras - Compara itens ou ranking de categorias (itens, fornecedores).

- Pizza ou Rosca - Mostra partes de um todo (limite 4 fatias).

- Regra rápida: comparar → colunas; tendência → linhas. Muitas categorias nunca vão em pizza.

## Slide 27 — O Poder do Gráfico Dinâmico

- Diferente de um gráfico tradicional estático, o Gráfico Dinâmico está diretamente conectado à Tabela Dinâmica:
- Se você filtrar um item na tabela, o gráfico se altera sozinho.
- Se você alternar botões da Segmentação de Dados, as colunas sobem e descem em tempo real.
- Botões de campo integrados ao gráfico permitem expandir ou recolher períodos.

## Slide 28 — Estilização e Clareza Visual

- Menos é mais. Aplique boas práticas de design para não cansar o leitor:
- Elimine poluição: Retire linhas de grade e bordas pesadas.
- Contraste intencional: Use cor marcante para o destaque e cinza para o restante.
- Tipografia limpa: Mantenha títulos diretos e legíveis.

- ⚠️

- Atenção
- Evite efeitos 3D ou sombras exageradas. Eles distorcem as proporções dos dados!

## Slide 29 — Inserção de Rótulos Estratégicos

- Rótulos de dados informam o número exato sobre a barra ou linha:
- Quando utilizar rótulos diretos nas barras, você pode remover o eixo numérico vertical para despoluir a visualização.
- Posicione rótulos na extremidade externa para fácil leitura.
- Utilize formatação de moeda abreviada (ex: ) para tabelas grandes.

## Slide 30 — Gráficos Combinados (Eixo Duplo)

- O Problema das Escalas
- Como comparar o Faturamento (R$ 500.000) com a Margem de Lucro (12%) no mesmo gráfico? A margem percentual viraria uma linha invisível grudada no chão do gráfico.

- A Solução do Eixo Secundário
- O Gráfico Combinado insere um segundo eixo vertical à direita. As colunas leem o volume em reais à esquerda e a linha lê os percentuais à direita com total precisão.

## Slide 31 — Verificação: Gráficos Combinados

- Quando é indispensável utilizar um gráfico combinado com eixo secundário?

- 1.

- Ao comparar duas métricas com grandezas ou escalas muito diferentes

- 2.

- Sempre que a tabela de origem tiver células em branco

- 3.

- Apenas quando o gráfico tiver mais de 20 colunas de dados

- 4.

- Quando queremos transformar colunas em formato de pizza

## Slide 32 — Verificação: Gráficos Combinados

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

## Slide 33 — Conectando Filtros a Múltiplos Gráficos

- O verdadeiro poder de um painel interativo surge quando uma única Segmentação de Dados comanda diversos gráficos ao mesmo tempo. Ao clicar em 'Região Sul', todos os gráficos da tela se sincronizam imediatamente para mostrar o cenário do Sul.

- 🔑

- Ponto-chave
- Clique na segmentação com o botão direito, selecione 'Conexões de Relatório' e marque todas as tabelas dinâmicas desejadas.

## Slide 34 — Linha do Tempo Dinâmica

- Além da segmentação comum, o Excel oferece a Linha do Tempo para colunas contendo datas:
- Uma barra horizontal elegante com deslizador de períodos.
- Permite alternar a escala entre Anos, Trimestres, Meses e Dias.
- Basta arrastar as bordas do seletor para analisar qualquer intervalo de tempo.

## Slide 35 — Erros Comuns na Visualização

- O Erro da Pizza Lotada
- Criar gráficos de pizza com dezenas de categorias torna a leitura impossível. Gráficos circulares servem apenas para 2 a 4 fatias com contrastes claros.

- Eixo Truncado Desleal
- Começar o eixo de colunas em valores diferentes de zero distorce a proporção visual e transmite uma falsa impressão de crescimento descontrolado.

## Slide 36 — Atualização Automática de Dados

- Analistas devem dominar este ponto:
- A Tabela Dinâmica usa um 'cache' de dados.
- Se alterar a base bruta, a tabela não atualiza sozinha.
- Clique com o botão direito em Atualizar ou use Alt+F5.

- 🧠

- Lembre-se
- Transformar a base em Tabela Oficial (Inserir → Tabela) faz novas linhas serem incorporadas automaticamente à fonte!

## Slide 36.1 — Proteger o Relatório Antes de Distribuir

- Revisão → Proteger Planilha, marcando "Usar Tabela Dinâmica e Gráfico Dinâmico" para os filtros continuarem funcionando.
- Bloqueie a aba da base de compras: ninguém altera os dados de origem por engano.
- Guarde a senha com o responsável pelo relatório.

- ⚠️
- Atenção
- Proteção evita erro acidental, não é segurança total: dados sigilosos pedem controle de acesso ao arquivo.

## Slide 37 — Atividade: Relatórios Multi-Perspectiva

- Abra a base de compras do almoxarifado e execute estas análises:
- Setorial: Crie Tabela Dinâmica com Valor Comprado por Categoria de Material.
- Temporal: Agrupe datas por Trimestre e mova para Colunas.
- Percentual: Exiba como '% do Total', identifique o trimestre
- de maior fatia e anote sua conclusão.

## Slide 38 — Atividade: Conjunto de Gráficos Dinâmicos

- Desenvolva a camada visual interativa:
- Gráfico de Barras: Exiba os 5 itens de maior custo em estoque.
- Gráfico Combinado: Mostre Valor Comprado e % do Orçamento mensal.
- Painel Integrado: Adicione segmentação por Fornecedor.

## Slide 39 — Desafio de Fixação dos Conceitos

- Relacione as palavras com as definições

- Gráfico Combinado

- Resumo interativo de base bruta capaz de condensar cálculos sem criar novas fórmulas.

- Agrupamento

- Visualização que sobrepõe colunas e linhas utilizando dois eixos com escalas distintas.

- Tabela Dinâmica

- Recurso que reúne datas individuais em blocos de meses, trimestres ou anos.

- Segmentação de Dados

- Painel com botões clicáveis para filtrar relatórios dinâmicos de forma ágil e intuitiva.

## Slide 40 — Desafio de Fixação dos Conceitos

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

## Slide 41 — Rumo aos Dashboards Executivos

- Hoje você dominou os motores analíticos mais cobiçados do mercado corporativo: a síntese precisa das Tabelas Dinâmicas e o impacto visual dos Gráficos Interativos. Na Aula 4 (arquivo 7), juntaremos tudo isso em um Dashboard Executivo Completo de nível profissional!
