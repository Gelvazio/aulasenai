# Capítulo 12 — Jornada do usuário: objetivos do público-alvo e pesquisa

- **Aula:** 12
- **Capacidade:** C2, S1

## Teoria

### Por que as pessoas desistem no meio do caminho

Você já tentou agendar consulta ou comprar lanche pelo celular e desistiu porque a tela travou,
pediu dados demais ou escondeu o botão de confirmação? Quando o usuário abandona, a culpa quase
nunca é da falta de habilidade dele — é de uma sequência de falhas na experiência de uso.

### O público-alvo e seus objetivos

O **público-alvo** é o recorte demográfico e comportamental das pessoas que usam o produto para
resolver uma necessidade real. Projetar para "todo mundo" é o erro mais comum do design: cada
grupo traz rotinas, limitações tecnológicas, familiaridade com telas e níveis de paciência
diferentes.

| Objetivo primário (core task) | Objetivo secundário (suporte) |
|---|---|
| A ação indispensável que levou a pessoa a abrir o app — marcar a consulta | Ações complementares — editar foto de perfil, avaliar o aplicativo |

**Perfis de uso diferentes pedem soluções diferentes:** o estudante com pressa usa o app em pé,
com conexão instável e sol na tela — precisa de contraste alto e confirmação em 1 toque; o
paciente cuidadoso prioriza fontes legíveis e explicações claras, com receio de erros que
cancelem o serviço.

### O mapeamento da jornada

A **jornada do usuário** é a representação da trajetória da pessoa interagindo com o produto até
atingir a meta. Ela não mapeia só cliques mecânicos: registra o que a pessoa faz, o que pensa e
como se sente em cada momento.

**As quatro camadas de toda jornada:**

1. **Ações práticas** — o que o usuário faz fisicamente (abrir o app, digitar CPF, escolher a
   data);
2. **Pensamentos** — dúvidas da mente ("será que esse horário ainda está livre?");
3. **Emoções** — alívio, ansiedade, empolgação, cansaço ou irritação;
4. **Pontos de atrito** — bloqueios: teclado cobrindo o botão, campo que apaga tudo, erro sem
   explicação.

**Fases típicas da jornada digital:** acesso → busca → seleção → confirmação → pós-uso
(comprovante e lembrete). E a curva de humor: motivação inicial, primeira dúvida, atrito crítico,
desistência e frustração total (que leva ao concorrente).

**Ordem para construir o mapa:** identificar o público-alvo e seu objetivo primário → listar as
ações passo a passo → mapear pensamentos, emoções e atritos em cada etapa → propor melhorias que
eliminem os atritos.

### Métodos básicos de pesquisa

Em UX, combinamos dois tipos de dados:

- **Quantitativa (números):** "quantas pessoas desistiram na tela de pagamento?" — revela onde o
  problema ocorre;
- **Qualitativa (motivos):** "por que você desistiu naquela tela?" — revela o porquê do
  comportamento.

**O perigo das perguntas induzidas:**

| ❌ Pergunta induzida | ✅ Pergunta aberta e neutra |
|---|---|
| "Você não achou esse botão super fácil de achar?" — força a concordância por vergonha | "Como foi para você localizar a opção de horário nessa tela?" — permite expressar dúvidas com liberdade |

💡 Pergunte sempre sobre o que a pessoa **fez** no passado, nunca sobre o que ela acha que faria
no futuro.

**Regras de ouro da entrevista:**

1. **Não defenda o design** — se a pessoa não achou o botão, nunca diga "mas ele está bem ali";
   agradeça e anote;
2. **Abrace o silêncio** — dê tempo de pensar; o silêncio precede o feedback mais sincero;
3. **Observe as reações** — onde o dedo hesitou, quando a respiração mudou, quando os olhos
   procuraram algo fora do lugar.

### Estudo de caso (SA 2): a clínica DentalMobile

Uma clínica lançou agendamento pelo celular, mas mais de 60% abandonam antes de concluir. As
queixas: "não sei se o horário salvou", "o calendário trava no celular", "pede dados que não tenho
em mãos".

**Desistência por etapa:** acesso 100% → serviço 82% → data/hora 41% → confirmação 38%. Mais da
metade desiste na etapa do calendário: é ali que a investigação se concentra.

**As três dores reveladas pela pesquisa:**

1. **Campos excessivos** — pedir RG, CPF e endereço antes da disponibilidade desmotiva;
2. **Alvo de toque pequeno** — datas com menos de 44 px provocam toques errados;
3. **Falta de feedback** — sem mensagem de sucesso, o usuário agenda duas vezes ou liga na
   recepção.

**Da dor à proposta visual:** o calendário minúsculo vira grade de cartões de horário (pills de
48 px, livres em verde); o medo de não ter agendado vira tela final com ícone de confirmação e
botão "adicionar ao calendário".

**Roteiro da pesquisa rápida (atividade em duplas):**

- Pergunta 1 (contexto e hábito): "Quando foi a última vez que você tentou agendar algo pelo
  celular? Como foi essa experiência?"
- Pergunta 2 (detecção de atrito): "Em que momento do preenchimento você sentiu mais dúvida ou
  vontade de fechar a tela?"

O entrevistador não opina: ouve, anota as palavras exatas e observa as hesitações. Se o cliente
insistir em 10 campos obrigatórios, os dados da pesquisa (60% de desistência, depoimentos)
convencem melhor que opinião — coletar só nome e telefone e pedir o restante na recepção.

📌 "Você não é o seu usuário. O que parece óbvio para quem desenhou pode ser barreira
intransponível para quem usa na correria do dia a dia." — princípio do design centrado no usuário
(Jakob Nielsen).

## Resumo

- Público-alvo é um recorte específico; projetar "para todo mundo" é o erro mais comum.
- O objetivo primário (a tarefa que motivou abrir o app) vem sempre antes dos secundários.
- A jornada mapeia quatro camadas — ações, pensamentos, emoções e atritos — nas fases acesso,
  busca, seleção, confirmação e pós-uso.
- Pesquisa quantitativa mostra onde as pessoas desistem; a qualitativa mostra por quê.
- Perguntas neutras e abertas revelam a verdade; perguntas induzidas só confirmam o que você quer
  ouvir.
- No caso da clínica, o calendário era o ponto crítico (82% → 41%); a solução foi grade de
  horários com toque amplo e tela final de confirmação.

## Glossário

- **Jornada do usuário:** etapas que a pessoa percorre para atingir um objetivo.
- **Público-alvo:** grupo específico de pessoas para quem a solução digital é desenhada.
- **Pesquisa:** investigação ativa para descobrir necessidades, hábitos e dores do público.
- **Atrito:** qualquer obstáculo, lentidão ou confusão que trava a ação do usuário.
- **Objetivo primário (core task):** a ação indispensável que motivou abrir o aplicativo.
- **Pergunta induzida:** pergunta que sugere a resposta e contamina a pesquisa.
- **Qualitativa × quantitativa:** pesquisa dos motivos × pesquisa dos números.
