# Capítulo 02 — Formas geométricas e regras de visualização dos elementos da interface

- **Aula:** 02
- **Capacidade:** C1, S3

## Teoria

### O enigma visual das telas

Quando você abre o seu aplicativo favorito, o que está realmente enxergando? Se retirarmos fotos,
cores chamativas e textos, restam apenas retângulos, círculos e linhas organizados
milimetricamente. O cérebro humano gasta o mínimo de energia possível para interpretar o
ambiente: reconhece contornos geométricos conhecidos em milissegundos. Se um elemento foge das
regras geométricas usuais, o usuário fica confuso e não sabe onde clicar ou onde ler primeiro.

### Formas básicas no design digital

| Forma | Papel na interface | Exemplos |
|---|---|---|
| **Retângulo** | Contêiner universal | Campos de digitação, cartões de conteúdo, área de toque dos botões |
| **Círculo** | Identidade e destaque pontual | Fotos de perfil, selos de notificação, botões flutuantes |
| **Triângulo** | Movimento e direção | Setas de expansão de menu, ícone de reprodução, indicadores de rolagem |

**Por que botões são quase sempre retângulos?** Telas e polegares operam em eixos ortogonais
(horizontal e vertical), e o retângulo acomoda palavras legíveis com preenchimento lateral
confortável (padding), maximizando a área de toque sem desperdiçar espaço vertical.

**Cantos retos × arredondados:** o canto vivo (raio 0 px) transmite seriedade, rigor técnico e
arquitetura formal — comum em painéis corporativos e relatórios densos. O formato pílula (raio
24 px) conduz a atenção para o centro do elemento e transmite simpatia, facilidade e modernidade
— comum em redes sociais e jogos.

### Regras visuais e hierarquia

Uma tela bem construída organiza os elementos em três níveis:

1. **Nível primário (ação principal):** o elemento que deve ser visto primeiro — o botão de
   envio ou o título da tela;
2. **Nível secundário (apoio e contexto):** subtítulos, filtros e botões de apoio que ajudam a
   completar a tarefa sem roubar a cena;
3. **Nível terciário (detalhes opcionais):** avisos de rodapé, termos legais e textos discretos
   em segundo plano.

**Guia visual do olhar:** elementos no topo ou no centro recebem foco prioritário antes da
rolagem, e áreas vazias ao redor de uma forma fazem ela saltar aos olhos.

**Contraste de forma e preenchimento:** entre dois botões lado a lado, o de preenchimento sólido
transmite solidez e prioridade máxima; o de apenas contorno (outline) sinaliza ação secundária ou
cancelamento.

🔑 **Regra de ouro:** nunca use dois botões sólidos concorrentes com o mesmo peso na mesma seção
de tela.

### Equilíbrio e escala proporcional

- **Equilíbrio simétrico:** elementos com o mesmo peso visual espelhados em relação ao eixo
  central da tela. Transmite ordem e estabilidade institucional — típico de telas de login.
- **Equilíbrio assimétrico:** um objeto maior e denso de um lado compensado por vários objetos
  menores do outro. Transmite dinamismo e modernidade editorial.
- **Tensão visual:** ocorre quando elementos desiguais não encontram contraponto, gerando
  desconforto. Evite elementos isolados sem alinhamento.

A **escala proporcional** organiza os tamanhos em níveis: 1× (base — textos de apoio e ícones de
16 a 24 px), 2× (intermediária — títulos de seção e botões principais) e 4× (destaque — banners
de entrada e números de impacto).

### O método do raio-X visual

O primeiro passo do aluno consultor **nunca** é opinar se a tela é bonita ou feia. O método
profissional aplica um "raio-x": desenhar retângulos transparentes em volta de cada bloco de
conteúdo para verificar se alinhamento e proporções fazem sentido.

**Estudo de caso (SA 1) — agendamento on-line:** usuários de celular não encontravam o botão de
confirmar consulta.

1. **Mapear blocos de conteúdo:** retângulos ao redor dos formulários mostraram excesso de
   informação misturada;
2. **Checar a proporção do botão:** a área de toque era menor que o padrão ergonômico de
   44×44 px;
3. **Aplicar contraste sólido:** o botão de contorno cinza virou um retângulo com preenchimento
   forte e cantos arredondados.

### Peso visual e distribuição das formas

O **peso visual** é a força de atração sobre o olhar, formada por três fatores: **tamanho** (área
geométrica do objeto), **contraste** (diferença contra o fundo) e **espaço** (respiro vazio ao
redor da forma). Em sistemas móveis modernos, os retângulos dominam (~80%), seguidos de círculos
(~20%) e triângulos (~10%).

**Checklist do aluno consultor:**

1. **Clareza de contêineres:** cada assunto possui seu próprio cartão delimitado?
2. **Destaque unívoco:** existe apenas um botão sólido principal por seção de tela?
3. **Ergonomia geométrica:** as áreas de toque respeitam o tamanho real dos dedos?

## Resumo

- Toda interface é feita de formas geométricas: retângulos são contêineres, círculos marcam
  identidade e destaque, triângulos indicam direção.
- O cérebro reconhece formas conhecidas em milissegundos; quebrar as regras confunde o usuário.
- Botões são retângulos porque acomodam texto legível e maximizam a área de toque (mínimo de
  44×44 px); cantos vivos soam formais, cantos arredondados (pílula) soam amigáveis.
- A hierarquia organiza a tela em níveis primário, secundário e terciário; um botão sólido por
  seção marca a ação principal.
- Equilíbrio pode ser simétrico (ordem) ou assimétrico (dinamismo); elementos sem contraponto
  geram tensão visual.
- O raio-x visual — retângulos transparentes sobre cada bloco — é o método profissional de
  diagnóstico; o peso visual combina tamanho, contraste e espaço.

## Glossário

- **Hierarquia visual:** ordem de importância que o olhar percebe entre os elementos.
- **Geometria:** uso de figuras matemáticas para compor caixas e botões.
- **Equilíbrio:** distribuição harmônica do peso visual entre os elementos.
- **Proporção:** relação de escala e tamanho relativo entre as partes.
- **Peso visual:** força de atração sobre o olhar (tamanho, contraste, espaço).
- **Raio-X visual:** técnica de desenhar retângulos transparentes para analisar a estrutura.
- **Outline:** botão apenas com borda, sem preenchimento.
- **Pílula:** botão com cantos totalmente arredondados.
- **Contêiner:** bloco que delimita e organiza o conteúdo.
