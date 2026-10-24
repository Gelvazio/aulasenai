# 18 Mock Ups Digitais e Criação


## Slide 1

Mock-Ups Digitais 
e Criação
Do rascunho de papel à representação 
visual fiel da interface


## Slide 2

Recap: Prototipagem: Storyboard e Protótipos 
de Papel
•
O storyboard narrou a jornada e o contexto real 
de uso antes de qualquer desenho técnico de 
interface.
•
O protótipo de papel permitiu testar fluxos e 
ações de forma rápida, com custos mínimos e 
ajustes imediatos.
•
A simulação com colegas validou a ordem das 
ações e revelou dúvidas de navegação antes do 
código.
Qual foi a principal vantagem de simular a tela no 
papel antes de ir para o computador?


## Slide 3

Checagem Rápida
Por que realizamos testes de usabilidade com protótipos de papel antes de criar mock-ups 
digitais?
Para definir as cores hexadecimais definitivas e as fontes finais
Para registrar os direitos autorais da marca antes da publicação
Para gerar o código de programação front-end de forma automática
Para validar fluxos e corrigir falhas de navegação rapidamente sem custo
1
2
3
4


## Slide 4

Checagem Rápida
Por que realizamos testes de usabilidade com protótipos de papel antes de criar mock-ups 
digitais?
Para definir as cores hexadecimais definitivas e as fontes finais
Para registrar os direitos autorais da marca antes da publicação
Para gerar o código de programação front-end de forma automática
Para validar fluxos e corrigir falhas de navegação rapidamente sem custo
✓
1
2
3
4


## Slide 5

Learning Objectives
1
Diferenciar fidelidades
Distinguir rascunhos de papel de mock-ups digitais 
estáticos de média e alta fidelidade.
2
Operar ferramentas de layout
Organizar telas usando camadas, grupos, 
componentes reutilizáveis e regras de contraste.
3
Construir e avaliar telas
Criar o mock-up digital de agendamento e avaliar o 
acabamento estético em grupo.


## Slide 6

Key Vocabulary
Mockup: Modelo 
visual detalhado e 
estático que 
representa o produto 
digital final.
Componente: 
Elemento de interface 
padronizado e 
reutilizável em várias 
telas do sistema.
Camada: Nível 
individual de 
sobreposição gráfica 
onde cada elemento 
reside e pode ser 
editado.
Composição: Arranjo 
ordenado de cores, 
tipografia, espaços e 
formas em uma 
mesma tela.


## Slide 7

O Salto para o Digital
Depois de validar o protótipo de papel e o 
storyboard, chega o momento de dar forma, cor 
e acabamento profissional à interface do usuário.
Mas por que não começamos diretamente 
desenhando no computador desde a primeira 
aula?


## Slide 8

Níveis de Fidelidade em UI
Baixa Fidelidade
Foco em estrutura e fluxo. 
Feito à mão ou com wireframes 
simples em tons de cinza, sem 
preocupação estética.
Média Fidelidade
Alinhamento e proporções 
exatas no software, mas ainda 
sem paleta de cores definitiva 
ou fotografias finais.
Alta Fidelidade
O mock-up final: cores, 
tipografia, ícones, fotos e 
contrastes aplicados com 
precisão pixel a pixel.


## Slide 9

O que é um Mock-Up Digital?
Um mock-up digital é um modelo estático de alta 
fidelidade que demonstra exatamente como a 
interface se parecerá quando for lançada.
•
Não possui código: Não há programação nem 
banco de dados funcionando por trás.
•
Estático: Serve para inspecionar hierarquia, 
harmonia de cores e legibilidade.
•
Guia técnico: Orienta desenvolvedores front-end 
sobre espaçamentos e estilos exatos.
📌
Definição
O mock-up responde à pergunta: 'Como 
essa tela vai ficar visualmente?'


## Slide 10

Anatomia de um Editor Gráfico
Softwares de design e prototipagem compartilham uma estrutura universal: prancheta 
central (canvas), barra de ferramentas (formas, texto, vetores), lista lateral de camadas 
e painel de propriedades de estilo (cores, tipografia, efeitos).


## Slide 11

Painéis e Funções Essenciais
Prancheta (Frame)
O espaço de tela com as 
dimensões exatas do dispositivo 
escolhido (ex: 375×812 px para 
celular).
Barra de Criação
Ferramentas de retângulo, elipse, 
linha, caixa de texto e caneta para 
construir botões e cartões.
Painel de Camadas
Árvore hierárquica que lista todos 
os objetos criados, organizados de 
baixo para cima.
Painel de Estilos
Configurações de preenchimento, 
contorno, raio de borda, 
opacidade, fonte e alinhamento.


## Slide 12

Transposição: Do Papel ao Software
Regras de Tradução Visual
Ao passar o esboço para o editor digital, 
aplicamos os conceitos estudados nas aulas 
anteriores:
•
Formas geométricas (Aula 2): Retângulos 
viram botões e cards; círculos viram avatares 
de usuário.
•
Cores e Contraste (Aula 3): Fundo e texto 
devem respeitar a proporção mínima de 
legibilidade (WCAG).
•
Padrão de Leitura (Aula 7): Informações 
cruciais dispostas no padrão Z ou F na tela.


## Slide 13

A Lógica das Camadas (Layers)
Assim como folhas de acetato transparentes, 
elementos digitais ficam dispostos em uma ordem de 
empilhamento vertical:
•
Fundo na base: Retângulos de plano de fundo 
sempre ficam no final da lista de camadas.
•
Conteúdo no topo: Textos e ícones devem ficar 
acima dos cards para permanecerem visíveis.
•
Problema comum: Se um texto sumir na tela, 
verifique se ele não caiu para trás do retângulo do 
card!
⚠️
Erro comum
Deixar camadas com nomes padrão como 
'Retângulo 54' ou 'Grupo 12' torna a edição 
confusa.


## Slide 14

Ordem das Camadas
Ordene as camadas da base (fundo da tela) até o topo (mais visível ao usuário):
Rótulo de texto do botão
Botão de ação principal
Card retangular com cantos arredondados
Plano de fundo da tela (background)
1
2
3
4


## Slide 15

Ordem das Camadas
Ordene as camadas da base (fundo da tela) até o topo (mais visível ao usuário):
Rótulo de texto do botão
Botão de ação principal
Card retangular com cantos arredondados
Plano de fundo da tela (background)
1
2
3
4


## Slide 16

O Poder dos Componentes
Um componente é um bloco mestre reutilizável 
de interface. Em vez de redesenhar o mesmo 
botão em 10 telas diferentes, você cria um único 
componente mestre e gera instâncias dele.
•
Consistência instantânea: Se mudar o raio da 
borda no mestre, todas as cópias atualizam 
automaticamente.
•
Economia de tempo: Evita trabalho repetitivo e 
garante que todo o sistema fale a mesma 
linguagem visual.
•
Princípio de Repetição (Aula 8): Garante 
unidade e coerência em todo o produto.


## Slide 17

Nossa Situação de Aprendizagem
O Desafio do Agendamento On-line
Como aluno consultor de UI/UX, seu trabalho é 
redesenhar o fluxo de agendamento de consultas que 
recebia queixas de confusão no celular.
Você já pesquisou cenários, montou storyboard e 
testou o protótipo de papel. Agora, construirá o mock-
up digital das duas telas fundamentais:
1.Tela 1: Seleção de Especialidade e Data do 
Atendimento.
1.Tela 2: Confirmação dos Dados e Horário 
Escolhido.


## Slide 18

Passo a Passo da Criação Digital
1
Criar o Frame
Definir o tamanho 
exato da tela do 
celular.
2
Grade e Blocos
Posicionar os blocos 
estruturais do papel.
3
Estilo Visual
Aplicar cores, 
tipografia, contraste e 
ícones.
4
Organizar Tudo
Renomear camadas e 
criar componentes.


## Slide 19

Construção Prática: Etapa 1
Problema de Design
Criar o mock-up digital da tela de seleção de especialidade para o aplicativo de 
agendamento móvel.
1
Frame: 375 × 812 px
Configurar prancheta com fundo neutro 
escuro ou claro padronizado.


## Slide 20

Construção Prática: Etapa 2
Problema de Design
Criar o mock-up digital da tela de seleção de especialidade para o aplicativo de 
agendamento móvel.
1
Frame: 375 × 812 px
Configurar prancheta com fundo neutro 
escuro ou claro padronizado.
2
Header e Barra de Título
Adicionar ícone de voltar, título 'Agendar 
Consulta' e indicador de progresso.


## Slide 21

Construção Prática: Etapa 3
Problema de Design
Criar o mock-up digital da tela de seleção de especialidade para o aplicativo de 
agendamento móvel.
1
Frame: 375 × 812 px
Configurar prancheta com fundo neutro escuro 
ou claro padronizado.
2
Header e Barra de Título
Adicionar ícone de voltar, título 'Agendar 
Consulta' e indicador de progresso.
3
Cards e Botão Primário
Construir cards de especialidade reutilizáveis e 
o botão destacado 'Avançar'.


## Slide 22

Vídeo: Criando Mockups na Prática


## Slide 23

Regras de Espaçamento e Grade (Grid)
Em interfaces profissionais, nada fica solto 'no 
olho'. Usamos a regra da grade de 8 pixels:
•
Múltiplos de 8: Espaçamentos entre cards, 
margens e alturas de botões usam 8, 16, 24 
ou 32 px.
•
Ritmo e harmonia: Garante que o usuário 
sinta equilíbrio e conforto visual automático.
•
Alinhamento nas bordas: Mantenha 
margens laterais consistentes (geralmente 16 
ou 24 px do limite da tela).


## Slide 24

Hierarquia Tipográfica no Mock-Up
O olhar do usuário precisa saber 
imediatamente o que ler primeiro (Hierarquia 
Visual, Aula 8):
Título da Tela (24–28 px)
Informa o objetivo imediato (ex: 'Escolha a 
Data')
Subtítulos e Rótulos (16–18 px)
Nomes dos campos, especialidades ou botões
Texto de Apoio e Legendas (12–14 px)
Instruções secundárias e mensagens de ajuda


## Slide 25

Conceitos de Design Digital
Relacione as palavras com as definições
Mockup
Camada
Composição
Componente
Representação visual estática e 
detalhada da tela final
Arranjo equilibrado de formas, 
cores e textos no espaço
Nível individual de empilhamento 
onde cada objeto reside
Elemento padronizado reutilizável 
em várias pranchetas
 
 
 
 
A
B
C
D


## Slide 26

Conceitos de Design Digital
Relacione as palavras com as definições
Mockup
Camada
Composição
Componente
Representação visual estática e 
detalhada da tela final
Arranjo equilibrado de formas, 
cores e textos no espaço
Nível individual de empilhamento 
onde cada objeto reside
Elemento padronizado reutilizável 
em várias pranchetas
A
C
B
D
A
B
C
D


## Slide 27

Documentação do Processo Criativo
Um consultor de UI/UX profissional não entrega 
apenas telas bonitas; ele entrega a justificativa 
de cada decisão:
•
Registro de decisões: Por que escolhemos 
azul ciano? (Para transmitir calma e 
profissionalismo na área de saúde).
•
Registro de alterações: Quais problemas 
observados no protótipo de papel foram 
corrigidos no digital?
•
Ficha técnica: Tamanhos de fontes, códigos 
de cores hexadecimais e espaçamentos 
anotados.


## Slide 28

Verificação de Fidelidade Estrutural
1. O Papel Testado
A ordem dos passos e as funções 
validadas com os colegas na aula 17 
são a base obrigatória.
Se o botão estava no canto inferior no papel, 
deve permanecer no mesmo lugar no digital.
2. A Tela Digital
O mock-up traz precisão geométrica, 
acabamento estético e cores sem 
quebrar a lógica anterior.
O digital melhora a legibilidade e o contraste, 
mas não inventa passos que não foram 
testados.


## Slide 29

Verificação de Fidelidade
Ao passar o protótipo de papel para o mock-up digital, é recomendável adicionar 
novas etapas ao fluxo sem antes testá-las.
 Verdadeiro
👍
 Falso
👎


## Slide 30

Verificação de Fidelidade
Ao passar o protótipo de papel para o mock-up digital, é recomendável adicionar 
novas etapas ao fluxo sem antes testá-las.
 Verdadeiro
👍
 Falso
👎
 Por que é isso?
🔑
Alterar o fluxo sem teste prévio quebra a validação feita no papel e pode introduzir novos 
erros de usabilidade.
✓


## Slide 31

Critérios de Avaliação Coletiva
1
Estrutura
Alinhamento e 
proporção dos 
blocos.
2
Legibilidade
Contraste de cor e 
fontes adequadas.
3
Consistência
Uso de componentes 
e botões 
padronizados.
4
Acabamento
Organização de 
camadas e detalhes 
visuais.


## Slide 32

Métricas de Avaliação dos Mock-Ups
Contraste · 90%
Grade · 80%
Camadas · 85%
Componentes · 
75%
0
25
50
75
100
porcentagem de conformidade esperada na entrega
Fonte: Rubrica avaliativa de desempenho técnico do módulo SENAI


## Slide 33

Apresentação dos Trabalhos em Sala
Apresentar seu design faz parte da vida de um 
profissional. Durante a rodada de feedback 
coletivo em duplas:
•
Pratique a amabilidade (Capacidade S4): 
Feedbacks devem ser construtivos, 
apontando soluções técnicas e não críticas 
pessoais.
•
Escuta ativa (Capacidade S1): Acolha 
sugestões do colega sobre contraste e 
legibilidade com mente aberta.
•
Justifique escolhas (Capacidade S2): 
Explique por que posicionou cada botão com 
base na jornada do usuário.


## Slide 34

Debate de Design
Ao comparar seu protótipo de papel 
com o mock-up digital final, qual 
elemento exigiu maior adaptação de 
espaçamento ou alinhamento? Por 
quê?


## Slide 35

Debate de Design
Você poderia ter dito...
O alinhamento do botão de avanço em relação à borda da tela.
O tamanho e contraste dos campos de data para toque com o polegar.
A hierarquia tipográfica entre títulos e nomes de profissionais.


## Slide 36

De Onde Vieram Seus Ícones e Fotos?
Ao montar o mock-up digital, muitos designers 
sentem a tentação de copiar qualquer foto ou 
ícone encontrado na busca da internet. Isso é 
seguro?
•
Nem tudo que está no Google pode ser usado: 
Imagens possuem autores e proteções legais.
•
Risco de infração: Usar recursos visuais 
protegidos sem autorização pode invalidar um 
projeto comercial.
•
Conexão com a próxima aula: Na Aula 19, 
aprenderemos as regras de Direito Autoral, 
Anterioridade e Licenças Creative Commons!


## Slide 37

Síntese do Processo de Criação
1. Planejamento
Pesquisa de público, 
storyboard e protótipo de 
papel testado.
2. Transposição
Criação de frames, blocos 
com grade, cores e 
componentes mestre.
3. Acabamento
Teste de contraste, 
documentação do 
processo e preparação 
legal.


## Slide 38

Cálculo de Grade
Se a margem lateral é 16 px em tela de 375 px, qual 
a largura de um botão que ocupa toda a área útil?
Resolva por conta própria e depois confira sua 
resposta.


## Slide 39

Cálculo de Grade
Se a margem lateral é 16 px em tela de 375 px, qual 
a largura de um botão que ocupa toda a área útil?
343 px
Subtraia as duas margens laterais da largura total da 
tela: 375 - 16 - 16 = 343 px.


## Slide 40

Registro que Explica as Decisões
Um registro útil permite que outra pessoa acompanhe como o 
mock-up foi criado, não apenas veja a tela pronta. Para cada 
etapa, anote a tela trabalhada, o que mudou em relação ao 
protótipo de papel e por que a mudança foi feita.
Por exemplo: “Tela de seleção: mantive a ordem dos 
elementos testada no papel; ajustei o alinhamento do botão 
na grade para deixar a composição consistente.” Assim, a 
justificativa fica ligada a uma decisão concreta e ajuda a 
revisar a fidelidade estrutural.
Ao apresentar o trabalho, use esse registro para explicar uma 
escolha e indicar o que ainda merece conferência, como 
alinhamento, legibilidade ou organização das camadas.


## Slide 41

Check Your Understanding
Pergunta 1:
Qual é a principal diferença entre um protótipo de papel e um mock-up digital?
Pergunta 2:
Por que o uso de componentes reutilizáveis melhora a criação de interfaces digitais?
Pergunta 3:
Qual cuidado com direitos autorais o designer deve ter ao escolher ícones e fotos para 
o mock-up?


## Slide 42

Check Your Understanding
Resposta 1:
O protótipo de papel testa fluxos rápidos, enquanto o mock-up digital é um modelo 
estático de alta fidelidade com cores, fontes e medidas exatas.
Resposta 2:
Porque garante consistência visual e permite atualizar simultaneamente todos os 
elementos filhos ao modificar o componente mestre.
Resposta 3:
Deve utilizar recursos com licenças conhecidas e autorizadas para uso, evitando 
copiar imagens protegidas sem permissão.
