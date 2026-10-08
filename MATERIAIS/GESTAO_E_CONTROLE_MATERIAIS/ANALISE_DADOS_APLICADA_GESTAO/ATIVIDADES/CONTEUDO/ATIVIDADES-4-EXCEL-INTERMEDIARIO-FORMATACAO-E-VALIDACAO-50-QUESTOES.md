# Atividade: 4 Excel Intermediário Formatação e Validação — 50 Questões

- **Aula:** 04
- **Rótulo da aula:** Aula 04
- **Tema:** 4 Excel Intermediário Formatação e Validação
- **Ícone:** 🎨
- **Duração:** 100 minutos
- **Formato:** Múltipla escolha (A, B, C, D, E)
- **Total de questões:** 50
- **Pontuação:** 1 ponto por questão correta (total: 50 pontos; nota de 0 a 10)
- **Capacidade avaliada:** Formatar números, moedas, percentuais e datas; Aplicar formatação condicional com regras e fórmulas; Estilizar tabelas com clareza; Congelar painéis; Criar validação de dados e listas suspensas; Configurar mensagens e alertas de erro; Proteger células, planilhas e a estrutura da pasta; Usar filtros e ordenação
- **Conteúdo-base:** `CONTEUDO/4-Excel-Intermediário-Formatação-e-Validação.md`
- **Slides:** `—`
- **Folha de respostas:** sim
- **Exportar PDF com gabarito:** sim
- **Turma:** AI AIAC 2026/2 V1 (133933)

> Fonte única desta atividade. A linha **Gabarito** NÃO é publicada (arquivo no .gitignore);
> o gabarito fica só na tabela `gabarito` do banco.

---

## ITEM 01 — Reconhecer o conceito de validação de dados

- **Capacidade:** C1

**Contexto:**  
No almoxarifado da Indústria Serra Azul (empresa fictícia), vários auxiliares lançam requisições na mesma planilha e os erros de digitação são frequentes.

**Comando:**  
O que é a validação de dados?

**Alternativas:**
- A) Um recurso que muda a cor das células conforme o valor
- B) Um recurso que esconde as fórmulas
- C) Regras que controlam e padronizam o que pode ser digitado nas células
- D) Um tipo de gráfico
- E) Um backup automático da planilha

**Gabarito:** C

---

## ITEM 02 — Reconhecer o que a formatação faz

- **Capacidade:** C1

**Contexto:**  
A célula H2 guarda o número 1500,5. Depois de formatada como Moeda, ela mostra R$ 1.500,50.

**Comando:**  
O que aconteceu com o valor armazenado?

**Alternativas:**
- A) Virou texto
- B) Foi arredondado para 1.501
- C) Foi multiplicado por 100
- D) Continua exatamente 1500,5; mudou só a forma de exibir
- E) Perdeu as casas decimais

**Gabarito:** D

---

## ITEM 03 — Revisar a referência absoluta

- **Capacidade:** C1

**Contexto:**  
Na planilha de custos, a fórmula =B2*$B$4 foi copiada para várias linhas.

**Comando:**  
Qual é a finalidade do cifrão em $B$4?

**Alternativas:**
- A) Travar a célula para que ela não mude ao copiar a fórmula
- B) Proteger a planilha contra visualização
- C) Converter o valor para Real
- D) Indicar que a célula tem um desconto
- E) Esconder a célula

**Gabarito:** A

---

## ITEM 04 — Evitar digitar o símbolo da moeda

- **Capacidade:** C1

**Contexto:**  
Um auxiliar digitou R$ 45,90 diretamente na célula do custo unitário. A fórmula de custo em estoque dessa linha passou a mostrar #VALOR!.

**Comando:**  
Qual é a causa?

**Alternativas:**
- A) O Excel não aceita centavos
- B) Digitar "R$" dentro da célula transforma o número em texto, e as fórmulas não fazem contas com texto
- C) Faltou o cifrão na referência
- D) A célula estava protegida
- E) A coluna estava congelada

**Gabarito:** B

---

## ITEM 05 — Reconhecer datas como números

- **Capacidade:** C1

**Contexto:**  
Para o Excel, toda data é um número sequencial de dias. O número 46000 corresponde a 09/12/2025.

**Comando:**  
Qual data o Excel mostra para o número 46030 no formato Data Abreviada?

**Alternativas:**
- A) 09/12/2055
- B) 10/12/2025
- C) 09/01/2025
- D) 30/12/2025
- E) 08/01/2026

**Gabarito:** E

---

## ITEM 06 — Calcular vencimentos com datas

- **Capacidade:** C1

**Contexto:**  
A nota fiscal de compra foi recebida na data que está em B2, com pagamento em 30 dias.

**Comando:**  
Qual fórmula calcula a data de vencimento?

**Alternativas:**
- A) =B2+30
- B) =B2*30
- C) =B2&"30"
- D) =30/B2
- E) =DATA(30)

**Gabarito:** A

---

## ITEM 07 — Diferenciar data abreviada e data completa

- **Capacidade:** C1

**Contexto:**  
O relatório de recebimento mostra a data 09/12/2025. O gerente quer ver também o dia da semana e o mês por extenso.

**Comando:**  
Qual formato atende ao pedido?

**Alternativas:**
- A) Data Abreviada
- B) Porcentagem
- C) Data Completa
- D) Moeda
- E) Texto

**Gabarito:** C

---

## ITEM 08 — Reconhecer a formatação condicional

- **Capacidade:** C1

**Contexto:**  
O comprador quer que os itens com saldo crítico fiquem vermelhos sozinhos, mudando de cor assim que um novo lançamento for feito.

**Comando:**  
Qual recurso faz isso?

**Alternativas:**
- A) Validação de dados
- B) Congelar painéis
- C) Proteger planilha
- D) Preenchimento relâmpago
- E) Formatação condicional

**Gabarito:** E

---

## ITEM 09 — Usar barras de dados

- **Capacidade:** C1

**Contexto:**  
O gerente quer ver, dentro de cada célula da coluna Custo em Estoque, uma barrinha horizontal proporcional ao valor.

**Comando:**  
Qual opção da formatação condicional ele deve usar?

**Alternativas:**
- A) Escalas de cor
- B) Barras de dados
- C) Conjunto de ícones de setas
- D) Realçar valores duplicados
- E) Validação de dados

**Gabarito:** B

---

## ITEM 10 — Usar escalas de cor

- **Capacidade:** C1

**Contexto:**  
Na tabela de consumo por setor, o gerente quer um gradiente de cores do verde (menor consumo) ao vermelho (maior consumo).

**Comando:**  
Qual recurso atende ao pedido?

**Alternativas:**
- A) Escalas de cor
- B) Barras de dados
- C) Bordas duplas
- D) Estilo de célula Título
- E) Lista suspensa

**Gabarito:** A

---

## ITEM 11 — Montar a regra com fórmula do estoque mínimo

- **Capacidade:** C1

**Contexto:**  
O Saldo está na coluna E e o Estoque Mínimo na coluna F. O analista selecionou E2:E200 e vai criar a regra "Usar uma fórmula para determinar quais células devem ser formatadas".

**Comando:**  
Qual fórmula deixa vermelho cada saldo abaixo do próprio mínimo?

**Alternativas:**
- A) =$E$2<$F$2
- B) =E2>F2
- C) =SE(E2<F2)
- D) =$E2<$F2
- E) =E:E<F:F

**Gabarito:** D

---

## ITEM 12 — Entender o cifrão só na coluna

- **Capacidade:** C1

**Contexto:**  
Na regra =$E2<$F2, o cifrão aparece antes das letras das colunas, mas não antes do número da linha.

**Comando:**  
Por que a linha fica sem cifrão?

**Alternativas:**
- A) Para a regra valer só para a linha 2
- B) Para a linha "andar" e cada item ser comparado com o próprio mínimo
- C) Porque o Excel não aceita cifrão em linhas
- D) Para a regra comparar sempre com F2
- E) Para proteger as células

**Gabarito:** B

---

## ITEM 13 — Destacar o texto "Repor"

- **Capacidade:** C1

**Contexto:**  
A coluna Situação usa =SE(E2<F2;"Repor";"OK"). O comprador quer que as células com Repor fiquem vermelhas.

**Comando:**  
Qual regra de formatação condicional é a mais direta?

**Alternativas:**
- A) Barras de dados
- B) Escala de cor de 3 cores
- C) Realçar regras das células → Texto que contém → Repor
- D) Validação de dados → Lista
- E) Proteger planilha

**Gabarito:** C

---

## ITEM 14 — Escolher a fonte de uma tabela profissional

- **Capacidade:** C1

**Contexto:**  
Um relatório de estoque usa cinco fontes diferentes, uma em cada coluna.

**Comando:**  
Qual prática de estilização é recomendada?

**Alternativas:**
- A) Usar uma fonte diferente por coluna para separar os dados
- B) Usar fontes decorativas nos números
- C) Escrever tudo em negrito e itálico
- D) Adotar uma única família de fontes limpa, como Aptos, Segoe UI ou Calibri
- E) Usar tamanho 6 para caber mais dados

**Gabarito:** D

---

## ITEM 15 — Alinhar números corretamente

- **Capacidade:** C1

**Contexto:**  
Afirmação: "Em tabelas corporativas, os números devem ser alinhados à esquerda para facilitar a leitura."

**Comando:**  
A afirmação é verdadeira ou falsa?

**Alternativas:**
- A) Verdadeira, pois lemos da esquerda para a direita
- B) Verdadeira, pois assim os textos e números ficam iguais
- C) Falsa, pois números devem ser centralizados
- D) Falsa, pois o alinhamento não importa
- E) Falsa, pois números ficam à direita para que casas decimais e milhares fiquem emparelhados

**Gabarito:** E

---

## ITEM 16 — Destacar a linha de totais

- **Capacidade:** C1

**Contexto:**  
A última linha do relatório traz os totais gerais de custo em estoque.

**Comando:**  
Qual destaque é recomendado para a linha de totais?

**Alternativas:**
- A) Negrito e borda dupla inferior
- B) Fundo com várias cores fortes
- C) Fonte menor que o restante
- D) Texto em itálico e piscando
- E) Nenhum destaque

**Gabarito:** A

---

## ITEM 17 — Formatar o cabeçalho da tabela

- **Capacidade:** C1

**Contexto:**  
O gerente pediu um cabeçalho com contraste, fácil de distinguir dos dados.

**Comando:**  
Qual formatação segue as boas práticas vistas em aula?

**Alternativas:**
- A) Fundo amarelo-limão com texto branco
- B) Fundo escuro (ex.: azul-marinho) com texto branco e negrito
- C) Fundo branco com texto branco
- D) Cada coluna com uma cor primária diferente
- E) Sem cabeçalho

**Gabarito:** B

---

## ITEM 18 — Evitar a poluição visual

- **Capacidade:** C1

**Contexto:**  
Um relatório usa vermelho, amarelo, verde, rosa e laranja fortes em todas as colunas. O gerente disse que parece um "carnaval".

**Comando:**  
Qual é a correção recomendada?

**Alternativas:**
- A) Acrescentar mais cores para diferenciar tudo
- B) Tirar todas as bordas e cores, inclusive dos alertas
- C) Usar tons neutros (cinza, azul-marinho, grafite) e reservar cores fortes só para exceções e metas
- D) Usar só vermelho
- E) Trocar a fonte

**Gabarito:** C

---

## ITEM 19 — Entender o congelamento de painéis

- **Capacidade:** C1

**Contexto:**  
A planilha de movimentação tem 800 linhas. Ao rolar para baixo, os títulos das colunas somem e o auxiliar se perde.

**Comando:**  
Qual recurso resolve o problema e onde ele fica?

**Alternativas:**
- A) Proteger Planilha, na guia Revisão
- B) Validação de Dados, na guia Dados
- C) Formatação Condicional, na guia Página Inicial
- D) Congelar Painéis, na guia Exibir
- E) Filtro, na guia Inserir

**Gabarito:** D

---

## ITEM 20 — Posicionar o cursor para congelar

- **Capacidade:** C1

**Contexto:**  
O analista quer manter congeladas a linha 1 (cabeçalhos) e a coluna A (código do item) ao mesmo tempo.

**Comando:**  
Em qual célula ele deve clicar antes de usar Congelar Painéis?

**Alternativas:**
- A) A1
- B) A2
- C) B1
- D) C3
- E) B2

**Gabarito:** E

---

## ITEM 21 — Escolher a opção de congelamento

- **Capacidade:** C1

**Contexto:**  
Uma lista de compras tem o cabeçalho só na linha 1 e poucas colunas.

**Comando:**  
Qual é a opção mais rápida?

**Alternativas:**
- A) Congelar Linha Superior
- B) Congelar Primeira Coluna
- C) Proteger Estrutura
- D) Dividir a janela em quatro
- E) Ocultar as linhas

**Gabarito:** A

---

## ITEM 22 — Congelar a primeira coluna

- **Capacidade:** C1

**Contexto:**  
Um orçamento de compras de doze meses tem o nome do material na coluna A e os meses nas colunas B a M. Ao rolar para a direita, o nome do material some.

**Comando:**  
Qual opção mantém o nome do material visível?

**Alternativas:**
- A) Congelar Linha Superior
- B) Congelar Primeira Coluna
- C) Classificar de A a Z
- D) Mesclar e centralizar
- E) Quebrar texto automaticamente

**Gabarito:** B

---

## ITEM 23 — Reconhecer o perigo dos dados inconsistentes

- **Capacidade:** C1

**Contexto:**  
Na coluna Fornecedor, um auxiliar digitou "Aço Sul", outro "Aco Sul" e um terceiro "AÇO SUL LTDA". O SOMASE por fornecedor passou a dar valores menores que o real.

**Comando:**  
Qual é a causa do problema?

**Alternativas:**
- A) A função SOMASE não funciona com textos
- B) A planilha está protegida
- C) Faltou congelar os painéis
- D) Digitações diferentes do mesmo fornecedor são tratadas como fornecedores diferentes
- E) O formato da coluna está como Moeda

**Gabarito:** D

---

## ITEM 24 — Validar números em uma faixa

- **Capacidade:** C1

**Contexto:**  
A quantidade requisitada deve ser um número inteiro de 1 a 500.

**Comando:**  
Qual configuração de validação atende à regra?

**Alternativas:**
- A) Permitir: Lista; Fonte: 1;500
- B) Permitir: Número inteiro; Dados: está entre; Mínimo 1 e Máximo 500
- C) Permitir: Data; entre 1 e 500
- D) Permitir: Comprimento do texto igual a 500
- E) Permitir: Qualquer valor

**Gabarito:** B

---

## ITEM 25 — Validar o tamanho de um texto

- **Capacidade:** C1

**Contexto:**  
O CNPJ dos fornecedores deve ter exatamente 14 dígitos, digitados sem pontos.

**Comando:**  
Qual opção de validação limita o tamanho do que é digitado?

**Alternativas:**
- A) Permitir: Lista
- B) Permitir: Data
- C) Permitir: Decimal maior que 14
- D) Permitir: Número inteiro entre 1 e 14
- E) Permitir: Comprimento do texto igual a 14

**Gabarito:** E

---

## ITEM 26 — Diferenciar mensagem de entrada e alerta de erro

- **Capacidade:** C1

**Contexto:**  
O analista quer que, ao clicar na célula, apareça a orientação "Digite de 1 a 500" e que, se o valor estiver fora da faixa, a gravação seja impedida.

**Comando:**  
Quais abas da janela de validação ele deve usar, nessa ordem?

**Alternativas:**
- A) Mensagem de Entrada e Alerta de Erro
- B) Alerta de Erro e Mensagem de Entrada
- C) Configurações e Proteção
- D) Fonte e Borda
- E) Número e Alinhamento

**Gabarito:** A

---

## ITEM 27 — Escolher o estilo do alerta de erro

- **Capacidade:** C1

**Contexto:**  
O supervisor quer que um código inexistente NUNCA seja aceito, sem opção de continuar mesmo assim.

**Comando:**  
Qual estilo de alerta de erro deve ser usado?

**Alternativas:**
- A) Informações
- B) Aviso
- C) Parar
- D) Nenhum
- E) Mensagem de entrada

**Gabarito:** C

---

## ITEM 28 — Criar a lista suspensa com opções digitadas

- **Capacidade:** C1

**Contexto:**  
A coluna Código deve aceitar só MAT-001, MAT-002 e MAT-003, escolhidos com um clique.

**Comando:**  
Como preencher a fonte da lista?

**Alternativas:**
- A) MAT-001 MAT-002 MAT-003
- B) MAT-001:MAT-003
- C) "MAT-001"+"MAT-002"+"MAT-003"
- D) MAT-001;MAT-002;MAT-003
- E) =MAT-001

**Gabarito:** D

---

## ITEM 29 — Vincular a lista suspensa ao cadastro

- **Capacidade:** C1

**Contexto:**  
Os códigos válidos estão na aba Cadastro, em A2:A300. A coluna Código da aba Movimentação deve usar esses códigos.

**Comando:**  
Qual fonte deve ser informada na validação (Permitir: Lista)?

**Alternativas:**
- A) Cadastro A2 até A300
- B) =Cadastro!$A$2:$A$300
- C) =Movimentação!A2:A300
- D) =SOMA(Cadastro!A2:A300)
- E) =Cadastro!A:A300

**Gabarito:** B

---

## ITEM 30 — Reconhecer o benefício da lista suspensa

- **Capacidade:** C1

**Contexto:**  
Depois da lista suspensa, os auxiliares passaram a escolher o código com o mouse.

**Comando:**  
Qual é o principal benefício?

**Alternativas:**
- A) A planilha fica mais colorida
- B) As fórmulas ficam protegidas
- C) As datas são convertidas
- D) O arquivo fica menor
- E) Acabam os erros de digitação no campo, pois só códigos válidos são aceitos

**Gabarito:** E

---

## ITEM 31 — Ligar a validação ao PROCV da próxima aula

- **Capacidade:** C1

**Contexto:**  
Na Aula 3, o PROCV vai buscar a descrição de cada item pelo código digitado na Movimentação.

**Comando:**  
Por que validar o código na entrada ajuda o PROCV?

**Alternativas:**
- A) Evita o erro #N/D causado por código digitado errado ou inexistente
- B) Faz o PROCV procurar para a esquerda
- C) Dispensa o último argumento do PROCV
- D) Transforma o código em número
- E) Não tem relação com o PROCV

**Gabarito:** A

---

## ITEM 32 — Ordenar a criação da lista suspensa

- **Capacidade:** C1

**Contexto:**  
Os passos para criar a lista são: acessar Dados → Validação de Dados; digitar os itens na Fonte; selecionar as células; mudar Permitir para Lista.

**Comando:**  
Qual é a ordem correta?

**Alternativas:**
- A) Digitar a Fonte; selecionar as células; Permitir: Lista; Validação de Dados
- B) Permitir: Lista; selecionar as células; digitar a Fonte; Validação de Dados
- C) Selecionar as células; Dados → Validação de Dados; Permitir: Lista; digitar a Fonte
- D) Validação de Dados; digitar a Fonte; Permitir: Lista; selecionar as células
- E) Selecionar as células; digitar a Fonte; Permitir: Lista; Validação de Dados

**Gabarito:** C

---

## ITEM 33 — Entender o objetivo da proteção

- **Capacidade:** C1

**Contexto:**  
Um usuário apagou sem querer a fórmula de custo em estoque e ninguém percebeu por uma semana.

**Comando:**  
Qual é o objetivo da proteção de planilha?

**Alternativas:**
- A) Impedir que alguém abra o arquivo
- B) Preservar as fórmulas sem impedir o lançamento de novos dados nas células liberadas
- C) Deixar todas as células editáveis
- D) Colorir as fórmulas
- E) Apagar os dados antigos

**Gabarito:** B

---

## ITEM 34 — Reconhecer o estado padrão das células

- **Capacidade:** C1

**Contexto:**  
O analista vai proteger a planilha pela primeira vez.

**Comando:**  
Como estão as células por padrão, antes de qualquer ajuste?

**Alternativas:**
- A) Todas desbloqueadas
- B) Só as fórmulas bloqueadas
- C) Só os cabeçalhos bloqueados
- D) Todas marcadas como Bloqueadas
- E) Todas ocultas

**Gabarito:** D

---

## ITEM 35 — Destravar as células de entrada

- **Capacidade:** C1

**Contexto:**  
As quantidades e os preços devem continuar editáveis depois da proteção.

**Comando:**  
O que o analista deve fazer com essas células ANTES de proteger?

**Alternativas:**
- A) Apagar o conteúdo
- B) Aplicar formatação condicional
- C) Ocultar as colunas
- D) Congelar os painéis
- E) Em Formatar Células (Ctrl+1), aba Proteção, desmarcar Bloqueadas

**Gabarito:** E

---

## ITEM 36 — Ativar a proteção da planilha

- **Capacidade:** C1

**Contexto:**  
As células de entrada já foram destravadas.

**Comando:**  
Onde o analista ativa a proteção da aba?

**Alternativas:**
- A) Guia Revisão → Proteger Planilha
- B) Guia Exibir → Congelar Painéis
- C) Guia Dados → Filtro
- D) Guia Inserir → Tabela
- E) Guia Fórmulas → Mostrar Fórmulas

**Gabarito:** A

---

## ITEM 37 — Prever o efeito de proteger sem destravar

- **Capacidade:** C1

**Contexto:**  
Um analista protegeu a planilha de requisições sem destravar nenhuma célula.

**Comando:**  
O que acontece com os colegas que lançam requisições?

**Alternativas:**
- A) Continuam lançando normalmente
- B) Só conseguem editar as fórmulas
- C) Não conseguem digitar em nenhuma célula até alguém desproteger a planilha
- D) O Excel destrava as células sozinho
- E) Os dados antigos são apagados

**Gabarito:** C

---

## ITEM 38 — Proteger a estrutura da pasta

- **Capacidade:** C1

**Contexto:**  
O gerente quer impedir que alguém exclua, renomeie ou adicione abas no arquivo de estoque.

**Comando:**  
Qual recurso atende ao pedido?

**Alternativas:**
- A) Proteger Planilha
- B) Congelar Painéis
- C) Validação de Dados
- D) Proteger Estrutura da Pasta de Trabalho
- E) Formatação Condicional

**Gabarito:** D

---

## ITEM 39 — Entender o uso da senha na proteção

- **Capacidade:** C1

**Contexto:**  
Na prática da aula, a planilha foi protegida com a senha gestao2026.

**Comando:**  
Para que serve a senha?

**Alternativas:**
- A) Para abrir o arquivo
- B) Para impedir que a proteção seja desativada por quem não está autorizado
- C) Para criptografar os dados na internet
- D) Para liberar a validação de dados
- E) Para congelar os painéis

**Gabarito:** B

---

## ITEM 40 — Ordenar a proteção das fórmulas

- **Capacidade:** C1

**Contexto:**  
O supervisor quer que os usuários editem só as células de entrada e que as fórmulas fiquem protegidas.

**Comando:**  
Qual é a ordem correta?

**Alternativas:**
- A) Proteger a planilha e depois apagar as fórmulas editáveis
- B) Pintar de vermelho as células que não podem ser alteradas
- C) Colocar senha no arquivo e ocultar as colunas com cálculos
- D) Congelar a linha 1 e ativar o filtro
- E) Destravar as células de entrada em Formatar Células e depois ativar Proteger Planilha

**Gabarito:** E

---

## ITEM 41 — Ativar o filtro automático

- **Capacidade:** C1

**Contexto:**  
O comprador quer ver apenas os itens de um fornecedor na planilha de 800 linhas, sem apagar os outros.

**Comando:**  
Qual atalho ativa ou desativa o AutoFiltro?

**Alternativas:**
- A) Ctrl+Shift+L
- B) Ctrl+E
- C) F4
- D) Ctrl+1
- E) Alt+F5

**Gabarito:** A

---

## ITEM 42 — Usar filtros de número

- **Capacidade:** C1

**Contexto:**  
O gerente quer ver somente os itens com custo em estoque maior que R$ 1.000.

**Comando:**  
Qual recurso do AutoFiltro atende ao pedido?

**Alternativas:**
- A) Filtros de Texto → Começa com
- B) Classificar de A a Z
- C) Filtros de Número → É Maior do que → 1000
- D) Validação de Dados
- E) Congelar Painéis

**Gabarito:** C

---

## ITEM 43 — Entender o que o filtro faz com os dados

- **Capacidade:** C1

**Contexto:**  
Depois de filtrar pelo fornecedor "Aço Sul", só 40 das 800 linhas aparecem.

**Comando:**  
O que aconteceu com as outras linhas?

**Alternativas:**
- A) Foram excluídas
- B) Foram movidas para outra aba
- C) Foram protegidas
- D) Estão apenas ocultas pelo filtro e voltam ao limpar o filtro
- E) Foram convertidas em texto

**Gabarito:** D

---

## ITEM 44 — Ordenar dados pelo filtro

- **Capacidade:** C1

**Contexto:**  
O comprador quer ver os itens do maior para o menor custo em estoque.

**Comando:**  
Qual opção ele deve usar na seta do cabeçalho da coluna de custo?

**Alternativas:**
- A) Classificar do Menor para o Maior
- B) Classificar do Maior para o Menor
- C) Filtros de Texto
- D) Limpar Filtro
- E) Congelar Painéis

**Gabarito:** B

---

## ITEM 45 — Aplicar o formato de data na prática

- **Capacidade:** C1

**Contexto:**  
Na prática do relatório de estoque, as datas de entrada aparecem como 46000, 46012 e 46025.

**Comando:**  
O que fazer para que apareçam como datas?

**Alternativas:**
- A) Redigitar todas as datas como texto
- B) Multiplicar por 30
- C) Aplicar o formato Data Abreviada
- D) Aplicar o formato Porcentagem
- E) Apagar a coluna

**Gabarito:** C

---

## ITEM 46 — Montar a formatação condicional com dois alertas

- **Capacidade:** C1

**Contexto:**  
Na prática 1, o saldo deve ficar vermelho quando estiver abaixo do mínimo e verde quando estiver acima dele.

**Comando:**  
Como isso é feito?

**Alternativas:**
- A) Com uma única regra que usa duas cores ao mesmo tempo
- B) Com validação de dados
- C) Pintando as células à mão
- D) Com Congelar Painéis
- E) Com duas regras: =$E2<$F2 em vermelho e =$E2>$F2 em verde

**Gabarito:** E

---

## ITEM 47 — Configurar o formulário com validação

- **Capacidade:** C1

**Contexto:**  
Na prática 2, a quantidade deve ser inteira de 1 a 500, com alerta "Parar", título Quantidade Inválida e mensagem "Use 1 a 500".

**Comando:**  
O que acontece se o auxiliar digitar 650?

**Alternativas:**
- A) O Excel aceita e pinta de vermelho
- B) O Excel arredonda para 500
- C) O Excel mostra o alerta e não aceita o valor
- D) O Excel aceita, mas mostra uma mensagem de entrada
- E) O Excel apaga a planilha

**Gabarito:** C

---

## ITEM 48 — Testar o bloqueio estratégico

- **Capacidade:** C1

**Contexto:**  
Na prática 3, quantidades e preços foram destravados e a planilha foi protegida. O auxiliar tenta editar a fórmula de custo em estoque.

**Comando:**  
O que acontece?

**Alternativas:**
- A) O Excel mostra um aviso de que a célula está protegida
- B) A fórmula é alterada normalmente
- C) A planilha é desprotegida sozinha
- D) A fórmula é apagada
- E) As quantidades ficam bloqueadas

**Gabarito:** A

---

## ITEM 49 — Relacionar os recursos à confiabilidade

- **Capacidade:** C1

**Contexto:**  
Na síntese da aula, os recursos foram divididos em "comunicação visual" e "confiabilidade operacional".

**Comando:**  
Qual grupo de recursos pertence à CONFIABILIDADE OPERACIONAL?

**Alternativas:**
- A) Formatação de moeda, datas e cores
- B) Barras de dados e escalas de cor
- C) Fontes, bordas e alinhamento
- D) Validação de dados, proteção de fórmulas e filtros
- E) Congelar painéis e cores de cabeçalho

**Gabarito:** D

---

## ITEM 50 — Equilibrar segurança e facilidade

- **Capacidade:** C1

**Contexto:**  
Um analista quer "travar tudo com senha" para ninguém mexer na planilha de requisições usada por toda a equipe.

**Comando:**  
Qual é o risco desse plano?

**Alternativas:**
- A) Nenhum, pois proteção total é sempre melhor
- B) As fórmulas deixam de calcular
- C) A equipe não consegue lançar as requisições do dia se as células de entrada não forem destravadas
- D) O arquivo não pode mais ser salvo
- E) As datas viram números

**Gabarito:** C

---
