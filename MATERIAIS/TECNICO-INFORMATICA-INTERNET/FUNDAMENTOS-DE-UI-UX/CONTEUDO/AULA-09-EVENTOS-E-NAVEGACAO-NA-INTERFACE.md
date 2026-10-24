# Aula 09 — AULA 09 EVENTOS E NAVEGACAO NA INTERFACE

**Matéria:** Fundamentos de UI/UX  
**Curso:** Técnico em Informática para Internet  
**Carga horária:** 4 h  
**Conhecimentos da ementa:** (preencher)  
**Capacidades:** (preencher)  
**Estratégias:** Exposição dialogada, análise de exemplos  
**Prática:** (preencher)

## Indicadores

(preencher conforme materia.json)

## Objetivos

(preencher conforme slides)

## Roteiro da aula

| Momento | Tempo (min) | O que acontece |
|----------|-------------|----------------|
| (preencher) | | |
| **Total** | **240** | 4 h com intervalo |

## Conteúdo

Dinâmica da
Interface: Eventos
e Navegação
Como botões reagem e telas se
conectam na prática
Recap: Elementos Visuais de Layout: Tamanho,
Espaço e Repetição
• Tamanho e escala: elementos maiores atraem o olhar primeiro e estabelecem a
hierarquia visual primária da tela.
• Espaçamento e respiro: áreas livres ao redor de blocos evitam sobrecarga cognitiva
e organizam grupos visuais.
• Repetição de padrões: o reuso consistente de fontes, cores e formas cria unidade
estética e previsibilidade.
Pergunta rápida: se todos os elementos de uma tela tiverem o mesmo tamanho e
peso, como o usuário descobre onde clicar primeiro?
Quiz Rápido: Aula Anterior
Qual é o principal benefício de aplicar o princípio de repetição consistente em botões de uma
interface?
Garante que o aplicativo funcione mesmo sem conexão com a internet
Cria previsibilidade visual e facilita o reconhecimento das ações pelo usuário
Permite usar todas as fontes disponíveis no computador ao mesmo tempo
Ocupa todo o espaço em branco da tela sem deixar áreas de respiro
1
2
3
4
Quiz Rápido: Aula Anterior
Qual é o principal benefício de aplicar o princípio de repetição consistente em botões de uma
interface?
Garante que o aplicativo funcione mesmo sem conexão com a internet
Cria previsibilidade visual e facilita o reconhecimento das ações pelo usuário
Permite usar todas as fontes disponíveis no computador ao mesmo tempo
Ocupa todo o espaço em branco da tela sem deixar áreas de respiro
✓
1
2
3
4
O botão fantasma
Você já tocou em um botão no celular e nada
aconteceu na tela? Nenhuma cor mudou,
nenhum som tocou e nenhum ícone de
carregamento apareceu.
Você provavelmente tocou de novo, várias
vezes seguidas, achando que o aparelho travou.
Uma interface sem resposta imediata gera
ansiedade e quebra a confiança.
Learning Objectives
Objectives
• Identificar e descrever os principais tipos
de eventos acionados pelo usuário em
dispositivos móveis e computadores.
• Reconhecer e projetar os cinco estados
visuais fundamentais de componentes
interativos (padrão, hover, ativo,
desabilitado e foco).
• Estruturar fluxos de navegação completos
com mapa de telas, evitando desorientação
e becos sem saída.
Key Vocabulary
Key words
Evento: qualquer
ação física ou do
sistema que dispara
uma resposta na
interface.
Navegação: estrutura
que permite mover-se
entre telas, abas e
seções do sistema.
Fluxo: a sequência
lógica ordenada de
passos para
completar uma meta
no aplicativo.
Feedback: resposta
visual, sonora ou tátil
confirmando que a
ação foi registrada.
CONCEITO BASE
O que é um evento em UI?
Em design de interface, um evento é
qualquer acontecimento detectável
originado pelo usuário ou pelo sistema
operacional.
Quando alguém toca na tela, passa o
mouse sobre um card ou quando o
download de uma foto termina, o sistema
gera uma mensagem interna chamada
evento. A interface escuta esses eventos
para decidir o que transformar na tela.
Os quatro eventos essenciais
Clique ou Toque
Ação primária de ativação
instantânea para abrir links,
acionar botões e marcar opções.
Toque Longo
Pressionar e segurar por mais de
meio segundo, revelando menus
ocultos ou opções de exclusão.
Deslize (Swipe)
Arrastar o dedo pela tela para
mudar fotos num carrossel,
arquivar mensagens ou abrir
gavetas.
Foco e Hover
Passar o cursor em
computadores ou selecionar
campos via teclado, preparando
para digitação.
CONCEITO BASE
O papel crucial do feedback
visual
Em uma máquina mecânica, apertar um
botão oferece resistência física e produz
um estalo audível. No vidro liso do
smartphone, essa física não existe.
Por isso, o design precisa devolver
feedback imediato: alterar a cor da
tecla, exibir ondulações ou acionar uma
vibração leve (háptica). Sem feedback, o
usuário repete comandos
desnecessariamente.
Os três canais de resposta ao usuário
Resposta Visual
Mudança de cor, barra
de progresso, botão
afundado ou animação
de carregamento.
Resposta Sonora
Um bipe curto ou clique
suave confirma que o item
foi selecionado mesmo sem
olhar fixamente.
Resposta Tátil (Háptica)
Pequenos pulsos vibratórios
simulam o toque de chaves
mecânicas e avisam erros críticos.
Estados de componentes: o ciclo de vida
Como um botão comunica sua disponibilidade em tempo real
1
Padrão
Estado inicial
em repouso
pronto para uso.
2
Hover
Cursor
posicionado
sobre o
elemento.
3
Ativo
Momento em
que está
pressionado.
4
Foco
Destacado para
navegação via
teclado.
5
Desabilitado
Opaco e
bloqueado até
ação prévia.
Anatomia visual dos estados
📌
Regra de Acessibilidade
O anel de foco é obrigatório
para pessoas que navegam
usando teclas como Tab.
Um botão desabilitado costuma receber
redução para 40% de opacidade e cursor
bloqueado. Isso comunica claramente
que faltam dados antes de permitir o
clique.
Verificação: Estados Visuais
Um botão desabilitado deve reagir com animações normais de hover e clique para
mostrar que o sistema está funcionando.
Verdadeiro
👍
Falso
👎
Verificação: Estados Visuais
Um botão desabilitado deve reagir com animações normais de hover e clique para
mostrar que o sistema está funcionando.
Verdadeiro
👍
Falso
👎
Por que é isso?
🔑
Componentes desabilitados não devem responder a eventos interativos nem induzir o
usuário a esperar uma ação que está bloqueada.
✓
CONCEITO BASE
O que é fluxo de navegação?
O fluxo de navegação descreve a trilha
percorrida pelo usuário para sair do
ponto de partida e alcançar seu objetivo
dentro da aplicação.
Se uma tela isolada é como um quadro
na parede, a navegação é o corredor que
liga todos os cômodos de uma casa.
Sem corredores organizados, a pessoa
fica presa ou desorientada.
O enigma da orientação humana
Em qualquer interface digital, o usuário se faz
mentalmente três perguntas inconscientes a cada
segundo:
•
1. Onde estou agora? (Qual tela ou seção estou
vendo?)
•
2. De onde eu vim? (Como retorno para a
etapa anterior?)
•
3. Para onde posso ir? (Quais opções reais
posso escolher a seguir?)
Se a tela falhar em responder a qualquer uma
dessas três perguntas, o usuário sente perda de
controle.
Padrões estruturais de navegação
Barra Superior (Top
Bar)
Exibe o título da página
atual, botão de retornar e
ações de contexto rápido.
Barra Inferior (Bottom
Nav)
Comum em celulares, permite
alternar entre 3 a 5 seções
principais com o dedão.
Trilha (Breadcrumb)
Mostra a hierarquia da
página e permite voltar
vários níveis com um clique
direto.
O perigo do beco sem
saída
Um beco sem saída (dead end) ocorre quando
o usuário entra em uma tela ou modal e não
encontra nenhuma forma óbvia de voltar, fechar
ou avançar.
Quando isso acontece, a única alternativa
restante é fechar o aplicativo à força. Projetar
interfaces de qualidade exige garantir que 100%
das telas tenham rotas de escape claras.
CONCEITO BASE
O mapa de navegação
O mapa de navegação é a planta baixa
do sistema. Ele desenha todas as telas
como caixas e as transições como linhas
conectadas.
Construir o mapa antes de desenhar
detalhes visuais revela rotas muito
longas, botões faltando e inconsistências
estruturais no planejamento do sistema.
Transições e continuidade visual
Deslizar Lateral (Push)
Indica avanço para uma tela mais
profunda ou retorno para trás no
fluxo.
Subida Vertical (Modal)
Sinaliza uma subtarefa
temporária, como escrever uma
mensagem ou preencher um
filtro.
Esmaecimento (Fade)
Transição neutra recomendada
para trocas de abas no mesmo
nível hierárquico.
Expansão de Elemento
O próprio card clicado se
expande e vira a nova tela,
mantendo o foco visual intacto.
O ecossistema em vídeo
Observando a dinâmica de microinterações e transições em movimento
Estudo de caso: agendamento escolar
Problema do Usuário
Alunos precisam agendar o uso do laboratório de informática pelo celular, mas
reclamam que não sabem se o pedido foi enviado.
Como consultores de interface, vamos mapear cada etapa do fluxo identificando a
ação necessária e a resposta visual obrigatória em quatro passos progressivos.
Estudo de caso: agendamento escolar
Problema do Usuário
Alunos precisam agendar o uso do laboratório de informática pelo celular, mas
reclamam que não sabem se o pedido foi enviado.
1
Tela 1: Calendário
Toque na data desejada muda o círculo do dia
para cor de destaque ativo.
Estudo de caso: agendamento escolar
Problema do Usuário
Alunos precisam agendar o uso do laboratório de informática pelo celular, mas
reclamam que não sabem se o pedido foi enviado.
1
Tela 1: Calendário
Toque na data desejada muda o círculo do dia
para cor de destaque ativo.
2
Tela 2: Horários
Chips de horários livres em verde; horários
ocupados em estado desabilitado.
Estudo de caso: agendamento escolar
Problema do Usuário
Alunos precisam agendar o uso do laboratório de informática pelo celular, mas
reclamam que não sabem se o pedido foi enviado.
1
Tela 1: Calendário
Toque na data desejada muda o círculo do dia
para cor de destaque ativo.
2
Tela 2: Horários
Chips de horários livres em verde; horários
ocupados em estado desabilitado.
3
Tela 3: Confirmação
Botão de envio exibe indicador giratório e tela de
sucesso com rota de retorno.
Ordene o Fluxo de Agendamento
Organize as etapas da navegação para agendar o laboratório na ordem lógica correta:
A tela final exibe comprovante e botão para voltar ao início
O usuário pressiona o botão de confirmação e vê o carregamento
O sistema exibe e o usuário escolhe o horário livre
O usuário seleciona a data disponível no calendário
1
2
3
4
Ordene o Fluxo de Agendamento
Organize as etapas da navegação para agendar o laboratório na ordem lógica correta:
A tela final exibe comprovante e botão para voltar ao início
O usuário pressiona o botão de confirmação e vê o carregamento
O sistema exibe e o usuário escolhe o horário livre
O usuário seleciona a data disponível no calendário
1
2
3
4
Erros frequentes em navegação móvel
⚠️
Erro Crítico
Esconder opções essenciais em
gavetas laterais profundas sem
deixar pistas visuais na tela inicial.
Outro erro comum é mudar o ícone ou
posição do botão 'Voltar' entre telas
diferentes. A consistência da barra de
navegação reduz o esforço mental do
usuário.
Matriz de transição entre telas
Toque · 90%
Deslize · 70%
Voltar · 50%
Longo · 30%
0
25
50
75
100
% de frequência de uso em aplicativos móveis
Fonte: dados compilados de usabilidade mobile (amostra técnica escolar)
Arquitetura de
informação
Hierarquia antes do código
A forma como organizamos as telas depende do nível
de complexidade da tarefa. Telas principais devem estar
a no máximo dois toques de distância.
1
Nível Raiz: Tela de entrada ou Dashboard
principal com visão geral.
2
Nível de Categoria: Listas, calendários e
catálogos navegáveis.
3
Nível de Detalhe: Ficha específica, formulário
de ação ou confirmação.
Validando fluxos com protótipos rápidos
Antes de programar ou desenhar telas digitais complexas, designers testam os
caminhos navegando com os dedos sobre cartões de papel ou esquemas simples.
Essa técnica encontra becos sem saída em poucos minutos e sem nenhum custo de
desenvolvimento.
Associação de Termos Chave
Relacione as palavras com as definições
Evento
Feedback
Trilha (Breadcrumb)
Fluxo
Linha de navegação que indica o
caminho hierárquico percorrido
Sequência ordenada de passos
para cumprir uma tarefa
Resposta perceptível que confirma
o registro da ação
Ação do usuário que dispara uma
resposta no sistema
A
B
C
D
Associação de Termos Chave
Relacione as palavras com as definições
Evento
Feedback
Trilha (Breadcrumb)
Fluxo
Linha de navegação que indica o
caminho hierárquico percorrido
Sequência ordenada de passos
para cumprir uma tarefa
Resposta perceptível que confirma
o registro da ação
Ação do usuário que dispara uma
resposta no sistema
D
C
A
B
A
B
C
D
Como desenhar o mapa de eventos da tela
Para cada tela que projetamos, devemos
listar uma tabela simples de três colunas:
• 1. Elemento: qual botão, card ou imagem é
interativo.
• 2. Evento: qual ação é esperada (toque,
deslize, foco).
• 3. Destino / Resposta: o que muda
visualmente ou para qual tela o fluxo salta.
Essa tabela é a ponte de comunicação
perfeita entre o designer e o desenvolvedor
front-end.
Checklist contra desorientação do usuário
1
Título visível: toda tela tem um cabeçalho curto informando onde o usuário está.
2
Botão de retorno constante: o ícone de voltar permanece no mesmo local em
todas as telas.
3
Zero becos sem saída: modais e mensagens de erro oferecem botões claros de
fechar ou cancelar.
4
Indicação de seleção ativa: na barra inferior, a aba atual recebe destaque com
cor distinta.
Atividade prática: mapa de navegação mobile
Sua missão de consultor: desenhe em seu
caderno o mapa de navegação de um app
escolar com 3 telas principais: Início,
Biblioteca e Empréstimo.
Para cada tela, indique:
• As setas de ida e volta entre elas.
• O botão de ação principal e seu estado
de feedback.
• A confirmação de que não existe
nenhum beco sem saída.
Desafio de Design: Solução de Beco
Imagine que um usuário entrou na tela de
"Termos de Uso" durante um cadastro e a
tela não tem botão de fechar nem barra
superior. Descreva em três frases curtas
como você corrigiria essa tela adicionando
eventos e navegação adequados.
O que você vai precisar:
🎨🖌️
Caderno ou folha de anotações, lápis ou
caneta
TRANSIÇÃO
Fechando a etapa de UI
Nas últimas aulas, aprendemos a
construir a estrutura física da tela:
formas geométricas, cores, contraste,
tipografia, alinhamento, espaçamento e
agora dinâmica de eventos e
navegação.
Com isso, completamos o domínio da
User Interface (UI) — aquilo que é
visível, tocável e operável no produto
digital.
O próximo passo: User
Experience (UX)
Ter botões bem posicionados e rotas sem becos
sem saída é o mínimo obrigatório. Mas como a
pessoa realmente se sente ao usar a aplicação?
Na próxima aula, entraremos no universo de
User Experience (UX): design centrado no ser
humano, empatia, redução de frustrações e
emoções na interação digital.
Diagnóstico Rápido de Rota
Se um usuário clica em um anúncio e vai a uma tela
sem barra ou botão voltar, que erro de navegação
ocorreu?
Resolva por conta própria e depois confira sua
resposta.
Diagnóstico Rápido de Rota
Se um usuário clica em um anúncio e vai a uma tela
sem barra ou botão voltar, que erro de navegação
ocorreu?
Beco sem saída (dead end)
Identifique a ausência de rota de retorno ou escape
para o usuário.
Recapitulação dos pontos chave
1
Eventos acionam o sistema: toque, clique, deslize e foco são os gatilhos
primários de ação.
2
Feedback dá segurança: cada clique exige retorno visual imediato em seus
cinco estados fundamentais.
3
Navegação responde à tríade: o usuário precisa saber sempre onde está,
de onde veio e para onde pode ir.
Check Your Understanding
Qual conjunto de práticas garante uma navegação de interface dinâmica, clara e acessível aos
usuários?
Remover títulos das telas para economizar espaço e forçar o usuário a explorar por
tentativa e erro
Bloquear a navegação para trás para impedir que o usuário abandone o preenchimento
de formulários
Fornecer feedback visual em todos os estados, manter rota de retorno visível e evitar
becos sem saída
Utilizar apenas gestos complexos de toque longo ocultos sem deixar botões visíveis
1
2
3
4
Check Your Understanding
Qual conjunto de práticas garante uma navegação de interface dinâmica, clara e acessível aos
usuários?
Remover títulos das telas para economizar espaço e forçar o usuário a explorar por
tentativa e erro
Bloquear a navegação para trás para impedir que o usuário abandone o preenchimento
de formulários
Fornecer feedback visual em todos os estados, manter rota de retorno visível e
evitar becos sem saída
Utilizar apenas gestos complexos de toque longo ocultos sem deixar botões visíveis
✓
1
2
3
4

## Exercícios em sala

(preencher conforme slides)

## Leitura complementar

(preencher)

## Referências

- EMENTA-CHALKIE-AI.md v2.0
- EMENTA-PRINCIPAL-TECNICO-INFORMATICA-INTERNET.md

## Glossário

(preencher)

## Anexos

- Slides: CONTEUDO/9-Dinâmica-da-Interface-Eventos-e-Navegação.pdf
