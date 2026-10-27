# AULA 10 — Pressão: Unidades, Conversões e Dispositivos de Medição

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M6 — Medição de pressão |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 4.6 Variáveis de Processo: Unidades de pressão · 4.7 Conversão de unidades de pressão · 4.8 Dispositivos de medição de pressão |
| **Capacidade** | **C4** — Observar as variáveis de controle (pressão, vazão, temperatura, nível etc) |
| **Estratégia** | Prática de leitura em bancada + situação-problema |

---

## 🎯 Objetivos de aprendizagem

- Definir pressão e diferenciar pressão **absoluta**, **manométrica (relativa)** e **diferencial**.
- Reconhecer as unidades bar, psi, kPa, kgf/cm², mmH₂O e mmHg.
- Converter valores entre as unidades mais usadas.
- Identificar e ler dispositivos de medição (manômetro de Bourdon, vacuômetro, pressostato, transmissor).

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | TAGs P e sinal 4–20 mA |
| 50 min | Exposição | Pressão: conceito, tipos, unidades, conversões e instrumentos |
| 25 min | Demonstração | Leitura de manômetros com escalas diferentes na bancada |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Leituras e conversões em duplas, com tabela de registro |
| 50 min | Prática autônoma | Situação-problema "Compressor da Plásticos Norte" |
| 25 min | Registro e verificação | Quiz de conversões (formativa M5–M6) |

---

## 📖 Conteúdo

### 1. Variável pressão (4.6)

- **Pressão = força ÷ área.**
- **Absoluta:** medida a partir do vácuo total.
- **Manométrica (relativa):** medida a partir da pressão atmosférica — a maioria dos manômetros da fábrica.
- **Diferencial:** diferença entre dois pontos (ex.: entrada e saída de um filtro → filtro sujo).
- **Vácuo:** pressão abaixo da atmosférica (vacuômetro).

### 2. Unidades e conversões (4.6 e 4.7)

| De → Para | Fator aproximado |
|---|---|
| 1 bar | = 100 kPa = 14,5 psi ≈ 1,02 kgf/cm² |
| 1 psi | ≈ 0,0689 bar ≈ 6,89 kPa |
| 1 kgf/cm² | ≈ 0,981 bar ≈ 14,22 psi |
| 1 atm | ≈ 1,013 bar ≈ 14,7 psi ≈ 760 mmHg |
| 1 mH₂O | ≈ 0,098 bar |

Exemplos:
- 6 bar → psi: 6 × 14,5 = **87 psi**.
- 120 psi → bar: 120 × 0,0689 ≈ **8,27 bar**.
- 350 kPa → bar: 350 ÷ 100 = **3,5 bar**.

### 3. Dispositivos de medição (4.8)

| Dispositivo | Princípio | Uso |
|---|---|---|
| Manômetro de tubo de Bourdon | Tubo curvo que se abre com a pressão e move o ponteiro | Indicação local (ar, água, óleo) |
| Manômetro de diafragma | Membrana que deforma | Fluidos viscosos/sujos |
| Coluna de líquido (tubo em U) | Diferença de altura do líquido | Baixas pressões, calibração |
| Vacuômetro | Bourdon para pressão negativa | Linhas de vácuo |
| Pressostato | Chave que abre/fecha num valor ajustado | Liga/desliga compressor (sinal digital) |
| Transmissor de pressão | Sensor + eletrônica → 4–20 mA | Envia ao CLP/supervisório (sinal analógico) |

**Boas práticas de leitura:** olhar de frente (evitar paralaxe), conferir a unidade da escala, anotar com a unidade.

---

## 🏭 Exemplos do contexto industrial

- Rede de ar comprimido: 6 a 8 bar na linha das ferramentas pneumáticas.
- Manômetro diferencial em filtro: diferença alta = trocar elemento filtrante.
- Ficha da injetora em psi e manômetro em bar → converter antes de registrar.

---

## 🛠️ Atividade — "Compressor da Plásticos Norte"

A empresa fictícia **Plásticos Norte** especifica a rede de ar entre **90 e 115 psi**. O manômetro do reservatório está em bar e o transmissor mostra kPa na IHM.

1. Faça a leitura dos 3 manômetros da bancada e registre na tabela com unidade.
2. Converta as leituras para psi e diga se estão na faixa.
3. O transmissor mostra 820 kPa: está dentro da faixa?
4. O pressostato desliga o compressor em 8 bar e liga em 6 bar: converta para psi.

---

## ⚠️ Segurança

**Nunca** desconectar instrumento de linha pressurizada. Despressurizar e bloquear antes de qualquer manuseio; óculos de proteção na bancada pneumática. Ar comprimido não é usado para limpar roupa ou pele.

---

## ✅ Verificação da aprendizagem

- Tabela de leituras correta (unidade sempre presente — critério crítico).
- Quiz: 6 conversões e 3 associações instrumento × aplicação.

---

## 🧰 Recursos

Bancada com dispositivos de medição de pressão (manômetros, vacuômetro, pressostato, transmissor), calculadora, kit multimídia, tabela de conversão.

---

## 🔗 Próxima aula

**Aula 11 — Medição de nível:** quanto produto há no tanque ou no silo — e como medir sem olhar dentro dele.
