# 5 Excel Avançado Funções Complexas e Busca

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 3 — Excel Avançado e Visualização (8h), parte 1 de 2
> - **Conhecimentos [oficial]:** 2.2.2 Funções (PROCV, PROCH, Função SE, CONT.SE) + ÍNDICE/CORRESP, SEERRO, SOMASE
> - **Capacidades:** C1 · C2 · S2 Aprendizagem ativa
> - **Indicadores de desempenho:** 8 (PROCV/PROCH com SEERRO) · 9 (CONT.SE e SOMASE)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** 7 (PROCV de 300 itens pelo código)
> - **Editor:** Excel ou LibreOffice Calc (funções em português; PROCV, SE, CONT.SE, SOMASE e SEERRO têm o mesmo nome nos dois)
> - Slides `N.1`, `N.2`... são complementos da ementa e não existem no `.pptx`.

## Slide 1 — Excel Avançado: Funções Complexas e Busca

- Domine PROCV, ÍNDICE, CORRESP e agregações condicionais para gestão.

## Slide 2 — O Desafio dos Dados Dispersos

- Imagine procurar manualmente o preço de 500 produtos em uma lista com 10.000 itens. Como fazer isso em segundos sem errar?

## Slide 3 — Objetivos da Aula

- Hoje você vai dominar ferramentas fundamentais para conectar dados e gerar relatórios executivos confiáveis.

- Construir buscas com PROCV, PROCH e ÍNDICE+CORRESP.

- 1

- 2

- Tratar erros com SEERRO e estruturar SE aninhado.

- Consolidar métricas com CONT.SE e SOMASE.

- 3

## Slide 4 — Vocabulário Essencial

- Consulta: Recuperação automática de dados entre tabelas distintas.

- Tratamento: Prevenção e correção de erros em buscas não encontradas.

- Pesquisa: Localização de um valor-chave em colunas ou matrizes.

- Agregação: Cálculo que reúne múltiplos registros, como somas ou contagens.

## Slide 5 — Revisão: Aulas Anteriores

- REVISÃO

- Revisamos proteção e organização para manter planilhas padronizadas:
- Formatação Condicional: realce visual automático.
- Validação de Dados: listas e limites de entrada.
- Proteção e Bloqueio: segurança contra edições.

- 🧠

- Lembre-se
- Congelar painéis mantém cabeçalhos visíveis na navegação.

## Slide 6 — Quiz: Validação e Navegação

- Pergunta 1:
- Qual recurso impede digitação de valores inválidos em uma célula?

- Pergunta 2:
- Qual ferramenta mantém títulos de colunas visíveis ao rolar a tela?

- Pergunta 3:
- Como destacar automaticamente vendas acima de R$ 1.000 com cor verde?

## Slide 7 — Quiz: Validação e Navegação

- ✅

- Resposta 1:
- Validação de Dados

- Resposta 2:
- Congelar Painéis

- Resposta 3:
- Formatação Condicional

## Slide 8 — O Conceito de Cruzamento de Dados

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

## Slide 9 — PROCV: Pesquisa Vertical

- FUNÇÃO DE BUSCA

- A função PROCV (Procura Vertical) percorre a primeira coluna de uma tabela procurando um valor-chave e retorna o dado de outra coluna na mesma linha.

- 🧠

- Lembre-se
- Sintaxe: =PROCV(valor_procurado; matriz_tabela; núm_índice_coluna; [procurar_intervalo])

## Slide 10 — Anatomia dos Argumentos do PROCV

- Entender cada parâmetro evita erros comuns em planilhas de gestão:

- 1

- Valor Procurado: O código ou texto a pesquisar (ex: A2).

- 2

- Matriz Tabela: O intervalo de dados fixado com $ (ex: $F$2:$H$50).

- 3

- Núm Índice Coluna: O número da coluna de retorno (1, 2, 3...).

- 4

- Procurar Intervalo: Use 0 ou FALSO para correspondência exata.

## Slide 11 — A Regra de Ouro do PROCV

- FUNÇÃO DE BUSCA

- O PROCV possui uma limitação estrutural crucial: ele só procura da esquerda para a direita.
- A coluna que contém o código pesquisado precisa obrigatoriamente ser a primeira coluna da matriz selecionada.

- Atenção
- Se o código estiver na coluna C e o preço na coluna B, o PROCV tradicional não funcionará diretamente.

- ⚠️

## Slide 11.1 — PROCV em 300 Itens

- Situação-problema: buscar a descrição e o preço de 300 itens pelo código, sem copiar à mão.

- Aba Cadastro, A2:C301: Código | Descrição | Preço
- Aba Pedido, código em A2:
- Descrição (B2): =PROCV(A2; Cadastro!$A$2:$C$301; 2; 0)
- Preço (C2): =PROCV(A2; Cadastro!$A$2:$C$301; 3; 0)
- Arraste até a linha 301: os 300 itens são preenchidos em segundos.

- 🔑
- Ponto-chave
- O $ trava a tabela de busca; sem ele, o intervalo "anda" e os últimos itens retornam #N/D.

## Slide 12 — Verificação: Argumentos do PROCV

- Na fórmula =PROCV(A2; D2:G20; 3; FALSO), o que o número 3 representa?

- 1.

- O número da coluna de onde será extraído o resultado

- 2.

- A linha exata onde está o valor procurado

- 3.

- A quantidade de resultados repetidos a encontrar

- 4.

- O número de colunas puladas antes de iniciar a busca

## Slide 13 — Verificação: Argumentos do PROCV

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

## Slide 14 — PROCH: Pesquisa Horizontal

- FUNÇÃO DE BUSCA

- Quando a base está disposta em linhas em vez de colunas, utilizamos o PROCH (Procura Horizontal).
- Ele busca a chave na primeira linha da matriz e desce até a linha indicada para retornar a informação correspondente.

- Exemplo
- Tabelas de alíquotas com meses no cabeçalho horizontal: =PROCH("Março"; B1:M5; 3; 0)

- 🔍

## Slide 15 — Comparando PROCV e PROCH

- PROCV (Vertical)
- Ideal para listas convencionais onde cada linha é um registro e cada coluna é um campo descritivo.

- PROCH (Horizontal)
- Utilizado em matrizes gerenciais com períodos (meses, trimestres) organizados lado a lado no topo.

## Slide 16 — ÍNDICE e CORRESP: A Dupla Dinâmica

- BUSCA FLEXÍVEL

- Para superar as limitações do PROCV, combinamos duas funções independentes e poderosas:
- CORRESPONDÊNCIA: localiza a posição numérica de um item.
- ÍNDICE: extrai o conteúdo de uma coordenada exata.

- Ponto-chave
- Essa combinação permite pesquisar para a esquerda e em matrizes bidirecionais.

- 🔑

## Slide 17 — Mecanismo da Função CORRESP

- A função CORRESPONDÊNCIA (ou CORRESP) não traz o preço ou o nome; ela informa em qual posição da lista o item está localizado.

- 🔍

- Exemplo
- Sintaxe: =CORRESP(valor_procurado; matriz_pesquisada; [tipo_correspondência])

- Se a lista de fornecedores em A2:A5 for ["Alfa", "Beta", "Cometa", "Delta"], a fórmula =CORRESP("Cometa"; A2:A5; 0) retorna exatamente o número 3.

## Slide 18 — Mecanismo da Função ÍNDICE

- BUSCA FLEXÍVEL

- A função ÍNDICE funciona como um sistema de GPS na planilha. Dado um intervalo e um número de linha, ela entrega o dado gravado naquela célula.

- 🧠

- Lembre-se
- Fórmula combinada: =ÍNDICE(coluna_resultado; CORRESP(chave; coluna_chave; 0))

## Slide 19 — Ordem: Montagem do ÍNDICE + CORRESP

- Ordene as etapas lógicas para montar a busca combinada bidirecional no Excel:

- Identificar a coluna onde está o resultado final desejado

- Definir tipo de correspondência exata 0 no final do CORRESP

- Escrever a função ÍNDICE selecionando o intervalo do resultado

- Inserir a função CORRESP no argumento de número da linha

## Slide 20 — Ordem: Montagem do ÍNDICE + CORRESP

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

## Slide 21 — Vídeo Tutorial: Buscas Avançadas

- Compare PROCV e ÍNDICE+CORRESP em bases reais:

## Slide 22 — Prevenção de Erros com SEERRO

- TRATAMENTO DE DADOS

- Quando uma busca não encontra o código, o Excel exibe o temido erro #N/D (Não Disponível). Isso polui relatórios e quebra somas subsequentes.

- ⚠️

- Atenção
- Planilhas profissionais nunca devem expor códigos de erro ao tomador de decisão.

## Slide 23 — Aplicando a Função SEERRO

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

## Slide 23.1 — Por que o PROCV Retorna #N/D?

- Código com espaço extra ("MAT-001 "): limpe com =ARRUMAR(A2).
- Número salvo como texto (triângulo verde na célula): converta para número ou use =VALOR(A2).
- Código realmente inexistente: trate com SEERRO e revise o cadastro.
- Último argumento esquecido: sem o 0, a busca é aproximada e pode trazer o item errado.

- 🧠
- Lembre-se
- Confira o tipo antes de culpar a fórmula: =ÉTEXTO(A2) retorna VERDADEIRO se o código estiver como texto.

## Slide 24 — Verificação: Uso do SEERRO

- A função SEERRO impede que uma busca com PROCV procure o dado na planilha.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

## Slide 25 — Verificação: Uso do SEERRO

- ✅

- A função SEERRO impede que uma busca com PROCV procure o dado na planilha.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- O SEERRO executa o cálculo normal e só age se houver falha na fórmula.

- 🔑

## Slide 26 — Lógica Condicional: SE Aninhado

- LÓGICA CONDICIONAL

- Um único SE testa apenas duas saídas (Verdadeiro ou Falso). Para classificar três ou mais cenários, colocamos uma função SE dentro de outra.

- 🔍

- Exemplo
- Faixas de desconto de um fornecedor:
- Pedido de compra ≥ R$ 10.000: 15%
- Pedido de compra ≥ R$ 5.000: 10%
- Outros valores: 0%

## Slide 27 — Construindo o SE Aninhado

- Veja a sintaxe estruturada para classificar a situação do estoque:
- =SE(D2<10; "Crítico"; SE(D2<=30; "Atenção"; "Normal"))

- 🧠

- Lembre-se
- Sempre ordene os testes em sequência lógica (do maior para o menor) para que as condições não se anulem.

## Slide 28 — Agregação: Função CONT.SE

- AGREGAÇÃO DE DADOS

- A função CONT.SE conta quantas células atendem a um critério específico pré-estabelecido.
- Ela evita contagens manuais propensas a erros em cadastros volumosos.

- 🧠

- Lembre-se
- Sintaxe: =CONT.SE(intervalo; critérios)
- Exemplo: =CONT.SE(C2:C100; "Concluído")

## Slide 29 — Exemplos de Critérios no CONT.SE

- Critérios do CONT.SE aceitam textos e operadores matemáticos:

- Texto Exato: =CONT.SE(C:C; "EPI") conta itens da categoria EPI.

- Maior que Zero: =CONT.SE(D:D; ">0") conta itens com saldo.

- Acima da Média: =CONT.SE(E:E; ">"&MÉDIA(E:E)) localiza pedidos grandes.

- Diferente de Vazio: =CONT.SE(B:B; "<>") conta cadastros preenchidos.

## Slide 30 — Consolidação: Função SOMASE

- AGREGAÇÃO DE DADOS

- A função SOMASE soma valores numéricos apenas das linhas que atendem a uma condição determinada.
- É a base para demonstrativos financeiros e relatórios de vendas por filial.

- 🧠

- Lembre-se
- Sintaxe: =SOMASE(intervalo_critério; critérios; [intervalo_soma])

## Slide 31 — Comparando CONT.SE e SOMASE

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

## Slide 32 — Casos Práticos no Mercado

- Grandes redes varejistas utilizam exatamente essas funções para cruzar cadastros de clientes com cupons fiscais diariamente.

## Slide 33 — Prática 1: Cruzando Cadastros

- Para preencher o Preço_Unit na célula D2:
- =SEERRO(PROCV(B2; 'Base Produtos'!$G:$I; 3; 0); 0)
- Esta fórmula busca o ID_Produto (B2) na base de produtos, retornando a coluna 3 (Preço_Tabela). O parâmetro 0 garante busca exata, e SEERRO retorna 0 caso não encontre o item.

## Slide 34 — Solução: Prática 1

- ESTUDO DE CASO

- Análise da Fórmula
- A solução profissional combina a busca exata com o tratamento preventivo de dados:
- PROCV(...; 3; 0): o 0 (FALSO) força a busca exata do código.
- SEERRO(...; 0): devolve 0 quando o código não existe, sem quebrar os totais.

- 🔑

- Ponto-chave
- Retornar 0 em vez de texto permite que a coluna Total (=C2*D2) continue calculando sem quebrar a planilha.

## Slide 35 — Prática 2: Análise por Categoria

- Almoxarifado central: análise de requisições por categoria
- Coluna C: Categoria | Coluna E: Valor Total
- Contar requisições de "EPI":
- =CONT.SE(C:C; "EPI")
- Valor total gasto com "Ferramentas":
- =SOMASE(C:C; "Ferramentas"; E:E)

## Slide 36 — Solução: Prática 2

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

## Slide 37 — Discussão: PROCV ou ÍNDICE?

- Em que situações em um ambiente empresarial você recomendaria abandonar o PROCV e adotar definitivamente a dupla ÍNDICE + CORRESPONDÊNCIA?

## Slide 38 — Discussão: PROCV ou ÍNDICE?

- ✅

- Você poderia ter dito...
- Quando a coluna pesquisada estiver à direita do resultado.
- Em bases grandes, onde inserir colunas quebra o índice do PROCV.
- Para consultas bidirecionais em linhas e colunas.
- Para maior velocidade em planilhas com milhares de linhas.

## Slide 39 — Prática 3: Relatório Gerencial

- Você é responsável pelo fechamento mensal:
- Base de estoque em A2:D100 (Cód, Item, Categoria, Saldo).
- Na tabela resumo, use SE na coluna 'Status':
- Saldo < 10: "Crítico"
- Saldo <= 30: "Atenção"
- Saldo > 30: "Normal"
- Calcule o total "Crítico" com CONT.SE.

## Slide 40 — Síntese e Próxima Aula

- ENCERRAMENTO

- Habilidades Conquistadas
- Hoje você aprendeu a cruzar dados com segurança, tratar erros de buscas e criar métricas de agregação condicionais para relatórios gerenciais.
- No arquivo 6, ainda na Aula 3, avançaremos para Tabelas Dinâmicas e Gráficos Interativos para transformar esses números em painéis executivos!

- 🧠

- Lembre-se
- Pratique as combinações em arquivos reais para fixar a sintaxe dos argumentos.
