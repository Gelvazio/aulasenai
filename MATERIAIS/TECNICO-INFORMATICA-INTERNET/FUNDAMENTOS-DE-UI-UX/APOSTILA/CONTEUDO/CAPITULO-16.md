# Capítulo 16 — Determinação de escopo do projeto de interface

- **Aula:** 16
- **Capacidade:** C2, S4

## Teoria

### O dilema do aplicativo que faz tudo

Imagine abrir um aplicativo só para marcar um horário e encontrar previsão do tempo, jogos,
notícias e promoções. Quem só precisava escolher uma data se perde no excesso. Sem escopo, o
projeto nunca chega ao fim — e a experiência afoga no meio do caminho.

### O que é escopo de interface

O **escopo** é o acordo que define exatamente o trabalho a ser realizado e as entregas esperadas.
Em UI/UX, ele determina quais telas, formulários, botões e jornadas existirão no produto final. A
**fronteira** é o limite exato entre o que faz parte do sistema e o que está fora; a
**delimitação** é a ação prática de dizer "não" para proteger o foco.

### Critérios de seleção: o que entra

| Critério | Pergunta |
|---|---|
| Resolve a dor primária? | A funcionalidade soluciona o problema identificado na pesquisa? |
| Completa a jornada? | As telas e cliques permitem concluir a ação principal de ponta a ponta? |
| É exequível agora? | A equipe consegue prototipar e validar com os recursos e o prazo atuais? |

### Critérios de corte: o que fica fora

- **Recursos legais, mas fora do objetivo** — não resolvem a dor principal desta versão;
- **Telas com regras de negócio pesadas** — demandariam semanas fora do prazo;
- **Pedidos sem dados** — opiniões isoladas não validadas na pesquisa, que só poluem a
  interface.

### As quatro camadas da priorização (MoSCoW)

| Camada | Significado |
|---|---|
| **Essencial (must)** | Sem isso o sistema não funciona nem cumpre seu papel básico |
| **Importante (should)** | Agrega alto valor, mas há contornos manuais temporários |
| **Desejável (could)** | Conveniência que só entra se sobrar tempo hábil |
| **Fora de escopo (won't)** | Decidido expressamente que não será feito nesta versão |

### O perigo do inchaço de escopo

| Escopo enxuto | Escopo inchado |
|---|---|
| Poucas telas, fluxo direto, entrega no prazo | Funcionalidades empilhadas sem análise de valor |
| Usuário encontra o que procura em segundos | Usuário perdido em botões e fluxos que não usa |

Escopo enxuto melhora a experiência por três vias: **menos carga cognitiva** (achar em
segundos), **rotas de navegação claras** (fluxos lineares reduzem erros) e **qualidade de
refinamento** (poucos elementos desenhados com espaçamento e contraste perfeitos).

### O documento de escopo

O escopo é redigido e validado colaborativamente, com três blocos:

1. **Entra** — as telas e funções essenciais da versão;
2. **Não entra** — o que ficou decididamente fora, com o motivo;
3. **Prioridades** — a ordem técnica e de valor das entregas.

### Estudo de caso (SA 2): escopo do agendamento on-line

Os usuários reclamam que a versão móvel é confusa e demorada; a meta é agendar em menos de 1
minuto. Analisando os pedidos recebidos: escolha de serviço, data/hora e confirmação com
comprovante são **essenciais**; edição de perfil e histórico completo são **importantes ou
desejáveis**; jogos, notícias e redes sociais ficam **fora de escopo** — documentados no
documento de escopo validado com a equipe.

## Resumo

- Escopo é o acordo do que será entregue: telas, formulários e jornadas — sem ele o projeto não
  termina.
- O que entra resolve a dor primária, completa a jornada e é exequível com o prazo atual.
- O que fica fora: recursos fora do objetivo, regras pesadas demais e pedidos sem dados.
- A priorização MoSCoW separa essencial, importante, desejável e fora de escopo (won't).
- Escopo enxuto dá menos carga cognitiva, rotas claras e refinamento de qualidade.
- O documento de escopo registra "entra", "não entra" e prioridades — validado com a equipe.

## Glossário

- **Escopo:** limite do que o projeto entrega e do que fica de fora.
- **Fronteira:** limite exato entre o que faz parte do sistema e o que está fora.
- **Prioridade:** ordem técnica e de valor das entregas — primeiro o que é vital.
- **Delimitação:** ação prática de dizer não a pedidos para proteger o foco.
- **Inchaço de escopo (scope creep):** acúmulo de funcionalidades sem análise de valor.
- **MoSCoW:** método de priorização em must, should, could e won't.
