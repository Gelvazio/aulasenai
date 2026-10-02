# AULA 01 — Sistemas de Numeração e Conversão de Bases

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M1 — Lógica Digital |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 1.1 Sistema de Numeração · 1.2 Conversão de bases numéricas |
| **Capacidade** | **C1** — Identificar a aplicabilidade dos conceitos básicos relativos à programação de CLP´s |
| **Estratégia** | Diagnóstico + situação-problema |

---

## 🎯 Objetivos de aprendizagem

Ao final da aula, o aprendiz será capaz de:

- Explicar por que máquinas e CLPs trabalham com o sistema binário (0 e 1 = desligado e ligado).
- Diferenciar os sistemas decimal, binário e hexadecimal.
- Converter números entre decimal, binário e hexadecimal.
- Reconhecer onde esses números aparecem na fábrica (endereços de entradas e saídas, códigos de falha na IHM).

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Abertura e diagnóstico | Apresentação da UC, combinados de segurança e 5 questões diagnósticas (matemática básica e uso de máquinas) |
| 50 min | Exposição | Sistemas de numeração e base; valor posicional; binário e hexadecimal |
| 25 min | Demonstração | Docente converte, no quadro, o endereço de uma entrada de CLP e um código de alarme |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Conversões em duplas com correção coletiva |
| 50 min | Prática autônoma | Situação-problema "Painel de falhas da envasadora" |
| 25 min | Registro e verificação | Quiz de saída (5 questões) e resumo no caderno |

---

## 📖 Conteúdo

### 1. Sistema de numeração (1.1)

- **Base** é a quantidade de símbolos de um sistema.
  - Decimal (base 10): 0 a 9.
  - Binário (base 2): 0 e 1 — é a "língua" do CLP: **0 = desligado / falso**, **1 = ligado / verdadeiro**.
  - Hexadecimal (base 16): 0 a 9 e A a F — forma curta de escrever binários longos.
- **Valor posicional:** cada posição vale a base elevada à posição.
  - Decimal 352 = 3×10² + 5×10¹ + 2×10⁰.
  - Binário 1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = **11**.
- **Bit, nibble e byte:** 1 bit = um dígito binário; 4 bits = nibble; 8 bits = byte (ex.: 8 entradas digitais de um cartão).

### 2. Conversão de bases (1.2)

| Conversão | Método | Exemplo |
|---|---|---|
| Binário → decimal | Somar os pesos (1, 2, 4, 8, 16...) onde há 1 | 1101₂ = 8 + 4 + 1 = 13 |
| Decimal → binário | Divisões sucessivas por 2, ler os restos de baixo para cima | 13 → 1101₂ |
| Binário → hexadecimal | Agrupar de 4 em 4 bits a partir da direita | 1010 1111₂ = AF₁₆ |
| Hexadecimal → binário | Cada dígito vira 4 bits | 3C₁₆ = 0011 1100₂ |
| Hexadecimal → decimal | Pesos 1, 16, 256... | 2A₁₆ = 2×16 + 10 = 42 |

**Tabela de apoio (0 a 15):**

| Dec | Bin | Hex | Dec | Bin | Hex |
|---|---|---|---|---|---|
| 0 | 0000 | 0 | 8 | 1000 | 8 |
| 1 | 0001 | 1 | 9 | 1001 | 9 |
| 2 | 0010 | 2 | 10 | 1010 | A |
| 3 | 0011 | 3 | 11 | 1011 | B |
| 4 | 0100 | 4 | 12 | 1100 | C |
| 5 | 0101 | 5 | 13 | 1101 | D |
| 6 | 0110 | 6 | 14 | 1110 | E |
| 7 | 0111 | 7 | 15 | 1111 | F |

---

## 🏭 Exemplos do contexto industrial

- Um cartão de 8 entradas digitais mostra o estado `0000 0101`: as entradas 0 e 2 estão ligadas (sensores acionados).
- A IHM da envasadora exibe o código de falha **1C** (hexadecimal) = 28 em decimal → consultar a tabela de falhas do manual.
- Um contador de caixas no CLP guarda o valor em binário; a IHM mostra em decimal para o operador.

---

## 🛠️ Atividade — Situação-problema "Painel de falhas da envasadora"

A envasadora da empresa fictícia **Sucos Vale Verde** parou. A IHM mostra três códigos em hexadecimal: `0A`, `1F` e `2C`. O manual traz a lista de falhas em decimal (10 = porta aberta; 31 = nível baixo de garrafas; 44 = sobretemperatura do motor).

1. Converta cada código para decimal e identifique a falha.
2. Converta para binário e diga quantos bits são necessários.
3. Escreva a mensagem que você passaria ao líder de turno.

**Entrega:** folha com as conversões e a mensagem.

---

## ⚠️ Segurança

Aula em sala/laboratório de informática, sem energização de equipamentos. Apresentar os combinados do laboratório de automação que valem a partir da aula 03 (EPI, energizar só com o docente, 5S na bancada).

---

## ✅ Verificação da aprendizagem

- Quiz de saída: 5 conversões (2 bin→dec, 1 dec→bin, 1 bin→hex, 1 hex→dec).
- Critério: acertar 4 de 5 (C1 em desenvolvimento). Quem errar 2 ou mais recebe lista de reforço.

---

## 🧰 Recursos

Sala de aula ou laboratório de informática, quadro, calculadora, kit multimídia, folha de exercícios.

---

## 🔗 Próxima aula

**Aula 02 — Funções lógicas:** com o 0 e o 1 dominados, vamos combinar sinais com AND, OR, NOT e outras portas para entender as decisões que o CLP toma.
