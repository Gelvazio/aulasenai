# Atividade: Avaliação Objetiva 02 — 60 Questões

- **Aula:** AV-02
- **Rótulo da aula:** Avaliação Objetiva 02
- **Tema:** Aulas 05 a 07
- **Ícone:** 📝
- **Duração:** 150 minutos
- **Formato:** Múltipla escolha (A, B, C, D, E)
- **Total de questões:** 60
- **Pontuação:** 1 ponto por questão correta (total: 60 pontos; nota de 0 a 10)
- **Capacidade avaliada:** Aplicar os conteúdos das aulas 05 a 07: PROCV, PROCH, ÍNDICE + CORRESP, SEERRO, SE aninhado, CONT.SE e SOMASE; tabelas dinâmicas, agrupamento, gráficos dinâmicos e combinados, segmentação; KPIs de estoque, design de dashboard e storytelling com dados.
- **Conteúdo-base:** `CONTEUDO/5-` a `7-*.md` (Aulas 05 a 07)
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim
- **Turma:** AI AIAC 2026/2 V1 (133933)

> Fonte única: o HTML `AVALIACAO-OBJETIVA-02.html` é gerado a partir deste arquivo por
> `assets/gerador-atividades/gerar_atividades.py --so`. Questões inéditas (não repetem as atividades).
> A linha **Gabarito** NÃO é publicada (arquivo no .gitignore); o gabarito fica só no banco.

---

## ITEM 01 — Aula 05: Montar o PROCV

- **Capacidade:** C1

**Contexto:**  
Na Distribuidora Vale do Itapocu (empresa fictícia), a aba Cadastro tem A2:C400 com Código | Descrição | Preço. Na aba Pedido, o código está em A2 e o Preço vai em C2, com busca exata.

**Comando:**  
Qual fórmula está correta para C2?

**Alternativas:**
- A) =PROCV(A2;Cadastro!$A$2:$C$400;2;0)
- B) =PROCV(Cadastro!$A$2:$C$400;A2;3;0)
- C) =PROCV(A2;Cadastro!$A$2:$C$400;3;0)
- D) =PROCV(A2;Cadastro!A2:C400;3;1)
- E) =PROCH(A2;Cadastro!$A$2:$C$400;3;0)

**Gabarito:** C

---

## ITEM 02 — Aula 05: Número da coluna no PROCV

- **Capacidade:** C1

**Contexto:**  
A matriz da busca é C2:H50 (o código está na coluna C). O dado que o analista quer trazer está na coluna F.

**Comando:**  
Qual número deve ser informado como núm_índice_coluna?

**Alternativas:**
- A) 4
- B) 6
- C) 3
- D) 5
- E) 1

**Gabarito:** A

---

## ITEM 03 — Aula 05: SEERRO em valores financeiros

- **Capacidade:** C1

**Contexto:**  
Alguns códigos do pedido ainda não estão no cadastro e o PROCV do preço devolve #N/D, quebrando a SOMA da coluna de totais.

**Comando:**  
Qual fórmula mantém as somas funcionando?

**Alternativas:**
- A) =SEERRO(0;PROCV(A2;Cadastro!$A$2:$C$400;3;0))
- B) =PROCV(A2;Cadastro!$A$2:$C$400;3;SEERRO)
- C) =SE(PROCV(A2;Cadastro!$A$2:$C$400;3;0);0)
- D) =SEERRO(PROCV(A2;Cadastro!$A$2:$C$400;3;0);0)
- E) =SEERRO(PROCV(A2;Cadastro!$A$2:$C$400;3;0))

**Gabarito:** D

---

## ITEM 04 — Aula 05: Escolher o PROCH

- **Capacidade:** C1

**Contexto:**  
A tabela de fretes tem os meses na linha 1 (B1:M1) e os valores de frete por região nas linhas de baixo.

**Comando:**  
Qual função de busca combina com esse formato?

**Alternativas:**
- A) PROCV, pois os dados estão em colunas
- B) PROCH, pois a chave (o mês) está na primeira linha
- C) CONT.SE
- D) SOMASE
- E) CORRESP sozinho, pois devolve o valor do frete

**Gabarito:** B

---

## ITEM 05 — Aula 05: Resultado do CORRESP

- **Capacidade:** C1

**Contexto:**  
A lista de transportadoras em A2:A6 é: Alfa, Beta, Gama, Delta e Ômega.

**Comando:**  
Qual é o resultado de =CORRESP("Delta";A2:A6;0)?

**Alternativas:**
- A) 4
- B) 5
- C) Delta
- D) A5
- E) #N/D

**Gabarito:** A

---

## ITEM 06 — Aula 05: Buscar para a esquerda

- **Capacidade:** C1

**Contexto:**  
No cadastro, a descrição está na coluna B (B2:B400) e o código na coluna D (D2:D400). O código procurado está em F2.

**Comando:**  
Qual fórmula traz a descrição?

**Alternativas:**
- A) =ÍNDICE(D2:D400;CORRESP(F2;B2:B400;0))
- B) =PROCV(F2;B2:D400;1;0)
- C) =CORRESP(F2;D2:D400;0)
- D) =ÍNDICE(B2:B400;CORRESP(F2;D2:D400;0))
- E) =PROCV(F2;D2:D400;-2;0)

**Gabarito:** D

---

## ITEM 07 — Aula 05: SE aninhado

- **Capacidade:** C1

**Contexto:**  
A situação do estoque é dada por =SE(D2<20;"Crítico";SE(D2<=50;"Atenção";"Normal")). O saldo em D2 é 20.

**Comando:**  
Qual é o resultado?

**Alternativas:**
- A) Crítico
- B) Normal
- C) Atenção
- D) 20
- E) Erro

**Gabarito:** C

---

## ITEM 08 — Aula 05: SOMASE

- **Capacidade:** C1

**Contexto:**  
Requisições (Setor em C2:C6 e Valor em E2:E6): Manutenção R$ 400; Produção R$ 250; Manutenção R$ 150; Expedição R$ 90; Manutenção R$ 60.

**Comando:**  
Qual é o resultado de =SOMASE(C2:C6;"Manutenção";E2:E6)?

**Alternativas:**
- A) 3
- B) R$ 950
- C) R$ 400
- D) R$ 610
- E) R$ 550

**Gabarito:** D

---

## ITEM 09 — Aula 06: Preparar a base da tabela dinâmica

- **Capacidade:** C1

**Contexto:**  
A base de compras tem o nome do fornecedor mesclado em várias linhas, uma linha vazia entre os meses e duas colunas chamadas "Valor".

**Comando:**  
O que precisa ser corrigido antes de criar a tabela dinâmica?

**Alternativas:**
- A) Desfazer as mesclagens, tirar as linhas vazias e deixar um nome único em cada cabeçalho
- B) Nada, a tabela dinâmica corrige sozinha
- C) Só formatar a coluna Valor como moeda
- D) Proteger a planilha com senha
- E) Apagar os cabeçalhos

**Gabarito:** A

---

## ITEM 10 — Aula 06: Posicionar os campos

- **Capacidade:** C1

**Contexto:**  
O gerente quer o valor total comprado de cada fornecedor.

**Comando:**  
Onde colocar os campos Fornecedor e Valor?

**Alternativas:**
- A) Valor em Linhas e Fornecedor em Valores
- B) Os dois em Filtros
- C) Fornecedor em Linhas e Valor em Valores
- D) Fornecedor em Filtros e Valor em Colunas
- E) Os dois em Colunas

**Gabarito:** C

---

## ITEM 11 — Aula 06: Contar pedidos

- **Capacidade:** C1

**Contexto:**  
Agora o gerente quer saber QUANTOS pedidos cada fornecedor recebeu, e não o valor.

**Comando:**  
Como resumir o campo de valor?

**Alternativas:**
- A) Soma
- B) Média
- C) Máximo
- D) % do Total Geral
- E) Contagem

**Gabarito:** E

---

## ITEM 12 — Aula 06: Agrupar datas

- **Capacidade:** C1

**Contexto:**  
A tabela dinâmica mostra cada data de compra numa linha e o diretor quer ver os totais por mês.

**Comando:**  
O que fazer?

**Alternativas:**
- A) Apagar as datas da base
- B) Clicar com o botão direito numa data da tabela → Agrupar → Meses
- C) Formatar a coluna de datas como texto
- D) Digitar os meses à mão na base
- E) Usar o PROCV nas datas

**Gabarito:** B

---

## ITEM 13 — Aula 06: Atualizar a tabela dinâmica

- **Capacidade:** C1

**Contexto:**  
Foram lançadas 30 compras novas na base, mas a tabela dinâmica continua com os totais antigos.

**Comando:**  
Qual é a ação correta?

**Alternativas:**
- A) Apagar e recriar a base
- B) Esperar o Excel atualizar no dia seguinte
- C) Proteger a planilha
- D) Agrupar as datas de novo
- E) Clicar em Atualizar (ou Alt+F5), pois a tabela não se atualiza sozinha

**Gabarito:** E

---

## ITEM 14 — Aula 06: Gráfico de tendência

- **Capacidade:** C1

**Contexto:**  
O gerente quer ver a evolução do valor comprado mês a mês ao longo do ano.

**Comando:**  
Qual gráfico é o mais indicado?

**Alternativas:**
- A) Linhas
- B) Pizza com 12 fatias
- C) Rosca
- D) Radar
- E) Pizza em 3D

**Gabarito:** A

---

## ITEM 15 — Aula 06: Gráfico combinado

- **Capacidade:** C1

**Contexto:**  
No mesmo gráfico, o gerente quer comparar o Valor Comprado (R$ 400.000) com o % do Orçamento usado (92%).

**Comando:**  
Qual solução deixa as duas séries legíveis?

**Alternativas:**
- A) Dois gráficos de pizza
- B) Gráfico de área com um só eixo
- C) Gráfico combinado: colunas para o valor e linha para o percentual no eixo secundário
- D) Gráfico de colunas com as duas séries no mesmo eixo
- E) Tabela sem gráfico

**Gabarito:** C

---

## ITEM 16 — Aula 06: Segmentação em vários gráficos

- **Capacidade:** C1

**Contexto:**  
Uma segmentação "Fornecedor" filtra só um dos três gráficos dinâmicos do relatório.

**Comando:**  
O que fazer para ela filtrar todos?

**Alternativas:**
- A) Criar uma segmentação para cada gráfico
- B) Proteger a planilha
- C) Agrupar as datas
- D) Atualizar com Alt+F5
- E) Botão direito na segmentação → Conexões de Relatório → marcar as três tabelas dinâmicas

**Gabarito:** E

---

## ITEM 17 — Aula 07: KPI de giro

- **Capacidade:** C1, C2

**Contexto:**  
Giro = custo das saídas ÷ estoque médio. No trimestre, o custo das saídas foi R$ 240.000 e o estoque médio foi R$ 60.000.

**Comando:**  
Qual é o giro?

**Alternativas:**
- A) 0,25 vez
- B) 4 vezes
- C) 180 vezes
- D) 300 vezes
- E) 6 vezes

**Gabarito:** B

---

## ITEM 18 — Aula 07: KPI de ruptura

- **Capacidade:** C1, C2

**Contexto:**  
Ruptura = requisições não atendidas ÷ total de requisições. No mês, 9 das 300 requisições não foram atendidas.

**Comando:**  
Qual é a ruptura?

**Alternativas:**
- A) 3%
- B) 9%
- C) 0,3%
- D) 33%
- E) 2,7%

**Gabarito:** A

---

## ITEM 19 — Aula 07: KPI de cobertura

- **Capacidade:** C1, C2

**Contexto:**  
Cobertura = saldo ÷ consumo médio diário. O saldo de máscaras é 1.200 unidades e o consumo médio é 150 por dia.

**Comando:**  
Qual é a cobertura?

**Alternativas:**
- A) 1.050 dias
- B) 8 dias
- C) 12 dias
- D) 0,125 dia
- E) 180.000 dias

**Gabarito:** B

---

## ITEM 20 — Aula 07: Semáforo do KPI

- **Capacidade:** C1

**Contexto:**  
A meta da empresa é ruptura de no máximo 5%: até 5% o cartão fica verde; acima, vermelho. Em maio, a ruptura foi de 3%.

**Comando:**  
Qual cor o cartão de ruptura deve mostrar?

**Alternativas:**
- A) Vermelho, pois houve ruptura
- B) Amarelo, pois está perto da meta
- C) Sem cor, pois a meta não foi informada
- D) Vermelho, pois 3% é maior que zero
- E) Verde, pois ficou dentro da meta

**Gabarito:** E

---

## ITEM 21 — Aula 07: Leitura em Z

- **Capacidade:** C1

**Contexto:**  
O olhar percorre a tela em Z: topo da esquerda para a direita, diagonal descendo e base da esquerda para a direita.

**Comando:**  
Onde devem ficar os cartões de KPI de maior impacto?

**Alternativas:**
- A) No rodapé, à direita
- B) Numa aba separada
- C) No meio da diagonal, pequenos
- D) No topo da tela
- E) Atrás dos gráficos

**Gabarito:** D

---

## ITEM 22 — Aula 07: Abas do dashboard

- **Capacidade:** C1

**Contexto:**  
O arquivo do painel tem as abas Base_Dados, Calculos_Apoio e Dashboard.

**Comando:**  
Qual é a única aba que o diretor deve ver?

**Alternativas:**
- A) Base_Dados
- B) Dashboard
- C) Calculos_Apoio
- D) Todas as três
- E) Nenhuma, o painel é impresso

**Gabarito:** B

---

## ITEM 23 — Aula 07: Ordem de construção

- **Capacidade:** C1

**Contexto:**  
As etapas para montar o dashboard são: criar os gráficos; gerar as tabelas dinâmicas de apoio; organizar e validar a base; inserir segmentadores e conectar as tabelas.

**Comando:**  
Qual é a PRIMEIRA etapa?

**Alternativas:**
- A) Criar os gráficos
- B) Inserir os segmentadores
- C) Gerar as tabelas dinâmicas
- D) Organizar e validar a base de dados
- E) Ocultar as linhas de grade

**Gabarito:** D

---

## ITEM 24 — Aula 07: Storytelling com dados

- **Capacidade:** C1

**Contexto:**  
O analista vai apresentar à gerência por que faltaram botas em abril.

**Comando:**  
Qual é a ordem dos quatro passos do storytelling com dados?

**Alternativas:**
- A) Dado → Ação → Pergunta → Conclusão
- B) Ação → Conclusão → Dado → Pergunta
- C) Pergunta → Dado → Conclusão → Ação
- D) Conclusão → Pergunta → Ação → Dado
- E) Pergunta → Ação → Dado → Conclusão

**Gabarito:** C

---

## ITEM 25 — Aula 05: Correspondência exata no PROCV

- **Capacidade:** C1

**Contexto:**  
Um auxiliar escreveu =PROCV(A2; Cadastro!$A$2:$C$301; 3) para buscar o preço pelo código, sem o último argumento. Alguns itens vieram com o preço de outro produto.

**Comando:**  
Qual é a causa e como corrigir?

**Alternativas:**
- A) A matriz não tem cifrão; basta tirar os cifrões
- B) Sem o último argumento a busca é aproximada; é preciso acrescentar 0 (ou FALSO) para a correspondência exata
- C) O número 3 deveria ser 1
- D) O PROCV só funciona em planilhas com menos de 300 linhas
- E) Falta envolver a fórmula com SOMASE

**Gabarito:** B

---

## ITEM 26 — Aula 05: Matriz do PROCV sem cifrão

- **Capacidade:** C1

**Contexto:**  
A fórmula =PROCV(A2; Cadastro!A2:C301; 2; 0) foi arrastada da linha 2 até a linha 301 da aba Pedido. Os primeiros itens vieram certos, mas os últimos passaram a mostrar #N/D, mesmo com os códigos cadastrados.

**Comando:**  
Qual é a explicação mais provável?

**Alternativas:**
- A) O número da coluna (2) está errado
- B) Os códigos dos últimos itens são texto
- C) O PROCV só procura para a esquerda
- D) A matriz sem $ "anda" ao arrastar e deixa de incluir as primeiras linhas do cadastro; deveria ser Cadastro!$A$2:$C$301
- E) A busca exata (0) impede encontrar os últimos itens

**Gabarito:** D

---

## ITEM 27 — Aula 05: Código com espaço extra

- **Capacidade:** C1

**Contexto:**  
O código "MAT-015 " foi digitado com um espaço no final na aba Pedido. No cadastro ele aparece como "MAT-015", e o PROCV retorna #N/D.

**Comando:**  
Qual função limpa o espaço extra do código antes da busca?

**Alternativas:**
- A) ARRUMAR
- B) SOMASE
- C) CONT.VALORES
- D) MÁXIMO
- E) PROCH

**Gabarito:** A

---

## ITEM 28 — Aula 05: Número salvo como texto

- **Capacidade:** C1

**Contexto:**  
No cadastro, os códigos são números (1001, 1002...). Na aba de pedidos, os códigos vieram de um sistema como texto (com triângulo verde na célula), e o PROCV retorna #N/D.

**Comando:**  
Qual é a forma de conferir e resolver o problema?

**Alternativas:**
- A) Aplicar formatação condicional vermelha nos códigos
- B) Proteger a planilha e repetir a busca
- C) Trocar o PROCV por CONT.SE
- D) Congelar a linha superior
- E) Conferir com =ÉTEXTO(A2) e converter o código para número (por exemplo, com =VALOR(A2))

**Gabarito:** E

---

## ITEM 29 — Aula 05: SEERRO com mensagem amigável

- **Capacidade:** C1

**Contexto:**  
Na célula B2 está a fórmula =SEERRO(PROCV(A2; Cadastro!$A$2:$C$301; 2; 0); "Código não cadastrado"). O código digitado em A2 não existe no cadastro.

**Comando:**  
O que a célula B2 vai mostrar?

**Alternativas:**
- A) #N/D
- B) 0
- C) Código não cadastrado
- D) A descrição do primeiro item do cadastro
- E) Uma célula vazia

**Gabarito:** C

---

## ITEM 30 — Aula 05: Como o SEERRO funciona

- **Capacidade:** C1

**Contexto:**  
Um colega acha que, ao colocar SEERRO em volta do PROCV, o Excel deixa de procurar o código e passa a mostrar sempre a mensagem de erro.

**Comando:**  
Qual afirmação está correta?

**Alternativas:**
- A) Ele está certo: o SEERRO cancela a busca
- B) O SEERRO executa o PROCV normalmente e só substitui o resultado quando a fórmula dá erro
- C) O SEERRO só funciona com PROCH
- D) O SEERRO apaga os códigos que não foram encontrados
- E) O SEERRO transforma todos os resultados em zero

**Gabarito:** B

---

## ITEM 31 — Aula 05: Resultado do ÍNDICE

- **Capacidade:** C1

**Contexto:**  
O intervalo C2:C6 contém, em ordem: "Luva", "Fita", "Óculos", "Parafuso" e "Capacete".

**Comando:**  
Qual é o resultado de =ÍNDICE(C2:C6; 4)?

**Alternativas:**
- A) 4
- B) Óculos
- C) Capacete
- D) #N/D
- E) Parafuso

**Gabarito:** E

---

## ITEM 32 — Aula 05: Montar o ÍNDICE + CORRESP

- **Capacidade:** C1

**Contexto:**  
No cadastro, a descrição do item está na coluna B (B2:B50) e o código está na coluna D (D2:D50), à direita. O código procurado está na célula F2.

**Comando:**  
Qual fórmula retorna a descrição do item?

**Alternativas:**
- A) =ÍNDICE(B2:B50; CORRESP(F2; D2:D50; 0))
- B) =PROCV(F2; B2:D50; 1; 0)
- C) =CORRESP(B2:B50; ÍNDICE(F2; D2:D50; 0))
- D) =ÍNDICE(D2:D50; CORRESP(F2; B2:B50; 0))
- E) =SOMASE(D2:D50; F2; B2:B50)

**Gabarito:** A

---

## ITEM 33 — Aula 05: Resultado do SE aninhado

- **Capacidade:** C1

**Contexto:**  
A coluna Status usa =SE(D2<10; "Crítico"; SE(D2<=30; "Atenção"; "Normal")). O saldo do item em D2 é exatamente 30 unidades.

**Comando:**  
Qual status será exibido?

**Alternativas:**
- A) Crítico
- B) Normal
- C) #VALOR!
- D) Atenção
- E) FALSO

**Gabarito:** D

---

## ITEM 34 — Aula 05: CONT.SE com operador

- **Capacidade:** C1

**Contexto:**  
Os saldos em D2:D9 são: 0, 15, 8, 0, 22, 3, 0 e 40.

**Comando:**  
Qual é o resultado de =CONT.SE(D2:D9; ">0")?

**Alternativas:**
- A) 3
- B) 8
- C) 5
- D) 88
- E) 0

**Gabarito:** C

---

## ITEM 35 — Aula 05: Critério acima da média

- **Capacidade:** C1

**Contexto:**  
O analista quer contar quantos pedidos, em E2:E100, têm valor acima da média de todos os pedidos, sem calcular a média à mão.

**Comando:**  
Qual fórmula faz isso?

**Alternativas:**
- A) =CONT.SE(E2:E100; "MÉDIA")
- B) =CONT.SE(E2:E100; >MÉDIA(E2:E100))
- C) =MÉDIA(CONT.SE(E2:E100))
- D) =SOMASE(E2:E100; "acima")
- E) =CONT.SE(E2:E100; ">"&MÉDIA(E2:E100))

**Gabarito:** E

---

## ITEM 36 — Aula 05: Resultado do SOMASE

- **Capacidade:** C1

**Contexto:**  
Na planilha de requisições, C2:C6 tem as categorias EPI, Ferramentas, EPI, Limpeza e EPI, e E2:E6 tem os valores R$ 300, R$ 1.200, R$ 450, R$ 180 e R$ 250.

**Comando:**  
Qual é o resultado de =SOMASE(C2:C6; "EPI"; E2:E6)?

**Alternativas:**
- A) 3
- B) R$ 1.000
- C) R$ 2.380
- D) R$ 750
- E) R$ 1.200

**Gabarito:** B

---

## ITEM 37 — Aula 06: A tabela dinâmica e a base original

- **Capacidade:** C1

**Contexto:**  
Um auxiliar tem medo de criar uma tabela dinâmica sobre a base de compras do ano porque acha que ela vai alterar ou apagar os dados lançados.

**Comando:**  
Qual afirmação está correta?

**Alternativas:**
- A) A tabela dinâmica só lê e resume a base; os dados originais não são alterados
- B) A tabela dinâmica apaga as linhas repetidas da base
- C) A tabela dinâmica converte a base em texto
- D) A tabela dinâmica soma os valores dentro das próprias células da base
- E) A tabela dinâmica só funciona depois de proteger a base com senha

**Gabarito:** A

---

## ITEM 38 — Aula 06: Base com problemas

- **Capacidade:** C1

**Contexto:**  
A base de requisições tem um título mesclado ocupando as colunas A a F na primeira linha, algumas linhas em branco no meio e duas colunas com o mesmo nome "Valor".

**Comando:**  
O que deve ser feito antes de criar a tabela dinâmica?

**Alternativas:**
- A) Aplicar formatação de moeda em todas as colunas
- B) Congelar a primeira linha
- C) Deixar uma linha de cabeçalho com nomes únicos, sem células mescladas e sem linhas em branco
- D) Proteger a planilha com senha
- E) Converter todas as datas em texto

**Gabarito:** C

---

## ITEM 39 — Aula 06: Área de Filtros

- **Capacidade:** C1

**Contexto:**  
A tabela dinâmica mostra o valor comprado por categoria. O gerente quer poder escolher, no topo do relatório, qual filial analisar, sem mudar as linhas e os valores.

**Comando:**  
Em qual área o campo Filial deve ser colocado?

**Alternativas:**
- A) Valores
- B) Linhas
- C) Colunas
- D) Filtros
- E) Em nenhuma área: é preciso criar uma fórmula SOMASE

**Gabarito:** D

---

## ITEM 40 — Aula 06: Resumir valores por média

- **Capacidade:** C1, C2

**Contexto:**  
A tabela dinâmica mostra a soma do valor das requisições por setor, mas o gestor quer o valor médio de cada requisição.

**Comando:**  
O que deve ser alterado?

**Alternativas:**
- A) Mover o campo Valor para Filtros
- B) Agrupar o campo Valor por trimestre
- C) Criar uma segmentação de dados
- D) Atualizar a tabela com Alt+F5
- E) Em Resumir Valores Por, trocar Soma por Média

**Gabarito:** E

---

## ITEM 41 — Aula 06: Percentual do total geral

- **Capacidade:** C1, C2

**Contexto:**  
A tabela dinâmica mostra o valor comprado de cada fornecedor no ano. A área de compras quer saber se existe dependência de um só fornecedor (acima de 50% das compras).

**Comando:**  
Qual recurso responde isso diretamente?

**Alternativas:**
- A) Agrupar as datas por mês
- B) Mostrar valores como % do Total Geral
- C) Ordenar os fornecedores de A a Z
- D) Mesclar as células dos fornecedores
- E) Ocultar a coluna de valores

**Gabarito:** B

---

## ITEM 42 — Aula 06: Campo calculado

- **Capacidade:** C1

**Contexto:**  
O gestor quer ver, dentro da tabela dinâmica, o custo de armazenagem de 5% sobre o valor de cada compra, sem acrescentar colunas na base.

**Comando:**  
Qual recurso deve ser usado?

**Alternativas:**
- A) Campo Calculado com a fórmula ='Valor da Compra' * 0,05
- B) Segmentação de Dados
- C) Linha do Tempo
- D) Validação de Dados
- E) Congelar Painéis

**Gabarito:** A

---

## ITEM 43 — Aula 06: Os maiores no topo

- **Capacidade:** C1

**Contexto:**  
A tabela dinâmica lista 80 itens com o valor comprado no ano. A diretoria quer ver só os 10 itens de maior valor, do maior para o menor.

**Comando:**  
O que deve ser feito?

**Alternativas:**
- A) Agrupar os itens por trimestre
- B) Mover o campo Item para Filtros
- C) Ordenar o valor em ordem decrescente e aplicar o filtro dos 10 Primeiros
- D) Excluir as linhas da base com valores pequenos
- E) Criar um gráfico de pizza com os 80 itens

**Gabarito:** C

---

## ITEM 44 — Aula 06: Linha do Tempo

- **Capacidade:** C1

**Contexto:**  
O painel de compras precisa de um filtro de datas em forma de barra horizontal, em que o usuário arrasta as bordas para escolher o período e alterna entre anos, trimestres, meses e dias.

**Comando:**  
Qual recurso faz isso?

**Alternativas:**
- A) Validação de Dados
- B) Formatação Condicional
- C) Filtro Automático
- D) Campo Calculado
- E) Linha do Tempo

**Gabarito:** E

---

## ITEM 45 — Aula 06: Ranking de fornecedores

- **Capacidade:** C1

**Contexto:**  
O analista quer comparar o valor comprado de 12 fornecedores, em forma de ranking, num gráfico fácil de ler.

**Comando:**  
Qual tipo de gráfico é o mais adequado?

**Alternativas:**
- A) Pizza com 12 fatias
- B) Linhas, uma para cada fornecedor
- C) Dispersão (XY)
- D) Barras (ou colunas), ordenadas do maior para o menor
- E) Rosca em 3D

**Gabarito:** D

---

## ITEM 46 — Aula 06: Gráfico de dispersão

- **Capacidade:** C1

**Contexto:**  
O gestor quer saber se existe relação entre a distância de cada entrega (km) e o custo do frete (R$), usando 200 entregas.

**Comando:**  
Qual tipo de gráfico mostra melhor essa correlação?

**Alternativas:**
- A) Pizza
- B) Dispersão (XY)
- C) Rosca
- D) Colunas empilhadas por mês
- E) Linha do tempo

**Gabarito:** B

---

## ITEM 47 — Aula 06: Base como tabela oficial

- **Capacidade:** C1

**Contexto:**  
Toda semana entram novas linhas na base de compras, e o analista esquece de ampliar o intervalo da tabela dinâmica, que fica sem os lançamentos novos.

**Comando:**  
Qual prática faz as novas linhas entrarem automaticamente na fonte da tabela dinâmica?

**Alternativas:**
- A) Transformar a base em tabela oficial (Inserir → Tabela) e atualizar a tabela dinâmica
- B) Mesclar as células do cabeçalho
- C) Agrupar as datas por ano
- D) Proteger a estrutura da pasta
- E) Ocultar as linhas de grade

**Gabarito:** A

---

## ITEM 48 — Aula 06: Proteger o relatório dinâmico

- **Capacidade:** C1

**Contexto:**  
O relatório de compras será distribuído aos supervisores. Eles não podem alterar nada, mas precisam continuar usando os filtros e a segmentação da tabela dinâmica.

**Comando:**  
Como proteger a planilha sem travar os filtros?

**Alternativas:**
- A) Apagar a tabela dinâmica e enviar só o gráfico
- B) Proteger a estrutura da pasta, sem proteger a planilha
- C) Proteger Planilha marcando a opção "Usar Tabela Dinâmica e Gráfico Dinâmico"
- D) Converter a tabela dinâmica em imagem
- E) Desmarcar Bloqueadas em todas as células

**Gabarito:** C

---

## ITEM 49 — Aula 07: Planilha comum × dashboard

- **Capacidade:** C1

**Contexto:**  
O diretor tem 30 segundos para avaliar o estoque do mês e recebeu uma planilha com 2.000 linhas de movimentações.

**Comando:**  
O que um dashboard oferece que essa planilha não oferece?

**Alternativas:**
- A) Guarda mais linhas de dados brutos
- B) Dispensa qualquer tabela dinâmica
- C) Substitui a base de dados original
- D) Reúne só os totais e indicadores críticos numa tela, com filtros visuais para decidir em segundos
- E) Mostra todas as transações com mais cores

**Gabarito:** D

---

## ITEM 50 — Aula 07: Cartões de KPI

- **Capacidade:** C1

**Contexto:**  
O analista vai desenhar os cartões de KPI do topo do dashboard de estoque.

**Comando:**  
Quais informações cada cartão deve ter?

**Alternativas:**
- A) Todas as movimentações do mês em letras pequenas
- B) Um gráfico de pizza e uma tabela dinâmica completa
- C) Apenas a fórmula usada no cálculo
- D) O nome do analista e a data de nascimento
- E) Rótulo do indicador, o número em tamanho grande e a seta de tendência

**Gabarito:** E

---

## ITEM 51 — Aula 07: Segmentador para o painel inteiro

- **Capacidade:** C1

**Contexto:**  
O dashboard tem três gráficos, cada um ligado a uma tabela dinâmica diferente. Ao clicar em "Região Sul" no segmentador, só um gráfico muda.

**Comando:**  
O que fazer para que o segmentador filtre os três gráficos?

**Alternativas:**
- A) Criar três segmentadores iguais e clicar em todos
- B) Clicar com o botão direito no segmentador, abrir Conexões de Relatório e marcar as três tabelas dinâmicas
- C) Mesclar as três tabelas dinâmicas
- D) Proteger a planilha do dashboard
- E) Converter os gráficos em imagem

**Gabarito:** B

---

## ITEM 52 — Aula 07: Cores no painel

- **Capacidade:** C1

**Contexto:**  
No dashboard de estoque, o KPI de ruptura passou da meta e precisa chamar a atenção, enquanto os demais dados são neutros.

**Comando:**  
Qual uso de cores segue as boas práticas?

**Alternativas:**
- A) Vermelho só no KPI em alerta, verde para meta atingida e tons neutros (azul ou cinza) no restante
- B) Uma cor chamativa diferente em cada gráfico (amarelo, rosa, roxo)
- C) Vermelho em todos os indicadores para manter o padrão
- D) Dez cores diferentes para deixar o painel alegre
- E) Verde no KPI de ruptura acima da meta

**Gabarito:** A

---

## ITEM 53 — Aula 07: Interface limpa

- **Capacidade:** C1

**Contexto:**  
O dashboard está pronto, mas ainda parece uma planilha comum, com as linhas de grade aparecendo atrás dos gráficos.

**Comando:**  
O que deve ser feito antes da apresentação?

**Alternativas:**
- A) Aplicar bordas pretas em todas as células
- B) Proteger a estrutura da pasta
- C) Desmarcar Linhas de Grade na guia Exibir
- D) Inserir mais gráficos para preencher os espaços
- E) Mesclar todas as células da aba

**Gabarito:** C

---

## ITEM 54 — Aula 07: Excesso de informação

- **Capacidade:** C1

**Contexto:**  
O gerente quer colocar 15 gráficos e 12 indicadores na mesma tela do dashboard "para não perder nenhum detalhe".

**Comando:**  
Qual orientação está de acordo com as boas práticas?

**Alternativas:**
- A) Aceitar, porque mais gráficos sempre ajudam a decidir
- B) Colocar os 15 gráficos em 3D para economizar espaço
- C) Usar uma cor diferente em cada um dos 15 gráficos
- D) Trocar os gráficos por tabelas com todas as linhas
- E) Manter poucos indicadores prioritários (até cerca de 7) e retirar os que não mudam decisões, deixando os detalhes para outro painel

**Gabarito:** E

---

## ITEM 55 — Aula 07: Gráficos 3D

- **Capacidade:** C1

**Contexto:**  
Para deixar o painel "mais moderno", um analista transformou as colunas e a pizza do dashboard em gráficos 3D.

**Comando:**  
Qual é o problema dessa escolha?

**Alternativas:**
- A) Gráficos 3D não podem ser filtrados pela segmentação
- B) O 3D impede a atualização da tabela dinâmica
- C) O 3D só funciona no LibreOffice
- D) O 3D distorce as proporções e leva o leitor a interpretar valores errados
- E) Nenhum: o 3D sempre melhora a leitura

**Gabarito:** D

---

## ITEM 56 — Aula 07: Apresentar para a diretoria

- **Capacidade:** C1

**Contexto:**  
O analista vai apresentar o dashboard de estoque para a diretoria em 5 minutos.

**Comando:**  
Como deve começar a apresentação?

**Alternativas:**
- A) Explicando as fórmulas usadas em cada célula
- B) Pela conclusão e seu impacto (ex.: "as perdas de estoque caíram 14%") e depois o gráfico que comprova
- C) Contando as dificuldades técnicas que encontrou
- D) Mostrando a base de dados bruta linha por linha
- E) Lendo todos os números de todas as tabelas

**Gabarito:** B

---

## ITEM 57 — Aula 07: Ticket médio

- **Capacidade:** C1, C2

**Contexto:**  
Em outubro, a loja de materiais faturou R$ 36.000,00 com 240 clientes atendidos.

**Comando:**  
Qual é o ticket médio (gasto médio por cliente)?

**Alternativas:**
- A) R$ 240,00
- B) R$ 1.500,00
- C) R$ 36,00
- D) R$ 8.640,00
- E) R$ 150,00

**Gabarito:** E

---

## ITEM 58 — Aula 07: Meta × realizado

- **Capacidade:** C1, C2

**Contexto:**  
A meta de faturamento do mês era R$ 50.000,00 e o realizado foi R$ 52.300,00.

**Comando:**  
Qual percentual da meta foi atingido?

**Alternativas:**
- A) 95,6%
- B) 2,3%
- C) 104,6%
- D) 152,3%
- E) 100%

**Gabarito:** C

---

## ITEM 59 — Aula 07: KPI de atraso

- **Capacidade:** C1, C2

**Contexto:**  
A TecLog (empresa fictícia) fez 1.200 entregas no semestre, das quais 84 chegaram fora do prazo.

**Comando:**  
Qual é o KPI de atraso (% de entregas fora do prazo)?

**Alternativas:**
- A) 7%
- B) 84%
- C) 14,3%
- D) 0,7%
- E) 93%

**Gabarito:** A

---

## ITEM 60 — Aula 07: Rascunho antes do software

- **Capacidade:** C1

**Contexto:**  
A equipe vai construir o dashboard da TecLog e quer evitar retrabalho no Excel.

**Comando:**  
Qual deve ser o primeiro passo do projeto visual?

**Alternativas:**
- A) Escolher as cores mais chamativas para cada gráfico
- B) Inserir todos os gráficos possíveis e decidir depois
- C) Proteger a planilha com senha
- D) Desenhar um rascunho (wireframe) no papel com a posição dos KPIs, gráficos e filtros
- E) Ocultar as linhas de grade da base de dados

**Gabarito:** D

---
