# Capítulo 17 — Prototipagem: storyboard e protótipos de papel

- **Aula:** 17
- **Capacidade:** C2, S1

## Teoria

### O custo de descobrir tarde

Se uma equipe programa um aplicativo inteiro durante seis meses e descobre no lançamento que o
fluxo de compra é confuso, refazer tudo custa caro e desmotiva o time. Com papel, tesoura e lápis,
a mesma confusão aparece em trinta minutos.

**O custo de corrigir em cada etapa:**

| Etapa | Custo da mudança |
|---|---|
| Papel e esboço | Quase zero — apagar com borracha ou desenhar outra folha |
| Mock-up digital | Médio — refazer vetores e telas na ferramenta |
| Código em produção | Alto — reprogramar telas, testar, migrar dados e redistribuir |

### O que é prototipagem

Prototipar é dar vida palpável a uma ideia abstrata para validar se ela resolve o problema real
de quem usa. Antes de envolver programadores, a equipe cria rascunhos interativos — o objetivo
não é algo bonito, e sim aprender rápido com as falhas e ajustar a estrutura sem desperdício. O
grau de precisão e detalhamento de um protótipo chama-se **fidelidade** (baixa, média ou alta).

### Storyboard: a história visual da experiência

O **storyboard** surgiu nos estúdios de animação e foi adotado pelo design para narrar uma
situação humana completa em quadrinhos. Em vez de focar botões isolados, ele mostra quem é o
usuário, onde está, qual a necessidade urgente e como o sistema resolve o problema.

**Elementos essenciais:**

1. **Personagem** — o usuário principal, com motivações e limitações claras;
2. **Cenário** — o ambiente físico: iluminação forte, barulho, pressa ou chuva;
3. **Conflito** — o obstáculo que o usuário precisa superar rápido;
4. **Resolução** — o desfecho positivo gerado pela interação com a interface.

**Narrativa em quatro quadros (agendamento):** a dor surge antes de sair para o trabalho → ele
abre a tela no celular para buscar horário → seleciona a data e confirma → recebe o comprovante
imediato e segue o dia sem preocupação.

### Protótipos de papel: baixa fidelidade com foco no fluxo

**Protótipos de papel** são maquetes das telas feitas com folhas, cartolina, tesoura e lápis.
Priorizam hierarquia da informação, posição dos botões e fluxo entre telas — sem distrair com
fontes sofisticadas ou paletas de cores.

**As três grandes vantagens:**

- **Custo quase zero** — papel, lápis e régua disponíveis em qualquer sala;
- **Iteração imediata** — se uma opção confunde, rasura na hora ou desenha nova tela em minutos;
- **Crítica sem receio** — ninguém hesita em apontar defeitos num desenho simples.

**Kit de prototipagem física:** folhas A4 recortadas no tamanho da tela (chassi), notas adesivas
(caixas de diálogo e menus) e tiras compridas que deslizam por trás da moldura para imitar a
rolagem de feeds. Menus expansíveis são tiras dobradas; modais são notas coladas sobre a tela;
campos digitados ganham pedaços de papel manuscrito.

### A técnica do "homem-computador"

Como uma folha inerte responde ao toque? Pela técnica do **homem-computador** (ou Mágico de Oz):
um integrante senta-se em silêncio e, a cada toque do usuário num botão de papel, move, substitui
ou cola o elemento seguinte que a tela apresentaria.

🔑 O homem-computador nunca fala nem ensina onde clicar: apenas reage aos toques.

**Os três papéis na sessão de teste:**

| Papel | Função |
|---|---|
| Facilitador | Apresenta a tarefa, acolhe o testador e pede que pense em voz alta |
| Homem-computador | Troca folhas e recortes em silêncio absoluto |
| Anotador | Registra onde o usuário hesitou, o que procurou e onde ficou confuso |

### Formulando a tarefa de teste

Nunca diga "clique no botão azul de agendar consulta no topo direito" — isso testa obediência,
não a interface. A formulação correta dá cenário e objetivo aberto: *"Você precisa marcar uma
consulta odontológica para quinta-feira às 14h. Mostre como faria isso usando esta tela."*

### A iteração imediata a lápis

Terminado o primeiro teste, não há reunião formal: com lápis e borracha, apaga-se o texto dúbio,
redesenha-se o botão para o padrão F ou cola-se uma nota com atalho — e o segundo testador já
recebe a versão melhorada. É o ciclo iterativo (capítulo 11) na velocidade do papel.

## Resumo

- Corrigir no papel custa minutos; no código em produção, custa semanas — por isso se prototipa
  antes de programar.
- Storyboard narra a experiência em quadrinhos: personagem, cenário, conflito e resolução.
- Protótipos de papel testam hierarquia, botões e fluxo com custo quase zero e crítica sem
  receio.
- A técnica do homem-computador faz a folha "responder" aos toques — em silêncio, sem ensinar.
- O teste tem três papéis (facilitador, homem-computador, anotador) e a tarefa é formulada como
  cenário aberto, nunca como instrução de clique.
- Cada sessão alimenta a próxima versão desenhada a lápis — iteração imediata.

## Glossário

- **Storyboard:** sequência de quadros que mostra o uso da solução passo a passo.
- **Protótipo de papel:** esboço das telas em papel para testar a ideia antes de programar.
- **Fidelidade:** grau de precisão, detalhamento visual e interatividade de um protótipo.
- **Homem-computador (Mágico de Oz):** técnica em que uma pessoa troca os papéis em silêncio,
  simulando as respostas do sistema.
- **Facilitador:** quem conduz o teste, apresenta a tarefa e pede para pensar em voz alta.
- **Baixa fidelidade:** protótipo simples, focado em estrutura e fluxo, sem acabamento visual.
