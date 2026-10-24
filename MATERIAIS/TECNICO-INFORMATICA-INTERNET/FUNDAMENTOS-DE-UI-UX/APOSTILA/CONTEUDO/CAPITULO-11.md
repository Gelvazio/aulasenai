# Capítulo 11 — Processo de design interativo

- **Aula:** 11
- **Capacidade:** C2, S4

## Teoria

### O mito do design pronto de primeira

Você já viu algum aplicativo nascer sem nenhuma falha e nunca mais precisar de atualização?
Grandes plataformas passam por centenas de reformulações — o primeiro desenho é apenas o começo
da conversa com quem usa.

### O que é design iterativo (interativo)

O **design iterativo** é a metodologia em que o produto passa por rodadas sucessivas de
prototipagem, teste, análise e refinamento. Em vez de meses planejando uma entrega única, a
equipe lança versões rápidas, observa onde o usuário tropeça e aprimora os pontos fracos com base
em fatos observados.

| Modelo linear | Modelo iterativo |
|---|---|
| Assume que tudo pode ser previsto no início | Encara o projeto como espiral de aprendizado |
| Falhas de usabilidade só aparecem após o lançamento — com prejuízo | Cada rodada reduz incertezas e aproxima o layout das capacidades reais do público |

### As quatro etapas do ciclo

1. **Entender** — mapear objetivos reais e necessidades do usuário: quem vai usar, qual a dor, o
   objetivo da tarefa;
2. **Criar** — transformar requisitos em layout funcional: botões, campos, contrastes e
   hierarquia;
3. **Testar** — colocar o rascunho diante de uma pessoa real, sem dar dicas, e notar onde há
   hesitação;
4. **Melhorar** — redesenhar os elementos confusos e produzir a versão seguinte, respaldada por
   dados.

E o ciclo recomeça: cada volta chega ao início já enriquecida.

### O papel pedagógico do erro

Quando um usuário clica no lugar errado, o erro não é dele: é da pista visual que a interface
forneceu. Identificar um ponto cego no papel economiza horas caras de programação. 💡 **Comemore
quando um teste apontar defeito: você descobriu exatamente o que consertar.**

**Evidências colhidas durante o teste:**

| Evidência | O que revela |
|---|---|
| Tempo e hesitação | Franziu a testa antes de achar o botão? Falta destaque ou texto confuso |
| Cliques falsos | Tocou em título achando clicável? O estilo não comunica a função |
| Perguntas verbais | "Para onde eu vou agora?" A navegação falhou no próximo passo |

**Opinião × evidência:** "não gostei dessa cor" é subjetivo e muda de pessoa para pessoa; "o
usuário levou 42 segundos para achar o botão e clicou duas vezes no texto fixo" é impedimento
real que exige correção. Se o voluntário não acha o botão sozinho, a interface falhou — não se
explica oralmente onde clicar.

### Estudo de caso (SA 2): a tela de agendamento em duas versões

**Versão 1 — a hipótese inicial:** especialidade médica, médico preferido, calendário e horários
— tudo junto, rápido, para validar o fluxo básico. A V1 não precisa ser linda: precisa ser
testável e completa nos recursos essenciais.

**Problemas detectados no teste da V1:**

1. Calendário ilegível no celular — dias pequenos e difíceis de tocar;
2. Botão de confirmação cinza, sem destaque, fundido ao fundo;
3. Sem confirmação de etapas — o usuário não sabia se o horário estava reservado.

**Os ajustes da Versão 2:**

1. **Cards de horário:** calendário condensado trocado por botões largos com horários;
2. **Botão primário de alto contraste:** cor vibrante, texto escuro, largura total no rodapé;
3. **Cartão de resumo:** médico, data e local antes da confirmação final, dando segurança.

| Métrica | V1 | V2 |
|---|---|---|
| Tempo médio de conclusão | 68 segundos | 19 segundos |
| Taxa de erro nos toques | 35% | 2% |

### O registro documental de melhorias

No mercado, o designer justifica cada mudança para clientes e programadores. O documento de
melhorias liga o fato observado à decisão técnica:

| Etapa | Exemplo do agendamento |
|---|---|
| Problema no teste | Idosos tocavam fora da data desejada e desistiam |
| Diagnóstico técnico | Área de clique menor que 24 px, espaçamento nulo |
| Ação na V2 | Botões pílula com 48 px de altura e 12 px de folga |
| Resultado validado | Zero toques errados no segundo ciclo de testes |

A evolução é contínua: da versão 1.0 (viabilidade) à versão 10+ (microinterações fluidas), o
software é um organismo vivo que se adapta a novos aparelhos e hábitos.

### Colaboração e escuta nos testes

Entregar o protótipo para o colega testar é receber críticas construtivas e acolher propostas
diferentes (S3). Quem testa aponta o que causou dúvida sem ridicularizar o autor (S4). O design é
construção coletiva: desapegar do ego e focar no problema.

**Como filtrar feedbacks conflitantes:**

1. **Relevância da tarefa** — o pedido ajuda ou atrapalha o objetivo central? Priorize o que
   desbloqueia o fluxo;
2. **Frequência** — queixa isolada ou vários travaram no mesmo botão? Foque nas dores coletivas;
3. **Viabilidade técnica** — a mudança é realizável ou cria complexidade desnecessária?

**Teste em pares:** troque o caderno com o colega, apresente o esboço e observe-o cumprir a
tarefa por 2 minutos sem falar nada. Anote dois momentos de hesitação para alimentar a versão 2.

## Resumo

- Nenhum app nasce pronto: o design iterativo repete ciclos de prototipagem, teste e refinamento
  — em vez da entrega única do modelo linear.
- O ciclo tem quatro etapas: entender, criar, testar e melhorar.
- Erro no teste é dado de projeto, não fracasso: hesitação, cliques falsos e perguntas são
  evidências objetivas do que corrigir.
- Opinião ("não gostei da cor") não orienta mudança; evidência ("42 s para achar o botão") sim.
- No estudo de caso, a V2 caiu de 68 s para 19 s de conclusão e de 35% para 2% de erro — prova
  objetiva da melhoria.
- Toda mudança entra no documento de melhorias, ligando fato observado à decisão técnica; e
  feedbacks conflitantes se filtram por relevância, frequência e viabilidade.

## Glossário

- **Iteração:** repetição planejada de um processo para refinar e evoluir uma interface.
- **Ciclo:** etapas interligadas que retornam ao ponto inicial já enriquecidas.
- **Aprimoramento:** correção e evolução técnica guiadas por dados do uso real.
- **Versão:** estado registrado de um produto em um momento do desenvolvimento.
- **Evidência de teste:** observação objetiva (tempo, hesitação, clique falso) do uso real.
- **Protótipo:** versão rápida e testável da interface, ainda sem acabamento.
