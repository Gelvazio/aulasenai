# AULA 03 — CLP: Características Técnicas e Princípio de Funcionamento

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M2 — CLP: características e arquitetura |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 2.1 Características técnicas · 2.2 Princípio de funcionamento |
| **Capacidade** | **C1** — Identificar a aplicabilidade dos conceitos básicos relativos à programação de CLP´s |
| **Estratégia** | Demonstração em bancada + estudo de caso |

---

## 🎯 Objetivos de aprendizagem

- Definir CLP e explicar por que ele substituiu painéis de relés.
- Identificar as principais características técnicas de um CLP (alimentação, número de E/S, tipo de entrada e saída, memória, tempo de varredura).
- Descrever o **ciclo de varredura** (scan): ler entradas → executar programa → atualizar saídas.
- Relacionar o funcionamento do CLP a uma máquina real da linha.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | Revisão das funções lógicas com 3 situações de máquina |
| 50 min | Exposição | O que é CLP; histórico (relés → CLP); características técnicas; ciclo de varredura |
| 25 min | Demonstração | CLP da bancada: acionar botão, ver LED da entrada e da saída acenderem |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Em duplas, observar o CLP em modo RUN/STOP e preencher a ficha de observação |
| 50 min | Prática autônoma | Estudo de caso "Painel de relés da Cerâmica Rio Claro" |
| 25 min | Registro e verificação | Desenho do ciclo de varredura e quiz |

---

## 📖 Conteúdo

### 1. O que é um CLP

- **Controlador Lógico Programável:** computador industrial que lê sensores e botões (entradas), executa um programa e comanda motores, válvulas e lâmpadas (saídas).
- **Por que existe:** antes, a lógica era feita com dezenas de relés e fios; mudar a lógica exigia refazer a fiação. No CLP, muda-se o programa.
- Vantagens: menor espaço, alteração rápida, diagnóstico por LEDs e software, resistência ao ambiente industrial.

### 2. Características técnicas (2.1)

| Característica | O que significa | Exemplo |
|---|---|---|
| Alimentação | Tensão da fonte do CLP | 24 Vcc ou 127/220 Vca |
| Entradas digitais | Quantidade e tensão | 16 entradas de 24 Vcc |
| Saídas digitais | Tipo e capacidade | Relé (2 A) ou transistor (0,5 A) |
| Entradas/saídas analógicas | Sinais contínuos | 4–20 mA, 0–10 V |
| Memória | Espaço para programa e dados | KB de programa |
| Tempo de varredura | Duração de um ciclo | alguns milissegundos |
| Comunicação | Ligação com IHM e supervisório | Ethernet, serial |
| Modos de operação | Estados do CLP | RUN (executando), STOP (parado), PROG |

### 3. Princípio de funcionamento (2.2) — ciclo de varredura

```
┌─► 1. LÊ as entradas e guarda na memória (imagem das entradas)
│   2. EXECUTA o programa, linha por linha, de cima para baixo
│   3. ATUALIZA as saídas (imagem das saídas → bornes)
└── 4. Diagnóstico/comunicação e recomeça
```

- O ciclo se repete continuamente enquanto o CLP está em **RUN**.
- Consequência prática: um pulso de sinal muito curto (menor que o ciclo) pode não ser "visto".
- Em **STOP**, as saídas são desligadas: a máquina não responde aos comandos.

---

## 🏭 Exemplos do contexto industrial

- Esteira da expedição: sensor de caixa (entrada) → CLP → motor da esteira (saída).
- Misturador de tinta: botão de partida, temporização de mistura e válvula de descarga, tudo no mesmo CLP.
- LED da entrada acende no CLP, mas a máquina não responde → o problema está no programa ou na saída, não no sensor (raciocínio de diagnóstico do operador).

---

## 🛠️ Atividade — Estudo de caso "Painel de relés da Cerâmica Rio Claro"

A empresa fictícia **Cerâmica Rio Claro** tem um forno comandado por 40 relés. Cada mudança de receita leva dois dias de refação de fiação.

1. Liste 3 problemas do painel de relés.
2. Explique como o CLP resolveria cada problema.
3. Desenhe o ciclo de varredura aplicado ao forno (entradas: botão liga, termostato, porta fechada; saída: resistência).

---

## ⚠️ Segurança

Primeira aula no **Laboratório de Automação**: apresentar a APR da bancada, o uso de EPI, a regra "**energizar só com o docente**", a localização do botão de emergência e o 5S ao final. Nenhum aprendiz abre o painel ou mexe na fiação energizada.

---

## ✅ Verificação da aprendizagem

- Explicar oralmente o ciclo de varredura usando a bancada.
- Ficha de observação preenchida (modos RUN/STOP, LEDs de entrada e saída).
- Quiz de 5 questões sobre características técnicas.

---

## 🧰 Recursos

Laboratório de Automação com CLP, kit multimídia, catálogo/manual do CLP, ficha de observação.

---

## 🔗 Próxima aula

**Aula 04 — Arquitetura e especificação de hardware:** vamos abrir o "mapa" do CLP — CPU, fonte, cartões de entrada e saída — e montar a ficha técnica do equipamento do laboratório.
