# AULA 02 — Funções Lógicas

| Campo | Valor |
|---|---|
| **Curso** | Aprendizagem Industrial de Operador de Produção Industrial |
| **UC** | Fundamentos de Automação/Instrumentação (60h) |
| **Módulo** | M1 — Lógica Digital |
| **Duração** | 4h |
| **Data** | ___/___/______ |
| **Conhecimentos (ementa do curso)** | 1.3 Funções lógicas (AND, NAND, OR, NOR, EX-OR, NÃO EX-OR) |
| **Capacidade** | **C1** — Identificar a aplicabilidade dos conceitos básicos relativos à programação de CLP´s |
| **Estratégia** | Situação-problema: comando bimanual da prensa |

---

## 🎯 Objetivos de aprendizagem

- Montar a tabela-verdade das funções AND, NAND, OR, NOR, EX-OR e NÃO EX-OR.
- Reconhecer o símbolo de cada porta lógica.
- Relacionar cada função a uma condição real de máquina (segurança, partida, alarme).
- Escrever a expressão lógica de uma condição simples de comando.

---

## ⏱️ Roteiro da aula (240 min)

| Tempo | Etapa | O que acontece |
|---|---|---|
| 15 min | Retomada | 3 conversões rápidas da aula 01; correção do quiz |
| 50 min | Exposição | Lógica booleana, tabela-verdade e as 6 funções da ementa |
| 25 min | Demonstração | Simulador de portas lógicas: chaves como entradas, lâmpada como saída |
| 15 min | Intervalo | — |
| 60 min | Prática guiada | Montagem de tabelas-verdade e circuitos no simulador em duplas |
| 50 min | Prática autônoma | Situação-problema "Prensa da Metalúrgica Alfa" |
| 25 min | Registro e verificação | Quadro-resumo das portas e quiz de saída |

---

## 📖 Conteúdo

### 1. Base: variáveis lógicas

- Cada sinal só tem dois estados: **0 (falso/desligado)** e **1 (verdadeiro/ligado)**.
- A **inversão** (negação, barra sobre a letra: Ā) troca 0 por 1. Ela aparece "dentro" das funções NAND, NOR e NÃO EX-OR.

### 2. As seis funções da ementa (1.3)

| Função | Regra em palavras | Expressão | Saída = 1 quando... |
|---|---|---|---|
| **AND (E)** | Todas as condições | S = A · B | A **e** B forem 1 |
| **NAND (NÃO E)** | Inverso do AND | S = (A · B)‾ | pelo menos uma entrada for 0 |
| **OR (OU)** | Qualquer condição | S = A + B | A **ou** B (ou ambas) forem 1 |
| **NOR (NÃO OU)** | Inverso do OR | S = (A + B)‾ | todas as entradas forem 0 |
| **EX-OR (OU exclusivo)** | Entradas diferentes | S = A ⊕ B | A e B forem **diferentes** |
| **NÃO EX-OR (coincidência)** | Entradas iguais | S = (A ⊕ B)‾ | A e B forem **iguais** |

### 3. Tabela-verdade completa (2 entradas)

| A | B | AND | NAND | OR | NOR | EX-OR | NÃO EX-OR |
|---|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 1 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |

### 4. Símbolos

Apresentar os símbolos padrão das portas (formato distintivo) e o círculo de negação na saída (NAND, NOR, NÃO EX-OR). Entregar ficha impressa.

---

## 🏭 Exemplos do contexto industrial

- **AND:** a prensa só desce com os **dois botões** pressionados (comando bimanual) — protege as mãos.
- **OR:** a esteira para se **qualquer** botão de emergência da linha for acionado.
- **NOR:** a luz "linha liberada" acende só quando **nenhum** alarme está ativo.
- **EX-OR:** comando de iluminação de corredor por dois interruptores (um em cada ponta).
- **NÃO EX-OR:** conferência de dois sensores redundantes — se eles concordam, sinal OK.
- **NAND:** sinal de "falta de condição" quando nem todas as condições de partida estão prontas.

---

## 🛠️ Atividade — Situação-problema "Prensa da Metalúrgica Alfa"

A prensa da empresa fictícia **Metalúrgica Alfa** desceu com apenas um botão pressionado e quase causou um acidente.

1. Monte a tabela-verdade correta do comando (botões B1 e B2; saída = descer).
2. Indique qual função lógica estava aplicada por engano (dica: OR) e qual é a correta (AND).
3. Acrescente a condição "porta de proteção fechada" (P = 1): escreva a expressão S = B1 · B2 · P.
4. Explique em 3 linhas por que essa lógica é um **intertravamento de segurança**.

---

## ⚠️ Segurança

Discutir o caso da prensa: a lógica de segurança nunca deve ser alterada pelo operador. Comando bimanual e proteções são exigências de segurança em máquinas (tema aprofundado em Operação e Manutenção de Máquinas Industriais — NR 12).

---

## ✅ Verificação da aprendizagem

- Completar uma tabela-verdade de 3 funções sorteadas.
- Associar 5 situações da fábrica à função lógica correta.
- Critério: 80% de acerto.

---

## 🧰 Recursos

Laboratório de informática com simulador de portas lógicas, kit multimídia, ficha de símbolos.

---

## 🔗 Próxima aula

**Aula 03 — CLP: características e funcionamento:** as funções lógicas de hoje são exatamente o que o CLP executa milhares de vezes por segundo.
