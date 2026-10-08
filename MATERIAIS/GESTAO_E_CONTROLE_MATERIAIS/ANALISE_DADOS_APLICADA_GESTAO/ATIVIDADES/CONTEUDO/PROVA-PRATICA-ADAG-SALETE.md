# Atividade: Prova Prática ADAG — 20 Questões Discursivas (Aulas 01 a 07)

- **Aula:** AV-PR-06-10
- **Rótulo da aula:** Prova Prática 06-10-2026
- **Tema:** Aulas 01 a 07
- **Ícone:** ✍️
- **Duração:** 180–220 minutos
- **Formato:** Discursiva estruturada (o aluno digita a resposta de cada tópico no sistema)
- **Total de questões:** 20
- **Pontuação:** 0,5 ponto por questão, dividido em 3 tópicos (0,1 + 0,2 + 0,2) — total: 10 pontos
- **Pontos por questão:** 0,5
- **Página:** PROVA-PRATICA-06-10-2026.html
- **Bloquear colar:** sim
- **Capacidade avaliada:** Aplicar, por escrito e em situações reais de um almoxarifado, 100% dos conteúdos das aulas 01 a 07 (pasta `CONTEUDO/`): conjuntos numéricos, custo unitário, razão, proporção, regra de três simples (direta e inversa) e composta, conversão de unidades, área, volume e peso; porcentagem (variação, margem, porcentagem sobre porcentagem, formação de preço), média, mediana, moda, tabela de frequência, amplitude, variância e desvio padrão, PA e PG; interface, tipos de dados, operadores, precedência, referências relativas e absolutas, alça e preenchimento relâmpago, SOMA, MÉDIA, CONT.NÚM, CONT.VALORES, MÁXIMO, MÍNIMO e SE; formatos de número e data, formatação condicional, escalas de cor e barras de dados, congelar painéis, validação de dados, filtros, proteção de planilha e de pasta; PROCV, PROCH, SEERRO, ÍNDICE + CORRESP, SE aninhado, CONT.SE e SOMASE; tabela dinâmica, agrupamento, campo calculado, segmentação, linha do tempo, gráficos dinâmicos e combinados; KPIs, dashboard e storytelling com dados.
- **Correção:** as respostas ficam gravadas no banco e são corrigidas depois: a IA sugere a nota de cada tópico pelo padrão de resposta (`PROVA-PRATICA-ADAG-SALETE-GABARITO.md`, fora do Git) e o professor confirma ou ajusta.
- **Folha de respostas:** sim
- **Turma:** AI AIAC 2026/2 V1 (133933)
- **Aula no banco:** 4
- **Origem:** união da Prova Prática (id 37, marcada **[P1]**) com a Prova Prática 06-10-2026 (id 82, marcada **[P2]**), revisada para 20 questões que cobrem todas as aulas; questões ou tópicos novos marcados **[N]**. Fica só a prova id 82; a id 37 será excluída do banco.

**Empresa fictícia de todas as questões:** Almoxarifado da Distribuidora Vale Sul Embalagens — recebe, confere, guarda e entrega EPIs, ferramentas e embalagens para as filiais da empresa.

**Como responder:** Cada questão tem **3 tópicos**, e cada tópico tem o **seu campo**. Responda **somente o que o tópico pede**, nesta ordem: **(1)** a conta montada ou a fórmula do Excel escrita por inteiro (começando com `=`); **(2)** o resultado com a unidade (kg, m³, L, %, R$, dias...); **(3)** uma frase curta de justificativa quando o tópico pedir "explique" ou "justifique". Não precisa de texto longo, mas o raciocínio tem de aparecer. Respostas copiadas da internet ou de colegas recebem nota zero no tópico.

**Como a correção funciona:** cada tópico é comparado com o padrão de resposta do professor: conta ou fórmula certa, resultado certo e justificativa com as palavras-chave do conteúdo. Arredondamentos com duas casas decimais são aceitos. Nas fórmulas, vale `;` ou `,` como separador e o nome da função com ou sem acento (MÉDIA ou MEDIA). Erros de português não tiram nota se a ideia estiver clara.

## Cobertura das aulas

| Aula (arquivo em `CONTEUDO/`) | Questões | Conteúdos cobertos |
|---|---|---|
| 01 · Matemática Aplicada à Gestão | 01, 02, 03 | conjuntos numéricos, custo unitário, razão e proporção, regra de três direta, inversa e composta, conversão de unidades, área, volume, peso e arranjo |
| 02 · Fundamentos Matemáticos para Gestão | 04, 05, 06 | variação percentual, margem, formação de preço, porcentagem sobre porcentagem, PA e PG, média, mediana, moda, tabela de frequência, amplitude, variância, desvio padrão |
| 03 · Excel Básico: Interface e Fórmulas | 07, 08, 09 | tipos de dados, operadores e precedência, referências relativas e absolutas, alça e preenchimento relâmpago, SOMA, MÉDIA, CONT.NÚM, CONT.VALORES, MÁXIMO, MÍNIMO, SE e operadores de comparação |
| 04 · Excel Intermediário: Formatação e Validação | 10, 11, 12 | formatos de moeda, porcentagem e data, formatação condicional, escalas de cor e barras de dados, congelar painéis (3 opções), validação por lista e por número, filtro, ordenação, proteção de planilha e de pasta |
| 05 · Excel Avançado: Funções Complexas e Busca | 13, 14, 15 | PROCV, SEERRO e causas do #N/D, PROCH, ÍNDICE + CORRESP, SE aninhado, CONT.SE com critérios, SOMASE |
| 06 · Excel Avançado: Tabelas Dinâmicas e Gráficos | 16, 17, 18 | requisitos da base, quadrantes, agrupamento de datas, % do total, atualização, resumir valores por, campo calculado, filtro dos 10 primeiros, linha do tempo, tipos de gráfico, gráfico combinado, segmentação e conexões, proteção do relatório |
| 07 · Dashboards Interativos e Integração de Dados | 19, 20 | KPIs (giro, ruptura, custo, cobertura), meta e semáforo, storytelling, três abas, ordem de construção, padrão em Z, cartões, cores, limpeza da interface |

---

## ITEM 01 — Razão, Proporção, Regra de Três Direta e Compra em Caixas

- **Aula:** 01 · Matemática Aplicada à Gestão
- **Capacidade:** C2
- **Origem:** [P1] + [N]

**Contexto:**
O almoxarifado entregou 900 rolos de fita adesiva para a expedição em 6 dias. O comprador precisa fazer o pedido para os próximos 30 dias. O fornecedor atual só vende em caixas fechadas com 40 rolos cada, e cada caixa custa R$ 96,00. Um segundo fornecedor oferece caixas de 60 rolos por R$ 138,00.

**Comando:**
Calcule a compra usando regra de três e explique cada etapa.

**Tópicos:**
- a) Diga se as grandezas "rolos" e "dias" são diretamente ou inversamente proporcionais e monte a regra de três (a proporção entre as duas razões). (0,1)
- b) Calcule quantos rolos serão consumidos em 30 dias e quantas caixas do fornecedor atual devem ser compradas, mostrando as contas; explique o que fazer quando a divisão não dá um número exato e a que conjunto numérico pertence a quantidade de caixas. (0,2)
- c) Calcule o custo unitário (preço por rolo) de cada fornecedor, diga qual é mais barato e quanto a empresa economiza nos 4.500 rolos escolhendo o mais barato; faça uma estimativa para conferir se o resultado faz sentido. (0,2)

---

## ITEM 02 — Regra de Três Simples Inversa e Composta na Conferência

- **Aula:** 01 · Matemática Aplicada à Gestão
- **Capacidade:** C2
- **Origem:** [P2]

**Contexto:**
No almoxarifado, 5 conferentes de mesma produtividade recebem e conferem um lote de 600 volumes em 6 horas. Na próxima semana, chegará um lote de 1.200 volumes que precisa estar conferido em 4 horas, e o supervisor quer saber o tamanho da equipe.

**Comando:**
Resolva as regras de três e mostre a classificação de cada grandeza.

**Tópicos:**
- a) Se o lote de 600 volumes fosse conferido por 10 conferentes, em quantas horas ficaria pronto? Diga se "conferentes" e "horas" são grandezas diretamente ou inversamente proporcionais e mostre a conta. (0,1)
- b) Monte a regra de três composta para o lote de 1.200 volumes em 4 horas: classifique "volumes" e "horas" em relação a "conferentes" (direta ou inversa), mostre a conta e dê o número de conferentes. (0,2)
- c) Diga quantos conferentes precisam ser acrescentados à equipe atual de 5 e faça a prova real comparando a produtividade (volumes por conferente por hora) da situação atual com a da nova situação. (0,2)

---

## ITEM 03 — Área, Volume, Peso e Arranjo na Armazenagem

- **Aula:** 01 · Matemática Aplicada à Gestão
- **Capacidade:** C2
- **Origem:** [P1] + [P2]

**Contexto:**
Um galpão novo mede 20 m de comprimento por 12 m de largura, com um corredor de 2 m no meio, ao longo do comprimento. Os paletes medem 1,2 m × 1,0 m. Em cada palete serão empilhadas caixas de copos descartáveis que medem 0,40 m × 0,35 m × 0,25 m e pesam 35.000 g cada; a carga vai até 1,2 m de altura, o lado de 0,40 m da caixa fica no sentido de 1,2 m do palete, o de 0,35 m no sentido de 1,0 m, e as caixas não podem ser deitadas. O limite de carga do palete é de 1.000 kg.

**Comando:**
Dimensione a armazenagem, sempre com as unidades.

**Tópicos:**
- a) Calcule a área útil do galpão (descontando o corredor) e a área de um palete, com as unidades. (0,1)
- b) Calcule o volume de uma caixa em m³ e em litros e o peso de um palete com 24 caixas em kg (convertendo de gramas), dizendo se ele respeita o limite de 1.000 kg. (0,2)
- c) Mostre, pelo arranjo, quantas caixas cabem no palete (quantas no sentido de 1,2 m, quantas no de 1,0 m e quantas camadas) e explique por que a divisão do volume do palete pelo volume da caixa daria um número maior que não pode ser usado. (0,2)

---

## ITEM 04 — Variação Percentual, Margem, Formação de Preço e Porcentagem sobre Porcentagem

- **Aula:** 02 · Fundamentos Matemáticos para Gestão
- **Capacidade:** C2
- **Origem:** [P2] + [P1]

**Contexto:**
O estoque de capacetes passou de 250 para 210 unidades em um mês. Cada capacete é comprado por R$ 40,00 e vendido às filiais por R$ 50,00. O par de luvas de vaqueta custava R$ 80,00; o fornecedor avisou que o preço vai subir 15%, mas dá 4% de desconto à vista. Um colega disse que "o aumento real é de 11%, porque 15% − 4% = 11%".

**Comando:**
Calcule os indicadores e analise a afirmação do colega.

**Tópicos:**
- a) Calcule a variação percentual do estoque de capacetes, mostrando a fórmula (valor final − valor inicial) ÷ valor inicial, e diga se foi aumento ou queda. (0,1)
- b) Calcule o lucro por capacete, a margem sobre a receita (preço de venda) e a margem sobre o custo, e explique por que os dois percentuais são diferentes. (0,2)
- c) Calcule o preço final das luvas usando os fatores multiplicativos (aumento e desconto), a variação real em porcentagem e explique por que o colega errou. (0,2)

---

## ITEM 05 — Média, Mediana, Moda e Tabela de Frequência

- **Aula:** 02 · Fundamentos Matemáticos para Gestão
- **Capacidade:** C2
- **Origem:** [P1] + [N]

**Contexto:**
As saídas diárias de máscaras descartáveis (em caixas) nos últimos 6 dias foram: 20, 22, 22, 25, 26 e 105. O dia com 105 caixas foi uma parada geral de manutenção, que não se repete todo mês. O comprador vai usar o "consumo típico" para planejar a próxima compra. Na pesquisa de satisfação com 200 requisitantes, 80 avaliaram o atendimento como Excelente, 70 como Bom, 30 como Regular e 20 como Ruim.

**Comando:**
Calcule as medidas de tendência central, organize a pesquisa e escolha a medida mais adequada.

**Tópicos:**
- a) Calcule a média das saídas, mostrando a soma e a divisão. (0,1)
- b) Calcule a mediana (mostrando o rol em ordem) e diga qual é a moda; depois, calcule a frequência relativa (%) de cada resposta da pesquisa. (0,2)
- c) Diga qual medida representa melhor o consumo típico do almoxarifado e justifique usando o dia atípico. (0,2)

---

## ITEM 06 — Amplitude, Variância, Desvio Padrão e Progressões

- **Aula:** 02 · Fundamentos Matemáticos para Gestão
- **Capacidade:** C2
- **Origem:** [P2] + [P1]

**Contexto:**
O almoxarifado comparou os prazos de entrega (em dias) das últimas 5 entregas de duas transportadoras: Rota Certa — 3, 4, 3, 5, 5; Via Rápida — 1, 7, 2, 6, 4. Para o próximo trimestre, a expedição atende hoje 200 pedidos por mês, e a gerência estuda duas metas: Meta A, aumentar 40 pedidos a cada mês; Meta B, aumentar 20% a cada mês.

**Comando:**
Analise a dispersão dos prazos, escolha a transportadora e compare as metas.

**Tópicos:**
- a) Calcule a média e a amplitude dos prazos de cada transportadora, mostrando as contas. (0,1)
- b) Calcule a variância (dividindo por 5) e o desvio padrão de cada transportadora e diga qual escolher, explicando o que aconteceria com o estoque de segurança se a escolha considerasse só a média. (0,2)
- c) Diga qual meta é uma PA e qual é uma PG (com a razão de cada uma), calcule quantos pedidos cada meta prevê para o 4º mês, contando 200 pedidos como o 1º mês, diga qual cresce mais rápido e por quê, e cite um risco (hipótese pessimista, de causa e efeito) de adotar a meta que cresce mais sem analisar a capacidade da equipe e do estoque. (0,2)

---

## ITEM 07 — Tipos de Dados, Precedência e Referência Absoluta

- **Aula:** 03 · Excel Básico: Interface e Fórmulas
- **Capacidade:** C1
- **Origem:** [P2] + [P1]

**Contexto:**
Na planilha de estoque, cada linha de 2 a 40 tem a quantidade em B, o custo unitário em C e o frete por unidade em F. A taxa mensal de armazenagem de 3% está digitada só na célula H1. Na linha 2: B2 = 10, C2 = 8 e F2 = 2. Um colega reclamou que alguns custos aparecem alinhados à esquerda e não entram nas contas.

**Comando:**
Escreva as fórmulas e analise os erros da planilha.

**Tópicos:**
- a) Explique o que significa um número aparecer alinhado à esquerda (tipo de dado), diga em que parte da interface se confere o conteúdo exato da célula ativa e escreva a fórmula do custo em estoque em D2 (quantidade × custo unitário). (0,1)
- b) Escreva a fórmula da armazenagem em E2 (custo em estoque × taxa de H1), de modo que possa ser arrastada até a linha 40 sem erro, diga a tecla que insere os cifrões e explique por que, se o colega usar =D2*H1 e arrastar, E3 mostra zero. (0,2)
- c) Para o custo com frete (quantidade × (custo unitário + frete)), o colega escreveu =B2*C2+F2. Calcule o resultado da fórmula dele e o resultado correto para a linha 2, escreva a fórmula correta e explique a regra de precedência que causou o erro. (0,2)

---

## ITEM 08 — Funções Básicas e Função SE no Resumo do Estoque

- **Aula:** 03 · Excel Básico: Interface e Fórmulas
- **Capacidade:** C1
- **Origem:** [P2]

**Contexto:**
O resumo semanal tem os itens em A2:A7 e as saídas da semana em B2:B7: Luva — 12; Capacete — 30; Óculos — (célula vazia, sem lançamento); Protetor auricular — 18; Bota — 6; Máscara — 24. Na coluna E fica o saldo de cada item e na coluna F o estoque mínimo.

**Comando:**
Escreva as fórmulas e informe os resultados.

**Tópicos:**
- a) Escreva as fórmulas de SOMA e de MÉDIA das saídas (B2:B7) e informe os dois resultados, explicando como a célula vazia afeta a média. (0,1)
- b) Escreva as fórmulas e informe os resultados de CONT.NÚM(B2:B7), CONT.VALORES(A2:A7) e da amplitude das saídas usando MÁXIMO e MÍNIMO. Explique a diferença entre CONT.NÚM e CONT.VALORES. (0,2)
- c) Escreva em G2 a fórmula com SE que mostra "Repor" quando o saldo for menor que o mínimo e "OK" nos outros casos, cite o operador de comparação usado e informe o resultado para saldo 15 e mínimo 20 e para saldo 20 e mínimo 20, justificando o segundo caso. (0,2)

---

## ITEM 09 — Alça de Preenchimento, Preenchimento Relâmpago e Referência Relativa

- **Aula:** 03 · Excel Básico: Interface e Fórmulas
- **Capacidade:** C1
- **Origem:** [N] + [P1]

**Contexto:**
A planilha de estoque tem, na linha 2: Entradas (C2), Saídas (D2), Saldo (E2) e Estoque Mínimo (F2), e os dados vão até a linha 300. A coluna A traz textos como "MAT-001 Luva de vaqueta", com o código e a descrição juntos, e o gerente quer o código separado na coluna B. Na linha 1, o cabeçalho da coluna H começa com "Jan" e precisa seguir até "Dez".

**Comando:**
Use os recursos de preenchimento do Excel e explique o que acontece com as fórmulas.

**Tópicos:**
- a) Escreva a fórmula do Saldo em E2 e diga como levá-la de uma vez até a linha 300 usando a alça de preenchimento. (0,1)
- b) Explique o que acontece com a fórmula do Saldo ao ser copiada para E3 (referência relativa) e como gerar a sequência "Jan" a "Dez" no cabeçalho com a alça. (0,2)
- c) Explique como separar o código (ex.: "MAT-001") na coluna B usando o Preenchimento Relâmpago (com o atalho) e o que o Excel faz com as outras linhas. (0,2)

---

## ITEM 10 — Formatação Condicional, Escalas de Cor e Validação de Dados

- **Aula:** 04 · Excel Intermediário: Formatação e Validação
- **Capacidade:** C1
- **Origem:** [P2] + [N]

**Contexto:**
Na aba Movimentação, os códigos dos itens ficam em A2:A500, as quantidades requisitadas em C2:C500, o saldo em E2:E500 e o estoque mínimo em F2:F500. Os códigos válidos estão cadastrados na aba Cadastro, em A2:A250. Os conferentes vêm digitando códigos inexistentes e quantidades como 0, −5 e 2,5. A gerência também quer ver, de relance, quais itens têm o maior valor em estoque (coluna H).

**Comando:**
Configure os recursos que deixam a planilha confiável e fácil de ler.

**Tópicos:**
- a) Descreva o caminho e escreva a fórmula da regra de formatação condicional que pinta de vermelho o saldo (E2:E500) quando estiver abaixo do mínimo e explique por que o cifrão fica só na coluna. (0,1)
- b) Descreva a validação de dados que obriga a escolher o código de uma lista ligada ao Cadastro (caminho, opção "Permitir", fonte travada e estilo do alerta) e a validação que só aceita quantidades inteiras de 1 a 200. (0,2)
- c) Diga qual recurso visual da formatação condicional (Escalas de Cor ou Barras de Dados) usar na coluna H para destacar os maiores valores, como ele funciona e por que validar a entrada evita erros nos relatórios e nas buscas com PROCV. (0,2)

---

## ITEM 11 — Formatos, Datas, Congelar Painéis, Filtro e Ordenação

- **Aula:** 04 · Excel Intermediário: Formatação e Validação
- **Capacidade:** C1
- **Origem:** [P2] + [P1]

**Contexto:**
O relatório de entradas tem 350 linhas, o cabeçalho na linha 1 e o código do item na coluna A. Um assistente digitou o custo como o texto "R$ 1.250,00" e, para 12%, digitou 12 e depois clicou no botão de porcentagem. A data de entrada de um lote, em B2, é 15/10/2026, e o fornecedor dá 30 dias para pagar. O gerente quer ver só os itens com custo acima de R$ 1.000,00, do maior para o menor.

**Comando:**
Corrija o relatório explicando cada recurso usado.

**Tópicos:**
- a) Explique o problema de digitar "R$" dentro da célula e o que fazer no lugar, e explique por que apareceu 1200% e como digitar 12% corretamente. (0,1)
- b) Escreva a fórmula do vencimento do pagamento (data de B2 + 30 dias), informe a data resultante e explique por que somar números a uma data funciona; diga também qual das três opções de congelamento usar para manter visíveis, ao mesmo tempo, a linha 1 e a coluna A (e em qual célula clicar). (0,2)
- c) Descreva como usar o AutoFiltro para mostrar só os custos maiores que R$ 1.000,00, ordenados do maior para o menor, e diga o que acontece com as linhas que não aparecem. (0,2)

---

## ITEM 12 — Proteção de Planilha e de Pasta e Estilo da Tabela

- **Aula:** 04 · Excel Intermediário: Formatação e Validação
- **Capacidade:** C1
- **Origem:** [P1] + [N]

**Contexto:**
Na semana passada, alguém apagou sem querer as fórmulas da coluna de custo do relatório de estoque, e outra pessoa excluiu a aba "Cadastro" do arquivo. As colunas C (quantidade) e D (custo unitário) são preenchidas pela equipe; as demais têm fórmulas. O relatório também está difícil de ler: várias fontes, números centralizados e a linha de total igual às outras.

**Comando:**
Proteja o arquivo e deixe o relatório profissional.

**Tópicos:**
- a) Cite três ajustes de estilo para o relatório ficar profissional (fonte, alinhamento de textos e números, cabeçalho e linha de total). (0,1)
- b) Explique, na ordem, as duas etapas para proteger as fórmulas e ainda deixar a equipe digitar nas colunas C e D. (0,2)
- c) Explique a diferença entre Proteger Planilha e Proteger Estrutura da Pasta, diga qual delas evita que a aba "Cadastro" seja excluída e para que serve a senha. (0,2)

---

## ITEM 13 — PROCV, SEERRO e Diagnóstico do #N/D

- **Aula:** 05 · Excel Avançado: Funções Complexas e Busca
- **Capacidade:** C1
- **Origem:** [P2] + [P1]

**Contexto:**
A aba Cadastro tem 400 itens em A2:D401, com as colunas Código | Descrição | Unidade | Preço. Os códigos são números (ex.: 1015). Na aba Requisição, o código fica em A2 e a quantidade em B2; a descrição será buscada em C2, o preço em D2 e o total calculado em E2. Alguns códigos que existem no cadastro estão voltando #N/D.

**Comando:**
Monte as buscas e trate os erros.

**Tópicos:**
- a) Escreva as fórmulas com PROCV para a descrição (C2) e para o preço (D2), com a matriz travada e busca exata, e explique o número da coluna e o último argumento 0. (0,1)
- b) Escreva a fórmula do preço protegida com SEERRO devolvendo 0 e a fórmula do total em E2. Explique por que, no preço, é melhor devolver 0 do que um texto. (0,2)
- c) O código 1015 existe no cadastro, mas a busca dele retorna #N/D. Explique duas causas possíveis e como corrigir cada uma. (0,2)

---

## ITEM 14 — PROCH e ÍNDICE + CORRESP

- **Aula:** 05 · Excel Avançado: Funções Complexas e Busca
- **Capacidade:** C1
- **Origem:** [N] + [P2]

**Contexto:**
Na aba Fretes, a tabela de tarifas por quilo fica em A1:M3: a linha 1 tem os meses de Janeiro a Dezembro em B1:M1, a linha 2 traz a transportadora Rota Certa e a linha 3 a transportadora Via Rápida. Em outra tabela, o nome do fornecedor fica em G2:G20 e o código do fornecedor em H2:H20 (o código está à direita do nome). O código procurado está digitado em K2.

**Comando:**
Monte as buscas que o PROCV não resolve.

**Tópicos:**
- a) Escreva a fórmula com PROCH que traz a tarifa de "Março" da Via Rápida (matriz travada e busca exata) e explique quando se usa PROCH em vez de PROCV. (0,1)
- b) Escreva a fórmula com ÍNDICE + CORRESP que traz o nome do fornecedor a partir do código em K2 e explique por que o PROCV não resolve essa busca. (0,2)
- c) Explique o que cada função faz sozinha (o que CORRESP devolve e o que ÍNDICE devolve) e cite duas situações em que é melhor usar ÍNDICE + CORRESP do que PROCV. (0,2)

---

## ITEM 15 — SE Aninhado, CONT.SE e SOMASE no Relatório Gerencial

- **Aula:** 05 · Excel Avançado: Funções Complexas e Busca
- **Capacidade:** C1
- **Origem:** [P2] + [P1] + [N]

**Contexto:**
A base de requisições ocupa A2:E301, com as colunas Data | Código | Categoria | Quantidade | Valor total. As categorias são "EPI", "Ferramentas" e "Embalagens". A gerência pediu a classificação de cada requisição e um resumo por categoria.

**Comando:**
Monte as fórmulas do relatório gerencial.

**Tópicos:**
- a) Escreva em F2 a fórmula com SE aninhado que classifica o valor total (E2): 5.000 ou mais = "Alta"; de 1.000 até 4.999,99 = "Média"; abaixo de 1.000 = "Baixa", e explique por que os testes começam pelo maior valor. (0,1)
- b) Escreva a fórmula que conta as requisições da categoria "EPI" e a que conta as requisições com valor total acima da média (usando o & no critério), explicando o papel do &. (0,2)
- c) Escreva a fórmula que soma o valor total da categoria "Ferramentas", explique o papel de cada intervalo e a diferença entre a pergunta que o CONT.SE responde e a que o SOMASE responde. (0,2)

---

## ITEM 16 — Tabela Dinâmica de Compras por Fornecedor e Mês

- **Aula:** 06 · Excel Avançado: Tabelas Dinâmicas e Gráficos
- **Capacidade:** C1
- **Origem:** [N]

**Contexto:**
A aba Compras tem 1.200 linhas com as colunas Data | Fornecedor | Item | Quantidade | Valor. O cabeçalho das colunas Item e Quantidade está em células mescladas e há uma linha em branco no meio da base (linha 601). A gerência quer saber qual fornecedor e qual mês concentram as compras. Na tabela pronta, o fornecedor Alfa aparece com 58% do total geral. Na semana seguinte, foram acrescentadas 40 compras novas no fim da base, mas a tabela dinâmica continuou com os mesmos números.

**Comando:**
Prepare a base, monte a tabela dinâmica e analise o resultado.

**Tópicos:**
- a) Diga os dois problemas da base que atrapalham a tabela dinâmica e como corrigir cada um. (0,1)
- b) Diga o caminho para criar a tabela dinâmica, em qual área (Linhas, Colunas, Valores ou Filtros) entra cada campo para ver o valor comprado por fornecedor mês a mês e como agrupar as datas por mês. (0,2)
- c) Explique como mostrar o valor como "% do Total Geral", o que os 58% do fornecedor Alfa indicam e que ação a área de compras deve propor; explique também por que as 40 compras novas não apareceram e como resolver. (0,2)

---

## ITEM 17 — Resumir Valores, Campo Calculado, Filtros e Linha do Tempo

- **Aula:** 06 · Excel Avançado: Tabelas Dinâmicas e Gráficos
- **Capacidade:** C1
- **Origem:** [N]

**Contexto:**
Na tabela dinâmica de compras (Linhas: Item; Valores: Soma de Valor), a gerência agora quer: o número de pedidos e o valor médio de cada item; o custo de armazenagem de 5% sobre o valor comprado, sem mexer na base; só os 10 itens de maior valor; e analisar qualquer período (mês, trimestre) arrastando uma barra.

**Comando:**
Configure a tabela dinâmica para responder a gerência.

**Tópicos:**
- a) Explique como trocar o cálculo de Soma para Contagem e para Média e o que cada um responde. (0,1)
- b) Explique como criar um Campo Calculado para a armazenagem de 5% (caminho e fórmula) e por que ele não altera a base. (0,2)
- c) Explique como mostrar só os 10 itens de maior valor e como a Linha do Tempo permite analisar períodos (o que ela filtra e quais escalas oferece). (0,2)

---

## ITEM 18 — Gráficos Dinâmicos, Gráfico Combinado e Segmentação

- **Aula:** 06 · Excel Avançado: Tabelas Dinâmicas e Gráficos
- **Capacidade:** C1
- **Origem:** [N]

**Contexto:**
A gerência pediu três visões do almoxarifado: (1) a evolução do valor comprado mês a mês durante o ano; (2) o ranking dos 12 itens de maior custo em estoque; (3) o valor comprado por mês (de R$ 80.000 a R$ 150.000) junto com o percentual do orçamento usado (de 70% a 110%). Um colega fez as três visões em gráficos de pizza 3D, um deles com 12 fatias, e começou o eixo das colunas em R$ 70.000. O relatório tem duas tabelas dinâmicas e será enviado à gerência com a planilha protegida.

**Comando:**
Escolha os gráficos certos e deixe o relatório interativo e seguro.

**Tópicos:**
- a) Diga o tipo de gráfico ideal para a visão (1) e para a visão (2), justificando, explique os erros do colega (pizza com 12 fatias, efeito 3D e eixo começando em R$ 70.000) e diga como usar rótulos de dados no ranking. (0,1)
- b) Diga qual gráfico usar na visão (3), o que fica em colunas, o que fica em linha e por que é preciso o eixo secundário. (0,2)
- c) Explique como fazer uma única Segmentação de Dados por Fornecedor filtrar as duas tabelas dinâmicas ao mesmo tempo e como proteger a planilha sem travar os filtros e a segmentação. (0,2)

---

## ITEM 19 — KPIs do Estoque com Meta, Semáforo e Storytelling

- **Aula:** 07 · Dashboards Interativos e Integração de Dados
- **Capacidade:** C2
- **Origem:** [N]

**Contexto:**
No último trimestre, o custo das saídas do almoxarifado foi de R$ 150.000 e o estoque médio foi de R$ 50.000. No mês, houve 500 requisições, das quais 30 não foram atendidas por falta de material. O saldo de luvas é de 900 pares, com consumo médio de 150 pares por dia. As metas da gerência são: ruptura de no máximo 5% e cobertura mínima de 10 dias. As luvas faltaram duas vezes no mês.

**Comando:**
Calcule os indicadores do dashboard e prepare a apresentação para a gerência.

**Tópicos:**
- a) Calcule o giro do estoque no trimestre, mostrando a fórmula (custo das saídas ÷ estoque médio), e explique o que esse número significa. (0,1)
- b) Calcule a ruptura (requisições não atendidas ÷ total de requisições) e a cobertura das luvas (saldo ÷ consumo médio diário) e diga a cor do semáforo de cada KPI em relação à meta. (0,2)
- c) Conte a história desses dados em 4 passos (Pergunta → Dado → Conclusão → Ação) para apresentar à gerência a falta de luvas e diga por onde começar a fala numa apresentação para a diretoria. (0,2)

---

## ITEM 20 — Estrutura, Layout e Design do Dashboard

- **Aula:** 07 · Dashboards Interativos e Integração de Dados
- **Capacidade:** C1
- **Origem:** [N]

**Contexto:**
Um colega montou o dashboard do almoxarifado em uma única aba: os 1.200 registros brutos, as tabelas dinâmicas e 15 gráficos ficam misturados na mesma tela, cada gráfico com uma cor diferente (amarelo, rosa, roxo...), vários em 3D, desalinhados e com as linhas de grade aparecendo. Os cartões de KPI estão no rodapé da tela, e ele diz que colocou tudo "para não perder nenhum detalhe".

**Comando:**
Reorganize o dashboard seguindo as boas práticas da aula.

**Tópicos:**
- a) Diga as três abas em que o arquivo deve ser dividido, o que fica em cada uma, a ordem certa de construção do dashboard e por que fazer antes um rascunho (wireframe) no papel. (0,1)
- b) Descreva onde ficam os cartões de KPI, os gráficos centrais e os filtros pelo padrão de leitura em Z e quais são as três informações de um cartão de KPI. (0,2)
- c) Corrija os erros de design do colega (quantidade de gráficos, cores, 3D, alinhamento, linhas de grade e demais elementos da planilha na tela final) e justifique por que um painel com menos gráficos gera decisões mais rápidas. (0,2)
