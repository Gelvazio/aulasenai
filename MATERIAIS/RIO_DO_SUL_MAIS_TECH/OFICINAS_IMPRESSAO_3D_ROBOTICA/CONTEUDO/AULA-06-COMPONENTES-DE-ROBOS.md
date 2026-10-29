# Aula 06 — Componentes de Robôs

**Matéria:** Oficinas de Impressão 3D e Robótica · **Curso:** Rio do Sul Mais Tech (UC 4)
**Carga horária:** 4 h · **Público:** alunos do 8º e 9º anos · **Modalidade:** presencial
**Conhecimentos da ementa:** 7 — Atuadores Robóticos
**Capacidades:**
- **C5** — Entender os componentes fundamentais de um robô (sensores, atuadores, motores, controladores)

**Estratégias:** montagem e programação de kits robóticos; projetos práticos interdisciplinares.
**Prática da aula:** `../ATIVIDADES/ATIVIDADE-PRATICA-AULA-06.html`

---

## Indicadores

6. Liga um sensor a um motor e explica o papel de cada componente.

## Objetivos

Ao final da aula, o aluno será capaz de:
- identificar sensores, atuadores, motores e controladores de um robô;
- explicar o ciclo "sensor lê, controlador decide, atuador age";
- diferenciar motor DC e servomotor;
- ligar com segurança um sensor a um motor e testar a resposta.

## Roteiro da aula

| Momento | Tempo | O que acontece |
|---|---|---|
| Abertura e revisão da Aula 5 | 15 min | Retomada da classificação de robôs |
| Anatomia de um robô | 35 min | Os quatro grupos de componentes |
| Sensores e controladores | 40 min | Tipos, sinais e função |
| Intervalo | 15 min | — |
| Atuadores e motores | 40 min | Motor DC e servomotor |
| Prática: sensor ligado a motor | 70 min | Montagem e teste |
| Fechamento e entrega | 25 min | Registro e verificação |
| Total | **240 min** | |

## Conteúdo

### 1. Anatomia de um robô
- **Sensores:** captam informações do ambiente (distância, luz, toque, temperatura).
- **Controlador:** o "cérebro" que lê os sensores e executa o programa (por exemplo, uma placa de microcontrolador).
- **Atuadores:** executam a ação (motores, servos, garras, luzes).
- **Fonte de energia** (baterias) e **estrutura** (chassi, que pode ser impresso em 3D).

### 2. Sensores
- **Ultrassônico:** mede a distância pelo tempo de ida e volta do som.
- **Infravermelho / de linha:** detecta contraste e obstáculos próximos.
- **Toque (botão):** informa o contato com um objeto.
- **Luz (LDR):** mede a luminosidade.
- O sensor entrega um **sinal** (ligado/desligado ou um valor) para o controlador.

### 3. Atuadores e motores
- **Motor DC:** gira continuamente; usado para rodas. A velocidade depende da tensão e do sinal enviado.
- **Servomotor:** gira até um **ângulo** definido (geralmente de 0° a 180°); usado em garras e braços.
- Motores exigem mais corrente do que o controlador fornece; por isso usam **driver** (ponte H) ou fonte própria.
- Segurança: não ligar a bateria com fios soltos, conferir polaridade (positivo e negativo) e desligar antes de alterar a montagem.

### 4. Ciclo sensor–controlador–atuador
1. O sensor mede.
2. O controlador compara o valor com uma regra do programa (por exemplo, "distância menor que 10 cm").
3. O atuador responde (parar o motor, girar, acender uma luz).
Esse ciclo se repete muitas vezes por segundo.

## Exemplo no contexto do curso

Um AGV de logística usa sensores para detectar obstáculos. Ao perceber uma pessoa a menos de 1 metro, o controlador manda o motor parar: o mesmo princípio da prática da aula.

## Dinâmica

- **Objetivo:** ligar um sensor a um motor e testar a resposta.
- **Materiais:** kit robótico (placa controladora, sensor de distância ou de toque, motor com driver, bateria, cabos).
- **Passo a passo:**
  1. Identificar cada componente do kit e dizer sua função.
  2. Ligar o sensor e o motor à placa, seguindo o esquema do professor.
  3. Carregar o programa de teste e observar a resposta (motor liga ou para ao detectar).
  4. Registrar o que mudou ao aproximar a mão ou o objeto.
- **Fechamento:** cada grupo explica, com as palavras sensor, controlador e atuador, o que aconteceu.

## Situação-problema e entrega da aula

**Você, como aluno consultor,** precisa explicar a uma equipe de manutenção por que o motor não parou quando o sensor detectou o obstáculo.
**Entrega:** esquema da ligação e relatório com sensor, controlador, atuador e a resposta observada.

## Verificação da aprendizagem

- Qual a função de cada um dos quatro grupos de componentes?
- Qual a diferença entre motor DC e servomotor?
- Por que usar um driver para o motor?
- O que o controlador faz com o sinal do sensor?

## Recursos

- Ementa da matéria (`../EMENTA-CHALKIE-AI.md`), Módulo 4.
- Kits robóticos e esquemas de ligação.
- Slides: `../AULAS/AULA-06-SLIDES.pdf` (a ligar quando o professor publicar).
