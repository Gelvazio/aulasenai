# AULA 04 — CLP: Arquitetura e Especificação de Hardware

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M2 — CLP: características e arquitetura |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 2.3 Arquitetura e especificação de hardware |
| **Capacidade** | **C1** — Identificar a aplicabilidade dos conceitos básicos relativos à programação de CLP´s |
| **Estratégia** | Prática em bancada + pesquisa em catálogo |

---

## 🎯 Objetivos de aprendizagem

- Identificar os blocos da arquitetura do CLP: fonte, CPU, memória, cartões de entrada e saída e comunicação.
- Diferenciar CLP compacto e modular.
- Ler a etiqueta e o catálogo de um CLP e montar sua ficha técnica.
- Entender o **endereçamento** de entradas e saídas (ligação com a aula 01).

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Ciclo de varredura em 3 perguntas |
| 50 min | Exposição | Arquitetura do CLP; compacto × modular; tipos de cartões; endereçamento |
| 25 min | Demonstração | Docente mostra o CLP da bancada (desenergizado) e o catálogo do fabricante |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Duplas identificam módulos e bornes e localizam as informações no catálogo |
| 50 min | Prática autônoma | Ficha técnica do CLP do laboratório |
| 25 min | Registro e verificação | Apresentação rápida das fichas e quiz |

---

## 📖 Conteúdo

### 1. Arquitetura (2.3)

```
Sensores/botões ──► [Cartão de ENTRADAS] ──► [ CPU + MEMÓRIA ] ──► [Cartão de SAÍDAS] ──► Motores/válvulas/lâmpadas
                                                  ▲        │
                                   [FONTE] ───────┘        └──► [COMUNICAÇÃO] ──► IHM / Supervisório / PC
```

| Bloco | Função |
|---|---|
| **Fonte** | Converte a rede (ex.: 220 Vca) em tensão de trabalho (ex.: 24 Vcc) |
| **CPU** | Executa o programa e toma as decisões |
| **Memória** | Guarda o programa e os dados (contadores, temporizadores) |
| **Entradas digitais** | Recebem sinais liga/desliga (botões, fins de curso, sensores) |
| **Entradas analógicas** | Recebem sinais contínuos (4–20 mA de um transmissor de pressão) |
| **Saídas digitais** | Ligam/desligam contatores, válvulas solenoides, sinaleiros |
| **Saídas analógicas** | Enviam sinal contínuo (velocidade de inversor, abertura de válvula) |
| **Comunicação** | Conecta IHM, supervisório e computador de programação |

### 2. Compacto × modular

- **Compacto:** tudo em uma só peça; poucas E/S; máquinas pequenas.
- **Modular:** trilho/rack com módulos; expande conforme a necessidade; linhas maiores.

### 3. Especificação e endereçamento

- Na especificação conferimos: tensão da fonte, número e tipo de E/S, tipo de saída (relé ou transistor), sinais analógicos, portas de comunicação.
- Cada borne tem um **endereço** (ex.: `I0.0`, `I0.1`... `Q0.0`; ou `%I1`, `%Q1`, conforme o fabricante). Os endereços agrupam bits em bytes, como vimos na aula 01.

---

## 🏭 Exemplos do contexto industrial

- Linha de envase precisa de mais 8 sensores: no CLP modular, acrescenta-se um cartão de entradas.
- Saída a relé para ligar contator; saída a transistor para sinal rápido.
- Operador informa à manutenção: "a entrada I0.3 não acende quando o sensor da porta atua" — comunicação precisa usando o endereço.

---

## 🛠️ Atividade — Ficha técnica do CLP do laboratório

Com o CLP **desenergizado** e o catálogo do fabricante, preencha:

| Item | Valor encontrado |
|---|---|
| Fabricante / modelo | |
| Compacto ou modular | |
| Tensão de alimentação | |
| Nº de entradas digitais / tensão | |
| Nº de saídas digitais / tipo | |
| E/S analógicas (tipo de sinal) | |
| Portas de comunicação | |
| Endereço da 1ª entrada e da 1ª saída | |

---

## ⚠️ Segurança

Identificação de módulos **só com a bancada desenergizada e bloqueada pelo docente**. Não retirar módulos nem bornes. Ao final, 5S da bancada.

---

## ✅ Verificação da aprendizagem

- Ficha técnica completa e correta (critério crítico: tensão de alimentação e tipo de saída corretos).
- Quiz: associar 6 blocos à sua função.

---

## 🧰 Recursos

Laboratório de Automação, CLP, catálogos e manuais do fabricante, kit multimídia.

---

## 🔗 Próxima aula

**Aula 05 — Linguagens de programação:** com o hardware conhecido, vamos ler os primeiros programas em Ladder e em blocos de função.
