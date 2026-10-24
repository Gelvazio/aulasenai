# Capítulo 03 — Teoria das cores na interface

- **Aula:** 03
- **Capacidade:** C1, S2

## Teoria

### Por que cor é assunto sério

Imagine tentar confirmar uma consulta pelo celular na rua, sob sol forte. Se o botão for
cinza-claro sobre fundo branco, o texto simplesmente desaparece da visão. Cores em telas não são
decoração nem gosto pessoal: são comandos operacionais, mensagens de segurança e legibilidade
vital. Uma escolha cromática descuidada exclui usuários, gera erros de preenchimento e inviabiliza
serviços essenciais.

### O universo cromático digital

Nas telas, as cores não são tinta física: são feixes de luz emitidos por pixels RGB. Essa luz
afeta o cansaço ocular, o foco e a velocidade de decisão. Toda cor tem três componentes:

| Componente | O que é | Efeito na interface |
|---|---|---|
| **Matiz (hue)** | A cor pura: vermelho, azul, amarelo, verde | Define a identidade básica da cor |
| **Saturação** | A pureza e vivacidade da cor | Muito saturada grita e cansa; desaturada acalma |
| **Brilho (luminância)** | A quantidade de luz emitida | Fator decisivo para contraste e legibilidade |

### O círculo cromático e as harmonias

O círculo cromático organiza 12 cores em uma roda contínua, ligando primárias, secundárias e
terciárias. Em design de interface, usamos as relações angulares entre as cores para montar
combinações harmônicas sem poluição visual:

- **Harmonia monocromática:** uma única matiz, variando saturação e brilho. Risco quase zero de
  colisão visual — típica de telas institucionais, painéis bancários e leitura. Atenção: exige
  disciplina para o botão de ação não ficar apagado.
- **Harmonia análoga:** cores vizinhas no círculo (azul, azul-esverdeado, verde). Produzem
  sensação natural e coesa. Use para categorias de conteúdo similares — nunca para diferenciar
  "Salvar" de "Excluir".
- **Harmonia complementar:** cores opostas no círculo (azul × laranja, roxo × amarelo). Criam a
  maior tensão e energia visual — ideal para botões de ação (CTA). ⚠️ Nunca coloque texto fino
  na cor complementar pura sobre fundo complementar sem contraste de brilho: gera vibração
  cromática.

### O significado das cores

| Cor | Mensagem na interface |
|---|---|
| Verde | Sucesso e confirmação: ações concluídas, pagamentos aprovados, sistema saudável |
| Vermelho | Alerta e erro: perigo, falha de envio, saldo negativo, exclusão irreversível |
| Amarelo | Atenção e aviso: conexão lenta, preenchimento pendente, prazo expirando |
| Azul | Ação e informação: links de navegação, status informativos, botões primários |

### Contraste: o pilar fundamental

Contraste não é só colocar duas cores diferentes lado a lado: é a **diferença mensurável de
luminância** entre o texto e o fundo. Sem contraste adequado, até quem tem visão perfeita força
os olhos para ler. O design centrado no ser humano coloca a legibilidade acima de qualquer
preferência estética.

Milhões de pessoas navegam com daltonismo, catarata, glaucoma ou perda natural de visão — e
fatores circunstanciais (sol na tela, brilho reduzido, tela rachada, fadiga) atingem qualquer um.
Quem tem daltonismo vermelho-verde enxerga esses tons como marrom acinzentado: se um formulário
marca o campo obrigatório só trocando a borda para vermelho, o usuário nunca saberá onde errou.

🔑 **Regra de ouro:** nunca confie apenas na cor para transmitir uma mensagem crítica — combine
cor com ícone, texto ou forma.

### Padrões internacionais: WCAG

As diretrizes **WCAG** do W3C são a norma mundial de acessibilidade web. O nível **AA** é a
exigência padrão para produtos comerciais; o nível **AAA** é o máximo, para governos e serviços
críticos.

| Elemento | Taxa mínima de contraste (AA) |
|---|---|
| Texto normal (parágrafos, legendas, menos de 18 pt) | 4,5 : 1 |
| Texto grande (títulos acima de 18 pt ou negrito a partir de 14 pt) | 3,0 : 1 |
| Ícones, bordas e controles de formulário | 3,0 : 1 |

Na prática: barras com taxas de 1,8:1 ou 3,1:1 reprovam para texto corrido; só a partir de 4,5:1
a leitura é confortável. Para conferir no dia a dia, use o WebAIM Contrast Checker, plugins de
editores gráficos ou a ferramenta de desenvolvedor do navegador, que já mostra a nota de
contraste ao inspecionar um texto.

### Arquitetura de uma paleta funcional

A paleta estruturada da unidade curricular tem **5 cores com papéis definidos**:

1. **Primária** — ação principal e identidade visual do serviço (o botão de confirmar);
2. **Secundária** — filtros, abas ativas e apoio visual;
3. **Neutro de fundo** — área de respiro para a visão;
4. **Neutro de texto** — alto contraste (mínimo 4,5:1) para leitura sem esforço;
5. **Alerta/status** — confirmação de vaga ou horário indisponível.

### Erros comuns

- **Efeito carnaval:** cores saturadas diferentes em cada cartão, botão e menu, sem critério
  semântico. Gera sobrecarga cognitiva — o cérebro tenta decodificar cada cor — e perda de
  hierarquia: quando tudo quer atenção, nada se destaca.
- **Falta de hierarquia:** o botão de cancelar com a mesma cor e peso do de confirmar. Em
  correria, o usuário clica no errado. Regra: ação primária ganha cor sólida forte; secundária ou
  cancelamento usa tom neutro ou contorno vazado.

### Estudo de caso (SA 1): a paleta do agendamento

Os usuários relatam: "não consigo enxergar quais horários estão livres" e "apertei sem querer em
cancelar porque os botões pareciam iguais". A missão é projetar e justificar a nova paleta de 5
cores: primária confiável e distinta (ação), secundária análoga (abas e filtros), neutro de
fundo, neutro de texto com contraste 4,5:1 e cor semântica de status. Cada escolha precisa de
justificativa técnica no relatório de entrega — e a avaliação em pares confere completude (5
cores funcionais), harmonia, contraste e justificativa.

## Resumo

- Cor em tela é luz (RGB) e carrega matiz, saturação e brilho — o brilho é o que decide o
  contraste.
- Harmonias do círculo cromático: monocromática (coesão), análoga (suavidade) e complementar
  (destaque e energia para a ação principal).
- As cores têm significado: verde = sucesso, vermelho = erro, amarelo = aviso, azul = ação e
  informação.
- Contraste é diferença mensurável de luminância; WCAG AA exige 4,5:1 para texto normal e 3:1
  para texto grande, ícones e controles.
- Nunca use só a cor para mensagens críticas (daltonismo); combine com ícone ou texto.
- A paleta funcional tem 5 cores com papéis: primária, secundária, neutro de fundo, neutro de
  texto e status — evitando o "efeito carnaval" e a disputa entre botões.

## Glossário

- **Contraste:** diferença de cor, tamanho ou forma que destaca um elemento.
- **Matiz (hue):** a cor pura em si — vermelho, azul, amarelo, verde.
- **Saturação:** pureza e vivacidade da cor.
- **Luminância:** quantidade de luz emitida pela cor; base do contraste.
- **Harmonia:** combinação estruturada de tons no círculo cromático com equilíbrio visual.
- **Acessibilidade:** projeto pensado para permitir uso por pessoas com deficiência ou baixa
  visão.
- **Legibilidade:** facilidade imediata com que caracteres e palavras são reconhecidos e lidos.
- **Paleta funcional:** conjunto de cores com papéis definidos (primária, secundária, neutros e
  status).
- **WCAG:** diretrizes internacionais de acessibilidade web do W3C.
