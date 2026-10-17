# Aula 11 — Lógica Proposicional e Estratégias de Resolução de Problemas

- **Matéria:** UC 8 — Reforço Matemática e Raciocínio Lógico · Rio do Sul Mais Tech — SENAI
- **Módulo:** 5 — Raciocínio Lógico e Resolução de Problemas (parte 2 de 3)
- **Carga horária:** 4 h (Módulo 5: 4 h)
- **Conhecimentos:** 5 — Raciocínio Lógico e Resolução de Problemas: introdução à lógica
  proposicional (verdadeiro/falso, conectivos lógicos, negação); estratégias de resolução
  (tentativa e erro sistematizado, decomposição, trabalho reverso, analogia)
- **Capacidades:** C2 — Desenvolver autonomia de estudo, utilizando estratégias para resolver
  problemas matemáticos · C3 — Aplicar pensamento crítico e lógico, analisando situações e
  identificando soluções possíveis · C6 — Persistir na resolução de problemas, desenvolvendo
  resiliência diante de desafios matemáticos
- **Estratégias:** várias estratégias ensinadas de forma explícita e comparada; valorizar o
  processo e a criatividade; dicas em etapas quando o aluno travar; desafios lógicos variados
- **Slides:** `../AULAS/AULA-11-SLIDES.pdf` (o professor publica em outro momento)

## Indicadores

- 5.2 Resolve puzzles lógicos de nível apropriado de forma independente e confiante.
- 5.3 Descreve e explica a estratégia de resolução utilizada com detalhes e coerência.
- 5.4 Valida as respostas obtidas e verifica a razoabilidade dos resultados.

## Objetivos

- Reconhecer proposições e atribuir valor lógico (V ou F).
- Usar os conectivos "e", "ou", "se… então" e a negação, montando tabelas-verdade simples.
- Aplicar quatro estratégias de resolução e escolher a mais adequada a cada problema.

## Roteiro da aula (4 h = 240 min)

| Momento | Tempo | O que acontece |
|---|---|---|
| Retomada | 15 min | Correção do clube de leitura (Aula 10) |
| Exposição dialogada 1 | 40 min | Proposições, negação, conectivos e tabela-verdade |
| Prática guiada 1 | 25 min | "Verdade ou mentira?": frases do cotidiano e da programação |
| Intervalo | 20 min | — |
| Exposição dialogada 2 | 35 min | As quatro estratégias com um exemplo cada |
| Dinâmica | 45 min | "Estações de estratégia" (abaixo) |
| Prática autônoma | 45 min | 8 problemas: o aluno escolhe e nomeia a estratégia usada |
| Registro e fechamento | 15 min | Cada aluno escreve qual estratégia usa quando trava |

## Conteúdo

### 1. Proposição
Frase declarativa que pode ser **verdadeira (V)** ou **falsa (F)**, nunca as duas.
- "Rio do Sul fica em Santa Catarina." → proposição (V).
- "7 é par." → proposição (F).
- "Que horas são?" e "Feche a porta!" → **não** são proposições.

### 2. Negação (não, ~)
Inverte o valor lógico. p: "Está chovendo" → ~p: "Não está chovendo".
⚠️ A negação de "Todos os alunos passaram" é "**Pelo menos um** aluno não passou" (e não "nenhum
passou").

### 3. Conectivos e tabela-verdade

| p | q | p **e** q (∧) | p **ou** q (∨) | **se** p **então** q (→) |
|---|---|---|---|---|
| V | V | V | V | V |
| V | F | F | V | F |
| F | V | F | V | V |
| F | F | F | F | V |

- **E:** só é V se as duas forem V ("Tenho ingresso **e** chego no horário" → entro no show).
- **OU:** é V se pelo menos uma for V.
- **SE… ENTÃO:** só é F quando a primeira é V e a segunda é F. "Se chover, levo guarda-chuva" só
  é quebrada se chover e eu não levar.

Na programação, essas regras são os `if`, `and`, `or` e `not` — o robô da oficina só anda se
"sensor livre **e** bateria > 20%".

### 4. Estratégias de resolução

| Estratégia | Quando usar | Exemplo |
|---|---|---|
| Tentativa e erro **sistematizado** | Poucas possibilidades; testar em ordem e anotar | Dois números somam 15 e o produto é 54 → testar pares: (6, 9) ✓ |
| Decomposição | Problema grande que pode virar partes menores | Custo da festa = comida + bebida + decoração |
| Trabalho reverso (de trás para frente) | Conhece o resultado final e quer o início | "Gastei metade e depois R$ 10,00 e fiquei com R$ 25,00" → (25 + 10) · 2 = R$ 70,00 |
| Analogia | O problema parece um que já foi resolvido | Apertos de mão entre 10 pessoas ≈ jogos de um campeonato só de ida: 10 · 9 ÷ 2 = 45 |

### 5. Os 4 passos de Polya
1. **Compreender** o problema (o que se quer? quais os dados?).
2. **Planejar** (qual estratégia?).
3. **Executar** o plano.
4. **Verificar** (a resposta responde à pergunta? faz sentido?).

## Exemplo no contexto do curso
Você, como aluno consultor, ajuda a programar o portão automático do laboratório: ele abre **se**
o cartão for válido **e** o horário estiver entre 7 h e 22 h. Às 23 h, com cartão válido: V ∧ F =
**F** → não abre. Se a regra fosse "ou", abriria para qualquer cartão válido de madrugada — um
erro de segurança causado por um único conectivo.

## Dinâmica — Estações de estratégia (45 min, em grupos de 4)
- **Objetivo:** praticar cada estratégia e comparar caminhos diferentes (C2, C3, C6).
- **Materiais:** 4 estações com um desafio cada (quadrado mágico 3 × 3, problema reverso da
  mesada, travessia do rio com lobo, cabra e repolho, apertos de mão), fichas de registro.
- **Passo a passo:** (1) os grupos passam 10 min em cada estação; (2) registram a estratégia
  usada, as tentativas que falharam e a solução; (3) quando travam, podem pedir **uma** dica por
  estação ao professor ou à plataforma.
- **Fechamento:** cada grupo apresenta a estação em que mais errou antes de acertar — persistir faz
  parte da resolução.

## Situação-problema e entrega da aula
Você, como aluno consultor, ajuda a organizar a escala do laboratório. Regras: (a) Ana e Bruno não
trabalham no mesmo dia; (b) se Carla trabalha na segunda, Davi trabalha na terça; (c) Bruno só
pode na segunda ou na quarta; (d) cada um trabalha exatamente um dia, de segunda a quinta.
**Entrega:** (1) monte uma escala que cumpra todas as regras; (2) diga qual estratégia usou;
(3) escreva a regra (b) com os símbolos p → q e diga em que caso ela seria quebrada; (4) verifique
a escala regra por regra.

## Verificação da aprendizagem
- p: "8 é maior que 5" (V); q: "3 é par" (F). Qual o valor de p ∧ q, p ∨ q, p → q e ~q?
- Negue: "Todos os robôs funcionaram."
- Pensei em um número, multipliquei por 3, somei 7 e deu 31. Que número pensei? Qual estratégia
  usou?

## Recursos
Projetor, slides da aula, quadro, plataforma Chalkie AI (desafios lógicos com dicas em etapas),
fichas das estações, peças para a travessia e Chromebooks.
