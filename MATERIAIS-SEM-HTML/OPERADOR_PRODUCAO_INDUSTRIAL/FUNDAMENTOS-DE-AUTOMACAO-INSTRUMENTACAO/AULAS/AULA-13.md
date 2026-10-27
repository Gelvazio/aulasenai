# AULA 13 — Temperatura: Medidores por Dilatação e Termopar

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M8 — Medição de temperatura |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 4.14 Medidores de temperatura por dilatação · 4.15 Medição de temperatura por termopar |
| **Capacidade** | **C4** — Observar as variáveis de controle (pressão, vazão, temperatura, nível etc) |
| **Estratégia** | Prática comparativa em bancada |

---

## 🎯 Objetivos de aprendizagem

- Relacionar as escalas Celsius, Kelvin e Fahrenheit e converter entre elas.
- Explicar o princípio dos medidores por **dilatação** (líquido em vidro, bimetálico, sistema cheio).
- Explicar o princípio do **termopar** (efeito Seebeck) e reconhecer os tipos mais comuns (J, K).
- Comparar leituras de termômetro de dilatação e termopar e explicar diferenças.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Vazão e o caso da água de resfriamento |
| 50 min | Exposição | Escalas; dilatação; termopar; cabo de compensação |
| 25 min | Demonstração | Banho de água aquecida com termômetro de vidro, bimetálico e termopar |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Leituras em 3 temperaturas e registro |
| 50 min | Prática autônoma | Situação-problema "Estufa da Móveis Pinhal" |
| 25 min | Registro e verificação | Quiz e conversões |

---

## 📖 Conteúdo

### 1. Escalas

- °C → K: K = °C + 273,15 · °C → °F: °F = °C × 1,8 + 32.
- Ex.: 80 °C = 353,15 K = 176 °F.

### 2. Medidores por dilatação (4.14)

| Tipo | Princípio | Uso |
|---|---|---|
| Líquido em vidro | Líquido (álcool) dilata e sobe no capilar | Laboratório, referência local |
| Bimetálico | Duas lâminas de metais diferentes dilatam de forma diferente e giram o ponteiro | Indicação local em tubulações e fornos |
| Sistema cheio (bulbo + capilar) | Líquido/gás no bulbo dilata e move o Bourdon | Indicação à distância curta (painel) |

São **indicadores locais**, sem sinal elétrico (malha aberta).

### 3. Termopar (4.15)

- **Dois metais diferentes** unidos numa ponta (junta quente). A diferença de temperatura entre a junta quente e a fria gera uma **pequena tensão (mV)** — efeito Seebeck.
- O instrumento converte mV em °C (com compensação da junta fria).

| Tipo | Metais | Faixa aproximada | Uso |
|---|---|---|---|
| **J** | Ferro / Constantan | até ~760 °C | Plásticos, estufas |
| **K** | Cromel / Alumel | até ~1.260 °C | Fornos, tratamento térmico |
| T | Cobre / Constantan | baixas temperaturas | Câmaras frias |

- **Cabo de compensação/extensão** do mesmo tipo do termopar; inverter a polaridade ou usar cabo comum gera erro.
- Vantagens: robusto, faixa alta, resposta rápida. Limitação: menor precisão que a termorresistência (aula 14).

---

## 🏭 Exemplos do contexto industrial

- Injetora de plástico: termopares tipo J nas zonas do canhão.
- Forno de tratamento térmico com termopar tipo K.
- Termômetro bimetálico na linha de vapor para conferência visual do operador.

---

## 🛠️ Atividade — Situação-problema "Estufa da Móveis Pinhal"

A estufa de secagem de verniz da empresa fictícia **Móveis Pinhal** deve trabalhar a **60 °C ± 3 °C**. O controlador (termopar J) marca 60 °C, mas o termômetro bimetálico da porta marca 52 °C e as peças saem com verniz mole.

1. Liste 3 causas possíveis (posição do sensor, cabo comum no lugar de compensação, termopar danificado, bimetálico descalibrado).
2. Na bancada, compare termômetro de vidro, bimetálico e termopar em 3 temperaturas e registre.
3. Escreva a mensagem ao líder de turno com o que você observou.

---

## ⚠️ Segurança

Água quente e superfícies aquecidas: **luvas térmicas** e óculos; temperatura da bancada limitada pelo docente (sem risco de queimadura grave). Não tocar bulbos e hastes após a medição.

---

## ✅ Verificação da aprendizagem

- Tabela comparativa com 3 temperaturas e diferenças.
- Quiz: 3 conversões de escala, princípio de cada medidor, tipo de termopar por aplicação.

---

## 🧰 Recursos

Bancada com medidores de temperatura por dilatação e termopar, recipiente com aquecimento controlado, multímetro (mV), luvas térmicas, kit multimídia.

---

## 🔗 Próxima aula

**Aula 14 — Termorresistência (PT100):** o sensor mais preciso da UC e o laudo comparativo termopar × PT100.
