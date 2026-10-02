# AULA 15 — Avaliação Integradora

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | Avaliação (módulos 1 a 8) |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 1.1 a 1.3 · 2.1 a 2.5 · 3.1 a 3.4 · 4.1 a 4.16 |
| **Capacidades** | **C1, C2, C3 e C4** |
| **Estratégia** | Prova conceitual + situação-problema prática em bancada |

---

## 🎯 Objetivos da avaliação

Evidenciar as quatro capacidades da UC:

| Cód. | Capacidade | Evidência |
|---|---|---|
| C1 | Identificar a aplicabilidade dos conceitos básicos relativos à programação de CLP´s | Conversões, tabela-verdade e leitura de Ladder com intertravamento |
| C2 | Compreender a operação do sistema supervisório e IHM | Tratamento de alarmes e relatório de turno |
| C3 | Reconhecer as diferentes técnicas de instrumentação aplicadas aos sistemas de produção | Leitura de TAGs, malhas e sinais |
| C4 | Observar as variáveis de controle (pressão, vazão, temperatura, nível etc) | Leituras, conversões e registros das quatro variáveis |

---

## ⏱️ Roteiro (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Orientações | Regras, critérios, segurança e sorteio das bancadas |
| 80 min | Prova conceitual | 20 questões objetivas (5 por capacidade) |
| 15 min | Intervalo | — |
| 100 min | Prática integradora | Situação-problema em bancada, em duplas, com registro individual |
| 30 min | Fechamento | Devolutiva coletiva, autoavaliação e encaminhamento de recuperação |

---

## 📝 Parte 1 — Prova conceitual (matriz)

| Capacidade | Conteúdos | Nº de questões |
|---|---|---|
| C1 | Conversão de bases (1.2), funções lógicas (1.3), ciclo de varredura e hardware (2.2–2.3), leitura de Ladder/selo (2.4–2.5) | 5 |
| C2 | Local × remoto (3.1), componentes (3.2), IHM × SCADA (3.3), funções e alarmes (3.4) | 5 |
| C3 | TAGs (4.1), malhas (4.2), sinais pneumático/analógico/digital e 4–20 mA (4.3–4.5) | 5 |
| C4 | Pressão (4.6–4.8), nível (4.9–4.11), vazão (4.12–4.13), temperatura (4.14–4.16) | 5 |

> As questões ficam na página de avaliação (`ATIVIDADES/AVALIACAO-*.html`), com login, gravação no
> banco e **gabarito só no banco** (nunca na página do aluno nem em arquivo versionado).

---

## 🛠️ Parte 2 — Situação-problema prática "Linha de envase da Sucos Vale Verde"

A linha de envase da empresa fictícia **Sucos Vale Verde** tem um tanque de xarope (LT-301, 0–4 m), linha de ar comprimido (PI-105), rotâmetro de água de resfriamento (FI-110) e pasteurizador com PT100 (TIT-201). O CLP comanda a bomba com selo e intertravamento de nível.

Em duplas, na bancada:

1. **C1:** leia o programa Ladder da bomba e explique o selo e o intertravamento de nível mínimo; teste partida, parada e emergência (com o docente).
2. **C2:** trate os 3 alarmes que o docente provocar na IHM, na ordem de prioridade, e preencha o relatório de turno.
3. **C3:** monte a legenda dos 4 TAGs e diga qual malha é aberta e qual é fechada; converta o LT-301 em 12 mA para metros.
4. **C4:** faça as leituras de pressão (converter para psi), vazão (L/min e m³/h), nível e temperatura (PT100 por resistência), e diga se cada uma está na faixa da ficha de processo.

---

## 💯 Critérios e pontuação

| Parte | Peso | Critérios |
|---|---|---|
| Prova conceitual | 40% | Acertos por capacidade |
| Prática integradora | 60% | **Críticos:** EPI, energização só com o docente, parada/emergência testadas, unidades sempre registradas · **Desejáveis:** organização (5S), clareza do relatório, trabalho em dupla |

**Rubrica (0–10):** Excelente 9–10 · Bom 7–8 · Aceitável 5–6 · Insuficiente 0–4.
Descumprir um critério crítico de segurança zera a parte prática. **Aprovação: nota ≥ 7,0.**

---

## 🔁 Recuperação

- A nova tentativa (recuperação 1 e 2) **reabre só as questões erradas** da prova, liberada pelo professor.
- A prática pode ser refeita na capacidade não evidenciada, com acompanhamento.
- Quem atinge 7 na avaliação não faz recuperação.

---

## ⚠️ Segurança

APR da bancada no início, EPI conferido pelo docente, botão de emergência testado antes da prática, água quente limitada, 5S ao final.

---

## 🧰 Recursos

Laboratório de Automação (CLP, IHM, bancada de pressão, nível, vazão e temperatura), computadores com acesso à avaliação, multímetro, calculadora, ficha de processo e modelo de relatório de turno.
