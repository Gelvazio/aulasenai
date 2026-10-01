# 4 Excel Intermediário Formatação e Validação

> **Alinhamento à ementa** (`../EMENTA-CHALKIE-AI.md`)
> - **Aula da ementa:** Aula 2 — Excel Básico e Intermediário (8h), parte 2 de 2
> - **Conhecimentos [oficial]:** 2.2.1 Formatação condicional · 2.2.5 Validação de dados (+ congelar painéis; 2.2.4 Filtros e 2.2.6 Proteção de células começam aqui e são retomados na Aula 3)
> - **Capacidades:** C1 · C2
> - **Indicadores de desempenho:** 7 (formatação condicional e validação com lista suspensa) · 10 (proteção, início)
> - **Avaliação:** atividades de sala de aula (40 pontos no total) e provas conforme a tabela de notas (Seção V da ementa)
> - **Situações-problema:** 5 (códigos digitados errados) e 6 (saldo abaixo do mínimo em vermelho)
> - **Editor:** Excel ou LibreOffice Calc (funções em português; PROCV, SE, CONT.SE, SOMASE e SEERRO têm o mesmo nome nos dois)
> - Slides `N.1`, `N.2`... são complementos da ementa e não existem no `.pptx`.

## Slide 1 — Excel Intermediário: Formatação e Validação

- Transformando planilhas brutas em relatórios gerenciais confiáveis e profissionais.

## Slide 2 — Você Confiaria Neste Relatório?

- Imagine receber uma planilha de vendas cheia de números sem vírgula, datas no padrão americano e digitações com erros ortográficos. Uma decisão de negócios milionária pode falhar por falta de organização e padronização visual.

## Slide 3 — Objetivos da Nossa Aula

- Nesta aula do curso de Análise de Dados, vamos desenvolver três habilidades essenciais para o mercado de trabalho:

- Padronizar números, moedas, percentuais e datas com precisão.

- 1

- 2

- Aplicar regras de validação para impedir dados incorretos.

- Proteger fórmulas e estruturar relatórios com painéis e filtros.

- 3

## Slide 4 — Vocabulário Essencial da Aula

- Validação - Regras que controlam e padronizam entradas de dados nas células.

- Proteção - Segurança para impedir alterações acidentais em fórmulas.

- Formatação - Ajusta a exibição visual de números sem alterar o valor armazenado.

- Filtro - Recurso para isolar, ordenar e exibir apenas linhas da tabela.

## Slide 5 — Revisão: Estrutura Básica do Excel

- CONCEITO

- Na aula anterior, vimos que o Excel organiza dados em células, definidas pelo cruzamento de colunas (letras) e linhas (números).
- Toda fórmula deve iniciar com o sinal de igualdade (=).
- Funções como =SOMA() e =MÉDIA() aceleram cálculos complexos.

- 🧠

- Lembre-se
- Fórmulas incorretas propagam erros por todo o relatório.

## Slide 6 — Revisão: A Lógica da Função SE

- Estrutura da Condição
- A função SE toma decisões automáticas baseando-se em uma premissa lógica verdadeira ou falsa:

- Aplicação Gerencial
- No ambiente de negócios, o teste lógico costuma conferir o cumprimento de metas comerciais ou a necessidade de reposição de itens no estoque.

- Exemplo
- =SE(D2<E2; "Repor"; "OK") classifica a situação do item sem intervenção manual.

- 🔍

## Slide 7 — Referências Relativas e Absolutas

- CONCEITO

- Ao arrastar fórmulas, o Excel ajusta coordenadas automaticamente (referência relativa).
- Para travar células fixas (taxas e custos fixos), usamos o cifrão ($).
- Exemplo: $D$1 fixa coluna D e linha 1 ao copiar.

- Ponto-chave
- Use F4 para alternar rapidamente entre tipos de fixação de célula.

- 🔑

## Slide 8 — Quiz: Referências no Excel

- Qual é a finalidade de usar o caractere cifrão ($) na referência de uma célula como $B$4?

- 1.

- Travar a célula para que ela não mude ao arrastar a fórmula.

- 2.

- Proteger a planilha inteira contra visualização de terceiros.

- 3.

- Indicar que a célula contém um cálculo financeiro de desconto.

- 4.

- Converter o valor numérico digitado diretamente para a moeda Real.

## Slide 9 — Quiz: Referências no Excel

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

## Slide 10 — Formatação Avançada de Células

- EXPLICAÇÃO

- Formatar uma célula consiste em mudar sua aparência sem alterar seu conteúdo real. O número bruto 1500,5 armazenado pelo sistema pode se manifestar para o leitor como R$ 1.500,50 ou 1.500,5, preservando cálculos perfeitamente exatos nos bastidores.

- ⚠️

- Atenção
- Nunca digite letras como 'R$' dentro da célula, pois isso transforma o número em texto e anula as fórmulas!

## Slide 11 — Tratando Moedas e Percentuais

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

## Slide 12 — Padronização de Datas no Sistema

- EXPLICAÇÃO

- Para o Excel, toda data é um número sequencial de dias contados desde 01 de janeiro de 1900.
- O número 46000 representa 09/12/2025.
- O formato de Data Abreviada exibe 09/12/2025.
- O formato de Data Completa detalha o dia da semana e o mês por extenso.

- 🤯

- Curiosidade
- Como datas são números, você pode somar 30 a uma data para calcular vencimentos!

## Slide 13 — A Magia da Formatação Condicional

- O que é Formatação Condicional?
- É um recurso dinâmico que aplica automaticamente cores de fundo, bordas ou fontes com base em regras matemáticas pré-estabelecidas.
- Valores acima da meta ganham preenchimento verde.
- Valores críticos ou prejuízos acendem em vermelho.

- Ao atualizar qualquer número na tabela, a cor muda de forma instantânea sem precisar de ajustes manuais.

## Slide 14 — Escalas de Cor e Barras de Dados

- EXPLICAÇÃO

- Além de regras de maior/menor, o Excel oferece recursos visuais em células:
- Barras de Dados: gráficos horizontais dentro da célula.
- Escalas de Cor: gradientes (verde a vermelho) para representar calor de vendas.

- Ponto-chave
- Identifica índices em painéis executivos.

- 🔑

## Slide 15 — Alerta Visual Instantâneo

- Em um relatório com dez mil linhas, ninguém lê célula por célula. A formatação condicional atua como um semáforo inteligente, guiando o olhar do gestor direto para o problema que exige ação urgente.

## Slide 15.1 — Estoque Abaixo do Mínimo em Vermelho

- Situação-problema: o saldo abaixo do mínimo precisa ficar vermelho.

- Selecione E2:E200 (Saldo) → Formatação Condicional → Nova Regra → Usar uma fórmula:
- =$E2<$F2 → preenchimento vermelho
- O $ só na coluna deixa a linha "andar" e compara cada item com o próprio mínimo.

- Na coluna Situação: =SE(E2<F2; "Repor"; "OK") + regra "Texto que contém Repor" em vermelho.

- 🔑
- Ponto-chave
- A cor muda sozinha quando uma nova saída é lançada: o comprador vê na hora o que repor.

## Slide 16 — Estilização Profissional de Tabelas

- Tipografia
- Adote uma única família de fontes limpas, como Aptos, Segoe UI ou Calibri.

- Alinhamento
- Alinhe textos à esquerda e todos os números e moedas sempre à direita.

- Contraste e Bordas
- Use cabeçalhos escuros com texto branco e linhas de grade discretas.

- Hierarquia
- Destaque linhas de totais gerais com negrito e borda dupla inferior.

## Slide 17 — Poluição Visual vs. Clareza de Dados

- EXPLICAÇÃO

- Evite cores primárias fortes que criam um 'efeito carnaval' cansativo.
- Use tons neutros como cinza, azul-marinho e grafite.
- Reserve cores saturadas apenas para sinalizar exceções e metas.

- ⚠️

- Atenção
- Menos cores trazem elegância e autoridade profissional à análise.

## Slide 18 — Verificação: Alinhamento de Células

- Em tabelas corporativas, os números devem ser alinhados à esquerda para facilitar a leitura alfabética.

- 👍 VERDADEIRO

- 👎 FALSO

- 🤔 Prepare-se para explicar o seu raciocínio.

## Slide 19 — Verificação: Alinhamento de Células

- ✅

- Em tabelas corporativas, os números devem ser alinhados à esquerda para facilitar a leitura alfabética.

- ✓

- 👍 VERDADEIRO

- 👎 FALSO

- Por que é isso?
- Números devem ser alinhados à direita para que as casas decimais e ordens de grandeza fiquem perfeitamente emparelhadas.

- 🔑

## Slide 20 — Congelamento de Painéis

- EXPLICAÇÃO

- Ao rolar para baixo uma tabela com centenas de linhas, os títulos das colunas somem da tela, deixando você perdido sobre o que cada valor significa.
- O Congelar Painéis fixa linhas de cabeçalho e colunas de identificação no topo da tela.
- Encontre na guia Exibir > Congelar Painéis.

- Lembre-se
- Posicione o cursor exatamente na célula abaixo e à direita do bloco que você deseja manter congelado.

- 🧠

## Slide 21 — Três Opções de Congelamento

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

## Slide 22 — O Perigo dos Dados Incorretos

- CONCEITO

- Se um operador digitar 'São Paulo', outro 'Sao Paulo' e um terceiro 'SP', o Excel falhará ao consolidar vendas por estado em fórmulas.
- Digitações inconsistentes distorcem contagens e somas.
- Erros de digitação geram decisões gerenciais erradas.

- ⚠️

- Atenção
- Regra de ouro: dados de entrada incorretos geram relatórios inúteis.

## Slide 23 — Validação de Dados: Como Funciona

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

## Slide 24 — Criando Listas Suspensas

- EXPLICAÇÃO

- A lista suspensa é a forma mais eficiente de validação de dados no Excel corporativo:
- Selecione o intervalo que receberá as escolhas.
- Na Validação, escolha Permitir: Lista.
- Digite as opções separadas por ponto e vírgula: MAT-001;MAT-002;MAT-003 ou selecione um intervalo de apoio.

- 🔑

- Ponto-chave
- O usuário escolhe com um clique de mouse, eliminando 100% dos erros de digitação.

## Slide 24.1 — Validando Códigos de Item

- Situação-problema: a planilha de estoque tem códigos digitados errados. Como impedir?

- Cadastre os códigos válidos na aba Cadastro, em A2:A300.
- Na coluna Código da aba Movimentação: Dados → Validação de Dados → Permitir: Lista → Fonte: =Cadastro!$A$2:$A$300
- Alerta de erro: estilo Parar, título "Código inexistente".
- Quantidade: Permitir Número inteiro maior ou igual a 1.

- 🧠
- Lembre-se
- Código validado na entrada evita o erro #N/D no PROCV da Aula 3.

## Slide 25 — Vídeo: Validação de Dados em Ação

- Crie listas suspensas e alertas de erro.

## Slide 26 — Ordenação: Configurando uma Lista

- Qual é a sequência correta para configurar uma lista suspensa de opções em uma célula?

- Selecionar as células que receberão a lista suspensa.

- Digitar os itens no campo Fonte separados por ponto e vírgula.

- Acessar a guia Dados e clicar no botão Validação de Dados.

- Na caixa de diálogo, alterar a opção Permitir para Lista.

## Slide 27 — Ordenação: Configurando uma Lista

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

## Slide 28 — Mecanismos de Proteção no Excel

- CONCEITO

- Depois de despender horas calculando fórmulas sofisticadas, qualquer usuário desatento pode clicar acidentalmente na tecla Delete e apagar o modelo de projeção. O Excel oferece uma arquitetura de proteção em duas etapas para blindar a sua lógica de negócio.

- Ponto-chave
- A proteção garante a integridade dos cálculos sem impedir que novos dados sejam lançados.

- 🔑

## Slide 29 — A Lógica do Bloqueio de Células

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

## Slide 30 — Níveis de Segurança: Pasta vs. Planilha

- EXPLICAÇÃO

- Proteger Planilha: impede edição de células, fórmulas ou formatação na aba atual.
- Proteger Estrutura da Pasta: impede que usuários excluam, renomeiem ou adicionem abas no arquivo.

- 🧠

- Lembre-se
- Defina uma senha opcional para impedir desativações não autorizadas.

## Slide 31 — Filtro Automático para Análise

- EXPLICAÇÃO

- O AutoFiltro adiciona setas nos cabeçalhos para consultar dados sem alterar a tabela:
- Seleção: marque a categoria ou o fornecedor desejado.
- Filtros de Número: exiba itens com custo em estoque 'maior que R$ 1.000'.
- Ordenação: classifique de A a Z ou por valores.

- 🔍

- Exemplo
- Use Ctrl+Shift+L para ativar ou desativar filtros rapidamente.

## Slide 32 — Quiz: Procedimento de Proteção

- Qual é a ordem correta para permitir que usuários editem apenas dados de entrada, preservando fórmulas protegidas?

- 1.

- Ativar Proteger Planilha e em seguida apagar as fórmulas das células que devem ser editadas.

- 2.

- Aplicar formatação condicional vermelha sobre as células que não podem ser alteradas.

- 3.

- Inserir uma senha na pasta de trabalho e ocultar todas as colunas que possuem cálculos.

- 4.

- Destravar as células de entrada em Formatar Células e depois ativar Proteger Planilha.

## Slide 33 — Quiz: Procedimento de Proteção

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

## Slide 34 — Prática 1: Relatório de Estoque

- Abra a planilha de estoque e siga estes passos de estilização:
- Formate Custo em Estoque como 'Moeda (R$)' e datas de entrada como 'Data Abreviada'.
- Cabeçalho: fundo azul-escuro, texto branco e negrito.
- Formatação Condicional: vermelho para saldo abaixo do estoque mínimo e verde para saldo acima dele.
- Congele a linha do cabeçalho para fixá-la na rolagem.

## Slide 35 — Prática 2: Formulário com Validação

- Cadastro de requisições ao almoxarifado:
- Código do item: Lista vinculada ao cadastro (MAT-001 a MAT-050).
- Quantidade: Inteiro (1 a 500 unidades).
- Alerta: 'Parar', título 'Quantidade Inválida', msg 'Use 1 a 500'.
- Teste: Verifique o bloqueio ao inserir valores fora do intervalo.

## Slide 36 — Prática 3: Bloqueio Estratégico

- Selecione células de quantidades e preços unitários.
- Em 'Formatar Células' (Ctrl+1), aba 'Proteção', desmarque 'Bloqueadas'.
- Na guia 'Revisão', clique em 'Proteger Planilha' com a senha 'gestao2026'.
- Tente editar a fórmula de custo em estoque e verifique o aviso do Excel.

## Slide 37 — Síntese dos Recursos Estudados

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

## Slide 38 — Debate: Segurança vs. Facilidade

- Por que travar completamente uma planilha com senha pode, às vezes, atrapalhar o fluxo de trabalho de uma equipe se o analista não planejar bem quais células devem ficar livres?

## Slide 39 — Debate: Segurança vs. Facilidade

- ✅

- Você poderia ter dito...
- Se as células de digitação não forem devidamente destravadas antes da proteção, os colegas de trabalho não conseguirão preencher pedidos ou lançamentos do dia a dia, paralisando a operação da empresa até que a senha seja inserida.

## Slide 40 — Desafio Final de Fixação

- Pergunta 1:
- O que acontece com o valor numérico armazenado no Excel quando aplicamos a formatação de Moeda em uma célula?

- Pergunta 2:
- Qual é a função do separador ponto e vírgula (;) ao configurar manualmente os itens de uma Lista Suspensa?

- Pergunta 3:
- Por que devemos desmarcar a opção 'Bloqueadas' antes de clicar no botão 'Proteger Planilha'?

## Slide 41 — Desafio Final de Fixação

- ✅

- Resposta 1:
- O valor permanece exatamente o mesmo nos bastidores; apenas a sua exibição visual ganha o símbolo R$, separadores de milhar e duas casas decimais.

- Resposta 2:
- Separar cada uma das opções individuais que serão exibidas como alternativas selecionáveis dentro do menu suspenso.

- Resposta 3:
- Para indicar ao Excel quais células específicas devem continuar liberadas para digitação, mantendo apenas as células com fórmulas e cabeçalhos travados.
