# Capítulo 09 — Eventos e navegação na interface

- **Aula:** 09
- **Capacidade:** C2, S1

## Teoria

### O botão fantasma

Você já tocou num botão do celular e nada aconteceu? Nenhuma cor mudou, nenhum som, nenhum
indicador de carregamento — e você tocou de novo, achando que o aparelho travou. Uma interface
sem resposta imediata gera ansiedade e quebra a confiança.

### O que é um evento em UI

Um **evento** é qualquer acontecimento detectável originado pelo usuário ou pelo sistema: um
toque na tela, o mouse sobre um cartão ou o fim de um download. A interface escuta esses eventos
para decidir o que transformar na tela.

**Os quatro eventos essenciais:**

| Evento | O que é | Uso típico |
|---|---|---|
| Clique ou toque | Ativação instantânea | Abrir links, acionar botões, marcar opções |
| Toque longo | Pressionar por mais de meio segundo | Revelar menus ocultos, opções de exclusão |
| Deslize (swipe) | Arrastar o dedo pela tela | Carrossel de fotos, arquivar mensagens, abrir gavetas |
| Foco e hover | Cursor sobre o elemento ou seleção via teclado | Preparar campos para digitação |

### O papel crucial do feedback

Numa máquina mecânica, apertar um botão oferece resistência física e um estalo. No vidro liso do
smartphone, essa física não existe — o design precisa devolver **feedback imediato**, por três
canais:

- **Visual:** mudança de cor, barra de progresso, botão afundado, animação de carregamento;
- **Sonoro:** bipe curto ou clique suave confirmando a seleção;
- **Tátil (háptico):** pequenos pulsos vibratórios que simulam teclas mecânicas.

Sem feedback, o usuário repete comandos desnecessariamente.

### Estados dos componentes: o ciclo de vida

Um botão comunica sua disponibilidade em tempo real por cinco estados:

1. **Padrão** — repouso, pronto para uso;
2. **Hover** — cursor posicionado sobre o elemento;
3. **Ativo** — momento em que está pressionado;
4. **Foco** — destacado para navegação via teclado (o anel de foco é obrigatório para quem
   navega pela tecla Tab);
5. **Desabilitado** — opaco (~40% de opacidade) e bloqueado até uma ação prévia.

🔑 Componentes desabilitados não respondem a eventos nem induzem o usuário a esperar uma ação
bloqueada.

### O que é fluxo de navegação

O **fluxo de navegação** é a trilha percorrida para sair do ponto de partida e alcançar o
objetivo. Se uma tela é um quadro na parede, a navegação é o corredor que liga os cômodos — sem
corredores organizados, a pessoa fica presa ou desorientada.

A cada segundo, o usuário se pergunta inconscientemente: **onde estou agora? De onde eu vim?
Para onde posso ir?** Se a tela falhar em qualquer uma das três, ele sente perda de controle.

**Padrões estruturais de navegação:**

| Padrão | Função |
|---|---|
| Barra superior (top bar) | Título da página atual, botão de retornar e ações de contexto |
| Barra inferior (bottom nav) | Alterna entre 3 a 5 seções principais com o polegar (celular) |
| Trilha (breadcrumb) | Mostra a hierarquia e permite voltar vários níveis com um clique |

### O perigo do beco sem saída

Um **beco sem saída (dead end)** ocorre quando o usuário entra numa tela ou modal e não encontra
forma óbvia de voltar, fechar ou avançar — a única saída é fechar o aplicativo à força. Projetar
interfaces de qualidade exige que **100% das telas tenham rotas de escape claras**.

### O mapa de navegação

O mapa de navegação é a planta-baixa do sistema: todas as telas como caixas e as transições como
linhas. Construí-lo antes dos detalhes visuais revela rotas longas, botões faltando e
inconsistências estruturais.

**Transições e continuidade visual:**

| Transição | Significado |
|---|---|
| Deslizar lateral (push) | Avanço para tela mais profunda ou retorno no fluxo |
| Subida vertical (modal) | Subtarefa temporária: mensagem, filtro |
| Esmaecimento (fade) | Troca de abas no mesmo nível hierárquico |
| Expansão de elemento | O cartão clicado se expande e vira a nova tela |

**Arquitetura de informação:** telas principais devem estar a no máximo dois toques de distância.
Os níveis são: raiz (dashboard), categoria (listas e catálogos) e detalhe (ficha, formulário,
confirmação). Antes de programar, designers validam os caminhos navegando com os dedos sobre
cartões de papel — técnica que encontra becos sem saída em minutos e sem custo.

### Como desenhar o mapa de eventos da tela

Para cada tela, monte uma tabela de três colunas — a ponte entre designer e desenvolvedor:

| Elemento | Evento | Destino / resposta |
|---|---|---|
| Botão "Confirmar" | Toque | Indicador giratório → tela de sucesso |
| Chip de horário | Toque | Verde (livre) marca seleção; desabilitado não reage |
| Cartão de consulta | Toque longo | Abre menu de opções (remarcar, cancelar) |

### Estudo de caso (SA 1): agendamento escolar

Alunos agendam o laboratório de informática pelo celular, mas não sabem se o pedido foi enviado.
O fluxo corrigido em três telas:

1. **Calendário:** o toque na data muda o círculo do dia para a cor de destaque;
2. **Horários:** chips livres em verde e ocupados em estado desabilitado;
3. **Confirmação:** o botão de envio exibe indicador giratório e a tela de sucesso traz rota de
   retorno.

**Erros frequentes em navegação móvel:** esconder opções essenciais em gavetas laterais
profundas sem pistas visuais, e mudar o ícone ou a posição do botão "Voltar" entre telas — a
consistência da barra reduz o esforço mental.

**Checklist contra desorientação:**

1. Toda tela tem título curto informando onde o usuário está;
2. O botão de voltar fica sempre no mesmo lugar;
3. Zero becos sem saída: modais e erros oferecem fechar ou cancelar;
4. A aba atual da barra inferior recebe destaque com cor distinta.

Com este capítulo fechamos o domínio da **User Interface** — o que é visível, tocável e operável.
O próximo passo é a **User Experience**: como a pessoa realmente se sente ao usar a aplicação.

## Resumo

- Evento é a ação do usuário ou do sistema que dispara resposta: clique/toque, toque longo,
  deslize e foco/hover são os essenciais.
- Todo evento exige feedback imediato — visual, sonoro ou tátil — senão o usuário repete
  comandos e desconfia do sistema.
- Componentes têm cinco estados: padrão, hover, ativo, foco e desabilitado (que não reage nem
  finge que vai reagir).
- Navegação responde à tríade: onde estou, de onde vim, para onde posso ir — com barra superior,
  barra inferior e breadcrumbs.
- Beco sem saída é erro crítico: 100% das telas precisam de rota de escape clara.
- O mapa de navegação (telas + transições) e o mapa de eventos (elemento → evento → resposta)
  são desenhados antes do visual e testados em papel.

## Glossário

- **Evento:** ação do usuário ou do sistema que dispara uma resposta da interface.
- **Navegação:** caminhos que levam o usuário de uma tela a outra.
- **Fluxo:** sequência lógica ordenada de passos para completar uma meta no aplicativo.
- **Feedback:** resposta visual, sonora ou tátil confirmando que a ação foi registrada.
- **Breadcrumb (trilha):** linha que mostra a hierarquia percorrida e permite voltar níveis.
- **Beco sem saída (dead end):** tela sem forma óbvia de voltar, fechar ou avançar.
- **Modal:** subtarefa temporária que sobe sobre a tela e exige decisão.
- **Mapa de navegação:** planta-baixa do sistema com telas e transições.
