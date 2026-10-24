# Capítulo 07 — Layout: padrões de leitura F e Z e alinhamento

- **Aula:** 07
- **Capacidade:** C1, S3

## Teoria

### Por onde seus olhos começam

Ao abrir um aplicativo desconhecido, ninguém lê palavra por palavra. Em fração de segundo, o
cérebro busca pontos de ancoragem: títulos maiores, fotos chamativas, cantos iluminados e botões
coloridos. O **layout** decide se essa busca é rápida ou cansativa — ele é o plano estrutural que
organiza textos, botões, formulários e imagens no espaço bidimensional da tela.

Um bom layout responde de imediato a três perguntas do usuário: onde estou? O que posso fazer
nesta tela? Para onde devo ir em seguida?

**A arquitetura da tela** tem três blocos fundamentais:

1. **Cabeçalho (header):** identifica a aplicação, mostra o logotipo e os links essenciais;
2. **Área principal (main content):** concentra artigos, listas, vídeos ou formulários;
3. **Rodapé ou barra de navegação (footer/nav):** suporte secundário, termos legais, contatos ou
   abas fixas no celular.

### A fisiologia do rastreamento visual

Nossos olhos realizam movimentos ultrarrápidos e involuntários chamados **sacadas**, intercalados
por pausas de 200 a 400 milissegundos chamadas **fixações**, em que o cérebro processa o que viu
e decide para onde saltar. O usuário não lê o site inteiro: ele **escaneia** em busca de pistas
visuais.

Pesquisas com mapas de calor (heatmaps) revelam:

- **Topo esquerdo:** o ponto de entrada da leitura ocidental — onde o olhar ancora primeiro;
- **Queda de atenção:** conforme a página rola para baixo, a leitura cai drasticamente;
- **Ancoragem em títulos:** negrito e subtítulos capturam a fixação antes dos parágrafos;
- **Cegueira a banners:** elementos com cara de propaganda na coluna direita são ignorados
  instintivamente.

### O padrão de leitura em F

Identificado em pesquisas clássicas da Nielsen Norman Group, o **padrão em F** ocorre em
interfaces densas de texto, como notícias e blogs:

1. O leitor lê a **linha superior** horizontalmente de ponta a ponta;
2. Desce pela margem esquerda e faz uma **varredura horizontal menor** (braço secundário);
3. Percorre a **coluna vertical esquerda**, lendo só o início de cada parágrafo (haste vertical).

Consequência prática: títulos principais e navegação ficam na barra superior; subtítulos resumem
a ideia logo nas primeiras palavras; bullets e negrito no início das linhas salvam a retenção.

### O padrão de leitura em Z

Quando a página tem pouco texto e forte apelo visual (landing pages, login, banners), os olhos
operam no **padrão em Z**:

1. **Topo esquerdo** — logotipo ou identidade da marca;
2. **Topo direito** — menu rápido ou botão de login;
3. **Diagonal até a base esquerda** — chamada explicativa ou imagem de impacto;
4. **Base direita** — botão de ação decisiva (CTA).

| Padrão em F | Padrão em Z |
|---|---|
| Portais de notícias, documentação, enciclopédias, resultados de busca | Páginas de conversão, boas-vindas, formulários rápidos, apresentações |

Projetar layouts não é obrigar a leitura engessada: é **antecipar** o movimento natural dos olhos
para que a mensagem certa esteja no caminho da visão.

### O poder do alinhamento

O alinhamento conecta visualmente todos os elementos por eixos compartilhados. Nada numa boa
interface é posicionado ao acaso: quando elementos dividem a mesma borda imaginária, o cérebro os
lê como conjunto ordenado e confiável.

- **Alinhamento vertical (eixo Y):** títulos, parágrafos, ícones e campos começam na mesma margem
  esquerda, criando uma linha contínua de escaneamento;
- **Alinhamento horizontal (eixo X):** itens da mesma fileira (botões lado a lado, cartões
  comparativos) ficam equilibrados pela base ou pelo centro óptico.

Um deslocamento de apenas 4 ou 8 pixels fora da linha-guia é percebido instantaneamente: gera
ruído visual e faz o aplicativo parecer inacabado.

| Alinhamento de texto | Uso correto |
|---|---|
| À esquerda | Padrão no mundo ocidental: ponto de partida fixo e previsível para cada linha |
| Centralizado | Apenas títulos curtos (até 2 linhas), selos e mensagens breves de alerta |
| À direita | Tabelas financeiras e valores numéricos — facilita comparar decimais |

⚠️ Evite centralizar parágrafos longos: a margem esquerda irregular cansa a leitura.

### Grades: o esqueleto da tela

A **grade (grid)** é uma armação matemática invisível de colunas, linhas e espaçamentos
uniformes. Em vez de "chutar" posições, o designer ancora blocos em proporções exatas. Seus três
elementos:

1. **Colunas** — áreas verticais onde o conteúdo se acomoda;
2. **Calhas (gutters)** — espaços vazios entre colunas que evitam colisão;
3. **Margens** — respiro entre a borda da tela e o conteúdo útil.

O padrão mais consagrado é a **grade de 12 colunas**: o número 12 é divisível por 2, 3, 4 e 6,
permitindo duas metades (6+6), três cartões (4+4+4) ou quatro blocos (3+3+3+3). Em empresas de
tecnologia, designers usam Design Systems com espaçamentos em múltiplos de 4 ou 8 pixels e grades
responsivas padronizadas — nada se discute "no olho".

### A linha de dobra (above the fold)

Informações vitais não podem depender da sorte de o usuário rolar a tela. A **linha de dobra**
delimita o que aparece imediatamente ao carregar a página, sem rolagem. Nela ficam a proposta de
valor principal, a navegação acessível e o botão de ação.

### Estudo de caso (SA 1): o esboço do agendamento

Antes de abrir softwares, o profissional desenha wireframes de baixa fidelidade no papel. Para a
tela inicial de agendamento escaneável em 5 segundos:

1. Trace a moldura 16:9 e divida em 4 colunas com régua;
2. Logotipo no topo esquerdo e botão "Entrar" no topo direito (topo do Z);
3. Título chamativo nas colunas 1 e 2; botão "Agendar Agora" em destaque na base direita
   (destino do Z).

**Checklist de auditoria do alinhamento:** todos os textos compartilham a mesma guia vertical
esquerda? Nenhum elemento invade as calhas? As margens esquerda e direita têm o mesmo tamanho?

## Resumo

- Ninguém lê a tela palavra por palavra: os olhos saltam em sacadas e fixações, escaneando
  pontos de ancoragem.
- O padrão em F serve para páginas densas de texto (topo, braço secundário e haste esquerda); o
  padrão em Z serve para páginas visuais (logo → menu → chamada → botão de ação na base direita).
- Alinhamento cria conjuntos ordenados: textos longos à esquerda, números à direita e apenas
  títulos curtos centralizados.
- A grade invisível de colunas, calhas e margens (padrão 12 colunas) dá ritmo, facilita o código
  e permite o design responsivo.
- O que é vital fica acima da linha de dobra — sem depender da rolagem.
- O diagnóstico começa no papel: wireframe de baixa fidelidade aplicando padrão de leitura e
  grade.

## Glossário

- **Layout:** organização dos elementos na tela.
- **Padrão F:** leitura em linhas no topo e descida pela margem esquerda.
- **Padrão Z:** leitura em zigue-zague do canto superior esquerdo ao inferior direito.
- **Alinhamento:** posicionamento coordenado em linhas visíveis ou invisíveis comuns.
- **Grade (grid):** sistema de linhas e colunas que guia onde cada elemento se encaixa.
- **Calha (gutter):** espaço vazio entre as colunas da grade.
- **Rastreamento:** movimento e fixações sucessivas dos olhos ao explorar a tela.
- **Linha de dobra:** limite da área visível antes da rolagem.
- **CTA (Call To Action):** botão de ação decisiva, como "Agendar Agora".
- **Wireframe:** esboço estrutural da tela, sem cores nem acabamento visual.
