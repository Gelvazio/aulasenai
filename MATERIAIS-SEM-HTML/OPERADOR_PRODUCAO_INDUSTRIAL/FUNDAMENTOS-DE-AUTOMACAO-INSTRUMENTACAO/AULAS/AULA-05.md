# AULA 05 — CLP: Linguagens de Programação

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M3 — CLP: linguagem e estruturas de programação |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 2.4 Linguagem de programação |
| **Capacidade** | **C1** — Identificar a aplicabilidade dos conceitos básicos relativos à programação de CLP´s |
| **Estratégia** | Leitura e interpretação de programas prontos no simulador |

---

## 🎯 Objetivos de aprendizagem

- Conhecer as linguagens de programação de CLP (norma IEC 61131-3) e reconhecer as mais usadas na fábrica: **Ladder** e **Blocos de Função**.
- Identificar contato aberto (NA), contato fechado (NF) e bobina no Ladder.
- Ler um programa Ladder simples e dizer quando a saída liga.
- Relacionar Ladder às funções lógicas da aula 02 (série = AND, paralelo = OR).

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Arquitetura e endereços de E/S |
| 50 min | Exposição | Linguagens IEC 61131-3; elementos do Ladder; equivalência com portas lógicas |
| 25 min | Demonstração | Software/simulador: abrir programa, colocar em RUN, observar a "energia" fluir |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Leitura de 5 programas prontos e previsão do comportamento |
| 50 min | Prática autônoma | Comentar um programa da "Esteira de paletes" |
| 25 min | Registro e verificação | Quiz de leitura de Ladder |

---

## 📖 Conteúdo

### 1. Linguagens (2.4)

| Linguagem | Tipo | Onde aparece |
|---|---|---|
| **Ladder (LD)** | Gráfica, parecida com diagrama elétrico | A mais usada em máquinas |
| **Blocos de Função (FBD)** | Gráfica, com blocos AND/OR/temporizador | Processos e quem vem da eletrônica |
| Texto Estruturado (ST) | Textual, parecida com programação | Cálculos (citar apenas) |
| Lista de Instruções (IL) | Textual, tipo "assembly" | Sistemas antigos (citar apenas) |
| SFC (Grafcet) | Sequencial por etapas | Máquinas de sequência (citar apenas) |

> Foco da UC: **ler e entender** Ladder e FBD. Programação avançada fica **fora da ementa**.

### 2. Elementos básicos do Ladder

| Símbolo | Nome | Comportamento |
|---|---|---|
| `─┤ ├─` | Contato NA (normalmente aberto) | "Passa" quando a entrada está em 1 |
| `─┤/├─` | Contato NF (normalmente fechado) | "Passa" quando a entrada está em 0 |
| `─( )─` | Bobina (saída) | Liga quando há caminho da esquerda até ela |

- Cada linha é uma **rede (rung)**; o CLP lê de cima para baixo (ciclo de varredura).
- **Contatos em série = AND** · **Contatos em paralelo = OR** · **Contato NF = inversão**.

### 3. Exemplo de leitura

```
 I0.0 (B1)   I0.1 (B2)    I0.2 (porta)          Q0.0 (descer)
──┤ ├─────────┤ ├──────────┤ ├────────────────────( )──
```

Lê-se: "a prensa desce quando B1 **e** B2 estão pressionados **e** a porta está fechada" — é a mesma expressão S = B1 · B2 · P da aula 02.

### 4. O mesmo em Blocos de Função

```
B1 ──┐
B2 ──┤ AND ├── Q0.0
P  ──┘
```

---

## 🏭 Exemplos do contexto industrial

- Lâmpada de "máquina em operação" ligada pelo contato do motor.
- Alarme sonoro que liga se o sensor de nível alto **ou** o termostato atuarem (paralelo).
- Botão de emergência ligado como **contato NF** no programa: se o fio romper, a máquina para (lógica segura).

---

## 🛠️ Atividade — "Esteira de paletes"

O programa da esteira da empresa fictícia **Logimóveis** tem 4 redes sem comentários. Para cada rede:

1. Escreva em português quando a saída liga.
2. Escreva a expressão lógica equivalente.
3. Proponha um comentário curto para a rede (como se fosse para o próximo operador).

---

## ⚠️ Segurança

Uso de simulador e software. Qualquer teste no CLP real só em bancada liberada pelo docente. Reforçar: **programa de máquina em produção não é alterado pelo operador**.

---

## ✅ Verificação da aprendizagem

- Quiz: 5 redes Ladder — prever o estado da saída para combinações de entradas.
- Critério: 4 de 5.

---

## 🧰 Recursos

Laboratório de informática com software/simulador de CLP, Laboratório de Automação, kit multimídia, manual do CLP.

---

## 🔗 Próxima aula

**Aula 06 — Estruturas de programação:** selo, temporizador, contador e intertravamento na partida e parada de uma esteira.
