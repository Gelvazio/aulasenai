# AULA 09 — Instrumentação: Simbologia, Fluxogramas, Malhas e Sinais

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M5 — Instrumentação: simbologia, malhas e sinais |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 4.1 Classe e Simbologia dos Instrumentos · 4.2 Fluxograma de processo e tipos de malhas · 4.3 Sinais Pneumáticos · 4.4 Sinais Analógicos · 4.5 Sinais Digitais |
| **Capacidade** | **C3** — Reconhecer as diferentes técnicas de instrumentação aplicadas aos sistemas de produção |
| **Estratégia** | Leitura de fluxograma real/fictício (situação-problema) |

---

## 🎯 Objetivos de aprendizagem

- Ler a identificação (TAG) de um instrumento e explicar cada letra.
- Reconhecer os símbolos básicos de instrumentos em fluxogramas.
- Diferenciar **malha aberta** e **malha fechada** e identificar seus elementos.
- Diferenciar sinais **pneumático**, **analógico** e **digital** e seus valores padrão.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | De onde vêm os valores da IHM? |
| 50 min | Exposição | Classes, TAG, símbolos; fluxograma; malhas; tipos de sinal |
| 25 min | Demonstração | Docente "lê" um fluxograma de caldeira e mostra um transmissor 4–20 mA na bancada |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Decifrar 10 TAGs e 2 malhas em duplas |
| 50 min | Prática autônoma | Legenda do fluxograma "Caldeira da Têxtil Fios do Vale" |
| 25 min | Registro e verificação | Quiz e conversão de sinais |

---

## 📖 Conteúdo

### 1. Classe e simbologia (4.1)

**TAG = letras de função + número da malha.** Primeira letra = variável medida; letras seguintes = função.

| 1ª letra (variável) | Letras seguintes (função) |
|---|---|
| **P** pressão · **T** temperatura · **L** nível · **F** vazão | **I** indicador · **T** transmissor · **C** controlador · **R** registrador · **V** válvula · **S** chave · **A** alarme (H alto / L baixo) |

Exemplos: **PI-101** indicador de pressão · **TT-205** transmissor de temperatura · **LIC-301** indicador e controlador de nível · **FV-110** válvula de vazão · **LAH-302** alarme de nível alto.

**Localização no símbolo (círculo):** sem linha = instrumento no campo; com linha = no painel/sala de controle.

**Classes de instrumentos (por função):** indicadores, registradores, transmissores, controladores, conversores, elementos finais de controle (válvulas, inversores).

### 2. Fluxograma de processo e malhas (4.2)

- **Fluxograma de processo e instrumentação (P&ID):** desenho com equipamentos, tubulações e instrumentos com TAG.
- **Malha aberta:** mede e indica; quem corrige é o operador (ex.: PI no tanque).
- **Malha fechada:** mede → compara com o valor desejado (set point) → corrige automaticamente.

```
Set point ─► [Controlador] ─► [Válvula / elemento final] ─► PROCESSO ─┐
                  ▲                                                    │
                  └────────── [Transmissor] ◄── medição ◄─────────────┘
```

### 3. Tipos de sinal (4.3 a 4.5)

| Sinal | Faixa padrão | Exemplo |
|---|---|---|
| **Pneumático (4.3)** | 3 a 15 psi (0,2 a 1,0 kgf/cm²) | Posicionador de válvula a ar |
| **Analógico (4.4)** | 4 a 20 mA, 0 a 10 V | Transmissor de pressão |
| **Digital (4.5)** | 0 ou 1 (liga/desliga); redes digitais | Chave de nível, fim de curso |

**Conversão rápida 4–20 mA:** valor = início + (mA − 4) ÷ 16 × faixa.
Ex.: transmissor 0–10 bar marcando 12 mA → 0 + (12 − 4) ÷ 16 × 10 = **5 bar**.
4 mA = início da faixa (o "zero vivo" permite detectar fio rompido: 0 mA = falha).

---

## 🏭 Exemplos do contexto industrial

- TIC-201 na estufa: mede e controla a temperatura automaticamente (malha fechada).
- PI-105 na linha de ar comprimido: o operador lê e anota (malha aberta).
- IHM mostra "falha de sinal" no LT-301 → transmissor com 0 mA, cabo rompido.

---

## 🛠️ Atividade — "Caldeira da Têxtil Fios do Vale"

Com o fluxograma da caldeira da empresa fictícia **Têxtil Fios do Vale** (entregue impresso):

1. Monte a legenda de todos os TAGs (variável, função, campo/painel).
2. Identifique uma malha aberta e uma malha fechada e desenhe seus elementos.
3. Classifique o tipo de sinal de 4 instrumentos indicados.
4. Converta: LT-301 (0–4 m) em 8 mA e 16 mA.

---

## ⚠️ Segurança

Transmissores e válvulas da bancada só são manuseados desenergizados e despressurizados, com autorização do docente.

---

## ✅ Verificação da aprendizagem

- Legenda correta de pelo menos 80% dos TAGs.
- 3 conversões de 4–20 mA corretas.

---

## 🧰 Recursos

Fluxogramas impressos, normas/tabelas de simbologia, laboratório de automação (transmissor 4–20 mA, posicionador), kit multimídia.

---

## 🔗 Próxima aula

**Aula 10 — Medição de pressão:** primeira variável de processo — unidades, conversões e instrumentos.
