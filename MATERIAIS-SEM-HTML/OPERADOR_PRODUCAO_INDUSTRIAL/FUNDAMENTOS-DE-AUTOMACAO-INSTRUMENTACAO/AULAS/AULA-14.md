# AULA 14 — Temperatura: Termorresistência (PT100) e Laudo Comparativo

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M8 — Medição de temperatura |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 4.16 Medição de temperatura por termo resistência |
| **Capacidade** | **C4** — Observar as variáveis de controle (pressão, vazão, temperatura, nível etc) |
| **Estratégia** | Prática em bancada + laudo técnico |

---

## 🎯 Objetivos de aprendizagem

- Explicar o princípio da termorresistência (resistência elétrica aumenta com a temperatura).
- Reconhecer o PT100 (100 Ω a 0 °C) e as ligações a 2, 3 e 4 fios.
- Medir a resistência de um PT100 com multímetro e estimar a temperatura.
- Comparar termopar e PT100 e escolher o sensor adequado para cada aplicação.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Termopar: princípio e tipos |
| 50 min | Exposição | Termorresistência, PT100, ligações, comparação com termopar |
| 25 min | Demonstração | Multímetro no PT100 em água fria e aquecida |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Medições de resistência e temperatura em 3 pontos |
| 50 min | Prática autônoma | Laudo comparativo termopar × PT100 |
| 25 min | Registro e verificação | Revisão geral para a avaliação integradora |

---

## 📖 Conteúdo

### 1. Termorresistência (4.16)

- Metais (principalmente **platina**) aumentam a resistência elétrica quando aquecem.
- **PT100:** 100 Ω a 0 °C; aumenta cerca de **0,385 Ω por °C**.
  - Estimativa: T ≈ (R − 100) ÷ 0,385.
  - Ex.: 119,4 Ω → (119,4 − 100) ÷ 0,385 ≈ **50 °C**; 138,5 Ω ≈ **100 °C**.
- **Ligações:** 2 fios (resistência do cabo soma erro), **3 fios** (compensa o cabo — mais comum na indústria), 4 fios (máxima precisão, laboratório).

### 2. Termopar × PT100

| Critério | Termopar | PT100 |
|---|---|---|
| Princípio | Tensão (mV) | Resistência (Ω) |
| Faixa | Muito alta (fornos) | Até ~600 °C (típico) |
| Precisão | Menor | **Maior** e mais estável |
| Resposta | Rápida | Um pouco mais lenta |
| Custo | Menor | Maior |
| Uso típico | Fornos, injetoras | Alimentos, farmacêutica, processos que exigem precisão |

---

## 🏭 Exemplos do contexto industrial

- Pasteurizador de leite: PT100 (precisão em 72–75 °C é exigência de qualidade).
- Câmara fria de frigorífico: PT100 com registro no supervisório.
- Forno a 900 °C: termopar tipo K (PT100 não suporta).

---

## 🛠️ Atividade — Laudo comparativo termopar × PT100

1. Meça em 3 temperaturas (fria, ambiente, aquecida): leitura do termopar, resistência do PT100 e temperatura calculada.
2. Compare com o termômetro de referência e calcule a diferença de cada sensor.
3. Redija um **laudo técnico curto**: objetivo, procedimento, tabela de resultados, conclusão e recomendação de sensor para (a) pasteurizador e (b) forno de tratamento térmico.

---

## ⚠️ Segurança

Mesmos cuidados da aula 13 (água quente, luvas térmicas, óculos). Multímetro na escala de resistência **com o circuito desenergizado**.

---

## ✅ Verificação da aprendizagem

- Laudo com tabela, cálculo correto e recomendação justificada.
- Revisão orientada dos módulos 1 a 8 com lista de pontos para a avaliação integradora.

---

## 🧰 Recursos

Bancada com termorresistência (PT100), termopar, multímetro, termômetro de referência, recipiente com aquecimento controlado, computador com planilha/editor de texto.

---

## 🔗 Próxima aula

**Aula 15 — Avaliação integradora:** prova conceitual (C1–C4) e situação-problema prática em bancada.
