# 3 Excel Básico Interface e Fórmulas

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 2 — Excel Básico e Intermediário (8h), parte 1 de 2
> - **Conhecimentos [oficial]:** base didática para o 2.2 (interface, fórmulas e funções básicas; o item 2.1 não consta na ementa do curso)
> - **Capacidades:** C1 · C2
> - **Indicadores de desempenho:** 5 (planilha com formatação e referências relativas/absolutas) · 6 (SOMA, MÉDIA, CONT, MÁXIMO, MÍNIMO e SE)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** oficina de controle de estoque (base para as situações 5 e 6 do arquivo 4)
> - **Editor:** Excel ou LibreOffice Calc (funções em português; PROCV, SE, CONT.SE, SOMASE e SEERRO têm o mesmo nome nos dois)
> - Slides `N.1`, `N.2`... são complementos da ementa e não existem no `.pptx`.

## Slide 1 — Excel Básico: Interface e Fórmulas

- Dominando a interface, operações essenciais e automação no Excel.

## Slide 2 — Imagine Calcular o Saldo de Mil Itens Manualmente

- Como os almoxarifados controlavam entradas, saídas e saldos antes das planilhas eletrônicas?

## Slide 3 — Objetivos da Nossa Aula

- Dominar interface, células e navegação no Excel.

- 1

- Criar fórmulas e usar SOMA, MÉDIA, CONT.NÚM, CONT.VALORES, MÁXIMO e MÍNIMO.

- 2

- Aplicar referências e a função SE para decisões.

- 3

- 🧠

- Lembre-se
- Ao final, você criará uma planilha automatizada de controle de estoque.

## Slide 4 — Recapitulação: Estatística e Gestão

- Medidas em Decisões
- Nas aulas anteriores, vimos ferramentas estatísticas:
- Média e Mediana: identificam centros de custos e vendas
- Desvio Padrão: quantifica riscos e dispersão
- Variações Percentuais: medem crescimento e margens

- 🔑

- Ponto-chave
- O Excel torna essas análises instantâneas e dinâmicas.

## Slide 5 — Quiz: Revisão Estatística

- Se o faturamento de uma loja sobe de R$ 10.000 para R$ 12.500, qual foi a variação percentual?

- 1.

- +15%

- 2.

- +12,5%

- 3.

- +20%

- 4.

- +25%

## Slide 6 — Quiz: Revisão Estatística

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

## Slide 7 — Vocabulário Fundamental do Excel

- Planilha: Área de trabalho composta por milhões de células organizadas.

- Sintaxe: Regra gramatical para escrita de funções e seus argumentos.

- Célula: Interseção de linha e coluna, identificada por letra e número (ex.: B4).

- Fórmula: Expressão para calcular valores, iniciada obrigatoriamente por sinal de igual.

## Slide 8 — A Estrutura da Interface

- A tela do Excel organiza ferramentas em Guias superiores (Página Inicial, Inserir, Fórmulas) e reúne comandos na Faixa de Opções.

- Logo abaixo da faixa, a Barra de Fórmulas exibe o conteúdo exato ou equação da célula ativa, permitindo edições rápidas com precisão cirúrgica.

## Slide 9 — Colunas, Linhas e Abas

- Colunas e Linhas
- Colunas verticais recebem letras (A, B, C...). Linhas horizontais recebem números (1, 2, 3...). O cruzamento gera o endereço único da célula.

- Pastas e Abas
- Um arquivo é uma Pasta de Trabalho, podendo abrigar múltiplas abas organizadas por departamentos como Vendas, Custos e RH.

## Slide 10 — Entrada e Tipos de Dados

- O Excel classifica as informações inseridas automaticamente:
- Textos: alinhados automaticamente à esquerda
- Números e Datas: alinhados automaticamente à direita
- Valores Lógicos: termos VERDADEIRO ou FALSO centralizados

- ⚠️

- Atenção
- Se um número ficar alinhado à esquerda, o Excel o interpretou como texto e não fará contas!

## Slide 11 — Formatação Essencial de Células

- Porcentagem
- Multiplica a fração por 100 e exibe o símbolo % (ex.: 0,15 vira 15%).

- Moeda / Contábil
- Formata valores com símbolo R$ e duas casas decimais padronizadas.

- Bordas e Cores
- Destacam títulos e totais, separando dados brutos de resultados gerenciais.

## Slide 12 — Visão Geral: Excel na Prática

- Aprenda: cursores, seleção de intervalos e organização de planilhas.

## Slide 13 — Construindo Fórmulas Básicas

- Toda fórmula no Excel deve começar com o sinal de igual (=). Sem ele, o programa entende o cálculo como texto comum.

- Em vez de somar números fixos (=10+20), somamos referências de células (=A1+B1). Assim, o resultado atualiza sozinho quando os valores mudam!

- 🧠

- Lembre-se
- O sinal de igual avisa o Excel: 'prepare-se para calcular!'

## Slide 14 — Operadores Aritméticos no Teclado

- Soma e Subtração
- Adição: sinal + (ex.: =B2+C2)
- Subtração: sinal - (ex.: =B2-C2)
- Utilizados para calcular receitas totais e descontos sobre produtos.

- Multiplicação e Divisão
- Multiplicação: asterisco * (ex.: =B2*C2)
- Divisão: barra / (ex.: =B2/C2)
- Utilizados para precificação unitária e cálculo de taxas mensais.

## Slide 15 — Precedência Operatória no Excel

- Assim como na matemática escolar, o Excel respeita ordens rigorosas:
- Parênteses
- Multiplicação (*) e Divisão (/)
- Adição (+) e Subtração (-)

- ⚠️

- Atenção
- A fórmula =10+5*2 resulta em 20. Se você desejava somar antes, use =(10+5)*2 para obter 30.

## Slide 16 — Checando a Lógica de Fórmulas

- No Excel, a expressão =5+2*10 resulta em 70.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

## Slide 17 — Checando a Lógica de Fórmulas

- ✅

- No Excel, a expressão =5+2*10 resulta em 70.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- A multiplicação é calculada antes da soma: 2*10=20, depois 5+20=25.

- 🔑

## Slide 18 — A Função SOMA (SUM)

- A função SOMA totaliza rapidamente centenas de números sem a necessidade de digitar operador por operador.

- A sintaxe =SOMA(B2:B6) utiliza dois pontos (:) para indicar um intervalo contínuo, somando da célula B2 até a célula B6.

## Slide 19 — A Função MÉDIA (AVERAGE)

- A função MÉDIA soma todos os valores do intervalo selecionado e divide a soma pela quantidade de elementos numéricos preenchidos.

- 🔍

- Exemplo
- Se as saídas de um item em C2, C3 e C4 forem 8, 7 e 9 caixas, a fórmula =MÉDIA(C2:C4) retornará automaticamente 8.

- Células vazias são desconsideradas no divisor, preservando a exatidão estatística do indicador.

## Slide 20 — A Função CONT.VALORES (COUNTA)

- Enquanto a função CONT.NÚM computa apenas dígitos numéricos, a função CONT.VALORES contabiliza qualquer célula preenchida com texto ou número.

- 🔑

- Ponto-chave
- Ideal para saber quantos itens estão cadastrados no estoque pela descrição na coluna A.

- Sintaxe: =CONT.VALORES(A2:A50). Células em branco são ignoradas.

## Slide 20.1 — As Funções MÁXIMO e MÍNIMO

- MÁXIMO retorna o maior valor de um intervalo; MÍNIMO retorna o menor.

- =MÁXIMO(C2:C31): maior saída diária do mês
- =MÍNIMO(E2:E200): menor saldo entre os itens cadastrados

- 🔍
- Exemplo
- Saídas de 8, 15, 4 e 12 caixas: MÁXIMO = 15, MÍNIMO = 4 e a amplitude (=MÁXIMO(...)-MÍNIMO(...)) = 11 caixas.

## Slide 20.2 — CONT.NÚM × CONT.VALORES

- Intervalo A2:A6 com: "Luva", 25, (vazio), "Óculos", 10

- =CONT.NÚM(A2:A6) → 2 (conta só números)
- =CONT.VALORES(A2:A6) → 4 (conta qualquer célula preenchida)

- 🔑
- Ponto-chave
- Use CONT.NÚM para quantidades lançadas e CONT.VALORES para itens cadastrados.

## Slide 21 — Passo a Passo da Função

- Ordene os passos corretos para calcular a média de uma coluna de saídas do estoque:

- Clique na célula onde o resultado final deve aparecer

- Selecione com o mouse o intervalo de dados desejado (ex.: B2:B10)

- Digite o sinal de igual seguido do nome da função: =MÉDIA(

- Feche os parênteses ) e pressione a tecla Enter

## Slide 22 — Passo a Passo da Função

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

## Slide 23 — Lógica Condicional: A Função SE

- Na gestão empresarial, decisões dependem de regras: 'se a meta for atingida, pague bônus; caso contrário, não pague'.

- A função SE avalia uma condição lógica. Se for verdadeira, executa uma ação; se for falsa, executa um caminho alternativo definido por você.

## Slide 24 — A Estrutura da Função SE

- Os 3 Argumentos
- A sintaxe exige três elementos separados por ponto e vírgula:
- =SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)

- Exemplo Prático
- =SE(D2<E2; "Repor"; "OK"): se o saldo em D2 for menor que o estoque mínimo em E2, exibe 'Repor'; caso contrário, exibe 'OK'.

## Slide 25 — Operadores de Comparação Lógica

- Para montar o teste lógico no primeiro argumento, usamos os operadores comparativos:
- Maior que: >
- Menor que: <
- Maior ou igual: >=
- Menor ou igual: <=
- Igual: = e Diferente: <>

- 🧠

- Lembre-se
- Sempre que o resultado de texto for fixo, escreva-o entre aspas duplas ("Bônus").

## Slide 26 — Análise de Fórmulas com SE

- Avaliando a fórmula =SE(C2>5000; C2*0,1; 0), quais afirmativas são verdadeiras?

- 1.

- Se C2 for igual a 6.000, o resultado retornado será 600

- 2.

- A fórmula apresenta erro de sintaxe por não conter textos entre aspas

- 3.

- Se C2 for igual a 4.500, o resultado retornado será 0

- 4.

- Se C2 for exatamente 5.000, o resultado calculado será 500

## Slide 27 — Análise de Fórmulas com SE

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

## Slide 28 — Referências Relativas no Excel

- Por padrão, as referências no Excel são relativas. Quando você escreve =B2*C2 e arrasta a fórmula para baixo, ela ajusta automaticamente para =B3*C3.

- 🔑

- Ponto-chave
- O Excel memoriza a posição proporcional: 'multiplique as duas células à minha esquerda'.

- Essa característica economiza horas de trabalho repetitivo em listas com milhares de linhas.

## Slide 29 — O Desafio da Taxa Fixa

- Imagine calcular o imposto de vários produtos multiplicando cada valor pela taxa fixa de 10% localizada isoladamente na célula F1.

- Se você arrastar =B2*F1 para baixo, a próxima linha buscará =B3*F2. Como F2 está vazia, o resultado será zero!

- ⚠️

- Atenção
- Precisamos travar a referência da célula F1 para que ela não se desloque!

## Slide 30 — Referências Absolutas e o Cifrão

- O Símbolo Cifrão ($)
- O cifrão fixa a célula de cálculo: =B2*$F$1.
- Ao arrastar, a fórmula vira =B3*$F$1, mantendo a taxa correta.

- O Atalho Mágico F4
- Ao digitar uma célula na fórmula, pressione F4.
- O Excel insere automaticamente os cifrões na referência.

## Slide 31 — Alça de Preenchimento Rápido

- No canto inferior direito da célula ativa, existe um pequeno quadrado verde chamado Alça de Preenchimento.

- Ao clicar e arrastar (ou dar um duplo clique), o Excel copia fórmulas ou gera sequências lógicas (dias da semana, meses, datas).

- 🤯

- Curiosidade
- O duplo clique na alça propaga o cálculo até a última linha preenchida da tabela vizinha!

## Slide 32 — O Poder do Preenchimento Relâmpago

- O Preenchimento Relâmpago (atalho ) reconhece padrões de texto e replica transformações instantaneamente.

- Exemplo
- Se a coluna A possui 'Lucas Silva', digite 'Lucas' na coluna B e aperte Ctrl+E: o Excel extrairá todos os primeiros nomes sozinhos.

- 🔍

- Funciona para formatar CPFs, separar sobrenomes ou concatenar códigos empresariais.

## Slide 33 — Fixando Conceitos e Atalhos

- Relacione as palavras com as definições

- Ponto e Vírgula (;)

- Atalho que insere cifrões para fixar uma referência absoluta

- Dois Pontos (:)

- Operador que indica intervalo contínuo do início ao fim

- Ctrl + E

- Atalho do Preenchimento Relâmpago para reconhecer padrões

- F4

- Separador individual de argumentos dentro de uma função

## Slide 34 — Fixando Conceitos e Atalhos

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

## Slide 35 — Oficina Prática: Controle de Estoque

- Chegou a hora de consolidar estrutura, fórmulas e tomada de decisão em um caso real de almoxarifado.

- Vamos construir uma planilha automatizada com saldo, custo em estoque, custo de armazenagem, alerta de reposição e resumo do mês.

## Slide 36 — Passo 1: Estrutura da Planilha

- Cabeçalhos: Código, Item, Entradas, Saídas, Saldo, Estoque Mínimo, Custo Unitário, Custo em Estoque, Armazenagem e Situação.

- Na célula isolada L1, cadastre a taxa mensal de armazenagem: 2% (0,02).

- Formate os custos como Moeda (R$) e as quantidades como número inteiro.

## Slide 37 — Passo 2: Fórmulas Automatizadas

- Saldo e Custo
- Saldo (E2): =C2-D2
- Custo em Estoque (H2): =E2*G2

- Armazenagem e Situação
- Armazenagem (I2): =H2*$L$1 — a referência absoluta trava a taxa ao arrastar.
- Situação (J2): =SE(E2<F2; "Repor"; "OK")

## Slide 38 — Passo 3: Resumo do Mês

- Custo total em estoque: =SOMA(H2:H11)
- Saída média por item: =MÉDIA(D2:D11)
- Maior e menor saldo: =MÁXIMO(E2:E11) e =MÍNIMO(E2:E11)
- Itens cadastrados: =CONT.VALORES(B2:B11)
- Itens com saldo numérico lançado: =CONT.NÚM(E2:E11)

## Slide 39 — Desafio Prático de Gestão

- Abra a planilha e execute o projeto de controle de estoque:
- Cadastre 10 itens do almoxarifado (luvas, parafusos, fita, óculos...).
- Em L1, insira 2% e calcule a armazenagem usando $L$1.
- Aplique SE: saldo abaixo do mínimo → "Repor".
- Calcule total, média, MÁXIMO e MÍNIMO no resumo.
- Copie uma fórmula sem $ e observe a referência que "anda"; corrija com F4.

## Slide 40 — Debate: Eficiência e Riscos

- Por que erros em referências absolutas ou de fórmulas no Excel podem gerar grandes prejuízos para a administração de uma empresa?

## Slide 41 — Debate: Eficiência e Riscos

- ✅

- Você poderia ter dito...
- Uma fórmula incorreta pode se propagar para milhares de linhas despercebida.
- Isso acarreta compras em excesso ou em falta, custo de estoque errado e distorção em relatórios que embasam decisões da gerência.
