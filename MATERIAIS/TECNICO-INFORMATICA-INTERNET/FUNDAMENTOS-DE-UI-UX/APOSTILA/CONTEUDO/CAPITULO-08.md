# Capítulo 08 — Layout: tamanho, espaçamento, texturas, fontes e repetição

- **Aula:** 08
- **Capacidade:** C1, S2

## Teoria

### O que seus olhos procuram primeiro

Ao abrir um aplicativo, seu cérebro decide em menos de 50 milissegundos: ele reage a pesos,
contrastes e volumes visuais antes de processar qualquer palavra. Se tudo compete pela atenção,
nada é absorvido com clareza.

### Escala e tamanho: o peso da relevância

O tamanho relativo é a ferramenta primária para definir o que o usuário vê primeiro, depois e por
último. Um elemento maior sugere importância hierárquica automática, ancorando o olhar antes da
leitura analítica. Tamanho não é "fazer grande": é estabelecer proporções matemáticas harmônicas.

**Hierarquia visual em três níveis de leitura:**

1. **Títulos** — o gancho da página: concisos, legíveis à distância;
2. **Subtítulos** — agrupam tópicos e contextualizam quem está só escaneando;
3. **Corpo** — detalhes completos, com tamanho confortável (16 a 18 px) para leitura contínua.

| Degrau da escala tipográfica | Uso |
|---|---|
| Legendas (12–14 px) | Metadados e notas de rodapé |
| Corpo (16–18 px) | Padrão base de leitura contínua |
| Subtítulo (20–24 px) | Divisores de seções e cartões |
| Título H1 (32–40 px) | Impacto máximo de abertura |

Em telas móveis, tamanho é questão de ergonomia: dedos não têm a precisão de um ponteiro de
mouse, por isso as diretrizes recomendam áreas de toque mínimas de **48×48 px**. Botões com menos
de 32 px causam toques acidentais e frustração.

### Espaço em branco: o silêncio necessário

O espaço em branco (espaço negativo) não é desperdício: é um elemento ativo tão poderoso quanto
uma imagem. Ele deixa o cérebro respirar, separa blocos de ideias e guia o olhar sem linhas ou
bordas pesadas. Interfaces amontoadas provocam fadiga visual — e o espaço negativo ampliado
aumenta a velocidade de compreensão da tela em até 20%.

**A lei da proximidade:** elementos próximos são percebidos como parte da mesma categoria. O
rótulo de um campo deve estar mais perto do seu próprio campo do que do bloco anterior, e
margens externas maiores dispensam linhas divisórias entre seções.

### O sistema de grade de 8 pontos

Todos os espaçamentos usam múltiplos de 8 (8, 16, 24, 32, 40, 48 px) — fim de valores aleatórios
como 11 ou 17 px:

| Medida | Uso |
|---|---|
| Micro (8 px) | Distância entre ícone e texto dentro do mesmo botão |
| Padrão (16 px) | Separação entre parágrafos e elementos do mesmo bloco |
| Médio (24 px) | Distância entre cartões adjacentes em uma grade |
| Macro (32 px) | Separação nítida entre o cabeçalho e o conteúdo central |

A escala dá ritmo visual em qualquer resolução e facilita o código CSS com variáveis
padronizadas.

### Profundidade e texturas sutis

Interfaces modernas abandonaram as texturas pesadas do esqueumorfismo. A profundidade hoje vem
de elevação, sobreposição e sombras difusas sutis (blur alto, opacidade de 10% a 15%) — criando
uma ordem natural de camadas:

| Camada | Papel |
|---|---|
| Fundo base | Camada mais profunda; estabilidade e contraste |
| Superfície do cartão | Levemente mais clara que o fundo; agrupa dados sem bordas agressivas |
| Estado de foco (hover) | Sombra aumenta ao passar o mouse: comunica item ativo |
| Janela modal | Elevação máxima, com fundo escurecido (scrim), para decisões críticas |

### O princípio da repetição

Características visuais devem ser reutilizadas sistematicamente por toda a interface: as mesmas
fontes, cores, raios de arredondamento, formatos de caixas e estilos de ícones. A repetição amarra
elementos dispersos e constrói unidade.

**O que repetir:**

- **Botões e ações:** mesma cor, altura e arredondamento em todas as telas;
- **Estilo de ícones:** nunca misturar ícones sólidos com ícones de linha fina na mesma tela;
- **Estrutura de cartões:** itens do mesmo valor hierárquico usam a mesma moldura e proporção.

A **consistência** é o resultado da repetição bem planejada, em dois níveis: **interna** (mesmas
regras dentro da tela e entre telas do app) e **externa** (alinhamento com convenções da
internet: carrinho no topo direito, logo à esquerda).

**Erros comuns de poluição visual:** textos e botões encostando nas bordas; misturar quatro ou
cinco famílias tipográficas; botões de 37 px numa tela e 54 px na seguinte; bordas grossas onde
24 px de espaço vazio resolveriam.

### O guia visual (style guide)

O **guia visual** é o documento oficial que registra as decisões visuais do projeto — o "livro de
regras" da interface. Qualquer designer ou programador consulta o guia para saber a fonte, a cor
exata do botão primário e a margem entre blocos.

**Guia mínimo da página de agendamento (SA 1):**

1. **Escala de fontes:** H1 = 32 px (bold), H2 = 24 px, corpo = 16 px;
2. **Grade de espaços:** 8 px (interno), 16 px (itens), 32 px (seções);
3. **Botões e cartões:** botão com altura 48 px, raio 8 px e padding 16 px; cartão com raio
   12 px.

Quando botões mudam de cor sem critério ou textos aparecem desalinhados, o usuário conclui: "se
este site não cuida dos próprios botões, meus dados não estão seguros aqui". A consistência
visual é a representação gráfica do cuidado e do respeito com o tempo do usuário.

## Resumo

- O tamanho define a ordem de leitura: três níveis (título, subtítulo, corpo) e escala
  tipográfica com degraus definidos em pixels.
- Espaço em branco é elemento ativo: reduz a fadiga, agrupa pela lei da proximidade e dispensa
  divisórias.
- O sistema de 8 pontos (8, 16, 24, 32 px) padroniza micro a macro espaçamentos e facilita o
  CSS.
- Profundidade moderna usa sombras sutis e camadas (fundo, cartão, hover, modal) — não texturas
  pesadas.
- A repetição de fontes, cores, botões e cartões gera consistência interna e externa — e a
  consistência transmite profissionalismo e confiança.
- O guia visual documenta a escala de fontes, a grade de espaços e a anatomia do botão padrão
  (48 px, raio 8 px, padding 16 px).

## Glossário

- **Tipografia:** organização de letras e fontes que dá legibilidade e tom visual.
- **Espaçamento:** distância intencional entre elementos que define agrupamento e respiro.
- **Repetição:** reutilização consciente de padrões iguais que criam ritmo e aprendizado.
- **Consistência:** regras visuais coerentes em todas as telas, gerando previsibilidade e
  confiança.
- **Espaço em branco:** área vazia ativa que separa blocos e deixa a tela respirar.
- **Lei da proximidade:** elementos próximos são percebidos como do mesmo grupo.
- **Guia visual (style guide):** documento que registra as decisões visuais do projeto.
- **Raio (border radius):** medida do arredondamento dos cantos de um elemento.
- **Modal:** janela de camada máxima que exige uma decisão antes de continuar.
