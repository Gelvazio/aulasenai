# Aula 07 — Programação de Robôs Simples

**Matéria:** Oficinas de Impressão 3D e Robótica · **Curso:** Rio do Sul Mais Tech (UC 4)
**Carga horária:** 4 h · **Público:** alunos do 8º e 9º anos · **Modalidade:** presencial
**Conhecimentos da ementa:** 5 — Programação de pontos e trajetórias
**Capacidades:**
- **C5** — Entender os componentes fundamentais de um robô (sensores, atuadores, motores, controladores)

**Estratégias:** montagem e programação de kits robóticos; competições de robótica.
**Prática da aula:** `../ATIVIDADES/ATIVIDADE-PRATICA-AULA-07.html`

---

## Indicadores

7. Programa em blocos um robô que percorre um trajeto.

## Objetivos

Ao final da aula, o aluno será capaz de:
- montar programas em blocos (Blockly) com sequência, repetição e condição;
- programar pontos e trajetórias: andar, girar e parar;
- usar um sensor para decidir (desviar de obstáculo);
- testar e corrigir o programa passo a passo.

## Roteiro da aula

| Momento | Tempo | O que acontece |
|---|---|---|
| Abertura e revisão da Aula 6 | 15 min | Retomada do ciclo sensor–controlador–atuador |
| Lógica em blocos (Blockly) | 40 min | Sequência, repetição e condição |
| Pontos e trajetórias | 40 min | Distâncias, giros e percurso |
| Intervalo | 15 min | — |
| Sensores na decisão | 30 min | "Se encontrar obstáculo, então..." |
| Prática: robô percorre um trajeto | 70 min | Programar, testar e ajustar |
| Fechamento e entrega | 30 min | Demonstração e verificação |
| Total | **240 min** | |

## Conteúdo

### 1. Lógica de controle em blocos
- **Blockly** é uma linguagem visual: cada comando é um bloco que se encaixa em outro.
- **Sequência:** os blocos executam de cima para baixo (andar, girar, andar).
- **Repetição:** "repetir 4 vezes" evita copiar blocos (um quadrado = repetir 4 vezes: andar e girar 90°).
- **Condição:** "se ... então ... senão ..." decide a ação a partir de um sensor.

### 2. Programação de pontos e trajetórias
- Uma **trajetória** é um caminho formado por **pontos** que o robô visita em ordem.
- Para cada trecho: distância (tempo ou voltas de roda) e direção (ângulo do giro).
- Exemplo de trajeto em "L": andar 2 s, girar 90° à direita, andar 1 s, parar.
- O robô pode acumular erro (patinação, bateria fraca): por isso testamos e ajustamos os valores.

### 3. Decisão com sensor
- Exemplo: "repetir sempre: se distância < 15 cm então parar e girar 90°, senão andar para frente".
- A lógica mostra por que o sensor e o controlador funcionam em conjunto com o atuador.

### 4. Depuração passo a passo
1. Executar e observar onde o comportamento foge do esperado.
2. Testar um bloco de cada vez (ou um trecho curto).
3. Alterar **um valor por vez** e testar de novo.
4. Anotar o que funcionou, para repetir no projeto.

## Exemplo no contexto do curso

Robôs de entrega internos de fábricas seguem rotas programadas entre pontos e, ao encontrar uma pessoa ou caixa no caminho, param e esperam: a mesma lógica de trajeto e condição da prática.

## Dinâmica

- **Objetivo:** fazer o robô percorrer um trajeto definido.
- **Materiais:** robôs/kits programáveis em blocos, computadores, fita para marcar o percurso.
- **Passo a passo:**
  1. Marcar no chão um percurso em "L" ou "U".
  2. Montar o programa em blocos e testar.
  3. Ajustar tempos e ângulos até completar o trajeto.
  4. Adicionar uma condição: parar se o sensor detectar obstáculo.
- **Fechamento:** cada equipe demonstra o trajeto e explica o que mudou durante os ajustes.

## Situação-problema e entrega da aula

**Você, como aluno consultor,** deve programar um robô para levar um objeto de um ponto a outro sem bater em obstáculos.
**Entrega:** o programa em blocos (captura ou foto) e o robô cumprindo o trajeto, com anotação dos ajustes feitos.

## Verificação da aprendizagem

- Qual a diferença entre sequência, repetição e condição?
- Como representar um quadrado com um bloco de repetição?
- Por que o robô nem sempre faz o mesmo percurso do primeiro teste?
- Cite dois passos da depuração de um programa.

## Recursos

- Ementa da matéria (`../EMENTA-CHALKIE-AI.md`), Módulo 5.
- Blockly ou ambiente de blocos do kit robótico.
- Slides: `../AULAS/AULA-07-SLIDES.pdf` (a ligar quando o professor publicar).
