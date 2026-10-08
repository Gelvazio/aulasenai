# Atividade: Design de Dashboard e KPIs — 14 Questões

- **Aula:** 04
- **Tema:** Design de Dashboard e KPIs
- **Ícone:** 📈
- **Duração:** 150 minutos
- **Formato:** Múltipla escolha (A, B, C, D, E)
- **Total de questões:** 14
- **Pontuação:** 1 ponto por questão correta (total: 14 pontos)
- **Capacidade avaliada:** Definir KPI estratégico; Calcular variação percentual de KPI; Interpretar variação positiva/negativa; Aplicar status visual baseado em variação; Organizar abas para dashboard; Preparar dados brutos corretamente; Usar tabela dinâmica para sumarizar; Interpretar tabela dinâmica multidimensional; Escolher tipo de gráfico apropriado; Criar indicador de status visual; Conectar segmentadores a objetos; Formatar cartão de KPI profissionalmente; Ocultar linhas de grade para limpeza visual; Registrar a data de atualização do painel
- **Conteúdo-base:** `—`
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim
- **Turma:** AI AIAC 2026/2 V1 (133933)

> Fonte única desta atividade (corrigida em 30/09/2026). A linha **Gabarito** NÃO é publicada
> (arquivo no .gitignore); o gabarito fica só na tabela `gabarito` do banco.

---

## ITEM 01 — Definir KPI estratégico

**Contexto:**  
Uma rede de lojas de materiais de construção de Santa Catarina acompanha mensalmente o faturamento. Em setembro, a meta era R$ 120.000 e o realizado foi R$ 125.500. O gerente quer colocar esse número no topo do dashboard.

**Comando:**  
Por que "faturamento realizado × meta" é um bom KPI para o dashboard?

**Alternativas:**
- A) Porque é o maior número da planilha
- B) Porque não precisa de fórmula para ser calculado
- C) Porque qualquer número da base pode ser um KPI
- D) Porque mostra, de forma direta, se o objetivo do mês foi atingido
- E) Porque dispensa a comparação com uma meta

**Gabarito:** D

---

## ITEM 02 — Calcular variação percentual de KPI

**Contexto:**  
Faturamento de setembro: meta R$ 120.000 e realizado R$ 125.500. A variação em relação à meta é calculada por (Realizado − Meta) ÷ Meta.

**Comando:**  
Qual é a variação, arredondada para uma casa decimal?

**Alternativas:**
- A) +2,5%
- B) +4,6%
- C) −4,4%
- D) +5,5%
- E) +10,0%

**Gabarito:** B

---

## ITEM 03 — Interpretar variação positiva/negativa

**Contexto:**  
No mesmo dashboard, o KPI "Margem bruta" teve meta de 30% e realizado de 28,5%, e o KPI "Pedidos processados" teve meta de 150 e realizado de 185.

**Comando:**  
Qual interpretação está correta?

**Alternativas:**
- A) Os dois KPIs ficaram acima da meta
- B) Os dois KPIs ficaram abaixo da meta
- C) A margem ficou abaixo da meta e os pedidos ficaram acima da meta
- D) A margem ficou acima da meta e os pedidos ficaram abaixo da meta
- E) Não é possível comparar sem um gráfico

**Gabarito:** C

---

## ITEM 04 — Aplicar status visual baseado em variação

**Contexto:**  
Regra de cores do painel pela variação em relação à meta: acima de +10% = Verde; de 0% a +10% = Amarelo; de −10% até menos de 0% = Laranja; abaixo de −10% = Vermelho. O KPI "Margem bruta" teve meta de 30% e realizado de 28,5%; a variação é (28,5 − 30) ÷ 30.

**Comando:**  
Qual status o KPI "Margem bruta" recebe?

**Alternativas:**
- A) Verde
- B) Amarelo
- C) Laranja
- D) Vermelho
- E) Sem status

**Gabarito:** C

---

## ITEM 05 — Organizar abas para dashboard

**Contexto:**  
O arquivo do painel tem três abas: Base_Dados (dados brutos), Calculos_Apoio (tabelas dinâmicas) e Dashboard (tela final). O gerente pediu que só o Dashboard fique visível na reunião.

**Comando:**  
Por que ocultar e proteger a aba Base_Dados?

**Alternativas:**
- A) Para economizar memória do computador
- B) Para que as fórmulas deixem de ser calculadas
- C) Para excluir os dados depois da reunião
- D) Para evitar edição acidental dos dados brutos e deixar à vista só a tela de decisão
- E) Porque tabelas dinâmicas só funcionam com a base oculta

**Gabarito:** D

---

## ITEM 06 — Preparar dados brutos corretamente

**Contexto:**  
A base tem 30 linhas com Data, Loja, Produto, Faturamento, Margem% e Região. Antes de criar as tabelas dinâmicas, o analista precisa deixar a base no formato certo.

**Comando:**  
Qual preparação está correta?

**Alternativas:**
- A) Cabeçalho único em cada coluna, sem linhas em branco e sem células mescladas
- B) Retirar os cabeçalhos para a tabela dinâmica ler só números
- C) Mesclar as células de cada região para facilitar a leitura
- D) Deixar uma linha em branco entre cada mês
- E) Juntar Data e Loja na mesma coluna

**Gabarito:** A

---

## ITEM 07 — Usar tabela dinâmica para sumarizar

**Contexto:**  
A tabela dinâmica agrupou o faturamento por Região: Norte R$ 32.500, Nordeste R$ 28.000, Sul R$ 35.000 e Centro R$ 30.000.

**Comando:**  
Qual é o Total Geral mostrado pela tabela dinâmica?

**Alternativas:**
- A) R$ 35.000
- B) R$ 95.500
- C) R$ 150.000
- D) R$ 125.500
- E) R$ 31.375

**Gabarito:** D

---

## ITEM 08 — Interpretar tabela dinâmica multidimensional

**Contexto:**  
O analista colocou Região em Linhas, Produto em Colunas e Soma de Faturamento em Valores. O resultado é uma matriz com o faturamento de cada produto em cada região.

**Comando:**  
Quantas dimensões de análise (categorias) essa tabela dinâmica cruza?

**Alternativas:**
- A) 1 dimensão
- B) 3 dimensões
- C) 2 dimensões (Região e Produto)
- D) 4 dimensões
- E) Nenhuma dimensão

**Gabarito:** C

---

## ITEM 09 — Escolher tipo de gráfico apropriado

**Contexto:**  
O gerente quer comparar o faturamento das 4 regiões no mesmo mês para ver qual vendeu mais.

**Comando:**  
Qual é o gráfico mais adequado?

**Alternativas:**
- A) Pizza com efeito 3D
- B) Linha, para mostrar tendência
- C) Área empilhada
- D) Dispersão (XY)
- E) Colunas, para comparar categorias

**Gabarito:** E

---

## ITEM 10 — Criar indicador de status visual

**Contexto:**  
Cada cartão de KPI fica verde quando a meta é atingida e vermelho quando não é.

**Comando:**  
Qual é o principal benefício desse indicador visual?

**Alternativas:**
- A) Permitir a decisão rápida: o gestor vê o status em poucos segundos
- B) Deixar o painel mais colorido
- C) Ocupar menos espaço na tela
- D) Substituir a meta do KPI
- E) Dispensar a atualização dos dados

**Gabarito:** A

---

## ITEM 11 — Conectar segmentadores a objetos

**Contexto:**  
O segmentador "Região" foi ligado, pelas Conexões de Relatório, às três tabelas dinâmicas que alimentam os gráficos do painel.

**Comando:**  
O que acontece ao clicar no botão "Sul" do segmentador?

**Alternativas:**
- A) Nada, pois o segmentador controla só uma tabela
- B) Os dados das outras regiões são apagados da base
- C) Uma nova planilha é criada só com o Sul
- D) Todos os gráficos conectados passam a mostrar só os dados do Sul
- E) Somente o primeiro gráfico é filtrado

**Gabarito:** D

---

## ITEM 12 — Formatar cartão de KPI profissionalmente

**Contexto:**  
O cartão de KPI do faturamento tem fundo branco, borda discreta e cor azul corporativa.

**Comando:**  
Quais elementos um cartão de KPI deve destacar?

**Alternativas:**
- A) Número pequeno e muitas casas decimais
- B) Rótulo do indicador, número grande e indicador de status (cor ou seta)
- C) A tabela completa de dados abaixo do número
- D) Um gráfico de pizza em cada cartão
- E) Texto em várias cores para chamar atenção

**Gabarito:** B

---

## ITEM 13 — Ocultar linhas de grade para limpeza visual

**Contexto:**  
Antes de apresentar, o analista desmarcou Linhas de Grade na guia Exibir da aba Dashboard.

**Comando:**  
Qual é o motivo dessa ação?

**Alternativas:**
- A) Reduzir o tamanho do arquivo
- B) Economizar tinta na impressão
- C) Tirar poluição visual e dar aparência de painel profissional
- D) Proteger as fórmulas contra edição
- E) Não há motivo prático

**Gabarito:** C

---

## ITEM 14 — Registrar a data de atualização do painel

**Contexto:**  
O cabeçalho do dashboard deve informar quando os dados foram atualizados pela última vez. O analista pensou em usar =HOJE() nessa célula.

**Comando:**  
Por que =HOJE() não serve para registrar a data da última atualização dos dados?

**Alternativas:**
- A) Porque =HOJE() mostra a data atual do sistema e muda sempre que o arquivo é recalculado, mesmo sem dados novos
- B) Porque =HOJE() retorna um erro em dashboards
- C) Porque =HOJE() mostra a data de criação do arquivo
- D) Porque =HOJE() só funciona na aba Base_Dados
- E) Porque =HOJE() mostra a hora e não a data

**Gabarito:** A

---
