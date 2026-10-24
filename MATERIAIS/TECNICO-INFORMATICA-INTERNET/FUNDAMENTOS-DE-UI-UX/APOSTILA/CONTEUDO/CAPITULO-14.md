# Capítulo 14 — Estratégias de coleta de informações: determinação e aplicação

- **Aula:** 14
- **Capacidade:** C2, S2

## Teoria

### O dilema do palpite

Imagine redesenhar o aplicativo de notas da escola sem perguntar nada a estudantes e professores:
você investe semanas ajustando botões que adora, mas ninguém consegue achar a média final.
Projetar sem dados reais transforma escolhas técnicas em palpites arriscados. Cada decisão visual
precisa de justificativa: a coleta formal substitui o "eu acho" por evidências vindas de quem usa.

O aluno consultor não julga o usuário nem presume o que ele prefere: observa fatos, ouve com
atenção e traduz necessidades em requisitos de tela — postura que faz o diagnóstico ser
respeitado por desenvolvedores e clientes.

### Quantitativa × qualitativa

| Pesquisa quantitativa | Pesquisa qualitativa |
|---|---|
| Responde "quanto", "quantos", "com que frequência" | Responde "por que" e "como" |
| Questionários com opções fechadas, grandes grupos | Entrevistas e observação direta |
| Valida se uma suspeita afeta 10% ou 85% da comunidade | Descobre motivos que nenhuma múltipla escolha prevê |
| Baixo custo, dezenas de respondentes rápido | Explora sentimentos e desdobra respostas em tempo real |

Os métodos se completam: o questionário mapeia a dimensão do problema; a entrevista explica suas
causas profundas.

### Estrutura do questionário

Um bom questionário é rápido de preencher e organiza as perguntas em três formatos:

- **Múltipla escolha fechada** — opções exclusivas ou caixas de seleção rápida;
- **Escalas de satisfação** — notas de 1 a 5 ou níveis de concordância (escala Likert), sempre
  com extremos definidos: "1 = muito difícil, 5 = muito fácil";
- **Perguntas abertas curtas** — espaço para comentário livre de até uma linha.

### O risco das perguntas indutoras

| ❌ Pergunta indutora | ✅ Pergunta neutra |
|---|---|
| "Você concorda que nosso menu azul ficou muito mais moderno e fácil?" — induz a concordar por constrangimento | "Como você avalia a facilidade para encontrar o menu principal da tela?" — deixa o usuário expressar a percepção real |

Perguntas tendenciosas geram dados falsos que estragam o projeto inteiro.

### O roteiro da entrevista em profundidade

A entrevista não é conversa solta: segue um roteiro com objetivos claros por bloco:

1. **Abertura** — explicar o objetivo e deixar a pessoa confortável;
2. **Contexto** — perguntar hábitos do dia a dia;
3. **Aprofundamento** — pedir exemplos concretos de dificuldades nas telas;
4. **Fechamento** — agradecer e encerrar a sessão.

**Perguntas de aprofundamento:**

- "Me conte sobre a última vez…" — leva a um episódio concreto, não a palpites sobre o futuro;
- "O que você esperava que acontecesse?" — revela o modelo mental e o descompasso com a tela;
- "Por que esse passo foi difícil?" — descobre a causa raiz, não só o sintoma.

### Escuta ativa

Escutar ativamente é dedicar atenção completa sem interromper nem defender o sistema:

- **Acolha o silêncio** — as pausas deixam a pessoa elaborar memórias reais;
- **Observe o corpo** — a testa franzida revela hesitação imediata;
- **Parafraseie** — confirme: "entendi que você achou o botão pequeno, certo?";
- **Não rebata** — se o colega diz "o sistema é horrível, nada funciona", agradeça e pergunte
  onde exatamente ele travou.

### Da coleta à tabulação

Respostas brutas viram decisão quando tabuladas: agrupe queixas por categoria (datas, excesso de
campos, falta de comprovante, botão escondido), conte a frequência de cada uma e converta em
padrões visíveis. O que aparece em muitos relatos é prioridade; o que aparece uma vez vira nota
de observação.

### Estudo de caso (SA 2): o plano de coleta do agendamento

Na página de agendamento, a equipe define: questionário de 5 perguntas para a comunidade escolar
(quantitativa — medir a dimensão das dores) mais 5 entrevistas em profundidade com quem já
desistiu do agendamento (qualitativa — entender os motivos). O resultado tabulado orienta cada
mudança da interface — e cada mudança entra no relatório com a queixa que a motivou.

## Resumo

- Decidir sem dados é palpite: a coleta formal transforma reclamações em requisitos de tela.
- Quantitativa (questionários, números) mede a dimensão do problema; qualitativa (entrevistas,
  motivos) explica as causas.
- Questionários curtos usam múltipla escolha, escalas de 1 a 5 com extremos definidos e uma
  pergunta aberta.
- Perguntas indutoras ("você concorda que ficou ótimo?") produzem dados falsos — pergunte de
  forma neutra.
- A entrevista segue roteiro (abertura, contexto, aprofundamento, fechamento) com escuta ativa:
  silêncio, observação corporal e parafrasear.
- Respostas viram decisão por tabulação: agrupar, contar frequências e priorizar as dores
  coletivas.

## Glossário

- **Estratégia de coleta:** método escolhido para obter informações do usuário (questionário,
  entrevista, observação).
- **Questionário:** conjunto estruturado de perguntas fechadas e curtas para muitos
  respondentes.
- **Entrevista em profundidade:** conversa guiada por roteiro para explorar motivações e dores.
- **Escala Likert:** escala de concordância ou satisfação, em geral de 1 a 5.
- **Pergunta indutora:** pergunta que sugere a resposta desejada e contamina o dado.
- **Escuta ativa:** atenção completa ao relato, sem interromper nem defender o sistema.
- **Tabulação:** organização das respostas em categorias e contagens para revelar padrões.
