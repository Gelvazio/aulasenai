# -*- coding: utf-8 -*-
"""
Notas explicativas das páginas 1 a 20 de "Excel Básico.pdf" (Office Fácil).

Redigidas a partir da leitura visual de cada página. São usadas por
extrair_excel_basico.py para complementar o texto obtido por OCR.

Campos de cada página: titulo, tema, explicacao, passos, atalhos, exercicio.
"""

EXPLICACOES = {
    1: {
        "titulo": "Conhecendo a tela do Excel",
        "tema": "Interface do Excel e suas seis áreas principais.",
        "explicacao": """
Antes de digitar qualquer dado é preciso saber **onde estão as coisas** na tela do Excel.
A página apresenta uma captura da janela com seis áreas numeradas:

| Nº | Área | Para que serve |
|---|---|---|
| 1 | **Barra de Fórmulas** | Mostra e permite editar o conteúdo da célula selecionada; é onde se digitam e corrigem fórmulas. |
| 2 | **Faixa de Opções** | Reúne as guias (Página Inicial, Inserir, Layout da Página, Fórmulas, Dados, Revisão, Exibir, Ajuda) com todos os comandos do Excel. |
| 3 | **Caixa de Nome** | Exibe o endereço da célula ativa (ex.: `A1`); digitando um endereço nela, você vai direto para aquela célula. |
| 4 | **Células** | A grade da planilha, formada por colunas (letras) e linhas (números), onde os dados são digitados e processados. |
| 5 | **Abas da Planilha** | Alternam entre as planilhas do arquivo (Planilha1, Planilha2…) e permitem criar novas com o botão **+**. |
| 6 | **Barra de Status** | Informa o que acontece na planilha e traz os modos de exibição e o controle de zoom. |

A dica da página lembra que a Faixa de Opções pode ser **personalizada**, adicionando ou removendo comandos usados com frequência.
""",
        "atalhos": [
            ("Ctrl + Home", "Vai para a célula A1."),
            ("Ctrl + Setas", "Move a seleção até o fim do bloco de dados na direção da seta."),
            ("Ctrl + S (citado na página)", "Salva o arquivo no Excel em inglês. **Atenção:** no Excel em português, Ctrl + S aplica sublinhado e o atalho de salvar é **Ctrl + B**."),
        ],
        "exercicio": """
**Atividade:** abrir o Excel, observar a tela e identificar/escrever onde ficam: Barra de Fórmulas,
Faixa de Opções, Caixa de Nome, Células, Abas da Planilha e Barra de Status.
""",
    },
    2: {
        "titulo": "Criando uma nova planilha no Excel",
        "tema": "Abrir o Excel, criar uma pasta de trabalho e salvá-la.",
        "explicacao": """
No Excel, cada **arquivo** é chamado de **pasta de trabalho**. Dentro dela podem existir várias
**planilhas** (abas). Ao criar um arquivo em branco, o Excel já entrega uma planilha chamada *Planilha1*,
que pode ser renomeada, excluída ou acompanhada de novas planilhas.

A tela inicial do Excel ("Boa tarde") mostra a opção **Pasta de trabalho em branco** e **modelos**
prontos (tour, tutorial de fórmulas, tabela dinâmica etc.). Modelos economizam tempo porque já vêm
com fórmulas, tabelas e formatação para situações comuns (orçamentos, listas, controles).
""",
        "passos": [
            "**Abra o Excel** pelo menu Iniciar do Windows ou pela barra de aplicativos. A tela inicial será exibida.",
            "**Crie uma pasta de trabalho em branco:** clique em *Pasta de trabalho em branco*. Uma planilha vazia é aberta.",
            "**(Opcional) Use um modelo pronto:** escolha um modelo em destaque ou clique em *Mais modelos*.",
            "**Salve o arquivo:** clique em *Arquivo > Salvar como*, escolha a pasta, dê um nome e clique em *Salvar*.",
        ],
        "exercicio": """
**Atividade prática:**
1. Abrir o Excel e criar uma pasta de trabalho em branco.
2. Inserir alguns dados de exemplo (nomes, produtos ou valores).
3. Salvar como **"Minha Primeira Planilha"** na pasta Documentos.
4. Fechar e abrir novamente o arquivo para conferir se foi salvo.
""",
    },
    3: {
        "titulo": "Digitando e salvando seus dados",
        "tema": "Selecionar célula, digitar, confirmar com Enter e salvar.",
        "explicacao": """
A página ensina o ciclo básico de trabalho: **clicar → digitar → confirmar → salvar**.
O exemplo é um pequeno *Orçamento Mensal* (Receita 2.500; Aluguel 1.200; Transporte 300;
Alimentação 600; Lazer 200; Total de Despesas 2.300; Saldo 200).

Pontos do quadro **Entendendo**:
- A célula selecionada fica **contornada em verde**.
- Tudo o que você digita aparece também na **Barra de Fórmulas**.
- A tecla **Enter** confirma o conteúdo e leva o cursor para a célula de baixo.

O quadro **Como salvar** reforça que salvar é essencial para não perder dados:
*Arquivo > Salvar Como > escolher o local > digitar o nome > Salvar*.
""",
        "passos": [
            "Clique na célula onde deseja digitar (ex.: **A1**).",
            "Digite o texto ou número; ele aparece na célula e na Barra de Fórmulas.",
            "Pressione **Enter** para confirmar e descer para a próxima célula (ou use as setas).",
            "Salve: **Arquivo > Salvar Como**, escolha a pasta, dê um nome e clique em **Salvar**.",
        ],
        "atalhos": [
            ("Enter", "Confirma o conteúdo e desce uma célula."),
            ("F2 ou duplo clique", "Edita o conteúdo da célula."),
            ("Delete", "Apaga o conteúdo da célula selecionada."),
        ],
        "exercicio": """
**Atividade:** criar uma pasta nova; em A1 digitar **Lista de Compras**; na coluna A digitar os itens
e na coluna B as quantidades (Arroz 2, Feijão 1, Leite 3, Pão 2), usando Enter para descer;
salvar como **Lista de Compras.xlsx** na pasta Documentos.
""",
    },
    4: {
        "titulo": "Selecionar, copiar, recortar e colar",
        "tema": "Mover e duplicar dados dentro da planilha.",
        "explicacao": """
Essas quatro ações permitem **reaproveitar** e **reorganizar** dados rapidamente.
O exemplo usa uma planilha *Vendas* com Produto, Categoria e Preço (Teclado 120,00; Mouse 75,00;
Monitor 650,00; Caderno 18,50; Caneta 2,50). Células selecionadas ficam destacadas com borda verde.

| Ação | O que faz | Resultado |
|---|---|---|
| **Selecionar** | Clicar e arrastar sobre as células (ex.: `A2:C4`). | Células destacadas. |
| **Copiar** (Ctrl + C) | Duplica o conteúdo para outro lugar. | Os dados ficam na origem **e** no destino. |
| **Recortar** (Ctrl + X) | Remove o conteúdo e o leva para outro lugar. | Os dados são **movidos**. |
| **Colar** (Ctrl + V) | Insere o que foi copiado/recortado na célula de destino. | Pode ser repetido várias vezes após copiar. |

Os mesmos comandos existem como botões na guia **Página Inicial** (Copiar, Recortar, Colar),
mas os atalhos de teclado tornam o trabalho mais rápido.
""",
        "atalhos": [
            ("Ctrl + C", "Copiar."),
            ("Ctrl + X", "Recortar."),
            ("Ctrl + V", "Colar."),
        ],
        "exercicio": """
**Atividades:**
1. Copiar `A2:C4` e colar a partir de **E2**.
2. Recortar `A5:B6` e colar a partir de **E5**.
3. Copiar a célula **C2** e colar em **C8**.
4. Recortar a célula **B3** e colar em **B8**.
""",
    },
    5: {
        "titulo": "Fonte, tamanho e cor do texto",
        "tema": "Formatação de texto no grupo Fonte da guia Página Inicial.",
        "explicacao": """
Formatar o texto deixa a planilha **mais clara, organizada e profissional**.
Os comandos ficam em **Página Inicial > grupo Fonte**:

| Comando | Função |
|---|---|
| **Fonte** | Altera o tipo de letra (ex.: Calibri). |
| **Tamanho** | Define o tamanho da letra (ex.: 11, 16). |
| **Negrito (N)** | Deixa o texto em negrito. |
| **Itálico (I)** | Deixa o texto inclinado. |
| **Sublinhado (S)** | Sublinha o texto. |
| **Cor do Texto** | Muda a cor das letras. |
| **Cor de Preenchimento** | Muda a cor de fundo da célula. |

**Exemplo prático (Controle de Vendas):** o "antes" é uma tabela sem destaque; o "depois" tem título
maior e em negrito, cabeçalho com fundo verde e letras brancas, valores em azul e o Total (R$ 147,40)
em vermelho e negrito — tudo com os mesmos dados, apenas formatados.

**Dica:** use fonte legível, tamanhos maiores para títulos e cores para destacar informações importantes.
""",
        "exercicio": """
**Exercício:**
1. Digitar o título **"Lista de Compras"** em A1.
2. Formatar o título: Calibri, tamanho 16, negrito e cor verde.
3. Digitar "Arroz", "Feijão" e "Açúcar" em `A3:A5` e os valores 25,90; 8,50; 6,49 na coluna B;
   mudar a cor dos valores da coluna B para azul.
""",
    },
    6: {
        "titulo": "Negrito, itálico, sublinhado e destaque",
        "tema": "Destacar informações importantes com estilos de fonte e cor de realce.",
        "explicacao": """
As opções ficam na guia **Página Inicial**, grupo **Fonte**. Cada uma tem um uso recomendado:

| Opção | Como fica | Para que usar |
|---|---|---|
| **Negrito (N)** | **Texto em negrito** | Títulos, totais e informações principais. |
| **Itálico (I)** | *Texto em itálico* | Enfatizar palavras, nomes de produtos, observações ou dados complementares. |
| **Sublinhado (S)** | Texto sublinhado | Indicar links ou destacar itens específicos. |
| **Destaque (Cor de Realce)** | Fundo amarelo | Chamar atenção para valores, prazos ou alertas. |

**Exemplo prático:** tabela com Produto, Categoria, Vendas, Status e Observações — cabeçalho e TOTAL
(888,90) em negrito, categorias em itálico, "Estoque baixo" em vermelho e "Promoção até 31/05"
com realce amarelo.

**Resumo:** negrito para títulos e totais, itálico para ênfase, sublinhado para destaque específico e
cor de realce para atenção visual. Pequenos ajustes fazem grande diferença na leitura.
""",
        "atalhos": [
            ("Ctrl + N", "Negrito (Excel em português)."),
            ("Ctrl + I", "Itálico."),
            ("Ctrl + S", "Sublinhado (Excel em português)."),
        ],
        "exercicio": """
**Pratique:** abrir a planilha de vendas e aplicar as formatações aprendidas, destacando títulos,
valores importantes e observações.
""",
    },
    7: {
        "titulo": "Alinhamento e quebra de texto",
        "tema": "Posição do conteúdo na célula e exibição em várias linhas.",
        "explicacao": """
O **alinhamento** define como o conteúdo aparece dentro da célula; a **quebra de texto** permite que um
conteúdo longo seja exibido em várias linhas. Ambos ficam em **Página Inicial > grupo Alinhamento**.

**1. Alinhamento horizontal**

| Opção | Resultado |
|---|---|
| **Alinhar à Esquerda** | Texto encostado na borda esquerda (padrão para textos). |
| **Centralizar** | Texto no meio da célula (bom para títulos e cabeçalhos). |
| **Alinhar à Direita** | Texto encostado na borda direita (padrão para números). |

**2. Quebra de texto (Quebrar Texto Automaticamente)**
- *Sem quebrar:* o texto longo é cortado ou invade as células vizinhas ("Este é um texto longo que não cabe...").
- *Com quebrar:* o texto se ajusta à largura da coluna e aparece em várias linhas.
- A altura da linha é ajustada automaticamente; você também pode alargar a coluna para melhorar a visualização.

**Importante:** alinhamento e quebra de texto deixam a planilha organizada, fácil de ler e com aspecto profissional.
""",
        "passos": [
            "Selecione a(s) célula(s).",
            "Na guia **Página Inicial**, grupo **Alinhamento**, clique em Alinhar à Esquerda, Centralizar ou Alinhar à Direita.",
            "Para textos longos, clique em **Quebrar Texto Automaticamente**.",
        ],
    },
    8: {
        "titulo": "Preenchimento automático e séries",
        "tema": "Usar a alça de preenchimento para copiar e criar sequências.",
        "explicacao": """
A **alça de preenchimento** é o pequeno quadrado no **canto inferior direito** da célula selecionada.
Ao arrastá-la (para baixo, cima, direita ou esquerda), o Excel **copia** o valor ou **continua uma série**
automaticamente.

**Exemplos de séries:**
1. **Números** — digite 1 em A1 e arraste: o Excel continua a sequência (1, 2, 3, 4…).
2. **Dias da semana** — digite *Segunda-feira* e arraste: Terça-feira … Domingo.
3. **Meses do ano** — digite *Janeiro* e arraste: Fevereiro … Dezembro.

**Dica:** para séries personalizadas, digite os **dois primeiros valores**, selecione ambos e arraste
(ex.: 2 e 4 → 2, 4, 6, 8, 10…). O Excel entende o intervalo entre eles.
""",
        "passos": [
            "Selecione a célula com o valor inicial da série.",
            "Posicione o mouse sobre a alça de preenchimento (o cursor vira uma cruz preta).",
            "Arraste na direção desejada e solte: o Excel completa a série.",
        ],
        "exercicio": """
**Pratique:** em uma nova planilha,
1. crie uma sequência de 10 números começando em 1;
2. crie os dias da semana;
3. crie os 12 meses do ano;
4. crie uma sequência de números pares começando em 2.
""",
    },
    9: {
        "titulo": "Somando com a fórmula SOMA",
        "tema": "Calcular totais com =SOMA().",
        "explicacao": """
A função **SOMA** adiciona todos os números de um intervalo de células e mostra o resultado em uma única
célula, evitando erros de cálculo manual.

**Exemplo prático — despesas do mês:** Aluguel 1.200,00; Mercado 450,00; Transporte 180,00; Lazer 220,00;
Outros 150,00. Em **B7** a fórmula `=SOMA(B2:B6)` resulta em **2.200,00**.

**Anatomia da fórmula `=SOMA(B2:B6)`:**
- `=` avisa ao Excel que é uma fórmula;
- `SOMA(` indica a função;
- `B2:B6` é o intervalo (os dois-pontos significam "de B2 até B6");
- `)` fecha a função.

**Dicas importantes:**
- SOMA considera apenas números; células vazias ou com texto são ignoradas.
- Para somar células que não estão juntas, separe-as com **ponto e vírgula**: `=SOMA(B2;B4;B6)`.
""",
        "passos": [
            "Clique na célula **B7**, onde o total será exibido.",
            "Digite o sinal de igual `=`.",
            "Digite `SOMA(`.",
            "Selecione o intervalo **B2:B6** (ou digite-o).",
            "Digite o parêntese de fechamento `)` → `=SOMA(B2:B6)`.",
            "Pressione **Enter**: o total aparece em B7.",
        ],
        "exercicio": """
**Pratique:** altere os valores da tabela e observe o total ser recalculado automaticamente.
""",
    },
    10: {
        "titulo": "Como criar uma tabela simples",
        "tema": "Organizar dados em cabeçalhos e linhas, com cálculos de total.",
        "explicacao": """
Uma tabela simples é formada por **cabeçalhos** (títulos das colunas) e **linhas de dados**.
Cada coluna deve guardar **um único tipo de informação**.

**Exemplo:** colunas Produto, Categoria, Quantidade, Preço Unitário e Total (Caderno, Caneta, Lápis,
Mochila, Estojo, Livro, Borracha). Linha 9: **Total Geral** — quantidade 100 e valor **1.277,50**.

**Dica importante (fórmulas):**
- Total de cada item: `=C2*D2` (Quantidade × Preço Unitário), copiado para baixo com a alça de preenchimento.
- Total geral da coluna Total: `=SOMA(E2:E8)`.

**Boas práticas:** nomes claros nos cabeçalhos; evitar mesclar células dentro da tabela; manter números
alinhados à direita; revisar os dados; salvar com frequência.
""",
        "passos": [
            "Digite os cabeçalhos na primeira linha (Produto, Categoria, Quantidade, Preço Unitário, Total).",
            "Abaixo dos cabeçalhos, insira os dados de cada item, um por linha.",
            "Mantenha cada informação na coluna correta e evite células vazias no meio da tabela.",
            "Formate os cabeçalhos (negrito, cor de preenchimento e bordas).",
            "Ajuste a largura das colunas arrastando as bordas do cabeçalho.",
        ],
        "exercicio": """
**Exercício:** criar uma tabela como a do exemplo para controlar despesas de transporte e responder:
quais colunas usou, qual foi o total da despesa e qual fórmula usou para somar os valores.
""",
    },
    11: {
        "titulo": "Aprendendo a fórmula MÉDIA no Excel",
        "tema": "Calcular a média aritmética de um conjunto de números.",
        "explicacao": """
A função **MÉDIA** soma os números e divide pela quantidade de valores. É útil para analisar desempenho,
notas, vendas e gastos.

**Sintaxe:** `=MÉDIA(núm1; [núm2]; ...)` — os argumentos são números ou intervalos.

**Exemplo prático — vendas semanais:** Segunda 125,00; Terça 210,00; Quarta 180,00; Quinta 160,00;
Sexta 195,00. Em **B8**: `=MÉDIA(B3:B7)` → **174,00**.

**Dicas:**
- MÉDIA **ignora células vazias e textos**, considerando só valores numéricos.
- Para células não contíguas: `=MÉDIA(B3;B5;B7)`.
- **Importante:** confira se os números estão em formato numérico (e não como texto), senão o cálculo fica errado.
""",
        "passos": [
            "Selecione a célula onde o resultado será exibido.",
            "Digite `=` e escreva `MÉDIA(`.",
            "Selecione os números ou o intervalo (ex.: `B3:B7`).",
            "Feche o parêntese e pressione **Enter**.",
            "O Excel calcula automaticamente a média.",
        ],
        "exercicio": """
**Atividade prática:** criar a tabela de notas (Ana 8,0/7,5/9,0; Bruno 6,5/7,0/6,0; Carla 9,0/8,5/9,5),
calcular a média de cada aluno, formatar a coluna Média com 1 casa decimal e identificar quem teve a maior média.
""",
    },
    12: {
        "titulo": "Mínimo e máximo no Excel",
        "tema": "Encontrar o menor e o maior valor de um intervalo.",
        "explicacao": """
As funções **MÍNIMO** e **MÁXIMO** retornam, respectivamente, o **menor** e o **maior** valor numérico de
um intervalo. São úteis em análises rápidas, relatórios e validação de dados (identificar extremos).

**Sintaxe:**
- `=MÍNIMO(número1; [número2]; ...)` → menor valor.
- `=MÁXIMO(número1; [número2]; ...)` → maior valor.
- Ambas ignoram células vazias e textos.

**Exemplo — vendas da semana (B2:B8):** Segunda 1.250; Terça 980; Quarta 1.630; Quinta 1.120;
Sexta 2.210; Sábado 1.780; Domingo 950.
- `=MÍNIMO(B2:B8)` em B10 → **950,00** (menor venda).
- `=MÁXIMO(B2:B8)` em B11 → **2.210,00** (maior venda).

**Dica:** também funcionam com células não contíguas: `=MÁXIMO(B2;B5;B7)`.
""",
        "passos": [
            "Selecione a célula do resultado (B10 para o mínimo, B11 para o máximo).",
            "Digite `=MÍNIMO(B2:B8)` ou `=MÁXIMO(B2:B8)`.",
            "Pressione **Enter**.",
            "O Excel retorna o menor ou o maior valor do intervalo.",
        ],
        "exercicio": """
**Atividade prática:** em uma planilha com as notas de uma turma (ex.: intervalo `B2:B20`), usar MÍNIMO e
MÁXIMO para encontrar a menor e a maior nota.
""",
    },
    13: {
        "titulo": "Classificando dados no Excel",
        "tema": "Ordenar dados em ordem alfabética, numérica ou cronológica.",
        "explicacao": """
Classificar organiza as informações e facilita a análise e a tomada de decisão.
Os comandos ficam em **Dados > grupo Classificar e Filtrar**.

**Tabela de exemplo:** Produto, Categoria, Quantidade e Preço Unitário (Caderno, Caneta, Borracha,
Agenda, Clips).

| Tipo | Botões | Uso | Resultado do exemplo |
|---|---|---|---|
| **Alfabética** | A→Z (crescente) / Z→A (decrescente) | Textos: nomes, produtos, cidades. | Produto A→Z: Agenda, Borracha, Caneta, Caderno, Clips. |
| **Numérica** | Menor→Maior / Maior→Menor | Números, quantidades, valores, datas. | Quantidade crescente: 40, 50, 80, 150, 200. |

**Dicas:**
- É possível classificar por mais de uma coluna (ex.: primeiro Categoria A→Z, depois Produto A→Z).
- A classificação **não altera os dados**, apenas a ordem em que aparecem.
- Selecione a tabela inteira para que cada linha continue com seus dados correspondentes.
""",
        "passos": [
            "Selecione a tabela ou o intervalo de células.",
            "Vá até a guia **Dados**.",
            "No grupo **Classificar e Filtrar**, clique em A→Z / Z→A (texto) ou Menor→Maior / Maior→Menor (números).",
            "Escolha a coluna que deseja classificar.",
            "Clique em **OK**.",
        ],
        "exercicio": """
**Atividade prática:** classificar os produtos em ordem alfabética; a coluna Quantidade do menor para o maior;
a coluna Preço Unitário do maior para o menor; salvar como **Classificação_Excel**.
""",
    },
    14: {
        "titulo": "Filtrando informações na tabela",
        "tema": "Exibir apenas as linhas que atendem a um critério.",
        "explicacao": """
Os **filtros** mostram somente as informações que atendem a um critério, facilitando a análise e a
localização de dados em tabelas grandes — as demais linhas ficam ocultas, não apagadas.

**Tabela de exemplo:** ID, Produto, Categoria, Vendedor, Região, Data e Valor (Caneta Azul, Caderno 10M,
Lápis Preto, Marcador, Pasta A4, Caneta Preta, Post-it; vendedores Paulo, Ana e Carlos; regiões Sul,
Sudeste, Norte e Nordeste).

**Filtros avançados (Dica Office Fácil):**
- **Texto contém:** digite parte da palavra.
- **Igual a:** encontra um valor exato.
- **Maior que / Menor que:** filtra valores numéricos.

É possível combinar filtros em várias colunas (ex.: Categoria = Papelaria **e** Vendedor = Ana).
""",
        "passos": [
            "**Selecione a tabela:** clique em qualquer célula dentro dela.",
            "**Ative os filtros:** guia **Dados > Filtro**. Aparecem setas nos cabeçalhos.",
            "**Escolha o critério:** clique na seta da coluna (ex.: Região) e marque só o que deseja ver (ex.: Sul).",
            "**Visualize o resultado:** só as linhas que atendem ao critério são exibidas.",
            "**Refine a busca:** aplique filtros em outras colunas.",
            "**Limpe o filtro:** na seta, escolha *(Selecionar Tudo)* ou use *Limpar* na guia Dados.",
        ],
        "exercicio": """
**Atividade prática:** ativar os filtros; mostrar apenas a categoria **Papelaria**; filtrar as vendas da
região **Sul**; localizar as vendas do vendedor **Paulo** com valor maior que R$ 2,00.
""",
    },
    15: {
        "titulo": "Porcentagens no Excel",
        "tema": "Calcular e formatar percentuais.",
        "explicacao": """
**Porcentagem** representa uma parte de um todo expressa em 100 partes.

**Fórmula:** `(Parte ÷ Todo) × 100 = %`
Exemplo: vendeu 150 de uma meta de 200 → 150 ÷ 200 × 100 = **75%**.

No Excel basta dividir e aplicar o formato **Porcentagem** (não é preciso multiplicar por 100).

**Exemplo — % da meta:** Teclado 150/200 = 75%; Mouse 80/100 = 80%; Monitor 120/150 = 80%;
Headset 60/100 = 60%; Total 410/650 = **63%**. Em D2: `=B2/C2`, formatado como Porcentagem.

**Dica:** digitando o símbolo `%` após o número, o Excel já entende: 25% → 0,25; 150% → 1,5; 10% → 0,10.

**Atenção:** divida sempre a **parte** pelo **todo**; inverter a fórmula gera resultados incorretos.
""",
        "passos": [
            "Digite os valores (ex.: Vendido em B2 e Meta em C2).",
            "Na célula do resultado, digite `=B2/C2`.",
            "Pressione **Enter**.",
            "Selecione a célula com o resultado.",
            "Na guia **Página Inicial**, grupo **Número**, clique em **Porcentagem (%)**.",
            "Ajuste as casas decimais com os botões Aumentar/Diminuir Casas Decimais.",
        ],
        "exercicio": """
**Atividade prática:** criar a tabela de funcionários (Ana Silva 3.750/5.000; Bruno Lima 4.200/4.500;
Carla Souza 2.800/4.000; Diego Alves 5.600/5.000), calcular % de Desempenho (Vendas ÷ Meta), formatar como
porcentagem e descobrir quem atingiu 100% ou mais. **Desafio:** calcular o desempenho médio da equipe.
""",
    },
    16: {
        "titulo": "Congelando linhas e colunas no Excel",
        "tema": "Manter títulos visíveis ao rolar a planilha.",
        "explicacao": """
**Congelar painéis** mantém partes importantes da planilha sempre visíveis enquanto você rola para baixo
ou para os lados — ideal para tabelas grandes.

**Exemplo:** planilha de vendas por produto (Teclado, Mouse, Monitor, Impressora, Fone de Ouvido, Webcam,
Cadeira) de Jan a Jun, com *Total 1º Semestre* (Total geral R$ 45.200,00). Congelando a **linha 1**
(títulos) e a **coluna A** (produtos), eles continuam visíveis ao rolar.

**Opções do botão Congelar Painéis:**
- **Congelar Painéis:** congela as linhas acima e as colunas à esquerda da célula selecionada.
- **Congelar Linha Superior:** congela apenas a primeira linha visível.
- **Congelar Primeira Coluna:** congela apenas a primeira coluna visível.

**Onde encontrar:** **Exibir > Congelar Painéis**. Para desfazer: *Exibir > Congelar Painéis >
Descongelar Painéis*.
""",
        "passos": [
            "Selecione a célula abaixo da linha e à direita da coluna a congelar (para linha 1 e coluna A, selecione **B2**).",
            "Vá até a guia **Exibir**.",
            "No grupo **Janela**, clique em **Congelar Painéis**.",
            "Escolha a opção desejada (Congelar Painéis, Linha Superior ou Primeira Coluna).",
            "Pronto: as linhas/colunas escolhidas permanecem visíveis durante a navegação.",
        ],
        "exercicio": """
**Atividade prática:** criar uma planilha com pelo menos 20 linhas e 8 colunas; preencher a linha 1 com
títulos e a coluna A com nomes; congelar a linha 1 e a coluna A; rolar para confirmar; descongelar e salvar.
""",
    },
    17: {
        "titulo": "Referência relativa e absoluta no Excel",
        "tema": "Como o Excel ajusta as referências ao copiar fórmulas e como fixá-las com $.",
        "explicacao": """
Nas fórmulas, **referências** indicam quais células usar. Existem dois tipos principais:

| Tipo | Exemplo | Comportamento ao copiar a fórmula |
|---|---|---|
| **Relativa** | `A2` | Muda automaticamente conforme a nova posição (A2 → A3 → A4…). |
| **Absoluta** | `$A$1` | Permanece fixa; sempre aponta para a mesma célula. |

**Exemplo da página:** a célula **B1** guarda uma *Taxa* de 10%. Na fórmula `=A2*$A$1`, a parte `A2`
é relativa (acompanha cada linha ao copiar para baixo) e `$A$1` é absoluta (continua apontando para a
célula fixa). Assim, uma única fórmula copiada para várias linhas aplica sempre o mesmo valor de referência.

- O cifrão `$` antes da **letra** fixa a coluna; antes do **número** fixa a linha.
- Referências mistas: `$A1` (coluna fixa) e `A$1` (linha fixa).
- Ao editar a fórmula, a tecla **F4** alterna entre A1 → $A$1 → A$1 → $A1.

> Observação: na imagem original, parte dos textos das seções *Dica* e *Atividade prática* está ilegível
> (caracteres corrompidos na própria arte), e a célula da taxa aparece em B1 enquanto a fórmula cita $A$1.
> Por isso o OCR dessa página traz trechos sem sentido; a explicação acima reconstrói o conceito corretamente.
""",
        "atalhos": [
            ("F4", "Alterna o tipo de referência (relativa, absoluta, mista) ao editar a fórmula."),
            ("$", "Fixa a coluna (antes da letra) e/ou a linha (antes do número)."),
        ],
        "exercicio": """
**Atividade prática (reconstruída):** criar uma coluna de valores e uma célula com uma taxa; escrever a
fórmula com referência absoluta para a taxa (ex.: `=A2*$B$1`), copiar para baixo e conferir que a taxa
continua fixa enquanto os valores mudam linha a linha.
""",
    },
    18: {
        "titulo": "Formatação condicional no Excel",
        "tema": "Destacar automaticamente células que atendem a regras.",
        "explicacao": """
A **formatação condicional** aplica formatos (cores, ícones, barras) às células **com base em regras**
que você define. Facilita a análise e ajuda a identificar informações importantes rapidamente.

**Exemplo — vendas × meta:** Teclado 320/400, Mouse 450/400, Monitor 850/800, Cadeira 620/700,
Mesa 1.250/1.000, Impressora 380/400. Legenda de cores:
- **Verde:** acima da meta;
- **Amarelo:** próximo da meta (entre 90% e 100%);
- **Vermelho:** abaixo da meta.

**Tipos de regra disponíveis:** Regras de Realce das Células (Maior que, Menor que, Entre, Igual a…),
Regras de Primeiros/Últimos, Barras de Dados, Escalas de Cor e Conjuntos de Ícones.

**Usos práticos:** destacar vendas acima da meta, sinalizar valores vencidos em vermelho, visualizar
desempenho com barras de dados e identificar duplicatas.
""",
        "passos": [
            "Selecione o intervalo de células onde deseja aplicar a formatação.",
            "Na guia **Página Inicial**, grupo **Estilos**, clique em **Formatação Condicional**.",
            "Escolha a regra (ex.: *Realçar Regras das Células > É Maior do que*).",
            "Defina o critério (ex.: 400) e o formato (ex.: preenchimento verde).",
            "Clique em **OK**: as células que atendem à condição são destacadas automaticamente.",
        ],
        "exercicio": """
**Atividade prática:** na coluna Vendas (Teclado 280, Mouse 450, Monitor 750, Cadeira 620, Mesa 1.100,
Impressora 360) aplicar: **verde** para valores acima de R$ 500; **amarelo** entre R$ 300 e R$ 500;
**vermelho** abaixo de R$ 300. Salvar como **Formatação Condicional**.
""",
    },
    19: {
        "titulo": "Criando gráficos simples no Excel",
        "tema": "Transformar números em um gráfico de colunas.",
        "explicacao": """
**Gráficos** tornam os dados mais visuais e fáceis de interpretar. O exemplo cria um **gráfico de colunas**
"Vendas por mês (R$)" com: Janeiro 12.500; Fevereiro 15.800; Março 14.200; Abril 18.300; Maio 16.700 —
fica evidente que **abril** teve a maior venda.

**Dica:** gráficos de **colunas** são ideais para comparar valores entre categorias (meses, produtos,
regiões). Use títulos claros e rótulos de dados para que todos entendam a mensagem rapidamente.
""",
        "passos": [
            "**Selecione os dados:** arraste sobre a tabela, incluindo os cabeçalhos.",
            "**Vá até a guia Inserir.**",
            "**Escolha o tipo de gráfico:** no grupo Gráficos, clique em Colunas > **Colunas Agrupadas**.",
            "**Personalize:** use o botão **+ (Elementos do Gráfico)** para adicionar Título, Rótulos de Dados e Legenda.",
            "**Ajuste o layout e o estilo:** em **Design do Gráfico**, escolha estilo e cores.",
            "**Salve o trabalho** para não perder o gráfico.",
        ],
        "exercicio": """
**Atividade prática:** criar um gráfico de colunas com Teclado 3.200, Mouse 2.450, Monitor 6.780,
Fone de Ouvido 1.950 e Impressora 4.120; personalizar com título, rótulos e estilo.
**Desafio:** mudar o gráfico para **linhas** e comparar o resultado.
""",
    },
    20: {
        "titulo": "Projeto prático: controle de gastos no Excel",
        "tema": "Integrar tudo o que foi aprendido em uma planilha de gastos mensais.",
        "explicacao": """
Projeto que reúne os conteúdos das páginas anteriores: digitação, tabela, SOMA, formatação condicional
e gráfico.

**Objetivo:** organizar os gastos mensais, calcular totais por categoria e identificar onde é possível
economizar. **Por que é importante?** Controlar gastos ajuda a tomar melhores decisões financeiras,
evitar desperdícios e planejar o futuro.

**Planilha de exemplo (colunas Data, Descrição, Categoria, Valor, Forma de Pagamento):**

| Data | Descrição | Categoria | Valor (R$) | Pagamento |
|---|---|---|---|---|
| 02/05/2024 | Supermercado | Alimentação | 250,00 | Cartão de Débito |
| 03/05/2024 | Conta de Luz | Moradia | 120,00 | Débito Automático |
| 04/05/2024 | Transporte por aplicativo | Transporte | 45,00 | Pix |
| 05/05/2024 | Almoço fora | Alimentação | 60,00 | Cartão de Crédito |
| 06/05/2024 | Assinatura de streaming | Lazer | 29,90 | Cartão de Crédito |
| 07/05/2024 | Farmácia | Saúde | 38,50 | Cartão de Débito |
| 08/05/2024 | Combustível | Transporte | 150,00 | Cartão de Débito |
| | **TOTAL GERAL** | | **693,40** | |

**Análise dos gastos (gráfico de pizza da página):** Alimentação 36%, Transporte 26%, Moradia 22%,
Lazer 9%, Saúde 7%. *Insight:* Alimentação representa mais de um terço dos gastos.

> Observação: os percentuais do gráfico são ilustrativos. Calculando com os valores da tabela, o resultado
> seria Alimentação ≈ 44,7% (310,00), Transporte ≈ 28,1% (195,00), Moradia ≈ 17,3% (120,00),
> Saúde ≈ 5,6% (38,50) e Lazer ≈ 4,3% (29,90) — um bom exercício de conferência com a fórmula de porcentagem.

**Dicas práticas:** usar *Formatar como Tabela* (Página Inicial > Formatar como Tabela; a página cita
Ctrl + T, atalho do Excel em inglês), SOMA para o total geral, Formatação Condicional para valores altos
e atualizar a planilha sempre que houver novos gastos.
""",
        "passos": [
            "Criar uma nova planilha e nomear a aba como **Gastos_Maio**.",
            "Inserir os cabeçalhos: Data, Descrição, Categoria, Valor (R$) e Forma de Pagamento.",
            "Preencher pelo menos 10 gastos (reais ou fictícios).",
            "Usar a função **SOMA** para o total geral da coluna de valores.",
            "Criar uma tabela resumida com o total por categoria.",
            "Inserir um **gráfico de pizza** com a distribuição dos gastos por categoria.",
            "Salvar como **Controle_de_Gastos_Maio.xlsx**.",
        ],
        "exercicio": """
**Resultado esperado:** uma visão clara dos gastos e de para onde vai o dinheiro, permitindo decisões mais
conscientes sobre o orçamento. *"A prática é o melhor caminho para dominar o Excel!"*
""",
    },
}
