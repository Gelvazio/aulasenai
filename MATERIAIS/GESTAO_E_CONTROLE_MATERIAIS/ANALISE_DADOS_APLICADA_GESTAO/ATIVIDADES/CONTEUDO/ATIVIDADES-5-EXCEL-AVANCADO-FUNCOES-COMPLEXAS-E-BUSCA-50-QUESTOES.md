# Atividade: 5 Excel Avançado Funções Complexas e Busca — 50 Questões

- **Aula:** 05
- **Rótulo da aula:** Aula 05
- **Tema:** 5 Excel Avançado Funções Complexas e Busca
- **Ícone:** 🔍
- **Duração:** 100 minutos
- **Formato:** Múltipla escolha (A, B, C, D, E)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos; nota de 0 a 10)
- **Capacidade avaliada:** Cruzar tabelas por uma chave; Montar e interpretar o PROCV; Aplicar o PROCH; Combinar ÍNDICE e CORRESP; Tratar erros com SEERRO; Diagnosticar o erro #N/D; Montar SE aninhado; Contar com CONT.SE; Somar com SOMASE; Escolher a função de busca adequada
- **Conteúdo-base:** `CONTEUDO/5-Excel-Avançado-Funções-Complexas-e-Busca.md`
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim
- **Turma:** AI AIAC 2026/2 V1 (133933)

> Fonte única desta atividade. A linha **Gabarito** NÃO é publicada (arquivo no .gitignore);
> o gabarito fica só na tabela `gabarito` do banco.

---

## ITEM 01 — Entender por que as tabelas ficam separadas

- **Capacidade:** C1

**Contexto:**  
No almoxarifado da Construtora Morro Verde (empresa fictícia), a aba Requisições registra Data, Código do item e Quantidade. A descrição e o preço ficam só na aba Cadastro.

**Comando:**  
Por que a descrição e o preço não são digitados na aba Requisições?

**Alternativas:**
- A) Porque o Excel não aceita textos em abas de movimentação
- B) Para evitar repetições e erros; o cadastro é a referência oficial e os dados são buscados por fórmula
- C) Porque preços não podem ficar em planilhas
- D) Para deixar a planilha mais lenta
- E) Porque cada aba só aceita três colunas

**Gabarito:** B

---

## ITEM 02 — Identificar a chave que liga as tabelas

- **Capacidade:** C1

**Contexto:**  
As abas Requisições e Cadastro têm em comum a coluna Código do item (ex.: MAT-042).

**Comando:**  
Qual é o papel do código nesse cruzamento de dados?

**Alternativas:**
- A) É só um enfeite da tabela
- B) É o valor que será somado
- C) É o nome da aba
- D) É o intervalo da fórmula
- E) É a chave que conecta as duas bases

**Gabarito:** E

---

## ITEM 03 — Entender o funcionamento do PROCV

- **Capacidade:** C1

**Contexto:**  
O analista vai usar o PROCV para trazer a descrição do item pelo código.

**Comando:**  
Como o PROCV funciona?

**Alternativas:**
- A) Procura o valor na última coluna e devolve dados da primeira
- B) Procura o valor na primeira coluna da matriz e devolve o dado de outra coluna na mesma linha
- C) Soma os valores que atendem a um critério
- D) Conta quantas vezes o código aparece
- E) Procura o valor na primeira linha e desce até a linha indicada

**Gabarito:** B

---

## ITEM 04 — Reconhecer a sintaxe do PROCV

- **Capacidade:** C1

**Contexto:**  
O analista quer conferir a ordem dos argumentos do PROCV antes de montar a fórmula.

**Comando:**  
Qual é a sintaxe correta?

**Alternativas:**
- A) =PROCV(matriz_tabela; valor_procurado; núm_índice_coluna; [procurar_intervalo])
- B) =PROCV(núm_índice_coluna; valor_procurado; matriz_tabela)
- C) =PROCV(valor_procurado; matriz_tabela; núm_índice_coluna; [procurar_intervalo])
- D) =PROCV(valor_procurado; núm_índice_coluna; matriz_tabela; [procurar_intervalo])
- E) =PROCV(valor_procurado; [procurar_intervalo])

**Gabarito:** C

---

## ITEM 05 — Interpretar o número da coluna

- **Capacidade:** C1

**Contexto:**  
Na fórmula =PROCV(A2;D2:G20;3;FALSO), o número 3 aparece no terceiro argumento.

**Comando:**  
O que o número 3 representa?

**Alternativas:**
- A) A linha onde está o valor procurado
- B) A quantidade de resultados repetidos
- C) O número de colunas puladas antes da busca
- D) O número da coluna da matriz de onde vem o resultado (no caso, a coluna F)
- E) A terceira linha da matriz

**Gabarito:** D

---

## ITEM 06 — Usar a busca exata

- **Capacidade:** C1

**Contexto:**  
Os códigos do cadastro não seguem uma ordem e o analista precisa do item exato.

**Comando:**  
O que deve ser informado no último argumento do PROCV?

**Alternativas:**
- A) 1 ou VERDADEIRO, para correspondência exata
- B) O número da coluna
- C) O nome da aba
- D) Nada; o padrão já é a busca exata
- E) 0 ou FALSO, para correspondência exata

**Gabarito:** E

---

## ITEM 07 — Aplicar a regra de ouro do PROCV

- **Capacidade:** C1

**Contexto:**  
No cadastro, o preço está na coluna B e o código na coluna C. O analista tentou buscar o preço pelo código com PROCV e não conseguiu.

**Comando:**  
Por que o PROCV tradicional não funciona diretamente nesse caso?

**Alternativas:**
- A) Porque o preço é um número
- B) Porque a coluna C é protegida
- C) Porque o PROCV só procura da esquerda para a direita e o código precisa ser a primeira coluna da matriz
- D) Porque o PROCV só funciona com textos
- E) Porque faltou o SEERRO

**Gabarito:** C

---

## ITEM 08 — Montar o PROCV da descrição

- **Capacidade:** C1

**Contexto:**  
A aba Cadastro tem A2:C301 com Código | Descrição | Preço. Na aba Pedido, o código está em A2 e a Descrição vai em B2.

**Comando:**  
Qual fórmula está correta para B2?

**Alternativas:**
- A) =PROCV(A2;Cadastro!$A$2:$C$301;3;0)
- B) =PROCV(A2;Cadastro!A2:C301;2;1)
- C) =PROCV(Cadastro!$A$2:$C$301;A2;2;0)
- D) =PROCV(A2;Cadastro!$A$2:$C$301;2;0)
- E) =PROCV(A2;Cadastro!$A$2:$C$301;1;0)

**Gabarito:** D

---

## ITEM 09 — Montar o PROCV do preço

- **Capacidade:** C1

**Contexto:**  
Com o mesmo cadastro (A2:C301 = Código | Descrição | Preço), o Preço vai em C2 da aba Pedido.

**Comando:**  
Qual fórmula está correta para C2?

**Alternativas:**
- A) =PROCV(A2;Cadastro!$A$2:$C$301;3;0)
- B) =PROCV(A2;Cadastro!$A$2:$C$301;2;0)
- C) =PROCV(A2;Cadastro!$A$2:$C$301;4;0)
- D) =PROCV(C2;Cadastro!$A$2:$C$301;3;0)
- E) =PROCH(A2;Cadastro!$A$2:$C$301;3;0)

**Gabarito:** A

---

## ITEM 10 — Travar a matriz de busca

- **Capacidade:** C1

**Contexto:**  
Um auxiliar escreveu =PROCV(A2;Cadastro!A2:C301;2;0) sem cifrão e arrastou até a linha 301. Os últimos itens retornaram #N/D.

**Comando:**  
Qual é a causa?

**Alternativas:**
- A) Os últimos códigos não existem
- B) O PROCV só funciona até a linha 100
- C) Sem o $, a matriz "andou" para baixo e deixou de incluir as primeiras linhas do cadastro
- D) O número da coluna está errado
- E) A busca deveria ser aproximada

**Gabarito:** C

---

## ITEM 11 — Reconhecer o ganho de escala do PROCV

- **Capacidade:** C1

**Contexto:**  
O pedido tem 300 itens. Antes, o auxiliar copiava descrição e preço à mão.

**Comando:**  
Qual é o ganho de usar PROCV com a matriz travada?

**Alternativas:**
- A) Os 300 itens são preenchidos em segundos arrastando a fórmula, sem cópia manual
- B) O cadastro deixa de ser necessário
- C) Os preços passam a ser calculados pelo Excel
- D) A planilha fica protegida
- E) Os códigos são criados automaticamente

**Gabarito:** A

---

## ITEM 12 — Entender o PROCH

- **Capacidade:** C1

**Contexto:**  
A tabela de alíquotas por mês tem os meses na linha 1 (B1:M1) e as alíquotas nas linhas de baixo.

**Comando:**  
Como o PROCH funciona?

**Alternativas:**
- A) Procura na primeira coluna e devolve a coluna indicada
- B) Procura a chave na primeira linha da matriz e desce até a linha indicada
- C) Conta as células de uma linha
- D) Soma a linha inteira
- E) Procura da direita para a esquerda

**Gabarito:** B

---

## ITEM 13 — Interpretar uma fórmula PROCH

- **Capacidade:** C1

**Contexto:**  
A fórmula é =PROCH("Março";B1:M5;3;0). Os meses estão em B1:M1.

**Comando:**  
O que a fórmula devolve?

**Alternativas:**
- A) O valor da 3ª linha da matriz, na coluna em que está "Março"
- B) O valor da 3ª coluna da linha de Março
- C) A posição de Março na lista
- D) O total de Março
- E) O erro #N/D, pois PROCH não aceita textos

**Gabarito:** A

---

## ITEM 14 — Escolher entre PROCV e PROCH

- **Capacidade:** C1

**Contexto:**  
Uma planilha gerencial tem os trimestres lado a lado no topo (colunas) e os indicadores nas linhas.

**Comando:**  
Qual função de busca combina melhor com esse formato?

**Alternativas:**
- A) PROCV, pois os dados estão em colunas
- B) SOMASE
- C) CONT.SE
- D) PROCH, pois a chave (o trimestre) está na primeira linha
- E) SEERRO

**Gabarito:** D

---

## ITEM 15 — Entender a vantagem de ÍNDICE + CORRESP

- **Capacidade:** C1

**Contexto:**  
O gerente pediu uma busca em que a coluna do resultado fica à ESQUERDA da coluna do código.

**Comando:**  
Qual combinação resolve essa limitação do PROCV?

**Alternativas:**
- A) ÍNDICE + CORRESP
- B) SOMA + MÉDIA
- C) CONT.SE + SOMASE
- D) PROCH + SE
- E) SEERRO + PROCV

**Gabarito:** A

---

## ITEM 16 — Calcular o resultado do CORRESP

- **Capacidade:** C1

**Contexto:**  
A lista de fornecedores em A2:A5 é: Alfa, Beta, Cometa, Delta.

**Comando:**  
Qual é o resultado de =CORRESP("Cometa";A2:A5;0)?

**Alternativas:**
- A) Cometa
- B) A4
- C) 4
- D) 3
- E) #N/D

**Gabarito:** D

---

## ITEM 17 — Entender o que o CORRESP devolve

- **Capacidade:** C1

**Contexto:**  
Um auxiliar esperava que o CORRESP trouxesse o preço do fornecedor procurado.

**Comando:**  
O que o CORRESP devolve, na verdade?

**Alternativas:**
- A) O preço do item
- B) O nome da aba
- C) A posição (número) do item dentro da lista
- D) A soma da coluna
- E) O código de erro

**Gabarito:** C

---

## ITEM 18 — Entender a função ÍNDICE

- **Capacidade:** C1

**Contexto:**  
A lista de preços está em C2:C5 com os valores 12, 18, 25 e 31.

**Comando:**  
Qual é o resultado de =ÍNDICE(C2:C5;3)?

**Alternativas:**
- A) 25
- B) 3
- C) 18
- D) 31
- E) C4

**Gabarito:** A

---

## ITEM 19 — Montar a busca combinada

- **Capacidade:** C1

**Contexto:**  
Os códigos estão em A2:A301 e as descrições em B2:B301. O código procurado está em F2.

**Comando:**  
Qual fórmula traz a descrição do código de F2?

**Alternativas:**
- A) =CORRESP(B2:B301;ÍNDICE(F2;A2:A301;0))
- B) =ÍNDICE(A2:A301;CORRESP(F2;B2:B301;0))
- C) =ÍNDICE(F2;CORRESP(B2:B301;A2:A301;0))
- D) =ÍNDICE(B2:B301;F2)
- E) =ÍNDICE(B2:B301;CORRESP(F2;A2:A301;0))

**Gabarito:** E

---

## ITEM 20 — Buscar para a esquerda com ÍNDICE + CORRESP

- **Capacidade:** C1

**Contexto:**  
No cadastro, o preço está na coluna B (B2:B301) e o código na coluna C (C2:C301). O código procurado está em F2.

**Comando:**  
Qual fórmula traz o preço?

**Alternativas:**
- A) =PROCV(F2;B2:C301;1;0)
- B) =ÍNDICE(C2:C301;CORRESP(F2;B2:B301;0))
- C) =CORRESP(F2;B2:B301;0)
- D) =ÍNDICE(B2:B301;CORRESP(F2;C2:C301;0))
- E) =PROCV(F2;C2:C301;2;0)

**Gabarito:** D

---

## ITEM 21 — Ordenar a montagem do ÍNDICE + CORRESP

- **Capacidade:** C1

**Contexto:**  
Os passos são: definir o tipo 0 no CORRESP; escrever o ÍNDICE com o intervalo do resultado; identificar a coluna do resultado; inserir o CORRESP no argumento da linha.

**Comando:**  
Qual é o PRIMEIRO passo?

**Alternativas:**
- A) Definir o tipo 0 no CORRESP
- B) Inserir o CORRESP no argumento da linha
- C) Identificar a coluna onde está o resultado desejado
- D) Apertar Enter
- E) Escrever o SEERRO

**Gabarito:** C

---

## ITEM 22 — Reconhecer o erro #N/D

- **Capacidade:** C1

**Contexto:**  
O código MAT-999 foi lançado no pedido, mas não existe no cadastro. A fórmula usada é =PROCV(A2;Cadastro!$A$2:$C$301;2;0).

**Comando:**  
O que aparece na célula?

**Alternativas:**
- A) 0
- B) #N/D
- C) #DIV/0!
- D) #REF!
- E) Célula vazia

**Gabarito:** B

---

## ITEM 23 — Entender o problema do #N/D no relatório

- **Capacidade:** C1

**Contexto:**  
Uma coluna de preços tem alguns #N/D, e a SOMA da coluna também passou a mostrar #N/D.

**Comando:**  
Qual é o problema desses erros em relatórios?

**Alternativas:**
- A) Nenhum, a soma ignora os erros
- B) Só mudam a cor da célula
- C) Deixam a planilha mais rápida
- D) Poluem o relatório e quebram os cálculos que dependem dessas células
- E) Apagam os dados do cadastro

**Gabarito:** D

---

## ITEM 24 — Aplicar o SEERRO com mensagem

- **Capacidade:** C1

**Contexto:**  
Quando o código não existir, a célula da descrição deve mostrar Código não cadastrado.

**Comando:**  
Qual fórmula está correta?

**Alternativas:**
- A) =SEERRO("Código não cadastrado";PROCV(A2;D:F;2;0))
- B) =SEERRO(PROCV(A2;D:F;2;0);"Código não cadastrado")
- C) =SE(PROCV(A2;D:F;2;0);"Código não cadastrado")
- D) =PROCV(A2;D:F;"Código não cadastrado";0)
- E) =SEERRO(PROCV(A2;D:F;2;0))

**Gabarito:** B

---

## ITEM 25 — Usar SEERRO com zero em valores financeiros

- **Capacidade:** C1

**Contexto:**  
Na prática 1, o preço vem de =SEERRO(PROCV(B2;'Base Produtos'!$G:$I;3;0);0) e a coluna Total usa =C2*D2.

**Comando:**  
Por que o SEERRO devolve 0 e não um texto?

**Alternativas:**
- A) Porque o SEERRO não aceita textos
- B) Para esconder o código do produto
- C) Para que a coluna Total e as somas continuem calculando sem erro
- D) Porque 0 força a busca exata
- E) Para proteger a célula

**Gabarito:** C

---

## ITEM 26 — Avaliar uma afirmação sobre o SEERRO

- **Capacidade:** C1

**Contexto:**  
Afirmação: "A função SEERRO impede que o PROCV procure o dado na planilha."

**Comando:**  
A afirmação é verdadeira ou falsa?

**Alternativas:**
- A) Verdadeira, o SEERRO substitui a busca
- B) Verdadeira, o SEERRO desliga o PROCV quando há erro
- C) Falsa, o SEERRO só funciona com o PROCH
- D) Verdadeira, o SEERRO sempre devolve 0
- E) Falsa, o SEERRO executa o cálculo normal e só age se houver erro

**Gabarito:** E

---

## ITEM 27 — Diagnosticar o #N/D por espaço extra

- **Capacidade:** C1

**Contexto:**  
O código "MAT-001 " (com um espaço no final) foi importado de outro sistema e o PROCV devolve #N/D, embora MAT-001 exista no cadastro.

**Comando:**  
Qual função limpa o espaço extra?

**Alternativas:**
- A) =VALOR(A2)
- B) =ARRUMAR(A2)
- C) =ÉTEXTO(A2)
- D) =SEERRO(A2)
- E) =CONT.SE(A2)

**Gabarito:** B

---

## ITEM 28 — Diagnosticar o #N/D por número salvo como texto

- **Capacidade:** C1

**Contexto:**  
No cadastro, os códigos 1050, 1051... são números. No pedido, o código 1050 aparece com um triângulo verde e o PROCV devolve #N/D.

**Comando:**  
Qual é a causa e a correção?

**Alternativas:**
- A) O código não existe; cadastrar de novo
- B) Falta o SEERRO; nada mais a fazer
- C) O código está salvo como texto; converter para número (ex.: =VALOR(A2))
- D) A coluna está congelada; descongelar
- E) A busca é aproximada; trocar para 1

**Gabarito:** C

---

## ITEM 29 — Conferir se o código está como texto

- **Capacidade:** C1

**Contexto:**  
Antes de culpar a fórmula, o analista quer testar se o código em A2 está salvo como texto.

**Comando:**  
Qual fórmula retorna VERDADEIRO se A2 contiver texto?

**Alternativas:**
- A) =VALOR(A2)
- B) =ARRUMAR(A2)
- C) =SE(A2)
- D) =ÉTEXTO(A2)
- E) =CORRESP(A2)

**Gabarito:** D

---

## ITEM 30 — Reconhecer o risco de esquecer o último argumento

- **Capacidade:** C1

**Contexto:**  
Um auxiliar escreveu =PROCV(A2;Cadastro!$A$2:$C$301;2), sem o último argumento, e os códigos do cadastro não estão em ordem.

**Comando:**  
Qual é o risco?

**Alternativas:**
- A) A busca fica aproximada e pode trazer a descrição de outro item
- B) A fórmula dá erro de sintaxe e não calcula
- C) Nenhum, pois o padrão é a busca exata
- D) A fórmula passa a procurar para a esquerda
- E) A matriz deixa de ficar travada

**Gabarito:** A

---

## ITEM 31 — Entender a necessidade do SE aninhado

- **Capacidade:** C1

**Contexto:**  
Um único SE devolve apenas dois resultados. O almoxarifado precisa classificar os itens em três situações.

**Comando:**  
Como classificar em três ou mais cenários?

**Alternativas:**
- A) Usando só o SEERRO
- B) Usando o PROCH
- C) Usando o CONT.SE
- D) Não é possível no Excel
- E) Colocando uma função SE dentro de outra (SE aninhado)

**Gabarito:** E

---

## ITEM 32 — Calcular com SE aninhado de situação do estoque

- **Capacidade:** C1

**Contexto:**  
A fórmula de situação é =SE(D2<10;"Crítico";SE(D2<=30;"Atenção";"Normal")). O saldo em D2 é 30.

**Comando:**  
Qual é o resultado?

**Alternativas:**
- A) Atenção
- B) Crítico
- C) Normal
- D) 30
- E) Erro

**Gabarito:** A

---

## ITEM 33 — Calcular com SE aninhado no limite inferior

- **Capacidade:** C1

**Contexto:**  
Com a mesma fórmula =SE(D2<10;"Crítico";SE(D2<=30;"Atenção";"Normal")), o saldo em D2 é 10.

**Comando:**  
Qual é o resultado?

**Alternativas:**
- A) Crítico
- B) Normal
- C) 10
- D) Erro
- E) Atenção

**Gabarito:** E

---

## ITEM 34 — Montar o SE aninhado de desconto

- **Capacidade:** C1

**Contexto:**  
Faixas de desconto do fornecedor: pedido de R$ 10.000 ou mais = 15%; de R$ 5.000 ou mais = 10%; abaixo disso = 0%. O valor do pedido está em B2.

**Comando:**  
Qual fórmula devolve a taxa correta?

**Alternativas:**
- A) =SE(B2>=5000;10%;SE(B2>=10000;15%;0%))
- B) =SE(B2>=10000;15%;SE(B2>=5000;10%;0%))
- C) =SE(B2>=10000;15%;10%)
- D) =SE(B2<5000;15%;SE(B2<10000;10%;0%))
- E) =SE(B2=10000;15%;SE(B2=5000;10%;0%))

**Gabarito:** B

---

## ITEM 35 — Entender a ordem dos testes no SE aninhado

- **Capacidade:** C1

**Contexto:**  
Na fórmula =SE(B2>=5000;10%;SE(B2>=10000;15%;0%)), um pedido de R$ 12.000 recebeu 10%, e não 15%.

**Comando:**  
Por que isso aconteceu?

**Alternativas:**
- A) Porque o Excel arredonda os percentuais
- B) Porque faltou o SEERRO
- C) Porque 12.000 não é maior que 10.000
- D) Porque o SE aninhado só aceita dois testes
- E) Porque o primeiro teste verdadeiro encerra a fórmula; o teste de 5.000 veio antes e "pegou" o valor

**Gabarito:** E

---

## ITEM 36 — Entender a função CONT.SE

- **Capacidade:** C1

**Contexto:**  
O supervisor quer saber quantas requisições estão com status "Concluído" em C2:C100.

**Comando:**  
Qual fórmula atende ao pedido?

**Alternativas:**
- A) =SOMASE(C2:C100;"Concluído")
- B) =CONT.VALORES(C2:C100)
- C) =PROCV("Concluído";C2:C100;1;0)
- D) =CONT.SE(C2:C100;"Concluído")
- E) =SE(C2:C100="Concluído")

**Gabarito:** D

---

## ITEM 37 — Contar com critério numérico

- **Capacidade:** C1

**Contexto:**  
A coluna D tem o saldo de cada item. O gerente quer saber quantos itens têm saldo positivo.

**Comando:**  
Qual fórmula está correta?

**Alternativas:**
- A) =CONT.SE(D:D;0)
- B) =CONT.SE(D:D;>0)
- C) =CONT.SE(D:D;">0")
- D) =SOMASE(D:D;">0")
- E) =CONT.NÚM(D:D>0)

**Gabarito:** C

---

## ITEM 38 — Contar cadastros preenchidos

- **Capacidade:** C1

**Contexto:**  
A coluna B tem a descrição dos itens. O analista quer contar as células não vazias usando CONT.SE.

**Comando:**  
Qual critério deve ser usado?

**Alternativas:**
- A) "="
- B) ">0"
- C) "*0"
- D) "vazio"
- E) "<>"

**Gabarito:** E

---

## ITEM 39 — Contar pedidos acima da média

- **Capacidade:** C1, C2

**Contexto:**  
A coluna E tem as quantidades pedidas. O gerente quer contar os pedidos acima da média da coluna.

**Comando:**  
Qual fórmula está correta?

**Alternativas:**
- A) =CONT.SE(E:E;">MÉDIA(E:E)")
- B) =CONT.SE(E:E;MÉDIA(E:E))
- C) =CONT.SE(E:E;">"&MÉDIA(E:E))
- D) =MÉDIA(CONT.SE(E:E))
- E) =SOMASE(E:E;">"&MÉDIA(E:E))

**Gabarito:** C

---

## ITEM 40 — Reconhecer a sintaxe do SOMASE

- **Capacidade:** C1

**Contexto:**  
O analista vai somar valores de acordo com uma condição.

**Comando:**  
Qual é a sintaxe do SOMASE?

**Alternativas:**
- A) =SOMASE(intervalo_soma; critérios; intervalo_critério)
- B) =SOMASE(intervalo_critério; critérios; [intervalo_soma])
- C) =SOMASE(critérios; intervalo_critério)
- D) =SOMASE(intervalo_critério; intervalo_soma)
- E) =SOMASE(intervalo_soma; intervalo_critério)

**Gabarito:** B

---

## ITEM 41 — Diferenciar CONT.SE e SOMASE

- **Capacidade:** C1

**Contexto:**  
O gerente fez duas perguntas: "Quantas requisições o setor Manutenção fez?" e "Quanto o setor Manutenção gastou?".

**Comando:**  
Quais funções respondem a cada pergunta, nessa ordem?

**Alternativas:**
- A) SOMASE e CONT.SE
- B) PROCV e PROCH
- C) SOMA e MÉDIA
- D) CONT.SE e CONT.SE
- E) CONT.SE e SOMASE

**Gabarito:** E

---

## ITEM 42 — Contar requisições de uma categoria

- **Capacidade:** C1

**Contexto:**  
Na base do almoxarifado, a coluna C tem a Categoria e a coluna E o Valor Total. O gerente quer contar as requisições da categoria "EPI".

**Comando:**  
Qual fórmula está correta?

**Alternativas:**
- A) =SOMASE(C:C;"EPI";E:E)
- B) =CONT.SE(C:C;"EPI")
- C) =CONT.SE(E:E;"EPI")
- D) =CONT.VALORES(C:C)
- E) =PROCV("EPI";C:E;3;0)

**Gabarito:** B

---

## ITEM 43 — Somar o gasto de uma categoria

- **Capacidade:** C1

**Contexto:**  
Com a mesma base (C = Categoria, E = Valor Total), o gerente quer o valor total gasto com "Ferramentas".

**Comando:**  
Qual fórmula está correta?

**Alternativas:**
- A) =SOMASE(E:E;"Ferramentas";C:C)
- B) =CONT.SE(C:C;"Ferramentas")
- C) =SOMA(C:C;"Ferramentas")
- D) =SOMASE(C:C;"Ferramentas";E:E)
- E) =SOMASE(C:C;E:E;"Ferramentas")

**Gabarito:** D

---

## ITEM 44 — Calcular um SOMASE

- **Capacidade:** C1

**Contexto:**  
Base de requisições: Linha 2: EPI, R$ 300; Linha 3: Ferramentas, R$ 450; Linha 4: EPI, R$ 200; Linha 5: Limpeza, R$ 120; Linha 6: EPI, R$ 180. (Categoria em C2:C6 e Valor em E2:E6.)

**Comando:**  
Qual é o resultado de =SOMASE(C2:C6;"EPI";E2:E6)?

**Alternativas:**
- A) 3
- B) R$ 1.250
- C) R$ 680
- D) R$ 500
- E) R$ 300

**Gabarito:** C

---

## ITEM 45 — Calcular um CONT.SE

- **Capacidade:** C1

**Contexto:**  
Com a mesma base do Item 44 (categorias em C2:C6: EPI, Ferramentas, EPI, Limpeza, EPI).

**Comando:**  
Qual é o resultado de =CONT.SE(C2:C6;"EPI")?

**Alternativas:**
- A) 5
- B) 680
- C) 1
- D) 2
- E) 3

**Gabarito:** E

---

## ITEM 46 — Conferir o tamanho dos intervalos no SOMASE

- **Capacidade:** C1

**Contexto:**  
Um auxiliar escreveu =SOMASE(C2:C200;"EPI";E2:E150).

**Comando:**  
Qual cuidado ele esqueceu?

**Alternativas:**
- A) O intervalo do critério e o de soma precisam ter o mesmo número de linhas
- B) Usar ponto e vírgula
- C) Escrever o critério sem aspas
- D) Trocar SOMASE por CONT.SE
- E) Usar o PROCV antes

**Gabarito:** A

---

## ITEM 47 — Entender as aspas no critério

- **Capacidade:** C1

**Contexto:**  
Na fórmula =CONT.SE(C:C;"EPI"), o critério está entre aspas.

**Comando:**  
Por que as aspas são necessárias?

**Alternativas:**
- A) Para travar a coluna
- B) Para somar os valores
- C) Para esconder o critério
- D) Para o Excel procurar exatamente aquele texto
- E) Não são necessárias

**Gabarito:** D

---

## ITEM 48 — Classificar itens com SE aninhado e contar com CONT.SE

- **Capacidade:** C1

**Contexto:**  
Na prática 3, a coluna Status (F2:F100) recebeu Crítico, Atenção ou Normal pelo SE aninhado. O gerente quer o total de itens em situação crítica.

**Comando:**  
Qual fórmula calcula esse total?

**Alternativas:**
- A) =CONT.SE(F2:F100;"Crítico")
- B) =SOMASE(F2:F100;"Crítico")
- C) =CONT.VALORES(F2:F100)
- D) =SE(F2:F100="Crítico";1;0)
- E) =PROCV("Crítico";F2:F100;1;0)

**Gabarito:** A

---

## ITEM 49 — Escolher ÍNDICE + CORRESP em bases grandes

- **Capacidade:** C1

**Contexto:**  
Numa base de 5.000 linhas, alguém inseriu uma coluna nova no meio do cadastro e vários PROCV passaram a trazer o dado errado.

**Comando:**  
Por que o ÍNDICE + CORRESP é mais seguro nesse caso?

**Alternativas:**
- A) Porque é mais curto de digitar
- B) Porque aponta direto para a coluna do resultado e não depende de um número de coluna fixo
- C) Porque não aceita erros
- D) Porque só funciona com números
- E) Porque dispensa a chave de busca

**Gabarito:** B

---

## ITEM 50 — Recomendar a função de busca

- **Capacidade:** C1

**Contexto:**  
A diretoria pediu uma consulta que cruza linhas e colunas ao mesmo tempo (item × mês) numa matriz grande.

**Comando:**  
Qual recomendação é a mais adequada?

**Alternativas:**
- A) Usar ÍNDICE com CORRESP, que permite consultas bidirecionais
- B) Digitar os valores à mão
- C) Usar só CONT.SE
- D) Usar SOMA
- E) Usar PROCV com o número de coluna fixo

**Gabarito:** A

---
