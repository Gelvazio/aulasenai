# Capítulo 05 — Resolução de problemas: análise de cenários

- **Aula:** 05
- **Capacidade:** C3, S1

## Teoria

### Por que telas perfeitas no laboratório falham na rua

Um aplicativo desenvolvido num monitor calibrado de 27 polegadas, em sala climatizada, pode se
tornar inútil sob sol forte ao meio-dia, num ponto de ônibus lotado e com bateria fraca. O design
não acontece no vácuo: a realidade física impõe desafios visuais, motores e cognitivos imediatos.

### O que é um cenário de uso

Um cenário de uso não é história de ficção: é uma **ferramenta analítica** que contextualiza a
interação da pessoa com o sistema digital. Ele investiga as variáveis que afetam concentração,
visão e precisão dos toques antes mesmo do primeiro botão ser desenhado.

**Os quatro pilares do cenário:**

| Pilar | Pergunta | O que observar |
|---|---|---|
| Usuário | Quem? | Perfil, conhecimentos técnicos, limitações visuais ou motoras, familiaridade digital |
| Ambiente | Onde? | Espaço físico, ruído, iluminação, estabilidade e distrações |
| Dispositivo | Como? | Formato da tela, uma ou duas mãos, qualidade da internet, bateria |
| Objetivo | Com qual fim? | A meta imediata: cancelar um cartão, conferir saldo, agendar consulta |

### Condições reais que mudam tudo

- **Iluminação:** sob sol incidente, o contraste aparente cai drasticamente e cores de baixo
  contraste desaparecem; em locais escuros, fundos brancos causam ofuscamento.
- **Pressa e sobrecarga cognitiva:** o usuário em movimento olha a tela em intervalos de 2 a 3
  segundos, e solavancos reduzem a precisão motora, aumentando toques acidentais.
- **Conectividade instável:** quedas de sinal em túneis e aglomerações são comuns; sem estado
  offline ou feedback de carregamento, o usuário clica repetidamente achando que travou — e
  perder dados digitados gera abandono do serviço.
- **Ergonomia do polegar:** com uma mão só, o polegar alcança com facilidade apenas o terço
  inferior da tela; alvos menores que 48×48 px provocam erros em movimento.

### O quadro de cenários

A estrutura da análise de cenários tem quatro etapas:

1. **Identificar o contexto** — listar usuário, local e ferramentas físicas presentes;
2. **Mapear riscos** — antecipar o que pode dar errado na interação;
3. **Propor mitigações** — criar ajustes de UI que anulem os riscos;
4. **Checar viabilidade** — validar se a solução pode ser feita tecnicamente.

**Exemplo (SA 1):** o agendamento exige preencher 8 campos enquanto o usuário caminha até a
escola. Cenário: trânsito a pé, sol da manhã, reflexos na tela, dados 3G. Riscos: erros de
digitação, texto sumindo no sol e perda de dados por queda de rede. Mitigações: salvar dados
automaticamente no navegador, dividir em 3 etapas e aumentar a fonte para 18 px.

### Mitigação e viabilidade

**Mitigação** é o ajuste proposital na tela para amortecer dificuldades do ambiente: não podemos
desligar o sol nem consertar o asfalto, mas podemos garantir botões com espaçamento generoso e
contraste alto.

| Restrição | Mitigação |
|---|---|
| Claridade (sol) | Contraste mínimo de 7:1 em textos essenciais e alternância tema claro/escuro |
| Tremor/movimento | Alvos de toque com ao menos 56 px e 16 px entre botões vizinhos |
| Sem sinal | Salvamento local do rascunho a cada tecla digitada, sem resetar a tela |
| Pressa | Formulários extensos divididos em etapas curtas com preenchimento automático |

Toda mitigação é avaliada em três critérios de **viabilidade**: técnica (o sistema e o navegador
suportam?), tempo de execução (a equipe entrega no prazo?) e impacto no usuário (o esforço
elimina a dor principal?).

### A matriz de decisão

A decisão entre alternativas não pode ser achismo nem a opção mais complexa. A matriz cruza
**impacto × viabilidade**:

- **Reconhecimento de voz:** impacto alto no laboratório, mas viabilidade muito baixa (o ruído da
  rua impede a captação) — descartada pelo cenário real;
- **Formulário em 3 passos:** impacto alto (reduz erros cognitivos e toques acidentais) e
  viabilidade alta (HTML e CSS simples com salvamento local) — escolha ótima e fundamentada.

### Postura colaborativa

Colegas percebem riscos que ignoramos, porque usam aparelhos diferentes e vivem rotinas distintas
(S1: valorizar ideias diferentes). Discordâncias sobre telas se resolvem com testes de cenário e
evidências ergonômicas, nunca com ataques pessoais (S4: amabilidade). Fundamentar a escolha nas
restrições físicas do cenário real é mais convincente do que dizer que a tela ficou feia ou
bonita (S2: referenciais técnicos).

**Estudo de caso — botão flutuante:** fixar a ação primária na barra inferior permite confirmar o
agendamento sem rolar a página, atendendo quem caminha e reduzindo os movimentos do polegar.

## Resumo

- Cenário de uso é ferramenta analítica com quatro pilares: usuário (quem), ambiente (onde),
  dispositivo (como) e objetivo (com qual fim).
- Sol, pressa, conexão instável e uso com uma mão mudam o que a interface precisa oferecer.
- A análise segue quatro etapas: identificar contexto, mapear riscos, propor mitigações e checar
  viabilidade.
- Mitigações típicas: contraste 7:1, alvos de 56 px, salvamento local automático e formulários em
  etapas curtas.
- A matriz de decisão escolhe a alternativa de alto impacto com viabilidade técnica imediata —
  não a mais bonita nem a mais complexa.
- Divergências na equipe se resolvem com evidências do cenário e referenciais técnicos, com
  amabilidade.

## Glossário

- **Cenário:** descrição de uma situação de uso: quem, onde, com que objetivo.
- **Contexto:** conjunto de condições físicas, sociais e técnicas presentes durante a interação.
- **Mitigação:** ação planejada no design para diminuir, conter ou eliminar um risco operacional.
- **Viabilidade:** capacidade real de executar uma solução considerando tempo, recursos e
  tecnologia.
- **Zona do polegar:** terço inferior da tela, alcançado com facilidade no uso com uma mão.
- **Matriz de decisão:** quadro que cruza impacto e viabilidade para escolher a solução.
- **Sobrecarga cognitiva:** esforço mental excessivo para entender a tela em vez de agir.
