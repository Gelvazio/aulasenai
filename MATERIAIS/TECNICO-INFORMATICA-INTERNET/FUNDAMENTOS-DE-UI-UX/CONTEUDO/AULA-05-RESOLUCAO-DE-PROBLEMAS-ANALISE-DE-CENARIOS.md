# Aula 05 — AULA 05 RESOLUCAO DE PROBLEMAS ANALISE DE CENARIOS

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

Resolução de
Problemas: Análise
de Cenários
Como o contexto real de uso molda
soluções digitais eficientes
Recap: Resolução de Problemas: Análise
Crítica de Interfaces
•
Fatos objetivos: identificamos elementos visíveis
e mensuráveis da tela sem emitir julgamentos
pessoais prévios.
•
Causas técnicas: investigamos as falhas de
projeto que geraram o defeito, como tipografia
minúscula ou contraste insuficiente.
•
Efeitos práticos: avaliamos o impacto real no
usuário, como cliques incorretos, abandono do
fluxo e frustração.
Pergunta rápida: Como a separação entre fato e
opinião evita discussões subjetivas na equipe de
design?
Checagem da Aula Anterior
Ao realizar a análise crítica de uma tela, qual das seguintes frases expressa um FATO OBJETIVO
em vez de uma opinião?
O visual da tela ficou antiquado e sem apelo para adolescentes.
A cor do botão principal é desagradável para o perfil dos usuários.
O texto de ajuda possui corpo tipográfico de 9px e contraste de 2.1:1 em relação ao fundo
cinza.
A interface parece confusa demais para quem está utilizando pela primeira vez.
1
2
3
4
Checagem da Aula Anterior
Ao realizar a análise crítica de uma tela, qual das seguintes frases expressa um FATO OBJETIVO
em vez de uma opinião?
O visual da tela ficou antiquado e sem apelo para adolescentes.
A cor do botão principal é desagradável para o perfil dos usuários.
O texto de ajuda possui corpo tipográfico de 9px e contraste de 2.1:1 em relação ao
fundo cinza.
A interface parece confusa demais para quem está utilizando pela primeira vez.
✓
1
2
3
4
Por que telas perfeitas no
laboratório falham na rua?
Um aplicativo desenvolvido em um monitor
calibrado de 27 polegadas dentro de uma sala
climatizada pode se tornar completamente inútil
quando aberto sob sol forte ao meio-dia, em um
ponto de ônibus lotado e com bateria fraca.
O design de software não acontece no vácuo: a
realidade física impõe desafios visuais, motores
e cognitivos imediatos.
Learning Objectives
Objectives
1
Mapear variáveis de cenários reais de uso,
considerando usuário, ambiente, dispositivo e
objetivo.
2
Identificar riscos de interação causados por
restrições de mobilidade, conectividade e
iluminação.
3
Construir quadros de cenários e matrizes de
decisão para selecionar mitigações viáveis em
equipe.
Key Vocabulary
Key words
Cenário
Descrição completa
de uma situação:
quem usa, onde,
como e qual o
objetivo.
Contexto
Conjunto de
condições físicas,
sociais e técnicas
presentes durante a
interação.
Mitigação
Ação planejada no
design para diminuir,
conter ou eliminar um
risco operacional.
Viabilidade
Capacidade real de
executar uma solução
considerando tempo,
recursos e tecnologia.
O que é um Cenário de Uso em UI/UX?
Um cenário de uso não é uma história de ficção; é uma ferramenta analítica que
contextualiza a interação humana com sistemas digitais.
Ele investiga as variáveis que afetam a concentração, a visão e a precisão dos toques
do usuário antes mesmo do primeiro botão ser desenhado.
Os Quatro Pilares do Cenário
ESTRUTURA ANALÍTICA
Quem? (Usuário)
Perfil, conhecimentos técnicos,
limitações visuais ou motoras e
familiaridade com sistemas digitais.
Onde? (Ambiente)
Espaço físico, nível de ruído,
iluminação ambiente, estabilidade e
potenciais distrações ao redor.
Como? (Dispositivo)
Formato da tela, uso com uma ou
duas mãos, qualidade da internet,
bateria e velocidade do aparelho.
Com qual fim? (Objetivo)
A meta imediata do usuário: cancelar
um cartão, conferir um saldo rápido
ou agendar uma consulta.
Condições Reais: Iluminação e Visibilidade
Em ambientes externos com luz solar incidente, o
contraste aparente da tela cai drasticamente. Cores
com baixo contraste (como cinza-claro sobre
branco) desaparecem por completo.
Em locais escuros, telas com fundos puramente
brancos causam ofuscamento e cansaço visual
rápido.
🧠
Regra de Ouro
Contraste visual seguro evita que a
interface dependa exclusivamente de tons
suaves que sumam sob a luz solar.
Condições Reais: Pressa e Sobrecarga
Cognitiva
Atenção Fragmentada
O usuário divide o olhar entre os obstáculos
da rua e a tela do aplicativo em intervalos de
apenas 2 a 3 segundos.
Precisão Reduzida
Passos rápidos e solavancos no transporte
reduzem a precisão motora, aumentando os
toques acidentais em áreas pequenas.
Condições Reais: Conectividade Instável
No Brasil, conexões móveis frequentemente sofrem
quedas repentinas em túneis, subsolos, áreas
periféricas ou aglomerações urbanas.
Se uma interface não prevê o estado sem conexão
(offline) ou não oferece feedback de carregamento
claro, o usuário clica várias vezes repetidamente por
pensar que o sistema travou.
⚠️
Risco Crítico
Perder os dados digitados após uma queda
de conexão gera frustração extrema e faz o
usuário abandonar o serviço.
Riscos Físicos do Uso em Dispositivos Móveis
ERGONOMIA E CONTEXTO
Zona do Polegar
Quando usamos o celular com apenas uma
mão na rua, o polegar alcança facilmente
apenas o terço inferior da tela.
Área de Toque Mínima
Alvos interativos menores que 48x48 pixels
provocam erros frequentes de digitação em
situações de movimento.
Diagnóstico de Cenário
Em ônibus, qual regra de UI evita erro ao clicar em
botões com apenas uma mão?
Resolva por conta própria e depois confira sua
resposta.
Diagnóstico de Cenário
Em ônibus, qual regra de UI evita erro ao clicar em
botões com apenas uma mão?
Botão na parte inferior com área
de 48px
Posicionar a ação principal na zona de fácil alcance
do polegar com dimensão mínima adequada.
Comparando Dois Cenários Opostos
Cenário A: Mesa Silenciosa
Conexão Wi-Fi estável, iluminação suave,
ambas as mãos livres, monitor amplo e
tempo disponível para leitura atenta de
instruções longas.
Cenário B: Ponto de Ônibus
Rede 4G oscilante, gotas de água na tela,
barulho intenso de trânsito, apenas uma
mão disponível e urgência para não perder
o transporte.
A Estrutura do Quadro de Cenários
1
Identificar
Contexto
Listar usuário, local e
ferramentas físicas
presentes.
2
Mapear Riscos
Antecipar o que pode
dar errado na
interação.
3
Propor Mitigações
Criar ajustes de UI
que anulem os riscos
mapeados.
4
Checar Viabilidade
Validar se a solução
pode ser feita
tecnicamente.
Na Prática: Vídeo sobre Experiência Real de
Uso
Simulação: A Situação de Agendamento Online
Na Situação de Aprendizagem 1 (SA 1) do nosso
curso, fomos chamados como consultores para
auditar a página de agendamento de um posto de
saúde escolar que recebe muitas reclamações.
Os usuários relatam que não conseguem concluir a
marcação pelo celular: os botões não respondem
direito e a página reinicia do zero durante o
preenchimento.
“Tentei três vezes marcar o horário enquanto
esperava na fila, mas na última etapa o formulário
apagou tudo.”
Relato de usuário extraído do formulário de
ouvidoria
Construindo o Quadro: O Problema
Problema de Consultoria
O agendamento de consultas exige que o usuário preencha um formulário de 8
campos enquanto caminha até a escola.
1
Cenário Mapeado
Usuário em trânsito a pé, sol da manhã, tela
com reflexos, dados móveis 3G.
Construindo o Quadro: O Problema
Problema de Consultoria
O agendamento de consultas exige que o usuário preencha um formulário de 8
campos enquanto caminha até a escola.
1
Cenário Mapeado
Usuário em trânsito a pé, sol da manhã, tela
com reflexos, dados móveis 3G.
2
Riscos de Interação
Erros de digitação por passos, textos
sumindo no sol e perda de dados por queda
de rede.
Construindo o Quadro: O Problema
Problema de Consultoria
O agendamento de consultas exige que o usuário preencha um formulário de 8 campos
enquanto caminha até a escola.
1
Cenário Mapeado
Usuário em trânsito a pé, sol da manhã, tela
com reflexos, dados móveis 3G.
2
Riscos de Interação
Erros de digitação por passos, textos sumindo
no sol e perda de dados por queda de rede.
3
Mitigações de UI
Salvar dados automaticamente no navegador,
quebrar em 3 etapas e aumentar fontes para
18px.
Ordem da Análise de Cenário
Coloque as etapas da análise de cenários na ordem metodológica correta:
Propor alternativas técnicas de mitigação visual e funcional
Mapear os riscos e possíveis falhas na interação
Avaliar a viabilidade das soluções em matriz de decisão
Descrever o contexto físico, dispositivo e perfil do usuário
1
2
3
4
Ordem da Análise de Cenário
Coloque as etapas da análise de cenários na ordem metodológica correta:
Propor alternativas técnicas de mitigação visual e funcional
Mapear os riscos e possíveis falhas na interação
Avaliar a viabilidade das soluções em matriz de decisão
Descrever o contexto físico, dispositivo e perfil do usuário
1
2
3
4
O que é Mitigação no Design de Interface?
Mitigação é o ajuste proposital na arquitetura da tela
para amortecer ou neutralizar as dificuldades
impostas pelo ambiente.
Não podemos consertar o asfalto irregular da rua
nem desligar o sol, mas podemos garantir que os
botões tenham espaçamento generoso e que o
contraste seja de alto nível.
💡
Visão Proativa
O bom designer antecipa o tropeço do
usuário e protege a interação com
caminhos mais seguros e tolerantes a
falhas.
Exemplos de Mitigação por Tipo de Restrição
Restrição: Claridade
Mitigação: Utilizar contraste
mínimo de 7:1 para textos
essenciais e botão de tema
escuro/claro imediato.
Restrição: Tremor
Mitigação: Aumentar alvos de
toque para pelo menos 56px de
altura e criar espaçamento de 16px
entre botões vizinhos.
Restrição: Sem Sinal
Mitigação: Armazenamento local
(localStorage) que salva o
rascunho a cada tecla digitada sem
resetar a tela.
Restrição: Pressa
Mitigação: Dividir formulários
extensos em etapas curtas com
preenchimento automático de
dados conhecidos.
Avaliando a Viabilidade das Alternativas
Toda ideia de mitigação parece ótima no papel, mas
no mundo profissional ela precisa ser exequível pela
equipe.
A viabilidade de uma alteração de interface é
avaliada sob três critérios primordiais:
•
Viabilidade Técnica: O sistema atual e o
navegador suportam essa tecnologia sem travar?
•
Tempo de Execução: A equipe consegue entregar
a melhoria no prazo previsto do projeto?
•
Impacto no Usuário: O esforço de
desenvolvimento realmente elimina a dor principal
do cenário?
A Matriz de Decisão: Escolha Baseada em
Fatos
1
Opção Intuitiva
Baseada apenas em
achismo ou gosto
pessoal de um membro.
2
Opção Complexa
Resolve o problema, mas
exige meses de código e
tecnologias caras.
3
Decisão na Matriz
Alta mitigação
comprovada com
viabilidade técnica
imediata.
Exemplo de Matriz de Decisão no Projeto
Proposta 1: Reconhecimento
de Voz
Impacto: Alto no laboratório.
Viabilidade: Muito Baixa (ruído alto da
rua impede captação).
Veredito: Descartada pelo cenário real
Proposta 2: Formulário em 3
Passos
Impacto: Alto (reduz erros cognitivos e
toques acidentais).
Viabilidade: Alta (HTML e CSS simples
com salvamento local).
Veredito: Escolha ótima e fundamentada
Aplicação da Matriz de Decisão
Ao analisar a página de agendamento usada por pedestres com pressa e sinal 3G fraco, qual
destas mitigações apresenta a MAIOR viabilidade e impacto positivo?
Substituição de todo o formulário por assistente virtual 3D animado com áudio
obrigatório.
Exigência de cadastro completo de 25 campos antes de permitir a escolha da data.
Formulário simplificado em passos curtos com salvamento automático local no
navegador.
Adição de vídeos instrutivos de alta definição em segundo plano na tela de
agendamento.
1
2
3
4
Aplicação da Matriz de Decisão
Ao analisar a página de agendamento usada por pedestres com pressa e sinal 3G fraco, qual
destas mitigações apresenta a MAIOR viabilidade e impacto positivo?
Substituição de todo o formulário por assistente virtual 3D animado com áudio
obrigatório.
Exigência de cadastro completo de 25 campos antes de permitir a escolha da data.
Formulário simplificado em passos curtos com salvamento automático local no
navegador.
Adição de vídeos instrutivos de alta definição em segundo plano na tela de
agendamento.
✓
1
2
3
4
Postura Colaborativa: Acolhendo Múltiplas
Visões
Em nossa ementa, a capacidade socioemocional S1 exige
valorizar novas ideias e opiniões para solucionar problemas de
forma profissional.
Colegas de equipe frequentemente percebem riscos que nós
ignoramos porque utilizam aparelhos diferentes ou vivem
rotinas distintas.
📌
Princípio de Amabilidade (S4)
Discordâncias sobre telas devem ser resolvidas
com testes de cenários e evidências ergonômicas,
nunca com ataques pessoais.
Da Análise ao Planejamento da Tela
Etapa 1
Mapeamento dos
4 Pilares
Etapa 2
Listagem de
Riscos Físicos
Etapa 3
Matriz de
Viabilidade
Etapa 4
Wireframe
Mitigado
Estudo de Caso: O Botão
Flutuante
Um botão de ação primária posicionado de
forma fixa na barra inferior da tela permite que o
usuário confirme o agendamento sem precisar
rolar até o final da página.
Isso atende diretamente a quem está
caminhando e reduz a necessidade de múltiplos
movimentos com o polegar.
Atividade Prática: Quadro de Cenários
Você agora assumirá o papel de aluno
consultor de UI/UX. Em duplas, vocês
preencherão o Quadro de Cenários com os
seguintes entregáveis:
• Contexto: Escolher entre (A) Aluno
atrasado no ônibus lotado ou (B) Idoso
com visão reduzida em calçada
ensolarada.
• Riscos: Listar no mínimo dois problemas
físicos ou técnicos que impedem o uso.
• Mitigações: Propor duas mudanças
visuais de interface viáveis.
Desafio do Consultor UI
Defina em duas frases uma mitigação
técnica viável para um aplicativo de
agendamento que será usado em uma rua
movimentada e barulhenta com forte luz
solar.
O que você vai precisar:
🎨🖌️
Caderno de anotações ou editor de texto
Debate: Visões Conflitantes na Equipe
Imagine que seu colega de equipe propôs
colocar um formulário inteiro em uma única tela
longa para "economizar cliques", enquanto
você defende dividir em três etapas.
Como fundamentar tecnicamente a sua escolha
com base em cenários sem desrespeitar o
colega?
“Fundamentar escolhas no exame de fatos,
contextos e problemáticas à luz de
referenciais técnicos.”
Capacidade Socioemocional S2 da Ementa
Debate de Consultores
Por que fundamentar uma mudança
de interface nas restrições físicas do
cenário real é mais convincente do
que dizer apenas que uma tela ficou
feia ou bonita?
Debate de Consultores
Você poderia ter dito...
Porque critérios físicos como luz solar, conexões fracas e alcance
motor são fatos mensuráveis e objetivos.
Porque focar no contexto elimina preferências puramente pessoais e
direciona a equipe para o que o usuário realmente necessita.
Síntese: O Impacto no Planejamento de Telas
1
O contexto dita o tamanho dos elementos e o nível de contraste exigido.
2
Restrições físicas definem a hierarquia e o posicionamento das ações
principais.
3
A viabilidade técnica garante que a solução chegue funcional às mãos das
pessoas.
Check Your Understanding
Pergunta 1:
Quais são os quatro pilares fundamentais para descrever um cenário de uso completo?
Pergunta 2:
Qual é a área de toque mínima recomendada para botões em telas móveis visando
mitigar erros motores?
Pergunta 3:
Por que a viabilidade técnica deve ser considerada antes de aprovar uma solução de
interface?
Check Your Understanding
Resposta 1:
Usuário (quem), Ambiente (onde), Dispositivo (como) e Objetivo (com qual fim).
Resposta 2:
Pelo menos 48 por 48 pixels.
Resposta 3:
Para assegurar que a melhoria possa ser executada dentro do prazo e com as
tecnologias reais disponíveis.
Próximos Passos: Aula 6
Na próxima aula, daremos o passo definitivo na construção de interfaces com o tema
User Interface (UI): Definição e Tipos de Interface.
Exploraremos como interfaces baseadas em texto (CLI), voz e toque interagem com os
cenários que mapeamos hoje!

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

- Slides: CONTEUDO/5-Resolução-de-Problemas-Análise-de-Cenários.pdf
